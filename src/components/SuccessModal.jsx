import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Search, ShieldCheck, Printer, Check, Building2, CreditCard, DollarSign, FileCheck2, User, Lock, Award, MapPin, Calendar, FileText } from 'lucide-react';
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

  // Helper to format values: returns "NIL" if empty or not provided
  const formatVal = (val, prefix = '', suffix = '') => {
    if (!val || val === 'N/A' || val === '0' || String(val).trim() === '') {
      return <span style={{ color: '#94A3B8', fontWeight: 600 }}>NIL</span>;
    }
    return <strong style={{ color: '#0F172A', fontWeight: 800 }}>{prefix}{val}{suffix}</strong>;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content printable-area" style={{ maxWidth: 820, maxHeight: '92vh', overflowY: 'auto', padding: '2rem', borderRadius: 24 }} onClick={(e) => e.stopPropagation()}>
        
        {/* Official Header Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '2px solid #0047AB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Logo height={48} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HINDUSTAN PROJECTS • VENDOR EMPANELMENT DOSSIER
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginTop: 2, marginBottom: 2 }}>
                {formData?.companyName || formData?.contactName || 'Empanelment Applicant'}
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span>Subdomain: <strong>empanel.hindustanprojects.in</strong></span>
                <span>•</span>
                <span>Filing Date: <strong>{new Date(formData?.submitted_at || Date.now()).toLocaleDateString()}</strong></span>
              </div>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem', background: '#0047AB', borderRadius: 10 }}>
              <Printer style={{ width: 15, height: 15 }} />
              <span>Print Application Slip</span>
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800, color: '#64748B', marginLeft: 6 }}>✕</button>
          </div>
        </div>

        {/* Tracking Code Highlight Banner */}
        <div style={{ padding: '1.1rem 1.5rem', borderRadius: 16, background: 'linear-gradient(135deg, #0F172A 0%, #002B66 50%, #0047AB 100%)', color: 'white', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 8px 24px rgba(0,71,171,0.2)' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Official Empanelment Reference Tracking Code
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace', letterSpacing: '2px', marginTop: 2 }}>
              {trackingId}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="no-print">
              <button onClick={copyTrackingId} className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem', background: copied ? '#10B981' : 'white', color: copied ? 'white' : '#0F172A', border: 'none' }}>
                {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                <span>{copied ? 'Copied!' : 'Copy Tracking Code'}</span>
              </button>
            </div>
            <div style={{ padding: '0.4rem 0.8rem', borderRadius: 99, background: 'rgba(16,185,129,0.2)', color: '#34D399', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>UNDER AUDIT</span>
            </div>
          </div>
        </div>

        {/* Section 1: Entity & Primary Scope */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px dashed #CBD5E1', paddingBottom: '0.3rem' }}>
            <Building2 style={{ width: 15, height: 15 }} />
            <span>1. ORGANIZATION PROFILE & DISCIPLINE SCOPE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.825rem', padding: '1rem', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div>Entity Classification: <strong>{(formData?.entityType || 'sole_proprietor').toUpperCase().replace('_', ' ')}</strong></div>
            <div>Main Category Scope: {formatVal(formData?.primaryRole)}</div>
            <div>NBC Sub-Category Code: {formatVal(formData?.nbcSubCategory)}</div>
            <div>Empanelment Category: {formatVal(formData?.category)}</div>
            <div>Authorized Contact Person: {formatVal(formData?.contactName)} {formData?.designation ? `(${formData.designation})` : ''}</div>
            <div>Corporate Email: {formatVal(formData?.email)}</div>
            <div>Mobile / WhatsApp: {formatVal(formData?.phone)}</div>
            <div>City & State: <strong>{formData?.city || 'NIL'}, {formData?.state || 'NIL'} (PIN: {formData?.pincode || 'NIL'})</strong></div>
            <div style={{ gridColumn: '1 / -1' }}>Workplace Address: {formatVal(formData?.address)}</div>
          </div>
        </div>

        {/* Section 2: Statutory Tax Identity & Banking Credentials */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px dashed #CBD5E1', paddingBottom: '0.3rem' }}>
            <CreditCard style={{ width: 15, height: 15 }} />
            <span>2. STATUTORY TAX IDENTITY & PAYOUT BANKING CREDENTIALS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.825rem', padding: '1rem', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div>15-Digit GSTIN: {formatVal(formData?.gstin, '', formData?.gstExempt ? ' (EXEMPT)' : '')}</div>
            <div>10-Digit Company PAN: {formatVal(formData?.pan)}</div>
            <div>MSME Udyam Registration: {formatVal(formData?.msmeNo)}</div>
            <div>Bank Account Number: {formatVal(formData?.bankAccount)}</div>
            <div>Bank IFSC Code: {formatVal(formData?.ifsc)}</div>
            <div>Bank Name & Branch: {formatVal(formData?.bankName)}</div>
          </div>
        </div>

        {/* Section 3: Financial Turnovers & Quoted Rate Card */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px dashed #CBD5E1', paddingBottom: '0.3rem' }}>
            <DollarSign style={{ width: 15, height: 15 }} />
            <span>3. FINANCIAL TURNOVERS & QUOTED RATE CARD</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.825rem', padding: '1rem', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div>FY 2023-24 Turnover: {formatVal(formData?.turnover2023, '₹ ', ' Lakhs')}</div>
            <div>FY 2024-25 Turnover: {formatVal(formData?.turnover2024, '₹ ', ' Lakhs')}</div>
            <div>FY 2025-26 Turnover: {formatVal(formData?.turnover2025, '₹ ', ' Lakhs')}</div>
            <div>Largest Work Order: {formatVal(formData?.largestOrder, '₹ ', ' Lakhs')}</div>
            <div>BUA Quoted Execution Rate: {formatVal(formData?.buaRate || formData?.buaArea, '₹ ', ' / sq ft')}</div>
            <div>CPA Quoted Execution Rate: {formatVal(formData?.cpaRate || formData?.cpaArea, '₹ ', ' / sq ft')}</div>
          </div>
        </div>

        {/* Section 4: Document Audit Roster */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px dashed #CBD5E1', paddingBottom: '0.3rem' }}>
            <FileCheck2 style={{ width: 15, height: 15 }} />
            <span>4. MANDATORY IDENTITY & STATUTORY DOCUMENT AUDIT ROSTER</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem', fontSize: '0.8rem', padding: '1rem', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div>PAN Card Copy: {formData?.panDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</div>
            <div>Aadhaar Card (Front Side): {formData?.aadharFrontDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</div>
            <div>Aadhaar Card (Back Side): {formData?.aadharBackDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</div>
            <div>Cancelled Cheque / Passbook: {formData?.bankDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</div>
            <div>GST REG-06 Certificate: {formData?.gstDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</div>
            <div>Work Experience / Portfolio: {formData?.expDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</div>
          </div>
        </div>

        {/* Verification Footer & Digital Signature Stamp */}
        <div style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'rgba(16, 185, 129, 0.06)', border: '1.5px solid rgba(16, 185, 129, 0.3)', fontSize: '0.825rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, color: '#047857', fontSize: '0.9rem', marginBottom: 2 }}>
              ✓ DIGITAL LEGAL UNDERTAKING SIGNED & VERIFIED
            </div>
            <div style={{ color: '#1E293B', fontWeight: 700 }}>
              Authorized Signatory: <strong>{formData?.signatoryName || formData?.contactName || 'Authorized Officer'}</strong> • Place of Signing: <strong>{formData?.signatoryPlace || 'New Delhi'}</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              Filing Timestamp: {new Date(formData?.submitted_at || Date.now()).toLocaleString()}
            </div>
          </div>

          {formData?.signature && (
            <div style={{ padding: '0.5rem 0.75rem', background: 'white', borderRadius: 10, border: '1px solid #CBD5E1', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 2 }}>Digital Seal Stamp</div>
              <img src={formData.signature} alt="Digital Signature" style={{ height: 44, maxWidth: 140, objectFit: 'contain' }} />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem 1rem' }}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Official Dossier Slip</span>
          </button>
          
          <button onClick={handleTrackDirect} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem 1rem' }}>
            <Search style={{ width: 16, height: 16 }} />
            <span>Track Application Status</span>
          </button>
        </div>

      </div>
    </div>
  );
}
