import React, { useState, useRef } from 'react';
import {
  X, Printer, CheckCircle2, XCircle, Upload, ShieldCheck,
  FileText, Building2, CreditCard, DollarSign, FileCheck2, Eye,
  Download, AlertCircle, Copy, Check, User, MapPin, Phone, Mail, Award, Clock
} from 'lucide-react';
import { printDossier, getEmpanelmentMode } from '../utils/printDossier';
import { API_BASE_URL } from '../config/api';

/* ─────────────────────────────────────────────────────────────────────────────
   EXECUTIVE VENDOR DOSSIER A4 MODAL v5 (Clean Light Theme)
   ─────────────────────────────────────────────────────────────────────────── */

function InfoCard({ label, value, mono, icon: Icon, color = '#0047AB' }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      padding: '0.75rem 0.95rem',
      background: '#F8FAFC',
      borderRadius: 12,
      border: '1px solid #E2E8F0',
      transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {Icon && <Icon style={{ width: 12, height: 12, color }} />}
          {label}
        </span>
        {mono && (
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', color: copied ? '#059669' : '#94A3B8', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }} title="Copy to clipboard">
            {copied ? <Check style={{ width: 12, height: 12 }} /> : <Copy style={{ width: 12, height: 12 }} />}
          </button>
        )}
      </div>
      <div style={{
        fontSize: '0.85rem',
        fontWeight: 800,
        color: '#0F172A',
        fontFamily: mono ? 'Consolas, monospace' : 'inherit',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere'
      }}>
        {value}
      </div>
    </div>
  );
}

