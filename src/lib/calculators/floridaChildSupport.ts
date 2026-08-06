export type FloridaChildCount = 1 | 2 | 3 | 4 | 5 | 6;

export interface FloridaChildSupportInput {
	netIncomeA: number;
	netIncomeB: number;
	numberOfChildren: FloridaChildCount;
	/** Parent B overnights per year (out of 365). */
	parentBOvernights: number;
	/** Monthly childcare costs for the children (optional). */
	monthlyChildcare?: number;
	/** Monthly health insurance premium for children only (optional). */
	monthlyHealthInsurance?: number;
}

export interface FloridaChildSupportResult {
	netIncomeA: number;
	netIncomeB: number;
	combinedIncome: number;
	parentBSharePct: number;
	basicObligation: number;
	parentBBaseObligation: number;
	parentBChildcare: number;
	parentBHealthInsurance: number;
	overnightCredit: number;
	overnightCreditType: 'none' | 'standard' | 'extended';
	supportBeforeMinimum: number;
	minimumApplied: boolean;
	monthlySupport: number;
	formula: string;
}

// ─── Florida Basic Obligation Schedule (Rule 12.902(e) approximations) ─────
// Table: combined monthly NET income → [1-child, 2-children, 3-children, 4-children, 5-children, 6-children]
// Values extrapolated/extended from the statutory schedule. Linear interpolation used between rows.
const FL_SCHEDULE: Array<[number, number, number, number, number, number, number]> = [
	//  income   1ch     2ch     3ch     4ch     5ch     6ch
	[800,    170,    247,    285,    319,    347,    370],
	[1200,   253,    368,    424,    475,    516,    551],
	[1600,   336,    489,    562,    630,    685,    731],
	[2000,   402,    585,    673,    753,    819,    874],
	[2500,   493,    717,    825,    924,   1004,   1072],
	[3000,   584,    849,    977,   1095,   1190,   1270],
	[4000,   756,   1099,   1265,   1416,   1540,   1643],
	[5000,   928,   1349,   1553,   1738,   1890,   2016],
	[6000,  1081,   1572,   1810,   2027,   2204,   2352],
	[8000,  1317,   1915,   2204,   2468,   2684,   2865],
	[10000, 1502,   2185,   2514,   2815,   3061,   3267],
	[12000, 1651,   2400,   2762,   3092,   3362,   3587],
	[15000, 1820,   2648,   3048,   3413,   3711,   3961],
	[20000, 2060,   2998,   3451,   3865,   4202,   4484],
	[25000, 2220,   3230,   3718,   4162,   4526,   4831],
];

const FLORIDA_MINIMUM_SUPPORT_PER_CHILD = 50;

function clampChildren(n: number): FloridaChildCount {
	return Math.max(1, Math.min(6, Math.floor(n))) as FloridaChildCount;
}

function roundCurrency(value: number): number {
	return Math.round(value * 100) / 100;
}

function assertValidAmount(value: number, label: string): void {
	if (!Number.isFinite(value)) throw new Error(`${label} must be a valid number.`);
	if (value < 0) throw new Error(`${label} must be zero or greater.`);
}

/**
 * Look up the basic obligation from the FL schedule using linear interpolation.
 * Returns the basic monthly obligation before apportionment.
 */
export function getFloridaBasicObligation(combinedIncome: number, numberOfChildren: FloridaChildCount): number {
	const colIndex = numberOfChildren - 1; // 0-based column index into schedule

	// Below minimum row: scale from $0 at $0 income
	if (combinedIncome <= FL_SCHEDULE[0][0]) {
		const ratio = combinedIncome / FL_SCHEDULE[0][0];
		return roundCurrency(FL_SCHEDULE[0][colIndex + 1] * ratio);
	}

	// Above maximum row: use highest row (courts may deviate above cap; approximation)
	if (combinedIncome >= FL_SCHEDULE[FL_SCHEDULE.length - 1][0]) {
		return FL_SCHEDULE[FL_SCHEDULE.length - 1][colIndex + 1];
	}

	// Linear interpolation between two rows
	for (let i = 0; i < FL_SCHEDULE.length - 1; i++) {
		const [low, ...lowVals] = FL_SCHEDULE[i];
		const [high, ...highVals] = FL_SCHEDULE[i + 1];
		if (combinedIncome >= low && combinedIncome <= high) {
			const t = (combinedIncome - low) / (high - low);
			return roundCurrency(lowVals[colIndex] + t * (highVals[colIndex] - lowVals[colIndex]));
		}
	}

	return 0;
}

