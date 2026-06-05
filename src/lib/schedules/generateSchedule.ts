import {
	addDays,
	endOfMonth,
	format,
	isSameMonth,
	parseISO,
	startOfMonth,
	startOfWeek,
} from 'date-fns';
import { generateVisibleMonthSchedule, getSchedulePattern } from './engine';
import type {
	GeneratedDay,
	GeneratedSchedule,
	ParentKey,
	ParentNames,
	EightyTwentyPatternId,
	ScheduleDay,
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
	const monthStart = startOfMonth(parsedMonthDate);
	const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const monthEnd = endOfMonth(parsedMonthDate);
	const gridEnd = addDays(startOfWeek(addDays(monthEnd, 6), { weekStartsOn: 1 }), 6);
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
	const days: GeneratedDay[] = [];
	const parentDayCounts: Record<ParentKey, number> = {
		parentA: 0,
		parentB: 0,
	};

	for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
		const date = format(day, 'yyyy-MM-dd');
		const generatedDay = daysByDate.get(date) as ScheduleDay | undefined;
		const parent: ParentKey = generatedDay?.parent === 'B' ? 'parentB' : 'parentA';
		const isCurrentMonth = isSameMonth(day, parsedMonthDate);
		const isActiveCurrentMonth = isCurrentMonth && Boolean(generatedDay);

		if (isActiveCurrentMonth) {
			parentDayCounts[parent] += 1;
		}

		days.push({
			date,
			dayOfMonth: Number(format(day, 'd')),
			weekday: format(day, 'EEE'),
			parent,
			parentName: generatedDay?.parentName ?? normalizedParents[parent],
			isCurrentMonth: isActiveCurrentMonth,
			events: eventsByDate.get(date) ?? [],
		});
	}

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
