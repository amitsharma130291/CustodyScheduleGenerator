import { parseISO } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { buildMonthCalendarDays, buildMonthCalendarLayout, getDaysInMonth } from './calendarGrid';
import { generateSchedule } from './generateSchedule';

describe('buildMonthCalendarLayout', () => {
	it('bounds June 2026 to 30 in-month days with no overflow week', () => {
		const layout = buildMonthCalendarLayout(parseISO('2026-06-01'));

		expect(getDaysInMonth(parseISO('2026-06-01'))).toBe(30);
		expect(layout.daysInMonth).toBe(30);
		expect(layout.leadingBlanks).toBe(0);
		expect(layout.trailingBlanks).toBe(5);
		expect(layout.totalCells).toBe(35);
	});

	it('handles February 2027 with 28 days', () => {
		const layout = buildMonthCalendarLayout(parseISO('2027-02-01'));

		expect(layout.daysInMonth).toBe(28);
		expect(layout.leadingBlanks).toBe(0);
		expect(layout.trailingBlanks).toBe(0);
		expect(layout.totalCells).toBe(28);
	});

	it('handles February 2028 leap year with 29 days', () => {
		const layout = buildMonthCalendarLayout(parseISO('2028-02-01'));

		expect(layout.daysInMonth).toBe(29);
		expect(layout.leadingBlanks).toBe(1);
		expect(layout.trailingBlanks).toBe(5);
		expect(layout.totalCells).toBe(35);
	});

	it('does not extend December 2026 into January 2027', () => {
		const layout = buildMonthCalendarLayout(parseISO('2026-12-01'));

		expect(layout.daysInMonth).toBe(31);
		expect(layout.leadingBlanks).toBe(1);
		expect(layout.trailingBlanks).toBe(3);
		expect(layout.totalCells).toBe(35);
	});
});

describe('buildMonthCalendarDays', () => {
	it('never renders adjacent-month dates in the grid', () => {
		const schedule = generateSchedule({
			scheduleId: '223',
			startDate: '2026-06-01',
			monthDate: '2026-06-01',
		});

		const visibleDayNumbers = schedule.days
			.filter((day) => !day.isPlaceholder)
			.map((day) => day.dayOfMonth);

		expect(visibleDayNumbers).toEqual(Array.from({ length: 30 }, (_, index) => index + 1));
		expect(schedule.days.some((day) => day.date.startsWith('2026-07-'))).toBe(false);
		expect(schedule.days.some((day) => day.isPlaceholder)).toBe(true);
		expect(schedule.parentDayCounts.parentA + schedule.parentDayCounts.parentB).toBe(30);
	});

	it('uses blank placeholders for weekday alignment only', () => {
		const { days } = buildMonthCalendarDays({
			monthDate: parseISO('2026-06-01'),
			daysByDate: new Map(),
			eventsByDate: new Map(),
			parentNames: { parentA: 'Parent A', parentB: 'Parent B' },
		});

		const placeholders = days.filter((day) => day.isPlaceholder);
		expect(placeholders.every((day) => day.date === '' && day.dayOfMonth === 0)).toBe(true);
		expect(placeholders.length).toBe(5);
	});
});
