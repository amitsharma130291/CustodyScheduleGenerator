import type { ScheduleContent } from './types';

const schedule: ScheduleContent = {
	id: 'every-other-weekend',
	title: 'Every Other Weekend Custody Schedule',
	slug: 'every-other-weekend-custody-schedule',
	description: 'Create an every other weekend custody schedule and preview a visitation-style parenting time calendar.',
	metaTitle: 'Every Other Weekend Custody Schedule, Calendar & Examples',
	metaDescription: 'Create an every other weekend custody schedule, view custody calendar examples, estimate parenting time, and understand common visitation arrangements.',
	canonicalUrl: 'https://future-domain.com/every-other-weekend-custody-schedule',
	lede: 'An every other weekend custody schedule is a common visitation arrangement where one parent has primary custody and the other parent has alternating weekends. It is often used when parents live apart, when one parent handles the school-week routine, or when one parent is the primary caregiver.',
	overviewTitle: 'What Is an Every Other Weekend Custody Schedule?',
	overview: [
		'In an every other weekend custody schedule, one parent usually has the child during most weekdays and non-visitation weekends. The other parent receives scheduled parenting time on alternating weekends, often from Friday after school through Sunday evening or Monday morning.',
		'This schedule is not usually a 50/50 custody schedule. It often gives the weekend parent about 20-30% of parenting time when holidays, school breaks, summer time, or added weekday visits are included.',
	],
	howItWorks: {
		title: 'How an Every Other Weekend Schedule Works',
		description: [
			'In the generator, the selected start date is used to find the first Parent B weekend. If the selected date is Friday, Parent B receives that Friday, Saturday, and Sunday; if it is not Friday, the schedule aligns Parent B to the next Friday after the selected date.',
			'Parents can adjust the exact exchange time to fit school pickup, work schedules, travel distance, and whether the weekend visit ends Sunday evening or Monday morning.',
		],
	},
	pros: [
		'Stable school routine with one primary home',
		'Fewer exchanges than frequent rotation schedules',
		'Easy to understand and show on a custody calendar',
	],
	cons: [
		'Less parenting time for the weekend parent',
		'Longer gaps between visits',
		'Less weekday involvement in school routines',
	],
	example: {
		title: 'Example Every Other Weekend Custody Calendar',
		description: 'Parent B has parenting time every other Friday through Sunday, while Parent A has all remaining overnights.',
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
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu Fri Sat Sun' },
				],
			},
			{
				label: 'Week 3',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu' },
					{ parent: 'Parent B', days: 'Fri Sat Sun' },
				],
			},
			{
				label: 'Week 4',
				blocks: [
					{ parent: 'Parent A', days: 'Mon Tue Wed Thu Fri Sat Sun' },
				],
			},
		],
	},
	comparison: {
		title: 'Related Custody Schedules to Compare',
		description: 'Every other weekend custody is usually best compared with schedules that provide more frequent contact or a more even parenting-time split.',
		rows: [
			{
				schedule: '50/50 custody schedule',
				href: '/50-50-custody-schedule',
				bestFor: 'Parents comparing every other weekend with shared parenting time',
				exchangeFrequency: 'Varies by 50/50 pattern',
				weekendPattern: 'Usually alternates or shares weekends',
				notes: 'A broader category for shared parenting-time schedules such as 2-2-3, 2-2-5-5, 5-2-2-5, and week-on/week-off.',
			},
			{
				schedule: '2-2-3 custody schedule',
				href: '/2-2-3-custody-schedule',
				bestFor: 'Families wanting frequent contact with both parents',
				exchangeFrequency: 'Several exchanges each week',
				weekendPattern: 'Alternating three-day weekends',
				notes: 'More frequent transitions than every other weekend, but far more balanced parenting time.',
			},
			{
				schedule: '2-2-5-5 custody schedule',
				href: '/2-2-5-5-custody-schedule',
				bestFor: 'Families wanting consistent weekdays with both parents involved',
				exchangeFrequency: 'Two exchanges most weeks',
				weekendPattern: 'Alternating long weekend blocks',
				notes: 'Useful when every other weekend feels too limited but weekday stability still matters.',
			},
			{
				schedule: '5-2-2-5 custody schedule',
				href: '/5-2-2-5-custody-schedule',
				bestFor: 'Families wanting predictable school-week routines',
				exchangeFrequency: 'Two exchanges most weeks',
				weekendPattern: 'Alternating five-day blocks',
				notes: 'Gives each parent recurring weekday and weekend time.',
			},
			{
				schedule: '3-4-4-3 custody schedule',
				href: '/3-4-4-3-custody-schedule',
				bestFor: 'Families comfortable with midweek exchanges',
				exchangeFrequency: 'Weekly exchanges with three- and four-day blocks',
				weekendPattern: 'Weekends can alternate depending on the start date',
				notes: 'A more balanced option when a child needs regular time with both parents.',
			},
			{
				schedule: 'Week-on week-off custody schedule',
				href: '/week-on-week-off-custody-schedule',
				bestFor: 'Older children and parents wanting fewer exchanges',
				exchangeFrequency: 'One exchange per week',
				weekendPattern: 'Each parent usually receives a full weekend every other week',
				notes: 'Fewer exchanges than short rotations, but much more parenting time than every other weekend.',
			},
		],
	},
	examples: {
		title: 'Parenting Time Percentage',
		description: 'Every other weekend custody usually gives the non-primary parent a smaller percentage than shared rotation schedules. A basic alternating weekend schedule is about 21% of overnights across the repeating cycle, and may land around 20-30% when holidays, school breaks, summer time, or added weekday visits are counted.',
		items: [
			{
				title: 'Weekend-only visitation',
				description: 'A Friday-to-Sunday weekend every other week is roughly 20% of overnights across the repeating cycle.',
			},
			{
				title: 'Weekend plus weekday dinner',
				description: 'Adding a weekday visit can increase contact without changing the primary school-week home.',
			},
			{
				title: 'Holidays and school breaks',
				description: 'Holiday parenting time and summer blocks can raise the yearly parenting time percentage.',
			},
		],
	},
	faq: [
		{
			question: 'What is an every other weekend custody schedule?',
			answer: 'An every other weekend custody schedule is a parenting time arrangement where one parent has most school-week overnights and the other parent has alternating weekends. In a common version, Parent B has Friday through Sunday every other week, while Parent A has the remaining overnights.',
			answerHtml: 'An every other weekend custody schedule is a parenting time arrangement where one parent has most school-week overnights and the other parent has alternating weekends. In a common version, Parent B has Friday through Sunday every other week, while Parent A has the remaining overnights.',
		},
		{
			question: 'How does an every other weekend custody schedule work?',
			answer: 'A typical every other weekend custody schedule gives the weekend parent time from Friday after school through Sunday evening or Monday morning every other week. If the selected date is not a Friday, this generator aligns the first Parent B weekend to the next Friday, then repeats every 14 days.',
			answerHtml: 'A typical every other weekend custody schedule gives the weekend parent time from Friday after school through Sunday evening or Monday morning every other week. If the selected date is not a Friday, this generator aligns the first Parent B weekend to the next Friday, then repeats every 14 days.',
		},
		{
			question: 'What percentage of parenting time is every other weekend custody?',
			answer: 'A Friday-through-Sunday every other weekend schedule gives the weekend parent 3 overnights in each 14-day cycle, or about 21% parenting time. The yearly percentage can move closer to 20-30% when holiday overrides, school breaks, summer blocks, or optional midweek visits are included.',
			answerHtml: 'A Friday-through-Sunday every other weekend schedule gives the weekend parent 3 overnights in each 14-day cycle, or about 21% parenting time. By comparison, a <a href="/50-50-custody-schedule" class="text-accent hover:underline">50/50 custody schedule</a> is designed for a much more even split. The yearly percentage can move closer to 20-30% when holiday overrides, school breaks, summer blocks, or optional midweek visits are included.',
		},
		{
			question: 'What does an every other weekend custody calendar look like?',
			answer: 'An every other weekend custody calendar usually shows Parent B on alternating Friday-through-Sunday blocks, then Parent A on all other dates. The calendar should make the weekend blocks easy to see, along with longer gaps, holiday overrides, and any added weekday visits.',
			answerHtml: 'An every other weekend custody calendar usually shows Parent B on alternating Friday-through-Sunday blocks, then Parent A on all other dates. The calendar should make the weekend blocks easy to see, along with longer gaps, holiday overrides, and any added weekday visits.',
		},
		{
			question: 'What age is best for an every other weekend custody schedule?',
			answer: 'Every other weekend custody can be harder for younger children who need frequent contact with both parents. School-age children may handle it better when one home anchors the school week, and teenagers may prefer fewer exchanges if weekends still support activities and friendships. Suitability depends on distance, attachment, school needs, parent involvement, and whether midweek visits are added.',
			answerHtml: 'Every other weekend custody can be harder for younger children who need frequent contact with both parents. School-age children may handle it better when one home anchors the school week, and teenagers may prefer fewer exchanges if weekends still support activities and friendships. Suitability depends on distance, attachment, school needs, parent involvement, and whether midweek visits are added.',
		},
		{
			question: 'Can weekday visits be added to every other weekend custody?',
			answer: 'Yes. Many parents add a weekday dinner, overnight, video call, or after-school visit to an every other weekend custody schedule. Optional midweek visits reduce the long gap between alternating weekends and can give the weekend parent more involvement in homework, activities, and school-week routines.',
			answerHtml: 'Yes. Many parents add a weekday dinner, overnight, video call, or after-school visit to an every other weekend custody schedule. Optional midweek visits reduce the long gap between alternating weekends and can give the weekend parent more involvement in homework, activities, and school-week routines. Parents who need more frequent exchanges may compare this with a <a href="/2-2-3-custody-schedule" class="text-accent hover:underline">2-2-3 custody schedule</a>.',
		},
		{
			question: 'What are the pros and cons of every other weekend custody?',
			answer: 'The main benefits are a stable school routine, fewer exchanges, and a simple Friday-through-Sunday weekend pattern. The drawbacks are less parenting time for the weekend parent, longer gaps between visits, and fewer chances to participate in weekday school routines unless midweek visits are added.',
			answerHtml: 'The main benefits are a stable school routine, fewer exchanges, and a simple Friday-through-Sunday weekend pattern. The drawbacks are less parenting time for the weekend parent, longer gaps between visits, and fewer chances to participate in weekday school routines unless midweek visits are added. Families wanting fewer exchanges but more time may compare it with a <a href="/week-on-week-off-custody-schedule" class="text-accent hover:underline">week-on week-off custody schedule</a>.',
		},
		{
			question: 'How do holidays work in an every other weekend custody schedule?',
			answer: 'Holiday parenting time usually overrides the regular every other weekend custody schedule. Parents often alternate major holidays, split school breaks, or give the weekend parent additional holiday time before returning to the regular alternating Friday-through-Sunday weekend pattern.',
			answerHtml: 'Holiday parenting time usually overrides the regular every other weekend custody schedule. Parents often alternate major holidays, split school breaks, or give the weekend parent additional holiday time before returning to the regular alternating Friday-through-Sunday weekend pattern.',
		},
		{
			question: 'Is every other weekend custody good for school-age children?',
			answer: 'Every other weekend custody can work for school-age children when one home provides a consistent weekday routine and the weekend parent remains involved through alternating weekends, school events, calls, or midweek visits. It may be harder if the child needs more frequent in-person contact or both parents want regular school-week participation.',
			answerHtml: 'Every other weekend custody can work for school-age children when one home provides a consistent weekday routine and the weekend parent remains involved through alternating weekends, school events, calls, or midweek visits. If both parents need predictable school-week involvement, compare options like a <a href="/2-2-5-5-custody-schedule" class="text-accent hover:underline">2-2-5-5 custody schedule</a>, <a href="/5-2-2-5-custody-schedule" class="text-accent hover:underline">5-2-2-5 custody schedule</a>, or <a href="/3-4-4-3-custody-schedule" class="text-accent hover:underline">3-4-4-3 custody schedule</a>.',
		},
		{
			question: 'Can parents customize an every other weekend custody schedule?',
			answer: 'Yes. Parents can customize an every other weekend custody schedule by adjusting Friday and Sunday exchange times, adding weekday visits, splitting holidays, adding summer blocks, or changing transportation details. The core alternating weekend pattern can stay in place while the parenting plan adds practical details.',
			answerHtml: 'Yes. Parents can customize an every other weekend custody schedule by adjusting Friday and Sunday exchange times, adding weekday visits, splitting holidays, adding summer blocks, or changing transportation details. The core alternating weekend pattern can stay in place while the parenting plan adds practical details.',
		},
	],
	relatedSchedules: [
		'50-50-custody-schedule',
		'60-40-custody-schedule',
		'2-2-3-custody-schedule',
		'2-2-5-5-custody-schedule',
		'5-2-2-5-custody-schedule',
		'3-4-4-3-custody-schedule',
		'week-on-week-off-custody-schedule',
	],
	relatedTools: [
		{
			title: 'Custody calendar template',
			slug: 'custody-calendar-template',
			description: 'Create a printable custody calendar for parenting time and visitation schedules.',
		},
		{
			title: 'Visitation calculator',
			slug: 'visitation-calculator',
			description: 'Estimate visitation percentages from overnight counts.',
		},
	],
	relatedLinks: [
		{
			title: '50/50 Custody Schedule',
			slug: '50-50-custody-schedule',
			description: 'Compare shared parenting-time schedules with every other weekend arrangements.',
		},
		{
			title: '60/40 Custody Schedule',
			slug: '60-40-custody-schedule',
			description: 'Compare every other weekend visitation with a schedule that gives both parents more overnights.',
		},
		{
			title: '2-2-3 Custody Schedule',
			slug: '2-2-3-custody-schedule',
			description: 'A frequent-contact 50/50 schedule with alternating weekends.',
		},
		{
			title: '2-2-5-5 Custody Schedule',
			slug: '2-2-5-5-custody-schedule',
			description: 'Compare a weekday-consistent shared schedule with every other weekend visitation.',
		},
		{
			title: '5-2-2-5 Custody Schedule',
			slug: '5-2-2-5-custody-schedule',
			description: 'Review a shared schedule with predictable weekday and weekend blocks.',
		},
		{
			title: '3-4-4-3 Custody Schedule',
			slug: '3-4-4-3-custody-schedule',
			description: 'Compare a more balanced rotation with an every other weekend plan.',
		},
		{
			title: 'Week-On Week-Off Custody Schedule',
			slug: 'week-on-week-off-custody-schedule',
			description: 'A simple weekly rotation with fewer exchanges.',
		},
		{
			title: 'Custody Percentage Calculator',
			slug: 'custody-percentage-calculator',
			description: 'Estimate parenting time percentages from overnights.',
		},
	],
};

export default schedule;
