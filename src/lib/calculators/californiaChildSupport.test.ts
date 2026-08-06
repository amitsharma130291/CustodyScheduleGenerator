import { describe, expect, it } from 'vitest';
import {
	calculateCaliforniaChildSupport,
	formatCaliforniaCurrency,
	getCaliforniaChildFactor,
	getCaliforniaKFactor,
} from './californiaChildSupport';

describe('getCaliforniaKFactor', () => {
	it('returns 0.25 for low combined income', () => {
		expect(getCaliforniaKFactor(2000)).toBe(0.25);
	});

	it('returns 0.24 for mid-low combined income', () => {
		expect(getCaliforniaKFactor(4000)).toBe(0.24);
	});

	it('returns 0.22 for mid combined income', () => {
		expect(getCaliforniaKFactor(8000)).toBe(0.22);
	});

	it('returns 0.20 for high combined income', () => {
		expect(getCaliforniaKFactor(12000)).toBe(0.20);
	});
});

describe('getCaliforniaChildFactor', () => {
	it('returns 1.0 for 1 child', () => {
		expect(getCaliforniaChildFactor(1)).toBe(1.0);
	});

	it('returns 1.6 for 2 children', () => {
		expect(getCaliforniaChildFactor(2)).toBe(1.6);
	});

	it('returns 2.0 for 3 children', () => {
		expect(getCaliforniaChildFactor(3)).toBe(2.0);
	});

	it('returns 2.5 for 5+ children', () => {
		expect(getCaliforniaChildFactor(5)).toBe(2.5);
	});
});

describe('calculateCaliforniaChildSupport', () => {
	it('identifies high earner correctly (Parent B earns more)', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 73,
		});
		expect(result.highEarnerIsParentB).toBe(true);
		expect(result.highEarnerNet).toBe(8000);
	});

	it('identifies high earner correctly (Parent A earns more)', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 8000,
			netIncomeB: 4000,
			numberOfChildren: 1,
			parentBOvernights: 73,
		});
		expect(result.highEarnerIsParentB).toBe(false);
		expect(result.highEarnerNet).toBe(8000);
	});

	it('calculates support for 1 child, Parent B is high earner', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100, // ~27% timeshare for Parent B
		});

		expect(result.totalNet).toBe(12000);
		expect(result.kFactor).toBe(0.20);
		expect(result.childFactor).toBe(1.0);
		expect(result.adjustedSupport).toBeGreaterThan(0);
		expect(result.payerIsParentB).toBe(true);
	});

	it('support decreases as high earner timeshare increases', () => {
		const low = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 50,
		});
		const high = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 150,
		});

		expect(high.adjustedSupport).toBeLessThan(low.adjustedSupport);
	});

	it('support is never negative', () => {
		// Very high timeshare should produce zero, not negative
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 365, // 100% timeshare
		});
		expect(result.adjustedSupport).toBeGreaterThanOrEqual(0);
	});

	it('applies child factor for 2 children', () => {
		const one = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
		});
		const two = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 2,
			parentBOvernights: 100,
		});

		expect(two.adjustedSupport).toBeCloseTo(one.adjustedSupport * 1.6, 1);
	});

	it('adds childcare proportionally to Parent B income share', () => {
		const without = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
		});
		const withChildcare = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
			monthlyChildcare: 600,
		});

		// Parent B = 8000/12000 = 66.7% share → ~$400 childcare add-on
		expect(withChildcare.parentBChildcare).toBeCloseTo(400, 0);
		expect(withChildcare.totalMonthlySupport).toBeGreaterThan(without.totalMonthlySupport);
	});

	it('splits uninsured healthcare 50/50', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
			monthlyUninsuredHealthcare: 200,
		});

		expect(result.uninsuredHealthcareEach).toBe(100);
	});

	it('throws on negative income', () => {
		expect(() =>
			calculateCaliforniaChildSupport({
				netIncomeA: -100,
				netIncomeB: 5000,
				numberOfChildren: 1,
				parentBOvernights: 100,
			})
		).toThrow();
	});

	it('throws on invalid overnights', () => {
		expect(() =>
			calculateCaliforniaChildSupport({
				netIncomeA: 4000,
				netIncomeB: 8000,
				numberOfChildren: 1,
				parentBOvernights: 400,
			})
		).toThrow();
	});

	it('returns timeshare effect string', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
		});
		expect(typeof result.timeshareEffect).toBe('string');
		expect(result.timeshareEffect.length).toBeGreaterThan(0);
	});

	it('returns a formula string', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 4000,
			netIncomeB: 8000,
			numberOfChildren: 1,
			parentBOvernights: 100,
		});
		expect(typeof result.formula).toBe('string');
		expect(result.formula.length).toBeGreaterThan(0);
	});

	it('handles equal incomes gracefully', () => {
		const result = calculateCaliforniaChildSupport({
			netIncomeA: 5000,
			netIncomeB: 5000,
			numberOfChildren: 1,
			parentBOvernights: 182,
		});
		expect(result.totalNet).toBe(10000);
		expect(result.adjustedSupport).toBeGreaterThanOrEqual(0);
	});
});

describe('formatCaliforniaCurrency', () => {
	it('formats whole dollars', () => {
		expect(formatCaliforniaCurrency(1234)).toBe('$1,234.00');
	});

	it('formats cents', () => {
		expect(formatCaliforniaCurrency(99.9)).toBe('$99.90');
	});
});
