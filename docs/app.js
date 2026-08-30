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
  ['31', '瓶装水', '饮料食品', '天然饮用水', '农夫山泉', '31-bottled-water.png', '#71b6d6'],
  ['32', '碳酸饮料', '饮料食品', '经典可乐', '可口可乐', '32-soda-can.png', '#e35f56'],
  ['33', '橙汁', '饮料食品', '果粒橙', '美汁源', '33-orange-juice.png', '#f39a31'],
  ['34', '牛奶', '饮料食品', '纯牛奶', '伊利', '34-milk-carton.png', '#8ea8cf'],
  ['35', '即溶咖啡', '饮料食品', '速溶咖啡', '雀巢', '35-instant-coffee.png', '#8e633f'],
  ['36', '方便面', '饮料食品', '红烧牛肉面', '康师傅', '36-instant-noodles.png', '#e0b64a'],
  ['37', '面包', '饮料食品', '鲜切吐司', '桃李', '37-bread.png', '#d28d48'],
  ['38', '鸡蛋', '饮料食品', '鲜鸡蛋', '德青源', '38-eggs.png', '#c48a52'],
  ['39', '薯片', '饮料食品', '原味薯片', '乐事', '39-potato-chips.png', '#f47720'],
  ['40', '饼干', '饮料食品', '巧克力夹心饼干', '奥利奥', '40-cookies.png', '#9e765b'],
  ['41', '海飞丝去屑洗发水', '宝洁公司', '去屑洗发露', '海飞丝', 'brand-products/41-pg-head-shoulders-shampoo.png', '#1d58c9'],
  ['42', '舒肤佳香皂', '宝洁公司', '经典香皂', '舒肤佳', 'brand-products/42-pg-safeguard-bar-soap.png', '#e33f43'],
  ['43', '潘婷护发素', '宝洁公司', '乳液修护护发素', '潘婷', 'brand-products/43-pg-pantene-conditioner.png', '#c99842'],
  ['44', '佳洁士牙膏', '宝洁公司', '健白防蛀牙膏', '佳洁士', 'brand-products/44-pg-crest-toothpaste.png', '#1e6ed0'],
  ['45', '玉兰油面霜', '宝洁公司', '大红瓶面霜', '玉兰油', 'brand-products/45-pg-olay-face-cream.png', '#d7506b'],
  ['46', '雀巢咖啡', '雀巢公司', '速溶咖啡', '雀巢', 'brand-products/46-nestle-instant-coffee.png', '#8e633f'],
  ['47', '雀巢奶粉', '雀巢公司', '成人奶粉', '雀巢', 'brand-products/47-nestle-milk-powder.png', '#2e65c7'],
  ['48', '奇巧巧克力', '雀巢公司', '巧克力威化', '奇巧', 'brand-products/48-nestle-kitkat-chocolate.png', '#e32c2c'],
  ['49', '美极鲜味汁', '雀巢公司', '鲜味汁', '美极', 'brand-products/49-nestle-maggi-seasoning.png', '#e7b61d'],
  ['50', '雀巢炼乳', '雀巢公司', '甜炼乳', '雀巢', 'brand-products/50-nestle-condensed-milk.png', '#c9d7ec'],
  ['51', '百事可乐', '百事公司', '经典可乐', '百事', 'brand-products/51-pepsico-pepsi-cola.png', '#1f61cf'],
  ['52', '七喜柠檬汽水', '百事公司', '柠檬味汽水', '七喜', 'brand-products/52-pepsico-7up-soda.png', '#3fae53'],
  ['53', '美年达橙味汽水', '百事公司', '橙味汽水', '美年达', 'brand-products/53-pepsico-mirinda-orange-soda.png', '#f39a31'],
  ['54', '乐事原味薯片', '百事公司', '原味薯片', '乐事', 'brand-products/54-pepsico-lays-potato-chips.png', '#f4c20f'],
  ['55', '佳得乐运动饮料', '百事公司', '橙味运动饮料', '佳得乐', 'brand-products/55-pepsico-gatorade-sports-drink.png', '#ef761c'],
  ['56', '力士洗发水', '联合利华', '丝滑柔亮洗发水', '力士', 'brand-products/56-unilever-lux-shampoo.png', '#76615f'],
  ['57', '多芬沐浴露', '联合利华', '滋养沐浴露', '多芬', 'brand-products/57-unilever-dove-body-wash.png', '#a5c7eb'],
  ['58', '清扬洗发水', '联合利华', '去屑洗发水', '清扬', 'brand-products/58-unilever-clear-shampoo.png', '#2f65d4'],
  ['59', '奥妙洗衣液', '联合利华', '深层洁净洗衣液', '奥妙', 'brand-products/59-unilever-omo-laundry-liquid.png', '#68bf3e'],
  ['60', '立顿红茶', '联合利华', '经典红茶', '立顿', 'brand-products/60-unilever-lipton-tea.png', '#efc31a'],
  ['61', '飞天茅台', '茅台', '53度白酒', '茅台', 'brand-products/61-moutai-feitian-baijiu.png', '#d93938'],
  ['62', '茅台1935', '茅台', '酱香型白酒', '茅台', 'brand-products/62-moutai-1935-baijiu.png', '#76152b'],
  ['63', '茅台王子酒', '茅台', '酱香型白酒', '茅台', 'brand-products/63-moutai-prince-baijiu.png', '#991d26'],
  ['64', '茅台迎宾酒', '茅台', '酱香型白酒', '茅台', 'brand-products/64-moutai-yingbin-baijiu.png', '#df343d'],
  ['65', '贵州大曲', '茅台', '酱香型白酒', '贵州大曲', 'brand-products/65-moutai-guizhou-daqu.png', '#8f3820'],
  ['66', '金典纯牛奶', '伊利', '有机纯牛奶', '伊利', 'brand-products/66-yili-golden-milk.png', '#1e7048'],
  ['67', '安慕希酸奶', '伊利', '希腊风味酸奶', '安慕希', 'brand-products/67-yili-ambrosial-yogurt.png', '#d39a37'],
  ['68', '伊利舒化奶', '伊利', '舒化无乳糖牛奶', '伊利', 'brand-products/68-yili-shuhua-milk.png', '#79b8df'],
  ['69', 'QQ 星儿童牛奶', '伊利', '儿童成长牛奶', 'QQ星', 'brand-products/69-yili-childrens-milk.png', '#34a9df'],
  ['70', '伊利优酸乳', '伊利', '乳酸菌饮品', '优酸乳', 'brand-products/70-yili-yogurt-drink.png', '#2d77d9'],
  ['71', '蓝月亮洗衣液（大包装）', '品牌补充', '深层洁净大包装', '蓝月亮', 'brand-products/71-blue-moon-laundry-large.png', '#1c76c6'],
  ['72', '蓝月亮洗衣液（中包装）', '品牌补充', '深层洁净中包装', '蓝月亮', 'brand-products/72-blue-moon-laundry-medium.png', '#2588d4'],
  ['73', '蓝月亮洗衣液（小包装）', '品牌补充', '深层洁净小包装', '蓝月亮', 'brand-products/73-blue-moon-laundry-small.png', '#389bd6'],
  ['74', '心相印抽纸', '品牌补充', '经典抽纸', '心相印', 'brand-products/74-heart-to-heart-tissues.png', '#e5a8b2'],
  ['75', '德宝抽纸', '品牌补充', '柔韧抽纸', '德宝', 'brand-products/75-tempo-tissues.png', '#34538a'],
  ['76', '维达抽纸', '品牌补充', '超韧抽纸', '维达', 'brand-products/76-vinda-tissues.png', '#2f64bc'],
].map(([id, name, group, reference, brand, file, accent]) => ({ id, name, group, reference, brand, file, accent }));

