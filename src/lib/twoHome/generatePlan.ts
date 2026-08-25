/**
 * Turns the Two-Home questionnaire answers into a structured transition
 * plan. Pure, deterministic, and DOM-free — runs the same in the browser
 * (immediate download after purchase) and in a Cloudflare Function
 * (server-side regeneration for the delivery email).
 *
 * Personalization is the whole point of this module: every section starts
 * from a small, honest baseline (never invented specifics — see
 * dedupeAgainst and the comments below) and layers in only what the
 * customer actually told us. Nothing here should read as generic filler
 * once real answers are supplied, and nothing here should silently
 * fabricate a fact (a schedule, a location, an item) the customer never
 * gave us.
 */

const MAX_NAME_LENGTH = 40;
const MAX_LABEL_LENGTH = 30;
const MAX_SHORT_FIELD_LENGTH = 80;
const MAX_LONG_FIELD_LENGTH = 240;

export interface TwoHomeAnswers {
	childName?: string;
	childAgeRange?: string;
	/** Customer-chosen label for each home — "Mum's home", "Home 1", etc. Defaults to neutral "Home 1" / "Home 2" when blank; never assumes a parent role. */
	homeOneLabel?: string;
	homeTwoLabel?: string;
	/** Free text — "Every other week", "Wed/Thu + alternating weekends". Never inferred from the calendar; only used if the customer states it here. */
	transitionFrequency?: string;
	schoolDays?: string;
	schoolUniform?: string; // 'yes' | 'no' | ''
	schoolDevice?: string;
	/** "Swimming (Tuesday), Soccer (Saturday)" — day is optional per activity. */
	activities?: string;
	electronics?: string;
	glasses?: string; // 'yes' | 'no' | ''
	comfortItem?: string;
	clothingStocked?: string; // 'none' | 'some' | 'most' | ''
	/** Free text list — parent-entered items not covered by the structured questions above. */
	customItems?: string;
	/** Free text — "what's hardest to remember or pack" — surfaced as a highlighted callout, not folded silently into a generic list. */
	packingDifficulty?: string;
}

export interface ActivityPlan {
	name: string;
	day?: string;
	gear: string[];
}

export interface DecisionRow {
	item: string;
	suggestion: 'both' | 'travels' | '';
}

export interface TransitionPlan {
	childName?: string;
	childDisplayName: string; // "Jamie" or "your child" — always safe to interpolate directly
	childAgeRange?: string;
	homeOneLabel: string;
	homeTwoLabel: string;
	transitionFrequency?: string;
	schoolDays?: string;
	hasSchoolInfo: boolean;
	activities: ActivityPlan[];
	packingDifficulty?: string;

	keepAtBothHomes: string[];
	/** Combined travel list, in a stable presentation order — used where a single flat list is wanted (the decision table, the master page). For category-aware rendering, use electronicsItems / comfortTravelItems / everydayTravelEssentials instead, which is where each of these entries actually came from. */
	travelsEveryTime: string[];
	/** Devices and chargers specifically — a "school backpack" or "water bottle" is a genuine everyday essential, not electronics, and doesn't belong in this list. */
	electronicsItems: string[];
	/** The customer's named comfort item, as its own single-item list so it's not stranded under an "Electronics" heading. */
	comfortTravelItems: string[];
	/** Everything that travels every time but isn't electronics or the comfort item — school backpack, glasses, water bottle. */
	everydayTravelEssentials: string[];
	otherEssentials: string[];
	schoolBagItems: string[];

	switchDayChecklist: string[];
	beforeLeavingChecklist: string[];
	afterArrivalChecklist: string[];

	decisionRows: DecisionRow[];

	kidFriendlyChecklist: string[];
	kidFriendlyIsSimplified: boolean;

	buyTwoGuidance: string[];
	moveItGuidance: string[];
	handoffTips: string[];
	homeSetupChecklist: string[];
	seasonalReminders: { season: string; items: string[] }[];
	notes: string[];

	/** Only true once there's enough real personalization to make a condensed, standalone master page worthwhile — never generated for a near-empty questionnaire. */
	includeMasterPage: boolean;
	/** True once at least one real questionnaire answer materially shapes the output — gates whether the cover page is allowed to say "personalized" at all. */
	isPersonalized: boolean;
}

