'use client';

import {
  ArrowUpRight,
  Check,
  Download,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  group: string;
  reference: string;
  brand: string;
  image: string;
  accent: string;
};

const products: Product[] = [
  { id: '01', name: '洗衣液', group: '洗护用品', reference: '深层洁净洗衣液', brand: '蓝月亮', image: '/assets/daily-necessities-top20/01-laundry-liquid.png', accent: '#168bd1' },
  { id: '02', name: '洗衣粉', group: '洗护用品', reference: '净白去渍洗衣粉', brand: '汰渍', image: '/assets/daily-necessities-top20/02-laundry-powder.png', accent: '#f36b21' },
  { id: '03', name: '洗衣凝珠', group: '洗护用品', reference: '洗衣凝珠', brand: '奥妙', image: '/assets/daily-necessities-top20/03-laundry-pods.png', accent: '#2162c7' },
  { id: '04', name: '衣物柔顺剂', group: '洗护用品', reference: '衣物护理剂', brand: '金纺', image: '/assets/daily-necessities-top20/04-fabric-softener.png', accent: '#45a66d' },
  { id: '05', name: '洗手液', group: '个人护理', reference: '抑菌洗手液', brand: '滴露', image: '/assets/daily-necessities-top20/05-hand-wash.png', accent: '#e69baf' },
  { id: '06', name: '洗发水', group: '个人护理', reference: '去屑洗发露', brand: '海飞丝', image: '/assets/daily-necessities-top20/06-shampoo.png', accent: '#9184c9' },
  { id: '07', name: '护发素', group: '个人护理', reference: '乳液修护护发素', brand: '潘婷', image: '/assets/daily-necessities-top20/07-conditioner.png', accent: '#c99842' },
  { id: '08', name: '沐浴露', group: '个人护理', reference: '纯白清香沐浴露', brand: '舒肤佳', image: '/assets/daily-necessities-top20/08-body-wash.png', accent: '#2362c5' },
  { id: '09', name: '牙膏', group: '个人护理', reference: '健白防蛀牙膏', brand: '高露洁', image: '/assets/daily-necessities-top20/09-toothpaste.png', accent: '#1e6ed0' },
  { id: '10', name: '洁面乳', group: '个人护理', reference: '米粹洁面乳', brand: '旁氏', image: '/assets/daily-necessities-top20/10-facial-cleanser.png', accent: '#f0bb24' },
  { id: '11', name: '身体乳', group: '个人护理', reference: '深层润肤乳', brand: '妮维雅', image: '/assets/daily-necessities-top20/11-body-lotion.png', accent: '#203b94' },
  { id: '12', name: '卫生纸', group: '纸品湿巾', reference: '超韧卷纸', brand: '维达', image: '/assets/daily-necessities-top20/12-toilet-paper.png', accent: '#2b4ab0' },
  { id: '13', name: '抽纸', group: '纸品湿巾', reference: '原木纯品抽纸', brand: '清风', image: '/assets/daily-necessities-top20/13-tissues.png', accent: '#e2b94e' },
  { id: '14', name: '湿巾', group: '纸品湿巾', reference: '超纯水湿巾', brand: '心相印', image: '/assets/daily-necessities-top20/14-wet-wipes.png', accent: '#8bbfe8' },
  { id: '15', name: '厨房纸巾', group: '纸品湿巾', reference: '厨房纸巾', brand: '清风', image: '/assets/daily-necessities-top20/15-kitchen-towel.png', accent: '#ef7b24' },
  { id: '16', name: '洗洁精', group: '厨房清洁', reference: '青柠洗洁精', brand: '立白', image: '/assets/daily-necessities-top20/16-dishwashing-liquid.png', accent: '#4caf42' },
  { id: '17', name: '厨房重油污净', group: '厨房清洁', reference: '厨房清洁剂', brand: '威猛先生', image: '/assets/daily-necessities-top20/17-kitchen-cleaner.png', accent: '#ef6723' },
  { id: '18', name: '洁厕液', group: '厨房清洁', reference: '洁厕液', brand: '威猛先生', image: '/assets/daily-necessities-top20/18-toilet-cleaner.png', accent: '#ed5a2d' },
  { id: '19', name: '84 消毒液', group: '消毒收纳', reference: '84 消毒液', brand: '蓝月亮', image: '/assets/daily-necessities-top20/19-disinfectant.png', accent: '#168b58' },
  { id: '20', name: '垃圾袋', group: '消毒收纳', reference: '厚实平底垃圾袋', brand: '妙洁', image: '/assets/daily-necessities-top20/20-trash-bags.png', accent: '#f0c400' },
];

