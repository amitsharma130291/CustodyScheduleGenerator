/**
 * Browser-side half of the Dodo Payments checkout flow. No accounts, no
 * database: proof of purchase is a self-verifying license key kept in
 * localStorage, and the calendar configuration being purchased travels
 * through the Dodo redirect in sessionStorage (this tab only, cleared once
 * consumed). The server (functions/api/checkout/*) only ever answers "did
 * this payment succeed" — it never stores anything.
 */

export interface ImportantDateConfig {
	id: string;
	label: string;
	date: string;
	homeOverride?: 'A' | 'B';
}

export interface CalendarCheckoutConfig {
	scheduleId: string;
	startDate: string;
	parentA: string;
	parentB: string;
	pattern?: string;
	childName?: string;
	importantDates?: ImportantDateConfig[];
}

export interface Entitlement {
	licenseKey: string;
	paymentId: string;
	verifiedAt: string;
}

export type Product = 'calendar' | 'two-home';

const ENTITLEMENT_KEYS: Record<Product, string> = {
	calendar: 'cb_calendar_entitlement',
	'two-home': 'cb_two_home_entitlement',
};
const PENDING_CHECKOUT_KEYS: Record<Product, string> = {
	calendar: 'cb_pending_checkout',
	'two-home': 'cb_pending_two_home_checkout',
};
const LICENSE_TIER_TO_PRODUCT: Record<string, Product> = {
	CAL: 'calendar',
	TWOHOME: 'two-home',
};

/** Fired on `window` any time either product's entitlement is set — components that show/hide based on purchase state can listen instead of polling. */
export const ENTITLEMENT_UPDATED_EVENT = 'cb:entitlement-updated';

export function getEntitlement(product: Product = 'calendar'): Entitlement | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = window.localStorage.getItem(ENTITLEMENT_KEYS[product]);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed.licenseKey === 'string' && typeof parsed.paymentId === 'string') {
			return parsed as Entitlement;
		}
	} catch {
		// Corrupt localStorage value — treat as unentitled rather than throwing.
	}
	return null;
}

function setEntitlement(product: Product, entitlement: Entitlement) {
	window.localStorage.setItem(ENTITLEMENT_KEYS[product], JSON.stringify(entitlement));
	window.dispatchEvent(new CustomEvent(ENTITLEMENT_UPDATED_EVENT, { detail: { product } }));
}

export type ActivateLicenseResult = { ok: true; product: Product; entitlement: Entitlement } | { ok: false; error: string };

/**
 * Restores entitlement from a license key alone — used by the "Reactivate
 * my calendar" email link (?license=...) and the manual "already purchased"
 * paste-a-key box. Re-verifies against Dodo server-side before trusting it.
 * Works for either product — the key's tier prefix (CB-CAL-... vs
 * CB-TWOHOME-...) says which entitlement to set.
 */
export async function activateWithLicenseKey(licenseKey: string): Promise<ActivateLicenseResult> {
	try {
		const response = await fetch('/api/checkout/activate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ licenseKey }),
		});
		const data = await response.json();
		if (!response.ok || !data.ok || !data.licenseKey || !data.paymentId || !data.tier) {
			return { ok: false, error: data.error || 'That license key could not be verified.' };
		}
		const product = LICENSE_TIER_TO_PRODUCT[data.tier];
		if (!product) {
			return { ok: false, error: 'Unrecognized license key type.' };
		}
		const entitlement: Entitlement = { licenseKey: data.licenseKey, paymentId: data.paymentId, verifiedAt: new Date().toISOString() };
		setEntitlement(product, entitlement);
		return { ok: true, product, entitlement };
	} catch {
		return { ok: false, error: 'Network error — please check your connection and try again.' };
	}
}

export async function startCheckout(config: CalendarCheckoutConfig): Promise<void> {
	const response = await fetch('/api/checkout/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			scheduleId: config.scheduleId,
			startDate: config.startDate,
			parentA: config.parentA,
			parentB: config.parentB,
			pattern: config.pattern,
			childName: config.childName,
		}),
	});

	let data: { ok?: boolean; checkoutUrl?: string; sessionId?: string; error?: string };
	try {
		data = await response.json();
	} catch {
		throw new Error('Checkout did not return a valid response.');
	}
	if (!response.ok || !data.ok || !data.checkoutUrl || !data.sessionId) {
		throw new Error(data.error || 'Could not start checkout.');
	}

	window.sessionStorage.setItem(PENDING_CHECKOUT_KEYS.calendar, JSON.stringify({ sessionId: data.sessionId, config }));
	window.location.href = data.checkoutUrl;
}

export type PendingCheckoutResult =
	| { status: 'none' }
	| { status: 'paid'; config: CalendarCheckoutConfig; entitlement: Entitlement }
	| { status: 'not-completed' }
	| { status: 'error' };

/**
 * Call once on every page load. Idempotent and safe to call repeatedly — a
 * refresh, a re-visit, or a retry after a network error all just ask Dodo
 * the same question again via /api/checkout/verify.
 */
