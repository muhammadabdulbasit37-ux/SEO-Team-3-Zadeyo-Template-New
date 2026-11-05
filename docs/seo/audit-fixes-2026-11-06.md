# SEO audit fixes — 6 November 2026

The owner authorized repository fixes after the [complete live audit](full-site-audit-2026-11-06.md). This report tracks the resulting implementation. **Repository validation does not certify the deployed production website as fixed.** The original live observations and heuristic score remain historical evidence. The owner subsequently authorized committing and pushing these fixes to `origin/main` on 6 November 2026.

## Findings and disposition

| Audit finding | Repository result |
| --- | --- |
| Checkout drops plan/campaign parameters and is publicly cached | Worker and Pages use the same complete handler, preserving the existing encoded destination and incoming query with 302, `no-store` and noindex. Removed static checkout rules that discarded parameters; generated JavaScript fallbacks retain them. No checkout destination or price changed. |
| Localized checkout, `/en/` and uppercase aliases fail live | Pages now uses the shared routing implementation. Supported aliases resolve; invalid paths retain genuine 404 responses. |
| Explicit error documents return 200 | Node, Astro development middleware, Worker and Pages explicitly return 404/noindex before normalization or cached documents. Localized missing paths use the appropriate error body. |
| Forum filter parameters produce duplicate 200 variants | Shared handler removes category/sort/page with 301, preserving unrelated parameters. |
| Cloudflare analytics script blocked by CSP | One shared security policy permits the existing beacon's exact script path and versioned suffix. Static headers are generated without overlapping CSP/cache policies. No new analytics token, tracker or collection destination was added. |
| Unsupported `InStock` assertions | Omitted optional availability from all 16 product pages; preserved verified offer plans, prices and supplied reviews. |
| English community quotations across localized pages | Added localized, site-owned reading context and useful guide links around 60 thread pages and product-purpose context on four review pages. Original quotations, language declarations, canonicals and indexability remain intact. Google-selected canonicals still require Search Console evidence. |
| Guide evidence and author clarity | Added concise buyer notes on all 32 localized guides, current public Zadeyo references where relevant, linked the existing publishing identity to localized About pages, and exposed the supplied unknown-author limitation. Per owner clarification, detailed vendor equipment/edition specifications remain on the affiliate website. No specifications, credentials or experiences invented. |
| Small logos always load 512px | Reused supplied 32/64/128px variants according to requested size, preserving larger artwork where appropriate. |
| Stretched screenshots / soft phone candidate | Improved phone candidate resolution using an existing 640px image. Preserved the explicitly requested full-frame stretching and all source media; aspect-ratio lab warnings remain an accepted presentation tradeoff. |
| Nested complementary landmarks | Replaced embedded asides with appropriate sections/divs while retaining layout and controls. |
| Four homepage contextual-link warnings | Added natural About-to-home overview links in each locale. Final graph measurements appear below. |
| Eight RSS enclosures missing byte lengths | Compute each local image's real byte length; added a fixture-based RSS regression. |
| English accessible names and artwork descriptions on localized pages | Localized navigation/home/related-page names and shared logo descriptions through existing dictionaries/helpers. Browser tests use stable data attributes. |

FAQ answers also remain visible without JavaScript. Truthful FAQ vocabulary is retained; no Google FAQ rich-result availability is promised. Article and site-owned archive modification dates reflect this actual revision, while original publication dates and supplied community dates remain unchanged.

## Verification

| Check | Final result |
| --- | --- |
| `npm run typecheck` | 236 files; zero errors/warnings, 17 existing hints |
| `npm run build` | 157 HTML files; all 140 approved localized content pages verified |
| `npm test` | 87 tests passed |
| `npm run validate` | 157 HTML / 140 sitemap URLs; zero errors or warnings |
| Production-output link graph | 2,084 same-locale edges / 208 contextual edges; zero broken-route findings, orphans or unreachable indexable pages |
| `npm run validate:runtime` | 526 local HTTP checks passed; zero external requests |
| `npm run validate:cloudflare` | 606 checks, 152 configured pages, 78 emitted assets; real local Worker ASSETS; zero external requests |
| `npm run validate:pages` | The same 606 checks passed with real local Pages ASSETS; zero external requests |
| Scoped output/preservation checks | All 16 product availability omissions, 32 guide notes/author links, 60 archive contexts, four unknown-author notices, 114 localized page labels, 228 localized logo instances and 40 original rendered review rows verified; 68 protected baseline inputs byte-identical |
| XML | Sitemap and RSS parsed strictly: 140 URLs / eight feed items; all eight enclosure sizes match real image bytes |

