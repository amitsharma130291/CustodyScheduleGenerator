export type CaliforniaChildCount = 1 | 2 | 3 | 4 | 5 | 6;

export interface CaliforniaChildSupportInput {
	netIncomeA: number;
	netIncomeB: number;
	numberOfChildren: CaliforniaChildCount;
	/** Parent B's overnights per year (0–365). Used to compute Parent B's timeshare. */
	parentBOvernights: number;
	/** Monthly childcare (work/education-related add-on, § 4062). */
	monthlyChildcare?: number;
	/** Monthly uninsured healthcare costs (add-on, § 4062). */
	monthlyUninsuredHealthcare?: number;
}

export interface CaliforniaChildSupportResult {
	netIncomeA: number;
	netIncomeB: number;
	totalNet: number;
	highEarnerNet: number;
	highEarnerIsParentB: boolean;
	highEarnerTimesharePct: number;
	kFactor: number;
	childFactor: number;
	baseSupport: number;
	adjustedSupport: number;
	/** Parent B's share of childcare add-on. */
	parentBChildcare: number;
	/** Each parent's share of uninsured healthcare (split 50/50). */
	uninsuredHealthcareEach: number;
	totalMonthlySupport: number;
	/** Who pays whom. */
	payerIsParentB: boolean;
	timeshareEffect: string;
	formula: string;
}

function clampChildren(n: number): CaliforniaChildCount {
	return Math.max(1, Math.min(6, Math.floor(n))) as CaliforniaChildCount;
}

function roundCurrency(value: number): number {
	return Math.round(value * 100) / 100;
}

function assertValidAmount(value: number, label: string): void {
	if (!Number.isFinite(value)) throw new Error(`${label} must be a valid number.`);
	if (value < 0) throw new Error(`${label} must be zero or greater.`);
}

/**
 * California K factor (simplified from Family Code § 4055(b)(3)).
 * Actual software uses a more complex lookup; this is the best published approximation.
 */
export function getCaliforniaKFactor(totalNet: number): number {
	if (totalNet < 3000) return 0.25;
	if (totalNet < 6000) return 0.24;
	if (totalNet < 10000) return 0.22;
	return 0.20;
}

/**
 * California child factor (multiplier for additional children, § 4055(b)(4) simplified).
 */
export function getCaliforniaChildFactor(numberOfChildren: CaliforniaChildCount): number {
	const FACTORS: Record<CaliforniaChildCount, number> = {
		1: 1.0,
		2: 1.6,
		3: 2.0,
		4: 2.3,
		5: 2.5,
		6: 2.5,
	};
	return FACTORS[numberOfChildren];
}

/**
 * California Uniform Guideline formula (simplified — Family Code § 4055):
 *   CS = K × (HN − H% × TN) × childFactor
 *
 * Where:
 *   K   = combined K factor
 *   HN  = high earner's net monthly disposable income
 *   H%  = high earner's time with children (as a decimal)
 *   TN  = total net monthly disposable income
 */
