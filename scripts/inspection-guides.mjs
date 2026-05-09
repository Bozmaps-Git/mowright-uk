// Pre-purchase inspection guides for popular used UK mowers.
// Format follows the saved "one-screen cheat sheet" rule:
// short scannable sections, bold lead-ins, ~500 words.
// All 10 guides slot into BLOG_POSTS via the build loop.

const HERO_IMG = 'https://images.unsplash.com/photo-1590820292118-e256c3ac2676?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600';

export const INSPECTION_GUIDES = [
  // 1. Mountfield SP46
  {
    slug: 'inspect-used-mountfield-sp46',
    image: HERO_IMG,
    imageAlt: 'Mountfield SP46 self-propelled petrol mower on grass',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Mountfield SP46 — UK guide',
    description: '10-minute pre-purchase inspection for a used Mountfield SP46. Stiga ST120 cold-start, drive cable, blade-hub, deck rust. What to pay in 2026 and what to walk away from.',
    keyword: 'used Mountfield SP46 inspection',
    date: '2026-05-09',
    related: [3, 6, 56, 122],
    lead: "The SP46 is the best-selling self-propelled petrol mower in the UK. It's also the most-listed used mower on Marketplace — meaning condition varies wildly. Here's the 10-minute inspection that catches every common fault.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch, and a screwdriver. Optional: a feeler gauge.",
          "**Insist on a cold start.** A warm engine hides every starting problem. Confirm with the seller before you travel that the mower has been cold for at least 30 minutes."
        ]
      },
      {
        h: '1. Cold-start the Stiga ST120 engine',
        p: [
          "Three primer squeezes, full throttle, pull. A healthy SP46 starts on the first or second pull cold.",
          "**Won't fire after four pulls** = stale fuel or varnished carb. £35 dealer fix or £6 DIY with carb cleaner — knock £40 off the asking price.",
          "**Knocking or rattling at idle** = walk away. The engine is finished and a replacement Stiga is £150+."
        ]
      },
      {
        h: '2. Test the self-drive on an incline',
        p: [
          "Engage the bail-arm on a kerb-step gradient. The mower should pull without slipping or hesitating.",
          "**Slipping under load** = stretched drive cable, the most common SP46 fault after 5 years. £18 part, 30-minute DIY. Knock £30 off."
        ]
      },
      {
        h: '3. Inspect the steel deck',
        p: [
          "Lift the front of the mower and shine a torch underneath. Surface rust is normal and harmless.",
          "**Rust through the deck** (you can see daylight, not just brown surface) = walk away. SP46 decks are non-replaceable economically.",
          "**Welded patches** = the mower has been through a serious impact. Walk away unless the price reflects it (60% off fair value)."
        ]
      },
      {
        h: '4. Check the blade-hub and bolts',
        p: [
          "With the spark plug disconnected, tilt the mower and grip the blade. Vertical play means the spindle bearings are gone.",
          "**Rounded blade-bolt head** suggests previous DIY damage. £8 fix but flag it.",
          "**Unbalanced blade** (visible vibration when running) = £18 generic blade. Easy fix, but should knock £15 off."
        ]
      },
      {
        h: "5. What it's worth in 2026",
        p: [
          "**2014–2018:** £100–£140 in tidy condition with working drive.",
          "**2019–2022:** £150–£200. Newer engines, less rust risk.",
          "**2023–2025:** £210–£260. Near-new, sometimes with warranty remaining.",
          "**Knock £30** for: stiff drive cable, cracked primer bulb, missing service stamps. **Knock £80** for any rust through the deck."
        ]
      }
    ],
    faqs: [
      { q: 'Is the SP46 worth more than the SP46H?', a: "The SP46H has the Honda GCV engine instead of the Stiga ST120 — it's worth about £100 more used. If the listing just says 'SP46' assume it's the Stiga; the H suffix is what to look for if you want Honda." },
      { q: 'When is the best time to buy used?', a: "October-November. End-of-season sellers want the mower out of the shed before winter and prices drop 15-20%. See our seasonality guide for the year-round pattern." },
      { q: 'What does a full Mountfield service cost?', a: "£80-£120 at a dealer including oil, plug, air filter, blade sharpen and carb clean. Worth it once at purchase, then DIY annually for under £20." }
    ]
  },

  // 2. Hayter Harrier
  {
    slug: 'inspect-used-hayter-harrier',
    image: HERO_IMG,
    imageAlt: 'Hayter Harrier petrol mower on a striped lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Hayter Harrier 41 / 48 / 56 — UK guide',
    description: '10-minute inspection for a used Hayter Harrier. Honda GCV cold-start, rear roller bearings, AD drive, deck checks. What to pay in 2026.',
    keyword: 'used Hayter Harrier inspection',
    date: '2026-05-09',
    related: [4, 1, 70, 75],
    lead: "Hayter Harriers — the 41, 48 and 56 — are British-built premium roller petrols with Honda GCV engines underneath. Built to last 20 years. The catch is that some on Marketplace have done 18 of them already.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket (16mm), a torch.",
          "**The Honda GCV is the headline.** Confirm cold-start works, then everything else is fixable."
        ]
      },
      {
        h: '1. Cold-start the Honda GCV',
        p: [
          "Choke on (older models) or auto-choke (newer). Pull once. The Honda fires on the first pull or the seller has been firing it five minutes before you arrived.",
          "**Smoke at start** is OK if it clears in 10 seconds. Persistent smoke = top-end wear, walk away unless dirt-cheap."
        ]
      },
      {
        h: '2. Test the rear roller for stripes',
        p: [
          "Lift the rear; spin the roller by hand. It should turn smoothly with no clicking or vertical play.",
          "**Clicking bearings** = £24 OEM bearing kit, £45 dealer fit. Knock £60 off.",
          "**Roller surface gouges** show up on the lawn as uneven stripes. Cosmetic dings are fine; deep grooves are a no."
        ]
      },
      {
        h: '3. AD (auto-drive) variant: test the drive',
        p: [
          "Engage drive on level ground, then on a slope. Should pull cleanly with no clutch slip.",
          "**Slipping under load** = drive belt or clutch wear. £45 belt, £100 clutch. Knock 20% off if either is bad."
        ]
      },
      {
        h: '4. Inspect the alloy deck',
        p: [
          "Hayter alloy decks last 25+ years if not abused. Check for cracks around the wheel mounts and discharge chute.",
          "**Cracks radiating from a wheel mount** = terminal. Replacement deck is £400+ in parts; not worth fixing.",
          "**Welded repairs** = walk away. The mower has been bent or driven into something hard."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**Harrier 41:** £350–£500 mid-condition, £550–£750 tidy with documented service.",
          "**Harrier 48:** £450–£650 mid, £700–£900 tidy.",
          "**Harrier 56 AD:** £550–£800 mid, £900–£1,200 tidy.",
          "Hayter dealer service stamps add £80-£120 in fair value."
        ]
      }
    ],
    faqs: [
      { q: 'Is a Harrier worth more than a Honda HRX?', a: "Roughly equal. The Harrier is British-assembled with a Honda engine; the HRX is Honda-built throughout. Cut quality is identical. Hayter holds slightly higher used value because of the heritage premium and the dealer network." },
      { q: 'How long does a Honda GCV in a Harrier last?', a: "1,500-2,000 hours of typical domestic use, which is 20-25 years on a typical UK lawn. The cam belt service at ~1,000 hours is the only major maintenance cost — £35 in parts." },
      { q: 'Are spare parts still available for older Harriers?', a: "Yes. Hayter parts continuity goes back 20+ years. Anything broken on a 1990s Harrier can still be ordered through any Hayter dealer." }
    ]
  },

  // 3. Husqvarna Automower 305 / 315
  {
    slug: 'inspect-used-husqvarna-automower',
    image: HERO_IMG,
    imageAlt: 'Husqvarna Automower robotic mower in a garden',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Husqvarna Automower (305, 310, 315 NERA) — UK guide',
    description: 'Inspection guide for a used Husqvarna Automower 305, 310, 315 NERA. Battery health, charging contacts, blade disc, boundary wire test. What to pay in 2026.',
    keyword: 'used Husqvarna Automower inspection',
    date: '2026-05-09',
    related: [29, 30, 63, 65],
    lead: "Husqvarna Automowers are the longest-lived robotic mowers on the market — 12-15 years of service is realistic. But the battery is consumable and the mainboard isn't economic to replace past 8 years. Here's how to spot a good buy.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** your phone (to check the Husqvarna Connect app pairs), a torch.",
          "**Ask for the original charging station** — aftermarket ones don't trigger the encrypted handshake on NERA models."
        ]
      },
      {
        h: '1. Test battery health',
        p: [
          "Power on. The mower should boot cleanly and show full charge if recently docked.",
          "**Run-time test:** if the seller will, let it mow for 10 minutes. Healthy battery should run 60+ minutes; if it dies in 20, the cells are at end of life. £90-£180 replacement.",
          "**Check the year of the battery** in the menu (Settings > Battery info). Anything over 4 years is on borrowed time."
        ]
      },
      {
        h: '2. Inspect the cutting disc and blades',
        p: [
          "Three small razor blades on a plastic disc. Replace blades every 8-12 weeks of use.",
          "**Worn blade tips** are normal — £8 for a 9-pack of OEM blades.",
          "**Cracked or chipped disc** = £25 part, easy to swap. Negotiate £20 off."
        ]
      },
      {
        h: '3. Charging-contact test',
        p: [
          "Lift the mower onto the charging station manually. Within 10 seconds the mower should beep and start charging.",
          "**No charge after 30 seconds** = corroded charging plates. Clean with a wire brush; if still no charge, the contacts inside the mower are worn (£40 fix)."
        ]
      },
      {
        h: '4. Test the boundary loop (if wired)',
        p: [
          "On NERA models with EPOS, the boundary is wireless. On older models, the green LED on the charging station base should be steady (not flashing).",
          "**Flashing red** = boundary wire broken. Could be a £4 splice or a £150 dealer call-out depending on accessibility. See our boundary-wire repair guide."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**Automower 305 / 310 (boundary-wire era):** £180–£320 working with healthy battery.",
          "**315 / 415X:** £350–£550 mid, £600–£850 with documented service and intact blades.",
          "**320 NERA (wireless):** £1,000–£1,400 used.",
          "**430X NERA:** £1,400–£1,800.",
          "**Always knock £80** if the original charger isn't included."
        ]
      }
    ],
    faqs: [
      { q: 'Can I move a used Automower to my garden without a Husqvarna engineer?', a: "Yes for boundary-wire models — peg the wire around your lawn perimeter following the manual. NERA wireless models need the EPOS reference station calibrated; the Husqvarna app walks you through it." },
      { q: 'What is the typical battery life on a used Automower?', a: "Original Li-ion batteries hold full capacity for ~3 years, then drop to 80% by year 5. Replacement is £90-£180 and a 30-minute job. Most used Automowers on Marketplace need a battery within 2 years of purchase." },
      { q: 'Should I buy the older boundary-wire model or pay extra for NERA?', a: "If you have a wire already buried, stick with boundary-wire — cheaper, simpler. If you're starting fresh and the lawn is over 1,500m², NERA's wireless boundary saves the install pain." }
    ]
  },

  // 4. Stihl iMOW
  {
    slug: 'inspect-used-stihl-imow',
    image: HERO_IMG,
    imageAlt: 'Stihl iMOW robotic mower on a garden lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Stihl iMOW — UK guide',
    description: 'Inspection guide for a used Stihl iMOW (RMI 422, RMI 632, iMOW 6 EVO). What to test, what to pay, and Stihl-specific quirks.',
    keyword: 'used Stihl iMOW inspection',
    date: '2026-05-09',
    related: [62, 29, 30],
    lead: "Stihl iMOW is the orange answer to Husqvarna Automower. Better dealer network, similar reliability, slightly higher used prices. Here's what to check before paying.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** phone, a torch. The iMOW PIN should be the seller's — they'll need to factory-reset it before transfer.",
          "**Confirm the original charging station and AKM battery are included.** Stihl chargers are model-specific."
        ]
      },
      {
        h: '1. Power-on and battery health',
        p: [
          "Power on, check the display. Battery info screen shows cycles and capacity.",
          "**Cycles under 200** = excellent. **Over 800** = expect to replace battery within 12-18 months. £140-£220 OEM."
        ]
      },
      {
        h: '2. Inspect cutting disc',
        p: [
          "Same razor-blade design as Husqvarna. Three blades on a steel disc.",
          "**Worn blades** = £6 set, change before use. **Disc out of true** (visible wobble) = £35 part."
        ]
      },
      {
        h: '3. Test docking',
        p: [
          "Place mower 1m from charging station and command Home via menu. Should locate the dock within 60 seconds and engage.",
          "**Fails to find dock** on entry models = walk away (sensor module failure, dealer-only fix £180+)."
        ]
      },
      {
        h: '4. Boundary loop test',
        p: [
          "iMOWs use a buried wire. Steady green on the dock = healthy loop.",
          "**Red flashing** = broken wire. Splice with a Stihl-supplied connector (£8) — see our boundary-wire repair guide."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**RMI 422 / 522:** £400–£650 working with intact accessories.",
          "**RMI 632 / 632 P / 632 PC:** £650–£1,100 mid-condition.",
          "**iMOW 6 EVO (current generation):** £1,200–£1,600 with low cycles.",
          "Add £150 if you can document Stihl dealer service history."
        ]
      }
    ],
    faqs: [
      { q: 'iMOW vs Automower — which is the better used buy?', a: "Husqvarna has the older / wider used market and slightly lower prices. Stihl has stronger UK dealer network for parts. If a Stihl dealer is local, lean iMOW; otherwise Automower is the safer pick." },
      { q: 'What about the new wireless iMOW (no boundary wire)?', a: "The iMOW 6 EVO is wire-based. The fully-wireless Stihl iMOW EVO 6 with EPOS-style positioning is a 2025+ release and rarely on the used market yet — wait until 2027 for sensible used prices." },
      { q: 'Is the Stihl PIN system a problem on used buys?', a: "No, but the seller must factory-reset before you take delivery. If they can't or won't, walk away — the mower is locked to their account and only Stihl HQ can unlock it." }
    ]
  },

  // 5. EGO LM2135 / LM2114 / LMX5300
  {
    slug: 'inspect-used-ego-lm-cordless',
    image: HERO_IMG,
    imageAlt: 'EGO 56V cordless lawn mower on grass',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used EGO 56V cordless mower (LM2135, LM2114, LMX5300) — UK guide',
    description: 'Pre-purchase inspection for a used EGO 56V cordless mower. Battery health, charger, deck check, what to pay in 2026.',
    keyword: 'used EGO cordless mower inspection',
    date: '2026-05-09',
    related: [15, 18, 33, 138],
    lead: "EGO's 56V Arc Lithium platform is the cordless that beat petrol on cut quality. Used EGOs are usually decent buys — the bottleneck is the battery, which is the most expensive component to replace.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** phone (to time runtime), a torch.",
          "**Confirm the battery is included** — EGO mowers are sometimes sold without batteries to recoup the platform cost. £180-£320 to buy separately."
        ]
      },
      {
        h: '1. Battery serial number and warranty',
        p: [
          "EGO batteries have a 5-year warranty when registered. Check the serial sticker date.",
          "**Battery under 3 years old** = healthy, full warranty.",
          "**3-5 years** = expect 70-85% capacity. Still good for typical use.",
          "**Over 5 years** = battery may be at end of useful life. Knock £100 off if you'll have to replace it."
        ]
      },
      {
        h: '2. Runtime test',
        p: [
          "If practical, mow for 10-15 minutes. A 5Ah battery should cut 250m² before dropping below 50%.",
          "**Battery dies in under 15 minutes** = cells are tired. Replacement is £150-£220 OEM."
        ]
      },
      {
        h: '3. Inspect the steel deck',
        p: [
          "EGO uses pressed steel — better than the plastic of cheaper cordless rivals.",
          "**Surface rust** is normal and harmless.",
          "**Dents from impacts** affect cut quality. Light dents OK; deep ones (>1cm) walk away."
        ]
      },
      {
        h: '4. Self-propel test (SP variants)',
        p: [
          "Engage the bail-arm trigger. Variable-speed control should be smooth.",
          "**Notchy or unresponsive** = drive controller issue. £80 part; not always economic."
        ]
      },
      {
        h: '5. Charger check',
        p: [
          "Plug the battery in, fan should spin and the LED should illuminate.",
          "**No fan / no LED** = charger failed (£75 OEM replacement). Knock £40 off."
        ]
      },
      {
        h: "6. What to pay in 2026",
        p: [
          "**LM2114 (push):** £200–£300 with battery and charger.",
          "**LM2135 / LMX5300 (self-propelled):** £350–£500 mid, £500–£600 tidy.",
          "**Without battery** (kit-form): knock £180-£250 off."
        ]
      }
    ],
    faqs: [
      { q: 'Are EGO batteries cross-compatible with the cordless mower I might buy?', a: "Yes — every EGO 56V mower uses the same battery platform. If you already own an EGO trimmer or blower, the battery slots straight in." },
      { q: 'Does buying the mower without a battery make sense?', a: "Only if you already own EGO 56V batteries. Buying mower-only and adding a battery later costs more than buying complete used." },
      { q: 'Is the EGO 56V really as good as petrol?', a: "On cut quality and ease, yes — at least equal to a Mountfield SP46. On runtime per charge, no — you'll need a 7.5Ah battery (or two 5Ah) for 1,000m²+." }
    ]
  },

  // 6. Bosch Indego
  {
    slug: 'inspect-used-bosch-indego',
    image: HERO_IMG,
    imageAlt: 'Bosch Indego robotic mower on a lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Bosch Indego — UK guide',
    description: 'Pre-purchase inspection for a used Bosch Indego robotic mower. LogiCut mapping, battery, blades, charger. What to pay in 2026.',
    keyword: 'used Bosch Indego inspection',
    date: '2026-05-09',
    related: [16],
    lead: "Bosch Indego uses a clever LogiCut mapping algorithm — straight-line back-and-forth instead of the random pattern Husqvarna and Stihl use. Cleaner-looking lawn, faster mowing time. Here's what to check on a used one.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** phone (Indego app pairs over Bluetooth/wifi), a torch.",
          "**Confirm boundary wire is buried at the seller's house** — and be prepared to lift and move it."
        ]
      },
      {
        h: '1. Battery and run-time',
        p: [
          "Power on, full charge indicated. Indego batteries are smaller than Husqvarna's — a full mow takes 2-3 charge cycles on most lawns.",
          "**Battery cycles over 1,000** = expect to replace soon. £85-£140 OEM."
        ]
      },
      {
        h: '2. Inspect the cutting blades',
        p: [
          "Indego uses a triple-blade rotating disc. Blades clip on/off in seconds.",
          "**Worn or chipped blades** = £8 for a set of 9 OEM. Replace before first use."
        ]
      },
      {
        h: '3. LogiCut calibration test',
        p: [
          "Run the mower for 5 minutes. Should follow straight rows — not random.",
          "**Erratic pattern** = sensor calibration is off. Re-run setup via the app; if still wrong, mainboard issue (£200+ dealer fix)."
        ]
      },
      {
        h: '4. Charging dock test',
        p: [
          "Indego docks reverse-into-the-station. Watch one cycle to verify alignment.",
          "**Misalignment** = bent dock or worn contact pins. £35 dock part."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**Indego 350 (older, smaller):** £180–£260 working.",
          "**Indego S+ 500 / 700:** £350–£520.",
          "**Indego M+ 700 (current):** £550–£800.",
          "Add £100 for original boundary-wire roll if you don't already have wire."
        ]
      }
    ],
    faqs: [
      { q: 'Does LogiCut actually work better than random-pattern mowing?', a: "Yes for most lawns. Rectangular plots get a perfect-looking mow in under an hour. Awkwardly-shaped lawns with islands sometimes confuse the mapping — re-run setup if so." },
      { q: 'Can I integrate Indego with smart home?', a: "Yes — Bosch Smart Garden integrates with Alexa and Google Home. The S+ 500 and newer support voice control for start/stop." },
      { q: 'Is Indego suitable for slopes?', a: "Up to 27% (about 15°). Steeper than that and it'll struggle. Husqvarna 415X is a better choice for properly hilly gardens." }
    ]
  },

  // 7. Murray 11/30 (vintage)
  {
    slug: 'inspect-used-murray-11-30',
    image: HERO_IMG,
    imageAlt: 'Murray 11/30 vintage ride-on lawn tractor',
    imageCredit: 'Unsplash',
    title: 'How to inspect a vintage Murray 11/30 ride-on — UK guide',
    description: '10-minute pre-purchase inspection for a vintage Murray 11/30 (or 13/36, 14.5/38). Briggs engine compression, transmission, chassis. What to pay in 2026.',
    keyword: 'vintage Murray 11/30 inspection',
    date: '2026-05-09',
    related: [123, 126, 149, 39],
    lead: "Vintage Murray ride-ons turn up on Marketplace every week, usually red-and-yellow striped, usually £400-£800. Built simple, easy to fix, parts cheap. The catch is age: most are 25-30 years old now and need a careful look before you buy.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark-plug socket, multimeter, torch, knee pad. Don't bring a trailer until you've inspected.",
          "**Test on the seller's grass.** A flat driveway tells you nothing about a ride-on."
        ]
      },
      {
        h: '1. Cold-start the Briggs engine',
        p: [
          "Choke on, key crank. Should fire within 3-5 seconds.",
          "**Won't start cold** = stale fuel or bad battery. Battery is £45 to replace, fuel is free.",
          "**Knocking under load** = walk away. The Briggs 11HP is rebuildable but it's not worth it on a £500 mower."
        ]
      },
      {
        h: '2. Test gear-drive transmission',
        p: [
          "Engage forward, then reverse. Should shift cleanly with a slight clunk.",
          "**Difficult to shift** = worn linkage. £18 fix; knock £30 off.",
          "**Slipping in gear** = worn drive belt. £25 belt; knock £40 off."
        ]
      },
      {
        h: '3. Cast steering linkage',
        p: [
          "Wiggle the steering wheel side-to-side without engine running. Should have minimal play.",
          "**Excess play** (more than 1 inch of wheel movement before tyres turn) = worn steering box. £80 dealer fix or DIY rebuild kit £35."
        ]
      },
      {
        h: '4. Chassis and deck',
        p: [
          "Crawl under and inspect the deck and chassis frame.",
          "**Welded chassis repairs** = walk away. The mower has been bent.",
          "**Welded deck patches** are sometimes acceptable on a £400 vintage tractor — knock £100 off and check for additional damage.",
          "**Spindle bearings** (front and rear axles) — grab and rock the wheels. Side-to-side play means worn bearings, £40 each axle."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**Murray 11/30:** £300–£650 depending on hours and condition.",
          "**Murray 13/36:** £450–£800.",
          "**Murray 14.5/38 (with I/C engine):** £500–£900 — the I/C variant is worth £80-£150 more than the standard.",
          "Knock £100 if seller can't get it to start; knock £200 if there's any structural rust or welded repair."
        ]
      }
    ],
    faqs: [
      { q: 'Are Murray parts still available?', a: "Yes for the engine (Briggs parts continuity is universal) and most consumables (belts, blades, filters). Murray-specific parts (wheels, steering boxes) are increasingly hard to source — eBay and US imports." },
      { q: 'Is a 25-year-old Murray actually worth buying?', a: "If the engine runs cleanly and the chassis is sound, yes. They're agricultural-grade simple machines built to last 50 years. Modern budget ride-ons (Hyundai, Mountfield 1530H) are arguably less serviceable." },
      { q: "What's the difference between the 11/30 and 13/36?", a: "11HP/30in deck vs 13HP/36in. The 13/36 covers ground 20% faster and has more power for thick grass. Most domestic owners prefer the 11/30 for being lighter and easier to manoeuvre." }
    ]
  },

  // 8. John Deere X-series
  {
    slug: 'inspect-used-john-deere-x-series',
    image: HERO_IMG,
    imageAlt: 'John Deere X-series ride-on lawn tractor',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used John Deere X-series ride-on — UK guide',
    description: 'Pre-purchase inspection for a used John Deere X167R, X354, X380. Engine, hydrostatic transmission, deck, hour meter. What to pay in 2026.',
    keyword: 'used John Deere X-series inspection',
    date: '2026-05-09',
    related: [37, 38, 39, 40],
    lead: "John Deere X-series ride-ons hold their value better than any rival. A 10-year-old X300R will sell for 50% of new. Here's how to spot the ones worth that premium and the ones that aren't.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** torch, multimeter, knee pad. Take a phone photo of the chassis number plate.",
          "**Insist the seller starts it cold.** A warm hydrostatic transmission hides slip issues."
        ]
      },
      {
        h: '1. Cold-start the Briggs Intek or Kawasaki',
        p: [
          "Key turn. Should crank cleanly, fire within 3 seconds.",
          "**Long crank** = battery weak (£60 fix) or carb varnished (£40 fix).",
          "**White smoke at idle** = head gasket on Intek single-cylinder. £150 fix; knock £200 off."
        ]
      },
      {
        h: '2. Hydrostatic transmission test',
        p: [
          "Foot pedal forward, full speed. Then reverse. Should engage smoothly with no jerk.",
          "**Jerky engagement** = transaxle fluid is old (£35 service) or pump is wearing.",
          "**No drive after a slow build-up** = hydrostatic pump failure. Walk away unless dirt-cheap (£800+ rebuild)."
        ]
      },
      {
        h: '3. Deck inspection',
        p: [
          "Lower deck, crawl under, inspect spindle housings and blade hubs.",
          "**Spindle bearings** — grab each blade hub and rock. Vertical play = £48 spindle each.",
          "**Welded deck repairs** = walk away. JD decks are pricey to replace (£600+)."
        ]
      },
      {
        h: '4. Check the hour meter and service stamps',
        p: [
          "Hour meter is on the dash. **Under 200 hours** = excellent for a 5+ year old machine.",
          "**Over 800 hours** = engine work likely needed soon. Negotiate hard.",
          "Check the service book — JD dealer stamps add £200-£500 to fair value."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**X167R / X300R:** £1,800–£2,400 mid-condition. £2,400–£2,800 with low hours and dealer service.",
          "**X354 / X380:** £2,800–£3,800.",
          "**Knock £200** for: missing service history, weak start, scuffed deck. **Knock £500** for hydro slip or smoke."
        ]
      }
    ],
    faqs: [
      { q: 'Are JD ride-ons worth the premium over Mountfield?', a: "Resale-wise, yes. A 10-year-old JD will sell for 50% of new; a 10-year-old Mountfield ride-on for 25%. Over a 15-year ownership window, the cost-per-year difference is small." },
      { q: 'X300R vs X354 — which is the better used buy?', a: "X300R for typical UK lawns (under 1 acre). X354 has 4-wheel-steer for awkward shapes — only worth the £600+ premium if you have islands and obstacles to navigate." },
      { q: 'What about the X167R — is the rear-collect worth it?', a: "If you don't want to discharge or mulch, yes. The X167R is the cheapest JD that comes with proper bagging. For straight mulch-and-go, save £400 and get the X117R instead." }
    ]
  },

  // 9. Cobra MX46SPB
  {
    slug: 'inspect-used-cobra-mx46spb',
    image: HERO_IMG,
    imageAlt: 'Cobra MX46SPB self-propelled petrol mower',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Cobra MX46SPB — UK guide',
    description: 'Pre-purchase inspection for a used Cobra MX46SPB self-propelled petrol mower. Briggs cold-start, drive cable, deck, what to pay in 2026.',
    keyword: 'used Cobra MX46SPB inspection',
    date: '2026-05-09',
    related: [6, 3, 56, 87],
    lead: "Cobra mowers punch above their weight on price-to-feature. The MX46SPB combines a Briggs 500E engine with a rear roller for stripes — at £100 less than the equivalent Mountfield. Used examples are good value if you check the right things.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** spark plug socket (16mm), torch.",
          "**Cobra dealers are thinner than Mountfield** — confirm there's one nearby for parts before paying premium money."
        ]
      },
      {
        h: '1. Cold-start the Briggs 500E',
        p: [
          "Three primer squeezes, full throttle, pull. First or second pull when healthy.",
          "**Won't fire** = stale fuel or carb. Easy DIY fix. Knock £25 off.",
          "**Smoke at idle** = engine top-end wear. Walk away."
        ]
      },
      {
        h: '2. Test the drive',
        p: [
          "Engage on a slope. Should pull cleanly without slipping.",
          "**Slipping under load** = drive cable stretched. £18 fix. Knock £30 off."
        ]
      },
      {
        h: '3. Inspect rear roller (stripe quality)',
        p: [
          "Cobra MX46SPB has a steel rear roller. Spin by hand — should turn smoothly.",
          "**Clicking bearings** = £18 generic bearing kit. £40 off.",
          "**Roller surface gouged** affects stripes. Light marks OK, deep grooves no."
        ]
      },
      {
        h: '4. Steel deck check',
        p: [
          "Lift and inspect underside. Cobra decks rust faster than Mountfield in salty coastal areas.",
          "**Surface rust** is fine.",
          "**Rust through the deck** (visible holes) = walk away or 60% off."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**2018–2021:** £140–£200 mid-condition.",
          "**2022–2025:** £220–£320, sometimes with warranty remaining.",
          "**Knock £30** for any: stiff drive cable, primer hardened, missing service stamps.",
          "**Knock £80** for any rust through the deck."
        ]
      }
    ],
    faqs: [
      { q: 'Cobra vs Mountfield SP46 — which is better used?', a: "Identical engine (Briggs 500E variant), similar build. Cobra is £30-£50 cheaper used. Mountfield has the wider dealer network and slightly better resale. Either is a sensible buy." },
      { q: 'Where do I find Cobra parts?', a: "Cobra dealer network is run by Henton & Chattell. Less dense than Mountfield/Stiga but most garden machinery dealers can order parts within 48 hours." },
      { q: 'Is the rear roller actually worth it?', a: "If you care about stripes, yes — non-roller petrol mowers can't produce them. If you mulch or just want grass cut, save £30 and get the MX46B (no roller variant)." }
    ]
  },

  // 10. Mountfield 1530H lawn tractor
  {
    slug: 'inspect-used-mountfield-1530h',
    image: HERO_IMG,
    imageAlt: 'Mountfield 1530H lawn tractor on a large lawn',
    imageCredit: 'Unsplash',
    title: 'How to inspect a used Mountfield 1530H lawn tractor — UK guide',
    description: 'Pre-purchase inspection for a used Mountfield 1530H lawn tractor. Stiga engine, transmission, deck, what to pay in 2026.',
    keyword: 'used Mountfield 1530H inspection',
    date: '2026-05-09',
    related: [14, 39, 124, 150],
    lead: "Mountfield 1530H is the entry-tier lawn tractor that British DIY sheds default-recommend. New it's £1,499; used at £700-£1,000 it's the best-value hydrostatic ride-on on the UK market. Here's what to check before paying.",
    sections: [
      {
        h: 'Before you go',
        p: [
          "**Bring:** torch, knee pad, multimeter.",
          "**Test on grass.** Hydrostatic transmissions feel fine on tarmac but slip under real load."
        ]
      },
      {
        h: '1. Cold-start the Stiga engine',
        p: [
          "Key crank. Should fire within 5 seconds.",
          "**Slow crank** = battery low (£45 fix).",
          "**No start** = carb varnished or fuel lines blocked. £40 dealer fix."
        ]
      },
      {
        h: '2. Hydrostatic test',
        p: [
          "Foot pedal forward, full speed; then reverse. Should engage smoothly with no jerking.",
          "**Jerky engagement** = transaxle fluid old (£25 DIY change).",
          "**No drive after pedal hit** = pump failure. Walk away unless very cheap."
        ]
      },
      {
        h: '3. Deck inspection',
        p: [
          "Lower deck, crawl under. 84cm cut width.",
          "**Spindle bearings** — grab each blade hub and rock. Side-to-side play = £48 spindle.",
          "**Belt wear** — check the deck-drive belt. Frayed = £35 replacement."
        ]
      },
      {
        h: '4. Battery and electrics',
        p: [
          "Headlights, dash gauges, ignition system. All should function.",
          "**Slow electrics** = old battery. £45 standard 12V tractor battery."
        ]
      },
      {
        h: "5. What to pay in 2026",
        p: [
          "**2018–2021:** £700–£900 mid-condition with documented service.",
          "**2022–2025:** £1,000–£1,300 — near-new sometimes with warranty.",
          "**Knock £150** for: weak hydrostatic, missing service stamps, deck welded repairs.",
          "**Knock £300** for any major engine fault (smoke, knocking, won't start)."
        ]
      }
    ],
    faqs: [
      { q: '1530H vs 1530M — what is the difference?', a: "H = Hydrostatic (foot-pedal automatic). M = Manual (gear-shift). H is more comfortable and quicker to use; M is cheaper to buy and easier to repair. For most domestic owners H is worth the £200-£300 premium." },
      { q: 'Is the 1530H suitable for half an acre?', a: "Yes — that's exactly its sweet spot. 84cm deck cuts a typical UK 2,000m² lawn in 25-30 minutes." },
      { q: 'Mountfield vs John Deere X-series at the same used price?', a: "JD X167R holds resale better but costs £800-£1,000 more used. If you'll keep the mower 10+ years, JD wins on cost-per-year. If you'll sell within 5, Mountfield is smarter." }
    ]
  }
];
