export const meta = {
	title: 'Texas Child Support Calculator | Estimate Monthly Support',
	description:
		'Estimate Texas child support from monthly gross income, children before the court, and allowable deductions — guideline percentages applied to net resources, not gross pay.',
	datePublished: '2026-06-08',
	dateModified: '2026-06-25',
};

export const hero = {
	headline: 'Texas Child Support Calculator',
	opening:
		'Estimate monthly Texas child support from the paying parent\'s gross income, number of children, and optional deductions. Texas guidelines apply a percentage to monthly net resources — custody percentages and calendar generation are separate tools.',
	closing:
		'Planning estimate only. Courts may order a different amount after medical support, other children, parenting arrangements, and case-specific review.',
};

export const editorialReview = {
	reviewedFor: ['Texas guideline percentage table', 'net resources calculation', 'income cap logic', 'deduction field accuracy', 'educational clarity'],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'Financial planning estimate only — not legal or financial advice, not an official Texas court calculation.',
};

export const articleTocItems = [
	{ id: 'calculator', label: 'Calculator' },
	{ id: 'income-flow', label: 'Income flow' },
	{ id: 'how-calculated', label: 'Guideline math' },
	{ id: 'worksheet', label: 'Worksheet fields' },
	{ id: 'income-examples', label: 'Income examples' },
	{ id: 'estimate-differences', label: 'Estimate vs order' },
	{ id: 'related-reading', label: 'Next step' },
	{ id: 'faq', label: 'FAQ' },
];

export const howToUse = {
	title: 'How to Use the Texas Child Support Calculator',
	intro: 'Enter the paying parent\'s numbers first. The estimate updates from gross income, child count, and optional fields.',
	fields: [
		{
			label: 'Monthly gross income',
			body: 'The paying parent\'s total monthly income before taxes — salary, regular overtime, commissions, or averaged self-employment income. If pay varies, use a recent average rather than one unusually high or low month.',
		},
		{
			label: 'Net resources (estimated)',
			body: 'Texas applies guideline percentages to net resources, not gross income. The calculator subtracts estimated Social Security tax, Medicare tax, federal income tax, and any advanced deductions you enter to reach an estimated net-resources figure.',
		},
		{
			label: 'Children before the court',
			body: 'The number of children in this case sets the guideline percentage — 20% for one child, 25% for two, and so on.',
		},
		{
			label: 'Other children supported',
			body: 'If the paying parent also supports children from another relationship, the guideline percentage may be reduced through a multiple-family adjustment.',
		},
		{
			label: 'Health insurance and medical support',
			body: 'Child health or dental insurance paid by the paying parent can be entered as an advanced deduction. Medical support obligations in a final order may also be handled separately from the base guideline amount — for example, one parent providing insurance while the other pays a cash medical support amount.',
		},
	],
	close:
		'After you have a result, compare it with the income examples below and read why court orders sometimes differ. If parenting time is still being negotiated, estimate support separately from the custody calendar.',
};

export const howCalculated = {
	title: 'How Texas Child Support Is Calculated',
	intro: 'Texas guideline support follows a short sequence. Courts and the Attorney General use more detailed records, but the logic starts the same way.',
	steps: [
		{
			step: 'Step 1: Determine monthly net resources',
			body: 'Start with gross monthly income, then subtract allowable amounts such as Social Security tax, Medicare tax, federal income tax, mandatory union dues, and child health insurance the paying parent provides. The remainder is net resources.',
		},
		{
			step: 'Step 2: Apply Texas guideline percentages',
			body: 'Multiply guideline resources used by the percentage for the number of children before the court. The calculator caps guideline resources at $11,700 in monthly net resources when estimated net resources exceed that amount. If the paying parent supports other children, a lower percentage may apply.',
		},
		{
			step: 'Step 3: Review adjustments and court discretion',
			body: 'The guideline amount is a starting point. Medical support, low-income rules, high-income caps, and court findings can change the final order.',
		},
	],
	guidelineRows: [
		['1 child', '20%'],
		['2 children', '25%'],
		['3 children', '30%'],
		['4 children', '35%'],
		['5 children', '40%'],
		['6+ children', 'Not less than 40%'],
	],
	close:
		'These percentages apply to net resources when no multiple-family adjustment or low-income rule changes the rate. When estimated net resources fall below $1,000 and no other supported children are entered, lower guideline percentages may apply. A judge may order above or below the guideline when the evidence supports it.',
};

