/**
 * Florida Child Support Calculator
 * Version: FL-CS-2026.1
 * Authority: Florida Statutes §61.30
 *
 * Complete rewrite — do NOT patch the old implementation.
 * The prior version used a flat 20% overnight credit (incorrect).
 * This version uses the 1.5× cross-timeshare method for substantial time-sharing.
 */

// ---------------------------------------------------------------------------
// §61.30 Guideline Schedule
// [combinedIncome, 1child, 2children, 3children, 4children, 5children, 6children]
// ---------------------------------------------------------------------------
const FL_SCHEDULE: [number, number, number, number, number, number, number][] = [
  [800,   170,  247,  285,  316,  344,  369],
  [900,   196,  285,  328,  364,  396,  424],
  [1000,  224,  326,  375,  416,  453,  485],
  [1100,  240,  349,  402,  446,  485,  520],
  [1200,  253,  368,  424,  470,  512,  549],
  [1300,  266,  387,  445,  494,  538,  577],
  [1400,  279,  406,  467,  518,  564,  605],
  [1500,  292,  425,  489,  542,  590,  632],
  [1600,  336,  489,  562,  623,  679,  728],
  [1700,  349,  508,  584,  648,  706,  756],
  [1800,  362,  527,  607,  673,  733,  785],
  [1900,  375,  546,  628,  697,  759,  813],
  [2000,  402,  585,  673,  747,  813,  871],
  [2100,  415,  604,  695,  771,  840,  900],
  [2200,  428,  623,  717,  796,  866,  928],
  [2300,  441,  642,  739,  820,  893,  957],
  [2400,  454,  661,  761,  844,  919,  985],
  [2500,  493,  717,  825,  915,  996, 1067],
  [2600,  506,  736,  847,  940, 1023, 1095],
  [2700,  519,  755,  869,  964, 1050, 1124],
  [2800,  532,  774,  891,  988, 1076, 1153],
  [2900,  545,  793,  913, 1012, 1102, 1181],
  [3000,  584,  849,  977, 1083, 1179, 1263],
  [3200,  609,  886, 1019, 1130, 1230, 1318],
  [3400,  634,  922, 1061, 1177, 1281, 1372],
  [3600,  659,  959, 1103, 1223, 1332, 1426],
  [3800,  684,  995, 1145, 1270, 1382, 1481],
  [4000,  756, 1099, 1265, 1402, 1526, 1634],
  [4200,  781, 1136, 1307, 1449, 1577, 1689],
  [4400,  806, 1172, 1349, 1496, 1628, 1744],
  [4600,  831, 1209, 1391, 1542, 1679, 1799],
  [4800,  856, 1245, 1433, 1589, 1730, 1853],
  [5000,  928, 1349, 1553, 1722, 1874, 2007],
  [5200,  955, 1389, 1598, 1773, 1929, 2066],
  [5400,  982, 1429, 1644, 1824, 1985, 2124],
  [5600, 1009, 1469, 1690, 1874, 2040, 2183],
  [5800, 1036, 1509, 1736, 1925, 2095, 2242],
  [6000, 1081, 1572, 1810, 2007, 2184, 2339],
  [6500, 1152, 1676, 1929, 2139, 2328, 2492],
  [7000, 1223, 1780, 2048, 2271, 2472, 2648],
  [7500, 1270, 1847, 2125, 2357, 2566, 2747],
  [8000, 1317, 1915, 2204, 2444, 2660, 2849],
  [8500, 1364, 1984, 2283, 2531, 2754, 2949],
  [9000, 1411, 2052, 2361, 2618, 2849, 3050],
  [9500, 1458, 2120, 2440, 2705, 2943, 3151],
  [10000, 1502, 2185, 2514, 2788, 3034, 3250],
  [10500, 1546, 2249, 2589, 2872, 3126, 3348],
  [11000, 1591, 2314, 2663, 2955, 3216, 3444],
  [11500, 1635, 2378, 2737, 3037, 3307, 3541],
  [12000, 1651, 2400, 2762, 3063, 3333, 3569],
  [12500, 1701, 2474, 2847, 3160, 3439, 3684],
  [13000, 1751, 2547, 2931, 3252, 3540, 3791],
  [13500, 1787, 2599, 2993, 3321, 3614, 3870],
  [14000, 1804, 2624, 3020, 3351, 3648, 3906],
  [14500, 1812, 2635, 3033, 3366, 3665, 3924],
  [15000, 1820, 2648, 3048, 3379, 3678, 3939],
  [20000, 2079, 3024, 3480, 3859, 4200, 4497],
  [25000, 2293, 3335, 3839, 4257, 4631, 4960],
];

const TABLE_MAX_INCOME = 25000;

