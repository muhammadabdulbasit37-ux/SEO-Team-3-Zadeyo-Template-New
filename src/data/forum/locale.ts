import {enForumPosts}from'./en-posts';import{esForumPosts}from'./es-posts';import{deForumPosts}from'./de-posts';import{frForumPosts}from'./fr-posts';
import type{SiteLocale}from'../../i18n/locales';
const posts={en:enForumPosts,es:esForumPosts,de:deForumPosts,fr:frForumPosts};
export const getForumPosts=(locale:SiteLocale='en')=>posts[locale];
export const getForumPost=(slug:string,locale:SiteLocale='en')=>getForumPosts(locale).find(p=>p.slug===slug);
export const forumCategoryId=(category:string)=>'category-'+category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
