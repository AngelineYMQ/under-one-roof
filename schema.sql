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
