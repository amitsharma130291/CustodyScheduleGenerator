export const meta = {
	title: 'Custody Schedule By Age | When School, Activities & Driving Change the Calendar',
	description:
		'Kindergarten, weekly activities, middle school, and driving age are when custody calendars usually get rewritten — not when a court order expires. Map transition points and route to age-specific guides.',
	datePublished: '2026-06-13',
	dateModified: '2026-06-19',
};

export const editorialReview = {
	reviewedFor: [
		'parenting-plan consistency',
		'schedule transition accuracy',
		'school-year scheduling impacts',
		'calendar generation accuracy',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'This page explains common scheduling transition points and is not legal advice.',
};

export const hero = {
	headline: 'Custody Schedule By Age',
	intro:
		'Most custody calendars get rewritten at a handful of life events — kindergarten, the first weekly soccer practice, middle school, a learner\'s permit — not because the original order expired. A rotation built around bottle feeds and nap windows will not survive a 7:30 a.m. bus. This page maps those operational shifts and where to read stage-specific detail.',
	boundary:
		'Rotation-pattern comparisons (2-2-3, 2-2-5-5, week-on/week-off) live on the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> hub. This page owns when the calendar stops matching the child\'s actual week.',
};

export const heroKeyStats = [
	{ value: '4', label: 'life stages' },
	{ value: '6', label: 'review triggers' },
	{ value: '4', label: 'common rewrites' },
];

export const heroTrustSignals = [
	'Free to use',
	'No signup required',
	'Print or export your schedule',
];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Calendar generator' },
	{ id: 'why-age-matters', label: 'Why age matters' },
	{ id: 'four-stages', label: 'Four stages' },
	{ id: 'revisit-triggers', label: 'Review triggers' },
	{ id: 'rewrite-moments', label: 'Common rewrites' },
	{ id: 'questions-by-age', label: 'Questions by age' },
	{ id: 'same-schedule-mistake', label: 'Same schedule mistake' },
	{ id: 'age-decides', label: 'Age decides' },
	{ id: 'faq', label: 'FAQ' },
];

export const scheduleChangeInsight = {
	title: 'Most Schedule Changes Do Not Happen Because The Order Expired',
	body:
		'Parents rarely revisit a calendar because a court order reaches a certain age. They revisit it because school, transportation, activities, or independence changed the way the child\'s week actually works.',
};

export const whyAgeMatters = {
	title: 'Why Age Changes Matter More Than Schedule Names',
	intro:
		'Parents often arrive with a pattern already chosen — 2-2-3, alternating weeks, 80/20. The label is fixed. The week is not: bottle timing at six months, bus stops at kindergarten, soccer practice on Tuesdays, a job shift that lands on a scheduled exchange night.',
	points: [
		{
			heading: 'The child\'s week sets the limit',
			body: 'An infant\'s feed interval caps exchange length before the afternoon collapses. A toddler\'s handoff can run forty minutes when separation spikes. A first-grader needs the homework folder at the right house on Sunday night. A sixteen-year-old may sleep at whichever address is closer to work — regardless of what the order prints. The week moves; the pattern name on the decree does not.',
		},
		{
			heading: 'Pattern names describe nights, not Tuesdays',
			body: 'Two decrees can both say 2-2-5-5 while one child is three and the other is thirteen. The label splits overnights; it does not list who drives to robotics, where the cleats live, or whether Friday pickup still makes sense once the teen has a permit.',
		},
		{
			heading: 'The operational question shifts by age',
			body: 'Infants: feed and nap timing. Toddlers: handoff behavior and daycare pickup. School age: bus stops, homework folders, activity gear. Teenagers: job shifts, driving, and where friends cluster. Listing one rotation for every age duplicates what the stage guides already document.',
		},
		{
			heading: 'Review belongs in the calendar, not the argument',
			body: 'Parenting plans often name kindergarten, middle school, or activity season as review points. Without that clause, the mismatch surfaces mid-semester — unsigned field-trip form, instrument left at the wrong house, exchange during soccer warmups. See <a href="/how-custodybuilder-works/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">how CustodyBuilder works</a> before you print a revised calendar.',
		},
	],
};

