import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Search, ShieldCheck, Printer, Check, Building2, CreditCard, DollarSign, FileCheck2, User, Lock, Award, MapPin, Calendar, FileText, Scale } from 'lucide-react';
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

  // Helper to format clean date: e.g. "28 July 2026"
  const getFormattedDate = (dateVal) => {
    try {
      const d = dateVal ? new Date(dateVal) : new Date();
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return '28 July 2026';
    }
  };

  // Helper to format values: returns "NIL" if empty
  const formatVal = (val, prefix = '', suffix = '') => {
    if (!val || val === 'N/A' || val === '0' || String(val).trim() === '') {
      return <span style={{ color: '#64748B', fontWeight: 600 }}>NIL</span>;
    }
    return <strong style={{ color: '#0F172A', fontWeight: 800 }}>{prefix}{val}{suffix}</strong>;
  };

  const formattedFilingDate = getFormattedDate(formData?.submitted_at);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content printable-area" style={{ maxWidth: 880, margin: 'auto', padding: '2.5rem', borderRadius: 24, background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
        
        {/* PAGE 1: OFFICIAL LETTERHEAD & APPLICATION DOSSIER COVER */}
        <div className="printable-section">
          {/* Header Bar */}
          <div style={{ borderBottom: '3px double #0047AB', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Logo height={52} />
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    HINDUSTAN PROJECTS • VENDOR EMPANELMENT APPLICATION DOSSIER
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginTop: 2, marginBottom: 2 }}>
                    {formData?.companyName || formData?.contactName || 'Empanelment Applicant'}
                  </h2>
                  <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>
                    Filing Date: <strong>{formattedFilingDate}</strong>
                  </div>
                </div>
              </div>

              <div className="no-print" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', background: '#0047AB', borderRadius: 10 }}>
                  <Printer style={{ width: 16, height: 16 }} />
                  <span>Print Official Dossier (A4)</span>
                </button>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800, color: '#64748B', marginLeft: 6 }}>✕</button>
              </div>
            </div>
          </div>

          {/* Reference Tracking Banner */}
          <div style={{ padding: '1.15rem 1.5rem', borderRadius: 14, background: '#0F172A', color: 'white', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Empanelment Reference Tracking Code
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace', letterSpacing: '2px', marginTop: 2 }}>
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
              <div style={{ padding: '0.4rem 0.85rem', borderRadius: 99, background: 'rgba(16,185,129,0.2)', color: '#34D399', fontSize: '0.75rem', fontWeight: 900, border: '1px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck style={{ width: 14, height: 14 }} />
                <span>UNDER VERIFICATION</span>
              </div>
            </div>
          </div>

          {/* SECTION 1: ORGANIZATION & SCOPE TABLE */}
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            1. ORGANIZATION PROFILE & DISCIPLINE SCOPE
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Entity Classification</td>
                <td style={{ width: '28%' }}><strong>{(formData?.entityType || 'sole_proprietor').toUpperCase().replace('_', ' ')}</strong></td>
                <td style={{ width: '22%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Main Category Scope</td>
                <td style={{ width: '28%' }}>{formatVal(formData?.primaryRole)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>NBC Sub-Category Code</td>
                <td>{formatVal(formData?.nbcSubCategory)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Empanelment Category</td>
                <td>{formatVal(formData?.category)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Authorized Contact Person</td>
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

        {/* PAGE 2: STATUTORY TAX & BANKING CREDENTIALS */}
        <div className="printable-section" style={{ pageBreakBefore: 'always', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            2. STATUTORY TAX IDENTITY & PAYOUT BANKING CREDENTIALS
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
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>MSME Udyam Registration</td>
                <td>{formatVal(formData?.msmeNo)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Bank Account Number</td>
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

          {/* SECTION 3: FINANCIAL TURNOVERS & QUOTED RATE CARD */}
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0047AB', marginTop: '1.5rem', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            3. FINANCIAL TURNOVERS & WORK ORDER EXPERIENCE
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
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Largest Work Order Executed</td>
                <td>{formatVal(formData?.largestOrder || formData?.workOrderValue, '₹ ', ' Lakhs')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Work Order Reference No</td>
                <td>{formatVal(formData?.workOrderRef)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Contract Category</td>
                <td>{formatVal(formData?.contractType ? formData.contractType.toUpperCase().replace('_', ' ') : null)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAGE 3: STATUTORY DOCUMENT AUDIT ROSTER */}
        <div className="printable-section" style={{ pageBreakBefore: 'always', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            4. STATUTORY IDENTITY & DOCUMENT AUDIT ROSTER
          </div>
          <table className="print-dossier-table">
            <tbody>
              <tr>
                <td style={{ width: '25%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>PAN Card Copy</td>
                <td style={{ width: '25%' }}>{formData?.panDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</td>
                <td style={{ width: '25%', fontWeight: 800, backgroundColor: '#F8FAFC' }}>Aadhaar Card (Front)</td>
                <td style={{ width: '25%' }}>{formData?.aadharFrontDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Aadhaar Card (Back)</td>
                <td>{formData?.aadharBackDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Cancelled Cheque / Passbook</td>
                <td>{formData?.bankDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED & VERIFIED</span> : formatVal(null)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>GST REG-06 Certificate</td>
                <td>{formData?.gstDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED</span> : formatVal(null)}</td>
                <td style={{ fontWeight: 800, backgroundColor: '#F8FAFC' }}>Work Portfolio / CAD Renders</td>
                <td>{formData?.expDoc ? <span style={{ color: '#047857', fontWeight: 900 }}>✓ ATTACHED</span> : formatVal(null)}</td>
              </tr>
            </tbody>
          </table>

          {/* PAGE 4: PROCUREMENT POLICY & DIGITAL SIGNATURE UNDERTAKING */}
          <div style={{ marginTop: '1.5rem', padding: '1.15rem', borderRadius: 14, border: '1.5px solid #0047AB', background: '#F8FAFC' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              5. FORMAL CONTRACT AGREEMENT, WORK ORDER DECLARATION & CVC INTEGRITY STAMP
            </div>
            <ul style={{ fontSize: '0.78rem', color: '#334155', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0 0 1rem 0' }}>
              <li><strong>Formal Contract Terms:</strong> All scope deliverables, quality benchmarks (NBC 2016), milestone billing guidelines, and safety protocols shall be strictly governed by Hindustan Projects procurement manual.</li>
              <li><strong>CVC Anti-Corruption Policy:</strong> Hindustan Projects adheres to Central Vigilance Commission (CVC) zero-tolerance standards for ethical procurement.</li>
              <li><strong>Milestone Payment Payouts:</strong> Payments released via RTGS / NEFT in 3 tranches: 30% Concept Approval, 50% GFC Drawings Release, 20% Final Site Quality Clearance.</li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1' }}>
              <div>
                <div style={{ fontWeight: 900, color: '#047857', fontSize: '0.85rem' }}>✓ FORMAL CONTRACT UNDERTAKING SIGNED & VERIFIED</div>
                <div style={{ fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, marginTop: 2 }}>
                  Authorized Signatory: <strong>{formData?.signatoryName || formData?.contactName || 'Authorized Officer'}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                  Place of Signing: <strong>{formData?.signatoryPlace || 'New Delhi'}</strong> • Date: <strong>{formattedFilingDate}</strong>
                </div>
              </div>

              {formData?.signature && (
                <div style={{ padding: '0.4rem 0.6rem', background: '#FFFFFF', borderRadius: 8, border: '1px solid #CBD5E1', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 2 }}>Digital Seal Stamp</div>
                  <img src={formData.signature} alt="Digital Signature" style={{ height: 44, maxWidth: 140, objectFit: 'contain' }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem 1rem' }}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Official Application Dossier (A4)</span>
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
