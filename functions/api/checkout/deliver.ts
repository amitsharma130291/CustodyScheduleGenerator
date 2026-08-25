/**
 * Cloudflare Pages Function — POST /api/checkout/deliver
 *
 * Emails the just-generated calendar PDF to the customer (using the email
 * Dodo recorded at checkout, not a client-supplied one — avoids this
 * becoming an open PDF-mailer), and separately notifies the site owner
 * with the same PDF attached plus the customer's email. The PDF itself is
 * still generated entirely client-side (pdf-lib in the browser); this
 * endpoint only re-verifies the payment and relays the already-built bytes
 * by email. Re-verifying here (not just trusting the browser) means this
 * endpoint can't be used to spam arbitrary emails without a real payment.
 *
 * Reuses the same Gmail SMTP credentials as the contact form
 * (functions/api/contact.ts) — no new env vars needed.
 */
import { corsHeaders, jsonResponse, verifyDodoPayment, type DodoEnv } from '../_lib/dodo';
import { buildLicenseKey } from '../_lib/license';
import { sendEmail } from '../_lib/smtp';

export interface Env extends DodoEnv {
	GMAIL_USER: string;
	GMAIL_APP_PASSWORD: string;
	CONTACT_TO_EMAIL: string;
}

interface DeliverBody {
	paymentId?: string;
	pdfBase64?: string;
	scheduleName?: string;
}

const SITE_NAME = 'CustodyBuilder';
const MAX_BASE64_LENGTH = 8_000_000; // ~6 MB decoded — generous headroom over a ~100 KB PDF

