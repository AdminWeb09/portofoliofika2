import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, Download, Github, Linkedin, Instagram, Mail, Sparkles, Code2, Layers, ChevronDown } from 'lucide-react';
import { socialLinks } from '../data/portfolioData.ts';
import { usePortfolio } from '../context/PortfolioContext.tsx';

interface HeroProps {
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDark }) => {
  const { personalInfo } = usePortfolio();
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 75;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-indigo-600/30' : 'bg-indigo-300/40'
          }`}
        />
        <div
          className={`absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25 ${
            isDark ? 'bg-cyan-600/20' : 'bg-cyan-300/40'
          }`}
        />
        <div
          className={`absolute -bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-purple-600/20' : 'bg-purple-300/30'
          }`}
        />
        {/* Subtle grid pattern */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${
            isDark ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000000_1px,transparent_1px)]'
          } [background-size:24px_24px]`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 transition-colors border ${
                isDark
                  ? 'bg-slate-800/80 border-emerald-500/30 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Tersedia untuk Pekerjaan Baru</span>
            </motion.div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4">
              <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>Halo, Saya </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
                {personalInfo.name}
              </span>
            </h1>

            {/* Headline / Title */}
            <div className="mb-5">
              <span className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-indigo-300' : 'text-indigo-600'
              }`}>
                {personalInfo.role}
              </span>
            </div>

            {/* Short Bio Description */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {personalInfo.bioShort}
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-cta-projects"
                onClick={() => handleScrollTo('projects')}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => handleScrollTo('contact')}
                type="button"
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold border transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto text-sm sm:text-base ${
                  isDark
                    ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'
                }`}
              >
                <span>Hubungi Saya</span>
                <Send className="w-4 h-4 text-indigo-500" />
              </button>

              <a
                id="hero-cta-cv"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('about');
                }}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Ringkasan Bio</span>
              </a>
            </div>

            {/* Quick Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className={`text-xs font-mono uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Terhubung:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const getIcon = (platform: string) => {
                    switch (platform.toLowerCase()) {
                      case 'github':
                        return <Github className="w-4 h-4" />;
                      case 'linkedin':
                        return <Linkedin className="w-4 h-4" />;
                      case 'instagram':
                        return <Instagram className="w-4 h-4" />;
                      default:
                        return <Mail className="w-4 h-4" />;
                    }
                  };

                  return (
                    <a
                      key={social.platform}
                      id={`hero-social-${social.platform.toLowerCase()}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Kunjungi profil ${social.platform}`}
                      className={`p-2 rounded-lg border transition-all duration-200 hover:scale-110 ${
                        isDark
                          ? 'border-slate-800 bg-slate-800/60 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40'
                          : 'border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-300 shadow-sm'
                      }`}
                    >
                      {getIcon(social.platform)}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Portrait & Floating Highlight Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 sm:w-84 md:w-96 aspect-square">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-2xl shadow-indigo-500/20 rotate-3 transition-transform duration-500 group-hover:rotate-0">
                <div className={`w-full h-full rounded-[22px] overflow-hidden ${
                  isDark ? 'bg-slate-900' : 'bg-slate-100'
                }`} />
              </div>

              {/* Inner Avatar Card */}
              <div className={`relative -rotate-2 rounded-3xl overflow-hidden shadow-xl border w-full h-full p-2 transition-transform duration-300 hover:rotate-0 ${
                isDark ? 'bg-slate-800/90 border-slate-700/80' : 'bg-white border-slate-200'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt={`Potret ${personalInfo.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl filter contrast-105"
                />

                {/* Overlay gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider font-mono text-indigo-300">Frontend Engineer</p>
                    <p className="text-base font-bold">{personalInfo.name}</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: React & TypeScript */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`absolute -top-4 -left-4 sm:-left-6 px-3.5 py-2.5 rounded-2xl border shadow-xl flex items-center gap-2.5 backdrop-blur-md ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700 text-white'
                    : 'bg-white/95 border-slate-200 text-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono leading-none">Stack Utama</p>
                  <p className="text-xs font-bold mt-0.5">React & TypeScript</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`absolute -bottom-4 -right-4 sm:-right-6 px-3.5 py-2.5 rounded-2xl border shadow-xl flex items-center gap-2.5 backdrop-blur-md ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700 text-white'
                    : 'bg-white/95 border-slate-200 text-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono leading-none">Pengalaman</p>
                  <p className="text-xs font-bold mt-0.5">3+ Tahun Koding</p>
                </div>
              </motion.div>

              {/* Floating Badge 3: Design & UI/UX */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className={`absolute top-1/2 -translate-y-1/2 -right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-lg backdrop-blur-md ${
                  isDark
                    ? 'bg-slate-900/90 border-cyan-500/30 text-cyan-300'
                    : 'bg-white/95 border-cyan-200 text-cyan-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Clean UI/UX</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down mouse indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => handleScrollTo('about')}
            aria-label="Scroll ke seksi About"
            className={`p-2 rounded-full transition-colors flex flex-col items-center gap-1 opacity-70 hover:opacity-100 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="text-xs font-mono">Gulir ke bawah</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
