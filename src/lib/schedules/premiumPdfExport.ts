import { format, parseISO } from 'date-fns';
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { ImportantDateInput } from './personalization';
import type { GeneratedDay } from './types';
import type { YearSchedule } from './yearSchedule';

export type ImportantDate = ImportantDateInput;

export interface PremiumPdfOptions {
	yearSchedule: YearSchedule;
	scheduleName: string;
	patternLabel?: string;
	scheduleDescription?: string;
	childName?: string;
	importantDates?: ImportantDate[];
}

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 48;
const PARENT_A_COLOR = rgb(0.145, 0.388, 0.922); // matches --cal-parent-a
const PARENT_A_SOFT = rgb(0.859, 0.918, 0.996);
const PARENT_B_COLOR = rgb(0.059, 0.463, 0.427); // matches --cal-parent-b
const PARENT_B_SOFT = rgb(0.8, 0.984, 0.965);
const INK = rgb(0.09, 0.09, 0.11);
const MUTED = rgb(0.42, 0.42, 0.46);
const LINE = rgb(0.82, 0.82, 0.85);
const AMBER = rgb(0.961, 0.62, 0.043); // matches the free tool's holiday-override amber (rgba(245,158,11,…))
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Fonts {
	regular: PDFFont;
	bold: PDFFont;
}

function wrapLines(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
	const words = text.split(/\s+/).filter(Boolean);
	const lines: string[] = [];
	let current = '';

	for (const word of words) {
		const candidate = current ? `${current} ${word}` : word;
		if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
			lines.push(current);
			current = word;
		} else {
			current = candidate;
		}
	}
	if (current) lines.push(current);
	return lines;
}

function drawText(
	page: PDFPage,
	text: string,
	x: number,
	y: number,
	options: { font: PDFFont; size?: number; color?: ReturnType<typeof rgb>; maxWidth?: number; lineHeight?: number },
): number {
	const size = options.size ?? 10;
	const lineHeight = options.lineHeight ?? size + 4;
	const lines = options.maxWidth ? wrapLines(text, options.font, size, options.maxWidth) : [text];

	lines.forEach((line, index) => {
		page.drawText(line, {
			x,
			y: y - index * lineHeight,
			size,
			font: options.font,
			color: options.color ?? INK,
		});
	});

	return y - lines.length * lineHeight;
}

function drawFooter(page: PDFPage, fonts: Fonts, pageLabel: string) {
	page.drawLine({
		start: { x: MARGIN, y: 54 },
		end: { x: PAGE_WIDTH - MARGIN, y: 54 },
		thickness: 0.6,
		color: LINE,
	});
	drawText(page, 'Educational planning tool. Not legal advice.', MARGIN, 40, { font: fonts.bold, size: 8, color: MUTED });
	const label = pageLabel;
	const width = fonts.regular.widthOfTextAtSize(label, 8);
	drawText(page, label, PAGE_WIDTH - MARGIN - width, 40, { font: fonts.regular, size: 8, color: MUTED });
}

function getFirstFullWeek(yearSchedule: YearSchedule): GeneratedDay[] {
	const scheduledDays = yearSchedule.months.flatMap((month) => month.days.filter((day) => day.isCurrentMonth));
	return scheduledDays.slice(0, 7);
}

// ---------------------------------------------------------------------------
// Page builders
// ---------------------------------------------------------------------------

