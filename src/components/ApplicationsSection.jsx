import { motion } from 'framer-motion';
import { FileText, Workflow, Brain, BarChart3, Settings } from 'lucide-react';

const applications = [
  {
    icon: FileText,
    title: 'Document Processing',
    description: 'Extract & validate at speed.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Agents that act in real time.',
  },
  {
    icon: Brain,
    title: 'Knowledge Agents',
    description: 'Surface answers instantly.',
  },
  {
    icon: BarChart3,
    title: 'Operations Tower',
    description: 'Live visibility & alerts.',
  },
  {
    icon: Settings,
    title: 'Custom Systems',
    description: 'Built for your workflow.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function ApplicationsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/[0.01] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Where we apply agentic AI.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-[minmax(180px,auto)]"
        >
          {applications.map((app, index) => {
            const Icon = app.icon;
            const isLarge = index === 0 || index === 2;
            return (
              <motion.div
                key={app.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`group relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] hover:border-blue-500/30 transition-all duration-500 cursor-default overflow-hidden ${
                  isLarge
                    ? 'lg:col-span-3 lg:row-span-1'
                    : index === 1
                      ? 'lg:col-span-3'
                      : 'lg:col-span-3'
                }`}
              >
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/[0.08] via-amber-400/[0.04] to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="absolute top-4 right-4 text-xs font-mono text-slate-600 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/[0.1] to-amber-400/[0.1] border border-blue-500/20 flex items-center justify-center mb-4 group-hover:border-blue-500/40 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-2">{app.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{app.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
