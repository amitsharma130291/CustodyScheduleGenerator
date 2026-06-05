import { format } from 'date-fns';
import { generateCustodySchedule } from './engine';

const today = format(new Date(), 'yyyy-MM-dd');

export const twoTwoThreeStartingToday = generateCustodySchedule({
	scheduleType: '223',
	startDate: today,
});

export const weekOnWeekOffStartingToday = generateCustodySchedule({
	scheduleType: 'week-on-week-off',
	startDate: today,
});
