import React, { useState, useRef } from 'react';
import {
  X, Printer, CheckCircle2, XCircle, Upload,
  Building2, CreditCard, DollarSign, FileCheck2, Edit3, ShieldCheck, FileText
} from 'lucide-react';

/* ─── Stage Progress ─────────────────────────────────────── */
const STAGES = ['Application Submitted', 'Document Verification', 'Financial Audit', 'CEO Authorization', 'Certificate Issued'];

function StageBar({ currentStage, status }) {
  let activeIdx = 1;
  if (status?.includes('Approved')) activeIdx = 5;
  else if (currentStage?.includes('CEO')) activeIdx = 3;
  else if (currentStage?.includes('Committee') || currentStage?.includes('Financial')) activeIdx = 2;
  else if (status === 'Rejected') activeIdx = 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
      {STAGES.map((s, i) => {
        const done = i < activeIdx;
        const current = i === activeIdx - 1;
        const rejected = status === 'Rejected' && i === 1;
        const color = rejected ? '#ED1C24' : done ? '#047857' : current ? '#0047AB' : '#CBD5E1';
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: done || current ? color : 'white', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900, color: done || current ? 'white' : color, flexShrink: 0 }}>
                {done ? '✓' : rejected ? '✕' : i + 1}
              </div>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, color, textAlign: 'center', marginTop: 3, maxWidth: 80 }}>{s}</div>
            </div>
            {i < STAGES.length - 1 && <div style={{ flex: 1, height: 2, background: i < activeIdx - 1 ? '#047857' : '#E2E8F0', minWidth: 18 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Row({ label, value, mono }) {
  if (!value || value === 'undefined undefined – undefined' || value === 'undefined') return null;
  return (
    <div style={{ display: 'flex', padding: '0.35rem 0', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ width: '38%', fontSize: '7.5pt', color: '#64748B', fontWeight: 600 }}>{label}</div>
      <div style={{ width: '62%', fontSize: '8pt', fontWeight: 800, color: '#0F172A', fontFamily: mono ? 'monospace' : undefined, wordBreak: 'break-all' }}>{value}</div>
    </div>
  );
}

function Section({ letter, title, icon: Icon, color = '#0047AB', children }) {
  return (
    <div style={{ marginBottom: '0.85rem', breakInside: 'avoid' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.75rem', background: `${color}10`, borderLeft: `3.5px solid ${color}`, borderRadius: '0 6px 6px 0', marginBottom: '0.35rem' }}>
        <Icon style={{ width: 12, height: 12, color }} />
        <span style={{ fontSize: '7.5pt', fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Section {letter} — {title}
        </span>
      </div>
      <div style={{ padding: '0 0.35rem' }}>{children}</div>
    </div>
  );
}

/* ─── Main Modal ─────────────────────────────────────────── */
export default function VendorDossierA4Modal({ vendor, onClose, onUpdateStatus, adminRemark, setAdminRemark }) {
  const [officerSigned, setOfficerSigned] = useState(!!vendor?.officer_signed);
  const [ceoSigned, setCeoSigned]         = useState(!!vendor?.ceo_signed);
  const [officerName, setOfficerName]     = useState(localStorage.getItem('hipro_officer_name') || 'Procurement Officer');
  const [ceoName, setCeoName]             = useState(localStorage.getItem('hipro_ceo_name') || 'Managing Director');
  const [sealImage, setSealImage]         = useState(localStorage.getItem('hipro_seal_img') || null);
  const [sigFont, setSigFont]             = useState('cursive');
  const [approvalClass, setApprovalClass] = useState('Class-A');
  const [signing, setSigning]             = useState(false);
  const [signedAt]                        = useState(new Date().toLocaleString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
  const sealInputRef = useRef();

  const handleSealUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSealImage(ev.target.result);
      localStorage.setItem('hipro_seal_img', ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignAndApprove = () => {
    setSigning(true);
    localStorage.setItem('hipro_officer_name', officerName);
    localStorage.setItem('hipro_ceo_name', ceoName);
    setTimeout(() => {
      setOfficerSigned(true);
      setCeoSigned(true);
      onUpdateStatus(vendor.tracking_id, `Approved ${approvalClass}`, 'CEO Authorization', adminRemark);
      setSigning(false);
    }, 700);
  };

  const handlePrint = () => {
    // Inject print-only styles and trigger
    const style = document.createElement('style');
    style.id = 'dossier-print-style';
    style.innerHTML = `
      @media print {
        body > *:not(#dossier-print-wrapper) { display: none !important; }
        #dossier-print-wrapper { display: block !important; position: fixed; inset: 0; z-index: 9999999; background: white; }
        .no-print { display: none !important; }
        @page { margin: 0; size: A4; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => document.head.removeChild(style), 1000);
  };

  if (!vendor) return null;

  const docDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const address = [vendor.address, vendor.city, vendor.state, vendor.pincode].filter(Boolean).join(', ');

  return (
    <div id="dossier-print-wrapper" style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(6px)',
      zIndex: 999999, overflowY: 'auto', display: 'block'
    }}>

      {/* ══ ADMIN TOOLBAR (no print) ══ */}
      <div className="no-print" style={{
        position: 'sticky', top: 0, zIndex: 1000001,
        background: 'linear-gradient(135deg, #0F172A, #0B1B3D)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <FileText style={{ width: 18, height: 18, color: '#60A5FA' }} />
          <span style={{ color: '#60A5FA', fontSize: '0.8rem', fontWeight: 900 }}>📄 EMPANELMENT DOSSIER</span>
          <span style={{ fontFamily: 'monospace', color: '#34D399', fontWeight: 900 }}>{vendor.tracking_id}</span>
          <span style={{ color: '#E2E8F0', fontWeight: 700, fontSize: '0.85rem' }}>{vendor.company_name}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 800, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer' }}>
            <Printer style={{ width: 14, height: 14 }} /> 🖨️ Print This Document
          </button>
          <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
            <X style={{ width: 14, height: 14 }} /> Close
          </button>
        </div>
      </div>

      {/* ══ ADMIN SIDE PANEL (no print) — Sign & Seal Controls ══ */}
      <div className="no-print" style={{
        maxWidth: 900, margin: '1.5rem auto 0 auto', padding: '0 1rem',
        display: 'flex', gap: '1rem', flexWrap: 'wrap'
      }}>
        {/* Left panel: Approval action */}
        <div style={{ flex: '1 1 360px', background: '#1E293B', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#60A5FA', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck style={{ width: 16, height: 16 }} /> Step 1 — Review & Authorize
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.73rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Approval Class</label>
            <select value={approvalClass} onChange={e => setApprovalClass(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.82rem', fontWeight: 700 }}>
              <option value="Class-A">✅ Class-A — Tier 1 Prime Contractor</option>
              <option value="Class-B">✅ Class-B — Tier 2 Regional Contractor</option>
              <option value="Class-C">✅ Class-C — Tier 3 Sub-Contractor</option>
            </select>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.73rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Officer Name (will appear on signature)</label>
            <input value={officerName} onChange={e => setOfficerName(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.82rem', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.73rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>CEO / Authorized Signatory Name</label>
            <input value={ceoName} onChange={e => setCeoName(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.82rem', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.73rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Signature Style</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['cursive', '"Dancing Script", cursive', '"Brush Script MT", cursive'].map((f, i) => (
                <button key={f} onClick={() => setSigFont(f)}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: 8, border: `1.5px solid ${sigFont === f ? '#60A5FA' : 'rgba(255,255,255,0.15)'}`, background: sigFont === f ? 'rgba(96,165,250,0.15)' : '#0F172A', color: 'white', cursor: 'pointer', fontFamily: f, fontSize: '0.85rem', fontWeight: 600 }}>
                  {officerName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSignAndApprove} disabled={signing}
            style={{ width: '100%', padding: '0.7rem', borderRadius: 10, background: signing ? '#374151' : 'linear-gradient(135deg, #047857, #059669)', color: 'white', border: 'none', cursor: signing ? 'default' : 'pointer', fontWeight: 900, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle2 style={{ width: 16, height: 16 }} />
            {signing ? 'Signing…' : `✅ Sign & Approve ${approvalClass}`}
          </button>

          {(officerSigned && ceoSigned) && (
            <div style={{ marginTop: '0.65rem', padding: '0.6rem 0.75rem', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: 8, fontSize: '0.78rem', color: '#34D399', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 style={{ width: 15, height: 15 }} /> Signed & Authorized ✓
            </div>
          )}

          {vendor.status !== 'Rejected' && (
            <button onClick={() => { onUpdateStatus(vendor.tracking_id, 'Rejected', 'Application Closed', adminRemark); onClose(); }}
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem', borderRadius: 10, background: 'rgba(220,38,38,0.15)', color: '#FCA5A5', border: '1px solid rgba(220,38,38,0.4)', cursor: 'pointer', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <XCircle style={{ width: 14, height: 14 }} /> Reject Application
            </button>
          )}
        </div>

        {/* Right panel: Official Seal + Remarks */}
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ background: '#1E293B', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FBBF24', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload style={{ width: 16, height: 16 }} /> Step 2 — Upload Official Company Seal
            </div>
            <input ref={sealInputRef} type="file" accept="image/*" onChange={handleSealUpload} style={{ display: 'none' }} />
            <div onClick={() => sealInputRef.current.click()}
              style={{ border: '2px dashed rgba(251,191,36,0.4)', borderRadius: 12, padding: '1rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(251,191,36,0.05)', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
              {sealImage ? (
                <img src={sealImage} alt="Official Seal" style={{ maxHeight: 90, maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} />
              ) : (
                <>
                  <Upload style={{ width: 24, height: 24, color: '#FBBF24' }} />
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Click to upload company seal (PNG/JPG with transparent bg)</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B' }}>This seal will appear on the printed dossier</div>
                </>
              )}
            </div>
            {sealImage && (
              <button onClick={() => { setSealImage(null); localStorage.removeItem('hipro_seal_img'); }}
                style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#FCA5A5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                ✕ Remove Seal
              </button>
            )}
          </div>

          <div style={{ background: '#1E293B', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#A78BFA', marginBottom: '0.65rem' }}>✏️ Step 3 — Internal Audit Remarks (saved, not printed)</div>
            <textarea value={adminRemark} onChange={e => setAdminRemark(e.target.value)}
              placeholder="e.g. MSME verified, GST cross-checked, Site inspection done by Chief Engineer on 01-Aug-2026..."
              style={{ width: '100%', padding: '0.7rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: '#0F172A', color: '#F8FAFC', fontSize: '0.8rem', fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box' }} />
            <button onClick={() => onUpdateStatus(vendor.tracking_id, vendor.status || 'Under Verification', vendor.current_stage || 'Document Verification', adminRemark)}
              style={{ marginTop: '0.5rem', padding: '0.45rem 1rem', borderRadius: 8, background: '#6D28D9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.78rem' }}>
              💾 Save Remark
            </button>
          </div>
        </div>
      </div>

      {/* ══ A4 DOCUMENT (this is what prints) ══ */}
      <div id="dossier-a4" style={{
        background: 'white', width: '210mm', minHeight: '297mm',
        margin: '1.5rem auto 5rem auto', padding: '15mm 14mm',
        fontFamily: '"Times New Roman", Georgia, serif', color: '#1A1A2E',
        fontSize: '10pt', lineHeight: 1.45,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        borderRadius: 4,
      }}>

        {/* Letterhead */}
        <div style={{ borderBottom: '3px solid #0047AB', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 7, background: '#0047AB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.7rem', flexShrink: 0 }}>
              HiPRO
            </div>
            <div>
              <div style={{ fontSize: '14pt', fontWeight: 900, color: '#0047AB', lineHeight: 1 }}>HINDUSTAN PROJECTS</div>
              <div style={{ fontSize: '7pt', color: '#ED1C24', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Infrastructure • Construction • Engineering</div>
              <div style={{ fontSize: '6.5pt', color: '#64748B', marginTop: 2 }}>Bhopal Ganj, Bhilwara – 311001, Rajasthan | empanelment@hindustanprojects.in | +91 7597000601</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {sealImage && <img src={sealImage} alt="Official Seal" style={{ height: 64, width: 64, objectFit: 'contain', marginBottom: 4, display: 'block', marginLeft: 'auto' }} />}
            <div style={{ fontSize: '7.5pt', color: '#0F172A', fontWeight: 900 }}>Ref: {vendor.tracking_id}</div>
            <div style={{ fontSize: '7pt', color: '#64748B' }}>Date: {docDate}</div>
            <div style={{ marginTop: 4, padding: '2px 7px', background: vendor.status?.includes('Approved') ? '#D1FAE5' : '#FEF9C3', border: `1px solid ${vendor.status?.includes('Approved') ? '#6EE7B7' : '#FDE68A'}`, borderRadius: 4, display: 'inline-block', fontWeight: 900, fontSize: '7.5pt', color: vendor.status?.includes('Approved') ? '#065F46' : '#92400E' }}>
              {vendor.status || 'Under Verification'}
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '12pt', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>VENDOR EMPANELMENT APPLICATION DOSSIER</div>
          <div style={{ fontSize: '8pt', color: '#475569', marginTop: '0.15rem' }}>Official Filing — Financial Year 2026–27 | ISO 9001:2015 Verified Process</div>
        </div>

        {/* Stage Progress */}
        <div style={{ padding: '0.5rem 0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 7, marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '6.5pt', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>Application Processing Stage</div>
          <StageBar currentStage={vendor.current_stage} status={vendor.status} />
          <div style={{ fontSize: '6.5pt', color: '#94A3B8', marginTop: 3 }}>
            Current Stage: <strong style={{ color: '#0047AB' }}>{vendor.current_stage || 'Document Verification'}</strong>
            &nbsp;•&nbsp; Submitted: {new Date(vendor.submitted_at || Date.now()).toLocaleString('en-IN')}
            &nbsp;•&nbsp; IP: {vendor.ip_address || 'N/A'}
          </div>
        </div>

        {/* SECTION A */}
        <Section letter="A" title="Company Entity & Contact Details" icon={Building2}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div>
              <Row label="Company / Firm Name" value={vendor.company_name} />
              <Row label="Entity Type" value={vendor.entity_type} />
              <Row label="Year of Establishment" value={vendor.est_year} />
              <Row label="Empanelment Category" value={vendor.category} />
              <Row label="Primary Role / Specialization" value={vendor.primary_role || vendor.primaryRole} />
            </div>
            <div>
              <Row label="Contact Person" value={vendor.contact_name} />
              <Row label="Designation" value={vendor.designation} />
              <Row label="Email Address" value={vendor.email} />
              <Row label="Mobile Number" value={vendor.phone} />
              <Row label="Owner / Proprietor" value={vendor.owner_name || vendor.ownerName} />
            </div>
          </div>
          <Row label="Registered Address" value={address || undefined} />
          <Row label="Technical Scope / Skills" value={vendor.skills_details || vendor.skillsDetails} />
        </Section>

        {/* SECTION B */}
        <Section letter="B" title="Statutory Tax & Banking Identity" icon={CreditCard} color="#7C3AED">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div>
              <Row label="GSTIN" value={vendor.gstin} mono />
              <Row label="PAN Card No." value={vendor.pan} mono />
              <Row label="MSME Reg. No." value={vendor.msme_no} mono />
            </div>
            <div>
              <Row label="Bank Name & Branch" value={vendor.bank_name} />
              <Row label="Account Number" value={vendor.bank_account} mono />
              <Row label="IFSC Code" value={vendor.ifsc} mono />
            </div>
          </div>
        </Section>

        {/* SECTION C */}
        <Section letter="C" title="Financial Turnover & Project Capacity" icon={DollarSign} color="#047857">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', margin: '0.4rem 0' }}>
            {[
              { label: 'FY 2022–23', value: vendor.turnover_2023 ? `₹ ${vendor.turnover_2023} L` : '—' },
              { label: 'FY 2023–24', value: vendor.turnover_2024 ? `₹ ${vendor.turnover_2024} L` : '—' },
              { label: 'FY 2024–25', value: vendor.turnover_2025 ? `₹ ${vendor.turnover_2025} L` : '—' },
              { label: 'Largest Order', value: vendor.largest_order ? `₹ ${vendor.largest_order} L` : '—' },
            ].map(c => (
              <div key={c.label} style={{ padding: '0.4rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 5, textAlign: 'center' }}>
                <div style={{ fontSize: '6pt', color: '#065F46', fontWeight: 700 }}>{c.label}</div>
                <div style={{ fontSize: '9pt', fontWeight: 900, color: '#047857', marginTop: 2 }}>{c.value}</div>
              </div>
            ))}
          </div>
          <Row label="Existing Empanelments" value={vendor.existing_empanels} />
        </Section>

        {/* SECTION D — Documents */}
        <Section letter="D" title="Uploaded Documents & Compliance Checklist" icon={FileCheck2} color="#D97706">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.85rem' }}>
            {[
              { label: 'GST Registration Certificate', value: vendor.gst_doc },
              { label: 'PAN Card', value: vendor.pan_doc },
              { label: 'Cancelled Cheque / Bank Statement', value: vendor.bank_doc },
              { label: 'Experience / Completion Certificates', value: vendor.exp_doc },
            ].map(doc => (
              <div key={doc.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.4rem', background: doc.value ? '#F0FDF4' : '#FEF2F2', borderRadius: 4, border: `1px solid ${doc.value ? '#BBF7D0' : '#FECACA'}` }}>
                <span style={{ fontSize: '9pt', flexShrink: 0 }}>{doc.value ? '✅' : '❌'}</span>
                <div>
                  <div style={{ fontSize: '7pt', fontWeight: 700, color: '#0F172A' }}>{doc.label}</div>
                  {doc.value && <div style={{ fontSize: '6.5pt', color: '#6B7280', fontFamily: 'monospace' }}>{doc.value}</div>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION E — Committee Remarks */}
        <Section letter="E" title="Procurement Committee Internal Remarks" icon={Edit3} color="#475569">
          <div style={{ padding: '0.5rem 0.6rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 5, minHeight: 32 }}>
            <div style={{ fontSize: '8pt', color: '#0F172A', fontStyle: (adminRemark || vendor.admin_remarks) ? 'normal' : 'italic' }}>
              {adminRemark || vendor.admin_remarks || 'No internal remarks recorded by committee.'}
            </div>
          </div>
        </Section>

        {/* SECTION F — Signature Authorization Block */}
        <Section letter="F" title="Digital Authorization & Official Signatory" icon={ShieldCheck} color="#0047AB">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '0.75rem', marginTop: '0.35rem', alignItems: 'start' }}>

            {/* Officer Signature */}
            <div style={{ border: '1.5px solid #CBD5E1', borderRadius: 7, padding: '0.65rem' }}>
              <div style={{ fontSize: '6.5pt', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Procurement Officer</div>
              <div style={{ height: 40, borderBottom: '1px dashed #CBD5E1', marginBottom: '0.3rem', display: 'flex', alignItems: 'flex-end', paddingBottom: 3 }}>
                {officerSigned
                  ? <span style={{ fontFamily: sigFont, fontSize: '13pt', color: '#0047AB' }}>{officerName}</span>
                  : <span style={{ fontSize: '6.5pt', color: '#94A3B8' }}>Awaiting signature…</span>
                }
              </div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Name:</strong> {officerName}</div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Date:</strong> {officerSigned ? signedAt : '____________________'}</div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Role:</strong> Empanelment Review Officer</div>
              {officerSigned && <div style={{ marginTop: 3, fontSize: '6.5pt', background: '#D1FAE5', color: '#065F46', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>✓ DIGITALLY SIGNED</div>}
            </div>

            {/* CEO Signature */}
            <div style={{ border: '1.5px solid #CBD5E1', borderRadius: 7, padding: '0.65rem' }}>
              <div style={{ fontSize: '6.5pt', fontWeight: 900, color: '#047857', textTransform: 'uppercase', marginBottom: '0.3rem' }}>CEO / Authorized Signatory</div>
              <div style={{ height: 40, borderBottom: '1px dashed #CBD5E1', marginBottom: '0.3rem', display: 'flex', alignItems: 'flex-end', paddingBottom: 3 }}>
                {ceoSigned
                  ? <span style={{ fontFamily: sigFont, fontSize: '13pt', color: '#047857' }}>{ceoName}</span>
                  : <span style={{ fontSize: '6.5pt', color: '#94A3B8' }}>Awaiting CEO authorization…</span>
                }
              </div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Name:</strong> {ceoName}</div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Date:</strong> {ceoSigned ? signedAt : '____________________'}</div>
              <div style={{ fontSize: '6.5pt', color: '#475569' }}><strong>Role:</strong> Managing Director, Hindustan Projects</div>
              {ceoSigned && <div style={{ marginTop: 3, fontSize: '6.5pt', background: '#D1FAE5', color: '#065F46', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>✓ CEO AUTHORIZED</div>}
            </div>

            {/* Official Seal */}
            <div style={{ border: '1.5px solid #CBD5E1', borderRadius: 7, padding: '0.65rem', textAlign: 'center' }}>
              <div style={{ fontSize: '6.5pt', fontWeight: 900, color: '#D97706', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Official Seal</div>
              <div style={{ width: '100%', height: 64, border: '1px dashed #CBD5E1', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
                {sealImage
                  ? <img src={sealImage} alt="Seal" style={{ maxHeight: 56, maxWidth: '100%', objectFit: 'contain' }} />
                  : <span style={{ fontSize: '6pt', color: '#CBD5E1', textAlign: 'center' }}>Upload seal<br/>from panel</span>
                }
              </div>
            </div>

          </div>

          {/* Final Approval Banner */}
          {officerSigned && ceoSigned && (
            <div style={{ marginTop: '0.65rem', padding: '0.6rem 0.85rem', background: '#D1FAE5', border: '2px solid #10B981', borderRadius: 7, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '12pt' }}>✅</span>
              <div>
                <div style={{ fontSize: '9pt', fontWeight: 900, color: '#065F46' }}>APPLICATION APPROVED — {vendor.status}</div>
                <div style={{ fontSize: '7pt', color: '#047857' }}>Authorized on {signedAt} · Procurement Committee, Hindustan Projects · Ref: {vendor.tracking_id}</div>
              </div>
            </div>
          )}
        </Section>

        {/* Footer */}
        <div style={{ marginTop: '1.25rem', paddingTop: '0.6rem', borderTop: '2px solid #0047AB', display: 'flex', justifyContent: 'space-between', fontSize: '6.5pt', color: '#64748B' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0F172A' }}>HINDUSTAN PROJECTS — EMPANELMENT CONTROL OFFICE</div>
            <div>Bhopal Ganj, Bhilwara – 311001, Rajasthan | empanelment@hindustanprojects.in</div>
            <div>Verify at: empanelment.hindustanprojects.in | This is a system-generated document.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, color: '#0047AB' }}>Ref: {vendor.tracking_id}</div>
            <div>Generated: {docDate}</div>
            <div style={{ marginTop: 2, fontFamily: 'monospace', fontSize: '6pt', color: '#94A3B8' }}>Hash: {vendor.hash_signature?.slice(0, 24) || '—'}…</div>
          </div>
        </div>

      </div>
      {/* end A4 */}

    </div>
  );
}
