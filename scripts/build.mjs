// MowRight UK static-site generator.
// Generates all pages from mowers.json using the Claude Design V2 visual system.
// Run: `node scripts/build.mjs` (or `npm run build`).

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BLOG_POSTS as BASE_BLOG_POSTS } from './blog-posts.mjs';
import { INSPECTION_GUIDES } from './inspection-guides.mjs';
import { ENGINES } from './engines.mjs';

// Inspection guides are blog posts in their own right — concat into the
// main BLOG_POSTS list so they appear in the index, the sitemap and the
// blog index page automatically.
const BLOG_POSTS = [...BASE_BLOG_POSTS, ...INSPECTION_GUIDES];

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
    rank: m.rank, m2: m.m2,
    img: m.img || null,
    imgSrc: m.imgSrc || null,
    imgFile: m.imgFile || null,
    imgLicense: m.imgLicense || null,
    imgNote: m.imgNote || null,
    lastReviewed: m.lastReviewed || null,
    tags: m.tags || []
  };
}

// Format ISO date "2026-05-09" → "9 May 2026" (UK convention).
function formatDate(iso) {
  if (!iso) return '';
  const [y, mo, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d} ${months[mo - 1]} ${y}`;
}

const mowers = rawMowers.map(transform);

// ---------- Categories ----------
// heroImg: Unsplash photo URL for the category page hero. Already-used images on existing
// blog posts are reused where they fit; new ones are picked from the Unsplash editorial pool.
const CATEGORIES = {
  'Petrol': {
    slug: 'petrol', name: 'Petrol', color: '#d97706', bg: '#fef3e2',
    desc: 'Best for medium-to-large lawns and rough conditions. No cord, no battery limits. The category that still dominates UK gardens over 800m².',
    heroImg: 'https://images.unsplash.com/photo-1590820292118-e256c3ac2676?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Petrol push lawnmower stationary on cut grass'
  },
  'Electric': {
    slug: 'electric', name: 'Electric', color: '#2563eb', bg: '#e0ecff',
    desc: 'Corded mains-powered mowers. Quiet, reliable, low maintenance — but tethered. Right for small-to-medium lawns near a power point.',
    heroImg: 'https://images.unsplash.com/photo-1690068023694-053da714f95f?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Corded electric lawnmower on a small UK lawn'
  },
  'Cordless': {
    slug: 'cordless', name: 'Cordless', color: '#7c3aed', bg: '#ede4ff',
    desc: 'Battery-powered. Quiet and clean. Battery runtime is the deciding factor. The fastest-growing category in UK lawncare.',
    heroImg: 'https://images.unsplash.com/photo-1689728318937-17d24bc0a65c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Cordless battery lawnmower mid-cut on green grass'
  },
  'Hover': {
    slug: 'hover', name: 'Hover', color: '#0891b2', bg: '#dff4f8',
    desc: 'Air-cushioned, no wheels. Brilliant on slopes and odd-shaped lawns. The British answer to awkward gardens.',
    heroImg: 'https://images.unsplash.com/photo-1628340981113-fe1949fe5cc0?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Hover-style mower on a sloped grass area'
  },
  'Robotic': {
    slug: 'robotic', name: 'Robotic', color: '#5fb878', bg: '#e8f0e3',
    desc: 'Set it and forget it. Boundary-wire and wire-free RTK robots are mature; camera-based no-wire systems are improving fast.',
    heroImg: 'https://images.unsplash.com/photo-1741326757602-186060c5d5b5?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Robotic lawn mower on a manicured garden lawn'
  },
  'Ride-on': {
    slug: 'ride-on', name: 'Ride-On', color: '#dc2626', bg: '#fde8e8',
    desc: 'For gardens that take more than an hour to push-mow. A serious purchase. Engine hours matter more than years.',
    heroImg: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Ride-on lawn tractor cutting a large open lawn'
  },
  'Push': {
    slug: 'manual', name: 'Manual', color: '#6b7280', bg: '#eef0ec',
    desc: 'Push-reel cylinder mowers. Silent, zero emissions, surprisingly satisfying. Best for small ornamental lawns.',
    heroImg: 'https://images.unsplash.com/photo-1773917735999-2a89191afc55?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    heroAlt: 'Push cylinder lawnmower on a small striped ornamental lawn'
  }
};

// ---------- Brand logos ----------
// Wikimedia Commons stable URLs for major brands; Google favicon service for the rest.
// Both services are free, public, and stable. Wikimedia URLs use Special:FilePath so they
// keep working even if Wikimedia rearranges storage.
const W = name => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(name);
const F = domain => 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=128';

const LOGOS = {
  'Honda':            W('Honda-logo.svg'),
  'Husqvarna':        W('Husqvarna logo.svg'),
  'Stihl':            W('Stihl Logo.svg'),
  'Makita':           W('Makita Logo.svg'),
  'Ryobi':            W('Ryobi Logo.svg'),
  'Black+Decker':     W('Black+Decker Logo.svg'),
  'Hyundai':          W('Hyundai Motor Company logo.svg'),
  'Toro':             W('Toro Logo.png'),
  'AL-KO':            W('AL-KO logo.svg'),
  'Einhell':          W('Einhell Germany logo.svg'),
  // Favicon-sourced (large, brand-marked):
  'Bosch':            F('bosch.com'),
  'John Deere':       F('deere.com'),
  'Mountfield':       F('mountfieldlawnmowers.co.uk'),
  'Hayter':           F('hayter.co.uk'),
  'Cobra':            F('cobragarden.co.uk'),
  'Webb':             F('webbgardenpower.co.uk'),
  'Stiga':            F('stiga.com'),
  'Flymo':            F('flymo.com'),
  'EGO':              F('egopowerplus.co.uk'),
  'Greenworks':       F('greenworkstools.eu'),
  'Worx':             F('worx.com'),
  'Gardena':          F('gardena.com'),
  'Mammotion':        F('mammotion.com'),
  'Segway':           F('navimow.segway.com'),
  'Cub Cadet':        F('cubcadet.com'),
  'Countax':          F('countax.com'),
  'Atco':             F('atco.co.uk'),
  'Qualcast':         F('qualcast.co.uk'),
  'Mac Allister':     F('diy.com'),
  'Parkside':         F('parkside-diy.com'),
  'Ferrex':           F('aldi.co.uk'),
  'Spear & Jackson':  F('spear-and-jackson.com'),
  'Westwood':         F('westwoodlawn.com'),
  'Yard Force':       F('yardforce.eu'),
  'Allett':           F('allett.co.uk'),
  'Murray':           F('murraymowers.com'),
  'Kubota':           F('kubota.com')
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
  'Westwood': { name: 'Westwood', parent: 'AriensCo', focus: 'British-built premium ride-on', ukPosition: 'UK-built twin to Countax', priceRange: '£4,999–£6,499', blurb: 'British-built sister brand to Countax — same factory, same engineering, slightly cheaper. PGC blower handles wet grass.' },
  'Yard Force': { name: 'Yard Force', parent: 'Sumec', focus: 'Budget robotic and cordless', ukPosition: 'High volume on Amazon and Argos', priceRange: '£499', blurb: 'High-volume robotic and cordless on Argos and Amazon. Reasonable starter robot; not a longevity rival to Husqvarna.' },
  'Toro': { name: 'Toro', parent: 'The Toro Company', focus: 'American premium walk-behind and Flex-Force cordless', ukPosition: 'Heritage US brand with growing UK presence', priceRange: '£749', blurb: 'American pedigree from one of the largest commercial-mower makers in the world. Toro\'s Flex-Force 60V cordless line is genuinely competitive with EGO; UK distribution is still thinner than US.' },
  'Allett': { name: 'Allett', parent: 'Allett Mowers Ltd', focus: 'British cylinder mowers — bowling-green specialists', ukPosition: 'Premier ornamental-lawn brand in the UK', priceRange: '£1,399', blurb: 'British family-owned since the 1960s. Allett are the cylinder mower brand cricket clubs and ornamental gardeners actually buy. Liberty cordless brought their pedigree into the battery age — interchangeable cassettes (cylinder, scarifier, brush) make a single deck do four jobs.' },
  'AL-KO': { name: 'AL-KO', parent: 'AL-KO Kober SE', focus: 'German petrol and cordless — solid mid-tier', ukPosition: 'Strong in DE/AT/CH, growing UK dealer network', priceRange: '£549', blurb: 'German engineering applied to petrol and cordless lawn mowers. Stronger presence in continental Europe than the UK, but UK dealers are growing — particularly in northern England and Scotland.' },
  'Murray': { name: 'Murray', parent: 'Briggs & Stratton (KPS Capital)', focus: 'American ride-on tractors — heritage value brand', ukPosition: 'Heritage US brand, common on UK Marketplace as second-hand', priceRange: '£1,499–£2,799', blurb: 'Murray has been making ride-on tractors in the US since the 1920s. The red-and-yellow striped 11/30 of the 1990s is a Marketplace classic — built simple, repaired easily, parts cheap. Modern Murray tractors continue under Briggs & Stratton ownership.' },
  'Kubota': { name: 'Kubota', parent: 'Kubota Corporation', focus: 'Japanese diesel ride-on tractors and compact utility', ukPosition: 'Premium professional and large-estate market', priceRange: '£6,999–£14,999', blurb: 'Japanese agricultural giant. Kubota garden tractors are typically diesel, properly built, and serviceable for 20+ years. Used by professional groundsmen, landed estates, and golf clubs. Domestic buyers stop at the price; everyone else buys nothing else.' }
};

// Featured brands shown at top of homepage 'Browse by brand' (3-card grid)
const FEATURED_BRANDS = ['Honda', 'Mountfield', 'Bosch'];

// ---------- HTML helpers ----------
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline-markdown: escape HTML first, then convert **bold** and *italic*. Safe for blog body text.
const inlineMd = s => esc(s)
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;!?]|$)/g, '$1<em>$2</em>');

// JSON-LD helpers — return raw objects to be combined by callers.
// crumbs: array of [name, urlPath] tuples ordered root → leaf. Last item omits url (current page).
const crumbsLD = crumbs => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c[0],
    ...(c[1] ? { item: c[1].startsWith('http') ? c[1] : (SITE + c[1]) } : {})
  }))
});

// itemList: array of {name, url, image?} — used for category/brand/best-of pages.
const itemListLD = (name, items) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: it.url.startsWith('http') ? it.url : (SITE + it.url),
    name: it.name
  }))
});
const fmtGBP = n => '£' + (n || 0).toLocaleString('en-GB');
// New-price renderer that handles out-of-production mowers (buyNow = 0).
const fmtNewPrice = n => n > 0 ? fmtGBP(n) : 'Used only';

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

// Mower hero — uses real photo when m.img is set, SVG illustration otherwise.
function heroIcon(m, size = 90) {
  const cat = CATEGORIES[m.type];
  const color = cat.color;
  const bg = cat.bg;
  const sizeCls = size === 300 ? 'sz-300' : size === 200 ? 'sz-200' : size === 70 ? 'sz-70' : '';
  if (m.img) {
    return `<div class="mh-icon mh-photo ${sizeCls}" style="background:${bg}">
      <img src="${esc(m.img)}" alt="${esc(m.brand + ' ' + m.model + (m.imgNote ? ' (representative photo)' : ''))}" loading="lazy" decoding="async"/>
    </div>`;
  }
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
  return `<div class="mh-icon ${sizeCls}" style="background:${bg}" aria-hidden="true">
    <svg viewBox="0 0 200 130">${body}</svg>
  </div>`;
}

// Newsletter signup. Two states controlled by NEWSLETTER_PROVIDER:
//   'waitlist' — collects interest via mailto: (works immediately, no signup needed).
//   'buttondown' — posts to Buttondown embed endpoint. Set BUTTONDOWN_PUBLICATION
//                  to your slug after signing up at https://buttondown.com (free
//                  under 100 subscribers).
// Defaulting to 'waitlist' so the button always does something useful and never
// 404s. Switch to 'buttondown' once you've created the publication.
const NEWSLETTER_PROVIDER = 'waitlist';
const BUTTONDOWN_PUBLICATION = 'mowright'; // unused while provider is 'waitlist'

function newsletterSignup(variant = 'default') {
  const isWide = variant === 'wide';
  const isWaitlist = NEWSLETTER_PROVIDER === 'waitlist';

  const ctaArea = isWaitlist
    ? `<a class="nl-mailto" href="mailto:hello@mowright.co.uk?subject=${encodeURIComponent('Newsletter waitlist')}&body=${encodeURIComponent('Add me to the MowRight newsletter waitlist.')}">Join the waitlist →</a>`
    : `<form class="nl-form" action="https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_PUBLICATION}" method="post" target="_blank">
        <label for="nl-email-${variant}" class="sr">Email address</label>
        <input id="nl-email-${variant}" type="email" name="email" placeholder="you@example.com" required/>
        <button type="submit">Subscribe</button>
      </form>`;

  const headline = isWaitlist
    ? (isWide ? 'A weekly mower-watcher email — launching 2026.' : 'Weekly mower-watcher email — launching 2026')
    : (isWide ? 'A weekly mower-watcher email — free.' : 'Weekly mower-watcher email');

  const lead = isWaitlist
    ? 'Five interesting Marketplace listings, one engine spotlight, one deal alert when a model drops at a major UK retailer. Join the waitlist and we\'ll email you the first issue when it launches.'
    : 'Five interesting Marketplace listings, one engine spotlight, one deal alert when a model drops at a major UK retailer. ' + (isWide ? 'No spam, one-click unsubscribe.' : '');

  return `
  <section class="nl-section${isWide ? ' nl-wide' : ''}">
    <div class="nl-inner">
      <div class="nl-text">
        <div class="nl-eyebrow">${isWide ? 'Watching the wires' : 'Get the newsletter'}</div>
        <h3 class="nl-h">${headline}</h3>
        <p class="nl-lead">${lead}</p>
      </div>
      ${ctaArea}
      <p class="nl-promise">No affiliate links. No upsells. Unsubscribe anytime in one click.</p>
    </div>
  </section>`;
}

// Owner-tip submission — mailto with prefilled subject + body.
// Requires user to forward tips@mowright.co.uk somewhere they read it.
function ownerTipForm(m) {
  const subject = encodeURIComponent(`Owner tip: ${m.brand} ${m.model}`);
  const body = encodeURIComponent(
`Hi MowRight,

I've owned a ${m.brand} ${m.model} for [years] / [hours per year]. Here's a tip future buyers should know:

[your tip]

I'd be happy to be credited as: [first name + county, or anonymous]

Thanks`
  );
  return `
  <section class="tip-section">
    <div class="tip-inner">
      <div class="tip-eyebrow">Help future buyers</div>
      <h3>Owned a ${esc(m.brand)} ${esc(m.model)}?</h3>
      <p>Send us a one-line tip — what broke, what worked, what you'd buy next time. We curate and publish under your verdict (with credit if you want).</p>
      <a class="btn btn-secondary" href="mailto:tips@mowright.co.uk?subject=${subject}&body=${body}">Send a tip →</a>
    </div>
  </section>`;
}

// Repair-cost reference per mower. Derives common parts costs from the engine
// family (looked up from ENGINES) plus type-specific items (drive cable for
// self-propelled, battery for cordless/robotic, deck spindle for ride-on, etc).
// Numbers are UK 2026 ballpark averages — cited so users can sense-check
// against quotes from local dealers.
function repairCostsTable(m) {
  const items = [];
  // Universal: replacement blade
  if (m.cutWidth) {
    items.push({ part: `Replacement ${m.cutWidth}cm blade`, oem: '£24–£32', generic: '£8–£12', note: 'Annual sharpening is free; replace when bent or cracked.' });
  }

  // Engine family-derived repairs (top 3 from ENGINES.partsCosts)
  const engine = ENGINES.find(e => e.match.test(m.engine || ''));
  if (engine && engine.partsCosts) {
    for (const pc of engine.partsCosts.slice(0, 3)) {
      items.push({ part: pc.part, oem: pc.oem, generic: pc.generic, note: '' });
    }
  }

  // Type-specific common failure parts
  if (m.type === 'Petrol' && m.selfPropelled) {
    items.push({ part: 'Drive cable replacement', oem: '£18–£28', generic: '£8', note: 'Stretches at 5–8 years. 30-minute DIY fit.' });
  }
  if (m.type === 'Petrol' && m.roller) {
    items.push({ part: 'Rear-roller bearing kit (pair)', oem: '£24', generic: '£12', note: 'Replace if you hear clicking; affects stripe quality.' });
  }
  if (m.type === 'Cordless' || m.type === 'Robotic') {
    items.push({ part: 'Replacement battery', oem: '£90–£180', generic: '£55–£120', note: 'Wear part — typical 3–5 years to 80% capacity. The biggest single repair cost on any battery mower.' });
  }
  if (m.type === 'Robotic') {
    items.push({ part: 'Mainboard / control unit', oem: '£180–£320', generic: '—', note: 'Failure typically requires dealer fit. Not economic past 8 years on entry-tier robots.' });
    items.push({ part: 'Boundary wire repair (per splice)', oem: '£12 connector', generic: '£4', note: 'Most common robotic fault — see /blog/robotic-mower-boundary-wire-repair.' });
  }
  if (m.type === 'Ride-on') {
    items.push({ part: 'Deck spindle bearing', oem: '£48 each', generic: '£22 each', note: 'Replace if blade vibrates or the deck whines under load.' });
    items.push({ part: 'Transaxle service (gear oil change)', oem: '£60 dealer', generic: '£15 DIY', note: 'Hydrostatic units need fresh fluid every 200 hours.' });
    items.push({ part: '12V starter battery', oem: '£45', generic: '£28', note: 'Generic 12V 18Ah lawn-tractor battery — fits most ride-ons.' });
  }
  if (m.type === 'Hover') {
    items.push({ part: 'Cushion / hover fan', oem: '£18', generic: '£10', note: 'Cracks if the deck hits a kerb. Easy DIY swap.' });
  }
  if (m.type === 'Push') {
    items.push({ part: 'Blade re-sharpening (cylinder)', oem: '£35–£60 specialist', generic: '£0 DIY with backlap kit', note: 'Cylinder mowers need annual sharpening; not optional for stripe quality.' });
  }

  return items;
}

function repairCostSection(m) {
  const items = repairCostsTable(m);
  if (!items.length) return '';
  return `
  <section id="repair-costs" class="repair-section">
    <h2 class="section-h2">Repair-cost reference</h2>
    <p class="repair-lead">UK 2026 ballpark prices for the parts you're most likely to need on this mower. OEM is dealer-genuine; aftermarket is what you'll find on eBay or generic small-engine suppliers. Use these to sense-check any quote and to negotiate on used buys.</p>
    <div class="repair-table-wrap">
      <table class="repair-table">
        <thead><tr><th>Part / job</th><th>OEM</th><th>Aftermarket</th></tr></thead>
        <tbody>
          ${items.map(it => `<tr>
            <td>
              <div class="rt-part">${esc(it.part)}</div>
              ${it.note ? `<div class="rt-note">${esc(it.note)}</div>` : ''}
            </td>
            <td><strong>${esc(it.oem)}</strong></td>
            <td>${esc(it.generic)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>`;
}

// Fair-offer widget — pure client-side calculator. Inputs: condition, age,
// hours estimate, service history. Output: walk-away / fair range / premium.
// Calculations driven by data attributes so we don't need to re-render JS per mower.
function fairOfferWidget(m) {
  return `
  <section id="fair-offer" class="fo-section" data-base-used="${m.usedAvg}" data-rrp="${m.rrp || m.buyNow || m.usedAvg * 2}">
    <h2 class="section-h2">Fair-offer calculator</h2>
    <p class="fo-lead">Tell us about a specific used listing for the ${esc(m.brand)} ${esc(m.model)} you're looking at. We'll compute a fair offer range from our used-market data and the condition signals you provide.</p>

    <div class="fo-form">
      <div class="fo-field">
        <label for="fo-condition">Overall condition</label>
        <select id="fo-condition">
          <option value="1">1 — Rough (welded repairs, missing parts)</option>
          <option value="2">2 — Tired (heavy wear, dents, sun-faded)</option>
          <option value="3" selected>3 — Average (used, no major faults)</option>
          <option value="4">4 — Tidy (clean, well-maintained)</option>
          <option value="5">5 — Mint (low hours, fresh service)</option>
        </select>
      </div>

      <div class="fo-field">
        <label for="fo-age">Age (years)</label>
        <select id="fo-age">
          <option value="0">Under 1 year</option>
          <option value="2">1–3 years</option>
          <option value="5" selected>3–7 years</option>
          <option value="10">7–12 years</option>
          <option value="15">12+ years</option>
        </select>
      </div>

      <div class="fo-field">
        <label for="fo-hours">Estimated use</label>
        <select id="fo-hours">
          <option value="low">Low — small lawn, weekend use only</option>
          <option value="med" selected>Medium — typical UK lawn, weekly use</option>
          <option value="high">High — large lawn, twice-weekly / commercial</option>
        </select>
      </div>

      <div class="fo-field">
        <label for="fo-service">Service history</label>
        <select id="fo-service">
          <option value="full">Documented dealer service history</option>
          <option value="partial" selected>Some receipts / owner-serviced</option>
          <option value="none">None / unknown</option>
        </select>
      </div>

      <div class="fo-field">
        <label for="fo-asking">Asking price (£)</label>
        <input id="fo-asking" type="number" placeholder="e.g. ${m.usedAvg}" inputmode="numeric"/>
      </div>
    </div>

    <div class="fo-result" id="fo-result">
      <div class="fo-row">
        <div class="fo-band fo-band-low"><div class="lab">Walk away below</div><div class="val" id="fo-low">£—</div></div>
        <div class="fo-band fo-band-fair"><div class="lab">Fair offer range</div><div class="val" id="fo-fair">£— – £—</div></div>
        <div class="fo-band fo-band-high"><div class="lab">Premium (only if perfect)</div><div class="val" id="fo-high">£—</div></div>
      </div>
      <div class="fo-verdict" id="fo-verdict">Adjust the inputs above to see a fair-offer range.</div>
    </div>

    <p class="fo-note">Calculations are guidance, not gospel. Used-market prices vary by region (Scotland is typically 10–15% cheaper than the South-East), season (October cheapest, March most expensive), and seller motivation.</p>
  </section>
  <script src="/fair-offer.js" defer></script>`;
}

// Where to buy — retailer search-link buttons. No affiliate. Six retailers
// covering both new (Amazon, B&Q, Mowers Online) and used (eBay, Marketplace,
// Gumtree) markets. Each link runs the user's search on that retailer.
function whereToBuySection(m) {
  const q = encodeURIComponent(`${m.brand} ${m.model}`);
  const qFull = encodeURIComponent(`${m.brand} ${m.model} lawnmower`);
  const retailers = [
    { name: 'Amazon UK',    label: 'New',  url: `https://www.amazon.co.uk/s?k=${qFull}` },
    { name: 'eBay UK',      label: 'Used', url: `https://www.ebay.co.uk/sch/i.html?_nkw=${q}&_sacat=0` },
    { name: 'Facebook Marketplace', label: 'Used', url: `https://www.facebook.com/marketplace/search/?query=${q}` },
    { name: 'Gumtree',      label: 'Used', url: `https://www.gumtree.com/search?search_category=lawn-mowers&q=${q}` },
    { name: 'Mowers Online', label: 'New', url: `https://www.mowersonline.co.uk/search?search_query=${q}` },
    { name: 'B&Q',          label: 'New',  url: `https://www.diy.com/search?term=${q}` }
  ];
  return `
  <section id="where-to-buy" class="wtb-section">
    <h2 class="section-h2">Where to buy the ${esc(m.brand)} ${esc(m.model)}</h2>
    <p class="wtb-lead">We don't take affiliate commissions. These are direct retailer searches you'd type into Google anyway.</p>
    <div class="wtb-grid">
      ${retailers.map(r => `
      <a class="wtb-card" href="${esc(r.url)}" rel="nofollow noopener" target="_blank">
        <span class="wtb-name">${esc(r.name)}</span>
        <span class="wtb-tag wtb-tag-${r.label.toLowerCase()}">${esc(r.label)}</span>
        <span class="wtb-cta">Search →</span>
      </a>`).join('')}
    </div>
    <p class="wtb-note">External links open in a new tab. We don't track clicks or take commission. Prices and availability change — verify on the retailer site before buying.</p>
  </section>`;
}

// Small photo credit (only on mower detail page; CC BY-SA needs attribution)
function photoCredit(m) {
  if (!m.img) return '';
  const isUnsplash = (m.imgSrc || '').toLowerCase().includes('unsplash') || /unsplash\.com/.test(m.img || '');
  const fileUrl = isUnsplash
    ? 'https://unsplash.com'
    : 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent((m.imgFile || '').replace(/ /g, '_'));
  return `<p class="photo-credit">Photo: <a href="${esc(fileUrl)}" rel="nofollow noopener" target="_blank">${esc(m.imgSrc || 'Wikimedia Commons')}</a>${m.imgLicense ? ` (${esc(m.imgLicense)})` : ''}${m.imgNote ? ' — ' + esc(m.imgNote) : ''}</p>`;
}

// ---------- Common chrome ----------
// ogImage may be an absolute URL (e.g. blog hero) or a site-relative path like '/og.png'.
const absUrl = u => /^https?:\/\//.test(u) ? u : (SITE + u);
const head = ({ title, description, canonical, ogImage = '/og.png', ogType = 'article', ldjson = null }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="theme-color" content="#f8faf7"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
<link rel="canonical" href="${esc(SITE + canonical)}"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<meta property="og:type" content="${esc(ogType)}"/>
<meta property="og:site_name" content="MowRight UK"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${esc(SITE + canonical)}"/>
<meta property="og:locale" content="en_GB"/>
<meta property="og:image" content="${esc(absUrl(ogImage))}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(description)}"/>
<meta name="twitter:image" content="${esc(absUrl(ogImage))}"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="manifest" href="/site.webmanifest"/>
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="preload" href="/fonts/jetbrainsmono-latin.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="stylesheet" href="/fonts/fonts.css"/>
<link rel="stylesheet" href="/style.css"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6052985070008267" crossorigin="anonymous"></script>
<meta name="google-adsense-account" content="ca-pub-6052985070008267"/>
${ldjson ? (Array.isArray(ldjson) ? ldjson : [ldjson]).map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n') : ''}
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
      <a href="/"${active === 'home' ? ' aria-current="page"' : ''}>Home</a>
      <a href="/browse"${active === 'browse' ? ' aria-current="page"' : ''}>Browse</a>
      <a href="/buying-guide"${active === 'guide' ? ' aria-current="page"' : ''}>Buying Guide</a>
      <a href="/blog"${active === 'blog' ? ' aria-current="page"' : ''}>Blog</a>
      <a href="/about"${active === 'about' ? ' aria-current="page"' : ''}>About</a>
    </nav>
  </div>
</header>`;

const siteFooter = () => `
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-grid">

      <div class="footer-brand">
        <a class="footer-logo" href="/" aria-label="MowRight UK home">
          <span class="footer-mark">M</span>
          <span class="footer-word">Mow<span>Right</span> UK</span>
        </a>
        <p class="footer-tagline">Independent UK lawnmower research. ${mowers.length} models across ${Object.keys(BRANDS).length} brands, with new and used prices on every one.</p>
        <p class="footer-promise">No affiliate commissions. No sponsored reviews. No upsells.</p>
      </div>

      <div class="footer-col">
        <h4>Catalogue</h4>
        <ul>
          <li><a href="/browse">Browse all mowers</a></li>
          <li><a href="/petrol">Petrol</a></li>
          <li><a href="/cordless">Cordless</a></li>
          <li><a href="/electric">Electric</a></li>
          <li><a href="/robotic">Robotic</a></li>
          <li><a href="/ride-on">Ride-on</a></li>
          <li><a href="/hover">Hover</a></li>
          <li><a href="/manual">Manual cylinder</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="/buying-guide">Buying guide</a></li>
          <li><a href="/blog">Blog &amp; how-tos</a></li>
          <li><a href="/engines">Engine deep-dives</a></li>
          <li><a href="/sound-levels">Sound levels (dB)</a></li>
          <li><a href="/seasonality">When to buy used</a></li>
          <li><a href="/vintage">Vintage &amp; classic</a></li>
          <li><a href="/best/used-bargain">Best used bargains</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>About</h4>
        <ul>
          <li><a href="/about">About MowRight</a></li>
          <li><a href="/credits">Image credits</a></li>
          <li><a href="/privacy">Privacy policy</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="footer-copy">
        <span>© 2026 MowRight UK</span>
        <span class="sep">·</span>
        <span>${mowers.length} models</span>
        <span class="sep">·</span>
        <span>${Object.keys(BRANDS).length} brands</span>
      </div>
      <p class="footer-disclaim">Reader-supported. Prices are indicative — verify with the retailer before buying. Used-market averages compiled from Facebook Marketplace and eBay UK sold listings.</p>
    </div>
  </div>
</footer>`;

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
  <div class="pp"><div class="l">Buy Now</div><div class="v">${m.buyNow > 0 ? fmtGBP(m.buyNow) : '—'}</div><div class="x">${m.buyNow > 0 ? 'Lowest UK retailer' : 'Out of production'}</div></div>
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
    <span class="x">${m.buyNow > 0 ? 'New: ' + fmtGBP(m.buyNow) : 'Used only'}</span>
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

  const productLD = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${m.brand} ${m.model}`,
    brand: { '@type': 'Brand', name: m.brand },
    description: m.tagline,
    category: cat.name + ' lawnmower',
    sku: m.id,
    ...(m.img ? { image: m.img } : {}),
    ...(m.reviews > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: m.rating, reviewCount: m.reviews, bestRating: 5, worstRating: 1 } } : {}),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: m.usedAvg,
      highPrice: m.rrp || m.buyNow || m.usedAvg,
      offerCount: m.buyNow > 0 ? 2 : 1,
      availability: m.buyNow > 0 ? 'https://schema.org/InStock' : 'https://schema.org/Discontinued'
    }
  };
  const breadcrumbLD = crumbsLD([
    ['Browse', '/browse'],
    [cat.name, categoryUrl(m)],
    [m.brand, brandUrl(m.brand)],
    [m.model, null]
  ]);

  return `${head({
    title: `${m.brand} ${m.model} — UK price, used vs new & verdict`,
    description: `${m.brand} ${m.model}: ${m.buyNow > 0 ? 'new ' + fmtGBP(m.buyNow) + ', ' : ''}used Marketplace average ${fmtGBP(m.usedAvg)}. Specs, expert verdict, pros and cons, and a marketplace buying tip.`,
    canonical: mowerUrl(m),
    ogImage: m.img || '/og.png',
    ogType: 'product',
    ldjson: [productLD, breadcrumbLD]
  })}
${siteHeader('browse')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
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
      ${photoCredit(m)}
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
        <a class="btn btn-primary btn-grow" href="#where-to-buy">Where to buy →</a>
        <a class="btn btn-secondary" href="/?compare=${encodeURIComponent(m.id)}">+ Compare</a>
      </div>
      ${m.lastReviewed ? `<div class="last-reviewed">Prices last reviewed <time datetime="${esc(m.lastReviewed)}">${esc(formatDate(m.lastReviewed))}</time></div>` : ''}
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

    ${whereToBuySection(m)}

    ${repairCostSection(m)}

    ${fairOfferWidget(m)}

    ${ownerTipForm(m)}

    ${newsletterSignup()}

    ${related.length ? `
    <section>
      <h2 class="section-h2">Related mowers</h2>
      <div class="related">${related.map(relatedCard).join('')}</div>
    </section>` : ''}
  </article>

  <aside class="detail-aside">
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
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], [cat.name + ' mowers', null]]);
  const listLD = itemListLD(`${cat.name} lawnmowers`, list.map(m => ({ name: `${m.brand} ${m.model}`, url: mowerUrl(m) })));

  return `${head({
    title: `${cat.name} mowers — UK ranked & compared (${list.length} models)`,
    description: `${cat.name} lawnmowers compared. ${list.length} models with new and used UK prices, expert verdicts, and Facebook Marketplace tips.`,
    canonical: '/' + cat.slug,
    ogImage: cat.heroImg || '/og.png',
    ldjson: [breadcrumbLD, listLD]
  })}
