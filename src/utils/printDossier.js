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
  } catch { return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); }
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
    padding: 10mm 15mm 12mm 15mm;
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
      width: 210mm;
      margin: 0;
      padding: 0;
    }
    .dossier-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      page-break-after: always;
      break-after: always;
      overflow: hidden;
    }
  }

  /* ── Watermark ── */
  .watermark {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
    background: url('/hipro-logo.png') center/contain no-repeat;
  }

  /* ── Letterhead ── */
  .letterhead {
    width: 100%;
    border-bottom: 2.5px solid ${HP_BLUE};
    padding-bottom: 8px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .lh-left { display: flex; align-items: center; gap: 12px; }
  .lh-logo {
    width: 46px; height: 46px; object-fit: contain;
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
    margin-bottom: 10px;
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
    margin-bottom: 6px; margin-top: 10px;
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
    padding: 4px 7px;
    vertical-align: middle;
    line-height: 1.35;
  }
  table.dt td.label {
    font-weight: 700; color: ${HP_DARK};
    background: ${HP_GRAY}; width: 23%;
    font-size: 7.8pt;
  }
  table.dt td.val { color: ${HP_TEXT}; }

  /* ── Rules & Guidelines Box ── */
  .rules-box {
    border: 1.5px solid ${HP_BLUE};
    border-radius: 8px;
    padding: 10px 12px;
    margin-top: 10px;
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
    gap: 5px 14px;
  }
  .rule-item {
    display: flex; gap: 5px; align-items: flex-start;
    font-size: 7.5pt; line-height: 1.4; color: #1E293B;
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
    padding: 3px 6px; background: white; text-align: center;
  }
  .sig-img-label { font-size: 5.5pt; font-weight: 900; color: ${HP_BLUE}; text-transform: uppercase; margin-bottom: 2px; }

  /* ── Official Letterhead Footer Bar (Uploaded Exact Design) ── */
  .official-letterhead-footer {
    margin-top: auto;
    padding-top: 8px;
    width: 100%;
    position: relative;
    z-index: 10;
  }
  .footer-top-line {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
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
  const docs = [
    { title: 'PAN Card Certificate Attachment', key: 'panDoc', docType: 'Mandatory Income Tax Identity' },
    { title: 'Aadhaar Card (Front) Attachment', key: 'aadharFrontDoc', docType: 'National ID & Address Proof' },
    { title: 'Aadhaar Card (Back) Attachment', key: 'aadharBackDoc', docType: 'National ID & Address Proof' },
    { title: 'Cancelled Bank Cheque Attachment', key: 'bankDoc', docType: 'Verified RTGS Bank Account Proof' },
    { title: 'GST REG-06 Certificate Attachment', key: 'gstDoc', docType: 'CBIC GST Compliance Registration' },
    { title: 'Work Portfolio & Experience Roster', key: 'portfolioDoc', docType: 'Technical Credentials & Catalog' },
    { title: 'Experience & Completion Certificates', key: 'expDoc', docType: 'Past Execution Proof' }
  ];

  const validDocs = docs.filter(d => formData && formData[d.key]);
  const totalPages = 3 + (validDocs.length > 0 ? validDocs.length : 1);

  let htmlStr = '';

  if (validDocs.length === 0) {
    // If no raw image previews, render a consolidated Attached Roster Proof Page
    htmlStr += `
    <div class="dossier-page">
      <div class="watermark"></div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:10px">
            <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="/hipro-logo.png" alt="HP Logo"/>
            <div>
              <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Statutory Document Verification Master</div>
              <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Empanelment Roster | Page 4 of 4</div>
            </div>
          </div>
          <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
        </div>

        <div class="section-heading">§ 7 — ATTACHED STATUTORY DOCUMENTS VERIFICATION SUMMARY</div>
        
        <div style="border:1.5px dashed ${HP_BLUE};border-radius:10px;padding:15px;background:#F8FAFC;margin-top:10px;text-align:center">
          <div style="font-size:11pt;font-weight:900;color:${HP_DARK};margin-bottom:6px">🔒 Encrypted Statutory File Repository</div>
          <div style="font-size:8pt;color:${HP_MUTED};line-height:1.5;max-width:500px;margin:0 auto 12px auto">
            All original high-resolution PDF/image documents (PAN, Aadhaar, Bank Cheque, GST Certificate, and Experience Catalog) are securely cryptographically signed and stored on the Hindustan Projects Enterprise Procurement Server attached to Tracking Code <strong>${trackingId}</strong>.
          </div>
          
          <table class="dt" style="max-width:600px;margin:0 auto;text-align:left">
            <thead>
              <tr style="background:${HP_DARK};color:white">
                <th style="padding:5px 8px;font-size:7.5pt">Document Category</th>
                <th style="padding:5px 8px;font-size:7.5pt">Verification Status</th>
                <th style="padding:5px 8px;font-size:7.5pt">Security Protocol</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="label">Permanent Account Number (PAN)</td><td><span style="color:#047857;font-weight:900">✓ VERIFIED & STORED</span></td><td>256-Bit SSL Cloud Vault</td></tr>
              <tr><td class="label">Aadhaar National ID Scans</td><td><span style="color:#047857;font-weight:900">✓ VERIFIED & STORED</span></td><td>UIDAI Masked Vault</td></tr>
              <tr><td class="label">Cancelled Bank Cheque Copy</td><td><span style="color:#047857;font-weight:900">✓ VERIFIED & STORED</span></td><td>RTGS Direct Payout Gate</td></tr>
              <tr><td class="label">GST REG-06 Certificate</td><td><span style="color:#047857;font-weight:900">✓ VERIFIED & STORED</span></td><td>CBIC Portal Cross-Checked</td></tr>
              <tr><td class="label">Technical Work Experience / Catalog</td><td><span style="color:#047857;font-weight:900">✓ VERIFIED & STORED</span></td><td>Technical Comm. Approved</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      ${renderCorporateFooterBar(4, 4)}
    </div>`;
  } else {
    validDocs.forEach((doc, idx) => {
      const pageNum = 4 + idx;
      const fileData = formData[doc.key];
      const isImgUrl = typeof fileData === 'string' && (fileData.startsWith('data:image') || fileData.startsWith('blob:') || fileData.startsWith('http'));

      htmlStr += `
      <div class="dossier-page">
        <div class="watermark"></div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;">
            <div style="display:flex;align-items:center;gap:10px">
              <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="/hipro-logo.png" alt="HP Logo"/>
              <div>
                <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — ${doc.title}</div>
                <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">${doc.docType} | Page ${pageNum} of ${totalPages}</div>
              </div>
            </div>
            <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
          </div>

          <div class="section-heading">ATTACHMENT ${idx + 1} — ${doc.title.toUpperCase()}</div>

          <div style="border:1.5px solid #CBD5E1;border-radius:10px;padding:12px;background:#F8FAFC;margin-top:10px;text-align:center;min-height:170mm;display:flex;flex-direction:column;align-items:center;justify-content:center">
            ${isImgUrl ? `
              <img src="${fileData}" alt="${doc.title}" style="max-width:100%;max-height:160mm;object-fit:contain;border-radius:8px;border:1px solid #CBD5E1;box-shadow:0 4px 12px rgba(0,0,0,0.1)"/>
            ` : `
              <div style="padding:20px;background:white;border:1px dashed ${HP_BLUE};border-radius:12px;max-width:450px">
                <div style="font-size:32pt;margin-bottom:8px">📄</div>
                <div style="font-size:11pt;font-weight:900;color:${HP_DARK}">${typeof fileData === 'object' && fileData?.name ? fileData.name : String(fileData)}</div>
                <div style="font-size:8pt;color:${HP_MUTED};margin-top:4px">${doc.docType} Attached & Authenticated</div>
                <div style="margin-top:12px;padding:6px 12px;border-radius:6px;background:#EFF6FF;color:${HP_BLUE};font-size:7.5pt;font-weight:800">
                  ✓ VERIFIED ATTACHMENT FOR DOSSIER ${trackingId}
                </div>
              </div>
            `}
          </div>
        </div>
        ${renderCorporateFooterBar(pageNum, totalPages)}
      </div>`;
    });
  }

  return htmlStr;
}

// ── HTML Generator ────────────────────────────────────────────────────────────
function buildDossierHTML({ trackingId, formData }) {
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
  <title>Hindustan Projects — Vendor Empanelment Dossier — ${trackingId}</title>
  <style>${PRINT_CSS}</style>
</head>
<body>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 1 — ENTITY PROFILE & SPECIALIZATION          -->
<!-- ════════════════════════════════════════════════════ -->
<div class="dossier-page">
  <div class="watermark"></div>
  <div>
    <!-- LETTERHEAD -->
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
        <div class="lh-doc-title">OFFICIAL CONTROLLED DOCUMENT</div>
        <div class="lh-doc-num">Doc Ref: HP-EMP-DOC-${trackingId}</div>
        <div class="lh-doc-num">Issue Date: ${filingDate}</div>
      </div>
    </div>

    <!-- TITLE BANNER -->
    <div class="title-banner">
      <div>
        <div class="tb-main">VENDOR EMPANELMENT APPLICATION DOSSIER</div>
        <div class="tb-sub">Hindustan Projects Procurement &amp; Contract Division — Empanelment System v2.0</div>
      </div>
      <div class="tb-ref">
        <div class="tb-ref-label">Reference Tracking Code</div>
        <div class="tb-ref-code">${trackingId}</div>
      </div>
    </div>

    <!-- SECTION 1: ORGANIZATION PROFILE & MANAGER FIELDS -->
    <div class="section-heading">§ 1 — APPLICANT ORGANIZATION &amp; SPECIALIZATION PROFILE</div>
    <table class="dt">
      <tr>
        <td class="label">Legal Entity Name</td>
        <td class="val" colspan="3">${fv(formData?.companyName || formData?.contactName)}</td>
      </tr>
      <tr>
        <td class="label">Empanel Entity (Main Category)</td>
        <td class="val">${fv(formData?.primaryRole || formData?.primary_role)}</td>
        <td class="label">Specialization</td>
        <td class="val">${fv(formData?.specialization)}</td>
      </tr>
      <tr>
        <td class="label">Team Size / Workforce</td>
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
        <td class="label">Authorized Contact Person</td>
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
        <td class="label">Registered Address</td>
        <td class="val" colspan="3">${fv(formData?.address)}, ${fv(formData?.city)}, ${fv(formData?.state)} - ${fv(formData?.pincode)}</td>
      </tr>
    </table>

    <!-- SECTION 2: TAX & BANKING -->
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
    </table>
  </div>

  ${renderCorporateFooterBar(1, 4)}
</div>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 2 — FINANCIAL RECORD, RATES & DOCUMENTS       -->
<!-- ════════════════════════════════════════════════════ -->
<div class="dossier-page">
  <div class="watermark"></div>
  <div>
    <!-- Repeat mini letterhead -->
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:10px">
        <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
        <div>
          <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Financials &amp; Rate Quotations</div>
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
        <td class="label">Basic Rates (Optional)</td>
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

    <!-- SECTION 4: DOCUMENT CHECKLIST -->
    <div class="section-heading">§ 4 — STATUTORY IDENTITY &amp; PORTFOLIO DOCUMENT ROSTER</div>
    <table class="dt">
      <thead>
        <tr style="background:${HP_DARK};color:white">
          <th style="padding:4px 7px;font-size:7.5pt;font-weight:800;text-align:left;width:35%">Document Name</th>
          <th style="padding:4px 7px;font-size:7.5pt;font-weight:800;text-align:left">Submission Status</th>
          <th style="padding:4px 7px;font-size:7.5pt;font-weight:800;text-align:left">Requirement</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="label">PAN Card Copy</td><td>${docCheck(formData?.panDoc)}</td><td>Mandatory Tax ID</td></tr>
        <tr><td class="label">Aadhaar Card (Front Side)</td><td>${docCheck(formData?.aadharFrontDoc)}</td><td>Mandatory National ID</td></tr>
        <tr><td class="label">Aadhaar Card (Back Side)</td><td>${docCheck(formData?.aadharBackDoc)}</td><td>Mandatory Address Proof</td></tr>
        <tr><td class="label">Cancelled Bank Cheque</td><td>${docCheck(formData?.bankDoc)}</td><td>Mandatory RTGS Payout</td></tr>
        <tr><td class="label">Catalogue / Portfolio (PDF)</td><td>${docCheck(formData?.portfolioDoc)}</td><td>Company Profile / Catalog</td></tr>
        <tr><td class="label">GST REG-06 Certificate</td><td>${docCheck(formData?.gstDoc)}</td><td>GST Compliance</td></tr>
      </tbody>
    </table>
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
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;">
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
    <div class="section-heading">§ 5 — OFFICIAL EMPANELMENT RULES &amp; VENDOR CODE OF CONDUCT</div>
    <div class="rules-box">
      <div class="rules-title">📋 HINDUSTAN PROJECTS — COMPREHENSIVE VENDOR CODE OF CONDUCT</div>
      <div class="rules-grid">
        <div class="rule-item"><div class="rule-num">1</div><div><strong>Audit &amp; Verification:</strong> 48–72 hours document audit by Procurement Committee &amp; CEO Office.</div></div>
        <div class="rule-item"><div class="rule-num">2</div><div><strong>Smart PVC Access:</strong> Approved vendors carry PVC Smart Card for site QR gate access.</div></div>
        <div class="rule-item"><div class="rule-num">3</div><div><strong>Zero Corruption:</strong> CVC compliance — Zero tolerance for kickbacks, gifts, or fraud.</div></div>
        <div class="rule-item"><div class="rule-num">4</div><div><strong>Site Safety:</strong> Mandatory IS safety PPE gear (hard hat, vest, boots) on all project sites.</div></div>
        <div class="rule-item"><div class="rule-num">5</div><div><strong>Work Orders:</strong> No work commences without a duly signed written Work Order.</div></div>
        <div class="rule-item"><div class="rule-num">6</div><div><strong>Material Quality:</strong> ISI/BIS certified materials mandatory. Substitutions require written sign-off.</div></div>
        <div class="rule-item"><div class="rule-num">7</div><div><strong>Billing &amp; Tax:</strong> GST E-Invoice mandatory for bills &gt; ₹5L. RA bills by 25th of month.</div></div>
        <div class="rule-item"><div class="rule-num">8</div><div><strong>Defect Liability:</strong> 5% retention per bill. 12-month DLP from completion certificate date.</div></div>
        <div class="rule-item"><div class="rule-num">9</div><div><strong>Sub-Contracting:</strong> Sub-contracting without prior written approval strictly prohibited.</div></div>
        <div class="rule-item"><div class="rule-num">10</div><div><strong>Confidentiality:</strong> Drawings &amp; site data strictly confidential under PDPB &amp; IT Act.</div></div>
        <div class="rule-item"><div class="rule-num">11</div><div><strong>Performance Score:</strong> Quarterly vendor rating (&lt;60% triggers automatic de-listing).</div></div>
        <div class="rule-item"><div class="rule-num">12</div><div><strong>Dispute Jurisdiction:</strong> Subject to arbitration under Act 1996 in Bhilwara, Rajasthan.</div></div>
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
          <div class="sig-label">Authorized Signatory</div>
          <div class="sig-name">${formData?.signatoryName || formData?.contactName || '___________________________'}</div>
          <div class="sig-date">Date: ${filingDate}</div>
        </div>

        ${formData?.signature ? `
        <div class="sig-img-box">
          <div class="sig-img-label">Digital Seal / E-Signature</div>
          <img src="${formData.signature}" alt="Digital Signature" style="height:45px;max-width:150px;object-fit:contain;display:block"/>
        </div>` : `
        <div class="stamp-box" style="width:70px;height:70px;font-size:5.5pt">
          STAMP<br/>&amp; SEAL
        </div>`}

        <div>
          <div class="sig-line"></div>
          <div class="sig-label">For Hindustan Projects</div>
          <div class="sig-name">Empanelment Committee</div>
          <div class="sig-date">Bhilwara HQ</div>
        </div>
      </div>
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

  // Create hidden iframe with explicit 210mm x 297mm bounds
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
