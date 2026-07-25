const navItems = [
  ["home","首页","⌂"],["positioning","项目定位","◎"],["world","世界观设定","◈"],["characters","人物档案","♙"],["relations","人物关系","⇄"],["season","第一季30集","30"],["ideas","剧情题材库","✦"],["episode","单集资料页","▤"],["scripts","剧本中心","✎"],["production","制作进度","▦"],["schedule","拍摄日程","◷"],["team","团队成员","♟"],["supporting","配角资料","♧"],["singapore","新加坡资料库","SG"],["analytics","发布与数据","↗"],["brand","品牌规范","◆"],["public","内部版与对外版","◉"]
];

const episodes = [
[1,"第一次见房东","入住篇"],[2,"看房的时候什么都说可以","入住篇"],[3,"搬进来的第一天","入住篇"],[4,"谁睡最大间","入住篇"],[5,"房东的二十条规则","入住篇"],[6,"押金到底能不能拿回来","入住篇"],
[7,"空调到底可以开多久","生活习惯篇"],[8,"半夜洗衣服","生活习惯篇"],[9,"谁又没有关灯","生活习惯篇"],[10,"冰箱里的东西是谁的","生活习惯篇"],[11,"在家里煮火锅","生活习惯篇"],[12,"榴梿可以带回家吗","生活习惯篇"],[13,"谁负责洗厕所","生活习惯篇"],[14,"带朋友回家要不要通知","生活习惯篇"],[15,"客厅到底是谁的","生活习惯篇"],
[16,"用纸巾占座","新加坡文化篇"],[17,"小贩中心怎么点餐","新加坡文化篇"],[18,"为什么每个人都说 Can","新加坡文化篇"],[19,"第一次坐巴士坐过站","新加坡文化篇"],[20,"MRT里面不能做什么","新加坡文化篇"],[21,"垃圾到底怎么丢","新加坡文化篇"],[22,"新加坡为什么什么都罚款","新加坡文化篇"],[23,"下雨为什么所有人都不带伞","新加坡文化篇"],
[24,"Joseph 为了流量偷拍看房客户","关系升级篇"],[25,"Angeline 想把客厅改成教室","关系升级篇"],[26,"James 要把客厅租给房产客户","关系升级篇"],[27,"三个人第一次合作接客户","关系升级篇"],[28,"一条广告突然爆了","关系升级篇"],[29,"中国家庭来新加坡看房和看学校","关系升级篇"],[30,"客厅到底是房子、教室还是摄影棚","关系升级篇"]
];

const topicGroups = {
"合租生活":["房租","押金","水电","空调","洗衣","洗厕所","打扫","噪音","带朋友回家","冰箱","煮饭","快递","宠物","作息","公共区域"],
"新加坡文化":["Chope","Singlish","小贩中心","排队","MC","HDB","Condo","MRT","巴士","ERP","COE","CPF","Singpass","National Day","Hawker Culture"],
"中国人初到新加坡":["找房","电话卡","银行开户","看医生","找工作","申请准证","交通","购物","饮食","学校","租房合同","中介","天气","英语口音"],
"三人关系":["吵架","冷战","生日","失恋","失业","生病","借钱","误会","秘密","互相帮助","新朋友","家人来访"],
"职业与客户":["房产看房","租售谈判","学校咨询","补习与加盟","中国家庭来新加坡","广告投放","内容拍摄","平台算法","客户转化","跨行业合作","创业项目","投资人"],
"节日和热点":["农历新年","国庆节","中秋节","圣诞节","开斋节","屠妖节","双十一","高考","新加坡大选","演唱会","新政策"]
};

const defaultIdeas = [
 {title:"空调遥控器失踪了",category:"合租生活",summary:"James限制空调时长，遥控器却突然不见，最后发现被Joseph藏进冰箱。",lead:"三人",scene:"客厅",status:"灵感箱"},
 {title:"纸巾不是垃圾",category:"新加坡文化",summary:"Joseph看到桌上纸巾顺手丢掉，Angeline回来发现座位被别人坐了。",lead:"Joseph",scene:"小贩中心",status:"待讨论"},
 {title:"客厅到底拿来做什么",category:"职业与客户",summary:"James想用客厅接待看房客户，Angeline想办教育说明会，Joseph则已经架好灯准备拍广告。",lead:"三人",scene:"客厅",status:"待讨论"}
];