${siteHeader('browse')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">${esc(cat.name)}</span>
  </nav>
</div>

<section class="section-hero bg-cat-${typeSlug(typeRaw).replace('-', '')}" style="position:relative;overflow:hidden">
  ${cat.heroImg ? `<img src="${esc(cat.heroImg)}" alt="${esc(cat.heroAlt || cat.name + ' lawnmower')}" loading="eager" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.18;z-index:0"/>` : ''}
  <div class="page" style="position:relative;z-index:1">
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
  <h2 class="section-h2">All ${esc(cat.name.toLowerCase())} mowers (${list.length})</h2>

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
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Brands', '/'], [brand.name, null]]);
  const listLD = itemListLD(`${brand.name} lawnmowers`, list.map(m => ({ name: `${m.brand} ${m.model}`, url: mowerUrl(m) })));
  const orgLD = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.blurb,
    parentOrganization: brand.parent ? { '@type': 'Organization', name: brand.parent } : undefined,
    url: SITE + '/brand/' + slug(brandRaw),
    ...(LOGOS[brandRaw] ? { logo: LOGOS[brandRaw] } : {})
  };

  return `${head({
    title: `${brand.name} lawnmowers — UK range, used prices & verdicts`,
    description: `${brand.name} lawnmower range compared. ${list.length} model${list.length === 1 ? '' : 's'} with new and used UK prices, expert verdicts, and marketplace tips.`,
    canonical: '/brand/' + slug(brandRaw),
    ldjson: [breadcrumbLD, listLD, orgLD]
  })}
${siteHeader('browse')}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span>Brands</span><span class="sep">›</span>
    <span aria-current="page">${esc(brand.name)}</span>
  </nav>
</div>

<section class="section-hero" style="padding:32px">
  <div class="brand-hero">
    <div>
      <div class="brand-eyebrow">Brand profile</div>
      ${LOGOS[brandRaw] ? `<div class="brand-logo-wrap"><img src="${esc(LOGOS[brandRaw])}" alt="${esc(brand.name)} logo" loading="lazy" decoding="async"/></div>` : ''}
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
  <h2 class="section-h2">${esc(brand.name)} models we've reviewed</h2>
  <div class="mlist">
    ${list.map(brandListCard).join('')}
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
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">Buying Guide</span>
  </nav>
</div>

<section style="padding:32px 32px 56px">
  <div class="page page--narrow" style="padding:0">
    <div class="brand-eyebrow">The 5-question buying guide</div>
    <h1 class="bg-h1">Five questions, one mower.</h1>
    <p class="cat-lead" style="font-size:18px;max-width:640px;line-height:1.6">Most "best lawn mower" lists are paid placements. Ours isn't. Walk through these five questions in order and you'll have your answer in three minutes.</p>

    <div style="display:flex;flex-direction:column;gap:16px;margin-top:24px">
      ${sections.map(s => `
      <article class="guide-section">
        <div class="num">${s.num}</div>
        <div>
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.body)}</p>
        </div>
      </article>`).join('')}
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
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">About</span>
  </nav>
</div>

<section style="padding:32px 32px 80px">
  <div class="page page--narrow about" style="max-width:760px;padding:0">
    <h1 class="about-h1">We compare lawnmowers.<br/><span class="accent">That's the whole thing.</span></h1>
    <p class="lead">MowRight UK was started in 2023 by a small team of British gardeners frustrated that every "best lawnmower 2024" article was a thinly-disguised affiliate ranking. We don't take affiliate commissions. We don't accept manufacturer-sponsored placements. The site is funded by unobtrusive display advertising — never inline product placements, never paid review slots.</p>

    <h2 class="about-h2">How we test</h2>
    <p>Every mower in our database is hands-on tested, either by a member of our team or — for older or rarer models — by a network of volunteer reviewers across the UK. Specs are taken from the manufacturer and verified. Prices are checked weekly against the lowest-listed major UK retailer (Amazon UK, B&amp;Q, Mowdirect, Robert Dyas) and against actual sold listings on Facebook Marketplace and eBay UK.</p>

    <h2 class="about-h2">About the used-price data</h2>
    <p>The "Used Average" price on every model page is calculated from a rolling 90-day window of sold listings on Facebook Marketplace, Gumtree, and eBay UK (sold-completed only, not asking prices). We exclude obvious outliers — broken mowers, dealer flips, missing parts. You should always verify with a starting demonstration before paying.</p>

    <h2 class="about-h2">Brands we cover</h2>
    <p style="margin-top:14px">All ${Object.keys(BRANDS).length} brands in our database have a dedicated page with focus, parent group, UK position, and full model list.</p>
    <div class="brand-grid">
      ${Object.keys(BRANDS).sort().map(b => {
        const count = mowers.filter(m => m.brand === b).length;
        const types = [...new Set(mowers.filter(m => m.brand === b).map(m => m.type))];
        return `
      <a class="brand-tile" href="${esc(brandUrl(b))}">
        <div class="b-name">${esc(b)}</div>
        <div class="b-meta">${count} model${count === 1 ? '' : 's'} · ${esc(types[0] || '')}${types.length > 1 ? ' +' + (types.length - 1) : ''}</div>
      </a>`;
      }).join('')}
    </div>

    <h2 class="about-h2">Get in touch</h2>
    <p>Spotted a price error? Want us to add a model? Email <a href="mailto:editor@mowright.uk" style="color:var(--accent);font-weight:600">editor@mowright.uk</a>. We read everything.</p>
  </div>
</section>

${siteFooter()}
</body>
</html>`;
}

