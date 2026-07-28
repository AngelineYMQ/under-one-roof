import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(new URL('..',import.meta.url).pathname);
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const errors=[];
const required=[
  'index.html','styles.css','app-zh.js','app-en.js','shared-episodes.js','shared-ideas.js',
  'shared-schedules.js','shared-team.js','functions/api/episodes.js','functions/api/ideas.js',
  'functions/api/schedules.js','functions/api/team.js','functions/_lib/db.js','schema.sql'
];
for(const f of required)if(!fs.existsSync(path.join(root,f)))errors.push(`Missing required file: ${f}`);

const zh=read('app-zh.js'),en=read('app-en.js');
const routeTokens=['home','positioning','world','characters','relations','season','ideas','scripts','production','schedule','team','supporting','singapore','analytics','brand','public'];
for(const token of routeTokens){
  if(!zh.includes(token))errors.push(`Chinese app missing route token: ${token}`);
  if(!en.includes(token))errors.push(`English app missing route token: ${token}`);
}

const ideasApi=read('functions/api/ideas.js');
if(/DELETE FROM ideas(?!\s+WHERE)/i.test(ideasApi))errors.push('Dangerous bulk DELETE FROM ideas detected.');
if(!ideasApi.includes('Bulk deletion is disabled'))errors.push('Ideas API must explicitly disable bulk deletion.');

const episodeApi=read('functions/api/episodes.js');
const episodeNumbers=[...episodeApi.matchAll(/"episodeNo":(\d+)/g)].map(m=>Number(m[1]));
const unique=new Set(episodeNumbers);
if(unique.size!==30||Math.min(...unique)!==1||Math.max(...unique)!==30)errors.push(`Expected preserved EP01–EP30 defaults; found ${unique.size}.`);

const sharedEpisodes=read('shared-episodes.js');
for(const view of ['seasonPage','scriptsPage','productionPage','analyticsPage'])if(!sharedEpisodes.includes(view))errors.push(`Unified episode view missing: ${view}`);
if(!sharedEpisodes.includes('Structure template')||!sharedEpisodes.includes('结构模板'))errors.push('Template-script disclosure missing in one or both languages.');

const schema=read('schema.sql');
for(const table of ['ideas','scripts','schedules','team_members','episodes','audit_log'])if(!schema.includes(`TABLE IF NOT EXISTS ${table}`))errors.push(`Schema missing table: ${table}`);


function normalizeBilingualName(name){
  return String(name).replace(/(?:Zh|En)$/,'');
}

function extractFunctionDeclarations(source){
  const names=new Map();
  const re=/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  for(const match of source.matchAll(re)){
    const original=match[1];
    const normalized=normalizeBilingualName(original);
    if(!names.has(normalized))names.set(normalized,[]);
    names.get(normalized).push(original);
  }
  return names;
}

function compareFunctionDeclarations(zhSource,enSource){
  const zhFunctions=extractFunctionDeclarations(zhSource);
  const enFunctions=extractFunctionDeclarations(enSource);
  const onlyZh=[...zhFunctions.keys()].filter(name=>!enFunctions.has(name)).sort();
  const onlyEn=[...enFunctions.keys()].filter(name=>!zhFunctions.has(name)).sort();

  if(onlyZh.length){
    errors.push(`Functions only in Chinese app: ${onlyZh.map(name=>zhFunctions.get(name).join('/')).join(', ')}`);
  }
  if(onlyEn.length){
    errors.push(`Functions only in English app: ${onlyEn.map(name=>enFunctions.get(name).join('/')).join(', ')}`);
  }
}

function stripJsStringsAndComments(source){
  let output='';
  let index=0;
  let state='code';
  let quote='';

  while(index<source.length){
    const current=source[index];
    const next=source[index+1]||'';

    if(state==='code'){
      if(current==='/'&&next==='/'){
        output+='  ';
        index+=2;
        state='line-comment';
        continue;
      }
      if(current==='/'&&next==='*'){
        output+='  ';
        index+=2;
        state='block-comment';
        continue;
      }
      if(current==='"'||current==="'"||current==='`'){
        quote=current;
        output+=current;
        index+=1;
        state='string';
        continue;
      }
      output+=current;
      index+=1;
      continue;
    }

    if(state==='line-comment'){
      output+=current==='\n'?'\n':' ';
      if(current==='\n')state='code';
      index+=1;
      continue;
    }

    if(state==='block-comment'){
      if(current==='*'&&next==='/'){
        output+='  ';
        index+=2;
        state='code';
      }else{
        output+=current==='\n'?'\n':' ';
        index+=1;
      }
      continue;
    }

    if(state==='string'){
      if(current==='\\'){
        output+=' ';
        if(index+1<source.length)output+=source[index+1]==='\n'?'\n':' ';
        index+=2;
      }else if(current===quote){
        output+=current;
        index+=1;
        state='code';
      }else{
        output+=current==='\n'?'\n':' ';
        index+=1;
      }
    }
  }

  return output;
}

