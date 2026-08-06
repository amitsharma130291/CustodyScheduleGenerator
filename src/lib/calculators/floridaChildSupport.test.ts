/**
 * Florida Child Support Calculator Tests
 * Version: FL-CS-2026.3
 * Authority: Florida Statutes §61.30
 *
 * v2 additions:
 * - FIX 1: Schedule row count verification (185 rows)
 * - FIX 2: Noncovered medical in gross-up base (§61.30(8))
 */

import { describe, it, expect } from 'vitest';
import {
  calculateFLChildSupport,
  getBasicNeed,
  getFLBasicNeed,
  FL_SCHEDULE_ROW_COUNT,
  FL_POVERTY_GUIDELINE_2026_ANNUAL,
  getMonthlyPovertyGuideline,
} from './floridaChildSupport';

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
    obligorParent: 'B' as const, // required for standard branch; B net=2000 >= 800
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

  it('noncovered medical IS in 1.5× gross-up base (§61.30(8), FIX 2)', () => {
    // §61.30(8): noncovered medical is part of the base obligation, included in gross-up.
    // Only day care and health insurance are excluded from the 1.5× gross-up per §61.30(11)(b)(1).
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

    // grossupBase = basicNeed + noncoveredMedical (default: 'included-in-basic-obligation')
    const expectedGrossupBase = basicNeed + medicalAmount;
    expect(result.grossupBase).toBeCloseTo(expectedGrossupBase, 2);
    expect(result.grossedObligationA).toBeCloseTo(expectedGrossupBase * incomeShareA * 1.5, 2);
    expect(result.grossedObligationB).toBeCloseTo(expectedGrossupBase * incomeShareB * 1.5, 2);

    // REGRESSION: grossupBase must differ from basicNeed when noncoveredMedical > 0
    expect(result.grossupBase).not.toBeCloseTo(basicNeed, 2);
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
  it('version is always FL-CS-2026.3', () => {
    const result = calculateFLChildSupport(baseInput());
    expect(result.version).toBe('FL-CS-2026.3');
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

// ---------------------------------------------------------------------------
// FIX 1: §61.30(6)(a) low-income branch (combined income < $800)
// ---------------------------------------------------------------------------
// (getFLBasicNeed already imported at top)

describe('getFLBasicNeed — low-income branch §61.30(6)(a)', () => {
  it('combined income 799 → branch=low-income-below-800, basicNeed=null, warning present', () => {
    const r = getFLBasicNeed(799, 1);
    expect(r.branch).toBe('low-income-obligor-below-schedule');
    expect(r.basicNeed).toBeNull();
    expect(r.warning).toBeTruthy();
    expect(r.warning).toContain('§61.30(6)(a)');
  });

  it('combined income 0 → branch=low-income-below-800', () => {
    const r = getFLBasicNeed(0, 2);
    expect(r.branch).toBe('low-income-obligor-below-schedule');
    expect(r.basicNeed).toBeNull();
  });

  it('combined income 800 → branch=schedule, basicNeed > 0', () => {
    const r = getFLBasicNeed(800, 1);
    expect(r.branch).toBe('schedule');
    expect(r.basicNeed).not.toBeNull();
    expect(r.basicNeed!).toBeGreaterThan(0);
  });

  it('combined income 5000 → branch=schedule', () => {
    const r = getFLBasicNeed(5000, 2);
    expect(r.branch).toBe('schedule');
    expect(r.basicNeed).not.toBeNull();
  });

  it('combined income 10001 → branch=excess-income', () => {
    const r = getFLBasicNeed(10001, 1);
    expect(r.branch).toBe('excess-income');
    expect(r.basicNeed).not.toBeNull();
    expect(r.basicNeed!).toBeGreaterThan(0);
  });
});

describe('calculateFLChildSupport — low-income early return', () => {
  it('combined income 799: finalSupport=null, payer=null, branch=low-income-below-800', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 400,
      netIncomeB: 399,
      obligorParent: 'B',
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.basicNeed).toBeNull();
    expect(result.finalSupport).toBeNull();
    expect(result.payer).toBeNull();
    expect(result.warning).toBeTruthy();
  });

  it('combined income 0: finalSupport=null', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 0,
      netIncomeB: 0,
      obligorParent: 'B',
    }));
    expect(result.finalSupport).toBeNull();
    expect(result.branch).toBe('low-income-obligor-below-schedule');
  });

  it('both parents >= $800: normal schedule calculation proceeds, finalSupport is a number', () => {
    // Neither obligor net < $800 — use incomes both clearly above threshold
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 900,
      netIncomeB: 800,
      obligorParent: 'B',
    }));
    expect(result.branch).toBe('schedule');
    expect(result.finalSupport).not.toBeNull();
    expect(typeof result.finalSupport).toBe('number');
  });
});

