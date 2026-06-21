import { motion } from 'framer-motion';
import { UserPlus, BarChart3, Compass, TreePine } from 'lucide-react';
import { SectionTitle } from '../shared/UIComponents';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Build Your Twin',
    description: 'Answer a few questions about your daily lifestyle — transport, energy, food, and more.',
  },
  {
    icon: BarChart3,
    number: '02',
    title: 'Analyze Your Lifestyle',
    description: 'Our engine calculates your carbon, water, and waste footprint with precision.',
  },
  {
    icon: Compass,
    number: '03',
    title: 'Explore Future Scenarios',
    description: 'Test "what if" scenarios and see how changes today shape your future impact.',
  },
  {
    icon: TreePine,
    number: '04',
    title: 'Create a Better Climate Legacy',
    description: 'Get AI-powered insights and build a sustainable path forward.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="How It Works"
          title="Four Steps to Your Environmental Future"
          description="Building your digital twin takes just minutes. Understanding your impact lasts a lifetime."
        />

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center relative z-10">
                    <step.icon size={28} className="text-emerald-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-500/30 z-20">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
