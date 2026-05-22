import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink, Send } from 'lucide-react';
import logo from '../assets/logo.png';

const footerLinks = {
  explore: [
    { name: 'Solutions', path: '/solutions' },
    { name: 'Approach', path: '/approach' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  connect: [
    { name: 'info@sixsigma-ai.com', href: 'mailto:info@sixsigma-ai.com', icon: Mail },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: ExternalLink },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#060610] dot-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Six Sigma AI" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
              Smarter processes. Engineered by intelligence.
            </p>

            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Stay updated
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="shimmer-btn px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white text-sm font-semibold hover:from-blue-500 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-blue-500/15"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            <Link
              to="/contact"
              className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-amber-400 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-amber-300"
            >
              Schedule a Discovery Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 Six Sigma Applied Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="text-xs text-slate-600">&middot;</span>
            <span className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="text-xs text-slate-600">&middot;</span>
            <span className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
