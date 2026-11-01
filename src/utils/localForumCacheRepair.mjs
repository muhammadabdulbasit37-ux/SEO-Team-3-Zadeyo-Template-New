/** Repair a previously cached /forum/ -> /reviews/ redirect in the local preview only. */
function repairLocalForumNavigation(forumPath) {
  const hostname = window.location.hostname;
  if (!['localhost', '127.0.0.1', '[::1]'].includes(hostname)) return;
  const pending = new Map();
  const refresh = path => {
    if (!pending.has(path)) pending.set(path, fetch(path, {cache:'reload', credentials:'same-origin'}).catch(() => undefined));
    return pending.get(path);
  };
  refresh(forumPath);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || !/^\/(?:es\/|de\/|fr\/)?forum\/$/.test(destination.pathname)) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
    event.preventDefault();
    void refresh(destination.pathname + destination.search).then(() => window.location.assign(destination.href));
  });
}

export const createLocalForumCacheRepairScript = forumPath => `(${repairLocalForumNavigation.toString()})(${JSON.stringify(forumPath)});`;
