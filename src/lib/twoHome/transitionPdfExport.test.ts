import { PDFDocument } from 'pdf-lib';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateTransitionPlan, type TwoHomeAnswers } from './generatePlan';
import { buildTransitionFilename, buildTransitionPdf, buildTravelsPageSections } from './transitionPdfExport';

const US_LETTER = { width: 612, height: 792 };

function expectedPageCount(answers: TwoHomeAnswers): number {
	const plan = generateTransitionPlan(answers);
	const hasSchoolActivityPage = plan.hasSchoolInfo || plan.activities.length > 0;
	return 7 + (hasSchoolActivityPage ? 1 : 0) + (plan.includeMasterPage ? 1 : 0);
}

describe('buildTransitionPdf — footer never gets crowded by body content', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	// Regression coverage for a persistently-reported defect: the privacy
	// panel on "Making Both Homes Feel Ready" allegedly covering the footer.
	// It never reproduced under visual inspection, but the layout code now
	// self-checks (see warnIfEncroachesFooter in transitionPdfExport.ts) —
	// this test is the "automated render assertion" that would catch a real
	// regression here without needing pixel-level screenshot comparison.
	const SCENARIOS: TwoHomeAnswers[] = [
		{},
		{ childName: 'Sam', homeOneLabel: "Mum's", homeTwoLabel: "Dad's", comfortItem: 'Blanket', activities: 'Soccer (Saturday)' },
		{ childName: 'Maya', childAgeRange: '6-8', schoolDays: 'Mon-Fri', schoolUniform: 'yes', activities: 'Swimming (Tuesday), Soccer (Saturday)', comfortItem: 'Stuffed rabbit', clothingStocked: 'some' },
		{
			childName: 'Maximilian-Alexander',
			childAgeRange: '9-12',
			homeOneLabel: "Grandmother and Grandfather's House on Willow Lane",
			homeTwoLabel: "Stepmother's Household (Weekdays Only, Excluding Holidays)",
			transitionFrequency: 'Alternating weeks with a Wednesday dinner visit in between',
			schoolDays: 'Monday through Friday, every week without exception',
			schoolUniform: 'yes',
			schoolDevice: 'iPad',
			activities: 'Swimming (Monday), Soccer (Tuesday), Piano (Wednesday), Dance (Thursday)',
			electronics: 'Phone charger, headphones, e-reader',
			glasses: 'yes',
			comfortItem: 'The very large stuffed elephant that has been in the family for three generations',
			clothingStocked: 'none',
			customItems: 'A very long custom item description that goes on and on, allergy medication list, favorite blanket, library books, spare glasses',
			packingDifficulty: 'The retainer case always gets left behind',
		},
	];

	it('never logs a footer-encroachment warning while generating any scenario', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		for (const answers of SCENARIOS) {
			await buildTransitionPdf(generateTransitionPlan(answers));
		}
		expect(warnSpy).not.toHaveBeenCalled();
	});
});

