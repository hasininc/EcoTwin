/**
 * EcoTwin Carbon Calculation Engine
 * 
 * All emission factors are in kg CO₂ equivalent unless noted.
 * Sources: EPA, IPCC, various lifecycle analysis studies.
 */

// ===== EMISSION FACTORS =====

export const TRANSPORT_FACTORS = {
  car: 0.21,       // kg CO₂/km
  scooter: 0.08,   // kg CO₂/km
  bus: 0.05,        // kg CO₂/km
  train: 0.03,      // kg CO₂/km
  bicycle: 0,       // kg CO₂/km
  walking: 0,       // kg CO₂/km
};

export const FOOD_FACTORS = {
  vegetarian: 1500,     // kg CO₂/year
  mixed: 2500,          // kg CO₂/year
  'heavy-meat': 3500,   // kg CO₂/year
};

export const ENERGY_FACTORS = {
  ac: 1.2,        // kg CO₂/hour
  fan: 0.05,      // kg CO₂/hour
  laptop: 0.04,   // kg CO₂/hour
  tv: 0.08,       // kg CO₂/hour
  other: 0.1,     // kg CO₂/hour (avg misc appliance)
};

export const FLIGHT_FACTOR = 250; // kg CO₂ per flight

export const SHOPPING_FACTORS = {
  clothing: 15,      // kg CO₂ per purchase
  electronics: 50,   // kg CO₂ per purchase
  misc: 10,          // kg CO₂ per purchase
  fastFashion: 20,   // kg CO₂ per fast fashion purchase
};

// Global sustainable average: ~1.7 tons CO₂ per person per year
const SUSTAINABLE_FOOTPRINT = 1700; // kg CO₂/year

// ===== CALCULATION FUNCTIONS =====

/**
 * Calculate annual transport emissions
 */
export function calculateTransportEmissions(profile) {
  const { transportType = 'car', dailyDistance = 10, usageFrequency = 5 } = profile;
  const factor = TRANSPORT_FACTORS[transportType] || 0;
  // usageFrequency = days per week
  return factor * dailyDistance * usageFrequency * 52;
}

/**
 * Calculate annual energy emissions from home appliances
 */
export function calculateEnergyEmissions(profile) {
  const {
    acHours = 0,
    fanHours = 0,
    laptopHours = 0,
    tvHours = 0,
    otherHours = 0,
  } = profile;

  const dailyEmissions =
    (acHours * ENERGY_FACTORS.ac) +
    (fanHours * ENERGY_FACTORS.fan) +
    (laptopHours * ENERGY_FACTORS.laptop) +
    (tvHours * ENERGY_FACTORS.tv) +
    (otherHours * ENERGY_FACTORS.other);

  return dailyEmissions * 365;
}

/**
 * Calculate annual food emissions
 */
export function calculateFoodEmissions(profile) {
  const { dietType = 'mixed', onlineMealsPerWeek = 2, foodWaste = 'moderate' } = profile;
  let base = FOOD_FACTORS[dietType] || FOOD_FACTORS.mixed;

  // Online meals add packaging/delivery emissions
  base += onlineMealsPerWeek * 2.5 * 52; // ~2.5 kg CO₂ per delivered meal

  // Food waste multiplier
  const wasteMultiplier = {
    low: 1.0,
    moderate: 1.1,
    high: 1.25,
  };
  base *= wasteMultiplier[foodWaste] || 1.1;

  return base;
}

/**
 * Calculate annual shopping emissions
 */
export function calculateShoppingEmissions(profile) {
  const {
    clothingPurchases = 2,
    electronicsPurchases = 1,
    miscPurchases = 3,
    fastFashionFrequency = 1,
  } = profile;

  return (
    (clothingPurchases * SHOPPING_FACTORS.clothing * 12) +
    (electronicsPurchases * SHOPPING_FACTORS.electronics * 12) +
    (miscPurchases * SHOPPING_FACTORS.misc * 12) +
    (fastFashionFrequency * SHOPPING_FACTORS.fastFashion * 12)
  );
}

