export const meta = {
	title: 'Holiday Custody Schedule: Override Rules & Return Dates',
	description:
		'How Thanksgiving, winter break, spring break, and birthdays override your regular custody calendar — with start times, return-to-normal rules, and clause language.',
	datePublished: '2025-03-01',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: [
		'holiday override sequencing',
		'alternating-year rules',
		'school-break timing',
		'parenting-plan clause clarity',
		'calendar-generation accuracy',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'This page explains holiday override architecture on parenting calendars and is not legal advice.',
};

export const hero = {
	headline: 'Holiday Custody Schedule',
	intro:
		'A holiday custody schedule explains when Thanksgiving, winter break, spring break, birthdays, and school holidays override the regular parenting calendar — and how the normal rotation resumes afterward.',
	boundary:
		'Limited-parent holiday access lives on the <a href="/holiday-visitation-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday visitation schedule</a> page. Base rotation mechanics live on pattern guides like the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> hub.',
};

export const heroKeyStats = [
	{ value: 'Override', label: 'holiday rules win' },
	{ value: 'Odd/even', label: 'year rotation' },
	{ value: 'Resume', label: 'return date written' },
];

export const heroTrustSignals = [
	'Free to use',
	'No signup required',
	'Preview base + holidays',
];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Preview base calendar' },
	{ id: 'why-override', label: 'Why overrides exist' },
	{ id: 'order-of-operations', label: 'Order of operations' },
	{ id: 'what-breaks', label: 'What breaks calendars' },
	{ id: 'holidays-to-name', label: 'Holidays to name' },
	{ id: 'clauses', label: 'Clause language' },
	{ id: 'visitation-routing', label: 'Visitation routing' },
	{ id: 'build-calendar', label: 'Build before signing' },
	{ id: 'faq', label: 'FAQ' },
];

export const whyOverride = {
	title: 'Why Holiday Rules Override The Regular Custody Schedule',
	intro:
		'The base rotation — 2-2-5-5, week-on/week-off, or 60/40 — governs ordinary school weeks. Holidays insert blocks the fortnight grid never showed: Thanksgiving Thursday through Sunday, winter break from school release through New Year\'s, spring break as a single unit.',
	body:
		'Without a written override table, parents argue from the regular calendar while the child is already packed for the wrong house. Holiday rules sit above the base schedule in the parenting plan — not beside it.',
};

export const orderOfOperations = {
	title: 'The Order Of Operations: Regular Schedule → Holiday Rule → Return Date',
	intro:
		'Every holiday clause should answer three questions in order: what does the base rotation say, what does the holiday block replace, and when does the regular schedule resume.',
	steps: [
		{
			heading: 'Step 1 — Print the base month',
			body: 'Load your regular pattern in the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a> with your real start date. Mark ordinary exchange days before layering any holiday.',
		},
		{
			heading: 'Step 2 — Apply the holiday block',
			body: 'Thanksgiving may run Wednesday after school through Sunday 6:00 p.m. Winter break may split at noon on December 26. The holiday row replaces base nights inside those exact times.',
		},
		{
			heading: 'Step 3 — Name the return date',
			body: 'School resumes January 6 — does the regular rotation restart that morning or the following Friday? Missing return language produces February disputes from a December order.',
		},
	],
};

export const whatBreaks = {
	title: 'What Usually Breaks A Holiday Custody Calendar',
	intro:
		'Most holiday fights trace to missing times, not missing holiday names.',
	breakdowns: [
		{
			heading: 'Holiday starts before school lets out',
			body: 'Winter break clause says December 20 but school releases December 22 at 2:30 p.m. Write school-release time as the block start — not an arbitrary calendar date.',
		},
		{
			heading: 'Exchange time missing',
			body: 'Thanksgiving assigned to Parent A with no pickup time. Car line at 3:15 and driveway handoff at 5:00 are different parents on paper.',
		},
		{
			heading: 'Christmas Eve / Christmas Day split unclear',
			body: 'Eve with Mom and Day with Dad only works when exchange time on December 25 is written — 9:00 a.m. or after presents, not assumed.',
		},
		{
			heading: 'Regular weekend resumes late',
			body: 'Holiday ends Sunday 6:00 p.m. but base rotation says Parent B starts Friday. Without resume rule, two parents claim the same weekend.',
		},
		{
			heading: 'Birthday inside another parent\'s holiday',
			body: 'Child\'s birthday falls December 27 during Parent A\'s winter-break block. Birthday clause must say whether it pierces the break or waits until school resumes.',
		},
	],
};

export const holidaysToName = {
	title: 'The Holidays Parents Usually Need To Name In Writing',
	intro:
		'Name the holidays that actually move the child — not every federal Monday. Each row needs start time, end time, and odd/even year assignment or split rule.',
	holidays: [
		{ name: 'Thanksgiving', detail: 'Wednesday after school through Sunday exchange — or Thursday-only if travel is local.' },
		{ name: 'Winter break', detail: 'School release through school resume — often split at noon on December 26 or 27.' },
		{ name: 'Christmas Eve / Day', detail: 'Separate rows if parents split the 48 hours; one row if the whole break is assigned.' },
		{ name: 'New Year\'s', detail: 'December 31 pickup through January 1 return — or folded into winter break.' },
		{ name: 'Spring break', detail: 'Full week from school release to school resume — alternate years or split halves.' },
		{ name: 'Summer holidays', detail: 'July 4 block, family reunion week, or first two weeks of summer — separate from winter rules.' },
		{ name: 'Birthdays', detail: 'Child and each parent — dinner window if not an overnight.' },
		{ name: 'Long weekends', detail: 'MLK, Presidents\' Day, Memorial Day — only if they change exchange from the base rotation.' },
		{ name: 'School closures', detail: 'Snow days and teacher workdays when both parents work — who covers the unexpected off day.' },
	],
};

