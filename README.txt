Upload this file:

- functions/api/episodes.js

Optional documentation:
- migrations/0005_reset_actual_project_stage.sql
- P0-A-ARCHITECTURE.md
- shared-episode-core.js

What this fixes:
- Removes the false historical stages inherited from seeded/demo episode data.
- Resets all 42 episodes to Development / Story Development.
- Keeps outline completion as the only completed milestone.
- Clears writing, locked, shooting, post-production and publishing milestones.
- Runs only once through the app_migrations guard.
- Does not delete episode titles, owners, summaries, scripts, schedules or other content.
