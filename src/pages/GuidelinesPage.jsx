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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 260 }}>
            <div style={{ padding: '0.75rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', flexShrink: 0 }}>
              <ShieldCheck style={{ width: 28, height: 28 }} />
            </div>
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                HINDUSTAN PROJECTS • CORPORATE MANUAL &amp; SPECIFICATIONS FY 2026–27
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2, marginBottom: 2 }}>
                Vendor &amp; Contractor Empanelment Policy Guidelines
              </h1>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 4 }}>
                <span>✓ ISO 9001:2015 Verified</span>
                <span>•</span>
                <span>✓ CVC Anti-Bribery Standards</span>
                <span>•</span>
                <span>✓ NBC 2016 Compliant</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowMatrixModal(true)}
              style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem', fontWeight: 800, borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', background: 'rgba(0,71,171,0.08)', color: '#0047AB', border: '1px solid rgba(0,71,171,0.2)' }}
            >
              <Grid style={{ width: 16, height: 16 }} />
              <span>Category Matrix</span>
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="btn-accent"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <FilePlus style={{ width: 16, height: 16 }} />
              <span>Apply for Empanelment</span>
            </button>
          </div>
        </div>

        {/* 4 Master Navigation Modules */}
        <div className="guidelines-tab-grid">
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
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 12,
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 900 : 700,
                  cursor: 'pointer',
                  border: isActive ? '2px solid #0047AB' : '1px solid var(--border-color)',
                  background: isActive ? '#0047AB' : 'var(--bg-surface)',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: isActive ? '0 4px 12px rgba(0, 71, 171, 0.2)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  justifyContent: 'center',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon style={{ width: 15, height: 15, color: isActive ? '#FFFFFF' : '#0047AB', flexShrink: 0 }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ════════════════════ MODULE 1: ELIGIBILITY & TIER RATING ════════════════════ */}
        {activeSubTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            
            {/* Essential Prerequisites Checklist */}
            <div style={{ padding: '1.25rem 1.5rem', borderRadius: 16, backgroundColor: 'rgba(0, 71, 171, 0.04)', border: '1.5px solid rgba(0, 71, 171, 0.2)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 900, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1.05rem' }}>
                <CheckCircle2 style={{ width: 20, height: 20, flexShrink: 0, color: '#10B981' }} />
                <span>Mandatory Vendor Filing Prerequisites:</span>
              </h3>
              <div className="guidelines-prereq-grid">
                <div className="guidelines-prereq-card">
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>🆔 Valid Govt Tax Identity</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>10-Digit PAN Card &amp; 15-Digit GSTIN Certificate (or MSME GST exemption declaration).</span>
                </div>
                <div className="guidelines-prereq-card">
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>🏦 Verified Banking Credentials</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cancelled Cheque or Passbook showing Account Number &amp; IFSC code for RTGS payout.</span>
                </div>
                <div className="guidelines-prereq-card">
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>📄 Identity Proofs (Front &amp; Back)</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mandatory upload of PAN Card and Aadhaar Card (Front &amp; Back side scans).</span>
                </div>
                <div className="guidelines-prereq-card">
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>✍️ Digital Legal Signature</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Digital canvas signature &amp; Place of Signing declaration on final step.</span>
                </div>
              </div>
            </div>

            {/* Empanelment Classification Tiers */}
            <div>
              <h3 style={{ fontWeight: 900, marginBottom: '1rem', color: '#0F172A', fontSize: '1.1rem' }}>
                Empanelment Classification &amp; Capability Matrix:
              </h3>
              <div className="guidelines-tier-grid">
                
                {/* Class A */}
                <div className="guidelines-tier-card tier-a">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ color: '#0047AB', fontWeight: 900, fontSize: '0.95rem' }}>CLASS-A (TIER 1 PRIME)</span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(0,71,171,0.12)', color: '#0047AB', fontSize: '0.725rem', fontWeight: 900 }}>PAN-INDIA</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                      Prime EPC Contractors, Turnkey Infrastructure Firms, and Certified Lead Architects.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: 0 }}>
                    <li><strong>Turnover:</strong> &gt; ₹ 5.0 Crores per annum.</li>
                    <li><strong>Eligibility:</strong> Commercial towers &amp; major civil works.</li>
                    <li><strong>EMD Benefit:</strong> EMD Waiver on active tenders.</li>
                  </ul>
                </div>

                {/* Class B */}
                <div className="guidelines-tier-card tier-b">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ color: '#047857', fontWeight: 900, fontSize: '0.95rem' }}>CLASS-B (TIER 2 SPECIALISTS)</span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(16,185,129,0.12)', color: '#047857', fontSize: '0.725rem', fontWeight: 900 }}>REGIONAL</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                      Specialist Sub-Contractors, MEP Engineers, Material Suppliers, and Interior Decorators.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: 0 }}>
                    <li><strong>Turnover:</strong> ₹ 50 Lakhs to ₹ 5.0 Crores per annum.</li>
                    <li><strong>Eligibility:</strong> MEP works, HVAC &amp; steel supply.</li>
                    <li><strong>Payouts:</strong> 7-day milestone payment release.</li>
                  </ul>
                </div>

                {/* Class C */}
                <div className="guidelines-tier-card tier-c">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ color: '#64748B', fontWeight: 900, fontSize: '0.95rem' }}>CLASS-C (TIER 3 SUPPLIERS)</span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'var(--bg-surface)', color: '#64748B', fontSize: '0.725rem', fontWeight: 900 }}>LOCAL</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                      Local Material Vendors, Heavy Equipment Hirers, Soil Testing Labs, and PMC Support.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: 0 }}>
                    <li><strong>Turnover:</strong> Up to ₹ 50 Lakhs per annum.</li>
                    <li><strong>MSME Exemption:</strong> 100% Fee Waiver for UDYAM.</li>
                    <li><strong>Empanelment:</strong> Valid for 1 Financial Year.</li>
                  </ul>
                </div>

                {/* Class D */}
                <div className="guidelines-tier-card tier-d">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ color: '#D97706', fontWeight: 900, fontSize: '0.95rem' }}>CLASS-D (EMERGING / MSME)</span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(245,158,11,0.12)', color: '#D97706', fontSize: '0.725rem', fontWeight: 900 }}>MICRO</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                      Specialized Skilled Artisans, Labor Supervisors, Safety Inspectors, and Niche Craftsmen.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: 0 }}>
                    <li><strong>Turnover:</strong> New Entrants &amp; Micro Firms.</li>
                    <li><strong>Fast-Track:</strong> Simplified single-page verification.</li>
                    <li><strong>Site Pass:</strong> Smart PVC Gate Pass enabled.</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ MODULE 2: NBC BUILDING CODE STANDARDS ════════════════════ */}
        {activeSubTab === 'nbc_matrix' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HardHat style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>NBC 2016 Structural &amp; Fire Safety Compliance Standards:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                All empanelled contractors executing works on Hindustan Projects commercial &amp; residential sites must strictly adhere to the National Building Code of India (NBC 2016).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.15rem' }}>
              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 456:2000 Concrete Mix Standards</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>RCC work mix design M25 to M50 grade with NABL laboratory 7-day and 28-day cube strength certificates.</p>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1786:2008 TMT Steel Bar Specs</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fe550D grade corrosion-resistant steel from primary producers (SAIL, TATA Tiscon, JSW Steel).</p>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>NBC Part 4 Fire &amp; Life Safety</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fire NOC compliance, 2-hour fire-rated doors, wet risers &amp; automatic sprinkler systems.</p>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1893:2016 Seismic Zone Compliance</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ductile detailing of reinforced concrete structures subjected to seismic forces in Zone III &amp; IV.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 3: COMMERCIAL & PAYOUT TERMS ════════════════════ */}
        {activeSubTab === 'commercial_terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign style={{ width: 20, height: 20, color: '#10B981' }} />
                <span>Commercial Schedule &amp; 7-Day RTGS Payout Terms:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Hindustan Projects guarantees fast-track 7-day bank payouts for all verified milestone Running Account (RA) bills.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.15rem' }}>
              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857', marginBottom: 2 }}>Tranche 1: 30% Advance / Mobilization</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Released upon GFC drawings sign-off &amp; initial site mobilization against bank guarantee.</p>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: 2 }}>Tranche 2: 50% Milestone Release</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Released based on certified RA bills &amp; quality audit inspection clearance.</p>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F59E0B', marginBottom: 2 }}>Tranche 3: 20% Final Clearance &amp; Retention</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Released upon successful project handover &amp; Defect Liability Period (12-Month DLP) completion.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 4: LEGAL, CVC & FAQ ════════════════════ */}
        {activeSubTab === 'legal_cvc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Scale style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Frequently Asked Questions &amp; CVC Legal Guidance:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Clarifications regarding empanelment validity, MSME fee waivers, site gate passes, and document re-submission.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { q: 'What is the validity period of the Empanelment Certificate?', a: 'Class-A certificates are valid for 3 Financial Years. Class-B, Class-C, and Class-D certificates are valid for 1 Financial Year and can be renewed online.' },
                { q: 'How does the MSME Processing Fee Waiver work?', a: 'Firms registered under UDYAM MSME with valid URN certificate are 100% exempt from the processing fee under Central Public Procurement Policy.' },
                { q: 'How does the Smart PVC Gate Pass QR Code work on site?', a: 'Once approved, vendors can generate Site Gate Passes (valid for 1, 3, or 7 days) from their Vendor Dashboard. Site security guards scan the pass QR code to verify live authorization.' },
                { q: 'What happens if my application requires clarification?', a: 'Our procurement committee will send an email with document update instructions. You can track your status anytime on the /track page.' }
              ].map((faq, idx) => (
                <div key={idx} style={{ borderRadius: 14, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: '#0F172A'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp style={{ width: 18, height: 18, color: '#0047AB' }} /> : <ChevronDown style={{ width: 18, height: 18, color: 'var(--text-muted)' }} />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '0 1.25rem 1rem 1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Interactive Financial Eligibility Calculator */}
        <div style={{ marginTop: '2.5rem' }}>
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
