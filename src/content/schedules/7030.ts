import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/70-30-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '70-30',
	title: '70/30 Custody Schedule',
	slug: '70-30-custody-schedule',
	description: 'Primary-home 70/30 custody schedule guide focused on meaningful 30% parent involvement.',
	metaTitle: '70/30 Custody Schedule: Primary Home & Meaningful 30% Time',
	metaDescription:
		'How a 70/30 custody schedule works when one parent anchors school-week life and the other stays involved in ordinary routines — not only weekends and holidays.',
	lede: '70/30 custody is about one primary everyday home and a 30% parent who stays in school life.',
	overview: ['See the full guide at /70-30-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '70/30 example',
		description: 'Primary school-week home with recurring weekend blocks for Parent B.',
	},
	faq: [],
	relatedSchedules: [
		'60-40-custody-schedule',
		'80-20-custody-schedule',
		'50-50-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
