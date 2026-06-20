/** Two-week mini-calendar patterns: A = Parent A, B = Parent B */

export const pattern223 = ['A', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B'];
export const pattern2255 = ['A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'A'];
export const pattern3443 = ['A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A'];
export const pattern5225 = ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'A'];
export const patternWeekOn = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B'];

// Deep links preselect a pattern on the 50/50 hub generator via ?schedule= query param.
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
	heading: 'Looking for More 50/50 Custody Examples?',
	description:
		'See how these schedules work for toddlers, school-age children, teenagers, holidays, work schedules, and different parenting situations.',
	buttonText: 'Browse All 50/50 Schedule Examples',
	href: '/50-50-custody-schedule-examples/',
};

export const fiftyFiftyPatternSlugs = [
	'2-2-3-custody-schedule',
	'2-2-5-5-custody-schedule',
	'5-2-2-5-custody-schedule',
	'3-4-4-3-custody-schedule',
	'week-on-week-off-custody-schedule',
];

export const scenariosProofCopy =
	'Most 50/50 custody schedules are built from a handful of proven calendar patterns. The examples below show how those patterns can be adapted for different ages, school routines, holidays, and parent work schedules.';

export const monthlyCalendarExamples = [
	{
		scheduleId: '223',
		title: '2-2-3 Monthly Calendar Example',
		exchanges: 'About 8–10 exchanges in a typical month',
		longestAway: 'Up to 3–4 consecutive days with one parent',
		bestFor: 'Younger children who need shorter gaps between homes',
		highlights: ['Frequent contact with both parents', 'Alternating long weekends over time'],
		cta: 'Customize This 2-2-3 Calendar',
		href: '/50-50-custody-schedule/?schedule=223',
	},
	{
		scheduleId: '2255',
		title: '2-2-5-5 Monthly Calendar Example',
		exchanges: 'About 4–6 exchanges in a typical month',
		longestAway: 'Up to 5 consecutive days with one parent',
		bestFor: 'School-age children who need predictable weekday routines',
		highlights: ['Consistent weekdays with each parent', 'Easier long-term school planning'],
		cta: 'Customize This 2-2-5-5 Calendar',
		href: '/50-50-custody-schedule/?schedule=2255',
	},
	{
		scheduleId: 'week-on-week-off',
		title: 'Week-On/Week-Off Monthly Calendar Example',
		exchanges: 'About 4 exchanges in a typical month',
		longestAway: 'Up to 7 consecutive days with one parent',
		bestFor: 'Older children and teens who handle longer blocks',
		highlights: ['Fewer handoffs', 'Simpler monthly planning'],
		cta: 'Customize This Week-On/Week-Off Calendar',
		href: '/50-50-custody-schedule/?schedule=week-on-week-off',
	},
	{
		scheduleId: '3443',
		title: '3-4-4-3 Monthly Custody Calendar Example',
		description:
			'See how the 3-4-4-3 schedule balances longer parenting blocks with regular transitions throughout a full month.',
		exchanges: 'Approximately 4 per two weeks',
		longestAway: '4 days',
		bestFor: 'Older children who can handle longer blocks',
		highlights: ['Alternating three- and four-day blocks', 'No full week away from either parent'],
		cta: 'Customize This 3-4-4-3 Calendar →',
		href: '/50-50-custody-schedule/?schedule=3443',
	},
	{
		scheduleId: '5225',
		title: '5-2-2-5 Monthly Custody Calendar Example',
		description:
			'View how a 5-2-2-5 rotation creates predictable school-week routines while maintaining equal parenting time.',
		exchanges: 'Approximately 3 per two weeks',
		longestAway: '5 days',
		bestFor: 'School-age children and consistent weekday routines',
		highlights: ['Fixed weekday blocks for each parent', 'Weekends alternate through five-day stretches'],
		cta: 'Customize This 5-2-2-5 Calendar →',
		href: '/50-50-custody-schedule/?schedule=5225',
	},
];

