# Cloudflare Pages Deployment

Use these settings in Cloudflare Pages for the GitHub repo `MaxSch17799/Metallbau_Website`.

- Project name: `metallbau-schimmel`
- Production branch: `main`
- Framework preset: `Vite` if available, otherwise `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank / repository root
- Environment variables for the frontend build: none required

Optional environment variable if Cloudflare does not pick up `.node-version`:

- `NODE_VERSION`: `22.16.0`

## Contact Form Backend

The repo now includes Cloudflare Pages Functions:

- `functions/api/request.js` receives request form submissions.
- `functions/api/health.js` reports whether the needed Cloudflare bindings are connected.
- `migrations/0001_contact_requests.sql` creates the D1 tables.

Expected Cloudflare binding names:

- D1 database binding: `REQUESTS_DB`
- R2 bucket binding: `REQUEST_ATTACHMENTS`
- Optional Turnstile secret: `TURNSTILE_SECRET_KEY`

Created Cloudflare resources:

- D1 database: `metallbau_requests`
- D1 database ID: `23332084-8f0d-4705-8771-379e3622b5c9`
- D1 region: `WEUR`
- R2 bucket: `metallbau-request-attachments`
- Public contact email: `metallbau.schimmel@gmail.com`

Bindings are now configured in `wrangler.jsonc`:

- `REQUESTS_DB` -> D1 `metallbau_requests`
- `REQUEST_ATTACHMENTS` -> R2 `metallbau-request-attachments`

Already run:

```powershell
npx wrangler d1 create metallbau_requests
npx wrangler d1 execute metallbau_requests --remote --file=migrations/0001_contact_requests.sql
npx wrangler r2 bucket create metallbau-request-attachments
```

Still optional:

```powershell
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name metallbau-schimmel
```

Only add the Turnstile secret after creating a Turnstile widget in Cloudflare and adding the matching site key to the frontend.

Local verification already passed with `wrangler pages dev`:

- `/api/health` sees D1 and R2 bindings.
- A no-file test request returns `201 Created`.
- A one-file test request returns `201 Created`.
