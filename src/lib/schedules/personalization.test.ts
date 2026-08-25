import { describe, expect, it } from 'vitest';
import { applyImportantDates, MAX_IMPORTANT_DATES } from './personalization';
import { generateYearSchedule } from './yearSchedule';

function baseSchedule() {
	return generateYearSchedule({
		scheduleId: '223',
		startDate: '2026-09-01',
		parentNames: { parentA: 'Mom', parentB: 'Dad' },
	});
}

function findDay(yearSchedule: ReturnType<typeof baseSchedule>, date: string) {
	for (const month of yearSchedule.months) {
		const day = month.days.find((d) => d.date === date);
		if (day) return day;
	}
	return undefined;
}

describe('applyImportantDates', () => {
	it('returns the schedule unchanged when there are no important dates', () => {
		const schedule = baseSchedule();
		expect(applyImportantDates(schedule, [])).toEqual(schedule);
	});

	it('attaches a labeled marker without changing the assigned parent when no home is chosen', () => {
		const schedule = baseSchedule();
		const before = findDay(schedule, '2026-11-14');
		const result = applyImportantDates(schedule, [{ id: '1', label: "Emma's birthday", date: '2026-11-14' }]);
		const day = findDay(result, '2026-11-14');

		expect(day?.parent).toBe(before?.parent);
		expect(day?.isHolidayOverride).toBeFalsy();
		expect(day?.events?.some((event) => event.type === 'important-date' && event.label === "Emma's birthday")).toBe(true);
	});

	it('shows the customer-chosen home for a date without recomputing the rotation', () => {
		const schedule = baseSchedule();
		const before = findDay(schedule, '2026-12-25');
		const overrideParent = before?.parent === 'parentA' ? 'B' : 'A';
		const result = applyImportantDates(schedule, [{ id: '1', label: 'Christmas', date: '2026-12-25', homeOverride: overrideParent }]);
		const day = findDay(result, '2026-12-25');

		expect(day?.parent).toBe(overrideParent === 'A' ? 'parentA' : 'parentB');
		expect(day?.parentName).toBe(overrideParent === 'A' ? 'Mom' : 'Dad');
		expect(day?.isHolidayOverride).toBe(true);
	});

	it('does not apply a home override to a day outside the generated schedule', () => {
		const schedule = generateYearSchedule({
			scheduleId: '223',
			startDate: '2026-09-15',
			parentNames: { parentA: 'Mom', parentB: 'Dad' },
		});
		// A day before the start date exists as a grid cell but was never generated.
		const beforeStart = schedule.months[0].days.find((day) => !day.isPlaceholder && !day.isCurrentMonth);
		expect(beforeStart).toBeDefined();

		const result = applyImportantDates(schedule, [
			{ id: '1', label: 'Before start', date: beforeStart!.date, homeOverride: 'A' },
		]);
		const day = findDay(result, beforeStart!.date);

		expect(day?.isHolidayOverride).toBeFalsy();
	});

	it('ignores entries with a blank label or missing date', () => {
		const schedule = baseSchedule();
		const result = applyImportantDates(schedule, [
			{ id: '1', label: '   ', date: '2026-11-14' },
			{ id: '2', label: 'No date', date: '' },
		]);

		expect(result).toEqual(schedule);
	});

	it(`caps important dates at ${MAX_IMPORTANT_DATES}`, () => {
		const schedule = baseSchedule();
		const entries = Array.from({ length: 15 }, (_, index) => ({
			id: String(index),
			label: `Event ${index}`,
			date: `2026-09-${String(index + 1).padStart(2, '0')}`,
		}));

		const result = applyImportantDates(schedule, entries);
		const markedDays = result.months.flatMap((month) => month.days).filter((day) => day.events?.some((event) => event.type === 'important-date'));

		expect(markedDays).toHaveLength(MAX_IMPORTANT_DATES);
	});

	it('keeps the exchange-day marker alongside an important-date marker on the same day', () => {
		const schedule = baseSchedule();
		const exchangeDate = schedule.months.flatMap((m) => m.events ?? []).find((event) => event.type === 'exchange')?.date;
		expect(exchangeDate).toBeDefined();

		const result = applyImportantDates(schedule, [{ id: '1', label: 'Field trip', date: exchangeDate! }]);
		const day = findDay(result, exchangeDate!);

		expect(day?.events?.some((event) => event.type === 'exchange')).toBe(true);
		expect(day?.events?.some((event) => event.type === 'important-date')).toBe(true);
	});
});
