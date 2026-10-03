'use client';

import {
  ChevronLeft,
  ChevronRight,
  Download,
  GitBranch as Github,
  Heart,
  Bookmark,
  Compass,
  Grid2X2,
  SlidersHorizontal,
  ArrowUpRight,
  Link2,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import imageDimensions from './image-dimensions.json';

const getImageDimensions = (source: string) =>
  (imageDimensions as Record<string, { width: number; height: number }>)[
    source
  ] ?? { width: 400, height: 400 };

type Product = {
  id: string;
  name: string;
  group: string;
  collectionGroup?: string;
  reference: string;
  brand: string;
  image: string;
  accent: string;
  treatment?: string;
};

type CategorySummary = {
  group: string;
  stillLife: string;
  description: string;
  accent: string;
};

type CollectionSummary = CategorySummary & {
  id: string;
  label?: string;
  itemIds?: string[];
};

type ShareTarget =
  | { type: 'product'; product: Product }
  | { type: 'collection'; collection: CollectionSummary };

const INITIAL_FEED_ITEMS = 12;
const FEED_CHUNK_SIZE = 12;

const GITHUB_PAGES_PATH = '/daily-necessities-library';

const getAssetUrl = (source: string) => {
  if (!source.startsWith('/assets/')) return source;

  const basePath =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith(GITHUB_PAGES_PATH)
      ? GITHUB_PAGES_PATH
      : '';
  return `${basePath}${source}`;
};

const getThumbnailUrl = (source: string) => {
  const thumbnailSource = source.startsWith('/assets/')
    ? source
        .replace('/assets/', '/assets/thumbnails/')
        .replace(/\.png$/i, '.webp')
    : source;
  return getAssetUrl(thumbnailSource);
};

const getDetailUrl = (source: string) =>
  getAssetUrl(
    source.replace('/assets/', '/assets/details/').replace(/\.png$/i, '.webp'),
  );

type ProgressiveImageProps = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
};

