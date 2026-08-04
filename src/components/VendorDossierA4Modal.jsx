import React, { useState } from 'react';
import {
  X, Printer, CheckCircle2, XCircle, AlertTriangle,
  Building2, CreditCard, DollarSign, FileCheck2, Edit3,
  ShieldCheck, FileText, MapPin, User, Phone, Mail,
  Calendar, Award
} from 'lucide-react';

/* ─── Stage Progress ─────────────────────────────────────── */
const STAGES = [
  'Application Submitted',
  'Document Verification',
  'Financial Committee Audit',
  'CEO Authorization',
  'Certificate Issued',
];

function StageBar({ currentStage, status }) {
  let activeIdx = 1;
  if (status?.includes('Approved')) activeIdx = 5;
  else if (currentStage?.includes('CEO')) activeIdx = 3;
  else if (currentStage?.includes('Committee') || currentStage?.includes('Financial')) activeIdx = 2;
  else if (status === 'Rejected') activeIdx = 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '1.25rem 0', overflowX: 'auto' }}>
      {STAGES.map((s, i) => {
        const done = i < activeIdx;
        const current = i === activeIdx - 1;
        const rejected = status === 'Rejected' && i === 1;
        const color = rejected ? '#ED1C24' : done ? '#047857' : current ? '#0047AB' : '#CBD5E1';
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: done || current ? color : 'white',
                border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 900,
                color: done || current ? 'white' : color,
                flexShrink: 0
              }}>
                {done ? '✓' : rejected ? '✕' : i + 1}
              </div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color, textAlign: 'center', marginTop: 3, maxWidth: 80 }}>
                {s}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < activeIdx - 1 ? '#047857' : '#E2E8F0', minWidth: 20 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Row helper ─────────────────────────────────────────── */
