CREATE TABLE IF NOT EXISTS ideas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL,
  lead TEXT NOT NULL DEFAULT '',
  scene TEXT NOT NULL DEFAULT '',
  status_code TEXT NOT NULL DEFAULT 'idea',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);

CREATE TABLE IF NOT EXISTS scripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  status_code TEXT NOT NULL DEFAULT 'idea',
  owner TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT 'v0.1',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(season_no, episode_no)
);
CREATE INDEX IF NOT EXISTS idx_scripts_status ON scripts(status_code);

CREATE TABLE IF NOT EXISTS schedules (
 id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT NOT NULL DEFAULT '',call_time TEXT NOT NULL DEFAULT '',start_time TEXT NOT NULL DEFAULT '',end_time TEXT NOT NULL DEFAULT '',location TEXT NOT NULL DEFAULT '',episodes TEXT NOT NULL DEFAULT '',cast TEXT NOT NULL DEFAULT '',crew TEXT NOT NULL DEFAULT '',owner TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'planning',issues TEXT NOT NULL DEFAULT '',timeline TEXT NOT NULL DEFAULT '',wardrobe_props TEXT NOT NULL DEFAULT '',notes TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date);

CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role_zh TEXT NOT NULL DEFAULT '',
  role_en TEXT NOT NULL DEFAULT '',
  responsibilities_zh TEXT NOT NULL DEFAULT '',
  responsibilities_en TEXT NOT NULL DEFAULT '',
  contact TEXT NOT NULL DEFAULT '',
  member_type TEXT NOT NULL DEFAULT 'permanent',
  status TEXT NOT NULL DEFAULT 'active',
  is_core INTEGER NOT NULL DEFAULT 0,
  permissions TEXT NOT NULL DEFAULT 'view',
  sort_order INTEGER NOT NULL DEFAULT 0,
  joined_at TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(is_core DESC, sort_order ASC);


CREATE TABLE IF NOT EXISTS episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  season_no INTEGER NOT NULL DEFAULT 1,
  episode_no INTEGER NOT NULL,
  title_zh TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  category_zh TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  summary_zh TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  script_status TEXT NOT NULL DEFAULT 'idea',
  production_stage TEXT NOT NULL DEFAULT 'outline',
  owner TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'medium',
  shoot_date TEXT NOT NULL DEFAULT '',
  publish_date TEXT NOT NULL DEFAULT '',
  progress INTEGER NOT NULL DEFAULT 0,
  open_issues TEXT NOT NULL DEFAULT '',
  open_issues_en TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT 'v0.1',
  script_zh TEXT NOT NULL DEFAULT '',
  script_en TEXT NOT NULL DEFAULT '',
  culture_point_zh TEXT NOT NULL DEFAULT '',
  culture_point_en TEXT NOT NULL DEFAULT '',
  views INTEGER NOT NULL DEFAULT 0,
  retention_30 REAL NOT NULL DEFAULT 0,
  retention_60 REAL NOT NULL DEFAULT 0,
  avg_watch_seconds REAL NOT NULL DEFAULT 0,
  completion_rate REAL NOT NULL DEFAULT 0,
  next_episode_rate REAL NOT NULL DEFAULT 0,
  followers_gained INTEGER NOT NULL DEFAULT 0,
  top_comment TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(season_no, episode_no)
);
CREATE INDEX IF NOT EXISTS idx_episodes_stage ON episodes(season_no, production_stage);
CREATE INDEX IF NOT EXISTS idx_episodes_season ON episodes(season_no, episode_no);
CREATE INDEX IF NOT EXISTS idx_episodes_script_status ON episodes(script_status);
CREATE INDEX IF NOT EXISTS idx_episodes_shoot_date ON episodes(shoot_date);


