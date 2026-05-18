import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Send } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'info@sixsigma-ai.com', href: 'mailto:info@sixsigma-ai.com' },
  { icon: Phone, label: 'Phone', value: '+63 917 123 4567', href: 'tel:+639171234567' },
  { icon: MapPin, label: 'Address', value: 'Unit 123, Innovation Hub, Ortigas, Pasig City, PH', href: 'https://maps.google.com/?q=Ortigas+Center+Pasig+City' },
  { icon: ExternalLink, label: 'LinkedIn', value: '@sixsigma-ai', href: 'https://www.linkedin.com/' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputClasses = 'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300';

  return (
    <div className="relative pt-24 pb-16">
      <ParticleBackground
        fixed
        particleCount={15}
        opacity={0.10}
        speed={0.25}
        particleSize={{ min: 1.5, max: 3 }}
      />
      <ParticleBackground
        fixed
        particleCount={30}
        opacity={0.15}
        speed={0.4}
        particleSize={{ min: 0.3, max: 1.2 }}
      />
      <div className="relative z-10">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/[0.05] to-violet-600/[0.04] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6"
          >
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Contact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Let's talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Schedule a discovery session. We'll map a high-impact pilot.
          </motion.p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your process improvement needs..."
                />
              </div>

              <button
                type="submit"
                className="shimmer-btn group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110"
              >
                Send message
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/[0.1] to-violet-600/[0.1] border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      {detail.label}
                    </div>
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {detail.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
}
