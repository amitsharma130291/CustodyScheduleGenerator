import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: 'week-on-week-off',
	title: 'Week-On Week-Off Custody Schedule',
	slug: 'week-on-week-off-custody-schedule',
	description: 'Build a week-on week-off custody schedule with a simple alternating weekly calendar.',
	metaTitle: 'Week-On Week-Off Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a week-on week-off custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://future-domain.com/week-on-week-off-custody-schedule',
	lede: 'A week-on week-off custody schedule alternates full weeks between parents. It is one of the simplest 50/50 custody schedules to understand and can work well for older children or teens who can handle longer stretches in each home.',
	overview: [
		'The week-on week-off custody schedule is popular because it has fewer exchanges and is easy to remember. One parent has the child for a full week, then the other parent has the following week, and the pattern repeats.',
		'This schedule can work well when both homes can support school routines, activities, clothing, homework, and transportation for a full week at a time. It may be harder for younger children who need more frequent contact with each parent.',
	],
	pros: [
		'Very simple to understand and print',
		'Fewer exchanges than shorter rotation schedules',
		'Can reduce midweek transitions and planning friction',
	],
	cons: [
		'Seven days away from one parent can be long for younger children',
		'Both homes need to support full school-week routines',
		'May require extra calls or visits between exchanges',
	],
	example: {
		title: 'Week-On Week-Off Schedule Example',
		description: 'In a week-on week-off schedule, Parent A has the first full week, Parent B has the next full week, and the pattern continues alternating every seven days.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent B', days: 'Mon Tue Wed Thu Fri Sat Sun' },
				],
			},
		],
	},
	faq: [
		{
			question: 'What is a week-on week-off custody schedule?',
			answer: 'A week-on week-off custody schedule is a shared parenting rotation where the child spends one full week with one parent, then one full week with the other parent.',
		},
		{
			question: 'How does a week-on week-off schedule work?',
			answer: 'One parent has seven consecutive overnights, then the other parent has the next seven consecutive overnights. The schedule repeats every two weeks.',
		},
		{
			question: 'Is week-on week-off a 50/50 custody schedule?',
			answer: 'Yes. Alternating full weeks gives each parent seven overnights across every two-week cycle.',
		},
		{
			question: 'What day should exchanges happen?',
			answer: 'Many families choose Friday, Sunday, or Monday depending on school, work, and transportation routines.',
		},
		{
			question: 'Is week-on week-off good for toddlers?',
			answer: 'It is often better for older children and teens. Toddlers may need more frequent contact with each parent than a full-week rotation provides.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Parenting plan template',
			slug: 'parenting-plan-template',
			description: 'Create a broader written parenting plan around the schedule.',
		},
		{
			title: 'Custody calendar template',
			slug: 'custody-calendar-template',
			description: 'Start from a clean printable custody calendar template.',
		},
	],
};

export default schedule;
