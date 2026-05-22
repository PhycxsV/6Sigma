import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { prefix: '−', value: 32, suffix: '%', label: 'Lower Cost' },
  { prefix: '−', value: 45, suffix: '%', label: 'Faster Turnaround' },
  { prefix: '+', value: 28, suffix: '%', label: 'Better Quality' },
  { prefix: '+', value: 37, suffix: '%', label: 'Higher Productivity' },
  { prefix: '', value: 100, suffix: '%', label: 'Greater Control' },
  { prefix: '', value: null, suffix: '', label: 'Scalable Operations', display: '∞' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.value || 0, 2000);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-center"
    >
      <div className="text-3xl sm:text-4xl font-extrabold mb-2">
        {stat.display ? (
          <span className="bg-gradient-to-r from-blue-600 to-amber-400 bg-clip-text text-transparent">
            {stat.display}
          </span>
        ) : (
          <span className="bg-gradient-to-r from-blue-600 to-amber-400 bg-clip-text text-transparent">
            {stat.prefix}{count}{stat.suffix}
          </span>
        )}
      </div>
      <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.01] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Measurable impact.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
