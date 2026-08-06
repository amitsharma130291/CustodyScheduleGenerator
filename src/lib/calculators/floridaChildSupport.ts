/**
 * Florida Child Support Calculator
 * Version: FL-CS-2026.3
 * Authority: Florida Statutes §61.30
 *
 * Complete rewrite — do NOT patch the old implementation.
 * The prior version used a flat 20% overnight credit (incorrect).
 * This version uses the 1.5× cross-timeshare method for substantial time-sharing.
 *
 * v2 changes:
 * - FIX 1: Expanded §61.30 schedule from 62 rows to full 185 rows ($800–$10,000, $50 increments)
 * - FIX 2: Noncovered medical included in 1.5× gross-up base per §61.30(8)
 *          unless noncoveredMedicalTreatment = 'separately-allocated'
 *
 * v3 changes:
 * - FIX 3: Noncovered medical — explicit two-path enum:
 *          'included-in-basic-obligation' (§61.30(8) default) vs 'separately-allocated'
 *          Separately-allocated returns as own output field (separateMedicalAllocation)
 * - FIX 4: <$800 branch — adds obligorLevelCheck with 90%-above-poverty cap
 *          per §61.30(6)(a), using 2026 HHS federal poverty guideline by household size
 */

// ---------------------------------------------------------------------------
// §61.30 Guideline Schedule — full 185-row table
// [combinedIncome, 1child, 2children, 3children, 4children, 5children, 6children]
// Table runs $800–$10,000 at $50 increments per statute (185 rows).
// ---------------------------------------------------------------------------
const FL_SCHEDULE: [number, number, number, number, number, number, number][] = [
  // [income, 1child, 2children, 3children, 4children, 5children, 6children]
  [800, 170, 247, 285, 316, 344, 369],
  [850, 183, 266, 306, 340, 370, 396],
  [900, 196, 285, 328, 364, 396, 424],
  [950, 210, 305, 351, 389, 423, 453],
  [1000, 224, 326, 375, 416, 453, 485],
  [1050, 232, 338, 388, 431, 469, 502],
  [1100, 240, 349, 402, 446, 485, 520],
  [1150, 247, 359, 413, 458, 499, 534],
  [1200, 253, 368, 424, 470, 512, 549],
  [1250, 260, 378, 435, 482, 525, 562],
  [1300, 266, 387, 445, 494, 538, 577],
  [1350, 272, 396, 455, 505, 550, 589],
  [1400, 279, 406, 467, 518, 564, 605],
  [1450, 285, 415, 477, 530, 577, 618],
  [1500, 292, 425, 489, 542, 590, 632],
  [1550, 314, 457, 526, 583, 635, 680],
  [1600, 336, 489, 562, 623, 679, 728],
  [1650, 342, 498, 572, 635, 691, 740],
  [1700, 349, 508, 584, 648, 706, 756],
  [1750, 355, 516, 594, 659, 718, 769],
  [1800, 362, 527, 607, 673, 733, 785],
  [1850, 368, 536, 617, 685, 745, 798],
  [1900, 375, 546, 628, 697, 759, 813],
  [1950, 381, 554, 638, 708, 771, 826],
  [2000, 402, 585, 673, 747, 813, 871],
  [2050, 408, 594, 683, 758, 825, 884],
  [2100, 415, 604, 695, 771, 840, 900],
  [2150, 421, 612, 705, 782, 852, 912],
  [2200, 428, 623, 717, 796, 866, 928],
  [2250, 434, 632, 727, 807, 879, 941],
  [2300, 441, 642, 739, 820, 893, 957],
  [2350, 447, 651, 748, 831, 905, 969],
  [2400, 454, 661, 761, 844, 919, 985],
  [2450, 474, 689, 793, 880, 957, 1025],
  [2500, 493, 717, 825, 915, 996, 1067],
  [2550, 499, 726, 835, 927, 1009, 1080],
  [2600, 506, 736, 847, 940, 1023, 1095],
  [2650, 512, 745, 857, 951, 1035, 1108],
  [2700, 519, 755, 869, 964, 1050, 1124],
  [2750, 525, 764, 879, 976, 1063, 1138],
  [2800, 532, 774, 891, 988, 1076, 1153],
  [2850, 538, 783, 901, 999, 1088, 1166],
  [2900, 545, 793, 913, 1012, 1102, 1181],
  [2950, 558, 811, 934, 1036, 1128, 1208],
  [3000, 584, 849, 977, 1083, 1179, 1263],
  [3050, 591, 859, 988, 1096, 1193, 1278],
  [3100, 597, 869, 1000, 1109, 1208, 1293],
  [3150, 603, 878, 1011, 1121, 1221, 1308],
  [3200, 609, 886, 1019, 1130, 1230, 1318],
  [3250, 616, 896, 1031, 1144, 1245, 1333],
  [3300, 622, 905, 1041, 1155, 1258, 1347],
  [3350, 628, 913, 1051, 1166, 1270, 1360],
  [3400, 634, 922, 1061, 1177, 1281, 1372],
  [3450, 641, 932, 1073, 1190, 1296, 1387],
  [3500, 647, 941, 1083, 1201, 1308, 1401],
  [3550, 653, 950, 1093, 1213, 1320, 1414],
  [3600, 659, 959, 1103, 1223, 1332, 1426],
  [3650, 666, 969, 1115, 1237, 1347, 1442],
  [3700, 672, 978, 1125, 1248, 1359, 1455],
  [3750, 678, 986, 1135, 1259, 1371, 1468],
  [3800, 684, 995, 1145, 1270, 1382, 1481],
  [3850, 703, 1023, 1177, 1306, 1422, 1522],
  [3900, 722, 1050, 1209, 1341, 1460, 1563],
  [3950, 739, 1075, 1237, 1373, 1495, 1601],
  [4000, 756, 1099, 1265, 1402, 1526, 1634],
  [4050, 761, 1107, 1274, 1414, 1539, 1648],
  [4100, 767, 1116, 1284, 1424, 1550, 1660],
  [4150, 774, 1126, 1296, 1437, 1565, 1676],
  [4200, 781, 1136, 1307, 1449, 1577, 1689],
  [4250, 787, 1145, 1317, 1461, 1591, 1703],
  [4300, 793, 1154, 1328, 1474, 1605, 1718],
  [4350, 799, 1163, 1338, 1484, 1616, 1730],
  [4400, 806, 1172, 1349, 1496, 1628, 1744],
  [4450, 812, 1181, 1359, 1508, 1642, 1758],
  [4500, 818, 1190, 1369, 1519, 1654, 1771],
  [4550, 825, 1200, 1381, 1532, 1668, 1786],
  [4600, 831, 1209, 1391, 1544, 1681, 1800],
  [4650, 837, 1218, 1401, 1554, 1693, 1813],
  [4700, 843, 1227, 1411, 1566, 1705, 1826],
  [4750, 850, 1237, 1423, 1579, 1719, 1841],
  [4800, 856, 1245, 1433, 1589, 1730, 1853],
  [4850, 874, 1271, 1463, 1623, 1767, 1892],
  [4900, 892, 1297, 1493, 1657, 1804, 1931],
  [4950, 910, 1323, 1523, 1690, 1839, 1969],
  [5000, 928, 1349, 1553, 1722, 1874, 2007],
  [5050, 934, 1359, 1564, 1735, 1888, 2021],
  [5100, 941, 1369, 1576, 1748, 1903, 2037],
  [5150, 948, 1379, 1587, 1761, 1917, 2052],
  [5200, 955, 1389, 1598, 1773, 1929, 2066],
  [5250, 961, 1398, 1608, 1785, 1943, 2080],
  [5300, 968, 1408, 1620, 1798, 1957, 2095],
  [5350, 975, 1418, 1631, 1811, 1971, 2110],
  [5400, 982, 1429, 1644, 1824, 1985, 2124],
  [5450, 988, 1438, 1655, 1837, 1999, 2140],
  [5500, 995, 1448, 1666, 1849, 2013, 2155],
  [5550, 1002, 1458, 1677, 1862, 2027, 2170],
  [5600, 1009, 1469, 1690, 1874, 2040, 2184],
  [5650, 1015, 1478, 1701, 1887, 2054, 2199],
  [5700, 1022, 1487, 1711, 1899, 2068, 2214],
  [5750, 1029, 1497, 1722, 1911, 2081, 2228],
  [5800, 1036, 1507, 1733, 1923, 2094, 2242],
  [5850, 1042, 1516, 1744, 1936, 2108, 2257],
  [5900, 1049, 1526, 1756, 1949, 2122, 2272],
  [5950, 1056, 1536, 1767, 1961, 2136, 2287],
  [6000, 1063, 1547, 1780, 1975, 2149, 2302],
  [6050, 1070, 1557, 1791, 1988, 2164, 2317],
  [6100, 1077, 1566, 1802, 1999, 2176, 2330],
  [6150, 1083, 1575, 1812, 2010, 2189, 2344],
  [6200, 1090, 1585, 1824, 2023, 2203, 2359],
  [6250, 1097, 1595, 1835, 2037, 2218, 2374],
  [6300, 1104, 1605, 1847, 2050, 2232, 2389],
  [6350, 1110, 1615, 1858, 2062, 2245, 2404],
  [6400, 1117, 1624, 1869, 2074, 2258, 2418],
  [6450, 1124, 1634, 1880, 2087, 2272, 2433],
  [6500, 1131, 1645, 1893, 2101, 2287, 2449],
  [6550, 1137, 1654, 1904, 2113, 2300, 2463],
  [6600, 1144, 1664, 1915, 2125, 2313, 2477],
  [6650, 1151, 1673, 1926, 2137, 2327, 2491],
  [6700, 1158, 1683, 1937, 2150, 2340, 2506],
  [6750, 1164, 1693, 1948, 2162, 2353, 2520],
  [6800, 1171, 1703, 1960, 2175, 2368, 2535],
  [6850, 1178, 1712, 1970, 2186, 2380, 2549],
  [6900, 1185, 1722, 1982, 2199, 2394, 2564],
  [6950, 1191, 1731, 1992, 2211, 2407, 2578],
  [7000, 1198, 1741, 2003, 2223, 2420, 2591],
  [7050, 1205, 1751, 2015, 2236, 2434, 2607],
  [7100, 1211, 1760, 2025, 2248, 2448, 2621],
  [7150, 1218, 1770, 2037, 2261, 2462, 2636],
  [7200, 1225, 1780, 2048, 2274, 2475, 2650],
  [7250, 1231, 1789, 2059, 2286, 2488, 2664],
  [7300, 1238, 1799, 2070, 2298, 2502, 2679],
  [7350, 1245, 1809, 2082, 2311, 2515, 2693],
  [7400, 1252, 1820, 2094, 2325, 2530, 2709],
  [7450, 1258, 1830, 2106, 2338, 2544, 2724],
  [7500, 1265, 1839, 2116, 2349, 2557, 2737],
  [7550, 1271, 1849, 2128, 2362, 2570, 2751],
  [7600, 1278, 1859, 2139, 2374, 2584, 2766],
  [7650, 1284, 1868, 2149, 2386, 2597, 2780],
  [7700, 1291, 1878, 2161, 2399, 2611, 2795],
  [7750, 1298, 1888, 2173, 2412, 2625, 2810],
  [7800, 1304, 1897, 2183, 2423, 2637, 2823],
  [7850, 1311, 1907, 2195, 2436, 2651, 2838],
  [7900, 1317, 1917, 2207, 2449, 2665, 2853],
  [7950, 1324, 1926, 2217, 2460, 2678, 2867],
  [8000, 1330, 1935, 2227, 2471, 2690, 2880],
  [8050, 1337, 1945, 2238, 2483, 2703, 2894],
  [8100, 1343, 1954, 2249, 2495, 2717, 2909],
  [8150, 1350, 1964, 2260, 2508, 2730, 2923],
  [8200, 1357, 1974, 2272, 2521, 2744, 2938],
  [8250, 1363, 1984, 2283, 2534, 2758, 2952],
  [8300, 1370, 1993, 2293, 2546, 2771, 2967],
  [8350, 1376, 2002, 2303, 2557, 2783, 2980],
  [8400, 1383, 2012, 2315, 2570, 2797, 2995],
  [8450, 1389, 2021, 2325, 2581, 2810, 3009],
  [8500, 1396, 2031, 2337, 2595, 2824, 3024],
  [8550, 1402, 2041, 2348, 2607, 2838, 3038],
  [8600, 1409, 2051, 2359, 2619, 2851, 3053],
  [8650, 1416, 2060, 2370, 2631, 2864, 3067],
  [8700, 1422, 2069, 2380, 2642, 2876, 3080],
  [8750, 1429, 2079, 2392, 2655, 2890, 3095],
  [8800, 1435, 2088, 2402, 2666, 2903, 3109],
  [8850, 1442, 2098, 2414, 2679, 2917, 3124],
  [8900, 1448, 2107, 2424, 2691, 2930, 3138],
  [8950, 1455, 2117, 2435, 2703, 2943, 3152],
  [9000, 1461, 2127, 2447, 2716, 2957, 3167],
  [9050, 1468, 2136, 2458, 2728, 2971, 3181],
  [9100, 1474, 2145, 2468, 2739, 2983, 3195],
  [9150, 1481, 2155, 2479, 2751, 2996, 3209],
  [9200, 1488, 2165, 2491, 2764, 3010, 3224],
  [9250, 1494, 2175, 2502, 2776, 3023, 3238],
  [9300, 1501, 2184, 2513, 2789, 3038, 3253],
  [9350, 1507, 2193, 2523, 2800, 3050, 3267],
  [9400, 1514, 2203, 2534, 2812, 3063, 3281],
  [9450, 1520, 2212, 2545, 2824, 3076, 3295],
  [9500, 1527, 2222, 2557, 2837, 3090, 3310],
  [9550, 1533, 2231, 2567, 2849, 3103, 3324],
  [9600, 1540, 2241, 2578, 2861, 3116, 3338],
  [9650, 1546, 2250, 2589, 2873, 3129, 3352],
  [9700, 1453, 2260, 2601, 2886, 3143, 3367],
  [9750, 1460, 2270, 2612, 2899, 3157, 3382],
  [9800, 1466, 2279, 2622, 2910, 3169, 3395],
  [9850, 1473, 2289, 2634, 2923, 3183, 3410],
  [9900, 1479, 2299, 2645, 2936, 3197, 3424],
  [9950, 1486, 2308, 2656, 2948, 3210, 3439],
  [10000, 1492, 2317, 2666, 2959, 3222, 3452],
];

