export const scheduleComparisonCards = [
	{
		schedule: '2-2-3',
		href: '/2-2-3-custody-schedule/',
		whyChoose: [
			'Shortest separations—usually two or three days before seeing the other parent again.',
			'Both parents stay in the weekly rhythm when a toddler still needs frequent contact with each caregiver.',
		],
		challenges: [
			'More handoffs mean more packing, nap timing, and goodbye rituals to manage.',
			'A pickup that runs into nap time can turn a workable rotation into a hard bedtime.',
		],
	},
	{
		schedule: '3-4-4-3',
		href: '/3-4-4-3-custody-schedule/',
		whyChoose: [
			'Longer stretches in each home let nap and bedtime routines settle before the next exchange.',
			'Fewer weekly transitions when a toddler already handles three or four nights comfortably.',
		],
		challenges: [
			'Four nights away can still feel long for a younger two-year-old who was fine on shorter blocks.',
			'Parents need to track the two-week cycle so exchanges do not drift off schedule.',
		],
	},
	{
		schedule: '2-2-5-5',
		href: '/2-2-5-5-custody-schedule/',
		whyChoose: [
			'Often a preschool transition pattern—same weekday mornings with each parent once daycare routines matter.',
			'Fewer exchanges when both homes already run stable wake-up and drop-off routines.',
		],
		challenges: [
			'About five days with one parent may be too long for some younger toddlers still building sleep confidence in both homes.',
			'Both parents need to cover homework-era logistics even when the child is still in daycare or preschool.',
		],
	},
	{
		schedule: 'Week-on/week-off',
		href: '/week-on-week-off-custody-schedule/',
		whyChoose: [
			'Rarely a first 50/50 pattern for toddlers—more often considered after a child handles longer blocks well.',
			'One weekly exchange can work when both homes already feel familiar and preschool routines are stable.',
		],
		challenges: [
			'Seven days in one home is a long stretch for many toddlers still learning to trust both caregivers between visits.',
			'Illness, missed naps, or a rough week cannot be reset with a midweek handoff.',
		],
	},
];

export const hardTransitionExample = {
	heading: 'Example: When a Transition Is Hard',
	scenario:
		'A two-year-old melts down during Wednesday exchanges because they missed their afternoon nap at daycare and arrive overtired—clinging, crying, and refusing dinner in the receiving home.',
	response:
		'The fix is not always a new custody schedule. When the pattern repeats on nap-skipped days, parents often experiment first with exchange timing, nap consistency, and handoff routines before changing the rotation.',
	adjustments: [
		'Move Wednesday pickup later or exchange at daycare so the child can finish nap time first',
		'Keep nap windows within 30 minutes in both homes on transition days',
		'Use the same short goodbye ritual—one hug, one phrase about when they will see the other parent',
		'Text nap length, lunch, and mood before handoff so the receiving parent can plan a quiet dinner and early bedtime',
	],
};

export const twoYearOldSection = {
	paragraphs: [
		'At two, many children still need short separations and familiar bedtime faces. A rotation that keeps both parents in the weekly rhythm—without four or five nights away from either home at first—often fits better than copying a schedule that works for a preschooler.',
		'Equal-time rotations with two- or three-day blocks limit how long either parent goes without seeing the child during the week. Once the toddler has slept comfortably in both homes for several months, some families lengthen blocks—not as a first attempt at equal time.',
	],
	workingSigns: [
		'Settles within a normal time after exchanges—not hours of crying most weeks',
		'Sleeps through the night or wakes normally after the first day in each home',
		'Eats and plays in a typical way between handoffs',
	],
	closing:
		'If these signs hold steady for several weeks, keep the rotation consistent before simplifying for adult convenience. When sleep, refusal, or distress worsens over time, see the section below on when to reconsider the schedule.',
};

