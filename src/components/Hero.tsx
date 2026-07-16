import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-morph" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-morph"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-morph"
          style={{ animationDelay: '4s' }}
        />
        {/* Orbiting dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin-slow">
            <div className="w-2 h-2 bg-blue-400 rounded-full absolute" style={{ transform: 'translateX(200px)' }} />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute" style={{ transform: 'translateX(-180px) translateY(80px)' }} />
            <div className="w-1 h-1 bg-pink-400 rounded-full absolute" style={{ transform: 'translateX(100px) translateY(-150px)' }} />
          </div>
        </div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/20 rounded-2xl rotate-12 animate-float opacity-30" />
      <div className="absolute top-40 right-20 w-16 h-16 border border-purple-500/20 rounded-full animate-float-delayed opacity-30" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-pink-500/20 rounded-xl -rotate-12 animate-float opacity-20" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-blue-500/10 rounded-full animate-bounce-subtle opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Badge - animated in */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8 transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-wiggle" />
            <span className="relative overflow-hidden">
              Trusted by 50+ Companies Worldwide
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-shimmer" />
            </span>
          </div>

          {/* Main heading with staggered animation */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 transition-all duration-1000 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            We Build Software
            <br />
            <span className="gradient-text-animated">
              That Drives Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            SAAN Solutions transforms your ideas into powerful, scalable software products.
            From MVPs to enterprise solutions — we deliver excellence at every stage.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a
              href="#products"
              className="magnetic-btn group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-1 animate-pulse-glow overflow-hidden"
            >
              {/* Button shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              <span className="relative flex items-center gap-2">
                View Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="magnetic-btn group flex items-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500/50 hover:text-gray-900 hover:bg-gray-900/5 transition-all hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats section removed */}
        </div>
      </div>


    </section>
  );
}
