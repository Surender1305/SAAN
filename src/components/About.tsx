import { Target, Lightbulb, Rocket, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

export default function About() {
  const leftReveal = useScrollReveal({ threshold: 0.2 });
  const rightReveal = useScrollReveal({ threshold: 0.2 });
  const valuesReveal = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-16 h-16 border border-blue-500/10 rounded-xl rotate-45 animate-float" />
      <div className="absolute bottom-1/4 left-10 w-12 h-12 border border-purple-500/10 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div
            ref={leftReveal.ref}
            className={`reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">About Us</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
              Building the Future,
              <br />
              <span className="gradient-text-animated">One Line at a Time</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              SAAN Solutions is a forward-thinking software development company founded in 2019.
              We specialize in turning ambitious ideas into reality through cutting-edge technology
              and exceptional engineering talent.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Our team of 40+ skilled developers, designers, and strategists has successfully
              delivered 50+ projects across healthcare, fintech, e-commerce, education, and IoT
              sectors. We pride ourselves on building long-term partnerships with our clients.
            </p>

            {/* Values grid */}
            <div
              ref={valuesReveal.ref}
              className={`grid grid-cols-2 gap-4 stagger-children ${valuesReveal.isVisible ? 'visible' : ''}`}
            >
              {[
                { icon: Target, title: 'Mission-Driven', desc: 'Focused on delivering measurable business impact', color: 'text-blue-400' },
                { icon: Lightbulb, title: 'Innovation First', desc: 'Leveraging latest technologies and best practices', color: 'text-yellow-400' },
                { icon: Rocket, title: 'Fast Delivery', desc: 'Agile methodology for rapid, iterative development', color: 'text-purple-400' },
                { icon: Heart, title: 'Client-Centric', desc: 'Your success is our primary metric', color: 'text-pink-400' },
              ].map((item) => (
                <TiltCard
                  key={item.title}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover-lift border-glow transition-all duration-300 group"
                  intensity={12}
                >
                  <item.icon className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl animate-morph -z-10" />
            
            {/* Main image */}
            <TiltCard className="w-4/5 h-[320px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 relative z-10" intensity={5}>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </TiltCard>

            {/* Overlapping secondary image */}
            <TiltCard className="absolute -bottom-12 right-0 sm:-right-4 w-2/3 h-[220px] sm:h-[280px] rounded-3xl overflow-hidden border-[6px] border-gray-950 shadow-2xl z-20" intensity={10}>
              <div className="absolute inset-0 bg-blue-500/10 z-10 mix-blend-overlay" />
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                alt="Modern workspace"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </TiltCard>

            {/* Decorative elements */}
            <div className="absolute -top-8 right-8 w-24 h-24 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:8px_8px] rounded-full animate-spin-slow -z-10" />
            <div className="absolute -bottom-8 left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
