import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../shared/UIComponents';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid" />

      {/* Animated Orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-500/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-deep-blue/20 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-emerald-400 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Powered by AI &middot; Built for the Future
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Meet Your{' '}
              <span className="gradient-text">Environmental</span>{' '}
              Twin
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
              Create a digital version of your lifestyle and discover the environmental
              future your choices are building.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/create">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Create My Twin
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="secondary" size="lg" icon={Play}>
                  Explore Demo
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 text-slate-500 text-sm"
            >
              <span>✦ AI-Powered Analysis</span>
              <span>✦ 10-Year Projections</span>
              <span>✦ Free to Use</span>
            </motion.div>
          </motion.div>

          {/* Earth Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <EarthVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EarthVisualization() {
  return (
    <div className="relative w-[320px] h-[400px] sm:w-[400px] sm:h-[480px] mx-auto">
      {/* Connection Line */}
      <div className="absolute left-1/2 top-[25%] bottom-[25%] w-px bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-emerald-500/50 -translate-x-1/2" />

      {/* Timeline dots */}
      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-emerald-400/60 font-mono">TIMELINE</span>
        <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Current Earth */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 shadow-2xl shadow-emerald-500/30 flex items-center justify-center overflow-hidden">
            {/* Globe pattern */}
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute w-full h-px bg-white/10 top-1/2" />
            <div className="absolute h-full w-px bg-white/10 left-1/2" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
            {/* Continent shapes (abstract) */}
            <div className="absolute top-[20%] left-[25%] w-8 h-6 bg-emerald-300/30 rounded-full rotate-12 blur-sm" />
            <div className="absolute top-[40%] right-[20%] w-10 h-8 bg-emerald-300/20 rounded-full -rotate-6 blur-sm" />
            <div className="absolute bottom-[25%] left-[30%] w-6 h-5 bg-emerald-300/25 rounded-full rotate-45 blur-sm" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              Current Earth
            </span>
          </div>
        </div>
      </motion.div>

      {/* Future Earth */}
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-amber-500/60 via-orange-500/40 to-red-600/30 shadow-2xl shadow-orange-500/20 flex items-center justify-center overflow-hidden opacity-70">
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/3" />
            <div className="absolute w-full h-px bg-white/5 top-1/2" />
            <div className="absolute h-full w-px bg-white/5 left-1/2" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-[20%] left-[25%] w-8 h-6 bg-amber-300/20 rounded-full rotate-12 blur-sm" />
            <div className="absolute top-[40%] right-[20%] w-10 h-8 bg-orange-300/15 rounded-full -rotate-6 blur-sm" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
              Future Earth
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative rings */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-emerald-500/10 animate-spin-slow" />
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-orange-500/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </div>
  );
}
