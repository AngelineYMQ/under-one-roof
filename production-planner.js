(() => {
  'use strict';

  const MEMBERS = ['Angeline', 'James', 'Joseph'];
  const TYPE_ORDER = ['shoot', 'editing', 'meeting', 'other'];
  const STATUS_ORDER = ['planning', 'confirmed', 'completed', 'cancelled'];
  const state = {
    lang: document.documentElement.lang.startsWith('en') ? 'en' : 'zh',
    schedule: [],
    availability: [],
    scheduleView: 'cards',
    availabilityView: 'common',
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    scheduleLoaded: false,
    availabilityLoaded: false
  };

  const i18n = {
    zh: {
      scheduleTitle: '日历与制作安排',
      scheduleSub: '统一记录拍摄、剪辑、约见和其他团队事项；所有成员共享同一份排期。',
      availabilityTitle: '三人共同时间',
      availabilitySub: '记录 Angeline、James 与 Joseph 的具体空档，自动找出三个人都方便的共同时间。',
      addItem: '＋ 新建日历事项',
      addAvailability: '＋ 添加有空时间',
      cards: '事项卡片', calendar: '日历', list: '列表',
      common: '共同空档', members: '按成员查看', dates: '日期总览',
      allTypes: '全部类型', allStatus: '全部状态',
      searchSchedule: '搜索日期、事项、地点、集数或负责人',
      searchAvailability: '搜索日期或成员',
      stats: ['日历事项', '拍摄安排', '剪辑安排', '约见事项'],
      types: {shoot:'拍摄',editing:'剪辑',meeting:'约见／面谈',other:'其他'},
      statuses: {planning:'筹备中',confirmed:'已确认',completed:'已完成',cancelled:'已取消'},
      itemType:'事项类型', owner:'负责人', date:'日期', start:'开始时间', end:'结束时间',
      title:'事项名称', episodes:'相关集数', location:'地点', notes:'备注',
      save:'保存事项', cancel:'取消', delete:'删除', edit:'编辑',
      untitled:'未命名事项', unassigned:'未分配', none:'暂无记录',
      time:'时间', item:'事项', actions:'操作',
      member:'成员', availabilityDate:'有空日期', availabilityNote:'说明',
      saveAvailability:'保存有空时间',
      noCommon:'目前没有三个人完全重叠的共同空档。',
      commonHint:'共同空档会根据三个人同一天的时间自动计算。',
      viewOrEdit:'点击查看或编辑',
      prev:'上个月', next:'下个月'
    },
    en: {
      scheduleTitle: 'Calendar & Production Schedule',
      scheduleSub: 'Track shoots, editing, meetings and other team items in one shared schedule.',
      availabilityTitle: 'Team Availability',
      availabilitySub: 'Record exact availability for Angeline, James and Joseph and automatically find common slots.',
      addItem: '+ New Calendar Item',
      addAvailability: '+ Add Availability',
      cards: 'Item Cards', calendar: 'Calendar', list: 'List',
      common: 'Common Slots', members: 'By Member', dates: 'Date Overview',
      allTypes: 'All Types', allStatus: 'All Statuses',
      searchSchedule: 'Search date, item, location, episode or owner',
      searchAvailability: 'Search date or member',
      stats: ['Calendar Items', 'Shoot Items', 'Editing Items', 'Meeting Items'],
      types: {shoot:'Shoot',editing:'Editing',meeting:'Meeting',other:'Other'},
      statuses: {planning:'Planning',confirmed:'Confirmed',completed:'Completed',cancelled:'Cancelled'},
      itemType:'Item Type', owner:'Owner', date:'Date', start:'Start Time', end:'End Time',
      title:'Item Name', episodes:'Episodes', location:'Location', notes:'Notes',
      save:'Save Item', cancel:'Cancel', delete:'Delete', edit:'Edit',
      untitled:'Untitled Item', unassigned:'Unassigned', none:'No records',
      time:'Time', item:'Item', actions:'Actions',
      member:'Member', availabilityDate:'Available Date', availabilityNote:'Note',
      saveAvailability:'Save Availability',
      noCommon:'There are currently no fully overlapping slots for all three members.',
      commonHint:'Common slots are calculated automatically from same-day availability.',
      viewOrEdit:'Click to view or edit',
      prev:'Previous month', next:'Next month'
    }
  };

  const t = () => i18n[state.lang];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad = n => String(n).padStart(2, '0');
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const fmtDate = value => {
    if (!value) return '—';
    const [y,m,d] = String(value).slice(0,10).split('-');
    return state.lang === 'en' ? `${d}/${m}/${y}` : `${d}/${m}/${y}`;
  };
  const itemType = x => TYPE_ORDER.includes(x.eventType) ? x.eventType : 'other';
  const ownerOf = x => x.assignee || x.owner || '';
  const titleOf = x => x.title || x.episodes || t().untitled;
  const timeOf = x => `${x.startTime || x.callTime || '—'}–${x.endTime || '—'}`;

  function modal(title, body) {
    let el = document.getElementById('plannerModal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'plannerModal';
      el.className = 'planner-modal';
      document.body.appendChild(el);
    }
    el.innerHTML = `<div class="planner-modal-card"><header><h3>${esc(title)}</h3><button type="button" onclick="ProductionPlanner.closeModal()">×</button></header>${body}</div>`;
    el.classList.add('open');
  }

  function closeModal() {
    const el = document.getElementById('plannerModal');
    if (el) el.classList.remove('open');
  }

  async function loadSchedules(force=false) {
    state.schedule = await SharedSchedules.load([], {force});
    state.scheduleLoaded = true;
    return state.schedule;
  }

  async function loadAvailability() {
    state.availability = await SharedAvailability.load([]);
    state.availabilityLoaded = true;
    return state.availability;
  }

  function scheduleStats() {
    const counts = {
      total: state.schedule.length,
      shoot: state.schedule.filter(x => itemType(x)==='shoot').length,
      editing: state.schedule.filter(x => itemType(x)==='editing').length,
      meeting: state.schedule.filter(x => itemType(x)==='meeting').length
    };
    return [counts.total, counts.shoot, counts.editing, counts.meeting];
  }

  function filteredSchedule() {
    const type = document.getElementById('plannerTypeFilter')?.value || '';
    const status = document.getElementById('plannerStatusFilter')?.value || '';
    const query = (document.getElementById('plannerSearch')?.value || '').trim().toLowerCase();
    return state.schedule
      .filter(x => !type || itemType(x)===type)
      .filter(x => !status || (x.status || 'planning')===status)
      .filter(x => !query || [
        x.date, titleOf(x), x.location, x.episodes, ownerOf(x), x.notes, x.issues
      ].join(' ').toLowerCase().includes(query))
      .sort((a,b) => `${a.date||''} ${a.startTime||a.callTime||''}`.localeCompare(`${b.date||''} ${b.startTime||b.callTime||''}`));
  }

  function schedulePage(lang) {
    state.lang = lang;
    const route = location.hash.replace('#','');
    state.scheduleView = route.endsWith('-calendar') ? 'calendar' : route.endsWith('-list') ? 'list' : 'cards';
    setTimeout(async () => {
      try { await loadSchedules(); } finally { renderSchedule(); }
    }, 0);
    return section(t().scheduleTitle, t().scheduleSub, `
      <div class="planner-head">
        <div class="planner-stats" id="plannerStats">${[0,0,0,0].map((v,i)=>`<div><span>${t().stats[i]}</span><strong>${v}</strong></div>`).join('')}</div>
        <button class="primary-btn planner-add" onclick="ProductionPlanner.openScheduleForm()">${t().addItem}</button>
      </div>
      <div class="planner-toolbar">
        <div class="planner-tabs">
          <button class="${state.scheduleView==='cards'?'active':''}" onclick="ProductionPlanner.setScheduleView('cards')">${t().cards}</button>
          <button class="${state.scheduleView==='calendar'?'active':''}" onclick="ProductionPlanner.setScheduleView('calendar')">${t().calendar}</button>
          <button class="${state.scheduleView==='list'?'active':''}" onclick="ProductionPlanner.setScheduleView('list')">${t().list}</button>
        </div>
        <select id="plannerTypeFilter" onchange="ProductionPlanner.renderSchedule()">
          <option value="">${t().allTypes}</option>
          ${TYPE_ORDER.map(k=>`<option value="${k}">${t().types[k]}</option>`).join('')}
        </select>
        <select id="plannerStatusFilter" onchange="ProductionPlanner.renderSchedule()">
          <option value="">${t().allStatus}</option>
          ${STATUS_ORDER.map(k=>`<option value="${k}">${t().statuses[k]}</option>`).join('')}
        </select>
        <input id="plannerSearch" placeholder="${t().searchSchedule}" oninput="ProductionPlanner.renderSchedule()">
      </div>
      <div id="plannerScheduleView"><div class="empty">Loading…</div></div>
    `);
  }

  function renderSchedule() {
    const mount = document.getElementById('plannerScheduleView');
    if (!mount) return;
    const statValues = scheduleStats();
    const stats = document.getElementById('plannerStats');
    if (stats) stats.innerHTML = statValues.map((v,i)=>`<div><span>${t().stats[i]}</span><strong>${v}</strong></div>`).join('');
    if (state.scheduleView === 'calendar') mount.innerHTML = renderCalendar();
    else if (state.scheduleView === 'list') mount.innerHTML = renderList();
    else mount.innerHTML = renderCards();
  }

  function renderCards() {
    const data = filteredSchedule();
    if (!data.length) return `<div class="empty">${t().none}</div>`;
    return `<div class="planner-card-grid">${data.map(x => {
      const type = itemType(x);
      return `<article class="planner-item-card type-${type}" onclick="ProductionPlanner.openScheduleForm('${esc(x.id)}')">
        <header><div><span class="planner-type">${t().types[type]}</span><strong>${fmtDate(x.date)}</strong></div><span class="planner-status">${t().statuses[x.status||'planning']}</span></header>
        <h4>${esc(titleOf(x))}</h4>
        <div class="planner-meta">
          <div><small>${t().time}</small><b>${esc(timeOf(x))}</b></div>
          <div><small>${t().owner}</small><b>${esc(ownerOf(x)||t().unassigned)}</b></div>
          <div><small>${t().episodes}</small><b>${esc(x.episodes||'—')}</b></div>
        </div>
        ${x.location?`<p>${esc(x.location)}</p>`:''}
        ${x.notes||x.issues?`<p class="note">${esc(x.notes||x.issues)}</p>`:''}
        <footer><span>${t().viewOrEdit}</span><b>→</b></footer>
      </article>`;
    }).join('')}</div>`;
  }

  function renderList() {
    const data = filteredSchedule();
    if (!data.length) return `<div class="empty">${t().none}</div>`;
    return `<div class="table-wrap"><table class="planner-table"><thead><tr>
      <th>${t().date}</th><th>${t().itemType}</th><th>${t().item}</th><th>${t().time}</th>
      <th>${t().owner}</th><th>${t().location}</th><th>${t().actions}</th>
    </tr></thead><tbody>${data.map(x=>`<tr>
      <td>${fmtDate(x.date)}</td><td><span class="planner-type type-${itemType(x)}">${t().types[itemType(x)]}</span></td>
      <td><strong>${esc(titleOf(x))}</strong><small>${esc(x.episodes||'')}</small></td>
      <td>${esc(timeOf(x))}</td><td>${esc(ownerOf(x)||t().unassigned)}</td><td>${esc(x.location||'—')}</td>
      <td><button class="ghost-btn" onclick="ProductionPlanner.openScheduleForm('${esc(x.id)}')">${t().edit}</button></td>
    </tr>`).join('')}</tbody></table></div>`;
  }

  function renderCalendar() {
    const y = state.month.getFullYear(), m = state.month.getMonth();
    const first = new Date(y,m,1), start = new Date(y,m,1-first.getDay());
    const weekdays = state.lang==='en' ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : ['周日','周一','周二','周三','周四','周五','周六'];
    const cells = [];
    for (let i=0;i<42;i++) {
      const d = new Date(start); d.setDate(start.getDate()+i);
      const key = isoDate(d);
      const events = filteredSchedule().filter(x => String(x.date).slice(0,10)===key);
      cells.push(`<div class="planner-day ${d.getMonth()!==m?'muted':''}">
        <button class="planner-day-number" onclick="ProductionPlanner.openScheduleForm('', '${key}')">${d.getDate()}</button>
        <div>${events.slice(0,3).map(x=>`<button class="planner-calendar-event type-${itemType(x)}" onclick="event.stopPropagation();ProductionPlanner.openScheduleForm('${esc(x.id)}')"><span>${esc(x.startTime||x.callTime||'')}</span><b>${esc(titleOf(x))}</b></button>`).join('')}${events.length>3?`<small>+${events.length-3}</small>`:''}</div>
      </div>`);
    }
    return `<div class="planner-calendar">
      <header><button onclick="ProductionPlanner.changeMonth(-1)" aria-label="${t().prev}">‹</button><h3>${state.lang==='en'?state.month.toLocaleDateString('en-US',{month:'long',year:'numeric'}):`${y}年${m+1}月`}</h3><button onclick="ProductionPlanner.changeMonth(1)" aria-label="${t().next}">›</button></header>
      <div class="planner-weekdays">${weekdays.map(x=>`<span>${x}</span>`).join('')}</div>
      <div class="planner-month-grid">${cells.join('')}</div>
      <footer>${TYPE_ORDER.map(k=>`<span><i class="type-${k}"></i>${t().types[k]}</span>`).join('')}</footer>
    </div>`;
  }

  function openScheduleForm(id='', date='') {
    const x = state.schedule.find(i => String(i.id)===String(id)) || {
      eventType:'shoot', status:'planning', date, startTime:'10:00', endTime:'12:00'
    };
    modal(id ? t().edit : t().addItem.replace(/^＋?\s*/, ''), `
      <form class="planner-form" onsubmit="ProductionPlanner.saveSchedule(event, '${esc(id)}')">
        <label><span>${t().itemType}</span><select name="eventType">${TYPE_ORDER.map(k=>`<option value="${k}" ${itemType(x)===k?'selected':''}>${t().types[k]}</option>`).join('')}</select></label>
        <label><span>${t().owner}</span><select name="owner"><option value="">${t().unassigned}</option>${MEMBERS.map(n=>`<option value="${n}" ${ownerOf(x)===n?'selected':''}>${n}</option>`).join('')}</select></label>
        <label><span>${t().date}</span><input type="date" name="date" value="${esc(x.date||'')}" required></label>
        <label><span>${t().start}</span><input type="time" name="startTime" value="${esc(x.startTime||x.callTime||'10:00')}" required></label>
        <label><span>${t().end}</span><input type="time" name="endTime" value="${esc(x.endTime||'12:00')}" required></label>
        <label><span>Status</span><select name="status">${STATUS_ORDER.map(k=>`<option value="${k}" ${(x.status||'planning')===k?'selected':''}>${t().statuses[k]}</option>`).join('')}</select></label>
        <label class="full"><span>${t().title}</span><input name="title" value="${esc(x.title||'')}" required></label>
        <label class="full"><span>${t().episodes}</span><input name="episodes" value="${esc(x.episodes||'')}" placeholder="EP01, EP02"></label>
        <label class="full"><span>${t().location}</span><input name="location" value="${esc(x.location||'')}"></label>
        <label class="full"><span>${t().notes}</span><textarea name="notes" rows="4">${esc(x.notes||x.issues||'')}</textarea></label>
        <div class="planner-form-actions full">
          ${id?`<button type="button" class="danger-btn" onclick="ProductionPlanner.deleteSchedule('${esc(id)}')">${t().delete}</button>`:''}
          <span></span><button type="button" class="ghost-btn" onclick="ProductionPlanner.closeModal()">${t().cancel}</button>
          <button class="primary-btn">${t().save}</button>
        </div>
      </form>
    `);
  }

  async function saveSchedule(event, id) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const old = state.schedule.find(x=>String(x.id)===String(id)) || {};
    const record = {
      ...old,
      id: id || undefined,
      eventType: fd.get('eventType'),
      owner: fd.get('owner'),
      assignee: fd.get('owner'),
      date: fd.get('date'),
      startTime: fd.get('startTime'),
      endTime: fd.get('endTime'),
      status: fd.get('status'),
      title: fd.get('title'),
      episodes: fd.get('episodes'),
      location: fd.get('location'),
      notes: fd.get('notes')
    };
    if (id) await SharedSchedules.update(record);
    else await SharedSchedules.add(record);
    closeModal();
    await loadSchedules(true);
    renderSchedule();
  }

  async function deleteSchedule(id) {
    await SharedSchedules.remove(id);
    closeModal();
    await loadSchedules(true);
    renderSchedule();
  }

  function setScheduleView(view) {
    state.scheduleView = view;
    const route = `schedule-${view}`;
    if (location.hash.replace('#','')!==route) location.hash = route;
    else renderSchedule();
  }

  function changeMonth(delta) {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth()+delta, 1);
    renderSchedule();
  }

  function availabilityPage(lang, mode='common') {
    state.lang = lang;
    state.availabilityView = mode;
    setTimeout(async () => {
      try { await loadAvailability(); } finally { renderAvailability(); }
    }, 0);
    return section(t().availabilityTitle, t().availabilitySub, `
      <div class="planner-head availability-head-new">
        <div><p>${t().commonHint}</p></div>
        <button class="primary-btn planner-add" onclick="ProductionPlanner.openAvailabilityForm()">${t().addAvailability}</button>
      </div>
      <div class="planner-toolbar availability-toolbar">
        <div class="planner-tabs">
          <button class="${mode==='common'?'active':''}" onclick="ProductionPlanner.setAvailabilityView('common')">${t().common}</button>
          <button class="${mode==='members'?'active':''}" onclick="ProductionPlanner.setAvailabilityView('members')">${t().members}</button>
          <button class="${mode==='dates'?'active':''}" onclick="ProductionPlanner.setAvailabilityView('dates')">${t().dates}</button>
        </div>
        <input id="availabilityPlannerSearch" placeholder="${t().searchAvailability}" oninput="ProductionPlanner.renderAvailability()">
      </div>
      <div id="plannerAvailabilityView"><div class="empty">Loading…</div></div>
    `);
  }

  function filteredAvailability() {
    const q = (document.getElementById('availabilityPlannerSearch')?.value||'').trim().toLowerCase();
    return state.availability.filter(x=>!q || `${x.member||x.owner||''} ${x.date||''} ${x.note||x.notes||''}`.toLowerCase().includes(q));
  }

  function computeCommonSlots() {
    const byDate = {};
    state.availability.forEach(x => {
      const member = x.member || x.owner;
      if (!x.date || !MEMBERS.includes(member)) return;
      byDate[x.date] ||= {};
      byDate[x.date][member] ||= [];
      byDate[x.date][member].push(x);
    });
    const out = [];
    Object.entries(byDate).forEach(([date, members]) => {
      if (!MEMBERS.every(m => members[m]?.length)) return;
      const combos = members.Angeline.flatMap(a => members.James.flatMap(j => members.Joseph.map(p => [a,j,p])));
      combos.forEach(combo => {
        const start = combo.map(x=>x.startTime).sort().at(-1);
        const end = combo.map(x=>x.endTime).sort()[0];
        if (start && end && start < end) out.push({date,startTime:start,endTime:end,members:MEMBERS});
      });
    });
    return out.sort((a,b)=>`${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));
  }

  function renderAvailability() {
    const mount = document.getElementById('plannerAvailabilityView');
    if (!mount) return;
    const data = filteredAvailability();
    if (state.availabilityView==='common') {
      const common = computeCommonSlots();
      mount.innerHTML = common.length ? `<div class="common-slot-grid">${common.map(x=>`<article class="common-slot-card"><header><strong>${fmtDate(x.date)}</strong><span>${x.startTime}–${x.endTime}</span></header><p>${MEMBERS.join(' · ')}</p><button class="primary-btn" onclick="ProductionPlanner.openScheduleForm('', '${x.date}')">${state.lang==='en'?'Create calendar item':'建立日历事项'}</button></article>`).join('')}</div>` : `<div class="empty">${t().noCommon}</div>`;
    } else if (state.availabilityView==='members') {
      mount.innerHTML = `<div class="availability-member-grid">${MEMBERS.map(member=>`<section><header><strong>${member}</strong><span>${data.filter(x=>(x.member||x.owner)===member).length}</span></header>${data.filter(x=>(x.member||x.owner)===member).sort((a,b)=>`${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)).map(x=>availabilityRow(x)).join('')||`<div class="empty">${t().none}</div>`}</section>`).join('')}</div>`;
    } else {
      const dates = [...new Set(data.map(x=>x.date).filter(Boolean))].sort();
      mount.innerHTML = dates.length ? `<div class="availability-date-list">${dates.map(date=>`<section><h4>${fmtDate(date)}</h4>${data.filter(x=>x.date===date).map(x=>availabilityRow(x)).join('')}</section>`).join('')}</div>` : `<div class="empty">${t().none}</div>`;
    }
  }

  function availabilityRow(x) {
    const member = x.member || x.owner || t().unassigned;
    return `<button class="availability-row-new" onclick="ProductionPlanner.openAvailabilityForm('${esc(x.id)}')"><span>${esc(member)}</span><strong>${fmtDate(x.date)} · ${esc(x.startTime||'—')}–${esc(x.endTime||'—')}</strong><small>${esc(x.note||x.notes||'')}</small></button>`;
  }

  function openAvailabilityForm(id='') {
    const x = state.availability.find(i=>String(i.id)===String(id)) || {member:MEMBERS[0],startTime:'10:00',endTime:'14:00'};
    modal(id?t().edit:t().addAvailability.replace(/^＋?\s*/,''), `
      <form class="planner-form" onsubmit="ProductionPlanner.saveAvailability(event, '${esc(id)}')">
        <label><span>${t().member}</span><select name="member">${MEMBERS.map(n=>`<option value="${n}" ${(x.member||x.owner)===n?'selected':''}>${n}</option>`).join('')}</select></label>
        <label><span>${t().availabilityDate}</span><input type="date" name="date" value="${esc(x.date||'')}" required></label>
        <label><span>${t().start}</span><input type="time" name="startTime" value="${esc(x.startTime||'10:00')}" required></label>
        <label><span>${t().end}</span><input type="time" name="endTime" value="${esc(x.endTime||'14:00')}" required></label>
        <label class="full"><span>${t().availabilityNote}</span><input name="note" value="${esc(x.note||x.notes||'')}"></label>
        <div class="planner-form-actions full">
          ${id?`<button type="button" class="danger-btn" onclick="ProductionPlanner.deleteAvailability('${esc(id)}')">${t().delete}</button>`:''}
          <span></span><button type="button" class="ghost-btn" onclick="ProductionPlanner.closeModal()">${t().cancel}</button>
          <button class="primary-btn">${t().saveAvailability}</button>
        </div>
      </form>
    `);
  }

  async function saveAvailability(event, id) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const old = state.availability.find(x=>String(x.id)===String(id)) || {};
    const record = {...old,id:id||undefined,member:fd.get('member'),owner:fd.get('member'),date:fd.get('date'),startTime:fd.get('startTime'),endTime:fd.get('endTime'),note:fd.get('note')};
    if (id) await SharedAvailability.update(record); else await SharedAvailability.add(record);
    closeModal();
    await loadAvailability();
    renderAvailability();
  }

  async function deleteAvailability(id) {
    await SharedAvailability.remove(id);
    closeModal();
    await loadAvailability();
    renderAvailability();
  }

  function setAvailabilityView(view) {
    state.availabilityView=view;
    const route = view==='common'?'availability-common':view==='members'?'availability-members':'availability-dates';
    if (location.hash.replace('#','')!==route) location.hash=route;
    else renderAvailability();
  }

  function install() {
    window.schedulePageZh = () => schedulePage('zh');
    window.schedulePageEn = () => schedulePage('en');
    window.availabilityPageZh = mode => availabilityPage('zh', mode==='overlap'?'common':mode==='people'?'members':mode==='week'?'dates':mode);
    window.availabilityPageEn = mode => availabilityPage('en', mode==='overlap'?'common':mode==='people'?'members':mode==='week'?'dates':mode);
    window.setAvailabilityViewZh = v => setAvailabilityView(v==='overlap'?'common':v==='people'?'members':'dates');
    window.setAvailabilityViewEn = v => setAvailabilityView(v==='overlap'?'common':v==='people'?'members':'dates');
    if (typeof render === 'function') render();
  }

  window.ProductionPlanner = {
    closeModal, renderSchedule, renderAvailability, openScheduleForm, saveSchedule, deleteSchedule,
    setScheduleView, changeMonth, openAvailabilityForm, saveAvailability, deleteAvailability,
    setAvailabilityView
  };

  install();
})();
