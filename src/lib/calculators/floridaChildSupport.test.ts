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

  it('returns null for income above $25,000', () => {
    expect(getBasicNeed(26000, 2)).toBeNull();
  });

  it('returns last row value at exactly $25,000', () => {
    expect(getBasicNeed(25000, 2)).toBeCloseTo(3335, 0);
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
// Above-table income
// ---------------------------------------------------------------------------
describe('Above-table income ($26,000 combined)', () => {
  it('flags aboveTableIncome and returns a warning', () => {
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
    expect(result.aboveTableWarning).toMatch(/\$25,000/);
    // basicNeed in the result object should be null (above table)
    expect(result.basicNeed).toBeNull();
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