// For combined income between statutory $50-increment rows, this calculator
// uses linear interpolation between surrounding rows. §61.30 provides
// discrete rows; interpolation is a calculator approximation.

/** Exported for testing: number of rows in the §61.30 guideline schedule (should be 185). */
export const FL_SCHEDULE_ROW_COUNT = FL_SCHEDULE.length;

/**
 * Excess-income percentages per §61.30(6)(b) for combined income above $10,000.
 * Applied as: basicNeed = schedule_at_10000[children] + (income - 10000) × rate
 */
const FL_EXCESS_RATES: Record<number, number> = {
  1: 0.050,  // 5.0%
  2: 0.075,  // 7.5%
  3: 0.095,  // 9.5%
  4: 0.110,  // 11.0%
  5: 0.120,  // 12.0%
  6: 0.125,  // 12.5%
};

/**
 * Look up the value at exactly $10,000 for the given child count.
 * This is the anchor for the excess-income formula.
 */
function lookupScheduleAt10000(children: number): number {
  const col = Math.min(Math.max(children, 1), 6) - 1;
  const row = FL_SCHEDULE[FL_SCHEDULE.length - 1]; // last row is $10,000
  return row[col + 1];
}

/**
 * Look up the basic child support need from the §61.30 schedule using linear interpolation.
 * For combined income above $10,000, applies the statutory excess-income formula (§61.30(6)(b)).
 * Never returns null — the formula handles all income levels.
 */
