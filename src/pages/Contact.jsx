import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle, X, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import ParticleBackground from '../components/ParticleBackground';

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'info@sixsigma-ai.com', href: 'mailto:info@sixsigma-ai.com' },
  { icon: Phone, label: 'Phone', value: '+63 917 123 4567', href: 'tel:+639171234567' },
  { icon: MapPin, label: 'Address', value: 'Unit 123, Innovation Hub, Ortigas, Pasig City, PH', href: 'https://maps.google.com/?q=Ortigas+Center+Pasig+City' },
  { icon: ExternalLink, label: 'LinkedIn', value: '@sixsigma-ai', href: 'https://www.linkedin.com/' },
];

function validateForm(data) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const captchaRef = useRef(null);

  useEffect(() => {
    if (showCaptchaModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCaptchaModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const submitForm = useCallback(async (token) => {
    if (!token) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS env vars');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    const trimmed = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: trimmed.name,
          company: trimmed.company || 'Not provided',
          email: trimmed.email,
          phone: trimmed.phone || 'Not provided',
          message: trimmed.message,
          subject: `New Inquiry — ${trimmed.company || trimmed.name}`,
        },
        { publicKey }
      );

      setIsSuccess(true);
      setFieldErrors({});
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } catch (err) {
      console.error('EmailJS error:', err);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!captchaToken) {
      setShowCaptchaModal(true);
      return;
    }

    await submitForm(captchaToken);
  };

  const handleCaptchaVerify = async (token) => {
    setCaptchaToken(token);
    setShowCaptchaModal(false);
    await submitForm(token);
  };

  const inputBase = 'contact-input w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300';
  const inputOk = `${inputBase} border-white/[0.08] focus:ring-blue-500`;
  const inputErr = `${inputBase} border-red-500/50 focus:ring-red-500`;

  const fieldLabel = (text, required) => (
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
      {text}
      {required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
    </label>
  );

  const fieldError = (name) =>
    fieldErrors[name] ? (
      <p className="mt-1.5 text-xs text-red-400" role="alert">
        {fieldErrors[name]}
      </p>
    ) : null;

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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.04] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/[0.05] to-amber-400/[0.04] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6"
          >
            <span className="text-xs font-semibold text-blue-500 tracking-wider uppercase">Contact</span>
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
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  {fieldLabel('Name', true)}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    aria-invalid={!!fieldErrors.name}
                    className={fieldErrors.name ? inputErr : inputOk}
                    placeholder="Your name"
                  />
                  {fieldError('name')}
                </div>
                <div>
                  {fieldLabel('Company', false)}
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className={inputOk}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  {fieldLabel('Email', true)}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.email}
                    className={fieldErrors.email ? inputErr : inputOk}
                    placeholder="you@company.com"
                  />
                  {fieldError('email')}
                </div>
                <div>
                  {fieldLabel('Phone', false)}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={inputOk}
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                {fieldLabel('Message', true)}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  aria-invalid={!!fieldErrors.message}
                  className={`${fieldErrors.message ? inputErr : inputOk} resize-none`}
                  placeholder="Tell us about your process improvement needs..."
                />
                <div className="mt-1.5 flex items-start justify-between gap-2">
                  {fieldError('message')}
                  <p className={`text-xs ml-auto flex-shrink-0 ${formData.message.length < 10 ? 'text-slate-500' : 'text-slate-600'}`}>
                    {formData.message.length} / 10 min
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm flex items-center justify-between"
                  >
                    <span>Something went wrong. Please try again or contact us directly.</span>
                    <button type="button" onClick={() => setIsError(false)} className="ml-3 flex-shrink-0 hover:text-red-300 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-amber-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
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
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/[0.1] to-amber-400/[0.1] border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/40 transition-colors">
                    <Icon className="w-5 h-5 text-blue-500" />
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

      {/* Captcha Modal */}
      <AnimatePresence>
        {showCaptchaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowCaptchaModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative bg-[#10101c]/95 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-10 text-center max-w-md w-full shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowCaptchaModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-2">Security check</h3>
              <p className="text-slate-400 text-sm mb-6">
                Complete the captcha to send your message.
              </p>
              <div className="flex justify-center">
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={handleCaptchaVerify}
                  onExpire={() => setCaptchaToken(null)}
                  ref={captchaRef}
                  theme="dark"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowCaptchaModal(false)}
                className="mt-6 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl px-6 py-2 text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center"
            onClick={() => setIsSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle className="w-14 h-14 text-blue-400 mx-auto mb-5" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                We've received your inquiry and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="border border-blue-500/40 text-blue-400 hover:bg-blue-400/10 rounded-xl px-6 py-2 text-sm font-medium transition-colors duration-200"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
