export const meta = {
	title: '80/20 Custody Schedule: Examples, Overnights & Calendar',
	description:
		'See how an 80/20 custody schedule works, how many overnights it includes, common calendar examples, and ways the 20% parent can stay involved.',
	datePublished: '2026-06-13',
	dateModified: '2026-06-19',
};

export const hero = {
	headline: '80/20 Custody Schedule',
	opening:
		'An 80/20 custody schedule gives one parent most overnights while the other parent has a smaller but recurring block of parenting time. Parent A might hold about 292 overnights in a 365-day year; Parent B might hold about 73.',
	connection:
		'The harder question is not the math — it is how the lower-time parent stays connected when the child\'s school mornings, homework, and weekday routines live mainly in one home. An 80/20 plan works when recurring overnights, holidays, school breaks, and ordinary contact between visits are written clearly enough that neither parent becomes a visitor or a default babysitter.',
};

export const quickFacts = {
	title: '80/20 Custody at a Glance',
	items: [
		{ label: 'Overnight split', value: 'About 80% / 20% by overnights' },
		{ label: 'Annual estimate', value: 'About 292 / 73 overnights' },
		{ label: 'Typical structure', value: 'Primary home + recurring lower-time blocks' },
		{ label: 'Core challenge', value: 'Keeping the 20% parent involved between overnights' },
	],
};

export const calendarGlance = {
	title: '80/20 Calendar at a Glance',
	weekLabels: ['Week 1 (Parent B weekend)', 'Week 2 (Parent A only)'],
	dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	weeks: [
		['A', 'A', 'A', 'A', 'B', 'B', 'A'],
		['A', 'A', 'A', 'A', 'A', 'A', 'A'],
	],
	notes: [
		'Parent A (primary home) holds most school-night overnights. Parent B has a recurring weekend block — here, Friday and Saturday every other week.',
		'Real 80/20 plans often add holiday blocks, summer weeks, or a midweek dinner. Those extras change annual totals.',
		'Use the generator pattern selector to compare first/third/fifth weekends, long-distance blocks, and added weekday overnights.',
	],
};

export const articleTocItems = [
	{ id: 'calendar-glance', label: '80/20 calendar at a glance' },
	{ id: 'schedule-generator', label: '80/20 calendar generator' },
	{ id: 'what-it-looks-like', label: 'What 80/20 looks like in family life' },
	{ id: 'overnight-count', label: 'How many overnights is 80/20' },
	{ id: 'common-patterns', label: 'Common 80/20 schedule patterns' },
	{ id: 'twenty-percent-parent', label: 'The challenge of being the 20% parent' },
	{ id: 'primary-home-workload', label: 'The primary-home parent\'s workload' },
	{ id: 'vs-other-splits', label: '80/20 vs 70/30, 60/40, and 50/50' },
	{ id: 'when-it-works', label: 'When 80/20 can work well' },
	{ id: 'risks-mistakes', label: 'Risks and mistakes' },
	{ id: 'builder-help', label: 'How CustodyBuilder helps' },
	{ id: 'faq', label: '80/20 FAQ' },
];

