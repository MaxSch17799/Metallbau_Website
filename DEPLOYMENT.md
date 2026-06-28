# Cloudflare Pages Deployment

Use these settings in Cloudflare Pages for the GitHub repo `MaxSch17799/Metallbau_Website`.

- Project name: `metallbau-schimmel`
- Production branch: `main`
- Framework preset: `Vite` if available, otherwise `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank / repository root
- Environment variables: none required for the current static site

Optional environment variable if Cloudflare does not pick up `.node-version`:

- `NODE_VERSION`: `22.16.0`

The current site is static. The request form backend, D1 database, R2 uploads, Turnstile, and future AI generator backend are not connected yet.
