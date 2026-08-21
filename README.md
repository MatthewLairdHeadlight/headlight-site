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

- The About page renders 24 slides using `assets/images/personal/p01.jpg` through `p24.jpg`
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

- `assets/images/personal/p01.jpg` … `assets/images/personal/p24.jpg`

### Top-level images

- `assets/images/logo.svg` — site logo (header and footer, all pages)
- `assets/images/benefit-corp-badge.png` — Benefit Corporation badge (About page)
- `assets/images/genesight-logo.svg` — GeneSight logo (Services, GeneSight pages)
- `assets/images/genesight-logo.png` — GeneSight logo fallback (Services, GeneSight pages)

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

These are optimized site assets derived from larger raw source media that is no longer stored in the repository.

## Asset workflow

For the authoritative asset provenance map, see [`docs/ASSETS.md`](docs/ASSETS.md).

- keep only optimized, shipped derivatives under `assets/`
- keep raw camera / stock originals outside the repository root (or recover them from git history when needed)
- do not add new root-level `.jpg`, `.jpeg`, or `.mov` source media

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
- Builds with `npm run build`
- Uploads `dist/`
- Deploys with GitHub Pages actions

## How to add a new page

1. Create a new HTML entry file in a folder such as `new-page/index.html`
2. Create a matching JS entry in `src/pages/new-page.js`
3. Import `src/css/base.css` and any page-specific CSS from that JS file
4. Add the page to `vite.config.js` under `build.rollupOptions.input`
5. Add navigation links in `src/js/shell.js` if the page should appear in the main nav
6. Build and verify the new route appears in `dist/`

## HIPAA and contact form note

The contact page embeds a live **IntakeQ** iframe (`https://intakeq.com/new/dtglwx`), which is the HIPAA-compliant intake platform used by Headlight Mental Healthcare. A new-tab fallback link (`<a href="...">` pointing at the same URL) is provided below the iframe for users in restrictive browser environments. No PHI is collected or stored in this repository.

## Repository notes

- `.gitignore` excludes `node_modules/`, `dist/`, and `.DS_Store`
- `.gitignore` also blocks root-level `*.jpg`, `*.jpeg`, and `*.mov` so raw source media is not reintroduced
- The raw source media formerly at the repository root has been removed; it remains recoverable from git history via the SHA recorded in `docs/ASSETS.md`
