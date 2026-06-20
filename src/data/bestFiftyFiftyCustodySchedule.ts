import { getScheduleCustomizeUrl } from './fiftyFiftyScheduleExamples';

export const quickFacts = [
	{ label: 'Most common for school-age kids', value: '2-2-5-5' },
	{ label: 'Fewest exchanges', value: 'Week-on/week-off' },
	{ label: 'Typical start for toddlers', value: '2-2-3' },
	{ label: 'Most predictable weekdays', value: '2-2-5-5 or 5-2-2-5' },
];

export const quickRecommendations = [
	{
		label: 'Start here for elementary school routines',
		schedule: '2-2-5-5',
		why: 'The same parent keeps set school nights each week, which simplifies homework, backpacks, and teacher communication.',
		cta: 'Customize 2-2-5-5',
		href: getScheduleCustomizeUrl('2255'),
	},
	{
		label: 'Start here for toddlers',
		schedule: '2-2-3',
		why: 'Shorter blocks mean a young child is not away from either parent for more than a few days at a time.',
		cta: 'Customize 2-2-3',
		href: getScheduleCustomizeUrl('223'),
	},
	{
		label: 'Start here for older children and teenagers',
		schedule: 'Week-on/week-off',
		why: 'One weekly exchange fits busy activity calendars and reduces midweek disruption.',
		cta: 'Customize Week-on/Week-off',
		href: getScheduleCustomizeUrl('week-on-week-off'),
	},
	{
		label: 'Start here if predictable school weekdays matter',
		schedule: '5-2-2-5',
		why: 'Longer weekday blocks work when one parent prefers fixed school-week routines with alternating weekends.',
		cta: 'Customize 5-2-2-5',
		href: getScheduleCustomizeUrl('5225'),
	},
	{
		label: 'Start here if fewer handoffs than 2-2-3 are needed',
		schedule: '3-4-4-3',
		why: 'Useful when a younger child needs fewer handoffs than 2-2-3 but is not ready for a full school-week block.',
		cta: 'Customize 3-4-4-3',
		href: getScheduleCustomizeUrl('3443'),
	},
];

export const scorecardRows = [
	{
		schedule: '2-2-5-5',
		scheduleId: '2255',
		guideHref: '/2-2-5-5-custody-schedule/',
		chooseIf: [
			'School mornings and homework are the biggest challenge.',
			'Both parents can reliably handle assigned weekdays.',
		],
		avoidIf: [
			'Your child struggles with five-day stretches away from one parent.',
			'Parent work schedules change frequently and break fixed weekdays.',
		],
	},
	{
		schedule: '2-2-3',
		scheduleId: '223',
		guideHref: '/2-2-3-custody-schedule/',
		chooseIf: [
			'Your child needs frequent contact with both parents.',
			'You can manage more exchanges without rushed handoffs.',
		],
		avoidIf: [
			'Frequent handoffs create stress for the child or parents.',
			'Long drives make multiple weekly exchanges impractical.',
		],
	},
	{
		schedule: 'Week-on/week-off',
		scheduleId: 'week-on-week-off',
		guideHref: '/week-on-week-off-custody-schedule/',
		chooseIf: [
			'You want fewer exchanges and a simple weekly rhythm.',
			'Older children have stable school and activity routines.',
		],
		avoidIf: [
			'Younger children struggle with seven-day separations.',
			'A full week away from one parent triggers ongoing distress.',
		],
	},
	{
		schedule: '5-2-2-5',
		scheduleId: '5225',
		guideHref: '/5-2-2-5-custody-schedule/',
		chooseIf: [
			'You prefer longer weekday blocks with alternating weekends.',
			'A teenager wants more frequent contact than week-on/week-off allows.',
		],
		avoidIf: [
			'Short two-day blocks feel too choppy for school or activities.',
			'One parent cannot cover five consecutive school nights reliably.',
		],
	},
	{
		schedule: '3-4-4-3',
		scheduleId: '3443',
		guideHref: '/3-4-4-3-custody-schedule/',
		chooseIf: [
			'A preschooler handles slightly longer blocks but not full school-week stretches.',
			'You want fewer transitions than 2-2-3 without a full week apart.',
		],
		avoidIf: [
			'The child needs daily or every-other-day contact to stay regulated.',
			'Four-day blocks still feel too long for your child\'s age or temperament.',
		],
	},
];

