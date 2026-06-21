export const meta = {
	title: '2-2-5-5 Custody Schedule | Fixed Weekday Guide',
	description:
		'A 2-2-5-5 custody schedule keeps the same weekdays with each parent every week — Monday soccer, Wednesday tutoring, and reading logs stay with one parent while weekends alternate.',
	datePublished: '2026-06-13',
	dateModified: '2026-06-19',
};

export const hero = {
	headline: '2-2-5-5 Custody Schedule',
	opening:
		'A 2-2-5-5 custody schedule is a 50/50 rotation where Parent A always has the same two weekdays, Parent B always has the other two, and longer five-day blocks alternate who carries the weekends. Over fourteen days each parent gets seven overnights — but the calendar week never reassigns Tuesday.',
	difference:
		'That fixed weekday layer is why families pick 2-2-5-5 over other equal-time patterns. Parent A might always own Monday and Tuesday: spelling homework, Tuesday soccer pickup, and the reading log due Thursday morning stay in one house every single week. Parent B might always own Wednesday and Thursday: occupational therapy at 4 p.m., math worksheet checks, and replies to the teacher\'s Wednesday newsletter. Only Friday through the following Tuesday or Wednesday alternates.',
	question: 'Why choose fixed weekdays instead of rotating school blocks?',
	compare2255: {
		label: '2-2-5-5',
		points: [
			'Same two weekdays every calendar week',
			'Recurring activities stay with one parent',
		],
	},
	compare5225: {
		label: '5-2-2-5',
		href: '/5-2-2-5-custody-schedule/',
		points: [
			'One parent owns a full school-week block',
			'Better when homework must stay in one home Mon–Fri',
		],
	},
};

export const quickFacts = {
	title: 'Quick Facts About 2-2-5-5',
	items: [
		{ label: 'Cycle length', value: '14-day repeating rotation' },
		{ label: 'Overnights', value: '7 per parent each cycle' },
		{ label: 'Parenting time', value: '50/50 over two weeks' },
		{ label: 'Known for', value: 'Fixed Mon–Tue / Wed–Thu weekday ownership' },
	],
};

export const calendarGlance = {
	title: '2-2-5-5 Calendar at a Glance',
	weekLabels: ['Week 1 (Parent A long weekend)', 'Week 2 (Parent B long weekend)'],
	dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	weeks: [
		['A', 'A', 'B', 'B', 'A', 'A', 'A'],
		['A', 'A', 'B', 'B', 'B', 'B', 'B'],
	],
	notes: [
		'Parent A always has Monday and Tuesday; Parent B always has Wednesday and Thursday — every calendar week.',
		'Friday through the next exchange alternates: Parent A in Week 1 above, Parent B in Week 2.',
		'Your assigned weekdays depend on how the plan labels Parent A and Parent B at signing.',
	],
};

export const articleTocItems = [
	{ id: 'calendar-glance', label: '2-2-5-5 calendar at a glance' },
	{ id: 'schedule-generator', label: '2-2-5-5 calendar generator' },
	{ id: 'week-never-changes', label: 'A week that never changes' },
	{ id: 'fixed-days', label: 'Who handles which day' },
	{ id: 'vs-5225', label: '2-2-5-5 vs 5-2-2-5 families' },
	{ id: 'work-schedules', label: '2-2-5-5 and work schedules' },
	{ id: 'problems', label: '2-2-5-5 problems and fixes' },
	{ id: 'parenting-plan', label: '2-2-5-5 plan language' },
	{ id: 'faq', label: '2-2-5-5 FAQ' },
];

