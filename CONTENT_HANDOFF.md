# Content Handoff Format

Use this format when you are ready to replace placeholders with real project/service content.

## Images

Preferred:

- Format: original `jpg`, `jpeg`, `png`, `heic`, or already exported `webp`.
- Size: send the largest clean original you have; I will crop/optimize for the website.
- Minimum useful size: about `1600 px` on the long edge.
- Best orientation:
  - Hero/projects: landscape is best.
  - Detail shots: landscape or square.
  - Portrait/about: portrait orientation.
- Avoid heavy WhatsApp compression if you still have the original camera file.

Folder structure suggestion:

```text
Incoming content/
  projects/
    balkon-gelaenderanlage/
      01-main.jpg
      02-detail.jpg
      notes.md
    metall-holz-schreibtisch/
      01-main.jpg
      notes.md
  services/
    cad-planung/
      01-cad-screenshot.png
      notes.md
  about/
    portrait.jpg
    workshop.jpg
```

## Project Notes

Create one `notes.md` next to the images:

```md
# Project title

German title:
English title, optional:

Category:
Location, if public:
Approximate year, if public:

Short caption, 1 sentence:

What was made:

Materials:

Important details:

Can this be shown publicly? yes/no
Anything that should not be mentioned:
```

## Service Notes

For service pages, give a short description rather than a full project story:

```md
# Service name

German title:
English title, optional:

Short homepage text, 1 sentence:

Longer detail-page text, 3-6 sentences:

Typical examples:

Materials/tools/processes that are okay to mention:

Anything that should not be promised or claimed:
```

## Naming

Simple lowercase names are easiest:

- `aussentreppe-gelaender-01.jpg`
- `metall-holz-tisch-detail.jpg`
- `cad-gelaender-planung.png`

Do not worry about final web optimization. I will create the final `.webp` files and update the site paths.