function drawCoverPage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions) {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const { yearSchedule, scheduleName, patternLabel, childName } = options;

	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 210, width: PAGE_WIDTH, height: 210, color: PARENT_A_SOFT });
	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 8, width: PAGE_WIDTH, height: 8, color: PARENT_A_COLOR });

	drawText(page, 'MY CUSTODY CALENDAR', MARGIN, PAGE_HEIGHT - 90, { font: fonts.bold, size: 11, color: MUTED });

	const title = childName ? `${childName}'s Parenting Calendar` : 'My Parenting Calendar';
	drawText(page, title, MARGIN, PAGE_HEIGHT - 130, { font: fonts.bold, size: 30, color: INK, maxWidth: PAGE_WIDTH - MARGIN * 2, lineHeight: 34 });

	const rangeLabel = `${format(parseISO(yearSchedule.startDate), 'MMMM d, yyyy')} – ${format(parseISO(yearSchedule.endDate), 'MMMM d, yyyy')}`;
	drawText(page, rangeLabel, MARGIN, PAGE_HEIGHT - 185, { font: fonts.regular, size: 13, color: MUTED });

	let y = PAGE_HEIGHT - 280;
	const rows: Array<[string, string]> = [
		['Schedule', patternLabel ? `${scheduleName} — ${patternLabel}` : scheduleName],
		['Parents', `${yearSchedule.parentNames.parentA} & ${yearSchedule.parentNames.parentB}`],
		['Total days covered', `${yearSchedule.annualSummary.totalDays} days`],
		['Generated', format(new Date(), 'MMMM d, yyyy')],
	];
	for (const [label, value] of rows) {
		drawText(page, label.toUpperCase(), MARGIN, y, { font: fonts.bold, size: 9, color: MUTED });
		drawText(page, value, MARGIN, y - 16, { font: fonts.regular, size: 13, color: INK });
		y -= 46;
	}

	drawText(
		page,
		'This calendar is a planning and organizing tool. It reflects the schedule you entered and is not legal advice, a court order, or a recommendation about custody arrangements.',
		MARGIN,
		130,
		{ font: fonts.regular, size: 9, color: MUTED, maxWidth: PAGE_WIDTH - MARGIN * 2, lineHeight: 13 },
	);
}

function drawYearAtAGlancePage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions) {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const { yearSchedule } = options;

	drawText(page, 'Year at a Glance', MARGIN, PAGE_HEIGHT - 60, { font: fonts.bold, size: 20, color: INK });
	drawText(page, `${yearSchedule.startDate} – ${yearSchedule.endDate}`, MARGIN, PAGE_HEIGHT - 80, { font: fonts.regular, size: 10, color: MUTED });

	const columns = 4;
	const rows = 3;
	const gridTop = PAGE_HEIGHT - 112;
	const gridWidth = PAGE_WIDTH - MARGIN * 2;
	const cellGapX = 16;
	const cellGapY = 40;
	const daySpacing = 1.5;
	const labelAreaHeight = 20;
	const cellWidth = (gridWidth - cellGapX * (columns - 1)) / columns;
	const daySize = (cellWidth - 6 * daySpacing) / 7;
	// Reserve room for a 6-row month grid (up to 42 cells) so no month's
	// squares can spill into the row of mini-calendars below it — a real
	// bug when this used a fixed cellHeight sized for a 5-row month.
	const maxDayRows = 6;
	const dayGridHeight = maxDayRows * (daySize + daySpacing) - daySpacing;
	const cellHeight = labelAreaHeight + dayGridHeight;

	yearSchedule.months.forEach((month, index) => {
		const col = index % columns;
		const row = Math.floor(index / columns);
		const originX = MARGIN + col * (cellWidth + cellGapX);
		const originY = gridTop - row * (cellHeight + cellGapY);

		drawText(page, month.monthLabel, originX, originY, { font: fonts.bold, size: 10, color: INK });

		const gridStartY = originY - labelAreaHeight;
		month.days.forEach((day, dayIndex) => {
			const dayCol = dayIndex % 7;
			const dayRow = Math.floor(dayIndex / 7);
			const x = originX + dayCol * (daySize + daySpacing);
			const y = gridStartY - dayRow * (daySize + daySpacing) - daySize;
			const color = !day.isCurrentMonth ? rgb(0.93, 0.93, 0.94) : day.parent === 'parentA' ? PARENT_A_COLOR : PARENT_B_COLOR;
			page.drawRectangle({ x, y, width: daySize, height: daySize, color });
		});
	});

	const legendY = gridTop - rows * cellHeight - (rows - 1) * cellGapY - 28;
	page.drawRectangle({ x: MARGIN, y: legendY - 8, width: 10, height: 10, color: PARENT_A_COLOR });
	drawText(page, yearSchedule.parentNames.parentA, MARGIN + 16, legendY, { font: fonts.regular, size: 10, color: INK });
	const legendAWidth = fonts.regular.widthOfTextAtSize(yearSchedule.parentNames.parentA, 10);
	const legendBX = MARGIN + 16 + legendAWidth + 24;
	page.drawRectangle({ x: legendBX, y: legendY - 8, width: 10, height: 10, color: PARENT_B_COLOR });
	drawText(page, yearSchedule.parentNames.parentB, legendBX + 16, legendY, { font: fonts.regular, size: 10, color: INK });

	drawFooter(page, fonts, 'Year overview');
}

