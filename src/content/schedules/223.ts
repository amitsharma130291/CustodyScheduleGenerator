import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '2-2-3',
	title: '2-2-3 Custody Schedule',
	slug: '2-2-3-custody-schedule',
	description: 'Create and preview a 2-2-3 custody schedule with a clear parenting time calendar.',
	metaTitle: '2-2-3 Custody Schedule Generator',
	metaDescription: 'Build a 2-2-3 custody schedule, see a calendar example, compare pros and cons, and print a parenting time template.',
	lede: 'A 2-2-3 custody schedule gives each parent frequent time with the child while alternating weekends in a predictable two-week rhythm.',
	overview: [
		'The 2-2-3 custody schedule is one of the most common 50/50 parenting time schedules for families who want frequent contact with both parents. The child spends two days with one parent, two days with the other parent, and then three days back with the first parent. The pattern reverses in the second week so weekends alternate.',
		'This schedule can work well for younger children who benefit from seeing each parent often, but it also requires consistent communication because exchanges happen several times each week.',
	],
	pros: [
		'Frequent contact with both parents.',
		'Alternating weekends feel balanced over a two-week cycle.',
		'Easy to visualize on a custody calendar.',
	],
	cons: [
		'More exchanges than weekly schedules.',
		'Can be harder when parents live far apart.',
		'Requires clear routines for school nights and activities.',
	],
	example: {
		title: 'Example 2-2-3 calendar',
		description: 'If Parent A starts Monday, Parent A has Monday-Tuesday, Parent B has Wednesday-Thursday, and Parent A has Friday-Sunday. The next week reverses the weekend.',
	},
	faq: [
		{
			question: 'Is a 2-2-3 schedule always 50/50?',
			answer: 'Yes, across the full two-week cycle, the 2-2-3 schedule is designed to divide parenting time evenly.',
		},
		{
			question: 'Who gets weekends in a 2-2-3 schedule?',
			answer: 'Weekends alternate. One parent has the three-day weekend block in week one, and the other parent has it in week two.',
		},
		{
			question: 'Is 2-2-3 good for toddlers?',
			answer: 'It can be useful for younger children because neither parent goes long without contact, but the exchange frequency should be realistic for the family.',
		},
	],
	relatedSchedules: ['2-2-5-5-custody-schedule', '5-2-2-5-custody-schedule', '50-50-custody-schedule'],
	relatedTools: [
		{
			title: 'Custody schedule template',
			slug: 'custody-schedule-template',
			description: 'Use a printable template to document the schedule.',
		},
	],
};

export default schedule;
