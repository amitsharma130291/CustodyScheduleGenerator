/**
 * Cloudflare Pages Function — POST /api/checkout/deliver-two-home
 *
 * Same shape as checkout/deliver.ts (the $14.99 calendar's delivery
 * endpoint): re-verifies the payment, then emails the already-generated PDF
 * to the customer (using the email Dodo recorded, not a client-supplied
 * one) and separately notifies the site owner with the same PDF attached.
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
	childName?: string;
}

const SITE_NAME = 'CustodyBuilder';
const MAX_BASE64_LENGTH = 8_000_000;

function escapeHtml(raw: string): string {
	return raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/** See deliver.ts's identical helper for why this check exists. */
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
	const childName = typeof body.childName === 'string' ? body.childName.trim().slice(0, 40) : '';

	if (!paymentId || !pdfBase64) {
		return jsonResponse({ ok: false, error: 'paymentId and pdfBase64 are required.' }, origin, 422);
	}
	if (pdfBase64.length > MAX_BASE64_LENGTH) {
		return jsonResponse({ ok: false, error: 'PDF is too large to email.' }, origin, 413);
	}
	if (!looksLikePdf(pdfBase64)) {
		return jsonResponse({ ok: false, error: 'That does not look like a valid PDF.' }, origin, 422);
	}
	if (!env.DODO_PRODUCT_ID_TWO_HOME) {
		return jsonResponse({ ok: false, error: 'The Two-Home Transition Pack is not available yet.' }, origin, 503);
	}

	let payment;
	try {
		payment = await verifyDodoPayment(env, paymentId, env.DODO_PRODUCT_ID_TWO_HOME);
	} catch (error) {
		console.error('Failed to verify Two-Home payment before emailing PDF:', error instanceof Error ? error.message : error);
		return jsonResponse({ ok: false, error: 'Could not verify payment.' }, origin, 502);
	}

	if (!payment) {
		return jsonResponse({ ok: false, error: 'Payment has not succeeded.' }, origin, 402);
	}

	const timestamp = new Date().toUTCString();
	const attachment = { filename: 'two-home-transition-pack.pdf', contentType: 'application/pdf', base64Content: pdfBase64 };
	const licenseKey = buildLicenseKey('TWOHOME', payment.paymentId);
	const childLine = childName ? ` for ${childName}` : '';

	let customerEmailSent = false;
	let ownerEmailSent = false;

	if (payment.customerEmail) {
		try {
			await sendEmail({
				gmailUser: env.GMAIL_USER,
				gmailAppPassword: env.GMAIL_APP_PASSWORD,
				from: env.GMAIL_USER,
				to: payment.customerEmail,
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
					`Payment ID: ${payment.paymentId}`,
					``,
					`Questions? Just reply to this email.`,
				].join('\n'),
				htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#7c3aed;margin-bottom:4px">Thanks for your purchase!</h2><p>Your Two-Home Transition Pack${escapeHtml(childLine)} is attached as a PDF — what stays at both homes, what travels, a switch-day checklist, and a kid-friendly version.</p><p style="color:#666;font-size:13px">This is a planning and organizing tool — not legal, medical, or safety advice.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"><h3 style="margin-bottom:6px;font-size:15px">Keep this for later</h3><table style="width:100%;border-collapse:collapse;margin:8px 0 16px"><tr><td style="padding:4px 0;font-weight:600;width:110px">License key</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:4px 0;font-weight:600">Payment ID</td><td style="padding:4px 0;font-family:ui-monospace,monospace">${escapeHtml(payment.paymentId)}</td></tr></table><p style="color:#999;font-size:12px;margin-top:24px">Questions? Just reply to this email.</p></body></html>`,
				attachments: [attachment],
			});
			customerEmailSent = true;
		} catch (error) {
			console.error('Failed to email Two-Home PDF to customer:', error instanceof Error ? error.message : error);
		}
	}

	try {
		const customerEmailDisplay = payment.customerEmail || '(no email on file)';
		await sendEmail({
			gmailUser: env.GMAIL_USER,
			gmailAppPassword: env.GMAIL_APP_PASSWORD,
			from: env.GMAIL_USER,
			to: env.CONTACT_TO_EMAIL,
			subject: `${SITE_NAME} — new Two-Home Pack purchase — ${customerEmailDisplay}`,
			date: timestamp,
			textBody: [
				`New Two-Home Transition Pack purchase on ${SITE_NAME}.`,
				``,
				`Customer email: ${customerEmailDisplay}`,
				`Payment ID: ${payment.paymentId}`,
				`License key: ${licenseKey}`,
				`Child: ${childName || '(not provided)'}`,
				`Time: ${timestamp}`,
				``,
				`Checklist PDF attached.`,
			].join('\n'),
			htmlBody: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${SITE_NAME}</title></head><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a"><h2 style="color:#7c3aed;margin-bottom:4px">New Two-Home Pack purchase — ${escapeHtml(SITE_NAME)}</h2><table style="width:100%;border-collapse:collapse;margin:16px 0"><tr><td style="padding:6px 0;font-weight:600;width:140px">Customer email</td><td style="padding:6px 0">${escapeHtml(customerEmailDisplay)}</td></tr><tr><td style="padding:6px 0;font-weight:600">Payment ID</td><td style="padding:6px 0">${escapeHtml(payment.paymentId)}</td></tr><tr><td style="padding:6px 0;font-weight:600">License key</td><td style="padding:6px 0;font-family:ui-monospace,monospace">${escapeHtml(licenseKey)}</td></tr><tr><td style="padding:6px 0;font-weight:600">Child</td><td style="padding:6px 0">${escapeHtml(childName || '(not provided)')}</td></tr><tr><td style="padding:6px 0;font-weight:600">Time</td><td style="padding:6px 0">${escapeHtml(timestamp)}</td></tr></table><p style="color:#999;font-size:12px">Checklist PDF attached.</p></body></html>`,
			attachments: [attachment],
		});
		ownerEmailSent = true;
	} catch (error) {
		console.error('Failed to email Two-Home PDF to site owner:', error instanceof Error ? error.message : error);
	}

	return jsonResponse({ ok: true, customerEmailSent, ownerEmailSent }, origin);
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};
