export const meta = {
	title: 'Stuck Between Two 50/50 Schedules? Elimination Guide',
	description:
		'Narrowed to two equal-time patterns? Print both calendars, mark conflict days, and eliminate one finalist before updating your parenting plan.',
	datePublished: '2026-06-24',
	dateModified: '2026-06-24',
};

export const editorialReview = {
	reviewedFor: [
		'two-pattern elimination workflow',
		'conflict-day counting on printed calendars',
		'non-negotiables before final selection',
		'calendar-generation accuracy',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	lastReviewed: 'July 2026',
	body: 'This page was reviewed for accuracy of overnight count ranges, schedule pattern names, and alignment with typical court-accepted custody arrangements. Percentage figures were verified against CustodyBuilder\'s schedule generator output.',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'This page explains how to eliminate one finalist between two equal-time calendars and is not legal advice.',
};

export const hero = {
	headline: 'How to Choose Between Two 50/50 Custody Schedules',
	intro:
		'You already narrowed equal time to two finalists — maybe 2-2-3 vs 2-2-5-5, or 2-2-5-5 vs week-on/week-off. This page eliminates one. Print both rotations with the same start date and count conflict days, not parenting percentages.',
	boundary:
		'First-round branching lives on the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> hub. Pattern mechanics live on individual pattern guides. Real-world breakdown stories live on the <a href="/50-50-custody-schedule-examples/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 schedule examples</a> page.',
};

export const heroKeyStats = [
	{ value: '2', label: 'finalists only' },
	{ value: 'Mark', label: 'conflict days' },
	{ value: 'Drop', label: 'one pattern' },
];

export const heroTrustSignals = [
	'Free to use',
	'No signup required',
	'Print both finalists',
];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Print both calendars' },
	{ id: 'two-survive', label: 'Two finalists' },
	{ id: 'non-negotiables', label: 'Non-negotiables' },
	{ id: 'print-both', label: 'Print before choosing' },
	{ id: 'conflict-days', label: 'Count conflicts' },
	{ id: 'break-tie', label: 'Break the tie' },
	{ id: 'both-fail', label: 'When both fail' },
	{ id: 'methodology', label: 'How we evaluate' },
	{ id: 'faq', label: 'FAQ' },
];

export const twoSurvive = {
	title: 'When Two Schedules Survive The First Round',
	intro:
		'The hub ruled out patterns that fail on distance, block length, or exchange load. Two rotations still fit on paper. The tie-breaker is not which pattern wins online — it is which calendar produces fewer conflict days on your child\'s actual month.',
	pairs: [
		{
			heading: '2-2-3 vs 2-2-5-5',
			body: 'Contact frequency vs fixed weekdays. Print both with the same Monday start and mark every Tuesday activity, Wednesday homework night, and Friday folder signature.',
			links: [
				{ label: '2-2-3 guide', href: '/2-2-3-custody-schedule/' },
				{ label: '2-2-5-5 guide', href: '/2-2-5-5-custody-schedule/' },
			],
		},
		{
			heading: '2-2-5-5 vs week-on/week-off',
			body: 'Fixed school nights vs one weekly exchange. Count how many recurring activities land on exchange weeks in each printed month.',
			links: [
				{ label: '2-2-5-5 guide', href: '/2-2-5-5-custody-schedule/' },
				{ label: 'Week-on/week-off guide', href: '/week-on-week-off-custody-schedule/' },
			],
		},
		{
			heading: '5-2-2-5 vs week-on/week-off',
			body: 'School-week block ownership vs seven-day stretches. Mark whether the five-day block parent can cover every recurring weekday activity in the fortnight.',
			links: [
				{ label: '5-2-2-5 guide', href: '/5-2-2-5-custody-schedule/' },
				{ label: 'Week-on/week-off guide', href: '/week-on-week-off-custody-schedule/' },
			],
		},
	],
};

export const nonNegotiables = {
	title: 'Write Down Your Non-Negotiables',
	intro:
		'Before printing, list what cannot move. A finalist that violates a non-negotiable loses — even if the overnight split looks cleaner.',
	items: [
		{
			heading: 'Maximum exchanges per fortnight',
			body: 'Three midweek handoffs may be the ceiling. If 2-2-3 prints four exchange days in fourteen days, it fails before you count activities.',
		},
		{
			heading: 'School-night ownership rule',
			body: 'Does Tuesday always belong to the same parent? Rotating Tuesdays disqualify a pattern when piano, tutoring, or folder signatures recur weekly.',
		},
		{
			heading: 'Longest block the child tolerates',
			body: 'Five nights away from one parent may be the limit at age seven. A finalist with a seven-day block fails that test even with fewer exchanges.',
		},
		{
			heading: 'Activity driver assignment',
			body: 'Name who drives Tuesday practice and Thursday music on the printed month. If the calendar assigns the wrong parent three weeks in a row, mark a conflict.',
		},
	],
};

export const printBoth = {
	title: 'Print Both Calendars Before Choosing',
	intro:
		'Use the generator with the same start date and parent labels for each finalist. Switch patterns in the dropdown — do not guess from a two-week mini grid.',
	steps: [
		'Pick finalist A, set start date to next Monday, print or save PDF.',
		'Switch to finalist B with identical start date and parent names.',
		'Lay both months side by side — or toggle in the preview while marking conflicts.',
	],
	closing:
		'Run totals through the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a> after conflict marking — equal labels on paper can drift once holidays attach.',
};

