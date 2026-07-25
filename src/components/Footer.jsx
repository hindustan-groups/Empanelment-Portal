import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Lock } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'empanel.hindustanprojects.in',
  helplinePhone: '+91 (011) 4500 8899 / 900',
  corporateEmail: 'empanelment@hindustanprojects.in',
  corporateAddress: 'Hindustan Projects Corporate Tower, Barakhamba Road, New Delhi - 110001',
  footerCopyright: '© 2026 Hindustan Projects. All Rights Reserved. | Designed for empanel.hindustanprojects.in'
};

export default function Footer() {
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

  return (
    <footer className="footer">
      <div className="footer-inner">
        
        <div style={{ gridColumn: 'span 2' }}>
          <Logo height={44} />
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '1rem', maxWidth: 450, lineHeight: 1.6 }}>
            {siteConfig.footerAboutText || (
              <>Official Vendor & Contractor Empanelment Portal of <strong>{siteConfig.companyTitle || 'Hindustan Projects'}</strong>. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.</>
            )}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.35rem 0.75rem', borderRadius: 6, backgroundColor: '#1E293B', fontSize: '0.75rem', color: '#CBD5E1' }}>
            <ShieldCheck style={{ width: 14, height: 14, color: '#10B981' }} />
            <span>Host: {siteConfig.subdomainPill || 'empanel.hindustanprojects.in'}</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li><Link to="/apply" style={{ color: '#94A3B8', textDecoration: 'none' }}>Submit Application</Link></li>
            <li><Link to="/track" style={{ color: '#94A3B8', textDecoration: 'none' }}>Track Application Status</Link></li>
            <li><Link to="/guidelines" style={{ color: '#94A3B8', textDecoration: 'none' }}>Empanelment Guidelines</Link></li>
            <li><a href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"} target="_blank" rel="noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><span>Main Site</span> <ExternalLink style={{ width: 12, height: 12 }} /></a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Procurement Helpdesk</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#94A3B8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail style={{ width: 14, height: 14, color: '#ED1C24' }} />
              <span>{siteConfig.corporateEmail || 'empanelment@hindustanprojects.in'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone style={{ width: 14, height: 14, color: '#0047AB' }} />
              <span>{siteConfig.helplinePhone || '+91 (011) 4500 8899'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin style={{ width: 14, height: 14, color: '#64748B', marginTop: 3 }} />
              <span>{siteConfig.corporateAddress || 'Hindustan Projects Corporate Tower, New Delhi - 110001'}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          {siteConfig.footerCopyright || `© ${new Date().getFullYear()} Hindustan Projects. All Rights Reserved.`}
        </div>
        <div>
          <Link to="/admin-login" style={{ color: '#64748B', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Lock style={{ width: 12, height: 12 }} />
            <span>Corporate Officer Login</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