export const exampleGalleryItems = [
	{ name: '2-2-3 Custody Schedule Example', anchor: 'example-223' },
	{ name: '2-2-5-5 Custody Schedule Example', anchor: 'example-2255' },
	{ name: '3-4-4-3 Custody Schedule Example', anchor: 'example-3443' },
	{ name: '5-2-2-5 Custody Schedule Example', anchor: 'example-5225' },
	{ name: 'Week-On/Week-Off Custody Schedule Example', anchor: 'example-week-on-week-off' },
];

export const selectionCriteria = [
	'Fewest exchanges',
	'Predictable school nights',
	'Short gaps between parents',
	'Works with holidays',
	'Easy to print',
	'Easy to customize',
];

export const exchangeRankRows = [
	{
		rank: 1,
		example: 'Week-on/week-off',
		exchanges: 'About 1 exchange per week',
		bestFor: 'Older children, teens, fewer handoffs',
		scheduleId: 'week-on-week-off',
	},
	{
		rank: 2,
		example: '2-2-5-5',
		exchanges: 'About 2 exchanges per week',
		bestFor: 'School-age children, predictable weekdays',
		scheduleId: '2255',
	},
	{
		rank: 3,
		example: '5-2-2-5',
		exchanges: 'About 2 exchanges per week',
		bestFor: 'Families who want fixed weekday blocks',
		scheduleId: '5225',
	},
	{
		rank: 4,
		example: '3-4-4-3',
		exchanges: 'About 2 exchanges per week',
		bestFor: 'Families who want balanced midweek/weekend time',
		scheduleId: '3443',
	},
	{
		rank: 5,
		example: '2-2-3',
		exchanges: 'About 3 exchanges per week',
		bestFor: 'Toddlers and younger children who need shorter separations',
		scheduleId: '223',
	},
];

export const popularExamples = [
	{
		title: '2-2-5-5 Schedule',
		badge: 'Most Popular for School',
		label: 'Best for school routines',
		text: 'Predictable weekdays make this one of the easiest 50/50 examples for elementary school children.',
		cta: 'View 2-2-5-5 Example',
		href: '#example-2255',
	},
	{
		title: 'Week-On/Week-Off',
		badge: 'Fewest Exchanges',
		label: 'Fewest exchanges',
		text: 'A simple weekly rotation that often works best for older children and teenagers.',
		cta: 'View Week-On/Week-Off Example',
		href: '#example-week-on-week-off',
	},
	{
		title: '2-2-3 Schedule',
		badge: 'Best for Shorter Gaps',
		label: 'Best for shorter gaps',
		text: 'A frequent-contact example often considered by parents of toddlers or younger children.',
		cta: 'View 2-2-3 Example',
		href: '#example-223',
	},
];

export const fastFindCards = [
	{ label: 'Full month view', href: '#full-month-examples', note: '30-day calendars' },
	{ label: 'Most popular', href: '#popular-examples', note: 'Top 3 patterns' },
	{ label: 'Schedule types', href: '#schedule-type-examples', note: 'All 5 patterns' },
	{ label: 'Fewest exchanges', href: '#fewest-exchanges', note: 'Ranked comparison' },
	{ label: 'By child age', href: '#age-examples', note: 'Toddler to teen' },
	{ label: 'Parent schedules', href: '#parent-schedule-examples', note: 'Work & distance' },
	{ label: 'Holidays & summer', href: '#holiday-examples', note: 'Override rules' },
	{ label: 'Printable PDFs', href: '#printable-examples', note: 'Calendar downloads' },
	{ label: 'Choose an example', href: '#choose-an-example', note: 'Situation matcher' },
];

