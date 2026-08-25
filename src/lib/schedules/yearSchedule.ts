import { addMonths, differenceInCalendarDays, format, parseISO, subDays } from 'date-fns';
import { generateCustodySchedule } from './engine';
import { generateSchedule } from './generateSchedule';
import { normalizeScheduleType } from './patterns';
import type {
	EightyTwentyPatternId,
	GeneratedSchedule,
	ParentNames,
	ScheduleInputType,
	ScheduleSummary,
	SeventyThirtyPatternId,
	SixtyFortyPatternId,
} from './types';

const MONTHS_PER_YEAR = 12;

const defaultParentNames: ParentNames = {
	parentA: 'Parent A',
	parentB: 'Parent B',
};

export interface YearScheduleOptions {
	scheduleId: ScheduleInputType;
	startDate: string | Date;
	parentNames?: Partial<ParentNames>;
	sixtyFortyPattern?: SixtyFortyPatternId;
	seventyThirtyPattern?: SeventyThirtyPatternId;
	eightyTwentyPattern?: EightyTwentyPatternId;
}

export interface YearSchedule {
	scheduleId: ReturnType<typeof normalizeScheduleType>;
	startDate: string;
	endDate: string;
	parentNames: ParentNames;
	months: GeneratedSchedule[];
	annualSummary: ScheduleSummary;
}

function normalizeDate(date: string | Date) {
	return date instanceof Date ? date : parseISO(date);
}

/**
 * Builds the 12 consecutive calendar-month grids that make up one paid
 * "My Custody Calendar" product, anchored to the customer's chosen start
 * date (e.g. start date Sep 1, 2026 -> September 2026 through August 2027).
 * Each month reuses the same free-tool month-grid logic so the paid product
 * and the free preview never disagree on any individual day's assignment.
 */
export function generateYearSchedule({
	scheduleId,
	startDate,
	parentNames,
	sixtyFortyPattern,
	seventyThirtyPattern,
	eightyTwentyPattern,
}: YearScheduleOptions): YearSchedule {
	const parsedStartDate = normalizeDate(startDate);
	const normalizedParents: ParentNames = { ...defaultParentNames, ...parentNames };

	const months = Array.from({ length: MONTHS_PER_YEAR }, (_, index) =>
		generateSchedule({
			scheduleId,
			startDate: parsedStartDate,
			monthDate: addMonths(parsedStartDate, index),
			parentNames: normalizedParents,
			sixtyFortyPattern,
			seventyThirtyPattern,
			eightyTwentyPattern,
		}),
	);

	// Last day of the 12-month span: the day before the same calendar date
	// one year later (e.g. Sep 1, 2026 start -> Aug 31, 2027 end). This
	// naturally spans 366 days instead of 365 whenever the window crosses
	// a Feb 29.
	const endDate = subDays(addMonths(parsedStartDate, MONTHS_PER_YEAR), 1);
	const numberOfDays = differenceInCalendarDays(endDate, parsedStartDate) + 1;

	const annualSchedule = generateCustodySchedule({
		scheduleType: scheduleId,
		startDate: parsedStartDate,
		numberOfDays,
		parentAName: normalizedParents.parentA,
		parentBName: normalizedParents.parentB,
		sixtyFortyPattern,
		seventyThirtyPattern,
		eightyTwentyPattern,
	});

	return {
		scheduleId: normalizeScheduleType(scheduleId),
		startDate: format(parsedStartDate, 'yyyy-MM-dd'),
		endDate: format(endDate, 'yyyy-MM-dd'),
		parentNames: normalizedParents,
		months,
		annualSummary: annualSchedule.summary,
	};
}