const groups = ['全部', '洗护用品', '个人护理', '纸品湿巾', '厨房清洁', '消毒收纳', '家用电器', '饮料食品', '宝洁公司', '雀巢公司', '百事公司', '联合利华', '茅台', '伊利', '品牌补充'];
const categorySummaries = [
  ['洗护用品', './assets/category-summaries/01-laundry-care.png', './assets/category-still-life/01-laundry-care-still-life.png', '衣物清洁与护理'],
  ['个人护理', './assets/category-summaries/02-personal-care.png', './assets/category-still-life/02-personal-care-still-life.png', '清洁、洗护与日常护理'],
  ['纸品湿巾', './assets/category-summaries/03-paper-wipes.png', './assets/category-still-life/03-paper-wipes-still-life.png', '纸品、抽取式与擦拭用品'],
  ['厨房清洁', './assets/category-summaries/04-kitchen-cleaning.png', './assets/category-still-life/04-kitchen-cleaning-still-life.png', '厨房与卫生间清洁用品'],
  ['消毒收纳', './assets/category-summaries/05-disinfect-storage.png', './assets/category-still-life/05-disinfect-storage-still-life.png', '消毒与家庭收纳'],
  ['家用电器', './assets/category-summaries/06-home-appliances.png', './assets/category-still-life/06-home-appliances-still-life.png', '高频小家电'],
  ['饮料食品', './assets/category-summaries/07-food-beverages.png', './assets/category-still-life/07-food-beverages-still-life.png', '日常饮品与即食食品'],
  ['宝洁公司', './assets/category-summaries/08-procter-gamble.png', './assets/category-still-life/08-procter-gamble-still-life.png', '海飞丝、舒肤佳、潘婷等日常护理产品'],
  ['雀巢公司', './assets/category-summaries/09-nestle.png', './assets/category-still-life/09-nestle-still-life.png', '咖啡、乳制品与巧克力食品'],
  ['百事公司', './assets/category-summaries/10-pepsico.png', './assets/category-still-life/10-pepsico-still-life.png', '汽水、薯片与运动饮料'],
  ['联合利华', './assets/category-summaries/11-unilever.png', './assets/category-still-life/11-unilever-still-life.png', '洗护、清洁与茶饮产品'],
  ['茅台', './assets/category-summaries/12-moutai.png', './assets/category-still-life/12-moutai-still-life.png', '常见酱香型白酒产品'],
  ['伊利', './assets/category-summaries/13-yili.png', './assets/category-still-life/13-yili-still-life.png', '牛奶、酸奶与乳饮品'],
  ['品牌补充', './assets/category-summaries/14-brand-supplements.png', './assets/category-still-life/14-brand-supplements-still-life.png', '多种包装规格洗衣液与主流抽纸']
].map(([group, image, stillLife, description]) => ({ group, image, stillLife, description }));
const assetRoot = './assets/';
function getAssetPath(product) {
  return `${assetRoot}${product.file.includes('/') ? product.file : `daily-necessities-top20/${product.file}`}`;
}
const productGrid = document.querySelector('#productGrid');
const emptyState = document.querySelector('#emptyState');
const categoryOverview = document.querySelector('#categoryOverview');
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
      <img src="${getAssetPath(product)}" alt="${product.name}，去品牌纯色白底产品图" loading="lazy" />
      <span class="card-index">${product.id}</span>
      <span class="card-open" aria-hidden="true">↗</span>
    </span>
    <span class="card-copy">
      <span class="card-title-row"><span class="card-name">${product.name}</span><span class="card-accent" aria-hidden="true"></span></span>
      <span class="card-meta">${product.group} · ${product.brand}参考</span>
    </span>
