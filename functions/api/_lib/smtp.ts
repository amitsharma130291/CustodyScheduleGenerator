/**
 * Shared raw SMTP-over-TLS sender (cloudflare:sockets), generalized from the
 * contact form's proven implementation (functions/api/contact.ts) to also
 * support file attachments. No Node.js built-ins, no external mail service —
 * same Gmail SMTP + App Password approach as the contact form, reusing the
 * same env vars (GMAIL_USER, GMAIL_APP_PASSWORD).
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — cloudflare:sockets is a runtime-only module; TS can't resolve it
import { connect } from 'cloudflare:sockets';

export interface EmailAttachment {
	filename: string;
	contentType: string;
	base64Content: string;
}

export interface SendEmailOptions {
	gmailUser: string;
	gmailAppPassword: string;
	from: string;
	to: string;
	replyTo?: string;
	subject: string;
	textBody: string;
	htmlBody: string;
	attachments?: EmailAttachment[];
	date: string;
}

/** Dot-stuff message body lines per RFC 5321 §4.5.2. Safe for base64 content — the base64 alphabet never produces a line starting with "." */
function dotStuff(text: string): string {
	return text
		.split('\n')
		.map((line) => (line.startsWith('.') ? '.' + line : line))
		.join('\n');
}

function wrapBase64(base64: string): string {
	const lines: string[] = [];
	for (let i = 0; i < base64.length; i += 76) {
		lines.push(base64.slice(i, i + 76));
	}
	return lines.join('\r\n');
}

/**
 * Strips CR/LF and other control characters from a value bound for an SMTP
 * header line. Every header-bound field goes through this — not just the
 * ones current callers happen to source from unsanitized client input —
 * so this stays safe even if a future caller passes through raw user text.
 * Without it, a value containing "\r\nBcc: attacker@evil.com" would inject
 * an arbitrary extra header into mail sent from this site's own address.
 */
function sanitizeHeaderValue(value: string): string {
	return value.replace(/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/g, '').trim();
}

function buildMimeMessage(opts: SendEmailOptions): string {
	const altBoundary = 'cb_alt_' + Math.random().toString(36).slice(2, 14);
	const mixedBoundary = 'cb_mixed_' + Math.random().toString(36).slice(2, 14);
	const from = sanitizeHeaderValue(opts.from);
	const to = sanitizeHeaderValue(opts.to);
	const replyTo = opts.replyTo ? sanitizeHeaderValue(opts.replyTo) : undefined;
	const subject = sanitizeHeaderValue(opts.subject);

	const alternativePart = [
		`--${altBoundary}`,
		`Content-Type: text/plain; charset=UTF-8`,
		`Content-Transfer-Encoding: 8bit`,
		``,
		opts.textBody,
		``,
		`--${altBoundary}`,
		`Content-Type: text/html; charset=UTF-8`,
		`Content-Transfer-Encoding: 8bit`,
		``,
		opts.htmlBody,
		``,
		`--${altBoundary}--`,
	].join('\r\n');

	const headers: string[] = [
		`From: CustodyBuilder <${from}>`,
		`To: ${to}`,
		...(replyTo ? [`Reply-To: ${replyTo}`] : []),
		`Subject: ${subject}`,
		`Date: ${sanitizeHeaderValue(opts.date)}`,
		`MIME-Version: 1.0`,
	];

	if (!opts.attachments?.length) {
		return dotStuff([...headers, `Content-Type: multipart/alternative; boundary="${altBoundary}"`, ``, alternativePart].join('\r\n'));
	}

	const attachmentParts = opts.attachments
		.map((attachment) =>
			[
				`--${mixedBoundary}`,
				`Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
				`Content-Transfer-Encoding: base64`,
				`Content-Disposition: attachment; filename="${attachment.filename}"`,
				``,
				wrapBase64(attachment.base64Content),
			].join('\r\n'),
		)
		.join('\r\n');

	const body = [
		`--${mixedBoundary}`,
		`Content-Type: multipart/alternative; boundary="${altBoundary}"`,
		``,
		alternativePart,
		attachmentParts,
		`--${mixedBoundary}--`,
	].join('\r\n');

	return dotStuff([...headers, `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`, ``, body].join('\r\n'));
}

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_TIMEOUT_MS = 20_000;

async function readResponse(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
	let lastLine = '';
	const dec = new TextDecoder();
	let buf = '';
	const deadline = Date.now() + SMTP_TIMEOUT_MS;

	while (true) {
		if (Date.now() > deadline) throw new Error('SMTP read timeout');
		const { value, done } = await reader.read();
		if (done) throw new Error('SMTP connection closed unexpectedly');
		buf += dec.decode(value, { stream: true });

		const parts = buf.split('\r\n');
		buf = parts.pop() ?? '';

		for (const line of parts) {
			if (!line) continue;
			lastLine = line;
			if (line.length >= 4 && line[3] === ' ') {
				return lastLine;
			}
		}
	}
}

function checkCode(response: string, expected: number): void {
	const code = parseInt(response.slice(0, 3), 10);
	if (code !== expected) {
		throw new Error(`SMTP unexpected response code (expected ${expected}, got ${code})`);
	}
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
	const enc = new TextEncoder();
	const b64user = btoa(opts.gmailUser);
	const b64pass = btoa(opts.gmailAppPassword);
	const mimeMessage = buildMimeMessage(opts);

	const socket = connect({ hostname: SMTP_HOST, port: SMTP_PORT }, { secureTransport: 'on' });
	const writer = socket.writable.getWriter();
	const reader = socket.readable.getReader();

	const write = async (cmd: string): Promise<void> => {
		await writer.write(enc.encode(cmd + '\r\n'));
	};

	try {
		checkCode(await readResponse(reader), 220);

		await write(`EHLO custodybuilder.com`);
		checkCode(await readResponse(reader), 250);

		await write('AUTH LOGIN');
		checkCode(await readResponse(reader), 334);
		await write(b64user);
		checkCode(await readResponse(reader), 334);
		await write(b64pass);
		checkCode(await readResponse(reader), 235);

		// Same CRLF-stripping as the MIME headers above, applied at the raw
		// SMTP-command level this time — an unsanitized address here could
		// inject extra SMTP commands into the protocol dialogue itself, not
		// just extra mail headers.
		await write(`MAIL FROM:<${sanitizeHeaderValue(opts.gmailUser)}>`);
		checkCode(await readResponse(reader), 250);

		await write(`RCPT TO:<${sanitizeHeaderValue(opts.to)}>`);
		checkCode(await readResponse(reader), 250);

		await write('DATA');
		checkCode(await readResponse(reader), 354);

		await write(mimeMessage + '\r\n.');
		checkCode(await readResponse(reader), 250);

		await write('QUIT');
		await writer.close();
	} catch (err) {
		try {
			await writer.abort();
		} catch {
			// ignore
		}
		throw err;
	} finally {
		reader.cancel();
	}
}
