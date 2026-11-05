import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

test('RSS enclosures declare the real asset byte length and preserve valid XML text', () => {
  const source = fs.readFileSync(new URL('../src/utils/rss.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
    .replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
  const image = '/images/brand/brand-logo-32.webp';
  const context = {
    fs, path, URL, SITE_ORIGIN: 'https://fixture.example', SITE_DOMAIN: 'fixture.example', SITE_NAME: 'Fixture', RSS_FEED_PATH: '/rss.xml',
    absoluteAssetUrl: p => 'https://fixture.example' + p, canonicalUrl: p => 'https://fixture.example' + p,
    parseBlogDate: value => value, blogPostPath: slug => `/blog/${slug}/`,
    blogPosts: [{ slug: 'example', title: 'A & B <comparison>', desc: 'Research & setup', date: '2026-01-01', image }],
  };
  vm.runInNewContext(js + '\nglobalThis.output = buildRssFeed();', context);
  assert.match(context.output, /A &amp; B &lt;comparison&gt;/);
  assert.match(context.output, /Research &amp; setup/);
  const enclosure = context.output.match(/<enclosure\s+([^>]+)>/)[1];
  const attributes = Object.fromEntries([...enclosure.matchAll(/([a-z]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
  assert.equal(attributes.type, 'image/webp');
  assert.equal(attributes.url, 'https://fixture.example' + image);
  assert.equal(Number(attributes.length), fs.statSync('public' + image).size);
  assert.ok(Number(attributes.length) > 0);
});
