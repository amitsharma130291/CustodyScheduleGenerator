import type { ScheduleId } from '../../lib/schedules/types';

export interface ScheduleFAQ {
	question: string;
	answer: string;
}

export interface RelatedSchedule {
	title: string;
	slug: string;
	description: string;
}

export interface ScheduleContent {
	id: ScheduleId;
	title: string;
	slug: string;
	description: string;
	metaTitle: string;
	metaDescription: string;
	lede: string;
	overview: string[];
	pros: string[];
	cons: string[];
	example: {
		title: string;
		description: string;
	};
	faq: ScheduleFAQ[];
	relatedSchedules: string[];
	relatedTools: RelatedSchedule[];
}
