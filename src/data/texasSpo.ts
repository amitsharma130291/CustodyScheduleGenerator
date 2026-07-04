export const meta = {
	title: 'Texas Standard Possession Order: Complete 2026 Schedule Guide',
	description:
		'The Texas Standard Possession Order explained: school-year weekends, Thursday visits, holiday schedule, summer possession, and what changes when parents live far apart.',
	datePublished: '2026-07-04',
	dateModified: '2026-07-04',
};

export const editorialReview = {
	reviewedFor: [
		'Texas Family Code Ch. 153 statutory accuracy',
		'SPO vs Expanded SPO distinctions',
		'2026 holiday year (even-year) possession assignments',
		'Distance threshold rules (50-mile and 100-mile)',
	],
	reviewer: 'CustodyBuilder Editorial Team',
	reviewerHref: '/about/',
	methodologyLabel: 'How CustodyBuilder Works',
	methodologyHref: '/how-custodybuilder-works/',
	disclaimer: 'Texas-specific educational content only — not legal advice.',
};

export const hero = {
	headline: 'Texas Standard Possession Order',
	trustChips: [
		'Based on Texas Family Code Ch. 153',
		'Updated for 2026',
		'Used in 254 Texas counties',
	],
	intro:
		'The Texas Standard Possession Order is the default custody schedule courts use when one parent has primary residence of the child. It spells out exactly when the noncustodial parent has the child: specific weekends each month, a Thursday evening during the school year, and defined summer and holiday blocks.',
	boundary:
		'The SPO is the starting point, not a ceiling. Parents can agree to more time, or courts can order something different. This guide covers what the statute actually says.',
};

// School-year schedule data
export const schoolYearSchedule = {
	title: 'School-Year Possession Schedule',
	intro:
		'During the regular school term, the possessory conservator (noncustodial parent) has the child on specific weekends and one Thursday evening each week.',
	citation: 'Tex. Fam. Code § 153.312',
	items: [
		{
			heading: 'Weekend possession: 1st, 3rd, and 5th Fridays',
			body: '6 p.m. Friday through 6 p.m. Sunday. Only months with a 5th Friday get a 5th-weekend visit — in months without one, that period simply does not occur.',
		},
		{
			heading: 'Thursday evening: 6 p.m. to 8 p.m.',
			body: 'Every Thursday during the regular school term. This is a same-evening visit — the child goes home the same night. This is not an overnight under the base Standard SPO. The court may omit Thursday possession if it finds it is not in the child\'s best interest.',
		},
		{
			heading: 'Spring break: alternates by year',
			body: 'In even-numbered years (2026), the noncustodial parent has spring break: school dismissal through 6 p.m. the day before school resumes. In odd years, the primary parent has spring break.',
		},
	],
};

// Summer schedule data
export const summerSchedule = {
	title: 'Summer Possession',
	citation: 'Tex. Fam. Code § 153.312(b)(2) — within 100 miles',
	withinHundred: {
		days: 30,
		noticeDue: 'April 1',
		default: 'July 1 (6 p.m.) through July 31 (6 p.m.)',
		splitNote: 'Can be split into up to 2 periods; each period must be at least 7 consecutive days.',
	},
	overHundred: {
		days: 42,
		citation: 'Tex. Fam. Code § 153.313',
		noticeDue: 'April 1',
		default: 'June 15 (6 p.m.) through July 27 (6 p.m.)',
	},
};

// Standard vs Expanded SPO comparison
export interface SpoComparisonRow {
	feature: string;
	standard: string;
	expanded: string;
}

export const spoComparison: SpoComparisonRow[] = [
	{
		feature: 'Weekend start',
		standard: '6 p.m. Friday',
		expanded: 'School dismissal Friday',
	},
	{
		feature: 'Weekend end',
		standard: '6 p.m. Sunday',
		expanded: 'School resumes Monday morning',
	},
	{
		feature: 'Thursday possession',
		standard: '6 p.m. – 8 p.m. (evening only, no overnight)',
		expanded: 'School dismissal Thursday through school resumes Friday (overnight)',
	},
	{
		feature: 'Summer (within 100 mi)',
		standard: '30 days',
		expanded: '30 days (same; summer is not extended by ESPO within 100 mi)',
	},
	{
		feature: 'Summer (over 100 mi)',
		standard: '42 days',
		expanded: '42 days',
	},
	{
		feature: 'Who qualifies',
		standard: 'Any case where ESPO not elected or ordered',
		expanded: 'Automatic default when parents live ≤50 miles apart (post-Sept. 2021); available by election for 51–100 miles',
	},
	{
		feature: 'Family Code section',
		standard: 'Sec. 153.312',
		expanded: 'Sec. 153.317 / Sec. 153.3171',
	},
];

