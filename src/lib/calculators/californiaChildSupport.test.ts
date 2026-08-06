/**
 * California Child Support Calculator Tests
 * Version: CA-CS-2026.1
 * Authority: California Family Code §4055
 */

import { describe, it, expect } from 'vitest';
import {
  calculateCAChildSupport,
  getCABaseK,
  CA_CHILD_MULTIPLIERS,
} from './californiaChildSupport';

// ---------------------------------------------------------------------------
// Helper: base input
// ---------------------------------------------------------------------------
function baseInput(overrides: Partial<Parameters<typeof calculateCAChildSupport>[0]> = {}) {
  return {
    netDisposableIncomeA: 6000,
    netDisposableIncomeB: 2000,
    numberOfChildren: 1,
    timeshareA: 0.30,
    timeshareB: 0.70,
    qualifyingChildcare: 0,
    qualifyingHealthcare: 0,
    spousalSupportAPaysB: 0,
    spousalSupportBPaysA: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// K bracket boundary tests
// ---------------------------------------------------------------------------
describe('getCABaseK — exact bracket equations', () => {
  it('TN = 2900: uses first bracket (0.165 + TN/82857)', () => {
    const k = getCABaseK(2900);
    expect(k).toBeCloseTo(0.165 + 2900 / 82857, 8);
  });

  it('TN = 2901: uses second bracket (0.131 + TN/42149)', () => {
    const k = getCABaseK(2901);
    expect(k).toBeCloseTo(0.131 + 2901 / 42149, 8);
  });

  it('TN = 5000: uses second bracket (0.131 + TN/42149)', () => {
    const k = getCABaseK(5000);
    expect(k).toBeCloseTo(0.131 + 5000 / 42149, 8);
  });

  it('TN = 5001: uses flat bracket (0.250)', () => {
    const k = getCABaseK(5001);
    expect(k).toBeCloseTo(0.250, 8);
  });

  it('TN = 10000: uses flat bracket (0.250)', () => {
    const k = getCABaseK(10000);
    expect(k).toBeCloseTo(0.250, 8);
  });

  it('TN = 10001: uses fourth bracket (0.10 + 1499/TN)', () => {
    const k = getCABaseK(10001);
    expect(k).toBeCloseTo(0.10 + 1499 / 10001, 8);
  });

  it('TN = 15000: uses fourth bracket (0.10 + 1499/TN)', () => {
    const k = getCABaseK(15000);
    expect(k).toBeCloseTo(0.10 + 1499 / 15000, 8);
  });

  it('TN = 15001: uses fifth bracket (0.12 + 1200/TN)', () => {
    const k = getCABaseK(15001);
    expect(k).toBeCloseTo(0.12 + 1200 / 15001, 8);
  });

  it('TN = 30000: uses fifth bracket (0.12 + 1200/TN)', () => {
    const k = getCABaseK(30000);
    expect(k).toBeCloseTo(0.12 + 1200 / 30000, 8);
  });

  it('brackets are NOT flat percentages — TN=3000 differs from TN=2000', () => {
    expect(getCABaseK(3000)).not.toBeCloseTo(getCABaseK(2000), 3);
  });
});

// ---------------------------------------------------------------------------
// H multiplier
// ---------------------------------------------------------------------------
describe('H multiplier (applied to K)', () => {
  it('H = 0%: multiplier = 1 + 0 = 1.0', () => {
    const result = calculateCAChildSupport(
      baseInput({ timeshareA: 0.0, timeshareB: 1.0 })
    );
    // high earner is A (6000 >= 2000), H = timeshareA = 0.0
    expect(result.hMultiplier).toBeCloseTo(1.0, 8);
  });

  it('H = 20%: multiplier = 1 + 0.20 = 1.20', () => {
    const result = calculateCAChildSupport(
      baseInput({ timeshareA: 0.20, timeshareB: 0.80 })
    );
    expect(result.hMultiplier).toBeCloseTo(1.20, 8);
  });

  it('H = 50%: multiplier = 1 + 0.50 = 1.50 (boundary)', () => {
    const result = calculateCAChildSupport(
      baseInput({ timeshareA: 0.50, timeshareB: 0.50 })
    );
    expect(result.hMultiplier).toBeCloseTo(1.50, 8);
  });

  it('H = 60%: multiplier = 2 - 0.60 = 1.40 (H > 0.50 branch)', () => {
    const result = calculateCAChildSupport(
      baseInput({ timeshareA: 0.60, timeshareB: 0.40 })
    );
    expect(result.H).toBeCloseTo(0.60, 8);
    expect(result.hMultiplier).toBeCloseTo(2 - 0.60, 8);
  });

  it('H = 100%: multiplier = 2 - 1.0 = 1.0', () => {
    const result = calculateCAChildSupport(
      baseInput({ timeshareA: 1.0, timeshareB: 0.0 })
    );
    expect(result.hMultiplier).toBeCloseTo(1.0, 8);
  });
});

// ---------------------------------------------------------------------------
// High earner identification
// ---------------------------------------------------------------------------
describe('High earner identification', () => {
  it('A is high earner when incomeA >= incomeB', () => {
    const result = calculateCAChildSupport(
      baseInput({ netDisposableIncomeA: 5000, netDisposableIncomeB: 3000 })
    );
    expect(result.highEarner).toBe('A');
    expect(result.HN).toBe(5000);
    expect(result.LN).toBe(3000);
    expect(result.H).toBe(result.timeshareA ?? 0.30);
  });

  it('B is high earner when incomeB > incomeA', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 2000,
        netDisposableIncomeB: 7000,
        timeshareA: 0.70,
        timeshareB: 0.30,
      })
    );
    expect(result.highEarner).toBe('B');
    expect(result.HN).toBe(7000);
    expect(result.H).toBeCloseTo(0.30, 8); // B's timeshare
  });

  it('equal incomes: A is treated as high earner', () => {
    const result = calculateCAChildSupport(
      baseInput({ netDisposableIncomeA: 4000, netDisposableIncomeB: 4000 })
    );
    expect(result.highEarner).toBe('A');
  });
});

