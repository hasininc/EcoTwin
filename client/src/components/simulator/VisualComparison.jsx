import { motion } from 'framer-motion';
import { ArrowLeftRight, TrendingDown, Shield } from 'lucide-react';
import { GlassCard } from '../shared/UIComponents';

export default function VisualComparison({ currentResults, futureResults }) {
  if (!currentResults || !futureResults) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Current State */}
        <GlassCard className="text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Current Twin
          </p>
          <p className="text-3xl font-bold text-white mb-1">
            {(currentResults.carbon.total / 1000).toFixed(1)}t
          </p>
          <p className="text-xs text-slate-500">CO₂/year</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Eco Score</span>
              <span className="text-white font-medium">{currentResults.ecoScore}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Earths Needed</span>
              <span className="text-white font-medium">{currentResults.earthsNeeded}</span>
            </div>
          </div>
        </GlassCard>

        {/* Transition Arrow */}
        <div className="flex justify-center py-4 md:py-0">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <ArrowLeftRight size={24} className="text-emerald-400" />
          </motion.div>
        </div>

        {/* Future State */}
        <GlassCard className="text-center bg-emerald-500/5 border-emerald-500/30" glow>
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3 flex items-center justify-center gap-1">
            <Shield size={14} /> Future Twin
          </p>
          <p className="text-3xl font-bold text-emerald-400 mb-1">
            {(futureResults.carbon.total / 1000).toFixed(1)}t
          </p>
          <p className="text-xs text-emerald-500/70">CO₂/year</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Eco Score</span>
              <span className="text-emerald-400 font-medium">{futureResults.ecoScore}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Earths Needed</span>
              <span className="text-emerald-400 font-medium">{futureResults.earthsNeeded}</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Reduction Highlights */}
      {currentResults.carbon.total > futureResults.carbon.total && (
        <GlassCard glow>
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={18} className="text-emerald-400" />
            <h4 className="font-semibold text-white">Projected Impact of Scenario</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-emerald-400">
                {Math.round(((currentResults.carbon.total - futureResults.carbon.total) / currentResults.carbon.total) * 100)}%
              </p>
              <p className="text-xs text-slate-500 mt-1">Carbon Reduction</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-teal-400">
                {Math.round(currentResults.carbon.total - futureResults.carbon.total)} kg
              </p>
              <p className="text-xs text-slate-500 mt-1">Annual CO₂ Saved</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-cyan-400">
                +{futureResults.ecoScore - currentResults.ecoScore}
              </p>
              <p className="text-xs text-slate-500 mt-1">Eco Score Boost</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold text-purple-400">
                {(currentResults.earthsNeeded - futureResults.earthsNeeded).toFixed(1)}
              </p>
              <p className="text-xs text-slate-500 mt-1">Earths Conserved</p>
            </div>
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}
