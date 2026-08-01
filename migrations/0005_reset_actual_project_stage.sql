-- One-time correction for the real project state on 2026-08-01.
-- All 42 episodes have completed topic/outline work, but none has entered script writing.

CREATE TABLE IF NOT EXISTS app_migrations(
  migration_key TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

UPDATE episodes SET
  production_stage='outline',
  script_status='idea',
  current_stage='development',
  current_substatus='story_development',
  progress=0,
  blocker='',
  open_issues='',
  open_issues_en='',
  outline_completed_at=COALESCE(outline_completed_at,updated_at,CURRENT_TIMESTAMP),
  writing_started_at=NULL,
  script_locked_at=NULL,
  shoot_started_at=NULL,
  shoot_completed_at=NULL,
  assets_archived_at=NULL,
  edit_completed_at=NULL,
  published_at=NULL,
  reviewed_at=NULL,
  updated_at=CURRENT_TIMESTAMP;

INSERT OR IGNORE INTO app_migrations(migration_key)
VALUES('2026-08-01-uor-reset-to-outline');