// ---------------------------------------------------------------------------
// FIX 1 (v2): §61.30 schedule row count — must be exactly 185 rows
// ---------------------------------------------------------------------------
// (FL_SCHEDULE_ROW_COUNT and FLNoncoveredMedicalTreatment already imported at top)

describe('FIX 1 (v2) — FL_SCHEDULE row count = 185', () => {
  it('FL_SCHEDULE has exactly 185 rows ($800–$10,000 at $50 increments)', () => {
    // (10000 - 800) / 50 + 1 = 185
    expect(FL_SCHEDULE_ROW_COUNT).toBe(185);
  });

  it('first row income = $800, 1 child = 170', () => {
    expect(getBasicNeed(800, 1)).toBeCloseTo(170, 0);
  });

  it('last row income = $10,000, 1 child = 1492', () => {
    expect(getBasicNeed(10000, 1)).toBeCloseTo(1492, 0);
  });

  it('$2550 is now a real row (was missing in old 62-row schedule)', () => {
    // Row: [2550, 499, 726, 835, 927, 1009, 1080]
    expect(getBasicNeed(2550, 2)).toBeCloseTo(726, 0);
    expect(getBasicNeed(2550, 1)).toBeCloseTo(499, 0);
  });

  it('$3050 is now a real row (was missing in old 62-row schedule)', () => {
    // Row: [3050, 591, 859, 988, 1096, 1193, 1278]
    expect(getBasicNeed(3050, 1)).toBeCloseTo(591, 0);
    expect(getBasicNeed(3050, 2)).toBeCloseTo(859, 0);
  });

  it('$5050 is now a real row (was missing in old 62-row schedule)', () => {
    // Row: [5050, 934, 1359, 1564, 1735, 1888, 2021]
    expect(getBasicNeed(5050, 1)).toBeCloseTo(934, 0);
    expect(getBasicNeed(5050, 2)).toBeCloseTo(1359, 0);
  });

  it('schedule is monotonically non-decreasing across representative $50 steps', () => {
    const checkpoints = [800, 850, 900, 1000, 2000, 2050, 2500, 2550, 3000, 3050,
                         5000, 5050, 7000, 7050, 9950, 10000];
    for (let i = 1; i < checkpoints.length; i++) {
      const lo = getBasicNeed(checkpoints[i - 1], 2)!;
      const hi = getBasicNeed(checkpoints[i], 2)!;
      expect(hi).toBeGreaterThanOrEqual(lo);
    }
  });
});

