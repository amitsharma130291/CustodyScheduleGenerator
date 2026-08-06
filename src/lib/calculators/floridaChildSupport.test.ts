import { describe, expect, it } from 'vitest';
import {
	calculateFloridaChildSupport,
	formatFloridaCurrency,
	getFloridaBasicObligation,
} from './floridaChildSupport';

describe('getFloridaBasicObligation', () => {
	it('returns correct value for exact table row: $3,000 combined, 1 child', () => {
		expect(getFloridaBasicObligation(3000, 1)).toBe(584);
	});

	it('returns correct value for exact table row: $5,000 combined, 2 children', () => {
		expect(getFloridaBasicObligation(5000, 2)).toBe(1349);
	});

	it('returns correct value for exact table row: $10,000 combined, 3 children', () => {
		expect(getFloridaBasicObligation(10000, 3)).toBe(2514);
	});

	it('interpolates between table rows', () => {
		// Between $3,000 (584) and $4,000 (756) for 1 child at $3,500
		const result = getFloridaBasicObligation(3500, 1);
		expect(result).toBeGreaterThan(584);
		expect(result).toBeLessThan(756);
		expect(result).toBeCloseTo(670, 0);
	});

	it('handles income below minimum table row', () => {
		const result = getFloridaBasicObligation(400, 1);
		expect(result).toBeGreaterThan(0);
		expect(result).toBeLessThan(170);
	});

	it('handles income above maximum table row', () => {
		const result = getFloridaBasicObligation(30000, 1);
		expect(result).toBe(2220);
	});
});

describe('calculateFloridaChildSupport', () => {
	it('calculates basic support with no overnights, no add-ons', () => {
		// Parent A: $6,500 net, Parent B: $3,500 net, 1 child, 60 overnights
		const result = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
		});

		expect(result.combinedIncome).toBe(10000);
		expect(result.parentBSharePct).toBeCloseTo(35, 0);
		expect(result.basicObligation).toBeCloseTo(1502, 0);
		expect(result.overnightCreditType).toBe('none');
		expect(result.overnightCredit).toBe(0);
		expect(result.minimumApplied).toBe(false);
		expect(result.monthlySupport).toBeGreaterThan(0);
	});

	it('applies 20% overnight credit at 73+ overnights', () => {
		const below73 = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
		});
		const at73 = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 73,
		});

		expect(at73.overnightCreditType).toBe('standard');
		expect(at73.overnightCredit).toBeGreaterThan(0);
		expect(at73.monthlySupport).toBeLessThan(below73.monthlySupport);
	});

	it('applies 50% overnight credit at 110+ overnights', () => {
		const at73 = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 73,
		});
		const at110 = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 110,
		});

		expect(at110.overnightCreditType).toBe('extended');
		expect(at110.overnightCredit).toBeGreaterThan(at73.overnightCredit);
		expect(at110.monthlySupport).toBeLessThan(at73.monthlySupport);
	});

	it('adds childcare proportionally', () => {
		const without = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
		});
		const withChildcare = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
			monthlyChildcare: 400,
		});

		expect(withChildcare.monthlySupport).toBeGreaterThan(without.monthlySupport);
		// Parent B's share of $400 childcare ≈ $140 (35% share)
		expect(withChildcare.parentBChildcare).toBeCloseTo(140, 0);
	});

	it('adds health insurance proportionally', () => {
		const without = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
		});
		const withInsurance = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
			monthlyHealthInsurance: 200,
		});

		expect(withInsurance.monthlySupport).toBeGreaterThan(without.monthlySupport);
	});

	it('applies the $50/child minimum', () => {
		// Very low incomes should hit the minimum
		const result = calculateFloridaChildSupport({
			netIncomeA: 100,
			netIncomeB: 100,
			numberOfChildren: 1,
			parentBOvernights: 0,
		});

		expect(result.minimumApplied).toBe(true);
		expect(result.monthlySupport).toBeGreaterThanOrEqual(50);
	});

	it('applies $50/child minimum for 2 children = $100', () => {
		const result = calculateFloridaChildSupport({
			netIncomeA: 100,
			netIncomeB: 100,
			numberOfChildren: 2,
			parentBOvernights: 0,
		});

		expect(result.minimumApplied).toBe(true);
		expect(result.monthlySupport).toBeGreaterThanOrEqual(100);
	});

	it('calculates for 2 children', () => {
		const result = calculateFloridaChildSupport({
			netIncomeA: 5000,
			netIncomeB: 3000,
			numberOfChildren: 2,
			parentBOvernights: 52,
		});

		expect(result.combinedIncome).toBe(8000);
		expect(result.basicObligation).toBeCloseTo(1915, 0);
		expect(result.monthlySupport).toBeGreaterThan(0);
	});

	it('throws on negative income', () => {
		expect(() =>
			calculateFloridaChildSupport({
				netIncomeA: -100,
				netIncomeB: 3500,
				numberOfChildren: 1,
				parentBOvernights: 60,
			})
		).toThrow();
	});

	it('throws on invalid overnights', () => {
		expect(() =>
			calculateFloridaChildSupport({
				netIncomeA: 5000,
				netIncomeB: 3000,
				numberOfChildren: 1,
				parentBOvernights: 400,
			})
		).toThrow();
	});

	it('returns a formula string', () => {
		const result = calculateFloridaChildSupport({
			netIncomeA: 6500,
			netIncomeB: 3500,
			numberOfChildren: 1,
			parentBOvernights: 60,
		});
		expect(typeof result.formula).toBe('string');
		expect(result.formula.length).toBeGreaterThan(0);
	});
});

describe('formatFloridaCurrency', () => {
	it('formats whole dollars', () => {
		expect(formatFloridaCurrency(1234)).toBe('$1,234.00');
	});

	it('formats cents', () => {
		expect(formatFloridaCurrency(99.9)).toBe('$99.90');
	});
});
