import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Sun, Moon, Search, ExternalLink, HelpCircle, PlusCircle } from 'lucide-react';

export default function Header({ isDark, toggleTheme }) {
  return (
    <header className="header-navbar">
      <div className="header-inner">
        
        {/* Left: Logo & Subdomain Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo height={44} />
          </Link>
          <div className="subdomain-pill">
            <span className="status-dot"></span>
            <span>empanel.hindustanprojects.in</span>
          </div>
        </div>

        {/* Right Nav Options - PUBLIC VENDOR LINKS ONLY */}
        <div className="nav-actions">
          <NavLink 
            to="/apply" 
            className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}
            style={{ backgroundColor: '#0047AB', color: 'white', border: 'none' }}
          >
            <PlusCircle style={{ width: 16, height: 16 }} />
            <span>Empanelment Form</span>
          </NavLink>

          <NavLink to="/track" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <Search style={{ width: 16, height: 16, color: '#0047AB' }} />
            <span>Track Status</span>
          </NavLink>

          <NavLink to="/guidelines" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <HelpCircle style={{ width: 16, height: 16, color: '#64748B' }} />
            <span>Guidelines</span>
          </NavLink>

          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {isDark ? <Sun style={{ width: 18, height: 18, color: '#F59E0B' }} /> : <Moon style={{ width: 18, height: 18, color: '#475569' }} />}
          </button>
        </div>

      </div>
    </header>
  );
}
