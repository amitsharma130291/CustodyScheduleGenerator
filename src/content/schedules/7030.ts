import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '70-30',
	title: '70/30 Custody Schedule',
	slug: '70-30-custody-schedule',
	description: 'Build a 70/30 custody schedule, compare common 70/30 parenting plans, preview a custody calendar, and print or copy a simple parenting schedule.',
	metaTitle: '70/30 Custody Schedule Generator | Parenting Calendar',
	metaDescription: 'Build a 70/30 custody schedule, compare common 70/30 parenting plans, preview a custody calendar, and print or copy a simple parenting schedule.',
	canonicalUrl: 'https://custodybuilder.com/70-30-custody-schedule',
	lede: 'A 70/30 custody schedule gives one parent about 70% of overnights and the other parent about 30%. Use this 70/30 parenting schedule tool to compare common 70/30 visitation schedules, preview a 70/30 custody calendar, and understand how a 70/30 child custody arrangement may look in practice.',
	overviewTitle: 'What Is a 70/30 Custody Schedule?',
	overview: [
		'A 70/30 custody schedule is a parenting time arrangement where Parent A has most overnights and Parent B has regular scheduled parenting time. Parent A is the majority-time parent, while Parent B is the minority-time parent.',
		'Many schedules described as 70/30 are approximate. Every-weekend and 5-2 schedules are about 71/29 by overnights, while every-third-week and every-third-day patterns are closer to 67/33. Alternating weekends alone is approximately 86/14 by overnights, so many families combine alternating weekends with weekday visits, holiday time, or summer schedules to create a parenting-time arrangement closer to 70/30.',
	],
	howItWorks: {
		title: 'How a 70/30 Custody Schedule Works',
		description: [
			'A 70/30 schedule usually means one parent has most school-week overnights while the other parent has regular weekend, weekday, or block parenting time. The calendar preview shows overnight ownership only, so a date belongs to the parent with whom the child sleeps that night.',
			'Use the pattern selector to compare every-weekend, 5-2, every-third-week, every-third-day, and alternating-weekend versions. Daytime visits, exchange times, school hours, and hourly parenting time are not included.',
		],
	},
	pros: [
		'One parent can provide a consistent primary-home routine',
		'The other parent still has recurring parenting time',
		'Weekend or block schedules can be easier to plan around school',
	],
	cons: [
		'Some common patterns are approximate rather than exact 70/30',
		'Weekend balance may feel uneven without holiday planning',
		'Alternating weekends alone is much closer to 86/14 by overnights',
	],
	example: {
		title: 'Example 70/30 Custody Calendar',
		description: 'The default every-weekend example gives Parent A Sunday through Thursday overnights and Parent B Friday and Saturday overnights. Use the selector in the generator to compare other common 70/30-style schedules.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Sun Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent A', days: 'Sun Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat' },
				],
			},
		],
	},
	comparison: {
		title: 'Example 70/30 Custody Schedule Table',
		description: 'Compare common 70/30 custody schedule examples by overnight split, family fit, and planning notes.',
		columnLabels: {
			schedule: 'Pattern',
			bestFor: 'Best for',
			exchangeFrequency: 'Approx overnight split',
			notes: 'Notes',
		},
		rows: [
			{
				schedule: 'Every weekend',
				href: '/70-30-custody-schedule',
				bestFor: 'Parent A has Sunday-Thursday overnights, Parent B has Friday-Saturday overnights',
				exchangeFrequency: 'About 71/29',
				notes: 'Simple and predictable',
			},
			{
				schedule: '5-2 schedule',
				href: '/70-30-custody-schedule',
				bestFor: 'One parent receives five overnights and the other receives two each week',
				exchangeFrequency: 'About 71/29',
				notes: 'Easy to remember',
			},
			{
				schedule: 'Every 3rd week',
				href: '/70-30-custody-schedule',
				bestFor: 'Parent A receives two weeks, then Parent B receives one week',
				exchangeFrequency: 'About 67/33',
				notes: 'Fewer exchanges',
			},
			{
				schedule: 'Every 3rd day',
				href: '/70-30-custody-schedule',
				bestFor: 'Parent A receives 2 consecutive overnights, then Parent B receives 1 overnight',
				exchangeFrequency: 'About 67/33',
				notes: 'More exchanges',
			},
			{
				schedule: 'Alternating weekends',
				href: '/every-other-weekend-custody-schedule',
				bestFor: 'Long-distance or primary-parent cases',
				exchangeFrequency: 'About 86/14 by overnights',
				notes: 'Often paired with weekday visits, holidays, or summer time to move closer to 70/30',
			},
		],
	},
	examples: {
		title: 'Common 70/30 Custody Schedule Examples',
		description: 'A 70/30 custody schedule is a parenting-time target, not one exact calendar. These common patterns are often grouped with 70/30 parenting schedules, but their overnight percentages differ.',
		items: [
			{
				title: 'Every weekend',
				description: 'Parent A has Sunday through Thursday overnights and Parent B has Friday and Saturday overnights. This creates a 5/2 weekly rhythm with an approximate 71/29 overnight split.',
			},
			{
				title: '5-2 schedule',
				description: 'One parent receives five overnights and the other receives two overnights each week. This simple 5/2 pattern averages about 71/29 by overnights.',
			},
			{
				title: 'Every 3rd week',
				description: 'Parent A receives two weeks, then Parent B receives one week. This reduces exchanges and averages about 67/33 by overnights.',
			},
			{
				title: 'Every 3rd day',
				description: 'Parent A receives 2 consecutive overnights, then Parent B receives 1 overnight. The pattern repeats continuously and averages about 67/33 by overnights.',
			},
			{
				title: 'Alternating weekends with extra visits',
				description: 'Alternating weekends alone is approximately 86/14 by overnights. Many families combine it with weekday visits, holiday time, or summer schedules to create a broader 70/30 parenting plan.',
			},
		],
	},
	faq: [
		{
			question: 'What is a 70/30 custody schedule?',
			answer: 'A 70/30 custody schedule is an overnight custody split where one parent has roughly 70% of overnights and the other parent has roughly 30%. In practice, a 70/30 parenting schedule often gives one home the school-week routine while the other parent has regular weekend, weekday, or block parenting time. The exact calendar can vary. A 5-2 schedule is about 71/29 by overnights, while every-third-week or every-third-day examples are closer to 67/33. This tool treats each date as belonging to the parent who has the child overnight.',
		},
		{
			question: 'How does a 70/30 custody schedule work?',
			answer: 'A 70/30 custody schedule works by repeating an overnight pattern and counting which parent has each overnight. The every-weekend option gives Parent A Sunday through Thursday overnights and Parent B Friday and Saturday overnights, which is about 71/29. The 5-2 schedule also gives one parent five overnights and the other parent two each week. Every-third-week and every-third-day patterns are commonly grouped with 70/30 schedules, but they average closer to 67/33. Holidays and school breaks may override the regular pattern.',
		},
		{
			question: 'How many overnights is a 70/30 custody schedule?',
			answer: 'A rough 70/30 custody schedule is about 256 overnights for one parent and 109 overnights for the other parent in a 365-day year. Weekly 5-2 schedules come close because five overnights out of seven is about 71%. Every-third-week and every-third-day schedules are closer to 67/33 by overnights. Alternating weekends alone gives the weekend parent only Friday and Saturday every other weekend, which is about 86/14. Use the custody percentage calculator to check custom overnight totals.',
		},
		{
			question: 'What does a 70/30 custody calendar look like?',
			answer: 'A 70/30 custody calendar usually shows one parent with most school-night overnights and the other parent with predictable weekend, weekday, or block time. In the every-weekend example, Parent A has Sunday through Thursday overnights and Parent B has Friday and Saturday overnights. In an every-third-week schedule, Parent A has two weeks and Parent B has one week. The current visible month can show a different percentage from the long-term average because calendar months do not always contain complete repeating cycles.',
		},
		{
			question: 'Is a 70/30 custody schedule considered joint custody?',
			answer: 'A 70/30 custody schedule may be part of a shared parenting or joint custody arrangement, but legal labels vary by location. The schedule describes parenting time percentages and overnight custody split. It does not decide legal custody, decision-making authority, school enrollment, medical decision rights, or court requirements. Some families use a 70/30 parenting plan because one home handles more school-week routines while the other parent has consistent scheduled overnights. Educational planning tool. Not legal advice. Custody laws and court practices vary by location.',
		},
		{
			question: 'What are common examples of a 70/30 custody schedule?',
			answer: 'Common 70/30 custody schedule examples include every weekend, 5-2, every third week, every third day, and alternating weekends with additional parenting time. Every weekend and 5-2 are about 71/29 by overnights. Every third week and every third day are about 67/33. Alternating weekends alone is approximately 86/14 by overnights, so it should not be treated as a true 70/30 custody schedule unless additional overnights, holiday time, or school-break time change the total.',
		},
		{
			question: 'Is a 70/30 custody schedule good for school-age children?',
			answer: 'A 70/30 parenting schedule can work for school-age children when routines, transportation, homework, and activities are clear. Many families use this type of schedule when one parent provides the main school-week home and the other parent has regular weekend or block parenting time. The best fit depends on distance between homes, school start times, extracurricular activities, and each parent’s ability to support routines. A 60/40 custody schedule or 50/50 custody schedule may be worth comparing if both homes can support more balanced school-week responsibilities.',
		},
		{
			question: 'How do holidays work in a 70/30 custody schedule?',
			answer: 'Holiday parenting time often overrides the regular 70/30 custody schedule. Parents may alternate Thanksgiving, split winter break, rotate spring break, or use a separate holiday custody schedule for birthdays and special days. Because this tool uses overnight counts, holiday overnights can change parenting time percentages for the year. A parent with fewer regular overnights may receive additional holiday or school-break overnights, which can move the annual split closer to the intended 70/30 parenting plan.',
		},
		{
			question: 'What is the difference between 70/30 and 80/20 custody?',
			answer: 'A 70/30 custody schedule generally gives the minority-time parent more regular overnights than an 80/20 custody schedule. A 70/30 custody calendar may include every weekend, a 5-2 rotation, every-third-week blocks, or another recurring overnight pattern. An 80/20 schedule is often closer to every other weekend by overnights. Alternating weekends alone is approximately 86/14, so many families add weekday visits, holiday time, or summer schedules if they want the overall parenting-time arrangement to feel closer to 70/30.',
		},
		{
			question: 'Can parents customize a 70/30 custody schedule?',
			answer: 'Yes. Parents can customize a 70/30 custody schedule by changing exchange days, holiday overnights, school breaks, transportation, and make-up parenting time. The important part is to count overnights consistently so the custody percentage calculator and 70/30 custody calendar reflect the actual schedule. Daytime visits can be valuable, but they do not change the overnight custody split unless an additional overnight is added. Educational planning tool. Not legal advice. Custody rules, court practices, and required parenting plan language vary by location.',
		},
	],
	relatedSchedules: [
		'60-40-custody-schedule',
		'80-20-custody-schedule',
		'50-50-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate custody percentages from overnight counts.',
		},
		{
			title: 'Custody calendar template',
			slug: 'custody-calendar-template',
			description: 'Create a printable parenting time calendar.',
		},
	],
	relatedHeading: 'Related tools and schedules',
	relatedLinks: [
		{
			title: '60/40 Custody Schedule',
			slug: '60-40-custody-schedule',
			description: 'Compare 70/30 custody with a schedule closer to shared parenting.',
		},
		{
			title: '80/20 Custody Schedule',
			slug: '80-20-custody-schedule',
			description: 'Compare 70/30 custody with a stronger primary-home schedule.',
		},
		{
			title: '50/50 Custody Schedule',
			slug: '50-50-custody-schedule',
			description: 'Review equal parenting time schedules and compare percentage differences.',
		},
		{
			title: 'Every Other Weekend Custody Schedule',
			slug: 'every-other-weekend-custody-schedule',
			description: 'Compare 70/30 custody with alternating weekend parenting time.',
		},
		{
			title: 'Holiday Custody Schedule',
			slug: 'holiday-custody-schedule',
			description: 'Plan holidays, school breaks, birthdays, and special days.',
		},
		{
			title: 'Custody Percentage Calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnight totals.',
		},
		{
			title: 'Custody Calendar Template',
			slug: 'custody-calendar-template',
			description: 'Preview parenting time on a printable calendar.',
		},
	],
};

export default schedule;
