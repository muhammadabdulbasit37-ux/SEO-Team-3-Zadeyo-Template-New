import fs from 'node:fs';
import path from 'node:path';
import { withLocalServer } from './qa-server.mjs';
import { checkCloudflareRoutes } from './cloudflare-checks.mjs';

const config = JSON.parse(fs.readFileSync('.astro/validation-config.json', 'utf8'));
const fixture = '.astro/pages-qa';
fs.mkdirSync(`${fixture}/functions`, { recursive: true });
// Wrangler locates generated Pages scripts from the nearest package root.
// Give this fixture its own root so it cannot infer the production Worker routes.
fs.writeFileSync(`${fixture}/package.json`, JSON.stringify({ name: 'site-pages-local-qa', private: true, type: 'module' }));
// Isolate the Pages dev configuration from the production Worker's wrangler.toml.
// Import the real middleware instead of copying a second implementation into the fixture.
fs.writeFileSync(`${fixture}/functions/_middleware.js`, "export { onRequest } from '../../../functions/_middleware.js';\n");
const compatibilityDate = fs.readFileSync('wrangler.toml', 'utf8').match(/compatibility_date\s*=\s*"([^"]+)"/)?.[1];
if (!compatibilityDate) throw new Error('Missing production compatibility date');
fs.writeFileSync(`${fixture}/wrangler.json`, JSON.stringify({ name: 'site-pages-local-qa', compatibility_date: compatibilityDate, pages_build_output_dir: '../../dist' }, null, 2));
let results;
await withLocalServer(port => [
  path.resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'dev', path.resolve('dist'),
  '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', '0',
  '--persist-to', path.resolve('.astro/pages-qa-state'), '--log-level', 'error',
  '--show-interactive-dev-session=false',
], { WRANGLER_SEND_METRICS: 'false', CI: 'true', BROWSER: 'none', CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'false' }, async origin => {
  results = await checkCloudflareRoutes(origin, config);
}, { cwd: path.resolve(fixture) });
fs.writeFileSync('.astro/pages-qa/results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({ ok: true, runtime: 'local Pages Functions with real ASSETS and shared handler', ...results }, null, 2));
