import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '3443',
	title: '3-4-4-3 Custody Schedule',
	slug: '3-4-4-3-custody-schedule',
	description: 'Create a 3-4-4-3 custody schedule and see how three- and four-day blocks appear on a calendar.',
	metaTitle: '3-4-4-3 Custody Schedule | Calendar Examples & Tips',
	metaDescription: 'See examples of a 3-4-4-3 custody schedule, compare pros and cons, and understand parenting time percentages.',
	canonicalUrl: 'https://custodybuilder.com/3-4-4-3-custody-schedule',
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
			answer: 'A 3-4-4-3 custody schedule is a repeating two-week parenting plan that alternates three-day and four-day blocks. It is often used by parents who want equal parenting time with fewer exchanges than shorter rotations.',
		},
		{
			question: 'How does a 3-4-4-3 custody schedule work?',
			answer: 'A 3-4-4-3 custody schedule gives one parent three days, the other parent four days, then reverses the pattern with four days and three days. Across the full 14-day cycle, both parents receive equal overnights.',
		},
		{
			question: 'Is a 3-4-4-3 schedule a 50/50 custody schedule?',
			answer: 'Yes. A 3-4-4-3 schedule is generally a 50/50 custody schedule because each parent receives seven overnights in a two-week cycle. Holiday schedules and school breaks may adjust the exact annual count.',
		},
		{
			question: 'What does a 3-4-4-3 custody calendar look like?',
			answer: 'A 3-4-4-3 custody calendar shows alternating three-day and four-day parenting blocks. The pattern can look uneven within one week, but it balances over the full two-week cycle when both parents receive seven overnights.',
		},
		{
			question: 'What are the pros and cons of a 3-4-4-3 custody schedule?',
			answer: 'The main benefits are equal parenting time, fewer exchanges than 2-2-3, and predictable three- and four-day blocks. The drawbacks are that the pattern can feel confusing at first and may require careful planning around school and activities.',
		},
		{
			question: 'What is the best age for a 3-4-4-3 custody schedule?',
			answer: 'There is no single best age for a 3-4-4-3 custody schedule. It may work well for school-age children who can handle three- and four-day stretches in each home, especially when both homes can support school routines.',
		},
		{
			question: 'How many overnights does each parent receive in a 3-4-4-3 schedule?',
			answer: 'Each parent receives seven overnights in every 14-day 3-4-4-3 schedule cycle. This equal overnight count is why the schedule is commonly treated as a 50/50 custody arrangement.',
		},
		{
			question: 'How do holidays work in a 3-4-4-3 custody schedule?',
			answer: 'Holiday parenting time usually overrides the normal 3-4-4-3 custody schedule. Parents often define holidays, school breaks, and vacations separately, then return to the regular three-day and four-day rotation after the holiday period ends.',
		},
		{
			question: 'What is the difference between a 3-4-4-3 and 2-2-3 custody schedule?',
			answer: 'A 3-4-4-3 custody schedule uses longer three- and four-day blocks, while a 2-2-3 custody schedule uses shorter two-day and three-day blocks. The 3-4-4-3 schedule usually has fewer exchanges, while 2-2-3 gives more frequent contact.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'week-on-week-off-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
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
