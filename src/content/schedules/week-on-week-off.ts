import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: 'week-on-week-off',
	title: 'Week-On Week-Off Custody Schedule',
	slug: 'week-on-week-off-custody-schedule',
	description: 'Build a week-on week-off custody schedule with a simple alternating weekly calendar.',
	metaTitle: 'Week-On Week-Off Custody Schedule | CustodyBuilder',
	metaDescription: 'Create a week-on week-off custody schedule, compare alternating weekly examples, calculate parenting time, and print a calendar for review online.',
	canonicalUrl: 'https://custodybuilder.com/week-on-week-off-custody-schedule',
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
			answer:
				'A week-on week-off custody schedule is a parenting-time rotation where the child spends seven consecutive days with one parent, then seven consecutive days with the other parent. It is simple to understand, easy to show on a custody calendar, and often considered for older children who can handle longer stretches in each home.',
		},
		{
			question: 'How does a week-on week-off custody schedule work?',
			answer:
				'In a week-on week-off custody schedule, Parent A has one full week of overnights, then Parent B has the next full week of overnights. The exchange usually happens on the same day each week, and the two-week cycle repeats throughout the year unless holidays or school breaks override it.',
		},
		{
			question: 'Is week-on week-off a 50/50 custody schedule?',
			answer:
				'Yes. A week-on week-off custody schedule is normally a 50/50 custody schedule because each parent receives seven overnights in every two-week cycle. Over a full year, the exact count can vary slightly depending on the start date, holidays, and how exchanges are handled.',
		},
		{
			question: 'What are the pros and cons of a week-on week-off custody schedule?',
			answer:
				'The main benefit is fewer exchanges, which can make school weeks and transportation easier to manage. The drawback is that seven days away from one parent may feel long for some children. A week-on week-off custody schedule usually works best when both homes can support full-week routines.',
		},
		{
			question: 'Is a week-on week-off schedule good for teenagers?',
			answer:
				'A week-on week-off schedule can work well for teenagers because it reduces transitions and gives each home a full school-week rhythm. Teens may appreciate fewer exchanges, but the schedule still depends on school distance, activities, work schedules, transportation, and whether both homes can support homework and social routines.',
		},
		{
			question: 'Is a week-on week-off schedule good for toddlers?',
			answer:
				'A week-on week-off custody schedule is often harder for toddlers because seven days can be a long separation from either parent. Younger children may do better with more frequent contact and shorter rotations. Families sometimes compare it with a 2-2-3 custody schedule before choosing a toddler-friendly plan.',
		},
		{
			question: 'How many overnights does each parent receive in a week-on week-off schedule?',
			answer:
				'Each parent receives seven overnights in every two-week cycle, which is why a week-on week-off custody schedule is usually treated as 50/50 parenting time. For annual totals, use a custody percentage calculator because leap years, start dates, and holiday overrides can shift the final count.',
		},
		{
			question: 'How do holidays work in a week-on week-off custody schedule?',
			answer:
				'Holiday parenting time usually overrides the regular week-on week-off custody schedule. Parents often write separate holiday, school break, and vacation rules so the weekly rotation can resume after the special parenting time ends.',
		},
		{
			question: 'What is the difference between week-on week-off and a 2-2-3 custody schedule?',
			answer:
				'A week-on week-off custody schedule uses seven-day blocks, while a 2-2-3 custody schedule uses shorter two-day and three-day blocks. Week-on week-off has fewer exchanges and longer stretches in each home. A 2-2-3 custody schedule gives more frequent contact with both parents.',
		},
		{
			question: 'Can I create a printable week-on week-off custody calendar?',
			answer:
				'Yes. Use the generator on this page to choose the week-on week-off custody schedule, set a start date, customize parent names, and preview the custody calendar. You can print the calendar or copy a shareable link for planning conversations.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
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
