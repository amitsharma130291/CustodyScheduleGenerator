import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/2-2-3-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '223',
	title: '2-2-3 Custody Schedule',
	slug: '2-2-3-custody-schedule',
	description: 'Frequent-contact 50/50 rotation for younger children — shortest gaps among common equal-time patterns.',
	metaTitle: '2-2-3 Custody Schedule | Frequent Contact for Younger Children',
	metaDescription:
		'How a 2-2-3 custody schedule works when a young child needs frequent contact with both parents — three-day max separation, with a free calendar generator.',
	lede: '2-2-3 custody keeps the longest stretch away from either parent to three days.',
	overview: ['See the full guide at /2-2-3-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '2-2-3 example',
		description: 'Two nights, two nights, three-night weekend — pattern flips each week.',
	},
	faq: [],
	relatedSchedules: [
		'50-50-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'week-on-week-off-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
