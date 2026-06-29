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
- Optional notification webhook URL: `NOTIFICATION_WEBHOOK_URL`
- Optional notification webhook secret: `NOTIFICATION_WEBHOOK_SECRET`

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

Only add the Turnstile secret after creating a Turnstile widget in Cloudflare.

## Turnstile Setup

The frontend and backend are already wired for Turnstile. The current Wrangler OAuth token does not have Turnstile edit permission, so the widget must be created in the Cloudflare dashboard or with a separate API token.

Dashboard path:

1. Cloudflare dashboard > Turnstile > Add widget.
2. Name: `Metallbau Schimmel Contact Form`.
3. Widget mode: `Managed`.
4. Domains:
   - `metallbau-schimmel.pages.dev`
   - `localhost`
   - `127.0.0.1`
5. Copy the site key into `PUBLIC_TURNSTILE_SITE_KEY` in `wrangler.jsonc`.
6. Set the secret:

```powershell
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name metallbau-schimmel
```

After deployment, `/api/health` should show `turnstileSiteKey: true` and `turnstileSecret: true`.

## Email Notification Setup

Requests are already stored in D1/R2. For free Gmail notifications without a paid mail provider, use the included Apps Script webhook:

- `scripts/google-apps-script-notification.js`

Google setup:

1. Open https://script.google.com/ with the Gmail account that should send notifications.
2. Create a new Apps Script project.
3. Paste `scripts/google-apps-script-notification.js` into `Code.gs`.
4. Replace `WEBHOOK_SECRET` with a long random value.
5. Deploy > New deployment > Web app.
6. Execute as: `Me`.
7. Who has access: `Anyone`.
8. Copy the Web app URL.

Cloudflare setup:

```powershell
npx wrangler pages secret put NOTIFICATION_WEBHOOK_URL --project-name metallbau-schimmel
npx wrangler pages secret put NOTIFICATION_WEBHOOK_SECRET --project-name metallbau-schimmel
```

Use the Apps Script Web app URL for `NOTIFICATION_WEBHOOK_URL`, and the same random value for `NOTIFICATION_WEBHOOK_SECRET`.

Local verification already passed with `wrangler pages dev`:

- `/api/health` sees D1 and R2 bindings.
- A no-file test request returns `201 Created`.
- A one-file test request returns `201 Created`.

Live verification on `https://metallbau-schimmel.pages.dev` also passed:

- `/api/health` sees D1 and R2 bindings.
- A no-file test request returned `201 Created`; the test row was deleted.
- A one-file test request returned `201 Created`; the test D1 rows and test R2 object were deleted.
