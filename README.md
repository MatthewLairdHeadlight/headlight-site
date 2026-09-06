# Headlight Mental Healthcare Site

Static multi-page marketing site for **Headlight Mental Healthcare** and **Matthew Laird, PMHNP-BC**. The site is built with Vite and published to GitHub Pages.

## Project Overview

This repository contains a five-page brochure site:

- `/` — Home
- `/about/` — About Matthew
- `/services/` — Services
- `/genesight/` — GeneSight Pharmacogenomics
- `/contact/` — Contact

The experience is intentionally simple: fast static pages, shared shell components, curated photography, and lightweight JavaScript for page-level enhancements.

## Architecture

### Multi-page Vite setup

`vite.config.js` defines five HTML entry points:

- `index.html`
- `about/index.html`
- `services/index.html`
- `genesight/index.html`
- `contact/index.html`

Each page loads a matching page module from `src/pages/`:

- `src/pages/index.js`
- `src/pages/about.js`
- `src/pages/services.js`
- `src/pages/genesight.js`
- `src/pages/contact.js`

### Shared components

Shared UI is centralized so each page stays small:

- **Header** — injected by `src/js/shell.js`
- **Footer** — injected by `src/js/shell.js`
- **Page banner** — page-specific hero/banner section in each HTML file
- **CTA patterns** — shared button, card, and section styles in `src/css/base.css`

### Water banner animation

`src/js/shell.js` also initializes a lightweight `canvas.page-banner__waterfx` overlay for each `.page-banner`. The effect adds subtle animated wave lines above the photo treatment and below the banner scrim. If `prefers-reduced-motion` is enabled, the canvas effect is skipped.

## Styling system

### Design tokens

`src/css/tokens.css` defines the reusable design system:

- brand colors
- semantic color aliases
- typography scale
- spacing scale
- layout widths
- radii
- shadows
- transitions
- Ken Burns timing tokens

All shared layout and component styles live in `src/css/base.css`.

### Page-specific CSS

- `src/css/about.css` — About page layout
- `src/css/contact.css` — Contact form styling
- `src/css/ken-burns.css` — slideshow presentation

## Ken Burns component

The About page includes a slideshow section built from:

- markup in `about/index.html`
- controller logic in `src/js/ken-burns.js`
- animations in `src/css/ken-burns.css`

### How it works

- The About page renders 18 slides using: `assets/images/personal/p02.jpg`, `p04.jpg`, `p05.jpg`, `p07.jpg`, `p08.jpg`, `p09.jpg`, `p10.jpg`, `p11.jpg`, `p12.jpg`, `p13.jpg`, `p15.jpg`, `p16.jpg`, `p17.jpg`, `p19.jpg`, `p20.jpg`, `p21.jpg`, `p22.jpg`, and `p23.jpg`
- `initKenBurns()` cycles `.kb-slide` elements
- CSS handles pan/zoom/fade animation variants
- Reduced-motion users get a gentler fade-only version

### Reordering, adding, or removing slides

1. Edit the slide markup inside the `.ken-burns` block in `about/index.html`
2. Keep slide numbering and file references aligned with the images in `assets/images/personal/`
3. Add or remove slide `<div class="kb-slide">` blocks as needed
4. The JS automatically adapts to the total number of slides it finds

## Asset map

### Personal photos

The About page slideshow uses:

- `assets/images/personal/p02.jpg`, `p04.jpg`, `p05.jpg`, `p07.jpg`, `p08.jpg`, `p09.jpg`, `p10.jpg`, `p11.jpg`, `p12.jpg`, `p13.jpg`, `p15.jpg`, `p16.jpg`, `p17.jpg`, `p19.jpg`, `p20.jpg`, `p21.jpg`, `p22.jpg`, `p23.jpg`

### Top-level images

- `assets/images/logo.svg` — site logo (header and footer, all pages)
- `assets/images/benefit-corp-badge.png` — Benefit Corporation badge (About page)
- `assets/images/gpecc-member-listing.jpeg` — Greater Phoenix Equality Chamber of Commerce member listing image (About page)
- `assets/images/genesight-logo.png` — GeneSight logo (Services, GeneSight pages)
- `assets/images/psychology-today-badge.png` — Psychology Today badge (Home, About, footer)

### Stock / curated images

| File | Used on |
|---|---|
| `assets/images/stock/IMG_2735.jpeg` | Hero/headshot — Home and About |
| `assets/images/stock/water-reflection.jpg` | Banner — Home and Contact |
| `assets/images/stock/foggy-landscape.jpg` | Banner — About |
| `assets/images/stock/clinic-bg.jpg` | Banner — Services and GeneSight |
| `assets/images/stock/matthew-headshot.jpg` | Supplemental headshot asset |
| `assets/images/stock/matthew-alt.jpg` | Supplemental headshot asset |
| `assets/images/stock/matthew-wide.jpg` | Supplemental headshot asset |
| `assets/images/stock/multnomah.jpg` | Supplemental landscape asset |

These are optimized site assets derived from the larger raw source media stored at the repository root.

### Asset URL convention

`publicDir` in `vite.config.js` is set to `assets`, so everything under `assets/` is served from the site root. All in-page image URLs **must** be written as:

```
%BASE_URL%images/...
```

**Not** `%BASE_URL%assets/images/...` — the extra `assets/` segment will cause a 404 in production.

## Build and deploy

### Local development

```bash
npm install
npm run dev
```

### Production build

```bash
npm install
npm run build
```

Output is written to `dist/`.

### GitHub Pages deployment

Deployment is handled by `.github/workflows/deploy.yml`.

- Runs on pushes to `main`
- Installs dependencies with `npm ci`
- Builds with `VITE_BASE_PATH=/headlight-site/ npm run build`
- Uploads `dist/`
- Deploys with GitHub Pages actions

## Deployment

### GitHub Pages (project site at `/headlight-site/`)

Use the GitHub Actions workflow or run the same build command locally:

```bash
VITE_BASE_PATH=/headlight-site/ npm run build
```

### Cloudflare Pages / other static hosts (root `/`)

Use the default build command with no base-path override:

```bash
npm run build
```

`wrangler.toml` is included with `pages_build_output_dir = "dist"` for Cloudflare Pages.

## How to add a new page

1. Create a new HTML entry file in a folder such as `new-page/index.html`
2. Create a matching JS entry in `src/pages/new-page.js`
3. Import `src/css/base.css` and any page-specific CSS from that JS file
4. Add the page to `vite.config.js` under `build.rollupOptions.input`
5. Add navigation links in `src/js/shell.js` if the page should appear in the main nav
6. Build and verify the new route appears in `dist/`

## HIPAA and contact workflow note

The contact page embeds live **CharmHealth** booking calendars (`https://ehr.charmtracker.com/...`) and the shared site shell loads the Charm chatbot from the same domain. There is no repository-side form processing, storage, or forwarding for patient intake details. PHI collection and handling occur within CharmHealth under its HIPAA BAA boundary. Do not add client-side logging, analytics, or request interception that would route PHI outside CharmHealth.

## Repository notes

- `.gitignore` excludes `node_modules/`, `dist/`, and `.DS_Store`
- Raw source media in the repository root are source artifacts and not part of the built site

## Outstanding / not yet done

The repository root contains approximately 120 MB of raw source media: UUID-named `.jpeg` files and `AdobeStock_*.mov` video files. These are **not referenced by the build** and do not appear in `dist/`. They are candidates for removal or migration to Git LFS in a future pass. Do not delete them in this PR.
