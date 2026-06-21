import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { GlassCard } from '../shared/UIComponents';

const milestones = [
  { year: 2026, label: 'Now' },
  { year: 2027, label: '1 Year' },
  { year: 2030, label: '4 Years' },
  { year: 2036, label: '10 Years' },
];

export default function ClimateTimeMachine({ results }) {
  if (!results) return null;

  const { carbon, ecoScore } = results;
  const annualGrowth = 0.02; // 2% without intervention

  const timepoints = milestones.map((m, i) => {
    const yearsFromNow = m.year - 2026;
    const projected = carbon.total * Math.pow(1 + annualGrowth, yearsFromNow);
    const cumulative = yearsFromNow > 0
      ? carbon.total * ((Math.pow(1 + annualGrowth, yearsFromNow) - 1) / annualGrowth)
      : 0;

    return {
      ...m,
      emissions: Math.round(projected),
      cumulative: Math.round(cumulative),
      trees: Math.round((cumulative / 1000) * 45),
    };
  });

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-6">
        <Clock size={20} className="text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Climate Time Machine</h3>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/50 via-teal-500/30 to-orange-500/50" />

        <div className="grid grid-cols-4 gap-2 relative">
          {timepoints.map((point, i) => (
            <motion.div
              key={point.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              {/* Dot */}
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 + 0.1, type: 'spring' }}
                  className={`w-4 h-4 rounded-full border-2 ${
                    i === 0
                      ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-800 border-slate-600'
                  }`}
                />
              </div>

              <p className="text-xs font-bold text-emerald-400">{point.year}</p>
              <p className="text-xs text-slate-500 mb-2">{point.label}</p>

              <div className="bg-white/[0.03] rounded-lg p-2">
                <p className="text-sm font-bold text-white">
                  {(point.emissions / 1000).toFixed(1)}t
                </p>
                <p className="text-[10px] text-slate-500">annual</p>
                {i > 0 && (
                  <>
                    <div className="border-t border-white/[0.05] my-1.5" />
                    <p className="text-xs font-semibold text-slate-300">
                      {(point.cumulative / 1000).toFixed(0)}t
                    </p>
                    <p className="text-[10px] text-slate-500">total</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
