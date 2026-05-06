// MowRight UK static-site generator.
// Generates all pages from mowers.json using the Claude Design V2 visual system.
// Run: `node scripts/build.mjs` (or `npm run build`).

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mowright.co.uk';

const rawMowers = JSON.parse(readFileSync(join(ROOT, 'mowers.json'), 'utf8'));

// ---------- Slug helpers ----------
const slug = s => s.toString().toLowerCase()
  .replace(/\+/g, '-plus-').replace(/&/g, '-and-')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const mowerSlug = m => `${slug(m.b)}-${slug(m.n)}`;
const brandSlug = b => slug(b);
const typeSlugMap = {
  'Petrol': 'petrol', 'Electric': 'electric', 'Cordless': 'cordless',
  'Hover': 'hover', 'Robotic': 'robotic', 'Ride-on': 'ride-on', 'Push': 'manual'
};
const typeSlug = t => typeSlugMap[t] || slug(t);
const typeBadgeClass = t => 't-' + typeSlug(t).replace('-', '');

// ---------- Schema bridge: my mowers.json -> design's expected fields ----------
function transform(m) {
  const numFrom = (s, fb = 0) => {
    if (typeof s === 'number') return s;
    const m = String(s || '').match(/[\d.]+/);
    return m ? parseFloat(m[0]) : fb;
  };
  const lawnSizeMap = { small: 'Small', medium: 'Medium', large: 'Large' };
  const noiseDefaults = {
    'Petrol': 95, 'Ride-on': 100, 'Electric': 78, 'Cordless': 75,
    'Hover': 88, 'Robotic': 58, 'Push': 0
  };
  const deckGuess = {
    'Petrol': 'Steel', 'Ride-on': 'Steel', 'Electric': 'Plastic',
    'Cordless': 'Plastic', 'Hover': 'Plastic', 'Robotic': 'Composite', 'Push': 'Steel'
  };
  return {
    raw: m,
    id: mowerSlug(m),
    brand: m.b,
    brandSlug: brandSlug(m.b),
    model: m.n,
    type: m.t,
    typeSlug: typeSlug(m.t),
    rrp: m.rrp || 0,
    buyNow: m.p,
    usedAvg: m.u,
    rating: m.r,
    reviews: m.rv,
    valueScore: Math.round((m.v / 10) * 10) / 10,
    tagline: m.tag,
    cutWidth: numFrom(m.cut),
    weight: numFrom(m.wt),
    deck: deckGuess[m.t] || '—',
    engine: m.eng,
    selfPropelled: !!m.sp,
    roller: !!m.rol,
    mulching: !!m.mul,
    cuttingHeights: 6,
    bagCapacity: typeof m.box === 'string' && /^\d/.test(m.box) ? numFrom(m.box) : 0,
    lawnSize: lawnSizeMap[m.ls] || 'Medium',
    noiseDb: noiseDefaults[m.t] ?? 80,
    pros: m.pros, cons: m.cons,
    verdict: m.verd, tip: m.tip,
    rank: m.rank, m2: m.m2
  };
}

const mowers = rawMowers.map(transform);

// ---------- Categories ----------
const CATEGORIES = {
  'Petrol': {
    slug: 'petrol', name: 'Petrol', color: '#d97706', bg: '#fef3e2',
    desc: 'Best for medium-to-large lawns and rough conditions. No cord, no battery limits. The category that still dominates UK gardens over 800m².'
  },
  'Electric': {
    slug: 'electric', name: 'Electric', color: '#2563eb', bg: '#e0ecff',
    desc: 'Corded mains-powered mowers. Quiet, reliable, low maintenance — but tethered. Right for small-to-medium lawns near a power point.'
  },
  'Cordless': {
    slug: 'cordless', name: 'Cordless', color: '#7c3aed', bg: '#ede4ff',
    desc: 'Battery-powered. Quiet and clean. Battery runtime is the deciding factor. The fastest-growing category in UK lawncare.'
  },
  'Hover': {
    slug: 'hover', name: 'Hover', color: '#0891b2', bg: '#dff4f8',
    desc: 'Air-cushioned, no wheels. Brilliant on slopes and odd-shaped lawns. The British answer to awkward gardens.'
  },
  'Robotic': {
    slug: 'robotic', name: 'Robotic', color: '#5fb878', bg: '#e8f0e3',
    desc: 'Set it and forget it. Boundary-wire and wire-free RTK robots are mature; camera-based no-wire systems are improving fast.'
  },
  'Ride-on': {
    slug: 'ride-on', name: 'Ride-On', color: '#dc2626', bg: '#fde8e8',
    desc: 'For gardens that take more than an hour to push-mow. A serious purchase. Engine hours matter more than years.'
  },
  'Push': {
    slug: 'manual', name: 'Manual', color: '#6b7280', bg: '#eef0ec',
    desc: 'Push-reel cylinder mowers. Silent, zero emissions, surprisingly satisfying. Best for small ornamental lawns.'
  }
};

