const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  const { results } = await env.DB.prepare(`
    SELECT id, title, category, summary, lead, scene, status_code AS statusCode, created_at AS createdAt
    FROM ideas
    ORDER BY datetime(created_at) DESC, id DESC
  `).all();
  return json({ ideas: results || [] });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }

  const clean = {
    title: String(body.title || '').trim().slice(0, 160),
    category: String(body.category || '').trim().slice(0, 80),
    summary: String(body.summary || '').trim().slice(0, 1000),
    lead: String(body.lead || '').trim().slice(0, 80),
    scene: String(body.scene || '').trim().slice(0, 80),
    statusCode: 'idea'
  };
  if (!clean.title || !clean.summary) return json({ error: 'Title and summary are required.' }, 400);

  const result = await env.DB.prepare(`
    INSERT INTO ideas (title, category, summary, lead, scene, status_code)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(clean.title, clean.category, clean.summary, clean.lead, clean.scene, clean.statusCode).run();

  return json({ idea: { id: result.meta.last_row_id, ...clean, createdAt: new Date().toISOString() } }, 201);
}

export async function onRequestDelete({ env }) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured.' }, 503);
  await env.DB.prepare('DELETE FROM ideas').run();
  return json({ ok: true });
}
