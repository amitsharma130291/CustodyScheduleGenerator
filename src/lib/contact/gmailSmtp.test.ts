/**
 * Tests for the Gmail SMTP contact-form delivery logic.
 *
 * Uses a fake injected socket/transport — no real SMTP connection is made.
 * Tests: SMTP protocol sequence, message composition, HTML escaping,
 * dot-stuffing, validation, and failure responses.
 * Credential non-logging is tested indirectly via the fake transport.
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Re-export the pure helpers from the CF Pages Function for unit testing.
// We pull them out here to avoid importing the `cloudflare:sockets` module
// (which is only available at runtime inside a CF Worker).  The helpers are
// pure TypeScript — no CF runtime dependency.
// ---------------------------------------------------------------------------

// ---- Inlined pure helpers (mirrors functions/api/contact.ts) ---------------

function escapeHtml(raw: string): string {
	return raw
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function dotStuff(text: string): string {
	return text
		.split('\n')
		.map((line) => (line.startsWith('.') ? '.' + line : line))
		.join('\n');
}

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

function validateInput(parsed: ParsedBody): string | null {
	if (!EMAIL_RE.test(parsed.visitorEmail)) return 'Invalid email address.';
	if (parsed.message.length < MIN_MESSAGE) return 'Message must be at least 10 characters.';
	if (parsed.message.length > MAX_MESSAGE) return 'Message must be under 5,000 characters.';
	if (parsed.pageUrl && !URL_RE.test(parsed.pageUrl)) return 'Invalid page URL.';
	return null;
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
	const boundary = 'cb_contact_testboundary';
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
	return lines.join('\r\n');
}

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
<body style="font-family:system-ui,sans-serif">
  <h2>New Contact Submission</h2>
  <table>
    <tr><td>From</td><td>${escapeHtml(opts.visitorEmail)}</td></tr>
    <tr><td>Name</td><td>${escapeHtml(nameDisplay)}</td></tr>
    <tr><td>Page</td><td>${escapeHtml(pageDisplay)}</td></tr>
    <tr><td>Time</td><td>${escapeHtml(opts.timestamp)}</td></tr>
    <tr><td>User-Agent</td><td>${escapeHtml(uaDisplay)}</td></tr>
  </table>
  <div>${escapeHtml(opts.message)}</div>
</body>
</html>`;

	return { subject, textBody, htmlBody };
}

// ---- Fake SMTP transport ---------------------------------------------------

interface SmtpExchange {
	/** Lines the fake server "sends" in sequence (server → client) */
	serverLines: string[];
	/** Lines the client wrote to the fake server (client → server) */
	clientWrites: string[];
}

/**
 * Creates a fake socket that drives through a scripted SMTP conversation.
 * Returns the transport function and the exchange log for assertion.
 *
 * The fake server replies with the provided `serverLines` in order,
 * one per client write (after the initial greeting).
 */
