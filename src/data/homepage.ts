export const popularSchedules = [
	{
		id: '223',
		scheduleId: '223',
		name: '2-2-3 Custody Schedule',
		href: '/2-2-3-custody-schedule',
		bestFor: 'Younger children who need frequent contact.',
		tradeoff: 'More exchanges each week.',
		split: '50/50',
		previewPattern: ['A', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B'],
		description: 'Best for younger children who benefit from frequent contact with both parents.',
		cta: 'View 2-2-3 guide',
	},
	{
		id: '2255',
		scheduleId: '2255',
		name: '2-2-5-5 Custody Schedule',
		href: '/2-2-5-5-custody-schedule',
		bestFor: 'School-age children with stable weekdays.',
		tradeoff: 'Five-day blocks may feel long for some children.',
		split: '50/50',
		previewPattern: ['A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B'],
		description: 'Best for school-age children who need stable weekdays and alternating weekends.',
		cta: 'View 2-2-5-5 guide',
	},
	{
		id: '5225',
		scheduleId: '5225',
		name: '5-2-2-5 Custody Schedule',
		href: '/5-2-2-5-custody-schedule',
		bestFor: 'Consistent weekday blocks and predictable weekends.',
		tradeoff: 'Still requires regular midweek transitions.',
		split: '50/50',
		previewPattern: ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'B', 'B'],
		description: 'Best when each parent keeps consistent weekday blocks with fewer transitions.',
		cta: 'View 5-2-2-5 guide',
	},
	{
		id: '6040',
		name: '60/40 Custody Schedule',
		href: '/60-40-custody-schedule',
		scheduleId: '60-40',
		bestFor: 'One primary school-week home with substantial time in both homes.',
		tradeoff: 'Not equal time, so expectations should be clear.',
		split: '60/40',
		previewPattern: ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'A'],
		description: 'Best when one home handles slightly more school-week structure.',
		cta: 'View 60/40 guide',
	},
	{
		id: '7030',
		name: '70/30 Custody Schedule',
		href: '/70-30-custody-schedule',
		scheduleId: '70-30',
		bestFor: 'A primary-home routine with regular overnights.',
		tradeoff: 'One parent has noticeably less time.',
		split: '70/30',
		previewPattern: ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'A'],
		description: 'Best for a primary-home routine with regular overnight time for the other parent.',
		cta: 'View 70/30 guide',
	},
	{
		id: '8020',
		name: '80/20 Custody Schedule',
		href: '/80-20-custody-schedule',
		scheduleId: '80-20',
		bestFor: 'A primary home plus recurring parenting blocks.',
		tradeoff: 'Less frequent overnight time for one parent.',
		split: '80/20',
		previewPattern: ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
		description: 'Best when one parent provides the primary home and the other has recurring blocks.',
		cta: 'View 80/20 guide',
	},
	{
		id: 'week-on-week-off',
		scheduleId: 'week-on-week-off',
		name: 'Week On Week Off Custody Schedule',
		href: '/week-on-week-off-custody-schedule',
		bestFor: 'Older children who can handle longer blocks.',
		tradeoff: 'A full week away can be hard for younger children.',
		split: '50/50',
		previewPattern: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		description: 'Best for older children who can handle longer blocks and fewer exchanges.',
		cta: 'View weekly guide',
	},
];

export const comparisonRows = [
	{
		schedule: '2-2-3',
		href: '/2-2-3-custody-schedule',
		split: '50/50',
		exchanges: 'High',
		age: 'Ages 0-6',
		stability: 'Medium',
		useCase: 'Frequent contact and alternating weekends',
	},
	{
		schedule: '2-2-5-5',
		href: '/2-2-5-5-custody-schedule',
		split: '50/50',
		exchanges: 'Medium',
		age: 'Ages 5-12',
		stability: 'High',
		useCase: 'Stable weekdays and school routines',
	},
	{
		schedule: '5-2-2-5',
		href: '/5-2-2-5-custody-schedule',
		split: '50/50',
		exchanges: 'Medium',
		age: 'Ages 6-13',
		stability: 'High',
		useCase: 'Consistent blocks with predictable weekends',
	},
	{
		schedule: 'Week On Week Off',
		href: '/week-on-week-off-custody-schedule',
		split: '50/50',
		exchanges: 'Low',
		age: 'Ages 10+',
		stability: 'Very high',
		useCase: 'Older children and fewer transitions',
	},
	{
		schedule: '60/40',
		href: '/60-40-custody-schedule',
		split: '60/40',
		exchanges: 'Medium',
		age: 'Ages 5+',
		stability: 'High',
		useCase: 'One primary school-week home',
	},
	{
		schedule: '70/30',
		href: '/70-30-custody-schedule',
		split: '70/30',
		exchanges: 'Low to medium',
		age: 'All ages',
		stability: 'High',
		useCase: 'Primary-home schedule with regular overnights',
	},
	{
		schedule: '80/20',
		href: '/80-20-custody-schedule',
		split: '80/20',
		exchanges: 'Low',
		age: 'All ages',
		stability: 'Very high',
		useCase: 'Primary home plus recurring parenting time',
	},
];

