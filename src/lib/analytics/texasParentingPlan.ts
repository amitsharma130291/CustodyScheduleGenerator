import { trackEvent } from './ga4';

const PAGE_TYPE = 'texas_parenting_plan_template';
const SESSION_PREFIX = 'cb_tx_plan_';

const TRACKED_INTERNAL_PATHS = new Set([
	'/custody-schedule-generator',
	'/parenting-time-calculator',
	'/custody-percentage-calculator',
	'/visitation-calculator',
	'/50-50-custody-schedule-generator',
	'/50-50-custody-schedule',
	'/standard-possession-order',
	'/custody-calendar-template',
	'/parenting-plan-template',
]);

const SUMMER_RULES_OPTION = 'Use Texas summer possession rules';
const SUMMER_CUSTOM_OPTION = 'Custom summer dates';
const HOLIDAY_TEXAS_OPTION = 'Texas holiday schedule';
const HOLIDAY_ALTERNATING_OPTION = 'Alternating holidays';
const HOLIDAY_CUSTOM_OPTION = 'Custom holiday plan';

export interface TexasPlanSnapshot {
	scheduleType: string;
	distance: string;
	summerPossession: string;
	holidays: string;
	pdfOptions?: string;
	notes?: string;
}

let analyticsReady = false;
let notesDebounceTimer: ReturnType<typeof setTimeout> | undefined;
let notesTracked = false;

function trackTexasEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
	trackEvent(eventName, { page_type: PAGE_TYPE, ...params });
}

function sessionFlag(key: string) {
	return `${SESSION_PREFIX}${key}`;
}

function hasSessionFlag(key: string) {
	try {
		return window.sessionStorage.getItem(sessionFlag(key)) === '1';
	} catch {
		return false;
	}
}

function setSessionFlag(key: string) {
	try {
		window.sessionStorage.setItem(sessionFlag(key), '1');
	} catch {
		// sessionStorage may be unavailable; in-memory only for this page load.
	}
}

function toSnakeCase(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');
}

export function normalizeTexasScheduleType(scheduleType: string) {
	const map: Record<string, string> = {
		spo: 'standard_spo',
		expanded: 'expanded_spo',
		fifty: 'fifty_fifty',
		weekend: 'every_other_weekend',
	};
	return map[scheduleType] ?? toSnakeCase(scheduleType);
}

export function normalizeTexasDistance(distance: string) {
	return distance === 'far' ? 'over_100_miles' : 'under_100_miles';
}

export function normalizeTexasSummerOption(value: string) {
	if (value === SUMMER_RULES_OPTION) return 'texas_rules';
	if (value === SUMMER_CUSTOM_OPTION) return 'custom';
	if (value === 'Decide later') return 'decide_later';
	return toSnakeCase(value);
}

export function normalizeTexasHolidayMode(value: string) {
	if (value === HOLIDAY_TEXAS_OPTION || value === HOLIDAY_ALTERNATING_OPTION) {
		return 'texas_holiday_schedule';
	}
	if (value === HOLIDAY_CUSTOM_OPTION) return 'custom_holiday_plan';
	return toSnakeCase(value);
}

export function normalizeTexasPdfOption(value: string) {
	return toSnakeCase(value);
}

export function getTexasConversionParams(snapshot: TexasPlanSnapshot) {
	return {
		schedule_type: normalizeTexasScheduleType(snapshot.scheduleType),
		distance: normalizeTexasDistance(snapshot.distance),
		summer_option: normalizeTexasSummerOption(snapshot.summerPossession),
		holiday_mode: normalizeTexasHolidayMode(snapshot.holidays),
	};
}

/** Mark analytics ready after initial render so auto-updates do not count as conversions. */
export function markTexasAnalyticsReady() {
	analyticsReady = true;
}

/** texas_plan_builder_started — first meaningful tool interaction, once per session. */
export function trackTexasBuilderStarted() {
	if (hasSessionFlag('builder_started')) return;
	setSessionFlag('builder_started');
	trackTexasEvent('texas_plan_builder_started');
}

/** texas_schedule_selected — user changes possession schedule. */
export function trackTexasScheduleSelected(scheduleType: string) {
	trackTexasEvent('texas_schedule_selected', {
		schedule_type: normalizeTexasScheduleType(scheduleType),
	});
}

/** texas_distance_selected — distance dropdown changes. */
export function trackTexasDistanceSelected(distance: string) {
	trackTexasEvent('texas_distance_selected', {
		distance: normalizeTexasDistance(distance),
	});
}

/** texas_summer_option_changed — summer possession dropdown changes. */
export function trackTexasSummerOptionChanged(summerPossession: string) {
	trackTexasEvent('texas_summer_option_changed', {
		summer_option: normalizeTexasSummerOption(summerPossession),
	});
}

/** texas_holiday_option_changed — holiday dropdown changes. */
export function trackTexasHolidayOptionChanged(holidays: string) {
	trackTexasEvent('texas_holiday_option_changed', {
		holiday_mode: normalizeTexasHolidayMode(holidays),
	});
}

/** texas_plan_notes_added — debounced after meaningful notes input (>= 10 chars), once per session. */
export function trackTexasNotesAddedDebounced(notes: string) {
	window.clearTimeout(notesDebounceTimer);
	notesDebounceTimer = window.setTimeout(() => {
		const characterCount = notes.trim().length;
		if (characterCount < 10 || notesTracked) return;
		notesTracked = true;
		trackTexasEvent('texas_plan_notes_added', { character_count: characterCount });
	}, 800);
}

