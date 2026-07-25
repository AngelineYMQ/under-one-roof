export const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export async function ensureColumn(db, table, column, definition) {
  const info = await db.prepare(`PRAGMA table_info(${table})`).all();
  if (!(info.results || []).some(row => row.name === column)) {
    await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
  }
}

export async function ensureAudit(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL DEFAULT '',
    action TEXT NOT NULL,
    details TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC)').run();
}

export async function logAudit(db, entityType, entityId, action, details = {}) {
  await ensureAudit(db);
  await db.prepare(`INSERT INTO audit_log(entity_type, entity_id, action, details)
    VALUES(?, ?, ?, ?)`)
    .bind(String(entityType), String(entityId ?? ''), String(action), JSON.stringify(details || {}))
    .run();
}

export function requireId(request) {
  const id = Number(new URL(request.url).searchParams.get('id'));
  return Number.isFinite(id) && id > 0 ? id : null;
}
