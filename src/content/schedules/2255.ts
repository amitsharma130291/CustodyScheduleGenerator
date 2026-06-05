import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '2-2-5-5',
	title: '2-2-5-5 Custody Schedule',
	slug: '2-2-5-5-custody-schedule',
	description: 'Preview a 2-2-5-5 custody schedule and understand how the two-week parenting rotation works.',
	metaTitle: '2-2-5-5 Custody Schedule Generator',
	metaDescription: 'Create a 2-2-5-5 custody schedule with calendar examples, pros and cons, FAQs, and printable parenting time output.',
	lede: 'A 2-2-5-5 custody schedule gives each parent fixed weekdays plus alternating five-day blocks, creating a predictable shared parenting rhythm.',
	overview: [
		'The 2-2-5-5 schedule is popular because each parent can keep the same two weekdays every week. The longer five-day blocks alternate, which helps balance weekends and longer stretches of parenting time.',
		'Families often choose this schedule when school routines matter and both parents can manage a midweek exchange pattern.',
	],
	pros: [
		'Predictable weekdays for each parent.',
		'Balanced 50/50 parenting time over two weeks.',
		'Fewer exchanges than 2-2-3 while still keeping regular contact.',
	],
	cons: [
		'Five-day blocks may feel long for some younger children.',
		'Midweek exchanges still require coordination.',
		'School and activity logistics need to be planned carefully.',
	],
	example: {
		title: 'Example 2-2-5-5 calendar',
		description: 'Parent A may have Monday-Tuesday, Parent B Wednesday-Thursday, then Parent A Friday-Tuesday, followed by Parent B Wednesday-Sunday.',
	},
	faq: [
		{
			question: 'Is 2-2-5-5 the same as 5-2-2-5?',
			answer: 'They are closely related 50/50 patterns. The naming emphasizes different blocks, but both can create fixed weekdays and alternating longer blocks.',
		},
		{
			question: 'Does 2-2-5-5 alternate weekends?',
			answer: 'Yes. The five-day blocks typically include alternating weekends so each parent receives weekend parenting time.',
		},
		{
			question: 'Who should use a 2-2-5-5 schedule?',
			answer: 'It often works for school-aged children when parents want stable weekdays and a balanced two-week cycle.',
		},
	],
	relatedSchedules: ['5-2-2-5-custody-schedule', '2-2-3-custody-schedule', '50-50-custody-schedule'],
	relatedTools: [
		{
			title: 'Custody calendar template',
			slug: 'custody-calendar-template',
			description: 'Review a calendar-based custody template.',
		},
	],
};

export default schedule;
