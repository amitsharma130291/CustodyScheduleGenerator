import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: '223',
	title: '50/50 Custody Schedule',
	slug: '50-50-custody-schedule',
	description: 'Compare 50/50 custody schedule options and preview an equal parenting time calendar.',
	metaTitle: '50/50 Custody Schedule | Best Examples & Parenting Time',
	metaDescription: 'Compare common 50/50 custody schedules, including 2-2-5-5, 5-2-2-5, 2-2-3, and week-on/week-off arrangements.',
	canonicalUrl: 'https://custodybuilder.com/50-50-custody-schedule',
	lede: 'A 50/50 custody schedule gives both parents roughly equal parenting time across the repeating schedule. Common 50/50 parenting schedules include 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, and week-on/week-off rotations.',
	overview: [
		'A 50/50 custody schedule is a shared parenting schedule designed to divide overnights as evenly as possible between both parents. The schedule may not be perfectly equal every individual month, but the repeating cycle should balance parenting time over time.',
		'There is no single best 50/50 custody schedule for every family. The right option depends on the child’s age, school routine, distance between homes, exchange logistics, weekend balance, and how well parents can coordinate transitions.',
	],
	pros: [
		'Both parents stay closely involved in routines',
		'Parenting time balances over the full rotation',
		'Multiple schedule patterns can fit different ages and logistics',
	],
	cons: [
		'Equal time does not automatically mean equal convenience',
		'Some shared parenting schedules require frequent exchanges',
		'Distance between homes can make certain 50/50 schedules difficult',
	],
	example: {
		title: 'Example: 2-2-3 50/50 Custody Schedule',
		description: 'The 2-2-3 pattern below is one example of a 50/50 custody arrangement. It gives each parent seven overnights across two weeks while alternating the three-day weekend block.',
		weeks: [
			{
				label: 'Week 1',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue' },
					{ parent: 'Parent B', days: 'Wed Thu' },
					{ parent: 'Parent A', days: 'Fri Sat Sun' },
				],
			},
			{
				label: 'Week 2',
				blocks: [
					{ parent: 'Parent B', days: 'Mon Tue' },
					{ parent: 'Parent A', days: 'Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
		],
	},
	comparison: {
		title: 'Compare Common 50/50 Custody Schedules',
		description: 'Use this table to compare common equal parenting time schedules by exchange frequency, weekend pattern, and the situations they tend to fit best.',
		rows: [
			{
				schedule: '2-2-3',
				href: '/2-2-3-custody-schedule',
				bestFor: 'Younger children who benefit from frequent contact',
				exchangeFrequency: 'Frequent exchanges',
				weekendPattern: 'Alternating three-day weekends',
				notes: 'Balanced and common, but requires more coordination.',
			},
			{
				schedule: '2-2-5-5',
				href: '/2-2-5-5-custody-schedule',
				bestFor: 'Families who want stable weekdays',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Alternating five-day blocks',
				notes: 'Each parent can keep the same two weekdays.',
			},
			{
				schedule: '5-2-2-5',
				href: '/5-2-2-5-custody-schedule',
				bestFor: 'Longer blocks with predictable exchanges',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Alternating five-day blocks',
				notes: 'Fewer transitions than 2-2-3 with balanced time.',
			},
			{
				schedule: '3-4-4-3',
				href: '/3-4-4-3-custody-schedule',
				bestFor: 'Families wanting three- and four-day blocks',
				exchangeFrequency: 'Moderate exchanges',
				weekendPattern: 'Balanced across two weeks',
				notes: 'Can feel clearer when viewed on a calendar.',
			},
			{
				schedule: 'Week-on/week-off',
				href: '/week-on-week-off-custody-schedule',
				bestFor: 'Older children and fewer exchanges',
				exchangeFrequency: 'Weekly exchanges',
				weekendPattern: 'Full alternating weeks',
				notes: 'Simple, but seven days apart may be long for younger children.',
			},
		],
		cta: {
			title: 'Which 50/50 schedule is right for you?',
			links: [
				{
					title: '2-2-3 Custody Schedule',
					slug: '2-2-3-custody-schedule',
					description: 'Best when younger children benefit from frequent contact with both parents.',
				},
				{
					title: '2-2-5-5 Custody Schedule',
					slug: '2-2-5-5-custody-schedule',
					description: 'Useful when parents want stable weekdays plus alternating longer weekend blocks.',
				},
				{
					title: '5-2-2-5 Custody Schedule',
					slug: '5-2-2-5-custody-schedule',
					description: 'A strong option for longer parenting blocks with fewer exchanges than 2-2-3.',
				},
				{
					title: 'Week-On/Week-Off Custody Schedule',
					slug: 'week-on-week-off-custody-schedule',
					description: 'Simple weekly rotation that often works best for older children and teens.',
				},
			],
		},
	},
	decisionGuide: {
		quickAnswer: {
			title: 'Quick answer',
			description: 'These are starting points, not legal recommendations. Use them to decide which schedule to compare first.',
			items: [
				{ label: 'Best overall for school-age children', title: '2-2-5-5', href: '/2-2-5-5-custody-schedule' },
				{ label: 'Best for teenagers', title: 'Week-on/week-off', href: '/week-on-week-off-custody-schedule' },
				{ label: 'Best for younger children', title: '2-2-3', href: '/2-2-3-custody-schedule' },
				{ label: 'Best for predictable weekdays', title: '5-2-2-5', href: '/5-2-2-5-custody-schedule' },
				{ label: 'Best when work schedules vary', title: 'Custom schedule', href: '/custody-schedule-generator' },
			],
		},
		bestOverall: {
			title: 'Best 50/50 Custody Schedule for Most Families',
			description:
				'There is no universally best 50/50 custody schedule. The best option depends on the child’s age, distance between homes, school routine, activities, and parent work schedules. For many families, the strongest starting point is the schedule that gives both parents meaningful time while keeping weekdays and exchanges predictable.',
			items: [
				{
					rank: '#1',
					title: '2-2-5-5',
					href: '/2-2-5-5-custody-schedule',
					reasons: [
						'Predictable weekdays',
						'Balanced parenting time',
						'Good fit for many school-age children',
						'Fewer disruptive transitions than 2-2-3',
					],
				},
				{
					rank: '#2',
					title: '5-2-2-5',
					href: '/5-2-2-5-custody-schedule',
					reasons: [
						'Stable weekday routines',
						'Easy to remember',
						'Longer blocks with equal time',
						'Helpful when activities need consistent weekday planning',
					],
				},
				{
					rank: '#3',
					title: 'Week-On Week-Off',
					href: '/week-on-week-off-custody-schedule',
					reasons: [
						'Ideal for many older children and teenagers',
						'Fewer exchanges',
						'Simple calendar',
						'Works when both homes can support school and activities for a full week',
					],
				},
				{
					rank: '#4',
					title: '2-2-3',
					href: '/2-2-3-custody-schedule',
					reasons: [
						'Useful for younger children',
						'Frequent contact with both parents',
						'Alternating weekends',
						'Best when homes are close and transitions are calm',
					],
				},
			],
		},
		masterMatrix: {
			title: 'Compare 50/50 Custody Schedules at a Glance',
			rows: [
				{
					schedule: '2-2-3',
					href: '/2-2-3-custody-schedule',
					bestAgeFit: 'Younger children',
					exchanges: 'Frequent',
					schoolStability: 'Medium',
					easeToFollow: 'Medium',
					bestFor: 'Frequent parent contact and alternating weekends',
					watchOutFor: 'More handoffs and more transition stress',
				},
				{
					schedule: '2-2-5-5',
					href: '/2-2-5-5-custody-schedule',
					bestAgeFit: 'School-age children',
					exchanges: 'Moderate',
					schoolStability: 'High',
					easeToFollow: 'High',
					bestFor: 'Predictable weekdays and balanced weekends',
					watchOutFor: 'Five-day blocks may feel long for some younger children',
				},
				{
					schedule: '5-2-2-5',
					href: '/5-2-2-5-custody-schedule',
					bestAgeFit: 'School-age children and preteens',
					exchanges: 'Moderate',
					schoolStability: 'High',
					easeToFollow: 'High',
					bestFor: 'Longer blocks with consistent weekday rhythm',
					watchOutFor: 'Both homes must track school and activity items well',
				},
				{
					schedule: '3-4-4-3',
					href: '/3-4-4-3-custody-schedule',
					bestAgeFit: 'Flexible school-age families',
					exchanges: 'Moderate',
					schoolStability: 'Medium',
					easeToFollow: 'Medium',
					bestFor: 'Families who prefer three- and four-day blocks',
					watchOutFor: 'Can be harder to understand without a calendar',
				},
				{
					schedule: 'Week-on/week-off',
					href: '/week-on-week-off-custody-schedule',
					bestAgeFit: 'Older children and teenagers',
					exchanges: 'Low',
					schoolStability: 'High',
					easeToFollow: 'Very high',
					bestFor: 'Fewer exchanges and simple weekly planning',
					watchOutFor: 'A full week away may be too long for some children',
				},
			],
		},
		byAge: {
			title: 'Best 50/50 Custody Schedule by Age',
			description:
				'Age does not decide custody by itself, but it changes how children experience exchanges, school routines, activities, and time away from each home.',
			rows: [
				{
					age: 'Toddler',
					recommended: '2-2-3',
					href: '/2-2-3-custody-schedule',
					guideHref: '/best-custody-schedule-for-toddler',
					reason: 'Shorter blocks can support frequent contact when naps, bedtime, and separation needs are sensitive.',
				},
				{
					age: '5-Year-Old',
					recommended: '2-2-5-5',
					href: '/2-2-5-5-custody-schedule',
					guideHref: '/best-custody-schedule-for-5-year-old',
					reason: 'Predictable school or kindergarten weekdays can matter more than constant switching.',
				},
				{
					age: '7-Year-Old',
					recommended: '2-2-5-5',
					href: '/2-2-5-5-custody-schedule',
					guideHref: '/best-custody-schedule-for-7-year-old',
					reason: 'Stable school nights help with homework, backpacks, activities, and transportation.',
				},
				{
					age: 'Teenager',
					recommended: 'Week-On Week-Off',
					href: '/week-on-week-off-custody-schedule',
					guideHref: '/best-custody-schedule-for-teenager',
					reason: 'Older children may prefer fewer exchanges around sports, jobs, driving, and social commitments.',
				},
			],
		},
		alternatingWeekends: {
			title: '50/50 Custody With Alternating Weekends',
			description: [
				'A 50/50 custody schedule with alternating weekends gives each parent regular weekday time and rotates the longer weekend block. Parents often use this when both homes are close enough for school transportation and both parents want ordinary weekday involvement, not only weekend parenting time.',
				'The benefit is balance: each parent gets school-night routines and weekend time. The drawback is coordination. Backpacks, sports gear, homework, and exchange timing need a system so the alternating weekend does not create confusion.',
			],
			weeks: [
				{
					label: 'Week 1',
					blocks: [
						{ parent: 'Parent A', days: 'Mon Tue' },
						{ parent: 'Parent B', days: 'Wed Thu' },
						{ parent: 'Parent A', days: 'Fri Sat Sun' },
					],
				},
				{
					label: 'Week 2',
					blocks: [
						{ parent: 'Parent A', days: 'Mon Tue' },
						{ parent: 'Parent B', days: 'Wed Thu' },
						{ parent: 'Parent B', days: 'Fri Sat Sun' },
					],
				},
			],
		},
		workSchedules: {
			title: 'Can My Work Schedule Affect Custody?',
			description: [
				'Work schedules can affect whether a 50/50 custody schedule is practical. Rotating shifts, night shifts, travel, healthcare schedules, first responder schedules, and unpredictable on-call work can make a standard equal-time rotation difficult unless the parenting plan has clear backup rules.',
				'A nurse working three overnight shifts may need exchanges after rest periods. A firefighter with 24-hour shifts may need a custom repeating pattern. A parent who travels every other week may need a 60/40 plan or a flexible 50/50 calendar instead of promising exchanges that repeatedly fail.',
			],
			items: [
				{ title: 'Rotating shifts', description: 'Use a custom calendar and define how far in advance schedule changes must be shared.' },
				{ title: 'Night shifts', description: 'Avoid exchanges that leave a parent unavailable for bedtime, school mornings, or transportation.' },
				{ title: 'Travel schedules', description: 'Consider 60/40, make-up time, or longer blocks instead of forcing exact weekly equality.' },
				{ title: 'Healthcare and first responders', description: 'Plan around long shifts, emergency call-ins, and predictable backup caregivers.' },
				{ title: 'Flexible work', description: 'Remote or flexible work can support 50/50 if both parents still protect school and activity routines.' },
			],
		},
		fitMatrix: {
			title: 'Which Schedule Fits Your Family?',
			rows: [
				{ situation: 'Toddler', recommended: '2-2-3', href: '/2-2-3-custody-schedule' },
				{ situation: 'School-age child', recommended: '2-2-5-5', href: '/2-2-5-5-custody-schedule' },
				{ situation: 'Teenager', recommended: 'Week-On Week-Off', href: '/week-on-week-off-custody-schedule' },
				{ situation: 'Parents work shifts', recommended: 'Custom', href: '/custody-schedule-generator' },
				{ situation: 'Parents live far apart', recommended: '60/40', href: '/60-40-custody-schedule' },
				{ situation: 'High conflict', recommended: 'Fewer exchanges', href: '/week-on-week-off-custody-schedule' },
				{ situation: 'Many activities', recommended: '5-2-2-5', href: '/5-2-2-5-custody-schedule' },
			],
		},
		terms: {
			title: 'Common 50/50 Custody Schedule Terms Explained',
			description:
				'Parents often search for the same schedule using shorthand terms. These common terms usually point to standard equal-parenting-time rotations.',
			rows: [
				{
					term: '223 custody schedule',
					meaning: '2-2-3 custody schedule',
					href: '/2-2-3-custody-schedule',
					explanation: 'Two days with one parent, two days with the other parent, then a three-day weekend block that alternates.',
				},
				{
					term: '2255 custody schedule',
					meaning: '2-2-5-5 custody schedule',
					href: '/2-2-5-5-custody-schedule',
					explanation: 'Each parent usually keeps the same two weekdays, while the longer five-day blocks alternate weekends.',
				},
				{
					term: '5225 custody schedule',
					meaning: '5-2-2-5 custody schedule',
					href: '/5-2-2-5-custody-schedule',
					explanation: 'A related equal-time pattern described by its five-day and two-day blocks.',
				},
				{
					term: 'Alternating weeks',
					meaning: 'Week-On Week-Off',
					href: '/week-on-week-off-custody-schedule',
					explanation: 'One parent has a full week, then the other parent has the next full week.',
				},
				{
					term: '50/50 parenting schedule',
					meaning: 'Equal parenting time schedule',
					explanation: 'A schedule designed to divide overnights and ordinary parenting time as evenly as practical.',
				},
			],
		},
		easeComparison: {
			title: 'Which Schedule Is Easiest to Follow?',
			items: [
				{
					schedule: '2-2-3',
					href: '/2-2-3-custody-schedule',
					exchangeFrequency: 'High',
					routineComplexity: 'Medium',
					schoolFriendliness: 'Medium',
					transitionLoad: 'High',
				},
				{
					schedule: '2-2-5-5',
					href: '/2-2-5-5-custody-schedule',
					exchangeFrequency: 'Medium',
					routineComplexity: 'Low',
					schoolFriendliness: 'High',
					transitionLoad: 'Medium',
				},
				{
					schedule: '5-2-2-5',
					href: '/5-2-2-5-custody-schedule',
					exchangeFrequency: 'Medium',
					routineComplexity: 'Low',
					schoolFriendliness: 'High',
					transitionLoad: 'Medium',
				},
				{
					schedule: 'Week-On Week-Off',
					href: '/week-on-week-off-custody-schedule',
					exchangeFrequency: 'Low',
					routineComplexity: 'Low',
					schoolFriendliness: 'High for older kids',
					transitionLoad: 'Low',
				},
			],
		},
		commonStart: {
			title: 'What Many Families Start With',
			description: [
				'While every family is different, many parents start by comparing 2-2-5-5 for school-age children because it keeps weekdays predictable while still alternating weekends.',
				'For younger children, parents often compare 2-2-3 because it creates frequent contact with both parents. For older children and teenagers, week-on/week-off often becomes easier because there are fewer exchanges and the calendar is simple.',
				'These are starting points, not rules. The right schedule still depends on distance, work schedules, school routines, activities, and how well the child handles transitions.',
			],
		},
		wrongScheduleInsight: {
			title: 'Why Many Parents Choose the Wrong 50/50 Schedule',
			description: [
				'Many parents choose a 50/50 schedule because the parenting time looks equal, then discover the real problems later: commute times are too long, school mornings are rushed, homework gets lost, activities conflict with exchanges, or work shifts make the calendar unreliable.',
				'A successful 50/50 schedule is usually the one the family can follow consistently. Forgotten backpacks, sports equipment, transition stress, and holiday overrides can cause more conflict than the custody percentage itself.',
				'Before choosing between 2-2-3, 2-2-5-5, 5-2-2-5, 3-4-4-3, or week-on/week-off, look at the child’s actual school week, one real weekend, and the parents’ real work schedules.',
			],
			takeaway: 'Before choosing a schedule, test it against one real school week and one real weekend.',
		},
		logistics: {
			title: 'Practical Issues That Matter More Than Custody Percentages',
			description: [
				'Many custody disputes focus on percentages, but successful 50/50 schedules usually depend on logistics. A calendar can be perfectly equal and still create stress if backpacks, sports equipment, school projects, homework, transportation, and communication are not handled well.',
				'Before choosing a schedule, parents should test ordinary school days. Who checks homework? Who drives to practice? Where do uniforms stay? How are school projects shared? What happens when a child forgets a backpack at the other home?',
			],
			items: [
				'Forgotten backpacks and school folders',
				'Sports equipment and uniforms',
				'School projects and reading logs',
				'Transportation to school, daycare, and activities',
				'Homework expectations in both homes',
				'Communication about changes, sick days, and missed items',
			],
		},
		holidayOverride: {
			title: 'Example: How Holidays Override a 50/50 Schedule',
			description: [
				'Holiday schedules often replace the regular 50/50 schedule temporarily. After the holiday period ends, families usually return to the normal repeating rotation unless the parenting plan says otherwise.',
				'This is why many parents build holiday rules separately from the weekly schedule. A clear holiday plan prevents arguments about whether Thanksgiving, Christmas, or Spring Break follows the regular weekday rotation.',
			],
			rows: [
				{
					scenario: 'Normal schedule',
					normalSchedule: 'Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, weekends alternate.',
					holidayExample: 'The regular rotation controls unless a holiday rule applies.',
				},
				{
					scenario: 'Thanksgiving example',
					normalSchedule: 'Parent A would normally have Thursday night.',
					holidayExample: 'Thanksgiving may override so Parent B has Thanksgiving Day in even years and Parent A in odd years.',
				},
				{
					scenario: 'Christmas example',
					normalSchedule: 'The regular 50/50 rotation might place Christmas morning with either parent.',
					holidayExample: 'Parents may split winter break or alternate Christmas Eve and Christmas Day.',
				},
				{
					scenario: 'Spring Break example',
					normalSchedule: 'The regular schedule would continue through school break.',
					holidayExample: 'Spring Break may be assigned as a full block or alternated each year.',
				},
			],
		},
		whenNotFit: {
			title: 'Situations Where 50/50 May Not Be the Best Fit',
			description: [
				'50/50 custody can work well for many families, but it is not automatically the best fit in every situation. This is not legal advice. It is a practical checklist of situations where parents may need to compare alternatives or create a custom plan.',
				'If equal time creates repeated missed school, late pickups, conflict, or exhausted children, a different schedule may be more realistic while still preserving meaningful time with both parents.',
			],
			items: [
				{
					title: 'Very long distances',
					description: 'Long drives can interfere with school mornings, activities, bedtime, and the child’s ability to settle in either home.',
				},
				{
					title: 'Highly unpredictable schedules',
					description: 'On-call work, frequent travel, or changing shifts may require a custom schedule or backup parenting-time rules.',
				},
				{
					title: 'Severe transportation challenges',
					description: 'If neither parent can reliably handle school, daycare, or activity transportation, a strict 50/50 plan may fail in practice.',
				},
				{
					title: 'Special circumstances',
					description: 'Medical, emotional, educational, safety, or high-conflict concerns may require more specific planning and local guidance.',
				},
			],
		},
		insight: {
			title: 'The Best 50/50 Custody Schedule Is Usually the One Families Can Follow Consistently',
			description: [
				'Many parents compare 2-2-3, 2-2-5-5, and 5-2-2-5 as if the schedule name alone decides success. In real life, the most important factor is often whether the family can follow the calendar consistently for months without school problems, transportation stress, activity conflicts, or repeated last-minute changes.',
				'A schedule that is mathematically equal can still fail if one home is too far from school, a parent’s work schedule changes constantly, or the child’s activities require equipment that never makes it to the right house. A slightly less elegant plan that parents can follow calmly may be better than a perfect-looking plan that breaks every week.',
				'Before choosing a 50/50 schedule, test the pattern with real school days, commute times, practices, bedtime routines, work shifts, and holidays. Then use the custody schedule generator, custody percentage calculator, or parenting time calculator to check the practical and overnight impact.',
			],
		},
		ctaHub: {
			title: 'Plan Your 50/50 Custody Schedule',
			items: [
				{
					title: 'Custody Schedule Generator',
					slug: 'custody-schedule-generator',
					description: 'Build a calendar with real dates so you can see how a 50/50 rotation works before using it.',
				},
				{
					title: 'Custody Percentage Calculator',
					slug: 'custody-percentage-calculator',
					description: 'Estimate overnight percentages after holidays, school breaks, and custom schedule changes.',
				},
				{
					title: 'Parenting Time Calculator',
					slug: 'parenting-time-calculator',
					description: 'Compare parenting time totals across 2-2-3, 2-2-5-5, 5-2-2-5, and custom schedules.',
				},
				{
					title: 'Custody Calendar Template',
					slug: 'custody-calendar-template',
					description: 'Organize exchanges, school days, holidays, activities, and parenting time in a printable format.',
				},
				{
					title: 'Parenting Plan Template',
					slug: 'parenting-plan-template',
					description: 'Write down transportation, holidays, communication, school responsibilities, and schedule-change rules.',
				},
			],
		},
	},
	examples: {
		title: '50/50 Custody Schedule Examples',
		description: 'These examples show how different family situations can point to different equal-time schedules. The goal is not to pick the most popular schedule. It is to pick the 50/50 pattern the family can actually follow.',
		items: [
			{
				title: 'Example 1: Toddler',
				href: '/2-2-3-custody-schedule',
				description: 'A toddler with parents nearby may do better with shorter blocks and frequent contact.',
				familySituation: 'Parents live within 10 minutes, daycare is convenient to both homes, and exchanges can stay calm.',
				scheduleUsed: '2-2-3',
				whyItWorks: 'The child sees both parents often while weekends still alternate over the two-week cycle.',
				potentialIssue: 'Frequent exchanges can be hard if naps, bedtime, or separation reactions are sensitive.',
			},
			{
				title: 'Example 2: 7-year-old with school and soccer',
				href: '/2-2-5-5-custody-schedule',
				description: 'A school-age child with homework and soccer may need stable school-night ownership.',
				familySituation: 'The child has practice twice a week, reading logs, and school items that need to move reliably.',
				scheduleUsed: '2-2-5-5',
				whyItWorks: 'Each parent keeps consistent weekdays, and weekends alternate without constant midweek changes.',
				potentialIssue: 'Sports gear and homework need a shared tracking system.',
			},
			{
				title: 'Example 3: Teenager who drives',
				href: '/week-on-week-off-custody-schedule',
				description: 'A driving teenager may need fewer exchanges around school, work, sports, and friends.',
				familySituation: 'The teen can drive to school and activities, and both homes can support full school weeks.',
				scheduleUsed: 'Week-on/week-off',
				whyItWorks: 'Fewer exchanges reduce disruption and give the teen a simpler calendar.',
				potentialIssue: 'Car, gas, curfew, and communication rules still need to be clear.',
			},
			{
				title: 'Example 4: Nurse or firefighter shift-work parent',
				href: '/custody-schedule-generator',
				description: 'Equal time may still be possible, but the schedule may need custom rules around long shifts.',
				familySituation: 'One parent has rotating overnight or 24-hour shifts, and the other parent has some flexible days.',
				scheduleUsed: 'Custom 50/50',
				whyItWorks: 'A custom calendar can preserve equal time while avoiding exchanges during unavailable work periods.',
				potentialIssue: 'Backup care and notice rules should be written down.',
			},
			{
				title: 'Example 5: Parents living 35-45 minutes apart',
				href: '/60-40-custody-schedule',
				description: 'Equal time may create too much school-week travel when homes are not close.',
				familySituation: 'Both parents are involved, but the commute affects school mornings and practices.',
				scheduleUsed: '60/40 or custom 50/50',
				whyItWorks: 'Fewer school-week exchanges may protect sleep, homework, and activity attendance.',
				potentialIssue: 'A strict 50/50 plan may look fair but feel exhausting.',
			},
			{
				title: 'Example 6: High-conflict exchanges',
				href: '/week-on-week-off-custody-schedule',
				description: 'Fewer exchanges may matter more than the exact 50/50 pattern when handoffs are stressful.',
				familySituation: 'The child does well in both homes, but parent-to-parent handoffs often create conflict.',
				scheduleUsed: 'Week-on/week-off or school-based exchanges',
				whyItWorks: 'Lower exchange frequency can reduce conflict exposure while preserving equal time.',
				potentialIssue: 'A full week away from either parent may not fit younger children.',
			},
		],
	},
	faq: [
		{
			question: 'What is the best 50/50 custody schedule?',
			answerHtml: 'For many families, the best 50/50 custody schedule is the one that gives both parents equal time while keeping school, work, activities, and transportation manageable. A <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5 custody schedule</a> is often the strongest starting point for school-age children because it gives each parent predictable weekdays and alternating longer weekend blocks. A <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5 schedule</a> can work for similar reasons. A <a href="/week-on-week-off-custody-schedule" class="text-accent hover:underline">week-on/week-off schedule</a> may work better for teenagers or older children who can handle full weeks. A <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3 schedule</a> can work for younger children who need frequent contact. The tradeoff is that equal time only works well when the calendar is realistic. Test commute times, school mornings, activities, and work schedules in the <a href="/custody-schedule-generator" class="text-accent hover:underline">custody schedule generator</a> before choosing.',
			answer: 'For many families, the best 50/50 custody schedule is the one that gives both parents equal time while keeping school, work, activities, and transportation manageable. A 2-2-5-5 custody schedule is often the strongest starting point for school-age children because it gives each parent predictable weekdays and alternating longer weekend blocks. A 5-2-2-5 schedule can work for similar reasons. A week-on/week-off schedule may work better for teenagers or older children who can handle full weeks. A 2-2-3 schedule can work for younger children who need frequent contact. The tradeoff is that equal time only works well when the calendar is realistic. Test commute times, school mornings, activities, and work schedules in the custody schedule generator before choosing.',
		},
		{
			question: 'What is the most common 50/50 custody schedule?',
			answerHtml: 'Common 50/50 custody schedules include <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3</a>, <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5</a>, <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5</a>, and <a href="/week-on-week-off-custody-schedule" class="text-accent hover:underline">week-on/week-off</a>. The most common choice depends on the child’s age and the family’s logistics. 2-2-3 is often used when parents want frequent contact and alternating weekends. 2-2-5-5 and 5-2-2-5 are common starting points for school-age children because they create stable weekdays and balanced weekend time. Week-on/week-off is often easier for older children and teenagers because it has fewer exchanges. Popular does not always mean best. A common schedule can still fail if homes are too far apart, a parent works nights, or the child’s activities make exchanges difficult.',
			answer: 'Common 50/50 custody schedules include 2-2-3, 2-2-5-5, 5-2-2-5, and week-on/week-off. The most common choice depends on the child’s age and the family’s logistics. 2-2-3 is often used when parents want frequent contact and alternating weekends. 2-2-5-5 and 5-2-2-5 are common starting points for school-age children because they create stable weekdays and balanced weekend time. Week-on/week-off is often easier for older children and teenagers because it has fewer exchanges. Popular does not always mean best. A common schedule can still fail if homes are too far apart, a parent works nights, or the child’s activities make exchanges difficult.',
		},
		{
			question: 'What is a 2-2-3 custody schedule?',
			answerHtml: 'A <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3 custody schedule</a> is a 50/50 rotation where Parent A has two days, Parent B has two days, and Parent A has the three-day weekend block. The next week reverses so Parent B receives the longer weekend block. Over two weeks, each parent typically receives seven overnights. This schedule is often useful for younger children because it avoids long stretches away from either parent. The tradeoff is frequent exchanges. Parents usually need to live close enough for school, daycare, and transportation to work smoothly. If the child struggles with transitions, the parents have difficult handoffs, or school items are constantly forgotten, <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5</a> or <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5</a> may be less disruptive.',
			answer: 'A 2-2-3 custody schedule is a 50/50 rotation where Parent A has two days, Parent B has two days, and Parent A has the three-day weekend block. The next week reverses so Parent B receives the longer weekend block. Over two weeks, each parent typically receives seven overnights. This schedule is often useful for younger children because it avoids long stretches away from either parent. The tradeoff is frequent exchanges. Parents usually need to live close enough for school, daycare, and transportation to work smoothly. If the child struggles with transitions, the parents have difficult handoffs, or school items are constantly forgotten, 2-2-5-5 or 5-2-2-5 may be less disruptive.',
		},
		{
			question: 'What is a 223 custody schedule?',
			answerHtml: 'A 223 custody schedule is another way people refer to the <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3 custody schedule</a>. The numbers describe the blocks of parenting time: two days with one parent, two days with the other parent, then three days with the first parent. The next week usually flips so both parents receive alternating weekends. Parents often search for “223 custody schedule” when they want equal parenting time with frequent contact. It can be a useful starting point for toddlers, preschoolers, or younger children who do not do well with long gaps. The tradeoff is that it creates more exchanges, so it works best when parents live close and can keep transitions calm and predictable.',
			answer: 'A 223 custody schedule is another way people refer to the 2-2-3 custody schedule. The numbers describe the blocks of parenting time: two days with one parent, two days with the other parent, then three days with the first parent. The next week usually flips so both parents receive alternating weekends. Parents often search for “223 custody schedule” when they want equal parenting time with frequent contact. It can be a useful starting point for toddlers, preschoolers, or younger children who do not do well with long gaps. The tradeoff is that it creates more exchanges, so it works best when parents live close and can keep transitions calm and predictable.',
		},
		{
			question: 'What is a 2-2-5-5 custody schedule?',
			answerHtml: 'A <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5 custody schedule</a> is a 50/50 rotation where each parent usually keeps the same two weekdays, and the longer five-day blocks alternate. For example, Parent A may have Monday and Tuesday, Parent B may have Wednesday and Thursday, and weekends alternate through the five-day blocks. This schedule is often a strong fit for school-age children because it gives predictable school nights while still balancing parenting time. It can reduce confusion compared with 2-2-3 because weekday responsibilities stay more stable. The main challenge is that five-day blocks may feel long for some younger children, and both homes must track school, activities, clothing, and transportation well. Use a <a href="/custody-calendar-template" class="text-accent hover:underline">custody calendar template</a> to make the pattern clear.',
			answer: 'A 2-2-5-5 custody schedule is a 50/50 rotation where each parent usually keeps the same two weekdays, and the longer five-day blocks alternate. For example, Parent A may have Monday and Tuesday, Parent B may have Wednesday and Thursday, and weekends alternate through the five-day blocks. This schedule is often a strong fit for school-age children because it gives predictable school nights while still balancing parenting time. It can reduce confusion compared with 2-2-3 because weekday responsibilities stay more stable. The main challenge is that five-day blocks may feel long for some younger children, and both homes must track school, activities, clothing, and transportation well. Use a custody calendar template to make the pattern clear.',
		},
		{
			question: 'What is a 2255 custody schedule?',
			answerHtml: 'A 2255 custody schedule is shorthand for the <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5 custody schedule</a>. The numbers refer to two days, two days, five days, and five days across the repeating equal-time pattern. In many versions, one parent has Monday and Tuesday, the other parent has Wednesday and Thursday, and weekends alternate. Parents often like 2255 because it is easier to remember than a constantly changing schedule. It is especially practical for school-age children when both parents can handle regular school nights. The tradeoff is that five-day blocks can feel long for some younger children, so parents should consider age, distance, and transition comfort before choosing it.',
			answer: 'A 2255 custody schedule is shorthand for the 2-2-5-5 custody schedule. The numbers refer to two days, two days, five days, and five days across the repeating equal-time pattern. In many versions, one parent has Monday and Tuesday, the other parent has Wednesday and Thursday, and weekends alternate. Parents often like 2255 because it is easier to remember than a constantly changing schedule. It is especially practical for school-age children when both parents can handle regular school nights. The tradeoff is that five-day blocks can feel long for some younger children, so parents should consider age, distance, and transition comfort before choosing it.',
		},
		{
			question: 'What is a 5-2-2-5 custody schedule?',
			answerHtml: 'A <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5 custody schedule</a> is an equal-time rotation built around alternating five-day and two-day blocks. It is closely related to 2-2-5-5, but some parents describe the pattern by emphasizing the longer five-day stretches. This schedule can work well when equal parenting time is important but the child benefits from fewer confusing transitions than a 2-2-3 pattern. It is often useful for school-age children with homework, sports, or predictable weekday commitments. The tradeoff is that both homes need to be ready for full school routines, and the child may spend longer blocks away from each parent. A shared custody calendar can help parents track the pattern clearly and avoid confusion around alternating weekends.',
			answer: 'A 5-2-2-5 custody schedule is an equal-time rotation built around alternating five-day and two-day blocks. It is closely related to 2-2-5-5, but some parents describe the pattern by emphasizing the longer five-day stretches. This schedule can work well when equal parenting time is important but the child benefits from fewer confusing transitions than a 2-2-3 pattern. It is often useful for school-age children with homework, sports, or predictable weekday commitments. The tradeoff is that both homes need to be ready for full school routines, and the child may spend longer blocks away from each parent. A shared custody calendar can help parents track the pattern clearly and avoid confusion around alternating weekends.',
		},
		{
			question: 'What is a 5225 custody schedule?',
			answerHtml: 'A 5225 custody schedule is shorthand for the <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5 custody schedule</a>. It describes a repeating pattern with a five-day block, a two-day block, another two-day block, and another five-day block. Parents often compare 5225 with 2255 because the schedules are closely related and sometimes described differently depending on where the family starts counting the cycle. It can be a good starting point when equal parenting time is important but the family wants predictable blocks instead of frequent 2-2-3 exchanges. The schedule works best when both homes can handle school, activities, clothing, homework, and transportation during longer blocks.',
			answer: 'A 5225 custody schedule is shorthand for the 5-2-2-5 custody schedule. It describes a repeating pattern with a five-day block, a two-day block, another two-day block, and another five-day block. Parents often compare 5225 with 2255 because the schedules are closely related and sometimes described differently depending on where the family starts counting the cycle. It can be a good starting point when equal parenting time is important but the family wants predictable blocks instead of frequent 2-2-3 exchanges. The schedule works best when both homes can handle school, activities, clothing, homework, and transportation during longer blocks.',
		},
		{
			question: 'What custody schedule is best for kids?',
			answerHtml: 'The best custody schedule for kids is the schedule that fits their age, routines, emotional needs, school demands, and transportation reality. Toddlers may do better with shorter separations and frequent contact, so parents often compare 2-2-3. A 5-year-old or 7-year-old may do better with predictable school nights, making 2-2-5-5 a strong starting point. Teenagers may prefer fewer exchanges, making week-on/week-off more realistic. The best schedule is not always the one with the most equal-looking calendar. It is usually the one parents can follow consistently while keeping the child prepared for school, activities, sleep, and relationships. Compare age-specific guidance for <a href="/best-custody-schedule-for-toddler" class="text-accent hover:underline">toddlers</a>, <a href="/best-custody-schedule-for-7-year-old" class="text-accent hover:underline">school-age children</a>, and <a href="/best-custody-schedule-for-teenager" class="text-accent hover:underline">teenagers</a> before choosing.',
			answer: 'The best custody schedule for kids is the schedule that fits their age, routines, emotional needs, school demands, and transportation reality. Toddlers may do better with shorter separations and frequent contact, so parents often compare 2-2-3. A 5-year-old or 7-year-old may do better with predictable school nights, making 2-2-5-5 a strong starting point. Teenagers may prefer fewer exchanges, making week-on/week-off more realistic. The best schedule is not always the one with the most equal-looking calendar. It is usually the one parents can follow consistently while keeping the child prepared for school, activities, sleep, and relationships. Compare age-specific guidance for toddlers, school-age children, and teenagers before choosing.',
		},
		{
			question: 'Can my work schedule affect custody?',
			answerHtml: 'Yes, a parent’s work schedule can affect whether a 50/50 custody schedule is practical. Rotating shifts, night shifts, travel, healthcare schedules, first responder schedules, and unpredictable on-call work can make standard 2-2-3 or 2-2-5-5 rotations difficult. This does not automatically mean 50/50 cannot work, but it usually means the calendar needs more planning. For example, a nurse working overnight shifts may need exchanges after rest periods. A firefighter may need a custom pattern around 24-hour shifts. A traveling parent may need longer blocks or a <a href="/60-40-custody-schedule" class="text-accent hover:underline">60/40 schedule</a>. The practical question is whether each parent can reliably handle school, daycare, transportation, activities, and backup care during their scheduled time. Put backup rules in a <a href="/parenting-plan-template" class="text-accent hover:underline">parenting plan template</a>.',
			answer: 'Yes, a parent’s work schedule can affect whether a 50/50 custody schedule is practical. Rotating shifts, night shifts, travel, healthcare schedules, first responder schedules, and unpredictable on-call work can make standard 2-2-3 or 2-2-5-5 rotations difficult. This does not automatically mean 50/50 cannot work, but it usually means the calendar needs more planning. For example, a nurse working overnight shifts may need exchanges after rest periods. A firefighter may need a custom pattern around 24-hour shifts. A traveling parent may need longer blocks or a 60/40 schedule. The practical question is whether each parent can reliably handle school, daycare, transportation, activities, and backup care during their scheduled time. Put backup rules in a parenting plan template.',
		},
		{
			question: 'What is the best 50/50 custody schedule for school-age children?',
			answerHtml: 'For many school-age children, the best 50/50 custody schedule is often <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5</a> or <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5</a>. These schedules can keep school nights more predictable than 2-2-3 while still giving both parents equal time and alternating weekends. For example, one parent may always handle Monday and Tuesday school nights while the other handles Wednesday and Thursday. That can make backpacks, homework, sports gear, and transportation easier to manage. The schedule works best when parents live close enough to school and both homes can handle morning routines. If distance or work schedules create too much stress, parents may need to compare a <a href="/60-40-custody-schedule" class="text-accent hover:underline">60/40 schedule</a> or a custom plan that protects school stability.',
			answer: 'For many school-age children, the best 50/50 custody schedule is often 2-2-5-5 or 5-2-2-5. These schedules can keep school nights more predictable than 2-2-3 while still giving both parents equal time and alternating weekends. For example, one parent may always handle Monday and Tuesday school nights while the other handles Wednesday and Thursday. That can make backpacks, homework, sports gear, and transportation easier to manage. The schedule works best when parents live close enough to school and both homes can handle morning routines. If distance or work schedules create too much stress, parents may need to compare a 60/40 schedule or a custom plan that protects school stability.',
		},
		{
			question: 'What is the best 50/50 custody schedule for teenagers?',
			answerHtml: 'For many teenagers, the best 50/50 custody schedule is <a href="/week-on-week-off-custody-schedule" class="text-accent hover:underline">week-on/week-off</a> or a flexible equal-time plan. Teenagers often have sports, jobs, driving, social events, heavier homework, and college preparation. Fewer exchanges can make it easier to manage school supplies, work uniforms, sports equipment, transportation, and social commitments. A 5-2-2-5 schedule may still work well for younger teens or families that want more frequent contact. The key is flexibility with structure. Parents should keep a baseline calendar but allow practical adjustments for practices, exams, work shifts, and major school events. A teenager’s input may be useful, but adults should still maintain clear expectations, safety rules, and communication. See the <a href="/best-custody-schedule-for-teenager" class="text-accent hover:underline">teenager custody schedule guide</a> for more detail.',
			answer: 'For many teenagers, the best 50/50 custody schedule is week-on/week-off or a flexible equal-time plan. Teenagers often have sports, jobs, driving, social events, heavier homework, and college preparation. Fewer exchanges can make it easier to manage school supplies, work uniforms, sports equipment, transportation, and social commitments. A 5-2-2-5 schedule may still work well for younger teens or families that want more frequent contact. The key is flexibility with structure. Parents should keep a baseline calendar but allow practical adjustments for practices, exams, work shifts, and major school events. A teenager’s input may be useful, but adults should still maintain clear expectations, safety rules, and communication. See the teenager custody schedule guide for more detail.',
		},
		{
			question: 'How do alternating weekends work in a 50/50 schedule?',
			answerHtml: 'Alternating weekends in a 50/50 schedule usually means each parent receives a longer weekend block every other week while weekday time also balances. In a 2-2-5-5 style pattern, Parent A may have Monday and Tuesday, Parent B may have Wednesday and Thursday, and the Friday-through-Sunday block alternates. Over two weeks, each parent receives seven overnights. This gives both parents school-night involvement and weekend time. The benefit is predictability. The drawback is that parents must coordinate school items, clothing, activities, and transportation before the weekend switch. Alternating weekends work best when parents live close enough to support school and activities from either home and when exchange times are clear. Holidays may override the normal alternating weekend pattern, so use a separate <a href="/holiday-custody-schedule" class="text-accent hover:underline">holiday custody schedule</a>.',
			answer: 'Alternating weekends in a 50/50 schedule usually means each parent receives a longer weekend block every other week while weekday time also balances. In a 2-2-5-5 style pattern, Parent A may have Monday and Tuesday, Parent B may have Wednesday and Thursday, and the Friday-through-Sunday block alternates. Over two weeks, each parent receives seven overnights. This gives both parents school-night involvement and weekend time. The benefit is predictability. The drawback is that parents must coordinate school items, clothing, activities, and transportation before the weekend switch. Alternating weekends work best when parents live close enough to support school and activities from either home and when exchange times are clear. Holidays may override the normal alternating weekend pattern, so use a separate holiday custody schedule.',
		},
		{
			question: 'What is a 50/50 custody schedule with alternating weekends?',
			answerHtml: 'A 50/50 custody schedule with alternating weekends is an equal-time plan where each parent receives regular weekdays plus every other weekend. A common version is 2-2-5-5: Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, and weekends alternate. Another version may be described as 5-2-2-5. The advantage is that both parents get school-night involvement and weekend time. The tradeoff is that the family must manage weekend transitions, activities, homework, clothing, and holidays carefully. This type of schedule is often useful for school-age children when parents live close to school and both homes can handle weekday routines. It is less practical when distance, work schedules, or activity travel make exchanges difficult.',
			answer: 'A 50/50 custody schedule with alternating weekends is an equal-time plan where each parent receives regular weekdays plus every other weekend. A common version is 2-2-5-5: Parent A has Monday and Tuesday, Parent B has Wednesday and Thursday, and weekends alternate. Another version may be described as 5-2-2-5. The advantage is that both parents get school-night involvement and weekend time. The tradeoff is that the family must manage weekend transitions, activities, homework, clothing, and holidays carefully. This type of schedule is often useful for school-age children when parents live close to school and both homes can handle weekday routines. It is less practical when distance, work schedules, or activity travel make exchanges difficult.',
		},
		{
			question: 'What is the easiest 50/50 custody schedule to follow?',
			answerHtml: 'The easiest 50/50 custody schedule to follow is usually <a href="/week-on-week-off-custody-schedule" class="text-accent hover:underline">week-on/week-off</a> because the pattern is simple: one week with Parent A, then one week with Parent B. It has fewer exchanges and is easy to put on a calendar. However, easiest is not always best. A full week away from one parent may be too long for younger children, and both homes must be fully ready for school, activities, clothing, medication, and transportation. For school-age children, 2-2-5-5 or 5-2-2-5 may be easier in practice because weekdays repeat consistently. For younger children, 2-2-3 may be emotionally easier even though it has more exchanges. The easiest workable schedule is the one the family can follow consistently.',
			answer: 'The easiest 50/50 custody schedule to follow is usually week-on/week-off because the pattern is simple: one week with Parent A, then one week with Parent B. It has fewer exchanges and is easy to put on a calendar. However, easiest is not always best. A full week away from one parent may be too long for younger children, and both homes must be fully ready for school, activities, clothing, medication, and transportation. For school-age children, 2-2-5-5 or 5-2-2-5 may be easier in practice because weekdays repeat consistently. For younger children, 2-2-3 may be emotionally easier even though it has more exchanges. The easiest workable schedule is the one the family can follow consistently.',
		},
		{
			question: 'Is 2-2-5-5 better than 2-2-3?',
			answerHtml: '<a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5</a> is often better than <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3</a> for school-age children because weekdays stay more predictable. For example, one parent may always handle Monday and Tuesday school nights while the other handles Wednesday and Thursday, which can make homework, backpacks, lunches, and activities easier to manage. The tradeoff is that each parent has some longer five-day blocks, which may feel too long for a younger child or a child who struggles with separation. 2-2-3 may be better for toddlers or younger children because it creates frequent contact with both parents, but it also creates more exchanges. The better starting point depends on age, distance between homes, school routine, and transition tolerance. Use the <a href="/custody-schedule-generator" class="text-accent hover:underline">custody schedule generator</a> to test both patterns on a real calendar.',
			answer: '2-2-5-5 is often better than 2-2-3 for school-age children because weekdays stay more predictable. For example, one parent may always handle Monday and Tuesday school nights while the other handles Wednesday and Thursday, which can make homework, backpacks, lunches, and activities easier to manage. The tradeoff is that each parent has some longer five-day blocks, which may feel too long for a younger child or a child who struggles with separation. 2-2-3 may be better for toddlers or younger children because it creates frequent contact with both parents, but it also creates more exchanges. The better starting point depends on age, distance between homes, school routine, and transition tolerance. Use the custody schedule generator to test both patterns on a real calendar.',
		},
		{
			question: 'How do holidays work in a 50/50 custody schedule?',
			answerHtml: 'Holidays usually override the regular 50/50 custody schedule for a short period, then the normal rotation resumes unless the parenting plan says otherwise. For example, a child might normally be with Parent A on Thursday under a 2-2-5-5 schedule, but Thanksgiving may belong to Parent B in even years. Winter break, spring break, birthdays, Mother’s Day, Father’s Day, and long school breaks are often handled separately for the same reason. The tradeoff is that holiday rules can temporarily change the overnight percentage, especially if one parent receives a long school break. That does not necessarily mean the regular schedule is no longer 50/50 over the year. Parents should write holiday rules clearly and test the calendar with a <a href="/holiday-custody-schedule" class="text-accent hover:underline">holiday custody schedule</a> or <a href="/custody-calendar-template" class="text-accent hover:underline">custody calendar template</a>.',
			answer: 'Holidays usually override the regular 50/50 custody schedule for a short period, then the normal rotation resumes unless the parenting plan says otherwise. For example, a child might normally be with Parent A on Thursday under a 2-2-5-5 schedule, but Thanksgiving may belong to Parent B in even years. Winter break, spring break, birthdays, Mother’s Day, Father’s Day, and long school breaks are often handled separately for the same reason. The tradeoff is that holiday rules can temporarily change the overnight percentage, especially if one parent receives a long school break. That does not necessarily mean the regular schedule is no longer 50/50 over the year. Parents should write holiday rules clearly and test the calendar with a holiday custody schedule or custody calendar template.',
		},
	],
	relatedSchedules: [
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
		'60-40-custody-schedule',
		'every-other-weekend-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
		{
			title: 'Custody schedule template',
			slug: 'custody-schedule-template',
			description: 'Use a printable custody schedule template to document the rotation.',
		},
	],
	relatedLinks: [
		{
			title: '2-2-3 Custody Schedule',
			slug: '2-2-3-custody-schedule',
			description: 'A frequent-contact 50/50 schedule with alternating three-day weekends.',
		},
		{
			title: 'Custody percentage calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
		{
			title: '60/40 Custody Schedule',
			slug: '60-40-custody-schedule',
			description: 'Compare equal parenting time with a modest majority-time schedule.',
		},
		{
			title: '2-2-5-5 Custody Schedule',
			slug: '2-2-5-5-custody-schedule',
			description: 'A shared parenting schedule with stable weekdays and alternating five-day blocks.',
		},
		{
			title: '5-2-2-5 Custody Schedule',
			slug: '5-2-2-5-custody-schedule',
			description: 'A 50/50 schedule with longer parenting blocks and predictable exchange days.',
		},
		{
			title: '3-4-4-3 Custody Schedule',
			slug: '3-4-4-3-custody-schedule',
			description: 'A two-week schedule using alternating three- and four-day parenting blocks.',
		},
		{
			title: 'Week-On/Week-Off Custody Schedule',
			slug: 'week-on-week-off-custody-schedule',
			description: 'A simple weekly rotation with fewer exchanges and full-week blocks.',
		},
		{
			title: 'Custody Schedule Template',
			slug: 'custody-schedule-template',
			description: 'Use a printable custody schedule template to document the rotation.',
		},
	],
};

export default schedule;
