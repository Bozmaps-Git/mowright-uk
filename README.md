# MowRight UK

UK lawnmower price guide and comparison tool — the AutoTrader of lawnmowers.

Single-page web app for buyers checking secondhand lawnmower listings on Facebook Marketplace, Gumtree, or eBay UK. Quickly compare new vs. used prices, specs, and verdicts across 72 popular models from 32 brands.

## Pages

- **`/marketplace`** — public listings grid (used mowers from UK owners), with type / condition / price / search filters
- **`/sell`** — seller flow: magic-link auth → listing form with photos → publishes listing → goes live for 30 days. Free while in early access (default `LISTING_FEE_PENCE=0` skips Stripe entirely); set the env var to charge later. Setup steps in `MARKETPLACE_SETUP.md`.
- **`/listing?id=…`** — listing detail with native-share + WhatsApp / Facebook / X / Reddit / Email share buttons
- **`/account`** — seller's "My listings" dashboard (pay for drafts, copy share link, mark sold, delete)
- **`/`** — single-page browse with filters, search, slide-out detail panel, and side-by-side compare
- **`/mower/<brand>-<model>`** — full standalone page per mower (one of 151) with verdict, marketplace tip, pros/cons, full specs, structured data, and related mowers
- **`/<category>`** — category landing pages: `/petrol`, `/electric`, `/cordless`, `/hover`, `/robotic`, `/ride-on`, `/manual`. Each has a category-specific buying guide plus all models in that category
- **`/brand/<slug>`** — brand landing pages (37 brands) with parent group, UK position, and all models from that brand. Single-model brand pages are `noindex` (low-content avoidance).
- **`/find-my-mower`** — 6-question quiz that recommends 3 mowers from the catalogue based on lawn size, terrain, budget, priority, condition and power preference
- **`/buying-guide`** — buying guide hub indexing all category guides plus universal Marketplace tips
- **`/blog`** — long-form articles and inspection guides
- **`/engines`** — engine deep-dives (Honda GCV, Briggs, Kawasaki, Stiga, Loncin)
- **`/best/<slug>`** — curated best-of rankings (quietest robotic, best used bargain, etc.)
- **`/vs/<a>-vs-<b>`** — head-to-head comparison pages
- **`/about`** — who runs MowRight, methodology, brand index, named-editor byline
- **`/editorial`** — full editorial policy and research methodology
- **`/contact`** — contact page with editorial and general inboxes, publisher address
- **`/privacy`** — privacy policy (UK GDPR)
- **`/cookies`** — cookie policy with full named-cookie table
- **`/terms`** — terms of use
- **`/credits`** — image attributions (Wikimedia CC BY-SA)

The site ships with a cookie-consent banner (`mw_consent` cookie, 12-month lifetime) that defaults to no advertising cookies until accepted.

## Tech

Pure static site — HTML, CSS, vanilla JS. No frameworks, no npm dependencies at runtime, no build step on Vercel. Visual design adapted from Claude Design's V2 prototype (light theme, sage-green accent, Inter + JetBrains Mono).

- **`index.html`** is the SPA browse tool — vanilla JS, fetches `mowers-spa.json` on load.
- **`mower/`, `brand/`, `petrol.html`, etc.** are static HTML files generated from `mowers.json` by `scripts/build.mjs`. They are committed to the repo and served directly by Vercel.
- **`style.css`** is the shared stylesheet for the SPA and every generated page.
- **`mowers.json`** is the authoritative dataset (one record per mower, original schema).
- **`mowers-spa.json`** is generated from `mowers.json` at build time, with the design's expected fields (brandSlug, typeSlug, valueScore /10, lawnSize as title-case, cutWidth/weight as numbers, etc).

Loads Inter and JetBrains Mono from Google Fonts. SVG mower illustrations are generated inline (one per category).

## Editing mower data

All mower entries live in `mowers.json`. Each object follows this schema:

```
{ "id": 1, "b": "Honda", "n": "HRX 476 VY", "t": "Petrol", "tag": "...",
  "eng": "...", "cut": "47cm", "ch": "14-92mm", "box": "85L", "wt": "40kg",
  "sp": 1, "mul": 1, "rol": 1, "col": 1,
  "ls": "large", "m2": 2500, "pwr": "Petrol 4-stroke",
  "rrp": 949, "p": 899, "u": 550, "r": 4.7, "rv": 412, "rank": 3, "v": 88,
  "tags": ["expert"], "pros": [...], "cons": [...], "verd": "...", "tip": "..." }
```

Type (`t`) must be one of: `Petrol`, `Electric`, `Cordless`, `Hover`, `Robotic`, `Ride-on`, `Push`.

After editing `mowers.json`, regenerate the static pages:

```
npm run build
```

This rebuilds all `mower/<slug>.html`, category pages, brand pages, `about.html`, `buying-guide.html`, and `sitemap.xml`. Then commit and push.

Vercel serves `mowers.json` with a 5-minute cache so the SPA picks up edits quickly even if you forget to rebuild.

## Deploy

Pushes to `main` deploy automatically to Vercel. `vercel.json` ships security headers, clean URLs, and per-asset caching.

Target: https://mowrightuk.vercel.app

## Local

Serve the directory with any static file server:

```
python -m http.server 8765
# then visit http://127.0.0.1:8765
```

Or just open `index.html` directly (some browser features like the JSON fetch require a server).