export const fourStages = {
	title: 'The Four Stages That Change Custody Planning',
	intro:
		'Age brackets are loose. A preemie may run infant logistics longer; an eleven-year-old with travel soccer may already face teen-level scheduling. Each block names what changes operationally — not which rotation to adopt.',
	stages: [
		{
			id: 'infants',
			label: 'Infants',
			ageRange: 'Birth – ~12 months',
			whatChanges: [
				'Feed intervals cap how long an exchange can run before the afternoon unravels.',
				'Nap timing shifts faster than most printed rotations account for.',
			],
			link: {
				href: '/50-50-custody-schedule-for-babies/',
				label: '50/50 custody schedule for babies',
				context: 'Infant feed-and-nap logistics:',
			},
		},
		{
			id: 'toddlers',
			label: 'Toddlers',
			ageRange: '~1 – 3 years',
			whatChanges: [
				'Handoff behavior — not block length on paper — decides whether Tuesday works.',
				'Preschool drop-off adds a third address to every exchange.',
			],
			link: {
				href: '/best-custody-schedule-for-toddler/',
				label: 'custody schedule for toddler',
				context: 'Toddler handoff and preschool timing:',
			},
		},
		{
			id: 'school-age',
			label: 'School age',
			ageRange: '~5 – 12 years',
			whatChanges: [
				'Bus stops and backpack contents follow the child, not the rotation label.',
				'Weekly soccer or piano attaches to one garage unless pickup is assigned.',
			],
			link: {
				href: '/50-50-custody-schedule-for-school-age-children/',
				label: '50/50 custody schedule for school-age children',
				context: 'School-morning and activity logistics:',
			},
		},
		{
			id: 'teenagers',
			label: 'Teenagers',
			ageRange: '~13 – 18 years',
			whatChanges: [
				'Job shifts and friend hangouts cluster by address — not by court order.',
				'A learner\'s permit changes who runs pickup and where the teen sleeps on practice nights.',
			],
			link: {
				href: '/best-custody-schedule-for-teenager/',
				label: 'custody schedule for teenager',
				context: 'Teen driving and job-shift logistics:',
			},
		},
	],
};

export const revisitTriggers = {
	title: 'What Usually Forces Parents To Revisit The Schedule?',
	intro:
		'Calendars get reopened when the child\'s week changes — not only when parents argue. These six shifts most often expose a gap between the old rotation and what actually happens Monday through Sunday.',
	closing:
		'None of these require a new pattern on day one. They require asking whether the printed exchange still matches bus stops, practice times, and who holds the car keys. Stage-specific walkthroughs sit on the age guides linked in each step.',
	triggers: [
		{
			heading: 'Preschool starts',
			body: 'Exchange timing that worked at home may not survive a classroom drop-off line. Nap windows, pickup cutoffs, and sick-day calls all shift. See the <a href="/50-50-custody-schedule-for-toddlers/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule for toddlers</a> guide for preschool-era handoffs.',
		},
		{
			heading: 'Kindergarten starts',
			body: 'School mornings and backpack logistics replace nap-centered days. Alarm times, bus stops, and who owns the homework folder become weekly variables the old order may never list. The <a href="/best-custody-schedule-for-5-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for a 5-year-old</a> guide covers that entry point.',
		},
		{
			heading: 'Activities become weekly',
			body: 'Tuesday soccer and Thursday piano attach to one address. Transportation — not overnight counts — becomes the friction. When practice outnumbers exchanges, parents rewrite who drives and where gear lives. The <a href="/50-50-custody-schedule-for-school-age-children/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule for school-age children</a> guide covers activity-season logistics.',
		},
		{
			heading: 'Middle school starts',
			body: 'Homework portals, locker combinations, and friend hangouts run on a calendar the child starts managing. Multiple teachers multiply what must move between houses. The <a href="/best-custody-schedule-for-7-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for a 7-year-old</a> guide bridges elementary routine into that shift.',
		},
		{
			heading: 'Learner\'s permit or driving age arrives',
			body: 'Pickup independence changes how exchanges feel — the teen may self-transport to practice or need the car at one house on game nights. The <a href="/50-50-custody-schedule-for-teenagers/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule for teenagers</a> guide covers transportation-driven revisions.',
		},
		{
			heading: 'Part-time job or serious extracurriculars appear',
			body: 'Weekend availability shrinks when shifts, tournaments, or travel teams take priority. A rotation built around alternating Saturdays may need a written flex clause — not a silent assumption that the teen will comply. The <a href="/best-custody-schedule-for-teenager/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for teenager</a> guide covers job-and-season conflicts.',
		},
	],
};

