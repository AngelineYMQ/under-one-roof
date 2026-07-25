import { json, ensureColumn, logAudit, requireId } from '../_lib/db.js';

async function ensure(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL,
    lead TEXT NOT NULL DEFAULT '',
    scene TEXT NOT NULL DEFAULT '',
    status_code TEXT NOT NULL DEFAULT 'idea',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  )`).run();
  await ensureColumn(db, 'ideas', 'deleted_at', 'TEXT');
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC)').run();
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  await ensure(env.DB);
  const { results } = await env.DB.prepare(`
    SELECT id, title, category, summary, lead, scene, status_code AS statusCode, created_at AS createdAt
    FROM ideas
    WHERE deleted_at IS NULL
    ORDER BY datetime(created_at) DESC, id DESC
  `).all();
  return json({ ideas: results || [] });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  await ensure(env.DB);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const clean = {
    title: String(body.title || '').trim().slice(0, 160),
    category: String(body.category || '').trim().slice(0, 80),
    summary: String(body.summary || '').trim().slice(0, 1000),
    lead: String(body.lead || '').trim().slice(0, 80),
    scene: String(body.scene || '').trim().slice(0, 80),
    statusCode: ['idea','discussion','approved','writing','final'].includes(body.statusCode) ? body.statusCode : 'idea'
  };
  if (!clean.title || !clean.summary) return json({ error: 'Title and summary are required.' }, 400);
  const result = await env.DB.prepare(`
    INSERT INTO ideas (title, category, summary, lead, scene, status_code)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(clean.title, clean.category, clean.summary, clean.lead, clean.scene, clean.statusCode).run();
  const id = result.meta.last_row_id;
  await logAudit(env.DB, 'idea', id, 'create', { title: clean.title });
  return json({ idea: { id, ...clean, createdAt: new Date().toISOString() } }, 201);
}

export async function onRequestPut({ request, env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  await ensure(env.DB);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const id = Number(body.id);
  if (!id) return json({ error: 'Valid id required.' }, 400);
  const clean = {
    title: String(body.title || '').trim().slice(0, 160),
    category: String(body.category || '').trim().slice(0, 80),
    summary: String(body.summary || '').trim().slice(0, 1000),
    lead: String(body.lead || '').trim().slice(0, 80),
    scene: String(body.scene || '').trim().slice(0, 80),
    statusCode: ['idea','discussion','approved','writing','final'].includes(body.statusCode) ? body.statusCode : 'idea'
  };
  if (!clean.title || !clean.summary) return json({ error: 'Title and summary are required.' }, 400);
  await env.DB.prepare(`UPDATE ideas SET title=?, category=?, summary=?, lead=?, scene=?, status_code=?
    WHERE id=? AND deleted_at IS NULL`)
    .bind(clean.title, clean.category, clean.summary, clean.lead, clean.scene, clean.statusCode, id).run();
  await logAudit(env.DB, 'idea', id, 'update', { title: clean.title });
  return json({ idea: { id, ...clean } });
}

export async function onRequestDelete({ request, env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  await ensure(env.DB);
  const id = requireId(request);
  if (!id) return json({ error: 'A valid idea id is required. Bulk deletion is disabled.' }, 400);
  await env.DB.prepare(`UPDATE ideas SET deleted_at=CURRENT_TIMESTAMP WHERE id=? AND deleted_at IS NULL`).bind(id).run();
  await logAudit(env.DB, 'idea', id, 'soft_delete');
  return json({ ok: true, id });
}
