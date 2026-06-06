import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '223',
	title: '50/50 Custody Schedule',
	slug: '50-50-custody-schedule',
	description: 'Compare 50/50 custody schedule options and preview an equal parenting time calendar.',
	metaTitle: '50/50 Custody Schedule Examples | CustodyBuilder',
	metaDescription: 'Compare 50/50 custody schedule examples for US co-parents, calculate parenting time, preview calendars, and print a parenting plan.',
	canonicalUrl: 'https://custodybuilder.com/50-50-custody-schedule',
	lede: 'A 50/50 custody schedule gives both parents roughly equal parenting time across the repeating schedule. Common 50/50 parenting schedules include 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off rotations.',
	overview: [
		'A 50/50 custody schedule is a shared parenting schedule designed to divide overnights as evenly as possible between both parents. The schedule may not be perfectly equal every individual month, but the repeating cycle should balance parenting time over time.',
		'There is no single best 50/50 custody schedule for every family. The right option depends on the child’s age, school routine, distance between homes, exchange logistics, weekend balance, and how well parents can coordinate transitions.',
	],
	pros: [
		'Both parents stay closely involved in routines',
		'Parenting time balances over the full rotation',
		'Multiple schedule patterns can fit different ages and logistics',
	],
	cons: [
		'Equal time does not automatically mean equal convenience',
		'Some shared parenting schedules require frequent exchanges',
		'Distance between homes can make certain 50/50 schedules difficult',
	],
	example: {
		title: 'Example: 2-2-3 50/50 Custody Schedule',
		description: 'The 2-2-3 pattern below is one example of a 50/50 custody arrangement. It gives each parent seven overnights across two weeks while alternating the three-day weekend block.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue' },
					{ parent: 'Parent B', days: 'Wed Thu' },
					{ parent: 'Parent A', days: 'Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent B', days: 'Mon Tue' },
					{ parent: 'Parent A', days: 'Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	comparison: {
		title: 'Compare Common 50/50 Custody Schedules',
		description: 'Use this table to compare common equal parenting time schedules by exchange frequency, weekend pattern, and the situations they tend to fit best.',
		rows: [
			{
				schedule: '2-2-3',
				href: '/2-2-3-custody-schedule',
				bestFor: 'Younger children who benefit from frequent contact',
				exchangeFrequency: 'Frequent exchanges',
				weekendPattern: 'Alternating three-day weekends',
				notes: 'Balanced and common, but requires more coordination.',
			},
			{
				schedule: '2-2-5-5',
				href: '/2-2-5-5-custody-schedule',
				bestFor: 'Families who want stable weekdays',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Alternating five-day blocks',
				notes: 'Each parent can keep the same two weekdays.',
			},
			{
				schedule: '5-2-2-5',
				href: '/5-2-2-5-custody-schedule',
				bestFor: 'Longer blocks with predictable exchanges',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Alternating five-day blocks',
				notes: 'Fewer transitions than 2-2-3 with balanced time.',
			},
			{
				schedule: '3-4-4-3',
				href: '/3-4-4-3-custody-schedule',
				bestFor: 'Families wanting three- and four-day blocks',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Balanced across two weeks',
				notes: 'Can feel clearer when viewed on a calendar.',
			},
			{
				schedule: 'Week-on/week-off',
				href: '/week-on-week-off-custody-schedule',
				bestFor: 'Older children and fewer exchanges',
				exchangeFrequency: 'Weekly exchanges',
				weekendPattern: 'Full alternating weeks',
				notes: 'Simple, but seven days apart may be long for younger children.',
			},
		],
		cta: {
			title: 'Which 50/50 schedule is right for you?',
			links: [
				{
					title: '2-2-3 Custody Schedule',
					slug: '2-2-3-custody-schedule',
					description: 'Best when younger children benefit from frequent contact with both parents.',
				},
				{
					title: '2-2-5-5 Custody Schedule',
					slug: '2-2-5-5-custody-schedule',
					description: 'Useful when parents want stable weekdays plus alternating longer weekend blocks.',
				},
				{
					title: '5-2-2-5 Custody Schedule',
					slug: '5-2-2-5-custody-schedule',
					description: 'A strong option for longer parenting blocks with fewer exchanges than 2-2-3.',
				},
				{
					title: 'Week-On/Week-Off Custody Schedule',
					slug: 'week-on-week-off-custody-schedule',
					description: 'Simple weekly rotation that often works best for older children and teens.',
				},
			],
		},
	},
	examples: {
		title: '50/50 Custody Schedule Examples',
		description: 'These examples show how different shared parenting schedules divide time while creating different rhythms for exchanges and weekends.',
		items: [
			{
				title: '2-2-3 schedule',
				href: '/2-2-3-custody-schedule',
				description: 'Parent A has two days, Parent B has two days, then Parent A has a three-day weekend block. The pattern reverses the next week so weekends alternate.',
			},
			{
				title: '2-2-5-5 schedule',
				href: '/2-2-5-5-custody-schedule',
				description: 'Parent A may keep Monday and Tuesday, Parent B may keep Wednesday and Thursday, and the longer five-day blocks alternate weekends.',
			},
			{
				title: 'Week-on/week-off schedule',
				href: '/week-on-week-off-custody-schedule',
				description: 'Parent A has one full week, then Parent B has the next full week. This is simple and has fewer exchanges, but creates longer stretches apart.',
			},
		],
	},
	faq: [
		{
			question: 'What is a 50/50 custody schedule?',
			answer: 'A 50/50 custody schedule is a shared parenting plan designed to give each parent roughly equal overnights. It can use several different rotations, including 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off schedules.',
		},
		{
			question: 'What is the best 50/50 custody schedule?',
			answer: 'The best 50/50 custody schedule depends on the child’s age, school routine, distance between homes, work schedules, and exchange logistics. Younger children may need more frequent contact, while older children may handle longer blocks more easily.',
		},
		{
			question: 'How does a 50/50 custody schedule work?',
			answer: 'A 50/50 custody schedule works by repeating a parenting-time pattern that balances overnights between both parents. The schedule may not be perfectly equal every month, but the full cycle should divide parenting time as evenly as possible.',
		},
		{
			question: 'What does a 50/50 custody calendar look like?',
			answer: 'A 50/50 custody calendar shows which parent has each overnight across the repeating schedule. Calendar views are helpful because some equal-time schedules look uneven within one week but balance over a two-week cycle.',
		},
		{
			question: 'How many overnights does each parent receive in a 50/50 custody schedule?',
			answer: 'In a typical two-week 50/50 custody schedule, each parent receives seven overnights. Over a full year, the exact count may vary slightly depending on the start date, holidays, school breaks, and whether the year has 365 or 366 days.',
		},
		{
			question: 'What are the pros and cons of a 50/50 custody schedule?',
			answer: 'The main advantage is that both parents remain closely involved in daily routines. The drawbacks are that equal-time schedules can require more coordination, reliable transportation, and homes close enough to support school, activities, and consistent exchanges.',
		},
		{
			question: 'What is the best age for a 50/50 custody schedule?',
			answer: 'There is no single best age for a 50/50 custody schedule. The right fit depends on the child’s development, school routine, attachment needs, and how well both homes can support consistent parenting time.',
		},
		{
			question: 'What is the difference between 2-2-3 and week-on/week-off custody?',
			answer: 'A 2-2-3 schedule uses shorter blocks and more frequent exchanges, which can help younger children see both parents often. Week-on/week-off uses full seven-day blocks, which reduces exchanges but may be a long stretch for some children.',
		},
		{
			question: 'How do holidays work in a 50/50 custody schedule?',
			answer: 'Holiday parenting time is usually handled separately from the regular 50/50 custody schedule. Parents often alternate major holidays, split school breaks, or assign fixed holidays before returning to the normal repeating rotation.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
		{
			title: 'Custody schedule template',
			slug: 'custody-schedule-template',
			description: 'Use a printable custody schedule template to document the rotation.',
		},
	],
	relatedLinks: [
		{
			title: '2-2-3 Custody Schedule',
			slug: '2-2-3-custody-schedule',
			description: 'A frequent-contact 50/50 schedule with alternating three-day weekends.',
		},
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
		{
			title: '60/40 Custody Schedule',
			slug: '60-40-custody-schedule',
			description: 'Compare equal parenting time with a modest majority-time schedule.',
		},
		{
			title: '2-2-5-5 Custody Schedule',
			slug: '2-2-5-5-custody-schedule',
			description: 'A shared parenting schedule with stable weekdays and alternating five-day blocks.',
		},
		{
			title: '5-2-2-5 Custody Schedule',
			slug: '5-2-2-5-custody-schedule',
			description: 'A 50/50 schedule with longer parenting blocks and predictable exchange days.',
		},
		{
			title: '3-4-4-3 Custody Schedule',
			slug: '3-4-4-3-custody-schedule',
			description: 'A two-week schedule using alternating three- and four-day parenting blocks.',
		},
		{
			title: 'Week-On/Week-Off Custody Schedule',
			slug: 'week-on-week-off-custody-schedule',
			description: 'A simple weekly rotation with fewer exchanges and full-week blocks.',
		},
		{
			title: 'Custody Schedule Template',
			slug: 'custody-schedule-template',
			description: 'Use a printable custody schedule template to document the rotation.',
		},
	],
};

export default schedule;
