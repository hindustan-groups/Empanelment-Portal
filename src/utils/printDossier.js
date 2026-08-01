/**
 * ═══════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — OFFICIAL VENDOR EMPANELMENT DOSSIER PRINTER
 * Generates a pixel-perfect, professional A4 letterhead print document
 * in an isolated iframe — zero modal/dark background interference.
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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=IM+Fell+English:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    font-size: 9.5pt;
    color: ${HP_TEXT};
    background: #FFFFFF;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  /* ── Page Setup ── */
  @page {
    size: A4 portrait;
    margin: 14mm 15mm 16mm 15mm;
  }

  @media print {
    body { margin: 0; }
    .page-break { page-break-before: always; break-before: always; }
    .no-page-break { page-break-inside: avoid; break-inside: avoid; }
  }

  /* ── Watermark ── */
  .watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    height: 280px;
    opacity: 0.045;
    pointer-events: none;
    z-index: 0;
    background: url('/hipro-watermark-seal.jpg') center/contain no-repeat;
  }

  /* ── Letterhead ── */
  .letterhead {
    width: 100%;
    border-bottom: 3px double ${HP_BLUE};
    padding-bottom: 10px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .lh-left { display: flex; align-items: center; gap: 14px; }
  .lh-logo {
    width: 52px; height: 52px; object-fit: contain;
    border-radius: 8px; border: 1.5px solid ${HP_BLUE};
    padding: 3px; background: white;
  }
  .lh-company-name {
    font-size: 18pt; font-weight: 900; color: ${HP_DARK};
    letter-spacing: -0.3px; line-height: 1.1;
  }
  .lh-company-tag {
    font-size: 7pt; font-weight: 700; color: ${HP_BLUE};
    text-transform: uppercase; letter-spacing: 0.09em; margin-top: 2px;
  }
  .lh-company-addr {
    font-size: 7.5pt; color: ${HP_MUTED}; font-weight: 500; margin-top: 3px;
  }
  .lh-right { text-align: right; }
  .lh-doc-title {
    font-size: 8pt; font-weight: 900; color: ${HP_RED};
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .lh-doc-num {
    font-size: 7.5pt; color: ${HP_MUTED}; margin-top: 3px; font-weight: 600;
  }

  /* ── Title Banner ── */
  .title-banner {
    background: ${HP_DARK};
    color: white;
    padding: 9px 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; z-index: 1;
  }
  .tb-main { font-size: 11pt; font-weight: 900; letter-spacing: 0.04em; }
  .tb-sub  { font-size: 7.5pt; color: #94A3B8; font-weight: 600; margin-top: 2px; }
  .tb-ref  { text-align: right; }
  .tb-ref-label { font-size: 6.5pt; color: #60A5FA; text-transform: uppercase; letter-spacing: 0.07em; }
  .tb-ref-code  { font-size: 13pt; font-weight: 900; font-family: 'Courier New', monospace; letter-spacing: 2px; color: white; margin-top: 1px; }
  .status-pill {
    display: inline-block; padding: 2px 8px; border-radius: 99px;
    background: rgba(16,185,129,0.18); color: #10B981;
    font-size: 6.5pt; font-weight: 900; border: 1px solid rgba(16,185,129,0.35);
    margin-top: 4px; text-transform: uppercase;
  }

  /* ── Section Heading ── */
  .section-heading {
    font-size: 8.5pt; font-weight: 900; color: ${HP_BLUE};
    text-transform: uppercase; letter-spacing: 0.05em;
    padding: 5px 10px; background: #EFF6FF;
    border-left: 4px solid ${HP_BLUE}; border-radius: 0 6px 6px 0;
    margin-bottom: 6px; margin-top: 14px;
    position: relative; z-index: 1;
  }

  /* ── Data Table ── */
  table.dt {
    width: 100%; border-collapse: collapse;
    margin-bottom: 8px; font-size: 9pt;
    position: relative; z-index: 1;
  }
  table.dt td {
    border: 1px solid #CBD5E1;
    padding: 5px 8px;
    vertical-align: middle;
    line-height: 1.4;
  }
  table.dt td.label {
    font-weight: 700; color: ${HP_DARK};
    background: ${HP_GRAY}; width: 22%;
    font-size: 8pt;
  }
  table.dt td.val { color: ${HP_TEXT}; }

  /* ── Rules & Guidelines Box ── */
  .rules-box {
    border: 1.5px solid ${HP_BLUE};
    border-radius: 8px;
    padding: 12px 14px;
    margin-top: 14px;
    background: #F0F6FF;
    position: relative; z-index: 1;
    page-break-inside: avoid;
  }
  .rules-title {
    font-size: 9pt; font-weight: 900; color: ${HP_DARK};
    text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
  }
  .rules-title-icon { color: ${HP_BLUE}; }
  .rules-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 6px 16px;
  }
  .rule-item {
    display: flex; gap: 6px; align-items: flex-start;
    font-size: 8pt; line-height: 1.45; color: #1E293B;
  }
  .rule-num {
    min-width: 16px; height: 16px; border-radius: 50%;
    background: ${HP_BLUE}; color: white;
    font-size: 6.5pt; font-weight: 900; display: flex;
    align-items: center; justify-content: center;
    margin-top: 1px; flex-shrink: 0;
  }

  /* ── Declaration & Signature Block ── */
  .declaration-box {
    border: 1.5px solid #CBD5E1; border-radius: 8px;
    padding: 11px 14px; margin-top: 10px;
    background: #FFFBEB; page-break-inside: avoid;
    position: relative; z-index: 1;
  }
  .decl-title {
    font-size: 8.5pt; font-weight: 900; color: ${HP_DARK};
    text-transform: uppercase; margin-bottom: 6px;
  }
  .decl-text {
    font-size: 8pt; color: #334155; line-height: 1.55;
    font-style: italic;
  }
  .sig-row {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-top: 16px;
    border-top: 1px dashed #CBD5E1; padding-top: 10px;
  }
  .sig-block { text-align: center; }
  .sig-line { border-top: 1.5px solid ${HP_DARK}; width: 140px; margin-bottom: 3px; }
  .sig-label { font-size: 7pt; font-weight: 700; color: ${HP_MUTED}; text-transform: uppercase; }
  .sig-name  { font-size: 8pt; font-weight: 900; color: ${HP_DARK}; margin-top: 2px; }
  .sig-date  { font-size: 7.5pt; color: ${HP_MUTED}; }
  .sig-img-box {
    border: 1px solid #CBD5E1; border-radius: 6px;
    padding: 4px 8px; background: white; text-align: center;
  }
  .sig-img-label { font-size: 6pt; font-weight: 900; color: ${HP_BLUE}; text-transform: uppercase; margin-bottom: 2px; }

  /* ── Official Stamp Box ── */
  .stamp-box {
    width: 90px; height: 90px; border-radius: 50%;
    border: 2.5px dashed ${HP_BLUE}; display: flex;
    flex-direction: column; align-items: center; justify-content: center;
    text-align: center; color: ${HP_BLUE};
    font-size: 6pt; font-weight: 900; text-transform: uppercase;
    letter-spacing: 0.04em; line-height: 1.3;
  }

  /* ── Footer ── */
  .page-footer {
    border-top: 1.5px solid ${HP_BLUE};
    padding-top: 6px; margin-top: 14px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 7pt; color: ${HP_MUTED};
    position: relative; z-index: 1;
  }
  .footer-conf {
    font-size: 6.5pt; font-weight: 700; color: ${HP_RED};
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  /* ── CVC / Policy Strip ── */
  .policy-strip {
    background: #0F172A; color: white;
    padding: 6px 12px; border-radius: 6px;
    font-size: 7.5pt; font-weight: 700; text-align: center;
    margin-top: 8px; letter-spacing: 0.02em;
    position: relative; z-index: 1;
  }
  .policy-strip span { color: #FCD34D; }

  /* ── Checklist Row ── */
  .chk-table { width: 100%; border-collapse: collapse; }
  .chk-table td { border: 1px solid #CBD5E1; padding: 5px 9px; font-size: 8.5pt; vertical-align: middle; }
  .chk-table td.chk-label { font-weight: 700; background: ${HP_GRAY}; width: 35%; }

  /* ── Financial Highlight Row ── */
  .fin-highlight {
    background: linear-gradient(90deg, #EFF6FF 0%, #F0FDF4 100%);
    border-radius: 8px; padding: 8px 12px;
    display: flex; gap: 16px; flex-wrap: wrap;
    margin-bottom: 8px; position: relative; z-index: 1;
  }
  .fin-item { flex: 1; min-width: 100px; }
  .fin-item-label { font-size: 6.5pt; font-weight: 700; color: ${HP_MUTED}; text-transform: uppercase; letter-spacing: 0.05em; }
  .fin-item-val { font-size: 11pt; font-weight: 900; color: ${HP_BLUE}; margin-top: 1px; }
  .fin-item-sub  { font-size: 7pt; color: ${HP_MUTED}; }

  /* ── Payment Schedule Table ── */
  .pay-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
  .pay-table th { background: ${HP_DARK}; color: white; padding: 5px 9px; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
  .pay-table td { border: 1px solid #CBD5E1; padding: 5px 9px; }
  .pay-table td.center { text-align: center; }
  .pay-table tr:nth-child(even) td { background: ${HP_GRAY}; }
`;

// ── HTML Generator ────────────────────────────────────────────────────────────
function buildDossierHTML({ trackingId, formData }) {
  const filingDate = fmtDate(formData?.submitted_at);
  const todayDate  = fmtDate(new Date());
  const entityType = (formData?.entityType || 'sole_proprietor').replace(/_/g, ' ').toUpperCase();
  const logoSrc    = '/hipro-logo.jpg';

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
<div class="watermark"></div>

<!-- ════════════════════════════════════════════════════ -->
<!--  PAGE 1 — OFFICIAL LETTERHEAD + APPLICATION COVER  -->
<!-- ════════════════════════════════════════════════════ -->

<!-- LETTERHEAD -->
<div class="letterhead">
  <div class="lh-left">
    <img class="lh-logo" src="${logoSrc}" alt="Hindustan Projects Logo"/>
    <div>
      <div class="lh-company-name">Hindustan Projects</div>
      <div class="lh-company-tag">Engineering &amp; Construction | Infrastructure | Empanelment Portal</div>
      <div class="lh-company-addr">
        Corporate Office: Bhopal Ganj, Bhilwara - 311001, Rajasthan, India &nbsp;|&nbsp; empanelment@hindustanprojects.in &nbsp;|&nbsp; +91 7597000601
      </div>
    </div>
  </div>
  <div class="lh-right">
    <div class="lh-doc-title">OFFICIAL CONTROLLED DOCUMENT</div>
    <div class="lh-doc-num">Doc Ref: HP-EMP-DOC-${trackingId}</div>
    <div class="lh-doc-num">Issue Date: ${filingDate}</div>
    <div class="lh-doc-num" style="color:${HP_BLUE};font-weight:800">FOR OFFICIAL USE ONLY</div>
  </div>
</div>

<!-- TITLE BANNER -->
<div class="title-banner">
  <div>
    <div class="tb-main">VENDOR EMPANELMENT APPLICATION DOSSIER</div>
    <div class="tb-sub">Hindustan Projects Procurement &amp; Contract Division — Empanelment Management System v2.0</div>
  </div>
  <div class="tb-ref">
    <div class="tb-ref-label">Reference Tracking Code</div>
    <div class="tb-ref-code">${trackingId}</div>
    <div class="status-pill">⏳ UNDER VERIFICATION</div>
  </div>
</div>

<!-- SECTION 1: ORGANIZATION PROFILE -->
<div class="section-heading">§ 1 — APPLICANT ORGANIZATION &amp; DISCIPLINE SCOPE</div>
<table class="dt">
  <tr>
    <td class="label">Legal Entity Name</td>
    <td class="val" colspan="3">${fv(formData?.companyName || formData?.contactName)}</td>
  </tr>
  <tr>
    <td class="label">Entity Classification</td>
    <td class="val">${fv(entityType)}</td>
    <td class="label">Primary Discipline</td>
    <td class="val">${fv(formData?.primaryRole)}</td>
  </tr>
  <tr>
    <td class="label">Empanelment Category</td>
    <td class="val">${fv(formData?.category)}</td>
    <td class="label">NBC Sub-Category Code</td>
    <td class="val">${fv(formData?.nbcSubCategory)}</td>
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
    <td class="label">Registered City &amp; State</td>
    <td class="val">${fv(formData?.city)}, ${fv(formData?.state)} — ${fv(formData?.pincode)}</td>
    <td class="label">Contract Category</td>
    <td class="val">${fv(formData?.contractType ? formData.contractType.replace(/_/g,' ').toUpperCase() : null)}</td>
  </tr>
  <tr>
    <td class="label">Full Business Address</td>
    <td class="val" colspan="3">${fv(formData?.address)}</td>
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

<!-- FOOTER PAGE 1 -->
<div class="page-footer">
  <div>
    <strong>Hindustan Projects</strong> — Vendor Empanelment Dossier &nbsp;|&nbsp; Ref: HP-EMP-DOC-${trackingId}
  </div>
  <div class="footer-conf">🔒 CONFIDENTIAL — For Internal Use Only</div>
  <div>Page <strong>1</strong> of <strong>4</strong> &nbsp;|&nbsp; Generated: ${todayDate}</div>
</div>

<!-- ════════════════════════════════════════════════ -->
<!--  PAGE 2 — FINANCIAL RECORD & WORK EXPERIENCE   -->
<!-- ════════════════════════════════════════════════ -->
<div class="page-break"></div>

<!-- Repeat mini letterhead on continuation pages -->
<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;position:relative;z-index:1">
  <div style="display:flex;align-items:center;gap:10px">
    <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
    <div>
      <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects</div>
      <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Engineering &amp; Construction | Empanelment Division</div>
    </div>
  </div>
  <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">
    Ref: HP-EMP-DOC-${trackingId} &nbsp;|&nbsp; ${fv(formData?.companyName || formData?.contactName)}
  </div>
</div>

<!-- SECTION 3: FINANCIAL TURNOVERS -->
<div class="section-heading">§ 3 — FINANCIAL TURNOVER RECORD (AUDITED, IN ₹ LAKHS)</div>

<div class="fin-highlight">
  <div class="fin-item">
    <div class="fin-item-label">FY 2023–24 Turnover</div>
    <div class="fin-item-val">₹ ${t23 !== '—' ? t23 : '—'} L</div>
    <div class="fin-item-sub">As per audited P&amp;L Statement</div>
  </div>
  <div class="fin-item">
    <div class="fin-item-label">FY 2024–25 Turnover</div>
    <div class="fin-item-val">₹ ${t24 !== '—' ? t24 : '—'} L</div>
    <div class="fin-item-sub">As per audited P&amp;L Statement</div>
  </div>
  <div class="fin-item">
    <div class="fin-item-label">FY 2025–26 Turnover</div>
    <div class="fin-item-val">₹ ${t25 !== '—' ? t25 : '—'} L</div>
    <div class="fin-item-sub">Provisional / Estimated</div>
  </div>
  <div class="fin-item">
    <div class="fin-item-label">Largest Work Order</div>
    <div class="fin-item-val">₹ ${formData?.largestOrder || formData?.workOrderValue || '—'} L</div>
    <div class="fin-item-sub">Single project value</div>
  </div>
</div>

<table class="dt">
  <tr>
    <td class="label">Work Order Reference No.</td>
    <td class="val">${fv(formData?.workOrderRef)}</td>
    <td class="label">Issuing Organization</td>
    <td class="val">${fv(formData?.workOrderClient || formData?.clientName)}</td>
  </tr>
  <tr>
    <td class="label">Project Location / Site</td>
    <td class="val">${fv(formData?.projectLocation || formData?.city)}</td>
    <td class="label">Year of Completion</td>
    <td class="val">${fv(formData?.completionYear)}</td>
  </tr>
  <tr>
    <td class="label">Number of Employees</td>
    <td class="val">${fv(formData?.employeeCount)}</td>
    <td class="label">ISO / Quality Certification</td>
    <td class="val">${fv(formData?.iso || formData?.certification)}</td>
  </tr>
  <tr>
    <td class="label">Year of Establishment</td>
    <td class="val">${fv(formData?.yearEst)}</td>
    <td class="label">Website / Online Presence</td>
    <td class="val">${fv(formData?.website)}</td>
  </tr>
</table>

<!-- SECTION 4: MILESTONE PAYMENT SCHEDULE -->
<div class="section-heading">§ 4 — HINDUSTAN PROJECTS — STANDARD MILESTONE PAYMENT RELEASE SCHEDULE</div>
<table class="pay-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Milestone</th>
      <th>% Release</th>
      <th>Condition / Trigger</th>
      <th>Mode</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="center"><strong>M-1</strong></td>
      <td><strong>Mobilization / Work Order Acceptance</strong></td>
      <td class="center" style="color:${HP_BLUE};font-weight:800">30%</td>
      <td>Signed WO + Bank Guarantee submitted</td>
      <td class="center">NEFT/RTGS</td>
    </tr>
    <tr>
      <td class="center"><strong>M-2</strong></td>
      <td><strong>GFC Drawings Release / Concept Approval</strong></td>
      <td class="center" style="color:${HP_BLUE};font-weight:800">40%</td>
      <td>Site measurement approval + drawing sign-off</td>
      <td class="center">NEFT/RTGS</td>
    </tr>
    <tr>
      <td class="center"><strong>M-3</strong></td>
      <td><strong>Site Quality Inspection Clearance</strong></td>
      <td class="center" style="color:${HP_BLUE};font-weight:800">20%</td>
      <td>QA/QC punch list cleared + PMC sign-off</td>
      <td class="center">NEFT/RTGS</td>
    </tr>
    <tr>
      <td class="center"><strong>M-4</strong></td>
      <td><strong>Defect Liability Period Release</strong></td>
      <td class="center" style="color:#047857;font-weight:800">10%</td>
      <td>12-month DLP elapsed + clearance certificate</td>
      <td class="center">NEFT/RTGS</td>
    </tr>
  </tbody>
</table>

<!-- POLICY STRIP -->
<div class="policy-strip">
  📋 GST TDS @ <span>2%</span> (Sec. 194C) &nbsp;|&nbsp; TDS on GST @ <span>2%</span> (Sec. 51 CGST Act) &nbsp;|&nbsp;
  Retention @ <span>5%</span> per RA Bill &nbsp;|&nbsp; SD Bond: <span>2.5% of Contract Value</span> &nbsp;|&nbsp;
  Defect Liability Period: <span>12 Months</span> from Completion
</div>

<!-- FOOTER PAGE 2 -->
<div class="page-footer">
  <div><strong>Hindustan Projects</strong> — Financial Record &amp; Payment Schedule</div>
  <div class="footer-conf">🔒 CONFIDENTIAL — For Internal Use Only</div>
  <div>Page <strong>2</strong> of <strong>4</strong> &nbsp;|&nbsp; Ref: HP-EMP-DOC-${trackingId}</div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!--  PAGE 3 — DOCUMENT AUDIT ROSTER & COMPLIANCE      -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="page-break"></div>

<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;position:relative;z-index:1">
  <div style="display:flex;align-items:center;gap:10px">
    <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
    <div>
      <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Document Audit Roster</div>
      <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Empanelment Division | Checklist Reference</div>
    </div>
  </div>
  <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
</div>

<!-- SECTION 5: DOCUMENT CHECKLIST -->
<div class="section-heading">§ 5 — STATUTORY IDENTITY &amp; DOCUMENT SUBMISSION AUDIT ROSTER</div>
<table class="chk-table">
  <thead>
    <tr style="background:${HP_DARK};color:white">
      <th style="padding:5px 9px;font-size:7.5pt;font-weight:800;text-align:left">Sr.</th>
      <th style="padding:5px 9px;font-size:7.5pt;font-weight:800;text-align:left;width:40%">Document Name</th>
      <th style="padding:5px 9px;font-size:7.5pt;font-weight:800;text-align:left">Submission Status</th>
      <th style="padding:5px 9px;font-size:7.5pt;font-weight:800;text-align:left">Mandatory</th>
      <th style="padding:5px 9px;font-size:7.5pt;font-weight:800;text-align:left">Verified By</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ['PAN Card Copy (Self-Attested)', formData?.panDoc, 'Yes'],
      ['Aadhaar Card — Front Side', formData?.aadharFrontDoc, 'Yes'],
      ['Aadhaar Card — Back Side', formData?.aadharBackDoc, 'Yes'],
      ['Cancelled Cheque / Bank Passbook', formData?.bankDoc, 'Yes'],
      ['GST REG-06 Registration Certificate', formData?.gstDoc, 'Conditional'],
      ['MSME / Udyam Registration Certificate', formData?.msmeDoc, 'Conditional'],
      ['Work Portfolio / CAD Renders / Completion Certificate', formData?.expDoc, 'Yes'],
      ['ISO / Quality Certification (if any)', formData?.isoDoc, 'Optional'],
    ].map(([name, val, req], i) => `
      <tr>
        <td style="text-align:center;font-weight:700;background:${HP_GRAY}">${i+1}</td>
        <td style="font-weight:600">${name}</td>
        <td>${docCheck(val)}</td>
        <td style="text-align:center;font-size:7.5pt;font-weight:700;color:${req==='Yes'?HP_RED:req==='Conditional'?'#D97706':'#64748B'}">${req}</td>
        <td style="font-size:7.5pt;color:${HP_MUTED}">Pending Review</td>
      </tr>
    `).join('')}
  </tbody>
</table>

<!-- SECTION 6: COMPLIANCE & QUALITY STANDARDS -->
<div class="section-heading">§ 6 — COMPLIANCE, QUALITY STANDARDS &amp; CODE OF CONDUCT</div>
<table class="dt">
  <tr>
    <td class="label">NBC / BIS Standard</td>
    <td class="val">National Building Code (NBC) 2016, IS 456:2000, IS 1893:2016 Seismic Zone compliance mandatory</td>
    <td class="label">Safety Code</td>
    <td class="val">IS 4130, Factories Act 1948, BOCW Act 1996 — Mandatory PPE &amp; Site Safety Protocol</td>
  </tr>
  <tr>
    <td class="label">Quality Assurance</td>
    <td class="val">ISO 9001:2015 Quality Management System preferred. Third-party inspection at milestones M-2 and M-3</td>
    <td class="label">Environmental</td>
    <td class="val">Environment Protection Act 1986, Waste Mgmt. Rules 2016 — Zero illegal dumping policy</td>
  </tr>
  <tr>
    <td class="label">CVC Anti-Corruption</td>
    <td class="val">Central Vigilance Commission (CVC) Circular No. 98/DSP/9 — Zero tolerance for kickbacks / gifts</td>
    <td class="label">GST &amp; Tax</td>
    <td class="val">Monthly GST filing (GSTR-1 &amp; GSTR-3B) mandatory. TDS deduction as per IT Act Section 194C</td>
  </tr>
  <tr>
    <td class="label">Labour Laws</td>
    <td class="val">Minimum Wages Act, ESIC / EPF contributions mandatory for workforce &gt; 20 employees</td>
    <td class="label">Insurance</td>
    <td class="val">Contractor All Risk (CAR) Insurance + Workmen Compensation (WC) Policy mandatory per contract</td>
  </tr>
</table>

<!-- FOOTER PAGE 3 -->
<div class="page-footer">
  <div><strong>Hindustan Projects</strong> — Document Roster &amp; Compliance Standards</div>
  <div class="footer-conf">🔒 CONFIDENTIAL — For Internal Use Only</div>
  <div>Page <strong>3</strong> of <strong>4</strong> &nbsp;|&nbsp; Ref: HP-EMP-DOC-${trackingId}</div>
</div>

<!-- ════════════════════════════════════════════════ -->
<!--  PAGE 4 — RULES, GUIDELINES & UNDERTAKING      -->
<!-- ════════════════════════════════════════════════ -->
<div class="page-break"></div>

<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid ${HP_BLUE};padding-bottom:6px;margin-bottom:10px;position:relative;z-index:1">
  <div style="display:flex;align-items:center;gap:10px">
    <img style="width:32px;height:32px;object-fit:contain;border-radius:5px;border:1px solid ${HP_BLUE}" src="${logoSrc}" alt="HP Logo"/>
    <div>
      <div style="font-size:10pt;font-weight:900;color:${HP_DARK}">Hindustan Projects — Rules, Guidelines &amp; Undertaking</div>
      <div style="font-size:6.5pt;color:${HP_MUTED};font-weight:600">Empanelment Policy v2.0 | Procurement Division</div>
    </div>
  </div>
  <div style="text-align:right;font-size:7.5pt;color:${HP_MUTED}">Ref: HP-EMP-DOC-${trackingId}</div>
</div>

<!-- SECTION 7: RULES & GUIDELINES -->
<div class="section-heading">§ 7 — OFFICIAL EMPANELMENT RULES &amp; VENDOR GUIDELINES</div>
<div class="rules-box">
  <div class="rules-title"><span class="rules-title-icon">📋</span> HINDUSTAN PROJECTS — VENDOR CODE OF CONDUCT &amp; EMPANELMENT POLICY</div>
  <div class="rules-grid">
    <div class="rule-item"><div class="rule-num">1</div><div><strong>Empanelment Period:</strong> Valid for 2 years from date of approval. Annual performance review mandatory for renewal.</div></div>
    <div class="rule-item"><div class="rule-num">2</div><div><strong>Work Order Mandate:</strong> No work shall commence without a duly signed Work Order. Verbal instructions carry no contractual weight.</div></div>
    <div class="rule-item"><div class="rule-num">3</div><div><strong>Site Compliance:</strong> All site personnel must carry valid HPro Smart ID Card. Unauthorized personnel strictly prohibited.</div></div>
    <div class="rule-item"><div class="rule-num">4</div><div><strong>Material Quality:</strong> Only ISI/BIS marked materials shall be used. Substitution requires prior written approval from Site Engineer.</div></div>
    <div class="rule-item"><div class="rule-num">5</div><div><strong>Drawing Authority:</strong> Only GFC (Good-For-Construction) drawings approved by HPro PMC shall be followed on site.</div></div>
    <div class="rule-item"><div class="rule-num">6</div><div><strong>Sub-contracting:</strong> Sub-contracting without prior written approval is strictly prohibited and may result in blacklisting.</div></div>
    <div class="rule-item"><div class="rule-num">7</div><div><strong>Billing Cycle:</strong> Running Account (RA) bills submitted by 25th of every month. Late submissions deferred to next cycle.</div></div>
    <div class="rule-item"><div class="rule-num">8</div><div><strong>Invoice Format:</strong> GST-compliant E-Invoice (IRN) mandatory for all bills above ₹ 5 Lakhs. Pre-GST invoices rejected.</div></div>
    <div class="rule-item"><div class="rule-num">9</div><div><strong>Defect Liability:</strong> 12-month DLP from last completion certificate. Rectification within 7 days of snag notice.</div></div>
    <div class="rule-item"><div class="rule-num">10</div><div><strong>Bank Guarantee:</strong> 2.5% SD as Bank Guarantee from a scheduled commercial bank valid 6 months beyond DLP.</div></div>
    <div class="rule-item"><div class="rule-num">11</div><div><strong>Dispute Resolution:</strong> All disputes subject to arbitration under Arbitration &amp; Conciliation Act 1996. Jurisdiction: Bhilwara, Rajasthan.</div></div>
    <div class="rule-item"><div class="rule-num">12</div><div><strong>Anti-Bribery:</strong> Any form of gift, kickback, or corrupt practice to HPro personnel shall lead to immediate blacklisting &amp; FIR.</div></div>
    <div class="rule-item"><div class="rule-num">13</div><div><strong>Confidentiality:</strong> All project drawings, documents, and data are strictly confidential. NDA violations attract civil &amp; criminal liability.</div></div>
    <div class="rule-item"><div class="rule-num">14</div><div><strong>Performance Score:</strong> Each vendor rated quarterly (Quality 40% | Delivery 30% | Safety 20% | Admin 10%). &lt;60% triggers de-listing.</div></div>
    <div class="rule-item"><div class="rule-num">15</div><div><strong>Safety PPE:</strong> Hard hat, high-vis vest, safety boots mandatory on all HPro project sites. Violation = ₹500 fine per instance.</div></div>
    <div class="rule-item"><div class="rule-num">16</div><div><strong>Data Privacy:</strong> Vendor data stored as per IT Act 2000 &amp; PDPB 2023. Not shared with third parties without consent.</div></div>
  </div>
</div>

<!-- SECTION 8: FORMAL UNDERTAKING DECLARATION -->
<div class="section-heading">§ 8 — FORMAL UNDERTAKING, DECLARATION &amp; DIGITAL AUTHORIZATION</div>
<div class="declaration-box">
  <div class="decl-title">SOLEMN DECLARATION BY AUTHORIZED SIGNATORY</div>
  <div class="decl-text">
    I / We, <strong>${formData?.contactName || '_______________'}</strong>, authorized representative of
    <strong>${formData?.companyName || formData?.contactName || '_______________'}</strong>,
    do hereby solemnly declare and affirm that:
    <br/><br/>
    (a) All information furnished in this Vendor Empanelment Application Dossier is true, correct, and complete to the best of my/our knowledge and belief.
    (b) No material fact has been concealed or misrepresented. I/We understand that any misrepresentation shall render this application null and void and may attract legal action.
    (c) I/We agree to abide by all the Rules, Guidelines, Code of Conduct, Compliance Standards, and Policy requirements of Hindustan Projects as set out in Section 7 above.
    (d) I/We confirm that our organization is not blacklisted by any Government department, PSU, or private organization, and no criminal proceedings are pending against the entity or its principals.
    (e) I/We authorize Hindustan Projects to conduct background verification, reference checks, and site audits at any time during the empanelment period.
  </div>

  <div class="sig-row">
    <div>
      <div class="sig-line"></div>
      <div class="sig-label">Authorized Signatory</div>
      <div class="sig-name">${formData?.signatoryName || formData?.contactName || '___________________________'}</div>
      <div class="sig-date">Designation: ${formData?.designation || '___________________'}</div>
      <div class="sig-date">Place: ${formData?.signatoryPlace || formData?.city || 'New Delhi'} &nbsp;|&nbsp; Date: ${filingDate}</div>
    </div>

    ${formData?.signature ? `
    <div class="sig-img-box">
      <div class="sig-img-label">Digital Seal / E-Signature</div>
      <img src="${formData.signature}" alt="Digital Signature" style="height:50px;max-width:160px;object-fit:contain;display:block"/>
    </div>` : `
    <div class="stamp-box">
      COMPANY<br/>SEAL &amp;<br/>STAMP<br/>HERE
    </div>`}

    <div>
      <div class="sig-line"></div>
      <div class="sig-label">For Hindustan Projects</div>
      <div class="sig-name">Authorized Processing Officer</div>
      <div class="sig-date">Empanelment Management Division</div>
      <div class="sig-date">Date: ___________________</div>
    </div>
  </div>
</div>

<!-- FINAL POLICY NOTICE -->
<div style="margin-top:10px;padding:8px 12px;border-radius:6px;background:#FEF2F2;border:1.5px solid ${HP_RED};font-size:7.5pt;color:#7F1D1D;font-weight:700;text-align:center;position:relative;z-index:1">
  ⚠️ IMPORTANT: This dossier is system-generated and is valid only when countersigned by an authorized officer of Hindustan Projects.
  This document does NOT constitute a confirmed empanelment until formal approval letter is issued.
  Tracking Code: <strong style="font-family:monospace;font-size:9pt;color:${HP_RED}">${trackingId}</strong>
</div>

<!-- FOOTER PAGE 4 -->
<div class="page-footer">
  <div>
    <strong>Hindustan Projects</strong> — Rules, Guidelines &amp; Undertaking Page &nbsp;|&nbsp;
    © ${new Date().getFullYear()} Hindustan Projects. All rights reserved.
  </div>
  <div class="footer-conf">🔒 STRICTLY CONFIDENTIAL DOCUMENT</div>
  <div>Page <strong>4</strong> of <strong>4</strong> &nbsp;|&nbsp; Ref: HP-EMP-DOC-${trackingId}</div>
</div>

</body>
</html>`;
}

// ── Main Export: printDossier(trackingId, formData) ───────────────────────────
export function printDossier(trackingId, formData) {
  const html = buildDossierHTML({ trackingId, formData });

  // Create hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;visibility:hidden';
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
      setTimeout(() => document.body.removeChild(iframe), 2000);
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
    }, 2000);
  }, 1800);
}
