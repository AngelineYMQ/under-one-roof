Upload:

1. `functions/api/episodes.js` — replace the existing file.
2. `shared-episode-core.js` — add to the repository root.
3. `migrations/0004_episode_lifecycle_core.sql` — keep as migration documentation/reference.
4. `P0-A-ARCHITECTURE.md` — keep as the implementation contract.

Important:
- Do not manually run the SQL file if the columns already exist.
- The updated episodes API performs the column additions idempotently on first request.
- This release deliberately does not redesign pages yet.
- Existing Chinese/English pages and legacy `productionStage` writes remain compatible.
