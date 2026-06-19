import type { GeneratedSchedule, ParentKey } from './types';
import { generateSchedule } from './generateSchedule';

/** Thanksgiving break override dates for the demo month (November 2026). */
const thanksgivingOverrideDates = new Set([
	'2026-11-25',
	'2026-11-26',
	'2026-11-27',
	'2026-11-28',
	'2026-11-29',
]);

export function buildThanksgivingOverrideSchedule(): GeneratedSchedule {
	const base = generateSchedule({
		scheduleId: '2255',
		startDate: '2026-01-05',
		monthDate: '2026-11-01',
	});

	const days = base.days.map((day) => {
		if (!day.isCurrentMonth || !thanksgivingOverrideDates.has(day.date)) {
			return day;
		}

		return {
			...day,
			parent: 'parentB' as ParentKey,
			parentName: base.parentNames.parentB,
			isHolidayOverride: true,
		};
	});

	const parentDayCounts = { parentA: 0, parentB: 0 };
	for (const day of days) {
		if (day.isCurrentMonth && !day.isPlaceholder) {
			parentDayCounts[day.parent] += 1;
		}
	}

	return {
		...base,
		monthLabel: 'November 2026',
		days,
		parentDayCounts,
	};
}
