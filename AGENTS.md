# Gallery maintenance

Read GALLERY.md first. Use build-gallery for conversational changes. Keep content/catalog.json and content/images.yml in sync and include every incoming image. Preserve original input. Labels and reference brands are inherited metadata, not licensing claims. Do not replace PNG download with JPEG or promise transparent backgrounds. Keep filtering over the entire catalogue and maintain keyboard/focus behavior in the lightbox. Run ingest, validate, check, tests, build and browser checks for changes affecting content or interactions. Do not push/deploy without user authorization.

本版本禁止大布局修改。仅配置图片、文案、分类与六个颜色变量。页面与 CSS 必须通过已安装 build-gallery/scripts/check_template.py --site . 检查。
