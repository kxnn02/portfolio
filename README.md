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

## Checks

| Check         | Command                                                   |
| ------------- | --------------------------------------------------------- |
| Built output  | `npm run build` (runs `scripts/check-built.mjs` automatically) |
| Design drift  | `dembrandt <url> --compare .dembrandt/baseline.json`       |
| Re-baseline   | `dembrandt <url> --approve --compare .dembrandt/baseline.json` |
| Social card   | `npm run preview` then `npm run og`                        |

`scripts/check-built.mjs` runs at the end of every build and fails on two things
the source cannot show: a minifier fold that silently kills the scroll-driven CSS,
and a print block that stops resolving the scroll reveals. See PRODUCT.md.

`.dembrandt/baseline.json` is the frozen token set — colours, type sizes, radii — captured from production on 2026-10-20. Run the compare against a preview deploy before shipping; the command exits non-zero when a token changes, so an intentional change needs `--approve` and an intentional commit.

Re-approved once, for the motion pass: one new duration (0.9s), one new easing
(`cubic-bezier(0.77, 0, 0.175, 1)`, the screenshot wipe), one new mono style and
one new border pair (the stack strip), and a higher accent count from its
separators. No colour value changed. The same compare is also the check that the
scroll-driven animations are really running — `drift-away` and `drift-away-soft`
reappear in the extracted animation list, which they could not do while the
minifier was compiling them out.

Measured 2026-10-20 on a throttled mobile profile (390×844, 4× CPU, 1.6 Mbps / 150 ms RTT, median of 3): **LCP 804 ms**, **CLS 0.000**, 358 KB over 10 requests, 264 DOM nodes. WCAG contrast: every pair AA or AAA, including hover and focus states. Tap targets are 19–24px tall but all sit ≥24px apart, so they pass WCAG 2.2 target size on the spacing exception.

## Structure

```text
src/
  layouts/Base.astro     document head, fonts, metadata
  pages/index.astro      the page and its copy
  styles/global.css      tokens, base type, layout, motion
public/                  favicon, robots, og.png
scripts/check-built.mjs  build gate — catches what the source can't show
scripts/make-og.mjs      regenerates public/og.png from the real hero
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

Motion is the "instrument" thesis, picked by the owner from three: hero lines
rise out of a mask and settle, project text reveals while its screenshot wipes
across a frame that is already on the page, the four projects' stacks run as one
slow strip that pauses on hover, and a pointer-parallax field of at most 12px
applies on a fine pointer. `transform`/`opacity`/`clip-path` only, and nothing
animated is fetched. The scroll-linked drift and the header progress rule sit
behind `@supports (animation-timeline: scroll())`, so browsers without it get a
still page rather than a broken one.

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
