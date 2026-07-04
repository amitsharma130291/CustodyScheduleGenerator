import fs from 'node:fs';

/**
 * Acceptance gate for the new COMMERCIAL COMPARISON page /best-co-parenting-app/.
 * Reads the BUILT output (run `npm run build` first) and asserts every
 * machine-checkable PASS/FAIL criterion from best-coparenting-app-test-cases.md.
 *
 * Run:  node scripts/validate-best-coparenting-app.mjs
 * Exit: 0 = all pass, 1 = one or more failures (details printed).
 *
 * Follows the repo convention of dist-HTML validators
 * (scripts/validate-noindex.mjs, validate-7030.mjs, validate-custodial-schedule.mjs,
 * validate-legal-vs-physical.mjs, validate-sample-parenting-plan.mjs). NOT a vitest
 * test on purpose: the vitest suite is lib-level (133 tests) and must pass WITHOUT a
 * prior build; a dist-reading unit test would break that baseline.
 *
 * PAGE TYPE: COMMERCIAL COMPARISON of REAL products (highest-risk page on the site).
 *   Extra rigour vs the education pages on ACCURACY and HONEST POSITIONING:
 *   - Every feature/price claim is a factual liability -> the gate asserts the two
 *     accuracy traps most listicles get wrong (TalkingParents lost its free plan
 *     Mar 30 2026; coparently.com is a parked/defunct domain) and a visible
 *     pricing-freshness caveat so the data does not silently rot.
 *   - CustodyBuilder is itself a tool in this space (a FREE schedule builder, NOT a
 *     full co-parenting app). The page must be an HONEST use-case comparison, not a
 *     "we win" advertorial. The gate asserts the honest-positioning framing is
 *     present AND that NO fake aggregateRating / Review star schema is emitted.
 *   Source of truth for every claim: best-coparenting-app-research.md (Task A).
 *
 * GENERATOR MODE: LINKED, not embedded (this is a comparison/education page, not a
 *   schedule-builder page). CTA to /custody-schedule-generator/ appears >=2x. No
 *   GeneratorPanel/calendar grid is required in <main>.
 */

const PAGE = 'dist/best-co-parenting-app/index.html';
const SITEMAP = 'dist/sitemap-0.xml';
const CANONICAL = 'https://custodybuilder.com/best-co-parenting-app/';

// Baseline dist index.html count BEFORE this page (confirmed this session, Jul 4 2026:
// `npm run build` => "51 page(s) built", 0 warnings; find dist -name index.html => 49).
// Adding /best-co-parenting-app/ must bring it to exactly 50 (and build to 52 pages).
const BASELINE_INDEX_HTML = 49;
const EXPECTED_INDEX_HTML = BASELINE_INDEX_HTML + 1; // 50

// Research §6 title tag — primary + approved alternate. Either is acceptable; both are
// <=60 chars. The page must render exactly one of them.
const ACCEPTED_TITLES = [
	'Best Co-Parenting App 2026: Honest, Use-Case Picks', // 50 chars (primary)
	'The Best Co-Parenting App for Your Situation (2026)', // 51 chars (approved alt)
];

// Research §6 exact meta description (150 chars). Reported as an exact-match INFO; the
// hard gate only requires <=160 + keyword presence so a minor builder reword does not
// false-fail. NOTE: the research meta value itself contains an em dash — the builder
// SHOULD replace it with a colon/comma per house style; the em-dash ban is enforced in
// <main> visible copy, and the meta lives in <head>, so it is not gated for em-dash here.
const APPROVED_META =
	"We compared the top co-parenting apps on features, court records, and real 2026 pricing — then matched each to who it's actually best for.";

// HARD-REQUIRED internal links = research §6 "Internal links — FINAL SET" (all six
// verified to exist in src/pages/). /custody-schedule-generator/ is the primary CTA
// (also gated >=2x below). The brief calls out /custody-schedule-generator/ +
// /sample-parenting-plan/ explicitly; both are in this set.
const REQUIRED_LINKS = [
	'/custody-schedule-generator/',        // primary CTA (build your schedule free)
	'/custodial-schedule/',                // schedule types hub
	'/sample-parenting-plan/',             // example plans (parenting-plan use-case)
	'/legal-custody-vs-physical-custody/', // definitions for readers new to custody terms
	'/custody-percentage-calculator/',     // parenting-time % (pairs with Custody X Change)
	'/holiday-custody-schedule/',          // holiday scheduling (expense/scheduling use-cases)
];

