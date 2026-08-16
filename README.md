# Headlight Mental Healthcare Site

Static multi-page marketing site for **Headlight Mental Healthcare** and **Matthew Laird, PMHNP-BC**. The site is built with Vite and published to GitHub Pages.

## Project Overview

This repository contains a four-page brochure site:

- `/` — Home
- `/about/` — About Matthew
- `/services/` — Services
- `/contact/` — Contact

The experience is intentionally simple: fast static pages, shared shell components, curated photography, and lightweight JavaScript for page-level enhancements.

## Architecture

### Multi-page Vite setup

`vite.config.js` defines four HTML entry points:

- `index.html`
- `about/index.html`
- `services/index.html`
- `contact/index.html`

Each page loads a matching page module from `src/pages/`:

- `src/pages/index.js`
- `src/pages/about.js`
- `src/pages/services.js`
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
- `src/css/services.css` — small Services-page-only tweaks

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

### Stock / curated images

Current stock assets:

- `assets/images/stock/water-reflection.jpg`
- `assets/images/stock/foggy-landscape.jpg`
- `assets/images/stock/matthew-headshot.jpg`
- `assets/images/stock/matthew-alt.jpg`
- `assets/images/stock/matthew-wide.jpg`
- `assets/images/stock/clinic-bg.jpg`
- `assets/images/stock/multnomah.jpg`

These are optimized site assets derived from the larger raw source media stored at the repository root.

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

The contact form is **static only**. It currently provides front-end-only feedback and does not submit data to a backend. Do **not** use it to collect or transmit PHI until a compliant workflow is designed and implemented.

## Placeholder content note

Phone number, address/location language, and other operational details should be treated as placeholders until confirmed by the client/practice owner.

## Repository notes

- `.gitignore` excludes `node_modules/`, `dist/`, and `.DS_Store`
- Raw source media in the repository root are source artifacts and not part of the built site
