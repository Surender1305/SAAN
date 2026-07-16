import { useState } from 'react';
import { ExternalLink, ChevronDown, X } from 'lucide-react';
import { defaultProjects, Project } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);

  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.05 });

  const projects = defaultProjects;
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      mvp: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[status] || colors.completed;
  };

  const closeModal = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setSelectedProject(null);
      setAnimatingOut(false);
    }, 300);
  };

  return (
    <section id="products" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-blue-500/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-purple-500/10 rounded-2xl rotate-12 animate-float" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Our Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Our <span className="gradient-text-animated">Products</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Explore our diverse range of projects — from MVPs to full-scale enterprise solutions.
          </p>
        </div>

        {/* Filters with animation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize magnetic-btn ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-gray-900/5 text-gray-600 hover:bg-gray-900/10 hover:text-gray-900 border border-gray-900/10 hover:border-blue-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {filtered.map((project) => (
            <TiltCard
              key={project.id}
              onClick={() => project.liveUrl ? window.open(project.liveUrl, '_blank') : setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-white/[0.03] border border-gray-900/10 overflow-hidden hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300 hover-lift border-glow"
              intensity={6}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusBadge(project.status)}`}>
                    {project.status === 'mvp' ? 'MVP' : project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-gray-900/10 backdrop-blur-sm text-gray-900 text-xs border border-gray-900/20">
                    {project.category}
                  </span>
                </div>
                {/* View overlay icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-300">
                    <ExternalLink className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-900/5 text-gray-700 text-xs rounded-md border border-gray-900/10 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-900/5 text-gray-500 text-xs rounded-md border border-gray-900/10">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 reveal visible">
            <ChevronDown className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-bounce-subtle" />
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal with animation */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            animatingOut ? 'bg-black/0 backdrop-blur-0' : 'bg-black/70 backdrop-blur-sm'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-gray-50 border border-gray-300 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/10 transition-all duration-300 ${
              animatingOut
                ? 'opacity-0 scale-95 translate-y-4'
                : 'opacity-100 scale-100 translate-y-0 animate-scale-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedProject.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {selectedProject.clientName} · {selectedProject.year}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge(selectedProject.status)}`}>
                  {selectedProject.status === 'mvp' ? 'MVP' : selectedProject.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{selectedProject.longDescription}</p>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm rounded-lg border border-blue-500/20 animate-scale-in"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-1 magnetic-btn"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