/**
 * Calculate annual travel/flight emissions
 */
export function calculateTravelEmissions(profile) {
  const {
    flightsPerYear = 2,
    domesticTravelFrequency = 'occasional',
    longDistanceFrequency = 'rare',
  } = profile;

  let emissions = flightsPerYear * FLIGHT_FACTOR;

  // Domestic travel estimate (ground travel)
  const domesticMap = { rare: 200, occasional: 500, frequent: 1000 };
  emissions += domesticMap[domesticTravelFrequency] || 500;

  // Long-distance travel estimate
  const longDistMap = { rare: 100, occasional: 400, frequent: 800 };
  emissions += longDistMap[longDistanceFrequency] || 400;

  return emissions;
}

/**
 * Calculate total annual carbon footprint
 */
export function calculateTotalCarbon(profile) {
  const transport = calculateTransportEmissions(profile);
  const energy = calculateEnergyEmissions(profile);
  const food = calculateFoodEmissions(profile);
  const shopping = calculateShoppingEmissions(profile);
  const travel = calculateTravelEmissions(profile);

  return {
    transport: Math.round(transport),
    energy: Math.round(energy),
    food: Math.round(food),
    shopping: Math.round(shopping),
    travel: Math.round(travel),
    total: Math.round(transport + energy + food + shopping + travel),
  };
}

/**
 * Estimate annual water footprint (liters)
 * Based on lifestyle category approximations
 */
export function calculateWaterFootprint(profile) {
  const { dietType = 'mixed' } = profile;

  const dietWater = {
    vegetarian: 1500000,   // ~1.5M liters/year
    mixed: 2200000,        // ~2.2M liters/year
    'heavy-meat': 3300000, // ~3.3M liters/year
  };

  let base = dietWater[dietType] || dietWater.mixed;

  // Adjust for shopping habits
  const shopAdjust = (profile.clothingPurchases || 2) * 5000;
  base += shopAdjust * 12;

  return Math.round(base);
}

/**
 * Estimate annual waste generation (kg)
 */
export function calculateWasteFootprint(profile) {
  const { foodWaste = 'moderate', clothingPurchases = 2, miscPurchases = 3 } = profile;

  const wasteBase = { low: 200, moderate: 350, high: 500 };
  let waste = wasteBase[foodWaste] || 350;

  // Shopping waste
  waste += (clothingPurchases + miscPurchases) * 2 * 12;

  // Online delivery packaging
  waste += (profile.onlineMealsPerWeek || 2) * 0.3 * 52;

  return Math.round(waste);
}

/**
 * Calculate eco score (0-100, higher is better)
 */
export function calculateEcoScore(totalCarbon) {
  // Scale: 0 kg = 100, 10000 kg+ = 0
  const score = Math.max(0, Math.min(100, 100 - (totalCarbon / 100)));
  return Math.round(score);
}

/**
 * Calculate how many Earths needed if everyone lived like this user
 * Global sustainable avg: ~1.7 tonnes CO₂/person/year for 1 Earth
 */
export function calculateEarthsNeeded(totalCarbon) {
  return Math.round((totalCarbon / SUSTAINABLE_FOOTPRINT) * 10) / 10;
}

/**
 * Generate complete environmental profile from user inputs
 */