// Holiday schedule data
export interface HolidayRow {
	holiday: string;
	noncustodialEvenYears: string;
	noncustodialOddYears: string;
	note?: string;
}

export const holidaySchedule: HolidayRow[] = [
	{
		holiday: 'Christmas — first half (school dismissal → noon Dec. 28)',
		noncustodialEvenYears: 'Noncustodial (2026)',
		noncustodialOddYears: 'Primary parent',
		note: 'Split point is noon on December 28, not Christmas Day.',
	},
	{
		holiday: 'Christmas — second half (noon Dec. 28 → day before school)',
		noncustodialEvenYears: 'Primary parent',
		noncustodialOddYears: 'Noncustodial',
		note: '2026: primary parent has second half.',
	},
	{
		holiday: 'Thanksgiving (school dismissal → 6 p.m. Sunday)',
		noncustodialEvenYears: 'Primary parent (2026)',
		noncustodialOddYears: 'Noncustodial',
		note: 'Even years (2026) = primary parent has Thanksgiving.',
	},
	{
		holiday: 'Spring Break — within 100 miles',
		noncustodialEvenYears: 'Noncustodial (2026)',
		noncustodialOddYears: 'Primary parent',
	},
	{
		holiday: 'Spring Break — over 100 miles',
		noncustodialEvenYears: 'Noncustodial every year',
		noncustodialOddYears: 'Noncustodial every year',
		note: 'When parents live more than 100 miles apart, noncustodial gets spring break every year.',
	},
	{
		holiday: "Child's birthday (6 p.m. – 8 p.m.)",
		noncustodialEvenYears: 'Non-possessing parent gets 6–8 p.m.',
		noncustodialOddYears: 'Non-possessing parent gets 6–8 p.m.',
		note: 'Only when that parent does not already have possession that day.',
	},
	{
		holiday: "Mother's Day",
		noncustodialEvenYears: 'Mother always',
		noncustodialOddYears: 'Mother always',
		note: '6 p.m. Friday before through 6 p.m. Mother\'s Day.',
	},
	{
		holiday: "Father's Day",
		noncustodialEvenYears: 'Father always',
		noncustodialOddYears: 'Father always',
		note: '6 p.m. Friday before through 6 p.m. Father\'s Day.',
	},
];

export const holidayNotInSpo = [
	'Martin Luther King Jr. Day',
	'President\'s Day',
	'Memorial Day',
	'July 4th / Independence Day',
	'Labor Day',
];

// Distance rules
export interface DistanceRule {
	distance: string;
	label: string;
	details: string[];
}

export const distanceRules: DistanceRule[] = [
	{
		distance: 'Within 50 miles',
		label: 'Expanded SPO is the automatic default',
		details: [
			'For cases filed on or after September 1, 2021, the court must apply Expanded SPO terms unless the possessory conservator declines in writing or the court finds it is not in the child\'s best interest (Sec. 153.3171).',
			'Weekend possession extends from school dismissal Friday through school resumption Monday.',
			'Thursday becomes a school-dismissal-to-Friday-school-resumption overnight.',
			'The noncustodial parent\'s parenting time increases from roughly 20–24% to approximately 42–46%.',
		],
	},
	{
		distance: '51–100 miles',
		label: 'Standard SPO applies; ESPO available by election',
		details: [
			'The 1st/3rd/5th weekend schedule and Thursday evening visits apply.',
			'Either parent can elect Expanded SPO provisions in writing or orally on the record — the court can approve unless it finds it is not in the child\'s best interest.',
			'Summer: 30 days for the noncustodial parent (April 1 notice required).',
		],
	},
	{
		distance: 'Over 100 miles',
		label: 'Modified schedule with longer summer and no Thursday visits',
		details: [
			'No Thursday evening visits — the distance makes midweek exchanges impractical.',
			'Weekend possession: either the 1st/3rd/5th schedule (same as nearby) or up to one weekend per month of the possessory conservator\'s choice (elected in writing within 90 days of living more than 100 miles apart).',
			'Spring break: noncustodial parent gets it every year (not alternating).',
			'Summer: 42 days (not 30). Default if no April 1 notice: June 15 (6 p.m.) through July 27 (6 p.m.).',
			'Holiday schedule (Sec. 153.314) still applies regardless of distance.',
		],
	},
];

