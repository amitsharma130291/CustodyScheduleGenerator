/**
 * Renders a TransitionPlan (see ./generatePlan) into the Two-Home Transition
 * Checklist PDF. Visual family matches the two-home-offer.astro sales page
 * (warm-white background, navy headings, teal accents/checkmarks, coral used
 * sparingly) rather than the lavender palette used earlier — this is the
 * product customers just paid for, straight off a page that never mentions
 * purple. No DOM dependency, so this runs both in the browser and in a
 * Cloudflare Function (server-side regeneration).
 *
 * Page count is 7-9 depending on what the customer actually answered: the
 * school & activity page is skipped entirely if there's no school info and
 * no activities, and the optional condensed master page only appears once
 * generateTransitionPlan() has judged there's enough real personalization
 * to make it worth a page of its own (see includeMasterPage).
 */
import { format } from 'date-fns';
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { TransitionPlan } from './generatePlan';

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = 46;
/** Absolute floor body content must stay above — the footer (rule line at FOOTER_Y+12, text at FOOTER_Y) is drawn last, after all page content, so it always paints on top; this constant exists so layout code can check itself *before* that happens, rather than relying on "it happened to fit" in one tested scenario. See warnIfEncroachesFooter(). */
const FOOTER_PROTECTED_TOP = FOOTER_Y + 20;

/** Dev-time guard: logs (does not throw — a warning must never break a customer's PDF generation) if a layout computation put content's bottom edge inside the protected footer region. Call with the lowest y a page section reaches. */
function warnIfEncroachesFooter(pageLabel: string, bottom: number) {
	if (bottom < FOOTER_PROTECTED_TOP) {
		// eslint-disable-next-line no-console
		console.warn(`[transitionPdfExport] "${pageLabel}" content reaches y=${bottom.toFixed(1)}, below the protected footer floor of ${FOOTER_PROTECTED_TOP}. The footer is drawn on top regardless, but this page's spacing needs to be tightened above.`);
	}
}

// Palette matches two-home-offer.astro's CSS custom properties exactly.
const NAVY = rgb(0.059, 0.122, 0.239); // --offer-navy #0f1f3d
const NAVY_SOFT = rgb(0.231, 0.29, 0.388); // --offer-navy-soft #3b4a63
const NAVY_MUTED = rgb(0.353, 0.392, 0.471); // --offer-navy-muted #5a6478
const TEAL = rgb(0.059, 0.463, 0.427); // --offer-teal #0f766e
const TEAL_SOFT = rgb(0.902, 0.965, 0.953); // --offer-teal-soft #e6f6f3
const TEAL_BORDER = rgb(0.749, 0.902, 0.878); // --offer-teal-border #bfe6e0
const CORAL = rgb(0.776, 0.29, 0.22); // --offer-coral #c64a38
const LINE = rgb(0.82, 0.82, 0.83);
const WHITE = rgb(1, 1, 1);

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
		page.drawText(line, { x, y: y - index * lineHeight, size, font: options.font, color: options.color ?? NAVY });
	});
	return y - lines.length * lineHeight;
}

/** Drawn as two line segments, not a check-mark text glyph — pdf-lib's WinAnsi standard-font encoding can't represent that character and throws. */
function drawCheckmark(page: PDFPage, cx: number, cy: number, color: ReturnType<typeof rgb>, size = 8) {
	page.drawLine({ start: { x: cx - size * 0.5, y: cy }, end: { x: cx - size * 0.15, y: cy - size * 0.4 }, thickness: 1.6, color });
	page.drawLine({ start: { x: cx - size * 0.15, y: cy - size * 0.4 }, end: { x: cx + size * 0.55, y: cy + size * 0.45 }, thickness: 1.6, color });
}