function drawMonthlyPage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions, monthIndex: number) {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const { yearSchedule } = options;
	const month = yearSchedule.months[monthIndex];

	drawText(page, month.monthLabel, MARGIN, PAGE_HEIGHT - 66, { font: fonts.bold, size: 24, color: INK });

	const legendY = PAGE_HEIGHT - 66;
	const legendX = PAGE_WIDTH - MARGIN - 190;
	page.drawRectangle({ x: legendX, y: legendY - 9, width: 10, height: 10, color: PARENT_A_COLOR });
	drawText(page, yearSchedule.parentNames.parentA, legendX + 16, legendY, { font: fonts.regular, size: 10, color: INK });
	const parentALabelWidth = fonts.regular.widthOfTextAtSize(yearSchedule.parentNames.parentA, 10);
	const bX = legendX + 16 + parentALabelWidth + 18;
	page.drawRectangle({ x: bX, y: legendY - 9, width: 10, height: 10, color: PARENT_B_COLOR });
	drawText(page, yearSchedule.parentNames.parentB, bX + 16, legendY, { font: fonts.regular, size: 10, color: INK });

	const gridTop = PAGE_HEIGHT - 100;
	const gridWidth = PAGE_WIDTH - MARGIN * 2;
	const colWidth = gridWidth / 7;

	WEEKDAY_LABELS.forEach((label, index) => {
		drawText(page, label.toUpperCase(), MARGIN + index * colWidth + 4, gridTop, { font: fonts.bold, size: 8, color: MUTED });
	});

	const rowHeight = 78;
	const cellPad = 4;
	const rowCount = Math.ceil(month.days.length / 7);
	const gridStartY = gridTop - 16;

	for (let index = 0; index < month.days.length; index += 1) {
		const day = month.days[index];
		const col = index % 7;
		const row = Math.floor(index / 7);
		const x = MARGIN + col * colWidth;
		const y = gridStartY - row * rowHeight - rowHeight;
		const cellWidth = colWidth - cellPad;
		const isTransition = Boolean(day.events?.some((event) => event.type === 'exchange'));
		const isImportantDate = Boolean(day.events?.some((event) => event.type === 'important-date'));

		if (day.isPlaceholder) continue;

		const fill = !day.isCurrentMonth ? rgb(0.97, 0.97, 0.98) : day.parent === 'parentA' ? PARENT_A_SOFT : PARENT_B_SOFT;
		page.drawRectangle({
			x,
			y,
			width: cellWidth,
			height: rowHeight - cellPad,
			color: fill,
			borderColor: day.isHolidayOverride ? AMBER : LINE,
			borderWidth: day.isHolidayOverride ? 1.5 : 0.6,
		});

		if (day.isCurrentMonth) {
			drawText(page, String(day.dayOfMonth), x + 6, y + rowHeight - cellPad - 14, {
				font: fonts.bold,
				size: 11,
				color: day.parent === 'parentA' ? PARENT_A_COLOR : PARENT_B_COLOR,
			});
			drawText(page, day.parentName, x + 6, y + 12, { font: fonts.regular, size: 7.5, color: MUTED, maxWidth: cellWidth - 10 });
			if (isTransition) {
				page.drawRectangle({ x: x + cellWidth - 12, y: y + rowHeight - cellPad - 12, width: 6, height: 6, color: INK });
			}
			if (isImportantDate) {
				// Bottom-right corner — top-left holds the day number, bottom-left
				// holds the parent name, and top-right is reserved for the
				// exchange-day marker, so this is the only free corner.
				page.drawEllipse({ x: x + cellWidth - 9, y: y + 9, xScale: 3.5, yScale: 3.5, color: AMBER });
			}
		} else {
			drawText(page, String(day.dayOfMonth), x + 6, y + rowHeight - cellPad - 14, { font: fonts.regular, size: 10, color: rgb(0.75, 0.75, 0.78) });
		}
	}

	const summaryY = gridStartY - rowCount * rowHeight - 20;
	drawText(
		page,
		`${month.parentDayCounts.parentA} ${yearSchedule.parentNames.parentA} overnights · ${month.parentDayCounts.parentB} ${yearSchedule.parentNames.parentB} overnights this month.`,
		MARGIN,
		summaryY,
		{ font: fonts.regular, size: 9.5, color: MUTED },
	);
	page.drawRectangle({ x: MARGIN, y: summaryY - 20, width: 6, height: 6, color: INK });
	drawText(page, 'marks an exchange day.', MARGIN + 12, summaryY - 14, { font: fonts.regular, size: 8, color: MUTED });
	page.drawEllipse({ x: MARGIN + 3, y: summaryY - 33, xScale: 3, yScale: 3, color: AMBER });
	drawText(page, 'marks an important date you added. An amber outline means you chose the home for that day.', MARGIN + 12, summaryY - 30, {
		font: fonts.regular,
		size: 8,
		color: MUTED,
		maxWidth: PAGE_WIDTH - MARGIN * 2 - 12,
	});

	drawFooter(page, fonts, `Month ${monthIndex + 1} of ${yearSchedule.months.length}`);
}

