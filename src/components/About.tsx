import React from 'react';
import { motion } from 'motion/react';
import { Code2, Smartphone, Palette, Zap, CheckCircle2, User, Award, Terminal } from 'lucide-react';
import { stats, experienceHighlights } from '../data/portfolioData.ts';
import { usePortfolio } from '../context/PortfolioContext.tsx';

interface AboutProps {
  isDark: boolean;
}

export const About: React.FC<AboutProps> = ({ isDark }) => {
  const { personalInfo } = usePortfolio();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-purple-500" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-pink-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section
      id="about"
      className={`py-24 transition-colors ${
        isDark ? 'bg-slate-900/50' : 'bg-slate-50/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <User className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Mengenal Lebih Dekat Latar Belakang & Nilai Kerja Saya
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Menggabungkan presisi kode teknis dengan sensitivitas estetika desain antarmuka.
          </p>
        </div>

        {/* 2-Column Content: Left Side Visual/Stats, Right Side Story/Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Visual Card & Experience Counter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Main Photo Card */}
              <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <img
                  src={personalInfo.aboutImageUrl || personalInfo.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'}
                  alt={`Tentang ${personalInfo.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-top"
                />

                {/* Floating summary info bar */}
                <div className={`p-6 border-t ${
                  isDark ? 'bg-slate-800/95 border-slate-700/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base leading-tight">Berdedikasi & Teliti</h4>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Memprioritaskan kode bersih, aksesibilitas, dan performa tinggi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Code Snippet Card */}
              <div className={`absolute -bottom-6 -right-6 hidden sm:block p-4 rounded-2xl border shadow-xl backdrop-blur-md max-w-xs ${
                isDark ? 'bg-slate-900/90 border-slate-700 text-slate-300' : 'bg-white/95 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono ml-2 text-slate-400">developer.ts</span>
                </div>
                <code className="text-xs font-mono block leading-relaxed">
                  <span className="text-indigo-400">const</span> developer = &#123;<br />
                  &nbsp;&nbsp;mindset: <span className="text-emerald-400">"User-First"</span>,<br />
                  &nbsp;&nbsp;passion: <span className="text-emerald-400">"Clean Code"</span>,<br />
                  &#125;;
                </code>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-500 font-semibold">
                Latar Belakang & Filosofi
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Menciptakan Solusi Web yang Tidak Hanya Indah, Namun Juga Tangguh
            </h3>

            <p className={`text-base leading-relaxed mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {personalInfo.bioLong}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Saya selalu memantau perkembangan teknologi web terkini, mulai dari performa rendering React, fitur terbaru CSS modern, hingga optimasi Web Vitals. Tujuan saya adalah memberikan pengalaman pengguna yang mulus dan bebas hambatan di setiap interaksi.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className={`p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700/80 hover:border-indigo-500/40 hover:bg-slate-800'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isDark ? 'bg-slate-700/60' : 'bg-slate-100'
                    }`}>
                      {getIcon(highlight.icon)}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold leading-snug ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {highlight.title}
                      </h4>
                      <p className={`text-xs mt-1 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid Banner */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl border shadow-lg ${
          isDark
            ? 'bg-slate-800/80 border-slate-700/80'
            : 'bg-white border-slate-200'
        }`}>
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl ${
                idx !== stats.length - 1 ? 'lg:border-r lg:border-slate-700/30' : ''
              }`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
                {stat.value}
              </span>
              <span className={`text-sm font-bold mt-2 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {stat.label}
              </span>
              <span className={`text-xs mt-1 max-w-[180px] ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
