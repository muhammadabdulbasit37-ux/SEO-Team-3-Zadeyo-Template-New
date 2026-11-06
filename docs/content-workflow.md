> Current authority: [AGENTS.md](../AGENTS.md), [SEO research](seo/seo-research-workflow.md) and [internal linking](seo/internal-linking-workflow.md). Historical conversion notes below are provenance, not current instructions to generate community content or omit research.

# Content during daily conversions

This workflow integrates the [repo-local skills](skills.md) with the native content tools. Use the source ownership map below for commercial integration and the existing validation scripts for final checks.

The automatic trigger is an authorized Codex task to convert a clone to a **new** game/site: root `AGENTS.md` makes this stage mandatory. Codex researches/plans/writes; npm commands prepare state, enforce contracts and install typed data. Running `npm run build` alone never requests AI copy. Setup/audits and routine maintenance do not trigger generation. The root ten-step sequence and docs/seo procedures govern research, topical/link planning and final graph verification.

## Commercial positioning

The current master is the commercial **The Isle Cheats** website; future targets must be selected through game-specific research. Future conversions retain the commercial game-cheats focus for the confirmed target game, with accurate localized search intent in en/es/de/fr. Preserve the main cheats product plus HWID Spoofer, UGC and Skin Changer architecture, product relationships and verified facts unless an explicit conversion request changes them.

Before approving the keyword-to-URL map, review each planned page's `readerQuestion` and `uniqueValue` for a concrete connection to cheat-product research, features, compatibility, requirements, setup/troubleshooting, selection or purchasing. Keep homepage discovery distinct from main-product evaluation, utility and editorial intents. The owner's Primary Keyword informs the homepage H1. Derive metadata and mapped SEO targets through the optional Keyword Pack and research.

Authored blog articles must help this audience evaluate or understand the products; forum/review content is supplied by the owner and preserved. General game mechanics, patches, requirements and updates are eligible only when their verified implications help those product decisions. For example, a documented platform requirement can support a compatibility guide; unrelated patch summaries, gameplay walkthroughs and entertainment topics do not qualify. The `game-questions-updates` intent bucket has this same product-relevance restriction and is not a quota for general gaming news. Reduce topic counts with a recorded shortfall when distinct, relevant topics are insufficient.

During the existing intent/editorial review, reject unrelated topics and confirm natural contextual links to the appropriate commercial product and related useful articles. Use descriptive, varied anchors and appropriate CTAs; preserve separate URL intents. This relevance review requires Codex judgment: the scripts check structural contracts and cannot establish commercial relevance from keyword strings alone. The policy does not trigger a rewrite of existing site content.

## Sequence

