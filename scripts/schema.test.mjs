import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import vm from'node:vm';import ts from'typescript';
test('product offers preserve sourced price and plan without asserting unknown stock',()=>{
 const source=fs.readFileSync(new URL('../src/utils/schema.ts',import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
 const context={URL,SITE_NAME:'Fixture brand',SITE_ORIGIN:'https://fixture.example',schemaLanguage:()=> 'en-US',canonicalUrl:p=>new URL(p,'https://fixture.example').href,absoluteAssetUrl:p=>new URL(p,'https://fixture.example').href};
 vm.runInNewContext(js+'\nglobalThis.buildProduct = productSchema;',context);
 const result=context.buildProduct({name:'Fixture product',description:'Sourced fixture facts',url:'/cheats/',offerUrl:'/go/fixture/?plan=lifetime',priceUsd:150,image:'/image.webp'});
 assert.equal(result.offers.price,150);assert.equal(result.offers.url,'https://fixture.example/go/fixture/?plan=lifetime');assert.equal('availability'in result.offers,false);
});
