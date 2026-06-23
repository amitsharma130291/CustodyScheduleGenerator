export const scheduleComparisonCards = [
	{
		schedule: '2-2-3',
		href: '/2-2-3-custody-schedule/',
		whyChoose: [
			'Shortest maximum separation — usually two or three overnights before the rotation flips.',
			'About three to four exchanges per two-week cycle among common equal-time toddler patterns.',
		],
		challenges: [
			'Highest exchange count — more calendar coordination than 2-2-5-5 or week-on/week-off.',
			'Two-week cycle alternates which parent holds which weekday block.',
		],
	},
	{
		schedule: '3-4-4-3',
		href: '/3-4-4-3-custody-schedule/',
		whyChoose: [
			'Three- and four-night blocks with alternating weekends in a two-week rhythm.',
			'Fewer exchanges than 2-2-3 when the toddler already tolerates multi-night stretches.',
		],
		challenges: [
			'Four-night block is the longest stretch in this comparison set.',
			'Weekend rotation requires tracking a 14-day pattern, not a repeating weekly grid.',
		],
	},
	{
		schedule: '2-2-5-5',
		href: '/2-2-5-5-custody-schedule/',
		whyChoose: [
			'Fixed weekday ownership — same parent every Monday–Tuesday, alternating on weekends.',
			'About two exchanges per two-week cycle after the toddler outgrows the shortest blocks.',
		],
		challenges: [
			'Five-night block is the longest continuous stretch here.',
			'Preschool drop-off days attach to fixed weekday blocks — plan which parent owns which morning.',
		],
	},
	{
		schedule: 'Week-on/week-off',
		href: '/week-on-week-off-custody-schedule/',
		whyChoose: [
			'One exchange per week — lowest handoff count among equal-time toddler options.',
			'Seven consecutive nights with each parent before the Sunday swap.',
		],
		challenges: [
			'Seven-night block — longest separation in this comparison set.',
			'No midweek reset if the week goes poorly; next exchange is six days away.',
		],
	},
];

export const transitionToleranceRedirect = {
	title: 'Start here if handoffs — not patterns — are the problem',
	body:
		'This page compares equal-time rotation structures: block length, exchanges per fortnight, and overnight spacing. If the open question is how many goodbyes your toddler tolerates, why daycare pickup fails, or whether transition load — not block length — is the stress point, read the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for toddler</a> guide first.',
};

export const blockLengthByAge = {
	title: 'How Block Length Maps to Toddler 50/50 Patterns',
	intro:
		'Equal time always splits 182–183 overnights per year. The variable is how many nights stack before the calendar flips — and how many exchanges that creates.',
	groups: [
		{
			age: '12–24 months',
			blockRange: '1–3 nights typical',
			patterns: 'Often 2-2-3 or gradual step-up before full equal-time blocks.',
			mechanics:
				'Rotations with two- or three-night caps limit the longest stretch. Week-on/week-off is rarely the first equal-time structure at this age because the block is seven nights.',
		},
		{
			age: '2–3 years',
			blockRange: '2–5 nights common',
			patterns: '2-2-3, 3-4-4-3, or early 2-2-5-5 once both homes hold overnights.',
			mechanics:
				'223 keeps the maximum gap near three nights. 2255 introduces five-night stretches with only two exchanges per fortnight.',
		},
		{
			age: '3–4 years',
			blockRange: '3–7 nights',
			patterns: '2-2-5-5, 3-4-4-3, or week-on/week-off after shorter blocks work.',
			mechanics:
				'Preschool mornings attach to fixed weekday blocks in 2255. WOW trades block length for one Sunday exchange.',
		},
	],
	closing:
		'Whether the toddler can tolerate the block length you choose is a separate question — answered on the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for toddler</a> page, not here.',
};

export const twoYearOldSection = {
	title: 'Is 2-2-3 the Usual Starting 50/50 Pattern at Age Two?',
	paragraphs: [
		'At two, equal-time plans often start with the shortest blocks: 2-2-3 limits the longest stretch to about three nights and produces roughly three to four exchanges per fortnight. That is more calendar movement than 2-2-5-5 but shorter maximum separation than either 2255 or week-on/week-off.',
		'After the toddler has slept in both homes for several months, parents sometimes move to 2-2-5-5 — trading exchange count for five-night blocks. The shift is mechanical: same 50/50 overnight total, different block geometry.',
	],
	compareNote:
		'Compare calendar layouts on the <a href="/2-2-3-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-3</a> and <a href="/2-2-5-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5</a> pages. Test both in the <a href="/custody-schedule-generator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule generator</a> with your exchange days.',
};