export const scheduleTypeExamples = [
	{
		id: 'example-223',
		name: '2-2-3 Example',
		bestFor: 'This 2-2-3 custody schedule example fits toddlers and younger school-age children when parents live close and exchanges stay calm.',
		pattern: pattern223,
		exchanges: 'About 4 handoffs every two weeks, often Sunday night or Monday morning.',
		pros: ['Frequent contact with both parents', 'No child goes a full week without seeing either parent', 'Weekends alternate fairly over time'],
		challenges: ['More driving and packing', 'Harder when parents live far apart', 'School-week logistics need tight coordination'],
		scheduleId: '223',
		guideHref: '/2-2-3-custody-schedule/',
		guideLabel: 'Learn the 2-2-3 schedule',
		calendarLabel: '2-2-3 custody schedule example calendar',
		metrics: { exchangeLevel: 'High', predictability: 'Medium', bestAge: 'Toddlers / young children' },
	},
	{
		id: 'example-2255',
		name: '2-2-5-5 Example',
		bestFor: 'This 2-2-5-5 custody schedule example works well for elementary and middle school children who need the same school-night routine each week.',
		pattern: pattern2255,
		exchanges: 'Usually 2 exchanges every two weeks after the first five-day block.',
		pros: ['Same weekdays with each parent every week', 'Fewer exchanges than 2-2-3', 'Easier homework and activity planning'],
		challenges: ['Five-day gaps away from one parent', 'Less frequent contact than 2-2-3', 'Longer blocks may feel hard for younger children'],
		scheduleId: '2255',
		guideHref: '/2-2-5-5-custody-schedule/',
		guideLabel: 'Learn the 2-2-5-5 schedule',
		calendarLabel: 'printable 50/50 custody schedule example',
		metrics: { exchangeLevel: 'Medium', predictability: 'High', bestAge: 'School-age children' },
	},
	{
		id: 'example-3443',
		name: '3-4-4-3 Example',
		bestFor: 'This 3-4-4-3 custody schedule example suits families who want balanced blocks with a predictable two-week rhythm.',
		pattern: pattern3443,
		exchanges: 'Typically 2 exchanges every two weeks.',
		pros: ['Clear repeating pattern', 'Fewer exchanges than 2-2-3', 'Works well when both homes support school routines'],
		challenges: ['Longer four-day stretches', 'Can feel uneven in a single month view', 'Needs both parents aligned on exchange times'],
		scheduleId: '3443',
		guideHref: '/3-4-4-3-custody-schedule/',
		guideLabel: 'Learn the 3-4-4-3 schedule',
		calendarLabel: '50/50 custody calendar example',
		metrics: { exchangeLevel: 'Medium', predictability: 'Medium', bestAge: 'Older children' },
	},
	{
		id: 'example-5225',
		name: '5-2-2-5 Example',
		bestFor: 'This 5-2-2-5 custody schedule example helps school-age children when one parent prefers longer weekday blocks and alternating weekends.',
		pattern: pattern5225,
		exchanges: 'About 2 exchanges every two weeks, often tied to school dismissal.',
		pros: ['Longer weekday blocks for routine building', 'Weekends still alternate', 'Fewer midweek handoffs than 2-2-3'],
		challenges: ['Five-day stretches can feel long for younger kids', 'Requires reliable school transportation', 'Holiday overrides need clear written rules'],
		scheduleId: '5225',
		guideHref: '/5-2-2-5-custody-schedule/',
		guideLabel: 'Learn the 5-2-2-5 schedule',
		metrics: { exchangeLevel: 'Medium', predictability: 'High', bestAge: 'School-age children' },
	},
	{
		id: 'example-week-on-week-off',
		name: 'Week-On/Week-Off Example',
		bestFor: 'This week-on/week-off custody schedule example fits teens and older children who handle seven-day blocks and want the fewest exchanges.',
		pattern: patternWeekOn,
		exchanges: 'One exchange every week, often Friday after school or Sunday evening.',
		pros: ['Simplest calendar to explain', 'Lowest exchange count', 'Good for busy activity schedules'],
		challenges: ['Full week away from each parent', 'Not ideal for many toddlers', 'Missed school items if communication is weak'],
		scheduleId: 'week-on-week-off',
		guideHref: '/week-on-week-off-custody-schedule/',
		guideLabel: 'Learn week-on/week-off',
		calendarLabel: 'week-on/week-off custody calendar example',
		metrics: { exchangeLevel: 'Low', predictability: 'High', bestAge: 'Teens / older children' },
	},
];

