import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '3-4-4-3',
	title: '3-4-4-3 Custody Schedule',
	slug: '3-4-4-3-custody-schedule',
	description: 'Create a 3-4-4-3 custody schedule and see how three- and four-day blocks appear on a calendar.',
	metaTitle: '3-4-4-3 Custody Schedule Generator',
	metaDescription: 'Preview a 3-4-4-3 custody schedule with calendar examples, pros and cons, FAQs, and printable output.',
	lede: 'A 3-4-4-3 custody schedule alternates three- and four-day blocks so parenting time balances across a two-week cycle.',
	overview: [
		'The 3-4-4-3 schedule can be a useful 50/50 option for families who want slightly longer blocks than 2-2-3 without moving to a full week-on week-off pattern.',
		'Because the blocks are consistent and repeat over two weeks, the schedule becomes much easier to understand when shown as a calendar.',
	],
	pros: [
		'Balanced parenting time over two weeks.',
		'Less frequent exchanges than a 2-2-3 schedule.',
		'Predictable blocks for planning school and activities.',
	],
	cons: [
		'The alternating block lengths can be confusing at first.',
		'Some weeks may feel uneven without viewing the full cycle.',
		'Requires coordination around extracurricular activities.',
	],
	example: {
		title: 'Example 3-4-4-3 calendar',
		description: 'Parent A has three days, Parent B has four days, Parent A then has four days, and Parent B has three days.',
	},
	faq: [
		{
			question: 'Is 3-4-4-3 a 50/50 schedule?',
			answer: 'Yes. The two-week cycle gives each parent seven overnights.',
		},
		{
			question: 'How is 3-4-4-3 different from 2-2-3?',
			answer: '3-4-4-3 uses longer blocks and fewer exchanges, while 2-2-3 gives more frequent contact with each parent.',
		},
		{
			question: 'Is 3-4-4-3 easy to print?',
			answer: 'It is easiest to understand when printed as a monthly custody calendar with the two-week cycle clearly marked.',
		},
	],
	relatedSchedules: ['2-2-3-custody-schedule', '5-2-2-5-custody-schedule', 'week-on-week-off-custody-schedule'],
	relatedTools: [
		{
			title: 'Custody schedule template',
			slug: 'custody-schedule-template',
			description: 'Document the rotation in a printable template.',
		},
	],
};

export default schedule;