/** A checkbox + label row, real printable checkbox with visible border. Box position is offset from the text baseline (not flush) so the two visually center on each other. */
function drawChecklistRow(page: PDFPage, fonts: Fonts, text: string, x: number, y: number, maxWidth: number, boxSize = 11): number {
	page.drawRectangle({ x, y: y - boxSize + boxSize * 0.3, width: boxSize, height: boxSize, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
	return drawText(page, text, x + boxSize + 10, y, { font: fonts.regular, size: 10, color: NAVY, maxWidth: maxWidth - boxSize - 10, lineHeight: 13.5 });
}

/** A ruled blank line for handwriting — long enough to actually write on, per the "reference" and "add your own" sections. */
function drawWriteLine(page: PDFPage, x: number, y: number, width: number) {
	page.drawLine({ start: { x, y }, end: { x: x + width, y }, thickness: 0.8, color: LINE });
}

function drawSectionHeading(page: PDFPage, fonts: Fonts, text: string, x: number, y: number, size = 10.5): number {
	drawText(page, text.toUpperCase(), x, y, { font: fonts.bold, size, color: TEAL });
	return y - (size + 10);
}

function drawChecklistSection(page: PDFPage, fonts: Fonts, title: string, items: string[], x: number, yStart: number, width: number): number {
	if (!items.length) return yStart;
	let y = drawSectionHeading(page, fonts, title, x, yStart);
	for (const item of items) {
		y = drawChecklistRow(page, fonts, item, x, y, width) - 12;
	}
	return y;
}

/**
 * A soft teal information panel — used for the adult-only medication notice,
 * notes, and privacy reminders. Never a full-page fill (keeps ink use
 * reasonable and grayscale-safe).
 *
 * `accentBarOnly` swaps the full-box border for a single left accent bar —
 * used for the medication notice so its coral doesn't read as an error/alert
 * box (a full coral border on a panel is a strong visual signal on a page
 * that's otherwise all teal/navy); a heading can accompany it so the "this
 * is an adult's job" framing doesn't depend on the accent color alone.
 */
function drawCalloutPanel(
	page: PDFPage,
	fonts: Fonts,
	lines: string[],
	x: number,
	yTop: number,
	width: number,
	options?: { border?: ReturnType<typeof rgb>; heading?: string; accentBarOnly?: boolean },
): number {
	const padding = 12;
	const size = 9.5;
	const lineHeight = 13;
	const textWidth = width - padding * 2;
	const headingHeight = options?.heading ? 15 : 0;
	const wrapped = lines.flatMap((line) => wrapLines(line, fonts.regular, size, textWidth));
	const height = wrapped.length * lineHeight + padding * 2 + headingHeight;
	const accentColor = options?.border ?? TEAL_BORDER;
	if (options?.accentBarOnly) {
		page.drawRectangle({ x, y: yTop - height, width, height, color: TEAL_SOFT });
		page.drawRectangle({ x, y: yTop - height, width: 3, height, color: accentColor });
	} else {
		page.drawRectangle({ x, y: yTop - height, width, height, color: TEAL_SOFT, borderColor: accentColor, borderWidth: 1 });
	}
	let y = yTop - padding - 9;
	if (options?.heading) {
		drawText(page, options.heading.toUpperCase(), x + padding, y, { font: fonts.bold, size: 8.5, color: accentColor });
		y -= headingHeight;
	}
	for (const line of wrapped) {
		page.drawText(line, { x: x + padding, y, size, font: fonts.regular, color: NAVY_SOFT });
		y -= lineHeight;
	}
	const bottom = yTop - height;
	warnIfEncroachesFooter('callout panel', bottom);
	return bottom;
}

function drawPageHeader(page: PDFPage, fonts: Fonts, title: string, subtitle?: string): number {
	drawText(page, title, MARGIN, PAGE_HEIGHT - 64, { font: fonts.bold, size: 19, color: NAVY });
	if (!subtitle) return PAGE_HEIGHT - 96;
	const bottom = drawText(page, subtitle, MARGIN, PAGE_HEIGHT - 86, { font: fonts.regular, size: 10, color: NAVY_MUTED, maxWidth: CONTENT_WIDTH, lineHeight: 13 });
	return bottom - 14;
}

/** Consistent on every content page: brand, "Page X of Y", short disclaimer — kept short here since the full disclaimer already lives on the cover, per the "don't compete with checklist content" requirement. */
function drawFooter(page: PDFPage, fonts: Fonts, pageNumber: number, totalPages: number) {
	page.drawLine({ start: { x: MARGIN, y: FOOTER_Y + 12 }, end: { x: PAGE_WIDTH - MARGIN, y: FOOTER_Y + 12 }, thickness: 0.6, color: LINE });
	drawText(page, 'CustodyBuilder — planning tool, not legal, medical, or safety advice.', MARGIN, FOOTER_Y, { font: fonts.regular, size: 7.5, color: NAVY_MUTED });
	const pageLabel = `Page ${pageNumber} of ${totalPages}`;
	const labelWidth = fonts.regular.widthOfTextAtSize(pageLabel, 8);
	drawText(page, pageLabel, PAGE_WIDTH - MARGIN - labelWidth, FOOTER_Y, { font: fonts.regular, size: 8, color: NAVY_MUTED });
}

// --------------------------------------------------------------------------
// Page 1 — Cover
// --------------------------------------------------------------------------
function drawCoverPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 214, width: PAGE_WIDTH, height: 214, color: TEAL_SOFT });
	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 6, width: PAGE_WIDTH, height: 6, color: TEAL });

	drawText(page, 'TWO-HOME TRANSITION PACK', MARGIN, PAGE_HEIGHT - 84, { font: fonts.bold, size: 10.5, color: TEAL });
	// Three cases: a name to address the pack to; meaningful answers but no
	// name ("Your..." still reads as directed at this family); or an
	// essentially blank questionnaire, where "Our..." stays honestly generic.
	const title = plan.childName ? `${plan.childName}'s Two-Home Transition Pack` : plan.isPersonalized ? 'Your Two-Home Transition Pack' : 'Our Two-Home Transition Pack';
	drawText(page, title, MARGIN, PAGE_HEIGHT - 122, { font: fonts.bold, size: 25, color: NAVY, maxWidth: CONTENT_WIDTH, lineHeight: 29 });
	// "Personalized" is only accurate once real answers shaped the output —
	// a near-empty questionnaire gets an honest "practical" instead.
	const subtitleAdjective = plan.isPersonalized ? 'personalized' : 'practical';
	drawText(page, `A ${subtitleAdjective} system for what stays, what travels, and what to pack for every transition.`, MARGIN, PAGE_HEIGHT - 172, {
		font: fonts.regular,
		size: 11,
		color: NAVY_SOFT,
		maxWidth: CONTENT_WIDTH,
		lineHeight: 15,
	});

	// Personalized summary strip — only shown facts the customer actually gave us.
	const facts: Array<[string, string]> = [];
	facts.push(['Home labels', `${plan.homeOneLabel} & ${plan.homeTwoLabel}`]);
	if (plan.transitionFrequency) facts.push(['Transition frequency', plan.transitionFrequency]);
	if (plan.schoolDays) facts.push(['School / daycare days', plan.schoolDays]);
	if (plan.activities.length) facts.push(['Activities', plan.activities.map((activity) => activity.name).join(', ')]);
	facts.push(['Generated', format(new Date(), 'MMMM d, yyyy')]);

	let y = PAGE_HEIGHT - 236;
	const rowHeight = 24;
	for (const [label, value] of facts) {
		drawText(page, label.toUpperCase(), MARGIN, y, { font: fonts.bold, size: 7.5, color: NAVY_MUTED });
		const labelWidth = 150;
		drawText(page, value, MARGIN + labelWidth, y, { font: fonts.regular, size: 10, color: NAVY, maxWidth: CONTENT_WIDTH - labelWidth, lineHeight: 12 });
		y -= rowHeight;
	}

	y -= 10;
	y = drawSectionHeading(page, fonts, 'How to use this pack', MARGIN, y, 11);
	const howTo = ['Keep the home-specific pages at the relevant home.', 'Use the transition checklist the night before or before leaving.', 'Review the system as routines and seasons change.'];
	howTo.forEach((step, index) => {
		drawText(page, `${index + 1}.`, MARGIN, y, { font: fonts.bold, size: 10, color: TEAL });
		y = drawText(page, step, MARGIN + 18, y, { font: fonts.regular, size: 10, color: NAVY, maxWidth: CONTENT_WIDTH - 18, lineHeight: 13 }) - 8;
	});

	// Full disclaimer lives here only — footer versions elsewhere stay short.
	y = drawCoverDisclaimer(page, fonts, y - 14) - 24;

	// "What's inside" fills the rest of the cover usefully instead of
	// leaving it blank, and only lists pages this specific PDF actually
	// contains — the conditional school/activity and master pages are
	// included or omitted here to match what was really generated.
	const hasSchoolActivityPage = plan.hasSchoolInfo || plan.activities.length > 0;
	const insideItems = [
		'What stays at each home, vs. what travels every time',
		...(hasSchoolActivityPage ? ['A school & activity bag checklist'] : []),
		'A calm transition-day routine',
		'A "buy two or move it?" decision guide',
		'Home setup, seasonal packing & a fill-in reference card',
		'A kid-friendly checklist your child can use',
		...(plan.includeMasterPage ? ['A reusable master checklist for the door'] : []),
	];
	y = drawSectionHeading(page, fonts, "What's inside", MARGIN, y, 11);
	for (const item of insideItems) {
		page.drawRectangle({ x: MARGIN, y: y - 11, width: 15, height: 15, color: TEAL_SOFT });
		drawCheckmark(page, MARGIN + 7.5, y - 3, TEAL, 8);
		y = drawText(page, item, MARGIN + 24, y, { font: fonts.regular, size: 10, color: NAVY_SOFT, maxWidth: CONTENT_WIDTH - 24, lineHeight: 12.5 }) - 10;
	}

	return page;
}