export const ageRecommendations = [
	{
		age: 'Toddlers',
		range: '1-3',
		recommended: '2-2-3 or short 60/40 blocks',
		rationale: 'Shorter separations can help young children keep contact with both parents while routines are still forming.',
		href: '/best-custody-schedule-for-toddler',
		cta: 'Read toddler guide',
	},
	{
		age: 'Preschool',
		range: '4-5',
		recommended: '2-2-3 or 2-2-5-5',
		rationale: 'Predictable weekdays and manageable transitions help children prepare for school routines.',
		href: '/best-custody-schedule-for-5-year-old',
		cta: 'Read preschool guide',
	},
	{
		age: 'Elementary School',
		range: '6-10',
		recommended: '2-2-5-5 or 5-2-2-5',
		rationale: 'Stable school nights, activity planning, and consistent weekend rotations usually become more important.',
		href: '/best-custody-schedule-for-7-year-old',
		cta: 'Read elementary guide',
	},
	{
		age: 'Middle School',
		range: '11-13',
		recommended: '5-2-2-5 or week on week off',
		rationale: 'Older children often handle longer blocks better, especially when school and activities are predictable.',
		href: '/custody-schedule-by-age',
		cta: 'Compare by age',
	},
	{
		age: 'Teenagers',
		range: '14+',
		recommended: 'Week on week off or flexible 50/50',
		rationale: 'Fewer exchanges can reduce friction around sports, jobs, friends, driving, and independence.',
		href: '/best-custody-schedule-for-teenager',
		cta: 'Read teen guide',
	},
];

export const calendarExamples = [
	{
		scheduleId: '223',
		name: '2-2-3 Example',
		href: '/2-2-3-custody-schedule',
		exchanges: 'Two weekday exchanges plus alternating weekends.',
		advantages: 'Frequent contact with both parents and balanced weekends.',
		tradeoffs: 'More exchanges can be tiring if homes are far apart.',
	},
	{
		scheduleId: '2255',
		name: '2-2-5-5 Example',
		href: '/2-2-5-5-custody-schedule',
		exchanges: 'Each parent keeps the same two weekdays and alternates longer blocks.',
		advantages: 'Predictable school-week rhythm and consistent planning.',
		tradeoffs: 'Five-day blocks may be long for some younger children.',
	},
];

export const relatedTools = [
	{
		title: 'Custody Percentage Calculator',
		href: '/custody-percentage-calculator',
		when: 'Use this when you know overnight counts and need a parenting time percentage.',
	},
	{
		title: 'Parenting Time Calculator',
		href: '/parenting-time-calculator',
		when: 'Use this when you want to compare parenting time before choosing a schedule.',
	},
	{
		title: 'Visitation Calculator',
		href: '/visitation-calculator',
		when: 'Use this for visitation-style plans and overnight percentage estimates.',
	},
	{
		title: 'Custody Calendar Template',
		href: '/custody-calendar-template',
		when: 'Use this when you need a printable calendar format for discussion.',
	},
	{
		title: 'Texas Child Support Calculator',
		href: '/texas-child-support-calculator',
		when: 'Use this to estimate Texas guideline-style support from income and deductions.',
	},
];

export const familyLawTools = [
	{
		title: 'Custody Schedule Generator',
		href: '/custody-schedule-generator',
		when: 'Build a custody calendar, compare exchanges, and preview parenting time before discussing support.',
	},
	{
		title: 'Texas Child Support Calculator',
		href: '/texas-child-support-calculator',
		when: 'Estimate Texas guideline child support using income, net resources, child count, and 2025 cap context.',
	},
	{
		title: 'Parenting Time Calculator',
		href: '/parenting-time-calculator',
		when: 'Compare overnights and parenting time percentages when evaluating custody schedules.',
	},
	{
		title: 'Visitation Calendar',
		href: '/visitation-calculator',
		when: 'Plan visitation-style calendars such as alternating weekends, holidays, and school-break time.',
	},
	{
		title: 'Custody Calendar Template',
		href: '/custody-calendar-template',
		when: 'Turn a parenting schedule into a printable calendar for mediation, planning, or co-parent review.',
	},
];