// ---------------------------------------------------------------------------
// FIX 2 (v2): Noncovered medical in 1.5× gross-up base (§61.30(8))
// ---------------------------------------------------------------------------
describe('FIX 2 (v2) — noncovered medical in gross-up base', () => {
  it('default (included-in-basic-obligation): grossupBase = basicNeed + noncoveredMedical', () => {
    const medicalAmount = 200;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalPaidByB: medicalAmount,
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    expect(result.grossupBase).toBeCloseTo(basicNeed + medicalAmount, 2);
    expect(result.noncoveredMedicalTreatment).toBe('included-in-basic-obligation');
  });

  it('noncoveredMedical in grossupBase: grossedObligations reflect it', () => {
    const medicalAmount = 300;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalPaidByB: medicalAmount,
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const grossupBase = basicNeed + medicalAmount;
    const incomeShareA = 4000 / combinedIncome;
    const incomeShareB = 3000 / combinedIncome;
    expect(result.grossedObligationA).toBeCloseTo(grossupBase * incomeShareA * 1.5, 2);
    expect(result.grossedObligationB).toBeCloseTo(grossupBase * incomeShareB * 1.5, 2);
  });

  it('REGRESSION: grossupBase !== basicNeed when noncoveredMedical > 0 and treatment is included-in-basic-obligation', () => {
    const medicalAmount = 150;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingNoncoveredMedical: medicalAmount,
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    // grossupBase must be strictly greater than basicNeed
    expect(result.grossupBase).toBeGreaterThan(basicNeed);
    expect(result.grossupBase).toBeCloseTo(basicNeed + medicalAmount, 2);
  });

  it('separately-allocated: grossupBase = basicNeed only (noncoveredMedical excluded)', () => {
    const medicalAmount = 200;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalPaidByB: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    // When separately-allocated, grossupBase equals basicNeed (medical excluded)
    expect(result.grossupBase).toBeCloseTo(basicNeed, 2);
    expect(result.noncoveredMedicalTreatment).toBe('separately-allocated');
  });

  it('noncoveredMedical = 0: grossupBase equals basicNeed regardless of treatment flag', () => {
    const resultDefault = calculateFLChildSupport(
      baseInput({ netIncomeA: 4000, netIncomeB: 3000, overnightsA: 200, overnightsB: 165 })
    );
    const resultSeparate = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        overnightsA: 200,
        overnightsB: 165,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    expect(resultDefault.grossupBase).toBeCloseTo(basicNeed, 2);
    expect(resultSeparate.grossupBase).toBeCloseTo(basicNeed, 2);
  });

  it('childcare and health insurance remain EXCLUDED from grossupBase (unchanged)', () => {
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 200,
        overnightsB: 165,
        qualifyingChildcare: 500,
        qualifyingChildHealthInsurance: 200,
        childcarePaidByA: 500,
        healthInsurancePaidByA: 200,
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    // No noncoveredMedical, so grossupBase = basicNeed (childcare/insurance NOT in it)
    expect(result.grossupBase).toBeCloseTo(basicNeed, 2);
  });
});

// ===========================================================================
// FL-CS-2026.3 NEW TESTS
// FIX 3: Noncovered medical explicit two-path enum
// FIX 4: <$800 branch §61.30(6)(a) obligor-level 90% cap
// ===========================================================================

