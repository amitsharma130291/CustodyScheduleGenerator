// Data for /sample-parenting-plan/ — the EXAMPLES hub.
// Mode: PURE EDUCATION / EXAMPLES. The generator is LINKED (CTA), never embedded.
// This page owns "complete, annotated, geo-neutral sample parenting plans by
// family situation" — five distinct fictional families rendered as full worked
// plans. It does NOT re-host the blank template (/parenting-plan-template/),
// re-teach schedule mechanics (/custodial-schedule/ + pattern pages), or
// re-teach custody definitions (/legal-custody-vs-physical-custody/). It uses
// the terms and links out. All content is educational, hedged, and fictional.

export const meta = {
	title: 'Sample Parenting Plan: 5 Complete Examples to Copy',
	description:
		'Five complete sample parenting plans: 50/50, high-conflict, long-distance, primary custody, and infant step-up. Read full examples and build your own free.',
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

export const editorialReview = {
	reviewedFor: [
		'Complete, worked sample parenting plans by family situation (US, geo-neutral)',
		'Educational planning content, not a blank form and not legal advice',
		'YMYL accuracy: hedged, state-varies framing, fictional illustrative families',
		'Clear boundary: examples link out to the template, schedule, and definition pages',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	lastUpdatedLabel: 'Last updated July 2026',
	disclaimer: 'Educational content only: not legal advice.',
};

export const hero = {
	headline: 'Sample Parenting Plans: 5 Complete Examples',
	trustChips: [
		'Five full worked plans, free, no sign-up',
		'Geo-neutral, plain-English examples',
		'Educational only, not legal advice',
	],
	intro:
		'A sample parenting plan is a completed example you can read end to end and adapt, not a blank form to fill in. Below are five fictional families in different situations, each written out as a full plan with short notes explaining why each clause reads the way it does. Every family is made up, and every plan is illustrative.',
	boundary:
		'Want the blank version to start your own? Use the parenting plan template. These pages are the filled-in examples that show you what a finished plan looks like in practice.',
};

export const keyTakeaways = {
	title: 'Key takeaways',
	points: [
		'A sample plan is a completed example; a template is the blank form. Read the samples here, then start your own from the template.',
		'A strong plan names exact days, times, and exchange locations. Vague wording (such as "reasonable visitation") is the most common drafting mistake.',
		'Each of the five examples covers the same core sections: schedule, holidays, communication, decision-making, and dispute resolution.',
		'The examples reference each schedule pattern by name and link out. They do not re-explain how the rotations work.',
	],
};

// Quick orientation: what a complete plan contains. Links OUT, never re-teaches.
export const orientation = {
	title: 'What a parenting plan includes (quick orientation)',
	intro:
		'Every example below follows the same skeleton. Here is the short version of the core sections most plans cover, with a pointer to the page that goes deep on each one. This page keeps the sections brief on purpose: the examples are the value, not another explainer.',
	sections: [
		{
			label: 'Custody designation',
			body: 'Who decides (legal) and where the child lives (physical), stated as joint or primary. The examples use these terms; for the definitions, see the linked custody guide.',
			link: { label: 'Legal vs physical custody', href: '/legal-custody-vs-physical-custody/' },
		},
		{
			label: 'Residential schedule',
			body: 'The regular rotation the child lives by. Each example names its pattern and links to the page that shows how that pattern runs across a week or fortnight.',
			link: { label: 'Schedule types', href: '/custodial-schedule/' },
		},
		{
			label: 'Holidays and school breaks',
			body: 'A separate alternating-year table for holidays, birthdays, and summer, kept out of the regular rotation so the two never collide.',
			link: { label: 'Holiday custody schedule', href: '/holiday-custody-schedule/' },
		},
		{
			label: 'Transportation and exchanges',
			body: 'Exact handoff times and places, who drives, and a documented rule for lateness. Specificity here prevents most day-to-day conflict.',
			link: null,
		},
		{
			label: 'Communication',
			body: 'The channel parents use with each other, and the window when the child can call the off-duty parent. High-conflict plans tighten this the most.',
			link: null,
		},
		{
			label: 'Decision-making and disputes',
			body: 'Routine versus major decisions, a written-notice step, a mediation window before court, and a fixed annual review date.',
			link: null,
		},
	],
	howToRead:
		'How to read these examples: they are illustrative, not legal advice. Terms and requirements vary by state, so treat every clause as a starting idea and have any plan you build reviewed locally before filing.',
};

// The five complete worked example plans. Each is a full plan with named
// (fictional) parents, a schedule that links out, the core sections, 2-4
// annotation notes, and an illustrative line. Written to be distinct from each
// other and from every sibling page.
export const examples = [
	{
		id: 'amicable-5050',
		marker: 'Example 1',
		heading: 'Example 1: Amicable 50/50 co-parents',
		typeChip: 'Week-on-week-off, joint physical',
		situation:
			'Dana and Marcus share one child, Ava (age 8). They live ten minutes apart in the same school district and cooperate well. They want equal time and a plan light enough that it does not feel like a rulebook.',
		scheduleLink: { label: 'week-on-week-off schedule', href: '/week-on-week-off-custody-schedule/' },
		altScheduleLink: { label: '50/50 custody schedule', href: '/50-50-custody-schedule/' },
		sections: [
			{
				label: 'Custody designation',
				body: 'Joint legal and joint physical custody. Both parents share major decisions, and Ava spends roughly equal time in each home.',
			},
			{
				label: 'Residential schedule',
				body: 'Week-on-week-off, with the exchange every Sunday at 6:00 PM at Dana\'s home. The off-week parent has an optional Wednesday dinner from 5:30 to 8:00 PM so no stretch goes a full seven days without contact.',
			},
			{
				label: 'Holidays and school breaks',
				body: 'Major holidays alternate by even and odd year. Ava\'s birthday is split, morning with one parent and afternoon with the other. Each parent takes one uninterrupted two-week summer block, chosen by April 1 with 30 days\' notice.',
			},
			{
				label: 'Transportation and exchanges',
				body: 'The receiving parent handles pickup at the fixed Sunday location. If either parent is running late, they message through the shared app; a 20-minute grace applies before it is noted.',
			},
			{
				label: 'Communication',
				body: 'Parents coordinate through a shared co-parenting app. Ava may call the off-duty parent any evening between 7:00 and 7:30 PM.',
			},
			{
				label: 'Decision-making and disputes',
				body: 'Routine calls are made by whichever parent is on duty. Major medical and education decisions are agreed jointly, in writing, within 48 hours. Disagreements go to a written notice, then a 30-day mediation window, with a standing review each August.',
			},
		],
		annotations: [
			'A single midweek dinner keeps the seven-day block from feeling long for an eight-year-old, without adding a second exchange that both homes have to manage.',
			'A fixed Sunday exchange location removes the weekly "whose turn to drive" negotiation that quietly builds resentment even between cooperative parents.',
			'Setting the summer block deadline in April means both parents can book travel early, instead of racing to claim the same two weeks in June.',
		],
	},
	{
		id: 'high-conflict',
		marker: 'Example 2',
		heading: 'Example 2: High-conflict co-parents',
		typeChip: 'Every-other-weekend base, written-only communication',
		situation:
			'Renee and Paul have two children (ages 6 and 11). Trust is low and past scheduling disputes turned into arguments at handoffs. They need a plan that keeps direct contact to a minimum and documents everything.',
		scheduleLink: { label: 'every-other-weekend schedule', href: '/every-other-weekend-custody-schedule/' },
		altScheduleLink: null,
		sections: [
			{
				label: 'Custody designation',
				body: 'Joint legal custody with the children\'s primary residence at Renee\'s home. Paul has scheduled parenting time. This is a parallel-parenting arrangement, where each parent runs their own time with as little coordination as possible.',
			},
			{
				label: 'Residential schedule',
				body: 'Paul has the children every other weekend, Friday at 3:00 PM to Sunday at 6:00 PM, plus one midweek overnight (Wednesday 3:00 PM to Thursday school drop-off). Everything else is with Renee.',
			},
			{
				label: 'Transportation and exchanges',
				body: 'All exchanges happen at school pickup or drop-off so the parents never meet in person. When school is closed, handoffs move to a monitored public location, curbside, with a 15-minute late grace that is then documented in the app.',
			},
			{
				label: 'Communication',
				body: 'Written-only, through a co-parenting app that timestamps every message. No calls or texts between parents except a defined emergency clause. Each child has a private daily call window with the off-duty parent.',
			},
			{
				label: 'Decision-making and disputes',
				body: 'Each parent handles routine care during their own time with no need to consult. Major decisions require written agreement; a deadlock goes straight to the mediation step, and neither parent acts unilaterally in the meantime.',
			},
		],
		annotations: [
			'Written-only communication lowers conflict because it removes tone of voice and gives both parents a timestamped record, which discourages the small provocations that escalate in person.',
			'School-based exchanges mean the children are never standing between two tense parents at a doorway; the handoff is invisible to them.',
			'Parallel parenting is not the same as co-parenting: the goal is not teamwork but a clean separation of each parent\'s time, which suits families where cooperation keeps breaking down.',
		],
	},
	{
		id: 'long-distance',
		marker: 'Example 3',
		heading: 'Example 3: Long-distance and relocation',
		typeChip: 'School-year primary home plus long-break blocks',
		situation:
			'Sofia and James share one child, Leo (age 10). A job move put them about 600 miles apart. A weekly rotation is impossible, so the plan trades frequency for longer blocks and keeps the distant parent present between visits.',
		scheduleLink: { label: 'primary-residence schedule structure', href: '/custodial-schedule/' },
		altScheduleLink: null,
		sections: [
			{
				label: 'Custody designation',
				body: 'Joint legal custody preserved despite the distance, with Leo\'s primary residence at one home during the school year. Both parents keep a say in school, medical, and activity decisions.',
			},
			{
				label: 'Residential schedule',
				body: 'Leo lives with the school-year parent on weekdays. The distant parent gets the bulk of the long breaks: about six weeks of summer, alternating winter break, and every spring break, plus any long weekend the distant parent travels in with two weeks\' notice.',
			},
			{
				label: 'Travel and logistics',
				body: 'The plan names who books flights, who pays, and the unaccompanied-minor rules by airline. A shared itinerary is posted before each trip. If travel is disrupted, missed days are made up from the next available break.',
			},
			{
				label: 'Communication',
				body: 'Scheduled video calls three times a week on set days and times, so the distant parent stays part of Leo\'s routine rather than becoming an occasional visitor.',
			},
			{
				label: 'Decision-making, disputes, and relocation',
				body: 'Joint legal decisions stand, with a named tie-breaker for time-sensitive school choices. A relocation clause sets a 60-day notice period for any further move and describes how the block split re-balances if the distance changes.',
			},
		],
		annotations: [
			'Long-distance plans deliberately trade many short visits for a few long ones, because the travel cost and school calendar make a weekly rotation unworkable.',
			'Fixed video-call slots matter more here than in a local plan: without them, weeks can pass with no contact, and the distant parent slips out of the child\'s daily life.',
			'Writing the relocation notice period into the plan now avoids a fresh court fight later if either parent moves again.',
		],
	},
	{
		id: 'primary-eow-midweek',
		marker: 'Example 4',
		heading: 'Example 4: Primary custody with every-other-weekend and midweek',
		typeChip: 'One primary home, involved second parent nearby',
		situation:
			'Aisha and Tom have two children (ages 9 and 13). The children have one primary home with Aisha, and Tom lives nearby and stays closely involved. They want a plan that gives Tom real weekend time, not just Saturday afternoons.',
		scheduleLink: { label: 'every-other-weekend schedule', href: '/every-other-weekend-custody-schedule/' },
		altScheduleLink: { label: 'custody percentage calculator', href: '/custody-percentage-calculator/' },
		sections: [
			{
				label: 'Custody designation',
				body: 'Joint legal custody, with the children primarily residing with Aisha. Tom has substantial, regular parenting time.',
			},
			{
				label: 'Residential schedule',
				body: 'Tom has every other weekend from Friday after school through Monday school drop-off, extending the weekend into a real stretch of mornings. He also has every Tuesday overnight. To estimate what that works out to as a percentage, both parents used the custody percentage calculator.',
			},
			{
				label: 'Holidays and school breaks',
				body: 'A standard alternating-year holiday table sits on top of the base schedule, with the holiday clause always overriding the regular weekend when the two overlap.',
			},
			{
				label: 'Communication',
				body: 'Parents use text or the app for coordination. The 13-year-old manages their own call cadence with the off-duty parent, while the 9-year-old has a set evening window.',
			},
			{
				label: 'Decision-making and disputes',
				body: 'Day-to-day decisions rest with the parent on duty. A teen-input clause lets the 13-year-old weigh in on their own activities and schedule, without putting the child in charge of the plan. Disputes follow a written-notice step and a review timed to the school year.',
			},
		],
		annotations: [
			'Extending Tom\'s weekend to Monday school drop-off gives him ordinary weekday mornings (breakfast, the school run) rather than only the "fun parent" Saturday, which research on involved second parents consistently favors.',
			'A teen-input clause acknowledges that a 13-year-old\'s preferences carry weight, while the phrase "input, not decision" keeps the adults responsible for the plan.',
			'Layering holidays as an override, not a rewrite, means nobody has to recalculate the base schedule every time a holiday lands on a weekend.',
		],
	},
	{
		id: 'infant-step-up',
		marker: 'Example 5',
		heading: 'Example 5: Infant and toddler step-up plan',
		typeChip: 'Three graduated stages with pre-written triggers',
		situation:
			'Bea and Chris share an infant, Noah (8 months). Both live locally and want to build toward shared time as Noah grows. Rather than fight the same fight every year, they pre-write a three-stage step-up plan with the triggers baked in.',
		scheduleLink: { label: '2-2-3 schedule', href: '/2-2-3-custody-schedule/' },
		altScheduleLink: { label: 'custody schedule by age', href: '/custody-schedule-by-age/' },
		sections: [
			{
				label: 'Custody designation',
				body: 'Joint legal custody from the start, with Noah\'s primary residence at Bea\'s home during infancy. Physical custody widens in defined stages as Noah gets older.',
			},
			{
				label: 'Stage 1 (0 to 12 months)',
				body: 'Noah lives primarily with Bea. Chris has frequent short visits: three weekday visits of two to three hours each, plus one weekend block, with no overnights yet. Frequency over duration keeps a young infant familiar with both parents without long separations.',
			},
			{
				label: 'Stage 2 (about 12 to 36 months)',
				body: 'Once Noah is settled, the plan adds one overnight per week with Chris, then a second overnight after a few months, as Noah adapts.',
			},
			{
				label: 'Stage 3 (age 3 and up)',
				body: 'The plan transitions to a standard shared rotation such as a 2-2-3 pattern. From here it links out to the age-based schedule guidance rather than reinventing the rotation.',
			},
			{
				label: 'Communication, decisions, and review',
				body: 'Short daily video or photo check-ins keep the off-duty parent connected, and feeding, nap, and routine notes travel between homes. Pediatric decisions are coordinated jointly, and the plan sets a review at each stage boundary to confirm Noah is ready before stepping up.',
			},
		],
		annotations: [
			'Many child-development sources suggest infants do better with frequent short contact than with long separations, so Stage 1 favors more visits, not longer ones. This varies by child.',
			'Pre-writing the step-up triggers (age and adjustment) means the plan grows on a schedule both parents already agreed to, instead of forcing a fresh negotiation every year.',
			'A review at each stage boundary is a safety valve: if Noah is not ready for overnights on the calendar date, the parents pause and adjust rather than pushing ahead.',
		],
	},
];

// Common mistakes the examples avoid (research §5). Educational, hedged.
export const mistakes = {
	title: 'Common mistakes these examples avoid',
	intro:
		'The five plans above are written to sidestep the problems mediators and courts see most often. Each of these is a habit worth checking your own draft against.',
	items: [
		{
			heading: 'Vague language',
			body: 'Phrases like "reasonable visitation" or "alternate weekends as agreed" leave everything open to argument. Every example names exact days, times, and exchange locations instead.',
		},
		{
			heading: 'No future-proofing',
			body: 'A plan built only for a toddler breaks the moment school, activities, and driving age arrive. Example 5 writes the growth in from the start.',
		},
		{
			heading: 'Missing the small items that blow up later',
			body: 'Holiday logistics, make-up time for missed days, backup childcare, and new-partner ground rules are the clauses parents forget and then fight over. The examples fold them in.',
		},
		{
			heading: 'Mixing holidays into the regular schedule',
			body: 'Holidays belong in a separate override table, not buried in the rotation paragraph, so the two never contradict each other.',
		},
		{
			heading: 'No decision or dispute process',
			body: 'Without a written-notice step, a mediation window, and a fixed review date, every disagreement escalates. Each example sets that path.',
		},
		{
			heading: 'Retyping the schedule in prose',
			body: 'Describing the calendar in a paragraph invites errors against the real dates. Generate the schedule and attach it as an exhibit instead.',
		},
	],
};

// FAQ — 10 questions (>= 8 required). Substantive, link out where a sibling owns it.
export const faqItems = [
	{
		question: 'What is a sample parenting plan?',
		answer:
			'It is a completed example of a co-parenting agreement showing how a real family might structure the schedule, holidays, communication, and decision-making. It is a model to read and adapt, not a form you file as-is.',
	},
	{
		question: 'What should a parenting plan include?',
		answer:
			'Most plans cover a custody designation, a residential schedule, holidays and school breaks, transportation and exchanges, communication rules, decision-making, and a dispute-resolution process. Requirements vary by state.',
	},
	{
		question: 'Is a sample parenting plan the same as a template?',
		answer:
			'No. A template is the blank form you fill in; a sample is a filled-in example. Use the parenting plan template to start your own, and use these samples to see what a finished plan looks like.',
		links: [{ label: 'Parenting plan template', href: '/parenting-plan-template/' }],
	},
	{
		question: 'Can I copy a sample parenting plan word for word?',
		answer:
			'You can use one as a starting point, but adapt every detail to your children, your distance, and your schedule, then have it reviewed locally before filing. A copied-verbatim plan rarely fits a real family.',
	},
	{
		question: 'What does a 50/50 parenting plan look like?',
		answer:
			'See Example 1: week-on-week-off with a midweek dinner, alternating holidays, and shared decision-making. For how the rotation itself runs, read the 50/50 custody schedule guide.',
		links: [{ label: '50/50 custody schedule', href: '/50-50-custody-schedule/' }],
	},
	{
		question: 'How is a high-conflict parenting plan different?',
		answer:
			'It uses written-only communication, neutral or school-based exchanges, and a strict dispute process to keep direct contact low. Example 2 shows this parallel-parenting approach in full.',
	},
	{
		question: 'What is a step-up parenting plan for a baby?',
		answer:
			'It is a staged plan that starts with frequent short visits for an infant and gradually adds overnights as the child grows. Example 5 lays out all three stages with the triggers written in.',
	},
	{
		question: 'How do long-distance parenting plans handle time?',
		answer:
			'They trade frequency for longer blocks: most of summer and alternating school breaks with the distant parent, plus scheduled video calls. Example 3 works through a 600-mile arrangement.',
	},
	{
		question: 'Where do holidays go in a parenting plan?',
		answer:
			'In a separate alternating-year override table, not mixed into the regular rotation. See the holiday custody schedule guide for the full method.',
		links: [{ label: 'Holiday custody schedule', href: '/holiday-custody-schedule/' }],
	},
	{
		question: 'Do I need a lawyer to write a parenting plan?',
		answer:
			'Not always, but many parents have a completed plan reviewed by a family-law professional or mediator before filing. This page is educational information for planning, not legal advice.',
	},
];

export const faqSection = {
	title: 'Sample parenting plans: frequently asked questions',
	description:
		'Short, plain answers to the questions parents most often ask when they look for a sample or example parenting plan.',
};

export const buildCta = {
	title: 'Build your own parenting plan',
	body:
		'Read an example that fits your situation, then make it yours. Start from the blank template for the wording, and generate a dated schedule you can attach as the exhibit. Both are free, with no sign-up.',
	generatorHref: '/custody-schedule-generator/',
	generatorLabel: 'Build your schedule',
	templateHref: '/parenting-plan-template/',
	templateLabel: 'Open the blank template',
};

export const relatedLinks = [
	{ label: 'Parenting plan template (blank form)', href: '/parenting-plan-template/' },
	{ label: 'Custody schedule generator', href: '/custody-schedule-generator/' },
	{ label: 'Legal vs physical custody', href: '/legal-custody-vs-physical-custody/' },
	{ label: 'Custodial schedule (schedule types)', href: '/custodial-schedule/' },
	{ label: 'Custody schedule by age', href: '/custody-schedule-by-age/' },
	{ label: 'Holiday custody schedule', href: '/holiday-custody-schedule/' },
	{ label: 'Custody percentage calculator', href: '/custody-percentage-calculator/' },
];
