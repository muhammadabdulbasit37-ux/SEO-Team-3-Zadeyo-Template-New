# Reviews list and navbar update — 2026-11-01

FAQ is removed from both desktop and mobile header navigation. The header order is now **Products → Blog → Forum → Reviews → Support**. The FAQ page and its footer links remain available.

Reviews uses a single vertical list with subtle separators, product/author/date/rating details, titles and full review text. Desktop rows place metadata beside the review; mobile rows stack naturally. Review cards, colored card backgrounds, enclosing rounded borders and the boxed closing section were removed. The layout takes inspiration from the author/date/text flow of the [owner's reference](https://gettheislecheats.net/reviews/) while retaining the site's existing theme.

All ten supplied reviews, their ratings, dates, products and wording remain unchanged. The page remains read-only in every language.

Validation passed: typecheck (221 files, zero errors/warnings, 18 existing hints), production build, all 60 tests, and output/SEO validation (157 HTML documents, 140 sitemap URLs, zero errors/warnings). Chrome checked twelve locale/viewport cases, all 120 review instances, unchanged text/dates, a single vertical list, both header menus, no FAQ navbar link, no review form and no horizontal overflow. Desktop and mobile screenshots were visually inspected after drawer-close animation completed. Localhost returned HTTP 200 with ten review rows and zero old card elements.

Evidence: `.content/reviews-change/list-*.log` and `.astro/reviews-list/`. No commit, push, deployment or indexing submission was performed.