export const whatItLooksLike = {
	title: 'What Does an 80/20 Custody Schedule Look Like?',
	intro:
		'Mia is in fourth grade and lives primarily with Parent A during school weeks. Parent B has alternating weekends, one Wednesday dinner each month, five nights of winter break in odd years, and two summer weeks. That mix is 80/20 in practice — not because someone counted to 73 on a spreadsheet first, but because Mia\'s weekday life stays anchored in one home.',
	details: [
		{
			heading: 'School mornings',
			body: 'Parent A handles the 7:15 a.m. alarm, lunch packing, and the car line. Parent B is not guessing whether Mia has gym shoes on a random Tuesday — Parent B sees Mia on scheduled weekends and at Wednesday dinners, and Parent A keeps the weekday backpack stocked.',
		},
		{
			heading: 'Medication and backpacks',
			body: 'Mia\'s inhaler lives in Parent A\'s mudroom bin. Parent B keeps a duplicate spacer and rescue inhaler in the weekend bag so asthma care does not stop when Mia switches houses. The school nurse has both parents on file, but Parent A signs daily medication logs on school nights.',
		},
		{
			heading: 'Games and school events',
			body: 'Parent B attends Thursday soccer even on non-overnight weeks — the plan lists Parent B as the activity contact. Parent A still drives most weekday practices, but Parent B is in the bleachers twice a month and at the spring concert because the calendar shows those dates months ahead.',
		},
		{
			heading: 'Why a visible monthly calendar matters',
			body: 'Mia\'s teacher once scheduled a Friday field trip on Parent B\'s off weekend. A printed month view showed the conflict immediately. Parent B requested a makeup Saturday lunch; Parent A did not have to decode a verbal "every other weekend" rule midweek.',
		},
	],
	close:
		'80/20 is lived on a calendar, not in a percentage label. When parents can see which weekends, breaks, and midweek contacts belong to the lower-time parent, ordinary school life stays stable and the 20% parent stops feeling like a guest who only appears for birthdays.',
};

export const overnightCount = {
	title: 'How Many Overnights Is 80/20 Custody?',
	intro: 'Overnight counts drive the percentage. Daytime visits, phone calls, and school-event attendance matter for connection — but they do not change the split unless an overnight is added.',
	points: [
		{
			label: 'Annual estimate',
			body: 'In a 365-day year, 80/20 is roughly 292 overnights for the primary-home parent and 73 for the lower-time parent. Leap years and custom start dates shift the exact count by a night or two.',
		},
		{
			label: 'Uneven months',
			body: 'March with five weekends can give Parent B three weekend blocks under a first/third/fifth rule, while February might give only one. A single month can look like 70/30 or 85/15 even when the annual average lands near 80/20.',
		},
		{
			label: 'Daytime visits',
			body: 'A Wednesday dinner or Saturday-morning breakfast does not count toward the overnight percentage. Those visits still help the 20% parent stay in the loop — they just are not part of the 292/73 math.',
		},
		{
			label: 'Holidays and summer',
			body: 'Winter break, spring break, and summer weeks add overnights for Parent B. If the regular pattern gives Parent B only two weekends in December, a five-night winter block can restore balance without changing the school-week home.',
		},
	],
	calculatorNote:
		'Use the <a href="/custody-percentage-calculator/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">custody percentage calculator</a> or the generator\'s annual average to check a full year before signing.',
};

export const commonPatterns = {
	title: 'Common 80/20 Schedule Patterns',
	intro:
		'Most 80/20 parenting schedules combine a strong primary-home base with recurring lower-time blocks. The pattern you pick changes how long the child goes between Parent B overnights.',
	patterns: [
		{
			title: 'Every other weekend',
			looksLike: 'Parent B has Friday and Saturday overnights every other weekend; Parent A has all other nights.',
			whenUsed: 'Parents live in the same metro area and want a simple repeating rule.',
			watchFor: 'By overnights alone, alternating weekends often land closer to 85/15 unless holidays or summer add nights. See the <a href="/every-other-weekend-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">every other weekend guide</a> for weekend-only planning — this page covers the broader 80/20 connection question.',
		},
		{
			title: 'First, third, and fifth weekends',
			looksLike: 'Parent B has Fri–Sat on the 1st, 3rd, and 5th weekends of each month.',
			whenUsed: 'Court orders or work schedules that track weekends by month rather than a two-week cycle.',
			watchFor: 'Months without a fifth weekend drop Parent B\'s count. Plan holiday overnights if you need a steadier annual average.',
		},
		{
			title: 'Alternating weekends plus one extra overnight',
			looksLike: 'Parent B has every other weekend plus one Wednesday overnight in the opposite week.',
			whenUsed: 'Families who want midweek contact without giving up a single primary-home school week.',
			watchFor: 'One added school-night overnight can move the split noticeably toward 75/25. Count the full year, not one month.',
		},
		{
			title: 'Long-distance blocks',
			looksLike: 'Parent B has a longer stretch — often one week every five or six weeks — instead of frequent drives.',
			whenUsed: 'Parents live hours apart and cannot swap houses every other Friday.',
			watchFor: 'Long gaps between blocks. Build video calls, school-portal access, and activity attendance on off weeks into the plan.',
		},
		{
			title: 'Summer-heavy 80/20',
			looksLike: 'School year stays primary-home focused; Parent B receives three or four summer weeks plus alternating weekends.',
			whenUsed: 'One parent travels for work during the school year but has summers off.',
			watchFor: 'The child may feel the relationship shift sharply between June and September. Keep at least one recurring school-year touchpoint — a standing Thursday call or monthly school lunch.',
		},
	],
};