function drawCoverDisclaimer(page: PDFPage, fonts: Fonts, yTop: number): number {
	const text = 'This is a planning and organization tool based on the details provided. It is not legal advice, a court order, medical advice, or safety guidance.';
	return drawCalloutPanel(page, fonts, [text], MARGIN, yTop, CONTENT_WIDTH);
}

// --------------------------------------------------------------------------
// Page 2 — What stays at each home
// --------------------------------------------------------------------------
function drawWhatStaysPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'What Stays at Each Home', 'Recommended everyday duplicates so fewer things need to travel — check off what you already have.');

	const colGap = 28;
	const colWidth = (CONTENT_WIDTH - colGap) / 2;
	const leftX = MARGIN;
	const rightX = MARGIN + colWidth + colGap;
	const topY = y;

	// Bar sits BELOW topY (topY is already 14pt clear of the subtitle's last
	// line, per drawPageHeader) — extending it upward instead, as this used
	// to, ate back into that clearance and clipped the subtitle underneath.
	function drawHomeColumn(x: number, label: string): number {
		const barHeight = 24;
		const barTop = topY - 6;
		const barBottom = barTop - barHeight;
		page.drawRectangle({ x, y: barBottom, width: colWidth, height: barHeight, color: TEAL });
		drawText(page, label, x + 10, barBottom + 8, { font: fonts.bold, size: 10.5, color: WHITE, maxWidth: colWidth - 20 });
		let colY = barBottom - 20;
		for (const item of plan.keepAtBothHomes) {
			colY = drawChecklistRow(page, fonts, item, x, colY, colWidth) - 11;
		}
		colY -= 8;
		drawText(page, 'ADD YOUR OWN', x, colY, { font: fonts.bold, size: 8.5, color: NAVY_MUTED });
		colY -= 18;
		for (let i = 0; i < 4; i += 1) {
			page.drawRectangle({ x, y: colY - 10, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
			drawWriteLine(page, x + 20, colY - 5, colWidth - 20);
			colY -= 26;
		}
		return colY;
	}

	const leftY = drawHomeColumn(leftX, plan.homeOneLabel);
	const rightY = drawHomeColumn(rightX, plan.homeTwoLabel);

	// Always show a tip here (falling back to a generic one) rather than
	// leaving the lower page blank when there's no personalized note.
	const tipLines = plan.notes.length ? plan.notes : ['Keeping a few basics stocked at both homes means less has to be packed — and less chance of forgetting something — at every switch.'];
	drawCalloutPanel(page, fonts, tipLines, MARGIN, Math.min(leftY, rightY) - 14, CONTENT_WIDTH);

	return page;
}

/**
 * The sections rendered on "What Travels Between Homes" — deliberately
 * sourced ONLY from plan.schoolBagItems / electronicsItems / comfortTravelItems
 * / everydayTravelEssentials / otherEssentials, never from plan.keepAtBothHomes.
 * Those lists are disjoint by construction (see dedupeAgainst in
 * generatePlan.ts); pulling from keepAtBothHomes here would re-list an item
 * this same PDF has already told the family stays at both homes as something
 * that also travels — a direct, confusing contradiction. Exported so the
 * no-overlap guarantee is unit-testable at this boundary, not just implied
 * by the data model.
 */
export function buildTravelsPageSections(plan: TransitionPlan): { title: string; items: string[] }[] {
	const sections: { title: string; items: string[] }[] = [];
	if (plan.schoolBagItems.length) sections.push({ title: 'School & daycare', items: plan.schoolBagItems });
	// "Electronics" only appears when there's an actual device or charger —
	// a water bottle or backpack under an electronics heading reads as
	// misclassified, so those live in their own "Everyday essentials" group.
	if (plan.electronicsItems.length) sections.push({ title: 'Electronics', items: plan.electronicsItems });
	if (plan.comfortTravelItems.length) sections.push({ title: 'Comfort items', items: plan.comfortTravelItems });
	sections.push({ title: 'Everyday essentials', items: plan.everydayTravelEssentials });
	if (plan.otherEssentials.length) sections.push({ title: 'Other essentials', items: plan.otherEssentials });
	return sections;
}

// --------------------------------------------------------------------------
// Page 3 — What travels between homes
// --------------------------------------------------------------------------
function drawWhatTravelsPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

	const sections = buildTravelsPageSections(plan);
	const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0);
	// Genuinely sparse data (the common minimal-data case) reads as one
	// checked-off item and a wall of identical blank lines — a guided
	// worksheet, prompting for each category by name, is more useful than
	// pretending there's a real categorized list to show. The subtitle is
	// honest about which mode this page is actually in.
	const isGuidedWorksheet = totalItems < 3;
	const travelsSubtitle = isGuidedWorksheet
		? 'Use this page to decide what travels regularly between homes.'
		: plan.isPersonalized
			? 'Your personalized master travel list — pack these every switch.'
			: 'A master travel list — pack these every switch.';
	let y = drawPageHeader(page, fonts, 'What Travels Between Homes', travelsSubtitle);

	const topY = y;
	let leftY = topY;
	let rightY = topY;

	if (isGuidedWorksheet) {
		leftY = drawText(page, 'Check any suggested items that apply, and add what travels for your family.', MARGIN, leftY, { font: fonts.regular, size: 10, color: NAVY_MUTED, maxWidth: CONTENT_WIDTH, lineHeight: 13 }) - 16;

		// Every category gets the same teal heading treatment whether or not
		// it has a real item yet — "Water bottle" (if present) reads as
		// belonging to "Everyday essentials," not floating under a mismatched
		// "Electronics" heading, and an empty category is just one blank row
		// under its own name rather than an ambiguous "Add another."
		const knownItems = new Map<string, string[]>([
			['School or daycare', plan.schoolBagItems],
			['Electronics', plan.electronicsItems],
			['Comfort items', plan.comfortTravelItems],
			['Other essentials', [...plan.everydayTravelEssentials, ...plan.otherEssentials]],
		]);
		const guidedCategories = ['School or daycare', 'Activities', 'Electronics', 'Comfort items', 'Clothing', 'Other essentials'];
		for (const category of guidedCategories) {
			const known = knownItems.get(category) ?? [];
			leftY = drawSectionHeading(page, fonts, category, MARGIN, leftY, 9.5);
			for (const item of known) {
				leftY = drawChecklistRow(page, fonts, item, MARGIN, leftY, CONTENT_WIDTH) - 10;
			}
			page.drawRectangle({ x: MARGIN, y: leftY - 11, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
			drawWriteLine(page, MARGIN + 21, leftY - 6, CONTENT_WIDTH - 21);
			leftY -= 28;
		}
		rightY = leftY;
	} else if (sections.length <= 1 || totalItems <= 6) {
		for (const section of sections) {
			leftY = drawChecklistSection(page, fonts, section.title, section.items, MARGIN, leftY, CONTENT_WIDTH) - 12;
		}
		rightY = leftY;
	} else {
		const colGap = 28;
		const colWidth = (CONTENT_WIDTH - colGap) / 2;
		const leftX = MARGIN;
		const rightX = MARGIN + colWidth + colGap;
		sections.forEach((section, index) => {
			if (index % 2 === 0) {
				leftY = drawChecklistSection(page, fonts, section.title, section.items, leftX, leftY, colWidth) - 12;
			} else {
				rightY = drawChecklistSection(page, fonts, section.title, section.items, rightX, rightY, colWidth) - 12;
			}
		});
	}

	let bottomY = Math.min(leftY, rightY) - 6;

	// The guided worksheet (sparse-data branch above) already gives every
	// category its own write-in line — a second generic "add your own" block
	// right after it would just repeat the same prompt.
	if (!isGuidedWorksheet) {
		bottomY = drawSectionHeading(page, fonts, 'Add your own', MARGIN, bottomY);
		for (let i = 0; i < 5; i += 1) {
			page.drawRectangle({ x: MARGIN, y: bottomY - 10, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
			drawWriteLine(page, MARGIN + 24, bottomY - 5, CONTENT_WIDTH - 24);
			bottomY -= 26;
		}
	}

	// Adult-only medication callout — deliberately NOT a checkbox item mixed
	// in with toys and chargers, and deliberately free of any dosage,
	// storage, or timing detail. A left accent bar (not a full coral box)
	// keeps this from reading as an error/alert on an otherwise teal/navy page.
	drawCalloutPanel(page, fonts, ["Medication must be managed by the responsible adult according to the child's established care plan."], MARGIN, bottomY - 10, CONTENT_WIDTH, {
		border: CORAL,
		heading: 'Adult responsibility',
		accentBarOnly: true,
	});

	return page;
}

// --------------------------------------------------------------------------
// Page 4 (conditional) — School and activity bags
// --------------------------------------------------------------------------
function drawSchoolActivityPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'School & Activity Bags', 'Built from the activities and school details you selected.');

	if (plan.schoolBagItems.length) {
		y = drawChecklistSection(page, fonts, 'School / daycare bag', plan.schoolBagItems, MARGIN, y, CONTENT_WIDTH) - 10;
	}

	const colGap = 24;
	const colWidth = (CONTENT_WIDTH - colGap) / 2;
	let colX = MARGIN;
	let colTop = y;
	let colBottom = y;
	plan.activities.forEach((activity, index) => {
		const label = activity.day ? `${activity.name} — ${activity.day}` : activity.name;
		const estimatedHeight = 24 + activity.gear.length * 24;
		if (colTop - estimatedHeight < 120) {
			// Ran out of vertical room for a third row of activities — the
			// remaining ones still get their gear folded into "What Travels"
			// via travelsEveryTime, so nothing is silently dropped.
			return;
		}
		const newY = drawChecklistSection(page, fonts, label, activity.gear, colX, colTop, colWidth);
		colBottom = Math.min(colBottom, newY);
		if (colX === MARGIN) {
			colX = MARGIN + colWidth + colGap;
		} else {
			colX = MARGIN;
			colTop = colBottom - 14;
		}
		void index;
	});

	// Fill remaining room with write-in rows (footer-clearance guarded, same
	// as the activity loop above) rather than leaving the page mostly blank
	// when only one or two activities were selected.
	const footerClearance = 130;
	let bottomY = colBottom - 16;
	if (bottomY - footerClearance > 40) {
		bottomY = drawSectionHeading(page, fonts, 'Add your own', MARGIN, bottomY);
		const maxRows = 5;
		for (let i = 0; i < maxRows && bottomY - footerClearance > 0; i += 1) {
			page.drawRectangle({ x: MARGIN, y: bottomY - 10, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
			drawWriteLine(page, MARGIN + 24, bottomY - 5, CONTENT_WIDTH - 24);
			bottomY -= 26;
		}
		drawCalloutPanel(page, fonts, ['New activity later on? Add its gear list here so this page keeps working as things change.'], MARGIN, bottomY - 10, CONTENT_WIDTH);
	}

	return page;
}

// --------------------------------------------------------------------------
// Page 5 — Transition routine
// --------------------------------------------------------------------------
function drawTransitionRoutinePage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'Transition Routine', 'A calm, repeatable rhythm for switch days.');

	const colGap = 28;
	const colWidth = (CONTENT_WIDTH - colGap) / 2;
	const leftX = MARGIN;
	const rightX = MARGIN + colWidth + colGap;
	const topY = y;

	const leftY = drawChecklistSection(page, fonts, 'Prepare the night before', plan.switchDayChecklist, leftX, topY, colWidth);
	const rightY = drawChecklistSection(page, fonts, 'Before leaving', plan.beforeLeavingChecklist, rightX, topY, colWidth);

	let bottomY = Math.min(leftY, rightY) - 10;
	if (plan.packingDifficulty) {
		bottomY = drawCalloutPanel(page, fonts, [`Easy to forget: ${plan.packingDifficulty}`], MARGIN, bottomY, CONTENT_WIDTH) - 12;
	}

	bottomY = drawChecklistSection(page, fonts, 'After arrival (optional reset)', plan.afterArrivalChecklist, MARGIN, bottomY, CONTENT_WIDTH);

	return page;
}

// --------------------------------------------------------------------------
// Page 6 — Buy two, or move it?
// --------------------------------------------------------------------------
function drawDecisionGuidePage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'Buy Two, or Move It?', "A quick way to decide what's worth duplicating, and what should travel.");

	drawCalloutPanel(
		page,
		fonts,
		[
			'Consider keeping one at each home when an item is inexpensive, used frequently, and easy to forget.',
			'Consider having it travel when it is expensive, specialized, or emotionally important.',
		],
		MARGIN,
		y,
		CONTENT_WIDTH,
	);
	y -= 122;

	// Table: item / keep-at-both / travels / our decision.
	const itemColWidth = CONTENT_WIDTH * 0.4;
	const checkColWidth = 70;
	const decisionColX = MARGIN + itemColWidth + checkColWidth * 2 + 12;
	const decisionColWidth = PAGE_WIDTH - MARGIN - decisionColX;

	drawText(page, 'ITEM', MARGIN, y, { font: fonts.bold, size: 8, color: NAVY_MUTED });
	drawText(page, 'KEEP BOTH', MARGIN + itemColWidth, y, { font: fonts.bold, size: 8, color: NAVY_MUTED });
	drawText(page, 'TRAVELS', MARGIN + itemColWidth + checkColWidth, y, { font: fonts.bold, size: 8, color: NAVY_MUTED });
	drawText(page, 'OUR DECISION', decisionColX, y, { font: fonts.bold, size: 8, color: NAVY_MUTED });
	y -= 14;
	page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.8, color: LINE });
	y -= 18;

	const rowHeight = 26;
	const rows = [
		...plan.decisionRows,
		{ item: '', suggestion: '' as const },
		{ item: '', suggestion: '' as const },
		{ item: '', suggestion: '' as const },
		{ item: '', suggestion: '' as const },
		{ item: '', suggestion: '' as const },
	];
	for (const row of rows) {
		if (y < 90) break; // stay clear of the footer
		if (row.item) {
			drawText(page, row.item, MARGIN, y, { font: fonts.regular, size: 9.5, color: NAVY, maxWidth: itemColWidth - 8, lineHeight: 12 });
		} else {
			drawWriteLine(page, MARGIN, y - 3, itemColWidth - 12);
		}
		page.drawRectangle({ x: MARGIN + itemColWidth + 20, y: y - 9, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
		page.drawRectangle({ x: MARGIN + itemColWidth + checkColWidth + 20, y: y - 9, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
		drawWriteLine(page, decisionColX, y - 3, decisionColWidth);
		y -= rowHeight;
	}

	return page;
}

// --------------------------------------------------------------------------
// Page 7 — Home setup, seasonal needs & reference
// --------------------------------------------------------------------------
function drawHomeSetupReferencePage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'Making Both Homes Feel Ready', 'A few extras that help both homes feel familiar, plus a fill-in reference card.');

	const colGap = 28;
	const colWidth = (CONTENT_WIDTH - colGap) / 2;
	const leftX = MARGIN;
	const rightX = MARGIN + colWidth + colGap;
	const topY = y;

	const leftY = drawChecklistSection(page, fonts, 'Make it feel like home', plan.homeSetupChecklist, leftX, topY, colWidth);

	let seasonY = drawSectionHeading(page, fonts, 'Seasonal swap', rightX, topY);
	for (const { season, items } of plan.seasonalReminders) {
		drawText(page, season.toUpperCase(), rightX, seasonY, { font: fonts.bold, size: 8.5, color: NAVY_MUTED });
		seasonY -= 15;
		for (const item of items) {
			seasonY = drawChecklistRow(page, fonts, item, rightX, seasonY, colWidth, 9) - 6;
		}
		seasonY -= 6;
	}

	let bottomY = Math.min(leftY, seasonY) - 8;
	bottomY = drawSectionHeading(page, fonts, 'Quick-reference card', MARGIN, bottomY);
	drawText(page, 'All fields optional — fill in what applies and keep a copy at each home.', MARGIN, bottomY, { font: fonts.regular, size: 8.5, color: NAVY_MUTED });
	bottomY -= 22;

	// Short fields get one line next to the label. The two fields most likely
	// to hold more than a few words get their own two full-width lines below
	// the label instead of squeezing everything onto a single short line.
	const shortReferenceLabels = ['Emergency contact', 'Doctor or pediatrician', 'School & teacher'];
	for (const label of shortReferenceLabels) {
		drawText(page, `${label}:`, MARGIN, bottomY, { font: fonts.bold, size: 9.5, color: NAVY });
		const labelWidth = fonts.bold.widthOfTextAtSize(`${label}: `, 9.5);
		drawWriteLine(page, MARGIN + labelWidth, bottomY - 3, PAGE_WIDTH - MARGIN - MARGIN - labelWidth);
		bottomY -= 24;
	}
	const expandedReferenceLabels = ['Allergies or important notes', 'Additional information'];
	for (const label of expandedReferenceLabels) {
		drawText(page, `${label}:`, MARGIN, bottomY, { font: fonts.bold, size: 9.5, color: NAVY });
		bottomY -= 18;
		drawWriteLine(page, MARGIN, bottomY, CONTENT_WIDTH);
		bottomY -= 20;
		drawWriteLine(page, MARGIN, bottomY, CONTENT_WIDTH);
		bottomY -= 14;
	}

	drawCalloutPanel(page, fonts, ['Completed copies may contain private information. Store them securely and dispose of outdated copies appropriately.'], MARGIN, bottomY - 6, CONTENT_WIDTH);

	return page;
}

// --------------------------------------------------------------------------
// Page 8 — Child-friendly checklist
// --------------------------------------------------------------------------
function drawKidFriendlyPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 150, width: PAGE_WIDTH, height: 150, color: TEAL_SOFT });
	page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 6, width: PAGE_WIDTH, height: 6, color: TEAL });

	const title = plan.childName ? `${plan.childName}'s Checklist` : 'My Checklist';
	drawText(page, title, MARGIN, PAGE_HEIGHT - 76, { font: fonts.bold, size: 28, color: NAVY });
	drawText(page, 'Check these off before you leave!', MARGIN, PAGE_HEIGHT - 108, { font: fonts.regular, size: 12.5, color: NAVY_MUTED });

	// A few blank rows for the child's own additions on every page, tapering
	// off as the real list grows so a busy personalized list doesn't get
	// crowded with extra rows it doesn't need.
	const blankRowCount = plan.kidFriendlyChecklist.length <= 6 ? 3 : 2;
	const totalRows = plan.kidFriendlyChecklist.length + blankRowCount;

	// Row height (and box/text size) scale down for longer personalized lists
	// — a fixed row height that works for 3 items would push the closing
	// banner off the page once several selections add up.
	const topY = PAGE_HEIGHT - 196;
	const bannerHeight = 52;
	const bottomClearance = 76; // stays clear of the footer line
	const availableHeight = topY - bottomClearance - bannerHeight - 16;
	const rowHeight = Math.min(plan.kidFriendlyIsSimplified ? 84 : 68, Math.max(32, availableHeight / totalRows));
	const boxSize = Math.min(plan.kidFriendlyIsSimplified ? 30 : 24, rowHeight * 0.52);
	const fontSize = Math.min(plan.kidFriendlyIsSimplified ? 15 : 13, rowHeight * 0.28);

	let y = topY;
	for (const item of plan.kidFriendlyChecklist) {
		page.drawRectangle({ x: MARGIN, y: y - rowHeight + 10, width: CONTENT_WIDTH, height: rowHeight - 14, color: rgb(0.98, 0.99, 0.99) });
		page.drawRectangle({ x: MARGIN + 14, y: y - rowHeight * 0.37, width: boxSize, height: boxSize, borderColor: TEAL, borderWidth: 2, color: WHITE });
		drawText(page, item, MARGIN + 14 + boxSize + 16, y - rowHeight * 0.33, { font: fonts.bold, size: fontSize, color: NAVY, maxWidth: CONTENT_WIDTH - (14 + boxSize + 16) });
		y -= rowHeight;
	}
	for (let i = 0; i < blankRowCount; i += 1) {
		page.drawRectangle({ x: MARGIN, y: y - rowHeight + 10, width: CONTENT_WIDTH, height: rowHeight - 14, color: rgb(0.98, 0.99, 0.99) });
		page.drawRectangle({ x: MARGIN + 14, y: y - rowHeight * 0.37, width: boxSize, height: boxSize, borderColor: TEAL, borderWidth: 2, color: WHITE });
		drawWriteLine(page, MARGIN + 14 + boxSize + 16, y - rowHeight * 0.4, CONTENT_WIDTH - (14 + boxSize + 16) - 10);
		y -= rowHeight;
	}

	y -= 18;
	page.drawRectangle({ x: MARGIN, y: y - bannerHeight, width: CONTENT_WIDTH, height: bannerHeight, borderColor: TEAL, borderWidth: 1, color: TEAL_SOFT });
	drawText(page, "You're ready to go!", MARGIN + 16, y - 22, { font: fonts.bold, size: 13, color: NAVY });
	drawText(page, 'Ask a grown-up if you need help.', MARGIN + 16, y - 39, { font: fonts.regular, size: 9.5, color: NAVY_MUTED });

	return page;
}

