import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggle}
      type="button"
      aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
        isDark
          ? 'bg-slate-800/90 text-amber-400 hover:bg-slate-700 border border-slate-700'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
      }`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
};
