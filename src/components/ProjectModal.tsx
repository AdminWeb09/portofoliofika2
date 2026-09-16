import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle, Layers, Calendar, Tag } from 'lucide-react';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  isDark,
}) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col ${
            isDark
              ? 'bg-slate-900 border-slate-700/80 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Close button */}
          <button
            id="close-project-modal"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-colors ${
              isDark
                ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-md'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Media */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/90 text-white mb-2 shadow-sm">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 font-medium mt-1">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Description */}
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                Deskripsi Proyek
              </h4>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  Fitur Utama yang Diimplementasikan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                        isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={`text-xs sm:text-sm ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-2.5 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                Teknologi & Library
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    <Tag className="w-3 h-3 text-indigo-500" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-700/40 flex flex-wrap items-center gap-3">
              <a
                id="modal-live-demo-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 flex-1 sm:flex-initial"
              >
                <span>Kunjungi Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                id="modal-github-link"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-colors flex-1 sm:flex-initial ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Lihat Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