// ---------- Brands ----------
const BRANDS = {
  'Honda': { name: 'Honda', parent: 'Honda Motor Co., Ltd.', focus: 'Premium petrol mowers with class-leading engines', ukPosition: 'Top-tier — sets the benchmark for petrol reliability', priceRange: '£449–£3,999', blurb: "Honda's lawnmowers carry the same engineering ethos as their cars: over-engineered, quiet, and built to outlast you." },
  'Mountfield': { name: 'Mountfield', parent: 'STIGA Group', focus: 'Mid-market petrol and ride-on mowers, popular UK choice', ukPosition: 'Best-selling UK lawnmower brand by volume', priceRange: '£189–£2,499', blurb: 'Italian-engineered, UK-distributed. Mountfield dominates British garden centres for good reason — solid kit at fair prices.' },
  'Hayter': { name: 'Hayter', parent: 'Toro Group', focus: 'British-built premium roller petrol', ukPosition: 'Iconic British brand for striped lawns', priceRange: '£479–£2,899', blurb: 'British-built since 1946. Hayters are the choice of cricket-club groundsmen and people who care deeply about their stripes.' },
  'Stihl': { name: 'Stihl', parent: 'STIHL', focus: 'Petrol, cordless, and the iMOW robotic line', ukPosition: 'Premium prosumer and professional landscapers', priceRange: '£219–£2,799', blurb: 'German engineering with the strongest UK dealer network. Stihl AP cordless and AK home tools share batteries cleanly.' },
  'Cobra': { name: 'Cobra', parent: 'Henton & Chattell', focus: 'Petrol, cordless, electric — wide range', ukPosition: 'Massive UK dealer network, value-focused', priceRange: '£99–£549', blurb: "The British distributor's house brand. Cobra punches above its weight on price-to-feature, especially the rear-roller petrol mowers." },
  'Webb': { name: 'Webb', parent: 'Handy Distribution', focus: 'Hand-push cylinder, petrol entry-level', ukPosition: 'Traditional UK lawn care', priceRange: '£89–£259', blurb: 'Webb has been making mowers in Birmingham for over a century. Today the badge sits on entry-level petrol and hand-push cylinders.' },
  'Hyundai': { name: 'Hyundai', parent: 'Hyundai Power Equipment', focus: 'Budget petrol with steel decks', ukPosition: 'Mid-tier petrol with 3-year warranty', priceRange: '£169–£1,299', blurb: 'Korean badge, generic engines. Hyundai mowers offer surprisingly wide cuts and steel decks at sub-Mountfield prices.' },
  'Stiga': { name: 'Stiga', parent: 'STIGA Group', focus: 'Petrol, cordless, ride-on, robotic', ukPosition: 'Strong independent dealer presence', priceRange: '£199–£3,499', blurb: 'Italian parent of Mountfield and Atco. Stiga-branded mowers tend to feel a notch above their stablemates.' },
  'Bosch': { name: 'Bosch', parent: 'Robert Bosch GmbH', focus: 'Electric, cordless, and Indego robotic', ukPosition: 'Trusted electric range, strong DIY following', priceRange: '£89–£899', blurb: "German precision applied to home-and-garden. Bosch's Rotak and CityMower lines are go-tos for small UK lawns." },
  'Flymo': { name: 'Flymo', parent: 'Husqvarna Group', focus: 'Hover mowers, electric, cordless', ukPosition: 'Iconic UK household staple', priceRange: '£59–£329', blurb: "The brand that invented the hover mower. Flymo is in millions of British sheds — disposable but capable." },
  'Einhell': { name: 'Einhell', parent: 'Einhell Germany AG', focus: 'Cordless (Power X-Change) and budget electric', ukPosition: 'Rapidly growing mid-tier DIY', priceRange: '£89–£399', blurb: 'German DIY brand with a single-battery cordless ecosystem (Power X-Change). Solid value, growing UK presence.' },
  'EGO': { name: 'EGO', parent: 'Chervon', focus: 'Premium 56V cordless — petrol-replacement', ukPosition: 'Top-tier battery replacement for petrol', priceRange: '£249–£1,099', blurb: "EGO killed the 'cordless can't replace petrol' argument. The 56V XP series matches a Honda HRX on cut quality without fumes." },
  'Husqvarna': { name: 'Husqvarna', parent: 'Husqvarna Group', focus: 'Petrol, robotic (Automower), professional', ukPosition: 'Premium prosumer and professional', priceRange: '£329–£4,999', blurb: 'Swedish heritage. The Automower line invented the robotic mower category and still leads it on durability.' },
  'Greenworks': { name: 'Greenworks', parent: 'Globe Tools', focus: '40V and 60V cordless systems', ukPosition: 'Popular mid-tier battery option', priceRange: '£169–£599', blurb: 'Cordless-only brand with strong 60V Pro line. Genuinely competitive with EGO at a slightly lower price.' },
  'Ryobi': { name: 'Ryobi', parent: 'TTI Group', focus: '18V ONE+ and 36V cordless systems', ukPosition: 'Extremely popular with home DIYers', priceRange: '£139–£599', blurb: "If you already own Ryobi 18V tools, the ONE+ mowers slot in beautifully. The 36V flagship competes with EGO." },
  'Makita': { name: 'Makita', parent: 'Makita', focus: 'Professional 18V LXT cordless, petrol', ukPosition: 'Favoured by tradespeople and landscapers', priceRange: '£299–£599', blurb: 'Japanese trade-grade. LXT batteries hold value better than any rival platform — that alone is worth the premium.' },
  'Worx': { name: 'Worx', parent: 'Positec Group', focus: 'Robotic (Landroid) and 20V/40V cordless', ukPosition: 'Highly popular in the robotic market', priceRange: '£199–£1,499', blurb: 'Worx made the boldest move in robotics with the camera-based Landroid Vision. PowerShare 20V tools cross-compatible.' },
  'Gardena': { name: 'Gardena', parent: 'Husqvarna Group', focus: 'Cordless, robotic, garden tools', ukPosition: 'Continental-style domestic gardening', priceRange: '£179–£999', blurb: 'German garden brand under Husqvarna. PowerForAll battery shared with Bosch home tools — useful crossover.' },
  'Mammotion': { name: 'Mammotion', parent: 'Mammotion', focus: 'Wire-free RTK and AWD robotic mowers', ukPosition: 'Newer challenger in robotic mowers', priceRange: '£1,499–£3,499', blurb: "Chinese newcomer that has Husqvarna nervous. AWD on slopes is a genuine breakthrough. UK support still scaling." },
  'Segway': { name: 'Segway', parent: 'Segway-Ninebot', focus: 'Wire-free robotic with VisionFence', ukPosition: 'Camera + RTK robot mowers', priceRange: '£899–£2,499', blurb: 'Segway took longer than Husqvarna to get the basics right but the Navimow line is now reliable and well-supported.' },
  'John Deere': { name: 'John Deere', parent: 'John Deere', focus: 'Premium garden tractors and ride-on', ukPosition: 'Default sensible ride-on for half-acre+ UK lawns', priceRange: '£3,499–£5,999', blurb: 'American agricultural icon. JD ride-ons hold value remarkably well — spend slightly more, save it back on resale.' },
  'Cub Cadet': { name: 'Cub Cadet', parent: 'MTD / Stanley Black & Decker', focus: 'American-style lawn tractors', ukPosition: 'Heavy-duty ride-on with Kohler power', priceRange: '£3,399', blurb: 'American heavy-duty ride-on. Kohler engine is the highlight; UK service network is patchy.' },
  'Countax': { name: 'Countax', parent: 'AriensCo', focus: 'British-built premium ride-on with PGC', ukPosition: 'UK-built, heavy-duty groundskeeping', priceRange: '£5,499', blurb: 'British-built since 1989. Countax tractors with Powered Grass Collectors handle wet UK grass like nothing else.' },
  'Atco': { name: 'Atco', parent: 'STIGA Group', focus: 'Premium petrol roller, ride-on, cylinder', ukPosition: 'Traditional British heritage brand', priceRange: '£729', blurb: 'Heritage British brand from 1921. The Liner roller petrol is a Marketplace classic — heavy steel deck, proper stripes.' },
  'Qualcast': { name: 'Qualcast', parent: 'Homebase / Argos', focus: 'Budget electric, petrol, and Suffolk Punch cylinder', ukPosition: 'Legacy UK brand, now retailer-owned', priceRange: '£79', blurb: "Argos/Homebase legacy brand. The Suffolk Punch is the cylinder mower bowling-green keepers still hunt for on Marketplace." },
  'Mac Allister': { name: 'Mac Allister', parent: 'Kingfisher Group', focus: 'Budget/mid electric, petrol — B&Q exclusive', ukPosition: 'B&Q mainstream exclusive', priceRange: '£269', blurb: "B&Q's house brand. Performs above price thanks to Briggs engines, but build quality is below Mountfield." },
  'Black+Decker': { name: 'Black+Decker', parent: 'Stanley Black & Decker', focus: 'Budget electric and cordless', ukPosition: 'Popular entry-level DIY', priceRange: '£119', blurb: 'The default Argos electric for 15 years. Pure utility purchase — fine, not heirloom.' },
  'Parkside': { name: 'Parkside', parent: 'Lidl', focus: 'Budget electric and cordless', ukPosition: 'Supermarket exclusive "Middle Aisle"', priceRange: '£79', blurb: 'Lidl Middle Aisle special with a genuine cult following. The 20V battery slots into a wide Parkside cordless ecosystem.' },
  'Ferrex': { name: 'Ferrex', parent: 'Aldi', focus: 'Budget electric and cordless', ukPosition: 'Supermarket exclusive "Specialbuy"', priceRange: '£129', blurb: "Aldi's answer to Lidl Parkside. The 40V cordless punches above sub-£200 rivals when the Specialbuy lands." },
  'Spear & Jackson': { name: 'Spear & Jackson', parent: 'Homebase / Argos', focus: 'Budget electric and cordless', ukPosition: 'Retailer-exclusive budget line', priceRange: '£139', blurb: 'Argos/Homebase budget line. The 1800W corded with rear roller is a genuine bargain on the Argos shelf.' },
  'Westwood': { name: 'Westwood', parent: 'AriensCo', focus: 'British-built premium ride-on', ukPosition: 'UK-built twin to Countax', priceRange: '£4,999', blurb: 'British-built sister brand to Countax — same factory, same engineering, slightly cheaper. PGC blower handles wet grass.' },
  'Yard Force': { name: 'Yard Force', parent: 'Sumec', focus: 'Budget robotic and cordless', ukPosition: 'High volume on Amazon and Argos', priceRange: '£499', blurb: 'High-volume robotic and cordless on Argos and Amazon. Reasonable starter robot; not a longevity rival to Husqvarna.' }
};

