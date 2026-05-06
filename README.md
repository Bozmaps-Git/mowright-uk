# MowRight UK

UK lawnmower price guide and comparison tool — the AutoTrader of lawnmowers.

Single-page web app for buyers checking secondhand lawnmower listings on Facebook Marketplace, Gumtree, or eBay UK. Quickly compare new vs. used prices, specs, and verdicts across 72 popular models from 32 brands.

## What it does

- **Live search** across brand, model, type, engine, and feature keywords
- **72 mowers** covering petrol, electric, cordless, hover, robotic, ride-on and push cylinder
- **Used vs new pricing** with averaged Facebook Marketplace / eBay UK figures
- **Detail panel** with expert verdict, marketplace buying tip, full specs, pros/cons
- **Compare up to 4 mowers** side-by-side with winners highlighted
- **Buying guide** with practical advice for each mower category
- **AdSense-ready** with four pre-defined placement zones

## Tech

Static `index.html` plus `mowers.json` — no build step, no frameworks, no npm. Mower data is fetched from `/mowers.json` on page load; editing prices means editing one JSON file. HTML, CSS, and vanilla JS only. Loads Barlow + Barlow Condensed from Google Fonts and brand logos from `cdn.worldvectorlogo.com`.

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

Type (`t`) must be one of: `Petrol`, `Electric`, `Cordless`, `Hover`, `Robotic`, `Ride-on`, `Push`. Vercel serves `mowers.json` with a 5-minute cache, so price edits propagate quickly.

## Deploy

Pushes to `main` deploy automatically to Vercel. `vercel.json` ships security headers and SPA routing.

Target: https://mowrightuk.vercel.app

## Local

Open `index.html` in any browser. That's it.
