// MowRight Work Manager — shared core.
//
// Storage layer is intentionally tiny and Supabase-shaped so the localStorage
// MVP can be swapped for the cloud backend (supabase/migrations/0002_*.sql)
// by changing one constant.

// ----- Config ----------------------------------------------------------------
// Set to 'supabase' once SUPABASE_URL + anon key are present on the page.
// Default 'local' keeps everything in localStorage so the app works offline
// and without an account.
const STORAGE = 'local';

const KEYS = {
  customers: 'wm_customers_v1',
  jobs:      'wm_jobs_v1',
  plans:     'wm_day_plans_v1',
  settings:  'wm_settings_v1',
};

// ----- Formatting ------------------------------------------------------------
export const fmtDateISO = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
export const todayISO = () => fmtDateISO(new Date());
export const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
};
export const fmtTime = (hhmm) => hhmm ? hhmm.slice(0, 5) : '';
export const fmtMinutes = (m) => {
  if (m == null) return '';
  const h = Math.floor(m / 60), mm = Math.round(m % 60);
  return h > 0 ? `${h}h ${mm}m` : `${mm}m`;
};
export const fmtKm = (km) => km == null ? '' : (km < 10 ? km.toFixed(1) : Math.round(km)) + ' km';
export const fmtGBP = (pence) => {
  if (pence == null) return '';
  return '£' + (pence / 100).toFixed(pence % 100 === 0 ? 0 : 2);
};
export const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
export const minutesToHHMM = (mins) => {
  mins = Math.max(0, Math.round(mins));
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
};
export const hhmmToMinutes = (hhmm) => {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};
export const uuid = () =>
  ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

// ----- Local storage backend (Supabase-shaped) -------------------------------
const local = {
  _read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  },
  _write(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  },
  _keyFor(table) {
    if (table === 'wm_customers') return KEYS.customers;
    if (table === 'wm_jobs') return KEYS.jobs;
    if (table === 'wm_day_plans') return KEYS.plans;
    throw new Error('Unknown table: ' + table);
  },
  async list(table, { where } = {}) {
    let rows = this._read(this._keyFor(table));
    if (where) {
      rows = rows.filter(r => Object.entries(where).every(([k, v]) => r[k] === v));
    }
    return rows;
  },
  async get(table, id) {
    const rows = this._read(this._keyFor(table));
    return rows.find(r => r.id === id) || null;
  },
  async insert(table, row) {
    const rows = this._read(this._keyFor(table));
    const now = new Date().toISOString();
    const full = { id: uuid(), created_at: now, updated_at: now, ...row };
    rows.push(full);
    this._write(this._keyFor(table), rows);
    return full;
  },
  async update(table, id, patch) {
    const rows = this._read(this._keyFor(table));
    const i = rows.findIndex(r => r.id === id);
    if (i === -1) return null;
    rows[i] = { ...rows[i], ...patch, updated_at: new Date().toISOString() };
    this._write(this._keyFor(table), rows);
    return rows[i];
  },
  async upsert(table, row, conflictKeys) {
    const rows = this._read(this._keyFor(table));
    const i = rows.findIndex(r => conflictKeys.every(k => r[k] === row[k]));
    if (i === -1) return this.insert(table, row);
    return this.update(table, rows[i].id, row);
  },
  async remove(table, id) {
    const rows = this._read(this._keyFor(table));
    const next = rows.filter(r => r.id !== id);
    this._write(this._keyFor(table), next);
    return true;
  },
};

// ----- Backend switch --------------------------------------------------------
// Swap in a Supabase backend later by exporting an object with the same shape.
export const db = STORAGE === 'local' ? local : local;

// ----- Settings (start address, default times) -------------------------------
export const settings = {
  get() {
    try { return JSON.parse(localStorage.getItem(KEYS.settings) || '{}'); }
    catch { return {}; }
  },
  set(patch) {
    const cur = this.get();
    localStorage.setItem(KEYS.settings, JSON.stringify({ ...cur, ...patch }));
  },
};

// ----- Geocoding (Nominatim, throttled) --------------------------------------
// Nominatim asks for max 1 req/sec + a referrer/UA. We add a short throttle
// and cache results in localStorage so repeat addresses are instant.
const GEO_CACHE_KEY = 'wm_geo_cache_v1';
const geoCache = (() => {
  try { return JSON.parse(localStorage.getItem(GEO_CACHE_KEY) || '{}'); }
  catch { return {}; }
})();
const persistGeoCache = () =>
  localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geoCache));

