import type { LegacyScheduleType, ScheduleInputType, SchedulePattern, ScheduleType, SixtyFortyPatternId } from './types';

export const defaultSixtyFortyPattern: SixtyFortyPatternId = '4-3';

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
		description: 'A primary-parent schedule with alternating three-day weekend blocks for the other parent.',
		pattern: [
			{ parent: 'B', days: 3 },
			{ parent: 'A', days: 11 },
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
