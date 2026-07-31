import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Lock, Award, Clock, ArrowRight, Building2 } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  companyTitle:           'Hindustan Projects',
  subdomainPill:          'www.empanelment.hindustanprojects.in',
  helplinePhone:          '+91 (011) 4500 8899 / 900',
  corporateEmail:         'empanelment@hindustanprojects.in',
  corporateAddress:       'Hindustan Projects Corporate Tower, Barakhamba Road, New Delhi - 110001',
  footerCopyright:        '© 2026 Hindustan Projects. All Rights Reserved.',
  footerAboutText:        'Official Vendor & Contractor Empanelment Portal of Hindustan Projects. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.',
  mainWebsiteUrl:         'https://www.hindustanprojects.in',
  isoBadgeText:           'ISO 9001:2015 Verified',
  cvcBadgeText:           'CVC Procurement Valid',
  supportHours:           'Mon – Sat: 09:00 AM – 06:00 PM IST',
  sslRibbonText:          '✓ 256-Bit SSL Encrypted System'
};

export default function Footer() {
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('hipro_site_config');
    if (saved) {
      try {
        setSiteConfig({ ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) });
      } catch (err) {
        console.warn('Failed to parse site config:', err);
      }
    }
  }, []);

  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '3rem 1.5rem 1.5rem 1.5rem', marginTop: '3.5rem' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Top Assistance Banner */}
        <div className="footer-banner" style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 24px rgba(0, 71, 171, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                {siteConfig.helpdeskBannerTitle || 'Need Assistance with Empanelment Filing?'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 2 }}>
                {siteConfig.helpdeskBannerSubtitle || 'Our Procurement Helpdesk is available Monday – Saturday (09:00 AM – 06:00 PM IST)'}
              </div>
            </div>
          </div>

          <div className="footer-banner-btns" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <a
              href={`tel:${(siteConfig.helplinePhone || '').replace(/\D/g, '')}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem', borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.12)', color: 'white', fontSize: '0.825rem', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <Phone style={{ width: 14, height: 14, color: '#34D399' }} />
              <span>Call Helpdesk</span>
            </a>

            <Link
              to="/apply"
              className="btn-accent"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.825rem', borderRadius: 10 }}
            >
              <span>Submit Registration</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>

        {/* 4-Column Main Corporate Footer Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-color)' }}>
          
          {/* Column 1: Company Profile & Badges */}
          <div className="footer-col-about">
            <Logo height={42} />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem', lineHeight: 1.6, maxWidth: 460 }}>
              {siteConfig.footerAboutText || `Official Vendor & Contractor Empanelment Portal of ${siteConfig.companyTitle || 'Hindustan Projects'}. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.`}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.65rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.08)', fontSize: '0.725rem', color: '#0047AB', fontWeight: 800, border: '1px solid rgba(0,71,171,0.2)' }}>
                <ShieldCheck style={{ width: 13, height: 13, color: '#10B981' }} />
                <span>{siteConfig.isoBadgeText || 'ISO 9001:2015 Verified'}</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.65rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.08)', fontSize: '0.725rem', color: '#ED1C24', fontWeight: 800, border: '1px solid rgba(237, 28, 36, 0.2)' }}>
                <Award style={{ width: 13, height: 13 }} />
                <span>{siteConfig.cvcBadgeText || 'CVC Procurement Valid'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.825rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.06em', fontWeight: 900 }}>
              Portal Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.825rem', padding: 0, margin: 0 }}>
              <li><Link to="/apply" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Submit Registration Form</Link></li>
              <li><Link to="/track" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Track Empanelment Status</Link></li>
              <li><Link to="/guidelines" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>Empanelment Guidelines</Link></li>
              <li><a href={siteConfig.mainWebsiteUrl || "https://hindustanprojects.in"} target="_blank" rel="noreferrer" style={{ color: '#ED1C24', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><span>Main Corporate Site</span> <ExternalLink style={{ width: 12, height: 12 }} /></a></li>
            </ul>
          </div>

          {/* Column 3: Corporate Contact */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.825rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.06em', fontWeight: 900 }}>
              Corporate Helpdesk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Mail style={{ width: 14, height: 14, color: '#ED1C24', flexShrink: 0 }} />
                <span>{siteConfig.corporateEmail || 'empanelment@hindustanprojects.in'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Phone style={{ width: 14, height: 14, color: '#0047AB', flexShrink: 0 }} />
                <span>{siteConfig.helplinePhone || '+91-7597000601'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <MapPin style={{ width: 14, height: 14, color: '#64748B', marginTop: 2, flexShrink: 0 }} />
                <span style={{ lineHeight: 1.35 }}>{siteConfig.corporateAddress || 'Bhopal Ganj, Bhilwara (Raj.) - 311001'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Clock style={{ width: 13, height: 13, color: '#F59E0B' }} />
                <span>{siteConfig.supportHours || 'Mon – Sat: 09:00 AM – 06:00 PM IST'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Officer Login Bar */}
        <div className="footer-bottom-bar" style={{ paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span>{siteConfig.footerCopyright || `© ${new Date().getFullYear()} Hindustan Projects. All Rights Reserved.`}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: '#047857', fontWeight: 700 }}>{siteConfig.sslRibbonText || '✓ 256-Bit SSL Encrypted System'}</span>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
              Official Empanelment Portal • Hindustan Projects
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
