const products = [
  ['01', '洗衣液', '洗护用品', '深层洁净洗衣液', '蓝月亮', '01-laundry-liquid.png', '#168bd1'],
  ['02', '洗衣粉', '洗护用品', '净白去渍洗衣粉', '汰渍', '02-laundry-powder.png', '#f36b21'],
  ['03', '洗衣凝珠', '洗护用品', '洗衣凝珠', '奥妙', '03-laundry-pods.png', '#2162c7'],
  ['04', '衣物柔顺剂', '洗护用品', '衣物护理剂', '金纺', '04-fabric-softener.png', '#45a66d'],
  ['05', '洗手液', '个人护理', '抑菌洗手液', '滴露', '05-hand-wash.png', '#e69baf'],
  ['06', '洗发水', '个人护理', '去屑洗发露', '海飞丝', '06-shampoo.png', '#9184c9'],
  ['07', '护发素', '个人护理', '乳液修护护发素', '潘婷', '07-conditioner.png', '#c99842'],
  ['08', '沐浴露', '个人护理', '纯白清香沐浴露', '舒肤佳', '08-body-wash.png', '#2362c5'],
  ['09', '牙膏', '个人护理', '健白防蛀牙膏', '高露洁', '09-toothpaste.png', '#1e6ed0'],
  ['10', '洁面乳', '个人护理', '米粹洁面乳', '旁氏', '10-facial-cleanser.png', '#f0bb24'],
  ['11', '身体乳', '个人护理', '深层润肤乳', '妮维雅', '11-body-lotion.png', '#203b94'],
  ['12', '卫生纸', '纸品湿巾', '超韧卷纸', '维达', '12-toilet-paper.png', '#2b4ab0'],
  ['13', '抽纸', '纸品湿巾', '原木纯品抽纸', '清风', '13-tissues.png', '#e2b94e'],
  ['14', '湿巾', '纸品湿巾', '超纯水湿巾', '心相印', '14-wet-wipes.png', '#8bbfe8'],
  ['15', '厨房纸巾', '纸品湿巾', '厨房纸巾', '清风', '15-kitchen-towel.png', '#ef7b24'],
  ['16', '洗洁精', '厨房清洁', '青柠洗洁精', '立白', '16-dishwashing-liquid.png', '#4caf42'],
  ['17', '厨房重油污净', '厨房清洁', '厨房清洁剂', '威猛先生', '17-kitchen-cleaner.png', '#ef6723'],
  ['18', '洁厕液', '厨房清洁', '洁厕液', '威猛先生', '18-toilet-cleaner.png', '#ed5a2d'],
  ['19', '84 消毒液', '消毒收纳', '84 消毒液', '蓝月亮', '19-disinfectant.png', '#168b58'],
  ['20', '垃圾袋', '消毒收纳', '厚实平底垃圾袋', '妙洁', '20-trash-bags.png', '#f0c400'],
  ['21', '电热水壶', '家用电器', '简约电热水壶', '苏泊尔', '21-electric-kettle.png', '#96a28c'],
  ['22', '电饭煲', '家用电器', '电饭锅', '美的', '22-rice-cooker.png', '#ddd5c1'],
  ['23', '微波炉', '家用电器', '微波炉', '格兰仕', '23-microwave-oven.png', '#696d73'],
  ['24', '无线吸尘器', '家用电器', '无线吸尘器', '戴森', '24-cordless-vacuum.png', '#c65d3d'],
  ['25', '吹风机', '家用电器', '高速吹风机', '飞利浦', '25-hair-dryer.png', '#aaa0c8'],
  ['26', '电风扇', '家用电器', '便携电风扇', '美的', '26-electric-fan.png', '#f0c843'],
  ['27', '空气净化器', '家用电器', '空气净化器', '小米', '27-air-purifier.png', '#8aadc9'],
  ['28', '加湿器', '家用电器', '冷雾加湿器', '小熊', '28-humidifier.png', '#e7a6a9'],
  ['29', '电动牙刷', '家用电器', '声波电动牙刷', '飞利浦', '29-electric-toothbrush.png', '#253f8b'],
  ['30', '电熨斗', '家用电器', '蒸汽电熨斗', '飞利浦', '30-steam-iron.png', '#a4c2b0'],
].map(([id, name, group, reference, brand, file, accent]) => ({ id, name, group, reference, brand, file, accent }));

const groups = ['全部', '洗护用品', '个人护理', '纸品湿巾', '厨房清洁', '消毒收纳', '家用电器'];
const assetRoot = './assets/daily-necessities-top20/';
const productGrid = document.querySelector('#productGrid');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const visibleCount = document.querySelector('#visibleCount');
const filterLabel = document.querySelector('#filterLabel');
const previewPanel = document.querySelector('#previewPanel');
const mobileBackdrop = document.querySelector('#mobileBackdrop');
const previewImage = document.querySelector('#previewImage');
const previewNumber = document.querySelector('#previewNumber');
const previewKicker = document.querySelector('#previewKicker');
const previewName = document.querySelector('#previewName');
const previewDescription = document.querySelector('#previewDescription');
const downloadButton = document.querySelector('#downloadButton');

