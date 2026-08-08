import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Clock, FileCheck, Building2, Truck, Wrench, Compass, HardHat, PackageCheck } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  heroBadge: 'Official Vendor & Contractor Registration FY 2026-27',
  heroTitleBlue: 'Hindustan',
  heroTitleRed: 'Projects',
  heroSubtitle: 'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.',
  ongoingProjectsCount: '10+',
  activePipelineValue: '₹ 1 Cr+',
  baseContractorCount: '100+'
};

export default function HeroSection({ selectedCategory, setSelectedCategory, onStartForm }) {
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
  const [realContractorsCount, setRealContractorsCount] = useState(100);

  useEffect(() => {
    // 1. Load Admin Config
    const savedConfig = localStorage.getItem('hipro_site_config');
    if (savedConfig) {
      try {
        setSiteConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
      } catch (err) {
        console.warn('Failed to parse site config:', err);
      }
    }

    // 2. Dynamically calculate real applications count added by users
    try {
      const localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const extraCount = localApps.length;
      
      const baseText = (savedConfig ? JSON.parse(savedConfig).baseContractorCount : '100+') || '100+';
      const baseNum = parseInt(baseText.replace(/\D/g, ''), 10) || 100;

      setRealContractorsCount(baseNum + extraCount);
    } catch {
      setRealContractorsCount(100);
    }
  }, []);

  const categories = [
    { id: 'civil', name: 'Civil & Structural Contractors', icon: Building2, desc: 'EPC, Commercial & Residential Construction' },
    { id: 'mep', name: 'MEP & Electrical Services', icon: Wrench, desc: 'HVAC, Firefighting, Plumbing & Power' },
    { id: 'suppliers', name: 'Material & Goods Suppliers', icon: PackageCheck, desc: 'Steel, Cement, Hardware & Materials' },
    { id: 'consultants', name: 'Architects & Consultants', icon: Compass, desc: 'Structural Design, BIM & Site Management' },
    { id: 'equipment', name: 'Machinery & Heavy Equipment', icon: Truck, desc: 'Cranes, Excavators & Equipment Rentals' },
    { id: 'site_services', name: 'Facility & Site Logistics', icon: HardHat, desc: 'Safety Equipment & Workforce Support' },
  ];

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (onStartForm) {
      onStartForm();
    }
    // Smooth Auto-Scroll to Registration Form Container
    setTimeout(() => {
      const formEl = document.querySelector('.form-container');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="hero-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Dynamic Top Tag */}
        <div className="hero-tag">
          <Award style={{ width: 16, height: 16, color: '#ED1C24' }} />
          <span>{siteConfig.heroBadge || 'Official Vendor & Contractor Registration FY 2026-27'}</span>
        </div>

        {/* Dynamic Hero Title */}
        <h1 className="hero-title">
          Partner with&nbsp;<span className="text-blue">{siteConfig.heroTitleBlue || 'Hindustan'}</span>&nbsp;<span className="text-red">{siteConfig.heroTitleRed || 'Projects'}</span>
        </h1>
        <p className="hero-subtitle">
          {siteConfig.heroSubtitle || 'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants.'}
        </p>

        {/* Trust Badges */}
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Compliance Shield</div>
              <div className="trust-value">ISO 9001 & CVC Valid</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Verification TAT</div>
              <div className="trust-value">48-72 Hr Fast-Track</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
              <FileCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Digital Audit</div>
              <div className="trust-value">100% Paperless</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#A855F7' }}>
              <Award style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Empanelment Scope</div>
              <div className="trust-value">Pan-India Projects</div>
            </div>
          </div>
        </div>

        {/* Dynamic Enterprise Metrics Banner (Auto-incrementing with real vendor submissions) */}
        <div className="stats-banner">
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FBBF24', letterSpacing: '-0.5px' }}>
              {siteConfig.ongoingProjectsCount || '10+'}
            </div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.8, marginTop: 2 }}>
              Ongoing Projects
            </div>
          </div>

          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#60A5FA', letterSpacing: '-0.5px' }}>
              {siteConfig.activePipelineValue || '₹ 1 Cr+'}
            </div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.8, marginTop: 2 }}>
              Active Tender Pipeline
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34D399', letterSpacing: '-0.5px' }}>
              {realContractorsCount}+
            </div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.8, marginTop: 2 }}>
              Empanelled Contractors
            </div>
          </div>
        </div>

        {/* Category Grid — Select Empanelment Category */}
        <div className="category-section" style={{ marginTop: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.95rem', borderRadius: 9999, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', border: '1px solid rgba(0,71,171,0.2)' }}>
              <Building2 style={{ width: 14, height: 14, color: '#0047AB' }} />
              <span>Official Corporate Empanelment Disciplines • FY 2026-27</span>
            </div>
            <h2 className="category-title">
              Select Your Empanelment Category &amp; Business Discipline
            </h2>
            <p className="category-subtitle" style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: 680, margin: '0.3rem auto 0 auto' }}>
              Click your organization's primary business line below to launch the 4-step registration wizard with category-specific statutory schemas.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{
                    padding: '1.35rem 1.4rem',
                    borderRadius: 18,
                    backgroundColor: isSelected ? '#EFF6FF' : 'var(--bg-card)',
                    border: isSelected ? '2px solid #0047AB' : '1.5px solid var(--border-color)',
                    boxShadow: isSelected ? '0 12px 30px rgba(0,71,171,0.2)' : 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}
                  className="category-card-hover"
                >
                  {/* Selected Accent Bar */}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#0047AB' }} />
                  )}

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: 14,
                        backgroundColor: isSelected ? '#0047AB' : 'rgba(0, 71, 171, 0.08)',
                        color: isSelected ? '#FFFFFF' : '#0047AB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isSelected ? '0 4px 14px rgba(0,71,171,0.35)' : 'none',
                        transition: 'all 0.2s'
                      }}>
                        <Icon style={{ width: 23, height: 23 }} />
                      </div>

                      {isSelected ? (
                        <span style={{ fontSize: '0.68rem', fontWeight: 900, background: '#0047AB', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 99, letterSpacing: '0.04em' }}>
                          ✓ SELECTED
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#F1F5F9', color: '#64748B', padding: '0.2rem 0.55rem', borderRadius: 99 }}>
                          {cat.badge || 'Fast-Track 48h'}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: isSelected ? '#0047AB' : '#0F172A', marginBottom: '0.3rem' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {cat.desc}
                    </div>
                  </div>

                  <div style={{ marginTop: '1.1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: isSelected ? '#0047AB' : '#64748B' }}>
                    <span>{isSelected ? 'Click to Apply Now' : 'Start Registration'}</span>
                    <span style={{ fontSize: '1.1rem', lineHeight: 1, transform: isSelected ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }}>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