export const clauses = {
	title: 'Holiday Clauses That Prevent Calendar Fights',
	intro:
		'Operational language beats tradition language. Each holiday row should carry the same fields.',
	fields: [
		{
			heading: 'Start time',
			body: 'School release on the last day before break, or a fixed clock time on the holiday eve.',
		},
		{
			heading: 'End time',
			body: 'Sunday 6:00 p.m., Monday school drop-off, or noon on the split day — written, not assumed.',
		},
		{
			heading: 'Alternating years',
			body: 'Parent A in odd years, Parent B in even years — with the year the order was signed noted as year one if needed.',
		},
		{
			heading: 'Exchange location',
			body: 'School, curbside, or neutral site — especially when holiday travel crosses state lines.',
		},
		{
			heading: 'Return-to-regular schedule',
			body: 'Resume base rotation on the next scheduled exchange after the holiday ends — or name a one-time flip if the holiday consumed a full week block.',
		},
		{
			heading: 'Tie-breaker when holidays overlap',
			body: 'Birthday on Thanksgiving weekend — which clause wins? Write priority: specific holiday beats general weekend.',
		},
	],
	closing:
		'Draft clauses in the <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a> before mediation ends.',
};

export const visitationRouting = {
	title: 'When A Holiday Issue Is Really A Visitation Issue',
	intro:
		'Override architecture assumes both parents already hold regular overnight blocks. When one parent only has every-other-weekend or 20% time, holiday access is a different problem — gap length, make-up weekends, and travel distance.',
	routes: [
		{
			heading: 'Every-other-weekend parent',
			body: 'Holiday may be the only December overnight. Route to <a href="/holiday-visitation-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday visitation schedule</a> and <a href="/every-other-weekend-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">every-other-weekend custody schedule</a>.',
		},
		{
			heading: '80/20 or long-gap parent',
			body: 'Thanksgiving dinner without an overnight may be the only access in November. See <a href="/80-20-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">80/20 custody schedule</a> and visitation holiday access rules.',
		},
		{
			heading: 'Equal-time parents',
			body: 'You need override tables, not visitation make-up language. Stay on this page and the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 hub</a>.',
		},
	],
};

export const buildCalendar = {
	title: 'Build A Holiday Calendar Before You Sign The Plan',
	body: 'Print the base rotation, then build the holiday override table for your year. Match school-district release dates — not generic federal calendars.',
};

export const postContentCta = {
	heading: 'Attach The Holiday Table To Your Parenting Plan',
	body: 'Save the base calendar PDF and holiday override table together. Name return-to-normal dates for winter break before signing.',
	primaryHref: '/parenting-plan-template/',
	primaryLabel: 'Open parenting plan template',
	secondaryHref: '/custody-schedule-by-age/',
	secondaryLabel: 'Custody schedule by age',
};

export const faqSection = {
	title: 'Holiday custody override FAQ',
	description: 'Answers about override rules, alternating years, and return dates — not limited-parent visitation access.',
};

export const faqItems = [
	{
		question: 'Does a holiday schedule override the regular custody calendar?',
		answer:
			'Yes — when the parenting plan says holiday parenting time controls. The holiday block replaces base nights between the written start time and end time. After the end time, the return-to-regular rule governs.',
	},
	{
		question: 'How do alternating years work for Thanksgiving and Christmas?',
		answer:
			'Odd-numbered years to Parent A and even-numbered years to Parent B is the most common table format. Write whether the year the order is signed counts as year one. Apply the same parity to spring break if it alternates.',
	},
	{
		question: 'How should parents split Christmas Eve and Christmas Day?',
		answer:
			'Use two rows with an exchange time on December 25 — often 9:00 a.m. or noon. Eve-only and Day-only splits fail when pickup on the 24th and return on the 26th are not both written.',
	},
	{
		question: 'When does winter break start and end?',
		answer:
			'Start at school release on the last day before break. End at school resume on the first day back — or at a written exchange time the night before. District calendars differ; copy the school district dates into the plan.',
	},
	{
		question: 'What is a return-to-normal schedule clause?',
		answer:
			'It names which parent resumes the base rotation after the holiday block ends — usually the next scheduled exchange on the regular pattern. Without it, parents argue from the holiday table through January.',
	},
	{
		question: 'What happens when a birthday falls inside another parent\'s holiday block?',
		answer:
			'Write priority: child birthday dinner window pierces the break, or birthday waits until the base rotation resumes. Unwritten overlap produces same-day text-message swaps.',
	},
	{
		question: 'Should school spring break follow the same rules as winter break?',
		answer:
			'It can, but many plans alternate spring break by year while splitting winter break in half. Use the same start-time and school-resume fields — do not copy winter dates onto March.',
	},
	{
		question: 'Where do I preview the base calendar before adding holidays?',
		answer:
			'Load your regular pattern in the generator with your start date and parent labels. Print the school-year months first, then layer the holiday table from the planner below.',
	},
];