/**
 * Look up the basic child support need from the §61.30 schedule.
 * Uses linear interpolation between adjacent rows.
 * Returns null if income exceeds $25,000 (requires manual calculation per statute).
 */
export function getBasicNeed(
  combinedNetIncome: number,
  numberOfChildren: number
): number | null {
  if (combinedNetIncome > TABLE_MAX_INCOME) {
    return null; // Above-table: manual calculation required per §61.30(1)
  }

  const col = Math.min(numberOfChildren, 6) - 1; // 0-indexed, cap at 6

  // Below minimum table row — use minimum row
  if (combinedNetIncome <= FL_SCHEDULE[0][0]) {
    return FL_SCHEDULE[0][col + 1];
  }

  // Find bracketing rows
  for (let i = 0; i < FL_SCHEDULE.length - 1; i++) {
    const lo = FL_SCHEDULE[i];
    const hi = FL_SCHEDULE[i + 1];
    if (combinedNetIncome >= lo[0] && combinedNetIncome <= hi[0]) {
      if (combinedNetIncome === lo[0]) return lo[col + 1];
      if (combinedNetIncome === hi[0]) return hi[col + 1];
      // Linear interpolation
      const t = (combinedNetIncome - lo[0]) / (hi[0] - lo[0]);
      return lo[col + 1] + t * (hi[col + 1] - lo[col + 1]);
    }
  }

  // Exact match on last row
  return FL_SCHEDULE[FL_SCHEDULE.length - 1][col + 1];
}

// ---------------------------------------------------------------------------
// Input / Output types
// ---------------------------------------------------------------------------

export interface FLChildSupportInput {
  /** Parent A net monthly income */
  netIncomeA: number;
  /** Parent B net monthly income */
  netIncomeB: number;
  /** Number of children (1-6; capped at 6 for schedule lookup) */
  numberOfChildren: number;
  /** Overnights per year with Parent A (out of 365) */
  overnightsA: number;
  /** Overnights per year with Parent B (out of 365) */
  overnightsB: number;

  /** Total qualifying monthly childcare (work/school related) */
  qualifyingChildcare: number;
  /** Total monthly qualifying child health insurance */
  qualifyingChildHealthInsurance: number;
  /** Total monthly qualifying noncovered medical expenses */
  qualifyingNoncoveredMedical: number;

  /** Portion of childcare paid directly by Parent A */
  childcarePaidByA: number;
  /** Portion of childcare paid directly by Parent B */
  childcarePaidByB: number;
  /** Health insurance paid directly by Parent A */
  healthInsurancePaidByA: number;
  /** Health insurance paid directly by Parent B */
  healthInsurancePaidByB: number;
  /** Noncovered medical paid directly by Parent A */
  noncoveredMedicalPaidByA: number;
  /** Noncovered medical paid directly by Parent B */
  noncoveredMedicalPaidByB: number;
}

export interface FLChildSupportResult {
  version: 'FL-CS-2026.1';

  /** Whether substantial time-sharing applies (both parents >= 73 overnights) */
  substantialTimesharing: boolean;

  /** Combined net income */
  combinedNetIncome: number;
  /** Parent A income share (0-1) */
  incomeShareA: number;
  /** Parent B income share (0-1) */
  incomeShareB: number;

  /**
   * Basic need from §61.30 guideline schedule.
   * null if combined income > $25,000 (manual calculation required).
   */
  basicNeed: number | null;
  /** True if income exceeds the $25,000 table maximum */
  aboveTableIncome: boolean;
  /** Warning message when income is above table */
  aboveTableWarning?: string;

  // --- Standard timesharing (substantialTimesharing = false) ---
  totalNeed?: number;
  obligationA?: number;
  obligationB?: number;
  expensePaidByB?: number;
  transferBtoA?: number; // positive means B pays A

  // --- Substantial timesharing (substantialTimesharing = true) ---
  baseObligationA?: number;
  baseObligationB?: number;
  grossedObligationA?: number;
  grossedObligationB?: number;
  overnightPctA?: number;
  overnightPctB?: number;
  crossObligationA?: number;
  crossObligationB?: number;
  baseTransferAtoB?: number; // positive means A pays B
  expensePool?: number;
  requiredExpenseA?: number;
  requiredExpenseB?: number;
  actualExpensePaidA?: number;
  actualExpensePaidB?: number;
  expenseTransferAtoB?: number; // positive means A owes B
  finalTransferAtoB?: number;   // positive means A pays B; negative means B pays A

  /** Who pays */
  payer: 'A' | 'B' | null;
  /** Who receives */
  recipient: 'A' | 'B' | null;
  /** Monthly support transfer amount (always positive or 0) */
  amount: number;

  /** Human-readable receipt lines for UI display */
  receipt: string[];
}

// ---------------------------------------------------------------------------
// Main calculation function
// ---------------------------------------------------------------------------

