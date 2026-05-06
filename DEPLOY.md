# MowRight UK — Deploy Instructions

Everything needed to take this from "ready" to "live on mowright.co.uk".

## Status

- [x] Code on GitHub (`Bozmaps-Git/mowright-uk`)
- [x] SEO meta tags + Open Graph + JSON-LD added
- [x] Favicons (svg, ico, 32px, 180px, 192px, 512px) generated
- [x] og.png (1200×630) generated for social sharing
- [x] robots.txt + sitemap.xml created
- [x] privacy.html created (UK GDPR-compliant stub)
- [x] vercel.json upgraded (HSTS, cache headers, cleanUrls, redirects)
- [x] site.webmanifest for PWA-ready behaviour
- [ ] Commit + push to main (do in VS Code, see Step 1)
- [ ] Vercel onboarding + import (Step 2)
- [ ] Buy mowright.co.uk at Fasthosts (Step 3)
- [ ] Add domain in Vercel + paste DNS at Fasthosts (Step 4)

---

## Step 1 — Commit and push (VS Code, 1 minute)

In VS Code's Source Control panel (left sidebar, branch icon):

1. You'll see ~12 new/modified files. Click **+** next to "Changes" to stage all.
2. Commit message: `Add SEO, favicons, OG image, privacy policy, improved vercel.json`
3. Click **Sync Changes** (or **Commit & Push**).

Or in the VS Code terminal:

```bash
git add .
git commit -m "Add SEO, favicons, OG image, privacy policy, improved vercel.json"
git push
```

---

## Step 2 — Vercel onboarding + import (90 seconds)

Your Vercel account is in "limited" state — not finished onboarding. We fix that and import the repo in one flow.

1. Go to **https://vercel.com/new**.
2. Sign in with GitHub if prompted. If a "Welcome" / "Get Started" wizard appears, click through it (pick **Hobby** plan — free).
3. Under "Import Git Repository", find `Bozmaps-Git/mowright-uk`. If it's not listed, click **Adjust GitHub App Permissions** → grant Vercel access to the `Bozmaps-Git` org → return.
4. Click **Import** next to the repo.
5. Configuration screen:
   - Framework Preset: **Other**
   - Project Name: `mowright-uk` (default)
   - Build Command: leave empty
   - Output Directory: leave empty
   - Environment Variables: none
6. Click **Deploy**. Wait ~30 seconds.
7. You'll get a URL like `mowright-uk.vercel.app`. Open it. Verify the site loads. Test a search, click a mower, open the privacy page (`/privacy`).

From now on, **every push to main auto-deploys**. No more manual deploys ever.

---

## Step 3 — Buy mowright.co.uk at Fasthosts (5 minutes)

1. Go to **https://www.fasthosts.co.uk** → Domains → search `mowright.co.uk`.
2. Add to basket. Skip the email/website upsells (we're using Vercel for hosting).
3. **2-year registration recommended** (~£20). Discourages domain squatters.
4. Checkout. The domain is usually live in your control panel within 5 minutes.

---

## Step 4 — Connect Fasthosts → Vercel (10 minutes + DNS wait)

### 4a. In Vercel

1. Open your `mowright-uk` project → **Settings** → **Domains**.
2. Type `mowright.co.uk` → click **Add**.
3. Vercel shows you DNS records. Note them down (or keep tab open).
4. Repeat: add `www.mowright.co.uk` as well. Vercel will offer to set it as a redirect to the apex — accept that.

### 4b. In Fasthosts Control Panel

1. Log in at https://control-panel.fasthosts.co.uk
2. Domains → click `mowright.co.uk` → **DNS** (or "DNS Records" / "Advanced DNS").
3. **Delete** any existing A records for `@` and any CNAME for `www` that point to Fasthosts parking. Critical — leftover records will fight your new ones.
4. Add new **A record**:
   - Hostname: `@`
   - Type: `A`
   - Points to: `76.76.21.21`
   - TTL: 300 (5 minutes — speeds up future changes)
5. Add new **CNAME record**:
   - Hostname: `www`
   - Type: `CNAME`
   - Points to: `cname.vercel-dns.com`
   - TTL: 300
6. Save.

### 4c. Wait

- Open https://dnschecker.org → enter `mowright.co.uk` → check the A record. When you see `76.76.21.21` from most locations, you're propagated.
- In Vercel, the domain status flips from red ("Invalid Configuration") to green ("Valid").
- HTTPS / SSL is automatic. Vercel issues a Let's Encrypt cert as soon as DNS validates. **You don't pay for SSL.**
- Total wait: usually 5-30 minutes. Worst case 24 hours.

### 4d. Verify

- Visit https://mowright.co.uk — site loads.
- Visit https://www.mowright.co.uk — redirects to apex.
- Visit http://mowright.co.uk (no S) — auto-redirects to HTTPS.
- Test on phone (4G, not WiFi) to confirm public DNS works.

---

## Post-launch (do this same day)

1. **Google Search Console** — https://search.google.com/search-console
   - Add property: `mowright.co.uk`
   - Verify via DNS TXT record (Fasthosts → DNS → add TXT)
   - Submit sitemap: `https://mowright.co.uk/sitemap.xml`

2. **Test Open Graph** — paste https://mowright.co.uk into:
   - https://www.opengraph.xyz
   - https://developers.facebook.com/tools/debug/
   - WhatsApp it to yourself; confirm preview image renders.

3. **Lighthouse audit** — Chrome DevTools (F12) → Lighthouse tab → Generate report. Target 90+ on Performance, Accessibility, SEO, Best Practices.

4. **UptimeRobot** — https://uptimerobot.com (free) → add monitor for `https://mowright.co.uk` every 5 minutes.

## Post-launch (week 1)

- Add Google Analytics 4 (or Vercel Analytics — privacy-friendly, paid above free tier).
- Email forwarder: Fasthosts → Mailboxes → set `hello@mowright.co.uk` to forward to your Gmail.
- Apply for Google AdSense once the site has 4+ weeks of organic traffic and ~20+ pieces of content. Don't apply early — they reject thin sites.
- Add cookie consent banner if you enable analytics or AdSense (UK GDPR requirement).

---

## Reverting / rolling back

If a deploy ever breaks the site:

1. Vercel dashboard → Project → Deployments
2. Find the last green/working deployment
3. Click **... → Promote to Production**
4. Live in 5 seconds. No git revert needed.
