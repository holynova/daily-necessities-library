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
  { id: '21', name: '电热水壶', group: '家用电器', reference: '简约电热水壶', brand: '苏泊尔', image: '/assets/daily-necessities-top20/21-electric-kettle.png', accent: '#96a28c' },
  { id: '22', name: '电饭煲', group: '家用电器', reference: '电饭锅', brand: '美的', image: '/assets/daily-necessities-top20/22-rice-cooker.png', accent: '#ddd5c1' },
  { id: '23', name: '微波炉', group: '家用电器', reference: '微波炉', brand: '格兰仕', image: '/assets/daily-necessities-top20/23-microwave-oven.png', accent: '#696d73' },
  { id: '24', name: '无线吸尘器', group: '家用电器', reference: '无线吸尘器', brand: '戴森', image: '/assets/daily-necessities-top20/24-cordless-vacuum.png', accent: '#c65d3d' },
  { id: '25', name: '吹风机', group: '家用电器', reference: '高速吹风机', brand: '飞利浦', image: '/assets/daily-necessities-top20/25-hair-dryer.png', accent: '#aaa0c8' },
  { id: '26', name: '电风扇', group: '家用电器', reference: '便携电风扇', brand: '美的', image: '/assets/daily-necessities-top20/26-electric-fan.png', accent: '#f0c843' },
  { id: '27', name: '空气净化器', group: '家用电器', reference: '空气净化器', brand: '小米', image: '/assets/daily-necessities-top20/27-air-purifier.png', accent: '#8aadc9' },
  { id: '28', name: '加湿器', group: '家用电器', reference: '冷雾加湿器', brand: '小熊', image: '/assets/daily-necessities-top20/28-humidifier.png', accent: '#e7a6a9' },
  { id: '29', name: '电动牙刷', group: '家用电器', reference: '声波电动牙刷', brand: '飞利浦', image: '/assets/daily-necessities-top20/29-electric-toothbrush.png', accent: '#253f8b' },
  { id: '30', name: '电熨斗', group: '家用电器', reference: '蒸汽电熨斗', brand: '飞利浦', image: '/assets/daily-necessities-top20/30-steam-iron.png', accent: '#a4c2b0' },
  { id: '31', name: '瓶装水', group: '饮料食品', reference: '天然饮用水', brand: '农夫山泉', image: '/assets/daily-necessities-top20/31-bottled-water.png', accent: '#71b6d6' },
  { id: '32', name: '碳酸饮料', group: '饮料食品', reference: '经典可乐', brand: '可口可乐', image: '/assets/daily-necessities-top20/32-soda-can.png', accent: '#e35f56' },
  { id: '33', name: '橙汁', group: '饮料食品', reference: '果粒橙', brand: '美汁源', image: '/assets/daily-necessities-top20/33-orange-juice.png', accent: '#f39a31' },
  { id: '34', name: '牛奶', group: '饮料食品', reference: '纯牛奶', brand: '伊利', image: '/assets/daily-necessities-top20/34-milk-carton.png', accent: '#8ea8cf' },
  { id: '35', name: '即溶咖啡', group: '饮料食品', reference: '速溶咖啡', brand: '雀巢', image: '/assets/daily-necessities-top20/35-instant-coffee.png', accent: '#8e633f' },
  { id: '36', name: '方便面', group: '饮料食品', reference: '红烧牛肉面', brand: '康师傅', image: '/assets/daily-necessities-top20/36-instant-noodles.png', accent: '#e0b64a' },
  { id: '37', name: '面包', group: '饮料食品', reference: '鲜切吐司', brand: '桃李', image: '/assets/daily-necessities-top20/37-bread.png', accent: '#d28d48' },
  { id: '38', name: '鸡蛋', group: '饮料食品', reference: '鲜鸡蛋', brand: '德青源', image: '/assets/daily-necessities-top20/38-eggs.png', accent: '#c48a52' },
  { id: '39', name: '薯片', group: '饮料食品', reference: '原味薯片', brand: '乐事', image: '/assets/daily-necessities-top20/39-potato-chips.png', accent: '#f47720' },
  { id: '40', name: '饼干', group: '饮料食品', reference: '巧克力夹心饼干', brand: '奥利奥', image: '/assets/daily-necessities-top20/40-cookies.png', accent: '#9e765b' },
];

const groups = ['全部', '洗护用品', '个人护理', '纸品湿巾', '厨房清洁', '消毒收纳', '家用电器', '饮料食品'];