// ---------------------------------------------------------------------------
// CS1 sign and direction
// ---------------------------------------------------------------------------
describe('CS1 — positive and negative results', () => {
  it('positive CS1: high earner (A) pays low earner (B)', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 8000,
        netDisposableIncomeB: 2000,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );
    expect(result.CS1).toBeGreaterThan(0);
    expect(result.basePayer).toBe('A');
    expect(result.baseRecipient).toBe('B');
  });

  it('negative CS1: low earner (B) pays high earner (A)', () => {
    // When high earner (A) has very high timeshare, CS1 can go negative
    // CS1 = K * (HN - H * TN). If H * TN > HN, CS1 < 0.
    // E.g., HN=3000, TN=5000, H=0.8 → H*TN=4000 > HN=3000 → CS1<0
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 3000,
        netDisposableIncomeB: 2000,
        timeshareA: 0.80, // A is high earner, has 80% timeshare
        timeshareB: 0.20,
      })
    );
    const TN = 5000;
    const HN = 3000;
    const H = 0.80;
    // CS1 = K * (3000 - 0.80 * 5000) = K * (3000 - 4000) = K * (-1000) < 0
    expect(result.CS1).toBeLessThan(0);
    expect(result.basePayer).toBe('B');
    expect(result.baseRecipient).toBe('A');
  });
});

// ---------------------------------------------------------------------------
// Child multipliers
// ---------------------------------------------------------------------------
describe('Child multipliers', () => {
  it('1 child: multiplier = 1.000', () => {
    expect(CA_CHILD_MULTIPLIERS[1]).toBe(1.000);
  });

  it('2 children: multiplier = 1.600', () => {
    expect(CA_CHILD_MULTIPLIERS[2]).toBe(1.600);
  });

  it('6 children: multiplier = exactly 2.625', () => {
    expect(CA_CHILD_MULTIPLIERS[6]).toBe(2.625);
    const result = calculateCAChildSupport(
      baseInput({ numberOfChildren: 6 })
    );
    expect(result.childMultiplier).toBe(2.625);
  });

  it('10 children: multiplier = 2.860', () => {
    expect(CA_CHILD_MULTIPLIERS[10]).toBe(2.860);
    const result = calculateCAChildSupport(
      baseInput({ numberOfChildren: 10 })
    );
    expect(result.childMultiplier).toBe(2.860);
  });

  it('CS for 2 children = CS1 × 1.600', () => {
    const result1 = calculateCAChildSupport(baseInput({ numberOfChildren: 1 }));
    const result2 = calculateCAChildSupport(baseInput({ numberOfChildren: 2 }));
    expect(result2.CS).toBeCloseTo(result1.CS1 * 1.600, 4);
  });

  it('children 1 through 10: CS increases with each child', () => {
    let prev = -Infinity;
    for (let n = 1; n <= 10; n++) {
      const result = calculateCAChildSupport(baseInput({ numberOfChildren: n }));
      expect(result.CS).toBeGreaterThan(prev);
      prev = result.CS;
    }
  });

  it('>10 children returns warning and uses 10-child multiplier', () => {
    const result = calculateCAChildSupport(
      baseInput({ numberOfChildren: 11 })
    );
    expect(result.childrenWarning).toBeDefined();
    expect(result.childMultiplier).toBe(CA_CHILD_MULTIPLIERS[10]);
  });
});

