import { json, ensureAudit, logAudit } from '../_lib/db.js';

const DEFAULTS = {
  logo:['目前使用临时方形字标；最终 Logo、横版、竖版及透明底文件待确认。','A temporary square monogram is currently in use. Final horizontal, vertical and transparent logo files are pending approval.'],
  chinese_name:['暂定《同一个屋檐下》，最终名称待三位核心成员确认。','The Chinese title is pending final approval by the three core members.'],
  english_name:['Under One Roof','Under One Roof'],
  typography:['网站暂用系统无衬线字体；正式中英文字体、字重和使用场景待确认。','The website currently uses system sans-serif fonts. Final Chinese and English typefaces, weights and usage rules are pending.'],
  brand_colors:['暂定深蓝为主色、暖橙为强调色，并辅以低饱和蓝、绿、紫区分内容类型。','Interim palette: deep navy as the primary colour, warm orange as the accent, with muted blue, green and purple for content categories.'],
  opening:['待确定片头时长、Logo动画、音乐、固定开场方式及是否显示集数。','Define opening duration, logo animation, music, recurring opening treatment and episode-number display.'],
  closing:['待确定片尾时长、下一集提示、演职员信息、关注引导及品牌露出。','Define closing duration, next-episode prompt, credits, follow prompt and brand placement.'],
  subtitles:['中文字幕为主；重点词可保留 Singlish 或英文，并提供自然解释。字号、描边、位置和角色区分待确认。','Use English subtitles for English releases. Define size, outline, position, speaker treatment and handling of Singlish terms.'],
  thumbnail:['封面需固定标题区、人物区、品牌标识区及集数位置；避免过多文字。','Use fixed zones for the title, characters, brand mark and episode number, with minimal copy.'],
  character_names:['角色首次出现时显示名字与身份；后续是否重复显示及颜色区分待确认。','Show each character’s name and role on first appearance. Repetition and colour coding are pending confirmation.'],
  music:['只使用已获授权或可商用音乐；建立片头、冲突、反转、温情和片尾音乐分类。','Use licensed or commercially cleared music only. Build categories for opening, conflict, twist, emotional and closing cues.'],
  logo_rules:['不得拉伸、变形、改变标准颜色或放在低对比背景；最小尺寸和安全空间待确认。','Do not stretch, distort, recolour or place the logo on low-contrast backgrounds. Minimum size and clear space are pending.'],
  primary_colors:['深蓝代表稳定世界观；暖橙代表生活冲突与喜剧节奏。','Deep navy represents a stable story world; warm orange represents domestic conflict and comic rhythm.'],
  visual_character:['生活化、现代、清晰，不做低质夸张综艺感。','Natural, modern and clear, without a cheap or exaggerated variety-show look.'],
  subtitle_principle:['中文版本以中文为主；英文版本系统文字必须全部为英文。用户自行输入的内容保留原文。','The English system interface must remain fully English. User-entered content may remain in its original language.']
};

async function ensure(db){
  await db.prepare(`CREATE TABLE IF NOT EXISTS brand_settings (
    setting_key TEXT PRIMARY KEY,
    value_zh TEXT NOT NULL DEFAULT '',
    value_en TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'draft',
    updated_by TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
  for (const [key,[zh,en]] of Object.entries(DEFAULTS)) {
    await db.prepare(`INSERT OR IGNORE INTO brand_settings(setting_key,value_zh,value_en) VALUES(?,?,?)`).bind(key,zh,en).run();
  }
  await ensureAudit(db);
}
async function rows(db){const r=await db.prepare('SELECT * FROM brand_settings ORDER BY rowid').all();return r.results||[];}
export async function onRequestGet({env}){await ensure(env.DB);return json({settings:await rows(env.DB)});}
export async function onRequestPut({request,env}){
  await ensure(env.DB);const body=await request.json();const settings=Array.isArray(body.settings)?body.settings:[];
  for(const x of settings){if(!DEFAULTS[x.setting_key])continue;await env.DB.prepare(`INSERT INTO brand_settings(setting_key,value_zh,value_en,status,updated_by,updated_at)
    VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)
    ON CONFLICT(setting_key) DO UPDATE SET value_zh=excluded.value_zh,value_en=excluded.value_en,status=excluded.status,updated_by=excluded.updated_by,updated_at=CURRENT_TIMESTAMP`)
    .bind(x.setting_key,String(x.value_zh||''),String(x.value_en||''),x.status==='confirmed'?'confirmed':'draft',String(x.updated_by||'')).run();}
  await logAudit(env.DB,'brand','all','update',{count:settings.length,updated_by:String(settings[0]?.updated_by||'')});
  return json({ok:true,settings:await rows(env.DB)});
}
