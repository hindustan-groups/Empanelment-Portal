import React, { useState, useRef } from 'react';
import {
  X, Printer, CheckCircle2, XCircle, Upload, ShieldCheck,
  Eye, FileText, AlertTriangle
} from 'lucide-react';
import { printDossier } from '../utils/printDossier';

/* ─────────────────────────────────────────────────────────────────────
   VendorDossierA4Modal
   ─ Shows the SAME original vendor dossier that vendor sees/prints
   ─ Admin can upload official seal + choose approval class + sign
   ─ Clicking "Print" fires the exact same printDossier() used by vendor
   ───────────────────────────────────────────────────────────────────── */
export default function VendorDossierA4Modal({ vendor, onClose, onUpdateStatus, adminRemark, setAdminRemark }) {
  const [approvalClass, setApprovalClass]   = useState('Class-A');
  const [officerName, setOfficerName]       = useState(localStorage.getItem('hipro_officer_name') || 'Procurement Officer');
  const [ceoName, setCeoName]               = useState(localStorage.getItem('hipro_ceo_name') || 'Managing Director');
  const [sealImage, setSealImage]           = useState(localStorage.getItem('hipro_seal_img') || null);
  const [signing, setSigning]               = useState(false);
  const [signed, setSigned]                 = useState(!!vendor?.ceo_signed);
  const [printing, setPrinting]             = useState(false);
  const sealRef = useRef();

  if (!vendor) return null;

  /* ── Build formData exactly like vendor side does ── */
  const buildFormData = () => ({
    companyName:        vendor.company_name,
    contactName:        vendor.contact_name,
    designation:        vendor.designation,
    email:              vendor.email,
    phone:              vendor.phone,
    entityType:         vendor.entity_type,
    estYear:            vendor.est_year,
    address:            vendor.address,
    city:               vendor.city,
    state:              vendor.state,
    pincode:            vendor.pincode,
    gstin:              vendor.gstin,
    pan:                vendor.pan,
    msmeNo:             vendor.msme_no,
    bankAccount:        vendor.bank_account,
    bankName:           vendor.bank_name,
    ifsc:               vendor.ifsc,
    turnover2023:       vendor.turnover_2023,
    turnover2024:       vendor.turnover_2024,
    turnover2025:       vendor.turnover_2025,
    largestOrder:       vendor.largest_order,
    buaArea:            vendor.bua_area,
    cpaArea:            vendor.cpa_area,
    existingEmpanels:   vendor.existing_empanels,
    gstDoc:             vendor.gst_doc,
    panDoc:             vendor.pan_doc,
    bankDoc:            vendor.bank_doc,
    expDoc:             vendor.exp_doc,
    signatoryName:      vendor.signatory_name || vendor.contact_name,
    signature:          vendor.signature_data || null,
    primaryRole:        vendor.primary_role || vendor.primaryRole,
    specialization:     vendor.specialization,
    skillsDetails:      vendor.skills_details || vendor.skillsDetails,
    teamSize:           vendor.team_size || vendor.teamSize,
    ownerName:          vendor.owner_name || vendor.ownerName,
    ownerContact:       vendor.owner_contact || vendor.ownerContact,
    // Admin additions — append seal & approval info on print
    adminSeal:          sealImage,
    adminOfficerName:   officerName,
    adminCeoName:       ceoName,
    adminApprovalClass: signed ? `Approved ${approvalClass}` : vendor.status,
    adminSigned:        signed,
    adminSignedAt:      signed ? new Date().toLocaleString('en-IN') : null,
    adminRemarks:       adminRemark || vendor.admin_remarks,
    submitted_at:       vendor.submitted_at,
    category:           vendor.category,
    ipAddress:          vendor.ip_address,
    currentStage:       vendor.current_stage,
    status:             signed ? `Approved ${approvalClass}` : (vendor.status || 'Under Verification'),
  });

  /* ── Handle Seal Upload ── */
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

  /* ── Sign & Approve ── */
  const handleSignAndApprove = () => {
    setSigning(true);
    localStorage.setItem('hipro_officer_name', officerName);
    localStorage.setItem('hipro_ceo_name', ceoName);
    setTimeout(() => {
      setSigned(true);
      setSigning(false);
      onUpdateStatus(vendor.tracking_id, `Approved ${approvalClass}`, 'CEO Authorization', adminRemark);
    }, 700);
  };

  /* ── Print — fires exact same printDossier used by vendor ── */
  const handlePrint = () => {
    setPrinting(true);
    const fd = buildFormData();
    printDossier(vendor.tracking_id, fd);
    setTimeout(() => setPrinting(false), 2500);
  };

  const statusColor = vendor.status?.includes('Approved') ? '#047857' :
                      vendor.status === 'Rejected'        ? '#DC2626' : '#D97706';

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(8px)',
      zIndex: 999999, display: 'flex', flexDirection: 'column',
    }}>

      {/* ══ STICKY TOPBAR ══ */}
      <div style={{
        background: 'linear-gradient(135deg, #060D1F, #0A1535)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0.7rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <FileText style={{ width: 18, height: 18, color: '#60A5FA' }} />
          <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 700 }}>VENDOR DOSSIER</span>
          <span style={{ fontFamily: 'monospace', color: '#34D399', fontWeight: 900, fontSize: '0.88rem' }}>{vendor.tracking_id}</span>
          <span style={{ color: '#E2E8F0', fontWeight: 800, fontSize: '0.9rem' }}>{vendor.company_name}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 900, padding: '0.18rem 0.6rem', borderRadius: 20, background: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}40` }}>
            {signed ? `Approved ${approvalClass}` : (vendor.status || 'Under Verification')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={handlePrint} disabled={printing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 900, background: printing ? '#374151' : '#0047AB', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer' }}>
            <Printer style={{ width: 15, height: 15 }} />
            {printing ? 'Preparing…' : '🖨️ Print Official A4 Dossier'}
          </button>
          <button onClick={onClose}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.9rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, background: 'rgba(255,255,255,0.08)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
            <X style={{ width: 14, height: 14 }} /> Close
          </button>
        </div>
      </div>

      {/* ══ MAIN BODY ══ */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', gap: 0 }}>

        {/* LEFT: Admin Action Panel */}
        <div style={{
          width: 300, flexShrink: 0, background: '#0F172A',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          overflowY: 'auto', padding: '1.25rem 1rem',
          display: 'flex', flexDirection: 'column', gap: '1rem'
        }}>

          {/* ── Status indicator ── */}
          <div style={{ padding: '0.6rem 0.8rem', borderRadius: 10, background: signed ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${signed ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: signed ? '#34D399' : '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {signed ? '✅ Signed & Authorized' : '⏳ Pending Admin Action'}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: 2 }}>
              {signed ? `Approved ${approvalClass} by ${officerName}` : 'Review dossier below, then sign & approve'}
            </div>
          </div>

          {/* ── Step 1: Approve ── */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck style={{ width: 13, height: 13 }} /> Step 1 — Review & Authorize
            </div>

            <div style={{ marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>Approval Class</label>
              <select value={approvalClass} onChange={e => setApprovalClass(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 8, background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.78rem', fontWeight: 700 }}>
                <option value="Class-A">Class-A — Tier 1 Prime Contractor</option>
                <option value="Class-B">Class-B — Tier 2 Regional Contractor</option>
                <option value="Class-C">Class-C — Tier 3 Sub-Contractor</option>
              </select>
            </div>

            <div style={{ marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>Procurement Officer Name</label>
              <input value={officerName} onChange={e => setOfficerName(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 8, background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.78rem', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 3 }}>CEO / Authorized Signatory</label>
              <input value={ceoName} onChange={e => setCeoName(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 8, background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.78rem', boxSizing: 'border-box' }} />
            </div>

            <button onClick={handleSignAndApprove} disabled={signing || signed}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 10, background: signed ? 'rgba(16,185,129,0.2)' : signing ? '#374151' : 'linear-gradient(135deg,#047857,#059669)', color: signed ? '#34D399' : 'white', border: signed ? '1px solid rgba(16,185,129,0.4)' : 'none', cursor: signed ? 'default' : 'pointer', fontWeight: 900, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <CheckCircle2 style={{ width: 15, height: 15 }} />
              {signed ? `✓ Signed as ${approvalClass}` : signing ? 'Signing…' : `Sign & Approve ${approvalClass}`}
            </button>

            {!signed && (
              <button onClick={() => { onUpdateStatus(vendor.tracking_id, 'Rejected', 'Application Closed', adminRemark); onClose(); }}
                style={{ width: '100%', marginTop: '0.4rem', padding: '0.5rem', borderRadius: 10, background: 'rgba(220,38,38,0.12)', color: '#FCA5A5', border: '1px solid rgba(220,38,38,0.3)', cursor: 'pointer', fontWeight: 800, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <XCircle style={{ width: 13, height: 13 }} /> Reject Application
              </button>
            )}
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {/* ── Step 2: Official Seal ── */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Upload style={{ width: 13, height: 13 }} /> Step 2 — Upload Official Seal
            </div>
            <input ref={sealRef} type="file" accept="image/*" onChange={handleSealUpload} style={{ display: 'none' }} />
            <div onClick={() => sealRef.current.click()}
              style={{ border: '2px dashed rgba(251,191,36,0.35)', borderRadius: 10, padding: '0.75rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(251,191,36,0.04)', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.4rem' }}>
              {sealImage
                ? <img src={sealImage} alt="Seal" style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain' }} />
                : <>
                    <Upload style={{ width: 20, height: 20, color: '#FBBF24' }} />
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Click to upload company seal<br/>(PNG with transparent bg)</div>
                  </>
              }
            </div>
            {sealImage && (
              <button onClick={() => { setSealImage(null); localStorage.removeItem('hipro_seal_img'); }}
                style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: '#FCA5A5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>✕ Remove Seal</button>
            )}
            <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: '0.35rem' }}>
              Seal appears on the printed dossier's signature block.
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {/* ── Step 3: Remarks ── */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
              ✏️ Step 3 — Internal Audit Remarks
            </div>
            <textarea value={adminRemark} onChange={e => setAdminRemark(e.target.value)}
              placeholder="e.g. Site inspection done, MSME verified via Udyam Portal..."
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: '#1E293B', color: '#F8FAFC', fontSize: '0.75rem', fontFamily: 'inherit', minHeight: 70, resize: 'vertical', boxSizing: 'border-box' }} />
            <button onClick={() => onUpdateStatus(vendor.tracking_id, vendor.status || 'Under Verification', vendor.current_stage || 'Document Verification', adminRemark)}
              style={{ marginTop: '0.4rem', padding: '0.4rem 0.85rem', borderRadius: 8, background: '#4C1D95', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '0.72rem' }}>
              💾 Save Remark
            </button>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {/* ── Step 4: Print reminder ── */}
          <div style={{ padding: '0.7rem', borderRadius: 10, background: 'rgba(0,71,171,0.12)', border: '1px solid rgba(0,71,171,0.3)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#60A5FA', marginBottom: '0.4rem' }}>🖨️ Step 4 — Print Same Document</div>
            <div style={{ fontSize: '0.65rem', color: '#64748B', lineHeight: 1.6 }}>
              Click <strong style={{ color: '#93C5FD' }}>"Print Official A4 Dossier"</strong> above.<br />
              The exact same 4-page document the vendor received will print — with your <strong style={{ color: '#FCD34D' }}>seal</strong> and <strong style={{ color: '#34D399' }}>authorization</strong> added to the signature block.
            </div>
          </div>

        </div>

        {/* RIGHT: Document Preview Message */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1.5rem' }}>

          {/* Preview Card */}
          <div style={{ maxWidth: 560, width: '100%', background: '#1E293B', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            {/* Document Header Preview */}
            <div style={{ background: '#0F172A', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: '#0047AB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.65rem' }}>HiPRO</div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#E2E8F0' }}>HINDUSTAN PROJECTS</div>
                  <div style={{ fontSize: '0.65rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official 4-Page A4 Empanelment Dossier</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 900, color: '#34D399' }}>{vendor.tracking_id}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748B' }}>{new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Vendor Summary */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem 1rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Company', value: vendor.company_name },
                  { label: 'Category', value: vendor.category },
                  { label: 'GSTIN', value: vendor.gstin, mono: true },
                  { label: 'PAN', value: vendor.pan, mono: true },
                  { label: 'Contact', value: vendor.contact_name },
                  { label: 'Phone', value: vendor.phone },
                  { label: 'City', value: `${vendor.city}, ${vendor.state}` },
                  { label: 'Status', value: signed ? `Approved ${approvalClass}` : vendor.status },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 700 }}>{item.label}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#E2E8F0', fontFamily: item.mono ? 'monospace' : undefined }}>{item.value || '—'}</div>
                  </div>
                ))}
              </div>

              {/* Page breakdown */}
              <div style={{ background: '#0F172A', borderRadius: 10, padding: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Document Contains (4 Pages)</div>
                {[
                  'Page 1 — Company Identity, Contact & Statutory Details',
                  'Page 2 — Financial Capacity, Bank Details & Project History',
                  'Page 3 — Rules, Compliance & Authorization Signature Block',
                  'Page 4 — Uploaded Document Attachments & Proof Sheets',
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#0047AB', color: 'white', fontSize: '0.62rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* Seal preview */}
              {sealImage && (
                <div style={{ background: '#0F172A', borderRadius: 8, padding: '0.65rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img src={sealImage} alt="Seal" style={{ height: 40, width: 40, objectFit: 'contain' }} />
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    <div style={{ fontWeight: 800, color: '#FBBF24' }}>✓ Official Seal Attached</div>
                    <div>Will appear on Page 3 signature block</div>
                  </div>
                </div>
              )}

              {signed && (
                <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <CheckCircle2 style={{ width: 16, height: 16, color: '#34D399', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#34D399' }}>Authorized: Approved {approvalClass}</div>
                    <div style={{ fontSize: '0.65rem', color: '#6EE7B7' }}>Signed by {officerName} & {ceoName}</div>
                  </div>
                </div>
              )}

              <button onClick={handlePrint} disabled={printing}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 12, background: printing ? '#374151' : 'linear-gradient(135deg,#0047AB,#0065D0)', color: 'white', border: 'none', cursor: printing ? 'wait' : 'pointer', fontWeight: 900, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(0,71,171,0.4)' }}>
                <Printer style={{ width: 17, height: 17 }} />
                {printing ? 'Opening Print Dialog…' : '🖨️ Print Official 4-Page A4 Dossier'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#475569', textAlign: 'center', maxWidth: 440 }}>
            This prints the <strong style={{ color: '#CBD5E1' }}>exact same document</strong> the vendor received —<br />
            with your official seal and authorization added to Page 3 signature block.
          </div>

        </div>
      </div>
    </div>
  );
}
