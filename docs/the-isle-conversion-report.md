# The Isle conversion: READY FOR MEDIA

> Historical handoff. Superseded by the [final deployment-readiness report](the-isle-deployment-readiness.md), which records screenshot integration, cleanup and final local verification.

Verified locally on 2026-11-01. Brand: **CHEATS FOR THE ISLE**. Production origin configured as **https://cheatsfortheisle.com**. Preview: http://127.0.0.1:4321/ (HTTP 200 with the converted brand).

## Completed

- Converted native homepage, main product, utility introductions/benefits, catalog/comparisons, FAQs, about/support, localized metadata, manifest identity, RSS, checkout fallbacks and local Wrangler domain configuration. Astro static output, four-product composition, shared routes and localization remain in place.
- Installed the reviewed native content pack: **11 commercial pages, eight distinct guides and ten editorial discussion starters in each of en/es/de/fr**. The 116 approved localized content pages pass the build gate. Forum authors are the publishing Organization, start with localized editorial disclosure and have zero invented votes, comments or replies.
- The homepage owns The Isle Cheats; purchase, compatibility, feature, utility and discussion intents have separate URL ownership. See [keyword map](the-isle-keyword-map.md). Search volume/difficulty were not available and were not invented.
- Main pricing is **$35 / 31 days** and **$150 lifetime**. Owner approved the current linked-page restrictions: **EVRIMA only**, 64-bit Windows 10/11, HVCI/Core Isolation and TPM/Secure Boot on, Cloud DMA for full functionality. Exact Cloud DMA configuration and edition allocation must be confirmed before purchase; no extra hardware specification was invented.
- All four referral destinations match the supplied URLs exactly. Main visible checkout is /go/the-isle-cheats/; monthly/lifetime selections are preserved. Internal elite and wardogs keys remain implementation keys, not public detail pages. Existing alternate checkout paths are retained as intentional migration aliases.
- Preserved all utility factual feature rows, requirements and media. Utility monthly prices remain $50 for HWID Spoofer and $35 for UGC/Skin Changer, each for 31 days; lifetime remains $150. Sales wording is original and uses the brand's own voice.
- Removed inherited unsupported user counts, patch-speed claims, main-product firearm capabilities, limited-availability/popularity claims and unverified InStock schema. No detection guarantee or independent functionality testing is claimed.
- The supplied product summary's dinosaur Appearance Changer is distinguished from the separately licensed Skin Changer. The latter's The Isle compatibility is not established by the supplied utility facts.

## Preserved design and actual fixes

Shared style files, brand artwork, utility images and all favicon files are byte-for-byte unchanged: **43 protected files checked, zero differences**. The layout, palette, font families, animation and responsive components remain. The long brand exposed a mobile header overflow; the brand area can now shrink, with compact wordmark sizing and shorter localized plan CTAs so the menu remains reachable.

Fixed the homepage catalog CTA target and the old weapon-oriented FAQ filter labels. Existing image pruning would delete the brand image now used by editorial cards; that deletion was removed. Existing brand variants are reused without regenerating artwork. The original support address was domain-derived, not confirmed; no new mailbox is fabricated. Order/setup support uses the verified existing checkout support page at https://zadeyo.com/support, and unsupported email properties are omitted from schema. A brand mailbox can be supplied later if desired.

A separately rendered original baseline was compared with the converted output. Homepage, main product, catalog, FAQ, support and about have **no unchanged long paragraphs** in that comparison. Only factual utility screenshot captions remain verbatim. No original files were deleted. Git metadata is absent in this clone; comparison evidence uses the preserved .content/baseline snapshot rather than a claimed git diff.

## Validation results

| Check | Actual result |
| --- | --- |
| content:prepare / content:plan / content:check / content:install | Passed; prepared before origin change; all four locale inventories complete |
| Typecheck | 220 files, zero errors, zero warnings; 18 nonblocking hints |
| Production build | Passed, including final local Wrangler build hook and approved-content verification |
| npm test | 57 passed, zero failed; includes local-host, checkout, Worker, content and validator regressions |
| Output validator | 134 HTML documents, 116 sitemap URLs, zero errors/warnings |
| Local Node HTTP checks | 384 passed; zero external requests |
| Chrome browser suite | 60 page/viewport cases at 390/768/1440px, 192 plan selections, 60 navigation clicks, 48 locally intercepted purchases; zero recorded errors |
| Supplementary browser checks | 8 representative pages; localized blog filtering, local vote persistence/reversal, FAQ expansion, catalog CTA, heading accent and final badge/label checks passed |
| Local Cloudflare | 464 checks, 128 pages, 79 assets through real local Wrangler/workerd + ASSETS; zero external requests |
| Media and facts | Protected hashes unchanged; utility features, requirements and media paths preserved |

Browser review caught and resolved the mobile-header defect; the full suite then passed. Representative English desktop, French mobile, Spanish tablet and mobile product views were visually inspected. The supplementary checks use fresh browser storage; votes are local UI behavior, not a community backend.

Detailed local evidence is retained under ignored .content/ and .astro/: typecheck/build/tests/validate/runtime/browser/cloudflare logs, source-review.json, rendered-comparison.json, browser-qa/results.json and extra-qa/results.json. No new dependencies or package versions were introduced for this conversion.

## Media handoff

See [media replacement manifest](media-replacement-manifest.json).

1. Supply an authorized EVRIMA dinosaur ESP gameplay capture for the retained 1024×576 slot.
2. Supply current Bite Assist and dinosaur/resource ESP menu captures for the two retained 1024×627 slots. Other dimensions are acceptable if the true dimensions are recorded during integration.
3. Supply the new branding artwork. Every existing favicon must remain unchanged even when logo variants are replaced.

The three old gameplay masters and their image slots remain intentionally, with template-media disclosure. Interim blog/social artwork uses the existing violet emblem; it is not a fabricated product screenshot. Protected utility media remains in place. Final legacy screenshot cleanup, accurate final captions/alts and social previews are deferred until the supplied assets are installed, followed by affected validation.

**READY FOR MEDIA is not production/deployment clearance.** Live DNS/TLS/CDN/account settings, external affiliate fulfillment/plan acceptance, product detection/functionality, GSC, Seobility, live indexing/rich results and measured Lighthouse/field Core Web Vitals were not verified. Optional analytics/social environment names remain supported; no credentials were printed or uploaded. No commit, push, deployment, DNS change, purchase or indexing submission was made.
