# PRODUCT.md

Anchor document for this site. Every later design, copy and audit decision is
judged against this file. If a change contradicts it, change this file first and
say why.

Last updated: 2026-10-20 (review pass: role/proof lines, one-row mobile header,
eager print images, composed OG card, sitemap, type/link/build gates)

---

## What this is

A static personal site for **Kenneth Clein T. Fernandez**, third-year BSIT
student at San Sebastian College – Recoletos Manila (graduating 2028).

Structure: **one page — a project showcase.** Four projects, each with the
problem, what was built, the stack and links to the live thing. No case-study
sub-pages and no long decision write-ups: the owner's call, made 2026-10-20
after the SPA-plus-case-studies plan was drafted. Depth lives in the linked
repos and the running software, not in prose.

## Who reads it

1. **Recruiter or hiring manager** at a Philippine software company. On a phone.
   Forty-five seconds. They want to know: what has this person built, where can
   I click it, how do I contact them.
2. **Technical interviewer** who opens a linked repo and asks "why did you do it
   that way". Nothing on the page needs to answer that — the repos and the
   running software do. The page's job is to make them want to open one.
3. **Org leads and peers** at DEVCON, AWS Learning Club, JPCS. Lowest priority.

## The one impression

**Ships real software.**

Not "AI and automation specialist". In 2026 every applicant claims AI. Very few
third-years have an app a five-person team shipped, a bot in daily production
use, and a habit of verifying their own work (CI on every merge, 39-case
evaluation harness, per-student delivery receipts). The AI work stays on the
site as proof of depth, not as the headline.

## Success criteria

- A recruiter can name three shipped projects and find the email address in
  under 30 seconds, on a phone, without scrolling past a wall of text.
- Every sentence survives the owner being asked "explain how you did this"
  unaided. If it doesn't, it doesn't ship.
- Mobile LCP < 2s on 4G, CLS < 0.1, no horizontal scroll at 390px.
- No number appears on the site that is not in the table below.

## Voice

Plain and specific. Short sentences. Concrete nouns and real counts.

**Banned:** passionate about technology, leveraging, cutting-edge, innovative,
seamless, robust, scalable (unless the sentence says what scales and how),
utilize, journey, "I believe", exclamation marks, em-dash pileups.

Write "fixed duplicate chapter entries in chapter listings", not "enhanced data
integrity across the platform".

## Evidence — verified claims

Only these numbers may appear on the site.

**Some of these decay.** Commit counts, test-file counts and migration counts grow
whenever the repo changes. Re-run the count before publishing or after any repo
activity — the two sources of truth are `gh api` (for repo facts) and the owner (for
everything else). Numbers below are stamped with the date they were counted.

| Claim | Value | Verified by |
| --- | --- | --- |
| CampusCurrents team size | 5 people | owner |
| CampusCurrents migrations | **50** | repo — README says 43 and is wrong |
| CampusCurrents shipped | Android beta, then a security/UX fix release | owner |
| CampusCurrents links | live landing page at `campus-currents-website.vercel.app`; signed APK in GitHub Releases (`v1.0.0-beta.2`, 102.4 MB) | GitHub API, HTTP 200 (size re-checked 2026-10-20) |
| CampusCurrents backend | Supabase/PostgreSQL, row-level security, edge functions, two-phase push with per-student delivery receipts | owner |
| Task Bot users | DEVCON Philippines Cohort 5, 8 people, daily production use | owner |
| Task Bot authorship | **328 of 328 commits** on `main` (re-verified 2026-10-20; the brief said 136 — the repo has since grown) | GitHub API |
| Task Bot CI | gates every merge on typecheck, full test suite, migration check | repo |
| Task Bot scale | 17 ADRs, 19 SQL migrations, 93 test files (all three re-counted 2026-10-20) | GitHub API |
| Kids Hub team | 5 people | owner |
| Kids Hub stack | **React + Vite** + Supabase (confirmed by build output, not the README — the README is still the Vite template) | live site |
| Kids Hub ownership | retrieval pipeline + AI feature set (see non-claims) | owner |
| Kids Hub eval harness | 39 test cases: grounding, citations, no-answer, injection, authorization | owner, written alone |
| DEVCON+ | 13 chapters | owner |
| DEVCON+ dates | Aug 2026 – Sep 2026 (ended) | owner + resume |
| DEVCON+ scope | event registration, points and rewards, chapter operations | resume |
| DEVCON+ work | admin dashboard UI/data bug fixes, duplicate chapter entries, proposed chapter leaderboard | owner |
| Academic | BSIT, San Sebastian College – Recoletos Manila, expected 2028 | owner |
| Academic award | Silver Medalist for Academic Excellence, 1st year (both semesters) — San Sebastian College – Recoletos Manila, confirmed by owner 2026-10-20 | owner |
| Organisations | Founder and Lead, AWS Learning Club SSCR Manila (2026–2027); 3rd Year Representative, JPCS SSCR Manila (2026–2027); 2nd Year Representative, JPCS SSCR Manila (2025–2026) | owner + resume |

