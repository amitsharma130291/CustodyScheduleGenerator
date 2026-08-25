/**
 * Cloudflare Pages Function — GET /api/checkout/verify?session_id=...
 *
 * Confirms a Dodo checkout session actually succeeded and, if so, hands
 * back a self-verifying license key (see ../_lib/license.ts) built from the
 * underlying payment ID. Callable any number of times — a refresh, a
 * double-back-navigation, or a retry after a network hiccup all just ask
 * Dodo the same idempotent question again. No database, nothing written
 * server-side.
 */
import { getDodoClient, jsonResponse, verifyDodoPayment, type DodoEnv } from '../_lib/dodo';
import { buildLicenseKey } from '../_lib/license';

export interface Env extends DodoEnv {}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');
	const sessionId = new URL(request.url).searchParams.get('session_id');

	if (!sessionId) {
		return jsonResponse({ ok: false, error: 'A session_id is required.' }, origin, 400);
	}

	try {
		const client = getDodoClient(env);
		const session = await client.checkoutSessions.retrieve(sessionId);

		if (session.payment_status !== 'succeeded' || !session.payment_id) {
			return jsonResponse({ ok: false, status: session.payment_status ?? 'pending' }, origin);
		}

		// checkoutSessions.retrieve() doesn't expose which product was
		// purchased — re-verifying via verifyDodoPayment (which checks the
		// payment's own product_cart) is what stops a session ID from a
		// different product's checkout from minting a calendar license key.
		const payment = await verifyDodoPayment(env, session.payment_id, env.DODO_PRODUCT_ID_CALENDAR);
		if (!payment) {
			return jsonResponse({ ok: false, status: 'wrong_product' }, origin);
		}

		return jsonResponse(
			{
				ok: true,
				paymentId: payment.paymentId,
				licenseKey: buildLicenseKey('CAL', payment.paymentId),
				customerEmail: payment.customerEmail ?? session.customer_email ?? null,
			},
			origin,
		);
	} catch (error) {
		console.error('Failed to verify Dodo checkout session:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not verify payment. Please try again.' }, origin, 502);
	}
};