function truncate(value: string, maxLength: number): string {
	return value.length > maxLength ? `${value.slice(0, maxLength - 1).trimEnd()}…` : value;
}

/**
 * pdf-lib's standard fonts use WinAnsi encoding and throw at render time on
 * anything outside it (emoji, most non-Latin scripts, some punctuation).
 * Since PDF content here is built from live, client-editable form state,
 * this is the actual safety boundary — not "PDF injection" in the raw
 * markup sense (pdf-lib's drawText API can't be broken out of), but a
 * customer typing an emoji or unusual character must never crash
 * generation. Strip anything outside a safe, WinAnsi-compatible range.
 */
function sanitizeText(value: string): string {
	return value
		.normalize('NFC')
		.replace(/[\r\n\t]+/g, ' ')
		.replace(/[\x00-\x1F\x7F]/g, '')
		.replace(/[^\x20-\x7E\xA0-\xFF‘’“”–—…]/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

function clean(value: string | undefined, maxLength = MAX_SHORT_FIELD_LENGTH): string {
	if (!value) return '';
	return truncate(sanitizeText(value), maxLength);
}

function capitalize(text: string): string {
	return text.length ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function formatList(items: string[]): string {
	if (items.length <= 1) return items[0] ?? '';
	if (items.length === 2) return `${items[0]} and ${items[1]}`;
	return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/** Splits a comma-separated list, tolerant of "and" as a final-item separator, without splitting inside parentheses (activity day annotations). */
function splitTopLevel(value: string): string[] {
	const parts: string[] = [];
	let depth = 0;
	let current = '';
	for (const char of value) {
		if (char === '(') depth += 1;
		if (char === ')') depth = Math.max(0, depth - 1);
		if (char === ',' && depth === 0) {
			parts.push(current);
			current = '';
		} else {
			current += char;
		}
	}
	if (current) parts.push(current);
	return parts
		.flatMap((part) => (part.includes('(') ? [part] : part.split(/\s+and\s+/i)))
		.map((part) => part.trim())
		.filter(Boolean);
}

function splitList(value?: string): string[] {
	if (!value) return [];
	return splitTopLevel(sanitizeText(value));
}

// A bounded, explicit alias list for the specific items families most often
// re-type in their own words — "toothbrush" for the baseline "Toothbrush &
// toothpaste" line, "pjs" for "Pajamas", and so on. Deliberately whole-word
// pattern matches on a fixed, named set (not general fuzzy/substring
// matching), so a genuinely different item — "tooth fairy pillow", say —
// is never mistaken for one of these and silently dropped.
const STAYS_BASELINE_ALIASES: RegExp[] = [
	/\btooth\s*brush\b/i,
	/\btooth\s*paste\b/i,
	/\bpajamas?\b/i,
	/\bpjs?\b/i,
	/\bunderwear\b/i,
	/\bsocks?\b/i,
	/\beveryday\s+(outfit|clothes|clothing)\b/i,
	/\btoiletries\b/i,
	/\bhairbrush\b/i,
];

/** Drops a custom item that's just a re-typed version of one of the baseline "stays at both homes" items, so it never resurfaces on the What Travels page looking like a contradiction. */
function excludeStaysBaselineAliases(items: string[]): string[] {
	return items.filter((item) => !STAYS_BASELINE_ALIASES.some((pattern) => pattern.test(item)));
}

/** Case-insensitive removal of any item already present in one of the given lists — keeps a custom-typed "toothbrush" from duplicating the baseline "Toothbrush & toothpaste" entry, for example. */
function dedupeAgainst(newItems: string[], existingLists: string[][]): string[] {
	const existingLower = new Set(existingLists.flat().map((item) => item.toLowerCase()));
	const seen = new Set<string>();
	const result: string[] = [];
	for (const item of newItems) {
		const key = item.toLowerCase();
		if (existingLower.has(key) || seen.has(key)) continue;
		seen.add(key);
		result.push(item);
	}
	return result;
}

const ACTIVITY_GEAR: Array<{ keywords: string[]; gear: string[] }> = [
	{ keywords: ['swim'], gear: ['Swimsuit', 'Towel', 'Goggles', 'Water bottle'] },
	{ keywords: ['soccer', 'football'], gear: ['Cleats', 'Shin guards', 'Ball', 'Water bottle'] },
	{ keywords: ['basketball'], gear: ['Basketball shoes', 'Water bottle'] },
	{ keywords: ['baseball', 'softball'], gear: ['Glove', 'Cleats', 'Water bottle'] },
	{ keywords: ['piano', 'music', 'guitar', 'violin', 'band', 'orchestra'], gear: ['Instrument (if not kept at the lesson location)', 'Sheet music or method book'] },
	{ keywords: ['dance', 'ballet'], gear: ['Dance shoes', 'Practice clothes', 'Hair ties'] },
	{ keywords: ['gymnastics'], gear: ['Leotard', 'Grips, if used'] },
	{ keywords: ['tutor'], gear: ['Workbook or folder', 'Pencils'] },
	{ keywords: ['martial art', 'karate', 'taekwondo', 'judo'], gear: ['Uniform (gi)', 'Belt', 'Water bottle'] },
	{ keywords: ['scout'], gear: ['Uniform or vest', 'Handbook'] },
	{ keywords: ['overnight', 'sleepover'], gear: ['Pajamas', 'Toothbrush', 'A change of clothes'] },
];

function getActivityGear(name: string): string[] {
	const lower = name.toLowerCase();
	const match = ACTIVITY_GEAR.find((entry) => entry.keywords.some((keyword) => lower.includes(keyword)));
	return match ? match.gear : [`${name} gear`, 'Water bottle'];
}

/** Parses "Swimming (Tuesday), Soccer" into structured entries with per-activity gear. Unrecognized activity names still get a sensible generic gear list rather than being dropped. */
function parseActivities(value?: string): ActivityPlan[] {
	return splitList(value)
		.map((entry) => {
			const match = entry.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
			const rawName = match ? match[1] : entry;
			const name = capitalize(clean(rawName, 40));
			const day = match ? capitalize(clean(match[2], 20)) : undefined;
			return name ? { name, day, gear: getActivityGear(name) } : null;
		})
		.filter((entry): entry is ActivityPlan => entry !== null)
		.slice(0, 8);
}

export function generateTransitionPlan(answers: TwoHomeAnswers): TransitionPlan {
	const childName = clean(answers.childName, MAX_NAME_LENGTH);
	const childDisplayName = childName || 'your child';
	const childAgeRange = clean(answers.childAgeRange, 12);
	const homeOneLabel = clean(answers.homeOneLabel, MAX_LABEL_LENGTH) || 'Home 1';
	const homeTwoLabel = clean(answers.homeTwoLabel, MAX_LABEL_LENGTH) || 'Home 2';
	const transitionFrequency = clean(answers.transitionFrequency, MAX_SHORT_FIELD_LENGTH);
	const schoolDays = clean(answers.schoolDays, 40);
	const schoolDevice = clean(answers.schoolDevice, MAX_SHORT_FIELD_LENGTH);
	const comfortItem = clean(answers.comfortItem, MAX_SHORT_FIELD_LENGTH);
	const packingDifficulty = clean(answers.packingDifficulty, MAX_LONG_FIELD_LENGTH);
	const activities = parseActivities(answers.activities);
	const electronicsList = splitList(answers.electronics).map((item) => capitalize(clean(item, MAX_SHORT_FIELD_LENGTH)));
	const customItemsList = splitList(answers.customItems)
		.map((item) => capitalize(clean(item, MAX_SHORT_FIELD_LENGTH)))
		.filter(Boolean)
		.slice(0, 10);
	const hasSchoolInfo = Boolean(schoolDays || schoolDevice || answers.schoolUniform === 'yes');

	// --- What stays at each home -----------------------------------------
	const keepAtBothHomes = [
		'Toothbrush & toothpaste',
		'Pajamas',
		'A few days of underwear & socks',
		'An everyday outfit',
		'Basic toiletries (hairbrush, soap)',
		'A weather-appropriate jacket or sweater',
	];
	if (answers.schoolUniform === 'yes') keepAtBothHomes.push('A spare uniform piece, in case of mix-ups');

	// --- What travels every time -------------------------------------------
	// Kept as distinct category lists rather than one flat list, so a page
	// can put a device under "Electronics" and a water bottle under
	// "Everyday essentials" instead of lumping everything travel-related
	// under one (usually electronics-labeled) heading.
	const electronicsItems: string[] = [];
	if (schoolDevice) electronicsItems.push(schoolDevice);
	electronicsItems.push(...electronicsList);

	const comfortTravelItems: string[] = comfortItem ? [comfortItem] : [];

	const everydayTravelEssentials: string[] = [];
	if (schoolDays || hasSchoolInfo) everydayTravelEssentials.push('School backpack');
	if (answers.glasses === 'yes') everydayTravelEssentials.push('Glasses (or contact lens case)');
	everydayTravelEssentials.push('Water bottle'); // always present, so travelsEveryTime is never empty

	const travelsEveryTime: string[] = [...everydayTravelEssentials, ...electronicsItems, ...comfortTravelItems];

	const otherEssentials = excludeStaysBaselineAliases(dedupeAgainst(customItemsList, [keepAtBothHomes, travelsEveryTime]));

	const schoolBagItems: string[] = [];
	if (schoolDays) schoolBagItems.push(`Signed forms or homework (school days: ${schoolDays})`);
	else if (hasSchoolInfo) schoolBagItems.push('Signed forms or homework');
	if (answers.schoolUniform === 'yes') schoolBagItems.push('Uniform, clean and ready');
	if (schoolDevice) schoolBagItems.push(`${schoolDevice}, charged`);

	// --- Transition routine -------------------------------------------------
	const switchDayChecklist = ["Check tomorrow's schedule", 'Pack school and activity items', 'Check the weather'];
	if (schoolDevice || electronicsList.length) switchDayChecklist.push('Charge required devices');
	switchDayChecklist.push('Place the transition bag by the door');
	if (otherEssentials.length) switchDayChecklist.push(...otherEssentials.map((item) => `Add ${item.toLowerCase()}`).slice(0, 2));

	const beforeLeavingChecklist = ['Check the master travel list on the previous page', 'Collect school forms or homework'];
	if (activities.length) beforeLeavingChecklist.push('Confirm activity equipment for any upcoming practice or lesson');
	beforeLeavingChecklist.push('Check adult-managed medication, if applicable');
	if (comfortItem) beforeLeavingChecklist.push(`Add ${comfortItem.toLowerCase()}`);
	if (otherEssentials.length) beforeLeavingChecklist.push('Add any custom items from the list');

	const afterArrivalChecklist = [
		'Put travel items in their usual place',
		'Return the transition bag to its storage spot',
		hasSchoolInfo ? 'Prepare anything needed for the next school day' : 'Prepare anything needed for the next few days',
	];

	// --- Buy two or move it? -------------------------------------------------
	const decisionRows: DecisionRow[] = [
		...keepAtBothHomes.slice(0, 5).map((item): DecisionRow => ({ item, suggestion: 'both' })),
		...travelsEveryTime.slice(0, 4).map((item): DecisionRow => ({ item, suggestion: 'travels' })),
		...activities.slice(0, 2).map((activity): DecisionRow => ({ item: `${activity.name} gear`, suggestion: 'travels' })),
	];

	// --- Kid-friendly checklist ----------------------------------------------
	const kidFriendlyChecklist: string[] = [];
	if (schoolDays || hasSchoolInfo) kidFriendlyChecklist.push('My backpack');
	if (comfortItem) kidFriendlyChecklist.push(comfortItem);
	if (schoolDevice) kidFriendlyChecklist.push(schoolDevice);
	if (answers.glasses === 'yes') kidFriendlyChecklist.push('My glasses');
	activities.forEach((activity) => kidFriendlyChecklist.push(`My ${activity.name.toLowerCase()} gear`));
	if (!kidFriendlyChecklist.length) {
		// Minimal-data fallback — generic prompts that apply to nearly any
		// family, not a thin 2-item page. Still never claims a specific fact
		// (no invented activity, device, or comfort item).
		kidFriendlyChecklist.push('My backpack', 'My water bottle', 'My homework or reading', 'My jacket or weather item', 'Something needed for activities', 'My comfort item');
	}
	const kidFriendlyIsSimplified = ['Under 3', '3-5', '6-8'].includes(childAgeRange);

	// --- Duplicate-vs-move guidance ------------------------------------------
	const buyTwoGuidance = ['Cheap and used every day — toothbrush, pajamas, everyday clothes, hairbrush.', 'Easy to forget — a spare charger at each home avoids the last-minute scramble.'];
	if (answers.schoolUniform === 'yes') buyTwoGuidance.push('A spare uniform piece, so a wash-day mix-up never means missing school.');
	buyTwoGuidance.push('Anything replacing it is cheaper than the stress of forgetting it.');

	const moveItGuidance = ['Expensive or specialized — laptops, musical instruments, sports equipment.', 'Needed for one specific place — school backpack, library books, signed forms.'];
	moveItGuidance.push(
		comfortItem
			? `Emotionally important — ${comfortItem.toLowerCase()} should travel, not get duplicated.`
			: 'Emotionally important — a favorite stuffed animal or blanket should travel, not get duplicated.',
	);
	if (activities.length) moveItGuidance.push(`Activity-specific — ${formatList(activities.map((activity) => activity.name))} gear only exists in one place at a time, so it has to move.`);

	const handoffTips = [
		'Pack the night before, not the morning of — mornings are rushed enough already.',
		'Use the same bag every time, so nothing gets lost in the shuffle.',
		`Keep a copy of this checklist at ${homeOneLabel} and ${homeTwoLabel} — inside a closet door works well.`,
		'A consistent goodbye routine helps transitions feel normal instead of stressful.',
		'Revisit this list every few months — what a kid needs changes fast as they grow.',
	];

	const homeSetupChecklist = [
		"A drawer, shelf, or small space that's just theirs",
		'A few favorite toys, books, or games that live here permanently — no packing required',
		'A nightlight or bedtime comfort item, if they use one',
		'A photo of important people or pets from the other home',
		'A favorite snack or drink, stocked and ready',
	];

	const seasonalReminders = [
		{ season: 'Warm weather', items: ['Swimsuit & towel', 'Sunscreen', 'Sandals or water shoes'] },
		{ season: 'Cold weather', items: ['Winter coat', 'Hat & gloves', 'Boots'] },
		{ season: 'Rainy weather', items: ['Rain jacket', 'A spare pair of shoes'] },
	];

	const notes: string[] = [];
	if (answers.clothingStocked === 'none') {
		notes.push(`Clothes aren't stocked at both homes yet — starting with a few basics at ${homeOneLabel} and ${homeTwoLabel} means less has to travel every switch.`);
	} else if (answers.clothingStocked === 'some') {
		notes.push('Some clothing is already stocked at both homes — building on that keeps fewer items on the road.');
	}

	// A condensed, standalone master page is only worth generating once
	// there's real personalization behind it — otherwise it would just
	// duplicate the same generic baseline already shown on earlier pages.
	const personalizationSignals = [
		childName,
		transitionFrequency,
		comfortItem,
		schoolDevice,
		packingDifficulty,
		schoolDays,
		activities.length > 0,
		customItemsList.length > 0,
		electronicsList.length > 0,
	].filter(Boolean).length;
	const includeMasterPage = personalizationSignals >= 3;
	const isPersonalized = personalizationSignals >= 1;

	return {
		childName: childName || undefined,
		childDisplayName,
		childAgeRange: childAgeRange || undefined,
		homeOneLabel,
		homeTwoLabel,
		transitionFrequency: transitionFrequency || undefined,
		schoolDays: schoolDays || undefined,
		hasSchoolInfo,
		activities,
		packingDifficulty: packingDifficulty || undefined,
		keepAtBothHomes,
		travelsEveryTime,
		electronicsItems,
		comfortTravelItems,
		everydayTravelEssentials,
		otherEssentials,
		schoolBagItems,
		switchDayChecklist,
		beforeLeavingChecklist,
		afterArrivalChecklist,
		decisionRows,
		kidFriendlyChecklist,
		kidFriendlyIsSimplified,
		buyTwoGuidance,
		moveItGuidance,
		handoffTips,
		homeSetupChecklist,
		seasonalReminders,
		notes,
		includeMasterPage,
		isPersonalized,
	};
}
