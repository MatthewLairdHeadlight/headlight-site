# Headlight Mental Healthcare — Marketing Site

A fast, calm, dependency-light static marketing site for Headlight Mental Healthcare.

- **Live pages:** `index.html` (home) and `contact.html` (contact)
- **Build tool:** [Vite 5](https://vitejs.dev) (multi-page mode)
- **Framework:** none — plain HTML, CSS custom properties and vanilla ES modules

---

## Why this stack

| Choice | Reason |
| --- | --- |
| **Vite, vanilla JS** | A marketing site is content, not an application. Vite gives instant HMR in dev and a minified, hashed, tree-shaken bundle in prod, with exactly **one** dev dependency. |
| **No component framework** | React/Vue would add ~50 kB of runtime for markup that never changes. Total shipped JS here is ~7 kB. |
| **No template/partial plugin** | Extra plugins mean extra supply-chain surface and build config to maintain. With only a handful of pages, duplicating the header/footer markup is cheaper than the abstraction — and all styling and behaviour is still shared, so the pages cannot drift visually. |
| **CSS custom properties** | One file (`src/styles/tokens.css`) drives every colour, size, radius, shadow and timing in the site. Rebranding = editing tokens. |

---

## Getting started

```bash
npm install       # install Vite
npm run dev       # dev server with hot reload → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ locally to sanity-check the build
```

Requires Node 18+ (CI uses Node 20).

---

## Project structure

```
.
├── index.html                     # Home page (header + footer markup inline)
├── contact.html                   # Contact page (header + footer markup inline)
├── vite.config.js                 # Multi-page input config
├── public/
│   └── favicon.svg                # Copied verbatim to dist/
├── src/
│   ├── styles/
│   │   ├── tokens.css             # ← single source of truth for the design system
│   │   ├── global.css             # imports tokens + font, reset, typography, utilities
│   │   └── components/
│   │       ├── header.css         # fixed glass nav + mobile menu
│   │       ├── footer.css         # dark 3-column footer
│   │       ├── hero.css           # full-viewport hero + compact variant
│   │       ├── button.css         # .btn and its variants
│   │       ├── card.css           # .card, quote/location variants
│   │       ├── cta.css            # gradient call-to-action band
│   │       ├── section.css        # section rhythm, splits, stats, info lists, map
│   │       ├── form.css           # contact form controls
│   │       └── water-bg.css       # placement/opacity of the animated canvas
│   ├── js/
│   │   ├── main.js                # entry: boots everything, nav, form, footer year
│   │   ├── water-bg.js            # animated "columns of water" canvas background
│   │   └── scroll-reveal.js       # drip entrance animation (IntersectionObserver)
│   └── partials/
│       ├── header.html            # canonical header markup — copy into new pages
│       └── footer.html            # canonical footer markup — copy into new pages
└── .github/workflows/deploy.yml   # build + deploy to GitHub Pages on push to main
```

> `src/partials/*.html` are **not** fetched at runtime. They are the reference copies
> you paste into new pages, so there is always one authoritative version of the markup.

---

## Design token system

Every visual decision lives in `src/styles/tokens.css` as a CSS custom property on
`:root`. Component stylesheets reference tokens only — **no hard-coded colours,
sizes or timings anywhere else**.

Token groups:

| Group | Examples | Notes |
| --- | --- | --- |
| Colour | `--color-primary` `#2C7A8C`, `--color-primary-light` `#4A9BAA`, `--color-accent` `#7CC8D4`, `--color-surface` `#F8FAFB`, `--color-text` `#1A2E32` | Soft blues/teals over near-white surfaces |
| Overlay | `--color-white-90`, `--color-overlay`, `--color-focus-ring` | Translucent values for glass/dark surfaces |
| Gradient | `--gradient-hero`, `--gradient-cta`, `--gradient-soft`, `--gradient-water` | Reused by hero, CTA band and water effect |
| Type | `--font-family-base`, `--font-size-xs` → `--font-size-5xl`, `--font-weight-*`, `--line-height-*` | Inter, loaded from Google Fonts in `global.css` |
| Space | `--space-1` (0.25rem) → `--space-24` (6rem) | 4px-based scale |
| Radius | `--radius-sm` → `--radius-full` | |
| Shadow | `--shadow-sm/md/lg` | Tinted with the brand teal, not black |
| Motion | `--transition-fast/base/slow`, `--transition-drip` | `--transition-drip` powers the scroll reveal |
| Layout | `--container-max`, `--container-narrow`, `--container-padding`, `--nav-height`, `--z-*` | |

**To rebrand:** change the colour tokens (and optionally `--font-family-base`) and
the entire site follows. The only colours outside `tokens.css` are the RGB triples
in `src/js/water-bg.js` (canvas gradients need numeric channels) — the constant
`COLORS` array at the top of that file mirrors the accent tokens; update it to match.

### Utility classes

`global.css` ships a few helpers used across pages: `.container`,
`.container--narrow`, `.section`, `.section--alt`, `.grid` + `.grid--2` / `.grid--3`,
`.text-center`, `.lead`, `.mt-6/8/10`, `.visually-hidden`, `.skip-link`.

---

## Motion & accessibility

- **Water background** (`src/js/water-bg.js`) — a canvas injected as the first child of
  `<body>` at `z-index: -1`. Fifteen translucent columns drift downward with sine-wave
  edge distortion, drawn with `requestAnimationFrame`, retina-aware via `devicePixelRatio`,
  paused when the tab is hidden and redrawn (debounced) on resize.
- **Scroll reveal** (`src/js/scroll-reveal.js`) — anything with `class="reveal"` fades and
  rises into place as it enters the viewport, staggered ~80 ms per element.
- **`prefers-reduced-motion: reduce` is honoured everywhere.** The canvas paints a single
  static gradient instead of animating, reveals are shown immediately, and the hero
  scroll indicator stops pulsing. The listener is live, so toggling the OS setting
  updates the page without a reload.
- Skip link, visible focus rings, `aria-current` on the active nav item, labelled form
  controls, `aria-live` form status and semantic landmarks are all in place.

---

## Adding a new page

1. **Copy an existing page** as the starting point:
   ```bash
   cp contact.html services.html
   ```
2. **Update the `<head>`** — `<title>`, `<meta name="description">`, `<link rel="canonical">`
   and the Open Graph tags.
3. **Verify the stylesheet links.** Keep `global.css` first, then only the component
   stylesheets the page actually uses. Keep `<script type="module" src="/src/js/main.js">`.
4. **Refresh the header/footer markup** by pasting the current contents of
   `src/partials/header.html` and `src/partials/footer.html` over the corresponding
   blocks (they are marked with `<!-- HEADER ... -->` / `<!-- FOOTER ... -->` comments).
   Move `aria-current="page"` onto the link for the new page.
5. **Add a nav link** for the new page — edit `src/partials/header.html` *and* the header
   block in every page (there are only a few; this is the trade-off for zero plugins).
6. **Register the page with Vite** in `vite.config.js`:
   ```js
   input: {
     main: 'index.html',
     contact: 'contact.html',
     services: 'services.html', // ← add this
   }
   ```
7. Add `class="reveal"` to headings, cards and paragraphs you want to animate in.
8. Run `npm run build` to confirm the page is emitted into `dist/`.

---

## Deployment

### GitHub Pages (free, already wired up)

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The workflow runs `npm ci && npm run build` and deploys the artifact.
3. **Custom domain:** Settings → Pages → Custom domain (e.g. `headlightmentalhealthcare.com`),
   then add a `public/CNAME` file containing the domain so it survives rebuilds.
4. If you deploy to a **project** page (`user.github.io/repo-name`) rather than a custom
   domain or user page, set `base: '/repo-name/'` in `vite.config.js` and use relative
   asset paths.

### DNS at Namecheap (or any registrar)

Point the apex domain at GitHub Pages:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   <your-github-username>.github.io.
```

### Alternatives

| Host | Setup |
| --- | --- |
| **Netlify** | Connect the repo → build command `npm run build`, publish directory `dist`. Bonus: swap the fake submit handler for Netlify Forms by adding `netlify` + `name="contact"` to the `<form>`. |
| **Cloudflare Pages** | Framework preset *Vite*, build command `npm run build`, output `dist`. Free global CDN + free SSL. |
| **Vercel** | Zero-config; it detects Vite and uses `dist`. |
| **Any static host / S3** | Upload the contents of `dist/` — there is no server-side component. |

---

## Swapping in real assets & content

| What | Where |
| --- | --- |
| **Logo** | The `.brand__mark` span (currently the letter `H` on a gradient chip) in the header/footer blocks and in `src/partials/*.html`. Replace with `<img src="/logo.svg" alt="Headlight Mental Healthcare">` and drop the file in `public/`. |
| **Favicon** | `public/favicon.svg` |
| **Brand colours** | `src/styles/tokens.css`, plus the `COLORS` array in `src/js/water-bg.js` |
| **Hero / about imagery** | `.media-placeholder` blocks — replace with `<img>` or set a real background on `.hero`. Real water footage can go in as `<video class="hero__video" autoplay muted loop playsinline>` behind `.hero::before`; keep the overlay for text contrast and gate playback on `prefers-reduced-motion`. |
| **Map** | The `.map-frame` block on `contact.html` — replace with a Google Maps `<iframe>` (add `loading="lazy"` and a `title`). |
| **Phone / email / addresses** | Header, footer and contact page blocks; search for `(800) 555-0142` and `care@headlightmentalhealthcare.com`. |
| **Contact form backend** | `initContactForm()` in `src/js/main.js` currently intercepts submit and shows a confirmation message. Point the form at Formspree, Netlify Forms or a HIPAA-appropriate intake endpoint before collecting real client information. |
| **Testimonials / stats** | Placeholder copy in `index.html` — replace with approved, consented content. |

> ⚠️ **Compliance note:** the contact form is not a secure clinical channel. Do not
> collect PHI through it without a BAA-backed provider and appropriate disclosures.

---

## License

© Headlight Mental Healthcare. All rights reserved.
