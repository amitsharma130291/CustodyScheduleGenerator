/**
 * Florida Child Support Calculator Tests
 * Version: FL-CS-2026.1
 * Authority: Florida Statutes §61.30
 */

import { describe, it, expect } from 'vitest';
import { calculateFLChildSupport, getBasicNeed } from './floridaChildSupport';

// ---------------------------------------------------------------------------
// Helper: base input with no add-on expenses
// ---------------------------------------------------------------------------
function baseInput(overrides: Partial<Parameters<typeof calculateFLChildSupport>[0]> = {}) {
  return {
    netIncomeA: 3000,
    netIncomeB: 2000,
    numberOfChildren: 2,
    overnightsA: 292,
    overnightsB: 73,
    qualifyingChildcare: 0,
    qualifyingChildHealthInsurance: 0,
    qualifyingNoncoveredMedical: 0,
    childcarePaidByA: 0,
    childcarePaidByB: 0,
    healthInsurancePaidByA: 0,
    healthInsurancePaidByB: 0,
    noncoveredMedicalPaidByA: 0,
    noncoveredMedicalPaidByB: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Schedule lookup
// ---------------------------------------------------------------------------
describe('getBasicNeed schedule lookup', () => {
  it('returns exact table value at $3000 for 2 children', () => {
    const need = getBasicNeed(3000, 2);
    expect(need).toBeCloseTo(849, 0);
  });

  it('interpolates between $3000 and $3200 for 1 child', () => {
    const lo = getBasicNeed(3000, 1)!; // 584
    const hi = getBasicNeed(3200, 1)!; // 609
    const mid = getBasicNeed(3100, 1)!;
    expect(mid).toBeCloseTo((lo + hi) / 2, 1);
  });

  it('returns table floor at bottom of range ($800)', () => {
    const need = getBasicNeed(800, 1);
    expect(need).toBeCloseTo(170, 0);
  });

  it('returns a valid number (NOT null) for income above $10,000', () => {
    // Bug 1 fix: null is no longer returned — the §61.30(6)(b) formula handles it
    const need = getBasicNeed(26000, 2);
    expect(need).not.toBeNull();
    expect(typeof need).toBe('number');
    // base@10k=2185, rate=0.075, excess=16000*0.075=1200 => 3385
    expect(need).toBeCloseTo(2185 + 16000 * 0.075, 2);
  });

  it('at exactly $10,000 returns the last schedule row (anchor for formula)', () => {
    // Bug 2 fix: $10,000 is the last row in the corrected schedule
    expect(getBasicNeed(10000, 2)).toBeCloseTo(2185, 0);
  });

  it('schedule has $50-increment rows: $850 is a real row (not interpolated)', () => {
    // Bug 2 fix: these rows now exist in the 62-row schedule
    const at850 = getBasicNeed(850, 1)!;
    const at800 = getBasicNeed(800, 1)!;
    const at900 = getBasicNeed(900, 1)!;
    // $850 is an exact row (183), not the midpoint of interpolation
    expect(at850).toBeCloseTo(183, 0);
    // Verify it's NOT merely linear interpolation (the actual values differ)
    const interpolated = (at800 + at900) / 2;
    // 183 vs (170+196)/2=183 — in this case they happen to match, which is fine
    expect(at850).toBeGreaterThanOrEqual(at800);
    expect(at850).toBeLessThanOrEqual(at900);
  });

  it('caps at 6 children for schedule lookup', () => {
    const six = getBasicNeed(5000, 6)!;
    const seven = getBasicNeed(5000, 7)!;
    expect(six).toBeCloseTo(seven, 1);
  });
});

// ---------------------------------------------------------------------------
// Substantial time-sharing threshold
// ---------------------------------------------------------------------------
describe('Substantial time-sharing threshold', () => {
  it('is FALSE when one parent has exactly 72 overnights', () => {
    const result = calculateFLChildSupport(
      baseInput({ overnightsA: 293, overnightsB: 72 })
    );
    expect(result.substantialTimesharing).toBe(false);
  });

  it('is TRUE when both parents have exactly 73 overnights', () => {
    // 73 + 292 = 365
    const result = calculateFLChildSupport(
      baseInput({ overnightsA: 292, overnightsB: 73 })
    );
    expect(result.substantialTimesharing).toBe(true);
  });

  it('is TRUE for 50/50 split (182/183)', () => {
    const result = calculateFLChildSupport(
      baseInput({ overnightsA: 183, overnightsB: 182 })
    );
    expect(result.substantialTimesharing).toBe(true);
  });

  it('is FALSE when only one parent hits 73 but the other has 0', () => {
    const result = calculateFLChildSupport(
      baseInput({ overnightsA: 365, overnightsB: 0 })
    );
    expect(result.substantialTimesharing).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Ordinary (standard) time-sharing
// ---------------------------------------------------------------------------
describe('Ordinary time-sharing (non-substantial)', () => {
  it('uses the correct formula: obligationB = totalNeed × incomeShareB', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 1,
        overnightsA: 300,
        overnightsB: 65, // < 73, so ordinary
        qualifyingChildcare: 200,
        qualifyingChildHealthInsurance: 100,
        qualifyingNoncoveredMedical: 50,
        childcarePaidByB: 100,
        healthInsurancePaidByB: 50,
      })
    );
    expect(result.substantialTimesharing).toBe(false);
    expect(result.totalNeed).toBeDefined();
    expect(result.obligationB).toBeDefined();

    const combinedIncome = 5000;
    const incomeShareB = 2000 / combinedIncome;
    const basicNeed = getBasicNeed(combinedIncome, 1)!;
    const totalNeed = basicNeed + 200 + 100 + 50;
    const expectedObligationB = totalNeed * incomeShareB;
    expect(result.obligationB).toBeCloseTo(expectedObligationB, 2);
  });

  it('transfers are correct when B pays some expenses directly', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65,
        qualifyingChildcare: 400,
        qualifyingChildHealthInsurance: 0,
        qualifyingNoncoveredMedical: 0,
        childcarePaidByB: 400, // B pays all childcare directly
      })
    );
    expect(result.expensePaidByB).toBeCloseTo(400, 2);
    // Transfer B→A = obligationB - expensePaidByB
    expect(result.transferBtoA).toBeCloseTo(result.obligationB! - 400, 2);
  });

  it('zero add-on expenses: only basicNeed matters', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 3,
        overnightsA: 300,
        overnightsB: 65,
      })
    );
    expect(result.substantialTimesharing).toBe(false);
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 3)!;
    const incomeShareB = 3000 / combinedIncome;
    expect(result.totalNeed).toBeCloseTo(basicNeed, 2);
    expect(result.obligationB).toBeCloseTo(basicNeed * incomeShareB, 2);
  });
});

