import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Clock, FileCheck, Building2, Truck, Wrench, Compass, HardHat, PackageCheck } from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  heroBadge: 'Official Vendor & Contractor Registration FY 2026-27',
  heroTitleBlue: 'Hindustan',
  heroTitleRed: 'Projects',
  heroSubtitle: 'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.'
};

export default function HeroSection({ selectedCategory, setSelectedCategory, onStartForm }) {
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
              <div className="trust-label">Security</div>
              <div className="trust-value">ISO 9001:2015</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">TAT Review</div>
              <div className="trust-value">48-72 Hr Review</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
              <FileCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Process</div>
              <div className="trust-value">100% Digital</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#A855F7' }}>
              <Award style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="trust-label">Panelling</div>
              <div className="trust-value">Pan-India</div>
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
