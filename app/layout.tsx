import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '日用品图鉴｜去品牌产品图素材库',
  description: '76 个常见日用品、饮料与食品的去品牌、纯色白底 PNG 素材库，附分类汇总图与静物合集图。',
  openGraph: {
    title: '日用品图鉴｜去品牌产品图素材库',
    description: '76 个常见日用品、饮料与食品的去品牌、纯色白底 PNG 素材库，附分类汇总图与静物合集图。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {/*
          THESIS: 让去品牌的产品图先被找到，再被下载；拒绝把素材库藏在营销式首屏后。
          OWN-WORLD: 石墨索引栏、纸白工作区、钴蓝操作色、细规则和真实产品图。
          STORY: 用户从 76 个真实条目开始，筛选一类，先看该类汇总图，再选中一件，在原位看清并下载。
          FIRST VIEWPORT: 左侧分组，中间直接展示网格，右侧固定预览；搜索位于内容顶部。
          FORM: 工作台式索引，direction seed 6e92f04f；完成条件是每张图可找、可看、可下。
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="e01c9f78-4607-4e60-b01c-77c8190b12b4" data-domains="daily-necessities-library.holy-nova.chatgpt.site,holynova.github.io" />
      </body>
    </html>
  );
}
