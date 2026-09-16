/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminPanel } from './components/admin/AdminPanel.tsx';

function PortfolioApp() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'portfolio';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark mode for modern sleek appearance
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return (
      <AdminPanel
        onBackToSite={handleBackToSite}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#fafafa] text-slate-900'
      }`}
    >
      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex flex-col">
        {/* Hero Section */}
        <Hero isDark={isDark} />

        {/* About Section */}
        <About isDark={isDark} />

        {/* Skills Section */}
        <Skills isDark={isDark} />

        {/* Projects Section */}
        <Projects isDark={isDark} />

        {/* Contact Section */}
        <Contact isDark={isDark} />
      </main>

      {/* Footer Section */}
      <Footer isDark={isDark} />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}