export const ageExamples = [
	{
		id: 'example-toddler',
		ageLabel: 'Toddlers',
		name: 'Toddler 2-2-3 Example',
		recommendedPattern: '2-2-3',
		recommendationReason: 'Shorter gaps between homes',
		recommendationLinks: [{ label: '2-2-3 schedule guide', href: '/2-2-3-custody-schedule/' }],
		bestFor: 'Ages 1–3 when both homes are nearby and nap or bedtime routines can stay consistent.',
		pattern: pattern223,
		exchanges: 'Short blocks with exchanges every 2–3 days.',
		pros: ['Limits long separations', 'Keeps both parents in daily routines', 'Easier to add comfort items and nap notes'],
		challenges: ['Frequent transitions can tire toddlers', 'Both homes need duplicate supplies', 'Late exchanges can disrupt sleep'],
		scheduleId: '223',
		guideHref: '/best-custody-schedule-for-toddler/',
		calendarLabel: '2-2-3 custody schedule example calendar',
	},
	{
		id: 'example-preschool',
		ageLabel: 'Preschool',
		name: 'Preschool 2-2-5-5 Example',
		recommendedPattern: '2-2-5-5',
		recommendationReason: 'Predictable weekdays with manageable separation',
		recommendationLinks: [{ label: '2-2-5-5 schedule guide', href: '/2-2-5-5-custody-schedule/' }],
		bestFor: 'Ages 3–5 when preschool drop-off and pickup should repeat on the same weekdays.',
		pattern: pattern2255,
		exchanges: 'Often Monday or Sunday evening every 1–2 weeks.',
		pros: ['Predictable school mornings', 'Fewer exchanges than 2-2-3', 'Easier for daycare or preschool teachers to follow'],
		challenges: ['Five-day blocks may still feel long', 'Needs backup plans for sick days', 'Holiday weeks can shift the pattern'],
		scheduleId: '2255',
		guideHref: '/best-custody-schedule-for-5-year-old/',
	},
	{
		id: 'example-elementary',
		ageLabel: 'Elementary school',
		name: 'Elementary 2-2-5-5 or 5-2-2-5 Example',
		recommendedPattern: '2-2-5-5 or 5-2-2-5',
		recommendationReason: 'Easier school-night routines',
		recommendationLinks: [
			{ label: '2-2-5-5 schedule guide', href: '/2-2-5-5-custody-schedule/' },
			{ label: '5-2-2-5 schedule guide', href: '/5-2-2-5-custody-schedule/' },
		],
		bestFor: 'Grades K–5 when homework, sports, and carpool need a steady school-week anchor.',
		pattern: pattern2255,
		exchanges: 'School dismissal exchanges work well when both parents live near school.',
		pros: ['Stable weekday routines', 'Room for activities and tutoring', 'Printable calendars are easy to share with school'],
		challenges: ['Summer needs a separate plan', 'After-school activities can conflict with exchanges', 'Both parents need access to school apps'],
		scheduleId: '2255',
		guideHref: '/best-custody-schedule-for-7-year-old/',
	},
	{
		id: 'example-middle-school',
		ageLabel: 'Middle school',
		name: 'Middle School 3-4-4-3 Example',
		recommendedPattern: '3-4-4-3',
		recommendationReason: 'Balanced weeks with fewer short transitions',
		recommendationLinks: [{ label: '3-4-4-3 schedule guide', href: '/3-4-4-3-custody-schedule/' }],
		bestFor: 'Ages 10–13 when longer blocks help with clubs, homework, and friend time.',
		pattern: pattern3443,
		exchanges: 'Usually twice every two weeks at a fixed time and location.',
		pros: ['Fewer interruptions to school week', 'Longer blocks for projects and sports', 'Still balances time over the year'],
		challenges: ['Social plans can complicate exchanges', 'Child preferences matter more at this age', 'Needs clear phone and communication rules'],
		scheduleId: '3443',
		guideHref: '/custody-schedule-by-age/',
	},
	{
		id: 'example-teen',
		ageLabel: 'Teenagers',
		name: 'Teen Week-On/Week-Off Example',
		recommendedPattern: 'Week-on/week-off',
		recommendationReason: 'Fewer exchanges and simpler planning',
		recommendationLinks: [{ label: 'Week-on/week-off guide', href: '/week-on-week-off-custody-schedule/' }],
		bestFor: 'High school students with jobs, sports, and independent transportation.',
		pattern: patternWeekOn,
		exchanges: 'One weekly exchange, often after Friday school or Sunday evening.',
		pros: ['Minimal disruption to teen schedule', 'Easy to read on a wall calendar', 'Works when teens manage their own gear'],
		challenges: ['A full week away can still feel long', 'Driving privileges may differ by home', 'Summer jobs may need custom blocks'],
		scheduleId: 'week-on-week-off',
		guideHref: '/best-custody-schedule-for-teenager/',
		calendarLabel: 'week-on/week-off custody calendar example',
	},
];

