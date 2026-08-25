/**
 * Cloudflare Pages Function — POST /api/checkout/reactivate
 *
 * "I lost access, here's the email I paid with" recovery flow for the
 * /reactivate-license/ page. No database: looks the customer up in Dodo by
 * email, finds their most recent succeeded My Custody Calendar payment,
 * rebuilds the license key from the payment ID, and emails it back —
 * along with a regenerated PDF when the checkout session's stored metadata
 * has enough to rebuild one (see ../_lib/regeneratePdf.ts).
 *
 * Always responds { ok: true } for any well-formed email, whether or not a
 * purchase was found, so this can't be used to enumerate which addresses
 * have bought the product.
 */
import { corsHeaders, getDodoClient, jsonResponse, type DodoEnv } from '../_lib/dodo';
import { buildLicenseKey } from '../_lib/license';
import { regenerateCalendarPdfFromMetadata } from '../_lib/regeneratePdf';
import { sendEmail } from '../_lib/smtp';

export interface Env extends DodoEnv {
	GMAIL_USER: string;
	GMAIL_APP_PASSWORD: string;
	CONTACT_TO_EMAIL: string;
}

interface ReactivateBody {
	email?: string;
}

const SITE_NAME = 'CustodyBuilder';
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function uint8ArrayToBase64(bytes: Uint8Array): string {
	let binary = '';
	const chunkSize = 0x8000;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
	}
	return btoa(binary);
}

function escapeHtml(raw: string): string {
	return raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');

	let body: ReactivateBody;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid request body.' }, origin, 400);
	}

	const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
	if (!EMAIL_RE.test(email)) {
		return jsonResponse({ ok: false, error: 'Enter a valid email address.' }, origin, 422);
	}

	try {
		const client = getDodoClient(env);
		const customerPage = await client.customers.list({ email, page_size: 10 });
		const customerIds = customerPage.items.map((customer) => customer.customer_id);

		let bestPayment: { paymentId: string; createdAt: string; metadata: Record<string, unknown> } | null = null;
		for (const customerId of customerIds) {
			const paymentPage = await client.payments.list({
				customer_id: customerId,
				product_id: env.DODO_PRODUCT_ID_CALENDAR,
				status: 'succeeded',
				page_size: 10,
			});
			for (const payment of paymentPage.items) {
				if (!bestPayment || payment.created_at > bestPayment.createdAt) {
					bestPayment = { paymentId: payment.payment_id, createdAt: payment.created_at, metadata: payment.metadata ?? {} };
				}
			}
		}

		// No match — still report success so this endpoint can't be used to
		// discover which email addresses have a purchase on file.
		if (!bestPayment) {
			return jsonResponse({ ok: true }, origin);
		}

		const licenseKey = buildLicenseKey('CAL', bestPayment.paymentId);
		const siteUrl = new URL(request.url).origin;
		const reactivateUrl = `${siteUrl}/my-custody-calendar/?license=${encodeURIComponent(licenseKey)}`;

		let attachment: { filename: string; contentType: string; base64Content: string } | undefined;
		try {
			const regenerated = await regenerateCalendarPdfFromMetadata(bestPayment.metadata);
			if (regenerated) {
				attachment = { filename: regenerated.filename, contentType: 'application/pdf', base64Content: uint8ArrayToBase64(regenerated.bytes) };
			}
		} catch (error) {
			console.error('Reactivation PDF regeneration failed (continuing without attachment):', error instanceof Error ? error.message : error);
		}

		const timestamp = new Date().toUTCString();
		const pdfNote = attachment
			? `Your calendar PDF is attached again as well.`
			: `Click the button below and your calendar tool will unlock automatically — no need to pay again.`;

		await sendEmail({
			gmailUser: env.GMAIL_USER,
			gmailAppPassword: env.GMAIL_APP_PASSWORD,
			from: env.GMAIL_USER,
			to: email,
			subject: `Your ${SITE_NAME} license key`,
			date: timestamp,
			textBody: [
				`Here's your My Custody Calendar license key:`,
				``,
				licenseKey,
				``,
				`Reactivate here: ${reactivateUrl}`,
				``,
				pdfNote,
				``,
				`Payment ID: ${bestPayment.paymentId}`,
				``,
				`Didn't request this? You can ignore this email.`,
			].join('\n'),
			htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#2563eb;margin-bottom:4px">Your license key</h2><p>Here's your My Custody Calendar license key:</p><p style="font-family:ui-monospace,monospace;font-size:16px;font-weight:700;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;letter-spacing:0.02em">${escapeHtml(licenseKey)}</p><p style="margin:24px 0"><a href="${escapeHtml(reactivateUrl)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px">Reactivate my calendar</a></p><p style="color:#666;font-size:14px">${escapeHtml(pdfNote)}</p><p style="color:#999;font-size:12px;margin-top:24px">Payment ID: ${escapeHtml(bestPayment.paymentId)}</p><p style="color:#999;font-size:12px">Didn't request this? You can ignore this email.</p></body></html>`,
			attachments: attachment ? [attachment] : undefined,
		});

		return jsonResponse({ ok: true }, origin);
	} catch (error) {
		console.error('Failed to process reactivation request:', error instanceof Error ? error.message : error);
		// Still report success — a Dodo lookup hiccup shouldn't reveal
		// account existence via an error response either.
		return jsonResponse({ ok: true }, origin);
	}
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
