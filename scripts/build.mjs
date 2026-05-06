// MowRight UK static site generator.
// Reads mowers.json and writes:
//   /mower/<slug>.html          (one per mower)
//   /<type>.html                (category landing pages)
//   /brand/<slug>.html          (brand landing pages)
//   /about.html
//   /buying-guide.html
//   /sitemap.xml                (regenerated to include all URLs)
//
// Run: `node scripts/build.mjs` (or `npm run build`).

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mowright.co.uk';

const mowers = JSON.parse(readFileSync(join(ROOT, 'mowers.json'), 'utf8'));

// ---------- Slug + URL helpers ----------
const slug = s => s.toString().toLowerCase()
  .replace(/\+/g, '-plus-').replace(/&/g, '-and-')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const mowerSlug = m => `${slug(m.b)}-${slug(m.n)}`;
const mowerUrl = m => `/mower/${mowerSlug(m)}`;
const typeSlug = t => slug(t === 'Push' ? 'manual' : t);
const typeUrl = t => `/${typeSlug(t)}`;
const brandUrl = b => `/brand/${slug(b)}`;

// ---------- Brand profiles (parent group + UK position) ----------
const BRANDS = {
  'Honda': { focus: 'Premium petrol & robotic', parent: 'Honda', position: 'Dominant in reliable, high-end petrol mowers' },
  'Mountfield': { focus: 'Petrol, cordless, ride-on', parent: 'STIGA Group', position: "One of the UK's best-selling petrol brands" },
  'Hayter': { focus: 'Premium petrol with rear rollers', parent: 'Toro Group', position: 'Iconic British brand for striped lawns' },
  'Stihl': { focus: 'Petrol, cordless, robotic', parent: 'STIHL', position: 'Premium prosumer and professional landscapers' },
  'Cobra': { focus: 'Petrol, cordless, electric', parent: 'Henton & Chattell', position: 'Massive UK dealer network, wide range' },
  'Webb': { focus: 'Hand-push cylinder, petrol', parent: 'Handy Distribution', position: 'Traditional UK lawn care' },
  'Hyundai': { focus: 'Budget petrol with steel decks', parent: 'Hyundai Power Equipment', position: 'Mid-tier petrol with 3-year warranty' },
  'Stiga': { focus: 'Petrol, cordless, ride-on', parent: 'STIGA Group', position: 'Strong independent dealer presence' },
  'Bosch': { focus: 'Electric, battery, robotic', parent: 'Bosch', position: 'Highly popular mainstream household brand' },
  'Flymo': { focus: 'Hover mowers, electric, cordless', parent: 'Husqvarna Group', position: 'Iconic UK household staple' },
  'Einhell': { focus: 'Cordless (Power X-Change)', parent: 'Einhell Germany AG', position: 'Rapidly growing mid-tier DIY' },
  'EGO': { focus: 'Premium high-voltage cordless', parent: 'Chervon', position: 'Top-tier battery replacement for petrol' },
  'Husqvarna': { focus: 'Petrol, robotic (Automower)', parent: 'Husqvarna Group', position: 'Premium prosumer and professional' },
  'Greenworks': { focus: 'Cordless systems', parent: 'Globe Tools', position: 'Popular mid-tier battery option' },
  'Ryobi': { focus: '18V/36V cordless systems', parent: 'TTI Group', position: 'Extremely popular with home DIYers' },
  'Makita': { focus: 'Professional cordless, petrol', parent: 'Makita', position: 'Favoured by tradespeople and landscapers' },
  'Worx': { focus: 'Robotic (Landroid), cordless', parent: 'Positec Group', position: 'Highly popular in the robotic market' },
  'Gardena': { focus: 'Cordless, robotic', parent: 'Husqvarna Group', position: 'Continental-style domestic gardening' },
  'Mammotion': { focus: 'Wire-free RTK & AWD robotic', parent: 'Mammotion', position: 'Newer challenger in robotic mowers' },
  'Segway': { focus: 'Wire-free robotic', parent: 'Segway-Ninebot', position: 'Camera + RTK robot mowers' },
  'John Deere': { focus: 'Premium garden tractors, ride-on', parent: 'John Deere', position: 'Default sensible ride-on for half-acre+ UK lawns' },
  'Cub Cadet': { focus: 'American-style lawn tractors', parent: 'MTD / Stanley Black & Decker', position: 'Heavy-duty ride-on with Kohler power' },
  'Countax': { focus: 'Premium garden tractors, ride-on', parent: 'AriensCo', position: 'UK-built, heavy-duty groundskeeping' },
  'Atco': { focus: 'Premium petrol, ride-on, cylinder', parent: 'STIGA Group', position: 'Traditional British heritage brand' },
  'Qualcast': { focus: 'Budget electric, petrol, cylinder', parent: 'Homebase / Argos', position: 'Legacy UK brand, now retailer-owned' },
  'Mac Allister': { focus: 'Budget/mid electric, petrol', parent: 'Kingfisher Group', position: 'B&Q mainstream exclusive' },
  'Black+Decker': { focus: 'Budget electric, cordless', parent: 'Stanley Black & Decker', position: 'Popular entry-level DIY' },
  'Parkside': { focus: 'Budget electric, cordless', parent: 'Lidl', position: 'Supermarket exclusive "Middle Aisle"' },
  'Ferrex': { focus: 'Budget electric, cordless', parent: 'Aldi', position: 'Supermarket exclusive "Specialbuy"' },
  'Spear & Jackson': { focus: 'Budget electric, cordless', parent: 'Homebase / Argos', position: 'Retailer-exclusive budget line' },
  'Westwood': { focus: 'Premium garden tractors, ride-on', parent: 'AriensCo', position: 'UK-built twin to Countax' },
  'Yard Force': { focus: 'Budget robotic, cordless', parent: 'Sumec', position: 'High volume on Amazon and Argos' }
};