let activeGroup = '全部';
let selectedId = '01';
let viewMode = 'grid';

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return products.filter((product) => {
    const matchesGroup = activeGroup === '全部' || product.group === activeGroup;
    const searchText = `${product.id} ${product.name} ${product.group} ${product.brand} ${product.reference}`.toLowerCase();
    return matchesGroup && (!query || searchText.includes(query));
  });
}

function cardMarkup(product, index) {
  const selected = product.id === selectedId ? ' is-selected' : '';
  return `<button class="product-card${selected}" type="button" data-product-id="${product.id}" style="--accent:${product.accent};--delay:${index * 35}ms">
    <span class="card-image-wrap">
      <img src="${assetRoot}${product.file}" alt="${product.name}，去品牌纯色白底产品图" loading="lazy" />
      <span class="card-index">${product.id}</span>
      <span class="card-open" aria-hidden="true">↗</span>
    </span>
    <span class="card-copy">
      <span class="card-title-row"><span class="card-name">${product.name}</span><span class="card-accent" aria-hidden="true"></span></span>
      <span class="card-meta">${product.group} · ${product.brand}参考</span>
    </span>
  </button>`;
}

function renderPreview(product) {
  if (!product) return;
  previewImage.src = `${assetRoot}${product.file}`;
  previewImage.alt = `${product.name}大图预览`;
  previewNumber.textContent = product.id;
  previewKicker.textContent = `${product.group} / ${product.id}`;
  previewName.textContent = product.name;
  previewDescription.textContent = `参考：${product.brand} ${product.reference}`;
  downloadButton.href = `${assetRoot}${product.file}`;
  downloadButton.download = `daily-index-${product.id}-${product.name}.png`;
  downloadButton.dataset.umamiEventItem = product.name;
}

function render() {
  const filtered = getFilteredProducts();
  visibleCount.textContent = String(filtered.length).padStart(2, '0');
  filterLabel.textContent = activeGroup === '全部' ? '全部分类' : activeGroup;
  productGrid.classList.toggle('is-list', viewMode === 'list');
  productGrid.innerHTML = filtered.map(cardMarkup).join('');
  emptyState.hidden = filtered.length > 0;
  productGrid.hidden = filtered.length === 0;
  const selected = filtered.find((product) => product.id === selectedId) || filtered[0] || products[0];
  if (selected) {
    selectedId = selected.id;
    renderPreview(selected);
  }
  document.querySelectorAll('[data-group-filter]').forEach((button) => {
    const selectedGroup = button.dataset.groupFilter === activeGroup;
    button.classList.toggle('is-active', selectedGroup);
    button.setAttribute('aria-pressed', String(selectedGroup));
  });
  productGrid.querySelectorAll('[data-product-id]').forEach((card) => {
    card.addEventListener('click', () => {
      selectedId = card.dataset.productId;
      render();
      previewPanel.classList.add('is-mobile-open');
      mobileBackdrop.hidden = false;
    });
  });
}

function closePreview() {
  previewPanel.classList.remove('is-mobile-open');
  mobileBackdrop.hidden = true;
}

document.querySelectorAll('[data-group-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    activeGroup = button.dataset.groupFilter;
    render();
  });
});

searchInput.addEventListener('input', render);
document.querySelector('#resetFilter').addEventListener('click', () => {
  activeGroup = '全部';
  searchInput.value = '';
  render();
});
document.querySelector('#clearFilters').addEventListener('click', () => {
  activeGroup = '全部';
  searchInput.value = '';
  render();
});
document.querySelector('#gridView').addEventListener('click', () => {
  viewMode = 'grid';
  document.querySelector('#gridView').classList.add('is-active');
  document.querySelector('#listView').classList.remove('is-active');
  document.querySelector('#gridView').setAttribute('aria-pressed', 'true');
  document.querySelector('#listView').setAttribute('aria-pressed', 'false');
  render();
});
document.querySelector('#listView').addEventListener('click', () => {
  viewMode = 'list';
  document.querySelector('#listView').classList.add('is-active');
  document.querySelector('#gridView').classList.remove('is-active');
  document.querySelector('#listView').setAttribute('aria-pressed', 'true');
  document.querySelector('#gridView').setAttribute('aria-pressed', 'false');
  render();
});
document.querySelector('#previewClose').addEventListener('click', closePreview);
mobileBackdrop.addEventListener('click', closePreview);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePreview();
  if (event.key === '/' && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

render();
