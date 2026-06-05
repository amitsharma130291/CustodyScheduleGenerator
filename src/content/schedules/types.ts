import type { ScheduleInputType } from '../../lib/schedules/types';

export interface ScheduleFAQ {
	question: string;
	answer: string;
	answerHtml?: string;
}

export interface RelatedSchedule {
	title: string;
	slug: string;
	description: string;
}

export interface ScheduleExampleBlock {
	parent: string;
	days: string;
}

export interface ScheduleExampleWeek {
	label: string;
	blocks: ScheduleExampleBlock[];
}

export interface ScheduleComparisonRow {
	schedule: string;
	href: string;
	bestFor: string;
	exchangeFrequency: string;
	weekendPattern: string;
	notes: string;
}

export interface ScheduleExampleSummary {
	title: string;
	description: string;
	href?: string;
}

export interface ScheduleInternalLink {
	title: string;
	slug: string;
	description: string;
}

export interface ScheduleContent {
	id: ScheduleInputType;
	title: string;
	slug: string;
	description: string;
	metaTitle: string;
	metaDescription: string;
	canonicalUrl?: string;
	lede: string;
	overviewTitle?: string;
	overview: string[];
	howItWorks?: {
		title: string;
		description: string[];
	};
	pros: string[];
	cons: string[];
	example: {
		title: string;
		description: string;
		weeks?: ScheduleExampleWeek[];
	};
	comparison?: {
		title: string;
		description: string;
		rows: ScheduleComparisonRow[];
		cta?: {
			title: string;
			links: ScheduleInternalLink[];
		};
	};
	examples?: {
		title: string;
		description: string;
		items: ScheduleExampleSummary[];
	};
	faq: ScheduleFAQ[];
	relatedSchedules: string[];
	relatedTools: RelatedSchedule[];
	relatedHeading?: string;
	relatedLinks?: ScheduleInternalLink[];
}
