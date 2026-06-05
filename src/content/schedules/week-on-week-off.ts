import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: 'week-on-week-off',
	title: 'Week-On Week-Off Custody Schedule',
	slug: 'week-on-week-off-custody-schedule',
	description: 'Build a week-on week-off custody schedule with a simple alternating weekly calendar.',
	metaTitle: 'Week-On Week-Off Custody Schedule Generator',
	metaDescription: 'Create a week-on week-off custody schedule, compare pros and cons, and preview a printable weekly custody calendar.',
	lede: 'A week-on week-off custody schedule alternates full weeks between parents, making it one of the simplest 50/50 schedules to understand.',
	overview: [
		'The week-on week-off schedule is popular because it has fewer exchanges and is easy to remember. One parent has the child for a full week, then the other parent has the next full week.',
		'This schedule can work well for older children and teens who can handle longer stretches away from each parent, especially when school routines are consistent in both homes.',
	],
	pros: [
		'Very simple to understand and print.',
		'Fewer exchanges than shorter rotation schedules.',
		'Can reduce midweek transitions and planning friction.',
	],
	cons: [
		'Seven days away from one parent can be long for younger children.',
		'Both homes need to support full school-week routines.',
		'May require extra calls or visits between exchanges.',
	],
	example: {
		title: 'Example week-on week-off calendar',
		description: 'Parent A has the first Monday through Sunday, then Parent B has the following Monday through Sunday, repeating every week.',
	},
	faq: [
		{
			question: 'Is week-on week-off always 50/50?',
			answer: 'Yes. Alternating full weeks creates an even division of overnights over time.',
		},
		{
			question: 'What day should exchanges happen?',
			answer: 'Many families choose Friday, Sunday, or Monday depending on school and work routines.',
		},
		{
			question: 'Is week-on week-off good for toddlers?',
			answer: 'It is often better for older children. Toddlers may need more frequent contact with each parent.',
		},
	],
	relatedSchedules: ['50-50-custody-schedule', '3-4-4-3-custody-schedule', '5-2-2-5-custody-schedule'],
	relatedTools: [
		{
			title: 'Parenting plan template',
			slug: 'parenting-plan-template',
			description: 'Create a broader written parenting plan around the schedule.',
		},
	],
};

export default schedule;