export const exchangeCountComparison = {
	title: 'Exchanges Per Fortnight: Why Pattern Choice Changes the Calendar',
	intro:
		'Two equal-time rotations can split the same overnight count with different exchange frequency. Count Sunday swaps, midweek pickups, and daycare handoffs when you print the calendar — not just the pattern name.',
	rows: [
		{
			pattern: '2-2-3',
			maxBlock: '~3 nights',
			exchangesPerFortnight: '3–4',
			overnightSplit: '50/50',
		},
		{
			pattern: '3-4-4-3',
			maxBlock: '4 nights',
			exchangesPerFortnight: '2–3',
			overnightSplit: '50/50',
		},
		{
			pattern: '2-2-5-5',
			maxBlock: '5 nights',
			exchangesPerFortnight: '2',
			overnightSplit: '50/50',
		},
		{
			pattern: 'Week-on/week-off',
			maxBlock: '7 nights',
			exchangesPerFortnight: '1',
			overnightSplit: '50/50',
		},
	],
	closing:
		'Handoff stress at a given exchange count belongs on the transition-tolerance guide — not this comparison table.',
};

export const firstWeeksExperience = {
	title: 'What the First Weeks of a New 50/50 Rotation Look Like on the Calendar',
	intro:
		'A new equal-time pattern takes adults longer to track than toddlers. The first two to four weeks are usually about locking exchange times and verifying the printed rotation matches what you intended.',
	phases: [
		{
			heading: 'Week 1',
			body: 'Parents miscount which parent holds Tuesday overnight in a 2-2-3 cycle, or forget the 2255 weekend flip. The toddler experiences the result — wrong pickup person — even when the pattern is correct on paper. Fix the calendar before changing block length.',
		},
		{
			heading: 'Week 3',
			body: 'Exchange times stabilize. Verify the pattern produces the exchange count you expected: count handoffs in a printed fortnight, including daycare pickup if that is where exchange happens.',
		},
		{
			heading: 'After 1–2 months',
			body: 'If the calendar runs correctly but the child still struggles at every handoff, block length may not be the variable — read the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for toddler</a> guide on transition load before switching from 223 to 2255 or week-on/week-off.',
		},
	],
};

export const patternMistakes = [
	{
		mistake: 'Choosing week-on/week-off only to minimize exchanges',
		detail:
			'WOW creates one exchange per week but a seven-night block — the longest stretch in this comparison set. Minimizing swaps is not the same as minimizing separation length.',
	},
	{
		mistake: 'Moving to 2-2-5-5 before testing 2-2-3 block geometry',
		detail:
			'2255 cuts exchanges to about two per fortnight but introduces five-night stretches. Skipping 223 skips the shortest-block baseline on the calendar.',
	},
	{
		mistake: 'Running 2-2-3 without tracking the two-week cycle',
		detail:
			'223 alternates which parent holds which weekday block across fortnights one and two. A static weekly printout will show the wrong parent on the wrong Tuesday.',
	},
	{
		mistake: 'Ignoring holiday overrides on a toddler 50/50 base pattern',
		detail:
			'Thanksgiving and spring break can insert extra exchanges or long stretches that the base rotation never showed. Write holiday rules before adopting the pattern in court.',
	},
];

export const patternMismatchSigns = {
	title: 'When the Equal-Time Pattern — Not the Child — Needs Revision',
	intro:
		'These signals point to block length or exchange frequency on the calendar. Emotional handoff patterns, daycare pickup friction, and goodbye overload are covered on the transition-tolerance guide.',
	signs: [
		{
			sign: 'Exchange count keeps changing informally',
			detail:
				'Parents skip midweek swaps to simplify the week — the printed 223 no longer matches reality. Pick a pattern with fewer exchanges (2255, WOW) or fix the calendar.',
		},
		{
			sign: 'Five-night blocks were never tested',
			detail:
				'A family on 2255 who never ran 223 first may not know whether the issue is block length or transition load. Print both calendars and compare maximum separation.',
		},
		{
			sign: 'Preschool mornings attach to the wrong weekday block',
			detail:
				'2255 fixes weekdays but the toddler starts preschool on a day that always belongs to the other parent. Reassign weekday ownership or switch to 223 until preschool logistics settle.',
		},
		{
			sign: 'Holiday weeks break the two-week rhythm',
			detail:
				'Summer travel inserts a nine-night stretch the base pattern never modeled. Add a written holiday override instead of improvising each break.',
		},
	],
};

