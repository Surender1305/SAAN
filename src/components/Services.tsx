import { Globe, Smartphone, Cloud, Brain, Shield, Gauge } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, fast, and secure.',
    color: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications using React Native and Flutter. Native performance with a single codebase.',
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud architecture design, migration, and DevOps. AWS, Azure, and GCP certified team ensuring 99.9% uptime.',
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/20',
  },
  {
    icon: Brain,
    title: 'AI & ML Solutions',
    description: 'Intelligent automation, predictive analytics, NLP, and computer vision solutions tailored to your business needs.',
    color: 'from-orange-500 to-red-500',
    shadowColor: 'shadow-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security audits, penetration testing, and compliance solutions. Protect your digital assets.',
    color: 'from-red-500 to-rose-500',
    shadowColor: 'shadow-red-500/20',
  },
  {
    icon: Gauge,
    title: 'MVP Development',
    description: 'Rapid prototyping and MVP development to validate your ideas fast. Go from concept to market in weeks, not months.',
    color: 'from-indigo-500 to-violet-500',
    shadowColor: 'shadow-indigo-500/20',
  },
];

export default function Services() {
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute -right-20 top-1/2 w-40 h-40 border border-blue-500/10 rounded-full animate-spin-slow" />
      <div className="absolute -left-10 bottom-1/4 w-24 h-24 border border-purple-500/10 rounded-2xl rotate-45 animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with reveal animation */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase inline-block">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Our <span className="gradient-text-animated">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            End-to-end software solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        {/* Service cards with stagger and tilt */}
        <div
          ref={gridReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {services.map((service) => (
            <TiltCard
              key={service.title}
              className={`group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 hover-lift border-glow`}
              intensity={8}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${service.shadowColor}`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
              {/* Animated underline */}
              <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