let geoQueue = Promise.resolve();
export function geocode(address) {
  if (!address || !address.trim()) return Promise.resolve(null);
  const key = address.trim().toLowerCase();
  if (geoCache[key]) return Promise.resolve(geoCache[key]);
  geoQueue = geoQueue
    .catch(() => {})
    .then(() => new Promise(r => setTimeout(r, 1100)))
    .then(async () => {
      const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=gb&q=' + encodeURIComponent(address);
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('geocode failed');
      const json = await res.json();
      if (!json.length) return null;
      const { lat, lon, display_name } = json[0];
      const point = { lat: parseFloat(lat), lng: parseFloat(lon), display_name };
      geoCache[key] = point;
      persistGeoCache();
      return point;
    });
  return geoQueue;
}

// ----- Routing (OSRM) --------------------------------------------------------
// We use the public OSRM demo server. For production, swap in your own
// OSRM/OpenRouteService endpoint via this constant.
const OSRM_BASE = 'https://router.project-osrm.org';

// Haversine fallback when OSRM is unreachable. Times assume 50 km/h average.
function haversineMatrix(points) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const n = points.length;
  const dist = Array.from({ length: n }, () => new Array(n).fill(0));
  const dur = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dLat = toRad(points[j].lat - points[i].lat);
      const dLng = toRad(points[j].lng - points[i].lng);
      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(points[i].lat)) * Math.cos(toRad(points[j].lat)) *
                Math.sin(dLng / 2) ** 2;
      const km = 2 * R * Math.asin(Math.sqrt(a));
      dist[i][j] = km * 1000;          // metres
      dur[i][j] = (km / 50) * 3600;    // seconds @ 50 km/h
    }
  }
  return { distances: dist, durations: dur, fallback: true };
}

export async function travelMatrix(points) {
  if (points.length < 2) return { distances: [[0]], durations: [[0]], fallback: false };
  const coords = points.map(p => `${p.lng},${p.lat}`).join(';');
  const url = `${OSRM_BASE}/table/v1/driving/${coords}?annotations=distance,duration`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('OSRM table failed');
    const json = await res.json();
    if (json.code !== 'Ok') throw new Error(json.message || 'OSRM error');
    return { distances: json.distances, durations: json.durations, fallback: false };
  } catch (err) {
    console.warn('[work] OSRM table failed, using haversine fallback', err);
    return haversineMatrix(points);
  }
}

export async function routeLine(points) {
  if (points.length < 2) return null;
  const coords = points.map(p => `${p.lng},${p.lat}`).join(';');
  const url = `${OSRM_BASE}/route/v1/driving/${coords}?geometries=geojson&overview=full`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('OSRM route failed');
    const json = await res.json();
    if (json.code !== 'Ok' || !json.routes?.length) throw new Error(json.message || 'OSRM error');
    return json.routes[0].geometry; // GeoJSON LineString
  } catch (err) {
    console.warn('[work] OSRM route failed, drawing straight line', err);
    return {
      type: 'LineString',
      coordinates: points.map(p => [p.lng, p.lat]),
    };
  }
}