// Geo-neutral page (research §6 boundary) — these Texas links must NOT appear in PAGE
// CONTENT (<main>). NOTE: two of them (/texas-parenting-plan-template/,
// /texas-child-support-calculator/) are legit global-nav links rendered by the shared
// Footer.astro on ALL pages; stripping them would alter every other page (forbidden).
// So the geo-neutral intent is checked against <main> (page body), NOT the whole
// document. (Confirmed recurring false-negative — see NOTES.)
const FORBIDDEN_LINKS = [
	'/texas-standard-possession-order/',
	'/texas-parenting-plan-template/',
	'/texas-child-support-calculator/',
];

// Anti-slop ban list (research §8 house style) — scoped to <main> TEXT NODES only.
const SLOP_WORDS = [
	'delve', 'robust', 'leverage', 'landscape', 'showcase', 'underscore',
	'pivotal', 'synergy', 'holistic', 'foster a', 'in the realm of',
	'navigating the', 'testament to', 'unlock the', 'game changer',
	'paradigm shift', 'granular',
];

// COMPARISON COMPLETENESS (research §2 verified app table). The comparison must name
// the core paid apps AND at least one free option. These app-name markers must appear
// in <main>.
const CORE_APPS = [
	{ name: 'OurFamilyWizard', re: /OurFamilyWizard/i },
	{ name: 'TalkingParents', re: /TalkingParents/i },
	{ name: 'Custody X Change', re: /Custody\s*X\s*Change/i },
];
const FREE_OPTIONS = [
	{ name: 'Google Calendar', re: /Google Calendar/i },
	{ name: 'Fayr', re: /\bFayr\b/i },
	{ name: 'Cozi', re: /\bCozi\b/i },
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

// ---- entity decode ----
const decodeEntities = (s) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");

// ---- TITLE ----
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = decodeEntities(titleMatch?.[1]?.trim() ?? '');
check('exactly one <title>', (html.match(/<title>/g) || []).length === 1);
check('title is a research-approved value', ACCEPTED_TITLES.includes(title), `got "${title}"`);
check('title <= 60 chars', title.length > 0 && title.length <= 60, `${title.length} chars`);
check('title mentions "co-parenting app"', /co-?parenting app/i.test(title), `got "${title}"`);

// ---- META DESCRIPTION ----
const descMatch = head.match(/<meta name="description" content="([^"]*)"/);
const desc = decodeEntities(descMatch?.[1] ?? '');
check('meta description present', desc.length > 0);
check('meta description <= 160 chars', desc.length > 0 && desc.length <= 160, `${desc.length} chars`);
check('meta description mentions "co-parenting app"', /co-?parenting app/i.test(desc));
console.log(
	`INFO  meta description exact-match to research value: ${desc === APPROVED_META ? 'yes' : 'no (reworded — allowed if <=160 + keyword; prefer NO em dash)'}`,
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
console.log(`INFO  JSON-LD types present: ${[...ldTypes].join(', ') || 'none'}`);

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

// ---- HONEST SCHEMA: NO fake aggregateRating / Review star ratings ----
// A product-comparison page inventing star ratings is a Google product-review /
// structured-data violation AND dishonest (research §1, §5). If an ItemList is used it
// must be valid (covered by the parse-all check above), but NO rating/review schema may
// be emitted anywhere in the document.
check(
	'NO aggregateRating in structured data (honest schema)',
	!/aggregateRating/i.test(html),
	/aggregateRating/i.test(html) ? 'aggregateRating found in document' : '',
);
check(
	'NO ratingValue in structured data (honest schema)',
	!/ratingValue/i.test(html),
	/ratingValue/i.test(html) ? 'ratingValue found in document' : '',
);
check(
	'NO Review-type star schema (honest schema)',
	!/"@type"\s*:\s*"Review"/i.test(html),
	/"@type"\s*:\s*"Review"/i.test(html) ? '"@type":"Review" found in document' : '',
);
if (ldTypes.has('ItemList')) {
	console.log('INFO  ItemList schema present — allowed (parses valid, no ratings emitted).');
}

// ---- E-E-A-T: visible reviewer byline + last-updated date in <main> ----
check(
	'visible reviewer byline present in <main> (Reviewed by … CustodyBuilder Editorial Team)',
	/Reviewed by/i.test(mainText) && /CustodyBuilder Editorial Team/i.test(mainText),
);
check('visible last-updated date present in <main>', /Last updated/i.test(mainText));

// ---- HEADINGS ----
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
const h2Count = (html.match(/<h2[\s>]/g) || []).length;
check('exactly one <h1>', h1Count === 1, `${h1Count} found`);
check('at least 4 <h2> (glance/reviews/by-situation/CustodyBuilder-fit/FAQ)', h2Count >= 4, `${h2Count} found`);

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

// ---- COMPARISON COMPLETENESS ----
for (const app of CORE_APPS) {
	check(`comparison names core app: ${app.name}`, app.re.test(mainText));
}
const freePresent = FREE_OPTIONS.filter((a) => a.re.test(mainText));
check(
	'comparison names >= 1 free option (Google Calendar / Fayr / Cozi)',
	freePresent.length >= 1,
	`found: ${freePresent.map((a) => a.name).join(', ') || 'none'}`,
);

// ---- ACCURACY GUARDS (the two traps most listicles get wrong — research §1) ----
// (1) TalkingParents removed its free plan Mar 30 2026 — the page must NOT claim it has
//     a free plan/tier/version. (A generic "free trial" mention is fine and not matched.)
check(
	'accuracy: does NOT claim TalkingParents has a free plan/tier (removed Mar 30 2026)',
	!/TalkingParents[^.]{0,80}\bfree\s+(plan|tier|version|forever|option)\b/i.test(mainText) &&
		!/\bfree\s+(plan|tier|version)\b[^.]{0,40}TalkingParents/i.test(mainText),
	'found a "TalkingParents … free plan/tier" style claim',
);
// (2) coparently.com is parked / product appears shut down — must NOT be recommended as
//     a live option. If "Coparently" is mentioned at all, it must co-occur with a
//     discontinued/parked/shut-down marker.
const coparentlyMentioned = /Coparently/i.test(mainText);
const coparentlyFlagged = /Coparently[\s\S]{0,160}(discontinu|shut\s*down|parked|defunct|no longer|closed)/i.test(mainText) ||
	/(discontinu|shut\s*down|parked|defunct|no longer|closed)[\s\S]{0,160}Coparently/i.test(mainText);
check(
	'accuracy: Coparently NOT presented as a live option (omitted, or flagged discontinued)',
	!coparentlyMentioned || coparentlyFlagged,
	coparentlyMentioned ? 'Coparently mentioned without a discontinued/parked marker' : '',
);

// ---- PRICING FRESHNESS CAVEAT (so data does not silently rot) ----
// Research §2/§9: a visible "pricing checked/verify July 2026" caveat near the table.
check(
	'pricing freshness caveat present in <main> ("as of" / "verify" / "checked" + 2026)',
	(/\bverif/i.test(mainText) || /\bas of\b/i.test(mainText) || /\bchecked\b/i.test(mainText) || /last checked/i.test(mainText)) &&
		/2026/.test(mainText),
	'expected a dated pricing caveat (e.g. "pricing checked July 2026 — verify on each app\'s site")',
);

// ---- DEFENSIVE SAFEGUARDS (additive, Jul 2026) — required protective framing on a
// commercial comparison of real products. All three must be present in <main>. ----
// (a) EDITORIAL-OPINION DISCLOSURE: comparisons are the author's opinion, from publicly
//     available info, for informational purposes, verify with each provider.
check(
	'safeguard: editorial-opinion disclosure present in <main> (opinion + publicly available + informational)',
	/editorial opinion/i.test(mainText) &&
		/publicly available/i.test(mainText) &&
		/(informational|general information)/i.test(mainText),
	'expected an "author\'s editorial opinion, based on publicly available information, for informational purposes" disclosure',
);
// (b) TRADEMARK NOTICE: product names/brands are property of their owners; naming is for
//     identification/comparison only; no affiliation/endorsement implied.
check(
	'safeguard: trademark notice present in <main> (property of respective owners + identification/comparison + no affiliation/endorsement)',
	/property of (their|its) respective owners/i.test(mainText) &&
		/(identification|comparison)/i.test(mainText) &&
		/(affiliation|endorsement)/i.test(mainText),
	'expected a "product names/brands are property of their respective owners … identification and comparison only … no affiliation or endorsement" notice',
);
// (c) PRICING CAVEAT reinforced: "as of July 2026" + "subject to change" + verify/check
//     the provider's site — an unambiguous, dated pricing caveat near the table.
check(
	'safeguard: reinforced pricing caveat present in <main> ("as of" + "subject to change" + verify/check provider)',
	/as of july 2026/i.test(mainText) &&
		/subject to change/i.test(mainText) &&
		/(check the provider|verify|each app.{0,5}s (own )?site|provider.{0,5}s (own )?site)/i.test(mainText),
	'expected a dated "as of July 2026, subject to change, check the provider\'s site" pricing caveat',
);

// ---- HONEST POSITIONING OF CUSTODYBUILDER (mandatory — research §5) ----
// The page must position CustodyBuilder honestly: a FREE schedule builder, NOT a full
// co-parenting app; and openly concede the paid apps do more. Deceptive "we're the best"
// advertorial framing is a go/no-go FAIL (asserted here at the machine-checkable level;
// the manual checklist covers tone).
check(
	'CustodyBuilder is mentioned in <main>',
	/CustodyBuilder/i.test(mainText),
);
check(
	'honest positioning: CustodyBuilder framed as a FREE schedule/plan builder',
	/CustodyBuilder[\s\S]{0,200}\bfree\b[\s\S]{0,120}(schedule|parenting[- ]plan|builder|calendar)/i.test(mainText) ||
		/\bfree\b[\s\S]{0,80}(schedule|calendar)[\s\S]{0,120}CustodyBuilder/i.test(mainText),
	'expected copy framing CustodyBuilder as a free schedule/plan builder',
);
check(
	'honest positioning: concedes paid apps do more / CustodyBuilder is not a full app',
	/(not a (full )?(co-?parenting )?app|isn.t a full|doesn.t (offer|have|include|do)|serve you better|paid apps (above )?(will|do|offer)|no (tone|messaging|expense|court)|start there)/i.test(mainText),
	'expected an honest concession that the paid apps do more than CustodyBuilder',
);
console.log(
	`INFO  honest hand-off line present (research §5 verbatim-style): ${/if you (also )?need[\s\S]{0,120}(tone|messaging|expense|court)/i.test(mainText) ? 'yes' : 'no (recommended)'}`,
);

// ---- USE-CASE / "BEST BY SITUATION" SECTION (research §3 core value) ----
check(
	'use-case / "best by situation" framing present in <main>',
	/(by situation|high[- ]conflict|use[- ]case|for your situation|depends on)/i.test(mainText),
);

// ---- PURELY-POSITIVE REFRAME (Jul 4 2026 operator decision — eliminate the defamation
// vector). The per-app reviews were reframed so NO app is criticised: every weakness /
// con / downside / drawback was removed, and each app now carries a research-backed
// "Best for [use-case]" label instead of a mixed strength+weakness writeup. Two new
// guard groups below; they must stay green and must NOT be weakened. ----

// (1) "Best for" LABEL per app — each of the 8 compared apps must render a truthful
//     "Best for [use-case]" label (research §2/§3 backed). The exact labels below trace
//     to VERIFIED strengths in best-coparenting-app-research.md; do not invent a use case.
const EXPECTED_BEST_FOR = [
	'Best for high-conflict co-parenting and court-admissible records', // OurFamilyWizard
	'Best for documented, court-ready communication',                   // TalkingParents
	'Best for an all-in-one app at one low flat price',                 // AppClose
	'Best for detailed schedules and court-ready documentation',        // Custody X Change
	'Best for shared calendars and expense splitting',                  // 2houses
	'Best for a free start with check-in and location features',        // Fayr
	'Best for busy family logistics',                                    // Cozi
	'Best for a simple free shared calendar',                            // Google Calendar
];
for (const label of EXPECTED_BEST_FOR) {
	check(`"Best for" label present in <main>: "${label}"`, mainText.includes(label));
}
const bestForCount = [...mainText.matchAll(/\bBest for\b/gi)].length;
check(
	'each compared app carries a "Best for" label (>= 8 "Best for" labels in <main>)',
	bestForCount >= 8,
	`${bestForCount} "Best for" occurrences`,
);

// (2) NEGATIVE-SCAN — after the reframe, NO weakness/con/downside/drawback section or
//     label may remain anywhere in <main> (the whole defamation surface is the per-app
//     criticism). grep must be ZERO. Note: bare "con" is a substring of conflict/consult/
//     concede etc., so the scan targets the criticism LABELS/headers, not those words.
const NEGATIVE_MARKERS = [
	{ name: 'weakness', re: /weakness/i },
	{ name: 'downside', re: /downside/i },
	{ name: 'drawback', re: /drawback/i },
	{ name: 'falls short / fall short', re: /falls?\s+short/i },
	{ name: 'Cons: / Cons label', re: /\bcons\b\s*:/i },
];
for (const marker of NEGATIVE_MARKERS) {
	const hit = marker.re.test(mainText);
	check(`negative-scan: NO "${marker.name}" in <main> (grep = 0)`, !hit, hit ? 'found a criticism marker' : '');
}
// The per-app cards now label the positive block "Strengths:" and carry NO "Weakness:"
// counterpart. Assert the strengths label is present and the weakness label is gone.
check('per-app reviews show a "Strength"/"Strengths" label in <main>', /Strengths?:/i.test(mainText));
check(
	'per-app reviews show NO "Weakness" label in <main> (removed)',
	!/Weakness:?/i.test(mainText),
	/Weakness:?/i.test(mainText) ? 'a "Weakness" label still renders' : '',
);

// (3) SAFEGUARDS STILL PRESENT after the reframe — re-affirm the three protective
//     framings survived the edit (each is also asserted in full above; these are the
//     post-reframe smoke checks the operator asked for explicitly).
check('post-reframe safeguard: editorial-opinion disclosure still in <main>', /editorial opinion/i.test(mainText));
check('post-reframe safeguard: trademark notice still in <main>', /property of (their|its) respective owners/i.test(mainText));
check('post-reframe safeguard: pricing caveat still in <main>', /as of july 2026/i.test(mainText) && /subject to change/i.test(mainText));

// ---- GENERATOR CTA (LINKED, >=2x) + CONTRAST GUARD ----
const genCount = [...html.matchAll(/href="\/custody-schedule-generator\/"/g)].length;
check('generator CTA link appears >= 2 times', genCount >= 2, `${genCount} occurrences`);
// The primary CTA anchor (bg-accent/btn-primary dark background) must set EXPLICIT white
// text via an inline style — not rely on inherited colour (the custodial-schedule
// inherited-near-black bug). Require at least one generator anchor with a dark bg AND an
// explicit white colour in a style attribute (#fff / #ffffff / white / rgb(255,255,255)).
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

// ---- ANTI-SLOP (ban list) — <main> text only ----
const slopHits = SLOP_WORDS.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(mainText));
check('no AI-slop ban-list words in <main>', slopHits.length === 0, slopHits.length ? `hit: ${slopHits.join(', ')}` : '');

