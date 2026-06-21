import { AirVent, Fan, Laptop, Tv, Plug } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard } from '../shared/UIComponents';

const appliances = [
  { key: 'acHours', label: 'Air Conditioning', icon: AirVent, max: 24, color: 'text-blue-400' },
  { key: 'fanHours', label: 'Fan', icon: Fan, max: 24, color: 'text-cyan-400' },
  { key: 'laptopHours', label: 'Laptop / PC', icon: Laptop, max: 16, color: 'text-purple-400' },
  { key: 'tvHours', label: 'Television', icon: Tv, max: 16, color: 'text-pink-400' },
  { key: 'otherHours', label: 'Other Appliances', icon: Plug, max: 12, color: 'text-orange-400' },
];

export default function EnergyStep() {
  const { profile, updateProfile } = useTwin();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Your Home Energy Usage
      </h2>
      <p className="text-slate-400 mb-8">
        How many hours per day do you use these appliances?
      </p>

      <div className="space-y-4">
        {appliances.map((appliance) => {
          const Icon = appliance.icon;
          const value = profile[appliance.key] || 0;

          return (
            <GlassCard key={appliance.key} className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Icon size={20} className={appliance.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{appliance.label}</span>
                    <span className="text-emerald-400 font-bold text-sm">{value}h / day</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={appliance.max}
                    value={value}
                    onChange={(e) => updateProfile({ [appliance.key]: Number(e.target.value) })}
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
