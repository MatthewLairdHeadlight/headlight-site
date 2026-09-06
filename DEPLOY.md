# Deployment Guide

## Cloudflare Pages

**Build command:** `npm run build`  
**Build output directory:** `dist`  
**Environment variable:** Do **not** set `BASE_PATH`. Cloudflare Pages serves from the
root of a custom domain, so the default `'/'` base is correct.

### Setup steps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to
   **Workers & Pages**.
2. Click **Create application → Pages → Connect to Git**.
3. Authorize the GitHub integration and select the `headlight-site` repository.
4. Set **Framework preset** to "None" (Vite is auto-detected via `package.json`).
5. Set **Build command** to `npm run build`.
6. Set **Build output directory** to `dist`.
7. Leave `BASE_PATH` unset (no environment variable needed).
8. Click **Save and Deploy**.

### Custom domain attachment

1. In the Pages project, go to **Custom domains → Set up a custom domain**.
2. Enter your domain (e.g., `headlightmentalhealthcare.com`).
3. Cloudflare will prompt you to add a CNAME record — follow the on-screen
   instructions. If your domain's DNS is already managed by Cloudflare, this is
   automatic.

---

## GitHub Pages (fallback / current live deployment)

GitHub Actions (`.github/workflows/deploy.yml`) builds the site with
`BASE_PATH=/headlight-site/` and deploys to the `github-pages` environment. This
produces subpath URLs (`/headlight-site/images/…`) required for project-site hosting.

**No manual steps are needed** — pushes to `main` trigger a deploy automatically.

---

## Contact and booking embeds — HIPAA boundary note

The contact page embeds live CharmHealth booking calendars via `<iframe>` elements
pointing at `https://ehr.charmtracker.com/...`, and the shared shell loads the Charm
chatbot from the same domain. **There is no repo-side form handler, no email
forwarding, and no server-side code in this repository.** PHI is collected and stored
inside CharmHealth under its HIPAA Business Associate Agreement. Do not add
client-side logging, analytics, or request interception that would cause PHI to transit
infrastructure outside that BAA boundary.
