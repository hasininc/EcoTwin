import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { GlassCard } from '../shared/UIComponents';

export default function EarthsMeter({ earthsNeeded }) {
  const percentage = Math.min(100, (earthsNeeded / 3) * 100);
  const isOverOne = earthsNeeded > 1;

  return (
    <GlassCard className="text-center">
      <div className="flex items-center gap-2 justify-center mb-6">
        <Globe size={20} className="text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Earths Needed</h3>
      </div>

      <p className="text-sm text-slate-400 mb-6">
        If everyone lived exactly like you, humanity would need:
      </p>

      {/* Earth Visual */}
      <div className="relative mx-auto mb-6">
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: Math.min(3, Math.ceil(earthsNeeded)) }).map((_, i) => {
            const isFull = i + 1 <= Math.floor(earthsNeeded);
            const isPartial = !isFull && i < earthsNeeded;
            const partialPercent = isPartial ? (earthsNeeded - i) * 100 : 0;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ${
                  isFull
                    ? 'bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600'
                    : 'bg-slate-800'
                }`}>
                  {isPartial && (
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 transition-all duration-1000"
                      style={{ height: `${partialPercent}%` }}
                    />
                  )}
                  {/* Globe pattern overlay */}
                  <div className="absolute inset-0 rounded-full">
                    <div className="absolute inset-2 rounded-full border border-white/10" />
                    <div className="absolute w-full h-px bg-white/10 top-1/2" />
                    <div className="absolute h-full w-px bg-white/10 left-1/2" />
                    <div className="absolute top-[25%] left-[20%] w-5 h-3 bg-white/5 rounded-full" />
                    <div className="absolute top-[45%] right-[20%] w-6 h-4 bg-white/5 rounded-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Value */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className={`text-5xl font-bold mb-2 ${isOverOne ? 'text-orange-400' : 'text-emerald-400'}`}>
          {earthsNeeded}
        </p>
        <p className="text-sm text-slate-400">
          {isOverOne
            ? 'Your lifestyle requires more than one Earth'
            : 'Your lifestyle is within sustainable limits!'}
        </p>
      </motion.div>

      {/* Scale Bar */}
      <div className="mt-6 max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Sustainable</span>
          <span>1 Earth</span>
          <span>Excessive</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              earthsNeeded <= 1
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : earthsNeeded <= 2
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
            }`}
          />
        </div>
      </div>
    </GlassCard>
  );
}
