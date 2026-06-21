import { Shirt, Monitor, Package, Sparkles } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard } from '../shared/UIComponents';

const categories = [
  { key: 'clothingPurchases', label: 'Clothing', icon: Shirt, color: 'text-pink-400', max: 10 },
  { key: 'electronicsPurchases', label: 'Electronics', icon: Monitor, color: 'text-blue-400', max: 5 },
  { key: 'miscPurchases', label: 'Miscellaneous', icon: Package, color: 'text-purple-400', max: 15 },
  { key: 'fastFashionFrequency', label: 'Fast Fashion Items', icon: Sparkles, color: 'text-orange-400', max: 10 },
];

export default function ShoppingStep() {
  const { profile, updateProfile } = useTwin();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Your Shopping Habits
      </h2>
      <p className="text-slate-400 mb-8">
        How many items do you typically purchase each month?
      </p>

      <div className="space-y-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const value = profile[category.key] || 0;

          return (
            <GlassCard key={category.key} className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Icon size={20} className={category.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{category.label}</span>
                    <span className="text-emerald-400 font-bold text-sm">{value} / month</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={category.max}
                    value={value}
                    onChange={(e) => updateProfile({ [category.key]: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
