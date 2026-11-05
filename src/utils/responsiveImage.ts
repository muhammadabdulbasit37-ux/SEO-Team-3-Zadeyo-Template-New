const RASTER_EXT = /\.(png|jpe?g|webp)$/i;
const brandWidth = (width: number) => [32, 64, 128, 512].find(candidate => candidate >= width) ?? 512;

/** 400w covers ~330px card slots at 1x; 640w covers 2x retina. */
export const CARD_IMAGE_WIDTHS = [400, 640] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, calc(100vw - 2.5rem)';
/** 512w matches the desktop hero slider (~487px at 1x); 640/960 cover retina. */
export const HERO_IMAGE_WIDTHS = [512, 640, 960] as const;
/** Slider is desktop-only. The 1px fallback keeps phones and tablets from selecting a wide candidate. */
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 490px, 1px';
export const HERO_DESKTOP_MQ = '(min-width: 1024px)';
export const DEFAULT_IMAGE_WIDTHS = [640, 960] as const;

function splitAssetQuery(src: string): { path: string; query: string } {
  const q = src.indexOf('?');
  if (q === -1) return { path: src, query: '' };
  return { path: src.slice(0, q), query: src.slice(q) };
}

/** Owner-requested full-frame menu presentation; original screenshot bytes stay intact. */
export function gameplayImageFit(src: string): 'fill' | 'contain' | undefined {
  const { path } = splitAssetQuery(src);
  if (path === '/images/gameplay/the-isle-combat-assist-menu.webp' ||
      path === '/images/gameplay/the-isle-player-esp-menu.webp') return 'fill';
  return path.startsWith('/images/gameplay/') ? 'contain' : undefined;
}

/** True when `src` points at a raster file, ignoring `?v=` cache-busters. */
export function isRasterAsset(src: string): boolean {
  const { path } = splitAssetQuery(src);
  return RASTER_EXT.test(path);
}

export function stripRasterExt(src: string): string {
  const { path, query } = splitAssetQuery(src);
  return `${path.replace(RASTER_EXT, '')}${query}`;
}

export function webpSrc(src: string, width: number): string {
  const { path, query } = splitAssetQuery(src);
  // Editorial placeholders reuse supplied brand artwork without regenerating it.
  if (path === '/images/brand/brand-logo.webp') return `/images/brand/brand-logo-${brandWidth(width)}.webp${query}`;
  return `${path.replace(RASTER_EXT, '')}-${width}.webp${query}`;
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  const candidates = splitAssetQuery(src).path === '/images/brand/brand-logo.webp'
    ? [...new Set(widths.map(brandWidth))] : widths;
  return candidates.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/** Smallest variant, used as img src so Lighthouse and no-srcset clients get the right size. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  return webpSrc(src, widths[0] ?? 640);
}
