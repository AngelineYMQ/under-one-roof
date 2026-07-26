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
