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

if(errors.length){
  console.error('\nRelease validation failed:\n- '+errors.join('\n- ')+'\n');
  process.exit(1);
}
console.log('Release validation passed: bilingual routes, unified episode views, preserved EP01–EP30 data, API safety and schema checks are present.');
