import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  Code2,
  Atom,
  FileCode2,
  Code,
  LayoutGrid,
  Globe,
  FileText,
  Server,
  Database,
  Network,
  Figma,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Activity,
  Cpu,
} from 'lucide-react';
import { skills } from '../data/portfolioData.ts';

interface SkillsProps {
  isDark: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Keahlian' },
    { id: 'frontend', label: 'Frontend Tech' },
    { id: 'backend', label: 'Backend & Database' },
    { id: 'tools', label: 'Tools & Workflow' },
    { id: 'design', label: 'UI/UX & Desain' },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  const getSkillIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5';
    switch (iconName) {
      case 'Atom':
        return <Atom className={`${iconClass} text-cyan-400`} />;
      case 'FileCode2':
        return <FileCode2 className={`${iconClass} text-blue-500`} />;
      case 'Code':
        return <Code className={`${iconClass} text-amber-400`} />;
      case 'LayoutGrid':
        return <LayoutGrid className={`${iconClass} text-sky-400`} />;
      case 'Globe':
        return <Globe className={`${iconClass} text-indigo-400`} />;
      case 'FileText':
        return <FileText className={`${iconClass} text-orange-500`} />;
      case 'Server':
        return <Server className={`${iconClass} text-emerald-500`} />;
      case 'Database':
        return <Database className={`${iconClass} text-teal-400`} />;
      case 'Network':
        return <Network className={`${iconClass} text-violet-400`} />;
      case 'Figma':
        return <Figma className={`${iconClass} text-pink-500`} />;
      case 'GitBranch':
        return <GitBranch className={`${iconClass} text-red-400`} />;
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-yellow-400`} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={`${iconClass} text-emerald-400`} />;
      case 'Activity':
        return <Activity className={`${iconClass} text-purple-400`} />;
      default:
        return <Code2 className={`${iconClass} text-indigo-400`} />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Alat, Bahasa, & Teknologi yang Saya Kuasai
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Dibangun di atas dasar arsitektur web modern, berfokus pada kecepatan, skalabilitas, dan pengalaman interaksi pengguna.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-category-${cat.id}`}
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

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/50 hover:shadow-indigo-500/5'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-indigo-500/10'
                }`}
              >
                {/* Header: Icon, Name, Experience */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                      isDark ? 'bg-slate-900 border border-slate-700/60' : 'bg-slate-100 border border-slate-200'
                    }`}>
                      {getSkillIcon(skill.icon)}
                    </div>
                    <div>
                      <h4 className={`text-base font-bold leading-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-indigo-500 font-medium">
                        {skill.experience}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-md ${
                    isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Tagline Description */}
                <p className={`text-xs mb-4 min-h-[32px] line-clamp-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {skill.tagline}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Tingkat Penguasaan</span>
                    <span className="font-semibold text-indigo-500">
                      {skill.level >= 90 ? 'Lanjutan (Expert)' : skill.level >= 80 ? 'Mahir (Proficient)' : 'Kompeten (Solid)'}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${
                    isDark ? 'bg-slate-900' : 'bg-slate-100'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional Tools Pill Cloud */}
        <div className={`mt-14 p-6 rounded-2xl border text-center ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-indigo-500" />
            <h4 className={`text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Teknologi Pendukung Lainnya
            </h4>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              'REST API',
              'JSON',
              'npm / pnpm',
              'Zustand',
              'Redux Toolkit',
              'Tailwind v4',
              'PostCSS',
              'ESLint',
              'Prettier',
              'Vercel',
              'Netlify',
              'Responsive Design',
              'Web Accessibility (a11y)',
              'Performance Auditing (Lighthouse)',
            ].map((tool) => (
              <span
                key={tool}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-xs'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
