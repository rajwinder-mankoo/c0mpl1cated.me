# c0mpl1cated.me

The c0mpl1cated.labs homelab hub. Companion to the portfolio at
[rajwindersinghmankoo.dev](https://rajwindersinghmankoo.dev).

## How the two sites fit together

| | rajwindersinghmankoo.dev | c0mpl1cated.me |
|---|---|---|
| Audience | Recruiters, professional | Anyone curious about the lab |
| Content | Experience, research, résumé, **writeups (canonical)** | The machines, design rules, project index, journal |
| Hosting | GitHub Pages | Cloudflare Pages |

- **One theme.** `src/style.css`, `src/script.js` and the fonts are copied verbatim
  from the portfolio. Lab-only additions live in `src/lab.css`. After changing the
  portfolio's design, run `npm run sync-theme` and commit.
- **One source of truth for content.** Projects (`labs.json`) and writeups are
  authored in the portfolio repo, which publishes `/feeds/labs.json` and
  `/feeds/writeups.json`. This site fetches them at build time (`src/_data/feeds.js`)
  and links writeups back to the portfolio, so there is no duplicate content.
  If the portfolio is unreachable, the build uses `src/_data/fallback/`.
- **Auto-rebuild.** The portfolio's deploy workflow calls this site's Cloudflare
  Pages deploy hook after every deploy.
- **Lab-only content** (the machines, principles, stack) is in `src/_data/lab.json`.

## OPSEC rule for anything published here

Describe the architecture in general terms. Never publish internal IPs, hostnames,
token or user names, internal subdomains, or screenshots that show them.

## Develop

```bash
npm install
npm run serve     # http://localhost:8080
npm run build && npm run check
```

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repo.
3. Build settings: framework preset **Eleventy**, build command `npm run build`,
   output directory `_site`. Environment variable `NODE_VERSION` = `20`.
4. Custom domains → add `c0mpl1cated.me` (and optionally `www.c0mpl1cated.me`).
5. Settings → Builds → Deploy hooks → create one named `portfolio`, copy the URL,
   and save it in the **portfolio** repo as the secret `LAB_SITE_DEPLOY_HOOK`.

Security headers (CSP, HSTS, no framing) are set in `src/_headers`.