export function calculateCaliforniaChildSupport(input: CaliforniaChildSupportInput): CaliforniaChildSupportResult {
	const {
		netIncomeA,
		netIncomeB,
		numberOfChildren,
		parentBOvernights,
		monthlyChildcare = 0,
		monthlyUninsuredHealthcare = 0,
	} = input;

	assertValidAmount(netIncomeA, 'Parent A net monthly income');
	assertValidAmount(netIncomeB, 'Parent B net monthly income');
	assertValidAmount(monthlyChildcare, 'Monthly childcare');
	assertValidAmount(monthlyUninsuredHealthcare, 'Monthly uninsured healthcare');
	if (!Number.isFinite(parentBOvernights) || parentBOvernights < 0 || parentBOvernights > 365) {
		throw new Error('Parent B overnights must be between 0 and 365.');
	}

	const clampedChildren = clampChildren(numberOfChildren);
	const totalNet = roundCurrency(netIncomeA + netIncomeB);

	// Determine high earner
	const highEarnerIsParentB = netIncomeB >= netIncomeA;
	const highEarnerNet = highEarnerIsParentB ? netIncomeB : netIncomeA;

	// High earner's timeshare % (their fraction of time WITH the children)
	// If Parent B is the high earner, their timeshare is their overnights / 365
	// If Parent A is the high earner, their timeshare is (365 - parentBOvernights) / 365
	const highEarnerTimeshare = highEarnerIsParentB
		? parentBOvernights / 365
		: (365 - parentBOvernights) / 365;
	const highEarnerTimesharePct = roundCurrency(highEarnerTimeshare * 100);

	const kFactor = getCaliforniaKFactor(totalNet);
	const childFactor = getCaliforniaChildFactor(clampedChildren);

	// Base support (for 1 child equivalent)
	const rawBase = kFactor * (highEarnerNet - highEarnerTimeshare * totalNet);
	const baseSupport = roundCurrency(Math.max(rawBase, 0));

	// Adjusted for number of children
	const adjustedSupport = roundCurrency(baseSupport * childFactor);

	// Add-ons (§ 4062)
	// Childcare: split by income proportionally — use Parent B's share if B is the one paying
	const parentBIncomePct = totalNet > 0 ? netIncomeB / totalNet : 0;
	const parentBChildcare = roundCurrency(monthlyChildcare * parentBIncomePct);

	// Uninsured healthcare: 50/50 split
	const uninsuredHealthcareEach = roundCurrency(monthlyUninsuredHealthcare / 2);

	// Total monthly support (guideline + childcare add-on for the paying parent)
	// The high earner pays the low earner — include their proportional childcare add-on
	const totalMonthlySupport = roundCurrency(adjustedSupport + parentBChildcare);

	// High earner pays low earner
	// If Parent B is the high earner, Parent B pays Parent A (payerIsParentB = true)
	const payerIsParentB = highEarnerIsParentB;

	// Timeshare sensitivity note
	const currentPct = Math.round(highEarnerTimesharePct);
	const altPct = currentPct + 7;
	const altTimeshare = altPct / 100;
	const altRaw = kFactor * (highEarnerNet - altTimeshare * totalNet);
	const altSupport = roundCurrency(Math.max(altRaw, 0) * childFactor);
	const diff = roundCurrency(adjustedSupport - altSupport);
	const timeshareEffect = diff > 0
		? `Increasing the high earner's time from ${currentPct}% to ${altPct}% changes this estimate by approximately ${formatCaliforniaCurrency(diff)}/month`
		: `At current timeshare, increasing parenting time has a small effect on this estimate`;

	const formula = [
		`K factor: ${kFactor}`,
		`High earner net: ${formatCaliforniaCurrency(highEarnerNet)}`,
		`High earner timeshare: ${highEarnerTimesharePct.toFixed(1)}%`,
		`Total net: ${formatCaliforniaCurrency(totalNet)}`,
		`Base (1 child): K × (HN − H% × TN) = ${formatCaliforniaCurrency(baseSupport)}`,
		clampedChildren > 1 ? `Child factor (${clampedChildren} children × ${childFactor}): ${formatCaliforniaCurrency(adjustedSupport)}` : null,
		monthlyChildcare > 0 ? `Childcare add-on (Parent B share): +${formatCaliforniaCurrency(parentBChildcare)}` : null,
		`Estimated monthly support: ${formatCaliforniaCurrency(totalMonthlySupport)}`,
	].filter(Boolean).join(' | ');

	return {
		netIncomeA, netIncomeB, totalNet,
		highEarnerNet, highEarnerIsParentB,
		highEarnerTimesharePct,
		kFactor, childFactor,
		baseSupport, adjustedSupport,
		parentBChildcare, uninsuredHealthcareEach,
		totalMonthlySupport, payerIsParentB,
		timeshareEffect, formula,
	};
}

export function formatCaliforniaCurrency(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatCaliforniaPercent(value: number): string {
	return `${value.toFixed(1)}%`;
}