export async function resolvePendingCheckout(): Promise<PendingCheckoutResult> {
	if (typeof window === 'undefined') return { status: 'none' };

	const raw = window.sessionStorage.getItem(PENDING_CHECKOUT_KEYS.calendar);
	if (!raw) return { status: 'none' };

	let pending: { sessionId: string; config: CalendarCheckoutConfig };
	try {
		pending = JSON.parse(raw);
	} catch {
		window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS.calendar);
		return { status: 'none' };
	}

	try {
		const response = await fetch(`/api/checkout/verify?session_id=${encodeURIComponent(pending.sessionId)}`);
		const data = await response.json();

		if (data.ok && data.licenseKey && data.paymentId) {
			const entitlement: Entitlement = { licenseKey: data.licenseKey, paymentId: data.paymentId, verifiedAt: new Date().toISOString() };
			setEntitlement('calendar', entitlement);
			window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS.calendar);
			return { status: 'paid', config: pending.config, entitlement };
		}

		// Checkout landed back here without a succeeded payment (cancelled, back
		// button, still processing). Clear the flag so a stale attempt doesn't
		// keep re-asking on every future visit.
		window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS.calendar);
		return { status: 'not-completed' };
	} catch {
		// Network/server hiccup — keep the pending flag so a refresh can retry
		// rather than silently losing a payment that may have actually succeeded.
		return { status: 'error' };
	}
}

export interface TwoHomeQuestionnaireConfig {
	calendarPaymentId?: string;
	childName?: string;
	childAgeRange?: string;
	homeOneLabel?: string;
	homeTwoLabel?: string;
	transitionFrequency?: string;
	schoolDays?: string;
	schoolUniform?: string;
	schoolDevice?: string;
	activities?: string;
	electronics?: string;
	glasses?: string;
	comfortItem?: string;
	clothingStocked?: string;
	customItems?: string;
	packingDifficulty?: string;
}

export async function startTwoHomeCheckout(config: TwoHomeQuestionnaireConfig): Promise<void> {
	const response = await fetch('/api/checkout/create-two-home', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(config),
	});

	let data: { ok?: boolean; checkoutUrl?: string; sessionId?: string; error?: string };
	try {
		data = await response.json();
	} catch {
		throw new Error('Checkout did not return a valid response.');
	}
	if (!response.ok || !data.ok || !data.checkoutUrl || !data.sessionId) {
		throw new Error(data.error || 'Could not start checkout.');
	}

	window.sessionStorage.setItem(PENDING_CHECKOUT_KEYS['two-home'], JSON.stringify({ sessionId: data.sessionId, config, createdAt: Date.now() }));
	window.location.href = data.checkoutUrl;
}

export type PendingTwoHomeCheckoutResult =
	| { status: 'none' }
	| { status: 'paid'; config: TwoHomeQuestionnaireConfig; entitlement: Entitlement }
	| { status: 'not-completed'; staleMs: number }
	| { status: 'error' };

/** Same idempotent pattern as resolvePendingCheckout, for the $7 upsell. */
export async function resolvePendingTwoHomeCheckout(): Promise<PendingTwoHomeCheckoutResult> {
	if (typeof window === 'undefined') return { status: 'none' };

	const raw = window.sessionStorage.getItem(PENDING_CHECKOUT_KEYS['two-home']);
	if (!raw) return { status: 'none' };

	let pending: { sessionId: string; config: TwoHomeQuestionnaireConfig; createdAt?: number };
	try {
		pending = JSON.parse(raw);
	} catch {
		window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS['two-home']);
		return { status: 'none' };
	}

	try {
		const response = await fetch(`/api/checkout/verify-two-home?session_id=${encodeURIComponent(pending.sessionId)}`);
		const data = await response.json();

		if (data.ok && data.licenseKey && data.paymentId) {
			const entitlement: Entitlement = { licenseKey: data.licenseKey, paymentId: data.paymentId, verifiedAt: new Date().toISOString() };
			setEntitlement('two-home', entitlement);
			window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS['two-home']);
			return { status: 'paid', config: pending.config, entitlement };
		}

		window.sessionStorage.removeItem(PENDING_CHECKOUT_KEYS['two-home']);
		return { status: 'not-completed', staleMs: Date.now() - (pending.createdAt ?? 0) };
	} catch {
		return { status: 'error' };
	}
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
	let binary = '';
	const chunkSize = 0x8000;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
	}
	return btoa(binary);
}

export function base64ToUint8Array(base64: string): Uint8Array {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}

export interface DeliverPdfResult {
	ok: boolean;
	customerEmailSent?: boolean;
	ownerEmailSent?: boolean;
}

/**
 * Emails the already-generated PDF to the customer (using the email Dodo
 * recorded at checkout) and separately notifies the site owner, with the
 * PDF attached to both. Best-effort — the customer's local download has
 * already happened by the time this is called, so a failure here shouldn't
 * be treated as the purchase failing.
 */
export async function deliverPdfByEmail(paymentId: string, pdfBytes: Uint8Array, scheduleName?: string): Promise<DeliverPdfResult> {
	try {
		const response = await fetch('/api/checkout/deliver', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ paymentId, pdfBase64: uint8ArrayToBase64(pdfBytes), scheduleName }),
		});
		const data = await response.json();
		return { ok: Boolean(data.ok), customerEmailSent: data.customerEmailSent, ownerEmailSent: data.ownerEmailSent };
	} catch (error) {
		console.error('Failed to email the calendar PDF:', error);
		return { ok: false };
	}
}

/** Same pattern as deliverPdfByEmail, for the $7 Two-Home Transition Pack. */
export async function deliverTwoHomePdfByEmail(paymentId: string, pdfBytes: Uint8Array, childName?: string): Promise<DeliverPdfResult> {
	try {
		const response = await fetch('/api/checkout/deliver-two-home', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ paymentId, pdfBase64: uint8ArrayToBase64(pdfBytes), childName }),
		});
		const data = await response.json();
		return { ok: Boolean(data.ok), customerEmailSent: data.customerEmailSent, ownerEmailSent: data.ownerEmailSent };
	} catch (error) {
		console.error('Failed to email the Two-Home PDF:', error);
		return { ok: false };
	}
}
