/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
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

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#fafafa] text-slate-900'
      }`}
    >
      {/* Navigation Header */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

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

