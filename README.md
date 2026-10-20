# kennethclein — portfolio

Personal site for Kenneth Clein T. Fernandez, third-year BSIT at San Sebastian
College – Recoletos Manila, looking for full-stack internship hours.

Static Astro site. No client-side framework, no analytics, no CMS. One inline
script (a `js` class, so reveal animations never hide content from a browser
without JS) and one small module: the copy-email button and a scroll observer
that adds a class.

## Commands

| Command               | Does                                                         |
| --------------------- | ------------------------------------------------------------ |
| `npm install`         | Install dependencies                                         |
| `npm run dev`         | Dev server on `localhost:4321`                               |
| `npm run check`       | Type-check the Astro files and the inline script             |
| `npm run build`       | Build to `./dist/`, then run the built-output and link checks |
| `npm run preview`     | Serve the production build locally                           |
| `npm run check:links` | Re-run the link check against `./dist/`                      |
| `npm run og`          | Compose `public/og.png` from the page copy                   |

The link check only checks internal anchors and local assets by default. External
links are opt-in: `npm run check:links -- --external`. LinkedIn answers 999 to
non-browser clients; the checker treats that as live.

## Checks

| Check        | Command                                                        |
| ------------ | -------------------------------------------------------------- |
| Types        | `npm run check`                                                |
| Built output | `npm run build` (`scripts/check-built.mjs`)                    |
| Links        | `npm run build`, or `npm run check:links` after a build        |
| Design drift | `dembrandt <url> --compare .dembrandt/baseline.json`           |
| Re-baseline  | `dembrandt <url> --approve --compare .dembrandt/baseline.json` |
| Social card  | `npm run preview`, then `npm run og`                           |

`scripts/check-built.mjs` runs at the end of every build and fails on things the
source cannot show: a minifier fold that silently kills the scroll-driven CSS, a
print block that stops resolving the scroll reveals, an image that still
lazy-loads (which drops it from print), a caption the print block forgot to
reveal, a missing sitemap, or a robots.txt that does not advertise it. The link
check then catches dead anchors and local assets.

`.dembrandt/baseline.json` is the frozen token set — colours, type sizes, radii,
motion — re-approved from the preview build on 2026-10-20. Run the compare against
a preview deploy before shipping; the command exits non-zero when a token changes,
so an intentional change needs `--approve` and an intentional commit.

The review pass changed the motion scale, not the palette: the reveal is 420 ms /
10 px (was 800 ms / 20 px), the screenshot wipe is 560 ms with no delay (was 900 ms
with a 110 ms delay), and the captions now fade with the image. The compare sees
`0.42s` added and `0.8s`/`0.9s` removed; no colour value changed. It also confirms
the scroll-driven animations are running — `drift-away` and `drift-away-soft`
reappear in the extracted animation list.

Measured 2026-10-20 on a throttled mobile profile (390×844, 4× CPU, 1.6 Mbps /
150 ms RTT, cold cache, median of 3): **LCP 1.6 s**, **CLS 0.000**, 364 KB over 10
requests, 292 DOM nodes. The previous build measured 804 ms LCP; moving all five
proof images to eager loading for print is the main cost. It is still inside the
2 s budget. WCAG contrast: every pair AA or AAA, including hover and focus states;
lowest pair 5.06:1. Tap targets are 32–44 px tall (36 px header, nav and project
links, 32 px inline links, 44 px copy button on coarse pointers).

## Structure

```text
src/
  layouts/Base.astro      document head, fonts, metadata, JSON-LD
  pages/index.astro       the page and its copy
  styles/global.css       tokens, base type, layout, motion
public/                   favicon, robots, og.png
scripts/check-built.mjs   build gate — catches what the source can't show
scripts/check-links.mjs   dead anchors and missing local assets in dist/
scripts/make-og.mjs       composes public/og.png from the page copy
astro.config.mjs          site URL, sitemap, static output, fonts
.dembrandt/baseline.json  frozen token set, re-approved 2026-10-20
PRODUCT.md                audience, voice, verified claims, non-claims
reference-brief.md        where the design is borrowed from, and what isn't
```

## Design

Light only. White paper (`#ffffff`), warm near-black ink, and one accent:
`#AE0F19`, sampled from the CampusCurrents landing page rather than picked by
eye. The sheet is pure white the way the references are: minima. and ERDENSEN
both run `#ffffff` and put every bit of colour in the type. Warmth lives in the
ink and the hairlines, not in the paper. Green appears once, as the availability
dot — it's a status colour, not a brand one.

Type is Inter Tight for reading, Instrument Serif italic for the hero and one
line of the About section, JetBrains Mono for every label, year and stack line.
The mono face is preloaded because the header and eyebrow use it above the fold,
and every proof label uses it below.

Motion is the "instrument" thesis, picked by the owner from three: hero lines
rise out of a mask and settle, project text reveals while its screenshot wipes
across a frame that is already on the page, each caption fades with its image,
the four projects' stacks run as one slow strip that pauses on hover, and a
pointer-parallax field of at most 12px applies on a fine pointer.
`transform`/`opacity`/`clip-path` only, and nothing animated is fetched. The
scroll-linked drift and the header progress rule sit behind
`@supports (animation-timeline: scroll())`, so browsers without it get a still
page rather than a broken one.

Print is a first-class output: every proof image loads eagerly so Ctrl+P includes
all five, every reveal and caption resolves, and the copy button is hidden.

`reference-brief.md` records which reference each structural decision came from.

## Content rules

`PRODUCT.md` is the source of truth for what may be claimed. Every number on
the site is listed there with where it was verified. If a number isn't in that
table, it doesn't go on the page — ask rather than estimate.

The résumé is not published. Both résumé links are `mailto:` requests with the
subject "Résumé request"; the PDF returns once the three overclaims and the phone
number are removed. Do not add `/resume.pdf` until then.

Notably, the CampusCurrents README says 43 migrations; the repo actually has 50.
Scraped READMEs are not a source.

## Deploy

Vercel, static build. `npx vercel --prod`. Canonical URL lives in
`astro.config.mjs` (`SITE`), and the sitemap URL in `public/robots.txt`, until the
custom domain is pointed. The sitemap is generated at `/sitemap-index.xml`;
`link rel="sitemap"` points to it.
