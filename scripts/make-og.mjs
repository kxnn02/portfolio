// Regenerates public/og.png from the real built page. Run it whenever the hero
// copy, the type scale or the accent changes:
//
//   npm run build && npm run preview     # serves dist/ on :4321
//   node scripts/make-og.mjs             # or pass a URL, e.g. the live site
//
// It renders the actual hero, so the card can never drift from the page.

import { createRequire } from 'node:module';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/Admin/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const url = process.argv[2] ?? 'http://localhost:4321/';
const out = fileURLToPath(new URL('../public/og.png', import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1,
	// Reduced motion resolves every reveal, so nothing is captured mid-entrance.
	reducedMotion: 'reduce',
});

await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
await page.screenshot({ path: out });

await browser.close();

const { size } = await stat(out);
console.log(`og.png written from ${url} — ${(size / 1024).toFixed(1)} KB`);
