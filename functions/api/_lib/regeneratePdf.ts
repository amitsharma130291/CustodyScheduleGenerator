/**
 * Server-side calendar PDF regeneration for the reactivation flow.
 *
 * Mirrors what the browser does in YearCalendarPanel.astro's script
 * (build a YearSchedule, apply important dates, hand it to
 * buildPremiumCalendarPdf) but runs entirely in the Worker so a customer who
 * lost their browser entitlement can get a fresh PDF by email without
 * re-entering anything. buildPremiumCalendarPdf itself has no DOM
 * dependency (only its browser-only download helpers do), so it runs fine
 * here.
 *
 * Metadata stored on the Dodo checkout session only covers the core fields
 * (schedule, start date, parent labels, pattern, child name) — important
 * dates live in the browser's sessionStorage during checkout and are never
 * sent to Dodo, so a regenerated PDF from metadata alone won't include them.
 * That's an acceptable gap for a "get my calendar back" recovery flow.
 */
import {
	defaultRatioSchedulePatterns,
	getAllSchedules,
	normalizeEightyTwentyPattern,
	normalizeScheduleType,
	normalizeSeventyThirtyPattern,
	normalizeSixtyFortyPattern,
	ratioSchedulePatternOptions,
} from '../../../src/lib/schedules';
import { generateYearSchedule } from '../../../src/lib/schedules/yearSchedule';
import { buildCalendarFilename, buildPremiumCalendarPdf } from '../../../src/lib/schedules/premiumPdfExport';

export interface CalendarMetadata {
	scheduleId?: unknown;
	startDate?: unknown;
	parentA?: unknown;
	parentB?: unknown;
	pattern?: unknown;
	childName?: unknown;
}

function asString(value: unknown): string {
	return typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '';
}

function normalizeRatioPattern(scheduleId: string, patternId: string): string {
	if (scheduleId === '80-20') return normalizeEightyTwentyPattern(patternId);
	if (scheduleId === '70-30') return normalizeSeventyThirtyPattern(patternId);
	if (scheduleId === '60-40') return normalizeSixtyFortyPattern(patternId);
	return '';
}

export interface RegeneratedPdf {
	bytes: Uint8Array;
	filename: string;
	scheduleName: string;
}

/** Returns null if the stored metadata isn't enough to rebuild a calendar. */
export async function regenerateCalendarPdfFromMetadata(metadata: CalendarMetadata): Promise<RegeneratedPdf | null> {
	const startDate = asString(metadata.startDate);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) return null;

	let scheduleId: string;
	try {
		scheduleId = normalizeScheduleType(asString(metadata.scheduleId));
	} catch {
		return null;
	}

	const definition = getAllSchedules().find((item) => item.id === scheduleId);
	if (!definition) return null;

	const parentA = asString(metadata.parentA) || 'Parent A';
	const parentB = asString(metadata.parentB) || 'Parent B';
	const childName = asString(metadata.childName) || undefined;

	const isRatioSchedule = scheduleId === '60-40' || scheduleId === '70-30' || scheduleId === '80-20';
	const rawPattern = asString(metadata.pattern) || defaultRatioSchedulePatterns[scheduleId as keyof typeof defaultRatioSchedulePatterns] || '';
	const selectedPattern = isRatioSchedule ? normalizeRatioPattern(scheduleId, rawPattern) : '';
	const patternLabel = isRatioSchedule
		? ratioSchedulePatternOptions[scheduleId as keyof typeof ratioSchedulePatternOptions]?.find((option) => option.id === selectedPattern)?.label
		: undefined;

	let yearSchedule;
	try {
		yearSchedule = generateYearSchedule({
			scheduleId,
			startDate,
			parentNames: { parentA, parentB },
			sixtyFortyPattern: scheduleId === '60-40' ? selectedPattern : undefined,
			seventyThirtyPattern: scheduleId === '70-30' ? selectedPattern : undefined,
			eightyTwentyPattern: scheduleId === '80-20' ? selectedPattern : undefined,
		});
	} catch {
		return null;
	}

	const pdfOptions = {
		yearSchedule,
		scheduleName: definition.name,
		scheduleDescription: definition.description,
		patternLabel,
		childName,
	};

	const bytes = await buildPremiumCalendarPdf(pdfOptions);
	return { bytes, filename: buildCalendarFilename(pdfOptions), scheduleName: definition.name };
}