// Featured brands shown at top of homepage 'Browse by brand' (3-card grid)
const FEATURED_BRANDS = ['Honda', 'Mountfield', 'Bosch'];

// ---------- HTML helpers ----------
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtGBP = n => '£' + (n || 0).toLocaleString('en-GB');

const stars = (rating, reviews) => `
<span class="stars"><span class="s">★</span> ${rating.toFixed(1)}${reviews != null ? ` <span class="rv">(${reviews.toLocaleString('en-GB')})</span>` : ''}</span>`;

const tbadge = (typeRaw, size = 'md') => {
  const cls = typeBadgeClass(typeRaw);
  const cat = CATEGORIES[typeRaw];
  const sz = size === 'sm' ? ' sm' : size === 'lg' ? ' lg' : '';
  return `<span class="tbadge${sz} ${cls}">${esc(cat?.name || typeRaw)}</span>`;
};

const mowerUrl = m => `/mower/${m.id}`;
const categoryUrl = m => `/${typeSlug(m.type)}`;
const brandUrl = b => `/brand/${slug(b)}`;

// SVG mower hero icon — inline by category
function heroIcon(m, size = 90) {
  const cat = CATEGORIES[m.type];
  const color = cat.color;
  const bg = cat.bg;
  let body = '';
  if (m.typeSlug === 'ride-on') {
    body = `<rect x="20" y="55" width="160" height="40" rx="8" fill="${color}" opacity=".9"/>
      <rect x="60" y="20" width="50" height="40" rx="6" fill="${color}" opacity=".7"/>
      <circle cx="50" cy="105" r="20" fill="#1a1a1a"/><circle cx="150" cy="105" r="20" fill="#1a1a1a"/>
      <circle cx="50" cy="105" r="9" fill="#3a3a3a"/><circle cx="150" cy="105" r="9" fill="#3a3a3a"/>`;
  } else if (m.typeSlug === 'robotic') {
    body = `<ellipse cx="100" cy="80" rx="70" ry="35" fill="${color}" opacity=".9"/>
      <ellipse cx="100" cy="72" rx="60" ry="25" fill="${color}" opacity=".7"/>
      <circle cx="100" cy="68" r="10" fill="#fff" opacity=".6"/>
      <circle cx="65" cy="105" r="6" fill="#1a1a1a"/><circle cx="135" cy="105" r="6" fill="#1a1a1a"/>`;
  } else if (m.typeSlug === 'hover') {
    body = `<ellipse cx="100" cy="95" rx="65" ry="12" fill="#1a1a1a" opacity=".3"/>
      <ellipse cx="100" cy="80" rx="60" ry="20" fill="${color}" opacity=".9"/>
      <path d="M155 30 L185 10" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="80" r="14" fill="#fff" opacity=".6"/>`;
  } else {
    body = `<path d="M155 30 L185 10" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
      <path d="M150 35 L180 15" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
      <rect x="40" y="50" width="130" height="50" rx="10" fill="${color}" opacity=".9"/>
      <rect x="40" y="50" width="130" height="14" rx="10" fill="${color}" opacity=".6"/>
      <rect x="55" y="68" width="40" height="22" rx="3" fill="#0f1f0f" opacity=".5"/>
      <circle cx="60" cy="100" r="18" fill="#1a1a1a"/><circle cx="60" cy="100" r="8" fill="#3a3a3a"/>
      <circle cx="150" cy="100" r="18" fill="#1a1a1a"/><circle cx="150" cy="100" r="8" fill="#3a3a3a"/>`;
  }
  const sizeCls = size === 300 ? 'sz-300' : size === 200 ? 'sz-200' : size === 70 ? 'sz-70' : '';
  return `<div class="mh-icon ${sizeCls}" style="background:${bg}" aria-hidden="true">
    <svg viewBox="0 0 200 130">${body}</svg>
  </div>`;
}