const groups = ['全部', '洗护用品', '个人护理', '纸品湿巾', '厨房清洁', '消毒收纳'];

export default function Home() {
  const [activeGroup, setActiveGroup] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('01');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesGroup = activeGroup === '全部' || product.group === activeGroup;
      const searchText = `${product.id} ${product.name} ${product.group} ${product.brand} ${product.reference}`.toLowerCase();
      return matchesGroup && (!query || searchText.includes(query));
    });
  }, [activeGroup, searchTerm]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobilePreviewOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const selectedProduct = filteredProducts.find((product) => product.id === selectedId) ?? filteredProducts[0] ?? null;

  const chooseProduct = (product: Product) => {
    setSelectedId(product.id);
    setMobilePreviewOpen(true);
  };

  const clearFilters = () => {
    setActiveGroup('全部');
    setSearchTerm('');
  };

  return (
    <main className="app-shell">
      <aside className="side-rail" aria-label="日用品图鉴导航">
        <div className="rail-topline">
          <span className="rail-mark" aria-hidden="true">DI</span>
          <span>DAILY INDEX</span>
        </div>

        <div className="rail-brand">
          <p className="rail-kicker">IMAGE LIBRARY / 2026</p>
          <h1>日用品<br />图鉴</h1>
          <p className="rail-description">去标签、纯色白底的常见用品图集。</p>
        </div>

        <nav className="rail-nav" aria-label="按品类筛选">
          <p className="nav-label">COLLECTION</p>
          {groups.map((group) => {
            const count = group === '全部' ? products.length : products.filter((product) => product.group === group).length;
            const isActive = activeGroup === group;

            return (
              <button className={`rail-nav-item${isActive ? ' is-active' : ''}`} key={group} type="button" aria-pressed={isActive} onClick={() => setActiveGroup(group)}>
                <span>{group}</span>
                <span className="nav-count">{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </nav>

        <div className="rail-footer">
          <div className="rail-rule" />
          <p>LOCAL ASSET SET</p>
          <span>20 PNG / 1:1 / WHITE FIELD</span>
        </div>
      </aside>

      <section className="workspace" aria-label="日用品图片素材库">
        <header className="workspace-header">
          <div className="mobile-brand">
            <span className="rail-mark" aria-hidden="true">DI</span>
            <span>日用品图鉴</span>
          </div>
          <div className="header-context">
            <span className="context-dot" aria-hidden="true" />
            <span>日常用品</span>
            <span className="context-separator">/</span>
            <span>去品牌产品图</span>
          </div>
          <div className="header-status">
            <span className="status-dot" aria-hidden="true" />
            <span>素材已就绪</span>
          </div>
        </header>

        <div className="workspace-body">
          <div className="page-intro">
            <div>
              <p className="eyebrow">A CLEAN PRODUCT STUDY</p>
              <h2>日用品图鉴</h2>
              <p className="intro-copy">20 个常见品类，统一的纯色白底产品图。<br className="desktop-break" />直接找到需要的那一件。</p>
            </div>
            <div className="intro-index" aria-label="素材数量">
              <span className="intro-index-number">{String(filteredProducts.length).padStart(2, '0')}</span>
              <span className="intro-index-label">当前显示<br />/ {products.length} 项</span>
            </div>
          </div>

          <div className="control-strip">
            <label className="search-box">
              <Search size={17} strokeWidth={1.8} aria-hidden="true" />
              <span className="sr-only">搜索日用品素材</span>
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="搜索品类、品牌参考或编号" type="search" />
              {searchTerm ? (
                <button type="button" className="clear-search" aria-label="清除搜索" onClick={() => setSearchTerm('')}>
                  <X size={15} aria-hidden="true" />
                </button>
              ) : <kbd>/</kbd>}
            </label>

            <div className="control-actions">
              <button className="filter-button" type="button" onClick={() => setActiveGroup('全部')}>
                <SlidersHorizontal size={15} aria-hidden="true" />
                <span>{activeGroup === '全部' ? '全部分类' : activeGroup}</span>
              </button>
              <div className="view-toggle" aria-label="视图模式">
                <button className={viewMode === 'grid' ? 'is-active' : ''} type="button" aria-label="网格视图" aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')}>
                  <Grid2X2 size={16} aria-hidden="true" />
                </button>
                <button className={viewMode === 'list' ? 'is-active' : ''} type="button" aria-label="列表视图" aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')}>
                  <List size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="mobile-group-nav" aria-label="移动端按品类筛选">
            {groups.map((group) => (
              <button className={activeGroup === group ? 'is-active' : ''} key={group} type="button" aria-pressed={activeGroup === group} onClick={() => setActiveGroup(group)}>
                {group}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className={`product-grid${viewMode === 'list' ? ' is-list' : ''}`}>
              {filteredProducts.map((product, index) => {
                const isSelected = product.id === selectedId;

                return (
                  <button className={`product-card${isSelected ? ' is-selected' : ''}`} key={product.id} type="button" style={{ '--accent': product.accent, '--delay': `${index * 35}ms` } as React.CSSProperties} onClick={() => chooseProduct(product)}>
                    <span className="card-image-wrap">
                      <Image src={product.image} alt={`${product.name}，去品牌纯色白底产品图`} fill sizes="(max-width: 620px) 50vw, (max-width: 1200px) 38vw, 24vw" />
                      <span className="card-index">{product.id}</span>
                      <span className="card-open" aria-hidden="true"><ArrowUpRight size={15} strokeWidth={1.7} /></span>
                    </span>
                    <span className="card-copy">
                      <span className="card-title-row">
                        <span className="card-name">{product.name}</span>
                        <span className="card-accent" aria-hidden="true" />
                      </span>
                      <span className="card-meta">{product.group} · {product.brand}参考</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-mark" aria-hidden="true">∅</div>
              <h3>没有匹配的素材</h3>
              <p>试试别的关键词，或回到全部分类。</p>
              <button type="button" onClick={clearFilters}>清除筛选</button>
            </div>
          )}

          <footer className="workspace-footer">
            <span>ALL IMAGES ARE UNBRANDED / LOCAL PNG ASSETS</span>
            <span>点击图片查看大图与下载</span>
          </footer>
        </div>
      </section>

      <aside className={`preview-panel${mobilePreviewOpen ? ' is-mobile-open' : ''}`} aria-label="所选素材预览">
        <div className="preview-header">
          <span>SELECTED ITEM</span>
          <button className="preview-close" type="button" aria-label="关闭预览" onClick={() => setMobilePreviewOpen(false)}>
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {selectedProduct ? (
          <>
            <div className="preview-image-wrap">
              <Image src={selectedProduct.image} alt={`${selectedProduct.name}大图预览`} fill sizes="(max-width: 900px) 90vw, 28vw" />
              <span className="preview-number">{selectedProduct.id}</span>
            </div>
            <div className="preview-copy">
              <p className="preview-kicker">{selectedProduct.group} / {selectedProduct.id}</p>
              <h3>{selectedProduct.name}</h3>
              <p className="preview-description">参考：{selectedProduct.brand} {selectedProduct.reference}</p>
              <div className="detail-lines">
                <div><span>处理</span><strong>去 Logo · 纯色表面</strong></div>
                <div><span>画面</span><strong>白底 · 1:1 PNG</strong></div>
              </div>
              <a className="download-button" href={selectedProduct.image} download={`daily-index-${selectedProduct.id}-${selectedProduct.name}.png`}>
                <Download size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>下载 PNG</span>
                <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          <div className="preview-empty">
            <Check size={18} aria-hidden="true" />
            <p>选择一张素材查看详情</p>
          </div>
        )}
      </aside>

      {mobilePreviewOpen && selectedProduct ? <button className="mobile-backdrop" type="button" aria-label="关闭预览" onClick={() => setMobilePreviewOpen(false)} /> : null}
    </main>
  );
}
