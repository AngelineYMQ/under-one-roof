# Release checklist

Every future ZIP should be released only after this checklist passes.

- Chinese and English routes both load.
- Desktop and mobile navigation remain usable.
- Season 1, Script Center, Production Progress and Publishing Analytics read from `episodes`.
- EP01–EP30 remain present unless the whole season is intentionally migrated.
- A generic structure template is labelled as a template, not presented as a completed dialogue script.
- Ideas, scripts, schedules and team records delete one item at a time using soft deletion.
- No API contains an unfiltered `DELETE FROM <table>` statement.
- D1 schema and API fields match.
- GitHub Actions validation passes before deployment.

- Run `node tools/audit-english-ui.mjs`; English UI must not fall back to Chinese database fields.
- Verify Open Issues, owners, titles, summaries, roles and supporting-character cards in English mode.

## v64
- [x] Team Availability appears under Shoot Center.
- [x] Chinese and English views are complete.
- [x] Shared time blocks can be added, edited and deleted.
- [x] Common three-person availability is calculated automatically.
- [x] D1 API and local fallback are included.

- [x] Cloudflare Pages Functions SQL string syntax hotfix applied.

- [x] Major tabs and work views have independent shareable URLs
- [x] Individual episodes open from `#episode-01` through `#episode-30`
- [x] Season, production and schedule subviews restore after refresh
- [x] Browser back/forward and bilingual switching preserve the route


## v71 Monthly Production Calendar
- Replaced the compact calendar cards with a full month grid.
- Added previous/next month navigation.
- Added filming and video-editing calendar events with date, time and assignee.
- Added bilingual UI and D1 storage support for event type, title and assignee.
