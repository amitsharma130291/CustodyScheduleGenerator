export type Parent = 'A' | 'B';

export type ParentKey = 'parentA' | 'parentB';

export type ScheduleType = '223' | '2255' | '5225' | '3443' | 'week-on-week-off' | 'every-other-weekend' | '60-40' | '70-30' | '80-20';

export type LegacyScheduleType =
	| '2-2-3'
	| '2-2-5-5'
	| '5-2-2-5'
	| '3-4-4-3'
	| '50-50'
	| 'every-other-weekend'
	| '60-40'
	| '60/40'
	| '70-30'
	| '70/30'
	| '80-20'
	| '80/20';

export type ScheduleId = ScheduleType;

export type ScheduleInputType = ScheduleType | LegacyScheduleType;

export type SixtyFortyPatternId = '4-3' | 'extended-weekend' | 'exact-60-40';

export type SeventyThirtyPatternId = 'every-weekend' | '5-2' | 'every-3rd-week' | 'every-3rd-day' | 'alternating-weekends';

export type EightyTwentyPatternId =
	| 'every-other-weekend'
	| 'every-weekend'
	| 'first-third-fifth-weekends'
	| 'second-fourth-fifth-weekends'
	| 'every-3rd-weekend'
	| 'every-other-weekend-midweek-dinner'
	| 'every-other-weekend-one-overnight'
	| 'long-distance';

export type RatioSchedulePatternId = SixtyFortyPatternId | SeventyThirtyPatternId | EightyTwentyPatternId;

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

export type ScheduleEventType = 'dinner' | 'day-visit' | 'school-pickup' | 'exchange';

export interface ScheduleEvent {
	date: string;
	type: ScheduleEventType;
	label: string;
	icon: string;
	time?: string;
	parent?: Parent;
	parentName?: string;
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
	events?: ScheduleEvent[];
	patternSummary?: GeneratedPatternSummary;
}

export interface GeneratedPatternSummary {
	overnightCounts: ScheduleSummary;
	annualAverage: ScheduleSummary;
	explanatoryText: string;
	exchangeFrequencyText: string;
	complexity: 'Low' | 'Medium' | 'High';
	bestFor: string[];
	validationWarnings: string[];
}

export interface GenerateCustodyScheduleOptions {
	scheduleType: ScheduleInputType;
	startDate: string | Date;
	numberOfDays?: number;
	parentAName?: string;
	parentBName?: string;
	sixtyFortyPattern?: SixtyFortyPatternId;
	seventyThirtyPattern?: SeventyThirtyPatternId;
	eightyTwentyPattern?: EightyTwentyPatternId;
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
	events?: ScheduleEvent[];
}

export interface GeneratedSchedule {
	definition: ScheduleDefinition;
	monthLabel: string;
	startDate: string;
	parentNames: ParentNames;
	days: GeneratedDay[];
	parentDayCounts: Record<ParentKey, number>;
	events?: ScheduleEvent[];
	patternSummary?: GeneratedPatternSummary;
}