export const cryingAtExchangeSection = {
	intro:
		'Tears at handoff are common in the first weeks of a 50/50 rotation. Clinging at the door does not automatically mean the schedule is failing—it often means the toddler is leaving a familiar caregiver, a half-finished activity, or a nap that was cut short.',
	patternChecks: [
		'Does the child calm within a reasonable time after arriving—often 15 to 30 minutes once dinner or bath starts?',
		'Do sleep, appetite, and play return to normal between exchanges, not just on non-transition days?',
		'Is distress at goodbye decreasing over several weeks, even if tears still appear?',
	],
	reconsiderNote:
		'When crying lengthens instead of shortening, night waking persists for weeks, or the child repeatedly refuses to enter a home, see “Signs a Different Custody Rhythm May Help” below. Fixing exchange timing or nap consistency may still come before changing block length.',
};

export const firstWeeksExperience = {
	intro:
		'A new equal-time rotation rarely feels smooth on day one. Most toddlers need several weeks of the same exchange times, nap windows, and bedtime routines before the pattern feels predictable to them—not to the parents reading the calendar.',
	phases: [
		{
			heading: 'Week 1',
			body: 'A toddler may cry during a midweek exchange—especially Wednesday when daycare pickup, nap, and handoff stack close together—then calm once they reach the receiving home and follow a familiar bedtime routine. One hard handoff does not predict how month two will feel. Parents often note whether the child eats dinner, falls asleep within the usual window, and wakes in a typical mood the next morning.',
		},
		{
			heading: 'Week 3',
			body: 'Some toddlers begin to anticipate “Mom’s house nights” or “Dad’s house mornings” through repeated meal and bath rituals, even if they cannot describe the rotation. Daycare pickup days may still be harder: a missed nap before exchange can carry into a fussy evening regardless of how well the prior weekend went. Normal at this stage: brief tears at goodbye, full recovery by bedtime, and no new sleep regression lasting more than a night or two after each handoff.',
		},
		{
			heading: 'After 1–2 months',
			body: 'When the rotation stays consistent, many toddlers move between homes with less intensity at the door—they may still want one more hug, but they no longer refuse dinner or fight sleep for hours afterward. They may ask when they will see the other parent, which can be a sign they are tracking the pattern. If distress at handoff is unchanged or worsening after this window, or if daycare reports new nap refusal or drop-off tears tied to custody days, the block length or exchange timing may need review—not necessarily abandonment of 50/50.',
		},
	],
	examplesLinkNote:
		'For calendar layouts of common equal-time patterns, see the <a href="/50-50-custody-schedule-examples/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 schedule examples</a> page—not how adjustment feels week by week.',
};

export const separationAgeGroups = [
	{
		age: '12–24 months',
		focus: 'Familiar faces, regular contact, and tight sleep and feeding routines.',
		detail:
			'A workable 50/50 plan at this age usually keeps separations short, uses familiar caregivers, and repeats the same exchange time and location. Many families use shorter blocks or gradual overnights before committing to a full equal-time rotation.',
		considerations: [
			'Whether the child has slept comfortably in both homes',
			'Wake windows, feeding schedules, and nap timing',
			'How the child settles after each return',
		],
	},
	{
		age: '2–3 years old',
		focus: 'Predictable transitions, bedtime rituals, and growing—but still limited—sense of time.',
		detail:
			'Shorter separations with frequent contact between parents often fit better before a child handles four nights away. See the detailed 2-year-old section below for whether the current schedule is working right now.',
		considerations: [
			'Bedtime and meal routines in both homes',
			'Comfort items that travel between houses',
			'Whether tantrums at handoff follow a pattern or happen every time',
		],
	},
	{
		age: '3–4 years old',
		focus: 'Preschool routines, early friendships, activities, and slightly longer blocks when ready.',
		detail:
			'A full week away from one parent is a long stretch for most toddlers under four. Some families consider longer rotations later—as the child handles three- to five-day blocks without repeated sleep or mood disruption. Preschool drop-off and pickup logistics often matter more than the pattern name.',
		considerations: [
			'Which parent handles which preschool mornings',
			'Activity gear, lunch packing, and pickup timing',
			'Whether the child asks when they will see the other parent',
		],
	},
];