/** texas_calendar_generated — micro-conversion when preview is generated after schedule change or customize. */
export function trackTexasCalendarGenerated(snapshot: TexasPlanSnapshot) {
	if (!analyticsReady) return;
	trackTexasEvent('texas_calendar_generated', getTexasConversionParams(snapshot));
}

/** texas_plan_print_clicked — primary conversion when Print / Save PDF is clicked. */
export function trackTexasPrintClicked(snapshot: TexasPlanSnapshot) {
	trackTexasEvent('texas_plan_print_clicked', {
		...getTexasConversionParams(snapshot),
		pdf_option: normalizeTexasPdfOption(snapshot.pdfOptions || 'calendar_and_parenting_plan_outline'),
	});
}

/** texas_schedule_comparison_viewed — View schedules / Compare schedules CTA clicks. */
export function trackTexasScheduleComparisonViewed() {
	trackTexasEvent('texas_schedule_comparison_viewed', { source: 'tool_cta' });
}

/** texas_faq_opened — FAQ accordion opens. */
export function trackTexasFaqOpened(question: string) {
	trackTexasEvent('texas_faq_opened', { question });
}

/** internal_link_clicked — topical cluster outbound links on this page. */
export function trackTexasInternalLinkClicked(destination: string, linkText: string) {
	trackTexasEvent('internal_link_clicked', {
		destination,
		link_text: linkText,
		source_page: PAGE_TYPE,
	});
}

const BUILDER_FIELD_NAMES = new Set([
	'scheduleType',
	'parentA',
	'parentB',
	'childAge',
	'distance',
	'startDate',
	'summerPossession',
	'holidays',
	'notes',
]);

/** Route form interactions to the correct Texas analytics events. */
export function handleTexasFormFieldChange(event: Event, snapshot: TexasPlanSnapshot) {
	const target = event.target;
	if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
		return;
	}

	if (!BUILDER_FIELD_NAMES.has(target.name)) return;

	trackTexasBuilderStarted();

	if (target.name === 'scheduleType') {
		trackTexasScheduleSelected(snapshot.scheduleType);
		trackTexasCalendarGenerated(snapshot);
		return;
	}

	if (target.name === 'distance') {
		trackTexasDistanceSelected(snapshot.distance);
		return;
	}

	if (target.name === 'summerPossession') {
		trackTexasSummerOptionChanged(snapshot.summerPossession);
		return;
	}

	if (target.name === 'holidays') {
		trackTexasHolidayOptionChanged(snapshot.holidays);
		return;
	}

	if (target.name === 'notes') {
		trackTexasNotesAddedDebounced(snapshot.notes || '');
	}
}

function normalizeLinkPath(href: string) {
	try {
		const url = new URL(href, window.location.origin);
		let path = url.pathname.replace(/\/+$/, '') || '/';
		if (path !== '/' && !path.endsWith('/')) path += '/';
		return path.replace(/\/$/, '') || '/';
	} catch {
		return '';
	}
}

function isTrackedInternalLink(path: string) {
	const normalized = path.replace(/\/$/, '') || '/';
	return TRACKED_INTERNAL_PATHS.has(normalized);
}

function isScheduleComparisonCta(link: HTMLAnchorElement) {
	const label = link.textContent?.trim().toLowerCase() ?? '';
	return (
		label === 'view schedules' ||
		label === 'compare schedules' ||
		label === 'compare texas custody schedules'
	);
}

/** Wire scroll depth, FAQ, internal links, and comparison CTA tracking for this page. */
export function initTexasParentingPlanAnalytics() {
	const scrollFlags = { fifty: false, seventyFive: false, ninety: false };
	let scrollListener: (() => void) | null = null;

	const onScroll = () => {
		const doc = document.documentElement;
		const scrollable = doc.scrollHeight - window.innerHeight;
		if (scrollable <= 0) return;

		const depth = (window.scrollY / scrollable) * 100;

		if (!scrollFlags.fifty && depth >= 50) {
			scrollFlags.fifty = true;
			if (!hasSessionFlag('scroll_50')) {
				setSessionFlag('scroll_50');
				trackTexasEvent('texas_content_50_percent');
			}
		}

		if (!scrollFlags.seventyFive && depth >= 75) {
			scrollFlags.seventyFive = true;
			if (!hasSessionFlag('scroll_75')) {
				setSessionFlag('scroll_75');
				trackTexasEvent('texas_content_75_percent');
			}
		}

		if (!scrollFlags.ninety && depth >= 90) {
			scrollFlags.ninety = true;
			if (!hasSessionFlag('scroll_90')) {
				setSessionFlag('scroll_90');
				trackTexasEvent('texas_content_90_percent');
			}
		}

		if (scrollFlags.fifty && scrollFlags.seventyFive && scrollFlags.ninety && scrollListener) {
			window.removeEventListener('scroll', scrollListener);
			scrollListener = null;
		}
	};

	scrollListener = onScroll;
	window.addEventListener('scroll', scrollListener, { passive: true });
	onScroll();

	document.querySelectorAll('[data-faq-summary]').forEach((summary) => {
		const details = summary.closest('details');
		if (!(details instanceof HTMLDetailsElement)) return;

		details.addEventListener('toggle', () => {
			if (!details.open) return;
			const question = summary.textContent?.replace('+', '').trim() ?? '';
			if (question) trackTexasFaqOpened(question);
		});
	});

	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		const link = target.closest('a[href]');
		if (link instanceof HTMLAnchorElement) {
			if (isScheduleComparisonCta(link)) {
				trackTexasScheduleComparisonViewed();
			}

			const path = normalizeLinkPath(link.getAttribute('href') || '');
			if (path && isTrackedInternalLink(path)) {
				trackTexasInternalLinkClicked(path, link.textContent?.trim() || path);
			}
		}
	});
}