## Non-claims — do not write these

- **Not** a TypeScript, React or Expo expert. Worked in them across these repos,
  not yet fluent.
- **Defensible languages:** JavaScript, HTML/CSS, Python, Java.
- **Databases:** SQL, PostgreSQL, MySQL, Supabase. Firebase — **Auth only**,
  never "Firebase" as a whole platform.
- **Kids Hub:** the server-side edge functions (role scoping, prompt-injection
  guard, rate limiting) were written by a teammate. Never imply the whole
  assistant was solo work. Say: retrieval pipeline and the AI feature set.
- **DEVCON+:** internship work on a private repo, not a personal project.
- AI-assisted development (Claude Code, Kiro CLI) is a **workflow**, never a
  credential. Do not put it in the hero or a skills list.
- **The resume PDF currently attached at
  `C:\Users\Admin\Downloads\RESUME-FERNANDEZ-KENNETH-CLEIN.pdf` overclaims in three
  places** and must not be published next to this site until fixed:
  1. "Built the platform's AI assistant" — the server-side assistant work belongs
     to a teammate.
  2. "Scoped every response to the caller's role — with prompt-injection defences
     and per-user rate limiting" reads as his work. It was the teammate's.
  3. TypeScript is listed under Languages. Defensible set is JavaScript, HTML/CSS,
     Python, Java.
  A site that says one thing and attaches a PDF that says another loses the
  argument on both.
- **The résumé is by request, not published.** The two "Résumé on request" links
  open a `mailto:` with the subject "Résumé request". Do not add a `/resume.pdf`
  link until the three overclaims and phone number are removed.
- No invented numbers, users, downloads, or uptime. Any number not in the
  Evidence table gets asked about, not estimated.
- Never scrape a README for facts. `campus-currents` README is out of date and
  the Kids Hub README is still the default Vite template.

## Constraints

- Solo build. **Astro, static output, no client-side framework.** The only
  JavaScript is one inline script (a `js` class so reveal animations never hide
  content from a browser without JS) and one small module: the copy-email button
  with its live region, an IntersectionObserver that adds a class on scroll, and
  a pointer-parallax loop that only runs for a fine pointer and never under
  reduced motion. No framework, no hydration, no third-party script. The site has
  to be explainable by its owner line by line — including that observer.
- Load speed beats scroll theatrics. Motion budget, decided 2026-10-20 and
  revised in the review pass: hero lines rise out of a mask and settle, project
  text reveals while its screenshot wipes across a frame that is already on the
  page, each caption fades with its image, the four projects' stacks run as one
  slow strip that pauses on hover, a pointer-parallax field of at most 12 px on a
  fine pointer, and hover/focus states. The reveal is 420 ms / 10 px; the wipe is
  560 ms with no delay. Everything is `transform`/`opacity`/`clip-path` only, and
  none of it adds a byte of network payload. The scroll-linked drift and the
  header progress rule use `animation-timeline` behind `@supports`, so browsers
  without it get a completely still page rather than a bug. No WebGL, no
  scroll-jacking, no animation library.
- **Scroll-driven CSS is a build hazard, not a source hazard.** Lightning CSS
  folds an `animation-timeline` longhand into the `animation` shorthand, and
  current Chromium cannot parse `scroll()` inside that shorthand — it drops the
  declaration and the effect silently never runs. Keep the keyframes and the
  timeline in separate rules, and let `scripts/check-built.mjs` fail the build if
  the fold ever comes back.
- Phone-first: recruiters read this on a phone, so 390px is the primary canvas
  and the desktop layout is the adaptation. The header holds one row at 390;
  `Background` is desktop-only; at ≤22rem the `KCF` mark replaces the full name.
- Tokens in `src/styles/global.css` are the built direction. They are traceable:
  paper and ink are warm neutrals, and the accent is `#AE0F19`, sampled from the
  CampusCurrents landing page rather than invented. `reference-brief.md` records
  which reference each structural decision came from.
