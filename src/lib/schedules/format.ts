import { format, startOfMonth } from 'date-fns';
import type { GeneratedSchedule } from './types';

export function getDefaultStartDate() {
	return format(startOfMonth(new Date()), 'yyyy-MM-dd');
}

export function formatParentingSummary(schedule: GeneratedSchedule) {
	const { parentA, parentB } = schedule.parentDayCounts;
	const total = parentA + parentB || 1;
	const parentAPercentage = Math.round((parentA / total) * 100);
	const parentBPercentage = 100 - parentAPercentage;

	return {
		parentA: `${schedule.parentNames.parentA}: ${parentA} days (${parentAPercentage}%)`,
		parentB: `${schedule.parentNames.parentB}: ${parentB} days (${parentBPercentage}%)`,
	};
}

export function formatScheduleTitle(schedule: GeneratedSchedule) {
	return `${schedule.definition.shortName} schedule for ${schedule.monthLabel}`;
}
