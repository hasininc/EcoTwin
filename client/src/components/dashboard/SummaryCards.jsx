import { motion } from 'framer-motion';
import { Cloud, Droplets, Trash2, Award, Globe } from 'lucide-react';
import { AnimatedCounter } from '../shared/UIComponents';

const cardData = [
  {
    key: 'carbon',
    label: 'Annual Carbon',
    icon: Cloud,
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    getValue: (r) => (r.carbon.total / 1000).toFixed(1),
    unit: 'tonnes CO₂',
  },
  {
    key: 'water',
    label: 'Water Footprint',
    icon: Droplets,
    color: 'from-cyan-500 to-blue-500',
    textColor: 'text-cyan-400',
    getValue: (r) => (r.waterFootprint / 1000000).toFixed(1),
    unit: 'M liters',
  },
  {
    key: 'waste',
    label: 'Waste Generated',
    icon: Trash2,
    color: 'from-orange-500 to-red-500',
    textColor: 'text-orange-400',
    getValue: (r) => r.wasteFootprint,
    unit: 'kg / year',
    isInteger: true,
  },
  {
    key: 'eco',
    label: 'Eco Score',
    icon: Award,
    color: 'from-teal-500 to-emerald-500',
    textColor: 'text-teal-400',
    getValue: (r) => r.ecoScore,
    unit: '/ 100',
    isInteger: true,
  },
  {
    key: 'earths',
    label: 'Earths Needed',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-400',
    getValue: (r) => r.earthsNeeded,
    unit: 'planets',
  },
];

export default function SummaryCards({ results }) {
  if (!results) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cardData.map((card, i) => {
        const Icon = card.icon;
        const value = card.getValue(results);

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-5 group hover:bg-white/[0.08] transition-all duration-300 hover:shadow-lg"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className={`text-2xl lg:text-3xl font-bold ${card.textColor} mb-1`}>
              {card.isInteger ? (
                <AnimatedCounter value={Number(value)} />
              ) : (
                value
              )}
            </p>
            <p className="text-xs text-slate-500">{card.unit}</p>
            <p className="text-sm text-slate-400 mt-1 font-medium">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
