export const meta = {
	title: 'CustodyBuilder | Build Custody Calendars, Schedules & Planning Tools',
	description:
		'Build custody schedules on a real calendar — school nights, holiday overrides, exchange dates, overnight percentages, and parenting-plan exhibits. Tool-first, reviewed methodology, not legal advice.',
	dateModified: '2026-06-25',
};

export const hero = {
	eyebrow: 'Calendar-first custody planning',
	headline: 'Build custody schedules that work on a real calendar',
	intro:
		'Create dated custody calendars around school nights, holiday overrides, exchange dates, and parenting-plan deadlines. Run overnight percentages, log actual visitation, and export printable exhibits — educational planning tools, not legal advice.',
	primaryCta: { label: 'Build a custody calendar', href: '/custody-schedule-generator/' },
	secondaryCta: { label: 'See how the tools work', href: '/how-custodybuilder-works/' },
};

export const startWithTool = {
	title: 'Start With The Right Tool',
	intro: 'Each tool owns one planning question. Pick the page that matches what you need to calculate or print.',
	tools: [
		{
			label: 'Build a custody calendar',
			question: 'Which parent has Tuesday night on a 2-2-3 rotation?',
			href: '/custody-schedule-generator/',
			detail: 'Rotation ID → dated month grid → exchange markers → PDF export',
			accent: 'calendar',
		},
		{
			label: 'Calculate overnight percentages',
			question: 'What is the annual overnight split from my counts?',
			href: '/custody-percentage-calculator/',
			detail: 'Overnight totals → Parent A % and Parent B % on a 365-night year',
			accent: 'percent',
		},
		{
			label: 'Track actual visitation',
			question: 'Did actual overnights match the plan this quarter?',
			href: '/visitation-calculator/',
			detail: 'Planned vs actual overnights + missed-visit count over a tracking period',
			accent: 'log',
		},
		{
			label: 'Estimate Texas child support',
			question: 'What does Texas guideline math produce from net resources?',
			href: '/texas-child-support-calculator/',
			detail: 'Gross income → net resources → guideline percentage — separate from custody %',
			accent: 'texas',
		},
	],
};

export const howItWorks = {
	title: 'How CustodyBuilder Works',
	intro: 'Three steps from planning question to printable output — full methodology is documented separately.',
	steps: [
		{
			step: '1',
			heading: 'Choose the planning problem',
			body: 'Equal-time pattern, age-specific logistics, holiday overrides, overnight counts, or agreement clauses — each cluster page owns one question.',
		},
		{
			step: '2',
			heading: 'Build or calculate with the tool',
			body: 'Generator renders exchange dates on month cells. Calculators apply documented formulas. Templates outline clause structure without duplicating calendar math.',
		},
		{
			step: '3',
			heading: 'Print or carry into a parenting plan',
			body: 'Export PDF calendars for mediation prep. Attach percentage outputs and schedule exhibits to parenting-plan drafts — confirm filing format locally.',
		},
	],
	link: { label: 'Full methodology & review standards', href: '/how-custodybuilder-works/' },
};

export const chooseBySituation = {
	title: 'Choose By Situation',
	intro: 'Route by the planning problem — not by pattern name alone.',
	routes: [
		{ label: '50/50 custody schedule', href: '/50-50-custody-schedule/', detail: 'Equal-time block length and exchange frequency comparison' },
		{ label: 'Custody schedule by age', href: '/custody-schedule-by-age/', detail: 'Infant step-up through teen school-year logistics' },
		{ label: 'Holiday custody schedule', href: '/holiday-custody-schedule/', detail: 'Holiday override tables on the base rotation' },
		{ label: 'Parenting plan template', href: '/parenting-plan-template/', detail: 'Agreement clauses, exhibits, and schedule attachment points' },
	],
};

export const exploreByChildStage = {
	title: 'Explore By Child Stage',
	intro: 'One operational phrase per age guide — full logistics live on each page.',
	stages: [
		{ label: 'Toddler', href: '/best-custody-schedule-for-toddler/', phrase: 'Nap windows and short block handoffs' },
		{ label: '5-year-old', href: '/best-custody-schedule-for-5-year-old/', phrase: 'Kindergarten pickup and weekday stability' },
		{ label: '7-year-old', href: '/best-custody-schedule-for-7-year-old/', phrase: 'After-school activities and homework nights' },
		{ label: 'Teenager', href: '/best-custody-schedule-for-teenager/', phrase: 'Driver schedules and flexible exchange times' },
	],
};