-- v26 preserved Season 1 data recovery. Safe to run repeatedly.
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(1,'富二代租了最小的房间','The Wealthy Student Rents the Smallest Room','入住篇','Moving In','富二代租了最小的房间：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Wealthy Student Rents the Smallest Room: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Angeline','high','2026-08-02','',72,'道具未完成','v0.1','EP01《富二代租了最小的房间》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP01 “The Wealthy Student Rents the Smallest Room”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(2,'房东的二十条规则','The Landlord’s Twenty Rules','入住篇','Moving In','房东的二十条规则：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Landlord’s Twenty Rules: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Joseph','medium','2026-08-02','',45,'等待大纲确认','v0.1','EP02《房东的二十条规则》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP02 “The Landlord’s Twenty Rules”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(3,'她只带了一个登机箱','She Arrived with Just One Carry-On','入住篇','Moving In','她只带了一个登机箱：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Arrived with Just One Carry-On: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Angeline','high','2026-08-02','',55,'剧情大纲待确认','v0.1','EP03《她只带了一个登机箱》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP03 “She Arrived with Just One Carry-On”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(4,'客厅不是你的仓库','The Living Room Is Not Your Storage Room','入住篇','Moving In','客厅不是你的仓库：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Living Room Is Not Your Storage Room: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','James','medium','2026-08-09','',35,'','v0.1','EP04《客厅不是你的仓库》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP04 “The Living Room Is Not Your Storage Room”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(5,'这个房间配不上这张床','This Room Is Not Good Enough for This Bed','入住篇','Moving In','这个房间配不上这张床：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','This Room Is Not Good Enough for This Bed: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','James','high','2026-08-09','',30,'房屋规则清单待定','v0.1','EP05《这个房间配不上这张床》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP05 “This Room Is Not Good Enough for This Bed”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(6,'房东不准她换门锁','The Landlord Won’t Let Her Change the Lock','入住篇','Moving In','房东不准她换门锁：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Landlord Won’t Let Her Change the Lock: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Angeline','high','2026-08-09','',40,'押金条款需核实','v0.1','EP06《房东不准她换门锁》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP06 “The Landlord Won’t Let Her Change the Lock”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(7,'空调遥控器失踪了','The Air-Con Remote Has Gone Missing','生活习惯篇','Living Habits','空调遥控器失踪了：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Air-Con Remote Has Gone Missing: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Joseph','medium','2026-08-16','',48,'','v0.1','EP07《空调遥控器失踪了》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP07 “The Air-Con Remote Has Gone Missing”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(8,'一顿饭，三种算法','One Meal, Three Ways to Split the Bill','生活习惯篇','Living Habits','一顿饭，三种算法：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','One Meal, Three Ways to Split the Bill: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Angeline','medium','2026-08-16','',42,'洗衣场景待确认','v0.1','EP08《一顿饭，三种算法》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP08 “One Meal, Three Ways to Split the Bill”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(9,'她请了人来打扫自己的房间','She Hired Someone to Clean Her Room','生活习惯篇','Living Habits','她请了人来打扫自己的房间：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Hired Someone to Clean Her Room: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','James','low','2026-08-16','',38,'','v0.1','EP09《她请了人来打扫自己的房间》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP09 “She Hired Someone to Clean Her Room”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(10,'外卖员比房东更熟这个家','The Delivery Rider Knows the House Better Than the Landlord','生活习惯篇','Living Habits','外卖员比房东更熟这个家：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Delivery Rider Knows the House Better Than the Landlord: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Angeline','medium','2026-08-23','',40,'进口食材道具','v0.1','EP10《外卖员比房东更熟这个家》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP10 “The Delivery Rider Knows the House Better Than the Landlord”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(11,'谁拆了我的快递','Who Opened My Parcel?','生活习惯篇','Living Habits','谁拆了我的快递：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Who Opened My Parcel?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Joseph','medium','2026-08-23','',44,'家务服务费用待核实','v0.1','EP11《谁拆了我的快递》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP11 “Who Opened My Parcel?”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(12,'Joseph把客厅变成了摄影棚','Joseph Turns the Living Room into a Studio','生活习惯篇','Living Habits','Joseph把客厅变成了摄影棚：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Joseph Turns the Living Room into a Studio: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','James','medium','2026-08-23','',70,'','v0.1','EP12《Joseph把客厅变成了摄影棚》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP12 “Joseph Turns the Living Room into a Studio”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(13,'房东带客户回家看房','The Landlord Brings Clients Home for a Viewing','生活习惯篇','Living Habits','房东带客户回家看房：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Landlord Brings Clients Home for a Viewing: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','Angeline','high','2026-08-30','',76,'清洁道具','v0.1','EP13《房东带客户回家看房》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP13 “The Landlord Brings Clients Home for a Viewing”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(14,'她成了房产广告里的租客','She Ends Up in a Property Advertisement','生活习惯篇','Living Habits','她成了房产广告里的租客：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Ends Up in a Property Advertisement: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','Joseph','medium','2026-08-30','',74,'配角未确认','v0.1','EP14《她成了房产广告里的租客》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP14 “She Ends Up in a Property Advertisement”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(15,'一张沙发退了三次','The Sofa Was Returned Three Times','生活习惯篇','Living Habits','一张沙发退了三次：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Sofa Was Returned Three Times: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','James','low','2026-08-30','',71,'家具改造方案','v0.1','EP15《一张沙发退了三次》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP15 “The Sofa Was Returned Three Times”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(16,'楼下邻居上来投诉了','The Downstairs Neighbour Comes Up to Complain','新加坡文化篇','Singapore Culture','楼下邻居上来投诉了：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Downstairs Neighbour Comes Up to Complain: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Joseph','high','2026-09-06','',82,'小贩中心外景许可','v0.1','EP16《楼下邻居上来投诉了》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP16 “The Downstairs Neighbour Comes Up to Complain”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(17,'她第一次被管理处警告','Her First Warning from Management','新加坡文化篇','Singapore Culture','她第一次被管理处警告：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Her First Warning from Management: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Angeline','high','2026-09-06','',84,'餐盘外景','v0.1','EP17《她第一次被管理处警告》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP17 “Her First Warning from Management”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(18,'有钱也买不到这个时间段','Even Money Cannot Buy This Time Slot','新加坡文化篇','Singapore Culture','有钱也买不到这个时间段：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Even Money Cannot Buy This Time Slot: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','James','medium','2026-09-06','',80,'Singlish台词校对','v0.1','EP18《有钱也买不到这个时间段》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP18 “Even Money Cannot Buy This Time Slot”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(19,'Joseph发错了一条视频','Joseph Posts the Wrong Video','新加坡文化篇','Singapore Culture','Joseph发错了一条视频：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Joseph Posts the Wrong Video: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Angeline','medium','2026-09-13','',79,'巴士外景','v0.1','EP19《Joseph发错了一条视频》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP19 “Joseph Posts the Wrong Video”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(20,'一个差评，三个人失眠','One Bad Review Keeps Three People Awake','新加坡文化篇','Singapore Culture','一个差评，三个人失眠：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','One Bad Review Keeps Three People Awake: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','Joseph','high','2026-09-13','',88,'素材备份待确认','v0.1','EP20《一个差评，三个人失眠》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP20 “One Bad Review Keeps Three People Awake”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(21,'晚上十一点的“在吗”','The 11 P.M. “Are You There?” Message','新加坡文化篇','Singapore Culture','晚上十一点的“在吗”：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The 11 P.M. “Are You There?” Message: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','James','medium','2026-09-13','',86,'补拍垃圾房镜头','v0.1','EP21《晚上十一点的“在吗”》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP21 “The 11 P.M. “Are You There?” Message”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(22,'AI替谁做了这份工作','Whose Job Did AI Just Do?','新加坡文化篇','Singapore Culture','AI替谁做了这份工作：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Whose Job Did AI Just Do?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','Angeline','high','2026-09-20','',90,'罚款信息待核实','v0.1','EP22《AI替谁做了这份工作》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP22 “Whose Job Did AI Just Do?”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(23,'便宜七成的报价单','A Quote That Is Seventy Percent Cheaper','新加坡文化篇','Singapore Culture','便宜七成的报价单：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','A Quote That Is Seventy Percent Cheaper: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Joseph','medium','2026-09-20','',92,'粗剪中','v0.1','EP23《便宜七成的报价单》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP23 “A Quote That Is Seventy Percent Cheaper”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(24,'钱到底什么时候到','When Is the Payment Actually Coming?','关系升级篇','Relationship Growth','钱到底什么时候到：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','When Is the Payment Actually Coming?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Joseph','high','2026-09-20','',94,'等待字幕','v0.1','EP24《钱到底什么时候到》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP24 “When Is the Payment Actually Coming?”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(25,'朋友，还是客户','Friend or Client?','关系升级篇','Relationship Growth','朋友，还是客户：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Friend or Client?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Angeline','medium','2026-09-27','',91,'房间改造素材','v0.1','EP25《朋友，还是客户》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP25 “Friend or Client?”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(26,'她第一次认真算自己的学费','She Calculates Her Tuition Fees for the First Time','关系升级篇','Relationship Growth','她第一次认真算自己的学费：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Calculates Her Tuition Fees for the First Time: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','James','high','2026-09-27','',96,'封面待确认','v0.1','EP26《她第一次认真算自己的学费》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP26 “She Calculates Her Tuition Fees for the First Time”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(27,'租金吃掉了一个好生意','Rent Killed a Good Business','关系升级篇','Relationship Growth','租金吃掉了一个好生意：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Rent Killed a Good Business: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Angeline','high','2026-09-27','',97,'发布时间未定','v0.1','EP27《租金吃掉了一个好生意》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP27 “Rent Killed a Good Business”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(28,'不会用App的人怎么办','What Happens to People Who Cannot Use the App?','关系升级篇','Relationship Growth','不会用App的人怎么办：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','What Happens to People Who Cannot Use the App?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Joseph','high','2026-10-04','',98,'平台标题待定','v0.1','EP28《不会用App的人怎么办》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP28 “What Happens to People Who Cannot Use the App?”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(29,'这间房突然不出租了','This Room Is Suddenly No Longer for Rent','关系升级篇','Relationship Growth','这间房突然不出租了：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','This Room Is Suddenly No Longer for Rent: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Angeline','high','2026-10-04','',95,'父母视频道具','v0.1','EP29《这间房突然不出租了》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP29 “This Room Is Suddenly No Longer for Rent”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(30,'同一个屋檐下','Under One Roof','关系升级篇','Relationship Growth','同一个屋檐下：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Under One Roof: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','三人','high','2026-10-04','',99,'最终审核','v0.1','EP30《同一个屋檐下》

目标时长：4–7分钟

【开场 10–20秒】
以人物正在做的事情直接建立异常状况与本集冲突。

【第一幕：建置】
交代 Angeline、James、Joseph 各自的目标，以及本集新加坡文化或合租问题。

【第二幕：升级】
至少安排两次解决失败；三个人分别用富家留学生、房产从业者、社交媒体营销人的逻辑处理问题。

【中点反转】
出现新信息，让原本的解决办法失效。

【第三幕：高潮】
三种处理方式正面碰撞，产生清楚的结果。

【关系变化】
本集结束后，三人的关系、信任或对新加坡的理解发生一点变化。

【结尾】
用笑点、后果或下一集线索收尾。','EP30 “Under One Roof”

Target duration: 4–7 minutes

[Opening: 10–20 seconds]
Begin inside an active situation and establish the episode conflict immediately.

[Act One: Setup]
Clarify what Angeline, James and Joseph each want, plus the Singapore or shared-living issue.

[Act Two: Escalation]
Include at least two failed attempts. Each character applies a different logic: wealthy international student, property professional, and social-media marketer.

[Midpoint Reversal]
Reveal new information that makes the first solution fail.

[Act Three: Climax]
The three approaches collide and create a clear consequence.

[Relationship Beat]
End with a small change in trust, friendship or Angeline’s understanding of Singapore.

[Ending]
Close with a joke, consequence or next-episode thread.','新加坡生活、租房规则、公共习惯或本地文化差异。','Singapore living, tenancy rules, public habits or local cultural differences.');

-- v32 safety migration: soft deletion and change history.
-- Existing databases can run these statements individually if a column already exists.
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL DEFAULT '',
  action TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);


CREATE TABLE IF NOT EXISTS brand_settings (
  setting_key TEXT PRIMARY KEY,
  value_zh TEXT NOT NULL DEFAULT '',
  value_en TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  updated_by TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS availability (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 member TEXT NOT NULL DEFAULT '',
 availability_date TEXT NOT NULL DEFAULT '',
 day_of_week INTEGER NOT NULL DEFAULT 1,
 start_time TEXT NOT NULL DEFAULT '',
 end_time TEXT NOT NULL DEFAULT '',
 note TEXT NOT NULL DEFAULT '',
 deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_availability_date ON availability(availability_date,start_time);
