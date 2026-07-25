import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Sun, Moon, Search, HelpCircle, PlusCircle, Menu, X, ShieldCheck } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'empanel.hindustanprojects.in',
  helplinePhone: '+91 (011) 4500 8899 / 900',
  corporateEmail: 'empanelment@hindustanprojects.in'
};

export default function Header({ isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('hipro_site_config');
    if (saved) {
      try {
        setSiteConfig(JSON.parse(saved));
      } catch (err) {
        console.warn('Failed to parse site config:', err);
      }
    }
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-navbar">
      <div className="header-inner">
        
        {/* Left: Logo & Dynamic Subdomain Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
            <Logo height={38} />
          </Link>
          <div className="subdomain-pill desktop-only">
            <span className="status-dot"></span>
            <span>{siteConfig.subdomainPill || 'empanel.hindustanprojects.in'}</span>
          </div>
        </div>

        {/* Right Desktop Nav Options */}
        <div className="nav-actions desktop-only">
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

        {/* Mobile Hamburger Toggle Button */}
        <div className="mobile-toggle-wrapper">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme" style={{ marginRight: '0.5rem' }}>
            {isDark ? <Sun style={{ width: 16, height: 16, color: '#F59E0B' }} /> : <Moon style={{ width: 16, height: 16, color: '#475569' }} />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="mobile-menu-btn"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-down Overlay Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-content">
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem', borderRadius: 9999, backgroundColor: 'var(--bg-surface)', fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', width: 'fit-content' }}>
              <ShieldCheck style={{ width: 14, height: 14, color: '#10B981' }} />
              <span>{siteConfig.subdomainPill || 'empanel.hindustanprojects.in'}</span>
            </div>

            <NavLink 
              to="/apply" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
              style={{ backgroundColor: '#0047AB', color: 'white' }}
            >
              <PlusCircle style={{ width: 18, height: 18 }} />
              <span>Empanelment Form</span>
            </NavLink>

            <NavLink 
              to="/track" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <Search style={{ width: 18, height: 18, color: '#0047AB' }} />
              <span>Track Application Status</span>
            </NavLink>

            <NavLink 
              to="/guidelines" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <HelpCircle style={{ width: 18, height: 18, color: '#64748B' }} />
              <span>Empanelment Guidelines</span>
            </NavLink>

          </div>
        </div>
      )}
    </header>
  );
}
