/**
 * California Child Support Calculator
 * Version: CA-CS-2026.1
 * Authority: California Family Code §4055
 *
 * Complete rewrite — do NOT patch the old implementation.
 * The prior version used flat K tiers (incorrect).
 * This version uses bracket-specific K equations + H% multiplier applied to K.
 */

// ---------------------------------------------------------------------------
// §4055 Guideline formula
// ---------------------------------------------------------------------------

/**
 * Get the base K factor using the exact bracket equations from §4055.
 * Do NOT interpolate. Do NOT use flat percentages.
 */
export function getCABaseK(TN: number): number {
  if (TN <= 2900) return 0.165 + TN / 82857;
  if (TN <= 5000) return 0.131 + TN / 42149;
  if (TN <= 10000) return 0.250;
  if (TN <= 15000) return 0.10 + 1499 / TN;
  return 0.12 + 1200 / TN;
}

/** Multiplier table for number of children */
export const CA_CHILD_MULTIPLIERS: Record<number, number> = {
  1:  1.000,
  2:  1.600,
  3:  2.000,
  4:  2.300,
  5:  2.500,
  6:  2.625,
  7:  2.750,
  8:  2.813,
  9:  2.844,
  10: 2.860,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CAChildSupportInput {
  /** Parent A net disposable monthly income */
  netDisposableIncomeA: number;
  /** Parent B net disposable monthly income */
  netDisposableIncomeB: number;
  /** Number of children */
  numberOfChildren: number;

  /**
   * Timeshare for Parent A — the fraction of time the high earner has the children.
   * Expressed as a decimal (e.g. 0.30 for 30%).
   * NOTE: H is the high earner's timeshare; if A is NOT the high earner, use B's timeshare.
   * Pass both and the calculator will select the correct one.
   */
  timeshareA: number; // fraction 0-1
  timeshareB: number; // fraction 0-1

  // ---- §4062 add-on inputs ----
  /** Qualifying work/education childcare under §4062(a)(1) */
  qualifyingChildcare: number;
  /** Uninsured healthcare costs under §4062(a)(2) */
  qualifyingHealthcare: number;

  // ---- Spousal support adjustments ----
  /** Monthly spousal support A pays to B (or 0) */
  spousalSupportAPaysB: number;
  /** Monthly spousal support B pays to A (or 0) */
  spousalSupportBPaysA: number;
}

export interface CAChildSupportResult {
  version: 'CA-CS-2026.1';

  // ---- Income ----
  TN: number; // total net disposable income
  highEarner: 'A' | 'B';
  HN: number; // high earner's net disposable income
  LN: number; // low earner's net disposable income
  H: number;  // high earner's timeshare (decimal)

  // ---- K calculation ----
  kBracket: string; // which formula was used
  baseK: number;
  hMultiplier: number; // 1+H or 2-H
  K: number;

  // ---- §4055 base support ----
  CS1: number;         // one-child guideline (can be negative)
  childMultiplier: number;
  CS: number;          // multi-child guideline

  // ---- Base support payer ----
  basePayer: 'A' | 'B' | null;
  baseRecipient: 'A' | 'B' | null;
  baseSupport: number;

  // ---- Low-income adjustment (§4055(b)(7)) ----
  lowIncomeAdjustmentEligible: boolean;
  lowIncomeThreshold: number; // CA minimum wage full-time monthly
  maximumLowIncomeReduction?: number;
  lowIncomeAdjustmentFraction?: number;
  lowIncomeAdjustedRange?: [number, number];
  lowIncomeNote?: string;

  // ---- §4062 add-ons (§4061(c)+(d) net adjustment) ----
  adjustedNetA: number;
  adjustedNetB: number;
  netAForAddons: number;
  netBForAddons: number;
  payerAdjustedNetForAddons: number;
  recipientAdjustedNet: number;
  totalAdjustedForAddons: number;
  addonSharePayer: number;
  addonShareRecipient: number;
  addonTransfer: number;
  addonAllocation: {
    adjustedNetA: number;
    adjustedNetB: number;
    netAForAddons: number;
    netBForAddons: number;
    addonShareA: number;
    addonShareB: number;
    shareA: number; // alias for addonShareA
    shareB: number; // alias for addonShareB
    childcareOwedByA: number;
    childcareOwedByB: number;
    healthcareOwedByA: number;
    healthcareOwedByB: number;
    assumptions: string[];
  };

  // ---- Final ----
  finalSupport: number;
  payer: 'A' | 'B' | null;
  recipient: 'A' | 'B' | null;

  /** Warning for >10 children */
  childrenWarning?: string;

  /** Human-readable receipt lines for UI display */
  receipt: string[];
}

// ---------------------------------------------------------------------------
// Main calculation function
// ---------------------------------------------------------------------------

/**
 * California minimum wage effective 2026-01-01: $16.90/hr (per Jan 1 2026 increase).
 * §4055 defines the low-income threshold as: hourlyRate × 40 hrs × 52 weeks ÷ 12 months.
 * Update only the hourly rate here to keep the formula accurate for future changes.
 */
const CA_MINIMUM_WAGE = {
  effectiveDate: '2026-01-01',
  hourly: 16.90,
};

const CA_MIN_WAGE_MONTHLY =
  (CA_MINIMUM_WAGE.hourly * 40 * 52) / 12; // ~$2,929.33/month

export function calculateCAChildSupport(
  input: CAChildSupportInput
): CAChildSupportResult {
  const {
    netDisposableIncomeA,
    netDisposableIncomeB,
    numberOfChildren,
    timeshareA,
    timeshareB,
    qualifyingChildcare,
    qualifyingHealthcare,
    spousalSupportAPaysB,
    spousalSupportBPaysA,
  } = input;

  // ---- Step 1: Identify high earner ----
  const TN = netDisposableIncomeA + netDisposableIncomeB;
  const highEarner: 'A' | 'B' =
    netDisposableIncomeA >= netDisposableIncomeB ? 'A' : 'B';
  const HN = highEarner === 'A' ? netDisposableIncomeA : netDisposableIncomeB;
  const LN = highEarner === 'A' ? netDisposableIncomeB : netDisposableIncomeA;
  const H = highEarner === 'A' ? timeshareA : timeshareB;

  // ---- Step 2: Base K (exact bracket equations) ----
  const baseK = getCABaseK(TN);

  let kBracket: string;
  if (TN <= 2900) {
    kBracket = 'TN ≤ $2,900';
  } else if (TN <= 5000) {
    kBracket = '$2.9k < TN ≤ $5k';
  } else if (TN <= 10000) {
    kBracket = '$5k < TN ≤ $10k (flat 0.250)';
  } else if (TN <= 15000) {
    kBracket = '$10k < TN ≤ $15k';
  } else {
    kBracket = 'TN > $15k';
  }

  // ---- Step 3: Apply H% adjustment to K ----
  const hMultiplier = H <= 0.50 ? (1 + H) : (2 - H);
  const K = baseK * hMultiplier;

  // ---- Step 4: One-child guideline (signed) ----
  const CS1 = K * (HN - H * TN);
  // CS1 can be negative — do not force positive

  // ---- Step 5: Multiple children ----
  let childrenWarning: string | undefined;
  let childMultiplier: number;

  if (numberOfChildren > 10) {
    childrenWarning =
      'More than 10 children: the California §4055 multiplier table ends at 10. ' +
      'This calculation requires manual review by a family law attorney.';
    childMultiplier = CA_CHILD_MULTIPLIERS[10]; // use 10-child multiplier as floor
  } else {
    childMultiplier = CA_CHILD_MULTIPLIERS[numberOfChildren] ?? CA_CHILD_MULTIPLIERS[10];
  }

  const signedCS = CS1 * childMultiplier;
  // CS is kept as alias for the signed value (used in receipt and result fields)
  const CS = signedCS;

  // ---- Step 6: Determine payer from sign; use abs value for all downstream calculations ----
  // Using Math.abs(signedCS) as basicSupport prevents negative reduction amounts
  // when the lower earner is the obligor (negative CS scenario).
  let basePayer: 'A' | 'B' | null;
  let baseRecipient: 'A' | 'B' | null;

  if (signedCS > 0) {
    // High earner pays low earner
    basePayer = highEarner;
    baseRecipient = highEarner === 'A' ? 'B' : 'A';
  } else if (signedCS < 0) {
    // Rare edge case: low earner pays high earner
    basePayer = highEarner === 'A' ? 'B' : 'A';
    baseRecipient = highEarner;
  } else {
    basePayer = null;
    baseRecipient = null;
  }

  // Use absolute value for all downstream calculations (low-income adjustment + §4061(d))
  const basicSupport = Math.abs(signedCS);
  const baseSupport = basicSupport;

  // ---- Step 7: Low-income adjustment (§4055(b)(7) statutory range formula) ----
  // Uses basicSupport (unsigned) so maxLowIncomeReduction is always positive.
  const netDisposableIncome: Record<'A' | 'B', number> = {
    A: netDisposableIncomeA,
    B: netDisposableIncomeB,
  };
  const obligorNet = basePayer !== null ? netDisposableIncome[basePayer] : 0;
  const minimumWageMonthly = CA_MIN_WAGE_MONTHLY;
  const lowIncomeAdjustmentEligible =
    basePayer !== null && obligorNet < minimumWageMonthly;

  let maximumLowIncomeReduction: number | undefined;
  let lowIncomeAdjustedRange: [number, number] | undefined;
  let lowIncomeAdjustmentFraction: number | undefined;
  let lowIncomeNote: string | undefined;

  if (lowIncomeAdjustmentEligible) {
    // §4055(b)(7): adjustment fraction = (minWage - obligorNet) / minWage
    const adjustmentFraction =
      (minimumWageMonthly - obligorNet) / minimumWageMonthly;
    // Use basicSupport (unsigned) so maxReduction is always positive
    const maxReduction = basicSupport * adjustmentFraction;

    lowIncomeAdjustmentFraction = adjustmentFraction;
    maximumLowIncomeReduction = maxReduction;
    lowIncomeAdjustedRange = [
      Math.max(basicSupport - maxReduction, 0),
      basicSupport,
    ];
    lowIncomeNote =
      'Low-income adjustment may apply (§4055(b)(7)). The court has discretion to reduce ' +
      'support within the range shown. This calculator cannot select the final amount — ' +
      'that determination requires judicial discretion.';
  } else if (basePayer !== null) {
    lowIncomeNote =
      'Low-income adjustment does not apply (obligor income at or above minimum wage threshold).';
  }

  // Alias for receipt line (backward compat)
  const obligorNetIncome = obligorNet;

  // ---- Step 8: §4062 add-ons with §4061(c)+(d) spousal support net adjustment ----
  // §4061(c): apply spousal support adjustments to net disposable income.
  // Note: precise recomputation requires gross income (§4059); since this calculator
  // takes net as input, we apply the adjustment directly to net as an approximation.
  const hasSpousalSupport = spousalSupportAPaysB > 0 || spousalSupportBPaysA > 0;
  const spousalAdjustmentNote = hasSpousalSupport
    ? 'Spousal support adjustment applied to net income (approximation). ' +
      'A precise §4061(c) calculation requires gross income and §4059 recomputation.'
    : undefined;

  // §4061(c): approximate adjusted net incomes per parent label (A and B)
  const adjustedNetA =
    netDisposableIncomeA - spousalSupportAPaysB + spousalSupportBPaysA;
  const adjustedNetB =
    netDisposableIncomeB - spousalSupportBPaysA + spousalSupportAPaysB;

  // §4061(d): reduce the PAYER's adjusted net by basicSupport.
  // Build net-for-addons per actual parent label (A/B), not generic payer/recipient.
  let netAForAddons = adjustedNetA;
  let netBForAddons = adjustedNetB;

  if (basePayer === 'A') {
    netAForAddons = Math.max(adjustedNetA - basicSupport, 0);
  }
  if (basePayer === 'B') {
    netBForAddons = Math.max(adjustedNetB - basicSupport, 0);
  }

  // Per-parent proportional shares
  const totalNetForAddons = netAForAddons + netBForAddons;
  const addonShareA = totalNetForAddons > 0 ? netAForAddons / totalNetForAddons : 0.5;
  const addonShareB = totalNetForAddons > 0 ? netBForAddons / totalNetForAddons : 0.5;

  const shareAForAddons = addonShareA;
  const shareBForAddons = addonShareB;

  const addonSharePayer =
    basePayer === 'A' ? addonShareA :
    basePayer === 'B' ? addonShareB : 0;
  const addonShareRecipient =
    baseRecipient === 'A' ? addonShareA :
    baseRecipient === 'B' ? addonShareB : 0;

  const payerAdjustedNetForAddons =
    basePayer === 'A' ? netAForAddons :
    basePayer === 'B' ? netBForAddons : 0;
  const recipientAdjustedNet =
    baseRecipient === 'A' ? netAForAddons :
    baseRecipient === 'B' ? netBForAddons : 0;
  const totalAdjustedForAddons = totalNetForAddons;

  const addonTransfer =
    (qualifyingChildcare + qualifyingHealthcare) * addonSharePayer;

  const addonAssumptions: string[] = [
    ...(spousalAdjustmentNote ? [spousalAdjustmentNote] : []),
    '§4061(d) reduction applied to paying parent\'s adjusted net income (per-parent-label method).',
  ];

  const addonAllocation = {
    adjustedNetA,
    adjustedNetB,
    netAForAddons,
    netBForAddons,
    addonShareA,
    addonShareB,
    shareA: addonShareA,
    shareB: addonShareB,
    childcareOwedByA: qualifyingChildcare * addonShareA,
    childcareOwedByB: qualifyingChildcare * addonShareB,
    healthcareOwedByA: qualifyingHealthcare * addonShareA,
    healthcareOwedByB: qualifyingHealthcare * addonShareB,
    assumptions: addonAssumptions,
  };
  const finalSupport = baseSupport + addonTransfer;

  const payer: 'A' | 'B' | null = basePayer;
  const recipient: 'A' | 'B' | null = baseRecipient;

  // ---- Receipt ----
  const receipt = [
    `Net disposable income A: $${netDisposableIncomeA.toFixed(2)}`,
    `Net disposable income B: $${netDisposableIncomeB.toFixed(2)}`,
    `Total net (TN): $${TN.toFixed(2)}`,
    `High earner: ${highEarner}`,
    `High earner timeshare (H): ${(H * 100).toFixed(1)}%`,
    `K bracket: ${kBracket}`,
    `Base K: ${baseK.toFixed(6)}`,
    `H multiplier (${H <= 0.50 ? '1+H' : '2-H'}): ${hMultiplier.toFixed(6)}`,
    `Final K: ${K.toFixed(6)}`,
    `One-child guideline (CS1): $${CS1.toFixed(2)}`,
    `Child multiplier (${numberOfChildren} children): ${childMultiplier.toFixed(3)}`,
    `Base support (CS): $${CS.toFixed(2)}`,
    `Add-ons (§4062): $${addonTransfer.toFixed(2)}`,
    `Final support: $${finalSupport.toFixed(2)}/month [${payer ?? 'Neither'} → ${recipient ?? 'Neither'}]`,
    `Calculator version: CA-CS-2026.1`,
  ];

  if (childrenWarning) receipt.push(`Warning: ${childrenWarning}`);
  if (lowIncomeAdjustmentEligible && lowIncomeAdjustedRange) {
    receipt.push(
      `Low-income adjustment eligible: Yes (§4055(b)(7))`,
      `Obligor net income: $${obligorNetIncome.toFixed(2)} < CA min wage $${CA_MIN_WAGE_MONTHLY.toFixed(2)}/mo`,
      `Adjustment fraction: ${((lowIncomeAdjustmentFraction ?? 0) * 100).toFixed(2)}%`,
      `Maximum reduction: $${(maximumLowIncomeReduction ?? 0).toFixed(2)}`,
      `Permitted support range: $${lowIncomeAdjustedRange[0].toFixed(2)} – $${lowIncomeAdjustedRange[1].toFixed(2)}/month (court discretion)`,
      `Note: ${lowIncomeNote}`
    );
  }
  if (hasSpousalSupport) {
    receipt.push(
      `§4061(c) spousal adjustment: A net $${adjustedNetA.toFixed(2)}, B net $${adjustedNetB.toFixed(2)} (approx — gross income required for exact)`,
      `§4061(d) payer net for add-ons: $${payerAdjustedNetForAddons.toFixed(2)}`
    );
    addonAllocation.assumptions.filter(a => a.includes('Spousal')).forEach(a => receipt.push(`Assumption: ${a}`));
  }

  return {
    version: 'CA-CS-2026.1',
    TN,
    highEarner,
    HN,
    LN,
    H,
    kBracket,
    baseK,
    hMultiplier,
    K,
    CS1,
    childMultiplier,
    CS,
    basePayer,
    baseRecipient,
    baseSupport,
    lowIncomeAdjustmentEligible,
    lowIncomeThreshold: CA_MIN_WAGE_MONTHLY,
    maximumLowIncomeReduction,
    lowIncomeAdjustmentFraction,
    lowIncomeAdjustedRange,
    lowIncomeNote,
    adjustedNetA,
    adjustedNetB,
    netAForAddons,
    netBForAddons,
    payerAdjustedNetForAddons,
    recipientAdjustedNet,
    totalAdjustedForAddons,
    addonSharePayer,
    addonShareRecipient,
    addonTransfer,
    addonAllocation,
    finalSupport,
    payer,
    recipient,
    childrenWarning,
    receipt,
  };
}