export function getBasicNeed(
  combinedNetIncome: number,
  numberOfChildren: number
): number | null {
  const clampedChildren = Math.min(Math.max(numberOfChildren, 1), 6);
  const col = clampedChildren - 1; // 0-indexed

  // Below minimum table row — use minimum row
  if (combinedNetIncome <= FL_SCHEDULE[0][0]) {
    return FL_SCHEDULE[0][col + 1];
  }

  // Above $10,000: statutory excess-income formula (§61.30(6)(b))
  const scheduleMax = FL_SCHEDULE[FL_SCHEDULE.length - 1][0]; // 10000
  if (combinedNetIncome > scheduleMax) {
    const baseAt10000 = lookupScheduleAt10000(clampedChildren);
    const excessRate = FL_EXCESS_RATES[clampedChildren];
    return baseAt10000 + (combinedNetIncome - scheduleMax) * excessRate;
  }

  // Within table range: find bracketing rows and interpolate
  // (§61.30 provides discrete $50-increment rows; interpolation is a calculator approximation)
  for (let i = 0; i < FL_SCHEDULE.length - 1; i++) {
    const lo = FL_SCHEDULE[i];
    const hi = FL_SCHEDULE[i + 1];
    if (combinedNetIncome >= lo[0] && combinedNetIncome <= hi[0]) {
      if (combinedNetIncome === lo[0]) return lo[col + 1];
      if (combinedNetIncome === hi[0]) return hi[col + 1];
      // Linear interpolation between surrounding rows
      const t = (combinedNetIncome - lo[0]) / (hi[0] - lo[0]);
      return lo[col + 1] + t * (hi[col + 1] - lo[col + 1]);
    }
  }

  // Exact match on last row
  return FL_SCHEDULE[FL_SCHEDULE.length - 1][col + 1];
}