export const conflictDays = {
	title: 'Count Conflict Days, Not Parenting Days',
	intro:
		'A conflict day is any weekday where the printed rotation collides with a non-negotiable: exchange on practice night, rotating Tuesday when piano is fixed, or a five-day block longer than the child tolerates.',
	markers: [
		{
			heading: 'Exchange on activity night',
			body: 'Driveway handoff at 5:00 when warm-up starts at 5:30 — mark the day.',
		},
		{
			heading: 'Rotating homework owner',
			body: 'Spelling due Wednesday but Wednesday alternates parents — mark every Wednesday in the month.',
		},
		{
			heading: 'Block length breach',
			body: 'Seven nights with one parent when five is the written maximum — mark the block start through end.',
		},
		{
			heading: 'Holiday override gap',
			body: 'Thanksgiving table assigns Parent A while the base rotation says Parent B — mark override days separately; see <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> planning.',
		},
	],
	threshold:
		'If one finalist shows three or more conflict days in a typical school month and the other shows one, drop the heavier calendar. If counts tie, use the break-tie steps below.',
};

export const breakTie = {
	title: 'How To Break A Tie Between Two Schedules',
	intro:
		'Equal conflict counts mean the decision moves from the calendar to the child\'s stage and the parents\' logistics — not to a third pattern ranking.',
	steps: [
		{
			heading: 'Age and separation tolerance',
			body: 'A child who regresses after four nights away loses the finalist with longer blocks. Route toddler transition limits to the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for toddler</a> guide before reprinting.',
		},
		{
			heading: 'School-night fixity',
			body: 'When homework and activities need the same parent every Tuesday, the finalist with fixed weekdays wins the tie — even if exchanges are equal.',
		},
		{
			heading: 'Parent commute reality',
			body: 'Count drive minutes on each exchange day in the printed month. The finalist with fewer rush-hour drives wins when conflict counts match.',
		},
		{
			heading: 'Written resume clause',
			body: 'Pick the finalist with fewer conflicts and add a six-month review date in the <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a> — not an informal swap mid-semester.',
		},
	],
};

export const bothFail = {
	title: 'When Both Schedules Fail',
	intro:
		'Two finalists with conflict counts above your threshold mean equal time on these patterns may not fit this year — not that co-parenting failed.',
	outcomes: [
		{
			heading: 'Shift to 60/40 or 70/30',
			body: 'Longer blocks with fewer exchanges when distance or shift work breaks every 50/50 finalist. Compare on the <a href="/60-40-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">60/40 custody schedule</a> page or the <a href="/70-30-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">70/30 custody schedule</a> page.',
		},
		{
			heading: 'Revisit age-specific logistics',
			body: 'School-night ownership on equal time may need mapping first on the <a href="/50-50-custody-schedule-for-school-age-children/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 school-age guide</a> before any pattern survives.',
		},
		{
			heading: 'Scenario matched a known failure',
			body: 'Tuesday piano on 2-2-3 is a documented misfire — read the <a href="/50-50-custody-schedule-examples/#school-activities" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">school activity collision</a> scenario before picking either finalist blindly.',
		},
	],
};

export const methodology = {
	title: 'How CustodyBuilder Evaluates Finalists',
	paragraphs: [
		'Finalist evaluation uses four tests on printed months: conflict-day count against written non-negotiables, school-night ownership stability, longest separation block vs child tolerance, and exchange-day drive time.',
		'We do not rank patterns against each other site-wide. The hub eliminates round one; this page eliminates round two; pattern guides document how each rotation works mechanically.',
	],
};

export const postContentCta = {
	heading: 'Document The Finalist You Kept',
	body: 'After conflict marking, save the winning calendar PDF and note the review date in your parenting plan. If the loser had fewer exchanges but more conflict days, write why conflict count governed the choice.',
	primaryHref: '/parenting-plan-template/',
	primaryLabel: 'Update parenting plan',
	secondaryHref: '/50-50-custody-schedule/',
	secondaryLabel: 'Back to 50/50 hub',
};

export const faqSection = {
	title: 'Questions about eliminating one finalist',
	description: 'Answers about tie-breaking two equal-time calendars — not pattern rankings or example galleries.',
};

export const faqItems = [
	{
		question: 'I narrowed it to two schedules. What now?',
		answer:
			'List non-negotiables, print both calendars with the same start date, and mark conflict days on each month. Drop the finalist with more conflicts against your list. Pattern guides explain mechanics; this page governs elimination.',
	},
	{
		question: 'How many conflict days are too many?',
		answer:
			'There is no universal number. If one finalist shows three activity-exchange collisions in a school month and the other shows zero, the heavier calendar loses. Write your threshold before printing so the decision is not argued afterward.',
	},
	{
		question: 'Can age break a tie between two finalists?',
		answer:
			'Yes. Equal conflict counts go to separation tolerance and school-night fixity. A seven-year-old who melts down after five nights away eliminates a week-long block finalist even if exchanges are fewer.',
	},
	{
		question: 'What if both finalists create problems?',
		answer:
			'Both calendars failing conflict tests signals equal time on these patterns may not fit this season. Compare 60/40 or revisit school-night ownership on the school-age 50/50 guide before forcing a label.',
	},
	{
		question: 'Should I compare holidays before deciding?',
		answer:
			'Mark base-month conflicts first. Then layer Thanksgiving or winter break overrides on the finalist that survived — a rotation that works in October may fail in December without holiday rules.',
	},
	{
		question: 'How do I document the final choice?',
		answer:
			'Attach the winning PDF, list non-negotiables met, name the review date, and note why the eliminated finalist lost on conflict count. Use the parenting plan template for the written clause.',
	},
];
