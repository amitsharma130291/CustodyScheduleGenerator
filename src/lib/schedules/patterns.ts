import type { EightyTwentyPatternId, LegacyScheduleType, RatioSchedulePatternId, ScheduleInputType, SchedulePattern, ScheduleType, SeventyThirtyPatternId, SixtyFortyPatternId } from './types';

export const defaultSixtyFortyPattern: SixtyFortyPatternId = '4-3';
export const defaultSeventyThirtyPattern: SeventyThirtyPatternId = 'every-weekend';
export const defaultEightyTwentyPattern: EightyTwentyPatternId = 'every-other-weekend';

export const sixtyFortyPatternOptions: Array<{
	id: SixtyFortyPatternId;
	label: string;
	description: string;
	note: string;
}> = [
	{
		id: '4-3',
		label: '4-3 schedule',
		description: 'Parent A has 4 days and Parent B has 3 days each week. Often grouped under 60/40 schedules although the actual overnight split is about 57/43.',
		note: '',
	},
	{
		id: 'extended-weekend',
		label: 'Every extended weekend',
		description: 'Parent A has most weekdays while Parent B has a long weekend each week. Common practical 60/40 arrangement.',
		note: '',
	},
	{
		id: 'exact-60-40',
		label: 'Exact 60/40',
		description: 'Uses a repeating 10-day cycle with 6 overnights for one parent and 4 for the other. Mathematically exact 60/40.',
		note: '',
	},
];

export const seventyThirtyPatternOptions: Array<{
	id: SeventyThirtyPatternId;
	label: string;
	description: string;
	note: string;
}> = [
	{
		id: 'every-weekend',
		label: 'Every weekend',
		description: 'Parent A has Sunday through Thursday overnights. Parent B has Friday and Saturday overnights every week.',
		note: '5/2 weekly',
	},
	{
		id: '5-2',
		label: '5-2 schedule',
		description: 'One parent receives five overnights and the other parent receives two overnights each week. Approximate long-term split: 71% / 29% by overnights.',
		note: '5/2 overnights',
	},
	{
		id: 'every-3rd-week',
		label: 'Every 3rd week',
		description: 'Parent A receives two weeks, then Parent B receives one week. Long-term average: approximately 67% / 33% by overnights.',
		note: '2 weeks / 1 week',
	},
	{
		id: 'every-3rd-day',
		label: 'Every 3rd day',
		description: 'Parent A receives 2 consecutive overnights, then Parent B receives 1 overnight. The pattern repeats continuously and averages about 67% / 33% by overnights.',
		note: '2/1 cycle',
	},
	{
		id: 'alternating-weekends',
		label: 'Alternating weekends',
		description: 'Parent B has Friday and Saturday overnights every other weekend. Alternating weekends alone is approximately 86% / 14% by overnights.',
		note: 'Every other weekend',
	},
];

