import { Plane, MapPin, Navigation } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard } from '../shared/UIComponents';

const frequencyOptions = [
  { id: 'rare', label: 'Rarely', description: '< 2 per year' },
  { id: 'occasional', label: 'Occasionally', description: '3-6 per year' },
  { id: 'frequent', label: 'Frequently', description: '7+ per year' },
];

export default function TravelStep() {
  const { profile, updateProfile } = useTwin();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        How do you travel?
      </h2>
      <p className="text-slate-400 mb-8">
        Longer trips and flights have significant environmental impact.
      </p>

      {/* Flights per year */}
      <GlassCard className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Plane size={20} className="text-blue-400" />
          </div>
          <div>
            <span className="text-sm font-medium text-slate-300">Flights per Year</span>
            <p className="text-xs text-slate-500">Round trips by air</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="20"
            value={profile.flightsPerYear}
            onChange={(e) => updateProfile({ flightsPerYear: Number(e.target.value) })}
            className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-emerald-400 font-bold text-lg w-12 text-right">
            {profile.flightsPerYear}
          </span>
        </div>
      </GlassCard>

      {/* Domestic Travel */}
      <GlassCard className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <MapPin size={20} className="text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-slate-300">Domestic Travel Frequency</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {frequencyOptions.map((option) => {
            const isSelected = profile.domesticTravelFrequency === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateProfile({ domesticTravelFrequency: option.id })}
                className={`px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border border-emerald-500/50 text-emerald-400'
                    : 'bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-white/[0.06]'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-xs mt-1 opacity-70">{option.description}</div>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Long Distance */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Navigation size={20} className="text-purple-400" />
          </div>
          <span className="text-sm font-medium text-slate-300">Long-Distance Travel</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {frequencyOptions.map((option) => {
            const isSelected = profile.longDistanceFrequency === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateProfile({ longDistanceFrequency: option.id })}
                className={`px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border border-emerald-500/50 text-emerald-400'
                    : 'bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-white/[0.06]'
                }`}
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
