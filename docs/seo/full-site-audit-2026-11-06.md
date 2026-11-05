# cheatsfortheisle.com — repository and live SEO audit

> Follow-up: the owner authorized fixes after this audit. See [the repository remediation report](audit-fixes-2026-11-06.md) for implemented changes and final local verification. The live observations below remain the original, pre-deployment audit snapshot; no production deployment is implied.

Audit date: **6 November 2026, Asia/Karachi** (network evidence collected 5 November UTC). Scope: the supplied clone and the public production website. **Original audit state: read-only. Subsequently authorized repository fixes are tracked in the remediation report above.**

The normal content URLs are healthy in the checks performed. All 140 sitemap pages returned HTTP 200, their internal page graph has no orphans, and the main SEO tags are consistent. The largest confirmed problems occur in **live request handling**: checkout loses plan selections, several supported aliases return 404, and published error documents return HTTP 200. Local Node and Cloudflare checks handle these cases correctly. Passing repository checks therefore does not establish correct deployed routing.

## Coverage and evidence

| Area | Fresh coverage/result |
| --- | --- |
| Live HTML | All 140 sitemap URLs plus eight linked, intentionally noindex legal pages: **148 HTML pages** |
| Directly referenced live resources | **46 distinct resource URLs**, all HTTP 200 |
| Additional URL/header probes | **397 requests** covering configured redirects, checkout paths/plans/locales, canonical variants, intentional missing paths, support/Steam links and bot user-agent strings |
| Repeat probes | Thirteen important cases repeated separately; checkout-plan loss, query variants, alias failures and HTTP-200 error documents reproduced |
| Static asset comparison | 78 local output asset paths probed live; **77 matched local bytes**, including all **20 protected media hashes**. The remaining path is a different local-build stylesheet hash, not referenced by live HTML; the actual live stylesheet returned 200. This is not a broken live asset. |
| Live link graph | **140 indexable pages; 2,036 directed same-locale edges; 188 contextual edges; zero orphans; zero unreachable pages; maximum homepage distance two clicks** |
| Live/source comparison | Compared headings, paragraph text and anchor destinations on all 148 live pages: no differences. Titles/descriptions also match the local configuration on all 148. Runtime behavior differs. |
| Live browser scan | **182 page/viewport cases:** all 148 pages at 390px, plus 17 representative pages at 768px and 1440px; zero horizontal page overflow |
| Light theme | Thirteen representative pages checked at 390px; no detected WCAG A/AA issues or horizontal overflow |
| Live controls | Mobile first-click menu/navigation, FAQ expansion/filtering and main-product monthly/lifetime selectors checked across all four locales; passed with deferred initialization awaited |
| Local browser suite | 60 page cases; 192 plan selections; 60 navigation clicks; 48 intercepted checkout clicks; no recorded errors |
| Performance | Five final, sequential Lighthouse 13.6.0 runs against live URLs, after the other browser scans ended |
| Preservation | All **325 baseline source/config/public/content files** remain byte-identical; no source files added or removed |
| Additional rendering audit | All **148 live pages** compared using raw response HTML and rendered Chrome DOM; no metadata/link/schema deltas or JavaScript-only substantive content |
| Additional image audit | **448 image instances** checked for alt text, format, declared/intrinsic dimensions and fallback bytes; no new failures under these checks |
| Additional crawl-space audit | **7,636 internal link occurrences** examined; zero non-checkout query-link occurrences; no expanding facet/calendar/session space found |
| Additional schema/feed audit | All 148 pages checked for relevant required fields, visible schema content, review arithmetic and reply counts; zero new structural errors. RSS semantic validation found eight missing enclosure lengths. |

The crawl used four concurrent requests. Checkout redirects were inspected without following their external destinations. No payment, support submission, indexing submission, deployment, Git initialization, commit, push or DNS change was performed during the audit. Git metadata was unavailable during that pass, so preservation was verified with SHA-256 snapshots. Git publication was separately authorized afterward. Dependencies and audit tools were installed locally; tools/reports used for measurement are under ignored `.astro/`.

