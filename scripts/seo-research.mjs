import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const RESEARCH_FILE = 'docs/seo/research-evidence.json';
export const RESEARCH_DOCS = ['keyword-research.md', 'keyword-map.md', 'competitor-analysis.md', 'content-strategy.md'].map(name => `docs/seo/${name}`);
const digest = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const need = (ok, message) => { if (!ok) throw new Error(`SEO research: ${message}`); };
const text = value => typeof value === 'string' && value.trim().length > 0;
const url = value => { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } };
const date = (value, today) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value && value <= today;

export function requiresResearch(root, origin) {
  const file = path.join(root, 'content/policy.json');
  const policy = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  return policy.requireSeoResearch === true && origin !== policy.templateOrigin && origin !== policy.legacyResearchOrigin;
}

/** Offline evidence contract: presence and consistency, never proof of source truth. */
export function checkResearch(root, brief, plan, today) {
  need(fs.existsSync(path.join(root, RESEARCH_FILE)), `missing ${RESEARCH_FILE}; research must precede content:plan`);
  const evidence = JSON.parse(fs.readFileSync(path.join(root, RESEARCH_FILE), 'utf8'));
  need(evidence.version === 1 && evidence.origin === brief.origin && evidence.game === brief.game, 'record must identify this target origin and game');
  need(date(evidence.researchedOn, today), 'invalid/future research date');
  need(['observed', 'provisional'].includes(evidence.status) && Array.isArray(evidence.limitations), 'declare observed/provisional status and limitations');
  if (evidence.status === 'provisional') need(evidence.limitations.some(text), 'provisional research must explain unavailable evidence');
  need(Array.isArray(evidence.sources) && Array.isArray(evidence.queries) && Array.isArray(evidence.competitors) && Array.isArray(evidence.clusters), 'sources, queries, competitors and clusters are required arrays');
  const ids = new Set();
  for (const source of evidence.sources) {
    need(text(source.id) && !ids.has(source.id) && text(source.reference) && date(source.checkedOn, today), 'sources require unique IDs, references and check dates');
    ids.add(source.id);
  }
  const refs = list => Array.isArray(list) && list.length > 0 && list.every(id => ids.has(id));
  const observedRefs = list => refs(list) && list.every(id => url(evidence.sources.find(s => s.id === id).reference));
  const queryIds = new Set();
  for (const query of evidence.queries) {
    need(text(query.id) && !queryIds.has(query.id) && text(query.query) && brief.locales.includes(query.locale) && text(query.market), 'queries require unique IDs, language and market (unknown is explicit)');
    queryIds.add(query.id);
    need(['observed', 'hypothesis'].includes(query.basis) && text(query.finding), 'query basis/finding missing');
    if (query.basis === 'observed') need(text(query.tool) && date(query.checkedOn, today) && observedRefs(query.sourceIds), 'observations require actual tool, date and URL source IDs');
    for (const metric of query.metrics ?? []) need(Number.isFinite(metric.value) && refs([metric.sourceId]) && text(metric.dataset) && text(metric.market) && text(metric.period) && text(metric.units), 'numeric metrics require dataset, source, market, period and units');
  }
  need(evidence.queries.length > 0, 'record researched queries or explicit hypotheses');
  if (evidence.status === 'observed') need(evidence.queries.some(q => q.basis === 'observed'), 'observed status needs observations');
  for (const locale of brief.locales) need(evidence.queries.some(q => q.locale === locale) || text(evidence.localeLimitations?.[locale]), `missing ${locale} research or explicit limitation`);
  const competitors = new Set();
  for (const competitor of evidence.competitors) {
    need(url(competitor.url) && date(competitor.checkedOn, today) && observedRefs(competitor.sourceIds) && text(competitor.observation), 'competitors need inspected URL, date, URL sources and observation');
    competitors.add(new URL(competitor.url).hostname.replace(/^www\./, ''));
  }
  if (competitors.size < 5) need(text(evidence.competitorShortfall) && evidence.limitations.some(text), 'fewer than five competitors requires an explicit access/relevance shortfall');
  const clusters = new Map();
  for (const cluster of evidence.clusters) {
    need(text(cluster.id) && !clusters.has(cluster.id) && text(cluster.intent) && text(cluster.rationale) && Array.isArray(cluster.queryIds) && cluster.queryIds.length && cluster.queryIds.every(id => queryIds.has(id)), 'clusters need unique IDs, intent, rationale and known query IDs');
    clusters.set(cluster.id, cluster);
  }
  need(Array.isArray(evidence.mapping), 'keyword-to-page mapping required');
  need(evidence.mapping.length === plan.pages.length && new Set(evidence.mapping.map(row => row.path)).size === plan.pages.length, 'mapping must cover each planned page exactly once');
  for (const page of plan.pages) {
    const row = evidence.mapping.find(row => row.path === page.path);
    need(row && clusters.has(row.clusterId) && row.primaryKeyword === page.primaryKeyword && row.intentKey === page.intentKey, `mapping disagrees with plan: ${page.path}`);
  }
  need(evidence.review?.existingContent === true && evidence.review?.newContent === true && evidence.review?.semanticIntent === true, 'review existing/new content and semantic intent before approving the map');
  const files = {};
  for (const relative of [RESEARCH_FILE, ...RESEARCH_DOCS]) {
    need(fs.existsSync(path.join(root, relative)), `missing ${relative}`);
    const content = fs.readFileSync(path.join(root, relative), 'utf8').replaceAll('\r\n', '\n');
    need(content.trim().length > 0, `empty ${relative}`);
    files[relative] = digest(content);
  }
  return { version: 1, status: evidence.status, planHash: digest(plan), files };
}

export function verifyResearchReceipt(root, manifest, today) {
  if (!requiresResearch(root, manifest.origin)) return;
  need(manifest.researchReceipt, 'new target manifest requires a checked research receipt');
  const brief = { origin: manifest.origin, game: manifest.facts.find(f => f.id === 'game.identity')?.text, locales: ['en', 'es', 'de', 'fr'] };
  const receipt = checkResearch(root, brief, manifest.plan, today);
  need(digest(receipt) === digest(manifest.researchReceipt), 'research or plan changed since install; recheck/reinstall the reviewed pack');
}