- Domain pending a Student Pack claim (Namecheap `.me`, Name.com free TLD, or
  `.TECH`). `SITE` in `astro.config.mjs` is the only place the URL is written.

## Decisions log

| Decision | Chosen | Because |
| --- | --- | --- |
| Positioning | Ships real software | Differentiated; AI is table stakes in 2026 |
| Framework | Astro, static | Content is static; zero JS by default; explainable unaided, which Next.js is not for the owner |
| Structure | One page, project showcase | Owner's call 2026-10-20, replacing the one-page-plus-four-case-studies plan. Reverses an earlier decision — the plan document still describes case studies |
| Contact | Email + copy button, no form, no phone | No backend, no spam surface; the phone stays on the unpublished résumé, never on the page |
| Phone number | **Never on a public page.** Email only | Owner's instruction 2026-10-20: the number is shared when he applies, not when someone views. Audited the built output for phone-shaped strings — clean |
| Resume PDF | Not published. Requests by email until the text is fixed | The old site `kxnn02-portfolio.vercel.app` was serving `kenneth-fernandez-resume.pdf` publicly (HTTP 200, number in the header line) and the file sat in a public repo. Removed 2026-10-20: the file is deleted from `kxnn02/kxnn02-portfolio`, the URL now 404s, and the raw GitHub path 404s. The site now links "Résumé on request" to a mailto with the subject "Résumé request"; the PDF returns once the three overclaims and phone number are removed |
| Repo | Public, `kxnn02/portfolio` | The repo is itself evidence |
| Availability | "Open to OJT / internship hours" | Honest for a third-year with classes |
| Deploy | Vercel now, custom domain when claimed | Clears the "always shipping" gate today |
| Leadership | Its own section under the work list | Owner asked for it; founder and both JPCS roles are verified |
| Screenshots | Captured from live sites only, never mocked | Mocked UI would break the honesty rule |
| Colour mode | Light only | Owner's call 2026-10-20 — one surface, one set of contrast checks |
| Accent | `#AE0F19`, used about six times on the page | Owner chose "one strong accent, derived from my screenshots". Sampled from the CampusCurrents button and headline, not invented |
| Project layout | One row per project, one large visual in the second column | Owner chose the mix: structure from NexStudio (screenshot rows), type from Signal-A, rhythm from AAT |
| Motion | Expressive but transform/opacity only | Owner asked for expressive on 2026-10-20. Scroll-linked drift is behind `@supports (animation-timeline)` |
| Motion thesis | **B — "instrument"**, chosen by the owner from three | Quiet/editorial (A) read as too still, cinematic/technical (C) read as a stunt. B keeps A's masked line reveal and takes exactly one thing from C: the screenshot wipe. Previewed at `C:\Users\Admin\portfolio-shots\motion-preview.html` as a throwaway — the implementation was written from the thesis, not ported from that file |
| Wipe target | The frame inside the observed figure, never the figure | Clipping the observed element collapses its own intersection rect, so it never reports as visible and the wipe never fires. Same reason the settled clip is oversized — `inset(-4rem)` — so it releases the card's drop shadow |
| Portrait | One photo in a short about section | Owner's call. Currently the photo from the old portfolio, warmed with a subtle sepia/saturation filter until a current headshot replaces it |
| Visual direction | Owned by the owner, decided from references | The builder had picked a direction unasked; corrected 2026-10-20. Three live references captured full-page, compared at `C:\Users\Admin\portfolio-shots\references.html`, direction chosen and recorded in `reference-brief.md` |
| Project visuals | One screenshot per row, shape chosen by the asset | A wide screenshot fills the column; a portrait one (the Telegram card) sits framed on a panel rather than being cropped into a shape it isn't. Earlier typographic fact panels were retired when real screenshots arrived. Where a screen can't be shown — the DEVCON+ admin dashboard is company-owned — the caption says so instead of substituting a different screen silently |
| Review fixes | Role + proof lines, one-row mobile header, eager print images, composed OG card, sitemap, type/link/build gates | The 2026-10-20 review found the five-second scan hid the proof, the mobile header wrapped, print dropped two of five images, and the OG card cut the lede mid-sentence. Each fix is in the source; the constraints above still hold |

## Open questions

1. **Portrait.** The About section currently uses the photo from the old
   portfolio (white shirt, black tie, headphones, mottled blue backdrop). It has
   personality and it works at 22rem wide, but a cleaner, current headshot would
   be better. Ask before publishing anything else.
