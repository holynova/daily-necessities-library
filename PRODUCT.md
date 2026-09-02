# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: OpenAI Sites scaffold with Vinext/React; selected because the request is for a browsable, publishable website and the workspace has no incumbent application.

## Users

根据当前请求推断：需要快速浏览、筛选、查看并下载日用品产品图的内容创作者、设计师或素材整理者。

## Product Purpose

根据当前请求推断：把已经生成的 76 张去包装标签、纯色白底日用品、饮料与食品图片整理成一个可直接使用的素材库，并为 14 个类别提供一张桌面静物合集图。新增品牌专题包括宝洁、雀巢、百事、联合利华、茅台、伊利，以及蓝月亮洗衣液与主流抽纸补充组；另设“合集”分类集中展示全部桌面静物。成功标准是用户能在首屏理解“撕标签”的含义，并能快速查看类别全貌、找到、放大预览和下载某一张图片。

## Positioning

以“撕掉包装标签、保留产品形态、统一纯白商品摄影”为核心机制，把分散的生成结果变成可搜索和可复用的素材集合。

## Operating Context

用户在桌面或手机浏览器中查看一组日用品素材，按类别或关键词缩小范围，打开大图确认细节，然后下载单张 PNG。

## Capabilities and Constraints

- 展示 76 个日用品、饮料食品条目和对应的无品牌 PNG 图片，其中包含 10 个家用电器、10 个饮料食品品类、6 个公司/品牌专题及 1 个规格与纸品补充专题。
- 支持关键词搜索、分类筛选、集中式桌面静物合集图、分类页桌面静物预览、图片放大预览和下载。
- 图片文件来自工作区生成产物，不依赖外部图片服务。
- 生成图片不应展示 Logo、商标、标签文字或功效宣称。
- “最常见”是代表性选品，不构成统一的全国销量排名。

## Brand Commitments

名称、颜色和语气未由用户单独指定；页面应保持干净、克制、以图片为主。

## Evidence on Hand

- 40 张既有的 1254×1254 PNG 与 36 张新增品牌专题 PNG，分别位于 `outputs/daily-necessities-top20/` 与 `outputs/brand-products/`。
- 14 张分类桌面静物合集图位于 `outputs/category-still-life/`，集中接入“合集”分类，也保留在各自分类详情。
- 既有类别、通用提示词、负面提示词和参考来源记录位于 `outputs/daily-necessities-top20/README.md`；新增图片采用同一套去标签白底提示规范。

## Product Principles

- 图片先于装饰，首屏直接展示真实素材。
- 统一的白底和无品牌处理保持集合感。
- 搜索、筛选、预览和下载都应清晰可见、低摩擦。
- 不捏造品牌排名、功效或商业授权信息。

## Accessibility & Inclusion

根据当前请求推断：支持键盘操作、可见焦点、语义化按钮和图片替代文本；移动端保持触控目标清晰可点。
