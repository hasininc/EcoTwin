import { Router } from 'express';
import { analyzeWithGemini } from '../services/gemini.js';

const router = Router();

/**
 * POST /api/analyze
 * Analyze user's environmental profile using Gemini AI
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const { profile, results } = req.body;

    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' });
    }

    const analysis = await analyzeWithGemini(profile, results);
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error.message);

    // If Gemini fails, return a 503 so the frontend uses its fallback
    if (error.message.includes('GEMINI_API_KEY') || error.message.includes('API')) {
      return res.status(503).json({
        error: 'AI service unavailable',
        message: 'Using local analysis instead',
      });
    }

    next(error);
  }
});

export default router;