2. **Resume PDF.** Received and extracted, but it overclaims (see Non-claims) and
   carries a public phone number. The site now offers "Résumé on request" mailto
   links instead. Fix the text, then decide: publish at `/resume.pdf`, or keep it
   as staples. Do not add a direct PDF link before then.
3. **Screenshots — all four rows now carry a real one (2026-10-20).**
   CampusCurrents landing page (captured), Task Bot command card in Telegram
   (owner, cropped to drop the group header), Kids Hub sign-in (owner), DEVCON+
   member home (owner, desktop).
   - **Still wanted, and the strongest single upgrade left:** Kids Hub chat with
     citations, and the no-answer case. The sign-in screen proves the product
     exists and is well built; it does not show the retrieval pipeline, and the
     caption is worded so it doesn't claim to.
   - CampusCurrents Android app screens from a real device (feed, status,
     calendar) and the admin dashboard would show the app itself rather than
     its landing page.
   - AWS Learning Club SSCR Manila, if a leadership image is wanted.
   - **Not shareable by the owner:** the DEVCON+ admin dashboard (company-owned
     and private). The member home is used instead, and its caption says so.
   - Note the Task Bot screenshot comes from a group whose chat title contains
     "TEST". That is the bot's own naming; the caption doesn't claim otherwise.
     A production screenshot replaces it one-for-one if one exists.
4. **`devcon.plus` renders an empty Events list in a desktop browser** — tabs and
   filters load, no events appear. Either nothing is live right now or the list
   fails to load. Worth checking, since it's the public face of internship work.
5. **Older projects.** `PasaBuy`, `StraySafe` and `flappy-kiro` exist on GitHub with
   live links but are not in the brief's four. Deliberately excluded — say the word
   if they should appear as a smaller "other work" list.
6. **The deleted resume is still in git history.** Removing the file from
   `kxnn02/kxnn02-portfolio` stops it being served, but the blob survives in that
   repo's history and in any old Vercel deployment URL. If the number must never
   be recoverable, the remaining options are: rewrite that repo's history, or
   delete the repo and the old Vercel project. Owner's call.
7. **The physical-phone check is still outstanding.** Responsively wasn't open, so
   device coverage was done with exact Playwright profiles instead: iPhone 12 Pro,
   iPad (gen 7) and 1440 desktop, all with touch where applicable — zero
   overflow, no clipped text, fonts loaded. That is not a substitute for holding
   the phone. Phase 6's gate says "plus your physical phone" and only the owner
   can close it.

## Measured (2026-10-20)

Recorded because these numbers decay and the next person should know what the
build was actually like on the day, not what it was assumed to be.

| Measure | Value | Method |
| --- | --- | --- |
| Mobile LCP | **1.6 s** | Chromium, 390×844 DPR 3, 4× CPU, 1.6 Mbps / 750 kbps / 150 ms RTT, cold cache, median of 3; LCP read before scrolling |
| CLS | 0.000 | same run, whole-page scroll |
| Transfer | 364 KB over 10 requests (document + 9) | same build, enumerating the resource timeline |
| DOM nodes | 292 | the role/proof lines and the fourth nav link add 28 |
| WCAG contrast | every pair AA or AAA, 0 failures; lowest pair 5.06:1 | `dembrandt <url> --wcag` against the preview build, including hover and focus states; 10 pairs |
| Tap targets | 32–44 px tall | header, nav and project links 36 px; inline links 32 px; copy button 44 px on coarse pointers |
| Horizontal overflow | 0 px at 320 / 390 / 768 / 810 / 1024 / 1440, and with root text doubled at all six | Playwright; the root is forced to `32px` for the 200 % text pass |
| Sticky hover | none | real touch tap; background stayed at rest |

LCP is 1.6 s, up from 804 ms before the review pass. The print fix is the main
cost: all five proof images now load eagerly so Ctrl+P includes every one. The
budget is <2 s, so the trade is deliberate and still inside it. The hero remains
a transform-only masked rise, so the headline counts as painted as soon as it
enters the mask; it is not opacity-gated. If the LCP needs to come back down, the
options are a smaller hero font payload or a different print strategy — not
dropping the proof images.

The pre-review build measured 358 KB / 264 DOM nodes; the resource timeline is
the honest count for both. The 6 KB difference is the eager proof images; the 28
nodes are the role/proof lines and the fourth nav item.

**Three scroll-driven effects — the hero title drift, the hero side drift and the
project `lag` — were measured as dead in the previous build.** They had been
compiled out by Lightning CSS into a shorthand Chromium cannot parse. The header
progress rule is new and runs. `scripts/check-built.mjs` now fails the build if
the fold returns.