// ---------- Category copy ----------
const CATEGORIES = {
  'Petrol': {
    slug: 'petrol',
    title: 'Petrol Lawnmowers',
    intro: 'The category that still dominates UK gardens over 800m². Petrol mowers cut faster, cope with longer and wetter grass, and never need a charge. Used supply on Facebook Marketplace and eBay UK is enormous — most weeks bring fresh listings of Mountfield, Honda, Hayter and Stihl machines.',
    advice: [
      ['Cold-start it', 'A hot engine hides starting issues. Always insist on firing it from cold before you pay.'],
      ['Check the oil', 'Pull the dipstick. Golden = recently serviced. Black or milky = avoid or knock £80 off the price.'],
      ['Test self-propel under load', 'A flat driveway is not a test. Walk it up an incline. A slipping drive belt is the #1 fault.'],
      ['Inspect the deck', 'Lift the mower. Look for welded repairs, cracks, or rust holes. Surface rust is fine; structural rust is not.'],
      ['Honda holds value', 'A used Honda HRX retains 50–60% of its new price for years. Mountfield and Webb depreciate fast — that cuts both ways.']
    ]
  },
  'Electric': {
    slug: 'electric',
    title: 'Corded Electric Lawnmowers',
    intro: 'The right mower for small-to-medium UK lawns near a power point. Electric mowers are lighter, quieter, and cheaper to run than petrol. The cable is the only real friction. Bosch Rotaks, Flymo EasiMow and Qualcast budget units dominate the used market.',
    advice: [
      ['Check the cable end-to-end', 'Cable damage is the #1 fault. Tape repairs are red flags. A rewire is £15 if you know what you are doing.'],
      ['Listen for motor whine', 'A healthy motor runs smoothly. A high-pitched whine means worn brushes — halve the price.'],
      ['Plastic chassis cracks', 'Around the handle joint and wheel mounts especially. Inspect closely.'],
      ['Stripes from electric is rare', 'The Bosch Rotak 36 R and Flymo EasiMow 380R have rear rollers. Most electric mowers do not.'],
      ['Sub-£50 buys are everywhere', 'On Marketplace, never overpay for an electric. Walk away from anything dirty or with cable repairs — the next one will appear tomorrow.']
    ]
  },
  'Cordless': {
    slug: 'cordless',
    title: 'Cordless Battery Lawnmowers',
    intro: 'The fastest-growing category in UK lawncare. Modern 36V–60V cordless platforms (EGO, Greenworks, Husqvarna) genuinely match petrol on cut quality without fumes, noise, or fuel runs. The battery is the entire game — a tired battery destroys an otherwise mint mower.',
    advice: [
      ['Demand a runtime test', 'A healthy 4Ah battery runs 25–35 minutes. Under 15 minutes means the cells are gone and a replacement is £150–£300.'],
      ['Originals only', 'Aftermarket batteries on EGO, Stihl AP, and Makita LXT can damage the mower. Insist on the original brand pack.'],
      ['Check the cell count', 'Through the charge ports you can see the cells. Counterfeit packs (especially Ryobi ONE+) are common — buy from sellers with original receipts.'],
      ['Twin-battery designs', 'Mismatched battery pairs (one new, one tired) give 10 minutes of runtime. Test both packs individually.'],
      ['Resale tiers', 'EGO and Makita batteries hold value best. Greenworks 60V, Worx, and Cobra batteries depreciate fast.']
    ]
  },
  'Hover': {
    slug: 'hover',
    title: 'Hover Lawnmowers',
    intro: 'The British answer to awkward lawns. A hover mower glides on a cushion of air, which means slopes, banks, and fence edges that defeat wheeled mowers are easy. Flymo invented the category and still owns it — Hover Vac and Glider models appear on Marketplace constantly.',
    advice: [
      ['Test the lift fan', 'The fan housing develops cracks after years of bumping. Flip it and inspect — cracks ruin the cushion.'],
      ['Cable management is the trade-off', 'Hover mowers need power, and the cable on a hilly lawn is genuinely fiddly. Plan your route.'],
      ['Mulch vs collect', 'Hover Vac models collect clippings. Glider models mulch. Choose based on whether you mind not bagging.'],
      ['Plastic is the build', 'These are not heirlooms. Sub-£40 used and the supply on Marketplace is enormous. Disposable but capable.'],
      ['Awkward gardens win', 'If your lawn has banks, drops, or odd shapes, a hover beats every wheeled mower under £200. Specifically.']
    ]
  },
  'Robotic': {
    slug: 'robotic',
    title: 'Robotic Lawnmowers',
    intro: 'The category that turns mowing into a non-decision. Boundary-wire robots (Husqvarna Automower, Worx Landroid, Bosch Indego) are mature and reliable. Wire-free RTK and camera robots (Mammotion, Segway, Worx Vision) are newer and improving fast. Used market is growing but still small.',
    advice: [
      ['Boundary wire is the #1 fault', 'On wired robots, walk every metre of the perimeter. Visible cuts mean a break — repair kits are cheap but fiddly.'],
      ['App account transfer', 'The seller must factory-reset the mower or transfer the app account. Without this, the mower will not work.'],
      ['RTK base required', 'On wire-free models (Husqvarna NERA, Mammotion LUBA, Segway Navimow), the RTK reference station must be included. Without it, the mower is a paperweight.'],
      ['Live demo before paying', 'Robots are complex. Insist on seeing it complete a perimeter pass before you hand over cash.'],
      ['Charging contacts', 'Dock contacts corrode in damp UK weather. Clean with a wire brush and judge battery life only after.']
    ]
  },
  'Ride-on': {
    slug: 'ride-on',
    title: 'Ride-On & Garden Tractor Lawnmowers',
    intro: 'The right tool for half-acre lawns and up. John Deere, Honda, and Countax dominate the premium end; Mountfield 1530H is the entry. Used ride-ons are commonly listed on Facebook Marketplace and AutoTrader Plant — engine hours matter more than years.',
    advice: [
      ['Engine hours, not years', 'Under 200 hours is excellent on any ride-on. Over 600 means assume the worst and price accordingly.'],
      ['PTO clutch test', 'Engage the cutter deck. It should bite cleanly with no slip. A worn PTO clutch is a £200+ fix.'],
      ['Hydrostatic transmission', 'Pull forward and reverse smoothly with no jolts. Belt slip under load is the most common ride-on fault.'],
      ['Service history adds value', 'A John Deere or Honda with full dealer-stamped service adds £300–£400 to fair price. No history = price as worst-case.'],
      ['Steering pull', 'Drive on a flat surface with hands off. Pulling left or right is a tracking or front-axle fault.']
    ]
  },
  'Push': {
    slug: 'manual',
    title: 'Manual Push Cylinder Lawnmowers',
    intro: 'The purist\'s mower for small ornamental lawns. No engine, no battery, no fuel — just sharp blades on a roller. Webb, Bosch, and Einhell make the modern hand-push cylinders; vintage Suffolk Punches and Atco Quattros are still found on Marketplace.',
    advice: [
      ['Cylinder sharpness is everything', 'Test cut a piece of paper at the deck. It should slice cleanly. A re-grind costs £20–£60 at any local mower shop.'],
      ['Useless on long grass', 'A manual cylinder is for short ornamental lawns. If you let it go more than a week, switch to a rotary.'],
      ['Roller bearings', 'They should turn smoothly. Replacements are simple but worth knowing about.'],
      ['Plastic wheels crack', 'Especially if stored cold and dropped. Inspect closely on used Bosch and Einhell.'],
      ['Bowling-green cuts', 'Nothing matches a sharp cylinder mower for a fine ornamental finish. If that matters, this is the only category.']
    ]
  }
};

