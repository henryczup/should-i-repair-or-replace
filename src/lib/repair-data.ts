// Phone depreciation rates (annual value retention)
export const DEPRECIATION_RATES = {
  apple: 0.82, // iPhones retain ~82% value per year
  android_flagship: 0.65, // Samsung Galaxy S, Pixel Pro retain ~65%
  android_mid: 0.55, // Mid-range Androids retain ~55%
  android_budget: 0.45, // Budget Androids retain ~45%
} as const;

// Common repair types with costs and difficulty
export const REPAIR_TYPES = {
  screen: {
    name: "Cracked Screen",
    shopCostRange: { min: 80, max: 350 },
    diyCostRange: { min: 25, max: 150 },
    diyDifficulty: "moderate",
    diyTime: "1-2 hours",
    riskLevel: "low",
    description: "Display replacement - most common repair",
    warnings: [],
  },
  battery: {
    name: "Battery",
    shopCostRange: { min: 50, max: 120 },
    diyCostRange: { min: 15, max: 50 },
    diyDifficulty: "moderate",
    diyTime: "30-60 min",
    riskLevel: "medium",
    description: "Restore battery health to like-new",
    warnings: ["Puncturing battery can cause fire"],
  },
  charging: {
    name: "Charging Port",
    shopCostRange: { min: 60, max: 150 },
    diyCostRange: { min: 10, max: 40 },
    diyDifficulty: "hard",
    diyTime: "1-2 hours",
    riskLevel: "medium",
    description: "Fix loose or non-working charging",
    warnings: ["Often soldered - requires skill"],
  },
  water: {
    name: "Water Damage",
    shopCostRange: { min: 100, max: 500 },
    diyCostRange: { min: 20, max: 50 },
    diyDifficulty: "expert",
    diyTime: "2-4 hours",
    riskLevel: "high",
    description: "Corrosion cleaning and part replacement",
    warnings: [
      "Success rate only 50-60%",
      "Hidden damage may appear later",
      "No guarantees even from shops",
    ],
  },
  backGlass: {
    name: "Back Glass",
    shopCostRange: { min: 70, max: 200 },
    diyCostRange: { min: 20, max: 60 },
    diyDifficulty: "hard",
    diyTime: "1-2 hours",
    riskLevel: "medium",
    description: "Replace cracked back panel",
    warnings: ["May affect wireless charging if done wrong"],
  },
  camera: {
    name: "Camera",
    shopCostRange: { min: 80, max: 250 },
    diyCostRange: { min: 30, max: 100 },
    diyDifficulty: "hard",
    diyTime: "1-2 hours",
    riskLevel: "medium",
    description: "Fix cracked lens or faulty camera",
    warnings: ["Calibration may be needed"],
  },
  speaker: {
    name: "Speaker",
    shopCostRange: { min: 50, max: 120 },
    diyCostRange: { min: 10, max: 35 },
    diyDifficulty: "moderate",
    diyTime: "45-90 min",
    riskLevel: "low",
    description: "Restore audio quality",
    warnings: [],
  },
  buttons: {
    name: "Buttons",
    shopCostRange: { min: 50, max: 100 },
    diyCostRange: { min: 10, max: 30 },
    diyDifficulty: "hard",
    diyTime: "1-2 hours",
    riskLevel: "medium",
    description: "Fix stuck or unresponsive buttons",
    warnings: ["Flex cables are fragile"],
  },
} as const;

export type RepairType = keyof typeof REPAIR_TYPES;
export type PhoneType = keyof typeof DEPRECIATION_RATES;
export type DifficultyLevel = "easy" | "moderate" | "hard" | "expert";

