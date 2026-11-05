import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.js';
import { CHECKOUT_PATH_REDIRECTS } from '../src/config/checkout-redirects.mjs';
import { SITE_URL } from '../src/config/site-url.mjs';
import { SECURITY_CSP } from '../src/config/security-headers.mjs';

test('Pages handles checkout before static redirects, retaining every plan, query and alias', async () => {
  globalThis.caches = { default: { match: async () => undefined } };
  for (const [route, target] of CHECKOUT_PATH_REDIRECTS) {
    for (const prefix of ['', '/en', '/es', '/de', '/fr']) for (const plan of ['monthly', 'lifetime']) {
      const response = await onRequest({
        request: new Request(`${SITE_URL}${prefix}${route}?plan=${plan}&campaign=keep`),
        env: { ASSETS: { fetch: () => assert.fail('Checkout must not reach static _redirects or partner') } },
        waitUntil: () => assert.fail('Checkout must not enter document cache'),
      });
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), `${target}&plan=${plan}&campaign=keep`);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    }
  }
});

test('Pages normalizes aliases and forum queries, and serves real error statuses with its ASSETS binding', async () => {
  globalThis.caches = { default: { match: async () => undefined, put: async () => {} } };
  const requests = [];
  const env = { ASSETS: { fetch: async request => {
    assert.equal(new URL(request.url).origin, SITE_URL, 'Pages asset fetch must retain the incoming origin');
    const route = new URL(request.url).pathname;
    requests.push(route);
    return new Response('<h1>Asset body</h1>', { status: route === '/unknown/' ? 404 : 200, headers: { 'content-type': 'text/html' } });
  } } };
  const invoke = route => onRequest({ request: new Request(SITE_URL + route), env, waitUntil: () => {} });
  for (const [route, expected] of [['/en/', '/'], ['/en/cheats/', '/cheats/'], ['/Cheats/', '/cheats/'], ['/forum/?category=x&sort=y&page=2&campaign=keep', '/forum/?campaign=keep']]) {
    const response = await invoke(route);
    assert.equal(response.status, 301, route);
    assert.equal(response.headers.get('location'), expected);
  }
  for (const route of ['/404', '/404.html', '/es/404/', '/de/404/', '/fr/404/', '/unknown/']) {
    const response = await invoke(route);
    assert.equal(response.status, 404, route);
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    assert.match(await response.text(), /Asset body/);
  }
  assert.ok(requests.includes('/404'));
  const document = await invoke('/');
  assert.equal(document.headers.get('content-security-policy'), SECURITY_CSP);
});
