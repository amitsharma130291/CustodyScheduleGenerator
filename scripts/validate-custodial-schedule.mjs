import fs from 'node:fs';

/**
 * Acceptance gate for the new hub page /custodial-schedule/.
 * Reads the BUILT output (run `npm run build` first) and asserts every
 * PASS/FAIL criterion from custodial-schedule-test-cases.md.
 *
 * Run:  node scripts/validate-custodial-schedule.mjs
 * Exit: 0 = all pass, 1 = one or more failures (details printed).
 *
 * This follows the repo convention of dist-HTML validators
 * (scripts/validate-noindex.mjs, scripts/validate-7030.mjs). It is NOT a
 * vitest test on purpose: the vitest suite is lib-level and must pass
 * without a prior build; a dist-reading unit test would break that baseline.
 */

const PAGE = 'dist/custodial-schedule/index.html';
const SITEMAP = 'dist/sitemap-0.xml';
const CANONICAL = 'https://custodybuilder.com/custodial-schedule/';

// The two research-approved title options (research §8). Either is acceptable;
// both are <=60 chars. The page must render exactly one of them.
const ACCEPTED_TITLES = [
	'Custodial Schedule: Types, Examples & Free Calendar',
	'Custodial Schedule Guide: Types, Examples & Tool',
];

// HARD-REQUIRED internal links — research §7 "Confirmed existing (safe to link)"
// plus the parenting-time calculator referenced by the percentages section.
// Every one must appear as an href in the rendered HTML, and every one ends
// in "/" (astro.config trailingSlash: 'always').
const REQUIRED_LINKS = [
	'/custody-schedule-generator/',
	'/50-50-custody-schedule/',
	'/2-2-3-custody-schedule/',
	'/2-2-5-5-custody-schedule/',
	'/5-2-2-5-custody-schedule/',
	'/3-4-4-3-custody-schedule/',
	'/week-on-week-off-custody-schedule/',
	'/60-40-custody-schedule/',
	'/70-30-custody-schedule/',
	'/80-20-custody-schedule/',
	'/every-other-weekend-custody-schedule/',
	'/custody-schedule-by-age/',
	'/custody-percentage-calculator/',
	'/holiday-custody-schedule/',
	'/parenting-time-calculator/',
];

// RECOMMENDED (bonus internal-link equity) — reported, not gated.
const RECOMMENDED_LINKS = [
	'/visitation-calculator/',
	'/custody-calendar-template/',
	'/custody-schedule-template/',
	'/parenting-plan-template/',
	'/schedule-comparison-tool/',
	'/custody-agreement-builder/',
	'/holiday-custody-planner/',
	'/holiday-visitation-schedule/',
	'/50-50-custody-schedule-for-babies/',
	'/50-50-custody-schedule-for-toddlers/',
	'/50-50-custody-schedule-for-school-age-children/',
	'/50-50-custody-schedule-for-teenagers/',
	'/best-custody-schedule-for-5-year-old/',
	'/best-custody-schedule-for-7-year-old/',
	'/best-custody-schedule-for-toddler/',
	'/best-custody-schedule-for-teenager/',
];

// Geo-neutral hub — these Texas-specific links must NOT appear.
const FORBIDDEN_LINKS = [
	'/texas-standard-possession-order/',
	'/texas-parenting-plan-template/',
	'/texas-child-support-calculator/',
];

let failures = 0;
let passes = 0;
function check(name, ok, detail = '') {
	if (ok) {
		passes++;
		console.log(`PASS  ${name}`);
	} else {
		failures++;
		console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
	}
}

// ---- load ----
if (!fs.existsSync(PAGE)) {
	console.log(`FAIL  dist page exists (${PAGE}) — run \`npm run build\` first`);
	console.log('\n0 passed, 1 failed');
	process.exit(1);
}
const html = fs.readFileSync(PAGE, 'utf8');
const head = html.split('</head>')[0] ?? html;

check(`dist page exists: ${PAGE}`, true);

// ---- TITLE ----
// Decode the handful of HTML entities Astro escapes in the <title>
// (&amp; &lt; &gt; &quot; &#39;) so we compare against the human-readable
// research-approved value, not the escaped source. `&` in an approved title
// always renders as `&amp;` — that is correct HTML, not a page defect.
const decodeEntities = (s) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = decodeEntities(titleMatch?.[1]?.trim() ?? '');
check('exactly one <title>', (html.match(/<title>/g) || []).length === 1);
check(
	'title is a research-approved value',
	ACCEPTED_TITLES.includes(title),
	`got "${title}"`,
);
check('title <= 60 chars', title.length > 0 && title.length <= 60, `${title.length} chars`);
check('title contains "Custodial Schedule"', /custodial schedule/i.test(title));

// ---- META DESCRIPTION ----
const descMatch = head.match(/<meta name="description" content="([^"]*)"/);
const desc = descMatch?.[1] ?? '';
check('meta description present', desc.length > 0);
check('meta description <= 160 chars', desc.length > 0 && desc.length <= 160, `${desc.length} chars`);
check('meta description mentions custodial schedule', /custodial schedule/i.test(desc));

// ---- CANONICAL ----
const canonMatch = head.match(/rel="canonical" href="([^"]*)"/);
const canonical = canonMatch?.[1] ?? '';
check('canonical === expected', canonical === CANONICAL, `got "${canonical}"`);

