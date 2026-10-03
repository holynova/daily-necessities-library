# Wander 1.1.0 validation

- Source baseline: master `3acbc6e8e67543f0c6acddb7e00b9d0d61efc059`.
- Catalogue: 116 product records and 21 collections preserved. No original PNG modified.
- Application lint (`oxlint app github-pages scripts`) and TypeScript (`tsc --noEmit`) passed.
- Static production build and Wrangler deploy dry-run passed.
- README links, screenshot/QR presence and visible version checks passed.
- 26 browser checks passed: catalogue counts, initial batch, mobile/desktop columns, thumbnail-only list requests, full-catalogue search, all-category browsing, persistent favorites, decoded detail WebP, PNG download, share QR/poster export, keyboard closing, sort, empty state, all 116 items reachable, 320px layout, and rapid detail navigation.
- 4 failure/compatibility checks passed: failed detail requests retain thumbnails; no IntersectionObserver preserves initial batching and manual load-more; no decode API uses the load-event fallback.
- Direct product and collection share URLs were checked; collection links now restore the collection feed so previous/next navigation remains available.
- No JavaScript errors during normal interaction checks. Failure tests intentionally abort detail requests.
- 137 detail assets: 5,109,552 bytes, compared with 180,878,392 bytes for the original PNG group. This is an asset-size comparison, not a measured speed improvement. Second generator run rebuilt zero unchanged files.
- Full repository `npm run lint` still reports 19 existing errors in unused scaffold components/hooks. Those files were unchanged; application-scoped lint passes.

Production verification is performed after deployment; deployment IDs and verified URLs are recorded in the delivery report.

## 1.1.1 follow-up

- Category strip is constrained to the content width and scrolls at 320/390/430/768/1440px.
- Mixed feed contains 21 collections before 116 products, retaining 12-item batching and manual load-more.
- Intrinsic dimensions recorded for all 137 assets; no artificial aspect-ratio letterboxing. Original PNGs unchanged.
- List requests only thumbnails in the normal path; thumbnail failure uses compressed detail fallback. Current details decode before replacement; adjacent thumbnails only are prefetched.
- 27 browser checks passed, including slow details, rapid navigation, failed-detail retention, filtering, actual ratios and all five widths.
- Existing detail generation reused all 137 assets (0 regenerated): 5,109,552 bytes versus 180,878,392 original bytes. Asset totals are not a measured speed improvement.