// ----- TSP optimiser ---------------------------------------------------------
// For n <= 8 we brute-force the optimal sequence (40 320 permutations).
// For n > 8 we use nearest-neighbour seeded with each start, then 2-opt.
//
// Indices are layout:  0 = start, 1..n = jobs, n+1 (optional) = end.
// Returns the permutation of job indices (1..n) in the order to visit.
function permute(arr) {
  if (arr.length <= 1) return [arr];
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permute(rest)) out.push([arr[i], ...p]);
  }
  return out;
}
function routeCost(seq, startIdx, endIdx, dur) {
  let cost = dur[startIdx][seq[0]];
  for (let i = 0; i < seq.length - 1; i++) cost += dur[seq[i]][seq[i + 1]];
  if (endIdx != null) cost += dur[seq[seq.length - 1]][endIdx];
  return cost;
}
function bruteForce(jobIdxs, startIdx, endIdx, dur) {
  let best = jobIdxs, bestCost = Infinity;
  for (const perm of permute(jobIdxs)) {
    const c = routeCost(perm, startIdx, endIdx, dur);
    if (c < bestCost) { bestCost = c; best = perm; }
  }
  return { order: best, cost: bestCost };
}
function nearestNeighbour(jobIdxs, startIdx, endIdx, dur) {
  const remaining = new Set(jobIdxs);
  const order = [];
  let cur = startIdx;
  while (remaining.size) {
    let nx = null, nxDur = Infinity;
    for (const i of remaining) {
      if (dur[cur][i] < nxDur) { nxDur = dur[cur][i]; nx = i; }
    }
    order.push(nx);
    remaining.delete(nx);
    cur = nx;
  }
  return { order, cost: routeCost(order, startIdx, endIdx, dur) };
}
function twoOpt(order, startIdx, endIdx, dur) {
  let best = order.slice();
  let bestCost = routeCost(best, startIdx, endIdx, dur);
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 0; i < best.length - 1; i++) {
      for (let k = i + 1; k < best.length; k++) {
        const next = best.slice(0, i).concat(best.slice(i, k + 1).reverse()).concat(best.slice(k + 1));
        const c = routeCost(next, startIdx, endIdx, dur);
        if (c < bestCost - 0.0001) { best = next; bestCost = c; improved = true; }
      }
    }
  }
  return { order: best, cost: bestCost };
}

// Optimise a day plan.
//   start  : { lat, lng }                    (e.g. depot/home)
//   end    : { lat, lng } or null            (null = open route, no return)
//   jobs   : [{ id, lat, lng, estimated_minutes, fixed_time?, priority? }, ...]
// Returns: { sequence: [job, ...], legs: [{ km, minutes, arrive, depart }, ...]
//          totalDistanceKm, totalDriveMinutes, returnLeg?: { km, minutes } }
export async function optimiseDay({ start, end, jobs, startTime = '08:00' }) {
  // Filter to jobs that have coordinates.
  const located = jobs.filter(j => j.lat != null && j.lng != null);
  const unlocated = jobs.filter(j => j.lat == null || j.lng == null);
  if (!located.length) {
    return { sequence: [], legs: [], totalDistanceKm: 0, totalDriveMinutes: 0, unlocated };
  }

  // Pull out fixed-time jobs and order them by their time. They form a
  // skeleton the optimiser plans around.
  const fixed = located.filter(j => j.priority === 3 && j.fixed_time)
    .sort((a, b) => hhmmToMinutes(a.fixed_time) - hhmmToMinutes(b.fixed_time));
  const flexible = located.filter(j => !(j.priority === 3 && j.fixed_time));

  // For the MVP, we optimise flexible jobs assuming they slot in *between*
  // fixed jobs. If there are no fixed jobs we just optimise the lot.
  const points = [start, ...located.map(j => ({ lat: j.lat, lng: j.lng })), ...(end ? [end] : [])];
  const matrix = await travelMatrix(points);
  const dur = matrix.durations;
  const dist = matrix.distances;
  const startIdx = 0;
  const endIdx = end ? points.length - 1 : null;
  const jobIdxs = located.map((_, i) => i + 1);

  // Helper to recover the actual job objects from indices.
  const jobAt = (idx) => located[idx - 1];

  let order;
  if (fixed.length === 0) {
    // Pure flexible: optimise whole set.
    if (jobIdxs.length <= 8) {
      ({ order } = bruteForce(jobIdxs, startIdx, endIdx, dur));
    } else {
      const nn = nearestNeighbour(jobIdxs, startIdx, endIdx, dur);
      ({ order } = twoOpt(nn.order, startIdx, endIdx, dur));
    }
  } else {
    // Anchor on fixed jobs; insert flexible into best slot greedily.
    order = fixed.map(j => jobIdxs[located.indexOf(j)]);
    const fixedSet = new Set(order);
    const flexIdxs = jobIdxs.filter(i => !fixedSet.has(i));
    for (const fi of flexIdxs) {
      let bestPos = 0, bestCost = Infinity;
      for (let pos = 0; pos <= order.length; pos++) {
        const candidate = order.slice(0, pos).concat(fi, order.slice(pos));
        const c = routeCost(candidate, startIdx, endIdx, dur);
        if (c < bestCost) { bestCost = c; bestPos = pos; }
      }
      order = order.slice(0, bestPos).concat(fi, order.slice(bestPos));
    }
  }

  // Build the legs.
  const sequence = order.map(jobAt);
  let cursor = hhmmToMinutes(startTime);
  let prevIdx = startIdx;
  let totalDistanceMetres = 0;
  let totalDriveSeconds = 0;
  const legs = sequence.map((job, i) => {
    const idx = order[i];
    const legMetres = dist[prevIdx][idx];
    const legSeconds = dur[prevIdx][idx];
    totalDistanceMetres += legMetres;
    totalDriveSeconds += legSeconds;
    const driveMin = Math.round(legSeconds / 60);
    let arrive = cursor + driveMin;
    // Respect fixed times — bump arrive up to fixed_time, but never earlier.
    if (job.priority === 3 && job.fixed_time) {
      arrive = Math.max(arrive, hhmmToMinutes(job.fixed_time));
    }
    const depart = arrive + (job.estimated_minutes || 60);
    cursor = depart;
    prevIdx = idx;
    return {
      job,
      legKm: legMetres / 1000,
      legMinutes: driveMin,
      arrive: minutesToHHMM(arrive),
      depart: minutesToHHMM(depart),
    };
  });
  let returnLeg = null;
  if (end) {
    const legSeconds = dur[prevIdx][endIdx];
    const legMetres = dist[prevIdx][endIdx];
    totalDistanceMetres += legMetres;
    totalDriveSeconds += legSeconds;
    returnLeg = { km: legMetres / 1000, minutes: Math.round(legSeconds / 60) };
  }

  return {
    sequence,
    legs,
    returnLeg,
    totalDistanceKm: totalDistanceMetres / 1000,
    totalDriveMinutes: Math.round(totalDriveSeconds / 60),
    usedFallback: matrix.fallback,
    unlocated,
  };
}