// ---------- HTML helpers ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtPrice = n => '£' + (n || 0).toLocaleString('en-GB');
const fmtRange = arr => '£' + Math.min(...arr).toLocaleString('en-GB') + '–£' + Math.max(...arr).toLocaleString('en-GB');
const stars = r => {
  const f = Math.round(r);
  return '★'.repeat(f) + '☆'.repeat(5 - f) + ' <b>' + r.toFixed(1) + '</b>';
};

const navHtml = (current = '') => `
<header class="top" role="banner">
  <div class="top-in">
    <a href="/" class="brand" aria-label="MowRight UK home">
      <span class="lo">Mow<span>Right</span></span>
      <span class="tg">UK Lawnmower Price Guide</span>
    </a>
    <nav class="top-nav" aria-label="Primary">
      <a href="/" ${current === 'home' ? 'aria-current="page"' : ''}>Browse</a>
      <a href="/buying-guide" ${current === 'guide' ? 'aria-current="page"' : ''}>Buying Guide</a>
      <a href="/about" ${current === 'about' ? 'aria-current="page"' : ''}>About</a>
    </nav>
  </div>
</header>`;

const footerHtml = () => `
<footer>
  <div class="fnav">
    <a href="/">Browse</a>
    <a href="/buying-guide">Buying Guide</a>
    <a href="/about">About</a>
    <a href="/privacy">Privacy</a>
  </div>
  <p><b>MowRight UK</b> — Independent lawnmower price guide. Prices are typical UK street prices and Facebook Marketplace / eBay UK averages, updated periodically. Not affiliated with any manufacturer.</p>
  <p>© 2026 MowRight UK</p>
</footer>`;