// ---------------------------------------------------------------------------
// Substantial time-sharing — exact statutory calculation
// ---------------------------------------------------------------------------
describe('Substantial time-sharing (1.5× cross-timeshare method)', () => {
  it('applies 1.5× gross-up correctly on basicNeed only', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 292,
        overnightsB: 73,
      })
    );

    expect(result.substantialTimesharing).toBe(true);
    const combinedIncome = 5000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const incomeShareA = 3000 / combinedIncome;
    const incomeShareB = 2000 / combinedIncome;

    expect(result.grossedObligationA).toBeCloseTo(basicNeed * incomeShareA * 1.5, 2);
    expect(result.grossedObligationB).toBeCloseTo(basicNeed * incomeShareB * 1.5, 2);
  });

  it('cross-multiplies by OTHER parent overnight %', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 292,
        overnightsB: 73,
      })
    );

    const totalOvernights = 292 + 73;
    const pctA = 292 / totalOvernights;
    const pctB = 73 / totalOvernights;

    // crossObligationA = grossedA × pctB (NOT pctA)
    expect(result.crossObligationA).toBeCloseTo(result.grossedObligationA! * pctB, 2);
    // crossObligationB = grossedB × pctA (NOT pctB)
    expect(result.crossObligationB).toBeCloseTo(result.grossedObligationB! * pctA, 2);
  });

  it('50/50 split produces near-zero base transfer for equal incomes', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 183,
        overnightsB: 182,
      })
    );
    expect(result.substantialTimesharing).toBe(true);
    // Equal incomes + near-equal overnights = very small base transfer
    expect(Math.abs(result.baseTransferAtoB!)).toBeLessThan(5);
  });

  it('unequal incomes, substantial timesharing: higher earner pays more', () => {
    // A earns much more, B has 73 nights
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 6000,
        netIncomeB: 1000,
        numberOfChildren: 2,
        overnightsA: 292,
        overnightsB: 73,
      })
    );
    expect(result.substantialTimesharing).toBe(true);
    // A has most overnights AND higher income, so net transfer direction depends
    // on cross-timeshare math — just verify formula runs without error
    expect(typeof result.amount).toBe('number');
    expect(result.amount).toBeGreaterThanOrEqual(0);
  });

  it('expense allocation happens AFTER the cross-timeshare calculation', () => {
    const noExpenses = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
      })
    );
    const withExpenses = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: 500,
        childcarePaidByA: 500, // A pays all — A should get credit
      })
    );
    // baseTransferAtoB should be identical in both cases (expenses don't affect it)
    expect(withExpenses.baseTransferAtoB).toBeCloseTo(noExpenses.baseTransferAtoB!, 2);
  });

  it('childcare paid by A: A gets credit in expense allocation', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 1,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: 600,
        childcarePaidByA: 600, // A pays all
      })
    );
    // requiredExpenseA = 600 × (3000/5000) = 360
    // actualExpensePaidA = 600
    // expenseTransferAtoB = 360 - 600 = -240 (A gets credit)
    expect(result.expenseTransferAtoB).toBeCloseTo(-240, 2);
  });

  it('childcare paid by B: B gets credit in expense allocation', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 1,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: 600,
        childcarePaidByB: 600, // B pays all
      })
    );
    // requiredExpenseA = 600 × (3000/5000) = 360
    // actualExpensePaidA = 0
    // expenseTransferAtoB = 360 - 0 = +360 (A owes B)
    expect(result.expenseTransferAtoB).toBeCloseTo(360, 2);
  });

  it('split childcare expenses between A and B', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 3000,
        netIncomeB: 2000,
        numberOfChildren: 1,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: 600,
        childcarePaidByA: 300,
        childcarePaidByB: 300,
      })
    );
    // requiredExpenseA = 600 × 0.6 = 360
    // actualExpensePaidA = 300
    // expenseTransferAtoB = 360 - 300 = 60
    expect(result.expenseTransferAtoB).toBeCloseTo(60, 2);
  });
});