export const rewriteMoments = {
	title: 'The Four Moments Parents Most Commonly Rewrite Parenting Plans',
	intro:
		'Most written parenting-plan revisions cluster around four events. They are predictable once you have seen enough calendars — and they rarely arrive because a clause expired.',
	moments: [
		{
			heading: 'Starting kindergarten',
			operational: '7:30 a.m. buses, lunch accounts, homework folders, and bedtimes measured in minutes — not nap windows.',
			whyOldFails:
				'Exchanges timed around afternoon naps do not survive school mornings. The order may not name who owns the backpack on Sunday night or who gets the nurse call when the bus is missed.',
		},
		{
			heading: 'First recurring extracurricular activity',
			operational: 'Tuesday soccer pickup, cleats in one garage, one parent on the sideline every week.',
			whyOldFails:
				'A midweek exchange during warmups forces the child to choose between the rotation and the team. Gear left at the wrong house becomes a weekly fight — not a one-off.',
		},
		{
			heading: 'Middle school transition',
			operational: 'Six teachers, online grade portals, locker combinations, and friend plans that do not follow the decree.',
			whyOldFails:
				'A parent who only holds weekends may miss the homework portal entirely. The child starts managing their own week while the order still assumes a parent handles every school night.',
		},
		{
			heading: 'Driving age',
			operational: 'Teen drives to practice, holds a part-time shift, keeps the car registered at one address.',
			whyOldFails:
				'Friday-at-5 exchanges stop mattering when the teen self-transports. The calendar still prints a handoff while the teen has already slept at whichever house is closer to work for three weeks straight.',
		},
	],
};

export const questionsByAge = {
	title: 'Questions That Matter At Each Age',
	intro:
		'Before opening a rotation comparison, settle the operational questions for the child\'s current week. The age guides linked below walk through each stage with scenarios.',
	ages: [
		{
			stage: 'Infants',
			focus: 'Separation',
			questions: [
				'How long can the baby go between feeds without distress?',
				'Are overnights already part of the routine, or still a future step?',
			],
			link: {
				href: '/50-50-custody-schedule-for-babies/',
				label: '50/50 custody schedule for babies',
			},
		},
		{
			stage: 'Toddlers',
			focus: 'Transitions',
			questions: [
				'How does the child behave in the hour after exchange?',
				'Does daycare or preschool add a third handoff location?',
			],
			link: {
				href: '/best-custody-schedule-for-toddler/',
				label: 'custody schedule for toddler',
			},
		},
		{
			stage: 'School age',
			focus: 'Routine',
			questions: [
				'Who owns school mornings, homework folders, and activity gear?',
				'What happens when practice lands on an exchange night?',
			],
			link: {
				href: '/best-custody-schedule-for-5-year-old/',
				label: 'custody schedule for a 5-year-old',
			},
		},
		{
			stage: 'Teenagers',
			focus: 'Independence',
			questions: [
				'Where does the teen study, work, and sleep on busy weeks?',
				'Who handles transportation when parents live far apart?',
			],
			link: {
				href: '/50-50-custody-schedule-for-teenagers/',
				label: '50/50 custody schedule for teenagers',
			},
		},
	],
};

export const sameScheduleMistake = {
	title: 'The Biggest Mistake: Keeping The Same Schedule Forever',
	intro:
		'The order that ended the first custody fight often becomes background noise — cited only to win an argument. Meanwhile kindergarten, soccer season, and a learner\'s permit rewrite what the child\'s week actually requires.',
	signals: [
		{
			heading: 'The child adapts; the calendar does not',
			body: 'A toddler who once cried at every exchange may settle by age six — but the plan still uses the shortest blocks "because that\'s what worked." Frequent moves may now disrupt science-fair projects instead of protecting attachment.',
		},
		{
			heading: 'School life exposes the mismatch',
			body: 'Missing instruments, unsigned forms, and "wrong home" mornings are symptoms. The rotation was built for shorter separations — not for Tuesday robotics and Thursday tutoring.',
		},
		{
			heading: 'Teen behavior gets blamed on the wrong parent',
			body: 'When a fifteen-year-old sleeps at one house more often, parents sometimes read defiance instead of logistics. Job shifts and study groups cluster geographically. A rigid rotation pushes the teen to unofficially choose — without a written plan that acknowledges it.',
		},
		{
			heading: 'Parents negotiate holidays but not ordinary weeks',
			body: 'Summer and Christmas get attention because they are visible. The fifty Tuesdays between them do not — until homework, health appointments, and soccer practice pile up on the parent who was never assigned weekdays.',
		},
	],
	closing:
		'A schedule review is not admission of failure. It is recognition that the child at signing is not the child on the kindergarten bus, in middle school, or behind the wheel. Document changes in a <a href="/parenting-plan-template/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">parenting plan template</a> so both homes share the same updated calendar.',
};

