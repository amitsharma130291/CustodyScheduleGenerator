import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/80-20-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '80-20',
	title: '80/20 Custody Schedule',
	slug: '80-20-custody-schedule',
	description: 'Primary-home 80/20 custody schedule guide focused on 20% parent connection.',
	metaTitle: '80/20 Custody Schedule: Examples, Overnights & Calendar',
	metaDescription:
		'See how an 80/20 custody schedule works, how many overnights it includes, common calendar examples, and ways the 20% parent can stay involved.',
	lede: '80/20 custody is about maintaining connection when one parent has limited overnights.',
	overview: ['See the full guide at /80-20-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '80/20 example',
		description: 'Primary home with recurring lower-time blocks.',
	},
	faq: [],
	relatedSchedules: [
		'70-30-custody-schedule',
		'60-40-custody-schedule',
		'50-50-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
