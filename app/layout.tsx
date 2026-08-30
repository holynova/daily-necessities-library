import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '日用品图鉴｜去品牌产品图素材库',
  description: '20 个常见日用品品类的去品牌、纯色白底 PNG 素材库。',
  openGraph: {
    title: '日用品图鉴｜去品牌产品图素材库',
    description: '20 个常见日用品品类的去品牌、纯色白底 PNG 素材库。',
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
          STORY: 用户从 20 个真实条目开始，筛选一类，选中一件，在原位看清并下载。
          FIRST VIEWPORT: 左侧分组，中间直接展示网格，右侧固定预览；搜索位于内容顶部。
          FORM: 工作台式索引，direction seed 6e92f04f；完成条件是每张图可找、可看、可下。
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
