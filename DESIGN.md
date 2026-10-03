# 撕标签 · Wander

The selected direction is Wander: a calm browsing interface that makes the next useful image easy to discover. The catalogue retains all 116 original product records and 21 still-life collections.

## Visual system

- White canvas and very light green-grey image frames. Original product colors stay intact.
- Olive `#66714b` for selected categories, favorites, primary actions, and focus. Ink `#293024`, muted `#89927e`, borders `#e8ece1`.
- System sans-serif typography. Intro 26px on mobile / 33px on desktop; card names 12–13px; secondary metadata 9–11px.
- Rounded category pills, 12–13px image corners, 42–45px search field. Quiet borders, no card shadows.

## Layout and behavior

The masthead introduces the library, followed by a full-width search field and horizontally scrollable category pills. The feed has two persistent masonry columns on mobile, three on medium widths, and four above 1100px. Appending items preserves their column placement. Alternate image-frame proportions create a browsing rhythm; `object-fit: contain` preserves the entire product image.

Discover, Categories, and Favorites are always reachable through the bottom navigation. Categories opens a directory of 15 existing groups; selections filter across the complete catalogue. Search also operates on the complete filtered dataset. Sorting supports recommendation, latest, and name.

The initial feed contains 12 cards, adding 12 at a time through a scroll sentinel or explicit load-more button. Detail views keep original PNG download, local favorites, previous/next controls, keyboard arrows, swipe navigation, share links, QR codes, and PNG poster export. Dialog focus stays within the active layer and returns on close.

## Image pipeline

- List: existing 400px WebP thumbnails; only the first two are high-priority.
- Detail: separate WebP derivatives up to 1400px wide, quality 85. The thumbnail remains visible until the requested detail image decodes successfully; cleanup invalidates late requests.
- Download / poster export: original PNG, requested only by the user's action.

The detail generator hashes source bytes and encoding settings, reuses unchanged outputs, and excludes derivative directories. Originals and inherited metadata remain intact.

## Motion and release

State motion uses transform / opacity, ease-out, and durations below 300ms. Reduced-motion disables transitions and animations. Static output is `dist-pages`; version 1.1.0 is visible in the footer and HTML metadata. The existing Cloudflare Worker and custom domain remain unchanged, with configuration maintained on master and deployment performed locally through Wrangler.
