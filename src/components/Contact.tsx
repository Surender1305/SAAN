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
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
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
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Let's Build <span className="gradient-text-animated">Together</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back within 24 hours.
          </p>
        </div>

        <div
          ref={formReveal.ref}
          className={`max-w-4xl mx-auto reveal-scale ${formReveal.isVisible ? 'visible' : ''}`}
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-2xl shadow-gray-200/50 border border-gray-200/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl pointer-events-none" />
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">Project Type</label>
                <div className="relative">
                  <select name="project_type" className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" className="bg-white">Select a service...</option>
                    <option value="web" className="bg-white">Web Development</option>
                    <option value="mobile" className="bg-white">Mobile App</option>
                    <option value="cloud" className="bg-white">Cloud Solutions</option>
                    <option value="ai" className="bg-white">AI & ML</option>
                    <option value="mvp" className="bg-white">MVP Development</option>
                    <option value="other" className="bg-white">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">Project Details</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your goals, timeline, and budget..."
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                onClick={handleButtonClick}
                className={`relative w-full sm:w-auto sm:px-12 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all duration-300 overflow-hidden magnetic-btn mx-auto ${
                  submitted
                    ? 'bg-green-500 text-white scale-[0.98] shadow-green-500/20'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1'
                }`}
              >
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
                    <CheckCircle className="w-6 h-6 animate-scale-in" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
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
