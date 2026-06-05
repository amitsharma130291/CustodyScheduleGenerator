import { addDays, differenceInCalendarDays, endOfMonth, format, getDay, isValid, isSameMonth, parseISO, startOfMonth } from 'date-fns';
import { defaultEightyTwentyPattern, defaultSeventyThirtyPattern, defaultSixtyFortyPattern, eightyTwentyPatternOptions, normalizeScheduleType, schedulePatterns, seventyThirtyPatternOptions, sixtyFortyPatternOptions } from './patterns';
import type {
	EightyTwentyPatternId,
	GenerateCustodyScheduleOptions,
	GenerateVisibleMonthScheduleOptions,
	ScheduleDay,
	ScheduleEvent,
	ScheduleInputType,
	ScheduleResult,
	ScheduleSummary,
	SchedulePattern,
	ScheduleType,
	SeventyThirtyPatternId,
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

function getFridayOfSameMondayWeek(date: Date) {
	const daysFromMonday = (getDay(date) + 6) % 7;
	const fridayOffsetFromMonday = 4;
	return addDays(date, fridayOffsetFromMonday - daysFromMonday);
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
	const isParentBWeekend = cycleDay >= 0 && cycleDay <= 1;

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

function normalizeSeventyThirtyPattern(pattern?: string | null): SeventyThirtyPatternId {
	return seventyThirtyPatternOptions.some((option) => option.id === pattern)
		? pattern as SeventyThirtyPatternId
		: defaultSeventyThirtyPattern;
}

function normalizeEightyTwentyPattern(pattern?: string | null): EightyTwentyPatternId {
	return eightyTwentyPatternOptions.some((option) => option.id === pattern)
		? pattern as EightyTwentyPatternId
		: defaultEightyTwentyPattern;
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

function getSeventyThirtyPattern(pattern?: SeventyThirtyPatternId): SchedulePattern['pattern'] {
	const normalizedPattern = normalizeSeventyThirtyPattern(pattern);

	if (normalizedPattern === 'every-3rd-week') {
		return [
			{ parent: 'A', days: 14 },
			{ parent: 'B', days: 7 },
		];
	}

	if (normalizedPattern === 'every-3rd-day') {
		return [
			{ parent: 'A', days: 2 },
			{ parent: 'B', days: 1 },
		];
	}

	if (normalizedPattern === 'alternating-weekends') {
		return [
			{ parent: 'A', days: 5 },
			{ parent: 'B', days: 2 },
			{ parent: 'A', days: 7 },
		];
	}

	return [
		{ parent: 'A', days: 5 },
		{ parent: 'B', days: 2 },
	];
}

function getSeventyThirtyAlternatingWeekendPosition(date: Date, startDate: Date) {
	const firstWeekendStart = getFridayOfSameMondayWeek(startDate);
	const daysFromFirstWeekend = differenceInCalendarDays(date, firstWeekendStart);

	if (daysFromFirstWeekend < 0) {
		return {
			parent: 'A' as const,
			patternIndex: 0,
		};
	}

	const cycleDay = daysFromFirstWeekend % 14;
	const isParentBWeekend = cycleDay >= 0 && cycleDay <= 1;

	return {
		parent: isParentBWeekend ? 'B' as const : 'A' as const,
		patternIndex: isParentBWeekend ? 1 : 0,
	};
}

function getSeventyThirtyPosition(date: Date, startDate: Date, dayIndex: number, pattern?: SeventyThirtyPatternId) {
	const normalizedPattern = normalizeSeventyThirtyPattern(pattern);

	if (normalizedPattern === 'every-weekend') {
		const dayOfWeek = getDay(date);
		const isParentBWeekend = dayOfWeek === 5 || dayOfWeek === 6;

		return {
			parent: isParentBWeekend ? 'B' as const : 'A' as const,
			patternIndex: isParentBWeekend ? 1 : 0,
		};
	}

	if (normalizedPattern === 'alternating-weekends') {
		return getSeventyThirtyAlternatingWeekendPosition(date, startDate);
	}

	return getPatternPosition(getSeventyThirtyPattern(normalizedPattern), dayIndex);
}

function getWeekendNumberInMonth(date: Date) {
	const dayOfWeek = getDay(date);
	const friday = dayOfWeek === 6 ? addDays(date, -1) : date;
	return Math.floor((friday.getDate() - 1) / 7) + 1;
}

function getEightyTwentyWeekendPosition(date: Date, startDate: Date, cycleLength: number) {
	const firstWeekendStart = getFridayOfSameMondayWeek(startDate);
	const daysFromFirstWeekend = differenceInCalendarDays(date, firstWeekendStart);

	if (daysFromFirstWeekend < 0) {
		return {
			parent: 'A' as const,
			patternIndex: 0,
		};
	}

	const cycleDay = daysFromFirstWeekend % cycleLength;
	const isParentBWeekend = cycleDay === 0 || cycleDay === 1;

	return {
		parent: isParentBWeekend ? 'B' as const : 'A' as const,
		patternIndex: isParentBWeekend ? 1 : 0,
	};
}

function getEightyTwentyPosition(date: Date, startDate: Date, dayIndex: number, pattern?: EightyTwentyPatternId) {
	const normalizedPattern = normalizeEightyTwentyPattern(pattern);
	const dayOfWeek = getDay(date);

	if (normalizedPattern === 'every-weekend') {
		const isParentBWeekend = dayOfWeek === 5 || dayOfWeek === 6;

		return {
			parent: isParentBWeekend ? 'B' as const : 'A' as const,
			patternIndex: isParentBWeekend ? 1 : 0,
		};
	}

	if (normalizedPattern === 'first-third-fifth-weekends' || normalizedPattern === 'second-fourth-fifth-weekends') {
		const weekendNumber = getWeekendNumberInMonth(date);
		const isWeekendOvernight = dayOfWeek === 5 || dayOfWeek === 6;
		const selectedWeekendNumbers = normalizedPattern === 'first-third-fifth-weekends' ? [1, 3, 5] : [2, 4, 5];
		const isParentBWeekend = isWeekendOvernight && selectedWeekendNumbers.includes(weekendNumber);

		return {
			parent: isParentBWeekend ? 'B' as const : 'A' as const,
			patternIndex: isParentBWeekend ? 1 : 0,
		};
	}

	if (normalizedPattern === 'every-3rd-weekend') {
		return getEightyTwentyWeekendPosition(date, startDate, 21);
	}

	if (normalizedPattern === 'every-other-weekend' || normalizedPattern === 'every-other-weekend-midweek-dinner') {
		return getEightyTwentyWeekendPosition(date, startDate, 14);
	}

	if (normalizedPattern === 'every-other-weekend-one-overnight') {
		const firstWeekendStart = getFridayOfSameMondayWeek(startDate);
		const daysFromFirstWeekend = differenceInCalendarDays(date, firstWeekendStart);

		if (daysFromFirstWeekend < 0) {
			return {
				parent: 'A' as const,
				patternIndex: 0,
			};
		}

		const cycleDay = daysFromFirstWeekend % 14;
		const isParentBOvernight = cycleDay === 0 || cycleDay === 1 || cycleDay === 12;

		return {
			parent: isParentBOvernight ? 'B' as const : 'A' as const,
			patternIndex: isParentBOvernight ? 1 : 0,
		};
	}

	if (normalizedPattern === 'long-distance') {
		return getPatternPosition([
			{ parent: 'B', days: 7 },
			{ parent: 'A', days: 28 },
		], dayIndex);
	}

	return getPatternPosition([
		{ parent: 'A', days: 4 },
		{ parent: 'B', days: 1 },
	], dayIndex);
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

function getEightyTwentyOption(pattern?: EightyTwentyPatternId) {
	const normalizedPattern = normalizeEightyTwentyPattern(pattern);
	return eightyTwentyPatternOptions.find((option) => option.id === normalizedPattern) ?? eightyTwentyPatternOptions.find((option) => option.id === defaultEightyTwentyPattern);
}

function createExchangeEvent(day: ScheduleDay, previousDay: ScheduleDay): ScheduleEvent {
	const date = parseISO(day.date);
	const isReturnToParentA = previousDay.parent === 'B' && day.parent === 'A';
	const label = isReturnToParentA ? `${format(date, 'EEE')} 6 PM Return` : `${format(date, 'EEE')} 6 PM Exchange`;

	return {
		date: day.date,
		type: 'exchange',
		label,
		icon: '⇄',
		time: '6 PM',
		parent: day.parent,
		parentName: day.parentName,
	};
}

function createScheduleEvents(days: ScheduleDay[], scheduleType: ScheduleType, parentBName: string, pattern?: EightyTwentyPatternId): ScheduleEvent[] {
	const events: ScheduleEvent[] = [];
	const normalizedPattern = scheduleType === '80-20' ? normalizeEightyTwentyPattern(pattern) : undefined;

	for (let index = 1; index < days.length; index += 1) {
		const day = days[index];
		const previousDay = days[index - 1];

		if (day.parent !== previousDay.parent) {
			events.push(createExchangeEvent(day, previousDay));
		}
	}

	if (scheduleType === '80-20' && normalizedPattern === 'every-other-weekend-midweek-dinner') {
		for (const day of days) {
			const date = parseISO(day.date);
			if (getDay(date) === 3 && day.parent === 'A') {
				events.push({
					date: day.date,
					type: 'dinner',
					label: 'Dinner Visit',
					icon: '🍽',
					time: '5-7 PM',
					parent: 'B',
					parentName: parentBName,
				});
			}
		}
	}

	return events;
}

function validatePatternSummary(scheduleType: ScheduleType, pattern: EightyTwentyPatternId | undefined, annualSummary: ScheduleSummary, events: ScheduleEvent[]) {
	const warnings: string[] = [];

	if (scheduleType !== '80-20') return warnings;

	const option = getEightyTwentyOption(pattern);
	if (!option) return warnings;

	const [minParentB, maxParentB] = option.expectedParentBRange;
	if (annualSummary.parentBPercentage < minParentB || annualSummary.parentBPercentage > maxParentB) {
		warnings.push(`${option.label} annual Parent B percentage is ${annualSummary.parentBPercentage}%, outside expected ${minParentB}-${maxParentB}%.`);
	}

	if (pattern === 'every-other-weekend-midweek-dinner' && !events.some((event) => event.type === 'dinner')) {
		warnings.push(`${option.label} is missing dinner visit events.`);
	}

	const eventsByKey = new Set<string>();
	for (const event of events) {
		const key = `${event.date}:${event.type}:${event.label}`;
		if (eventsByKey.has(key)) {
			warnings.push(`${option.label} has duplicate event "${event.label}" on ${event.date}.`);
		}
		eventsByKey.add(key);
	}

	return warnings;
}

function maybeWarnPatternValidation(warnings: string[]) {
	if (!warnings.length) return;
	if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
		warnings.forEach((warning) => console.warn(`[custody-schedule] ${warning}`));
	}
}

export function generatePatternSummary(
	schedule: ScheduleResult,
	context: {
		scheduleType?: ScheduleType;
		pattern?: EightyTwentyPatternId;
		annualSchedule?: ScheduleResult;
		events?: ScheduleEvent[];
		validationEvents?: ScheduleEvent[];
	} = {},
) {
	const annualAverage = context.annualSchedule?.summary ?? schedule.summary;
	const option = context.scheduleType === '80-20' ? getEightyTwentyOption(context.pattern) : undefined;
	const validationWarnings = validatePatternSummary(context.scheduleType ?? '223', context.pattern, annualAverage, context.validationEvents ?? context.annualSchedule?.events ?? context.events ?? schedule.events ?? []);
	maybeWarnPatternValidation(validationWarnings);

	const parentAText = `${annualAverage.parentAPercentage}%`;
	const parentBText = `${annualAverage.parentBPercentage}%`;
	const exchangeCount = (context.events ?? schedule.events ?? []).filter((event) => event.type === 'exchange').length;

	return {
		overnightCounts: schedule.summary,
		annualAverage,
		explanatoryText: `Visible month: Parent A ${schedule.summary.parentAPercentage}% / Parent B ${schedule.summary.parentBPercentage}%. Annual average from the generated pattern: Parent A ${parentAText} / Parent B ${parentBText}.`,
		exchangeFrequencyText: exchangeCount === 1 ? '1 exchange this month' : `${exchangeCount} exchanges this month`,
		complexity: option?.complexity ?? 'Low',
		bestFor: option?.bestForPoints ?? (option?.bestFor ? [option.bestFor] : []),
		validationWarnings,
	};
}

export function generateCustodySchedule({
	scheduleType,
	startDate,
	numberOfDays = defaultNumberOfDays,
	parentAName = defaultParentAName,
	parentBName = defaultParentBName,
	sixtyFortyPattern,
	seventyThirtyPattern,
	eightyTwentyPattern,
}: GenerateCustodyScheduleOptions): ScheduleResult {
	validateNumberOfDays(numberOfDays);

	const pattern = getSchedulePattern(scheduleType);
	const parsedStartDate = parseStartDate(startDate);
	const scheduleTypeId = pattern.id;
	const days: ScheduleDay[] = Array.from({ length: numberOfDays }, (_, dayIndex) => {
		const date = addDays(parsedStartDate, dayIndex);
		const { parent, patternIndex } = scheduleTypeId === 'every-other-weekend'
			? getEveryOtherWeekendPosition(date, parsedStartDate)
			: scheduleTypeId === '60-40'
				? getSixtyFortyPosition(date, dayIndex, sixtyFortyPattern)
				: scheduleTypeId === '70-30'
					? getSeventyThirtyPosition(date, parsedStartDate, dayIndex, seventyThirtyPattern)
					: scheduleTypeId === '80-20'
						? getEightyTwentyPosition(date, parsedStartDate, dayIndex, eightyTwentyPattern)
						: getPatternPosition(pattern.pattern, dayIndex);

		return {
			date: format(date, 'yyyy-MM-dd'),
			parent,
			parentName: parent === 'A' ? parentAName : parentBName,
			dayIndex,
			patternIndex,
		};
	});
	const events = createScheduleEvents(days, scheduleTypeId, parentBName, eightyTwentyPattern);
	const result: ScheduleResult = {
		days,
		summary: calculateParentingTime(days),
		events,
	};
	result.patternSummary = generatePatternSummary(result, {
		scheduleType: scheduleTypeId,
		pattern: scheduleTypeId === '80-20' ? normalizeEightyTwentyPattern(eightyTwentyPattern) : undefined,
		events,
	});

	return result;
}

export function generateVisibleMonthSchedule({
	scheduleType,
	startDate,
	monthDate = startDate,
	parentAName = defaultParentAName,
	parentBName = defaultParentBName,
	sixtyFortyPattern,
	seventyThirtyPattern,
	eightyTwentyPattern,
}: GenerateVisibleMonthScheduleOptions): ScheduleResult {
	const parsedStartDate = parseStartDate(startDate);
	const parsedMonthDate = parseStartDate(monthDate);
	const monthStart = startOfMonth(parsedMonthDate);
	const monthEnd = endOfMonth(parsedMonthDate);

	if (monthEnd < parsedStartDate) {
		const result: ScheduleResult = {
			days: [],
			summary: calculateParentingTime([]),
			events: [],
		};
		result.patternSummary = generatePatternSummary(result);
		return result;
	}

	const numberOfDays = differenceInCalendarDays(monthEnd, parsedStartDate) + 1;
	const generatedSchedule = generateCustodySchedule({
		scheduleType,
		startDate: parsedStartDate,
		numberOfDays,
		parentAName,
		parentBName,
		sixtyFortyPattern,
		seventyThirtyPattern,
		eightyTwentyPattern,
	});
	const days = generatedSchedule.days.filter((day) => isSameMonth(parseISO(day.date), monthStart));
	const visibleDates = new Set(days.map((day) => day.date));
	const events = (generatedSchedule.events ?? []).filter((event) => visibleDates.has(event.date));
	const result: ScheduleResult = {
		days,
		summary: calculateParentingTime(days),
		events,
	};
	const annualSchedule = generateCustodySchedule({
		scheduleType,
		startDate: parsedStartDate,
		numberOfDays: defaultNumberOfDays,
		parentAName,
		parentBName,
		sixtyFortyPattern,
		seventyThirtyPattern,
		eightyTwentyPattern,
	});
	result.patternSummary = generatePatternSummary(result, {
		scheduleType: normalizeScheduleType(scheduleType),
		pattern: normalizeScheduleType(scheduleType) === '80-20' ? normalizeEightyTwentyPattern(eightyTwentyPattern) : undefined,
		annualSchedule,
		events,
		validationEvents: annualSchedule.events,
	});

	return result;
}

export { normalizeEightyTwentyPattern, normalizeSeventyThirtyPattern, normalizeSixtyFortyPattern };
export type { ScheduleInputType, ScheduleType };