const categorySummaries = [
  { group: '洗护用品', image: '/assets/category-summaries/01-laundry-care.png', stillLife: '/assets/category-still-life/01-laundry-care-still-life.png', description: '衣物清洁与护理' },
  { group: '个人护理', image: '/assets/category-summaries/02-personal-care.png', stillLife: '/assets/category-still-life/02-personal-care-still-life.png', description: '清洁、洗护与日常护理' },
  { group: '纸品湿巾', image: '/assets/category-summaries/03-paper-wipes.png', stillLife: '/assets/category-still-life/03-paper-wipes-still-life.png', description: '纸品、抽取式与擦拭用品' },
  { group: '厨房清洁', image: '/assets/category-summaries/04-kitchen-cleaning.png', stillLife: '/assets/category-still-life/04-kitchen-cleaning-still-life.png', description: '厨房与卫生间清洁用品' },
  { group: '消毒收纳', image: '/assets/category-summaries/05-disinfect-storage.png', stillLife: '/assets/category-still-life/05-disinfect-storage-still-life.png', description: '消毒与家庭收纳' },
  { group: '家用电器', image: '/assets/category-summaries/06-home-appliances.png', stillLife: '/assets/category-still-life/06-home-appliances-still-life.png', description: '高频小家电' },
  { group: '饮料食品', image: '/assets/category-summaries/07-food-beverages.png', stillLife: '/assets/category-still-life/07-food-beverages-still-life.png', description: '日常饮品与即食食品' },
];

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
  const activeSummary = categorySummaries.find((summary) => summary.group === activeGroup) ?? null;

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
          <span>40 PNG / 1:1 / WHITE FIELD</span>
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
              <p className="intro-copy">40 个常见品类，统一的纯色白底产品图。<br className="desktop-break" />直接找到需要的那一件。</p>
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

          {activeSummary && !searchTerm.trim() ? (
            <section className="category-overview" aria-labelledby="category-overview-title">
              <div className="category-overview-copy">
                <p className="eyebrow">CATEGORY OVERVIEW / {String(products.filter((product) => product.group === activeSummary.group).length).padStart(2, '0')} ITEMS</p>
                <h3 id="category-overview-title">{activeSummary.group}<span>静物合集 · 排版汇总</span></h3>
                <p className="category-overview-description">{activeSummary.description}。一张自然摆放的桌面静物合集，加上一张便于核对的排版汇总图。</p>
                <div className="category-overview-meta">
                  <div><span>内容</span><strong>{products.filter((product) => product.group === activeSummary.group).length} 件素材</strong></div>
                  <div><span>画面</span><strong>静物桌面 · 3:2 PNG</strong></div>
                </div>
                <a className="download-button category-download" href={activeSummary.stillLife} download={`daily-index-${activeSummary.group}-静物合集.png`} data-umami-event="download-category-still-life" data-umami-event-item={activeSummary.group}>
                  <Download size={17} strokeWidth={1.8} aria-hidden="true" />
                  <span>下载静物合集</span>
                  <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a className="category-secondary-download" href={activeSummary.image} download={`daily-index-${activeSummary.group}-排版汇总.png`} data-umami-event="download-category-summary" data-umami-event-item={activeSummary.group}>
                  <span>下载排版汇总</span>
                  <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>
              <div className="category-overview-gallery">
                <figure className="category-overview-figure is-primary">
                  <div className="category-overview-image-wrap">
                    {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                    <img src={activeSummary.stillLife} alt={`${activeSummary.group}静物合集图，所有类别素材一起摆放在干净桌面上`} decoding="async" />
                  </div>
                  <figcaption><span>STILL LIFE / 合集</span><strong>桌面静物</strong></figcaption>
                </figure>
                <figure className="category-overview-figure">
                  <div className="category-overview-image-wrap">
                    {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                    <img src={activeSummary.image} alt={`${activeSummary.group}排版汇总图，包含该类别全部素材`} decoding="async" />
                  </div>
                  <figcaption><span>CATALOG / 汇总</span><strong>排版全图</strong></figcaption>
                </figure>
              </div>
            </section>
          ) : null}

          {filteredProducts.length > 0 ? (
            <div className={`product-grid${viewMode === 'list' ? ' is-list' : ''}`}>
              {filteredProducts.map((product, index) => {
                const isSelected = product.id === selectedId;

                return (
                  <button className={`product-card${isSelected ? ' is-selected' : ''}`} key={product.id} type="button" style={{ '--accent': product.accent, '--delay': `${index * 35}ms` } as React.CSSProperties} onClick={() => chooseProduct(product)}>
                    <span className="card-image-wrap">
                      {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                      <img src={product.image} alt={`${product.name}，去品牌纯色白底产品图`} loading="lazy" decoding="async" />
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
            <a className="workspace-repo-link" href="https://github.com/holynova/daily-necessities-library" target="_blank" rel="noreferrer" data-umami-event="open-github">
              <span aria-hidden="true">◉</span>
              <span>GitHub Repo</span>
              <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
            </a>
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
              {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
              <img src={selectedProduct.image} alt={`${selectedProduct.name}大图预览`} decoding="async" />
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
              <a className="download-button" href={selectedProduct.image} download={`daily-index-${selectedProduct.id}-${selectedProduct.name}.png`} data-umami-event="download-png" data-umami-event-item={selectedProduct.name}>
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
