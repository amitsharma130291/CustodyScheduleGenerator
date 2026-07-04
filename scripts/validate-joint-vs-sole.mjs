import fs from 'node:fs';

/**
 * Acceptance gate for the new education page /joint-custody-vs-sole-custody/.
 * Reads the BUILT output (run `npm run build` first) and asserts every
 * machine-checkable PASS/FAIL criterion from joint-vs-sole-test-cases.md.
 *
 * Run:  node scripts/validate-joint-vs-sole.mjs
 * Exit: 0 = all pass, 1 = one or more failures (details printed).
 *
 * Follows the repo convention of dist-HTML validators
 * (scripts/validate-noindex.mjs, validate-legal-vs-physical.mjs,
 * validate-best-coparenting-app.mjs). NOT a vitest test on purpose: the vitest
 * suite is lib-level and must pass without a prior build; a dist-reading unit
 * test would break that baseline.
 *
 * PAGE MODE: PURE EDUCATION (no embedded generator panel).
 *   Rationale (research §1, §6, §11): this page owns the AMOUNT/ALLOCATION axis
 *   (joint = shared vs sole = one parent). The topical boundary forbids
 *   re-teaching the legal-vs-physical TYPE axis (owned by
 *   /legal-custody-vs-physical-custody/) and re-explaining schedule rotations
 *   (owned by /custodial-schedule/). "The page decides the split; the tool
 *   builds the schedule" -> the generator is LINKED, not embedded. So this gate
 *   asserts the generator CTA link appears >=2x AND that NO GeneratorPanel /
 *   calendar grid is embedded in <main> (dup-content boundary guard).
 */

const PAGE = 'dist/joint-custody-vs-sole-custody/index.html';
const SITEMAP = 'dist/sitemap-0.xml';
const CANONICAL = 'https://custodybuilder.com/joint-custody-vs-sole-custody/';

// Baseline dist index.html count BEFORE this page (confirmed this session:
// `npm run build` => "52 page(s) built", find dist -name index.html => 50).
// Adding /joint-custody-vs-sole-custody/ must bring it to exactly 51.
const BASELINE_INDEX_HTML = 50;
const EXPECTED_INDEX_HTML = BASELINE_INDEX_HTML + 1; // 51

// Baseline `npm run build` page count = 52; new page must report 53.
const EXPECTED_BUILD_PAGES = 53;

// Baseline vitest passing = 133; must stay >= 133 (page adds no lib tests, but
// must not regress).
const MIN_VITEST_PASS = 133;

// Research §10 title tag — primary + approved alternate. Either is acceptable;
// both are <=60 chars. The page must render exactly one of them.
const ACCEPTED_TITLES = [
	"Joint Custody vs Sole Custody: What's the Difference?", // 52 chars (recommended)
	'Joint vs Sole Custody: The Difference Explained', // 47 chars (alt)
];

// Research §10 exact meta descriptions (primary 159 / alt 155). Reported as an
// exact-match INFO; the hard gate only requires <=160 + keyword presence so a
// minor builder reword does not false-fail.
const APPROVED_METAS = [
	'Joint custody is shared between both parents; sole custody is one parent. See the difference, when courts order each, the trade-offs, and how each sets a schedule.',
	'Joint custody means both parents share; sole custody means one parent. Compare the two, when each is ordered, pros and cons, and how they shape the schedule.',
];

// HARD-REQUIRED internal links = research §11 "Recommended final link set"
// CORE. All are verified-existing routes. The two boundary links
// (/legal-custody-vs-physical-custody/ + /custodial-schedule/) are REQUIRED by
// the brief. /custody-schedule-generator/ is the primary CTA (also gated >=2x
// below).
const REQUIRED_LINKS = [
	'/custody-schedule-generator/',
	'/legal-custody-vs-physical-custody/',
	'/custodial-schedule/',
	'/50-50-custody-schedule/',
	'/every-other-weekend-custody-schedule/',
	'/custody-percentage-calculator/',
	'/sample-parenting-plan/',
];

// RECOMMENDED (research §11 optional item 8) — reported, not gated.
const RECOMMENDED_LINKS = [
	'/custody-schedule-by-age/',
	'/holiday-custody-schedule/',
	'/week-on-week-off-custody-schedule/',
	'/parenting-plan-template/',
];

// Geo-neutral page — these Texas links must NOT appear in PAGE CONTENT (<main>).
// NOTE: two of them (/texas-parenting-plan-template/, /texas-child-support-calculator/)
// are legit global-nav links rendered by the shared Footer.astro on ALL pages;
// stripping them would alter every other page (forbidden). So the geo-neutral
// intent is checked against <main> (page body), not the whole document.
const FORBIDDEN_LINKS = [
	'/texas-standard-possession-order/',
	'/texas-parenting-plan-template/',
	'/texas-child-support-calculator/',
];