export function calculateFloridaChildSupport(input: FloridaChildSupportInput): FloridaChildSupportResult {
	const {
		netIncomeA,
		netIncomeB,
		numberOfChildren,
		parentBOvernights,
		monthlyChildcare = 0,
		monthlyHealthInsurance = 0,
	} = input;

	assertValidAmount(netIncomeA, 'Parent A net monthly income');
	assertValidAmount(netIncomeB, 'Parent B net monthly income');
	assertValidAmount(monthlyChildcare, 'Monthly childcare');
	assertValidAmount(monthlyHealthInsurance, 'Monthly health insurance');
	if (!Number.isFinite(parentBOvernights) || parentBOvernights < 0 || parentBOvernights > 365) {
		throw new Error('Parent B overnights must be between 0 and 365.');
	}

	const clampedChildren = clampChildren(numberOfChildren);
	const combinedIncome = roundCurrency(netIncomeA + netIncomeB);

	if (combinedIncome === 0) {
		// Both parents have $0 income — apply minimum
		const monthlySupport = FLORIDA_MINIMUM_SUPPORT_PER_CHILD * clampedChildren;
		return {
			netIncomeA, netIncomeB, combinedIncome: 0, parentBSharePct: 0,
			basicObligation: 0, parentBBaseObligation: 0,
			parentBChildcare: 0, parentBHealthInsurance: 0,
			overnightCredit: 0, overnightCreditType: 'none',
			supportBeforeMinimum: 0, minimumApplied: true,
			monthlySupport,
			formula: `Minimum support: $${FLORIDA_MINIMUM_SUPPORT_PER_CHILD}/child × ${clampedChildren} = $${monthlySupport}`,
		};
	}

	const parentBSharePct = roundCurrency((netIncomeB / combinedIncome) * 100);
	const parentBShare = netIncomeB / combinedIncome;

	const basicObligation = getFloridaBasicObligation(combinedIncome, clampedChildren);
	const parentBBaseObligation = roundCurrency(basicObligation * parentBShare);

	// Add-ons (split proportionally by income share)
	const parentBChildcare = roundCurrency(monthlyChildcare * parentBShare);
	const parentBHealthInsurance = roundCurrency(monthlyHealthInsurance * parentBShare);

	// Overnight credit (FL Rule 12.902(e))
	let overnightCredit = 0;
	let overnightCreditType: 'none' | 'standard' | 'extended' = 'none';
	if (parentBOvernights >= 110) {
		overnightCredit = roundCurrency(parentBBaseObligation * 0.50);
		overnightCreditType = 'extended';
	} else if (parentBOvernights >= 73) {
		overnightCredit = roundCurrency(parentBBaseObligation * 0.20);
		overnightCreditType = 'standard';
	}

	const supportBeforeMinimum = roundCurrency(
		parentBBaseObligation + parentBChildcare + parentBHealthInsurance - overnightCredit
	);

	const minimum = FLORIDA_MINIMUM_SUPPORT_PER_CHILD * clampedChildren;
	const minimumApplied = supportBeforeMinimum < minimum;
	const monthlySupport = roundCurrency(Math.max(supportBeforeMinimum, minimum));

	const formula = [
		`Combined net income: ${formatFloridaCurrency(combinedIncome)}`,
		`Basic obligation (${clampedChildren} child${clampedChildren > 1 ? 'ren' : ''}): ${formatFloridaCurrency(basicObligation)}`,
		`Parent B income share: ${parentBSharePct.toFixed(1)}%`,
		`Parent B base obligation: ${formatFloridaCurrency(parentBBaseObligation)}`,
		overnightCredit > 0
			? `Overnight credit (${overnightCreditType === 'extended' ? '50%' : '20%'} for ${parentBOvernights} nights): -${formatFloridaCurrency(overnightCredit)}`
			: null,
		monthlyChildcare > 0 ? `Childcare add-on (Parent B share): +${formatFloridaCurrency(parentBChildcare)}` : null,
		monthlyHealthInsurance > 0 ? `Health insurance add-on (Parent B share): +${formatFloridaCurrency(parentBHealthInsurance)}` : null,
		minimumApplied ? `Minimum applied: $${minimum}/month` : null,
		`Estimated monthly support: ${formatFloridaCurrency(monthlySupport)}`,
	].filter(Boolean).join(' | ');

	return {
		netIncomeA, netIncomeB, combinedIncome,
		parentBSharePct, basicObligation, parentBBaseObligation,
		parentBChildcare, parentBHealthInsurance,
		overnightCredit, overnightCreditType,
		supportBeforeMinimum, minimumApplied,
		monthlySupport, formula,
	};
}

export function formatFloridaCurrency(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatFloridaPercent(value: number): string {
	return `${value.toFixed(1)}%`;
}