export const weekNeverChanges = {
	title: 'A Week That Never Changes on 2-2-5-5',
	intro:
		'Leo is in second grade. Parent A always has Monday and Tuesday; Parent B always has Wednesday and Thursday. The five-day weekend blocks rotate, but Leo\'s Tuesday routine does not.',
	weekdays: [
		{
			day: 'Every Monday (Parent A)',
			details:
				'Parent A packs lunch, checks the take-home folder, and signs the behavior chart before drop-off. The classroom app sends Monday announcements — Parent A replies before pickup because those messages always land on Parent A\'s days. When Leo forgets gym shoes, the school calls Parent A on Monday, not Parent B, because Parent A will have Leo again next Monday regardless of which five-day block is running.',
		},
		{
			day: 'Every Tuesday (Parent A)',
			details:
				'Tuesday is soccer at 5:30 p.m. Parent A drives every week — the coach saved Parent A\'s number in September and never asks who has Leo on which fortnight. Cleats and shin guards live in Parent A\'s garage bin labeled Tuesday.',
		},
		{
			day: 'Every Wednesday (Parent B)',
			details:
				'Leo sees a reading tutor at 4 p.m. Parent B handles pickup, payment, and the tutor\'s text thread. Parent A gets a photo of the completed worksheet in the co-parent app, but Parent B owns the appointment.',
		},
		{
			day: 'Every Thursday (Parent B)',
			details:
				'Parent B submits the online reading log due Friday morning — same parent, same login, same Thursday-night routine. Leo knows Thursday math review happens at Parent B\'s kitchen table whether it is Parent A\'s or Parent B\'s long weekend block.',
		},
		{
			day: 'Fridays (alternates)',
			details:
				'Who picks up Friday depends on the five-day block, not the weekday layer. The plan lists Parent A\'s fixed days separately from the rotating Fri–Tue stretch so the school office never guesses.',
		},
	],
	close:
		'That is the 2-2-5-5 promise: recurring obligations attach to weekdays, not to whichever parent won the last exchange. Leo\'s coach, tutor, and teacher learn one contact per weekday — and the parents stop renegotiating Tuesday pickup every Sunday night.',
};

export const fixedDaysSection = {
	title: 'The Hidden Advantage: Knowing Exactly Who Handles Which Day',
	intro:
		'When weekdays are fixed, coaches, tutors, and teachers stop treating custody like a guessing game. The schedule tells them which adult owns Tuesday transportation and which adult owns Wednesday replies.',
	scenarios: [
		{
			heading: 'Sports on fixed weekdays',
			body: 'Leo\'s Tuesday soccer never moves because Parent A always has Tuesday. Tournament weekends still rotate through the five-day blocks, but practice pickup stays with Parent A unless the written plan says otherwise. Parent A keeps cleats and shin guards at their house; Parent B is not scrambling for gear on a Tuesday they do not have Leo.',
		},
		{
			heading: 'Tutoring and therapy',
			body: 'Parent B\'s standing Wednesday tutoring slot does not shift when the long weekend block flips. The tutor invoices Parent B monthly — not whichever parent happens to have Leo that Wednesday in a different schedule pattern. If occupational therapy is also on Wednesday, Parent B coordinates cancellations and makeup sessions without looping in Parent A.',
		},
		{
			heading: 'Homework on assigned nights',
			body: 'Thursday reading log submission stays with Parent B every week. Parent A is not rebuilding Thursday homework from scratch on exchange night because Parent A never owns Thursday in this plan. Spelling words assigned Monday get practiced at Parent A\'s house Tuesday night — still Parent A\'s duty, still Parent A\'s weekday.',
		},
		{
			heading: 'School emails',
			body: 'The teacher learns quickly: Monday behavior notes go to Parent A; Wednesday newsletter replies go to Parent B. Both parents can have portal access, but the fixed-day parent answers first for their weekdays. Parent A does not forward every Monday email "just in case" — the plan already assigns Monday to Parent A.',
		},
		{
			heading: 'Activity transportation',
			body: 'Piano is Thursday at Parent B\'s house — same drive route, same backup keys, same 3:45 p.m. departure. Parent A\'s only piano duty is making sure the book bag transfers before Wednesday exchange when Leo returns from Parent B\'s block. The piano teacher adds Parent B to the pickup list once and never asks which parent has Leo this week.',
		},
	],
	close:
		'Write fixed weekday duties in the parenting plan: "Parent A shall transport to Tuesday soccer; Parent B shall transport to Wednesday tutoring." Fixed days become fixed obligations.',
};

