import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '60-40',
	title: '60/40 Custody Schedule',
	slug: '60-40-custody-schedule',
	description: 'Create a 60/40 custody schedule and preview 4-3, extended weekend, and exact 60/40 parenting time calendars.',
	metaTitle: '60/40 Custody Schedule, Calendar & Examples',
	metaDescription: 'Create a 60/40 custody schedule, preview a parenting time calendar, compare common 60/40 arrangements, and estimate custody percentages.',
	canonicalUrl: 'https://custodybuilder.com/60-40-custody-schedule',
	lede: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. Use this 60/40 parenting schedule tool to compare a 60/40 visitation schedule, preview a 60/40 custody calendar, and understand how a 60/40 child custody arrangement may look in practice.',
	overviewTitle: 'What Is a 60/40 Custody Schedule?',
	overview: [
		'A 60/40 custody schedule is a parenting time arrangement where one parent has a modest majority of overnights while the other parent still has substantial scheduled time. It is a parenting-time target, not one universal calendar pattern.',
		'This calculator lets you compare common 60/40-style arrangements: a 4-3 schedule, an every-extended-weekend schedule, and a mathematically exact 10-day 6/4 cycle. Some common examples are close to 60/40, while the exact 60/40 option is designed to converge to 60/40 over repeating cycles.',
	],
	howItWorks: {
		title: 'How a 60/40 Custody Schedule Works',
		description: [
			'Use the pattern selector in the generator to choose the version you want. The default 4-3 schedule gives Parent A four days and Parent B three days each week, which is commonly grouped with 60/40 schedules even though the exact split is about 57/43.',
			'The extended-weekend option keeps Parent A on weekdays and Parent B on a long weekend. The exact 60/40 option uses a 10-day cycle: Parent A has three nights, Parent B has two, Parent A has three more, and Parent B has two more.',
		],
	},
	pros: [
		'One parent can anchor more school-week routines',
		'The other parent still receives substantial recurring parenting time',
		'Fewer overnights shift compared with some equal-time schedules',
	],
	cons: [
		'The split is not perfectly equal',
		'Weekend balance may need special attention',
		'The lower-time parent may need midweek involvement to stay connected to school routines',
	],
	example: {
		title: 'Example 60/40 Custody Calendar',
		description: 'The default 4-3 example gives Parent A four days and Parent B three days each week. Use the selector in the generator to switch to extended weekend or exact 60/40.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	comparison: {
		title: '60/40 vs 50/50 Custody Schedule',
		description: 'A 60/40 custody schedule gives one parent a small majority of overnights. A 50/50 custody schedule is designed to divide overnights as evenly as possible.',
		rows: [
			{
				schedule: '60/40 custody schedule',
				href: '/60-40-custody-schedule',
				bestFor: 'Families needing one primary school-week anchor with substantial time for both parents',
				exchangeFrequency: 'Depends on the chosen 60/40 pattern',
				weekendPattern: 'Can be shared, alternated, or customized',
				notes: 'A useful middle ground between equal time and more traditional visitation.',
			},
			{
				schedule: '50/50 custody schedule',
				href: '/50-50-custody-schedule',
				bestFor: 'Families who can support a near-even split of overnights',
				exchangeFrequency: 'Varies by 50/50 pattern',
				weekendPattern: 'Usually balances weekends over the full rotation',
				notes: 'Compare options like 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off.',
			},
			{
				schedule: 'Every other weekend custody schedule',
				href: '/every-other-weekend-custody-schedule',
				bestFor: 'Families where one parent has most overnights',
				exchangeFrequency: 'Usually every other weekend',
				weekendPattern: 'Parent B has Friday and Saturday overnights every other weekend',
				notes: 'Often gives the weekend parent less time than a 60/40 arrangement.',
			},
		],
	},
	examples: {
		title: 'Common 60/40 Custody Schedule Examples',
		description: 'A 60/40 custody schedule is a parenting-time target, not one universal calendar. Some common examples are close to 60/40, while others are mathematically exact.',
		items: [
			{
				title: '4-3 schedule',
				description: 'One parent has 4 days and the other has 3 days each week. This is commonly grouped under 60/40 schedules, though the exact overnight split is about 57/43.',
			},
			{
				title: 'Every extended weekend',
				description: 'Parent A has weekdays and Parent B has a long weekend. This is a common practical 60/40-style arrangement for families who want a school-week anchor.',
			},
			{
				title: 'Exact 60/40 schedule',
				description: 'This option uses a 10-day repeating 6/4 cycle: A, A, A, B, B, A, A, A, B, B. It is mathematically exact over repeating cycles.',
			},
		],
	},
	faq: [
		{
			question: 'What is a 60/40 custody schedule?',
			answer: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. It is less even than a 50/50 custody schedule, but it still gives both parents regular parenting time. Common versions include 4-3, extended weekend, and exact 60/40 patterns.',
			answerHtml: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. It is less even than a <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50 custody schedule</a>, but it still gives both parents regular parenting time. Common versions include 4-3, extended weekend, and exact 60/40 patterns.',
		},
		{
			question: 'How does a 60/40 custody schedule work?',
			answer: 'A 60/40 custody schedule works by repeating a parenting-time pattern where one parent receives a small majority of overnights. This calculator lets you choose a 4-3 schedule, an extended-weekend schedule, or an exact 60/40 pattern with a 10-day 6/4 cycle.',
		},
		{
			question: 'How many overnights is a 60/40 custody schedule?',
			answer: 'The overnight count depends on the selected pattern. A 4-3 schedule is about 57/43, an extended-weekend schedule is often about 57/43, and the exact 60/40 option gives Parent A six overnights and Parent B four overnights in every 10-day cycle.',
			answerHtml: 'The overnight count depends on the selected pattern. A 4-3 schedule is about 57/43, an extended-weekend schedule is often about 57/43, and the exact 60/40 option gives Parent A six overnights and Parent B four overnights in every 10-day cycle. Use the <a href="/custody-percentage-calculator" class="text-accent hover:underline">custody percentage calculator</a> to estimate percentages from overnight counts.',
		},
		{
			question: 'What does a 60/40 custody calendar look like?',
			answer: 'A 60/40 custody calendar shows one parent with slightly more overnights while the other parent still has consistent blocks. The calendar may look like a 4-3 weekly rhythm, a weekday-plus-extended-weekend plan, or a 10-day exact 60/40 cycle.',
			answerHtml: 'A 60/40 custody calendar shows one parent with slightly more overnights while the other parent still has consistent blocks. The calendar may look like a 4-3 weekly rhythm, a weekday-plus-extended-weekend plan, or a 10-day exact 60/40 cycle. You can also compare printable layouts with the <a href="/custody-calendar-template" class="text-accent hover:underline">custody calendar template</a>.',
		},
		{
			question: 'Is a 60/40 custody schedule considered joint custody?',
			answer: 'A 60/40 custody schedule may be part of a joint custody or shared parenting arrangement, but legal terms vary by jurisdiction. The schedule describes parenting time, while legal custody, decision-making, and parenting rights may be handled separately in a parenting plan or court order.',
		},
		{
			question: 'What are the pros and cons of a 60/40 custody schedule?',
			answer: 'The main benefit is that one parent can anchor more school-week routines while the other parent still has substantial time. The drawbacks are that 4-3 and extended-weekend versions may not be mathematically exact 60/40, weekend balance may need extra planning, and monthly percentages can vary.',
		},
		{
			question: 'Is a 60/40 custody schedule good for school-age children?',
			answer: 'A 60/40 custody schedule can work well for school-age children when both homes support homework, sleep routines, transportation, and activities. It may be easier than very frequent exchanges, but children may still need consistent contact with both parents during school weeks.',
		},
		{
			question: 'How do holidays work in a 60/40 custody schedule?',
			answer: 'Holiday parenting time usually overrides the regular 60/40 custody schedule. Parents often alternate major holidays, split school breaks, or add summer blocks before returning to the selected 4-3, extended-weekend, or exact 60/40 pattern.',
		},
		{
			question: 'What is the difference between 60/40 and 50/50 custody?',
			answer: 'A 60/40 custody schedule gives one parent a modest majority of overnights, while a 50/50 custody schedule aims to divide overnights evenly. Annual percentages depend on whether parents choose a close 60/40-style pattern, such as 4-3, or an exact 10-day 60/40 cycle.',
			answerHtml: 'A 60/40 custody schedule gives one parent a modest majority of overnights, while a <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50 custody schedule</a> aims to divide overnights evenly. Annual percentages depend on whether parents choose a close 60/40-style pattern, such as 4-3, or an exact 10-day 60/40 cycle. Families may compare 60/40 with <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3</a>, <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5</a>, or <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5</a> schedules.',
		},
		{
			question: 'Can parents customize a 60/40 custody schedule?',
			answer: 'Yes. Parents can customize a 60/40 custody schedule by choosing a 4-3, extended-weekend, or exact 60/40 pattern, then adjusting exchange times, holidays, or summer parenting time. The final overnight count should be checked because month-level and annual percentages depend on the selected pattern.',
		},
	],
	relatedSchedules: [
		'50-50-custody-schedule',
		'every-other-weekend-custody-schedule',
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate custody percentages from overnights.',
		},
		{
			title: 'Custody calendar template',
			slug: 'custody-calendar-template',
			description: 'Turn a custody schedule into a printable parenting time calendar.',
		},
	],
	relatedHeading: 'Related custody schedules',
	relatedLinks: [
		{
			title: '50/50 Custody Schedule',
			slug: '50-50-custody-schedule',
			description: 'Compare 60/40 custody with equal parenting time schedules.',
		},
		{
			title: 'Every Other Weekend Custody Schedule',
			slug: 'every-other-weekend-custody-schedule',
			description: 'Compare 60/40 custody with an alternating weekend visitation schedule.',
		},
		{
			title: '2-2-3 Custody Schedule',
			slug: '2-2-3-custody-schedule',
			description: 'Review a frequent-contact shared custody schedule.',
		},
		{
			title: '2-2-5-5 Custody Schedule',
			slug: '2-2-5-5-custody-schedule',
			description: 'Compare stable weekdays and alternating longer blocks.',
		},
		{
			title: '70/30 Custody Schedule',
			slug: '70-30-custody-schedule',
			description: 'Compare 60/40 custody with a larger majority-time parenting schedule.',
		},
		{
			title: '80/20 Custody Schedule',
			slug: '80-20-custody-schedule',
			description: 'Review a more primary-parent custody schedule with limited secondary-parent overnights.',
		},
	],
};

export default schedule;
