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


## v47
Reduced inline stage and owner dropdown typography and control height for cleaner row alignment.

## v48
- English owner dropdown now displays “All Three” instead of the stored Chinese value “三人”.
- Episode dates are displayed as DD/MM/YYYY across episode library, production list, calendar and dashboard views; stored values remain ISO YYYY-MM-DD for database compatibility.


## v51 English interface fixes
- English dashboard displays shared ownership as **All Three**.
- English mode uses **U** for the brand mark; Chinese mode keeps **屋**.

## v56 National Day Special
- Adds a dedicated bilingual Specials workspace under Episode Management.
- Includes the SG61 special “A Reason to Stay” with 12 scene scripts, production notes, props, shots, runtime, shorts plan, fact-check register and production countdown.
- Includes the original storyboard deck at `assets/nd-special-storyboard-deck.pptx`.


## v57
- Added complete English translations for all 12 National Day Special scene scripts.
- English mode now displays English dialogue and English stage directions only.
- Chinese mode preserves the original Chinese/Singlish performance script.


## v58
- Rebuilt the production funnel as one continuous silhouette.
- Each segment now connects exactly to the next with no white gaps or stepped ledges.
- Increased top width and strengthened the taper toward the bottom.


## v59
- Re-centred every funnel segment on one shared vertical axis.
- Matched each segment's bottom width to the next segment's top width for a seamless silhouette.
- Preserved external labels and responsive layout.
