import { ArrowUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const footerReveal = useScrollReveal({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl" />

      <div
        ref={footerReveal.ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal ${footerReveal.isVisible ? 'visible' : ''}`}
      >
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4 group">
              <img 
                src="/logo.png" 
                alt="SAAN Solutions Logo" 
                className="h-[100px] w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Transforming ideas into powerful software solutions. We build scalable,
              secure, and innovative digital products for businesses worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Services', 'Products', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-600 hover:text-blue-400 hover:translate-x-1 text-sm transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & ML', 'MVP Development'].map((s) => (
                <span
                  key={s}
                  className="block text-gray-600 text-sm hover:text-gray-700 transition-colors duration-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SAAN Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
                {item}
              </a>
            ))}
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gray-900/5 border border-gray-900/10 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 magnetic-btn"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
