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
        {children}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="e01c9f78-4607-4e60-b01c-77c8190b12b4" />
      </body>
    </html>
  );
}
