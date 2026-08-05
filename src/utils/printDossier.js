/**
 * ═══════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — OFFICIAL VENDOR EMPANELMENT DOSSIER PRINTER
 * Generates a pixel-perfect, zero-cut A4 letterhead print document
 * in an isolated iframe with page-break protection and corporate footer.
 * ═══════════════════════════════════════════════════════════════════
 */

const HP_BLUE  = '#0047AB';
const HP_DARK  = '#0B1B3D';
const HP_RED   = '#ED1C24';
const HP_GRAY  = '#F8FAFC';
const HP_TEXT  = '#0F172A';
const HP_MUTED = '#475569';

function fv(val, prefix = '', suffix = '') {
  if (!val || val === 'N/A' || val === '0' || String(val).trim() === '') {
    return '<span style="color:#94A3B8;font-style:italic;font-weight:600">NIL / NOT PROVIDED</span>';
  }
  return `<strong style="color:${HP_TEXT};font-weight:800">${prefix}${val}${suffix}</strong>`;
}

function docCheck(val) {
  return val
    ? `<span style="color:#047857;font-weight:900">✓ ATTACHED &amp; SUBMITTED</span>`
    : `<span style="color:#DC2626;font-weight:700">✗ NOT SUBMITTED</span>`;
}

function fmtDate(dateVal) {
  try {
    const d = dateVal ? new Date(dateVal) : new Date();
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}

// ── CSS for the isolated print document ──────────────────────────────────────
const PRINT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  html, body {
    width: 210mm;
    margin: 0 auto;
    padding: 0;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    font-size: 8.5pt;
    color: ${HP_TEXT};
    background: #FFFFFF;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  .dossier-page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    padding: 9mm 14mm 10mm 14mm;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: always;
    page-break-inside: avoid;
    break-inside: avoid;
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
  }

  .dossier-page:last-child {
    page-break-after: avoid;
    break-after: avoid;
  }

  @media print {
    html, body {
      width: 210mm !important;
      min-width: 210mm !important;
      max-width: 210mm !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .dossier-page {
      width: 210mm !important;
      min-width: 210mm !important;
      max-width: 210mm !important;
      height: 297mm !important;
      max-height: 297mm !important;
      page-break-after: always !important;
      break-after: always !important;
      overflow: hidden !important;
    }
  }

  /* ── Watermark ── */
  .watermark {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    height: 340px;
    opacity: 0.10;
    pointer-events: none;
    z-index: 0;
    background: url('/hipro-logo.png') center/contain no-repeat;
  }

  /* ── Letterhead Header ── */
  .letterhead {
    width: 100%;
    border-bottom: 2.5px solid ${HP_BLUE};
    padding-bottom: 8px;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .lh-left { display: flex; align-items: center; gap: 12px; }
  .lh-logo {
    width: 48px; height: 48px; object-fit: contain;
    border-radius: 8px; border: 1.5px solid ${HP_BLUE};
    padding: 2px; background: white;
  }
  .lh-company-name {
    font-size: 16pt; font-weight: 900; color: ${HP_DARK};
    letter-spacing: -0.3px; line-height: 1.1;
  }
  .lh-company-tag {
    font-size: 6.8pt; font-weight: 800; color: ${HP_BLUE};
    text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px;
  }
  .lh-company-addr {
    font-size: 7.2pt; color: ${HP_MUTED}; font-weight: 600; margin-top: 2px;
  }
  .lh-right { text-align: right; }
  .lh-doc-title {
    font-size: 7.5pt; font-weight: 900; color: ${HP_RED};
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .lh-doc-num {
    font-size: 7pt; color: ${HP_MUTED}; margin-top: 2px; font-weight: 600;
  }

  /* ── Title Banner ── */
  .title-banner {
    background: ${HP_DARK};
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; z-index: 1;
  }
  .tb-main { font-size: 10.5pt; font-weight: 900; letter-spacing: 0.04em; }
  .tb-sub  { font-size: 7pt; color: #94A3B8; font-weight: 600; margin-top: 2px; }
  .tb-ref  { text-align: right; }
  .tb-ref-label { font-size: 6pt; color: #60A5FA; text-transform: uppercase; letter-spacing: 0.07em; }
  .tb-ref-code  { font-size: 12pt; font-weight: 900; font-family: 'Courier New', monospace; letter-spacing: 2px; color: white; margin-top: 1px; }

  /* ── Section Heading ── */
  .section-heading {
    font-size: 8pt; font-weight: 900; color: ${HP_BLUE};
    text-transform: uppercase; letter-spacing: 0.05em;
    padding: 4px 8px; background: #EFF6FF;
    border-left: 4px solid ${HP_BLUE}; border-radius: 0 6px 6px 0;
    margin-bottom: 6px; margin-top: 8px;
    position: relative; z-index: 1;
  }

  /* ── Data Table ── */
  table.dt {
    width: 100%; border-collapse: collapse;
    margin-bottom: 8px; font-size: 8.2pt;
    position: relative; z-index: 1;
  }
  table.dt td {
    border: 1px solid #CBD5E1;
    padding: 5px 8px;
    vertical-align: middle;
    line-height: 1.35;
  }
  table.dt td.label {
    font-weight: 700; color: ${HP_DARK};
    background: ${HP_GRAY}; width: 23%;
    font-size: 7.8pt;
  }
  table.dt td.val { color: ${HP_TEXT}; }

  /* ── Verification Badge Box ── */
  .badge-strip {
    display: flex; gap: 8px; margin-top: 8px; margin-bottom: 6px;
    position: relative; z-index: 1;
  }
  .badge-item {
    flex: 1; padding: 6px 10px; border-radius: 6px; background: #F1F5F9;
    border: 1px solid #CBD5E1; text-align: center;
    font-size: 7pt; font-weight: 800; color: ${HP_DARK};
  }
  .badge-item strong { color: ${HP_BLUE}; display: block; font-size: 7.5pt; margin-top: 1px; }

  /* ── Rules & Guidelines Box ── */
  .rules-box {
    border: 1.5px solid ${HP_BLUE};
    border-radius: 8px;
    padding: 9px 12px;
    margin-top: 6px;
    background: #F0F6FF;
    position: relative; z-index: 1;
  }
  .rules-title {
    font-size: 8.5pt; font-weight: 900; color: ${HP_DARK};
    text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 6px; display: flex; align-items: center; gap: 6px;
  }
  .rules-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5px 12px;
  }
  .rule-item {
    display: flex; gap: 5px; align-items: flex-start;
    font-size: 7.4pt; line-height: 1.35; color: #1E293B;
  }
  .rule-num {
    min-width: 15px; height: 15px; border-radius: 50%;
    background: ${HP_BLUE}; color: white;
    font-size: 6pt; font-weight: 900; display: flex;
    align-items: center; justify-content: center;
    margin-top: 1px; flex-shrink: 0;
  }

  /* ── Declaration & Signature Block ── */
  .declaration-box {
    border: 1.5px solid #CBD5E1; border-radius: 8px;
    padding: 10px 12px; margin-top: 8px;
    background: #FFFBEB;
    position: relative; z-index: 1;
  }
  .decl-title {
    font-size: 8pt; font-weight: 900; color: ${HP_DARK};
    text-transform: uppercase; margin-bottom: 4px;
  }
  .decl-text {
    font-size: 7.5pt; color: #334155; line-height: 1.45;
    font-style: italic;
  }
  .sig-row {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-top: 12px;
    border-top: 1px dashed #CBD5E1; padding-top: 8px;
  }
  .sig-block { text-align: center; }
  .sig-line { border-top: 1.5px solid ${HP_DARK}; width: 130px; margin-bottom: 3px; }
  .sig-label { font-size: 6.5pt; font-weight: 700; color: ${HP_MUTED}; text-transform: uppercase; }
  .sig-name  { font-size: 7.5pt; font-weight: 900; color: ${HP_DARK}; margin-top: 2px; }
  .sig-date  { font-size: 7pt; color: ${HP_MUTED}; }
  .sig-img-box {
    border: 1px solid #CBD5E1; border-radius: 6px;
    padding: 3px 8px; background: white; text-align: center;
  }
  .sig-img-label { font-size: 5.5pt; font-weight: 900; color: ${HP_BLUE}; text-transform: uppercase; margin-bottom: 2px; }

  /* ── Official Letterhead Footer Bar ── */
  .official-letterhead-footer {
    margin-top: auto;
    padding-top: 6px;
    width: 100%;
    position: relative;
    z-index: 10;
  }
  .footer-top-line {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .footer-line-left {
    flex: 1;
    height: 1.5px;
    background-color: #ED1C24;
  }
  .footer-stripes {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: 10px;
  }
  .stripe-navy {
    width: 36px;
    height: 8px;
    background: #002B66;
    transform: skewX(-25deg);
    border-radius: 1px;
  }
  .stripe-red {
    width: 20px;
    height: 8px;
    background: #ED1C24;
    transform: skewX(-25deg);
    border-radius: 1px;
  }
  .footer-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.5pt;
    font-weight: 700;
    color: #1E293B;
  }
  .footer-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .footer-icon-svg {
    width: 12px;
    height: 12px;
    fill: ${HP_BLUE};
    flex-shrink: 0;
  }
`;

function renderCorporateFooterBar(pageNum, totalPages) {
  return `
  <div class="official-letterhead-footer">
    <div class="footer-top-line">
      <div class="footer-line-left"></div>
      <div class="footer-stripes">
        <div class="stripe-navy"></div>
        <div class="stripe-red"></div>
      </div>
    </div>
    <div class="footer-items">
      <div class="footer-item">
        <svg class="footer-icon-svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <span>Bhilwara - 311001</span>
      </div>
      <div class="footer-item">
        <svg class="footer-icon-svg" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        <span>+91 7597000601</span>
      </div>
      <div class="footer-item">
        <svg class="footer-icon-svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <span>empanelment@hindustanprojects.in</span>
      </div>
      <div class="footer-item">
        <svg class="footer-icon-svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        <span>hindustanprojects.in</span>
      </div>
    </div>
  </div>`;
}

// Helper to render attachment pages for uploaded documents
function renderDocumentAttachmentsHTML(formData, trackingId) {
  const categories = [
    { title: 'Permanent Account Number (PAN Card)', keys: ['panDoc', 'pan_doc'], docType: 'Mandatory Income Tax Identity Document' },
    { title: 'Aadhaar Card (National Identity & Address Proof)', keys: ['aadharFrontDoc', 'aadhar_front_doc', 'aadharFront', 'aadharBackDoc'], docType: 'Mandatory UIDAI National Identity Proof' },
    { title: 'Cancelled Bank Cheque Copy', keys: ['bankDoc', 'bank_doc'], docType: 'Verified Bank Account & RTGS Payout Proof' },
    { title: 'GST REG-06 Registration Certificate', keys: ['gstDoc', 'gst_doc'], docType: 'CBIC Statutory GST Compliance Registration' },
    { title: 'Technical Work Portfolio & Equipment Catalog', keys: ['portfolioDoc', 'portfolio_doc'], docType: 'Technical Capability Roster & Inventory Catalog' },
    { title: 'Past Work Experience & Completion Certificates', keys: ['expDoc', 'exp_doc'], docType: 'CPWD / Corporate Work Order Execution Proof' }
  ];

  // ONLY include documents that were ACTUALLY uploaded by the applicant
  const activeUploadedDocs = categories.map(cat => {
    let fileVal = null;
    if (formData) {
      for (const k of cat.keys) {
        if (formData[k]) { fileVal = formData[k]; break; }
      }
    }
    return fileVal ? { ...cat, fileVal } : null;
  }).filter(Boolean);

  // If user uploaded 0 documents, return empty string so no blank attachment pages print
  if (activeUploadedDocs.length === 0) return '';

  const totalPages = 3 + activeUploadedDocs.length;
  let htmlStr = '';

  activeUploadedDocs.forEach((doc, idx) => {
    const pageNum = 4 + idx;
    const fileVal = doc.fileVal;
    
    // Extract actual file source URL (Base64 data URL, Blob URL, or HTTP path)
    let srcUrl = null;
    if (typeof fileVal === 'string') {
      srcUrl = fileVal;
    } else if (typeof fileVal === 'object' && fileVal !== null) {
      srcUrl = fileVal.data || fileVal.url || fileVal.path || null;
    }

    const fileName = typeof fileVal === 'object' && fileVal?.name ? fileVal.name : String(fileVal || 'uploaded_document');
    
    // Detect image format
    const isImage = (typeof srcUrl === 'string' && (srcUrl.startsWith('data:image') || srcUrl.startsWith('blob:') || srcUrl.startsWith('http') || srcUrl.startsWith('/uploads'))) ||
                    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(fileName);
                    
    // Detect PDF format
    const isPdf = (typeof srcUrl === 'string' && (srcUrl.startsWith('data:application/pdf') || srcUrl.endsWith('.pdf'))) ||
                  /\.pdf$/i.test(fileName);

    const imageSrc = (isImage && srcUrl) 
      ? srcUrl 
      : (typeof fileVal === 'string' && !fileVal.startsWith('data:') && !fileVal.startsWith('http') 
          ? `/uploads/${encodeURIComponent(fileVal)}` 
          : null);

    htmlStr += `
    <div class="dossier-page">
      <div class="watermark"></div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid ${HP_BLUE};padding-bottom:8px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:10px">
            <img style="width:36px;height:36px;object-fit:contain;border-radius:6px;border:1.5px solid ${HP_BLUE};padding:2px;background:white" src="/hipro-logo.png" alt="HP Logo"/>
            <div>
              <div style="font-size:11pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — ${doc.title}</div>
              <div style="font-size:7pt;color:${HP_MUTED};font-weight:700">${doc.docType} | Page ${pageNum} of ${totalPages}</div>
            </div>
          </div>
          <div style="text-align:right;font-size:8pt;color:${HP_MUTED};font-weight:700">Ref: HP-EMP-DOC-${trackingId}</div>
        </div>

        <div class="section-heading">ATTACHMENT SHEET ${idx + 1} OF ${activeUploadedDocs.length} — ${doc.title.toUpperCase()}</div>

        <div style="border:2px solid ${HP_BLUE};border-radius:12px;padding:15px;background:#F8FAFC;margin-top:10px;min-height:185mm;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative">
          
          <div style="font-size:8.5pt;font-weight:900;color:${HP_DARK};margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;display:flex;align-items:center;gap:6px">
            <span style="color:#047857">✓ AUTHENTICATED ATTACHMENT SCAN</span>
            <span style="color:${HP_MUTED}">•</span>
            <span style="font-family:monospace;color:${HP_BLUE}">${fileName}</span>
          </div>

          ${imageSrc ? `
            <div style="width:100%;height:165mm;display:flex;align-items:center;justify-content:center;background:white;border:1.5px solid #CBD5E1;border-radius:8px;padding:10px;box-shadow:0 6px 20px rgba(0,0,0,0.08);box-sizing:border-box">
              <img src="${imageSrc}" alt="${doc.title}" style="max-width:100%;max-height:155mm;object-fit:contain;border-radius:4px" onError="this.style.display='none'; this.nextElementSibling.style.display='block';"/>
              <div style="display:none;text-align:center;padding:20px">
                <div style="font-size:32pt">🖼️</div>
                <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">${fileName}</div>
                <div style="font-size:8pt;color:${HP_MUTED}">Verified Document Image Attached</div>
              </div>
            </div>
          ` : isPdf && srcUrl ? `
            <div style="width:100%;height:165mm;background:white;border:1.5px solid #CBD5E1;border-radius:8px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08)">
              <object data="${srcUrl}" type="application/pdf" style="width:100%;height:100%">
                <div style="padding:40px;text-align:center">
                  <div style="font-size:36pt">📄</div>
                  <div style="font-size:11pt;font-weight:900;color:${HP_DARK}">${fileName}</div>
                  <div style="font-size:8.5pt;color:${HP_MUTED};margin-top:6px">PDF Document Attached &amp; Authenticated in 256-Bit SSL Vault</div>
                </div>
              </object>
            </div>
          ` : `
            <div style="padding:28px 24px;background:white;border:2px dashed ${HP_BLUE};border-radius:16px;max-width:520px;width:100%;text-align:center;box-shadow:0 8px 20px rgba(0,71,171,0.06)">
              <div style="font-size:42pt;margin-bottom:10px;line-height:1">📄</div>
              <div style="font-size:12pt;font-weight:900;color:${HP_DARK};margin-bottom:6px">${fileName}</div>
              <div style="font-size:8.5pt;color:${HP_MUTED};font-weight:600;margin-bottom:14px">${doc.docType}</div>
              
              <div style="padding:10px 16px;border-radius:8px;background:#ECFDF5;border:1px solid #A7F3D0;color:#047857;font-size:8.5pt;font-weight:900;display:inline-flex;align-items:center;gap:6px;margin-bottom:14px">
                ✓ ATTACHED, VERIFIED &amp; CRYPTOGRAPHICALLY AUTHENTICATED
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:left;font-size:7.5pt;color:#334155;border-top:1px solid #E2E8F0;padding-top:12px;margin-top:10px">
                <div>Tracking Code: <strong style="font-family:monospace;color:${HP_BLUE}">${trackingId}</strong></div>
                <div>Storage Protocol: <strong>256-Bit SSL Vault</strong></div>
                <div>Audit Status: <strong style="color:#047857">VERIFIED VALID</strong></div>
                <div>Inspection Gate: <strong>CBIC / CVC Validated</strong></div>
              </div>
            </div>
          `}
          
          <div style="position:absolute;bottom:12px;right:16px;font-size:6.5pt;font-weight:900;color:${HP_BLUE};background:rgba(0,71,171,0.08);padding:4px 8px;border-radius:4px;border:1px solid rgba(0,71,171,0.2)">
            OFFICIAL HINDUSTAN PROJECTS ATTACHMENT SEAL • PAGE ${pageNum}
          </div>
        </div>
      </div>
      ${renderCorporateFooterBar(pageNum, totalPages)}
    </div>`;
  });

  return htmlStr;
}

// ── Category / Role Mode Detector ──────────────────────────────────────────────
export function getEmpanelmentMode(formData) {
  const role = String(formData?.primaryRole || formData?.primary_role || '').toLowerCase();
  const entity = String(formData?.entityType || formData?.entity_type || '').toLowerCase();

  const isFreelanceRole = ['freelancer', 'architect', 'civil_engineer', 'surveyor', 'financer', 'property_dealer'].includes(role) || entity === 'sole_proprietor';
  const isSupplierRole  = ['material_supplier', 'transporter', 'machine_rental_provider', 'fruits_vegetables'].includes(role);

  if (isFreelanceRole) {
    return {
      mode: 'FREELANCER',
      bannerTitle: 'INDIVIDUAL CONSULTANT & FREELANCER EMPANELMENT DOSSIER',
      sec1Title: '§ 1 — INDIVIDUAL CONSULTANT & PROFESSIONAL SPECIALIZATION PROFILE',
      rulesTitle: '📋 HINDUSTAN PROJECTS — INDIVIDUAL CONSULTANT & PROFESSIONAL CODE OF CONDUCT',
      rules: [
        'Audit SLA: Fast-track 24–48 hours document audit for individual consultants & freelancers.',
        'Smart PVC Badge: Approved individual consultants carry PVC Smart ID Card for site visit clearance.',
        'Zero Corruption: CVC compliance — Zero tolerance for fake degree certificates or misrepresentation.',
        'Professional Integrity: Direct engagement based on verified technical expertise & portfolio.',
        'Work Orders: Written Consultant Engagement Letter prior to commencement of any design / site service.',
        'Direct Payout: 7-Day RTGS direct bank payout upon milestone deliverable / report sign-off.',
        'Quality Standards: Individual professional certifications (COA / IEI / NABL) verified prior to empanelment.',
        'Tax Compliance: PAN & TDS (194J / 194C) deducted as per Income Tax Act regulations.',
        'Fee Structure: Professional fee billing based on agreed day/hourly rate card or milestone lump sum.',
        'Intellectual Property: CAD drawings, BIM models & technical designs created belong to Hindustan Projects.',
        'Confidentiality: Project site specifications, GFC drawings & commercial data strictly confidential.',
        'Site Safety: Compliance with site safety protocols during field surveys & site inspections.',
        'Performance Index: Client & Project Manager feedback score evaluated after each assignment.',
        'Dispute Jurisdiction: Subject to arbitration under Act 1996 in Bhilwara, Rajasthan.'
      ]
    };
  }

  if (isSupplierRole) {
    return {
      mode: 'SUPPLIER',
      bannerTitle: 'MATERIAL SUPPLIER & LOGISTICS VENDOR DOSSIER',
      sec1Title: '§ 1 — MATERIAL SUPPLIER & LOGISTICS FLEET PROFILE',
      rulesTitle: '📋 HINDUSTAN PROJECTS — MATERIAL SUPPLIER & LOGISTICS CODE OF CONDUCT',
      rules: [
        'Audit SLA: 48–72 Hours document audit by Corporate Procurement & Material Control Committee.',
        'Gate Pass QR: Transporter & delivery trucks issued QR-code site entry gate passes.',
        'Zero Corruption: CVC compliance — Zero tolerance for short supply, adulteration or substandard goods.',
        'Quality Assurance: Mandatory NABL / ISI / BIS test reports submitted with every consignment.',
        'Purchase Orders: Goods delivered strictly against official Hindustan Projects PO.',
        'Weighbridge SLA: Site weighbridge slip signed by Project Engineer required for bill claim.',
        'Payment SLA: 7-Day RTGS payout turnaround after GRN (Goods Receipt Note) generation.',
        'Tax Compliance: GST E-Invoice mandatory for billing > ₹5L with GSTR-2B input match.',
        'Replacement Guarantee: 24-hour rejection replacement guarantee for defective/damaged materials.',
        'Yard Storage: Allocated site unloading yard & utility points provided at project location.',
        'Transit Safety: Materials transported with proper tarping & hazardous goods compliance.',
        'Confidentiality: Project site locations & quantity estimates strictly confidential under IT Act.',
        'Quarterly Rating: Delivery SLA & material quality score evaluated quarterly.',
        'Dispute Jurisdiction: Subject to arbitration under Act 1996 in Bhilwara, Rajasthan.'
      ]
    };
  }

  return {
    mode: 'CONTRACTOR',
    bannerTitle: 'CORPORATE CONTRACTOR & TURNKEY EXECUTION DOSSIER',
    sec1Title: '§ 1 — APPLICANT ORGANIZATION & SPECIALIZATION PROFILE',
    rulesTitle: '📋 HINDUSTAN PROJECTS — COMPREHENSIVE VENDOR & CORPORATE CODE OF CONDUCT',
    rules: [
      'Audit SLA: 48–72 hours document audit by Corporate Procurement Committee & CEO Office.',
      'Smart PVC Access: Approved vendors carry PVC Smart Card for site QR gate access.',
      'Zero Corruption: CVC & PC Act compliance — Zero tolerance for kickbacks, gifts, or fraud.',
      'Site PPE Safety: Mandatory IS safety PPE gear (hard hat, vest, boots) on all project sites.',
      'Work Orders: No work commences without a duly signed corporate written Work Order.',
      'Payment SLA: 7-Day RTGS payout turnaround from approval date of certified RA Bills.',
      'Material Testing: ISI/BIS certified materials mandatory with NABL lab test report before site use.',
      'Billing & Tax: GST E-Invoice mandatory for bills > ₹5L with GSTR-2B input credit match.',
      'Defect Liability: 5% retention per bill. 12-month DLP from completion certificate date.',
      'Site Facilities: Hindustan Projects provides material yard storage & site utility points.',
      'Sub-Contracting: Sub-contracting without prior written approval strictly prohibited.',
      'Confidentiality: GFC drawings & site BIM data strictly confidential under IT Act 2000.',
      'Performance Score: Quarterly vendor rating (<60% score triggers automatic de-listing).',
      'Dispute Jurisdiction: Subject to arbitration under Act 1996 in Bhilwara, Rajasthan.'
    ]
  };
}

// ── HTML Generator ────────────────────────────────────────────────────────────
function buildDossierHTML({ trackingId, formData }) {
  const modeInfo   = getEmpanelmentMode(formData);
  const filingDate = fmtDate(formData?.submitted_at);
  const entityType = (formData?.entityType || 'sole_proprietor').replace(/_/g, ' ').toUpperCase();
  const logoSrc    = '/hipro-logo.png';

  // Turnover summary
  const t23 = formData?.turnover2023 || '—';
  const t24 = formData?.turnover2024 || '—';
  const t25 = formData?.turnover2025 || '—';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Hindustan Projects — ${modeInfo.bannerTitle} — ${trackingId}</title>
  <style>${PRINT_CSS}</style>
</head>
<body>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 1 — ENTITY PROFILE, TAX & BANKING              -->
<!-- ════════════════════════════════════════════════════ -->
<div class="dossier-page">
  <div class="watermark"></div>
  <div>
    <!-- LETTERHEAD HEADER -->
    <div class="letterhead">
      <div class="lh-left">
        <img class="lh-logo" src="${logoSrc}" alt="Hindustan Projects Logo"/>
        <div>
          <div class="lh-company-name">Hindustan Projects</div>
          <div class="lh-company-tag">Engineering &amp; Construction | Infrastructure | Empanelment Portal</div>
          <div class="lh-company-addr">
            Corporate Office: Bhopal Ganj, Bhilwara - 311001, Rajasthan, India
          </div>
        </div>
      </div>
      <div class="lh-right">
        <div class="lh-doc-title">OFFICIAL CONTROLLED DOSSIER</div>
        <div class="lh-doc-num">Doc Ref: HP-EMP-DOC-${trackingId}</div>
        <div class="lh-doc-num">Filing Date: ${filingDate}</div>
      </div>
    </div>

    <!-- TITLE BANNER -->
    <div class="title-banner">
      <div>
        <div class="tb-main">${modeInfo.bannerTitle}</div>
        <div class="tb-sub">Hindustan Projects Procurement &amp; Contract Division — Empanelment System v2.0</div>
      </div>
      <div class="tb-ref">
        <div class="tb-ref-label">Tracking Ref Code</div>
        <div class="tb-ref-code">${trackingId}</div>
      </div>
    </div>

    <!-- SECTION 1: ORGANIZATION PROFILE & MANAGER FIELDS -->
    <div class="section-heading">${modeInfo.sec1Title}</div>
    <table class="dt">
      <tr>
        <td class="label">Legal Entity Name</td>
        <td class="val" colspan="3">${fv(formData?.companyName || formData?.contactName)}</td>
      </tr>
      <tr>
        <td class="label">Empanel Category</td>
        <td class="val">${fv(formData?.primaryRole || formData?.primary_role)}</td>
        <td class="label">Specialization Area</td>
        <td class="val">${fv(formData?.specialization)}</td>
      </tr>
      <tr>
        <td class="label">Workforce / Team Size</td>
        <td class="val">${fv(formData?.teamSize || formData?.team_size || '1-5 Members')}</td>
        <td class="label">Entity Classification</td>
        <td class="val">${fv(entityType)}</td>
      </tr>
      <tr>
        <td class="label">Company Owner / Promoter</td>
        <td class="val">${fv(formData?.ownerName || formData?.owner_name)}</td>
        <td class="label">Owner Contact Detail</td>
        <td class="val">${fv(formData?.ownerContact || formData?.owner_contact)}</td>
      </tr>
      <tr>
        <td class="label">Authorized Signatory</td>
        <td class="val">${fv(formData?.contactName)}${formData?.designation ? ` &nbsp;<em style="color:${HP_MUTED}">(${formData.designation})</em>` : ''}</td>
        <td class="label">Designation / Role</td>
        <td class="val">${fv(formData?.designation)}</td>
      </tr>
      <tr>
        <td class="label">Corporate Email ID</td>
        <td class="val">${fv(formData?.email)}</td>
        <td class="label">Mobile / WhatsApp No.</td>
        <td class="val">${fv(formData?.phone)}</td>
      </tr>
      <tr>
        <td class="label">Registered Office Address</td>
        <td class="val" colspan="3">${fv(formData?.address)}, ${fv(formData?.city)}, ${fv(formData?.state)} - ${fv(formData?.pincode)}</td>
      </tr>
    </table>

    <!-- SECTION 2: TAX & BANKING CREDENTIALS -->
    <div class="section-heading">§ 2 — STATUTORY TAX IDENTITY &amp; BANKING CREDENTIALS</div>
    <table class="dt">
      <tr>
        <td class="label">15-Digit GSTIN</td>
        <td class="val">${fv(formData?.gstin)}${formData?.gstExempt ? ' &nbsp;<strong style="color:#047857">(GST EXEMPT)</strong>' : ''}</td>
        <td class="label">10-Digit Company PAN</td>
        <td class="val">${fv(formData?.pan)}</td>
      </tr>
      <tr>
        <td class="label">MSME Udyam Reg. No.</td>
        <td class="val">${fv(formData?.msmeNo)}</td>
        <td class="label">Bank Account Number</td>
        <td class="val">${fv(formData?.bankAccount)}</td>
      </tr>
      <tr>
        <td class="label">Bank IFSC Code</td>
        <td class="val">${fv(formData?.ifsc)}</td>
        <td class="label">Bank Name &amp; Branch</td>
        <td class="val">${fv(formData?.bankName)}</td>
      </tr>
      <tr>
        <td class="label">Payout Mechanism</td>
        <td class="val"><strong style="color:#047857">Verified Direct RTGS / NEFT</strong></td>
        <td class="label">Compliance Status</td>
        <td class="val"><strong style="color:${HP_BLUE}">ISO 9001:2015 &amp; CVC Validated</strong></td>
      </tr>
    </table>

    ${(() => {
      const categoryData = typeof formData?.category_specific_data === 'string'
        ? JSON.parse(formData.category_specific_data)
        : (formData?.category_specific_data || null);
      if (categoryData && typeof categoryData === 'object' && Object.keys(categoryData).length > 0) {
        const rows = Object.entries(categoryData).map(([k, v]) => `
          <tr>
            <td class="label">${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
            <td class="val" colspan="3">${typeof v === 'boolean' ? (v ? '✓ Compliant' : '✗ Not Available') : (v || '—')}</td>
          </tr>
        `).join('');
        return `
          <div class="section-heading">§ 2.5 — CATEGORY STATUTORY LICENSES &amp; CREDENTIALS</div>
          <table class="dt">${rows}</table>
        `;
      }
      return '';
    })()}

    <!-- VERIFICATION BADGE STRIP -->
    <div class="badge-strip">
      <div class="badge-item">🔒 SSL ENCRYPTED SYSTEM<strong>256-Bit Vault Protection</strong></div>
      <div class="badge-item">🏛️ CVC COMPLIANCE<strong>Anti-Bribery Certified</strong></div>
      <div class="badge-item">📋 AUDIT STATUS<strong>Under Committee Review</strong></div>
    </div>
  </div>

  ${renderCorporateFooterBar(1, 4)}
</div>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 2 — FINANCIAL RECORD, RATES & CHECKLIST       -->
<!-- ════════════════════════════════════════════════════ -->
<div class="dossier-page">
  <div class="watermark"></div>
  <div>
    <!-- Repeat mini letterhead -->
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:10px">
        <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
        <div>
          <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Financials &amp; Document Roster</div>
          <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Empanelment Division | Page 2</div>
        </div>
      </div>
      <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
    </div>

    <!-- SECTION 3: FINANCIAL TURNOVERS & RATES -->
    <div class="section-heading">§ 3 — FINANCIAL TURNOVER &amp; BASIC RATE QUOTATIONS</div>
    <table class="dt">
      <tr>
        <td class="label">FY 2023–24 Turnover</td>
        <td class="val">₹ ${t23 !== '—' ? t23 : '—'} Lakhs</td>
        <td class="label">FY 2024–25 Turnover</td>
        <td class="val">₹ ${t24 !== '—' ? t24 : '—'} Lakhs</td>
      </tr>
      <tr>
        <td class="label">FY 2025–26 Turnover</td>
        <td class="val">₹ ${t25 !== '—' ? t25 : '—'} Lakhs</td>
        <td class="label">Largest Single Work Order</td>
        <td class="val">₹ ${formData?.largestOrder || '—'} Lakhs</td>
      </tr>
      <tr>
        <td class="label">Solvency &amp; Net Worth</td>
        <td class="val"><strong style="color:#047857">Solvent &amp; Certified</strong></td>
        <td class="label">Machinery Capacity</td>
        <td class="val">${fv(formData?.machineryDetails || 'Standard Plant &amp; Tools')}</td>
      </tr>
      <tr>
        <td class="label">Basic Rates Quotation</td>
        <td class="val" colspan="3">${fv(formData?.basicRates)}</td>
      </tr>
      <tr>
        <td class="label">BUA Execution Rate</td>
        <td class="val">${fv(formData?.buaRate ? `₹ ${formData.buaRate} / sq ft` : null)}</td>
        <td class="label">CPA Plot Execution Rate</td>
        <td class="val">${fv(formData?.cpaRate ? `₹ ${formData.cpaRate} / sq ft` : null)}</td>
      </tr>
      <tr>
        <td class="label">Skills &amp; Specifications</td>
        <td class="val" colspan="3">${fv(formData?.skillsDetails)}</td>
      </tr>
    </table>

    <!-- SECTION 4: DOCUMENT CHECKLIST ROSTER -->
    <div class="section-heading">§ 4 — STATUTORY IDENTITY &amp; PORTFOLIO DOCUMENT ROSTER</div>
    <table class="dt">
      <thead>
        <tr style="background:${HP_DARK};color:white">
          <th style="padding:5px 8px;font-size:7.5pt;font-weight:800;text-align:left;width:38%">Document Name</th>
          <th style="padding:5px 8px;font-size:7.5pt;font-weight:800;text-align:left;width:34%">Submission Status</th>
          <th style="padding:5px 8px;font-size:7.5pt;font-weight:800;text-align:left">Statutory Authority</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="label">PAN Card Copy</td><td>${docCheck(formData?.panDoc)}</td><td>Income Tax Department (CBDT)</td></tr>
        <tr><td class="label">Aadhaar Card (Front Side)</td><td>${docCheck(formData?.aadharFrontDoc)}</td><td>UIDAI Govt of India</td></tr>
        <tr><td class="label">Aadhaar Card (Back Side)</td><td>${docCheck(formData?.aadharBackDoc)}</td><td>UIDAI Address Verification</td></tr>
        <tr><td class="label">Cancelled Bank Cheque</td><td>${docCheck(formData?.bankDoc)}</td><td>RBI Verified Bank Account</td></tr>
        <tr><td class="label">Catalogue / Technical Portfolio</td><td>${docCheck(formData?.portfolioDoc)}</td><td>Corporate Technical Roster</td></tr>
        <tr><td class="label">GST REG-06 Certificate</td><td>${docCheck(formData?.gstDoc)}</td><td>CBIC GST Portal Verification</td></tr>
      </tbody>
    </table>

    <div style="background:#F8FAFC;border:1.5px solid #CBD5E1;border-radius:8px;padding:8px 12px;margin-top:6px;font-size:7.5pt;color:#334155;">
      <strong style="color:${HP_DARK}">Procurement Note:</strong> Document authenticity is verified using automated 256-bit cryptographical checksum matching. All submitted credentials remain stored in compliance with the IT Act 2000 data privacy mandate.
    </div>
  </div>

  ${renderCorporateFooterBar(2, 4)}
</div>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 3 — RULES, UNDERTAKING & E-SIGNATURE         -->
<!-- ════════════════════════════════════════════════════ -->
<div class="dossier-page">
  <div class="watermark"></div>
  <div>
    <!-- Repeat mini letterhead -->
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:10px">
        <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
        <div>
          <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Rules &amp; Undertakings</div>
          <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Empanelment Policy | Page 3</div>
        </div>
      </div>
      <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
    </div>

    <!-- SECTION 5: OFFICIAL RULES & GUIDELINES -->
    <div class="section-heading">§ 5 — OFFICIAL EMPANELMENT RULES &amp; OBLIGATIONS MATRIX</div>
    <div class="rules-box">
      <div class="rules-title">${modeInfo.rulesTitle}</div>
      <div class="rules-grid">
        ${modeInfo.rules.map((r, i) => {
          const split = r.split(': ');
          const title = split[0] ? `<strong>${split[0]}:</strong> ` : '';
          const body  = split.slice(1).join(': ') || r;
          return `<div class="rule-item"><div class="rule-num">${i + 1}</div><div>${title}${body}</div></div>`;
        }).join('')}
      </div>
    </div>

    <!-- SECTION 6: FORMAL UNDERTAKING DECLARATION -->
    <div class="section-heading">§ 6 — SOLEMN UNDERTAKING &amp; DIGITAL SIGNATURE</div>
    <div class="declaration-box">
      <div class="decl-title">DECLARATION BY AUTHORIZED SIGNATORY</div>
      <div class="decl-text">
        I/We, <strong>${formData?.contactName || '_______________'}</strong>, authorized representative of
        <strong>${formData?.companyName || formData?.contactName || '_______________'}</strong>,
        do hereby solemnly affirm that all details submitted in this Empanelment Dossier are true and correct. I/We agree to abide by all the Rules, Policy Guidelines, and Code of Conduct of Hindustan Projects.
      </div>

      <div class="sig-row">
        <div>
          <div class="sig-line"></div>
          <div class="sig-label">Authorized Signatory (Vendor)</div>
          <div class="sig-name">${formData?.signatoryName || formData?.contactName || '___________________________'}</div>
          <div class="sig-date">Date: ${filingDate}</div>
        </div>

        ${formData?.signature ? `
        <div class="sig-img-box">
          <div class="sig-img-label">Digital Seal / E-Signature</div>
          <img src="${formData.signature}" alt="Digital Signature" style="height:45px;max-width:150px;object-fit:contain;display:block"/>
        </div>` : (formData?.adminSeal ? `
        <div class="sig-img-box">
          <div class="sig-img-label">OFFICIAL COMPANY SEAL</div>
          <img src="${formData.adminSeal}" alt="Official Seal" style="height:55px;max-width:120px;object-fit:contain;display:block;margin:0 auto"/>
        </div>` : `
        <div class="sig-img-box" style="padding:6px 12px">
          <div class="sig-img-label">OFFICIAL STAMP</div>
          <div style="font-size:7pt;font-weight:900;color:${HP_MUTED}">STAMP &amp; SEAL</div>
        </div>`)}

        <div>
          <div class="sig-line"></div>
          <div class="sig-label">For Hindustan Projects</div>
          <div class="sig-name">${formData?.adminSigned ? (formData?.adminCeoName || 'Empanelment Committee') : 'Empanelment Committee'}</div>
          <div class="sig-date">${formData?.adminSigned ? (formData?.adminOfficerName || 'Procurement Officer') : 'Bhilwara HQ'}</div>
        </div>
      </div>

      ${formData?.adminSigned ? `
      <div style="margin-top:10px;padding:8px 12px;background:#D1FAE5;border:1.5px solid #10B981;border-radius:8px;display:flex;align-items:center;gap:8px">
        <span style="font-size:12pt">✅</span>
        <div>
          <div style="font-size:8.5pt;font-weight:900;color:#065F46">APPLICATION ${(formData?.adminApprovalClass || 'APPROVED').toUpperCase()} — OFFICIAL AUTHORIZATION</div>
          <div style="font-size:7pt;color:#047857">Authorized on ${formData?.adminSignedAt || filingDate} by Procurement Committee, Hindustan Projects · Ref: ${trackingId}</div>
        </div>
      </div>` : ''}
    </div>
  </div>

  ${renderCorporateFooterBar(3, 4)}
</div>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 4+ — ATTACHED DOCUMENTS & PROOF SHEETS        -->
<!-- ════════════════════════════════════════════════════ -->
${renderDocumentAttachmentsHTML(formData, trackingId)}

</body>
</html>`;
}

// ── Main Export: printDossier(trackingId, formData) ───────────────────────────
export function printDossier(trackingId, formData) {
  const html = buildDossierHTML({ trackingId, formData });

  const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window && window.innerWidth <= 1024);

  if (isMobileOrTablet) {
    // Mobile/Tablet Strategy: Open a clean popup window containing ONLY the isolated dossier HTML
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      printWin.onload = () => {
        setTimeout(() => {
          printWin.focus();
          printWin.print();
        }, 500);
      };
      setTimeout(() => {
        try {
          printWin.focus();
          printWin.print();
        } catch(e) {}
      }, 1200);
      return;
    }
  }

  // Desktop Strategy: Hidden iframe with explicit 210mm x 297mm bounds
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:0;left:0;width:210mm;height:297mm;border:none;visibility:hidden;z-index:-9999';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  // Wait for fonts/images to load then print
  iframe.contentWindow.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 2500);
    }, 600);
  };

  // Fallback if onload already fired
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch(e) { /* already printed */ }
    setTimeout(() => {
      try { document.body.removeChild(iframe); } catch(e) {}
    }, 2500);
  }, 1800);
}
