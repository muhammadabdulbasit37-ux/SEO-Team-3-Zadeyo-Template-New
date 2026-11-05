import fs from 'node:fs';
import { checkCloudflareRoutes } from './cloudflare-checks.mjs';
import { withLocalServer } from './qa-server.mjs';

const config = JSON.parse(fs.readFileSync('.astro/validation-config.json', 'utf8'));
const results = { checks: 0, pages: 0, assets: 0, externalRequests: 0 };
await withLocalServer(port => [
  'node_modules/wrangler/bin/wrangler.js', 'dev', '--local', '--config', 'wrangler.toml',
  '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', '0',
  '--infer-origin-from-routes=false', '--persist-to', '.astro/wrangler-state',
  '--log-level', 'error', '--show-interactive-dev-session=false',
], { WRANGLER_SEND_METRICS: 'false', CI: 'true', BROWSER: 'none', CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'false' }, async origin => {
  Object.assign(results, await checkCloudflareRoutes(origin, config));
});
fs.writeFileSync('.astro/part41-cloudflare-results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({ ok: true, runtime: 'local Wrangler/workerd with real ASSETS binding', ...results }, null, 2));
