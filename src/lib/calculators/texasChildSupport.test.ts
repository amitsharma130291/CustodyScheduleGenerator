import { describe, expect, it } from 'vitest';
import {
	calculateTexasChildSupport,
	formatTexasCurrency,
	formatTexasPercentage,
	getTexasChildSupportPercentage,
} from './texasChildSupport';

describe('calculateTexasChildSupport', () => {
	it('calculates one child with no other children supported', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});

		expect(result.deductions.socialSecurityTax).toBe(310);
		expect(result.deductions.medicareTax).toBe(72.5);
		expect(result.deductions.estimatedFederalIncomeTax).toBe(430.13);
		expect(result.totalDeductions).toBe(812.63);
		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(20);
		expect(result.monthlySupport).toBe(837.47);
		expect(result.formula).toBe('$4,187.37 x 20% = $837.47');
	});

	it('calculates two children with no other children supported', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 2,
			otherChildrenSupported: 0,
		});

		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(25);
		expect(result.monthlySupport).toBe(1046.84);
	});

	it('uses the other-children adjustment table and reduces support', () => {
		const withoutOtherChildren = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 1,
		});

		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(17.5);
		expect(result.monthlySupport).toBe(732.79);
		expect(result.monthlySupport).toBeLessThan(withoutOtherChildren.monthlySupport);
		expect(result.hasOtherChildrenAdjustment).toBe(true);
	});

	it('uses the low-income rule under 1000 net resources', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 900,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});

		expect(result.isLowIncome).toBe(true);
		expect(result.netResources).toBe(831.15);
		expect(result.guidelinePercentage).toBe(15);
		expect(result.monthlySupport).toBe(124.67);
	});

	it('calculates three children with two other children supported', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 8000,
			childrenBeforeCourt: 3,
			otherChildrenSupported: 2,
		});

		expect(result.netResources).toBe(6326.83);
		expect(result.guidelinePercentage).toBe(25.2);
		expect(result.monthlySupport).toBe(1594.36);
	});

	it('floors net resources at zero', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 500,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			monthlyUnionDues: 1000,
		});

		expect(result.netResources).toBe(0);
		expect(result.monthlySupport).toBe(0);
	});

	it('uses 40% for six or more children with no other children supported', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 6,
			otherChildrenSupported: 0,
		});

		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(40);
		expect(result.monthlySupport).toBe(1674.95);
	});

	it('uses the highest available adjustment for one child when other children exceed the table', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 4,
		});

		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(14.75);
		expect(result.monthlySupport).toBe(617.64);
	});

	it('uses the highest available adjustment for two children when other children exceed the table', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 2,
			otherChildrenSupported: 4,
		});

		expect(result.netResources).toBe(4187.37);
		expect(result.guidelinePercentage).toBe(19);
		expect(result.monthlySupport).toBe(795.6);
	});

	it('advanced deductions reduce net resources', () => {
		const defaultResult = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			monthlyUnionDues: 100,
			monthlyHealthDentalInsurance: 200,
		});

		expect(result.netResources).toBe(defaultResult.netResources - 300);
		expect(result.monthlySupport).toBeLessThan(defaultResult.monthlySupport);
		expect(result.advancedDeductionsUsed).toEqual([
			'Union dues: $100.00',
			'Child health/dental insurance: $200.00',
		]);
	});

	it('rejects negative input values safely', () => {
		expect(() =>
			calculateTexasChildSupport({
				grossIncome: -1,
				childrenBeforeCourt: 1,
				otherChildrenSupported: 0,
			}),
		).toThrow('Monthly gross income must be zero or greater.');
		expect(() =>
			calculateTexasChildSupport({
				grossIncome: 5000,
				childrenBeforeCourt: 1,
				otherChildrenSupported: -1,
			}),
		).toThrow('Other children supported must be zero or greater.');
		expect(() =>
			calculateTexasChildSupport({
				grossIncome: 5000,
				childrenBeforeCourt: 0 as 1,
				otherChildrenSupported: 0,
			}),
		).toThrow('Children before the court must be at least 1.');
		expect(() =>
			calculateTexasChildSupport({
				grossIncome: 5000,
				childrenBeforeCourt: 1,
				otherChildrenSupported: 0,
				monthlyUnionDues: -10,
			}),
		).toThrow('Monthly union dues must be zero or greater.');
	});

	it('removes Social Security tax and allows mandatory retirement when selected', () => {
		const defaultResult = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			doesNotPaySocialSecurity: true,
			monthlyMandatoryRetirement: 150,
		});

		expect(result.deductions.socialSecurityTax).toBe(0);
		expect(result.deductions.monthlyMandatoryRetirement).toBe(150);
		expect(result.netResources).toBe(defaultResult.netResources + 160);
	});

	it('deducts Social Security and Medicare for the default Texas child support example', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 5000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
		});

		expect(result.deductions.socialSecurityTax).toBe(310);
		expect(result.deductions.medicareTax).toBe(72.5);
		expect(result.deductions.estimatedFederalIncomeTax).toBe(430.13);
		expect(result.totalDeductions).toBe(812.63);
		expect(result.netResources).toBe(4187.37);
		expect(result.monthlySupport).toBe(837.47);
	});

	it('keeps Medicare and allows retirement when Social Security exception is checked', () => {
		const result = calculateTexasChildSupport({
			grossIncome: 6000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			monthlyUnionDues: 5,
			monthlyHealthDentalInsurance: 10,
			doesNotPaySocialSecurity: true,
			monthlyMandatoryRetirement: 20,
		});

		expect(result.deductions.socialSecurityTax).toBe(0);
		expect(result.deductions.medicareTax).toBe(87);
		expect(result.deductions.estimatedFederalIncomeTax).toBe(621.17);
		expect(result.deductions.monthlyUnionDues).toBe(5);
		expect(result.deductions.monthlyHealthDentalInsurance).toBe(10);
		expect(result.deductions.monthlyMandatoryRetirement).toBe(20);
		expect(result.totalDeductions).toBe(743.17);
		expect(result.netResources).toBe(5256.83);
		expect(result.monthlySupport).toBe(1051.37);
	});

	it('does not count mandatory retirement unless Social Security exception is checked', () => {
		const withoutRetirement = calculateTexasChildSupport({
			grossIncome: 6000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			monthlyUnionDues: 5,
			monthlyHealthDentalInsurance: 10,
			doesNotPaySocialSecurity: false,
			monthlyMandatoryRetirement: 20,
		});
		const expected = calculateTexasChildSupport({
			grossIncome: 6000,
			childrenBeforeCourt: 1,
			otherChildrenSupported: 0,
			monthlyUnionDues: 5,
			monthlyHealthDentalInsurance: 10,
			doesNotPaySocialSecurity: false,
		});

		expect(withoutRetirement.deductions.monthlyMandatoryRetirement).toBe(0);
		expect(withoutRetirement.totalDeductions).toBe(expected.totalDeductions);
		expect(withoutRetirement.netResources).toBe(expected.netResources);
	});

	it('uses the highest available adjustment instead of falling back to standard percentage', () => {
		expect(
			getTexasChildSupportPercentage({
				childrenBeforeCourt: 4,
				otherChildrenSupported: 4,
				netResources: 5000,
			}),
		).toBe(29.75);
	});

	it('formats currency and percentages for display', () => {
		expect(formatTexasCurrency(1764)).toBe('$1,764.00');
		expect(formatTexasPercentage(25.2)).toBe('25.2%');
		expect(formatTexasPercentage(20)).toBe('20%');
	});
});
