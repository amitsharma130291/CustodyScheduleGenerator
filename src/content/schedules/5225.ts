import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '5225',
	title: '5-2-2-5 Custody Schedule',
	slug: '5-2-2-5-custody-schedule',
	description: 'Generate a 5-2-2-5 custody calendar and compare the benefits and tradeoffs of this 50/50 schedule.',
	metaTitle: '5-2-2-5 Custody Schedule | Examples & Parenting Time',
	metaDescription: 'Learn how a 5-2-2-5 custody schedule works, compare examples, and calculate parenting time percentages.',
	canonicalUrl: 'https://custodybuilder.com/5-2-2-5-custody-schedule/',
	lede: 'A 5-2-2-5 custody schedule is a two-week parenting rotation where the child spends 5 days with one parent, 2 days with the other parent, 2 days back with the first parent, and then 5 days with the other parent. It gives families longer parenting blocks and usually fewer exchanges than a 2-2-3 custody schedule.',
	overview: [
		'The 5-2-2-5 custody schedule is a shared parenting rotation where each parent receives one longer five-day block and one shorter two-day block during a two-week cycle. Over the full cycle, each parent receives seven overnights.',
		'Families often choose 5-2-2-5 when they want a 50/50 schedule with longer stretches in each home. Compared with 2-2-3, it can reduce transition fatigue while still keeping both parents involved during school weeks and weekends.',
	],
	pros: [
		'Longer parenting blocks than 2-2-3',
		'Balanced 50/50 parenting time',
		'Fewer exchanges than more frequent rotations',
	],
	cons: [
		'Longer stretches may not fit every child',
		'Parents need to coordinate school materials and activities across homes',
		'The pattern can be confusing until viewed on a calendar',
	],
	example: {
		title: '5-2-2-5 Schedule Example',
		description: 'In a 5-2-2-5 schedule, the child may spend five days with Parent A, two days with Parent B, two days back with Parent A, and then five days with Parent B. The pattern repeats every two weeks.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu Fri' },
					{ parent: 'Parent B', days: 'Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue' },
					{ parent: 'Parent B', days: 'Wed Thu Fri Sat Sun' },
				],
			},
		],
	},
	faq: [
		{
			question: 'What is a 5-2-2-5 custody schedule?',
			answer: 'A 5-2-2-5 custody schedule is a repeating two-week parenting plan with one five-day block and one two-day block for each parent. It is commonly used when parents want equal parenting time with fewer exchanges than shorter rotations.',
		},
		{
			question: 'How does a 5-2-2-5 custody schedule work?',
			answer: 'A typical 5-2-2-5 custody schedule gives Parent A five days, Parent B two days, Parent A two days, and then Parent B five days. The pattern repeats every 14 days and can be easier to understand when shown on a custody calendar.',
		},
		{
			question: 'Is a 5-2-2-5 schedule a 50/50 custody schedule?',
			answer: 'Yes. A 5-2-2-5 schedule is usually a 50/50 custody schedule because each parent receives seven overnights in every 14-day cycle. Holidays, vacations, and school breaks may change annual totals slightly.',
		},
		{
			question: 'What does a 5-2-2-5 custody calendar look like?',
			answer: 'A 5-2-2-5 custody calendar shows longer five-day blocks alternating with shorter two-day blocks. This can make weekends and school-night responsibilities easier to preview, especially when parents need a printable calendar for exchanges and overnights.',
		},
		{
			question: 'What are the pros and cons of a 5-2-2-5 custody schedule?',
			answer: 'The main advantage is fewer exchanges than a 2-2-3 schedule while still giving both parents equal parenting time. The drawbacks are longer blocks away from each parent and more planning around school materials, activities, and transportation.',
		},
		{
			question: 'Is a 5-2-2-5 custody schedule good for school-age children?',
			answer: 'A 5-2-2-5 custody schedule can work well for school-age children who can handle longer stretches in each home. It gives each parent meaningful school-week time, but both homes need to manage homework, transportation, activities, and school materials. The fit depends on the child’s routine and the distance between homes.',
		},
		{
			question: 'How many overnights does each parent receive in a 5-2-2-5 schedule?',
			answer: 'Each parent receives seven overnights in every 14-day 5-2-2-5 schedule cycle. That equal overnight count is why the schedule is usually treated as a 50/50 custody arrangement.',
		},
		{
			question: 'How do holidays work in a 5-2-2-5 custody schedule?',
			answer: 'Holiday parenting time is usually written separately from the regular 5-2-2-5 custody schedule. Many families let holidays override the normal rotation, then return to the regular five-day, two-day, two-day, five-day pattern afterward.',
		},
		{
			question: 'What is the difference between a 5-2-2-5 and 2-2-5-5 custody schedule?',
			answer: 'A 5-2-2-5 custody schedule and a 2-2-5-5 custody schedule use the same block lengths but start from a different point in the sequence. Both can provide equal parenting time, so the better fit often depends on preferred weekdays and exchange timing.',
		},
		{
			question: 'Can parents customize a 5-2-2-5 custody schedule?',
			answer: 'Yes. Parents can customize a 5-2-2-5 custody schedule by adjusting exchange times, pickup locations, holidays, school breaks, vacations, and special events. The core five-day, two-day, two-day, five-day rotation can stay the same while the parenting plan adds practical details for each family’s needs.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
