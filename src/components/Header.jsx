import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Search, HelpCircle, PlusCircle, Menu, X, ShieldCheck, ExternalLink, Home, FileText, Building2 } from 'lucide-react';

import { API_BASE_URL } from '../config/api';

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'www.empanelment.hindustanprojects.in',
  helplinePhone: '+91 7597000601',
  corporateEmail: 'industrial@hindustanprojects.in'
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('hipro_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.corporateEmail && parsed.corporateEmail.includes('empanelment@')) {
          delete parsed.corporateEmail;
        }
        setSiteConfig({ ...DEFAULT_SITE_CONFIG, ...parsed });
      } catch (err) {
        console.warn('Failed to parse site config:', err);
      }
    }

    // Fetch live CMS site config from VPS Database so Mobile & Desktop are 100% in sync!
    fetch(`${API_BASE_URL}/api/empanelment/public/site-config`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data && Object.keys(data.data).length > 0) {
          setSiteConfig(prev => {
            const merged = { ...prev, ...data.data };
            try { localStorage.setItem('hipro_site_config', JSON.stringify(merged)); } catch (e) {}
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-navbar">
      <div className="header-inner">
        
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
            <Logo height={38} />
          </Link>
        </div>

        {/* Right Desktop Nav Options */}
        <div className="nav-actions desktop-only">
          <a
            href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"}
            target="_blank"
            rel="noreferrer"
            className="btn-icon-text"
            style={{ backgroundColor: 'rgba(237, 28, 36, 0.08)', color: '#ED1C24', borderColor: 'rgba(237, 28, 36, 0.2)' }}
          >
            <span>Main Site</span>
            <ExternalLink style={{ width: 14, height: 14 }} />
          </a>

          <NavLink 
            to="/apply" 
            className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}
            style={{ backgroundColor: '#0047AB', color: 'white', border: 'none' }}
          >
            <PlusCircle style={{ width: 16, height: 16 }} />
            <span>Empanelment Form</span>
          </NavLink>

          <NavLink to="/tenders" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <span>Tenders</span>
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <span>About Us</span>
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <span>Contact</span>
          </NavLink>

          <NavLink to="/track" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <Search style={{ width: 16, height: 16, color: '#0047AB' }} />
            <span>Track Status</span>
          </NavLink>

          <NavLink to="/guidelines" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`}>
            <HelpCircle style={{ width: 16, height: 16, color: '#64748B' }} />
            <span>Guidelines</span>
          </NavLink>

          <NavLink to="/vendor-login" className={({ isActive }) => `btn-icon-text ${isActive ? 'active' : ''}`} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <ShieldCheck style={{ width: 16, height: 16, color: '#10B981' }} />
            <span>Vendor Login</span>
          </NavLink>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="mobile-toggle-wrapper">
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

            <NavLink 
              to="/" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <Home style={{ width: 18, height: 18, color: '#0047AB' }} />
              <span>Home Page</span>
            </NavLink>

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
              to="/tenders" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <FileText style={{ width: 18, height: 18, color: '#ED1C24' }} />
              <span>Active Tenders & Bids</span>
            </NavLink>

            <NavLink 
              to="/about" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <Building2 style={{ width: 18, height: 18, color: '#0047AB' }} />
              <span>About Hindustan Projects</span>
            </NavLink>

            <NavLink 
              to="/contact" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              <HelpCircle style={{ width: 18, height: 18, color: '#047857' }} />
              <span>Contact Headquarters</span>
            </NavLink>

            <NavLink 
              to="/vendor-login" 
              onClick={closeMobileMenu}
              className="mobile-nav-link"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)' }}
            >
              <ShieldCheck style={{ width: 18, height: 18, color: '#10B981' }} />
              <span>Empanelled Vendor Login</span>
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

            <a
              href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="mobile-nav-link"
              style={{ backgroundColor: 'rgba(237, 28, 36, 0.08)', color: '#ED1C24', marginTop: '0.5rem' }}
            >
              <ExternalLink style={{ width: 18, height: 18 }} />
              <span>Visit Main Corporate Website</span>
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
