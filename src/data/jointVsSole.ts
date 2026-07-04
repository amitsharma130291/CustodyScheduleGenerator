export const meta = {
	title: "Joint Custody vs Sole Custody: What's the Difference?",
	description:
		'Joint custody means both parents share; sole custody means one parent. Compare the two, when each is ordered, pros and cons, and how they shape the schedule.',
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

export const editorialReview = {
	reviewedFor: [
		'Joint vs sole custody definitions (US, geo-neutral)',
		'How joint and sole apply to both legal and physical custody',
		'When courts commonly order each, framed as considerations',
		'YMYL accuracy: hedged, state-varies framing, not legal advice',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	lastUpdatedLabel: 'Last updated July 2026',
	disclaimer: 'Educational content only, not legal advice.',
};

export const hero = {
	headline: 'Joint Custody vs Sole Custody: What\u2019s the Difference?',
	trustChips: [
		'Plain-English planning guide',
		'Geo-neutral, US terms explained',
		'Educational only, not legal advice',
	],
	intro:
		'Joint custody means both parents share; sole custody means one parent holds it. That single idea is about how much each parent gets, and it applies to both halves of custody: who makes the decisions and where the child lives. This guide defines joint and sole for each half, shows when courts commonly order each, weighs the trade-offs, and points you to the tool that turns the arrangement into a real calendar.',
	boundary:
		'Terms and presumptions vary by state, so this page stays general. Use it to understand the split, then build a schedule you can share and adjust.',
};

export const keyTakeaways = {
	title: 'Key takeaways',
	points: [
		'Joint means shared between both parents; sole means concentrated in one parent.',
		'Joint and sole each apply to legal custody (deciding) and physical custody (living) independently, so joint legal plus sole physical is a common mix.',
		'Joint custody does not automatically mean a 50/50 split, and sole custody rarely means the other parent has no contact.',
		'Only physical custody becomes a schedule: joint physical leans toward an even rotation, sole or primary physical toward a main home plus visitation.',
	],
};

export const boundaryCallout = {
	title: 'What this page covers (and where to go for more)',
	intro:
		'Custody answers two separate questions, and this page owns one of them.',
	covers: [
		'This page: the amount axis. Joint (shared) vs sole (one parent), and how that split attaches to each kind of custody.',
	],
	elsewhere: [
		{
			label: 'The type axis (who decides vs where the child lives)',
			linkLabel: 'Legal custody vs physical custody',
			href: '/legal-custody-vs-physical-custody/',
			note: 'For the full breakdown of the two custody types themselves, read the type guide. This page uses those terms but does not re-explain them.',
		},
		{
			label: 'The actual schedule patterns',
			linkLabel: 'Custodial schedule (schedule types)',
			href: '/custodial-schedule/',
			note: 'For how a rotation runs across the week, read the schedule-types hub. This page maps a split to a schedule shape, then hands off.',
		},
	],
};

export const glanceTable = {
	title: 'Joint custody vs sole custody at a glance',
	intro:
		'Joint vs sole is a split, not a type. It answers how much each parent gets, and it can attach to either kind of custody. The table below is the short version; every row is unpacked further down the page.',
	columns: ['', 'Joint custody', 'Sole custody'],
	rows: [
		{
			label: 'Plain meaning',
			joint: 'Shared between both parents',
			sole: 'Held by one parent',
		},
		{
			label: 'Applies to legal custody',
			joint: 'Both parents share the major decisions',
			sole: 'One parent makes the major decisions',
		},
		{
			label: 'Applies to physical custody',
			joint: 'Child lives substantially with both parents',
			sole: 'Child lives mainly with one parent; other usually has visitation',
		},
		{
			label: 'Other parent still involved?',
			joint: 'Yes, by definition',
			sole: 'Often yes, through visitation and shared legal custody',
		},
		{
			label: 'Commonly ordered when',
			joint: 'Parents cooperate, live close, and it is safe',
			sole: 'Safety concerns, long distance, or a parent is unavailable',
		},
		{
			label: 'Schedule it tends to produce',
			joint: 'An even or near-even rotation (physical)',
			sole: 'A primary home plus visitation (physical)',
		},
	],
	takeaway:
		'The one line to remember: joint and sole describe how a right is split, and each can apply to deciding and to living separately. That is why a family can be joint on decisions and sole on residence at the same time.',
};

export const jointSection = {
	title: 'What is joint custody?',
	intro:
		'Joint custody, sometimes called shared custody, means both parents are involved in the right in question. Because there are two kinds of custody, joint can describe shared decisions, shared living time, or both.',
	subsections: [
		{
			id: 'joint-legal',
			heading: 'Joint legal custody',
			body: 'Both parents keep an equal voice in the big choices, from which school the child attends to medical care and how the child is raised. In day-to-day terms it means those calls get made together rather than by one parent alone. Sharing decisions carries no assumption about the calendar, so joint legal custody sits comfortably alongside a child who lives mostly at one home.',
		},
		{
			id: 'joint-physical',
			heading: 'Joint physical custody',
			body: 'The child lives with both parents for substantial, roughly balanced time on a set schedule. This is the arrangement that needs a real parenting-time rotation. Joint physical custody does not require an exact 50/50 split; it means the time with each parent is significant rather than occasional.',
		},
	],
};

export const soleSection = {
	title: 'What is sole custody?',
	intro:
		'Sole custody means one parent holds the right in question. As with joint, it can describe decision-making, residence, or both, so it helps to name which half you mean.',
	subsections: [
		{
			id: 'sole-legal',
			heading: 'Sole legal custody',
			body: 'One parent carries the decision-making authority and can act on the major choices without the other parent signing off. This is more commonly seen where joint decisions have broken down or would put the child at risk, and it is less often used as a starting point. A parent without a decision-making role can still keep scheduled time with the child.',
		},
		{
			id: 'sole-physical',
			heading: 'Sole and primary physical custody',
			body: 'One parent, sometimes labelled the custodial or residential parent, is where the child lives nearly all of the time, and the other parent generally keeps a set visitation schedule. What sole physical custody governs is the address, not the relationship, so ongoing contact through a visitation routine is the norm rather than the exception.',
		},
	],
};

export const terminologySection = {
	title: '"Primary," "full," "shared," and the most common combination',
	intro:
		'A few everyday terms cause most of the confusion. Terminology varies by state, so treat these as common usage rather than fixed labels.',
	items: [
		{
			term: '"Primary" physical custody',
			body: 'A middle-ground label common in many states. The child\u2019s main residence is with one parent, who is sometimes called the residential parent, while the second parent keeps real but smaller parenting time. People often use it in place of sole physical custody, though it reads as the gentler of the two.',
		},
		{
			term: '"Full custody"',
			body: 'A casual, everyday phrase that usually means the same as sole custody. "Sole" is the more legally accepted term.',
		},
		{
			term: '"Shared custody"',
			body: 'A common synonym for joint custody: both parents share the right in question.',
		},
	],
	combo:
		'The single most-encountered real-world mix is joint legal plus sole (or primary) physical custody: both parents keep a say in the big decisions, while the child has one primary home and the other parent has visitation. For the full breakdown of how the two custody types themselves work and combine, read the legal custody vs physical custody guide rather than re-reading it here.',
};

export const courtsSection = {
	title: 'When courts commonly order joint vs sole',
	intro:
		'This is a general, educational picture, not the law in any particular state. Read every point as "commonly" and "in many states," because presumptions and factors genuinely differ.',
	jointHeading: 'Joint custody is commonly workable when',
	jointPoints: [
		'Both parents agree it serves the child\u2019s best interests.',
		'Parents cooperate reasonably well and can make decisions together.',
		'They live close enough for a shared arrangement to be practical for school and activities.',
		'Both parents want to be actively involved, and there is no history of abuse or safety concerns.',
	],
	soleHeading: 'Sole custody is commonly considered when',
	solePoints: [
		'Both parents agree it is in the child\u2019s best interest.',
		'One parent travels extensively or has a schedule that makes shared residence impractical.',
		'The parents live far apart, making a long-distance arrangement necessary.',
		'There are concerns about safety, substance abuse, neglect, or a parent who has been largely absent.',
	],
	caveat:
		'A lot of states begin from the child\u2019s best interests, and a number lean toward keeping both parents in the picture, but the exact presumptions and wording differ place to place. Shared custody carries no requirement of equal time, and even in states that lean joint, a parent can still ask for a sole arrangement given clear, compelling reasons. This section explains ideas; it is not legal advice and predicts no result.',
};

export const prosConsSection = {
	title: 'Pros and cons of joint vs sole custody',
	intro:
		'These are considerations families commonly weigh, not verdicts. What fits depends on the child and the circumstances.',
	columns: ['Arrangement', 'Commonly cited upsides', 'Commonly cited challenges'],
	rows: [
		{
			label: 'Joint custody',
			pros: 'The child keeps an active relationship with both parents; the day-to-day load is shared; each parent has someone to talk decisions through; it models cooperation.',
			cons: 'It needs a lot of coordination and communication; agreeing on major decisions can be hard; two homes mean more transitions; running two equipped homes can cost more.',
		},
		{
			label: 'Sole custody',
			pros: 'One stable primary home and routine; faster, clearer decisions; can be the safer choice where the other parent poses a genuine risk; fewer transitions.',
			cons: 'Less time with the noncustodial parent; one parent carries most of the daily load; the other parent can feel less involved, though joint legal custody often keeps them in big decisions.',
		},
	],
	note:
		'Sole custody is commonly tied to a specific situation such as safety or distance, rather than treated as a default win. Joint legal custody often sits alongside sole physical custody, so "sole" on residence does not have to mean "out" on decisions.',
};

export const scheduleSection = {
	title: 'How joint vs sole custody shapes the schedule',
	intro:
		'Once you have picked joint or sole for physical custody, the split turns into a parenting-time schedule. Keep this at the mapping level: the arrangement decides the shape, and the tool builds the actual calendar.',
	points: [
		{
			heading: 'Joint physical maps to an even rotation',
			body: 'Because the child lives substantially with both parents, you need a calendar that splits the nights fairly evenly. That is an equal or near-equal pattern.',
		},
		{
			heading: 'Sole or primary physical maps to a primary home plus visitation',
			body: 'The child has one base, and the other parent has scheduled parenting time such as weekends, a midweek visit, and holidays.',
		},
		{
			heading: 'Legal custody produces no calendar',
			body: 'Decision-making authority, joint or sole, never sets overnights. Only the physical arrangement becomes a schedule, which is why joint legal custody does not by itself mean shared time.',
		},
	],
	boundary:
		'The mapping is where this page stops. The nuts and bolts of any single rotation, including handovers, holidays, and summer breaks, live on the dedicated schedule guides and inside the generator.',
};

export const misconceptions = {
	title: 'Common misconceptions about joint and sole custody',
	intro:
		'Most of the muddle comes from reading joint vs sole as a single all-or-nothing verdict. In truth it is a split laid over two separate rights, and blurring that line produces the errors below.',
	items: [
		{
			myth: '"Joint custody means exactly 50/50 time."',
			truth:
				'Not automatically. Joint means shared, not necessarily equal, and joint legal custody says nothing about time at all. Joint physical custody gives both parents substantial time, but it can still be unequal.',
		},
		{
			myth: '"Sole custody means the other parent is cut out completely."',
			truth:
				'Usually false. Sole physical custody controls residence, and the noncustodial parent almost always has scheduled visitation. With joint legal custody they still help decide school, healthcare, and religion.',
		},
		{
			myth: '"Sole custody is the goal, the stronger thing to fight for."',
			truth:
				'Where it is safe to do so, courts tend to keep both parents in a child\u2019s life. A sole arrangement usually answers a particular circumstance rather than acting as a trophy, so chasing it is not automatically the smart play.',
		},
		{
			myth: '"Joint vs sole is a single win-or-lose decision."',
			truth:
				'It is applied separately to two different rights, deciding and housing. You can be joint on one and sole on the other, which is exactly why the common joint legal plus sole physical mix exists.',
		},
		{
			myth: '"Joint legal custody means the child splits time evenly."',
			truth:
				'No. Legal custody is about decisions, not the calendar. A child can have joint legal custody and still live primarily with one parent.',
		},
	],
};

export const examples = {
	title: 'Real examples of joint and sole custody',
	intro:
		'Three short, invented cases show how an everyday arrangement lands on a joint-or-sole split across both halves of custody. Nobody here is a real client; each one labels the split and the reason it fits.',
	cases: [
		{
			id: 'priya',
			name: 'Example A: Priya',
			combo: 'Joint legal + sole (primary) physical',
			body: 'Priya\u2019s home base is with her dad through the school week, and she stays with her mum on alternating weekends plus a Wednesday evening. Big questions, which school, which dentist, whether to switch sports clubs, still need both parents to agree. So the decision half is shared while the residence half sits mostly with one parent. In practice the split appears as a primary-home calendar, with the joint decision-making running quietly underneath it. Families land here more often than any other pairing.',
		},
		{
			id: 'daniel',
			name: 'Example B: Daniel',
			combo: 'Joint legal + joint physical',
			body: 'Daniel swaps between two households on a rolling weekly basis, and his parents settle school, medical, and activity choices as a pair. Both halves are shared here, which is why his week-to-week time has to be laid out as a genuine balanced rotation rather than a base plus visits. A tool that lays out alternating weeks on a dated calendar is built for exactly this shape.',
		},
		{
			id: 'nadia',
			name: 'Example C: Nadia',
			combo: 'Sole legal + sole physical',
			body: 'Following a stretch with little contact, one of Nadia\u2019s parents now holds both her main home and the final say on major decisions, while the other is rebuilding time through supervised visits. Here both halves rest with a single parent. It is an example of authority and residence gathering in one place, and a reminder that this pairing tends to follow a specific safety or fitness reason rather than being anyone\u2019s default target.',
		},
	],
};

export const faqItems = [
	{
		question: 'What is the difference between joint and sole custody?',
		answer:
			'Joint custody means both parents share the custody, either shared decision-making (joint legal) or shared living time (joint physical). Sole custody means one parent holds it. Because legal and physical custody are decided separately, "joint" and "sole" can each apply to a different half.',
	},
	{
		question: 'What does joint custody mean?',
		answer:
			'Joint, or shared, custody means both parents are involved. Joint legal custody means they share the big decisions about school, healthcare, and religion; joint physical custody means the child lives substantially with both parents on a schedule.',
	},
	{
		question: 'What does sole custody mean?',
		answer:
			'Sole custody means one parent holds that custody. Sole legal custody means one parent makes the major decisions; sole physical custody means the child lives mainly or entirely with one parent, and the other usually has scheduled visitation.',
	},
	{
		question: 'Does joint custody mean 50/50 time?',
		answer:
			'Not automatically. Joint custody means shared, not necessarily equal. Joint physical custody gives both parents substantial time, but it can still be unequal. A true 50/50 split is one specific physical arrangement, not a guarantee of "joint."',
	},
	{
		question: 'Can you have joint legal custody but sole physical custody?',
		answer:
			'Yes. It is among the most frequent setups families end up with: the two parents keep a shared say over the major choices, yet the child\u2019s main residence is with one of them while the other holds set parenting time.',
	},
	{
		question: 'Is joint or sole custody better?',
		answer:
			'Neither is better in the abstract. Courts commonly favour keeping both parents involved where it is safe and workable, and many states lean toward joint arrangements. Sole custody is typically for specific situations such as safety concerns, distance, or a parent being unavailable. What fits depends on the child\u2019s best interests.',
	},
	{
		question: 'What is the difference between sole custody and primary custody?',
		answer:
			'They are close. Sole physical custody means the child lives almost entirely with one parent. Primary custody means the child lives with one parent the majority of the time while the other still has meaningful parenting time. Terminology varies by state.',
	},
	{
		question: 'If I have sole custody, does the other parent still see the child?',
		answer:
			'Usually yes. Sole physical custody controls where the child lives, not whether the other parent has contact. The noncustodial parent almost always has scheduled visitation, and with joint legal custody they still help make major decisions.',
	},
	{
		question: 'How does joint vs sole custody affect the parenting schedule?',
		answer:
			'Joint physical custody leads to a more even rotation, because the child lives substantially with both parents. Sole or primary physical custody leads to a primary home plus visitation for the other parent. Legal custody, joint or sole, does not set the calendar at all.',
	},
	{
		question: 'Is this legal advice?',
		answer:
			'No. Everything here is general background to help you plan. Since the labels, presumptions, and rules shift from state to state, confirm anything specific with your local court or a qualified professional.',
	},
];

export const faqSection = {
	title: 'Joint vs sole custody: frequently asked questions',
	description:
		'Short, plain answers to the questions parents most often ask about how joint and sole custody differ and combine.',
};

export const relatedLinks = [
	{ label: 'Custody schedule generator', href: '/custody-schedule-generator/' },
	{ label: 'Legal custody vs physical custody', href: '/legal-custody-vs-physical-custody/' },
	{ label: 'Custodial schedule (schedule types)', href: '/custodial-schedule/' },
	{ label: '50/50 custody schedule', href: '/50-50-custody-schedule/' },
	{ label: 'Every-other-weekend custody schedule', href: '/every-other-weekend-custody-schedule/' },
	{ label: 'Custody percentage calculator', href: '/custody-percentage-calculator/' },
	{ label: 'Sample parenting plan', href: '/sample-parenting-plan/' },
	{ label: 'Custody schedule by age', href: '/custody-schedule-by-age/' },
];
