import { useState } from 'react';
import { Send, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../context/ContentContext';

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;
  const supportEmail = contact.supportEmail || 'support@reliantsoftwaresolutions.com';
  const endpoint =
    contact.formEndpoint || `https://formsubmit.co/ajax/${supportEmail}`;

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const formReveal = useScrollReveal({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== 'false') {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 4500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#011f4b]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#fd7200]/5 rounded-full blur-3xl" />
      <div className="absolute top-10 left-10 w-20 h-20 border border-[#011f4b]/15 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-10 right-10 w-14 h-14 border border-[#fd7200]/15 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="text-[#fd7200] text-sm font-semibold tracking-wider uppercase">{contact.eyebrow}</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            {contact.headingRegular} <span className="gradient-text-animated">{contact.headingGradient}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {contact.subtitle}
          </p>
          <div className="mt-6">
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#fd7200]/50 text-[#011f4b] hover:text-[#fd7200] text-sm font-semibold shadow-xs transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-[#fd7200] shrink-0" />
              <span>{supportEmail}</span>
            </a>
          </div>
        </div>

        <div
          ref={formReveal.ref}
          className={`max-w-4xl mx-auto reveal-scale ${formReveal.isVisible ? 'visible' : ''}`}
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-2xl shadow-gray-200/50 border border-gray-200/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl pointer-events-none" />
            <form
              action={`https://formsubmit.co/${supportEmail}`}
              method="POST"
              onSubmit={handleSubmit}
              className="relative space-y-8"
            >
              <input type="hidden" name="_subject" value="New Inquiry from Reliant Software Solutions Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>
                    Something went wrong while sending your message. Please try again or email us directly at{' '}
                    <a href={`mailto:${supportEmail}`} className="font-semibold underline">
                      {supportEmail}
                    </a>
                    .
                  </span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#011f4b] transition-colors">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#fd7200] focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#011f4b] transition-colors">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#fd7200] focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#011f4b] transition-colors">Project Type</label>
                <div className="relative">
                  <select name="project_type" className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[#fd7200] focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
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
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#011f4b] transition-colors">Project Details</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your goals, timeline, and budget..."
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#fd7200] focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                onClick={handleButtonClick}
                className={`relative w-full sm:w-auto sm:px-12 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 transition-all duration-300 overflow-hidden magnetic-btn mx-auto ${
                  status === 'success'
                    ? 'bg-green-500 text-white scale-[0.98] shadow-green-500/20'
                    : 'bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 disabled:opacity-70'
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
                {status === 'success' ? (
                  <>
                    <CheckCircle className="w-6 h-6 animate-scale-in" />
                    Message Sent Successfully!
                  </>
                ) : status === 'submitting' ? (
                  <>
                    <Send className="w-6 h-6 animate-pulse" />
                    Sending...
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
