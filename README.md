# MowRight UK

UK lawnmower price guide and comparison tool — the AutoTrader of lawnmowers.

Single-page web app for buyers checking secondhand lawnmower listings on Facebook Marketplace, Gumtree, or eBay UK. Quickly compare new vs. used prices, specs, and verdicts across 47 popular models from 23 brands.

## What it does

- **Live search** across brand, model, type, engine, and feature keywords
- **47 mowers** covering petrol, electric, cordless, robotic, ride-on and push cylinder
- **Used vs new pricing** with averaged Facebook Marketplace / eBay UK figures
- **Detail panel** with expert verdict, marketplace buying tip, full specs, pros/cons
- **Compare up to 4 mowers** side-by-side with winners highlighted
- **Buying guide** with practical advice for each mower category
- **AdSense-ready** with four pre-defined placement zones

## Tech

Single `index.html` — no build step, no frameworks, no npm. Just HTML, CSS, and vanilla JS. Loads Barlow + Barlow Condensed from Google Fonts and brand logos from `cdn.worldvectorlogo.com`.

## Deploy

Pushes to `main` deploy automatically to Vercel. `vercel.json` ships security headers and SPA routing.

Target: https://mowrightuk.vercel.app

## Local

Open `index.html` in any browser. That's it.