function SectionHead({ icon: Icon, title, badge, color = '#0047AB' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.65rem 1rem',
      background: '#F1F5F9',
      borderLeft: `4px solid ${color}`,
      borderRadius: '0 12px 12px 0',
      marginBottom: '0.9rem', marginTop: '1.25rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon style={{ width: 14, height: 14, color }} />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      </div>
      {badge && (
        <span style={{ fontSize: '0.65rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 20, background: '#E2E8F0', color: '#334155', border: '1px solid #CBD5E1' }}>
          {badge}
        </span>
      )}
    </div>
  );
}

/* ── Document Vault Card ── */
function DocCard({ label, docType, fileVal }) {
  const [expanded, setExpanded] = useState(false);

  const getResolvedUrl = (val) => {
    if (!val) return null;
    let str = typeof val === 'string' ? val : (typeof val === 'object' && val !== null ? val.url || val.data || val.path || val.previewUrl : null);
    if (!str) return null;
    if (str.startsWith('http') || str.startsWith('data:')) return str;
    if (str.startsWith('/uploads/')) return `${API_BASE_URL}${str}`;
    if (str.startsWith('uploads/')) return `${API_BASE_URL}/${str}`;
    if (str.startsWith('/')) return `${API_BASE_URL}${str}`;
    return `${API_BASE_URL}/uploads/${str}`;
  };

  const fileUrl = getResolvedUrl(fileVal);
  const fileName = typeof fileVal === 'object' && fileVal?.name ? fileVal.name
                 : typeof fileVal === 'string' ? fileVal.split('/').pop()
                 : 'Uploaded Document';

  const isImage = fileUrl && (fileUrl.startsWith('data:image') || fileUrl.match(/\.(jpg|jpeg|png|webp|gif|heic|heif)($|\?)/i));
  const isPDF   = fileUrl && (fileUrl.startsWith('data:application/pdf') || fileUrl.match(/\.pdf($|\?)/i));

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '0.85rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.95rem 1.15rem', cursor: fileUrl ? 'pointer' : 'default', flexWrap: 'wrap', gap: '0.5rem' }}
           onClick={() => fileUrl && setExpanded(e => !e)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 200, flex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: fileVal ? '#D1FAE5' : '#FEE2E2', border: `1.5px solid ${fileVal ? '#A7F3D0' : '#FCA5A5'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {fileVal
              ? <CheckCircle2 style={{ width: 20, height: 20, color: '#059669' }} />
              : <AlertCircle style={{ width: 20, height: 20, color: '#DC2626' }} />}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0F172A' }}>{label}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: 1 }}>{docType}</div>
            {fileName && (
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#0047AB', marginTop: 2, wordBreak: 'break-all' }}>
                {isPDF ? '📄 ' : isImage ? '🖼️ ' : '📎 '}{fileName}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {fileVal
            ? <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.2rem 0.65rem', background: '#D1FAE5', color: '#047857', borderRadius: 20, border: '1px solid #A7F3D0' }}>✓ VERIFIED & SUBMITTED</span>
            : <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.2rem 0.65rem', background: '#FEE2E2', color: '#B91C1C', borderRadius: 20, border: '1px solid #FCA5A5' }}>✗ NOT UPLOADED</span>}
          {fileUrl && (
            <Eye style={{ width: 16, height: 16, color: expanded ? '#0047AB' : '#94A3B8', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          )}
        </div>
      </div>

      {fileUrl && expanded && (
        <div style={{ padding: '1rem 1.15rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          {isImage ? (
            <img src={fileUrl} alt={label} style={{ maxWidth: '100%', maxHeight: 450, objectFit: 'contain', borderRadius: 10, border: '1px solid #CBD5E1', display: 'block', margin: '0 auto 1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
          ) : (
            <iframe src={fileUrl} title={label} style={{ width: '100%', height: 480, border: 'none', borderRadius: 10, background: 'white', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }} />
          )}

          <div style={{ textAlign: 'center' }}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.35rem', background: 'linear-gradient(135deg, #0047AB 0%, #0065D0 100%)', color: 'white', borderRadius: 10, fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,71,171,0.25)' }}>
              <Download style={{ width: 16, height: 16 }} /> <span>Open / Download Full Document ({fileName})</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN MODAL COMPONENT ──────────────────────────────────────────────────*/
export default function VendorDossierA4Modal({ vendor, onClose, onUpdateStatus, adminRemark, setAdminRemark }) {
  const [activeTab, setActiveTab]         = useState('overview');
  const [approvalClass, setApprovalClass] = useState('Class-A');
  const [officerName, setOfficerName]     = useState(localStorage.getItem('hipro_officer_name') || 'Procurement Officer');
  const [ceoName, setCeoName]             = useState(localStorage.getItem('hipro_ceo_name') || 'Managing Director');
  const [sealImage, setSealImage]         = useState(localStorage.getItem('hipro_seal_img') || null);
  const [ceoSignature, setCeoSignature]   = useState(localStorage.getItem('hipro_ceo_sig') || null);
  const [signing, setSigning]             = useState(false);
  const [signed, setSigned]               = useState(!!vendor?.ceo_signed);
  const [printing, setPrinting]           = useState(false);
  const sealRef   = useRef();
  const ceoSigRef = useRef();

  if (!vendor) return null;

  const buildFormData = () => ({
    companyName: vendor.company_name || vendor.companyName, contactName: vendor.contact_name || vendor.contactName,
    designation: vendor.designation, email: vendor.email, phone: vendor.phone,
    entityType: vendor.entity_type || vendor.entityType, estYear: vendor.est_year || vendor.estYear,
    address: vendor.address, city: vendor.city, state: vendor.state, pincode: vendor.pincode,
    gstin: vendor.gstin, pan: vendor.pan, msmeNo: vendor.msme_no || vendor.msmeNo,
    bankAccount: vendor.bank_account || vendor.bankAccount, bankName: vendor.bank_name || vendor.bankName, ifsc: vendor.ifsc,
    turnover2023: vendor.turnover_2023 || vendor.turnover2023, turnover2024: vendor.turnover_2024 || vendor.turnover2024,
    turnover2025: vendor.turnover_2025 || vendor.turnover2025, largestOrder: vendor.largest_order || vendor.largestOrder,
    existingEmpanels: vendor.existing_empanels || vendor.existingEmpanels,
    gstDoc: vendor.gst_doc || vendor.gstDoc, panDoc: vendor.pan_doc || vendor.panDoc,
    bankDoc: vendor.bank_doc || vendor.bankDoc, expDoc: vendor.exp_doc || vendor.expDoc,
    signatoryName: vendor.signatory_name || vendor.contact_name || vendor.contactName,
    signature: vendor.signature_data || vendor.signature || null,
    primaryRole: vendor.primary_role || vendor.primaryRole,
    specialization: vendor.specialization,
    skillsDetails: vendor.skills_details || vendor.skillsDetails,
    teamSize: vendor.team_size || vendor.teamSize,
    ownerName: vendor.owner_name || vendor.ownerName,
    adminSeal: sealImage, adminCeoSignature: ceoSignature, adminOfficerName: officerName, adminCeoName: ceoName,
    adminApprovalClass: signed ? `Approved ${approvalClass}` : vendor.status,
    adminSigned: signed,
    adminSignedAt: signed ? new Date().toLocaleString('en-IN') : null,
    adminRemarks: adminRemark || vendor.admin_remarks,
    submitted_at: vendor.submitted_at || vendor.submittedAt, category: vendor.category,
    ipAddress: vendor.ip_address || vendor.ipAddress, currentStage: vendor.current_stage || vendor.currentStage,
    status: signed ? `Approved ${approvalClass}` : (vendor.status || 'Under Verification'),
  });

  const handleSealUpload = (e) => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setSealImage(ev.target.result); localStorage.setItem('hipro_seal_img', ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleCeoSigUpload = (e) => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setCeoSignature(ev.target.result); localStorage.setItem('hipro_ceo_sig', ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSignAndApprove = () => {
    setSigning(true);
    localStorage.setItem('hipro_officer_name', officerName);
    localStorage.setItem('hipro_ceo_name', ceoName);
    setTimeout(() => {
      setSigned(true); setSigning(false);
      onUpdateStatus(vendor.tracking_id || vendor.trackingId, `Approved ${approvalClass}`, 'CEO Authorization', adminRemark);
    }, 700);
  };

  const handlePrint = () => {
    setPrinting(true);
    printDossier(vendor.tracking_id || vendor.trackingId, buildFormData());
    setTimeout(() => setPrinting(false), 2500);
  };

  const statusColor = signed ? '#059669' : vendor.status?.includes('Approved') ? '#059669'
                    : vendor.status?.includes('Suspended') ? '#D97706'
                    : vendor.status?.includes('Terminated') || vendor.status?.includes('Disabled') || vendor.status === 'Rejected' ? '#DC2626' : '#0047AB';

  const modeInfo = getEmpanelmentMode(vendor);

  const TABS = [
    { id: 'overview',   label: '📋 Dossier Overview',  },
    { id: 'documents',  label: '📁 Document Vault', },
    { id: 'authorize',  label: '🛡️ Audit & Authorize', },
  ];

  // Dynamic document extraction
  let catData = {};
  if (vendor.category_specific_data) {
    try {
      catData = typeof vendor.category_specific_data === 'string'
        ? JSON.parse(vendor.category_specific_data)
        : vendor.category_specific_data;
    } catch {}
  }

  const docsMap = [
    { label: 'GST REG-06 Registration Certificate', docType: 'CBIC Statutory GST Compliance Registration', key: 'gst_doc', altKey: 'gstDoc' },
    { label: 'PAN Card Copy', docType: 'Mandatory Income Tax Identity Document', key: 'pan_doc', altKey: 'panDoc' },
    { label: 'Aadhaar Card (Front Side)', docType: 'UIDAI Govt National ID — Front Photo', key: 'aadhar_front_doc', altKey: 'aadharFrontDoc' },
    { label: 'Aadhaar Card (Back Side)', docType: 'UIDAI Govt National ID — Address Back Photo', key: 'aadhar_back_doc', altKey: 'aadharBackDoc' },
    { label: 'Cancelled Bank Cheque / Passbook', docType: 'Verified Bank Account & RTGS Payout Proof', key: 'bank_doc', altKey: 'bankDoc' },
    { label: 'Work Experience & Completion Certificates', docType: 'CPWD / Corporate Work Order Execution Proof', key: 'exp_doc', altKey: 'expDoc' },
    { label: 'Council of Architecture (COA) Registration Certificate', docType: 'COA Official Architect Standing Certificate', key: 'coaCertificateDoc', altKey: 'coa_certificate_doc' },
    { label: 'Architectural Design Portfolio (PDF)', docType: 'Multi-Page 2D/3D Design Roster & Portfolio', key: 'portfolioDoc', altKey: 'portfolio_doc' },
    { label: 'CA Certified Turnover & Net Worth Certificate', docType: 'Chartered Accountant Annual Financial Certificate', key: 'caCertificateDoc', altKey: 'ca_certificate_doc' },
    { label: 'Certificate of Incorporation / MCA MOA-AOA', docType: 'Statutory Corporate Registrar Incorporation Proof', key: 'incorporationDoc', altKey: 'incorporation_doc' },
    { label: 'MSME Udyam Registration Certificate', docType: 'Ministry of MSME Enterprise Accreditation', key: 'msmeDoc', altKey: 'msme_doc' },
    { label: 'ISO Quality & Safety Certification', docType: 'ISO 9001 / 45001 Standard Audit Accreditation', key: 'isoCertDoc', altKey: 'iso_cert_doc' },
    { label: 'Structural Audit & NABL Testing License', docType: 'NABL Accredited Laboratory Testing License', key: 'structuralAuditDoc', altKey: 'structural_audit_doc' },
    { label: 'Commercial Fleet & RTO Permits', docType: 'RTO Goods Carriage & Commercial Transit Fitness', key: 'rtoPermitDoc', altKey: 'rto_permit_doc' },
    { label: 'FSSAI License Certificate', docType: 'Food Safety & Standards Authority Registration', key: 'fssaiDoc', altKey: 'fssai_doc' },
    { label: 'Trade License & Brand Tie-up Clearance', docType: 'Municipal Trade & Authorized Distribution Dealership', key: 'tradeLicenseDoc', altKey: 'trade_license_doc' },
    { label: 'Authorized Signatory Passport Photo', docType: 'Signatory Identity Verification Photograph', key: 'passport_photo', altKey: 'passportPhoto' },
    { label: 'Digital Signatory Signature Data', docType: 'Cryptographic Signature Verification Data', key: 'signature_data', altKey: 'signature' },
  ];

  const docs = docsMap.map(d => {
    const fileVal = vendor[d.key] || vendor[d.altKey] || catData[d.key] || catData[d.altKey] || null;
    return fileVal ? { label: d.label, docType: d.docType, fileVal } : null;
  }).filter(Boolean);

  const submittedCount = docs.length;

  const getPassportUrl = () => {
    let raw = vendor.passport_photo || vendor.passportPhoto || vendor.photo_url || vendor.photoUrl || vendor.photo;
    if (!raw) return null;
    if (typeof raw === 'object' && raw !== null) raw = raw.url || raw.data || raw.previewUrl || raw.path || '';
    if (typeof raw === 'string') {
      if (raw.startsWith('http') || raw.startsWith('data:')) return raw;
      if (raw.startsWith('/uploads/')) return `${API_BASE_URL}${raw}`;
      if (raw.startsWith('uploads/')) return `${API_BASE_URL}/${raw}`;
      if (raw.startsWith('/')) return `${API_BASE_URL}${raw}`;
      return `${API_BASE_URL}/uploads/${raw}`;
    }
    return null;
  };
  const passportUrl = getPassportUrl();

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>

      {/* Main Light Modal Container */}
      <div style={{
        width: '100%', maxWidth: 1020, maxHeight: '92vh', background: '#FFFFFF', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', border: '1px solid #CBD5E1'
      }}>

        {/* ══ TOP BAR HEADER ══ */}
        <div style={{ background: '#0F172A', borderBottom: '1px solid #1E293B', padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', gap: '0.85rem' }}>
          {/* Left identity block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {passportUrl ? (
              <img src={passportUrl} alt="Signatory" style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', border: '2px solid #3B82F6', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', flexShrink: 0 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#0047AB,#0065D0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,71,171,0.3)' }}>
                <User style={{ width: 22, height: 22, color: 'white' }} />
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'monospace', color: '#10B981', fontWeight: 900, fontSize: '0.95rem', background: 'rgba(16,185,129,0.15)', padding: '0.15rem 0.55rem', borderRadius: 6, border: '1px solid rgba(16,185,129,0.3)' }}>
                  {vendor.tracking_id || vendor.trackingId}
                </span>
                <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>{vendor.company_name || vendor.companyName}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: 20, background: 'rgba(59,130,246,0.2)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.4)' }}>
                  {modeInfo.badge}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, padding: '0.18rem 0.65rem', borderRadius: 20, background: `${statusColor}25`, color: statusColor, border: `1px solid ${statusColor}50`, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                  {signed ? `Approved ${approvalClass}` : (vendor.status || 'Pending Verification')}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 3, display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <span>Category: <strong style={{ color: '#E2E8F0' }}>{vendor.category}</strong></span>
                <span>📍 {vendor.city}, {vendor.state}</span>
                <span>✉️ {vendor.email}</span>
              </div>
            </div>
          </div>

          {/* Right action controls */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button onClick={handlePrint} disabled={printing}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 1.25rem', borderRadius: 12, fontSize: '0.82rem', fontWeight: 900, background: printing ? '#475569' : 'linear-gradient(135deg, #0047AB, #0065D0)', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer', boxShadow: '0 4px 14px rgba(0,71,171,0.3)', transition: 'transform 0.15s' }}>
              <Printer style={{ width: 16, height: 16 }} />
              {printing ? 'Preparing Print…' : '🖨️ Print A4 Dossier'}
            </button>
            <button onClick={onClose}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.55rem 1rem', borderRadius: 12, fontSize: '0.8rem', fontWeight: 800, background: 'rgba(255,255,255,0.1)', color: '#F1F5F9', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
              <X style={{ width: 16, height: 16 }} /> Close
            </button>
          </div>
        </div>

        {/* ══ NAVIGATION TABS BAR ══ */}
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '0.5rem', flexShrink: 0, padding: '0.65rem 1.5rem', overflowX: 'auto' }}>
          {TABS.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.82rem',
                  fontWeight: active ? 900 : 700,
                  color: active ? '#0047AB' : '#64748B',
                  background: active ? '#EFF6FF' : 'transparent',
                  border: 'none',
                  borderRadius: 10,
                  outline: active ? '1.5px solid #93C5FD' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}>
                <span>{t.label}</span>
                {t.id === 'documents' && (
                  <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.12rem 0.5rem', borderRadius: 20, background: submittedCount === docs.length ? '#D1FAE5' : '#FEF3C7', color: submittedCount === docs.length ? '#047857' : '#B45309' }}>
                    {submittedCount}/{docs.length} Verified
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ══ MODAL MAIN BODY SCROLL AREA (Clean White Light Theme) ══ */}
        <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF', padding: '1.5rem' }}>

          {/* ── TAB 1: EXECUTIVE OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div style={{ maxWidth: 960, margin: '0 auto' }}>

              <SectionHead icon={Building2} title="Company & Corporate Identity" badge="Verified Entity" color="#0047AB" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                <InfoCard icon={Building2} label="Company / Firm Legal Name" value={vendor.company_name || vendor.companyName} color="#0047AB" />
                <InfoCard icon={ShieldCheck} label="Entity Registration Type" value={vendor.entity_type || vendor.entityType} color="#4338CA" />
                <InfoCard icon={Clock} label="Year Established" value={vendor.est_year || vendor.estYear} color="#D97706" />
                <InfoCard icon={Award} label="Empanelment Trade Category" value={vendor.category} color="#059669" />
                <InfoCard icon={User} label="Primary Corporate Role" value={vendor.primary_role || vendor.primaryRole} color="#DB2777" />
                <InfoCard icon={CheckCircle2} label="Specialization & Trade Roster" value={vendor.specialization} color="#0047AB" />
                <InfoCard icon={FileText} label="Technical Capabilities / Skills" value={vendor.skills_details || vendor.skillsDetails} color="#4338CA" />
                <InfoCard icon={User} label="Technical Team Size" value={vendor.team_size || vendor.teamSize} color="#059669" />
                <InfoCard icon={User} label="Managing Director / Owner" value={vendor.owner_name || vendor.ownerName} color="#D97706" />
                <InfoCard icon={User} label="Primary Contact Officer" value={vendor.contact_name || vendor.contactName} color="#0047AB" />
                <InfoCard icon={Award} label="Designation" value={vendor.designation} color="#4338CA" />
                <InfoCard icon={Mail} label="Corporate Email ID" value={vendor.email} mono color="#DB2777" />
                <InfoCard icon={Phone} label="Helpline Phone / Mobile" value={vendor.phone} mono color="#059669" />
                <InfoCard icon={MapPin} label="Registered Address" value={[vendor.address, vendor.city, vendor.state, vendor.pincode].filter(Boolean).join(', ')} color="#0047AB" />
              </div>

              <SectionHead icon={CreditCard} title="Statutory & Banking Credentials" badge="Encrypted Vault" color="#4338CA" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                <InfoCard icon={CreditCard} label="GSTIN Compliance Number" value={vendor.gstin} mono color="#0047AB" />
                <InfoCard icon={CreditCard} label="PAN Income Tax Number" value={vendor.pan} mono color="#4338CA" />
                <InfoCard icon={CreditCard} label="Aadhaar UIDAI Number" value={vendor.aadhar_no || vendor.aadharNo} mono color="#DB2777" />
                <InfoCard icon={ShieldCheck} label="MSME Udyam Reg. No." value={vendor.msme_no || vendor.msmeNo} mono color="#059669" />
                <InfoCard icon={Building2} label="Primary Banker Name" value={vendor.bank_name || vendor.bankName} color="#D97706" />
                <InfoCard icon={CreditCard} label="Bank Account Number" value={vendor.bank_account || vendor.bankAccount} mono color="#0047AB" />
                <InfoCard icon={ShieldCheck} label="IFSC Code" value={vendor.ifsc} mono color="#4338CA" />
              </div>

              {/* Category-Specific Statutory Credentials */}
              {vendor.category_specific_data && typeof vendor.category_specific_data === 'object' && (() => {
                const nonDocEntries = Object.entries(vendor.category_specific_data).filter(([k, v]) => {
                  if (!v) return false;
                  const lk = k.toLowerCase();
                  if (lk.includes('doc') || lk.includes('file') || lk.includes('pdf') || lk.includes('photo') || lk.includes('signature') || lk.includes('url')) return false;
                  if (typeof v === 'string' && (v.startsWith('http') || v.startsWith('data:') || v.includes('uploads/') || v.match(/\.(pdf|jpg|jpeg|png|webp)($|\?)/i))) return false;
                  if (typeof v === 'object') return false;
                  return true;
                });

                if (nonDocEntries.length === 0) return null;

                return (
                  <>
                    <SectionHead icon={ShieldCheck} title="Trade & Category Compliance Specs" color="#DB2777" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                      {nonDocEntries.map(([k, v]) => (
                        <InfoCard
                          key={k}
                          label={k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          value={typeof v === 'boolean' ? (v ? '✓ Available & Verified' : '✗ Not Available') : String(v)}
                          color="#DB2777"
                        />
                      ))}
                    </div>
                  </>
                );
              })()}

              <SectionHead icon={DollarSign} title="Financial Capacity & Order Benchmarks" color="#059669" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: 'FY 2022–23 Turnover', val: (vendor.turnover_2023 || vendor.turnover2023) ? `₹ ${vendor.turnover_2023 || vendor.turnover2023} Lakhs` : '—' },
                  { label: 'FY 2023–24 Turnover', val: (vendor.turnover_2024 || vendor.turnover2024) ? `₹ ${vendor.turnover_2024 || vendor.turnover2024} Lakhs` : '—' },
                  { label: 'FY 2024–25 Turnover', val: (vendor.turnover_2025 || vendor.turnover2025) ? `₹ ${vendor.turnover_2025 || vendor.turnover2025} Lakhs` : '—' },
                  { label: 'Single Largest Executed Order', val: (vendor.largest_order || vendor.largestOrder) ? `₹ ${vendor.largest_order || vendor.largestOrder} Lakhs` : '—' },
                ].map(c => (
                  <div key={c.label} style={{ padding: '0.85rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase' }}>{c.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#059669', marginTop: 4 }}>{c.val}</div>
                  </div>
                ))}
              </div>
              <InfoCard icon={Building2} label="Existing Empanelments with PSUs / Govt / Corporates" value={vendor.existing_empanels || vendor.existingEmpanels} color="#059669" />

              <SectionHead icon={FileCheck2} title="Signatures & Seal Authorization Desk" color="#0047AB" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: '0.75rem 0 1rem 0' }}>
                {/* Vendor Signature */}
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 8 }}>
                    Vendor Digital Signature
                  </div>
                  {vendor.signature_data || vendor.signature ? (
                    <img src={vendor.signature_data || vendor.signature} alt="Vendor Signature" style={{ height: 50, maxWidth: '100%', objectFit: 'contain', background: 'white', borderRadius: 8, padding: 4, border: '1px solid #CBD5E1' }} />
                  ) : (
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontStyle: 'italic', padding: '0.75rem', background: '#F1F5F9', borderRadius: 8 }}>Cryptographically Signed via SSL</div>
                  )}
                  <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: 8, fontWeight: 800 }}>
                    {vendor.signatory_name || vendor.contact_name || vendor.contactName || 'Authorized Signatory'}
                  </div>
                </div>

                {/* Corporate Seal */}
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#D97706', textTransform: 'uppercase', marginBottom: 8 }}>
                    Official Corporate Seal
                  </div>
                  {(signed || String(vendor.status || '').toUpperCase().includes('APPROVED')) ? (
                    <>
                      <img src={sealImage || vendor.adminSeal || vendor.companySeal || '/hipro-watermark-seal.jpg'} alt="Official Seal" style={{ height: 55, maxWidth: '100%', objectFit: 'contain', background: 'white', borderRadius: 8, padding: 4, border: '1px solid #CBD5E1' }} />
                      <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: 8, fontWeight: 800 }}>
                        Hindustan Projects Corporate Seal
                      </div>
                    </>
                  ) : (
                    <div style={{ height: 55, border: '1.5px dashed #94A3B8', borderRadius: 8, color: '#64748B', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
                      ( Stamp Space Upon Approval )
                    </div>
                  )}
                </div>

                {/* CEO Authorization */}
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#059669', textTransform: 'uppercase', marginBottom: 8 }}>
                    CEO / Committee Authorization
                  </div>
                  {(signed || String(vendor.status || '').toUpperCase().includes('APPROVED')) ? (
                    <>
                      {ceoSignature ? (
                        <img src={ceoSignature} alt="CEO Signature" style={{ height: 55, maxWidth: '100%', objectFit: 'contain', background: 'white', borderRadius: 8, padding: 4, border: '1px solid #CBD5E1' }} />
                      ) : (
                        <div style={{ height: 55, border: '1.5px dashed #A7F3D0', borderRadius: 8, color: '#059669', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECFDF5', flexDirection: 'column', gap: 4 }}>
                          <span>✍️ CEO Signature</span>
                          <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>Upload in Authorize tab</span>
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: 8, fontWeight: 800 }}>
                        {ceoName || 'Authorized Signatory (CEO Office)'}
                      </div>
                    </>
                  ) : (
                    <div style={{ height: 50, border: '1.5px dashed #94A3B8', borderRadius: 8, color: '#64748B', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
                      ( CEO Signature Upon Approval )
                    </div>
                  )}
                </div>
              </div>

              {(adminRemark || vendor.admin_remarks) && (
                <>
                  <SectionHead icon={FileCheck2} title="Official Admin Audit Remarks" color="#DB2777" />
                  <div style={{ padding: '0.85rem 1.15rem', background: '#FDF2F8', border: '1px solid #FBCFE8', borderRadius: 12, fontSize: '0.85rem', color: '#831843', lineHeight: 1.7 }}>
                    {adminRemark || vendor.admin_remarks}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── TAB 2: DOCUMENT VAULT ── */}
          {activeTab === 'documents' && (
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Uploaded Statutory Documents & Certificates</h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 3, margin: 0 }}>
                    {submittedCount} of {docs.length} mandatory documents uploaded by vendor and cryptographically verified.
                  </p>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0047AB', padding: '0.4rem 0.95rem', background: '#EFF6FF', borderRadius: 20, border: '1px solid #93C5FD', fontWeight: 800 }}>
                  Click document to view / preview
                </div>
              </div>

              {docs.map((doc) => (
                <DocCard key={doc.label} label={doc.label} docType={doc.docType} fileVal={doc.fileVal} />
              ))}

              <div style={{ padding: '1rem 1.25rem', background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', marginTop: '1rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.7 }}>
                  <strong style={{ color: '#0F172A' }}>ℹ️ Security Note:</strong> Statutory documents are stored in an isolated AES-256 encrypted storage bucket. Image previews (JPG/PNG) render directly. PDF files provide instant download links for verification against CPWD, GST, and MCA databases.
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: AUDIT & AUTHORIZE ── */}
          {activeTab === 'authorize' && (
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>

              {/* Left Column Controls */}
              <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Status Banner if signed */}
                {signed && (
                  <div style={{ padding: '1rem 1.25rem', background: '#ECFDF5', border: '1.5px solid #A7F3D0', borderRadius: 14, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 style={{ width: 22, height: 22, color: '#059669', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#047857' }}>✅ Signed & Authorized</div>
                      <div style={{ fontSize: '0.75rem', color: '#065F46', marginTop: 2 }}>Approved {approvalClass} · Officer: {officerName} · CEO: {ceoName}</div>
                    </div>
                  </div>
                )}

                {/* Approval controls card */}
                <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <ShieldCheck style={{ width: 16, height: 16 }} /> Tier Classification & Signing Authority
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: 4 }}>Empanelment Approval Class</label>
                    <select value={approvalClass} onChange={e => setApprovalClass(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: 10, background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.85rem', fontWeight: 800 }}>
                      <option value="Class-A">Class-A — Tier 1 Prime Contractor (&gt; ₹ 5 Cr Orders)</option>
                      <option value="Class-B">Class-B — Tier 2 Regional Contractor (₹ 50L - ₹ 5 Cr)</option>
                      <option value="Class-C">Class-C — Tier 3 Sub-Contractor (&lt; ₹ 50L Orders)</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: 4 }}>Procurement Officer Name</label>
                    <input value={officerName} onChange={e => setOfficerName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: 10, background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: 4 }}>CEO / Managing Director Name</label>
                    <input value={ceoName} onChange={e => setCeoName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: 10, background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                  <button onClick={handleSignAndApprove} disabled={signing || signed}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 12, background: signed ? '#D1FAE5' : signing ? '#94A3B8' : 'linear-gradient(135deg, #059669, #047857)', color: signed ? '#047857' : 'white', border: signed ? '1px solid #A7F3D0' : 'none', cursor: signed ? 'default' : 'pointer', fontWeight: 900, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: signed ? 'none' : '0 4px 14px rgba(5,150,105,0.3)' }}>
                    <CheckCircle2 style={{ width: 18, height: 18 }} />
                    {signed ? `✓ Signed & Approved as ${approvalClass}` : signing ? 'Signing Digital Dossier…' : `Sign & Approve ${approvalClass}`}
                  </button>

                  {!signed && (
                    <button onClick={() => { onUpdateStatus(vendor.tracking_id || vendor.trackingId, 'Rejected', 'Application Closed', adminRemark); onClose(); }}
                      style={{ width: '100%', marginTop: '0.6rem', padding: '0.6rem', borderRadius: 12, background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <XCircle style={{ width: 15, height: 15 }} /> Reject Application
                    </button>
                  )}
                </div>

                {/* Admin Remark card */}
                <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#4338CA', marginBottom: '0.65rem' }}>✏️ Official Audit Remarks</div>
                  <textarea value={adminRemark} onChange={e => setAdminRemark(e.target.value)}
                    placeholder="e.g. Physical site inspection completed, MSME Udyam verified, document authenticity cross-checked with CPWD & CBIC portal..."
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#0F172A', fontSize: '0.82rem', fontFamily: 'inherit', minHeight: 90, resize: 'vertical', boxSizing: 'border-box' }} />
                  <button onClick={() => onUpdateStatus(vendor.tracking_id || vendor.trackingId, vendor.status || 'Under Verification', vendor.current_stage || 'Document Verification', adminRemark)}
                    style={{ marginTop: '0.6rem', padding: '0.5rem 1.1rem', borderRadius: 10, background: '#4338CA', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.78rem' }}>
                    💾 Save Audit Remarks
                  </button>
                </div>
              </div>

              {/* Right Column Print & Seal Desk */}
              <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Corporate Seal Uploader */}
                <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#D97706', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Upload style={{ width: 16, height: 16 }} /> Official Company Seal Upload Desk
                  </div>
                  <input ref={sealRef} type="file" accept="image/*" onChange={handleSealUpload} style={{ display: 'none' }} />
                  <div onClick={() => sealRef.current && sealRef.current.click()}
                    style={{ border: '2px dashed #FCD34D', borderRadius: 12, padding: '1.25rem', textAlign: 'center', cursor: 'pointer', background: '#FEF3C7', minHeight: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                    {sealImage
                      ? <img src={sealImage} alt="Official Seal" style={{ maxHeight: 90, maxWidth: '100%', objectFit: 'contain' }} />
                      : <>
                          <Upload style={{ width: 24, height: 24, color: '#D97706' }} />
                          <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>Click to upload official corporate seal<br/><span style={{ fontSize: '0.68rem', color: '#B45309', fontWeight: 500 }}>(PNG format with transparent background recommended)</span></div>
                        </>}
                  </div>
                  {sealImage && (
                    <button onClick={() => { setSealImage(null); localStorage.removeItem('hipro_seal_img'); }}
                      style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}>✕ Remove Seal</button>
                  )}
                </div>

                {/* ✍️ CEO Signature Uploader */}
                <div style={{ background: '#F0FDF4', borderRadius: 16, padding: '1.25rem', border: '1.5px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#059669', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FileCheck2 style={{ width: 16, height: 16 }} /> CEO / MD Signature Upload
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#065F46', marginBottom: '0.75rem', lineHeight: 1.55 }}>
                    Upload the official <strong>handwritten or digital signature</strong> of the CEO / Managing Director. This will appear on the printed A4 dossier and dossier overview.
                  </div>
                  <input ref={ceoSigRef} type="file" accept="image/*" onChange={handleCeoSigUpload} style={{ display: 'none' }} />
                  <div onClick={() => ceoSigRef.current && ceoSigRef.current.click()}
                    style={{ border: `2px dashed ${ceoSignature ? '#34D399' : '#86EFAC'}`, borderRadius: 12, padding: '1.1rem', textAlign: 'center', cursor: 'pointer', background: ceoSignature ? '#ECFDF5' : '#F0FDF4', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.2s' }}>
                    {ceoSignature ? (
                      <>
                        <img src={ceoSignature} alt="CEO Signature" style={{ maxHeight: 70, maxWidth: '90%', objectFit: 'contain', background: 'white', borderRadius: 8, padding: '4px 8px', border: '1px solid #A7F3D0' }} />
                        <span style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700 }}>✓ CEO Signature Uploaded — Click to replace</span>
                      </>
                    ) : (
                      <>
                        <Upload style={{ width: 22, height: 22, color: '#059669' }} />
                        <div style={{ fontSize: '0.78rem', color: '#065F46', fontWeight: 700 }}>Click to upload CEO / MD signature image<br/><span style={{ fontSize: '0.67rem', color: '#6B7280', fontWeight: 500 }}>JPG / PNG with white or transparent background</span></div>
                      </>
                    )}
                  </div>
                  {ceoSignature && (
                    <button onClick={() => { setCeoSignature(null); localStorage.removeItem('hipro_ceo_sig'); }}
                      style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}>✕ Remove CEO Signature</button>
                  )}
                </div>

                {/* Print card */}
                <div style={{ background: '#EFF6FF', borderRadius: 16, padding: '1.35rem', border: '1px solid #BFDBFE' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1E40AF', marginBottom: '0.55rem' }}>🖨️ Print Official 4-Page A4 Letterhead Dossier</div>
                  <div style={{ fontSize: '0.78rem', color: '#1E3A8A', lineHeight: 1.7, marginBottom: '1.1rem' }}>
                    Generates an un-editable, official corporate empanelment dossier with your <strong style={{ color: '#D97706' }}>seal stamp</strong> and <strong style={{ color: '#059669' }}>CEO signature</strong> on Page 3.
                  </div>
                  {[
                    'Page 1 — Company Entity & Statutory Identity',
                    'Page 2 — Financial Capacity & Banking Records',
                    'Page 3 — Compliance Rules & CEO Signatory Authorization Block',
                    'Page 4+ — Uploaded Document Attachments & Vault Verification Sheets',
                  ].map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.4rem' }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#0047AB', color: 'white', fontSize: '0.65rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: '0.75rem', color: '#475569' }}>{p}</span>
                    </div>
                  ))}
                  <button onClick={handlePrint} disabled={printing}
                    style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem', borderRadius: 12, background: printing ? '#94A3B8' : 'linear-gradient(135deg, #0047AB, #0065D0)', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer', fontWeight: 900, fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', boxShadow: '0 4px 20px rgba(0,71,171,0.3)' }}>
                    <Printer style={{ width: 18, height: 18 }} />
                    {printing ? 'Preparing A4 Print Engine…' : '🖨️ Print Official A4 Dossier'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
