import { getDay, parseISO } from 'date-fns';
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
		['every-other-weekend', [2, 12]],
		['60-40', [4, 3]],
		['70-30', [5, 2]],
		['80-20', [4, 1]],
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

	it('generates the default 4-3 pattern for 60/40', () => {
		const parents = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 14,
		}).days.map((day) => day.parent);

		expect(parents).toEqual(['A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B']);
	});

	it('generates exact 60/40 when the exact pattern is selected', () => {
		const parents = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 10,
			sixtyFortyPattern: 'exact-60-40',
		}).days.map((day) => day.parent);

		expect(parents).toEqual(['A', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B']);
	});

	it('generates extended weekends for the 60/40 extended-weekend pattern', () => {
		const days = generateCustodySchedule({
			scheduleType: '60-40',
			startDate: '2026-06-01',
			numberOfDays: 7,
			sixtyFortyPattern: 'extended-weekend',
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days).toEqual([
			'2026-06-01:A',
			'2026-06-02:A',
			'2026-06-03:A',
			'2026-06-04:A',
			'2026-06-05:B',
			'2026-06-06:B',
			'2026-06-07:B',
		]);
	});

	it('generates every-weekend ownership for the default 70/30 pattern', () => {
		const days = generateCustodySchedule({
			scheduleType: '70-30',
			startDate: '2026-06-01',
			numberOfDays: 7,
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days).toEqual([
			'2026-06-01:A',
			'2026-06-02:A',
			'2026-06-03:A',
			'2026-06-04:A',
			'2026-06-05:B',
			'2026-06-06:B',
			'2026-06-07:A',
		]);
	});

	it('generates the default 80/20 pattern as every other Friday and Saturday overnights', () => {
		const days = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days).toEqual([
			'2026-06-12:B',
			'2026-06-13:B',
			'2026-06-14:A',
			'2026-06-15:A',
			'2026-06-16:A',
			'2026-06-17:A',
			'2026-06-18:A',
			'2026-06-19:A',
			'2026-06-20:A',
			'2026-06-21:A',
			'2026-06-22:A',
			'2026-06-23:A',
			'2026-06-24:A',
			'2026-06-25:A',
		]);
	});

	it('generates every-weekend 80/20 calendar ownership with Friday and Saturday overnights', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
			eightyTwentyPattern: 'every-weekend',
		});

		expect(summary).toEqual({
			parentADays: 10,
			parentBDays: 4,
			parentAPercentage: 71,
			parentBPercentage: 29,
			totalDays: 14,
		});
	});

	it('generates monthly 1st, 3rd and 5th weekend 80/20 ownership', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '80-20',
			startDate: '2026-06-01',
			monthDate: '2026-06-01',
			eightyTwentyPattern: 'first-third-fifth-weekends',
		});

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date)).toEqual([
			'2026-06-05',
			'2026-06-06',
			'2026-06-19',
			'2026-06-20',
		]);
		expect(june.summary.parentBDays).toBe(4);
	});

	it('generates monthly 2nd, 4th and 5th weekend 80/20 ownership', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '80-20',
			startDate: '2026-06-01',
			monthDate: '2026-06-01',
			eightyTwentyPattern: 'second-fourth-fifth-weekends',
		});

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date)).toEqual([
			'2026-06-12',
			'2026-06-13',
			'2026-06-26',
			'2026-06-27',
		]);
		expect(june.summary.parentBDays).toBe(4);
	});

	it('generates every-third-weekend 80/20 ownership', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 21,
			eightyTwentyPattern: 'every-3rd-weekend',
		});

		expect(summary).toEqual({
			parentADays: 19,
			parentBDays: 2,
			parentAPercentage: 90,
			parentBPercentage: 10,
			totalDays: 21,
		});
	});

	it('does not add overnight credit for the 80/20 midweek dinner variant', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
			eightyTwentyPattern: 'every-other-weekend-midweek-dinner',
		});

		expect(summary).toEqual({
			parentADays: 12,
			parentBDays: 2,
			parentAPercentage: 86,
			parentBPercentage: 14,
			totalDays: 14,
		});
	});

	it('adds one weekday overnight for the 80/20 one-overnight variant', () => {
		const parentBDates = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
			eightyTwentyPattern: 'every-other-weekend-one-overnight',
		}).days.filter((day) => day.parent === 'B').map((day) => day.date);

		expect(parentBDates).toEqual(['2026-06-12', '2026-06-13', '2026-06-24']);
	});

	it('generates long-distance 80/20 ownership as one week every five weeks', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate,
			numberOfDays: 35,
			eightyTwentyPattern: 'long-distance',
		});

		expect(summary).toEqual({
			parentADays: 28,
			parentBDays: 7,
			parentAPercentage: 80,
			parentBPercentage: 20,
			totalDays: 35,
		});
	});

	it('keeps long-distance 80/20 annual averages inside the intended range', () => {
		const { patternSummary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate,
			eightyTwentyPattern: 'long-distance',
		});

		expect(patternSummary?.annualAverage.parentAPercentage).toBeGreaterThanOrEqual(78);
		expect(patternSummary?.annualAverage.parentAPercentage).toBeLessThanOrEqual(82);
		expect(patternSummary?.annualAverage.parentBPercentage).toBeGreaterThanOrEqual(18);
		expect(patternSummary?.annualAverage.parentBPercentage).toBeLessThanOrEqual(22);
		expect(patternSummary?.validationWarnings).toEqual([]);
	});

	it('generates exchange events on 80/20 ownership changes', () => {
		const { events } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 17,
		});

		expect(events?.filter((event) => event.type === 'exchange').map((event) => `${event.date}:${event.label}`)).toEqual([
			'2026-06-14:Sun 6 PM Return',
			'2026-06-26:Fri 6 PM Exchange',
			'2026-06-28:Sun 6 PM Return',
		]);
	});

	it('shows dinner visits without changing overnight counts', () => {
		const schedule = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
			eightyTwentyPattern: 'every-other-weekend-midweek-dinner',
		});

		expect(schedule.summary).toEqual({
			parentADays: 12,
			parentBDays: 2,
			parentAPercentage: 86,
			parentBPercentage: 14,
			totalDays: 14,
		});
		expect(schedule.events?.some((event) => event.date === '2026-06-17' && event.type === 'dinner' && event.label === 'Dinner Visit')).toBe(true);
	});

	it('summarizes visible and annual 80/20 percentages separately', () => {
		const { summary, patternSummary } = generateVisibleMonthSchedule({
			scheduleType: '80-20',
			startDate: '2026-06-20',
			monthDate: '2026-06-20',
			eightyTwentyPattern: 'long-distance',
		});

		expect(summary.parentBPercentage).not.toBe(patternSummary?.annualAverage.parentBPercentage);
		expect(patternSummary?.explanatoryText).toContain('Visible month');
		expect(patternSummary?.explanatoryText).toContain('Annual average');
	});

	it.each([
		['2026-06-06', { parentADays: 18, parentBDays: 7, parentAPercentage: 72, parentBPercentage: 28, totalDays: 25 }],
		['2026-06-07', { parentADays: 18, parentBDays: 6, parentAPercentage: 75, parentBPercentage: 25, totalDays: 24 }],
		['2026-06-08', { parentADays: 17, parentBDays: 6, parentAPercentage: 74, parentBPercentage: 26, totalDays: 23 }],
		['2026-06-09', { parentADays: 16, parentBDays: 6, parentAPercentage: 73, parentBPercentage: 27, totalDays: 22 }],
	])('keeps every-weekend 70/30 visible-month math overnight-based for %s', (startsOn, expectedSummary) => {
		const { summary } = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: startsOn,
			monthDate: startsOn,
			seventyThirtyPattern: 'every-weekend',
		});

		expect(summary).toEqual(expectedSummary);
	});

	it('assigns every Friday and Saturday to Parent B for 70/30 every-weekend in June 2026', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-06',
			monthDate: '2026-06-06',
			seventyThirtyPattern: 'every-weekend',
		});

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date)).toEqual([
			'2026-06-06',
			'2026-06-12',
			'2026-06-13',
			'2026-06-19',
			'2026-06-20',
			'2026-06-26',
			'2026-06-27',
		]);
		expect(june.days.find((day) => day.date === '2026-06-07')?.parent).toBe('A');
	});

	it('starts the first full 70/30 every-weekend block on the next Friday after a Tuesday start', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-09',
			monthDate: '2026-06-09',
			seventyThirtyPattern: 'every-weekend',
		});

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date).slice(0, 2)).toEqual([
			'2026-06-12',
			'2026-06-13',
		]);
		expect(june.days.find((day) => day.date === '2026-06-09')?.parent).toBe('A');
	});

	it('distinguishes every-weekend from alternating-weekends for 70/30', () => {
		const everyWeekend = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-09',
			monthDate: '2026-06-09',
			seventyThirtyPattern: 'every-weekend',
		}).days.filter((day) => day.parent === 'B').map((day) => day.date);
		const alternatingWeekends = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-09',
			monthDate: '2026-06-09',
			seventyThirtyPattern: 'alternating-weekends',
		}).days.filter((day) => day.parent === 'B').map((day) => day.date);

		expect(everyWeekend).toEqual([
			'2026-06-12',
			'2026-06-13',
			'2026-06-19',
			'2026-06-20',
			'2026-06-26',
			'2026-06-27',
		]);
		expect(alternatingWeekends).toEqual([
			'2026-06-12',
			'2026-06-13',
			'2026-06-26',
			'2026-06-27',
		]);
	});

	it('generates the structured 5-2 pattern for 70/30', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '70-30',
			startDate,
			numberOfDays: 7,
			seventyThirtyPattern: '5-2',
		});

		expect(summary).toEqual({
			parentADays: 5,
			parentBDays: 2,
			parentAPercentage: 71,
			parentBPercentage: 29,
			totalDays: 7,
		});
	});

	it('generates every-3rd-week 70/30-style blocks as 14/7 over 21 days', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '70-30',
			startDate,
			numberOfDays: 21,
			seventyThirtyPattern: 'every-3rd-week',
		});

		expect(summary).toEqual({
			parentADays: 14,
			parentBDays: 7,
			parentAPercentage: 67,
			parentBPercentage: 33,
			totalDays: 21,
		});
	});

	it('generates every-3rd-day 70/30-style blocks as 2/1 over 3 days', () => {
		const parents = generateCustodySchedule({
			scheduleType: '70-30',
			startDate,
			numberOfDays: 6,
			seventyThirtyPattern: 'every-3rd-day',
		}).days.map((day) => day.parent);

		expect(parents).toEqual(['A', 'A', 'B', 'A', 'A', 'B']);
	});

	it('generates alternating-weekend 70/30-style blocks as Friday and Saturday overnights', () => {
		const days = generateCustodySchedule({
			scheduleType: '70-30',
			startDate: '2026-06-12',
			numberOfDays: 5,
			seventyThirtyPattern: 'alternating-weekends',
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days).toEqual([
			'2026-06-12:B',
			'2026-06-13:B',
			'2026-06-14:A',
			'2026-06-15:A',
			'2026-06-16:A',
		]);
	});

	it.each([
		['2026-06-13'],
	])('keeps Saturday starts inside the same Parent B weekend for 70/30 alternating weekends: %s', (startsOn) => {
		const days = generateCustodySchedule({
			scheduleType: '70-30',
			startDate: startsOn,
			numberOfDays: 4,
			seventyThirtyPattern: 'alternating-weekends',
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days.at(0)).toBe(`${startsOn}:B`);
		expect(days).not.toContain('2026-06-15:B');
		expect(days).toContain('2026-06-15:A');
	});

	it('normalizes a midweek 70/30 alternating-weekends start to that week’s Friday', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-09',
			monthDate: '2026-06-09',
			seventyThirtyPattern: 'alternating-weekends',
		});
		const parentBDates = june.days.filter((day) => day.parent === 'B').map((day) => day.date);

		expect(parentBDates).toEqual([
			'2026-06-12',
			'2026-06-13',
			'2026-06-26',
			'2026-06-27',
		]);
		expect(parentBDates).not.toContain('2026-06-14');
		expect(parentBDates).not.toContain('2026-06-15');
		expect(parentBDates).not.toContain('2026-06-28');
		expect(parentBDates).not.toContain('2026-06-29');
	});

	it('calculates 70/30 alternating-weekends visible-month counts from colored overnight ownership', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: '70-30',
			startDate: '2026-06-12',
			monthDate: '2026-06-12',
			seventyThirtyPattern: 'alternating-weekends',
		});
		const parentADays = june.days.filter((day) => day.parent === 'A').length;
		const parentBDays = june.days.filter((day) => day.parent === 'B').length;

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date)).toEqual([
			'2026-06-12',
			'2026-06-13',
			'2026-06-26',
			'2026-06-27',
		]);
		expect(june.summary).toEqual({
			parentADays,
			parentBDays,
			parentAPercentage: Math.round((parentADays / (parentADays + parentBDays)) * 100),
			parentBPercentage: 100 - Math.round((parentADays / (parentADays + parentBDays)) * 100),
			totalDays: parentADays + parentBDays,
		});
	});

	it('keeps the overnight-only 70/30 alternating-weekends long-cycle split at 12/2 over 14 days', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '70-30',
			startDate: '2026-06-12',
			numberOfDays: 14,
			seventyThirtyPattern: 'alternating-weekends',
		});

		expect(summary).toEqual({
			parentADays: 12,
			parentBDays: 2,
			parentAPercentage: 86,
			parentBPercentage: 14,
			totalDays: 14,
		});
	});

	it('every-other-weekend aligns a Monday start date to the next Friday', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: 'every-other-weekend',
			startDate: '2026-06-01',
			monthDate: '2026-06-01',
		});

		expect(june.days.filter((day) => day.parent === 'B').map((day) => day.date)).toEqual([
			'2026-06-05',
			'2026-06-06',
			'2026-06-19',
			'2026-06-20',
		]);
		expect(june.summary).toEqual({
			parentADays: 26,
			parentBDays: 4,
			parentAPercentage: 87,
			parentBPercentage: 13,
			totalDays: 30,
		});
	});

	it('every-other-weekend uses a Friday start date as the same Parent B weekend start', () => {
		const days = generateCustodySchedule({
			scheduleType: 'every-other-weekend',
			startDate: '2026-06-05',
			numberOfDays: 21,
		}).days.map((day) => `${day.date}:${day.parent}`);

		expect(days).toEqual([
			'2026-06-05:B',
			'2026-06-06:B',
			'2026-06-07:A',
			'2026-06-08:A',
			'2026-06-09:A',
			'2026-06-10:A',
			'2026-06-11:A',
			'2026-06-12:A',
			'2026-06-13:A',
			'2026-06-14:A',
			'2026-06-15:A',
			'2026-06-16:A',
			'2026-06-17:A',
			'2026-06-18:A',
			'2026-06-19:B',
			'2026-06-20:B',
			'2026-06-21:A',
			'2026-06-22:A',
			'2026-06-23:A',
			'2026-06-24:A',
			'2026-06-25:A',
		]);
	});

	it('every-other-weekend only assigns Parent B to Friday and Saturday blocks', () => {
		const june = generateVisibleMonthSchedule({
			scheduleType: 'every-other-weekend',
			startDate: '2026-06-01',
			monthDate: '2026-06-01',
		});
		const parentBDays = june.days.filter((day) => day.parent === 'B');

		expect(parentBDays.map((day) => getDay(parseISO(day.date)))).toEqual([5, 6, 5, 6]);
		expect(parentBDays.map((day) => day.date)).not.toContain('2026-06-01');
		expect(parentBDays.map((day) => day.date)).not.toContain('2026-06-02');
		expect(parentBDays.map((day) => day.date)).not.toContain('2026-06-03');
	});

	it('every-other-weekend repeats Parent B weekends every 14 days', () => {
		const days = generateCustodySchedule({
			scheduleType: 'every-other-weekend',
			startDate: '2026-06-01',
			numberOfDays: 35,
		}).days.filter((day) => day.parent === 'B').map((day) => day.date);

		expect(days).toEqual([
			'2026-06-05',
			'2026-06-06',
			'2026-06-19',
			'2026-06-20',
			'2026-07-03',
			'2026-07-04',
		]);
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

	it('calculates every-other-weekend summary over 14 days', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: 'every-other-weekend',
			startDate: '2026-06-05',
			numberOfDays: 14,
		});

		expect(summary).toEqual({
			parentADays: 12,
			parentBDays: 2,
			parentAPercentage: 86,
			parentBPercentage: 14,
			totalDays: 14,
		});
	});

	it('calculates default 60/40 4-3 summary over 14 days', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 14,
		});

		expect(summary).toEqual({
			parentADays: 8,
			parentBDays: 6,
			parentAPercentage: 57,
			parentBPercentage: 43,
			totalDays: 14,
		});
	});

	it('calculates exact 60/40 summary over 10 days when exact pattern is selected', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 10,
			sixtyFortyPattern: 'exact-60-40',
		});

		expect(summary).toEqual({
			parentADays: 6,
			parentBDays: 4,
			parentAPercentage: 60,
			parentBPercentage: 40,
			totalDays: 10,
		});
	});

	it('calculates 80/20 summary over a 14-day every-other-weekend cycle', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '80-20',
			startDate: '2026-06-12',
			numberOfDays: 14,
		});

		expect(summary).toEqual({
			parentADays: 12,
			parentBDays: 2,
			parentAPercentage: 86,
			parentBPercentage: 14,
			totalDays: 14,
		});
	});

	it('calculates exact 60/40 summary over 100 days when exact pattern is selected', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 100,
			sixtyFortyPattern: 'exact-60-40',
		});

		expect(summary).toEqual({
			parentADays: 60,
			parentBDays: 40,
			parentAPercentage: 60,
			parentBPercentage: 40,
			totalDays: 100,
		});
	});

	it('calculates approximately 60/40 summary over 365 days when exact pattern is selected', () => {
		const { summary } = generateCustodySchedule({
			scheduleType: '60-40',
			startDate,
			numberOfDays: 365,
			sixtyFortyPattern: 'exact-60-40',
		});

		expect(summary).toEqual({
			parentADays: 219,
			parentBDays: 146,
			parentAPercentage: 60,
			parentBPercentage: 40,
			totalDays: 365,
		});
	});

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
		['60-40', { parentADays: 19, parentBDays: 12, parentAPercentage: 61, parentBPercentage: 39, totalDays: 31 }],
		['70-30', { parentADays: 21, parentBDays: 10, parentAPercentage: 68, parentBPercentage: 32, totalDays: 31 }],
		['80-20', { parentADays: 25, parentBDays: 6, parentAPercentage: 81, parentBPercentage: 19, totalDays: 31 }],
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
