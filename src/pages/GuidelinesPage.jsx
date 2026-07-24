import React from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertTriangle, Building, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuidelinesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
            <ShieldCheck style={{ width: 28, height: 28 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Vendor Empanelment Guidelines & Policy</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hindustan Projects Procurement & Contractor Qualification Manual</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          
          <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.05)', border: '1px solid rgba(0, 71, 171, 0.2)' }}>
            <h3 style={{ color: '#0047AB', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText style={{ width: 18, height: 18 }} />
              <span>Mandatory Documentation Checklist:</span>
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                <span><strong>Active GSTIN & PAN Card:</strong> Matching registered corporate/entity title.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                <span><strong>Audited Turnovers:</strong> Profit & Loss Balance Sheets for FY 2023-24, 2024-25 & 2025-26.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                <span><strong>Track Record Credentials:</strong> Completion certificates for civil, MEP, or supply work orders.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle style={{ width: 18, height: 18, color: '#10B981', flexShrink: 0 }} />
                <span><strong>Banking Verification:</strong> Cancelled Cheque / Bank Solvency Certificate.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Empanelment Classification Tiers:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ color: '#0047AB', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Class A (EPC Contractors)</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Annual Turnover &gt; ₹ 5.0 Crores with proven PSU/Corporate execution track record.</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ color: '#0047AB', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Class B (Suppliers & Consultants)</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Turnover ₹ 50 Lakhs - ₹ 5 Crores with ISO 9001 quality compliance certification.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#B45309', fontSize: '0.85rem', display: 'flex', gap: '0.75rem' }}>
            <AlertTriangle style={{ width: 22, height: 22, flexShrink: 0 }} />
            <span>Note: Empanelment registration is valid for 3 Financial Years. Periodic performance audits will be conducted by the Hindustan Projects Committee.</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button onClick={() => navigate('/apply')} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Proceed to Digital Registration
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
