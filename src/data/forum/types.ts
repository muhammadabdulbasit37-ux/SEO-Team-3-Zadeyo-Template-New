export interface ForumComment { author:string; age:string; score:number; body:string; replies?:ForumComment[] }
export interface ForumPost {
 slug:string; category:string; categoryTone:'purple'|'blue'|'green'|'orange'; title:string; metaTitle?:string; excerpt:string;
 author:string; authorType?:'Person'|'Organization'; authorship?:'editorial'|'imported'; originalLanguage?:'en'; sourceIds?:string[];
 age:string; published:string; commentsCount:number; upvotes:number; body:string[]; comments:ForumComment[];
 resourceLinks?:{label:string;href:string}[];
}