// ---- DUPLICATE-CONTENT boundary guard ----
// Signature H2/H3 headings OWNED by the two sibling pages. If any of these
// appear verbatim in THIS page's <main>, the page has crossed the anti-dup
// boundary (re-teaching the TYPE axis, or re-explaining schedule mechanics).
// Grepped from the live dist output of both siblings this session.
const FORBIDDEN_SIGNATURE_PHRASES = [
	// /legal-custody-vs-physical-custody/ owns the TYPE axis:
	'legal custody vs physical custody at a glance',
	'what is legal custody?',
	'what is physical custody?',
	'the four ways legal and physical custody combine',
	'why physical custody, not legal custody, sets the schedule',
	// /custodial-schedule/ owns schedule PATTERNS/mechanics:
	'types of custodial schedules',
	'what is a custodial schedule?',
	'what makes a good custodial schedule',
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
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
const mainHtml = mainMatch?.[0] ?? html;
const mainText = mainHtml.replace(/<[^>]+>/g, ' ');
const mainTextLower = mainText.toLowerCase();

check(`dist page exists: ${PAGE}`, true);

// ---- TITLE ----
const decodeEntities = (s) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&rsquo;/g, "'")
		.replace(/&#x27;/g, "'");
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = decodeEntities(titleMatch?.[1]?.trim() ?? '');
check('exactly one <title>', (html.match(/<title>/g) || []).length === 1);
check(
	'title is a research-approved value',
	ACCEPTED_TITLES.includes(title),
	`got "${title}"`,
);
check('title <= 60 chars', title.length > 0 && title.length <= 60, `${title.length} chars`);
check('title mentions joint + sole custody', /joint/i.test(title) && /sole/i.test(title));

// ---- META DESCRIPTION ----
const descMatch = head.match(/<meta name="description" content="([^"]*)"/);
const desc = decodeEntities(descMatch?.[1] ?? '');
check('meta description present', desc.length > 0);
check('meta description <= 160 chars', desc.length > 0 && desc.length <= 160, `${desc.length} chars`);
check(
	'meta description mentions joint + sole custody',
	/joint custody/i.test(desc) && /sole custody/i.test(desc),
);
console.log(
	`INFO  meta description exact-match to a research value: ${APPROVED_METAS.includes(desc) ? 'yes' : 'no (reworded — allowed if <=160 + keywords)'}`,
);

// ---- CANONICAL ----
const canonMatch = head.match(/rel="canonical" href="([^"]*)"/);
const canonical = canonMatch?.[1] ?? '';
check('canonical === expected', canonical === CANONICAL, `got "${canonical}"`);

// ---- ROBOTS (noindex:false — page must be indexable) ----
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
let articleNode = null;
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
			if (node && node['@type'] === 'Article') articleNode = node;
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

// ---- E-E-A-T: Article schema author + dateModified ----
check('JSON-LD includes Article (E-E-A-T)', ldTypes.has('Article'));
check(
	'Article has an author name',
	!!(articleNode && articleNode.author && articleNode.author.name),
	articleNode ? `author=${JSON.stringify(articleNode.author?.name)}` : 'no Article node',
);
check(
	'Article has dateModified',
	!!(articleNode && articleNode.dateModified),
	articleNode ? `dateModified=${articleNode.dateModified}` : 'no Article node',
);

// ---- E-E-A-T: visible reviewer byline + last-updated date in page content ----
check(
	'visible reviewer byline present in <main> (Reviewed by …)',
	/Reviewed by/i.test(mainText) && /CustodyBuilder Editorial Team/i.test(mainText),
);
check(
	'visible last-updated date present in <main>',
	/Last updated/i.test(mainText),
);

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

// H1 mentions joint + sole
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
const h1Text = decodeEntities((h1Match?.[1] ?? '').replace(/<[^>]+>/g, ' ')).toLowerCase();
check('H1 mentions joint + sole custody', /joint/.test(h1Text) && /sole/.test(h1Text), `h1="${h1Text.trim()}"`);

// ---- BOTH "joint" AND "sole" custody DEFINED (for legal + physical) ----
check('"joint custody" defined/discussed in <main>', /joint custody/i.test(mainText));
check('"sole custody" defined/discussed in <main>', /sole custody/i.test(mainText));
check('joint LEGAL custody covered', /joint legal custody/i.test(mainText));
check('joint PHYSICAL custody covered', /joint physical custody/i.test(mainText));
check('sole LEGAL custody covered', /sole legal custody/i.test(mainText));
check('sole PHYSICAL custody covered', /sole physical custody/i.test(mainText));

// ---- DEFINITION / COMPARISON TABLE present ----
const tableCount = (mainHtml.match(/<table[\s>]/gi) || []).length;
check('a comparison/definition <table> present in <main>', tableCount >= 1, `${tableCount} tables`);

