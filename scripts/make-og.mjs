// Regenerates public/og.png as a composed 1200×630 card. Run it whenever the
// hero copy, the name, the status or the type scale changes:
//
//   npm run build && npm run preview     # serves dist/ on :4321
//   npm run og                           # or pass a URL, e.g. the live site
//
// The name, hero lines and status are read from the real page, so the card
// can't drift from the copy. The layout is written here rather than captured
// from the hero, which used to clip the paragraph mid-sentence.

import { readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const out = fileURLToPath(new URL('../public/og.png', import.meta.url));
const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
const site = config.match(/const SITE = '([^']+)'/)?.[1] ?? new URL(url).origin;
const host = new URL(site).host;

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1,
	// Reduced motion resolves every reveal, so nothing is captured mid-entrance.
	reducedMotion: 'reduce',
});

await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const content = await page.evaluate(() => {
	const name = document.querySelector('.brand .sr-only')?.textContent?.replace(', back to top', '').trim();
	const location = document.querySelector('.contact__foot p')?.textContent?.split(' · ')[0].trim();
	const lines = [...document.querySelectorAll('.hero__title .line')].map((line) => line.innerHTML.trim());
	const status = document.querySelector('.status')?.textContent?.trim();

	return { name, location, lines, status };
});

const name = content.name ?? 'Kenneth Clein T. Fernandez';
const location = content.location ?? 'Manila, Philippines';
const lines = content.lines.length
	? content.lines
	: ['I find the problem.', 'I ship the <em>fix.</em>'];
const status = content.status ?? 'Open to OJT / internship hours';

const card = `
	<div class="og">
		<header class="og__top">
			<span>${name}</span>
			<span>${location}</span>
		</header>
		<h1 class="og__title">${lines.join('<br>')}</h1>
		<footer class="og__bottom">
			<span class="og__status">${status}</span>
			<span>${host}</span>
		</footer>
	</div>
	<style>
		html,
		body {
			margin: 0;
			background: var(--paper);
		}

		.og {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 1200px;
			height: 630px;
			padding: 52px 64px 48px;
			background: var(--paper);
			color: var(--ink);
			font-family: var(--sans);
		}

		.og__top,
		.og__bottom {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 24px;
			font-family: var(--mono);
			font-size: 16px;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: var(--ink-3);
		}

		.og__top {
			padding-bottom: 20px;
			border-bottom: 1px solid var(--line-2);
		}

		.og__bottom {
			padding-top: 20px;
			border-top: 1px solid var(--line-2);
		}

		.og__title {
			max-width: 1072px;
			margin: 0;
			font-size: 104px;
			font-weight: 600;
			line-height: 0.92;
			letter-spacing: -0.05em;
		}

		.og__title em {
			font-family: var(--serif);
			font-style: italic;
			font-weight: 400;
			letter-spacing: -0.01em;
			color: var(--accent);
		}

		.og__status {
			display: inline-flex;
			align-items: center;
			gap: 10px;
			color: var(--ink);
		}

		.og__status::before {
			content: '';
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: var(--live);
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--live) 18%, transparent);
		}
	</style>
`;

await page.evaluate((html) => {
	document.body.innerHTML = html;
}, card);

await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
await page.screenshot({ path: out });

await browser.close();

const { size } = await stat(out);
console.log(`og.png written from ${url} — ${(size / 1024).toFixed(1)} KB`);
