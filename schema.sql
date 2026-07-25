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
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  episode_no INTEGER NOT NULL UNIQUE,
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
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_episodes_stage ON episodes(production_stage);
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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(2,'照片里明明不是这样','The Photos Looked Nothing Like This','入住篇','Moving In','照片里明明不是这样：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Photos Looked Nothing Like This: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Joseph','medium','2026-08-02','',45,'等待大纲确认','v0.1','EP02《照片里明明不是这样》

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
用笑点、后果或下一集线索收尾。','EP02 “The Photos Looked Nothing Like This”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(3,'她带了八个行李箱','She Brought Eight Suitcases','入住篇','Moving In','她带了八个行李箱：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Brought Eight Suitcases: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Angeline','high','2026-08-02','',55,'行李箱数量待确认','v0.1','EP03《她带了八个行李箱》

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
用笑点、后果或下一集线索收尾。','EP03 “She Brought Eight Suitcases”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(4,'有钱为什么不租整套房','Why Not Rent the Whole Unit?','入住篇','Moving In','有钱为什么不租整套房：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Why Not Rent the Whole Unit?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','James','medium','2026-08-09','',35,'','v0.1','EP04《有钱为什么不租整套房》

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
用笑点、后果或下一集线索收尾。','EP04 “Why Not Rent the Whole Unit?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(5,'房东的二十条规则','The Landlord’s Twenty Rules','入住篇','Moving In','房东的二十条规则：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Landlord’s Twenty Rules: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','James','high','2026-08-09','',30,'房屋规则清单待定','v0.1','EP05《房东的二十条规则》

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
用笑点、后果或下一集线索收尾。','EP05 “The Landlord’s Twenty Rules”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(6,'押金和面子到底哪个重要','Deposit or Pride?','入住篇','Moving In','押金和面子到底哪个重要：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Deposit or Pride?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','idea','outline','Angeline','high','2026-08-09','',40,'押金条款需核实','v0.1','EP06《押金和面子到底哪个重要》

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
用笑点、后果或下一集线索收尾。','EP06 “Deposit or Pride?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(7,'空调为什么不能一直开','Why Can’t the Air-Con Stay On?','生活习惯篇','Living Habits','空调为什么不能一直开：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Why Can’t the Air-Con Stay On?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Joseph','medium','2026-08-16','',48,'','v0.1','EP07《空调为什么不能一直开》

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
用笑点、后果或下一集线索收尾。','EP07 “Why Can’t the Air-Con Stay On?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(8,'她第一次自己洗衣服','Her First Time Doing Laundry','生活习惯篇','Living Habits','她第一次自己洗衣服：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Her First Time Doing Laundry: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Angeline','medium','2026-08-16','',42,'洗衣场景待确认','v0.1','EP08《她第一次自己洗衣服》

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
用笑点、后果或下一集线索收尾。','EP08 “Her First Time Doing Laundry”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(9,'谁又没有关灯','Who Left the Lights On?','生活习惯篇','Living Habits','谁又没有关灯：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Who Left the Lights On?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','James','low','2026-08-16','',38,'','v0.1','EP09《谁又没有关灯》

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
用笑点、后果或下一集线索收尾。','EP09 “Who Left the Lights On?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(10,'冰箱里的进口食材是谁的','Who Owns the Imported Food in the Fridge?','生活习惯篇','Living Habits','冰箱里的进口食材是谁的：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Who Owns the Imported Food in the Fridge?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Angeline','medium','2026-08-23','',40,'进口食材道具','v0.1','EP10《冰箱里的进口食材是谁的》

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
用笑点、后果或下一集线索收尾。','EP10 “Who Owns the Imported Food in the Fridge?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(11,'她想请人做全部家务','She Wants Someone Else to Do All the Housework','生活习惯篇','Living Habits','她想请人做全部家务：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Wants Someone Else to Do All the Housework: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','writing','writing','Joseph','medium','2026-08-23','',44,'家务服务费用待核实','v0.1','EP11《她想请人做全部家务》

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
用笑点、后果或下一集线索收尾。','EP11 “She Wants Someone Else to Do All the Housework”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(12,'榴梿可以带回家吗','Can Durian Come Home?','生活习惯篇','Living Habits','榴梿可以带回家吗：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Can Durian Come Home?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','James','medium','2026-08-23','',70,'','v0.1','EP12《榴梿可以带回家吗》

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
用笑点、后果或下一集线索收尾。','EP12 “Can Durian Come Home?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(13,'富二代第一次洗厕所','A Wealthy Student Cleans the Toilet','生活习惯篇','Living Habits','富二代第一次洗厕所：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','A Wealthy Student Cleans the Toilet: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','Angeline','high','2026-08-30','',76,'清洁道具','v0.1','EP13《富二代第一次洗厕所》

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
用笑点、后果或下一集线索收尾。','EP13 “A Wealthy Student Cleans the Toilet”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(14,'带同学回家要不要通知','Must She Tell the Landlord About Guests?','生活习惯篇','Living Habits','带同学回家要不要通知：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Must She Tell the Landlord About Guests?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','Joseph','medium','2026-08-30','',74,'配角未确认','v0.1','EP14《带同学回家要不要通知》

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
用笑点、后果或下一集线索收尾。','EP14 “Must She Tell the Landlord About Guests?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(15,'她想把客厅升级成豪宅风','She Wants a Luxury Living Room Makeover','生活习惯篇','Living Habits','她想把客厅升级成豪宅风：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Wants a Luxury Living Room Makeover: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','locked','James','low','2026-08-30','',71,'家具改造方案','v0.1','EP15《她想把客厅升级成豪宅风》

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
用笑点、后果或下一集线索收尾。','EP15 “She Wants a Luxury Living Room Makeover”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(16,'用纸巾占座','Tissue Paper Means Reserved','新加坡文化篇','Singapore Culture','用纸巾占座：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Tissue Paper Means Reserved: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Joseph','high','2026-09-06','',82,'小贩中心外景许可','v0.1','EP16《用纸巾占座》

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
用笑点、后果或下一集线索收尾。','EP16 “Tissue Paper Means Reserved”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(17,'第一次自己端小贩中心餐盘','Her First Hawker-Centre Tray','新加坡文化篇','Singapore Culture','第一次自己端小贩中心餐盘：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Her First Hawker-Centre Tray: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Angeline','high','2026-09-06','',84,'餐盘外景','v0.1','EP17《第一次自己端小贩中心餐盘》

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
用笑点、后果或下一集线索收尾。','EP17 “Her First Hawker-Centre Tray”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(18,'Can Can 是不是更可以','Does Can Can Mean More Can?','新加坡文化篇','Singapore Culture','Can Can 是不是更可以：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Does Can Can Mean More Can?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','James','medium','2026-09-06','',80,'Singlish台词校对','v0.1','EP18《Can Can 是不是更可以》

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
用笑点、后果或下一集线索收尾。','EP18 “Does Can Can Mean More Can?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(19,'第一次坐巴士坐过站','Her First Bus Ride Goes Wrong','新加坡文化篇','Singapore Culture','第一次坐巴士坐过站：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Her First Bus Ride Goes Wrong: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','shoot','Angeline','medium','2026-09-13','',79,'巴士外景','v0.1','EP19《第一次坐巴士坐过站》

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
用笑点、后果或下一集线索收尾。','EP19 “Her First Bus Ride Goes Wrong”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(20,'MRT里面不能做什么','What You Cannot Do on the MRT','新加坡文化篇','Singapore Culture','MRT里面不能做什么：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','What You Cannot Do on the MRT: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','Joseph','high','2026-09-13','',88,'素材备份待确认','v0.1','EP20《MRT里面不能做什么》

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
用笑点、后果或下一集线索收尾。','EP20 “What You Cannot Do on the MRT”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(21,'垃圾到底怎么丢','How Do You Throw Away Rubbish?','新加坡文化篇','Singapore Culture','垃圾到底怎么丢：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','How Do You Throw Away Rubbish?: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','James','medium','2026-09-13','',86,'补拍垃圾房镜头','v0.1','EP21《垃圾到底怎么丢》

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
用笑点、后果或下一集线索收尾。','EP21 “How Do You Throw Away Rubbish?”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(22,'有钱也不能避开的罚款','Fines Even Money Cannot Avoid','新加坡文化篇','Singapore Culture','有钱也不能避开的罚款：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Fines Even Money Cannot Avoid: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','filmed','Angeline','high','2026-09-20','',90,'罚款信息待核实','v0.1','EP22《有钱也不能避开的罚款》

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
用笑点、后果或下一集线索收尾。','EP22 “Fines Even Money Cannot Avoid”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(23,'新加坡下雨为什么没人慌','Why Singaporeans Stay Calm in Sudden Rain','新加坡文化篇','Singapore Culture','新加坡下雨为什么没人慌：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Why Singaporeans Stay Calm in Sudden Rain: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Joseph','medium','2026-09-20','',92,'粗剪中','v0.1','EP23《新加坡下雨为什么没人慌》

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
用笑点、后果或下一集线索收尾。','EP23 “Why Singaporeans Stay Calm in Sudden Rain”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(24,'Joseph 偷拍她第一次做家务','Joseph Secretly Films Her Doing Housework','关系升级篇','Relationship Growth','Joseph 偷拍她第一次做家务：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Joseph Secretly Films Her Doing Housework: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Joseph','high','2026-09-20','',94,'等待字幕','v0.1','EP24《Joseph 偷拍她第一次做家务》

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
用笑点、后果或下一集线索收尾。','EP24 “Joseph Secretly Films Her Doing Housework”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(25,'她要花钱改造自己的小房间','She Pays to Upgrade Her Tiny Room','关系升级篇','Relationship Growth','她要花钱改造自己的小房间：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Pays to Upgrade Her Tiny Room: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','post','Angeline','medium','2026-09-27','',91,'房间改造素材','v0.1','EP25《她要花钱改造自己的小房间》

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
用笑点、后果或下一集线索收尾。','EP25 “She Pays to Upgrade Her Tiny Room”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(26,'James 带客户来看她嫌弃的房间','James Brings Clients to View the Room She Hates','关系升级篇','Relationship Growth','James 带客户来看她嫌弃的房间：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','James Brings Clients to View the Room She Hates: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','James','high','2026-09-27','',96,'封面待确认','v0.1','EP26《James 带客户来看她嫌弃的房间》

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
用笑点、后果或下一集线索收尾。','EP26 “James Brings Clients to View the Room She Hates”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(27,'她第一次不靠家里解决问题','She Solves a Problem Without Family Money','关系升级篇','Relationship Growth','她第一次不靠家里解决问题：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Solves a Problem Without Family Money: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Angeline','high','2026-09-27','',97,'发布时间未定','v0.1','EP27《她第一次不靠家里解决问题》

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
用笑点、后果或下一集线索收尾。','EP27 “She Solves a Problem Without Family Money”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(28,'富二代洗厕所的视频爆了','The Toilet-Cleaning Video Goes Viral','关系升级篇','Relationship Growth','富二代洗厕所的视频爆了：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','The Toilet-Cleaning Video Goes Viral: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Joseph','high','2026-10-04','',98,'平台标题待定','v0.1','EP28《富二代洗厕所的视频爆了》

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
用笑点、后果或下一集线索收尾。','EP28 “The Toilet-Cleaning Video Goes Viral”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(29,'父母突然要视频看她住哪里','Her Parents Demand a Video Tour','关系升级篇','Relationship Growth','父母突然要视频看她住哪里：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','Her Parents Demand a Video Tour: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','Angeline','high','2026-10-04','',95,'父母视频道具','v0.1','EP29《父母突然要视频看她住哪里》

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
用笑点、后果或下一集线索收尾。','EP29 “Her Parents Demand a Video Tour”

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
INSERT OR IGNORE INTO episodes(episode_no,title_zh,title_en,category_zh,category_en,summary_zh,summary_en,script_status,production_stage,owner,priority,shoot_date,publish_date,progress,open_issues,version,script_zh,script_en,culture_point_zh,culture_point_en) VALUES(30,'她终于承认这里像一个家','She Finally Admits This Feels Like Home','关系升级篇','Relationship Growth','她终于承认这里像一个家：围绕三人关系、新加坡文化与合租冲突展开的4–7分钟短剧。','She Finally Admits This Feels Like Home: a 4–7 minute short-drama episode built around the trio, Singapore culture and shared-living conflict.','final','publish','三人','high','2026-10-04','',99,'最终审核','v0.1','EP30《她终于承认这里像一个家》

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
用笑点、后果或下一集线索收尾。','EP30 “She Finally Admits This Feels Like Home”

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