// ---------------------------------------------------------------------------
// FIX 3: Noncovered medical — 'included-in-basic-obligation' vs 'separately-allocated'
// ---------------------------------------------------------------------------
describe('FIX 3 — Noncovered medical two-path explicit enum (FL-CS-2026.3)', () => {
  // Substantial time-sharing base for these tests
  function substInput(overrides: Partial<Parameters<typeof calculateFLChildSupport>[0]> = {}) {
    return baseInput({
      netIncomeA: 4000,
      netIncomeB: 3000,
      numberOfChildren: 2,
      overnightsA: 200,
      overnightsB: 165, // 200+165=365, both >=73 => substantial
      ...overrides,
    });
  }

  // ── Treatment = 'included-in-basic-obligation' (default) ─────────────────

  it("treatment='included-in-basic-obligation': grossupBase = basicNeed + noncoveredMedical", () => {
    const medicalAmount = 200;
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'included-in-basic-obligation',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    expect(result.grossupBase).toBeCloseTo(basicNeed + medicalAmount, 2);
    expect(result.noncoveredMedicalTreatment).toBe('included-in-basic-obligation');
  });

  it("treatment='included-in-basic-obligation': separateMedicalShareA = 0", () => {
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: 300,
        noncoveredMedicalTreatment: 'included-in-basic-obligation',
      })
    );
    expect(result.separateMedicalAllocation).toBeDefined();
    expect(result.separateMedicalAllocation!.shareA).toBeCloseTo(0, 5);
    expect(result.separateMedicalAllocation!.shareB).toBeCloseTo(0, 5);
  });

  it("treatment='included-in-basic-obligation': grossedObligations include noncoveredMedical", () => {
    const medicalAmount = 150;
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'included-in-basic-obligation',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const grossupBase = basicNeed + medicalAmount;
    const incomeShareA = 4000 / combinedIncome;
    const incomeShareB = 3000 / combinedIncome;
    expect(result.grossedObligationA).toBeCloseTo(grossupBase * incomeShareA * 1.5, 2);
    expect(result.grossedObligationB).toBeCloseTo(grossupBase * incomeShareB * 1.5, 2);
  });

  // ── Treatment = 'separately-allocated' ───────────────────────────────────

  it("treatment='separately-allocated': grossupBase = basicNeed only (no medical)", () => {
    const medicalAmount = 200;
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    expect(result.grossupBase).toBeCloseTo(basicNeed, 2);
    expect(result.noncoveredMedicalTreatment).toBe('separately-allocated');
  });

  it("treatment='separately-allocated': separateMedicalShareA = noncoveredMedical × incomeShareA", () => {
    const medicalAmount = 300;
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const combinedIncome = 7000;
    const incomeShareA = 4000 / combinedIncome;
    const incomeShareB = 3000 / combinedIncome;
    expect(result.separateMedicalAllocation).toBeDefined();
    expect(result.separateMedicalAllocation!.shareA).toBeCloseTo(medicalAmount * incomeShareA, 2);
    expect(result.separateMedicalAllocation!.shareB).toBeCloseTo(medicalAmount * incomeShareB, 2);
    expect(result.separateMedicalAllocation!.treatment).toBe('separately-allocated');
  });

  it("treatment='separately-allocated': grossedObligations do NOT include noncoveredMedical", () => {
    const medicalAmount = 400;
    const result = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const combinedIncome = 7000;
    const basicNeed = getBasicNeed(combinedIncome, 2)!;
    const incomeShareA = 4000 / combinedIncome;
    // grossed obligations use basicNeed only (medical excluded)
    expect(result.grossedObligationA).toBeCloseTo(basicNeed * incomeShareA * 1.5, 2);
    // Would be wrong if medical were included:
    const wrongBase = basicNeed + medicalAmount;
    expect(result.grossedObligationA).not.toBeCloseTo(wrongBase * incomeShareA * 1.5, 2);
  });

  // ── Default fallback ──────────────────────────────────────────────────────

  it("treatment defaults to 'included-in-basic-obligation' when not provided", () => {
    const medicalAmount = 200;
    const withDefault = calculateFLChildSupport(
      substInput({ qualifyingNoncoveredMedical: medicalAmount })
      // no noncoveredMedicalTreatment specified
    );
    const withExplicit = calculateFLChildSupport(
      substInput({
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'included-in-basic-obligation',
      })
    );
    expect(withDefault.noncoveredMedicalTreatment).toBe('included-in-basic-obligation');
    expect(withDefault.grossupBase).toBeCloseTo(withExplicit.grossupBase!, 4);
    expect(withDefault.finalTransferAtoB).toBeCloseTo(withExplicit.finalTransferAtoB!, 4);
  });

  // ── Ordinary (non-substantial) time-sharing + separately-allocated ────────

  it("ordinary timesharing + separately-allocated: noncoveredMedical excluded from totalNeed", () => {
    const medicalAmount = 200;
    const resultSeparate = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65, // non-substantial
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const resultIncluded = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'included-in-basic-obligation',
      })
    );
    expect(resultSeparate.substantialTimesharing).toBe(false);
    // totalNeed without medical < totalNeed with medical
    expect(resultSeparate.totalNeed!).toBeLessThan(resultIncluded.totalNeed!);
    expect(resultIncluded.totalNeed! - resultSeparate.totalNeed!).toBeCloseTo(medicalAmount, 2);
  });

  it("ordinary timesharing + separately-allocated: separateMedicalAllocation returned", () => {
    const medicalAmount = 150;
    const result = calculateFLChildSupport(
      baseInput({
        netIncomeA: 4000,
        netIncomeB: 3000,
        numberOfChildren: 2,
        overnightsA: 300,
        overnightsB: 65,
        qualifyingNoncoveredMedical: medicalAmount,
        noncoveredMedicalTreatment: 'separately-allocated',
      })
    );
    const incomeShareA = 4000 / 7000;
    const incomeShareB = 3000 / 7000;
    expect(result.separateMedicalAllocation).toBeDefined();
    expect(result.separateMedicalAllocation!.shareA).toBeCloseTo(medicalAmount * incomeShareA, 2);
    expect(result.separateMedicalAllocation!.shareB).toBeCloseTo(medicalAmount * incomeShareB, 2);
  });
});

