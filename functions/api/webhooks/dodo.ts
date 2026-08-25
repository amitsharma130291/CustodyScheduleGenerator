/**
 * Cloudflare Pages Function — POST /api/webhooks/dodo
 *
 * Server-to-server payment confirmation from Dodo. Exists to close a real
 * gap in this site's no-database, browser-is-the-source-of-truth
 * architecture: every other delivery path (checkout/deliver.ts,
 * deliver-two-home.ts) only runs if the customer's own browser makes it
 * back from the Dodo checkout page and finishes resolving the
 * pending-checkout flow. A closed tab, a crashed browser, or a customer who
 * just never returns leaves them with a charge and nothing in their inbox.
 * This endpoint fires independently of the browser, the moment Dodo
 * confirms the payment, and emails the same license key + real PDF the
 * browser flow would have sent — using the checkout session's metadata
 * (already stored for exactly this purpose, see checkout/create.ts and
 * create-two-home.ts) to regenerate it server-side.
 *
 * Signature verification uses Dodo's own SDK wrapper around the Standard
 * Webhooks spec (client.webhooks.unwrap). Never skip this — anyone who
 * discovers this URL could otherwise mint themselves a free PDF by POSTing
 * a fake "payment.succeeded" body.
 *
 * No de-duplication: a Dodo retry (or the ordinary case where the
 * customer's browser ALSO completes checkout/deliver.ts normally) can
 * result in a second, identical confirmation email. Accepting an occasional
 * duplicate is the same tradeoff already made in reactivate.ts rather than
 * adding a datastore just to dedupe — an extra "your calendar is ready"
 * email is a non-issue; a customer who paid and got nothing is not.
 */
import { getDodoClient, type DodoEnv } from '../_lib/dodo';
import { buildLicenseKey } from '../_lib/license';
import { regenerateCalendarPdfFromMetadata } from '../_lib/regeneratePdf';
import { regenerateTwoHomePdfFromMetadata } from '../_lib/regenerateTwoHomePdf';
import { sendEmail } from '../_lib/smtp';

export interface Env extends DodoEnv {
	DODO_WEBHOOK_SECRET: string;
	GMAIL_USER: string;
	GMAIL_APP_PASSWORD: string;
	CONTACT_TO_EMAIL: string;
}

interface EmailAttachment {
	filename: string;
	contentType: string;
	base64Content: string;
}

const SITE_NAME = 'CustodyBuilder';

