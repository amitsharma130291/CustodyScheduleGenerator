/** Deep links preselect a pattern on the 50/50 hub generator via ?schedule= query param. */
export const scheduleCustomizeUrls: Record<string, string> = {
	'223': '/50-50-custody-schedule/?schedule=223',
	'2255': '/50-50-custody-schedule/?schedule=2255',
	'5225': '/50-50-custody-schedule/?schedule=5225',
	'3443': '/50-50-custody-schedule/?schedule=3443',
	'week-on-week-off': '/50-50-custody-schedule/?schedule=week-on-week-off',
};

export function getScheduleCustomizeUrl(scheduleId?: string): string {
	if (scheduleId && scheduleCustomizeUrls[scheduleId]) {
		return scheduleCustomizeUrls[scheduleId];
	}
	return '/50-50-custody-schedule/';
}

export const examplesLibraryPromo = {
	heading: 'When did the rotation break?',
	description:
		'Named situations where equal-time calendars collided with school, work, or holidays — and what parents changed.',
	buttonText: 'Read failure scenarios',
	href: '/50-50-custody-schedule-examples/',
};

export const fiftyFiftyPatternSlugs = [
	'2-2-3-custody-schedule',
	'2-2-5-5-custody-schedule',
	'5-2-2-5-custody-schedule',
	'3-4-4-3-custody-schedule',
	'week-on-week-off-custody-schedule',
];

export const meta = {
	title: '50/50 Custody Examples: When the Rotation Broke',
	description:
		'Real situations where equal-time calendars failed — Tuesday piano on 2-2-3, nurse shifts on week-on/week-off, holiday overrides — and what parents changed.',
	datePublished: '2026-06-18',
	dateModified: '2026-06-24',
};

