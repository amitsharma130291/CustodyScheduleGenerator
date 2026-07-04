// Data for /best-co-parenting-app/ — a COMMERCIAL COMPARISON of real co-parenting apps.
//
// SOURCE OF TRUTH: every feature/pricing claim below traces to
// best-coparenting-app-research.md (Task A), all "checked July 2026". No star ratings,
// no invented numbers. TalkingParents is paid-only since March 30 2026 (never framed as
// having a no-cost tier here). Coparently is flagged as apparently discontinued, never
// recommended live. CustodyBuilder is positioned honestly: a free schedule builder, not
// a full co-parenting app.

export const meta = {
	title: 'Best Co-Parenting App 2026: Honest, Use-Case Picks',
	description:
		"We compared the top co-parenting apps on features, court records, and real 2026 pricing, then matched each to who it's actually best for.",
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

// DEFENSIVE SAFEGUARDS (additive, Jul 2026). These framing lines protect the page as a
// commercial comparison of real products: an editorial-opinion disclosure, a trademark
// notice, and a reinforced pricing caveat. They add protective framing only and change no
// verified fact, price, rating, or the comparison structure.
export const editorialDisclosure =
	'The assessments and comparisons on this page are the author\u2019s editorial opinion, based on publicly available information as of July 2026, and are provided for general informational purposes only. App features, pricing, and policies change often, so please verify the current details with each provider directly before making any decision.';

export const trademarkNotice =
	'All product names, logos, and brands are the property of their respective owners. Naming them here is for identification and comparison only and does not imply affiliation with, or endorsement by, CustodyBuilder.';

export const editorialReview = {
	reviewedFor: [
		'Real 2026 feature and pricing data for each app (checked July 2026)',
		'Per-parent vs per-family true-cost differences',
		'Honest, use-case-based picks (no single rigged winner)',
		'Transparent disclosure that CustodyBuilder is a free scheduling tool, not a full app',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	lastUpdatedLabel: 'Last updated July 2026',
	disclaimer: 'Educational content only, not legal advice.',
};

export const hero = {
	headline: 'The Best Co-Parenting App for Your Situation',
	trustChips: [
		'Real 2026 pricing, checked and dated',
		'Ranked by need, not by commission',
		'Honest about where our own tool fits',
	],
	intro:
		'There is no single best co-parenting app. The right one depends on how much conflict you are managing, your budget, and whether you need court-admissible records. This guide compares the main apps on verified 2026 features and pricing, then matches each to who it is actually best for.',
	disclosure:
		'Full disclosure up front: CustodyBuilder (this site) is a free custody-schedule and parenting-plan-schedule builder, not a full co-parenting app. We have no messaging, expense tracking, or court records. So this is a use-case comparison, not a pitch. We recommend the right app for your need, and we say plainly where the paid apps do more than we do.',
};

export const comparison = {
	title: 'Co-parenting apps compared at a glance',
	intro:
		'Every feature and price below was checked in July 2026 from each app\u2019s own site. The two columns most buyers underestimate are court-admissible records (does the app produce tamper-proof, exportable message records?) and billing model (does each parent pay separately, or does one subscription cover the family?).',
	caveat:
		'Every price on this page is shown as of July 2026 and is subject to change. Co-parenting app prices change often, so check the provider\u2019s own site for current pricing before you subscribe.',
	columns: [
		'App',
		'Court-admissible records',
		'Tone-checked messaging',
		'Expense tracking',
		'Pricing (checked July 2026)',
		'Billing model',
	],
	rows: [
		{
			app: 'OurFamilyWizard',
			records: 'Yes (certified records on higher tiers)',
			tone: 'Yes (ToneMeter)',
			expense: 'Yes (OFWpay)',
			pricing: '$110 to $300 per year',
			billing: 'Per parent',
		},
		{
			app: 'TalkingParents',
			records: 'Yes (certified transcripts)',
			tone: 'Yes (Sentiment Scanner)',
			expense: 'Yes (2 to 4% fee)',
			pricing: '$7 to $32 per month',
			billing: 'Per parent',
		},
		{
			app: 'Custody X Change',
			records: 'Court-ready plans and schedules',
			tone: 'No (not a messaging app)',
			expense: 'Yes (receipts)',
			pricing: 'From $6 per month (billed annually)',
			billing: 'Works for a single user',
		},
		{
			app: 'AppClose',
			records: 'Yes (certified business records)',
			tone: 'Yes (Co-Parent Assist)',
			expense: 'Yes (in-app payments)',
			pricing: '$7.99 per month (60-day trial)',
			billing: 'Per parent',
		},
		{
			app: '2houses',
			records: 'Not positioned as a records product',
			tone: 'No',
			expense: 'Yes (Finance module)',
			pricing: '$169.99 per year',
			billing: 'Per family (one sub covers both)',
		},
		{
			app: 'Fayr',
			records: 'Not positioned as a records product',
			tone: 'No',
			expense: 'Yes',
			pricing: 'Free Lite tier (paid upgrade)',
			billing: 'Freemium',
		},
		{
			app: 'Cozi',
			records: 'No',
			tone: 'No',
			expense: 'No',
			pricing: 'Free with ads, or Gold $39 per year',
			billing: 'One shared family account',
		},
		{
			app: 'Google Calendar',
			records: 'No',
			tone: 'No',
			expense: 'No',
			pricing: 'Free',
			billing: 'Free (Google account)',
		},
	],
	note:
		'One accuracy note most listicles get wrong: TalkingParents went paid-only on March 30, 2026, so any article still listing a no-cost TalkingParents tier is out of date. Fee waivers exist for qualifying users.',
};

export const reviews = {
	title: 'The best co-parenting apps, reviewed',
	intro:
		'Here is what each app is genuinely best for, so you can match it to your own situation rather than a generic ranking. We have highlighted each one\u2019s strengths and the use case it fits best.',
	apps: [
		{
			id: 'ourfamilywizard',
			name: 'OurFamilyWizard',
			bestFor: 'Best for high-conflict co-parenting and court-admissible records',
			strength:
				'The most widely court-accepted option and the deepest feature set: shared calendar, documented messaging with the ToneMeter writing assistant, OFWpay expenses, a journal, and unlimited PDF records (certified records on higher tiers). It is billed per parent, at roughly $110 to $300 per year each.',
		},
		{
			id: 'talkingparents',
			name: 'TalkingParents',
			bestFor: 'Best for documented, court-ready communication',
			strength:
				'Its whole design centers on unalterable, court-focused records: secure messaging, Accountable Calling and Payments, and a Sentiment Scanner that flags escalating language. Certified printed transcripts are its signature. Pricing runs $7 to $32 per month per parent, and fee waivers exist for qualifying users.',
		},
		{
			id: 'appclose',
			name: 'AppClose',
			bestFor: 'Best for an all-in-one app at one low flat price',
			strength:
				'A full toolkit at one low price: calendar templates, unalterable time-stamped messaging, expense tracking with payments, certified electronic business records, and Co-Parent Assist tone review. At $7.99 per month it packs the most features for the price, and the 60-day free trial (no card) is unusually long.',
		},
		{
			id: 'custody-x-change',
			name: 'Custody X Change',
			bestFor: 'Best for detailed schedules and court-ready documentation',
			strength:
				'The strongest pure scheduling and parenting-plan builder: a custody schedule builder, a parenting-time percentage calculator for court, premade holiday schedules, and court-ready plan documents. It works even if your co-parent never signs up. Public pricing starts at $6 per month billed annually.',
		},
		{
			id: '2houses',
			name: '2houses',
			bestFor: 'Best for shared calendars and expense splitting',
			strength:
				'The standout is per-family pricing: one $169.99-per-year subscription covers both parents (plus children and third parties like a mediator), which often makes it the best value for a cooperating couple. The shared calendar and Finance module for splitting expenses are clean and easy to use.',
		},
		{
			id: 'fayr',
			name: 'Fayr',
			bestFor: 'Best for a free start with check-in and location features',
			strength:
				'Fayr offers a genuinely free Lite tier (no card needed): expenses, scheduling, messaging, and location check-ins in a simple, modern app. It is a great, no-cost way to get started, with handy check-in and location features built in.',
		},
		{
			id: 'cozi',
			name: 'Cozi',
			bestFor: 'Best for busy family logistics',
			strength:
				'A great free family organizer: shared calendar, lists, meal planning, and reminders, all in one place. Cozi Gold is $39 per year for an ad-free experience. It shines at keeping a busy family\u2019s day-to-day logistics coordinated.',
		},
		{
			id: 'google-calendar',
			name: 'Google Calendar',
			bestFor: 'Best for a simple free shared calendar',
			strength:
				'Free, universal, and something most parents already have. Shared or family calendars handle basic scheduling with zero setup cost, which makes it a simple starting point for low-conflict families who just need an agreed calendar.',
		},
	],
	coparentlyNote:
		'A note on Coparently: it appears to be no longer active in 2026 (its domain is now parked), so we have left it off our list.',
};

export const bySituation = {
	title: 'The best co-parenting app by situation',
	intro:
		'There is no universal winner. Match the app to your actual need, and the choice gets simple.',
	cases: [
		{
			need: 'High conflict, or heading to court',
			pick: 'OurFamilyWizard or TalkingParents',
			why: 'Both keep unalterable, court-recognized message records and offer a tone or sentiment checker that catches escalating language before you send. OurFamilyWizard is the most widely court-accepted; TalkingParents has the strongest certified-transcript workflow. AppClose is the lower-cost high-conflict pick at $7.99 per month with certified records and tone review.',
		},
		{
			need: 'Tight budget, or you want free',
			pick: 'Fayr (free Lite) or Google Calendar, or AppClose for full features cheaply',
			why: 'For low conflict, Fayr\u2019s free Lite tier or a free shared Google Calendar covers the basics. If you need the full feature set at a low price, AppClose is one flat $7.99 per month with a long 60-day trial. Cozi Gold ($39 per year) is worth it if you only want an ad-free family calendar.',
		},
		{
			need: 'Expense-splitting is the main pain',
			pick: '2houses or OurFamilyWizard',
			why: '2houses has a clean Finance module at one per-family price, and OurFamilyWizard has OFWpay for tracking and reimbursing shared costs. AppClose also handles in-app payments.',
		},
		{
			need: 'Simple scheduling only, low conflict',
			pick: 'Google Calendar or Cozi, after you set a clear written schedule',
			why: 'A free shared Google Calendar or the Cozi family organizer is plenty when you communicate well. Start by drafting a clear written schedule for free with the custody schedule generator, then drop it into whichever calendar you both use.',
		},
		{
			need: 'You need a court-ready parenting plan or a custody-time percentage',
			pick: 'Custody X Change (or start free with CustodyBuilder)',
			why: 'Custody X Change is purpose-built for parenting plans and parenting-time percentages, and it works without your co-parent signing up. You can draft the schedule section for free first with our generator, then formalize it.',
		},
		{
			need: 'Large or blended families, or third parties and mediators',
			pick: '2houses or OurFamilyWizard',
			why: '2houses covers the whole circle on one subscription, and OurFamilyWizard supports professional and practitioner access, so a mediator or lawyer can be looped in.',
		},
	],
};

export const custodyBuilderFit = {
	title: 'Where CustodyBuilder fits (and where it does not)',
	intro:
		'To keep this comparison honest, here is exactly what our own tool does and does not do.',
	isList: [
		'A free custody-schedule and parenting-plan-schedule builder, with no account needed',
		'A calendar visualizer for patterns like 2-2-3, week-on-week-off, 60/40, and holidays',
		'A quick way to draft the schedule section of a parenting plan and export it as a PDF',
	],
	isNotList: [
		'Not a co-parenting communication app: no in-app messaging',
		'No tone-monitored messaging, expense tracking, or in-app payments',
		'No court-admissible message records or ongoing account and journal',
	],
	handoff:
		'CustodyBuilder builds your schedule for free. If you also need tone-checked messaging, expense splitting, or court-admissible records, one of the paid apps above will serve you better: start there.',
	bestFor:
		'CustodyBuilder is the right starting point when you mainly need to design or visualize a custody schedule before paying for anything, when you want the schedule section of a plan to bring to mediation or a lawyer, or when you are low-conflict and just need an agreed calendar. For ongoing communication, expenses, or legal records, move to one of the paid apps above.',
};

export const howToChoose = {
	title: 'How to choose the right co-parenting app',
	intro:
		'Run through this short checklist and the shortlist narrows itself.',
	steps: [
		{
			heading: 'Start with your conflict level',
			body: 'Low conflict and cooperative? A free calendar or a light app is enough. High conflict? Prioritize an app with tamper-proof records and a tone checker.',
		},
		{
			heading: 'Decide if you need court-admissible records',
			body: 'If a court order or ongoing dispute is involved, you likely need certified, exportable records. That points to OurFamilyWizard, TalkingParents, or AppClose. Always confirm what your specific court requires.',
		},
		{
			heading: 'Set your budget, and check per-parent vs per-family',
			body: 'This is the hidden cost most people miss. OurFamilyWizard, TalkingParents, and AppClose charge each parent separately, while 2houses charges once per family. For a cooperating couple, that difference can be large.',
		},
		{
			heading: 'Use the free trials before you commit',
			body: 'AppClose offers a 60-day trial and most apps offer at least a short one. Draft your schedule for free first, then trial the app that fits your need before paying.',
		},
	],
};

export const faqItems = [
	{
		question: 'What is the best co-parenting app?',
		answer:
			'There is no single best one: it depends on your situation. OurFamilyWizard is the most court-accepted all-rounder, AppClose gives the most features at the lowest flat price, and Fayr and Google Calendar are free for low-conflict families. Match the app to your conflict level, budget, and whether you need court-admissible records.',
	},
	{
		question: 'What is the best co-parenting app for high conflict?',
		answer:
			'OurFamilyWizard or TalkingParents: both keep unalterable, court-recognized message records and offer a tone or sentiment checker that flags escalating language before you send. AppClose is the lower-cost high-conflict option, with certified records and tone review at $7.99 per month.',
	},
	{
		question: 'Is there a free co-parenting app?',
		answer:
			'Yes. Fayr has a free Lite tier and Google Calendar is free for basic shared scheduling. Cozi is a free family calendar (with ads) for low-conflict families. TalkingParents and AppClose are now paid-only, though both offer fee waivers for qualifying users. Pricing checked July 2026.',
	},
	{
		question: 'How much do co-parenting apps cost?',
		answer:
			'As of July 2026: AppClose is about $7.99 per month, 2houses is about $169.99 per year (covering both parents), Custody X Change starts around $6 per month billed annually, TalkingParents runs $7 to $32 per month, and OurFamilyWizard is roughly $110 to $300 per year per parent. Always confirm current pricing on the app\u2019s own site before subscribing.',
	},
	{
		question: 'Do both parents have to pay for a co-parenting app?',
		answer:
			'It depends on the app. OurFamilyWizard, TalkingParents, and AppClose charge each parent separately, while 2houses charges once per family (one subscription covers both parents). That can make 2houses noticeably cheaper for a cooperating couple.',
	},
	{
		question: 'Which co-parenting app is accepted by courts?',
		answer:
			'OurFamilyWizard and TalkingParents are the most commonly referenced in family court because their message records are tamper-proof and exportable as certified records. AppClose also provides certified electronic business records. Always confirm what your specific court or order requires.',
	},
	{
		question: 'What is the difference between a co-parenting app and a shared calendar like Google Calendar?',
		answer:
			'A shared calendar handles scheduling only. A co-parenting app adds tamper-proof messaging, expense tracking, documented calls, and court-admissible records: the features that matter once there is conflict or a court order involved.',
	},
	{
		question: 'Do I need a co-parenting app, or can I just build a schedule?',
		answer:
			'If you and your co-parent communicate well and mainly need an agreed calendar, you can start by building a clear custody schedule for free with CustodyBuilder, then use a shared calendar. If you need documented messaging, expense splitting, or court records, a paid co-parenting app is worth it.',
	},
	{
		question: 'Is CustodyBuilder a co-parenting app?',
		answer:
			'No. CustodyBuilder is a free tool that builds and visualizes your custody schedule and parenting-plan schedule section. It does not offer messaging, expense tracking, or court records. Use it to design your schedule for free, then pick one of the paid apps above if you need ongoing communication or documentation.',
	},
	{
		question: 'Which co-parenting app is best for expenses?',
		answer:
			'2houses (a dedicated Finance module at one per-family price) and OurFamilyWizard (OFWpay) are strongest for tracking and reimbursing shared expenses. AppClose also handles in-app payments.',
	},
];

export const faqSection = {
	title: 'Co-parenting app FAQs',
	description:
		'Common questions about choosing, pricing, and using co-parenting apps, answered with verified July 2026 data.',
};

export const relatedLinks = [
	{ href: '/custody-schedule-generator/', label: 'Build a custody schedule for free' },
	{ href: '/custodial-schedule/', label: 'Compare 50/50 and other schedule types' },
	{ href: '/sample-parenting-plan/', label: 'See sample parenting plans' },
	{ href: '/legal-custody-vs-physical-custody/', label: 'Legal vs physical custody, explained' },
	{ href: '/custody-percentage-calculator/', label: 'Calculate your parenting-time percentage' },
	{ href: '/holiday-custody-schedule/', label: 'Plan holiday custody' },
];

// ItemList schema payload (no ratings, honest): the set of apps this page compares.
export const itemListApps = [
	{ name: 'OurFamilyWizard', url: 'https://www.ourfamilywizard.com/' },
	{ name: 'TalkingParents', url: 'https://talkingparents.com/' },
	{ name: 'AppClose', url: 'https://www.appclose.com/' },
	{ name: 'Custody X Change', url: 'https://www.custodyxchange.com/' },
	{ name: '2houses', url: 'https://www.2houses.com/' },
	{ name: 'Fayr', url: 'https://www.fayr.com/' },
	{ name: 'Cozi', url: 'https://www.cozi.com/' },
	{ name: 'Google Calendar', url: 'https://calendar.google.com/' },
];
