import { json, ensureColumn, logAudit, requireId } from '../_lib/db.js';

const clean = b => ({
  title: String(b.title || '').trim().slice(0,180),
  titleEn: String(b.titleEn || '').trim().slice(0,180),
  summary: String(b.summary || '').trim().slice(0,3000),
  summaryEn: String(b.summaryEn || '').trim().slice(0,3000),
  statusCode: ['idea','discussion','writing','revision','final'].includes(b.statusCode) ? b.statusCode : 'idea',
  owner: String(b.owner || '').trim().slice(0,100),
  version: String(b.version || 'v0.1').trim().slice(0,40)
});
async function ensure(db){
  await db.prepare(`CREATE TABLE IF NOT EXISTS scripts (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,title_en TEXT NOT NULL DEFAULT '',summary TEXT NOT NULL DEFAULT '',summary_en TEXT NOT NULL DEFAULT '',status_code TEXT NOT NULL DEFAULT 'idea',owner TEXT NOT NULL DEFAULT '',version TEXT NOT NULL DEFAULT 'v0.1',updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,deleted_at TEXT)`).run();
  await ensureColumn(db,'scripts','deleted_at','TEXT');
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_scripts_status ON scripts(status_code)').run();
}
export async function onRequestGet({env}){if(!env.DB)return json({error:'D1 binding DB is not configured.'},503);await ensure(env.DB);const {results}=await env.DB.prepare(`SELECT id,title,title_en AS titleEn,summary,summary_en AS summaryEn,status_code AS statusCode,owner,version,updated_at AS updatedAt FROM scripts WHERE deleted_at IS NULL ORDER BY datetime(updated_at) DESC,id DESC`).all();return json({scripts:results||[]})}
export async function onRequestPost({request,env}){if(!env.DB)return json({error:'D1 binding DB is not configured.'},503);await ensure(env.DB);let b;try{b=clean(await request.json())}catch{return json({error:'Invalid JSON.'},400)}if(!b.title&&!b.titleEn)return json({error:'Title required.'},400);const r=await env.DB.prepare(`INSERT INTO scripts(title,title_en,summary,summary_en,status_code,owner,version,updated_at) VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`).bind(b.title||b.titleEn,b.titleEn,b.summary,b.summaryEn,b.statusCode,b.owner,b.version).run();const id=r.meta.last_row_id;await logAudit(env.DB,'script',id,'create',{title:b.title||b.titleEn});return json({script:{id,...b,updatedAt:new Date().toISOString()}},201)}
export async function onRequestPut({request,env}){if(!env.DB)return json({error:'D1 binding DB is not configured.'},503);await ensure(env.DB);let raw;try{raw=await request.json()}catch{return json({error:'Invalid JSON.'},400)}const id=Number(raw.id);if(!id)return json({error:'Valid id required.'},400);const b=clean(raw);await env.DB.prepare(`UPDATE scripts SET title=?,title_en=?,summary=?,summary_en=?,status_code=?,owner=?,version=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND deleted_at IS NULL`).bind(b.title||b.titleEn,b.titleEn,b.summary,b.summaryEn,b.statusCode,b.owner,b.version,id).run();await logAudit(env.DB,'script',id,'update',{title:b.title||b.titleEn});return json({script:{id,...b,updatedAt:new Date().toISOString()}})}
export async function onRequestDelete({request,env}){if(!env.DB)return json({error:'D1 binding DB is not configured.'},503);await ensure(env.DB);const id=requireId(request);if(!id)return json({error:'Valid id required.'},400);await env.DB.prepare('UPDATE scripts SET deleted_at=CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP WHERE id=? AND deleted_at IS NULL').bind(id).run();await logAudit(env.DB,'script',id,'soft_delete');return json({ok:true,id})}
