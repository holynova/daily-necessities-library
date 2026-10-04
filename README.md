# 撕标签 · 模板贴近版

通过 `build-gallery` Skill 重构的静态图片网站。116 张单品 + 21 张桌面静物，采用 build-gallery 的原生页面样式：大标题、14 类筛选按钮、三列画廊、全屏灯箱、PNG 下载和单张素材分享链接。

## 用 AI 修改

把本项目交给安装了 build-gallery 的 AI，直接说：“标题改成……”“只展示个人护理”“增加这批图片”“背景更暖一点”。AI 先读取 GALLERY.md，修改内容或样式并完成构建验证。

## 本地开发

Node >=22.12，建议 Node 24。

```sh
npm ci
npm run ingest
npm run validate
npm run check
npm test
npm run build
npm run preview
```

`incoming/` 保存按分类整理的 137 张原图，不进入网站发布文件。`content/catalog.json` 保留原项目的名称、参考品牌与分类；`content/source-inventory.json` 映射原仓库全部 426 个图片路径（289 个独立图片文件），包含重复部署副本、旧缩略图与设计截图的记录。图片浏览使用 AVIF/WebP/JPEG，下载使用移除元数据但保持尺寸与 alpha 的 PNG。

原始素材来源于本仓库提交 `3acbc6e8e67543f0c6acddb7e00b9d0d61efc059`。名称和品牌是原项目的参考信息，不表示图片上含有品牌标签，不额外作授权或透明背景承诺。素材目录版保存在 master 的本地提交 9b0816e；本版本位于 template-aligned 分支。统计关闭，访问网站无需 AI API。

发布产物为 `dist/`。GitHub Pages 工作流仅手动启动；Cloudflare 配置以项目名部署。此次本地重构未推送或部署。
