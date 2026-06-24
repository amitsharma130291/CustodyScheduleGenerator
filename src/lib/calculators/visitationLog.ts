export interface VisitationLogInput {
	plannedParentAOvernights: number;
	plannedParentBOvernights: number;
	actualParentAOvernights: number;
	actualParentBOvernights: number;
	missedVisitsParentA: number;
	missedVisitsParentB: number;
}

export interface VisitationLogResult {
	plannedParentAPct: number;
	plannedParentBPct: number;
	actualParentAPct: number;
	actualParentBPct: number;
	varianceParentA: number;
	varianceParentB: number;
	totalMissed: number;
	totalPlanned: number;
	totalActual: number;
	interpretation: string;
}

function roundToOneDecimal(value: number) {
	return Math.round(value * 10) / 10;
}

function pct(count: number, total: number) {
	if (total <= 0) return 0;
	return roundToOneDecimal((count / total) * 100);
}

export function calculateVisitationLog(input: VisitationLogInput): VisitationLogResult {
	const {
		plannedParentAOvernights,
		plannedParentBOvernights,
		actualParentAOvernights,
		actualParentBOvernights,
		missedVisitsParentA,
		missedVisitsParentB,
	} = input;

	const totalPlanned = plannedParentAOvernights + plannedParentBOvernights;
	const totalActual = actualParentAOvernights + actualParentBOvernights;
	const totalMissed = missedVisitsParentA + missedVisitsParentB;

	const plannedParentAPct = pct(plannedParentAOvernights, totalPlanned);
	const plannedParentBPct = pct(plannedParentBOvernights, totalPlanned);
	const actualParentAPct = pct(actualParentAOvernights, totalActual);
	const actualParentBPct = pct(actualParentBOvernights, totalActual);
	const varianceParentA = roundToOneDecimal(actualParentAOvernights - plannedParentAOvernights);
	const varianceParentB = roundToOneDecimal(actualParentBOvernights - plannedParentBOvernights);

	let interpretation = '';
	if (totalMissed > 0) {
		interpretation = `${totalMissed} missed visit${totalMissed === 1 ? '' : 's'} logged. `;
	}
	if (varianceParentA === 0 && varianceParentB === 0) {
		interpretation += 'Actual overnights match the planned split for this period.';
	} else {
		interpretation += `Parent A: ${varianceParentA >= 0 ? '+' : ''}${varianceParentA} overnights vs plan. Parent B: ${varianceParentB >= 0 ? '+' : ''}${varianceParentB} overnights vs plan.`;
	}

	return {
		plannedParentAPct,
		plannedParentBPct,
		actualParentAPct,
		actualParentBPct,
		varianceParentA,
		varianceParentB,
		totalMissed,
		totalPlanned,
		totalActual,
		interpretation,
	};
}

export function formatVisitationLogCopyText({
	parentAName,
	parentBName,
	periodLabel,
	input,
	result,
}: {
	parentAName: string;
	parentBName: string;
	periodLabel: string;
	input: VisitationLogInput;
	result: VisitationLogResult;
}) {
	return [
		`Visitation log — ${periodLabel}`,
		'',
		`Planned: ${parentAName} ${input.plannedParentAOvernights} / ${parentBName} ${input.plannedParentBOvernights} overnights`,
		`Actual: ${parentAName} ${input.actualParentAOvernights} / ${parentBName} ${input.actualParentBOvernights} overnights`,
		`Missed visits: ${parentAName} ${input.missedVisitsParentA}, ${parentBName} ${input.missedVisitsParentB}`,
		'',
		result.interpretation,
	].join('\n');
}
