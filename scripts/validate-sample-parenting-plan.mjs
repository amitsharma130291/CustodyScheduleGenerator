import fs from 'node:fs';

/**
 * Acceptance gate for the new EXAMPLES page /sample-parenting-plan/.
 * Reads the BUILT output (run `npm run build` first) and asserts every
 * machine-checkable PASS/FAIL criterion from sample-parenting-plan-test-cases.md.
 *
 * Run:  node scripts/validate-sample-parenting-plan.mjs
 * Exit: 0 = all pass, 1 = one or more failures (details printed).
 *
 * Follows the repo convention of dist-HTML validators
 * (scripts/validate-noindex.mjs, validate-7030.mjs, validate-custodial-schedule.mjs,
 * validate-legal-vs-physical.mjs). NOT a vitest test on purpose: the vitest suite
 * is lib-level (133 tests) and must pass WITHOUT a prior build; a dist-reading unit
 * test would break that baseline.
 *
 * PAGE MODE: PURE EDUCATION / EXAMPLES (generator LINKED, NOT embedded).
 *   Rationale (research sample-parenting-plan-research.md §1, §8): this page owns
 *   "complete, annotated, geo-neutral sample parenting plans by family situation" —
 *   five worked example plans. It is NOT a blank form (that is /parenting-plan-template/)
 *   and NOT a schedule-mechanics explainer (that is /custodial-schedule/ + the pattern
 *   pages) and NOT a custody-definitions page (that is /legal-custody-vs-physical-custody/).
 *   The generator is LINKED (CTA >=2x) and NOT embedded, mirroring
 *   /legal-custody-vs-physical-custody/, inverse of /custodial-schedule/. Embedding the
 *   panel would breach the dup-content boundary vs /custodial-schedule/.
 */

const PAGE = 'dist/sample-parenting-plan/index.html';
const SITEMAP = 'dist/sitemap-0.xml';
const CANONICAL = 'https://custodybuilder.com/sample-parenting-plan/';

// Baseline dist index.html count BEFORE this page (confirmed this session:
// `npm run build` => "50 page(s) built", 0 warnings; find dist -name index.html => 48).
// Adding /sample-parenting-plan/ must bring it to exactly 49.
const BASELINE_INDEX_HTML = 48;
const EXPECTED_INDEX_HTML = BASELINE_INDEX_HTML + 1; // 49

// Research §7 title tag — primary + approved alternate. Either is acceptable;
// both are <=60 chars. The page must render exactly one of them.
const ACCEPTED_TITLES = [
	'Sample Parenting Plan: 5 Complete Examples to Copy', // 50 chars (primary)
	'Sample Parenting Plan Examples: 5 Real Plans (Free)', // 51 chars (approved alt)
];

// Research §7 exact meta description (156 chars). Reported as an exact-match INFO;
// the hard gate only requires <=160 + keyword presence so a minor builder reword
// does not false-fail.
const APPROVED_META =
	'Five complete sample parenting plans — 50/50, high-conflict, long-distance, primary custody, and infant step-up. Read full examples and build your own free.';

// HARD-REQUIRED internal links = research §7 "Internal links — final set" CORE
// (all verified to exist in src/pages/). /custody-schedule-generator/ is the
// primary CTA (also gated >=2x below). /parenting-plan-template/ and
// /legal-custody-vs-physical-custody/ are the two anti-dup boundary links the
// brief calls out explicitly.
const REQUIRED_LINKS = [
	'/parenting-plan-template/',            // "start your own blank plan" (primary sibling)
	'/custody-schedule-generator/',         // primary CTA (generate the schedule exhibit)
	'/legal-custody-vs-physical-custody/',  // custody definitions (link out, don't re-teach)
	'/custodial-schedule/',                 // primary-residence structure (Examples 3 & 4)
	'/custody-schedule-by-age/',            // age-appropriate rotations (Example 5)
	'/holiday-custody-schedule/',           // holiday override method (all examples)
	'/custody-percentage-calculator/',      // parenting-time percentage (Example 4)
];

// RECOMMENDED pattern-name links (research §7 item 8) — reported, not gated,
// because the builder chooses which pattern pages each example references.
const RECOMMENDED_LINKS = [
	'/50-50-custody-schedule/',
	'/week-on-week-off-custody-schedule/',
	'/every-other-weekend-custody-schedule/',
	'/2-2-3-custody-schedule/',
];

