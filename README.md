# Dental Clinic Website — "Zâmbet Mare"

A complete multi-page website for a family dental clinic in Galați, Romania, built for patients
of all ages and especially for children. I built it from scratch, from the visual identity to the
code and automated tests, with three goals: **patients can book a visit in as few steps as
possible**, **the site is accessible to everyone**, and **no personal data is collected without
a reason**.

The site content is in Romanian, for a local audience.

**Tech stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · modern CSS ·
Playwright · axe-core · ESLint

---

## What I built

- **9 pages plus 7 service pages**, all generated from the same data: home, services, for kids,
  team, prices, FAQ, booking, contact, privacy policy and a custom 404 page.
- **Original visual identity:** a teal, sunny yellow and coral palette on cream, a logo and three
  mascots drawn entirely in SVG, an illustration for each service, team avatars generated from
  parameters, and a stylised map.
- **Booking form** with per-field validation, Romanian phone number format, and the service
  pre-selected when the patient comes from a service page.
- **Section for children:** the first visit explained step by step, an animated tooth-brushing
  demo and an interactive preparation checklist.
- **Searchable FAQ**, a price table per service, and a sticky "Call now" bar on mobile.

## Decisions and why

| Decision | Why |
| --- | --- |
| **Mobile-first** | Most patients look for a dentist on their phone. The "Call now" bar and click-to-call numbers shorten the path to a booking. |
| **Static export, no server** | Fast loading, near-zero hosting cost, minimal attack surface. The site runs on any static host. |
| **Zero external requests** | Self-hosted fonts, no Google Maps, no analytics, no cookies. No consent banner is needed and visitors are not tracked. An automated test checks this on every page. |
| **Original SVG illustrations** | A warm, consistent, child-friendly look, no stock photo licensing issues, and very small file sizes. |
| **Content separated from code** | Services, prices, team and FAQ live in data files (`data/`), and the clinic name and contact details in a single config (`config/site.ts`). Pages and the price table are generated from them. |
| **Booking without a required backend** | By default the form sends no data and offers a pre-filled email and a call button instead. To send real bookings, an endpoint (e.g. Formspree) is set through an environment variable, with no code changes. |
| **WCAG 2.2 AA accessibility** | A clinic serves patients of all ages, including keyboard and screen reader users. Colour contrast is tuned for text on light backgrounds. |

## Quality

**Accessibility**
- "Skip to content" link, fully keyboard-operable menu (Escape closes it), visible focus.
- Form errors are announced to screen readers and focus moves to the first invalid field.
- All animations stop when the system requests reduced motion (`prefers-reduced-motion`);
  the brushing demo only starts on demand and has a pause button.
- Content stays visible without JavaScript.

**Automated testing** (Playwright, on a mobile and a desktop profile)
- axe audit (WCAG 2.2 AA) on every page, including the 404 page.
- Booking form: errors, focus handling, success state and service pre-selection.
- No page makes requests to external domains.
- Keyboard navigation, mobile menu, "Call now" bar, reduced motion and the brushing demo.

**Performance**
- Static HTML, self-hosted fonts subset for Romanian diacritics (ă, â, î, ș, ț),
  vector illustrations instead of raster images.
- Page transitions with the View Transitions API.

## Project structure

```
app/                 pages (App Router), global styles, self-hosted fonts
components/          header, footer, booking form, cards, "Call now" bar, brushing demo
components/illustrations/
  Mascots.tsx        mascots and decorative elements
  ServiceArt.tsx     illustration for each service
  Avatar.tsx         team avatars generated from parameters
  MapArt.tsx         stylised map on the Contact page
config/site.ts       clinic name, phone, email, area, opening hours, menu
data/                services and prices, team, FAQ
lib/booking.ts       booking form validation logic
tests/               Playwright + axe tests
scripts/serve.mjs    local server with compression for the static build
```

## Running locally

```bash
npm install
npm run dev          # development: http://localhost:3000
npm run build        # static export to out/
npm run serve        # serves out/ at http://localhost:4173
npm run lint
npm run typecheck
npm test             # Playwright + axe (run after build)
```

## Configuration

- **Name and contact details:** `config/site.ts`. The clinic name comes from a single constant
  (`CLINIC_NAME`) used in titles, logo, footer and copy.
- **Services and prices:** `data/services.ts`. The `/preturi/` page and each service's price
  section update automatically.
- **Team:** `data/team.ts`, including avatar appearance (hair, skin, coat, glasses, etc.).
- **FAQ:** `data/faq.ts`.
- **Colours:** CSS variables at the top of `app/globals.css`.
- **Sending bookings:** set `NEXT_PUBLIC_BOOKING_ENDPOINT` at build time:

  ```bash
  NEXT_PUBLIC_BOOKING_ENDPOINT=https://formspree.io/f/<id> npm run build
  ```

## Deployment

The `out/` folder can be deployed to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages). The 404 page is served from `out/404.html`.

## Fonts

Fredoka (headings) and Nunito Sans (body), self-hosted, SIL Open Font License.

---

*Portfolio project. Contact details are placeholder data, and pages use `noindex` until the site
is published for a client.*