let state = {
  page: location.hash.replace('#','') || 'home',
  ideas: SharedIdeas.getLocal(defaultIdeas)
};

const nav = document.getElementById('nav');
const content = document.getElementById('content');
const pageTitle = document.getElementById('pageTitle');
const sidebar = document.getElementById('sidebar');

function badge(text, cls=''){ return `<span class="badge ${cls}">${text}</span>`; }
function card(title, body, extra=''){ return `<article class="card ${extra}"><h4>${title}</h4>${body}</article>`; }
function section(title, subtitle, body){ return `<section class="section"><div class="section-header"><div><h3>${title}</h3><p>${subtitle||''}</p></div></div>${body}</section>`; }

function renderNav(){
  nav.innerHTML = navItems.map(([id,label,icon])=>`<button class="nav-btn ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join('');
  nav.querySelectorAll('[data-page]').forEach(btn=>btn.onclick=()=>{ location.hash=btn.dataset.page; sidebar.classList.remove('open'); });
}

const pages = {
home(){
 return `<div class="hero"><p class="eyebrow">Season 1 · Internal HQ</p><h3>三个在新加坡从事不同行业的人住在同一屋檐下，用喜剧演出真实的新加坡生活、文化与工作碰撞。</h3><p>James 是房东兼房地产从业者，Angeline 是教育创业者与商业资源整合者，Joseph 从事社交媒体营销与广告投放。三人以 James 家客厅为核心场景，把合租生活、真实职业和新加坡文化融入同一个长期短剧宇宙。</p><div class="hero-actions"><button class="primary-btn" onclick="location.hash='season'">查看第一季30集</button><button class="ghost-btn" onclick="location.hash='characters'">查看人物设定</button><button class="ghost-btn" onclick="openIdeaModal()">新增剧情灵感</button></div></div>
 ${section('当前制作状态','第一季：新租客来了',`<div class="grid grid-4">
 ${statCard('计划集数','30','0%')}${statCard('已确定题材','30','100%')}${statCard('已完成剧本','0','0%')}${statCard('已拍摄','0','0%')}
 </div>`)}
 ${section('项目核心','所有团队成员必须首先理解的四件事',`<div class="grid grid-2">${card('项目简介','<p>James 是房东兼房地产从业者，Angeline 是教育创业者与商业资源整合者，Joseph 从事社交媒体营销与广告投放。三个人既是房东与租客，也是会互相借资源、抢场地、接客户和合作做项目的朋友。</p>')}${card('核心定位','<div class="callout">用轻松短剧，让中国观众看懂真实的新加坡生活、文化、工作与商业机会。</div>')}${card('情感核心','<p>表面互相嫌弃，实际已经像一家人。喜剧来自冲突，长期追看来自人物之间越来越深的关系。</p>')}${card('扩展方向','<p>前期以客厅为主要舞台；后期可加入厨房、门口、楼下、小贩中心、超市、MRT、巴士站及更多固定配角。</p>')}</div>`)}
 ${section('快速入口','进入日常创作与制作工作',`<div class="grid grid-3">${quick('人物档案','统一角色性格、功能和表演边界','characters')}${quick('剧情题材库','存储长期题材与新增灵感','ideas')}${quick('制作进度','追踪选题、剧本、拍摄和后期','production')}</div>`)}`;
},
positioning(){ return introPage('项目定位','这不是普通搞笑账号，而是一套可以持续扩展的短剧 IP。',[
 ['项目名称','暂定《同一个屋檐下》。名称可更换，但内部世界观与人物关系可先建立。'],
 ['一句话介绍','三个从事房地产、教育与社交媒体营销的人住在同一屋檐下，在合租生活、客户工作和跨行业合作中不断制造冲突。'],
 ['核心观众','对新加坡感兴趣的中国观众；准备来新加坡的人；已在新加坡生活的中国人；新加坡本地华人；喜欢生活类轻喜剧的观众。'],
 ['内容特点','新加坡真实文化、中国人与新加坡人的文化差异、合租生活、房地产、教育、社交媒体营销、客户故事、轻喜剧、实用信息、固定人物关系与连续世界观。']
], rules()); },
world(){ return introPage('世界观设定','客厅只是舞台，人物关系才是真正的核心。',[
 ['故事背景','James 是房东，也从事房地产；Angeline 和 Joseph 是长期租客。Angeline 从事教育、留学、补习中心与商业项目，Joseph 从事社交媒体营销、内容制作与广告投放。三个人白天处理各自客户，回家后继续讨论项目、争抢客厅用途，并因职业思维、生活习惯和新加坡文化不断发生冲突。'],
 ['固定场景','客厅、沙发、饭桌、厨房、房间门口、大门、走廊、楼下、电梯、附近小贩中心、超市、巴士站。前期主要拍 James 家客厅，后期逐步增加外景。'],
 ['世界观规则','James 是房东兼房地产从业者；Angeline 是教育创业者与商业资源整合者；Joseph 是社交媒体营销与广告投放从业者；Angeline 和 Joseph 是长期租客；三个人也是朋友；现实职业可以进入剧情但人物性格要适度夸张；房子是主要场景但故事不局限于房子；客户和配角可通过上门、电话、视频通话或外景出现。'],
 ['长期扩展','未来可进入房地产、租房买房、教育留学、补习与加盟、广告投放、内容创业、客户合作、投资、工作、恋爱、家庭、节日、政策与邻里关系等主题，同时保持三人的房东租客关系和职业视角不变。']
]); },
characters(){ return `${section('核心人物','现实职业保留，人物性格适度夸张',`<div class="grid grid-3">${character('James','房东／房地产从业者','J','avatar-james',['讲规则','理性','重视资产价值','擅长判断客户','表面嫌弃租客，实际会帮他们'],'任何事情都先考虑房屋价值、租金回报、客户需求与新加坡规则；负责带出房地产、租房和本地生活视角。',['不可以每集都像在卖房','不可以永远只讲规则','不可以把客户当工具人','要有判断失误和被租客反制的时候'])}${character('Angeline','租客／教育创业者','A','avatar-angeline',['反应快','资源整合能力强','什么都想变成项目','喜欢掌控局面','不愿意浪费机会'],'任何人和资源都可能被她连接成教育、留学、补习、加盟或商业合作；负责推动剧情和中国观众视角。',['不可以每集都硬卖教育','不可以永远精明正确','需要偶尔项目翻车','要保留真实、直接和有人情味的一面'])}${character('Joseph','租客／社交媒体营销人','J','avatar-joseph',['对流量敏感','随时想拍内容','懂广告投放','创意跳跃','有时为了效果过头'],'任何事情都先判断能不能拍、能不能爆、要不要投广告；负责把日常冲突变成内容并制造新的麻烦。',['不可以只拿手机拍摄','不可以把他演成不专业','需要真正解决营销问题','要有流量判断失误和反转'])}</div>`)}
 ${section('角色常见反应与口头表达','用于写剧本时快速保持人物一致',`<div class="grid grid-3">${card('James','<ul class="list"><li>“这样会影响房子的价值。”</li><li>“客户等下要来看房。”</li><li>先算租金、回报和风险</li><li>最后还是帮两位租客收拾残局</li></ul>')}${card('Angeline','<ul class="list"><li>“这个人有没有孩子？”</li><li>“这个可以做成一个项目。”</li><li>“为什么不可以？”</li><li>先整合资源，再通知另外两个人</li></ul>')}${card('Joseph','<ul class="list"><li>“等一下，再来一次，我刚才没拍到。”</li><li>“这个可以先投一点广告测试。”</li><li>任何冲突先判断有没有流量</li><li>为了内容效果经常把事情弄得更复杂</li></ul>')}</div>`)}`; },
relations(){ return `${section('人物关系','固定关系决定每一集的冲突方式',`<div class="grid grid-2">${card('James × Angeline','<p><strong>房产价值 vs 教育项目</strong></p><p>James 想保护房屋与客户体验，Angeline 经常想把空间和客户资源变成新的教育或商业项目。</p>')}${card('James × Joseph','<p><strong>看房秩序 vs 内容流量</strong></p><p>James 需要专业接待客户，Joseph 却总想拍摄、制造话题或测试广告效果。</p>')}${card('Angeline × Joseph','<p><strong>商业项目 vs 营销流量</strong></p><p>Angeline 提出项目，Joseph 负责包装和投放；两个人很容易在 James 不知情时把客厅变成活动现场。</p>')}${card('三人整体关系','<div class="callout"><strong>表面互相嫌弃，实际已经像一家人。</strong></div>')}</div>`)}
 ${section('关系发展原则','第一季不是只有单集笑点，还要让关系慢慢升级',`<div class="timeline"><div class="timeline-item"><h4>陌生与试探</h4><p>入住初期，大家用规则和小心思保护自己。</p></div><div class="timeline-item"><h4>摩擦与依赖</h4><p>生活习惯不断冲突，但开始互相帮忙。</p></div><div class="timeline-item"><h4>真正成为一家人</h4><p>发生生病、搬走、新租客等事件后，三人才意识到彼此的重要性。</p></div></div>`)}`; },
season(){ const phases=['入住篇','生活习惯篇','新加坡文化篇','关系升级篇']; return `${section('第一季：新租客来了','30集作为第一季，围绕搬进来、适应生活、建立关系',`<div class="tabs">${phases.map((p,i)=>`<button class="tab-btn ${i===0?'active':''}" onclick="filterEpisodes('${p}',this)">${p}</button>`).join('')}<button class="tab-btn" onclick="filterEpisodes('全部',this)">全部</button></div><div id="episodeGrid" class="episode-grid">${renderEpisodes('入住篇')}</div>`)}`; },
ideas(){ return `${section('剧情题材库','长期题材分类，不只服务第一季',`<div class="grid grid-3">${Object.entries(topicGroups).map(([k,v])=>card(k,`<div class="filters">${v.map(x=>badge(x)).join('')}</div>`)).join('')}</div>`)}${section('团队灵感箱','内容统一保存；连接 Cloudflare D1 后，三位成员在不同设备上都能实时看到',`<div id="ideasTable">${ideasTable()}</div>`)}`; },
episode(){ return `${section('单集资料页模板','每一集都应使用同一套字段',`<div class="table-wrap"><table><thead><tr><th>栏目</th><th>内容示例</th></tr></thead><tbody>${[['集数','EP01'],['标题','新租客来了'],['系列','入住篇'],['核心文化点','新加坡租房'],['主角','James、Angeline、Joseph'],['配角','无'],['场景','客厅'],['时长','2–4分钟'],['剧情状态','灵感／大纲／剧本／已拍／已剪／已发布'],['编剧','姓名'],['导演','姓名'],['拍摄日期','日期'],['发布日期','日期'],['发布平台','抖音／小红书／视频号／YouTube'],['道具','合同、行李箱、钥匙'],['备注','注意租房信息准确性']].map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>`)}${section('每集内容结构','所有正式剧本必须包括',`<div class="grid grid-3">${['开场钩子：前3秒发生什么','剧情冲突：谁想做什么，谁阻止','反转：最后发生什么意外','文化信息：观众真正学到什么','完整台词：按角色区分','镜头表：全景、特写、反应镜头','发布文案：各平台标题和简介'].map((x,i)=>card(`0${i+1}`,`<p>${x}</p>`)).join('')}</div>`)}`; },
scripts(){ return `${section('剧本中心','统一版本，避免拍摄时使用错误稿件',kanban([['灵感箱',['空调遥控器失踪了','新加坡为什么到处排队']],['待讨论',['纸巾不是垃圾','谁睡最大间']],['编写中',['第一次见房东']],['最终版',[]]]))}${section('版本管理规则','每份剧本必须可追溯',`<div class="grid grid-3">${card('必要字段','<ul class="list"><li>版本号</li><li>最后修改人</li><li>修改日期</li><li>修改记录</li><li>批准人</li></ul>')}${card('状态流程','<p>灵感箱 → 待讨论 → 已通过 → 编写中 → 待修改 → 最终版 → 已拍摄 → 已发布</p>')}${card('核心原则','<p>拍摄现场只使用“最终版”。任何临时改词都要在拍摄后补录到最新版本。</p>')}</div>`)}`; },
production(){ return `${section('制作进度','从选题到发布的完整制作看板',kanban([['前期',['选题','大纲','剧本','场景','演员','道具','服装']],['拍摄',['待拍','已排期','拍摄中','需要补拍','已完成']],['后期',['粗剪','精剪','字幕','音效','封面','审核']],['发布',['待发布','已发布','数据复盘']]]))}`; },
schedule(){ return `${section('拍摄日程','建议一次集中拍摄 4–8 集，不要一集拍一次',`<div class="table-wrap"><table><thead><tr><th>日期</th><th>时间</th><th>地点</th><th>拍摄集数</th><th>出席</th><th>服装与道具</th><th>状态</th></tr></thead><tbody><tr><td>待定</td><td>待定</td><td>James 家客厅</td><td>EP01–EP04</td><td>James / Angeline / Joseph</td><td>钥匙、行李箱、租房合同</td><td>${badge('待排期','yellow')}</td></tr></tbody></table></div>`)}${section('每次拍摄必须记录','避免遗漏',`<div class="grid grid-3">${['日期','时间','地点','拍摄集数','出席演员','工作人员','所需服装','所需道具','预计完成时间','是否需要外景','是否需要补拍'].map(x=>card(x,'<p>由制片或现场负责人更新。</p>')).join('')}</div>`)}`; },
team(){ return `${section('核心团队','当前固定成员',`<div class="grid grid-3">${teamCard('James','房东／房地产从业者／演员','负责房东与房产角色、场地协调、房地产题材和新加坡生活信息把关')}${teamCard('Angeline','租客／教育创业者／项目策划／演员','负责教育与商业题材、项目方向、剧情推动、市场定位及中国观众视角')}${teamCard('Joseph','租客／社交媒体营销人／演员','负责社交媒体、内容制作、广告投放题材，以及项目后续内容传播与营销视角')}</div>`)}${section('未来团队职位','新成员加入后可建立成员档案与权限',`<div class="grid grid-4">${['演员','编剧','导演','摄影','收音','剪辑','字幕','运营','商务','道具','服装','制片'].map(x=>card(x,'<p>可设为固定成员或项目制成员。</p>')).join('')}</div>`)}${section('成员档案字段','统一记录',`<div class="callout">姓名、照片、职位、联系方式、加入日期、是否固定成员、职责、查看权限、编辑权限、管理员权限。</div>`)}`; },
supporting(){ return `${section('配角与客串角色','配角应可重复出现，逐步建立完整宇宙',`<div class="grid grid-3">${['隔壁邻居','James 的房产客户','买家与租客','合作房产中介','Angeline 的学生家长','补习中心经营者','教育加盟投资人','Joseph 的广告客户','内容创作者','平台客户经理','新租客','快递员','清洁阿姨','ICA 工作人员','小贩中心老板'].map(x=>card(x,'<p>记录人设、与主角关系、首次出现集数、可重复剧情和演员资料。</p>')).join('')}</div>`)}`; },
singapore(){ const cats=['租房','交通','饮食','工作','教育','法律与罚款','节日','语言','社交习惯','政府服务','医疗','银行','手机与网络']; return `${section('新加坡资料库','所有文化与政策信息必须准确并注明来源',`<div class="grid grid-4">${cats.map(x=>card(x,'<p>保存主题说明、官方来源、最后核实日期、可对应剧集、是否已使用。</p>')).join('')}</div>`)}${section('资料条目标准','防止短剧传播错误信息',`<div class="table-wrap"><table><thead><tr><th>字段</th><th>要求</th></tr></thead><tbody><tr><td>主题</td><td>明确到一个可拍摄的问题</td></tr><tr><td>简单说明</td><td>用观众听得懂的话解释</td></tr><tr><td>官方来源</td><td>优先政府、法定机构或官方运营方</td></tr><tr><td>最后核实日期</td><td>政策与费用类内容必须更新</td></tr><tr><td>对应剧集</td><td>标记可以融入哪一集</td></tr><tr><td>是否已使用</td><td>避免重复或方便制作续集</td></tr></tbody></table></div>`)}`; },
analytics(){ return `${section('发布与数据','每集发布后统一记录，找出真正有效的内容模式',`<div class="grid grid-4">${['播放量','点赞','评论','分享','收藏','新增粉丝','完播率','最受欢迎评论'].map((x,i)=>statCard(x,'—','0%')).join('')}</div>`)}${section('复盘问题','数据不是为了汇报，而是为了决定下一集拍什么',`<div class="grid grid-2">${card('内容表现','<ul class="list"><li>哪种新加坡文化最受欢迎？</li><li>哪种冲突最好笑？</li><li>哪些题材值得拍续集？</li></ul>')}${card('人物表现','<ul class="list"><li>哪个角色最受欢迎？</li><li>观众最喜欢哪组人物关系？</li><li>哪个平台效果最好？</li></ul>')}</div>`)}`; },
brand(){ return `${section('品牌与视觉规范','以后团队扩大后，任何人制作内容都应保持一致',`<div class="grid grid-3">${['Logo','中文名称','英文名称','字体','标准颜色','片头','片尾','字幕样式','封面模板','角色名字显示方式','背景音乐规范','Logo使用规则'].map(x=>card(x,'<p>待品牌确认后上传或填写最终标准。</p>')).join('')}</div>`)}${section('当前临时规范','第一版网站使用的视觉方向',`<div class="grid grid-3">${card('主色','<p>深蓝代表稳定世界观；暖橙代表生活冲突与喜剧节奏。</p>')}${card('视觉气质','<p>生活化、现代、清晰，不做低质夸张综艺感。</p>')}${card('字幕原则','<p>中文为主，重点词可保留 Singlish 或英文，并给出自然解释。</p>')}</div>`)}`; },
public(){ return `${section('网站分区','前期先做内部版，未来再开放对外版',`<div class="grid grid-2">${card('内部版','<ul class="list"><li>剧本</li><li>拍摄日程</li><li>联系方式</li><li>未发布内容</li><li>制作预算</li><li>内部讨论</li><li>数据表现</li></ul>')}${card('对外版','<ul class="list"><li>项目介绍</li><li>人物介绍</li><li>已发布剧集</li><li>幕后花絮</li><li>合作方式</li><li>演员招募</li><li>品牌合作</li><li>联系方式</li></ul>')}</div>`)}${section('第一版完成标准','任何新加入的人，在30分钟内必须看懂',`<div class="callout">这是什么项目、自己演谁或负责什么、目前拍到哪里、下一步要做什么。</div>`)}`; }
};

function statCard(label,num,percent){ return `<article class="card"><div class="stat"><div><div class="stat-label">${label}</div><div class="stat-number">${num}</div></div>${badge(percent)}</div><div class="progress"><span style="width:${percent}"></span></div></article>`; }
function quick(title,desc,page){ return `<article class="card"><h4>${title}</h4><p>${desc}</p><button class="ghost-btn" onclick="location.hash='${page}'">进入</button></article>`; }
function introPage(title,subtitle,items,extra=''){ return `${section(title,subtitle,`<div class="grid grid-2">${items.map(x=>card(x[0],`<p>${x[1]}</p>`)).join('')}</div>`)}${extra}`; }
function rules(){ const r=['必须有剧情，不可以只是讲知识','必须有冲突，不可以三个人一直聊天','每集只讲一个核心问题','新加坡信息必须准确','不过度丑化任何国家或群体','笑点来自人物性格，而不是单纯扮丑','商业植入不能破坏剧情']; return section('内容原则','创作时必须遵守',`<div class="grid grid-3">${r.map((x,i)=>card(`原则 ${i+1}`,`<p>${x}</p>`)).join('')}</div>`); }
function character(name,role,letter,avatar,traits,func,limits){ return `<article class="card character-card"><div class="character-avatar ${avatar}">${letter}</div><span class="badge">${role}</span><h4 style="font-size:22px;margin-top:10px">${name}</h4><p><strong>核心性格</strong></p><div class="filters">${traits.map(x=>badge(x)).join('')}</div><p><strong>戏剧功能</strong></p><p>${func}</p><p><strong>不能出现的问题</strong></p><ul class="list">${limits.map(x=>`<li>${x}</li>`).join('')}</ul></article>`; }
function renderEpisodes(filter){ return episodes.filter(e=>filter==='全部'||e[2]===filter).map(e=>`<article class="episode"><div class="episode-num">EP${String(e[0]).padStart(2,'0')}</div><h4>${e[1]}</h4><p>${e[2]}</p></article>`).join(''); }
window.filterEpisodes=(filter,btn)=>{ document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.getElementById('episodeGrid').innerHTML=renderEpisodes(filter); };
function ideasTable(){ if(!state.ideas.length) return '<div class="empty">暂无灵感</div>'; return `<div class="table-wrap"><table><thead><tr><th>标题</th><th>分类</th><th>一句话剧情</th><th>角色</th><th>场景</th><th>状态</th></tr></thead><tbody>${state.ideas.map(i=>`<tr><td><strong>${i.title}</strong></td><td>${i.category}</td><td>${i.summary}</td><td>${i.lead}</td><td>${i.scene}</td><td>${badge(SharedIdeas.statusLabel(i.statusCode || i.status, 'zh'), (i.statusCode || i.status)==='discussion' || i.status==='待讨论' ? 'yellow' : '')}</td></tr>`).join('')}</tbody></table></div>`; }
function kanban(cols){ return `<div class="kanban">${cols.map(([name,items])=>`<div class="kanban-col"><h4>${name}<span>${items.length}</span></h4>${items.map(i=>`<div class="kanban-item"><strong>${i}</strong><br><small>待负责人更新</small></div>`).join('')}</div>`).join('')}</div>`; }
function teamCard(name,title,desc){ return `<article class="card"><div class="character-avatar ${name==='James'?'avatar-james':name==='Angeline'?'avatar-angeline':'avatar-joseph'}">${name[0]}</div><h4>${name}</h4><span class="badge">${title}</span><p>${desc}</p></article>`; }

function render(){ if(!pages[state.page]) state.page='home'; renderNav(); pageTitle.textContent=navItems.find(x=>x[0]===state.page)?.[1]||'首页'; content.innerHTML=pages[state.page](); }
window.addEventListener('hashchange',()=>{ state.page=location.hash.replace('#','')||'home'; render(); window.scrollTo(0,0); });

document.getElementById('menuBtn').onclick=()=>sidebar.classList.toggle('open');
const modal=document.getElementById('ideaModal');
window.openIdeaModal=()=>{ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); };
document.getElementById('addIdeaBtn').onclick=openIdeaModal;
document.querySelectorAll('[data-close-modal]').forEach(x=>x.onclick=()=>{ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
document.getElementById('ideaForm').onsubmit=async(e)=>{ e.preventDefault(); const d=Object.fromEntries(new FormData(e.target)); const saved=await SharedIdeas.add({...d,statusCode:'idea'}); state.ideas.unshift(saved); e.target.reset(); modal.classList.remove('open'); if(state.page==='ideas') render(); };
document.getElementById('resetBtn').onclick=async()=>{ await SharedIdeas.reset(); state.ideas=JSON.parse(JSON.stringify(defaultIdeas)); SharedIdeas.setLocal(state.ideas); render(); };
SharedIdeas.load(defaultIdeas).then(ideas=>{ state.ideas=ideas; render(); });
