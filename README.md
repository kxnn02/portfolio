# kennethclein — portfolio

Personal site for Kenneth Clein T. Fernandez, third-year BSIT at San Sebastian
College – Recoletos Manila, looking for full-stack internship hours.

Static Astro site. No client-side framework, no analytics, no CMS. The only
JavaScript on the page is the copy-email button.

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
```

## Content rules

`PRODUCT.md` is the source of truth for what may be claimed. Every number on
the site is listed there with where it was verified. If a number isn't in that
table, it doesn't go on the page — ask rather than estimate.

Notably, the CampusCurrents README says 43 migrations; the repo actually has 50.
Scraped READMEs are not a source.

## Deploy

Vercel, static build. `npx vercel --prod`. Canonical URL lives in
`astro.config.mjs` (`SITE`) until the custom domain is pointed.
