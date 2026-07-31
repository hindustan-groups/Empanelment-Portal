import React from 'react';
import { X, CheckCircle, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 640, maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <X style={{ width: 20, height: 20 }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 10, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
            <ShieldCheck style={{ width: 24, height: 24 }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Empanelment Guidelines & Checklist</h3>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Hindustan Projects Vendor Onboarding Criteria</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
          
          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.05)', border: '1px solid rgba(0, 71, 171, 0.2)' }}>
            <h4 style={{ color: '#0047AB', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText style={{ width: 16, height: 16 }} />
              <span>Mandatory Checklist Before Filing:</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ width: 16, height: 16, color: '#10B981', flexShrink: 0 }} />
                <span>Active 15-Digit GSTIN & PAN Card matching company title.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ width: 16, height: 16, color: '#10B981', flexShrink: 0 }} />
                <span>Minimum 3 Years Audited Financial Statements.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ width: 16, height: 16, color: '#10B981', flexShrink: 0 }} />
                <span>Work Orders / Completion Certificates of executed projects.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ width: 16, height: 16, color: '#10B981', flexShrink: 0 }} />
                <span>Valid Bank Account Details with Cancelled Cheque / Solvency.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Evaluation Timeline & Classification:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ color: '#0047AB', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.2rem' }}>Class A (Contractors & EPC)</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Turnover &gt; ₹ 5.0 Crores per annum with proven execution track record.</p>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ color: '#0047AB', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.2rem' }}>Class B (Suppliers & Consultants)</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Turnover ₹ 50 Lakhs - ₹ 5 Crores with quality compliance certification.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 10, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#B45309', fontSize: '0.775rem', display: 'flex', gap: '0.5rem' }}>
            <AlertTriangle style={{ width: 18, height: 18, flexShrink: 0 }} />
            <span>Note: Empanelment is subject to physical document verification and site audit by the Hindustan Projects Procurement Committee.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
