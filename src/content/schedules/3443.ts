import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/3-4-4-3-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '3443',
	title: '3-4-4-3 Custody Schedule',
	slug: '3-4-4-3-custody-schedule',
	description: '50/50 custody with rotating weekend blocks — no permanently assigned weekdays.',
	metaTitle: '3-4-4-3 Custody Schedule | Balanced Weekend Rotation in a 50/50 Plan',
	metaDescription:
		'How a 3-4-4-3 custody schedule balances weekends across both parents while maintaining 50/50 parenting time. See examples, exchanges, and generate a printable calendar.',
	lede: '3-4-4-3 custody rotates three- and four-day blocks so weekends spread without fixed weekday ownership.',
	overview: ['See the full guide at /3-4-4-3-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '3-4-4-3 example',
		description: 'Alternating three-day and four-day blocks across a two-week cycle.',
	},
	faq: [],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