// Geo-neutral page (research §1 boundary map) — these Texas links must NOT appear
// in PAGE CONTENT (<main>). NOTE: two of them (/texas-parenting-plan-template/,
// /texas-child-support-calculator/) are legit global-nav links rendered by the
// shared Footer.astro on ALL pages; stripping them would alter every other page
// (forbidden). So the geo-neutral intent is checked against <main> (page body),
// not the whole document. (Confirmed recurring false-negative — see NOTES.)
const FORBIDDEN_LINKS = [
	'/texas-standard-possession-order/',
	'/texas-parenting-plan-template/',
	'/texas-child-support-calculator/',
];

// Anti-slop ban list (research §8) — scoped to <main> TEXT NODES only.
const SLOP_WORDS = [
	'delve', 'robust', 'leverage', 'landscape', 'showcase', 'underscore',
	'pivotal', 'synergy', 'holistic', 'foster a', 'in the realm of',
	'navigating the', 'testament to', 'unlock the',
];

// The FIVE sample scenarios (research §4) must all be present as worked examples.
// Checked by situation-TYPE markers (stable regardless of the fictional names the
// builder assigns), plus a count of five "Example N" section markers.
const SCENARIO_MARKERS = [
	{ name: 'Example 1: amicable 50/50 (week-on-week-off)', re: /(50\s*\/\s*50|week[- ]on[- ]week[- ]off|amicable)/i },
	{ name: 'Example 2: high-conflict (written-only / parallel parenting)', re: /(high[- ]conflict|parallel parenting|written[- ]only|written only)/i },
	{ name: 'Example 3: long-distance / relocation', re: /(long[- ]distance|relocation|relocat)/i },
	{ name: 'Example 4: primary custody + every-other-weekend + midweek', re: /(every[- ]other[- ]weekend)/i },
	{ name: 'Example 5: infant / toddler step-up', re: /(infant|toddler|step[- ]up)/i },
];

// DUP-CONTENT enforcement (research §1, operator's #1 concern). Signature phrases
// that BELONG to the sibling pages this page must NOT re-host / re-teach. If any
// appear in OUR <main>, we have crossed the boundary.
//   - /parenting-plan-template/ owns the BLANK form (clause hierarchy, decision tree,
//     "insert the schedule from the generator"). We LINK to it, never re-host it.
//   - /custodial-schedule/ owns schedule mechanics + "Types of custodial schedules".
//   - /legal-custody-vs-physical-custody/ owns the definitions ("What is legal custody?").
const FORBIDDEN_SIGNATURE_PHRASES = [
	{ owner: '/parenting-plan-template/', phrase: 'Clause Hierarchy' },
	{ owner: '/parenting-plan-template/', phrase: 'Decision-Making Tree' },
	{ owner: '/parenting-plan-template/', phrase: 'Insert The Schedule From The Generator' },
	{ owner: '/custodial-schedule/', phrase: 'Types of custodial schedules' },
	{ owner: '/legal-custody-vs-physical-custody/', phrase: 'What is legal custody?' },
	{ owner: '/legal-custody-vs-physical-custody/', phrase: 'What is physical custody?' },
	{ owner: '/custodial-schedule/', phrase: 'The four ways legal and physical custody combine' },
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
// Visible text of <main> (tags stripped) for content-level greps.
const mainText = mainHtml.replace(/<[^>]+>/g, ' ');

check(`dist page exists: ${PAGE}`, true);

// ---- TITLE ----
// Decode the entities Astro escapes in <title> (&amp; &lt; &gt; &quot; &#39;)
// so we compare against the human-readable research-approved value.
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
check('title mentions "parenting plan"', /parenting plan/i.test(title));

// ---- META DESCRIPTION ----
const descMatch = head.match(/<meta name="description" content="([^"]*)"/);
const desc = decodeEntities(descMatch?.[1] ?? '');
check('meta description present', desc.length > 0);
check('meta description <= 160 chars', desc.length > 0 && desc.length <= 160, `${desc.length} chars`);
check('meta description mentions "parenting plan"', /parenting plan/i.test(desc));
console.log(
	`INFO  meta description exact-match to research value: ${desc === APPROVED_META ? 'yes' : 'no (reworded — allowed if <=160 + keyword)'}`,
);

// ---- CANONICAL ----
const canonMatch = head.match(/rel="canonical" href="([^"]*)"/);
const canonical = canonMatch?.[1] ?? '';
check('canonical === expected', canonical === CANONICAL, `got "${canonical}"`);

