// Extra engine deep-dives, imported by build.mjs and concatenated with the
// inline ENGINES array. Same schema as scripts/engines.mjs.

export const ENGINES_EXTRA = [
  {
    slug: 'honda-gxv',
    name: 'Honda GXV Series',
    country: 'Japan',
    family: 'Vertical-shaft single-cylinder OHV — commercial walk-behind and small ride-on',
    match: /Honda GXV\d?|GXV160|GXV340|GXV390|Honda GX V/i,
    headline: "Honda's commercial workhorse — built for daily contractor use",
    displacement: '160–390cc',
    torque: '7.0–13.5 ft-lb',
    architecture: 'Single-cylinder OHV, pressure-lubricated',
    typicalLife: '2,500–4,000 hours (20+ years even on daily commercial use)',

    profile: "Where the Honda GCV is the residential premium engine, the GXV is the commercial-spec block. Pressure lubrication instead of splash, forged steel crank instead of cast, dual ball bearings instead of plain bushings. Fitted to the Hayter Hunter Pro range, premium John Deere walk-behinds, Honda HRC commercial mowers, and a long list of pro-grade kit. Where the GCV retires at about 1500 hours, the GXV routinely passes 3000 hours of professional landscape use.",

    pros: [
      "Pressure-lubricated crank — survives commercial-grade abuse where splash systems fail",
      "Cast-iron cylinder liner — bore stays round for the engine's full life",
      "Dual-bearing main shaft eliminates the shaft-end wobble that kills cheaper engines",
      "Genuine Honda dealer network supports parts and service everywhere in the UK"
    ],
    cons: [
      "Significantly more expensive than the GCV — typically £400 premium when fitted",
      "Heavier than the GCV by 3–4kg — host mower gains weight",
      "Honda dealer service rates are 30% above generic small-engine shops",
      "Overkill for any residential lawn — capability that 95% of buyers will never use"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 100 hours)', task: 'Oil change — Honda 10W-30 or SAE 30', cost: '£10 DIY / £45 dealer' },
      { interval: 'Every 2 seasons (or 200 hours)', task: 'Air filter — replace paper element', cost: '£15 OEM / £8 generic' },
      { interval: 'Every 3 seasons (or 300 hours)', task: 'Spark plug (NGK BPR5ES)', cost: '£6 DIY' },
      { interval: 'Every 5 seasons (or 500 hours)', task: 'Valve clearance check', cost: '£0 DIY with feeler gauges / £85 dealer' },
      { interval: 'Each season start', task: 'Drain stale fuel or run on stabilised petrol', cost: '£6 stabiliser' }
    ],

    faultsTimeline: [
      { age: 'Years 1–10', fault: 'None expected with annual oil change and clean fuel. The GXV is one of the most fault-free engines fitted to any mower.' },
      { age: 'Years 10–15', fault: 'Air filter housing seals harden, leak unfiltered air. Symptom: dustier-than-normal carb intake on inspection. £25 reseal kit, easy DIY job.' },
      { age: 'Years 15–20', fault: 'Carburettor gasket set perishes, mild fuel weep on idle. £35 OEM kit, £45 dealer labour.' },
      { age: 'Years 20+', fault: 'Valve clearance drifts wider, cold starts get harder. Re-adjust valves to spec — engine is good for another 5 years afterwards.' }
    ],

    partsCosts: [
      { part: 'Air filter (paper)', oem: '£15', generic: '£8' },
      { part: 'Spark plug (NGK BPR5ES)', oem: '£8', generic: '£4' },
      { part: 'Oil filter (commercial spec only)', oem: '£12', generic: '£6' },
      { part: 'Carburettor service kit', oem: '£35', generic: '£18' },
      { part: 'Replacement engine (used 1500hr)', oem: '£350', generic: '—' }
    ],

    verdict: "If you mow professionally and want one engine to last your career, this is it. For domestic users, overkill in the truest sense — the GCV does the same job for £400 less and lasts longer than most of us will own the mower anyway. The GXV is the engine to buy when you have already worn out a GCV.",
    altLink: '/engine/honda-gcv'
  },

  {
    slug: 'kawasaki-fs',
    name: 'Kawasaki FS Series',
    country: 'Japan / USA',
    family: 'Vertical-shaft V-twin OHV — lawn-tractor and zero-turn',
    match: /Kawasaki FS\d|FS481V|FS541V|FS600V|FS651V|FS691V/i,
    headline: "The popular Kawasaki for residential ride-ons and entry zero-turns",
    displacement: '481–726cc',
    torque: '18.0–25.5 ft-lb',
    architecture: 'Air-cooled V-twin OHV',
    typicalLife: '1,500–2,500 hours (15–20 years domestic ride-on use)',

    profile: "The FS is the volume Kawasaki engine fitted to residential and prosumer ride-ons across the UK and US markets. Used by John Deere on the X300/X500 series, Cub Cadet on the XT2, Kubota T-series, and most premium Husqvarna riders. Sits between the budget single-cylinder Loncin/Briggs and the full commercial Kawasaki FX series. Quiet, smooth-running, and noticeably more refined than the Briggs Intek twin at the same displacement.",

    pros: [
      "Significantly quieter and smoother than equivalent Briggs Intek V-twin",
      "Pressure-lubrication with full oil filter — proper engine for ride-on duty cycle",
      "Twin-cylinder balance shafts reduce vibration through the seat",
      "Parts continuity is excellent through any Kawasaki small-engine dealer"
    ],
    cons: [
      "Premium pricing in host machines — typically £400–£800 premium over Briggs",
      "Heavier than the Briggs Intek of the same displacement",
      "Specific service items (oil filter, plug) are pricier than universal Briggs equivalents",
      "Not as widely understood as Briggs by independent small-engine repairers"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 100 hours)', task: 'Oil change — Kawasaki 10W-40 or SAE 30', cost: '£14 DIY / £60 dealer' },
      { interval: 'Every 2 seasons', task: 'Oil filter replacement', cost: '£12 OEM' },
      { interval: 'Every 2 seasons', task: 'Air filter (paper + foam pre-filter)', cost: '£22 OEM' },
      { interval: 'Every 3 seasons', task: 'Spark plugs (twin — NGK BPR5ES)', cost: '£10 DIY' },
      { interval: 'Every 500 hours', task: 'Valve clearance check', cost: '£0 DIY / £120 dealer' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5', fault: 'None expected. The FS series is genuinely robust through this period.' },
      { age: 'Years 5–8', fault: 'Carburettor varnishing common in spring after winter storage. Drain and refill with stabilised fuel before storage, or budget £45 for a carb clean.' },
      { age: 'Years 8–12', fault: 'Coil pack mounting bolts corrode — vibration causes rough idle on one cylinder. £15 OEM replacement coil, 20-minute DIY job.' },
      { age: 'Years 12–18', fault: 'Valve clearance drifts wider, harder cold starts. Adjust to 0.1mm intake / 0.15mm exhaust — engine runs another 5 years.' },
      { age: 'Years 18+', fault: 'Compression starts to drop. Realistic engine retirement at 2500 hours, replacement FS-series block from a salvaged ride-on £400–£600.' }
    ],

    partsCosts: [
      { part: 'Air filter (paper)', oem: '£22', generic: '£10' },
      { part: 'Oil filter', oem: '£12', generic: '£6' },
      { part: 'Spark plug pair (NGK BPR5ES)', oem: '£12', generic: '£5' },
      { part: 'Coil pack', oem: '£35', generic: '£15' },
      { part: 'Carburettor service kit', oem: '£45', generic: '£22' },
      { part: 'Replacement engine (used 1000hr)', oem: '£450', generic: '—' }
    ],

    verdict: "The engine you want under a ride-on if you plan to keep it 15 years. Significantly quieter than the Briggs equivalent and built to a higher standard. Worth the host-mower premium for any owner who values smooth running and parts continuity over outright lowest purchase price.",
    altLink: '/engine/kawasaki-fr-fx'
  },

  {
    slug: 'kawasaki-fx',
    name: 'Kawasaki FX Pro Series',
    country: 'Japan / USA',
    family: 'Vertical-shaft V-twin OHV — full commercial spec',
    match: /Kawasaki FX\d|FX481V|FX541V|FX600V|FX651V|FX691V|FX691|FX730V|FX801V|FX850V|FX921V/i,
    headline: "Kawasaki's commercial flagship — the engine pros choose for daily use",
    displacement: '603–999cc',
    torque: '22.0–35.0 ft-lb',
    architecture: 'Air-cooled V-twin OHV, full pressure lubrication',
    typicalLife: '3,000–5,000 hours (commercial daily use)',

    profile: "The FX is what the FS becomes when Kawasaki stop holding back. Forged steel crank instead of cast, dual ball bearings on both ends instead of plain bushings, oil cooler standard on the bigger displacements. Fitted to Kubota Z and ZD-series zero-turns, Hustler commercial mowers, Wright stand-on mowers, Scag pro turf equipment, and the Kubota T1880. The benchmark commercial walk-behind and zero-turn engine in the UK. Expect 3000+ hours of full landscape-contractor use.",

    pros: [
      "Forged crank and dual ball bearings — the heart of a 5000-hour service life",
      "Oil cooler on FX730V+ — keeps oil viable at full-throttle continuous use",
      "Standardised mounting pattern across the range — easy upgrade path",
      "Parts continuity is best-in-class via Kawasaki and Kubota dealers"
    ],
    cons: [
      "Properly expensive engine — typically £600–£1200 premium when fitted",
      "Overkill for any residential mowing — capability that 99% of buyers never use",
      "Significant weight penalty over FS — host machine builds around it",
      "Specific service items pricier than the FS line"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Oil change — Kawasaki 10W-40', cost: '£16 DIY / £75 dealer' },
      { interval: 'Every 100 hours', task: 'Oil filter replacement', cost: '£14 OEM' },
      { interval: 'Every 200 hours', task: 'Air filter (paper + foam pre-filter)', cost: '£28 OEM' },
      { interval: 'Every 300 hours', task: 'Spark plugs (twin)', cost: '£14 DIY' },
      { interval: 'Every 500 hours', task: 'Valve clearance check and adjust', cost: '£0 DIY / £140 dealer' },
      { interval: 'Every 1000 hours', task: 'Coolant air system inspection — check the fins for grass debris', cost: '£0 DIY' }
    ],

    faultsTimeline: [
      { age: 'Years 1–10 (under 2000hr)', fault: 'None expected with proper service intervals. The FX is genuinely fault-free in this period.' },
      { age: 'Years 10–15 (2000–3500hr)', fault: 'Air system cooling fins clog with grass debris if not blown out. Symptom: oil temp warning on full-throttle hot day. £0 fix with compressed air, 10 minutes.' },
      { age: 'Years 15–20 (3500–5000hr)', fault: 'Coil pack starts to drift, cylinder firing weakens. £45 OEM coil, 30-minute DIY job.' },
      { age: 'Years 20+ (over 5000hr)', fault: 'Compression starts to drop. Realistic engine retirement at 5000–6000 hours. Replacement FX engine from a wrecked commercial mower £900–£1500.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£14', generic: '£7' },
      { part: 'Air filter (paper)', oem: '£28', generic: '£14' },
      { part: 'Foam pre-filter', oem: '£8', generic: '£4' },
      { part: 'Spark plug pair', oem: '£14', generic: '£6' },
      { part: 'Coil pack', oem: '£45', generic: '£22' },
      { part: 'Replacement engine (used 2000hr)', oem: '£750', generic: '—' }
    ],

    verdict: "The engine to specify on any commercial mower destined for full-time professional use. The 1000-hour service-life difference vs the FS pays back the engine premium inside two seasons of contracting. For residential users, the FX is overkill in the literal sense — but if budget allows, it is the most refined and longest-lived petrol mower engine on the UK market.",
    altLink: '/engine/kawasaki-fr-fx'
  },

  {
    slug: 'kubota-d722',
    name: 'Kubota D722 Diesel',
    country: 'Japan',
    family: '3-cylinder vertical diesel — ride-on and commercial out-front',
    match: /Kubota D722|D722 diesel|D-722/i,
    headline: "The Japanese 3-cylinder diesel powering professional groundskeeping",
    displacement: '719cc',
    torque: '32.5 ft-lb',
    architecture: 'Liquid-cooled 3-cylinder indirect-injection diesel',
    typicalLife: '8,000–10,000 hours (30+ years of domestic use, 15+ years commercial)',

    profile: "The D722 is Kubota's most-fitted small diesel and the engine that powers the G21-series and earlier G23 ride-on mowers, the BX1880 sub-compact tractor, plus thousands of generators, compressors and small forklifts across the UK. A 30-year-old D722 with documented oil changes will outrun the rest of the host machine. Service parts are universal and available everywhere Kubota dealers exist.",

    pros: [
      "8,000-hour service life is realistic with annual oil change and clean fuel",
      "Common-rail fuel injection and 12V starter — no glow plugs to fail",
      "Parts continuity is the strongest in the small-diesel market via Kubota dealers",
      "Genuine smoke-free running on clean ULSD if service intervals are honoured"
    ],
    cons: [
      "Eye-watering cost in host machine — diesel premium over petrol equivalents",
      "Diesel filter is the single most-important service item — owner-skip costs £400",
      "Older D722 units lack DPF — newer emissions zones may restrict use",
      "Cold starts demand a fully charged battery — diesels are unforgiving of weak batteries"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Engine oil change — 15W-40 diesel-spec', cost: '£18 DIY / £90 dealer' },
      { interval: 'Every 100 hours', task: 'Oil filter', cost: '£15 OEM' },
      { interval: 'Every 200 hours', task: 'Fuel filter — non-negotiable', cost: '£25 OEM' },
      { interval: 'Every 200 hours', task: 'Air filter element', cost: '£35 OEM' },
      { interval: 'Every 800 hours', task: 'Injector inspection and clean', cost: '£0 DIY (basic check) / £180 dealer service' },
      { interval: 'Every 2000 hours', task: 'Coolant flush and replace', cost: '£25 OAT coolant' }
    ],

    faultsTimeline: [
      { age: 'Years 1–8 (under 1500hr)', fault: 'None expected with proper service. The D722 is genuinely fault-free if oil and filters are maintained.' },
      { age: 'Years 8–15 (1500–3500hr)', fault: 'Fuel filter neglect is the most common failure mode. Symptom: power loss on hot day, hard restarting. £25 fix if caught early; £400 injector pump rebuild if ignored.' },
      { age: 'Years 15–20 (3500–6000hr)', fault: 'Glow plug or relay drift — though some D722s skip glow plugs entirely. Symptom: hard cold starts. £45 glow plug pair, 30-minute DIY job.' },
      { age: 'Years 20+ (6000hr+)', fault: 'Injector spray pattern degrades, smoke under load increases. Dealer injector overhaul £200–£300 per cylinder. Engine still has 2000–3000 hours after rebuild.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£15', generic: '£8' },
      { part: 'Fuel filter', oem: '£25', generic: '£12' },
      { part: 'Air filter element', oem: '£35', generic: '£18' },
      { part: 'Glow plug pair', oem: '£45', generic: '£22' },
      { part: 'Injector rebuild kit (per cyl)', oem: '£85', generic: '—' },
      { part: 'Replacement engine (used 4000hr)', oem: '£1800', generic: '—' }
    ],

    verdict: "The diesel engine that defines the small commercial-mower category in the UK. 30-year service horizon is realistic on a domestic-use D722. The cost premium over a petrol equivalent recovers inside three seasons of commercial mowing. For domestic users, only the engine to specify if you want a mower for the rest of your life."
  },

  {
    slug: 'kubota-d902',
    name: 'Kubota D902 Diesel',
    country: 'Japan',
    family: '3-cylinder vertical diesel — current Tier 4 final',
    match: /Kubota D902|D902 diesel|D-902/i,
    headline: "The current Kubota small diesel — cleaner emissions than the D722",
    displacement: '898cc',
    torque: '36.0 ft-lb',
    architecture: 'Liquid-cooled 3-cylinder indirect-injection diesel, Tier 4 final compliant',
    typicalLife: '8,000–10,000 hours',

    profile: "The D902 is the D722's replacement under modern emissions standards. Same essential engineering, refined for cleaner combustion and Tier 4 final compliance. Powers the current Kubota G26-II range, the BX2380 and BX2680 sub-compacts, plus the entry ZD diesel zero-turns. Same dealer network as D722 — service parts share many items.",

    pros: [
      "Cleaner-burning than D722 — qualifies in current and forthcoming UK emissions zones",
      "Same 8,000+ hour service horizon as the D722 it replaces",
      "Electronic shutdown and monitoring as standard from late 2018 onwards",
      "Higher torque output than the D722 from the same physical footprint"
    ],
    cons: [
      "Electronic dash and emissions sensors add new failure modes vs the D722",
      "Most expensive serviceable parts in the small-diesel category",
      "DPF (diesel particulate filter) regen cycles require careful operation",
      "Dealer diagnostic tool required for some fault codes"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Engine oil change — Kubota Super UDT-2 or 15W-40', cost: '£20 DIY / £100 dealer' },
      { interval: 'Every 100 hours', task: 'Oil filter', cost: '£18 OEM' },
      { interval: 'Every 200 hours', task: 'Fuel filter', cost: '£28 OEM' },
      { interval: 'Every 200 hours', task: 'Air filter element', cost: '£40 OEM' },
      { interval: 'Every 400 hours', task: 'DPF regen cycle check', cost: '£0 DIY (operator-initiated) / £85 dealer' },
      { interval: 'Every 2000 hours', task: 'Coolant flush and replace', cost: '£28 OAT coolant' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5 (under 1000hr)', fault: 'None expected. The D902 is a refined evolution of the proven D722.' },
      { age: 'Years 5–10 (1000–3000hr)', fault: 'DPF blockage if regen cycles are interrupted. Symptom: warning light on dash, power limit. £180 dealer diagnostic + forced regen.' },
      { age: 'Years 10–15 (3000–5000hr)', fault: 'Electronic sensor drift — coolant temp, intake pressure. £45–£85 per sensor, dealer diagnostic to identify.' },
      { age: 'Years 15+ (over 5000hr)', fault: 'Same injector wear pattern as D722. Dealer service £250 per cylinder.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£18', generic: '£9' },
      { part: 'Fuel filter', oem: '£28', generic: '£14' },
      { part: 'Air filter element', oem: '£40', generic: '£20' },
      { part: 'Temperature sensor', oem: '£45', generic: '—' },
      { part: 'DPF (Diesel Particulate Filter) replacement', oem: '£600', generic: '—' },
      { part: 'Replacement engine (used 2500hr)', oem: '£2200', generic: '—' }
    ],

    verdict: "The modern Kubota small diesel and the right specification for any new commercial mower entering UK service. Emissions-compliant for current and forthcoming low-emission zones, with the same long-life build as the D722. Domestic buyers should consider used D722-equipped earlier ride-ons before paying the D902 premium.",
    altLink: '/engine/kubota-d722'
  },

  {
    slug: 'kubota-v1505',
    name: 'Kubota V1505 Diesel',
    country: 'Japan',
    family: '4-cylinder vertical diesel — commercial flagship',
    match: /Kubota V1505|V1505 diesel/i,
    headline: "Kubota's 4-cylinder small diesel — the smoothest engine in the lineup",
    displacement: '1498cc',
    torque: '57.0 ft-lb',
    architecture: 'Liquid-cooled 4-cylinder indirect-injection diesel',
    typicalLife: '10,000+ hours',

    profile: "The V1505 is Kubota's 4-cylinder small diesel and the engine fitted to the F3890 commercial front-mount and ZD1511 zero-turn. Where the 3-cylinder D902 vibrates audibly at low revs, the V1505 idles like a small car engine. The smoothness alone makes this the engine pros pick when they spend 8 hours a day on the seat.",

    pros: [
      "4-cylinder smoothness eliminates the 3-cylinder rumble — significantly less operator fatigue",
      "10,000-hour service horizon is realistic on properly serviced units",
      "Highest torque-to-displacement of any Kubota small diesel",
      "Same parts continuity as the D902 family via Kubota dealers"
    ],
    cons: [
      "Council-and-contractor money — only specified on the most expensive Kubota mowers",
      "Heavier than the D902 by 30kg — host machine builds around it",
      "Same DPF complexity as the D902 on post-2018 emissions units",
      "Service intervals more expensive (4 of everything instead of 3)"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Engine oil change — 15W-40', cost: '£22 DIY / £110 dealer' },
      { interval: 'Every 100 hours', task: 'Oil filter', cost: '£18 OEM' },
      { interval: 'Every 200 hours', task: 'Fuel filter', cost: '£28 OEM' },
      { interval: 'Every 200 hours', task: 'Air filter element', cost: '£45 OEM' },
      { interval: 'Every 1000 hours', task: 'Injector inspection', cost: '£220 dealer' }
    ],

    faultsTimeline: [
      { age: 'Years 1–10 (under 3000hr)', fault: 'None expected. The V1505 is a refined commercial engine.' },
      { age: 'Years 10–20 (3000–7000hr)', fault: 'DPF or sensor faults on post-2018 emissions units. Symptom: dashboard warnings, power limit. Dealer diagnostic essential.' },
      { age: 'Years 20+ (over 7000hr)', fault: 'Realistic injector wear. Dealer rebuild £250 per cylinder × 4 = £1000.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£18', generic: '£9' },
      { part: 'Fuel filter', oem: '£28', generic: '£14' },
      { part: 'Air filter element', oem: '£45', generic: '£22' },
      { part: 'Replacement engine (used 4000hr)', oem: '£3500', generic: '—' }
    ],

    verdict: "The engine for owners who actually mow 8 hours a day. The smoothness vs the D902 is genuinely worth the price for any operator spending more than 1000 hours a year on the machine. For everyone else, the D902 does the same essential job for £3000 less in the host mower."
  },

  {
    slug: 'kubota-wg752',
    name: 'Kubota WG-Series Petrol V-Twin',
    country: 'Japan',
    family: 'Vertical-shaft V-twin petrol — premium garden tractor',
    match: /Kubota WG\d|WG752|WG972/i,
    headline: "Kubota's own petrol V-twin — fitted to the GR-series garden tractors",
    displacement: '745–999cc',
    torque: '25.0–32.0 ft-lb',
    architecture: 'Air-cooled V-twin OHV petrol',
    typicalLife: '1,500–2,000 hours',

    profile: "Where most of Kubota's mower range runs on either Kawasaki petrol or Kubota diesel, the GR-series garden tractors use Kubota's own WG-series petrol V-twin. Built to the same standard as Kubota's diesels, the WG runs noticeably smoother than the Briggs Vanguard equivalent and lasts about 30% longer in domestic service. Less common than Kawasaki FS/FX, but the dealer network is identical.",

    pros: [
      "Smoother running than equivalent Briggs Vanguard V-twin",
      "1,500+ hour service horizon is realistic with annual oil change",
      "Same Kubota dealer network as the diesel range — parts continuity excellent",
      "Lower fuel consumption than equivalent-displacement Kawasaki FS"
    ],
    cons: [
      "Less common than Kawasaki — fewer independent repairers familiar with it",
      "Kubota WG-specific parts are pricier than Briggs equivalents",
      "Limited to the Kubota GR-series — no aftermarket fitment options",
      "Diesel Kubota is the natural step-up — pulls owners away from the WG"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 100 hours)', task: 'Oil change — Kubota 10W-30 or SAE 30', cost: '£14 DIY / £65 dealer' },
      { interval: 'Every 2 seasons', task: 'Oil filter', cost: '£12 OEM' },
      { interval: 'Every 2 seasons', task: 'Air filter (paper + foam pre)', cost: '£28 OEM' },
      { interval: 'Every 3 seasons', task: 'Spark plugs (twin)', cost: '£10 DIY' }
    ],

    faultsTimeline: [
      { age: 'Years 1–8 (under 1000hr)', fault: 'None expected. The WG is a clean-running, fault-free engine in this period.' },
      { age: 'Years 8–15 (1000–1800hr)', fault: 'Carburettor varnish in spring after winter storage. £40 carb clean.' },
      { age: 'Years 15+ (over 1800hr)', fault: 'Compression starts to drop. Realistic engine retirement at 2000 hours.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£12', generic: '£6' },
      { part: 'Air filter set', oem: '£28', generic: '£14' },
      { part: 'Spark plug pair', oem: '£10', generic: '£4' },
      { part: 'Replacement engine (used 800hr)', oem: '£550', generic: '—' }
    ],

    verdict: "The right engine for an owner who specifically wants Kubota build quality at the GR-series price point. The Kawasaki FS does the same essential job and has wider familiarity in independent service shops. Pick the WG if you want everything-Kubota under the bonnet."
  },

  {
    slug: 'ego-arc-lithium',
    name: 'EGO 56V Arc Lithium Platform',
    country: 'Taiwan / USA',
    family: 'Cordless lithium-ion battery — cross-tool 56V system',
    match: /EGO 56V|EGO 56|56V Arc Lithium|Arc Lithium/i,
    headline: "The cordless platform that actually replaced petrol for UK gardens",
    displacement: 'N/A (electric)',
    torque: 'Equivalent to 5.5–7.5HP petrol on premium mowers',
    architecture: 'Lithium-ion 56V system, peak voltage 56V nominal',
    typicalLife: '1,500+ charge cycles per battery (typical 7-10 years domestic use)',

    profile: "EGO launched the 56V Arc Lithium platform in 2014 and has driven cordless adoption in the UK ever since. The architecture peaks at 56V instead of the more common 36V or 40V, which lets EGO mowers genuinely match petrol on cut quality and runtime. Single-battery design (no per-tool battery hassle) shares with their hedge trimmer, leaf blower, chainsaw and pressure washer ranges. The platform pros now choose for residential landscaping in noise-restricted zones.",

    pros: [
      "Genuine petrol-replacement performance on dry lawns up to 1500m²",
      "Arc-shape battery dissipates heat better than rectangular — faster charging without degradation",
      "Cross-tool sharing covers most garden power tools at a credible quality level",
      "Battery retains 80%+ of capacity after 5 years of weekly use"
    ],
    cons: [
      "Premium pricing — EGO 56V mowers are typically £200 more than equivalent 40V Greenworks",
      "Battery replacement at year 8 is £150–£250 — factor into ownership cost",
      "Charger and battery only sold through authorised UK retailers",
      "Charging requires a 13A socket within reach — fast-charge draws 6A continuously"
    ],

    serviceIntervals: [
      { interval: 'Every season start', task: 'Inspect battery contacts for corrosion', cost: '£0 DIY' },
      { interval: 'Every season', task: 'Sharpen blade (or replace if worn)', cost: '£15 generic / £25 OEM' },
      { interval: 'Off-season storage', task: 'Charge battery to 50% before storing in dry indoor location', cost: '£0' },
      { interval: 'Every 3 seasons', task: 'Inspect drive belt (self-propelled units)', cost: '£0 DIY' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5', fault: 'None expected. EGO platform reliability is genuinely high in this period.' },
      { age: 'Years 5–8', fault: 'Battery capacity drops to 70-80% of original. Symptom: runtime falls from 45min to 30min on the same lawn. £150 replacement battery, plug-and-play.' },
      { age: 'Years 8–12', fault: 'Original battery typically retired around year 10. Charger usually still good for the replacement battery.' },
      { age: 'Years 12+', fault: 'Motor brushes wear or electronics fail on the deck unit. Replacement deck-and-motor £350 dealer service.' }
    ],

    partsCosts: [
      { part: '5Ah Arc battery (BA2800T)', oem: '£199', generic: '—' },
      { part: '7.5Ah Arc battery (BA4200T)', oem: '£299', generic: '—' },
      { part: 'Rapid charger (CH5500E)', oem: '£99', generic: '—' },
      { part: 'OEM blade (LM21-LMB)', oem: '£25', generic: '£12' },
      { part: 'Drive belt (self-propelled)', oem: '£18', generic: '£10' }
    ],

    verdict: "The cordless platform to buy if you are leaving petrol behind for good and want one battery system covering all your garden power tools. Worth the premium over Greenworks or Worx for the cross-tool ecosystem and the genuinely premium build quality across the EGO range. Skip if you only need a mower and have no other cordless tool needs."
  },

  {
    slug: 'stihl-ap-system',
    name: 'Stihl AP Battery System',
    country: 'Germany',
    family: 'Cordless lithium-ion battery — cross-tool 36V Pro system',
    match: /Stihl AP|Stihl 36V|AP 300|AP 500/i,
    headline: "The German battery platform built to professional duty cycles",
    displacement: 'N/A (electric)',
    torque: 'Equivalent to 3.5–6.0HP petrol depending on tool',
    architecture: 'Lithium-ion 36V system, single battery across pro garden tools',
    typicalLife: '1,200+ charge cycles per battery (5-8 years pro use)',

    profile: "Stihl invented the chainsaw category and the AP system is their cordless answer. 36V architecture (lower peak voltage than EGO's 56V) but with substantially heavier-duty cell construction designed for professional daily abuse. Shares between mowers, chainsaws, hedge trimmers, blowers, pole pruners and pressure washers — the broadest pro garden cordless ecosystem available. UK dealer network is among the densest of any garden power tool brand.",

    pros: [
      "Industrial-grade cell construction — outlasts equivalent EGO/Greenworks under heavy use",
      "Dealer network is the densest of any cordless platform in the UK",
      "Full Stihl tool ecosystem (chainsaws, blowers, etc.) is genuinely professional-grade",
      "AP batteries fit older and newer tools — backwards compatibility is the best in the category"
    ],
    cons: [
      "Higher per-Ah price than EGO or Greenworks — premium positioning",
      "36V system means slightly less torque headroom than 56V EGO on tall grass",
      "Cell technology is conservative — runtime per Ah is below EGO equivalent",
      "Only sold through authorised Stihl dealers — no online discounting"
    ],

    serviceIntervals: [
      { interval: 'Every season start', task: 'Inspect contacts for corrosion', cost: '£0 DIY' },
      { interval: 'Every season', task: 'Sharpen blade', cost: '£15' },
      { interval: 'Off-season storage', task: 'Store battery at 40-60% charge in dry indoor location', cost: '£0' },
      { interval: 'Every 200 charge cycles', task: 'Inspect AP cell pack for any swelling or contact discolouration', cost: '£0 DIY' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5', fault: 'None expected. Stihl AP is genuinely fault-free in this period.' },
      { age: 'Years 5–8', fault: 'Capacity drops to 75-80% of original. Symptom: runtime falls noticeably. £180 replacement AP 300 S battery.' },
      { age: 'Years 8–12', fault: 'Mower motor brushes wear on heavily-used pro units. Stihl dealer service £150–£250.' }
    ],

    partsCosts: [
      { part: 'AP 300 S battery (4.4Ah)', oem: '£169', generic: '—' },
      { part: 'AP 500 S battery (8.1Ah)', oem: '£289', generic: '—' },
      { part: 'AL 301 charger', oem: '£89', generic: '—' },
      { part: 'OEM mower blade (RMA 443/448)', oem: '£28', generic: '£14' }
    ],

    verdict: "The cordless platform for buyers who already use Stihl petrol tools and want one battery covering the modern cordless replacements. Premium pricing is the cost of entry — buyers who do not value the dealer network or the pro-grade cell construction should consider EGO instead. For Stihl AP owners, the RMA 443 and RMA 448 mowers are no-brainer additions."
  },

  {
    slug: 'briggs-instart',
    name: 'Briggs & Stratton InStart Electric Start',
    country: 'USA',
    family: 'Petrol mower engines with integrated 12V starter motor',
    match: /InStart|Briggs.*InStart|B&S InStart|Quantum InStart/i,
    headline: "Push-button start fitted to Briggs petrol mowers",
    displacement: '125–190cc (depending on host engine)',
    torque: 'Same as base engine + 12V starter circuit',
    architecture: 'Standard Briggs OHV or side-valve + 12V lithium starter pack',
    typicalLife: '10–12 years on the starter pack; engine life unchanged',

    profile: "InStart is Briggs' answer to the universal complaint about pull-cord mowers. Push-button electric start using a small 12V lithium battery integrated into the engine shroud. Recharges from a wall-charger between uses, gives roughly 30 starts per charge. Fitted to mid-range Briggs-engined mowers including some Hyundai SPE units and selected Murray, Cobra, and Hayter electric-start options.",

    pros: [
      "Eliminates the pull-cord — the single biggest barrier to ownership for older or smaller users",
      "Integrated lithium pack — no separate battery to lose or misplace",
      "Pull-cord still present as a backup — never strands the user",
      "About 30 starts per charge — covers a full season for a typical owner"
    ],
    cons: [
      "Adds £80–£120 to host mower over the same engine with pull-start only",
      "Lithium starter pack is non-serviceable — 10-year replacement cost typically £150",
      "Adds 1.5kg to engine weight",
      "Charger is a proprietary part — losing it costs £40 to replace"
    ],

    serviceIntervals: [
      { interval: 'Every season start', task: 'Charge starter pack before first use', cost: '£0' },
      { interval: 'After 30 starts', task: 'Recharge starter pack', cost: '£0 (electricity)' },
      { interval: 'Off-season storage', task: 'Recharge to 50% before winter storage', cost: '£0' },
      { interval: 'Every 5 seasons', task: 'Replace starter pack if charge cycles exhausted', cost: '£150 OEM' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5', fault: 'None expected. The integrated lithium pack is robust through its rated cycle count.' },
      { age: 'Years 5–10', fault: 'Starter pack capacity drops — fewer starts per charge. £150 replacement.' },
      { age: 'Years 10+', fault: 'Pull-cord becomes the primary start method when the pack is exhausted — the engine continues to run normally.' }
    ],

    partsCosts: [
      { part: 'Replacement starter pack', oem: '£150', generic: '—' },
      { part: 'Charger', oem: '£40', generic: '—' },
      { part: 'Starter button switch', oem: '£15', generic: '£8' }
    ],

    verdict: "The right addition to a Briggs mower for buyers who value the easier start over the £100 premium. Particularly worth it for users over 65, anyone with shoulder or wrist issues, and households where multiple people use the mower. Skip if you have no problem with pull-cords — the engine itself is unchanged.",
    altLink: '/engine/briggs-675ex'
  },

  {
    slug: 'briggs-850ex',
    name: 'Briggs & Stratton 850EX Series',
    country: 'USA',
    family: 'Premium walk-behind petrol OHV',
    match: /B&S 850EX|850 EX|Briggs 850EX|875EX|875 EX|850 Pro|875 Pro/i,
    headline: "The premium-tier walk-behind Briggs — fitted to AL-KO and pro-spec Cobra",
    displacement: '190cc',
    torque: '8.5 ft-lb',
    architecture: 'Single-cylinder OHV, pressure-lubricated, ReadyStart auto-choke',
    typicalLife: '1,200–1,800 hours (15–20 years domestic)',

    profile: "The 850EX is the bigger sibling of the 750EX, fitted to premium walk-behind petrols including the AL-KO Highline 5.2, Cobra MX534SPC top spec, and some Murray and Lawnflite mid-models. Pressure lubrication (with a proper oil sump cover) rather than splash makes it a noticeably longer-life engine than the 675EX class, especially when the mower spends time on slopes.",

    pros: [
      "Pressure-lubricated bottom-end is rare at this price — typically only found on Honda GCV equivalents",
      "ReadyStart auto-choke gives one-pull starting reliably to year 10",
      "Briggs dealer network supports parts and service everywhere in the UK",
      "Quieter than the 675EX equivalent due to the OHV refinement"
    ],
    cons: [
      "About £100 premium over the 675EX equivalent in host mower",
      "Limited number of host mowers — finding one outside AL-KO or top Cobra is harder",
      "Slightly heavier than the 675EX block",
      "Service kit pricier than the 500E/675EX category"
    ],

    serviceIntervals: [
      { interval: 'Every season (or 50 hours)', task: 'Oil change — SAE 30 or 10W-30', cost: '£10 DIY / £40 dealer' },
      { interval: 'Every 2 seasons', task: 'Air filter (paper element)', cost: '£15 OEM' },
      { interval: 'Every 3 seasons', task: 'Spark plug', cost: '£5 DIY' },
      { interval: 'Each season start', task: 'Drain stale fuel or use stabiliser', cost: '£6 stabiliser' }
    ],

    faultsTimeline: [
      { age: 'Years 1–6', fault: 'None expected with annual oil change. Genuinely robust through this period.' },
      { age: 'Years 6–10', fault: 'ReadyStart butterfly sticks if mower stored outdoors. £45 dealer fix or £15 DIY with carb cleaner.' },
      { age: 'Years 10–15', fault: 'Carburettor float seal perishes — symptom: occasional fuel weep on long-term storage. £30 OEM seal kit.' },
      { age: 'Years 15–20', fault: 'Valve clearance drifts. Adjust to spec — engine good for another 5 years.' }
    ],

    partsCosts: [
      { part: 'Air filter', oem: '£15', generic: '£8' },
      { part: 'Spark plug (NGK BPR4ES)', oem: '£8', generic: '£3' },
      { part: 'Carburettor service kit', oem: '£35', generic: '£18' },
      { part: 'Replacement engine (used)', oem: '£200–£280', generic: '—' }
    ],

    verdict: "The right engine for a premium walk-behind mower where you want better-than-675EX longevity without paying for a Honda. Fits the AL-KO Highline 5.2 and top-spec Cobra perfectly. The natural step up from a 675EX for buyers who want one more rung of build quality.",
    altLink: '/engine/briggs-675ex'
  },

  {
    slug: 'husqvarna-bli-battery',
    name: 'Husqvarna BLi Battery Platform',
    country: 'Sweden',
    family: 'Cordless lithium-ion 36V system for walk-behind mowers and tools',
    match: /Husqvarna 36V|Husqvarna BLi|BLi100|BLi200|BLi300|Aspire P4A/i,
    headline: "Husqvarna's pro cordless platform — fitted to LC and Aspire mowers",
    displacement: 'N/A (electric)',
    torque: 'Equivalent to 3.0–5.0HP petrol',
    architecture: 'Lithium-ion 36V system, cross-tool with chainsaws, hedge trimmers, blowers',
    typicalLife: '1,000+ charge cycles per battery (5-8 years domestic use)',

    profile: "Husqvarna BLi is the Swedish premium answer to Stihl AP — same target market, same cross-tool philosophy. BLi shares across mowers (Aspire LC34, LC141i), Husqvarna chainsaws and hedge trimmers, and Gardena 36V garden tools. The Aspire range also supports the Power For All Alliance partnership with Bosch, allowing one battery across both ecosystems on selected tools.",

    pros: [
      "Power for All Alliance compatibility on Aspire — uses Bosch 18V or Husqvarna 36V batteries",
      "Dealer network strong through any Husqvarna outdoor power retailer",
      "Pro-grade battery cells survive higher charge-cycle counts than budget rivals",
      "Genuine cross-tool sharing covers most pro garden cordless tasks"
    ],
    cons: [
      "Premium pricing across the BLi range",
      "Smaller UK ecosystem than Stihl AP or EGO 56V",
      "Aspire range positioning is partial — not all Aspire tools work with full BLi batteries",
      "Replacement BLi300 battery is £280+"
    ],

    serviceIntervals: [
      { interval: 'Every season start', task: 'Inspect battery contacts', cost: '£0 DIY' },
      { interval: 'Every season', task: 'Sharpen blade', cost: '£15' },
      { interval: 'Off-season', task: 'Store battery at 40-60% charge', cost: '£0' }
    ],

    faultsTimeline: [
      { age: 'Years 1–5', fault: 'None expected. BLi is robust through its rated cycle count.' },
      { age: 'Years 5–8', fault: 'Capacity drops to 70-80% of original. £180-£280 replacement battery depending on Ah rating.' },
      { age: 'Years 8+', fault: 'Original battery typically retired. Chargers and tools continue with new battery.' }
    ],

    partsCosts: [
      { part: 'BLi200 battery (5.2Ah)', oem: '£199', generic: '—' },
      { part: 'BLi300 battery (9.4Ah)', oem: '£289', generic: '—' },
      { part: 'QC330 charger', oem: '£85', generic: '—' },
      { part: 'OEM blade (LC141)', oem: '£22', generic: '£10' }
    ],

    verdict: "The right cordless platform for owners who already use Husqvarna chainsaws or hedge trimmers, and the natural choice for Aspire/Gardena/Bosch Power For All Alliance users. EGO has more pure mower-focus development; Stihl has wider pro tool range; Husqvarna sits in between with the strongest Swedish build pedigree.",
    altLink: '/engine/stihl-ap-system'
  },

  {
    slug: 'briggs-vanguard-bigblock',
    name: 'Briggs Vanguard Big Block V-Twin',
    country: 'USA',
    family: 'Commercial-spec vertical-shaft V-twin for ride-ons and zero-turns',
    match: /Vanguard.*Big Block|Vanguard 810|Vanguard 896|Vanguard 993|Big Block|Vanguard 23|Vanguard 26|Vanguard 28|Vanguard 35/i,
    headline: "Briggs' answer to Kawasaki FX — pro V-twin for commercial ride-ons",
    displacement: '810–993cc',
    torque: '25.0–33.0 ft-lb',
    architecture: 'Air-cooled V-twin OHV, full pressure lubrication, dual ball bearings',
    typicalLife: '2,500–4,000 hours (15–20 years commercial)',

    profile: "Big Block Vanguard is Briggs' pro V-twin, fitted to commercial-spec Cub Cadet, Westwood, Countax, and a long list of US-built zero-turns. Genuinely competitive with Kawasaki FX on build quality — pressure lubrication, oil filter, forged crank, dual ball bearings. Cheaper than equivalent Kawasaki FX in host mower by about £400, which is why Cub Cadet and Westwood specify it across their pro lineup.",

    pros: [
      "Genuine commercial-grade engine at £400 below equivalent Kawasaki FX in host mower",
      "Pressure lubrication and oil filter standard — built for daily-use abuse",
      "Briggs dealer network is the most-densely distributed of any small engine in the UK",
      "Same essential service routine as the entry Briggs — owner familiarity carries over"
    ],
    cons: [
      "Not as smooth as a Kawasaki FX at idle — Big Block has more low-rev shake",
      "Heavier than a Kawasaki FS or FX equivalent",
      "Slightly higher fuel consumption than the Kawasaki at equivalent displacement",
      "Resale lag — Kawasaki-engined mowers hold value better"
    ],

    serviceIntervals: [
      { interval: 'Every 100 hours', task: 'Oil change — Briggs 10W-30 or 15W-40', cost: '£16 DIY / £75 dealer' },
      { interval: 'Every 100 hours', task: 'Oil filter', cost: '£12 OEM' },
      { interval: 'Every 200 hours', task: 'Air filter (paper + foam pre)', cost: '£25 OEM' },
      { interval: 'Every 300 hours', task: 'Spark plug pair', cost: '£10 DIY' },
      { interval: 'Every 500 hours', task: 'Valve clearance check', cost: '£0 DIY / £120 dealer' }
    ],

    faultsTimeline: [
      { age: 'Years 1–8 (under 1500hr)', fault: 'None expected with proper service.' },
      { age: 'Years 8–15 (1500–3000hr)', fault: 'Coil pack drift — common at this hour mark. Symptom: rough one-cylinder idle. £35 OEM coil, 30-min DIY.' },
      { age: 'Years 15+ (3000hr+)', fault: 'Compression starts to drop. Replacement Big Block engine from a wrecked ride-on £450–£700.' }
    ],

    partsCosts: [
      { part: 'Oil filter', oem: '£12', generic: '£6' },
      { part: 'Air filter (paper)', oem: '£25', generic: '£12' },
      { part: 'Spark plug pair (BPR5ES)', oem: '£10', generic: '£5' },
      { part: 'Coil pack', oem: '£35', generic: '£18' },
      { part: 'Replacement engine (used 1500hr)', oem: '£500', generic: '—' }
    ],

    verdict: "The right engine to specify if you want commercial-grade ride-on capability without paying Kawasaki FX prices. Big Block Vanguard delivers about 90% of the Kawasaki refinement at 75% of the cost — and Briggs parts continuity is genuinely excellent. Pick on price differential, the engineering is fully credible.",
    altLink: '/engine/briggs-vanguard'
  },
];
