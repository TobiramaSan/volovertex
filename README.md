# VoloVertex — Launch Website

A single-page conversion website for VoloVertex, built with React 18 and Vite.
Content and structure follow the *VoloVertex Commercial Website Sitemap & Developer Brief*.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into /dist
npm run preview   # preview the production build
```

`dist/` is a static folder — deploy it to Netlify, Vercel, Cloudflare Pages or any host.

---

## Fill these in before launch

Everything below lives in **`src/data/content.js`** unless stated otherwise.

1. **Contact details** — `contact.whatsappNumber`, `phoneDisplay`, `phoneDial`, `email`,
   `partnershipsEmail`. The WhatsApp number must be digits only in international format,
   no `+` or spaces (e.g. `2348012345678`). Until these are set, the WhatsApp, call and
   email links fall back to the request form so nothing is a dead link.
2. **Form submission** — `src/components/RequestAssistance.jsx`, in `handleSubmit`. The
   marked `TODO` is where you POST the request to your backend, CRM or a form service.
   Right now it logs the payload and shows the confirmation state.
3. **Photography** — drop files into `public/images/` and set `photos.hero`,
   `photos.earlyFlight`, `photos.arrival`, `photos.business`. Any left as `null` shows the
   built-in illustration instead. Free, commercial-use sources:
   <https://unsplash.com/s/photos/lagos> and <https://unsplash.com/s/photos/airport>.
4. **Legal pages** — `footer.legal` links point at `#`. Point them at the real pages.
5. **Domain** — update `<link rel="canonical">` and the Open Graph URL in `index.html`.

---

## Brand

The palette is sampled directly from the supplied logo and defined as CSS variables at the
top of `src/styles/global.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--pine` | `#1F5451` | logo teal; primary buttons, links |
| `--pine-deep` | `#0E2B29` | dark sections, footer |
| `--gold` | `#C9A87C` | logo gold; accents, emphasis on dark |
| `--gold-deep` | `#8A6A33` | gold for small text on light grounds (contrast-safe) |
| `--ground` / `--tint` | `#F4F6F5` / `#E9EFEC` | page and alternating section grounds |

**Type:** Cormorant Garamond (display, echoes the engraved logo wordmark) over Manrope
(interface and body), loaded from Google Fonts in `index.html`.

**Logo files** in `public/images/`, cut from the supplied artwork with transparent
backgrounds:

- `volovertex-mark.png` / `-light.png` — symbol only (header, favicon)
- `volovertex-lockup.png` / `-light.png` — symbol above wordmark (footer, social preview)

The `-light` variants are ivory, for dark backgrounds. The header pairs the symbol with a
typeset wordmark so it stays crisp and legible at small sizes; below 400px the symbol
carries the brand alone.

---

## Structure

```
src/
  App.jsx                 page composition — section order follows the brief's
                          homepage commercial flow (section 24)
  data/content.js         ALL copy, contact details, photo paths
  lib/links.js            WhatsApp deep links, click-to-call, journey-type routing
  styles/global.css       tokens, layout, responsive rules
  components/
    Header.jsx            sticky header, collapses to a menu below 1140px
    Hero.jsx              "Your Flight Is Booked. Your Journey Isn't."
    QuickActions.jsx      "Where are you going?" — four entry points
    CoreMessage.jsx       "We Don't Just Ask Where You're Going."
    LaunchServices.jsx    the four launch services
    PremiumServices.jsx   Executive / Family / Group
    EarlyFlight.jsx       early-flight use case + the logistics problem
    ArrivalAssist.jsx     arrival use case
    Difference.jsx        the six value propositions
    HowItWorks.jsx        the six steps
    Destinations.jsx      Lagos, Abuja, future markets
    About.jsx             mission, vision, brand architecture
    Business.jsx          partners and the corporate account
    Trust.jsx             the five trust pillars
    Faq.jsx               accordion
    RequestAssistance.jsx six-step journey request + closing CTA + contact
    Footer.jsx
    StickyBar.jsx         mobile WhatsApp | Call | Request assistance
    Icon.jsx, Logo.jsx, PhotoSlot.jsx, SectionHeading.jsx
```

### How the CTAs work

Every service CTA calls `requestJourney(type)` from `src/lib/links.js`. That scrolls to the
request form **and** pre-selects the matching journey type, so "Arrange my arrival" opens
the form already set to *From the airport* at step 2. WhatsApp CTAs use the pre-filled
messages in `whatsappMessages` — a different opening line for early flights, arrivals and
corporate enquiries.

### What the form captures

The request payload carries the CRM fields from section 28 of the brief: journey type,
flight number, date and time, airport, pickup, destination, name, phone/WhatsApp, email,
passenger count, luggage, additional requests, and lead source.

---

## Still to add (from the brief, needs services you choose)

These are deliberately not built in, because each needs an account or key:

- Email and admin notification on submission — wire into the `handleSubmit` TODO
- Payment integration
- Google Analytics / Meta Pixel and conversion tracking for the primary CTAs
- UTM and form-abandonment tracking
- A CMS for destinations, services and a blog

The markup is ready for them: every CTA is a real `<a>` or `<button>`, headings are in
order, and the page carries Open Graph tags and Organization structured data.
# volovertex
