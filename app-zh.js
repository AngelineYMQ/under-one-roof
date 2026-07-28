const navGroups = [
  {id:'home', label:'首页工作台', icon:'⌂', page:'home'},
  {id:'project', label:'项目设定', icon:'◎', children:[['positioning','项目定位'],['world','世界观设定'],['brand','品牌规范'],['public','内部版与对外版']]},
  {id:'characters-assets', label:'角色与资产', icon:'♙', children:[['characters','人物档案'],['relations','人物关系'],['supporting','配角资料']]},
  {id:'episode-management', label:'剧集管理', icon:'▤', children:[['season','全部剧集'],['special','特别篇'],['scripts','剧本中心'],['production','制作进度']]},
  {id:'shooting', label:'拍摄中心', icon:'◷', children:[['availability-common','三人共同时间'],['schedule','拍摄日程与通告单']]},
  {id:'resources', label:'创作资料库', icon:'✦', children:[['ideas','剧情题材库'],['singapore','新加坡资料库']]},
  {id:'team-group', label:'团队成员', icon:'♟', page:'team'},
  {id:'publishing', label:'发布与复盘', icon:'↗', page:'analytics'}
];
const navItems = navGroups.flatMap(g => g.page ? [[g.page,g.label,g.icon]] : g.children.map(([id,label])=>[id,label,g.icon]));

const episodes = [
[1,"富二代租了最小的房间","入住篇"],[2,"房东的二十条规则","入住篇"],[3,"她只带了一个登机箱","入住篇"],[4,"客厅不是你的仓库","入住篇"],[5,"这个房间配不上这张床","入住篇"],[6,"房东不准她换门锁","入住篇"],
[7,"空调遥控器失踪了","生活习惯篇"],[8,"一顿饭，三种算法","生活习惯篇"],[9,"她请了人来打扫自己的房间","生活习惯篇"],[10,"外卖员比房东更熟这个家","生活习惯篇"],[11,"谁拆了我的快递","生活习惯篇"],[12,"Joseph把客厅变成了摄影棚","生活习惯篇"],
[13,"房东带客户回家看房","生活习惯篇"],[14,"她成了房产广告里的租客","生活习惯篇"],[15,"一张沙发退了三次","生活习惯篇"],[16,"楼下邻居上来投诉了","新加坡文化篇"],[17,"她第一次被管理处警告","新加坡文化篇"],[18,"有钱也买不到这个时间段","新加坡文化篇"],
[19,"Joseph发错了一条视频","新加坡文化篇"],[20,"一个差评，三个人失眠","新加坡文化篇"],[21,"晚上十一点的“在吗”","新加坡文化篇"],[22,"AI替谁做了这份工作","新加坡文化篇"],[23,"便宜七成的报价单","新加坡文化篇"],[24,"钱到底什么时候到","关系升级篇"],
[25,"朋友，还是客户","关系升级篇"],[26,"她第一次认真算自己的学费","关系升级篇"],[27,"租金吃掉了一个好生意","关系升级篇"],[28,"不会用App的人怎么办","关系升级篇"],[29,"这间房突然不出租了","关系升级篇"],[30,"同一个屋檐下","关系升级篇"]
];

const topicGroups = {
"合租生活":["房租","押金","水电","空调","洗衣","洗厕所","打扫","噪音","带朋友回家","冰箱","煮饭","快递","宠物","作息","公共区域"],
"新加坡文化":["Chope","Singlish","小贩中心","排队","MC","HDB","Condo","MRT","巴士","ERP","COE","CPF","Singpass","National Day","Hawker Culture"],
"中国留学生初到新加坡":["找房","电话卡","银行开户","看医生","找工作","申请准证","交通","购物","饮食","学校","租房合同","中介","天气","英语口音"],
"三人关系":["吵架","冷战","生日","失恋","失业","生病","借钱","误会","秘密","互相帮助","新朋友","家人来访"],
"校园、房产与内容":["学校报到","小组作业","学生证","校园食堂","房产看房","租售谈判","学校报到","留学生社交","家长查岗","广告投放","内容拍摄","平台算法","客户转化","跨行业合作","创业项目","投资人"],
"节日和热点":["农历新年","国庆节","中秋节","圣诞节","开斋节","屠妖节","双十一","高考","新加坡大选","演唱会","新政策"]
};

const defaultIdeas = [
 {title:"空调遥控器失踪了",category:"合租生活",summary:"James限制空调时长，遥控器却突然不见，最后发现被Joseph藏进冰箱。",lead:"三人",scene:"客厅",status:"灵感箱"},
 {title:"纸巾不是垃圾",category:"新加坡文化",summary:"Joseph看到桌上纸巾顺手丢掉，Angeline回来发现座位被别人坐了。",lead:"Joseph",scene:"小贩中心",status:"待讨论"},
 {title:"为什么有钱还租小房间",category:"中国留学生初到新加坡",summary:"客人追问 Angeline 为什么只租一个小房间，她坚持说不是没钱，而是被广角照片骗了；James 立刻纠正照片没有骗人。",lead:"三人",scene:"客厅",status:"待讨论"}
];


