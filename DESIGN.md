---
name: 日常图鉴｜无品牌产品素材库
description: 一条可搜索、可收藏、可下载的无品牌日用品图片流。
colors:
  primary: "#3c7b77"
  primary-hover: "#2f6662"
  favorite: "#c87551"
  canvas: "#f3eee6"
  surface: "#fffdfa"
  image-surface: "#ece3d4"
  ink: "#2d3230"
  ink-soft: "#4e5651"
  muted: "#878c84"
  line: "#e3dbcf"
  line-dark: "#cfc2b2"
  primary-soft: "#d6e5df"
typography:
  display:
    fontFamily: "Songti SC, Noto Serif CJK SC, STSong, serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "SFMono-Regular, Roboto Mono, Menlo, Consolas, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.095em"
rounded:
  sm: "7px"
  md: "10px"
  lg: "16px"
  pill: "18px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#fffdfa"
    rounded: "{rounded.pill}"
    height: "40px"
  favorite-button:
    backgroundColor: "{colors.favorite}"
    textColor: "#fffdfa"
    rounded: "{rounded.pill}"
    height: "27px"
  feed-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "0"
---

# Design System: 日常图鉴

## Overview

**Creative North Star: “暖纸张上的本地图片流”**

日常图鉴把真实的本地 PNG 素材当成页面主体。它借用了用户指定的 `rubber-stamp-world-cities` 图片流、横向分类栏和详情层语法，再用暖纸张、海绿色操作色和陶土色收藏状态承载日用品内容。页面需要像一个可以连续翻看的素材档案，而不是带营销首屏的产品着陆页。

内容密度保持克制：首屏直接进入 5 列卡片流，搜索和分类始终贴在顶部，点击卡片后用同一张图进入可翻页的详情层。所有颜色和边框都服务于图片辨识度。

**Key Characteristics:**

- 暖纸张画布与白色卡片表面形成轻微层次。
- 海绿色只承担主要操作与焦点，陶土色表示收藏和批量下载。
- 本地图片优先，文字退到标题、品类和详情元信息。
- 方向契约 seed：`c134f795`；表单沿用 rubber-stamp-world-cities 的图片流与详情层。

## Colors

这是一个受限的双强调色系统：海绿色负责行动，陶土色负责收藏语义，其他颜色都保持低饱和中性。

### Primary

- **Sea Green** (`#3c7b77`): 搜索焦点、当前分类下划线、主要下载按钮、空状态操作。
- **Sea Green Deep** (`#2f6662`): 主要按钮悬停状态。

### Secondary

- **Clay Favorite** (`#c87551`): 收藏心形、收藏数量、顶部“下载收藏”按钮。

### Neutral

- **Warm Linen** (`#f3eee6`): 页面画布和吸顶栏底色。
- **Paper Surface** (`#fffdfa`): 卡片信息区、详情层和底部下载条。
- **Image Sand** (`#ece3d4`): 合集图片的默认承托色。
- **Ink** (`#2d3230`): 标题、品牌名和选中标签。
- **Ink Soft** (`#4e5651`): 正文与详情字段值。
- **Muted** (`#878c84`): 元信息、编号和辅助说明。
- **Line** (`#e3dbcf`) / **Line Dark** (`#cfc2b2`): 分隔线、边框和输入焦点。

### Named Rules

**The Two-Accent Rule.** 页面只让海绿色和陶土色表达状态，其余色彩来自素材本身，不给卡片额外染色。

## Typography

**Display Font:** Songti SC / Noto Serif CJK SC / STSong

**Body Font:** 系统无衬线字体栈（PingFang SC、Microsoft YaHei、Segoe UI）

**Label/Mono Font:** SFMono-Regular / Roboto Mono / Menlo

**Character:** 正文保持清晰、紧凑和可扫描；详情标题用宋体增加档案感，等宽标签把编号和素材状态压成一层轻量索引。

### Hierarchy

- **Display** (700, `23px`, `1.25`): 详情层标题。
- **Title** (550, `13.5px`, `1.35`): 卡片名称，最多两行。
- **Body** (400, `13.5px`, `1.65`): 详情说明与长文本。
- **Label** (400, `9px`, `0.095em`, uppercase): 素材流状态、编号和详情 kicker。
- **UI** (400–650, `11–15px`): 搜索、导航、按钮和字段名。

## Layout