// --------------------------------------------------------------------------
// Page 9 (conditional) — Reusable master checklist
// --------------------------------------------------------------------------
function drawMasterPage(pdfDoc: PDFDocument, fonts: Fonts, plan: TransitionPlan): PDFPage {
	const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	let y = drawPageHeader(page, fonts, 'Master Checklist', 'One condensed page — print extra copies or laminate one for near the door.');

	const colGap = 28;
	const colWidth = (CONTENT_WIDTH - colGap) / 2;
	const leftX = MARGIN;
	const rightX = MARGIN + colWidth + colGap;
	const topY = y;

	let leftY = drawChecklistSection(page, fonts, 'Night before', plan.switchDayChecklist.slice(0, 5), leftX, topY, colWidth);
	if (plan.schoolBagItems.length) leftY = drawChecklistSection(page, fonts, 'School / activity', plan.schoolBagItems, leftX, leftY - 10, colWidth);

	let rightY = drawChecklistSection(page, fonts, 'Travel items', plan.travelsEveryTime.slice(0, 6), rightX, topY, colWidth);
	rightY = drawSectionHeading(page, fonts, 'Adult check', rightX, rightY - 8);
	rightY = drawChecklistRow(page, fonts, 'Medication confirmed with the responsible adult', rightX, rightY, colWidth) - 9;

	let bottomY = Math.min(leftY, rightY) - 10;
	bottomY = drawSectionHeading(page, fonts, 'Add your own', MARGIN, bottomY);
	for (let i = 0; i < 3; i += 1) {
		page.drawRectangle({ x: MARGIN, y: bottomY - 10, width: 11, height: 11, borderColor: NAVY_MUTED, borderWidth: 1, color: WHITE });
		drawWriteLine(page, MARGIN + 24, bottomY - 5, CONTENT_WIDTH - 24);
		bottomY -= 22;
	}

	return page;
}

