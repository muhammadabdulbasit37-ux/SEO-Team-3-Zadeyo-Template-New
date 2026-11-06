# Required SEO research workflow for game conversions

This procedure is mandatory under [AGENTS.md](../../AGENTS.md) for every authorized new-game website conversion. The root ten-step sequence is authoritative; these sections describe responsibilities within those steps rather than a separate execution order. It governs research quality and review; it does not start a conversion, change the design, authorize publishing, or guarantee rankings. Preserve the four products, verified facts, owner-supplied community content and other root safeguards. Follow the complementary [internal linking workflow](internal-linking-workflow.md) throughout these phases, including baseline audit, site-wide planning, graph analysis, improvement and production validation.

This workflow owns game-specific research and native planning. Use the [repo-local skills](../skills.md) for architecture, drafting, editorial review and visual QA. Use the existing technical SEO and readiness checks for verification.

## Intake, keyword authority and review boundaries

Use [Prompt 1](../prompts/01-convert.md) for the owner intake. Record the supplied domain, brand, support email or fallback, homepage H1 idea, main product name, required reference, optional Keyword Pack and four distinct referral URLs in the target-specific intake. Derive the game from the supplied identity and reference, asking only if ambiguous. Codex independently owns the research, article topics, competitor analysis and linking plan.

Use `game` for game identity, `site` for domain/origin and brand, and `contentWorkflow.sources` for dated evidence. Record the H1 idea as an editorial input. Align the independently selected per-URL SEO targets across `keyword-map.md`, native `plan.json` and research evidence. The example intake is a working record for the clone. Integrate confirmed values into the runtime sources separately.

Use the supplied keyword idea for the homepage H1 and natural equivalents in Spanish, German and French. Use the optional Keyword Pack for supplied title/meta guidance and research any missing entries. With no pack, independently derive the metadata from intent and search evidence. Keep homepage discovery and `/cheats/` evaluation/purchase distinct in titles, headings, body and supporting queries. Resolve conflicts with the pack by documenting the evidence and flagging any material ambiguity.

Use the required reference as the sole source for main-product features, prices, plans and durations. If blocked, use the owner's summary once supplied and record it as fallback provenance. Preserve template utility facts and media. Keep reference sources in intake/provenance. Configure only the four separately supplied referrals and verify them via local redirects and plan checks without contacting partner checkout.

Research, keyword/topic planning, translations, link opportunities and QA are Codex's responsibility. Finish independent work while facts, approvals or community submissions are pending. Native `content:prepare` currently requires confirmed four-product facts/prices and approval inputs, and plan/check/install enforce complete inventory contracts: conduct independent research or retain drafts before those gates if necessary, rather than weakening them. Missing forum/review material is requested at the relevant import/release stage, not imposed as a prerequisite to unrelated research; never clone old-game submissions, disable the forum silently or call incomplete community pages production-ready.

