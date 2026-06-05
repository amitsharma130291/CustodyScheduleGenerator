import { addDays, addMonths, format, isValid, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import {
	defaultRatioSchedulePatterns,
	generateVisibleMonthSchedule,
	getAllSchedules,
	normalizeEightyTwentyPattern,
	normalizeScheduleType,
	normalizeSeventyThirtyPattern,
	normalizeSixtyFortyPattern,
	ratioSchedulePatternOptions,
} from './index';
import type { ScheduleInputType, ScheduleResult, ScheduleType } from './types';

export type SchedulePdfRange = 'monthly' | 'yearly';

export interface SchedulePdfState {
	schedule: string;
	start: string;
	parentAName: string;
	parentBName: string;
	pattern?: string;
}

interface MonthExportData {
	label: string;
	date: Date;
	schedule: ScheduleResult;
}

const pageWidth = 612;
const pageHeight = 792;
const margin = 42;
const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function normalizeRatioPattern(scheduleId: ScheduleType, pattern?: string) {
	if (scheduleId === '80-20') return normalizeEightyTwentyPattern(pattern);
	if (scheduleId === '70-30') return normalizeSeventyThirtyPattern(pattern);
	if (scheduleId === '60-40') return normalizeSixtyFortyPattern(pattern);
	return undefined;
}

function getPatternLabel(scheduleId: ScheduleType, pattern?: string) {
	if (scheduleId !== '60-40' && scheduleId !== '70-30' && scheduleId !== '80-20') {
		return 'Default pattern';
	}

	const normalizedPattern = normalizeRatioPattern(scheduleId, pattern) ?? defaultRatioSchedulePatterns[scheduleId];
	return ratioSchedulePatternOptions[scheduleId].find((option) => option.id === normalizedPattern)?.label ?? normalizedPattern;
}

function getMonthExportData({
	scheduleId,
	startDate,
	monthDate,
	parentAName,
	parentBName,
	pattern,
}: {
	scheduleId: ScheduleType;
	startDate: string;
	monthDate: Date;
	parentAName: string;
	parentBName: string;
	pattern?: string;
}): MonthExportData {
	const normalizedPattern = normalizeRatioPattern(scheduleId, pattern);
	const schedule = generateVisibleMonthSchedule({
		scheduleType: scheduleId,
		startDate,
		monthDate,
		parentAName,
		parentBName,
		sixtyFortyPattern: scheduleId === '60-40' ? normalizedPattern : undefined,
		seventyThirtyPattern: scheduleId === '70-30' ? normalizedPattern : undefined,
		eightyTwentyPattern: scheduleId === '80-20' ? normalizedPattern : undefined,
	});

	return {
		label: format(monthDate, 'MMMM yyyy'),
		date: monthDate,
		schedule,
	};
}

function drawText(page: ReturnType<PDFDocument['addPage']>, text: string, x: number, y: number, options: {
	font: Awaited<ReturnType<PDFDocument['embedFont']>>;
	size?: number;
	color?: ReturnType<typeof rgb>;
	maxWidth?: number;
	lineHeight?: number;
}) {
	const size = options.size ?? 10;
	const lineHeight = options.lineHeight ?? size + 4;
	const maxWidth = options.maxWidth;
	const words = text.split(/\s+/);
	const lines: string[] = [];
	let currentLine = '';

	for (const word of words) {
		const candidate = currentLine ? `${currentLine} ${word}` : word;
		if (maxWidth && options.font.widthOfTextAtSize(candidate, size) > maxWidth && currentLine) {
			lines.push(currentLine);
			currentLine = word;
		} else {
			currentLine = candidate;
		}
	}
	if (currentLine) lines.push(currentLine);

	lines.forEach((line, index) => {
		page.drawText(line, {
			x,
			y: y - index * lineHeight,
			size,
			font: options.font,
			color: options.color ?? rgb(0.08, 0.08, 0.08),
		});
	});

	return y - Math.max(lines.length - 1, 0) * lineHeight;
}

function drawMetadataRow(page: ReturnType<PDFDocument['addPage']>, label: string, value: string, x: number, y: number, fonts: {
	bold: Awaited<ReturnType<PDFDocument['embedFont']>>;
	regular: Awaited<ReturnType<PDFDocument['embedFont']>>;
}) {
	page.drawText(label, { x, y, size: 8, font: fonts.bold, color: rgb(0.35, 0.35, 0.35) });
	drawText(page, value, x, y - 13, {
		font: fonts.regular,
		size: 10,
		maxWidth: 235,
		lineHeight: 12,
	});
}

function drawCalendar(page: ReturnType<PDFDocument['addPage']>, month: MonthExportData, parentAName: string, parentBName: string, fonts: {
	bold: Awaited<ReturnType<PDFDocument['embedFont']>>;
	regular: Awaited<ReturnType<PDFDocument['embedFont']>>;
}) {
	const gridTop = 504;
	const gridLeft = margin;
	const cellWidth = (pageWidth - margin * 2) / 7;
	const cellHeight = 52;
	const monthStart = startOfMonth(month.date);
	const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const daysByDate = new Map(month.schedule.days.map((day) => [day.date, day]));

	weekdayLabels.forEach((label, index) => {
		page.drawText(label, {
			x: gridLeft + index * cellWidth + 4,
			y: gridTop + 11,
			size: 8,
			font: fonts.bold,
			color: rgb(0.32, 0.32, 0.32),
		});
	});

	for (let index = 0; index < 42; index += 1) {
		const day = addDays(gridStart, index);
		const date = format(day, 'yyyy-MM-dd');
		const generatedDay = daysByDate.get(date);
		const col = index % 7;
		const row = Math.floor(index / 7);
		const x = gridLeft + col * cellWidth;
		const y = gridTop - row * cellHeight - cellHeight;
		const isCurrentMonth = day.getMonth() === monthStart.getMonth() && Boolean(generatedDay);
		const isParentB = generatedDay?.parent === 'B';

		page.drawRectangle({
			x,
			y,
			width: cellWidth,
			height: cellHeight,
			borderColor: rgb(0.72, 0.72, 0.72),
			borderWidth: 0.6,
			color: isCurrentMonth ? (isParentB ? rgb(0.9, 0.9, 0.9) : rgb(0.98, 0.98, 0.98)) : rgb(1, 1, 1),
		});

		page.drawText(format(day, 'd'), {
			x: x + 5,
			y: y + cellHeight - 13,
			size: 9,
			font: fonts.bold,
			color: isCurrentMonth ? rgb(0.06, 0.06, 0.06) : rgb(0.65, 0.65, 0.65),
		});

		if (isCurrentMonth && generatedDay) {
			const parentLabel = isParentB ? 'B' : 'A';
			const parentName = isParentB ? parentBName : parentAName;
			page.drawText(parentLabel, {
				x: x + 5,
				y: y + 20,
				size: 15,
				font: fonts.bold,
				color: rgb(0.08, 0.08, 0.08),
			});
			drawText(page, parentName, x + 22, y + 21, {
				font: fonts.regular,
				size: 7,
				maxWidth: cellWidth - 27,
				lineHeight: 8,
				color: rgb(0.22, 0.22, 0.22),
			});
		}
	}
}

async function drawMonthPage(pdfDoc: PDFDocument, month: MonthExportData, state: SchedulePdfState, details: {
	scheduleName: string;
	patternLabel: string;
	range: SchedulePdfRange;
	fonts: {
		bold: Awaited<ReturnType<PDFDocument['embedFont']>>;
		regular: Awaited<ReturnType<PDFDocument['embedFont']>>;
	};
}) {
	const page = pdfDoc.addPage([pageWidth, pageHeight]);
	const { fonts } = details;
	const summary = month.schedule.summary;

	page.drawText('Custody Schedule', {
		x: margin,
		y: 742,
		size: 22,
		font: fonts.bold,
		color: rgb(0.06, 0.06, 0.06),
	});
	page.drawText(details.range === 'yearly' ? `${month.label} section` : month.label, {
		x: margin,
		y: 717,
		size: 13,
		font: fonts.regular,
		color: rgb(0.24, 0.24, 0.24),
	});

	drawMetadataRow(page, 'SCHEDULE TYPE', details.scheduleName, margin, 683, fonts);
	drawMetadataRow(page, 'SELECTED PATTERN', details.patternLabel, 320, 683, fonts);
	drawMetadataRow(page, 'START DATE', state.start, margin, 645, fonts);
	drawMetadataRow(page, 'PARENTS', `${state.parentAName} / ${state.parentBName}`, 320, 645, fonts);

	page.drawLine({
		start: { x: margin, y: 618 },
		end: { x: pageWidth - margin, y: 618 },
		thickness: 0.7,
		color: rgb(0.78, 0.78, 0.78),
	});

	page.drawText(month.label, {
		x: margin,
		y: 584,
		size: 16,
		font: fonts.bold,
		color: rgb(0.08, 0.08, 0.08),
	});
	page.drawText('Calendar view', {
		x: margin,
		y: 564,
		size: 10,
		font: fonts.regular,
		color: rgb(0.35, 0.35, 0.35),
	});

	drawCalendar(page, month, state.parentAName, state.parentBName, fonts);

	const summaryY = 150;
	page.drawRectangle({
		x: margin,
		y: summaryY - 42,
		width: pageWidth - margin * 2,
		height: 62,
		borderColor: rgb(0.72, 0.72, 0.72),
		borderWidth: 0.7,
		color: rgb(0.98, 0.98, 0.98),
	});
	page.drawText('Overnight counts and percentage split', {
		x: margin + 12,
		y: summaryY + 4,
		size: 11,
		font: fonts.bold,
		color: rgb(0.08, 0.08, 0.08),
	});
	page.drawText(`${state.parentAName}: ${summary.parentADays} overnights (${summary.parentAPercentage}%)`, {
		x: margin + 12,
		y: summaryY - 17,
		size: 10,
		font: fonts.regular,
		color: rgb(0.1, 0.1, 0.1),
	});
	page.drawText(`${state.parentBName}: ${summary.parentBDays} overnights (${summary.parentBPercentage}%)`, {
		x: 320,
		y: summaryY - 17,
		size: 10,
		font: fonts.regular,
		color: rgb(0.1, 0.1, 0.1),
	});

	page.drawText('Planning tool only. Not legal advice.', {
		x: margin,
		y: 62,
		size: 9,
		font: fonts.bold,
		color: rgb(0.35, 0.35, 0.35),
	});
}

function downloadBytes(bytes: Uint8Array, filename: string) {
	const blob = new Blob([bytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadSchedulePdf(range: SchedulePdfRange, state: SchedulePdfState) {
	const scheduleId = normalizeScheduleType(state.schedule) as ScheduleInputType;
	const normalizedScheduleId = scheduleId as ScheduleType;
	const startDate = parseISO(state.start);

	if (!isValid(startDate)) {
		throw new Error('A valid start date is required to export a PDF.');
	}

	const definition = getAllSchedules().find((item) => item.id === normalizedScheduleId);
	if (!definition) {
		throw new Error(`Unknown schedule type: ${state.schedule}`);
	}

	const pdfDoc = await PDFDocument.create();
	const fonts = {
		regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
		bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
	};
	const patternLabel = getPatternLabel(normalizedScheduleId, state.pattern);
	const monthCount = range === 'yearly' ? 12 : 1;
	const months = Array.from({ length: monthCount }, (_, index) => getMonthExportData({
		scheduleId: normalizedScheduleId,
		startDate: state.start,
		monthDate: addMonths(startDate, index),
		parentAName: state.parentAName,
		parentBName: state.parentBName,
		pattern: state.pattern,
	}));

	for (const month of months) {
		await drawMonthPage(pdfDoc, month, state, {
			scheduleName: definition.name,
			patternLabel,
			range,
			fonts,
		});
	}

	const bytes = await pdfDoc.save();
	downloadBytes(bytes, range === 'yearly' ? 'custody-schedule-yearly.pdf' : 'custody-schedule-monthly.pdf');
}
