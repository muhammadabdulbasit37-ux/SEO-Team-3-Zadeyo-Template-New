# SEO and content improvements — 2026-11-01

This revision implements the owner's approved improvement pass after reviewing the supplied audit prompt and Seobility screenshots. It preserves the existing design and route architecture. The live site's previous audit scores do not certify this revision; the results below describe local checks.

## What changed

- Refined metadata for 20 indexable page types in four languages: homepage, main product, catalog, three utilities, blog hub, FAQ, About, Support, Reviews, Forum and eight guides. The [metadata inventory](seo-metadata-inventory.csv) records those 80 entries plus eight noindex policy descriptions, with character counts and indexability. Every entry fits the existing renderer without cutting off a sentence; meaningful concise titles remain concise.
- Kept distinct reader needs: homepage discovery, main-product purchasing, catalog comparison and specific guide questions. Search titles now identify the relevant game/features rather than relying on generic words. The [keyword map](the-isle-keyword-map.md) documents ownership, localized targeting and a measurement plan. Search demand, ranking difficulty and positions were not fabricated.
- Replaced repeated homepage workflow headings and differentiated overview, highlights, features and interface-preview headings on the utility pages. Utility workflow steps now have distinct action labels while retaining their original descriptive facts. Catalog sections distinguish product selection from comparison. Existing styles and layouts remain in use.
- Expanded About and Support with practical buying/order guidance, contextual product/FAQ/guide links, and referral-checkout responsibilities. They explain that referral commissions may be earned without naming the checkout provider, following the owner's subsequent brand rule. The publishing brand remains CHEATS FOR THE ISLE.
- Corrected inherited policy facts in all four languages: removed unconfirmed portal-delivery, device-enforcement, refund-remedy and support-retention claims, plus duplicated refund paragraphs. The text now directs readers to the checkout provider's actual conditions, explains optional analytics/browser preferences and dates the actual update. Privacy/Terms remain noindex. This is factual cleanup, not legal-compliance certification; operator-specific obligations still require the owner's review.
- Aligned Product JSON-LD with that relationship: named seller and product-brand assertions are omitted rather than presenting the publisher as the software supplier. Kept sourced prices and plan URLs; unknown availability remains omitted. Updated the schema regression test.
- Improved the eight guides' first section headings and added selected contextual links between ESP/resources, targeting/display, requirements and purchase questions. Changed the blog hub's descriptive subtitle from a heading to a paragraph while retaining its visual class.
- Used the native content workflow, not a manifest-only override. Active reviewed run: `.content/187230cf9269e6f7`. Original forum records and reviews, product facts, prices, media and referral destinations are preserved.

## Intentional decisions

The homepage H1 stays “The Isle Cheats.” Padding it to satisfy a 20-character threshold would not improve its meaning. Header/footer labels remain consistent rather than being rewritten solely to remove repeated-anchor warnings. No irrelevant page keywords were added to logo alt text, no word-count padding or social-sharing widgets were introduced, and no unrelated language pages were canonicalized together.

The reported orphan examples were linked from the live German forum hub before this revision. No arbitrary URL changes were needed. Existing sitemap/robots/canonical/hreflang infrastructure remains in place.

## Validation

| Check | Result |
| --- | --- |
| Native content pack | PASS — four locales, eight guides, fifteen preserved discussions |
| Astro typecheck | PASS — 222 files, zero errors/warnings, 18 nonblocking hints |
| Production build | PASS — 157 HTML documents, 140 approved localized indexable pages |
| Automated tests | PASS — 62 tests, including product-offer schema regression coverage |
| Output/SEO validator | PASS — 140 sitemap URLs, zero errors/warnings; links/assets, metadata, schema, canonical/hreflang and robots rules checked |
| Metadata inventory against rendered output | PASS — all 88 entries match exactly |
| Heading and internal-link review | PASS — zero duplicate heading texts, skipped heading levels or orphan indexable pages |
| Checkout qualification/schema | PASS — sponsored links retained; unsupported stock/product-brand assertions absent |
| Node HTTP | PASS — 518 checks, zero external requests |
| Local Cloudflare/workerd | PASS — 597 checks, 152 pages and 78 assets, zero external requests |
| Core Chrome commerce/navigation | PASS — 60 page cases, 192 plan selections, 60 navigation clicks and 48 intercepted checkout clicks; no errors |
| Final scoped responsive Chrome | PASS — 132 cases across 390/768/1440px and all four languages, including utilities and policy pages; no overflow, broken responses or JavaScript errors |
| Vendor-name rule | PASS — zero named-vendor matches in visible text, alt/title/ARIA labels, descriptive metadata or JSON-LD across all 157 HTML documents; 24 additional final responsive checks pass after the name removal |
| Axe accessibility | PASS — 162 cases, zero detected violations/errors; theme transitions settled before static contrast measurement |
| Protected content/assets | PASS — 66 path hashes unchanged; review/forum data, prices, destinations, supplied media, theme palette/styles, favicon and dependencies preserved |
| Utility fact prose | PASS — unchanged; only action labels in acquisition steps were edited |
| Git whitespace check | PASS |