describe('buildTransitionPdf', () => {
	it('produces a well-formed PDF that reloads without error', async () => {
		const plan = generateTransitionPlan({ childName: 'Maya', activities: 'Swimming (Tuesday)' });
		const bytes = await buildTransitionPdf(plan);
		await expect(PDFDocument.load(bytes)).resolves.toBeDefined();
	});

	it('every page is US Letter size', async () => {
		const plan = generateTransitionPlan({
			childName: 'Riley',
			transitionFrequency: 'Every other week',
			comfortItem: 'Teddy bear',
			schoolDevice: 'iPad',
			activities: 'Swimming (Monday), Soccer (Tuesday)',
		});
		const bytes = await buildTransitionPdf(plan);
		const reloaded = await PDFDocument.load(bytes);
		for (const page of reloaded.getPages()) {
			const { width, height } = page.getSize();
			expect(width).toBe(US_LETTER.width);
			expect(height).toBe(US_LETTER.height);
		}
	});

	it('page count matches the conditional school/activity and master-page rules, for a minimal-data plan', async () => {
		const answers: TwoHomeAnswers = { childAgeRange: '' };
		const plan = generateTransitionPlan(answers);
		const bytes = await buildTransitionPdf(plan);
		const reloaded = await PDFDocument.load(bytes);
		expect(reloaded.getPageCount()).toBe(expectedPageCount(answers));
		expect(plan.hasSchoolInfo || plan.activities.length > 0).toBe(false);
		expect(plan.includeMasterPage).toBe(false);
	});

	it('page count matches the conditional rules for a rich, fully-personalized plan', async () => {
		const answers: TwoHomeAnswers = {
			childName: 'Maya',
			childAgeRange: '6-8',
			transitionFrequency: 'Every other week',
			schoolDays: 'Mon-Fri',
			schoolUniform: 'yes',
			activities: 'Swimming (Tuesday), Soccer (Saturday)',
			comfortItem: 'Stuffed rabbit',
			customItems: 'Retainer case',
			packingDifficulty: 'The swim bag on Tuesdays',
		};
		const bytes = await buildTransitionPdf(generateTransitionPlan(answers));
		const reloaded = await PDFDocument.load(bytes);
		expect(reloaded.getPageCount()).toBe(expectedPageCount(answers));
		expect(reloaded.getPageCount()).toBe(9);
	});

	it('a very large number of activities does not overflow into unexpected extra pages', async () => {
		const answers: TwoHomeAnswers = {
			childName: 'Riley',
			activities: 'Swimming (Monday), Soccer (Tuesday), Piano (Wednesday), Dance (Thursday), Karate (Friday), Scouts (Saturday), Chess Club (Sunday), Tutoring (Monday)',
		};
		const bytes = await buildTransitionPdf(generateTransitionPlan(answers));
		const reloaded = await PDFDocument.load(bytes);
		expect(reloaded.getPageCount()).toBe(expectedPageCount(answers));
	});

	it('never re-lists an item that stays at both homes as content on the What Travels page (regression: stale "Clothing" section)', () => {
		const scenarios: TwoHomeAnswers[] = [
			{ childName: 'Sam', schoolDays: 'Mon-Fri', schoolUniform: 'yes' },
			{},
			{ childName: 'Riley', activities: 'Swimming (Monday), Soccer (Tuesday)', glasses: 'yes' },
		];
		for (const answers of scenarios) {
			const plan = generateTransitionPlan(answers);
			const staysLower = new Set(plan.keepAtBothHomes.map((s) => s.toLowerCase()));
			const travelsPageText = buildTravelsPageSections(plan)
				.flatMap((section) => section.items)
				.map((s) => s.toLowerCase());
			for (const item of travelsPageText) {
				expect(staysLower.has(item)).toBe(false);
			}
		}
	});

	it('What Travels always has at least one non-empty section, even for a minimal-data plan', () => {
		const sections = buildTravelsPageSections(generateTransitionPlan({}));
		expect(sections.length).toBeGreaterThan(0);
		expect(sections.some((s) => s.items.length > 0)).toBe(true);
	});

	it('never puts a water bottle (or other non-electronic essential) under the Electronics section', () => {
		// Water bottle always exists (generateTransitionPlan always adds it),
		// so this is the common minimal-data case, not an edge case.
		const sections = buildTravelsPageSections(generateTransitionPlan({}));
		const electronics = sections.find((s) => s.title === 'Electronics');
		expect(electronics).toBeUndefined(); // no real device/charger -> no Electronics section at all
		const essentials = sections.find((s) => s.title === 'Everyday essentials');
		expect(essentials?.items).toContain('Water bottle');
	});

	it('only shows an Electronics section once there is a real device or charger', () => {
		const withDevice = buildTravelsPageSections(generateTransitionPlan({ schoolDevice: 'iPad' }));
		expect(withDevice.find((s) => s.title === 'Electronics')?.items).toContain('iPad');

		const withoutDevice = buildTravelsPageSections(generateTransitionPlan({ comfortItem: 'Blanket' }));
		expect(withoutDevice.find((s) => s.title === 'Electronics')).toBeUndefined();
		// The comfort item gets its own section rather than hiding under Electronics.
		expect(withoutDevice.find((s) => s.title === 'Comfort items')?.items).toContain('Blanket');
	});

	it('keeps document metadata free of any customer-provided text or internal identifiers', async () => {
		const answers: TwoHomeAnswers = { childName: 'Maximilian-Alexander', homeOneLabel: 'A Very Specific Grandparent Household', customItems: 'A private note about a medical device' };
		const bytes = await buildTransitionPdf(generateTransitionPlan(answers));
		const reloaded = await PDFDocument.load(bytes);

		// Personalized (has childName + customItems), but metadata still stays generic — no name.
		expect(reloaded.getTitle()).toBe('Your Two-Home Transition Pack');
		expect(reloaded.getAuthor()).toBe('CustodyBuilder');
		const metadataText = [reloaded.getTitle(), reloaded.getAuthor(), reloaded.getSubject(), reloaded.getCreator(), reloaded.getProducer(), ...(reloaded.getKeywords()?.split(' ') ?? [])].join(' ');

		expect(metadataText).not.toContain('Maximilian-Alexander');
		expect(metadataText).not.toContain('Grandparent');
		expect(metadataText).not.toContain('medical device');
		expect(metadataText).not.toMatch(/@|order_|pay_|cs_|session/i);
	});

	it('fallback-mode metadata never claims personalization', async () => {
		const bytes = await buildTransitionPdf(generateTransitionPlan({}));
		const reloaded = await PDFDocument.load(bytes);
		expect(reloaded.getTitle()).toBe('Two-Home Transition Pack');
		expect(reloaded.getSubject()).toBe('Printable packing and transition-day organization checklist');
		expect(reloaded.getSubject()).not.toMatch(/personalized/i);
		expect(reloaded.getTitle()).not.toMatch(/personalized|your/i);
	});

	it('personalized-mode metadata says so without naming the child', async () => {
		const bytes = await buildTransitionPdf(generateTransitionPlan({ schoolDays: 'Mon-Fri' }));
		const reloaded = await PDFDocument.load(bytes);
		expect(reloaded.getTitle()).toBe('Your Two-Home Transition Pack');
		expect(reloaded.getSubject()).toBe('Personalized packing and transition-day organization checklist');
	});

	it('filenames are built from a sanitized version of the name, never leaking answer text raw', () => {
		const plan = generateTransitionPlan({ childName: "O'Brien-Smith Jr." });
		const filename = buildTransitionFilename(plan);
		expect(filename).toMatch(/^[a-z0-9-]+-transition-checklist\.pdf$/);
	});

	it('falls back to a generic filename when no child name was given', () => {
		const plan = generateTransitionPlan({});
		expect(buildTransitionFilename(plan)).toBe('two-home-transition-checklist.pdf');
	});
});
