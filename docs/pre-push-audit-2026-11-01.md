# Pre-push release audit — 2026-11-01

**Status: READY FOR DEPLOYMENT based on local checks. No known local launch blockers remain.** This is not a ranking guarantee or verification of a deployed site.

This audit covers the local production build for **https://cheatsfortheisle.com**, with unprefixed English and Spanish, German and French variants. It supersedes earlier release-check results where the code or checks changed. No commit, push, deployment, DNS change or indexing submission was performed.

## Verification scope

- Production output: 157 HTML documents; 140 indexable, self-canonical sitemap URLs. Checkout fallback, legal and error documents retain intentional indexing restrictions.
- SEO validation checks exact configured titles/descriptions, one H1, canonical URLs, reciprocal hreflang, sitemap membership/alternates, robots rules, JSON-LD identity/language/offer data, links, fragments, local assets and image dimensions. Additional checks reconstruct heading outlines and the internal link graph, parse XML strictly, and check duplicate IDs and ARIA references.
- Runtime suites exercise Node and strictly local Wrangler/workerd with the actual ASSETS binding, including canonical redirects, trailing slashes, localization, legacy aliases, unknown routes and checkout routing. Browser checkout is intercepted before partner contact.
- Four-product plans/referrals remain configured separately; both monthly/lifetime query selections are preserved. Approved main-product prices remain $35 for 31 days and $150 lifetime; current approved compatibility restrictions remain EVRIMA only, Windows 10/11 x64, HVCI/Core Isolation and TPM/Secure Boot on, with Cloud DMA required for full functionality. No product execution, detection status or stock status was verified.
- Content workflow checks four locales, eight distinct guides and fifteen imported discussions. Ten supplied reviews and 115 supplied replies retain their source wording. Localized interfaces and metadata surround original English quotations, with their language declared; the quotations were not machine-translated or presented as new local-language submissions.

## Confirmed defects fixed

1. Removed unsupported `InStock` assertions from product offers while retaining approved plan prices and URLs. Added a schema regression test.
2. Qualified partner checkout links with `rel="sponsored"`, with native validation and regression coverage. Google documents this relation for paid/affiliate links: [qualifying outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links).
3. Fixed text contrast on active FAQ filters, pricing badges, catalog/forum buttons and the light-theme article CTA using the existing palette.
4. Gave repeated section landmarks distinct accessible names using existing localized eyebrow/title text.
5. Made overflowing product galleries keyboard-focusable with a visible focus outline.
6. Removed inaccurate fixed `content-visibility` placeholders that produced mobile scroll jumps and temporary overlap between product cards and a later CTA. Lazy images and existing reveal animations remain.
7. Removed redundant labels from generic homepage containers and gave forum reply-count groups the semantic role needed for their localized accessible labels.

Implementation changes are in shared product components, `SectionHeader.astro`, `WhySetupSection.astro`, blog purchase links, the catalog page, scoped CSS, `src/utils/schema.ts`, `src/config/validation.ts`, `scripts/validate.mjs`, `scripts/validate.test.mjs` and the new `scripts/schema.test.mjs`.

## Preservation and content review

No obsolete game branding was found in customer-facing production output. Historical master documentation, migration aliases and the original content-pack origin remain intentional provenance. No unused dependency or protected asset was removed without evidence. Package and lockfile, AGENTS.md, theme palette definitions, supplied screenshots, utility media, brand artwork and favicons were hash-compared against the audit baseline and preserved. No separate replacement logo/favicon artwork was supplied.

This directory has no `.git` metadata (`git rev-parse` reports that it is not a repository). Changes were reviewed against a SHA-256 file baseline rather than Git diff. A future push requires the intended Git checkout/remote to be established separately; none was initialized or modified during this audit.

Commercial pages describe dinosaur ESP, radar, resource markers, bite-assist controls and requirements with distinct buying/support intents. The keyword map assigns separate roles to product pages and eight guides. Forum and review archives remain read-only. Four concise About pages were flagged by a sub-100-word heuristic and reviewed as brand-identity pages; they were not padded with repetitive copy. No orphan indexable pages or skipped heading levels were found.

## Results