// ---- ROBOTS (must be indexable — NOT noindex) ----
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

// ---- E-E-A-T: Article schema author + dateModified (aim 10/10) ----
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

// ---- E-E-A-T: visible reviewer byline + last-updated date in <main> ----
check(
	'visible reviewer byline present in <main> (Reviewed by ... CustodyBuilder Editorial Team)',
	/Reviewed by/i.test(mainText) && /CustodyBuilder Editorial Team/i.test(mainText),
);
check('visible last-updated date present in <main>', /Last updated/i.test(mainText));

// ---- HEADINGS ----
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
const h2Count = (html.match(/<h2[\s>]/g) || []).length;
check('exactly one <h1>', h1Count === 1, `${h1Count} found`);
check('at least 6 <h2> (5 examples + orientation/CTA/FAQ)', h2Count >= 6, `${h2Count} found`);

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
for (const link of REQUIRED_LINKS) {
	check(`required link ends in "/": ${link}`, link.endsWith('/'));
}
// forbidden Texas links — scoped to page content (<main>), not shared footer.
const mainHrefs = new Set([...mainHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
for (const link of FORBIDDEN_LINKS) {
	check(`forbidden Texas link absent (page content <main>): ${link}`, !mainHrefs.has(link));
}
// recommended (report only)
const recPresent = RECOMMENDED_LINKS.filter((l) => hrefs.has(l));
console.log(`INFO  recommended pattern links present: ${recPresent.length}/${RECOMMENDED_LINKS.length} (${recPresent.join(', ') || 'none'})`);

// ---- FIVE WORKED EXAMPLE SCENARIOS ----
for (const s of SCENARIO_MARKERS) {
	check(`scenario present in <main>: ${s.name}`, s.re.test(mainText));
}
// five distinct "Example N" section markers (1..5)
const exampleMarkers = [1, 2, 3, 4, 5].filter((n) =>
	new RegExp(`Example\\s*${n}\\b`, 'i').test(mainText),
);
check(
	'five distinct "Example 1..5" section markers present in <main>',
	exampleMarkers.length === 5,
	`found: ${exampleMarkers.join(',')}`,
);

// ---- DUP-CONTENT ENFORCEMENT (operator's #1 concern) ----
// This page must NOT re-host the blank template, re-teach schedule mechanics,
// or re-teach custody definitions. Sibling-owned signature phrases must be
// ABSENT from OUR <main>.
for (const { owner, phrase } of FORBIDDEN_SIGNATURE_PHRASES) {
	check(
		`dup-content: "${phrase}" (owned by ${owner}) ABSENT from <main>`,
		!new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(mainText),
	);
}

// ---- ANTI-SLOP (ban list) — <main> text only ----
const slopHits = SLOP_WORDS.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(mainText));
check('no AI-slop ban-list words in <main>', slopHits.length === 0, slopHits.length ? `hit: ${slopHits.join(', ')}` : '');

// ---- NO EM-DASH in visible <main> copy ----
// Scope to <main> text nodes (a U+2014 inside an HTML comment or the meta
// description is not visible page copy — known false-positive).
check('no em-dash (U+2014) in <main> visible copy', !mainText.includes('\u2014'), mainText.includes('\u2014') ? 'em-dash found in main text' : '');

// ---- EDUCATIONAL-ONLY DISCLAIMER ----
check(
	'educational-only / not-legal-advice disclaimer present in <main>',
	/(not legal advice|educational|illustrative|varies by state|reviewed locally|consult)/i.test(mainText),
);

// ---- HYBRID CONVERSION TWEAKS (UX Conversion Reviewer, Option 1) ----
// Additive above-the-fold cue + peak-desire teaser that jump to the mid-page tool.
// The tool STAYS mid-page (after the 5 examples); these only add in-page anchors.
// (1) Subordinate hero "Skip to the builder" text link anchored to #tool.
check(
	'hero skip-to-builder text link present + targets #tool',
	/Skip to the builder/i.test(mainText) && /<a\b[^>]*href="#tool"[^>]*>[\s\S]*?Skip to the builder/i.test(mainHtml),
);
// (2) The tool section anchor target #tool exists (the skip-link + teaser destination).
check('tool section anchor id="tool" exists in <main>', /id="tool"/.test(mainHtml));
// (3) Peak-desire teaser callout "Build it free" after the examples, targeting #tool.
check(
	'teaser callout "Build it free" present + targets #tool',
	/Build it free/i.test(mainText) && /<a\b[^>]*href="#tool"[^>]*>[\s\S]*?Build it free/i.test(mainHtml),
);
// (4) Order preserved: the last example section (#example-infant-step-up) appears
// BEFORE the tool section (#tool) in <main> — examples stay above the tool.
const lastExampleIdx = mainHtml.indexOf('id="example-infant-step-up"');
const toolIdx = mainHtml.indexOf('id="tool"');
check(
	'examples remain ABOVE the tool (last example precedes #tool in source order)',
	lastExampleIdx !== -1 && toolIdx !== -1 && lastExampleIdx < toolIdx,
	`example@${lastExampleIdx} tool@${toolIdx}`,
);

// ---- GENERATOR MODE: EMBEDDED TOOL + LIVE CALENDAR PREVIEW ----
// Operator approved (Jul 4 2026 voice note): ADD the interactive calendar tool
// (GeneratorPanel) + a live CalendarPreview sibling to this page. The generator is
// now EMBEDDED (panel markup present in <main>) AND still LINKED via CTA (>=2x).
// CRITICAL: the GeneratorPanel hydration script drives the FIRST [data-calendar-grid]
// in the document, so a CalendarPreview sibling MUST exist in the same hero for the
// hero calendar to render with colours (cal-cell-a/cal-cell-b). This replaces the
// prior "linked not embedded" assertion; every other assertion is unchanged.
// (a) CTA link still appears >=2x (hero + close) alongside the embed.
const genCount = [...html.matchAll(/href="\/custody-schedule-generator\/"/g)].length;
check('generator CTA link appears >= 2 times', genCount >= 2, `${genCount} occurrences`);
// (b) EMBED guard: the GeneratorPanel component is embedded in <main>
// (data-generator-panel is the panel root, SSR-rendered inside <main>).
check(
	'GeneratorPanel embedded in <main> (data-generator-panel present)',
	/data-generator-panel/.test(mainHtml),
);
// (c) EMBED guard: a CalendarPreview sibling exists in the tool/hero layout
// (data-calendar-preview is the CalendarPreview root; data-calendar-grid is its grid).
// The GeneratorPanel hydration script drives the FIRST [data-calendar-grid] in the
// document, so this sibling is what makes the hero calendar render with colours.
check(
	'CalendarPreview sibling present in <main> (data-calendar-preview root)',
	/data-calendar-preview/.test(mainHtml),
);
check(
	'calendar grid present in <main> (data-calendar-grid, hydration target)',
	/data-calendar-grid/.test(mainHtml),
);
// (d) EMBED guard: the coloured-cell classes cal-cell-a AND cal-cell-b are present in
// the rendered HTML (they ship inside GeneratorPanel's hoisted script, which Astro
// moves out of <main> — so assert against the WHOLE document, not mainHtml). Their
// presence proves the panel that colours Parent A / Parent B cells is on the page.
check(
	'cal-cell-a present in rendered HTML (Parent A colour class ships)',
	/cal-cell-a/.test(html),
);
check(
	'cal-cell-b present in rendered HTML (Parent B colour class ships)',
	/cal-cell-b/.test(html),
);

// ---- CTA CONTRAST GUARD ----
// The primary CTA anchor (bg-accent/btn-primary dark background) must set EXPLICIT
// white text via an inline style — not rely on inherited colour (the custodial-schedule
// inherited-near-black bug). Require at least one generator anchor with a dark bg AND
// an explicit white colour in a style attribute (#fff / #ffffff / white / rgb(255,255,255)).
const genAnchors = [...html.matchAll(/<a\b[^>]*href="\/custody-schedule-generator\/"[^>]*>/g)].map((m) => m[0]);
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

// ---- SITEMAP ----
if (fs.existsSync(SITEMAP)) {
	const sitemap = fs.readFileSync(SITEMAP, 'utf8');
	check('sitemap includes /sample-parenting-plan/', sitemap.includes('/sample-parenting-plan/'));
} else {
	check(`sitemap exists (${SITEMAP})`, false);
}

// ---- REGRESSION: prior pages still built ----
check(
	'regression: /parenting-plan-template/ still in dist',
	fs.existsSync('dist/parenting-plan-template/index.html'),
);
check(
	'regression: /legal-custody-vs-physical-custody/ still in dist',
	fs.existsSync('dist/legal-custody-vs-physical-custody/index.html'),
);
check(
	'regression: /custodial-schedule/ still in dist',
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

// ---- summary ----
console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures > 0 ? 1 : 0);
