Upload this file only:

functions/api/episodes.js

Fixes:
- Corrected the Special Episode INSERT from 24 values for 23 columns.
- This was causing ensure() to fail before every stage update.
- Stage dropdown changes now update both the legacy productionStage and the new lifecycle fields.
- A later audit-log failure can no longer make a successful episode save appear unsuccessful.

After deployment:
1. Wait for Cloudflare Pages deployment to finish.
2. Hard refresh the website.
3. Change one episode from 选题与大纲 to 剧本编写.
4. Refresh again to confirm the stage remains saved.
