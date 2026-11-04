import { textContent } from './html.mjs';

const attrs = node => node.attr ?? Object.fromEntries((node.attrs ?? []).map(a => [a.name, a.value]));
const ancestors = node => { const result = []; for (let n = node; n; n = n.parentNode) result.push(n); return result; };
const words = value => new Set(value.toLocaleLowerCase().match(/[\p{L}\p{N}]{4,}/gu) ?? []);
const unique = values => [...new Set(values)];
const excluded = node => ancestors(node).some(n => ['script', 'style', 'nav', 'header', 'footer', 'aside'].includes(n.tagName) || /forum-reply-copy|forum-detail-copy|forum-post-copy|review-card/.test(attrs(n).class ?? '') || 'data-original-post' in attrs(n) || 'data-review-row' in attrs(n));
const placement = node => {
  const chain = ancestors(node);
  if (chain.some(n => attrs(n).hreflang || /lang-dropdown|language-switch/i.test(attrs(n).class ?? ''))) return 'language';
  if (chain.some(n => ['header', 'footer', 'nav', 'aside'].includes(n.tagName) || 'data-review-row' in attrs(n) || /breadcrumb|related|sidebar|forum-post|forum-reply|forum-detail-content/.test(attrs(n).class ?? ''))) return 'structural';
  return chain.some(n => ['p', 'li'].includes(n.tagName)) && chain.some(n => ['main', 'article'].includes(n.tagName)) ? 'contextual' : 'structural';
};

