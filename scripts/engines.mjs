// Engine family deep-dive data. Each entry powers /engine/<slug>.
// The `match` regex is run against m.eng on every mower in the catalogue
// to auto-derive the list of host machines on each engine page.
//
// When adding a new engine family: add the entry below, run `npm run build`,
// the page is generated automatically.

export const ENGINES = [
  {
    slug: 'briggs-500e',
    name: 'Briggs & Stratton 500E Series',
    country: 'USA',
    family: 'Walk-behind petrol — side-valve OHV',
    match: /B&S (?:450E|500E|575EX)|Briggs.*(?:450E|500E|575EX)|500E Series/i,
    headline: "The most-fitted petrol engine in British sheds",
    displacement: '125–140cc',
    torque: '5.0–5.75 ft-lb',
    architecture: 'Single-cylinder, side-valve OHV',
    typicalLife: '600–1,000 hours (10–15 years domestic use)',

    profile: "If you walk into any UK garden centre and pick up a self-propelled petrol mower under £400, the engine on top is probably a Briggs 500E or its auto-choke sibling the 575EX. Cobra, Mac Allister, Atco, Hyundai, Hayter Spirit, Murray and dozens of others all use this block. It's the most-shipped Briggs engine in the country and the one parts continuity is best for — every garden machinery dealer can get you a service kit overnight.",

    pros: [
      "Universally available parts — every dealer stocks the air filter, plug, and primer bulb",
      "Cheapest service kit in the category (~£15 a year)",
      "Reliable starting up to 8 years old with basic care",
      "ReadyStart auto-choke variant (575EX) eliminates the priming bulb entirely"
    ],
    cons: [
      "Side-valve design — noisier and slightly thirstier than the OHV 675EX class",
      "Plastic primer bulb perishes at 5–7 years (£4 fix but a known weak spot)",
      "Not as long-lived as a Honda GCV — expect retirement at ~800 hours vs ~1,500"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 25 hours)', task: 'Oil change — SAE 30 or 10W-30', cost: '£8 DIY / £35 dealer' },
      { interval: 'Every 2 seasons', task: 'Air filter (foam) — wash and re-oil', cost: '£0 DIY / £12 replacement' },
      { interval: 'Every 3 seasons', task: 'Spark plug (NGK BPR4ES or equivalent)', cost: '£4 DIY / £8 dealer' },
      { interval: 'Each season start', task: 'Drain stale fuel or treat with stabiliser', cost: '£6 stabiliser / 20-tank treatment' },
      { interval: 'When deck looks worn', task: 'Replace blade and check spindle bearing', cost: '£18 generic blade / £35 OEM' }
    ],

    faultsTimeline: [
      { age: 'Years 1–4', fault: 'None expected with annual oil change. Hard cold starts mean stale fuel — drain and refill.' },
      { age: 'Years 5–7', fault: 'Primer bulb hardens, cracks. Symptom: bulb stays squashed when pressed. £4 part, 5-minute fix.' },
      { age: 'Years 7–10', fault: 'Carburettor passages varnish from winter storage. Symptom: starts on full throttle but won\'t hold idle. £35 dealer carb clean or £6 DIY with carb cleaner spray.' },
      { age: 'Years 10–15', fault: 'Foam air filter degrades, valve clearances drift. Symptom: harder starting, slight smoke. Budget £25 for filter + valve adjust.' },
      { age: 'Years 15+', fault: 'Compression starts to drop. Engine still runs but loses power on hills. Replacement engine £100–£150 from a breaker is cheaper than rebuild.' }
    ],

    partsCosts: [
      { part: 'Air filter (foam)', oem: '£12', generic: '£4' },
      { part: 'Spark plug (NGK BPR4ES)', oem: '£8', generic: '£3' },
      { part: 'Primer bulb', oem: '£6', generic: '£3' },
      { part: 'Carburettor service kit', oem: '£28', generic: '£12' },
      { part: 'Replacement engine (used)', oem: '—', generic: '£100–£150' },
      { part: 'Generic 41cm steel blade', oem: '£24', generic: '£8' }
    ],

    verdict: "The default-correct answer for a sub-£500 petrol mower in the UK. Not exciting, not premium, but utterly serviceable for 10+ years if you change the oil. The 575EX upgrade with auto-choke is worth £30 over the plain 500E for the start-button-simplicity alone.",
    altLink: '/blog/briggs-and-stratton-engine-codes-explained'
  },

  {
    slug: 'briggs-675ex',
    name: 'Briggs & Stratton 675EX Series',
    country: 'USA',
    family: 'Walk-behind petrol — overhead-valve',
    match: /B&S (?:625EX|675EX|750EX|850EX|875EX|850 Pro|850 Professional)|Briggs.*(?:625EX|675EX|750EX|850EX|875EX)|7150 Series/i,
    headline: "The sweet spot of the Briggs walk-behind range",
    displacement: '163cc',
    torque: '6.25–7.5 ft-lb',
    architecture: 'Single-cylinder OHV',
    typicalLife: '1,000–1,400 hours (12–18 years domestic)',

    profile: "Where the 500E is the workhorse of the entry tier, the 675EX is what you upgrade to when the lawn pushes past 800m² or when build quality starts mattering. Overhead-valve design means it runs quieter, burns cleaner, and lasts noticeably longer than the side-valve 500E. Fitted to the Cobra MX534SPC, Atco Quattro 19S, AL-KO Highline, and a long list of mid-range 48–53cm mowers.",

    pros: [
      "OHV design — about 5dB quieter at full throttle than a 500E",
      "Lasts 50% longer than the 500E equivalent (1,400 vs 800 hours typical)",
      "Burns slightly cleaner — about 10% lower fuel consumption per hour",
      "Same dealer network as the 500E, so parts continuity is excellent"
    ],
    cons: [
      "ReadyStart auto-choke butterfly sticks at 8+ years (£45 fix)",
      "About £200 premium new over the 500E equivalent",
      "Slightly heavier engine — adds 2–3kg to the mower weight"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 50 hours)', task: 'Oil change — SAE 30 or 10W-30', cost: '£10 DIY / £40 dealer' },
      { interval: 'Every 2 seasons', task: 'Paper air filter (replace, do not wash)', cost: '£14' },
      { interval: 'Every 3 seasons', task: 'Spark plug (NGK BPR5ES)', cost: '£4 DIY / £10 dealer' },
      { interval: 'Every 5 seasons', task: 'Valve clearance check', cost: '£0 DIY (with feeler gauge) / £45 dealer' },
      { interval: 'Each season start', task: 'Stabilise or drain fuel', cost: '£6 stabiliser' }
    ],

    faultsTimeline: [
      { age: 'Years 1–6', fault: 'None expected. The 675EX is the most trouble-free engine in this price band.' },
      { age: 'Years 7–10', fault: 'ReadyStart auto-choke butterfly sticks. Symptom: starts fine when warm, refuses cold. £45 part.' },
      { age: 'Years 10–14', fault: 'Carb gasket weeps fuel. Visible as a wet patch on the engine cowling. £8 gasket kit, 20-minute fix.' },
      { age: 'Years 14–18', fault: 'Valve clearance drifts wider (normal with hours). Tappet noise at idle. Adjust to spec, free if you have a feeler gauge.' },
      { age: 'Years 18+', fault: 'Top-end rebuild becomes due (head gasket, valve seats). £80 in parts, half-day job.' }
    ],

    partsCosts: [
      { part: 'Air filter (paper)', oem: '£14', generic: '£6' },
      { part: 'Spark plug (NGK BPR5ES)', oem: '£10', generic: '£4' },
      { part: 'ReadyStart autochoke unit', oem: '£45', generic: '£32' },
      { part: 'Carburettor service kit', oem: '£32', generic: '£14' },
      { part: 'Head gasket kit', oem: '£28', generic: '£14' },
      { part: 'Generic 51cm steel blade', oem: '£28', generic: '£10' }
    ],

    verdict: "The Briggs to choose if you actually want to keep the mower for 15+ years. The 500E is fine for cheap-and-cheerful; the 675EX is what to look for if used resale and longevity matter.",
    altLink: '/blog/briggs-and-stratton-engine-codes-explained'
  },

  {
    slug: 'briggs-intek-vtwin',
    name: 'Briggs & Stratton Intek (single & V-twin)',
    country: 'USA',
    family: 'Ride-on / lawn-tractor OHV — single and V-twin variants',
    match: /Intek|B&S \d+cc Intek|Briggs.*Intek/i,
    headline: "The same engine John Deere bolts on at twice the price",
    displacement: '656–724cc (17–25HP)',
    torque: '20–28 ft-lb',
    architecture: 'V-twin OHV, splash-lubricated',
    typicalLife: '1,500–2,000 hours (25+ years domestic)',

    profile: "Briggs Intek comes in two flavours: a single-cylinder OHV (344-500cc, 11-17.5HP) for entry consumer ride-ons, and a V-twin (656-724cc, 17-25HP) for premium ones. The V-twin 7180 is the engine inside the Murray MX175-107, the Cub Cadet XT2 and many John Deere E-series tractors. Briggs sells the same block to anyone who wants it, so it sits under wildly different deck colours and price tags. The single is fine for typical UK domestic lawns; the V-twin is the obvious upgrade for half-acre-plus.",

    pros: [
      "Smoother running than any single-cylinder ride-on engine",
      "Same parts work across Murray, John Deere, Cub Cadet — wide aftermarket support",
      "1,500-hour service life is realistic for domestic owners (25+ years of weekend use)",
      "Self-cleaning rotating air screen reduces filter changes"
    ],
    cons: [
      "Splash lubrication (not pressurised) — needs oil checked every 5 hours",
      "Flywheel key shears if the deck ingests a rock — symptom: cranks but no spark",
      "Pricier service parts than a single-cylinder Intek"
    ],

    serviceIntervals: [
      { interval: 'Every 50 hours', task: 'Oil change — SAE 30 or 5W-30 synthetic', cost: '£18 DIY / £85 dealer' },
      { interval: 'Every 100 hours', task: 'Air filter + pre-cleaner', cost: '£28' },
      { interval: 'Every 100 hours', task: 'Spark plugs (×2, RC12YC equivalent)', cost: '£12 DIY' },
      { interval: 'Every 200 hours', task: 'Valve adjust both heads', cost: '£0 DIY / £120 dealer' },
      { interval: 'Every 400 hours', task: 'Fuel filter + fuel pump check', cost: '£18 parts' }
    ],

    faultsTimeline: [
      { age: 'Hours 1–500', fault: 'None expected. Intek V-twins are notably trouble-free in early life.' },
      { age: 'Hours 500–1,000', fault: 'Rocker arm wear shows up as valve clatter at idle. Adjust valves; if still noisy, replace rockers (£25 each).' },
      { age: 'Hours 1,000–1,500', fault: 'Carb diaphragm hardens — engine surges or stumbles under load. £18 service kit.' },
      { age: 'Hours 1,500+', fault: 'Top-end rebuild may be needed (head gaskets, valve seats). £140 parts, full-day job — or £400 short-block from Briggs.' },
      { age: 'Any age', fault: 'Sheared flywheel key after deck impact. Symptom: cranks but no spark. £8 part, 1-hour DIY.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£12', generic: '£5' },
      { part: 'Air filter + pre-cleaner', oem: '£28', generic: '£14' },
      { part: 'Spark plugs (pair)', oem: '£12', generic: '£6' },
      { part: 'Carb service kit', oem: '£35', generic: '£18' },
      { part: 'Flywheel key', oem: '£8', generic: '£3' },
      { part: 'Replacement short-block', oem: '£400', generic: '£250 (used breaker)' }
    ],

    verdict: "The Intek V-twin is the engine you should look for on a used ride-on. Skip Intek single-cylinder if you can stretch the budget — the V-twin will outlast it by 50% and runs noticeably smoother."
  },

  {
    slug: 'briggs-vanguard',
    name: 'Briggs & Stratton Vanguard V-Twin',
    country: 'USA',
    family: 'Commercial-grade ride-on / pro V-twin',
    match: /Vanguard/i,
    headline: "The engine landscapers actually run on",
    displacement: '479–895cc (14–31HP)',
    torque: '24–46 ft-lb',
    architecture: 'V-twin OHV, full-pressure lubrication, cast-iron sleeves',
    typicalLife: '3,000+ hours (30+ years domestic, 10+ years commercial)',

    profile: "The Vanguard sits at the top of the Briggs catalogue and is genuinely a different machine to the consumer Intek. Cast-iron cylinder sleeves, pressurised lubrication, automotive-grade rod bearings. Fitted to the Westwood S150HE, the Mountfield Tornado 2098H, and many commercial-spec ride-ons. Many landscaping fleets see 3,000+ hours before any major work is needed. On a used listing, the word 'Vanguard' is worth £600–£1,200 over the equivalent Intek.",

    pros: [
      "Genuine commercial-grade build — cast-iron sleeves, full-pressure oil",
      "Service interval doubles vs Intek (100 hours, not 50)",
      "Almost no characteristic failure mode — just changes oil and runs",
      "Resale value collapses much more slowly than any other Briggs"
    ],
    cons: [
      "About 30% premium over equivalent Intek-engined machine",
      "Service parts are dealer-only — slightly higher per-part cost",
      "Overkill for most domestic lawns under 1 acre"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Oil + filter — SAE 30 or 5W-30', cost: '£22 DIY / £95 dealer' },
      { interval: 'Every 200 hours', task: 'Air filter + pre-cleaner', cost: '£32' },
      { interval: 'Every 200 hours', task: 'Spark plugs (pair)', cost: '£15 DIY' },
      { interval: 'Every 300 hours', task: 'Fuel filter', cost: '£10' },
      { interval: 'Every 500 hours', task: 'Valve check', cost: '£0 DIY / £140 dealer' }
    ],

    faultsTimeline: [
      { age: 'Hours 1–1,500', fault: 'None expected. Vanguards are essentially fault-free in this window if you change the oil.' },
      { age: 'Hours 1,500–2,500', fault: 'Carb internals show wear after a decade of E10 fuel. Surge under load. £40 service kit.' },
      { age: 'Hours 2,500–3,500', fault: 'Rocker wear, valve seat erosion. Adjust valves, replace rockers if needed (£32 each side).' },
      { age: 'Hours 3,500+', fault: 'Top-end rebuild becomes due. Block itself is good for another 1,500 hours after rebuild.' },
      { age: 'Any age', fault: 'Owner-induced: low oil + hot day = scored cylinder. Vanguards do not tolerate running low on oil any better than other engines.' }
    ],

    partsCosts: [
      { part: 'Oil filter (commercial grade)', oem: '£14', generic: '£7' },
      { part: 'Air filter + pre-cleaner', oem: '£32', generic: '£16' },
      { part: 'Spark plugs (pair)', oem: '£15', generic: '£8' },
      { part: 'Carburettor rebuild kit', oem: '£42', generic: '£22' },
      { part: 'Rocker arm assembly', oem: '£32', generic: '£18' },
      { part: 'Replacement long-block', oem: '£900', generic: '£400 (used)' }
    ],

    verdict: "If your lawn justifies a Vanguard, you'll know — paddock, half-acre+ formal lawn, regular use. For domestic owners who service properly, the Vanguard is the last engine you'll ever buy."
  },

  {
    slug: 'honda-gcv',
    name: 'Honda GCV / GXV Series',
    country: 'Japan',
    family: 'Walk-behind premium petrol & ride-on industrial',
    match: /Honda (?:GCV|GXV)|GCV[a-z]?\s?1[4-7]0|GCVx|Honda V-twin|Honda \d+cc/i,
    headline: "The engine that defines premium UK walk-behinds",
    displacement: '145–200cc',
    torque: '5.5–7.5 ft-lb',
    architecture: 'Single-cylinder OHC (overhead cam), splash-lubricated',
    typicalLife: '1,500–2,500 hours (20+ years domestic)',

    profile: "The Honda GCV170 inside an HRX 476 VY is the same lineage of engine that powers Honda's road cars. Overhead-cam design — rare on a small engine, expensive to manufacture, much smoother and longer-lived than the OHV competition. Fitted to every Honda HRG and HRX, the entire Hayter Harrier range, and the Mountfield SP46H upgrade variant. The benchmark every other walk-behind petrol engine is measured against.",

    pros: [
      "OHC design — quieter, smoother and longer-lived than any rival",
      "Honda parts continuity goes back 20+ years; nothing is unobtainable",
      "Resale value is the highest in the category — used GCVs hold price",
      "Starts cleanly after winter storage even with stale fuel (a Honda specialty)"
    ],
    cons: [
      "30–40% price premium over an equivalent Briggs walk-behind",
      "Honda dealer service costs about 50% more than independents",
      "OHC belt service due at ~1,000 hours — costly if you neglect it"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 25 hours)', task: 'Oil change — Honda 10W-30 SJ', cost: '£12 DIY / £55 dealer' },
      { interval: 'Every 2 seasons', task: 'Foam air filter — wash and re-oil', cost: '£0 DIY / £18 replacement' },
      { interval: 'Every 3 seasons', task: 'Spark plug (NGK BPR6ES)', cost: '£5 DIY / £14 dealer' },
      { interval: 'Every 5 seasons', task: 'Valve clearance check', cost: '£0 DIY / £55 dealer' },
      { interval: '~1,000 hours / 15 years', task: 'Cam belt replacement (critical)', cost: '£35 belt + 1 hour labour' }
    ],

    faultsTimeline: [
      { age: 'Years 1–8', fault: 'Effectively none. The GCV is the most trouble-free domestic engine you can buy.' },
      { age: 'Years 8–12', fault: 'Auto-decompressor weakens — pull-cord becomes notably harder. £18 part, dealer fit.' },
      { age: 'Years 12–18', fault: 'Cam belt approaching service life. If never replaced, change it preventively (£35 belt).' },
      { age: 'Years 18–25', fault: 'Cam belt past replacement — failure causes valve-piston contact and engine death. Don\'t skip this service.' },
      { age: 'Any age', fault: 'Owner-induced: running engine with fuel cap blocked vent causes vapour-lock. Easy fix — clean cap.' }
    ],

    partsCosts: [
      { part: 'Genuine Honda foam air filter', oem: '£18', generic: '£8' },
      { part: 'NGK spark plug BPR6ES', oem: '£14', generic: '£5' },
      { part: 'Cam belt (genuine Honda)', oem: '£35', generic: '£18' },
      { part: 'Auto-decompressor assembly', oem: '£28', generic: '£18' },
      { part: 'Carb diaphragm kit', oem: '£26', generic: '£14' },
      { part: 'Genuine Honda blade (HRX 476)', oem: '£32', generic: '£14' }
    ],

    verdict: "The premium is real — Honda GCV mowers do outlast Briggs equivalents by 50%, hold resale better, and start cleaner after winter. If you keep mowers for 10+ years, the Honda costs the same per year owned as anything cheaper.",
    altLink: '/blog/inspect-used-honda-hrx'
  },

  {
    slug: 'kawasaki-fr-fx',
    name: 'Kawasaki FR / FX V-Twin',
    country: 'Japan',
    family: 'Pro-grade ride-on V-twin OHV',
    match: /Kawasaki FR|Kawasaki FX|Kawasaki FS|Kawasaki F[RX]\d/i,
    headline: "Pro landscaper's first choice for serious ride-ons",
    displacement: '603–852cc (15–27HP)',
    torque: '24–42 ft-lb',
    architecture: 'V-twin OHV, full-pressure oil, cast-iron sleeves',
    typicalLife: '3,000–4,500 hours (the longest-lived ride-on engine sold in the UK)',

    profile: "Kawasaki engines are what professional landscapers and golf-course groundsmen actually buy. The FR series is residential-class but pro-built; the FX is full commercial-grade with a beefier crank, larger oil capacity and replaceable cylinder sleeves. Fitted to most American-built zero-turn ride-ons sold in Europe, plus selected John Deere, Toro, and commercial Stihl walk-behinds.",

    pros: [
      "Longest-lived engine in the ride-on category — 4,000+ hours is realistic",
      "Holds tune better than any rival — same idle quality at hour 3,000 as hour 30",
      "Replaceable cast-iron cylinder sleeves on FX series — full rebuild possible at 4,000 hours",
      "10% more efficient than equivalent Vanguard at the same horsepower"
    ],
    cons: [
      "Significantly more expensive than Briggs Vanguard equivalent (~30% premium new)",
      "Parts come through a thinner UK dealer network",
      "Overkill for any domestic lawn under 2 acres"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Oil + filter — Kawasaki KTech 10W-40', cost: '£25 DIY / £110 dealer' },
      { interval: 'Every 100 hours', task: 'Air filter + pre-cleaner', cost: '£35' },
      { interval: 'Every 200 hours', task: 'Spark plugs (pair)', cost: '£18 DIY' },
      { interval: 'Every 300 hours', task: 'Fuel filter', cost: '£14' },
      { interval: 'Every 500 hours', task: 'Valve check', cost: '£0 DIY / £160 dealer' }
    ],

    faultsTimeline: [
      { age: 'Hours 1–2,000', fault: 'None expected. Kawasakis are remarkably trouble-free.' },
      { age: 'Hours 2,000–3,000', fault: 'Carb diaphragm starts to harden. Cleaning + new diaphragm £35.' },
      { age: 'Hours 3,000–4,000', fault: 'Valve seat wear shows as occasional misfires. Adjust valves; if persistent, lap valve seats (£60 dealer).' },
      { age: 'Hours 4,000+', fault: 'FX-series only — replaceable cylinder sleeves can be re-bored. £180 sleeve set + £400 labour. Block keeps going.' },
      { age: 'Any age', fault: 'Like all engines, owner-induced damage from low oil or fuel-system neglect. Document oil changes religiously.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£18', generic: '£9' },
      { part: 'Air filter + pre-cleaner', oem: '£35', generic: '£18' },
      { part: 'Spark plugs (pair)', oem: '£18', generic: '£9' },
      { part: 'Carburettor rebuild kit', oem: '£48', generic: '£24' },
      { part: 'Cylinder sleeve (FX only)', oem: '£90 each', generic: '£60 each' },
      { part: 'Replacement long-block (FR730V)', oem: '£1,400', generic: '£700 (used)' }
    ],

    verdict: "The Kawasaki is the right answer when 'this thing must run for 25 years' is the brief. For domestic owners with under 2 acres, the Briggs Vanguard does 80% of the job for 70% of the price."
  },

  {
    slug: 'stiga-st-series',
    name: 'Stiga ST Series',
    country: 'Italy',
    family: 'Walk-behind & ride-on petrol — OHV single and twin',
    match: /Stiga ST\d|ST120|ST140|ST160|RV150|RV170|Stiga \d+cc|Stiga.*OHV|Stiga.*twin/i,
    headline: "The engine inside almost every Mountfield",
    displacement: '99–224cc',
    torque: '4.5–7.0 ft-lb',
    architecture: 'Single-cylinder OHV, splash-lubricated',
    typicalLife: '600–1,000 hours (8–12 years domestic)',

    profile: "Stiga's in-house engine division builds the engines fitted to nearly every Mountfield, Stiga and selected Atco walk-behind petrol mower sold in Britain. The ST120 and ST160 are the workhorses. Reliability is a notch below a Honda GCV but considerably above the Loncin-class budget engines. Parts are universally available at any Stiga or Mountfield dealer.",

    pros: [
      "Massive UK installed base — the engine in roughly half of British petrol mowers",
      "Cheapest dealer-network parts in the category",
      "Acceptable noise — about the same as a Briggs 500E",
      "Mountfield/Stiga dealer network is one of the densest in the UK"
    ],
    cons: [
      "Not as durable as a Honda GCV — typical 800-hour service life vs 1,500",
      "ST120 carb is a recurring service item — varnishes after winter storage",
      "Drive cable on Mountfield self-propelled chassis fails before the engine"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 25 hours)', task: 'Oil change — SAE 30', cost: '£8 DIY / £35 dealer' },
      { interval: 'Every 2 seasons', task: 'Foam air filter — wash and re-oil', cost: '£0 DIY / £10 replacement' },
      { interval: 'Every 3 seasons', task: 'Spark plug', cost: '£4 DIY / £8 dealer' },
      { interval: 'Each season start', task: 'Drain stale fuel or stabilise', cost: '£6 stabiliser' },
      { interval: 'When deck looks worn', task: 'Replace blade and re-balance', cost: '£18 generic / £28 OEM' }
    ],

    faultsTimeline: [
      { age: 'Years 1–4', fault: 'None expected with annual oil change.' },
      { age: 'Years 4–7', fault: 'Carb idle jet blocks from stale-fuel residue. Symptom: starts but won\'t hold idle. £6 carb cleaner spray fixes most cases.' },
      { age: 'Years 7–10', fault: 'Drive cable on the self-propelled variants stretches and slips. £18 cable replacement.' },
      { age: 'Years 10+', fault: 'Compression starts to drop. Oil consumption rises. Engine runs but is past its prime. £80 second-hand replacement engine cheaper than rebuild.' }
    ],

    partsCosts: [
      { part: 'Foam air filter', oem: '£10', generic: '£3' },
      { part: 'Spark plug', oem: '£8', generic: '£3' },
      { part: 'Carburettor service kit', oem: '£25', generic: '£10' },
      { part: 'Drive cable (Mountfield SP)', oem: '£18', generic: '£9' },
      { part: 'Replacement engine (used)', oem: '—', generic: '£80–£120' },
      { part: 'Generic 46cm steel blade', oem: '£26', generic: '£8' }
    ],

    verdict: "The Stiga ST series is the engine for buyers who want a known quantity at the lowest price. It's not the longest-lived engine you can buy, but it's the easiest to keep running, the cheapest to service, and the engine inside the mower most British gardens already own.",
    altLink: '/blog/mountfield-sp46-wont-start'
  },

  {
    slug: 'loncin-budget',
    name: 'Loncin G-Series',
    country: 'China',
    family: 'Budget OEM walk-behind petrol singles',
    match: /Loncin|Hyundai IC\d|Hyundai .*OHV|Mac Allister.*[OH]HV/i,
    headline: "The unbadged engine inside half of UK budget petrol mowers",
    displacement: '99–200cc',
    torque: '4.0–6.5 ft-lb',
    architecture: 'Single-cylinder OHV, splash-lubricated',
    typicalLife: '400–800 hours (5–8 years domestic)',

    profile: "Loncin manufactures the engines fitted to most sub-£300 petrol mowers sold under brand badges like Webb, Hyundai, Mac Allister, and many supermarket-exclusive lines. Capable but disposable — typically 5 to 8 years of normal use before something terminal happens. The Loncin name is rarely on the engine itself; you have to look for the Honda-GX-style code on the side cover to identify it.",

    pros: [
      "Cheapest petrol mower engine in the UK — keeps prices below £300",
      "OHV architecture means decent fuel economy and lower noise",
      "Straightforward design — anyone who can service a Briggs can service this",
      "Generic parts (carb kits, plugs, filters) widely available online"
    ],
    cons: [
      "Service life is half that of a Briggs 500E and a third of a Honda GCV",
      "Dealer network is the host brand's, not Loncin's — patchy support",
      "Plastic and aluminium parts where Briggs and Honda use steel — wears faster",
      "No clear documentation in English — service manuals are thin"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 20 hours)', task: 'Oil change — SAE 30', cost: '£6 DIY / £30 dealer' },
      { interval: 'Every 2 seasons', task: 'Air filter (foam — wash and re-oil)', cost: '£0 DIY / £8 replacement' },
      { interval: 'Every 3 seasons', task: 'Spark plug', cost: '£3 DIY' },
      { interval: 'Each season start', task: 'Drain or stabilise fuel — Loncin carbs varnish faster than Briggs', cost: '£6 stabiliser' }
    ],

    faultsTimeline: [
      { age: 'Years 1–3', fault: 'None expected. Loncins start cleanly when new.' },
      { age: 'Years 3–5', fault: 'Carb varnishes from stale fuel — happens faster than on Briggs/Honda. £20 carb kit, DIY job.' },
      { age: 'Years 5–7', fault: 'Compression drops noticeably. Engine starts harder, runs rougher. Top-end work isn\'t economic at this engine\'s price band.' },
      { age: 'Years 7–10', fault: 'Engine retirement realistic. Replacement Loncin clone engine £60–£90 from a generic small-engine supplier — sometimes cheaper than the carb-and-tune.' }
    ],

    partsCosts: [
      { part: 'Foam air filter', oem: '£8', generic: '£3' },
      { part: 'Spark plug', oem: '£6', generic: '£2' },
      { part: 'Generic carburettor', oem: '£28', generic: '£14' },
      { part: 'Replacement complete engine', oem: '—', generic: '£60–£90' },
      { part: 'Generic 41cm blade', oem: '£18', generic: '£6' }
    ],

    verdict: "The right answer for a tenant garden, a holiday cottage, or anyone who wants the cheapest petrol mower that works. Don't expect 15 years of service — expect 6, then bin it and buy another."
  }
];
