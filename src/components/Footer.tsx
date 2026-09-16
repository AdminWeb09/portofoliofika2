import React from 'react';
import { ArrowUp, Sparkles, Heart, Github, Linkedin, Instagram, Mail, Lock } from 'lucide-react';
import { navItems, socialLinks } from '../data/portfolioData.ts';
import { usePortfolio } from '../context/PortfolioContext.tsx';

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const { personalInfo } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getSocialIcon = (platform: string) => {
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
    <footer
      id="main-footer"
      className={`border-t transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {personalInfo.name}
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-md">
              Frontend Developer yang berdedikasi menciptakan antarmuka web modern dengan kode berkualitas, performa optimal, dan tampilan elegan.
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  id={`footer-social-${social.platform.toLowerCase()}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Profil ${social.platform}`}
                  className={`p-2 rounded-lg border transition-colors ${
                    isDark
                      ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-300 bg-white text-slate-600 hover:text-indigo-600 hover:border-slate-400 shadow-xs'
                  }`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-semibold ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              Navigasi Cepat
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    id={`footer-nav-${item.href.replace('#', '')}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`transition-colors hover:underline underline-offset-4 ${
                      isDark ? 'hover:text-indigo-400' : 'hover:text-indigo-600'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  id="footer-nav-admin"
                  href="#admin"
                  className={`inline-flex items-center gap-1 font-medium transition-colors hover:underline underline-offset-4 ${
                    isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>Panel Admin</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top Button */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} {personalInfo.name}. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1.5">
            <span>Dibuat dengan dedikasi menggunakan React & Tailwind CSS</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