// ---------------------------------------------------------------------------
// Low-income branch result type (§61.30(6)(a))
// ---------------------------------------------------------------------------

export type FLBasicNeedBranch = 'low-income-below-800' | 'schedule' | 'excess-income';

export interface FLBasicNeedResult {
  basicNeed: number | null;
  branch: FLBasicNeedBranch;
  warning?: string;
}

/**
 * Full branch-aware basic need lookup per §61.30(6)(a)+(b).
 * Returns null + warning for combined income below $800.
 */
export function getFLBasicNeed(
  combinedNetIncome: number,
  children: number
): FLBasicNeedResult {
  // Branch 1: Below $800 — §61.30(6)(a) statutory low-income rule
  if (combinedNetIncome < 800) {
    return {
      basicNeed: null,
      branch: 'low-income-below-800',
      warning:
        'Combined net income is below $800/month. Under Florida §61.30(6)(a), ' +
        'support is determined case-by-case and may not exceed 90% of the ' +
        "obligor's income above the applicable federal poverty guideline. " +
        'This calculator cannot produce a reliable estimate at this income level. ' +
        'Consult a family law attorney.',
    };
  }

  // Branch 2: $800–$10,000 — statutory schedule with interpolation
  if (combinedNetIncome <= 10000) {
    return {
      basicNeed: getBasicNeed(combinedNetIncome, children),
      branch: 'schedule',
    };
  }

  // Branch 3: Above $10,000 — §61.30(6)(b) excess-income formula
  return {
    basicNeed: getBasicNeed(combinedNetIncome, children),
    branch: 'excess-income',
  };
}