// Court deviation factors
export const deviationFactors = {
	title: 'When Courts Order Something Different',
	intro:
		'The Standard Possession Order is a default, not a guarantee. Courts can and do deviate when circumstances call for it.',
	factors: [
		{
			heading: 'Domestic violence (Sec. 153.004)',
			body: 'The court may not appoint joint managing conservators if there is credible evidence of a pattern of physical or sexual abuse. A rebuttable presumption applies that appointing an abusive parent as the one with primary residence rights is not in the child\'s best interest. Courts can restrict, supervise, or deny possession based on family violence history.',
		},
		{
			heading: 'Substance abuse',
			body: 'Falls under the best interest of the child standard (Sec. 153.002). Courts can restrict possession, require drug testing, or make sobriety a condition of access.',
		},
		{
			heading: 'Geographic impossibility',
			body: 'If a parent moves and the standard schedule becomes unworkable, courts look to Section 153.3171(b)(3)(A): Expanded SPO may not apply when "distances between residences make the possession schedule unworkable or inappropriate."',
		},
		{
			heading: 'Parental fitness concerns',
			body: 'Mental health issues, criminal history, neglect, or the presence of dangerous persons in the household can all support modified possession under the best interest standard.',
		},
		{
			heading: "Child's preferences: age 12 and older (Sec. 153.009)",
			body: 'At age 12 or older, the court must interview the child in chambers if a party requests it. The interview covers conservatorship and primary residence preferences. This is not binding — the judge decides based on the child\'s best interest. Under age 12, the court may interview but is not required to.',
		},
	],
};

// Real-world scenarios
export const scenarios = [
	{
		title: 'Carlos and Maria — 8 miles apart in San Antonio',
		summary: 'Within 50 miles: Expanded SPO is the automatic default.',
		body: 'Carlos has primary residence. Maria lives 8 miles away. Under Sec. 153.3171 (effective 2021), Maria\'s possession order automatically applies Expanded SPO terms: she picks up their daughter at school dismissal on 1st/3rd/5th Fridays and returns her when school resumes Monday morning. Thursday is an overnight — school dismissal Thursday through school resumption Friday. Maria\'s parenting time is roughly 42% of the year. Neither parent needed to ask for this; the court applied it by default.',
	},
	{
		title: 'Jennifer and David — Dallas to Fort Worth area, 42 miles apart',
		summary: '51–100 miles: Standard SPO, with ESPO available by election.',
		body: 'Jennifer has primary residence in Plano; David lives in Fort Worth (about 42 miles). The 51–100 mile range means the Standard SPO applies automatically: David has their son 1st, 3rd, and 5th weekends from 6 p.m. Friday to 6 p.m. Sunday, plus 6–8 p.m. Thursdays during the school term. If David wanted Expanded SPO terms, he would need to elect them on the record at the time of the order. Summer: 30 days for David with April 1 notice required.',
	},
	{
		title: 'Rebecca and Tom — she moves to Austin, he stays in Houston (170 miles)',
		summary: 'Over 100 miles: no Thursday visits, longer summer, spring break every year.',
		body: 'After Rebecca moved to Austin with their son, Tom\'s order reflects the over-100-miles rules (Sec. 153.313). No Thursday evening visits. Tom gets spring break every year instead of alternating. His summer block is 42 days: he must give written notice by April 1 each year to designate which weeks, or the default applies (June 15 through July 27). For regular weekends, Tom can elect either the 1st/3rd/5th schedule or up to one weekend per month of his choosing — but he must elect the one-weekend option in writing within 90 days of the parties beginning to live more than 100 miles apart.',
	},
];

// FAQ items
export interface FaqItem {
	question: string;
	answer: string;
}