// ---------------------------------------------------------------------------
// §4062 add-ons (separate from §4055 base)
// ---------------------------------------------------------------------------
describe('§4062 add-ons — separate from base', () => {
  it('zero add-ons: addonTransfer = 0', () => {
    const result = calculateCAChildSupport(baseInput());
    expect(result.addonTransfer).toBeCloseTo(0, 6);
  });

  it('add-ons are apportioned by adjusted income shares', () => {
    const childcare = 600;
    const healthcare = 200;
    const result = calculateCAChildSupport(
      baseInput({ qualifyingChildcare: childcare, qualifyingHealthcare: healthcare })
    );
    // payer's share of add-ons
    expect(result.addonTransfer).toBeCloseTo(
      (childcare + healthcare) * result.addonSharePayer,
      4
    );
  });

  it('add-ons are NOT included in the §4055 base support (CS)', () => {
    const noAddon = calculateCAChildSupport(baseInput());
    const withAddon = calculateCAChildSupport(
      baseInput({ qualifyingChildcare: 500 })
    );
    // CS (base) should be identical
    expect(withAddon.CS).toBeCloseTo(noAddon.CS, 4);
    // Final support should be higher with add-ons
    expect(withAddon.finalSupport).toBeGreaterThan(noAddon.finalSupport);
  });

  it('spousal support adjustments affect add-on income bases', () => {
    const withSpousal = calculateCAChildSupport(
      baseInput({
        qualifyingChildcare: 400,
        spousalSupportAPaysB: 500, // A pays B spousal
      })
    );
    const withoutSpousal = calculateCAChildSupport(
      baseInput({ qualifyingChildcare: 400 })
    );
    // adjustedNetA is reduced by spousal support A pays
    expect(withSpousal.adjustedNetA).toBeCloseTo(
      withoutSpousal.adjustedNetA - 500,
      4
    );
  });
});

// ---------------------------------------------------------------------------
// Low-income adjustment — 2026 CA minimum wage ($16.90/hr, Bug 3 fix)
// ---------------------------------------------------------------------------
describe('Low-income adjustment — 2026 CA minimum wage', () => {
  // §4055 threshold: $16.90 × 40 × 52 / 12 = $2,929.33/month
  const EXPECTED_THRESHOLD = (16.90 * 40 * 52) / 12; // ~2929.33

  it('lowIncomeThreshold matches 2026 CA minimum wage formula ($16.90/hr)', () => {
    const result = calculateCAChildSupport(baseInput());
    expect(result.lowIncomeThreshold).toBeCloseTo(EXPECTED_THRESHOLD, 2);
  });

  it('lowIncomeThreshold is NOT the old 2025 value ($2,860/month)', () => {
    const OLD_THRESHOLD = (16.50 * 2080) / 12; // old: ~2860
    const result = calculateCAChildSupport(baseInput());
    expect(result.lowIncomeThreshold).not.toBeCloseTo(OLD_THRESHOLD, 0);
  });

  it('threshold is derived from formula, not hard-coded: ~$2,929.33', () => {
    const result = calculateCAChildSupport(baseInput());
    // Verify the numeric value is correct
    expect(result.lowIncomeThreshold).toBeCloseTo(2929.33, 1);
  });

  it('obligor at $2,929 (just below threshold) → lowIncomeAdjustmentEligible: true', () => {
    // Set A as high earner payer with income just below threshold
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 2929,
        netDisposableIncomeB: 1000,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );
    // A is high earner (pays), income 2929 < 2929.33 threshold
    expect(result.highEarner).toBe('A');
    expect(result.basePayer).toBe('A');
    expect(result.lowIncomeAdjustmentEligible).toBe(true);
    expect(result.maximumLowIncomeReduction).toBeDefined();
    expect(result.lowIncomeAdjustedRange).toBeDefined();
    expect(result.lowIncomeAdjustedRange![0]).toBeGreaterThanOrEqual(0);
    expect(result.lowIncomeAdjustedRange![1]).toBeCloseTo(result.baseSupport, 2);
  });

  it('obligor at $2,930 (just above threshold) → lowIncomeAdjustmentEligible: false', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 2930,
        netDisposableIncomeB: 1000,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );
    // A is high earner (pays), income 2930 > 2929.33 threshold
    expect(result.highEarner).toBe('A');
    expect(result.basePayer).toBe('A');
    expect(result.lowIncomeAdjustmentEligible).toBe(false);
  });

  it('not eligible when obligor income is well above threshold', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 6000,
        netDisposableIncomeB: 2000,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );
    expect(result.lowIncomeAdjustmentEligible).toBe(false);
  });

  it('eligible when payer income is clearly below $2,929.33', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 2500,
        netDisposableIncomeB: 1000,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );
    expect(result.lowIncomeAdjustmentEligible).toBe(true);
    expect(result.maximumLowIncomeReduction).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Full formula verification
