import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const leftReveal = useScrollReveal({ threshold: 0.2 });
  const formReveal = useScrollReveal({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      await fetch('https://formspree.io/f/maqrnkqw', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute top-10 left-10 w-20 h-20 border border-blue-500/10 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-10 right-10 w-14 h-14 border border-purple-500/10 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Let's Build <span className="gradient-text-animated">Together</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info cards */}
          <div
            ref={leftReveal.ref}
            className={`lg:col-span-2 space-y-6 stagger-children ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@saan.dev', href: 'mailto:hello@saan.dev', color: 'text-blue-400', bg: 'bg-blue-500/10 group-hover:bg-blue-500/20' },
              { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', href: 'tel:+15551234567', color: 'text-purple-400', bg: 'bg-purple-500/10 group-hover:bg-purple-500/20' },
              { icon: MapPin, label: 'Visit Us', value: '123 Innovation Drive, San Francisco, CA 94107', href: '#', color: 'text-pink-400', bg: 'bg-pink-500/10 group-hover:bg-pink-500/20' },
            ].map((item) => (
              <TiltCard key={item.label} intensity={10}>
                <a
                  href={item.href}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all group hover-lift border-glow"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">{item.label}</h4>
                    <p className="text-gray-400 text-sm">{item.value}</p>
                  </div>
                </a>
              </TiltCard>
            ))}

            <TiltCard intensity={8}>
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover-lift transition-all duration-300">
                <h4 className="text-white font-semibold mb-2">🕐 Business Hours</h4>
                <p className="text-gray-400 text-sm">Monday - Friday: 9AM - 6PM PST</p>
                <p className="text-gray-400 text-sm">Weekend: By appointment only</p>
              </div>
            </TiltCard>
          </div>

          {/* Form */}
          <div
            ref={formReveal.ref}
            className={`lg:col-span-3 reveal-right ${formReveal.isVisible ? 'visible' : ''}`}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5 hover:border-white/15 transition-all duration-500">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Project Type</label>
                <select name="project_type" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/[0.08] transition-all duration-300 appearance-none">
                  <option value="" className="bg-gray-900">Select a service</option>
                  <option value="web" className="bg-gray-900">Web Development</option>
                  <option value="mobile" className="bg-gray-900">Mobile App</option>
                  <option value="cloud" className="bg-gray-900">Cloud Solutions</option>
                  <option value="ai" className="bg-gray-900">AI & ML</option>
                  <option value="mvp" className="bg-gray-900">MVP Development</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                onClick={handleButtonClick}
                className={`relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden magnetic-btn ${
                  submitted
                    ? 'bg-green-600 text-white scale-[0.98]'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1'
                }`}
              >
                {/* Ripple effect */}
                {ripple && (
                  <span
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: '10px',
                      height: '10px',
                      transform: 'translate(-50%, -50%)',
                      animation: 'ripple 0.6s ease-out forwards',
                    }}
                  />
                )}
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-scale-in" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
