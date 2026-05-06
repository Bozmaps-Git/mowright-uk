# MowRight UK

UK lawnmower price guide and comparison tool — the AutoTrader of lawnmowers.

Single-page web app for buyers checking secondhand lawnmower listings on Facebook Marketplace, Gumtree, or eBay UK. Quickly compare new vs. used prices, specs, and verdicts across 72 popular models from 32 brands.

## Pages

- **`/`** — single-page browse with filters, search, slide-out detail panel, and side-by-side compare
- **`/mower/<brand>-<model>`** — full standalone page per mower (one of 72) with verdict, marketplace tip, pros/cons, full specs, structured data, and related mowers
- **`/<category>`** — category landing pages: `/petrol`, `/electric`, `/cordless`, `/hover`, `/robotic`, `/ride-on`, `/manual`. Each has a category-specific buying guide plus all models in that category
- **`/brand/<slug>`** — brand landing pages (32 brands) with parent group, UK position, and all models from that brand
- **`/buying-guide`** — buying guide hub indexing all category guides plus universal Marketplace tips
- **`/about`** — what MowRight is, where the prices come from, brand and category indexes
- **`/privacy`** — privacy policy

## Tech

Pure static site — HTML, CSS, vanilla JS. No frameworks, no npm dependencies at runtime, no build step on Vercel.

- **`index.html`** is the SPA browse tool. It fetches `mowers.json` on load.
- **`mower/`, `brand/`, `petrol.html`, etc.** are static HTML files generated from `mowers.json` by `scripts/build.mjs`. They are committed to the repo and served directly by Vercel.
- **`style.css`** is the shared stylesheet for all generated content pages.

Loads Barlow + Barlow Condensed from Google Fonts. Brand logos from `cdn.worldvectorlogo.com`.

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