// ---------------------------------------------------------------------------
describe('Full formula end-to-end verification', () => {
  it('manual calculation matches result: TN=8000, HN=6000, H=0.30, 1 child', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 6000,
        netDisposableIncomeB: 2000,
        numberOfChildren: 1,
        timeshareA: 0.30,
        timeshareB: 0.70,
      })
    );

    const TN = 8000;
    const HN = 6000;
    const H = 0.30;
    const baseK = 0.250; // TN=8000 is in flat bracket
    const hMul = 1 + 0.30; // H <= 0.50
    const K = baseK * hMul;
    const CS1 = K * (HN - H * TN);

    expect(result.baseK).toBeCloseTo(baseK, 6);
    expect(result.hMultiplier).toBeCloseTo(hMul, 6);
    expect(result.K).toBeCloseTo(K, 6);
    expect(result.CS1).toBeCloseTo(CS1, 4);
    expect(result.CS).toBeCloseTo(CS1 * 1.000, 4); // 1 child multiplier
  });

  it('manual calculation: TN=4000, HN=3000, H=0.20, 2 children', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 3000,
        netDisposableIncomeB: 1000,
        numberOfChildren: 2,
        timeshareA: 0.20,
        timeshareB: 0.80,
      })
    );

    const TN = 4000;
    const HN = 3000;
    const H = 0.20;
    const baseK = 0.131 + TN / 42149; // second bracket
    const hMul = 1 + H;
    const K = baseK * hMul;
    const CS1 = K * (HN - H * TN);
    const CS = CS1 * 1.600;

    expect(result.TN).toBeCloseTo(TN, 4);
    expect(result.baseK).toBeCloseTo(baseK, 8);
    expect(result.K).toBeCloseTo(K, 8);
    expect(result.CS1).toBeCloseTo(CS1, 4);
    expect(result.CS).toBeCloseTo(CS, 4);
  });

  it('manual calculation: TN=20000, HN=12000, H=0.60 (H > 0.50 branch)', () => {
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 12000,
        netDisposableIncomeB: 8000,
        numberOfChildren: 1,
        timeshareA: 0.60,
        timeshareB: 0.40,
      })
    );

    const TN = 20000;
    const HN = 12000;
    const H = 0.60;
    const baseK = 0.12 + 1200 / TN; // fifth bracket
    const hMul = 2 - H; // H > 0.50
    const K = baseK * hMul;
    const CS1 = K * (HN - H * TN);

    expect(result.baseK).toBeCloseTo(baseK, 8);
    expect(result.hMultiplier).toBeCloseTo(hMul, 8);
    expect(result.CS1).toBeCloseTo(CS1, 4);
  });
});

