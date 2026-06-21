import { motion } from 'framer-motion';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';
import { Button } from '../shared/UIComponents';

const loadingMessages = [
  'Analyzing your lifestyle data...',
  'Calculating carbon footprint...',
  'Estimating water usage...',
  'Building your environmental profile...',
  'Generating your digital twin...',
];

export default function GenerateStep({ onNavigate }) {
  const { isGenerating, twinGenerated, generateTwin, results } = useTwin();

  const handleGenerate = () => {
    generateTwin();
  };

  if (twinGenerated && results) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30"
        >
          <Sparkles size={36} className="text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-3">
          Your Twin is Ready!
        </h2>
        <p className="text-slate-400 mb-2">
          Annual Carbon Footprint
        </p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold gradient-text mb-2"
        >
          {(results.carbon.total / 1000).toFixed(1)}
        </motion.p>
        <p className="text-slate-400 mb-8">tonnes CO₂ per year</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-teal-400">{results.ecoScore}</p>
            <p className="text-xs text-slate-500 mt-1">Eco Score</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-400">{results.earthsNeeded}</p>
            <p className="text-xs text-slate-500 mt-1">Earths Needed</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-400">{(results.waterFootprint / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-slate-500 mt-1">Liters Water</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          onClick={() => onNavigate('/dashboard')}
        >
          View Full Dashboard
        </Button>
      </motion.div>
    );
  }

  if (isGenerating) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 mx-auto mb-8"
        />

        <h2 className="text-2xl font-bold text-white mb-6">
          Creating Your Environmental Twin
        </h2>

        <div className="space-y-3 max-w-sm mx-auto">
          {loadingMessages.map((msg, i) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
              className="flex items-center gap-3 text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.5 + 0.3 }}
                className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </motion.div>
              <span className="text-sm text-slate-400">{msg}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8"
      >
        <Sparkles size={40} className="text-emerald-400" />
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        Ready to Generate Your Twin
      </h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        We've collected all your lifestyle data. Click below to create your
        personalized environmental digital twin.
      </p>

      <Button
        variant="primary"
        size="lg"
        icon={Sparkles}
        onClick={handleGenerate}
      >
        Generate My Twin
      </Button>
    </div>
  );
}
