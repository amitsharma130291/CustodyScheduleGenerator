import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const publisherId = 'pub-6726234905496938';
const clientId = `ca-${publisherId}`;
const distDir = 'dist';
const failures = [];

function check(condition, message) {
	if (!condition) failures.push(message);
}

function read(relativePath) {
	const path = join(distDir, relativePath);
	check(existsSync(path), `Missing build artifact: ${path}`);
	return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

const adsTxt = read('ads.txt').trim();
check(
	adsTxt === `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`,
	'ads.txt does not contain the expected direct Google seller record',
);

const homepage = read('index.html');
check(homepage.includes(clientId), 'Homepage is missing the AdSense verification client ID');

const builtPages = [
	'404.html',
	'500.html',
	'blog/index.html',
	'child-support-calculator/index.html',
	'disclaimer/index.html',
	'free-ourfamilywizard-alternative/index.html',
	'holiday-custody-planner/index.html',
	'my-custody-calendar/index.html',
	'parenting-time-calculator/index.html',
	'privacy/index.html',
	'reactivate-license/index.html',
	'schedule-comparison-tool/index.html',
	'terms/index.html',
	'two-home-offer/index.html',
];

for (const page of builtPages) {
	const html = read(page);
	check(/<meta name="robots" content="[^"]*noindex/i.test(html), `${page} should be noindex`);
	check(!html.includes(clientId), `${page} should not load the AdSense script`);
}

const checkoutPage = read('two-home-checklist/index.html');
check(!checkoutPage.includes(clientId), 'two-home-checklist checkout page should not load the AdSense script');

const privacyPage = read('privacy/index.html');
check(
	privacyPage.includes('https://policies.google.com/technologies/partner-sites'),
	'Privacy policy is missing Google partner-site disclosure',
);

if (failures.length) {
	console.error('AdSense readiness audit failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log('AdSense readiness audit passed.');
