import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { GlassCard, Button } from '../shared/UIComponents';
import { useTwin } from '../../context/TwinContext';

const EXAMPLES = [
  "What if I move closer to college and cycle every day?",
  "What if I stop ordering food and cook at home?",
  "What if I switch to renewable energy?",
  "What if I become vegetarian next year?",
  "What if I buy an electric vehicle?",
];

export default function AskEcoTwin({ onSimulateComplete }) {
  const { simulateCustomScenario, isSimulating } = useTwin();
  const [text, setText] = useState('');

  const handleSimulate = async () => {
    if (!text.trim() || isSimulating) return;
    
    const result = await simulateCustomScenario(text);
    if (result && onSimulateComplete) {
      onSimulateComplete(result);
    }
  };

  return (
    <GlassCard glow className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 mb-10 border-emerald-500/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Ask EcoTwin</h3>
          <p className="text-sm text-emerald-100/70">
            Describe any lifestyle change and see its environmental future.
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. What if I travel internationally twice a year but become a strict vegan?"
          className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 resize-none transition-all"
        />

        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example, i) => (
            <button
              key={i}
              onClick={() => setText(example)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={handleSimulate} 
            disabled={!text.trim() || isSimulating}
            className="w-full sm:w-auto"
          >
            {isSimulating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Consulting AI...
              </>
            ) : (
              <>
                Generate Scenario <ArrowRight size={18} />
              </>
            )}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
