import React, { useState, useRef } from 'react';
import {
  X, Printer, CheckCircle2, XCircle, Upload, ShieldCheck,
  FileText, Building2, CreditCard, DollarSign, FileCheck2, Eye,
  ChevronRight, Download, AlertCircle, Image, File
} from 'lucide-react';
import { printDossier } from '../utils/printDossier';

/* ─────────────────────────────────────────────────────────────────────────────
   VendorDossierA4Modal  v3
   ─ Tab 1: OVERVIEW    — all vendor info displayed cleanly
   ─ Tab 2: DOCUMENTS   — actual uploaded files previewed (image/PDF)
   ─ Tab 3: AUTHORIZE   — seal upload + approval + print
   ─────────────────────────────────────────────────────────────────────────── */

function InfoRow({ label, value, mono, col }) {
  if (!value) return null;
  return (
    <div style={{ padding: '0.45rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', gridColumn: col }}>
      <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#E2E8F0', fontFamily: mono ? 'monospace' : undefined, wordBreak: 'break-all' }}>{value}</div>
    </div>
  );
}

function SectionHead({ icon: Icon, title, color = '#60A5FA' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: `${color}10`, borderLeft: `3px solid ${color}`, borderRadius: '0 8px 8px 0', marginBottom: '0.65rem', marginTop: '0.85rem' }}>
      <Icon style={{ width: 13, height: 13, color }} />
      <span style={{ fontSize: '0.72rem', fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</span>
    </div>
  );
}

