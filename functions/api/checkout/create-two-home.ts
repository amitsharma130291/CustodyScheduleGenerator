/**
 * Cloudflare Pages Function — POST /api/checkout/create-two-home
 *
 * Starts a Dodo Payments hosted checkout session for the $7 "Two-Home
 * Transition Pack" upsell. Mirrors checkout/create.ts's shape exactly (same
 * no-database, metadata-carries-the-answers pattern) but as its own file
 * rather than a branch inside the proven $14.99 flow — that flow handles
 * real money already and duplicating ~60 lines is cheaper than risking a
 * regression there.
 */
import { corsHeaders, getDodoClient, jsonResponse, type DodoEnv } from '../_lib/dodo';

export interface Env extends DodoEnv {}

interface CreateTwoHomeCheckoutBody {
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

function sanitizeField(value: unknown, maxLength = 80): string {
	if (typeof value !== 'string') return '';
	return value.trim().slice(0, maxLength);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');

	if (!env.DODO_PRODUCT_ID_TWO_HOME) {
		return jsonResponse({ ok: false, error: 'The Two-Home Transition Pack is not available yet.' }, origin, 503);
	}

	let body: CreateTwoHomeCheckoutBody;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid request body.' }, origin, 400);
	}

	const siteUrl = new URL(request.url).origin;
	const metadata: Record<string, string> = {};
	const setIfPresent = (key: string, value: unknown, maxLength = 80) => {
		const clean = sanitizeField(value, maxLength);
		if (clean) metadata[key] = clean;
	};

	setIfPresent('calendarPaymentId', body.calendarPaymentId, 60);
	setIfPresent('childName', body.childName, 40);
	setIfPresent('childAgeRange', body.childAgeRange, 20);
	setIfPresent('homeOneLabel', body.homeOneLabel, 30);
	setIfPresent('homeTwoLabel', body.homeTwoLabel, 30);
	setIfPresent('transitionFrequency', body.transitionFrequency, 80);
	setIfPresent('schoolDays', body.schoolDays, 40);
	setIfPresent('schoolUniform', body.schoolUniform, 10);
	setIfPresent('schoolDevice', body.schoolDevice);
	setIfPresent('activities', body.activities, 160);
	setIfPresent('electronics', body.electronics);
	setIfPresent('glasses', body.glasses, 10);
	setIfPresent('comfortItem', body.comfortItem);
	setIfPresent('clothingStocked', body.clothingStocked, 10);
	setIfPresent('customItems', body.customItems, 200);
	setIfPresent('packingDifficulty', body.packingDifficulty, 200);

	try {
		const client = getDodoClient(env);
		const session = await client.checkoutSessions.create({
			product_cart: [{ product_id: env.DODO_PRODUCT_ID_TWO_HOME, quantity: 1 }],
			return_url: `${siteUrl}/two-home-checklist/`,
			cancel_url: `${siteUrl}/two-home-checklist/`,
			metadata,
		});

		if (!session.checkout_url) {
			throw new Error('Dodo did not return a checkout URL.');
		}

		return jsonResponse({ ok: true, sessionId: session.session_id, checkoutUrl: session.checkout_url }, origin);
	} catch (error) {
		console.error('Failed to create Two-Home checkout session:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not start checkout. Please try again.' }, origin, 502);
	}
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
