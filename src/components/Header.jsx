import React from 'react';
import Logo from './Logo';
import { Sun, Moon, Search, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

export default function Header({ isDark, toggleTheme, onOpenStatusModal, onOpenGuideModal, onOpenCategoryModal }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Subdomain Badge */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:opacity-95 transition-opacity">
            <Logo height={48} />
          </a>
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>empanel.hindustanprojects.in</span>
          </div>
        </div>

        {/* Center/Right Nav Options */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <button
            onClick={onOpenCategoryModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Grading Matrix</span>
          </button>

          <button
            onClick={onOpenStatusModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
          >
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Track Application</span>
            <span className="sm:hidden">Status</span>
          </button>

          <button
            onClick={onOpenGuideModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Guidelines & Checklist</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <div className="hidden sm:block pl-2 border-l border-slate-200 dark:border-slate-800">
            <a
              href="https://hindustanprojects.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </header>
  );
}
