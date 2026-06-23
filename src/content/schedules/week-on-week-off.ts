import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/week-on-week-off-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: 'week-on-week-off',
	title: 'Week-On Week-Off Custody Schedule',
	slug: 'week-on-week-off-custody-schedule',
	description: 'The lowest-maintenance 50/50 schedule — one exchange per week.',
	metaTitle: 'Week-On Week-Off Custody Schedule | Fewer Exchanges at 50/50',
	metaDescription:
		'How a week-on week-off custody schedule keeps 50/50 parenting time with one exchange per week and no midweek handoffs.',
	lede: 'Week-on/week-off custody is the 50/50 schedule built around fewer exchanges.',
	overview: ['See the full guide at /week-on-week-off-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: 'Week-on/week-off example',
		description: 'Seven consecutive days with each parent, one exchange per week.',
	},
	faq: [],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