// Popular phone models with approximate original prices
export const PHONE_MODELS = {
  // Apple
  "iPhone 15 Pro Max": { brand: "apple" as const, msrp: 1199, year: 2023 },
  "iPhone 15 Pro": { brand: "apple" as const, msrp: 999, year: 2023 },
  "iPhone 15": { brand: "apple" as const, msrp: 799, year: 2023 },
  "iPhone 14 Pro Max": { brand: "apple" as const, msrp: 1099, year: 2022 },
  "iPhone 14 Pro": { brand: "apple" as const, msrp: 999, year: 2022 },
  "iPhone 14": { brand: "apple" as const, msrp: 799, year: 2022 },
  "iPhone 13 Pro Max": { brand: "apple" as const, msrp: 1099, year: 2021 },
  "iPhone 13 Pro": { brand: "apple" as const, msrp: 999, year: 2021 },
  "iPhone 13": { brand: "apple" as const, msrp: 799, year: 2021 },
  "iPhone 12 Pro Max": { brand: "apple" as const, msrp: 1099, year: 2020 },
  "iPhone 12 Pro": { brand: "apple" as const, msrp: 999, year: 2020 },
  "iPhone 12": { brand: "apple" as const, msrp: 799, year: 2020 },
  "iPhone 11 Pro Max": { brand: "apple" as const, msrp: 1099, year: 2019 },
  "iPhone 11 Pro": { brand: "apple" as const, msrp: 999, year: 2019 },
  "iPhone 11": { brand: "apple" as const, msrp: 699, year: 2019 },
  "iPhone SE (2022)": { brand: "apple" as const, msrp: 429, year: 2022 },
  "iPhone SE (2020)": { brand: "apple" as const, msrp: 399, year: 2020 },

  // Samsung Flagship
  "Samsung Galaxy S24 Ultra": { brand: "android_flagship" as const, msrp: 1299, year: 2024 },
  "Samsung Galaxy S24+": { brand: "android_flagship" as const, msrp: 999, year: 2024 },
  "Samsung Galaxy S24": { brand: "android_flagship" as const, msrp: 799, year: 2024 },
  "Samsung Galaxy S23 Ultra": { brand: "android_flagship" as const, msrp: 1199, year: 2023 },
  "Samsung Galaxy S23+": { brand: "android_flagship" as const, msrp: 999, year: 2023 },
  "Samsung Galaxy S23": { brand: "android_flagship" as const, msrp: 799, year: 2023 },
  "Samsung Galaxy S22 Ultra": { brand: "android_flagship" as const, msrp: 1199, year: 2022 },
  "Samsung Galaxy S22+": { brand: "android_flagship" as const, msrp: 999, year: 2022 },
  "Samsung Galaxy S22": { brand: "android_flagship" as const, msrp: 799, year: 2022 },
  "Samsung Galaxy Z Fold 5": { brand: "android_flagship" as const, msrp: 1799, year: 2023 },
  "Samsung Galaxy Z Flip 5": { brand: "android_flagship" as const, msrp: 999, year: 2023 },

  // Google Pixel
  "Google Pixel 8 Pro": { brand: "android_flagship" as const, msrp: 999, year: 2023 },
  "Google Pixel 8": { brand: "android_flagship" as const, msrp: 699, year: 2023 },
  "Google Pixel 7 Pro": { brand: "android_flagship" as const, msrp: 899, year: 2022 },
  "Google Pixel 7": { brand: "android_flagship" as const, msrp: 599, year: 2022 },
  "Google Pixel 7a": { brand: "android_mid" as const, msrp: 499, year: 2023 },
  "Google Pixel 6a": { brand: "android_mid" as const, msrp: 449, year: 2022 },

  // Samsung Mid-range
  "Samsung Galaxy A54": { brand: "android_mid" as const, msrp: 449, year: 2023 },
  "Samsung Galaxy A34": { brand: "android_mid" as const, msrp: 399, year: 2023 },
  "Samsung Galaxy A14": { brand: "android_budget" as const, msrp: 199, year: 2023 },

  // OnePlus
  "OnePlus 12": { brand: "android_flagship" as const, msrp: 799, year: 2024 },
  "OnePlus 11": { brand: "android_flagship" as const, msrp: 699, year: 2023 },

  // Other/Custom
  "Other (enter manually)": { brand: "android_mid" as const, msrp: 0, year: 2023 },
} as const;

export type PhoneModel = keyof typeof PHONE_MODELS;

// DIY toolkit cost (one-time investment)
export const DIY_TOOLKIT_COST = 25;

// Calculate current phone value based on depreciation
export function calculateCurrentValue(
  originalPrice: number,
  ageInYears: number,
  phoneType: PhoneType
): number {
  const retentionRate = DEPRECIATION_RATES[phoneType];
  const currentValue = originalPrice * Math.pow(retentionRate, ageInYears);
  return Math.round(currentValue);
}

