import { trackGalleryEvent } from '../lib/analytics';
import type { ImageManifest, Manifest } from '../lib/schema';

const manifestElement = document.querySelector<HTMLScriptElement>('#gallery-manifest');
const configElement = document.querySelector<HTMLScriptElement>('#gallery-config');
const galleryElement = document.querySelector<HTMLElement>('[data-gallery]');
const lightboxElement = document.querySelector<HTMLDialogElement>('#lightbox');
if (!manifestElement || !configElement || !galleryElement || !lightboxElement) throw new Error('画廊初始化元素缺失');
const gallery = galleryElement;
const lightbox = lightboxElement;

type CatalogImage = ImageManifest & {record:{title:string,group:string,kind:string,brand?:string,newFmcg?:boolean}};
const manifest = JSON.parse(manifestElement.textContent || '{"images":[]}') as Omit<Manifest, 'images'> & {images:CatalogImage[]};
const config = JSON.parse(configElement.textContent || '{}') as {
  features: { download: boolean; share: boolean };
  batchSize: number;
  layoutMode: 'grid' | 'masonry';
};
const basePath = document.documentElement.dataset.basePath ?? '/';
const normalizedBasePath = basePath === '/' ? '' : basePath.replace(/\/$/, '');
const toUrl = (source: string): string => source.startsWith('/') ? `${normalizedBasePath}${source}` : source;

let nextIndex = Math.min(config.batchSize, manifest.images.length);
let activeCollection = 'all';
let currentImageId: string | undefined;
let previouslyFocused: HTMLElement | null = null;

const visibleCount = document.querySelector<HTMLElement>('#visible-count');
const sentinel = document.querySelector<HTMLElement>('#gallery-sentinel');
const loadMore = document.querySelector<HTMLButtonElement>('#gallery-load-more');
const closeButton = document.querySelector<HTMLButtonElement>('[data-lightbox-close]');
const previousButton = document.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
const nextButton = document.querySelector<HTMLButtonElement>('[data-lightbox-next]');
const shareButton = document.querySelector<HTMLButtonElement>('[data-lightbox-share]');
const downloadLink = document.querySelector<HTMLAnchorElement>('[data-lightbox-download]');
const lightboxImage = document.querySelector<HTMLImageElement>('[data-lightbox-image]');
const lightboxAvif = document.querySelector<HTMLSourceElement>('[data-lightbox-avif]');
const lightboxWebp = document.querySelector<HTMLSourceElement>('[data-lightbox-webp]');
const lightboxCaption = document.querySelector<HTMLElement>('[data-lightbox-caption]');
const lightboxPosition = document.querySelector<HTMLElement>('#lightbox-position');

function variantSrcset(variants: ImageManifest['variants']['thumb']['avif']): string {
  return variants.map((variant) => `${toUrl(variant.src)} ${variant.width}w`).join(', ');
}

