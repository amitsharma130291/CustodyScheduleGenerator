/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Sends contact-form submissions via Gmail SMTP over TLS using the
 * cloudflare:sockets API (outbound TCP). No Node.js built-ins, no nodemailer,
 * no external relay service. Pure Web APIs + cloudflare:sockets.
 *
 * Env bindings (set in Cloudflare Pages dashboard, never in source):
 *   GMAIL_USER          — amitsharma00261@gmail.com
 *   GMAIL_APP_PASSWORD  — 16-char Google App Password (no spaces)
 *   CONTACT_TO_EMAIL    — amitsharma00261@gmail.com
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — cloudflare:sockets is a runtime-only module; TS can't resolve it
import { connect } from 'cloudflare:sockets';

export interface Env {
	GMAIL_USER: string;
	GMAIL_APP_PASSWORD: string;
	CONTACT_TO_EMAIL: string;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const URL_RE = /^https?:\/\/.{1,2000}$/;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const MAX_EMAIL = 254;

interface ParsedBody {
	visitorEmail: string;
	message: string;
	pageUrl: string;
	name: string;
	honeypot: string;
	formTime: number | null;
}

async function parseBody(request: Request): Promise<ParsedBody> {
	const ct = request.headers.get('content-type') ?? '';
	let data: Record<string, string> = {};

	if (ct.includes('application/json')) {
		const json = await request.json<Record<string, unknown>>();
		for (const [k, v] of Object.entries(json)) {
			if (typeof v === 'string') data[k] = v;
		}
	} else {
		const fd = await request.formData();
		for (const [k, v] of fd.entries()) {
			if (typeof v === 'string') data[k] = v;
		}
	}

	return {
		visitorEmail: (data['email'] ?? '').trim().slice(0, MAX_EMAIL),
		message: (data['message'] ?? '').trim().slice(0, MAX_MESSAGE + 1),
		pageUrl: (data['page_url'] ?? '').trim().slice(0, 2100),
		name: (data['name'] ?? '').trim().slice(0, 200),
		honeypot: (data['website'] ?? '').trim(),
		formTime: data['form_time'] ? parseInt(data['form_time'], 10) : null,
	};
}

function validateInput(parsed: ParsedBody): string | null {
	if (!EMAIL_RE.test(parsed.visitorEmail)) return 'Invalid email address.';
	if (parsed.message.length < MIN_MESSAGE) return 'Message must be at least 10 characters.';
	if (parsed.message.length > MAX_MESSAGE) return 'Message must be under 5,000 characters.';
	if (parsed.pageUrl && !URL_RE.test(parsed.pageUrl)) return 'Invalid page URL.';
	return null;
}

// ---------------------------------------------------------------------------
// HTML/text safety
// ---------------------------------------------------------------------------

function escapeHtml(raw: string): string {
	return raw
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// ---------------------------------------------------------------------------
// MIME message builder
// ---------------------------------------------------------------------------

/** Dot-stuff message body lines per RFC 5321 §4.5.2 */
function dotStuff(text: string): string {
	return text
		.split('\n')
		.map((line) => (line.startsWith('.') ? '.' + line : line))
		.join('\n');
}

function buildMimeMessage(opts: {
	from: string;
	to: string;
	replyTo: string;
	subject: string;
	textBody: string;
	htmlBody: string;
	date: string;
}): string {
	const boundary = 'cb_contact_' + Math.random().toString(36).slice(2, 14);
	const lines: string[] = [
		`From: CustodyBuilder <${opts.from}>`,
		`To: ${opts.to}`,
		`Reply-To: ${opts.replyTo}`,
		`Subject: ${opts.subject}`,
		`Date: ${opts.date}`,
		`MIME-Version: 1.0`,
		`Content-Type: multipart/alternative; boundary="${boundary}"`,
		``,
		`--${boundary}`,
		`Content-Type: text/plain; charset=UTF-8`,
		`Content-Transfer-Encoding: 8bit`,
		``,
		dotStuff(opts.textBody),
		``,
		`--${boundary}`,
		`Content-Type: text/html; charset=UTF-8`,
		`Content-Transfer-Encoding: 8bit`,
		``,
		dotStuff(opts.htmlBody),
		``,
		`--${boundary}--`,
	];
	// Ensure CRLF line endings throughout
	return lines.join('\r\n');
}

// ---------------------------------------------------------------------------
// SMTP-over-TLS client (cloudflare:sockets)
// ---------------------------------------------------------------------------

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_TIMEOUT_MS = 20_000;

/** Read until we have a line ending in CRLF from the server. */
async function readLine(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
	const dec = new TextDecoder();
	let buf = '';
	const deadline = Date.now() + SMTP_TIMEOUT_MS;
	while (true) {
		if (Date.now() > deadline) throw new Error('SMTP read timeout');
		const { value, done } = await reader.read();
		if (done) throw new Error('SMTP connection closed unexpectedly');
		buf += dec.decode(value, { stream: true });
		if (buf.includes('\r\n')) {
			// May include multiple lines (multi-line responses); return last complete line
			const lines = buf.split('\r\n').filter(Boolean);
			return lines[lines.length - 1];
		}
	}
}

/** Read a complete (possibly multi-line) SMTP response and return the final line. */
async function readResponse(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
	// Multi-line responses have "NNN-text" lines; final line is "NNN text" (space not dash)
	let lastLine = '';
	const dec = new TextDecoder();
	let buf = '';
	const deadline = Date.now() + SMTP_TIMEOUT_MS;

	while (true) {
		if (Date.now() > deadline) throw new Error('SMTP read timeout');
		const { value, done } = await reader.read();
		if (done) throw new Error('SMTP connection closed unexpectedly');
		buf += dec.decode(value, { stream: true });

		// Split on CRLF, process complete lines
		const parts = buf.split('\r\n');
		// Last element may be an incomplete line — keep it in buf
		buf = parts.pop() ?? '';

		for (const line of parts) {
			if (!line) continue;
			lastLine = line;
			// Check if this is the final response line: "NNN " (space after code, not dash)
			if (line.length >= 4 && line[3] === ' ') {
				return lastLine;
			}
		}
	}
}

function checkCode(response: string, expected: number): void {
	const code = parseInt(response.slice(0, 3), 10);
	if (code !== expected) {
		// Never include response text in thrown error to avoid leaking credentials
		throw new Error(`SMTP unexpected response code (expected ${expected}, got ${code})`);
	}
}

async function sendViaSMTP(opts: {
	gmailUser: string;
	gmailAppPassword: string;
	toEmail: string;
	mimeMessage: string;
}): Promise<void> {
	const enc = new TextEncoder();

	const b64user = btoa(opts.gmailUser);
	const b64pass = btoa(opts.gmailAppPassword);

	// Open TLS socket directly (port 465 = implicit TLS)
	const socket = connect(
		{ hostname: SMTP_HOST, port: SMTP_PORT },
		{ secureTransport: 'on' }
	);

	const writer = socket.writable.getWriter();
	const reader = socket.readable.getReader();

	const write = async (cmd: string): Promise<void> => {
		await writer.write(enc.encode(cmd + '\r\n'));
	};

	try {
		// 1. Server greeting
		const greeting = await readResponse(reader);
		checkCode(greeting, 220);

		// 2. EHLO
		await write(`EHLO custodybuilder.com`);
		const ehloResp = await readResponse(reader);
		checkCode(ehloResp, 250);

		// 3. AUTH LOGIN
		await write('AUTH LOGIN');
		const authPrompt1 = await readResponse(reader);
		checkCode(authPrompt1, 334); // "Username:"

		await write(b64user);
		const authPrompt2 = await readResponse(reader);
		checkCode(authPrompt2, 334); // "Password:"

		await write(b64pass);
		const authResp = await readResponse(reader);
		checkCode(authResp, 235); // Authentication successful

		// 4. MAIL FROM
		await write(`MAIL FROM:<${opts.gmailUser}>`);
		const mailFromResp = await readResponse(reader);
		checkCode(mailFromResp, 250);

		// 5. RCPT TO
		await write(`RCPT TO:<${opts.toEmail}>`);
		const rcptResp = await readResponse(reader);
		checkCode(rcptResp, 250);

		// 6. DATA
		await write('DATA');
		const dataPrompt = await readResponse(reader);
		checkCode(dataPrompt, 354); // Start mail input

		// 7. Message body — end with CRLF.CRLF
		await write(opts.mimeMessage + '\r\n.');
		const dataResp = await readResponse(reader);
		checkCode(dataResp, 250);

		// 8. QUIT
		await write('QUIT');
		// Best-effort; no strict check on QUIT response

		await writer.close();
	} catch (err) {
		// Close writer on error without leaking credentials in message
		try { await writer.abort(); } catch { /* ignore */ }
		throw err;
	} finally {
		reader.cancel();
	}
}

// ---------------------------------------------------------------------------
// Email content builders
// ---------------------------------------------------------------------------

function buildEmailContent(opts: {
	visitorEmail: string;
	name: string;
	message: string;
	pageUrl: string;
	userAgent: string;
	timestamp: string;
}): { subject: string; textBody: string; htmlBody: string } {
	const nameDisplay = opts.name || '(not provided)';
	const pageDisplay = opts.pageUrl || '(not captured)';
	const uaDisplay = opts.userAgent ? opts.userAgent.slice(0, 300) : '(not provided)';

	const subject = `CustodyBuilder contact from ${opts.visitorEmail}`;

	const textBody = [
		'New contact form submission — CustodyBuilder',
		'',
		`From: ${opts.visitorEmail}`,
		`Name: ${nameDisplay}`,
		`Page: ${pageDisplay}`,
		`Time: ${opts.timestamp}`,
		`User-Agent: ${uaDisplay}`,
		'',
		'--- Message ---',
		opts.message,
		'--- End Message ---',
	].join('\n');

	const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>CustodyBuilder Contact</title></head>
<body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a">
  <h2 style="color:#2563eb;margin-bottom:4px">New Contact Submission</h2>
  <p style="color:#666;margin-top:0;font-size:14px">CustodyBuilder contact form</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:6px 0;font-weight:600;width:120px;vertical-align:top">From</td><td style="padding:6px 0">${escapeHtml(opts.visitorEmail)}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">Name</td><td style="padding:6px 0">${escapeHtml(nameDisplay)}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">Page</td><td style="padding:6px 0">${escapeHtml(pageDisplay)}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">Time</td><td style="padding:6px 0">${escapeHtml(opts.timestamp)}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">User-Agent</td><td style="padding:6px 0;font-size:12px;color:#555">${escapeHtml(uaDisplay)}</td></tr>
  </table>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
  <h3 style="margin-bottom:8px">Message</h3>
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(opts.message)}</div>
  <p style="color:#999;font-size:11px;margin-top:20px">This email was sent via the CustodyBuilder contact form. Reply-To is set to the visitor's email.</p>
</body>
</html>`;

	return { subject, textBody, htmlBody };
}

// ---------------------------------------------------------------------------
// CORS helpers
// ---------------------------------------------------------------------------

const ALLOWED_ORIGINS = new Set([
	'https://custodybuilder.com',
	'https://www.custodybuilder.com',
]);

function isAllowedOrigin(origin: string | null): boolean {
	if (!origin) return false;
	if (ALLOWED_ORIGINS.has(origin)) return true;
	// Allow any pages.dev preview subdomain
	try {
		const url = new URL(origin);
		return url.hostname.endsWith('.custodyschedulegenerator.pages.dev') ||
			url.hostname === 'custodyschedulegenerator.pages.dev';
	} catch {
		return false;
	}
}

function corsHeaders(origin: string | null): Record<string, string> {
	const allowed = isAllowedOrigin(origin) ? (origin ?? '') : 'https://custodybuilder.com';
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin',
	};
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('origin');
	const headers = { 'Content-Type': 'application/json', ...corsHeaders(origin) };

	// Parse body
	let parsed: ParsedBody;
	try {
		parsed = await parseBody(request);
	} catch {
		return new Response(JSON.stringify({ ok: false, error: 'Invalid request body.' }), { status: 400, headers });
	}

	// Honeypot check — return generic success to deceive bots
	if (parsed.honeypot) {
		return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
	}

	// Timing signal — reject if form was submitted in under 2 seconds (bot speed)
	if (parsed.formTime !== null) {
		const elapsed = Date.now() - parsed.formTime;
		if (elapsed < 2000) {
			return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
		}
	}

	// Validate
	const validationError = validateInput(parsed);
	if (validationError) {
		return new Response(JSON.stringify({ ok: false, error: validationError }), { status: 422, headers });
	}

	// Build email
	const timestamp = new Date().toUTCString();
	const userAgent = request.headers.get('user-agent') ?? '';
	const { subject, textBody, htmlBody } = buildEmailContent({
		visitorEmail: parsed.visitorEmail,
		name: parsed.name,
		message: parsed.message,
		pageUrl: parsed.pageUrl,
		userAgent,
		timestamp,
	});

	const mimeMessage = buildMimeMessage({
		from: env.GMAIL_USER,
		to: env.CONTACT_TO_EMAIL,
		replyTo: parsed.visitorEmail, // Only set after validation
		subject,
		textBody,
		htmlBody,
		date: timestamp,
	});

	// Send
	try {
		await sendViaSMTP({
			gmailUser: env.GMAIL_USER,
			gmailAppPassword: env.GMAIL_APP_PASSWORD,
			toEmail: env.CONTACT_TO_EMAIL,
			mimeMessage,
		});
		return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
	} catch (err) {
		// Log error for CF Workers logs but never expose credentials or SMTP response
		console.error('SMTP send failed:', err instanceof Error ? err.message : 'unknown error');
		return new Response(JSON.stringify({ ok: false, error: 'Failed to send message. Please try again later.' }), { status: 502, headers });
	}
};

// Handle preflight
export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
	const origin = request.headers.get('origin');
	return new Response(null, {
		status: 204,
		headers: corsHeaders(origin),
	});
};
