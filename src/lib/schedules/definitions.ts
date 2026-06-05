import type { ScheduleDefinition, ScheduleId } from './types';

export const scheduleDefinitions: Record<ScheduleId, ScheduleDefinition> = {
	'2-2-3': {
		id: '2-2-3',
		name: '2-2-3 custody schedule',
		shortName: '2-2-3',
		description: 'A two-week rotation where parents alternate two days, two days, then a three-day weekend.',
		cycle: [
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 3 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 3 },
		],
	},
	'2-2-5-5': {
		id: '2-2-5-5',
		name: '2-2-5-5 custody schedule',
		shortName: '2-2-5-5',
		description: 'A repeating two-week rotation with two short blocks and two five-day blocks.',
		cycle: [
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 5 },
			{ parent: 'parentB', days: 5 },
		],
	},
	'5-2-2-5': {
		id: '5-2-2-5',
		name: '5-2-2-5 custody schedule',
		shortName: '5-2-2-5',
		description: 'A 50/50 rotation that keeps weekdays more consistent while alternating longer blocks.',
		cycle: [
			{ parent: 'parentA', days: 5 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 5 },
		],
	},
	'3-4-4-3': {
		id: '3-4-4-3',
		name: '3-4-4-3 custody schedule',
		shortName: '3-4-4-3',
		description: 'A two-week rotation that alternates three- and four-day parenting blocks.',
		cycle: [
			{ parent: 'parentA', days: 3 },
			{ parent: 'parentB', days: 4 },
			{ parent: 'parentA', days: 4 },
			{ parent: 'parentB', days: 3 },
		],
	},
	'week-on-week-off': {
		id: 'week-on-week-off',
		name: 'Week-on week-off custody schedule',
		shortName: 'Week on/week off',
		description: 'A simple alternating weekly custody schedule with fewer exchanges.',
		cycle: [
			{ parent: 'parentA', days: 7 },
			{ parent: 'parentB', days: 7 },
		],
	},
	'50-50': {
		id: '50-50',
		name: '50/50 custody schedule',
		shortName: '50/50',
		description: 'A shared custody schedule designed to divide parenting time evenly.',
		cycle: [
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 3 },
			{ parent: 'parentB', days: 2 },
			{ parent: 'parentA', days: 2 },
			{ parent: 'parentB', days: 3 },
		],
	},
};

export const scheduleDefinitionList = Object.values(scheduleDefinitions);
