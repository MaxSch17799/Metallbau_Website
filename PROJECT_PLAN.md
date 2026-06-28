# Metallbau Website Planning

Status: planning only. No website scaffold or page implementation has been created yet.
Created: 2026-06-28
Updated: 2026-06-28

## Current Repo State

- Git has been initialized in this folder with `main` as the default branch.
- The current folder contains:
  - `Metal work.zip`, about 340 MB.
  - `Metallbau_images _fixed/`, 60 files.
  - `Metallbau_images _broken/`, 60 files.
  - `Example work/`, current smaller image selection.
  - `CV_Maximilian_Schimmel.pdf`, local reference only.
  - local image recovery scripts.
- The raw/recovery assets, CV, and current unoptimized example images are ignored by Git for now. Later, selected and optimized website-ready images should be copied into the app, likely under `public/projects/` or uploaded to Cloudflare R2.
- The CV should not be committed publicly. It contains personal details. It can be used as private planning reference only.

## Reference Project Notes

The reference folder `C:\Users\maxsc\Desktop\Passion projects\Sloppy_Toppy` appears to use:

- React + Vite + TypeScript.
- Cloudflare Pages for hosting.
- Cloudflare Pages Functions for backend endpoints.
- Cloudflare D1 for structured data.
- Cloudflare R2 for image/file storage.
- Wrangler for local Cloudflare development and deployment.
- GitHub Actions for deployment and AI generation workflows.
- OpenAI API for generation.

That setup is a good reference, but I would not copy it blindly. This metalworking site should start simpler and only add dynamic infrastructure where it solves a concrete problem.

## Recommended Architecture

For the first production version:

- Frontend: React + Vite + TypeScript.
- Styling: custom CSS with strong visual direction, no heavy UI framework unless needed.
- Hosting: Cloudflare Pages.
- Backend: Cloudflare Pages Functions for contact/request submission.
- Anti-spam: Cloudflare Turnstile on the request form.
- Storage:
  - Static selected project images in the repo for v1 if image count/size stays reasonable.
  - Cloudflare R2 for uploaded request attachments and later AI-generated proposals.
- Database:
  - Cloudflare D1 for request metadata, attachment references, interaction logs, and later AI request usage tracking.
- Deployment:
  - GitHub repo connected to Cloudflare Pages.
  - Wrangler config committed to the repo once Cloudflare project/resource names are known.
- Language:
  - German as default.
  - English switch available globally in the header.
  - Store the selected language in browser storage and make URLs shareable if possible, for example `/en/projects` or `?lang=en`.
- German tone:
  - Use formal `Sie`.

Official docs checked for planning:

- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Cloudflare Pages Functions bindings for D1/R2/etc.: https://developers.cloudflare.com/pages/functions/bindings/
- Cloudflare Turnstile: https://developers.cloudflare.com/turnstile/get-started/
- Cloudflare Queues: https://developers.cloudflare.com/queues/
- GitHub workflow dispatch: https://docs.github.com/rest/actions/workflows#create-a-workflow-dispatch-event
- OpenAI image generation: https://developers.openai.com/api/docs/guides/image-generation
- Cloudflare Workers pricing/limits: https://developers.cloudflare.com/workers/platform/pricing/ and https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Email Routing: https://developers.cloudflare.com/email-service/get-started/route-emails/
- Gmail "send mail as": https://support.google.com/mail/answer/22370

## Business Information Collected So Far

- Owner/name: Maximilian Schimmel.
- Registered Gewerbe currently: `Maximilian Schimmel`.
- Public business name: undecided.
- Location: based in Seeheim, Germany.
- Service area:
  - Local/on-site projects around Seeheim and the wider region.
  - Can travel for suitable on-site projects.
  - Can ship or deliver furniture and smaller fabricated items across Germany.