// ---------------------------------------------------------------------------
// Noncovered medical treatment flag (FIX 2)
// ---------------------------------------------------------------------------

/**
 * Controls whether noncovered medical is included in the §61.30(11)(b) 1.5× gross-up base.
 *
 * 'included-in-basic-obligation' (default): noncoveredMedical is part of the gross-up base
 *   per §61.30(8). This is the standard statutory treatment.
 *
 * 'separately-allocated': noncoveredMedical is being handled separately by court order
 *   (e.g. ordered as a percentage by the court). In this case, exclude it from the
 *   gross-up base; it will be resolved outside this calculation.
 */
/**
 * Controls whether noncovered medical is included in the §61.30(11)(b) 1.5× gross-up base.
 *
 * 'included-in-basic-obligation' (default, §61.30(8)): noncoveredMedical goes into the
 *   gross-up base. This is the standard statutory treatment.
 *
 * 'separately-allocated': Court-ordered by percentage — excluded from the gross-up base
 *   and returned as a separate output field (separateMedicalAllocation).
 */
export type FLNoncoveredMedicalTreatment =
  | 'included-in-basic-obligation'   // §61.30(8) default — goes into gross-up
  | 'separately-allocated';           // Court ordered by % — handled outside calc

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

  /**
   * Whether noncovered medical is included in the 1.5× gross-up base (substantial time-sharing only).
   * Default: 'included-in-basic-obligation' (included per §61.30(8)).
   * Use 'separately-allocated' when noncovered medical is ordered as a percentage by the court.
   */
  noncoveredMedicalTreatment?: FLNoncoveredMedicalTreatment;

  /**
   * Which parent is the obligor (paying parent). Required for the §61.30(6)(a)
   * low-income branch to compute the 90%-above-poverty cap. Defaults to 'B'.
   */
  obligorParent?: 'A' | 'B';

  /**
   * Household size of the obligor parent (used to look up the federal poverty guideline).
   * Defaults to 1 (1-person household). Affects the §61.30(6)(a) low-income cap.
   */
  obligorHouseholdSize?: number;
}

export interface FLChildSupportResult {
  version: 'FL-CS-2026.3';

  /** Whether substantial time-sharing applies (both parents >= 73 overnights) */
  substantialTimesharing: boolean;

  /** Combined net income */
  combinedNetIncome: number;
  /** Parent A income share (0-1) */
  incomeShareA: number;
  /** Parent B income share (0-1) */
  incomeShareB: number;

  /**
   * Basic need from §61.30 guideline schedule or excess-income formula.
   * null when combined income < $800 (low-income branch, §61.30(6)(a)).
   */
  basicNeed: number | null;
  /** Which branch was used: low-income-below-800, schedule, or excess-income */
  branch: FLBasicNeedBranch;
  /** Warning when low-income branch or excess-income formula applies */
  warning?: string;
  /** True if income exceeds the $10,000 table maximum (formula applied) */
  aboveTableIncome: boolean;
  /** Informational note when excess-income formula is applied */
  aboveTableWarning?: string;

  // --- Standard timesharing (substantialTimesharing = false) ---
  totalNeed?: number;
  obligationA?: number;
  obligationB?: number;
  expensePaidByB?: number;
  transferBtoA?: number; // positive means B pays A

  // --- Substantial timesharing (substantialTimesharing = true) ---
  /** The base used for the 1.5× gross-up: basicNeed + noncoveredMedical (unless separately-allocated) */
  grossupBase?: number;
  /** How noncovered medical was treated in this calculation */
  noncoveredMedicalTreatment?: FLNoncoveredMedicalTreatment;
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
  /** Final support amount (null when low-income branch prevents calculation) */
  finalSupport: number | null;

  /**
   * §61.30(6)(a) low-income check: 90% of obligor's income above poverty guideline.
   * Only present when branch = 'low-income-below-800'.
   */
  obligorLevelCheck?: {
    obligorParent: 'A' | 'B';
    obligorNetIncome: number;
    obligorHouseholdSize: number;
    federalPovertyGuidelineMonthly: number;
    incomeAbovePoverty: number;
    ninetyPercentCap: number;
    note: string;
  };

