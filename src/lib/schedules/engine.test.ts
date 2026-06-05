import { describe, expect, it } from 'vitest';
import { generateCustodySchedule, generateVisibleMonthSchedule, getSchedulePattern } from './engine';
import type { ScheduleType } from './types';

const startDate = '2026-01-01';

function parentsFor(scheduleType: ScheduleType) {
	return generateCustodySchedule({
		scheduleType,
		startDate,
		numberOfDays: 14,
	}).days.map((day) => day.parent);
}

function firstThirtyDays(scheduleType: ScheduleType, startsOn = '2026-06-05') {
	return generateCustodySchedule({
		scheduleType,
		startDate: startsOn,
		numberOfDays: 30,
	}).days.map((day) => `${day.date}:${day.parent}`);
}

describe('generateCustodySchedule', () => {
	it.each([
		['223', [2, 2, 3, 2, 2, 3]],
		['2255', [2, 2, 5, 5]],
		['5225', [5, 2, 2, 5]],
		['3443', [3, 4, 4, 3]],
		['week-on-week-off', [7, 7]],
	] satisfies Array<[ScheduleType, number[]]>)('maps %s to the correct pattern', (scheduleType, expectedPattern) => {
		expect(getSchedulePattern(scheduleType).pattern.map((segment) => segment.days)).toEqual(expectedPattern);
	});

	it('generates correct first 14 days for 2-2-3', () => {
		expect(parentsFor('223')).toEqual(['A', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B']);
	});

	it('generates correct first 14 days for 2-2-5-5', () => {
		expect(parentsFor('2255')).toEqual(['A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B']);
	});

	it('generates correct first 14 days for 5-2-2-5', () => {
		expect(parentsFor('5225')).toEqual(['A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'B', 'B']);
	});

	it('generates correct first 14 days for 3-4-4-3', () => {
		expect(parentsFor('3443')).toEqual(['A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B']);
	});

	it('generates correct first 14 days for week-on-week-off', () => {
		expect(parentsFor('week-on-week-off')).toEqual([
			'A',
			'A',
			'A',
			'A',
			'A',
			'A',
			'A',
			'B',
			'B',
			'B',
			'B',
			'B',
			'B',
			'B',
		]);
	});

	it('2-2-3 output differs from 2-2-5-5', () => {
		expect(firstThirtyDays('223')).not.toEqual(firstThirtyDays('2255'));
	});

	it('5-2-2-5 output differs from 3-4-4-3', () => {
		expect(firstThirtyDays('5225')).not.toEqual(firstThirtyDays('3443'));
	});

	it('week-on-week-off produces seven consecutive days before switching', () => {
		expect(parentsFor('week-on-week-off')).toEqual(['A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B']);
	});

	it('week-on-week-off starting 2026-06-05 alternates weekly through June', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: 'week-on-week-off',
			startDate: '2026-06-05',
			monthDate: '2026-06-01',
		});

		expect(june.days.map((day) => `${day.date}:${day.parent}`)).toEqual([
			'2026-06-05:A',
			'2026-06-06:A',
			'2026-06-07:A',
			'2026-06-08:A',
			'2026-06-09:A',
			'2026-06-10:A',
			'2026-06-11:A',
			'2026-06-12:B',
			'2026-06-13:B',
			'2026-06-14:B',
			'2026-06-15:B',
			'2026-06-16:B',
			'2026-06-17:B',
			'2026-06-18:B',
			'2026-06-19:A',
			'2026-06-20:A',
			'2026-06-21:A',
			'2026-06-22:A',
			'2026-06-23:A',
			'2026-06-24:A',
			'2026-06-25:A',
			'2026-06-26:B',
			'2026-06-27:B',
			'2026-06-28:B',
			'2026-06-29:B',
			'2026-06-30:B',
		]);
		expect(june.summary).toEqual({
			parentADays: 14,
			parentBDays: 12,
			parentAPercentage: 54,
			parentBPercentage: 46,
			totalDays: 26,
		});
	});

	it.each<ScheduleType>(['223', '2255', '5225', '3443', 'week-on-week-off'])(
		'calculates 50/50 summary for %s over 14 days',
		(scheduleType) => {
			const { summary } = generateCustodySchedule({
				scheduleType,
				startDate,
				numberOfDays: 14,
			});

			expect(summary).toEqual({
				parentADays: 7,
				parentBDays: 7,
				parentAPercentage: 50,
				parentBPercentage: 50,
				totalDays: 14,
			});
		},
	);

	it('uses custom parent names in generated output', () => {
		const { days } = generateCustodySchedule({
			scheduleType: '223',
			startDate,
			numberOfDays: 4,
			parentAName: 'Alex',
			parentBName: 'Jordan',
		});

		expect(days.map((day) => day.parentName)).toEqual(['Alex', 'Alex', 'Jordan', 'Jordan']);
	});

	it('changing start date shifts the visible month ownership sequence correctly', () => {
		const shifted = generateVisibleMonthSchedule({
			scheduleType: '223',
			startDate: '2026-01-02',
			monthDate: '2026-01-01',
		});

		expect(shifted.days.slice(0, 14).map((day) => `${day.date}:${day.parent}`)).toEqual([
			'2026-01-02:A',
			'2026-01-03:A',
			'2026-01-04:B',
			'2026-01-05:B',
			'2026-01-06:A',
			'2026-01-07:A',
			'2026-01-08:A',
			'2026-01-09:B',
			'2026-01-10:B',
			'2026-01-11:A',
			'2026-01-12:A',
			'2026-01-13:B',
			'2026-01-14:B',
			'2026-01-15:B',
		]);
	});

	it('monthly stats match the visible assigned days', () => {
		const schedule = generateVisibleMonthSchedule({
			scheduleType: '5225',
			startDate: '2026-01-03',
			monthDate: '2026-01-01',
		});
		const parentADays = schedule.days.filter((day) => day.parent === 'A').length;
		const parentBDays = schedule.days.filter((day) => day.parent === 'B').length;

		expect(schedule.summary.parentADays).toBe(parentADays);
		expect(schedule.summary.parentBDays).toBe(parentBDays);
		expect(schedule.summary.totalDays).toBe(schedule.days.length);
		expect(schedule.days.every((day) => day.date >= '2026-01-03' && day.date <= '2026-01-31')).toBe(true);
	});

	it('parent names do not affect schedule ownership logic', () => {
		const defaultNames = generateCustodySchedule({
			scheduleType: '3443',
			startDate,
			numberOfDays: 30,
		});
		const customNames = generateCustodySchedule({
			scheduleType: '3443',
			startDate,
			numberOfDays: 30,
			parentAName: 'Alex',
			parentBName: 'Jordan',
		});

		expect(customNames.days.map((day) => day.parent)).toEqual(defaultNames.days.map((day) => day.parent));
		expect(customNames.summary).toEqual(defaultNames.summary);
		expect(customNames.days.some((day) => day.parentName === 'Alex')).toBe(true);
		expect(customNames.days.some((day) => day.parentName === 'Jordan')).toBe(true);
	});

	it('throws for invalid schedule type', () => {
		expect(() =>
			generateCustodySchedule({
				scheduleType: 'invalid',
				startDate,
			}),
		).toThrow(/Invalid schedule type/);
	});

	it('throws for invalid start date', () => {
		expect(() =>
			generateCustodySchedule({
				scheduleType: '223',
				startDate: 'not-a-date',
			}),
		).toThrow(/Invalid start date/);
	});

	it.each([0, -1])('throws when numberOfDays is %s', (numberOfDays) => {
		expect(() =>
			generateCustodySchedule({
				scheduleType: '223',
				startDate,
				numberOfDays,
			}),
		).toThrow(/numberOfDays/);
	});

	it('generates 365 days by default', () => {
		const { days } = generateCustodySchedule({
			scheduleType: '223',
			startDate,
		});

		expect(days).toHaveLength(365);
	});

	it.each([
		['223', { parentADays: 16, parentBDays: 15, parentAPercentage: 52, parentBPercentage: 48, totalDays: 31 }],
		['2255', { parentADays: 16, parentBDays: 15, parentAPercentage: 52, parentBPercentage: 48, totalDays: 31 }],
		['5225', { parentADays: 17, parentBDays: 14, parentAPercentage: 55, parentBPercentage: 45, totalDays: 31 }],
		['3443', { parentADays: 17, parentBDays: 14, parentAPercentage: 55, parentBPercentage: 45, totalDays: 31 }],
		['week-on-week-off', { parentADays: 17, parentBDays: 14, parentAPercentage: 55, parentBPercentage: 45, totalDays: 31 }],
	] satisfies Array<[ScheduleType, ReturnType<typeof generateVisibleMonthSchedule>['summary']]>)(
		'calculates visible January monthly stats for %s',
		(scheduleType, expectedSummary) => {
			const { summary } = generateVisibleMonthSchedule({
				scheduleType,
				startDate: '2026-01-01',
				monthDate: '2026-01-01',
			});

			expect(summary).toEqual(expectedSummary);
		},
	);

	it('counts only valid generated days in the visible month', () => {
		const { days, summary } = generateVisibleMonthSchedule({
			scheduleType: '223',
			startDate: '2026-01-15',
			monthDate: '2026-01-01',
		});

		expect(days).toHaveLength(17);
		expect(days[0].date).toBe('2026-01-15');
		expect(days.at(-1)?.date).toBe('2026-01-31');
		expect(summary).toEqual({
			parentADays: 9,
			parentBDays: 8,
			parentAPercentage: 53,
			parentBPercentage: 47,
			totalDays: 17,
		});
	});
});
