import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '223',
	title: '2-2-3 Custody Schedule',
	slug: '2-2-3-custody-schedule',
	description: 'Create and preview a 2-2-3 custody schedule with a clear parenting time calendar.',
	metaTitle: '2-2-3 Custody Schedule Calculator, Examples & Calendar',
	metaDescription: 'Create a 2-2-3 custody schedule, view examples, calculate parenting time, and generate a printable custody calendar.',
	canonicalUrl: 'https://custodybuilder.com/2-2-3-custody-schedule',
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
			answer: 'A 2-2-3 custody schedule is a 50/50 parenting arrangement where a child spends two days with one parent, two days with the other parent, and then three days back with the first parent. The pattern reverses the following week.',
		},
		{
			question: 'How does a 2-2-3 custody schedule work?',
			answer: 'A typical 2-2-3 schedule gives Parent A Monday and Tuesday, Parent B Wednesday and Thursday, and Parent A Friday through Sunday. The next week reverses the arrangement so parenting time stays equal.',
		},
		{
			question: 'Is a 2-2-3 custody schedule a 50/50 custody schedule?',
			answer: 'Yes. Over a complete two-week cycle, each parent receives seven overnights, making the 2-2-3 schedule one of the most common 50/50 custody schedules.',
		},
		{
			question: 'What does a 2-2-3 custody calendar look like?',
			answer: 'A 2-2-3 custody calendar alternates parenting time in repeating two-day, two-day, and three-day blocks. Most families use a printable calendar to visualize exchanges and upcoming weekends.',
		},
		{
			question: 'What are the pros and cons of a 2-2-3 custody schedule?',
			answer: 'Advantages include frequent contact with both parents and balanced parenting time. Drawbacks include more exchanges and schedule transitions than longer custody rotations.',
		},
		{
			question: 'Is a 2-2-3 custody schedule good for toddlers?',
			answer: 'Many parents choose a 2-2-3 schedule for toddlers and younger children because neither parent goes long periods without seeing the child.',
		},
		{
			question: 'How many overnights does each parent receive in a 2-2-3 schedule?',
			answer: 'Each parent receives seven overnights during every two-week cycle, creating an equal 50/50 split.',
		},
		{
			question: 'What is the difference between a 2-2-3 schedule and a 2-2-5-5 schedule?',
			answer: 'A 2-2-3 schedule uses shorter parenting blocks and more exchanges. A 2-2-5-5 schedule provides longer stretches with each parent and fewer transitions.',
		},
		{
			question: 'What is the best 50/50 custody schedule?',
			answer: "The best 50/50 custody schedule depends on the child's age, school schedule, distance between homes, and parent availability. Common options include 2-2-3, 2-2-5-5, 5-2-2-5, and week-on-week-off schedules.",
		},
		{
			question: 'How do holidays work in a 2-2-3 custody schedule?',
			answer: 'Holiday parenting time often overrides the regular 2-2-3 custody schedule. Parents usually define holiday exchanges, school breaks, vacations, and special events separately so the normal two-day, two-day, three-day rotation can resume afterward.',
		},
	],
	relatedSchedules: [
		'2-2-5-5-custody-schedule',
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
