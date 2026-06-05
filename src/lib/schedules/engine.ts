import { addDays, differenceInCalendarDays, endOfMonth, format, getDay, isValid, isSameMonth, parseISO, startOfMonth } from 'date-fns';
import { defaultSixtyFortyPattern, normalizeScheduleType, schedulePatterns, sixtyFortyPatternOptions } from './patterns';
import type {
	GenerateCustodyScheduleOptions,
	GenerateVisibleMonthScheduleOptions,
	ScheduleDay,
	ScheduleInputType,
	SchedulePattern,
	ScheduleResult,
	ScheduleSummary,
	ScheduleType,
	SixtyFortyPatternId,
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

function getFirstFridayOnOrAfter(date: Date) {
	const friday = 5;
	const daysUntilFriday = (friday - getDay(date) + 7) % 7;
	return addDays(date, daysUntilFriday);
}

function getEveryOtherWeekendPosition(date: Date, startDate: Date) {
	const firstWeekendStart = getFirstFridayOnOrAfter(startDate);
	const daysFromFirstWeekend = differenceInCalendarDays(date, firstWeekendStart);

	if (daysFromFirstWeekend < 0) {
		return {
			parent: 'A' as const,
			patternIndex: 1,
		};
	}

	const cycleDay = daysFromFirstWeekend % 14;
	const isParentBWeekend = cycleDay >= 0 && cycleDay <= 2;

	return {
		parent: isParentBWeekend ? 'B' as const : 'A' as const,
		patternIndex: isParentBWeekend ? 0 : 1,
	};
}

function normalizeSixtyFortyPattern(pattern?: string | null): SixtyFortyPatternId {
	return sixtyFortyPatternOptions.some((option) => option.id === pattern)
		? pattern as SixtyFortyPatternId
		: defaultSixtyFortyPattern;
}

function getSixtyFortyPattern(pattern?: SixtyFortyPatternId): SchedulePattern['pattern'] {
	const normalizedPattern = normalizeSixtyFortyPattern(pattern);

	if (normalizedPattern === 'exact-60-40') {
		return [
			{ parent: 'A', days: 3 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 3 },
			{ parent: 'B', days: 2 },
		];
	}

	return [
		{ parent: 'A', days: 4 },
		{ parent: 'B', days: 3 },
	];
}

function getSixtyFortyPosition(date: Date, dayIndex: number, pattern?: SixtyFortyPatternId) {
	const normalizedPattern = normalizeSixtyFortyPattern(pattern);

	if (normalizedPattern === 'extended-weekend') {
		const dayOfWeek = getDay(date);
		const isParentBWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;

		return {
			parent: isParentBWeekend ? 'B' as const : 'A' as const,
			patternIndex: isParentBWeekend ? 1 : 0,
		};
	}

	return getPatternPosition(getSixtyFortyPattern(normalizedPattern), dayIndex);
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
	sixtyFortyPattern,
}: GenerateCustodyScheduleOptions): ScheduleResult {
	validateNumberOfDays(numberOfDays);

	const pattern = getSchedulePattern(scheduleType);
	const parsedStartDate = parseStartDate(startDate);
	const days: ScheduleDay[] = Array.from({ length: numberOfDays }, (_, dayIndex) => {
		const date = addDays(parsedStartDate, dayIndex);
		const { parent, patternIndex } = pattern.id === 'every-other-weekend'
			? getEveryOtherWeekendPosition(date, parsedStartDate)
			: pattern.id === '60-40'
				? getSixtyFortyPosition(date, dayIndex, sixtyFortyPattern)
				: getPatternPosition(pattern.pattern, dayIndex);

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
	sixtyFortyPattern,
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
		sixtyFortyPattern,
	});
	const days = generatedSchedule.days.filter((day) => isSameMonth(parseISO(day.date), monthStart));

	return {
		days,
		summary: calculateParentingTime(days),
	};
}

export { normalizeSixtyFortyPattern };
export type { ScheduleInputType, ScheduleType };
