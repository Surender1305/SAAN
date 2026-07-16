import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'services', 'products', 'about', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1">
          {/* Logo with hover animation */}
          <a href="#home" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="SAAN Solutions Logo" 
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </a>

          {/* Desktop nav with active indicator */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 magnetic-btn ${
                  activeSection === link.href.slice(1)
                    ? 'text-blue-400'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/5'
                }`}
              >
                {link.label}
                {/* Active dot indicator */}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-scale-in" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 p-2 transition-colors"
          >
            <div className={`transition-transform duration-300 ${mobileOpen ? 'rotate-90' : 'rotate-0'}`}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`md:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4 px-4 space-y-1">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/5'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