export const platformFaqItems = [
	{
		question: 'What is CustodyBuilder?',
		answer:
			'CustodyBuilder is a custody planning platform that helps parents create custody schedules, compare parenting time, organize holiday planning, and prepare printable calendar outputs for discussion and planning.',
	},
	{
		question: 'Is CustodyBuilder free to use?',
		answer:
			'The custody schedule generator can be used without creating an account. CustodyBuilder may add paid platform features later, but the current schedule-building experience is available for quick planning and comparison.',
	},
	{
		question: 'What tools are available now?',
		answer:
			'The custody schedule generator is available now, including common schedule patterns, calendar previews, parenting time estimates, printable outputs, and PDF export options. Additional planning modules are represented as part of the broader CustodyBuilder workspace direction.',
	},
	{
		question: 'Can I print or export a custody calendar?',
		answer:
			'Yes. After generating a custody calendar, you can print it or export monthly and yearly PDF versions for planning, mediation preparation, co-parent discussion, or personal records.',
	},
	{
		question: 'Do I need an account to use CustodyBuilder?',
		answer:
			'No account is required to use the current custody schedule generator. It is designed for fast planning directly in your browser, and you control any copied, printed, or exported output.',
		links: [{ label: 'Privacy policy', href: '/privacy' }],
	},
	{
		question: 'Does CustodyBuilder provide legal advice?',
		answer:
			'No. CustodyBuilder provides planning tools and educational information, not legal advice. It does not create a court order or replace guidance from a qualified family law professional.',
		links: [{ label: 'Legal disclaimer', href: '/disclaimer' }],
	},
];

