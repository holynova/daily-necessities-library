---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# 日用品图鉴素材库

## Scope and visitor mode

Single-route, responsive web workspace for browsing and downloading the existing 30-item daily-necessities image set. Visitor mode: Operate.

## Audience, job, action/task, proof/content, constraints

- Audience: content creators, designers, and asset organizers.
- Job: find a clean unbranded daily-necessity product image quickly.
- Primary actions: search, filter by category, open a larger preview, download the PNG.
- Proof/content: 30 real generated PNGs and their 30 category/product-reference labels, including 10 new household-appliance items.
- Constraints: use the local output images; do not invent counts, specs, dates, or commercial claims; preserve the white-background product-photo treatment.

## Chosen direction and memorable moment

Use the approved comp B direction: a graphite index rail anchors a bright white studio workspace. The first viewport shows the product grid immediately, with a compact search field and a small category index. Selecting an item opens a focused preview drawer with the actual image, category, reference product, and download action. The memorable moment is the selected image becoming the clear, quiet center of the workspace without leaving the catalog.

## Approved composition

- Approved comp: `.impeccable/mocks/comp-b.png`.
- The comp is a composition reference, not a source of factual metadata; remove its invented counts, sizes, dates, and extra categories.

## Implementation inventory

| Region | Medium | Commitment |
| --- | --- | --- |
| Graphite rail | semantic HTML/CSS | compact title, collection note, category navigation |
| Search and category controls | semantic HTML/CSS/SVG icon | keyboard-accessible search, selected category state |
| Product grid | existing local PNG assets + semantic HTML/CSS | 30 real assets, one readable label per item, responsive columns |
| Selected preview | existing local PNG asset + semantic HTML/CSS | enlarged image, truthful item metadata, download action |
| Motion | CSS transitions | one restrained selection/drawer reveal, respects reduced motion |

## Unresolved decisions

No open product decisions for this route. Future uploads, authentication, persistent favorites, and ranking are out of scope until requested.