function json(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

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
	if (!env.DODO_WEBHOOK_SECRET) {
		console.error('Webhook received but DODO_WEBHOOK_SECRET is not configured.');
		return json({ ok: false, error: 'Webhook not configured.' }, 503);
	}

	// Signature verification needs the exact raw bytes Dodo signed — must read
	// as text before any JSON parsing, not after.
	const rawBody = await request.text();

	let event;
	try {
		const client = getDodoClient(env);
		event = client.webhooks.unwrap(rawBody, {
			headers: {
				'webhook-id': request.headers.get('webhook-id') ?? '',
				'webhook-timestamp': request.headers.get('webhook-timestamp') ?? '',
				'webhook-signature': request.headers.get('webhook-signature') ?? '',
			},
			key: env.DODO_WEBHOOK_SECRET,
		});
	} catch (error) {
		console.error('Webhook signature verification failed:', error instanceof Error ? error.message : error);
		return json({ ok: false, error: 'Invalid signature.' }, 401);
	}

	// Anything other than a succeeded payment is acknowledged and ignored —
	// nothing to deliver for a failed/processing payment, refund, dispute,
	// etc., and returning 200 stops Dodo from retrying an event we
	// deliberately skip.
	if (event.type !== 'payment.succeeded') {
		return json({ ok: true, skipped: event.type });
	}

	const payment = event.data;
	const customerEmail = payment.customer?.email ?? null;
	const metadata = (payment.metadata ?? {}) as Record<string, unknown>;

	const isCalendar = payment.product_cart?.some((item) => item.product_id === env.DODO_PRODUCT_ID_CALENDAR) ?? false;
	const isTwoHome = env.DODO_PRODUCT_ID_TWO_HOME ? (payment.product_cart?.some((item) => item.product_id === env.DODO_PRODUCT_ID_TWO_HOME) ?? false) : false;

	if (!customerEmail || (!isCalendar && !isTwoHome)) {
		// No address to send to, or a product outside the two this site sells
		// (nothing for this webhook to do either way).
		return json({ ok: true, skipped: 'no-email-or-unrecognized-product' });
	}

	const timestamp = new Date().toUTCString();
	const siteUrl = new URL(request.url).origin;

	try {
		if (isCalendar) {
			const licenseKey = buildLicenseKey('CAL', payment.payment_id);
			const reactivateUrl = `${siteUrl}/my-custody-calendar/?license=${encodeURIComponent(licenseKey)}`;

			let attachment: EmailAttachment | undefined;
			try {
				const regenerated = await regenerateCalendarPdfFromMetadata(metadata);
				if (regenerated) {
					attachment = { filename: regenerated.filename, contentType: 'application/pdf', base64Content: uint8ArrayToBase64(regenerated.bytes) };
				}
			} catch (error) {
				console.error('Webhook: calendar PDF regeneration failed (continuing without attachment):', error instanceof Error ? error.message : error);
			}

			const pdfNote = attachment
				? 'Your calendar PDF is attached.'
				: "Click the button below and your calendar tool will unlock automatically — no need to pay again.";

			await sendEmail({
				gmailUser: env.GMAIL_USER,
				gmailAppPassword: env.GMAIL_APP_PASSWORD,
				from: env.GMAIL_USER,
				to: customerEmail,
				subject: `Your ${SITE_NAME} calendar is confirmed`,
				date: timestamp,
				textBody: [
					`Thanks for your purchase!`,
					``,
					attachment ? `Your personalized 12-month custody calendar is attached as a PDF.` : `Your purchase is confirmed.`,
					``,
					`This calendar is a planning and organizing tool — not legal advice, a court order, or a recommendation about custody arrangements.`,
					``,
					`--- Keep this for later ---`,
					`License key: ${licenseKey}`,
					`Payment ID: ${payment.payment_id}`,
					``,
					pdfNote,
					reactivateUrl,
					``,
					`Questions? Just reply to this email.`,
				].join('\n'),
				htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#2563eb;margin-bottom:4px">Thanks for your purchase!</h2><p>${attachment ? 'Your personalized 12-month custody calendar is attached as a PDF.' : 'Your purchase is confirmed.'}</p><p style="color:#666;font-size:13px">This calendar is a planning and organizing tool — not legal advice, a court order, or a recommendation about custody arrangements.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"><h3 style="margin-bottom:6px;font-size:15px">Keep this for later</h3><table style="width:100%;border-collapse:collapse;margin:8px 0 16px"><tr><td style="padding:4px 0;font-weight:600;width:110px">License key</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:4px 0;font-weight:600">Payment ID</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(payment.payment_id)}</td></tr></table><p style="margin:16px 0"><a href="${escapeHtml(reactivateUrl)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px">${attachment ? 'Open my calendar' : 'Unlock my calendar'}</a></p><p style="color:#999;font-size:12px;margin-top:24px">Questions? Just reply to this email.</p></body></html>`,
				attachments: attachment ? [attachment] : undefined,
			});
		} else {
			const licenseKey = buildLicenseKey('TWOHOME', payment.payment_id);
			const childNameRaw = metadata.childName;
			const childName = typeof childNameRaw === 'string' ? childNameRaw : '';
			const childLine = childName ? ` for ${childName}` : '';

			const regenerated = await regenerateTwoHomePdfFromMetadata(metadata);
			const attachment: EmailAttachment = { filename: regenerated.filename, contentType: 'application/pdf', base64Content: uint8ArrayToBase64(regenerated.bytes) };

			await sendEmail({
				gmailUser: env.GMAIL_USER,
				gmailAppPassword: env.GMAIL_APP_PASSWORD,
				from: env.GMAIL_USER,
				to: customerEmail,
				subject: `Your ${SITE_NAME} Two-Home Transition Pack${childLine}`,
				date: timestamp,
				textBody: [
					`Thanks for your purchase!`,
					``,
					`Your Two-Home Transition Pack${childLine} is attached as a PDF — what stays at both homes, what travels, a switch-day checklist, and a kid-friendly version.`,
					``,
					`This is a planning and organizing tool — not legal, medical, or safety advice.`,
					``,
					`--- Keep this for later ---`,
					`License key: ${licenseKey}`,
					`Payment ID: ${payment.payment_id}`,
					``,
					`Questions? Just reply to this email.`,
				].join('\n'),
				htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#7c3aed;margin-bottom:4px">Thanks for your purchase!</h2><p>Your Two-Home Transition Pack${escapeHtml(childLine)} is attached as a PDF — what stays at both homes, what travels, a switch-day checklist, and a kid-friendly version.</p><p style="color:#666;font-size:13px">This is a planning and organizing tool — not legal, medical, or safety advice.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"><h3 style="margin-bottom:6px;font-size:15px">Keep this for later</h3><table style="width:100%;border-collapse:collapse;margin:8px 0 16px"><tr><td style="padding:4px 0;font-weight:600;width:110px">License key</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:4px 0;font-weight:600">Payment ID</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(payment.payment_id)}</td></tr></table><p style="color:#999;font-size:12px;margin-top:24px">Questions? Just reply to this email.</p></body></html>`,
				attachments: [attachment],
			});
		}
	} catch (error) {
		console.error('Webhook: failed to send confirmation email:', error instanceof Error ? error.message : error);
		return json({ ok: false, error: 'Email delivery failed.' }, 500);
	}

	return json({ ok: true });
};
