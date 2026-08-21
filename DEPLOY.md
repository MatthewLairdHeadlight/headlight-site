# Deployment Guide

## Cloudflare Pages (primary host)

1. In Cloudflare, open **Workers & Pages** and create a new **Pages** project.
2. Connect this GitHub repository (`MatthewLairdHeadlight/headlight-site`).
3. Use these build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** none required (`BASE_PATH` should be left unset)
4. Save and deploy.

This repository includes:
- `wrangler.toml` for Pages build output (`dist`)
- `_headers` for security headers
- `_redirects` for clean URL redirects (for example `/about` → `/about/`)

## Custom domain setup

1. In the Cloudflare Pages project, open **Custom domains**.
2. Add your domain (for example `headlightmentalhealthcare.com` and `www.headlightmentalhealthcare.com`).
3. Follow Cloudflare’s DNS prompts to point the domain at Pages.
4. Wait for SSL to show as active.

## GitHub Pages fallback

GitHub Pages deployment remains active through `.github/workflows/deploy.yml`.

- GitHub Pages builds with `BASE_PATH=/headlight-site/` (project-site subpath).
- Cloudflare Pages builds with no `BASE_PATH` (domain root `/`).

## Important forms and email note

The contact page uses an embedded IntakeQ form (`https://intakeq.com/new/dtglwx`).

- This repo does **not** include a self-hosted form handler.
- This repo does **not** include an email delivery service for form submissions.
- Submissions go to the IntakeQ account, and notification emails are configured inside IntakeQ settings.

Do not replace patient intake with general form-to-email tools (Formspree, Netlify Forms, Ninja Forms, etc.). Those services are not HIPAA-compliant for patient intake and do not provide the required BAA.
