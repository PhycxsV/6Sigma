import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Approach', path: '/approach' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function MagneticLink({ children, className, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const scrolled = scrollY > 20;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080810]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center group">
              <img src={logo} alt="Six Sigma AI" className="h-28 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <MagneticLink
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </MagneticLink>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-amber-300"
              >
                Discovery Session
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-50 p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#080810]/98 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-4 text-3xl font-extrabold tracking-tight transition-colors ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-blue-600 to-amber-400 bg-clip-text text-transparent'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="shimmer-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-amber-400 text-white text-lg font-bold shadow-xl shadow-blue-500/20"
                >
                  Discovery Session
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
