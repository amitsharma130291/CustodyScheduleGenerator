import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/2-2-5-5-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '2255',
	title: '2-2-5-5 Custody Schedule',
	slug: '2-2-5-5-custody-schedule',
	description: 'Permanently fixed weekdays in a 50/50 rotation.',
	metaTitle: '2-2-5-5 Custody Schedule | Fixed Weekdays in a 50/50 Plan',
	metaDescription:
		'How a 2-2-5-5 custody schedule keeps the same weekdays with each parent every week while splitting time 50/50.',
	lede: '2-2-5-5 custody is the 50/50 schedule built around fixed weekday responsibility.',
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