// ----- Convenience: ensure coords on save -----------------------------------
// When saving a customer or job with an address but no lat/lng, kick off
// geocoding in the background. Returns the row with coords if found within
// a short timeout; otherwise returns the row as-is and updates later.
export async function ensureCoords(row) {
  if (!row.address) return row;
  if (row.lat != null && row.lng != null) return row;
  try {
    const point = await geocode(row.address);
    if (point) {
      row.lat = point.lat;
      row.lng = point.lng;
    }
  } catch (err) {
    console.warn('[work] geocode failed for', row.address, err);
  }
  return row;
}

// ----- UI helpers ------------------------------------------------------------
export function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = 'wm-toast wm-toast--' + type;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-on'));
  setTimeout(() => {
    el.classList.remove('is-on');
    setTimeout(() => el.remove(), 250);
  }, 3200);
}

// ----- Sample data seed (one-shot, only if empty) ----------------------------
// Helps first-time users see the tool in action without typing five addresses.
export async function maybeSeedDemo() {
  const existing = await db.list('wm_jobs');
  if (existing.length) return false;
  const today = todayISO();
  const customers = [
    { name: 'Mrs Patel',      address: '12 Park Road, Hounslow TW3 1AB', phone: '07700 900111' },
    { name: 'Mr Singh',       address: '88 High Street, Brentford TW8 8AA', phone: '07700 900222' },
    { name: 'Acorn Care Home', address: '5 Acorn Avenue, Twickenham TW1 4DT', phone: '07700 900333', company: 'Acorn Care Home Ltd' },
    { name: 'Mr Williams',    address: '23 Lampton Road, Hounslow TW3 1JG', phone: '07700 900444' },
    { name: 'Ms Khan',        address: '10 Bath Road, Hounslow TW3 3HL', phone: '07700 900555' },
  ];
  const savedCustomers = [];
  for (const c of customers) {
    const row = await ensureCoords({ ...c, user_id: 'local' });
    savedCustomers.push(await db.insert('wm_customers', row));
  }
  const titles = [
    { t: 'Lawn cut + edge', mins: 45 },
    { t: 'Hedge trim (front)', mins: 60 },
    { t: 'Mow + strim',       mins: 90 },
    { t: 'Full garden tidy',  mins: 120 },
    { t: 'Lawn cut',          mins: 30 },
  ];
  for (let i = 0; i < savedCustomers.length; i++) {
    const cust = savedCustomers[i];
    const job = await ensureCoords({
      user_id: 'local',
      customer_id: cust.id,
      title: titles[i].t,
      address: cust.address,
      estimated_minutes: titles[i].mins,
      scheduled_date: today,
      priority: 0,
      status: 'scheduled',
    });
    await db.insert('wm_jobs', job);
  }
  return true;
}