export const ageDecides = {
	title: 'Age Should Decide The Schedule — Not The Other Way Around',
	paragraphs: [
		'Start with the child\'s week, then compare rotations. Infants need feed-and-nap timing settled before anyone debates block length. Toddlers need handoff plans before equal-time labels matter. School-age children need bus stops and activity pickup assigned before overnight counts. Teenagers need job shifts and driving mapped before anyone shortens the exchange count.',
		'Use this hub as a map: pick the stage, read the age guide, then open the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a> to print a calendar against the week you actually have — not the week the decree assumed at signing.',
		'Follow the stage link that matches your child today — kindergarten mornings, middle school portals, or a teen with a job — not the age the order described years ago.',
	],
};

export const postContentCta = {
	heading: 'See How Your Current Schedule Ages Over Time',
	body: 'A schedule that works today may not fit kindergarten, middle school, or the teen years. Generate a calendar and compare it against upcoming transitions before updating your parenting plan.',
	primaryHref: '/custody-schedule-generator/',
	primaryLabel: 'Open schedule generator',
	secondaryHref: '/parenting-plan-template/',
	secondaryLabel: 'Update your parenting plan',
};

export const faqSection = {
	title: 'Questions about custody schedules and child age',
	description:
		'Answers about when calendars get rewritten, how this hub differs from age-specific guides, and what triggers a schedule review.',
};

export const faqItems = [
	{
		question: 'When should custody schedules change?',
		answer:
			'Rewrite the calendar when school, activities, transportation, or independence shift the child\'s week — often at kindergarten, the first weekly extracurricular, middle school, and driving age. A rotation built around bottle feeds will not absorb a sixth-grader\'s robotics schedule without revision.',
	},
	{
		question: 'How often should parents review a custody schedule by age?',
		answer:
			'Many parents reopen the calendar at kindergarten, middle school, and driving age — even when no one is fighting. Some parenting plans set a review date every one to two years. The trigger is whether the child\'s actual week still fits the rotation, not whether the order expired.',
	},
	{
		question: 'What age changes usually cause the biggest custody adjustments?',
		answer:
			'Kindergarten and middle school tend to force the largest logistical rewrites because bus stops, homework, and activity calendars replace nap-centered or parent-managed days. Driving age and part-time jobs create the next major shift for teens. Infancy and toddlerhood changes are usually about feed timing and handoff behavior.',
	},
	{
		question: 'Does a schedule that worked at age 3 still work at age 10?',
		answer:
			'Not automatically. A three-year-old may have needed short separations; a ten-year-old may need stable school-week routines and room for friends and soccer practice. The question is whether the rotation still matches bus stops, homework, and social plans — not whether the original order remains legally valid.',
	},
	{
		question: 'What is the difference between this page and age-specific custody guides?',
		answer:
			'This hub maps when calendars get rewritten and what shifts operationally at each life stage. Age-specific guides — toddler, 5-year-old, 7-year-old, and teenager pages — document scenarios, calendars, and stage-specific tradeoffs. Use this page to identify the transition; use the age guide to plan the detail.',
	},
	{
		question: 'Can siblings need different custody schedules at different ages?',
		answer:
			'Yes. A fourteen-year-old with a job and a six-year-old on the kindergarten bus may need different exchange timing under the same household split. Courts and parents sometimes use one rotation for simplicity, but logistics often diverge by stage. Each child\'s age guide covers the operational detail.',
	},
	{
		question: 'When do parents usually adjust custody after kindergarten?',
		answer:
			'Kindergarten forces earlier bedtimes, bus-stop ownership, and homework folders that nap-centered rotations never listed. Parents commonly revisit exchange times and backpack rules once the school-year rhythm is clear.',
	},
	{
		question: 'Should teenagers have input on custody schedule changes?',
		answer:
			'Teenagers often supply the practical data — job shifts, practice locations, study spots, who drives. Courts and parents still decide, but plans that ignore a sixteen-year-old\'s real weekly geography tend to fail quietly: the teen sleeps where logistics point while the order still prints a Friday handoff.',
	},
];
