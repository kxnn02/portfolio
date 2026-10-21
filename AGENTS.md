# AGENTS.md

Guidance for agents working in this repo. `README.md` describes the finished
site and how it was measured. `PRODUCT.md` is the contract for what may be
claimed on it.

## Project

Personal portfolio for Kenneth Clein T. Fernandez: one static page built with
Astro 7 (`output: 'static'`). No client-side framework, no hydration, no
analytics, no CMS, no backend. The only JavaScript is the inline script in
`src/pages/index.astro` (scroll reveal, pointer parallax, copy-email button,
Manila clock, halftone bloom, screenshot loupe, tool strip) plus the small
inline `js` flag and strip-pause restore in `Base.astro`; everything else is
HTML and CSS. Node >= 22.22.0.

## Commands

| Command               | Does                                                         |
| --------------------- | ------------------------------------------------------------ |
| `npm run dev`         | Dev server on `localhost:4321`                               |
| `npm run check`       | Type-check the Astro files and the inline script             |
| `npm run build`       | Build to `./dist/`, then run the built-output and link checks |
| `npm run preview`     | Serve the production build locally                           |
| `npm run check:links` | Re-run the link check against `./dist/`                      |
| `npm run og`          | Recompose `public/og.png` from the page copy                 |

Run the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev status`, `astro dev logs --follow`, and
`astro dev stop`.

`npm run build` is the real gate: `scripts/check-built.mjs` catches regressions
that are invisible in source (folded scroll animations, lazy print images,
missing sitemap), then `scripts/check-links.mjs` checks anchors and assets.
Never weaken a check to make a build pass.

## Where things live

```text
src/pages/index.astro     the page, its copy (`work` array), and the inline script
src/layouts/Base.astro    head, fonts, metadata, JSON-LD, no-JS watchdog
src/styles/global.css     tokens, base type, layout, motion, print styles
scripts/check-built.mjs   build gate for output-only regressions
scripts/check-links.mjs   dead anchors and missing local assets in dist/
scripts/make-og.mjs       composes public/og.png from the page copy
public/                   favicon, robots.txt, og.png
.dembrandt/baseline.json  frozen design-token baseline
PRODUCT.md                audience, voice, verified claims, non-claims
reference-brief.md        which reference each design decision came from
```

## Content rules

These are owner decisions, not suggestions.

- **Numbers come from `PRODUCT.md` only.** Every claim on the page must appear
  in its verified-claims table. If a number is not there, ask; never estimate
  or copy one from a project README (the CampusCurrents README says 43
  migrations; the repo has 50).
- **No phone number on any public page.** Email only.
- **Do not publish the résumé PDF or link `/resume.pdf`.** Both résumé links are
  `mailto:` requests with the subject "Résumé request".
- **No em dashes** in page copy or metadata (owner's preference).
- Do not infer a team role, an opinion, or a fact about the owner that is not
  in `PRODUCT.md`. Ask instead.
- Project rows tell the same story: problem, solution, then "My part". "I"
  diagnoses, "we" ships; solo work stays "I".
- Redline notes and case notes annotate the screenshots and the claims in
  `PRODUCT.md`. They are not a place to introduce a new number or infer a new
  fact.
- Screenshots come from live sites, never mocked. If a screen cannot be shown
  (company-owned), say so in the caption; never swap in a different screen
  silently.
- The page must stay explainable by its owner line by line. Do not add a
  framework, a third-party script, or an animation library for a small win.

## Technical constraints

- **Reveal must degrade without JS.** `Base.astro` adds a `js` class inline and
  removes it after 3 s if `window.__revealReady` is never set. Keep new reveal
  targets on `data-reveal` / `data-wipe` so the observer and that watchdog
  still apply.
- **Motion budget:** `transform`, `opacity`, and `clip-path` only; nothing
  animated is fetched. Reveal is 420 ms / 10 px, the screenshot wipe 560 ms
  with no delay, captions fade with their image. Scroll-linked drift and the
  header progress rule sit behind `@supports (animation-timeline: scroll())`.
- **Reduced motion is intentionally ignored.** Animations must run even when the
  OS reports `prefers-reduced-motion: reduce` (owner's instruction). Do not add
  automatic reduce guards or a motion toggle without being asked.
- **Scroll-timeline CSS is a build hazard.** Lightning CSS folds an
  `animation-timeline` longhand into the `animation` shorthand, which Chromium
  then drops silently. Keep keyframes and timeline in separate rules. If
  `check-built` complains, fix the CSS, not the check.
- **Print is a first-class output.** All proof images load eagerly so Ctrl+P
  includes them; reveals and captions must resolve in `@media print`. Do not
  add `loading="lazy"` to page images.
- **Phone-first.** 390 px is the primary canvas; desktop is the adaptation. The
  header holds one row at 390, `Background` is desktop-only, and the `KCF` mark
  replaces the full name at 22rem and below.
- **Tokens live in `global.css`.** Light mode only. Paper `#ffffff`, warm ink,
  one accent `#AE0F19` used sparingly; green is the availability dot only, not a
  brand colour. Do not invent colours outside the token block.
- **Fonts** are declared in `astro.config.mjs` via `fontProviders.google()` and
  exposed as `--font-sans` (Inter Tight), `--font-serif` (Instrument Serif
  italic), and `--font-mono` (JetBrains Mono). Use those variables; do not add
  `<link>` tags or new families.
- **The canonical URL is written in two places:** `SITE` in `astro.config.mjs`
  and the `Sitemap:` line in `public/robots.txt`. Change both together.
- **Accessibility:** keep WCAG AA contrast (including hover and focus), tap
  targets at least 32 px tall, and the polite live region for copy status.

## Verify before finishing

1. `npm run check` passes.
2. `npm run build` passes, including both checks.
3. Look at 390 px and desktop, with and without JavaScript, and in print
   preview. Print must show all five proof images, the redline notes, case
   notes and stamp, and no hidden reveals; the strip, bloom, loupe and copy
   button stay out.
4. If page copy or metadata changed, restart `npm run preview` and run
   `npm run og`, then commit the regenerated `public/og.png`.
5. Design drift: `dembrandt <url> --compare .dembrandt/baseline.json` exits
   non-zero when a token changes. For an intentional change, re-baseline with
   `--approve` and commit `baseline.json` in the same change.
6. CI (`.github/workflows/ci.yml`) runs `npm run check` and `npm run build` on
   every PR; both must be green.

## Deploy

Vercel, static build: `npx vercel --prod`. The custom domain is still pending
(Student Pack), so the site URL stays a single placeholder in `astro.config.mjs`
until it is pointed.

Astro docs: https://docs.astro.build
