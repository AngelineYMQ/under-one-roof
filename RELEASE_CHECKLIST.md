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

## Multi-season checks
- [x] Episode Management uses a permanent icon, not a fixed episode count.
- [x] Sidebar contains only All Episodes, Script Center, and Production Progress.
- [x] Season 1 retains all 30 existing episodes.
- [x] Seasons 2 and 3 display reserved empty states.
- [x] Script Center and Production Progress use the same season selector.
- [x] D1 migration preserves existing data and changes uniqueness to season + episode number.