const ignoredPropertyNames=new Set([
  'length','name','value','checked','dataset','style','display','className','textContent','innerHTML',
  'onclick','onsubmit','onchange','oninput','form','hash','pathname','href','id','key','target',
  'content','page','route','children','parentElement','classList'
]);

function addDestructuredFields(code,fields){
  const patterns=[
    /\b(?:const|let|var)\s*\{([^{}]+)\}\s*=/g,
    /\bfunction\s+[A-Za-z_$][\w$]*\s*\(\s*\{([^{}]+)\}/g,
    /\(\s*\{([^{}]+)\}\s*\)\s*=>/g
  ];

  for(const pattern of patterns){
    for(const match of code.matchAll(pattern)){
      for(const part of match[1].split(',')){
        const cleaned=part.trim().replace(/^\.\.\./,'');
        if(!cleaned)continue;
        const key=(cleaned.split(':',1)[0]||'').split('=',1)[0].trim();
        if(/^[A-Za-z_$][\w$]*$/.test(key)&&!ignoredPropertyNames.has(key)){
          fields.add(normalizeBilingualName(key));
        }
      }
    }
  }
}

function extractReferencedFields(source){
  const code=stripJsStringsAndComments(source);
  const fields=new Set();
  const propertyRe=/\.\s*([A-Za-z_$][\w$]*)/g;

  for(const match of code.matchAll(propertyRe)){
    const rawName=match[1];
    const remainder=code.slice(match.index+match[0].length);
    if(/^\s*\(/.test(remainder))continue;
    const name=normalizeBilingualName(rawName);
    if(!ignoredPropertyNames.has(name))fields.add(name);
  }

  addDestructuredFields(code,fields);
  return fields;
}

function compareReferencedFields(zhSource,enSource){
  const zhFields=extractReferencedFields(zhSource);
  const enFields=extractReferencedFields(enSource);
  const onlyZh=[...zhFields].filter(name=>!enFields.has(name)).sort();
  const onlyEn=[...enFields].filter(name=>!zhFields.has(name)).sort();

  if(onlyZh.length)errors.push(`Data fields only referenced in Chinese app: ${onlyZh.join(', ')}`);
  if(onlyEn.length)errors.push(`Data fields only referenced in English app: ${onlyEn.join(', ')}`);
}

function stripCommentsOnly(source){
  let output='';
  let index=0;
  let state='code';
  let quote='';

  while(index<source.length){
    const current=source[index];
    const next=source[index+1]||'';

    if(state==='code'){
      if(current==='/'&&next==='/'){
        output+='  ';
        index+=2;
        state='line-comment';
        continue;
      }
      if(current==='/'&&next==='*'){
        output+='  ';
        index+=2;
        state='block-comment';
        continue;
      }
      if(current==='"'||current==="'"||current==='`'){
        quote=current;
        output+=current;
        index+=1;
        state='string';
        continue;
      }
      output+=current;
      index+=1;
      continue;
    }

    if(state==='line-comment'){
      output+=current==='\n'?'\n':' ';
      if(current==='\n')state='code';
      index+=1;
      continue;
    }

    if(state==='block-comment'){
      if(current==='*'&&next==='/'){
        output+='  ';
        index+=2;
        state='code';
      }else{
        output+=current==='\n'?'\n':' ';
        index+=1;
      }
      continue;
    }

    output+=current;
    if(current==='\\'&&index+1<source.length){
      output+=source[index+1];
      index+=2;
    }else{
      if(current===quote)state='code';
      index+=1;
    }
  }

  return output;
}

const allowedChineseLiterals=new Set([
  // Add intentional Chinese proper names or source-data literals here when required.
]);

function detectChineseLeakage(enSource){
  const uncommented=stripCommentsOnly(enSource);
  const lines=uncommented.split(/\r?\n/);
  const chineseRe=/[\u4e00-\u9fa5]/g;

  lines.forEach((line,index)=>{
    const chars=line.match(chineseRe)||[];
    if(chars.length<2)return;

    const stringMatches=[...line.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/g)];
    const intentional=stringMatches.some(match=>{
      const literal=match[2].trim();
      return allowedChineseLiterals.has(literal);
    });
    if(intentional)return;

    const context=line.trim().replace(/\s+/g,' ').slice(0,220);
    errors.push(`Possible Chinese leakage in app-en.js at line ${index+1}: ${context}`);
  });
}

compareFunctionDeclarations(zh,en);
compareReferencedFields(zh,en);
detectChineseLeakage(en);

if(errors.length){
  console.error('\nRelease validation failed:\n- '+errors.join('\n- ')+'\n');
  process.exit(1);
}
console.log('Release validation passed: bilingual routes, unified episode views, preserved EP01–EP30 data, API safety and schema checks are present.');
