# Headlight Mental Healthcare Site

Static multi-page marketing site for **Headlight Mental Healthcare** and **Matthew Laird, PMHNP-BC**. The site is built with Vite and published to GitHub Pages.

## Project Overview

This repository contains a five-page brochure site:

- `/` — Home
- `/about/` — About Matthew
- `/services/` — Services
- `/genesight/` — GeneSight pharmacogenomics testing
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

### Stock / curated images

Current stock assets and which pages use them:

| File | Pages |
|---|---|
| `assets/images/stock/IMG_2735.jpeg` | Home (headshot section), About (hero) |
| `assets/images/stock/water-reflection.jpg` | Home (banner), Contact (banner) |
| `assets/images/stock/foggy-landscape.jpg` | About (banner) |
| `assets/images/stock/clinic-bg.jpg` | Services (banner), GeneSight (banner) |
| `assets/images/stock/multnomah.jpg` | About page |
| `assets/images/stock/matthew-headshot.jpg` | Available; not currently used in markup |
| `assets/images/stock/matthew-alt.jpg` | Available; not currently used in markup |
| `assets/images/stock/matthew-wide.jpg` | Available; not currently used in markup |

Other top-level image assets:

| File | Pages |
|---|---|
| `assets/images/logo.svg` | Header and footer on every page (via `shell.js`) |
| `assets/images/genesight-logo.png` | Services, GeneSight |
| `assets/images/genesight-logo.svg` | Available; not currently used in markup |
| `assets/images/benefit-corp-badge.png` | About (affiliations section) |

These are optimized site assets derived from the larger raw source media stored at the repository root.

### URL path convention

`vite.config.js` sets `publicDir: 'assets'`, so everything under `assets/` is served from the site root at build time. In-page URLs must therefore be written as:

```
%BASE_URL%images/...
```

and **not** as `%BASE_URL%assets/images/...`. The `assets/` segment must be omitted.

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

The `/contact/` page embeds a live **IntakeQ** iframe (`https://intakeq.com/new/dtglwx`), which is the HIPAA-compliant patient intake platform used by the practice. Patient data entered in the form is handled entirely by IntakeQ and is never processed or stored by this static site. A new-tab fallback link is shown when the iframe fails to load:

```html
<a href="https://intakeq.com/new/dtglwx" target="_blank" rel="noopener noreferrer">
  open the IntakeQ intake in a new tab
</a>
```

## Repository notes

- `.gitignore` excludes `node_modules/`, `dist/`, and `.DS_Store`
- Raw source media in the repository root are source artifacts and not part of the built site

## Outstanding / not yet done

The repository root contains roughly 120 MB of raw source media: UUID-named `.jpeg` files (16–19 MB each) and several `AdobeStock_*.mov` video files. These files are **not referenced by the build** and do not land in `dist/`. They are candidates for removal or migration to Git LFS in a future pass. They have intentionally not been removed in this PR.
