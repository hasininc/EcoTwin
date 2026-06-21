import { motion } from 'framer-motion';
import { SectionTitle, AnimatedCounter } from '../shared/UIComponents';

const stats = [
  { value: 500, suffix: 'kg+', label: 'Potential Annual Savings' },
  { value: 20, suffix: '+', label: 'Lifestyle Variables' },
  { value: 10, suffix: ' Years', label: 'Future Projection Window' },
  { value: 100, suffix: '%', label: 'Personalized Insights' },
];

export default function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          eyebrow="Impact"
          title="Numbers That Matter"
          description="Real calculations, real impact, real change."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 sm:p-8 text-center group hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-400 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
