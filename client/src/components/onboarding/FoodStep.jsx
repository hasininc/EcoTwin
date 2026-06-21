import { Leaf, Drumstick, Beef, UtensilsCrossed, Trash2 } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard } from '../shared/UIComponents';

const dietOptions = [
  { id: 'vegetarian', label: 'Vegetarian', description: 'Plant-based diet', icon: Leaf, color: 'text-green-400', bgColor: 'bg-green-500/10 border-green-500/30' },
  { id: 'mixed', label: 'Mixed Diet', description: 'Balanced meat & veggies', icon: UtensilsCrossed, color: 'text-amber-400', bgColor: 'bg-amber-500/10 border-amber-500/30' },
  { id: 'heavy-meat', label: 'Heavy Meat', description: 'Frequent meat consumption', icon: Beef, color: 'text-red-400', bgColor: 'bg-red-500/10 border-red-500/30' },
];

const wasteOptions = [
  { id: 'low', label: 'Low', description: 'Minimal food waste' },
  { id: 'moderate', label: 'Moderate', description: 'Some food waste' },
  { id: 'high', label: 'High', description: 'Significant waste' },
];

export default function FoodStep() {
  const { profile, updateProfile } = useTwin();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        What do you eat?
      </h2>
      <p className="text-slate-400 mb-8">
        Your diet has a major impact on your environmental footprint.
      </p>

      {/* Diet Type */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {dietOptions.map((option) => {
          const isSelected = profile.dietType === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => updateProfile({ dietType: option.id })}
              className={`
                flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-200 cursor-pointer border-2
                ${isSelected
                  ? `${option.bgColor} shadow-lg`
                  : 'glass border-transparent hover:bg-white/[0.08]'}
              `}
            >
              <Icon size={28} className={isSelected ? option.color : 'text-slate-400'} />
              <div className="text-center">
                <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {option.label}
                </div>
                <div className="text-xs text-slate-500 mt-1">{option.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Online Meals */}
      <GlassCard className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Meals Ordered Online (per week)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="21"
            value={profile.onlineMealsPerWeek}
            onChange={(e) => updateProfile({ onlineMealsPerWeek: Number(e.target.value) })}
            className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-emerald-400 font-bold text-lg w-12 text-right">
            {profile.onlineMealsPerWeek}
          </span>
        </div>
      </GlassCard>

      {/* Food Waste */}
      <GlassCard>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Food Waste Frequency
        </label>
        <div className="grid grid-cols-3 gap-3">
          {wasteOptions.map((option) => {
            const isSelected = profile.foodWaste === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateProfile({ foodWaste: option.id })}
                className={`
                  px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer
                  ${isSelected
                    ? 'bg-emerald-500/15 border border-emerald-500/50 text-emerald-400 font-medium'
                    : 'bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-white/[0.06]'}
                `}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-xs mt-1 opacity-70">{option.description}</div>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
