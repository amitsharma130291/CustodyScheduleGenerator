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
			answer: 'A 2-2-5-5 custody schedule is a two-week parenting rotation where the child spends two days with one parent, two days with the other parent, then five days with the first parent and five days with the other parent.',
		},
		{
			question: 'How does a 2-2-5-5 schedule work?',
			answer: 'A common version gives Parent A Monday and Tuesday, Parent B Wednesday and Thursday, and then alternates the longer Friday-through-Tuesday and Wednesday-through-Sunday blocks.',
		},
		{
			question: 'Is a 2-2-5-5 schedule 50/50 custody?',
			answer: 'Yes. Across a full two-week cycle, each parent receives seven overnights, making the 2-2-5-5 schedule a common 50/50 custody arrangement.',
		},
		{
			question: 'Does 2-2-5-5 give parents stable weekdays?',
			answer: 'Yes. One reason parents choose 2-2-5-5 is that each parent can keep the same two weekdays every week while weekends alternate.',
		},
		{
			question: 'Can parents customize a 2-2-5-5 schedule?',
			answer: 'Yes. Parents can adjust exchange times, holiday rules, school breaks, and transportation details while keeping the same basic 2-2-5-5 rotation.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'50-50-custody-schedule',
	],
	relatedTools: [],
};

export default schedule;
