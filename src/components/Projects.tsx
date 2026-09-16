import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, FolderGit2, ArrowUpRight, Info } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { Project } from '../types.ts';
import { ProjectModal } from './ProjectModal.tsx';

interface ProjectsProps {
  isDark: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'Web App', label: 'Web App' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Landing Page', label: 'Landing Page' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  return (
    <section
      id="projects"
      className={`py-24 transition-colors ${
        isDark ? 'bg-slate-900/40' : 'bg-slate-50/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio Proyek</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Karya & Eksplorasi Digital Pilihan
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Kumpulan aplikasi web fungsional yang dikembangkan dengan fokus pada kenyamanan interaksi pengguna dan kode berkualitas.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`project-filter-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`group flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-slate-900/10'
                }`}
              >
                {/* Thumbnail Image with hover zoom & overlay */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/70 text-white backdrop-blur-md border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Detail Info Quick Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    type="button"
                    title="Lihat rincian proyek"
                    aria-label={`Lihat rincian ${project.title}`}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-600"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-xl font-bold tracking-tight mb-2 group-hover:text-indigo-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg border ${
                            isDark
                              ? 'bg-slate-900/80 border-slate-700/60 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Live Demo & GitHub */}
                  <div className="pt-4 border-t border-slate-700/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        id={`project-demo-${project.id}`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <a
                        id={`project-github-${project.id}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                          isDark
                            ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                            : 'border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      type="button"
                      className={`text-xs font-semibold underline underline-offset-4 cursor-pointer transition-colors ${
                        isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                      }`}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Repository Callout Banner */}
        <div className="mt-16 text-center">
          <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ingin melihat lebih banyak eksperimen dan repositori sumber terbuka lainnya?
          </p>
          <a
            id="more-projects-github-btn"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>Kunjungi Akun GitHub Saya</span>
            <ArrowUpRight className="w-4 h-4 text-indigo-500" />
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        isDark={isDark}
      />
    </section>
  );
};
