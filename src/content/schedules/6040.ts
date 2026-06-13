import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '60-40',
	title: '60/40 Custody Schedule',
	slug: '60-40-custody-schedule',
	description: 'Create a 60/40 custody schedule and preview 4-3, extended weekend, and exact 60/40 parenting time calendars.',
	metaTitle: '60/40 Custody Schedule | Examples & Overnight Calculator',
	metaDescription: 'Learn how a 60/40 custody schedule works, see examples, and estimate overnight counts and parenting time percentages.',
	canonicalUrl: 'https://custodybuilder.com/60-40-custody-schedule',
	lede: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. Use this 60/40 parenting schedule tool to compare a 60/40 visitation schedule, preview a 60/40 custody calendar, and understand how a 60/40 child custody arrangement may look in practice.',
	overviewTitle: 'What Is a 60/40 Custody Schedule?',
	overview: [
		'A 60/40 custody schedule is a parenting time arrangement where one parent has a modest majority of overnights while the other parent still has substantial scheduled time. It is a parenting-time target, not one universal calendar pattern.',
		'This calculator lets you compare common 60/40-style arrangements: a 4-3 schedule, an every-extended-weekend schedule, and a mathematically exact 10-day 6/4 cycle. Some common examples are close to 60/40, while the exact 60/40 option is designed to converge to 60/40 over repeating cycles.',
	],
	howItWorks: {
		title: 'How a 60/40 Custody Schedule Works',
		description: [
			'Use the pattern selector in the generator to choose the version you want. The default 4-3 schedule gives Parent A four days and Parent B three days each week, which is commonly grouped with 60/40 schedules even though the exact split is about 57/43.',
			'The extended-weekend option keeps Parent A on weekdays and Parent B on a long weekend. The exact 60/40 option uses a 10-day cycle: Parent A has three nights, Parent B has two, Parent A has three more, and Parent B has two more.',
		],
	},
	pros: [
		'One parent can anchor more school-week routines',
		'The other parent still receives substantial recurring parenting time',
		'Fewer overnights shift compared with some equal-time schedules',
	],
	cons: [
		'The split is not perfectly equal',
		'Weekend balance may need special attention',
		'The lower-time parent may need midweek involvement to stay connected to school routines',
	],
	example: {
		title: 'Example 60/40 Custody Calendar',
		description: 'The default 4-3 example gives Parent A four days and Parent B three days each week. Use the selector in the generator to switch to extended weekend or exact 60/40.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	comparison: {
		title: '60/40 vs 50/50 Custody Schedule',
		description: 'A 60/40 custody schedule gives one parent a small majority of overnights. A 50/50 custody schedule is designed to divide overnights as evenly as possible.',
		rows: [
			{
				schedule: '60/40 custody schedule',
				href: '/60-40-custody-schedule',
				badge: 'Primary focus of this guide',
				bestFor: 'Families needing one primary school-week anchor with substantial time for both parents',
				exchangeFrequency: 'Depends on the chosen 60/40 pattern',
				weekendPattern: 'Can be shared, alternated, or customized',
				notes: 'A useful middle ground between equal time and more traditional visitation.',
			},
			{
				schedule: '50/50 custody schedule',
				href: '/50-50-custody-schedule',
				badge: 'Compare if equal time is realistic',
				bestFor: 'Families who can support a near-even split of overnights',
				exchangeFrequency: 'Varies by 50/50 pattern',
				weekendPattern: 'Usually balances weekends over the full rotation',
				notes: 'Compare options like 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off.',
			},
			{
				schedule: 'Every other weekend custody schedule',
				href: '/every-other-weekend-custody-schedule',
				badge: 'Less parenting time than 60/40',
				bestFor: 'Families where one parent has most overnights',
				exchangeFrequency: 'Usually every other weekend',
				weekendPattern: 'Parent B has Friday and Saturday overnights every other weekend',
				notes: 'Often gives the weekend parent less time than a 60/40 arrangement.',
			},
		],
	},
	decisionGuide: {
		quickAnswer: {
			title: 'Quick Answer',
			description: 'A 60/40 custody schedule is often a practical middle ground when equal time is hard to manage but both parents still need meaningful, predictable time.',
			items: [
				{ label: 'Works well when', title: 'One parent handles more school routines', href: '/custody-schedule-generator' },
				{ label: 'Often helps when', title: 'Parents live farther apart', href: '/custody-calendar-template' },
				{ label: 'Often helps when', title: 'Equal time is difficult to manage', href: '/custody-schedule-generator' },
				{ label: 'Often helps when', title: 'A child benefits from one school-week home', href: '/parenting-time-calculator' },
				{ label: 'Compare first if equal time is realistic', title: '50/50 custody schedule', href: '/50-50-custody-schedule' },
				{ label: 'May not be ideal when', title: 'Parents live close and both want equal time', href: '/50-50-custody-schedule' },
				{ label: 'Compare if one home needs to be more primary', title: '70/30 custody schedule', href: '/70-30-custody-schedule' },
			],
		},
		whenWorksBest: {
			title: 'When 60/40 Works Best',
			rows: [
				{
					situation: 'Parents live 20+ minutes apart',
					why: 'Fewer school-week exchanges can reduce rushed mornings, long drives, and missed activities.',
					watchFor: 'The lower-time parent may need midweek dinner, calls, or activity involvement to stay connected.',
				},
				{
					situation: 'One parent handles school transportation',
					why: 'A 60/40 pattern can let one home anchor homework, backpacks, sleep, and morning routines.',
					watchFor: 'Do not let the school anchor become the only parent handling school communication.',
				},
				{
					situation: 'Work schedules are uneven',
					why: 'The parent with more predictable weekdays can cover more school nights while the other parent still has recurring blocks.',
					watchFor: 'Use written backup rules for late shifts, overtime, call-ins, and travel.',
				},
				{
					situation: 'Child struggles with frequent exchanges',
					why: 'A 60/40 schedule can reduce handoffs compared with some equal-time rotations.',
					watchFor: 'Longer blocks still need predictable contact with both parents.',
				},
				{
					situation: 'School consistency is the priority',
					why: 'One primary school-week home can make homework, attendance, transportation, and supplies easier to manage.',
					watchFor: 'Sports, music, tutoring, and weekend events still need shared planning.',
				},
			],
		},
		whenMayNotFit: {
			title: 'When 60/40 May Not Be the Best Fit',
			rows: [
				{
					situation: 'Parents live very close',
					tradeoff: 'If school and activities are easy from both homes, 60/40 may reduce one parent time without solving a logistics problem.',
					consider: 'Compare a 50/50 schedule before choosing a less equal split.',
				},
				{
					situation: 'Both parents want equal parenting time',
					tradeoff: '60/40 can feel like a compromise, but it may leave one parent feeling sidelined if equal time is practical.',
					consider: 'Test 2-2-5-5, 5-2-2-5, or week-on/week-off in the generator.',
				},
				{
					situation: 'Child strongly prefers equal schedules',
					tradeoff: 'Older children may notice the difference and may want a calendar that feels more balanced.',
					consider: 'Listen to the concern without letting the child carry the decision.',
				},
				{
					situation: 'Both parents have highly flexible schedules',
					tradeoff: 'If both homes can support school, bedtime, and activities, a primary-home structure may not be necessary.',
					consider: 'Compare 50/50 and 60/40 side by side using actual school weeks.',
				},
			],
		},
		ageApproach: {
			title: 'Best 60/40 Custody Schedules by Age',
			description: 'Age does not decide custody by itself, but it changes how a child experiences exchanges, school routines, separation, activities, and time away from each home.',
			rows: [
				{
					age: 'Toddler',
					recommended: 'Short blocks with one steady routine anchor',
					guideHref: '/best-custody-schedule-for-toddler',
					reason: 'Toddlers may need predictable bedtime, naps, and transitions. A 60/40 plan can work if the 40% parent has frequent, calm contact rather than long gaps.',
				},
				{
					age: 'Preschool',
					recommended: '4-3 or extended-weekend style plan',
					reason: 'Preschool children often need routine but can usually handle slightly longer blocks than toddlers if exchanges are predictable.',
				},
				{
					age: '5-7',
					recommended: 'School-week anchor with regular weekend time',
					guideHref: '/best-custody-schedule-for-5-year-old',
					reason: 'Early school years depend heavily on backpacks, lunch, reading logs, bedtime, and morning transportation.',
				},
				{
					age: '8-12',
					recommended: '4-3 or custom activity-aware 60/40',
					guideHref: '/best-custody-schedule-for-7-year-old',
					reason: 'School-age children may handle longer blocks, but homework, sports, friends, and school supplies need clear systems.',
				},
				{
					age: 'Teenager',
					recommended: 'Flexible 60/40 or compare 50/50',
					guideHref: '/best-custody-schedule-for-teenager',
					reason: 'Teenagers may need fewer exchanges around driving, jobs, sports, friends, and exams. Some teens may prefer a more equal calendar if logistics allow it.',
				},
			],
		},
		percentageMatrix: {
			title: 'Compare Common Custody Percentages',
			rows: [
				{
					schedule: '50/50',
					href: '/50-50-custody-schedule',
					badge: 'Equal-time option',
					parentA: 'About 50%',
					parentB: 'About 50%',
					bestFor: 'Parents who can both support school, activities, and transportation',
					stability: 'Balanced if logistics are strong',
					exchangeFrequency: 'Varies by pattern',
				},
				{
					schedule: '60/40',
					href: '/60-40-custody-schedule',
					badge: 'Middle-ground option',
					parentA: 'About 60%',
					parentB: 'About 40%',
					bestFor: 'One school-week anchor with substantial time for both parents',
					stability: 'Strong when school routines need one lead home',
					exchangeFrequency: 'Moderate',
				},
				{
					schedule: '70/30',
					href: '/70-30-custody-schedule',
					badge: 'More stability than 50/50',
					parentA: 'About 70%',
					parentB: 'About 30%',
					bestFor: 'Greater distance, heavier work constraints, or stronger primary-home needs',
					stability: 'High for one-home school routines',
					exchangeFrequency: 'Lower',
				},
				{
					schedule: '80/20',
					href: '/80-20-custody-schedule',
					badge: 'Most primary-home structure',
					parentA: 'About 80%',
					parentB: 'About 20%',
					bestFor: 'Long distance, limited availability, or traditional visitation patterns',
					stability: 'High, but less frequent contact',
					exchangeFrequency: 'Lowest',
				},
			],
		},
		scheduleCards: {
			title: 'Common 60/40 Custody Schedule Examples',
			description: 'These common 60/40-style patterns solve different problems. Compare the pattern, not just the percentage.',
			items: [
				{
					title: '4-3 schedule',
					badge: 'Simple weekly pattern',
					bestFor: 'Families who want a repeating weekly rhythm with one parent having four nights and the other having three.',
					pros: ['Easy to remember', 'Gives both parents weekly overnights', 'Works with many school calendars'],
					watchOutFor: 'It is usually closer to 57/43 than exact 60/40, so check annual overnights.',
					complexity: 'Low',
				},
				{
					title: 'Extended weekend schedule',
					badge: 'Best for long weekends',
					bestFor: 'Families where one parent anchors school weekdays and the other parent has a longer weekend block.',
					pros: ['Fewer school-week handoffs', 'Predictable weekend time', 'Good when homes are not very close'],
					watchOutFor: 'The weekend parent may need planned school involvement so they are not disconnected from weekdays.',
					complexity: 'Low',
				},
				{
					title: 'School-week anchor schedule',
					badge: 'Best for school stability',
					bestFor: 'Children who need consistent school mornings, homework systems, and transportation from one home.',
					pros: ['Protects bedtime and school routines', 'Reduces forgotten school items', 'Helpful when one home is closer to school'],
					watchOutFor: 'It can feel unbalanced if the other parent receives mostly non-school time.',
					complexity: 'Medium',
				},
				{
					title: 'Custom 10-day cycle',
					badge: 'Closest to exact 60/40',
					bestFor: 'Parents who care about a more exact overnight split and can follow a non-weekly repeating cycle.',
					pros: ['Closer to mathematical 60/40', 'Can be tailored around work shifts', 'Useful for custom calendars'],
					watchOutFor: 'It may be harder for children, schools, and activities to remember without a shared calendar.',
					complexity: 'High',
				},
			],
		},
		mistakes: {
			title: 'Common 60/40 Custody Schedule Mistakes',
			items: [
				{
					title: 'Choosing 60/40 only because it sounds fair',
					problem: 'Parents pick the percentage because it feels like a compromise between 50/50 and primary custody.',
					why: 'A fair-sounding split can still fail if it does not match school mornings, transportation, or work schedules.',
					betterApproach: 'Choose 60/40 because it solves a specific logistics problem, then test it on a calendar.',
				},
				{
					title: 'Ignoring commute times',
					problem: 'A 25- to 40-minute drive may look manageable until it happens before school several times a week.',
					why: 'Long commutes can affect sleep, homework, attendance, and activity participation.',
					betterApproach: 'Test morning and evening commute windows, not just distance on a map.',
				},
				{
					title: 'Not testing school mornings',
					problem: 'The schedule looks fine on paper, but one parent cannot reliably handle drop-off, lunch, backpacks, or early start times.',
					why: 'School mornings are where many custody calendars break down first.',
					betterApproach: 'Run the schedule through one real school week before relying on it.',
				},
				{
					title: 'Forgetting holidays and school breaks',
					problem: 'Holiday breaks can disrupt the regular percentage and create arguments about make-up time.',
					why: 'The annual overnight total may change once winter break, spring break, and summer are added.',
					betterApproach: 'Create separate holiday rules with a holiday custody schedule.',
				},
				{
					title: 'Too many exchanges',
					problem: 'Some 60/40 versions accidentally create more handoffs than a child can comfortably manage.',
					why: 'Frequent transitions can create stress even when the overnight percentage seems reasonable.',
					betterApproach: 'Choose fewer, cleaner exchanges if transitions are stressful.',
				},
				{
					title: 'Not planning transportation responsibilities',
					problem: 'One late pickup can affect school, work, and the other parent plan.',
					why: 'Transportation is usually where vague plans become real conflict.',
					betterApproach: 'Write pickup, drop-off, backup driver, and notice expectations into the parenting plan.',
				},
				{
					title: 'Not accounting for sports, lessons, or activities',
					problem: 'Practices, games, uniforms, instruments, tutoring, and travel teams can make a simple calendar hard to follow.',
					why: 'Activities often control weeknight logistics more than custody percentages do.',
					betterApproach: 'Assign who transports, who keeps gear, and how schedule changes are shared.',
				},
				{
					title: 'Assuming older children want the same schedule forever',
					problem: 'A schedule that works at age 7 may not fit high school sports, driving, jobs, or exams.',
					why: 'Children’s needs often change at school transitions, activity changes, and when teenagers start driving.',
					betterApproach: 'Review the schedule at major school transitions and write review points into the parenting plan.',
				},
			],
		},
		betterThanFifty: {
			title: 'When 60/40 Is Better Than 50/50',
			sixtyForty: [
				'Parents live farther apart and school-week driving is wearing on the child.',
				'One parent handles most school transportation or lives closer to school.',
				'Equal exchanges create stress, missed items, or rushed mornings.',
				'Work schedules are uneven and one parent has more reliable school-night availability.',
				'The child needs one consistent school-week home while still spending substantial time with both parents.',
			],
			fiftyFifty: [
				'Both parents live close enough for school and activities.',
				'Both parents can handle school routines, homework, transportation, and bedtime.',
				'The child handles transitions well.',
				'Both parents want equal time and the logistics support it.',
			],
			ctaText: 'Compare 50/50 custody schedules',
		},
		shiftLater: {
			title: 'When 60/40 May Shift Later',
			description: [
				'Some families use 60/40 as a practical starting point and later move toward 50/50, 70/30, or a custom schedule as life changes. That does not mean the original schedule failed. It may simply mean the child, school routine, distance, or parent availability changed.',
				'The safest plans usually name review points instead of relying on vague promises. Parents can decide when to revisit transportation, overnights, activities, and school responsibilities before conflict builds.',
			],
			reviewPoints: [
				'Start of the school year',
				'Child changes schools',
				'Parent work schedule changes',
				'Child starts major activities',
				'Teen begins driving',
			],
			ctaText: 'Create a written 60/40 parenting plan',
		},
		childSupport: {
			title: 'How a 60/40 Custody Schedule May Affect Child Support',
			description: [
				'Custody percentages do not automatically determine child support. A 60/40 parenting schedule may affect the facts parents discuss, but support usually depends on local guidelines and the details of the case.',
				'Factors often include parent income, overnights, parenting time, health insurance, daycare costs, other supported children, and state-specific rules. A 60/40 calendar can help parents understand overnights, but it should not be treated as a legal support calculation by itself.',
			],
			factors: ['Income', 'Overnights', 'Local guidelines', 'Parenting time', 'Health insurance or childcare expenses'],
			ctaText: 'Estimate Texas Child Support',
		},
		decisionSummary: {
			title: 'If You Read Only One Thing',
			description: [
				'A 60/40 custody schedule usually works best when it solves a real logistics problem: school transportation, work schedules, commute distance, activity planning, or transition stress.',
				'It is not automatically better or worse than 50/50. The best schedule is the one parents can follow consistently while protecting the child’s school routine, sleep, activities, and relationship with both parents.',
			],
			primaryCta: {
				text: 'Test this schedule on a calendar',
				href: '/custody-schedule-generator',
			},
			secondaryCta: {
				text: 'Calculate parenting time',
				href: '/parenting-time-calculator',
			},
		},
	},
	examples: {
		title: 'Real 60/40 Custody Schedule Scenarios',
		description: 'These examples show why families choose different 60/40 patterns. The goal is to match the calendar to the child, school routine, distance, activities, and parent work realities.',
		items: [
			{
				title: 'School-age child with one school-week anchor',
				description: 'A school-age child has homework, a reading log, and one parent who lives near school.',
				familySituation: 'Parent A lives near school and handles most weekday mornings. Parent B lives close enough for weekends and one midweek dinner.',
				scheduleUsed: '60/40 with school-week anchor',
				whyItWorks: 'It reduces stressful school mornings while Parent B still has substantial recurring time.',
				potentialIssue: 'Parent B needs school updates and activity involvement, not only weekend time.',
			},
			{
				title: 'Teen athlete with practices',
				description: 'A teenager has practices three nights a week and weekend tournaments.',
				familySituation: 'Both parents support the sport, but one home is closer to school and practice.',
				scheduleUsed: '60/40 or flexible 50/50 depending on transportation',
				whyItWorks: 'Activities may matter more than exact percentages when practices, games, and gear drive the week.',
				potentialIssue: 'The teen may need more flexibility around driving, games, exams, and social events.',
			},
			{
				title: 'Rotating nursing or firefighter shifts',
				description: 'One parent works rotating healthcare or 24-hour emergency shifts and cannot guarantee the same nights every week.',
				familySituation: 'The other parent has predictable school-day availability.',
				scheduleUsed: 'Custom 60/40',
				whyItWorks: 'The calendar can keep school stable while preserving blocks around the nurse schedule.',
				potentialIssue: 'The plan needs backup care, notice rules, and a way to handle shift changes.',
			},
			{
				title: 'Parents 35-45 minutes apart',
				description: 'Both parents are involved, but school-day driving is starting to wear on the child.',
				familySituation: 'The commute is realistic on weekends but stressful before school.',
				scheduleUsed: '60/40 with fewer exchanges',
				whyItWorks: 'It protects school-night consistency while keeping meaningful blocks with both parents.',
				potentialIssue: 'The lower-time parent may need planned school involvement or midweek contact.',
			},
			{
				title: 'Child struggles with frequent transitions',
				description: 'The child does well in both homes but becomes anxious or tired when exchanges happen too often.',
				familySituation: 'Both parents are capable, but frequent switches lead to missed items and emotional reset time.',
				scheduleUsed: '60/40 or longer blocks',
				whyItWorks: 'Fewer exchanges may reduce stress while preserving regular time with both parents.',
				potentialIssue: 'Longer blocks should still include predictable contact with the other parent.',
			},
		],
	},
	faq: [
		{
			question: 'What is a 60/40 custody schedule?',
			answer: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. It is often used when one parent anchors more school routines, transportation, or weekday structure while the other parent still has substantial scheduled time. Common versions include 4-3, extended weekend, and exact 10-day patterns. The practical question is not only whether the percentage looks fair. Parents should ask whether the child can get to school, complete homework, attend activities, sleep consistently, and stay connected to both homes. If both homes are close and both parents can handle school routines, a 50/50 custody schedule may be worth comparing. If distance or work schedules are more challenging, 70/30 may also be worth reviewing.',
			answerHtml: 'A 60/40 custody schedule gives one parent about 60% of overnights and the other parent about 40%. It is often used when one parent anchors more school routines, transportation, or weekday structure while the other parent still has substantial scheduled time. Common versions include 4-3, extended weekend, and exact 10-day patterns. The practical question is not only whether the percentage looks fair. Parents should ask whether the child can get to school, complete homework, attend activities, sleep consistently, and stay connected to both homes. If both homes are close and both parents can handle school routines, a <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50 custody schedule</a> may be worth comparing. If distance or work schedules are more challenging, <a href="/70-30-custody-schedule" class="text-accent hover:underline">70/30</a> may also be worth reviewing.',
		},
		{
			question: 'How many overnights is 60/40 custody?',
			answer: 'A true 60/40 split is about 219 overnights for one parent and 146 overnights for the other parent in a 365-day year. In practice, many schedules called 60/40 are approximate. A 4-3 weekly schedule is closer to 57/43 because one parent has four nights and the other has three each week. An exact 60/40 pattern may use a 10-day cycle where one parent has six nights and the other has four. Holidays, school breaks, summer schedules, and make-up time can also change the annual total. Use a custody percentage calculator or parenting time calculator to check the real overnight count instead of relying only on the schedule label.',
			answerHtml: 'A true 60/40 split is about 219 overnights for one parent and 146 overnights for the other parent in a 365-day year. In practice, many schedules called 60/40 are approximate. A 4-3 weekly schedule is closer to 57/43 because one parent has four nights and the other has three each week. An exact 60/40 pattern may use a 10-day cycle where one parent has six nights and the other has four. Holidays, school breaks, summer schedules, and make-up time can also change the annual total. Use a <a href="/custody-percentage-calculator" class="text-accent hover:underline">custody percentage calculator</a> or <a href="/parenting-time-calculator" class="text-accent hover:underline">parenting time calculator</a> to check the real overnight count instead of relying only on the schedule label.',
		},
		{
			question: 'Is 60/40 better than 50/50?',
			answer: '60/40 is not automatically better than 50/50. It may be better when equal time creates school problems, long drives, missed activities, unstable homework routines, or too many stressful exchanges. For example, if one parent lives closer to school and the other parent is 30 minutes away, 60/40 may protect school mornings while still giving both parents meaningful time. But if both parents live close, both can handle school routines, and the child does well with transitions, 50/50 may be worth comparing first. The tradeoff is balance versus consistency. The best choice is usually the schedule the family can follow reliably, not simply the one that looks most equal.',
			answerHtml: '60/40 is not automatically better than <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50</a>. It may be better when equal time creates school problems, long drives, missed activities, unstable homework routines, or too many stressful exchanges. For example, if one parent lives closer to school and the other parent is 30 minutes away, 60/40 may protect school mornings while still giving both parents meaningful time. But if both parents live close, both can handle school routines, and the child does well with transitions, 50/50 may be worth comparing first. The tradeoff is balance versus consistency. The best choice is usually the schedule the family can follow reliably, not simply the one that looks most equal.',
		},
		{
			question: 'What does a 60/40 custody calendar look like?',
			answer: 'A 60/40 custody calendar may look like a 4-3 weekly schedule, an extended-weekend plan, or a custom repeating pattern. In a 4-3 version, one parent may have Monday through Thursday and the other parent may have Friday through Sunday. In an extended-weekend version, one home anchors the school week while the other parent has a long weekend block. An exact 60/40 version may use a 10-day cycle. The right calendar depends on school, commute time, work schedules, and activities. Before choosing, look at one real school week and one real weekend. A printable custody calendar template can help parents see exchanges, holidays, and activity conflicts before the schedule becomes stressful.',
			answerHtml: 'A 60/40 custody calendar may look like a 4-3 weekly schedule, an extended-weekend plan, or a custom repeating pattern. In a 4-3 version, one parent may have Monday through Thursday and the other parent may have Friday through Sunday. In an extended-weekend version, one home anchors the school week while the other parent has a long weekend block. An exact 60/40 version may use a 10-day cycle. The right calendar depends on school, commute time, work schedules, and activities. Before choosing, look at one real school week and one real weekend. A printable <a href="/custody-calendar-template" class="text-accent hover:underline">custody calendar template</a> can help parents see exchanges, holidays, and activity conflicts before the schedule becomes stressful.',
		},
		{
			question: 'Can a 60/40 schedule affect child support?',
			answer: 'A 60/40 schedule can be relevant to child support discussions, but custody percentages do not automatically determine support. Child support often depends on income, overnights, local guidelines, health insurance, childcare costs, other supported children, and the specific rules in the state or court involved. A 60/40 schedule may show that both parents have meaningful parenting time, but it is not a legal calculation by itself. For example, two families with the same overnight split may have different support outcomes because their incomes and expenses are different. Use the calendar to understand parenting time, then use a state-specific calculator or local guidance for support questions.',
			answerHtml: 'A 60/40 schedule can be relevant to child support discussions, but custody percentages do not automatically determine support. Child support often depends on income, overnights, local guidelines, health insurance, childcare costs, other supported children, and the specific rules in the state or court involved. A 60/40 schedule may show that both parents have meaningful parenting time, but it is not a legal calculation by itself. For example, two families with the same overnight split may have different support outcomes because their incomes and expenses are different. Use the calendar to understand parenting time, then use a state-specific calculator such as the <a href="/texas-child-support-calculator" class="text-accent hover:underline">Texas child support calculator</a> or local guidance for support questions.',
		},
		{
			question: 'What age is best for a 60/40 custody schedule?',
			answer: 'There is no single best age for a 60/40 custody schedule. It can work for toddlers, school-age children, and teenagers when the pattern fits the child needs. For toddlers, parents should watch separation length, naps, bedtime, and transition stress. For 5- to 7-year-olds, school routines, backpacks, and consistent mornings matter. For older children, activities, homework, friends, and transportation become more important. Teenagers may need flexibility around driving, jobs, sports, and social plans. A 60/40 schedule often works best when one home needs to anchor school routines but the other parent can still maintain predictable, meaningful time. Compare age-specific guidance before choosing.',
			answerHtml: 'There is no single best age for a 60/40 custody schedule. It can work for toddlers, school-age children, and teenagers when the pattern fits the child needs. For toddlers, parents should watch separation length, naps, bedtime, and transition stress. For 5- to 7-year-olds, school routines, backpacks, and consistent mornings matter. For older children, activities, homework, friends, and transportation become more important. Teenagers may need flexibility around driving, jobs, sports, and social plans. A 60/40 schedule often works best when one home needs to anchor school routines but the other parent can still maintain predictable, meaningful time. Compare guidance for <a href="/best-custody-schedule-for-toddler" class="text-accent hover:underline">toddlers</a>, <a href="/best-custody-schedule-for-7-year-old" class="text-accent hover:underline">school-age children</a>, and <a href="/best-custody-schedule-for-teenager" class="text-accent hover:underline">teenagers</a> before choosing.',
		},
		{
			question: 'How often do children switch homes in a 60/40 arrangement?',
			answer: 'The number of switches depends on the 60/40 pattern. A 4-3 schedule usually has one main exchange each week if one parent has four days and the other has three. Some versions may include a midweek dinner, school pickup, or extra overnight, which increases transitions. An extended-weekend version may have fewer school-week handoffs because one home anchors weekdays and the other has a long weekend. More exchanges can help a child see both parents frequently, but they can also create stress if the child struggles with transitions or if parents live far apart. Parents should count exchanges, not just overnights, before choosing a schedule.',
		},
		{
			question: 'Is 60/40 custody considered joint custody?',
			answer: 'A 60/40 custody schedule can be part of a joint custody or shared parenting arrangement, but legal terms vary by location and by court order. The schedule describes parenting time, not necessarily legal decision-making. For example, parents may share major decisions about school and medical care even if one parent has about 60% of overnights. In another case, the parenting-time split and decision-making rules may be handled differently. The practical takeaway is to separate the calendar from legal labels. A 60/40 calendar can show substantial time for both parents, but parents should still write down decision-making, communication, transportation, holidays, and expense rules in a parenting plan.',
			answerHtml: 'A 60/40 custody schedule can be part of a joint custody or shared parenting arrangement, but legal terms vary by location and by court order. The schedule describes parenting time, not necessarily legal decision-making. For example, parents may share major decisions about school and medical care even if one parent has about 60% of overnights. In another case, the parenting-time split and decision-making rules may be handled differently. The practical takeaway is to separate the calendar from legal labels. A 60/40 calendar can show substantial time for both parents, but parents should still write down decision-making, communication, transportation, holidays, and expense rules in a <a href="/parenting-plan-template" class="text-accent hover:underline">parenting plan</a>.',
		},
		{
			question: 'What is the easiest 60/40 schedule to follow?',
			answer: 'The easiest 60/40 schedule to follow is usually a simple 4-3 weekly pattern or an extended-weekend pattern. A 4-3 schedule repeats every week, so parents and children can remember the rhythm. An extended-weekend schedule can be easier for school-age children because one home anchors school nights while the other parent has a consistent long weekend. The tradeoff is accuracy and balance. A simple 4-3 schedule is often closer to 57/43 than exact 60/40, and an extended-weekend plan may leave one parent less involved in ordinary school routines. The easiest schedule is not always the best one. The best choice is the schedule that parents can follow without missed pickups, rushed mornings, or constant changes.',
		},
		{
			question: 'Can 60/40 custody work with alternating weekends?',
			answer: 'Yes, 60/40 custody can work with alternating weekends, but the weekday structure matters. Some families use a school-week anchor where one parent handles more weekdays and weekends rotate or include longer blocks for the other parent. Others use a 4-3 rhythm that creates regular weekend time but may not alternate weekends evenly in the way parents expect. The benefit of alternating weekends is that both parents can have ordinary weekend time, not just weekday responsibilities. The drawback is that the schedule can become harder to calculate once holidays, school breaks, activities, and make-up time are added. Parents should test the annual calendar and use a custody percentage calculator to confirm overnights.',
			answerHtml: 'Yes, 60/40 custody can work with alternating weekends, but the weekday structure matters. Some families use a school-week anchor where one parent handles more weekdays and weekends rotate or include longer blocks for the other parent. Others use a 4-3 rhythm that creates regular weekend time but may not alternate weekends evenly in the way parents expect. The benefit of alternating weekends is that both parents can have ordinary weekend time, not just weekday responsibilities. The drawback is that the schedule can become harder to calculate once holidays, school breaks, activities, and make-up time are added. Parents should test the annual calendar and use a <a href="/custody-percentage-calculator" class="text-accent hover:underline">custody percentage calculator</a> to confirm overnights.',
		},
		{
			question: 'Is 60/40 better for school-age children?',
			answer: '60/40 can be a strong fit for school-age children when it protects school routines. For example, if one parent lives close to school and reliably handles morning transportation, homework, lunch, and bedtime, a 60/40 school-week anchor may reduce stress. It can also help when parents live far enough apart that equal school-week exchanges would be tiring. But 60/40 is not automatically better for every school-age child. If both parents live close, both can support school routines, and the child handles transitions well, 50/50 may be practical. The decision should come from the child’s real week: school mornings, homework, activities, sleep, and transportation.',
			answerHtml: '60/40 can be a strong fit for school-age children when it protects school routines. For example, if one parent lives close to school and reliably handles morning transportation, homework, lunch, and bedtime, a 60/40 school-week anchor may reduce stress. It can also help when parents live far enough apart that equal school-week exchanges would be tiring. But 60/40 is not automatically better for every school-age child. If both parents live close, both can support school routines, and the child handles transitions well, <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50</a> may be practical. The decision should come from the child’s real week: school mornings, homework, activities, sleep, and transportation.',
		},
		{
			question: 'How do holidays work in a 60/40 custody schedule?',
			answer: 'Holiday parenting time usually overrides the regular 60/40 custody schedule. Parents often alternate major holidays, split winter break, divide spring break, or create special rules for birthdays, Mother’s Day, Father’s Day, and summer. This matters because holidays can change the annual overnight percentage. For example, a parent with 40% during the school year may receive a longer summer block, which changes the yearly total. The practical fix is to write holiday rules separately from the regular weekly pattern and then test the full year on a calendar. A holiday custody schedule can reduce arguments about whether the normal 60/40 rotation controls.',
			answerHtml: 'Holiday parenting time usually overrides the regular 60/40 custody schedule. Parents often alternate major holidays, split winter break, divide spring break, or create special rules for birthdays, Mother’s Day, Father’s Day, and summer. This matters because holidays can change the annual overnight percentage. For example, a parent with 40% during the school year may receive a longer summer block, which changes the yearly total. The practical fix is to write holiday rules separately from the regular weekly pattern and then test the full year on a calendar. A <a href="/holiday-custody-schedule" class="text-accent hover:underline">holiday custody schedule</a> can reduce arguments about whether the normal 60/40 rotation controls.',
		},
		{
			question: 'Can a 60/40 schedule become a 50/50 schedule later?',
			answer: 'Yes, a 60/40 schedule can become a 50/50 schedule later if the parents agree, the child needs change, or a court order allows modification. Families sometimes start with 60/40 when a child is younger, when school logistics are difficult, or when work schedules are uneven. Later, if parents move closer, work schedules stabilize, or the child becomes more independent, 50/50 may become more realistic. The important point is to avoid vague promises. If parents expect to review the schedule later, they should write down when the review happens, what factors matter, and how changes will be handled. A parenting plan can include review points tied to school transitions, relocation, or activity changes.',
			answerHtml: 'Yes, a 60/40 schedule can become a <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50 schedule</a> later if the parents agree, the child needs change, or a court order allows modification. Families sometimes start with 60/40 when a child is younger, when school logistics are difficult, or when work schedules are uneven. Later, if parents move closer, work schedules stabilize, or the child becomes more independent, 50/50 may become more realistic. The important point is to avoid vague promises. If parents expect to review the schedule later, they should write down when the review happens, what factors matter, and how changes will be handled. A parenting plan can include review points tied to school transitions, relocation, or activity changes.',
		},
		{
			question: 'What is the difference between 60/40 and 70/30 custody?',
			answer: 'The difference between 60/40 and 70/30 custody is the amount of time each parent receives and the level of primary-home structure. A 60/40 schedule gives the lower-time parent substantial recurring time and can feel like a middle ground between equal time and a more primary residence. A 70/30 schedule gives one parent a stronger majority of overnights and may work better when distance, work schedules, transportation, or school routines make 60/40 hard to follow. The tradeoff is contact. 70/30 may create more stability for school logistics, but it usually gives the other parent less ordinary weekday time. Families should compare both calendars with real commute times, school mornings, activities, and holidays.',
			answerHtml: 'The difference between 60/40 and <a href="/70-30-custody-schedule" class="text-accent hover:underline">70/30 custody</a> is the amount of time each parent receives and the level of primary-home structure. A 60/40 schedule gives the lower-time parent substantial recurring time and can feel like a middle ground between equal time and a more primary residence. A 70/30 schedule gives one parent a stronger majority of overnights and may work better when distance, work schedules, transportation, or school routines make 60/40 hard to follow. The tradeoff is contact. 70/30 may create more stability for school logistics, but it usually gives the other parent less ordinary weekday time. Families should compare both calendars with real commute times, school mornings, activities, and holidays.',
		},
		{
			question: 'Can parents customize a 60/40 custody schedule?',
			answer: 'Yes. Parents can customize a 60/40 custody schedule by choosing a 4-3, extended-weekend, or exact 60/40 pattern, then adjusting exchange times, holidays, summer parenting time, transportation, and activity responsibilities. Customizing is often necessary when a parent works rotating shifts, travels, lives farther from school, or has activity transportation conflicts. The risk is that custom schedules can become vague. A good custom plan should still answer practical questions: who drives, when exchanges happen, where school items go, how much notice is required for changes, and how holidays override the normal calendar. After making changes, parents should calculate overnights again because small adjustments can change the annual percentage.',
			answerHtml: 'Yes. Parents can customize a 60/40 custody schedule by choosing a 4-3, extended-weekend, or exact 60/40 pattern, then adjusting exchange times, holidays, summer parenting time, transportation, and activity responsibilities. Customizing is often necessary when a parent works rotating shifts, travels, lives farther from school, or has activity transportation conflicts. The risk is that custom schedules can become vague. A good custom plan should still answer practical questions: who drives, when exchanges happen, where school items go, how much notice is required for changes, and how holidays override the normal calendar. After making changes, parents should calculate overnights again because small adjustments can change the annual percentage.',
		},
	],
	relatedSchedules: [
		'50-50-custody-schedule',
		'every-other-weekend-custody-schedule',
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Test this 60/40 schedule on a calendar',
			slug: 'custody-schedule-generator',
			description: 'Preview 4-3, extended weekend, and custom 60/40 patterns with real dates.',
		},
		{
			title: 'Calculate 60/40 parenting time',
			slug: 'custody-percentage-calculator',
			description: 'Estimate whether your 60/40 pattern is close to the intended overnight split.',
		},
		{
			title: 'Create a written 60/40 parenting plan',
			slug: 'parenting-plan-template',
			description: 'Document exchanges, transportation, holidays, school breaks, and backup-care rules.',
		},
		{
			title: 'Build a 60/40 calendar template',
			slug: 'custody-calendar-template',
			description: 'Turn a 60/40 schedule into a printable calendar with exchanges, holidays, and school breaks.',
		},
	],
	relatedHeading: 'Related custody schedules',
	relatedLinks: [
		{
			title: '50/50 Custody Schedule',
			slug: '50-50-custody-schedule',
			description: 'Compare 60/40 custody with equal parenting time schedules.',
		},
		{
			title: 'Every Other Weekend Custody Schedule',
			slug: 'every-other-weekend-custody-schedule',
			description: 'Compare 60/40 custody with an alternating weekend visitation schedule.',
		},
		{
			title: '2-2-3 Custody Schedule',
			slug: '2-2-3-custody-schedule',
			description: 'Review a frequent-contact shared custody schedule.',
		},
		{
			title: '2-2-5-5 Custody Schedule',
			slug: '2-2-5-5-custody-schedule',
			description: 'Compare stable weekdays and alternating longer blocks.',
		},
		{
			title: '70/30 Custody Schedule',
			slug: '70-30-custody-schedule',
			description: 'Compare 60/40 custody with a larger majority-time parenting schedule.',
		},
		{
			title: '80/20 Custody Schedule',
			slug: '80-20-custody-schedule',
			description: 'Review a more primary-parent custody schedule with limited secondary-parent overnights.',
		},
	],
};

export default schedule;