function drawImportantDatesPage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions) {
	const dates = options.importantDates ?? [];
	if (!dates.length) return;

	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	drawText(page, 'Important Dates', MARGIN, PAGE_HEIGHT - 66, { font: fonts.bold, size: 20, color: INK });
	drawText(page, 'Dates you added while building this calendar.', MARGIN, PAGE_HEIGHT - 86, { font: fonts.regular, size: 10, color: MUTED });

	let y = PAGE_HEIGHT - 130;
	const sorted = [...dates].sort((a, b) => a.date.localeCompare(b.date));
	for (const entry of sorted) {
		page.drawLine({ start: { x: MARGIN, y: y + 8 }, end: { x: PAGE_WIDTH - MARGIN, y: y + 8 }, thickness: 0.5, color: LINE });
		drawText(page, format(parseISO(entry.date), 'MMM d, yyyy'), MARGIN, y - 10, { font: fonts.bold, size: 11, color: INK });
		drawText(page, entry.label, MARGIN + 130, y - 10, { font: fonts.regular, size: 11, color: INK, maxWidth: PAGE_WIDTH - MARGIN * 2 - 130 });
		y -= 34;
		if (y < 80) {
			drawFooter(page, fonts, 'Important dates');
			return;
		}
	}

	drawFooter(page, fonts, 'Important dates');
}

function drawScheduleSummaryPage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions) {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const { yearSchedule, scheduleName, patternLabel, scheduleDescription } = options;

	drawText(page, 'Schedule Summary', MARGIN, PAGE_HEIGHT - 66, { font: fonts.bold, size: 20, color: INK });
	drawText(page, patternLabel ? `${scheduleName} — ${patternLabel}` : scheduleName, MARGIN, PAGE_HEIGHT - 90, { font: fonts.regular, size: 12, color: MUTED });

	let y = PAGE_HEIGHT - 90;
	if (scheduleDescription) {
		y = drawText(page, scheduleDescription, MARGIN, y - 22, { font: fonts.regular, size: 10, color: INK, maxWidth: PAGE_WIDTH - MARGIN * 2, lineHeight: 14 });
	}

	y -= 26;
	const boxHeight = 76;
	page.drawRectangle({ x: MARGIN, y: y - boxHeight, width: PAGE_WIDTH - MARGIN * 2, height: boxHeight, borderColor: LINE, borderWidth: 0.8, color: rgb(0.98, 0.98, 0.99) });
	drawText(page, `${yearSchedule.parentNames.parentA}: ${yearSchedule.annualSummary.parentADays} overnights (${yearSchedule.annualSummary.parentAPercentage}%)`, MARGIN + 16, y - 26, { font: fonts.bold, size: 12, color: PARENT_A_COLOR });
	drawText(page, `${yearSchedule.parentNames.parentB}: ${yearSchedule.annualSummary.parentBDays} overnights (${yearSchedule.annualSummary.parentBPercentage}%)`, MARGIN + 16, y - 48, { font: fonts.bold, size: 12, color: PARENT_B_COLOR });
	drawText(page, `Across ${yearSchedule.annualSummary.totalDays} days, ${yearSchedule.startDate} – ${yearSchedule.endDate}.`, MARGIN + 16, y - 66, { font: fonts.regular, size: 9, color: MUTED });

	y -= boxHeight + 30;
	drawText(page, 'MONTH-BY-MONTH OVERNIGHTS', MARGIN, y, { font: fonts.bold, size: 9, color: MUTED });
	y -= 18;

	const colA = MARGIN;
	const colB = MARGIN + 190;
	const colC = MARGIN + 340;
	drawText(page, 'Month', colA, y, { font: fonts.bold, size: 9, color: MUTED });
	drawText(page, yearSchedule.parentNames.parentA, colB, y, { font: fonts.bold, size: 9, color: MUTED });
	drawText(page, yearSchedule.parentNames.parentB, colC, y, { font: fonts.bold, size: 9, color: MUTED });
	y -= 8;
	page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.6, color: LINE });
	y -= 16;

	for (const month of yearSchedule.months) {
		drawText(page, month.monthLabel, colA, y, { font: fonts.regular, size: 10, color: INK });
		drawText(page, `${month.parentDayCounts.parentA}`, colB, y, { font: fonts.regular, size: 10, color: INK });
		drawText(page, `${month.parentDayCounts.parentB}`, colC, y, { font: fonts.regular, size: 10, color: INK });
		y -= 18;
	}

	drawFooter(page, fonts, 'Schedule summary');
}

