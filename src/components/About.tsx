import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../context/ContentContext';
import { DynamicIcon } from '../utils/iconMap';
import TiltCard from './TiltCard';

export default function About() {
  const leftReveal = useScrollReveal({ threshold: 0.2 });
  const rightReveal = useScrollReveal({ threshold: 0.2 });
  const valuesReveal = useScrollReveal({ threshold: 0.2 });
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#011f4b]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fd7200]/5 rounded-full blur-3xl translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-16 h-16 border border-[#011f4b]/10 rounded-xl rotate-45 animate-float" />
      <div className="absolute bottom-1/4 left-10 w-12 h-12 border border-[#fd7200]/15 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div
            ref={leftReveal.ref}
            className={`reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            <span className="text-[#fd7200] text-sm font-semibold tracking-wider uppercase">
              {about.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-6">
              {about.headingRegular}
              <br />
              <span className="gradient-text-animated">{about.headingGradient}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {about.paragraph1}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {about.paragraph2}
            </p>

            {/* Values grid */}
            <div
              ref={valuesReveal.ref}
              className={`grid grid-cols-2 gap-4 stagger-children ${valuesReveal.isVisible ? 'visible' : ''}`}
            >
              {about.values.map((item) => (
                <TiltCard
                  key={item.id}
                  className="p-4 rounded-xl bg-white/[0.03] border border-gray-900/10 hover-lift border-glow transition-all duration-300 group"
                  intensity={12}
                >
                  <DynamicIcon
                    name={item.iconName}
                    className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                  />
                  <h4 className="text-gray-900 font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div
            ref={rightReveal.ref}
            className={`relative reveal-right ${rightReveal.isVisible ? 'visible' : ''} lg:ml-10 mt-12 lg:mt-0`}
          >
            {/* Background gradient blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#011f4b]/15 via-[#fd7200]/10 to-transparent rounded-full blur-3xl animate-morph -z-10" />

            {/* Main image */}
            <TiltCard className="w-4/5 h-[320px] sm:h-[400px] rounded-3xl overflow-hidden border border-gray-900/10 shadow-2xl shadow-[#011f4b]/15 relative z-10" intensity={5}>
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10" />
              <img
                src={about.primaryImage}
                alt="Team collaboration"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </TiltCard>

            {/* Overlapping secondary image */}
            <TiltCard className="absolute -bottom-12 right-0 sm:-right-4 w-2/3 h-[220px] sm:h-[280px] rounded-3xl overflow-hidden border-[6px] border-white ring-1 ring-slate-200/80 shadow-2xl shadow-[#011f4b]/15 z-20" intensity={10}>
              <img
                src={about.secondaryImage}
                alt="Modern software engineering team workspace"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </TiltCard>

            {/* Decorative elements */}
            <div className="absolute -top-8 right-8 w-24 h-24 bg-[linear-gradient(rgba(1,31,75,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(1,31,75,0.08)_1px,transparent_1px)] bg-[size:8px_8px] rounded-full animate-spin-slow -z-10" />
            <div className="absolute -bottom-8 left-12 w-32 h-32 bg-[#fd7200]/15 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