- Phone: `+49 176 98472569`.
- Email: use a new free Gmail address for v1, forwarding to the main Gmail. No custom domain email yet.
- Call availability:
  - Monday to Friday, 08:00-17:00.
  - Also invite people to try outside those times in a professional way, for example: "Sollten Sie uns ausserhalb dieser Zeiten erreichen wollen, melden Sie sich gern trotzdem - wenn es passt, nehmen wir Ihren Anruf entgegen oder rufen zeitnah zurueck."
- Tone: formal German, `Sie`.
- AI generator visibility:
  - Hide as a normal public feature for now.
  - Add a small "coming soon" link.
  - That link opens a password input.
  - Password placeholder: `MAX`.
  - After password, show a blank/in-progress generator page.
  - Treat this as a preview gate, not high-security auth.
- Interactions:
  - Store contact requests, form events, attachment metadata, AI-generation jobs, quota events, and useful admin/audit events in D1.

## Services And Positioning

Core service direction:

- Metalwork with a focus on furniture and interior design.
- Outdoor metalwork such as gates, stairs, balconies, railings, and custom exterior structures.
- Welding and metal repair.
- Woodworking, especially combined metal-and-wood furniture.
- CAD/design work and technical drawings.
- Broader practical engineering and prototyping work where useful.
- Optional advanced skill signal:
  - Electrical engineering, embedded systems, and systems integration.
  - This should not dominate the homepage, but can support a "complex Sonderanfertigungen" message.

Background to use carefully:

- Former welder and metal construction worker at Metallbau Wendt in Alsbach-Haehnlein.
- M.Sc. electrical engineering/electric propulsion background.
- Aerospace engineering work and practical prototyping/test-bed experience.
- International experience in the Netherlands and Sweden.

Recommended public wording direction:

- Homepage: emphasize precision, custom fabrication, metal/wood furniture, outdoor metalwork, CAD-backed planning, and direct contact with the maker.
- About page: mention engineering background and international experience as credibility, not as a full CV.
- Avoid making the site feel like a general engineering consultancy unless you want that market.

## Business Name Ideas

SEO-friendly names should include `Metallbau`, `Metall`, `Metalltechnik`, `Seeheim`, `Design`, `Moebel`, or `Manufaktur`. The legal Impressum can still show `Maximilian Schimmel` even if the public-facing brand is different, subject to German business naming rules.

Stronger options:

1. `Schimmel Metallbau & Design`
2. `Metallbau Schimmel`
3. `Schimmel Metalltechnik`
4. `Seeheimer Metallbau & Design`
5. `Metallwerk Seeheim`
6. `Schimmel Metall & Holz`
7. `Metallmanufaktur Schimmel`
8. `Schimmel Werkstatt fuer Metall & Holz`
9. `Seeheim Metalltechnik`
10. `Maximilian Schimmel - Metallbau & Design`

My current top recommendation:

- `Schimmel Metallbau & Design`

Reason:

- It is clear for SEO.
- It says what the business does.
- It keeps your name for trust and local recognition.
- It leaves room for furniture/interior design without sounding vague.

If you want less personal-name branding:

- `Metallwerk Seeheim`
- `Seeheimer Metallbau & Design`

## Public Email Setup Recommendation

V1 decision:

- Use a new free Gmail account for now.
- Do not use a custom domain email yet.
- Do not publish the private main Gmail address on the website.
- Forward the new business Gmail inbox to the private main Gmail account.
- Optionally add the new business Gmail as a "send mail as" address inside the main Gmail account, or simply reply from the new Gmail account when needed.

Suggested free Gmail names to try:

- `schimmel.metallbau@gmail.com`
- `schimmel.metallbau.design@gmail.com`
- `metallbau.schimmel@gmail.com`
- `metallundholz.schimmel@gmail.com`
- `schimmel.metalltechnik@gmail.com`
- `metallwerk.seeheim@gmail.com`
- `seeheim.metallbau@gmail.com`

Important:

- A free Gmail address will be less professional than `kontakt@...de`, but it keeps v1 fully free.
- The website should display the business Gmail address, not the private Gmail.
- The contact form backend can send notifications to either the new business Gmail or directly to the private Gmail, but public-facing replies should come from the business Gmail.

Later, when a domain is available:

- Use a custom domain email such as `anfrage@your-domain.de`.
- Use Cloudflare Email Routing to forward that address to your main Gmail.
- This keeps the private Gmail off the website.
- Inbound forwarding is free through Cloudflare Email Routing when the domain uses Cloudflare DNS.

Important limitation:

- Cloudflare Email Routing mainly solves receiving/forwarding.
- To reply cleanly from `anfrage@your-domain.de`, use one of:
  - Google Workspace, paid, cleanest professional option.
  - Gmail "Send mail as" with a verified address and proper SMTP provider.
  - A separate free Gmail account such as `metallbau.schimmel@gmail.com`, forwarded to your main inbox, less professional but simple.

Not recommended as the public website email:

- `yourmainemail+metallbau@gmail.com`, because it still exposes the private Gmail address.

Suggested website addresses, depending on final name/domain:

- `anfrage@schimmel-metallbau.de`
- `kontakt@schimmel-metallbau.de`
- `info@metallwerk-seeheim.de`
- `anfrage@metallwerk-seeheim.de`

## Cloudflare Cost Guardrails

Your concern about surprise Cloudflare costs is valid. The plan should include hard free-tier guardrails, not just hope.

Current official free-tier facts checked on 2026-06-28:

- Cloudflare Pages free plan advertises unlimited static requests/bandwidth and 500 builds per month.
- Workers/Pages Functions free plan includes 100,000 requests per day and 10 ms CPU time per invocation.
- D1 free plan includes 5 million rows read/day, 100,000 rows written/day, and 5 GB total storage.
- R2 free tier includes 10 GB-month storage/month, 1 million Class A operations/month, 10 million Class B operations/month, and free egress for Standard storage.
- Queues free plan includes 10,000 operations/day; typical message delivery is about 3 operations: write, read, delete.

For roughly 1,000 visitors/month:

- Static marketing site: safely within Cloudflare free hosting expectations.
- Contact form with D1/R2 storage: likely free if upload limits and retention are controlled.
- AI generator:
  - Cloudflare can likely stay free with strict caps.
  - OpenAI API usage will not be free and is the main variable cost.
  - R2 storage can exceed free if many users upload large images or if generated outputs are retained too long.

Hard limits to keep Cloudflare free:

- Keep the account/project on free plans unless explicitly changed.
- Limit uploads per request, for example 5 files.
- Limit file size, for example 8-10 MB per file for contact requests, lower for AI if possible.
- Store only metadata in D1, never base64 image data.
- Store files in R2 with lifecycle cleanup, for example delete AI inputs after 7-30 days.
- Keep generated images only while useful, or require manual saving.
- Add per-user quotas before public AI launch.
- Add admin-configurable global monthly AI limit.
- Stop accepting AI jobs when daily/monthly limits are reached.
- Avoid polling every second for long periods; use moderate polling or server-sent events if appropriate.
- Monitor D1/R2/Workers usage in Cloudflare dashboard.

Recommendation:

- Keep the GitHub Actions approach available as a fallback/admin mode.
- For public AI generation, prefer Cloudflare Workers/Pages Functions + D1 + R2 + Queues if the hard caps above are implemented.
- Do not make the AI generator public until OpenAI cost caps and Cloudflare usage caps are implemented.

## Is The GitHub-Actions-Based AI Setup Robust?

Short answer: it can work, but I would not make GitHub Actions the main engine for a public, user-facing "generate ideas" feature unless there is a strong reason.

GitHub Actions is good for:

- Scheduled generation.
- Admin-triggered generation.
- Batch jobs.
- Lower-frequency workflows where waiting is acceptable.
- Keeping expensive AI jobs outside the public request path.

For a visitor clicking "Generate" and waiting on the website, I would prefer:

- Pages Function receives the request.
- D1 stores a generation job with a user/session quota.
- R2 stores uploaded images.
- Cloudflare Queue or Worker handles the generation asynchronously.
- OpenAI API generates the proposal.
- R2 stores the result image.
- D1 updates status/progress.
- Frontend polls or subscribes to status and shows an animated progress state.

This is more robust for quotas, user feedback, retry handling, and keeping secrets server-side. GitHub workflow dispatch is still possible and the API supports passing inputs, but it adds avoidable latency and operational complexity for a public interactive feature.

## Planned Pages

### `/` Home

Purpose: immediately communicate premium metalwork craftsmanship, local trust, services, and a clear request path.

Expected sections:

- Full-viewport visual hero using a real project/workshop image, not a generic gradient.
- Short positioning statement in German, with English available.
- Core services summary.
- Featured projects teaser.
- Process overview: Beratung, Planung, Fertigung, Montage.
- Trust signals: service area, experience, materials, quality, direct owner contact.
- Call to action to request a project.

### `/projekte`

Purpose: show past work, range, skills, and credibility.

Possible features:

- Project gallery with filters such as Gelaender, Tore, Treppen, Sonderanfertigungen, Reparaturen, Edelstahl, Stahl, Aluminium.
- Before/after pairs if available.
- Detail modals or project pages with captions, materials, location, challenge, solution.
- Skill highlights: welding, fabrication, restoration, installation, custom fitting, repair.

### `/anfrage`

Purpose: make it easy to contact you and describe a project.

Form fields to consider:

- Name.
- Email.
- Phone.
- Location / postcode.
- Project type.
- Message.
- Desired timeframe.
- Upload images/plans/sketches.
- Privacy consent checkbox.
- Turnstile verification.

Backend behavior:

- Validate fields and file sizes.
- Upload attachments to R2.
- Store request metadata in D1.
- Send notification to your email via an email service or another notification method.
- Return a clean confirmation state to the user.

### `/ueber-mich`

Purpose: create trust and show the person behind the work.

Expected content:

- Who you are.
- What kind of metalwork you do.
- How you approach quality, precision, durability, and communication.
- Workshop/process photos.
- Local connection to Seeheim and surrounding region.

### Future `/ideen-generator`

Purpose: let visitors describe an idea, upload reference photos, and generate a photorealistic proposal.

Recommended future requirements:

- User/session tracking.
- Quota, for example 10 generations per user.
- Abuse protection and cost caps.
- Upload limits.
- Clear privacy notice for uploaded images.
- Disclaimer that generated proposals are visual concepts, not technical drawings or binding quotes.
- Queue-backed generation with progress states.
- Admin view to review generations if needed.

Private preview behavior for v1:

- Public navigation should not expose it as a full feature.
- A subtle "coming soon" link can open a password input.
- Password `MAX` unlocks a blank/in-progress page for development.
- When made public later, replace this with real quota/session logic.

## Homepage Content To Include From Each Subpage

- From projects: 3 to 6 strongest projects, with one-line captions.
- From services/skills: compact service grid.
- From request page: persistent call-to-action and small contact strip.
- From about page: short owner introduction with image.
- From future generator: optional "coming later" teaser only if you want to build anticipation. Otherwise leave it out until real.

## Design Directions

### 1. Blackened Steel Showroom

Premium, dark, architectural, high contrast.

- Hero: dramatic close-up of welds, railing detail, sparks, or finished black steel piece.
- Colors: charcoal, off-white, brushed steel, one restrained accent such as brass or safety orange.
- Layout: bold typography, large imagery, sharp grid, project images treated like a portfolio.
- Best for: looking high-end and custom.

### 2. Warm Workshop Craft

Personal, trustworthy, hands-on, local.

- Hero: workshop or action photo with real tools/materials.
- Colors: graphite, warm white, muted red, natural wood/workshop tones.
- Layout: story-driven, direct owner presence, process photos.
- Best for: making small/private customers comfortable contacting you.

