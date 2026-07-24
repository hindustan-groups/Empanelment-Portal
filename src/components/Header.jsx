import React from 'react';
import Logo from './Logo';
import { Sun, Moon, Search, ExternalLink, HelpCircle } from 'lucide-react';

export default function Header({ isDark, toggleTheme, onOpenStatusModal, onOpenGuideModal }) {
  return (
    <header className="header-navbar">
      <div className="header-inner">
        
        {/* Left: Logo & Subdomain Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#" style={{ textDecoration: 'none' }}>
            <Logo height={44} />
          </a>
          <div className="subdomain-pill">
            <span className="status-dot"></span>
            <span>empanel.hindustanprojects.in</span>
          </div>
        </div>

        {/* Right Nav Options */}
        <div className="nav-actions">
          <button onClick={onOpenStatusModal} className="btn-icon-text">
            <Search style={{ width: 16, height: 16, color: '#0047AB' }} />
            <span>Track Status</span>
          </button>

          <button onClick={onOpenGuideModal} className="btn-icon-text">
            <HelpCircle style={{ width: 16, height: 16, color: '#64748B' }} />
            <span>Guide & Checklist</span>
          </button>

          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {isDark ? <Sun style={{ width: 18, height: 18, color: '#F59E0B' }} /> : <Moon style={{ width: 18, height: 18, color: '#475569' }} />}
          </button>

          <a
            href="https://hindustanprojects.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', marginLeft: '0.5rem' }}
          >
            <span>Main Site</span>
            <ExternalLink style={{ width: 14, height: 14 }} />
          </a>
        </div>

      </div>
    </header>
  );
}