export async function buildTransitionPdf(plan: TransitionPlan): Promise<Uint8Array> {
	const pdfDoc = await PDFDocument.create();
	const fonts: Fonts = {
		regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
		bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
	};

	// Title/subject reflect output mode but never carry the child's name or
	// any other customer answer — file metadata persists in OS search indexes,
	// cloud-sync previews, and "recent files" lists well outside the PDF
	// itself, so a custody-related document keeps that surface generic even
	// when the pack itself is personalized.
	pdfDoc.setTitle(plan.isPersonalized ? 'Your Two-Home Transition Pack' : 'Two-Home Transition Pack');
	pdfDoc.setAuthor('CustodyBuilder');
	pdfDoc.setSubject(plan.isPersonalized ? 'Personalized packing and transition-day organization checklist' : 'Printable packing and transition-day organization checklist');
	pdfDoc.setKeywords(['custody', 'co-parenting', 'checklist', 'transition']);
	pdfDoc.setLanguage('en-US');
	pdfDoc.setCreator('CustodyBuilder');
	pdfDoc.setProducer('CustodyBuilder');

	const hasSchoolActivityPage = plan.hasSchoolInfo || plan.activities.length > 0;
	const totalPages = 7 + (hasSchoolActivityPage ? 1 : 0) + (plan.includeMasterPage ? 1 : 0);

	let pageNumber = 0;
	const nextPage = (page: PDFPage) => {
		pageNumber += 1;
		drawFooter(page, fonts, pageNumber, totalPages);
	};

	nextPage(drawCoverPage(pdfDoc, fonts, plan));
	nextPage(drawWhatStaysPage(pdfDoc, fonts, plan));
	nextPage(drawWhatTravelsPage(pdfDoc, fonts, plan));
	if (hasSchoolActivityPage) nextPage(drawSchoolActivityPage(pdfDoc, fonts, plan));
	nextPage(drawTransitionRoutinePage(pdfDoc, fonts, plan));
	nextPage(drawDecisionGuidePage(pdfDoc, fonts, plan));
	nextPage(drawHomeSetupReferencePage(pdfDoc, fonts, plan));
	nextPage(drawKidFriendlyPage(pdfDoc, fonts, plan));
	if (plan.includeMasterPage) nextPage(drawMasterPage(pdfDoc, fonts, plan));

	return pdfDoc.save();
}

export function buildTransitionFilename(plan: TransitionPlan): string {
	// Strip accents to their base letter (José -> jose) before the ASCII-only
	// filter, so an international name still yields a readable filename
	// instead of losing every accented character outright.
	const base = (plan.childName || 'two-home')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/gi, '-')
		.toLowerCase()
		.replace(/^-+|-+$/g, '');
	const safeName = base || 'two-home';
	return `${safeName}-transition-checklist.pdf`;
}

export function downloadTransitionBytes(bytes: Uint8Array, filename: string) {
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