export const eightyTwentyPatternOptions: Array<{
	id: EightyTwentyPatternId;
	label: string;
	name: string;
	description: string;
	overnightSchedule: string;
	nonOvernightVisits: string;
	heroChips: [string, string];
	heroDecisionChip: string;
	bestFor: string;
	bestForPoints: string[];
	approxOvernightSplit: string;
	note: string;
	complexity: 'Low' | 'Medium' | 'High';
	expectedParentBRange: [number, number];
}> = [
	{
		id: 'every-other-weekend',
		label: 'Every other weekend',
		name: 'Every other weekend',
		description: 'Parent B has Friday and Saturday overnights every other weekend. Parent A has all remaining overnights.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights every other weekend.',
		nonOvernightVisits: 'None.',
		heroChips: ['Every Other Weekend', 'Overnights Only'],
		heroDecisionChip: 'Medium Complexity',
		bestFor: 'Primary-home schedules with predictable weekends and fewer exchanges.',
		bestForPoints: ['Simple arrangement', 'Lower-conflict planning', 'Parents living nearby'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Alternating weekends',
		complexity: 'Low',
		expectedParentBRange: [13, 16],
	},
	{
		id: 'every-weekend',
		label: 'Every weekend',
		name: 'Every weekend',
		description: 'Parent B has Friday and Saturday overnights every weekend. Parent A has Sunday through Thursday overnights.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights every weekend.',
		nonOvernightVisits: 'None.',
		heroChips: ['Every Weekend', 'Weekly'],
		heroDecisionChip: 'High Contact',
		bestFor: 'Families where Parent A handles school nights and Parent B has consistent weekend overnights.',
		bestForPoints: ['School-week primary home', 'Consistent weekend routine', 'Parents living nearby'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: '5/2 weekly',
		complexity: 'Low',
		expectedParentBRange: [27, 30],
	},
	{
		id: 'first-third-fifth-weekends',
		label: '1st, 3rd and 5th weekends',
		name: '1st, 3rd and 5th weekends',
		description: 'Parent B has Friday and Saturday overnights on the first, third, and fifth weekends of each month.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights on the 1st, 3rd, and 5th weekends.',
		nonOvernightVisits: 'None.',
		heroChips: ['1st/3rd/5th Weekends', 'Monthly'],
		heroDecisionChip: 'Monthly',
		bestFor: 'Families using monthly weekend rules with occasional fifth-weekend time.',
		bestForPoints: ['Predictable monthly routine', 'Common court order pattern', 'Families tracking weekends by month'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Monthly weekend rule',
		complexity: 'Medium',
		expectedParentBRange: [17, 23],
	},
	{
		id: 'second-fourth-fifth-weekends',
		label: '2nd, 4th and 5th weekends',
		name: '2nd, 4th and 5th weekends',
		description: 'Parent B has Friday and Saturday overnights on the second, fourth, and fifth weekends of each month.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights on the 2nd, 4th, and 5th weekends.',
		nonOvernightVisits: 'None.',
		heroChips: ['2nd/4th/5th Weekends', 'Monthly'],
		heroDecisionChip: 'Monthly',
		bestFor: 'Families coordinating around first-weekend work, travel, or activity conflicts.',
		bestForPoints: ['Alternate monthly preference', 'Recurring first-weekend conflicts', 'Families tracking weekends by month'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Monthly weekend rule',
		complexity: 'Medium',
		expectedParentBRange: [17, 23],
	},
	{
		id: 'every-3rd-weekend',
		label: 'Every 3rd weekend',
		name: 'Every 3rd weekend',
		description: 'Parent B has Friday and Saturday overnights every third weekend. Parent A has all remaining overnights.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights every third weekend.',
		nonOvernightVisits: 'None.',
		heroChips: ['Every 3rd Weekend', 'Reduced Exchanges'],
		heroDecisionChip: 'Low Exchanges',
		bestFor: 'Long-distance schedules or families trying to reduce exchanges.',
		bestForPoints: ['Reduced visitation frequency', 'Long-distance situations', 'Fewer exchanges'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Every third weekend',
		complexity: 'Low',
		expectedParentBRange: [8, 11],
	},
	{
		id: 'every-other-weekend-midweek-dinner',
		label: 'Every other weekend + midweek dinner',
		name: 'Every other weekend + midweek dinner',
		description: 'Parent B has Friday and Saturday overnights every other weekend, plus a midweek dinner visit that does not add an overnight.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights every other weekend.',
		nonOvernightVisits: 'Includes a midweek dinner visit. Dinner visits are shown in the explanation only and are not counted as overnights.',
		heroChips: ['Every Other Weekend', 'Midweek Dinner'],
		heroDecisionChip: 'Medium Complexity',
		bestFor: 'Families wanting midweek contact while keeping overnight counts close to alternating weekends.',
		bestForPoints: ['Additional contact without overnight', 'School-aged children', 'Parents living nearby'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Dinner visit is not counted as an overnight',
		complexity: 'Medium',
		expectedParentBRange: [13, 16],
	},
	{
		id: 'every-other-weekend-one-overnight',
		label: 'Every other weekend + one weekday overnight',
		name: 'Every other weekend + one weekday overnight',
		description: 'Parent B has Friday and Saturday overnights every other weekend, plus one weekday overnight during the opposite week.',
		overnightSchedule: 'Parent B has Friday and Saturday overnights every other weekend, plus one weekday overnight during the opposite week.',
		nonOvernightVisits: 'None. The added weekday is an overnight and affects percentages.',
		heroChips: ['Every Other Weekend', 'Weekday Overnight'],
		heroDecisionChip: 'Closer to 80/20',
		bestFor: 'Families wanting alternating weekends with one added school-week overnight.',
		bestForPoints: ['Increased involvement', 'Closer to true 80/20', 'One recurring school-week overnight'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Adds one weekday overnight per two-week cycle',
		complexity: 'Medium',
		expectedParentBRange: [20, 23],
	},
	{
		id: 'long-distance',
		label: 'Long distance 80/20',
		name: 'Long distance 80/20',
		description: 'Parent B has one longer block about every five weeks. This keeps exchanges less frequent while preserving recurring overnights.',
		overnightSchedule: 'Parent B has one 7-night block about every five weeks.',
		nonOvernightVisits: 'None.',
		heroChips: ['Long Distance', '7-Night Block'],
		heroDecisionChip: 'Travel Friendly',
		bestFor: 'Long-distance parenting plans where travel makes frequent weekends difficult.',
		bestForPoints: ['Fewer exchanges', 'Longer parenting blocks', 'Parents living far apart'],
		approxOvernightSplit: 'Calculated from generated overnights',
		note: 'Longer blocks, fewer exchanges',
		complexity: 'High',
		expectedParentBRange: [18, 22],
	},
];

export type RatioScheduleId = '60-40' | '70-30' | '80-20';

export interface RatioSchedulePatternOption {
	id: RatioSchedulePatternId;
	label: string;
	description: string;
	note: string;
	name?: string;
	overnightSchedule?: string;
	nonOvernightVisits?: string;
	heroChips?: [string, string];
	heroDecisionChip?: string;
	bestFor?: string;
	bestForPoints?: string[];
	approxOvernightSplit?: string;
	complexity?: 'Low' | 'Medium' | 'High';
	expectedParentBRange?: [number, number];
}

export const ratioSchedulePatternOptions: Record<RatioScheduleId, RatioSchedulePatternOption[]> = {
	'60-40': sixtyFortyPatternOptions,
	'70-30': seventyThirtyPatternOptions,
	'80-20': eightyTwentyPatternOptions,
};

export const defaultRatioSchedulePatterns: Record<RatioScheduleId, RatioSchedulePatternId> = {
	'60-40': defaultSixtyFortyPattern,
	'70-30': defaultSeventyThirtyPattern,
	'80-20': defaultEightyTwentyPattern,
};

export const schedulePatterns: Record<ScheduleType, SchedulePattern> = {
	'223': {
		id: '223',
		slug: '2-2-3-custody-schedule',
		name: '2-2-3 custody schedule',
		shortName: '2-2-3',
		description: 'A two-week rotation where parents alternate two days, two days, then a three-day weekend.',
		pattern: [
			{ parent: 'A', days: 2 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 3 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 2 },
			{ parent: 'B', days: 3 },
		],
	},
	'2255': {
		id: '2255',
		slug: '2-2-5-5-custody-schedule',
		name: '2-2-5-5 custody schedule',
		shortName: '2-2-5-5',
		description: 'A repeating two-week rotation with two short blocks and two five-day blocks.',
		pattern: [
			{ parent: 'A', days: 2 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 5 },
			{ parent: 'B', days: 5 },
		],
	},
	'5225': {
		id: '5225',
		slug: '5-2-2-5-custody-schedule',
		name: '5-2-2-5 custody schedule',
		shortName: '5-2-2-5',
		description: 'A 50/50 rotation that keeps weekdays more consistent while alternating longer blocks.',
		pattern: [
			{ parent: 'A', days: 5 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 2 },
			{ parent: 'B', days: 5 },
		],
	},
	'3443': {
		id: '3443',
		slug: '3-4-4-3-custody-schedule',
		name: '3-4-4-3 custody schedule',
		shortName: '3-4-4-3',
		description: 'A two-week rotation that alternates three- and four-day parenting blocks.',
		pattern: [
			{ parent: 'A', days: 3 },
			{ parent: 'B', days: 4 },
			{ parent: 'A', days: 4 },
			{ parent: 'B', days: 3 },
		],
	},
	'week-on-week-off': {
		id: 'week-on-week-off',
		slug: 'week-on-week-off-custody-schedule',
		name: 'Week-on week-off custody schedule',
		shortName: 'Week on/week off',
		description: 'A simple alternating weekly custody schedule with fewer exchanges.',
		pattern: [
			{ parent: 'A', days: 7 },
			{ parent: 'B', days: 7 },
		],
	},
	'every-other-weekend': {
		id: 'every-other-weekend',
		slug: 'every-other-weekend-custody-schedule',
		name: 'Every other weekend custody schedule',
		shortName: 'Every other weekend',
		description: 'A primary-parent schedule with alternating Friday and Saturday weekend overnights for the other parent.',
		pattern: [
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 12 },
		],
	},
	'60-40': {
		id: '60-40',
		slug: '60-40-custody-schedule',
		name: '60/40 custody schedule',
		shortName: '60/40',
		description: 'A 60/40-style custody schedule with selectable 4-3, extended weekend, and exact 60/40 patterns.',
		pattern: [
			{ parent: 'A', days: 4 },
			{ parent: 'B', days: 3 },
		],
	},
	'70-30': {
		id: '70-30',
		slug: '70-30-custody-schedule',
		name: '70/30 custody schedule',
		shortName: '70/30',
		description: 'A 70/30-style custody schedule with selectable weekend, 5-2, every-third-week, every-third-day, and alternating-weekend patterns.',
		pattern: [
			{ parent: 'A', days: 5 },
			{ parent: 'B', days: 2 },
		],
	},
	'80-20': {
		id: '80-20',
		slug: '80-20-custody-schedule',
		name: '80/20 custody schedule',
		shortName: '80/20',
		description: 'An 80/20-style custody schedule where Parent A has a strong majority of overnights and Parent B has recurring scheduled overnights.',
		pattern: [
			{ parent: 'A', days: 4 },
			{ parent: 'B', days: 1 },
		],
	},
};

export const legacyScheduleTypeMap: Record<LegacyScheduleType, ScheduleType> = {
	'2-2-3': '223',
	'2-2-5-5': '2255',
	'5-2-2-5': '5225',
	'3-4-4-3': '3443',
	'50-50': '223',
	'every-other-weekend': 'every-other-weekend',
	'60-40': '60-40',
	'60/40': '60-40',
	'70-30': '70-30',
	'70/30': '70-30',
	'80-20': '80-20',
	'80/20': '80-20',
};

export function normalizeScheduleType(scheduleType: ScheduleInputType): ScheduleType {
	if (scheduleType in schedulePatterns) {
		return scheduleType as ScheduleType;
	}

	if (scheduleType in legacyScheduleTypeMap) {
		return legacyScheduleTypeMap[scheduleType as LegacyScheduleType];
	}

	throw new Error(`Invalid schedule type "${scheduleType}". Supported schedule types: ${Object.keys(schedulePatterns).join(', ')}.`);
}