export const transitionTips = [
	{
		title: 'Keep routines similar',
		detail:
			'Match bedtime windows within 30–45 minutes, serve dinner at roughly the same time, and use similar expectations for bath, books, and lights-out. When wake-up, nap, and bedtime stay within a narrow range, a toddler spends less energy relearning what happens next in each home.',
		examples: ['Similar bedtime windows', 'Similar meal schedules', 'Consistent rules for screens, snacks, and wind-down'],
	},
	{
		title: 'Use comfort items',
		detail:
			'Let the same blanket, stuffed animal, or small photo album travel between homes. Duplicate cheap versions of favorites when possible so a forgotten item does not derail an entire bedtime.',
		examples: ['Favorite blanket or lovey', 'Stuffed animal that goes in the diaper bag', 'A photo of both parents for the sleep space'],
	},
	{
		title: 'Make exchanges predictable',
		detail:
			'Use the same pickup location when you can—school or daycare pickup often works better than driveway handoffs. Keep a short goodbye ritual: one book, one hug, a clear “I will see you after nap” or “after two sleeps.”',
		examples: ['Same exchange location each time', 'Same goodbye phrase every handoff', 'Avoid surprising schedule changes on transition days'],
	},
	{
		title: 'Share important information',
		detail:
			'Text nap length, appetite, mood, and any medication before exchange—not after a hard bedtime. When both parents know what kind of day the toddler had, the receiving home can adjust dinner and bedtime instead of guessing.',
		examples: ['Nap start and end times', 'What they ate and whether appetite was low', 'Medications, teething, or mood changes'],
	},
];

export const reconsiderSigns = [
	{
		sign: 'Sleep problems lasting several weeks',
		detail:
			'New night waking, early rising, or fighting bedtime that continues well past the first adjustment period—not one or two rough nights after a single exchange.',
	},
	{
		sign: 'Repeated refusal to enter a home',
		detail:
			'Clinging at the door, hiding, or physical resistance at most handoffs can mean the separation block, exchange location, or timing needs revision—not that co-parenting cannot work.',
	},
	{
		sign: 'Distress that increases instead of improving',
		detail:
			'A toddler who was settling after a few weeks but now melts down longer at each exchange may have outgrown the current block length or need calmer handoffs before a pattern change.',
	},
	{
		sign: 'Daycare or preschool functioning changes',
		detail:
			'Teachers report more tears at drop-off, nap refusal, or regression after custody days—especially when those days cluster after the longest stretch with one parent.',
	},
];

export const commonMistakes = [
	{
		mistake: 'Choosing the schedule with the fewest exchanges instead of the right rhythm',
		detail:
			'A calendar that minimizes parent handoffs can maximize toddler separation stress. Shorter blocks with more exchanges often fit young children better than a simple weekly swap.',
	},
	{
		mistake: 'Scheduling exchanges during nap time',
		detail:
			'A pickup at 1 p.m. when the toddler usually naps until 2:30 often leads to overtired evenings and harder bedtimes—not a failed custody plan, but a fixable timing problem.',
	},
	{
		mistake: 'Changing bedtime rules drastically between homes',
		detail:
			'An 8 p.m. lights-out at one home and a 10 p.m. routine at the other can leave a toddler wired or overtired every transition week regardless of the rotation pattern.',
	},
	{
		mistake: 'Not planning holidays and special events',
		detail:
			'Thanksgiving at one home, birthdays, and vacation weeks need written rules so they do not collide with the regular rotation. Toddlers need extra clarity when the usual pattern pauses.',
	},
];

export const builderFeatures = [
	'Test equal-time rotations with real start dates',
	'Customize exchange days and parent labels for your family',
	'Add holiday and school-break overrides without rebuilding the whole calendar',
	'Print or save a monthly preview to share with your co-parent or caregiver',
];

export const relatedLinks = [
	{
		title: 'Best 50/50 Custody Schedule',
		href: '/best-50-50-custody-schedule/',
		description: 'Decision guide for choosing among common 50/50 parenting patterns.',
	},
	{
		title: '50/50 Schedule Examples',
		href: '/50-50-custody-schedule-examples/',
		description: 'See toddler and preschool scenarios with two-week calendar previews.',
	},
	{
		title: '50/50 Custody Schedule Generator',
		href: '/50-50-custody-schedule/',
		description: 'Test toddler-friendly rotations with real dates and printable previews.',
	},
	{
		title: 'Best Custody Schedule for Toddler',
		href: '/best-custody-schedule-for-toddler/',
		description: 'Compare 50/50, 60/40, and other toddler custody arrangements beyond equal time.',
	},
];

