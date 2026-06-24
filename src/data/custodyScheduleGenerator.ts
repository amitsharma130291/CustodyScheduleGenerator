export const meta = {
	title: 'Custody Schedule Generator | Build a Parenting Calendar',
	description:
		'Build a custody calendar from a rotation pattern — preview exchange days, mark overnights on dated cells, and export a printable PDF. Percentage math belongs on the custody percentage calculator.',
	datePublished: '2026-06-17',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: ['calendar generation accuracy', 'exchange-day rendering', 'PDF export parity', 'schedule pattern mapping', 'educational clarity'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'Calendar planning tool only — not legal advice or a court order.',
};

export const hero = {
	headline: 'Custody Schedule Generator',
	intro:
		'Turn a rotation pattern into a dated custody calendar. Pick a schedule, set a start date, preview exchange days on the month grid, and export a printable PDF — overnight percentages are calculated separately on the custody percentage calculator.',
	boundary:
		'Overnight percentage math lives on the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a>. Historical visit logging lives on the <a href="/visitation-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">visitation calculator</a>. Texas support estimates live on the <a href="/texas-child-support-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">Texas child support calculator</a>.',
};

export const heroKeyStats = [
	{ value: 'Pattern', label: '→ dated cells' },
	{ value: 'Exchange', label: 'days marked' },
	{ value: 'PDF', label: 'export ready' },
];

export const heroTrustSignals = ['No account required', 'No signup required', 'Print or export calendar'];

export const articleTocItems = [
	{ id: 'generator', label: 'Generator' },
	{ id: 'calendar-construction', label: 'Calendar construction' },
	{ id: 'rotation-builder', label: 'Rotation builder' },
	{ id: 'holiday-overlay', label: 'Holiday overlay' },
	{ id: 'interpret-results', label: 'Read the output' },
	{ id: 'related-reading', label: 'Next step' },
	{ id: 'faq', label: 'FAQ' },
];

export const calendarConstruction = {
	title: 'How A Rotation Pattern Becomes A Dated Calendar',
	intro: 'The generator maps a repeating block onto real dates starting from your order effective date — not January 1 by default.',
	steps: [
		{ heading: 'Select rotation ID', body: '2-2-3, 2-2-5-5, week-on/week-off, or every-other-weekend — each pattern defines which parent holds which weekday in the repeating block.' },
		{ heading: 'Anchor start date', body: 'Set the first day the order takes effect. The engine counts forward from that date — a Monday start on 2-2-3 produces different cells than a Friday start.' },
		{ heading: 'Render month cells', body: 'Each overnight paints Parent A or Parent B color on the grid. Exchange days appear at block boundaries where custody flips.' },
		{ heading: 'Export PDF', body: 'Print or save the month grid for mediation, co-parent review, or attachment to a parenting plan exhibit.' },
	],
};

export const rotationBuilder = {
	title: 'Build The Rotation Before Adding Holidays',
	intro: 'Holiday overrides attach separately — the base calendar must show the school-year rhythm first.',
	points: [
		{ heading: 'Name the pattern', body: 'Write the rotation ID in the parenting plan exhibit — "Exhibit A: 2-2-5-5 rotation per attached calendar."' },
		{ heading: 'Mark exchange clock times', body: 'Friday 6:00 p.m. vs school dismissal Friday — the calendar shows which day custody flips; exchange times belong in plan prose.' },
		{ heading: 'Verify fortnight symmetry', body: '2-2-3 repeats every 14 days; week-on/week-off repeats every 14 days. Scroll two months to confirm the pattern does not drift.' },
		{ heading: 'Defer percentage discussion', body: 'Annual overnight totals from the generator are planning estimates — court percentage discussions use the dedicated calculator with your jurisdiction\'s counting rules.' },
	],
};

export const holidayOverlay = {
	title: 'Layer Holiday Overrides After The Base Grid',
	intro: 'Holiday possession replaces base rotation cells for named blocks — build the override table on the holiday custody page, then reference it in the plan.',
	points: [
		{ heading: 'Base grid first', body: 'Generate school-year months showing regular exchange rhythm before adding Thanksgiving or Christmas overrides.' },
		{ heading: 'Override table second', body: 'Holiday rows specify start time, end time, and which parent holds the block — see the <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> page.' },
		{ heading: 'Limited-parent access', body: 'Every-other-weekend Fri–Sun blocks use different override rows — see <a href="/holiday-visitation-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday visitation schedule</a> for access overlays.' },
		{ heading: 'Re-export after overrides', body: 'Print updated months once holiday cells are marked — base calendar and holiday exhibit must match.' },
	],
};

export const interpretResults = {
	title: 'How To Read The Generated Calendar',
	intro: 'The output answers three operational questions before any parenting plan is drafted.',
	questions: [
		{ heading: 'Which parent holds Tuesday night?', body: 'School-night ownership drives homework, folder checks, and early bedtime — read the cell color, not the pattern name.' },
		{ heading: 'How many exchanges this fortnight?', body: '2-2-3 produces four handoffs per fortnight; week-on/week-off produces one. Count exchange markers on the preview month.' },
		{ heading: 'Does the start date align with the order?', body: 'If the order effective date is mid-month, the first partial week may look uneven — that is correct, not a generator error.' },
	],
	closing:
		'Attach the PDF to the <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a> as Exhibit A. Pattern selection guidance lives on individual schedule pages — <a href="/2-2-3-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-3</a>, <a href="/2-2-5-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5</a>, <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 hub</a>.',
};

export const relatedReading = {
	title: 'Where To Go After The Calendar Is Built',
	paragraphs: [
		'Need a written rotation template before generating? Start at the <a href="/custody-schedule-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule template</a> for exchange fields and summer placeholders.',
		'Need a printable month layout? See the <a href="/custody-calendar-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody calendar template</a> for color-key and school-year grid guidance.',
		'Ready to count overnights for court discussion? Use the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a> — not the generator summary alone.',
	],
};

export const faqSection = { title: 'Custody schedule generator FAQ', description: 'Calendar generation questions only — not percentage math or child support.' };

export const faqItems = [
	{ question: 'How do I generate a custody calendar?', answer: 'Select a rotation pattern, set parent labels and start date, preview the month grid with exchange days marked, then print or export PDF. The calendar renders from the pattern engine — not from manual cell editing.' },
	{ question: 'Can I change the schedule start date?', answer: 'Yes. The start date anchors the repeating block. Mid-month order effective dates produce a partial first week — scroll forward to see the full pattern stabilize.' },
	{ question: 'Does the generator calculate custody percentages?', answer: 'It shows overnight counts as a planning estimate. Court percentage discussions with specific counting rules belong on the custody percentage calculator.' },
	{ question: 'How do holidays appear on the generated calendar?', answer: 'Holiday overrides are built separately on the holiday custody schedule page. The generator shows the base school-year rotation — attach holiday exhibit rows that replace named date blocks.' },
	{ question: 'Can I export a printable custody calendar PDF?', answer: 'Yes. Use print or export from the calendar preview. The PDF includes parent color key, month grid, and exchange markers for the selected pattern and start date.' },
	{ question: 'Which rotation pattern should I pick?', answer: 'Pattern choice depends on distance, school routine, and child age — not the generator defaults. Compare options on schedule-specific pages like 2-2-3, 2-2-5-5, or the 50/50 hub before selecting here.' },
	{ question: 'Is the generated calendar a court document?', answer: 'No. Planning output for co-parent review and mediation prep. Confirm filing format with a qualified professional.' },
	{ question: 'How is this different from the visitation calculator?', answer: 'The generator builds future calendars from rotation rules. The visitation calculator logs actual parenting time against a plan — historical tracking, not forward scheduling.' },
];
