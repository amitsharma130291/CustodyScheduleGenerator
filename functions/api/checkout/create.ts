/**
 * Cloudflare Pages Function — POST /api/checkout/create
 *
 * Starts a Dodo Payments hosted checkout session for the $14.99 "My Custody
 * Calendar" product. No database: the calendar's identifying details are
 * stashed in the session's metadata purely as a server-side fallback for a
 * future "resend my purchase" flow — the browser is the source of truth,
 * keeping the full config (including important dates) in sessionStorage
 * across the redirect to Dodo and back.
 *
 * Env bindings (set in the Cloudflare Pages dashboard, never in source):
 *   DODO_PAYMENTS_API_KEY     — Dodo secret API key
 *   DODO_ENVIRONMENT          — "test_mode" or "live_mode"
 *   DODO_PRODUCT_ID_CALENDAR  — Dodo product ID for the $14.99 one-time product
 */
import { corsHeaders, getDodoClient, jsonResponse, type DodoEnv } from '../_lib/dodo';

export interface Env extends DodoEnv {}

interface CreateCheckoutBody {
	scheduleId?: string;
	startDate?: string;
	parentA?: string;
	parentB?: string;
	pattern?: string;
	childName?: string;
}

function sanitizeField(value: unknown, maxLength = 60): string {
	if (typeof value !== 'string') return '';
	return value.trim().slice(0, maxLength);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');

	let body: CreateCheckoutBody;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid request body.' }, origin, 400);
	}

	const scheduleId = sanitizeField(body.scheduleId, 40);
	const startDate = sanitizeField(body.startDate, 10);
	if (!scheduleId || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
		return jsonResponse({ ok: false, error: 'A schedule and start date are required.' }, origin, 422);
	}

	const parentA = sanitizeField(body.parentA) || 'Parent A';
	const parentB = sanitizeField(body.parentB) || 'Parent B';
	const pattern = sanitizeField(body.pattern);
	const childName = sanitizeField(body.childName, 40);
	const siteUrl = new URL(request.url).origin;

	try {
		const client = getDodoClient(env);
		const session = await client.checkoutSessions.create({
			product_cart: [{ product_id: env.DODO_PRODUCT_ID_CALENDAR, quantity: 1 }],
			return_url: `${siteUrl}/my-custody-calendar/`,
			cancel_url: `${siteUrl}/my-custody-calendar/`,
			metadata: {
				scheduleId,
				startDate,
				parentA,
				parentB,
				...(pattern ? { pattern } : {}),
				...(childName ? { childName } : {}),
			},
		});

		if (!session.checkout_url) {
			throw new Error('Dodo did not return a checkout URL.');
		}

		return jsonResponse({ ok: true, sessionId: session.session_id, checkoutUrl: session.checkout_url }, origin);
	} catch (error) {
		console.error('Failed to create Dodo checkout session:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not start checkout. Please try again.' }, origin, 502);
	}
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