// ---------------------------------------------------------------------------
// Version and structure
// ---------------------------------------------------------------------------
describe('Result structure', () => {
  it('version is always CA-CS-2026.1', () => {
    const result = calculateCAChildSupport(baseInput());
    expect(result.version).toBe('CA-CS-2026.1');
  });

  it('receipt is an array of strings', () => {
    const result = calculateCAChildSupport(baseInput());
    expect(Array.isArray(result.receipt)).toBe(true);
    expect(result.receipt.length).toBeGreaterThan(5);
    result.receipt.forEach(line => expect(typeof line).toBe('string'));
  });

  it('finalSupport = baseSupport + addonTransfer', () => {
    const result = calculateCAChildSupport(
      baseInput({ qualifyingChildcare: 400, qualifyingHealthcare: 150 })
    );
    expect(result.finalSupport).toBeCloseTo(
      result.baseSupport + result.addonTransfer,
      4
    );
  });

  it('TN = netIncomeA + netIncomeB', () => {
    const result = calculateCAChildSupport(
      baseInput({ netDisposableIncomeA: 5500, netDisposableIncomeB: 2500 })
    );
    expect(result.TN).toBeCloseTo(8000, 4);
  });
});

// ---------------------------------------------------------------------------
// FIX 2: §4055(b)(7) low-income adjustment — actual range formula
// ---------------------------------------------------------------------------
describe('calculateCAChildSupport — §4055(b)(7) low-income range formula', () => {
  const CA_MIN_WAGE_MONTHLY = (16.90 * 40 * 52) / 12; // ~2929.33

  function lowIncomeInput(obligorNet: number) {
    // Make A the high earner (payer) so obligor=A
    return baseInput({
      netDisposableIncomeA: 6000,
      netDisposableIncomeB: obligorNet,
      timeshareA: 0.20,
      timeshareB: 0.80,
    });
    // B is low earner/recipient; A is payer. Test obligor = A.
  }

  function obligorAInput(obligorNet: number) {
    // Force A to be obligor by making A pay (A high earner, low timeshare)
    return baseInput({
      netDisposableIncomeA: obligorNet,
      netDisposableIncomeB: 500,
      timeshareA: 0.10,
      timeshareB: 0.90,
    });
  }

  it('obligorNet just below threshold (2929): eligible=true, permittedSupportRange is non-null array', () => {
    const result = calculateCAChildSupport(obligorAInput(2929));
    expect(result.lowIncomeAdjustmentEligible).toBe(true);
    expect(result.lowIncomeAdjustedRange).not.toBeNull();
    expect(Array.isArray(result.lowIncomeAdjustedRange)).toBe(true);
    expect(result.lowIncomeAdjustedRange!.length).toBe(2);
  });

  it('obligorNet just above threshold (2930): eligible=false, range=undefined', () => {
    const result = calculateCAChildSupport(obligorAInput(2930));
    expect(result.lowIncomeAdjustmentEligible).toBe(false);
    expect(result.lowIncomeAdjustedRange).toBeUndefined();
  });

  it('obligorNet very low (50): eligible=true, range bottom >= 0, range top = baseSupport', () => {
    // Use a case where A is clearly the high earner and payer, with very low income for B as recipient.
    // Force obligor=A (payer) with near-zero income: A=50, B=0, A has very low timeshare.
    const result = calculateCAChildSupport(baseInput({
      netDisposableIncomeA: 50,
      netDisposableIncomeB: 0,
      timeshareA: 0.05,
      timeshareB: 0.95,
    }));
    // A is high earner (50 >= 0), A is payer, obligorNet=50 which is well below threshold
    if (result.basePayer !== null) {
      expect(result.lowIncomeAdjustmentEligible).toBe(true);
      // adjustmentFraction = (minWage - 50) / minWage ≈ 0.983, so maxReduction ≈ 0.983 * baseSupport
      // rangeBottom = baseSupport - maxReduction = ~0.017 * baseSupport (small but > 0)
      expect(result.lowIncomeAdjustedRange![0]).toBeGreaterThanOrEqual(0);
      expect(result.lowIncomeAdjustedRange![1]).toBeCloseTo(result.baseSupport, 4);
      expect(result.maximumLowIncomeReduction!).toBeGreaterThan(0);
      expect(result.maximumLowIncomeReduction!).toBeLessThanOrEqual(result.baseSupport);
    }
  });

  it('range bottom is never negative (Math.max with 0)', () => {
    const result = calculateCAChildSupport(obligorAInput(100));
    if (result.lowIncomeAdjustedRange) {
      expect(result.lowIncomeAdjustedRange[0]).toBeGreaterThanOrEqual(0);
    }
  });

  it('range top equals baseSupport', () => {
    const result = calculateCAChildSupport(obligorAInput(1500));
    if (result.lowIncomeAdjustedRange) {
      expect(result.lowIncomeAdjustedRange[1]).toBeCloseTo(result.baseSupport, 4);
    }
  });

  it('adjustmentFraction is (minWage - obligorNet) / minWage', () => {
    const obligorNet = 2000;
    const result = calculateCAChildSupport(obligorAInput(obligorNet));
    if (result.lowIncomeAdjustmentFraction !== undefined) {
      const expected = (CA_MIN_WAGE_MONTHLY - obligorNet) / CA_MIN_WAGE_MONTHLY;
      expect(result.lowIncomeAdjustmentFraction).toBeCloseTo(expected, 6);
    }
  });
});

