import type { ScheduleContent } from './types';

/** Minimal registry entry — full hub page lives in src/pages/50-50-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '50-50',
	title: '50/50 Custody Schedule',
	slug: '50-50-custody-schedule',
	description: 'Equal parenting time hub — choose among 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off.',
	metaTitle: '50/50 Custody Schedule | Choose the Right Equal-Time Pattern',
	metaDescription:
		'Pick the best 50/50 custody schedule for your family. Compare equal-time patterns and build a printable calendar.',
	lede: '50/50 custody hub — route to the right equal-time pattern.',
	overview: ['See the full hub at /50-50-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '50/50 example',
		description: 'Equal overnights — pattern choice depends on age, distance, and exchange load.',
	},
	faq: [],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
