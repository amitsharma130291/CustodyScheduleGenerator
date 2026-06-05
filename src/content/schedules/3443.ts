import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '3443',
	title: '3-4-4-3 Custody Schedule',
	slug: '3-4-4-3-custody-schedule',
	description: 'Create a 3-4-4-3 custody schedule and see how three- and four-day blocks appear on a calendar.',
	metaTitle: '3-4-4-3 Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a 3-4-4-3 custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://future-domain.com/3-4-4-3-custody-schedule',
	lede: 'A 3-4-4-3 custody schedule is a two-week shared parenting rotation that alternates three-day and four-day blocks. It can work well for families who want fewer exchanges than a 2-2-3 schedule while still keeping both parents involved each week.',
	overview: [
		'The 3-4-4-3 custody schedule gives one parent three days, the other parent four days, then reverses the block lengths in the second half of the two-week cycle. Across the full cycle, each parent receives seven overnights.',
		'Parents often choose 3-4-4-3 when they want longer parenting blocks than 2-2-3 but do not want a full week-on week-off arrangement. Because the block lengths alternate, the schedule is much easier to understand when shown on a calendar.',
	],
	pros: [
		'Balanced 50/50 parenting time over two weeks',
		'Fewer exchanges than a 2-2-3 schedule',
		'Predictable three- and four-day blocks for planning',
	],
	cons: [
		'The alternating block lengths can be confusing at first',
		'Some weeks may feel uneven without viewing the full cycle',
		'Requires coordination around school and extracurricular activities',
	],
	example: {
		title: '3-4-4-3 Schedule Example',
		description: 'In a 3-4-4-3 schedule, Parent A may have three days, Parent B four days, Parent A four days, and Parent B three days. The two-week cycle then repeats.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed' },
					{ parent: 'Parent B', days: 'Thu Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	faq: [
		{
			question: 'What is a 3-4-4-3 custody schedule?',
			answer: 'A 3-4-4-3 custody schedule is a two-week rotation where Parent A has three days, Parent B has four days, Parent A has four days, and Parent B has three days.',
		},
		{
			question: 'How does a 3-4-4-3 schedule work?',
			answer: 'The schedule alternates three-day and four-day parenting blocks. Over two weeks, each parent receives one three-day block and one four-day block.',
		},
		{
			question: 'Is a 3-4-4-3 schedule 50/50 custody?',
			answer: 'Yes. Across the full two-week cycle, each parent receives seven overnights, making 3-4-4-3 a common 50/50 custody schedule.',
		},
		{
			question: 'How is 3-4-4-3 different from 2-2-3?',
			answer: '3-4-4-3 uses longer blocks and fewer exchanges, while 2-2-3 gives each parent more frequent contact during the week.',
		},
		{
			question: 'Can parents customize a 3-4-4-3 schedule?',
			answer: 'Yes. Parents can adjust exchange times, transportation, school breaks, and holidays while keeping the same three-day and four-day block structure.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody schedule template',
			slug: 'custody-schedule-template',
			description: 'Document the rotation in a printable template.',
		},
		{
			title: 'Parenting time calculator',
			slug: 'parenting-time-calculator',
			description: 'Compare overnights and parenting time percentages.',
		},
	],
};

export default schedule;