function ProgressiveImage({
  src,
  thumbnailSrc = getThumbnailUrl(src),
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
}: ProgressiveImageProps) {
  const resolvedSrc = getAssetUrl(src);
  const resolvedThumbnailSrc = thumbnailSrc
    ? getAssetUrl(thumbnailSrc)
    : getThumbnailUrl(src);
  const [displaySrc, setDisplaySrc] = useState(
    resolvedThumbnailSrc || resolvedSrc,
  );

  useEffect(() => {
    let cancelled = false;

    if (
      !resolvedSrc ||
      !resolvedThumbnailSrc ||
      resolvedThumbnailSrc === resolvedSrc
    ) {
      return () => {
        cancelled = true;
      };
    }

    const highResolutionImage = new Image();
    const promoteImage = () => {
      if (!cancelled) setDisplaySrc(resolvedSrc);
    };

    highResolutionImage.decoding = 'async';
    if (typeof highResolutionImage.decode !== 'function')
      highResolutionImage.onload = promoteImage;
    highResolutionImage.src = resolvedSrc;
    if (typeof highResolutionImage.decode === 'function') {
      void highResolutionImage
        .decode()
        .then(promoteImage)
        .catch(() => undefined);
    }

    return () => {
      cancelled = true;
      highResolutionImage.onload = null;
    };
  }, [resolvedSrc, resolvedThumbnailSrc]);

  return (
    // oxlint-disable-next-line next/no-img-element -- local assets need a thumbnail-first loading path.
    <img
      className={className}
      src={displaySrc || resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={(event) => {
        if (event.currentTarget.dataset.fallback !== 'used') {
          event.currentTarget.dataset.fallback = 'used';
          event.currentTarget.onerror = null;
          event.currentTarget.src = resolvedSrc;
        }
      }}
    />
  );
}

const newFmcgProductIds = new Set(
  Array.from({ length: 40 }, (_, index) => String(index + 77)),
);

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
  { id: '41', name: '海飞丝去屑洗发水', group: '宝洁公司', reference: '去屑洗发露', brand: '海飞丝', image: '/assets/brand-products/41-pg-head-shoulders-shampoo.png', accent: '#1d58c9' },
  { id: '42', name: '舒肤佳香皂', group: '宝洁公司', reference: '经典香皂', brand: '舒肤佳', image: '/assets/brand-products/42-pg-safeguard-bar-soap.png', accent: '#e33f43' },
  { id: '43', name: '潘婷护发素', group: '宝洁公司', reference: '乳液修护护发素', brand: '潘婷', image: '/assets/brand-products/43-pg-pantene-conditioner.png', accent: '#c99842' },
  { id: '44', name: '佳洁士牙膏', group: '宝洁公司', reference: '健白防蛀牙膏', brand: '佳洁士', image: '/assets/brand-products/44-pg-crest-toothpaste.png', accent: '#1e6ed0' },
  { id: '45', name: '玉兰油面霜', group: '宝洁公司', reference: '大红瓶面霜', brand: '玉兰油', image: '/assets/brand-products/45-pg-olay-face-cream.png', accent: '#d7506b' },
  { id: '46', name: '雀巢咖啡', group: '雀巢公司', reference: '速溶咖啡', brand: '雀巢', image: '/assets/brand-products/46-nestle-instant-coffee.png', accent: '#8e633f' },
  { id: '47', name: '雀巢奶粉', group: '雀巢公司', reference: '成人奶粉', brand: '雀巢', image: '/assets/brand-products/47-nestle-milk-powder.png', accent: '#2e65c7' },
  { id: '48', name: '奇巧巧克力', group: '雀巢公司', reference: '巧克力威化', brand: '奇巧', image: '/assets/brand-products/48-nestle-kitkat-chocolate.png', accent: '#e32c2c' },
  { id: '49', name: '美极鲜味汁', group: '雀巢公司', reference: '鲜味汁', brand: '美极', image: '/assets/brand-products/49-nestle-maggi-seasoning.png', accent: '#e7b61d' },
  { id: '50', name: '雀巢炼乳', group: '雀巢公司', reference: '甜炼乳', brand: '雀巢', image: '/assets/brand-products/50-nestle-condensed-milk.png', accent: '#c9d7ec' },
  { id: '51', name: '百事可乐', group: '百事公司', reference: '经典可乐', brand: '百事', image: '/assets/brand-products/51-pepsico-pepsi-cola.png', accent: '#1f61cf' },
  { id: '52', name: '七喜柠檬汽水', group: '百事公司', reference: '柠檬味汽水', brand: '七喜', image: '/assets/brand-products/52-pepsico-7up-soda.png', accent: '#3fae53' },
  { id: '53', name: '美年达橙味汽水', group: '百事公司', reference: '橙味汽水', brand: '美年达', image: '/assets/brand-products/53-pepsico-mirinda-orange-soda.png', accent: '#f39a31' },
  { id: '54', name: '乐事原味薯片', group: '百事公司', reference: '原味薯片', brand: '乐事', image: '/assets/brand-products/54-pepsico-lays-potato-chips.png', accent: '#f4c20f' },
  { id: '55', name: '佳得乐运动饮料', group: '百事公司', reference: '橙味运动饮料', brand: '佳得乐', image: '/assets/brand-products/55-pepsico-gatorade-sports-drink.png', accent: '#ef761c' },
  { id: '56', name: '力士洗发水', group: '联合利华', reference: '丝滑柔亮洗发水', brand: '力士', image: '/assets/brand-products/56-unilever-lux-shampoo.png', accent: '#76615f' },
  { id: '57', name: '多芬沐浴露', group: '联合利华', reference: '滋养沐浴露', brand: '多芬', image: '/assets/brand-products/57-unilever-dove-body-wash.png', accent: '#a5c7eb' },
  { id: '58', name: '清扬洗发水', group: '联合利华', reference: '去屑洗发水', brand: '清扬', image: '/assets/brand-products/58-unilever-clear-shampoo.png', accent: '#2f65d4' },
  { id: '59', name: '奥妙洗衣液', group: '联合利华', reference: '深层洁净洗衣液', brand: '奥妙', image: '/assets/brand-products/59-unilever-omo-laundry-liquid.png', accent: '#68bf3e' },
  { id: '60', name: '立顿红茶', group: '联合利华', reference: '经典红茶', brand: '立顿', image: '/assets/brand-products/60-unilever-lipton-tea.png', accent: '#efc31a' },
  { id: '61', name: '飞天茅台', group: '茅台', reference: '53度白酒', brand: '茅台', image: '/assets/brand-products/61-moutai-feitian-baijiu.png', accent: '#d93938' },
  { id: '62', name: '茅台1935', group: '茅台', reference: '酱香型白酒', brand: '茅台', image: '/assets/brand-products/62-moutai-1935-baijiu.png', accent: '#76152b' },
  { id: '63', name: '茅台王子酒', group: '茅台', reference: '酱香型白酒', brand: '茅台', image: '/assets/brand-products/63-moutai-prince-baijiu.png', accent: '#991d26' },
  { id: '64', name: '茅台迎宾酒', group: '茅台', reference: '酱香型白酒', brand: '茅台', image: '/assets/brand-products/64-moutai-yingbin-baijiu.png', accent: '#df343d' },
  { id: '65', name: '贵州大曲', group: '茅台', reference: '酱香型白酒', brand: '贵州大曲', image: '/assets/brand-products/65-moutai-guizhou-daqu.png', accent: '#8f3820' },
  { id: '66', name: '金典纯牛奶', group: '伊利', reference: '有机纯牛奶', brand: '伊利', image: '/assets/brand-products/66-yili-golden-milk.png', accent: '#1e7048' },
  { id: '67', name: '安慕希酸奶', group: '伊利', reference: '希腊风味酸奶', brand: '安慕希', image: '/assets/brand-products/67-yili-ambrosial-yogurt.png', accent: '#d39a37' },
  { id: '68', name: '伊利舒化奶', group: '伊利', reference: '舒化无乳糖牛奶', brand: '伊利', image: '/assets/brand-products/68-yili-shuhua-milk.png', accent: '#79b8df' },
  { id: '69', name: 'QQ 星儿童牛奶', group: '伊利', reference: '儿童成长牛奶', brand: 'QQ星', image: '/assets/brand-products/69-yili-childrens-milk.png', accent: '#34a9df' },
  { id: '70', name: '伊利优酸乳', group: '伊利', reference: '乳酸菌饮品', brand: '优酸乳', image: '/assets/brand-products/70-yili-yogurt-drink.png', accent: '#2d77d9' },
  { id: '71', name: '蓝月亮洗衣液（大包装）', group: '品牌补充', reference: '深层洁净大包装', brand: '蓝月亮', image: '/assets/brand-products/71-blue-moon-laundry-large.png', accent: '#1c76c6' },
  { id: '72', name: '蓝月亮洗衣液（中包装）', group: '品牌补充', reference: '深层洁净中包装', brand: '蓝月亮', image: '/assets/brand-products/72-blue-moon-laundry-medium.png', accent: '#2588d4' },
  { id: '73', name: '蓝月亮洗衣液（小包装）', group: '品牌补充', reference: '深层洁净小包装', brand: '蓝月亮', image: '/assets/brand-products/73-blue-moon-laundry-small.png', accent: '#389bd6' },
  { id: '74', name: '心相印抽纸', group: '品牌补充', reference: '经典抽纸', brand: '心相印', image: '/assets/brand-products/74-heart-to-heart-tissues.png', accent: '#e5a8b2' },
  { id: '75', name: '德宝抽纸', group: '品牌补充', reference: '柔韧抽纸', brand: '德宝', image: '/assets/brand-products/75-tempo-tissues.png', accent: '#34538a' },
  { id: '76', name: '维达抽纸', group: '品牌补充', reference: '超韧抽纸', brand: '维达', image: '/assets/brand-products/76-vinda-tissues.png', accent: '#2f64bc' },
  { id: '77', name: '汰渍洗衣液', group: '洗护用品', reference: '液体洗衣液', brand: 'Tide', image: '/assets/fmcg-tear-labels/tide-laundry-detergent.png', accent: '#8ea8b6', treatment: '完整去标 · 低饱和表面' },
  { id: '78', name: '碧浪洗衣液', group: '洗护用品', reference: '液体洗衣液', brand: 'Ariel', image: '/assets/fmcg-tear-labels/ariel-laundry-detergent.png', accent: '#8ba5a0', treatment: '完整去标 · 低饱和表面' },
  { id: '79', name: '当妮衣物柔顺剂', group: '洗护用品', reference: '衣物柔顺剂', brand: 'Downy', image: '/assets/fmcg-tear-labels/downy-fabric-softener.png', accent: '#aa9aa9', treatment: '完整去标 · 低饱和表面' },
  { id: '80', name: 'Persil 洗衣液', group: '洗护用品', reference: '液体洗衣液', brand: 'Persil', image: '/assets/fmcg-tear-labels/persil-laundry-detergent.png', accent: '#6f7d75', treatment: '完整去标 · 低饱和表面' },
  { id: '81', name: 'Surf 洗衣液', group: '洗护用品', reference: '洗衣液补充袋', brand: 'Surf', image: '/assets/fmcg-tear-labels/surf-laundry-detergent.png', accent: '#a198a7', treatment: '完整去标 · 低饱和表面' },
  { id: '82', name: '金纺衣物柔顺剂', group: '洗护用品', reference: '衣物柔顺剂', brand: 'Comfort', image: '/assets/fmcg-tear-labels/comfort-fabric-softener.png', accent: '#9aa58e', treatment: '完整去标 · 低饱和表面' },
  { id: '83', name: '欧乐 B 牙刷', group: '个人护理', reference: '透明罩卡纸牙刷', brand: 'Oral-B', image: '/assets/fmcg-tear-labels/oral-b-toothbrush.png', accent: '#7f9cab', treatment: '完整去标 · 低饱和表面' },
  { id: '84', name: '吉列剃须刀', group: '个人护理', reference: '剃须刀与纸套', brand: 'Gillette', image: '/assets/fmcg-tear-labels/gillette-razor.png', accent: '#787f87', treatment: '完整去标 · 低饱和表面' },
  { id: '85', name: '高露洁牙膏', group: '个人护理', reference: '软管牙膏', brand: 'Colgate', image: '/assets/fmcg-tear-labels/colgate-toothpaste.png', accent: '#a77f82', treatment: '完整去标 · 低饱和表面' },
  { id: '86', name: '棕榄沐浴露', group: '个人护理', reference: '透明泵头沐浴露', brand: 'Palmolive', image: '/assets/fmcg-tear-labels/palmolive-body-wash.png', accent: '#858e75', treatment: '完整去标 · 低饱和表面' },
  { id: '87', name: 'Softsoap 洗手液', group: '个人护理', reference: '按压泵洗手液', brand: 'Softsoap', image: '/assets/fmcg-tear-labels/softsoap-hand-soap.png', accent: '#b1969b', treatment: '完整去标 · 低饱和表面' },
  { id: '88', name: '凡士林修护霜', group: '个人护理', reference: '身体护理霜罐', brand: 'Vaseline', image: '/assets/fmcg-tear-labels/vaseline-body-care.png', accent: '#b89d87', treatment: '完整去标 · 低饱和表面' },
  { id: '89', name: '欧莱雅洗发水', group: '个人护理', reference: '扁椭圆洗发水', brand: "L'Oréal Paris", image: '/assets/fmcg-tear-labels/loreal-shampoo.png', accent: '#83787b', treatment: '完整去标 · 低饱和表面' },
  { id: '90', name: '妮维雅防晒乳', group: '个人护理', reference: '翻盖防晒乳', brand: 'NIVEA', image: '/assets/fmcg-tear-labels/nivea-sunscreen.png', accent: '#8da4b1', treatment: '完整去标 · 低饱和表面' },
  { id: '91', name: 'Bounty 厨房纸', group: '纸品湿巾', reference: '厨房纸卷与纸套', brand: 'Bounty', image: '/assets/fmcg-tear-labels/bounty-paper-towels.png', accent: '#a9a18d', treatment: '完整去标 · 低饱和表面' },
  { id: '92', name: 'Charmin 卷纸', group: '纸品湿巾', reference: '多卷卫生纸包', brand: 'Charmin', image: '/assets/fmcg-tear-labels/charmin-toilet-paper.png', accent: '#b6a1ab', treatment: '完整去标 · 低饱和表面' },
  { id: '93', name: 'Puffs 抽纸', group: '纸品湿巾', reference: '方盒抽纸', brand: 'Puffs', image: '/assets/fmcg-tear-labels/puffs-facial-tissues.png', accent: '#9ba4b0', treatment: '完整去标 · 低饱和表面' },
  { id: '94', name: '舒洁湿巾', group: '纸品湿巾', reference: '软抽湿巾包', brand: 'Kleenex', image: '/assets/fmcg-tear-labels/kleenex-wet-wipes.png', accent: '#9aafa7', treatment: '完整去标 · 低饱和表面' },
  { id: '95', name: 'Dawn 洗洁精', group: '厨房清洁', reference: '透明洗洁精', brand: 'Dawn', image: '/assets/fmcg-tear-labels/dawn-dish-soap.png', accent: '#8fa5af', treatment: '完整去标 · 低饱和表面' },
  { id: '96', name: 'Cascade 洗碗机凝珠', group: '厨房清洁', reference: '洗碗机凝珠纸盒', brand: 'Cascade', image: '/assets/fmcg-tear-labels/cascade-dishwasher-pods.png', accent: '#9aa995', treatment: '完整去标 · 低饱和表面' },
  { id: '97', name: 'Mr. Clean 多用途清洁剂', group: '厨房清洁', reference: '扳机喷雾清洁剂', brand: 'Mr. Clean', image: '/assets/fmcg-tear-labels/mr-clean-all-purpose-cleaner.png', accent: '#949f8e', treatment: '完整去标 · 低饱和表面' },
  { id: '98', name: 'Cif 厨房清洁乳', group: '厨房清洁', reference: '挤压式清洁乳', brand: 'Cif', image: '/assets/fmcg-tear-labels/cif-cream-cleaner.png', accent: '#ae8585', treatment: '完整去标 · 低饱和表面' },
  { id: '99', name: 'Febreze 空气清新剂', group: '消毒收纳', reference: '空气清新剂喷雾', brand: 'Febreze', image: '/assets/fmcg-tear-labels/febreze-air-freshener.png', accent: '#9590a4', treatment: '完整去标 · 低饱和表面' },
  { id: '100', name: 'Clorox 消毒喷雾', group: '消毒收纳', reference: '扳机消毒喷雾', brand: 'Clorox', image: '/assets/fmcg-tear-labels/clorox-disinfecting-spray.png', accent: '#a5b2a0', treatment: '完整去标 · 低饱和表面' },
  { id: '101', name: 'Glad 保鲜袋', group: '消毒收纳', reference: '保鲜袋分配纸盒', brand: 'Glad', image: '/assets/fmcg-tear-labels/glad-food-storage-bags.png', accent: '#94a4aa', treatment: '完整去标 · 低饱和表面' },
  { id: '102', name: 'Swiffer 除尘拖把', group: '消毒收纳', reference: '除尘工具与纸套', brand: 'Swiffer', image: '/assets/fmcg-tear-labels/swiffer-duster.png', accent: '#9696a7', treatment: '完整去标 · 低饱和表面' },
  { id: '103', name: '可口可乐', group: '饮料食品', reference: '玻璃瓶可乐', brand: 'Coca-Cola', image: '/assets/fmcg-tear-labels/coca-cola-soft-drink.png', accent: '#9a7772', treatment: '完整去标 · 低饱和表面' },
  { id: '104', name: 'Sprite 柠檬汽水', group: '饮料食品', reference: '柠檬青柠汽水罐', brand: 'Sprite', image: '/assets/fmcg-tear-labels/sprite-lemon-lime-soda.png', accent: '#92a699', treatment: '完整去标 · 低饱和表面' },
  { id: '105', name: 'Fanta 橙味汽水', group: '饮料食品', reference: '橙味汽水罐', brand: 'Fanta Orange', image: '/assets/fmcg-tear-labels/fanta-orange-soda.png', accent: '#b29a84', treatment: '完整去标 · 低饱和表面' },
  { id: '106', name: 'Aquafina 瓶装水', group: '饮料食品', reference: '细长 PET 瓶装水', brand: 'Aquafina', image: '/assets/fmcg-tear-labels/aquafina-bottled-water.png', accent: '#9caeb5', treatment: '完整去标 · 低饱和表面' },
  { id: '107', name: '红牛能量饮料', group: '饮料食品', reference: '金属能量饮料罐', brand: 'Red Bull', image: '/assets/fmcg-tear-labels/red-bull-energy-drink.png', accent: '#9c9482', treatment: '完整去标 · 低饱和表面' },
  { id: '108', name: '星巴克即饮咖啡', group: '饮料食品', reference: '即饮咖啡瓶', brand: 'Starbucks', image: '/assets/fmcg-tear-labels/starbucks-rtd-coffee.png', accent: '#9a8074', treatment: '完整去标 · 低饱和表面' },
  { id: '109', name: '美禄麦芽饮料', group: '饮料食品', reference: '麦芽可可饮料罐', brand: 'Milo', image: '/assets/fmcg-tear-labels/milo-malt-drink.png', accent: '#889889', treatment: '完整去标 · 低饱和表面' },
  { id: '110', name: '多力多滋玉米片', group: '饮料食品', reference: '三角玉米片立袋', brand: 'Doritos', image: '/assets/fmcg-tear-labels/doritos-tortilla-chips.png', accent: '#a78e78', treatment: '完整去标 · 低饱和表面' },
  { id: '111', name: '奇多芝士膨化', group: '饮料食品', reference: '芝士膨化零食立袋', brand: 'Cheetos', image: '/assets/fmcg-tear-labels/cheetos-cheese-snacks.png', accent: '#afa388', treatment: '完整去标 · 低饱和表面' },
  { id: '112', name: '桂格燕麦片', group: '饮料食品', reference: '燕麦圆罐', brand: 'Quaker', image: '/assets/fmcg-tear-labels/quaker-oats.png', accent: '#9ea8af', treatment: '完整去标 · 低饱和表面' },
  { id: '113', name: 'Indomie 方便面', group: '饮料食品', reference: '方形枕式面饼袋', brand: 'Indomie', image: '/assets/fmcg-tear-labels/indomie-instant-noodles.png', accent: '#9c8279', treatment: '完整去标 · 低饱和表面' },
  { id: '114', name: 'Ottogi 辣味方便面', group: '饮料食品', reference: '辣味方形枕式面袋', brand: 'Ottogi Jin Ramen', image: '/assets/fmcg-tear-labels/ottogi-jin-ramen.png', accent: '#9e817d', treatment: '完整去标 · 低饱和表面' },
  { id: '115', name: 'Parle-G 饼干', group: '饮料食品', reference: '小型枕式饼干包', brand: 'Parle-G', image: '/assets/fmcg-tear-labels/parle-g-biscuits.png', accent: '#ab9b75', treatment: '完整去标 · 低饱和表面' },
  { id: '116', name: 'Britannia Good Day 饼干', group: '饮料食品', reference: '立式饼干袋', brand: 'Good Day', image: '/assets/fmcg-tear-labels/britannia-good-day-cookies.png', accent: '#ae917b', treatment: '完整去标 · 低饱和表面' },
].map((product) => (newFmcgProductIds.has(product.id) ? { ...product, collectionGroup: '新增快销品' } : product));

