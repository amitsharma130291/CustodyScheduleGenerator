export type Parent = 'A' | 'B';

export type ParentKey = 'parentA' | 'parentB';

export type ScheduleType = '223' | '2255' | '5225' | '3443' | 'week-on-week-off';

export type LegacyScheduleType =
	| '2-2-3'
	| '2-2-5-5'
	| '5-2-2-5'
	| '3-4-4-3'
	| '50-50';

export type ScheduleId = ScheduleType;

export type ScheduleInputType = ScheduleType | LegacyScheduleType;

export interface ParentNames {
	parentA: string;
	parentB: string;
}

export interface ScheduleSegment {
	parent: Parent;
	days: number;
}

export interface SchedulePattern {
	id: ScheduleType;
	slug: string;
	name: string;
	shortName: string;
	description: string;
	pattern: ScheduleSegment[];
}

export interface ScheduleDay {
	date: string;
	parent: Parent;
	parentName: string;
	dayIndex: number;
	patternIndex: number;
}

export interface ScheduleSummary {
	parentADays: number;
	parentBDays: number;
	parentAPercentage: number;
	parentBPercentage: number;
	totalDays: number;
}

export interface ScheduleResult {
	days: ScheduleDay[];
	summary: ScheduleSummary;
}

export interface GenerateCustodyScheduleOptions {
	scheduleType: ScheduleInputType;
	startDate: string | Date;
	numberOfDays?: number;
	parentAName?: string;
	parentBName?: string;
}

export interface GenerateVisibleMonthScheduleOptions extends Omit<GenerateCustodyScheduleOptions, 'numberOfDays'> {
	monthDate?: string | Date;
}

export interface ScheduleDefinition {
	id: ScheduleType;
	name: string;
	shortName: string;
	description: string;
	cycle: ScheduleSegment[];
	slug: string;
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
