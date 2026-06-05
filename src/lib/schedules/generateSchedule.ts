import {
	addDays,
	differenceInCalendarDays,
	endOfMonth,
	format,
	isSameMonth,
	parseISO,
	startOfMonth,
	startOfWeek,
} from 'date-fns';
import { scheduleDefinitions } from './definitions';
import type { GeneratedDay, GeneratedSchedule, ParentKey, ParentNames, ScheduleId } from './types';

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

function getParentForOffset(scheduleId: ScheduleId, offset: number): ParentKey {
	const definition = scheduleDefinitions[scheduleId];
	const cycleLength = definition.cycle.reduce((total, segment) => total + segment.days, 0);
	const normalizedOffset = ((offset % cycleLength) + cycleLength) % cycleLength;
	let cursor = 0;

	for (const segment of definition.cycle) {
		cursor += segment.days;
		if (normalizedOffset < cursor) {
			return segment.parent;
		}
	}

	return definition.cycle[0].parent;
}

export function generateSchedule({
	scheduleId,
	startDate,
	monthDate = startDate,
	parentNames = defaultParentNames,
}: {
	scheduleId: ScheduleId;
	startDate: string | Date;
	monthDate?: string | Date;
	parentNames?: Partial<ParentNames>;
}): GeneratedSchedule {
	const definition = scheduleDefinitions[scheduleId];
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
	const days: GeneratedDay[] = [];
	const parentDayCounts: Record<ParentKey, number> = {
		parentA: 0,
		parentB: 0,
	};

	for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
		const offset = differenceInCalendarDays(day, parsedStartDate);
		const parent = getParentForOffset(scheduleId, offset);
		const isCurrentMonth = isSameMonth(day, parsedMonthDate);

		if (isCurrentMonth) {
			parentDayCounts[parent] += 1;
		}

		days.push({
			date: format(day, 'yyyy-MM-dd'),
			dayOfMonth: Number(format(day, 'd')),
			weekday: format(day, 'EEE'),
			parent,
			parentName: normalizedParents[parent],
			isCurrentMonth,
		});
	}

	return {
		definition,
		monthLabel: format(parsedMonthDate, 'MMMM yyyy'),
		startDate: format(parsedStartDate, 'yyyy-MM-dd'),
		parentNames: normalizedParents,
		days,
		parentDayCounts,
	};
}