The bundled full-site crawler's Python runtime was unavailable. Equivalent served-HTML checks were run with Node and the repository's existing parse5 parser, supplemented by native validators, real HTTP probes, Chrome, axe-core and Lighthouse. Source and live checks are distinguished throughout this report.

## Findings to approve

### 1. High — live checkout redirects discard the selected plan and allow public caching

**Confirmed live; commercial fault.** All 20 tested unprefixed checkout requests — five aliases, slash/no-slash forms, two plans — returned 302 without the incoming `plan`. Four distinct products are affected; their buying pages exist in all four languages.

Example:

```text
GET https://cheatsfortheisle.com/go/the-isle-cheats/?plan=monthly
302 Location: https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fthe-isle-novaxware

GET https://cheatsfortheisle.com/go/the-isle-cheats/?plan=lifetime
302 Location: https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fthe-isle-novaxware
```

The live selectors generate the correct monthly/lifetime URLs and keep desktop/mobile links synchronized. The redirect is where the selection disappears. Separate rechecks also lost `campaign=keep`. These responses advertise `public, max-age=3600, must-revalidate`, duplicated in the header, rather than the source handler's `no-store`; they lack its `X-Robots-Tag` as well.

This can hand the buyer a destination without the plan they selected. The external site's eventual default, payment and fulfillment were not tested. This is a conversion defect, not evidence of a Google ranking penalty.

**Proposed action:** establish which deployed handler processes `/go/`, then make it preserve the encoded destination and incoming query parameters, return 302 with `Cache-Control: no-store`, and retain noindex handling. Recheck monthly/lifetime for every product and locale without visiting partner checkout. Relevant source: `workers/site.js`, `src/config/checkout-redirects.mjs`, `scripts/generate-static-redirects.mjs`, `wrangler.toml` and `functions/_middleware.js`.

### 2. Medium — live canonicalization and checkout aliases do not match the repository

**Confirmed live; potential lost entry paths.** The 60 localized checkout tests returned 404. This represents **30 unique localized path forms tested with two plans**, not 60 missing content pages. Examples:

- `https://cheatsfortheisle.com/es/go/the-isle-cheats/?plan=monthly`
- `https://cheatsfortheisle.com/de/go/hwid-spoofer/?plan=lifetime`
- `https://cheatsfortheisle.com/fr/go/ugc/?plan=monthly`

Additional tested variants `/en/`, `/en/cheats/`, `/Cheats/` and `/CHEATS/` return 404, although the current Worker code normalizes these. The site's current visible purchase links use the correct **unprefixed** `/go/` URLs, and the live graph contains no broken links to these aliases. Actual backlink/traffic loss on these variants is unknown.

The ordinary configured legacy redirect map was also tested: its destinations work through the live redirect layer. The mismatch concerns dynamic rules beyond that static map.

**Proposed action:** verify the production domain/deployment binding and restore the configured normalization behavior. Keep genuinely invalid nested locale paths and unknown pages as real 404s. Do not redirect every missing URL to the homepage.

**Interpretation:** the public responses are consistent with static redirects and the limited Pages fallback handling requests instead of the complete configured Worker. This is an inference from response behavior, not verification of the Cloudflare dashboard. Live headings, paragraph copy, links and script assets match the clone, so a wholesale content rollback is not supported by the evidence.

### 3. Medium — four explicit error documents return HTTP 200

**Confirmed and repeated:** `/404`, `/es/404/`, `/de/404/`, `/fr/404/` show an error page but return 200. `/404.html` redirects to `/404`.

These documents contain `noindex, follow` and are absent from the sitemap, which limits indexing exposure. Random missing pages and nonexistent assets correctly returned HTTP 404. This is a bounded status-code defect, not evidence that all missing URLs are soft 404s.