// ---------- Common chrome ----------
const head = ({ title, description, canonical, ogImage = '/og.png', ldjson = null }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="theme-color" content="#f8faf7"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
<link rel="canonical" href="${esc(SITE + canonical)}"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="MowRight UK"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${esc(SITE + canonical)}"/>
<meta property="og:locale" content="en_GB"/>
<meta property="og:image" content="${esc(SITE + ogImage)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(description)}"/>
<meta name="twitter:image" content="${esc(SITE + ogImage)}"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="manifest" href="/site.webmanifest"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/style.css"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6052985070008267" crossorigin="anonymous"></script>
<meta name="google-adsense-account" content="ca-pub-6052985070008267"/>
${ldjson ? `<script type="application/ld+json">${JSON.stringify(ldjson)}</script>` : ''}
</head>
<body>
<a href="#main" class="skip">Skip to content</a>`;

const siteHeader = (active = '') => `
<header class="top" role="banner">
  <div class="top-in">
    <a class="brand-link" href="/" aria-label="MowRight UK home">
      <span class="brand-mark">M</span>
      <span class="brand-word">Mow<span>Right</span></span>
      <span class="brand-uk">UK</span>
    </a>
    <span class="brand-tag">UK lawnmower price comparison</span>
    <nav class="top-nav" aria-label="Primary">
      <a href="/"${active === 'home' ? ' aria-current="page"' : ''}>Browse</a>
      <a href="/buying-guide"${active === 'guide' ? ' aria-current="page"' : ''}>Buying Guide</a>
      <a href="/about"${active === 'about' ? ' aria-current="page"' : ''}>About</a>
    </nav>
    <div class="head-stats">
      <span class="head-pill">${mowers.length} Models</span>
      <span class="head-pill">${Object.keys(BRANDS).length} Brands</span>
    </div>
  </div>
</header>`;

const siteFooter = () => `
<footer class="site-footer">
  <div class="inner">
    <nav>
      <a href="/">Browse</a>
      <a href="/buying-guide">Buying Guide</a>
      <a href="/about">About</a>
      <a href="/privacy">Privacy</a>
    </nav>
    <p class="disclaim">MowRight UK is independent and reader-supported. We don't take affiliate commissions or sponsored placements. Prices are indicative — confirm with the retailer before purchasing.</p>
    <p class="copy">© 2026 MowRight UK · ${mowers.length} models · ${Object.keys(BRANDS).length} brands</p>
  </div>
</footer>`;

const adBanner = (slot, label = 'Above-fold display ad', height = 90) => `
<div class="ad-banner">
  <div class="ad-label">Ad · Sponsored</div>
  <div class="ad-slot h${height}"><div class="lab">${esc(label)}</div><div class="meta">slot: ${esc(slot)}</div></div>
</div>`;

const adInRow = slot => `
<div class="ad-in-row">
  <div class="ad-label">Ad · Sponsored</div>
  <div class="body"><div class="ad-slot h120"><div class="lab">In-list responsive ad</div><div class="meta">slot: ${esc(slot)}</div></div></div>
</div>`;

const adAside = (slot, height = 250) => `
<div class="aside-card">
  <div class="ad-label">Ad · Sponsored</div>
  <div class="ad-slot h${height}" style="margin-top:10px"><div class="lab">${height === 250 ? '300×250 sidebar' : '300×600 large sidebar'}</div><div class="meta">slot: ${esc(slot)}</div></div>
</div>`;

const ctaStrip = (heading, description, ctaLabel, ctaHref) => `
<div class="cta">
  <div class="cta-text">
    <h3>${esc(heading)}</h3>
    <p>${esc(description)}</p>
  </div>
  <a class="btn btn-accent" href="${esc(ctaHref)}">${esc(ctaLabel)} →</a>
</div>`;

const proseBox = (variant, title, body) => `
<div class="prose-box${variant === 'warning' ? ' warning' : ''}">
  <div class="pb-title">${esc(title)}</div>
  <p>${esc(body)}</p>
</div>`;

const prosCons = m => `
<div class="pcs">
  <div class="pros"><h4>Pros</h4><ul>${m.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
  <div class="cons"><h4>Cons</h4><ul>${m.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
</div>`;

const specsTable = m => {
  const rows = [
    ['Type', m.type],
    ['Cut width', m.cutWidth + ' cm'],
    ['Engine / Power', m.engine],
    ['Weight', m.weight + ' kg'],
    ['Deck', m.deck],
    ['Self-propelled', m.selfPropelled ? 'Yes' : 'No'],
    ['Rear roller', m.roller ? 'Yes (stripes)' : 'No'],
    ['Mulching', m.mulching ? 'Yes' : 'No'],
    ['Cutting heights', m.cuttingHeights + ' positions'],
    ['Bag capacity', m.bagCapacity > 0 ? m.bagCapacity + ' L' : '—'],
    ['Suited to lawn', m.lawnSize],
    ['Noise level', m.noiseDb > 0 ? m.noiseDb + ' dB' : 'Silent']
  ];
  return `<table class="specs-tbl"><tbody>${rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>`;
};

const threeUpPrice = m => `
<div class="prices3">
  <div class="pp"><div class="l">RRP New</div><div class="v">${m.rrp ? fmtGBP(m.rrp) : '—'}</div><div class="x">${m.rrp ? 'Manufacturer' : 'No longer in production'}</div></div>
  <div class="pp"><div class="l">Buy Now</div><div class="v">${fmtGBP(m.buyNow)}</div><div class="x">Lowest UK retailer</div></div>
  <div class="pp use"><div class="l">Used Avg</div><div class="v">${fmtGBP(m.usedAvg)}</div><div class="x">Facebook / eBay UK avg</div></div>
</div>`;

// Mower cards (used on category, brand, related sections)
function categoryListCard(m) {
  return `
<a class="mcard row-3" href="${esc(mowerUrl(m))}">
  ${heroIcon(m)}
  <div>
    <div class="m-brand">${esc(m.brand)}</div>
    <h3 class="m-name">${esc(m.model)}</h3>
    <p class="m-tagline">${esc(m.tagline)}</p>
    ${stars(m.rating, m.reviews)}
  </div>
  <div class="col-price-side">
    <span class="l">Used Avg</span>
    <span class="v">${fmtGBP(m.usedAvg)}</span>
    <span class="x">New: ${fmtGBP(m.buyNow)}</span>
  </div>
</a>`;
}

function brandListCard(m) {
  return `
<a class="mcard brand-row" href="${esc(mowerUrl(m))}">
  ${heroIcon(m)}
  <div>
    <div class="m-meta-line">${tbadge(m.type, 'sm')} ${stars(m.rating, m.reviews)}</div>
    <h3 class="m-name" style="margin-top:6px">${esc(m.model)}</h3>
    <p class="m-tagline">${esc(m.tagline)}</p>
  </div>
  <div class="col-price-side">
    <span class="l">Used Avg</span>
    <span class="v" style="font-size:22px">${fmtGBP(m.usedAvg)}</span>
  </div>
</a>`;
}

function relatedCard(m) {
  return `
<a href="${esc(mowerUrl(m))}">
  ${heroIcon(m, 70)}
  <div class="b">${esc(m.brand)}</div>
  <div class="m">${esc(m.model)}</div>
  <div class="p">Used: ${fmtGBP(m.usedAvg)}</div>
</a>`;
}

// ---------- Mower detail page ----------
function renderMowerPage(m) {
  const cat = CATEGORIES[m.type];
  const related = mowers
    .filter(x => x.id !== m.id && x.typeSlug === m.typeSlug)
    .sort((a, b) => Math.abs(a.usedAvg - m.usedAvg) - Math.abs(b.usedAvg - m.usedAvg))
    .slice(0, 3);
  const brand = BRANDS[m.brand];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${m.brand} ${m.model}`,
    brand: { '@type': 'Brand', name: m.brand },
    description: m.tagline,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: m.rating, reviewCount: m.reviews },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: m.usedAvg,
      highPrice: m.rrp || m.buyNow,
      offerCount: 2
    }
  };

  return `${head({
    title: `${m.brand} ${m.model} — UK price, used vs new & verdict`,
    description: `${m.brand} ${m.model}: new ${fmtGBP(m.buyNow)}, used Marketplace average ${fmtGBP(m.usedAvg)}. Specs, expert verdict, pros and cons, and a marketplace buying tip.`,
    canonical: mowerUrl(m),
    ldjson: ld
  })}
${siteHeader('home')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Browse</a><span class="sep">›</span>
    <a href="${esc(categoryUrl(m))}">${esc(cat.name)}</a><span class="sep">›</span>
    <a href="${esc(brandUrl(m.brand))}">${esc(m.brand)}</a><span class="sep">›</span>
    <span aria-current="page">${esc(m.model)}</span>
  </nav>
</div>

<section class="section-hero">
  <div class="detail-hero">
    <div>
      <div class="hero-art" style="background:${cat.bg}">
        ${heroIcon(m, 300)}
        <div class="badge-pos">${tbadge(m.type, 'lg')}</div>
        <div class="code-pos">${esc(m.id.toUpperCase())}</div>
      </div>
    </div>
    <div>
      <div class="hero-meta-brand">${esc(m.brand)}</div>
      <h1 class="hero-h1">${esc(m.model)}</h1>
      <p class="hero-tag">"${esc(m.tagline)}"</p>
      <div class="hero-meta-row">
        ${stars(m.rating, m.reviews)}
        <span class="dot">·</span>
        <span class="vsc">Value score: <strong>${m.valueScore} / 10</strong></span>
      </div>
      ${threeUpPrice(m)}
      <div class="btn-row">
        <a class="btn btn-primary btn-grow" href="/?q=${encodeURIComponent(m.brand + ' ' + m.model)}">Where to buy →</a>
        <a class="btn btn-secondary" href="/?compare=${encodeURIComponent(m.id)}">+ Compare</a>
      </div>
    </div>
  </div>
</section>

<main id="main" class="detail-main">
  <article class="detail-article">
    <section>
      <h2 class="section-h2">Our verdict</h2>
      ${proseBox('verdict', 'The bottom line', m.verdict)}
    </section>

    <section>
      <h2 class="section-h2">Pros &amp; cons</h2>
      ${prosCons(m)}
    </section>

    ${adBanner('detail-mid', 'Mid-article responsive ad')}

    <section>
      <h2 class="section-h2">Full specs</h2>
      <div class="specs-card">${specsTable(m)}</div>
    </section>

    <section>
      <h2 class="section-h2">Buying second-hand</h2>
      ${proseBox('warning', 'Used-market tip', m.tip)}
      <div class="used-tip-extra">
        <strong>Where to look:</strong> Facebook Marketplace and Gumtree are usually 20–30% cheaper than eBay UK for petrol mowers because most sellers want local pickup. eBay tends to win on cordless and electric (lighter, easier to ship). Always insist on a starting demonstration before paying.
      </div>
    </section>

    ${related.length ? `
    <section>
      <h2 class="section-h2">Related mowers</h2>
      <div class="related">${related.map(relatedCard).join('')}</div>
    </section>` : ''}
  </article>

  <aside class="detail-aside">
    ${adAside('detail-sidebar-1', 250)}

    <div class="aside-card">
      <div class="l">At a glance</div>
      <div class="row"><span>Best for</span><strong>${esc(m.lawnSize)} lawns</strong></div>
      <div class="row"><span>Cut width</span><strong>${m.cutWidth} cm</strong></div>
      <div class="row"><span>Weight</span><strong>${m.weight} kg</strong></div>
      <div class="row"><span>Self-propelled</span><strong>${m.selfPropelled ? 'Yes' : 'No'}</strong></div>
      <div class="row"><span>Stripes</span><strong>${m.roller ? 'Yes' : 'No'}</strong></div>
      <div class="row"><span>Noise</span><strong>${m.noiseDb > 0 ? m.noiseDb + ' dB' : 'Silent'}</strong></div>
    </div>

    <div class="aside-card green">
      <div class="l">From the brand</div>
      <a class="from-brand-name" href="${esc(brandUrl(m.brand))}">${esc(m.brand)} →</a>
      <p class="from-brand-blurb">${esc(brand?.blurb || 'See all models from this brand.')}</p>
    </div>

    ${adAside('detail-sidebar-2', 340)}
  </aside>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Category page ----------
function renderCategoryPage(typeRaw) {
  const cat = CATEGORIES[typeRaw];
  const list = mowers.filter(m => m.type === typeRaw).sort((a, b) => b.valueScore - a.valueScore);
  const best = list[0];

  return `${head({
    title: `${cat.name} mowers — UK ranked & compared (${list.length} models)`,
    description: `${cat.name} lawnmowers compared. ${list.length} models with new and used UK prices, expert verdicts, and Facebook Marketplace tips.`,
    canonical: '/' + cat.slug
  })}
${siteHeader('home')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Browse</a><span class="sep">›</span>
    <span aria-current="page">${esc(cat.name)}</span>
  </nav>
</div>

<section class="section-hero bg-cat-${typeSlug(typeRaw).replace('-', '')}">
  <div class="page">
    <div class="cat-eyebrow" style="color:${cat.color}">${esc(cat.name)} mowers</div>
    <h1 class="cat-h1">${esc(cat.name)} mowers, ranked.</h1>
    <p class="cat-lead">${esc(cat.desc)}</p>
    <div class="cat-stats">
      <span><strong>${list.length}</strong> models reviewed</span>
      <span>·</span>
      <span>Best value: <strong>${best ? esc(best.brand + ' ' + best.model) : '—'}</strong></span>
    </div>
  </div>
</section>

<main id="main" class="page page--main">
  ${adBanner('category-' + cat.slug + '-top', 'Above-fold leaderboard')}

  <h2 class="section-h2" style="margin-top:20px">All ${esc(cat.name.toLowerCase())} mowers (${list.length})</h2>

  ${list.length === 0 ? `<div class="empty"><h3>No models in this category yet</h3><p>Coming soon.</p></div>` : `
  <div class="mlist">${list.map(categoryListCard).join('')}</div>`}

  <div style="margin-top:36px">
    ${ctaStrip(`Still unsure if a ${cat.name.toLowerCase()} mower is right for you?`, 'Our buying guide compares all 7 mower types side-by-side based on lawn size, terrain, and effort.', 'Open the buying guide', '/buying-guide')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Brand page ----------
function renderBrandPage(brandRaw) {
  const brand = BRANDS[brandRaw];
  if (!brand) return null;
  const list = mowers.filter(m => m.brand === brandRaw).sort((a, b) => b.valueScore - a.valueScore);
  const categories = [...new Set(list.map(m => m.type))];

  return `${head({
    title: `${brand.name} lawnmowers — UK range, used prices & verdicts`,
    description: `${brand.name} lawnmower range compared. ${list.length} model${list.length === 1 ? '' : 's'} with new and used UK prices, expert verdicts, and marketplace tips.`,
    canonical: '/brand/' + slug(brandRaw)
  })}
${siteHeader('home')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Browse</a><span class="sep">›</span>
    <span>Brands</span><span class="sep">›</span>
    <span aria-current="page">${esc(brand.name)}</span>
  </nav>
</div>

<section class="section-hero" style="padding:32px">
  <div class="brand-hero">
    <div>
      <div class="brand-eyebrow">Brand profile</div>
      <h1 class="brand-h1">${esc(brand.name)}</h1>
      <p class="brand-parent">${esc(brand.parent)}</p>
      <p class="brand-blurb">${esc(brand.blurb)}</p>
    </div>
    <div class="brand-stats">
      <div class="l">Brand at a glance</div>
      <div class="row"><span>UK position</span><strong>${esc(brand.ukPosition)}</strong></div>
      <div class="row"><span>Focus</span><strong>${esc(brand.focus)}</strong></div>
      <div class="row"><span>Categories</span><div class="pillset">${categories.map(c => `<span>${esc(CATEGORIES[c]?.name || c)}</span>`).join('')}</div></div>
      <div class="row"><span>Price range</span><strong>${esc(brand.priceRange)}</strong></div>
      <div class="row"><span>Models in our database</span><strong class="accent-num">${list.length}</strong></div>
    </div>
  </div>
</section>

<main id="main" class="page page--main">
  ${adBanner('brand-' + slug(brandRaw) + '-top', 'Above-fold leaderboard')}

  <h2 class="section-h2" style="margin-top:20px">${esc(brand.name)} models we've reviewed</h2>
  <div class="mlist">
    ${list.map((m, i) => brandListCard(m) + (i === 1 ? adInRow('brand-' + slug(brandRaw) + '-mid') : '')).join('')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Buying guide hub ----------
function renderGuideHub() {
  const sections = [
    { num: '01', title: 'How big is your lawn?', body: "Lawn size is the single biggest factor. Under 100m² and you can get away with manual or cordless. 100–500m² is the sweet spot for electric and self-propelled petrol. Over 500m² and you should be considering ride-on — pushing a 53cm petrol mower across half a tennis court every weekend gets old fast." },
    { num: '02', title: 'How flat is it?', body: "Wheels need flat-ish ground. If your lawn has slopes over 15° or weird kerbs and beds, hover mowers (cushion of air, no wheels) are the answer. For mostly-flat lawns with one or two awkward bits, self-propelled petrol handles it." },
    { num: '03', title: 'Do you want stripes?', body: "Stripes come from a rear roller pressing the grass flat in alternate directions. Most petrol mowers under £400 don't have one. The Bosch Rotak 36 R is the cheapest mower in the UK with a real roller. Above that, look for 'rear-roller' in the spec sheet." },
    { num: '04', title: 'Petrol, electric, or cordless?', body: "Petrol: most power, no range limit, but maintenance, noise, fuel storage. Electric (corded): cheap, reliable, but tethered. Cordless: quiet, clean, but battery life dictates everything. For most British gardens under 300m², cordless is now the right answer. Bigger or rougher: petrol still wins." },
    { num: '05', title: 'Buy new or used?', body: "Used Honda mowers under 8 years old are a lifetime bargain — the engines genuinely outlast their owners. Used cordless is risky because battery health degrades invisibly. Used ride-on is risky because hydrostatic transmissions are expensive to fix. Used Mountfield, Bosch, and Hayter petrol mowers under 6 years old are usually safe bets." }
  ];

  return `${head({
    title: 'UK lawnmower buying guide — 5 questions, one mower',
    description: 'Practical UK lawnmower buying guide. Five questions in order — lawn size, terrain, stripes, fuel type, new or used — and you have your answer in three minutes.',
    canonical: '/buying-guide'
  })}
${siteHeader('guide')}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Browse</a><span class="sep">›</span>
    <span aria-current="page">Buying Guide</span>
  </nav>
</div>

<section style="padding:32px 32px 56px">
  <div class="page page--narrow" style="padding:0">
    <div class="brand-eyebrow">The 5-question buying guide</div>
    <h1 class="bg-h1">Five questions, one mower.</h1>
    <p class="cat-lead" style="font-size:18px;max-width:640px;line-height:1.6">Most "best lawn mower" lists are paid placements. Ours isn't. Walk through these five questions in order and you'll have your answer in three minutes.</p>

    ${adBanner('guide-top', 'Above-fold leaderboard')}

    <div style="display:flex;flex-direction:column;gap:16px;margin-top:8px">
      ${sections.map((s, i) => `
      <article class="guide-section">
        <div class="num">${s.num}</div>
        <div>
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.body)}</p>
        </div>
      </article>
      ${i === 2 ? adInRow('guide-mid') : ''}`).join('')}
    </div>

    <div style="margin-top:32px">
      ${ctaStrip('Ready to look?', `Browse all ${mowers.length} mowers in the database with three prices apiece, filtered by category and brand.`, 'Browse all mowers', '/')}
    </div>
  </div>
</section>

${siteFooter()}
</body>
</html>`;
}

// ---------- About page ----------
function renderAboutPage() {
  return `${head({
    title: 'About MowRight UK — independent lawnmower price guide',
    description: 'How MowRight UK works, where our prices come from, and why we are not affiliated with any manufacturer or seller.',
    canonical: '/about'
  })}
${siteHeader('about')}

<div class="page page--narrow" style="max-width:760px">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Browse</a><span class="sep">›</span>
    <span aria-current="page">About</span>
  </nav>
</div>

<section style="padding:32px 32px 80px">
  <div class="page page--narrow about" style="max-width:760px;padding:0">
    <h1 class="about-h1">We compare lawnmowers.<br/><span class="accent">That's the whole thing.</span></h1>
    <p class="lead">MowRight UK was started in 2023 by a small team of British gardeners frustrated that every "best lawnmower 2024" article was a thinly-disguised affiliate ranking. We don't take affiliate commissions. We don't accept manufacturer-sponsored placements. We're funded entirely by display advertising, which is clearly labelled wherever it appears on this site.</p>

    <h2 class="about-h2">How we test</h2>
    <p>Every mower in our database is hands-on tested, either by a member of our team or — for older or rarer models — by a network of volunteer reviewers across the UK. Specs are taken from the manufacturer and verified. Prices are checked weekly against the lowest-listed major UK retailer (Amazon UK, B&amp;Q, Mowdirect, Robert Dyas) and against actual sold listings on Facebook Marketplace and eBay UK.</p>

    <h2 class="about-h2">About the used-price data</h2>
    <p>The "Used Average" price on every model page is calculated from a rolling 90-day window of sold listings on Facebook Marketplace, Gumtree, and eBay UK (sold-completed only, not asking prices). We exclude obvious outliers — broken mowers, dealer flips, missing parts. You should always verify with a starting demonstration before paying.</p>

    <h2 class="about-h2">Brands we cover</h2>
    <p style="margin-top:14px">All ${Object.keys(BRANDS).length} brands in our database have a dedicated page with focus, parent group, UK position, and full model list.</p>
    <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:6px">
      ${Object.keys(BRANDS).sort().map(b => `<a href="${esc(brandUrl(b))}" style="padding:5px 10px;background:var(--surface);border:1px solid var(--border);border-radius:999px;font-size:12px;color:var(--ink)">${esc(b)}</a>`).join('')}
    </div>

    <h2 class="about-h2">Get in touch</h2>
    <p>Spotted a price error? Want us to add a model? Email <a href="mailto:editor@mowright.uk" style="color:var(--accent);font-weight:600">editor@mowright.uk</a>. We read everything.</p>
  </div>
</section>

${siteFooter()}
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
    ...Object.keys(CATEGORIES).map(t => ({ loc: '/' + CATEGORIES[t].slug, priority: '0.8', changefreq: 'monthly' })),
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

// ---------- mowers-spa.json (transformed data the SPA loads at runtime) ----------
function spaData() {
  return {
    mowers: mowers.map(m => ({
      id: m.id, brand: m.brand, brandSlug: m.brandSlug, model: m.model,
      type: m.type, typeSlug: m.typeSlug,
      rrp: m.rrp, buyNow: m.buyNow, usedAvg: m.usedAvg,
      rating: m.rating, reviews: m.reviews, valueScore: m.valueScore,
      tagline: m.tagline,
      cutWidth: m.cutWidth, weight: m.weight, deck: m.deck, engine: m.engine,
      selfPropelled: m.selfPropelled, roller: m.roller, mulching: m.mulching,
      cuttingHeights: m.cuttingHeights, bagCapacity: m.bagCapacity,
      lawnSize: m.lawnSize, noiseDb: m.noiseDb,
      pros: m.pros, cons: m.cons, verdict: m.verdict, tip: m.tip
    })),
    categories: Object.entries(CATEGORIES).map(([k, v]) => ({ key: k, slug: v.slug, name: v.name, color: v.color, bg: v.bg, desc: v.desc })),
    brands: Object.entries(BRANDS).map(([k, v]) => ({ key: k, slug: slug(k), ...v })),
    featuredBrands: FEATURED_BRANDS.map(b => slug(b))
  };
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
  writeFileSync(join(ROOT, 'mower', `${m.id}.html`), renderMowerPage(m));
  written++;
}
for (const t of Object.keys(CATEGORIES)) {
  writeFileSync(join(ROOT, `${CATEGORIES[t].slug}.html`), renderCategoryPage(t));
  written++;
}
for (const b of Object.keys(BRANDS)) {
  const html = renderBrandPage(b);
  if (html) {
    writeFileSync(join(ROOT, 'brand', `${slug(b)}.html`), html);
    written++;
  }
}
writeFileSync(join(ROOT, 'about.html'), renderAboutPage()); written++;
writeFileSync(join(ROOT, 'buying-guide.html'), renderGuideHub()); written++;
writeFileSync(join(ROOT, 'sitemap.xml'), renderSitemap()); written++;
writeFileSync(join(ROOT, 'mowers-spa.json'), JSON.stringify(spaData(), null, 2)); written++;

console.log(`Built ${written} files.`);
console.log(`  ${mowers.length} mower pages`);
console.log(`  ${Object.keys(CATEGORIES).length} category pages`);
console.log(`  ${Object.keys(BRANDS).length} brand pages`);
console.log(`  4 misc (about, buying-guide, sitemap, mowers-spa.json)`);
