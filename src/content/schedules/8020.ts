import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '80-20',
	title: '80/20 Custody Schedule',
	slug: '80-20-custody-schedule',
	description: 'Build an 80/20 custody schedule, compare common 80/20 parenting plans, preview an overnight custody calendar, and estimate parenting time percentages.',
	metaTitle: '80/20 Custody Schedule | Examples & Visitation Calendar',
	metaDescription: 'Learn how an 80/20 custody schedule works, see visitation examples, and estimate overnights and parenting time.',
	canonicalUrl: 'https://custodybuilder.com/80-20-custody-schedule/',
	lede: 'An 80/20 custody schedule gives one parent a strong majority of overnights while the other parent has regular scheduled parenting time. Use this 80/20 parenting schedule tool to preview an overnight custody calendar, compare common 80/20 visitation schedule examples, and estimate parenting time percentages.',
	overviewTitle: 'What Is an 80/20 Custody Schedule?',
	overview: [
		'An 80/20 custody schedule is an overnight-based parenting time arrangement where one parent has about 80% of overnights and the other parent has about 20%. It is often used when one home anchors most school-week routines, transportation, homework, and daily logistics.',
		'Common 80/20-style schedules are not all mathematically exact. Use the live generator to compare the visible month with the generated annual average, because monthly weekend rules, added visits, and long-distance blocks can produce different overnight splits.',
	],
	howItWorks: {
		title: 'Choosing the Right 80/20 Custody Schedule',
		description: [
			'Best situations: an 80/20 custody schedule can fit families where one parent manages most school-night routines, parents live farther apart, work schedules limit weekday exchanges, or the child needs a stable primary-home rhythm. It can also work when the other parent has consistent weekend, holiday, or school-break parenting time.',
			'Potential drawbacks: the lower-time parent may have fewer school-week overnights, longer gaps between visits, and less day-to-day involvement unless the schedule adds calls, activities, weekday visits, or extra holiday overnights. Daytime visits can support connection, but they do not change the overnight custody split unless an overnight is added.',
			'When parents choose 80/20 schedules: parents often use 80/20 when a 50/50 custody schedule or 60/40 custody schedule is not practical, but they still want predictable parenting time. Families comparing majority-time options may also review a 70/30 custody schedule before choosing a more primary-home structure.',
		],
	},
	pros: [
		'Creates a consistent primary-home routine for school nights',
		'Can reduce frequent exchanges when parents live farther apart',
		'Gives the lower-time parent predictable scheduled overnights',
	],
	cons: [
		'The lower-time parent may have fewer school-week overnights',
		'Some common 80/20-style examples are not mathematically exact without added overnights',
		'Holidays and summer schedules often need extra planning',
	],
	example: {
		title: 'Every other weekend example calendar',
		description: 'The live calendar defaults to every other weekend: Parent B has Friday and Saturday overnights every other weekend, while Parent A has the remaining overnights. Use the pattern selector to compare other common 80/20-style schedules.',
		weeks: [
			{
				label: 'Two-week cycle',
				blocks: [
					{ parent: 'Parent A', days: '12 overnights' },
					{ parent: 'Parent B', days: '2 overnights' },
				],
			},
			{
				label: 'Weekend block',
				blocks: [
					{ parent: 'Parent A', days: 'Sunday-Thursday plus the off weekend' },
					{ parent: 'Parent B', days: 'Friday and Saturday overnights every other weekend' },
				],
			},
		],
	},
	comparison: {
		title: '80/20 Custody Schedule Comparison Table',
		description: 'Compare common 80/20 custody schedule examples by best fit and planning notes. Use the live generator above for the exact visible-month split and generated annual average.',
		columnLabels: {
			schedule: 'Pattern',
			bestFor: 'Best for',
			exchangeFrequency: 'Generated split',
			notes: 'Notes',
		},
		rows: [
			{
				schedule: 'Alternating weekends',
				href: '/every-other-weekend-custody-schedule/',
				bestFor: 'Primary-home schedules with predictable weekend parenting time',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Often grouped with 80/20 examples, but the annual split depends on the generated overnight count.',
			},
			{
				schedule: 'Every weekend',
				href: '/70-30-custody-schedule/',
				bestFor: 'Parent A handles school nights; Parent B has Friday/Saturday overnights',
				exchangeFrequency: 'Calculated by generator',
				notes: 'More time for Parent B than many 80/20-style plans.',
			},
			{
				schedule: 'Every 3rd weekend',
				href: '/80-20-custody-schedule/',
				bestFor: 'Long-distance cases with fewer exchanges',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Very primary-home focused by overnights.',
			},
			{
				schedule: '1st, 3rd and 5th weekends',
				href: '/80-20-custody-schedule/',
				bestFor: 'Families using monthly weekend rules',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Percentage varies by month because some months have five weekends.',
			},
			{
				schedule: '2nd, 4th and 5th weekends',
				href: '/80-20-custody-schedule/',
				bestFor: 'Families wanting a different monthly weekend rhythm',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Useful when recurring work or activity schedules make first weekends difficult.',
			},
			{
				schedule: 'Every other weekend + midweek dinner',
				href: '/80-20-custody-schedule/',
				bestFor: 'Families adding contact without adding overnights',
				exchangeFrequency: 'Calculated by generator',
				notes: 'The dinner visit supports contact but does not change the overnight percentage.',
			},
			{
				schedule: 'Every other weekend + one weekday overnight',
				href: '/80-20-custody-schedule/',
				bestFor: 'Families adding one school-week overnight',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Adds one weekday overnight in the opposite week of the two-week cycle.',
			},
			{
				schedule: 'Long distance 80/20',
				href: '/80-20-custody-schedule/',
				bestFor: 'Long-distance plans with fewer exchanges',
				exchangeFrequency: 'Calculated by generator',
				notes: 'Uses longer blocks instead of frequent weekend exchanges.',
			},
		],
	},
	examples: {
		title: '80/20 Schedule Examples',
		description: 'These common 80/20 custody schedule examples use overnight counts only. Daytime visits, exchange times, school hours, and hourly parenting time are not included in the percentages.',
		items: [
			{
				title: 'Alternating weekends',
				description: 'Parent B has Friday and Saturday overnights every other weekend, while Parent A has the remaining overnights. Many families add holiday or summer overnights if they want the annual percentage closer to 80/20.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Primary-home schedules, long-distance parenting, or fewer exchanges.',
			},
			{
				title: 'Every weekend',
				description: 'Parent A has Sunday through Thursday overnights and Parent B has Friday and Saturday overnights every week. This is a common majority-time example, but it gives Parent B more than 20%.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Families where one parent handles school nights and the other parent has weekends.',
			},
			{
				title: 'Every 3rd weekend',
				description: 'Parent B has Friday and Saturday overnights every third weekend. This creates a lower overnight percentage than many 80/20 plans, but can reduce travel and exchanges.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Long-distance schedules or cases where travel makes frequent weekends difficult.',
			},
			{
				title: '1st, 3rd and 5th weekends',
				description: 'Parent B has Friday and Saturday overnights on the first, third, and fifth weekends of the month. The annual percentage varies because not every month has a fifth weekend.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Families that prefer monthly weekend rules instead of repeating day counts.',
			},
			{
				title: '2nd, 4th and 5th weekends',
				description: 'Parent B has Friday and Saturday overnights on the second, fourth, and fifth weekends. This can work when work schedules, activities, or travel plans make first weekends less practical.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Families coordinating around recurring weekend commitments.',
			},
			{
				title: 'Every other weekend + midweek dinner',
				description: 'Parent B has Friday and Saturday overnights every other weekend, plus a midweek dinner visit. The dinner visit can support connection, but it does not add an overnight.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Families wanting midweek contact without changing the overnight split.',
			},
			{
				title: 'Every other weekend + one weekday overnight',
				description: 'Parent B has Friday and Saturday overnights every other weekend, plus one weekday overnight during the opposite week. This moves the overnight split closer to 80/20.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Families that can support one recurring school-week overnight.',
			},
			{
				title: 'Long distance 80/20',
				description: 'Parent B has a longer block about every five weeks. This keeps exchanges less frequent while preserving a recurring overnight schedule.',
				approxSplit: 'Calculated by the live generator',
				bestUseCase: 'Long-distance parenting plans where travel makes frequent weekends difficult.',
			},
		],
	},
	faq: [
		{
			question: 'What is an 80/20 custody schedule?',
			answer: 'An 80/20 custody schedule is an overnight parenting time arrangement where one parent has about 80% of overnights and the other parent has about 20%. It is often used when one home handles most school-night routines and the other parent has scheduled weekend, holiday, or school-break parenting time. The exact calendar can vary, so the generator shows both the current month and a generated annual average.',
		},
		{
			question: 'How does an 80/20 custody schedule work?',
			answer: 'An 80/20 custody schedule works by assigning each overnight to one parent and then calculating the overnight custody split. This page’s live calendar can preview alternating weekends, monthly weekend rules, added overnight patterns, and long-distance blocks. Daytime visits and exchange times are not included in the percentage calculation.',
		},
		{
			question: 'How many overnights is an 80/20 custody schedule?',
			answer: 'A rough 80/20 custody schedule is about 292 overnights for one parent and 73 overnights for the other parent in a 365-day year. Some 80/20-style patterns are exact and some are only grouped with 80/20 because they create a strong primary-home schedule. Use the generated annual average or the custody percentage calculator if you want to check custom overnight totals for a full year.',
		},
		{
			question: 'What does an 80/20 custody calendar look like?',
			answer: 'An 80/20 custody calendar usually shows one parent with most school-night overnights and the other parent with recurring but less frequent overnights. Some calendars use every other weekend, some use first, third, and fifth weekends, some add one weekday overnight, and some use longer long-distance blocks. The visible month may not match the long-term average exactly because calendar months do not always include complete repeating cycles.',
		},
		{
			question: 'Is every other weekend an 80/20 custody schedule?',
			answer: 'Every other weekend is often discussed with 80/20 custody schedules, but by overnights alone it may give the lower-time parent less than 20% unless other overnights are added. Families sometimes combine alternating weekends with holiday time, summer schedules, or additional overnights to move the annual parenting time percentage closer to an intended 80/20 plan.',
		},
		{
			question: 'What are common 80/20 custody schedule examples?',
			answer: 'Common 80/20 custody schedule examples include every other weekend, every weekend, every third weekend, first-third-fifth weekends, second-fourth-fifth weekends, alternating weekends with a midweek dinner, alternating weekends with one added weekday overnight, and long-distance 80/20 blocks. Each example creates a different overnight percentage. A strong 80/20 parenting plan should make exchange days, holiday overrides, school breaks, transportation, and make-up parenting time clear.',
		},
		{
			question: 'When do parents choose an 80/20 custody schedule?',
			answer: 'Parents may choose an 80/20 custody schedule when one parent provides the main school-week home, parents live far apart, work schedules make frequent exchanges difficult, or a child needs a stable primary routine. It can also be used as a gradual parenting time arrangement. Families should compare it with a 70/30 custody schedule, 60/40 custody schedule, or 50/50 custody schedule if more shared overnights may be practical.',
		},
		{
			question: 'What are the drawbacks of an 80/20 custody schedule?',
			answer: 'The main drawback is that the lower-time parent has fewer overnights and may have less involvement in school-night routines. Longer gaps between overnights can also be difficult for some children. Holiday custody schedules, school breaks, phone calls, activities, and added overnights can help support connection, but daytime contact does not change the overnight parenting time percentage unless an overnight is added.',
		},
		{
			question: 'How do holidays work with an 80/20 custody schedule?',
			answer: 'Holiday parenting time often overrides the regular 80/20 custody schedule. Parents may alternate major holidays, split winter break, rotate spring break, or give the lower-time parent additional holiday overnights. Because this tool uses overnight counts, holiday and school-break overnights can change the annual percentage. The holiday custody schedule tool can help plan those exceptions separately from the regular weekly pattern.',
		},
		{
			question: 'Can parents customize an 80/20 custody schedule?',
			answer: 'Yes. Parents can customize an 80/20 custody schedule by changing weekend rules, adding holiday overnights, adjusting summer parenting time, planning transportation, or adding make-up parenting time. The important part is to count overnights consistently so the parenting time calculator and custody percentage calculator reflect the actual schedule. Educational planning tool. Not legal advice. Custody laws and court practices vary by location.',
		},
	],
	relatedSchedules: [
		'70-30-custody-schedule',
		'60-40-custody-schedule',
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
			title: 'Parenting time calculator',
			slug: 'parenting-time-calculator',
			description: 'Compare parenting time from overnight totals.',
		},
	],
	relatedHeading: 'Related tools and schedules',
	relatedLinks: [
		{
			title: '70/30 Custody Schedule',
			slug: '70-30-custody-schedule',
			description: 'Compare 80/20 custody with a majority-time schedule that gives the lower-time parent more overnights.',
		},
		{
			title: '60/40 Custody Schedule',
			slug: '60-40-custody-schedule',
			description: 'Review a schedule closer to shared parenting while still keeping one parent slightly ahead on overnights.',
		},
		{
			title: '50/50 Custody Schedule',
			slug: '50-50-custody-schedule',
			description: 'Compare 80/20 custody with equal parenting time schedule examples.',
		},
		{
			title: 'Holiday Custody Schedule',
			slug: 'holiday-custody-schedule',
			description: 'Plan holiday overnights, school breaks, birthdays, and special days.',
		},
		{
			title: 'Custody Percentage Calculator',
			slug: 'custody-percentage-calculator',
			description: 'Calculate parenting time percentages from overnight counts.',
		},
		{
			title: 'Parenting Time Calculator',
			slug: 'parenting-time-calculator',
			description: 'Estimate parenting time and compare overnight totals.',
		},
	],
};

export default schedule;
