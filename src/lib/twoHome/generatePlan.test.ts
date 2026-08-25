import { describe, expect, it } from 'vitest';
import { generateTransitionPlan, type TransitionPlan, type TwoHomeAnswers } from './generatePlan';

/** Every string field in the plan, flattened, for leak/terminology scans. */
function allStrings(plan: TransitionPlan): string[] {
	const out: string[] = [];
	const push = (value: unknown) => {
		if (typeof value === 'string') out.push(value);
	};
	push(plan.childName);
	push(plan.childDisplayName);
	push(plan.childAgeRange);
	push(plan.homeOneLabel);
	push(plan.homeTwoLabel);
	push(plan.transitionFrequency);
	push(plan.schoolDays);
	push(plan.packingDifficulty);
	for (const activity of plan.activities) {
		push(activity.name);
		push(activity.day);
		activity.gear.forEach(push);
	}
	[
		plan.keepAtBothHomes,
		plan.travelsEveryTime,
		plan.otherEssentials,
		plan.schoolBagItems,
		plan.switchDayChecklist,
		plan.beforeLeavingChecklist,
		plan.afterArrivalChecklist,
		plan.kidFriendlyChecklist,
		plan.buyTwoGuidance,
		plan.moveItGuidance,
		plan.handoffTips,
		plan.homeSetupChecklist,
		plan.notes,
	].forEach((list) => list.forEach(push));
	plan.decisionRows.forEach((row) => push(row.item));
	plan.seasonalReminders.forEach((season) => {
		push(season.season);
		season.items.forEach(push);
	});
	return out;
}

describe('generateTransitionPlan — personalization', () => {
	it('uses the child name when provided, and a safe fallback when not', () => {
		const withName = generateTransitionPlan({ childName: 'Maya' });
		expect(withName.childName).toBe('Maya');
		expect(withName.childDisplayName).toBe('Maya');

		const withoutName = generateTransitionPlan({});
		expect(withoutName.childName).toBeUndefined();
		expect(withoutName.childDisplayName).toBe('your child');
	});

	it('uses customer-chosen home labels, defaulting to neutral labels when blank', () => {
		const custom = generateTransitionPlan({ homeOneLabel: "Mum's home", homeTwoLabel: "Dad's home" });
		expect(custom.homeOneLabel).toBe("Mum's home");
		expect(custom.homeTwoLabel).toBe("Dad's home");

		const fallback = generateTransitionPlan({});
		expect(fallback.homeOneLabel).toBe('Home 1');
		expect(fallback.homeTwoLabel).toBe('Home 2');
	});

	it('builds a structured, gear-mapped checklist for each selected activity', () => {
		const plan = generateTransitionPlan({ activities: 'Swimming (Tuesday), Soccer (Saturday)' });
		expect(plan.activities).toHaveLength(2);

		const swimming = plan.activities.find((a) => a.name === 'Swimming');
		expect(swimming?.day).toBe('Tuesday');
		expect(swimming?.gear).toEqual(['Swimsuit', 'Towel', 'Goggles', 'Water bottle']);

		const soccer = plan.activities.find((a) => a.name === 'Soccer');
		expect(soccer?.day).toBe('Saturday');
		expect(soccer?.gear).toEqual(['Cleats', 'Shin guards', 'Ball', 'Water bottle']);
	});

	it('never mentions an activity the customer did not select', () => {
		const plan = generateTransitionPlan({ activities: 'Swimming (Tuesday)' });
		const haystack = allStrings(plan).join(' | ').toLowerCase();
		expect(haystack).not.toContain('soccer');
		expect(haystack).not.toContain('karate');
		expect(haystack).not.toContain('piano');
	});

	it('gives an unrecognized activity a sensible generic gear list instead of dropping it', () => {
		const plan = generateTransitionPlan({ activities: 'Rock climbing' });
		expect(plan.activities).toHaveLength(1);
		expect(plan.activities[0].gear).toEqual(['Rock climbing gear', 'Water bottle']);
	});

	it('surfaces custom items and safely wraps very long custom text without dropping it', () => {
		const plan = generateTransitionPlan({ customItems: 'Retainer case, A very long custom item description that keeps going and going and going and going' });
		expect(plan.otherEssentials).toContain('Retainer case');
		const long = plan.otherEssentials.find((item) => item.startsWith('A very long'));
		expect(long).toBeDefined();
		expect(long!.length).toBeLessThanOrEqual(80);
	});

	it('deduplicates a custom item that already exists in the baseline lists', () => {
		const plan = generateTransitionPlan({ customItems: 'toothbrush & toothpaste, Water bottle', glasses: 'yes' });
		// otherEssentials is deduped against keepAtBothHomes/travelsEveryTime — decisionRows
		// legitimately echoes items from those two lists again in its own table, so the
		// no-duplicates guarantee only applies within these three source lists.
		const sourceLists = [...plan.keepAtBothHomes, ...plan.travelsEveryTime, ...plan.otherEssentials].map((s) => s.toLowerCase());
		const toothbrushCount = sourceLists.filter((s) => s === 'toothbrush & toothpaste').length;
		expect(toothbrushCount).toBe(1);
		expect(plan.otherEssentials).not.toContain('toothbrush & toothpaste');
	});
});

