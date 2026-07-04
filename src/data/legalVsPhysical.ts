export const meta = {
	title: 'Legal Custody vs Physical Custody: The Difference',
	description:
		'Legal custody is who decides; physical custody is where the child lives. See the difference, the 4 combinations, and how physical custody sets the schedule.',
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

export const editorialReview = {
	reviewedFor: [
		'Legal vs physical custody definitions (US, geo-neutral)',
		'Joint and sole variations of each custody type',
		'The four legal/physical custody combinations',
		'YMYL accuracy: hedged, state-varies framing, not legal advice',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	lastUpdatedLabel: 'Last updated July 2026',
	disclaimer: 'Educational content only — not legal advice.',
};

export const hero = {
	headline: 'Legal Custody vs Physical Custody: What\u2019s the Difference?',
	trustChips: [
		'Plain-English planning guide',
		'Geo-neutral, US terms explained',
		'Educational only, not legal advice',
	],
	intro:
		'Custody is really two separate questions a court answers one at a time. Legal custody is about who decides on school, healthcare, and religion. Physical custody is about where the child lives and sleeps. This guide explains both, shows the four ways they combine, and points you to the tool that turns physical custody into an actual calendar.',
	boundary:
		'Terms and rules vary by state, so this page keeps things general. Use it to understand the concepts, then build a schedule you can share and adjust.',
};

export const keyTakeaways = {
	title: 'Key takeaways',
	points: [
		'Legal custody is about who decides (school, healthcare, religion); physical custody is about where the child lives and sleeps.',
		'The two are decided separately, so they combine into four arrangements — you can share every decision and still have the child live mostly with one parent.',
		'Only physical custody turns into a parenting-time calendar. Legal custody never sets the schedule on its own.',
		'Joint means shared; sole means one parent. That applies to legal and physical custody independently.',
	],
};

export const glanceTable = {
	title: 'Legal custody vs physical custody at a glance',
	intro:
		'These two rights are decided independently. One controls decisions; the other controls the calendar. The table below is the short version, and every row is unpacked further down the page.',
	columns: ['', 'Legal custody', 'Physical custody'],
	rows: [
		{
			label: 'What it controls',
			legal: 'Who makes the major decisions about the child',
			physical: 'Where the child lives and sleeps',
		},
		{
			label: 'The plain question',
			legal: '"Who decides?"',
			physical: '"Where does the child wake up?"',
		},
		{
			label: 'Covers',
			legal: 'Education, healthcare, religion, major activities',
			physical: 'Day-to-day residence, overnights, parenting-time calendar',
		},
		{
			label: 'Joint version',
			legal: 'Both parents share decision-making',
			physical: 'Child lives with both parents on a set schedule',
		},
		{
			label: 'Sole version',
			legal: 'One parent makes the major decisions',
			physical: 'Child lives mostly with one parent; other usually has visitation',
		},
		{
			label: 'Drives the calendar?',
			legal: 'No',
			physical: 'Yes',
		},
	],
	takeaway:
		'The one line to remember: physical custody is what turns into a schedule, and legal custody does not. Two parents can share every major decision and still have the child live mostly with one of them.',
};

export const legalSection = {
	title: 'What is legal custody?',
	intro:
		'Legal custody is decision-making authority: the right and responsibility to make the major choices about how a child is raised. It covers where the child goes to school, medical and dental care, religious upbringing, and significant activities. It says nothing about which nights the child spends where, so it never sets the calendar on its own.',
	subsections: [
		{
			id: 'joint-legal',
			heading: 'Joint legal custody',
			body: 'Both parents share an equal say in the major decisions: schooling, healthcare, religion, and big activity choices. It is a common arrangement when both parents are fit, even when the child lives mostly with one of them. In practice it means neither parent can unilaterally switch the child\u2019s school or doctor without consulting the other.',
		},
		{
			id: 'sole-legal',
			heading: 'Sole legal custody',
			body: 'One parent holds the decision-making authority and can make the major calls without needing the other\u2019s agreement. Courts generally reserve this for situations where shared decision-making is unworkable or unsafe, rather than treating it as a default. The other parent may still have parenting time even without decision-making rights.',
		},
	],
};

export const physicalSection = {
	title: 'What is physical custody?',
	intro:
		'Physical custody is about residence and time: where the child physically lives and how overnights are split between the parents. This is the half of custody that becomes an actual calendar, which is why the schedule you build depends on the physical arrangement, not the legal one.',
	subsections: [
		{
			id: 'joint-physical',
			heading: 'Joint physical custody',
			body: 'The child spends equal or near-equal time living with each parent. This is the arrangement that needs a real rotation, and an equal-time split is what most people mean by a 50/50 schedule. See the 50/50 custody schedule guide for how that time is divided across a week or fortnight.',
		},
		{
			id: 'sole-physical',
			heading: 'Sole and primary physical custody',
			body: 'The child lives with one parent (often called the primary residential parent) most or all of the time, while the other parent usually has scheduled parenting time. A classic version is an every-other-weekend schedule for the non-residential parent. Terms like "primary physical custody" and "partial custody" are commonly used but vary by state, so treat them as descriptions rather than fixed legal labels.',
		},
	],
};

export const combinations = {
	title: 'The four ways legal and physical custody combine',
	intro:
		'Because the two rights are decided separately, they mix into four practical arrangements. Each pairs a decision-making setup (legal) with a living setup (physical). The "in practice" note describes what daily life tends to look like, not a legal outcome.',
	columns: ['Combination', 'Who decides', 'Where the child lives', 'What it looks like in practice'],
	rows: [
		{
			combo: 'Joint legal + joint physical',
			decides: 'Both parents share decisions',
			lives: 'Child splits time roughly equally',
			practice:
				'Fully shared parenting: both co-decide and co-house. Needs a real equal-time rotation, and works best when parents cooperate. This is where a 50/50 schedule comes in.',
		},
		{
			combo: 'Joint legal + sole physical',
			decides: 'Both parents share decisions',
			lives: 'Child lives mainly with one parent',
			practice:
				'The most common real-world mix. Both parents keep a say in school, health, and religion, but one home is the child\u2019s base and the other has scheduled parenting time.',
		},
		{
			combo: 'Sole legal + joint physical',
			decides: 'One parent decides',
			lives: 'Child splits time roughly equally',
			practice:
				'Less common. The child lives with both parents on a schedule, but one parent holds final decision-making authority. Sharing time while not sharing decisions can create friction.',
		},
		{
			combo: 'Sole legal + sole physical',
			decides: 'One parent decides',
			lives: 'Child lives with one parent',
			practice:
				'The most concentrated arrangement: one parent has both authority and residence. Usually reserved for situations where the other parent is absent or shared arrangements are not safe.',
		},
	],
	note:
		'Only two of these four (the joint-physical rows) produce an equal-time calendar. The other two produce a primary-home calendar with visitation blocks. That is physical custody driving the schedule again.',
};

export const scheduleTieIn = {
	title: 'Why physical custody, not legal custody, sets the schedule',
	intro:
		'This is the practical payoff of keeping the two ideas apart. When a parent asks what their custody schedule looks like, the answer depends only on the physical arrangement.',
	points: [
		{
			heading: 'Legal custody produces no calendar',
			body: 'Joint legal custody tells you nobody is shut out of decisions. It says nothing about which days the child is at which house, so it can never fill in a calendar.',
		},
		{
			heading: 'Physical custody produces the calendar',
			body: 'Once physical custody is defined (joint or primary), you have to answer which nights go to which parent. That answer is a parenting-time schedule.',
		},
		{
			heading: 'Joint physical means an equal-time pattern',
			body: 'A roughly equal split becomes a rotation such as an equal-time 50/50 arrangement. We keep the mechanics on the schedule pages: see the 50/50 custody schedule and the schedule-types hub.',
		},
		{
			heading: 'Sole or primary physical means a primary-home pattern',
			body: 'The child has one main home and the other parent has visitation blocks, often an every-other-weekend rhythm. Again, the how-it-runs detail lives on the dedicated schedule pages.',
		},
	],
	boundary:
		'This page stops at "physical custody is what becomes a schedule." For how each pattern actually runs across the week, holidays, and summer, use the linked schedule guides and the generator rather than re-reading it here.',
};

export const misconceptions = {
	title: 'Common misconceptions about legal and physical custody',
	intro:
		'A lot of confusion comes from treating custody as one thing you win or lose. It is really a bundle of two independent rights, and mixing them up leads to these frequent mistakes.',
	items: [
		{
			myth: '"Legal and physical custody are the same thing."',
			truth:
				'They are two separate decisions. You can have one type of legal custody and a different type of physical custody at the same time, which is exactly why the four combinations exist.',
		},
		{
			myth: '"Joint custody means 50/50 time."',
			truth:
				'Not automatically. "Joint custody" often refers to shared decision-making (joint legal), while equal time is a specific physical arrangement. A friend saying "we have joint custody" does not mean the child spends exactly half the time in each home.',
		},
		{
			myth: '"Legal custody affects the calendar."',
			truth:
				'It does not. Decision-making authority never sets overnights. Only physical custody determines which nights the child spends with each parent.',
		},
		{
			myth: '"Sole physical custody cuts the other parent out of decisions."',
			truth:
				'Not necessarily. Joint legal custody frequently sits alongside sole physical custody, so the non-residential parent still helps decide school, healthcare, and religion.',
		},
		{
			myth: '"Sole custody is the goal."',
			truth:
				'Courts generally favour keeping both parents involved where it is safe. Sole arrangements are typically tied to specific safety or fitness reasons, not treated as a prize.',
		},
	],
};

export const courtsSection = {
	title: 'How courts generally approach custody',
	intro:
		'This is a general, educational picture, not a statement of the law in any particular state. The safe way to read it is "commonly" and "in many states," because presumptions and terminology genuinely differ.',
	points: [
		'Courts generally start from the child\u2019s best interests, though the specific factors each state weighs are different.',
		'In many states, joint legal custody is common when both parents are fit, even where the child lives mainly with one of them.',
		'Legal and physical custody are decided separately almost everywhere, which is why they can be mixed and matched.',
		'Many places have shifted toward softer language: "parenting time" instead of visitation, "residential parent" instead of custodial parent, and "decision-making responsibility" instead of legal custody.',
	],
	caveat:
		'Your state\u2019s terms, presumptions, and rules may differ from the general picture here. This page explains concepts; it is not legal advice, and it does not predict any outcome.',
};

export const examples = {
	title: 'Real examples of legal and physical custody combinations',
	intro:
		'Three educational hypotheticals show how a real situation maps to a legal-plus-physical pairing. The people are fictional, and each example names both custody types with the reason behind it.',
	cases: [
		{
			id: 'maya',
			name: 'Example A: Maya',
			combo: 'Joint legal + primary (sole) physical',
			body: 'Maya lives with her mum on weekdays and sees her dad every other weekend plus one weeknight dinner. Both parents must agree on which school she attends and sign off on medical decisions. Legal custody is joint; physical custody is primary with mum. The calendar is a primary-home schedule, and the shared decision-making sits on top of it without changing the nights.',
		},
		{
			id: 'leo',
			name: 'Example B: Leo',
			combo: 'Joint legal + joint physical',
			body: 'Leo alternates full weeks between his parents\u2019 homes, and his parents jointly choose his school, doctor, and activities. Legal custody is joint; physical custody is joint and roughly equal. Here the physical arrangement demands a real equal-time rotation, which is the kind of schedule the generator builds.',
		},
		{
			id: 'sofia',
			name: 'Example C: Sofia',
			combo: 'Sole legal + primary physical',
			body: 'After a period of no contact, one parent has both Sofia\u2019s primary residence and final decision-making authority, while the other has supervised visits being phased back in. Legal custody is sole; physical custody is primary. It shows how both rights can concentrate in one parent, and that this is usually situation-specific rather than a default.',
		},
	],
};

export const faqItems = [
	{
		question: 'What is the difference between legal and physical custody?',
		answer:
			'Legal custody is the right to make major decisions about the child, such as school, healthcare, and religion. Physical custody is where the child lives and sleeps. They are decided separately, so you can have one type of each at the same time.',
	},
	{
		question: 'Can you have joint legal custody but sole physical custody?',
		answer:
			'Yes, and it is one of the most common arrangements. Both parents share the big decisions while the child lives mainly with one parent, and the other parent has scheduled parenting time.',
	},
	{
		question: 'Does legal custody affect the parenting schedule?',
		answer:
			'No. Legal custody is about decisions, not the calendar. Only physical custody determines which nights the child spends with each parent.',
	},
	{
		question: 'Does joint custody mean 50/50 time?',
		answer:
			'Not automatically. "Joint custody" often refers to shared decision-making, which is joint legal custody. Equal time is a specific physical-custody arrangement, and joint custody can involve unequal time.',
	},
	{
		question: 'What is primary physical custody?',
		answer:
			'It describes an arrangement where the child lives with one parent most of the time (the primary residential parent) while the other has meaningful but minority parenting time. The exact term varies by state.',
	},
	{
		question: 'What is the difference between joint and sole custody?',
		answer:
			'"Joint" means shared, either shared decisions (joint legal) or shared living time (joint physical). "Sole" means one parent holds that right. Because legal and physical custody are separate, "joint" and "sole" can each apply to a different half.',
	},
	{
		question: 'Which type of custody decides where the child goes to school?',
		answer:
			'Legal custody. Schooling is a major decision, so it falls under legal custody regardless of where the child physically lives.',
	},
	{
		question: 'If I have sole physical custody, does the other parent still have rights?',
		answer:
			'Usually yes. With joint legal custody, the other parent still helps decide school, healthcare, and religion, and typically has parenting time. Sole physical custody controls residence, not decision-making.',
	},
	{
		question: 'How do I turn our custody arrangement into an actual schedule?',
		answer:
			'Once physical custody is defined (joint or primary), you build a parenting-time calendar around it. A free custody schedule generator can turn the arrangement into a shareable calendar in a few clicks.',
	},
	{
		question: 'Is this legal advice?',
		answer:
			'No. This is general educational information for planning. Custody terms and rules vary by state, so check your local court or a qualified professional for advice on your situation.',
	},
];

export const faqSection = {
	title: 'Legal vs physical custody: frequently asked questions',
	description:
		'Short, plain answers to the questions parents most often ask about how legal and physical custody differ and combine.',
};

export const relatedLinks = [
	{ label: 'Custody schedule generator', href: '/custody-schedule-generator/' },
	{ label: 'Custodial schedule (schedule types)', href: '/custodial-schedule/' },
	{ label: '50/50 custody schedule', href: '/50-50-custody-schedule/' },
	{ label: 'Every-other-weekend custody schedule', href: '/every-other-weekend-custody-schedule/' },
	{ label: 'Custody percentage calculator', href: '/custody-percentage-calculator/' },
	{ label: 'Parenting plan template', href: '/parenting-plan-template/' },
	{ label: 'Custody schedule by age', href: '/custody-schedule-by-age/' },
	{ label: 'Holiday custody schedule', href: '/holiday-custody-schedule/' },
];
