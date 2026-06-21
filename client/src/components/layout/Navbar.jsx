import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { useTwin } from '../../context/TwinContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/create', label: 'Create Twin' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/legacy', label: 'Legacy' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { twinGenerated } = useTwin();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const filteredLinks = navLinks.filter((link) => {
    if (['/dashboard', '/simulator', '/legacy'].includes(link.to) && !twinGenerated) {
      return false;
    }
    return true;
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      aria-label="Main navigation"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to="/"
            aria-label="EcoTwin home page"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
              <Leaf size={20} className="text-white" aria-hidden="true" />
            </div>

            <span className="text-xl font-bold text-white tracking-tight">
              EcoTwin
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">

            {filteredLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={
                  location.pathname === link.to ? "page" : undefined
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            ))}


            {!twinGenerated && (
              <Link
                to="/create"
                className="ml-3 px-5 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                Get Started
              </Link>
            )}

          </div>


          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen 
              ? <X size={24} aria-hidden="true" />
              : <Menu size={24} aria-hidden="true" />
            }
          </button>

        </div>
      </div>


      {/* Mobile Menu */}
      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/[0.05] overflow-hidden"
          >

            <div className="px-4 py-4 space-y-1">

              {filteredLinks.map((link) => (

                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </Link>

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
}