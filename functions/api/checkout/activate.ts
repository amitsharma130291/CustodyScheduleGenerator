/**
 * Cloudflare Pages Function — POST /api/checkout/activate
 *
 * Restores entitlement from a license key alone (no session_id) — used when
 * a customer opens the "Reactivate my calendar" link from their purchase
 * email, or pastes a license key back in after clearing their browser data
 * or switching devices. Same trust model as checkout/verify.ts: the key
 * itself proves nothing, it's just `CB-CAL-<payment_id>`; this endpoint asks
 * Dodo whether that payment actually succeeded before honoring it.
 */
import { corsHeaders, jsonResponse, verifyDodoPayment, type DodoEnv } from '../_lib/dodo';
import { parseLicenseKey } from '../_lib/license';

export interface Env extends DodoEnv {}

interface ActivateBody {
	licenseKey?: string;
}

const PRODUCT_ID_BY_TIER: Record<string, keyof DodoEnv> = {
	CAL: 'DODO_PRODUCT_ID_CALENDAR',
	TWOHOME: 'DODO_PRODUCT_ID_TWO_HOME',
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');

	let body: ActivateBody;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid request body.' }, origin, 400);
	}

	const licenseKey = typeof body.licenseKey === 'string' ? body.licenseKey.trim() : '';
	const parsed = parseLicenseKey(licenseKey);
	if (!parsed) {
		return jsonResponse({ ok: false, error: 'That does not look like a valid license key.' }, origin, 422);
	}

	const expectedProductId = env[PRODUCT_ID_BY_TIER[parsed.tier]];
	if (!expectedProductId) {
		return jsonResponse({ ok: false, error: 'That license key is not tied to a completed purchase.' }, origin, 402);
	}

	try {
		const payment = await verifyDodoPayment(env, parsed.paymentId, expectedProductId);
		if (!payment) {
			return jsonResponse({ ok: false, error: 'That license key is not tied to a completed purchase.' }, origin, 402);
		}

		return jsonResponse({ ok: true, licenseKey, paymentId: payment.paymentId, tier: parsed.tier }, origin);
	} catch (error) {
		console.error('Failed to activate license key:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not verify that license key. Please try again.' }, origin, 502);
	}
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
