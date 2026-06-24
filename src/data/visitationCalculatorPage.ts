export const meta = {
	title: 'Visitation Calculator | Log Actual Parenting Time',
	description:
		'Log actual overnights against a planned visitation schedule — track missed visits, compare actual vs planned percentages, and document parenting time history.',
	datePublished: '2026-06-10',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: ['planned vs actual comparison', 'missed visit tracking', 'historical log arithmetic', 'calculator output accuracy', 'educational clarity'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'Visit logging tool only — not legal advice or a court record.',
};

export const hero = {
	headline: 'Visitation Calculator',
	intro:
		'Log actual parenting time against a planned schedule. Enter planned overnights from the order, record actual overnights for the tracking period, and count missed visits — this tool tracks history, not future calendar generation.',
	boundary:
		'Forward calendar building lives on the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>. Single-period percentage math lives on the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a>. Texas support estimates live on the <a href="/texas-child-support-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">Texas child support calculator</a>.',
};

export const heroKeyStats = [
	{ value: 'Planned', label: 'vs actual' },
	{ value: 'Missed', label: 'visits logged' },
	{ value: 'History', label: 'not forecast' },
];

export const articleTocItems = [
	{ id: 'calculator', label: 'Calculator' },
	{ id: 'logging-visits', label: 'Logging visits' },
	{ id: 'actual-vs-planned', label: 'Actual vs planned' },
	{ id: 'missed-visits', label: 'Missed visits' },
	{ id: 'related-reading', label: 'Next step' },
	{ id: 'faq', label: 'FAQ' },
];

export const loggingVisits = {
	title: 'How To Log Parenting Time Over A Tracking Period',
	intro: 'Start from the written order — planned overnights are the baseline; actual overnights are what happened.',
	steps: [
		{ heading: 'Set the tracking period', body: 'Year to date, one quarter, or since order modification — label the period in your log for mediation or attorney review.' },
		{ heading: 'Enter planned overnights', body: 'From the custody order or parenting plan exhibit — what each parent should have received if every visit occurred.' },
		{ heading: 'Enter actual overnights', body: 'Count nights the child actually slept at each home during the period. Use a calendar app, spreadsheet, or co-parenting log.' },
		{ heading: 'Mark missed visits', body: 'Each scheduled visit that did not occur — no-show, cancellation, or makeup pending. Separate count per parent.' },
	],
};

export const actualVsPlanned = {
	title: 'Compare Actual Percentages Against The Plan',
	intro: 'Variance shows whether parenting time drifted from the ordered split — not whether one parent is "better."',
	points: [
		{ heading: 'Positive variance', body: 'Actual overnights exceeded planned — Parent A logged +12 means 12 more nights than the order specified for that period.' },
		{ heading: 'Negative variance', body: 'Actual fell short of planned — often tied to missed visits, illness cancellations, or travel blocks.' },
		{ heading: 'Percentage shift', body: 'A 70/30 order can drift toward 65/35 over six months if minority-parent weekends are missed — the log documents the shift with numbers.' },
	],
	closing:
		'For a single overnight-to-percentage conversion without a tracking period, use the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a>.',
};

export const missedVisits = {
	title: 'Document Missed Visits With Dates And Reasons',
	intro: 'Missed visit counts feed modification discussions — write date, scheduled parent, and reason in your parenting log.',
	points: [
		{ heading: 'No-show weekends', body: 'Every-other-weekend orders: count each Fri–Sun block that did not occur. See the <a href="/every-other-weekend-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">every-other-weekend guide</a> for planned block structure.' },
		{ heading: 'Makeup visit tracking', body: 'Log makeup nights separately — add to actual overnights when they occur, note in missed-visit column when originally scheduled.' },
		{ heading: 'Sick-day cancellations', body: 'Child illness may pause visitation — document whether the order requires makeup time or forfeiture.' },
	],
};

export const relatedReading = {
	title: 'Where Visitation Logging Fits In The Planning Stack',
	paragraphs: [
		'Build the forward calendar the order describes: <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>.',
		'80/20 and every-other-weekend plans: <a href="/80-20-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">80/20 custody schedule</a>.',
		'Write visit and makeup clauses: <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a>.',
	],
};

export const faqSection = { title: 'Visitation calculator FAQ', description: 'Historical visit logging questions only — not calendar generation or child support.' };

export const faqItems = [
	{ question: 'Can I calculate missed visits with this tool?', answer: 'Yes. Enter missed visit counts per parent alongside planned and actual overnights. The log shows total missed visits and variance from the planned split.' },
	{ question: 'How is this different from the custody percentage calculator?', answer: 'The percentage calculator converts overnight counts to percentages for one snapshot. This tool compares planned vs actual overnights over a tracking period with missed visit counts.' },
	{ question: 'What counts as a missed visit?', answer: 'A scheduled parenting block that did not occur — weekend no-show, cancelled holiday block, or skipped midweek dinner if your order counts partial visits.' },
	{ question: 'Should I log partial days or overnights only?', answer: 'This calculator tracks overnights. Partial-day visits belong in a separate log unless your order defines them as countable units.' },
	{ question: 'Can I use this for equal-time schedules?', answer: 'Yes. Enter planned 182/183 overnights and actual counts to see whether 50/50 held over the tracking period.' },
	{ question: 'Does this generate a future custody calendar?', answer: 'No. Forward scheduling belongs on the custody schedule generator.' },
	{ question: 'How do I document visitation for mediation?', answer: 'Export the calculator copy output, attach date-stamped notes for each missed visit, and bring the parenting plan exhibit showing the planned split.' },
	{ question: 'Does visitation percentage affect Texas child support?', answer: 'Texas guideline support uses income-based formulas on the Texas child support calculator — not overnight percentages alone.' },
];
