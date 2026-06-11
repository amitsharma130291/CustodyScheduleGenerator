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
	weekendPattern?: string;
	notes: string;
}

export interface ScheduleExampleSummary {
	title: string;
	description: string;
	href?: string;
	approxSplit?: string;
	bestUseCase?: string;
	familySituation?: string;
	scheduleUsed?: string;
	whyItWorks?: string;
	potentialIssue?: string;
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
		columnLabels?: {
			schedule?: string;
			bestFor?: string;
			exchangeFrequency?: string;
			weekendPattern?: string;
			notes?: string;
		};
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
	decisionGuide?: {
		quickAnswer?: {
			title: string;
			description: string;
			items: Array<{
				label: string;
				title: string;
				href: string;
			}>;
		};
		bestOverall?: {
			title: string;
			description: string;
			items: Array<{
				rank: string;
				title: string;
				href: string;
				reasons: string[];
			}>;
		};
		masterMatrix?: {
			title: string;
			rows: Array<{
				schedule: string;
				href: string;
				bestAgeFit: string;
				exchanges: string;
				schoolStability: string;
				easeToFollow: string;
				bestFor: string;
				watchOutFor: string;
			}>;
		};
		byAge?: {
			title: string;
			description: string;
			rows: Array<{
				age: string;
				recommended: string;
				href: string;
				guideHref: string;
				reason: string;
			}>;
		};
		alternatingWeekends?: {
			title: string;
			description: string[];
			weeks: ScheduleExampleWeek[];
		};
		workSchedules?: {
			title: string;
			description: string[];
			items: Array<{
				title: string;
				description: string;
			}>;
		};
		fitMatrix?: {
			title: string;
			rows: Array<{
				situation: string;
				recommended: string;
				href?: string;
			}>;
		};
		terms?: {
			title: string;
			description: string;
			rows: Array<{
				term: string;
				meaning: string;
				href?: string;
				explanation: string;
			}>;
		};
		easeComparison?: {
			title: string;
			items: Array<{
				schedule: string;
				href: string;
				exchangeFrequency: string;
				routineComplexity: string;
				schoolFriendliness: string;
				transitionLoad: string;
			}>;
		};
		commonStart?: {
			title: string;
			description: string[];
		};
		wrongScheduleInsight?: {
			title: string;
			description: string[];
			takeaway: string;
		};
		logistics?: {
			title: string;
			description: string[];
			items: string[];
		};
		holidayOverride?: {
			title: string;
			description: string[];
			rows: Array<{
				scenario: string;
				normalSchedule: string;
				holidayExample: string;
			}>;
		};
		whenNotFit?: {
			title: string;
			description: string[];
			items: Array<{
				title: string;
				description: string;
			}>;
		};
		insight?: {
			title: string;
			description: string[];
		};
		ctaHub?: {
			title: string;
			items: ScheduleInternalLink[];
		};
	};
	faq: ScheduleFAQ[];
	relatedSchedules: string[];
	relatedTools: RelatedSchedule[];
	relatedHeading?: string;
	relatedLinks?: ScheduleInternalLink[];
}
