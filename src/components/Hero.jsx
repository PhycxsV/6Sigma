import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Briefcase, BarChart2, FileText, Cpu, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const floatingIcons = [
  { icon: BarChart2, x: '-120px', y: '-80px', delay: 0 },
  { icon: FileText, x: '130px', y: '-60px', delay: 0.5 },
  { icon: Cpu, x: '-140px', y: '60px', delay: 1.0 },
  { icon: BarChart2, x: '120px', y: '80px', delay: 1.5 },
];

export default function Hero() {
  return (
    <section className="noise-overlay relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-violet-600/[0.03] to-transparent" />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-cyan-500/[0.09]"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '20%', right: '15%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-violet-600/[0.08]"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '25%', left: '10%' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-slate-200 tracking-wide">
            Agentic AI Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-white">Agentic AI for</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Operational Excellence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Process-first AI that redesigns, automates, and scales how your business runs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="relative group">
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/40 to-violet-600/40 blur-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Link
              to="/contact"
              className="shimmer-btn relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110"
            >
              Schedule Discovery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/[0.12] text-slate-300 font-medium text-sm hover:bg-white/[0.05] hover:text-white hover:border-white/[0.2] transition-all duration-300"
          >
            Explore Solutions
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20 flex items-center justify-center"
        >
          <div className="relative">
            {floatingIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 rounded-xl bg-[#10101c]/90 border border-white/[0.08] flex items-center justify-center shadow-lg"
                  style={{ left: `calc(50% + ${item.x})`, top: `calc(50% + ${item.y})`, transform: 'translate(-50%, -50%)' }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="w-5 h-5 text-cyan-400/70" />
                </motion.div>
              );
            })}

            <div className="relative w-20 h-20 rounded-2xl bg-[#10101c] border border-white/[0.1] flex items-center justify-center shadow-2xl shadow-cyan-500/10">
              <Briefcase className="w-9 h-9 text-cyan-400" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
