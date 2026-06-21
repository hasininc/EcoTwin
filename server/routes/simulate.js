import { Router } from 'express';
import { simulateScenarioWithGemini } from '../services/gemini.js';

const router = Router();

/**
 * POST /api/simulate
 * Simulate custom scenario using Gemini AI
 */
router.post('/simulate', async (req, res, next) => {
  try {
    const { profile, customScenario } = req.body;

    if (!profile || !customScenario) {
      return res.status(400).json({ error: 'Profile and custom scenario text are required' });
    }

    const simulation = await simulateScenarioWithGemini(profile, customScenario);
    res.json(simulation);
  } catch (error) {
    console.error('Simulation error:', error.message);

    // If Gemini fails, return a fallback JSON structure
    if (error.message.includes('GEMINI_API_KEY') || error.message.includes('API')) {
      const fallbackSimulation = {
        scenarioName: "Custom Local Simulation",
        summary: "This is a fallback local estimation because the AI service is unavailable.",
        carbonChange: 1500,
        waterChange: 50000,
        wasteChange: 100,
        ecoScoreChange: 15,
        earthsNeededChange: 0.5,
        moneySaved: 800,
        oneYearImpact: "Initial changes will reduce your footprint steadily over the first 12 months.",
        fiveYearImpact: "Compounding effects will show significant resource conservation.",
        tenYearImpact: "Your lifestyle modification has fundamentally altered your environmental trajectory.",
        futureStory: "By adopting this new scenario, your environmental twin has embarked on a deeply impactful journey. You've adapted your daily habits, finding a balance between convenience and ecological responsibility. Over the next decade, this singular decision ripples outward, inspiring those around you and preventing significant carbon emissions from entering the atmosphere."
      };
      return res.status(200).json(fallbackSimulation);
    }

    next(error);
  }
});

export default router;