/** Complete configured-route graph, not a seed-only crawl. No external requests or copy edits. */
export function analyzeInternalLinks(pages, config) {
  const errors = [], warnings = [], edges = [], excludedRoutes = [], rows = {};
  const intended = Object.entries(config.pages).filter(([, value]) => value.indexable).map(([route]) => route);
  const indexable = new Set(intended);
  const locale = route => config.pages[route]?.locale;
  const fail = (route, message) => errors.push(`${route}: ${message}`);
  const warn = (route, message) => warnings.push(`${route}: ${message}`);
  const incoming = new Map(intended.map(route => [route, new Set()]));
  const outgoing = new Map(intended.map(route => [route, new Set()]));
  const contextualIn = new Map(intended.map(route => [route, new Set()]));
  const contextualOut = new Map(intended.map(route => [route, new Set()]));
  const bodyWords = new Map();
  const normalize = route => {
    if (pages.has(route)) return route;
    if (!route.endsWith('/') && pages.has(route + '/')) return route + '/';
    if (route.endsWith('/index.html') && pages.has(route.slice(0, -10))) return route.slice(0, -10);
    return route;
  };
  for (const [route, page] of pages) {
    if (!indexable.has(route)) excludedRoutes.push(route);
    const repeated = new Set();
    // Only website-owned main prose/headings contribute to lexical suggestions.
    bodyWords.set(route, words(page.nodes.filter(n => ['h1', 'h2', 'h3', 'p'].includes(n.tagName) && !excluded(n) && ancestors(n).some(a => ['main', 'article'].includes(a.tagName))).map(textContent).join(' ')));
    for (const node of page.nodes.filter(n => n.tagName === 'a')) {
      const raw = node.attr.href;
      if (raw == null) { if (node.attr.id || node.attr.name) continue; fail(route, 'anchor lacks href'); continue; }
      if (!raw.trim()) { fail(route, 'empty anchor destination'); continue; }
      if (/^(mailto:|tel:|sms:)/i.test(raw)) continue;
      let url;
      try { url = new URL(raw, config.origin + route); } catch { fail(route, `invalid anchor URL ${raw}`); continue; }
      if (!['https:', 'http:'].includes(url.protocol)) { fail(route, `unsafe anchor URL ${raw}`); continue; }
      if (url.origin !== config.origin) continue; // Existing validator checks forbidden historical references.
      if (config.checkouts?.[url.pathname]) continue; // Preserve purchase routing; never contact partner.
      let target = url.pathname;
      const seen = new Set();
      while (config.redirects?.[target] && !seen.has(target)) { seen.add(target); target = config.redirects[target]; }
      if (seen.has(target)) { fail(route, `redirect loop ${raw}`); continue; }
      target = normalize(target);
      if (seen.size || target !== url.pathname) warn(route, `use direct canonical destination: ${raw} -> ${target}`);
      if (!pages.has(target)) continue; // Assets/missing paths/fragments are checked by validateSite.
      const kind = placement(node);
      const name = (node.attr['aria-label'] || textContent(node) || (node.childNodes ?? []).map(n => attrs(n).alt ?? '').join(' ')).replace(/\s+/g, ' ').trim();
      const edge = { source: route, target, href: raw, anchor: name, placement: kind, query: url.search, fragment: url.hash, rel: node.attr.rel ?? '' };
      edges.push(edge);
      if (kind !== 'language' && locale(route) && locale(target) && locale(route) !== locale(target)) {
        const exception = (config.internalLinks?.localeExceptions ?? []).some(e => e.source === route && e.target === target && e.reason?.trim());
        if (!exception) fail(route, `incorrect localized destination ${raw}`);
      }
      if (kind === 'contextual') {
        if (!name || /^(click here|here|read more|learn more)$/i.test(name)) warn(route, `review generic/empty contextual anchor: ${raw}`);
        const key = target + url.hash;
        if (repeated.has(key)) warn(route, `repeated contextual destination ${raw}`);
        repeated.add(key);
        if (url.search) warn(route, `review contextual query variation ${raw}`);
      }
      if (!indexable.has(route) || !indexable.has(target) || route === target || kind === 'language' || /\bnofollow\b/i.test(edge.rel) || locale(route) !== locale(target)) continue;
      outgoing.get(route).add(target); incoming.get(target).add(route);
      if (kind === 'contextual') { contextualOut.get(route).add(target); contextualIn.get(target).add(route); }
    }
  }
  const reachable = new Set();
  for (const code of config.locales) {
    const home = code === config.defaultLocale ? '/' : `/${code}/`;
    const queue = indexable.has(home) && pages.has(home) ? [home] : [];
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i]; if (reachable.has(current)) continue;
      reachable.add(current); queue.push(...(outgoing.get(current) ?? []));
    }
  }
  const priority = new Set(Object.keys(config.products ?? {}));
  for (const code of config.locales) priority.add(code === config.defaultLocale ? '/' : `/${code}/`);
  for (const route of intended) {
    const row = rows[route] = { locale: locale(route), incoming: incoming.get(route).size, outgoing: outgoing.get(route).size, contextualIncoming: contextualIn.get(route).size, contextualOutgoing: contextualOut.get(route).size, reachable: reachable.has(route), priority: priority.has(route) };
    if (!row.incoming) fail(route, 'orphan indexable page: no incoming link from another indexable same-locale page');
    if (!row.reachable) fail(route, 'indexable page unreachable from locale homepage');
    if (row.priority && !row.contextualIncoming) warn(route, 'important page has no contextual incoming links; review relevant opportunities');
    else if (row.incoming === 1) warn(route, 'one referring page; review underlinking');
  }
  const recommendations = [];
  // Local token overlap is explicitly a heuristic. Each direction is considered independently.
  for (const source of intended) {
    const candidates = [];
    const a = bodyWords.get(source) ?? new Set();
    for (const target of intended) {
      if (target === source || locale(source) !== locale(target) || contextualOut.get(source).has(target)) continue;
      const b = bodyWords.get(target) ?? new Set();
      const shared = [...a].filter(word => b.has(word));
      if (!shared.length) continue;
      const score = shared.length / Math.sqrt(a.size * b.size);
      candidates.push({ source, target, score, sharedTerms: shared.slice(0, 8), contextualDeficit: contextualIn.get(target).size === 0, review: 'Check reader intent, source passage and anchor; lexical overlap is not semantic proof.' });
    }
    candidates.sort((a, b) => Number(b.contextualDeficit) - Number(a.contextualDeficit) || b.score - a.score);
    recommendations.push(...candidates.slice(0, 5));
  }
  return { errors: unique(errors), warnings: unique(warnings), stats: { configuredIndexable: intended.length, generatedPages: pages.size, excludedPages: excludedRoutes.length, uniqueEdges: [...outgoing.values()].reduce((sum, set) => sum + set.size, 0), contextualEdges: [...contextualOut.values()].reduce((sum, set) => sum + set.size, 0), orphans: Object.values(rows).filter(row => !row.incoming).length, unreachable: Object.values(rows).filter(row => !row.reachable).length }, pages: rows, excludedRoutes, edges, recommendations, method: { graph: 'configured routes and generated HTML', placement: 'conservative ancestor heuristic; related/navigation/archive wrappers are structural', suggestions: 'local Unicode token overlap, same locale; includes all existing/new pages; review required', candidateCapPerSource: 5, rankingOrEngagementClaims: false } };
}