export const incomeExamples = {
	title: 'Texas Child Support Examples by Income',
	intro:
		'Parents often search by monthly income. The table below shows simplified planning estimates using the calculator\'s default tax assumptions and no other-children adjustment.',
	tableCaution:
		'These examples use simplified estimates to show how guideline percentages work. They are not official calculations and may differ from a court order because of deductions, other supported children, medical support, high-income rules, or judicial discretion.',
	note:
		'These are simplified estimates for comparison — not court calculations. Deductions, medical support, other supported children, and cap rules can change the result. Enter your numbers in the calculator above for a case-specific estimate.',
	rows: [
		['$3,000', '~$2,512', '~$502', '~$628', '~$754'],
		['$4,000', '~$3,350', '~$670', '~$838', '~$1,005'],
		['$5,000', '~$4,187', '~$837', '~$1,047', '~$1,256'],
		['$6,000', '~$5,025', '~$1,005', '~$1,256', '~$1,508'],
		['$7,000', '~$5,862', '~$1,172', '~$1,466', '~$1,759'],
		['$8,000', '~$6,700', '~$1,340', '~$1,675', '~$2,010'],
		['$9,000', '~$7,537', '~$1,507', '~$1,884', '~$2,261'],
		['$10,000', '~$8,375', '~$1,675', '~$2,094', '~$2,513'],
	],
	exampleNote:
		'A parent earning $5,000 gross with one child might see about $837 per month under standard guideline assumptions — but a parent with the same gross pay and higher insurance deductions, other supported children, or irregular bonus income could land elsewhere.',
};

export const fiftyFifty = {
	title: '50/50 Custody and Child Support in Texas',
	question: 'Do you pay child support with 50/50 custody in Texas?',
	answer:
		'Often, yes — equal parenting time does not automatically eliminate child support. Texas guideline support still starts with net resources and child count. If one parent earns significantly more, guideline support may still apply even when overnights are split evenly.',
	scenario:
		'Example: Sarah and David split parenting time evenly. Sarah earns about $9,000 per month and David earns about $4,000 per month. Equal overnight time does not automatically erase support because a court may still consider each parent\'s net resources and the child\'s needs. This illustration is educational — not a prediction of a specific order.',
	points: [
		'Parenting time can affect negotiations and the facts a court reviews, but 50/50 alone does not reset support to zero.',
		'Income differences, medical support, child care, and expense sharing may still matter.',
		'Use a parenting calendar to see overnights separately from the support estimate.',
	],
	linkText: 'Compare 50/50 custody schedules',
	linkHref: '/50-50-custody-schedule/',
	close:
		'Build your custody calendar first if possession time is still being negotiated, then run the support estimate with each parent\'s income. The two decisions are related but not interchangeable.',
};

export const whatIncomeCounts = {
	title: 'What Income Counts Toward Texas Child Support',
	intro: 'Texas net resources generally include income the paying parent actually receives — not just base salary.',
	sources: [
		{
			source: 'Salary and wages',
			example: 'A teacher earning $4,200 per month in base pay enters that amount as gross income. Summer pay, if received, may need to be averaged across the year.',
		},
		{
			source: 'Overtime',
			example: 'A warehouse supervisor who regularly works two overtime shifts per week might average those hours over six months rather than using one heavy paycheck.',
		},
		{
			source: 'Bonuses',
			example: 'A sales manager with a $12,000 annual bonus might spread that across twelve months ($1,000 per month) if bonuses are predictable, or use a longer average if they vary.',
		},
		{
			source: 'Commissions',
			example: 'A real estate agent with uneven closings might use last year\'s net commission total divided by twelve instead of a slow January alone.',
		},
		{
			source: 'Self-employment income',
			example: 'A freelance designer subtracts ordinary business expenses from gross receipts, then uses the monthly average of net self-employment income. One month\'s invoice total is rarely enough.',
		},
		{
			source: 'Rental and retirement income',
			example: 'Net rental income after ordinary property expenses and retirement distributions received monthly may count toward resources. A parent receiving $900 per month from a rental unit and $600 from a pension would include both in the income picture, subject to allowable deductions.',
		},
	],
	deductionsIntro: 'Common amounts subtracted before applying the guideline percentage include:',
	deductions: [
		'Social Security and Medicare taxes',
		'Federal income tax (estimated)',
		'Mandatory union dues',
		'Child health or dental insurance paid by the paying parent',
		'Mandatory retirement contributions in applicable non-Social Security situations',
	],
};

export const estimateDifferences = {
	title: 'Why the Calculator Estimate May Differ From a Court Order',
	intro: 'A guideline-style estimate helps with budgeting and mediation prep. A court or the Attorney General may reach a different number after reviewing records.',
	factors: [
		{
			heading: 'Multiple families',
			body: 'When the paying parent supports children from another relationship, the multiple-family adjustment can lower the guideline percentage. Example: one child before the court normally uses 20%, but supporting one other child outside the case may reduce the rate to 17.5% of net resources.',
		},
		{
			heading: 'High-income cases',
			body: 'Texas applies guideline percentages to net resources up to a statutory cap (raised to $11,700 monthly net resources effective September 1, 2025). Income above the cap may be reviewed differently. Verify current cap amounts before relying on high-income estimates.',
		},
		{
			heading: 'Medical and dental support',
			body: 'Orders often assign health insurance, uninsured medical costs, or cash medical support separately from the base child support amount.',
		},
		{
			heading: 'Parenting arrangements',
			body: 'Possession schedules do not automatically set support, but they can affect how parents negotiate expenses, travel, and child care.',
		},
		{
			heading: 'Court discretion',
			body: 'A judge may order above or below guideline support when special medical needs, education costs, or other proven facts justify a deviation.',
		},
		{
			heading: 'Irregular income',
			body: 'Courts may average bonuses, commissions, or seasonal overtime across longer periods than a single calculator entry captures.',
		},
	],
	close:
		'Treat the calculator output as a starting conversation — gather pay stubs, tax returns, insurance costs, and existing orders before mediation or court.',
};

