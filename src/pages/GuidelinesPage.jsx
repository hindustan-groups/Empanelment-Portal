import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertTriangle, Building, Award, HardHat, FileCheck2, Scale, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuidelinesPage() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('policy'); // 'policy' | 'architect_terms' | 'disciplines'

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
            <ShieldCheck style={{ width: 28, height: 28 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Vendor & Architect Empanelment Manual</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hindustan Projects Corporate Procurement & Appointment Agreement Policy</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveSubTab('policy')}
            className={`btn-secondary ${activeSubTab === 'policy' ? 'active' : ''}`}
            style={{ backgroundColor: activeSubTab === 'policy' ? '#0047AB' : 'var(--bg-surface)', color: activeSubTab === 'policy' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <ShieldCheck style={{ width: 16, height: 16 }} />
            <span>General Empanelment Policy</span>
          </button>

          <button 
            onClick={() => setActiveSubTab('architect_terms')}
            className={`btn-secondary ${activeSubTab === 'architect_terms' ? 'active' : ''}`}
            style={{ backgroundColor: activeSubTab === 'architect_terms' ? '#0047AB' : 'var(--bg-surface)', color: activeSubTab === 'architect_terms' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <FileText style={{ width: 16, height: 16 }} />
            <span>Architect & Consultant Appointment Terms</span>
          </button>

          <button 
            onClick={() => setActiveSubTab('disciplines')}
            className={`btn-secondary ${activeSubTab === 'disciplines' ? 'active' : ''}`}
            style={{ backgroundColor: activeSubTab === 'disciplines' ? '#0047AB' : 'var(--bg-surface)', color: activeSubTab === 'disciplines' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <HardHat style={{ width: 16, height: 16 }} />
            <span>Professional Disciplines List</span>
          </button>
        </div>

        {/* TAB 1: General Policy */}
        {activeSubTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
            
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.05)', border: '1px solid rgba(0, 71, 171, 0.2)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText style={{ width: 18, height: 18 }} />
                <span>Mandatory Statutory Checklist:</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                  <span><strong>Active GSTIN & PAN Card:</strong> Matching registered corporate title.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                  <span><strong>Audited Turnovers:</strong> Balance Sheets for FY 2023-24, 2024-25 & 2025-26.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                  <span><strong>Banking Verification:</strong> Cancelled Cheque / Solvency Certificate.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Empanelment Classification Tiers:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: '#0047AB', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Class A (EPC Contractors & Major Firms)</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Annual Turnover &gt; ₹ 5.0 Crores with proven PSU/Corporate execution track record.</p>
                </div>

                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: '#0047AB', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Class B (Suppliers & Consultants)</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Turnover ₹ 50 Lakhs - ₹ 5 Crores with ISO quality compliance certification.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Architect & Consultant Appointment Terms (Extracted from Document Images) */}
        {activeSubTab === 'architect_terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            
            {/* Commercial Rate Card & Procurement Fee Framework */}
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign style={{ width: 18, height: 18 }} />
                <span>Commercial Rate Card & Procurement Fee Policy Framework:</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', marginBottom: 2 }}>Project-Based Competitive Quotes</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Scope-Based Pricing</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Tailored rates based on NBC Building Classification (Group A to J)</div>
                </div>

                <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', marginBottom: 2 }}>Fast-Track Payment Release</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Direct RTGS / NEFT</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Milestone-linked payouts within 7 working days of audit sign-off</div>
                </div>
              </div>

              <div style={{ fontSize: '0.825rem' }}>
                <strong>Standard Design & Consultancy Milestone Payment Schedule:</strong>
                <ol style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Milestone 1 (Concept & Schematic Approval):</strong> 30% Payment Tranche on approval of master floor plans, elevations & 3D renders.</li>
                  <li><strong>Milestone 2 (Good For Construction GFC & MEP Release):</strong> 50% Payment Tranche on technical committee release of GFC structural & MEP working drawings.</li>
                  <li><strong>Milestone 3 (Site Quality Audit & Final Completion):</strong> 20% Final Retention Release upon physical site milestone clearance.</li>
                </ol>
              </div>
            </div>

            {/* IP Rights & Legal Terms */}
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale style={{ width: 18, height: 18 }} />
                <span>Intellectual Property, Confidentiality & Legal Terms:</span>
              </h3>
              <ul style={{ listStyle: 'square', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Intellectual Property Rights:</strong> Rights over any IP created, including drawings, CAD files, 3D renders, and creative works shall at all times be solely owned by <strong>Hindustan Projects</strong>.</li>
                <li><strong>Confidentiality:</strong> Architect/Consultant shall maintain strict confidentiality of client, pricing, marketing, and technical data.</li>
                <li><strong>Independent Relationship:</strong> Engagement is on a "Principal to Principal" independent consultant basis without employer-employee relationship.</li>
                <li><strong>Governing Law:</strong> Governed by the Laws of India & Courts jurisdiction.</li>
              </ul>
            </div>

            {/* Document Naming Format */}
            <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.05)', border: '1px solid rgba(0, 71, 171, 0.2)' }}>
              <h3 style={{ color: '#0047AB', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck2 style={{ width: 18, height: 18 }} />
                <span>Mandatory Document Naming Convention:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', marginBottom: '0.5rem' }}>All design documents submitted on the PM application tool must follow the strict format:</p>
              <div style={{ padding: '0.75rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-card)', fontFamily: 'monospace', fontWeight: 800, color: '#0047AB', fontSize: '0.85rem' }}>
                DDMMYY-HP-[PROJECT TITLE]-[DOCUMENT NAME]-R[REVISION]
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Example: <code>250726-HP-ArjunsResidence-FloorPlans-R0.pdf</code>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Professional Disciplines List (a to s) */}
        {activeSubTab === 'disciplines' && (
          <div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Recognized Empanelment Professional Disciplines (a to s):</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', fontSize: '0.85rem' }}>
              {[
                'a) Architect & Architectural Designer',
                'b) Civil Engineer / Structural Contractor',
                'c) Structural Design Consultant',
                'd) Electrical Engineering Consultant',
                'e) Plumbing & Sanitation Engineer',
                'f) Fire Protection & Safety Engineer',
                'g) HVAC & Air Conditioning Specialist',
                'h) Environment & Green Building Specialist',
                'j) Town Planner & Master Layout Designer',
                'k) Urban Designer',
                'm) Landscape Architect',
                'n) Security System Specialist',
                'p) Interior Designer & Turnkey Decor',
                'q) Quantity Surveyor & Cost Estimator',
                'r) Project / Construction Manager (PMC)',
                's) Hospitality & Other Subject Specialists'
              ].map((disc, idx) => (
                <div key={idx} style={{ padding: '0.75rem 1rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontWeight: 700 }}>
                  {disc}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/apply')} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Proceed to Digital Registration Wizard
          </button>
        </div>

      </div>
    </div>
  );
}
