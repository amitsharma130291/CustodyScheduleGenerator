export const meta = {
	title: 'Custody Calendar Template: Printable Month View',
	description:
		'Turn a parenting rotation into a color-coded monthly calendar — school year, summer, and holiday overlay marks — then print or save PDF.',
	datePublished: '2025-01-01',
	dateModified: '2026-06-25',
};

export const editorialReview = {
	reviewedFor: ['month-grid rendering', 'parent color coding', 'school-year vs summer layers', 'print/PDF export'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'This page helps visualize parenting time on monthly grids and is not legal advice.',
};

export const hero = {
	headline: 'Custody Calendar Template: Print Your Month-Grid Calendar in Minutes',
	intro:
		'A custody calendar template renders the recurring rotation as a printable month — color-coded overnights, exchange days highlighted, holiday overrides marked on top of the base grid.',
	boundary:
		'Written rotation rules belong on the <a href="/custody-schedule-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule template</a>. Legal agreement sections belong on the <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a>.',
};

export const heroKeyStats = [{ value: '12', label: 'month view' }, { value: 'A/B', label: 'color code' }, { value: 'Print', label: 'school year' }];
export const heroTrustSignals = ['Free to use', 'No signup required', 'Print monthly PDF'];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Generate calendar' },
	{ id: 'month-preview', label: '12-month view' },
	{ id: 'holiday-overlay', label: 'Holiday overlay' },
	{ id: 'color-month', label: 'Color-coded month' },
	{ id: 'school-summer', label: 'School vs summer' },
	{ id: 'print-export', label: 'Print' },
	{ id: 'faq', label: 'FAQ' },
];

export const monthPreview = {
	title: 'Print The School-Year Month Before Signing',
	intro: 'Parents argue from memory when the grid only exists in a text paragraph. A printed September page shows whether Tuesday belongs to Parent A when school starts.',
	points: [
		{ heading: 'Start date alignment', body: 'Set generator start date to the first day the order takes effect — not January 1 by default.' },
		{ heading: 'Parent color key', body: 'Parent A and Parent B colors must match the legend on every exported page.' },
		{ heading: 'Exchange markers', body: 'Highlight handoff days differently from ordinary overnights so car-line timing is visible.' },
	],
};

export const holidayOverlay = {
	title: 'Layer Holiday Overrides On The Base Grid',
	intro: 'Print the school-year base month first. Mark Thanksgiving, winter break, and spring break blocks from the holiday override table on top.',
	steps: [
		'Generate base month with regular pattern.',
		'Mark override days from the <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> table.',
		'Note return-to-normal date on the January page.',
	],
};

export const colorMonth = {
	title: 'Read A Color-Coded Custody Month',
	intro: 'Each cell is an overnight owner — not a parenting quality score.',
	legend: [
		{ heading: 'Solid parent color', body: 'Overnight with that parent — bus stop and bedtime on that date.' },
		{ heading: 'Exchange stripe', body: 'Handoff day — pickup time governs, not bedtime color alone.' },
		{ heading: 'Override hatch', body: 'Holiday block replaced base rotation for those dates.' },
	],
};

export const schoolSummer = {
	title: 'School Year Grid Vs Summer Grid',
	intro: 'Summer possession may replace the school-year pattern entirely for six weeks — print a separate July page rather than assuming the September grid continues.',
	items: [
		{ heading: 'School-year pages', body: 'September through May with regular exchange rhythm.' },
		{ heading: 'Summer pages', body: 'June–August with continuous blocks or split halves — resume date on first school day.' },
		{ heading: 'Limited-parent calendars', body: 'Every-other-weekend Fri–Sun blocks need wider gap markers — see <a href="/holiday-visitation-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday visitation schedule</a> for access overlays.' },
	],
};

export const printExport = {
	title: 'Print Or Save The Monthly PDF',
	body: 'Use monthly PDF export for mediation binders. Use yearly PDF when the court wants a single attachment covering all school months.',
	primaryHref: '/custody-schedule-template/',
	primaryLabel: 'View rotation rules',
	secondaryHref: '/custody-schedule-generator/',
	secondaryLabel: 'Open full generator',
};

export const faqSection = { title: 'Custody calendar template FAQ', description: 'Answers about monthly visualization — not rotation drafting or legal clauses.' };

export const faqItems = [
	{ question: 'What is a custody calendar template for?', answer: 'Rendering the recurring rotation as a color-coded month grid for printing, mediation, and school-office reference — not writing legal clauses.' },
	{ question: 'How is this different from the schedule template?', answer: 'The schedule template documents rotation rules in text. The calendar template shows the same rules as dated cells parents can hang on a wall.' },
	{ question: 'Can I print a full school year?', answer: 'Yes. Export monthly or yearly PDF from the generator after setting your start date and parent labels.' },
	{ question: 'How do holidays appear on the calendar?', answer: 'Override days replace base cell colors for the holiday block start through end time. Build the override table on the holiday custody page first.' },
	{ question: 'Should summer use the same grid as the school year?', answer: 'Only if summer follows the same pattern. Many orders switch to continuous summer blocks — print separate June–August pages.' },
	{ question: 'Does the calendar include decision-making sections?', answer: 'No. Medical, school, and dispute clauses belong on the parenting plan template.' },
	{ question: 'Can I share the calendar link with the other parent?', answer: 'Use copy-link from the generator to share schedule ID, start date, and parent names for the same grid view.' },
	{ question: 'Is the printed calendar a court document?', answer: 'No. Planning output only. Confirm filing format with a qualified professional.' },
];
