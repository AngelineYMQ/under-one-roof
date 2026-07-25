const SharedIdeas = (() => {
  const KEY = 'roofIdeasShared';
  const oldKeys = ['roofIdeas', 'roofIdeasEn'];

  function migrate(defaultIdeas) {
    const existing = localStorage.getItem(KEY);
    if (existing) return;
    for (const key of oldKeys) {
      const value = localStorage.getItem(key);
      if (value) {
        localStorage.setItem(KEY, value);
        return;
      }
    }
    localStorage.setItem(KEY, JSON.stringify(defaultIdeas || []));
  }

  function getLocal(defaultIdeas = []) {
    migrate(defaultIdeas);
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return JSON.parse(JSON.stringify(defaultIdeas)); }
  }

  function setLocal(ideas) {
    localStorage.setItem(KEY, JSON.stringify(ideas || []));
  }

  async function load(defaultIdeas = []) {
    migrate(defaultIdeas);
    try {
      const response = await fetch('/api/ideas', { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error('Shared database unavailable');
      const data = await response.json();
      const ideas = Array.isArray(data.ideas) ? data.ideas : [];
      if (ideas.length === 0) {
        const local = getLocal(defaultIdeas);
        setLocal(local);
        return local;
      }
      setLocal(ideas);
      return ideas;
    } catch {
      return getLocal(defaultIdeas);
    }
  }

  async function add(idea) {
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(idea)
      });
      if (!response.ok) throw new Error('Shared database unavailable');
      const data = await response.json();
      const saved = data.idea;
      const local = getLocal([]);
      setLocal([saved, ...local.filter(x => x.id !== saved.id)]);
      return saved;
    } catch {
      const saved = { ...idea, id: `local-${Date.now()}`, createdAt: new Date().toISOString() };
      const local = getLocal([]);
      setLocal([saved, ...local]);
      return saved;
    }
  }

  async function reset() {
    // Local demo reset only. Shared database bulk deletion is intentionally disabled.
    localStorage.removeItem(KEY);
    oldKeys.forEach(key => localStorage.removeItem(key));
  }

  function statusLabel(value, lang) {
    const code = value === '灵感箱' || value === 'Idea Box' ? 'idea'
      : value === '待讨论' || value === 'For Discussion' ? 'discussion'
      : value || 'idea';
    const labels = {
      zh: { idea: '灵感箱', discussion: '待讨论', approved: '已通过', writing: '编写中', final: '最终版' },
      en: { idea: 'Idea Box', discussion: 'For Discussion', approved: 'Approved', writing: 'Writing', final: 'Final' }
    };
    return labels[lang]?.[code] || String(value || '');
  }

  return { getLocal, setLocal, load, add, reset, statusLabel };
})();
