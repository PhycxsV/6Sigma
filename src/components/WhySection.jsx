import { motion } from 'framer-motion';
import { Layers, Bot, Wrench, Target } from 'lucide-react';

const reasons = [
  {
    icon: Layers,
    title: 'Process-First',
    description: 'Start with the workflow.',
  },
  {
    icon: Bot,
    title: 'Agentic AI',
    description: 'Agents that learn & adapt.',
  },
  {
    icon: Wrench,
    title: 'Custom-Built',
    description: 'Engineered for you.',
  },
  {
    icon: Target,
    title: 'Impact Focus',
    description: 'Measured in outcomes.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.01] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Six Sigma AI.
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute top-[56px] left-[12.5%] right-[12.5%] h-px hidden lg:block"
            style={{ background: 'linear-gradient(90deg, #2563EB, #F59E0B)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10"
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 text-center cursor-default"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/[0.04] to-blue-600/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/[0.1] to-amber-400/[0.1] border border-amber-500/20 flex items-center justify-center mb-4 mx-auto group-hover:border-amber-500/40 transition-colors duration-500">
                      <Icon className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2">{reason.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
