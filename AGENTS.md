## Project structure

Monorepo with two workspaces:

- `frontend/` — Astro static site (pages, components, styles, scripts)
- `functions/` — Cloudflare Pages Functions (contact form API at `/message`)

All npm scripts run from the repository root.

## Bilingual site

Finnish is the default language at `/`. English lives under `/en/`. Each page declares hreflang alternates. When adding or modifying pages, maintain both language versions.

## Main branch

The default branch is `trunk`.

## Cloudflare Pages specifics

- `frontend/public/_headers` — Content-Security-Policy and cache rules. Adding external scripts or styles requires updating the CSP directives here.
- `frontend/public/_routes.json` — Declares which paths are handled by Cloudflare Functions (currently only `/message`). Adding a new function requires an entry here.
- `frontend/public/sitemap.xml` — Manually maintained. Must be updated when adding or removing routes.

## Functions environment variables

`functions/message.ts` requires `CONTACT_EMAIL`, `RESEND_API_KEY`, and `TURNSTILE_SECRET_KEY`. For local development, these go in `.dev.vars` (gitignored).
