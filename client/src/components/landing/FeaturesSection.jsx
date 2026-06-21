import { motion } from 'framer-motion';
import { Users, Sliders, Globe2, Sparkles } from 'lucide-react';
import { SectionTitle, GlassCard } from '../shared/UIComponents';

const features = [
  {
    icon: Users,
    title: 'Digital Twin Creation',
    description: 'Create a digital model of your lifestyle and see your environmental profile come to life.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Sliders,
    title: 'Future Simulator',
    description: 'Explore what happens when your habits change. Test scenarios and see the difference.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Globe2,
    title: 'Climate Legacy',
    description: 'See your long-term environmental impact across 1, 5, and 10-year horizons.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Sparkles,
    title: 'AI Sustainability Guide',
    description: 'Receive intelligent, personalized recommendations powered by Gemini AI.',
    gradient: 'from-blue-500 to-indigo-500',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          eyebrow="Features"
          title="Everything You Need to Understand Your Impact"
          description="From creating your digital twin to exploring future scenarios — EcoTwin gives you the complete picture."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <GlassCard className="h-full group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