const head = ({ title, description, canonical, ogImage = '/og.png', ldjson = null }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0f0f0f" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${esc(SITE + canonical)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="author" content="MowRight UK" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="MowRight UK" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(SITE + canonical)}" />
<meta property="og:locale" content="en_GB" />
<meta property="og:image" content="${esc(SITE + ogImage)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${esc(SITE + ogImage)}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/style.css" />
${ldjson ? `<script type="application/ld+json">${JSON.stringify(ldjson)}</script>` : ''}
</head>
<body>
<a href="#main" class="skip">Skip to content</a>`;

// ---------- Mower card ----------
const cardHtml = m => `
<a class="card" href="${esc(mowerUrl(m))}">
  <div class="b-name">${esc(m.b)}</div>
  <h3 class="m-name">${esc(m.n)}</h3>
  <div class="c-meta"><span class="tbadge t-${esc(m.t)}">${esc(m.t)}</span><span class="stars">${stars(m.r)}</span></div>
  <p class="c-tag">${esc(m.tag)}</p>
  <div class="c-foot"><span>Used avg ${fmtPrice(m.u)}</span><b>${fmtPrice(m.p)}</b></div>
</a>`;

// ---------- Mower detail page ----------
function renderMowerPage(m) {
  const related = mowers
    .filter(x => x.id !== m.id && x.t === m.t)
    .sort((a, b) => Math.abs(a.p - m.p) - Math.abs(b.p - m.p))
    .slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${m.b} ${m.n}`,
    brand: { '@type': 'Brand', name: m.b },
    description: m.tag,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: m.r, reviewCount: m.rv },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: m.u,
      highPrice: m.rrp || m.p,
      offerCount: 2
    }
  };

  return `${head({
    title: `${m.b} ${m.n} — UK Price, Used vs New & Buying Guide`,
    description: `${m.b} ${m.n}: new £${m.p}, used Marketplace average £${m.u}. Specs, expert verdict, pros and cons, and a marketplace buying tip.`,
    canonical: mowerUrl(m),
    ldjson: ld
  })}
${navHtml('home')}
<main id="main" class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <a href="${esc(typeUrl(m.t))}">${esc(CATEGORIES[m.t]?.title || m.t)}</a><span class="sep">›</span>
    <a href="${esc(brandUrl(m.b))}">${esc(m.b)}</a><span class="sep">›</span>
    <span aria-current="page">${esc(m.n)}</span>
  </nav>

  <section class="hero">
    <div class="hero-logo"><span class="fb">${esc(m.b.slice(0, 2).toUpperCase())}</span></div>
    <div>
      <div class="b-name">${esc(m.b)}</div>
      <h1>${esc(m.n)}</h1>
      <div class="hero-meta">
        <span class="tbadge t-${esc(m.t)}">${esc(m.t)}</span>
        <span class="stars">${stars(m.r)}</span>
        <span>${m.rv.toLocaleString('en-GB')} reviews</span>
        <span>Value ${m.v}/100</span>
      </div>
      <p class="tag">${esc(m.tag)}</p>
    </div>
  </section>

  <section class="prices" aria-label="Price summary">
    ${m.rrp ? `<div class="pp"><div class="l">RRP New</div><div class="v">${fmtPrice(m.rrp)}</div></div>` : '<div class="pp"><div class="l">RRP New</div><div class="v">—</div><div class="x">No longer in production</div></div>'}
    <div class="pp"><div class="l">Buy Now</div><div class="v">${fmtPrice(m.p)}</div></div>
    <div class="pp use"><div class="l">Used Avg</div><div class="v">${fmtPrice(m.u)}</div><div class="x">Facebook / eBay UK average</div></div>
  </section>

  <div class="box ver">
    <h4>Expert Verdict</h4>
    <p>${esc(m.verd)}</p>
  </div>

  <div class="box tip">
    <h4>Marketplace Buying Tip</h4>
    <p>${esc(m.tip)}</p>
  </div>

  <h2>Pros and Cons</h2>
  <div class="pcs">
    <div><h4>Pros</h4><ul class="pros">${m.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
    <div><h4>Cons</h4><ul class="cons">${m.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
  </div>

  <h2>Full Specifications</h2>
  <table class="specs-tbl">
    <tbody>
      <tr><th>Type</th><td>${esc(m.t)}</td></tr>
      <tr><th>Engine / Motor</th><td>${esc(m.eng)}</td></tr>
      <tr><th>Power</th><td>${esc(m.pwr)}</td></tr>
      <tr><th>Cutting Width</th><td>${esc(m.cut)}</td></tr>
      <tr><th>Cut Height Range</th><td>${esc(m.ch)}</td></tr>
      <tr><th>Grass Box</th><td>${esc(m.box)}</td></tr>
      <tr><th>Weight</th><td>${esc(m.wt)}</td></tr>
      <tr><th>Recommended Lawn Size</th><td>Up to ${m.m2.toLocaleString('en-GB')} m²</td></tr>
      <tr><th>Self-Propelled</th><td>${m.sp ? 'Yes' : 'No'}</td></tr>
      <tr><th>Mulching</th><td>${m.mul ? 'Yes' : 'No'}</td></tr>
      <tr><th>Rear Roller (Stripes)</th><td>${m.rol ? 'Yes' : 'No'}</td></tr>
      <tr><th>Collection</th><td>${m.col ? 'Yes' : 'No'}</td></tr>
    </tbody>
  </table>

  <div class="cta">
    <div>
      <h3>Compare with similar mowers</h3>
      <p>See the full comparison tool with filters, sort, and side-by-side compare.</p>
    </div>
    <a class="btn" href="/?type=${esc(m.t)}">Open Compare Tool</a>
  </div>

  ${related.length ? `
  <h2>Similar ${esc(m.t)} mowers</h2>
  <div class="cards">${related.map(cardHtml).join('')}</div>` : ''}
</main>
${footerHtml()}
</body>
</html>`;
}