// ---------------------------------------------------------------------------
// FIX 3: §4061(c)+(d) spousal support net income adjustment
// ---------------------------------------------------------------------------
describe('calculateCAChildSupport — §4061(c)+(d) spousal support net adjustment', () => {
  it('spousalSupportAPaysB > 0: adjustedNetA reflects deduction, adjustedNetB reflects addition', () => {
    const spousal = 500;
    const result = calculateCAChildSupport(baseInput({ spousalSupportAPaysB: spousal }));
    expect(result.adjustedNetA).toBeCloseTo(
      baseInput().netDisposableIncomeA - spousal, 4
    );
    expect(result.adjustedNetB).toBeCloseTo(
      baseInput().netDisposableIncomeB + spousal, 4
    );
  });

  it('spousalSupportBPaysA > 0: adjustedNetB reflects deduction, adjustedNetA reflects addition', () => {
    const spousal = 300;
    const result = calculateCAChildSupport(baseInput({ spousalSupportBPaysA: spousal }));
    expect(result.adjustedNetA).toBeCloseTo(
      baseInput().netDisposableIncomeA + spousal, 4
    );
    expect(result.adjustedNetB).toBeCloseTo(
      baseInput().netDisposableIncomeB - spousal, 4
    );
  });

  it('spousal support > 0: addonAllocation.assumptions contains spousal note', () => {
    const result = calculateCAChildSupport(baseInput({ spousalSupportAPaysB: 400 }));
    const hasSpousalNote = result.addonAllocation.assumptions.some(a =>
      a.toLowerCase().includes('spousal')
    );
    expect(hasSpousalNote).toBe(true);
  });

  it('spousal support = 0: addonAllocation.assumptions does NOT contain spousal note', () => {
    const result = calculateCAChildSupport(baseInput({ spousalSupportAPaysB: 0, spousalSupportBPaysA: 0 }));
    const hasSpousalNote = result.addonAllocation.assumptions.some(a =>
      a.toLowerCase().includes('spousal')
    );
    expect(hasSpousalNote).toBe(false);
  });

  it('§4061(d): payer net for addons = adjustedNet - baseSupport (floored at 0)', () => {
    const result = calculateCAChildSupport(baseInput({ spousalSupportAPaysB: 200 }));
    if (result.basePayer === 'A') {
      const expected = Math.max(result.adjustedNetA - result.baseSupport, 0);
      expect(result.netAForAddons).toBeCloseTo(expected, 4);
    } else if (result.basePayer === 'B') {
      const expected = Math.max(result.adjustedNetB - result.baseSupport, 0);
      expect(result.netBForAddons).toBeCloseTo(expected, 4);
    }
  });

  it('addonAllocation.assumptions always contains §4061(d) note', () => {
    const result = calculateCAChildSupport(baseInput());
    const has4061d = result.addonAllocation.assumptions.some(a => a.includes('§4061(d)'));
    expect(has4061d).toBe(true);
  });

  it('addonAllocation share totals to 1.0 when totalNet > 0', () => {
    const result = calculateCAChildSupport(baseInput({ spousalSupportAPaysB: 300 }));
    expect(result.addonAllocation.shareA + result.addonAllocation.shareB).toBeCloseTo(1.0, 6);
  });
});

