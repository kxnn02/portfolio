# kennethclein — portfolio

Personal site for Kenneth Clein T. Fernandez, third-year BSIT at San Sebastian
College – Recoletos Manila, looking for full-stack internship hours.

Static Astro site. No client-side framework, no analytics, no CMS. One inline
script (a `js` class, so reveal animations never hide content from a browser
without JS) and one small module: the copy-email button and a scroll observer
that adds a class.

## Commands

| Command           | Does                                  |
| ----------------- | ------------------------------------- |
| `npm install`     | Install dependencies                  |
| `npm run dev`     | Dev server on `localhost:4321`        |
| `npm run build`   | Build to `./dist/`                    |
| `npm run preview` | Serve the production build locally    |

## Structure

```text
src/
  layouts/Base.astro     document head, fonts, metadata
  pages/index.astro      the page and its copy
  styles/global.css      tokens, base type, layout
public/                  favicon, robots
astro.config.mjs         site URL, static output, fonts
PRODUCT.md               audience, voice, verified claims, non-claims
reference-brief.md       where the design is borrowed from, and what isn't
```

## Design

Light only. Warm paper (`#f8f5ef`), warm near-black ink, and one accent:
`#AE0F19`, sampled from the CampusCurrents landing page rather than picked by
eye. Green appears once, as the availability dot — it's a status colour, not a
brand one.

Type is Inter Tight for reading, Instrument Serif italic for the hero and one
line of the About section, JetBrains Mono for every label, year and stack line.
Motion is `transform`/`opacity` only; the scroll-linked drift sits behind
`@supports (animation-timeline: view())`, so browsers without it get a still
page rather than a broken one.

`reference-brief.md` records which reference each structural decision came from.

## Content rules

`PRODUCT.md` is the source of truth for what may be claimed. Every number on
the site is listed there with where it was verified. If a number isn't in that
table, it doesn't go on the page — ask rather than estimate.

Notably, the CampusCurrents README says 43 migrations; the repo actually has 50.
Scraped READMEs are not a source.

## Deploy

Vercel, static build. `npx vercel --prod`. Canonical URL lives in
`astro.config.mjs` (`SITE`) until the custom domain is pointed.
