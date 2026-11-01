# CHEATS FOR THE ISLE

Final local status: **READY FOR DEPLOYMENT**. See the [current pre-push release audit](docs/pre-push-audit-2026-11-01.md) for verified local readiness, fixes, PASS / NOT TESTED results and remaining live checks. Earlier interface and media history remains in the [review list/navbar update](docs/reviews-list-update.md), [forum restoration](docs/forum-restoration.md) and [media release audit](docs/the-isle-deployment-readiness.md).

Commercial Astro static website for **cheatsfortheisle.com**, supporting unprefixed English plus Spanish, German and French.

The latest revision is the [SEO and content improvement pass](docs/seo-improvements-2026-11-01.md), with an [88-entry metadata inventory](docs/seo-metadata-inventory.csv). The report records local checks; deployed status must be verified separately.

The four products are The Isle Cheats, HWID Spoofer, UGC and Skin Changer. Product data, pricing, checkout mappings and localization stay in the existing shared architecture. Start with [AGENTS.md](AGENTS.md), [architecture](docs/architecture.md), [keyword map](docs/the-isle-keyword-map.md) and the [media manifest](docs/media-replacement-manifest.json). Historical master reports remain provenance, not current product specifications.

## Local development

Node must satisfy package.json (>=22.12.0). Use the locked npm dependencies.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

## Production checks

```sh
npm run content:check -- --run .content/187230cf9269e6f7
npm run typecheck
npm run build
npm test
npm run validate
npm run validate:runtime
npm run validate:browser
npm run validate:cloudflare
```

The content run is a local resumable workspace; content/manifest.json holds the installed approved provenance. Follow [the native content workflow](docs/content-workflow.md) when changing reviewed editorial data. The build optimizes gameplay images, regenerates static routing files and verifies output. It does not generate copy, submit URLs or deploy. Browser checkout is intercepted locally; Cloudflare checks use strictly local Wrangler/workerd and ASSETS.

`npm start` serves dist on port 4173 by default. The primary hosting configuration is Cloudflare Workers with static assets. Commit, push, deployment, DNS and IndexNow submission require explicit authorization and are not part of local checks.

The supplied gameplay/menu screenshots retain their original content and aspect ratios. Utility media, existing emblem and favicons are protected. No separate logo or favicon artwork was supplied in the media handoff.

The forum is restored at /forum/ with fifteen supplied discussions and 115 replies; /reviews/ remains a separate read-only collection. Ten owner-supplied reviews appear with their original wording, ratings, products and dates. No review submission form or voting system is provided. Header order is Products, Blog, Forum, Reviews, Support. FAQ remains accessible through the footer. See docs/forum-restoration.md for current validation.
