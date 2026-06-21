import { Car, Bike, Bus, Train, Footprints } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard } from '../shared/UIComponents';

const transportOptions = [
  { id: 'car', label: 'Car', icon: Car, color: 'text-red-400' },
  { id: 'scooter', label: 'Scooter', icon: Bike, color: 'text-orange-400' },
  { id: 'bus', label: 'Bus', icon: Bus, color: 'text-yellow-400' },
  { id: 'train', label: 'Train', icon: Train, color: 'text-emerald-400' },
  { id: 'bicycle', label: 'Bicycle', icon: Bike, color: 'text-green-400' },
  { id: 'walking', label: 'Walking', icon: Footprints, color: 'text-teal-400' },
];

export default function TransportStep() {
  const { profile, updateProfile } = useTwin();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        How do you get around?
      </h2>
      <p className="text-slate-400 mb-8">
        Select your primary mode of transportation.
      </p>

      {/* Transport Type Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
        {transportOptions.map((option) => {
          const isSelected = profile.transportType === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => updateProfile({ transportType: option.id })}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 cursor-pointer
                ${isSelected
                  ? 'bg-emerald-500/15 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : 'glass hover:bg-white/[0.08]'}
              `}
            >
              <Icon size={24} className={isSelected ? 'text-emerald-400' : option.color} />
              <span className={`text-xs font-medium ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Distance Slider */}
      <GlassCard className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Daily Distance (km)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={profile.dailyDistance}
            onChange={(e) => updateProfile({ dailyDistance: Number(e.target.value) })}
            className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-emerald-400 font-bold text-lg w-16 text-right">
            {profile.dailyDistance} km
          </span>
        </div>
      </GlassCard>

      {/* Frequency Slider */}
      <GlassCard>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Days per Week
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="7"
            value={profile.usageFrequency}
            onChange={(e) => updateProfile({ usageFrequency: Number(e.target.value) })}
            className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-emerald-400 font-bold text-lg w-16 text-right">
            {profile.usageFrequency} days
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
