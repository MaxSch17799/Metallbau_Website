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

Suggested resource names:

- D1 database: `metallbau_requests`
- R2 bucket: `metallbau-request-attachments`

Useful Wrangler commands after Cloudflare login:

```powershell
npx wrangler d1 create metallbau_requests
npx wrangler d1 execute metallbau_requests --remote --file=migrations/0001_contact_requests.sql
npx wrangler r2 bucket create metallbau-request-attachments
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name metallbau-schimmel
```

After creating the resources, add the D1 and R2 bindings to the Cloudflare Pages project settings or add the real IDs to `wrangler.jsonc`. Do not add placeholder IDs.

The request endpoint intentionally returns `backend_not_configured` until D1 is bound, so real visitor messages are not silently dropped. Attachment uploads require the R2 binding if files are attached.