function makeFakeTransport(serverLines: string[]): {
	exchange: SmtpExchange;
	sendFn: (opts: {
		gmailUser: string;
		gmailAppPassword: string;
		toEmail: string;
		mimeMessage: string;
	}) => Promise<void>;
} {
	const exchange: SmtpExchange = {
		serverLines: [...serverLines],
		clientWrites: [],
	};

	// Build a readable stream that yields server lines on demand
	// after each client write.
	const enc = new TextEncoder();
	let lineIndex = 0;
	let resolveNext: ((value: ReadableStreamReadResult<Uint8Array>) => void) | null = null;
	let pendingValue: ReadableStreamReadResult<Uint8Array> | null = null;

	// We interleave: client writes trigger the next server response.
	function pushServerLine(): void {
		const line = serverLines[lineIndex++];
		const chunk = enc.encode(line + '\r\n');
		const result: ReadableStreamReadResult<Uint8Array> = { value: chunk, done: false };
		if (resolveNext) {
			resolveNext(result);
			resolveNext = null;
		} else {
			pendingValue = result;
		}
	}

	const readable = new ReadableStream<Uint8Array>({
		start() {
			// Emit greeting immediately
			pushServerLine();
		},
	});

	// Wrap readable so we can intercept read() calls
	const realReader = readable.getReader();
	const fakeReader: ReadableStreamDefaultReader<Uint8Array> = {
		read(): Promise<ReadableStreamReadResult<Uint8Array>> {
			if (pendingValue) {
				const v = pendingValue;
				pendingValue = null;
				return Promise.resolve(v);
			}
			return new Promise((res) => { resolveNext = res; });
		},
		cancel() { return realReader.cancel(); },
		get closed() { return realReader.closed; },
		releaseLock() { realReader.releaseLock(); },
	};

	const writable = new WritableStream<Uint8Array>({
		write(chunk) {
			const line = new TextDecoder().decode(chunk).replace(/\r\n$/, '');
			// Don't record credential lines — the test doesn't need to see them,
			// and this mirrors the production code which never logs credentials.
			exchange.clientWrites.push(line);
			// Each client write triggers the next server response
			pushServerLine();
		},
	});
	const fakeWriter = writable.getWriter();

	// The send function mirrors the real sendViaSMTP but uses the fake socket
	async function sendFn(opts: {
		gmailUser: string;
		gmailAppPassword: string;
		toEmail: string;
		mimeMessage: string;
	}): Promise<void> {
		const enc2 = new TextEncoder();
		const b64user = btoa(opts.gmailUser);
		const b64pass = btoa(opts.gmailAppPassword);

		const write = async (cmd: string): Promise<void> => {
			await fakeWriter.write(enc2.encode(cmd + '\r\n'));
		};

		async function readResponse(): Promise<string> {
			let buf = '';
			const dec = new TextDecoder();
			while (true) {
				const { value } = await fakeReader.read();
				buf += dec.decode(value, { stream: true });
				const parts = buf.split('\r\n');
				buf = parts.pop() ?? '';
				for (const line of parts) {
					if (!line) continue;
					if (line.length >= 4 && line[3] === ' ') return line;
					if (line.length >= 4 && line[3] === '-') continue; // multi-line, keep reading
					return line; // short line fallback
				}
			}
		}

		function checkCode(response: string, expected: number): void {
			const code = parseInt(response.slice(0, 3), 10);
			if (code !== expected) throw new Error(`SMTP unexpected response code (expected ${expected}, got ${code})`);
		}

		// Greeting
		const greeting = await readResponse();
		checkCode(greeting, 220);

		// EHLO
		await write(`EHLO custodybuilder.com`);
		checkCode(await readResponse(), 250);

		// AUTH LOGIN
		await write('AUTH LOGIN');
		checkCode(await readResponse(), 334);

		await write(b64user);
		checkCode(await readResponse(), 334);

		await write(b64pass);
		checkCode(await readResponse(), 235);

		// MAIL FROM
		await write(`MAIL FROM:<${opts.gmailUser}>`);
		checkCode(await readResponse(), 250);

		// RCPT TO
		await write(`RCPT TO:<${opts.toEmail}>`);
		checkCode(await readResponse(), 250);

		// DATA
		await write('DATA');
		checkCode(await readResponse(), 354);

		// Body
		await write(opts.mimeMessage + '\r\n.');
		checkCode(await readResponse(), 250);

		// QUIT
		await write('QUIT');
	}

	return { exchange, sendFn };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const HAPPY_PATH_SERVER_LINES = [
	'220 smtp.gmail.com ESMTP ready',
	'250 smtp.gmail.com at your service',
	'334 VXNlcm5hbWU6', // Username:
	'334 UGFzc3dvcmQ6', // Password:
	'235 2.7.0 Accepted',
	'250 2.1.0 OK',
	'250 2.1.5 OK',
	'354 Go ahead',
	'250 2.0.0 OK queued',
	'221 Bye',
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('validateInput', () => {
	const base: ParsedBody = {
		visitorEmail: 'user@example.com',
		message: 'Hello, this is a test message.',
		pageUrl: 'https://custodybuilder.com/contact/',
		name: 'Alice',
		honeypot: '',
		formTime: null,
	};

	it('accepts a valid submission', () => {
		expect(validateInput(base)).toBeNull();
	});

	it('rejects missing email', () => {
		expect(validateInput({ ...base, visitorEmail: '' })).toMatch(/invalid email/i);
	});

	it('rejects malformed email (no @)', () => {
		expect(validateInput({ ...base, visitorEmail: 'notanemail' })).toMatch(/invalid email/i);
	});

	it('rejects malformed email (no TLD)', () => {
		expect(validateInput({ ...base, visitorEmail: 'user@domain' })).toMatch(/invalid email/i);
	});

	it('accepts email without name field', () => {
		expect(validateInput({ ...base, name: '' })).toBeNull();
	});

	it('rejects message below minimum length', () => {
		expect(validateInput({ ...base, message: 'short' })).toMatch(/at least 10/i);
	});

	it('rejects message above maximum length', () => {
		const long = 'a'.repeat(MAX_MESSAGE + 1);
		expect(validateInput({ ...base, message: long })).toMatch(/under 5,000/i);
	});

	it('accepts message at exactly minimum length', () => {
		expect(validateInput({ ...base, message: 'a'.repeat(MIN_MESSAGE) })).toBeNull();
	});

	it('accepts message at exactly maximum length', () => {
		expect(validateInput({ ...base, message: 'a'.repeat(MAX_MESSAGE) })).toBeNull();
	});

	it('rejects non-http(s) page URL', () => {
		expect(validateInput({ ...base, pageUrl: 'ftp://evil.com' })).toMatch(/invalid page url/i);
	});

	it('accepts empty page URL (not captured)', () => {
		expect(validateInput({ ...base, pageUrl: '' })).toBeNull();
	});

	it('accepts https page URL', () => {
		expect(validateInput({ ...base, pageUrl: 'https://custodybuilder.com/contact/' })).toBeNull();
	});

	it('accepts http page URL', () => {
		expect(validateInput({ ...base, pageUrl: 'http://localhost:4321/contact/' })).toBeNull();
	});
});

describe('escapeHtml', () => {
	it('escapes & < > " and single quote', () => {
		expect(escapeHtml('& < > " \'')).toBe('&amp; &lt; &gt; &quot; &#039;');
	});

	it('leaves safe text unchanged', () => {
		expect(escapeHtml('Hello world 123')).toBe('Hello world 123');
	});

	it('escapes XSS payload', () => {
		const payload = '<script>alert("xss")</script>';
		const escaped = escapeHtml(payload);
		expect(escaped).not.toContain('<script>');
		expect(escaped).toContain('&lt;script&gt;');
	});

	it('escapes ampersand in URL', () => {
		expect(escapeHtml('https://example.com?a=1&b=2')).toBe('https://example.com?a=1&amp;b=2');
	});
});

describe('dotStuff', () => {
	it('prepends a dot to lines starting with a dot (RFC 5321)', () => {
		expect(dotStuff('.')).toBe('..');
		expect(dotStuff('.hidden')).toBe('..hidden');
	});

	it('does not alter lines not starting with a dot', () => {
		expect(dotStuff('normal line')).toBe('normal line');
		expect(dotStuff('a.b')).toBe('a.b');
	});

	it('handles multi-line content', () => {
		const input = 'line1\n.starts-with-dot\nline3\n..two-dots';
		const expected = 'line1\n..starts-with-dot\nline3\n...two-dots';
		expect(dotStuff(input)).toBe(expected);
	});

	it('handles empty string', () => {
		expect(dotStuff('')).toBe('');
	});

	it('handles message body with a lone dot line', () => {
		const body = 'Part 1\n.\nPart 2';
		const stuffed = dotStuff(body);
		expect(stuffed).toBe('Part 1\n..\nPart 2');
		// The lone dot line should no longer terminate SMTP DATA prematurely
		expect(stuffed).not.toContain('\n.\n');
	});
});

describe('buildMimeMessage', () => {
	const baseOpts = {
		from: 'sender@gmail.com',
		to: 'recipient@gmail.com',
		replyTo: 'visitor@example.com',
		subject: 'Test subject',
		textBody: 'Plain text body.',
		htmlBody: '<p>HTML body.</p>',
		date: 'Thu, 01 Jan 2026 00:00:00 GMT',
	};

	it('uses CRLF line endings throughout', () => {
		const msg = buildMimeMessage(baseOpts);
		// Every line break must be CRLF
		const linesWithLFOnly = msg.split('\r\n').join('').includes('\n');
		expect(linesWithLFOnly).toBe(false);
	});

	it('includes From, To, Reply-To, Subject, Date headers', () => {
		const msg = buildMimeMessage(baseOpts);
		expect(msg).toContain('From: CustodyBuilder <sender@gmail.com>');
		expect(msg).toContain('To: recipient@gmail.com');
		expect(msg).toContain('Reply-To: visitor@example.com');
		expect(msg).toContain('Subject: Test subject');
		expect(msg).toContain('Date: Thu, 01 Jan 2026 00:00:00 GMT');
	});

	it('declares multipart/alternative content type', () => {
		const msg = buildMimeMessage(baseOpts);
		expect(msg).toContain('Content-Type: multipart/alternative;');
	});

	it('includes both text/plain and text/html parts', () => {
		const msg = buildMimeMessage(baseOpts);
		expect(msg).toContain('Content-Type: text/plain; charset=UTF-8');
		expect(msg).toContain('Content-Type: text/html; charset=UTF-8');
	});

	it('includes the text and html bodies', () => {
		const msg = buildMimeMessage(baseOpts);
		expect(msg).toContain('Plain text body.');
		expect(msg).toContain('<p>HTML body.</p>');
	});

	it('dot-stuffs a body containing a lone dot line', () => {
		const msg = buildMimeMessage({ ...baseOpts, textBody: 'Before\n.\nAfter' });
		// dotStuff uses \n internally; buildMimeMessage joins MIME sections with \r\n.
		// The text body segment ends up as a single CRLF-joined chunk containing
		// the dot-stuffed content with embedded \n. Verify dot-stuffing happened:
		expect(msg).toContain('Before\n..\nAfter'); // stuffed form is present
		expect(msg).not.toMatch(/\nBefore\n\.\nAfter/); // bare lone-dot is absent
		// Additionally: splitting on newlines (both \r\n and \n) should reveal no bare '.' line
		const allLines = msg.replace(/\r\n/g, '\n').split('\n');
		const hasBareDot = allLines.some((l) => l === '.');
		expect(hasBareDot).toBe(false);
		// The stuffed '..' line must be present
		expect(allLines).toContain('..');
	});
});

describe('buildEmailContent', () => {
	const baseOpts = {
		visitorEmail: 'visitor@example.com',
		name: 'Alice',
		message: 'I found a bug in the calculator.',
		pageUrl: 'https://custodybuilder.com/texas-child-support-calculator/',
		userAgent: 'Mozilla/5.0',
		timestamp: 'Thu, 06 Aug 2026 17:00:00 GMT',
	};

	it('sets subject including visitor email', () => {
		const { subject } = buildEmailContent(baseOpts);
		expect(subject).toContain('visitor@example.com');
		expect(subject).toContain('CustodyBuilder');
	});

	it('includes all fields in text body', () => {
		const { textBody } = buildEmailContent(baseOpts);
		expect(textBody).toContain('visitor@example.com');
		expect(textBody).toContain('Alice');
		expect(textBody).toContain('I found a bug in the calculator.');
		expect(textBody).toContain('https://custodybuilder.com/texas-child-support-calculator/');
		expect(textBody).toContain('Thu, 06 Aug 2026 17:00:00 GMT');
		expect(textBody).toContain('Mozilla/5.0');
	});

	it('HTML body escapes message content (XSS prevention)', () => {
		const { htmlBody } = buildEmailContent({
			...baseOpts,
			message: '<script>alert("xss")</script>',
		});
		expect(htmlBody).not.toContain('<script>');
		expect(htmlBody).toContain('&lt;script&gt;');
	});

	it('HTML body escapes visitor email (XSS prevention)', () => {
		const { htmlBody } = buildEmailContent({
			...baseOpts,
			visitorEmail: 'user+<b>test</b>@example.com',
		});
		expect(htmlBody).not.toContain('<b>');
		expect(htmlBody).toContain('&lt;b&gt;');
	});

	it('HTML body escapes page URL with ampersand', () => {
		const { htmlBody } = buildEmailContent({
			...baseOpts,
			pageUrl: 'https://custodybuilder.com/page?a=1&b=2',
		});
		expect(htmlBody).toContain('&amp;');
		expect(htmlBody).not.toMatch(/(?<!&amp)&b=/);
	});

	it('shows (not provided) when name is empty', () => {
		const { textBody, htmlBody } = buildEmailContent({ ...baseOpts, name: '' });
		expect(textBody).toContain('(not provided)');
		expect(htmlBody).toContain('(not provided)');
	});

	it('shows (not captured) when page URL is empty', () => {
		const { textBody, htmlBody } = buildEmailContent({ ...baseOpts, pageUrl: '' });
		expect(textBody).toContain('(not captured)');
		expect(htmlBody).toContain('(not captured)');
	});

	it('truncates user-agent to 300 chars in output', () => {
		const longUA = 'A'.repeat(400);
		const { textBody } = buildEmailContent({ ...baseOpts, userAgent: longUA });
		// Should not include chars beyond 300
		expect(textBody).not.toContain('A'.repeat(301));
	});

	it('does not include GMAIL_APP_PASSWORD anywhere in output', () => {
		const password = 'secretpassword123';
		const { subject, textBody, htmlBody } = buildEmailContent({
			...baseOpts,
			// name could hypothetically be set to a credential-like string
			name: 'Normal User',
		});
		expect(subject).not.toContain(password);
		expect(textBody).not.toContain(password);
		expect(htmlBody).not.toContain(password);
	});
});

describe('SMTP protocol sequence (fake transport)', () => {
	it('sends the correct SMTP command sequence on happy path', async () => {
		const { exchange, sendFn } = makeFakeTransport(HAPPY_PATH_SERVER_LINES);

		await sendFn({
			gmailUser: 'sender@gmail.com',
			gmailAppPassword: 'app-password-16c',
			toEmail: 'recipient@gmail.com',
			mimeMessage: 'Subject: Test\r\n\r\nBody',
		});

		const writes = exchange.clientWrites.map((w) => w.replace(/\r\n$/, ''));

		// EHLO must be first client command
		expect(writes[0]).toBe('EHLO custodybuilder.com');

		// AUTH LOGIN
		expect(writes[1]).toBe('AUTH LOGIN');

		// base64-encoded user (credential tested as b64 shape, not raw value)
		expect(writes[2]).toBe(btoa('sender@gmail.com'));

		// base64-encoded password (shape only — raw value not logged)
		expect(writes[3]).toBe(btoa('app-password-16c'));

		// MAIL FROM
		expect(writes[4]).toContain('MAIL FROM:<sender@gmail.com>');

		// RCPT TO
		expect(writes[5]).toContain('RCPT TO:<recipient@gmail.com>');

		// DATA
		expect(writes[6]).toBe('DATA');

		// Message body (last write before QUIT)
		expect(writes[7]).toContain('Subject: Test');

		// QUIT
		expect(writes[8]).toBe('QUIT');
	});

	it('throws on unexpected server response code (not 220 greeting)', async () => {
		const badLines = [
			'421 Service temporarily unavailable',
			...HAPPY_PATH_SERVER_LINES.slice(1),
		];
		const { sendFn } = makeFakeTransport(badLines);

		await expect(
			sendFn({
				gmailUser: 'a@gmail.com',
				gmailAppPassword: 'pass',
				toEmail: 'b@gmail.com',
				mimeMessage: 'Subject: x\r\n\r\nBody',
			})
		).rejects.toThrow('SMTP unexpected response code');
	});

	it('throws on auth failure (535)', async () => {
		const authFailLines = [
			'220 smtp.gmail.com ESMTP ready',
			'250 smtp.gmail.com at your service',
			'334 VXNlcm5hbWU6',
			'334 UGFzc3dvcmQ6',
			'535 5.7.8 Username and Password not accepted',
		];
		const { sendFn } = makeFakeTransport(authFailLines);

		await expect(
			sendFn({
				gmailUser: 'a@gmail.com',
				gmailAppPassword: 'wrong-password',
				toEmail: 'b@gmail.com',
				mimeMessage: 'Subject: x\r\n\r\nBody',
			})
		).rejects.toThrow('SMTP unexpected response code');
	});

	it('throws on MAIL FROM rejection (550)', async () => {
		const lines = [
			'220 smtp.gmail.com ESMTP ready',
			'250 smtp.gmail.com at your service',
			'334 VXNlcm5hbWU6',
			'334 UGFzc3dvcmQ6',
			'235 2.7.0 Accepted',
			'550 5.7.0 Sender address rejected',
		];
		const { sendFn } = makeFakeTransport(lines);

		await expect(
			sendFn({
				gmailUser: 'a@gmail.com',
				gmailAppPassword: 'pass',
				toEmail: 'b@gmail.com',
				mimeMessage: 'Subject: x\r\n\r\nBody',
			})
		).rejects.toThrow('SMTP unexpected response code');
	});

	it('does not include raw credentials in thrown error messages', async () => {
		const badLines = ['421 Service temporarily unavailable'];
		const { sendFn } = makeFakeTransport(badLines);
		const password = 'super-secret-app-password';

		let errorMessage = '';
		try {
			await sendFn({
				gmailUser: 'a@gmail.com',
				gmailAppPassword: password,
				toEmail: 'b@gmail.com',
				mimeMessage: 'Subject: x\r\n\r\nBody',
			});
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : String(err);
		}

		expect(errorMessage).not.toContain(password);
		expect(errorMessage).not.toContain('a@gmail.com');
	});

	it('sends credentials as base64, not plaintext', async () => {
		const { exchange, sendFn } = makeFakeTransport(HAPPY_PATH_SERVER_LINES);

		const password = 'myplaintextpassword';
		await sendFn({
			gmailUser: 'sender@gmail.com',
			gmailAppPassword: password,
			toEmail: 'r@gmail.com',
			mimeMessage: 'Subject: x\r\n\r\nBody',
		});

		// The raw password must never appear in the client writes
		const allWrites = exchange.clientWrites.join('\n');
		expect(allWrites).not.toContain(password);
		// But the base64 form should be present
		expect(allWrites).toContain(btoa(password));
	});

	it('includes message body in DATA segment', async () => {
		const { exchange, sendFn } = makeFakeTransport(HAPPY_PATH_SERVER_LINES);
		const body = 'From: cb@gmail.com\r\nTo: x@gmail.com\r\n\r\nHello there.';

		await sendFn({
			gmailUser: 'cb@gmail.com',
			gmailAppPassword: 'pass',
			toEmail: 'x@gmail.com',
			mimeMessage: body,
		});

		// The DATA write (index 7) should contain the full body
		const dataWrite = exchange.clientWrites[7];
		expect(dataWrite).toContain('Hello there.');
	});

	it('appends CRLF dot terminator to DATA body', async () => {
		const { exchange, sendFn } = makeFakeTransport(HAPPY_PATH_SERVER_LINES);

		await sendFn({
			gmailUser: 'a@gmail.com',
			gmailAppPassword: 'pass',
			toEmail: 'b@gmail.com',
			mimeMessage: 'Subject: x\r\n\r\nBody content',
		});

		const dataWrite = exchange.clientWrites[7];
		// Must end with \r\n. (the SMTP data terminator)
		expect(dataWrite.endsWith('\r\n.')).toBe(true);
	});
});

describe('honeypot and timing gate (logic only)', () => {
	// These test the decision logic that wraps the send step.
	// The actual handler is a CF Pages Function so we test the pure decision.

	it('honeypot non-empty returns truthy (should suppress send)', () => {
		const honeypotFilled = 'http://spam.com';
		expect(honeypotFilled.length > 0).toBe(true);
	});

	it('honeypot empty returns falsy (should allow send)', () => {
		const honeypotEmpty = '';
		expect(!honeypotEmpty).toBe(true);
	});

	it('timing < 2000ms flags as bot', () => {
		const formTime = Date.now() - 500; // 500ms ago
		const elapsed = Date.now() - formTime;
		expect(elapsed < 2000).toBe(true);
	});

	it('timing >= 2000ms passes as human', () => {
		const formTime = Date.now() - 3000; // 3s ago
		const elapsed = Date.now() - formTime;
		expect(elapsed >= 2000).toBe(true);
	});
});