// ---------- Category page ----------
function renderCategoryPage(type) {
  const cat = CATEGORIES[type];
  const list = mowers.filter(m => m.t === type).sort((a, b) => a.rank - b.rank);
  const prices = list.map(m => m.p);

  return `${head({
    title: `${cat.title} — UK Buying Guide & ${list.length} Models Compared`,
    description: `${cat.title.toLowerCase()} compared. ${list.length} models, prices from ${fmtRange(prices)}, plus a UK buying guide and Facebook Marketplace tips.`,
    canonical: typeUrl(type)
  })}
${navHtml('home')}
<main id="main" class="page page--wide">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <span aria-current="page">${esc(cat.title)}</span>
  </nav>

  <h1>${esc(cat.title)}</h1>
  <p class="lead">${esc(cat.intro)}</p>

  <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:var(--tx2);margin-bottom:8px">
    <span><b style="color:var(--gn)">${list.length}</b> models</span>
    <span>Price range <b style="color:var(--gn)">${fmtRange(prices)}</b></span>
    <span><b style="color:var(--gn)">${[...new Set(list.map(m => m.b))].length}</b> brands</span>
  </div>

  <h2>Buying Guide — ${esc(cat.title)}</h2>
  ${cat.advice.map(([h, body]) => `<div class="box"><h4>${esc(h)}</h4><p>${esc(body)}</p></div>`).join('')}

  <h2>All ${esc(cat.title)}</h2>
  <div class="cards">${list.map(cardHtml).join('')}</div>

  <div class="cta">
    <div>
      <h3>Use the full comparison tool</h3>
      <p>Filter by lawn size, budget, features and brand. Compare up to 4 mowers side by side.</p>
    </div>
    <a class="btn" href="/?type=${esc(type)}">Open Compare Tool</a>
  </div>
</main>
${footerHtml()}
</body>
</html>`;
}