function drawChildFriendlyPage(pdfDoc: PDFDocument, fonts: Fonts, options: PremiumPdfOptions) {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const { yearSchedule, childName } = options;
	const week = getFirstFullWeek(yearSchedule);

	const title = childName ? `${childName}'s Week` : 'My Week';
	drawText(page, title, MARGIN, PAGE_HEIGHT - 70, { font: fonts.bold, size: 26, color: INK });
	drawText(page, 'This is where I’ll be!', MARGIN, PAGE_HEIGHT - 96, { font: fonts.regular, size: 12, color: MUTED });

	let y = PAGE_HEIGHT - 150;
	const rowHeight = 62;
	for (const day of week) {
		const isParentA = day.parent === 'parentA';
		const color = isParentA ? PARENT_A_COLOR : PARENT_B_COLOR;
		const soft = isParentA ? PARENT_A_SOFT : PARENT_B_SOFT;

		page.drawRectangle({ x: MARGIN, y: y - rowHeight + 12, width: PAGE_WIDTH - MARGIN * 2, height: rowHeight - 12, color: soft });
		page.drawRectangle({ x: MARGIN, y: y - rowHeight + 12, width: 8, height: rowHeight - 12, color });
		drawText(page, format(parseISO(day.date), 'EEEE').toUpperCase(), MARGIN + 24, y - 14, { font: fonts.bold, size: 12, color: MUTED });
		drawText(page, day.parentName, MARGIN + 24, y - 36, { font: fonts.bold, size: 18, color });
		y -= rowHeight;
	}

	drawText(
		page,
		'Ask a grown-up if you have questions about your schedule.',
		MARGIN,
		90,
		{ font: fonts.regular, size: 10, color: MUTED },
	);
	drawFooter(page, fonts, 'A friendly view');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function buildPremiumCalendarPdf(options: PremiumPdfOptions): Promise<Uint8Array> {
	const pdfDoc = await PDFDocument.create();
	const fonts: Fonts = {
		regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
		bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
	};

	drawCoverPage(pdfDoc, fonts, options);
	drawYearAtAGlancePage(pdfDoc, fonts, options);
	options.yearSchedule.months.forEach((_, index) => drawMonthlyPage(pdfDoc, fonts, options, index));
	drawImportantDatesPage(pdfDoc, fonts, options);
	drawScheduleSummaryPage(pdfDoc, fonts, options);
	drawChildFriendlyPage(pdfDoc, fonts, options);

	return pdfDoc.save();
}

export function downloadBytes(bytes: Uint8Array, filename: string) {
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

export function buildCalendarFilename(options: Pick<PremiumPdfOptions, 'childName'>, filenamePrefix = 'my-custody-calendar') {
	const safeName = (options.childName || filenamePrefix).replace(/[^a-z0-9]+/gi, '-').toLowerCase();
	return `${safeName}-calendar.pdf`;
}

export async function downloadPremiumCalendarPdf(options: PremiumPdfOptions, filenamePrefix = 'my-custody-calendar') {
	const bytes = await buildPremiumCalendarPdf(options);
	downloadBytes(bytes, buildCalendarFilename(options, filenamePrefix));
}
