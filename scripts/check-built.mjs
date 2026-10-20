// Runs after `astro build` and fails the build on regressions that are invisible
// in the source but fatal in the output.
//
// The one that bit us: Lightning CSS folds an `animation-timeline` longhand into
// the `animation` shorthand, emitting `animation: linear both drift-away scroll()`.
// Current Chromium cannot parse `scroll()` inside that shorthand, drops the whole
// declaration, and the effect silently never runs — the CSS looks right, the page
// looks fine, and nothing moves. Keep the keyframes and the timeline in separate
// rules in `src/styles/global.css` so the fold cannot happen.
//
// The second: two of the five proof images were `loading="lazy"`, so a fresh
// print dropped the DEVCON+ and portrait images. Print can't wait for a lazy
// loader; all proof images load eagerly now.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const cssFile = readdirSync(`${dist}_astro`).find((f) => f.endsWith('.css'));
const css = readFileSync(`${dist}_astro/${cssFile}`, 'utf8');
const html = readFileSync(`${dist}index.html`, 'utf8');

const problems = [];

// 1. The minifier must never fold a scroll/view timeline into the shorthand.
const folded = css.match(/animation:[^;}]*\b(?:scroll|view)\(/g);
if (folded) {
	problems.push(
		`animation-timeline was folded into the \`animation\` shorthand — Chromium drops this and the effect never runs:\n    ${folded.join('\n    ')}`
	);
}

// 2. The longhand must survive the build, or every scroll-driven effect is dead.
for (const fn of ['scroll(', 'view(']) {
	if (!css.includes(`animation-timeline:${fn}`)) {
		problems.push(`animation-timeline:${fn}…) is missing from the built CSS`);
	}
}

// 3. Print must resolve every reveal, or the PDF is blank below the hero.
const print = css.slice(css.indexOf('@media print'));
if (!/\[data-reveal\]\{[^}]*opacity:1/.test(print)) {
	problems.push('@media print no longer forces [data-reveal] to opacity 1 — printed output will be blank');
}

// 4. Every image must load eagerly; a lazy image never reaches the print path.
const lazy = html.match(/<img[^>]+loading="lazy"/g);
if (lazy) {
	problems.push(
		`${lazy.length} image(s) still use loading="lazy" — printed output drops below-the-fold images. Use loading="eager".`
	);
}

// 5. The caption sits outside the clipped frame, so print has to resolve it too.
if (!/project__caption\{[^}]*opacity:1/.test(print)) {
	problems.push('@media print no longer forces .project__caption to opacity 1 — printed captions disappear');
}

// 6. The sitemap integration must emit its index.
if (!existsSync(`${dist}sitemap-index.xml`)) {
	problems.push('sitemap-index.xml is missing — the @astrojs/sitemap integration did not run');
}

// 7. robots.txt should point crawlers at that index.
if (
	!existsSync(`${dist}robots.txt`) ||
	!/Sitemap:\s*https?:\/\/\S+\/sitemap-index\.xml/i.test(readFileSync(`${dist}robots.txt`, 'utf8'))
) {
	problems.push('robots.txt does not advertise the sitemap — add Sitemap: https://<site>/sitemap-index.xml');
}

if (problems.length) {
	console.error('\nbuilt-output check failed:\n');
	for (const p of problems) console.error(`  - ${p}`);
	console.error('');
	process.exit(1);
}

console.log(`built-output check passed (${cssFile})`);