export const popularGuides = {
	title: 'Popular Schedule Guides',
	intro: 'Six rotation starting points — each guide owns one pattern ID. No rankings on this page.',
	guides: [
		{ label: '2-2-3', href: '/2-2-3-custody-schedule/', tag: '4 exchanges / fortnight' },
		{ label: '2-2-5-5', href: '/2-2-5-5-custody-schedule/', tag: 'Fixed weekdays' },
		{ label: 'Week on / week off', href: '/week-on-week-off-custody-schedule/', tag: '1 exchange / fortnight' },
		{ label: 'Every other weekend', href: '/every-other-weekend-custody-schedule/', tag: 'Visitation blocks' },
		{ label: '60/40', href: '/60-40-custody-schedule/', tag: 'Primary + extended time' },
		{ label: '80/20', href: '/80-20-custody-schedule/', tag: 'Primary residence model' },
	],
};

export const planningDocuments = {
	title: 'Planning Documents And Templates',
	intro: 'Four template pages — each owns a different document layer. Generator mechanics stay on the tool page.',
	documents: [
		{ label: 'Custody schedule template', href: '/custody-schedule-template/', detail: 'Rotation rules, exchanges, summer placeholders' },
		{ label: 'Custody calendar template', href: '/custody-calendar-template/', detail: 'Printable month grid and parent color coding' },
		{ label: 'Parenting plan template', href: '/parenting-plan-template/', detail: 'Agreement sections and clause hierarchy' },
		{ label: 'Texas parenting plan template', href: '/texas-parenting-plan-template/', detail: 'SPO calendar, 100-mile rules, summer notice' },
	],
};

export const whyDifferent = {
	title: 'Why CustodyBuilder Is Different',
	points: [
		{ heading: 'Calendar-first', body: 'Rotation patterns render as dated overnight cells — exchange markers show handoff days before pattern names get argued.' },
		{ heading: 'Tool-first', body: 'Generator, calculators, and templates load above the fold. Editorial copy explains how to read output, not how to find a download button.' },
		{ heading: 'Reviewed methodology', body: 'Calculator formulas, exchange-day logic, and cluster ownership rules are documented on the how-it-works page and reviewed on publish.' },
		{ heading: 'Printable outputs', body: 'Month grids export with color keys and parent labels for mediation prep and parenting-plan exhibits.' },
		{ heading: 'Educational boundaries', body: 'Planning material only — not court orders, case strategy, or filing advice. Disclaimers on every tool and guide page.' },
		{ heading: 'Cluster-specific guides', body: 'Age guides do not repeat 50/50 rankings. Template pages do not duplicate generator mechanics. Holiday overrides defer to the holiday page.' },
	],
};

export const editorialBlock = {
	title: 'Editorial Review & Methodology',
	intro: 'The CustodyBuilder Editorial Team reviews tools and guides before and after publish updates.',
	reviewItems: [
		'Calendar generation — exchange days match the selected rotation ID and start date',
		'Calculator parity — generator overnight summaries align with percentage calculator inputs',
		'Cluster ownership — no duplicate FAQ grids or section titles across age, 50/50, holiday, or template pages',
		'Educational boundaries — disclaimers visible; no legal advice or credential claims',
	],
	boundary: 'Outputs are planning material. Confirm filing format, support determinations, and legal questions with a qualified professional.',
	links: [
		{ label: 'About CustodyBuilder', href: '/about/', detail: 'Who we serve and what we do not do' },
		{ label: 'How CustodyBuilder works', href: '/how-custodybuilder-works/', detail: 'Formulas, review checklist, correction process' },
		{ label: 'Contact & corrections', href: '/contact/', detail: 'Tool bugs, calculator discrepancies, editorial feedback' },
	],
};

export const faqSection = {
	title: 'Homepage FAQ',
	description: 'Site-level questions only — rotation specifics live on pattern guides.',
};

export const faqItems = [
	{
		question: 'What is CustodyBuilder?',
		answer: 'Custody planning tools and educational guides: calendar generator, percentage calculator, visitation log, Texas support estimate, templates, and age-specific schedule guides. Each page owns one search intent.',
	},
	{
		question: 'Which tool should I use first?',
		answer: 'Use the custody schedule generator if you need dated exchange days on a month grid. Use the percentage calculator if you already have overnight counts. Use the visitation calculator to compare planned vs actual overnights.',
	},
	{
		question: 'Is CustodyBuilder legal advice?',
		answer: 'No. Planning and education only. Tool outputs are not court orders. Confirm filing format and legal questions with a qualified professional in your jurisdiction.',
	},
	{
		question: 'How are calendars and calculators reviewed?',
		answer: 'The editorial team checks exchange-day accuracy, calculator formula parity, internal link routing, and educational disclaimers. Methodology is documented on the how-it-works page.',
	},
	{
		question: 'Do I need an account?',
		answer: 'No. Tools run in the browser without signup or payment.',
	},
	{
		question: 'Where are Texas-specific tools?',
		answer: 'Texas child support calculator applies guideline percentages to net resources. Texas parenting plan template owns SPO calendar planning. Both are separate from generic custody tools.',
	},
	{
		question: 'How do I report an error?',
		answer: 'Email hello@custodybuilder.com through the contact page with page URL, inputs used, and expected vs actual output. Calculator issues are verified against documented formulas.',
	},
];
