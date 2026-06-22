import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/5-2-2-5-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '5225',
	title: '5-2-2-5 Custody Schedule',
	slug: '5-2-2-5-custody-schedule',
	description: 'Same school-week ownership and rotating Mon–Fri blocks in a 50/50 rotation.',
	metaTitle: '5-2-2-5 Custody Schedule | School Week Ownership in a 50/50 Plan',
	metaDescription:
		'How a 5-2-2-5 custody schedule gives each parent full school-week ownership in a 50/50 plan — homework continuity and teacher communication per block.',
	lede: '5-2-2-5 custody is the 50/50 schedule built around school-week ownership.',
	overview: ['See the full guide at /5-2-2-5-custody-schedule/.'],
	pros: [],
	cons: [],
	example: {
		title: '5-2-2-5 example',
		description: 'Five-day block, two-day block, two-day block, five-day block.',
	},
	faq: [],
	relatedSchedules: ['2-2-5-5-custody-schedule', '2-2-3-custody-schedule', '50-50-custody-schedule'],
	relatedTools: [],
};

export default schedule;