export const builderFeatures = [
	'Test 2-2-3, 2-2-5-5, and week-on/week-off with real start dates',
	'Count exchanges per fortnight before committing to a pattern',
	'Customize exchange days and parent labels',
	'Add holiday overrides without rebuilding the base rotation',
];

export const relatedLinks = [
	{
		title: 'Best 50/50 Custody Schedule',
		href: '/best-50-50-custody-schedule/',
		description: 'Side-by-side scoring of all five common equal-time patterns.',
	},
	{
		title: '50/50 Schedule Examples',
		href: '/50-50-custody-schedule-examples/',
		description: 'Two-week calendar previews for toddler and preschool rotations.',
	},
	{
		title: 'Custody Schedule for Toddler',
		href: '/best-custody-schedule-for-toddler/',
		description: 'Transition tolerance, goodbye count, and handoff load — before pattern choice.',
	},
];

export const broaderToddlerGuideNote =
	'Handoff stress, daycare pickup friction, and how many goodbyes fit in a week belong on the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody schedule for toddler</a> guide. This page compares equal-time rotation structures only.';

export const infantHandoffNote =
	'Still caring for an infant? Feeding and step-up visit paths for equal time live on the <a href="/50-50-custody-schedule-for-babies/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule for babies</a> guide.';

export const faqItems = [
	{
		question: 'What 50/50 pattern is the usual starting point for a 2-year-old?',
		answer:
			'2-2-3 is the common equal-time starting pattern: maximum separation of about three nights, roughly three to four exchanges per fortnight. Families sometimes move to 2-2-5-5 after both homes hold overnights — fewer exchanges, five-night blocks. Compare layouts on the 2-2-3 and 2-2-5-5 pages and print both in the generator.',
	},
	{
		question: 'Is week-on/week-off too long for toddler 50/50?',
		answer:
			'Week-on/week-off is one exchange per week with a seven-night block — the longest stretch among common equal-time toddler patterns. It minimizes calendar swaps; it maximizes continuous nights with one parent. Whether seven nights fits your toddler is a transition-tolerance question on the custody schedule for toddler guide.',
	},
	{
		question: 'How many exchanges per week does 2-2-3 create?',
		answer:
			'Usually three to four handoffs per two-week cycle, depending on whether exchange happens at school, daycare, or home. That is more than 2-2-5-5 (about two per fortnight) and far more than week-on/week-off (one per week).',
	},
	{
		question: '2-2-3 vs 2-2-5-5 for toddler equal time?',
		answer:
			'2-2-3: shorter maximum block (~3 nights), more exchanges per fortnight. 2-2-5-5: fixed weekdays, five-night blocks, about two exchanges per fortnight. Same 50/50 overnight split — different block geometry. Print both calendars before choosing.',
	},
	{
		question: 'Can toddlers use 50/50 custody mechanically?',
		answer:
			'Equal time is arithmetically simple: 182–183 overnights each. The mechanical question is which block length and exchange count the calendar produces. Whether the toddler tolerates that load is answered on the custody schedule for toddler page — not by the overnight percentage.',
	},
	{
		question: 'How are overnights spaced in toddler 50/50 schedules?',
		answer:
			'2-2-3 alternates two- and three-night stacks. 2-2-5-5 gives each parent the same two weekdays every week plus alternating five-night weekend blocks. Week-on/week-off stacks seven consecutive nights. Spacing follows the pattern name — not a custom ratio.',
	},
	{
		question: 'When should a toddler 50/50 plan move from 2-2-3 to 2-2-5-5?',
		answer:
			'When both homes hold overnights reliably and parents want fewer exchanges — accepting five-night blocks in exchange for about two handoffs per fortnight. Preschool fixed weekday mornings often trigger the shift. Confirm transition tolerance on the toddler guide before lengthening blocks.',
	},
	{
		question: 'What is the difference between this page and the toddler transition guide?',
		answer:
			'This page owns equal-time mechanics: 2-2-3, 2-2-5-5, 3-4-4-3, week-on/week-off, block length, and exchanges per fortnight. The custody schedule for toddler guide owns goodbye count, handoff stress, daycare exchanges, and attachment disruption — before you pick a pattern.',
	},
];

export const faqSection = {
	title: 'Questions about 50/50 toddler rotation mechanics',
	description:
		'Answers about block length, exchange count, and pattern selection — not handoff psychology or transition tolerance.',
};
