import { format } from 'date-fns';
import type { GeneratedDay, ParentKey, ParentNames, ScheduleDay, ScheduleEvent } from './types';

export interface MonthCalendarLayout {
	year: number;
	month: number;
	daysInMonth: number;
	leadingBlanks: number;
	trailingBlanks: number;
	totalCells: number;
}

export function getMondayFirstOffset(monthDate: Date) {
	const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
	return (firstOfMonth.getDay() + 6) % 7;
}

export function getDaysInMonth(monthDate: Date) {
	const year = monthDate.getFullYear();
	const month = monthDate.getMonth();
	return new Date(year, month + 1, 0).getDate();
}

export function buildMonthCalendarLayout(monthDate: Date): MonthCalendarLayout {
	const year = monthDate.getFullYear();
	const month = monthDate.getMonth();
	const daysInMonth = getDaysInMonth(monthDate);
	const leadingBlanks = getMondayFirstOffset(monthDate);
	const usedCells = leadingBlanks + daysInMonth;
	const trailingBlanks = usedCells % 7 === 0 ? 0 : 7 - (usedCells % 7);

	return {
		year,
		month,
		daysInMonth,
		leadingBlanks,
		trailingBlanks,
		totalCells: leadingBlanks + daysInMonth + trailingBlanks,
	};
}

function createPlaceholderDay(): GeneratedDay {
	return {
		date: '',
		dayOfMonth: 0,
		weekday: '',
		parent: 'parentA',
		parentName: '',
		isCurrentMonth: false,
		isPlaceholder: true,
		events: [],
	};
}

export function buildMonthCalendarDays({
	monthDate,
	daysByDate,
	eventsByDate,
	parentNames,
}: {
	monthDate: Date;
	daysByDate: Map<string, ScheduleDay>;
	eventsByDate: Map<string, ScheduleEvent[]>;
	parentNames: ParentNames;
}): { days: GeneratedDay[]; parentDayCounts: Record<ParentKey, number> } {
	const { year, month, daysInMonth, leadingBlanks, trailingBlanks } = buildMonthCalendarLayout(monthDate);
	const days: GeneratedDay[] = [];
	const parentDayCounts: Record<ParentKey, number> = {
		parentA: 0,
		parentB: 0,
	};

	for (let index = 0; index < leadingBlanks; index += 1) {
		days.push(createPlaceholderDay());
	}

	for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth += 1) {
		const dayDate = new Date(year, month, dayOfMonth);
		const date = format(dayDate, 'yyyy-MM-dd');
		const generatedDay = daysByDate.get(date);
		const parent: ParentKey = generatedDay?.parent === 'B' ? 'parentB' : 'parentA';

		if (generatedDay) {
			parentDayCounts[parent] += 1;
		}

		days.push({
			date,
			dayOfMonth,
			weekday: format(dayDate, 'EEE'),
			parent,
			parentName: generatedDay?.parentName ?? parentNames[parent],
			isCurrentMonth: Boolean(generatedDay),
			isPlaceholder: false,
			events: eventsByDate.get(date) ?? [],
		});
	}

	for (let index = 0; index < trailingBlanks; index += 1) {
		days.push(createPlaceholderDay());
	}

	return { days, parentDayCounts };
}