// ---------- Brand page ----------
function renderBrandPage(brand) {
  const profile = BRANDS[brand] || { focus: '', parent: '', position: '' };
  const list = mowers.filter(m => m.b === brand).sort((a, b) => a.rank - b.rank);
  const prices = list.map(m => m.p);
  const types = [...new Set(list.map(m => m.t))];

  return `${head({
    title: `${brand} Lawnmowers — UK Range, Used Prices & Buying Guide`,
    description: `${brand} lawnmower range compared. ${list.length} model${list.length === 1 ? '' : 's'} with new and used UK prices, expert verdicts, and Facebook Marketplace buying tips.`,
    canonical: brandUrl(brand)
  })}
${navHtml('home')}
<main id="main" class="page page--wide">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <a href="/about">Brands</a><span class="sep">›</span>
    <span aria-current="page">${esc(brand)}</span>
  </nav>

  <h1>${esc(brand)} Lawnmowers</h1>
  ${profile.focus ? `<p class="lead">${esc(profile.focus)}. ${esc(profile.position)}.</p>` : ''}

  <table class="specs-tbl" style="max-width:600px">
    <tbody>
      ${profile.parent ? `<tr><th>Parent group</th><td>${esc(profile.parent)}</td></tr>` : ''}
      ${profile.focus ? `<tr><th>Focus</th><td>${esc(profile.focus)}</td></tr>` : ''}
      ${profile.position ? `<tr><th>UK position</th><td>${esc(profile.position)}</td></tr>` : ''}
      <tr><th>Models in catalogue</th><td>${list.length}</td></tr>
      <tr><th>Categories</th><td>${types.join(', ')}</td></tr>
      ${prices.length ? `<tr><th>Price range (new)</th><td>${fmtRange(prices)}</td></tr>` : ''}
    </tbody>
  </table>

  <h2>${esc(brand)} models in our database</h2>
  <div class="cards">${list.map(cardHtml).join('')}</div>

  <div class="cta">
    <div>
      <h3>Compare ${esc(brand)} mowers</h3>
      <p>Filter and compare ${esc(brand)} models side by side with their rivals from other brands.</p>
    </div>
    <a class="btn" href="/?brand=${encodeURIComponent(brand)}">Open Compare Tool</a>
  </div>
</main>
${footerHtml()}
</body>
</html>`;
}

