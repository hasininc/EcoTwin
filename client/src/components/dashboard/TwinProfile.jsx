import { motion } from 'framer-motion';
import { User, Zap, Compass, Shield, Leaf, ShoppingBag } from 'lucide-react';
import { GlassCard } from '../shared/UIComponents';
import { TWIN_CHARACTERISTICS, DOPPELGANGER_TYPES } from '../../data/constants';
import { useTwin } from '../../context/TwinContext';

const iconMap = {
  'Energy Consumer': Zap,
  'Conscious Traveler': Compass,
  'Green Commuter': Leaf,
  'Mindful Eater': Leaf,
  'Climate Champion': Shield,
  'Sustainable Shopper': ShoppingBag,
};

export default function TwinProfile({ results }) {
  if (!results) return null;

  const { profile, carbon, ecoScore } = results;

  const { aiInsights } = useTwin();

  // Determine which characteristics apply
  const activeTraits = Object.entries(TWIN_CHARACTERISTICS)
    .filter(([_, trait]) => trait.threshold(profile, ecoScore))
    .map(([key, trait]) => trait);

  // Find doppelgänger match (prefer AI insights, then fallback to constants)
  const doppelganger = aiInsights?.doppelganger || DOPPELGANGER_TYPES.find((d) => d.matchCondition(carbon));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Twin Identity */}
      <GlassCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Environmental Twin</h3>
            <p className="text-sm text-slate-400">Your digital environmental profile</p>
          </div>
        </div>

        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Characteristics
        </h4>

        <div className="flex flex-wrap gap-2">
          {activeTraits.length > 0 ? (
            activeTraits.map((trait) => {
              const Icon = iconMap[trait.label] || Leaf;
              return (
                <motion.span
                  key={trait.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                >
                  <Icon size={12} />
                  {trait.label}
                </motion.span>
              );
            })
          ) : (
            <span className="text-sm text-slate-500">Building your profile...</span>
          )}
        </div>
      </GlassCard>

      {/* Doppelgänger */}
      <GlassCard>
        <h3 className="text-lg font-bold text-white mb-2">
          Environmental Doppelgänger
        </h3>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">
          Your lifestyle resembles
        </p>

        {doppelganger && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 flex items-center justify-center">
                <User size={24} className="text-teal-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{doppelganger.type}</p>
                <p className="text-sm text-slate-400">{doppelganger.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] rounded-xl p-3">
                <p className="text-lg font-bold text-emerald-400">
                  {(carbon.total / 1000).toFixed(1)}t
                </p>
                <p className="text-xs text-slate-500">Annual CO₂</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3">
                <p className="text-lg font-bold text-teal-400">
                  {ecoScore}/100
                </p>
                <p className="text-xs text-slate-500">Eco Score</p>
              </div>
            </div>
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
}
