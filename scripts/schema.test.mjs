import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import vm from'node:vm';import ts from'typescript';
test('product offers preserve sourced prices and plans without asserting unverified availability',()=>{
 const source=fs.readFileSync(new URL('../src/utils/schema.ts',import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
 const context={URL,SITE_NAME:'Fixture brand',SITE_ORIGIN:'https://fixture.example',schemaLanguage:()=> 'en-US',canonicalUrl:p=>new URL(p,'https://fixture.example').href,absoluteAssetUrl:p=>new URL(p,'https://fixture.example').href};
 const reviewSource=fs.readFileSync(new URL('../src/data/reviews.ts',import.meta.url),'utf8');
 const reviewJs=ts.transpileModule(reviewSource,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/^export /gm,'');
 vm.runInNewContext(reviewJs,context);
 vm.runInNewContext(js+'\nglobalThis.buildProduct = productSchema;',context);
 const result=context.buildProduct({name:'Fixture product',description:'Sourced fixture facts',url:'/cheats/',offerUrl:'/go/fixture/?plan=lifetime',priceUsd:150,image:'/image.webp'});
 assert.equal(result.offers.price,150);assert.equal(result.offers.url,'https://fixture.example/go/fixture/?plan=lifetime');assert.equal('availability' in result.offers,false);
 assert.equal('seller'in result.offers,false);assert.equal('brand'in result,false);
 assert.equal('review' in result,false);
 for (const [sku, count] of Object.entries({elite:5,'hwid-spoofer':2,'skin-changer':2,ugc:1})) {
  const product=context.buildProduct({name:'Fixture product',description:'Fixture facts',url:'/cheats/',offerUrl:'/go/fixture/',priceUsd:150,sku});
  assert.equal(product.aggregateRating.reviewCount,count);
  assert.equal(product.review.length,count);
  const average=product.review.reduce((sum,review)=>sum+review.reviewRating.ratingValue,0)/count;
  assert.equal(product.aggregateRating.ratingValue,Math.round(average*100)/100);
 }
});
