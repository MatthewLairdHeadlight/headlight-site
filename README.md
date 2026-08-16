# Headlight Mental Healthcare — Static Site

Multi-page static site built with [Vite](https://vitejs.dev/).  
Provider: **Matthew Laird, PMHNP-BC** · Portland, Oregon.

## Quick Start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
headlight-site/
├── index.html              # Home
├── about/index.html        # About / Meet Matthew
├── services/index.html     # Services
├── contact/index.html      # Contact / Appointment Request
├── src/
│   ├── css/
│   │   ├── tokens.css      # Design tokens (colors, spacing, type)
│   │   ├── base.css        # Global reset + shared components
│   │   ├── ken-burns.css   # Ken Burns slideshow component
│   │   ├── about.css       # About-page specific styles
│   │   └── contact.css     # Contact form styles
│   ├── js/
│   │   ├── ken-burns.js    # Ken Burns slideshow controller
│   │   ├── shell.js        # Shared header/footer HTML (DRY)
│   │   └── site.js         # Shared utilities (nav, header scroll)
│   └── pages/
│       ├── index.js        # Home entry
│       ├── about.js        # About entry (imports ken-burns)
│       ├── services.js     # Services entry
│       └── contact.js      # Contact entry
├── assets/
│   ├── favicon.svg
│   ├── images/
│   │   ├── personal/       # Optimized personal photos (p01–p24.jpg)
│   │   └── stock/          # Optimized stock/professional images
└── vite.config.js
```

## Asset Map

### Personal Photos (Ken Burns Life Collage — About Page)

All 24 are web-optimized (max 1200px, quality 82, subtle cool grade applied):

| File   | Source Original                                      | Aspect  |
|--------|------------------------------------------------------|---------|
| p01.jpg | 1144D5B3-53AA-4C91-B2FA-892B110ABBF9_1_105_c.jpeg  | 3:4     |
| p02.jpg | 221C5B81-AD81-43B5-8A63-0AC12808A457_1_105_c.jpeg  | 3:4     |
| p03.jpg | 4B9EF61A-ED3A-4ED4-B768-63EDE54AB4E9_1_105_c.jpeg  | 3:4     |
| p04.jpg | 5B5D82B5-04BE-4655-B008-0556B3D914DF_1_105_c.jpeg  | 3:4     |
| p05.jpg | 62F4002C-D482-4B30-894D-E04BDD04DA2D_1_105_c.jpeg  | 3:4     |
| p06.jpg | 83047D74-ED30-4030-A92D-B03F1F252F3B_1_105_c.jpeg  | 3:4     |
| p07.jpg | 94E51B1D-AA2F-4325-89A1-4195D09DCFF3_1_105_c.jpeg  | 3:4     |
| p08.jpg | AB8040E7-CA75-4C2E-9122-FA8260B55258_1_105_c.jpeg  | 3:4     |
| p09.jpg | AD30BC43-ADF6-4DE3-82FB-2BE8946845BC_1_105_c.jpeg  | 3:4     |
| p10.jpg | BEA45FA0-5B61-4C4D-B6AE-3EED0A13CC33_1_105_c.jpeg  | 3:4     |
| p11.jpg | C7D3C454-0571-4749-A4CB-47E9CD2A8F5D_1_105_c.jpeg  | 3:4     |
| p12.jpg | F8FCE39E-E7E6-4A95-99B3-D377B1E427D2_1_105_c.jpeg  | 3:4     |
| p13.jpg | F56870D4-D332-471A-99AE-7688CCC8F07B_1_105_c.jpeg  | 3:4     |
| p14.jpg | 655E13D6-A64B-4DCF-A804-DB9C1D815E89_1_105_c.jpeg  | 16:9    |
| p15.jpg | 69C68E25-7699-43A8-9E93-9160B5E62E51_1_105_c.jpeg  | 4:3     |
| p16.jpg | A74E1457-CA97-4B01-9824-3B48B80CCCB2_1_105_c.jpeg  | 4:3     |
| p17.jpg | A78A512D-CA2B-481B-A9D9-B942DC5CCA13_1_105_c.jpeg  | 16:9    |
| p18.jpg | FC165603-51F6-4C1F-8FA4-889C8C2CD8F2_1_105_c.jpeg  | 16:9    |
| p19.jpg | 9FEEBE72-7E91-484B-9380-92EAE8B7F3BE_1_105_c.jpeg  | 1:1     |
| p20.jpg | 14B9679D-C4EE-4AB2-838D-A7D1E79405BC.jpeg          | ~4:3    |
| p21.jpg | 36CF75E0-5D43-41E2-A4DB-7E87C4115F93_1_105_c.jpeg  | 2:3     |
| p22.jpg | 6ECF20C7-996C-4867-AE69-CF3FFD67377F_1_105_c.jpeg  | 2:3     |
| p23.jpg | 9A1D0E12-ABA3-40EE-9AE5-2CFF53CDF1F0_1_105_c.jpeg  | ~1:2    |
| p24.jpg | F42A4461-AC43-4545-9430-997D20FFE1BF_1_105_c.jpeg  | ~5:6    |

**To add/remove/reorder photos:**
1. Add your optimized JPG to `assets/images/personal/` (max 1200px, ~80–150KB)
2. Add a corresponding `<div class="kb-slide">` block in `about/index.html` (copy the pattern)
3. Or remove a slide block to drop a photo — the JS adapts automatically
4. The `p01.jpg` is preloaded (first slide) — update that if you reorder

### Stock / Professional Images

| File                     | Used in                | Original                              |
|--------------------------|------------------------|---------------------------------------|
| matthew-headshot.jpg     | About + Home pages     | AdobeStock_322304683_Matthew..jpeg    |
| clinic-bg.jpg            | Services page banner   | AdobeStock_1648101148Grey-.jpeg       |
| foggy-landscape.jpg      | About page banner      | AdobeStock_1837699503foggy…           |
| water-reflection.jpg     | Home + Contact banners | AdobeStock_735059429calm water…       |
| multnomah.jpg            | (available / spare)    | AdobeStock_pnw.multnomah.327082696    |

Original full-resolution files remain in the repository root (untouched).

## Ken Burns Component

`src/css/ken-burns.css` + `src/js/ken-burns.js` are a **reusable, standalone** component.

- **8 CSS pan/zoom animations** (zoom-in from corners, zoom-out, left/right/up drift) cycling via JS
- **crossfade** controlled by `--kb-fade` CSS custom property
- **Subtle cool grade** applied at optimize time (Python/Pillow): −2% red, +4% blue, +5% contrast
- **Soft vignette** via `::before` radial-gradient
- **Dark scrim** behind quote via `::after` linear-gradient  
- **`prefers-reduced-motion`**: pan/zoom disabled, gentle opacity fade only
- **Tab visibility API**: pauses animation when tab hidden (CPU savings)

Timing is driven by CSS custom properties — easy to tune:
```css
:root {
  --kb-duration: 8s;    /* pan/zoom per slide */
  --kb-fade: 1.5s;      /* crossfade overlap */
}