export function calculateFLChildSupport(
  input: FLChildSupportInput
): FLChildSupportResult {
  const {
    netIncomeA,
    netIncomeB,
    numberOfChildren,
    overnightsA,
    overnightsB,
    qualifyingChildcare,
    qualifyingChildHealthInsurance,
    qualifyingNoncoveredMedical,
    childcarePaidByA,
    childcarePaidByB,
    healthInsurancePaidByA,
    healthInsurancePaidByB,
    noncoveredMedicalPaidByA,
    noncoveredMedicalPaidByB,
  } = input;

  // ---- Step 1: Net income shares ----
  const combinedNetIncome = netIncomeA + netIncomeB;
  const incomeShareA = combinedNetIncome > 0 ? netIncomeA / combinedNetIncome : 0.5;
  const incomeShareB = combinedNetIncome > 0 ? netIncomeB / combinedNetIncome : 0.5;

  // ---- Step 2: Basic child support need ----
  const basicNeedRaw = getBasicNeed(combinedNetIncome, numberOfChildren);
  const aboveTableIncome = basicNeedRaw === null;
  const basicNeed = basicNeedRaw !== null ? basicNeedRaw : getBasicNeed(TABLE_MAX_INCOME, numberOfChildren)!;

  // ---- Step 3: Time-sharing branch ----
  // §61.30: substantial time-sharing requires BOTH parents >= 73 overnights
  // (exactly 72 does NOT qualify)
  const substantialTimesharing = overnightsA >= 73 && overnightsB >= 73;

  let result: Partial<FLChildSupportResult> = {
    version: 'FL-CS-2026.1',
    substantialTimesharing,
    combinedNetIncome,
    incomeShareA,
    incomeShareB,
    basicNeed: basicNeedRaw,
    aboveTableIncome,
  };

  if (aboveTableIncome) {
    result.aboveTableWarning =
      'Combined net income exceeds $25,000. The Florida §61.30 guideline table ends at $25,000. ' +
      'Amounts above this level require manual calculation per §61.30(1). ' +
      'The figure shown uses the $25,000 row as a floor — consult an attorney for the exact statutory amount.';
  }

  if (!substantialTimesharing) {
    // ---- Step 4A: Standard guideline ----
    const totalNeed =
      basicNeed +
      qualifyingChildcare +
      qualifyingChildHealthInsurance +
      qualifyingNoncoveredMedical;

    const obligationA = totalNeed * incomeShareA;
    const obligationB = totalNeed * incomeShareB;

    // Parent B (noncustodial) owes their share minus direct expenses they pay
    const expensePaidByB =
      childcarePaidByB + healthInsurancePaidByB + noncoveredMedicalPaidByB;
    const transferBtoA = obligationB - expensePaidByB;

    const payer: 'A' | 'B' | null = transferBtoA > 0 ? 'B' : transferBtoA < 0 ? 'A' : null;
    const recipient: 'A' | 'B' | null = transferBtoA > 0 ? 'A' : transferBtoA < 0 ? 'B' : null;
    const amount = Math.abs(transferBtoA);

    const receipt = [
      `Net income A: $${netIncomeA.toFixed(2)}`,
      `Net income B: $${netIncomeB.toFixed(2)}`,
      `Combined net income: $${combinedNetIncome.toFixed(2)}`,
      `Income share A/B: ${(incomeShareA * 100).toFixed(1)}% / ${(incomeShareB * 100).toFixed(1)}%`,
      `Basic guideline need: $${basicNeed.toFixed(2)}`,
      `Overnight % A/B: ${((overnightsA / 365) * 100).toFixed(1)}% / ${((overnightsB / 365) * 100).toFixed(1)}%`,
      `Substantial time-sharing: No`,
      `Total need (basic + add-ons): $${totalNeed.toFixed(2)}`,
      `Obligation A: $${obligationA.toFixed(2)} (A's income share × total need)`,
      `Obligation B: $${obligationB.toFixed(2)} (B's income share × total need)`,
      `Expenses paid directly by B: $${expensePaidByB.toFixed(2)}`,
      `Transfer B→A: $${transferBtoA.toFixed(2)}`,
      `Final support: $${amount.toFixed(2)}/month [${payer ?? 'Neither'} → ${recipient ?? 'Neither'}]`,
      `Calculator version: FL-CS-2026.1`,
    ];

    return {
      ...result,
      totalNeed,
      obligationA,
      obligationB,
      expensePaidByB,
      transferBtoA,
      payer,
      recipient,
      amount,
      receipt,
    } as FLChildSupportResult;
  }

  // ---- Step 4B: Substantial time-sharing ----
  // CRITICAL: gross-up applies to basicNeed ONLY — NOT childcare, NOT health insurance

  // B1: Base obligations from basicNeed only
  const baseObligationA = basicNeed * incomeShareA;
  const baseObligationB = basicNeed * incomeShareB;

  // B2: 1.5× gross-up (on basicNeed only)
  const grossedObligationA = baseObligationA * 1.5;
  const grossedObligationB = baseObligationB * 1.5;

  // B3: Cross-multiply by OTHER parent's overnight percentage
  const totalOvernights = overnightsA + overnightsB;
  const overnightPctA = totalOvernights > 0 ? overnightsA / totalOvernights : 0.5;
  const overnightPctB = totalOvernights > 0 ? overnightsB / totalOvernights : 0.5;

  // A's grossed obligation × B's overnight % (NOT A's own %)
  const crossObligationA = grossedObligationA * overnightPctB;
  // B's grossed obligation × A's overnight % (NOT B's own %)
  const crossObligationB = grossedObligationB * overnightPctA;

  // B4: Base monetary transfer (positive = A pays B)
  const baseTransferAtoB = crossObligationA - crossObligationB;

  // B5: Expense allocation AFTER cross-timeshare calculation
  const expensePool =
    qualifyingChildcare + qualifyingChildHealthInsurance + qualifyingNoncoveredMedical;
  const requiredExpenseA = expensePool * incomeShareA;
  const requiredExpenseB = expensePool * incomeShareB;

  const actualExpensePaidA =
    childcarePaidByA + healthInsurancePaidByA + noncoveredMedicalPaidByA;
  const actualExpensePaidB =
    childcarePaidByB + healthInsurancePaidByB + noncoveredMedicalPaidByB;

  // Positive = A owes toward expenses B has covered; negative = A gets credit
  const expenseTransferAtoB = requiredExpenseA - actualExpensePaidA;

  // B6: Final transfer
  const finalTransferAtoB = baseTransferAtoB + expenseTransferAtoB;

  let payer: 'A' | 'B' | null;
  let recipient: 'A' | 'B' | null;
  let amount: number;

  if (finalTransferAtoB > 0) {
    payer = 'A';
    recipient = 'B';
    amount = finalTransferAtoB;
  } else if (finalTransferAtoB < 0) {
    payer = 'B';
    recipient = 'A';
    amount = Math.abs(finalTransferAtoB);
  } else {
    payer = null;
    recipient = null;
    amount = 0;
  }

  const receipt = [
    `Net income A: $${netIncomeA.toFixed(2)}`,
    `Net income B: $${netIncomeB.toFixed(2)}`,
    `Combined net income: $${combinedNetIncome.toFixed(2)}`,
    `Income share A/B: ${(incomeShareA * 100).toFixed(1)}% / ${(incomeShareB * 100).toFixed(1)}%`,
    `Basic guideline need: $${basicNeed.toFixed(2)}`,
    `Overnight % A/B: ${(overnightPctA * 100).toFixed(1)}% / ${(overnightPctB * 100).toFixed(1)}%`,
    `Substantial time-sharing: Yes`,
    `A base obligation (basicNeed × A income share): $${baseObligationA.toFixed(2)}`,
    `B base obligation (basicNeed × B income share): $${baseObligationB.toFixed(2)}`,
    `× 1.5 gross-up → A: $${grossedObligationA.toFixed(2)} / B: $${grossedObligationB.toFixed(2)}`,
    `Cross-timeshare obligation A: $${crossObligationA.toFixed(2)} (= A grossed × B overnight%)`,
    `Cross-timeshare obligation B: $${crossObligationB.toFixed(2)} (= B grossed × A overnight%)`,
    `Base transfer (A→B): $${baseTransferAtoB.toFixed(2)}`,
    `Expense pool (childcare + insurance + medical): $${expensePool.toFixed(2)}`,
    `A required expense share: $${requiredExpenseA.toFixed(2)}`,
    `A actual expenses paid: $${actualExpensePaidA.toFixed(2)}`,
    `Expense transfer A→B: $${expenseTransferAtoB.toFixed(2)}`,
    `Final transfer A→B: $${finalTransferAtoB.toFixed(2)}`,
    `Final support: $${amount.toFixed(2)}/month [${payer ?? 'Neither'} → ${recipient ?? 'Neither'}]`,
    `Calculator version: FL-CS-2026.1`,
  ];

  return {
    ...result,
    baseObligationA,
    baseObligationB,
    grossedObligationA,
    grossedObligationB,
    overnightPctA,
    overnightPctB,
    crossObligationA,
    crossObligationB,
    baseTransferAtoB,
    expensePool,
    requiredExpenseA,
    requiredExpenseB,
    actualExpensePaidA,
    actualExpensePaidB,
    expenseTransferAtoB,
    finalTransferAtoB,
    payer,
    recipient,
    amount,
    receipt,
  } as FLChildSupportResult;
}