Follow the owner-input and staged-readiness rules in the [SEO intake procedure](seo/seo-research-workflow.md#intake-keyword-authority-and-review-boundaries). Check the H1 idea, metadata guidance, product reference evidence and authorized checkout targets separately. The native forum-enabled pack requires forum records before a complete plan and installation can pass.

1. Reuse the conversion audit and approved scope. Fill the existing conversion intake from supplied business facts; resolve essential unknowns. Obtain game facts from current primary sources where needed, recording URL/document reference and verification date once. Codex writes articles; request owner-supplied forum/review material when missing, never generate substitutes. Set `approval.conversionRequested` and `contentWorkflow.enabled` for this conversion only. Source references are not permission to invent vendor claims.
2. **Before changing the origin**, run `npm run content:prepare -- --config <filled-intake.json>`. It rejects the master origin, placeholder identity, missing evidence/prices and invalid/future dates. It creates `.content/<input-hash>/brief.json`, `plan.json`, `pack.json`, and `NEXT.md`. A repeated call resumes the same run without overwriting drafts, including after the new origin is configured. Changed inputs create a new run; reuse still-valid reviewed batches consciously.
3. Complete the mandatory docs/seo research procedures, record docs/seo/research-evidence.json and the four research/planning documents, then write `plan.json` once. Research evidence is checked before plan/check/install for new targets. Assign a distinct primary keyword, intent ownership key and reader question/value to each URL before prose. Run `npm run content:plan -- --run <run-directory>`. Use its `planHash` in `pack.json`. Subsequent checks reject prose tied to an outdated plan. Editorial judgment must merge competing intents even if their keyword strings differ.
4. Author commercial copy and English articles in resumable batches; import only owner-supplied discussions using the exact-source contract below. Keep completed reviewed rows and record fact/source IDs. The 8–12 article range is subordinate to distinct supported topics; explain shortfalls, never pad. Forum inventory follows supplied records, not a generated-starter quota.
5. Finish the English factual/editorial pass, then translate the finished rows to Spanish, German and French in batches. Preserve every fact ID, plan/price, condition, limitation, date, slug and link destination. Translate complete paragraphs/headings/metadata; retain proper names/UI labels where appropriate. Do not use English fallback as a completed locale. Review flags record an actual Codex review, not a claim of independent human certification.
6. Run `npm run content:check -- --run <run-directory>`. Correct confirmed failures; do not relax checks merely to pass. Then configure the **new** site origin as part of the authorized conversion and run `npm run content:install -- --run <run-directory>`. Installation refuses the original/master origin. It checks the complete pack again, backs up the prior eight editorial data modules under `.content/backups/`, writes the four blog/four forum TS modules with existing export names/types, and writes the small approved provenance/gate file `content/manifest.json`. Reinstall refuses to overwrite detected manual editorial edits; reconcile them into the reviewed pack first.
7. Integrate commercial rows once into existing native data/components using the map below. The installer deliberately does not regex-rewrite mixed commercial source code. Preserve the current component design and shared config references. Refresh `productRelatedBlogSlugs` and `productRelatedForumSlugs` for every product. Native blog/forum hubs continue enumerating their existing typed arrays; no new routing system is introduced. Preserve/migrate valuable existing URLs if converting an established site rather than a fresh clone.
8. Run `npm run typecheck`, `npm run build`, `npm test`, `npm run validate`, and `npm run validate:runtime`. With a manifest, the build checks approved headings/paragraphs/CTAs, locale route inventories, editorial source hashes and product related-content references in final HTML. Missing translations/integration block the build. The existing validator checks rendered canonical/social metadata, sitemap, schema, hreflang, links/assets and old-template policy. Run the historical `part15-verify.mjs` only for MW4 maintenance; its fixed MW4 expectations are not conversion acceptance criteria. No deployment or indexing action is implied.

If inputs change after switching the origin, prepare the revised intake with `--from-run <prior-run-directory>` so the original master identity remains explicit. This creates a fresh input hash without deleting previous drafts; reuse still-valid copy after reviewing the changed facts. An unrelated prior run cannot authorize the target.

## Handoff between prompts

- **Prompt 1:** Save the filled intake, native run path, research, reviewed batches, completed integration, pending changes and exact blockers. Keep sensitive intake notes, referral records and progress in ignored `.content/`. The saved handoff is `.content/handoff.md`. Prepare the native brief before switching origin when inputs allow it. If forum records are still pending, stage dependent edits and preserve the origin/manifest pair until the pack can install. Treat a build of the inherited master as baseline evidence only.
- **Prompt 2:** Add the owner's forum source IDs and approved record hashes to the saved intake. The revised intake produces a new input hash. Prepare the revised run, use `--from-run` if the origin already changed, and carry forward only reviewed rows that still apply. Reconcile the added forum routes with the plan and research evidence, rerun `content:plan` and `content:check`, integrate verified values, set the new origin and install the completed pack. Keep old-game reviews out of any target preview while the owner review import is pending.
- **Prompt 3:** Import exact owner review records into `src/data/reviews.ts` and verify product associations and counts. Reconcile changes with reviewed commercial copy if the archive heading, metadata or planned links change. Update the handoff with actual import status and checks.
- **Prompt 4:** Run final checks on the completed clone and report readiness. Stop any conflicting community record at its import gate if it contains prohibited public branding. Get an owner decision on that record rather than editing the quotation.

## Brief facts and source contract

`docs/conversion.example.json` includes the disabled workflow configuration. A real conversion supplies `contentWorkflow.publicationDate` (actual ISO date, not an inherited master date), `sources`, `gameFacts` and the current/rebranded shared forum category names. For each enabled product, `facts.evidence` contains source IDs; `features`, `requirements`, and `limitations` remain arrays of confirmed strings. Prices/durations are taken from product plans. Unknown requirements remain unknown; skip an unsupported topic or explain what buyers must confirm.

A source is `{ "id": "vendor-sheet", "kind": "vendor", "reference": "URL or supplied document reference", "verifiedOn": "YYYY-MM-DD" }`; kinds are `owner`, `vendor`, `official-game`. Each game fact is `{ "id": "game.platforms", "text": "Confirmed statement", "sourceIds": ["official-game-page"] }`. The script assigns product IDs such as `elite.features.0`, `hwid-spoofer.requirements.0`, and `elite.plan.monthly`. `game.identity` references the reserved confirmed-intake source. Do not use identity as evidence of functionality.

Keep `seoIntake`, `referral.urls`, `contentWorkflow.mainProductReferenceUrl` and the optional `mainProductSummaryReference` in the saved intake. These fields record owner inputs for Codex. Map the reference or fallback summary to an actual `contentWorkflow.sources` entry and the main product's `facts.evidence` IDs. Apply checkout URLs in `src/config/checkout-redirects.mjs` and SEO decisions in the existing content and metadata sources.

Use the current template as evidence for unchanged utility names, prices, durations, plans, facts and media. Cite the source files and baseline commit in the intake. Avoid claiming new-game compatibility from inherited utility content. Use the required product reference for the main product or record the owner summary if access was blocked. Use the four separately supplied referral URLs only in checkout routing and its generated fallback.

Research unsupported game/version/patch details before asserting them. Questions about status may explain how to confirm status without claiming a product is currently working, undetected or safe. No invented experiences, testimonials, guarantees, reviews, ratings or comparison results. Do not clone the previous site's writing and substitute a game name. Write useful answers with varied structure; remove repetitive introductions, keyword padding and generic filler in one focused final pass.

## Plan and draft shapes

`plan.json` has `inputHash`, `pages`, and optional `shortfalls`. Each page row has:

```json
{
  "path": "/blog/descriptive-game-question/",
  "kind": "blog",
  "primaryKeyword": "specific relevant query",
  "intent": "informational",
  "intentKey": "one-distinct-reader-need",
  "readerQuestion": "The concrete question answered here",
  "uniqueValue": "What this URL adds beyond the commercial page and other articles",
  "factIds": ["game.identity"],
  "links": ["/cheats/", "/blog/another-related-topic/"]
}
```

Kinds: `commercial`, `blog`, `forum`. Intent buckets: `informational`, `research-comparison`, `commercial`, `features`, `compatibility`, `setup-troubleshooting`, `game-questions-updates`. Cover the buckets supported by facts; do not invent a news update to fill a bucket. A product page owns its purchase intent; an article should answer a different buying/setup/feature question. Compare only substantiated differences. Imported discussions retain the supplied reader questions and text; plan only surrounding site-controlled navigation/resources.

`pack.json` contains `inputHash`, checked `planHash`, `reviews`, and `locales.en/es/de/fr`. Each locale has complete `commercial`, `blog`, `forum` arrays matching plan routes. Each row has `factIds` referencing its topic's planned facts. Reviews require `facts`, `distinctIntents`, `originalWriting` and `translations.{en,es,de,fr}` all true after review.

| Row | Fields / native adapter |
| --- | --- |
| Commercial/support/hubs | `path`, `title`, `h1`, `metaDescription`, `sections: [{heading, paragraphs: []}]`, `cta: {label, href}`, `factIds`. Include homepage, catalog, all four product pages, FAQ, support, about, blog index and forum index. Two useful sections are a structural minimum for commercial/support pages; index hubs need one existing intro section. This is not a word-count target. Hubs also get distinct keyword/intent ownership. |
| Blog | Existing `BlogPostFull` fields: `slug`, `title`, `h1`, `tag`, `desc`, `metaTitle`, `metaDescription`, `date`, `readTime`, authorized `image`/`imageAlt` and dimensions, `body`, optional `featured`; plus workflow `factIds`. Body uses existing `h2`, `h3`, `p`, `ul`, `table`, `cta` blocks. At least two H2s/three substantive paragraphs; H3 follows H2. Write as much as the answer warrants, without padding. |
| Forum | Import owner-supplied records using `authorship: "imported"`, `authorType: "Person"`, approved owner source IDs and `importedForumRecords` exact hashes. Preserve original title, author, publication date, body and replies, declare original language, and never invent scores/ages. Generated editorial rows are legacy script support, prohibited for new targets. |

Keep metadata concise (at most 60 title characters and 155 description characters), unique within the locale and natural. Existing layout/title helpers remain in use; build verification catches commercial clipping that changes the approved text. For blogs, use varied informative titles/H1s, accurate images/alts, a relevant product link, a related article link and a contextual CTA block. Every article also needs a contextual inbound link from another article; existing hubs ensure listing discovery. Product related-content blocks must point to the new topics.

Codex writes original article wording. All forum discussions/replies and reviews come from the owner; do not rewrite them for keyword/link placement. Localize surrounding interface and site-controlled resource links through existing helpers. Legacy editorial-starter code and historical references below do not authorize generation. New-target checks/install reject non-imported forum rows.

## Commercial integration map

| Native source | What to place / preserve |
| --- | --- |
| `src/i18n/en.ts`; `src/i18n/dictionaries/{es,de,fr}.json` | Homepage and main/utility marketing sections, catalog cards, shared navigation/support/about/FAQ UI. Keep existing dictionary structure and link helpers. |
| English `pageSeo` in `en.ts`; `src/i18n/pageSeo/{es,de,fr}.json` | Approved unique page metadata for each commercial path. |
| `src/data/products.ts` | English product facts/features/requirements/limitations, overview/body/acquisition copy and related blog/forum mappings. Preserve config keys/media selection; update from verified inputs only. |
| `src/data/products/locales/{es,de,fr}.json`; `src/data/products/exportCopy.ts` contract | Translate all corresponding long-form fields and positional arrays. Use the existing bundle shape. |
| `src/data/catalogCopy.ts`; `src/data/catalogCopy/locales/{es,de,fr}.json` | Product-selection/comparison copy and catalogue CTAs; no unsupported superiority claims. |
| `src/data/faq.ts`, `src/data/faq/locales/{es,de,fr}.json` | Useful buying/compatibility answers consistent with approved facts; preserve contextual FAQ relationships. |
| `src/data/productPricing.ts`, identity/checkout/catalog config | Conversion business inputs remain authoritative. Prose may describe confirmed values, not introduce a separate price or referral system. |

Commercial pack sections are final approved wording to place into suitable existing fields/sections; their paragraph/heading hashes must appear in built HTML. Do not add another generic rendering layer or redesign pages to avoid mapping existing fields. Build checks don't prove visual quality; run scoped browser QA when available.

## Gates, persistence and limits

`.content/` is ignored, outside src/public and contains resumable drafts/backups. `content/policy.json` records the original template origin: keep that value during rebranding. The original MW4 origin can build without a manifest; the current The Isle site already uses one. A new origin without a manifest fails the build. New targets also require the checked research receipt described in the SEO workflow. `content/manifest.json` is a small tracked provenance contract with source references, plan, review markers, editorial file hashes and expected localized text hashes/metadata; it is outside public/dist. Preserve it on converted sites. Build/source freshness checks include the policy and active manifest. Do not copy an old site's manifest into a different clone to bypass generation; its target identity is checked.

Automated checks reject incomplete locale inventories, whole English bodies and repeated long English paragraphs/descriptions, duplicate primary keywords/intent keys, duplicate metadata, unsupported price figures, invalid/future dates, invented forum authors/counters, broken planned links, missing contextual CTAs and high local prose overlap. These are checks, not proof of truth, global originality, translation fluency, search demand or semantic intent separation. The agent must review those questions against evidence once per batch. Generic `npm run validate` remains the production-output check; no generation/publishing step is hidden in a build.

## Historical conversion notes: forum removal (superseded by restoration)

The owner requested removing the forum and replacing it with /reviews/. The current reviewed intake sets contentWorkflow.forumEnabled to false and adds /reviews/ through additionalCommercialPaths. This sets the forum target to zero, excludes forum source generation, rejects generated forum routes during build and removes the requirement for product-to-forum relationships. Default conversions retain the original forum workflow. The current content run is .content/411d97505cee1f8d; prior runs remain historical backups. Ten replacement reviews are owner-supplied source material, with publication permission confirmed in the task; their original English text is stored in src/data/reviews.ts. The commercial review-page interface and metadata are reviewed in all four languages. No review submission backend, purchase verification or fabricated engagement is introduced.


## Historical conversion notes: owner-supplied forum archive restoration

The owner subsequently restored the forum and confirmed that fifteen supplied discussions and replies were genuine and authorized for republication. Current run: .content/7cd21193b2909434. The intake explicitly declares importedForumSourceIds and importedForumRecords. Imported rows must match their source-record hash exactly, retain supplied dates, have zero unprovided scores/ages, and count only supplied replies. Original English quotations are retained across localized interfaces; this declared imported mode does not bypass translation checks for generated editorial copy. Imported Person authors are checked against the approved manifest; ordinary generated starters still require Organization authorship and disclosure. The build verifies all reply paragraphs. Original-language schema exceptions apply only to the declared DiscussionForumPosting route. The ten reviews remain unchanged.

## Current SEO refinement

The active reviewed run is now `.content/187230cf9269e6f7`, prepared from the forum-restoration intake with an additional owner-confirmed checkout/referral fact. It revises commercial metadata, About/Support copy, guide metadata/headings and contextual links across all four locales. The source discussions, replies, reviews, product facts, prices and referral mappings remain unchanged. Install/check this run when maintaining the current copy; earlier runs are historical snapshots, not the latest approval contract.

