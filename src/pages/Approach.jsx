import { motion } from 'framer-motion';
import { ScanSearch, PenLine, GitBranch, Code2, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { number: 1, icon: ScanSearch, title: 'Discover', description: 'Map the current state.' },
  { number: 2, icon: PenLine, title: 'Redesign', description: 'Improve before automating.' },
  { number: 3, icon: GitBranch, title: 'Design', description: 'Agents + people + systems.' },
  { number: 4, icon: Code2, title: 'Build', description: 'Develop, integrate, deploy.' },
  { number: 5, icon: BarChart3, title: 'Stabilize', description: 'Optimize continuously.' },
];

const engagements = [
  { title: 'AI Opportunity Assessment', description: 'Find where AI pays off.' },
  { title: 'Pilot / Proof of Concept', description: 'Validate value, fast.' },
  { title: 'Full Implementation', description: 'Build, integrate, deploy.' },
  { title: 'Managed Enhancement', description: 'Continuous improvement.' },
];

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Approach() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/[0.04] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/[0.05] to-violet-600/[0.05] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6"
          >
            <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">Methodology</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Diagnose. Redesign. Scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            A process-first method to make AI deliver real value.
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative">
          <div className="hidden lg:block relative mb-8">
            <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-px overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-cyan-400 to-violet-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            <div className="flex justify-between px-[10%]">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 shadow-lg shadow-cyan-500/40 relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                />
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-4"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  whileHover={{ borderColor: '#06b6d4' }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.1] transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/[0.12] to-violet-600/[0.12] border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  <span className="text-xs text-white/30 font-medium">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Human-Led. AI-Assisted. Workflow-Controlled.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">
              Practical, secure AI with human oversight and clear accountability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engagement Models.</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {engagements.map((engagement) => (
            <motion.div
              key={engagement.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 text-center cursor-default"
            >
              <h3 className="text-lg font-extrabold text-white mb-2">{engagement.title}</h3>
              <p className="text-sm text-slate-400">{engagement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="shimmer-btn group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:brightness-110"
          >
            Start with a pilot
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
