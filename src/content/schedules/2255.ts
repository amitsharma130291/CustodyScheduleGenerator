import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '2255',
	title: '2-2-5-5 Custody Schedule',
	slug: '2-2-5-5-custody-schedule',
	description: 'Preview a 2-2-5-5 custody schedule and understand how the two-week parenting rotation works.',
	metaTitle: '2-2-5-5 Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a 2-2-5-5 custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://future-domain.com/2-2-5-5-custody-schedule',
	lede: 'A 2-2-5-5 custody schedule is a two-week parenting rotation where the child spends 2 days with Parent A, 2 days with Parent B, then 5 days with Parent A and 5 days with Parent B. It is often used by families who want stable weekdays, alternating weekends, and a balanced 50/50 custody schedule.',
	overview: [
		'The 2-2-5-5 custody schedule is popular because each parent can keep the same two weekdays every week while the longer five-day blocks alternate. For example, Parent A may consistently have Monday and Tuesday, Parent B may consistently have Wednesday and Thursday, and weekends rotate through the five-day blocks.',
		'Families often choose this schedule when school routines matter and both parents can manage predictable weekday exchanges. It gives children regular contact with both homes while reducing some of the exchange frequency found in a 2-2-3 schedule.',
	],
	pros: [
		'Stable weekdays for each parent',
		'Alternating weekends over the two-week cycle',
		'Balanced 50/50 parenting time',
	],
	cons: [
		'Five-day blocks may feel long for some younger children',
		'Midweek exchanges still require coordination',
		'School and activity logistics need to be planned carefully',
	],
	example: {
		title: '2-2-5-5 Schedule Example',
		description: 'In a common 2-2-5-5 schedule, Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, Parent A has Friday through Tuesday, and Parent B has Wednesday through Sunday. This creates stable weekdays and alternating weekends.',
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
					{ parent: 'Parent A', days: 'Mon Tue' },
					{ parent: 'Parent B', days: 'Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	faq: [
		{
			question: 'What is a 2-2-5-5 custody schedule?',
			answer: 'A 2-2-5-5 custody schedule is a repeating two-week parenting plan with two short weekday blocks and two longer five-day blocks. It is often used as a 50/50 custody schedule because each parent receives equal parenting time across the 14-day cycle. Many families choose it when they want predictable weekdays, alternating weekends, and fewer transitions than a 2-2-3 rotation.',
		},
		{
			question: 'How does a 2-2-5-5 custody schedule work?',
			answer: 'A common 2-2-5-5 custody schedule gives one parent Monday and Tuesday, the other parent Wednesday and Thursday, then alternates the longer weekend blocks. For example, one parent may keep the same two weekdays every week while the five-day blocks rotate. This gives the schedule a stable school-week rhythm while still alternating weekends over the full cycle.',
		},
		{
			question: 'Is a 2-2-5-5 schedule a 50/50 custody schedule?',
			answer: 'Yes. A 2-2-5-5 schedule is generally a 50/50 custody schedule because each parent receives 7 overnights in a 14-day cycle. The repeating pattern gives both parents equal time over the full cycle. Annual totals can shift slightly when holidays, vacations, school breaks, or special parenting-time rules override the regular rotation.',
		},
		{
			question: 'What is an example of a 2-2-5-5 custody schedule?',
			answer: 'One example of a 2-2-5-5 custody schedule gives Parent A Monday and Tuesday, Parent B Wednesday and Thursday, Parent A Friday through Tuesday, and Parent B Wednesday through Sunday. The pattern then repeats. This example keeps weekday responsibilities predictable while alternating the longer weekend blocks between parents.',
		},
		{
			question: 'What does a 2-2-5-5 custody calendar look like?',
			answer: 'A 2-2-5-5 custody calendar usually shows each parent keeping the same two weekdays every week, with longer five-day blocks alternating around weekends. On a calendar, this can look more predictable than shorter rotations because school nights stay consistent. It also makes weekend exchanges, school routines, and upcoming overnights easier to preview.',
		},
		{
			question: 'What are the pros and cons of a 2-2-5-5 custody schedule?',
			answer: 'The main benefits of a 2-2-5-5 custody schedule are stable weekdays, alternating weekends, and equal parenting time. It can reduce some of the transition fatigue found in shorter rotations. Possible drawbacks include five-day stretches that may feel long for younger children, plus midweek exchanges that still require coordination around school, work, and activities.',
		},
		{
			question: 'What is the best age for a 2-2-5-5 custody schedule?',
			answer: 'There is no single best age for a 2-2-5-5 custody schedule. It is often considered for school-age children who can handle several days in each home and benefit from predictable weekday routines. For toddlers or children who need more frequent contact, shorter rotations may be easier to manage until longer blocks feel more comfortable.',
		},
		{
			question: 'How many overnights does each parent receive in a 2-2-5-5 schedule?',
			answer: 'Each parent typically receives 7 overnights in every 14-day cycle of a 2-2-5-5 schedule. That creates equal parenting time and is why the schedule is commonly grouped with other 50/50 arrangements. Monthly totals may vary depending on where the cycle falls on the calendar, but the full repeating cycle stays balanced.',
		},
		{
			question: 'How do holidays work in a 2-2-5-5 custody schedule?',
			answer: 'Holiday parenting time usually overrides the regular 2-2-5-5 custody schedule. Parents often define holidays, school breaks, vacations, and special events separately in the parenting plan. After the holiday period ends, the family usually returns to the normal two-day and five-day rotation unless the written plan says otherwise.',
		},
		{
			question: 'What is the difference between a 2-2-5-5 and 2-2-3 custody schedule?',
			answer: 'A 2-2-5-5 custody schedule gives each parent the same two weekdays and longer five-day blocks. A 2-2-3 custody schedule uses shorter two-day and three-day blocks with more frequent exchanges. The 2-2-3 option may provide more frequent contact, while 2-2-5-5 usually offers more weekday consistency and fewer transitions.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