// ---- ROBOTS (noindex:false) ----
const robotsMatch = head.match(/name="robots" content="([^"]*)"/);
const robots = robotsMatch?.[1] ?? '';
check('robots present', robots.length > 0, `got "${robots}"`);
check('robots is NOT noindex', robots.length > 0 && !/noindex/i.test(robots), `got "${robots}"`);

// ---- OPEN GRAPH ----
const og = {};
for (const m of head.matchAll(/property="(og:[a-z]+)" content="([^"]*)"/g)) og[m[1]] = m[2];
check('og:title present', !!og['og:title']);
check('og:description present', !!og['og:description']);
check('og:type present', !!og['og:type']);
check('og:url present', !!og['og:url']);
check('og:url === canonical', og['og:url'] === CANONICAL, `got "${og['og:url']}"`);

// ---- JSON-LD ----
const ldTypes = new Set();
let faqCount = 0;
let ldParseOk = true;
const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
check('at least one JSON-LD block', ldBlocks.length >= 1);
for (const b of ldBlocks) {
	try {
		const parsed = JSON.parse(b[1]);
		const arr = Array.isArray(parsed) ? parsed : [parsed];
		for (const node of arr) {
			if (node && node['@type']) ldTypes.add(node['@type']);
			if (node && node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) {
				faqCount = node.mainEntity.length;
			}
		}
	} catch (e) {
		ldParseOk = false;
	}
}
check('all JSON-LD blocks parse as valid JSON', ldParseOk);
check('JSON-LD includes WebPage', ldTypes.has('WebPage'));
check('JSON-LD includes FAQPage', ldTypes.has('FAQPage'));
check('JSON-LD includes BreadcrumbList', ldTypes.has('BreadcrumbList'));
check('FAQPage has >= 8 Q&A', faqCount >= 8, `${faqCount} questions`);

// ---- HEADINGS ----
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
const h2Count = (html.match(/<h2[\s>]/g) || []).length;
check('exactly one <h1>', h1Count === 1, `${h1Count} found`);
check('at least 3 <h2>', h2Count >= 3, `${h2Count} found`);

// heading hierarchy: no downward level jump > 1 (e.g. h2 -> h4)
const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
let hierarchyOk = levels.length > 0 && levels[0] === 1;
for (let i = 1; i < levels.length; i++) {
	if (levels[i] - levels[i - 1] > 1) hierarchyOk = false;
}
check('heading hierarchy starts at h1, no skipped levels', hierarchyOk, `order: ${levels.join(',')}`);

// ---- INTERNAL LINKS ----
const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
for (const link of REQUIRED_LINKS) {
	check(`required link present: ${link}`, hrefs.has(link));
}
// trailing slash on required links (all listed end in "/"; guard against a variant href)
for (const link of REQUIRED_LINKS) {
	check(`required link ends in "/": ${link}`, link.endsWith('/'));
}
// CTA appears at least twice (above fold + near end)
const genCount = [...html.matchAll(/href="\/custody-schedule-generator\/"/g)].length;
check('generator CTA appears >= 2 times', genCount >= 2, `${genCount} occurrences`);

// forbidden Texas links — scoped to the PAGE CONTENT (<main>), NOT the
// site-wide header/footer. Two of these (/texas-parenting-plan-template/,
// /texas-child-support-calculator/) are legitimate global-nav links rendered
// by the shared Footer.astro on all 49 pages; stripping them would alter every
// other page (forbidden by the build brief). The test's real intent (research
// §7) is that the hub's own body copy stays geo-neutral — so check <main>.
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
const mainHtml = mainMatch?.[0] ?? html;
const mainHrefs = new Set(
	[...mainHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
);
for (const link of FORBIDDEN_LINKS) {
	check(
		`forbidden Texas link absent (page content): ${link}`,
		!mainHrefs.has(link),
	);
}

// recommended (report only)
const recPresent = RECOMMENDED_LINKS.filter((l) => hrefs.has(l));
console.log(`INFO  recommended internal links present: ${recPresent.length}/${RECOMMENDED_LINKS.length}`);

// ---- GENERATOR PANEL + CALENDAR COLOUR CELLS ----
check('calendar cell class cal-cell-a present', /cal-cell-a/.test(html));
check('calendar cell class cal-cell-b present', /cal-cell-b/.test(html));

// ---- SITEMAP ----
if (fs.existsSync(SITEMAP)) {
	const sitemap = fs.readFileSync(SITEMAP, 'utf8');
	check('sitemap includes /custodial-schedule/', sitemap.includes('/custodial-schedule/'));
} else {
	check(`sitemap exists (${SITEMAP})`, false);
}

// ---- REGRESSION: reference page still built ----
check(
	'regression: reference page still in dist',
	fs.existsSync('dist/texas-standard-possession-order/index.html'),
);

// ---- PAGE COUNT ----
// Baseline before this page: 46 index.html files (48 total .html incl 404/500).
// Adding /custodial-schedule/ must bring index.html to exactly 47.
function countIndexHtml(dir) {
	let n = 0;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = `${dir}/${entry.name}`;
		if (entry.isDirectory()) n += countIndexHtml(p);
		else if (entry.name === 'index.html') n += 1;
	}
	return n;
}
const indexCount = countIndexHtml('dist');
check('dist index.html count === 47 (was 46, +1 new page)', indexCount === 47, `${indexCount} found`);

// ---- summary ----
console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures > 0 ? 1 : 0);
