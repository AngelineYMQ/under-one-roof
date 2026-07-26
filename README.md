# Under One Roof HQ — v32 batch consistency release

A static bilingual production HQ for Cloudflare Pages with D1-backed Pages Functions.

## What this release changes

- Keeps the current 30-episode plan and shared structure templates.
- Labels generic screenplay content as **结构模板 / Structure template** so the team does not mistake it for completed dialogue.
- Keeps Season 1, Script Center, Production Progress and Publishing Analytics on the shared `episodes` dataset.
- Disables bulk deletion of the idea library.
- Changes record deletion for ideas, legacy scripts, shoot schedules and team members to soft deletion.
- Adds an `audit_log` table and records create, update and delete actions.
- Adds automated release validation for bilingual routes, unified episode views, preserved EP01–EP30 data, API safety and schema consistency.
- Does not add Cloudflare Access or login restrictions.

## Deploy

Upload all files at the repository root and push to `main`. Cloudflare Pages will redeploy automatically.

The D1 binding remains:

- Variable name: `DB`
- Database: `under-one-roof-hq`

The API performs migration-safe column checks at runtime, so this release does not require manually rerunning SQL for an existing database. `schema.sql` remains the complete reference for a new database.

## Validation

GitHub Actions runs automatically. Locally:

```bash
node tools/validate-release.mjs
```

See `RELEASE_CHECKLIST.md` for the release standard.


## v35
Publishing & Analytics rows now open a focused data-update form for publish date, views, retention, watch time, completion, follow-through, followers and notes.


## v37
Light workspace colour refresh: bright sidebar, softer navigation states, lighter hero and surfaces. No data or functionality changes.


## v41
Season 1 is now displayed as one continuous EP01–EP30 sequence. Topic labels remain metadata only and no longer divide the season into themed arcs.

## v42 — Unified Episode Management
The former Season 1, Script Center, and Production Progress sidebar entries are now one Episode Management entry with three tabs. Existing routes and all shared episode data remain available for compatibility.


## v43 — Restore Episode Management Dropdown
The Episode Management section is again expandable in the sidebar. It keeps the unified database and workspace while exposing Overview, All Episodes, Script Center, and Production Progress as clear child entries in both languages.

## v44 — Multi-season episode structure

- Episode Management uses a permanent library icon instead of the number 30.
- The redundant Episode Overview child page was removed from the sidebar.
- All Episodes, Script Center, and Production Progress now share Season 1 / Season 2 / Season 3 selectors.
- Existing 30 episodes remain in Season 1.
- Seasons 2 and 3 are reserved empty workspaces for future episodes.
- The Episodes API automatically migrates the existing D1 table to a composite `(season_no, episode_no)` structure without deleting existing Season 1 data.
