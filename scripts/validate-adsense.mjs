import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const publisherId = 'pub-6726234905496938';
const clientId = `ca-${publisherId}`;
const origin = 'https://custodybuilder.com';
const distDir = 'dist';
const failures = [];

const adSenseEligiblePaths = new Set([
	'/',
	'/2-2-3-custody-schedule/',
	'/2-2-5-5-custody-schedule/',
	'/3-4-4-3-custody-schedule/',
	'/5-2-2-5-custody-schedule/',
	'/custody-percentage-calculator/',
	'/custody-schedule-by-age/',
	'/custody-schedule-generator/',
	'/every-other-weekend-custody-schedule/',
	'/holiday-custody-schedule/',
	'/sample-parenting-plan/',
	'/visitation-calculator/',
	'/week-on-week-off-custody-schedule/',
]);

function check(condition, message) {
	if (!condition) failures.push(message);
}

function read(relativePath) {
	const path = join(distDir, relativePath);
	check(existsSync(path), `Missing build artifact: ${path}`);
	return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function walkHtml(dir) {
	const files = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkHtml(path));
		else if (entry.name.endsWith('.html')) files.push(path);
	}
	return files;
}

function routeFor(file) {
	const rel = relative(distDir, file).split(sep).join('/');
	if (rel === 'index.html') return '/';
	if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
	return `/${rel}`;
}

function wordCount(html) {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-z0-9#]+;/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text ? text.split(' ').length : 0;
}

function meta(html, name) {
	return html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`, 'i'))?.[1] ?? '';
}

function htmlValue(html, pattern) {
	return html.match(pattern)?.[1]?.trim() ?? '';
}

const adsTxt = read('ads.txt').trim();
check(
	adsTxt === `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`,
	'ads.txt does not contain the expected direct Google seller record',
);

const robotsTxt = read('robots.txt');
check(robotsTxt.includes('User-agent: *') && robotsTxt.includes('Allow: /'), 'robots.txt must allow crawling');
check(robotsTxt.includes(`${origin}/sitemap-index.xml`), 'robots.txt must advertise the sitemap index');

const sitemapIndex = read('sitemap-index.xml');
const sitemapNames = [...sitemapIndex.matchAll(/<loc>[^<]*\/([^/]+\.xml)<\/loc>/g)].map((match) => match[1]);
check(sitemapNames.length > 0, 'Sitemap index does not reference a child sitemap');
const sitemapXml = sitemapNames.map((name) => read(name)).join('\n');
const sitemapRoutes = new Set(
	[...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
		const pathname = new URL(match[1]).pathname;
		return pathname.endsWith('/') ? pathname : `${pathname}/`;
	}),
);

const pages = walkHtml(distDir).map((file) => {
	const html = readFileSync(file, 'utf8');
	return {
		html,
		route: routeFor(file),
		robots: meta(html, 'robots').toLowerCase(),
		words: wordCount(html),
		hasAdSense: html.includes(clientId),
	};
});

for (const page of pages) {
	const isErrorPage = page.route === '/404.html' || page.route === '/500.html';
	const isNoIndex = page.robots.includes('noindex');
	const shouldHaveAdSense = adSenseEligiblePaths.has(page.route);

	check(
		page.hasAdSense === shouldHaveAdSense,
		`${page.route} AdSense state is ${page.hasAdSense ? 'on' : 'off'}; expected ${shouldHaveAdSense ? 'on' : 'off'}`,
	);

	if (isNoIndex && !isErrorPage) {
		check(!sitemapRoutes.has(page.route), `${page.route} is noindex but still appears in the sitemap`);
	}

	if (shouldHaveAdSense) {
		const title = htmlValue(page.html, /<title>([^<]+)<\/title>/i);
		const description = meta(page.html, 'description');
		const canonical = htmlValue(page.html, /<link rel="canonical" href="([^"]+)"/i);
		const h1Count = (page.html.match(/<h1\b/gi) ?? []).length;
		check(!isNoIndex, `${page.route} is monetized but noindex`);
		check(page.words >= 1200, `${page.route} has only ${page.words} rendered words; minimum is 1200`);
		check(title.length >= 20, `${page.route} has a missing or weak title`);
		check(description.length >= 80, `${page.route} has a missing or weak meta description`);
		check(canonical === `${origin}${page.route}`, `${page.route} has an unexpected canonical: ${canonical}`);
		check(h1Count === 1, `${page.route} must have exactly one H1; found ${h1Count}`);
		for (const trustPath of ['/about/', '/contact/', '/disclaimer/', '/privacy/']) {
			check(page.html.includes(`href="${trustPath}"`), `${page.route} does not link to ${trustPath}`);
		}
	}
}

for (const route of adSenseEligiblePaths) {
	check(pages.some((page) => page.route === route), `Missing monetized page: ${route}`);
}

const monetizedCanonicals = pages
	.filter((page) => page.hasAdSense)
	.map((page) => htmlValue(page.html, /<link rel="canonical" href="([^"]+)"/i));
check(new Set(monetizedCanonicals).size === monetizedCanonicals.length, 'Monetized pages contain duplicate canonicals');

const privacyPage = read('privacy/index.html');
check(
	privacyPage.includes('https://policies.google.com/technologies/partner-sites'),
	'Privacy policy is missing Google partner-site disclosure',
);
check(privacyPage.includes('Google AdSense'), 'Privacy policy does not disclose Google AdSense');

const aboutPage = read('about/index.html');
check(aboutPage.includes('Amit Sharma'), 'About page is missing the named publisher');
check(aboutPage.includes('github.com/amitsharma130291/CustodyScheduleGenerator'), 'About page is missing public source history');
check(aboutPage.includes('does not claim attorney review'), 'About page is missing the professional-review boundary');

const score = failures.length === 0 ? 100 : Math.max(0, 100 - failures.length * 5);
if (failures.length) {
	console.error(`AdSense readiness audit: ${score}/100`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(`AdSense readiness audit: ${score}/100`);
console.log(`Validated ${pages.length} built pages; AdSense is limited to ${adSenseEligiblePaths.size} high-value pages.`);
