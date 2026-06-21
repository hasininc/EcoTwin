import { createContext, useContext, useReducer, useEffect } from 'react';
import { generateEnvironmentalProfile } from '../utils/carbonEngine';

const TwinContext = createContext(null);

const STORAGE_KEY = 'ecotwin-data';

const initialState = {
  // User lifestyle inputs
  profile: {
    transportType: 'car',
    dailyDistance: 10,
    usageFrequency: 5,
    acHours: 4,
    fanHours: 6,
    laptopHours: 8,
    tvHours: 3,
    otherHours: 2,
    dietType: 'mixed',
    onlineMealsPerWeek: 3,
    foodWaste: 'moderate',
    clothingPurchases: 2,
    electronicsPurchases: 1,
    miscPurchases: 3,
    fastFashionFrequency: 2,
    flightsPerYear: 2,
    domesticTravelFrequency: 'occasional',
    longDistanceFrequency: 'rare',
  },
  // Calculated results
  results: null,
  // AI insights from Gemini
  aiInsights: null,
  // Gamification badges
  badges: [],
  // AI Custom scenario result
  customScenarioResult: null,
  // Whether the twin has been generated
  twinGenerated: false,
  // Loading states
  isGenerating: false,
  isLoadingAI: false,
  isSimulating: false,
};

function twinReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
        twinGenerated: true,
        isGenerating: false,
      };
    case 'SET_AI_INSIGHTS':
      return {
        ...state,
        aiInsights: action.payload,
        isLoadingAI: false,
      };
    case 'SET_CUSTOM_SCENARIO':
      return {
        ...state,
        customScenarioResult: action.payload,
        isSimulating: false,
      };
    case 'AWARD_BADGE':
      if (state.badges.includes(action.payload)) return state;
      return {
        ...state,
        badges: [...state.badges, action.payload],
      };
    case 'START_GENERATING':
      return { ...state, isGenerating: true };
    case 'START_LOADING_AI':
      return { ...state, isLoadingAI: true };
    case 'START_SIMULATING':
      return { ...state, isSimulating: true };
    case 'RESET':
      return { ...initialState };
    case 'LOAD_SAVED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function TwinProvider({ children }) {
  const [state, dispatch] = useReducer(twinReducer, initialState, (initial) => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initial, ...parsed };
      }
    } catch {
      // Ignore parse errors
    }
    return initial;
  });

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      const toSave = {
        profile: state.profile,
        results: state.results,
        aiInsights: state.aiInsights,
        twinGenerated: state.twinGenerated,
        badges: state.badges,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Ignore storage errors
    }
  }, [state.profile, state.results, state.aiInsights, state.twinGenerated, state.badges]);

  const updateProfile = (updates) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });
  };

  const generateTwin = () => {
    dispatch({ type: 'START_GENERATING' });

    // Simulate generation time for UX
    setTimeout(() => {
      const results = generateEnvironmentalProfile(state.profile);
      dispatch({ type: 'SET_RESULTS', payload: results });
    }, 2500);
  };

  const fetchAIInsights = async () => {
    dispatch({ type: 'START_LOADING_AI' });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: state.profile,
          results: state.results,
        }),
      });

      if (!response.ok) throw new Error('AI analysis failed');

      const data = await response.json();
      dispatch({ type: 'SET_AI_INSIGHTS', payload: data });
    } catch (error) {
      console.warn('AI insights unavailable, using fallback:', error.message);
      // Generate fallback insights from carbon data
      const fallback = generateFallbackInsights(state.results);
      dispatch({ type: 'SET_AI_INSIGHTS', payload: fallback });
    }
  };

  const simulateCustomScenario = async (customScenarioText) => {
    dispatch({ type: 'START_SIMULATING' });

    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: state.profile,
          customScenario: customScenarioText,
        }),
      });

      if (!response.ok) throw new Error('AI simulation failed');

      const data = await response.json();
      dispatch({ type: 'SET_CUSTOM_SCENARIO', payload: data });
      return data;
    } catch (error) {
      console.error('Simulation error:', error.message);
      dispatch({ type: 'SET_CUSTOM_SCENARIO', payload: null });
      return null;
    }
  };

  const awardBadge = (badgeId) => {
    dispatch({ type: 'AWARD_BADGE', payload: badgeId });
  };

  const resetTwin = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  };

  return (
    <TwinContext.Provider
      value={{
        ...state,
        updateProfile,
        generateTwin,
        fetchAIInsights,
        simulateCustomScenario,
        awardBadge,
        resetTwin,
      }}
    >
      {children}
    </TwinContext.Provider>
  );
}

export function useTwin() {
  const context = useContext(TwinContext);
  if (!context) {
    throw new Error('useTwin must be used within a TwinProvider');
  }
  return context;
}

/**
 * Fallback insights when Gemini API is unavailable
 */
function generateFallbackInsights(results) {
  if (!results) return null;

  const { carbon, ecoScore, earthsNeeded } = results;
  const categories = [
    { name: 'Transportation', value: carbon.transport },
    { name: 'Food', value: carbon.food },
    { name: 'Energy', value: carbon.energy },
    { name: 'Shopping', value: carbon.shopping },
    { name: 'Travel', value: carbon.travel },
  ];

  const sorted = [...categories].sort((a, b) => b.value - a.value);
  const biggest = sorted[0];
  const biggestPercent = Math.round((biggest.value / carbon.total) * 100);

  return {
    carbonAnalysis: {
      totalAnnual: carbon.total,
      biggestSource: biggest.name,
      biggestSourcePercent: biggestPercent,
      breakdown: categories,
    },
    recommendations: [
      {
        title: `Reduce ${biggest.name} Impact`,
        description: `${biggest.name} contributes ${biggestPercent}% of your footprint. Consider greener alternatives.`,
        potentialSaving: Math.round(biggest.value * 0.3),
      },
      {
        title: 'Optimize Energy Usage',
        description: 'Reducing appliance usage by 1 hour daily could save significant emissions annually.',
        potentialSaving: Math.round(carbon.energy * 0.15),
      },
      {
        title: 'Sustainable Diet Choices',
        description: 'Even small dietary shifts towards plant-based meals can reduce your food footprint.',
        potentialSaving: Math.round(carbon.food * 0.2),
      },
    ],
    futureProjections: {
      withChanges: Math.round(carbon.total * 0.65),
      withoutChanges: Math.round(carbon.total * 1.15),
      potentialReduction: Math.round(carbon.total * 0.35),
    },
    climateLegacy: {
      tenYearImpact: carbon.total * 10,
      treesEquivalent: Math.round((carbon.total * 10) / 1000 * 45),
      carsRemoved: Math.round((carbon.total * 10) / 4600),
    },
    futureStory: {
      title: `Year ${new Date().getFullYear() + 10}: A Reflection`,
      body: `The choices you make today shape your environmental legacy. With an eco score of ${ecoScore} and a footprint requiring ${earthsNeeded} Earths, you have ${ecoScore >= 50 ? 'a solid foundation' : 'significant room'} for positive change. By focusing on your ${biggest.name.toLowerCase()} habits, you could transform your impact and inspire others around you.`,
      outcomes: [
        `Potential to reduce carbon by ${Math.round(carbon.total * 0.35)} kg annually`,
        `Equivalent to planting ${Math.round((carbon.total * 0.35) / 1000 * 45)} trees`,
        `Moving from ${earthsNeeded} Earths to ${Math.max(0.5, earthsNeeded * 0.65).toFixed(1)} Earths`,
      ],
    },
    doppelganger: null, // Will be determined by the component
  };
}

export default TwinContext;
