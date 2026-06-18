import { format, parseISO } from 'date-fns';
import { buildMonthCalendarDays } from './calendarGrid';
import { generateVisibleMonthSchedule, getSchedulePattern } from './engine';
import type {
	EightyTwentyPatternId,
	GeneratedSchedule,
	ParentNames,
	ScheduleInputType,
	SeventyThirtyPatternId,
	SixtyFortyPatternId,
} from './types';

const defaultParentNames: ParentNames = {
	parentA: 'Parent A',
	parentB: 'Parent B',
};

function normalizeDate(date: string | Date) {
	if (date instanceof Date) {
		return date;
	}

	return parseISO(date);
}

export function generateSchedule({
	scheduleId,
	startDate,
	monthDate = startDate,
	parentNames = defaultParentNames,
	sixtyFortyPattern,
	seventyThirtyPattern,
	eightyTwentyPattern,
}: {
	scheduleId: ScheduleInputType;
	startDate: string | Date;
	monthDate?: string | Date;
	parentNames?: Partial<ParentNames>;
	sixtyFortyPattern?: SixtyFortyPatternId;
	seventyThirtyPattern?: SeventyThirtyPatternId;
	eightyTwentyPattern?: EightyTwentyPatternId;
}): GeneratedSchedule {
	const pattern = getSchedulePattern(scheduleId);
	const definition = {
		id: pattern.id,
		name: pattern.name,
		shortName: pattern.shortName,
		description: pattern.description,
		cycle: pattern.pattern,
		slug: pattern.slug,
	};
	const normalizedParents: ParentNames = {
		...defaultParentNames,
		...parentNames,
	};
	const parsedStartDate = normalizeDate(startDate);
	const parsedMonthDate = normalizeDate(monthDate);
	const visibleMonthSchedule = generateVisibleMonthSchedule({
		scheduleType: pattern.id,
		startDate: parsedStartDate,
		monthDate: parsedMonthDate,
		parentAName: normalizedParents.parentA,
		parentBName: normalizedParents.parentB,
		sixtyFortyPattern,
		seventyThirtyPattern,
		eightyTwentyPattern,
	});
	const daysByDate = new Map(visibleMonthSchedule.days.map((day) => [day.date, day]));
	const eventsByDate = new Map<string, typeof visibleMonthSchedule.events>();
	for (const event of visibleMonthSchedule.events ?? []) {
		eventsByDate.set(event.date, [...(eventsByDate.get(event.date) ?? []), event]);
	}
	const { days, parentDayCounts } = buildMonthCalendarDays({
		monthDate: parsedMonthDate,
		daysByDate,
		eventsByDate,
		parentNames: normalizedParents,
	});

	return {
		definition,
		monthLabel: format(parsedMonthDate, 'MMMM yyyy'),
		startDate: format(parsedStartDate, 'yyyy-MM-dd'),
		parentNames: normalizedParents,
		days,
		parentDayCounts,
		events: visibleMonthSchedule.events,
		patternSummary: visibleMonthSchedule.patternSummary,
	};
}
