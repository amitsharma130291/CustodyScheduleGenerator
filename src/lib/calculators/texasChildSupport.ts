export type TexasChildrenBeforeCourt = 1 | 2 | 3 | 4 | 5 | 6;

export interface TexasChildSupportInput {
	grossIncome: number;
	childrenBeforeCourt: TexasChildrenBeforeCourt;
	otherChildrenSupported: number;
	monthlyUnionDues?: number;
	monthlyHealthDentalInsurance?: number;
	doesNotPaySocialSecurity?: boolean;
	monthlyMandatoryRetirement?: number;
}

export interface TexasChildSupportResult {
	grossIncome: number;
	deductions: TexasChildSupportDeductionBreakdown;
	totalDeductions: number;
	netResourcesBeforeCap: number;
	/** Net resources used for the guideline percentage (after cap, if applicable). */
	guidelineResourcesUsed: number;
	netResources: number;
	netResourcesCap: number | null;
	isCapApplied: boolean;
	guidelinePercentage: number;
	monthlySupport: number;
	isLowIncome: boolean;
	hasOtherChildrenAdjustment: boolean;
	otherChildrenAdjustmentLabel: string;
	advancedDeductionsUsed: string[];
	formula: string;
	plainEnglishFormula: string;
}

export interface TexasChildSupportDeductionBreakdown {
	socialSecurityTax: number;
	medicareTax: number;
	estimatedFederalIncomeTax: number;
	monthlyUnionDues: number;
	monthlyHealthDentalInsurance: number;
	monthlyMandatoryRetirement: number;
}

const STANDARD_GUIDELINE_PERCENTAGES: Record<TexasChildrenBeforeCourt, number> = {
	1: 20,
	2: 25,
	3: 30,
	4: 35,
	5: 40,
	6: 40,
};

const LOW_INCOME_PERCENTAGES: Record<TexasChildrenBeforeCourt, number> = {
	1: 15,
	2: 20,
	3: 25,
	4: 30,
	5: 35,
	6: 35,
};

const OTHER_CHILDREN_PERCENTAGES: Record<number, Record<number, number>> = {
	1: {
		1: 17.5,
		2: 16,
		3: 14.75,
	},
	2: {
		1: 22.5,
		2: 20.63,
		3: 19,
	},
	3: {
		1: 27.38,
		2: 25.2,
		3: 23.14,
	},
	4: {
		1: 32.2,
		2: 29.75,
	},
	5: {
		1: 37.33,
	},
};

const SOCIAL_SECURITY_TAX_RATE = 0.062;
const MEDICARE_TAX_RATE = 0.0145;
const FEDERAL_STANDARD_DEDUCTION_SINGLE = 15000;

// Texas Family Code guideline net resources cap — effective September 1, 2025 ($11,700/month).
export const TEXAS_MONTHLY_NET_RESOURCES_CAP_AMOUNT = 11700;
export const TEXAS_MONTHLY_NET_RESOURCES_CAP: number | null = TEXAS_MONTHLY_NET_RESOURCES_CAP_AMOUNT;

