# Internal linking audit — 2026-11-04

Reviewed all twelve warnings from the preceding generated-site audit. This maintenance pass adds website-controlled reading paths without editing supplied posts, replies, reviews or approved article bodies. The existing palette, typography, cards, pricing, checkout, metadata, canonicals and route structure remain intact.

## Opportunities and implementation

- The Bite Assist controls guide explains targeting options; its closing paragraph now links to the archived aiming/hitbox discussion and the current main-product features. The main cheats page independently links to that discussion beside its supporting guides. The archived thread's website-controlled product-information section now links back to the localized controls guide. Archived reports are explicitly distinguished from current functionality.
- The hardware-flags/account-appeals comparison distinguishes UGC from identifier changes; its closing paragraph now links to the archived UGC-purpose discussion and current UGC workflows. The UGC product page also points to that discussion beside its guides. Its website-controlled resources link back to the comparison. Historical reports are not treated as current compatibility or recovery guarantees.
- Every link uses the existing locale helper. Native article and supplied-community data modules and the active content manifest remain unchanged. A small shared mapping and four-language note copy define the two reading paths; templates render the surrounding guidance. No global replacement, automatic insertion, extra article or link quota was used.

## Each affected page

Counts are distinct same-locale indexable referring pages/destinations, not repeated anchor occurrences. Contextual incoming counts exclude navigation, widgets and supplied archive text. All before/after numbers below come from actual generated-HTML audits.

| Page | Incoming before → after | Contextual incoming before → after | Outgoing before → after | Decision / additional sources |
| --- | --- | --- | --- | --- |
| `/` | 34 → 34 | 0 → 0 | 14 → 14 | Retain warning: global navigation already supplies 34 referring pages. About/comparison passages better serve specific product or catalog destinations; no forced homepage link. |
| `/forum/isle-aimbot-worth-it/` | 1 → 3 | 0 → 2 | 15 → 16 | Added contextual sources: /cheats/ and /blog/bite-assist-controls/; thread resources now link to the guide. |
| `/forum/ugc-account-recovery-tool-explained/` | 1 → 3 | 0 → 2 | 12 → 13 | Added contextual sources: /ugc/ and /blog/hardware-flags-and-account-appeals/; thread resources now link to the comparison. |
| `/es/` | 34 → 34 | 0 → 0 | 14 → 14 | Retain warning: global navigation already supplies 34 referring pages. About/comparison passages better serve specific product or catalog destinations; no forced homepage link. |
| `/es/forum/isle-aimbot-worth-it/` | 1 → 3 | 0 → 2 | 15 → 16 | Added contextual sources: /es/cheats/ and /es/blog/bite-assist-controls/; thread resources now link to the guide. |
| `/es/forum/ugc-account-recovery-tool-explained/` | 1 → 3 | 0 → 2 | 12 → 13 | Added contextual sources: /es/ugc/ and /es/blog/hardware-flags-and-account-appeals/; thread resources now link to the comparison. |
| `/de/` | 34 → 34 | 0 → 0 | 14 → 14 | Retain warning: global navigation already supplies 34 referring pages. About/comparison passages better serve specific product or catalog destinations; no forced homepage link. |
| `/de/forum/isle-aimbot-worth-it/` | 1 → 3 | 0 → 2 | 15 → 16 | Added contextual sources: /de/cheats/ and /de/blog/bite-assist-controls/; thread resources now link to the guide. |
| `/de/forum/ugc-account-recovery-tool-explained/` | 1 → 3 | 0 → 2 | 12 → 13 | Added contextual sources: /de/ugc/ and /de/blog/hardware-flags-and-account-appeals/; thread resources now link to the comparison. |
| `/fr/` | 34 → 34 | 0 → 0 | 14 → 14 | Retain warning: global navigation already supplies 34 referring pages. About/comparison passages better serve specific product or catalog destinations; no forced homepage link. |
| `/fr/forum/isle-aimbot-worth-it/` | 1 → 3 | 0 → 2 | 15 → 16 | Added contextual sources: /fr/cheats/ and /fr/blog/bite-assist-controls/; thread resources now link to the guide. |
| `/fr/forum/ugc-account-recovery-tool-explained/` | 1 → 3 | 0 → 2 | 12 → 13 | Added contextual sources: /fr/ugc/ and /fr/blog/hardware-flags-and-account-appeals/; thread resources now link to the comparison. |

## Commercial and supporting-page effects

The values below are the same in en/es/de/fr, verified against each localized route. Existing navigation already linked to the products, so added contextual sources can improve contextual incoming counts without changing the total number of referring pages.

| Page family | Incoming before → after | Outgoing before → after | Contextual incoming before → after | Contextual outgoing before → after |
| --- | --- | --- | --- | --- |
| `/cheats/` (+ es/de/fr) | 34 → 34 | 16 → 17 | 5 → 6 | 4 → 5 |
| `/ugc/` (+ es/de/fr) | 34 → 34 | 13 → 14 | 4 → 5 | 4 → 5 |
| `/blog/bite-assist-controls/` (+ es/de/fr) | 6 → 7 | 15 → 16 | 1 → 1 | 2 → 4 |
| `/blog/hardware-flags-and-account-appeals/` (+ es/de/fr) | 4 → 5 | 16 → 17 | 1 → 1 | 1 → 3 |

## Final graph and remaining exceptions

- Indexable routes: 140; generated HTML pages: 157; excluded from indexable coverage: 17.
- Unique directed same-locale links: 2012 → 2036; contextual links: 164 → 188.
- Review warnings: 12 → 4; hard errors: 0; orphan/unreachable indexable pages: 0/0.
- Remaining warnings are exactly `/`, `/es/`, `/de/`, `/fr/`: each has 34 incoming source pages and 14 outgoing destinations, with zero contextual incoming links. These are explicit relevance-based exceptions for this pass. The validator was not weakened and no exception suppresses the warnings. Reassess if future content supplies a useful homepage-overview context.

## Verification and evidence

- `npm run typecheck`: PASS, 229 files; zero errors/warnings and 18 existing hints.
- `npm run build`: PASS, including the approved localized-copy gate.
- `npm test`: PASS, all 83 tests.
- `npm run validate`: PASS; four documented review warnings, no errors.
- `npm run validate:runtime`: PASS; 518 local HTTP checks, zero external requests.
- Targeted fresh-headless Chrome checks: 48 page/viewport cases completed with passing assertions across all four locales at 390/1440px. New link destinations and note counts verified, no horizontal overflow or recorded page errors, and zero external requests. Representative mobile guide and desktop product captures were visually inspected. Browser/server cleanup hooks completed before the summary; the QA helper remained alive afterward and was explicitly stopped. This is not claimed as an exit-zero browser-suite run.
- Supplied blog/forum/review data, approved manifest, shared styles, favicon and referral mappings have no content diff.

Ignored evidence: `.astro/underlinking-review/before.json`, `after.json`, `browser-results.json`, `note-390.png`, `note-1440.png`; latest complete graph: `.astro/internal-links.json`. Reports describe this local output, not live ranking or engagement improvements. No commit, push, deployment or indexing submission occurred.