export const limitationsCards = [
	{
		title: 'Long-distance parenting',
		note: 'Frequent 2-2-3 exchanges may be unrealistic. Start with longer blocks and plan travel windows in the generator.',
	},
	{
		title: 'High-conflict exchanges',
		note: 'Fewer handoffs and school-based exchanges often work better than high-frequency rotations.',
	},
	{
		title: 'Rotating shift work',
		note: 'A fixed calendar may need custom block lengths rather than a textbook 50/50 pattern.',
	},
	{
		title: 'Complex holiday plans',
		note: 'Alternating holidays, split breaks, and summer blocks usually need written override rules beyond the base example.',
	},
];

export const parentScheduleExamples = [
	{
		id: 'example-mon-fri-jobs',
		name: 'Monday–Friday 9-to-5 Parents',
		bestFor: 'Both parents work standard weekday hours and live within 30 minutes of school.',
		pattern: pattern2255,
		exchanges: 'School dismissal or a fixed evening time on exchange days.',
		pros: ['School exchanges avoid rush-hour commutes', 'Weekday routines repeat clearly', 'Easy to share a printed school-year calendar'],
		challenges: ['Summer camp weeks need a separate plan', 'Overtime or travel can break the pattern', 'Backup caregivers should be listed in writing'],
		scheduleId: '2255',
	},
	{
		id: 'example-shift-work',
		name: 'Nurse or Shift-Work Schedule',
		bestFor: 'Parents with rotating shifts who need longer blocks and fewer midweek handoffs.',
		pattern: patternWeekOn,
		exchanges: 'Weekly or biweekly exchanges aligned with off-duty days.',
		pros: ['Matches work-rest cycles', 'Fewer exchanges during busy work weeks', 'Child gear stays in each home longer'],
		challenges: ['Shift changes can force calendar updates', 'Needs flexible make-up time rules', 'Childcare coverage must be planned in advance'],
		scheduleId: 'week-on-week-off',
	},
	{
		id: 'example-weekend-work',
		name: 'Parent Who Works Weekends',
		bestFor: 'Families where one parent is unavailable Saturday–Sunday but strong on school nights.',
		pattern: pattern5225,
		exchanges: 'Weekday blocks with the weekend-working parent taking school nights when off.',
		pros: ['Uses weekday availability well', 'Weekend worker may still get longer weekday blocks', 'Can balance annual overnights with custom tweaks'],
		challenges: ['Requires creative custom wording', 'Holiday weekends need override rules', 'Annual overnight split may not look exactly 50/50 every month'],
		scheduleId: '5225',
	},
	{
		id: 'example-near-school',
		name: 'Parents Close to School',
		bestFor: 'Both homes within 15–20 minutes of the child’s school or daycare.',
		pattern: pattern223,
		exchanges: 'Frequent exchanges work when driving time stays short.',
		pros: ['2-2-3 becomes practical', 'Forgotten items are easier to swap', 'Both parents can attend school events'],
		challenges: ['Still needs calm handoffs', 'Traffic at bell time can add stress', 'After-school activities need a shared calendar'],
		scheduleId: '223',
	},
	{
		id: 'example-long-commute',
		name: 'Parents With Long Commutes',
		bestFor: 'Homes 45+ minutes apart or heavy rush-hour travel between exchanges.',
		pattern: pattern3443,
		exchanges: 'Fewer exchanges, often every 3–4 days at a midpoint or school when practical.',
		pros: ['Less driving than 2-2-3', 'Longer blocks reduce transition fatigue', 'School exchanges can cut commute burden'],
		challenges: ['May not feel perfectly equal every month', 'Make-up time rules help when traffic causes delays', 'Summer travel costs should be planned early'],
		scheduleId: '3443',
	},
];

