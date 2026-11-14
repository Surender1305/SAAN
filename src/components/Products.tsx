import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Layers,
  MonitorSmartphone,
  PackageCheck,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  X,
} from 'lucide-react';
import { Project } from '../data/projects';
import { useContent } from '../context/ContentContext';

type AccentTheme = 'blue' | 'emerald' | 'cyan' | 'orange';

const THEME_STYLES: Record<
  AccentTheme,
  {
    stageBg: string;
    iconBox: string;
    categoryBadge: string;
    primaryBtn: string;
    checkIcon: string;
  }
> = {
  blue: {
    stageBg: 'from-blue-50/90 via-slate-50 to-indigo-50/70',
    iconBox: 'bg-blue-50 text-blue-600 border-blue-200/80',
    categoryBadge: 'bg-blue-50/90 text-blue-700 border-blue-200/70',
    primaryBtn: 'bg-[#011f4b] hover:bg-blue-600',
    checkIcon: 'text-blue-600',
  },
  emerald: {
    stageBg: 'from-emerald-50/85 via-slate-50 to-teal-50/70',
    iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
    categoryBadge: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/70',
    primaryBtn: 'bg-[#011f4b] hover:bg-emerald-600',
    checkIcon: 'text-emerald-600',
  },
  cyan: {
    stageBg: 'from-sky-50/90 via-slate-50 to-cyan-50/75',
    iconBox: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    categoryBadge: 'bg-sky-50 text-[#1A3A6B] border-sky-200/80',
    primaryBtn: 'bg-[#011f4b] hover:bg-[#2453A0]',
    checkIcon: 'text-[#2453A0]',
  },
  orange: {
    stageBg: 'from-orange-50/85 via-slate-50 to-amber-50/70',
    iconBox: 'bg-orange-50 text-[#fd7200] border-orange-200/80',
    categoryBadge: 'bg-orange-50 text-[#e06500] border-orange-200/80',
    primaryBtn: 'bg-[#011f4b] hover:bg-[#fd7200]',
    checkIcon: 'text-[#fd7200]',
  },
};

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);

  const { content } = useContent();
  const { productsSection, projects } = content;
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];
  const activeFilter = categories.includes(filter) ? filter : 'all';

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const resolveTheme = (project: Project) => {
    if (project.accentTheme && THEME_STYLES[project.accentTheme]) {
      return THEME_STYLES[project.accentTheme];
    }
    const cat = project.category.toLowerCase();
    if (cat.includes('device')) return THEME_STYLES.blue;
    if (cat.includes('safety')) return THEME_STYLES.emerald;
    if (cat.includes('asset')) return THEME_STYLES.cyan;
    return THEME_STYLES.orange;
  };

  const renderProductIcon = (project: Project, className = 'w-6 h-6') => {
    const key = (project.iconName || '').toLowerCase();
    const cat = project.category.toLowerCase();
    if (key === 'smartphone' || cat.includes('device')) return <Smartphone className={className} />;
    if (key === 'shieldcheck' || cat.includes('safety')) return <ShieldCheck className={className} />;
    if (key === 'packagecheck' || cat.includes('asset')) return <PackageCheck className={className} />;
    return <Layers className={className} />;
  };

  const statusMeta = (status: string) => {
    const map: Record<string, { label: string; dot: string; badge: string }> = {
      completed: {
        label: 'Enterprise Ready',
        dot: 'bg-emerald-500',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      },
      'in-progress': {
        label: 'In Rollout',
        dot: 'bg-amber-500',
        badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      },
      mvp: {
        label: 'Early Access',
        dot: 'bg-purple-500',
        badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      },
    };
    return map[status] || map.completed;
  };

  const closeModal = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setSelectedProject(null);
      setAnimatingOut(false);
    }, 250);
  };

  const handleRequestDemo = () => {
    closeModal();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 270);
  };

  return (
    <section id="products" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-y border-slate-200/60">
      {/* Subtle Ambient Accent */}
      <div className="absolute top-0 right-1/4 w-[480px] h-[320px] bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[420px] h-[320px] bg-[#fd7200]/[0.035] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#011f4b] text-xs font-bold tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fd7200]" />
            {productsSection.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#011f4b] mt-4 mb-4 tracking-tight">
            {productsSection.headingRegular}{' '}
            <span className="bg-gradient-to-r from-[#fd7200] to-[#e06500] bg-clip-text text-transparent">
              {productsSection.headingGradient}
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
            {productsSection.subtitle}
          </p>
        </div>

        {/* Clean Enterprise Category Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-1.5 bg-white p-1.5 rounded-2xl sm:rounded-full border border-slate-200/90 shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-xl sm:rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-[#011f4b] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#011f4b] hover:bg-slate-100/80'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Single-Row-Per-Product Enterprise Showcase */}
        <div className="space-y-8">
          {filtered.map((project) => {
            const theme = resolveTheme(project);
            const st = statusMeta(project.status);
            const tagline = project.tagline || `${project.category} Platform`;
            const targetAudience = project.targetAudience || 'Enterprise & Multi-Site Operations';
            const platforms = project.platforms || 'Web Dashboard · Mobile Ready';

            return (
              <article
                key={project.id}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_36px_-16px_rgba(1,31,75,0.12)] hover:shadow-[0_24px_48px_-16px_rgba(1,31,75,0.18)] hover:border-slate-300 transition-all duration-300 overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 items-stretch">
                  {/* Clear Business & Product Information (Left on Desktop) */}
                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${theme.iconBox}`}
                          >
                            {renderProductIcon(project, 'w-5 h-5')}
                          </div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${theme.categoryBadge}`}
                          >
                            {project.category}
                          </span>
                        </div>

                        {project.status !== 'completed' && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${st.badge}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#011f4b] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-base font-semibold text-slate-700 mt-1">{tagline}</p>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                        {project.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mt-6">
                        <div className="rounded-xl bg-slate-50 border border-slate-200/75 px-3.5 py-3">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Built For</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            {targetAudience}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 border border-slate-200/75 px-3.5 py-3">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            <MonitorSmartphone className="w-3.5 h-3.5 text-slate-400" />
                            <span>Platforms</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            {platforms}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#011f4b] transition-colors cursor-pointer"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                        <span>Product Details</span>
                      </button>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-xs transition-all duration-200 ${theme.primaryBtn}`}
                        >
                          <span>Explore Product</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-xs transition-all duration-200 cursor-pointer ${theme.primaryBtn}`}
                        >
                          <span>View Overview</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Large Product Preview Image (Right on Desktop) */}
                  <div
                    className={`lg:col-span-6 p-5 sm:p-7 bg-gradient-to-br ${theme.stageBg} border-b lg:border-b-0 lg:border-l border-slate-200/80 flex items-center justify-center order-1 lg:order-2`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View full details for ${project.title}`}
                      className="w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block text-left"
                    >
                      <div className="aspect-[16/10] w-full bg-white overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} platform preview`}
                          className="w-full h-full object-cover object-top transform-gpu group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 reveal visible">
            <ChevronDown className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-bounce-subtle" />
            <p className="text-slate-500 text-lg">No products found in this category.</p>
          </div>
        )}

        {/* Enterprise Consultation / Suite Demo Strip */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#fd7200] mb-1">
              Multi-Site Rollouts &amp; Guided Walkthroughs
            </p>
            <h3 className="text-xl font-bold text-[#011f4b]">
              Not sure which platform fits your workflow best?
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Speak directly with our product specialists to schedule a live walkthrough, review
              licensing plans, or deploy multiple platforms under one organization.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white font-semibold text-sm shadow-sm hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all shrink-0"
          >
            <span>Request a Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Overview & Preview Modal */}
      {selectedProject &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-all duration-300 ${
              animatingOut ? 'bg-slate-950/0 backdrop-blur-0' : 'bg-slate-950/70 backdrop-blur-sm'
            }`}
            onClick={closeModal}
          >
            <div
              className={`bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${
                animatingOut
                  ? 'opacity-0 scale-95 translate-y-4'
                  : 'opacity-100 scale-100 translate-y-0 animate-scale-in'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Product Preview Screenshot Banner */}
              <div
                className={`bg-gradient-to-br ${resolveTheme(selectedProject).stageBg} px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 relative`}
              >
                <div className="aspect-[16/10] w-full max-w-[380px] mx-auto rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-md">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} platform preview`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-sm rounded-full text-white hover:bg-slate-900 transition-all hover:rotate-90 duration-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3.5">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${resolveTheme(selectedProject).iconBox}`}
                    >
                      {renderProductIcon(selectedProject, 'w-5 h-5')}
                    </div>
                    <div>
                      <span className="inline-block text-xs font-bold text-[#fd7200] uppercase tracking-wider">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-2xl font-bold text-[#011f4b]">{selectedProject.title}</h3>
                      <p className="text-slate-600 text-sm font-medium mt-0.5">
                        {selectedProject.tagline || `${selectedProject.category} Platform`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusMeta(selectedProject.status).badge}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusMeta(selectedProject.status).dot}`}
                    />
                    {statusMeta(selectedProject.status).label}
                  </span>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                  {selectedProject.longDescription}
                </p>

                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-[#011f4b] uppercase tracking-wider mb-2.5">
                      Core Workflows &amp; Capabilities
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {selectedProject.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/75"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${resolveTheme(selectedProject).checkIcon}`}
                          />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Teams & Platforms Metadata Grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ideal For</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedProject.targetAudience || 'Enterprise & Multi-Site Operations'}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      <MonitorSmartphone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Supported Platforms</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedProject.platforms || 'Web Portal · Mobile App'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#011f4b] hover:bg-[#0a3678] text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
                      >
                        <span>Visit Product Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleRequestDemo}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer"
                    >
                      <span>Book a Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