</button>`;
}

function renderCategoryOverview() {
  const summary = categorySummaries.find((item) => item.group === activeGroup);
  const hasSearch = searchInput.value.trim().length > 0;
  if (!summary || hasSearch) {
    categoryOverview.hidden = true;
    categoryOverview.innerHTML = '';
    return;
  }

  const count = products.filter((product) => product.group === summary.group).length;
  categoryOverview.innerHTML = `<div class="category-overview-copy">
    <p class="eyebrow">CATEGORY OVERVIEW / ${String(count).padStart(2, '0')} ITEMS</p>
    <h3 id="categoryOverviewTitle">${summary.group}<span>静物合集 · 排版汇总</span></h3>
    <p class="category-overview-description">${summary.description}。一张自然摆放的桌面静物合集，加上一张便于核对的排版汇总图。</p>
    <div class="category-overview-meta">
      <div><span>内容</span><strong>${count} 件素材</strong></div>
      <div><span>画面</span><strong>静物桌面 · 3:2 PNG</strong></div>
    </div>
    <a class="download-button category-download" href="${summary.stillLife}" download="daily-index-${summary.group}-静物合集.png" data-umami-event="download-category-still-life" data-umami-event-item="${summary.group}">
      <span>↓</span>
      <span>下载静物合集</span>
      <span>↗</span>
    </a>
    <a class="category-secondary-download" href="${summary.image}" download="daily-index-${summary.group}-排版汇总.png" data-umami-event="download-category-summary" data-umami-event-item="${summary.group}">
      <span>下载排版汇总</span>
      <span>↗</span>
    </a>
  </div>
  <div class="category-overview-gallery">
    <figure class="category-overview-figure is-primary">
      <div class="category-overview-image-wrap">
        <img src="${summary.stillLife}" alt="${summary.group}静物合集图，所有类别素材一起摆放在干净桌面上" decoding="async" />
      </div>
      <figcaption><span>STILL LIFE / 合集</span><strong>桌面静物</strong></figcaption>
    </figure>
    <figure class="category-overview-figure">
      <div class="category-overview-image-wrap">
        <img src="${summary.image}" alt="${summary.group}排版汇总图，包含该类别全部素材" decoding="async" />
      </div>
      <figcaption><span>CATALOG / 汇总</span><strong>排版全图</strong></figcaption>
    </figure>
  </div>`;
  categoryOverview.hidden = false;
}

function renderPreview(product) {
  if (!product) return;
  previewImage.src = getAssetPath(product);
  previewImage.alt = `${product.name}大图预览`;
  previewNumber.textContent = product.id;
  previewKicker.textContent = `${product.group} / ${product.id}`;
  previewName.textContent = product.name;
  previewDescription.textContent = `参考：${product.brand} ${product.reference}`;
  downloadButton.href = getAssetPath(product);
  downloadButton.download = `daily-index-${product.id}-${product.name}.png`;
  downloadButton.dataset.umamiEventItem = product.name;
}

function render() {
  const filtered = getFilteredProducts();
  visibleCount.textContent = String(filtered.length).padStart(2, '0');
  filterLabel.textContent = activeGroup === '全部' ? '全部分类' : activeGroup;
  renderCategoryOverview();
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