export function generateEnvironmentalProfile(profile) {
  const carbon = calculateTotalCarbon(profile);
  const waterFootprint = calculateWaterFootprint(profile);
  const wasteFootprint = calculateWasteFootprint(profile);
  const ecoScore = calculateEcoScore(carbon.total);
  const earthsNeeded = calculateEarthsNeeded(carbon.total);

  return {
    carbon,
    waterFootprint,
    wasteFootprint,
    ecoScore,
    earthsNeeded,
    profile,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Calculate future projections over 10 years
 * Assumes slight annual increase without intervention
 */
export function calculateFutureProjections(currentTotal, years = 10) {
  const annualGrowthRate = 0.02; // 2% annual increase baseline
  const projections = [];

  for (let year = 0; year <= years; year++) {
    const projected = currentTotal * Math.pow(1 + annualGrowthRate, year);
    projections.push({
      year: new Date().getFullYear() + year,
      emissions: Math.round(projected),
    });
  }

  return projections;
}

/**
 * Apply a scenario modification and recalculate
 */
export function applyScenario(profile, scenario) {
  const modified = { ...profile };

  switch (scenario.id) {
    // Preset Scenarios
    case 'vegetarian':
      modified.dietType = 'vegetarian';
      break;
    case 'electric-vehicle':
      modified.transportType = 'car';
      modified.dailyDistance = profile.dailyDistance || 10;
      return recalculateWithFactor(profile, modified, 'transport', 0.3);
    case 'public-transport':
      modified.transportType = 'bus';
      break;
    case 'reduce-ac':
      modified.acHours = Math.max(0, (profile.acHours || 4) - 3);
      break;
    case 'stop-fast-fashion':
      modified.fastFashionFrequency = 0;
      break;
    case 'reduce-flights':
      modified.flightsPerYear = Math.max(0, Math.floor((profile.flightsPerYear || 2) / 2));
      break;
    case 'work-from-home':
      modified.dailyDistance = Math.max(0, (profile.dailyDistance || 10) * 0.2);
      modified.usageFrequency = 1;
      break;
    case 'cycle-to-work':
      modified.transportType = 'bicycle';
      break;

    // Lifestyle Transformations
    case 'college-student':
      modified.transportType = 'bus';
      modified.dietType = 'mixed';
      modified.acHours = 0;
      modified.clothingPurchases = 1;
      modified.flightsPerYear = 0;
      break;
    case 'hostel-living':
      modified.acHours = 1;
      modified.tvHours = 0;
      modified.otherHours = 1;
      modified.clothingPurchases = Math.max(0, (profile.clothingPurchases || 2) - 1);
      break;
    case 'remote-worker':
      modified.dailyDistance = 0;
      modified.usageFrequency = 0;
      modified.laptopHours = 10;
      modified.acHours = (profile.acHours || 2) + 4;
      break;
    case 'sustainable-traveler':
      modified.flightsPerYear = Math.max(0, (profile.flightsPerYear || 2) - 2);
      modified.longDistanceFrequency = 'rare';
      break;
    case 'minimalist-living':
      modified.clothingPurchases = 0;
      modified.electronicsPurchases = 0;
      modified.miscPurchases = 1;
      modified.fastFashionFrequency = 0;
      break;
    case 'zero-waste':
      modified.foodWaste = 'low';
      modified.onlineMealsPerWeek = 0;
      modified.miscPurchases = Math.max(0, (profile.miscPurchases || 3) - 2);
      break;
    case 'ev-owner':
      modified.transportType = 'car';
      return recalculateWithFactor(profile, modified, 'transport', 0.3);
    case 'eco-shopper':
      modified.fastFashionFrequency = 0;
      modified.clothingPurchases = Math.max(0, Math.floor((profile.clothingPurchases || 2) / 2));
      break;
    case 'cycling-commuter':
      modified.transportType = 'bicycle';
      modified.usageFrequency = 5;
      break;
    case 'digital-nomad':
      modified.flightsPerYear = (profile.flightsPerYear || 2) + 4;
      modified.clothingPurchases = 1;
      modified.electronicsPurchases = 1;
      break;
    case 'urban-professional':
      modified.onlineMealsPerWeek = (profile.onlineMealsPerWeek || 2) + 3;
      modified.transportType = 'scooter';
      break;
    case 'green-family':
      modified.dietType = 'vegetarian';
      modified.foodWaste = 'low';
      modified.transportType = 'car';
      modified.usageFrequency = 3;
      break;

    // Major Life Events
    case 'moving-city':
      modified.dailyDistance = (profile.dailyDistance || 10) * 1.5;
      modified.flightsPerYear = (profile.flightsPerYear || 0) + 1;
      break;
    case 'new-job':
      modified.dailyDistance = (profile.dailyDistance || 10) + 5;
      modified.transportType = 'car';
      break;
    case 'living-hostel':
      modified.acHours = 0;
      modified.tvHours = 0;
      break;
    case 'renting-apartment':
      modified.acHours = (profile.acHours || 0) + 2;
      modified.tvHours = (profile.tvHours || 0) + 2;
      break;
    case 'buying-car':
      modified.transportType = 'car';
      modified.usageFrequency = 6;
      break;
    case 'buying-ev':
      modified.transportType = 'car';
      return recalculateWithFactor(profile, modified, 'transport', 0.3);
    case 'working-home':
      modified.dailyDistance = 0;
      modified.acHours = (profile.acHours || 2) + 6;
      break;
    case 'studying-abroad':
      modified.flightsPerYear = (profile.flightsPerYear || 0) + 2;
      modified.transportType = 'bus';
      break;
    case 'business-travel':
      modified.flightsPerYear = (profile.flightsPerYear || 0) + 6;
      modified.longDistanceFrequency = 'frequent';
      break;
    case 'starting-family':
      modified.acHours = (profile.acHours || 0) + 4;
      modified.clothingPurchases = (profile.clothingPurchases || 2) + 3;
      modified.foodWaste = 'high';
      break;

    default:
      break;
  }

  return generateEnvironmentalProfile(modified);
}

/**
 * Helper to recalculate with a factor applied to one category
 */
function recalculateWithFactor(originalProfile, modifiedProfile, category, factor) {
  const result = generateEnvironmentalProfile(modifiedProfile);
  const originalResult = generateEnvironmentalProfile(originalProfile);

  if (category === 'transport') {
    const reduced = Math.round(originalResult.carbon.transport * factor);
    const diff = originalResult.carbon.transport - reduced;
    result.carbon.transport = reduced;
    result.carbon.total = originalResult.carbon.total - diff;
    result.ecoScore = calculateEcoScore(result.carbon.total);
    result.earthsNeeded = calculateEarthsNeeded(result.carbon.total);
  }

  return result;
}

/**
 * Calculate timeline milestones (1yr, 5yr, 10yr savings)
 */
export function calculateTimelineSavings(currentProfile, futureProfile) {
  const currentTotal = currentProfile.carbon.total;
  const futureTotal = futureProfile.carbon.total;
  const annualSaving = currentTotal - futureTotal;

  if (annualSaving <= 0) {
    return { year1: null, year5: null, year10: null };
  }

  const treesPerTon = 45; // ~45 trees absorb 1 ton CO₂/year
  const waterSaving = Math.round(currentProfile.waterFootprint - futureProfile.waterFootprint);
  const wasteSaving = Math.round(currentProfile.wasteFootprint - futureProfile.wasteFootprint);
  const moneySaving = Math.round(annualSaving * 0.5); // rough $0.50 per kg CO₂ saved via energy/fuel

  return {
    year1: {
      carbonReduced: annualSaving,
      waterSaved: waterSaving,
      wasteReduced: wasteSaving,
      moneySaved: moneySaving,
      treesEquivalent: Math.round((annualSaving / 1000) * treesPerTon),
    },
    year5: {
      carbonReduced: annualSaving * 5,
      waterSaved: waterSaving * 5,
      wasteReduced: wasteSaving * 5,
      moneySaved: moneySaving * 5,
      treesEquivalent: Math.round((annualSaving * 5 / 1000) * treesPerTon),
    },
    year10: {
      carbonReduced: annualSaving * 10,
      waterSaved: waterSaving * 10,
      wasteReduced: wasteSaving * 10,
      moneySaved: moneySaving * 10,
      treesEquivalent: Math.round((annualSaving * 10 / 1000) * treesPerTon),
    },
  };
}