| Browser check | Final result |
| --- | --- |
| Chrome controls | 60 page/viewport cases; 192 plan selections, 60 navigation clicks, 48 intercepted purchase clicks; zero recorded errors; no partner requests |
| Broad Chrome / axe scan | 184 cases: all 148 normal pages at 390px, 12 samples at 768/1440px, and 12 light-theme samples; zero recorded errors, horizontal overflow or detected WCAG A/AA / best-practice violations |
| Progressive enhancement and CSP | All 29 FAQ answers visible without JavaScript in each locale; two permitted beacon-script forms execute using local stubs, without analytics network traffic |

### Final local Lighthouse measurements

Five sequential Lighthouse 13.6.0 runs, with fresh Chrome profiles, after the other browser jobs finished. Mobile uses default simulated throttling. Desktop uses the documented desktop configuration in the retained helper. These are local lab measurements; they are not directly comparable to the original live-network runs and do not establish field Core Web Vitals.

| Sample | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile | 100 | 100 | 100 | 100 | 0.94s | 0.000 | 10ms |
| Main product, mobile | 100 | 100 | 96 | 100 | 1.88s | 0.000 | 23ms |
| Windows / Cloud DMA guide, mobile | 100 | 100 | 96 | 100 | 1.66s | 0.000 | 0ms |
| Reviews, mobile | 100 | 100 | 100 | 100 | 0.90s | 0.000 | 0ms |
| Homepage, desktop | 100 | 100 | 96 | 100 | 0.52s | 0.000 | 0ms |

Aspect-ratio warnings for the deliberately stretched menu captures remain the owner-approved presentation tradeoff. Lighthouse SEO and accessibility scores describe those automated audits, not ranking or full accessibility certification.

Lighthouse also retains diagnostic suggestions about the shared first-party stylesheet/font dependency path, including estimated mobile render-blocking savings of 110–190ms. These are remaining optimization opportunities; they are not failed field Core Web Vitals. No additional stylesheet restructuring was introduced to chase those small estimates in the already-fast local samples.

Raw evidence lives under ignored `.astro/audit-fixes/`, with Cloudflare Pages evidence under `.astro/pages-qa/`. A final hash inventory records 39 changed original inputs, seven added implementation/test files and no missing original inputs. Six equivalent generated files were restored byte-for-byte to avoid line-ending-only changes; the build fingerprint remains current.

The checks distinguish production output, actual local HTTP responses, browser behavior and local Cloudflare asset runtimes. Partner checkout is intercepted or inspected without following its external destination. Browser tests block third-party network requests. Local Lighthouse scores are lab measurements, not field Core Web Vitals or a prediction of rankings.

## Preservation and release boundary

The existing affiliate disclosure, four-product catalog, checkout destinations, prices, owner-supplied forum/review text, approved article bodies, content manifest, lockfile, utility media and favicon are preserved. Preservation was verified using SHA-256 baseline comparisons during the audit. Git metadata is available for the subsequently authorized commit and push.

The primary hosting contract remains Worker + ASSETS in `wrangler.toml`. The separate Pages fallback now delegates to the same handler with an incoming-origin asset adapter. A purely static host without Worker/Pages/Node still uses the noindex JavaScript checkout fallback; forwarding an incoming query without JavaScript requires a server handler. It is not a full replacement for primary hosting.

After the owner deploys the approved files, verify the actual production domain binding, clear any stale cached redirects/documents as needed, and repeat the checkout/alias/error/query/header probes. Confirm the already-enabled Cloudflare beacon can execute and collect through its same-origin endpoint. Inspect representative localized community URLs in Search Console before any indexing/canonical change. Current vendor availability and external payment/fulfillment are not established by these tests.

The audit and remediation validation performed no commit, push, deployment, DNS change, indexing submission, purchase or outbound message. The subsequent owner instruction authorizes Git publication separately; it does not constitute verification of any deployment triggered by the repository's hosting integration.
