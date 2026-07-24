import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        
        <div style={{ gridColumn: 'span 2' }}>
          <Logo height={44} />
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '1rem', maxWidth: 450, lineHeight: 1.6 }}>
            Official Vendor & Contractor Empanelment Portal of <strong>Hindustan Projects</strong>. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.35rem 0.75rem', borderRadius: 6, backgroundColor: '#1E293B', fontSize: '0.75rem', color: '#CBD5E1' }}>
            <ShieldCheck style={{ width: 14, height: 14, color: '#10B981' }} />
            <span>Host: empanel.hindustanprojects.in</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li><a href="#empanelment-form-container" style={{ color: '#94A3B8', textDecoration: 'none' }}>Submit Application</a></li>
            <li><a href="https://hindustanprojects.in" target="_blank" rel="noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><span>Hindustan Projects Main Site</span> <ExternalLink style={{ width: 12, height: 12 }} /></a></li>
            <li><a href="https://github.com/hindustan-groups/Empanelment-Portal" target="_blank" rel="noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><span>Git Repository</span> <ExternalLink style={{ width: 12, height: 12 }} /></a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Procurement Helpdesk</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#94A3B8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail style={{ width: 14, height: 14, color: '#ED1C24' }} />
              <span>empanelment@hindustanprojects.in</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone style={{ width: 14, height: 14, color: '#0047AB' }} />
              <span>+91 (011) 4500 8899 / 900</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin style={{ width: 14, height: 14, color: '#64748B', marginTop: 3 }} />
              <span>Hindustan Projects Corporate Tower, New Delhi - 110001</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <strong>Hindustan Projects</strong>. All Rights Reserved. | Designed for empanel.hindustanprojects.in
      </div>
    </footer>
  );
}
