import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/2-2-5-5-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '2255',
	title: '2-2-5-5 Custody Schedule',
	slug: '2-2-5-5-custody-schedule',
	description: 'Fixed weekday 50/50 custody schedule guide.',
	metaTitle: '2-2-5-5 Custody Schedule | Fixed Weekday Guide',
	metaDescription: 'A 2-2-5-5 custody schedule keeps the same weekdays with each parent every week.',
	lede: '2-2-5-5 custody is the predictable weekday schedule.',
	overview: ['See the full guide at /2-2-5-5-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '2-2-5-5 example',
		description: 'Fixed Mon–Tue and Wed–Thu with alternating five-day blocks.',
	},
	faq: [],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'5-2-2-5-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
