type Ga4EventName =
	| 'generate_calendar'
	| 'export_monthly_pdf'
	| 'export_yearly_pdf'
	| 'copy_calendar_link'
	| 'view_schedule_recommendation'
	| 'view_texas_child_support'
	| 'calculate_child_support'
	| (string & {});

type Ga4EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
	interface Window {
		gtag?: (command: 'event', eventName: string, params?: Ga4EventParams) => void;
	}
}

/** Generic GA4 event helper — fires only when gtag is available; safe for SSR and missing analytics. */
export function trackEvent(eventName: string, params: Ga4EventParams = {}) {
	if (typeof window === 'undefined') return;
	if (typeof window.gtag !== 'function') return;

	window.gtag('event', eventName, params);
}

export function trackGa4Event(eventName: Ga4EventName, params: Ga4EventParams = {}) {
	if (!import.meta.env.PROD) return;
	trackEvent(eventName, params);
}