export const broaderToddlerGuideNote =
	'This guide focuses only on equal 50/50 parenting schedules. If you are comparing 50/50, 60/40, and other toddler custody arrangements, see our complete guide to the <a href="/best-custody-schedule-for-toddler/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">best custody schedule for toddlers</a>.';

export const infantHandoffNote =
	'Still caring for an infant? Babies have different 50/50 considerations around feeding, bottles, naps, and gradual transitions. See our guide to the <a href="/50-50-custody-schedule-for-babies/" class="font-semibold text-accent underline decoration-line underline-offset-4 hover:text-primary">50/50 custody schedules for babies</a>.';

export const faqItems = [
	{
		question: 'Can a toddler handle 50/50 custody?',
		answer:
			'Watch whether the child sleeps, eats, and settles normally after exchanges for several weeks—not just the first handoff. Equal time works for some toddlers when separations stay short and both homes are familiar; others need a gradual step-up before a full 50/50 rotation.',
	},
	{
		question: 'My toddler cries at every custody exchange. Is the schedule wrong?',
		answer:
			'Crying at handoff does not automatically mean the schedule is failing. Look at the full pattern: Does the child calm within a reasonable time after arriving? Do sleep, eating, and play return to normal between exchanges? Is distress decreasing over several weeks? When crying lengthens instead of shortening, sleep disruption lasts weeks, or the child repeatedly refuses to enter a home, see the section on signs a different rhythm may help—after trying calmer handoffs and consistent nap timing.',
	},
	{
		question: 'Is week-on/week-off too long for a toddler?',
		answer:
			'It is rarely a starting pattern. Some families try it after a toddler already handles three- to five-day blocks in a shorter rotation. See “How Long Should a Toddler Be Away From Each Parent?” above for how separation length changes by age.',
	},
	{
		question: 'What is a good 50/50 schedule for a 2-year-old?',
		answer:
			'Rotations that limit time away from either parent to about two or three days at a time are a common starting point. See “Is a 50/50 Custody Schedule Good for a 2-Year-Old?” for whether the rotation is working now; see “Signs a Different Custody Rhythm May Help” if problems persist.',
	},
	{
		question: 'How often should toddlers switch homes?',
		answer:
			'Many toddlers do best with two- or three-day blocks and about two to three exchanges per week. If every handoff triggers missed naps or prolonged distress, adjust exchange timing before lengthening blocks—or compare a pattern with fewer weekly handoffs if transitions feel chaotic.',
	},
	{
		question: 'Should toddlers have overnight custody?',
		answer:
			'Overnights can support attachment when the parent is a familiar caregiver and bedtime routines are consistent in that home. They may be harder when the sleep space is new, travel is long, or the toddler has not napped or eaten well before exchange. Some families use daytime blocks or one overnight at a time before expanding to a full 50/50 rotation.',
	},
	{
		question: 'What if my toddler struggles with transitions?',
		answer:
			'Try a fixed goodbye ritual, the same exchange location, a comfort item that travels, and sharing nap and meal notes before handoff. If problems last several weeks or worsen over time, see the section on when to reconsider the schedule—not only when to change handoff habits.',
	},
	{
		question: 'Can a toddler have different routines in two homes?',
		answer:
			'Some differences are normal—one parent bathes first, another reads longer—but core sleep and meal windows should stay close. Wildly different bedtimes or rules confuse toddlers who are still learning what happens next. Align on non-negotiables (bedtime range, nap timing, screen limits) even when minor details differ.',
	},
	{
		question: 'When should a toddler move to a different custody schedule?',
		answer:
			'Review the plan when starting full-day preschool, when a parent moves farther away, when shift work changes, or when distress increases instead of improving over several weeks. A short-block plan that worked at two may still fit at four—or preschool logistics may push the family toward longer weekday blocks.',
	},
];