### 3. Architectural Precision

Clean, technical, modern, planner/architect friendly.

- Hero: finished stair, railing, gate, or balcony detail.
- Colors: white, black, zinc/steel gray, subtle blue or green accent.
- Layout: lots of whitespace, technical detail callouts, project specs.
- Best for: premium residential and commercial projects.

### 4. Industrial Editorial

Magazine-like, bold, memorable.

- Hero: oversized title over a real photo, strong crop, animated reveal.
- Colors: concrete gray, dark steel, off-white, accent red.
- Layout: split bands, large project case studies, high-impact scrolling.
- Best for: a very stylish site that feels less like a normal tradesman website.

### 5. Practical Local Expert

Clear, conversion-focused, still polished.

- Hero: service promise, phone/contact visible, strongest project image.
- Colors: clean light base, dark text, steel accent, clear buttons.
- Layout: fast scanning, service cards, local SEO content, request form priority.
- Best for: getting inquiries quickly and performing well for local search.

Current preference:

- Main preference after generated examples: options 3 and 5.
- Do not pursue the black/dark showroom style as the main direction.
- Keep a little premium metal texture/detail where useful, but avoid a mostly black homepage.
- Generate and compare three follow-up variants:
  - Minimalist architectural precision.
  - Fancy modern architectural/local hybrid.
  - Very clear practical local expert.
- Do not pursue direction 2 "Warm Workshop Craft" as the main direction.
- Do not pursue direction 4 "Industrial Editorial" as the main direction.

Recommended hybrid:

- Use `Architectural Precision` as the base because it matches furniture/interior design, CAD, technical drawings, and exterior metalwork.
- Add the clarity of `Practical Local Expert` for navigation, contact, services, and request flow.
- Use restrained premium details instead of the full `Blackened Steel Showroom` direction.
- Preserve `Practical Local Expert` clarity for the contact flow and local SEO.

This avoids making the site too dark, too artsy, or too generic.

## Image Review Notes

Example work inspected:

- Custom metal-and-wood shelving/bedroom furniture.
- Custom adjustable/industrial lamp arm.
- Metal fabrication frame in workshop.
- Illuminated spiral/light object.
- Outdoor metal staircase and railing.
- Gate/fence fabrication in workshop.
- Decorative metal flower.
- Candle/stand objects.
- Metal-and-wood desk/table frames and finished table.
- Exterior balcony/railing installation.

Recommended homepage image priority:

1. Exterior balcony/railing photo from `WhatsApp Image 2026-06-28 at 14.51.11.jpeg`, strong finished exterior proof.
2. Finished metal-and-wood desk/table photos, good for the furniture/interior focus.
3. Finished shelving/bedroom furniture, useful for custom interior metal/wood work.
4. Illuminated spiral lamp/object, useful to show design range.
5. Staircase/railing photo, strong exterior metalwork proof.
6. Workshop fabrication shots, useful lower on page as process/trust evidence.

Image work still needed:

- Pick 8-15 final portfolio images.
- Optimize/crop them for web.
- Rename them with SEO-friendly names.
- Add captions and categories.
- Decide which images should be used as hero candidates.

## Content Needed From You

Business identity:

- Business name exactly as it should appear.
- Legal/company name for Impressum.
- Your name and role. Current: Maximilian Schimmel.
- Address or service-area-only preference. Current direction: based in Seeheim, travel for suitable on-site projects, delivery/shipping across Germany for furniture/smaller items.
- Phone number. Current: `+49 176 98472569`.
- Email address. Current: create public business email, forward to main Gmail.
- WhatsApp preference, if any.
- Opening hours or preferred contact times. Current: Monday-Friday 08:00-17:00, with flexible callback wording.
- Service area around Seeheim and Germany-wide delivery/shipping wording.

Services:

