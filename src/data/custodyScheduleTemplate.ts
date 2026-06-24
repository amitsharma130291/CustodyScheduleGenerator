export const meta = {
	title: 'Custody Schedule Template: Build the Regular Rotation',
	description:
		'Draft the recurring parenting rotation — weekday ownership, exchange times, summer block, and holiday placeholders — then export from the generator.',
	datePublished: '2025-01-01',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: ['recurring rotation structure', 'exchange timing fields', 'summer and holiday placeholders', 'calendar export accuracy'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'This page helps draft recurring parenting rotations and is not legal advice.',
};

export const hero = {
	headline: 'Custody Schedule Template',
	intro:
		'A custody schedule template names the recurring rotation — which parent owns Monday, when exchanges happen, and where summer and holiday placeholders attach. Build the pattern here; legal clauses live on the parenting plan page.',
	boundary:
		'Visual month layouts belong on the <a href="/custody-calendar-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody calendar template</a>. Agreement sections belong on the <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a>.',
};

export const heroKeyStats = [{ value: 'Mon–Sun', label: 'ownership rows' }, { value: '6 PM', label: 'exchange time' }, { value: 'PDF', label: 'export rotation' }];
export const heroTrustSignals = ['Free to use', 'No signup required', 'Export rotation PDF'];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Build rotation' },
	{ id: 'anatomy', label: 'Schedule anatomy' },
	{ id: 'rotation-builder', label: 'Rotation builder' },
	{ id: 'exchange-map', label: 'Exchange map' },
	{ id: 'summer-holiday', label: 'Summer & holidays' },
	{ id: 'export', label: 'Export' },
	{ id: 'faq', label: 'FAQ' },
];

export const anatomy = {
	title: 'The Anatomy Of A Recurring Custody Schedule',
	intro: 'Every rotation document answers four rows before any holiday table attaches.',
	rows: [
		{ heading: 'Pattern name', body: '2-2-5-5, week-on/week-off, or every-other-weekend — the engine that repeats.' },
		{ heading: 'Weekday ownership', body: 'Which parent holds Tuesday homework, Thursday music, Friday folder — not just overnight color blocks.' },
		{ heading: 'Exchange clock', body: 'Friday 6:00 p.m. pickup, Sunday 6:00 p.m. return, or school-dismissal handoff — written per exchange day.' },
		{ heading: 'Placeholder rows', body: 'Summer block start/end and "holiday table overrides base rotation" — pointers, not full holiday clauses.' },
	],
};

export const rotationBuilder = {
	title: 'Build The Rotation Before Adding Holidays',
	intro: 'Load your pattern in the generator with a real start date. Switch patterns to compare exchange load — do not copy a static two-week grid from a blog post.',
	steps: [
		'Pick the pattern closest to your logistics on the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 hub</a> or age guide.',
		'Rename parents and set the order start date to the next scheduled exchange.',
		'Mark school-night ownership on the printed month before opening the holiday override table.',
	],
};

export const exchangeMap = {
	title: 'Map Every Exchange On The Printed Fortnight',
	intro: 'Exchange rows fail when only overnight color is written without pickup location or clock time.',
	fields: [
		{ heading: 'Exchange day', body: 'Wednesday on 2-2-3 vs Friday on week-on/week-off — name the weekday, not "midweek."' },
		{ heading: 'Pickup parent', body: 'Who initiates the handoff on that day each fortnight.' },
		{ heading: 'Location', body: 'School curb, neutral library, or receiving parent driveway.' },
		{ heading: 'Clock time', body: '6:00 p.m. default fails when practice ends at 5:30 — write post-activity pickup when needed.' },
	],
};

export const summerHoliday = {
	title: 'Summer Block And Holiday Placeholders',
	intro: 'The base rotation governs the school year. Summer and holidays need separate rows that say they override the base schedule.',
	items: [
		{ heading: 'Summer possession row', body: 'First/second half dates or continuous weeks — with resume date on the regular rotation.' },
		{ heading: 'Holiday pointer', body: 'Attach override table built on the <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> page — not duplicated here.' },
		{ heading: 'Transportation note', body: 'Who drives each exchange day during the school year vs summer travel blocks.' },
	],
};

export const exportSection = {
	title: 'Export The Rotation PDF',
	body: 'When weekday ownership and exchange times match your marked month, export the PDF and attach it to the schedule section of your parenting plan.',
	primaryHref: '/parenting-plan-template/',
	primaryLabel: 'Insert into parenting plan',
	secondaryHref: '/custody-calendar-template/',
	secondaryLabel: 'View as monthly calendar',
};

export const faqSection = { title: 'Custody schedule template FAQ', description: 'Answers about recurring rotations — not parenting plan clauses or calendar design.' };

export const faqItems = [
	{ question: 'What belongs in a custody schedule template?', answer: 'Pattern name, weekday ownership, exchange days with clock times and locations, summer block placeholders, and a note that holiday tables override the base rotation.' },
	{ question: 'How is this different from a custody calendar template?', answer: 'The schedule template is the written rotation rules. The calendar template is the same rotation rendered month-by-month with color-coded overnights for printing.' },
	{ question: 'Where do holiday rules go?', answer: 'Holiday override tables attach separately — see the holiday custody schedule page. The base rotation only needs a pointer row saying holidays control during named blocks.' },
	{ question: 'Should exchange times appear on every handoff day?', answer: 'Yes. Each exchange day needs a clock time and location. School-dismissal exchanges need the school name and bell time.' },
	{ question: 'Can I use this for every-other-weekend?', answer: 'Yes. Load every-other-weekend in the generator, mark Fri–Sun windows, and note whether holiday access replaces or adds to regular weekends on the visitation holiday page.' },
	{ question: 'Does this page include legal decision-making clauses?', answer: 'No. Medical, school, and dispute sections belong on the parenting plan template.' },
	{ question: 'How do I attach the rotation to a parenting plan?', answer: 'Export the PDF from the generator and reference it in the regular parenting time section of the parenting plan template.' },
	{ question: 'Is this a court form?', answer: 'No. Educational planning output only. Confirm format requirements with a qualified professional before filing.' },
];