export const ageDecisionCards = [
	{
		age: 'Toddlers',
		ageNote: 'About ages 1–3',
		primary: '2-2-3',
		alternative: '3-4-4-3',
		choosePrimary:
			'Choose 2-2-3 when a child becomes anxious after several days away from a parent and both homes are close enough for frequent exchanges.',
		chooseAlternative:
			'Choose 3-4-4-3 when the child tolerates slightly longer blocks and parents want fewer transitions than 2-2-3 requires.',
		watchOut: 'No single pattern fits every toddler—watch sleep, appetite, and behavior after exchanges before locking in a rotation.',
		learnLinks: [
			{ label: '50/50 custody schedule for toddlers →', href: '/50-50-custody-schedule-for-toddlers/' },
			{ label: 'Learn about the 2-2-3 schedule →', href: '/2-2-3-custody-schedule/' },
			{ label: 'Learn about the 3-4-4-3 schedule →', href: '/3-4-4-3-custody-schedule/' },
		],
	},
	{
		age: 'Preschool',
		ageNote: 'About ages 3–4',
		primary: '2-2-3',
		alternative: '3-4-4-3',
		choosePrimary:
			'Choose 2-2-3 when nap time, bedtime, and daycare drop-off still need tight consistency and shorter separations help.',
		chooseAlternative:
			'Choose 3-4-4-3 when the child is comfortable with three- or four-day blocks and parents want fewer weekly handoffs.',
		watchOut: 'Late exchanges that push past bedtime can undo an otherwise workable preschool rotation.',
		learnLinks: [
			{ label: 'Learn about the 2-2-3 schedule →', href: '/2-2-3-custody-schedule/' },
			{ label: 'Learn about the 3-4-4-3 schedule →', href: '/3-4-4-3-custody-schedule/' },
		],
	},
	{
		age: 'Elementary school',
		ageNote: 'About ages 5–10',
		primary: '2-2-5-5',
		alternative: '5-2-2-5',
		choosePrimary:
			'Choose 2-2-5-5 when consistent school-week routines are the priority and each parent can cover the same weekdays every week.',
		chooseAlternative:
			'Choose 5-2-2-5 when the family routine works better with longer weekday blocks and alternating weekend stretches.',
		watchOut: 'Sports, tutoring, and carpool plans need to match whichever parent holds the assigned school nights.',
		learnLinks: [
			{ label: 'Learn about the 2-2-5-5 schedule →', href: '/2-2-5-5-custody-schedule/' },
			{ label: 'Learn about the 5-2-2-5 schedule →', href: '/5-2-2-5-custody-schedule/' },
		],
	},
	{
		age: 'Middle school',
		ageNote: 'About ages 11–13',
		primary: 'Week-on/week-off',
		alternative: '5-2-2-5',
		choosePrimary:
			'Choose week-on/week-off when clubs, homework, and social plans make frequent midweek exchanges harder to manage.',
		chooseAlternative:
			'Choose 5-2-2-5 when the child still wants more frequent contact with each parent than a full-week block allows.',
		watchOut: 'Rigid exchange times can conflict with after-school activities unless the plan builds in flexibility.',
		learnLinks: [
			{ label: 'Learn about week-on/week-off →', href: '/week-on-week-off-custody-schedule/' },
			{ label: 'Learn about the 5-2-2-5 schedule →', href: '/5-2-2-5-custody-schedule/' },
		],
	},
	{
		age: 'Teenagers',
		ageNote: 'About ages 14+',
		primary: 'Week-on/week-off',
		alternative: '5-2-2-5',
		choosePrimary:
			'Choose week-on/week-off when a teen has jobs, sports, or driving practice and fewer handoffs reduce weekly disruption.',
		chooseAlternative:
			'Choose 5-2-2-5 when the teen prefers seeing each parent more often than a single weekly exchange allows.',
		watchOut: 'Teen preference matters more at this age—build room to adjust around school events and work schedules.',
		learnLinks: [
			{ label: 'Learn about week-on/week-off →', href: '/week-on-week-off-custody-schedule/' },
			{ label: 'Learn about the 5-2-2-5 schedule →', href: '/5-2-2-5-custody-schedule/' },
		],
	},
];