export const homepageFaqItems = [
	{
		question: 'How do I choose the right custody schedule?',
		answer:
			'Start with the child’s age, school routine, distance between homes, and how often exchanges can realistically happen. A 2-2-3 schedule gives frequent contact, a 2-2-5-5 schedule creates stable weekdays, and week on week off usually works best for older children who can handle longer blocks.',
		links: [{ label: 'How recommendations work', href: '/how-custodybuilder-works' }],
	},
	{
		question: 'What custody schedule works best for toddlers?',
		answer:
			'Toddlers often do better with shorter separations and frequent contact. Many parents compare 2-2-3, shorter 60/40 blocks, or customized schedules with consistent routines. Long gaps can be difficult at this age, especially if transitions are stressful.',
	},
	{
		question: 'What is a 50/50 custody schedule?',
		answer:
			'A 50/50 custody schedule gives each parent roughly equal overnight time across the repeating calendar. Common examples include 2-2-3, 2-2-5-5, 5-2-2-5, and week on week off. The best option depends on school routines, distance between homes, and how well the child handles exchanges.',
		links: [{ label: '50/50 custody schedule guide', href: '/50-50-custody-schedule' }],
	},
	{
		question: 'What is a 60/40 custody schedule?',
		answer:
			'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. It can work when one home anchors more school-week structure while the other parent still has substantial regular time.',
		links: [{ label: '60/40 custody schedule guide', href: '/60-40-custody-schedule' }],
	},
	{
		question: 'What is a 70/30 custody schedule?',
		answer:
			'A 70/30 custody schedule usually creates a primary-home rhythm with regular overnights for the other parent. Parents often compare it with 60/40 and 80/20 schedules when school routines, distance, or work schedules make equal time difficult.',
		links: [{ label: '70/30 custody schedule guide', href: '/70-30-custody-schedule' }],
	},
	{
		question: 'What is a 2-2-3 custody schedule?',
		answer:
			'A 2-2-3 custody schedule is a 50/50 parenting time pattern where the child spends two days with one parent, two days with the other parent, and then a three-day weekend block. The pattern reverses the following week so weekends alternate.',
		links: [{ label: '2-2-3 custody schedule guide', href: '/2-2-3-custody-schedule' }],
	},
	{
		question: 'What is a visitation schedule?',
		answer:
			'A visitation schedule is a parenting time plan that shows when a child spends time with each parent, often when one parent has fewer overnights. In everyday planning, visitation schedules and custody schedules both need clear dates, exchanges, holidays, and routines.',
		links: [{ label: 'Visitation calendar tool', href: '/visitation-calculator' }],
	},
	{
		question: 'How is a visitation schedule different from a custody schedule?',
		answer:
			'A custody schedule often describes the broader parenting schedule, including overnight time and recurring custody arrangements. A visitation schedule may refer more specifically to the time a non-primary parent spends with the child. The exact legal terms can vary, but both are easier to understand when shown on a custody calendar.',
	},
	{
		question: 'Can I use a custody calendar to manage visitation schedules?',
		answer:
			'Yes. A custody calendar can help manage a visitation schedule by showing exchange days, weekends, holidays, school breaks, and overnights in one visual parenting calendar. This makes it easier to compare plans and avoid confusion about upcoming parenting time.',
	},
	{
		question: 'What is the best visitation schedule for shared custody?',
		answer:
			'The best visitation schedule for shared custody depends on the child’s age, school routine, distance between homes, and how well parents can handle exchanges. Many families compare 2-2-3, 2-2-5-5, 5-2-2-5, and week on week off parenting schedules before choosing a plan.',
	},
	{
		question: 'What is a 2-2-5-5 custody schedule?',
		answer:
			'A 2-2-5-5 custody schedule is a 50/50 plan where each parent keeps the same two weekdays and weekends alternate through five-day blocks. It is often useful for school-aged children because weekday routines stay predictable.',
		links: [{ label: '2-2-5-5 custody schedule guide', href: '/2-2-5-5-custody-schedule' }],
	},
	{
		question: 'Is 2-2-3 better than 2-2-5-5?',
		answer:
			'2-2-3 is usually better when frequent contact matters most. 2-2-5-5 is usually better when school-week predictability matters more. If homes are close and exchanges are calm, 2-2-3 can work well. If mornings, homework, or activities need consistency, 2-2-5-5 may be easier.',
	},
	{
		question: 'When does week on week off custody work well?',
		answer:
			'Week on week off works best when children are older, homes are reasonably stable, and both parents can handle a full school week. It is simple and predictable, but it may not be ideal for younger children who need more frequent contact with both parents.',
	},
	{
		question: 'How are parenting time percentages calculated?',
		answer:
			'Custody percentages are usually estimated from overnights. For example, about 182 or 183 overnights per year is close to 50/50. A calendar can reveal whether a schedule is truly balanced over time, especially when holidays or school breaks change the normal pattern.',
		links: [
			{ label: 'Calculation methodology', href: '/how-custodybuilder-works' },
			{ label: 'Custody percentage calculator', href: '/custody-percentage-calculator' },
		],
	},
	{
		question: 'What is the best custody schedule for school-aged children?',
		answer:
			'School-aged children often do well with schedules that protect homework, transportation, activities, and predictable school mornings. Many parents compare 2-2-5-5, 5-2-2-5, 60/40, and week on week off options before choosing.',
		links: [
			{ label: '2-2-5-5 custody schedule guide', href: '/2-2-5-5-custody-schedule' },
			{ label: '5-2-2-5 custody schedule guide', href: '/5-2-2-5-custody-schedule' },
		],
	},
	{
		question: 'Can I use CustodyBuilder for mediation?',
		answer:
			'Yes. CustodyBuilder can help you bring a visual calendar, schedule examples, and parenting time percentages into mediation. It does not replace legal advice, but it can make the conversation more concrete than discussing schedule names alone.',
	},
	{
		question: 'Can I compare 50/50, 60/40, and 70/30 custody schedules?',
		answer:
			'Yes. CustodyBuilder includes common 50/50 schedules like 2-2-3, 2-2-5-5, 5-2-2-5, and week on week off, plus 60/40, 70/30, and 80/20 schedule patterns for families comparing unequal parenting time.',
		links: [
			{ label: '50/50 custody schedule guide', href: '/50-50-custody-schedule' },
			{ label: '60/40 custody schedule guide', href: '/60-40-custody-schedule' },
			{ label: '70/30 custody schedule guide', href: '/70-30-custody-schedule' },
		],
	},
	{
		question: 'What if parents live far apart?',
		answer:
			'When homes are far apart, fewer exchanges usually become more important. Week on week off, 5-2-2-5, 70/30, or 80/20 schedules may be easier than high-exchange rotations like 2-2-3. School transportation and activity travel should be considered before choosing.',
	},
	{
		question: 'What should I do after generating a schedule?',
		answer:
			'Review the exchange days, check the overnight split, compare one or two alternatives, then export or print the calendar for discussion. If the schedule may be used in a formal agreement, confirm the details with a qualified professional.',
		links: [{ label: 'Parenting plan template', href: '/parenting-plan-template' }],
	},
	{
		question: 'Can parents outside the US use CustodyBuilder?',
		answer:
			'Yes, the calendar generator can still help compare common parenting-time patterns and printable schedules. Local laws, custody terms, and court expectations vary, so treat the output as planning information and confirm local requirements with a qualified professional.',
		links: [{ label: 'How CustodyBuilder works', href: '/how-custodybuilder-works' }],
	},
];
