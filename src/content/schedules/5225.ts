import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '5-2-2-5',
	title: '5-2-2-5 Custody Schedule',
	slug: '5-2-2-5-custody-schedule',
	description: 'Generate a 5-2-2-5 custody calendar and compare the benefits and tradeoffs of this 50/50 schedule.',
	metaTitle: '5-2-2-5 Custody Schedule Generator',
	metaDescription: 'Build a 5-2-2-5 custody schedule with examples, printable calendar output, pros and cons, and related schedule links.',
	lede: 'A 5-2-2-5 custody schedule creates a consistent two-week rotation with longer parenting blocks and predictable exchange days.',
	overview: [
		'The 5-2-2-5 schedule is a shared parenting rotation where each parent receives a five-day block and a two-day block during the two-week cycle. It is often used as a 50/50 schedule because the parenting time balances over the full cycle.',
		'This schedule can be easier to follow than patterns with more frequent exchanges, while still giving each parent meaningful school-week and weekend time.',
	],
	pros: [
		'Balanced 50/50 parenting time.',
		'Predictable exchange days after the routine is established.',
		'Longer blocks can reduce transition fatigue.',
	],
	cons: [
		'Longer stretches may not fit every child.',
		'Parents need to coordinate school materials and activities across homes.',
		'The pattern can be confusing until viewed on a calendar.',
	],
	example: {
		title: 'Example 5-2-2-5 calendar',
		description: 'A child may spend five days with Parent A, two days with Parent B, two days with Parent A, then five days with Parent B.',
	},
	faq: [
		{
			question: 'Is 5-2-2-5 a 50/50 custody schedule?',
			answer: 'Yes. Across the full two-week cycle, each parent receives seven overnights.',
		},
		{
			question: 'Is 5-2-2-5 better than 2-2-3?',
			answer: 'It depends on the child and logistics. 5-2-2-5 usually has fewer transitions, while 2-2-3 keeps contact more frequent.',
		},
		{
			question: 'Does this schedule work for school-aged children?',
			answer: 'It can work well when both homes can support school routines and activities consistently.',
		},
	],
	relatedSchedules: ['2-2-5-5-custody-schedule', '2-2-3-custody-schedule', '3-4-4-3-custody-schedule'],
	relatedTools: [
		{
			title: 'Parenting time calculator',
			slug: 'parenting-time-calculator',
			description: 'Calculate parenting time by days or overnights.',
		},
	],
};

export default schedule;