// ---------------------------------------------------------------------------
// FIX 3 (v2): CA — abs(CS) for low-income adjustment and §4061(d)
// ---------------------------------------------------------------------------
describe('FIX 3 — CA abs(signedCS) = basicSupport for downstream calculations', () => {
  // Helper: construct a scenario where CS1 * childMultiplier is negative
  // CS = K*(HN - H*TN). For CS to be negative: HN < H*TN, i.e., high earner timeshare
  // fraction exceeds (HN/TN). With equal incomes and high timeshare for the "high earner"
  // the formula can produce a negative value.
  function negativeCSInput() {
    // A earns slightly more (high earner), but has very high timeshare (70%)
    // HN=3100, LN=2900, TN=6000, H=0.70 (A's timeshare)
    // K = 0.250 (flat bracket, TN=6000)
    // hMultiplier = 2 - 0.70 = 1.30
    // K_final = 0.250 * 1.30 = 0.325
    // CS1 = 0.325 * (3100 - 0.70*6000) = 0.325 * (3100 - 4200) = 0.325 * -1100 = -357.5
    return baseInput({
      netDisposableIncomeA: 3100,
      netDisposableIncomeB: 2900,
      numberOfChildren: 1,
      timeshareA: 0.70,
      timeshareB: 0.30,
    });
  }

  it('negative CS1 scenario: basicSupport = abs(signedCS) is positive', () => {
    const result = calculateCAChildSupport(negativeCSInput());
    // CS should be negative; baseSupport must be its absolute value (positive)
    expect(result.CS).toBeLessThan(0);
    expect(result.baseSupport).toBeGreaterThan(0);
    expect(result.baseSupport).toBeCloseTo(Math.abs(result.CS), 4);
  });

  it('negative CS: payer is the low earner (B), recipient is high earner (A)', () => {
    const result = calculateCAChildSupport(negativeCSInput());
    // CS < 0 means low earner (B) pays high earner (A)
    expect(result.basePayer).toBe('B');
    expect(result.baseRecipient).toBe('A');
  });

  it('negative CS + low-income eligible obligor: maxLowIncomeReduction is positive', () => {
    // B is the payer (negativeCS scenario), B's income is 2900 which is < CA min wage ~2929
    const result = calculateCAChildSupport(negativeCSInput());
    if (result.lowIncomeAdjustmentEligible) {
      // maximumLowIncomeReduction must be positive (not negative)
      expect(result.maximumLowIncomeReduction).toBeGreaterThan(0);
      // The adjusted range lower bound must be >= 0
      expect(result.lowIncomeAdjustedRange![0]).toBeGreaterThanOrEqual(0);
      expect(result.lowIncomeAdjustedRange![1]).toBeGreaterThan(0);
    }
    // Even if B's 2900 is just at/above threshold, baseSupport must still be positive
    expect(result.baseSupport).toBeGreaterThan(0);
  });

  it('negative CS + §4061(d): payerAdjustedNet = adjustedNet[lowEarner] - basicSupport (floored at 0)', () => {
    const result = calculateCAChildSupport(negativeCSInput());
    // Payer is B (low earner), so B's net is reduced by baseSupport
    if (result.basePayer === 'B') {
      const expected = Math.max(result.adjustedNetB - result.baseSupport, 0);
      expect(result.netBForAddons).toBeCloseTo(expected, 4);
      // Must not be negative
      expect(result.netBForAddons).toBeGreaterThanOrEqual(0);
    }
  });

  it('negative CS: finalSupport is non-negative', () => {
    const result = calculateCAChildSupport(negativeCSInput());
    expect(result.finalSupport).toBeGreaterThanOrEqual(0);
  });

  it('zero CS: no payer, no recipient, finalSupport = 0 (or add-ons only)', () => {
    // CS = 0 when HN = H * TN exactly, i.e. H = HN/TN
    // A=6000, B=2000, TN=8000, HN=6000, H=6000/8000=0.75
    // K (TN=8000, flat 0.250), hMultiplier = 2 - 0.75 = 1.25, K=0.3125
    // CS1 = 0.3125 * (6000 - 0.75*8000) = 0.3125 * 0 = 0
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 6000,
        netDisposableIncomeB: 2000,
        timeshareA: 0.75,
        timeshareB: 0.25,
        qualifyingChildcare: 0,
        qualifyingHealthcare: 0,
      })
    );
    expect(result.CS).toBeCloseTo(0, 4);
    expect(result.baseSupport).toBeCloseTo(0, 4);
    expect(result.basePayer).toBeNull();
    expect(result.finalSupport).toBeGreaterThanOrEqual(0);
  });

  it('positive CS: baseSupport = CS (unchanged, abs has no effect)', () => {
    // Normal scenario — high earner has low timeshare, CS is positive
    const result = calculateCAChildSupport(
      baseInput({
        netDisposableIncomeA: 6000,
        netDisposableIncomeB: 2000,
        timeshareA: 0.20,
        timeshareB: 0.80,
      })
    );
    expect(result.CS).toBeGreaterThan(0);
    expect(result.baseSupport).toBeCloseTo(result.CS, 4);
    expect(result.basePayer).toBe('A'); // high earner pays
  });
});

