<p align="right"><a href="./README.md">简体中文</a> · <strong>English</strong></p>

# Tear Labels · Wander

A catalogue of 116 unbranded product PNGs and 21 still-life collections, including 40 newer consumer goods. Version **1.1.4** uses a Wander interface: olive category pills, a masonry feed, and Discover / Categories / Favorites navigation. Collections appear first. Images keep their intrinsic ratio; lists lazy-load thumbnails, details upgrade after decoding, and downloads retain original PNGs.

[Live demo](https://daily-necessities-library.xiaosang.cc/) · [Source](https://github.com/holynova/daily-necessities-library) · [Pages mirror](https://holynova.github.io/daily-necessities-library/)

<p align="center"><img src="./assets/readme/screenshot.png" width="390" alt="Wander mobile interface"></p>

Search the full catalogue, browse categories, sort by recommendation, latest, or name, and save favorites locally. Preview details, download original PNGs, or generate a share link, QR code, and PNG poster. The feed starts with 12 thumbnails and adds more on scroll, with an explicit load-more control. Detail previews upgrade to decoded WebP images; downloads retain original PNGs. Desktop has four columns, mobile has two, with keyboard navigation, swipe gestures, and reduced-motion support.

Product names and reference brands preserve the existing metadata. Downloads use the original white-background PNG files.

```bash
npm ci
npm run dev
npm run build:static
npm run deploy:check
npm run deploy
```

Source and Worker configuration share the `master` branch. Deploy `daily-necessities-library` manually through Wrangler; the existing GitHub Pages mirror workflow is retained.

<p align="center"><img src="./assets/readme/qr.png" width="150" alt="Live demo QR code"></p>

By [holynova](https://github.com/holynova).
