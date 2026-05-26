# MowRight Work Manager

A lightweight CRM + route planner for tradespeople who already use MowRight — gardeners, mower service techs, landscapers running their own books.

Lives at **`/work/`**. `noindex` so it doesn't compete with the public mower-price content.

## What it does

Enter today's jobs, hit **Optimise route**, and you get the fastest order to visit every stop — with arrival times, drive minutes, and a map of the day.

- **Today** (`/work/`) — date picker, start address, optimised route, map, drive totals
- **All jobs** (`/work/jobs`) — every job ever, with filter/search by date or status, inline add/edit
- **Customers** (`/work/customers`) — address book; selecting a customer auto-fills a job's address

## How the routing works

1. Each job address is geocoded once via **Nominatim** (OpenStreetMap) and cached in `localStorage`.
2. When you click **Optimise route**, an N×N drive-time matrix is pulled from the **public OSRM demo server** (`router.project-osrm.org`).
3. The optimiser:
   - **≤ 8 jobs:** brute-force every permutation (40 320 max), picks the global optimum
   - **> 8 jobs:** nearest-neighbour seed + 2-opt local-search
4. Fixed-time jobs are anchored in place; flexible jobs slot in around them.
5. The chosen route geometry is fetched from OSRM `/route` and drawn on the map.
6. If OSRM is unreachable, the planner falls back to straight-line distances at 50 km/h average and shows a yellow notice.

No API keys required. No subscriptions. Throttled to 1 geocode per second (Nominatim's published policy).

## Storage

The MVP ships with a **localStorage** backend so the tool works offline, on any device, with no signup. Data lives in three keys:

- `wm_customers_v1`
- `wm_jobs_v1`
- `wm_day_plans_v1`

Plus a Nominatim geocoding cache: `wm_geo_cache_v1`.

**To clear all Work Manager data** (e.g. when handing the device to someone else), run this in the browser console:

```js
['wm_customers_v1','wm_jobs_v1','wm_day_plans_v1','wm_geo_cache_v1','wm_settings_v1']
  .forEach(k => localStorage.removeItem(k));
```

### Upgrading to Supabase (multi-device sync)

The schema is in `supabase/migrations/0002_work_manager_init.sql`. Apply it alongside the marketplace migration, then in `work/work.js`:

```js
const STORAGE = 'supabase'; // was 'local'
```

…and export a Supabase-shaped `db` object with the same `{ list, get, insert, update, remove }` API. RLS policies ensure every row is scoped to `auth.uid()`, so the same magic-link login already used by `/sell` and `/account` works here too.

## Sample data

Hit **"Or try sample data"** on an empty Today view to seed 5 demo jobs across West London — useful for screenshots and demoing the optimiser without typing addresses.

## Files

```
work/
├── index.html       Today's route — Leaflet map, optimise button, summary
├── jobs.html        All jobs — list, filter, inline add/edit form
├── customers.html   Customer list — inline add/edit form
├── work.js          Shared core: storage abstraction, geocoding, OSRM, TSP
└── work.css         Page styles (extends /style.css design tokens)

supabase/migrations/
└── 0002_work_manager_init.sql   wm_customers, wm_jobs, wm_day_plans + RLS
```

## Roadmap

- **Drag-to-reorder** the stops list (manual override of the optimiser)
- **iCal feed** so the day's plan syncs to your phone calendar
- **Customer detail page** with full job history + repeat-visit defaults
- **Address autocomplete** in the new-job form (currently a free-text field)
- **Time windows** per job (e.g. "must be after 10:00")
- **Multi-day planner** that batches a week's worth of jobs by area
- **Supabase wiring** so it works across phone + laptop with magic-link auth

## Licence

Same as the rest of the repo.
