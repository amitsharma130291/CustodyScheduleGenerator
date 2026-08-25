/**
 * Self-verifying license keys — same pattern as qrworkbench/barcodeflow.
 * A key is derived, not stored: `CB-<TIER>-<dodo_payment_id>`. "Verifying"
 * one just means parsing it back apart and asking Dodo whether that payment
 * ID actually succeeded (see checkout/verify.ts). No database involved.
 */

export type LicenseTier = 'CAL' | 'TWOHOME';

export function buildLicenseKey(tier: LicenseTier, paymentId: string): string {
	return `CB-${tier}-${paymentId}`;
}

export function parseLicenseKey(key: string): { tier: LicenseTier; paymentId: string } | null {
	const match = /^CB-(CAL|TWOHOME)-(.+)$/.exec(key.trim());
	if (!match) return null;
	return { tier: match[1] as LicenseTier, paymentId: match[2] };
}