// ---------- About page ----------
function renderAboutPage() {
  const brandList = Object.keys(BRANDS).sort();

  return `${head({
    title: 'About MowRight UK — Independent Lawnmower Price Guide',
    description: 'How MowRight UK works, where our prices come from, and why we are not affiliated with any manufacturer or seller.',
    canonical: '/about'
  })}
${navHtml('about')}
<main id="main" class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <span aria-current="page">About</span>
  </nav>

  <h1>About MowRight UK</h1>
  <p class="lead">Independent UK lawnmower price guide. We compare new prices, used Facebook Marketplace and eBay averages, specs, and pros and cons across ${mowers.length} popular models from ${Object.keys(BRANDS).length} brands.</p>

  <h2>Why this site exists</h2>
  <p>Buying a lawnmower in the UK is harder than it should be. New prices vary wildly between B&Q, Argos, dealer websites, and direct manufacturer stores. Used prices on Facebook Marketplace and eBay swing 40% based on optimism, season, and how badly the seller wants the shed space. Most "best lawnmower" articles online are affiliate roundups that have not been near a real lawn.</p>
  <p>MowRight UK is the AutoTrader of lawnmowers. One place to check what a mower is actually worth — new and used — before you spend your money.</p>

  <h2>Where the prices come from</h2>
  <ul>
    <li><b>RRP</b> — manufacturer published list price</li>
    <li><b>Buy Now</b> — typical UK street price across major retailers (Amazon, B&Q, Robert Dyas, Mowers Online, manufacturer direct)</li>
    <li><b>Used Avg</b> — averaged from Facebook Marketplace and eBay UK sold listings, with outliers removed</li>
  </ul>
  <p>Prices are reviewed periodically. They are guidance, not guarantees — local market conditions and condition affect every transaction.</p>

  <h2>What we do not do</h2>
  <ul>
    <li>Take payment from sellers, manufacturers, or retailers</li>
    <li>Run affiliate links to specific listings</li>
    <li>Score mowers we have not researched against rivals</li>
  </ul>
  <p>We do show Google AdSense advertising. Ad placement is fixed and never influences which mowers appear or how they are ranked.</p>

  <h2>Brands we cover</h2>
  <ul class="ilist">
    ${brandList.map(b => `<li><a href="${esc(brandUrl(b))}">${esc(b)}</a></li>`).join('')}
  </ul>

  <h2>Categories</h2>
  <ul class="ilist">
    ${Object.entries(CATEGORIES).map(([k, c]) => `<li><a href="${esc(typeUrl(k))}">${esc(c.title)}</a></li>`).join('')}
  </ul>

  <h2>Get in touch</h2>
  <p>Spotted a price that has shifted? A model we have missed? Email <a href="mailto:hello@mowright.co.uk">hello@mowright.co.uk</a>.</p>
</main>
${footerHtml()}
</body>
</html>`;
}