// Calculate repair recommendation score (0-100)
export function calculateRepairScore(
  repairCost: number,
  currentValue: number,
  riskLevel: string
): number {
  // Base score from 50% rule
  const costRatio = repairCost / currentValue;
  let score = 100 - costRatio * 100;

  // Adjust for risk
  if (riskLevel === "high") score -= 20;
  else if (riskLevel === "medium") score -= 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// Get recommendation based on scores
export type Recommendation = "repair_shop" | "repair_diy" | "replace" | "toss_up";

export interface RepairAnalysis {
  shopRepair: {
    cost: number;
    score: number;
    recommended: boolean;
    costRatio: number;
  };
  diyRepair: {
    cost: number;
    costWithTools: number;
    score: number;
    recommended: boolean;
    costRatio: number;
    difficulty: string;
    hasTools: boolean;
  };
  replace: {
    cost: number;
    recommended: boolean;
  };
  currentValue: number;
  recommendation: Recommendation;
  reasoning: string[];
}

export function analyzeRepairOptions(
  phoneModel: PhoneModel,
  customPrice: number | null,
  ageInYears: number,
  repairType: RepairType,
  hasTools: boolean
): RepairAnalysis {
  const modelData = PHONE_MODELS[phoneModel];
  const originalPrice = customPrice ?? modelData.msrp;
  const phoneType = modelData.brand;
  const repair = REPAIR_TYPES[repairType];

  // Calculate current value (minimum $50 to avoid division issues)
  const currentValue = Math.max(50, calculateCurrentValue(originalPrice, ageInYears, phoneType));

  // Average repair costs
  const shopCost = Math.round((repair.shopCostRange.min + repair.shopCostRange.max) / 2);
  const diyCost = Math.round((repair.diyCostRange.min + repair.diyCostRange.max) / 2);
  const diyCostWithTools = hasTools ? diyCost : diyCost + DIY_TOOLKIT_COST;

  // Calculate scores
  const shopScore = calculateRepairScore(shopCost, currentValue, repair.riskLevel);
  const diyScore = calculateRepairScore(diyCostWithTools, currentValue, repair.riskLevel);

  // Cost ratios (for 50% rule)
  const shopCostRatio = shopCost / currentValue;
  const diyCostRatio = diyCostWithTools / currentValue;

  // Replacement cost: estimate current market price for a comparable new phone
  // Newer models typically cost similar to original MSRP, or slightly less for refurbished
  const replacementCost = Math.round(originalPrice * 0.9);

  // Determine recommendations
  const shopRecommended = shopCostRatio < 0.5 && repair.riskLevel !== "high";
  const diyRecommended =
    diyCostRatio < 0.4 &&
    repair.riskLevel !== "high" &&
    (repair.diyDifficulty === "moderate" || repair.diyDifficulty === "hard");
  const replaceRecommended = shopCostRatio >= 0.5 || repair.riskLevel === "high";

  // Build reasoning
  const reasoning: string[] = [];

  if (shopCostRatio < 0.3) {
    reasoning.push(`Shop repair is only ${Math.round(shopCostRatio * 100)}% of phone value - great deal!`);
  } else if (shopCostRatio < 0.5) {
    reasoning.push(`Shop repair is ${Math.round(shopCostRatio * 100)}% of phone value - reasonable`);
  } else {
    reasoning.push(`Shop repair exceeds 50% rule (${Math.round(shopCostRatio * 100)}% of value)`);
  }

  if (repair.riskLevel === "high") {
    reasoning.push(`⚠️ High risk repair - success not guaranteed`);
  }

  if (repair.diyDifficulty === "expert") {
    reasoning.push(`DIY not recommended - requires expert skills`);
  } else if (repair.diyDifficulty === "hard") {
    reasoning.push(`DIY possible but challenging - consider your skill level`);
  }

  if (ageInYears >= 4) {
    reasoning.push(`Phone is ${ageInYears}+ years old - may face other issues soon`);
  }

  if (currentValue < 150) {
    reasoning.push(`Low resale value ($${currentValue}) - replacement may make more sense`);
  }

  // Determine overall recommendation
  let recommendation: Recommendation;
  if (replaceRecommended && !shopRecommended && !diyRecommended) {
    recommendation = "replace";
  } else if (diyRecommended && diyCostRatio < shopCostRatio * 0.6) {
    recommendation = "repair_diy";
  } else if (shopRecommended) {
    recommendation = "repair_shop";
  } else if (diyRecommended) {
    recommendation = "repair_diy";
  } else {
    recommendation = "toss_up";
  }

  return {
    shopRepair: {
      cost: shopCost,
      score: shopScore,
      recommended: shopRecommended,
      costRatio: shopCostRatio,
    },
    diyRepair: {
      cost: diyCost,
      costWithTools: diyCostWithTools,
      score: diyScore,
      recommended: diyRecommended,
      costRatio: diyCostRatio,
      difficulty: repair.diyDifficulty,
      hasTools: hasTools,
    },
    replace: {
      cost: replacementCost,
      recommended: replaceRecommended,
    },
    currentValue,
    recommendation,
    reasoning,
  };
}
