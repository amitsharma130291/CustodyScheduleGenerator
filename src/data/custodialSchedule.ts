export const meta = {
	title: 'Custodial Schedule: Types, Examples & Free Calendar',
	description:
		'What a custodial schedule is, the main types (50/50, 2-2-3, every-other-weekend and more), real examples, and a free tool to build your own calendar.',
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

export const hero = {
	headline: 'Custodial Schedule: Types, Examples, and How to Build One',
	trustChips: [
		'Plain-English planning guide',
		'Free interactive calendar',
		'Educational only, not legal advice',
	],
	intro:
		'A custodial schedule is the written plan that says which parent a child is with on any given day, night, holiday, and school break. This guide explains the common types, shows real examples with visual calendars, and lets you build your own.',
	boundary:
		'Every family is different, and family law varies by state. Use this page to understand the options, then build a calendar you can share and adjust.',
};

export const definition = {
	title: 'What is a custodial schedule?',
	intro:
		'A custodial schedule is the plan that sets out where a child sleeps and which parent has them across the week, holidays, and summer. People also call it a parenting-time schedule, a custody schedule, a possession schedule, or a visitation schedule. When a court is involved, the schedule is usually written into a parenting plan or custody order that both parents follow.',
	subsections: [
		{
			id: 'terms',
			heading: 'Custodial schedule vs. custody, parenting time, and visitation',
			body: '"Visitation" is an older term for one parent\'s scheduled time with a child. Many courts and states now say "parenting time" instead. A custodial schedule is the wider plan that covers everyone\'s time, not just one parent\'s blocks. The exact words vary by state: some states treat custody and visitation as separate legal statuses, while others use "custody" to mean each parent has significant time. Either way, the order lays out a schedule to follow.',
		},
		{
			id: 'legal-physical',
			heading: 'Legal custody vs. physical custody',
			body: 'Physical custody is about where the child lives and sleeps. It can be joint (the child spends substantial time with both parents) or primary (the child lives mostly with one parent). Legal custody is separate: it covers who makes major decisions about school, medical care, and religion. This page is about the time schedule, not decision-making, so keep the two ideas apart when you plan.',
		},
		{
			id: 'custodial-parent',
			heading: 'Custodial vs. non-custodial parent',
			body: 'In a primary-custody arrangement, the custodial parent has the child most of the time and the non-custodial parent has scheduled parenting time. In a 50/50 arrangement the labels matter less, and often only come up for tax or child-support classification. Courts usually measure each parent\'s share by counting overnights rather than daytime hours.',
		},
	],
};

export const fiftyFiftyTable = {
	title: '50/50 (equal-time) schedules',
	intro:
		'In a 50/50 arrangement the child spends roughly equal time with each parent. These are the common variants, ordered from most frequent contact to fewest transitions.',
	columns: ['Schedule', 'Pattern', 'Split', 'Transitions / 2 weeks', 'Longest stretch', 'Commonly considered for'],
	rows: [
		{
			name: '2-2-3',
			href: '/2-2-3-custody-schedule/',
			pattern: '2 nights A, 2 nights B, 3 nights A, then it flips',
			split: '50/50',
			transitions: '6',
			longest: '3 nights',
			bestFit: 'Younger children (roughly 2 to 8): frequent contact, short stretches',
		},
		{
			name: '2-2-5-5',
			href: '/2-2-5-5-custody-schedule/',
			pattern: '2 A, 2 B, 5 A, 5 B',
			split: '50/50',
			transitions: '4',
			longest: '5 nights',
			bestFit: 'Roughly 6 to 14: each parent always keeps the same two weekdays',
		},
		{
			name: '5-2-2-5',
			href: '/5-2-2-5-custody-schedule/',
			pattern: '5 A, 2 B, 2 A, 5 B (mirror of 2-2-5-5)',
			split: '50/50',
			transitions: '4',
			longest: '5 nights',
			bestFit: 'Roughly 6 to 14: good when one parent has a fixed weekday off',
		},
		{
			name: '3-4-4-3',
			href: '/3-4-4-3-custody-schedule/',
			pattern: '3 A, 4 B, 4 A, 3 B',
			split: '50/50',
			transitions: '4',
			longest: '4 nights',
			bestFit: 'Roughly 4 to 12: balances short stretches with fewer handoffs',
		},
		{
			name: 'Week-on-week-off',
			href: '/week-on-week-off-custody-schedule/',
			pattern: '7 nights A, 7 nights B (often plus a midweek dinner or overnight)',
			split: '50/50',
			transitions: '2',
			longest: '7 nights',
			bestFit: 'Teens (11+): fewest transitions, longest stretches',
		},
	],
};

export const primaryTable = {
	title: 'Primary-custody schedules',
	intro:
		'In a primary-custody arrangement the child lives mainly with one parent, and the other parent has regular parenting time. More overnights with the second parent means a higher parenting-time percentage.',
	columns: ['Schedule', 'Rough split', 'Description'],
	rows: [
		{
			name: '60/40',
			href: '/60-40-custody-schedule/',
			split: '~60/40',
			description:
				'One parent has the child a few more nights each two-week cycle, often through extended every-other-weekend blocks plus a midweek overnight.',
		},
		{
			name: '70/30',
			href: '/70-30-custody-schedule/',
			split: '~70/30',
			description:
				'The primary parent has most nights; the other parent has alternating weekends plus one weeknight overnight.',
		},
		{
			name: '80/20',
			href: '/80-20-custody-schedule/',
			split: '~80/20',
			description:
				'The classic every-other-weekend pattern, often with one midweek visit. One of the most common court-ordered arrangements.',
		},
		{
			name: 'Every other weekend',
			href: '/every-other-weekend-custody-schedule/',
			split: '~80/20',
			description:
				'The non-primary parent has alternating Friday to Sunday, sometimes with a weekday dinner. This is what many people picture as standard visitation.',
		},
	],
};

export const chooseFactors = {
	title: 'How to choose: age, distance, conflict, and work schedules',
	intro:
		'Four levers decide which schedule fits. Weigh them together rather than copying another family\'s plan.',
	factors: [
		{
			heading: "Child's age",
			body: 'Very young children often do better with frequent contact and short stretches away from either parent. Older children and teens usually cope well with longer blocks and fewer handoffs.',
		},
		{
			heading: 'Distance between homes',
			body: 'Frequent transitions only work when parents live close together and share a school zone. Longer distances point toward fewer, longer blocks.',
		},
		{
			heading: 'Conflict level',
			body: 'Fewer handoffs mean fewer chances for friction, so lower-transition schedules are often favored when communication is strained.',
		},
		{
			heading: 'Work schedules',
			body: 'Fixed weekday patterns (like 2-2-5-5) suit parents with predictable hours. Shift work or travel may point toward weekend-weighted or week-on-week-off plans.',
		},
	],
};

// Fictional illustrative families for the visual examples section (research §5).
export const examples = [
	{
		id: '2255',
		scheduleId: '2255',
		title: 'Close-by parents, 6-year-old, low conflict',
		schedule: '2-2-5-5',
		href: '/2-2-5-5-custody-schedule/',
		body: 'The Rivera parents live ten minutes apart and in the same school zone. With 2-2-5-5, each parent always keeps the same two weekdays and they alternate long weekends. The pattern is predictable for a school-age child, and each home holds a steady weekday routine.',
	},
	{
		id: 'eow',
		scheduleId: 'every-other-weekend',
		title: 'One parent travels for work, 9-year-old',
		schedule: 'every other weekend (80/20) plus a Wednesday dinner',
		href: '/every-other-weekend-custody-schedule/',
		body: 'The Chen family keeps the 9-year-old\'s weekday base with the primary parent for school stability. The traveling parent takes alternating full weekends plus a midweek dinner, then scales up to longer blocks in summer when weekday logistics ease.',
	},
	{
		id: 'wowo',
		scheduleId: 'week-on-week-off',
		title: 'Two teens, cooperative parents, homes 25 minutes apart',
		schedule: 'week-on-week-off',
		href: '/week-on-week-off-custody-schedule/',
		body: 'The Okafor teens split time week-on-week-off. The long blocks suit busy teenage schedules and independence, while a shared calendar and a midweek check-in keep both parents in the loop.',
	},
];

export const overnights = {
	title: 'Custodial time, overnights, and percentages',
	intro:
		'Courts most often measure parenting time in overnights per year and turn that into a percentage. Roughly, a 50/50 plan works out to about 182 or 183 overnights each, while an 80/20 plan leaves the lesser parent around 73 overnights a year.',
	body: 'The percentage can matter for child-support calculations in many states once a parent passes a shared-parenting threshold. Those thresholds are state-specific, so treat any figure as general information and check your own state. To estimate a split for planning, use the tools below rather than counting by hand.',
	note: 'Many courts count overnights to work out each parent\'s share of time. A calculator estimates this for planning; your court or state may count differently.',
};

export const holidaysSection = {
	title: 'Holidays, school breaks, and summer',
	intro:
		'A complete custodial schedule overrides the regular rotation for holidays, school breaks, and summer. Holidays are usually alternated by year (one parent has Thanksgiving in even years, the other in odd) or split (Christmas Eve versus Christmas Day).',
	body: 'Summer often shifts the pattern, with longer blocks or a set number of vacation weeks for each parent, because school-year weekday logistics no longer apply. Plan holidays and summer separately from the weekly rotation so nothing is left to chance.',
};

export const byAgeSection = {
	title: "Custodial schedules by child's age",
	intro:
		'Age is one of the strongest signals for which schedule fits. The guidance below is commonly considered, not a fixed rule.',
	bands: [
		{ label: 'Under ~3 (infants and toddlers)', body: 'Frequent contact and short time away from either parent; long stretches are generally discouraged.' },
		{ label: 'Preschool ~3 to 5', body: 'Short, predictable rotations where consistency matters most.' },
		{ label: 'School-age ~6 to 12', body: 'Weekday school consistency matters; 2-2-5-5, 5-2-2-5, and 3-4-4-3 are popular.' },
		{ label: 'Teens 13+', body: 'Longer blocks and fewer transitions, with the teen\'s own activities and preferences carrying more weight.' },
	],
};

export const goodSchedule = {
	title: 'What makes a good custodial schedule (and common mistakes)',
	hallmarks: [
		'Matches the child\'s age and developmental needs.',
		'Is realistic about the distance between homes and school.',
		'Accounts for both parents\' work schedules (fixed hours versus shift work).',
		'Spells out exchanges: time, place, and who transports.',
		'Covers holidays, birthdays, school breaks, and summer, not just the weekly rotation.',
		'Has a plan for changes and disputes, including how to swap days and give notice.',
		'Is written down clearly enough that two people who disagree can still follow it.',
	],
	mistakes: [
		'Planning only the weekly rotation and forgetting holidays and summer.',
		'Choosing a high-transition schedule when parents live far apart or conflict is high.',
		'Ignoring the child\'s age (for example, week-on-week-off for a toddler).',
		'Vague exchange terms ("sometime Sunday") that invite conflict.',
		'Copying another family\'s schedule without checking it fits the real work and school reality.',
	],
};

export const relatedLinks = [
	{ label: '50/50 custody schedule guide', href: '/50-50-custody-schedule/' },
	{ label: 'Custody schedule by age', href: '/custody-schedule-by-age/' },
	{ label: 'Holiday custody schedule', href: '/holiday-custody-schedule/' },
	{ label: 'Holiday custody planner', href: '/holiday-custody-planner/' },
	{ label: 'Holiday visitation schedule', href: '/holiday-visitation-schedule/' },
	{ label: 'Custody percentage calculator', href: '/custody-percentage-calculator/' },
	{ label: 'Parenting-time calculator', href: '/parenting-time-calculator/' },
	{ label: 'Visitation calculator', href: '/visitation-calculator/' },
	{ label: 'Schedule comparison tool', href: '/schedule-comparison-tool/' },
	{ label: 'Custody agreement builder', href: '/custody-agreement-builder/' },
	{ label: 'Custody calendar template', href: '/custody-calendar-template/' },
	{ label: 'Custody schedule template', href: '/custody-schedule-template/' },
	{ label: 'Parenting plan template', href: '/parenting-plan-template/' },
	{ label: '50/50 schedule for babies', href: '/50-50-custody-schedule-for-babies/' },
	{ label: '50/50 schedule for toddlers', href: '/50-50-custody-schedule-for-toddlers/' },
	{ label: '50/50 schedule for school-age children', href: '/50-50-custody-schedule-for-school-age-children/' },
	{ label: '50/50 schedule for teenagers', href: '/50-50-custody-schedule-for-teenagers/' },
	{ label: 'Best schedule for a 5-year-old', href: '/best-custody-schedule-for-5-year-old/' },
	{ label: 'Best schedule for a 7-year-old', href: '/best-custody-schedule-for-7-year-old/' },
	{ label: 'Best schedule for a toddler', href: '/best-custody-schedule-for-toddler/' },
	{ label: 'Best schedule for a teenager', href: '/best-custody-schedule-for-teenager/' },
];

export const faqSection = {
	title: 'Custodial Schedule FAQ',
	description:
		'Common questions about custodial schedules, parenting time, and how to build a calendar that fits your family.',
};

export const faqItems = [
	{
		question: 'What is a custodial schedule?',
		answer:
			'A custodial schedule is a written plan showing which parent a child is with each day, night, holiday, and school break. It is also called a parenting-time, custody, or visitation schedule.',
	},
	{
		question: "What's the difference between a custodial schedule and visitation?",
		answer:
			'"Visitation" is an older term for one parent\'s scheduled time; many states now say "parenting time." A custodial schedule is the overall plan that includes everyone\'s time. The exact terms vary by state.',
	},
	{
		question: 'What are the most common custodial schedules?',
		answer:
			'Common 50/50 options include 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on-week-off. Common primary-custody options include every other weekend (about 80/20), 70/30, and 60/40.',
	},
	{
		question: 'What is the best custodial schedule?',
		answer:
			'There is no single best schedule. It depends on the child\'s age, how far apart the parents live, the conflict level, and both work schedules. Guidance by age can help you narrow the options.',
	},
	{
		question: 'How is custodial time or parenting-time percentage calculated?',
		answer:
			'Courts usually count overnights per year and turn that into a percentage. A free calculator can estimate it for planning, though your state may count time differently.',
	},
	{
		question: 'What custodial schedule is best for young children?',
		answer:
			'Younger children often do better with frequent contact and short stretches away from either parent, such as 2-2-3. Teens often prefer fewer transitions, such as week-on-week-off. This is commonly considered rather than a rule.',
	},
	{
		question: 'Do custodial schedules change for holidays and summer?',
		answer:
			'Yes. A complete schedule usually overrides the weekly rotation for holidays (alternated or split) and summer (often longer blocks or a set number of vacation weeks).',
	},
	{
		question: 'How do I make my own custodial schedule?',
		answer:
			'Pick a pattern that fits your child\'s age and your logistics, add holidays and summer, spell out exchanges, and put it in writing. A free generator can build a shareable calendar for you.',
	},
	{
		question: 'Is a custodial schedule legally binding?',
		answer:
			'A schedule becomes enforceable when a court includes it in an order or parenting plan. Until then it is a plan the parents agree to follow. Laws vary by state, so check your own jurisdiction.',
	},
];
