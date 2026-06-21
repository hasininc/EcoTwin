import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">EcoTwin</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Create a digital version of your lifestyle and discover the environmental
              future your choices are building. Meet your environmental twin today.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {[
                { to: '/create', label: 'Create Twin' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/simulator', label: 'Future Simulator' },
                { to: '/legacy', label: 'Climate Legacy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400 text-sm">Built with AI</span>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Powered by Gemini</span>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Open Source</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} EcoTwin. Making sustainability personal.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            Made with <Heart size={14} className="text-emerald-500 mx-1" /> for the planet
          </div>
        </div>
      </div>
    </footer>
  );
}
