import fs from 'fs';
import path from 'path';

function walk(dir, acc = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, acc);
		else if (e.name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

const distFiles = walk('dist');
const built = new Set();
for (const f of distFiles) {
	const rel = path.relative('dist', f).replace(/\\/g, '/');
	if (rel === 'index.html') built.add('/');
	else if (rel === '404.html') built.add('/404/');
	else if (rel === '500.html') built.add('/500/');
	else if (rel.endsWith('/index.html')) built.add(`/${rel.replace('/index.html', '')}/`);
}

const sitemap = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(m) => new URL(m[1]).pathname,
);
const sitemapSet = new Set(sitemap);

const noindex = new Set([
	'/404/',
	'/500/',
	'/blog/',
	'/privacy/',
	'/disclaimer/',
	'/terms/',
	'/child-support-calculator/',
	'/parenting-time-calculator/',
	'/holiday-custody-planner/',
	'/custody-agreement-builder/',
	'/schedule-comparison-tool/',
]);

const hrefRe = /href=["'](\/[^"'#?]+)/g;
const links = new Map();

function scanFile(file) {
	const text = fs.readFileSync(file, 'utf8');
	let m;
	while ((m = hrefRe.exec(text))) {
		let h = m[1];
		if (h.includes('{') || h.includes('${')) continue;
		if (!h.endsWith('/')) h += '/';
		if (!links.has(h)) links.set(h, []);
		links.get(h).push(file);
	}
}

function scanDir(d) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory() && !['node_modules', 'dist'].includes(e.name)) scanDir(p);
		else if (/\.(astro|tsx?|jsx?|md|html|mjs)$/.test(e.name)) scanFile(p);
	}
}
scanDir('src');

const broken = [];
for (const [href, files] of links) {
	if (href.startsWith('/logo') || href.startsWith('/og')) continue;
	if (!built.has(href)) broken.push({ href, files: [...new Set(files)] });
}

const indexableBuilt = [...built].filter((u) => !noindex.has(u));
const inSitemapNotBuilt = [...sitemapSet].filter((u) => !built.has(u));
const indexableNotSitemap = indexableBuilt.filter((u) => !sitemapSet.has(u));
const sitemapNotIndexable = [...sitemapSet].filter((u) => noindex.has(u));

console.log(JSON.stringify({
	builtCount: built.size,
	sitemapCount: sitemapSet.size,
	indexableBuiltCount: indexableBuilt.length,
	brokenLinks: broken.map((b) => ({ href: b.href, from: b.files.slice(0, 2) })),
	inSitemapNotBuilt,
	indexableNotSitemap,
	sitemapNotIndexable,
	builtIndexable: indexableBuilt.sort(),
}, null, 2));
