/**
 * Shared Dodo Payments helpers for the checkout Pages Functions.
 *
 * Files under an `_`-prefixed directory are excluded from Cloudflare Pages'
 * automatic file-based routing, so this module is never itself an endpoint.
 */
import DodoPayments from 'dodopayments';

export interface DodoEnv {
	DODO_PAYMENTS_API_KEY: string;
	DODO_ENVIRONMENT?: string; // 'test_mode' | 'live_mode' — defaults to test_mode below
	DODO_PRODUCT_ID_CALENDAR: string;
	DODO_PRODUCT_ID_TWO_HOME?: string;
}

export function getDodoClient(env: DodoEnv) {
	return new DodoPayments({
		bearerToken: env.DODO_PAYMENTS_API_KEY,
		environment: env.DODO_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
	});
}

export interface VerifiedPayment {
	paymentId: string;
	customerEmail: string | null;
	customerName: string | null;
}

/**
 * Confirms a Dodo payment actually succeeded, was actually for
 * `expectedProductId`, and returns the customer details Dodo recorded for
 * it. Scoping by paymentId alone is implicit — `payments.retrieve` only
 * ever returns a payment belonging to the account owning
 * DODO_PAYMENTS_API_KEY — but a *status* check alone says nothing about
 * *which* product was paid for. Without the product_cart check below, a
 * customer's own valid $7 Two-Home payment ID would satisfy "a succeeded
 * payment exists" and could be replayed against the $14.99 calendar's
 * verify/deliver endpoints (or vice versa) to unlock the other product for
 * free — this was a real, confirmed bug caught in a pre-launch review, not
 * a hypothetical.
 */
export async function verifyDodoPayment(env: DodoEnv, paymentId: string, expectedProductId: string): Promise<VerifiedPayment | null> {
	const client = getDodoClient(env);
	const payment = await client.payments.retrieve(paymentId);

	if (payment.status !== 'succeeded') return null;
	if (!payment.product_cart?.some((item) => item.product_id === expectedProductId)) return null;

	return {
		paymentId: payment.payment_id,
		customerEmail: payment.customer?.email ?? null,
		customerName: payment.customer?.name ?? null,
	};
}

const ALLOWED_ORIGINS = new Set(['https://custodybuilder.com', 'https://www.custodybuilder.com']);

export function isAllowedOrigin(origin: string | null): boolean {
	if (!origin) return false;
	if (ALLOWED_ORIGINS.has(origin)) return true;
	try {
		const url = new URL(origin);
		return url.hostname.endsWith('.custodyschedulegenerator.pages.dev') || url.hostname === 'custodyschedulegenerator.pages.dev' || url.hostname === 'localhost';
	} catch {
		return false;
	}
}

export function corsHeaders(origin: string | null): Record<string, string> {
	const allowed = isAllowedOrigin(origin) ? (origin ?? '') : 'https://custodybuilder.com';
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		Vary: 'Origin',
	};
}

export function jsonResponse(data: unknown, origin: string | null, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
	});
}
