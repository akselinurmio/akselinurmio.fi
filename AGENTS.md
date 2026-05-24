## Project structure

- `frontend/` — Static HTML site (pages, assets, TypeScript)
- `functions/` — Cloudflare Pages Functions (contact form API at `/message`)

All npm scripts run from the repository root.

## Bilingual site

Finnish is the default language at `/`. English lives under `/en/`. Each page declares hreflang alternates. When adding or modifying pages, maintain both language versions.

## Main branch

The default branch is `trunk`.

## Frontend

The site is plain static HTML. Pages live in `frontend/dist/` and are deployed directly to Cloudflare Pages. The only build step is compiling `frontend/src/form.ts` → `frontend/dist/assets/form.js` via `tsc`.

To update the portrait photo, replace `frontend/scripts/akseli.jpg` and run `npm run generate-images` to regenerate the responsive image variants in `frontend/dist/assets/`.

## Cloudflare Pages specifics

- `frontend/dist/_headers` — Content-Security-Policy and cache rules. Adding external scripts or styles requires updating the CSP directives here.
- `frontend/dist/_routes.json` — Declares which paths are handled by Cloudflare Functions (currently only `/message`). Adding a new function requires an entry here.
- `frontend/dist/sitemap.xml` — Manually maintained. Must be updated when adding or removing routes.

## Functions environment variables

`functions/message.ts` requires `CONTACT_EMAIL`, `RESEND_API_KEY`, and `TURNSTILE_SECRET_KEY`. For local development, these go in `.dev.vars` (gitignored).
