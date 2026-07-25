(function(global){
  const API='/api/brand';
  const STORAGE='uor_brand_settings_v1';
  const defs=[
    {key:'logo', zh:'Logo', en:'Logo', color:'orange'},
    {key:'chinese_name', zh:'中文名称', en:'Chinese Title', color:'blue'},
    {key:'english_name', zh:'英文名称', en:'English Title', color:'green'},
    {key:'typography', zh:'字体', en:'Typography', color:'purple'},
    {key:'brand_colors', zh:'标准颜色', en:'Brand Colours', color:'orange'},
    {key:'opening', zh:'片头', en:'Opening Sequence', color:'blue'},
    {key:'closing', zh:'片尾', en:'Closing Sequence', color:'green'},
    {key:'subtitles', zh:'字幕样式', en:'Subtitle Style', color:'purple'},
    {key:'thumbnail', zh:'封面模板', en:'Thumbnail Template', color:'orange'},
    {key:'character_names', zh:'角色名字显示方式', en:'Character Name Treatment', color:'blue'},
    {key:'music', zh:'背景音乐规范', en:'Music Guidelines', color:'green'},
    {key:'logo_rules', zh:'Logo使用规则', en:'Logo Usage Rules', color:'purple'},
    {key:'primary_colors', zh:'主色', en:'Primary Colours', color:'navy'},
    {key:'visual_character', zh:'视觉气质', en:'Visual Character', color:'orange'},
    {key:'subtitle_principle', zh:'字幕原则', en:'Subtitle Principle', color:'green'}
  ];
  const defaults={
    logo:{value_zh:'目前使用临时方形字标；最终 Logo、横版、竖版及透明底文件待确认。',value_en:'A temporary square monogram is currently in use. Final horizontal, vertical and transparent logo files are pending approval.'},
    chinese_name:{value_zh:'暂定《同一个屋檐下》，最终名称待三位核心成员确认。',value_en:'The Chinese title is pending final approval by the three core members.'},
    english_name:{value_zh:'Under One Roof',value_en:'Under One Roof'},
    typography:{value_zh:'网站暂用系统无衬线字体；正式中英文字体、字重和使用场景待确认。',value_en:'The website currently uses system sans-serif fonts. Final Chinese and English typefaces, weights and usage rules are pending.'},
    brand_colors:{value_zh:'暂定深蓝为主色、暖橙为强调色，并辅以低饱和蓝、绿、紫区分内容类型。',value_en:'Interim palette: deep navy as the primary colour, warm orange as the accent, with muted blue, green and purple for content categories.'},
    opening:{value_zh:'待确定片头时长、Logo动画、音乐、固定开场方式及是否显示集数。',value_en:'Define opening duration, logo animation, music, recurring opening treatment and episode-number display.'},
    closing:{value_zh:'待确定片尾时长、下一集提示、演职员信息、关注引导及品牌露出。',value_en:'Define closing duration, next-episode prompt, credits, follow prompt and brand placement.'},
    subtitles:{value_zh:'中文字幕为主；重点词可保留 Singlish 或英文，并提供自然解释。字号、描边、位置和角色区分待确认。',value_en:'Use English subtitles for English releases. Define size, outline, position, speaker treatment and handling of Singlish terms.'},
    thumbnail:{value_zh:'封面需固定标题区、人物区、品牌标识区及集数位置；避免过多文字。',value_en:'Use fixed zones for the title, characters, brand mark and episode number, with minimal copy.'},
    character_names:{value_zh:'角色首次出现时显示名字与身份；后续是否重复显示及颜色区分待确认。',value_en:'Show each character’s name and role on first appearance. Repetition and colour coding are pending confirmation.'},
    music:{value_zh:'只使用已获授权或可商用音乐；建立片头、冲突、反转、温情和片尾音乐分类。',value_en:'Use licensed or commercially cleared music only. Build categories for opening, conflict, twist, emotional and closing cues.'},
    logo_rules:{value_zh:'不得拉伸、变形、改变标准颜色或放在低对比背景；最小尺寸和安全空间待确认。',value_en:'Do not stretch, distort, recolour or place the logo on low-contrast backgrounds. Minimum size and clear space are pending.'},
    primary_colors:{value_zh:'深蓝代表稳定世界观；暖橙代表生活冲突与喜剧节奏。',value_en:'Deep navy represents a stable story world; warm orange represents domestic conflict and comic rhythm.'},
    visual_character:{value_zh:'生活化、现代、清晰，不做低质夸张综艺感。',value_en:'Natural, modern and clear, without a cheap or exaggerated variety-show look.'},
    subtitle_principle:{value_zh:'中文版本以中文为主；英文版本系统文字必须全部为英文。用户自行输入的内容保留原文。',value_en:'The English system interface must remain fully English. User-entered content may remain in its original language.'}
  };
  let data={};
  function normalize(rows){
    const out={};
    defs.forEach(d=>out[d.key]={key:d.key,...(defaults[d.key]||{}),status:'draft',updated_by:'',updated_at:''});
    (rows||[]).forEach(r=>out[r.setting_key]={...out[r.setting_key],...r,key:r.setting_key});
    return out;
  }
  async function load(){
    try{const r=await fetch(API,{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json();data=normalize(j.settings);localStorage.setItem(STORAGE,JSON.stringify(data));return data;}catch(e){try{data=normalize(Object.values(JSON.parse(localStorage.getItem(STORAGE)||'{}')));}catch(_){data=normalize([]);}return data;}
  }
  async function save(payload){
    const r=await fetch(API,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({settings:payload})});
    if(!r.ok)throw new Error('save failed');
    const j=await r.json();data=normalize(j.settings);localStorage.setItem(STORAGE,JSON.stringify(data));return data;
  }
  function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function page(lang){
    setTimeout(()=>init(lang),0);
    const zh=lang==='zh';
    return `<section class="section brand-editor-section"><div class="section-header"><div><h3>${zh?'品牌与视觉规范':'Brand & Visual Guidelines'}</h3><p>${zh?'所有商量好的品牌答案都在这里统一填写，并由三位成员共享。':'Record all agreed brand decisions here and share the same standards across the team.'}</p></div><button class="primary-btn" onclick="SharedBrand.openEditor('${lang}')">${zh?'编辑全部规范':'Edit All Guidelines'}</button></div><div id="brandSettingsGrid" class="brand-settings-grid"><div class="empty">${zh?'正在载入品牌规范…':'Loading brand guidelines…'}</div></div></section>`;
  }
  async function init(lang){await load();render(lang);}
  function render(lang){
    const el=document.getElementById('brandSettingsGrid');if(!el)return;
    const zh=lang==='zh';
    el.innerHTML=defs.map((d,i)=>{const x=data[d.key]||{};const val=zh?x.value_zh:x.value_en;const confirmed=x.status==='confirmed';return `<article class="brand-setting-card brand-${d.color}"><div class="brand-setting-head"><span class="brand-setting-index">${String(i+1).padStart(2,'0')}</span><span class="brand-status ${confirmed?'confirmed':'draft'}">${confirmed?(zh?'已确认':'Confirmed'):(zh?'待确认':'Draft')}</span></div><h4>${zh?d.zh:d.en}</h4><p>${esc(val|| (zh?'尚未填写。':'Not completed.')).replace(/\n/g,'<br>')}</p><footer><span>${x.updated_by?`${zh?'更新：':'Updated by: '}${esc(x.updated_by)}`:''}</span><button class="mini-btn" onclick="SharedBrand.openEditor('${lang}','${d.key}')">${zh?'编辑':'Edit'}</button></footer></article>`;}).join('');
  }
  function openEditor(lang,focusKey=''){
    const zh=lang==='zh';let m=document.getElementById('brandEditorModal');if(!m){m=document.createElement('div');m.id='brandEditorModal';m.className='modal';document.body.appendChild(m);}
    m.innerHTML=`<div class="modal-card brand-editor-modal"><div class="modal-header"><div><p class="eyebrow">${zh?'共享品牌标准':'Shared Brand Standards'}</p><h3>${zh?'编辑品牌规范':'Edit Brand Guidelines'}</h3></div><button class="icon-btn" onclick="SharedBrand.closeEditor()">×</button></div><form id="brandEditorForm"><div class="brand-form-toolbar"><label><span>${zh?'本次更新人':'Updated by'}</span><input name="updated_by" placeholder="Angeline / James / Joseph"></label><p>${zh?'每一项可分别填写中文和英文；确认后把状态改为“已确认”。':'Complete Chinese and English separately, then mark the item as confirmed.'}</p></div><div class="brand-form-list">${defs.map(d=>{const x=data[d.key]||{};return `<fieldset class="brand-form-item" id="brand-field-${d.key}"><legend>${zh?d.zh:d.en}</legend><input type="hidden" name="key" value="${d.key}"><div class="brand-form-columns"><label><span>中文</span><textarea data-field="value_zh" rows="4">${esc(x.value_zh||'')}</textarea></label><label><span>English</span><textarea data-field="value_en" rows="4">${esc(x.value_en||'')}</textarea></label></div><label class="brand-confirm"><input type="checkbox" data-field="confirmed" ${x.status==='confirmed'?'checked':''}><span>${zh?'这项已经由团队确认':'Approved by the team'}</span></label></fieldset>`}).join('')}</div><div class="modal-actions sticky-actions"><button type="button" class="ghost-btn" onclick="SharedBrand.closeEditor()">${zh?'取消':'Cancel'}</button><button class="primary-btn">${zh?'保存全部规范':'Save All Guidelines'}</button></div></form></div>`;
    m.classList.add('open');
    document.getElementById('brandEditorForm').onsubmit=async e=>{e.preventDefault();const by=e.target.updated_by.value.trim();const settings=[...e.target.querySelectorAll('.brand-form-item')].map(fs=>({setting_key:fs.querySelector('[name=key]').value,value_zh:fs.querySelector('[data-field=value_zh]').value.trim(),value_en:fs.querySelector('[data-field=value_en]').value.trim(),status:fs.querySelector('[data-field=confirmed]').checked?'confirmed':'draft',updated_by:by}));const btn=e.submitter;btn.disabled=true;btn.textContent=zh?'保存中…':'Saving…';try{await save(settings);closeEditor();render(lang);}catch(err){alert(zh?'保存失败，请检查数据库连接。':'Save failed. Check the database connection.');btn.disabled=false;btn.textContent=zh?'保存全部规范':'Save All Guidelines';}};
    if(focusKey)setTimeout(()=>document.getElementById(`brand-field-${focusKey}`)?.scrollIntoView({behavior:'smooth',block:'start'}),80);
  }
  function closeEditor(){document.getElementById('brandEditorModal')?.classList.remove('open');}
  global.SharedBrand={page,openEditor,closeEditor,load};
})(window);
