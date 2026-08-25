/**
 * Cloudflare Pages Function — GET /api/checkout/verify-two-home?session_id=...
 *
 * Same idempotent "did this succeed" check as checkout/verify.ts, but for
 * the $7 Two-Home Transition Pack — a separate, self-verifying license key
 * (`CB-TWOHOME-<payment_id>`) and its own entitlement, independent of the
 * $14.99 calendar purchase.
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
	if (!env.DODO_PRODUCT_ID_TWO_HOME) {
		return jsonResponse({ ok: false, error: 'The Two-Home Transition Pack is not available yet.' }, origin, 503);
	}

	try {
		const client = getDodoClient(env);
		const session = await client.checkoutSessions.retrieve(sessionId);

		if (session.payment_status !== 'succeeded' || !session.payment_id) {
			return jsonResponse({ ok: false, status: session.payment_status ?? 'pending' }, origin);
		}

		// checkoutSessions.retrieve() doesn't expose which product was
		// purchased — re-verifying via verifyDodoPayment (which checks the
		// payment's own product_cart) is what stops a session ID from the
		// $14.99 calendar's checkout from minting a Two-Home license key.
		const payment = await verifyDodoPayment(env, session.payment_id, env.DODO_PRODUCT_ID_TWO_HOME);
		if (!payment) {
			return jsonResponse({ ok: false, status: 'wrong_product' }, origin);
		}

		return jsonResponse(
			{
				ok: true,
				paymentId: payment.paymentId,
				licenseKey: buildLicenseKey('TWOHOME', payment.paymentId),
				customerEmail: payment.customerEmail ?? session.customer_email ?? null,
			},
			origin,
		);
	} catch (error) {
		console.error('Failed to verify Two-Home checkout session:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not verify payment. Please try again.' }, origin, 502);
	}
};
