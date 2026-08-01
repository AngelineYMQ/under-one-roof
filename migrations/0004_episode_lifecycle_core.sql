-- P0-A unified episode lifecycle core
-- Reference migration for Cloudflare D1. The API also performs these additions idempotently.

ALTER TABLE episodes ADD COLUMN current_stage TEXT NOT NULL DEFAULT 'development';
ALTER TABLE episodes ADD COLUMN current_substatus TEXT NOT NULL DEFAULT 'story_development';
ALTER TABLE episodes ADD COLUMN reviewer TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN next_action TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN blocker TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN target_date TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN storage_link TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN updated_by TEXT NOT NULL DEFAULT '';
ALTER TABLE episodes ADD COLUMN outline_completed_at TEXT;
ALTER TABLE episodes ADD COLUMN writing_started_at TEXT;
ALTER TABLE episodes ADD COLUMN script_locked_at TEXT;
ALTER TABLE episodes ADD COLUMN shoot_started_at TEXT;
ALTER TABLE episodes ADD COLUMN shoot_completed_at TEXT;
ALTER TABLE episodes ADD COLUMN assets_archived_at TEXT;
ALTER TABLE episodes ADD COLUMN edit_completed_at TEXT;
ALTER TABLE episodes ADD COLUMN published_at TEXT;
ALTER TABLE episodes ADD COLUMN reviewed_at TEXT;

CREATE INDEX IF NOT EXISTS idx_episodes_current_stage
ON episodes(current_stage,current_substatus);

CREATE INDEX IF NOT EXISTS idx_episodes_owner_target
ON episodes(owner,target_date);