Lighthouse 13.6.0 ran with fresh headless Chrome against the local production build, its default simulated mobile profile and external HTTPS blocked. These are lab results, not live/field measurements or Google ranking scores.

| Sample | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage | 100 | 100 | 100 | 100 | 0.93s | 0 |
| Main product | 99 | 100 | 100 | 100 | 1.96s | 0 |
| About | 100 | 100 | 100 | 100 | 0.90s | 0 |
| Support | 100 | 100 | 100 | 100 | 1.08s | 0 |

Total blocking time was 0–12ms across these samples. Axe retains manual-review items for image/fade contrast and radio-label context; automated checks are not comprehensive assistive-technology certification. Screenshots of mobile About and German catalog layouts were visually inspected. The final vendor-name adjustment was followed by fresh build, test, HTTP/Cloudflare, static-copy, accessibility, targeted browser and Lighthouse checks.

NOT TESTED: Search Console ownership/indexing/selected canonicals, live Seobility after these changes, Google Rich Results tooling, live deployment/edge cache behavior, real purchases, field CrUX/INP and jurisdiction-specific legal compliance. No ranking or penalty immunity is claimed.

Evidence is retained under ignored `.content/seo-improvement/`, `.astro/seo-improvement/` and `.astro/seo-lighthouse/`. Local production preview: `http://127.0.0.1:4173/`.

The owner explicitly confirmed that working referral/support URLs must remain while vendor names are removed from copy and metadata. Those actual destination domains remain discoverable in links/redirects; no claim is made that the affiliate relationship is hidden from search engines. Named seller fields are omitted rather than replaced with an unsupported assertion that this publisher supplies the software.

## Publication and measurement

The implementation pass did not publish or submit URLs. The owner subsequently authorized committing and pushing the completed changes to the existing GitHub repository on 2026-11-02. No standalone Cloudflare deployment, DNS change, Search Console submission, IndexNow submission or external promotion was performed. The owner will handle Search Console after the improvements. No indexing, penalty status or actual ranking outcome is claimed.

After an authorized deployment, check the public HTML and primary CTAs, then verify the domain in Search Console, submit `https://cheatsfortheisle.com/sitemap.xml`, and inspect representative canonical/language URLs. Monitor indexing, relevant queries, impressions, clicks and CTR by language/device once sufficient data exists. Earn relevant mentions through useful original material and legitimate promotion; no backlink or ranking guarantee is made.

The implementation follows Google's guidance on [descriptive titles](https://developers.google.com/search/docs/appearance/title-link), [page-specific snippets](https://developers.google.com/search/docs/appearance/snippet), [natural image descriptions](https://developers.google.com/search/docs/appearance/google-images), [localized URLs](https://developers.google.com/search/docs/specialty/international/localized-versions) and [qualified affiliate links](https://developers.google.com/search/blog/2021/07/link-tagging-and-link-spam-update). Third-party audit scores are diagnostic checklists, not Google ranking scores.

## Follow-up presentation changes — 2026-11-02

The owner selected “A Toolkit Built for The Isle” for the homepage comparison heading; all four locales and the reviewed content pack were updated. The two menu screenshots now display across 16:9 frames without side gaps or cropped controls, using a widened presentation. Original screenshot files, intrinsic dimensions and optimized variants remain intact. The homepage frame is now 16:9; utility imagery and favicon are unchanged. See the [media manifest](media-replacement-manifest.json).

The heading and media changes passed content checks, Astro typecheck, production build and output validation. A scoped Chrome check passed 15 page/viewport cases covering 33 visible menu-image instances, with visual inspection of both settled slider previews. The Lighthouse measurements above predate this final display-only adjustment; no new performance claim is inferred from it.

## Homepage repetition refinement — 2026-11-02

Following the owner's review of the Seobility text-duplication warning, seven comparison/metric descriptions were refined in each language. Feature specifications remain unchanged; the comparison rows now explain practical uses, and the metrics block explains product-specific licensing. This changes 28 localized paragraphs without altering headings, layout, prices, links or capabilities. The native reviewed content pack verifies the new copy in the rendered pages.

PASS: content check, production build, output validation (157 HTML documents, 140 sitemap URLs, zero errors/warnings), and 12 homepage browser cases at 390/768/1440px across all four languages. The long-paragraph duplicate check found no repeated paragraphs of 60 or more characters on the four homepages. This is a scoped content-quality check, not a claim that the live Seobility report has been rerun or that all intentional UI-label repetition is removed. Evidence: ignored `.content/copy-refinement/`.
