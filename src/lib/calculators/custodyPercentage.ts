export interface CustodyPercentageInput {
	parentAOvernights: number;
	parentBOvernights: number;
}

export interface CustodyPercentageResult {
	parentAPercentage: number;
	parentBPercentage: number;
	totalOvernights: number;
	interpretation: string;
}

function roundToOneDecimal(value: number) {
	return Math.round(value * 10) / 10;
}

function getSplitDescription(parentAPercentage: number, parentBPercentage: number) {
	const smallerPercentage = Math.min(parentAPercentage, parentBPercentage);

	if (smallerPercentage >= 45) return 'Split falls in the equal-time band (~182–183 overnights in a 365-day year).';
	if (smallerPercentage >= 35) return 'Split falls in the 60/40 parenting time band.';
	if (smallerPercentage >= 25) return 'Split falls in the 70/30 parenting time band.';
	return 'This is an uneven parenting time split.';
}

export function calculateCustodyPercentage({
	parentAOvernights,
	parentBOvernights,
}: CustodyPercentageInput): CustodyPercentageResult {
	if (!Number.isFinite(parentAOvernights) || !Number.isFinite(parentBOvernights)) {
		throw new Error('Overnight values must be valid numbers.');
	}

	if (parentAOvernights < 0 || parentBOvernights < 0) {
		throw new Error('Overnight values must be zero or greater.');
	}

	const totalOvernights = parentAOvernights + parentBOvernights;

	if (totalOvernights <= 0) {
		throw new Error('Total overnights must be greater than 0.');
	}

	const parentAPercentage = roundToOneDecimal((parentAOvernights / totalOvernights) * 100);
	const parentBPercentage = roundToOneDecimal((parentBOvernights / totalOvernights) * 100);

	return {
		parentAPercentage,
		parentBPercentage,
		totalOvernights,
		interpretation: `Parent A has ${parentAOvernights} overnights (${parentAPercentage.toFixed(1)}%). Parent B has ${parentBOvernights} overnights (${parentBPercentage.toFixed(1)}%). ${getSplitDescription(parentAPercentage, parentBPercentage)}`,
	};
}

export function formatCustodyPercentage(value: number) {
	return `${value.toFixed(1)}%`;
}

export function buildCustodyPercentageCopyText({
	parentAName,
	parentBName,
	parentAOvernights,
	parentBOvernights,
	result,
}: {
	parentAName: string;
	parentBName: string;
	parentAOvernights: number;
	parentBOvernights: number;
	result: CustodyPercentageResult;
}) {
	return [
		`${parentAName}: ${formatCustodyPercentage(result.parentAPercentage)} — ${parentAOvernights} overnights`,
		`${parentBName}: ${formatCustodyPercentage(result.parentBPercentage)} — ${parentBOvernights} overnights`,
		`Total overnights: ${result.totalOvernights}`,
	].join('\n');
}

export function buildVisitationPercentageInterpretation({
	parentAOvernights,
	parentBOvernights,
	result,
}: {
	parentAOvernights: number;
	parentBOvernights: number;
	result: CustodyPercentageResult;
}) {
	const smallerPercentage = Math.min(result.parentAPercentage, result.parentBPercentage);
	let visitationDescription = 'This arrangement reflects a substantial parenting time imbalance.';

	if (smallerPercentage >= 45) {
		visitationDescription = 'Actual split falls in the equal-time band for this tracking period.';
	} else if (smallerPercentage >= 35) {
		visitationDescription =
			'This arrangement gives one parent a majority of parenting time while maintaining significant contact with both parents.';
	} else if (smallerPercentage >= 25) {
		visitationDescription = 'This arrangement gives one parent primary parenting time.';
	}

	return `Parent A has ${parentAOvernights} overnights (${formatCustodyPercentage(result.parentAPercentage)}). Parent B has ${parentBOvernights} overnights (${formatCustodyPercentage(result.parentBPercentage)}). ${visitationDescription}`;
}
