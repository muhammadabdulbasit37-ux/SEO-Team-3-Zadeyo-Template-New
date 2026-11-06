# Validation and daily conversions

Run from the repository root with the locked npm dependencies installed:

```text
npm run typecheck
npm run build
npm test
npm run validate
npm run validate:runtime
node scripts/part15-verify.mjs
```

The first five commands are reusable. The last is a historical MW4-specific regression check; keep its content expectations only while maintaining this MW4 site. `npm run test:local-hosts` remains an alias for its original three tests. `typecheck` uses `@astrojs/check`, not plain `tsc`, so Astro imports/templates are checked correctly. No lint script is installed. Current remediation and browser/Cloudflare evidence are recorded in [part41-report.md](part41-report.md); Part 4 is historical.

`build` never deploys or submits URLs. `validate` is read-only and sends no network requests. `validate:runtime` first validates the output, starts and stops a temporary Node preview, and sends requests only to that local server with redirects disabled. It does not contact affiliate checkout or the production origin. A sandbox may require permission to connect to the temporary loopback port. It does not emulate Cloudflare's asset binding or edge cache.

IndexNow is separate: `npm run indexnow:submit` validates output, then explicitly submits when `INDEXNOW_KEY` is present. Run it only when a task authorizes indexing submission. Never use `npx wrangler deploy` as a check. Neither command was run in Part 2.

## Source of expectations

`astro.config.mjs` writes `.astro/validation-config.json` at build completion from `src/config/validation.ts`. This local manifest imports the site's actual origin, locales, page SEO, blog/forum slugs, enabled catalog products, prices, featured plans, checkout destinations and redirect maps. It is not copied into `dist` or deployed. It contains no secret environment values.

The manifest also records a content fingerprint of source/config/scripts/public assets. `validate` fails if those inputs changed after the build; rerun the build instead of trusting stale HTML. Documentation changes do not invalidate it. File line endings are normalized for the fingerprint.

For each new clone:

1. Fill in `docs/conversion.example.json` as intake; it has no runtime loader. Implement the actual identity/content changes in the paths it maps.
2. Update `validationPolicy.forbiddenReferences` in `src/config/validation.ts` to include the previous site's brand, game-specific phrases and domain. Keep intentional migration aliases in server configuration; do not exempt them from rendered-content checks.
3. Preserve `src/config/protected-media.json` for unchanged utility artwork. Update hashes only for explicitly authorized replacements. Do not regenerate a baseline merely to make failing hashes pass.
4. Add page SEO entries for new static routes; dynamic blog/forum and enabled product expectations derive from their source data. Keep translated slugs complete across configured locales.
5. Rebuild, test and validate. Review warnings as well as errors. Keep production deployment and indexing as separate authorized actions.

## What is checked

| Area | Local checks |
| --- | --- |
| Output inventory | Expected routes exist; unexpected HTML fails; no fixed MW4 page count or brand in the reusable script |
| Links/assets | Local anchors, fragments, image/srcset/preload/poster URLs, linked CSS/scripts/fonts, CSS asset URLs and emitted module imports exist; internal redirect links are reported |
| Metadata | One title/description/H1; expected localized title/description; duplicate titles/descriptions within a locale; matching social metadata; correct HTML language |
| Canonicals | One self-canonical at the configured origin, including file routes; matching `og:url`; schema page URLs agree |
| Sitemap/robots | Every configured indexable page is listed, no noindex/unexpected/redirect URL is listed, no duplicates, robots allows indexable routes and disallows checkout, sitemap origin agrees; blog lastmod agrees with article dates |
| Hreflang | Configured locale/x-default targets, generated/indexable targets, reciprocal HTML links, matching sitemap alternates; no alternates on noindex pages |
| Structured data | JSON syntax/context/typed roots; common article/forum author/date/content fields; breadcrumb order/locale; FAQ questions/answers; product identity/price/currency and offer URL's selected plan |
| Commerce | Correct product checkout path, rendered plan options/prices, featured-plan default link; unit tests exercise actual client click/keyboard code and mobile link synchronization |
| Images/build transforms | Required attributes/dimensions, oversized-image warnings, 20 configured protected-file hashes, missing loader/import URLs and unresolved deferred markers |
| Template leftovers | Configured former-brand phrases and unresolved content tokens in generated HTML |
| Runtime | All configured page statuses, path redirects, locale checkout aliases/plans, forum filter cleanup, real 404/noindex responses and malformed request survival on Node; separate in-process Worker tests cover redirects/cache ordering/404s |

Tests include a passing fixture on a different domain with a different locale set/page count, then deliberately break links, fragments, assets, canonicals, indexability, JSON-LD, language, hreflang, robots, sitemap entries, redirect loops and CSS references. These failures prove the checks detect defects; they are not assertions that merely mirror current MW4 output.

This is a project validator, not a complete schema.org vocabulary validator, Rich Results Test, JavaScript browser test, external-link crawler or accessibility audit. It cannot establish vendor facts, translation fluency, actual checkout delivery, live Cloudflare behavior, Core Web Vitals, rankings or Search Console status. See the defect register for outstanding verification.

## Research and link-graph integration

New conversion origins require `docs/seo/research-evidence.json`, the four research/planning documents and a manifest research receipt through the native content commands. The build rechecks target identity, plan agreement and document hashes. The original template origin and explicitly named current The Isle legacy origin retain their existing provenance; this is not an exemption for future targets. See [research contract](seo/seo-research-workflow.md). The source fingerprint now includes the checked research inputs when present, while final reporting documents remain editable after a build.