export const editorialReview = {
	reviewedFor: [
		'named failure scenarios on equal time',
		'school and work collision stories',
		'holiday override breakdowns',
		'calendar-generation accuracy',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'These scenarios illustrate planning failures on equal-time calendars and are not legal advice.',
};

export const hero = {
	headline: '50/50 Custody Schedule Examples: When the Rotation Broke',
	intro:
		'These are not pattern catalogs. Each story names a situation — Tuesday piano, weekend nurse shifts, Thanksgiving override — where an equal-time calendar looked fine on paper and failed in the month.',
	boundary:
		'First-round pattern choice lives on the <a href="/50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedule</a> hub. Eliminating two finalists lives on the <a href="/best-50-50-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">two-schedule elimination guide</a>. Pattern mechanics live on individual pattern pages.',
};

export const heroKeyStats = [
	{ value: 'Tue', label: 'piano collision' },
	{ value: 'Sat', label: 'shift clash' },
	{ value: 'Thu', label: 'holiday override' },
];

export const heroTrustSignals = [
	'Free to use',
	'No signup required',
	'Load scenario in generator',
];

export const articleTocItems = [
	{ id: 'schedule-generator', label: 'Load your month' },
	{ id: 'how-to-use', label: 'How to use' },
	{ id: 'school-activities', label: 'School activities' },
	{ id: 'work-schedules', label: 'Work schedules' },
	{ id: 'holidays', label: 'Holidays' },
	{ id: 'stops-equal', label: 'Stops feeling equal' },
	{ id: 'leave-5050', label: 'Leave 50/50' },
	{ id: 'load-generator', label: 'Generator' },
	{ id: 'faq', label: 'FAQ' },
];

export const howToUse = {
	title: 'How To Use These Examples',
	intro:
		'Match your collision — not your child\'s age label. Read the failure, note the adjustment, then load your start date in the generator and mark the same conflict days on your month.',
	steps: [
		'Find the situation closest to your week (activity night, shift, holiday).',
		'Read what broke on the printed rotation — not which pattern is "right."',
		'Open the generator with the pattern from the story and mark conflict days on your real month.',
	],
};

export const schoolActivities = {
	title: 'When School Activities Collide With The Calendar',
	intro:
		'Recurring Tuesday practice and Thursday music do not read parenting plans. They read whichever parent owns that weekday on the printed fortnight.',
	scenarios: [
		{
			heading: 'Tuesday piano on 2-2-3',
			situation: 'Seven-year-old, piano every Tuesday 4 p.m., parents on 2-2-3.',
			failure: 'Tuesday alternated parents. Teacher emails went to whoever had Nina that week. Missed lessons started in October.',
			adjustment: 'Moved to 2-2-5-5 so Mom owns every Tuesday. See <a href="/2-2-5-5-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">2-2-5-5</a> and the <a href="/best-custody-schedule-for-7-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">7-year-old activity guide</a>.',
			scheduleId: '2255',
		},
		{
			heading: 'Exchange night before soccer warm-up',
			situation: 'Wednesday 5:00 exchange, practice ends 5:30, rotation alternates midweek.',
			failure: 'Driveway handoff before warm-up failed every week. Child arrived late or missed stretch.',
			adjustment: 'Pickup after practice on exchange weeks — or shift exchange to Thursday. Map on <a href="/50-50-custody-schedule-for-school-age-children/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">school-age 50/50 ownership</a> page.',
			scheduleId: '2255',
		},
		{
			heading: 'Friday folder on rotating parent',
			situation: 'Unsigned reading logs every Friday car line.',
			failure: 'Friday belonged to whoever held the five-day block end — folder responsibility never landed on one parent.',
			adjustment: 'Named Friday folder owner in plan regardless of overnight block. Kindergarten entry details on <a href="/best-custody-schedule-for-5-year-old/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">5-year-old guide</a>.',
			scheduleId: '2255',
		},
	],
};

export const workSchedules = {
	title: 'When Parent Work Schedules Break The Rotation',
	intro:
		'Shift work and weekend jobs do not read custody blocks. They land on whichever parent\'s week is printed when the boss posts the schedule.',
	scenarios: [
		{
			heading: 'Nurse on week-on/week-off',
			situation: 'Parent B works Saturday–Sunday 7 a.m.–7 p.m. every other weekend on WOW rotation.',
			failure: 'Child on Parent B\'s week every time a double shift posted. Parent A drove to exchanges Parent B could not make.',
			adjustment: 'Written swap clause for scheduled shifts plus moved base to 2-2-5-5 for fixed weekdays. See <a href="/week-on-week-off-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">week-on/week-off</a> rigidity notes.',
			scheduleId: '2255',
		},
		{
			heading: 'Weekend retail on the wrong block',
			situation: 'Teen closes at 10 p.m. Saturday on other parent\'s printed weekend.',
			failure: 'Calendar said Parent A; shift said Parent B\'s store. Informal swaps replaced the printed month.',
			adjustment: 'Documented time-limited swaps with resume date. Teen independence on <a href="/50-50-custody-schedule-for-teenagers/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 teen guide</a>.',
			scheduleId: 'week-on-week-off',
		},
		{
			heading: 'Monday–Friday 9-to-5 with 2-2-3',
			situation: 'Both parents office hours, three midweek exchanges on 2-2-3.',
			failure: 'Rush-hour exchanges at 5:30 collided with after-school pickup windows three nights per fortnight.',
			adjustment: 'School-dismissal exchanges on two fixed days — or moved to 2-2-5-5 with fewer handoffs.',
			scheduleId: '2255',
		},
	],
};

export const holidays = {
	title: 'When Holidays Override The Schedule',
	intro:
		'Base rotations stay 50/50 until Thanksgiving, winter break, or summer travel inserts a block that the fortnight grid never showed.',
	scenarios: [
		{
			heading: 'Thanksgiving on the wrong five-day block',
			situation: '2-2-5-5 with Parent A holding Thanksgiving week on paper.',
			failure: 'Holiday table gave Parent B Thursday–Sunday. Child packed for A\'s house, order said B.',
			adjustment: 'Holiday clause overrides base rotation with exact exchange times. Plan on <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> page.',
			scheduleId: '2255',
		},
		{
			heading: 'Split winter break mid-block',
			situation: 'Week-on/week-off with exchange Dec 26 during Parent A\'s week.',
			failure: 'Travel to grandparents started Dec 23; calendar required child back Dec 26 for exchange.',
			adjustment: 'First-half/second-half break split with fixed resume date — not daily swaps through January.',
			scheduleId: 'week-on-week-off',
		},
		{
			heading: 'Summer camp on alternating weeks',
			situation: 'Two-week camp session during Parent B\'s WOW block.',
			failure: 'Camp required continuous two weeks; rotation flipped after seven days.',
			adjustment: 'Season override paragraph with resume date on base rotation. Print summer layer in generator.',
			scheduleId: 'week-on-week-off',
		},
	],
};

export const stopsEqual = {
	title: 'When Equal Time Stops Feeling Equal',
	intro:
		'Overnights still split 50/50 on the annual calculator while waking hours pile on one parent — homework, activities, sick days.',
	scenarios: [
		{
			heading: 'One parent holds every school morning',
			situation: '2-2-3 with bus stop closer to Parent A; exchanges after school only.',
			failure: 'Parent A drove every 7:15 a.m. bus for nine months while overnights stayed equal.',
			adjustment: 'Renamed morning responsibility in plan or shifted to 5-2-2-5 school-week block.',
			scheduleId: '5225',
		},
		{
			heading: 'Gear always at the other house',
			situation: 'Thursday violin on 2-2-3 when Thursday alternates.',
			failure: 'Instrument at Mom\'s when Thursday belonged to Dad on the calendar — missed lesson three Thursdays.',
			adjustment: 'Duplicate gear bag or fixed Thursday owner via 2-2-5-5.',
			scheduleId: '2255',
		},
	],
};

export const leave5050 = {
	title: 'When Families Leave 50/50',
	intro:
		'Some months prove equal time on these patterns is not the right question — distance, safety, or block length ends the debate.',
	signals: [
		{
			heading: 'Forty-five-minute school commute',
			body: 'Three midweek exchanges in 2-2-3 produced nine hours of driving per fortnight. Parents moved to <a href="/60-40-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">60/40</a> with one weekly exchange.',
		},
		{
			heading: 'Every finalist fails conflict marking',
			body: 'Both 2-2-5-5 and week-on/week-off showed four conflict days in the same month. Elimination guide pointed to unequal schedules — see <a href="/best-50-50-custody-schedule/#both-fail" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">when both fail</a>.',
		},
		{
			heading: 'Infant feeding blocks equal nights',
			body: 'Step-up plan required before overnight parity. Route to <a href="/50-50-custody-schedule-for-babies/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 for babies</a> before forcing a school-age pattern.',
		},
	],
};

export const loadGenerator = {
	title: 'Load Your Situation Into The Generator',
	body: 'Pick the pattern from the story closest to your collision. Set your real start date, rename parents, and mark conflict days on the printed month before changing the parenting plan.',
	primaryHref: '/50-50-custody-schedule/',
	primaryLabel: 'Open 50/50 generator',
	secondaryHref: '/best-50-50-custody-schedule/',
	secondaryLabel: 'Eliminate two finalists',
};

export const faqSection = {
	title: 'Questions about equal-time collisions',
	description: 'Answers about activity, work, and holiday failures — not pattern definitions or printable galleries.',
};

export const faqItems = [
	{
		question: 'What if soccer practice lands on exchange day?',
		answer:
			'Move pickup to after practice instead of a driveway handoff before warm-up. If exchange night recurs every fortnight on the same activity, shift the exchange day or adopt fixed weekday ownership via 2-2-5-5.',
	},
	{
		question: 'What if one parent works weekends?',
		answer:
			'Write swap clauses for scheduled shifts on the other parent\'s block. Week-on/week-off fails when weekend work is fixed — shorter weekday blocks with documented swaps often survive better.',
	},
	{
		question: 'What if holidays destroy the rotation?',
		answer:
			'Holiday tables override base rotations. Build the school-year calendar first, then layer Thanksgiving and winter break with exact start and end times before signing.',
	},
	{
		question: 'What if both parents want the same activity nights?',
		answer:
			'The calendar assigns weekday ownership — not preference. Name the driver for each recurring night in the plan or adopt a rotation with fixed weekdays so Tuesday always has one owner.',
	},
	{
		question: 'When should a family leave 50/50?',
		answer:
			'When every finalist fails conflict marking, commute makes midweek exchanges impossible, or step-up plans still govern overnights. Unequal schedules are a logistics outcome — not a parenting score.',
	},
	{
		question: 'How do I test a scenario on my dates?',
		answer:
			'Load the pattern from the story in the generator, use your start date, and mark conflict days on the preview month. Compare against the elimination guide if two patterns remain.',
	},
];
