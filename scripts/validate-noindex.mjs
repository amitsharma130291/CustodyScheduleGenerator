import fs from 'node:fs';

const pages = [
	'child-support-calculator',
	'parenting-time-calculator',
	'holiday-custody-planner',
	'custody-agreement-builder',
	'schedule-comparison-tool',
];

for (const page of pages) {
	const html = fs.readFileSync(`dist/${page}/index.html`, 'utf8');
	const robots = html.match(/name="robots" content="([^"]+)"/);
	const canonical = html.match(/rel="canonical" href="([^"]+)"/);
	console.log(`${page}: robots=${robots?.[1] ?? 'MISSING'} canonical=${canonical?.[1] ?? 'MISSING'}`);
}

const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const inAstro = pages.filter((p) => sitemap.includes(p));
console.log(`In astro sitemap: ${inAstro.length ? inAstro.join(', ') : 'none'}`);

const pub = fs.readFileSync('public/sitemap.xml', 'utf8');
const inPublic = pages.filter((p) => pub.includes(p));
console.log(`In public sitemap: ${inPublic.length ? inPublic.join(', ') : 'none'}`);
console.log(`Public sitemap URL count: ${(pub.match(/<loc>/g) ?? []).length}`);
