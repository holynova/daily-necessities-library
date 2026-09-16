import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '日常图鉴｜无品牌产品素材库',
  description: '以暖纸张、海绿色操作色和卡片流展示 116 个无品牌日用品 PNG 与 21 组桌面静物合集。',
  openGraph: {
    title: '日常图鉴｜无品牌产品素材库',
    description: '以暖纸张、海绿色操作色和卡片流展示 116 个无品牌日用品 PNG 与 21 组桌面静物合集。',
    type: 'website',
  },
  other: {
    'data-impeccable-direction': 'c134f795',
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
          THESIS: 让日用品素材像一条可连续浏览的图片流，打开即见、点开即下；不把检索藏在营销首屏之后。
          OWN-WORLD: 暖纸张底、海绿色操作色、陶土色收藏色、细边框与按原始比例展示的本地产品卡片。
          STORY: 用户从全部素材开始，横向切换分类或合集，搜索后点开一张图，在详情层收藏、翻页或下载原图。
          FIRST VIEWPORT: 吸顶品牌栏含搜索与收藏下载，第二行是横向分类，首屏直接显示 5 列产品卡片流。
          FORM: 参考 rubber-stamp-world-cities 的图片流与详情层，用户指定该界面语言；direction seed c134f795。
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="e01c9f78-4607-4e60-b01c-77c8190b12b4" data-domains="daily-necessities-library.holy-nova.chatgpt.site,holynova.github.io" />
      </body>
    </html>
  );
}
