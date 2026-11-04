import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkResearch, verifyResearchReceipt, requiresResearch, RESEARCH_DOCS } from './seo-research.mjs';

const TODAY = '2026-11-04';
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-research-test-'));
  t.after(() => { assert.ok(root.startsWith(path.join(os.tmpdir(), 'seo-research-test-'))); fs.rmSync(root, { recursive: true, force: true }); });
  fs.mkdirSync(path.join(root, 'docs/seo'), { recursive: true });
  const brief = { origin: 'https://fixture.example', game: 'Synthetic Test Game', locales: ['en', 'es', 'de', 'fr'] };
  const plan = { pages: [{ path: '/', primaryKeyword: 'synthetic keyword', intentKey: 'synthetic need' }] };
  const evidence = { version: 1, origin: brief.origin, game: brief.game, researchedOn: TODAY, status: 'provisional', limitations: ['Synthetic test only; no live research performed.'], sources: [], queries: [{ id: 'q', query: 'synthetic keyword', locale: 'en', market: 'unknown', basis: 'hypothesis', finding: 'Synthetic hypothesis for tests only.' }], localeLimitations: { es: 'Test only', de: 'Test only', fr: 'Test only' }, competitors: [], competitorShortfall: 'No live browsing in synthetic fixture.', clusters: [{ id: 'c', intent: 'commercial', rationale: 'Synthetic intent', queryIds: ['q'] }], mapping: [{ ...plan.pages[0], clusterId: 'c' }], review: { existingContent: true, newContent: true, semanticIntent: true } };
  const save = () => fs.writeFileSync(path.join(root, 'docs/seo/research-evidence.json'), JSON.stringify(evidence));
  for (const file of RESEARCH_DOCS) fs.writeFileSync(path.join(root, file), 'Synthetic planning document; never production research.');
  save();
  fs.mkdirSync(path.join(root, 'content'));
  fs.writeFileSync(path.join(root, 'content/policy.json'), JSON.stringify({ requireSeoResearch: true, templateOrigin: 'https://original.example', legacyResearchOrigin: 'https://legacy.example' }));
  return { root, brief, plan, evidence, save };
}

test('new targets require checked research while explicitly named historic origins retain their provenance', t => {
  const f = fixture(t);
  assert.equal(requiresResearch(f.root, f.brief.origin), true);
  assert.equal(requiresResearch(f.root, 'https://legacy.example'), false);
  assert.equal(checkResearch(f.root, f.brief, f.plan, TODAY).status, 'provisional');
  const manifest = { origin: f.brief.origin, facts: [{ id: 'game.identity', text: f.brief.game }], plan: f.plan };
  assert.throws(() => verifyResearchReceipt(f.root, manifest, TODAY), /receipt/);
  manifest.researchReceipt = checkResearch(f.root, f.brief, f.plan, TODAY);
  verifyResearchReceipt(f.root, manifest, TODAY);
  fs.appendFileSync(path.join(f.root, RESEARCH_DOCS[0]), ' changed');
  assert.throws(() => verifyResearchReceipt(f.root, manifest, TODAY), /changed since install/);
});

for (const [name, mutate, message] of [
  ['absent research', f => fs.unlinkSync(path.join(f.root, 'docs/seo/research-evidence.json')), /missing/],
  ['missing competitor analysis document', f => fs.unlinkSync(path.join(f.root, RESEARCH_DOCS[2])), /missing/],
  ['wrong target', f => { f.evidence.origin = 'https://other.example'; f.save(); }, /target/],
  ['future research date', f => { f.evidence.researchedOn = '2099-01-01'; f.save(); }, /date/],
  ['unexplained competitor shortfall', f => { delete f.evidence.competitorShortfall; f.save(); }, /five competitors/],
  ['false observed status', f => { f.evidence.status = 'observed'; f.save(); }, /needs observations/],
  ['unattributed metrics', f => { f.evidence.queries[0].metrics = [{ value: 1000 }]; f.save(); }, /numeric metrics/],
  ['missing clustering', f => { f.evidence.clusters = []; f.save(); }, /mapping disagrees/],
  ['mismatched page map', f => { f.evidence.mapping[0].primaryKeyword = 'other'; f.save(); }, /mapping disagrees/],
  ['skipped existing-content review', f => { f.evidence.review.existingContent = false; f.save(); }, /existing\/new/],
  ['unexplained locale gap', f => { delete f.evidence.localeLimitations.fr; f.save(); }, /missing fr/],
]) test(`research rejects ${name}`, t => { const f = fixture(t); mutate(f); assert.throws(() => checkResearch(f.root, f.brief, f.plan, TODAY), message); });

test('five distinct inspected hosts and URL-backed observations pass the structural gate', t => {
  const f = fixture(t);
  f.evidence.status = 'observed';
  f.evidence.sources = [{ id: 's', reference: 'https://source.example/search-evidence', checkedOn: TODAY }];
  Object.assign(f.evidence.queries[0], { basis: 'observed', sourceIds: ['s'], tool: 'Synthetic test engine', checkedOn: TODAY });
  f.evidence.competitors = Array.from({ length: 5 }, (_, i) => ({ url: `https://competitor${i}.example/`, checkedOn: TODAY, sourceIds: ['s'], observation: 'Synthetic fixture, no real competitor assertion.' }));
  delete f.evidence.competitorShortfall; f.save();
  assert.equal(checkResearch(f.root, f.brief, f.plan, TODAY).status, 'observed');
});