describe('generateTransitionPlan — missing data stays honest', () => {
	it('produces no empty-string items, and no undefined/null/NaN leaking into any field', () => {
		const plan = generateTransitionPlan({});
		for (const value of allStrings(plan)) {
			expect(value.trim().length).toBeGreaterThan(0);
			expect(value).not.toMatch(/undefined|null|NaN|\[object/i);
		}
	});

	it('never invents a school day, activity, or comfort item the customer did not give', () => {
		const plan = generateTransitionPlan({ childName: 'Sam' });
		expect(plan.schoolDays).toBeUndefined();
		expect(plan.hasSchoolInfo).toBe(false);
		expect(plan.activities).toEqual([]);
		expect(plan.schoolBagItems).toEqual([]);
	});

	it('still produces a usable, non-empty plan from an almost-blank questionnaire', () => {
		const plan = generateTransitionPlan({ childAgeRange: '' });
		expect(plan.keepAtBothHomes.length).toBeGreaterThan(0);
		expect(plan.travelsEveryTime.length).toBeGreaterThan(0);
		expect(plan.switchDayChecklist.length).toBeGreaterThan(0);
		expect(plan.kidFriendlyChecklist.length).toBeGreaterThan(0);
		expect(plan.includeMasterPage).toBe(false);
	});
});

describe('generateTransitionPlan — content integrity', () => {
	it('frames medication as an adult responsibility, without naming a specific parent', () => {
		const plan = generateTransitionPlan({ childName: 'Sam' });
		const medicationLine = plan.beforeLeavingChecklist.find((line) => /medication/i.test(line));
		expect(medicationLine).toBeDefined();
		expect(medicationLine).toMatch(/adult/i);
		expect(medicationLine).not.toMatch(/\bmom\b|\bdad\b|\bmother\b|\bfather\b/i);
	});

	it('never uses "second home" or similar non-neutral phrasing, even with custom labels', () => {
		const plan = generateTransitionPlan({
			childName: 'Sam',
			homeOneLabel: "Mum's home",
			homeTwoLabel: "Dad's home",
			customItems: 'Retainer case',
			comfortItem: 'Blanket',
		});
		const haystack = allStrings(plan).join(' | ').toLowerCase();
		expect(haystack).not.toContain('second home');
		expect(haystack).not.toContain("left it at");
	});

	it('only recommends the condensed master page once there is real personalization behind it', () => {
		const sparse = generateTransitionPlan({ childAgeRange: '6-8' });
		expect(sparse.includeMasterPage).toBe(false);

		const rich: TwoHomeAnswers = { childName: 'Riley', transitionFrequency: 'Every other week', comfortItem: 'Teddy bear', schoolDevice: 'iPad' };
		expect(generateTransitionPlan(rich).includeMasterPage).toBe(true);
	});
});

describe('generateTransitionPlan — stays/travels never contradict', () => {
	const CONTESTED_ITEMS = ['toothbrush & toothpaste', 'pajamas', 'a few days of underwear & socks', 'basic toiletries (hairbrush, soap)', 'water bottle'];

	it('keepAtBothHomes and travelsEveryTime are always disjoint, for the specific items customers flagged as duplicated', () => {
		const plan = generateTransitionPlan({
			childName: 'Sam',
			glasses: 'yes',
			schoolDevice: 'iPad',
			electronics: 'Phone charger',
			comfortItem: 'Blanket',
			customItems: 'Toothbrush, Pajamas, Water bottle',
		});
		const staysLower = new Set(plan.keepAtBothHomes.map((s) => s.toLowerCase()));
		const travelsLower = new Set(plan.travelsEveryTime.map((s) => s.toLowerCase()));
		const otherLower = new Set(plan.otherEssentials.map((s) => s.toLowerCase()));

		for (const item of CONTESTED_ITEMS) {
			const inStays = staysLower.has(item);
			const inTravels = travelsLower.has(item) || otherLower.has(item);
			expect(inStays && inTravels).toBe(false);
		}
		// A charger is a genuine "travels" item and must never be duplicated into "stays."
		expect(plan.travelsEveryTime.some((s) => /charger/i.test(s))).toBe(true);
		expect(plan.keepAtBothHomes.some((s) => /charger/i.test(s))).toBe(false);
	});

	it('recognizes a re-typed alias of a baseline "stays" item ("Toothbrush" vs. "Toothbrush & toothpaste") instead of listing it as a near-duplicate travel item', () => {
		// The literal customer scenario that surfaced this gap: typing a
		// bare "Toothbrush" as a custom item doesn't exact-string-match the
		// baseline "Toothbrush & toothpaste" line, so naive dedup lets it
		// through — reading, in effect, as a contradiction across pages.
		const plan = generateTransitionPlan({ childName: 'Riley', customItems: 'Toothbrush, Pajamas, Water bottle' });
		expect(plan.otherEssentials.some((item) => /toothbrush/i.test(item))).toBe(false);
		expect(plan.otherEssentials.some((item) => /^pajamas?$/i.test(item))).toBe(false);
		// A genuinely different custom item must still survive the alias filter.
		const plan2 = generateTransitionPlan({ childName: 'Riley', customItems: 'Toothbrush, Retainer case' });
		expect(plan2.otherEssentials).toContain('Retainer case');
	});

	it('the What Travels page never re-lists an item the plan already marks as staying at both homes', () => {
		// Regression test for a real bug: the travels page briefly sourced a
		// "Clothing" section from keepAtBothHomes, so a customer would see
		// "Toothbrush & toothpaste" checked off as staying on page 2, then
		// checked off again as something that travels on page 3.
		const plan = generateTransitionPlan({ childName: 'Sam', schoolDays: 'Mon-Fri', schoolUniform: 'yes' });
		const staysLower = new Set(plan.keepAtBothHomes.map((s) => s.toLowerCase()));
		const travelsPageItems = [...plan.schoolBagItems, ...plan.travelsEveryTime, ...plan.otherEssentials].map((s) => s.toLowerCase());
		for (const item of travelsPageItems) {
			expect(staysLower.has(item)).toBe(false);
		}
	});
});

describe('generateTransitionPlan — the "personalized" claim is accurate', () => {
	it('is not personalized when the questionnaire is essentially empty', () => {
		expect(generateTransitionPlan({}).isPersonalized).toBe(false);
		expect(generateTransitionPlan({ childAgeRange: '6-8' }).isPersonalized).toBe(false);
	});

	it('becomes personalized as soon as one real answer materially shapes the output', () => {
		expect(generateTransitionPlan({ childName: 'Sam' }).isPersonalized).toBe(true);
		expect(generateTransitionPlan({ schoolDays: 'Mon-Fri' }).isPersonalized).toBe(true);
		expect(generateTransitionPlan({ activities: 'Swimming (Tuesday)' }).isPersonalized).toBe(true);
		expect(generateTransitionPlan({ customItems: 'Retainer case' }).isPersonalized).toBe(true);
	});
});

describe('generateTransitionPlan — safe text handling', () => {
	it('strips control characters and unrenderable glyphs from customer-entered text', () => {
		const plan = generateTransitionPlan({ childName: 'Sam ', comfortItem: 'Bl\ranket\n\t💥emoji' });
		expect(plan.childName).toBe('Sam');
		expect(plan.travelsEveryTime.find((item) => item.startsWith('Bl'))).not.toMatch(/[\x00-\x1F\x7F]/);
		expect(allStrings(plan).join('')).not.toMatch(/💥/);
	});

	it('truncates rather than silently drops an overly long field', () => {
		const longName = 'A'.repeat(200);
		const plan = generateTransitionPlan({ childName: longName });
		expect(plan.childName!.length).toBeLessThanOrEqual(40);
		expect(plan.childName!.endsWith('…')).toBe(true);
	});
});
