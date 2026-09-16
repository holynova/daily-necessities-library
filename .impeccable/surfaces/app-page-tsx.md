---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# 日用品图鉴素材库

## Scope and visitor mode

Single-route responsive web library for browsing and downloading 116 unbranded product PNGs and 21 still-life collection images. Visitor mode: Operate.

## Audience, job, action/task, proof/content, constraints

- Audience: content creators, designers, and asset organizers.
- Job: find a clean daily-necessity image quickly, then inspect and download it.
- Primary actions: search, switch horizontal categories, open a product or still-life detail, favorite an item, move between items, download local assets.
- Proof/content: 116 real product PNGs, 21 real still-life sheets, existing product groups and brand references.
- Constraints: keep all imagery local, preserve truthful item metadata, and retain transparent white-background product treatment.

## Chosen direction and memorable moment

Use the rubber-stamp-world-cities interface grammar as the structural reference: sticky top header, centered search capsule, horizontal tabs, compact feed cards, and an immersive note-style detail layer. Adjust the palette for daily products with warm linen, sea-green actions, and clay-orange favorites. The memorable moment is opening any item into a quiet, focused detail layer without losing the feed context.

## Implementation inventory

| Region | Medium | Commitment |
| --- | --- | --- |
| Sticky header | semantic HTML/CSS | brand mark, search, visible result count, GitHub source link, favorites download action |
| Horizontal category rail | semantic buttons | all products, collections, product groups, favorites with active underline |
| Card feed | WebP thumbnails + local PNG fallback | five-column desktop, two-column mobile, first batch eager, remaining cards appended by IntersectionObserver |
| Detail layer | semantic dialog + progressive local assets | thumbnail-first preview, background PNG decode, keyboard navigation, favorite state, metadata, download and share actions |
| Share card | semantic dialog + canvas/QR | reference-style paper poster, natural-ratio preview, copyable deep link, downloadable PNG |
| Motion | CSS transitions | restrained lift, focus, modal polish, reduced-motion fallback |

## Unresolved decisions

No open product decisions for this route. Future uploads, authentication, and ranking remain out of scope.