**Proposed action:** have the deployed handler enforce HTTP 404 for these documents while retaining the useful error body and noindex policy. The repository's local runtime suites already enforce this. See Google's [HTTP status and error guidance](https://developers.google.com/search/docs/crawling-indexing/http-network-errors).

### 4. Low — filtered forum query URLs remain crawlable 200 variants

**Confirmed in all four locales:** `/forum/?category=test&sort=recent&page=2` and its localized equivalents return 200, whereas the shared source rule removes these filter parameters with a 301. A no-slash variant first redirects to the slashed URL while retaining the filters.

Their canonicals correctly point to the clean forum hubs. No expanding query-link crawl trap was found in the site's actual internal graph, so this is a duplicate-URL/crawl-hygiene concern rather than a demonstrated crawl-budget crisis.

**Proposed action:** restore the intended parameter-cleanup handler, preserving unrelated campaign parameters. Confirm the behavior against live URLs after an approved hosting change.

### 5. Medium — Cloudflare analytics is injected but blocked by the site's CSP

**Confirmed on all 148 live pages**, observed in each of the 182 browser cases and independently by Lighthouse. The injected `static.cloudflareinsights.com/beacon.min.js/...` script is rejected because `script-src` permits only self, inline scripts and Google Tag Manager. Application menus and other first-party controls still work.

This produces console/security errors and prevents that measurement script from running. It reduces Lighthouse Best Practices scores; the observations do not establish a direct ranking penalty. It also limits the usefulness of that RUM channel for measuring real visitors.

**Proposed action:** decide whether Cloudflare Web Analytics is intended. If retained, reconcile the exact required script and collection destinations with the deployment's CSP. If unwanted, disable its injection. Check every policy-producing layer; live responses sometimes duplicate security/cache headers. Do not broadly loosen the policy merely to improve a score.

### 6. Medium — product availability is asserted without a traceable current evidence record

All **16 product pages** emit `offers.availability: https://schema.org/InStock`. The source hardcodes it in `src/utils/schema.ts`; `scripts/schema.test.mjs` now expects that value. The active manifest contains product/price evidence, but no specific availability fact or source was found. Earlier conversion/release documents explicitly say unknown availability was omitted, so those documents disagree with current source and live output.

This does **not** prove the products are out of stock. It is an evidence/accuracy gap that the current tests cannot resolve.

**Proposed action:** obtain a current owner/vendor confirmation per affected product and record its authority, or omit the optional availability statement until established. Keep valid prices, review data and offer-plan URLs. Reconcile the stale documentation and test expectation with the approved decision. Google requires structured data to reflect accurate page content; see [structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) and [Product offer properties](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

### 7. Review decision — localized community pages largely reuse their English originals

**Intentional owner policy, not an import defect.** The 45 localized thread-detail pages and three localized review pages preserve their original English material with translated interfaces and declared original-language exceptions. On the localized review pages, about 91% of main text characters sit in the original-English review blocks. Dates, ratings and quotations are preserved correctly.

Google determines page language from visible text and specifically cautions about translating only boilerplate around otherwise repeated UGC. Correct `lang` and reciprocal hreflang do not guarantee Google will treat these as distinct local-language search results. See [Google's multilingual site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites#language).

**Proposed action:** first inspect Google-selected canonicals and indexing for representative localized community URLs in Search Console. Then consider useful, site-controlled localized context where evidence supports it. Any change to indexing, canonical ownership or supplied quotations requires a deliberate owner decision. **Do not automatically translate, rewrite, delete, consolidate or noindex these pages.** No actual indexing suppression has been established.

### 8. Content opportunity — make guides more useful through evidence and concrete detail

The eight guide topics have distinct purposes, working product links and relevant supplied screenshots. Their dedicated explanatory prose is concise; the full English main containers have roughly **401–493 words**, including FAQs and supporting elements. No word-count target or density requirement is recommended.

The useful next gains are substantive: verified edition/feature matrices, precise Cloud DMA equipment requirements, a dated source link for compatibility statements, concrete supported setting examples, and an evidence-backed patch troubleshooting decision path. Current guides frequently tell the buyer to confirm unspecified details. The visible byline is the publishing brand; source evidence in the private manifest is not a reader-facing citation.

**Proposed action:** review each guide against the question its title promises to answer; add sourced details where available, then update all four locales and affected contextual links. Keep unresolved product facts explicit. Do not invent testing, model specifications, outcomes, detection status or personal expertise. Google's [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes satisfying the reader and showing who/how/why, rather than padding length.

No exact duplicate main-text pages were found. A bounded five-word-shingle comparison found the strongest English pair at about 25% Jaccard overlap (`/cheats/` and `/reviews/`, which intentionally share supplied reviews); homepage/main-product overlap was about 18%. These are local similarity measurements, not Google's duplicate-content or cannibalization judgments. Search Console query/landing-page evidence is needed before changing URL ownership.

### 9. Low — small logos download the 512px asset despite existing smaller variants

Lighthouse estimates approximately **18 KiB** avoidable transfer for the shared logo. `BrandLogo.astro` requests suitable widths, but the brand-specific branch of `responsiveImage.ts` forces the 512px file. Existing 32px, 64px and 128px variants are already supplied.

**Proposed action:** serve the existing suitable variants for small rendered logos and retain the 512px image where appropriate for schema/social use. No favicon replacement, artwork redesign or brand regeneration is needed.

### 10. Owner design tradeoff — menu screenshots are stretched, with a low-resolution phone candidate

Lighthouse flags the main-product menu capture as distorted: a 4:3 source is displayed in wider slots using `object-fit: fill`. One mobile gallery example uses a 400px-wide image where the simulated device expects about 555px. The desktop homepage also reports image aspect-ratio warnings.

Source comments explicitly identify full-frame menu presentation as **owner-requested**. This is not permission to undo that presentation. The source bytes and all protected utility images remain intact.

**Proposed action:** if the owner wants a change, review containing/cropping the menu captures and/or selecting a sharper existing phone candidate. Treat this as image readability/presentation work, with screenshots for approval. It is not a demonstrated ranking blocker.

### 11. Low — complementary landmark best-practice warnings on 84 pages

The broad axe scan reports only `landmark-complementary-is-top-level`, on **84 distinct pages**: 16 product pages, 64 forum pages and four review pages. Nested `<aside>` elements trigger the warning. This is an axe best-practice issue, not a detected WCAG A/AA failure. The selected Lighthouse accessibility audits score 100.

**Proposed action:** review whether these embedded panels should be sections/divs with appropriate accessible names, or true top-level complementary landmarks. Preserve layout and existing reading/navigation behavior. No color-contrast or keyboard-navigation failure was reproduced in the additional checks.

### 12. Low/contextual — four homepage link warnings remain documented exceptions

Each homepage has **34 same-locale referring pages**, but zero links classified as contextual incoming by the conservative native analyzer. This is the same documented exception in `internal-linking-audit.md`; they are not orphan pages. All indexable pages are reachable within two clicks.

**Proposed action:** add homepage overview links only when a future passage naturally warrants one. Selected guides have one to four contextual outgoing links in addition to CTAs/widgets; investigate reader-useful connections as content expands. Do not force links, reciprocal pairs or quotas to silence warnings.

### 13. Low — every RSS enclosure omits its required byte length

The live `/rss.xml` is well-formed XML and returns 200, but all **eight item enclosures** omit the `length` attribute. RSS 2.0 requires `url`, `length` and `type` when an enclosure is emitted. The source generator in `src/utils/rss.ts` emits only `url` and `type`. This was confirmed against the live feed and a strict XML parse; well-formed XML alone does not establish RSS conformance. See the [RSS Advisory Board specification](https://www.rssboard.org/rss-specification#ltenclosuregtSubelementOfLtitemgt).

**Proposed action:** emit the accurate byte length of each referenced image, or deliberately omit optional enclosure elements if media attachment is not intended. Verify the live feed after an approved release. This is a feed-client compatibility defect; no effect on normal page indexing or rankings has been demonstrated.

### 14. Low — localized accessibility labels retain ordinary English text

Across the **111 audited Spanish/German/French pages**, the shared navigation labels remain `Primary` and `Mobile` (111 instances each), and both brand-home links use an English `home` suffix (222 instances). The shared artwork description is also English in 222 logo alt instances. The three localized FAQ pages additionally retain `aria-label="Related pages"`.

These are website-controlled strings, separate from the expressly preserved English community quotations. Visible navigation text is localized. The accessibility scan did not report a WCAG A/AA failure for these language choices, and no ranking impact was measured.

**Proposed action:** localize the landmark names, home-link accessible names and artwork descriptions using the existing dictionaries/helpers. Retain the brand name, consistent artwork meaning and supplied assets. Keep the original-language community exception scoped to its existing quotations/schema.

## Additional audit conclusions

The follow-up pass reused the completed technical checks and added the following investigations without changing application files:

- **Raw/rendered parity:** all 148 pages returned 200. Titles, descriptions, canonicals, robots, H1s, link sets and JSON-LD stayed equivalent after scripts ran and the page was scrolled. Four forum hubs reorder their existing threads into the client-side default sort; they do not add/remove words or crawlable destinations. This is not a JavaScript-only content/indexability fault. These are browser observations, not Google's URL Inspection output.
- **Image SEO:** all 448 non-placeholder image instances had descriptive, non-generic alt attributes, declared dimensions consistent with their fallback image ratio, next-generation fallback formats, and fallback files below the 200 KiB review threshold. Repeated logos/the same screenshot legitimately reuse alt descriptions. Existing findings about an oversized 512px logo candidate and owner-requested rendered screenshot stretching remain; intrinsic attribute correctness does not resolve rendered CSS distortion. Larger responsive candidates and protected media were covered by the preceding asset checks.
- **Crawl traps:** the complete static graph contains no non-checkout parameterized anchor URLs. No numeric calendar/pagination path loop was present in the route inventory. Checkout query links are intentionally excluded under the existing robots policy. The separately probed 200 forum-query variants remain a crawl-hygiene issue, but there is no evidence of an internally generated crawl trap. No speculative parameter explosion was requested from the live server.
- **Schema required fields and correspondence:** no additional missing-required-field, relative-schema-URL, invalid-date, price visibility, review arithmetic, supplied review text or reply-count errors were found. The 16 stock assertions remain an evidence gap described above. The schema checks are scoped local checks against served markup, not a full Schema.org vocabulary validator or Google's live Rich Results Test.
- **Author identity recommendation:** all **32 article pages** identify the publishing organization but omit recommended `author.url`/`sameAs`. Linking that real identity to the existing About page is a low-priority clarity improvement, not a missing required Article property. Google's [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) distinguishes recommended fields from required fields. Do not create fictional people, credentials or profiles.
- **Unknown forum author:** `/forum/the-isle-esp-what-it-shows/` and its three localized versions use the owner-approved `Original poster` fallback because no author name was supplied. It accurately exposes the archive limitation, but does not identify an actual person for Google's recommended author understanding. Retain that limitation and review eligibility if needed; do not invent a username or profile. See [discussion forum author requirements](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum).
- **FAQ feature status:** **12 pages** emit `FAQPage`. Google retired FAQ rich results on **7 May 2026**, with documentation removal recorded in June. Keeping truthful FAQ vocabulary is not an indexing defect; adding more does not create the retired Google feature. Preserve useful visible FAQs. Source: [Google's official documentation changelog](https://developers.google.com/search/updates).
- **Appropriate product-review scope:** the Product reviews were not incorrectly classified as self-serving Organization/LocalBusiness reviews. Product snippets and merchant listings have different requirements; this referral site's current Product markup was examined against the applicable snippet properties. See [Google's Product feature distinction](https://developers.google.com/search/docs/appearance/structured-data/product) and [review type guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet). Eligibility and actual display remain unverified.

The rendering helper uses installed Chrome with existing Playwright instead of adding Puppeteer; the unavailable Python image/schema/crawl helpers were replaced with Node, the existing parser and installed sharp. Automated candidate warnings were reviewed: paragraph-boundary whitespace and legitimate forum sorting were not reported as missing content.

## Checks that passed

- All 140 sitemap URLs are HTTPS, HTTP 200 and self-canonical; none redirects or carries noindex. Eight legal URLs remain deliberately noindex and excluded.
- All 148 audited HTML pages have one nonempty title, description and H1. No duplicate indexable titles/descriptions, missing viewport, duplicate IDs, broken ARIA references or skipped heading levels were detected. Title lengths are 35–60 characters and descriptions 98–150; length alone is not an SEO pass/fail rule.
- Reciprocal en/es/de/fr/x-default hreflang targets exist. The native live graph found no unintended cross-locale content links.
- Robots allows intended content and disallows checkout paths. Its sitemap reference is correct. Live and local sitemap XML parsed strictly; local RSS XML parsed strictly, and the live RSS endpoint returned 200.
- No broken on-site page links, missing linked fragments or missing directly referenced assets were found in the audited inventory. Supplied utility media matched all 20 protected hashes live.
- HTTP and www home variants reach the HTTPS apex. `http://www` uses two redirects, a small consolidation opportunity rather than a broken route. Slash/index variants examined settle correctly except for the explicit issues above.
- Googlebot/Bingbot user-agent requests to the homepage returned 200. This tests these requests from the audit location; it does not verify real crawler-IP access or actual indexing.
- JSON-LD parses, product prices and selected-plan URLs agree with source, and supplied product review counts/averages are derived from actual records. These checks do not certify Google rich-result eligibility or product availability.
- All inspected checkout links carry `rel="sponsored"`. The two visible external content/support destinations, Steam and the checkout support page, returned 200.
- First-party controls function with JavaScript; important page copy is present in initial HTML. No-JavaScript checks on home, main product, FAQ and forum confirm pre-rendered content. FAQ answers are in HTML but cannot be expanded without JavaScript; progressive enhancement is an optional resilience improvement, not a demonstrated Google rendering failure.
- Shared layout, navigation, pricing synchronization, imported community text, theme, favicon and original files remain preserved.

## Performance and accessibility measurements

Final live lab measurements, with Chrome Lighthouse 13.6.0 and fresh profiles. Mobile uses default simulated mobile throttling; desktop uses the documented desktop settings retained in the audit helper. Measurements are from this audit environment and vary between runs.

| Live sample | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile | 99 | 100 | 92 | 100 | 1.69s | 0 | 0ms |
| Main product, mobile | 98 | 100 | 85 | 100 | 1.97s | 0 | 0ms |
| Reviews, mobile | 98 | 100 | 92 | 100 | 1.55s | 0 | 0ms |
| Forum thread, mobile | 100 | 100 | 92 | 100 | 1.54s | 0 | 0ms |
| Homepage, desktop | 100 | 100 | 88 | 100 | 0.48s | 0 | 0ms |

The CSP-blocked beacon and screenshot presentation explain the material Best Practices findings. Smaller logo delivery is a measured optimization opportunity; the current lab results do not justify a performance redesign. The whole-page browser scan found zero horizontal overflow across 182 dark-theme cases; thirteen additional mobile light-theme pages had no detected WCAG A/AA issues. Keyboard skip-to-main moves focus to the main element.

**Field Core Web Vitals/INP: not established.** The public PageSpeed API returned HTTP 429 quota exhaustion. No Search Console, CrUX account/API data or real-user sample was available. Lighthouse TBT is a lab metric; it is not field INP. A lab SEO/accessibility score of 100 does not negate the separately measured routing, language or schema-evidence concerns.

## Repository verification

| Command/check | Result |
| --- | --- |
| `npm ci --no-fund --no-audit` | Completed; package/lockfile unchanged |
| `npm run typecheck` | PASS — 229 files; zero errors/warnings, 18 hints |
| `npm run build` | PASS — 157 HTML files; 140 approved localized pages verified |
| `npm test` | PASS — all 83 tests |
| `npm run validate` | PASS — zero errors, four documented homepage-context warnings |
| `npm run validate:runtime` | PASS — 518 local HTTP checks; zero external requests |
| `npm run validate:cloudflare` | PASS — 597 checks, 152 configured pages, 78 assets, strictly local workerd/ASSETS; zero external requests |
| `npm run validate:browser` | PASS — 60 cases, 192 selections, 60 navigation clicks, 48 intercepted purchases; no errors |
| `npm audit --json --ignore-scripts --no-fund` | Zero known advisories across installed production/development dependencies at audit time |
| Final file preservation | All 325 baseline application/config/public/content files byte-identical; no additions/deletions in those inputs |

The initial runtime attempt was blocked by sandbox loopback permissions; the authorized retry outside the sandbox passed. An initial local browser run overlapped the Cloudflare suite's rebuild and encountered temporarily missing `/de/` output. The complete browser suite passed after the rebuild finished; that transient harness condition is not reported as a website defect. Initial immediate control-state reads were repeated with deferred initialization properly awaited and passed. Preliminary Lighthouse runs overlapping other work were replaced by the final sequential measurements above.

Builds rewrote seven generated public files with line-ending-only differences. Their exact original bytes were restored from the audit snapshot, and final validation was rerun. No fix was made as part of this audit.

## Remaining evidence gaps

- Search Console ownership/data: actual indexed pages, Google-selected canonicals, crawl statistics, exclusions, manual actions, security reports, query-to-page overlap and CTR were not accessible. A public `site:` search returned no usable results in the tool; **this is not evidence of deindexing**.
- Backlink/referring-domain quality, disavow history, lost-link traffic and actual ranking changes were not measured. No penalty or traffic-loss cause is claimed.
- Cloudflare deployment identity, dashboard rules, bindings and cache configuration were not inspected. The handler mismatch is measured; the precise hosting cause remains to be verified.
- Real partner plan acceptance, payment/fulfillment, product execution/detection/compatibility and current inventory were not tested.
- Automated accessibility and representative visual inspection are not a full assistive-technology audit. Localized prose was structurally checked and reviewed for obvious issues; no independent native-speaker certification is claimed.

## Recommended approval order

1. **First:** investigate the live handler/deployment mismatch and prepare the checkout, alias, error-status and forum-query corrections as one coherent routing scope. Any live hosting change or deployment remains a separate explicit owner action/approval.
2. **Next:** resolve the analytics/CSP decision and confirm or omit unsupported availability data, with matching source/test/documentation updates.
3. **Then:** approve specific guide improvements and a community-language/indexing review informed by Search Console. Preserve all supplied community quotations.
4. **Optional polish:** RSS enclosure lengths, localized accessibility strings, article identity links, existing smaller logo variants, landmark semantics, no-JavaScript FAQ resilience and an owner decision on screenshot presentation. Retain the relevance-based homepage linking exceptions unless a useful opportunity emerges.

Owner approval is pending for every corrective action. No deployment, indexing submission or content/indexability change is included in this completed audit.

## Deliverables and raw evidence

- [Per-page URL inventory](full-site-audit-2026-11-06-pages.csv): all 148 HTML pages, status, metadata, canonical, link counts, crawl depth and HTML bytes.
- [Machine-readable audit](full-site-audit-2026-11-06.json): findings, coverage, mechanical score limitations and page inventory.
- Raw evidence: `.astro/audit-2026-11-06/`, including `live-audit.json`, `live-probes.json`, `live-rechecks.json`, `live-link-graph.json`, `live-assets-all.json`, `browser-live.json`, `interactions.json`, `light-and-visual.json`, final Lighthouse HTML/JSON reports, command logs and `preservation-final.json`.
- Follow-up audit evidence: `render-parity.json`, `extended-static.json`, `live-rss.xml`, `rss-semantics-final.json` and `extended-summary.json` in the same ignored audit folder.
- Local browser results/screenshots: `.astro/browser-qa/`; local Cloudflare results: `.astro/part41-cloudflare-results.json`.

This report records what was measured and what still needs approval or first-party evidence. It does not certify rankings, indexing, rich-result eligibility or checkout fulfillment.