const groups = ['全部', '合集', '新增快销品', '洗护用品', '个人护理', '纸品湿巾', '厨房清洁', '消毒收纳', '家用电器', '饮料食品', '宝洁公司', '雀巢公司', '百事公司', '联合利华', '茅台', '伊利', '品牌补充'];

const categorySummaries: CategorySummary[] = [
  { group: '洗护用品', stillLife: '/assets/category-still-life/01-laundry-care-still-life.png', description: '衣物清洁与护理', accent: '#168bd1' },
  { group: '个人护理', stillLife: '/assets/category-still-life/02-personal-care-still-life.png', description: '清洁、洗护与日常护理', accent: '#9184c9' },
  { group: '纸品湿巾', stillLife: '/assets/category-still-life/03-paper-wipes-still-life.png', description: '纸品、抽取式与擦拭用品', accent: '#8bbfe8' },
  { group: '厨房清洁', stillLife: '/assets/category-still-life/04-kitchen-cleaning-still-life.png', description: '厨房与卫生间清洁用品', accent: '#4caf42' },
  { group: '消毒收纳', stillLife: '/assets/category-still-life/05-disinfect-storage-still-life.png', description: '消毒与家庭收纳', accent: '#168b58' },
  { group: '家用电器', stillLife: '/assets/category-still-life/06-home-appliances-still-life.png', description: '高频小家电', accent: '#8aadc9' },
  { group: '饮料食品', stillLife: '/assets/category-still-life/07-food-beverages-still-life.png', description: '日常饮品与即食食品', accent: '#f39a31' },
  { group: '宝洁公司', stillLife: '/assets/category-still-life/08-procter-gamble-still-life.png', description: '海飞丝、舒肤佳、潘婷等日常护理产品', accent: '#d7506b' },
  { group: '雀巢公司', stillLife: '/assets/category-still-life/09-nestle-still-life.png', description: '咖啡、乳制品与巧克力食品', accent: '#e32c2c' },
  { group: '百事公司', stillLife: '/assets/category-still-life/10-pepsico-still-life.png', description: '汽水、薯片与运动饮料', accent: '#1f61cf' },
  { group: '联合利华', stillLife: '/assets/category-still-life/11-unilever-still-life.png', description: '洗护、清洁与茶饮产品', accent: '#68bf3e' },
  { group: '茅台', stillLife: '/assets/category-still-life/12-moutai-still-life.png', description: '常见酱香型白酒产品', accent: '#d93938' },
  { group: '伊利', stillLife: '/assets/category-still-life/13-yili-still-life.png', description: '牛奶、酸奶与乳饮品', accent: '#2d77d9' },
  { group: '品牌补充', stillLife: '/assets/category-still-life/14-brand-supplements-still-life.png', description: '多种包装规格洗衣液与主流抽纸', accent: '#389bd6' },
  { group: '新增快销品', stillLife: '/assets/category-still-life/15-fmcg-laundry-still-life.png', description: '40 张完整去标快销品，配套 7 组细分桌面静物合照', accent: '#a78e78' },
];

