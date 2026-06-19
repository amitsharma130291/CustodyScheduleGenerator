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
	cons?: string;
	parentTimeSplit?: string;
	guideLabel?: string;
	badge?: string;
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
	ogTitle?: string;
	ogDescription?: string;
	canonicalUrl?: string;
	lastUpdated?: string;
	lede: string;
	trust?: {
		reviewerLabel: string;
		reviewerName: string;
		reviewerCredential: string;
		reviewerHref?: string;
		authorName: string;
		authorTitle: string;
		authorBio: string;
		authorHref?: string;
		factCheckedDate?: string;
		legalReviewerPlaceholder?: string;
		disclaimer: string;
	};
	hero?: {
		definition: string;
		bestFor: string;
		proChips: string[];
		conChips: string[];
		ctas: Array<{
			text: string;
			href: string;
			variant: 'primary' | 'secondary';
		}>;
	};
	overviewTitle?: string;
	overview: string[];
	howItWorks?: {
		title: string;
		description: string[];
	};
	printableDownload?: {
		title: string;
		description: string;
		options: Array<{
			title: string;
			description: string;
			status?: 'available' | 'coming-soon';
			href?: string;
		}>;
		ctas: Array<{
			text: string;
			href: string;
			variant: 'primary' | 'secondary';
			disabled?: boolean;
		}>;
		yearOptions?: string[];
	};
	atAGlance?: Array<{
		label: string;
		value: string;
	}>;
	atAGlanceTitle?: string;
	timeline?: {
		title: string;
		description: string;
		weeks: ScheduleExampleWeek[];
	};
	fitGuide?: {
		title: string;
		description: string;
		cards: Array<{
			title: string;
			description: string;
			items: string[];
		}>;
	};
	parentingPlanLanguage?: {
		title: string;
		description: string;
		clause: string;
		disclaimer: string;
	};
	deepDiveSections?: Array<{
		id: string;
		title: string;
		kicker?: string;
		paragraphs: string[];
		items?: Array<{
			title: string;
			description: string;
		}>;
	}>;
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
		libraryPromo?: {
			heading?: string;
			description: string;
			buttonText: string;
			href: string;
		};
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
		ageApproach?: {
			title: string;
			description: string;
			rows: Array<{
				age: string;
				recommended: string;
				guideHref?: string;
				reason: string;
			}>;
		};
		whenWorksBest?: {
			title: string;
			rows: Array<{
				situation: string;
				why: string;
				watchFor: string;
			}>;
		};
		whenMayNotFit?: {
			title: string;
			rows: Array<{
				situation: string;
				tradeoff: string;
				consider: string;
			}>;
		};
		percentageMatrix?: {
			title: string;
			rows: Array<{
				schedule: string;
				href: string;
				parentA: string;
				parentB: string;
				bestFor: string;
				stability: string;
				exchangeFrequency: string;
				badge?: string;
			}>;
		};
		scheduleCards?: {
			title: string;
			description: string;
			items: Array<{
				title: string;
				badge: string;
				bestFor: string;
				pros: string[];
				watchOutFor: string;
				complexity: 'Low' | 'Medium' | 'High';
			}>;
		};
		mistakes?: {
			title: string;
			items: Array<{
				title: string;
				problem: string;
				why: string;
				betterApproach: string;
			}>;
		};
		betterThanFifty?: {
			title: string;
			sixtyForty: string[];
			fiftyFifty: string[];
			ctaText: string;
		};
		shiftLater?: {
			title: string;
			description: string[];
			reviewPoints: string[];
			ctaText: string;
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
		childSupport?: {
			title: string;
			description: string[];
			factors: string[];
			ctaText: string;
		};
		decisionSummary?: {
			title: string;
			description: string[];
			primaryCta?: {
				text: string;
				href: string;
			};
			secondaryCta?: {
				text: string;
				href: string;
			};
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
	article?: {
		headline: string;
		authorName: string;
		reviewerName: string;
		datePublished: string;
		dateModified: string;
	};
}