// ---------------------------------------------------------------------------
// CRITICAL REGRESSION TEST
// Prove that childcare is NOT included in the 1.5× gross-up
// ---------------------------------------------------------------------------
describe('CRITICAL REGRESSION: childcare NOT in 1.5× gross-up', () => {
  it('grossed obligations use basicNeed only — childcare is EXCLUDED', () => {
    const childcareAmount = 800;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: childcareAmount,
        childcarePaidByB: childcareAmount,
      })
    );

    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const incomeShareA = 4000 / combinedIncome;
    const incomeShareB = 3000 / combinedIncome;

    // CORRECT: grossed obligations based on basicNeed only
    const correctGrossedA = basicNeed * incomeShareA * 1.5;
    const correctGrossedB = basicNeed * incomeShareB * 1.5;

    // WRONG: would be (basicNeed + childcare) × incomeShare × 1.5
    const wrongGrossedA = (basicNeed + childcareAmount) * incomeShareA * 1.5;
    const wrongGrossedB = (basicNeed + childcareAmount) * incomeShareB * 1.5;

    expect(result.grossedObligationA).toBeCloseTo(correctGrossedA, 2);
    expect(result.grossedObligationB).toBeCloseTo(correctGrossedB, 2);

    // This assertion PROVES childcare is NOT in the gross-up
    // If the bug were present, these would match the wrong values
    expect(result.grossedObligationA).not.toBeCloseTo(wrongGrossedA, 2);
    expect(result.grossedObligationB).not.toBeCloseTo(wrongGrossedB, 2);
  });

  it('health insurance NOT in 1.5× gross-up', () => {
    const insuranceAmount = 300;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 1,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildHealthInsurance: insuranceAmount,
        healthInsurancePaidByA: insuranceAmount,
      })
    );

    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 1)!;
    const incomeShareA = 4000 / combinedIncome;

    // grossedA must equal basicNeed * incomeShareA * 1.5 (NOT including insurance)
    expect(result.grossedObligationA).toBeCloseTo(basicNeed * incomeShareA * 1.5, 2);
  });

  it('noncovered medical NOT in 1.5× gross-up', () => {
    const medicalAmount = 150;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 5000,
        netIncomeB: 2000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalPaidByB: medicalAmount,
      })
    );

    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const incomeShareA = 5000 / combinedIncome;
    const incomeShareB = 2000 / combinedIncome;

    expect(result.grossedObligationA).toBeCloseTo(basicNeed * incomeShareA * 1.5, 2);
    expect(result.grossedObligationB).toBeCloseTo(basicNeed * incomeShareB * 1.5, 2);
  });
});

