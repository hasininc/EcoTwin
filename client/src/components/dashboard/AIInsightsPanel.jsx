import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, AlertTriangle, ThumbsUp, ArrowRight, Loader2 } from 'lucide-react';
import { GlassCard } from '../shared/UIComponents';
import { useTwin } from '../../context/TwinContext';

export default function AIInsightsPanel() {
  const { aiInsights, isLoadingAI, fetchAIInsights, results } = useTwin();

  useEffect(() => {
    if (results && !aiInsights && !isLoadingAI) {
      fetchAIInsights();
    }
  }, [results]);

  if (isLoadingAI) {
    return (
      <GlassCard className="animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 size={20} className="text-emerald-400 animate-spin" />
          <h3 className="text-lg font-bold text-white">AI Analysis in Progress...</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-white/[0.05] rounded-lg" />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (!aiInsights) return null;

  const { carbonAnalysis, recommendations, futureProjections, futureStory } = aiInsights;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={20} className="text-emerald-400" />
          <h3 className="text-xl font-bold text-white">AI Insights</h3>
        </div>
      </motion.div>

      {/* Main Insight */}
      {carbonAnalysis && (
        <GlassCard glow>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingDown size={20} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Biggest Emission Source</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {carbonAnalysis.biggestSource} contributes{' '}
                <span className="text-emerald-400 font-semibold">
                  {carbonAnalysis.biggestSourcePercent}%
                </span>{' '}
                of your total footprint ({carbonAnalysis.totalAnnual?.toLocaleString()} kg CO₂/year).
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Personalized Recommendations
          </h4>
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="!p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight size={14} className="text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">{rec.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
                    {rec.potentialSaving && (
                      <p className="text-xs text-emerald-400 font-medium mt-2">
                        Potential saving: {rec.potentialSaving.toLocaleString()} kg CO₂/year
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Future Projection Summary */}
      {futureProjections && (
        <GlassCard>
          <h4 className="text-sm font-semibold text-slate-300 mb-4">Future Outlook</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-red-400">
                {(futureProjections.withoutChanges / 1000).toFixed(1)}t
              </p>
              <p className="text-xs text-slate-500 mt-1">Without Changes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-emerald-400">
                {(futureProjections.withChanges / 1000).toFixed(1)}t
              </p>
              <p className="text-xs text-slate-500 mt-1">With Changes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-teal-400">
                -{(futureProjections.potentialReduction / 1000).toFixed(1)}t
              </p>
              <p className="text-xs text-slate-500 mt-1">Potential Reduction</p>
            </div>
          </div>
        </GlassCard>
      )}
      {/* Future Story Narrative */}
      {futureStory && (
        <GlassCard glow className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-teal-400" />
            <h4 className="text-lg font-bold text-white">{futureStory.title}</h4>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {futureStory.body}
            </p>
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Potential Outcomes
              </h5>
              <ul className="space-y-2">
                {futureStory.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
