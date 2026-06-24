export const meta = {
	title: '50/50 Custody Schedule for School-Age Children | Block Length & School-Night Comparison',
	description:
		'Compare 50/50 school-age rotations: 2-2-3 vs 2-2-5-5 vs 5-2-2-5 vs week-on/week-off — exchange counts, school-night ownership, and homework movement. Kindergarten logistics belong on the 5-year-old guide first.',
};

export const transitionRedirect = {
	body:
		'This page compares equal-time rotation structures for school-age children: block length, exchanges per fortnight, and which parent owns which school night. If the open question is kindergarten bus stops, first folders, or pickup authorization — not block geometry — read the <a href="/best-custody-schedule-for-5-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for a 5-year-old</a> guide first. Activity practice nights belong on the <a href="/best-custody-schedule-for-7-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for a 7-year-old</a> guide.',
};

export const scheduleComparisonCards = [
	{
		schedule: '2-2-3',
		href: '/2-2-3-custody-schedule/',
		whyChoose: [
			'Shortest maximum block (~3 nights) among common school-age equal-time patterns.',
			'Roughly three to four exchanges per fortnight — highest handoff count in this set.',
		],
		challenges: [
			'Wednesday spelling night may alternate parents each fortnight — not fixed weekly ownership.',
			'More backpack movement than 2-2-5-5 or week-on/week-off.',
		],
	},
	{
		schedule: '2-2-5-5',
		href: '/2-2-5-5-custody-schedule/',
		whyChoose: [
			'Fixed weekday ownership — same parent every Monday–Tuesday, alternating five-night weekend blocks.',
			'About two exchanges per fortnight; Tuesday homework night stays with one parent every week.',
		],
		challenges: [
			'Five-night block is the longest stretch in this comparison set.',
			'Activity on a fixed weekday always attaches to one parent’s block.',
		],
	},
	{
		schedule: '5-2-2-5',
		href: '/5-2-2-5-custody-schedule/',
		whyChoose: [
			'Five-day school-week block with one parent, then two-day reset — fewer midweek exchanges than 2-2-3.',
			'Useful when one parent anchors the full school-week routine.',
		],
		challenges: [
			'Five consecutive school nights with one parent — other parent misses midweek homework unless planned.',
			'Weekend flip requires tracking the two-week cycle.',
		],
	},
	{
		schedule: 'Week-on/week-off',
		href: '/week-on-week-off-custody-schedule/',
		whyChoose: [
			'One exchange per week — lowest handoff count; entire school week with one parent.',
			'Activity gear stays in one home for seven days.',
		],
		challenges: [
			'Seven-night block — longest separation in this comparison set.',
			'Other parent misses full school-week contact until Sunday swap.',
		],
	},
];

export const exchangeCountComparison = {
	title: 'Which Pattern Creates Fewer School-Night Handoffs',
	intro:
		'Equal time splits ~182 overnights each. The variable is how many exchanges hit during the school week — and which parent owns Tuesday reading log night every week.',
	rows: [
		{ pattern: '2-2-3', maxBlock: '~3 nights', exchangesPerFortnight: '3–4', schoolNightHandoffs: 'High' },
		{ pattern: '2-2-5-5', maxBlock: '5 nights', exchangesPerFortnight: '2', schoolNightHandoffs: 'Low' },
		{ pattern: '5-2-2-5', maxBlock: '5 nights', exchangesPerFortnight: '2', schoolNightHandoffs: 'Medium' },
		{ pattern: 'Week-on/week-off', maxBlock: '7 nights', exchangesPerFortnight: '1', schoolNightHandoffs: 'Lowest' },
	],
	closing:
		'Whether the child tolerates block length is an age-guide question — not this comparison table. Kindergarten logistics live on the 5-year-old guide; activity nights on the 7-year-old guide.',
};

export const homeworkMovement = {
	title: 'How Homework Moves Between Homes On Equal Time',
	intro:
		'50/50 splits nights evenly; it does not automatically split homework completion. Pattern choice changes how often the backpack crosses midweek.',
	points: [
		{
			heading: '2-2-3: homework alternates with blocks',
			body: 'Tuesday math may be Parent A’s night in fortnight one and Parent B’s in fortnight two. Portal access in both homes is mandatory — the assignment board does not follow the pattern name.',
		},
		{
			heading: '2-2-5-5: fixed weekday homework ownership',
			body: 'Every Wednesday spelling list lands with the same parent. Backpack still travels, but the responsible adult does not rotate midweek.',
		},
		{
			heading: 'Week-on/week-off: one homework week per parent',
			body: 'Entire reading log week with one parent — then a full week with the other. Projects spanning Sunday exchange need a photo handoff or shared folder rule.',
		},
	],
	closing:
		'Homework crossing mechanics for activity-heavy weeks live on the <a href="/best-custody-schedule-for-7-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for a 7-year-old</a> guide.',
};

