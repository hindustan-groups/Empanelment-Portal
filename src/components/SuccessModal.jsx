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
      return <span style={{ color: '#64748B', fontWeight: 600 }}>NIL</span>;
    }
    return <strong style={{ color: '#0F172A', fontWeight: 800 }}>{prefix}{val}{suffix}</strong>;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content printable-area" style={{ maxWidth: 840, maxHeight: '92vh', overflowY: 'auto', padding: '2rem', borderRadius: 24, background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Official Header Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '3px double #0047AB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Logo height={48} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HINDUSTAN PROJECTS • OFFICIAL EMPANELMENT APPLICATION SLIP
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', marginTop: 2, marginBottom: 2 }}>
                {formData?.companyName || formData?.contactName || 'Empanelment Applicant'}
              </h2>
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
              <span>Print Official Application Slip (A4)</span>
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800, color: '#64748B', marginLeft: 6 }}>✕</button>
          </div>
        </div>

        {/* Tracking Code Highlight Banner */}
        <div className="printable-section" style={{ padding: '1rem 1.25rem', borderRadius: 14, background: '#0F172A', color: 'white', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Empanelment Reference Tracking Code
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace', letterSpacing: '2px', marginTop: 2 }}>
              {trackingId}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="no-print">
              <button onClick={copyTrackingId} className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem', background: copied ? '#10B981' : 'white', color: copied ? 'white' : '#0F172A', border: 'none' }}>
                {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div style={{ padding: '0.35rem 0.75rem', borderRadius: 99, background: 'rgba(16,185,129,0.2)', color: '#34D399', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>VERIFICATION PENDING</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: ORGANIZATION & SCOPE TABLE */}
        <div className="printable-section">
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            1. Organization Profile & Discipline Scope
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Entity Type</td>
                <td style={{ width: '28%' }}><strong>{(formData?.entityType || 'sole_proprietor').toUpperCase().replace('_', ' ')}</strong></td>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Main Category Scope</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.primaryRole)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>NBC Code</td>
                <td>{formatVal(formData?.nbcSubCategory)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Empanelment Trade</td>
                <td>{formatVal(formData?.category)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Contact Person</td>
                <td>{formatVal(formData?.contactName)} {formData?.designation ? `(${formData.designation})` : ''}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Corporate Email</td>
                <td>{formatVal(formData?.email)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Mobile Number</td>
                <td>{formatVal(formData?.phone)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>City & State</td>
                <td><strong>{formData?.city || 'NIL'}, {formData?.state || 'NIL'} ({formData?.pincode || 'NIL'})</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Workplace Address</td>
                <td colSpan={3}>{formatVal(formData?.address)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 2: STATUTORY TAX & BANKING CREDENTIALS TABLE */}
        <div className="printable-section">
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            2. Statutory Tax Identity & Payout Banking Credentials
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>15-Digit GSTIN</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.gstin, '', formData?.gstExempt ? ' (EXEMPT)' : '')}</td>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>10-Digit Company PAN</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.pan)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>MSME Udyam No</td>
                <td>{formatVal(formData?.msmeNo)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Bank Account No</td>
                <td>{formatVal(formData?.bankAccount)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Bank IFSC Code</td>
                <td>{formatVal(formData?.ifsc)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Bank Name & Branch</td>
                <td>{formatVal(formData?.bankName)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: FINANCIAL TURNOVERS & QUOTED RATE CARD TABLE */}
        <div className="printable-section">
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            3. Financial Turnovers & Quoted Rate Card
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>FY 2023-24 Turnover</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.turnover2023, '₹ ', ' Lakhs')}</td>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>FY 2024-25 Turnover</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.turnover2024, '₹ ', ' Lakhs')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>FY 2025-26 Turnover</td>
                <td>{formatVal(formData?.turnover2025, '₹ ', ' Lakhs')}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Largest Order Value</td>
                <td>{formatVal(formData?.largestOrder, '₹ ', ' Lakhs')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>BUA Quoted Rate</td>
                <td>{formatVal(formData?.buaRate || formData?.buaArea, '₹ ', ' / sq ft')}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>CPA Quoted Rate</td>
                <td>{formatVal(formData?.cpaRate || formData?.cpaArea, '₹ ', ' / sq ft')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 4: DOCUMENT ATTACHMENT AUDIT ROSTER TABLE */}
        <div className="printable-section">
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            4. Statutory Identity & Document Audit Roster
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>PAN Card Copy</td>
                <td style={{ width: '28%' }}>{formData?.panDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Aadhaar Card (Front)</td>
                <td style={{ width: '28%' }}>{formData?.aadharFrontDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Aadhaar Card (Back)</td>
                <td>{formData?.aadharBackDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Cancelled Cheque</td>
                <td>{formData?.bankDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>GST Certificate</td>
                <td>{formData?.gstDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Work Portfolio</td>
                <td>{formData?.expDoc ? <span style={{ color: '#047857', fontWeight: 800 }}>✓ ATTACHED</span> : formatVal(null)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* VERIFICATION FOOTER & SIGNATURE STAMP */}
        <div className="printable-section" style={{ padding: '1rem', borderRadius: 12, border: '1.5px solid #10B981', background: '#F0FDF4', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, color: '#047857', fontSize: '0.875rem', marginBottom: 2 }}>
              ✓ DIGITAL LEGAL UNDERTAKING SIGNED & VERIFIED
            </div>
            <div style={{ color: '#1E293B', fontWeight: 700 }}>
              Authorized Signatory: <strong>{formData?.signatoryName || formData?.contactName || 'Authorized Officer'}</strong> • Place of Signing: <strong>{formData?.signatoryPlace || 'New Delhi'}</strong>
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748B', marginTop: 2 }}>
              Filing Timestamp: {new Date(formData?.submitted_at || Date.now()).toLocaleString()}
            </div>
          </div>

          {formData?.signature && (
            <div style={{ padding: '0.4rem 0.6rem', background: '#FFFFFF', borderRadius: 8, border: '1px solid #CBD5E1', textAlign: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 2 }}>Digital Seal Stamp</div>
              <img src={formData.signature} alt="Digital Signature" style={{ height: 40, maxWidth: 130, objectFit: 'contain' }} />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem 1rem' }}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Official Application Slip (A4)</span>
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
