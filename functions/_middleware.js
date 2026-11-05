import site from '../workers/site.js';

/** Pages exposes the same ASSETS binding; use the complete tested Worker handler. */
export function onRequest(context) {
  const origin = new URL(context.request.url).origin;
  const env = {
    ...context.env,
    ASSETS: {
      fetch(request) {
        const asset = new URL(request.url);
        // Pages canonicalizes the asset hostname, unlike a Worker ASSETS binding.
        // Keep its static request on the incoming origin to avoid self-redirects.
        return context.env.ASSETS.fetch(new Request(new URL(asset.pathname + asset.search, origin), request));
      },
    },
  };
  return site.fetch(context.request, env, {
    waitUntil: promise => context.waitUntil(promise),
  });
}
