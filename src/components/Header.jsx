import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { 
  Search, HelpCircle, PlusCircle, Menu, X, ShieldCheck, ExternalLink, 
  Home, FileText, Building2, Sun, Moon, PhoneCall, ChevronRight, Sparkles 
} from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'empanel.hindustanprojects.in',
  helplinePhone: '+91 7597000601',
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

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-navbar">
      <div className="header-inner">
        
        {/* Left: Brand Logo & Live Subdomain Badge */}
        <div className="header-brand-group">
          <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo height={38} />
          </Link>
          
          <div className="subdomain-pill">
            <span className="status-dot"></span>
            <span>{siteConfig.subdomainPill || 'empanel.hindustanprojects.in'}</span>
          </div>
        </div>

        {/* Right Desktop Nav Actions */}
        <div className="nav-actions desktop-only">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <Home style={{ width: 15, height: 15 }} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/tenders" 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText style={{ width: 15, height: 15 }} />
            <span>Tenders</span>
          </NavLink>

          <NavLink 
            to="/track" 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <Search style={{ width: 15, height: 15, color: '#0047AB' }} />
            <span>Track Status</span>
          </NavLink>

          <NavLink 
            to="/guidelines" 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <HelpCircle style={{ width: 15, height: 15, color: '#64748B' }} />
            <span>Guidelines</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <Building2 style={{ width: 15, height: 15 }} />
            <span>About</span>
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => `btn-nav-item ${isActive ? 'active' : ''}`}
          >
            <span>Contact</span>
          </NavLink>

          {/* Primary Action Buttons */}
          <NavLink 
            to="/apply" 
            className={({ isActive }) => `btn-nav-item btn-nav-apply ${isActive ? 'active' : ''}`}
          >
            <PlusCircle style={{ width: 16, height: 16 }} />
            <span>Empanelment Form</span>
          </NavLink>

          <NavLink 
            to="/vendor-login" 
            className={({ isActive }) => `btn-nav-item btn-nav-vendor ${isActive ? 'active' : ''}`}
          >
            <ShieldCheck style={{ width: 16, height: 16 }} />
            <span>Vendor Login</span>
          </NavLink>

          {/* Theme Toggle Button */}
          {toggleTheme && (
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun style={{ width: 18, height: 18, color: '#F59E0B' }} />
              ) : (
                <Moon style={{ width: 18, height: 18, color: '#0047AB' }} />
              )}
            </button>
          )}

          {/* Corporate Site External Link */}
          <a
            href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"}
            target="_blank"
            rel="noreferrer"
            className="btn-nav-item"
            style={{ backgroundColor: 'rgba(237, 28, 36, 0.08)', color: '#ED1C24', borderColor: 'rgba(237, 28, 36, 0.2)' }}
            title="Open Corporate Portal"
          >
            <span>Main Site</span>
            <ExternalLink style={{ width: 13, height: 13 }} />
          </a>
        </div>

        {/* Mobile / Tablet Action Bar */}
        <div className="mobile-toggle-wrapper">
          {/* Quick Apply Button on Mobile */}
          <Link 
            to="/apply" 
            onClick={closeMobileMenu}
            className="btn-nav-item btn-nav-apply"
            style={{ padding: '0.38rem 0.65rem', fontSize: '0.775rem' }}
          >
            <PlusCircle style={{ width: 14, height: 14 }} />
            <span>Apply</span>
          </Link>

          {/* Theme Toggle Button on Mobile Bar */}
          {toggleTheme && (
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title="Toggle Theme"
              aria-label="Toggle Theme"
              style={{ width: 34, height: 34 }}
            >
              {isDark ? (
                <Sun style={{ width: 16, height: 16, color: '#F59E0B' }} />
              ) : (
                <Moon style={{ width: 16, height: 16, color: '#0047AB' }} />
              )}
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="mobile-menu-btn"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-down Overlay Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-content">

            <div className="mobile-drawer-section-title">Navigation Menu</div>

            <NavLink 
              to="/" 
              onClick={closeMobileMenu}
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <Home style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>Home Dashboard</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            <NavLink 
              to="/apply" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              style={{ backgroundColor: '#0047AB', color: 'white', borderColor: '#0047AB' }}
            >
              <div className="mobile-nav-link-left">
                <PlusCircle style={{ width: 18, height: 18 }} />
                <span style={{ fontWeight: 700 }}>5-Step Empanelment Form</span>
              </div>
              <Sparkles style={{ width: 16, height: 16, color: '#F59E0B' }} />
            </NavLink>

            <NavLink 
              to="/tenders" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <FileText style={{ width: 18, height: 18, color: '#ED1C24' }} />
                <span>Active Tenders & Bids</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            <NavLink 
              to="/track" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <Search style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>Track Application Status</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            <div className="mobile-drawer-section-title">Portals & Support</div>

            <NavLink 
              to="/vendor-login" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#047857', borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <div className="mobile-nav-link-left">
                <ShieldCheck style={{ width: 18, height: 18, color: '#10B981' }} />
                <span>Empanelled Vendor Portal</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: '#047857' }} />
            </NavLink>

            <NavLink 
              to="/guidelines" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <HelpCircle style={{ width: 18, height: 18, color: '#64748B' }} />
                <span>Onboarding Guidelines</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            <NavLink 
              to="/about" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <Building2 style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>About Hindustan Projects</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            <NavLink 
              to="/contact" 
              onClick={closeMobileMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-link-left">
                <PhoneCall style={{ width: 18, height: 18, color: '#047857' }} />
                <span>Contact Procurement Helpdesk</span>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </NavLink>

            {/* Footer inside Drawer */}
            <div className="mobile-drawer-footer">
              <a
                href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="mobile-nav-link"
                style={{ backgroundColor: 'rgba(237, 28, 36, 0.08)', color: '#ED1C24', borderColor: 'rgba(237, 28, 36, 0.2)' }}
              >
                <div className="mobile-nav-link-left">
                  <ExternalLink style={{ width: 18, height: 18 }} />
                  <span>Visit Main Corporate Site</span>
                </div>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </a>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.5rem' }}>
                Hindustan Projects Empanelment Gateway • v2.5
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