| Check | Result |
| --- | --- |
| Native content pack | PASS — four locales, eight guides, fifteen discussions |
| Astro typecheck | PASS — 222 files; zero errors/warnings, 18 nonblocking hints |
| Production build | PASS — 157 HTML documents; approved localized content verified |
| Automated tests | PASS — 62 tests |
| Native output/SEO validator | PASS — 140 sitemap URLs; zero errors/warnings |
| Strict sitemap/RSS XML and DOM references | PASS — correct namespace/limits; no duplicate IDs or missing ARIA targets |
| Internal graph/headings | PASS — no orphan indexable pages or skipped heading levels |
| Node HTTP | PASS — 518 checks; no external requests |
| Local Cloudflare | PASS — 597 checks, 152 pages, 78 assets; no external requests |
| Core Chrome browser | PASS — 60 page cases at 390/768/1440px, 192 plan selections, 60 navigation clicks, 48 locally intercepted checkouts; no errors |
| Reviews browser | PASS — 12 cases, 120 rendered review instances, source content/layout/navigation checked |
| Gallery keyboard | PASS — main and HWID galleries receive focus, show a 2px outline and scroll with ArrowRight |
| Mobile section geometry | PASS — Products and setup positions remain stable after scrolling; setup CTA hit-test resolves to the intended link |
| Protected paths | PASS — 55 baseline hashes unchanged |
| Production dependency advisories | PASS — `npm audit --omit=dev`, zero known vulnerabilities; not a penetration test |
| Axe accessibility | PASS — 162 cases: all 152 configured pages in dark theme plus ten representative light-theme pages; zero detected violations or execution errors |
| Local Lighthouse | PASS — five samples, performance 99–100; accessibility, best practices and SEO all 100 |

Final changes to the article CTA exclusion class and generic-container semantics are covered by the subsequent full accessibility scan, Lighthouse and production/runtime validation. The core product/navigation and review suites above were already passing; their behavior and review content did not change.

No unintended 404s or missing local assets were found in the audited output and runtime cases. Expected missing routes return HTTP 404; they were not redirected to a successful homepage. Prices, referrals and supplied media remain unchanged.

Lighthouse **13.6.0**, installed in an isolated ignored audit folder, used fresh headless Chrome, default simulated mobile settings or its desktop preset and localhost production output. External HTTPS requests were blocked; there was no configured analytics in this build. These are lab measurements, not field Core Web Vitals or deployed-network measurements.

| Sample | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage, mobile | 100 | 100 | 100 | 100 | 0.96s | 0 |
| Main product, mobile | 99 | 100 | 100 | 100 | 1.96s | 0 |
| Reviews, mobile | 100 | 100 | 100 | 100 | 0.90s | 0 |
| Forum discussion, mobile | 100 | 100 | 100 | 100 | 0.90s | 0 |
| Homepage, desktop | 100 | 100 | 100 | 100 | 0.55s | 0 |

Total blocking time ranged from 0 to 23.5ms. The main-product LCP remains below 2.5 seconds; its 99 performance score does not indicate a failed Core Web Vitals threshold. No artificial changes were made to chase a perfect numeric score.

Axe still returns manual-review items for radio-label context and contrast over images/collapsible fades. Plan-selection keyboard behavior, gallery keyboard behavior and sample visual layouts were checked. Automated passes do not establish comprehensive WCAG compliance; a complete screen-reader/assistive-technology audit was not performed.

The audit changed 22 existing implementation/validation files, added `scripts/schema.test.mjs`, and updated release documentation. No dependency, supplied image, favicon or brand-palette file changed. The final hash comparison and changed-path inventory are in `.content/release-audit/protocol.json`.

## Deployment configuration and remaining live checks

The existing Worker configuration targets the apex and www domains, builds static `dist`, binds ASSETS and runs the Worker before assets. Local binding behavior was tested; account ownership, DNS, certificates and deployed edge behavior were not. No mandatory application credential is required by this static site. Optional public environment settings `PUBLIC_SITE_NAME`, `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_TWITTER_SITE`, `PUBLIC_TWITTER_CREATOR` and `PUBLIC_ORG_SAME_AS` were unset during the audited build; configured identity defaults apply and analytics is absent. Never put credentials in PUBLIC variables.

**NOT TESTED:** Google Search Console, Google Rich Results live tooling, Seobility, deployed Cloudflare/DNS/TLS, real checkout/payment or support submission, product operation and real-user CrUX/INP. Recheck public status codes, redirects, robots/sitemap and primary CTAs after an authorized deployment, then verify ownership/indexing separately.

A clean technical audit supports crawlability and usability; it cannot establish indexing or ranking outcomes. Google explicitly states that meeting its requirements does not guarantee crawling, indexing or serving: [Google Search Essentials](https://developers.google.com/search/docs/essentials).

Local evidence is retained under ignored `.content/release-audit/`, `.astro/browser-qa/`, `.astro/reviews-list/` and `.astro/release-lighthouse/`. Temporary Lighthouse tooling is isolated under `.content/`; it is not a production dependency or deployment asset.
