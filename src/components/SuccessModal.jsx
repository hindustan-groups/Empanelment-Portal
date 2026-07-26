import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Search, ShieldCheck, Printer, Check, Building2, CreditCard, DollarSign, FileCheck2, User, Lock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function SuccessModal({ isOpen, trackingId, formData, onClose }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ED1C24', '#0047AB', '#10B981', '#F59E0B']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTrackDirect = () => {
    onClose();
    navigate('/track');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content printable-area" style={{ maxWidth: 780, maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Logo height={42} />
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>
                Official Empanelment Application Acknowledgment Slip
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: 2 }}>
                {formData?.companyName || formData?.contactName || 'Empanelment Applicant'}
              </h3>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', background: '#0047AB' }}>
              <Printer style={{ width: 14, height: 14 }} />
              <span>Print Application Copy</span>
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800 }}>✕</button>
          </div>
        </div>

        {/* Tracking Code Highlight Box */}
        <div style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,71,171,0.08) 0%, rgba(16,185,129,0.08) 100%)', border: '1.5px solid rgba(0,71,171,0.2)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>
              Empanelment Reference Tracking Code
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace', letterSpacing: '1px' }}>
              {trackingId}
            </div>
          </div>
          
          <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={copyTrackingId} className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', background: copied ? '#10B981' : 'white', color: copied ? 'white' : '#334155' }}>
              {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
              <span>{copied ? 'Copied!' : 'Copy Tracking Code'}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Entity & Contact Profile */}
        <div style={{ marginBottom: '1.1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 style={{ width: 15, height: 15 }} />
            <span>1. Organization & Authorized Profile</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', fontSize: '0.825rem', padding: '0.85rem', borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div>Entity Type: <strong>{(formData?.entityType || 'sole_proprietor').toUpperCase().replace('_', ' ')}</strong></div>
            <div>Business Category: <strong>{(formData?.category || 'CIVIL').toUpperCase()}</strong></div>
            <div>Primary Role: <strong>{formData?.primaryRole || 'Contractor'}</strong></div>
            <div>Est. Year: <strong>{formData?.estYear || '2024'}</strong></div>
            <div>Authorized Contact: <strong>{formData?.contactName || 'Applicant'} ({formData?.designation || 'Officer'})</strong></div>
            <div>Email Address: <strong>{formData?.email || 'N/A'}</strong></div>
            <div>Mobile Number: <strong>{formData?.phone || 'N/A'}</strong></div>
            <div>City & State: <strong>{formData?.city || 'N/A'}, {formData?.state || 'N/A'} (PIN: {formData?.pincode || 'N/A'})</strong></div>
            <div style={{ gridColumn: '1 / -1' }}>Address: <strong>{formData?.address || 'Registered Workplace Premises'}</strong></div>
          </div>
        </div>

        {/* Section 2: Statutory Tax & Banking */}
        <div style={{ marginBottom: '1.1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CreditCard style={{ width: 15, height: 15 }} />
            <span>2. Statutory Verification & Payout Banking Credentials</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', fontSize: '0.825rem', padding: '0.85rem', borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div>GSTIN Number: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{formData?.gstin || (formData?.gstExempt ? 'EXEMPT' : 'N/A')}</strong></div>
            <div>Company PAN Card: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{formData?.pan || 'N/A'}</strong></div>
            <div>MSME Udyam Registration: <strong style={{ fontFamily: 'monospace' }}>{formData?.msmeNo || 'N/A (General Category)'}</strong></div>
            <div>Bank Account No: <strong style={{ fontFamily: 'monospace' }}>{formData?.bankAccount || 'N/A'}</strong></div>
            <div>Bank Name & Branch: <strong>{formData?.bankName || 'N/A'}</strong></div>
            <div>Bank IFSC Code: <strong style={{ fontFamily: 'monospace' }}>{formData?.ifsc || 'N/A'}</strong></div>
          </div>
        </div>

        {/* Section 3: Financial Turnovers */}
        <div style={{ marginBottom: '1.1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <DollarSign style={{ width: 15, height: 15 }} />
            <span>3. Financial Turnovers & Quoted Rate Card</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', fontSize: '0.825rem', padding: '0.85rem', borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div>FY 2023-24 Turnover: <strong>₹ {formData?.turnover2023 || '0'} Lakhs</strong></div>
            <div>FY 2024-25 Turnover: <strong>₹ {formData?.turnover2024 || '0'} Lakhs</strong></div>
            <div>FY 2025-26 Turnover: <strong>₹ {formData?.turnover2025 || '0'} Lakhs</strong></div>
            <div>Largest Work Order: <strong>₹ {formData?.largestOrder || '0'} Lakhs</strong></div>
            <div>BUA Rate Quote: <strong>₹ {formData?.buaArea || '0'} / sq ft</strong></div>
            <div>CPA Rate Quote: <strong>₹ {formData?.cpaArea || '0'} / sq ft</strong></div>
          </div>
        </div>

        {/* Verification Footer & Digital Signature */}
        <div style={{ padding: '0.85rem 1rem', borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 800, color: '#047857', marginBottom: 2 }}>✓ Digital Legal Undertaking Verified</div>
          <div>Authorized Signatory: <strong>{formData?.signatoryName || formData?.contactName || 'Authorized Officer'}</strong></div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Submission Timestamp: {new Date(formData?.submitted_at || Date.now()).toLocaleString()}</div>
          
          {formData?.signature && (
            <div style={{ marginTop: '0.6rem', padding: '0.4rem', background: 'white', borderRadius: 6, display: 'inline-block', border: '1px solid #CBD5E1' }}>
              <img src={formData.signature} alt="Digital Signature" style={{ height: 50 }} />
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Application Slip</span>
          </button>
          
          <button onClick={handleTrackDirect} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Search style={{ width: 16, height: 16 }} />
            <span>Track Application Status</span>
          </button>
        </div>

      </div>
    </div>
  );
}
