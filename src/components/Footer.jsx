import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Lock, Award, Clock, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'empanel.hindustanprojects.in',
  helplinePhone: '+91 (011) 4500 8899 / 900',
  corporateEmail: 'empanelment@hindustanprojects.in',
  corporateAddress: 'Hindustan Projects Corporate Tower, Barakhamba Road, New Delhi - 110001',
  footerCopyright: '© 2026 Hindustan Projects. All Rights Reserved. | Designed for empanel.hindustanprojects.in',
  mainWebsiteUrl: 'https://hindustanprojects.in'
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
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top Assistance Banner */}
        <div style={{
          padding: '1.5rem 2rem',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '3.5rem',
          boxShadow: '0 12px 30px rgba(0, 71, 171, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Need Assistance with Empanelment Filing?</div>
              <div style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: 2 }}>
                Our Procurement Helpdesk is available Monday – Saturday (09:00 AM – 06:00 PM IST)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`tel:${(siteConfig.helplinePhone || '').replace(/\D/g, '')}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.15rem', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.12)', color: 'white', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <Phone style={{ width: 15, height: 15, color: '#34D399' }} />
              <span>Call Helpdesk</span>
            </a>

            <Link
              to="/apply"
              className="btn-accent"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', borderRadius: 12 }}
            >
              <span>Submit Registration</span>
              <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        </div>

        {/* 4-Column Main Corporate Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-color)' }}>
          
          {/* Column 1: Company Profile & ISO Seal */}
          <div style={{ gridColumn: 'span 2' }}>
            <Logo height={44} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.1rem', maxWidth: 460, lineHeight: 1.65 }}>
              {siteConfig.footerAboutText || (
                <>Official Vendor & Contractor Empanelment Portal of <strong>{siteConfig.companyTitle || 'Hindustan Projects'}</strong>. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.</>
              )}
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.08)', fontSize: '0.75rem', color: '#0047AB', fontWeight: 800, border: '1px solid rgba(0,71,171,0.2)' }}>
                <ShieldCheck style={{ width: 14, height: 14, color: '#10B981' }} />
                <span>ISO 9001:2015 Verified</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.08)', fontSize: '0.75rem', color: '#ED1C24', fontWeight: 800, border: '1px solid rgba(237, 28, 36, 0.2)' }}>
                <Award style={{ width: 14, height: 14 }} />
                <span>CVC Procurement Valid</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, border: '1px solid var(--border-color)' }}>
                <span>Host: {siteConfig.subdomainPill || 'empanel.hindustanprojects.in'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.05em', fontWeight: 900 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li><Link to="/apply" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Submit Registration Form</Link></li>
              <li><Link to="/track" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Track Empanelment Status</Link></li>
              <li><Link to="/guidelines" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Empanelment Guidelines</Link></li>
              <li><a href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"} target="_blank" rel="noreferrer" style={{ color: '#ED1C24', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><span>Main Corporate Site</span> <ExternalLink style={{ width: 13, height: 13 }} /></a></li>
            </ul>
          </div>

          {/* Column 3: Corporate Helpdesk & Head Office */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.05em', fontWeight: 900 }}>
              Corporate Helpdesk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: 15, height: 15, color: '#ED1C24', flexShrink: 0 }} />
                <span>{siteConfig.corporateEmail || 'empanelment@hindustanprojects.in'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone style={{ width: 15, height: 15, color: '#0047AB', flexShrink: 0 }} />
                <span>{siteConfig.helplinePhone || '+91 (011) 4500 8899'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin style={{ width: 15, height: 15, color: '#64748B', marginTop: 3, flexShrink: 0 }} />
                <span style={{ lineHeight: 1.4 }}>{siteConfig.corporateAddress || 'Hindustan Projects Corporate Tower, Barakhamba Road, New Delhi - 110001'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Clock style={{ width: 14, height: 14, color: '#F59E0B' }} />
                <span>Mon – Sat: 09:00 AM – 06:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Ribbon */}
        <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>{siteConfig.footerCopyright || `© ${new Date().getFullYear()} Hindustan Projects. All Rights Reserved.`}</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ color: '#047857', fontWeight: 700 }}>✓ 256-Bit SSL Encrypted Registration System</span>
          </div>

          <div>
            <Link to="/admin-login" style={{ color: 'var(--text-muted)', fontSize: '0.775rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.65rem', borderRadius: 6, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              <Lock style={{ width: 12, height: 12, color: '#0047AB' }} />
              <span>Corporate Officer Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
