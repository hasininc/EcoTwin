import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let model = null;

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  return model;
}

/**
 * Analyze user's environmental profile using Gemini AI
 */
export async function analyzeWithGemini(profile, results) {
  const geminiModel = getModel();

  if (!geminiModel) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const prompt = buildPrompt(profile, results);

  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  const jsonStr = jsonMatch[1] || jsonMatch[0];
  return JSON.parse(jsonStr);
}

function buildPrompt(profile, results) {
  return `You are an environmental sustainability analyst AI for EcoTwin, a digital environmental twin platform.

Analyze this user's environmental profile and provide detailed, personalized insights.

USER PROFILE:
- Transport: ${profile.transportType}, ${profile.dailyDistance}km/day, ${profile.usageFrequency} days/week
- Energy: AC ${profile.acHours}h, Fan ${profile.fanHours}h, Laptop ${profile.laptopHours}h, TV ${profile.tvHours}h daily
- Diet: ${profile.dietType}, ${profile.onlineMealsPerWeek} online meals/week, food waste: ${profile.foodWaste}
- Shopping: ${profile.clothingPurchases} clothing, ${profile.electronicsPurchases} electronics, ${profile.miscPurchases} misc per month
- Fast fashion: ${profile.fastFashionFrequency} per month
- Travel: ${profile.flightsPerYear} flights/year, domestic: ${profile.domesticTravelFrequency}, long-distance: ${profile.longDistanceFrequency}

CALCULATED RESULTS:
- Total Carbon: ${results?.carbon?.total || 0} kg CO₂/year
- Transport: ${results?.carbon?.transport || 0} kg, Food: ${results?.carbon?.food || 0} kg, Energy: ${results?.carbon?.energy || 0} kg
- Shopping: ${results?.carbon?.shopping || 0} kg, Travel: ${results?.carbon?.travel || 0} kg
- Eco Score: ${results?.ecoScore || 0}/100
- Earths Needed: ${results?.earthsNeeded || 0}

Return a JSON object with this exact structure:
{
  "carbonAnalysis": {
    "totalAnnual": <number>,
    "biggestSource": "<category name>",
    "biggestSourcePercent": <number>,
    "breakdown": [{"name": "<category>", "value": <kg>}]
  },
  "recommendations": [
    {
      "title": "<short title>",
      "description": "<actionable recommendation>",
      "potentialSaving": <kg CO2 saved per year>
    }
  ],
  "futureProjections": {
    "withChanges": <number kg>,
    "withoutChanges": <number kg>,
    "potentialReduction": <number kg>
  },
  "climateLegacy": {
    "tenYearImpact": <number kg>,
    "treesEquivalent": <number>,
    "carsRemoved": <number>
  },
  "futureStory": {
    "title": "<compelling title with future year>",
    "body": "<2-3 paragraph narrative about their environmental journey>",
    "outcomes": ["<positive outcome 1>", "<positive outcome 2>", "<positive outcome 3>"]
  },
  "doppelganger": {
    "type": "<lifestyle archetype>",
    "description": "<brief description>"
  }
}

Make recommendations specific and actionable. The future story should be inspiring and personalized.
Return ONLY valid JSON wrapped in \`\`\`json code blocks.`;
}

/**
 * Simulate custom user scenario using Gemini AI
 */
export async function simulateScenarioWithGemini(profile, customScenarioText) {
  const geminiModel = getModel();

  if (!geminiModel) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const prompt = buildSimulationPrompt(profile, customScenarioText);

  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  const jsonStr = jsonMatch[1] || jsonMatch[0];
  return JSON.parse(jsonStr);
}

function buildSimulationPrompt(profile, customScenarioText) {
  return `You are an environmental sustainability analyst AI for EcoTwin.

The user is exploring a "What If" scenario to see how a lifestyle change affects their environmental future.

USER'S CURRENT PROFILE:
- Transport: ${profile.transportType}, ${profile.dailyDistance}km/day, ${profile.usageFrequency} days/week
- Energy: AC ${profile.acHours}h, Fan ${profile.fanHours}h, Laptop ${profile.laptopHours}h, TV ${profile.tvHours}h daily
- Diet: ${profile.dietType}, ${profile.onlineMealsPerWeek} online meals/week, food waste: ${profile.foodWaste}
- Shopping: ${profile.clothingPurchases} clothing, ${profile.electronicsPurchases} electronics, ${profile.miscPurchases} misc per month
- Fast fashion: ${profile.fastFashionFrequency} per month
- Travel: ${profile.flightsPerYear} flights/year, domestic: ${profile.domesticTravelFrequency}, long-distance: ${profile.longDistanceFrequency}

CUSTOM SCENARIO:
"${customScenarioText}"

Estimate the environmental impact of this scenario compared to their current profile.

Return a JSON object with this exact structure:
{
  "scenarioName": "<Generate a catchy 2-4 word title for this scenario>",
  "summary": "<1 sentence summary of the primary impact>",
  "carbonChange": <number representing kg CO2 saved per year (use negative for increases)>,
  "waterChange": <number representing liters of water saved per year>,
  "wasteChange": <number representing kg of waste prevented per year>,
  "ecoScoreChange": <number representing estimated points added to EcoScore (0-100 scale)>,
  "earthsNeededChange": <number representing Earths reduced (e.g. 0.2)>,
  "moneySaved": <number representing estimated USD saved per year>,
  "oneYearImpact": "<Brief description of 1 year impact>",
  "fiveYearImpact": "<Brief description of 5 year impact>",
  "tenYearImpact": "<Brief description of 10 year impact>",
  "futureStory": "<A compelling 2-paragraph narrative about their future life living this scenario>"
}

Ensure the numbers are realistic estimates. Return ONLY valid JSON wrapped in \`\`\`json code blocks.`;
}