const newFmcgCollections: CollectionSummary[] = [
  { id: 'fmcg-laundry', group: '新增快销品', label: '新增快销品 · 洗护', stillLife: '/assets/category-still-life/15-fmcg-laundry-still-life.png', description: '6 件新增洗护素材', accent: '#8ea8b6', itemIds: ['77', '78', '79', '80', '81', '82'] },
  { id: 'fmcg-personal-care', group: '新增快销品', label: '新增快销品 · 个人护理', stillLife: '/assets/category-still-life/16-fmcg-personal-care-still-life.png', description: '8 件新增个人护理素材', accent: '#a77f82', itemIds: ['83', '84', '85', '86', '87', '88', '89', '90'] },
  { id: 'fmcg-paper-wipes', group: '新增快销品', label: '新增快销品 · 纸品湿巾', stillLife: '/assets/category-still-life/17-fmcg-paper-wipes-still-life.png', description: '4 件新增纸品湿巾素材', accent: '#9ba4b0', itemIds: ['91', '92', '93', '94'] },
  { id: 'fmcg-kitchen-cleaning', group: '新增快销品', label: '新增快销品 · 厨房清洁', stillLife: '/assets/category-still-life/18-fmcg-kitchen-cleaning-still-life.png', description: '4 件新增厨房清洁素材', accent: '#949f8e', itemIds: ['95', '96', '97', '98'] },
  { id: 'fmcg-disinfect-storage', group: '新增快销品', label: '新增快销品 · 消毒收纳', stillLife: '/assets/category-still-life/19-fmcg-disinfect-storage-still-life.png', description: '4 件新增消毒收纳素材', accent: '#9696a7', itemIds: ['99', '100', '101', '102'] },
  { id: 'fmcg-beverages', group: '新增快销品', label: '新增快销品 · 饮料', stillLife: '/assets/category-still-life/20-fmcg-beverages-still-life.png', description: '7 件新增饮料素材', accent: '#9a8074', itemIds: ['103', '104', '105', '106', '107', '108', '109'] },
  { id: 'fmcg-snacks-food', group: '新增快销品', label: '新增快销品 · 零食食品', stillLife: '/assets/category-still-life/21-fmcg-snacks-food-still-life.png', description: '7 件新增零食食品素材', accent: '#a78e78', itemIds: ['110', '111', '112', '113', '114', '115', '116'] },
];

const collectionSummaries: CollectionSummary[] = [
  ...categorySummaries.filter((summary) => summary.group !== '新增快销品').map((summary) => ({ ...summary, id: summary.group })),
  ...newFmcgCollections,
];

const isProductInGroup = (product: Product, group: string) => product.group === group || product.collectionGroup === group;
const getProductCount = (group: string) => products.filter((product) => isProductInGroup(product, group)).length;
const getCollectionProductCount = (summary: CollectionSummary) => summary.itemIds?.length ?? getProductCount(summary.group);

const getShareTitle = (target: ShareTarget) => target.type === 'product' ? target.product.name : target.collection.label ?? target.collection.group;
const getShareImage = (target: ShareTarget) => target.type === 'product' ? target.product.image : target.collection.stillLife;
const getShareSeries = (target: ShareTarget) => target.type === 'product' ? target.product.group : '桌面静物合集';
const getShareDescription = (target: ShareTarget) => target.type === 'product'
  ? `${target.product.group} · ${target.product.brand}参考 · ${target.product.reference}`
  : `${target.collection.description} · 本地 PNG 素材`;
const getShareUrl = (target: ShareTarget) => {
  if (typeof window === 'undefined') return '';
  const id = target.type === 'product' ? target.product.id : target.collection.id;
  return `${window.location.origin}${window.location.pathname}?item=${encodeURIComponent(id)}&type=${target.type}&share=1`;
};

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('图片加载失败'));
  image.src = getAssetUrl(src);
});

const drawContain = (context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
  const imageRatio = (image.naturalWidth || image.width) / (image.naturalHeight || image.height);
  const boxRatio = width / height;
  const drawWidth = imageRatio > boxRatio ? width : height * imageRatio;
  const drawHeight = imageRatio > boxRatio ? width / imageRatio : height;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
};