// ---------- Buying guide hub ----------
function renderGuideHub() {
  return `${head({
    title: 'UK Lawnmower Buying Guide — Petrol, Cordless, Robotic & Ride-On',
    description: 'Practical UK lawnmower buying guides by category. How to inspect used petrol mowers, judge cordless battery health, avoid robot mower traps, and check ride-on hours.',
    canonical: '/buying-guide'
  })}
${navHtml('guide')}
<main id="main" class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <span aria-current="page">Buying Guide</span>
  </nav>

  <h1>UK Lawnmower Buying Guide</h1>
  <p class="lead">Practical advice for buying a mower secondhand or new in the UK. Specific to category, written for adults, no affiliate links.</p>

  <h2>By category</h2>
  <div class="cards">
    ${Object.entries(CATEGORIES).map(([k, c]) => `
    <a class="card" href="${esc(typeUrl(k))}">
      <div class="c-meta"><span class="tbadge t-${esc(k)}">${esc(k)}</span></div>
      <h3 class="m-name" style="margin-top:8px">${esc(c.title)}</h3>
      <p class="c-tag">${esc(c.intro.split('.')[0])}.</p>
      <div class="c-foot"><span>${mowers.filter(m => m.t === k).length} models</span><b>Read guide</b></div>
    </a>`).join('')}
  </div>

  <h2>Universal Marketplace tips</h2>
  <div class="box"><h4>Lead with a fair price</h4><p>Sellers routinely overprice by 20–30%. Quote our Used Avg figure when you message — most will accept once they see you have done your homework.</p></div>
  <div class="box"><h4>See it run</h4><p>Always insist on starting the mower before cash changes hands. Cold-start a petrol; full-runtime a cordless; complete-perimeter a robot. Five minutes saves you £200.</p></div>
  <div class="box"><h4>Pay on collection</h4><p>Never bank-transfer in advance for a Marketplace mower. Cash on collection or PayPal Goods & Services only.</p></div>
  <div class="box"><h4>Check the obvious</h4><p>Cable damage on electric. Battery age on cordless. Engine hours on petrol and ride-on. Boundary wire on wired robots. RTK base presence on wire-free robots.</p></div>
  <div class="box"><h4>Brand resale tiers</h4><p>Honda, Husqvarna, Stihl and EGO hold value best — expect 50–60% of new after 3 years. Mountfield and Mac Allister depreciate fast. Webb, Hyundai and supermarket-exclusive brands (Parkside, Ferrex) lose value rapidly. Buy quality used or budget new — never the reverse.</p></div>
</main>
${footerHtml()}
</body>
</html>`;
}

// ---------- Sitemap ----------
function renderSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about', priority: '0.5', changefreq: 'monthly' },
    { loc: '/buying-guide', priority: '0.8', changefreq: 'monthly' },
    { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
    ...Object.keys(CATEGORIES).map(k => ({ loc: typeUrl(k), priority: '0.8', changefreq: 'monthly' })),
    ...Object.keys(BRANDS).map(b => ({ loc: brandUrl(b), priority: '0.6', changefreq: 'monthly' })),
    ...mowers.map(m => ({ loc: mowerUrl(m), priority: '0.7', changefreq: 'monthly' }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

// ---------- Write files ----------
function ensureDir(p) { mkdirSync(p, { recursive: true }) }
function clean(p) { if (existsSync(p)) rmSync(p, { recursive: true, force: true }) }

clean(join(ROOT, 'mower'));
clean(join(ROOT, 'brand'));
ensureDir(join(ROOT, 'mower'));
ensureDir(join(ROOT, 'brand'));

let written = 0;

for (const m of mowers) {
  writeFileSync(join(ROOT, 'mower', `${mowerSlug(m)}.html`), renderMowerPage(m));
  written++;
}
for (const t of Object.keys(CATEGORIES)) {
  writeFileSync(join(ROOT, `${typeSlug(t)}.html`), renderCategoryPage(t));
  written++;
}
for (const b of Object.keys(BRANDS)) {
  writeFileSync(join(ROOT, 'brand', `${slug(b)}.html`), renderBrandPage(b));
  written++;
}
writeFileSync(join(ROOT, 'about.html'), renderAboutPage()); written++;
writeFileSync(join(ROOT, 'buying-guide.html'), renderGuideHub()); written++;
writeFileSync(join(ROOT, 'sitemap.xml'), renderSitemap()); written++;

console.log(`Built ${written} files.`);
console.log(`  ${mowers.length} mower pages`);
console.log(`  ${Object.keys(CATEGORIES).length} category pages`);
console.log(`  ${Object.keys(BRANDS).length} brand pages`);
console.log(`  3 misc (about, buying-guide, sitemap)`);
