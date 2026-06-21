import type { ScheduleContent } from './types';

/** Minimal registry entry — full page content lives in src/pages/5-2-2-5-custody-schedule.astro */
const schedule: ScheduleContent = {
	id: '5225',
	title: '5-2-2-5 Custody Schedule',
	slug: '5-2-2-5-custody-schedule',
	description: 'School-week block 50/50 custody schedule guide.',
	metaTitle: '5-2-2-5 Custody Schedule | School-Week Block Guide',
	metaDescription: 'How a 5-2-2-5 custody schedule assigns a full school-week block to one parent.',
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