export const twentyPercentParent = {
	title: 'The Challenge of Being the 20% Parent',
	intro:
		'About 73 overnights a year can feel like roughly six nights a month — and none of them on a random Tuesday when spelling homework is due. The lower-time parent often misses the ordinary rhythm of school nights while feeling pressure to make every weekend memorable.',
	challenges: [
		{
			problem: 'Feeling like a visitor',
			body: 'Parent B picks up Mia on Friday with a clean apartment and planned outings, but Mia\'s daily habits — where she keeps her retainer, which app she uses for reading logs — live at Parent A\'s house. Without midweek contact, Parent B learns school news on Friday instead of Tuesday.',
		},
		{
			problem: 'Missing homework and school routines',
			body: 'Parent B does not see the slow build of a book report or the permission slip that went home Monday. The fix is not "more fun weekends" — it is Tuesday portal checks, Thursday practice attendance, and a shared activity calendar that shows non-overnight events.',
		},
		{
			problem: 'Pressure to make every weekend special',
			body: 'Parent B plans aquarium tickets and late movies because time feels scarce. Mia sometimes needs boring Sunday laundry and early bedtime to be ready for Parent A\'s Monday car line. Ordinary downtime is parenting too.',
		},
		{
			problem: 'Long gaps between overnights',
			body: 'Three weeks without a sleepover can feel endless to a seven-year-old. A standing Wednesday video call, school lunch once a month, or showing up at the science fair on Parent A\'s week keeps the relationship continuous.',
		},
	],
	solutions: [
		'Attend Thursday soccer on non-overnight weeks — the plan names Parent B as activity contact even when Mia sleeps at Parent A\'s.',
		'Check the school portal on Tuesday so Parent B sees the same newsletter Parent A saw Monday.',
		'Keep duplicate chargers, toiletries, and a spare hoodie at Parent B\'s so Friday pickup is not a logistics scramble.',
		'Schedule a predictable ritual: Saturday pancakes, not a new expensive outing every visit.',
		'Help with spelling by video on Thursday when the test is Friday and Mia is still at Parent A\'s.',
	],
	close:
		'Connection between overnights is the moat of this page. The 20% parent who only appears for highlight-reel weekends drifts out of school life; the 20% parent who shows up at ordinary Thursday practices stays a parent, not a guest.',
};

export const primaryHomeWorkload = {
	title: 'The Primary-Home Parent\'s Workload',
	intro:
		'Parent A in an 80/20 plan often carries school mornings, doctor appointments, homework tracking, daily discipline, carpool, and the emotional labor of being the default call from the nurse\'s office. That load is real — and an 80/20 plan should not pretend Parent B is unavailable eleven months a year.',
	tasks: [
		{
			heading: 'School mornings and transportation',
			body: 'Parent A runs the weekday car line and knows which day is library day. Parent B can still cover sports registration, pay activity fees online, or take the Saturday tournament Parent A cannot attend.',
		},
		{
			heading: 'Homework and discipline',
			body: 'Parent A enforces screen limits on school nights. Parent B reinforces the same rules on weekends instead of becoming the "fun house" by default. The plan can assign Parent B to handle summer reading lists or science-fair supply runs.',
		},
		{
			heading: 'Emotional labor',
			body: 'Parent A fields most teacher emails. Parent B can own replies for assigned subjects — Parent B handles math portal messages; Parent A handles reading — so one inbox does not bury the other parent\'s involvement.',
		},
	],
	sharedDuties: [
		'Parent B registers Mia for spring soccer and pays the league fee.',
		'Parent B buys duplicate school supplies for the weekend bag.',
		'Parent B drives one tournament weekend Parent A cannot cover.',
		'Parent B plans the first week of summer parenting time and books the flights for a long-distance block.',
	],
	close:
		'An 80/20 schedule fails when Parent A becomes the only functional parent and Parent B becomes the entertainment director. Split named responsibilities — registration, supplies, transportation, break planning — so the primary-home parent is not carrying every weekday task alone.',
};