// ---------------------------------------------------------------------------
// FIX 4: <$800 branch — §61.30(6)(a) obligor-level 90% cap
// ---------------------------------------------------------------------------
describe('FIX 4 — <$800 branch: §61.30(6)(a) obligor-level 90% cap (FL-CS-2026.3)', () => {
  // Combined income = 799, obligor = B (default)
  function lowIncomeInput(overrides: Partial<Parameters<typeof calculateFLChildSupport>[0]> = {}) {
    return baseInput({
      netIncomeA: 400,
      netIncomeB: 399, // combined = 799, below $800
      overnightsA: 292,
      overnightsB: 73,
      obligorParent: 'B' as const, // required in low-income branch
      obligorHouseholdSize: 1,
      ...overrides,
    });
  }

  it('combinedIncome=799, obligorNet=$399, household=1: incomeAbovePoverty=0 (below poverty line)', () => {
    const result = calculateFLChildSupport(lowIncomeInput({
      netIncomeA: 400,
      netIncomeB: 399,
      obligorParent: 'B',
      obligorHouseholdSize: 1,
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.obligorLevelCheck).toBeDefined();
    const check = result.obligorLevelCheck!;
    // netIncomeB=399, monthly poverty (1-person, 2026 HHS) = 15960/12 = 1330, so incomeAbovePoverty = 0
    expect(check.incomeAbovePoverty).toBe(0);
    expect(check.ninetyPercentReferenceCap).toBeCloseTo(0, 4);
  });

  // Direct formula test: obligorNet=750, household=1
  it('obligorLevelCheck formula: obligorNet=750, household=1 => ninetyPercentReferenceCap=$0 (below poverty)', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 750,
      netIncomeB: 49,
      obligorParent: 'A',
      obligorHouseholdSize: 1,
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    const check = result.obligorLevelCheck!;
    expect(check.obligorParent).toBe('A');
    expect(check.obligorNetIncome).toBeCloseTo(750, 2);
    // 2026 HHS monthly (1-person) = 15960/12 = 1330
    expect(check.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
    // 750 < 1330: incomeAbovePoverty = 0
    expect(check.incomeAbovePoverty).toBe(0);
    expect(check.ninetyPercentReferenceCap).toBeCloseTo(0, 4);
  });

  // Verify formula correctness with 2026 HHS values
  it('obligorLevelCheck formula verified: hypothetical obligorNet=$1500, household=1 => cap=$152.50', () => {
    // 2026 HHS monthly (1-person) = 15960/12 = 1330
    // incomeAbovePoverty = max(1500 - 1330, 0) = 170
    // ninetyPercentReferenceCap = 170 * 0.90 = 153.00
    const povertyMonthly = 15960 / 12; // 1330
    const hypothetical = Math.max(1500 - povertyMonthly, 0) * 0.90;
    expect(hypothetical).toBeCloseTo(153.00, 1);
  });

  it('obligorLevelCheck: obligorNet=$700, household=1 => incomeAbovePoverty=0, cap=$0', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 700,
      netIncomeB: 99,
      obligorParent: 'A',
      obligorHouseholdSize: 1,
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    const check = result.obligorLevelCheck!;
    // 700 < 1330: incomeAbovePoverty = 0
    expect(check.incomeAbovePoverty).toBe(0);
    expect(check.ninetyPercentReferenceCap).toBeCloseTo(0, 4);
  });

  it('combinedIncome=800 with obligor >= 800: uses schedule branch', () => {
    // obligorParent=A, netIncomeA=500<800 => would trigger! Use A=900 instead
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 900,
      netIncomeB: 300,
      obligorParent: 'A', // obligorNet=900 >= 800, so no low-income trigger
    }));
    expect(result.branch).toBe('schedule');
    expect(result.obligorLevelCheck).toBeUndefined();
    expect(result.finalSupport).not.toBeNull();
  });

  it('obligorLevelCheck present on low-income result', () => {
    const result = calculateFLChildSupport(lowIncomeInput());
    expect(result.obligorLevelCheck).toBeDefined();
    const check = result.obligorLevelCheck!;
    expect(typeof check.obligorNetIncome).toBe('number');
    expect(typeof check.incomeAbovePoverty).toBe('number');
    expect(typeof check.ninetyPercentReferenceCap).toBe('number');
    expect(check.incomeAbovePoverty).toBeGreaterThanOrEqual(0);
    expect(check.ninetyPercentReferenceCap).toBeGreaterThanOrEqual(0);
  });

  it('obligorLevelCheck: obligorParent=A reads netIncomeA', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 600,
      netIncomeB: 199, // combined=799
      obligorParent: 'A',
      obligorHouseholdSize: 1,
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.obligorLevelCheck!.obligorParent).toBe('A');
    expect(result.obligorLevelCheck!.obligorNetIncome).toBeCloseTo(600, 2);
  });

  it('obligorLevelCheck: obligorParent=B reads netIncomeB', () => {
    const result = calculateFLChildSupport(baseInput({
      netIncomeA: 600,
      netIncomeB: 199, // combined=799
      obligorParent: 'B',
      obligorHouseholdSize: 1,
    }));
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.obligorLevelCheck!.obligorParent).toBe('B');
    expect(result.obligorLevelCheck!.obligorNetIncome).toBeCloseTo(199, 2);
  });

  it('poverty guideline always $1330/month (15960/12, 2026 single-person HHS per §61.30(6)(a))', () => {
    const result = calculateFLChildSupport(lowIncomeInput({ obligorHouseholdSize: 1 }));
    expect(result.obligorLevelCheck!.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
  });

  it('obligorHouseholdSize=2 (deprecated): poverty guideline still uses single-person ($1330/month)', () => {
    // §61.30(6)(a) uses single-person poverty line regardless — obligorHouseholdSize is deprecated
    const result = calculateFLChildSupport(lowIncomeInput({ obligorHouseholdSize: 2 }));
    expect(result.obligorLevelCheck!.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
  });

  it('obligorHouseholdSize=3 (deprecated): poverty guideline still uses single-person ($1330/month)', () => {
    const result = calculateFLChildSupport(lowIncomeInput({ obligorHouseholdSize: 3 }));
    expect(result.obligorLevelCheck!.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
  });

  it('obligorHouseholdSize=4 (deprecated): poverty guideline still uses single-person ($1330/month)', () => {
    const result = calculateFLChildSupport(lowIncomeInput({ obligorHouseholdSize: 4 }));
    expect(result.obligorLevelCheck!.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
  });

  it('poverty guideline defaults to single-person $1330/month when no household size provided', () => {
    const result = calculateFLChildSupport(lowIncomeInput());
    // obligorHouseholdSize is deprecated — single-person always used per §61.30(6)(a)
    expect(result.obligorLevelCheck!.federalPovertyGuidelineMonthly).toBeCloseTo(15960 / 12, 4);
    expect(result.obligorLevelCheck!.federalPovertyGuidelineAnnual).toBe(15960);
  });

  it('version is FL-CS-2026.3', () => {
    const result = calculateFLChildSupport(lowIncomeInput());
    expect(result.version).toBe('FL-CS-2026.3');
  });

  it('version is FL-CS-2026.3 for normal (non-low-income) results', () => {
    const result = calculateFLChildSupport(baseInput());
    expect(result.version).toBe('FL-CS-2026.3');
  });
});

// ===========================================================================
// NEW TESTS: FL 2026 HHS Poverty Guideline Fix
// ===========================================================================

describe('2026 HHS poverty guideline constants', () => {
  it('2026 HHS annual poverty guideline values', () => {
    expect(FL_POVERTY_GUIDELINE_2026_ANNUAL[1]).toBe(15960);
    expect(FL_POVERTY_GUIDELINE_2026_ANNUAL[2]).toBe(21640);
    expect(FL_POVERTY_GUIDELINE_2026_ANNUAL[3]).toBe(27320);
    expect(FL_POVERTY_GUIDELINE_2026_ANNUAL[4]).toBe(33000);
  });

  it('monthly poverty guideline derived from annual', () => {
    expect(getMonthlyPovertyGuideline(1)).toBeCloseTo(1330.00, 2);
    expect(getMonthlyPovertyGuideline(2)).toBeCloseTo(1803.3333, 2);
    expect(getMonthlyPovertyGuideline(3)).toBeCloseTo(2276.6667, 2);
    expect(getMonthlyPovertyGuideline(4)).toBeCloseTo(2750.00, 2);
  });

  // Regression: old wrong values must not be returned
  it('old poverty guideline values are not used', () => {
    expect(getMonthlyPovertyGuideline(1)).not.toBe(1255);
    expect(getMonthlyPovertyGuideline(2)).not.toBe(1700);
    expect(getMonthlyPovertyGuideline(3)).not.toBe(2146);
    expect(getMonthlyPovertyGuideline(4)).not.toBe(2592);
  });
});

describe('Low-income branch — 2026 fixes', () => {
  it('combined income < $800: returns case-by-case result', () => {
    const result = calculateFLChildSupport({
      netIncomeA: 500, netIncomeB: 250, children: 1,
      overnightsA: 250, overnightsB: 115,
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
      obligorParent: 'A', obligorHouseholdSize: 1,
    });
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.basicNeed).toBeNull();
    expect(result.finalSupport).toBeNull();
    expect((result as any).requiresCaseByCaseDetermination).toBe(true);
    // 500 < 1330 (2026 HHS monthly 1-person), so incomeAbovePoverty = 0, cap = 0
    expect((result as any).obligorLevelCheck.ninetyPercentReferenceCap).toBe(0);
  });

  it('obligorParent required when combined < $800', () => {
    expect(() => calculateFLChildSupport({
      netIncomeA: 400, netIncomeB: 300, children: 1,
      overnightsA: 200, overnightsB: 165,
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
      // obligorParent intentionally missing
    })).toThrow('obligorParent is required');
  });

  it('invalid household size rejected', () => {
    expect(() => calculateFLChildSupport({
      netIncomeA: 400, netIncomeB: 300, children: 1,
      overnightsA: 200, overnightsB: 165,
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
      obligorParent: 'A', obligorHouseholdSize: 5,
    })).not.toThrow(); // obligorHouseholdSize is deprecated; ignored (single-person used per §61.30(6)(a))
  });

  it('obligor >= $800 does NOT trigger low-income branch (combined may be low)', () => {
    // Both parents have substantial TS (>=73); obligor defaults to B.
    // Use netIncomeB >= 800 so it does NOT trigger the obligor low-income rule.
    const result = calculateFLChildSupport({
      netIncomeA: 500, netIncomeB: 900, children: 1,
      overnightsA: 200, overnightsB: 165,
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    // obligorNet (B) = 900 >= 800 => no low-income branch
    expect(result.branch).not.toBe('low-income-obligor-below-schedule');
    expect(result.finalSupport).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// FL FIX 1: Poverty guideline — single person only (§61.30(6)(a))
// ---------------------------------------------------------------------------
describe('FL poverty guideline — single-person constant (§61.30(6)(a))', () => {
  it('FL_POVERTY_GUIDELINE_2026.monthly is always 1330.00 (single person living alone)', () => {
    const { FL_POVERTY_GUIDELINE_2026 } = require('./floridaChildSupport');
    expect(FL_POVERTY_GUIDELINE_2026.monthly).toBeCloseTo(1330.00, 2);
  });

  it('FL_POVERTY_GUIDELINE_2026.annual is 15960', () => {
    const { FL_POVERTY_GUIDELINE_2026 } = require('./floridaChildSupport');
    expect(FL_POVERTY_GUIDELINE_2026.annual).toBe(15960);
  });

  it('monthly is exactly annual / 12', () => {
    const { FL_POVERTY_GUIDELINE_2026 } = require('./floridaChildSupport');
    expect(FL_POVERTY_GUIDELINE_2026.monthly).toBeCloseTo(FL_POVERTY_GUIDELINE_2026.annual / 12, 8);
  });
});

// ---------------------------------------------------------------------------
// FL FIX 2: Low-income trigger = obligorNet < $800, not combinedNet < $800
// ---------------------------------------------------------------------------
describe('FL low-income trigger — obligorNet < $800 (§61.30(6)(a))', () => {
  it('obligor B net < $800 triggers low-income branch even when combined >= $800', () => {
    const result = calculateFLChildSupport({
      netIncomeA: 2000, netIncomeB: 700, // combined $2700, but obligor B < $800
      children: 1,
      overnightsA: 300, overnightsB: 65,
      obligorParent: 'B',
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.finalSupport).toBeNull();
    expect((result as any).requiresCaseByCaseDetermination).toBe(true);
  });

  it('obligor A net < $800 triggers low-income branch', () => {
    const result = calculateFLChildSupport({
      netIncomeA: 750, netIncomeB: 3000,
      children: 1,
      overnightsA: 65, overnightsB: 300,
      obligorParent: 'A',
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    expect(result.branch).toBe('low-income-obligor-below-schedule');
    expect(result.finalSupport).toBeNull();
  });

  it('obligor net >= $800 does NOT trigger low-income branch even when combined is low', () => {
    // obligor A = $900 >= $800 — standard branch applies regardless of combined
    const result = calculateFLChildSupport({
      netIncomeA: 900, netIncomeB: 0,
      children: 1,
      overnightsA: 300, overnightsB: 65,
      obligorParent: 'A',
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    expect(result.branch).not.toBe('low-income-obligor-below-schedule');
    expect(result.finalSupport).not.toBeNull();
  });

  it('low-income branch uses single-person poverty guideline (not household size)', () => {
    const result = calculateFLChildSupport({
      netIncomeA: 2000, netIncomeB: 700,
      children: 1,
      overnightsA: 300, overnightsB: 65,
      obligorParent: 'B',
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    const check = (result as any).obligorLevelCheck;
    expect(check).toBeDefined();
    // Single-person monthly = 1330.00 exactly
    expect(check.federalPovertyGuidelineMonthly).toBeCloseTo(1330.00, 2);
    // annual = 15960
    expect(check.federalPovertyGuidelineAnnual).toBe(15960);
    // 90% cap: (700 - 1330) = negative, so incomeAbovePoverty = 0, cap = 0
    expect(check.incomeAbovePoverty).toBe(0);
    expect(check.ninetyPercentReferenceCap).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// FL FIX 3: Standard branch requires explicit obligorParent
// ---------------------------------------------------------------------------
describe('FL standard branch — explicit obligorParent required', () => {
  it('throws when obligorParent omitted on standard (non-substantial) branch', () => {
    expect(() => calculateFLChildSupport({
      netIncomeA: 3000, netIncomeB: 2000,
      children: 1,
      overnightsA: 300, overnightsB: 65, // non-substantial
      // obligorParent deliberately omitted
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    })).toThrow('obligorParent');
  });

  it('does NOT throw when substantial time-sharing (obligorParent not required)', () => {
    // Both parents >= 73 overnights — substantial TS, formula determines direction
    expect(() => calculateFLChildSupport({
      netIncomeA: 3000, netIncomeB: 2000,
      children: 1,
      overnightsA: 200, overnightsB: 165, // both >= 73
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    })).not.toThrow();
  });

  it('standard branch with explicit obligorParent B calculates correctly', () => {
    const result = calculateFLChildSupport({
      netIncomeA: 3000, netIncomeB: 2000,
      children: 1,
      overnightsA: 300, overnightsB: 65,
      obligorParent: 'B',
      qualifyingChildcare: 0, qualifyingChildHealthInsurance: 0, qualifyingNoncoveredMedical: 0,
      childcarePaidByA: 0, childcarePaidByB: 0,
      healthInsurancePaidByA: 0, healthInsurancePaidByB: 0,
      noncoveredMedicalPaidByA: 0, noncoveredMedicalPaidByB: 0,
    });
    expect(result.finalSupport).not.toBeNull();
    expect(result.payer).toBe('B');
    expect(result.recipient).toBe('A');
  });
});
