window.CompetitorAnalysis = (() => {
  const data = {
    zh: {
      title: '竞争对手',
      subtitle: '拆解同行的内容产品、增长逻辑与商业模式，并转化成《一个屋檐下》可执行的方法。',
      tabs: ['竞品总览','TSQFilms','可复制方法','完整研究'],
      snapshot: [
        ['核心定位','新加坡华语情景喜剧内容工厂'],
        ['统一母题','“很难”'],
        ['内容引擎','固定角色＋多人物误会＋生活观察'],
        ['分发模式','短视频获客，长视频建立黏性'],
        ['商业模式','品牌定制、平台广告、会员支持'],
        ['最强壁垒','本地洞察、剧本能力、演员默契、剧情式植入']
      ],
      strengths: [
        ['统一母题','“很难”降低理解成本、建立固定预期，并且可以无限扩展题材。','建立一个任何生活冲突都能装进去的节目母题。'],
        ['固定角色','观众熟悉谁会撒谎、谁容易被骗、谁最爱面子，因此新故事不用重新介绍人物。','给每个核心角色固定欲望、缺点和必然行为。'],
        ['多人物误会','每个新人物进入场景都会带来新信息，使问题不断升级。','角色进入必须改变局面，不能只是陪衬。'],
        ['长短视频联动','一集长内容可拆成预告、冲突片段、独立笑点和人物合集。','写剧本时预先标记至少三个可拆短视频节点。'],
        ['剧情式品牌植入','产品参与冲突或解决问题，而不是中途念卖点。','品牌必须从第一版剧本就进入人物目标和冲突。'],
        ['新加坡华人观察','亲戚比较、房产、收入、拜年、家族生意等题材无需解释就有共鸣。','优先写新加坡真实生活，不做泛华语段子。']
      ],
      formula: [
        ['1','正常目标','主角只想完成一件简单的事。','找房、交房租、见房东、使用公共空间'],
        ['2','第一个障碍','另一个角色因误会、面子或利益制造问题。','租房规则、生活习惯、文化差异'],
        ['3','错误决定','主角选择隐瞒、撒谎或假装身份。','假装懂规则、隐瞒损坏、假装有钱'],
        ['4','冲突叠加','新人物带来新信息，解决方案变成更大问题。','邻居、家长、客户、管理处突然出现'],
        ['5','真相揭露','观众知道真相，角色等待穿帮。','证据出现、当事人到场'],
        ['6','最后补刀','第一次反转后，再揭露一个更危险的信息。','房东还有另一份记录、家长已经知道真相']
      ],
      applications: [
        ['《一个屋檐下》的母题','不同背景的人住在一起，任何小事都会变成文化和利益冲突。'],
        ['优先题材','租约、押金、水电费、做饭、打扫、访客、邻居投诉、房东看房、家长来访。'],
        ['角色功能','James负责规则与资产；Angeline负责文化冲击与面子；Joseph负责流量与错误帮忙。'],
        ['单集标准','前10秒出现异常；30秒内明确目标和风险；至少三个人物改变局面；结尾必须补一刀。'],
        ['分发标准','每集至少拆出预告、冲突片段、独立笑点三个短视频。'],
        ['商业标准','品牌必须成为剧情工具、误会来源或解决方案。']
      ],
      dontCopy: ['“很难”这个名字','他们的具体人物性格','具体台词和故事','演员关系','表面的品牌植入形式'],
      checklist: [
        '本集是否有一个简单、清晰的目标？',
        '前10秒是否已经出现异常？',
        '主角是否做了一个错误决定？',
        '是否至少有三个人物参与冲突？',
        '每个新人物是否带来新信息？',
        '是否存在信息差或身份错位？',
        '是否有第一次反转？',
        '结尾是否还有补刀？',
        '能否拆成至少三条短视频？',
        '品牌若出现，是否真正参与剧情？'
      ]
    },
    en: {
      title: 'Competitors',
      subtitle: 'Study peer content products, growth systems and business models, then convert the findings into actions for Under One Roof.',
      tabs: ['Overview','TSQFilms','Reusable Methods','Full Research'],
      snapshot: [
        ['Positioning','Singapore Chinese-language sitcom content factory'],
        ['Core concept','“Hard Mode / 很难”'],
        ['Content engine','Recurring characters, escalating misunderstandings and local observation'],
        ['Distribution','Short-form acquisition, long-form loyalty'],
        ['Business model','Branded content, platform ads and memberships'],
        ['Defensibility','Local insight, writing, cast chemistry and narrative integration']
      ],
      strengths: [
        ['Unified concept','“很难” lowers comprehension cost, sets expectations and supports unlimited topics.','Build one repeatable concept that can contain many everyday conflicts.'],
        ['Recurring characters','Viewers already know who lies, panics or causes trouble, reducing setup time.','Give every core character a stable desire, flaw and predictable behaviour.'],
        ['Escalating misunderstandings','Every new person adds information and worsens the situation.','A character entering a scene must change the situation.'],
        ['Long-short distribution','One long episode becomes trailers, conflict clips, standalone jokes and character compilations.','Mark at least three short-form extraction points while writing.'],
        ['Narrative brand integration','Products participate in conflict or resolution instead of interrupting the story.','Include the brand in the first script draft.'],
        ['Local Chinese insight','Family comparison, property, income and festive rituals create immediate recognition.','Prioritise real Singapore life over generic Mandarin jokes.']
      ],
      formula: [
        ['1','Normal goal','The lead wants to complete one simple task.','Renting, paying rent, meeting the landlord, using common space'],
        ['2','First obstacle','Another person creates trouble through misunderstanding, pride or interest.','Rental rules, habits and cultural differences'],
        ['3','Wrong decision','The lead hides, lies or assumes a false identity.','Pretending to understand rules or hiding damage'],
        ['4','Escalation','New people add information and make the solution worse.','Neighbours, parents, clients or management appear'],
        ['5','Exposure','The audience knows the truth and waits for the reveal.','Evidence appears or the real person arrives'],
        ['6','Final sting','After the first reveal, one more fact changes the meaning of the story.','The landlord has another record or the parents already know']
      ],
      applications: [
        ['Under One Roof concept','People from different backgrounds share a home, so ordinary tasks become cultural and commercial conflicts.'],
        ['Priority topics','Lease, deposit, utilities, cooking, cleaning, visitors, neighbour complaints and family visits.'],
        ['Character functions','James represents rules and assets; Angeline represents culture shock and pride; Joseph represents traffic and misguided help.'],
        ['Episode standard','Abnormality within 10 seconds; goal and risk within 30 seconds; at least three characters alter the situation; end with a sting.'],
        ['Distribution standard','Each episode should produce a trailer, conflict clip and standalone joke.'],
        ['Commercial standard','A brand must become a story tool, source of misunderstanding or solution.']
      ],
      dontCopy: ['The “很难” name','Their exact character personalities','Specific dialogue and plots','Cast relationships','Surface-level integration formats'],
      checklist: [
        'Is the episode built around one simple goal?',
        'Does something abnormal happen within 10 seconds?',
        'Does the lead make a wrong decision?',
        'Do at least three characters participate in the conflict?',
        'Does every new character add information?',
        'Is there an information gap or identity mismatch?',
        'Is there a first reversal?',
        'Is there a final sting?',
        'Can the episode become at least three short clips?',
        'If a brand appears, does it participate in the story?'
      ]
    }
  };

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  function page(lang='zh') {
    const d = data[lang] || data.zh;
    return `
      <section class="competitor-page">
        <div class="competitor-hero">
          <div>
            <span class="competitor-eyebrow">${lang==='en'?'COMPETITOR INTELLIGENCE':'竞品研究与创作学习'}</span>
            <h2>${d.title}</h2>
            <p>${d.subtitle}</p>
          </div>
          <div class="competitor-source-note">
            <strong>TSQFilms</strong>
            <span>${lang==='en'?'First complete benchmark':'首个完整分析对象'}</span>
          </div>
        </div>

        <div class="competitor-tabs">
          ${d.tabs.map((x,i)=>`<button class="${i===1?'active':''}" onclick="CompetitorAnalysis.scrollToSection('competitor-${i}')">${esc(x)}</button>`).join('')}
        </div>

        <section id="competitor-0" class="competitor-section">
          <div class="competitor-section-head">
            <div><span>01</span><h3>${lang==='en'?'Competitive Snapshot':'竞品总览'}</h3></div>
            <p>${lang==='en'?'The six facts the team should remember before writing.':'写剧本前，团队最应该记住的六个事实。'}</p>
          </div>
          <div class="competitor-snapshot-grid">
            ${d.snapshot.map((x,i)=>`<article class="competitor-snapshot c${i}"><small>${esc(x[0])}</small><strong>${esc(x[1])}</strong></article>`).join('')}
          </div>
        </section>

        <section id="competitor-1" class="competitor-section">
          <div class="competitor-section-head">
            <div><span>02</span><h3>TSQFilms</h3></div>
            <p>${lang==='en'?'What they do well, and how Under One Roof should translate it.':'他们做对了什么，以及《一个屋檐下》应该如何转化。'}</p>
          </div>
          <div class="competitor-strength-grid">
            ${d.strengths.map((x,i)=>`<article class="competitor-strength s${i}">
              <header><span>${String(i+1).padStart(2,'0')}</span><h4>${esc(x[0])}</h4></header>
              <p>${esc(x[1])}</p>
              <div><small>${lang==='en'?'OUR APPLICATION':'我们要学的'}</small><strong>${esc(x[2])}</strong></div>
            </article>`).join('')}
          </div>
        </section>

        <section id="competitor-2" class="competitor-section">
          <div class="competitor-section-head">
            <div><span>03</span><h3>${lang==='en'?'Reusable Story Engine':'可复制的剧本引擎'}</h3></div>
            <p>${lang==='en'?'Copy the underlying mechanism, not their surface expression.':'复制底层机制，不复制表面形式。'}</p>
          </div>
          <div class="competitor-formula">
            ${d.formula.map((x,i)=>`<article>
              <span class="formula-number">${x[0]}</span>
              <div><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p><small>${lang==='en'?'UNDER ONE ROOF EXAMPLE':'《一个屋檐下》示例'}</small><strong>${esc(x[3])}</strong></div>
              ${i<d.formula.length-1?'<i>↓</i>':''}
            </article>`).join('')}
          </div>

          <div class="competitor-application-grid">
            ${d.applications.map(x=>`<article><small>${esc(x[0])}</small><p>${esc(x[1])}</p></article>`).join('')}
          </div>

          <div class="competitor-two-col">
            <article class="competitor-warning">
              <h4>${lang==='en'?'Do not copy':'不能照搬'}</h4>
              <ul>${d.dontCopy.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
            </article>
            <article class="competitor-checklist">
              <h4>${lang==='en'?'Episode checklist':'每集创作检查表'}</h4>
              <div>${d.checklist.map((x,i)=>`<label><input type="checkbox"><span>${esc(x)}</span></label>`).join('')}</div>
            </article>
          </div>
        </section>

        <section id="competitor-3" class="competitor-section competitor-report">
          <div class="competitor-section-head">
            <div><span>04</span><h3>${lang==='en'?'Research Record':'完整研究记录'}</h3></div>
            <p>${lang==='en'?'A concise internal record of the first research round.':'第一轮公开资料研究的内部摘要。'}</p>
          </div>
          <div class="competitor-report-body">
            <article>
              <h4>${lang==='en'?'Core conclusion':'核心结论'}</h4>
              <p>${lang==='en'
                ?'TSQFilms is not simply a comedy account. It has formed a system combining recurring-character IP, Chinese Singaporean life, long-short distribution and narrative branded content.'
                :'TSQFilms 不是单纯的新加坡搞笑账号，而是已经形成“固定角色IP＋华人生活题材＋长短视频联动＋剧情式品牌植入”的内容业务。'}</p>
            </article>
            <article>
              <h4>${lang==='en'?'Primary risks':'主要风险'}</h4>
              <p>${lang==='en'
                ?'New-viewer entry barriers can rise as relationships become more complex; misunderstanding-and-lying structures may repeat; high ad density may weaken trust; long episodes are released infrequently.'
                :'人物关系越复杂，新观众进入门槛越高；“误会＋撒谎”结构可能重复；广告密度可能伤害内容信任；长剧更新频率偏低。'}</p>
            </article>
            <article>
              <h4>${lang==='en'?'Strategic takeaway':'战略启发'}</h4>
              <p>${lang==='en'
                ?'Build the world once, produce stories continuously, convert one long production into multiple distribution assets, and never sacrifice the comedy experience for a brand.'
                :'一次建立世界观，持续生产故事；一次拍摄长内容，多次拆分分发；一次品牌合作，不牺牲原本的喜剧体验。'}</p>
            </article>
          </div>
        </section>
      </section>
    `;
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  return { page, scrollToSection };
})();