// ---- NO EM-DASH in visible <main> copy ----
// Scope to <main> text nodes (a U+2014 inside an HTML comment or the meta description is
// not visible page copy — known false-positive).
check('no em-dash (U+2014) in <main> visible copy', !mainText.includes('\u2014'), mainText.includes('\u2014') ? 'em-dash found in main text' : '');

// ---- EDUCATIONAL / DISCLAIMER FRAMING (no legal advice) ----
check(
	'educational-only / not-legal-advice disclaimer present in <main>',
	/(not legal advice|educational|informational|consult|varies by state|does not constitute)/i.test(mainText),
);

// ---- SITEMAP ----
if (fs.existsSync(SITEMAP)) {
	const sitemap = fs.readFileSync(SITEMAP, 'utf8');
	check('sitemap includes /best-co-parenting-app/', sitemap.includes('/best-co-parenting-app/'));
} else {
	check(`sitemap exists (${SITEMAP})`, false);
}

// ---- REGRESSION: prior pages still built ----
check(
	'regression: /sample-parenting-plan/ still in dist',
	fs.existsSync('dist/sample-parenting-plan/index.html'),
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
console.log(
	'\nNOTE: run `npm run build` immediately before this script and confirm the build log prints\n' +
	'"52 page(s) built" with 0 warnings, and `npx vitest run` reports >=133 passing. Those two are\n' +
	'gate criteria the script cannot read from stdout (it only sees dist/). The dist index.html\n' +
	'count (== 50) above is the built-page invariant proxy.',
);
process.exit(failures > 0 ? 1 : 0);
