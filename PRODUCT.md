# PRODUCT.md

Anchor document for this site. Every later design, copy and audit decision is
judged against this file. If a change contradicts it, change this file first and
say why.

Last updated: 2026-10-20 (visual direction chosen and built from live references;
single-page showcase; content corrections after the first deploy)

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
| CampusCurrents links | live landing page at `campus-currents-website.vercel.app`; signed APK in GitHub Releases (`v1.0.0-beta.2`, 105 MB) | GitHub API, HTTP 200 |
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
- No invented numbers, users, downloads, or uptime. Any number not in the
  Evidence table gets asked about, not estimated.
- Never scrape a README for facts. `campus-currents` README is out of date and
  the Kids Hub README is still the default Vite template.

## Constraints

- Solo build. **Astro, static output, no client-side framework.** The only
  JavaScript is one inline script (a `js` class so reveal animations never hide
  content from a browser without JS) and one small module: the copy-email button
  plus an IntersectionObserver that adds a class on scroll. No framework, no
  hydration, no third-party script. The site has to be explainable by its owner
  line by line — including that observer.
- Load speed beats scroll theatrics. Motion budget, decided 2026-10-20 and now
  fixed: hero lines rise on load, sections reveal once on scroll, project visuals
  lag slightly behind their text, and hover/focus states. Everything is
  `transform`/`opacity` only. The scroll-linked drift uses `animation-timeline`
  behind `@supports`, so browsers without it get a completely still page rather
  than a bug. No WebGL, no scroll-jacking, no animation library.
- Phone-first: recruiters read this on a phone, so 390px is the primary canvas
  and the desktop layout is the adaptation.
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
| Contact | Email + copy button, no form, no phone | No backend, no spam surface; phone stays on the resume PDF |
| Phone number | **Never on a public page.** Email only | Owner's instruction 2026-10-20: the number is shared when he applies, not when someone views. Audited the built output for phone-shaped strings — clean |
| Resume PDF | Not published. Carried the number and three overclaims | The old site `kxnn02-portfolio.vercel.app` was serving `kenneth-fernandez-resume.pdf` publicly (HTTP 200, number in the header line) and the file sat in a public repo. Removed 2026-10-20: the file is deleted from `kxnn02/kxnn02-portfolio`, the URL now 404s, and the raw GitHub path 404s |
| Repo | Public, `kxnn02/portfolio` | The repo is itself evidence |
| Availability | "Open to OJT / internship hours" | Honest for a third-year with classes |
| Deploy | Vercel now, custom domain when claimed | Clears the "always shipping" gate today |
| Leadership | Its own section under the work list | Owner asked for it; founder and both JPCS roles are verified |
| Screenshots | Captured from live sites only, never mocked | Mocked UI would break the honesty rule |
| Colour mode | Light only | Owner's call 2026-10-20 — one surface, one set of contrast checks |
| Accent | `#AE0F19`, used about six times on the page | Owner chose "one strong accent, derived from my screenshots". Sampled from the CampusCurrents button and headline, not invented |
| Project layout | One row per project, one large visual in the second column | Owner chose the mix: structure from NexStudio (screenshot rows), type from Signal-A, rhythm from AAT |
| Motion | Expressive but transform/opacity only | Owner asked for expressive on 2026-10-20. Scroll-linked drift is behind `@supports (animation-timeline)` |
| Portrait | One photo in a short about section | Owner's call. Currently the photo from the old portfolio — worth replacing |
| Visual direction | Owned by the owner, decided from references | The builder had picked a direction unasked; corrected 2026-10-20. Three live references captured full-page, compared at `C:\Users\Admin\portfolio-shots\references.html`, direction chosen and recorded in `reference-brief.md` |
| Project visuals | One screenshot per row, shape chosen by the asset | A wide screenshot fills the column; a portrait one (the Telegram card) sits framed on a panel rather than being cropped into a shape it isn't. Earlier typographic fact panels were retired when real screenshots arrived. Where a screen can't be shown — the DEVCON+ admin dashboard is company-owned — the caption says so instead of substituting a different screen silently |

## Open questions

1. **Portrait.** The About section currently uses the photo from the old
   portfolio (white shirt, black tie, headphones, mottled blue backdrop). It has
   personality and it works at 22rem wide, but a cleaner, current headshot would
   be better. Ask before publishing anything else.
2. **Resume PDF.** Received and extracted, but it overclaims (see Non-claims) and
   carries a public phone number. Fix the text, then decide: publish at
   `/resume.pdf`, or keep it as staples. Not linked yet.
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
