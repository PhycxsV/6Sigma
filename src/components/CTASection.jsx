import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/[0.03] via-amber-400/[0.02] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/[0.06] to-amber-400/[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight"
        >
          Start with one process.
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-amber-400 bg-clip-text text-transparent">
            Scale what works.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative group inline-block">
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/40 to-amber-400/40 blur-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Link
              to="/contact"
              className="shimmer-btn relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white font-semibold transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-amber-300"
            >
              Schedule a Discovery Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
