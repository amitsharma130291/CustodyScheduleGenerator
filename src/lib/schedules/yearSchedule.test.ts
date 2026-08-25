import { describe, expect, it } from 'vitest';
import { generateCustodySchedule } from './engine';
import { generateYearSchedule } from './yearSchedule';
import type { ScheduleType } from './types';

const allScheduleTypes: ScheduleType[] = [
	'223',
	'2255',
	'5225',
	'3443',
	'week-on-week-off',
	'every-other-weekend',
	'60-40',
	'70-30',
	'80-20',
	'90-10',
];

describe('generateYearSchedule', () => {
	it.each(allScheduleTypes)('produces exactly 12 consecutive calendar months for %s', (scheduleId) => {
		const year = generateYearSchedule({ scheduleId, startDate: '2026-09-01' });

		expect(year.months).toHaveLength(12);
		expect(year.months.map((month) => month.monthLabel)).toEqual([
			'September 2026',
			'October 2026',
			'November 2026',
			'December 2026',
			'January 2027',
			'February 2027',
			'March 2027',
			'April 2027',
			'May 2027',
			'June 2027',
			'July 2027',
			'August 2027',
		]);
	});

	it('spans day 1 through day 365 for a non-leap window', () => {
		const year = generateYearSchedule({ scheduleId: '223', startDate: '2026-09-01' });

		expect(year.startDate).toBe('2026-09-01');
		expect(year.endDate).toBe('2027-08-31');
		expect(year.annualSummary.totalDays).toBe(365);
	});

	it('spans 366 days when the 12-month window crosses Feb 29 of a leap year', () => {
		// 2028 is a leap year; a window starting mid-2027 runs through Feb 2028.
		const year = generateYearSchedule({ scheduleId: '223', startDate: '2027-06-01' });

		expect(year.endDate).toBe('2028-05-31');
		expect(year.annualSummary.totalDays).toBe(366);
		expect(year.months.some((month) => month.monthLabel === 'February 2028')).toBe(true);

		const february = year.months.find((month) => month.monthLabel === 'February 2028');
		const realDaysInFeb = february?.days.filter((day) => !day.isPlaceholder).length;
		expect(realDaysInFeb).toBe(29);
	});

	it('does not add a leap day when the window does not cross Feb 29', () => {
		const year = generateYearSchedule({ scheduleId: '223', startDate: '2026-09-01' });
		const february = year.months.find((month) => month.monthLabel === 'February 2027');
		const realDaysInFeb = february?.days.filter((day) => !day.isPlaceholder).length;
		expect(realDaysInFeb).toBe(28);
	});

	it('rolls correctly across a December-start year boundary', () => {
		const year = generateYearSchedule({ scheduleId: 'week-on-week-off', startDate: '2026-12-15' });

		expect(year.months[0].monthLabel).toBe('December 2026');
		expect(year.months[1].monthLabel).toBe('January 2027');
		// endDate is the day before the same calendar date one year later,
		// not the end of a calendar month — the window is anchored to the
		// exact start date, so it lands mid-December of the following year.
		expect(year.endDate).toBe('2027-12-14');
	});

	it.each([
		['2026-09-07'], // Monday
		['2026-09-08'], // Tuesday
		['2026-09-09'], // Wednesday
		['2026-09-10'], // Thursday
		['2026-09-11'], // Friday
		['2026-09-12'], // Saturday
		['2026-09-13'], // Sunday
	])('every month grid agrees with the day-level engine for a %s start', (startDate) => {
		const year = generateYearSchedule({ scheduleId: '2255', startDate });
		const reference = generateCustodySchedule({ scheduleType: '2255', startDate, numberOfDays: 365 });
		const referenceByDate = new Map(reference.days.map((day) => [day.date, day.parent]));

		for (const month of year.months) {
			for (const day of month.days) {
				if (day.isPlaceholder || !day.date) continue;
				const expectedParent = referenceByDate.get(day.date);
				if (!expectedParent) continue; // date falls after the 365-day reference window
				expect(day.parent).toBe(expectedParent === 'A' ? 'parentA' : 'parentB');
			}
		}
	});

	it('lets the customer choose who starts by swapping which name is Parent A', () => {
		const momStarts = generateYearSchedule({
			scheduleId: '223',
			startDate: '2026-09-01',
			parentNames: { parentA: 'Mom', parentB: 'Dad' },
		});
		const dadStarts = generateYearSchedule({
			scheduleId: '223',
			startDate: '2026-09-01',
			parentNames: { parentA: 'Dad', parentB: 'Mom' },
		});

		const firstDayMom = momStarts.months[0].days.find((day) => day.date === '2026-09-01');
		const firstDayDad = dadStarts.months[0].days.find((day) => day.date === '2026-09-01');

		expect(firstDayMom?.parentName).toBe('Mom');
		expect(firstDayDad?.parentName).toBe('Dad');
	});

	it('keeps a full 365-day annual summary in sync with the day-level engine total', () => {
		const year = generateYearSchedule({ scheduleId: '80-20', startDate: '2026-09-01' });
		const reference = generateCustodySchedule({ scheduleType: '80-20', startDate: '2026-09-01', numberOfDays: 365 });

		expect(year.annualSummary).toEqual(reference.summary);
	});
});
