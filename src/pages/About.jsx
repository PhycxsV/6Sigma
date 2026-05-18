import { motion } from 'framer-motion';
import { Layers, Bot, Wrench, Target, Mail, Phone, MapPin, ArrowRight, Factory, Truck, Headphones, Heart, GraduationCap, Zap, Landmark, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: Layers, title: 'Process-First', description: 'Workflow before tooling.' },
  { icon: Bot, title: 'Agentic AI', description: 'Agents that act under controls.' },
  { icon: Wrench, title: 'Custom-Built', description: 'Engineered to fit.' },
  { icon: Target, title: 'Impact Focus', description: 'Measured in outcomes.' },
];

const industries = [
  { name: 'Manufacturing', icon: Factory },
  { name: 'Logistics', icon: Truck },
  { name: 'BPO', icon: Headphones },
  { name: 'Healthcare', icon: Heart },
  { name: 'Education', icon: GraduationCap },
  { name: 'Utilities', icon: Zap },
  { name: 'Finance', icon: Landmark },
  { name: 'More', icon: MoreHorizontal },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@sixsigma-ai.com', href: 'mailto:info@sixsigma-ai.com' },
  { icon: Phone, label: 'Phone', value: '+63 917 123 4567', href: 'tel:+639171234567' },
  { icon: MapPin, label: 'Address', value: 'Unit 123, Innovation Hub, Ortigas Center, Pasig City, PH', href: 'https://maps.google.com/?q=Ortigas+Center+Pasig+City' },
];

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function About() {
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
            <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">About</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Process-first. AI-engineered.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            We combine Lean Six Sigma discipline with modern AI to deliver measurable improvements in cost, speed, and quality.
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 text-center cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/[0.1] to-violet-600/[0.1] border border-violet-500/20 flex items-center justify-center mb-4 mx-auto group-hover:border-violet-500/40 transition-colors">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Let's build intelligent operations together.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">
              Start with one process. Prove value. Scale what works.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{info.label}</div>
                      <div className="text-sm text-slate-300">{info.value}</div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <div className="text-center">
            <Link
              to="/contact"
              className="shimmer-btn group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:brightness-110"
            >
              Schedule Discovery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Industries we serve.</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300 text-center cursor-default"
              >
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors mx-auto mb-3" />
                <span className="text-sm font-medium text-slate-300">{industry.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
