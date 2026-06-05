import { describe, expect, it } from 'vitest';
import {
	buildCustodyPercentageCopyText,
	buildVisitationPercentageInterpretation,
	calculateCustodyPercentage,
} from './custodyPercentage';

describe('calculateCustodyPercentage', () => {
	it('calculates 182 / 365 with one decimal place', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 182,
			parentBOvernights: 183,
		});

		expect(result.parentAPercentage).toBe(49.9);
		expect(result.parentBPercentage).toBe(50.1);
		expect(result.totalOvernights).toBe(365);
	});

	it('returns a clear 50/50 interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 182,
			parentBOvernights: 183,
		});

		expect(result.interpretation).toBe(
			'Parent A has 182 overnights (49.9%). Parent B has 183 overnights (50.1%). This is generally considered a 50/50 parenting time split.',
		);
	});

	it('returns a 60/40 interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 219,
			parentBOvernights: 146,
		});

		expect(result.parentAPercentage).toBe(60);
		expect(result.parentBPercentage).toBe(40);
		expect(result.interpretation).toContain('closer to a 60/40 parenting time split');
	});

	it('returns a 70/30 interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 256,
			parentBOvernights: 109,
		});

		expect(result.parentAPercentage).toBe(70.1);
		expect(result.parentBPercentage).toBe(29.9);
		expect(result.interpretation).toContain('closer to a 70/30 parenting time split');
	});

	it('builds copy results text with percentages and overnights', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 182,
			parentBOvernights: 183,
		});

		expect(
			buildCustodyPercentageCopyText({
				parentAName: 'Parent A',
				parentBName: 'Parent B',
				parentAOvernights: 182,
				parentBOvernights: 183,
				result,
			}),
		).toBe('Parent A: 49.9% — 182 overnights\nParent B: 50.1% — 183 overnights\nTotal overnights: 365');
	});

	it('builds equal parenting time visitation interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 182,
			parentBOvernights: 183,
		});

		expect(
			buildVisitationPercentageInterpretation({
				parentAOvernights: 182,
				parentBOvernights: 183,
				result,
			}),
		).toContain('This is generally considered equal parenting time.');
	});

	it('builds majority parenting time visitation interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 219,
			parentBOvernights: 146,
		});

		expect(
			buildVisitationPercentageInterpretation({
				parentAOvernights: 219,
				parentBOvernights: 146,
				result,
			}),
		).toContain('one parent a majority of parenting time while maintaining significant contact');
	});

	it('builds primary parenting time visitation interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 256,
			parentBOvernights: 109,
		});

		expect(
			buildVisitationPercentageInterpretation({
				parentAOvernights: 256,
				parentBOvernights: 109,
				result,
			}),
		).toContain('one parent primary parenting time');
	});

	it('builds substantial imbalance visitation interpretation', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 292,
			parentBOvernights: 73,
		});

		expect(
			buildVisitationPercentageInterpretation({
				parentAOvernights: 292,
				parentBOvernights: 73,
				result,
			}),
		).toContain('substantial parenting time imbalance');
	});

	it('throws for invalid total overnights', () => {
		expect(() =>
			calculateCustodyPercentage({
				parentAOvernights: 0,
				parentBOvernights: 0,
			}),
		).toThrow(/greater than 0/);
	});

	it('allows zero overnights for one parent', () => {
		const result = calculateCustodyPercentage({
			parentAOvernights: 0,
			parentBOvernights: 365,
		});

		expect(result.parentAPercentage).toBe(0);
		expect(result.parentBPercentage).toBe(100);
		expect(result.totalOvernights).toBe(365);
	});
});
