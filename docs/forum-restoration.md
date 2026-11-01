# Forum restoration — 2026-11-01

> Latest presentation change: FAQ was removed from the header, and Reviews now uses a flat list. See [reviews list update](reviews-list-update.md). Forum content and routes remain unchanged.

**Complete.** `/forum/` is restored in the previous forum style: category filters, sorting, stacked thread cards, a narrow reply-count rail, sidebar panels, original-post pages and indented replies. The saved earlier preview was used for visual comparison; title sizing and the white product/purple support buttons were checked in Chrome. The existing theme, shared fonts, favicon and product media were retained.

Header order in all four languages is **Products → Blog → Forum → FAQ → Reviews → Support**. The ten reviews remain unchanged and read-only.

The owner supplied fifteen genuine discussions and confirmed republication permission. All fifteen original posts and **115 supplied replies** were imported with their stated thread dates and original English wording. Source metadata and implementation notes were not published as replies. Where no opening-post author is identified, the interface says “Original poster”; no username was invented. Reply dates and vote totals were not supplied, so none are displayed. The archive is closed to new posts, replies and votes.

The interface, categories, navigation, metadata and date presentation are localized for en/es/de/fr. Original quoted posts remain explicitly marked as English. A visible archive note distinguishes historical user reports from current product requirements/status. Main-product and utility facts, prices and referral mappings were not changed. Suggested product links use our existing internal routes; Cloud DMA references link to the requirements guide without adding an unverified checkout product.

The native content run is `.content/7cd21193b2909434`. Imported discussions require an explicitly approved owner source and an exact archive-content hash for each title, author, date, original post and reply collection. Generated editorial starters retain their existing Organization/disclosure/zero-engagement policy. The build checks every supplied reply paragraph and the actual author/reply count. Original-language schema is allowed only for the declared discussion route; ordinary page-language checks remain enforced.

| Check | Result |
| --- | --- |
| Content plan/check/install and rendered-copy gate | PASS — four locales, eight articles, fifteen imported discussions |
| Typecheck | PASS — 220 files, zero errors/warnings; 18 nonblocking hints |
| Production build / SEO validator | PASS — 157 HTML documents, 140 sitemap URLs, zero errors/warnings |
| Tests | PASS — 60 tests, including exact imported-source provenance and scoped original-language schema checks |
| Forum browser checks | PASS — sixteen hub locale/viewport cases, sixty detail-page cases, all 460 localized instances of the 115 supplied replies, and four unchanged review pages |
| Final visual checks | PASS — five page/viewport cases, including mobile/desktop title sizing and German/French navigation at 1024px |
| Full Chrome regression | PASS — sixty cases, 192 plan selections, 72 navigation clicks, 48 locally intercepted checkout clicks; zero recorded errors |
| Node production HTTP | PASS — 518 checks, zero external requests |
| Local Cloudflare | PASS — 597 checks, 152 pages, 78 assets through local workerd + ASSETS; zero external requests |
| Localhost | PASS — `/forum/` returned HTTP 200 with fifteen thread cards and the Reviews link |
| Live deployment/accounts, GSC, Seobility, field CWV, product execution or independent participant/purchase verification | NOT TESTED — no live claims added |

Static validation caught and resolved category/reply-fragment issues. Browser testing also waits for hash navigation to finish before checking its filter result. Prior retired editorial-topic URLs now redirect to the forum hub; `/forum/` no longer redirects to reviews.

No commit, push, deployment or IndexNow submission was performed. Evidence is retained under `.content/forum-restore/`, `.astro/forum-restore/` and `.astro/browser-qa/`.

## Local preview cached-redirect repair

A later report described Forum clicks opening Reviews even though fresh HTTP requests returned Forum with status 200. An isolated Chrome test reproduced the old cached 301 and verified its repair. The DEV-only local-preview hook refreshes the matching Forum cache entry and waits for it before normal Forum navigation; it does not clear other browsing data or change production link destinations. The actual localhost header click was verified with fifteen thread cards. Typecheck (221 files), production build, all sixty tests and the output validator pass after this fix. The repair script is absent from production HTML and JavaScript. Evidence: .astro/forum-restore/cache-repair.json and .content/forum-restore/cache-*.log.

