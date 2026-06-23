import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/every-other-weekend-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: 'every-other-weekend',
	title: 'Every Other Weekend Custody Schedule',
	slug: 'every-other-weekend-custody-schedule',
	description: 'Staying connected between alternating Fri–Sun visits.',
	metaTitle: 'Every Other Weekend Custody Schedule | Staying Connected Between Visits',
	metaDescription:
		'How an every-other-weekend custody schedule works in practice — and what parents do to stay connected during the 12–13 days between Fri–Sun visits.',
	lede: 'Every-other-weekend custody is a relationship-maintenance problem disguised as a simple weekend pattern.',
	overview: ['See the full guide at /every-other-weekend-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: 'Every other weekend example',
		description: 'Alternating Fri–Sun blocks with long gaps between visits.',
	},
	faq: [],
	relatedSchedules: [
		'80-20-custody-schedule',
		'2-2-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