export default function Home() {
  const [activeGroup, setActiveGroup] = useState('全部');
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [columnCount, setColumnCount] = useState(2);
  useEffect(() => {
    const updateColumns = () =>
      setColumnCount(
        window.innerWidth > 1100 ? 4 : window.innerWidth > 680 ? 3 : 2,
      );
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);
  const [sortOrder, setSortOrder] = useState('推荐');
  const touchStartRef = useRef<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('01');
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    collectionSummaries[0].id,
  );
  const [selectedType, setSelectedType] = useState<'product' | 'collection'>(
    'product',
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [shareItem, setShareItem] = useState<ShareTarget | null>(null);
  const [shareQrDataUrl, setShareQrDataUrl] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');
  const [isSavingShareCard, setIsSavingShareCard] = useState(false);
  const [feedRenderState, setFeedRenderState] = useState({
    key: '',
    limit: INITIAL_FEED_ITEMS,
  });
  const feedSentinelRef = useRef<HTMLDivElement>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];

    const stored = window.localStorage.getItem('daily-library-favorites');
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === 'string')
        : [];
    } catch {
      window.localStorage.removeItem('daily-library-favorites');
      return [];
    }
  });

  const navGroups = [
    '全部',
    '合集',
    ...groups.filter((group) => group !== '全部' && group !== '合集'),
    '我的收藏',
  ];
  const isCollectionView = activeGroup === '合集';
  const isFavoritesView = activeGroup === '我的收藏';
  const query = searchTerm.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesGroup =
        activeGroup === '全部' ||
        (isFavoritesView
          ? favoriteIds.includes(product.id)
          : isProductInGroup(product, activeGroup));
      const searchText = [
        product.id,
        product.name,
        product.group,
        product.collectionGroup,
        product.brand,
        product.reference,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return (
        !isCollectionView &&
        matchesGroup &&
        (!query || searchText.includes(query))
      );
    });
    if (sortOrder === '最新') return result.slice().reverse();
    if (sortOrder === '名称')
      return result.slice().sort((a, b) => a.name.localeCompare(b.name, 'zh'));
    return result;
  }, [
    activeGroup,
    favoriteIds,
    isCollectionView,
    isFavoritesView,
    query,
    sortOrder,
  ]);

  const filteredCollections = useMemo(() => {
    return collectionSummaries.filter((summary, index) => {
      const number = String(index + 1).padStart(2, '0');
      const searchText = [
        number,
        summary.label ?? summary.group,
        summary.description,
        '桌面静物',
      ]
        .join(' ')
        .toLowerCase();

      return (
        (isCollectionView || activeGroup === '全部') &&
        (!query || searchText.includes(query))
      );
    });
  }, [isCollectionView, activeGroup, query]);

  const selectedProduct =
    products.find((product) => product.id === selectedId) ??
    filteredProducts[0] ??
    null;
  const selectedCollection =
    collectionSummaries.find(
      (summary) => summary.id === selectedCollectionId,
    ) ??
    filteredCollections[0] ??
    null;
  const feedItems: ShareTarget[] = [
    ...filteredCollections.map((collection) => ({
      type: 'collection' as const,
      collection,
    })),
    ...filteredProducts.map((product) => ({
      type: 'product' as const,
      product,
    })),
  ];
  const filteredFeedLength = feedItems.length;
  const feedFilterKey = `${activeGroup}\u0000${query}\u0000${sortOrder}`;
  const renderLimit =
    feedRenderState.key === feedFilterKey
      ? feedRenderState.limit
      : INITIAL_FEED_ITEMS;
  const visibleFeedItems = feedItems.slice(0, renderLimit);
  const hasMoreFeedItems = renderLimit < filteredFeedLength;
  const modalItem =
    selectedType === 'collection' ? selectedCollection : selectedProduct;
  const modalListCount =
    selectedType === 'collection'
      ? filteredCollections.length
      : filteredProducts.length;
  const modalIndex =
    selectedType === 'collection'
      ? Math.max(
          0,
          filteredCollections.findIndex(
            (summary) => summary.id === selectedCollection?.id,
          ),
        )
      : Math.max(
          0,
          filteredProducts.findIndex(
            (product) => product.id === selectedProduct?.id,
          ),
        );

  const visibleCount = filteredFeedLength;
  const shareUrl = shareItem ? getShareUrl(shareItem) : '';

  // Only warm adjacent thumbnails while a detail is open; never prefetch originals.
  useEffect(() => {
    if (!modalOpen || modalListCount < 2) return;
    for (const offset of [-1, 1]) {
      const index = (modalIndex + offset + modalListCount) % modalListCount;
      const source =
        selectedType === 'collection'
          ? filteredCollections[index]?.stillLife
          : filteredProducts[index]?.image;
      if (!source) continue;
      const image = new Image();
      image.decoding = 'async';
      image.src = getThumbnailUrl(source);
    }
  }, [
    modalOpen,
    modalIndex,
    modalListCount,
    selectedType,
    filteredCollections,
    filteredProducts,
  ]);

  useEffect(() => {
    const sentinel = feedSentinelRef.current;
    if (
      !sentinel ||
      !hasMoreFeedItems ||
      directoryOpen ||
      !('IntersectionObserver' in window)
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setFeedRenderState((current) => {
          const currentLimit =
            current.key === feedFilterKey ? current.limit : INITIAL_FEED_ITEMS;
          return {
            key: feedFilterKey,
            limit: Math.min(currentLimit + FEED_CHUNK_SIZE, filteredFeedLength),
          };
        });
      },
      { rootMargin: '480px 0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [feedFilterKey, filteredFeedLength, hasMoreFeedItems, directoryOpen]);

  const openProduct = (product: Product) => {
    setSelectedId(product.id);
    setSelectedType('product');
    setModalOpen(true);
  };

  const openCollection = (summary: CollectionSummary) => {
    setSelectedCollectionId(summary.id);
    setSelectedType('collection');
    setModalOpen(true);
  };

  const openShareCard = (target: ShareTarget) => {
    setShareFeedback('');
    setShareQrDataUrl('');
    setShareItem(target);
  };

  const closeShareCard = () => {
    setShareItem(null);
    setShareQrDataUrl('');
    setShareFeedback('');
  };

  const navigateSelection = (offset: number) => {
    if (!modalOpen || modalListCount === 0) return;

    if (selectedType === 'collection') {
      const nextIndex =
        (modalIndex + offset + filteredCollections.length) %
        filteredCollections.length;
      setSelectedCollectionId(filteredCollections[nextIndex].id);
      return;
    }

    const nextIndex =
      (modalIndex + offset + filteredProducts.length) % filteredProducts.length;
    setSelectedId(filteredProducts[nextIndex].id);
  };

  useEffect(() => {
    let active = true;

    if (!shareUrl) {
      return () => {
        active = false;
      };
    }

    import('qrcode')
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(shareUrl, {
          width: 220,
          margin: 1,
          color: { dark: '#2d3230', light: '#ffffff' },
        }),
      )
      .then((dataUrl) => {
        if (active) setShareQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (active) setShareQrDataUrl('');
      });

    return () => {
      active = false;
    };
  }, [shareUrl]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');
    const itemType = params.get('type');

    if (!itemId) return;

    const timeoutId = window.setTimeout(() => {
      if (itemType === 'collection') {
        const collection = collectionSummaries.find(
          (summary) => summary.id === itemId,
        );
        if (!collection) return;
        setActiveGroup('合集');
        setSelectedCollectionId(collection.id);
        setSelectedType('collection');
        setModalOpen(true);
        if (params.get('share') === '1')
          setShareItem({ type: 'collection', collection });
        return;
      }

      const product = products.find((item) => item.id === itemId);
      if (!product) return;
      setSelectedId(product.id);
      setSelectedType('product');
      setModalOpen(true);
      if (params.get('share') === '1')
        setShareItem({ type: 'product', product });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shareItem) {
        if (event.key === 'Escape') closeShareCard();
        return;
      }
      if (!modalOpen) return;
      if (event.key === 'Escape') setModalOpen(false);
      if (event.key === 'ArrowLeft') navigateSelection(-1);
      if (event.key === 'ArrowRight') navigateSelection(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (!modalOpen && !shareItem) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>(
      shareItem ? '.share-card-modal' : '.note-detail-modal',
    );
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.querySelector<HTMLElement>('button, a[href]')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input, select',
        ),
      ].filter((el) => el.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', trapFocus);
      if (previous?.isConnected) previous.focus();
    };
  }, [modalOpen, shareItem]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];
      window.localStorage.setItem(
        'daily-library-favorites',
        JSON.stringify(next),
      );
      return next;
    });
  };

  const downloadFavorites = () => {
    favoriteIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product))
      .forEach((product, index) => {
        window.setTimeout(() => {
          const anchor = document.createElement('a');
          anchor.href = getAssetUrl(product.image);
          anchor.download =
            'daily-necessities-' + product.id + '-' + product.name + '.png';
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
        }, index * 160);
      });
  };

  const copyShareLink = async () => {
    if (!shareItem || !shareUrl) return;

    const text = `【撕标签】${getShareTitle(shareItem)}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setShareFeedback('分享链接已复制');
    } catch {
      setShareFeedback('复制失败，请检查浏览器剪贴板权限');
    }
  };

  const saveShareCard = async () => {
    if (!shareItem || !shareQrDataUrl || isSavingShareCard) return;

    setIsSavingShareCard(true);
    setShareFeedback('正在生成分享卡片…');

    try {
      const canvas = document.createElement('canvas');
      const width = 840;
      const height = 1180;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('画布不可用');

      context.fillStyle = '#fbf8f2';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = '#e5dbcb';
      context.lineWidth = 3;
      context.strokeRect(16, 16, width - 32, height - 32);
      context.strokeStyle = '#eedecb';
      context.lineWidth = 1.5;
      context.strokeRect(27, 27, width - 54, height - 54);

      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#68716b';
      context.font =
        '500 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      context.fillText(getShareSeries(shareItem), width / 2, 70);

      const image = await loadImage(getShareImage(shareItem));
      const imageBoxX = 56;
      const imageBoxY = 112;
      const imageBoxWidth = width - 112;
      const imageBoxHeight = 690;
      context.fillStyle = '#ece3d4';
      context.fillRect(imageBoxX, imageBoxY, imageBoxWidth, imageBoxHeight);
      context.save();
      context.beginPath();
      context.roundRect(
        imageBoxX,
        imageBoxY,
        imageBoxWidth,
        imageBoxHeight,
        16,
      );
      context.clip();
      drawContain(
        context,
        image,
        imageBoxX,
        imageBoxY,
        imageBoxWidth,
        imageBoxHeight,
      );
      context.restore();

      context.textAlign = 'left';
      context.fillStyle = '#2d3230';
      context.font =
        '700 34px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      context.fillText(getShareTitle(shareItem), 56, 872);
      context.fillStyle = '#68716b';
      context.font =
        '20px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      const description = getShareDescription(shareItem);
      context.fillText(
        description.length > 34 ? `${description.slice(0, 33)}…` : description,
        56,
        916,
      );

      context.beginPath();
      context.setLineDash([9, 7]);
      context.strokeStyle = '#dcd1c0';
      context.lineWidth = 1.5;
      context.moveTo(56, 972);
      context.lineTo(width - 56, 972);
      context.stroke();
      context.setLineDash([]);

      context.fillStyle = '#2d3230';
      context.font =
        '700 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      context.fillText('扫码查看素材', 56, 1038);
      context.fillStyle = '#878c84';
      context.font =
        '18px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      context.fillText('撕标签 · 本地 PNG 素材库', 56, 1078);

      const qrImage = await loadImage(shareQrDataUrl);
      const qrSize = 132;
      const qrX = width - 56 - qrSize;
      const qrY = 1000;
      context.fillStyle = '#ffffff';
      context.strokeStyle = '#e5ddcf';
      context.lineWidth = 1.5;
      context.beginPath();
      context.roundRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 10);
      context.fill();
      context.stroke();
      context.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (!blob) throw new Error('海报生成失败');
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `撕标签分享卡片_${getShareTitle(shareItem)}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
      setShareFeedback('分享卡片已保存');
    } catch {
      setShareFeedback('生成失败，请稍后重试');
    } finally {
      setIsSavingShareCard(false);
    }
  };

  const clearSearch = () => setSearchTerm('');

  return (
    <main className="library-app">
      <header className="app-header">
        <div className="header-main-row">
          <button
            className="brand-area"
            type="button"
            onClick={() => {
              setDirectoryOpen(false);
              setActiveGroup('全部');
              setSearchTerm('');
              window.scrollTo({ top: 0 });
            }}
            aria-label="撕标签首页"
          >
            <span className="brand-logo" aria-hidden="true">
              <Grid2X2 size={21} strokeWidth={1.6} />
            </span>
            <span className="brand-title">撕标签</span>
            <span className="brand-en">TEAR LABELS</span>
          </button>
          <div className="header-tools">
            <a
              className="github-link"
              href="https://github.com/holynova/daily-necessities-library"
              target="_blank"
              rel="noreferrer"
              aria-label="打开 GitHub 源码仓库"
              data-umami-event="open-github"
            >
              <Github size={17} />
              <span>GitHub</span>
            </a>
            <button
              className="btn-top-download"
              type="button"
              onClick={downloadFavorites}
              disabled={favoriteIds.length === 0}
              aria-label={`下载收藏的 ${favoriteIds.length} 张素材`}
            >
              <Download size={16} />
              <span>
                下载收藏 <strong>{favoriteIds.length}</strong>
              </span>
            </button>
          </div>
        </div>
        <div className="wander-intro">
          <div>
            <p className="wander-eyebrow">THE BEAUTY IN EVERYDAY THINGS</p>
            <h1>
              {directoryOpen
                ? '从喜欢的分类开始。'
                : isFavoritesView
                  ? '把喜欢的日常，留下。'
                  : isCollectionView
                    ? '一起看，换一种灵感。'
                    : '好设计，藏在日常里。'}
            </h1>
            <p className="wander-description">
              {directoryOpen
                ? '按品类和专题，找到合适的素材。'
                : isFavoritesView
                  ? '你的私人素材夹，下次灵感从这里开始。'
                  : '去掉标签，留下形状、材质和一点生活的美。'}
            </p>
          </div>
          <p className="wander-inventory">
            <strong>{products.length}</strong> 张产品素材 <span>·</span>{' '}
            {collectionSummaries.length} 组静物合集
          </p>
        </div>
        <label className="search-capsule">
          <Search className="search-icon" size={18} aria-hidden="true" />
          <span className="sr-only">搜索日用品素材</span>
          <input
            id="search-input"
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setDirectoryOpen(false);
            }}
            placeholder="搜索品类、品牌参考或编号"
            autoComplete="off"
          />
          {searchTerm ? (
            <button
              className="clear-search"
              type="button"
              aria-label="清除搜索"
              onClick={clearSearch}
            >
              <X size={15} />
            </button>
          ) : (
            <span className="search-caption" aria-hidden="true">
              找到一份灵感
            </span>
          )}
        </label>
        <div className="series-tabs-wrap">
          <nav className="series-tabs" aria-label="素材分类">
            {navGroups
              .filter((group) => group !== '我的收藏')
              .map((group) => (
                <button
                  className={
                    'series-tab' +
                    (!directoryOpen && activeGroup === group ? ' active' : '')
                  }
                  type="button"
                  key={group}
                  aria-pressed={!directoryOpen && activeGroup === group}
                  onClick={() => {
                    setActiveGroup(group);
                    setDirectoryOpen(false);
                    setSearchTerm('');
                    setModalOpen(false);
                  }}
                >
                  <span className="tab-text">{group}</span>
                </button>
              ))}
          </nav>
        </div>
      </header>

      <section className="feed-container" aria-label="日用品素材库">
        <div className="feed-status">
          <span>
            {directoryOpen
              ? '分类目录'
              : isCollectionView
                ? '桌面静物'
                : isFavoritesView
                  ? '我的收藏'
                  : activeGroup === '全部'
                    ? '为你发现'
                    : activeGroup}
            <span className="status-count">
              {' '}
              · {directoryOpen ? categorySummaries.length : visibleCount}{' '}
              {directoryOpen
                ? '个分类'
                : isCollectionView
                  ? '组合集'
                  : '张素材'}
            </span>
          </span>
          {!directoryOpen && !isCollectionView ? (
            <label className="sort-control">
              <SlidersHorizontal size={13} aria-hidden="true" />
              <span className="sr-only">素材排序</span>
              <select
                aria-label="素材排序"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option>推荐</option>
                <option>最新</option>
                <option>名称</option>
              </select>
            </label>
          ) : (
            <span className="collection-caption">看见日常的另一面</span>
          )}
        </div>

        {query ? (
          <div className="search-result-line">
            <span>正在搜索 “{searchTerm}”</span>
            <button type="button" onClick={clearSearch}>
              清除
            </button>
          </div>
        ) : null}

        {directoryOpen ? (
          <div className="category-directory">
            {categorySummaries.map((summary, index) => (
              <button
                type="button"
                className="category-entry"
                key={summary.group}
                onClick={() => {
                  setActiveGroup(summary.group);
                  setDirectoryOpen(false);
                  setSearchTerm('');
                }}
              >
                <ProgressiveImage
                  src={getThumbnailUrl(summary.stillLife)}
                  thumbnailSrc={getThumbnailUrl(summary.stillLife)}
                  alt={summary.group + '分类封面'}
                  width={400}
                  height={267}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <span>
                  <small>COLLECTION {String(index + 1).padStart(2, '0')}</small>
                  <strong>{summary.group}</strong>
                  <span>
                    {getProductCount(summary.group)} 张素材 ·{' '}
                    {summary.description}
                  </span>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <div className="feed-grid natural-feed" aria-label="合集与日用品素材">
            {Array.from({ length: columnCount }, (_, column) => (
              <div className="feed-column" key={column}>
                {visibleFeedItems
                  .filter((_, index) => index % columnCount === column)
                  .map((entry) => {
                    if (entry.type === 'collection') {
                      const summary = entry.collection;
                      const collectionLabel = summary.label ?? summary.group;
                      const itemCount = getCollectionProductCount(summary);
                      const isLcpCandidate =
                        visibleFeedItems.indexOf(entry) < columnCount;

                      return (
                        <article
                          className="feed-card collection-card"
                          key={summary.id}
                        >
                          <button
                            className="feed-card-main"
                            type="button"
                            aria-label={
                              '打开' + collectionLabel + '桌面静物合集'
                            }
                            onClick={() => openCollection(summary)}
                          >
                            <span className="feed-card-media">
                              {/* oxlint-disable-next-line next/no-img-element -- local image assets stay client-side for fast browsing. */}
                              <img
                                src={getThumbnailUrl(summary.stillLife)}
                                alt={collectionLabel + '桌面静物合集图'}
                                width={
                                  getImageDimensions(summary.stillLife).width
                                }
                                height={
                                  getImageDimensions(summary.stillLife).height
                                }
                                loading={isLcpCandidate ? 'eager' : 'lazy'}
                                decoding="async"
                                fetchPriority={isLcpCandidate ? 'high' : 'auto'}
                                onError={(event) => {
                                  const originalSrc = getDetailUrl(
                                    summary.stillLife,
                                  );
                                  if (
                                    event.currentTarget.dataset.fallback !==
                                    'used'
                                  ) {
                                    event.currentTarget.dataset.fallback =
                                      'used';
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = originalSrc;
                                  }
                                }}
                              />
                            </span>
                            <span className="feed-card-info">
                              <span className="feed-card-title">
                                {collectionLabel}
                              </span>
                              <span className="feed-card-footer">
                                <span className="author-name">
                                  桌面静物 · {itemCount} 件素材
                                </span>
                                <span className="card-arrow" aria-hidden="true">
                                  ↗
                                </span>
                              </span>
                            </span>
                          </button>
                        </article>
                      );
                    }
                    const product = entry.product;
                    const isFavorite = favoriteIds.includes(product.id);
                    const isLcpCandidate =
                      visibleFeedItems.indexOf(entry) < columnCount;

                    return (
                      <article className="feed-card" key={product.id}>
                        <button
                          className="feed-card-main"
                          type="button"
                          aria-label={'打开' + product.name + '详情'}
                          onClick={() => openProduct(product)}
                        >
                          <span className="feed-card-media product-media">
                            {/* oxlint-disable-next-line next/no-img-element -- local image assets stay client-side for fast browsing. */}
                            <img
                              src={getThumbnailUrl(product.image)}
                              alt={
                                product.name +
                                '，' +
                                (product.treatment ?? '去标签纯色白底') +
                                '产品图'
                              }
                              width={getImageDimensions(product.image).width}
                              height={getImageDimensions(product.image).height}
                              loading={isLcpCandidate ? 'eager' : 'lazy'}
                              decoding="async"
                              fetchPriority={isLcpCandidate ? 'high' : 'auto'}
                              onError={(event) => {
                                const originalSrc = getDetailUrl(product.image);
                                if (
                                  event.currentTarget.dataset.fallback !==
                                  'used'
                                ) {
                                  event.currentTarget.dataset.fallback = 'used';
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = originalSrc;
                                }
                              }}
                            />
                          </span>
                          <span className="feed-card-info">
                            <span className="feed-card-title">
                              {product.name}
                            </span>
                            <span className="feed-card-footer">
                              <span className="author-name">
                                #{product.id} · PNG
                              </span>
                              <span className="card-category">
                                {product.collectionGroup ?? product.group}
                              </span>
                            </span>
                          </span>
                        </button>
                        <button
                          className={
                            'card-like-btn' + (isFavorite ? ' liked' : '')
                          }
                          type="button"
                          aria-label={isFavorite ? '取消收藏' : '收藏'}
                          aria-pressed={isFavorite}
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Bookmark
                            size={15}
                            strokeWidth={1.8}
                            fill={isFavorite ? 'currentColor' : 'none'}
                            aria-hidden="true"
                          />
                          <span className="sr-only">
                            {isFavorite ? '已收藏' : '收藏'}
                          </span>
                        </button>
                      </article>
                    );
                  })}
              </div>
            ))}
          </div>
        )}
        {!directoryOpen && hasMoreFeedItems ? (
          <>
            <button
              className="feed-load-more"
              type="button"
              onClick={() =>
                setFeedRenderState({
                  key: feedFilterKey,
                  limit: Math.min(
                    renderLimit + FEED_CHUNK_SIZE,
                    filteredFeedLength,
                  ),
                })
              }
            >
              加载更多素材 <ChevronRight size={14} />
            </button>
            <div
              ref={feedSentinelRef}
              className="feed-sentinel"
              aria-hidden="true"
            />
          </>
        ) : null}
        {!directoryOpen && visibleCount > 0 && !hasMoreFeedItems ? (
          <p className="feed-end">这一页的日常，已经看完了。</p>
        ) : null}
        {!directoryOpen && visibleCount === 0 ? (
          <div className="empty-state">
            <span className="empty-symbol" aria-hidden="true">
              ⌕
            </span>
            <h2>没有匹配的素材</h2>
            <p>试试别的关键词，或返回全部分类。</p>
            <button
              type="button"
              onClick={() => {
                setActiveGroup('全部');
                setSearchTerm('');
              }}
            >
              返回全部
            </button>
          </div>
        ) : null}
      </section>

      <footer className="wander-footer">
        <span>
          撕标签 <small>v1.1.2</small>
        </span>
        <span>无品牌素材 · 原图 PNG</span>
        <a
          href="https://github.com/holynova/daily-necessities-library"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </footer>
      <nav className="wander-nav" aria-label="主导航">
        <button
          type="button"
          className={!directoryOpen && !isFavoritesView ? 'active' : ''}
          aria-pressed={!directoryOpen && !isFavoritesView}
          onClick={() => {
            setDirectoryOpen(false);
            setActiveGroup('全部');
            setSearchTerm('');
            window.scrollTo({ top: 0 });
          }}
        >
          <Compass size={21} />
          <span>发现</span>
        </button>
        <button
          type="button"
          className={directoryOpen ? 'active' : ''}
          aria-pressed={directoryOpen}
          onClick={() => {
            setDirectoryOpen(true);
            setSearchTerm('');
            window.scrollTo({ top: 0 });
          }}
        >
          <Grid2X2 size={21} />
          <span>分类</span>
        </button>
        <button
          type="button"
          className={isFavoritesView && !directoryOpen ? 'active' : ''}
          aria-pressed={isFavoritesView && !directoryOpen}
          onClick={() => {
            setDirectoryOpen(false);
            setActiveGroup('我的收藏');
            setSearchTerm('');
            window.scrollTo({ top: 0 });
          }}
        >
          <Bookmark size={21} />
          <span>
            收藏{favoriteIds.length ? ` · ${favoriteIds.length}` : ''}
          </span>
        </button>
      </nav>

      {modalOpen && modalItem ? (
        <dialog
          className="note-detail-modal open"
          aria-modal="true"
          aria-label={selectedType === 'collection' ? '合集详情' : '素材详情'}
          open
        >
          <div className="note-window">
            <div className="note-header">
              <button
                className="note-btn-back"
                type="button"
                aria-label="返回素材列表"
                onClick={() => setModalOpen(false)}
              >
                <ChevronLeft size={22} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <div className="note-author-info">
                <span className="note-author-name">
                  {selectedType === 'collection'
                    ? '桌面静物合集'
                    : '撕标签'}
                </span>
                <span className="note-author-divider">·</span>
                <span className="note-author-sub">
                  {String(modalIndex + 1).padStart(2, '0')} /{' '}
                  {String(modalListCount).padStart(2, '0')}
                </span>
              </div>
              <button
                className="note-close"
                type="button"
                aria-label="关闭详情"
                onClick={() => setModalOpen(false)}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <button
              className="note-nav-btn note-nav-prev"
              type="button"
              aria-label="上一项"
              onClick={() => navigateSelection(-1)}
            >
              <ChevronLeft size={23} aria-hidden="true" />
            </button>
            <button
              className="note-nav-btn note-nav-next"
              type="button"
              aria-label="下一项"
              onClick={() => navigateSelection(1)}
            >
              <ChevronRight size={23} aria-hidden="true" />
            </button>

            <div className="note-scroll-body">
              <div
                className="note-media-wrap"
                onTouchStart={(event) => {
                  touchStartRef.current = event.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  const start = touchStartRef.current;
                  touchStartRef.current = null;
                  if (start === null) return;
                  const distance =
                    (event.changedTouches[0]?.clientX ?? start) - start;
                  if (Math.abs(distance) > 55)
                    navigateSelection(distance < 0 ? 1 : -1);
                }}
              >
                <ProgressiveImage
                  key={
                    (selectedType === 'collection'
                      ? selectedCollection?.stillLife
                      : selectedProduct?.image) ?? ''
                  }
                  className={
                    selectedType === 'collection'
                      ? 'note-main-img collection-main-img'
                      : 'note-main-img'
                  }
                  src={getDetailUrl(
                    (selectedType === 'collection'
                      ? selectedCollection?.stillLife
                      : selectedProduct?.image) ?? '',
                  )}
                  thumbnailSrc={getThumbnailUrl(
                    (selectedType === 'collection'
                      ? selectedCollection?.stillLife
                      : selectedProduct?.image) ?? '',
                  )}
                  alt={
                    selectedType === 'collection'
                      ? (selectedCollection?.label ??
                          selectedCollection?.group ??
                          '') + '桌面静物合集大图'
                      : (selectedProduct?.name ?? '') + '大图预览'
                  }
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <div className="note-content-container">
                <div className="note-title-row">
                  <div>
                    <p className="note-kicker">
                      {selectedType === 'collection'
                        ? 'STILL LIFE / COLLECTION'
                        : (selectedProduct?.group ?? 'PRODUCT') + ' / ASSET'}
                    </p>
                    <h2 className="note-title">
                      {selectedType === 'collection'
                        ? (selectedCollection?.label ??
                          selectedCollection?.group)
                        : selectedProduct?.name}
                    </h2>
                  </div>
                  {selectedType === 'product' && selectedProduct ? (
                    <button
                      className={
                        'note-like-btn' +
                        (favoriteIds.includes(selectedProduct.id)
                          ? ' liked'
                          : '')
                      }
                      type="button"
                      aria-label={
                        favoriteIds.includes(selectedProduct.id)
                          ? '取消收藏'
                          : '收藏'
                      }
                      aria-pressed={favoriteIds.includes(selectedProduct.id)}
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart
                        size={21}
                        strokeWidth={1.7}
                        fill={
                          favoriteIds.includes(selectedProduct.id)
                            ? 'currentColor'
                            : 'none'
                        }
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}
                </div>

                <p className="note-desc">
                  {selectedType === 'collection'
                    ? '桌面静物合集 · ' +
                      (selectedCollection?.description ?? '本地静物素材')
                    : '去标签、纯色白底的日常产品素材，适合直接用于界面设计、拼贴与提案。'}
                </p>

                <div className="note-detail-list">
                  <div>
                    <span>内容</span>
                    <strong>
                      {selectedType === 'collection'
                        ? getCollectionProductCount(
                            selectedCollection as CollectionSummary,
                          ) + ' 件素材'
                        : selectedProduct?.group}
                    </strong>
                  </div>
                  <div>
                    <span>参考</span>
                    <strong>
                      {selectedType === 'collection'
                        ? '桌面静物 · 3:2 PNG'
                        : (selectedProduct?.brand ?? '通用产品') +
                          ' · ' +
                          (selectedProduct?.reference ?? '纯色表面')}
                    </strong>
                  </div>
                  <div>
                    <span>编号</span>
                    <strong>
                      {selectedType === 'collection'
                        ? String(modalIndex + 1).padStart(2, '0')
                        : selectedProduct?.id}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="note-bottom-bar">
              <span className="note-bottom-hint">本地素材 · 点击下载</span>
              <button
                className="note-bottom-action note-share-action"
                type="button"
                onClick={() => {
                  if (selectedType === 'collection' && selectedCollection) {
                    openShareCard({
                      type: 'collection',
                      collection: selectedCollection,
                    });
                  } else if (selectedType === 'product' && selectedProduct) {
                    openShareCard({
                      type: 'product',
                      product: selectedProduct,
                    });
                  }
                }}
                aria-label="生成分享卡片"
              >
                <Share2 size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>分享</span>
              </button>
              <a
                className="note-bottom-action"
                href={getAssetUrl(
                  selectedType === 'collection'
                    ? (selectedCollection?.stillLife ?? '')
                    : (selectedProduct?.image ?? ''),
                )}
                download={
                  selectedType === 'collection'
                    ? 'daily-necessities-' +
                      (selectedCollection?.label ??
                        selectedCollection?.group ??
                        'collection') +
                      '.png'
                    : 'daily-necessities-' +
                      (selectedProduct?.id ?? '') +
                      '-' +
                      (selectedProduct?.name ?? 'asset') +
                      '.png'
                }
                aria-label="下载当前素材"
              >
                <Download size={20} strokeWidth={1.9} aria-hidden="true" />
                <span>下载原图</span>
              </a>
            </div>
          </div>
        </dialog>
      ) : null}

      {shareItem ? (
        <dialog
          className="share-card-modal open"
          aria-modal="true"
          aria-labelledby="share-card-title"
          open
        >
          <div className="share-modal-window">
            <div className="share-modal-header">
              <span className="share-modal-heading" id="share-card-title">
                分享素材卡片
              </span>
              <button
                className="share-modal-close"
                type="button"
                aria-label="关闭分享卡片"
                onClick={closeShareCard}
              >
                <X size={17} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </div>

            <div className="share-card-paper">
              <div className="share-card-header">
                <span className="share-card-series">
                  {getShareSeries(shareItem)}
                </span>
              </div>

              <div className="share-card-art-box">
                <ProgressiveImage
                  key={getShareImage(shareItem)}
                  src={getShareImage(shareItem)}
                  alt={getShareTitle(shareItem) + '分享卡片预览'}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <div className="share-card-meta">
                <h2>{getShareTitle(shareItem)}</h2>
                <p>{getShareDescription(shareItem)}</p>
              </div>

              <div className="share-card-footer">
                <div className="share-card-footer-copy">
                  <strong>扫码查看素材</strong>
                  <span>撕标签 · 本地 PNG 素材库</span>
                </div>
                <div className="share-card-qr-wrap">
                  {shareQrDataUrl ? (
                    /* oxlint-disable-next-line next/no-img-element -- QR preview is generated as a data URL. */
                    <img
                      className="share-card-qr"
                      src={shareQrDataUrl}
                      alt="分享链接二维码"
                    />
                  ) : (
                    <span className="share-card-qr-loading">生成中</span>
                  )}
                </div>
              </div>
            </div>

            <div className="share-modal-actions">
              <button
                className="share-save-btn"
                type="button"
                onClick={saveShareCard}
                disabled={!shareQrDataUrl || isSavingShareCard}
              >
                <Download size={17} strokeWidth={2.1} aria-hidden="true" />
                <span>{isSavingShareCard ? '正在生成…' : '保存分享卡片'}</span>
              </button>
              <button
                className="share-link-btn"
                type="button"
                onClick={copyShareLink}
              >
                <Link2 size={16} strokeWidth={2.1} aria-hidden="true" />
                <span>复制链接</span>
              </button>
            </div>
            {shareFeedback ? (
              <output className="share-feedback">{shareFeedback}</output>
            ) : null}
          </div>
        </dialog>
      ) : null}
    </main>
  );
}
