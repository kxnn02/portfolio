# PRODUCT.md

Anchor document for this site. Every later design, copy and audit decision is
judged against this file. If a change contradicts it, change this file first and
say why.

Last updated: 2026-10-20 (scaffold step)

---

## What this is

A static personal site for **Kenneth Clein T. Fernandez**, third-year BSIT
student at San Sebastian College – Recoletos Manila (graduating 2028).

Structure: **one homepage + four project case studies.** The homepage has to
work on its own — the case studies are depth for anyone who is already
interested.

## Who reads it

1. **Recruiter or hiring manager** at a Philippine software company. On a phone.
   Forty-five seconds. They want to know: what has this person built, where can
   I click it, how do I contact them.
2. **Technical interviewer** who opens a case study and asks "why did you do it
   that way". This is the reader the decisions sections are for.
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

| Claim | Value | Verified by |
| --- | --- | --- |
| CampusCurrents team size | 5 people | owner |
| CampusCurrents migrations | **50** | repo — README says 43 and is wrong |
| CampusCurrents shipped | Android beta, then a security/UX fix release | owner |
| CampusCurrents backend | Supabase/PostgreSQL, row-level security, edge functions, two-phase push with per-student delivery receipts | owner |
| Task Bot users | DEVCON Philippines Cohort 5, 8 people, daily production use | owner |
| Task Bot authorship | 136 of 136 commits | repo |
| Task Bot CI | gates every merge on typecheck, full test suite, migration check | repo |
| Task Bot scale | 16 ADRs, 19 migrations, 93 test files | repo |
| Kids Hub team | 5 people | owner |
| Kids Hub ownership | retrieval pipeline + AI feature set (see non-claims) | owner |
| Kids Hub eval harness | 39 test cases: grounding, citations, no-answer, injection, authorization | owner, written alone |
| DEVCON+ | 13 chapters | owner |
| DEVCON+ work | admin dashboard UI/data bug fixes, duplicate chapter entries, proposed chapter leaderboard | owner |
| Academic | BSIT, San Sebastian College – Recoletos Manila, expected 2028; Silver Medalist for Academic Excellence, 1st year both semesters | owner |
| Organisations | Founder and lead, AWS Learning Club SSCR Manila (2026–2027); 3rd Year Representative, JPCS SSCR Manila | owner |

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
- No invented numbers, users, downloads, or uptime. Any number not in the
  Evidence table gets asked about, not estimated.
- Never scrape a README for facts. `campus-currents` README is out of date and
  the Kids Hub README is still the default Vite template.

## Constraints

- Solo build. **Astro, static output, no client-side framework** — the only JS
  is the copy-email button. The site has to be explainable by its owner line by
  line.
- Load speed beats scroll theatrics. Motion budget: 2–4 purposeful moments,
  decided in the motion phase, not during the build.
- Phone-first: recruiters read this on a phone, so 390px is the primary canvas
  and the desktop layout is the adaptation.
- Tokens in `src/styles/global.css` are provisional scaffold values. The design
  system phase replaces the values, not the file structure.
- Domain pending a Student Pack claim (Namecheap `.me`, Name.com free TLD, or
  `.TECH`). `SITE` in `astro.config.mjs` is the only place the URL is written.

## Decisions log

| Decision | Chosen | Because |
| --- | --- | --- |
| Positioning | Ships real software | Differentiated; AI is table stakes in 2026 |
| Framework | Astro, static | Content is static; zero JS by default; explainable unaided, which Next.js is not for the owner |
| Structure | One page + 4 case studies | Homepage passes the 30-second test alone; depth available on click |
| Contact | Email + copy button, no form, no phone | No backend, no spam surface; phone stays on the resume PDF |
| Repo | Public, `kxnn02/portfolio` | The repo is itself evidence |
| Availability | "Open to OJT / internship hours" | Honest for a third-year with classes |
| Deploy | Vercel now, custom domain when claimed | Clears the "always shipping" gate today |

## Open questions

1. **DEVCON+ dates.** The brief says "currently an AI Engineering Intern" with a
   range of Aug–Sep 2026. The site currently says "Volunteer internship in 2026"
   to avoid claiming either way. Confirm which is true.
2. **Resume PDF.** Owner has one to send. Needs to be added to `public/` and
   linked from the hero.
3. **CampusCurrents public URL.** Only the repo is linked today. Is there an
   internal-testing or Play Store link for the Android beta?
4. **Screenshots.** devcon.plus and the CampusCurrents admin dashboard are behind
   login and need a signed-in capture session. Kids Hub and the Task Bot
   dashboard are public.
5. **Leadership placement.** Founder of AWS Learning Club SSCR Manila and JPCS
   representative are verified but not on the page yet. Do they get a short
   "Beyond code" block, or do they stay in Evidence only?
6. **Case-study depth.** Four case studies need 2–3 real decisions each. Some
   decisions can be pulled from the repos; others have to come from memory.
