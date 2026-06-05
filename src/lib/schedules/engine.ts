import { addDays, differenceInCalendarDays, endOfMonth, format, isValid, isSameMonth, parseISO, startOfMonth } from 'date-fns';
import { normalizeScheduleType, schedulePatterns } from './patterns';
import type {
	GenerateCustodyScheduleOptions,
	GenerateVisibleMonthScheduleOptions,
	ScheduleDay,
	ScheduleInputType,
	SchedulePattern,
	ScheduleResult,
	ScheduleSummary,
	ScheduleType,
} from './types';

const defaultNumberOfDays = 365;
const defaultParentAName = 'Parent A';
const defaultParentBName = 'Parent B';

function parseStartDate(startDate: string | Date) {
	const parsedDate = startDate instanceof Date ? startDate : parseISO(startDate);

	if (!isValid(parsedDate)) {
		throw new Error(`Invalid start date "${String(startDate)}". Use a valid date, such as 2026-01-01.`);
	}

	return parsedDate;
}

function validateNumberOfDays(numberOfDays: number) {
	if (!Number.isInteger(numberOfDays) || numberOfDays <= 0) {
		throw new Error('numberOfDays must be a positive integer.');
	}
}

function getPatternPosition(pattern: SchedulePattern['pattern'], dayIndex: number) {
	const cycleLength = pattern.reduce((total, segment) => total + segment.days, 0);
	const normalizedIndex = dayIndex % cycleLength;
	let cursor = 0;

	for (let patternIndex = 0; patternIndex < pattern.length; patternIndex += 1) {
		cursor += pattern[patternIndex].days;
		if (normalizedIndex < cursor) {
			return {
				parent: pattern[patternIndex].parent,
				patternIndex,
			};
		}
	}

	return {
		parent: pattern[0].parent,
		patternIndex: 0,
	};
}

export function getAllSchedules() {
	return Object.values(schedulePatterns);
}

export function getScheduleBySlug(slug: string) {
	return getAllSchedules().find((schedule) => schedule.slug === slug);
}

export function getSchedulePattern(scheduleType: ScheduleInputType) {
	const normalizedType = normalizeScheduleType(scheduleType);
	return schedulePatterns[normalizedType];
}

export function calculateParentingTime(days: ScheduleDay[]): ScheduleSummary {
	const parentADays = days.filter((day) => day.parent === 'A').length;
	const parentBDays = days.filter((day) => day.parent === 'B').length;
	const totalDays = parentADays + parentBDays;
	const parentAPercentage = totalDays === 0 ? 0 : Math.round((parentADays / totalDays) * 100);
	const parentBPercentage = totalDays === 0 ? 0 : 100 - parentAPercentage;

	return {
		parentADays,
		parentBDays,
		parentAPercentage,
		parentBPercentage,
		totalDays,
	};
}

export function generateCustodySchedule({
	scheduleType,
	startDate,
	numberOfDays = defaultNumberOfDays,
	parentAName = defaultParentAName,
	parentBName = defaultParentBName,
}: GenerateCustodyScheduleOptions): ScheduleResult {
	validateNumberOfDays(numberOfDays);

	const pattern = getSchedulePattern(scheduleType);
	const parsedStartDate = parseStartDate(startDate);
	const days: ScheduleDay[] = Array.from({ length: numberOfDays }, (_, dayIndex) => {
		const date = addDays(parsedStartDate, dayIndex);
		const { parent, patternIndex } = getPatternPosition(pattern.pattern, dayIndex);

		return {
			date: format(date, 'yyyy-MM-dd'),
			parent,
			parentName: parent === 'A' ? parentAName : parentBName,
			dayIndex,
			patternIndex,
		};
	});

	return {
		days,
		summary: calculateParentingTime(days),
	};
}

export function generateVisibleMonthSchedule({
	scheduleType,
	startDate,
	monthDate = startDate,
	parentAName = defaultParentAName,
	parentBName = defaultParentBName,
}: GenerateVisibleMonthScheduleOptions): ScheduleResult {
	const parsedStartDate = parseStartDate(startDate);
	const parsedMonthDate = parseStartDate(monthDate);
	const monthStart = startOfMonth(parsedMonthDate);
	const monthEnd = endOfMonth(parsedMonthDate);

	if (monthEnd < parsedStartDate) {
		return {
			days: [],
			summary: calculateParentingTime([]),
		};
	}

	const numberOfDays = differenceInCalendarDays(monthEnd, parsedStartDate) + 1;
	const generatedSchedule = generateCustodySchedule({
		scheduleType,
		startDate: parsedStartDate,
		numberOfDays,
		parentAName,
		parentBName,
	});
	const days = generatedSchedule.days.filter((day) => isSameMonth(parseISO(day.date), monthStart));

	return {
		days,
		summary: calculateParentingTime(days),
	};
}

export type { ScheduleInputType, ScheduleType };
