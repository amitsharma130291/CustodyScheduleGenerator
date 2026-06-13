import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '223',
	title: '2-2-3 Custody Schedule Generator',
	slug: '2-2-3-custody-schedule',
	description: 'Create a printable 2-2-3 custody schedule with a clear 50/50 parenting calendar.',
	metaTitle: '2-2-3 Custody Schedule Generator | 50/50 Parenting Calendar',
	metaDescription: 'Create a printable 2-2-3 custody schedule with our free parenting calendar generator. See examples, pros and cons, FAQs, and compare 50/50 custody schedules.',
	canonicalUrl: 'https://custodybuilder.com/2-2-3-custody-schedule/',
	lastUpdated: '2026-06-13',
	lede: 'A 2-2-3 custody schedule is a repeating 50/50 parenting plan where children spend two days with one parent, two days with the other parent, then a three-day weekend block before the pattern reverses.',
	trust: {
		reviewerLabel: 'Reviewed for clarity by',
		reviewerName: 'CustodyBuilder Editorial Review',
		reviewerCredential: 'Legal review placeholder: add a qualified family law attorney or mediator before publishing a legal review claim.',
		authorName: 'CustodyBuilder Editorial Team',
		authorTitle: 'Parenting time calendar and custody schedule planning team',
		authorBio: 'CustodyBuilder creates plain-English custody schedule guides and calendar tools for parents comparing parenting time options, printable schedules, and parenting plan language.',
		disclaimer: 'This tool is for educational planning only and is not legal advice. Custody laws vary by state. Consult a qualified family law attorney or mediator for legal guidance.',
	},
	hero: {
		definition: 'A 2-2-3 custody schedule gives Parent A two days, Parent B two days, and Parent A the three-day weekend, then reverses the next week so both parents receive equal time.',
		bestFor: 'families who want a 50/50 custody schedule with frequent contact, alternating weekends, and short stretches away from either parent.',
		proChips: ['50/50 over two weeks', 'Frequent parent contact', 'Alternating weekends', 'Good for younger children'],
		conChips: ['More exchanges', 'Needs close homes', 'Requires communication', 'Can disrupt activities'],
		ctas: [
			{ text: 'Generate my 2-2-3 calendar', href: '#schedule-generator', variant: 'primary' },
			{ text: 'Download printable schedule', href: '#printable-download', variant: 'secondary' },
			{ text: 'Compare custody schedules', href: '#comparison', variant: 'secondary' },
		],
	},
	overviewTitle: 'What is a 2-2-3 custody schedule?',
	overview: [
		'The 2-2-3 custody schedule is one of the most common 50/50 custody schedules because it balances parenting time while keeping both parents involved every week. In a typical two-week cycle, each parent receives seven overnights.',
		'Parents often use a 2-2-3 parenting schedule when they want a shared parenting calendar with short blocks, predictable exchanges, and alternating weekends. It can also be called a 2-2-3 visitation schedule, especially when parents are drafting a parenting plan schedule for court, mediation, or co-parenting discussions.',
		'This schedule is easiest when homes, school, daycare, and activities are close enough that frequent exchanges do not create extra stress for the child.',
	],
	howItWorks: {
		title: 'How the 2-2-3 schedule works',
		description: [
			'The pattern repeats every two weeks. Week one usually gives Parent A Monday and Tuesday, Parent B Wednesday and Thursday, and Parent A Friday through Sunday. Week two reverses the pattern so Parent B receives Monday and Tuesday, Parent A receives Wednesday and Thursday, and Parent B receives Friday through Sunday.',
			'Because the weekend alternates, neither parent is limited to only school nights or only weekends. The custody calendar generator below lets you choose the start date, preview the visible month, and export a printable parenting calendar.',
		],
	},
	printableDownload: {
		title: 'Download a Printable 2-2-3 Custody Schedule',
		description: 'Use the generator to create a printable weekly example, a monthly parenting calendar, or a PDF export for planning conversations. The calendar is educational and should be reviewed before being added to a parenting plan.',
		options: [
			{
				title: 'Printable weekly example',
				description: 'Show the two-week 2-2-3 rotation with Parent A and Parent B blocks so the exchange rhythm is easy to understand.',
			},
			{
				title: 'Printable monthly calendar',
				description: 'Preview the selected month with overnight assignments, parent labels, and estimated parenting time percentages.',
			},
			{
				title: 'PDF export',
				description: 'Export a monthly or yearly PDF after choosing the schedule type, start date, and parent names in the generator.',
			},
		],
		ctas: [
			{ text: 'Generate printable calendar', href: '#schedule-generator', variant: 'primary' },
			{ text: 'Export PDF from the tool', href: '#schedule-generator', variant: 'secondary' },
			{ text: 'Use custody calendar template', href: '/custody-calendar-template/', variant: 'secondary' },
		],
		yearOptions: ['2025 calendar option', '2026 calendar option', 'Monthly PDF', 'Yearly PDF'],
	},
	deepDiveSections: [
		{
			id: 'schedule-example',
			kicker: 'Example',
			title: '2-2-3 custody schedule example',
			paragraphs: [
				'A common 2-2-3 custody schedule starts on Monday. Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, and Parent A has Friday, Saturday, and Sunday. The next week flips, which gives Parent B the following weekend.',
				'This creates a balanced <a href="/50-50-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> over the full two-week cycle. The exact exchange time can be school pickup, daycare pickup, after work, or another predictable time that reduces conflict.',
			],
			items: [
				{
					title: 'Week 1',
					description: 'Parent A: Monday-Tuesday and Friday-Sunday. Parent B: Wednesday-Thursday.',
				},
				{
					title: 'Week 2',
					description: 'Parent B: Monday-Tuesday and Friday-Sunday. Parent A: Wednesday-Thursday.',
				},
			],
		},
		{
			id: 'when-it-works-best',
			kicker: 'Fit',
			title: 'When this schedule works best',
			paragraphs: [
				'A 2-2-3 parenting schedule works best when both homes are close to school, daycare, activities, and each other. It is usually strongest when both parents can manage weekday routines, transportation, homework, bedtime, and weekend activities.',
				'It can be a good fit for families who want frequent contact instead of long gaps. Younger children may benefit from seeing each parent often, while school-age children may do well if both homes can keep routines consistent.',
			],
			items: [
				{ title: 'Close distance between homes', description: 'Frequent exchanges are easier when drives are short and predictable.' },
				{ title: 'Both parents handle school routines', description: 'The schedule works better when each home can manage mornings, homework, meals, and bedtime.' },
				{ title: 'Child handles transitions well', description: 'Short blocks help some children, but the transition load should still be monitored.' },
				{ title: 'Parents communicate reliably', description: 'Shared calendars, school updates, activity gear, and medication details need to move smoothly.' },
			],
		},
		{
			id: 'when-it-may-not-work',
			kicker: 'Cautions',
			title: 'When this schedule may not work',
			paragraphs: [
				'The 2-2-3 schedule may not work well when parents live far apart, conflict is high at exchanges, or a child has activities that make midweek transitions difficult. In those situations, a longer-block schedule may be easier to follow.',
				'Families who need fewer exchanges may want to compare a <a href="/2-2-5-5-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5 custody schedule</a>, a <a href="/3-4-4-3-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">3-4-4-3 custody schedule</a>, or an <a href="/week-on-week-off-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">alternating weeks custody schedule</a>.',
			],
			items: [
				{ title: 'Long drives', description: 'Frequent exchanges can become tiring and may interfere with school or bedtime.' },
				{ title: 'High-conflict exchanges', description: 'More handoffs can create more opportunities for disputes unless exchanges are structured.' },
				{ title: 'Inconsistent work schedules', description: 'Parents may need a more flexible parenting plan schedule if work shifts change often.' },
				{ title: 'Teen activity schedules', description: 'Older children may prefer fewer transitions around sports, jobs, school events, and friends.' },
			],
		},
		{
			id: 'holidays-breaks-vacations',
			kicker: 'Special dates',
			title: 'Holidays, school breaks, birthdays, and vacations',
			paragraphs: [
				'Holiday and school-break rules usually override the regular 2-2-3 visitation schedule. Parents should define Thanksgiving, winter break, spring break, summer vacation, birthdays, parent birthdays, and important religious or cultural holidays separately.',
				'After a holiday override ends, many families return to the normal 2-2-3 rotation. Others resume with the parent who would have had the next regular block. Put that rule in writing in the <a href="/parenting-plan-template/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a> so the calendar is predictable.',
			],
			items: [
				{ title: 'Holiday priority', description: 'State whether holiday time overrides regular parenting time.' },
				{ title: 'Vacation notice', description: 'Include how much advance notice is needed, how travel details are shared, and whether makeup time applies.' },
				{ title: 'Birthday rules', description: 'Decide whether birthdays rotate, split by time of day, or follow the regular schedule.' },
				{ title: 'School breaks', description: 'Define winter, spring, and summer break separately from the normal weekly rotation.' },
			],
		},
		{
			id: 'exchange-times-locations',
			kicker: 'Exchanges',
			title: 'Exchange times and locations',
			paragraphs: [
				'Common exchange times include school drop-off, school pickup, daycare pickup, 6:00 p.m. after work, or a consistent weekend time. School-based exchanges can reduce parent-to-parent conflict because the child leaves one home in the morning and goes to the other home after school.',
				'Choose locations that are safe, predictable, and realistic. If conflict is a concern, parents may use school, daycare, a public location, or another neutral exchange point recommended by their professionals.',
			],
			items: [
				{ title: 'School pickup exchanges', description: 'Often easiest for school-age children because the school day becomes the transition point.' },
				{ title: 'After-work exchanges', description: 'Can work when parents have stable work hours and evening routines stay calm.' },
				{ title: 'Neutral locations', description: 'Useful when direct home-to-home exchanges create stress or conflict.' },
				{ title: 'Gear checklist', description: 'Keep school materials, medication, uniforms, and comfort items accounted for at each transition.' },
			],
		},
		{
			id: 'communication-schedule-changes',
			kicker: 'Co-parenting',
			title: 'Communication tips and schedule changes',
			paragraphs: [
				'A 2-2-3 schedule works best when parents use a shared parenting calendar, confirm exchange details in writing, and keep messages focused on the child. The more frequent the exchanges, the more important it is to have simple routines.',
				'For changes, define how requests are made, how much notice is expected, whether makeup time is offered, and what happens if one parent misses their time. The goal is not to punish mistakes, but to protect predictability for the child.',
			],
			items: [
				{ title: 'Use one shared calendar', description: 'Keep exchanges, school events, medical appointments, and activities in one shared parenting calendar.' },
				{ title: 'Confirm changes in writing', description: 'Short written confirmations reduce confusion about dates, times, and transportation.' },
				{ title: 'Define missed-time rules', description: 'State whether makeup time is optional, required, or handled case by case.' },
				{ title: 'Keep child-facing routines stable', description: 'Avoid last-minute changes when they disrupt school, sleep, or activities.' },
			],
		},
		{
			id: 'alternatives',
			kicker: 'Alternatives',
			title: 'Alternatives to 2-2-3',
			paragraphs: [
				'The best custody schedule depends on age, distance, school routines, work schedules, conflict level, and the child\'s ability to handle transitions. If 2-2-3 feels too busy, compare nearby options before finalizing a parenting plan schedule.',
				'Good alternatives include the <a href="/2-2-5-5-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5 custody schedule</a>, <a href="/3-4-4-3-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">3-4-4-3 custody schedule</a>, <a href="/week-on-week-off-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">alternating weeks custody schedule</a>, and <a href="/every-other-weekend-custody-schedule/" class="text-accent underline decoration-line underline-offset-4 hover:text-primary">every other weekend schedule</a>.',
			],
			items: [
				{ title: '2-2-5-5', description: 'Better when each parent wants the same weekdays every week and fewer exchanges than 2-2-3.' },
				{ title: '3-4-4-3', description: 'A 50/50 option with alternating three-day and four-day blocks.' },
				{ title: 'Alternating weeks', description: 'Often better for older children who can handle a full week in each home.' },
				{ title: 'Every other weekend', description: 'A lower-transition option when 50/50 is not practical or one home handles most school routines.' },
			],
		},
	],
	pros: [
		'Creates a true 50/50 custody schedule over a two-week cycle.',
		'Keeps both parents involved every week.',
		'Alternates weekends so neither parent gets every weekend or no weekends.',
		'Can work well for toddlers, preschoolers, and school-age children who benefit from frequent contact.',
		'Makes parenting time easier to visualize in a shared parenting calendar.',
	],
	cons: [
		'Requires more exchanges than longer-block schedules.',
		'Can be difficult when parents live far apart.',
		'Needs reliable communication about school, activities, clothing, medication, and homework.',
		'May feel disruptive for children who struggle with frequent transitions.',
		'Can be harder for teens with jobs, sports, social plans, or late activities.',
	],
	example: {
		title: 'Printable 2-2-3 schedule example',
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
	comparison: {
		title: 'Compare 2-2-3 with other custody schedules',
		description: 'Use this table to compare 2-2-3 with common alternatives before choosing a custody calendar generator pattern or writing a parenting plan schedule.',
		columnLabels: {
			schedule: 'Schedule',
			bestFor: 'Best for',
			exchangeFrequency: 'Parenting time',
			notes: 'Pros',
		},
		rows: [
			{
				schedule: '2-2-3',
				href: '/2-2-3-custody-schedule/',
				bestFor: 'Younger children and families wanting frequent contact with both parents.',
				exchangeFrequency: '50/50 over two weeks; exchanges several times each week.',
				notes: 'Frequent contact, alternating weekends, balanced overnights.',
				cons: 'More handoffs and more coordination.',
				badge: 'Current page',
			},
			{
				schedule: '2-2-5-5',
				href: '/2-2-5-5-custody-schedule/',
				bestFor: 'Families wanting stable weekdays and fewer exchanges than 2-2-3.',
				exchangeFrequency: '50/50 over two weeks; same weekdays repeat.',
				notes: 'Predictable school-week rhythm and longer blocks.',
				cons: 'Five-day stretches may be long for some younger children.',
			},
			{
				schedule: '3-4-4-3',
				href: '/3-4-4-3-custody-schedule/',
				bestFor: 'Families wanting 50/50 time with slightly longer blocks.',
				exchangeFrequency: '50/50 over two weeks; three- and four-day blocks.',
				notes: 'Fewer transitions than 2-2-3 while keeping regular contact.',
				cons: 'Weekday rhythm can be less intuitive at first.',
			},
			{
				schedule: 'Alternating weeks',
				href: '/week-on-week-off-custody-schedule/',
				bestFor: 'Older children and teens who can handle a full week in each home.',
				exchangeFrequency: '50/50 over two weeks; one exchange per week.',
				notes: 'Simple calendar and fewer exchanges.',
				cons: 'Longer time away from each parent.',
			},
			{
				schedule: 'Every other weekend',
				href: '/every-other-weekend-custody-schedule/',
				bestFor: 'Families where one parent anchors most school-week routines.',
				exchangeFrequency: 'Often 80/20 to 85/15 by overnights, depending on details.',
				notes: 'Simple and lower conflict when 50/50 is not practical.',
				cons: 'Much less regular weekday time for one parent.',
			},
		],
		cta: {
			title: 'Compare related 50/50 schedule options',
			links: [
				{ title: '2-2-5-5 custody schedule', slug: '2-2-5-5-custody-schedule', description: 'Compare stable weekdays and longer five-day blocks.' },
				{ title: '3-4-4-3 custody schedule', slug: '3-4-4-3-custody-schedule', description: 'Review a balanced schedule with three- and four-day blocks.' },
				{ title: 'Alternating weeks custody schedule', slug: 'week-on-week-off-custody-schedule', description: 'See whether week-on/week-off is easier for older children.' },
				{ title: '50/50 custody schedules', slug: '50-50-custody-schedule', description: 'Compare the main equal parenting time schedules side by side.' },
			],
		},
	},
	faq: [
		{
			question: 'What is a 2-2-3 custody schedule?',
			answer: 'A 2-2-3 custody schedule is a 50/50 parenting arrangement where a child spends two days with one parent, two days with the other parent, and then three days back with the first parent. The pattern reverses the next week so weekends alternate.',
		},
		{
			question: 'Is 2-2-3 custody always 50/50?',
			answer: 'A standard 2-2-3 custody schedule is 50/50 over a complete two-week cycle because each parent receives seven overnights. Actual annual percentages can change if holidays, vacations, missed time, or special overrides are added.',
		},
		{
			question: 'Is 2-2-3 good for toddlers?',
			answer: 'A 2-2-3 schedule can work for some toddlers because it avoids long gaps away from either parent. It works best when exchanges are calm, routines are consistent, and both homes can support naps, meals, bedtime, and comfort items.',
		},
		{
			question: 'Is 2-2-3 good for school-age children?',
			answer: 'It can be good for school-age children when both parents live close to school and can handle homework, transportation, activities, and weekday routines. If school-week transitions are stressful, a 2-2-5-5 or 3-4-4-3 schedule may be easier.',
		},
		{
			question: 'What time should exchanges happen?',
			answer: 'Common exchange times include school pickup, daycare pickup, after work, or early evening. The best exchange time is predictable, safe, and least disruptive to school, sleep, meals, homework, and activities.',
		},
		{
			question: 'How are holidays handled?',
			answer: 'Holidays usually override the regular 2-2-3 schedule. Parents should write separate holiday rules for Thanksgiving, winter break, birthdays, religious holidays, school breaks, and other special days.',
		},
		{
			question: 'How are vacations handled?',
			answer: 'Vacations are usually handled with separate parenting plan rules. Those rules may include notice deadlines, trip details, travel permissions, maximum vacation length, and whether makeup time is offered.',
		},
		{
			question: 'What if one parent misses their time?',
			answer: 'Parents should define missed-time rules in writing. Some plans allow makeup time by agreement, while others do not automatically replace missed time. The best rule depends on the child, the reason for the missed time, and any legal order.',
		},
		{
			question: 'Is 2-2-3 better than 2-2-5-5?',
			answer: '2-2-3 is often better when children benefit from frequent contact and shorter time away from either parent. 2-2-5-5 may be better when stable weekdays and fewer exchanges matter more.',
		},
		{
			question: 'What are the disadvantages of 2-2-3?',
			answer: 'The main disadvantages are frequent exchanges, more coordination, potential disruption to activities, and difficulty when parents live far apart or have high conflict at handoffs.',
		},
		{
			question: 'Can a 2-2-3 schedule affect child support?',
			answer: 'Parenting time can affect child support discussions in some states, but child support rules vary. A 2-2-3 schedule is usually 50/50 by overnights, but income, expenses, state formulas, and court rules may still matter.',
		},
		{
			question: 'Can I use this schedule in a parenting plan?',
			answer: 'You can use a 2-2-3 schedule as a starting point for a parenting plan, but the written plan should also address holidays, vacations, exchanges, transportation, schedule changes, decision-making, and dispute resolution.',
		},
		{
			question: 'Can parents modify a 2-2-3 schedule?',
			answer: 'Parents can modify a 2-2-3 schedule by agreement if their court order or local law allows it. Formal legal changes may require written agreement, mediation, court approval, or advice from a qualified family law attorney.',
		},
		{
			question: 'What is the best custody schedule for 50/50 custody?',
			answer: 'The best 50/50 custody schedule depends on the child age, distance between homes, school routines, work schedules, and transition tolerance. Common options include 2-2-3, 2-2-5-5, 3-4-4-3, 5-2-2-5, and alternating weeks.',
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
	relatedTools: [
		{ title: 'Parenting Plan Template', slug: 'parenting-plan-template', description: 'Turn your 2-2-3 parenting schedule into a written parenting plan.' },
		{ title: 'Child Support Calculator', slug: 'child-support-calculator', description: 'Compare parenting time with child support planning considerations.' },
		{ title: 'Custody Calendar Generator', slug: 'custody-schedule-generator', description: 'Build and compare custody calendars with printable PDF options.' },
	],
	relatedHeading: 'Related 2-2-3 custody schedule tools',
	relatedLinks: [
		{ title: '2-2-5-5 custody schedule', slug: '2-2-5-5-custody-schedule', description: 'Compare a 50/50 schedule with stable weekdays and fewer exchanges.' },
		{ title: '3-4-4-3 custody schedule', slug: '3-4-4-3-custody-schedule', description: 'Review a 50/50 option with alternating three- and four-day blocks.' },
		{ title: 'Alternating weeks custody schedule', slug: 'week-on-week-off-custody-schedule', description: 'See whether week-on/week-off is a better fit for older children.' },
		{ title: 'Every other weekend schedule', slug: 'every-other-weekend-custody-schedule', description: 'Compare a simpler non-50/50 visitation schedule.' },
		{ title: '50/50 custody schedules', slug: '50-50-custody-schedule', description: 'Compare common equal parenting time schedules side by side.' },
		{ title: 'Parenting plan template', slug: 'parenting-plan-template', description: 'Write schedule terms, holidays, exchanges, and changes into a plan.' },
		{ title: 'Child support calculator', slug: 'child-support-calculator', description: 'Review support planning alongside parenting time and overnights.' },
		{ title: 'Custody calendar generator', slug: 'custody-schedule-generator', description: 'Generate and print a shared parenting calendar.' },
	],
	article: {
		headline: '2-2-3 Custody Schedule Generator',
		authorName: 'CustodyBuilder Editorial Team',
		reviewerName: 'CustodyBuilder Editorial Review',
		datePublished: '2026-06-13',
		dateModified: '2026-06-13',
	},
};

export default schedule;