export const vs5225 = {
	title: '2-2-5-5 vs 5-2-2-5: Which Family Fits Each?',
	intro:
		'These schedules share block lengths but solve different problems. Match the family, not the label.',
	families: [
		{
			title: 'The Martinez family → 2-2-5-5',
			situation:
				'Both parents work near the school. Leo has Tuesday soccer and Wednesday tutoring on the same weekdays all year. They need coaches to call the same parent every Tuesday without checking a calendar.',
			why: 'Fixed Mon–Tue and Wed–Thu assignments keep recurring activities stable.',
		},
		{
			title: 'The Chen family → 5-2-2-5',
			situation:
				'A multi-day science fair project must stay in one home Monday through Friday. Midweek exchanges kept breaking the build when they used 2-2-3.',
			why: 'A five-day school-week block lets one parent own the whole project. See the <a href="/5-2-2-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">5-2-2-5 school-week guide</a>.',
			href: '/5-2-2-5-custody-schedule/',
		},
		{
			title: 'The Okonkwo family → 2-2-5-5',
			situation:
				'Parent A is a nurse with fixed office days every Monday and Tuesday. Parent B travels midweek but is home Wednesday and Thursday. Equal time only works if weekdays match their shifts.',
			why: '2-2-5-5 maps custody to predictable work availability.',
		},
		{
			title: 'The Reeves family → 5-2-2-5',
			situation:
				'Homework was lost every Wednesday handoff under 2-2-3. They do not need Tuesday locked forever — they need one parent to run the entire school week without splitting assignments.',
			why: 'School-week ownership matters more than fixed weekday labels.',
			href: '/5-2-2-5-custody-schedule/',
		},
	],
	close:
		'Choose 2-2-5-5 when the same weekday should mean the same parent every week. Choose 5-2-2-5 when one parent should own an entire school-week stretch.',
};

export const workSchedulesSection = {
	title: 'When Parents Choose 2-2-5-5 Because of Work',
	intro:
		'Fixed weekdays let custody follow shift patterns instead of fighting them.',
	examples: [
		{
			heading: 'Nurse with Monday–Tuesday office days',
			body: 'Parent A works clinic hours Mon–Tue and rotating weekends. Parent A keeps every Monday and Tuesday overnight; Parent B keeps Wed–Thu when Parent A may be on evening shift. The five-day blocks absorb the rotating weekend coverage. Parent A is not trading away Tuesday custody to cover a Saturday shift — Tuesday stays Parent A\'s regardless of which parent holds the long block that week.',
		},
		{
			heading: 'Sales role with Wednesday–Thursday travel',
			body: 'Parent B is on the road Wed–Thu two weeks per month but home Mon–Tue. Assigning Parent B fixed Wed–Thu custody sounds wrong until you realize Parent B works from the hotel those evenings — Leo does homework by video, then Parent B drives tutoring when back in town. Parent A anchors Mon–Tue. The plan lists Parent B as Wednesday school contact even when Parent B is traveling, because Wednesday still belongs to Parent B.',
		},
		{
			heading: 'Fixed office days opposite the co-parent',
			body: 'Parent A works downtown Mon–Tue; Parent B works Wed–Thu near the school. Exchanges happen Friday after school and Tuesday evening. Neither parent swaps weekday custody when a meeting runs late — their assigned days match their commutes.',
		},
		{
			heading: 'Weekend work in hospitality',
			body: 'Parent B manages a restaurant and works most Saturdays. Parent B takes fixed Wed–Thu custody plus the five-day block when it includes fewer Saturdays in that cycle. Parent A keeps Monday–Tuesday and handles Tuesday soccer without negotiating around Parent B\'s weekend shifts.',
		},
	],
	close:
		'Map the plan to real shift calendars before signing. Fixed weekdays only help when they align with who is actually available those nights. If Parent A\'s Monday–Tuesday clinic days change every quarter, revisit whether those should stay Parent A\'s custody days or whether a school-week block schedule fits better.',
};

export const problemsSection = {
	title: '2-2-5-5 Problems Families Hit — and Practical Fixes',
	intro: 'Fixed weekdays create fixed obligations. These problems appear when the plan treats days as flexible anyway — when Parent B asks Parent A to cover Wednesday tutoring "just this once" every month, or when coaches call whichever parent answered last time instead of the Tuesday parent.',
	problems: [
		{
			problem: 'One parent becomes the default activity parent',
			solution:
				'If Parent A always has Tuesday, Parent A also inherits every Tuesday activity unless the plan splits costs and makeup drives. Write "Parent A: Tuesday soccer transportation; Parent B: Wednesday tutoring" so Parent B cannot assume Parent A will cover Thursday piano just because Parent A "has more weekdays."',
		},
		{
			problem: 'Uneven weekday responsibility feels unfair',
			solution:
				'Parent A may carry two weeknights plus half the long blocks while Parent B carries two different weeknights. Count obligations, not just overnights: who owns school emails, who pays activity fees, who sits in the car line on their fixed days.',
		},
		{
			problem: 'Forgetting that fixed days mean fixed handoffs',
			solution:
				'Parent B cannot ask Parent A to keep Leo Wednesday for a work dinner — Wednesday is Parent B\'s night every week. Swaps need written notice and should not become "just this once" every month.',
		},
		{
			problem: 'Long five-day blocks still feel long',
			solution:
				'Fixed weekdays do not shorten the alternating Fri–Tue stretch. A mid-block call on day three can help younger children without undoing the weekday assignment.',
		},
		{
			problem: 'Weekend block confusion',
			solution:
				'Parents argue about Friday pickup because they tracked weekdays but not which five-day block is active. Highlight the long block on a shared calendar in a different color from the fixed Mon–Thu layer.',
		},
	],
};

