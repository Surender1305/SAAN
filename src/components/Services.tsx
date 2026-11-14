import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';
import { useContent } from '../context/ContentContext';
import { DynamicIcon } from '../utils/iconMap';

export default function Services() {
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });
  const { content } = useContent();
  const { servicesSection } = content;

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(1,31,75,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(1,31,75,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#011f4b]/5 rounded-full blur-3xl" />
      <div className="absolute -right-20 top-1/2 w-40 h-40 border border-[#011f4b]/15 rounded-full animate-spin-slow" />
      <div className="absolute -left-10 bottom-1/4 w-24 h-24 border border-[#fd7200]/15 rounded-2xl rotate-45 animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with reveal animation */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="text-[#fd7200] text-sm font-semibold tracking-wider uppercase inline-block">
            {servicesSection.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            {servicesSection.headingRegular}{' '}
            <span className="gradient-text-animated">{servicesSection.headingGradient}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {servicesSection.subtitle}
          </p>
        </div>

        {/* Service cards with stagger and tilt */}
        <div
          ref={gridReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {servicesSection.items.map((service) => (
            <TiltCard
              key={service.id}
              className="group p-8 rounded-2xl bg-white/[0.03] border border-gray-900/10 hover:border-[#fd7200]/30 hover:bg-white/[0.06] transition-all duration-300 hover-lift border-glow"
              intensity={8}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${service.shadowColor}`}
              >
                <DynamicIcon name={service.iconName} className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fd7200] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              {/* Animated underline */}
              <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-[#fd7200]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