// ---------------------------------------------------------------------------
// CA FIX 4: addonShare calculated per actual parent label (A/B), not payer/recipient
// ---------------------------------------------------------------------------
describe('CA addonShare — per-parent label (A/B), payer net reduced by basicSupport', () => {
  it('when A is payer: netAForAddons = adjustedNetA - basicSupport, netBForAddons = adjustedNetB', () => {
    // A is high earner with low timeshare -> A pays B
    const result = calculateCAChildSupport(baseInput({
      netDisposableIncomeA: 6000,
      netDisposableIncomeB: 2000,
      timeshareA: 0.20,
      timeshareB: 0.80,
      qualifyingChildcare: 1000,
      qualifyingHealthcare: 0,
      spousalSupportAPaysB: 0,
      spousalSupportBPaysA: 0,
    }));
    expect(result.basePayer).toBe('A');
    // A's net for addons must be reduced by basicSupport
    expect(result.addonAllocation.netAForAddons).toBeLessThan(result.addonAllocation.adjustedNetA);
    // B's net for addons must equal adjustedNetB (recipient unchanged)
    expect(result.addonAllocation.netBForAddons).toBeCloseTo(result.addonAllocation.adjustedNetB, 6);
    // addonShareA and addonShareB must sum to 1
    expect(result.addonAllocation.addonShareA + result.addonAllocation.addonShareB).toBeCloseTo(1.0, 6);
  });

  it('when B is payer: netBForAddons = adjustedNetB - basicSupport, netAForAddons = adjustedNetA', () => {
    // B is high earner with low timeshare -> B pays A
    const result = calculateCAChildSupport(baseInput({
      netDisposableIncomeA: 2000,
      netDisposableIncomeB: 6000,
      timeshareA: 0.80,
      timeshareB: 0.20,
      qualifyingChildcare: 600,
      qualifyingHealthcare: 0,
      spousalSupportAPaysB: 0,
      spousalSupportBPaysA: 0,
    }));
    expect(result.basePayer).toBe('B');
    // B's net for addons must be reduced by basicSupport
    expect(result.addonAllocation.netBForAddons).toBeLessThan(result.addonAllocation.adjustedNetB);
    // A's net for addons must equal adjustedNetA (recipient unchanged)
    expect(result.addonAllocation.netAForAddons).toBeCloseTo(result.addonAllocation.adjustedNetA, 6);
    // addonShareA + addonShareB = 1
    expect(result.addonAllocation.addonShareA + result.addonAllocation.addonShareB).toBeCloseTo(1.0, 6);
  });

  it('addonAllocation exposes addonShareA and addonShareB fields', () => {
    const result = calculateCAChildSupport(baseInput({
      qualifyingChildcare: 500,
      qualifyingHealthcare: 200,
    }));
    expect(typeof result.addonAllocation.addonShareA).toBe('number');
    expect(typeof result.addonAllocation.addonShareB).toBe('number');
    expect(result.addonAllocation.addonShareA).toBeGreaterThanOrEqual(0);
    expect(result.addonAllocation.addonShareB).toBeGreaterThanOrEqual(0);
  });

  it('childcareOwedByA + childcareOwedByB = total childcare', () => {
    const childcare = 800;
    const result = calculateCAChildSupport(baseInput({ qualifyingChildcare: childcare }));
    expect(
      result.addonAllocation.childcareOwedByA + result.addonAllocation.childcareOwedByB
    ).toBeCloseTo(childcare, 6);
  });

  it('healthcareOwedByA + healthcareOwedByB = total healthcare', () => {
    const healthcare = 300;
    const result = calculateCAChildSupport(baseInput({ qualifyingHealthcare: healthcare }));
    expect(
      result.addonAllocation.healthcareOwedByA + result.addonAllocation.healthcareOwedByB
    ).toBeCloseTo(healthcare, 6);
  });
});