function Row({ label, value, mono }) {
  if (!value || value === 'undefined' || value === 'null') return null;
  return (
    <div style={{ display: 'flex', padding: '0.4rem 0', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ width: '38%', fontSize: '0.78rem', color: '#64748B', fontWeight: 600, paddingRight: '0.5rem' }}>{label}</div>
      <div style={{ width: '62%', fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', fontFamily: mono ? 'monospace' : undefined, wordBreak: 'break-all' }}>
        {value}
      </div>
    </div>
  );
}

/* ─── Section Box ────────────────────────────────────────── */
function Section({ letter, title, icon: Icon, color = '#0047AB', children }) {
  return (
    <div style={{ marginBottom: '1rem', breakInside: 'avoid' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', background: `${color}12`, borderLeft: `4px solid ${color}`, borderRadius: '0 8px 8px 0', marginBottom: '0.4rem' }}>
        <Icon style={{ width: 14, height: 14, color }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Section {letter} — {title}
        </span>
      </div>
      <div style={{ padding: '0 0.5rem' }}>{children}</div>
    </div>
  );
}

/* ─── Main Modal ─────────────────────────────────────────── */
export default function VendorDossierA4Modal({ vendor, onClose, onUpdateStatus, adminRemark, setAdminRemark }) {
  const [signing, setSigning] = useState(false);
  const [officerSigned, setOfficerSigned] = useState(!!vendor?.officer_signed);
  const [ceoSigned, setCeoSigned] = useState(!!vendor?.ceo_signed);
  const [signedAt] = useState(new Date().toLocaleString('en-IN'));

  const handlePrint = () => window.print();

  const handleSignAndApprove = (classLevel) => {
    setSigning(true);
    setTimeout(() => {
      setOfficerSigned(true);
      setCeoSigned(true);
      onUpdateStatus(vendor.tracking_id, `Approved ${classLevel}`, 'CEO Authorization', adminRemark);
      setSigning(false);
    }, 800);
  };

  if (!vendor) return null;

  const docDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)',
      zIndex: 999999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '1.5rem', overflowY: 'auto'
    }}>
      {/* ── Toolbar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000001,
        background: '#0F172A', padding: '0.75rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
      }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700 }}>
            📄 Empanelment Application Dossier
          </span>
          <span style={{ fontFamily: 'monospace', color: '#60A5FA', fontWeight: 900, fontSize: '0.85rem' }}>
            {vendor.tracking_id}
          </span>
          <span style={{ color: '#E2E8F0', fontWeight: 800, fontSize: '0.9rem' }}>
            {vendor.company_name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Quick Approve Buttons */}
          {!vendor.status?.includes('Approved') && (
            <>
              <button
                onClick={() => handleSignAndApprove('Class-A')}
                disabled={signing}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 800, background: '#047857', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <CheckCircle2 style={{ width: 14, height: 14 }} />
                {signing ? 'Signing…' : '✅ Sign & Approve Class-A'}
              </button>
              <button
                onClick={() => handleSignAndApprove('Class-B')}
                disabled={signing}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 800, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <CheckCircle2 style={{ width: 14, height: 14 }} />
                Sign & Approve Class-B
              </button>
              <button
                onClick={() => { onUpdateStatus(vendor.tracking_id, 'Rejected', 'Application Closed', adminRemark); onClose(); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 800, background: '#DC2626', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <XCircle style={{ width: 14, height: 14 }} /> Reject
              </button>
            </>
          )}

          <button
            onClick={handlePrint}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 800, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <Printer style={{ width: 14, height: 14 }} /> Print / PDF
          </button>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '0.45rem 0.75rem', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, fontSize: '0.78rem' }}>
            <X style={{ width: 14, height: 14 }} /> Close
          </button>
        </div>
      </div>

      {/* ── A4 Document ── */}
      <div id="dossier-a4" style={{
        background: 'white', width: '210mm', minHeight: '297mm',
        padding: '18mm 16mm', marginTop: '60px', borderRadius: 4,
        fontFamily: '"Times New Roman", Georgia, serif',
        color: '#1A1A2E', fontSize: '11pt', lineHeight: 1.5,
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
      }}>

        {/* ── Letterhead ── */}
        <div style={{ borderBottom: '3px solid #0047AB', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: '#0047AB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.02em', flexShrink: 0
                }}>
                  HiPRO
                </div>
                <div>
                  <div style={{ fontSize: '16pt', fontWeight: 900, color: '#0047AB', letterSpacing: '0.03em', lineHeight: 1 }}>
                    HINDUSTAN PROJECTS
                  </div>
                  <div style={{ fontSize: '7.5pt', color: '#ED1C24', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Infrastructure • Construction • Engineering
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '7.5pt', color: '#64748B', marginTop: '0.2rem' }}>
                Bhopal Ganj, Bhilwara – 311001, Rajasthan, India &nbsp;|&nbsp;
                empanelment@hindustanprojects.in &nbsp;|&nbsp;
                +91 7597000601
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '7.5pt', color: '#64748B' }}>
              <div style={{ fontSize: '8pt', fontWeight: 800, color: '#0F172A' }}>Ref No: {vendor.tracking_id}</div>
              <div>Date: {docDate}</div>
              <div style={{ marginTop: 4, padding: '2px 8px', background: vendor.status?.includes('Approved') ? '#D1FAE5' : '#FEF9C3', border: `1px solid ${vendor.status?.includes('Approved') ? '#6EE7B7' : '#FDE68A'}`, borderRadius: 4, display: 'inline-block', fontWeight: 900, color: vendor.status?.includes('Approved') ? '#065F46' : '#92400E', fontSize: '8pt' }}>
                {vendor.status || 'Under Verification'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Document Title ── */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '13pt', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Vendor Empanelment Application Dossier
          </div>
          <div style={{ fontSize: '9pt', color: '#475569', marginTop: '0.2rem' }}>
            Official Empanelment Filing — Financial Year 2026–27 &nbsp;|&nbsp; ISO 9001:2015 Verified Process
          </div>
        </div>

        {/* ── Stage Progress Bar ── */}
        <div style={{ padding: '0.6rem 0.85rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, marginBottom: '1rem' }}>
          <div style={{ fontSize: '7.5pt', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
            Application Processing Stage
          </div>
          <StageBar currentStage={vendor.current_stage} status={vendor.status} />
          <div style={{ fontSize: '7pt', color: '#94A3B8', marginTop: 2 }}>
            Current Stage: <strong style={{ color: '#0047AB' }}>{vendor.current_stage || 'Document Verification'}</strong>
            &nbsp;•&nbsp; Submitted: {new Date(vendor.submitted_at || Date.now()).toLocaleString('en-IN')}
            &nbsp;•&nbsp; IP: {vendor.ip_address || 'N/A'}
          </div>
        </div>

        {/* ── SECTION A: Company Identity ── */}
        <Section letter="A" title="Company Entity & Contact Details" icon={Building2}>
          <Row label="Company / Firm Name" value={vendor.company_name} />
          <Row label="Entity Type" value={vendor.entity_type} />
          <Row label="Year of Establishment" value={vendor.est_year} />
          <Row label="Empanelment Category" value={vendor.category} />
          <Row label="Primary Role / Specialization" value={vendor.primary_role || vendor.primaryRole} />
          <Row label="Owner / Proprietor Name" value={vendor.owner_name || vendor.ownerName} />
          <Row label="Owner Contact" value={vendor.owner_contact || vendor.ownerContact} />
          <Row label="Contact Person (Signatory)" value={vendor.contact_name} />
          <Row label="Designation" value={vendor.designation} />
          <Row label="Email Address" value={vendor.email} />
          <Row label="Mobile Number" value={vendor.phone} />
          <Row label="Registered Address" value={`${vendor.address || ''}, ${vendor.city || ''}, ${vendor.state || ''} – ${vendor.pincode || ''}`} />
          <Row label="Skills / Technical Scope" value={vendor.skills_details || vendor.skillsDetails} />
          <Row label="Team Size" value={vendor.team_size || vendor.teamSize} />
        </Section>

        {/* ── SECTION B: Statutory & Banking ── */}
        <Section letter="B" title="Statutory Tax & Banking Identity" icon={CreditCard} color="#7C3AED">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div>
              <Row label="GSTIN Number" value={vendor.gstin} mono />
              <Row label="PAN Card Number" value={vendor.pan} mono />
              <Row label="MSME Registration No." value={vendor.msme_no} mono />
            </div>
            <div>
              <Row label="Bank Name & Branch" value={vendor.bank_name} />
              <Row label="Bank Account Number" value={vendor.bank_account} mono />
              <Row label="IFSC Code" value={vendor.ifsc} mono />
            </div>
          </div>
        </Section>

        {/* ── SECTION C: Financial Capacity ── */}
        <Section letter="C" title="Financial Turnover & Project Capacity" icon={DollarSign} color="#047857">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', margin: '0.5rem 0' }}>
            {[
              { label: 'FY 2022–23', value: vendor.turnover_2023 ? `₹ ${vendor.turnover_2023} Lakhs` : '—' },
              { label: 'FY 2023–24', value: vendor.turnover_2024 ? `₹ ${vendor.turnover_2024} Lakhs` : '—' },
              { label: 'FY 2024–25', value: vendor.turnover_2025 ? `₹ ${vendor.turnover_2025} Lakhs` : '—' },
              { label: 'Largest Single Order', value: vendor.largest_order ? `₹ ${vendor.largest_order} Lakhs` : '—' },
            ].map(c => (
              <div key={c.label} style={{ padding: '0.5rem 0.6rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontSize: '7pt', color: '#065F46', fontWeight: 700 }}>{c.label}</div>
                <div style={{ fontSize: '10pt', fontWeight: 900, color: '#047857', marginTop: 2 }}>{c.value}</div>
              </div>
            ))}
          </div>
          <Row label="BUA / Covered Area (Sq ft in Lakhs)" value={vendor.bua_area ? `${vendor.bua_area} Lakh Sq.ft.` : undefined} />
          <Row label="CPA / Carpet Area (Sq ft in Lakhs)" value={vendor.cpa_area ? `${vendor.cpa_area} Lakh Sq.ft.` : undefined} />
          <Row label="Existing Empanelments / Approvals" value={vendor.existing_empanels} />
        </Section>

        {/* ── SECTION D: Documents Checklist ── */}
        <Section letter="D" title="Uploaded Documents & Compliance Checklist" icon={FileCheck2} color="#D97706">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1rem', padding: '0.4rem 0' }}>
            {[
              { label: 'GST Registration Certificate', value: vendor.gst_doc },
              { label: 'PAN Card', value: vendor.pan_doc },
              { label: 'Cancelled Cheque / Bank Statement', value: vendor.bank_doc },
              { label: 'Experience / Work Order Certificates', value: vendor.exp_doc },
            ].map(doc => (
              <div key={doc.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem', background: doc.value ? '#F0FDF4' : '#FEF2F2', borderRadius: 4, border: `1px solid ${doc.value ? '#BBF7D0' : '#FECACA'}` }}>
                <span style={{ fontSize: '10pt', flexShrink: 0 }}>{doc.value ? '✅' : '❌'}</span>
                <div>
                  <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#0F172A' }}>{doc.label}</div>
                  {doc.value && <div style={{ fontSize: '7pt', color: '#6B7280', fontFamily: 'monospace' }}>{doc.value}</div>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SECTION E: Admin Remarks ── */}
        <Section letter="E" title="Procurement Committee Internal Audit Remarks" icon={Edit3} color="#475569">
          <div style={{ padding: '0.6rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 6, minHeight: 40 }}>
            <div style={{ fontSize: '8.5pt', color: '#0F172A', fontStyle: adminRemark ? 'normal' : 'italic' }}>
              {adminRemark || vendor.admin_remarks || 'No internal remarks recorded by committee.'}
            </div>
          </div>
        </Section>

        {/* ── SECTION F: Digital Signature Authorization Block ── */}
        <Section letter="F" title="Digital Authorization & Signatory Block" icon={ShieldCheck} color="#0047AB">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>

            {/* Procurement Officer */}
            <div style={{ border: '1.5px solid #CBD5E1', borderRadius: 8, padding: '0.85rem' }}>
              <div style={{ fontSize: '7.5pt', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Procurement Officer Signature
              </div>
              <div style={{ height: 45, borderBottom: '1px solid #CBD5E1', marginBottom: '0.35rem', display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }}>
                {officerSigned ? (
                  <span style={{ fontFamily: 'cursive', fontSize: '14pt', color: '#0047AB' }}>
                    Authorized Officer
                  </span>
                ) : (
                  <span style={{ fontSize: '7.5pt', color: '#94A3B8' }}>Awaiting signature…</span>
                )}
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Name:</strong> Procurement Committee, Hindustan Projects
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Date:</strong> {officerSigned ? signedAt : '______________________'}
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Designation:</strong> Empanelment Review Officer
              </div>
              {officerSigned && (
                <div style={{ marginTop: 4, fontSize: '7pt', background: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>
                  ✓ DIGITALLY SIGNED & VERIFIED
                </div>
              )}
            </div>

            {/* CEO / Authorized Signatory */}
            <div style={{ border: '1.5px solid #CBD5E1', borderRadius: 8, padding: '0.85rem' }}>
              <div style={{ fontSize: '7.5pt', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                CEO / Authorized Signatory
              </div>
              <div style={{ height: 45, borderBottom: '1px solid #CBD5E1', marginBottom: '0.35rem', display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }}>
                {ceoSigned ? (
                  <span style={{ fontFamily: 'cursive', fontSize: '14pt', color: '#047857' }}>
                    Director, HiPRO
                  </span>
                ) : (
                  <span style={{ fontSize: '7.5pt', color: '#94A3B8' }}>Awaiting CEO authorization…</span>
                )}
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Name:</strong> Director / Managing Director, Hindustan Projects
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Date:</strong> {ceoSigned ? signedAt : '______________________'}
              </div>
              <div style={{ fontSize: '7pt', color: '#475569' }}>
                <strong>Designation:</strong> CEO / Authorized Signatory
              </div>
              {ceoSigned && (
                <div style={{ marginTop: 4, fontSize: '7pt', background: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>
                  ✓ CEO AUTHORIZATION COMPLETE
                </div>
              )}
            </div>
          </div>

          {/* Approval Status Box */}
          {(officerSigned && ceoSigned) && (
            <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: '#D1FAE5', border: '2px solid #10B981', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '14pt' }}>✅</span>
              <div>
                <div style={{ fontSize: '9pt', fontWeight: 900, color: '#065F46' }}>
                  APPLICATION APPROVED — {vendor.status}
                </div>
                <div style={{ fontSize: '7.5pt', color: '#047857' }}>
                  Authorized on {signedAt} by Procurement Committee, Hindustan Projects
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* ── Footer ── */}
        <div style={{ marginTop: '1.5rem', paddingTop: '0.75rem', borderTop: '2px solid #0047AB', display: 'flex', justifyContent: 'space-between', fontSize: '7pt', color: '#64748B' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0F172A' }}>HINDUSTAN PROJECTS — EMPANELMENT CONTROL OFFICE</div>
            <div>Bhopal Ganj, Bhilwara – 311001, Rajasthan | empanelment@hindustanprojects.in</div>
            <div>This document is system-generated via the official HiPRO Empanelment Portal. Verify at: empanelment.hindustanprojects.in</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, color: '#0047AB' }}>Ref: {vendor.tracking_id}</div>
            <div>Generated: {new Date().toLocaleDateString('en-IN')}</div>
            <div style={{ marginTop: 2, fontFamily: 'monospace', fontSize: '6.5pt', color: '#94A3B8' }}>
              Hash: {vendor.hash_signature?.slice(0, 20) || '—'}…
            </div>
          </div>
        </div>

      </div>

      {/* ── Admin Remarks Input (below document, not printed) ── */}
      <div className="no-print" style={{
        width: '210mm', marginTop: '1.5rem', marginBottom: '4rem',
        background: '#1E293B', borderRadius: 16, padding: '1.25rem 1.5rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E2E8F0', marginBottom: '0.65rem' }}>
          ✏️ Procurement Committee Internal Audit Remarks (Admin Only — Not Printed on Dossier)
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
          <textarea
            value={adminRemark}
            onChange={e => setAdminRemark(e.target.value)}
            placeholder="Enter internal committee notes here (e.g. Site inspection done by Chief Engineer, MSME verified via Udyam Portal, GST cross-checked)..."
            style={{
              flex: 1, padding: '0.75rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: '0.83rem',
              fontFamily: 'inherit', minHeight: 70, resize: 'vertical'
            }}
          />
          <button
            onClick={() => onUpdateStatus(vendor.tracking_id, vendor.status || 'Under Verification', vendor.current_stage || 'Document Verification', adminRemark)}
            style={{ padding: '0.65rem 1.2rem', borderRadius: 10, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            💾 Save Remark
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body > * { display: none; }
          #dossier-a4 { display: block !important; box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
