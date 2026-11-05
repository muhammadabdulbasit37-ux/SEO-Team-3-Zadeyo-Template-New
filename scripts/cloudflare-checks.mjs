import fs from 'node:fs';
import assert from 'node:assert/strict';

export async function checkCloudflareRoutes(origin, config) {
  const results = { checks: 0, pages: 0, assets: 0, externalRequests: 0 };
  const request = async (path, status, location) => {
    const response = await fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, status, `${path} (Location: ${response.headers.get('location')}): ${await response.clone().text().then(s => s.slice(0, 150))}`);
    if (location) assert.equal(response.headers.get('location'), location, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('x-frame-options'), 'SAMEORIGIN', path);
    assert.ok(response.headers.get('content-security-policy'), path);
    results.checks++;
    const body = await response.arrayBuffer();
    if (status === 404) assert.match(new TextDecoder().decode(body), /<h1[ >]/, 'Custom 404 body must survive binding canonicalization');
    return response;
  };
  for (const path of Object.keys(config.pages)) {
    const error = path === '/404.html' || path.endsWith('/404/');
    const response = await request(path, error ? 404 : 200);
    assert.match(response.headers.get('content-type'), /text\/html; charset=utf-8/i, path);
    if (error) assert.match(response.headers.get('x-robots-tag'), /noindex/);
    results.pages++;
  }
  for (const [path, target] of Object.entries(config.redirects)) await request(path + '?campaign=keep', 301, target + '?campaign=keep');
  for (const [path, target] of Object.entries(config.checkouts)) for (const locale of config.locales) for (const plan of ['monthly', 'lifetime']) {
    const prefix = locale === config.defaultLocale ? '' : '/' + locale;
    const response = await request(`${prefix}${path}?plan=${plan}&campaign=keep`, 302, target + `&plan=${plan}&campaign=keep`);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
  }
  for (const path of ['/not-a-real-page/', '/es/fr/about/', '/%ZZ/', '/..%2fdist-private/secret.txt']) await request(path, 404);
  for (const [route, target] of [['/en/', '/'], ['/en/cheats/', '/cheats/'], ['/Cheats/', '/cheats/'], ['/CHEATS/', '/cheats/']]) await request(route, 301, target);
  await request('/404', 404);
  for (const prefix of ['', '/es', '/de', '/fr']) await request(`${prefix}/forum/?category=test&sort=recent&page=2&campaign=keep`, 301, `${prefix}/forum/?campaign=keep`);
  for (const path of ['/robots.txt', '/sitemap.xml', '/sitemap.xsl', '/rss.xml', '/site.webmanifest', '/favicon.ico']) await request(path, 200);
  // Read each emitted asset through the real binding, including fonts, lazy JS and utility images.
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = dir + '/' + entry.name;
    return entry.isDirectory() ? walk(path) : [path];
  });
  for (const file of walk('dist').filter(file => /\.(?:css|js|woff2?|webp|png|svg|ico)$/.test(file))) {
    const response = await request(file.slice(4), 200);
    assert.doesNotMatch(response.headers.get('content-type') || '', /text\/html/);
    results.assets++;
  }
  // Prime a real local cache entry, then confirm query/path routing still takes precedence.
  await request('/forum/', 200);
  await request('/forum/?category=test&sort=recent&page=2&campaign=keep', 301, '/forum/?campaign=keep');
  const document = await request('/', 200);
  assert.match(document.headers.get('cache-control'), /s-maxage=86400/);
  return results;
}
