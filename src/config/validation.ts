/** Site-specific validation policy. Update former brands/domains when cloning this site. */
import { SITE_URL } from './site';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales';
import { LOCALE_LANGUAGE_TAGS } from '../i18n/localeTags';
import { localizePath } from '../i18n/paths';
import { getTranslations } from '../i18n';
import { getBlogPosts } from '../data/blog';
import { getForumPosts } from '../data/forum/locale';
import { getCatalog } from '../data/catalog';
import { getProductPlans, getFeaturedPlan } from '../data/productPricing';
import { CHECKOUT_PATH_REDIRECTS } from './checkout-redirects.mjs';
import { PATH_REDIRECTS } from '../../scripts/redirects.mjs';
import { clipTitle, clipAtWord, pageTitle } from './seo';
import { isProductHrefEnabled } from './catalog';
import protectedMedia from './protected-media.json';

export const validationPolicy = {
  forbiddenReferences: ['mw4cheat.net', 'mw4-cheats', 'modern-warfare-4', 'MW4 CHEAT', 'Modern Warfare 4', 'Warfare 4 Hacks', 'silent aimbot', 'God Mode', 'infinite ammo', 'speedhack'],
  // Intentional migration aliases stay in redirect configuration, never in visible page content.
  maxImageBytes: 500_000,
};

export function validationConfig() {
  const pages: Record<string, { locale: string; title: string; description: string; indexable: boolean }> = {};
  const forumOriginalLanguages: Record<string,string> = {};
  const products: Record<string, unknown> = {};
  for (const locale of LOCALES) {
    const t = getTranslations(locale);
    const add = (path: string, title: string, description: string, indexable = true) => {
      pages[localizePath(path, locale)] = { locale, title: clipTitle(title), description: clipAtWord(description), indexable };
    };
    for (const [path, seo] of Object.entries(t.pageSeo)) {
      if (!isProductHrefEnabled(path)) continue;
      add(path, seo.title, seo.description, !['/privacy/', '/terms/'].includes(path));
    }
    for (const post of getBlogPosts(locale)) {
      add(`/blog/${post.slug}/`, pageTitle(post.metaTitle ?? post.title, undefined, locale), post.metaDescription ?? post.desc);
    }
    for (const post of getForumPosts(locale)) {
      const path = `/forum/${post.slug}/`;
      add(path, pageTitle(post.metaTitle ?? post.title, undefined, locale), post.excerpt);
      if (post.originalLanguage) forumOriginalLanguages[localizePath(path, locale)] = post.originalLanguage;
    }
    const errorPath = locale === DEFAULT_LOCALE ? '/404.html' : localizePath('/404/', locale);
    pages[errorPath] = { locale, title: clipTitle(`${t.notFound.documentTitle} | ${t.site.name}`), description: clipAtWord(t.notFound.metaDescription), indexable: false };
    for (const entry of getCatalog(locale)) {
      products[localizePath(entry.path, locale)] = {
        sku: entry.slug, checkoutPath: entry.page.buyUrl,
        plans: getProductPlans(entry.slug), featuredPlan: getFeaturedPlan(entry.slug)?.id,
      };
    }
  }
  return {
    origin: SITE_URL, locales: LOCALES, defaultLocale: DEFAULT_LOCALE, languageTags: LOCALE_LANGUAGE_TAGS,
    pages, products, forumOriginalLanguages, enforceSponsoredCheckoutLinks: true, redirects: Object.fromEntries(PATH_REDIRECTS),
    checkouts: Object.fromEntries(CHECKOUT_PATH_REDIRECTS), protectedMedia, ...validationPolicy,
  };
}