Use the [four-prompt workflow](../../AGENTS.md#four-prompt-workflow) in the same clone. Prompt 1 converts or stages the work. Prompts 2 and 3 import owner-supplied forum threads and reviews. Prompt 4 independently verifies and repairs the completed site against the saved intake and generated evidence. Only record approvals and review checks actually given or performed.

During review, compare the homepage H1, Keyword Pack metadata and checkout destinations separately with their respective intake inputs. Native validators cover plan/map consistency, evidence hashes and output links.

## Discovery and verified inputs

Inspect the current checkout/product facts, routes, locales, content inventory, media, SEO ownership and validation commands. Reuse the conversion audit and confirmed owner inputs. Record missing business facts; competitor claims cannot establish our capabilities, compatibility, availability, safety or detection status.

Read [content-workflow.md](../content-workflow.md) and prepare the native brief before changing the origin. Keep the source-derived URL inventory and valuable existing URLs. Do not copy old-game research or approvals into the new site's conclusions. Reuse unchanged utility evidence only after confirming its applicability and freshness.

## Game, competitor and keyword research (steps 1–2)

Research the exact game, product context and supported locales before selecting final targets. Cover primary/secondary commercial terms, transactional searches, long-tail and informational queries, feature questions, setup/problems, semantic variants, related entities, competitive opportunities and emerging terminology. Terms such as cheats, hacks, ESP, aimbot, wallhack and radar are candidates to investigate, not predetermined winners or permission to claim unsupported features.

Inspect actual Google results for priority queries when accessible. Record query, research date, language, intended market, actual engine/tool, source URLs and observed result/page types. Identify organic results separately from ads or other features. Search snippets alone do not establish a page's full contents. If the tool uses another engine or its engine is unknown, label that evidence accurately; do not call it verified Google analysis.

Compare at least **five relevant competitors** where sufficient legitimate results exist, using individual ranking pages as evidence. Include relevant commercial and supporting informational pages. Examine intent, titles/descriptions, heading structure, content depth, product landing pages, FAQs, internal links, feature explanations, commercial positioning, trust/usability signals and original-value gaps. Record which details were actually inspected. Do not copy wording, layouts or proprietary material, or treat a visible badge as proof of trustworthiness. Explain shortfalls when fewer competitors or pages are accessible; never pad the comparison with irrelevant sites.

For English, Spanish, German and French, investigate local terminology and result intent where evidence permits. Record market differences and confidence; avoid literal keyword translation when local usage differs. Missing localized evidence stays unknown and resulting choices remain provisional. Keep proper product names and supplied original-language quotations accurate.

Record volume, difficulty or trend numbers only from an identified accessible dataset/export with date, market, period and units/scale. Search Console impressions are not monthly search volume; a few search results are not quantitative demand data. Distinguish observations, owner facts and reasoned hypotheses. With unavailable tools/web access, document missing evidence and a provisional map; do not claim comprehensive live research or conceal the gap.

Prioritize thorough, actionable research over speed. Expand query coverage until priority decisions and important gaps are explained; a token query sample is insufficient. Reuse valid observations and completed batches, and stop repeating searches that add no insight. Never claim exhaustive market coverage from limited access.

## Keyword mapping and topical architecture (steps 3–4)

Cluster by reader need and result intent, not spelling alone. Classify primary intent as informational, commercial investigation, transactional or navigational; add setup/troubleshooting and feature-specific labels where useful. Prioritize by game relevance, verified product fit, intent, evidence of demand, reasoned commercial value, competitive opportunity and ability to provide unique useful answers. Explain qualitative priority decisions; high volume alone is insufficient.

Map each important cluster to one primary URL or section before drafting. Typical roles are:

| Destination | Role to verify against evidence |
| --- | --- |
| Homepage | Broad primary commercial entry intent |
| Main cheats product | Transactional, product-specific features, requirements and plans |
| Existing feature sections | Related feature questions without unnecessary extra URLs |
| HWID Spoofer / Skin Changer / UGC | Each verified utility's distinct purpose and buyer needs |
| Guides and FAQs | Distinct informational, comparison, setup or troubleshooting answers |
| Forum and reviews | Accurate discovery of supplied material only |

Document primary/secondary targets, locale/market, intent, reader question, unique value, supporting fact/evidence references, intended CTA and contextual links. Review overlapping homepage/product/article targets for cannibalization. Consolidate overlapping plans or use sections where appropriate; do not create doorway pages, trivial keyword-variant URLs or pages without enough original value. Preserve or deliberately migrate established URLs when consolidation changes routes. Do not rewrite supplied forum/review text to insert keywords.

Use the existing native plan fields: `path`, `kind`, `primaryKeyword`, `intent`, `intentKey`, `readerQuestion`, `uniqueValue`, `factIds` and `links`. Translate research classifications into supported native `intent` values; do not add unsupported enums to satisfy a documentation label. Keep secondary/localized evidence in the research documents. Reconcile these with `plan.json`, run `content:plan`, and perform a semantic intent/factual review beyond the script's structural checks. Follow the converter's applicable approval rules before implementation.

## Content, links, technical SEO and localization (steps 5–7)

Write original game-specific content from the reviewed map through the existing content pack and native source owners. Every important page needs a clear intent and primary cluster, natural secondary coverage, descriptive title, useful description, clear H1, logical H2/H3 structure, meaningful original content, verified product information, relevant links and an appropriate CTA. Include FAQs only when helpful. Use professional first-person commercial language; no density targets, artificial word counts or unsupported claims.

Build a coherent supporting structure around verified features, setup, compatibility, troubleshooting, substantiated comparisons and useful buyer questions. Educational game topics must support product understanding or purchase decisions. Article targets are planning ranges, not authority to mass-produce thin copy. Create a page only for a distinct need with sufficient value.

Make commercial destinations discoverable through navigation and contextual links. Connect related articles and appropriate products using descriptive, varied anchors; identify/fix orphan pages and broken links. Avoid excessive exact-match anchors and artificial linking patterns. Maintain natural localized titles, descriptions and prose with consistent facts and checkout behavior across all four locales.

Use existing Astro SEO ownership and validators for crawlability/indexability, canonicals, robots, sitemap, relevant truthful schema, breadcrumbs, metadata consistency, hreflang, redirects, 404s, duplicate content and internal links. Check images, mobile behavior and JavaScript-rendered visibility where applicable. Preserve protected media and the design system. Avoid competing SEO systems, unnecessary scripts and unsupported schema. For performance/CWV claims, use measured evidence through existing QA tools and distinguish lab results from field data; record unavailable measurements as not tested.

## Graph audit, verification and fixes (steps 8–10)

Before completion, review research freshness and limitations, map/native-plan agreement, priority-intent coverage, overlaps, unique titles/descriptions, headings, contextual links/orphans, canonical/sitemap consistency, schema truth, locale/hreflang correctness, old-game/domain remnants, content quality and factual support. Confirm supplied community content remains unchanged and unduplicated.

Run the root verification sequence for application/conversion changes: `npm run typecheck`, `npm run build`, `npm test`, `npm run validate`, then `npm run validate:runtime`; use existing local browser/Cloudflare suites for relevant release checks. Inspect scripts and side effects first. Fix confirmed in-scope defects and rerun affected checks. Automated success does not establish search demand, originality, translation fluency, live indexing, rankings or checkout fulfillment. Do not declare a site fully optimized without evidence and remaining limitations.

## Reporting and retained evidence (step 10)

For each new conversion, create or update all seven records below with the actual target identity, research dates, tools/sources, confidence, known limits and remaining opportunities. Create these during the conversion, not as fictional research artifacts during template setup. Preserve useful history while clearly marking superseded findings.

| Required file | Minimum useful contents |
| --- | --- |
| `docs/seo/keyword-research.md` | Queries/clusters, language/market, dated source links, observed demand signals, sourced metrics or unknowns, hypotheses and confidence |
| `docs/seo/keyword-map.md` | URL ownership, primary/secondary and localized targets, intent, reader need/value, evidence/fact references, links/CTA, overlap decisions and native-plan agreement |
| `docs/seo/competitor-analysis.md` | At least five relevant competitors where available, inspected URLs/queries, dated observations, page comparisons, opportunities and access/coverage shortfalls |
| `docs/seo/content-strategy.md` | Priorities and rationale, supported topic coverage/gaps, distinct page/section decisions, linking/localization plan, justified shortfalls and missing owner material |
| `docs/seo/seo-validation.md` | Dated command/results and inspected scope, pass/fail/not-tested evidence, semantic review, unresolved issues, live verification limits and next opportunities |
| `docs/seo/internal-linking-strategy.md` | Priority hubs/products, topical relationships, planned contextual source/destination/anchor/placement opportunities, locale mapping and implementation decisions |
| `docs/seo/internal-linking-audit.md` | Measured production graph statistics, incoming/outgoing counts, orphan/reachability/broken/underlinked findings, changes, exceptions and remaining opportunities |

These files support one reviewed native plan; they are not a parallel runtime database. Summarize completed research, implementation decisions and validation honestly. No commit, push, deployment, DNS change, purchase or indexing submission is authorized by this workflow.

## Executable research contract

For future targets, `content:plan`, `content:check` and `content:install` require `docs/seo/research-evidence.json` plus the four research/planning documents above. Preparation remains available before research so the agent has verified business inputs. The commands reject absent research, missing clusters or page ownership, unexplained competitor/locale gaps and unsourced numeric metrics. Installation records hashes in `content/manifest.json.researchReceipt`; the build verifies the record, plan and document hashes. Recheck/reinstall approved packs after changes. Research inputs also participate in source freshness checks; post-build audit/report documents do not.

`content/policy.json` enables this gate for new origins. Its explicit `legacyResearchOrigin` is the current The Isle origin, whose historical manifest predates this contract; `templateOrigin` remains the original MW4 provenance. Neither exemption authorizes a future target to skip research. Do not change exemptions to pass validation. No historical research receipt was fabricated during setup.

Record shape (field descriptions, not completed research):

- `version: 1`, `origin`, `game`, `researchedOn: YYYY-MM-DD`, `status: observed|provisional`, and `limitations: string[]`.
- `sources: [{id, reference, checkedOn}]`. Observed query and competitor source references must be actual HTTP(S) URLs. Name the accessible dataset/export source URL for metrics; retain supplied exports as evidence where available. Never invent observations to populate fields.
- `queries: [{id, query, locale, market, basis: observed|hypothesis, finding, tool?, checkedOn?, sourceIds?, metrics?}]`. Observed queries require actual tool/date/source IDs; hypotheses are explicitly labeled. Each metric is `{value, sourceId, dataset, market, period, units}`. Omit unknown metrics. Record locale coverage or `localeLimitations: {es: explanation, ...}`; unknown market is explicit rather than guessed.
- `competitors: [{url, checkedOn, sourceIds, observation}]`. Compare at least five distinct relevant hosts when accessible. Fewer requires `competitorShortfall` and a recorded limitation. Provisional research requires limitations and must not be reported as fully observed.
- `clusters: [{id, intent, rationale, queryIds}]` and `mapping: [{path, clusterId, primaryKeyword, intentKey}]`. Mapping covers every native plan page once and agrees with its keyword/intent ownership. These records explain relationships; they do not create runtime pages.
- `review: {existingContent: true, newContent: true, semanticIntent: true}` only after actually reviewing both inventories and intent relationships.

The offline gate cannot prove that a URL was inspected, a reported observation is true, a competitor is relevant, or research is comprehensive. The agent must inspect sources through available tools, retain dated evidence, review findings and report inaccessible sources honestly. A provisional record permits explicitly limited work; it never certifies live SERP research. No arbitrary link or metric quota is introduced.