export const vsOtherSplits = {
	title: '80/20 vs 70/30, 60/40, and 50/50',
	intro: 'Pick the split that matches how much school-week responsibility each home can carry — not the label that sounds fairest on paper.',
	rows: [
		{
			split: '80/20',
			href: undefined,
			fits: 'One primary home is needed and the lower-time parent still gets structured recurring time — weekends, breaks, or long-distance blocks.',
		},
		{
			split: '70/30',
			href: '/70-30-custody-schedule/',
			fits: 'The lower-time parent can handle more regular overnights — extra weekends, a weekday night, or longer break blocks — without splitting the school week evenly.',
		},
		{
			split: '60/40',
			href: '/60-40-custody-schedule/',
			fits: 'Both parents can manage substantial weekday responsibility; one parent is only slightly ahead on overnights.',
		},
		{
			split: '50/50',
			href: '/50-50-custody-schedule/',
			fits: 'Both homes can support nearly equal school-week routines, exchanges are practical, and neither parent should anchor all homework and mornings alone.',
		},
	],
	close:
		'Move toward 70/30 when Parent B is ready for more school-night overnights. Stay at 80/20 when the child needs one stable weekday home and Parent B\'s involvement is better built through breaks, activities, and predictable weekend blocks than through midweek exchanges.',
};

export const whenItWorks = {
	title: 'When 80/20 Can Work Well',
	situations: [
		{
			heading: 'Long-distance parents',
			body: 'Parent B lives three hours away. Monthly long blocks plus summer weeks beat exhausted every-other-Friday drives that leave Mia tired for Monday math.',
		},
		{
			heading: 'Demanding or travel-heavy work',
			body: 'Parent B flies out Sunday night and returns Thursday. Alternating weekends plus holiday blocks match when Parent B is actually in town without forcing weekday handoffs that never happen.',
		},
		{
			heading: 'School stability after separation',
			body: 'Mia just changed districts. One home for the first year of attendance — with Parent B at games and on the portal — can matter more than equal overnights during the transition.',
		},
		{
			heading: 'Gradual step-up plans',
			body: 'Parent B starts with alternating weekends and adds a summer week each year as Mia gets older. The written plan lists trigger dates so the step-up is predictable, not negotiated every month.',
		},
		{
			heading: 'Child needing one consistent weekday home',
			body: 'Mia has OT on Tuesdays and Thursdays at Parent A\'s nearby clinic. An 80/20 plan keeps those appointments stable while Parent B builds connection through weekends and school-break time.',
		},
	],
};

