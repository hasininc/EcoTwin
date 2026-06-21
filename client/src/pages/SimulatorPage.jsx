import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTwin } from '../context/TwinContext';
import PageWrapper from '../components/layout/PageWrapper';
import { PresetScenarios, LifestyleMarketplace, LifeEvents } from '../components/simulator/SimulatorSections';
import AskEcoTwin from '../components/simulator/AskEcoTwin';
import VisualComparison from '../components/simulator/VisualComparison';
import FutureTimeline from '../components/simulator/FutureTimeline';
import BadgeUnlock from '../components/simulator/BadgeUnlock';
import { applyScenario, calculateTimelineSavings } from '../utils/carbonEngine';
import { BADGE_TYPES } from '../data/constants';

export default function SimulatorPage() {
  const { twinGenerated, profile, results, badges, awardBadge, customScenarioResult } = useTwin();
  const navigate = useNavigate();
  
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const [scenariosRunCount, setScenariosRunCount] = useState(0);

  useEffect(() => {
    if (!twinGenerated) {
      navigate('/create');
    }
  }, [twinGenerated, navigate]);

  // Handle Scenario Selection (Presets, Marketplace, Events)
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    const futureResult = applyScenario(profile, scenario);
    setComparisonResult(futureResult);
    
    // Check for badges
    checkBadges(scenario.id, futureResult);
  };

  // Handle AI Custom Scenario Completion
  const handleAiSimulationComplete = (aiResult) => {
    setSelectedScenario({ id: 'custom-ai', title: aiResult.scenarioName });
    
    // Construct a pseudo-result object from the AI delta
    const futureResult = {
      ...results,
      carbon: {
        ...results.carbon,
        total: results.carbon.total - aiResult.carbonChange
      },
      waterFootprint: results.waterFootprint - aiResult.waterChange,
      wasteFootprint: results.wasteFootprint - aiResult.wasteChange,
      ecoScore: Math.min(100, results.ecoScore + aiResult.ecoScoreChange),
      earthsNeeded: Math.max(0.1, results.earthsNeeded - aiResult.earthsNeededChange)
    };
    
    setComparisonResult(futureResult);
    checkBadges('custom-ai', futureResult);
  };

  // Gamification Logic
  const checkBadges = (scenarioId, futureResult) => {
    const newCount = scenariosRunCount + 1;
    setScenariosRunCount(newCount);
    
    const savingsPercent = Math.round(((results.carbon.total - futureResult.carbon.total) / results.carbon.total) * 100);

    BADGE_TYPES.forEach(badge => {
      if (badges.includes(badge.id)) return; // Already have it

      let unlocked = false;
      if (badge.id === 'climate-explorer') unlocked = badge.condition(newCount);
      else if (badge.id === 'future-guardian') unlocked = badge.condition(savingsPercent);
      else unlocked = badge.condition(scenarioId);

      if (unlocked) {
        awardBadge(badge.id);
        setNewlyUnlocked(badge);
      }
    });
  };

  const savings = comparisonResult && results
    ? calculateTimelineSavings(results, comparisonResult)
    : null;

  if (!twinGenerated) return null;

  return (
    <PageWrapper>
      <div className="bg-radial-glow min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Future Simulator
            </h1>
            <p className="text-slate-400 text-lg">
              Test "what if" scenarios and see how changes today shape your environmental future.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Column: Inputs */}
            <div className="xl:col-span-7 space-y-2">
              <AskEcoTwin onSimulateComplete={handleAiSimulationComplete} />
              
              <div className="glass p-6 rounded-2xl border-white/[0.05]">
                <LifestyleMarketplace selectedScenario={selectedScenario} onSelect={handleSelectScenario} />
                <LifeEvents selectedScenario={selectedScenario} onSelect={handleSelectScenario} />
                <PresetScenarios selectedScenario={selectedScenario} onSelect={handleSelectScenario} />
              </div>
            </div>

            {/* Right Column: Visualizer */}
            <div className="xl:col-span-5">
              <div className="sticky top-8 space-y-8">
                {comparisonResult ? (
                  <>
                    <VisualComparison 
                      currentResults={results} 
                      futureResults={comparisonResult} 
                    />
                    <FutureTimeline 
                      savings={savings} 
                      customAiResult={selectedScenario?.id === 'custom-ai' ? customScenarioResult : null} 
                    />
                  </>
                ) : (
                  <div className="glass h-96 rounded-2xl flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-white/10 p-8 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <p className="text-lg text-slate-300 mb-2">Awaiting Scenario</p>
                    <p className="text-sm">Select a scenario from the left or ask EcoTwin to visualize your environmental timeline.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BadgeUnlock badges={badges} newlyUnlocked={newlyUnlocked} />
    </PageWrapper>
  );
}