export const holidaySummerExamples = [
	{
		title: 'Alternating Holidays',
		description: 'Odd years to Parent A, even years to Parent B for major holidays like Thanksgiving or July 4.',
		pattern: ['A', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'A', 'A'],
		tip: 'Write whether the holiday overrides the regular week or adds time on top of it.',
		calendarLabel: '50/50 custody calendar example',
	},
	{
		title: 'Split Christmas Break',
		description: 'First half of winter break with one parent, second half with the other, with a fixed exchange on Dec 26 or New Year’s Day.',
		pattern: pattern2255,
		tip: 'List exact start and end times so travel days do not overlap school return.',
	},
	{
		title: 'Alternating Thanksgiving',
		description: 'Thanksgiving weekend rotates yearly while the regular 50/50 pattern pauses for the holiday block.',
		pattern: pattern223,
		tip: 'Clarify whether Wednesday night or Sunday return applies.',
	},
	{
		title: 'Two-Week Summer Blocks',
		description: 'Each parent gets two consecutive summer weeks while the regular schedule pauses.',
		pattern: patternWeekOn,
		tip: 'Add notice deadlines and whether the non-primary block can be split.',
	},
	{
		title: 'Week-On/Week-Off Summer',
		description: 'Continue the school-year week-on/week-off rhythm through summer for a simple vacation calendar.',
		pattern: patternWeekOn,
		tip: 'Camp weeks, travel, and family reunions still need written exceptions.',
	},
];

export const printableExamples = [
	{
		title: 'Monthly Example',
		description: 'One color-coded month showing Parent A and Parent B overnights.',
		href: '/custody-calendar-template/',
	},
	{
		title: 'Two-Week Rotation',
		description: 'A repeating 14-day grid for 2-2-3, 2-2-5-5, or 3-4-4-3.',
		href: '/50-50-custody-schedule/?schedule=2255',
	},
	{
		title: 'School-Year Example',
		description: 'August–May calendar with fixed exchange days and school holidays noted.',
		href: '/50-50-custody-schedule/?schedule=2255',
	},
	{
		title: 'Summer Example',
		description: 'June–August view with longer blocks and vacation swaps highlighted.',
		href: '/50-50-custody-schedule/?schedule=week-on-week-off',
	},
	{
		title: 'Frequent-Contact Example',
		description: '2-2-3 pattern preview for parents comparing shorter separations.',
		href: '/50-50-custody-schedule/?schedule=223',
	},
];

export const decisionRows = [
	{
		situation: 'Toddler',
		example: '2-2-3',
		why: 'Shorter separations and frequent contact usually fit younger children better.',
		scheduleId: '223',
	},
	{
		situation: 'School-age child',
		example: '2-2-5-5',
		why: 'Repeating weekdays make school mornings and homework easier to plan.',
		scheduleId: '2255',
	},
	{
		situation: 'Teenager',
		example: 'Week-on/week-off',
		why: 'Fewer exchanges and a simple weekly rhythm match busy teen schedules.',
		scheduleId: 'week-on-week-off',
	},
	{
		situation: 'Parents live close',
		example: '2-2-3 or 3-4-4-3',
		why: 'Short drives make more frequent exchanges realistic.',
		scheduleId: '223',
	},
	{
		situation: 'High-conflict parents',
		example: '2-2-5-5 with school exchanges',
		why: 'Fewer face-to-face handoffs and predictable exchange times can reduce friction.',
		scheduleId: '2255',
	},
	{
		situation: 'Shift work',
		example: 'Week-on/week-off',
		why: 'Longer blocks align better with rotating work schedules.',
		scheduleId: 'week-on-week-off',
	},
	{
		situation: 'Parents want fewer exchanges',
		example: '5-2-2-5 or week-on/week-off',
		why: 'Both patterns reduce midweek transitions while keeping annual time close to 50/50.',
		scheduleId: '5225',
	},
];