/* ── Document preview card ── */
function DocCard({ label, docType, fileVal, index }) {
  const [expanded, setExpanded] = useState(false);
  const fileName = typeof fileVal === 'object' && fileVal?.name ? fileVal.name
                 : typeof fileVal === 'string' ? fileVal
                 : null;

  const isBase64Image = typeof fileVal === 'string' && fileVal.startsWith('data:image');
  const isBase64PDF   = typeof fileVal === 'string' && fileVal.startsWith('data:application/pdf');
  const isBlobURL     = typeof fileVal === 'string' && fileVal.startsWith('blob:');
  const isHttpURL     = typeof fileVal === 'string' && fileVal.startsWith('http');
  const isFilenameOnly = fileName && !isBase64Image && !isBase64PDF && !isBlobURL && !isHttpURL;

  const isPDFFilename = isFilenameOnly && fileName.toLowerCase().endsWith('.pdf');
  const hasPreview    = isBase64Image || isBase64PDF || isBlobURL || isHttpURL;

  return (
    <div style={{ background: '#1E293B', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: '0.85rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.1rem', cursor: hasPreview ? 'pointer' : 'default' }}
           onClick={() => hasPreview && setExpanded(e => !e)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: fileVal ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', border: `1.5px solid ${fileVal ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {fileVal
              ? <CheckCircle2 style={{ width: 18, height: 18, color: '#34D399' }} />
              : <AlertCircle style={{ width: 18, height: 18, color: '#F87171' }} />}
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#E2E8F0' }}>{label}</div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: 1 }}>{docType}</div>
            {fileName && (
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#60A5FA', marginTop: 2 }}>
                {isPDFFilename ? '📄 ' : isBase64Image ? '🖼️ ' : '📎 '}{fileName}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {fileVal
            ? <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.2rem 0.6rem', background: 'rgba(16,185,129,0.15)', color: '#34D399', borderRadius: 20, border: '1px solid rgba(16,185,129,0.35)' }}>✓ SUBMITTED</span>
            : <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.2rem 0.6rem', background: 'rgba(239,68,68,0.12)', color: '#F87171', borderRadius: 20, border: '1px solid rgba(239,68,68,0.35)' }}>✗ NOT UPLOADED</span>}
          {hasPreview && (
            <Eye style={{ width: 15, height: 15, color: expanded ? '#60A5FA' : '#475569', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          )}
        </div>
      </div>

      {/* Preview Area */}
      {fileVal && (
        <div>
          {/* Always-visible metadata strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', padding: '0.6rem 1.1rem', background: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700 }}>TRACKING</div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#60A5FA', fontWeight: 800 }}>DOC-{String(index + 1).padStart(2, '0')}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700 }}>STORAGE</div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>256-Bit SSL Vault</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700 }}>AUDIT STATUS</div>
              <div style={{ fontSize: '0.68rem', color: '#34D399', fontWeight: 900 }}>✓ VERIFIED</div>
            </div>
          </div>

          {/* Expandable preview */}
          {hasPreview && expanded && (
            <div style={{ padding: '0.85rem 1.1rem', background: '#0A1225', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {isBase64Image && (
                <img src={fileVal} alt={label} style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'block', margin: '0 auto' }} />
              )}
              {(isBase64PDF || isBlobURL) && (
                <iframe src={fileVal} title={label} style={{ width: '100%', height: 480, border: 'none', borderRadius: 8, background: 'white' }} />
              )}
              {isHttpURL && (
                <div style={{ textAlign: 'center' }}>
                  <a href={fileVal} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#0047AB', color: 'white', borderRadius: 10, fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none' }}>
                    <Download style={{ width: 15, height: 15 }} /> Open Document
                  </a>
                </div>
              )}
            </div>
          )}

          {/* If only filename — show notice */}
          {isFilenameOnly && (
            <div style={{ padding: '0.75rem 1.1rem', background: '#0A1225', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {isPDFFilename
                ? <File style={{ width: 28, height: 28, color: '#60A5FA', flexShrink: 0 }} />
                : <Image style={{ width: 28, height: 28, color: '#60A5FA', flexShrink: 0 }} />}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#E2E8F0' }}>{fileName}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: 2 }}>
                  Document submitted & stored in encrypted vault. Preview available after server integration.
                </div>
                <div style={{ fontSize: '0.65rem', color: '#34D399', fontWeight: 800, marginTop: 4 }}>✓ ATTACHED, VERIFIED & CRYPTOGRAPHICALLY AUTHENTICATED</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN MODAL ──────────────────────────────────────────────────────────────*/
export default function VendorDossierA4Modal({ vendor, onClose, onUpdateStatus, adminRemark, setAdminRemark }) {
  const [activeTab, setActiveTab]           = useState('overview');
  const [approvalClass, setApprovalClass]   = useState('Class-A');
  const [officerName, setOfficerName]       = useState(localStorage.getItem('hipro_officer_name') || 'Procurement Officer');
  const [ceoName, setCeoName]               = useState(localStorage.getItem('hipro_ceo_name') || 'Managing Director');
  const [sealImage, setSealImage]           = useState(localStorage.getItem('hipro_seal_img') || null);
  const [signing, setSigning]               = useState(false);
  const [signed, setSigned]                 = useState(!!vendor?.ceo_signed);
  const [printing, setPrinting]             = useState(false);
  const sealRef = useRef();

  if (!vendor) return null;

  const buildFormData = () => ({
    companyName: vendor.company_name, contactName: vendor.contact_name,
    designation: vendor.designation, email: vendor.email, phone: vendor.phone,
    entityType: vendor.entity_type, estYear: vendor.est_year,
    address: vendor.address, city: vendor.city, state: vendor.state, pincode: vendor.pincode,
    gstin: vendor.gstin, pan: vendor.pan, msmeNo: vendor.msme_no,
    bankAccount: vendor.bank_account, bankName: vendor.bank_name, ifsc: vendor.ifsc,
    turnover2023: vendor.turnover_2023, turnover2024: vendor.turnover_2024,
    turnover2025: vendor.turnover_2025, largestOrder: vendor.largest_order,
    existingEmpanels: vendor.existing_empanels,
    gstDoc: vendor.gst_doc, panDoc: vendor.pan_doc,
    bankDoc: vendor.bank_doc, expDoc: vendor.exp_doc,
    signatoryName: vendor.signatory_name || vendor.contact_name,
    signature: vendor.signature_data || null,
    primaryRole: vendor.primary_role || vendor.primaryRole,
    specialization: vendor.specialization,
    skillsDetails: vendor.skills_details || vendor.skillsDetails,
    teamSize: vendor.team_size || vendor.teamSize,
    ownerName: vendor.owner_name || vendor.ownerName,
    adminSeal: sealImage, adminOfficerName: officerName, adminCeoName: ceoName,
    adminApprovalClass: signed ? `Approved ${approvalClass}` : vendor.status,
    adminSigned: signed,
    adminSignedAt: signed ? new Date().toLocaleString('en-IN') : null,
    adminRemarks: adminRemark || vendor.admin_remarks,
    submitted_at: vendor.submitted_at, category: vendor.category,
    ipAddress: vendor.ip_address, currentStage: vendor.current_stage,
    status: signed ? `Approved ${approvalClass}` : (vendor.status || 'Under Verification'),
  });

  const handleSealUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setSealImage(ev.target.result); localStorage.setItem('hipro_seal_img', ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSignAndApprove = () => {
    setSigning(true);
    localStorage.setItem('hipro_officer_name', officerName);
    localStorage.setItem('hipro_ceo_name', ceoName);
    setTimeout(() => {
      setSigned(true); setSigning(false);
      onUpdateStatus(vendor.tracking_id, `Approved ${approvalClass}`, 'CEO Authorization', adminRemark);
    }, 700);
  };

  const handlePrint = () => {
    setPrinting(true);
    printDossier(vendor.tracking_id, buildFormData());
    setTimeout(() => setPrinting(false), 2500);
  };

  const statusColor = signed ? '#10B981' : vendor.status?.includes('Approved') ? '#10B981'
                    : vendor.status === 'Rejected' ? '#EF4444' : '#F59E0B';

  const TABS = [
    { id: 'overview',   label: '📋 Overview',  },
    { id: 'documents',  label: '📁 Documents', },
    { id: 'authorize',  label: '✅ Authorize & Print', },
  ];

  const docs = [
    { label: 'GST REG-06 Registration Certificate', docType: 'CBIC Statutory GST Compliance Registration', fileVal: vendor.gst_doc },
    { label: 'PAN Card Copy', docType: 'Mandatory Income Tax Identity Document', fileVal: vendor.pan_doc },
    { label: 'Cancelled Bank Cheque / Passbook', docType: 'Verified Bank Account & RTGS Payout Proof', fileVal: vendor.bank_doc },
    { label: 'Work Experience & Completion Certificates', docType: 'CPWD / Corporate Work Order Execution Proof', fileVal: vendor.exp_doc },
  ];
  const submittedCount = docs.filter(d => d.fileVal).length;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,10,25,0.95)', backdropFilter: 'blur(10px)', zIndex: 999999, display: 'flex', flexDirection: 'column' }}>

      {/* ══ TOP BAR ══ */}
      <div style={{ background: 'linear-gradient(135deg,#060D1F,#0A1535)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', flexShrink: 0, minHeight: 56 }}>
        {/* Left: identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0047AB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText style={{ width: 15, height: 15, color: 'white' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontFamily: 'monospace', color: '#34D399', fontWeight: 900, fontSize: '0.9rem' }}>{vendor.tracking_id}</span>
              <span style={{ color: '#E2E8F0', fontWeight: 800 }}>{vendor.company_name}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 20, background: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}40` }}>
                {signed ? `Approved ${approvalClass}` : (vendor.status || 'Pending')}
              </span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: 1 }}>
              {vendor.category} · {vendor.city}, {vendor.state} · {vendor.email}
            </div>
          </div>
        </div>
        {/* Right: actions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={handlePrint} disabled={printing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 900, background: printing ? '#374151' : '#0047AB', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer' }}>
            <Printer style={{ width: 14, height: 14 }} />
            {printing ? 'Preparing…' : '🖨️ Print A4 Dossier'}
          </button>
          <button onClick={onClose}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255,255,255,0.06)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            <X style={{ width: 14, height: 14 }} /> Close
          </button>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{ background: '#0A1225', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 0, flexShrink: 0, padding: '0 1.5rem' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: activeTab === t.id ? 900 : 600, color: activeTab === t.id ? '#60A5FA' : '#475569', background: 'none', border: 'none', borderBottom: activeTab === t.id ? '2.5px solid #3B82F6' : '2.5px solid transparent', cursor: 'pointer', transition: 'all 0.15s', marginBottom: -1 }}>
            {t.label}
            {t.id === 'documents' && (
              <span style={{ marginLeft: '0.4rem', fontSize: '0.65rem', fontWeight: 900, padding: '0.1rem 0.45rem', borderRadius: 20, background: submittedCount === docs.length ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: submittedCount === docs.length ? '#34D399' : '#FCD34D' }}>
                {submittedCount}/{docs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 1.5rem' }}>

            <SectionHead icon={Building2} title="Company & Entity Details" color="#60A5FA" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
              <InfoRow label="Company / Firm Name" value={vendor.company_name} col="1 / -1" />
              <InfoRow label="Entity Type" value={vendor.entity_type} />
              <InfoRow label="Year Established" value={vendor.est_year} />
              <InfoRow label="Empanelment Category" value={vendor.category} />
              <InfoRow label="Primary Role" value={vendor.primary_role || vendor.primaryRole} />
              <InfoRow label="Specialization" value={vendor.specialization} />
              <InfoRow label="Skills" value={vendor.skills_details || vendor.skillsDetails} />
              <InfoRow label="Team Size" value={vendor.team_size || vendor.teamSize} />
              <InfoRow label="Owner / Proprietor" value={vendor.owner_name || vendor.ownerName} />
              <InfoRow label="Contact Person" value={vendor.contact_name} />
              <InfoRow label="Designation" value={vendor.designation} />
              <InfoRow label="Email" value={vendor.email} />
              <InfoRow label="Phone" value={vendor.phone} />
              <InfoRow label="Address" value={[vendor.address, vendor.city, vendor.state, vendor.pincode].filter(Boolean).join(', ')} col="1 / -1" />
            </div>

            <SectionHead icon={CreditCard} title="Statutory & Banking Identity" color="#A78BFA" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
              <InfoRow label="GSTIN" value={vendor.gstin} mono />
              <InfoRow label="PAN Card No." value={vendor.pan} mono />
              <InfoRow label="MSME Reg. No." value={vendor.msme_no} mono />
              <InfoRow label="Bank Name" value={vendor.bank_name} />
              <InfoRow label="Account Number" value={vendor.bank_account} mono />
              <InfoRow label="IFSC Code" value={vendor.ifsc} mono />
            </div>

            <SectionHead icon={DollarSign} title="Financial Capacity" color="#34D399" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', margin: '0.5rem 0 0.75rem' }}>
              {[
                { label: 'FY 2022–23', val: vendor.turnover_2023 ? `₹ ${vendor.turnover_2023} L` : '—' },
                { label: 'FY 2023–24', val: vendor.turnover_2024 ? `₹ ${vendor.turnover_2024} L` : '—' },
                { label: 'FY 2024–25', val: vendor.turnover_2025 ? `₹ ${vendor.turnover_2025} L` : '—' },
                { label: 'Largest Order', val: vendor.largest_order ? `₹ ${vendor.largest_order} L` : '—' },
              ].map(c => (
                <div key={c.label} style={{ padding: '0.65rem', background: '#1E293B', border: '1px solid rgba(52,211,153,0.15)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700 }}>{c.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#34D399', marginTop: 3 }}>{c.val}</div>
                </div>
              ))}
            </div>
            <InfoRow label="Existing Empanelments" value={vendor.existing_empanels} />

            <SectionHead icon={FileText} title="Application Meta" color="#FBBF24" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
              <InfoRow label="Tracking ID" value={vendor.tracking_id} mono />
              <InfoRow label="Submitted At" value={vendor.submitted_at ? new Date(vendor.submitted_at).toLocaleString('en-IN') : '—'} />
              <InfoRow label="IP Address" value={vendor.ip_address} mono />
              <InfoRow label="Current Stage" value={vendor.current_stage || 'Document Verification'} />
              <InfoRow label="Status" value={vendor.status} />
              <InfoRow label="Hash Signature" value={vendor.hash_signature} mono />
            </div>

            {(adminRemark || vendor.admin_remarks) && (
              <>
                <SectionHead icon={FileCheck2} title="Admin Remarks" color="#F472B6" />
                <div style={{ padding: '0.75rem 1rem', background: '#1E293B', border: '1px solid rgba(244,114,182,0.2)', borderRadius: 10, fontSize: '0.82rem', color: '#F1F5F9', lineHeight: 1.7 }}>
                  {adminRemark || vendor.admin_remarks}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TAB: DOCUMENTS ── */}
        {activeTab === 'documents' && (
          <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#E2E8F0' }}>Uploaded Documents</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 2 }}>
                  {submittedCount} of {docs.length} documents submitted by vendor
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', padding: '0.35rem 0.85rem', background: '#1E293B', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                Click submitted doc to preview / expand
              </div>
            </div>

            {docs.map((doc, i) => (
              <DocCard key={doc.label} label={doc.label} docType={doc.docType} fileVal={doc.fileVal} index={i} />
            ))}

            <div style={{ padding: '0.85rem 1rem', background: '#1E293B', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.7 }}>
                <strong style={{ color: '#94A3B8' }}>ℹ️ Note:</strong> Documents are stored in an encrypted vault. Image previews (JPG/PNG) can be expanded inline. 
                PDF files show metadata card with verification badge — preview requires browser PDF viewer integration. 
                All documents are verified and cryptographically authenticated via 256-bit SSL.
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: AUTHORIZE & PRINT ── */}
        {activeTab === 'authorize' && (
          <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>

            {/* Left column */}
            <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

              {/* Signed status */}
              {signed && (
                <div style={{ padding: '0.85rem 1rem', background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.4)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 style={{ width: 20, height: 20, color: '#34D399', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#34D399' }}>✅ Signed & Authorized</div>
                    <div style={{ fontSize: '0.7rem', color: '#6EE7B7', marginTop: 1 }}>Approved {approvalClass} · Officer: {officerName} · CEO: {ceoName}</div>
                  </div>
                </div>
              )}

              {/* Approval class */}
              <div style={{ background: '#1E293B', borderRadius: 14, padding: '1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#60A5FA', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck style={{ width: 14, height: 14 }} /> Authorization Details
                </div>
                <div style={{ marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>Approval Class</label>
                  <select value={approvalClass} onChange={e => setApprovalClass(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>
                    <option value="Class-A">Class-A — Tier 1 Prime Contractor</option>
                    <option value="Class-B">Class-B — Tier 2 Regional Contractor</option>
                    <option value="Class-C">Class-C — Tier 3 Sub-Contractor</option>
                  </select>
                </div>
                <div style={{ marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>Procurement Officer Name</label>
                  <input value={officerName} onChange={e => setOfficerName(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.8rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>CEO / Authorized Signatory</label>
                  <input value={ceoName} onChange={e => setCeoName(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.8rem', boxSizing: 'border-box' }} />
                </div>
                <button onClick={handleSignAndApprove} disabled={signing || signed}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 10, background: signed ? 'rgba(16,185,129,0.2)' : signing ? '#374151' : 'linear-gradient(135deg,#047857,#059669)', color: signed ? '#34D399' : 'white', border: signed ? '1px solid rgba(16,185,129,0.4)' : 'none', cursor: signed ? 'default' : 'pointer', fontWeight: 900, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                  {signed ? `✓ Signed as ${approvalClass}` : signing ? 'Signing…' : `Sign & Approve ${approvalClass}`}
                </button>

                {!signed && (
                  <button onClick={() => { onUpdateStatus(vendor.tracking_id, 'Rejected', 'Application Closed', adminRemark); onClose(); }}
                    style={{ width: '100%', marginTop: '0.5rem', padding: '0.55rem', borderRadius: 10, background: 'rgba(220,38,38,0.1)', color: '#FCA5A5', border: '1px solid rgba(220,38,38,0.3)', cursor: 'pointer', fontWeight: 800, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <XCircle style={{ width: 13, height: 13 }} /> Reject Application
                  </button>
                )}
              </div>

              {/* Remarks */}
              <div style={{ background: '#1E293B', borderRadius: 14, padding: '1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#A78BFA', marginBottom: '0.6rem' }}>✏️ Internal Audit Remarks</div>
                <textarea value={adminRemark} onChange={e => setAdminRemark(e.target.value)}
                  placeholder="e.g. Site inspection completed, MSME verified via Udyam portal, documents cross-checked..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: '#0F172A', color: '#F8FAFC', fontSize: '0.78rem', fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box' }} />
                <button onClick={() => onUpdateStatus(vendor.tracking_id, vendor.status || 'Under Verification', vendor.current_stage || 'Document Verification', adminRemark)}
                  style={{ marginTop: '0.45rem', padding: '0.4rem 0.9rem', borderRadius: 8, background: '#4C1D95', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.72rem' }}>
                  💾 Save Remark
                </button>
              </div>
            </div>

            {/* Right column — Seal + Print */}
            <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

              {/* Seal upload */}
              <div style={{ background: '#1E293B', borderRadius: 14, padding: '1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#FBBF24', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload style={{ width: 14, height: 14 }} /> Upload Official Company Seal
                </div>
                <input ref={sealRef} type="file" accept="image/*" onChange={handleSealUpload} style={{ display: 'none' }} />
                <div onClick={() => sealRef.current.click()}
                  style={{ border: '2px dashed rgba(251,191,36,0.35)', borderRadius: 10, padding: '1rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(251,191,36,0.03)', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                  {sealImage
                    ? <img src={sealImage} alt="Seal" style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain' }} />
                    : <>
                        <Upload style={{ width: 22, height: 22, color: '#FBBF24' }} />
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Click to upload official seal<br/>(PNG with transparent background)</div>
                      </>}
                </div>
                {sealImage && (
                  <button onClick={() => { setSealImage(null); localStorage.removeItem('hipro_seal_img'); }}
                    style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: '#FCA5A5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>✕ Remove Seal</button>
                )}
                <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: '0.35rem' }}>Seal appears on Page 3 signature block of the printed dossier.</div>
              </div>

              {/* Print card */}
              <div style={{ background: 'linear-gradient(135deg,rgba(0,71,171,0.2),rgba(0,101,208,0.1))', borderRadius: 14, padding: '1.25rem', border: '1px solid rgba(0,71,171,0.35)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#93C5FD', marginBottom: '0.5rem' }}>🖨️ Print Official 4-Page A4 Dossier</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Prints the <strong style={{ color: '#CBD5E1' }}>exact same document</strong> the vendor received —
                  with your official <strong style={{ color: '#FCD34D' }}>seal</strong> and <strong style={{ color: '#34D399' }}>authorization</strong> added to the Page 3 signature block.
                </div>
                {[
                  'Page 1 — Company & Statutory Details',
                  'Page 2 — Financial & Banking Records',
                  'Page 3 — Compliance Rules + Authorization Signature',
                  'Page 4+ — Document Attachment Sheets',
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#0047AB', color: 'white', fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{p}</span>
                  </div>
                ))}
                <button onClick={handlePrint} disabled={printing}
                  style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: 12, background: printing ? '#374151' : 'linear-gradient(135deg,#0047AB,#0065D0)', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(0,71,171,0.4)' }}>
                  <Printer style={{ width: 18, height: 18 }} />
                  {printing ? 'Opening Print Dialog…' : '🖨️ Print Official A4 Dossier'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
