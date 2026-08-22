# Asset provenance

`vite.config.js` sets `publicDir: 'assets'`, so only optimized derivatives under `assets/` are copied into `dist/`. The raw source media that used to live at the repository root were never part of the built site and were removed as repo-hygiene cleanup.

## Recovery point on `main`

The last `main` commit that still contains the raw originals is:

- `ed3a49526df6ad04f14e692ca8f1cafe5b52f6b5`

Recover any removed original with:

```bash
git show ed3a49526df6ad04f14e692ca8f1cafe5b52f6b5:AdobeStock_sw.arches.137798498.jpeg > recovered.jpeg
```

Use the same pattern for any other root-level source filename.

## Optimization recipe

Historical repo documentation for the original media pass (PR #4) recorded this recipe for the personal-photo set:

- resize to a maximum 1200px longest edge
- JPEG quality `~82`
- subtle cool grade applied uniformly

That same historical record described the cool grade as:

- `-2%` red channel
- `+4%` blue channel
- `+5%` contrast

## Personal photo derivatives

These mappings come from the asset map recorded in PR #4's README plus the original add commit for `assets/images/personal/` (`0f972f7c12c52142f7a7128488e4556732829c5b`).

| Shipped asset | Root-level source filename |
| --- | --- |
| `assets/images/personal/p01.jpg` | `1144D5B3-53AA-4C91-B2FA-892B110ABBF9_1_105_c.jpeg` |
| `assets/images/personal/p02.jpg` | `221C5B81-AD81-43B5-8A63-0AC12808A457_1_105_c.jpeg` |
| `assets/images/personal/p03.jpg` | `4B9EF61A-ED3A-4ED4-B768-63EDE54AB4E9_1_105_c.jpeg` |
| `assets/images/personal/p04.jpg` | `5B5D82B5-04BE-4655-B008-0556B3D914DF_1_105_c.jpeg` |
| `assets/images/personal/p05.jpg` | `62F4002C-D482-4B30-894D-E04BDD04DA2D_1_105_c.jpeg` |
| `assets/images/personal/p06.jpg` | `83047D74-ED30-4030-A92D-B03F1F252F3B_1_105_c.jpeg` |
| `assets/images/personal/p07.jpg` | `94E51B1D-AA2F-4325-89A1-4195D09DCFF3_1_105_c.jpeg` |
| `assets/images/personal/p08.jpg` | `AB8040E7-CA75-4C2E-9122-FA8260B55258_1_105_c.jpeg` |
| `assets/images/personal/p09.jpg` | `AD30BC43-ADF6-4DE3-82FB-2BE8946845BC_1_105_c.jpeg` |
| `assets/images/personal/p10.jpg` | `BEA45FA0-5B61-4C4D-B6AE-3EED0A13CC33_1_105_c.jpeg` |
| `assets/images/personal/p11.jpg` | `C7D3C454-0571-4749-A4CB-47E9CD2A8F5D_1_105_c.jpeg` |
| `assets/images/personal/p12.jpg` | `F8FCE39E-E7E6-4A95-99B3-D377B1E427D2_1_105_c.jpeg` |
| `assets/images/personal/p13.jpg` | `F56870D4-D332-471A-99AE-7688CCC8F07B_1_105_c.jpeg` |
| `assets/images/personal/p14.jpg` | `655E13D6-A64B-4DCF-A804-DB9C1D815E89_1_105_c.jpeg` |
| `assets/images/personal/p15.jpg` | `69C68E25-7699-43A8-9E93-9160B5E62E51_1_105_c.jpeg` |
| `assets/images/personal/p16.jpg` | `A74E1457-CA97-4B01-9824-3B48B80CCCB2_1_105_c.jpeg` |
| `assets/images/personal/p17.jpg` | `A78A512D-CA2B-481B-A9D9-B942DC5CCA13_1_105_c.jpeg` |
| `assets/images/personal/p18.jpg` | `FC165603-51F6-4C1F-8FA4-889C8C2CD8F2_1_105_c.jpeg` |
| `assets/images/personal/p19.jpg` | `9FEEBE72-7E91-484B-9380-92EAE8B7F3BE_1_105_c.jpeg` |
| `assets/images/personal/p20.jpg` | `14B9679D-C4EE-4AB2-838D-A7D1E79405BC.jpeg` |
| `assets/images/personal/p21.jpg` | `36CF75E0-5D43-41E2-A4DB-7E87C4115F93_1_105_c.jpeg` |
| `assets/images/personal/p22.jpg` | `6ECF20C7-996C-4867-AE69-CF3FFD67377F_1_105_c.jpeg` |
| `assets/images/personal/p23.jpg` | `9A1D0E12-ABA3-40EE-9AE5-2CFF53CDF1F0_1_105_c.jpeg` |
| `assets/images/personal/p24.jpg` | `F42A4461-AC43-4545-9430-997D20FFE1BF_1_105_c.jpeg` |

## Stock and professional derivatives

These mappings come from the historical asset map recorded in PR #4, later git history (`bb4a437829a344e1ea137e33b4413b5e480e53bb`, `70f9e265fb92be4b274ba8b127705dc811dec4f8`), and same-image hash matches against the root-level originals in `ed3a49526df6ad04f14e692ca8f1cafe5b52f6b5`.

| Shipped asset | Root-level source filename |
| --- | --- |
| `assets/images/stock/clinic-bg.jpg` | `AdobeStock_1648101148Grey-.jpeg` |
| `assets/images/stock/foggy-landscape.jpg` | `AdobeStock_1837699503foggy landscape solitude.jpeg` |
| `assets/images/stock/matthew-alt.jpg` | `AdobeStock_193816886_Matthew.'.jpeg` |
| `assets/images/stock/matthew-headshot.jpg` | `AdobeStock_322304683_Matthew..jpeg` |
| `assets/images/stock/matthew-wide.jpg` | `AdobeStock_175086954_Matthew..jpeg` |
| `assets/images/stock/multnomah.jpg` | `AdobeStock_pnw.multnomah.327082696.jpeg` |
| `assets/images/stock/water-reflection.jpg` | `AdobeStock_735059429calm water reflection peace.jpeg` |
| `assets/images/stock/IMG_2735.jpeg` | `matthew-headshot.jpg` |

### `matthew-headshot.jpg` at the root vs. under `assets/images/stock/`

These are different files and should not be conflated:

- root `matthew-headshot.jpg`: 181 KB raw source image retained on `main` until this cleanup commit
- `assets/images/stock/matthew-headshot.jpg`: 10 KB optimized web derivative of `AdobeStock_322304683_Matthew..jpeg`

The root `matthew-headshot.jpg` is the source match for `assets/images/stock/IMG_2735.jpeg`, not for the tiny shipped `assets/images/stock/matthew-headshot.jpg`. In git history, the root file was introduced by renaming `330C08CF-61BA-4C96-B619-EC9EDF121CA9_1_105_c.jpeg` in commit `70f9e265fb92be4b274ba8b127705dc811dec4f8`.

## Removed `.mov` originals

The root-level `.mov` files were raw background-footage source files:

- `AdobeStock_156907202-EFFECTS.mov`
- `AdobeStock_1845586107.mov`
- `AdobeStock_531529321-AI-MATTHEW.mov`
- `AdobeStock_water.columns.1889888798.mov`

They were never wired into the built site, never copied into `dist/`, and are recoverable from the same `main` SHA (`ed3a49526df6ad04f14e692ca8f1cafe5b52f6b5`) if they are ever needed again.

## Benefit Corporation for Good badge

| Asset | Details |
| --- | --- |
| `assets/images/benefit-corp-badge.png` | Owner-supplied; uploaded to the repository root in commit `c325518` (renamed from `47039493-E94A-454E-86C3-2914FA20C452_1_201_a.jpeg`). Replaced the agent-fabricated badge created in commit `b311353`. Re-encoded from JPEG to true PNG with all EXIF/IPTC/XMP metadata stripped. Final dimensions: 519×392 px, 158 KB. |
