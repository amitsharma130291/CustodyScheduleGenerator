export const meta = {
	title: 'How CustodyBuilder Works | Methodology & Review Standards',
	description:
		'How custody calendars are generated, overnight percentages calculated, guides reviewed, templates structured, and Texas tools limited — the site methodology page.',
	datePublished: '2026-06-01',
	dateModified: '2026-06-25',
};

export const hero = {
	headline: 'How CustodyBuilder Works',
	intro:
		'This page documents how calendars, percentages, calculators, templates, and guides are produced and reviewed — the methodology reference for the entire site.',
};

export const calendarGeneration = {
	title: 'How Calendar Generation Works',
	intro: 'The custody schedule generator maps a repeating rotation block onto real dates.',
	steps: [
		{ heading: 'Pattern selection', body: 'Each rotation ID (2-2-3, 2-2-5-5, week-on/week-off, etc.) defines which parent holds which weekday in the repeating fortnight or week block.' },
		{ heading: 'Start date anchor', body: 'The order effective date sets day one. Mid-month starts produce a partial first week — that is correct behavior, not a bug.' },
		{ heading: 'Cell rendering', body: 'Each overnight paints Parent A or Parent B on the month grid. Exchange days appear at block boundaries.' },
		{ heading: 'Export', body: 'PDF includes color key, month grid, and parent labels for exhibit attachment.' },
	],
	link: { label: 'Open custody schedule generator', href: '/custody-schedule-generator/' },
};

export const percentageCalculation = {
	title: 'How Parenting Percentages Are Calculated',
	intro: 'Overnight counts drive the percentage — not hours or partial days unless an order specifies otherwise.',
	formula: 'Parent % = (Parent overnights ÷ Total overnights) × 100',
	points: [
		'Generator summaries count overnights in the preview cycle as planning estimates',
		'Custody percentage calculator accepts manual overnight totals for court discussion inputs',
		'Visitation calculator compares planned vs actual overnights over a labeled tracking period',
	],
	link: { label: 'Open custody percentage calculator', href: '/custody-percentage-calculator/' },
};

export const guideReview = {
	title: 'How Schedule Guides Are Reviewed',
	intro: 'Each guide cluster owns one search intent. Reviews check for cluster overlap before publish.',
	checklist: [
		'Unique H2 ownership — no duplicate section titles across age, 50/50, holiday, or template pages',
		'Tool-first hero with generator or calculator above the fold',
		'Boundary paragraphs defer percentage math, Texas law, and pattern rankings to the owning page',
		'7–8 FAQs unique to the page topic — no duplicated schedule FAQ grids',
		'AI slop phrase scan — operational language only',
	],
};

export const templateStructure = {
	title: 'How Templates Are Structured',
	intro: 'Template cluster pages separate rotation rules, calendar layout, agreement clauses, and Texas SPO language.',
	pages: [
		{ heading: 'Custody schedule template', body: 'Owns recurring rotation, exchanges, summer placeholders — not legal clauses.', href: '/custody-schedule-template/' },
		{ heading: 'Custody calendar template', body: 'Owns printable month grid and color coding — not rotation drafting.', href: '/custody-calendar-template/' },
		{ heading: 'Parenting plan template', body: 'Owns agreement sections and clause hierarchy — not calendar design.', href: '/parenting-plan-template/' },
		{ heading: 'Texas parenting plan template', body: 'Owns SPO calendar, 100-mile rules, summer notice — not generic plans.', href: '/texas-parenting-plan-template/' },
	],
};

export const texasLimits = {
	title: 'How Texas Tools Are Limited',
	intro: 'Texas pages own Texas-specific math and possession language — generic tools defer here.',
	points: [
		'Texas child support calculator applies guideline percentages to net resources — not overnight counts',
		'Texas parenting plan builder previews SPO weekends — not 50/50 pattern rankings',
		'Official Texas resources linked for filing context — not interpreted as legal advice',
	],
	links: [
		{ label: 'Texas child support calculator', href: '/texas-child-support-calculator/' },
		{ label: 'Texas parenting plan template', href: '/texas-parenting-plan-template/' },
	],
};

export const whatWeDoNot = {
	title: 'What CustodyBuilder Does Not Do',
	items: [
		'Decide holidays automatically in the base generator — holiday overrides are built on the holiday custody page',
		'Set child support amounts from parenting time alone in Texas — income-based guidelines are separate',
		'Log historical visitation in the percentage calculator — use the visitation calculator',
		'Provide legal advice, court predictions, or filed forms',
	],
};

export const corrections = {
	title: 'How To Report Corrections',
	intro: 'Send corrections through the contact page with enough detail to reproduce the issue.',
	process: [
		'Include page URL and tool inputs used',
		'Describe expected output vs actual output',
		'Calculator corrections are checked against formula documentation on this page',
		'Editorial corrections are checked against cluster ownership rules',
	],
	link: { label: 'Contact page', href: '/contact/' },
};

export const reviewStandards = {
	title: 'Editorial Review Standards',
	items: [
		'Calculator output must match documented formulas',
		'Generator exchange days must match pattern engine for the selected rotation ID',
		'FAQ schema must match visible FAQ count on the page',
		'Internal links must route to the page that owns the topic',
		'dateModified updates when tool logic, examples, or review scope changes',
	],
	links: [
		{ label: 'About CustodyBuilder', href: '/about/' },
		{ label: 'Contact', href: '/contact/' },
	],
};
