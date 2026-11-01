import { ChangeFreqEnum, type SitemapItem } from '@astrojs/sitemap';
import { getBlogPosts, getAllBlogSlugs } from '../data/blog';
import { getForumPosts } from '../data/forum/locale';
import { getAllProductSlugs } from '../data/products';
import { LOCALES } from '../i18n/locales';
import { localizePath, stripLocalePrefix } from '../i18n/paths';
import { isIndexablePath, sitemapAlternateLinks } from './hreflang';
import { UTILITY_PRODUCT_PATHS, UTILITY_PRODUCT_SLUGS } from './catalog';
import { canonicalUrl } from './seo';
import { ROUTES, blogPostPath, productPath } from '../utils/path';
import { parseBlogDate } from '../utils/schema';

const enabledUtilityPaths: string[] = UTILITY_PRODUCT_SLUGS.map((slug) => UTILITY_PRODUCT_PATHS[slug]);

const blogLastmod = new Map(
  LOCALES.flatMap((locale) => getBlogPosts(locale).map((post) =>
    [localizePath(`/blog/${post.slug}/`, locale), parseBlogDate(post.date)] as const)),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const localizedPath = pathnameFromUrl(item.url);
  const path = stripLocalePrefix(localizedPath);

  if (!isIndexablePath(localizedPath)) {
    return undefined;
  }

  item.links = sitemapAlternateLinks(localizedPath);
  delete item.lastmod;

  if (path === '/') {
    item.priority = 1;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (path === '/blog/') {
    item.priority = 0.9;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (path === '/forum/' || path.startsWith('/forum/')) {
    item.priority = path === '/forum/' ? 0.8 : 0.6;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    const post = getForumPosts('en').find(p => `/forum/${p.slug}/` === path);
    if (post) item.lastmod = parseBlogDate(post.published);
    return item;
  }

  if (path === '/reviews/') {
    item.priority = 0.7;
    item.changefreq = ChangeFreqEnum.MONTHLY;
    return item;
  }

  if (path.startsWith('/blog/')) {
    item.priority = 0.7;
    item.changefreq = ChangeFreqEnum.MONTHLY;
    item.lastmod = blogLastmod.get(localizedPath);
    return item;
  }

  if (path === '/products/' || path === '/cheats/' || path.endsWith('/cheats/') || enabledUtilityPaths.includes(path)) {
    item.priority = 0.8;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.priority = 0.5;
    item.changefreq = ChangeFreqEnum.YEARLY;
    return item;
  }

  item.priority = 0.6;
  item.changefreq = ChangeFreqEnum.MONTHLY;
  return item;
}

const STATIC_INDEXABLE_BASES = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.blog,
  ROUTES.reviews,
  ROUTES.forum,
  ROUTES.faq,
  ROUTES.support,
  ROUTES.productsHub,
  ROUTES.products,
  ...enabledUtilityPaths,
];

/** Ensures i18n fallback routes (blog/product slugs per locale) appear in the sitemap. */
export function customSitemapPageUrls(): string[] {
  const paths = new Set<string>();

  for (const base of STATIC_INDEXABLE_BASES) {
    for (const locale of LOCALES) {
      const localized = localizePath(base, locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const slug of getAllProductSlugs()) {
    for (const locale of LOCALES) {
      const localized = localizePath(productPath(slug), locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const slug of getAllBlogSlugs()) {
    for (const locale of LOCALES) {
      const localized = localizePath(blogPostPath(slug), locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const post of getForumPosts('en')) for (const locale of LOCALES) paths.add(localizePath(`/forum/${post.slug}/`, locale));

  return [...paths].map((path) => canonicalUrl(path));
}