- Exact services you offer.
- Services you do not want to advertise.
- Materials you work with.
- Typical customer types: private homeowners, architects, businesses, property managers, municipalities.
- Typical job sizes.
- Emergency/repair availability, if any.

Projects/images:

- Which images are approved for public use.
- Captions for each selected project.
- Project categories.
- Locations if they can be public.
- Any before/after sets.
- Any work you especially want to highlight.

Brand and tone:

- Formal `Sie` or informal `du`. Current: `Sie`.
- Premium/luxury vs approachable/local vs technical/industrial.
- Existing logo or no logo yet.
- Preferred colors or colors to avoid.
- Any competitor/reference websites you like or dislike.

Request form:

- Where submissions should be sent.
- Whether requests should also be stored in a database. Current: yes, store interactions in D1.
- Maximum attachment count and size.
- Accepted file types.
- Required fields.
- Whether you want a confirmation email to the customer.

Legal/privacy:

- Impressum details.
- Datenschutzerklaerung text or permission to draft a placeholder.
- VAT ID / tax details if applicable.
- Trade registration or chamber details if applicable.
- Cookie/analytics preference.
- Privacy rules for uploaded files.

Future AI generator:

- Should users log in, or should quota be based on email/IP/browser session?
- Should the 10-generation limit reset, and if yes, when?
- Should generated proposals be private to the requester only?
- How long should uploads/generated images be stored?
- What kinds of proposals should be allowed?
- Should you get notified for every generation?
- Monthly cost cap for OpenAI usage.
- Whether GitHub Actions should remain as an admin fallback.

Deployment:

- GitHub username/organization and desired repo name.
- Cloudflare Pages project name.
- Whether you already have a domain.
- Whether the site should use only `.pages.dev` at first.
- Cloudflare account access status.
- OpenAI API/project details for the later feature.

## Missing Decisions

- Final visual style.
- Business name and legal details.
- Logo/brand direction.
- Which images become public portfolio images.
- Final email/domain setup.
- Free Gmail address selection.
- Email sending provider or notification channel.
- Custom domain.
- Legal pages.
- Analytics/no analytics.
- Whether the AI generator appears as "coming soon" or stays hidden until implemented.

## Proposed Build Phases

1. Planning and content collection.
2. Visual direction selection and homepage wireframe.
3. Static frontend build: home, projects, request, about, language switch.
4. Image curation and optimization.
5. Contact form backend with Turnstile, validation, R2/D1 if approved.
6. Cloudflare Pages + Wrangler setup.
7. GitHub repo remote, deployment workflow, production checklist.
8. Future AI generator design and backend architecture.

## Questions For You

Questions already answered or partially answered:

1. German tone: `Sie`.
2. Phone: `+49 176 98472569`.
3. Base location: Seeheim.
4. Travel/delivery: yes, depending on project.
5. Contact requests/interactions: store in database.
6. AI generator: hidden/coming-soon preview with password `MAX`.
7. Preferred style: options 1, 3, and 5, not 2 or 4.

Please answer these next:

1. Which public business name do you prefer from the list, or should I generate more?
2. Do you already own a domain, or should we search for available `.de` domains?
3. Which free Gmail address should be created and shown publicly?
4. Should WhatsApp be shown as a contact option?
5. Should the website say you perform electrical/embedded work publicly, or only mention it as part of complex engineering/custom builds?
6. Do you want to advertise woodwork as a full service, or only as metal/wood furniture combinations?
7. What legal address should be used in the Impressum?
8. Are you Kleinunternehmer, VAT registered, or should the website avoid price/VAT wording for now?
9. Do you have insurance/certifications/qualifications relevant to welding, electrical work, or installations?
10. Should customers be able to request on-site installation directly, or should the site frame every job as "nach Absprache"?
11. Should project images show work from your time at Metallbau Wendt, and if yes, do you have permission/comfort using them publicly?
12. Should the website focus more on private homeowners, interior designers/architects, or commercial clients?
