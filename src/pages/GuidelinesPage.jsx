import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Building2, Award, HardHat, FileCheck2, Scale, DollarSign, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock, FilePlus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuidelinesPage() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('policy'); // 'policy' | 'nbc_matrix' | 'commercial_terms' | 'legal_cvc'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div style={{ maxWidth: 1050, margin: '2.5rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2.25rem' }}>
        
        {/* Executive Top Banner Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 16, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <ShieldCheck style={{ width: 34, height: 34 }} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HINDUSTAN PROJECTS • CORPORATE PROCUREMENT MANUAL FY 2026-27
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', marginTop: 2, marginBottom: 2 }}>
                Vendor & Contractor Empanelment Policy & Guidelines
              </h1>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 4 }}>
                <span>✓ ISO 9001:2015 Certified Portal</span>
                <span>•</span>
                <span>✓ CVC Statutory Procurement Compliant</span>
                <span>•</span>
                <span>✓ empanel.hindustanprojects.in</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/apply')} className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
              <FilePlus style={{ width: 16, height: 16 }} />
              <span>Apply for Empanelment</span>
            </button>
          </div>
        </div>

        {/* 4 Master Navigation Modules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'policy', label: '1. Eligibility & Tier Rating', icon: Building2 },
            { id: 'nbc_matrix', label: '2. NBC Building Classifications', icon: HardHat },
            { id: 'commercial_terms', label: '3. Rates & Milestone Payments', icon: DollarSign },
            { id: 'legal_cvc', label: '4. Legal, CVC & FAQ Support', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 12,
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 900 : 700,
                  cursor: 'pointer',
                  border: isActive ? '2px solid #0047AB' : '1px solid var(--border-color)',
                  background: isActive ? '#0047AB' : 'var(--bg-surface)',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 71, 171, 0.25)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.18s ease'
                }}
              >
                <Icon style={{ width: 16, height: 16, color: isActive ? '#FFFFFF' : '#0047AB' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ════════════════════ MODULE 1: ELIGIBILITY & TIER RATING ════════════════════ */}
        {activeSubTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.9rem', lineHeight: 1.65 }}>
            
            {/* Essential Prerequisites Checklist */}
            <div style={{ padding: '1.35rem', borderRadius: 16, backgroundColor: 'rgba(0, 71, 171, 0.04)', border: '1.5px solid rgba(0, 71, 171, 0.2)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 900, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <CheckCircle2 style={{ width: 20, height: 20 }} />
                <span>Mandatory Vendor Filing Prerequisites:</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>🆔 Valid Govt Tax Identity</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>10-Digit PAN Card & 15-Digit GSTIN Certificate (or MSME GST exemption declaration).</span>
                </div>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>🏦 Verified Banking Credentials</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cancelled Cheque or Passbook 1st page showing Account Number & IFSC code.</span>
                </div>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>📄 Identity Documents (Front & Back)</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mandatory upload of PAN Card and Aadhaar Card (Front & Back side scans).</span>
                </div>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>✍️ Digital Legal Signature</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digital canvas signature & Place of Signing declaration on final step.</span>
                </div>
              </div>
            </div>

            {/* Empanelment Classification Tiers */}
            <div>
              <h3 style={{ fontWeight: 900, marginBottom: '0.85rem', color: '#0F172A', fontSize: '1.1rem' }}>
                Vendor Classification & Tier Capability Rating Matrix:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                
                {/* Class A */}
                <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '2px solid #0047AB', boxShadow: '0 4px 16px rgba(0,71,171,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#0047AB', fontWeight: 900, fontSize: '1.05rem' }}>CLASS-A (TIER 1 PRIME VENDORS)</span>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(0,71,171,0.1)', color: '#0047AB', fontSize: '0.72rem', fontWeight: 900 }}>PAN-INDIA TENDERS</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    Prime EPC Contractors, Turnkey Infrastructure Firms, and Certified Lead Architects.
                  </p>
                  <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li><strong>Annual Turnover Criteria:</strong> &gt; ₹ 5.0 Crores per annum.</li>
                    <li><strong>Execution Eligibility:</strong> Full commercial towers, high-rise residential & major civil works.</li>
                    <li><strong>EMD Benefit:</strong> EMD Waiver on all active Hindustan Projects tenders.</li>
                  </ul>
                </div>

                {/* Class B */}
                <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1.5px solid #10B981', boxShadow: '0 4px 16px rgba(16,185,129,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#047857', fontWeight: 900, fontSize: '1.05rem' }}>CLASS-B (TIER 2 SPECIALISTS)</span>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#047857', fontSize: '0.72rem', fontWeight: 900 }}>REGIONAL CONTRACTS</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    Specialist Sub-Contractors, MEP Engineers, Material Suppliers, and Interior Decorators.
                  </p>
                  <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li><strong>Annual Turnover Criteria:</strong> ₹ 50 Lakhs to ₹ 5.0 Crores per annum.</li>
                    <li><strong>Execution Eligibility:</strong> MEP works, HVAC installation, structural steel supply & decor.</li>
                    <li><strong>Fast-Track Payouts:</strong> 7-day milestone payment release upon site verification.</li>
                  </ul>
                </div>

                {/* Class C */}
                <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1.5px solid #F59E0B' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#B45309', fontWeight: 900, fontSize: '1.05rem' }}>CLASS-C (TIER 3 MSME / FREELANCERS)</span>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 99, background: 'rgba(245,158,11,0.1)', color: '#B45309', fontSize: '0.72rem', fontWeight: 900 }}>MSME FAST-TRACK</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    Sole Proprietors, MSME Udyam Enterprise Holders, Freelance Architects & Consultants.
                  </p>
                  <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li><strong>Annual Turnover Criteria:</strong> &lt; ₹ 50 Lakhs (or new startup entity).</li>
                    <li><strong>Fee Exemption:</strong> ₹ 0 Registration Fee under MSME Udyam Waiver.</li>
                    <li><strong>Simplified Registration:</strong> Fast-track 48-hour online clearance.</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ MODULE 2: NBC BUILDING CODE MATRIX ════════════════════ */}
        {activeSubTab === 'nbc_matrix' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.65 }}>
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, backgroundColor: 'rgba(0,71,171,0.05)', border: '1px solid rgba(0,71,171,0.2)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0047AB', marginBottom: 2 }}>
                National Building Code of India (NBC 2016) Categorization Matrix:
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                Empanelment sub-categories follow the official NBC Group A through Group J statutory classifications:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {[
                { group: 'Group A: Residential', desc: 'A-1 Lodging/Rooming, A-2 Private Dwellings, A-3 Dormitories, A-4 Apartments, A-5 Hotels & Luxury Hospitality.' },
                { group: 'Group B: Educational', desc: 'B-1 Primary & Senior Secondary Schools, B-2 Training Institutions & Universities.' },
                { group: 'Group C: Institutional', desc: 'C-1 Hospitals & Sanatoria, C-2 Custodial Institutions (Orphanages/Elder care), C-3 Mental & Penal Facilities.' },
                { group: 'Group D: Assembly', desc: 'D-1 Theaters (>1k seats), D-2 Auditoriums (<1k seats), D-3 Museums & Places of Worship, D-4 Outdoor Stadiums.' },
                { group: 'Group E: Business', desc: 'E-1 Commercial Offices & Banks, E-2 R&D Laboratories, E-3 Telecom Hubs, E-4 Data Centers.' },
                { group: 'Group F: Mercantile', desc: 'F-1 Shops, Stores & Markets, F-2 Large Shopping Malls & Underground Departmental Stores.' },
                { group: 'Group G: Industrial', desc: 'G-1 to G-3 Factories, Assembly Plants, Oil Refineries & Power Generation Plants.' },
                { group: 'Group H: Storage', desc: 'H-1 & H-2 Commercial Warehouses, Cold Storages, Freight Depots & Transit Sheds.' },
                { group: 'Group J: Hazardous', desc: 'J-1 to J-3 Processing & storage of explosive, highly combustible, or toxic chemical materials.' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 900, color: '#0047AB', fontSize: '0.9rem', marginBottom: 2 }}>{item.group}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ MODULE 3: COMMERCIAL RATE CARD & PAYMENT TERMS ════════════════════ */}
        {activeSubTab === 'commercial_terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.65 }}>
            
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 900, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <DollarSign style={{ width: 20, height: 20 }} />
                <span>Commercial Rate Card & Payment Milestone Policy Framework:</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', marginBottom: 2 }}>Competitive Quoting</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Scope-Based Rates</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Determined per project via competitive bidding & NBC classification.</div>
                </div>

                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', marginBottom: 2 }}>Fast-Track Payment Release</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Direct RTGS / NEFT</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Payouts released within 7 working days of milestone audit clearance.</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: '#0F172A' }}>Standard Consultancy & Execution Milestone Payment Schedule:</strong>
                <ol style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Milestone 1 (Concept & Layout Approval):</strong> 30% Payment Tranche upon client sign-off of floor plans & 3D elevations.</li>
                  <li><strong>Milestone 2 (Good For Construction GFC & MEP Drawings):</strong> 50% Payment Tranche upon technical committee release of GFC structural & MEP drawings.</li>
                  <li><strong>Milestone 3 (Site Quality Audit & Final Completion):</strong> 20% Retention Tranche upon physical site milestone clearance certificate.</li>
                </ol>
              </div>
            </div>

            {/* Mandatory Document Naming Convention */}
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.04)', border: '1px solid rgba(0, 71, 171, 0.2)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 900, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <FileCheck2 style={{ width: 18, height: 18 }} />
                <span>Mandatory Document Naming Convention:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', marginBottom: '0.5rem' }}>All technical drawings and project submissions must strictly follow the corporate format:</p>
              <div style={{ padding: '0.75rem 1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', fontFamily: 'monospace', fontWeight: 900, color: '#0047AB', fontSize: '0.875rem' }}>
                DDMMYY-HP-[PROJECT TITLE]-[DOCUMENT NAME]-R[REVISION]
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Example: <code>280726-HP-JaipurCommercial-FloorPlans-R0.pdf</code>
              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ MODULE 4: LEGAL, CVC & FAQ SUPPORT ════════════════════ */}
        {activeSubTab === 'legal_cvc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.875rem', lineHeight: 1.65 }}>
            
            {/* IP Rights & CVC Code */}
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 900, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <Scale style={{ width: 20, height: 20 }} />
                <span>Intellectual Property, Confidentiality & CVC Anti-Corruption Code:</span>
              </h3>
              <ul style={{ listStyle: 'square', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Intellectual Property Rights:</strong> All CAD drawings, BIM models, and architectural renders created for Hindustan Projects shall be solely owned by <strong>Hindustan Projects</strong>.</li>
                <li><strong>CVC Anti-Corruption Compliance:</strong> Hindustan Projects enforces a strict zero-tolerance policy towards non-ethical practices, gifts, or kickbacks as per Central Vigilance Commission guidelines.</li>
                <li><strong>Independent Contractor Status:</strong> Empanelment is on a Principal-to-Principal basis without employer-employee liabilities.</li>
              </ul>
            </div>

            {/* Frequently Asked Questions (FAQ Accordion) */}
            <div>
              <h3 style={{ fontWeight: 900, marginBottom: '0.85rem', color: '#0F172A', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Empanelment Frequently Asked Questions (FAQ):</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { q: 'Which documents are mandatory for online empanelment filing?', a: 'PAN Card Copy, Aadhaar Card (Front Side), Aadhaar Card (Back Side), and Cancelled Cheque / Passbook copy are 100% MANDATORY for all applicants.' },
                  { q: 'How long does the verification and approval process take?', a: 'Verification is completed within 48 to 72 hours. Once cleared, your Class-A/B Tier Rating certificate is issued digitally.' },
                  { q: 'Can MSME / Sole Proprietors apply without GSTIN?', a: 'Yes! Sole proprietors with annual turnover below ₹20 Lakhs can check "No GSTIN / Exempt" and enjoy ₹0 fee MSME registration waiver.' },
                  { q: 'What is the tracking ID format and how do I check my status?', a: 'Tracking IDs follow the sequential format starting with HP-EMP-025... (e.g. HP-EMP-025). Enter this reference code on the Track page (/track) anytime.' },
                  { q: 'How are vendor payouts processed after work completion?', a: 'All vendor payments are released directly via RTGS / NEFT to your verified bank account within 7 working days of milestone clearance.' }
                ].map((faq, idx) => (
                  <div key={idx} style={{ borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                    <button
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '0.9rem 1.25rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '0.875rem', color: '#0F172A' }}
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <ChevronUp style={{ width: 16, height: 16, color: '#0047AB' }} /> : <ChevronDown style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />}
                    </button>
                    {openFaq === idx && (
                      <div style={{ padding: '0 1.25rem 1rem 1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/apply')} className="btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', borderRadius: 12 }}>
            <span>Proceed to Empanelment Registration Wizard</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </div>

      </div>
    </div>
  );
}
