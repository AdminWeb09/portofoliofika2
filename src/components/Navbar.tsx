import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Send, ShieldCheck, Lock } from 'lucide-react';
import { navItems } from '../data/portfolioData.ts';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, onOpenAdmin }) => {
  const { personalInfo, isAdminLoggedIn } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky solid vs transparent header background
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section for nav highlight
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/10 py-3.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-900/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            id="nav-brand-logo"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight text-lg leading-tight transition-colors ${
                isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
              }`}>
                {personalInfo.name}
              </span>
              <span className="text-xs font-mono text-indigo-500 font-medium">
                dev.portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-transparent transition-all">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  id={`nav-link-${item.href.replace('#', '')}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'text-white bg-slate-800 shadow-sm border border-slate-700/60'
                        : 'text-indigo-600 bg-indigo-50/80 shadow-sm border border-indigo-100'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Theme Switcher, Admin Button & Contact CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Admin Panel Button */}
            <button
              id="navbar-admin-btn"
              onClick={onOpenAdmin}
              type="button"
              title="Panel Admin Portofolio"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {isAdminLoggedIn ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
              )}
              <span>Admin</span>
              {isAdminLoggedIn && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <a
              id="navbar-contact-cta"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Kontak</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'text-slate-200 bg-slate-800/80 border-slate-700 hover:bg-slate-700'
                  : 'text-slate-700 bg-slate-100 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className={`md:hidden mt-4 p-4 rounded-2xl border transition-all duration-200 shadow-2xl ${
              isDark
                ? 'bg-slate-900/95 border-slate-800 backdrop-blur-xl'
                : 'bg-white/95 border-slate-200 backdrop-blur-xl'
            }`}
          >
            <div className="flex flex-col space-y-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    id={`mobile-nav-link-${item.href.replace('#', '')}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? isDark
                          ? 'text-indigo-400 bg-slate-800/90 font-semibold'
                          : 'text-indigo-600 bg-indigo-50/90 font-semibold'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    )}
                  </a>
                );
              })}

              <div className="pt-2 border-t border-slate-700/40 space-y-2">
                <button
                  id="mobile-admin-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  type="button"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                    isAdminLoggedIn
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isAdminLoggedIn ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-indigo-400" />
                  )}
                  <span>Panel Admin {isAdminLoggedIn && '(Aktif)'}</span>
                </button>

                <a
                  id="mobile-contact-cta"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
                >
                  <span>Hubungi Saya</span>
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