export const parentSituationCards = [
	{
		situation: 'Parents live close together',
		best: '2-2-3 or 2-2-5-5',
		why: 'Short drives make frequent exchanges practical when both homes are near school.',
		watchOut: 'Close distance does not fix tense handoffs—exchange location and timing still matter.',
		actionLabel: 'Compare frequent exchange schedules →',
		actionHref: '/2-2-3-custody-schedule/',
	},
	{
		situation: 'Parents live farther apart',
		best: 'Week-on/week-off',
		why: 'One weekly exchange cuts down on long commutes and rushed school-morning drives.',
		watchOut: 'A full week away can still feel long for children under about age 10.',
		actionLabel: 'Learn about week-on/week-off →',
		actionHref: '/week-on-week-off-custody-schedule/',
	},
	{
		situation: 'High-conflict co-parents',
		best: 'Week-on/week-off or 2-2-5-5',
		why: 'Fewer handoffs cut contact points when exchanges turn tense—week-on/week-off or 2-2-5-5 are common starting points, often with school pickup instead of driveway exchanges.',
		watchOut: 'Schedule choice alone does not resolve safety or communication issues—neutral exchanges may still be required.',
		actionLabel: 'See schedules with fewer exchanges →',
		actionHref: '/50-50-custody-schedule-examples/#fewest-exchanges',
	},
	{
		situation: 'Parents with shift work',
		best: '5-2-2-5 or custom 50/50',
		why: 'Longer weekday blocks align better with rotating shifts than daily or every-other-day exchanges.',
		watchOut: 'Shift changes can force calendar updates—backup childcare plans should be written down.',
		actionLabel: 'Compare flexible custody schedules →',
		actionHref: '/5-2-2-5-custody-schedule/',
	},
	{
		situation: 'Parents who want fixed weekdays',
		best: '2-2-5-5 or 5-2-2-5',
		why: 'The same school nights repeat for each parent, which simplifies teacher notes and activity planning.',
		watchOut: 'Holiday and summer overrides still need separate rules so fixed weekdays do not conflict.',
		actionLabel: 'Learn about the 2-2-5-5 schedule →',
		actionHref: '/2-2-5-5-custody-schedule/',
	},
	{
		situation: 'Parents who want fewer exchanges',
		best: 'Week-on/week-off',
		why: 'About one exchange per week is the simplest equal-time pattern to explain and follow.',
		watchOut: 'Fewer handoffs help parents but can stretch separations too long for younger children.',
		actionLabel: 'Learn about week-on/week-off →',
		actionHref: '/week-on-week-off-custody-schedule/',
	},
];

export const comparison223vs2255 = {
	intro: [
		'Use 2-2-3 when a child becomes unsettled after four or more days with one parent and both homes can handle more frequent exchanges.',
		'Use 2-2-5-5 when school mornings, homework, and the same weekday routine with each parent matter more than maximum contact frequency.',
		'If exchanges already feel chaotic, compare both patterns against week-on/week-off before committing to a high-handoff rotation.',
	],
	rows: [
		{
			factor: 'Exchange frequency',
			twoTwoThree: 'About three handoffs per week',
			twoTwoFiveFive: 'About two handoffs per week',
		},
		{
			factor: 'Schedule rhythm',
			twoTwoThree: 'Weekday responsibility changes more frequently',
			twoTwoFiveFive: 'Same two weekdays stay with each parent every week',
		},
		{
			factor: 'Longest stretch away',
			twoTwoThree: 'About three to four days with one parent',
			twoTwoFiveFive: 'About five days with one parent',
		},
		{
			factor: 'School routine',
			twoTwoThree: 'School-night parent can change midweek',
			twoTwoFiveFive: 'Same weekdays remain with the same parent each week',
		},
		{
			factor: 'Typical fit',
			twoTwoThree: 'Younger children who need shorter separations',
			twoTwoFiveFive: 'Elementary school and fixed weekday routines',
		},
	],
};

export const fewestExchangesRank = [
	{ rank: 1, schedule: 'Week-on/week-off', note: 'About 1 exchange per week' },
	{ rank: 2, schedule: '2-2-5-5', note: 'About 2 exchanges per week' },
	{ rank: 3, schedule: '5-2-2-5', note: 'About 2 exchanges per week' },
	{ rank: 4, schedule: '3-4-4-3', note: 'About 2 exchanges per week' },
	{ rank: 5, schedule: '2-2-3', note: 'About 3 exchanges per week' },
];

export const noSingleBestFactors = [
	'Child age and how long they tolerate being away from each parent',
	'Whether school nights stay with the same parent each week',
	'Drive time and exchange location between homes',
	'Parent work hours and shift changes',
	'How many handoffs the family can manage without conflict',
	'Holiday, summer, and activity overrides',
];

