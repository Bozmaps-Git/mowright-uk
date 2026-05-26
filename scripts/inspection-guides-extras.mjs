// Extra inspection and how-to guides. Same schema as inspection-guides.mjs.
// Imported by build.mjs and concatenated with INSPECTION_GUIDES.

const U = id => `https://images.unsplash.com/photo-${id}?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600`;

export const INSPECTION_GUIDES_EXTRA = [
  {
    slug: 'inspect-used-stihl-rm-448',
    image: U("1500076656116-558758c991c1"),
    imageAlt: 'Stihl RM 448 T petrol mower on a UK lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Stihl RM 448 T — UK guide',
    description: '10-minute pre-purchase inspection for a used Stihl RM 448 T. Stihl Kohler engine, drive belt, deck, single-lever drive checks. What to pay in 2026 and what to walk away from.',
    keyword: 'used Stihl RM 448 inspection',
    date: '2026-05-26',
    related: [117, 118, 4, 23],
    lead: "The Stihl RM 448 T is the German premium-mid self-propelled petrol mower in the UK. Built to a noticeably higher build standard than the Mountfield equivalent, but it commands a premium used as well as new. Here is the 10-minute inspection that catches every fault buyers regret missing.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch, and a small magnet (to test the deck for filler-and-paint repairs).",
          "**Insist on a cold start.** A Stihl mower that has been started 5 minutes before you arrived will hide carburettor problems."
        ]
      },
      {
        h: '1. Cold-start the Stihl-Kohler engine',
        p: [
          "Two primer squeezes, then a single firm pull. A healthy RM 448 T fires on the first pull cold and idles within 5 seconds without smoke.",
          "**Smoke that clears in 10 seconds** is normal on a cold start. Persistent smoke means top-end wear — walk away unless dirt-cheap.",
          "**Knocking or rattling once running** means internal damage. Replacement Stihl-Kohler block is £400+, so the mower is effectively scrap."
        ]
      },
      {
        h: '2. Test the single-lever drive',
        p: [
          "Engage the bail-arm and walk the mower onto an incline. The single-lever drive should pull cleanly without slipping or hesitating.",
          "**Slipping under load** = stretched drive belt. £35 OEM part, 45-minute DIY job. Knock £50 off the asking price.",
          "**Drive that locks fully on** = the drive cable has stretched and lost its return travel. £18 OEM cable, same DIY job. Knock £25 off."
        ]
      },
      {
        h: '3. Inspect the steel deck',
        p: [
          "Lift the front of the mower and shine your torch underneath. Surface rust is normal at any age and harmless. Stihl decks are powder-coated steel and reasonably durable.",
          "**Daylight visible through the deck** means rust-through — walk away unless under £100. Replacement decks are not economically available.",
          "**Magnetic check on patches**: the small magnet sticks to genuine steel but not to filler. If the magnet does not grab on a suspect area, the deck has been repaired and the mower has been through a serious impact."
        ]
      },
      {
        h: '4. Test the operator-presence bar and brake',
        p: [
          "Release the operator-presence bar with the engine running. The blade should stop within 3 seconds.",
          "**Blade keeps spinning past 5 seconds** = the brake disc is worn. £25 OEM part, but flag it. Knock £40 off and budget the fix.",
          "**Bar feels notchy or stiff** = the cable is corroded inside the sheath. £15 OEM cable, easy DIY swap."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**2018–2020:** £180–£280 in tidy condition with documented service.",
          "**2021–2023:** £300–£420. Newer engine spec, less likely to need carb work.",
          "**2024–2025:** £450–£540. Near-new, sometimes with dealer warranty remaining.",
          "**Knock £40** for: stretched drive cable, missing service stamps, worn operator-presence bar. **Knock £100** for any deck filler repair or evidence of drop damage."
        ]
      }
    ],
    faqs: [
      { q: 'Is the Stihl RM 448 T worth the premium over the SP46?', a: "Yes, if you keep mowers for 10+ years. The Stihl deck stamping is genuinely heavier-gauge, the engine bearings are better-spec, and the resale curve is shallower. For 5-year ownership, the Mountfield SP46 is the smarter buy on cost-per-year terms." },
      { q: 'What does a Stihl-dealer service cost?', a: "£95–£140 including oil, plug, air filter, blade sharpen and carb clean. Worth booking on first purchase to baseline the mower, then DIY annually for under £25." },
      { q: 'Where can I buy genuine Stihl parts?', a: "Any authorised Stihl dealer — find the nearest via the Stihl GB website. Online parts are available but the dealer network is the strongest of any garden-machinery brand, so use it." }
    ]
  },

  {
    slug: 'inspect-used-kubota-ride-on',
    image: U("1572176030147-19c9b7c9b3a3"),
    imageAlt: 'Kubota orange ride-on diesel mower in a garden',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Kubota ride-on mower — UK buyer guide',
    description: '15-minute pre-purchase inspection for a used Kubota T/GR/G/Z/ZD/BX ride-on. Diesel-specific checks, hydrostatic drive, deck spindles, hours and service history. What to pay in 2026.',
    keyword: 'used Kubota ride-on inspection',
    date: '2026-05-26',
    related: [132, 134, 137, 189],
    lead: "Used Kubotas are not the same buying experience as used Mountfields. These are agricultural-grade Japanese machines designed to be serviced for 20+ years, and the right inspection should reflect that. Here is the 15-minute walkthrough for any Kubota petrol or diesel ride-on bought used.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** a torch, a Kubota hours-meter check (just confirm where it is on the dash on this model), and your phone for service-record photos.",
          "**Demand service history.** Stamped service records are the single biggest value-driver on any Kubota — without them the mower is worth 30-40% less than equivalent stamped units."
        ]
      },
      {
        h: '1. Check the engine hours',
        p: [
          "Find the hour-meter on the dash. Under 400 hours is excellent for any domestic-use Kubota; under 1500 hours is good for a contractor-used unit.",
          "**Hours over 4000 on a diesel** does not retire the mower — Kubota diesels are 8000-hour engines — but should reduce the price by 25-30%.",
          "**Hours over 1500 on a petrol Kubota** means the engine is approaching mid-life. Still serviceable, but factor that into the price."
        ]
      },
      {
        h: '2. Cold-start the engine',
        p: [
          "A diesel Kubota fires within 5 seconds once the glow plugs cycle (warning light goes out). Petrol Kubotas with Kawasaki engines fire on the first or second turn of the key.",
          "**White smoke that clears in 30 seconds on diesel** is normal. Black smoke under load = injector wear, budget £200-£600 dealer service.",
          "**Hesitation or weak cranking** = battery weak (£70 fix) or starter motor worn (£180 fix). Knock the appropriate amount off."
        ]
      },
      {
        h: '3. Test the hydrostatic drive',
        p: [
          "On a flat surface, move the forward and reverse pedals through their full travel. Drive should be smooth, no clunks, no juddering.",
          "**Slipping under load on an incline** = hydro pump wear. £600-£1500 dealer rebuild. Walk away unless the asking price is under half book value.",
          "**Whining noise under load** = hydro pump approaching end of life. Budget £800 for a rebuild within 6-12 months."
        ]
      },
      {
        h: '4. Inspect the deck and spindles',
        p: [
          "Tilt the mower with the engine off (use the dealer's lift if buying through a dealer). Inspect the deck from underneath.",
          "**Surface rust** on the underside is normal at any age. **Rust-through** the deck is walk-away — replacement Kubota decks are £900-£1500.",
          "Grip the centre of each blade and try to rock it. **Any vertical play** means worn spindle bearings — £80-£140 per spindle dealer fix. Knock £150 off per worn spindle.",
          "Check for impact damage at the deck-corner welds. Crack lines or weld repairs mean the deck has been bashed into something solid."
        ]
      },
      {
        h: '5. Check the engine fluids and filters',
        p: [
          "Engine oil should be clean amber (petrol) or dark but not black (diesel). **Black diesel oil at under 100 hours since last change** indicates fuel dilution — injector or pump issue.",
          "Coolant should be at the cold-mark on the expansion tank and clean green or red. Rust-coloured coolant indicates neglected service.",
          "**Diesel fuel filter** location varies by model — find it and check for clean fuel. Cloudy fuel means contamination, walk away."
        ]
      },
      {
        h: "6. What Kubotas are worth in 2026",
        p: [
          "**T1880 / T2090 petrol:** £2,200–£4,800 used depending on hours.",
          "**GR1600-II / GR2120-II petrol garden tractor:** £2,800–£6,400 used.",
          "**G21/G23/G26 diesel ride-on:** £4,500–£12,000 used, hours and service history dominate price.",
          "**Z-series petrol zero-turn:** £1,900–£9,000 used depending on spec.",
          "**ZD-series diesel zero-turn:** £5,500–£18,500 used, commercial spec only.",
          "**BX-series sub-compact:** £5,500–£11,500 used — confirm mid-mount deck is included."
        ]
      }
    ],
    faqs: [
      { q: 'Are Kubota ride-ons worth the premium over John Deere?', a: "If you keep the machine 15+ years, yes — the Kubota engine outlasts the equivalent JD by 30-40%. If you upgrade every 5-7 years, JD holds resale slightly better, so the actual cost-of-ownership gap closes." },
      { q: 'Can I get parts for old Kubota mowers?', a: "Yes. Kubota parts continuity is among the best in the UK — your local Kubota dealer can source service items for any unit going back to the 1990s. Major repair parts (deck spindles, hydro pumps) typically arrive within 2 working days." },
      { q: 'Should I buy from a Kubota dealer or private?', a: "Private saves 15-25% but loses the 3-12 month dealer warranty. For a £6000+ Kubota the warranty is genuinely worth the premium. Under £3000, private can make sense if the mower passes inspection." }
    ]
  },

  {
    slug: 'inspect-used-cobra-mx534spc',
    image: U("1602858916773-9cf8e6b9da3a"),
    imageAlt: 'Cobra MX534SPC self-propelled mower on a freshly-cut lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Cobra MX534SPC — UK guide',
    description: '10-minute pre-purchase inspection for a used Cobra MX534SPC. Briggs 750EX engine, 53cm cut, rear roller, drive cable, deck checks. What to pay in 2026.',
    keyword: 'used Cobra MX534SPC inspection',
    date: '2026-05-26',
    related: [22, 23, 56, 3],
    lead: "The Cobra MX534SPC is the larger sibling of the MX46SPB — a 53cm cut, Briggs 750EX engine, rear roller for stripes. The Cobra that handles lawns over 800m² comfortably. Here is the 10-minute used-mower inspection.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch.",
          "**Insist on a cold start.** Briggs 500E carbs varnish fast in spring — a hot mower will hide the problem."
        ]
      },
      {
        h: '1. Cold-start the Briggs 500E',
        p: [
          "Three primer-bulb squeezes, full throttle, pull. The 500E fires on the first or second pull cold.",
          "**Won't fire after four pulls** = stale fuel or varnished carb. £30 carb clean at a dealer or £6 with carb cleaner spray DIY. Knock £30 off.",
          "**Primer bulb stays squashed** = the bulb has perished. £4 part, 5-minute fix, but flag it on inspection."
        ]
      },
      {
        h: '2. Check the rear roller',
        p: [
          "Lift the rear of the mower and spin the roller by hand. It should turn smoothly with no clicking, no notchy feel, and no vertical play.",
          "**Clicking bearings** = £18 OEM bearing kit, £35 dealer fit. Knock £40 off.",
          "**Deep gouges on the roller surface** show up on the lawn as uneven stripes. Cosmetic dings are fine."
        ]
      },
      {
        h: '3. Test the self-propel',
        p: [
          "Engage the bail-arm and walk the mower onto an incline. Drive should pull cleanly without slipping.",
          "**Slipping under load** = stretched drive cable. £18 part, 25-minute DIY. Knock £30 off."
        ]
      },
      {
        h: '4. Inspect the deck and blade',
        p: [
          "Tilt the mower with the spark plug disconnected. Surface rust is normal; rust-through is walk-away.",
          "Grip the blade and check for play. Vertical wobble means worn spindle bearings — £30 dealer fix.",
          "Check the blade edge — a hand-sharp edge is fine, a chipped or bent blade needs £8 replacement."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**2018–2020:** £160–£220 in tidy condition.",
          "**2021–2023:** £230–£310. Less likely to need carb work.",
          "**2024–2025:** £320–£380. Near-new with possible warranty remaining.",
          "**Knock £30** for: cracked primer bulb, stretched drive cable, missing service stamps. **Knock £80** for any rust-through or weld repairs."
        ]
      }
    ],
    faqs: [
      { q: 'Cobra MX46SPB vs Mountfield SP46?', a: "Cobra has the standard rear roller (stripes), Mountfield has the wider UK dealer network for parts. Both run Briggs engines (Cobra 500E, Mountfield Stiga ST120). For stripes the Cobra, for parts continuity the Mountfield." },
      { q: 'Where do Cobra parts come from?', a: "Cobra is distributed by Henton & Chattell in Nottinghamshire — your local dealer orders parts through them, typically 2-3 day delivery. Service items shared with Briggs (filters, plugs) are available at any small-engine retailer." }
    ]
  },

  {
    slug: 'inspect-used-ego-cordless',
    image: U("1593222301920-c1c4d0a5e6f1"),
    imageAlt: 'EGO LM2135E-SP cordless lawn mower on a green lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used EGO cordless mower — UK guide',
    description: 'Pre-purchase inspection for a used EGO 56V cordless mower (LM1700 / LM1900 / LM2135 / LMX5300). Battery health, drive cable, deck, charging port checks. What to pay in 2026.',
    keyword: 'used EGO cordless inspection',
    date: '2026-05-26',
    related: [31, 32, 33, 34],
    lead: "EGO 56V cordless mowers are the UK\'s top-selling premium battery mowers and a strong used buy — but battery health is the single biggest variable. Here is the 10-minute inspection that prevents you buying an underperforming battery dressed as a bargain.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** your own EGO-compatible charger if you have one (lets you test the battery independently). A torch.",
          "**Confirm with the seller:** battery is included, charger is included, and both are genuine EGO. Aftermarket batteries are 30% the price but typically have 40% the cycle life."
        ]
      },
      {
        h: '1. Test the battery',
        p: [
          "Fully charge the battery before the inspection if the seller agrees. On a fully-charged 5Ah battery, an EGO LM2135E-SP should run 35-45 minutes on a typical dry lawn.",
          "**Battery shows full charge but runs only 15-20 minutes** = capacity has dropped to 40-50% of original. £180 replacement, walk away unless the asking price reflects this.",
          "**Battery shows a fault code on the LED panel** = internal cell damage. £180+ replacement. Knock the full battery price off."
        ]
      },
      {
        h: '2. Check the deck and blade',
        p: [
          "Tilt the mower with the battery removed. Plastic and composite decks resist rust well — surface marks are cosmetic.",
          "Grip the blade — minimal vertical play is fine, significant wobble means motor-shaft bearing wear (£120 dealer fix).",
          "Blade edge sharpens like any rotary — £15 OEM blade if visibly worn or chipped."
        ]
      },
      {
        h: '3. Test the self-propel (on SP models)',
        p: [
          "Engage the bail-arm and the drive should pull cleanly through its full speed range.",
          "**Drive feels notchy or steps between speeds** = stretched cable, £18 part, easy DIY fix.",
          "**Drive fails completely** = motor brush wear or controller failure. £150-£280 dealer fix, factor into price."
        ]
      },
      {
        h: '4. Inspect the charging port and battery seat',
        p: [
          "The battery seat on the mower should be clean, undamaged, and free of corrosion. Bent or corroded contacts mean the previous owner has been rough with the battery insertion.",
          "**Corrosion on contacts** = water has been entering the seat. Walk away unless under £200, the controller behind the seat is at risk."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**LM1700 / LM1900 (older 2-3 year old):** £180–£260 with original battery still healthy.",
          "**LM2135E-SP (3-5 year old):** £280–£420 with a strong-capacity battery.",
          "**LMX5300SP-XP (1-3 year old):** £500–£680. Newer flagship, holds value well.",
          "**Knock £150** if the battery shows reduced runtime. **Walk away** if the battery shows a fault code at any age."
        ]
      }
    ],
    faqs: [
      { q: 'How do I check EGO battery health?', a: "Fully charge it, then time how long it runs on a typical dry lawn under self-propel. Compare to the new-mower specification (e.g. 45 mins for an LM2135E-SP with 5Ah). Anything under 60% of new runtime means the battery is approaching retirement." },
      { q: 'Can I use an old charger with a new EGO battery?', a: "Yes — all EGO 56V chargers and batteries are cross-compatible since launch. Older chargers are slower (typical 30-40 minute charge vs 25 minutes for the rapid charger) but otherwise work identically." },
      { q: 'Are aftermarket EGO batteries worth it?', a: "Rarely. The £100 saving on a £200 OEM battery comes with a 40% cycle life and frequent compatibility issues with newer mowers. Buy a genuine EGO battery — the price has come down significantly since 2022." }
    ]
  },

  {
    slug: 'inspect-used-husqvarna-automower-nera',
    image: U("1602858916773-9cf8e6b9da3a"),
    imageAlt: 'Husqvarna Automower NERA wire-free robotic mower at its charging dock',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Husqvarna Automower NERA — UK guide',
    description: 'Pre-purchase inspection for a used Husqvarna NERA wire-free Automower (320 / 405X / 410 XE / 430X). EPOS satellite, blade carriage, drive wheel, battery, app pairing. What to pay in 2026.',
    keyword: 'used Husqvarna Automower NERA inspection',
    date: '2026-05-26',
    related: [64, 65, 66, 70],
    lead: "Husqvarna NERA Automowers (the wire-free EPOS-satellite variants) are the newest premium robotic mowers in the UK. Lots of used units appearing as early adopters move to the latest models. Here is the inspection routine that catches the issues unique to wire-free units.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** a torch, your phone (to test app pairing), and ask the seller for the original PIN code.",
          "**Confirm the model.** \"Automower\" covers a 25-year span from 1995 to 2026. The specific model dictates current parts availability and resale value. NERA models are wire-free and command a premium."
        ]
      },
      {
        h: '1. Check the operational hours',
        p: [
          "Navigate to the Automower\'s menu (or the Automower Connect app for newer models) and find the Operating Hours counter. Most Automowers retire at 8000-12000 hours.",
          "**Hours under 2000** = excellent for a 5-8 year old unit.",
          "**Hours over 8000** does not retire the mower — Husqvarna service major components — but does mean a service is due. Budget £200-£400 dealer service."
        ]
      },
      {
        h: '2. Inspect the blade carriage and disc',
        p: [
          "Tilt the mower upside down. The blade disc should spin freely with no metallic grinding.",
          "Three small blades are bolted to the carriage on most models. They should be sharp, undamaged, and present (some sellers lose blades during transport). £8 OEM 3-pack replacement.",
          "**Visible damage to the disc itself** = the mower has hit something hard repeatedly. £35 OEM disc replacement, DIY fit."
        ]
      },
      {
        h: '3. Test the drive wheels',
        p: [
          "On flat ground, with the mower running, watch the drive wheels for synchronicity. Both should spin at the same speed when going straight.",
          "**One wheel slower than the other** = drive motor or gearbox wear on one side. £150-£250 dealer fix per side, and on older units sometimes uneconomic.",
          "**Wheels show worn or smooth treads** = £18 OEM tyre per wheel, easy DIY fix on most models."
        ]
      },
      {
        h: '4. Test the boundary wire reception (wire-equipped models)',
        p: [
          "Place the Automower near the boundary wire — it should detect the signal within a few seconds and start its perimeter run.",
          "**Mower drives over the boundary wire** = receiver coil damage (typically water ingress). £120-£200 dealer fix.",
          "**Mower loops endlessly inside the lawn** = signal too weak. Could be a charging-station fault (£200 fix) or a buried-wire break (free DIY repair with the wire-finder)."
        ]
      },
      {
        h: '5. Pair to the app and check settings',
        p: [
          "Newer Automowers (315X, 430X NERA, 535 etc.) connect via the Automower Connect app. Have the seller transfer ownership or remove the device from their account.",
          "**Cannot find the device on app** = WiFi/cellular module fault. £180 replacement on older models.",
          "**Theft tracking still active under previous owner** = transfer not completed, blocks all features. Insist on this being resolved before payment."
        ]
      },
      {
        h: "6. What it's worth in 2026",
        p: [
          "**Automower 305 (2018-2024):** £400–£700 used with healthy battery.",
          "**Automower 315X / 415X (2018-2024):** £750–£1,200 used.",
          "**Automower 430X NERA (wire-free, 2022+):** £1,400–£1,900 used.",
          "**Automower 535 AWD (premium AWD, 2021+):** £2,800–£3,800 used.",
          "**Knock £200** if battery shows reduced runtime (full charge, runs under 40 minutes). **Knock £300** for any drive-motor asymmetry."
        ]
      }
    ],
    faqs: [
      { q: 'Are old Husqvarna Automowers still serviceable?', a: "Yes — Husqvarna supports Automowers back to 2010 through the UK dealer network. Even older units (305s from 2014, 220s from 2010) get major service support including blade discs, drive motors, and battery replacements." },
      { q: 'Battery replacement cost?', a: "£120-£280 depending on model. The 305 takes an £130 OEM battery, the 430X NERA takes a £270 OEM battery. Both are 30-minute DIY jobs once the battery cover is unscrewed." },
      { q: 'Wire-free or boundary-wire?', a: "If installing fresh, wire-free (NERA range) saves a day of wire-laying. If buying second-hand with the wire already installed in good condition, boundary-wire saves £900-£1500 over equivalent NERA." }
    ]
  },

  {
    slug: 'how-to-sharpen-mower-blade-uk',
    image: U("1574202892193-66e1c8cb9b1f"),
    imageAlt: 'Hands sharpening a lawnmower blade with a file',
    imageCredit: 'Unsplash',
    title: 'How to sharpen a lawn mower blade — UK DIY guide',
    description: 'Step-by-step guide to sharpening a UK lawn mower blade with a metal file or angle grinder. When to sharpen, when to replace, balance test, safety. Saves £35-£50 per service.',
    keyword: 'sharpen lawn mower blade UK',
    date: '2026-05-26',
    related: [1, 3, 23],
    lead: "A sharp blade cuts grass cleanly; a blunt blade tears it, leaving brown tips and weakening the lawn. Sharpening takes 15 minutes with a metal file and saves £35-£50 per service. Here is the UK DIY guide to doing it properly.",
    sections: [
      {
        h: 'When does a blade need sharpening?',
        p: [
          "Check the lawn 24 hours after mowing. **Brown or whitish grass tips** indicate the blade is tearing rather than cutting.",
          "**Blade visibly chipped or rounded** when you tilt the mower means sharpening is overdue.",
          "Typical timing: **once a year for normal use**, **twice a year for owners cutting over a quarter-acre weekly**.",
          "Hover and rotary blades both sharpen the same way. Cylinder mowers are a separate process (the cylinder is back-lapped against the bottom blade)."
        ]
      },
      {
        h: 'Tools you need',
        p: [
          "**A 10-12 inch metal file** (£8 from any DIY shop) for hand-sharpening — slower but gives the safest result.",
          "**Or a 4-inch angle grinder with a metal flap disc** (£25-£40 if you do not have one) — faster, but easier to ruin a blade if you go too deep.",
          "**Safety:** thick gloves, eye protection, spark plug disconnected before removing the blade."
        ]
      },
      {
        h: '1. Remove the blade safely',
        p: [
          "**Disconnect the spark plug first.** This is non-negotiable — a starter motor or accidental pull-cord engagement with your hand near the blade is how amputations happen.",
          "Tip the mower onto its side, carburettor side **up** (so fuel and oil do not flood the air filter).",
          "Use a socket wrench to undo the central blade bolt. Most are 16-17mm. If the blade spins, jam a block of wood between the blade tip and the deck wall.",
          "Note which way the blade was fitted — there is an 'up' side facing the engine. Mark it with a permanent marker before removing."
        ]
      },
      {
        h: '2. Sharpen the cutting edge',
        p: [
          "Clamp the blade in a vice with the cutting edge upward.",
          "**With a file:** push the file along the existing bevel at the original 30-degree angle. Maintain the same angle for the full length of the blade. Typically 20-30 strokes per cutting edge brings back a hand-sharp edge.",
          "**With an angle grinder:** light passes along the bevel, never grinding deeper than 1-2mm at a time. Stop every few passes to let the metal cool — overheating ruins the temper of the steel.",
          "**Do not sharpen to razor-sharp.** A 'butter-knife sharp' edge cuts grass perfectly and lasts longer. Razor-sharp dulls within a single mow."
        ]
      },
      {
        h: '3. Balance the blade',
        p: [
          "An unbalanced blade vibrates and damages the engine mounting bolts. **Balance is non-negotiable.**",
          "**Quick test:** drive a small nail into a wall, hang the blade by its central hole. The blade should sit level. If one side drops, file metal off the heavy end (not the cutting edge) until it balances.",
          "**Professional way:** £6 plastic blade balancer from any garden machinery dealer — magnetic cone that gives a definitive level reading."
        ]
      },
      {
        h: '4. Refit the blade',
        p: [
          "Reverse the removal: blade onto the spindle the correct way up, bolt finger-tight, then torque to the spec (typically 35-50 Nm for walk-behind mowers).",
          "**Over-tightening cracks the blade carrier.** Use a torque wrench if you have one.",
          "Reconnect the spark plug. Stand the mower upright and run for 30 seconds — listen for vibration. Smooth running confirms balance; vibration means rebalance."
        ]
      },
      {
        h: "When to replace instead of sharpen",
        p: [
          "**Chipped beyond 2-3mm.** The blade has lost too much metal to reshape.",
          "**Bent.** Hitting a tree root or kerb can bend a blade — replace, never straighten.",
          "**Cracked.** A cracked blade is a safety hazard — replace immediately. £8-£25 for a generic blade, £15-£40 for OEM.",
          "**Sharpened more than 3-4 times.** Each sharpening removes 1-2mm — eventually the blade is too narrow to balance safely."
        ]
      }
    ],
    faqs: [
      { q: 'How often should I sharpen?', a: "Once a season for typical 400m² lawn use. Twice for over 1000m². Three times for commercial users." },
      { q: 'Can I sharpen without removing the blade?', a: "Possible with a small grinding stone, but harder to maintain the angle and impossible to balance. Always remove for any sharpening worth doing." },
      { q: 'What about cordless mower blades?', a: "Same process. Cordless blades are usually slightly thinner steel than petrol equivalents but sharpen identically. Confirm the OEM blade type before buying replacements — some cordless mowers use proprietary mounting holes." }
    ]
  },

  {
    slug: 'how-to-winterise-petrol-mower-uk',
    image: U("1518795841091-3a4ee0fa3776"),
    imageAlt: 'Petrol lawn mower stored for winter in a garden shed',
    imageCredit: 'Unsplash',
    title: 'How to winterise a petrol lawn mower — UK guide',
    description: 'End-of-season storage guide for UK petrol mowers. Fuel stabiliser, oil change, blade, deck cleaning, storage location. Prevents the spring carburettor problem that costs £40-£100 to fix.',
    keyword: 'winterise petrol mower UK',
    date: '2026-05-26',
    related: [1, 3, 23, 56],
    lead: "The single most common spring problem on UK petrol mowers is a varnished carburettor from sitting all winter with stale fuel. Twenty minutes in October prevents £40-£100 of dealer work in April. Here is the proper winterising routine.",
    sections: [
      {
        h: 'The fuel problem in 90 seconds',
        p: [
          "UK petrol is **E10** (10% ethanol). Ethanol absorbs water from the air and separates from the petrol at the bottom of the tank.",
          "**Separated water-ethanol attacks brass jets in the carburettor**, leaving a varnish-like residue. By spring, the carb is clogged.",
          "**This is the cause of 95% of spring no-start problems.** Every Briggs, Honda, Stiga, Kohler, Kawasaki, and Loncin carb suffers from it.",
          "Solution: either remove the fuel before winter, or stabilise it so ethanol does not separate."
        ]
      },
      {
        h: 'Option A: Drain the fuel (simplest)',
        p: [
          "**Run the mower until it stops** from fuel starvation. This empties the tank, fuel lines, and (importantly) the carburettor float bowl.",
          "Engine will sit dry over winter. No varnish forms because there is no fuel.",
          "**Best for:** owners who use the mower less than once a fortnight in season anyway, or owners with no fuel-stabiliser product to hand."
        ]
      },
      {
        h: 'Option B: Stabilise the fuel (easier on storage)',
        p: [
          "**Add a fuel stabiliser** (£8 for a season\'s supply — Briggs Fresh Start, STA-BIL Storage, or any branded equivalent) to the tank.",
          "Run the mower for 5 minutes after adding stabiliser to circulate it through the carb.",
          "**Top the tank fully**, so condensation cannot form in air space above the fuel.",
          "**Best for:** owners who like to start the mower briefly in February on the first dry weekend to confirm it runs."
        ]
      },
      {
        h: '1. Change the engine oil',
        p: [
          "Cold oil holds acids and water from combustion. Leaving it in the engine over winter pits cylinder walls.",
          "**Drain the oil while warm** (run the mower for 5 minutes first), refill with fresh SAE 30 or 10W-30 to the dipstick mark.",
          "Old oil goes in a sealed container to your council recycling centre — never down a drain."
        ]
      },
      {
        h: '2. Clean the deck thoroughly',
        p: [
          "Damp grass clippings on the underside of the deck rot through the winter. **Always clean before storage.**",
          "Tilt the mower (spark plug disconnected, carb side up) and scrape clippings off with a paint scraper or stiff brush.",
          "Touch up any chipped paint on the deck — £4 spray can of mower paint. Prevents winter-spring rust gaining hold."
        ]
      },
      {
        h: '3. Inspect the blade and tighten bolts',
        p: [
          "Winter is the right time to sharpen the blade (see our blade-sharpening guide). Saves the spring rush at dealers.",
          "Check all visible bolts — engine mounts, deck-handle joins, wheel axles. **Vibration loosens bolts over a full season**; tightening now prevents drop-damage in spring use.",
          "Lubricate the throttle cable, drive cable (on SP mowers), and any pivot points with PTFE spray or thin oil."
        ]
      },
      {
        h: '4. Disconnect the spark plug for storage',
        p: [
          "A disconnected spark plug means accidental pull-cord engagement cannot start the engine. Safer for children, safer for visitors who lean on the mower.",
          "Reconnect in spring before the first start. **First start should be cold-start cycle** as if from new: choke if applicable, primer if applicable."
        ]
      },
      {
        h: '5. Store the mower properly',
        p: [
          "**Indoor dry storage is best.** Garage, shed, or barn. Avoid storing directly on concrete (cover the floor with cardboard or a pallet — concrete sweats moisture).",
          "**If outdoor storage is unavoidable,** use a breathable mower cover (£15-£30) — not a plastic tarpaulin, which traps condensation underneath.",
          "**Battery removal on cordless** — store the battery indoors at 40-60% charge in a dry place, not in the mower."
        ]
      }
    ],
    faqs: [
      { q: 'Does fuel stabiliser actually work?', a: "Yes. Tests by independent UK garden machinery dealers show STA-BIL Storage and Briggs Fresh Start prevent ethanol separation through a full UK winter (October-March). Untreated E10 in a typical mower carb starts varnishing after 6-8 weeks." },
      { q: 'What if I forgot to winterise and the mower won\'t start in spring?', a: "Disconnect spark plug, drain old fuel completely, refill with fresh petrol, spray carb cleaner (£6 from any motor factor) into the carb intake while pulling the cord. Usually fires within 4-6 pulls. If it does not, the float bowl needs removal and cleaning — £6 DIY job or £40 at a dealer." },
      { q: 'Can I leave a mower full of fuel over winter without stabiliser?', a: "Up to about 6-8 weeks. Anything longer and ethanol separation begins. By March, expect carb varnishing on at least 50% of unprotected mowers." }
    ]
  },

  {
    slug: 'petrol-vs-cordless-mower-uk',
    image: U("1518792528501-352f829886dc"),
    imageAlt: 'Petrol and cordless mowers side by side',
    imageCredit: 'Unsplash',
    title: 'Petrol vs cordless lawn mower — UK 2026 buyer\'s guide',
    description: 'Definitive UK comparison of petrol and cordless lawn mowers for 2026. Cut quality, runtime, lawn size, running cost, longevity, environmental impact. Which to buy at every budget.',
    keyword: 'petrol vs cordless mower UK',
    date: '2026-05-26',
    related: [1, 31, 33, 117],
    lead: "Cordless has caught up with petrol on cut quality and runtime in 2026 — but petrol still wins on tall wet grass and lawns over 1500m². Here is the definitive UK decision framework, with our recommendations at every budget.",
    sections: [
      {
        h: 'When cordless is the right answer',
        p: [
          "**Lawn under 1000m²,** mowing weekly or fortnightly. Premium 56V EGO or 36V Stihl will run on a single charge with margin.",
          "**Suburban garden where noise matters.** Cordless mowers at 75dB sound like a hairdryer; petrol mowers at 95dB upset neighbours.",
          "**No fuel storage available.** Tenants, retirees in lock-ups, anyone who does not want jerry cans of E10 around.",
          "**Cross-tool savings.** If you already own EGO, Stihl AP, Husqvarna BLi, or Makita LXT tools, the battery sharing makes cordless effectively free of battery cost."
        ]
      },
      {
        h: 'When petrol is still the right answer',
        p: [
          "**Lawn over 1500m².** Even premium cordless mowers run out before finishing a half-acre lawn on a single charge.",
          "**Tall or wet grass routinely.** Cordless mowers bog in tall wet grass; petrol handles it with throttle headroom.",
          "**Mowing every 10-14 days.** Long-grass conditions need petrol torque, not cordless efficiency.",
          "**Slope mowing.** Petrol self-propel drives confidently on steep ground; some cordless drive motors struggle above 25-degree slopes."
        ]
      },
      {
        h: 'Running cost over 10 years',
        p: [
          "**Petrol Mountfield SP46 over 10 years:** £279 mower + £600 fuel + £150 oil/filters/blades + £180 service = **£1,209 total.**",
          "**EGO LM2135E-SP over 10 years:** £699 mower + £30 electricity + £180 replacement battery (year 8) + £45 blades = **£954 total.**",
          "**Honda HRX 476 VY over 10 years:** £899 mower + £600 fuel + £150 oil/filters/blades + £180 service = **£1,829 total.**",
          "**Conclusion:** at 10-year time horizons, premium cordless is genuinely the cheapest option for typical UK lawns."
        ]
      },
      {
        h: 'Cut quality in 2026',
        p: [
          "**Dry grass:** indistinguishable between premium petrol and premium cordless. Both leave a clean cut.",
          "**Wet grass:** petrol wins. Cordless mowers can produce uneven cut on damp grass even on premium 56V platforms.",
          "**Tall grass (over 100mm):** petrol wins. Premium cordless mowers stall or skip on tall grass; petrol clears it.",
          "**Stripes:** equal — both have roller-equipped models. Stihl RMA 448 TC and Greenworks GD60LM46HPK both deliver cricket-pitch stripes from a cordless platform."
        ]
      },
      {
        h: 'Longevity and resale',
        p: [
          "**Petrol** lasts 10-20 years depending on engine quality (Honda longest, Briggs solid, Loncin shortest). Resale is well-established and holds 30-50% of new after 5 years.",
          "**Cordless** is 7-10 years on most platforms (limited by battery cycle life). Resale is improving but battery age dominates listing prices — a 5-year-old cordless mower with 70% battery capacity sells for 30% of new.",
          "**Honda HRX** retains 50-60% of new after 5 years — the strongest residential mower resale in the UK.",
          "**EGO LM2135E-SP** retains 40-50% of new after 5 years if the battery is verified-healthy."
        ]
      },
      {
        h: 'Our 2026 recommendations',
        p: [
          "**Lawn under 400m², want simplicity:** EGO LM1900E-SP (£549).",
          "**Lawn 400-800m², want stripes:** Stihl RMA 448 TC (£799) cordless or Mountfield SP485 HW V (£599) petrol.",
          "**Lawn 800-1500m², want one mower forever:** Honda HRX 476 VY (£899) petrol.",
          "**Lawn over 1500m²:** ride-on territory — Mountfield 1530H entry (£1,899), Kubota T1880 mid (£5,999), or robotic Husqvarna 415X (£1,599)."
        ]
      }
    ],
    faqs: [
      { q: 'Is cordless really comparable to petrol?', a: "In 2026, yes — for typical UK gardens under 1000m² with weekly mowing in dry conditions. Premium 56V cordless (EGO XP, Stihl AP) genuinely matches petrol on cut quality. Petrol still wins on tall wet grass and large lawns." },
      { q: 'How long do cordless batteries last?', a: "Premium platforms (EGO, Stihl AP, Husqvarna BLi) typically deliver 1000-1500 charge cycles before capacity drops below 70%. For typical weekly mowing, that is 7-10 years of full-capacity service. Budget cordless (Worx, Yard Force basic) typically halves that." },
      { q: 'What about petrol fuel cost in 2026?', a: "UK E10 is around £1.45/litre. A typical petrol mower uses 2-3 litres per hour. Domestic weekly mowing burns about 30-50 litres per season — £45-£75 per year. Cordless electricity to charge is around £3-£5 per year — genuinely cheaper to run." }
    ]
  },

  {
    slug: 'how-to-change-mower-oil',
    image: U("1517254712029-3013aae65b5e"),
    imageAlt: 'Hands pouring engine oil into a lawn mower',
    imageCredit: 'Unsplash',
    title: 'How to change lawn mower oil — UK DIY guide',
    description: 'Step-by-step guide to changing oil on a UK petrol lawn mower. Briggs, Honda, Stiga, Kawasaki — all 4-stroke engines covered. Saves £35-£45 per service.',
    keyword: 'change lawn mower oil UK',
    date: '2026-05-26',
    related: [1, 3, 23, 56],
    lead: "Engine oil is the single most important maintenance item on a petrol mower — and the easiest DIY job. Twenty minutes once a year keeps Briggs, Honda, Stiga and Kawasaki engines running for their full design life. Here is the UK guide for every brand.",
    sections: [
      {
        h: 'When does mower oil need changing?',
        p: [
          "**Once a season,** typically at the end of mowing (October-November) so the engine sits over winter with fresh oil.",
          "**Or every 25 hours of running time** for serious mowers (any Briggs or Honda doing commercial work).",
          "**Or any time the oil looks black or smells burnt.** Healthy oil is clean amber-to-light-brown; black oil holds combustion byproducts and acids."
        ]
      },
      {
        h: 'What oil to use',
        p: [
          "**SAE 30** is the universal lawn mower oil — works in any 4-stroke walk-behind petrol mower from Briggs, Honda, Stiga, Kawasaki, or Kohler.",
          "**10W-30** is a multigrade alternative — also fine in any of the above, slightly easier cold-starting.",
          "**15W-40** is for Kubota and other diesel ride-ons only — wrong for petrol mowers.",
          "**Capacity:** typically 0.5-0.7 litres for walk-behind petrol, 1.5-2.2 litres for petrol ride-ons. Check the dipstick or manual."
        ]
      },
      {
        h: '1. Run the engine to warm the oil',
        p: [
          "Run the mower for 3-5 minutes. **Warm oil flows out faster and carries more contaminants with it.**",
          "Do not run it hot — just warm. The mower must be cool enough to handle safely.",
          "**Disconnect the spark plug** after warm-up. Non-negotiable safety step."
        ]
      },
      {
        h: '2. Drain the old oil',
        p: [
          "Method 1: tilt the mower with the **carburettor side up** and pour out through the oil filler. Works for any walk-behind without a drain plug.",
          "Method 2 (Briggs, Honda walk-behind): use the drain plug if fitted — typically a bolt on the lower engine casing. Position a tray underneath, undo the plug, let it drain for 5 minutes.",
          "Method 3 (ride-ons): drain plug always fitted, usually underneath the engine sump. Some ride-ons also have a side drain for easier access. Refer to the manual.",
          "**Dispose of old oil safely** — sealed container, take to your council recycling centre (free service at most UK centres)."
        ]
      },
      {
        h: '3. Replace the oil filter (ride-ons only)',
        p: [
          "Walk-behind mowers do not have oil filters — splash lubrication only.",
          "**Ride-ons with pressure lubrication** (Kubota, Kawasaki FS/FX, Briggs Vanguard) have a spin-on oil filter. Change at every oil change.",
          "Use an oil filter wrench to remove. Smear new oil on the new filter\'s gasket before fitting. Hand-tight only — never spanner-tight (cracks the filter housing)."
        ]
      },
      {
        h: '4. Refill with fresh oil',
        p: [
          "Pour slowly through the oil filler. **Do not overfill** — too much oil causes smoking and gasket leaks.",
          "Use the dipstick (most engines have one) — fill to the upper mark, not above.",
          "**Re-check the level** after pouring. Oil settles into the sump over a minute — top up if needed."
        ]
      },
      {
        h: '5. Run and check',
        p: [
          "Reconnect the spark plug, start the engine, run for 30 seconds. Check for any oil leaks from the drain plug or filter (ride-ons).",
          "**Recheck the dipstick** after stopping the engine. Top up to the upper mark if needed.",
          "**Update the service record** — a written log of oil-change dates adds £50+ to mower resale value."
        ]
      }
    ],
    faqs: [
      { q: 'Can I use car engine oil in my mower?', a: "Yes — SAE 30 or 10W-30 car oil works in any 4-stroke mower engine. Avoid 5W-30 (too thin for mower air-cooling), 20W-50 (too thick for cold starts), or any \"high-mileage\" car oil with detergent additives. Generic SAE 30 from any motor factor is the right choice." },
      { q: 'How much does dealer oil change cost?', a: "£35-£60 at a UK garden machinery dealer for a walk-behind mower. £80-£130 for a ride-on. DIY is £6-£15 in parts and 20 minutes — substantial saving over the mower\'s life." },
      { q: 'What if I overfill?', a: "Drain back to the upper dipstick mark using a small syringe (£3 from any pharmacy) through the filler hole. Overfilled engines push oil past the rings into the cylinder, causing smoke at start-up." }
    ]
  },

  {
    slug: 'inspect-used-stiga-twinclip',
    image: U("1574202892193-66e1c8cb9b1f"),
    imageAlt: 'Stiga Twinclip self-propelled petrol mower on a striped lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Stiga Twinclip — UK guide',
    description: '10-minute pre-purchase inspection for a used Stiga Twinclip 50 SQ B. Stiga ST160 cold-start, twin-blade hub, drive, rear roller checks. What to pay in 2026.',
    keyword: 'used Stiga Twinclip inspection',
    date: '2026-05-26',
    related: [126, 127, 7, 8],
    lead: "The Stiga Twinclip 50 SQ B is the Italian-built premium petrol mower with the twin-blade hub for an ultra-fine cut. Same parent company as Mountfield, but tuned for ornamental-lawn buyers. Here is the 10-minute used-mower inspection.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch.",
          "**The twin-blade hub is the unique component.** Confirm both blades are present and undamaged."
        ]
      },
      {
        h: '1. Cold-start the Stiga ST160',
        p: [
          "Three primer-bulb squeezes, full throttle, single firm pull. The ST160 fires on the first or second pull cold.",
          "**Won't fire after four pulls** = stale fuel or varnished carb. £30 dealer carb clean. Knock £35 off.",
          "**Smoke that does not clear in 15 seconds** = top-end wear. Walk away unless dirt-cheap."
        ]
      },
      {
        h: '2. Inspect the twin-blade hub',
        p: [
          "Tilt the mower with the spark plug disconnected. The Twinclip has **two blades** mounted on a single rotating hub — both should be present, sharp, and undamaged.",
          "**Missing one blade** is the most common Twinclip listing issue. Walk away unless the seller knocks £40 off — the replacement OEM blade is £25 plus £15 fitting.",
          "**Chipped or bent blade** means the mower has hit a hard object. Damage to one blade often comes with damage to the other — inspect both carefully."
        ]
      },
      {
        h: '3. Test the rear roller',
        p: [
          "Lift the rear of the mower and spin the roller by hand. Should turn smoothly.",
          "**Clicking bearings** = £20 OEM bearing kit, £40 dealer fit. Knock £50 off.",
          "**Roller gouged or notched** = uneven stripes. Cosmetic dings are fine."
        ]
      },
      {
        h: '4. Test the self-propel',
        p: [
          "Engage the bail-arm and walk the mower onto an incline. Drive should pull cleanly.",
          "**Slipping under load** = stretched drive cable. £18 OEM, 25-minute DIY. Knock £30 off."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**2018–2020:** £240–£340 in tidy condition with both blades present.",
          "**2021–2023:** £360–£440. Less likely to need carb work.",
          "**2024–2025:** £450–£520. Near-new with possible warranty.",
          "**Knock £60** for: missing twin-blade hub, stretched drive cable, missing service stamps."
        ]
      }
    ],
    faqs: [
      { q: 'Does the twin-blade hub really make a difference?', a: "Yes — the cut is genuinely finer than a single-blade mower. Side-by-side on the same lawn, the Twinclip leaves a more even surface. The difference matters most on ornamental lawns where finish quality is the priority." },
      { q: 'Stiga vs Mountfield (same parent)?', a: "Same Italian parent (Stiga group), different positioning. Stiga is the premium badge with the twin-blade hub and 4-in-1 deck options. Mountfield is the volume value badge. For finest cut, Stiga; for cheapest parts, Mountfield." },
      { q: 'Are Stiga parts easy to find?', a: "Yes — through any Stiga or Mountfield dealer, since the parts catalogues overlap significantly. Service items (filters, plugs, blades) are widely stocked. Twin-blade hubs ship within 3-5 days from any dealer." }
    ]
  },

  {
    slug: 'used-ride-on-buyer-guide-uk',
    image: U("1572176030147-19c9b7c9b3a3"),
    imageAlt: 'Used ride-on mower for sale on a UK lawn',
    imageCredit: 'Unsplash',
    title: 'Used ride-on lawn mower buyer\'s guide — UK 2026',
    description: 'Definitive UK guide to buying a used ride-on lawn mower. What to inspect, what to pay, brand-by-brand resale curves, and the questions every seller should answer.',
    keyword: 'used ride-on lawn mower UK',
    date: '2026-05-26',
    related: [73, 75, 132, 189],
    lead: "Used ride-on lawn mowers are the single biggest savings opportunity in the UK garden-machinery market. A new £4,000 ride-on becomes a £1,800 used unit at year 5, often with documented service and 80% of its working life ahead of it. Here is the framework that turns the saving into a smart purchase, not a costly mistake.",
    sections: [
      {
        h: 'The brands that hold value',
        p: [
          "**Honda HF series:** 55-65% of new after 5 years. The strongest resale curve in the residential ride-on market.",
          "**Kubota T / GR / G / BX series:** 50-65% of new after 5 years, longer if service history is documented.",
          "**John Deere X series:** 50-60% after 5 years. JD\'s dealer network supports the resale.",
          "**Westwood / Countax (AriensCo built):** 40-50% after 5 years. Strong UK brand but smaller used-market.",
          "**Cub Cadet XT series:** 35-45% after 5 years.",
          "**Mountfield ride-ons:** 30-40% after 5 years. Volume sales, large used supply, prices reflect that."
        ]
      },
      {
        h: 'Brands to be careful with',
        p: [
          "**Murray older models:** parts continuity is good, but build quality on 1990s/2000s units varies widely. Inspect very carefully.",
          "**Hayter Heritage:** built in the UK, but the residential ride-on range is small and used buyers often pay a premium for the badge over the engineering.",
          "**Generic Chinese-built mowers from Aldi/Lidl/eBay:** inspection becomes critical. Parts continuity is weak after 5 years."
        ]
      },
      {
        h: 'Hours, not years',
        p: [
          "**Engine hours matter more than calendar age** on any ride-on. A 10-year-old ride-on with 200 hours is in better shape than a 3-year-old with 500.",
          "**Typical hour counts:**",
          "- **Under 200 hours:** essentially new condition mechanically.",
          "- **200-500 hours:** good condition, all systems serviceable.",
          "- **500-1500 hours:** mid-life. Engine still strong, expect minor service items (belts, blade spindles).",
          "- **1500-3000 hours:** approaching mid-life for premium engines (Honda, Kubota, Kawasaki). Major service items due.",
          "- **3000+ hours:** professional-use territory. Engine retirement realistic on petrol; diesel still has life."
        ]
      },
      {
        h: 'The 30-minute inspection',
        p: [
          "**1. Cold-start the engine.** 30 minutes of cold time minimum. Engine should fire cleanly, idle steady, no smoke after 15 seconds.",
          "**2. Drive on flat ground both directions.** Hydrostatic drive should be smooth, no clunks. Mechanical-drive should engage cleanly through gears.",
          "**3. Drive up a 10-degree incline.** Drive should not slip or whine under load.",
          "**4. Engage the blade.** PTO clutch (most ride-ons) or belt-engagement should be smooth. Blade should spin without rumble.",
          "**5. Inspect deck from underneath** (with engine off, key removed). Surface rust normal; rust-through walk-away. Spindle play under blades indicates worn bearings.",
          "**6. Check the seat switch.** Operator-presence safety system must work — get up off the seat with engine running, engine should stop.",
          "**7. Examine the deck-belt and PTO-belt.** Cracked or glazed belts are £25-£60 each, factor into price."
        ]
      },
      {
        h: 'Hidden costs to budget for',
        p: [
          "**Battery:** £45-£90 for a domestic ride-on battery. Test with a multimeter before purchase — 12.4V or below on a cold battery means replacement.",
          "**Tyres:** £25-£60 per tyre. Cracked sidewalls or flat-spotted tyres mean budget for replacements.",
          "**Service:** £150-£400 for a full dealer service on a domestic ride-on, £400-£800 on a commercial-grade unit.",
          "**Deck spindles:** £45-£120 per spindle if worn — factor into negotiation if any blade shows play.",
          "**Transport:** £80-£200 to get a ride-on home if you do not have a suitable trailer. Most dealers offer it; private sellers rarely."
        ]
      },
      {
        h: 'Questions every seller should answer',
        p: [
          "**1. Hours on the clock?** Confirm by physically reading the meter, not the seller\'s memory.",
          "**2. Service history?** Stamped book or stamped receipts add 20-30% to fair value.",
          "**3. Has the deck been replaced or repaired?** Welded deck repairs are a no — walk away.",
          "**4. Reason for selling?** Genuine reasons: bigger machine bought, house move, owner unable to drive. Suspicious: \"needs a service\" usually means \"needs a £500 dealer trip.\"",
          "**5. Original purchase receipt?** Helps verify age and original specification.",
          "**6. Battery age?** A new battery is a £70 saving on first-week service."
        ]
      }
    ],
    faqs: [
      { q: 'Is it worth buying from a dealer vs private?', a: "For mowers over £3,000, yes — most UK dealers offer 6-12 month warranties on used ride-ons, worth £400-£800 in peace of mind. Under £2,000, private saves 15-25% and the risk is more manageable." },
      { q: 'What\'s a fair price negotiation expectation?', a: "Asking prices on Facebook Marketplace are typically 15-20% over actual sale prices. A confidently-conducted inspection that finds 2-3 service items routinely earns a 10-15% discount on a fair-priced listing." },
      { q: 'When is the best time to buy used?', a: "October-November. End-of-season sellers want the mower out of the shed and prices drop 15-20%. April-May is the worst — peak demand, lowest negotiation leverage." }
    ]
  },

  {
    slug: 'how-to-clean-robotic-mower',
    image: U("1584466977773-e625c37cdd50"),
    imageAlt: 'Robotic mower being cleaned at the charging station',
    imageCredit: 'Unsplash',
    title: 'How to clean a robotic lawn mower — UK maintenance guide',
    description: 'Step-by-step UK guide to cleaning a Husqvarna, Worx, Mammotion, or any robotic mower. Blade carriage, drive wheels, sensors, charging contacts. Saves £80 dealer service.',
    keyword: 'clean robotic lawn mower',
    date: '2026-05-26',
    related: [64, 65, 67, 69],
    lead: "Robotic mowers do most of the work, but they need a 15-minute monthly clean to keep cutting cleanly and to prevent the £200 repair bills caused by grass build-up around drive motors. Here is the universal guide that works for Husqvarna, Worx, Mammotion, Segway, Stihl, and Gardena.",
    sections: [
      {
        h: 'How often to clean',
        p: [
          "**Monthly during the cutting season** (April-October). 15 minutes per session.",
          "**End-of-season deep clean** before winter storage — 30 minutes.",
          "**Anytime the mower shows unusual cut patterns** (missed strips, raised stripes) — debris in the cutting carriage is the most likely cause."
        ]
      },
      {
        h: '1. Power off and remove the battery',
        p: [
          "**Disconnect power first.** Most robotic mowers cannot start when inverted, but operator safety matters more than that assumption.",
          "Remove the battery if your model supports easy removal (many do — there is a hatch under the cover).",
          "Take the mower off the charging station and out to a flat, washable surface (garage floor, patio)."
        ]
      },
      {
        h: '2. Clean the cutting carriage',
        p: [
          "Tilt the mower upside down. **The cutting carriage is the most important area** to keep clean.",
          "**Soft-bristle brush** to sweep grass from around the carriage and the underside of the deck. Stiff brushes scratch the deck plastic.",
          "**Spin the cutting disc by hand.** Should rotate freely. Stiffness means grass has wrapped the spindle — clean it out.",
          "**Inspect the blades.** Most robotic mowers have three small blades. They should be sharp, undamaged, and present. Chipped or worn blades are £8-£12 for a 3-pack OEM replacement and 5-minute DIY swap."
        ]
      },
      {
        h: '3. Clean the drive wheels and chassis',
        p: [
          "Grass and mud accumulate around the wheel hubs. **Spin each wheel by hand** — should turn freely.",
          "Use a soft brush or compressed air to clear debris from the wheel hubs and the surrounding chassis.",
          "**Tyres can be wiped with a damp cloth.** Avoid soaking with water — electronics inside the chassis stay dry."
        ]
      },
      {
        h: '4. Wipe the sensors',
        p: [
          "Cameras (Worx Vision range, AI-camera robots) need a clean wipe-down with a microfibre cloth and a tiny amount of glass cleaner.",
          "Lift sensors (the small dimples under the deck that detect when the mower is tipped) need to be free of grass — a cotton bud handles this.",
          "Bumpers and impact sensors should move freely — push gently to confirm spring-return."
        ]
      },
      {
        h: '5. Clean the charging contacts',
        p: [
          "Charging contacts on the mower and the dock develop oxidation over months of use. **Symptom: mower returns to dock but does not charge.**",
          "Wipe both sets with a clean microfibre cloth lightly dampened with isopropyl alcohol (90%+).",
          "Inspect for green oxide on copper contacts — gently rub with a clean pencil eraser to restore the surface."
        ]
      },
      {
        h: '6. Check boundary wire and charging station',
        p: [
          "Inspect the boundary-wire connections at the charging dock. **Corrosion at the wire-to-dock junction** is the most common signal-loss cause.",
          "Trim grass back from the dock area — grass touching the dock interferes with the IR/return signal.",
          "Wire-free mowers (Husqvarna NERA, Mammotion, Segway) need a clear view of the sky for RTK satellite reception. Trim back any new tree growth that has shadowed the dock."
        ]
      },
      {
        h: '7. End-of-season storage',
        p: [
          "**Charge battery to 50-60%** before storage. Lithium batteries store best at half-charge.",
          "Remove the battery and store separately in a dry indoor location.",
          "Wipe down the entire mower with a slightly damp cloth, dry thoroughly.",
          "Cover with a breathable cover (not plastic — traps condensation). Store indoors in a dry garage or shed.",
          "Bring the boundary wire ends inside if possible — mice chew boundary wire over winter."
        ]
      }
    ],
    faqs: [
      { q: 'Can I pressure-wash a robotic mower?', a: "No — never. Pressure washing forces water past the chassis seals and destroys the electronics. Even gentle hose-down is risky. Brushes, cloths, and compressed air only." },
      { q: 'How often do robotic mower blades need replacing?', a: "Every 6-12 weeks during the cutting season for typical use. Look for visible wear or chipping. £8-£12 for a 3-pack OEM replacement. Mammotion and Worx Vision blades sometimes last longer due to lighter cutting load." },
      { q: 'Should I service my robotic mower at a dealer?', a: "Annual dealer service (£60-£120) is worth it for ownership peace of mind, particularly for wire-free models with electronics that benefit from software updates. Monthly cleaning is DIY territory." }
    ]
  },

  {
    slug: 'lawn-mower-brand-comparison-uk',
    image: U("1500076656116-558758c991c1"),
    imageAlt: 'Multiple lawn mowers from different UK brands in a row',
    imageCredit: 'Unsplash',
    title: 'UK lawn mower brands — who actually makes what in 2026',
    description: 'Definitive guide to UK lawn mower brands in 2026. Country of manufacture, parent companies, dealer networks, build quality, resale value. The map every UK buyer needs.',
    keyword: 'UK lawn mower brands guide',
    date: '2026-05-26',
    related: [1, 3, 132, 117],
    lead: "The UK lawn mower market has dozens of brands but only a handful of actual manufacturers. Many brands you think compete are owned by the same parent. Here is the 2026 map of who makes what, where, and what it means for build quality and parts availability.",
    sections: [
      {
        h: 'The Stiga group (Italy)',
        p: [
          "**Stiga, Mountfield, Atco, Alpina, Castelgarden.** All Italian-built by Global Garden Products in Castelfranco Veneto.",
          "**Mountfield** is the volume UK badge. **Stiga** is the premium positioning. **Atco** is the heritage British-distributed badge (since 1921, brought into Stiga ownership in the 1990s).",
          "Engines on the cheaper end are Stiga ST120/ST160 (Italian-built). Honda GCV engines on the premium SP46H and Atco Liner ranges.",
          "Dealer network is dense across the UK — every garden centre stocks Mountfield."
        ]
      },
      {
        h: 'Husqvarna Group (Sweden)',
        p: [
          "**Husqvarna, Gardena, McCulloch, Jonsered.** Owned by Husqvarna AB. Manufacturing across Sweden, Czech Republic, and China depending on product line.",
          "**Husqvarna** is the premium Swedish badge. **Gardena** is the German garden-tool sister brand. **McCulloch** and **Jonsered** are budget Husqvarna spinoffs.",
          "Husqvarna invented the robotic mower (Automower, 1995) and dominates the category 30 years later.",
          "BLi battery platform shares across the group."
        ]
      },
      {
        h: 'Stihl (Germany)',
        p: [
          "**Stihl** is family-owned, German-built, and one of the most-trusted garden-tool brands globally.",
          "AP battery platform connects cordless mowers (RMA range) to chainsaws, hedge trimmers, blowers, pole pruners.",
          "Petrol RM-series mowers use Stihl-Kohler engines (Stihl-engineered, Kohler-manufactured).",
          "UK dealer network is the densest of any garden brand — the network is the headline feature, beyond the products themselves."
        ]
      },
      {
        h: 'Honda Motor Co (Japan)',
        p: [
          "**Honda** mowers are Honda-engineered, with engines built by Honda in the US (GCV) and Thailand (GXV).",
          "HRG (Izy) is the volume range; HRX is the premium flagship. HF ride-ons sit at the top.",
          "Honda engines also power many UK premium walk-behind mowers: Hayter Harrier, Mountfield SP46H, Atco Liner, Allett Liberty, and selected Cobra and Stiga models.",
          "Honda dealer network in the UK is the most reliable for parts continuity over 15+ years."
        ]
      },
      {
        h: 'Hayter (UK)',
        p: [
          "**Hayter** is genuinely British-built — Spellbrook, Hertfordshire, since 1947.",
          "Owned by Toro Group since 2005, but kept the British factory and UK-specific designs.",
          "Honda GCV engines on nearly every petrol Hayter (Harrier, Hawk, Spirit). Hunter Pro uses Honda GXV commercial-spec.",
          "Among the strongest resale curves in the UK residential market. Hayter Harrier is many garden professionals\' personal mower."
        ]
      },
      {
        h: 'Kubota (Japan)',
        p: [
          "**Kubota** is the agricultural giant making everything from compact tractors to commercial mowers. Diesel-engine focus.",
          "Lawn-specific ranges: T (petrol lawn tractor), GR (petrol garden tractor), G (diesel out-front), F (commercial front-mount), Z (petrol zero-turn), ZD (diesel zero-turn), BX (sub-compact tractor with mower).",
          "20+ year service horizon on properly maintained Kubotas. The premium-most ride-on brand on the UK market.",
          "Kubota dealer network is thinner than John Deere in the UK but parts continuity is the best in the industry."
        ]
      },
      {
        h: 'AriensCo (USA / UK)',
        p: [
          "**Ariens** owns **Westwood**, **Countax**, and **AriensCo** branded mowers.",
          "Westwood and Countax are genuinely British-built (Suffolk factory) under the AriensCo umbrella.",
          "Engineering is essentially shared — Countax has 4WD options on the B-series, Westwood is the value badge with similar engineering.",
          "Excellent UK dealer support and a strong commercial ride-on tradition."
        ]
      },
      {
        h: 'John Deere (USA)',
        p: [
          "**John Deere** mowers are US-built (X-series in Horicon, Wisconsin).",
          "Engines: Kawasaki FS-series on the X300/X500 ranges. Briggs Vanguard on entry units.",
          "The strongest dealer network for ride-ons in the UK alongside Kubota.",
          "Resale holds at 55-65% of new after 5 years — the strongest in the residential ride-on market."
        ]
      },
      {
        h: 'EGO (Taiwan / USA-owned)',
        p: [
          "**EGO** is owned by Chervon (Chinese-Taiwan multinational with US headquarters). Manufacturing is in Taiwan and Vietnam.",
          "56V Arc Lithium platform is the most-developed mower-specific cordless ecosystem in the UK.",
          "LM range covers small lawns to commercial-spec mowing. Top-end LMX (XP) genuinely matches petrol performance.",
          "Strong UK distribution through specialist garden machinery dealers."
        ]
      },
      {
        h: 'The supermarket and budget tier',
        p: [
          "**Mac Allister** is B&Q\'s house brand — mowers are Chinese-built (largely by Loncin for petrol engines).",
          "**Ferrex** is Aldi\'s house brand, **Parkside** is Lidl\'s — both Chinese-built generics with limited UK parts support after 5 years.",
          "**Murray** is a US legacy brand now owned by Briggs & Stratton — fitted with Briggs engines, US-built but limited UK presence.",
          "**Hyundai** garden equipment is unrelated to Hyundai cars — Chinese-built mowers using the Hyundai brand-licence."
        ]
      }
    ],
    faqs: [
      { q: 'Are British-built mowers actually better?', a: "Hayter (Spellbrook), Allett (Stamford), Westwood and Countax (Suffolk) are genuinely British-built and deliver excellent build quality. The \"British-designed\" label on some brands (Webb, Cobra) means UK-distributed with overseas manufacturing — quality varies." },
      { q: 'Which mower brands have the best dealer networks?', a: "Mountfield (Stiga group) has the densest network across high-street garden centres. Stihl has the densest specialist-dealer network. Husqvarna and Honda are joint third. Kubota and John Deere lead for ride-on specialist dealers." },
      { q: 'What\'s the most reliable mower brand?', a: "Honda and Kubota lead on engine longevity. Hayter and Allett lead on UK-built chassis quality. The brands you actively avoid for build reliability: any generic supermarket brand after 5 years out of warranty, particularly Loncin-engined budget petrol." }
    ]
  },

  {
    slug: 'inspect-used-honda-hrg-466',
    image: U("1458245201577-fc8a130b8829"),
    imageAlt: 'Honda HRG 466 SK self-propelled mower on a UK lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Honda HRG 466 SK — UK guide',
    description: '10-minute pre-purchase inspection for a used Honda HRG 466 (Izy series). Honda GCV cold-start, drive cable, deck rust, blade. What to pay in 2026.',
    keyword: 'used Honda HRG 466 inspection',
    date: '2026-05-26',
    related: [2, 1, 73, 75],
    lead: "The Honda HRG 466 SK (Izy series) is the mid-range Honda for typical UK gardens. Cheaper than the HRX, simpler mechanism, same Honda GCV engine pedigree. Here is the 10-minute used-mower inspection.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch.",
          "**The Honda GCV is the headline.** Confirm cold-start cleanly, then everything else is fixable."
        ]
      },
      {
        h: '1. Cold-start the Honda GCV145',
        p: [
          "Auto-choke on modern HRGs (or manual choke on older units). Pull once. The Honda fires on the first or second pull cold.",
          "**Slight smoke that clears in 10 seconds** is normal. Persistent smoke = top-end wear, walk away unless under £200.",
          "**Knocking or rattling once running** means internal damage. Replacement Honda GCV from a salvaged HRG is £180-£280."
        ]
      },
      {
        h: '2. Test the self-propel drive',
        p: [
          "Engage the bail-arm on an incline. The Honda Smart Drive should pull cleanly without slipping.",
          "**Slipping under load** = stretched drive cable. £25 OEM part, 30-minute DIY. Knock £35 off.",
          "**Drive lever stiff** = corroded cable inside the sheath. £18 part, easy DIY fix."
        ]
      },
      {
        h: '3. Inspect the deck',
        p: [
          "HRG decks are pressed steel. Tilt the mower with the spark plug disconnected.",
          "**Rust-through** the deck is walk-away — replacement is uneconomic. Surface rust is fine.",
          "**Bent deck-edge** suggests impact damage. Check the blade for damage as well — both often go together."
        ]
      },
      {
        h: '4. Check the blade and spindle',
        p: [
          "With the spark plug disconnected, grip the blade and check for vertical play. Any wobble means spindle bearings are worn.",
          "**Worn bearings** = £40-£60 dealer fix. Knock £50 off.",
          "**Blade chipped** = £15 OEM blade, easy DIY swap."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**2018–2020:** £220–£320 in tidy condition with documented service.",
          "**2021–2023:** £340–£430. Newer auto-choke models.",
          "**2024–2025:** £440–£500. Near-new, sometimes warranty remaining.",
          "**Knock £40** for: stretched drive cable, stiff drive lever, missing service stamps."
        ]
      }
    ],
    faqs: [
      { q: 'HRG 466 vs HRX 476 — which to buy used?', a: "HRG is £150-£200 cheaper used and has the same Honda GCV pedigree. HRX adds the rear roller (stripes), variable speed drive, and Roto-Stop blade brake. If stripes do not matter and you want Honda engine reliability without the premium, the HRG is the smarter buy." },
      { q: 'Honda HRG 466 vs Mountfield SP46?', a: "The HRG outlasts the Mountfield SP46 by about 5 years on equivalent maintenance. Used, the HRG is £100-£150 more. For 5-year ownership the SP46 is the smarter spend; for 10-year ownership the HRG wins on cost per year." },
      { q: 'Where do Honda parts come from?', a: "Any UK Honda dealer or authorised garden machinery retailer. Service items (filters, plugs, blades) on the shelf. Major parts (drive cables, spindles, decks) ship within 2-3 days from the Honda parts warehouse in Reading." }
    ]
  },
];
