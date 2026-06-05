import { getAllSchedules } from './engine';
import type { ScheduleDefinition, ScheduleType } from './types';

export const scheduleDefinitions: Record<ScheduleType, ScheduleDefinition> = Object.fromEntries(
	getAllSchedules().map((schedule) => [
		schedule.id,
		{
			id: schedule.id,
			name: schedule.name,
			shortName: schedule.shortName,
			description: schedule.description,
			cycle: schedule.pattern,
			slug: schedule.slug,
		},
	]),
) as Record<ScheduleType, ScheduleDefinition>;

export const scheduleDefinitionList = Object.values(scheduleDefinitions);
