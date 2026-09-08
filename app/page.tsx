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

const newFmcgProductIds = new Set(Array.from({ length: 40 }, (_, index) => String(index + 77)));

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

export default function Home() {
  const [activeGroup, setActiveGroup] = useState('合集');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('01');
  const [selectedCollectionId, setSelectedCollectionId] = useState(collectionSummaries[0].id);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesGroup = activeGroup === '全部' || (activeGroup !== '合集' && isProductInGroup(product, activeGroup));
      const searchText = `${product.id} ${product.name} ${product.group} ${product.collectionGroup ?? ''} ${product.brand} ${product.reference}`.toLowerCase();
      return matchesGroup && (!query || searchText.includes(query));
    });
  }, [activeGroup, searchTerm]);

  const filteredCollections = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return collectionSummaries.filter((summary, index) => {
      const number = String(index + 1).padStart(2, '0');
      const searchText = `${number} ${summary.label ?? summary.group} ${summary.description} 桌面静物`.toLowerCase();
      return !query || searchText.includes(query);
    });
  }, [searchTerm]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobilePreviewOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const selectedProduct = filteredProducts.find((product) => product.id === selectedId) ?? filteredProducts[0] ?? null;
  const selectedCollection = filteredCollections.find((summary) => summary.id === selectedCollectionId) ?? filteredCollections[0] ?? null;
  const activeSummary = categorySummaries.find((summary) => summary.group === activeGroup) ?? null;
  const isCollectionView = activeGroup === '合集';
  const visibleCount = isCollectionView ? filteredCollections.length : filteredProducts.length;
  const totalCount = isCollectionView ? collectionSummaries.length : products.length;
  const selectedCollectionIndex = selectedCollection ? collectionSummaries.findIndex((summary) => summary.id === selectedCollection.id) + 1 : 0;
  const activeProductCount = activeSummary ? getProductCount(activeSummary.group) : 0;

  const chooseProduct = (product: Product) => {
    setSelectedId(product.id);
    setMobilePreviewOpen(true);
  };

  const chooseCollection = (summary: CollectionSummary) => {
    setSelectedCollectionId(summary.id);
    setMobilePreviewOpen(true);
  };

  const clearFilters = () => {
    setActiveGroup('全部');
    setSearchTerm('');
  };

  return (
    <main className="app-shell">
      <aside className="side-rail" aria-label="撕标签导航">
        <div className="rail-topline">
          <span className="rail-mark" aria-hidden="true">DI</span>
          <span>DAILY INDEX</span>
        </div>

        <div className="rail-brand">
          <p className="rail-kicker">IMAGE LIBRARY / 2026</p>
          <h1>撕<br />标签</h1>
          <p className="rail-description">撕掉包装标签，保留干净、可用的常见用品图。</p>
        </div>

        <nav className="rail-nav" aria-label="按品类筛选">
          <p className="nav-label">COLLECTION</p>
          {groups.map((group) => {
            const count = group === '全部' ? products.length : group === '合集' ? collectionSummaries.length : getProductCount(group);
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
          <span>116 PNG / 21 STILL LIFE / LOCAL ASSETS</span>
        </div>
      </aside>

      <section className="workspace" aria-label="撕标签图片素材库">
        <header className="workspace-header">
          <div className="mobile-brand">
            <span className="rail-mark" aria-hidden="true">DI</span>
            <span>撕标签</span>
          </div>
          <div className="header-context">
            <span className="context-dot" aria-hidden="true" />
            <span>撕标签</span>
            <span className="context-separator">/</span>
            <span>完整去标产品图</span>
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
              <h2>撕标签</h2>
              <p className="intro-copy">116 个常见产品条目，撕掉包装标签，保留低饱和、干净的产品图。<br className="desktop-break" />新增 40 张完整去标素材，另收录 21 组桌面静物合集。</p>
            </div>
            <div className="intro-index" aria-label="素材数量">
              <span className="intro-index-number">{String(visibleCount).padStart(2, '0')}</span>
              <span className="intro-index-label">当前显示<br />/ {totalCount} {isCollectionView ? '组' : '项'}</span>
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

          {isCollectionView && filteredCollections.length > 0 ? (
            <section className="collection-overview" aria-labelledby="collection-overview-title">
              <div className="collection-overview-copy">
                <p className="eyebrow">STILL LIFE COLLECTION / {String(filteredCollections.length).padStart(2, '0')} SETS</p>
                <h3 id="collection-overview-title">合集<span>桌面静物</span></h3>
                <p className="collection-overview-description">原有 14 个品类与新增快销品的 7 组细分合照集中收录在这里。其他品类页也保留对应的合集照片，方便按品类核对。</p>
                <div className="category-overview-meta">
                  <div><span>内容</span><strong>{filteredCollections.length} 组品类合集</strong></div>
                  <div><span>画面</span><strong>桌面静物 · 3:2 PNG</strong></div>
                </div>
                <p className="collection-note">点击照片查看大图与下载</p>
              </div>
              <div className={`collection-grid${viewMode === 'list' ? ' is-list' : ''}`} aria-label="桌面静物合集照片">
                {filteredCollections.map((summary) => {
                  const summaryIndex = collectionSummaries.findIndex((item) => item.id === summary.id) + 1;
                  const itemCount = getCollectionProductCount(summary);
                  const collectionLabel = summary.label ?? summary.group;
                  const isSelected = summary.id === selectedCollection?.id;

                  return (
                    <button className={`still-life-card${isSelected ? ' is-selected' : ''}`} key={summary.id} type="button" style={{ '--accent': summary.accent } as React.CSSProperties} onClick={() => chooseCollection(summary)}>
                      <span className="still-life-image-wrap">
                        {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                        <img src={summary.stillLife} alt={`${collectionLabel}桌面静物合集图`} loading="lazy" decoding="async" />
                        <span className="card-index">{String(summaryIndex).padStart(2, '0')}</span>
                        <span className="card-open" aria-hidden="true"><ArrowUpRight size={15} strokeWidth={1.7} /></span>
                      </span>
                      <span className="still-life-copy">
                        <span className="still-life-title-row"><span className="still-life-name">{collectionLabel}</span><span className="card-accent" aria-hidden="true" /></span>
                        <span className="still-life-meta">桌面静物 · {itemCount} 件素材</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {activeSummary && !isCollectionView && !searchTerm.trim() ? (
            <section className="category-overview" aria-labelledby="category-overview-title">
              <div className="category-overview-copy">
                <p className="eyebrow">CATEGORY OVERVIEW / {String(activeProductCount).padStart(2, '0')} ITEMS</p>
                <h3 id="category-overview-title">{activeSummary.group}<span>桌面静物</span></h3>
                <p className="category-overview-description">{activeSummary.group === '新增快销品' ? `${activeSummary.description}。按细分场景配有 ${newFmcgCollections.length} 张桌面静物合照，方便快速核对这一组素材。` : `${activeSummary.description}。保留一张自然摆放的桌面静物合集照片，方便快速了解这一组素材。`}</p>
                <div className="category-overview-meta">
                  <div><span>内容</span><strong>{activeProductCount} 件素材</strong></div>
                  <div><span>合照</span><strong>{activeSummary.group === '新增快销品' ? `${newFmcgCollections.length} 张` : '1 张'}</strong></div>
                </div>
                {activeSummary.group === '新增快销品' ? (
                  <div className="category-download-list">
                    {newFmcgCollections.map((collection) => (
                      <a className="category-secondary-download" key={collection.id} href={collection.stillLife} download={`tear-labels-${collection.label}-桌面静物.png`} data-umami-event="download-category-still-life" data-umami-event-item={collection.label}>
                        <span>↓</span>
                        <span>下载{collection.label}合照</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <a className="download-button category-download" href={activeSummary.stillLife} download={`tear-labels-${activeSummary.group}-桌面静物.png`} data-umami-event="download-category-still-life" data-umami-event-item={activeSummary.group}>
                    <Download size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>下载静物合集</span>
                    <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                )}
              </div>
              {activeSummary.group === '新增快销品' ? (
                <div className="category-overview-gallery is-multi" aria-label="新增快销品各细分类别桌面静物合集">
                  {newFmcgCollections.map((collection, index) => (
                    <figure className={`category-overview-figure${index === 0 ? ' is-primary' : ''}`} key={collection.id}>
                      <a className="category-overview-image-wrap" href={collection.stillLife} download={`tear-labels-${collection.label}-桌面静物.png`}>
                        {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                        <img src={collection.stillLife} alt={`${collection.label}桌面静物合集图`} loading="lazy" decoding="async" />
                      </a>
                      <figcaption><span>STILL LIFE / {String(index + 1).padStart(2, '0')}</span><strong>{collection.label?.replace('新增快销品 · ', '')}</strong></figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="category-overview-gallery is-single">
                  <figure className="category-overview-figure is-primary">
                    <div className="category-overview-image-wrap">
                      {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                      <img src={activeSummary.stillLife} alt={`${activeSummary.group}静物合集图，所有类别素材一起摆放在干净桌面上`} decoding="async" />
                    </div>
                    <figcaption><span>STILL LIFE / 合集</span><strong>桌面静物</strong></figcaption>
                  </figure>
                </div>
              )}
            </section>
          ) : null}

          {!isCollectionView && filteredProducts.length > 0 ? (
            <div className={`product-grid${viewMode === 'list' ? ' is-list' : ''}`}>
              {filteredProducts.map((product, index) => {
                const isSelected = product.id === selectedId;

                return (
                  <button className={`product-card${isSelected ? ' is-selected' : ''}`} key={product.id} type="button" style={{ '--accent': product.accent, '--delay': `${index * 35}ms` } as React.CSSProperties} onClick={() => chooseProduct(product)}>
                    <span className="card-image-wrap">
                      {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
                      <img src={product.image} alt={`${product.name}，${product.treatment ?? '去标签、纯色白底'}产品图`} loading="lazy" decoding="async" />
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
          ) : isCollectionView && filteredCollections.length === 0 ? (
            <div className="empty-state">
              <div className="empty-mark" aria-hidden="true">∅</div>
              <h3>没有匹配的合集</h3>
              <p>试试别的关键词，或回到全部分类。</p>
              <button type="button" onClick={clearFilters}>清除筛选</button>
            </div>
          ) : !isCollectionView && filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-mark" aria-hidden="true">∅</div>
              <h3>没有匹配的素材</h3>
              <p>试试别的关键词，或回到全部分类。</p>
              <button type="button" onClick={clearFilters}>清除筛选</button>
            </div>
          ) : null}

          <footer className="workspace-footer">
            <span>UNBRANDED PRODUCTS / 21 STILL LIFE SETS</span>
            <span>点击图片查看大图与下载</span>
            <a className="workspace-repo-link" href="https://github.com/holynova/daily-necessities-library" target="_blank" rel="noreferrer" data-umami-event="open-github">
              <span aria-hidden="true">◉</span>
              <span>GitHub Repo</span>
              <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </footer>
        </div>
      </section>

      <aside className={`preview-panel${mobilePreviewOpen ? ' is-mobile-open' : ''}`} aria-label={isCollectionView ? '所选合集预览' : '所选素材预览'}>
        <div className="preview-header">
          <span>SELECTED ITEM</span>
          <button className="preview-close" type="button" aria-label="关闭预览" onClick={() => setMobilePreviewOpen(false)}>
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {isCollectionView ? selectedCollection ? (
          <>
            <div className="preview-image-wrap">
              {/* oxlint-disable-next-line next/no-img-element -- local PNG assets need no runtime image optimization. */}
              <img src={selectedCollection.stillLife} alt={`${selectedCollection.label ?? selectedCollection.group}桌面静物合集大图预览`} decoding="async" />
              <span className="preview-number">{String(selectedCollectionIndex).padStart(2, '0')}</span>
            </div>
            <div className="preview-copy">
              <p className="preview-kicker">合集 / {String(selectedCollectionIndex).padStart(2, '0')}</p>
              <h3>{selectedCollection.label ?? selectedCollection.group}</h3>
              <p className="preview-description">桌面静物合集 · {selectedCollection.description}</p>
              <div className="detail-lines">
                <div><span>内容</span><strong>{getCollectionProductCount(selectedCollection)} 件素材</strong></div>
                <div><span>画面</span><strong>桌面静物 · 3:2 PNG</strong></div>
              </div>
              <a className="download-button" href={selectedCollection.stillLife} download={`tear-labels-${selectedCollection.label ?? selectedCollection.group}-桌面静物.png`} data-umami-event="download-category-still-life" data-umami-event-item={selectedCollection.label ?? selectedCollection.group}>
                <Download size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>下载静物合集</span>
                <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          <div className="preview-empty">
            <Check size={18} aria-hidden="true" />
            <p>选择一张合集查看详情</p>
          </div>
        ) : selectedProduct ? (
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
                <div><span>处理</span><strong>{selectedProduct.treatment ?? '去标签 · 纯色表面'}</strong></div>
                <div><span>画面</span><strong>白底 · 1:1 PNG</strong></div>
              </div>
              <a className="download-button" href={selectedProduct.image} download={`tear-labels-${selectedProduct.id}-${selectedProduct.name}.png`} data-umami-event="download-png" data-umami-event-item={selectedProduct.name}>
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

      {mobilePreviewOpen && (isCollectionView ? selectedCollection : selectedProduct) ? <button className="mobile-backdrop" type="button" aria-label="关闭预览" onClick={() => setMobilePreviewOpen(false)} /> : null}
    </main>
  );
}