function parseRoute(raw){
  const route=(raw||'home').replace(/^#/,'');
  let m;
  if((m=route.match(/^episode-(\d{1,2})$/))) return {page:'season',episode:+m[1],route};
  if((m=route.match(/^(season|scripts|analytics)-season-([123])$/))) return {page:m[1],season:+m[2],route};
  if((m=route.match(/^production-(board|list|calendar)-season-([123])$/))) return {page:'production',productionView:m[1],season:+m[2],route};
  if(route==='production') return {page:'production',productionView:'board',season:1,route};
  if((m=route.match(/^schedule-(cards|calendar|list)$/))) return {page:'schedule',scheduleView:m[1],route};
  if(route==='schedule') return {page:'schedule',scheduleView:'cards',route};
  return {page:route,route};
}
function currentRoute(){return parseRoute(location.hash.replace('#','')||'home');}
function goRoute(route){if(location.hash.replace('#','')===route){render();}else{location.hash=route;}}

let state = {
  page: currentRoute().page,
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
  nav.innerHTML = navGroups.map(group=>{
    if(group.page){
      return `<button class="nav-btn nav-primary ${state.page===group.page?'active':''}" data-page="${group.page}"><span class="nav-icon">${group.icon}</span><span>${group.label}</span></button>`;
    }
    const active = group.children.some(([id])=>id===state.page || (id==='season'&&state.page==='season') || (id==='production'&&state.page==='production') || (id==='schedule'&&state.page==='schedule') || (id==='availability-common'&&state.page.startsWith('availability')));
    return `<div class="nav-group ${active?'open':''}" data-nav-group="${group.id}">
      <button class="nav-group-toggle ${active?'active-parent':''}" type="button"><span class="nav-icon">${group.icon}</span><span>${group.label}</span><span class="nav-chevron">⌄</span></button>
      <div class="nav-submenu">${group.children.map(([id,label])=>`<button class="nav-sub-btn ${state.page===id || (id==='season'&&state.page==='season') || (id==='production'&&state.page==='production') || (id==='schedule'&&state.page==='schedule') || (id==='availability-common'&&state.page.startsWith('availability'))?'active':''}" data-page="${id}">${label}</button>`).join('')}</div>
    </div>`;
  }).join('');
  nav.querySelectorAll('[data-page]').forEach(btn=>btn.onclick=()=>{ goRoute(btn.dataset.page==='season'?'season-season-1':btn.dataset.page==='production'?'production-board-season-1':btn.dataset.page==='schedule'?'schedule-cards':btn.dataset.page); sidebar.classList.remove('open'); });
  nav.querySelectorAll('.nav-group-toggle').forEach(btn=>btn.onclick=()=>btn.closest('.nav-group').classList.toggle('open'));
}

const pages = {
home(){ return SharedEpisodes.dashboardPage('zh'); },
positioning(){ return introPage('项目定位','这不是普通搞笑账号，而是一套可以持续扩展的短剧 IP。',[
 ['项目名称','暂定《同一个屋檐下》。名称可更换，但内部世界观与人物关系可先建立。'],
 ['一句话介绍','一名刚到新加坡的中国富二代留学生，误签下一间比照片小很多的房间，与做房地产的房东和做社交媒体广告的租客住在同一屋檐下。'],
 ['核心观众','对新加坡感兴趣的中国观众；准备来新加坡的人；已在新加坡生活的中国人；新加坡本地华人；喜欢生活类轻喜剧的观众。'],
 ['内容特点','新加坡真实文化、中国留学生的文化冲击、合租生活、房地产、社交媒体营销、校园生活、客户故事、轻喜剧、实用信息、固定人物关系与连续世界观。']
], rules()); },
world(){ return introPage('世界观设定','客厅只是舞台，人物关系才是真正的核心。',[
 ['故事背景','James 是房东，也从事房地产；Joseph 是长期租客，并从事社交媒体营销、内容制作与广告投放。Angeline 是刚到新加坡读书的中国富二代留学生。她为了证明自己能够独立，拒绝家里安排的高级公寓，只看网上精修照片便签下一年租约。到达后才发现房间远比照片小，但她不愿损失押金，更不愿向家里承认自己选错，只能继续住下去。'],
 ['固定场景','客厅、沙发、饭桌、厨房、房间门口、大门、走廊、楼下、电梯、附近小贩中心、超市、巴士站。前期主要拍 James 家客厅，后期逐步增加外景。'],
 ['世界观规则','James 是房东兼房地产从业者；Angeline 是中国富二代留学生，也是刚入住的新租客；Joseph 是社交媒体营销与广告投放从业者，也是长期租客；Angeline 的家庭背景优越，但她坚持对外强调自己是在独立生活；她住小房间的固定原因是看照片误签一年租约、不愿损失押金、也不愿向父母承认判断失误；三个人最终会从房东与租客发展成朋友；房子是主要场景但故事不局限于房子。'],
 ['长期扩展','未来可进入新加坡校园、留学生生活、房地产、租房买房、广告投放、内容创业、客户合作、友情、恋爱、家庭、节日、政策与邻里关系等主题，同时保留“有钱但被租约困住”的长期喜剧设定。']
]); },
characters(){ return `${section('核心人物','现实职业保留，人物性格适度夸张',`<div class="grid grid-3">${character('James','房东／房地产从业者','J','avatar-james',['讲规则','理性','重视资产价值','擅长判断客户','表面嫌弃租客，实际会帮他们'],'任何事情都先考虑房屋价值、租金回报、客户需求与新加坡规则；负责带出房地产、租房和本地生活视角。',['不可以每集都像在卖房','不可以永远只讲规则','不可以把客户当工具人','要有判断失误和被租客反制的时候'])}${character('Angeline','新租客／中国富二代留学生','A','avatar-angeline',['家境优越','行动快','有点娇气但不恶毒','习惯用钱和效率解决问题','死要面子','尚未融入新加坡'],'她代表初到新加坡的中国观众。她会对房间大小、生活规则、Singlish、公共交通、小贩中心和校园文化产生真实反应；核心笑点是“不是没钱，而是不愿损失押金和承认选错”。',['不可以只会炫富','不可以看不起本地人','不可以什么常识都没有','不可以每集都靠钱解决','必须逐渐独立和融入新加坡'])}${character('Joseph','租客／社交媒体营销人','J','avatar-joseph',['对流量敏感','随时想拍内容','懂广告投放','创意跳跃','有时为了效果过头'],'任何事情都先判断能不能拍、能不能爆、要不要投广告；负责把日常冲突变成内容并制造新的麻烦。',['不可以只拿手机拍摄','不可以把他演成不专业','需要真正解决营销问题','要有流量判断失误和反转'])}</div>`)}
 ${section('角色常见反应与口头表达','用于写剧本时快速保持人物一致',`<div class="grid grid-3">${card('James','<ul class="list"><li>“这样会影响房子的价值。”</li><li>“客户等下要来看房。”</li><li>先算租金、回报和风险</li><li>最后还是帮两位租客收拾残局</li></ul>')}${card('Angeline','<ul class="list"><li>“我不是没钱，我是被照片骗了。”</li><li>“多少钱可以解决？”</li><li>“为什么新加坡不可以？”</li><li>嘴上嫌弃房间小，却绝不承认自己选错</li></ul>')}${card('Joseph','<ul class="list"><li>“等一下，再来一次，我刚才没拍到。”</li><li>“这个可以先投一点广告测试。”</li><li>任何冲突先判断有没有流量</li><li>为了内容效果经常把事情弄得更复杂</li></ul>')}</div>`)}`; },
relations(){ return `${section('人物关系','固定关系决定每一集的冲突方式',`<div class="grid grid-2">${card('James × Angeline','<p><strong>房东规则 vs 富家留学生</strong></p><p>James 坚持租约、押金和房屋规则；Angeline 认为很多问题可以花钱解决，却又不肯白白损失押金，也不愿承认自己被照片误导。</p>')}${card('James × Joseph','<p><strong>看房秩序 vs 内容流量</strong></p><p>James 需要专业接待客户，Joseph 却总想拍摄、制造话题或测试广告效果。</p>')}${card('Angeline × Joseph','<p><strong>大小姐日常 vs 内容流量</strong></p><p>Joseph 把 Angeline 初到新加坡的文化冲击当成天然内容；Angeline 一边嫌弃他偷拍，一边又在意视频里自己是否好看。</p>')}${card('三人整体关系','<div class="callout"><strong>表面互相嫌弃，实际已经像一家人。</strong></div>')}</div>`)}
 ${section('关系发展原则','第一季不是只有单集笑点，还要让关系慢慢升级',`<div class="timeline"><div class="timeline-item"><h4>陌生与试探</h4><p>入住初期，大家用规则和小心思保护自己。</p></div><div class="timeline-item"><h4>摩擦与依赖</h4><p>生活习惯不断冲突，但开始互相帮忙。</p></div><div class="timeline-item"><h4>真正成为一家人</h4><p>发生生病、搬走、新租客等事件后，三人才意识到彼此的重要性。</p></div></div>`)}`; },
episodeManagement(){ return SharedEpisodes.managementPage('zh'); },
season(){ const r=currentRoute(); setTimeout(()=>{if(r.season)SharedEpisodes.setSeason(r.season);},80); return SharedEpisodes.seasonPage('zh'); },
special(){ return SharedSpecial.page('zh'); },
ideas(){ return `${section('剧情题材库','长期题材分类，不只服务第一季',`<div class="grid grid-3">${Object.entries(topicGroups).map(([k,v])=>card(k,`<div class="filters">${v.map(x=>badge(x)).join('')}</div>`)).join('')}</div>`)}${section('团队灵感箱','内容统一保存；连接 Cloudflare D1 后，三位成员在不同设备上都能实时看到',`<div id="ideasTable">${ideasTable()}</div>`)}`; },
episode(){ return `${section('单集资料页模板','每一集都应使用同一套字段',`<div class="table-wrap"><table><thead><tr><th>栏目</th><th>内容示例</th></tr></thead><tbody>${[['集数','EP01'],['标题','富二代租了最小的房间'],['系列','入住篇'],['核心文化点','新加坡租房'],['主角','James、Angeline、Joseph'],['配角','无'],['场景','客厅'],['时长','4–7分钟'],['剧情状态','灵感／大纲／剧本／已拍／已剪／已发布'],['编剧','姓名'],['导演','姓名'],['拍摄日期','日期'],['发布日期','日期'],['发布平台','抖音／小红书／视频号／YouTube'],['道具','合同、行李箱、钥匙'],['备注','明确“广角照片、已签一年租约、押金与面子”三项设定']].map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>`)}${section('每集内容结构','所有正式剧本必须包括',`<div class="grid grid-3">${['标题与封面句：观众一眼看懂冲突','开场钩子：前10–20秒建立人物处境与异常事件','第一幕建置：交代人物目标、场景和冲突起点','剧情目标：谁想做什么','阻力与升级：谁阻止，事情如何越来越严重','中段反转：让观众继续看下去','高潮与最终反转：兑现标题承诺','结尾钩子／互动问题：促进评论或下一集追看','完整台词：按角色和动作拆分','镜头与剪辑：景别、反应镜头、字幕、音效','发布文案：各平台标题、简介和标签','数据复盘：首30秒留存、平均观看时长、完播率、追集率与评论反馈'].map((x,i)=>card(`0${i+1}`,`<p>${x}</p>`)).join('')}</div>`)}`; },
scripts(){ const r=currentRoute(); setTimeout(()=>{if(r.season)SharedEpisodes.setSeason(r.season);},80); return SharedEpisodes.scriptsPage('zh'); },
production(){ const r=currentRoute(); setTimeout(()=>{if(r.season)SharedEpisodes.setSeason(r.season); if(r.productionView)SharedEpisodes.setProductionView(r.productionView);},80); return SharedEpisodes.productionPage('zh'); },
availability(){ return availabilityPageZh(); },
'availability-common'(){ return availabilityPageZh('overlap'); },
'availability-members'(){ return availabilityPageZh('people'); },
'availability-dates'(){ return availabilityPageZh('week'); },
schedule(){ const r=currentRoute(); scheduleViewModeZh=r.scheduleView||'cards'; return schedulePageZh(); },
team(){ return teamPage('zh'); },
supporting(){ return supportingPage('zh'); },
singapore(){ const cats=['租房','交通','饮食','工作','教育','法律与罚款','节日','语言','社交习惯','政府服务','医疗','银行','手机与网络']; return `${section('新加坡资料库','所有文化与政策信息必须准确并注明来源',`<div class="grid grid-4">${cats.map(x=>card(x,'<p>保存主题说明、官方来源、最后核实日期、可对应剧集、是否已使用。</p>')).join('')}</div>`)}${section('资料条目标准','防止短剧传播错误信息',`<div class="table-wrap"><table><thead><tr><th>字段</th><th>要求</th></tr></thead><tbody><tr><td>主题</td><td>明确到一个可拍摄的问题</td></tr><tr><td>简单说明</td><td>用观众听得懂的话解释</td></tr><tr><td>官方来源</td><td>优先政府、法定机构或官方运营方</td></tr><tr><td>最后核实日期</td><td>政策与费用类内容必须更新</td></tr><tr><td>对应剧集</td><td>标记可以融入哪一集</td></tr><tr><td>是否已使用</td><td>避免重复或方便制作续集</td></tr></tbody></table></div>`)}`; },
analytics(){ const r=currentRoute(); setTimeout(()=>{if(r.season)SharedEpisodes.setSeason(r.season);},80); return SharedEpisodes.analyticsPage('zh'); },
brand(){ return SharedBrand.page('zh'); },
public(){ return `${section('网站分区','前期先做内部版，未来再开放对外版',`<div class="grid grid-2">${card('内部版','<ul class="list"><li>剧本</li><li>拍摄日程</li><li>联系方式</li><li>未发布内容</li><li>制作预算</li><li>内部讨论</li><li>数据表现</li></ul>')}${card('对外版','<ul class="list"><li>项目介绍</li><li>人物介绍</li><li>已发布剧集</li><li>幕后花絮</li><li>合作方式</li><li>演员招募</li><li>品牌合作</li><li>联系方式</li></ul>')}</div>`)}${section('第一版完成标准','任何新加入的人，在30分钟内必须看懂',`<div class="callout">这是什么项目、自己演谁或负责什么、目前拍到哪里、下一步要做什么。</div>`)}`; }
};

const episodeHooksZh = [
'“这是我的房间？我家衣帽间都比这个大。”','Angeline拿出手机：“照片里的房间呢？”','第八个行李箱推进来时，James沉默了。','客人一句话问住她：“你这么有钱，为什么住这里？”','James拿出一张长到拖地的房屋规则。','James说押金不退，Angeline立刻改口。',
'James发现空调开着、窗户也开着。','Angeline盯着洗衣机：“哪个按钮是叫阿姨？”','James把本月电费账单放在桌上。','Joseph误吃了Angeline空运来的食材。','Angeline宣布：“以后家务全部外包。”','James闻到榴梿味后冲进客厅。','镜头一开，Angeline戴着手套站在厕所门口。','James回家发现客厅坐满陌生同学。','Angeline把设计图摊开：“客厅需要升级。”',
'Angeline把占座纸巾当垃圾丢了。','Angeline端着餐盘站着不动：“没人送过来吗？”','Angeline认真问：“Can can是不是更可以？”','巴士开走后，她才发现自己坐过站。','她刚要喝水，James和Joseph同时喊停。','她提着垃圾站在楼道：“到底丢哪里？”','James列出三件“有钱也不能做”的事。','暴雨突然落下，只有Angeline冲回家拿伞。',
'Joseph把摄像头对准她：“第一次做家务，开始。”','她要用一间小房的钱改造一间小房。','James带客户进门，Angeline正嫌弃这间房。','家里不接电话后，她第一次必须自己处理问题。','视频爆了，但所有评论都在问她会不会洗厕所。','父母的视频电话突然打来：“给我们看看你住哪里。”','Angeline收拾行李要走，却发现自己舍不得。'
];
function episodeDetailZh(ep){
 const [num,title,phase]=ep;
 const hook=episodeHooksZh[num-1];
 const isFirst=num===1;
 return {
  status:isFirst?'脚本初稿':'剧情大纲', duration:'4–7分钟', scene:num<=15?'James 家客厅／房间门口':'客厅＋必要外景', cast:'James、Angeline、Joseph',
  hook,
  five:`在开场30秒内完成角色入场、当集事件和三人立场的建立，让观众清楚这集为什么会继续升级。`,
  goal:`Angeline想用自己的方式解决“${title}”的问题，同时维护她有钱、独立、绝不承认选错的形象。`,
  obstacle:`James坚持新加坡规则、租约或房屋管理逻辑；Joseph则把冲突当成内容机会，使问题进一步扩大。`,
  mid:`第二幕通过至少两次失败尝试持续升级：先让观众以为问题可以轻易解决，再揭示真正障碍不是钱，而是规则、面子或三人的关系。`,
  climax:`第三幕让三个人的方案同时碰撞，形成完整高潮、结果与关系变化；反转必须兑现标题，但不能只有一句梗就结束。`,
  ending:`用一句短反转结束，并留下可评论的问题：这件事到底谁更合理？`,
  culture:`围绕“${title}”只讲一个真实的新加坡生活点；政策、费用或规则类信息发布前必须核实。`,
  script:isFirst?[
   '【镜头1／门口全景】Angeline拖着多个行李箱进门，环顾四周。',
   'Angeline：我的房间在哪里？',
   'James指向旁边的小门：这里。',
   'Angeline：我是问房间，不是储物间。',
   'James：这就是你的房间。',
   '【镜头2／手机特写】Angeline打开租房照片反复对比。',
   'Angeline：照片里面明明很大。',
   'James：照片没有骗人，是广角镜头。',
   'Joseph举起手机：你这个反应很好，再说一次，我刚才没录到。',
   'Angeline：我要退租。',
   'James：提前退租，押金不退。',
   '【停顿＋三人反应镜头】',
   'Angeline：其实小一点……比较有安全感。'
  ]:[
   `【第一幕·场景1／开场】${hook}`,
   `【第一幕·场景2】交代当天的具体事件、人物关系和“${title}”为什么现在必须解决。`,
   `【第一幕·场景3】Angeline提出看似有效的办法；James从房东或本地规则角度反对；Joseph先观察并准备把事情变成内容。`,
   `【第一幕转折】一个新的条件出现，使三个人都无法退出，只能继续处理。`,
   `【第二幕·场景4】第一次解决尝试。Angeline主导，但因为不了解本地习惯或过度自信而失败。`,
   `【第二幕·场景5】James接手，用最稳妥的方法处理，却被Angeline或Joseph打乱。`,
   `【第二幕·场景6】Joseph为了流量、广告效果或拍摄素材介入，短期看似成功，却制造更严重的后果。`,
   `【中点反转】三人发现真正的问题不是钱，而是规则、面子、误会或彼此不信任。`,
   `【第二幕后半】三个人互相指责，旧矛盾被带出；同时加入一段能推动人物关系的真心话或弱点暴露。`,
   `【第二幕低点】事情发展到最糟，原计划彻底失败，甚至影响房子、客户、学校或三人的关系。`,
   `【第三幕·场景7】三人不得不合作。每个人用自己的优势贡献一部分解决方案。`,
   `【高潮】围绕“${title}”完成动作、对白和人物关系三层反转，而不是只靠一句笑话结束。`,
   `【结果】问题被解决或留下合理代价，说明这次事件真正改变了什么。`,
   `【尾声】三人恢复日常，但出现一个新的小冲突或下一集线索。`,
   `【片尾梗】用10–20秒补一个角色笑点，可独立剪成宣传片段。`
  ]
 };
}
window.openEpisodeDetail=(number)=>{
 const ep=episodes.find(e=>e[0]===number); if(!ep)return; const d=episodeDetailZh(ep);
 document.getElementById('episodeModalTitle').textContent=`EP${String(ep[0]).padStart(2,'0')} · ${ep[1]}`;
 document.getElementById('episodeModalEyebrow').textContent='单集创作工作区';
 document.getElementById('episodeModalBody').innerHTML=`
 <div class="episode-summary-grid">${[['阶段',ep[2]],['状态',d.status],['建议时长',d.duration],['主要场景',d.scene]].map(x=>`<div class="episode-summary-item"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div>
 <div class="metric-strip"><div class="metric-box"><strong>短剧时长</strong><span>每集建议4–7分钟，允许完整场景和人物关系发展。</span></div><div class="metric-box"><strong>三幕结构</strong><span>第一幕建置、第二幕升级、第三幕高潮与结果。</span></div><div class="metric-box"><strong>场景数量</strong><span>建议4–7个场景，每场都必须推动剧情或关系。</span></div><div class="metric-box"><strong>发布后指标</strong><span>首30秒留存、平均观看时长、完播率与追集率。</span></div></div>
 <div class="script-grid">
 ${[['标题／封面句',ep[1]],['开场钩子／前20秒',d.hook],['第一幕建置／前30秒',d.five],['人物目标',d.goal],['阻力与冲突升级',d.obstacle],['中段反转',d.mid],['高潮／最终反转',d.climax],['结尾钩子',d.ending],['新加坡文化点',d.culture]].map((x,i)=>`<div class="script-block ${i===8?'full':''}"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}
 <div class="script-block full"><h4>完整脚本／分场台词</h4><ol class="script-lines">${d.script.map(x=>`<li>${x}</li>`).join('')}</ol></div>
 <div class="script-block full"><h4>拍摄后数据记录</h4><p>平台、发布日期、正片长度、首30秒留存率、1分钟留存率、平均观看时长、完播率、追集率、点赞率、评论率、分享率、收藏率、新增粉丝、最佳评论、下一集优化。</p></div>
 </div>`;
 const m=document.getElementById('episodeModal');m.classList.add('open');m.setAttribute('aria-hidden','false');
};
const episodeModal=document.getElementById('episodeModal');
document.querySelectorAll('[data-close-episode-modal]').forEach(x=>x.onclick=()=>{episodeModal.classList.remove('open');episodeModal.setAttribute('aria-hidden','true');});

function statCard(label,num,percent){ return `<article class="card"><div class="stat"><div><div class="stat-label">${label}</div><div class="stat-number">${num}</div></div>${badge(percent)}</div><div class="progress"><span style="width:${percent}"></span></div></article>`; }
function quick(title,desc,page){ return `<article class="card"><h4>${title}</h4><p>${desc}</p><button class="ghost-btn" onclick="location.hash='${page}'">进入</button></article>`; }
function introPage(title,subtitle,items,extra=''){ return `${section(title,subtitle,`<div class="grid grid-2">${items.map(x=>card(x[0],`<p>${x[1]}</p>`)).join('')}</div>`)}${extra}`; }
function rules(){ const r=['必须有剧情，不可以只是讲知识','必须有冲突，不可以三个人一直聊天','每集只讲一个核心问题','新加坡信息必须准确','不过度丑化任何国家或群体','笑点来自人物性格，而不是单纯扮丑','商业植入不能破坏剧情']; return section('内容原则','创作时必须遵守',`<div class="grid grid-3">${r.map((x,i)=>card(`原则 ${i+1}`,`<p>${x}</p>`)).join('')}</div>`); }
function character(name,role,letter,avatar,traits,func,limits){ return `<article class="card character-card"><div class="character-avatar ${avatar}">${letter}</div><span class="badge">${role}</span><h4 style="font-size:22px;margin-top:10px">${name}</h4><p><strong>核心性格</strong></p><div class="filters">${traits.map(x=>badge(x)).join('')}</div><p><strong>戏剧功能</strong></p><p>${func}</p><p><strong>不能出现的问题</strong></p><ul class="list">${limits.map(x=>`<li>${x}</li>`).join('')}</ul></article>`; }
function renderEpisodes(filter){ return episodes.filter(e=>filter==='全部'||e[2]===filter).map(e=>`<article class="episode" role="button" tabindex="0" onclick="openEpisodeDetail(${e[0]})" onkeydown="if(event.key==='Enter')openEpisodeDetail(${e[0]})"><div class="episode-num">EP${String(e[0]).padStart(2,'0')}</div><h4>${e[1]}</h4><p>${e[2]} · 点击查看短剧大纲与分场脚本</p></article>`).join(''); }
window.filterEpisodes=(filter,btn)=>{ document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.getElementById('episodeGrid').innerHTML=renderEpisodes(filter); };
function ideasTable(){ if(!state.ideas.length) return '<div class="empty">暂无灵感</div>'; return `<div class="table-wrap"><table><thead><tr><th>标题</th><th>分类</th><th>一句话剧情</th><th>角色</th><th>场景</th><th>状态</th></tr></thead><tbody>${state.ideas.map(i=>`<tr><td><strong>${i.title}</strong></td><td>${i.category}</td><td>${i.summary}</td><td>${i.lead}</td><td>${i.scene}</td><td>${badge(SharedIdeas.statusLabel(i.statusCode || i.status, 'zh'), (i.statusCode || i.status)==='discussion' || i.status==='待讨论' ? 'yellow' : '')}</td></tr>`).join('')}</tbody></table></div>`; }
function kanban(cols){ return `<div class="kanban">${cols.map(([name,items])=>`<div class="kanban-col"><h4>${name}<span>${items.length}</span></h4>${items.map(i=>`<div class="kanban-item"><strong>${i}</strong><br><small>待负责人更新</small></div>`).join('')}</div>`).join('')}</div>`; }
function teamCard(name,title,desc){ return `<article class="card"><div class="character-avatar ${name==='James'?'avatar-james':name==='Angeline'?'avatar-angeline':'avatar-joseph'}">${name[0]}</div><h4>${name}</h4><span class="badge">${title}</span><p>${desc}</p></article>`; }

function render(){ const r=currentRoute(); state.page=r.page; if(!pages[state.page]) state.page='home'; renderNav(); const availabilityTitle=['availability','availability-common','availability-members','availability-dates'].includes(state.page)?'三人共同时间':null; pageTitle.textContent=availabilityTitle||navItems.find(x=>x[0]===state.page)?.[1]||'首页'; content.dataset.page=state.page; content.innerHTML=pages[state.page](); const r2=currentRoute(); if(r2.episode){setTimeout(()=>SharedEpisodes.open(r2.episode),180);} }
window.addEventListener('hashchange',()=>{ state.page=currentRoute().page; render(); window.scrollTo(0,0); });

document.getElementById('menuBtn').onclick=()=>sidebar.classList.toggle('open');
const modal=document.getElementById('ideaModal');
window.openIdeaModal=()=>{ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); };
document.getElementById('addIdeaBtn')?.addEventListener('click',openIdeaModal);
document.querySelectorAll('[data-close-modal]').forEach(x=>x.onclick=()=>{ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
document.getElementById('ideaForm').onsubmit=async(e)=>{ e.preventDefault(); const d=Object.fromEntries(new FormData(e.target)); const saved=await SharedIdeas.add({...d,statusCode:'idea'}); state.ideas.unshift(saved); e.target.reset(); modal.classList.remove('open'); if(state.page==='ideas') render(); };

// Render immediately from local data so the dashboard never waits for D1/API startup.
render();

// Refresh shared ideas in the background. Only redraw the ideas page when its data changes.
const refreshSharedIdeas = () => SharedIdeas.load(defaultIdeas, { timeoutMs: 3500 }).then(ideas=>{
  const changed = JSON.stringify(ideas) !== JSON.stringify(state.ideas);
  state.ideas = ideas;
  if(changed && state.page==='ideas') render();
}).catch(()=>{});

if('requestIdleCallback' in window){
  requestIdleCallback(refreshSharedIdeas, { timeout: 1200 });
}else{
  setTimeout(refreshSharedIdeas, 0);
}

const productionStagesZh = [
 {id:'outline',name:'选题与大纲',color:'purple',episodes:[1,2,3,4,5,6]},
 {id:'writing',name:'剧本编写',color:'blue',episodes:[7,8,9,10,11]},
 {id:'locked',name:'剧本已锁定',color:'cyan',episodes:[12,13,14,15]},
 {id:'shoot',name:'待拍摄',color:'yellow',episodes:[16,17,18,19]},
 {id:'filmed',name:'拍摄完成',color:'orange',episodes:[20,21,22]},
 {id:'post',name:'后期制作',color:'pink',episodes:[23,24,25]},
 {id:'publish',name:'待发布／已发布',color:'green',episodes:[26,27,28,29,30]}
];
const productionMetaZh = {
 1:['Angeline','高','2026-08-02','道具未完成',72],2:['Joseph','中','2026-08-02','等待大纲确认',45],3:['Angeline','高','2026-08-02','行李箱数量待确认',55],4:['James','中','2026-08-09','无',35],5:['James','高','2026-08-09','房屋规则清单待定',30],6:['Angeline','高','2026-08-09','押金条款需核实',40],7:['Joseph','中','2026-08-16','无',48],8:['Angeline','中','2026-08-16','洗衣场景待确认',42],9:['James','低','2026-08-16','无',38],10:['Angeline','中','2026-08-23','进口食材道具',40],11:['Joseph','中','2026-08-23','家务服务费用待核实',44],12:['James','中','2026-08-23','无',70],13:['Angeline','高','2026-08-30','清洁道具',76],14:['Joseph','中','2026-08-30','配角未确认',74],15:['James','低','2026-08-30','家具改造方案',71],16:['Joseph','高','2026-09-06','小贩中心外景许可',82],17:['Angeline','高','2026-09-06','餐盘外景',84],18:['James','中','2026-09-06','Singlish台词校对',80],19:['Angeline','中','2026-09-13','巴士外景',79],20:['Joseph','高','2026-09-13','素材备份待确认',88],21:['James','中','2026-09-13','补拍垃圾房镜头',86],22:['Angeline','高','2026-09-20','罚款信息待核实',90],23:['Joseph','中','2026-09-20','粗剪中',92],24:['Joseph','高','2026-09-20','等待字幕',94],25:['Angeline','中','2026-09-27','房间改造素材',91],26:['James','高','2026-09-27','封面待确认',96],27:['Angeline','高','2026-09-27','发布时间未定',97],28:['Joseph','高','2026-10-04','平台标题待定',98],29:['Angeline','高','2026-10-04','父母视频道具',95],30:['三人','高','2026-10-04','最终审核',99]
};
function productionCardZh(n){ const ep=episodes.find(e=>e[0]===n),m=productionMetaZh[n]; const blocked=m[3]!=='无'; return `<article class="prod-card ${blocked?'is-blocked':''}" onclick="openEpisodeDetail(${n})"><div class="prod-card-top"><span>EP${String(n).padStart(2,'0')}</span><span class="priority priority-${m[1]}">${m[1]}优先级</span></div><h4>${ep[1]}</h4><div class="prod-meta"><span>负责人：${m[0]}</span><span>拍摄：${m[2]}</span></div><div class="prod-progress"><i style="width:${m[4]}%"></i></div><div class="prod-card-bottom"><span>${m[4]}%</span><span class="${blocked?'blocker':'clear'}">${blocked?'⚠ '+m[3]:'✓ 无待处理问题'}</span></div></article>`; }
function productionDashboardZh(){ const total=episodes.length,locked=productionStagesZh.find(x=>x.id==='locked').episodes.length,shoot=productionStagesZh.find(x=>x.id==='shoot').episodes.length,post=productionStagesZh.find(x=>x.id==='post').episodes.length,pub=productionStagesZh.find(x=>x.id==='publish').episodes.length,blocked=Object.values(productionMetaZh).filter(x=>x[3]!=='无').length; return `${section('制作总览','每张卡片代表一集，按制作阶段推进；标红表示该集仍有问题需要处理',`<div class="production-toolbar"><div class="production-tabs"><button class="active" onclick="setProdViewZh('board',this)">看板</button><button onclick="setProdViewZh('list',this)">列表</button><button onclick="setProdViewZh('calendar',this)">拍摄日历</button></div><div class="production-filters"><input id="prodSearchZh" placeholder="搜索集数或标题" oninput="filterProductionZh()"><select id="prodOwnerZh" onchange="filterProductionZh()"><option value="">全部负责人</option><option>Angeline</option><option>James</option><option>Joseph</option><option>三人</option></select><select id="prodPriorityZh" onchange="filterProductionZh()"><option value="">全部优先级</option><option>高</option><option>中</option><option>低</option></select><label><input type="checkbox" id="prodBlockedZh" onchange="filterProductionZh()"> 只看待处理问题</label></div></div><div class="prod-stats">${[['总集数',total],['剧本已锁定',locked],['待拍摄',shoot],['后期制作',post],['待发布／已发布',pub],['有待处理问题',blocked]].map((x,i)=>`<div class="prod-stat s${i}"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div><div id="productionViewZh">${renderProdBoardZh()}</div>`)}`; }
function renderProdBoardZh(){ return `<div class="episode-kanban">${productionStagesZh.map(st=>`<section class="episode-stage stage-${st.color}" data-stage="${st.id}"><header><div><span class="stage-dot"></span><h4>${st.name}</h4></div><strong>${st.episodes.length}</strong></header><div class="stage-cards">${st.episodes.map(productionCardZh).join('')}</div></section>`).join('')}</div>`; }
function renderProdListZh(){ return `<div class="table-wrap prod-table"><table><thead><tr><th>集数</th><th>标题</th><th>阶段</th><th>负责人</th><th>优先级</th><th>拍摄日期</th><th>完成度</th><th>待处理问题</th></tr></thead><tbody>${productionStagesZh.flatMap(st=>st.episodes.map(n=>{const ep=episodes.find(e=>e[0]===n),m=productionMetaZh[n];return `<tr onclick="openEpisodeDetail(${n})"><td>EP${String(n).padStart(2,'0')}</td><td><strong>${ep[1]}</strong></td><td><span class="stage-pill stage-${st.color}">${st.name}</span></td><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td><td>${m[4]}%</td><td>${m[3]}</td></tr>`;})).join('')}</tbody></table></div>`; }
function renderProdCalendarZh(){ const by={}; Object.entries(productionMetaZh).forEach(([n,m])=>{(by[m[2]]??=[]).push(+n)}); return `<div class="shoot-calendar">${Object.keys(by).sort().map(d=>`<article><header><strong>${d}</strong><span>${by[d].length} 集</span></header><div>${by[d].map(n=>{const ep=episodes.find(e=>e[0]===n);return `<button onclick="openEpisodeDetail(${n})"><b>EP${String(n).padStart(2,'0')}</b><span>${ep[1]}</span></button>`}).join('')}</div></article>`).join('')}</div>`; }
window.setProdViewZh=(v,btn)=>{document.querySelectorAll('.production-tabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('productionViewZh').innerHTML=v==='board'?renderProdBoardZh():v==='list'?renderProdListZh():renderProdCalendarZh();};
window.filterProductionZh=()=>{const q=(document.getElementById('prodSearchZh')?.value||'').toLowerCase(),owner=document.getElementById('prodOwnerZh')?.value||'',pri=document.getElementById('prodPriorityZh')?.value||'',blocked=document.getElementById('prodBlockedZh')?.checked;document.querySelectorAll('.prod-card').forEach(card=>{const n=+card.querySelector('.prod-card-top span').textContent.replace('EP',''),m=productionMetaZh[n],ep=episodes.find(e=>e[0]===n);card.style.display=((!q||ep[1].toLowerCase().includes(q)||String(n).includes(q))&&(!owner||m[0]===owner)&&(!pri||m[1]===pri)&&(!blocked||m[3]!=='无'))?'':'none';});};

/* v64 shared team availability */
let availabilityZh=[];
const availabilitySeedZh=[
 {member:'Angeline',availabilityDate:'2026-08-04',dayOfWeek:2,startTime:'10:00',endTime:'14:00',note:'上午与午餐时段'},
 {member:'James',availabilityDate:'2026-08-04',dayOfWeek:2,startTime:'11:00',endTime:'16:00',note:'下午前可拍'},
 {member:'Joseph',availabilityDate:'2026-08-04',dayOfWeek:2,startTime:'12:00',endTime:'18:00',note:'午后较方便'},
 {member:'Angeline',availabilityDate:'2026-08-08',dayOfWeek:6,startTime:'10:00',endTime:'17:00',note:'周六优先'},
 {member:'James',availabilityDate:'2026-08-08',dayOfWeek:6,startTime:'09:00',endTime:'15:00',note:''},
 {member:'Joseph',availabilityDate:'2026-08-08',dayOfWeek:6,startTime:'11:00',endTime:'19:00',note:''}
];
const weekZh=['周一','周二','周三','周四','周五','周六','周日'];
const memberClassZh={Angeline:'av-angeline',James:'av-james',Joseph:'av-joseph'};
function availabilityPageZh(mode='overlap'){availabilityModeZh=mode;setTimeout(initAvailabilityZh,0);return `${section('三人共同时间','记录 Angeline、James 与 Joseph 具体有空的日期和时间，系统会自动找出三个人都方便的共同空档。',`<div class="availability-head"><div><span class="availability-kicker">团队共享排期</span><p>先登记各自时间，再从共同空档安排拍摄。</p></div><button class="primary-btn" onclick="openAvailabilityZh()">＋ 添加有空时间</button></div><div class="availability-tabs"><button class="${mode==='overlap'?'active':''}" onclick="setAvailabilityViewZh('overlap')">共同空档</button><button class="${mode==='people'?'active':''}" onclick="setAvailabilityViewZh('people')">按成员查看</button><button class="${mode==='week'?'active':''}" onclick="setAvailabilityViewZh('week')">日期总览</button></div><div id="availabilityViewZh"><div class="empty">正在载入团队时间…</div></div>`)}`;}
async function initAvailabilityZh(){availabilityZh=await SharedAvailability.load(availabilitySeedZh);renderAvailabilityZh();}
let availabilityModeZh='overlap';
window.setAvailabilityViewZh=(v)=>{const route=v==='people'?'availability-members':v==='week'?'availability-dates':'availability-common';location.hash=route;};
function toMinZh(t){const [h,m]=String(t).split(':').map(Number);return h*60+m}function fmtMinZh(n){return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`}
function dateLabelZh(v){if(!v)return '未设置日期';const d=new Date(v+'T00:00:00');return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} · ${weekZh[(d.getDay()+6)%7]}`}
function commonSlotsZh(){const out=[];const dates=[...new Set(availabilityZh.map(x=>x.availabilityDate).filter(Boolean))];for(const date of dates){const groups=['Angeline','James','Joseph'].map(m=>availabilityZh.filter(x=>x.member===m&&x.availabilityDate===date));if(groups.some(g=>!g.length))continue;for(const a of groups[0])for(const j of groups[1])for(const o of groups[2]){const s=Math.max(toMinZh(a.startTime),toMinZh(j.startTime),toMinZh(o.startTime)),e=Math.min(toMinZh(a.endTime),toMinZh(j.endTime),toMinZh(o.endTime));if(e-s>=60)out.push({availabilityDate:date,startTime:fmtMinZh(s),endTime:fmtMinZh(e),minutes:e-s})}}return out.sort((a,b)=>a.availabilityDate.localeCompare(b.availabilityDate)||a.startTime.localeCompare(b.startTime));}
function renderAvailabilityZh(){const el=document.getElementById('availabilityViewZh');if(!el)return;if(availabilityModeZh==='people')el.innerHTML=renderAvailabilityPeopleZh();else if(availabilityModeZh==='week')el.innerHTML=renderAvailabilityWeekZh();else el.innerHTML=renderAvailabilityOverlapZh();}
function renderAvailabilityOverlapZh(){const slots=commonSlotsZh();return `<div class="availability-summary"><div><span>已登记时间</span><strong>${availabilityZh.length}</strong></div><div><span>本周共同空档</span><strong>${slots.length}</strong></div><div><span>参与成员</span><strong>3 / 3</strong></div></div>${slots.length?`<div class="common-slot-grid">${slots.map((x,i)=>`<article class="common-slot-card"><div class="common-slot-day"><span>${dateLabelZh(x.availabilityDate)}</span><strong>${x.startTime}–${x.endTime}</strong></div><p>三个人都方便 · ${Math.round(x.minutes/60*10)/10} 小时</p><div class="common-members"><span class="av-angeline">A</span><span class="av-james">J</span><span class="av-joseph">J</span></div><button class="mini-btn" onclick="useCommonSlotZh(${i})">用这个时间安排拍摄</button></article>`).join('')}</div>`:`<div class="availability-empty"><strong>暂时没有三人共同空档</strong><p>继续添加或调整各自的有空时间，系统会自动计算重叠时段。</p></div>`}`;}
function renderAvailabilityPeopleZh(){return `<div class="availability-people">${['Angeline','James','Joseph'].map(m=>`<article class="availability-person"><header><div class="member-avatar ${memberClassZh[m]}">${m[0]}</div><div><strong>${m}</strong><span>${availabilityZh.filter(x=>x.member===m).length} 个时间段</span></div><button class="mini-btn" onclick="openAvailabilityZh('', '${m}')">＋ 添加</button></header><div class="availability-list">${availabilityZh.filter(x=>x.member===m).sort((a,b)=>(a.availabilityDate||'').localeCompare(b.availabilityDate||'')||a.startTime.localeCompare(b.startTime)).map(x=>`<button onclick="openAvailabilityZh('${x.id}')"><b>${dateLabelZh(x.availabilityDate)}</b><span>${x.startTime}–${x.endTime}</span><small>${x.note||'点击编辑'}</small></button>`).join('')||'<p class="empty-inline">尚未登记</p>'}</div></article>`).join('')}</div>`;}
function renderAvailabilityWeekZh(){const dates=[...new Set(availabilityZh.map(x=>x.availabilityDate).filter(Boolean))].sort();return `<div class="availability-week">${dates.map(date=>{const a=availabilityZh.filter(x=>x.availabilityDate===date).sort((x,y)=>x.startTime.localeCompare(y.startTime));return `<article><header><strong>${dateLabelZh(date)}</strong><span>${a.length} 段</span></header><div>${a.map(x=>`<button class="${memberClassZh[x.member]}" onclick="openAvailabilityZh('${x.id}')"><b>${x.member}</b><span>${x.startTime}–${x.endTime}</span></button>`).join('')}</div></article>`}).join('')||'<div class="availability-empty"><strong>尚未登记具体日期</strong></div>'}</div>`;}
function availabilityFormZh(x={}){return `<form id="availabilityFormZh" class="form-grid"><input type="hidden" name="id" value="${x.id||''}"><label><span>成员</span><select name="member">${['Angeline','James','Joseph'].map(m=>`<option ${x.member===m?'selected':''}>${m}</option>`).join('')}</select></label><label><span>日期</span><input type="date" name="availabilityDate" value="${x.availabilityDate||''}" required onchange="syncAvailabilityDayZh(this)"></label><input type="hidden" name="dayOfWeek" value="${x.dayOfWeek||1}"><label><span>开始时间</span><input type="time" name="startTime" value="${x.startTime||'10:00'}" required></label><label><span>结束时间</span><input type="time" name="endTime" value="${x.endTime||'14:00'}" required></label><label class="full"><span>备注</span><input name="note" value="${x.note||''}" placeholder="例如：需要提前一天确认"></label><div class="modal-actions full">${x.id?'<button type="button" class="danger-btn" onclick="deleteAvailabilityZh()">删除</button>':''}<span class="modal-spacer"></span><button type="button" class="ghost-btn" onclick="closeAvailabilityModalZh()">取消</button><button class="primary-btn">保存时间</button></div></form>`;}
window.syncAvailabilityDayZh=input=>{const f=input.form;if(!input.value||!f)return;const d=new Date(input.value+'T00:00:00');f.dayOfWeek.value=((d.getDay()+6)%7)+1;};
window.openAvailabilityZh=(id='',member='')=>{const x=availabilityZh.find(i=>String(i.id)===String(id))||{member};showAvailabilityModalZh(x.id?'编辑有空时间':'添加有空时间',availabilityFormZh(x));setTimeout(()=>document.getElementById('availabilityFormZh').onsubmit=saveAvailabilityZh,0);};
async function saveAvailabilityZh(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(d.endTime<=d.startTime){alert('结束时间必须晚于开始时间');return}let y=d.id?await SharedAvailability.update(d):await SharedAvailability.add(d);availabilityZh=d.id?availabilityZh.map(x=>String(x.id)===String(d.id)?y:x):[...availabilityZh,y];closeAvailabilityModalZh();renderAvailabilityZh();}
window.deleteAvailabilityZh=async()=>{const id=document.querySelector('#availabilityFormZh [name=id]').value;if(confirm('确定删除这个时间段？')){await SharedAvailability.remove(id);availabilityZh=availabilityZh.filter(x=>String(x.id)!==String(id));closeAvailabilityModalZh();renderAvailabilityZh();}};
window.useCommonSlotZh=i=>{const x=commonSlotsZh()[i];if(!x)return;location.hash='schedule';setTimeout(()=>openShootDayZh(),120);};
function showAvailabilityModalZh(title,body){let m=document.getElementById('availabilityModalZh');if(!m){m=document.createElement('div');m.id='availabilityModalZh';m.className='modal';m.innerHTML='<div class="modal-card"><div class="modal-header"><h3 id="availabilityModalTitleZh"></h3><button class="icon-btn" onclick="closeAvailabilityModalZh()">×</button></div><div id="availabilityModalBodyZh"></div></div>';document.body.appendChild(m)}document.getElementById('availabilityModalTitleZh').textContent=title;document.getElementById('availabilityModalBodyZh').innerHTML=body;m.classList.add('open');}
window.closeAvailabilityModalZh=()=>document.getElementById('availabilityModalZh')?.classList.remove('open');


/* v14 shared shoot schedule */
const defaultShootDaysZh=[{id:'seed-1',date:'2026-08-02',callTime:'09:00',startTime:'10:00',endTime:'17:30',location:'James 家',episodes:'EP01–EP04',cast:'James / Angeline / Joseph',crew:'现场负责人待确认',owner:'Angeline',status:'planning',issues:'八个行李箱尚未准备',timeline:'09:00 全员集合、设备布置\n09:30 走戏与灯光测试\n10:00 EP01 正式拍摄\n11:30 EP02 正式拍摄\n13:00 午餐\n14:00 EP03 正式拍摄\n15:30 EP04 正式拍摄\n17:00 补拍及环境镜头\n17:30 素材备份、收工',wardrobeProps:'EP01：到达造型；八个行李箱、手机、钥匙\nEP02：与EP01连续；租房照片、手机\nEP03：第二套日常服；衣架、鞋盒\nEP04：室内日常服；租约、计算器',notes:'停车与电梯搬运安排待确认。'}];
let shootDaysZh=[];
const shootStatusZh={planning:'筹备中',confirmed:'已确认',shooting:'拍摄中',completed:'已完成',reshoot:'需要补拍'};
function schedulePageZh(){setTimeout(initScheduleZh,0);return `${section('拍摄日程','一张卡片代表一个完整拍摄日；所有团队成员共享同一份排期与通告单',`<div class="schedule-head"><div class="schedule-stats" id="scheduleStatsZh"></div><div class="schedule-head-actions"><button class="editing-schedule-btn" onclick="openCalendarEventZh()">＋ 新建剪辑安排</button><button class="primary-btn" onclick="openShootDayZh()">＋ 新建拍摄日</button></div></div><div class="schedule-toolbar"><div class="production-tabs"><button class="${scheduleViewModeZh==='cards'?'active':''}" onclick="setScheduleViewZh('cards',this)">拍摄日</button><button class="${scheduleViewModeZh==='calendar'?'active':''}" onclick="setScheduleViewZh('calendar',this)">日历</button><button class="${scheduleViewModeZh==='list'?'active':''}" onclick="setScheduleViewZh('list',this)">列表</button></div><select id="scheduleStatusZh" onchange="renderScheduleZh()"><option value="">全部状态</option>${Object.entries(shootStatusZh).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><input id="scheduleSearchZh" placeholder="搜索日期、地点或集数" oninput="renderScheduleZh()"></div><div id="scheduleViewZh"><div class="empty">正在载入拍摄日程…</div></div>`)}`;}
async function initScheduleZh(){shootDaysZh=(await SharedSchedules.load(defaultShootDaysZh)).map(x=>({eventType:'shoot',title:'',assignee:'',...x}));renderScheduleZh();}
function filteredShootDaysZh(){const q=(document.getElementById('scheduleSearchZh')?.value||'').toLowerCase(),st=document.getElementById('scheduleStatusZh')?.value||'';return shootDaysZh.filter(x=>(!st||x.status===st)&&(!q||[x.date,x.location,x.episodes,x.cast].join(' ').toLowerCase().includes(q)));}
function scheduleStatsZh(){const a=shootDaysZh,ep=new Set(a.flatMap(x=>(x.episodes.match(/EP\d+/g)||[]))),pending=a.filter(x=>x.status!=='completed').length,issues=a.filter(x=>x.issues).length;return [['已安排拍摄日',a.length],['已排期集数',ep.size],['待完成拍摄日',pending],['待处理事项',issues]].map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('');}
function shootCardZh(x){return `<article class="shoot-day-card status-${x.status}"><header><div><span>${x.date||'日期待定'}</span><h4>${x.location||'地点待定'}</h4></div><span class="shoot-status">${shootStatusZh[x.status]||x.status}</span></header><div class="shoot-day-core"><div><small>集合／收工</small><strong>${x.callTime||'—'}–${x.endTime||'—'}</strong></div><div><small>拍摄集数</small><strong>${x.episodes||'—'}</strong></div><div><small>负责人</small><strong>${x.owner||'—'}</strong></div></div><p class="shoot-cast"><b>出席：</b>${x.cast||'待确认'}</p>${x.issues?`<div class="shoot-issue">⚠ ${x.issues}</div>`:'<div class="shoot-clear">✓ 暂无待处理事项</div>'}<footer><button class="ghost-btn" onclick="viewShootDayZh('${x.id}')">查看通告单</button><button class="ghost-btn" onclick="openShootDayZh('${x.id}')">编辑</button></footer></article>`;}
let scheduleViewModeZh='cards';let scheduleMonthZh=new Date(new Date().getFullYear(),new Date().getMonth(),1);
window.setScheduleViewZh=(v,b)=>{scheduleViewModeZh=v;const route=`schedule-${v}`;if(location.hash.replace('#','')!==route){location.hash=route;return;}document.querySelectorAll('.schedule-toolbar .production-tabs button').forEach(x=>x.classList.remove('active'));b?.classList.add('active');renderScheduleZh();};
function calendarLabelZh(){return `${scheduleMonthZh.getFullYear()}年${scheduleMonthZh.getMonth()+1}月`;} 
function monthKeyZh(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
function calendarEventsZh(){const key=monthKeyZh(scheduleMonthZh);return filteredShootDaysZh().filter(x=>(x.date||'').startsWith(key));}
function renderMonthCalendarZh(){const y=scheduleMonthZh.getFullYear(),m=scheduleMonthZh.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),offset=first.getDay();const events=calendarEventsZh();let cells='';for(let i=0;i<offset;i++)cells+='<div class="month-cell outside"></div>';for(let d=1;d<=days;d++){const date=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,items=events.filter(x=>x.date===date).sort((a,b)=>(a.startTime||a.callTime||'').localeCompare(b.startTime||b.callTime||''));cells+=`<div class="month-cell"><button class="month-day-number" onclick="openCalendarEventZh('', '${date}')">${d}</button><div class="month-events">${items.map(x=>{const isEdit=x.eventType==='editing';const time=x.startTime||x.callTime||'';const label=isEdit?(x.title||'视频剪辑'):(x.episodes||x.title||'拍摄');return `<button class="month-event ${isEdit?'editing':'shoot'}" onclick="${isEdit?`openCalendarEventZh('${x.id}')`:`viewShootDayZh('${x.id}')`}"><span>${time}</span><b>${label}</b><small>${isEdit?(x.assignee||x.owner||'未分配'):(x.location||'地点待定')}</small></button>`}).join('')}</div></div>`}return `<div class="month-calendar"><header><button class="month-nav" onclick="changeScheduleMonthZh(-1)">‹</button><h3>${calendarLabelZh()}</h3><button class="month-nav" onclick="changeScheduleMonthZh(1)">›</button></header><div class="month-weekdays">${['日','一','二','三','四','五','六'].map(x=>`<span>周${x}</span>`).join('')}</div><div class="month-grid">${cells}</div><footer><span><i class="legend-dot shoot"></i>拍摄</span><span><i class="legend-dot editing"></i>视频剪辑</span></footer></div>`;}
window.changeScheduleMonthZh=n=>{scheduleMonthZh=new Date(scheduleMonthZh.getFullYear(),scheduleMonthZh.getMonth()+n,1);renderScheduleZh();};
window.setScheduleViewZh=(v,b)=>{scheduleViewModeZh=v;const route=`schedule-${v}`;if(location.hash.replace('#','')!==route){location.hash=route;return;}document.querySelectorAll('.schedule-toolbar .production-tabs button').forEach(x=>x.classList.remove('active'));b?.classList.add('active');renderScheduleZh();};window.renderScheduleZh=()=>{const el=document.getElementById('scheduleViewZh');if(!el)return;document.getElementById('scheduleStatsZh').innerHTML=scheduleStatsZh();const a=filteredShootDaysZh();if(scheduleViewModeZh==='list')el.innerHTML=`<div class="table-wrap"><table><thead><tr><th>日期</th><th>类型</th><th>时间</th><th>事项／集数</th><th>负责人</th><th>状态</th><th></th></tr></thead><tbody>${a.map(x=>`<tr><td>${x.date}</td><td>${x.eventType==='editing'?'剪辑':'拍摄'}</td><td>${x.startTime||x.callTime||'—'}–${x.endTime||'—'}</td><td>${x.eventType==='editing'?(x.title||'视频剪辑'):(x.episodes||'—')}</td><td>${x.assignee||x.owner||'—'}</td><td>${shootStatusZh[x.status]||x.status}</td><td><button class="mini-btn" onclick="${x.eventType==='editing'?`openCalendarEventZh('${x.id}')`:`viewShootDayZh('${x.id}')`}">查看</button></td></tr>`).join('')}</tbody></table></div>`;else if(scheduleViewModeZh==='calendar')el.innerHTML=renderMonthCalendarZh();else el.innerHTML=a.filter(x=>x.eventType!=='editing').length?`<div class="shoot-day-grid">${a.filter(x=>x.eventType!=='editing').map(shootCardZh).join('')}</div>`:'<div class="empty">暂无符合条件的拍摄日</div>';};
function calendarEventFormZh(x={}){return `<form id="calendarEventFormZh" class="form-grid"><input type="hidden" name="id" value="${x.id||''}"><input type="hidden" name="eventType" value="editing"><label><span>日期</span><input type="date" name="date" value="${x.date||''}" required></label><label><span>负责人</span><select name="assignee"><option value="">未分配</option>${['Angeline','James','Joseph'].map(n=>`<option ${x.assignee===n?'selected':''}>${n}</option>`).join('')}</select></label><label><span>开始时间</span><input type="time" name="startTime" value="${x.startTime||'10:00'}" required></label><label><span>结束时间</span><input type="time" name="endTime" value="${x.endTime||'12:00'}" required></label><label class="full"><span>事项</span><input name="title" value="${x.title||''}" placeholder="例如：剪辑 EP03 粗剪版" required></label><label class="full"><span>相关集数</span><input name="episodes" value="${x.episodes||''}" placeholder="例如：EP03"></label><label class="full"><span>备注</span><textarea name="notes" rows="4">${x.notes||''}</textarea></label><input type="hidden" name="status" value="${x.status||'planning'}"><div class="modal-actions full">${x.id?'<button type="button" class="danger-btn" onclick="deleteCalendarEventZh()">删除</button>':''}<span class="modal-spacer"></span><button type="button" class="ghost-btn" onclick="closeScheduleModalZh()">取消</button><button class="primary-btn">保存剪辑安排</button></div></form>`;}
window.openCalendarEventZh=(id='',date='')=>{const x=shootDaysZh.find(i=>String(i.id)===String(id))||{eventType:'editing',date};showScheduleModalZh(x.id?'编辑剪辑安排':'新建剪辑安排',calendarEventFormZh(x));setTimeout(()=>document.getElementById('calendarEventFormZh').onsubmit=saveCalendarEventZh,0);};async function saveCalendarEventZh(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(d.endTime<=d.startTime){alert('结束时间必须晚于开始时间');return}let y=d.id?await SharedSchedules.update(d):await SharedSchedules.add(d);shootDaysZh=d.id?shootDaysZh.map(x=>String(x.id)===String(d.id)?y:x):[...shootDaysZh,y];closeScheduleModalZh();renderScheduleZh();}window.deleteCalendarEventZh=async()=>{const id=document.querySelector('#calendarEventFormZh [name=id]').value;if(confirm('确定删除这个日历事项？')){await SharedSchedules.remove(id);shootDaysZh=shootDaysZh.filter(x=>String(x.id)!==String(id));closeScheduleModalZh();renderScheduleZh();}};
function shootFormZh(x={}){return `<form id="shootDayFormZh" class="form-grid"><input type="hidden" name="id" value="${x.id||''}"><label><span>拍摄日期</span><input type="date" name="date" value="${x.date||''}" required></label><label><span>状态</span><select name="status">${Object.entries(shootStatusZh).map(([k,v])=>`<option value="${k}" ${x.status===k?'selected':''}>${v}</option>`).join('')}</select></label><label><span>集合时间</span><input type="time" name="callTime" value="${x.callTime||''}"></label><label><span>开拍时间</span><input type="time" name="startTime" value="${x.startTime||''}"></label><label><span>预计收工</span><input type="time" name="endTime" value="${x.endTime||''}"></label><label><span>负责人</span><input name="owner" value="${x.owner||''}"></label><label class="full"><span>拍摄地点</span><input name="location" value="${x.location||''}" required></label><label class="full"><span>当天拍摄集数</span><input name="episodes" value="${x.episodes||''}" placeholder="例如 EP01–EP04"></label><label class="full"><span>出席演员</span><input name="cast" value="${x.cast||''}"></label><label class="full"><span>工作人员</span><input name="crew" value="${x.crew||''}"></label><label class="full"><span>详细时间轴（每行一项）</span><textarea name="timeline" rows="8">${x.timeline||''}</textarea></label><label class="full"><span>服装与道具（按集数填写）</span><textarea name="wardrobeProps" rows="6">${x.wardrobeProps||''}</textarea></label><label class="full"><span>待处理事项</span><textarea name="issues" rows="3">${x.issues||''}</textarea></label><label class="full"><span>地点、停车、联络及其他备注</span><textarea name="notes" rows="4">${x.notes||''}</textarea></label><div class="modal-actions full">${x.id?'<button type="button" class="danger-btn" onclick="deleteShootDayZh()">删除</button>':''}<span class="modal-spacer"></span><button type="button" class="ghost-btn" onclick="closeScheduleModalZh()">取消</button><button class="primary-btn">保存拍摄日</button></div></form>`;}
window.openShootDayZh=id=>{const x=shootDaysZh.find(i=>String(i.id)===String(id))||{};showScheduleModalZh(x.id?'编辑拍摄日':'新建拍摄日',shootFormZh(x));setTimeout(()=>document.getElementById('shootDayFormZh').onsubmit=saveShootDayZh,0);};
async function saveShootDayZh(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));let y;if(d.id)y=await SharedSchedules.update(d);else y=await SharedSchedules.add(d);shootDaysZh=d.id?shootDaysZh.map(x=>String(x.id)===String(d.id)?y:x):[y,...shootDaysZh];closeScheduleModalZh();renderScheduleZh();}
window.deleteShootDayZh=async()=>{const id=document.querySelector('#shootDayFormZh [name=id]').value;if(confirm('确定删除这个拍摄日？')){await SharedSchedules.remove(id);shootDaysZh=shootDaysZh.filter(x=>String(x.id)!==String(id));closeScheduleModalZh();renderScheduleZh();}};
window.viewShootDayZh=id=>{const x=shootDaysZh.find(i=>String(i.id)===String(id));if(!x)return;showScheduleModalZh(`${x.date} · 当日通告单`,`<div class="call-sheet"><div class="call-sheet-hero"><div><span>${shootStatusZh[x.status]}</span><h3>${x.location}</h3><p>${x.episodes}</p></div><div><small>集合时间</small><strong>${x.callTime||'—'}</strong><small>预计收工</small><strong>${x.endTime||'—'}</strong></div></div><div class="call-sheet-grid"><div><small>负责人</small><strong>${x.owner||'—'}</strong></div><div><small>出席演员</small><strong>${x.cast||'—'}</strong></div><div><small>工作人员</small><strong>${x.crew||'—'}</strong></div></div><h4>当天时间轴</h4><div class="timeline-lines">${(x.timeline||'尚未填写').split('\n').map(t=>`<p>${t}</p>`).join('')}</div><h4>服装与道具</h4><div class="call-sheet-text">${(x.wardrobeProps||'尚未填写').replace(/\n/g,'<br>')}</div><h4>待处理事项</h4><div class="${x.issues?'shoot-issue':'shoot-clear'}">${x.issues||'暂无待处理事项'}</div><h4>现场备注</h4><div class="call-sheet-text">${(x.notes||'暂无').replace(/\n/g,'<br>')}</div><div class="modal-actions"><button class="ghost-btn" onclick="openShootDayZh('${x.id}')">编辑</button><button class="primary-btn" onclick="window.print()">打印／存为 PDF</button></div></div>`);};
function showScheduleModalZh(title,body){let m=document.getElementById('scheduleModalZh');if(!m){m=document.createElement('div');m.id='scheduleModalZh';m.className='modal';m.innerHTML='<div class="modal-card schedule-modal-card"><div class="modal-header"><h3 id="scheduleModalTitleZh"></h3><button class="icon-btn" onclick="closeScheduleModalZh()">×</button></div><div id="scheduleModalBodyZh"></div></div>';document.body.appendChild(m)}document.getElementById('scheduleModalTitleZh').textContent=title;document.getElementById('scheduleModalBodyZh').innerHTML=body;m.classList.add('open');}
window.closeScheduleModalZh=()=>document.getElementById('scheduleModalZh')?.classList.remove('open');
