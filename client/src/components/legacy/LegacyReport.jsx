import { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Cloud, Droplets, Car, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { GlassCard, Button } from '../shared/UIComponents';

export default function LegacyReport() {
  const { results, aiInsights } = useTwin();

  if (!results) return null;

  const { carbon, ecoScore, earthsNeeded } = results;
  const tenYearCarbon = carbon.total * 10;
  const treesEquiv = Math.round((tenYearCarbon / 1000) * 45);
  const carsRemoved = Math.round(tenYearCarbon / 4600);
  const kmNotDriven = Math.round(tenYearCarbon / 0.21);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Your Climate Legacy
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Your choices over the next decade will shape your environmental legacy.
          Here's what your current path looks like.
        </p>
      </motion.div>

      {/* 10-Year Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard glow className="text-center py-10">
          <p className="text-sm text-emerald-400 font-semibold uppercase tracking-wider mb-4">
            10-Year Impact Summary
          </p>
          <p className="text-5xl sm:text-6xl font-bold text-white mb-2">
            {(tenYearCarbon / 1000).toFixed(1)}
          </p>
          <p className="text-lg text-slate-400 mb-8">tonnes of CO₂ over the next decade</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                <TreePine size={24} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-400">{treesEquiv.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Trees to offset</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                <Car size={24} className="text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-blue-400">{carsRemoved.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Cars for a year</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                <Cloud size={24} className="text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-400">{(kmNotDriven / 1000).toFixed(0)}K</p>
              <p className="text-xs text-slate-500">km equivalent</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mx-auto mb-2">
                <Droplets size={24} className="text-teal-400" />
              </div>
              <p className="text-2xl font-bold text-teal-400">{ecoScore}/100</p>
              <p className="text-xs text-slate-500">Current Eco Score</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Narrative */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-emerald-400" />
          <h3 className="font-semibold text-white">Your Environmental Story</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Your choices over the next decade could generate approximately{' '}
          <span className="text-emerald-400 font-semibold">{(tenYearCarbon / 1000).toFixed(1)} tonnes</span>{' '}
          of carbon emissions. This is equivalent to{' '}
          <span className="text-green-400 font-semibold">{treesEquiv.toLocaleString()} trees</span>{' '}
          needed to absorb that carbon, or removing{' '}
          <span className="text-blue-400 font-semibold">{carsRemoved} cars</span> from the road for a year.
        </p>
        <p className="text-slate-400 mt-3 leading-relaxed">
          {ecoScore >= 60
            ? "You're already making conscious choices that benefit the planet. By fine-tuning a few habits, you could become a true climate champion."
            : "There's significant room for improvement in your environmental impact. Even small changes in your daily habits can compound into major reductions over time."}
        </p>
      </GlassCard>

      {/* AI Future Story */}
      <FutureStory aiInsights={aiInsights} ecoScore={ecoScore} carbon={carbon} />
    </div>
  );
}

function FutureStory({ aiInsights, ecoScore, carbon }) {
  const [showStory, setShowStory] = useState(false);

  const story = aiInsights?.futureStory;

  return (
    <div>
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-emerald-400" />
          <h3 className="font-semibold text-white">Future Reflection</h3>
        </div>

        {!showStory ? (
          <div className="text-center py-6">
            <p className="text-slate-400 mb-4">
              What will your environmental story look like in 10 years?
            </p>
            <Button
              variant="primary"
              icon={Sparkles}
              onClick={() => setShowStory(true)}
            >
              Generate My Future Story
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {story ? (
              <>
                <h4 className="text-lg font-semibold text-emerald-400 mb-3">{story.title}</h4>
                <p className="text-slate-300 leading-relaxed mb-4">{story.body}</p>

                {story.outcomes && story.outcomes.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-slate-400">Positive Outcomes:</h5>
                    {story.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✦</span>
                        <span className="text-sm text-slate-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div>
                <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                  Year {new Date().getFullYear() + 10}: A Reflection
                </h4>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The choices you made starting in {new Date().getFullYear()} transformed your environmental footprint.
                  {ecoScore >= 60
                    ? ' By maintaining your conscious habits and making incremental improvements, you reduced your carbon impact by over 30% and inspired those around you to follow suit.'
                    : ` By reducing your dependence on high-emission activities and consuming more consciously, you prevented ${Math.round(carbon.total * 3.5 / 1000)} tonnes of emissions and built sustainable habits that became second nature.`}
                </p>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-slate-400">Positive Outcomes:</h5>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✦</span>
                    <span className="text-sm text-slate-300">Reduced annual emissions by up to {Math.round(carbon.total * 0.35).toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✦</span>
                    <span className="text-sm text-slate-300">Equivalent to planting {Math.round((carbon.total * 0.35 / 1000) * 45)} trees</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✦</span>
                    <span className="text-sm text-slate-300">Inspired sustainable habits in your community</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
}