export const parentingPlanSection = {
	title: 'Sample 2-2-5-5 Parenting Plan Language for Fixed Weekdays',
	intro:
		'Assign recurring weekday duties explicitly. Educational sample only — have a qualified professional review before filing.',
	clause:
		'The parents will follow a repeating two-week 2-2-5-5 parenting schedule. Parent A shall have parenting time every Monday and Tuesday from [exchange time] through [exchange time]. Parent B shall have parenting time every Wednesday and Thursday from [exchange time] through [exchange time]. Weekend parenting time shall alternate through five-day blocks as follows: [describe first block parent and exchange time]. Parent A shall be responsible for Tuesday soccer transportation and Monday school-email replies. Parent B shall be responsible for Wednesday tutoring transportation and Thursday reading-log submission. Each parent shall remain the primary weekday contact for their assigned days unless the parents agree otherwise in writing.',
	disclaimer: 'This is not legal advice. Custody laws and court forms vary by state.',
	topics: [
		'Fixed weekday assignments (Mon–Tue / Wed–Thu)',
		'Recurring activity transportation by weekday',
		'Which parent answers school email on their days',
		'How five-day blocks alternate without changing fixed weekdays',
	],
};

export const faqItems = [
	{
		question: 'Does Parent A always have the same weekdays in 2-2-5-5?',
		answer:
			'Yes, in a standard written plan. One parent is assigned the same two weekdays every calendar week — often Monday and Tuesday for Parent A and Wednesday and Thursday for Parent B — while the longer five-day blocks alternate who carries the connected weekend stretch.',
	},
	{
		question: 'Who drives Tuesday soccer in a 2-2-5-5 schedule?',
		answer:
			'Whichever parent is assigned Tuesday every week — not whichever parent has the long weekend block. If Parent A always has Tuesday, Parent A drives Tuesday practice unless the plan assigns a different split.',
	},
	{
		question: 'How is 2-2-5-5 different from 5-2-2-5?',
		answer:
			'2-2-5-5 locks specific weekdays to each parent so recurring activities stay stable. 5-2-2-5 rotates who owns a full school-week block so one parent can carry Monday through Friday homework in one stretch. Same block lengths, different starting purpose.',
	},
	{
		question: 'Why would parents leave 2-2-3 for 2-2-5-5?',
		answer:
			'Often when the child can handle slightly longer stretches but parents want fewer exchanges and fixed weekday assignments. Tuesday soccer and Wednesday tutoring should not change hands every few days.',
	},
	{
		question: 'Can 2-2-5-5 match a nurse or shift-work schedule?',
		answer:
			'It can when each parent\'s fixed weekdays align with days they are reliably home. A parent who works every Monday and Tuesday may want those nights; the co-parent takes Wednesday and Thursday. The five-day blocks cover alternating weekends.',
	},
	{
		question: 'How many overnights is 2-2-5-5?',
		answer:
			'Seven per parent in each fourteen-day cycle — usually about 182–183 overnights per year before custom changes.',
	},
	{
		question: 'What goes wrong if weekday duties are not written down?',
		answer:
			'Coaches call the wrong parent, reading logs get submitted late, and one parent becomes the "activity parent" for every weekday obligation while the other only has fun weekends. Fixed days need fixed responsibilities in writing.',
	},
	{
		question: 'Do fixed weekdays change during the five-day block?',
		answer:
			'No. Parent A still has Monday and Tuesday during Parent B\'s long weekend block. Only Friday through the next exchange in that cycle changes hands.',
	},
];