export const moveFrom223 = {
	title: 'When Families Usually Move From 2-2-3 To Longer Blocks',
	paragraphs: [
		'Elementary equal-time plans often start with 2-2-3: shortest maximum separation, highest exchange count. After both homes run school nights reliably, parents may move to 2-2-5-5 or 5-2-2-5 — trading handoffs for five-night blocks and fixed weekday ownership.',
		'The shift is mechanical: same 50/50 overnight total, different block geometry. Print both calendars in the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a> and count school-week exchanges before adopting the longer block.',
	],
	compareNote:
		'Compare layouts on <a href="/2-2-3-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-3</a>, <a href="/2-2-5-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5</a>, and <a href="/5-2-2-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">5-2-2-5</a> pages.',
};

export const patternMistakes = [
	{
		mistake: 'Choosing 2-2-3 without counting school-week exchanges',
		detail:
			'223 produces the most midweek handoffs in this set. Backpacks, folders, and gym shoes move more often than on 2255 or WOW.',
	},
	{
		mistake: 'Assigning spelling night to a parent who travels for work',
		detail:
			'2255 fixes weekdays — but Tuesday homework lands with whoever owns Tuesday every week. Reassign weekday blocks or pick a different pattern.',
	},
	{
		mistake: 'Week-on/week-off for a first-grader without testing shorter blocks',
		detail:
			'WOW creates a seven-night block. Skipping 223 or 2255 skips the shorter-block baseline on the calendar.',
	},
	{
		mistake: 'Ignoring activity nights fixed to weekday blocks',
		detail:
			'Thursday soccer always belongs to the parent who owns Thursday in 2255. Print the calendar against the activity schedule before filing.',
	},
];

export const builderFeatures = [
	'Test 2-2-3, 2-2-5-5, 5-2-2-5, and week-on/week-off with real start dates',
	'Count school-week exchanges per fortnight',
	'Mark which parent owns each homework night',
	'Add holiday overrides without rebuilding the base rotation',
];

export const faqSection = {
	title: 'Questions about 50/50 school-age rotation mechanics',
	description:
		'Answers about block length, exchange count, and school-night ownership — not kindergarten entry or activity carpools.',
};

export const faqItems = [
	{
		question: 'What 50/50 pattern fits elementary school nights best?',
		answer:
			'2-2-5-5 fixes weekday ownership — same parent every Monday–Tuesday. 2-2-3 alternates weekday blocks across fortnights. Week-on/week-off assigns a full school week to one parent. Print each calendar and count midweek handoffs before choosing.',
	},
	{
		question: '2-2-3 vs 2-2-5-5 for school-age equal time?',
		answer:
			'2-2-3: ~3-night max block, 3–4 exchanges per fortnight, rotating weekday ownership. 2-2-5-5: 5-night max block, ~2 exchanges per fortnight, fixed weekdays. Same overnight split — different school-night geometry.',
	},
	{
		question: 'How does homework move on a 50/50 schedule?',
		answer:
			'The backpack travels on exchange days. Fixed-weekday patterns (2255) keep the same parent on recurring homework nights. 223 rotates which parent owns Wednesday spelling every other fortnight.',
	},
	{
		question: 'Is week-on/week-off good for school-age 50/50?',
		answer:
			'One exchange per week, seven-night block, entire school week with one parent. Minimizes handoffs; maximizes continuous nights. Whether seven nights fits the child is an age-guide question — not this mechanical comparison.',
	},
	{
		question: 'When should a school-age plan move from 2-2-3 to 2-2-5-5?',
		answer:
			'When both homes handle school nights reliably and parents want fewer midweek exchanges — accepting five-night blocks and fixed weekday ownership. Confirm activity nights on the 7-year-old guide before lengthening blocks.',
	},
	{
		question: 'How is this page different from the 5-year-old guide?',
		answer:
			'The 5-year-old guide owns kindergarten entry: bus stop, first folder, pickup list. This page owns equal-time mechanics — 223, 2255, 5225, WOW, exchange counts, and school-night ownership after early childhood.',
	},
	{
		question: 'How is this page different from the 7-year-old guide?',
		answer:
			'The 7-year-old guide owns activity practice nights, carpools, and homework crossing households. This page owns which equal-time pattern produces which exchange count and weekday ownership — not Tuesday soccer logistics.',
	},
	{
		question: 'Can 50/50 work mechanically for school-age children?',
		answer:
			'Equal time is arithmetically simple: 182–183 overnights each. The mechanical question is block length and exchange count. Whether school mornings and activity nights survive the pattern is answered on the age-specific guides — not by the overnight percentage.',
	},
];
