// Checks the built HTML for dead internal links and broken local assets.
// External links are opt-in (`--external`) because they are inherently flaky
// and a CI gate that depends on GitHub or LinkedIn being up is a bad gate.
//
//   node scripts/check-links.mjs
//   node scripts/check-links.mjs --external

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const htmlFiles = readdirSync(dist, { recursive: true }).filter((file) => file.endsWith('.html'));
const problems = [];
let linkCount = 0;

for (const file of htmlFiles) {
	const html = readFileSync(join(dist, file), 'utf8');
	const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
	const idSet = new Set(ids);
	const hrefs = [...html.matchAll(/\shref="([^"]*)"/g)].map((match) => match[1]);

	const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
	for (const id of new Set(duplicates)) {
		problems.push(`${file}: duplicate id #${id}`);
	}

	for (const href of hrefs) {
		linkCount += 1;

		if (href.startsWith('#')) {
			if (href.length > 1 && !idSet.has(href.slice(1))) {
				problems.push(`${file}: ${href} has no matching id`);
			}
			continue;
		}

		if (!/^(https?:|mailto:|tel:|\/)/.test(href)) {
			problems.push(`${file}: unsupported href "${href}"`);
			continue;
		}

		if (href.startsWith('/') && !href.startsWith('//')) {
			const path = href.split('#')[0].split('?')[0];
			const target = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
			if (!existsSync(target)) {
				problems.push(`${file}: local asset ${href} does not exist`);
			}
		}
	}
}

if (process.argv.includes('--external')) {
	const external = new Set();

	for (const file of htmlFiles) {
		const html = readFileSync(join(dist, file), 'utf8');
		for (const match of html.matchAll(/\shref="(https?:[^"]+)"/g)) {
			external.add(match[1]);
		}
	}

	for (const url of external) {
		try {
			const response = await fetch(url, {
				redirect: 'follow',
				signal: AbortSignal.timeout(15000),
			});
			// LinkedIn answers 999 to non-browser clients; the URL is still live.
			if (!response.ok && response.status !== 999) {
				problems.push(`${url}: HTTP ${response.status}`);
			}
		} catch (error) {
			problems.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
}

if (problems.length) {
	console.error('\nlink check failed:\n');
	for (const problem of problems) console.error(`  - ${problem}`);
	console.error('');
	process.exit(1);
}

console.log(
	`link check passed (${htmlFiles.length} HTML file(s), ${linkCount} links${process.argv.includes('--external') ? ', external checked' : ''})`
);