export const faqItems: FaqItem[] = [
	{
		question: 'What is the Texas Standard Possession Order?',
		answer:
			'The Texas Standard Possession Order (SPO) is the default visitation schedule set out in Texas Family Code Chapter 153. It specifies when the noncustodial parent (called the "possessory conservator") has the child: 1st, 3rd, and 5th weekends each month from 6 p.m. Friday to 6 p.m. Sunday; Thursday evenings 6–8 p.m. during the school term; alternating holidays; and a 30-day summer block. Courts use it as the starting point in custody cases.',
	},
	{
		question: 'How does the 1st/3rd/5th weekend schedule work in practice?',
		answer:
			'Count the Fridays in any given month. The noncustodial parent gets the 1st, 3rd, and 5th of those Fridays. Possession begins at 6 p.m. Friday and ends at 6 p.m. Sunday. In months with only four Fridays, there is no 5th-weekend visit. The schedule resets each month — it is not every-other-weekend.',
	},
	{
		question: 'What is the difference between Standard SPO and Expanded SPO?',
		answer:
			'Standard SPO: weekends run 6 p.m. Friday to 6 p.m. Sunday; Thursday is a 6–8 p.m. same-evening visit (no overnight). Expanded SPO: weekends run from school dismissal Friday through school resumption Monday; Thursday becomes a school-dismissal-to-Friday-school-resumption overnight. For parents living 50 miles or less apart, Expanded SPO has been the automatic default since September 2021 under Sec. 153.3171.',
	},
	{
		question: 'What happens to holidays under the SPO?',
		answer:
			'Tex. Fam. Code § 153.314 governs SPO holidays. Christmas is split at noon December 28: in even years (2026), the noncustodial parent has the first half (school dismissal through noon Dec. 28). Thanksgiving alternates: even years (2026) = primary parent. Spring break within 100 miles alternates by year; noncustodial gets it in even years (2026). Mother\'s Day always goes to the mother; Father\'s Day always to the father. MLK Day, Memorial Day, July 4th, Labor Day, and President\'s Day are NOT in the statute — they follow the regular schedule.',
	},
	{
		question: 'Can parents change the SPO schedule by agreement?',
		answer:
			'Yes. Under Sec. 153.311, parents may agree to possession at any time mutually agreed in advance. The SPO schedule is the fallback when parents cannot agree. Courts can also approve agreed modifications that serve the child\'s best interest. Any changes from the standard order should be in writing to avoid disputes.',
	},
	{
		question: 'What if one parent moves more than 100 miles away?',
		answer:
			'The schedule changes significantly under Sec. 153.313: Thursday evening visits are eliminated; summer increases from 30 to 42 days (with a different default period: June 15 through July 27); the noncustodial parent gets spring break every year instead of alternating; and the noncustodial parent can elect to take one weekend per month of their choice (instead of 1st/3rd/5th) by written election within 90 days of moving beyond 100 miles.',
	},
	{
		question: 'At what age can a child choose which parent to live with in Texas?',
		answer:
			'There is no age at which a Texas child gets to simply "choose" their parent. At age 12 or older, the court must interview the child in chambers if a party requests it (Sec. 153.009). The judge listens to the child\'s preference — but the preference is not binding. The court retains full discretion to decide based on the child\'s best interest. Under age 12, the interview is discretionary.',
	},
	{
		question: 'Can a judge order something different from the standard schedule?',
		answer:
			'Yes. The SPO is a default; it is not mandatory in every case. Courts deviate when the standard schedule would not serve the child\'s best interest. Common reasons include domestic violence (Sec. 153.004 creates specific presumptions), substance abuse, parental fitness concerns, geographic distance, or the child\'s own circumstances.',
	},
	{
		question: 'How does summer possession work?',
		answer:
			'For parents within 100 miles: the noncustodial parent gets 30 days of summer possession. Must give written notice by April 1 designating specific dates. Can split into up to 2 periods of at least 7 consecutive days each. If no notice is given by April 1, the default is July 1 (6 p.m.) through July 31 (6 p.m.). For parents over 100 miles: 42 days; default if no notice is June 15 through July 27.',
	},
	{
		question: 'What is the "possessory conservator" in Texas?',
		answer:
			'Texas law calls the noncustodial parent the "possessory conservator." This is the parent who does not have primary residence of the child and whose time with the child is governed by the SPO schedule. The parent with primary residence is typically called the "managing conservator." In joint managing conservatorship (the default presumption), both parents share legal decision-making, but one is typically designated to determine the child\'s primary residence — that parent\'s counterpart is the possessory conservator who gets the SPO schedule.',
	},
];

export const faqSection = {
	title: 'Texas Standard Possession Order: Frequently Asked Questions',
	description:
		'Specific answers about how the Texas SPO works in practice — not general legal information.',
};

// Related links for internal linking
export const relatedLinks = [
	{
		label: 'Texas Parenting Plan Template',
		href: '/texas-parenting-plan-template/',
	},
	{
		label: 'Texas Child Support Calculator',
		href: '/texas-child-support-calculator/',
	},
	{
		label: 'Custody Schedule Generator',
		href: '/custody-schedule-generator/',
	},
	{
		label: '50/50 Custody Schedule',
		href: '/50-50-custody-schedule/',
	},
	{
		label: '2-2-3 Custody Schedule',
		href: '/2-2-3-custody-schedule/',
	},
];
