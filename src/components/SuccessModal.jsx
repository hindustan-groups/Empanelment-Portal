import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Search, ShieldCheck, Printer, Check, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { printDossier } from '../utils/printDossier';

export default function SuccessModal({ isOpen, trackingId, formData, onClose }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ED1C24', '#0047AB', '#10B981', '#F59E0B', '#8B5CF6']
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
    setPrinting(true);
    setTimeout(() => {
      printDossier(trackingId, formData);
      setTimeout(() => setPrinting(false), 2000);
    }, 200);
  };

  const handleTrackDirect = () => {
    onClose();
    navigate('/track');
  };

  const fmtDate = (dateVal) => {
    try {
      const d = dateVal ? new Date(dateVal) : new Date();
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); }
  };

  const fv = (val) => {
    if (!val || val === 'N/A' || val === '0' || String(val).trim() === '') {
      return <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>NIL</span>;
    }
    return <strong style={{ color: '#0F172A' }}>{val}</strong>;
  };

  const filingDate = fmtDate(formData?.submitted_at);
  const entityType = (formData?.entityType || 'sole_proprietor').replace(/_/g, ' ').toUpperCase();

  const docRows = [
    { name: 'PAN Card Copy', submitted: formData?.panDoc, req: 'Mandatory' },
    { name: 'Aadhaar Card (Front)', submitted: formData?.aadharFrontDoc, req: 'Mandatory' },
    { name: 'Aadhaar Card (Back)', submitted: formData?.aadharBackDoc, req: 'Mandatory' },
    { name: 'Cancelled Cheque / Passbook', submitted: formData?.bankDoc, req: 'Mandatory' },
    { name: 'GST REG-06 Certificate', submitted: formData?.gstDoc, req: 'Conditional' },
    { name: 'Work Portfolio / Experience', submitted: formData?.expDoc, req: 'Mandatory' },
  ];

  const BLUE = '#0047AB';
  const DARK = '#0B1B3D';
  const RED  = '#ED1C24';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 900, margin: 'auto', padding: '2rem 2.25rem', borderRadius: 20, background: '#FFFFFF', boxShadow: '0 32px 80px rgba(0,0,0,0.22)' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── TOP HEADER ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.35)', flexShrink: 0 }}>
              <CheckCircle2 style={{ width: 26, height: 26, color: 'white' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: DARK }}>Application Submitted Successfully!</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginTop: 2 }}>
                Your 4-page official dossier is ready to print below
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={handlePrint}
              disabled={printing}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.6rem 1.2rem', borderRadius: 10, border: 'none', cursor: printing ? 'wait' : 'pointer',
                background: printing ? '#94A3B8' : BLUE, color: 'white',
                fontSize: '0.85rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,71,171,0.3)',
                transition: 'all 0.2s'
              }}
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>{printing ? 'Preparing Print...' : 'Print Official Dossier (A4)'}</span>
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', fontWeight: 800, color: '#94A3B8', lineHeight: 1, padding: '0.25rem' }}>✕</button>
          </div>
        </div>

        {/* ── TRACKING CODE BANNER ── */}
        <div style={{
          padding: '1rem 1.4rem', borderRadius: 14, background: DARK, color: 'white',
          marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Empanelment Reference Tracking Code
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '3px', marginTop: 3 }}>
              {trackingId}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: 2 }}>
              Doc Ref: HP-EMP-DOC-{trackingId} &nbsp;·&nbsp; Filing Date: {filingDate}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={copyTrackingId} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 800,
              background: copied ? '#10B981' : 'white', color: copied ? 'white' : DARK, transition: 'all 0.2s'
            }}>
              {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            {formData?.status && String(formData.status).startsWith('Approved') ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.8rem', borderRadius: 99, background: 'rgba(16,185,129,0.2)', color: '#34D399', fontSize: '0.72rem', fontWeight: 900, border: '1px solid rgba(52,211,153,0.4)' }}>
                <ShieldCheck style={{ width: 13, height: 13 }} />
                <span>EMPANELLED & APPROVED 🟢</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.8rem', borderRadius: 99, background: 'rgba(245,158,11,0.2)', color: '#FCD34D', fontSize: '0.72rem', fontWeight: 900, border: '1px solid rgba(252,211,77,0.4)' }}>
                <ShieldCheck style={{ width: 13, height: 13 }} />
                <span>PENDING COMMITTEE AUDIT ⏳</span>
              </div>
            )}
          </div>
        </div>

        {/* ── PRINT PREVIEW NOTE ── */}
        <div style={{
          padding: '0.7rem 1rem', borderRadius: 10, background: '#FFFBEB', border: '1.5px solid #FCD34D',
          display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#92400E'
        }}>
          <AlertTriangle style={{ width: 16, height: 16, color: '#D97706', flexShrink: 0 }} />
          <span>
            The printed document is a <strong>4-page Official A4 Dossier</strong> with company letterhead, watermark, compliance standards, payment schedule, rules & guidelines, and undertaking signature block.
            Click "<strong>Print Official Dossier (A4)</strong>" above to generate it.
          </span>
        </div>

        {/* ── DOSSIER PREVIEW — SECTION BREAKDOWN ── */}

        {/* § 1 — ORGANIZATION PROFILE */}
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: BLUE, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.3rem 0.75rem', background: '#EFF6FF', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 6px 6px 0' }}>
          § 1 — Applicant Organization & Discipline Scope
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.9rem', fontSize: '0.82rem' }}>
          <tbody>
            {[
              ['Legal Entity Name', <span style={{ gridColumn: '1/-1' }}>{fv(formData?.companyName || formData?.contactName)}</span>, 'colspan'],
              ['Entity Classification', fv(entityType), 'Primary Discipline', fv(formData?.primaryRole)],
              ['Empanelment Category', fv(formData?.category), 'NBC Sub-Category', fv(formData?.nbcSubCategory)],
              ['Contact Person', <>{fv(formData?.contactName)} {formData?.designation && <em style={{ color: '#64748B' }}>({formData.designation})</em>}</>, 'Corporate Email', fv(formData?.email)],
              ['Mobile No.', fv(formData?.phone), 'City & State', fv(`${formData?.city || ''}, ${formData?.state || ''} ${formData?.pincode ? `- ${formData?.pincode}` : ''}`)],
              ['Business Address', fv(formData?.address), 'colspan', ''],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', fontWeight: 700, background: '#F8FAFC', width: '22%', fontSize: '0.77rem', color: '#0F172A' }}>{row[0]}</td>
                {row[2] === 'colspan'
                  ? <td colSpan={3} style={{ border: '1px solid #E2E8F0', padding: '5px 8px' }}>{row[1]}</td>
                  : <>
                    <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', width: '28%' }}>{row[1]}</td>
                    <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', fontWeight: 700, background: '#F8FAFC', width: '22%', fontSize: '0.77rem', color: '#0F172A' }}>{row[2]}</td>
                    <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', width: '28%' }}>{row[3]}</td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>

        {/* § 2 — TAX & BANKING */}
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: BLUE, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.3rem 0.75rem', background: '#EFF6FF', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 6px 6px 0' }}>
          § 2 — Statutory Tax Identity & Banking Credentials
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.9rem', fontSize: '0.82rem' }}>
          <tbody>
            {[
              ['15-Digit GSTIN', fv(formData?.gstin), '10-Digit PAN', fv(formData?.pan)],
              ['MSME Udyam No.', fv(formData?.msmeNo), 'Bank Account No.', fv(formData?.bankAccount)],
              ['Bank IFSC Code', fv(formData?.ifsc), 'Bank Name & Branch', fv(formData?.bankName)],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', fontWeight: 700, background: '#F8FAFC', width: '22%', fontSize: '0.77rem' }}>{row[0]}</td>
                <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', width: '28%' }}>{row[1]}</td>
                <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', fontWeight: 700, background: '#F8FAFC', width: '22%', fontSize: '0.77rem' }}>{row[2]}</td>
                <td style={{ border: '1px solid #E2E8F0', padding: '5px 8px', width: '28%' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* § 3 — FINANCIALS */}
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: BLUE, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.3rem 0.75rem', background: '#EFF6FF', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 6px 6px 0' }}>
          § 3 — Financial Turnovers & Work Experience
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.6rem', marginBottom: '0.9rem' }}>
          {[
            { label: 'FY 2023–24', val: formData?.turnover2023, unit: 'Lakhs' },
            { label: 'FY 2024–25', val: formData?.turnover2024, unit: 'Lakhs' },
            { label: 'FY 2025–26', val: formData?.turnover2025, unit: 'Lakhs' },
            { label: 'Largest Work Order', val: formData?.largestOrder || formData?.workOrderValue, unit: 'Lakhs' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '0.7rem 0.85rem', borderRadius: 10, background: 'linear-gradient(135deg,#EFF6FF,#F0FDF4)', border: '1px solid #DBEAFE', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: BLUE }}>
                {item.val ? `₹ ${item.val} L` : <span style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>NIL</span>}
              </div>
            </div>
          ))}
        </div>

        {/* § 4 — DOCUMENT CHECKLIST */}
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: BLUE, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.3rem 0.75rem', background: '#EFF6FF', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 6px 6px 0' }}>
          § 4 — Document Submission Audit Roster
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.45rem', marginBottom: '1rem' }}>
          {docRows.map((doc, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 0.75rem', borderRadius: 8,
              background: doc.submitted ? '#F0FDF4' : '#FFF7F7',
              border: `1px solid ${doc.submitted ? '#BBF7D0' : '#FECACA'}`,
              fontSize: '0.75rem', fontWeight: 700
            }}>
              <span style={{ fontSize: '1rem' }}>{doc.submitted ? '✅' : '❌'}</span>
              <div>
                <div style={{ color: '#0F172A' }}>{doc.name}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: doc.submitted ? '#047857' : '#DC2626' }}>
                  {doc.submitted ? 'Submitted' : 'Not Submitted'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* § 5 — GUIDELINES PREVIEW (condensed) */}
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: BLUE, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.3rem 0.75rem', background: '#EFF6FF', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 6px 6px 0' }}>
          § 5 — Key Rules & Guidelines (14-Point Corporate Matrix in full print)
        </div>
        <div style={{ padding: '0.75rem 1rem', borderRadius: 10, border: '1.5px solid #DBEAFE', background: '#F8FAFF', marginBottom: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.3rem 1rem' }}>
          {[
            'Empanelment valid 2 years from approval date',
            'No work commences without signed Work Order',
            '7-Day RTGS Payout SLA on approved RA Bills',
            'Mandatory IS/BIS marked materials & NABL reports',
            'Sub-contracting requires prior written approval',
            'GFC Drawings & BIM site data strictly confidential',
            '5% Retention & 12-Month Defect Liability Period',
            'CVC Anti-Bribery: Zero tolerance — blacklisting + FIR',
          ].map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start', fontSize: '0.75rem', color: '#1E293B' }}>
              <span style={{ minWidth: 18, height: 18, borderRadius: '50%', background: BLUE, color: 'white', fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i+1}</span>
              <span>{rule}</span>
            </div>
          ))}
          <div style={{ gridColumn: '1/-1', fontSize: '0.72rem', color: '#64748B', fontStyle: 'italic', marginTop: 4 }}>
            📋 See full 14-point rules, compliance standards & vendor code of conduct in the printed dossier (Page 3).
          </div>
        </div>

        {/* SIGNATURE SUMMARY */}
        <div style={{ padding: '0.85rem 1rem', borderRadius: 12, background: '#FFFBEB', border: '1.5px solid #FCD34D', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#92400E', textTransform: 'uppercase' }}>📝 Undertaking Status</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginTop: 3 }}>
              Authorized Signatory: <strong>{formData?.signatoryName || formData?.contactName || '—'}</strong>
            </div>
            <div style={{ fontSize: '0.73rem', color: '#64748B' }}>
              Place: {formData?.signatoryPlace || formData?.city || 'New Delhi'} &nbsp;·&nbsp; Date: {filingDate}
            </div>
          </div>
          {formData?.signature && (
            <div style={{ padding: '0.3rem 0.6rem', background: 'white', borderRadius: 8, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 900, color: BLUE, textTransform: 'uppercase', marginBottom: 2 }}>Digital Signature</div>
              <img src={formData.signature} alt="Signature" style={{ height: 40, maxWidth: 120, objectFit: 'contain' }} />
            </div>
          )}
          <div style={{ padding: '0.4rem 0.85rem', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#047857', fontSize: '0.77rem', fontWeight: 900 }}>
            ✓ FORMAL UNDERTAKING SIGNED & VERIFIED
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrint}
            disabled={printing}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.8rem 1rem', borderRadius: 12, border: 'none', cursor: printing ? 'wait' : 'pointer',
              background: printing ? '#94A3B8' : BLUE, color: 'white', fontSize: '0.875rem', fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0,71,171,0.35)', minWidth: 200
            }}
          >
            <Printer style={{ width: 18, height: 18 }} />
            <span>{printing ? 'Opening Print Dialog...' : '🖨️ Print Official 4-Page A4 Dossier'}</span>
          </button>

          <button onClick={handleTrackDirect} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.8rem 1rem', borderRadius: 12, border: `2px solid ${BLUE}`, cursor: 'pointer',
            background: 'transparent', color: BLUE, fontSize: '0.875rem', fontWeight: 800, minWidth: 200
          }}>
            <Search style={{ width: 18, height: 18 }} />
            <span>Track Application Status</span>
          </button>
        </div>

      </div>
    </div>
  );
}
