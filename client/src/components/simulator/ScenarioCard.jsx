import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ScenarioCard({ scenario, isSelected, onSelect }) {
  const Icon = Icons[scenario.icon] || Icons.Leaf;

  // Determine colors based on selection and preset color
  const colorMap = {
    emerald: 'text-emerald-400 border-emerald-500/50 shadow-emerald-500/20 bg-emerald-500/15',
    teal: 'text-teal-400 border-teal-500/50 shadow-teal-500/20 bg-teal-500/15',
    blue: 'text-blue-400 border-blue-500/50 shadow-blue-500/20 bg-blue-500/15',
    cyan: 'text-cyan-400 border-cyan-500/50 shadow-cyan-500/20 bg-cyan-500/15',
    purple: 'text-purple-400 border-purple-500/50 shadow-purple-500/20 bg-purple-500/15',
    orange: 'text-orange-400 border-orange-500/50 shadow-orange-500/20 bg-orange-500/15',
    green: 'text-green-400 border-green-500/50 shadow-green-500/20 bg-green-500/15',
    lime: 'text-lime-400 border-lime-500/50 shadow-lime-500/20 bg-lime-500/15',
    indigo: 'text-indigo-400 border-indigo-500/50 shadow-indigo-500/20 bg-indigo-500/15',
    slate: 'text-slate-400 border-slate-500/50 shadow-slate-500/20 bg-slate-500/15',
    stone: 'text-stone-400 border-stone-500/50 shadow-stone-500/20 bg-stone-500/15',
    yellow: 'text-yellow-400 border-yellow-500/50 shadow-yellow-500/20 bg-yellow-500/15',
    rose: 'text-rose-400 border-rose-500/50 shadow-rose-500/20 bg-rose-500/15',
    sky: 'text-sky-400 border-sky-500/50 shadow-sky-500/20 bg-sky-500/15',
    amber: 'text-amber-400 border-amber-500/50 shadow-amber-500/20 bg-amber-500/15',
    violet: 'text-violet-400 border-violet-500/50 shadow-violet-500/20 bg-violet-500/15',
    red: 'text-red-400 border-red-500/50 shadow-red-500/20 bg-red-500/15',
    pink: 'text-pink-400 border-pink-500/50 shadow-pink-500/20 bg-pink-500/15',
  };

  const activeStyles = colorMap[scenario.color] || colorMap.emerald;
  const inactiveStyles = 'text-slate-400 border-white/[0.05] shadow-none glass hover:bg-white/[0.08]';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(scenario)}
      className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border-2 ${
        isSelected ? activeStyles : inactiveStyles
      }`}
    >
      <div className={`mb-3 flex items-center justify-center w-10 h-10 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-white/5'}`}>
        <Icon size={20} className={isSelected ? 'text-current' : 'text-slate-400'} />
      </div>
      <h4 className={`text-sm font-semibold mt-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
        {scenario.title}
      </h4>
      <p className={`text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
        {scenario.description}
      </p>
    </motion.button>
  );
}
