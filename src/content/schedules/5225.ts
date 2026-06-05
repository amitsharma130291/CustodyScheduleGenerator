import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '5225',
	title: '5-2-2-5 Custody Schedule',
	slug: '5-2-2-5-custody-schedule',
	description: 'Generate a 5-2-2-5 custody calendar and compare the benefits and tradeoffs of this 50/50 schedule.',
	metaTitle: '5-2-2-5 Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a 5-2-2-5 custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://future-domain.com/5-2-2-5-custody-schedule',
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
			answer: 'A 5-2-2-5 custody schedule is a two-week shared parenting rotation where the child spends five days with one parent, two days with the other parent, two days back with the first parent, and five days with the other parent.',
		},
		{
			question: 'How does a 5-2-2-5 schedule work?',
			answer: 'A common version gives Parent A a five-day block, Parent B a two-day weekend block, Parent A two more days, and Parent B the next five-day block. The cycle then repeats.',
		},
		{
			question: 'Is a 5-2-2-5 schedule 50/50 custody?',
			answer: 'Yes. Across the full two-week cycle, each parent receives seven overnights, so the 5-2-2-5 schedule is commonly used as a 50/50 custody schedule.',
		},
		{
			question: 'Is 5-2-2-5 better than 2-2-3?',
			answer: 'It depends on the child and logistics. 5-2-2-5 usually has fewer exchanges and longer blocks, while 2-2-3 keeps contact more frequent.',
		},
		{
			question: 'Can parents customize a 5-2-2-5 schedule?',
			answer: 'Yes. Parents can adjust exchange times, holidays, school breaks, and transportation details while keeping the same basic five-day, two-day, two-day, five-day rotation.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
