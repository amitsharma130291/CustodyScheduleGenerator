import schedule223 from './223';
import schedule2255 from './2255';
import schedule3443 from './3443';
import schedule5050 from './5050';
import schedule5225 from './5225';
import schedule6040 from './6040';
import schedule7030 from './7030';
import schedule8020 from './8020';
import everyOtherWeekend from './every-other-weekend';
import weekOnWeekOff from './week-on-week-off';
import type { ScheduleContent } from './types';

export const schedules: ScheduleContent[] = [
	schedule223,
	schedule2255,
	schedule5225,
	schedule3443,
	weekOnWeekOff,
	schedule5050,
	schedule6040,
	schedule7030,
	schedule8020,
	everyOtherWeekend,
];

export function getScheduleBySlug(slug: string) {
	return schedules.find((schedule) => schedule.slug === slug);
}

export function getRelatedSchedules(schedule: ScheduleContent) {
	return schedule.relatedSchedules
		.map((slug) => getScheduleBySlug(slug))
		.filter((related): related is ScheduleContent => Boolean(related));
}

export const schedulePaths = schedules.map((schedule) => `/${schedule.slug}`);