// ---- INTERNAL LINKS ----
const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
for (const link of REQUIRED_LINKS) {
	check(`required link present: ${link}`, hrefs.has(link));
}
for (const link of REQUIRED_LINKS) {
	check(`required link ends in "/": ${link}`, link.endsWith('/'));
}
// The two boundary links must appear in <main> (they are the anti-dup handoffs,
// not just footer chrome).
const mainHrefs = new Set([...mainHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
check(
	'boundary link /legal-custody-vs-physical-custody/ present in <main>',
	mainHrefs.has('/legal-custody-vs-physical-custody/'),
);
check(
	'boundary link /custodial-schedule/ present in <main>',
	mainHrefs.has('/custodial-schedule/'),
);
// forbidden Texas links — scoped to page content (<main>), not shared footer.
for (const link of FORBIDDEN_LINKS) {
	check(`forbidden Texas link absent (page content): ${link}`, !mainHrefs.has(link));
}
// recommended (report only)
const recPresent = RECOMMENDED_LINKS.filter((l) => hrefs.has(l));
console.log(`INFO  recommended internal links present: ${recPresent.length}/${RECOMMENDED_LINKS.length}`);

// ---- GENERATOR MODE: PURE EDUCATION (link, do not embed) ----
// (a) CTA link appears >=2x (hero + close).
const genCount = [...html.matchAll(/href="\/custody-schedule-generator\/"/g)].length;
check('generator CTA link appears >= 2 times', genCount >= 2, `${genCount} occurrences`);
// (b) topical-boundary guard: NO embedded generator panel / calendar grid in
// page content. If these appear in <main>, the page embedded the tool (wrong
// mode) and would tread on /custodial-schedule/'s territory.
check(
	'no embedded generator panel in page content (cal-cell-a absent from <main>)',
	!/cal-cell-a/.test(mainHtml),
);
check(
	'no embedded calendar grid in page content (data-calendar-grid absent from <main>)',
	!/data-calendar-grid/.test(mainHtml),
);

// ---- CTA CONTRAST GUARD ----
// The primary CTA anchor (bg-accent dark background) must set EXPLICIT white
// text via an inline style — not rely on inherited colour (the custodial-schedule
// inherited-near-black bug). Require at least one generator anchor with a dark
// bg (bg-accent or btn-primary) AND an explicit white colour in a style attr.
const genAnchors = [...html.matchAll(/<a\b[^>]*href="\/custody-schedule-generator\/"[^>]*>/g)].map(
	(m) => m[0],
);
const hasContrastSafeCta = genAnchors.some((a) => {
	const darkBg = /bg-accent|btn-primary/.test(a);
	const styleMatch = a.match(/style="([^"]*)"/i);
	const explicitWhite =
		styleMatch && /color\s*:\s*(#fff(fff)?|white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\))/i.test(styleMatch[1]);
	return darkBg && explicitWhite;
});
check(
	'primary CTA sets explicit white text on dark bg (no inherited-colour bug)',
	hasContrastSafeCta,
	`checked ${genAnchors.length} generator anchors`,
);

// ---- DUPLICATE-CONTENT boundary guard ----
// None of the sibling-owned signature headings/phrases may appear in <main>.
for (const phrase of FORBIDDEN_SIGNATURE_PHRASES) {
	check(
		`dup-content: sibling signature phrase absent from <main>: "${phrase}"`,
		!mainTextLower.includes(phrase),
	);
}

// ---- SITEMAP ----
if (fs.existsSync(SITEMAP)) {
	const sitemap = fs.readFileSync(SITEMAP, 'utf8');
	check('sitemap includes /joint-custody-vs-sole-custody/', sitemap.includes('/joint-custody-vs-sole-custody/'));
} else {
	check(`sitemap exists (${SITEMAP})`, false);
}

// ---- REGRESSION: prior boundary pages still built ----
check(
	'regression: sibling page (legal-custody-vs-physical-custody) still in dist',
	fs.existsSync('dist/legal-custody-vs-physical-custody/index.html'),
);
check(
	'regression: sibling page (custodial-schedule) still in dist',
	fs.existsSync('dist/custodial-schedule/index.html'),
);

// ---- PAGE COUNT ----
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
check(
	`dist index.html count === ${EXPECTED_INDEX_HTML} (baseline ${BASELINE_INDEX_HTML} + 1 new page)`,
	indexCount === EXPECTED_INDEX_HTML,
	`${indexCount} found`,
);
console.log(
	`INFO  expected \`npm run build\` page count = ${EXPECTED_BUILD_PAGES} (baseline 52 + 1); confirm 0 build warnings in the build log`,
);
console.log(
	`INFO  expected \`npx vitest run\` >= ${MIN_VITEST_PASS} passing (run separately; this gate reads dist only)`,
);

// ---- summary ----
console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures > 0 ? 1 : 0);