export const risksMistakes = {
	title: 'Risks and Mistakes in an 80/20 Custody Schedule',
	intro: 'These problems show up when the plan names a percentage but not responsibilities, breaks, or contact between overnights.',
	problems: [
		{
			problem: 'Weekend parent becomes only the "fun parent"',
			solution:
				'Parent B enforces the same bedtime and homework rules Parent A uses. Parent A sends the spelling list Friday so Parent B is not starting from zero. Ordinary chores on Sunday count as parenting.',
		},
		{
			problem: 'Lower-time parent loses school involvement',
			solution:
				'Add portal access, name Parent B on the activity roster, and assign one school email category to Parent B. Parent B attends the fall conference even on an off weekend.',
		},
		{
			problem: 'Primary parent becomes overloaded',
			solution:
				'List split duties: Parent B pays sports fees; Parent A handles daily transport. Review the split each school year before assuming Parent A will keep absorbing new activities alone.',
		},
		{
			problem: 'Child goes too long without ordinary contact',
			solution:
				'Add a midweek dinner, standing video call, or school-lunch visit. Three weeks without hearing Parent B\'s voice at homework time is long for an eight-year-old.',
		},
		{
			problem: 'Holidays and summer are vague',
			solution:
				'Use the <a href="/holiday-custody-schedule/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">holiday custody schedule</a> planner to assign odd/even years, exchange times, and whether winter break adds nights beyond the regular pattern.',
		},
		{
			problem: 'Makeup time is undefined',
			solution:
				'Write what happens when Parent B\'s weekend is lost to illness or travel: extend the next block, add a school-break day, or swap a specific Friday by written notice five days ahead.',
		},
	],
};

export const builderHelp = {
	title: 'How CustodyBuilder Helps Plan an 80/20 Schedule',
	intro: 'Use the generator to test patterns before you argue about percentages in a mediation session.',
	features: [
		'Preview monthly calendars for alternating weekends, monthly weekend rules, added weekday overnights, and long-distance blocks.',
		'Compare overnight percentages side by side when you change patterns — see when every other weekend is closer to 85/15 than 80/20.',
		'Test start dates so the first Parent B weekend aligns with a real Friday pickup.',
		'Export or print the calendar for parenting-plan discussions, school offices, or coaches who need dates in writing.',
	],
	cta: 'Build an 80/20 Custody Calendar',
};

export const faqItems = [
	{
		question: 'What is an 80/20 custody schedule?',
		answer:
			'An 80/20 custody schedule is an overnight-based parenting arrangement where one parent has about 80% of overnights and the other has about 20%. In practice it usually means a primary-home school week plus recurring blocks — weekends, holidays, or summer weeks — for the lower-time parent.',
	},
	{
		question: 'How many overnights is 80/20 custody?',
		answer:
			'About 292 overnights for the primary-home parent and 73 for the lower-time parent in a 365-day year. The exact count shifts with leap years, start dates, and added holiday or summer overnights.',
	},
	{
		question: 'Is every other weekend really 80/20?',
		answer:
			'Not always by overnights alone. Alternating Fri–Sat weekends often land closer to 85/15 unless you add holiday time, a weekday overnight, or summer weeks. Count the full year rather than assuming the label matches the math.',
	},
	{
		question: 'What are examples of 80/20 custody schedules?',
		answer:
			'Common examples include every other weekend, first/third/fifth weekends, alternating weekends plus one weekday overnight, long-distance block schedules, and school-year primary-home plans with heavier summer time for Parent B.',
	},
	{
		question: 'How can the 20% parent stay involved?',
		answer:
			'Attend practices on non-overnight weeks, use the school portal, keep supplies at both homes, schedule predictable midweek calls, and show up at conferences and school events. Connection between overnights matters as much as the overnight count.',
	},
	{
		question: 'How do holidays affect 80/20 custody?',
		answer:
			'Holiday and school-break overnights usually override the regular pattern and can change the annual percentage. A five-night winter block can balance a month when Parent B had fewer regular weekends.',
	},
	{
		question: 'When should parents consider 70/30 instead of 80/20?',
		answer:
			'Consider 70/30 when the lower-time parent can reliably handle more school-night overnights — extra weekends, a recurring weekday night, or longer break blocks — without disrupting the child\'s primary-home routine.',
	},
	{
		question: 'Can an 80/20 custody schedule change over time?',
		answer:
			'Yes. Step-up plans often start with alternating weekends and add summer weeks or extra overnights as the child ages. Written trigger dates and annual reviews keep changes predictable instead of reactive.',
	},
];
