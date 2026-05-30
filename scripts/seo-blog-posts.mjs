// SEO blog posts targeting high-intent "small gardening" Google queries.
// Schema matches blog-posts.mjs: { slug, image, imageAlt, imageCredit, title,
// description, keyword, date, related, lead, sections:[{h,p:[]}], faqs:[{q,a}] }.
// Numbered section headings ("1. ...") auto-generate HowTo rich-result schema.
// Voice: plain English, honest, UK. No em-dashes (use commas). Internal links
// use [text](/path) markdown which inlineMd renders.

const IMG = id => `https://images.unsplash.com/photo-${id}?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600`;

export const SEO_BLOG_POSTS = [
  {
    slug: 'how-to-cut-grass',
    image: IMG('1590820292118-e256c3ac2676'),
    imageAlt: 'A lawn mower cutting a stripe into a green UK lawn',
    imageCredit: 'Unsplash',
    title: 'How to cut grass properly: a simple UK guide',
    description: 'How to cut grass the right way in the UK: when to mow, how short, how often, and the simple rules that give you a thicker, greener lawn instead of a scalped one.',
    keyword: 'how to cut grass',
    date: '2026-05-30',
    related: ['mountfield-sp46', 'bosch-rotak-36-r', 'ego-lm2135e-sp', 'flymo-hover-vac-250'],
    lead: 'Cutting grass looks like the simplest job in the garden, and it nearly is, but the difference between a lawn that looks tired and one that looks great is mostly down to how you mow. Cut too short, too rarely, or with a blunt blade, and you get a thin, yellowy, weedy lawn. Get a few basics right and the same grass turns thick and green with no extra feed at all. Here is the whole thing in plain English.',
    sections: [
      { h: 'The one rule that matters most', p: [
        'If you remember nothing else, remember the **one-third rule**: never cut off more than a third of the grass height in a single mow. Take off more than that and you shock the plant, it goes pale or brown, and weeds and moss move into the gaps.',
        'In practice that means mowing little and often through the growing season rather than letting it get long and scalping it back. A lawn kept at 3 to 4cm and cut weekly will always beat one hacked from 10cm down to 2cm once a fortnight.'
      ]},
      { h: '1. Wait until the grass is dry', p: [
        'Mow when the grass is dry, ideally mid-morning once the dew has lifted or early evening. Wet grass clumps, clogs the deck, blocks the chute and gives a ragged, uneven cut. It also smears wet clippings across the lawn which can smother it.',
        'If you can only do it when slightly damp, raise the cut height and go slower.'
      ]},
      { h: '2. Set the right cutting height', p: [
        'For a normal UK family lawn, aim for about 3 to 4cm in spring and autumn, and raise it to 4 to 5cm in high summer so the longer grass shades its own roots and holds moisture in dry spells. Drop it only slightly lower for an ornamental or striped lawn.',
        'Most mowers have a single lever or a dial per wheel. Start higher than you think, check the result, then lower a notch if you want it shorter. You can always take more off, you cannot put it back.'
      ]},
      { h: '3. Sharpen or replace the blade', p: [
        'A sharp blade slices the grass cleanly. A blunt one tears and bruises it, leaving frayed white or brown tips across the whole lawn a day or two after mowing. If your lawn looks dull and pale just after cutting, a blunt blade is the usual culprit.',
        'Sharpen a steel rotary blade once or twice a season, or fit a cheap replacement. See our guide on [how to sharpen a mower blade](/blog/how-to-sharpen-mower-blade-uk).'
      ]},
      { h: '4. Mow in a steady, overlapping pattern', p: [
        'Walk at a steady pace in straight, slightly overlapping rows so you do not leave uncut strips (mohicans) between passes. Overlap each pass by a few centimetres.',
        'Changing direction each time you mow, up and down one week, across the next, stops the grass leaning one way and helps it stand up for a cleaner cut.'
      ]},
      { h: '5. Decide: collect or mulch', p: [
        'Collecting clippings in the box gives the tidiest finish and is best if the grass is long or you have a lot of weeds going to seed. Mulching mowers chop clippings fine and drop them back as a free, gentle feed, which is great in summer if you mow often and never let it get long.',
        'As a rule: collect in spring and autumn when growth is heavy, mulch in summer when you are cutting little and often.'
      ]},
      { h: 'How often should you cut grass?', p: [
        'Through the main growing season (roughly April to October) once a week is the sweet spot, dropping to once a fortnight at the edges of the season and stopping in winter. We cover the timing in detail in [how often to cut grass](/blog/how-often-to-cut-grass-uk) and [the best time of day and year to mow](/blog/best-time-to-cut-grass-uk).'
      ]},
      { h: 'The right mower makes it easier', p: [
        'Almost any mower will cut grass, but the right one for your lawn makes the weekly job quick and pleasant rather than a chore. For a small garden a light corded or cordless mower is ideal, for a big or rough lawn a self-propelled petrol earns its keep. Not sure? Try our [Find My Mower quiz](/find-my-mower), or read the [buying guide](/buying-guide).'
      ]}
    ],
    faqs: [
      { q: 'How short should I cut my grass?', a: 'For a normal UK lawn, 3 to 4cm in spring and autumn, and 4 to 5cm in summer. Never remove more than a third of the height in one cut. Cutting shorter than 2.5cm stresses ordinary lawn grass and lets moss and weeds in.' },
      { q: 'Should I cut grass wet or dry?', a: 'Dry, always, if you can. Wet grass clumps, clogs the mower, gives a ragged cut and can smother the lawn. If you must mow slightly damp grass, raise the cut height and go slowly.' },
      { q: 'Is it better to collect or mulch clippings?', a: 'Collect when growth is heavy (spring and autumn) or the grass is long, for the tidiest finish. Mulch in summer when you mow little and often, because the fine clippings feed the lawn for free.' },
      { q: 'How often should I cut grass in the UK?', a: 'About once a week from April to October, once a fortnight at the start and end of the season, and not at all through winter while the grass is dormant.' }
    ]
  },

  {
    slug: 'how-often-to-cut-grass-uk',
    image: IMG('1689728318937-17d24bc0a65c'),
    imageAlt: 'A cordless lawn mower part-way through cutting a green lawn',
    imageCredit: 'Unsplash',
    title: 'How often should you cut grass in the UK?',
    description: 'How often to cut grass in the UK, month by month. The weekly mowing rhythm through the growing season, when to ease off, and when to stop for winter.',
    keyword: 'how often to cut grass',
    date: '2026-05-30',
    related: ['bosch-rotak-36-r', 'mountfield-sp46', 'ego-lm2135e-sp'],
    lead: 'There is no single magic number, because how often you cut grass depends on how fast it is growing, and that changes through the year. But the pattern is simple and predictable in the UK, and once you know it you can stop guessing. Here is the month-by-month rhythm.',
    sections: [
      { h: 'The short answer', p: [
        'Through the main growing season, **once a week** is the sweet spot for most UK lawns. At the start and end of the season drop to once a fortnight, and through winter you mostly stop. The golden rule underneath it all is the same as ever: never take off more than a third of the height in one go, so mowing weekly keeps each cut small and gentle.'
      ]},
      { h: 'Spring (March to May)', p: [
        'Growth wakes up. Start with a fortnightly cut on a high setting in March as the grass gets going, then move to weekly through April and May as growth accelerates. This is when the lawn thickens up, so regular cutting really pays off.'
      ]},
      { h: 'Summer (June to August)', p: [
        'Peak growth early summer means weekly, sometimes twice a week in a warm, wet spell. But in a hot, dry summer the grass slows or goes dormant and straw-coloured, and you can ease right off, mowing only when it actually grows. Raise the cut height in summer so longer grass protects its own roots.'
      ]},
      { h: 'Autumn (September to October)', p: [
        'Growth picks up again in the cooler, damper weather, so go back to weekly through September, easing to fortnightly in October. Lower the height gradually for the last cuts of the year. This is also the season for the heavy lawn-care jobs, covered in our [Lawn 101 guide](/lawn-101).'
      ]},
      { h: 'Winter (November to February)', p: [
        'Largely stop. The grass is dormant and cutting cold, wet or frosty grass does more harm than good. If a mild spell pushes a little growth, you can give it a very light tidy on a dry day with the blades set high, but never mow frosty grass.'
      ]},
      { h: 'Let the grass tell you, not the calendar', p: [
        'The dates above are a guide, not a law. The real signal is height: when the lawn is about a third taller than your target height, it is time to cut. A warm, wet autumn can mean you are still mowing in November, a cold spring can push your first cut into April. Watch the grass.'
      ]}
    ],
    faqs: [
      { q: 'How often should I cut my grass in summer?', a: 'Usually once a week, occasionally twice in a warm, wet spell of strong growth. In a hot, dry summer when the grass slows or browns off, ease right back and only mow when it is actually growing.' },
      { q: 'Should I cut grass in winter?', a: 'Mostly no. Grass is dormant in UK winters and cutting cold or frosty grass damages it. In a mild spell you can give a very light, high tidy on a dry day, but never mow frosty or waterlogged grass.' },
      { q: 'Can I cut my grass too often?', a: 'Cutting weekly is fine and good for the lawn. The mistake is not frequency but taking off too much at once. As long as each cut removes no more than a third of the height, frequent mowing thickens the lawn.' }
    ]
  },

  {
    slug: 'best-time-to-cut-grass-uk',
    image: IMG('1741326757602-186060c5d5b5'),
    imageAlt: 'A neatly mown, manicured green lawn in good light',
    imageCredit: 'Unsplash',
    title: 'The best time of day (and year) to cut grass in the UK',
    description: 'When is the best time to cut grass in the UK? The best time of day to mow, the season to start and stop, and the conditions to avoid for a healthier lawn.',
    keyword: 'best time to cut grass',
    date: '2026-05-30',
    related: ['hayter-harrier-41-ad', 'mountfield-sp46', 'bosch-rotak-36-r'],
    lead: 'Timing your mowing well is a free way to get a better, healthier lawn. It costs nothing, takes no extra effort, and mostly comes down to avoiding wet grass and the hottest part of the day. Here is when to mow, both the time of day and the time of year.',
    sections: [
      { h: 'Best time of day to mow', p: [
        'The sweet spot is **mid-morning, once the dew has dried**, or **early evening**. The grass is dry, which gives a clean cut and protects the mower, but it is not the fierce midday heat that stresses freshly cut grass.',
        'Avoid early morning while the lawn is still wet with dew, avoid midday in summer when cutting stresses the grass most, and avoid late evening because grass cut and left damp overnight is more prone to disease.'
      ]},
      { h: 'Avoid wet grass', p: [
        'Whatever the hour, dry grass beats wet. Wet grass clumps and clogs the deck, gives a torn, uneven cut, and can smear clippings that smother the lawn. After rain, wait for the surface to dry before mowing. If you have no choice, raise the cut and go slowly.'
      ]},
      { h: 'Best time of year to start and stop', p: [
        'Make the first cut of the year in **March or early April** once the grass is actively growing, with the blades set high for a gentle tidy rather than a proper cut. Mow regularly through the growing season, then taper off through **October**. By **November** the grass is usually dormant and you stop. See [how often to cut grass](/blog/how-often-to-cut-grass-uk) for the month-by-month rhythm.'
      ]},
      { h: 'Never mow frosty grass', p: [
        'Frozen grass blades are brittle and the mower (and your feet) crush and bruise them, leaving black, damaged patches that take weeks to recover. Wait until any frost has fully lifted, which in winter often means it is simply not a mowing day.'
      ]},
      { h: 'A quick note on neighbours and the law', p: [
        'There is no national law setting mowing hours in the UK, but local councils treat excessive noise as a nuisance, and most people stick to sociable hours, roughly 8am to 8pm on weekdays and a later start at weekends. A quiet [cordless](/cordless) or [robotic](/robotic) mower makes early or late mowing far more neighbourly than a petrol engine.'
      ]}
    ],
    faqs: [
      { q: 'What is the best time of day to cut grass?', a: 'Mid-morning after the dew has dried, or early evening. The grass is dry for a clean cut, but you avoid the midday summer heat that stresses freshly cut grass. Avoid mowing while wet or in the hottest part of the day.' },
      { q: 'When should I make the first cut of the year?', a: 'March or early April, once the grass is actively growing again, with the mower set high for a light tidy rather than a close cut. Lower the height gradually over the following weeks.' },
      { q: 'Can I mow the lawn in the evening?', a: 'Early evening is fine and often ideal in summer. Just avoid cutting late and leaving the grass damp overnight, which encourages lawn disease, and keep the noise to sociable hours for the neighbours.' },
      { q: 'Is it bad to cut wet or frosty grass?', a: 'Yes to both. Wet grass clogs the mower and cuts raggedly, and cutting or even walking on frosty grass bruises the brittle blades and leaves damaged patches. Wait for dry, frost-free conditions.' }
    ]
  },

  {
    slug: 'how-to-stripe-a-lawn',
    image: IMG('1773917735999-2a89191afc55'),
    imageAlt: 'A striped ornamental lawn with crisp alternating light and dark bands',
    imageCredit: 'Unsplash',
    title: 'How to stripe a lawn: get those crisp Wembley stripes',
    description: 'How to stripe a lawn at home. What actually makes the stripes, the rear-roller mower you need, and the simple mowing pattern for crisp alternating bands.',
    keyword: 'how to stripe a lawn',
    date: '2026-05-30',
    related: ['hayter-harrier-41-ad', 'bosch-rotak-36-r', 'mountfield-sp46', 'allett-liberty-35'],
    lead: 'Those crisp light-and-dark stripes on a bowling green or a football pitch look like the work of a professional, but they are surprisingly easy to do at home. The secret is not a special grass or a chemical, it is simply which way the grass is bent. Here is exactly how stripes work and how to get them.',
    sections: [
      { h: 'What actually makes the stripes', p: [
        'Stripes are an optical effect, nothing more. Grass bent **away** from you reflects more light and looks **pale**. Grass bent **towards** you absorbs more light and looks **dark**. Mow in alternating directions and you create alternating pale and dark bands. The grass is all the same length and colour, you are just bending it different ways.',
        'That is why the lawn looks striped from one end and almost plain from the side: you are seeing the light bounce off the bent blades.'
      ]},
      { h: '1. Use a mower with a rear roller', p: [
        'This is the one piece of kit that matters. A rear roller is a cylinder behind the blade that presses the grass flat as you pass, fixing the direction it bends. Mowers without a roller (most hover mowers and many cheap rotaries) cannot stripe properly.',
        'Plenty of affordable mowers have rollers, from the corded [Bosch Rotak 36 R](/mower/bosch-rotak-36-r) to the British-built [Hayter Harrier](/mower/hayter-harrier-41-ad). See all of them on our [best mowers for stripes](/best/striping) list.'
      ]},
      { h: '2. Mow the lawn first, then stripe', p: [
        'Give the whole lawn a normal cut first so it is even. Stripes show best on a healthy lawn cut to a consistent height, so do not try to stripe long, patchy or uneven grass.'
      ]},
      { h: '3. Mow in straight, parallel lines', p: [
        'Pick a straight edge to follow, a path, fence or border, and mow a straight line down the lawn. Turn at the end and come back the opposite way, slightly overlapping the previous pass. Each strip now bends the opposite way to its neighbour, giving you alternating stripes.',
        'Keep your eyes a few metres ahead, not on the mower, to walk a straighter line.'
      ]},
      { h: '4. Finish with a perimeter pass', p: [
        'Once all the stripes are done, mow one lap around the whole edge of the lawn to tidy the ends of each stripe and hide your turning marks. This single border pass is what makes a home lawn look professionally finished.'
      ]},
      { h: '5. Sharpen the look (optional)', p: [
        'For crisper stripes, mow more slowly and consider a second pass in the same directions to bend the grass more firmly. Keen stripers fit a separate striping roller or kit. And for the sharpest stripes of all, a cylinder mower like the [Allett Liberty 35](/mower/allett-liberty-35) is what the cricket and bowling clubs use.'
      ]},
      { h: 'Why your stripes might be faint', p: [
        'If the stripes barely show, the usual reasons are: no rear roller on the mower, grass cut too short (very short grass barely bends), a dry spell (stressed grass does not lie down well), or mowing too fast. Slow down, raise the cut slightly, make sure the lawn is healthy, and the stripes will sharpen up.'
      ]}
    ],
    faqs: [
      { q: 'Do I need a special mower to stripe a lawn?', a: 'You need a mower with a rear roller, which presses the grass flat as you pass. The roller is what fixes the direction the grass bends and creates the stripe. Many affordable corded, cordless and petrol mowers have rollers; most hover mowers do not.' },
      { q: 'How do lawn stripes actually work?', a: 'They are an optical effect. Grass bent away from you looks pale because it reflects more light, grass bent towards you looks dark. Mowing in alternating directions creates alternating pale and dark bands of the same grass.' },
      { q: 'Why are my lawn stripes faint?', a: 'Common causes are a mower with no rear roller, grass cut too short to bend, a dry spell stressing the grass, or mowing too fast. Use a roller mower, raise the cut slightly, keep the lawn healthy and slow down.' },
      { q: 'Can you stripe a lawn with any mower?', a: 'No. Without a rear roller the grass is not pressed flat in a consistent direction, so you get little or no stripe. A roller is essential, the rest is just mowing in neat, alternating lines.' }
    ]
  }
];
