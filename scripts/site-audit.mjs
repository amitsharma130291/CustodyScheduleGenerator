import fs from 'node:fs';
import path from 'node:path';

const distRoot = 'dist';
const srcRoot = 'src';

function walkHtml(dir, base = '') {
	const out = [];
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const rel = path.join(base, ent.name);
		if (ent.isDirectory()) out.push(...walkHtml(path.join(dir, ent.name), rel));
		else if (ent.name === 'index.html') out.push('/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, '') || '/');
	}
	return out;
}

function wordCount(html) {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text.split(' ').filter(Boolean).length;
}

function extractMeta(html) {
	const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
	const desc = html.match(/name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
	const robots = html.match(/name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
	const canonical = html.match(/rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? '';
	const faqCount = (html.match(/"@type":"Question"/g) || []).length;
	const h1 = html.match(/<h1[^>]*>([^<]*)<\/h1>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
	return { title, desc, robots, canonical, faqCount, h1 };
}

const slopPhrases = [
	'every family is different',
	'every family',
	'communication is key',
	'it depends on your situation',
	'no one-size-fits-all',
	'parents should consider',
	'may be a good fit',
	'works best when',
	'important to note',
	'comprehensive guide',
	'helpful tool',
	'smooth transitions',
	'often works best',
	'it depends',
	'there is no single best',
	'not legal advice',
];

const pages = walkHtml(distRoot).sort();
const rows = [];
for (const url of pages) {
	const filePath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`;
	if (!fs.existsSync(filePath)) continue;
	const html = fs.readFileSync(filePath, 'utf8');
	const words = wordCount(html);
	const meta = extractMeta(html);
	rows.push({ url, words, ...meta });
}

console.log('=== PAGE INVENTORY ===');
console.log('Total built pages:', rows.length);
console.log(JSON.stringify(rows.map((r) => ({ url: r.url, words: r.words, faq: r.faqCount, robots: r.robots })), null, 0));

// Slop phrase scan across src
console.log('\n=== SLOP PHRASE SCAN (src) ===');
for (const phrase of slopPhrases) {
	const hits = [];
	function scanDir(d) {
		for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
			const p = path.join(d, ent.name);
			if (ent.isDirectory() && ent.name !== 'node_modules') scanDir(p);
			else if (/\.(ts|astro|md)$/.test(ent.name)) {
				const c = fs.readFileSync(p, 'utf8');
				const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
				const m = c.match(re);
				if (m?.length) hits.push({ file: p.replace(/\\/g, '/'), count: m.length });
			}
		}
	}
	scanDir(srcRoot);
	if (hits.length) console.log(phrase, hits.reduce((s, h) => s + h.count, 0), hits.slice(0, 8));
}

// FAQ extraction from schedule content + data files
console.log('\n=== FAQ EXTRACTION ===');
const faqMap = new Map();
function extractFaqsFromText(text, source) {
	const re = /question:\s*['"]([^'"]+)['"]/g;
	let m;
	while ((m = re.exec(text))) {
		const q = m[1];
		if (!faqMap.has(q)) faqMap.set(q, []);
		faqMap.get(q).push(source);
	}
}
function scanFaqs(d) {
	for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, ent.name);
		if (ent.isDirectory()) scanFaqs(p);
		else if (/\.(ts|astro)$/.test(ent.name)) {
			extractFaqsFromText(fs.readFileSync(p, 'utf8'), p.replace(/\\/g, '/'));
		}
	}
}
scanFaqs(srcRoot);
const dupFaqs = [...faqMap.entries()].filter(([, sources]) => sources.length > 1).sort((a, b) => b[1].length - a[1].length);
console.log('Duplicate FAQ questions (2+ files):', dupFaqs.length);
for (const [q, sources] of dupFaqs.slice(0, 25)) {
	console.log(`- "${q.slice(0, 70)}${q.length > 70 ? '...' : ''}" (${sources.length}): ${sources.map((s) => path.basename(s)).join(', ')}`);
}

// Duplicate routes
console.log('\n=== DUPLICATE ROUTE CHECK ===');
const canonicals = rows.map((r) => r.canonical).filter(Boolean);
const schedulesDup = rows.filter((r) => r.url.startsWith('/schedules/'));
for (const s of schedulesDup) {
	const main = s.url.replace('/schedules', '');
	const mainRow = rows.find((r) => r.url === main);
	if (mainRow) console.log('DUPLICATE:', s.url, 'vs', main, '| words', s.words, 'vs', mainRow.words);
}
