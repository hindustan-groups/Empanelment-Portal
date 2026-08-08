import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Building2, HardHat, Scale, DollarSign, ChevronDown, ChevronUp, FilePlus, Grid } from 'lucide-react';
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.25rem 0.85rem 3rem 0.85rem' }}>
      
      {/* Main Guidelines White / Dark Surface Card */}
      <div style={{
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        borderRadius: 20,
        border: '1.5px solid var(--border-color, #E2E8F0)',
        padding: '1.5rem 1.15rem',
        boxShadow: '0 8px 30px rgba(0, 71, 171, 0.04)'
      }}>
        
        {/* Executive Top Banner Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingBottom: '1.25rem',
          borderBottom: '2px solid var(--border-color, #E2E8F0)',
          marginBottom: '1.5rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(0, 71, 171, 0.1)',
              color: '#0047AB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck style={{ width: 24, height: 24 }} />
            </div>
            
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
                HINDUSTAN PROJECTS • CORPORATE MANUAL FY 2026–27
              </div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary, #0F172A)', margin: 0, lineHeight: 1.25 }}>
                Vendor Empanelment Guidelines
              </h1>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', padding: '0.15rem 0.55rem', borderRadius: 99, background: 'rgba(0, 71, 171, 0.06)' }}>✓ ISO 9001:2015</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', padding: '0.15rem 0.55rem', borderRadius: 99, background: 'rgba(0, 71, 171, 0.06)' }}>✓ CVC Standards</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', padding: '0.15rem 0.55rem', borderRadius: 99, background: 'rgba(0, 71, 171, 0.06)' }}>✓ NBC 2016</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Grid on Mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
            <button
              onClick={() => setShowMatrixModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.65rem 0.5rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                borderRadius: 12,
                cursor: 'pointer',
                backgroundColor: 'rgba(0, 71, 171, 0.08)',
                color: '#0047AB',
                border: '1.5px solid rgba(0, 71, 171, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <Grid style={{ width: 14, height: 14 }} />
              <span>Category Matrix</span>
            </button>
            <button
              onClick={() => navigate('/apply')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.65rem 0.5rem',
                fontSize: '0.8rem',
                fontWeight: 900,
                borderRadius: 12,
                cursor: 'pointer',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              <FilePlus style={{ width: 14, height: 14 }} />
              <span>Apply for Empanelment</span>
            </button>
          </div>
        </div>

        {/* 4 Master Navigation Horizontal Scrollable Chips */}
        <div style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          marginBottom: '1.5rem',
          paddingBottom: '0.35rem',
          width: '100%'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content' }}>
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
                    padding: '0.55rem 0.95rem',
                    borderRadius: 9999,
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 900 : 700,
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#0047AB' : 'var(--bg-surface, #F8FAFC)',
                    color: isActive ? '#FFFFFF' : 'var(--text-primary, #0F172A)',
                    border: isActive ? '1.5px solid #0047AB' : '1px solid var(--border-color, #E2E8F0)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 4px 12px rgba(0, 71, 171, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <Icon style={{ width: 14, height: 14, flexShrink: 0, color: isActive ? '#FFFFFF' : '#0047AB' }} />
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
            <div style={{
              padding: '1.15rem 1rem',
              borderRadius: 16,
              backgroundColor: 'rgba(0, 71, 171, 0.03)',
              border: '1.5px solid rgba(0, 71, 171, 0.18)'
            }}>
              <h3 style={{
                color: '#0047AB',
                fontWeight: 900,
                fontSize: '0.95rem',
                margin: '0 0 0.85rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0, color: '#10B981' }} />
                <span>Mandatory Vendor Filing Prerequisites:</span>
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>🆔</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary, #0F172A)', display: 'block', fontSize: '0.825rem', fontWeight: 800, marginBottom: 2 }}>Valid Govt Tax Identity</strong>
                    <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>PAN Card &amp; 15-Digit GSTIN Certificate (or MSME Exemption declaration).</p>
                  </div>
                </div>

                <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>🏦</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary, #0F172A)', display: 'block', fontSize: '0.825rem', fontWeight: 800, marginBottom: 2 }}>Verified Banking Credentials</strong>
                    <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>Cancelled Cheque or Passbook with Account Number &amp; IFSC for RTGS payouts.</p>
                  </div>
                </div>

                <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>📄</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary, #0F172A)', display: 'block', fontSize: '0.825rem', fontWeight: 800, marginBottom: 2 }}>Identity Proofs (Front &amp; Back)</strong>
                    <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>Clear document scans of PAN Card and Aadhaar Card (Front &amp; Back side).</p>
                  </div>
                </div>

                <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>✍️</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary, #0F172A)', display: 'block', fontSize: '0.825rem', fontWeight: 800, marginBottom: 2 }}>Digital Legal Signature</strong>
                    <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>Digital canvas signature &amp; Place of Signing declaration on final step.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empanelment Classification Tiers */}
            <div>
              <h3 style={{ fontWeight: 900, marginBottom: '0.85rem', color: 'var(--text-primary, #0F172A)', fontSize: '1.05rem' }}>
                Empanelment Classification &amp; Capability Matrix:
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                
                {/* Class A */}
                <div style={{ padding: '1.15rem 1rem', borderRadius: 16, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '2px solid #0047AB', boxShadow: '0 6px 18px rgba(0, 71, 171, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#0047AB' }}>CLASS-A (TIER 1 PRIME)</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 900, background: 'rgba(0, 71, 171, 0.12)', color: '#0047AB' }}>PAN-INDIA</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.35rem' }}>Turnover: &gt; ₹ 5.0 Crores / Year</div>
                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      Prime EPC Contractors, Turnkey Infrastructure Firms, and Certified Lead Architects.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.75rem', color: '#64748B', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: 0 }}>
                    <li>✓ Commercial towers &amp; major civil works</li>
                    <li>✓ EMD Waiver on all active tenders</li>
                    <li>✓ Dedicated Project Procurement Desk</li>
                  </ul>
                </div>

                {/* Class B */}
                <div style={{ padding: '1.15rem 1rem', borderRadius: 16, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1.5px solid #10B981', boxShadow: '0 6px 18px rgba(16, 185, 129, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#047857' }}>CLASS-B (TIER 2 SPECIALISTS)</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 900, background: 'rgba(16, 185, 129, 0.12)', color: '#047857' }}>REGIONAL</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', marginBottom: '0.35rem' }}>Turnover: ₹ 50 Lakhs – ₹ 5.0 Crores</div>
                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      Specialist Sub-Contractors, MEP Engineers, Material Suppliers, and Interior Decorators.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.75rem', color: '#64748B', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: 0 }}>
                    <li>✓ MEP works, HVAC &amp; steel supply</li>
                    <li>✓ Fast-track 7-day milestone payment release</li>
                    <li>✓ Priority tender allocation in active zones</li>
                  </ul>
                </div>

                {/* Class C */}
                <div style={{ padding: '1.15rem 1rem', borderRadius: 16, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1.5px solid var(--border-color, #CBD5E1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#475569' }}>CLASS-C (TIER 3 SUPPLIERS)</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 900, background: 'var(--bg-surface, #F1F5F9)', color: '#475569' }}>LOCAL</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.35rem' }}>Turnover: Up to ₹ 50 Lakhs</div>
                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      Local Material Vendors, Heavy Equipment Hirers, Soil Testing Labs, and PMC Support.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.75rem', color: '#64748B', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: 0 }}>
                    <li>✓ 100% Fee Waiver for MSME UDYAM firms</li>
                    <li>✓ 1-Year Pan-India empanelment validity</li>
                    <li>✓ Direct site procurement access</li>
                  </ul>
                </div>

                {/* Class D */}
                <div style={{ padding: '1.15rem 1rem', borderRadius: 16, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1.5px solid #F59E0B', boxShadow: '0 6px 18px rgba(245, 158, 11, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#D97706' }}>CLASS-D (EMERGING / MSME)</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 900, background: 'rgba(245, 158, 11, 0.12)', color: '#D97706' }}>MICRO</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706', marginBottom: '0.35rem' }}>Turnover: Micro &amp; New Entrants</div>
                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      Specialized Skilled Artisans, Labor Supervisors, Safety Inspectors, and Niche Craftsmen.
                    </p>
                  </div>
                  <ul style={{ fontSize: '0.75rem', color: '#64748B', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: 0 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem 1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HardHat style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>NBC 2016 Structural &amp; Fire Safety Standards:</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                All empanelled contractors executing works on Hindustan Projects sites must strictly adhere to the National Building Code of India (NBC 2016).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 456:2000 Concrete Mix Standards</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>RCC work mix design M25 to M50 grade with NABL laboratory 7-day and 28-day cube strength certificates.</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1786:2008 TMT Steel Bar Specs</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Fe550D grade corrosion-resistant steel from primary producers (SAIL, TATA Tiscon, JSW Steel).</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>NBC Part 4 Fire &amp; Life Safety</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Fire NOC compliance, 2-hour fire-rated doors, wet risers &amp; automatic sprinkler systems.</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: 4 }}>IS 1893:2016 Seismic Zone Compliance</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Ductile detailing of reinforced concrete structures subjected to seismic forces in Zone III &amp; IV.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 3: COMMERCIAL & PAYOUT TERMS ════════════════════ */}
        {activeSubTab === 'commercial_terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem 1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign style={{ width: 18, height: 18, color: '#10B981' }} />
                <span>Commercial Schedule &amp; 7-Day RTGS Payout Terms:</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Hindustan Projects guarantees fast-track 7-day bank payouts for all verified milestone Running Account (RA) bills.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#047857', marginBottom: 2 }}>Tranche 1: 30% Mobilization</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Released upon GFC drawings sign-off &amp; initial site mobilization against bank guarantee.</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: 2 }}>Tranche 2: 50% Milestone Release</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Released based on certified RA bills &amp; quality audit inspection clearance.</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#D97706', marginBottom: 2 }}>Tranche 3: 20% Final Retention</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Released upon successful project handover &amp; Defect Liability Period (12-Month DLP) completion.</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 4: LEGAL, CVC & FAQ ════════════════════ */}
        {activeSubTab === 'legal_cvc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem 1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Scale style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>Frequently Asked Questions &amp; CVC Legal Guidance:</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
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
                <div key={idx} style={{ borderRadius: 12, backgroundColor: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-color, #E2E8F0)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.825rem',
                      fontWeight: 800,
                      color: 'var(--text-primary, #0F172A)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp style={{ width: 16, height: 16, color: '#0047AB' }} /> : <ChevronDown style={{ width: 16, height: 16, color: '#64748B' }} />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '0 1rem 0.85rem 1rem', fontSize: '0.78rem', color: '#475569', borderTop: '1px solid var(--border-color, #E2E8F0)', paddingTop: '0.65rem', lineHeight: 1.5 }}>
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
