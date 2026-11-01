import type { SiteLocale } from '../../i18n/locales';
import type { BlogPostFull } from './types';
import { deBlogArticles } from './posts/de-articles';
import { enBlogArticles } from './posts/en-articles';
import { esBlogArticles } from './posts/es-articles';
import { frBlogArticles } from './posts/fr-articles';

function sortBlogPosts(posts: BlogPostFull[]): BlogPostFull[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

const blogPostsByLocale: Partial<Record<SiteLocale, BlogPostFull[]>> = {
  en: enBlogArticles,
  es: esBlogArticles,
  de: deBlogArticles,
  fr: frBlogArticles,
};

export function getBlogPostsForLocale(locale: SiteLocale): BlogPostFull[] {
  const posts = blogPostsByLocale[locale] ?? enBlogArticles;
  return sortBlogPosts(posts);
}

export function getBlogPost(slug: string, locale: SiteLocale): BlogPostFull | undefined {
  return getBlogPostsForLocale(locale).find((p) => p.slug === slug);
}