export const mostCommonParagraphs = [
	'2-2-3 is often chosen for younger children because no stretch away from either parent runs longer than a few days—parents accept more handoffs to keep separations short.',
	'2-2-5-5 becomes more common once school routines matter because each parent keeps the same weekdays every week, which simplifies homework, backpacks, and teacher communication.',
	'Week-on/week-off shows up frequently for older children and teenagers when parents want one weekly exchange and both homes can support a full school week.',
	'Common does not mean best: a pattern mediators see often may still fail if your child cannot handle its longest separation block or your commute makes its exchange count unrealistic.',
];

export const methodologyParagraphs = [
	'CustodyBuilder evaluates 50/50 patterns by four practical tests: how many exchanges the rotation requires, the longest stretch a child spends with one parent, whether school nights stay with the same parent each week, and how easy the calendar is to maintain alongside work, transportation, and activities.',
	'A 2-2-3 schedule creates more frequent exchanges but keeps younger children from being away from either parent for long periods. A week-on/week-off schedule reduces handoffs to about one per week but requires children to handle seven-day separations.',
	'We rule schedules out when a factor breaks in real life—such as a five-day block that triggers distress, fixed weekdays a shift worker cannot cover, or three weekly handoffs that add an hour of driving each time.',
];

export const faqItems = [
	{
		question: 'Can siblings have different 50/50 custody schedules?',
		answer:
			'Yes. A preschooler on 2-2-3 may need shorter separations while an older sibling on 2-2-5-5 keeps the same school nights with each parent. Some families sync all children to one rotation; others split schedules when age and transition needs differ.',
	},
	{
		question: 'When should parents change a 50/50 custody schedule?',
		answer:
			'Review the plan when routines shift—starting kindergarten (often 2-2-3 toward 2-2-5-5), beginning middle school with heavier activities (fewer midweek exchanges), a parent changing shifts, or a longer commute that makes frequent handoffs impractical.',
	},
	{
		question: 'What happens if parents cannot agree on the best schedule?',
		answer:
			'Write down each parent\'s non-negotiables first—exchange count, school-night consistency, drive time—then compare two patterns side by side. Mediation, parenting-plan drafting, or court-approved processes may follow if you still disagree; this page is scheduling education, not legal advice.',
	},
	{
		question: 'Should holidays use the same 50/50 schedule?',
		answer:
			'Many families pause the regular rotation for holidays and school breaks—Thanksgiving with one parent even when the normal pattern would place the child elsewhere, then resume the standard schedule afterward. Holiday rules should be written separately so they do not conflict with weekday assignments.',
	},
	{
		question: 'Can a 50/50 schedule change over time?',
		answer:
			'Yes. A 2-2-3 plan that worked at age four often breaks at age six when homework needs the same parent on set weeknights. Competitive travel sports, a teen\'s part-time job, or a parent moving farther from school are other common reasons to move toward 2-2-5-5, 5-2-2-5, or week-on/week-off.',
	},
];

export const relatedLinks = [
	{ title: '50/50 Custody Schedule Hub', href: '/50-50-custody-schedule/', description: 'Compare patterns and customize a 50/50 parenting schedule for your family.' },
	{ title: '50/50 Schedule Examples', href: '/50-50-custody-schedule-examples/', description: 'See how common patterns work for different ages, holidays, and routines.' },
	{ title: 'Compare Schedules Side-by-Side', href: '/schedule-comparison-tool/', description: 'Review exchange frequency, predictability, and fit before choosing.' },
	{ title: 'Custody Schedule Generator', href: '/custody-schedule-generator/', description: 'Customize dates, parent names, and parenting time details.' },
	{ title: 'Parenting Plan Template', href: '/parenting-plan-template/', description: 'Document exchanges, holidays, and schedule change rules.' },
];

export const comparedScheduleListItems = [
	{ name: '2-2-5-5 Custody Schedule', url: '/2-2-5-5-custody-schedule/' },
	{ name: '2-2-3 Custody Schedule', url: '/2-2-3-custody-schedule/' },
	{ name: 'Week-On/Week-Off Custody Schedule', url: '/week-on-week-off-custody-schedule/' },
	{ name: '5-2-2-5 Custody Schedule', url: '/5-2-2-5-custody-schedule/' },
	{ name: '3-4-4-3 Custody Schedule', url: '/3-4-4-3-custody-schedule/' },
];