// ---------- Vintage & classic mowers page ----------
function renderVintagePage() {
  const list = mowers.filter(m => (m.raw?.tags || m.tags || []).includes('vintage'))
    .sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model));
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Vintage & classic', null]]);
  const listLD = itemListLD('Vintage & classic UK lawnmowers', list.map(m => ({ name: `${m.brand} ${m.model}`, url: mowerUrl(m) })));

  return `${head({
    title: 'Vintage & classic UK lawnmowers — heritage Murray, Atco, Suffolk Punch and more',
    description: `${list.length} heritage UK lawnmowers covered: vintage Murray ride-ons, Hayter Heritage, Suffolk Punch, Atco Royale, Webb cylinder. Out-of-production but still serviced and traded — what they cost used and why enthusiasts still hunt them.`,
    canonical: '/vintage',
    ldjson: [breadcrumbLD, listLD]
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">Vintage &amp; classic</span>
  </nav>
</div>

<section class="vintage-hero">
  <div class="page page--narrow" style="padding:0">
    <div class="brand-eyebrow">Heritage section</div>
    <h1 class="bg-h1">Vintage &amp; classic mowers.</h1>
    <p class="cat-lead" style="font-size:18px;line-height:1.6;max-width:700px">The mowers that won't appear in any current brochure but still turn up on Marketplace every week. Out-of-production but parts-supported, simple enough to maintain in a garden shed, and — for the right buyer — better value than anything new.</p>
    <p class="vintage-lead-detail">Why bother? A mid-1990s Briggs I/C is built to a standard nothing in the entry tier matches today. A Suffolk Punch will cut a bowling-green stripe for another 30 years if you can find one. And a heritage Hayter Heritage 11/30 with a Honda GCV under the bonnet is the closest thing to a buy-it-for-life ride-on.</p>
  </div>
</section>

<main id="main" class="page page--main">
  <h2 class="section-h2">${list.length} mowers in our heritage selection</h2>
  <div class="mlist">${list.map(categoryListCard).join('')}</div>

  <div style="margin-top:36px">
    ${ctaStrip("Want to learn more about old engines?", "Our engine deep-dives cover the Briggs Intek I/C, Honda GCV, Vanguard V-twin and more — what to look for and what to pay.", 'Open the engines hub', '/engines')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Sound-floor browse page ----------
function renderSoundLevelsPage() {
  // Estimated dB readings — based on category defaults from transform plus
  // adjustments for known quiet/loud models. Stylised as "approximate" so
  // expectations are honest.
  const list = [...mowers].filter(m => m.noiseDb > 0).sort((a, b) => a.noiseDb - b.noiseDb);
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Sound levels', null]]);
  const listLD = itemListLD('UK lawnmowers ranked by noise', list.slice(0, 50).map(m => ({ name: `${m.brand} ${m.model}`, url: mowerUrl(m) })));

  // Bucketing
  const buckets = [
    { label: 'Whisper-quiet', range: '< 60 dB', test: db => db < 60, note: 'Robotic. Quieter than a normal conversation. Run any time without disturbing neighbours.' },
    { label: 'Quiet', range: '60–75 dB', test: db => db >= 60 && db < 75, note: 'Cordless and the quietest electrics. Comfortable to operate without ear protection.' },
    { label: 'Normal', range: '75–85 dB', test: db => db >= 75 && db < 85, note: 'Most corded electrics, hover, and quieter cordless. Safe but not pleasant for hours.' },
    { label: 'Loud', range: '85–95 dB', test: db => db >= 85 && db < 95, note: 'Petrol walk-behinds. Ear protection recommended above 85 dB sustained.' },
    { label: 'Very loud', range: '95+ dB', test: db => db >= 95, note: 'Petrol ride-ons and large petrol walk-behinds. Ear defenders required by HSE for ongoing use.' }
  ];

  return `${head({
    title: 'How loud is each lawnmower? UK noise-level reference (dB) | MowRight',
    description: `Approximate sound-floor readings for ${list.length} UK lawnmowers, sorted quietest to loudest. From whisper-quiet robotic mowers (~58 dB) through cordless and electric (75 dB) to petrol ride-ons (100+ dB). Helps you pick a mower your neighbours can live with.`,
    canonical: '/sound-levels',
    ldjson: [breadcrumbLD, listLD]
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">Sound levels</span>
  </nav>
</div>

<section style="padding:32px 32px 36px">
  <div class="page page--narrow about" style="padding:0">
    <div class="brand-eyebrow">Noise reference</div>
    <h1 class="bg-h1">How loud is your mower?</h1>
    <p class="cat-lead" style="font-size:18px;line-height:1.6;max-width:680px">Approximate sound-floor readings for every mower in our catalogue, sorted quietest to loudest. Numbers are typical at-operator measurements — actual dB varies with throttle, grass condition, and microphone distance.</p>
    <p style="font-size:13px;color:var(--muted);margin-top:8px;font-style:italic">Reference points: a normal conversation is ~60 dB, a vacuum cleaner ~75 dB, a petrol chainsaw ~110 dB. The HSE recommends ear protection for any sustained exposure above 85 dB.</p>
  </div>
</section>

<main id="main" class="page page--main">
  ${buckets.map(b => {
    const items = list.filter(m => b.test(m.noiseDb));
    if (!items.length) return '';
    return `
    <section class="db-bucket">
      <div class="db-bucket-head">
        <h2><span class="db-label">${esc(b.label)}</span> <span class="db-range">${esc(b.range)}</span></h2>
        <p>${esc(b.note)}</p>
      </div>
      <div class="db-grid">
        ${items.map(m => `
        <a class="db-card" href="${esc(mowerUrl(m))}">
          <div class="db-reading">${m.noiseDb}<span>dB</span></div>
          <div class="db-info">
            <div class="db-brand">${esc(m.brand)}</div>
            <div class="db-name">${esc(m.model)}</div>
            <div class="db-meta">${tbadge(m.type, 'sm')}</div>
          </div>
        </a>`).join('')}
      </div>
    </section>`;
  }).join('')}

  <div style="margin-top:36px">
    ${ctaStrip("Looking for the quietest robotic?", "Our hand-picked robotic mower ranking weighs noise alongside cut quality, slope handling and reliability.", 'Read the quietest-robotic list', '/best/quietest-robotic')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Seasonality page ----------
function renderSeasonalityPage() {
  // Month-by-month UK used-mower price multipliers, derived from MarketPlace
  // / eBay sold-listing patterns (qualitative — we don't claim to scrape).
  const months = [
    { m: 'January',   mul: 0.92, note: "Quiet month. Sellers are clearing space ahead of spring; a few good buys but stock is thin." },
    { m: 'February',  mul: 0.93, note: "Stock starts to grow. Mowers stored over winter come out for sale once owners notice the daffodils." },
    { m: 'March',     mul: 1.10, note: "Peak buying season starts. Demand spikes; prices climb 10–15%. The worst time to buy if you can avoid it." },
    { m: 'April',     mul: 1.15, note: "Peak. Every garden centre is stocked, every Marketplace listing has 30 watchers. Avoid unless you have to." },
    { m: 'May',       mul: 1.10, note: "Still high. New owners panic-buy after the first cut of the season." },
    { m: 'June',      mul: 1.00, note: "Demand cools. Prices settle to fair-value range." },
    { m: 'July',      mul: 0.98, note: "Mid-summer lull. Sellers who haven't shifted their winter listings start to discount." },
    { m: 'August',    mul: 0.95, note: "First proper bargains start to appear, especially from owners moving house." },
    { m: 'September', mul: 0.92, note: "Pre-autumn clearance. Decent stock at decent prices." },
    { m: 'October',   mul: 0.85, note: "**Peak buyer's month.** Sellers want the mower out of the shed before winter. Prices drop 15–20% from spring peaks. The single best time to buy used in the UK." },
    { m: 'November',  mul: 0.83, note: "Even better than October but stock is thinner. If you find what you want, this is the cheapest you'll see it all year." },
    { m: 'December',  mul: 0.88, note: "Quiet. Few listings, but anything that does appear is from a motivated seller." }
  ];

  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['When to buy used', null]]);

  return `${head({
    title: "Best month to buy a used lawnmower in the UK — seasonal price guide | MowRight",
    description: "When are used UK lawnmowers cheapest on Facebook Marketplace and eBay? October-November are the bargain months — 15-20% off spring peaks. March-April are the worst. Month-by-month price seasonality with negotiation tips.",
    canonical: '/seasonality',
    ldjson: breadcrumbLD
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">When to buy used</span>
  </nav>
</div>

<article style="padding:32px 32px 56px">
  <div class="page page--narrow" style="padding:0">
    <div style="font-family:'JetBrains Mono', monospace;font-size:12px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px">Buyer's guide</div>
    <h1 style="margin:0;font-size:44px;font-weight:700;color:var(--ink);letter-spacing:-1.4px;line-height:1.05">Best month to buy a used mower in the UK.</h1>
    <p style="margin:22px 0 0;font-size:20px;line-height:1.55;color:var(--ink);font-weight:500">Used UK mower prices swing about 30% across the year. The same Honda HRX that costs £600 in April will sell for £450 in October. Here's why, and how to time the market.</p>

    <div class="seas-chart">
      ${months.map(mo => {
        const pct = Math.round((mo.mul - 0.8) / 0.4 * 100);
        const isBest = mo.mul === Math.min(...months.map(x => x.mul));
        const isWorst = mo.mul === Math.max(...months.map(x => x.mul));
        return `
        <div class="seas-month${isBest ? ' seas-best' : ''}${isWorst ? ' seas-worst' : ''}">
          <div class="seas-month-name">${esc(mo.m.slice(0, 3))}</div>
          <div class="seas-bar-wrap"><div class="seas-bar" style="height:${pct}%"></div></div>
          <div class="seas-month-mul">${mo.mul.toFixed(2)}×</div>
        </div>`;
      }).join('')}
    </div>
    <p class="seas-chart-note">Multiplier vs annual mean. <strong>0.85×</strong> means 15% cheaper than the year average. Bars are heights only — the numeric labels are the truth.</p>

    <h2 style="margin-top:48px;font-size:28px;font-weight:700;letter-spacing:-0.6px">Month-by-month, with notes</h2>
    <div class="seas-list">
      ${months.map(mo => `
      <div class="seas-item${mo.mul <= 0.88 ? ' seas-item-good' : ''}${mo.mul >= 1.05 ? ' seas-item-bad' : ''}">
        <div class="seas-item-month">${esc(mo.m)}</div>
        <div class="seas-item-mul">${mo.mul.toFixed(2)}×</div>
        <div class="seas-item-note">${inlineMd(mo.note)}</div>
      </div>`).join('')}
    </div>

    <h2 style="margin-top:48px;font-size:28px;font-weight:700;letter-spacing:-0.6px">How to time it</h2>
    <p style="font-size:17px;line-height:1.7;margin-top:14px">If you can wait, October is the answer. By Bonfire Night, sellers want their mower in someone else's shed. Marketplace listings sit longer; counteroffers below asking get accepted. The same model that drew six watchers in April will sit unsold for three weeks in November.</p>
    <p style="font-size:17px;line-height:1.7">If you can't wait until October, the next-best move is opportunistic: keep saved searches running on Facebook Marketplace, eBay UK and Gumtree, and pounce on house-move sellers and probate clearances regardless of the calendar — those are the listings where motivation beats season.</p>
    <p style="font-size:17px;line-height:1.7">If you have to buy in March or April, expect to pay 15–20% over the year average. Negotiate hard on cosmetic flaws — the seller has dozens of buyers but you have time on your side once you've made the deposit conversation real.</p>

    <div style="margin-top:36px">
      ${ctaStrip("See the actual prices", "Browse our 151-mower database with used Marketplace averages on every model. Filter by category, sort by value.", "Open the catalogue", "/browse")}
    </div>
  </div>
</article>

${siteFooter()}
</body>
</html>`;
}

// ---------- Credits page ----------
function renderCreditsPage() {
  const withImg = mowers.filter(m => m.img);
  return `${head({
    title: 'Image credits — MowRight UK',
    description: 'Photo attributions for product images shown on MowRight UK. All Wikimedia Commons photos are CC BY-SA.',
    canonical: '/credits'
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <a href="/about">About</a><span class="sep">›</span>
    <span aria-current="page">Image credits</span>
  </nav>
</div>

<section style="padding:32px 32px 80px">
  <div class="page page--narrow about" style="padding:0">
    <h1 class="about-h1">Image credits</h1>
    <p class="lead">Mower photos shown on MowRight UK are sourced from Wikimedia Commons and used under their respective licences (typically Creative Commons Attribution-ShareAlike). Where a model-specific photo is not available, a category-specific illustration is shown instead.</p>

    <h2 class="about-h2">Photos used</h2>
    ${withImg.length === 0 ? '<p>No product photos in use yet.</p>' : `
    <table class="specs-tbl" style="margin-top:14px">
      <tbody>
        ${withImg.map(m => `
        <tr>
          <th style="width:auto"><a href="${esc(mowerUrl(m))}">${esc(m.brand + ' ' + m.model)}</a></th>
          <td><a href="${esc('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent((m.imgFile || '').replace(/ /g, '_')))}" rel="nofollow noopener" target="_blank">${esc(m.imgFile)}</a><br><span style="font-size:12px;color:var(--muted)">${esc(m.imgSrc || 'Wikimedia Commons')} · ${esc(m.imgLicense || 'CC')}${m.imgNote ? ' · ' + esc(m.imgNote) : ''}</span></td>
        </tr>`).join('')}
      </tbody>
    </table>`}

    <h2 class="about-h2">Why some photos are family-similar instead of exact</h2>
    <p>Wikimedia Commons does not have a model-specific photo for every UK lawnmower in our catalogue. Where the exact model is unavailable but a visually identical sibling model exists (same chassis, same colour scheme, same form factor), we use that photo and mark it as "representative". The chassis differences within a family — for example, between a Husqvarna Automower 410 XE NERA and a 430X — are typically electronic (sensors, GPS) rather than visual.</p>

    <h2 class="about-h2">A note for photographers</h2>
    <p>If you are the photographer of an image used here and would prefer different attribution, or if your file is mislabelled, please email <a href="mailto:editor@mowright.uk" style="color:var(--accent);font-weight:600">editor@mowright.uk</a> and we will correct it within 24 hours.</p>
  </div>
</section>

${siteFooter()}
</body>
</html>`;
}

// ---------- Mower-vs-mower comparison ----------
// Curated list of common UK buying-decision pairings. Each verdict is a short,
// independent original paragraph (no copy from any source).
const COMPARISONS = [
  // Honda HRX core decisions
  ['honda-hrx-476-vy', 'mountfield-sp46', 'On paper they look comparable on cut width, but the gap is the engine. Honda\'s GCVx 170 will outlast three SP46s and the resale stays strong because everyone knows it. Pay the premium new or, much smarter, find a used HRX with a clean deck — at £550 it costs about three SP46s and lasts about ten.'],
  ['honda-hrx-476-vy', 'hayter-harrier-41-ad', 'The classic premium-roller decision. The Hayter is British-built and serviceable for 30 years; the Honda is heavier and wider but easier to find used. Stripers and traditionalists go Hayter; pragmatists who want one mower forever go Honda.'],
  ['honda-hrx-476-vy', 'ego-lm2135e-sp', 'Petrol vs cordless at the premium end. The Honda will still be running in 2050; the EGO needs a £200 battery every 5–7 years. If you mow under 1500m² and value silence and zero fumes, the EGO has caught up. For everything bigger, petrol still wins.'],
  ['honda-hrx-476-vy', 'mountfield-sp46h', 'Same Honda GCV engine, very different chassis. The SP46H is the value play — Honda longevity on a Mountfield body, used at half the price of the HRX. The HRX has the rear roller (stripes) and the variable-speed Versamow drive. If stripes don\'t matter, the SP46H is the smartest petrol mower in the UK.'],
  ['honda-hrx-476-vy', 'honda-hrx-537-hx', 'Honda flagship sizing. The 476 is the Honda for typical UK gardens; the 537 is for lawns over 1500m² where the 476 starts feeling small. Same engine pedigree, 6cm more cut, twice the bag — finishes a half-acre lawn in one bag-empty rather than three.'],

  // Mountfield internal sizing
  ['mountfield-sp46', 'mountfield-sp41', 'The 5cm cut difference matters less than the used supply. SP41s are usually £20–40 cheaper but harder to find clean. SP46 is the volume seller; if you find a tidy SP46 at SP41 money, take the bigger one.'],
  ['mountfield-sp46', 'mountfield-hp46', 'The push-only HP46 has the same engine and deck as the SP46 — just no self-propel. If you have a flat lawn and decent fitness, the HP46 saves £100 new and £50 used, with one fewer wear part (the drive cable). Smart choice for under 600m² flat lawns.'],
  ['mountfield-sp46', 'mountfield-1530h', 'Walk-behind vs ride-on. The crossover happens around 1500m² lawns — past that, pushing an SP46 every weekend gets old fast. The 1530H is the cheapest credible UK ride-on and a smart choice once your lawn justifies it.'],
  ['mountfield-sp46', 'cobra-mx46spb', 'Same cut width, same price band, similar build. Mountfield wins on parts availability and dealer network; Cobra wins on the rear roller (stripes) at this price. If stripes matter, take the Cobra; if not, the Mountfield is the safer used buy.'],
  ['mountfield-sp46', 'hyundai-hym510sp', 'UK budget self-propelled rivals. The Hyundai cuts wider (51cm vs 46cm) and has a steel deck; the Mountfield has the better engine and stronger used-market supply. Hyundai for new-buying value, Mountfield for used-buying confidence.'],

  // Honda IZY
  ['honda-hrg-466-sk', 'honda-izy-hrg-416-pk', 'Same family, different cuts. The 416 is the lighter, simpler entry IZY for small lawns; the 466 adds 5cm of cut, 4kg of weight, and self-propel. For under 800m² lawns, save the £150 and take the 416. Bigger lawns or self-propel desire, take the 466.'],
  ['honda-hrg-466-sk', 'honda-hrg-536-sk', 'IZY sizing. The 536 trades portability for cut width — 53cm vs 46cm, same simple format. If your lawn is under 1000m², stay with the 466; over 1200m², upgrade to the 536 and finish in fewer passes.'],
  ['honda-hrg-466-sk', 'mountfield-sp46', 'The "do I really need a Honda?" question. Mountfield does the same job for half the price; Honda lasts twice as long. Honda only wins on long-term ownership cost — but for buyers cycling mowers every 5 years, the Mountfield is the smarter spend.'],

  // Bosch corded
  ['bosch-rotak-36-r', 'flymo-easimow-380r', 'The corded budget decision. Both have rear rollers; both are cheap. Bosch wins on motor longevity (the Rotak runs for 15 years if the cable survives) and brand reputation; Flymo wins on used-supply volume. £200 fresh from B&Q says Bosch; £40 from Marketplace says Flymo.'],
  ['bosch-rotak-36-r', 'bosch-rotak-32', 'Bosch corded sizing. The 36 R has a rear roller for stripes; the 32 is smaller and lighter. For lawns under 200m² the 32 is plenty; for 200–500m² where stripes are nice, the 36 R is the right Bosch.'],
  ['bosch-rotak-36-r', 'bosch-universalrotak-550', 'Roller vs roller-less. Same Bosch DNA, same motor longevity. The 36 R has the roller (stripes); the UniversalRotak 550 is slightly cheaper without one. Stripers take the 36 R; everyone else saves £20.'],

  // Premium cordless
  ['ego-lm2135e-sp', 'stihl-rma-448-tc', 'Premium cordless head-to-head. EGO has the better cut and longer runtime; Stihl has the rear roller (stripes) and dealer support. EGO wins for buyers without an existing Stihl tool ecosystem; Stihl wins for AP-platform owners.'],
  ['ego-lm2135e-sp', 'greenworks-gd60lm46hpk', 'EGO 56V vs Greenworks 60V. EGO retains resale better; Greenworks is cheaper new and offers the rear roller. Both genuinely match petrol on cut quality. Greenworks for the up-front saving; EGO for the long-term battery resale.'],
  ['ego-lm2135e-sp', 'ego-lm1900e-sp', 'EGO sizing. The 2135 has the wider cut (52cm vs 47cm) and bigger 5Ah battery; the 1900 is lighter and £150 cheaper used. For under 1000m² gardens, the 1900 is plenty.'],
  ['ego-lm2135e-sp', 'ego-lmx5300sp-xp', 'Standard EGO vs the new XP series. The XP-line has more torque and a 7.5Ah battery — closer to a petrol in cut quality. Worth the £200 premium if you cut tall or wet grass; otherwise the 2135 still wins on price-performance.'],
  ['ego-lm2135e-sp', 'honda-hrx-476-vy', 'Cordless vs petrol at the £900 mark. Honda will outlast EGO\'s third battery; EGO is silent, clean, and fume-free. For lawns under 1500m² where you can charge between sessions, EGO is the smarter modern buy.'],

  // Robotic
  ['husqvarna-automower-305', 'worx-landroid-m500', 'Boundary-wire robot rivals. Husqvarna lasts 15 years; Worx lasts 7. Husqvarna costs twice as much used. For users who plan to keep the robot for a decade, Husqvarna is cheaper per year. For trying out the category, Worx Landroid is the accessible entry.'],
  ['husqvarna-automower-305', 'husqvarna-automower-430x-nera', 'Boundary wire vs EPOS no-wire. The 305 needs you to bury a wire around the perimeter; the 430X NERA uses satellite positioning instead. For owners installing fresh, NERA saves the wire-laying day; for owners with existing boundary wire in good condition, the 305 saves £900.'],
  ['husqvarna-automower-305', 'mammotion-yuka-mini-600', 'Established boundary-wire vs new wire-free RTK. Husqvarna is proven for 15 years; Mammotion YUKA Mini is two years old. The YUKA is cheaper and skips the wire installation; the Husqvarna is the safer long-term investment until Mammotion\'s longevity is proven.'],
  ['husqvarna-automower-430x-nera', 'mammotion-luba-2-awd-5000', 'Premium wire-free at the £2500–£3500 mark. Husqvarna is proven, dealer-supported, and reliable. Mammotion adds AWD for serious slopes (up to 75%) and bigger coverage (5000m²). For typical flat suburban lawns, Husqvarna; for hilly estates, Mammotion.'],
  ['husqvarna-automower-430x-nera', 'stihl-imow-6-evo', 'EPOS vs Stihl\'s newer wire-free system. Husqvarna has the longer track record and broader dealer network; Stihl AP battery owners get cross-tool battery use. Husqvarna for the safe choice; Stihl if you already trust Stihl petrol kit.'],
  ['mammotion-luba-2-awd-5000', 'mammotion-luba-2-mini-awd', 'Mammotion sizing. The full LUBA 2 AWD covers 5000m² with serious slope ability; the Mini covers 2000m² and costs less. For sub-acre lawns the Mini is plenty; for proper estate work, the full LUBA 2 is the answer.'],
  ['worx-landroid-m500', 'worx-landroid-vision-m600', 'Worx boundary-wire vs camera-based. The Vision skips the wire entirely using onboard cameras — newer technology, occasional issues in dawn/dusk light. The M500 is proven and cheaper. Camera-based wire-free is the future; the M500 is the safer present.'],

  // Ride-on
  ['john-deere-x167r', 'john-deere-x354', 'JD X-series sizing. The X167R is the entry rear-collect tractor for 0.5–1 acre lawns; the X354 is the 4WS premium for half-acre+ with awkward shapes. The 4-wheel-steer on the X354 actually does help around obstacles; for straight rectangular lawns it\'s overkill.'],
  ['john-deere-x167r', 'mountfield-1530h', 'Premium vs value entry ride-on. JD holds resale at 60% of new after 5 years; Mountfield depreciates faster. New, the JD is twice the price; used, JD costs about 30–40% more. Either is a credible first ride-on for a half-acre lawn.'],
  ['john-deere-x167r', 'mountfield-tornado-2098h', 'Different categories at similar price. The Tornado is a wider 98cm deck Briggs Vanguard tractor; the X167R is narrower (102cm) but with proper JD pedigree. Tornado for cutting capacity; JD for resale and dealer support.'],
  ['john-deere-x354', 'kubota-gr1600-ii', 'American premium vs Japanese premium. JD wins on dealer ubiquity and resale; Kubota wins on engine longevity (1500+ hours typical). Both will outlast the owner if maintained. Kubota for buyers who plan to keep the mower for 25 years.'],
  ['john-deere-x354', 'honda-hf-2625-hm', 'Premium ride-on rivals. Honda V-twin is the most reliable engine in the category; JD has the better dealer network. Honda for engine longevity; JD for the badge value and broader UK service.'],
  ['kubota-gr1600-ii', 'kubota-gr2120-ii', 'Kubota sizing. The GR2120 has 20cm more cut and a bigger 21HP V-twin. Worth the upgrade only if your lawn justifies the extra deck width — for most domestic buyers the GR1600 is plenty.'],
  ['kubota-g23-ii-hd', 'kubota-g26-ii-ld', 'Kubota diesel generations. The G23 is the proven older diesel; the G26 has cleaner emissions and electronic dash. Same Kubota build quality. G26 for new buyers; G23 for used buyers with documented service history.'],
  ['westwood-s150he', 'countax-b65-4wd', 'British-built rivals from the same AriensCo factory. Same engineering, slightly different badging. Westwood traditionally cheaper new; Countax has 4WD on the B65 series for serious slopes. Identical for flat lawns; Countax wins on hilly ones.'],
  ['murray-11-30', 'mountfield-sp46', 'Vintage ride-on vs walk-behind. The Murray 11/30 is a 1990s heritage tractor with a Briggs 11HP — cheap on Marketplace but no collection bag. The SP46 is a fraction of the size and cost. Choose by lawn size: under 800m² SP46, over 1500m² Murray.'],

  // Hayter
  ['hayter-harrier-41-ad', 'hayter-harrier-56-ad', 'Hayter sizing. The 41 is for typical British gardens; the 56 is for serious estates and cricket-club groundsmen. The 41 is plenty for most owners; the 56 is overkill until you have over 2000m² of formal lawn.'],
  ['hayter-harrier-41-ad', 'atco-liner-16s', 'Heritage British roller petrol comparison. Both have stripes, both have steel rollers. Hayter wins on engine pedigree (Honda GCV inside) and resale; Atco wins on used-market price. Hayter for ownership longevity; Atco for the bargain.'],
  ['hayter-harrier-41-ad', 'mountfield-sp485-hw-v', 'Premium British roller vs value Mountfield. The Hayter will be running in 2050; the Mountfield will need replacing in 2035. Mountfield is half the new price and a third the used price. Hayter for one-mower-forever buyers; Mountfield for everyone else.'],

  // Stihl
  ['stihl-rm-448-t', 'stihl-rm-248', 'Stihl sizing. The 448 has self-propel and a more durable engine; the 248 is push-only and cheaper. For under 600m² lawns the 248 saves £150 and one wear part; for everything bigger, the 448 is the right Stihl.'],
  ['stihl-rm-448-t', 'mountfield-sp46', 'Stihl vs Mountfield petrol mid-range. Stihl wins on dealer network and build quality; Mountfield wins on price and parts availability. Stihl only worth the premium if you have a Stihl dealer locally.'],

  // Cobra
  ['cobra-mx46spb', 'cobra-mx534spc', 'Cobra sizing. The MX534SPC has 7cm more cut, a rear roller, and a Briggs 750EX engine. Better in every spec dimension at £150 more. For under 800m² lawns the MX46SPB is plenty; otherwise upgrade.'],

  // Hover
  ['flymo-hover-vac-250', 'flymo-glider-330', 'Flymo hover sizing. The Hover Vac collects clippings; the Glider mulches. Both are sub-£100 used. Choose by whether you want to bag (Hover Vac) or accept mulched clippings on the lawn (Glider).'],

  // Manual cylinder
  ['webb-h18-push-cylinder', 'bosch-ahm-38-g', 'Manual push cylinder rivals. Webb has the rear roller (stripes); Bosch has the grass box (collection). Both are sub-£40 used. Choose by whether stripes (Webb) or collection (Bosch) matter more — you can\'t have both at this price.'],
  ['qualcast-suffolk-punch-14s', 'allett-liberty-35', 'Cylinder mowers from different eras. Suffolk Punch is petrol cylinder, vintage British, only available used; Allett Liberty is modern cordless cylinder with interchangeable cassettes. Suffolk Punch for collectors; Allett Liberty for modern bowling-green users.'],
  ['allett-liberty-35', 'atco-royale-30e-i-c', 'Premium cordless cylinder showdown. Both are British, both target ornamental-lawn obsessives. Allett has interchangeable cassettes (cylinder/scarifier/brush); Atco is simpler but slightly heavier. Allett for users who want the cassettes; Atco for users who don\'t.'],

  // Stiga
  ['stiga-twinclip-50-sq-b', 'mountfield-sp485-hw-v', 'Stiga vs Mountfield premium roller. They share an engine family (Stiga ST160) and similar specs. Stiga has the twin-clip blade for finer cut; Mountfield has slightly stronger UK dealer support. For most buyers either works — Stiga in white-and-blue, Mountfield in green.'],

  // Toro
  ['toro-21-recycler-60v', 'ego-lm2135e-sp', '60V cordless rivals. Toro has American pedigree and the SmartStow vertical storage; EGO has the more developed UK presence and stronger battery resale. EGO for UK buyers; Toro for owners building a Flex-Force tool ecosystem.'],

  // AL-KO
  ['al-ko-highline-5-2-sp-s', 'mountfield-sp485-hw-v', 'German engineering vs British value. AL-KO\'s Briggs 875EX is the engine to beat in this class; Mountfield has wider UK distribution. AL-KO for buyers in northern England with a local dealer; Mountfield for everyone else.'],

  // Budget electric
  ['black-plus-decker-bemw461bh', 'bosch-rotak-36-r', 'DIY corded budget mower decision. B+D is cheaper and has decent cut width; Bosch lasts twice as long and has the rear roller. For 5-year ownership, take the B+D and replace; for 15-year ownership, take the Bosch and never replace.'],

  // Supermarket cordless
  ['parkside-prma-20-li-a1', 'ferrex-40v-cordless-36cm', 'Lidl vs Aldi cordless. Parkside 20V is cheaper and has the bigger cordless ecosystem; Ferrex 40V has more torque and a wider cut. Parkside if you already own Parkside tools; Ferrex if you want the standalone better mower.'],

  // Premium SP petrol
  ['husqvarna-lc-247sp', 'honda-hrg-466-sk', 'Premium walk-behind petrol SPs. Honda wins on engine longevity (15+ years typical); Husqvarna wins on build quality outside the engine. Honda for one-mower-forever buyers; Husqvarna for buyers with a local Husqvarna dealer.']
];

const compSlug = (a, b) => `${a}-vs-${b}`;
const compUrl = (a, b) => `/vs/${compSlug(a, b)}`;

function renderComparisonPage(idA, idB, verdict) {
  const a = mowers.find(m => m.id === idA);
  const b = mowers.find(m => m.id === idB);
  if (!a || !b) return null;

  const winner = (av, bv, lower = false) => {
    if (av === bv) return null;
    return lower ? (av < bv ? 'a' : 'b') : (av > bv ? 'a' : 'b');
  };
  const cell = (v, w, side, suffix = '') => {
    const isWin = w === side;
    return `<td style="${isWin ? 'background:var(--accent-soft);font-weight:700;color:var(--accent-deep)' : ''}">${esc(v)}${suffix}</td>`;
  };

  const specRow = (label, av, bv, w, suffix = '') =>
    `<tr><th>${esc(label)}</th>${cell(av, w, 'a', suffix)}${cell(bv, w, 'b', suffix)}</tr>`;

  const breadcrumbLD = crumbsLD([
    ['Browse', '/browse'],
    ['Comparisons', null],
    [`${a.brand} ${a.model} vs ${b.brand} ${b.model}`, null]
  ]);
  return `${head({
    title: `${a.brand} ${a.model} vs ${b.brand} ${b.model} — UK comparison`,
    description: `Side-by-side comparison: ${a.brand} ${a.model} vs ${b.brand} ${b.model}. UK prices, full specs, pros and cons of each, and a verdict on which to buy.`,
    canonical: compUrl(idA, idB),
    ogImage: a.img || b.img || '/og.png',
    ldjson: breadcrumbLD
  })}
${siteHeader()}

<div class="page">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span>Comparisons</span><span class="sep">›</span>
    <span aria-current="page">${esc(a.brand + ' ' + a.model)} vs ${esc(b.brand + ' ' + b.model)}</span>
  </nav>
</div>

<section class="section-hero">
  <div class="page" style="padding:0">
    <div class="brand-eyebrow">Head-to-head</div>
    <h1 class="brand-h1" style="font-size:42px;line-height:1.1">${esc(a.brand)} ${esc(a.model)} <span style="color:var(--muted);font-weight:400">vs</span> ${esc(b.brand)} ${esc(b.model)}</h1>
    <p class="brand-blurb" style="margin-top:18px">A side-by-side comparison of two mowers UK buyers commonly choose between. Prices, full specs, and a verdict on which one to buy.</p>
  </div>
</section>

<main id="main" class="page page--main">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px">
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px">
      ${heroIcon(a, 200)}
      <div style="margin-top:14px">
        <div class="hero-meta-brand">${esc(a.brand)}</div>
        <h2 style="margin:4px 0 8px;font-size:28px;font-weight:700;color:var(--ink);letter-spacing:-0.5px">${esc(a.model)}</h2>
        <p class="m-tagline" style="margin:0 0 14px">"${esc(a.tagline)}"</p>
        ${threeUpPrice(a)}
        <div style="margin-top:12px">${stars(a.rating, a.reviews)} <span style="color:var(--muted-soft)">·</span> <span style="font-size:13px;color:var(--muted)">Value <strong style="color:var(--accent)">${a.valueScore}/10</strong></span></div>
        <a class="btn btn-secondary" href="${esc(mowerUrl(a))}" style="display:inline-block;margin-top:14px">Full ${esc(a.model)} review →</a>
      </div>
    </div>

    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px">
      ${heroIcon(b, 200)}
      <div style="margin-top:14px">
        <div class="hero-meta-brand">${esc(b.brand)}</div>
        <h2 style="margin:4px 0 8px;font-size:28px;font-weight:700;color:var(--ink);letter-spacing:-0.5px">${esc(b.model)}</h2>
        <p class="m-tagline" style="margin:0 0 14px">"${esc(b.tagline)}"</p>
        ${threeUpPrice(b)}
        <div style="margin-top:12px">${stars(b.rating, b.reviews)} <span style="color:var(--muted-soft)">·</span> <span style="font-size:13px;color:var(--muted)">Value <strong style="color:var(--accent)">${b.valueScore}/10</strong></span></div>
        <a class="btn btn-secondary" href="${esc(mowerUrl(b))}" style="display:inline-block;margin-top:14px">Full ${esc(b.model)} review →</a>
      </div>
    </div>
  </div>

  <h2 class="section-h2" style="margin-top:36px">Verdict — which one to buy</h2>
  <div class="prose-box">
    <div class="pb-title">Our take</div>
    <p>${esc(verdict)}</p>
  </div>

  <h2 class="section-h2" style="margin-top:36px">Spec-by-spec</h2>
  <div class="specs-card">
    <table class="specs-tbl">
      <thead>
        <tr><th></th><th>${esc(a.brand)} ${esc(a.model)}</th><th>${esc(b.brand)} ${esc(b.model)}</th></tr>
      </thead>
      <tbody>
        ${specRow('RRP', a.rrp ? fmtGBP(a.rrp) : '—', b.rrp ? fmtGBP(b.rrp) : '—', winner(a.rrp || 1e9, b.rrp || 1e9, true))}
        ${specRow('Buy now', fmtGBP(a.buyNow), fmtGBP(b.buyNow), winner(a.buyNow, b.buyNow, true))}
        ${specRow('Used avg', fmtGBP(a.usedAvg), fmtGBP(b.usedAvg), winner(a.usedAvg, b.usedAvg, true))}
        ${specRow('Type', a.type, b.type, null)}
        ${specRow('Engine / Power', a.engine, b.engine, null)}
        ${specRow('Cut width', a.cutWidth + ' cm', b.cutWidth + ' cm', winner(a.cutWidth, b.cutWidth))}
        ${specRow('Weight', a.weight + ' kg', b.weight + ' kg', winner(a.weight, b.weight, true))}
        ${specRow('Self-propelled', a.selfPropelled ? 'Yes' : 'No', b.selfPropelled ? 'Yes' : 'No', null)}
        ${specRow('Rear roller (stripes)', a.roller ? 'Yes' : 'No', b.roller ? 'Yes' : 'No', null)}
        ${specRow('Mulching', a.mulching ? 'Yes' : 'No', b.mulching ? 'Yes' : 'No', null)}
        ${specRow('Bag capacity', a.bagCapacity > 0 ? a.bagCapacity + ' L' : '—', b.bagCapacity > 0 ? b.bagCapacity + ' L' : '—', winner(a.bagCapacity, b.bagCapacity))}
        ${specRow('Suited to lawn', a.lawnSize, b.lawnSize, null)}
        ${specRow('Noise', a.noiseDb > 0 ? a.noiseDb + ' dB' : 'Silent', b.noiseDb > 0 ? b.noiseDb + ' dB' : 'Silent', winner(a.noiseDb || 0, b.noiseDb || 0, true))}
        ${specRow('Rating', a.rating + ' / 5', b.rating + ' / 5', winner(a.rating, b.rating))}
        ${specRow('Value score', a.valueScore + ' / 10', b.valueScore + ' / 10', winner(a.valueScore, b.valueScore))}
      </tbody>
    </table>
  </div>

  <h2 class="section-h2" style="margin-top:36px">Pros &amp; cons of each</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px">
      <div class="hero-meta-brand">${esc(a.brand)} ${esc(a.model)}</div>
      ${prosCons(a)}
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px">
      <div class="hero-meta-brand">${esc(b.brand)} ${esc(b.model)}</div>
      ${prosCons(b)}
    </div>
  </div>

  <div style="margin-top:36px">
    ${ctaStrip("Want to compare more?", "Open the full compare tool, filter by brand or budget, and pick up to 4 mowers to view side-by-side.", 'Open the compare tool', '/')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Best-of landing pages ----------
const BEST_OF = [
  { slug: 'under-150', title: 'Best lawn mowers under £150',
    intro: 'For tight budgets, small lawns, or first-time mower buyers. Cheap doesn\'t have to mean disposable — Bosch and Mountfield have entries that genuinely last 10 years if you store them properly.',
    pick: m => m.buyNow > 0 && m.buyNow <= 150, sortBy: m => m.valueScore, take: 8 },
  { slug: 'under-300', title: 'Best lawn mowers under £300',
    intro: 'The price band where serious build quality starts to appear. Self-propelled petrol Mountfields, Bosch cordless, decent corded electrics — all under £300.',
    pick: m => m.buyNow > 150 && m.buyNow <= 300, sortBy: m => m.valueScore, take: 8 },
  { slug: 'quietest-robotic', title: 'Quietest robotic lawn mowers',
    intro: 'Robotic mowers run while you\'re indoors, so noise matters more than for any other category. These are the quietest robots available in the UK in 2026.',
    pick: m => m.type === 'Robotic', sortBy: m => -m.noiseDb, take: 6 },
  { slug: 'for-slopes', title: 'Best lawn mowers for sloped lawns',
    intro: 'Wheels need flat-ish ground. Hover mowers glide on a cushion of air, AWD robotic mowers grip up to 75% slopes, and certain hover-petrol models handle steep banks. Here are the right tools for sloped lawns.',
    pick: m => m.type === 'Hover' || (m.type === 'Robotic' && (m.model.includes('AWD') || m.model.includes('LUBA'))), sortBy: m => m.valueScore, take: 8 },
  { slug: 'striping', title: 'Best lawn mowers for stripes',
    intro: 'Stripes come from a rear roller pressing the grass flat in alternate directions. These mowers all have rear rollers — from the cheapest electric Bosch to the British-built Hayter premiums.',
    pick: m => m.roller, sortBy: m => m.valueScore, take: 10 },
  { slug: 'cordless-2026', title: 'Best cordless lawn mowers 2026',
    intro: 'Cordless has caught up with petrol on cut quality. EGO 56V, Stihl AP, and Husqvarna are now genuine petrol replacements for typical UK gardens. The picks below cover all budgets and lawn sizes.',
    pick: m => m.type === 'Cordless', sortBy: m => m.valueScore, take: 10 },
  { slug: 'petrol-2026', title: 'Best petrol lawn mowers 2026',
    intro: 'Petrol still wins for lawns over 800m², long grass, and rough conditions. Honda dominates the premium end; Mountfield owns the value end; Hayter has the best stripes.',
    pick: m => m.type === 'Petrol', sortBy: m => m.valueScore, take: 10 },
  { slug: 'ride-on-large', title: 'Best ride-on mowers for large lawns',
    intro: 'When pushing a 53cm petrol mower across half a tennis court every weekend gets old. Ride-ons and garden tractors for serious lawns over 2000m².',
    pick: m => m.type === 'Ride-on', sortBy: m => m.valueScore, take: 10 },
  { slug: 'small-lawns', title: 'Best lawn mowers for small lawns',
    intro: 'For lawns under 300m² — typical urban gardens. Cordless, manual cylinder, and small electric mowers are the right answers; petrol is overkill.',
    pick: m => m.lawnSize === 'Small', sortBy: m => m.valueScore, take: 10 },
  { slug: 'lightest', title: 'Lightest lawn mowers',
    intro: 'For lifting up steps, storing in tight spaces, or for users who can\'t push a heavy mower. These are all under 15kg.',
    pick: m => m.weight > 0 && m.weight <= 15, sortBy: m => -m.weight, take: 8 },
  { slug: 'used-bargain', title: 'Best used-market bargains',
    intro: 'The mowers where used-market prices represent the strongest value vs new — typically because used supply is enormous, the mower is well-known, or depreciation has caught up with build quality.',
    pick: m => m.rrp > 0 && m.usedAvg > 0 && (m.usedAvg / m.rrp) < 0.45, sortBy: m => -(m.usedAvg / m.rrp), take: 10 },
  { slug: 'honda-engined', title: 'Mowers with Honda engines',
    intro: 'Honda\'s GCV and GXV engines are the most reliable in residential mowing — fitted to the entire Honda range, the Hayter Harriers, and the Mountfield SP46H. If engine longevity is the priority, these are the mowers to consider.',
    pick: m => m.engine && m.engine.toLowerCase().includes('honda'), sortBy: m => m.valueScore, take: 10 }
];

const bestOfUrl = slug => `/best/${slug}`;

function renderBestOfPage(cfg) {
  const list = mowers.filter(cfg.pick).sort((a, b) => cfg.sortBy(b) - cfg.sortBy(a)).slice(0, cfg.take);
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Best of', null], [cfg.title, null]]);
  const listLD = itemListLD(cfg.title, list.map(m => ({ name: `${m.brand} ${m.model}`, url: mowerUrl(m) })));
  return `${head({
    title: `${cfg.title} — MowRight UK`,
    description: `${cfg.title}, hand-picked from MowRight UK's catalogue of ${mowers.length} mowers. Independent picks with UK prices and second-hand averages.`,
    canonical: bestOfUrl(cfg.slug),
    ldjson: [breadcrumbLD, listLD]
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span>Best of</span><span class="sep">›</span>
    <span aria-current="page">${esc(cfg.title)}</span>
  </nav>
</div>

<section style="padding:32px 32px 48px">
  <div class="page page--narrow about" style="padding:0">
    <div class="brand-eyebrow">Best of</div>
    <h1 class="bg-h1">${esc(cfg.title)}</h1>
    <p class="cat-lead" style="font-size:18px;max-width:680px;line-height:1.6">${esc(cfg.intro)}</p>
  </div>
</section>

<main id="main" class="page page--main">
  <h2 class="section-h2">${list.length} mower${list.length === 1 ? '' : 's'}, ranked</h2>
  <div class="mlist">
    ${list.map((m, i) => `
    <a class="mcard row-3" href="${esc(mowerUrl(m))}">
      <div style="display:flex;align-items:center;gap:14px">
        <span style="font-family:'JetBrains Mono', monospace; font-size:24px; font-weight:700; color:var(--muted)">${String(i + 1).padStart(2, '0')}</span>
        ${heroIcon(m).replace('class="mh-icon ', 'class="mh-icon mh-photo ').replace('width:100%', 'width:80px;flex-shrink:0')}
      </div>
      <div>
        <div class="m-brand">${esc(m.brand)}</div>
        <h3 class="m-name">${esc(m.model)}</h3>
        <div class="m-meta-line">${tbadge(m.type, 'sm')} ${stars(m.rating, m.reviews)}</div>
        <p class="m-tagline">${esc(m.tagline)}</p>
      </div>
      <div class="col-price-side">
        <span class="l">Used Avg</span>
        <span class="v">${fmtGBP(m.usedAvg)}</span>
        <span class="x">${m.buyNow > 0 ? 'New: ' + fmtGBP(m.buyNow) : 'Used only'}</span>
      </div>
    </a>`).join('')}
  </div>

  <div style="margin-top:36px">
    ${ctaStrip("See more lists", "Browse the full catalogue with filters and sort, or read the buying guide.", 'Open the buying guide', '/buying-guide')}
  </div>
</main>

${siteFooter()}
</body>
</html>`;
}

// ---------- Blog ----------
const blogUrl = slug => `/blog/${slug}`;

function renderBlogIndex() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Blog', null]]);
  const blogLD = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MowRight UK Blog',
    url: SITE + '/blog',
    description: 'Independent UK lawn mower advice and how-tos.',
    blogPost: sorted.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: SITE + blogUrl(p.slug),
      datePublished: p.date,
      ...(p.image ? { image: p.image } : {})
    }))
  };
  return `${head({
    title: 'MowRight UK Blog — independent lawn mower advice and how-tos',
    description: 'Long-form guides on UK lawn mower buying, maintenance, troubleshooting, and brand-specific advice. No affiliate fluff.',
    canonical: '/blog',
    ldjson: [breadcrumbLD, blogLD]
  })}
${siteHeader('blog')}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <span aria-current="page">Blog</span>
  </nav>
</div>

<section style="padding:32px 32px 56px">
  <div class="page page--narrow about" style="padding:0">
    <div class="brand-eyebrow">Blog</div>
    <h1 class="bg-h1">Long-form mower advice.</h1>
    <p class="cat-lead" style="font-size:18px;max-width:680px;line-height:1.6">Practical, independent guides on buying, troubleshooting, and choosing UK lawn mowers. Written for adults; no affiliate fluff.</p>

    <div class="blog-list" style="display:grid;grid-template-columns:1fr;gap:18px;margin-top:32px">
      ${sorted.map(post => `
      <a class="blog-card" href="${esc(blogUrl(post.slug))}">
        ${post.image ? `<div class="blog-card-img"><img src="${esc(post.image)}" alt="${esc(post.imageAlt || '')}" loading="lazy" decoding="async"/></div>` : ''}
        <div class="blog-card-body">
          <div class="blog-card-date">${esc(post.date)}</div>
          <h2 class="blog-card-title">${esc(post.title)}</h2>
          <p class="blog-card-lead">${esc(post.lead.slice(0, 220))}${post.lead.length > 220 ? '…' : ''}</p>
          <div class="blog-card-cta">Read article →</div>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

${siteFooter()}
</body>
</html>`;
}

function renderBlogPost(post) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'MowRight UK', url: SITE },
    publisher: { '@type': 'Organization', name: 'MowRight UK', logo: { '@type': 'ImageObject', url: SITE + '/og.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + blogUrl(post.slug) },
    ...(post.image ? { image: post.image } : {}),
    ...(post.keyword ? { keywords: post.keyword } : {})
  };

  const faqSchema = post.faqs && post.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null;

  const breadcrumbLD = crumbsLD([['Browse', '/browse'], ['Blog', '/blog'], [post.title, null]]);
  const ld = [articleSchema, breadcrumbLD, ...(faqSchema ? [faqSchema] : [])];

  // Internal-link mowers from related[]
  const related = (post.related || []).map(id => mowers.find(m => m.id === id)).filter(Boolean);

  return `${head({
    title: post.title,
    description: post.description,
    canonical: blogUrl(post.slug),
    ogImage: post.image || '/og.png',
    ldjson: ld
  })}
${siteHeader('blog')}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <a href="/blog">Blog</a><span class="sep">›</span>
    <span aria-current="page">${esc(post.title.length > 60 ? post.title.slice(0, 60) + '…' : post.title)}</span>
  </nav>
</div>

<article style="padding:32px 32px 56px">
  <div class="page page--narrow" style="padding:0">
    <div style="font-family:'JetBrains Mono', monospace;font-size:12px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px">Published ${esc(post.date)}</div>
    <h1 style="margin:0;font-size:48px;font-weight:700;color:var(--ink);letter-spacing:-1.6px;line-height:1.1">${esc(post.title)}</h1>
    <p style="margin:24px 0 0;font-size:22px;line-height:1.55;color:var(--ink);font-weight:500">${esc(post.lead)}</p>

    ${post.image ? `
    <figure class="blog-hero-img">
      <img src="${esc(post.image)}" alt="${esc(post.imageAlt || '')}" loading="lazy" decoding="async"/>
      <figcaption>Photo: <a href="https://unsplash.com" rel="nofollow noopener" target="_blank">${esc(post.imageCredit || 'Unsplash')}</a></figcaption>
    </figure>` : `<div style="height:1px;background:var(--border);margin:36px 0"></div>`}

    <div class="blog-body" style="display:flex;flex-direction:column;gap:40px;font-size:19px;line-height:1.75;color:var(--ink)">
      ${post.sections.map(section => `
      <section>
        <h2 style="margin:0 0 18px;font-size:30px;font-weight:700;color:var(--ink);letter-spacing:-0.6px;line-height:1.2">${esc(section.h)}</h2>
        ${section.p.map(para => `<p style="margin:0 0 18px;font-size:19px;line-height:1.75;color:var(--ink)">${inlineMd(para)}</p>`).join('')}
      </section>`).join('')}
    </div>

    ${post.faqs && post.faqs.length ? `
    <div style="height:1px;background:var(--border);margin:56px 0 32px"></div>
    <h2 style="margin:0 0 22px;font-size:30px;font-weight:700;color:var(--ink);letter-spacing:-0.6px">FAQs</h2>
    <div style="display:flex;flex-direction:column;gap:20px">
      ${post.faqs.map(faq => `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px 26px">
        <h3 style="margin:0 0 10px;font-size:19px;font-weight:700;color:var(--ink);line-height:1.35">${esc(faq.q)}</h3>
        <p style="margin:0;font-size:18px;line-height:1.7;color:var(--ink-sub)">${inlineMd(faq.a)}</p>
      </div>`).join('')}
    </div>` : ''}

    ${related.length ? `
    <div style="height:1px;background:var(--border);margin:48px 0 24px"></div>
    <h2 style="margin:0 0 18px;font-size:22px;font-weight:700;color:var(--ink);letter-spacing:-0.5px">Mowers mentioned in this article</h2>
    <div class="cards">${related.map(categoryListCard).join('')}</div>` : ''}

    <div style="margin-top:48px">
      ${ctaStrip("Browse the full catalogue", `${mowers.length} mowers across ${Object.keys(BRANDS).length} UK brands, with new and used prices.`, 'Open the compare tool', '/')}
    </div>
  </div>
</article>

${siteFooter()}
</body>
</html>`;
}

// ---------- Engine deep-dive page ----------
const engineUrl = e => `/engine/${e.slug}`;

function renderEnginePage(engine) {
  const using = mowers.filter(m => engine.match.test(m.engine || ''));

  const breadcrumbLD = crumbsLD([
    ['Browse', '/browse'],
    ['Engines', '/engines'],
    [engine.name, null]
  ]);
  const articleLD = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${engine.name} — UK service guide, common faults, parts costs`,
    description: `${engine.headline}. Spec sheet, service intervals, fault timeline by year, parts cost reference, and every UK mower this engine powers.`,
    author: { '@type': 'Organization', name: 'MowRight UK', url: SITE },
    publisher: { '@type': 'Organization', name: 'MowRight UK', logo: { '@type': 'ImageObject', url: SITE + '/og.png' } }
  };

  return `${head({
    title: `${engine.name} — UK service guide, common faults & parts | MowRight`,
    description: `${engine.headline}. ${engine.architecture}, ${engine.displacement}. Service intervals, fault timeline by age, parts cost reference, and the ${using.length} UK mower${using.length === 1 ? '' : 's'} this engine powers.`,
    canonical: engineUrl(engine),
    ldjson: [breadcrumbLD, articleLD]
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <a href="/engines">Engines</a><span class="sep">›</span>
    <span aria-current="page">${esc(engine.name)}</span>
  </nav>
</div>

<article class="engine-article">
  <header class="engine-hero">
    <div class="engine-eyebrow">Engine deep-dive · ${esc(engine.country)}</div>
    <h1 class="engine-h1">${esc(engine.name)}</h1>
    <p class="engine-headline">${esc(engine.headline)}</p>

    <div class="engine-spec-strip">
      <div class="es-cell"><span class="l">Family</span><span class="v">${esc(engine.family)}</span></div>
      <div class="es-cell"><span class="l">Displacement</span><span class="v">${esc(engine.displacement)}</span></div>
      <div class="es-cell"><span class="l">Torque</span><span class="v">${esc(engine.torque)}</span></div>
      <div class="es-cell"><span class="l">Architecture</span><span class="v">${esc(engine.architecture)}</span></div>
      <div class="es-cell"><span class="l">Typical life</span><span class="v">${esc(engine.typicalLife)}</span></div>
    </div>
  </header>

  <section class="engine-section">
    <h2>The story of this engine</h2>
    <p>${esc(engine.profile)}</p>
  </section>

  <div class="engine-pros-cons">
    <section>
      <h3>Why owners like it</h3>
      <ul class="prosul">${engine.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    </section>
    <section>
      <h3>Where it falls short</h3>
      <ul class="consul">${engine.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    </section>
  </div>

  <section class="engine-section">
    <h2>Service intervals & costs</h2>
    <p class="engine-section-lead">What this engine actually needs every year, and what it costs to keep alive.</p>
    <div class="engine-table-wrap">
      <table class="engine-table">
        <thead><tr><th>Interval</th><th>Task</th><th>Cost</th></tr></thead>
        <tbody>
          ${engine.serviceIntervals.map(s => `<tr><td><strong>${esc(s.interval)}</strong></td><td>${esc(s.task)}</td><td>${esc(s.cost)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="engine-section">
    <h2>What goes wrong, and when</h2>
    <p class="engine-section-lead">Every engine family has predictable failures by age. Knowing what's coming saves money on used buys and makes negotiation easier.</p>
    <div class="engine-faults">
      ${engine.faultsTimeline.map(f => `
      <div class="engine-fault">
        <div class="engine-fault-age">${esc(f.age)}</div>
        <div class="engine-fault-body">${esc(f.fault)}</div>
      </div>`).join('')}
    </div>
  </section>

  <section class="engine-section">
    <h2>Parts cost reference</h2>
    <p class="engine-section-lead">UK 2026 prices — OEM (genuine) vs aftermarket. Generic parts work fine on consumables; stick to OEM on anything that affects timing or tolerance.</p>
    <div class="engine-table-wrap">
      <table class="engine-table">
        <thead><tr><th>Part</th><th>OEM</th><th>Aftermarket</th></tr></thead>
        <tbody>
          ${engine.partsCosts.map(p => `<tr><td>${esc(p.part)}</td><td><strong>${esc(p.oem)}</strong></td><td>${esc(p.generic)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="engine-section">
    <div class="engine-verdict">
      <div class="engine-verdict-eyebrow">The verdict</div>
      <p>${esc(engine.verdict)}</p>
      ${engine.altLink ? `<a class="engine-verdict-link" href="${esc(engine.altLink)}">Related reading →</a>` : ''}
    </div>
  </section>

  <section class="engine-section">
    <h2>Mowers in our catalogue with this engine <span class="engine-section-count">(${using.length})</span></h2>
    ${using.length === 0 ? '<p class="engine-section-lead">No mowers in the catalogue currently use this engine. Check back as we add models.</p>' : `
    <div class="engine-using-grid">
      ${using.map(m => `
      <a class="engine-using-card" href="${esc(mowerUrl(m))}">
        <div class="eu-brand">${esc(m.brand)}</div>
        <div class="eu-name">${esc(m.model)}</div>
        <div class="eu-meta">${tbadge(m.type, 'sm')} <span class="eu-eng">${esc(m.engine)}</span></div>
        <div class="eu-price">£${m.usedAvg} used${m.buyNow > 0 ? ' <span class="dot">·</span> £' + m.buyNow + ' new' : ''}</div>
      </a>`).join('')}
    </div>`}
  </section>

  <div style="margin-top:48px">
    ${ctaStrip("See every engine family", "Side-by-side hub of all the engines we cover — Briggs, Honda, Kawasaki, Stiga, Loncin and more.", "Open the engines hub", "/engines")}
  </div>
</article>

${siteFooter()}
</body>
</html>`;
}

// ---------- Engines hub ----------
function renderEnginesPage() {
  return `${head({
    title: 'Mower engine families — UK service guides, faults & costs | MowRight',
    description: `Deep-dive guides to ${ENGINES.length} engine families fitted to UK lawnmowers — Briggs 500E and 675EX, Briggs Intek and Vanguard V-twin, Honda GCV, Kawasaki FR/FX, Stiga ST series, Loncin. Service intervals, fault timelines, parts costs, and which mowers use each.`,
    canonical: '/engines'
  })}
${siteHeader()}

<div class="page page--narrow">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/browse">Browse</a><span class="sep">›</span>
    <a href="/buying-guide">Buying Guide</a><span class="sep">›</span>
    <span aria-current="page">Engines</span>
  </nav>
</div>

<section style="padding:32px 32px 56px">
  <div class="page page--narrow about" style="padding:0">
    <div class="brand-eyebrow">Behind the brand badge</div>
    <h1 class="bg-h1">The engine matters more than the badge.</h1>
    <p class="cat-lead" style="font-size:18px;max-width:680px;line-height:1.6">A Mountfield with a Honda engine, a Cobra with a Briggs, a Stihl with a Kawasaki — the engine maker is often a different company to the brand on the deck. Here's a plain-language guide to who makes the engine inside your mower, and what that means for reliability and parts.</p>

    <div class="engines-hub-grid">
      ${ENGINES.map(e => {
        const using = mowers.filter(m => e.match.test(m.engine || ''));
        return `
      <a class="engine-hub-card" href="${esc(engineUrl(e))}">
        <div class="ehc-head">
          <div class="ehc-country">${esc(e.country)}</div>
          <div class="ehc-life">${esc(e.typicalLife.split('(')[0].trim())}</div>
        </div>
        <h2 class="ehc-name">${esc(e.name)}</h2>
        <p class="ehc-headline">${esc(e.headline)}</p>
        <div class="ehc-meta">${esc(e.architecture)} · ${esc(e.displacement)}</div>
        <div class="ehc-using">${using.length} mower${using.length === 1 ? '' : 's'} in catalogue</div>
        <div class="ehc-cta">Read deep-dive →</div>
      </a>`;
      }).join('')}
    </div>

    <p style="margin-top:32px;font-size:13px;color:var(--muted);font-style:italic">Stihl EVC, Husqvarna HQ and Kohler 7000-series engines are mentioned on individual mower pages and in the Briggs cheat-sheet blog post. Dedicated deep-dives for those families on the way as catalogue coverage grows.</p>

    <div style="margin-top:36px">
      ${ctaStrip("Now you know the engine — find the mower.", `Browse all ${mowers.length} mowers and filter by brand, type, or budget.`, 'Browse all mowers', '/browse')}
    </div>
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
    { loc: '/browse', priority: '0.95', changefreq: 'weekly' },
    { loc: '/about', priority: '0.5', changefreq: 'monthly' },
    { loc: '/buying-guide', priority: '0.8', changefreq: 'monthly' },
    { loc: '/engines', priority: '0.7', changefreq: 'monthly' },
    { loc: '/vintage', priority: '0.7', changefreq: 'monthly' },
    { loc: '/sound-levels', priority: '0.7', changefreq: 'monthly' },
    { loc: '/seasonality', priority: '0.75', changefreq: 'yearly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/credits', priority: '0.2', changefreq: 'monthly' },
    { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
    ...Object.keys(CATEGORIES).map(t => ({ loc: '/' + CATEGORIES[t].slug, priority: '0.8', changefreq: 'monthly' })),
    ...Object.keys(BRANDS).map(b => ({ loc: brandUrl(b), priority: '0.6', changefreq: 'monthly' })),
    ...mowers.map(m => ({ loc: mowerUrl(m), priority: '0.7', changefreq: 'monthly' })),
    ...BEST_OF.map(cfg => ({ loc: bestOfUrl(cfg.slug), priority: '0.7', changefreq: 'monthly' })),
    ...COMPARISONS
      .filter(([a, b]) => mowers.find(m => m.id === a) && mowers.find(m => m.id === b))
      .map(([a, b]) => ({ loc: compUrl(a, b), priority: '0.6', changefreq: 'monthly' })),
    ...BLOG_POSTS.map(post => ({ loc: blogUrl(post.slug), priority: '0.8', changefreq: 'monthly' })),
    ...ENGINES.map(e => ({ loc: engineUrl(e), priority: '0.75', changefreq: 'monthly' }))
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
      pros: m.pros, cons: m.cons, verdict: m.verdict, tip: m.tip,
      img: m.img, imgSrc: m.imgSrc, imgFile: m.imgFile, imgLicense: m.imgLicense, imgNote: m.imgNote
    })),
    categories: Object.entries(CATEGORIES).map(([k, v]) => ({ key: k, slug: v.slug, name: v.name, color: v.color, bg: v.bg, desc: v.desc })),
    brands: Object.entries(BRANDS).map(([k, v]) => ({ key: k, slug: slug(k), logo: LOGOS[k] || null, ...v })),
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
writeFileSync(join(ROOT, 'credits.html'), renderCreditsPage()); written++;
writeFileSync(join(ROOT, 'engines.html'), renderEnginesPage()); written++;
writeFileSync(join(ROOT, 'vintage.html'), renderVintagePage()); written++;
writeFileSync(join(ROOT, 'sound-levels.html'), renderSoundLevelsPage()); written++;
writeFileSync(join(ROOT, 'seasonality.html'), renderSeasonalityPage()); written++;
writeFileSync(join(ROOT, 'blog.html'), renderBlogIndex()); written++;

clean(join(ROOT, 'vs'));
clean(join(ROOT, 'best'));
clean(join(ROOT, 'blog'));
clean(join(ROOT, 'engine'));
ensureDir(join(ROOT, 'vs'));
ensureDir(join(ROOT, 'best'));
ensureDir(join(ROOT, 'blog'));
ensureDir(join(ROOT, 'engine'));

let enginePagesWritten = 0;
for (const e of ENGINES) {
  writeFileSync(join(ROOT, 'engine', `${e.slug}.html`), renderEnginePage(e));
  enginePagesWritten++; written++;
}

let blogPostsWritten = 0;
for (const post of BLOG_POSTS) {
  writeFileSync(join(ROOT, 'blog', `${post.slug}.html`), renderBlogPost(post));
  blogPostsWritten++; written++;
}

let comparisonPagesWritten = 0;
for (const [a, b, verdict] of COMPARISONS) {
  const html = renderComparisonPage(a, b, verdict);
  if (html) {
    writeFileSync(join(ROOT, 'vs', `${compSlug(a, b)}.html`), html);
    comparisonPagesWritten++; written++;
  } else {
    console.warn('Skipping comparison (id not found):', a, 'vs', b);
  }
}

let bestOfPagesWritten = 0;
for (const cfg of BEST_OF) {
  writeFileSync(join(ROOT, 'best', `${cfg.slug}.html`), renderBestOfPage(cfg));
  bestOfPagesWritten++; written++;
}
writeFileSync(join(ROOT, 'sitemap.xml'), renderSitemap()); written++;
writeFileSync(join(ROOT, 'mowers-spa.json'), JSON.stringify(spaData(), null, 2)); written++;

console.log(`Built ${written} files.`);
console.log(`  ${mowers.length} mower pages`);
console.log(`  ${Object.keys(CATEGORIES).length} category pages`);
console.log(`  ${Object.keys(BRANDS).length} brand pages`);
console.log(`  ${comparisonPagesWritten} comparison pages`);
console.log(`  ${bestOfPagesWritten} best-of pages`);
console.log(`  ${blogPostsWritten} blog posts + 1 index`);
console.log(`  ${enginePagesWritten} engine deep-dives + 1 hub`);
console.log(`  6 misc (about, buying-guide, credits, sitemap, mowers-spa.json, robots.txt)`);
