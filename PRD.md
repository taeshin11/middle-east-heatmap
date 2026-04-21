# Middle East Heatmap — PRD

> Short Title: Conflict Intensity Heatmap for the Middle East
> Last Updated: 2026-04-14

---

## Overview

Middle East Heatmap is a conflict intensity visualisation platform focused exclusively on the Middle East and North Africa (MENA) region. It assigns tension scores to each country based on active conflicts, military posturing, diplomatic breakdowns, and incident frequency, then renders these as a colour-coded heatmap that lets users instantly see where conditions are hottest. The deeper the red, the higher the tension level.

The platform tracks ongoing incidents — military strikes, border crossings, drone attacks, diplomatic expulsions, and protests — and aggregates them into country-level risk profiles. Two dedicated editorial sections focus on the most consequential dynamics in the region: the Iran-Israel tension axis and Iran's evolving military threat posture. These long-form sections provide context beyond the incident feed.

The site targets a global audience of news consumers, policy researchers, defence analysts, and anyone trying to understand the dynamics of the world's most volatile region. By presenting data visually through a heatmap rather than through text-heavy reports, it lowers the barrier to comprehension and drives strong engagement and social sharing.

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| News consumer / general public | Hard to grasp relative intensity of different ME conflicts from headlines | Heatmap gives instant visual comparison of tension levels by country |
| Defence / security analyst | Needs to monitor incident frequency and escalation trends | Incident feed with type/severity filters and country detail pages |
| Journalist / editor | Needs regional context before covering a specific story | Country pages with tension history, incident breakdown, and related links |
| Academic researcher | No single free source for comparative MENA tension data | Structured JSON data accessible via API routes, citable pages |
| Policy advisor | Needs to brief decision-makers quickly on Iran-Israel dynamics | Dedicated Iran-Israel tension page with timeline and analysis |
| Travel / risk manager | Needs to assess which ME countries carry elevated risk | Country-level risk scores with trend indicators |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en, ar, fa, he, fr, tr, ru, zh)
- Data: JSON files in /public/data/ (countries.json, incidents.json)
- Map/Heatmap: react-simple-maps or Leaflet.js with custom colour scale
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Domain: middle-east-heatmap.vercel.app

---

## Pages & Routes

### `[locale]/` — Homepage / Main Heatmap
- Full-page or above-the-fold SVG/canvas heatmap of the Middle East
- Countries coloured by tension score (green → yellow → orange → red → dark red)
- Hover/tap on any country to see pop-up: country name, tension score, top recent incident
- Country list table below map, sortable by tension level or recent activity
- Latest incidents ticker or feed
- Language switcher

### `[locale]/country/[slug]/` — Country Detail Page
- Country name, flag, tension score, trend arrow
- Tension breakdown: military activity, diplomatic incidents, internal conflict, protest/civil unrest
- Historical tension line chart (past 6–12 months)
- Full list of incidents attributed to this country
- Related countries (neighbours with their tension scores)
- Editorial context paragraph
- SEO: `[Country] conflict tension score 2026 | Middle East Heatmap`

### `[locale]/incidents/` — Incidents List Page
- Chronological feed of all tracked incidents
- Filter by: country, incident type, severity, date range
- Each incident card: date, title, country flag, type badge, severity indicator
- Pagination or infinite scroll
- Links to individual incident detail (if `incidents/[id]` exists, or inline expansion)

### `[locale]/iran-israel-tension/` — Iran-Israel Tension Page
- Dedicated long-form page on the Iran-Israel conflict axis
- Current tension level gauge
- Timeline of key events (nuclear negotiations, strikes, proxy actions)
- Incident feed filtered to Iran + Israel
- Analysis sections: nuclear programme status, proxy network map, air defence posture
- Frequently cited as a standalone URL — strong SEO target

### `[locale]/iran-military-threat/` — Iran Military Threat Page
- Iran's military capabilities overview (missiles, drones, naval assets)
- Current threat level assessment
- Recent military incidents involving Iran
- Proxy network: Hezbollah, Houthis, Iraqi PMF, Hamas linkage
- Regional threat radius visualisation
- Structured data for SEO: FAQPage schema with common questions

### `[locale]/about/` — About Page
- Platform mission, data methodology, update cadence
- Tension score formula explanation
- Data source attribution

### `[locale]/faq/` — FAQ Page
- How tension scores are calculated
- What counts as an incident
- How to interpret the heatmap colours
- Data update frequency

### `api/` — Internal API Routes
- `api/countries` — returns countries.json
- `api/incidents` — returns incidents.json (supports ?country= and ?type= query params)

---

## Data Model

### `public/data/countries.json`
```json
[
  {
    "slug": "iran",
    "name": "Iran",
    "nameAr": "إيران",
    "tensionScore": 91,
    "tensionLevel": "critical",
    "trend": "rising",
    "breakdown": {
      "militaryActivity": 95,
      "diplomaticIncidents": 88,
      "internalConflict": 60,
      "civilUnrest": 72
    },
    "history": [
      { "month": "2025-10", "score": 85 },
      { "month": "2025-11", "score": 87 },
      { "month": "2025-12", "score": 89 },
      { "month": "2026-01", "score": 90 },
      { "month": "2026-02", "score": 90 },
      { "month": "2026-03", "score": 91 }
    ],
    "capital": "Tehran",
    "population": 87000000,
    "region": "Persian Gulf",
    "neighbors": ["iraq", "turkey", "azerbaijan", "afghanistan", "pakistan"],
    "summary": "Iran remains the region's highest-tension actor due to ongoing nuclear programme development, proxy wars, and confrontations with Israel and US forces.",
    "lastUpdated": "2026-04-01"
  }
]
```

