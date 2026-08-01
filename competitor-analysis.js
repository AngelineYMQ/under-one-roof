window.CompetitorAnalysis = (() => {
  const competitors = [
    {id:'tsq', region:'sg', tier:'A', name:'TSQFilms／《很难》', threat:10, similarity:10, audience:10, brand:9, ip:10, cadence:7, positioning:'新加坡华语生活喜剧标杆', model:'固定演员＋生活观察＋长剧拆短视频＋剧情式品牌植入', learn:'母题、人物关系、自然对白、长短内容联动', avoid:'复制“很难”母题、人物性格或具体故事', action:'建立属于《一个屋檐下》的长期母题，并让每集至少产生三条可拆短视频。'},
    {id:'kingkong', region:'sg', tier:'A', name:'金刚媒体 King Kong Media', threat:9, similarity:8, audience:9, brand:10, ip:7, cadence:8, positioning:'明星资源驱动的类型化微短剧', model:'明星阵容＋明确类型＋连续竖屏剧＋商务整合', learn:'短剧商业化、艺人资源、类型包装、媒体曝光', avoid:'过度依赖明星或爽剧套路', action:'品牌合作方案要比单纯植入更早进入剧本开发。'},
    {id:'doubleup', region:'sg', tier:'A', name:'Double Up 欢迎光玲', threat:8, similarity:7, audience:9, brand:9, ip:7, cadence:8, positioning:'华语社交内容与商业制作团队', model:'搞笑短剧＋街访＋综艺＋艺人管理＋品牌内容', learn:'华语品牌合作、年轻观众沟通、内容组合', avoid:'栏目过多导致核心IP不清晰', action:'坚持一个世界观和固定角色，不把账号做成杂志式频道。'},
    {id:'noontalk', region:'sg', tier:'B', name:'NoonTalk Media 午言媒体', threat:7.5, similarity:6, audience:8, brand:9, ip:7, cadence:7, positioning:'成熟艺人体系进入微短剧', model:'艺人管理＋影视制作＋真人／AI微短剧', learn:'艺人运营、产业关系、批量测试能力', avoid:'为了规模牺牲人物一致性', action:'建立演员档案与角色圣经，降低演员变动对IP的影响。'},
    {id:'outcasts', region:'sg', tier:'B', name:'怪咖 Outcasts', threat:7, similarity:4, audience:9, brand:8, ip:8, cadence:8, positioning:'固定成员驱动的华语娱乐内容', model:'真人综艺＋美食＋旅行＋成员互动', learn:'固定成员关系、观众陪伴感、团体IP', avoid:'用成员热闹代替剧情推进', action:'让观众先喜欢角色，再依靠角色关系带动剧情。'},
    {id:'sgag', region:'sg', tier:'B', name:'SGAG／HEPMIL', threat:6.5, similarity:5, audience:7, brand:10, ip:8, cadence:9, positioning:'本地化喜剧与品牌内容工业化', model:'本地梗＋短视频＋品牌创意＋多语种矩阵', learn:'品牌内容销售、本地话题反应速度、短视频包装', avoid:'只追热点而缺少连续人物资产', action:'建立品牌可植入场景库，但所有植入必须服务人物冲突。'},
    {id:'titan', region:'sg', tier:'C', name:'Titan Academy', threat:6, similarity:7, audience:6, brand:8, ip:10, cadence:7, positioning:'固定世界观与多角色校园IP', model:'长期角色关系＋独立单集＋跨平台人物运营', learn:'角色记忆点、世界观扩展、粉丝追角色', avoid:'人物标签过度卡通化', action:'为每个核心角色定义欲望、缺点、秘密和不可违背的底线。'},
    {id:'wahbanana', region:'sg', tier:'C', name:'Wah!Banana', threat:5.5, similarity:6, audience:7, brand:8, ip:7, cadence:6, positioning:'新加坡生活观察型喜剧', model:'可分享情境＋本地文化梗＋短篇喜剧', learn:'题材选择、生活观察、标题与分享性', avoid:'停留在“不同类型的人”式单条段子', action:'把生活观察写进连续人物关系，而不是拍成一次性段子。'},
    {id:'mediacorp', region:'sg', tier:'C', name:'Mediacorp 华语数字内容', threat:5, similarity:5, audience:7, brand:7, ip:8, cadence:6, positioning:'传统华语影视与数字切片', model:'专业制作＋艺人体系＋平台发行', learn:'表演、制作规范、媒体资源', avoid:'传统电视节奏与过长制作周期', action:'保持互联网原生语言和更快的选题反应。'},
    {id:'cx', region:'cn', tier:'CN', name:'陈翔六点半', threat:0, similarity:8, audience:0, brand:8, ip:10, cadence:9, positioning:'长期固定演员剧情短视频IP', model:'固定人物＋完整起承转合＋高频更新＋电影延伸', learn:'人物长期生命力、单集结构、团队化生产', avoid:'直接复制笑点或人物类型', action:'把人物资产放在单集爆款之前。'},
    {id:'shiliu', region:'cn', tier:'CN', name:'石榴熟了', threat:0, similarity:8, audience:0, brand:7, ip:9, cadence:9, positioning:'地域生活与烟火气群像喜剧', model:'地域文化＋真实生活＋固定角色＋方言表达', learn:'生活质感、文化差异、群像关系', avoid:'为了地域特色刻意表演口音', action:'用新加坡真实生活细节建立不可替代的地域感。'},
    {id:'qixing', region:'cn', tier:'CN', name:'七颗猩猩', threat:0, similarity:7, audience:0, brand:8, ip:8, cadence:8, positioning:'都市年轻人的高节奏剧情内容', model:'年轻议题＋强对白＋快速冲突＋视觉包装', learn:'都市议题、对白节奏、短视频Hook', avoid:'只剩节奏，没有人物沉淀', action:'强化住房、工作、恋爱、身份与阶层议题的年轻视角。'},
    {id:'zhuyidan', region:'cn', tier:'CN', name:'朱一旦的枯燥生活', threat:0, similarity:6, audience:0, brand:9, ip:9, cadence:7, positioning:'强风格世界观与讽刺叙事', model:'固定旁白＋视觉风格＋反转＋社会观察', learn:'镜头语言、铺垫、反转、统一调性', avoid:'模仿其旁白或视觉符号', action:'形成《一个屋檐下》稳定的视觉和剪辑语言。'},
    {id:'homekids', region:'cn', tier:'CN', name:'《家有儿女》', threat:0, similarity:9, audience:0, brand:6, ip:10, cadence:0, positioning:'中国家庭群像人物范本', model:'稳定家庭关系＋鲜明角色＋生活议题＋长期陪伴', learn:'人物圣经、角色边界、家庭关系的长期变化', avoid:'照搬传统家庭结构', action:'确保角色永不因单集剧情需要而突然OOC。'}
  ];

  const copy = {
    zh: {
      title:'竞争对手', eyebrow:'COMPETITIVE INTELLIGENCE', subtitle:'监控争夺新加坡华语观众、演员、品牌预算与本地内容话题的团队，并把研究直接转化为《一个屋檐下》的创作行动。',
      tabs:['竞争地图','新加坡对手','中国对标','TSQ拆解','我们的定位'],
      kpis:[['直接竞争者','3','TSQ、金刚媒体、Double Up'],['重点监控对象','9','新加坡内容与商业玩家'],['中国方法库','5','研究成熟的华语内容机制'],['头号对手','TSQFilms','内容相似度与观众重叠最高']],
      section1:'竞争地图', section1sub:'不要只看题材相似度，也要看观众、演员和品牌预算的重叠。',
      section2:'新加坡竞争者', section2sub:'A级必须持续研究；B级监控商业动作；C级参考IP与制作能力。',
      section3:'中国对标方法库', section3sub:'中国对象不是本地商业竞争者，而是剧本、人物和内容工业化的学习对象。',
      section4:'TSQFilms 深度拆解', section4sub:'保留原有研究结论，作为当前最完整的单一竞品分析。',
      section5:'《一个屋檐下》的差异化', section5sub:'不是另一个新加坡搞笑账号，而是一个缩小版的新加坡群像世界。'
    },
    en: {
      title:'Competitors', eyebrow:'COMPETITIVE INTELLIGENCE', subtitle:'Track teams competing for Singapore Chinese-speaking audiences, actors, brand budgets and local cultural attention, then convert the findings into actions for Under One Roof.',
      tabs:['Market Map','Singapore','China Benchmarks','TSQ Analysis','Our Position'],
      kpis:[['Direct rivals','3','TSQ, King Kong Media and Double Up'],['Priority watchlist','9','Singapore content and commercial players'],['China method library','5','Mature Chinese content systems'],['Primary rival','TSQFilms','Highest content and audience overlap']],
      section1:'Competitive Map', section1sub:'Assess audience, talent and brand-budget overlap—not only topic similarity.',
      section2:'Singapore Competitors', section2sub:'Study Tier A continuously, track Tier B commercially and use Tier C for IP and production references.',
      section3:'China Benchmark Library', section3sub:'These are not local commercial rivals; they are references for writing, character and content industrialisation.',
      section4:'TSQFilms Deep Dive', section4sub:'The original research remains the most complete single-competitor study.',
      section5:'Under One Roof Differentiation', section5sub:'Not another Singapore comedy account, but a miniature Singapore ensemble world.'
    }
  };

  const tsqFormula = [
    ['1','正常目标','主角只想完成一件简单的事。','找房、交房租、见房东、使用公共空间'],
    ['2','第一个障碍','另一个角色因误会、面子或利益制造问题。','租房规则、生活习惯、文化差异'],
    ['3','错误决定','主角选择隐瞒、撒谎或假装身份。','假装懂规则、隐瞒损坏、假装有钱'],
    ['4','冲突叠加','新人物带来新信息，解决方案变成更大问题。','邻居、家长、客户、管理处突然出现'],
    ['5','真相揭露','观众知道真相，角色等待穿帮。','证据出现、当事人到场'],
    ['6','最后补刀','第一次反转后，再揭露一个更危险的信息。','房东还有另一份记录、家长已经知道真相']
  ];

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function scoreBar(n){return `<span class="ci-score"><i style="width:${Math.max(0,Math.min(10,n))*10}%"></i></span><b>${n}</b>`;}
  function tierLabel(t,lang){const m={A:lang==='en'?'Tier A · Direct':'A级 · 直接竞争',B:lang==='en'?'Tier B · Adjacent':'B级 · 相邻竞争',C:lang==='en'?'Tier C · Reference':'C级 · 参考对象',CN:lang==='en'?'China Benchmark':'中国对标'};return m[t];}

  function competitorCard(c, lang){
    return `<article class="ci-card" data-tier="${c.tier}">
      <header><div><span class="ci-tier">${tierLabel(c.tier,lang)}</span><h4>${esc(c.name)}</h4></div>${c.threat?`<strong class="ci-threat">${c.threat}/10</strong>`:''}</header>
      <p class="ci-position">${esc(c.positioning)}</p>
      <dl><div><dt>${lang==='en'?'Content model':'内容模式'}</dt><dd>${esc(c.model)}</dd></div><div><dt>${lang==='en'?'Learn':'重点学习'}</dt><dd>${esc(c.learn)}</dd></div><div><dt>${lang==='en'?'Do not copy':'不要照搬'}</dt><dd>${esc(c.avoid)}</dd></div></dl>
      <div class="ci-action"><small>${lang==='en'?'UNDER ONE ROOF ACTION':'《一个屋檐下》行动'}</small><p>${esc(c.action)}</p></div>
    </article>`;
  }

  function page(lang='zh'){
    const d=copy[lang]||copy.zh; const sg=competitors.filter(x=>x.region==='sg'); const cn=competitors.filter(x=>x.region==='cn');
    return `<section class="competitor-page">
      <div class="competitor-hero"><div><span class="competitor-eyebrow">${d.eyebrow}</span><h2>${d.title}</h2><p>${d.subtitle}</p></div><div class="competitor-source-note"><strong>TSQFilms</strong><span>${lang==='en'?'Primary direct rival':'当前头号直接竞争者'}</span></div></div>
      <div class="competitor-tabs">${d.tabs.map((x,i)=>`<button class="${i===0?'active':''}" onclick="CompetitorAnalysis.scrollToSection('competitor-${i}',this)">${esc(x)}</button>`).join('')}</div>

      <section id="competitor-0" class="competitor-section">
        <div class="competitor-section-head"><div><span>01</span><h3>${d.section1}</h3></div><p>${d.section1sub}</p></div>
        <div class="ci-kpis">${d.kpis.map(x=>`<article><small>${esc(x[0])}</small><strong>${esc(x[1])}</strong><p>${esc(x[2])}</p></article>`).join('')}</div>
        <div class="ci-table-wrap"><table class="ci-table"><thead><tr><th>${lang==='en'?'Competitor':'对手'}</th><th>${lang==='en'?'Content':'内容相似'}</th><th>${lang==='en'?'Audience':'观众重叠'}</th><th>${lang==='en'?'Brand':'品牌竞争'}</th><th>IP</th><th>${lang==='en'?'Threat':'威胁'}</th></tr></thead><tbody>${sg.map(c=>`<tr><td><strong>${esc(c.name)}</strong><small>${esc(c.positioning)}</small></td><td>${scoreBar(c.similarity)}</td><td>${scoreBar(c.audience)}</td><td>${scoreBar(c.brand)}</td><td>${scoreBar(c.ip)}</td><td><b class="ci-threat-num">${c.threat}</b></td></tr>`).join('')}</tbody></table></div>
        <div class="ci-focus"><strong>${lang==='en'?'Research allocation':'研究比例'}</strong><div><span style="width:20%">20% ${lang==='en'?'Singapore market':'新加坡市场'}</span><span style="width:80%">80% ${lang==='en'?'China methods':'中国方法论'}</span></div><p>${lang==='en'?'Use Singapore research to understand the battlefield; use China research to improve writing and production systems.':'用新加坡研究判断战场，用中国研究提升剧本、人物与内容生产方法。'}</p></div>
      </section>

      <section id="competitor-1" class="competitor-section"><div class="competitor-section-head"><div><span>02</span><h3>${d.section2}</h3></div><p>${d.section2sub}</p></div><div class="ci-card-grid">${sg.map(c=>competitorCard(c,lang)).join('')}</div></section>

      <section id="competitor-2" class="competitor-section"><div class="competitor-section-head"><div><span>03</span><h3>${d.section3}</h3></div><p>${d.section3sub}</p></div><div class="ci-card-grid ci-cn-grid">${cn.map(c=>competitorCard(c,lang)).join('')}</div></section>

      <section id="competitor-3" class="competitor-section"><div class="competitor-section-head"><div><span>04</span><h3>${d.section4}</h3></div><p>${d.section4sub}</p></div>
        <div class="competitor-snapshot-grid">${[
          ['核心定位','新加坡华语情景喜剧内容工厂'],['统一母题','“很难”'],['内容引擎','固定角色＋多人物误会＋生活观察'],['分发模式','短视频获客，长视频建立黏性'],['商业模式','品牌定制、平台广告、会员支持'],['最强壁垒','本地洞察、剧本能力、演员默契、剧情式植入']
        ].map((x,i)=>`<article class="competitor-snapshot c${i}"><small>${esc(x[0])}</small><strong>${esc(x[1])}</strong></article>`).join('')}</div>
        <div class="competitor-formula">${tsqFormula.map((x,i)=>`<article><span class="formula-number">${x[0]}</span><div><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p><small>《一个屋檐下》示例</small><strong>${esc(x[3])}</strong></div>${i<tsqFormula.length-1?'<i>↓</i>':''}</article>`).join('')}</div>
        <div class="competitor-report-body"><article><h4>核心结论</h4><p>TSQFilms 已形成“固定角色IP＋新加坡华人生活题材＋长短视频联动＋剧情式品牌植入”的完整内容业务。</p></article><article><h4>主要风险</h4><p>人物关系复杂后新观众进入门槛会提高；误会与撒谎结构可能重复；广告密度可能影响信任；长剧更新频率偏低。</p></article><article><h4>我们要做的</h4><p>学习机制，不复制表达。提前标记短视频切点，让品牌从第一版剧本进入，同时建立更稳定的人物成长线。</p></article></div>
      </section>

      <section id="competitor-4" class="competitor-section"><div class="competitor-section-head"><div><span>05</span><h3>${d.section5}</h3></div><p>${d.section5sub}</p></div>
        <div class="ci-positioning"><div class="ci-position-main"><small>${lang==='en'?'CORE POSITION':'核心定位'}</small><h4>${lang==='en'?'Everyone who has struggled in Singapore should see themselves here.':'每一个在新加坡奋斗过的人，都能在这里看到自己。'}</h4><p>${lang==='en'?'The house is not merely a location. It is a miniature Singapore where housing, work, love, identity, class and cultural differences collide.':'这栋房子不只是拍摄场景，而是一个缩小版的新加坡：住房、工作、感情、身份、阶层与文化差异都在这里碰撞。'}</p></div>
        <div class="ci-pillars">${[['固定世界观','同住一个屋檐下，所有故事自然回到人物关系。'],['长期母题','新加坡生活不是背景，而是冲突来源。'],['角色优先','观众先追人，再追剧情。'],['现实议题','住房、PR、工作、恋爱、父母、阶层和文化。'],['长短联动','每集完整故事，同时预埋可独立传播的短视频节点。'],['商业兼容','品牌必须成为剧情工具、误会来源或解决方案。']].map(x=>`<article><small>${esc(x[0])}</small><p>${esc(x[1])}</p></article>`).join('')}</div></div>
        <div class="ci-priority"><h4>${lang==='en'?'What to monitor every month':'每月重点监控'}</h4><div><span>TSQFilms<small>${lang==='en'?'Content and character system':'内容与人物体系'}</small></span><span>${lang==='en'?'King Kong Media':'金刚媒体'}<small>${lang==='en'?'Microdrama commercialisation':'短剧商业化'}</small></span><span>Double Up<small>${lang==='en'?'Chinese brand content':'华语品牌内容'}</small></span><span>Outcasts<small>${lang==='en'?'Fixed-member IP':'固定成员IP'}</small></span></div></div>
      </section>
    </section>`;
  }

  function scrollToSection(id,btn){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});if(btn){btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');}}
  return {page,scrollToSection};
})();
