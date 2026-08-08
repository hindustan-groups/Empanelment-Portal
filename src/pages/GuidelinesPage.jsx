import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Building2, Award, HardHat, FileCheck2, Scale, DollarSign, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock, FilePlus, Download, Zap, RefreshCw, Layers, Calculator, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EligibilityCalculator from '../components/EligibilityCalculator';
import CategoryMatrixModal from '../components/CategoryMatrixModal';

export default function GuidelinesPage() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('policy'); // 'policy' | 'nbc_matrix' | 'commercial_terms' | 'legal_cvc'
  const [openFaq, setOpenFaq] = useState(null);
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="guidelines-page-container">
      <div className="guidelines-card">
        
        {/* Executive Top Banner Header */}
        <div className="guidelines-header-bar">
          <div className="guidelines-header-info">
            <div className="guidelines-header-icon-box">
              <ShieldCheck style={{ width: 26, height: 26 }} />
            </div>
            <div>
              <div className="guidelines-header-tag">
                HINDUSTAN PROJECTS • CORPORATE MANUAL FY 2026–27
              </div>
              <h1 className="guidelines-header-title">
                Vendor Empanelment Guidelines
              </h1>
              <div className="guidelines-header-badges">
                <span className="guidelines-badge-pill">✓ ISO 9001:2015</span>
                <span className="guidelines-badge-pill">✓ CVC Standards</span>
                <span className="guidelines-badge-pill">✓ NBC 2016</span>
              </div>
            </div>
          </div>

          <div className="guidelines-header-actions">
            <button
              onClick={() => setShowMatrixModal(true)}
              className="guidelines-btn-secondary"
            >
              <Grid style={{ width: 15, height: 15 }} />
              <span>Category Matrix</span>
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="btn-accent guidelines-btn-primary"
            >
              <FilePlus style={{ width: 15, height: 15 }} />
              <span>Apply for Empanelment</span>
            </button>
          </div>
        </div>

        {/* 4 Master Navigation Horizontal Scrollable Chips */}
        <div className="guidelines-nav-scroll-wrapper">
          <div className="guidelines-nav-chip-bar">
            {[
              { id: 'policy', label: '1. Tier Classification', icon: Building2 },
              { id: 'nbc_matrix', label: '2. NBC Code Standards', icon: HardHat },
              { id: 'commercial_terms', label: '3. Rates & Payout SLA', icon: DollarSign },
              { id: 'legal_cvc', label: '4. Legal Code & FAQs', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`guidelines-chip-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════ MODULE 1: ELIGIBILITY & TIER RATING ════════════════════ */}
        {activeSubTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Essential Prerequisites Checklist */}
            <div className="guidelines-prereq-wrapper">
              <h3 className="guidelines-section-subheading">
                <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0, color: '#10B981' }} />
                <span>Mandatory Vendor Filing Prerequisites:</span>
              </h3>
              <div className="guidelines-prereq-grid">
                <div className="guidelines-prereq-card">
                  <div className="guidelines-prereq-icon">🆔</div>
                  <div>
                    <strong className="guidelines-prereq-title">Valid Govt Tax Identity</strong>
                    <p className="guidelines-prereq-desc">PAN Card &amp; 15-Digit GSTIN Certificate (or MSME Exemption declaration).</p>
                  </div>
                </div>
                <div className="guidelines-prereq-card">
                  <div className="guidelines-prereq-icon">🏦</div>
                  <div>
                    <strong className="guidelines-prereq-title">Verified Banking Credentials</strong>
                    <p className="guidelines-prereq-desc">Cancelled Cheque or Passbook with Account Number &amp; IFSC for RTGS payouts.</p>
                  </div>
                </div>
                <div className="guidelines-prereq-card">
                  <div className="guidelines-prereq-icon">📄</div>
                  <div>
                    <strong className="guidelines-prereq-title">Identity Proofs (Front &amp; Back)</strong>
                    <p className="guidelines-prereq-desc">Clear document scans of PAN Card and Aadhaar Card (Front &amp; Back side).</p>
                  </div>
                </div>
                <div className="guidelines-prereq-card">
                  <div className="guidelines-prereq-icon">✍️</div>
                  <div>
                    <strong className="guidelines-prereq-title">Digital Legal Signature</strong>
                    <p className="guidelines-prereq-desc">Digital canvas signature &amp; Place of Signing declaration on final step.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empanelment Classification Tiers */}
            <div>
              <h3 className="guidelines-section-heading">
                Empanelment Classification &amp; Capability Matrix:
              </h3>
              <div className="guidelines-tier-grid">
                
                {/* Class A */}
                <div className="guidelines-tier-card tier-a">
                  <div>
                    <div className="guidelines-tier-header">
                      <span className="guidelines-tier-name tier-a-color">CLASS-A (TIER 1 PRIME)</span>
                      <span className="guidelines-tier-badge tier-a-badge">PAN-INDIA</span>
                    </div>
                    <div className="guidelines-tier-turnover">Turnover: &gt; ₹ 5.0 Crores / Year</div>
                    <p className="guidelines-tier-desc">
                      Prime EPC Contractors, Turnkey Infrastructure Firms, and Certified Lead Architects.
                    </p>
                  </div>
                  <ul className="guidelines-tier-list">
                    <li>✓ Commercial towers &amp; major civil works</li>
                    <li>✓ EMD Waiver on all active tenders</li>
                    <li>✓ Dedicated Project Procurement Desk</li>
                  </ul>
                </div>

                {/* Class B */}
                <div className="guidelines-tier-card tier-b">
                  <div>
                    <div className="guidelines-tier-header">
                      <span className="guidelines-tier-name tier-b-color">CLASS-B (TIER 2 SPECIALISTS)</span>
                      <span className="guidelines-tier-badge tier-b-badge">REGIONAL</span>
                    </div>
                    <div className="guidelines-tier-turnover">Turnover: ₹ 50 Lakhs – ₹ 5.0 Crores</div>
                    <p className="guidelines-tier-desc">
                      Specialist Sub-Contractors, MEP Engineers, Material Suppliers, and Interior Decorators.
                    </p>
                  </div>
                  <ul className="guidelines-tier-list">
                    <li>✓ MEP works, HVAC &amp; steel supply</li>
                    <li>✓ Fast-track 7-day milestone payment release</li>
                    <li>✓ Priority tender allocation in active zones</li>
                  </ul>
                </div>

                {/* Class C */}
                <div className="guidelines-tier-card tier-c">
                  <div>
                    <div className="guidelines-tier-header">
                      <span className="guidelines-tier-name tier-c-color">CLASS-C (TIER 3 SUPPLIERS)</span>
                      <span className="guidelines-tier-badge tier-c-badge">LOCAL</span>
                    </div>
                    <div className="guidelines-tier-turnover">Turnover: Up to ₹ 50 Lakhs</div>
                    <p className="guidelines-tier-desc">
                      Local Material Vendors, Heavy Equipment Hirers, Soil Testing Labs, and PMC Support.
                    </p>
                  </div>
                  <ul className="guidelines-tier-list">
                    <li>✓ 100% Fee Waiver for MSME UDYAM firms</li>
                    <li>✓ 1-Year Pan-India empanelment validity</li>
                    <li>✓ Direct site procurement access</li>
                  </ul>
                </div>

                {/* Class D */}
                <div className="guidelines-tier-card tier-d">
                  <div>
                    <div className="guidelines-tier-header">
                      <span className="guidelines-tier-name tier-d-color">CLASS-D (EMERGING / MSME)</span>
                      <span className="guidelines-tier-badge tier-d-badge">MICRO</span>
                    </div>
                    <div className="guidelines-tier-turnover">Turnover: Micro &amp; New Entrants</div>
                    <p className="guidelines-tier-desc">
                      Specialized Skilled Artisans, Labor Supervisors, Safety Inspectors, and Niche Craftsmen.
                    </p>
                  </div>
                  <ul className="guidelines-tier-list">
                    <li>✓ Simplified single-page verification</li>
                    <li>✓ Smart PVC QR Gate Pass enabled</li>
                    <li>✓ Direct onboarding into corporate roster</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ MODULE 2: NBC BUILDING CODE STANDARDS ════════════════════ */}
        {activeSubTab === 'nbc_matrix' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="guidelines-module-banner">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HardHat style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>NBC 2016 Structural &amp; Fire Safety Standards:</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                All empanelled contractors executing works on Hindustan Projects sites must strictly adhere to the National Building Code of India (NBC 2016).
              </p>
            </div>

            <div className="guidelines-tier-grid">
              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 456:2000 Concrete Mix Standards</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>RCC work mix design M25 to M50 grade with NABL laboratory 7-day and 28-day cube strength certificates.</p>
              </div>

              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1786:2008 TMT Steel Bar Specs</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Fe550D grade corrosion-resistant steel from primary producers (SAIL, TATA Tiscon, JSW Steel).</p>
              </div>

              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>NBC Part 4 Fire &amp; Life Safety</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Fire NOC compliance, 2-hour fire-rated doors, wet risers &amp; automatic sprinkler systems.</p>
              </div>

              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1893:2016 Seismic Zone Compliance</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Ductile detailing of reinforced concrete structures subjected to seismic forces in Zone III &amp; IV.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 3: COMMERCIAL & PAYOUT TERMS ════════════════════ */}
        {activeSubTab === 'commercial_terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="guidelines-module-banner">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign style={{ width: 20, height: 20, color: '#10B981' }} />
                <span>Commercial Schedule &amp; 7-Day RTGS Payout Terms:</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Hindustan Projects guarantees fast-track 7-day bank payouts for all verified milestone Running Account (RA) bills.
              </p>
            </div>

            <div className="guidelines-tier-grid">
              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#047857', marginBottom: 2 }}>Tranche 1: 30% Mobilization</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Released upon GFC drawings sign-off &amp; initial site mobilization against bank guarantee.</p>
              </div>

              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0047AB', marginBottom: 2 }}>Tranche 2: 50% Milestone Release</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Released based on certified RA bills &amp; quality audit inspection clearance.</p>
              </div>

              <div className="guidelines-tier-card">
                <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#D97706', marginBottom: 2 }}>Tranche 3: 20% Final Retention</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Released upon successful project handover &amp; Defect Liability Period (12-Month DLP) completion.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 4: LEGAL, CVC & FAQ ════════════════════ */}
        {activeSubTab === 'legal_cvc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="guidelines-module-banner">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Scale style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Frequently Asked Questions &amp; CVC Legal Guidance:</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Clarifications regarding empanelment validity, MSME fee waivers, site gate passes, and document re-submission.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { q: 'What is the validity period of the Empanelment Certificate?', a: 'Class-A certificates are valid for 3 Financial Years. Class-B, Class-C, and Class-D certificates are valid for 1 Financial Year and can be renewed online.' },
                { q: 'How does the MSME Processing Fee Waiver work?', a: 'Firms registered under UDYAM MSME with valid URN certificate are 100% exempt from the processing fee under Central Public Procurement Policy.' },
                { q: 'How does the Smart PVC Gate Pass QR Code work on site?', a: 'Once approved, vendors can generate Site Gate Passes (valid for 1, 3, or 7 days) from their Vendor Dashboard. Site security guards scan the pass QR code to verify live authorization.' },
                { q: 'What happens if my application requires clarification?', a: 'Our procurement committee will send an email with document update instructions. You can track your status anytime on the /track page.' }
              ].map((faq, idx) => (
                <div key={idx} style={{ borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.15rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp style={{ width: 16, height: 16, color: '#0047AB' }} /> : <ChevronDown style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '0 1.15rem 0.85rem 1.15rem', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', lineHeight: 1.5 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Interactive Financial Eligibility Calculator */}
        <div style={{ marginTop: '2rem' }}>
          <EligibilityCalculator onApplyCategory={() => navigate('/apply')} />
        </div>

        {/* Modal for 13 Category Statutory Matrix */}
        {showMatrixModal && (
          <CategoryMatrixModal onClose={() => setShowMatrixModal(false)} />
        )}

      </div>
    </div>
  );
}
