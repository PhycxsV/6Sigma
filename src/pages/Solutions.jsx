import { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollWindowToTop } from '../utils/scrollToTop';
import { FileText, Workflow, Brain, BarChart3, Settings, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const solutions = [
  {
    icon: FileText,
    title: 'Document Processing',
    description: 'Extract, classify, and validate documents at scale. Our AI agents handle invoices, contracts, and forms with near-zero error rates.',
    features: ['Intelligent extraction', 'Auto-validation', 'Format-agnostic'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Agentic workflows that observe, decide, and act across your systems in real time. No rigid scripts — adaptive agents.',
    features: ['Real-time triggers', 'Cross-system orchestration', 'Self-healing flows'],
  },
  {
    icon: Brain,
    title: 'Knowledge Agents',
    description: 'Surface answers from your company knowledge instantly. AI agents that index, reason, and respond with context.',
    features: ['Contextual retrieval', 'Multi-source synthesis', 'Natural language Q&A'],
  },
  {
    icon: BarChart3,
    title: 'Operations Tower',
    description: 'Live visibility into every process. Dashboards, alerts, and anomaly detection powered by agentic monitoring.',
    features: ['Real-time dashboards', 'Anomaly detection', 'Predictive alerts'],
  },
  {
    icon: Settings,
    title: 'Custom Systems',
    description: 'Purpose-built AI systems designed around your unique workflows, not generic templates.',
    features: ['Bespoke architecture', 'Domain-tuned models', 'Full integration'],
  },
];

const selectorStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const selectorItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function ActiveCard({ solution }) {
  const Icon = solution.icon;
  return (
    <motion.div
      key={solution.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ enter: { duration: 0.3, ease: 'easeOut' }, exit: { duration: 0.2 } }}
      className="h-full p-8 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.1]"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/[0.12] to-amber-400/[0.12] border border-blue-500/20 flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-blue-500" />
      </div>

      <h3 className="text-2xl font-bold text-white">{solution.title}</h3>

      <p className="text-white/70 text-sm leading-relaxed mt-3">{solution.description}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {solution.features.map((feature) => (
          <span
            key={feature}
            className="px-3 py-1 text-xs text-white/60 bg-white/[0.1] border border-white/[0.1] rounded-full"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-blue-500/30 to-amber-400/30 my-5" />

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/40 text-blue-500 text-sm font-medium hover:bg-blue-500/10 transition-colors duration-300"
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="lg:hidden space-y-3">
      {solutions.map((solution, index) => {
        const Icon = solution.icon;
        const isOpen = openIndex === index;

        return (
          <div key={solution.title}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 ${
                isOpen
                  ? 'bg-white/[0.1] border-blue-500/40 text-white border-l-2 border-l-blue-500'
                  : 'bg-white/[0.05] border-white/[0.1] text-white/50 hover:bg-white/[0.08] hover:text-white/80'
              }`}
            >
              <span className="font-semibold text-sm">{solution.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 mt-2 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.1]">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/[0.12] to-amber-400/[0.12] border border-blue-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{solution.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {solution.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs text-white/60 bg-white/[0.1] border border-white/[0.1] rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="h-px bg-gradient-to-r from-blue-500/30 to-amber-400/30 my-4" />
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-blue-500 text-sm font-medium"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSolution = solutions[activeIndex];

  useLayoutEffect(() => {
    scrollWindowToTop();
    return () => scrollWindowToTop();
  }, []);

  return (
    <div className="relative pt-24 pb-16">
      <ParticleBackground
        fixed
        particleCount={30}
        opacity={0.25}
        speed={0.4}
        tint="#2563EB"
        particleSize={{ min: 1.5, max: 3 }}
      />
      <ParticleBackground
        fixed
        particleCount={60}
        opacity={0.35}
        speed={0.6}
        tint="#2563EB"
        particleSize={{ min: 0.3, max: 1.2 }}
      />
      <div className="relative z-10">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.04] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/[0.06] to-amber-400/[0.04] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6"
          >
            <span className="text-xs font-semibold text-blue-500 tracking-wider uppercase">Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Agentic AI, applied.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Purpose-built AI agents for every layer of your operations.
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Desktop: two-column tabbed layout */}
        <div className="hidden lg:grid lg:grid-cols-[35%_65%] gap-6 items-start">
          <motion.div
            variants={selectorStagger}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {solutions.map((solution, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={solution.title}
                  variants={selectorItem}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.1] border border-blue-500/40 text-white border-l-2 border-l-blue-500'
                      : 'bg-white/[0.05] border border-white/[0.1] text-white/50 hover:bg-white/[0.08] hover:text-white/80'
                  }`}
                >
                  <span className="font-semibold text-sm text-left">{solution.title}</span>
                  <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              <ActiveCard solution={activeSolution} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion stack */}
        <MobileAccordion />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/contact"
            className="shimmer-btn group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 hover:from-blue-500 hover:to-amber-300"
          >
            Schedule Discovery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>
      </div>
    </div>
  );
}
