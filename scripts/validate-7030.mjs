import fs from 'node:fs';

const html = fs.readFileSync('dist/70-30-custody-schedule/index.html', 'utf8');
const text = html
	.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
	.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
	.replace(/<[^>]+>/g, ' ')
	.replace(/\s+/g, ' ')
	.trim();
const words = text.split(' ').filter(Boolean).length;
const robots = html.match(/name="robots" content="([^"]+)"/);
const canonical = html.match(/rel="canonical" href="([^"]+)"/);
const faqCount = (html.match(/<details/gi) || []).length;
console.log('words:', words);
console.log('robots:', robots?.[1]);
console.log('canonical:', canonical?.[1]);
console.log('faq details:', faqCount);
console.log('schedules mirror exists:', fs.existsSync('dist/schedules/70-30-custody-schedule/index.html'));
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
console.log('in sitemap:', sitemap.includes('70-30-custody-schedule'));
