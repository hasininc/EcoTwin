# EcoTwin

"What if you could meet the environmental version of your future self?"

EcoTwin is a production-quality, full-stack web application that allows users to create a digital version of their lifestyle and discover the environmental future their choices are building.

Unlike traditional carbon footprint calculators, EcoTwin creates an immersive Digital Environmental Twin, offering a Futuristic "Climate Time Machine", AI-powered sustainability insights, and Future Scenarios.

## Features

- **Digital Twin Creation**: A beautiful, multi-step onboarding wizard gathering data about your transport, home energy, food habits, shopping, and travel.
- **Future Simulator**: Test "what-if" scenarios (like switching to an EV, becoming vegetarian, etc.) and instantly see the impact on your carbon, water, and waste footprints.
- **Climate Legacy**: See your projected environmental impact across 1, 5, and 10-year horizons, with AI-generated reflections on your future impact.
- **AI Sustainability Guide**: Uses Gemini AI to analyze your lifestyle, identify your biggest emission sources, and provide personalized, actionable recommendations.
- **Environmental Doppelgänger**: Discover what your lifestyle resembles (e.g., "Remote Software Developer", "Sustainable Commuter").
- **Earths Needed**: A visual indicator of how many Earths would be required if everyone lived exactly like you.
- **Shareable Climate Card**: Generates a beautiful image summarizing your Eco Score and key metrics, ready to be shared on social media.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion (Animations), Recharts (Data Visualization), Lucide React (Icons), html2canvas (Image generation).
- **Backend**: Node.js, Express.
- **AI Integration**: Google Gemini API.
- **State Management**: React Context API + LocalStorage persistence (prepared for future MongoDB backend).

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Google Gemini API key (optional, but required for AI features. App falls back to local calculations if omitted).

### 1. Clone & Install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Open `server/.env` and add your Gemini API key (optional):
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

### 3. Run the Application

You need two terminal windows to run both frontend and backend concurrently.

**Terminal 1: Start Backend Server**
```bash
cd server
npm run dev
```
(Server will start on http://localhost:3001)

**Terminal 2: Start Frontend**
```bash
cd client
npm run dev
```
(Vite will start on http://localhost:5174 and proxy API requests to port 3001)

### 4. Open in Browser
Visit `http://localhost:5174` to start using EcoTwin.

## Architecture

- **`client/`**: The React SPA. Contains all UI components, pages, routing, and a `carbonEngine.js` for pure functional calculations.
- **`server/`**: The Express API. Exposes the `/api/analyze` endpoint for securely communicating with the Gemini API.

## Design

Built with a premium, futuristic dark-mode aesthetic using "Glassmorphism", soft shadows, smooth gradients, and elegant Framer Motion animations.

## License

MIT License. Built for a better planet. 🌍
