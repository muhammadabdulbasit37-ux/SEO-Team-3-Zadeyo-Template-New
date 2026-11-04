import { test } from 'node:test';
import assert from 'node:assert/strict';
import { elements } from './html.mjs';
import { analyzeInternalLinks } from './internal-links.mjs';

function fixture() {
  const config = { origin: 'https://fixture.example', defaultLocale: 'en', locales: ['en', 'fr'], pages: {}, products: { '/product/': {}, '/fr/product/': {} }, checkouts: { '/go/buy/': 'https://partner.example' }, redirects: {} };
  const pages = new Map();
  const add = (route, html, indexable = true) => { config.pages[route] = { locale: route.startsWith('/fr/') ? 'fr' : 'en', indexable }; pages.set(route, { nodes: elements(html) }); };
  add('/', '<main><p><a href="/product/">Product setup</a><a href="/guide/">Setup guide</a></p></main>');
  add('/product/', '<main><p>Product setup requirements <a href="/">Home</a></p></main>');
  add('/guide/', '<main><p>Product setup requirements <a href="/">Home</a></p></main>');
  add('/fr/', '<main><p><a href="/fr/product/">Produit</a></p></main>');
  add('/fr/product/', '<main><p><a href="/fr/">Accueil</a></p></main>');
  return { config, pages, add, run: () => analyzeInternalLinks(pages, config) };
}

test('graph counts unique contextual referring pages and includes old/new cross-section opportunities', () => {
  const f = fixture(), result = f.run();
  assert.deepEqual(result.errors, []);
  assert.equal(result.pages['/product/'].contextualIncoming, 1);
  assert.ok(result.recommendations.some(r => r.source === '/guide/' && r.target === '/product/'));
  assert.equal(result.stats.orphans, 0);
});
test('a disconnected cycle with nonzero inbound counts is still unreachable', () => {
  const f = fixture(); f.add('/a/', '<a href="/b/">B</a>'); f.add('/b/', '<a href="/a/">A</a>');
  assert.equal(f.run().pages['/a/'].incoming, 1);
  assert.ok(f.run().errors.some(e => e.includes('/a/: indexable page unreachable')));
});
test('self links and nofollow links do not cure orphans; excluded routes do not enter coverage', () => {
  const f = fixture(); f.add('/orphan/', '<a href="/orphan/">Self</a>'); f.add('/hidden/', '<a href="/orphan/">Hidden</a>', false);
  f.add('/guide/', '<a href="/">Home</a><a rel="nofollow" href="/orphan/">No follow</a>');
  assert.ok(f.run().errors.some(e => e.includes('/orphan/: orphan')));
  assert.ok(!f.run().pages['/hidden/']);
});
test('wrong locales fail while declared language switching and checkout queries remain exempt', () => {
  const f = fixture(); f.add('/fr/product/', '<main><p><a href="/product/">Wrong</a><a href="/fr/">Home</a><a href="/go/buy/?plan=monthly">Buy</a></p><a hreflang="en" href="/product/">English</a></main>');
  assert.equal(f.run().errors.filter(e => e.includes('incorrect localized')).length, 1);
  f.config.internalLinks = { localeExceptions: [{ source: '/fr/product/', target: '/product/', reason: 'Explicit fixture exception' }] };
  assert.equal(f.run().errors.filter(e => e.includes('incorrect localized')).length, 0);
});
test('navigation does not disguise contextual deficits and duplicates are warnings, never numeric quotas', () => {
  const f = fixture(); f.add('/', '<header><a href="/product/">Product</a><a href="/guide/">Guide</a></header><main><p><a href="/guide/">Guide</a><a href="/guide/">Guide again</a></p></main>');
  const result = f.run();
  assert.equal(result.pages['/product/'].incoming, 1);
  assert.equal(result.pages['/product/'].contextualIncoming, 0);
  assert.ok(result.warnings.some(w => w.includes('important page')));
  assert.ok(result.warnings.some(w => w.includes('repeated contextual')));
  assert.deepEqual(result.errors, []);
});

test('shared navigation does not suppress contextual suggestions, and supplied review text is excluded', () => {
  const f = fixture();
  f.add('/guide/', '<header><a href="/product/">Product</a></header><main><p>Product setup requirements <a href="/">Home</a></p></main>');
  assert.ok(f.run().recommendations.some(r => r.source === '/guide/' && r.target === '/product/'));
  f.add('/reviews/', '<main><a href="/">Home</a><ul><li data-review-row><a href="/product/">Product</a><blockquote><p>Product setup requirements</p></blockquote></li></ul></main>');
  assert.equal(f.run().edges.find(e => e.source === '/reviews/' && e.target === '/product/').placement, 'structural');
  assert.ok(!f.run().recommendations.some(r => r.source === '/reviews/' && r.target === '/product/'));
});