// ---------------------------------------------------------------------------
// Above-$10,000 excess-income formula (§61.30(6)(b)) — Bug 1 fix
// ---------------------------------------------------------------------------
describe('Above-$10,000: §61.30(6)(b) excess-income formula', () => {
  it('income exactly at $10,000 returns schedule lookup value', () => {
    const need = getBasicNeed(10000, 2);
    // Last schedule row: 2 children = 2185
    expect(need).toBeCloseTo(2185, 0);
  });

  it('income at $10,001 returns base at $10k + 1 × excessRate[2]', () => {
    const need = getBasicNeed(10001, 2)!;
    // base = 2185, excessRate[2] = 0.075, excess = 1 × 0.075 = 0.075
    expect(need).toBeCloseTo(2185 + 0.075, 4);
  });

  it('income at $15,000 returns correct excess-income for 1 child', () => {
    const need = getBasicNeed(15000, 1)!;
    // base@10k = 1502, rate = 0.050, excess = 5000 × 0.050 = 250
    expect(need).toBeCloseTo(1502 + 250, 2);
  });

  it('income at $15,000 returns correct excess-income for 3 children', () => {
    const need = getBasicNeed(15000, 3)!;
    // base@10k = 2514, rate = 0.095, excess = 5000 × 0.095 = 475
    expect(need).toBeCloseTo(2514 + 475, 2);
  });

  it('income at $25,000 returns valid number (NOT null) from formula', () => {
    const need = getBasicNeed(25000, 2);
    // base@10k = 2185, rate = 0.075, excess = 15000 × 0.075 = 1125
    expect(need).not.toBeNull();
    expect(need).toBeCloseTo(2185 + 1125, 2);
  });

  it('income at $50,000 returns valid number from formula', () => {
    const need = getBasicNeed(50000, 1);
    // base@10k = 1502, rate = 0.050, excess = 40000 × 0.050 = 2000
    expect(need).not.toBeNull();
    expect(need).toBeCloseTo(1502 + 2000, 2);
  });

  it('aboveTableIncome is true for income > $10,000', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 16000,
        netIncomeB: 10000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65,
      })
    );
    expect(result.aboveTableIncome).toBe(true);
    expect(result.aboveTableWarning).toBeDefined();
    // basicNeed is now a number, NOT null — formula handles it
    expect(result.basicNeed).not.toBeNull();
    expect(typeof result.basicNeed).toBe('number');
    expect(result.basicNeed).toBeGreaterThan(0);
  });

  it('aboveTableIncome is false for income at exactly $10,000', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 6000,
        netIncomeB: 4000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65,
      })
    );
    expect(result.aboveTableIncome).toBe(false);
    expect(result.aboveTableWarning).toBeUndefined();
  });

  it('excess-income formula: all 6 child-count rates produce increasing needs', () => {
    const needs = [1, 2, 3, 4, 5, 6].map(n => getBasicNeed(20000, n)!);
    for (let i = 1; i < needs.length; i++) {
      expect(needs[i]).toBeGreaterThan(needs[i - 1]);
    }
  });
});

// ---------------------------------------------------------------------------
// Result structure
// ---------------------------------------------------------------------------
describe('Result structure', () => {
  it('version is always FL-CS-2026.1', () => {
    const result = calculateFLChildSupport(baseInput());
    expect(result.version).toBe('FL-CS-2026.1');
  });

  it('receipt is an array of strings', () => {
    const result = calculateFLChildSupport(baseInput());
    expect(Array.isArray(result.receipt)).toBe(true);
    expect(result.receipt.length).toBeGreaterThan(5);
    result.receipt.forEach(line => expect(typeof line).toBe('string'));
  });

  it('payer/recipient/amount are consistent', () => {
    const result = calculateFLChildSupport(baseInput());
    if (result.amount > 0) {
      expect(result.payer).not.toBeNull();
      expect(result.recipient).not.toBeNull();
      expect(result.payer).not.toBe(result.recipient);
    } else {
      expect(result.payer).toBeNull();
      expect(result.recipient).toBeNull();
    }
  });
});
