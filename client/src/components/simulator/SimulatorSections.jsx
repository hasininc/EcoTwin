import { PRESET_SCENARIOS, LIFESTYLE_TRANSFORMATIONS, LIFE_EVENTS } from '../../data/constants';
import ScenarioCard from './ScenarioCard';

export function PresetScenarios({ selectedScenario, onSelect }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-2">Quick Actions</h3>
      <p className="text-sm text-slate-400 mb-6">Simple, specific changes to your daily routine.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PRESET_SCENARIOS.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenario?.id === scenario.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function LifestyleMarketplace({ selectedScenario, onSelect }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-2">Lifestyle Transformations</h3>
      <p className="text-sm text-slate-400 mb-6">Explore completely different ways of living.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {LIFESTYLE_TRANSFORMATIONS.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenario?.id === scenario.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function LifeEvents({ selectedScenario, onSelect }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-2">Major Life Events</h3>
      <p className="text-sm text-slate-400 mb-6">Simulate the impact of significant life changes.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {LIFE_EVENTS.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenario?.id === scenario.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
