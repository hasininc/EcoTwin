import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoute from './routes/analyze.js';
import simulateRoute from './routes/simulate.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', analyzeRoute);
app.use('/api', simulateRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'EcoTwin API' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🌿 EcoTwin API running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY not set — AI insights will use fallback mode');
  }
});