export const faqItems = [
	{
		question: 'What is an example of a 50/50 custody schedule?',
		answer:
			'A common example is 2-2-3: two days with Parent A, two with Parent B, then a three-day block that alternates each week. The cards on this page show how equal overnights look on a two-week mini calendar before you add your dates and parent names.',
	},
	{
		question: 'Can I print a 50/50 custody calendar?',
		answer:
			'Yes. Pick the closest example, customize the start date and parent labels, then print or save a 50/50 custody calendar PDF from the calendar preview.',
	},
	{
		question: 'What are common 50/50 parenting schedule examples?',
		answer:
			'Common 50/50 parenting schedule examples include 2-2-3, 2-2-5-5, 3-4-4-3, 5-2-2-5, and week-on/week-off. Each pattern on this page includes a two-week mini calendar you can copy and customize.',
	},
	{
		question: 'Which 50/50 example has the fewest exchanges?',
		answer:
			'Week-on/week-off usually means about one exchange per week. Among two-week rotations, 2-2-5-5, 5-2-2-5, and 3-4-4-3 typically involve fewer handoffs than 2-2-3—see the ranked comparison table above.',
	},
	{
		question: 'Can I copy one of these examples into a parenting plan?',
		answer:
			'Yes. These examples can be used as a starting point when creating a parenting plan. However, every family\'s needs, court requirements, and state laws may be different. Consider reviewing your final parenting agreement with a qualified family law professional before using it as an official document.',
	},
	{
		question: 'How do holidays change a 50/50 example?',
		answer:
			'Holiday rules usually replace the regular rotation on specific dates. Alternating Thanksgiving, split winter break, or summer blocks can change monthly totals even when the base pattern is 50/50.',
	},
	{
		question: 'Should I use the same 50/50 example all year?',
		answer:
			'Not always. Many families use one regular school-year schedule and a different summer or holiday schedule. For example, a child might follow 2-2-5-5 during school and week-on/week-off during summer if both parents agree and the plan is practical.',
	},
];

export const relatedLinks = [
	{ title: '50/50 Custody Schedule for Toddlers', href: '/50-50-custody-schedule-for-toddlers/', description: 'Routines, transitions, and toddler-friendly equal-time patterns.' },
	{ title: 'Best 50/50 Custody Schedule', href: '/best-50-50-custody-schedule/', description: 'Compare patterns and choose the best 50/50 schedule for your family.' },
	{ title: '50/50 Custody Schedule Hub', href: '/50-50-custody-schedule/', description: 'Compare patterns, definitions, and the main generator.' },
	{ title: '2-2-3 Schedule', href: '/2-2-3-custody-schedule/', description: 'Frequent-contact equal parenting example.' },
	{ title: '2-2-5-5 Schedule', href: '/2-2-5-5-custody-schedule/', description: 'Stable weekday 50/50 example.' },
	{ title: '3-4-4-3 Schedule', href: '/3-4-4-3-custody-schedule/', description: 'Balanced block rotation example.' },
	{ title: '5-2-2-5 Schedule', href: '/5-2-2-5-custody-schedule/', description: 'Five-day block example.' },
	{ title: 'Week-On/Week-Off', href: '/week-on-week-off-custody-schedule/', description: 'Simple weekly 50/50 example.' },
	{ title: 'Custody Schedule Generator', href: '/custody-schedule-generator/', description: 'Customize any example with dates and names.' },
	{ title: 'Custody Calendar Template', href: '/custody-calendar-template/', description: 'Printable monthly calendar format.' },
	{ title: 'Parenting Plan Template', href: '/parenting-plan-template/', description: 'Document exchanges, holidays, and rules.' },
];
