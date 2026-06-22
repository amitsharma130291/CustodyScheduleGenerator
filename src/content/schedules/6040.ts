import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/60-40-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '60-40',
	title: '60/40 Custody Schedule',
	slug: '60-40-custody-schedule',
	description: 'Near-equal 60/40 custody schedule guide focused on fewer exchanges and two real homes.',
	metaTitle: '60/40 Custody Schedule | Calendar, Overnights & Generator',
	metaDescription:
		'Build a 60/40 custody calendar online. One parent has roughly 219 overnights and the other about 146 — two real homes, fewer exchanges than 50/50.',
	lede: '60/40 custody is about near-equal parenting with fewer transitions than 50/50.',
	overview: ['See the full guide at /60-40-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '60/40 example',
		description: 'Four-night and three-night weekly blocks with two functioning homes.',
	},
	faq: [],
	relatedSchedules: [
		'50-50-custody-schedule',
		'70-30-custody-schedule',
		'80-20-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
