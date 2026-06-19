import { describe, expect, it } from 'vitest';
import {
	getTexasConversionParams,
	normalizeTexasDistance,
	normalizeTexasHolidayMode,
	normalizeTexasScheduleType,
	normalizeTexasSummerOption,
} from './texasParentingPlan';

describe('texasParentingPlan analytics normalizers', () => {
	it('maps schedule types to snake_case GA4 values', () => {
		expect(normalizeTexasScheduleType('spo')).toBe('standard_spo');
		expect(normalizeTexasScheduleType('expanded')).toBe('expanded_spo');
		expect(normalizeTexasScheduleType('fifty')).toBe('fifty_fifty');
		expect(normalizeTexasScheduleType('weekend')).toBe('every_other_weekend');
	});

	it('maps distance values', () => {
		expect(normalizeTexasDistance('near')).toBe('under_100_miles');
		expect(normalizeTexasDistance('far')).toBe('over_100_miles');
	});

	it('maps summer and holiday options', () => {
		expect(normalizeTexasSummerOption('Use Texas summer possession rules')).toBe('texas_rules');
		expect(normalizeTexasSummerOption('Custom summer dates')).toBe('custom');
		expect(normalizeTexasSummerOption('Decide later')).toBe('decide_later');
		expect(normalizeTexasHolidayMode('Texas holiday schedule')).toBe('texas_holiday_schedule');
		expect(normalizeTexasHolidayMode('Custom holiday plan')).toBe('custom_holiday_plan');
	});

	it('builds conversion params from snapshot', () => {
		expect(
			getTexasConversionParams({
				scheduleType: 'expanded',
				distance: 'far',
				summerPossession: 'Custom summer dates',
				holidays: 'Texas holiday schedule',
			})
		).toEqual({
			schedule_type: 'expanded_spo',
			distance: 'over_100_miles',
			summer_option: 'custom',
			holiday_mode: 'texas_holiday_schedule',
		});
	});
});
