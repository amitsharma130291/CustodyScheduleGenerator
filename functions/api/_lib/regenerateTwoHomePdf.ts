/**
 * Server-side Two-Home Transition Pack PDF regeneration — the two-home
 * counterpart to regeneratePdf.ts's calendar regenerator, used by the
 * payment webhook to deliver the real PDF without needing the customer's
 * browser. generateTransitionPlan and buildTransitionPdf are both already
 * documented as DOM-free and Worker-safe (see src/lib/twoHome/generatePlan.ts);
 * only buildTransitionPdf's sibling downloadTransitionBytes touches the DOM,
 * and this never calls that.
 *
 * Unlike the calendar (which needs a schedule + start date to mean
 * anything), the transition plan generator already has a graceful
 * minimal-data fallback for an empty questionnaire, so this never needs to
 * return null the way regenerateCalendarPdfFromMetadata does.
 */
import { generateTransitionPlan, type TwoHomeAnswers } from '../../../src/lib/twoHome/generatePlan';
import { buildTransitionFilename, buildTransitionPdf } from '../../../src/lib/twoHome/transitionPdfExport';

export interface RegeneratedTwoHomePdf {
	bytes: Uint8Array;
	filename: string;
}

function asString(value: unknown): string | undefined {
	return typeof value === 'string' && value ? value : undefined;
}

export async function regenerateTwoHomePdfFromMetadata(metadata: Record<string, unknown>): Promise<RegeneratedTwoHomePdf> {
	const answers: TwoHomeAnswers = {
		childName: asString(metadata.childName),
		childAgeRange: asString(metadata.childAgeRange),
		homeOneLabel: asString(metadata.homeOneLabel),
		homeTwoLabel: asString(metadata.homeTwoLabel),
		transitionFrequency: asString(metadata.transitionFrequency),
		schoolDays: asString(metadata.schoolDays),
		schoolUniform: asString(metadata.schoolUniform),
		schoolDevice: asString(metadata.schoolDevice),
		activities: asString(metadata.activities),
		electronics: asString(metadata.electronics),
		glasses: asString(metadata.glasses),
		comfortItem: asString(metadata.comfortItem),
		clothingStocked: asString(metadata.clothingStocked),
		customItems: asString(metadata.customItems),
		packingDifficulty: asString(metadata.packingDifficulty),
	};

	const plan = generateTransitionPlan(answers);
	const bytes = await buildTransitionPdf(plan);
	return { bytes, filename: buildTransitionFilename(plan) };
}