const search = document.querySelector<HTMLInputElement>('#gallery-search');
let activeKind = 'all';
let saved = new Set<string>();
try { saved = new Set(JSON.parse(localStorage.getItem('daily-saved') || '[]')); } catch {}
function matchingImages(): CatalogImage[] {
  const query = (search?.value || '').trim().toLocaleLowerCase();
  return manifest.images.filter(image => {
    const record = image.record;
    return (activeCollection === 'all' || image.collection === activeCollection)
      && (activeKind === 'all' || activeKind === record.kind || (activeKind === 'new' && record.newFmcg) || (activeKind === 'saved' && saved.has(image.id)))
      && (!query || [record.title,record.group,record.brand,image.alt].join(' ').toLocaleLowerCase().includes(query));
  });
}
function applyFilter(): void {
  const matches = matchingImages();
  const visible = new Set(matches.slice(0,nextIndex).map(image=>image.id));
  for (const card of gallery.querySelectorAll<HTMLElement>('[data-gallery-card]')) card.hidden = !visible.has(card.dataset.imageId || '');
  document.querySelectorAll<HTMLButtonElement>('[data-collection-filter]').forEach(button=>{const active=button.dataset.collectionFilter===activeCollection;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll<HTMLButtonElement>('[data-kind]').forEach(button=>{const active=button.dataset.kind===activeKind;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll<HTMLButtonElement>('[data-save]').forEach(button=>{const active=saved.has(button.dataset.save||'');button.textContent=active?'♥':'♡';button.setAttribute('aria-pressed',String(active));});
  if(visibleCount) visibleCount.textContent = String(visible.size);
  const total=document.querySelector('#matched-count'); if(total) total.textContent=String(matches.length);
  const empty=document.querySelector<HTMLElement>('#gallery-empty');if(empty)empty.hidden=matches.length>0;
  if(loadMore)loadMore.hidden=nextIndex>=matches.length;
}
function loadNextBatch(): void {nextIndex += config.batchSize;applyFilter();}
function navigationImages(): ImageManifest[] {return matchingImages();}
search?.addEventListener('input',()=>{nextIndex=config.batchSize;applyFilter();});
for(const button of document.querySelectorAll<HTMLButtonElement>('[data-kind]'))button.addEventListener('click',()=>{activeKind=button.dataset.kind||'all';nextIndex=config.batchSize;applyFilter();});
gallery.addEventListener('click',event=>{const button=event.target instanceof Element?event.target.closest<HTMLElement>('[data-save]'):null;if(!button)return;const id=button.dataset.save!;saved.has(id)?saved.delete(id):saved.add(id);try{localStorage.setItem('daily-saved',JSON.stringify([...saved]));}catch{}applyFilter();});
document.querySelector('#gallery-reset')?.addEventListener('click',()=>{activeCollection='all';activeKind='all';if(search)search.value='';nextIndex=config.batchSize;applyFilter();});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!lightbox.open&&!(event.target instanceof HTMLInputElement)){event.preventDefault();search?.focus();}});

function preloadAdjacent(image: ImageManifest): void {
  const images = navigationImages();
  const index = images.findIndex((candidate) => candidate.id === image.id);
  for (const adjacent of [images[index - 1], images[index + 1]]) {
    if (!adjacent) continue;
    const detail = adjacent.variants.detail.jpeg.find((variant) => variant.width >= 1440) ?? adjacent.variants.detail.jpeg.at(-1);
    if (detail) {
      const preload = new Image();
      preload.src = toUrl(detail.src);
    }
  }
}

function setLightboxImage(image: ImageManifest): void {
  currentImageId = image.id;
  const detail = image.variants.detail;
  const fallback = detail.jpeg.at(-1) ?? detail.jpeg[0];
  if (lightboxAvif) lightboxAvif.srcset = variantSrcset(detail.avif);
  if (lightboxWebp) lightboxWebp.srcset = variantSrcset(detail.webp);
  if (lightboxImage) {
    lightboxImage.src = toUrl(fallback.src);
    lightboxImage.srcset = variantSrcset(detail.jpeg);
    lightboxImage.sizes = '100vw';
    lightboxImage.width = image.width;
    lightboxImage.height = image.height;
    lightboxImage.alt = image.alt;
  }
  if (lightboxCaption) lightboxCaption.textContent = image.caption || image.alt;
  const images = navigationImages();
  const index = images.findIndex((candidate) => candidate.id === image.id);
  if (lightboxPosition) lightboxPosition.textContent = `${index + 1} / ${images.length}`;
  if (downloadLink) {
    downloadLink.href = toUrl(image.download?.src || fallback.src);
    downloadLink.download = `${image.slug}.png`;
  }
  preloadAdjacent(image);
}

function openLightbox(image: ImageManifest): void {
  if (!lightbox.showModal) return;
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  setLightboxImage(image);
  lightbox.showModal();
  closeButton?.focus();
  trackGalleryEvent('image_open', { image_id: image.id, collection: image.collection });
}

function closeLightbox(): void {
  if (lightbox.open) lightbox.close();
  previouslyFocused?.focus();
  previouslyFocused = null;
}

function moveLightbox(step: -1 | 1): void {
  const images = navigationImages();
  const current = images.findIndex((image) => image.id === currentImageId);
  if (current < 0 || images.length < 2) return;
  const next = (current + step + images.length) % images.length;
  setLightboxImage(images[next]);
  trackGalleryEvent('image_open', { image_id: images[next].id, collection: images[next].collection });
}

gallery.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-gallery-open]') : null;
  if (!target) return;
  const image = manifest.images.find((candidate) => candidate.id === target.dataset.galleryOpen);
  if (image) openLightbox(image);
});

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-collection-filter]')) {
  button.addEventListener('click', () => {
    activeCollection = button.dataset.collectionFilter || 'all';
    trackGalleryEvent('collection_select', { collection: activeCollection });
    nextIndex = config.batchSize;
    applyFilter();
  });
}

closeButton?.addEventListener('click', closeLightbox);
previousButton?.addEventListener('click', () => moveLightbox(-1));
nextButton?.addEventListener('click', () => moveLightbox(1));
downloadLink?.addEventListener('click', () => {
  if (currentImageId) {
    const image = manifest.images.find((candidate) => candidate.id === currentImageId);
    if (image) trackGalleryEvent('image_download', { image_id: image.id, collection: image.collection });
  }
});
shareButton?.addEventListener('click', async () => {
  const image = manifest.images.find((candidate) => candidate.id === currentImageId);
  if (!image) return;
  const shareData = { title: image.caption || image.alt, text: image.alt, url: new URL(`?image=${encodeURIComponent(image.slug)}`,window.location.href).href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) await navigator.clipboard.writeText(shareData.url);
    if(shareButton){shareButton.textContent='链接已复制';setTimeout(()=>{shareButton.textContent='分享';},1800);}
    trackGalleryEvent('share_click', { image_id: image.id, collection: image.collection });
  } catch {
    // A cancelled native share is intentionally silent.
  }
});
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeLightbox();
});
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') return;
  if (event.key === 'ArrowLeft') return moveLightbox(-1);
  if (event.key === 'ArrowRight') return moveLightbox(1);
  if (event.key !== 'Tab') return;
  const focusable = [...lightbox.querySelectorAll<HTMLElement>('button, a[href]')].filter((element) => !element.hasAttribute('disabled'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

loadMore?.addEventListener('click', loadNextBatch);
if ('IntersectionObserver' in window && sentinel) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) loadNextBatch();
  }, { rootMargin: '900px 0px' });
  observer.observe(sentinel);
}

trackGalleryEvent('gallery_view', { collection: 'all' });
applyFilter();
const linked = manifest.images.find(image=>image.slug===new URLSearchParams(location.search).get('image'));
if(linked)openLightbox(linked);
