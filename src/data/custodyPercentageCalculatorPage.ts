export const meta = {
	title: 'Custody Percentage Calculator | Overnight Parenting Time',
	description:
		'Calculate custody percentages from overnight counts — annual totals, split ratios, and court percentage discussion inputs. Calendar generation belongs on the schedule generator.',
	datePublished: '2026-06-10',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: ['overnight percentage formula', 'annual total arithmetic', '50/50 split examples', 'calculator output accuracy', 'educational clarity'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'Percentage planning tool only — not legal advice. Jurisdiction counting rules may differ.',
};

export const hero = {
	headline: 'Custody Percentage Calculator',
	intro:
		'Enter overnight counts for each parent to calculate custody percentages and annual totals. This tool answers "what percentage is 219 overnights?" — not "what does next Tuesday look like on a calendar."',
	boundary:
		'Calendar generation lives on the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>. Historical visit logging lives on the <a href="/visitation-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">visitation calculator</a>. Texas child support uses separate guideline math on the <a href="/texas-child-support-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">Texas child support calculator</a>.',
};

export const heroKeyStats = [
	{ value: 'Overnights', label: '→ percentage' },
	{ value: '365-day', label: 'annual frame' },
	{ value: 'Split', label: 'ratio output' },
];

export const articleTocItems = [
	{ id: 'calculator', label: 'Calculator' },
	{ id: 'how-calculated', label: 'Formula' },
	{ id: 'annual-totals', label: 'Annual totals' },
	{ id: 'percentage-ladder', label: 'Percentage ladder' },
	{ id: 'related-reading', label: 'Next step' },
	{ id: 'faq', label: 'FAQ' },
];

export const howCalculated = {
	title: 'How Parenting Percentages Are Calculated',
	intro: 'The formula counts overnights — one parent\'s overnights divided by total overnights, multiplied by 100.',
	formula: 'Parent A % = (Parent A overnights ÷ Total overnights) × 100',
	steps: [
		{ heading: 'Count overnights per parent', body: 'An overnight is one calendar night the child sleeps at that parent\'s home — partial days without an overnight usually do not count unless your order says otherwise.' },
		{ heading: 'Sum total overnights', body: 'Parent A overnights + Parent B overnights = denominator. In a 365-day year with no third-party overnights, total is 365.' },
		{ heading: 'Round to one decimal', body: '182 ÷ 365 = 49.9%. 183 ÷ 365 = 50.1%. Leap years add one day to the denominator.' },
	],
	closing:
		'After calculating, preview how those overnights distribute across months on the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>.',
};

export const annualTotals = {
	title: 'Annual Overnight Totals By Common Split',
	intro: 'These reference totals assume a 365-day year with every night assigned to one parent.',
	rows: [
		{ split: '50/50', parentA: 182, parentB: 183, note: 'Equal split — one extra day from 365 odd count' },
		{ split: '60/40', parentA: 219, parentB: 146, note: 'Majority parent holds ~60%' },
		{ split: '70/30', parentA: 256, parentB: 109, note: 'Primary-home arrangement' },
		{ split: '80/20', parentA: 292, parentB: 73, note: 'Every-other-weekend range' },
	],
};

export const percentageLadder = {
	title: 'Percentage Ladder For Court Discussions',
	intro: 'Judges and mediators often frame parenting time in percentage bands — enter your counts to see where the split falls.',
	bands: [
		{ range: '45–55%', label: 'Equal-time band', body: '182–183 overnights each in a 365-day year. Pattern mechanics on the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> hub.' },
		{ range: '35–44%', label: 'Substantial contact band', body: '~130–160 overnights for minority parent. See <a href="/60-40-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">60/40 custody schedule</a>.' },
		{ range: '25–34%', label: 'Primary-home band', body: '~90–125 overnights for minority parent. See <a href="/70-30-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">70/30 custody schedule</a>.' },
		{ range: 'Under 25%', label: 'Visitation band', body: 'Under ~90 overnights. Every-other-weekend patterns on the <a href="/every-other-weekend-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">every-other-weekend guide</a>.' },
	],
};

export const relatedReading = {
	title: 'After You Know The Percentage Split',
	paragraphs: [
		'Build a calendar that produces those overnights: <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>.',
		'Compare equal-time patterns: <a href="/best-50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">best 50/50 custody schedule</a> and <a href="/50-50-custody-schedule-examples/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 examples</a>.',
		'Log actual vs planned visits over time: <a href="/visitation-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">visitation calculator</a>.',
	],
};

export const faqSection = { title: 'Custody percentage FAQ', description: 'Overnight percentage questions only — not calendar generation or child support.' };

export const faqItems = [
	{ question: 'How are parenting percentages calculated?', answer: 'Divide one parent\'s overnights by total overnights, multiply by 100. Example: 182 ÷ 365 = 49.9% for Parent A.' },
	{ question: 'How many overnights is 50/50 custody?', answer: 'In a 365-day year, roughly 182 or 183 overnights per parent — the odd day goes to one parent.' },
	{ question: 'Can custody percentages vary by month?', answer: 'Yes. A 2-2-3 pattern may show 60/40 in one month and 40/60 in the next while balancing to 50/50 annually. Count the full year, not one month.' },
	{ question: 'Does this calculator generate a custody calendar?', answer: 'No. Enter overnight totals here. Build dated calendars on the custody schedule generator.' },
	{ question: 'Is this the same as a visitation calculator?', answer: 'No. This calculator converts overnight counts to percentages. The visitation calculator logs actual parenting time against a plan over a tracking period.' },
	{ question: 'Do courts count partial days as overnights?', answer: 'Rules vary by jurisdiction and order language. This calculator counts whole overnights only — verify counting rules with your order or advisor.' },
	{ question: 'How do holidays affect annual percentages?', answer: 'Holiday overrides replace base rotation nights. Recalculate totals after applying holiday exhibit rows to the annual count.' },
	{ question: 'Does parenting time percentage set child support?', answer: 'Support formulas vary by state. Texas uses income-based guidelines on the Texas child support calculator — parenting time alone does not determine support there.' },
];