function escapeHtml(raw: string): string {
	return raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/**
 * A verified payment doesn't imply the attached bytes are actually a PDF —
 * this endpoint takes pdfBase64 from the client as-is. Checking for the
 * standard "%PDF-" file-header magic bytes before mailing it (to the
 * customer AND to the site's own inbox) is a cheap guard against arbitrary
 * content being relayed through this site's email identity.
 */
function looksLikePdf(base64: string): boolean {
	try {
		return atob(base64.slice(0, 12)).startsWith('%PDF-');
	} catch {
		return false;
	}
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');

	let body: DeliverBody;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid request body.' }, origin, 400);
	}

	const paymentId = typeof body.paymentId === 'string' ? body.paymentId.trim() : '';
	const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64 : '';
	const scheduleName = typeof body.scheduleName === 'string' ? body.scheduleName.trim().slice(0, 80) : '';

	if (!paymentId || !pdfBase64) {
		return jsonResponse({ ok: false, error: 'paymentId and pdfBase64 are required.' }, origin, 422);
	}
	if (pdfBase64.length > MAX_BASE64_LENGTH) {
		return jsonResponse({ ok: false, error: 'PDF is too large to email.' }, origin, 413);
	}
	if (!looksLikePdf(pdfBase64)) {
		return jsonResponse({ ok: false, error: 'That does not look like a valid PDF.' }, origin, 422);
	}

	let payment;
	try {
		payment = await verifyDodoPayment(env, paymentId, env.DODO_PRODUCT_ID_CALENDAR);
	} catch (error) {
		console.error('Failed to verify payment before emailing PDF:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not verify payment.' }, origin, 502);
	}

	if (!payment) {
		return jsonResponse({ ok: false, error: 'Payment has not succeeded.' }, origin, 402);
	}

	const timestamp = new Date().toUTCString();
	const attachment = { filename: 'custody-calendar.pdf', contentType: 'application/pdf', base64Content: pdfBase64 };
	const scheduleLine = scheduleName ? ` (${scheduleName})` : '';
	const licenseKey = buildLicenseKey('CAL', payment.paymentId);
	const siteUrl = new URL(request.url).origin;
	const reactivateUrl = `${siteUrl}/my-custody-calendar/?license=${encodeURIComponent(licenseKey)}`;

	let customerEmailSent = false;
	let ownerEmailSent = false;

	if (payment.customerEmail) {
		try {
			await sendEmail({
				gmailUser: env.GMAIL_USER,
				gmailAppPassword: env.GMAIL_APP_PASSWORD,
				from: env.GMAIL_USER,
				to: payment.customerEmail,
				subject: `Your ${SITE_NAME} calendar${scheduleLine}`,
				date: timestamp,
				textBody: [
					`Thanks for your purchase!`,
					``,
					`Your personalized 12-month custody calendar is attached as a PDF.`,
					``,
					`This calendar is a planning and organizing tool — not legal advice, a court order, or a recommendation about custody arrangements.`,
					``,
					`--- Keep this for later ---`,
					`License key: ${licenseKey}`,
					`Payment ID: ${payment.paymentId}`,
					``,
					`Lost access — cleared your browser, switched devices, or your download expired?`,
					`Reactivate here and you'll be unlocked again immediately, no repurchase needed:`,
					reactivateUrl,
					`Or go to ${siteUrl}/reactivate-license/ and enter this email address to get your license key resent.`,
					``,
					`Questions? Just reply to this email.`,
				].join('\n'),
				htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#2563eb;margin-bottom:4px">Thanks for your purchase!</h2><p>Your personalized 12-month custody calendar is attached as a PDF.</p><p style="color:#666;font-size:13px">This calendar is a planning and organizing tool — not legal advice, a court order, or a recommendation about custody arrangements.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"><h3 style="margin-bottom:6px;font-size:15px">Keep this for later</h3><table style="width:100%;border-collapse:collapse;margin:8px 0 16px"><tr><td style="padding:4px 0;font-weight:600;width:110px">License key</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:4px 0;font-weight:600">Payment ID</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(payment.paymentId)}</td></tr></table><p style="color:#475569;font-size:13px">Lost access later — cleared your browser, switched devices, or your download expired? Use the button below and you'll be unlocked again immediately, no repurchase needed.</p><p style="margin:16px 0"><a href="${escapeHtml(reactivateUrl)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px">Reactivate my calendar</a></p><p style="color:#999;font-size:12px">Or go to <a href="${escapeHtml(siteUrl)}/reactivate-license/">${escapeHtml(siteUrl)}/reactivate-license/</a> and enter this email address to get your license key resent.</p><p style="color:#999;font-size:12px;margin-top:24px">Questions? Just reply to this email.</p></body></html>`,
				attachments: [attachment],
			});
			customerEmailSent = true;
		} catch (error) {
			console.error('Failed to email PDF to customer:', error instanceof Error ? error.message : error);
		}
	}

	try {
		const customerEmailDisplay = payment.customerEmail || '(no email on file)';
		await sendEmail({
			gmailUser: env.GMAIL_USER,
			gmailAppPassword: env.GMAIL_APP_PASSWORD,
			from: env.GMAIL_USER,
			to: env.CONTACT_TO_EMAIL,
			subject: `${SITE_NAME} — new purchase — ${customerEmailDisplay}`,
			date: timestamp,
			textBody: [
				`New purchase on ${SITE_NAME}.`,
				``,
				`Customer email: ${customerEmailDisplay}`,
				`Payment ID: ${payment.paymentId}`,
				`License key: ${licenseKey}`,
				`Schedule: ${scheduleName || '(not provided)'}`,
				`Time: ${timestamp}`,
				``,
				`Calendar PDF attached.`,
			].join('\n'),
			htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#2563eb;margin-bottom:4px">New purchase — ${escapeHtml(SITE_NAME)}</h2><table style="width:100%;border-collapse:collapse;margin:16px 0"><tr><td style="padding:6px 0;font-weight:600;width:140px">Customer email</td><td style="padding:6px 0">${escapeHtml(customerEmailDisplay)}</td></tr><tr><td style="padding:6px 0;font-weight:600">Payment ID</td><td style="padding:6px 0">${escapeHtml(payment.paymentId)}</td></tr><tr><td style="padding:6px 0;font-weight:600">License key</td><td style="padding:6px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:6px 0;font-weight:600">Schedule</td><td style="padding:6px 0">${escapeHtml(scheduleName || '(not provided)')}</td></tr><tr><td style="padding:6px 0;font-weight:600">Time</td><td style="padding:6px 0">${escapeHtml(timestamp)}</td></tr></table><p style="color:#999;font-size:12px">Calendar PDF attached.</p></body></html>`,
			attachments: [attachment],
		});
		ownerEmailSent = true;
	} catch (error) {
		console.error('Failed to email PDF to site owner:', error instanceof Error ? error.message : error);
	}

	return jsonResponse({ ok: true, customerEmailSent, ownerEmailSent }, origin);
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