### `public/data/incidents.json`
```json
[
  {
    "id": "inc-0412",
    "date": "2026-04-12",
    "title": "Iranian drone swarm targets Israeli naval vessel in Red Sea",
    "countries": ["iran", "israel"],
    "incidentType": "military-strike",
    "severity": 8,
    "casualties": 0,
    "summary": "Iran-affiliated forces launched a drone swarm toward an Israeli-linked cargo vessel operating in the Red Sea. Israeli naval defence intercepted all drones.",
    "source": "Al Jazeera",
    "sourceUrl": "https://aljazeera.com/..."
  }
]
```

**Incident types:** `military-strike`, `drone-attack`, `missile-launch`, `naval-incident`, `diplomatic-expulsion`, `protest`, `assassination`, `ceasefire-violation`, `cyber-attack`
**Severity scale:** 1–10 (1 = minor diplomatic, 10 = mass-casualty attack)
**Tension levels:** `low` (0–24), `elevated` (25–49), `high` (50–74), `critical` (75–100)

---

## Milestones & Git Push Points

| Milestone | Description | Deliverable |
|---|---|---|
| M0 | Project scaffold | Next.js 15 + Tailwind + next-intl, Vercel deploy, folder structure |
| M1 | Data layer | countries.json (20 ME/NA countries), incidents.json (100+ incidents) |
| M2 | Heatmap homepage | SVG/Leaflet heatmap rendering with colour scale, country pop-ups |
| M3 | Country detail pages | country/[slug] with charts, incident feed, trend line |
| M4 | Editorial pages | iran-israel-tension/ and iran-military-threat/ fully written |
| M5 | i18n + incidents feed | All 8 languages, incidents/ list page with filters |
| M6 | Ads + launch | AdSense/Adsterra units, Privacy/Terms/FAQ/About, sitemap, final push |

---

## Agent Team

### Frontend Agent
- Responsibilities: Heatmap SVG/Leaflet integration, colour scale logic, interactive country pop-ups, responsive layout, chart components
- Key files: `app/[locale]/page.tsx`, `components/Heatmap.tsx`, `components/CountryCard.tsx`, `components/IncidentCard.tsx`, `components/TensionChart.tsx`

### Backend / Data Agent
- Responsibilities: countries.json and incidents.json population, incident classification, API route handlers, data schema validation
- Key files: `public/data/countries.json`, `public/data/incidents.json`, `app/api/countries/route.ts`, `app/api/incidents/route.ts`

### SEO / Content Agent
- Responsibilities: Iran-Israel tension page editorial content, Iran military threat page content, all meta tags, OG images, sitemap, translations
- Key files: `app/[locale]/iran-israel-tension/page.tsx`, `app/[locale]/iran-military-threat/page.tsx`, `messages/en.json`, `app/sitemap.ts`

### QA Agent
- Responsibilities: Heatmap renders correctly across browsers, all country slugs resolve, incident filters work, mobile touch interactions on heatmap
- Key files: Lighthouse reports, browser stack screenshots, `tests/`

---

## SEO Strategy

| Target Keyword | Monthly Search Volume (est.) | Page |
|---|---|---|
| middle east conflict map | 5,400 | Homepage |
| iran israel tension 2026 | 8,100 | iran-israel-tension/ |
| middle east heatmap | 2,200 | Homepage |
| iran military threat | 4,400 | iran-military-threat/ |
| middle east war map | 3,600 | Homepage |
| iran israel war update | 6,600 | iran-israel-tension/ |
| [country] conflict 2026 | varies | country/[slug] |
| middle east incidents tracker | 900 | incidents/ |
| iran nuclear threat | 3,200 | iran-military-threat/ |
| heatmap middle east conflict | 700 | Homepage |

**On-page SEO rules:**
- Homepage H1: "Middle East Conflict Heatmap — Live Tension Tracker 2026"
- iran-israel-tension/ title: "Iran vs Israel Tension Tracker 2026 — Latest Incidents & Analysis"
- iran-military-threat/ title: "Iran Military Threat Assessment 2026 — Missiles, Drones & Proxies"
- country/[slug]/ title: "[Country] Conflict Tension Score 2026 | Middle East Heatmap"
- FAQPage JSON-LD on FAQ and editorial pages
- Arabic (ar) and Farsi (fa) translations prioritised for regional audience reach
- Hreflang tags for all 8 locales

---

## Launch Checklist

- [ ] Heatmap renders correctly on desktop and mobile (touch interactions work)
- [ ] All 20+ ME/NA countries present in countries.json with valid slugs
- [ ] All country/[slug] pages statically generated without 404s
- [ ] 100+ incidents in incidents.json, all with valid country references
- [ ] incidents/ list page filters working (country, type, severity)
- [ ] iran-israel-tension/ page fully written and SEO-optimised
- [ ] iran-military-threat/ page fully written and SEO-optimised
- [ ] All 8 language translation files complete
- [ ] Arabic (RTL) layout rendering correctly
- [ ] Farsi (RTL) layout rendering correctly
- [ ] Sitemap.xml submitted to Google Search Console
- [ ] Google AdSense ca-pub-7098271335538021 verified
- [ ] Adsterra units active
- [ ] Cookie consent banner (GDPR + region-appropriate)
- [ ] Privacy, Terms, About, FAQ pages live
- [ ] Open Graph images for homepage and editorial pages
- [ ] Lighthouse Performance > 80 on mobile
- [ ] No console errors in production build
- [ ] Vercel domain middle-east-heatmap.vercel.app live and HTTPS
- [ ] 404 custom page in place
