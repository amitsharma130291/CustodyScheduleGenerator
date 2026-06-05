import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '50-50',
	title: '50/50 Custody Schedule',
	slug: '50-50-custody-schedule',
	description: 'Compare 50/50 custody schedule options and preview an equal parenting time calendar.',
	metaTitle: '50/50 Custody Schedule Generator',
	metaDescription: 'Create a 50/50 custody schedule with calendar examples, common rotations, pros and cons, and printable parenting time output.',
	lede: 'A 50/50 custody schedule is any parenting plan designed to divide overnights evenly between both parents.',
	overview: [
		'There is no single 50/50 custody schedule. Families commonly use 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, or week-on week-off rotations depending on the child’s needs and the parents’ logistics.',
		'The best way to compare 50/50 schedules is to look at the calendar, exchange frequency, school-night stability, and weekend balance side by side.',
	],
	pros: [
		'Equal parenting time over the full rotation.',
		'Both parents stay closely involved in routines.',
		'Multiple rotation options can fit different ages and logistics.',
	],
	cons: [
		'Equal time does not automatically mean equal convenience.',
		'Some rotations require frequent exchanges.',
		'Distance between homes can make certain 50/50 schedules difficult.',
	],
	example: {
		title: 'Example 50/50 calendar',
		description: 'A 2-2-3 pattern is a common 50/50 example because each parent receives seven overnights across two weeks.',
	},
	faq: [
		{
			question: 'What is the best 50/50 custody schedule?',
			answer: 'The best option depends on the child’s age, school schedule, distance between homes, and how well parents can coordinate exchanges.',
		},
		{
			question: 'Does 50/50 mean exactly equal every month?',
			answer: 'Not always. Some months may vary slightly, but the schedule should balance over the full repeating cycle.',
		},
		{
			question: 'Which 50/50 schedule has the fewest exchanges?',
			answer: 'Week-on week-off usually has the fewest exchanges, while 2-2-3 has more frequent transitions.',
		},
	],
	relatedSchedules: ['2-2-3-custody-schedule', '2-2-5-5-custody-schedule', 'week-on-week-off-custody-schedule'],
	relatedTools: [
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
	],
};

export default schedule;
