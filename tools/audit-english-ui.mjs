import fs from 'node:fs';
const checks=[
 ['app-en.js', /[\u3400-\u9fff]/, 'English application file contains Chinese UI text'],
 ['shared-episodes.js', /lang==='en'\?\(x\.scriptEn\|\|x\.scriptZh\)/, 'English script falls back to Chinese'],
 ['shared-episodes.js', /lang==='en'\?\(x\.culturePointEn\|\|x\.culturePointZh\)/, 'English cultural point falls back to Chinese'],
 ['shared-episodes.js', /lang==='en'\?\(x\.titleEn\|\|x\.titleZh\)/, 'English title falls back to Chinese'],
 ['shared-episodes.js', /lang==='en'\?\(x\.summaryEn\|\|x\.summaryZh\)/, 'English summary falls back to Chinese'],
 ['shared-episodes.js', /lang==='en'\?\(x\.categoryEn\|\|x\.categoryZh\)/, 'English category falls back to Chinese'],
 ['shared-team.js', /lang==='en'\?\(m\.role_en\|\|m\.role_zh\)/, 'English team role falls back to Chinese'],
 ['shared-team.js', /lang==='en'\?\(m\.responsibilities_en\|\|m\.responsibilities_zh\)/, 'English responsibilities fall back to Chinese'],
 ['shared-supporting.js', /lang==='en'\?\(c\[key\+'_en'\]\|\|c\[key\+'_zh'\]\)/, 'English supporting character falls back to Chinese'],
 ['shared-scripts.js', /lang==='en'\?\(x\.titleEn\|\|x\.title\)/, 'English script card falls back to Chinese']
];
let failed=false;
for(const [file,re,msg] of checks){const s=fs.readFileSync(file,'utf8');if(re.test(s)){console.error(`${msg}: ${file}`);failed=true;}}
if(failed)process.exit(1);console.log('English UI audit passed.');
