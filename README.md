# Under One Roof HQ / 同一个屋檐下制作总部

A bilingual internal short-drama production website for James, Angeline and Joseph.

## Included in v4

- Complete Chinese and English system interface
- Language switcher with remembered preference
- Smaller typography and denser desktop/mobile layout
- One unified idea dataset for both languages
- Cloudflare Pages Function API
- Cloudflare D1 database schema for cross-device/team sharing
- Browser fallback when the database has not yet been connected

## Deploy the website

Upload every file and folder in this directory to the root of the GitHub repository. Connect the repository to Cloudflare Pages.

Build settings:

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`

## Enable shared team data

A normal static website stores data only in one browser. To let James, Joseph and Angeline see the same entries, connect the included Cloudflare D1 database.

### 1. Create D1

In Cloudflare Dashboard:

1. Open **Storage & Databases → D1 SQL Database**.
2. Create a database named `under-one-roof-hq`.
3. Open its **Console**.
4. Copy and run all SQL from `schema.sql`.

### 2. Bind D1 to the Pages project

In the Cloudflare Pages project:

1. Open **Settings → Bindings**.
2. Add a **D1 database binding**.
3. Variable name: `DB`
4. Select the `under-one-roof-hq` database.
5. Save and redeploy the latest deployment.

After redeployment, entries added through **新增灵感 / Add Idea** are saved in D1 and visible to all team members on any device.

## Important distinction

- The Chinese and English pages use the same records.
- System labels and interface text change with the selected language.
- User-entered titles and descriptions remain exactly as entered; they are not automatically translated.
- This version shares structured idea entries. It does not yet include binary file upload for images, videos or documents. That requires Cloudflare R2 or another file-storage service.


## v6 Character update

Angeline is now written as a newly arrived wealthy Chinese international student. Her room-size logic is fixed across the story bible: she rejected a family-arranged apartment to prove independence, trusted wide-angle listing photos, signed a one-year lease, and stays because she refuses to lose the deposit or admit the mistake to her parents.

## v10 update: shared editable Script Center
Run the updated `schema.sql` once in Cloudflare D1 to create the new `scripts` table. The Script Center then supports adding, editing, changing status, owner, version, and deleting scripts. With the `DB` binding active, changes are shared across Angeline, James, and Joseph.
