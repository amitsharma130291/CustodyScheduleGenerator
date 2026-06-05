import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '223',
	title: '2-2-3 Custody Schedule',
	slug: '2-2-3-custody-schedule',
	description: 'Create and preview a 2-2-3 custody schedule with a clear parenting time calendar.',
	metaTitle: '2-2-3 Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a 2-2-3 custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://future-domain.com/2-2-3-custody-schedule',
	lede: 'A 2-2-3 custody schedule is a repeating two-week parenting plan where children spend two days with one parent, two days with the other parent, then a three-day weekend block. It can work well for families who want frequent contact with both parents, especially younger children who benefit from shorter stretches away from each household.',
	overview: [
		'The 2-2-3 custody schedule is one of the most common 50/50 parenting time schedules for families who want frequent contact with both parents. The child spends two days with one parent, two days with the other parent, and then three days back with the first parent. The pattern reverses in the second week so weekends alternate.',
		'This schedule can work well for younger children who benefit from seeing each parent often, but it also requires consistent communication because exchanges happen several times each week.',
	],
	pros: [
		'Frequent contact with both parents',
		'Balanced parenting time',
		'Works well for younger children',
	],
	cons: [
		'Frequent exchanges',
		'More coordination required',
		'Can be harder with long-distance parents',
	],
	example: {
		title: '2-2-3 Schedule Example',
		description: 'In week one, Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, and Parent A has Friday through Sunday. In week two, the pattern reverses so Parent B receives Monday and Tuesday, Parent A receives Wednesday and Thursday, and Parent B receives Friday through Sunday.',
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
	faq: [
		{
			question: 'What is a 2-2-3 custody schedule?',
			answer: 'A 2-2-3 custody schedule is a shared parenting rotation where a child spends two days with one parent, two days with the other parent, then three days back with the first parent. The pattern reverses the next week so weekends alternate.',
		},
		{
			question: 'How does a 2-2-3 schedule work?',
			answer: 'A common setup is Parent A on Monday and Tuesday, Parent B on Wednesday and Thursday, and Parent A on Friday through Sunday. The following week, Parent B receives the two-day start and the three-day weekend block.',
		},
		{
			question: 'Is a 2-2-3 schedule 50/50 custody?',
			answer: 'Yes. Across a full two-week cycle, each parent receives seven overnights, making the 2-2-3 schedule a common 50/50 custody arrangement.',
		},
		{
			question: 'At what age does a 2-2-3 schedule work best?',
			answer: 'A 2-2-3 schedule can work well for younger children because neither parent goes many days without contact. It can also work for school-aged children when exchanges, school routines, and transportation are manageable.',
		},
		{
			question: 'Can parents customize a 2-2-3 schedule?',
			answer: 'Yes. Parents can adjust exchange times, holidays, school breaks, and special events while keeping the same basic two-day, two-day, three-day rotation.',
		},
	],
	relatedSchedules: [
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