页面使用 `1200px` 最大宽度容器。吸顶头部包含品牌、居中的搜索胶囊、当前数量和收藏下载动作，下面是可以横向滚动的分类栏。内容区以 `12px` 上内距和 `10px` 列间距开始，桌面端卡片使用至少 `194px` 的列宽，通常形成五列；小于 `680px` 时固定成两列并把头部压缩成图标、搜索和收藏按钮。

产品卡片的图片区按源文件原始比例自然撑开，信息区固定在图片下方，因此不同素材的卡片高度可以不同；图片不使用 `cover` 裁切。详情层在桌面居中为最多 `660px` 的窗口，在移动端变成全高页面，顶部返回、正文可滚动、底部下载动作固定。

## Elevation & Depth

系统默认扁平，深度来自纸张色差、细边框和很轻的环境阴影。卡片静止时使用 `0 1px 4px rgb(41 42 37 / 5%)`，悬停时提升到 `0 7px 17px rgb(41 42 37 / 11%)`；详情层使用 `0 24px 70px rgb(28 29 26 / 36%)`。焦点和悬停只改变颜色、阴影或轻微位移，不使用发光渐变。

### Named Rules

**The Flat-By-Default Rule.** 没有交互状态时，图片和纸张应该看起来平稳；阴影只说明可点击或已进入详情。

## Shapes

卡片使用 `10px` 圆角，移动端收紧到 `8px`；搜索和主要操作使用胶囊形 `18–20px` 圆角；详情窗口使用 `16px`，移动端去掉圆角变成全屏。边框统一为 `1px` 暖灰线，媒体容器保留完整图片，不改变素材本身的白底处理。

## Components

### Buttons

- **Primary:** 海绿色背景、白色图标和文字，最小高度 `40px`，胶囊圆角。
- **Favorite:** 卡片上的圆形图标按钮使用陶土色表示已收藏；顶部批量下载按钮同样使用陶土色。
- **Ghost:** 返回、关闭、上一项和下一项使用透明背景，悬停时落到纸张色。
- **Focus:** 所有可交互元素使用海绿色半透明 `3px` 外描边并留出 `3px` 间距。

### Cards / Containers

- **Corner Style:** `10px` 桌面卡片、`8px` 移动卡片。
- **Background:** 图片区为纸张或素材白底，信息区为 `#fffdfa`。
- **Border:** `1px solid #e3dbcf`；悬停变为 `#d5cabb`。
- **Internal Padding:** 图片区域无内边距；信息区使用 `8–10px`，图片按源文件宽度自然撑开。

### Inputs / Fields

- **Search:** `33px` 高、`18px` 胶囊、`#e7dfd1` 底色；聚焦后变为白色表面并出现细边框和轻阴影。
- **Clear:** 搜索有内容时在胶囊右侧出现透明圆形清除按钮。

### Navigation

- **Style:** 吸顶头部和横向标签栏沿用参考项目的图片流语法。
- **Active:** 当前标签使用深色文字、较粗字重和一条 `2.5px` 海绿色短下划线。
- **Mobile:** 标签栏保持横向滚动，不挤压卡片内容。

### Detail Layer

详情层使用原生 `dialog` 语义，桌面有左右翻页按钮，移动端提供返回头部和固定下载栏。产品详情可以收藏；合集详情使用相同的媒体、元信息和下载结构，保持两个内容入口的操作一致性。

### Share Card

分享卡片沿用参考项目的纸张海报语法：保留素材原始比例，显示品类、标题、参考信息和二维码，并提供复制链接与保存 PNG 海报两个动作。分享链接携带素材类型和编号，可直接打开对应详情与分享卡片。

## Do's and Don'ts

### Do:

- **Do** 让本地产品图在首屏成为最大视觉主体。
- **Do** 使用海绿色表达当前、主要操作和键盘焦点。
- **Do** 使用陶土色表达收藏与批量下载状态。
- **Do** 保持图片、标题、品类和详情元信息的阅读顺序。
- **Do** 让桌面 5 列、移动 2 列和全高移动详情层随断点稳定切换。

### Don't:

- **Don't** 给每个品类添加一套新的按钮色或卡片背景色。
- **Don't** 把搜索、筛选或下载藏到营销式首屏之后。
- **Don't** 用渐变、玻璃效果或厚重阴影盖住素材本身。
- **Don't** 在图片上重新绘制品牌 Logo、标签文案或功效宣称。
