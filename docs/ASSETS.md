# Asset Provenance

## Recovery SHA for deleted root media

Root-level raw source media was removed in the commit that introduced this file.
The pre-deletion commit SHA is **`d13d704`**. All original files remain retrievable
via `git show d13d704:<filename>`.

---

## Personal photos (`assets/images/personal/p01–p24.jpg`)

These are optimized derivatives (≤1200 px longest edge, JPEG quality ~82, subtle
cool grade) of owner-supplied Apple Photos exports. The exact mapping from UUID
source filenames to optimized sequence numbers was not recorded at ingestion time;
the complete set of UUID source files is recoverable from commit `d13d704` (see
above).

**Optimization recipe used:**
- Resize: longest edge ≤ 1200 px (Lanczos resampling)
- Encode: JPEG quality ~82
- Grade: subtle cool color grade applied in post

---

## Stock / curated images (`assets/images/stock/`)

| Optimized file | Notes |
|---|---|
| `IMG_2735.jpeg` | Owner-supplied personal headshot; not a stock photo |
| `water-reflection.jpg` | Derived from `AdobeStock_735059429calm water reflection peace.jpeg` |
| `foggy-landscape.jpg` | Derived from `AdobeStock_1837699503foggy landscape solitude.jpeg` |
| `clinic-bg.jpg` | Owner-supplied clinic photo; derived from a UUID source |
| `matthew-headshot.jpg` | Derived from `AdobeStock_175086954_Matthew..jpeg` |
| `matthew-alt.jpg` | Derived from a UUID source |
| `matthew-wide.jpg` | Derived from a UUID source |
| `multnomah.jpg` | Derived from `AdobeStock_pnw.multnomah.327082696.jpeg` |

Same optimization recipe as personal photos (see above).

---

## Fabricated assets — found and resolved

| Asset | Introduced by | Disposition |
|---|---|---|
| `assets/images/benefit-corp-badge.png` | Agent fabrication (commit `b311353`); 200×200 synthetic PNG | **Replaced** with owner-supplied JPEG (`benefit-corp-badge.png`, commit `c325518`) re-encoded as true PNG with all EXIF/IPTC/XMP metadata stripped |
| `assets/images/genesight-logo.svg` | Agent-generated rendition of Myriad Genetics registered trademark (commit `1969ad8`) | **Removed**; all references already point to `genesight-logo.png` (owner-supplied) |
| `assets/favicon.svg` | Agent-generated (two-overlapping-circles) | **Replaced** with plain solid-color mark in brand color `#0476EB` — `logo.svg` has 27 Adobe Illustrator paths spanning a 1886×578 viewBox; faithful reduction to 32×32 is not possible without redesign, so the task fallback was applied |

---

## Private source material

`docs/source-media/benefit-corp-certificate.jpeg` is an owner-supplied photograph
of the Benefit Corporations for Good certificate. It is deliberately outside
`publicDir` (`assets/`) and **must never be moved back into `assets/`**. Moving it
would publish it to the live site at a guessable URL.

---

## Standing rule

Third-party logos and certification marks must only ever be the official files
supplied by that organization — never generated, approximated, or traced.
