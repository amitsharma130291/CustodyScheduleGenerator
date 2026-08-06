/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the CustodyBuilder contact form, validates it server-side,
 * applies a honeypot spam check, then delivers to amitsharma00261@gmail.com
 * via the Resend REST API (fetch-only — no Node.js modules required).
 *
 * Environment binding required (set in Cloudflare Pages dashboard):
 *   RESEND_API_KEY  — your Resend API key (re_...)
 *
 * No secret is ever sent to the client or committed to source.
 */

interface Env {
	RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

	// ── CORS: only same-origin POSTs are expected ──────────────────────────
	const origin = request.headers.get('Origin') || '';
	const allowed = ['https://custodybuilder.com', 'https://www.custodybuilder.com'];
	if (origin && !allowed.includes(origin) && !origin.endsWith('.custodyschedulegenerator.pages.dev')) {
		return json({ ok: false, error: 'Forbidden' }, 403);
	}

	// ── Parse form body ────────────────────────────────────────────────────
	let name = '';
	let email = '';
	let message = '';
	let pageUrl = '';
	let honeypot = '';

	const contentType = request.headers.get('Content-Type') || '';

	if (contentType.includes('application/json')) {
		try {
			const body = await request.json() as Record<string, string>;
			name     = (body.name     || '').toString().trim();
			email    = (body.email    || '').toString().trim();
			message  = (body.message  || '').toString().trim();
			pageUrl  = (body.page_url || '').toString().trim();
			honeypot = (body.website  || '').toString().trim(); // hidden honeypot field
		} catch {
			return json({ ok: false, error: 'Invalid request body' }, 400);
		}
	} else {
		// application/x-www-form-urlencoded or multipart
		try {
			const data = await request.formData();
			name     = ((data.get('name')     as string) || '').trim();
			email    = ((data.get('email')    as string) || '').trim();
			message  = ((data.get('message')  as string) || '').trim();
			pageUrl  = ((data.get('page_url') as string) || '').trim();
			honeypot = ((data.get('website')  as string) || '').trim(); // hidden honeypot field
		} catch {
			return json({ ok: false, error: 'Invalid form data' }, 400);
		}
	}

	// ── Honeypot: bots fill the hidden "website" field; humans leave it blank
	if (honeypot) {
		// Return 200 so bots think they succeeded
		return json({ ok: true }, 200);
	}

	// ── Server-side validation ─────────────────────────────────────────────
	const errors: string[] = [];
	if (!name || name.length < 2)          errors.push('Name is required (minimum 2 characters).');
	if (!email || !isValidEmail(email))     errors.push('A valid email address is required.');
	if (!message || message.length < 10)   errors.push('Message is required (minimum 10 characters).');
	if (name.length > 100)                  errors.push('Name must be 100 characters or fewer.');
	if (email.length > 254)                 errors.push('Email address is too long.');
	if (message.length > 5000)              errors.push('Message must be 5,000 characters or fewer.');

	if (errors.length > 0) {
		return json({ ok: false, errors }, 400);
	}

	// ── Resend API key check ───────────────────────────────────────────────
	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('[contact] RESEND_API_KEY binding is not set');
		return json({ ok: false, error: 'Email delivery is not configured. Please try again later.' }, 503);
	}

	// ── Sanitise for HTML email body ───────────────────────────────────────
	const safe = (s: string) =>
		s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

	const sourceLine = pageUrl
		? `<tr><td style="padding:6px 0;color:#64748b;width:110px;vertical-align:top;font-size:13px;">Source page</td><td style="padding:6px 0;font-size:13px;"><a href="${safe(pageUrl)}" style="color:#2563eb;">${safe(pageUrl)}</a></td></tr>`
		: '';

	const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>CustodyBuilder contact</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,ui-sans-serif,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8eef7;">
    <div style="background:#2563EB;padding:20px 28px;">
      <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">CustodyBuilder — Contact Form</p>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748b;width:110px;vertical-align:top;font-size:13px;">Name</td><td style="padding:6px 0;font-size:13px;font-weight:500;">${safe(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;vertical-align:top;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${safe(email)}" style="color:#2563eb;">${safe(email)}</a></td></tr>
        ${sourceLine}
      </table>
      <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e8eef7;">
        <p style="margin:0 0 4px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <p style="margin:0;font-size:14px;color:#0f172a;white-space:pre-wrap;">${safe(message)}</p>
      </div>
      <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Reply to this email to respond directly to ${safe(name)}.</p>
    </div>
  </div>
</body>
</html>`;

	const text = `CustodyBuilder contact form\n\nName: ${name}\nEmail: ${email}${pageUrl ? `\nSource: ${pageUrl}` : ''}\n\nMessage:\n${message}`;

	// ── Send via Resend REST API (pure fetch — works on CF Workers runtime) ─
	let resendResponse: Response;
	try {
		resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'CustodyBuilder Contact <contact@custodybuilder.com>',
				to:   ['amitsharma00261@gmail.com'],
				reply_to: email,
				subject: `[CustodyBuilder] Contact from ${name}`,
				html,
				text,
			}),
		});
	} catch (err) {
		console.error('[contact] Resend fetch failed:', err);
		return json({ ok: false, error: 'Network error sending email. Please try again.' }, 502);
	}

	if (!resendResponse.ok) {
		const body = await resendResponse.text().catch(() => '');
		console.error('[contact] Resend API error:', resendResponse.status, body);
		return json({ ok: false, error: 'Failed to send message. Please try again later.' }, 502);
	}

	return json({ ok: true }, 200);
};

// ── Helpers ────────────────────────────────────────────────────────────────

function json(data: unknown, status: number): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

function isValidEmail(s: string): boolean {
	// RFC-5321 practical check — no external deps
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 254;
}
