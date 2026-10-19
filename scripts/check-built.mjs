// Runs after `astro build` and fails the build on regressions that are invisible
// in the source but fatal in the output.
//
// The one that bit us: Lightning CSS folds an `animation-timeline` longhand into
// the `animation` shorthand, emitting `animation: linear both drift-away scroll()`.
// Current Chromium cannot parse `scroll()` inside that shorthand, drops the whole
// declaration, and the effect silently never runs — the CSS looks right, the page
// looks fine, and nothing moves. Keep the keyframes and the timeline in separate
// rules in `src/styles/global.css` so the fold cannot happen.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const cssFile = readdirSync(`${dist}_astro`).find((f) => f.endsWith('.css'));
const css = readFileSync(`${dist}_astro/${cssFile}`, 'utf8');

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

if (problems.length) {
	console.error('\nbuilt-output check failed:\n');
	for (const p of problems) console.error(`  - ${p}`);
	console.error('');
	process.exit(1);
}

console.log(`built-output check passed (${cssFile})`);
