import type { GeneratedDay, Parent } from './types';
import type { YearSchedule } from './yearSchedule';

export const MAX_IMPORTANT_DATES = 10;

export interface ImportantDateInput {
	id: string;
	label: string;
	date: string;
	/** If set, this date's home is shown as chosen by the customer — not a computed legal answer. */
	homeOverride?: Parent;
}

function applyImportantDateToDay(day: GeneratedDay, entry: ImportantDateInput, yearSchedule: YearSchedule): GeneratedDay {
	const events = [
		...(day.events ?? []),
		{ date: day.date, type: 'important-date' as const, label: entry.label, icon: '★' },
	];

	if (!entry.homeOverride || !day.isCurrentMonth) {
		return { ...day, events };
	}

	const parentKey = entry.homeOverride === 'A' ? ('parentA' as const) : ('parentB' as const);
	return {
		...day,
		events,
		parent: parentKey,
		parentName: yearSchedule.parentNames[parentKey],
		isHolidayOverride: true,
	};
}

/**
 * Overlays customer-entered important dates onto an already-generated year
 * schedule, for display only. This never recomputes or reinterprets the
 * underlying rotation — a chosen home override is shown exactly as entered,
 * the same way the free tool's holiday-override preview works.
 */
export function applyImportantDates(yearSchedule: YearSchedule, importantDates: ImportantDateInput[]): YearSchedule {
	const validDates = importantDates.filter((entry) => entry.label.trim() && entry.date).slice(0, MAX_IMPORTANT_DATES);
	if (!validDates.length) return yearSchedule;

	const byDate = new Map<string, ImportantDateInput>();
	for (const entry of validDates) {
		byDate.set(entry.date, entry);
	}

	const months = yearSchedule.months.map((month) => ({
		...month,
		days: month.days.map((day) => {
			if (day.isPlaceholder) return day;
			const entry = byDate.get(day.date);
			if (!entry) return day;
			return applyImportantDateToDay(day, entry, yearSchedule);
		}),
	}));

	return { ...yearSchedule, months };
}
