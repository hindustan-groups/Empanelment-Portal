import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Clock, FileCheck, Building2, Truck, Wrench, Compass, HardHat, PackageCheck } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  heroBadge: 'Official Vendor & Contractor Registration FY 2026-27',
  heroTitleBlue: 'Hindustan',
  heroTitleRed: 'Projects',
  heroSubtitle: 'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.',
  ongoingProjectsCount: '10+',
  activePipelineValue: '₹ 100 Cr+',
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
          Partner with <span className="text-blue">{siteConfig.heroTitleBlue || 'Hindustan'}</span> <span className="text-red">{siteConfig.heroTitleRed || 'Projects'}</span>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          padding: '1.25rem 2rem',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 50%, #0047AB 100%)',
          color: 'white',
          boxShadow: '0 12px 32px rgba(0, 71, 171, 0.25)',
          marginBottom: '3.5rem',
          textAlign: 'center'
        }}>
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
              {siteConfig.activePipelineValue || '₹ 100 Cr+'}
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

        {/* Category Grid */}
        <div className="category-section">
          <h2 className="category-title">Select Empanelment Category</h2>
          <p className="category-subtitle">Click your primary business line to start application form</p>

          <div className="category-grid">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="category-icon">
                    <Icon style={{ width: 24, height: 24 }} />
                  </div>
                  <div>
                    <div className="category-name">{cat.name}</div>
                    <div className="category-desc">{cat.desc}</div>
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