Source validation configuration enables `scripts/internal-links.mjs` within `npm run validate`. The CLI writes `.astro/internal-links.json`: inventory, directed edges, per-page total/contextual counts, same-locale homepage reachability, findings and bounded local lexical suggestions. Orphans/unreachable indexable pages and unintended cross-locale links fail; underlinked commercial/hub pages and redundant/generic contextual anchors are review warnings. Existing broken-target/fragment/redirect/old-reference checks remain active. Shared navigation does not satisfy contextual counts or suppress suggestions for useful contextual links. Neither article link counts nor lexical scores are build quotas. See [link analysis limits](seo/internal-linking-workflow.md).

Both systems check evidence structure and output behavior, not source truth or semantic relevance. Sources still require agent inspection and competitor/topic review; no verifier can prove that an asserted observation was actually made. Supplied community text is never edited, and graph suggestions exclude the site's marked original-post/reply/review bodies.

## Browser and Cloudflare checks (local smoke suites)

After the core checks, run `npm run validate:browser` and `npm run validate:cloudflare` for the pre-push suites added in Part 4.1. Both first validate the build. The browser command needs an installed Google Chrome; `QA_BROWSER_CHANNEL=msedge` can select an installed Edge instead. It launches an isolated headless profile, checks homepage/product layouts at 1440/768/390 CSS pixels, clicks localized desktop/mobile navigation, exercises both plans, and checks desktop/sticky mobile purchase clicks. Local checkout responses are fetched with redirects disabled, then intercepted with a local confirmation page. Partner destinations are never contacted. Screenshots/results remain under `.astro/browser-qa/`.

The Cloudflare command uses pinned local Wrangler/workerd with **the existing production config** and real static assets, without remote bindings or telemetry. Its configured build hook runs the ordinary build again. It checks all page statuses, routing, checkout plans, response headers, custom 404 bodies, emitted assets and local cache ordering. Process trees are stopped after success or failure. Loopback/process permissions may require execution outside the sandbox. It never invokes `wrangler deploy`, remote mode or a tunnel. Local compatibility is stronger than a mocked Worker test but cannot certify dashboard settings, DNS/TLS, live cache contents, deployed environment values or affiliate checkout fulfillment.

Use `npm audit --json` for current dependency advisories; see [dependency-review.md](dependency-review.md) for the Part 4.1 applicability assessment and fixed versions. No vulnerability waiver is built into validation. Browser checks are scoped smoke tests, not a full accessibility audit, Lighthouse or field performance measurement.

## Pages fallback and audit regressions — 2026-11-06

`npm run validate:pages` first validates the current build, then starts strictly local `wrangler pages dev` with a small ignored configuration under `.astro/pages-qa/`. Its own package root prevents Wrangler from inheriting the parent Worker’s production route origin during local tests. That fixture imports the actual `functions/_middleware.js`; it does not copy another routing implementation or change the production Worker configuration. The Pages middleware delegates to the Worker while adapting internal asset requests to the incoming origin. Both local Cloudflare suites use `scripts/cloudflare-checks.mjs` for the same page, alias, query, cache, custom-error and asset assertions. Pages evidence is `.astro/pages-qa/results.json`. Run the Worker suite before browser checks: its build hook rebuilds `dist`.

The source fingerprint now includes `workers/` and `functions/`, so routing edits invalidate stale output. Regression tests cover all checkout plan/locale forms through Pages, query-preserving static fallbacks, original-origin asset access, real error-document statuses and actual RSS enclosure byte lengths. Browser navigation uses stable `data-primary-nav`/`data-mobile-nav` markers so its tests do not depend on English accessible labels.

Shared CSP is generated from `src/config/security-headers.mjs` for Node, Worker, Pages and static assets. It permits the existing automatically injected Cloudflare beacon at its exact script/prefix paths and keeps collection same-origin. No beacon/token is added by the application. `_headers` declares shared security headers once instead of repeating them on overlapping resource rules. Static checkout rules are omitted from `_redirects`: the runtime handles them, or the existing noindex HTML fallback preserves the query with JavaScript. A purely static, no-JavaScript host cannot forward an unknown incoming plan query; the configured server handler is required for full parity.

The historical live audit remains a snapshot. Repository-side resolution, final evidence and required post-deployment checks are recorded in [the audit-fix report](seo/audit-fixes-2026-11-06.md). No validation command deploys, submits indexing requests, follows partner checkout or certifies the deployed Cloudflare account.

## Cloudflare Pages Git build

Use the [Pages Git integration for Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/#deploy-via-the-cloudflare-dashboard) with the repository root, production branch `main`, build command `npm run build` and output directory `dist`. The root [Node version file](../.nvmrc) selects Node 24. Check any dashboard `NODE_VERSION` override against the [Pages build image settings](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions). Astro requires Node 22.12.0 or newer.

Keep `functions/` at the project root and let Pages bundle it. The built `dist/_routes.json` sends page requests through Pages Functions and lets Cloudflare serve static images and bundled assets directly. The root `wrangler.toml` describes the separate Workers deployment and leaves Pages production settings in the dashboard.

After the production build, run `npm run validate:pages` to verify Pages Functions locally. Confirm the dashboard settings before connecting a new clone. A push to the production branch can trigger a deployment if Git integration is already enabled.

The shared handler sends requests from noncanonical public hosts, including Pages preview URLs, to the configured HTTPS domain. Attach the new site's custom domain before relying on a public URL for final verification. Use local Pages testing to inspect the build before the domain is attached.