export const officialResources = {
	title: 'Official Texas Child Support Resources',
	intro:
		'Texas child support rules come from Texas law and official state child support guidance. Use official state resources or a qualified professional when you need legal advice, enforcement help, or a court-ready calculation.',
	links: [
		{
			title: 'Texas Attorney General — Child Support',
			href: 'https://www.texasattorneygeneral.gov/child-support',
		},
		{
			title: 'Texas Attorney General — Child Support Calculator',
			href: 'https://www.texasattorneygeneral.gov/child-support/child-support-calculator',
		},
		{
			title: 'Texas Family Code',
			href: 'https://statutes.capitol.texas.gov/',
		},
	],
};

export const beforeCourt = {
	title: 'What to Gather Before Using This Estimate in Mediation',
	intro: 'The calculator is most useful when the numbers behind it are documented.',
	items: [
		'Recent pay stubs or profit-and-loss statements for self-employed parents',
		'Last year\'s tax return if bonuses, commissions, or overtime vary month to month',
		'Proof of child health insurance premiums the paying parent covers',
		'Existing support orders for other children that may trigger a multiple-family adjustment',
		'A parenting calendar if possession time is still being negotiated alongside support',
	],
	close:
		'Bring the calculator printout as a starting point, not a final offer. Mediators and judges expect records, not a single gross-income guess.',
};

export const incomeFlow = {
	title: 'Texas Child Support Income Flow',
	intro: 'Guideline support follows gross income through deductions to net resources, then applies the child-count percentage.',
	flow: [
		{ label: 'Monthly gross income', detail: 'Salary, wages, overtime, commissions, self-employment' },
		{ label: 'Minus allowable deductions', detail: 'Social Security, Medicare, federal tax, union dues, health insurance' },
		{ label: 'Net resources', detail: 'Capped at $11,700/month for guideline application when exceeded' },
		{ label: 'Guideline percentage', detail: '20% one child · 25% two · 30% three · 35% four · 40% five+' },
		{ label: 'Monthly support estimate', detail: 'Percentage × guideline resources used' },
	],
};

export const worksheetFields = {
	title: 'Texas Support Worksheet Fields',
	intro: 'Each calculator field maps to a line on a guideline worksheet — enter the paying parent\'s numbers first.',
	fields: howToUse.fields,
	close: howToUse.close,
};

export const relatedReading = {
	title: 'After The Support Estimate',
	paragraphs: [
		'Build the possession calendar separately: <a href="/texas-parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">Texas parenting plan template</a> and <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a>.',
		'Count overnight percentages separately: <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a>.',
		'Draft agreement sections: <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a>.',
		'Methodology: <a href="/how-custodybuilder-works/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">how CustodyBuilder works</a>.',
	],
};

export const faqSection = { title: 'Texas child support FAQ', description: 'Texas guideline and income questions only — not custody calendars or overnight percentages.' };

export const faqItems = [
	{
		question: 'How is child support calculated in Texas?',
		answer:
			'Texas guideline support generally starts with gross monthly income, subtracts allowable deductions to estimate net resources, then applies a percentage based on the number of children before the court. Other supported children, low-income rules, and court discretion can change the final amount.',
	},
	{
		question: 'What percentage of income goes to child support in Texas?',
		answer:
			'Standard guideline percentages are 20% for one child, 25% for two, 30% for three, 35% for four, and 40% for five or more children — applied to monthly net resources, not gross income.',
	},
	{
		question: 'How much is child support for one child in Texas?',
		answer:
			'For one child, guideline support is generally 20% of monthly net resources when no other supported children or adjustments apply. At $5,000 gross income with typical estimated deductions, that often lands near $800–850 per month before case-specific changes.',
	},
	{
		question: 'Does 50/50 custody eliminate child support in Texas?',
		answer:
			'No. Equal parenting time does not automatically eliminate child support. If one parent has higher net resources, guideline support may still apply even when overnights are split evenly.',
	},
	{
		question: 'What income counts toward child support in Texas?',
		answer:
			'Net resources generally include wages, salary, self-employment income, overtime, bonuses, commissions, and other income the paying parent receives, minus allowable deductions such as taxes and child health insurance.',
	},
	{
		question: 'When does child support end in Texas?',
		answer:
			'Support often continues until a child turns 18 or graduates from high school, whichever is later. Exceptions can apply for disabled adult children or other order-specific terms.',
	},
	{
		question: 'Can a court order more or less than the guideline amount?',
		answer:
			'Yes. Courts may deviate from guideline support when special medical needs, education expenses, high-income circumstances, or other proven facts justify a different amount.',
	},
	{
		question: 'Is this calculator legal advice?',
		answer:
			'No. This tool is for educational and planning purposes only. It is not legal advice, does not create an attorney-client relationship, and is not an official Texas court or Attorney General calculation.',
	},
];