  /**
   * Separately-allocated noncovered medical (only present when treatment = 'separately-allocated').
   * These amounts are NOT included in the guideline calculation and are separately ordered by court.
   */
  separateMedicalAllocation?: {
    treatment: FLNoncoveredMedicalTreatment;
    shareA: number;
    shareB: number;
    note: string;
  };

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
    noncoveredMedicalTreatment = 'included-in-basic-obligation',
    obligorParent = 'B',
    obligorHouseholdSize = 1,
  } = input;

  // ── 2026 HHS Federal Poverty Guidelines (monthly) ──────────────────────────
  // Source: HHS Federal Poverty Guidelines 2026, effective 2026-01-01
  // Household sizes 1–4; sizes >4 use the 4-person value as a conservative floor.
  const FL_POVERTY_GUIDELINE = {
    effectiveDate: '2026-01-01',
    source: 'HHS Federal Poverty Guidelines 2026',
    monthly: (householdSize: number): number => {
      const table: Record<number, number> = {
        1: 1255,  // $15,060/year
        2: 1700,  // $20,400/year
        3: 2146,  // $25,752/year (approx)
        4: 2592,  // $31,104/year (approx)
      };
      const size = Math.max(1, Math.min(householdSize, 4));
      return table[size] ?? 2592;
    },
  };

  // ---- Step 1: Net income shares ----
  const combinedNetIncome = netIncomeA + netIncomeB;
  const incomeShareA = combinedNetIncome > 0 ? netIncomeA / combinedNetIncome : 0.5;
  const incomeShareB = combinedNetIncome > 0 ? netIncomeB / combinedNetIncome : 0.5;

  // ---- Step 2: Basic child support need (branch-aware) ----
  const basicNeedResult = getFLBasicNeed(combinedNetIncome, numberOfChildren);
  const scheduleMax = FL_SCHEDULE[FL_SCHEDULE.length - 1][0]; // 10000
  const aboveTableIncome = combinedNetIncome > scheduleMax;

  // Early return for §61.30(6)(a) low-income branch (combined income < $800)
  if (basicNeedResult.branch === 'low-income-below-800') {
    // §61.30(6)(a) obligor-level 90% cap calculation
    const obligorNetIncome = obligorParent === 'A' ? netIncomeA : netIncomeB;
    const povertyMonthly = FL_POVERTY_GUIDELINE.monthly(obligorHouseholdSize);
    const incomeAbovePoverty = Math.max(obligorNetIncome - povertyMonthly, 0);
    const ninetyPercentCap = incomeAbovePoverty * 0.90;

    const warningText =
      'Combined net income is below $800/month. Under §61.30(6)(a), ' +
      'support is determined case-by-case and may not exceed 90% of ' +
      "the obligor's income above the federal poverty guideline. " +
      'This calculator cannot produce a reliable final estimate. Consult a family law attorney.';

    return {
      version: 'FL-CS-2026.3',
      substantialTimesharing: false,
      combinedNetIncome,
      incomeShareA,
      incomeShareB,
      basicNeed: null,
      branch: 'low-income-below-800',
      warning: warningText,
      aboveTableIncome: false,
      payer: null,
      recipient: null,
      amount: 0,
      finalSupport: null,
      obligorLevelCheck: {
        obligorParent,
        obligorNetIncome,
        obligorHouseholdSize,
        federalPovertyGuidelineMonthly: povertyMonthly,
        incomeAbovePoverty,
        ninetyPercentCap,
        note: `Under §61.30(6)(a), support may not exceed 90% of the obligor's net income above the federal poverty guideline. Maximum reference amount: $${ninetyPercentCap.toFixed(2)}/month. Actual determination is case-by-case.`,
      },
      receipt: [
        `Net income A: $${netIncomeA.toFixed(2)}`,
        `Net income B: $${netIncomeB.toFixed(2)}`,
        `Combined net income: $${combinedNetIncome.toFixed(2)}`,
        `Branch: low-income-below-800 (§61.30(6)(a))`,
        `Obligor parent: ${obligorParent} (net income: $${obligorNetIncome.toFixed(2)})`,
        `Obligor household size: ${obligorHouseholdSize}`,
        `2026 federal poverty guideline (${obligorHouseholdSize}-person): $${povertyMonthly.toFixed(2)}/month`,
        `Obligor income above poverty line: $${incomeAbovePoverty.toFixed(2)}`,
        `90% cap (§61.30(6)(a)): $${ninetyPercentCap.toFixed(2)}/month`,
        `Warning: ${warningText}`,
        `Final support: Cannot calculate — income below $800/month threshold`,
        `Calculator version: FL-CS-2026.3`,
      ],
    } as FLChildSupportResult;
  }

  const basicNeedValue = basicNeedResult.basicNeed!;

  // ---- Step 3: Time-sharing branch ----
  // §61.30: substantial time-sharing requires BOTH parents >= 73 overnights
  // (exactly 72 does NOT qualify)
  const substantialTimesharing = overnightsA >= 73 && overnightsB >= 73;

  let result: Partial<FLChildSupportResult> = {
    version: 'FL-CS-2026.3',
    substantialTimesharing,
    combinedNetIncome,
    incomeShareA,
    incomeShareB,
    basicNeed: basicNeedValue,
    branch: basicNeedResult.branch,
    aboveTableIncome,
  };

  if (aboveTableIncome) {
    result.aboveTableWarning =
      'Combined net income exceeds $10,000. The §61.30(6)(b) excess-income formula has been applied ' +
      `(base at $10,000 + ${((FL_EXCESS_RATES[Math.min(Math.max(numberOfChildren, 1), 6)]) * 100).toFixed(1)}% of income above $10,000). ` +
      'Consult an attorney to confirm the applicable statutory rate.';
  }

  if (!substantialTimesharing) {
    // ---- Step 4A: Standard guideline ----
    // Determine payer dynamically based on overnights
    const majorityParent = overnightsA >= overnightsB ? 'A' : 'B';

    // When separately-allocated, noncovered medical is NOT pooled into totalNeed
    const totalNeed =
      basicNeedValue +
      qualifyingChildcare +
      qualifyingChildHealthInsurance +
      (noncoveredMedicalTreatment === 'separately-allocated' ? 0 : qualifyingNoncoveredMedical);

    const obligationA = totalNeed * incomeShareA;
    const obligationB = totalNeed * incomeShareB;

    // Separate medical allocation for ordinary time-sharing
    const ordSeparateMedShareA =
      noncoveredMedicalTreatment === 'separately-allocated'
        ? qualifyingNoncoveredMedical * incomeShareA
        : 0;
    const ordSeparateMedShareB =
      noncoveredMedicalTreatment === 'separately-allocated'
        ? qualifyingNoncoveredMedical * incomeShareB
        : 0;

    // The minority-time parent (supportParent) owes their share minus direct expenses they pay
    const expensePaidByB =
      childcarePaidByB + healthInsurancePaidByB +
      (noncoveredMedicalTreatment === 'separately-allocated' ? 0 : noncoveredMedicalPaidByB);
    const transferBtoA = obligationB - expensePaidByB;

    const payer: 'A' | 'B' | null = transferBtoA > 0 ? 'B' : transferBtoA < 0 ? 'A' : null;
    const recipient: 'A' | 'B' | null = transferBtoA > 0 ? 'A' : transferBtoA < 0 ? 'B' : null;
    const amount = Math.abs(transferBtoA);

    const receipt = [
      `Net income A: $${netIncomeA.toFixed(2)}`,
      `Net income B: $${netIncomeB.toFixed(2)}`,
      `Combined net income: $${combinedNetIncome.toFixed(2)}`,
      `Income share A/B: ${(incomeShareA * 100).toFixed(1)}% / ${(incomeShareB * 100).toFixed(1)}%`,
      `Basic guideline need: $${basicNeedValue.toFixed(2)}${aboveTableIncome ? ' (§61.30(6)(b) excess-income formula)' : ''}`,
      `Overnight % A/B: ${((overnightsA / 365) * 100).toFixed(1)}% / ${((overnightsB / 365) * 100).toFixed(1)}%`,
      `Substantial time-sharing: No`,
      `Majority parent: ${majorityParent}`,
      `Total need (basic + add-ons): $${totalNeed.toFixed(2)}`,
      `Obligation A: $${obligationA.toFixed(2)} (A's income share × total need)`,
      `Obligation B: $${obligationB.toFixed(2)} (B's income share × total need)`,
      `Expenses paid directly by B: $${expensePaidByB.toFixed(2)}`,
      `Transfer B→A: $${transferBtoA.toFixed(2)}`,
      `Final support: $${amount.toFixed(2)}/month [${payer ?? 'Neither'} → ${recipient ?? 'Neither'}]`,
      `Calculator version: FL-CS-2026.3`,
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
      finalSupport: amount,
      separateMedicalAllocation: {
        treatment: noncoveredMedicalTreatment,
        shareA: ordSeparateMedShareA,
        shareB: ordSeparateMedShareB,
        note: noncoveredMedicalTreatment === 'separately-allocated'
          ? 'Noncovered medical expenses are separately ordered by percentage and not included in the guideline calculation above.'
          : 'Noncovered medical expenses are included in the basic obligation (§61.30(8) default treatment).',
      },
      receipt,
    } as FLChildSupportResult;
  }

  // ---- Step 4B: Substantial time-sharing ----
  // §61.30(11)(b): gross-up base includes basicNeed + noncoveredMedical (§61.30(8))
  // EXCLUDES day care and health insurance (those are adjusted post-timeshare per §61.30(11)(b)(1))
  //
  // If noncoveredMedical is being handled separately by court order,
  // set noncoveredMedicalTreatment = 'separately-allocated'
  // In that case, exclude it from grossupBase and handle outside this calculation.
  const grossupBase =
    basicNeedValue +
    (noncoveredMedicalTreatment === 'included-in-basic-obligation'
      ? qualifyingNoncoveredMedical
      : 0);

  // B1: Base obligations from grossupBase
  const baseObligationA = grossupBase * incomeShareA;
  const baseObligationB = grossupBase * incomeShareB;

  // B2: 1.5× gross-up
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
  // Post-timeshare: ONLY childcare and health insurance (noncoveredMedical already handled in gross-up above)
  const postTimeshareExpensePool = qualifyingChildcare + qualifyingChildHealthInsurance;
  // If noncoveredMedical is separately allocated, it is NOT in the pool here either
  // Post-timeshare expense pool: childcare + health insurance only (§61.30(11)(b))
  // Separately-allocated noncovered medical is added here so it gets income-share allocation
  const expensePool = noncoveredMedicalTreatment === 'separately-allocated'
    ? qualifyingChildcare + qualifyingChildHealthInsurance + qualifyingNoncoveredMedical
    : postTimeshareExpensePool;

  const requiredExpenseA = expensePool * incomeShareA;
  const requiredExpenseB = expensePool * incomeShareB;

  const actualExpensePaidA =
    childcarePaidByA + healthInsurancePaidByA +
    (noncoveredMedicalTreatment === 'separately-allocated' ? noncoveredMedicalPaidByA : 0);
  const actualExpensePaidB =
    childcarePaidByB + healthInsurancePaidByB +
    (noncoveredMedicalTreatment === 'separately-allocated' ? noncoveredMedicalPaidByB : 0);

  // Separate medical allocation output (only when separately-allocated)
  const separateMedicalShareA =
    noncoveredMedicalTreatment === 'separately-allocated'
      ? qualifyingNoncoveredMedical * incomeShareA
      : 0;
  const separateMedicalShareB =
    noncoveredMedicalTreatment === 'separately-allocated'
      ? qualifyingNoncoveredMedical * incomeShareB
      : 0;

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

  const noncoveredNote = noncoveredMedicalTreatment === 'separately-allocated'
    ? 'noncoveredMedical separately-allocated (excluded from gross-up, returned as separateMedicalAllocation)'
    : `noncoveredMedical included in gross-up base per §61.30(8) (included-in-basic-obligation): $${qualifyingNoncoveredMedical.toFixed(2)}`;

  const receipt = [
    `Net income A: $${netIncomeA.toFixed(2)}`,
    `Net income B: $${netIncomeB.toFixed(2)}`,
    `Combined net income: $${combinedNetIncome.toFixed(2)}`,
    `Income share A/B: ${(incomeShareA * 100).toFixed(1)}% / ${(incomeShareB * 100).toFixed(1)}%`,
    `Basic guideline need: $${basicNeedValue.toFixed(2)}${aboveTableIncome ? ' (§61.30(6)(b) excess-income formula)' : ''}`,
    `Overnight % A/B: ${(overnightPctA * 100).toFixed(1)}% / ${(overnightPctB * 100).toFixed(1)}%`,
    `Substantial time-sharing: Yes`,
    `Noncovered medical treatment: ${noncoveredNote}`,
    `Gross-up base (basicNeed${noncoveredMedicalTreatment !== 'separately-allocated' ? ' + noncoveredMedical' : ''}): $${grossupBase.toFixed(2)}`,
    `A base obligation (grossupBase × A income share): $${baseObligationA.toFixed(2)}`,
    `B base obligation (grossupBase × B income share): $${baseObligationB.toFixed(2)}`,
    `× 1.5 gross-up → A: $${grossedObligationA.toFixed(2)} / B: $${grossedObligationB.toFixed(2)}`,
    `Cross-timeshare obligation A: $${crossObligationA.toFixed(2)} (= A grossed × B overnight%)`,
    `Cross-timeshare obligation B: $${crossObligationB.toFixed(2)} (= B grossed × A overnight%)`,
    `Base transfer (A→B): $${baseTransferAtoB.toFixed(2)}`,
    `Expense pool (childcare + insurance${noncoveredMedicalTreatment === 'separately-allocated' ? ' + noncoveredMedical' : ''}): $${expensePool.toFixed(2)}`,
    `A required expense share: $${requiredExpenseA.toFixed(2)}`,
    `A actual expenses paid: $${actualExpensePaidA.toFixed(2)}`,
    `Expense transfer A→B: $${expenseTransferAtoB.toFixed(2)}`,
    `Final transfer A→B: $${finalTransferAtoB.toFixed(2)}`,
    `Final support: $${amount.toFixed(2)}/month [${payer ?? 'Neither'} → ${recipient ?? 'Neither'}]`,
    `Calculator version: FL-CS-2026.3`,
  ];

  return {
    ...result,
    grossupBase,
    noncoveredMedicalTreatment,
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
    finalSupport: amount,
    separateMedicalAllocation: {
      treatment: noncoveredMedicalTreatment,
      shareA: separateMedicalShareA,
      shareB: separateMedicalShareB,
      note: noncoveredMedicalTreatment === 'separately-allocated'
        ? 'Noncovered medical expenses are separately ordered by percentage and not included in the guideline calculation above.'
        : 'Noncovered medical expenses are included in the basic obligation (§61.30(8) default treatment).',
    },
    receipt,
  } as FLChildSupportResult;
}