const FEDERAL_TAX_BRACKETS_SINGLE = [
	{ upTo: 11925, rate: 0.1 },
	{ upTo: 48475, rate: 0.12 },
	{ upTo: 103350, rate: 0.22 },
	{ upTo: 197300, rate: 0.24 },
	{ upTo: 250525, rate: 0.32 },
	{ upTo: 626350, rate: 0.35 },
	{ upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
];

function assertValidAmount(value: number, label: string) {
	if (!Number.isFinite(value)) {
		throw new Error(`${label} must be a valid number.`);
	}

	if (value < 0) {
		throw new Error(`${label} must be zero or greater.`);
	}
}

function normalizeOtherChildren(value: number) {
	if (!Number.isFinite(value)) {
		throw new Error('Other children supported must be a valid number.');
	}

	if (value < 0) {
		throw new Error('Other children supported must be zero or greater.');
	}

	return Math.floor(value);
}

function normalizeChildrenBeforeCourt(value: number): TexasChildrenBeforeCourt {
	if (!Number.isFinite(value)) {
		throw new Error('Children before the court must be a valid number.');
	}

	if (value < 1) {
		throw new Error('Children before the court must be at least 1.');
	}

	return Math.min(Math.floor(value), 6) as TexasChildrenBeforeCourt;
}

function roundCurrency(value: number) {
	return Math.round(value * 100) / 100;
}

export function estimateFederalIncomeTax(grossMonthlyIncome: number) {
	assertValidAmount(grossMonthlyIncome, 'Monthly gross income');

	const annualTaxableIncome = Math.max(grossMonthlyIncome * 12 - FEDERAL_STANDARD_DEDUCTION_SINGLE, 0);
	let remainingIncome = annualTaxableIncome;
	let previousBracketLimit = 0;
	let annualTax = 0;

	for (const bracket of FEDERAL_TAX_BRACKETS_SINGLE) {
		if (remainingIncome <= 0) break;

		const taxableInBracket = Math.min(remainingIncome, bracket.upTo - previousBracketLimit);
		annualTax += taxableInBracket * bracket.rate;
		remainingIncome -= taxableInBracket;
		previousBracketLimit = bracket.upTo;
	}

	return roundCurrency(annualTax / 12);
}

function getMultipleFamilyPercentage(
	childrenBeforeCourt: TexasChildrenBeforeCourt,
	otherChildrenSupported: number,
) {
	const adjustmentTable = OTHER_CHILDREN_PERCENTAGES[childrenBeforeCourt];

	if (!adjustmentTable) return STANDARD_GUIDELINE_PERCENTAGES[childrenBeforeCourt];

	const availableOtherChildrenCounts = Object.keys(adjustmentTable)
		.map(Number)
		.sort((first, second) => first - second);
	const clampedOtherChildrenCount =
		availableOtherChildrenCounts.findLast((count) => otherChildrenSupported >= count) ??
		availableOtherChildrenCounts[0];

	return adjustmentTable[clampedOtherChildrenCount] ?? STANDARD_GUIDELINE_PERCENTAGES[childrenBeforeCourt];
}

export function getTexasChildSupportPercentage({
	childrenBeforeCourt,
	otherChildrenSupported,
	netResources,
}: {
	childrenBeforeCourt: TexasChildrenBeforeCourt;
	otherChildrenSupported: number;
	netResources: number;
}) {
	if (otherChildrenSupported === 0 && netResources < 1000) {
		return LOW_INCOME_PERCENTAGES[childrenBeforeCourt];
	}

	if (otherChildrenSupported > 0) {
		return getMultipleFamilyPercentage(childrenBeforeCourt, otherChildrenSupported);
	}

	return STANDARD_GUIDELINE_PERCENTAGES[childrenBeforeCourt];
}

export function buildTexasChildSupportFormula({
	netResources,
	guidelinePercentage,
	monthlySupport,
}: {
	netResources: number;
	guidelinePercentage: number;
	monthlySupport: number;
}) {
	return (
		`${formatTexasCurrency(netResources)} x ${formatTexasPercentage(guidelinePercentage)} = ` +
		formatTexasCurrency(monthlySupport)
	);
}

function buildPlainEnglishFormula({
	grossIncome,
	totalDeductions,
	netResourcesBeforeCap,
	guidelineResourcesUsed,
	guidelinePercentage,
	isCapApplied,
	isLowIncome,
	hasOtherChildrenAdjustment,
}: {
	grossIncome: number;
	totalDeductions: number;
	netResourcesBeforeCap: number;
	guidelineResourcesUsed: number;
	guidelinePercentage: number;
	isCapApplied: boolean;
	isLowIncome: boolean;
	hasOtherChildrenAdjustment: boolean;
}) {
	const notes = [
		`Start with ${formatTexasCurrency(grossIncome)} gross monthly income.`,
		`Subtract estimated taxes and allowed advanced deductions of ${formatTexasCurrency(totalDeductions)}.`,
	];

	if (isCapApplied) {
		notes.push(
			`Estimated net resources are ${formatTexasCurrency(netResourcesBeforeCap)}, but guideline percentages apply to ${formatTexasCurrency(guidelineResourcesUsed)} because of the monthly net resources cap.`,
		);
	} else {
		notes.push(
			`Apply ${formatTexasPercentage(guidelinePercentage)} to estimated net resources of ${formatTexasCurrency(guidelineResourcesUsed)}.`,
		);
	}

	if (hasOtherChildrenAdjustment) {
		notes.push('The percentage includes a multiple-family adjustment for other children supported.');
	}

	if (isLowIncome) {
		notes.push('The low-income guideline percentage is used because estimated net resources are under $1,000 and no other children were entered.');
	}

	return notes.join(' ');
}

export function calculateTexasChildSupport({
	grossIncome,
	childrenBeforeCourt,
	otherChildrenSupported,
	monthlyUnionDues = 0,
	monthlyHealthDentalInsurance = 0,
	doesNotPaySocialSecurity = false,
	monthlyMandatoryRetirement = 0,
}: TexasChildSupportInput): TexasChildSupportResult {
	assertValidAmount(grossIncome, 'Monthly gross income');
	assertValidAmount(monthlyUnionDues, 'Monthly union dues');
	assertValidAmount(monthlyHealthDentalInsurance, 'Monthly child health insurance / dental insurance');
	assertValidAmount(monthlyMandatoryRetirement, 'Monthly mandatory retirement contribution');

	const normalizedChildrenBeforeCourt = normalizeChildrenBeforeCourt(childrenBeforeCourt);
	const normalizedOtherChildren = normalizeOtherChildren(otherChildrenSupported);
	const deductions: TexasChildSupportDeductionBreakdown = {
		socialSecurityTax: doesNotPaySocialSecurity ? 0 : roundCurrency(grossIncome * SOCIAL_SECURITY_TAX_RATE),
		medicareTax: roundCurrency(grossIncome * MEDICARE_TAX_RATE),
		estimatedFederalIncomeTax: estimateFederalIncomeTax(grossIncome),
		monthlyUnionDues: roundCurrency(monthlyUnionDues),
		monthlyHealthDentalInsurance: roundCurrency(monthlyHealthDentalInsurance),
		monthlyMandatoryRetirement: doesNotPaySocialSecurity ? roundCurrency(monthlyMandatoryRetirement) : 0,
	};
	const totalDeductions = roundCurrency(
		deductions.socialSecurityTax +
			deductions.medicareTax +
			deductions.estimatedFederalIncomeTax +
			deductions.monthlyUnionDues +
			deductions.monthlyHealthDentalInsurance +
			deductions.monthlyMandatoryRetirement,
	);
	const netResourcesBeforeCap = roundCurrency(Math.max(grossIncome - totalDeductions, 0));
	const configuredNetResourcesCap = TEXAS_MONTHLY_NET_RESOURCES_CAP;
	const isCapApplied = configuredNetResourcesCap !== null && netResourcesBeforeCap > configuredNetResourcesCap;
	const guidelineResourcesUsed = isCapApplied ? configuredNetResourcesCap : netResourcesBeforeCap;
	const netResources = guidelineResourcesUsed;
	const guidelinePercentage = getTexasChildSupportPercentage({
		childrenBeforeCourt: normalizedChildrenBeforeCourt,
		otherChildrenSupported: normalizedOtherChildren,
		netResources: guidelineResourcesUsed,
	});
	const monthlySupport = roundCurrency(guidelineResourcesUsed * (guidelinePercentage / 100));
	const advancedDeductionsUsed = [
		deductions.monthlyUnionDues > 0 ? `Union dues: ${formatTexasCurrency(deductions.monthlyUnionDues)}` : '',
		deductions.monthlyHealthDentalInsurance > 0
			? `Child health/dental insurance: ${formatTexasCurrency(deductions.monthlyHealthDentalInsurance)}`
			: '',
		deductions.monthlyMandatoryRetirement > 0
			? `Mandatory retirement: ${formatTexasCurrency(deductions.monthlyMandatoryRetirement)}`
			: '',
	].filter(Boolean);
	const hasOtherChildrenAdjustment =
		normalizedOtherChildren > 0 && guidelinePercentage < STANDARD_GUIDELINE_PERCENTAGES[normalizedChildrenBeforeCourt];
	const isLowIncome = normalizedOtherChildren === 0 && netResources < 1000;
	const formula = buildTexasChildSupportFormula({
		netResources,
		guidelinePercentage,
		monthlySupport,
	});

	return {
		grossIncome,
		deductions,
		totalDeductions,
		netResourcesBeforeCap,
		guidelineResourcesUsed,
		netResources,
		netResourcesCap: TEXAS_MONTHLY_NET_RESOURCES_CAP,
		isCapApplied,
		guidelinePercentage,
		monthlySupport,
		isLowIncome,
		hasOtherChildrenAdjustment,
		otherChildrenAdjustmentLabel: hasOtherChildrenAdjustment
			? `${formatTexasPercentage(STANDARD_GUIDELINE_PERCENTAGES[normalizedChildrenBeforeCourt])} standard guideline reduced to ${formatTexasPercentage(guidelinePercentage)} for ${normalizedOtherChildren} other ${normalizedOtherChildren === 1 ? 'child' : 'children'} supported.`
			: normalizedOtherChildren > 0
				? 'No lower multiple-family adjustment was available for this combination, so the standard guideline percentage was used.'
				: 'No other-children adjustment applied.',
		advancedDeductionsUsed,
		formula,
		plainEnglishFormula: buildPlainEnglishFormula({
			grossIncome,
			totalDeductions,
			netResourcesBeforeCap,
			guidelineResourcesUsed,
			guidelinePercentage,
			isCapApplied,
			isLowIncome,
			hasOtherChildrenAdjustment,
		}),
	};
}

export function formatTexasCurrency(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatTexasPercentage(value: number) {
	return `${Number.isInteger(value) ? value.toFixed(0) : value.toString()}%`;
}
