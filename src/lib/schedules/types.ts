export type ParentKey = 'parentA' | 'parentB';

export type ScheduleId =
	| '2-2-3'
	| '2-2-5-5'
	| '5-2-2-5'
	| '3-4-4-3'
	| 'week-on-week-off'
	| '50-50';

export interface ParentNames {
	parentA: string;
	parentB: string;
}

export interface ScheduleSegment {
	parent: ParentKey;
	days: number;
}

export interface ScheduleDefinition {
	id: ScheduleId;
	name: string;
	shortName: string;
	description: string;
	cycle: ScheduleSegment[];
}

export interface GeneratedDay {
	date: string;
	dayOfMonth: number;
	weekday: string;
	parent: ParentKey;
	parentName: string;
	isCurrentMonth: boolean;
}

export interface GeneratedSchedule {
	definition: ScheduleDefinition;
	monthLabel: string;
	startDate: string;
	parentNames: ParentNames;
	days: GeneratedDay[];
	parentDayCounts: Record<ParentKey, number>;
}
