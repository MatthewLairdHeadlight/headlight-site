# Headlight Mental Healthcare — Multi-page Static Site

A Vite-powered, dependency-light static marketing site for Headlight Mental Healthcare.

## Pages

- `index.html` — Home
- `about.html` — Matthew Laird, PMHNP-BC
- `services.html` — What We Treat
- `appointments.html` — Appointment request / intake UI
- `contact.html` — Contact details and general contact form UI
- `blog.html` — Blog index placeholders

## Stack

- **Build tool:** Vite 5
- **Framework:** none
- **Shared system:** centralized CSS design tokens + reusable Web Components

## Getting started

```bash
npm install
npm run dev
npm run build
npm run preview
```

Requires Node 18+.

## Shared component system

Cross-page consistency is driven by shared components in `/src/js/site-components.js`:

- `<site-header active="...">`
- `<page-banner ...>`
- `<site-cta ...>`
- `<site-footer>`

The most important shared component is `<page-banner>`. Every page uses the same banner
markup and styling; pages only change the title, subtitle, badge/fine print, and the
button content passed into the `actions` slot.

Example:

```html
<page-banner
  compact
  badge="What we treat"
  title="Evidence-based services"
  subtitle="Shared banner content stays visually consistent across the site."
>
  <a slot="actions" class="btn btn--lg btn--on-dark" href="/appointments.html#intake">
    Request an Appointment
  </a>
</page-banner>
```

## Design tokens

All colors, spacing, typography, shadows, and layout variables live in:

- `/src/styles/tokens.css`

Component styles reference tokens only. Do not hard-code page-specific colors or spacing in
HTML files.

## Shared styles

- `/src/styles/components/header.css`
- `/src/styles/components/hero.css`
- `/src/styles/components/button.css`
- `/src/styles/components/card.css`
- `/src/styles/components/section.css`
- `/src/styles/components/cta.css`
- `/src/styles/components/form.css`
- `/src/styles/components/footer.css`
- `/src/styles/components/content.css`
- `/src/styles/components/water-bg.css`

## Adding a new page consistently

1. Copy an existing page.
2. Keep the shared stylesheet imports and `/src/js/main.js`.
3. Use `<site-header>`, `<page-banner>`, optional shared sections/cards/CTA, and `<site-footer>`.
4. Add the page to `vite.config.js`.
5. Run `npm run build`.

## Logo, photography, and badge swap-in locations

The current site uses tasteful placeholders so design work is not blocked on final assets.

- **Real logo file:** drop it in `/public/logo.svg`, then update `renderBrand()` in
  `/src/js/site-components.js` to replace the placeholder overlapping-circle mark/text with an
  `<img src="/logo.svg" alt="Headlight Mental Healthcare">`.
- **Photography:** place final images in `/public/images/` and replace each `.media-placeholder`
  block in the relevant page with an `<img>` tag or approved background treatment.
- **Trust badges / partner logos:** place final badge files in `/public/images/badges/` and
  replace the `.badge-placeholder` blocks on the home page.
- **Provider headshot:** replace the about-page `.media-placeholder` with an approved image from
  `/public/images/people/`.

## Forms and compliance note

The appointment intake and contact forms are intentionally front-end placeholders only.

- They do **not** submit to a backend.
- They must be connected to a **HIPAA-compliant** form or intake provider before collecting real
  patient information.
- Do not route patient details to an insecure endpoint.

## Blog updates

The blog index is a static placeholder layout. To add posts:

1. Duplicate one of the `.card--post` blocks in `blog.html`.
2. Update the date, title, and summary.
3. If you later want dedicated article pages, add new HTML files and register them in
   `vite.config.js`.

## Deployment

GitHub Pages deployment remains configured in `.github/workflows/deploy.yml`.

## Notes

- All displayed practice phone numbers are tap-to-call `tel:` links.
- The animated water banner and global drip reveal effects honor `prefers-reduced-motion`.
