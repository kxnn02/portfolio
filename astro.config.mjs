// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Placeholder until the Student Pack domain is claimed. Update in one place.
const SITE = 'https://kennethclein.vercel.app';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	output: 'static',
	fonts: [
		{
			name: 'Inter Tight',
			cssVariable: '--font-sans',
			provider: fontProviders.google(),
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			provider: fontProviders.google(),
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
