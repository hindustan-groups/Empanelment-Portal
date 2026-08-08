/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — OFFICIAL EMAIL TEMPLATES
 * Corporate letterhead format for all vendor communication
 * ════════════════════════════════════════════════════════════════
 */

// Auto-restart Node server when required fresh
setTimeout(() => process.exit(0), 100);

// ─── SHARED HEADER / FOOTER ─────────────────────────────────────

const emailHeader = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hindustan Projects — Official Communication</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:30px 0;">
  <tr><td align="center">
  <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

    <!-- CORPORATE LETTERHEAD HEADER -->
    <tr>
      <td style="background:linear-gradient(135deg,#0a1628 0%,#1a3a6b 60%,#c8102e 100%);padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:28px 36px 20px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:9px;color:#aab4c8;letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">GOVERNMENT EMPANELLED CONTRACTOR</div>
                    <div style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:1px;line-height:1.1;">HINDUSTAN PROJECTS</div>
                    <div style="font-size:11px;color:#c8d4e8;margin-top:4px;letter-spacing:0.5px;">Infrastructure • Construction • Development</div>
                  </td>
                  <td align="right" valign="top">
                    <div style="background:rgba(200,16,46,0.25);border:1.5px solid rgba(200,16,46,0.6);border-radius:6px;padding:8px 14px;display:inline-block;">
                      <div style="font-size:9px;color:#f0b8c0;letter-spacing:2px;text-transform:uppercase;">OFFICIAL</div>
                      <div style="font-size:9px;color:#f0b8c0;letter-spacing:2px;text-transform:uppercase;">COMMUNICATION</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- RED STRIPE BAR -->
          <tr>
            <td style="background:#c8102e;height:4px;padding:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:10px 36px 16px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:10px;color:#c8d4e8;">
                    📍 Bhilwara – 311001, Rajasthan, India
                  </td>
                  <td align="right" style="font-size:10px;color:#c8d4e8;">
                    📞 +91 75970 00601 &nbsp;|&nbsp; 🌐 hindustanprojects.in
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;

const PORTAL_URL = process.env.PORTAL_BASE_URL || 'https://empanelment.hindustanprojects.in';

const emailFooter = () => `
    <!-- CORPORATE FOOTER -->
    <tr>
      <td style="background:#0a1628;padding:0;">
        <!-- RED TOP LINE -->
        <div style="background:#c8102e;height:3px;"></div>
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 36px;">
          <tr>
            <td style="font-size:10px;color:#8898aa;line-height:1.8;">
              <strong style="color:#aab4c8;">HINDUSTAN PROJECTS</strong><br/>
              Bhilwara – 311001, Rajasthan, India<br/>
              📞 +91 75970 00601 &nbsp;|&nbsp; ✉️ industrial@hindustanprojects.in<br/>
              🌐 empanelment.hindustanprojects.in
            </td>
            <td align="right" valign="top" style="font-size:9px;color:#4a5568;line-height:1.8;">
              This is an official automated email.<br/>
              Do not reply to this message directly.<br/>
              For queries, contact us at the details on the left.
            </td>
          </tr>
        </table>
        <div style="background:#0d1f3c;padding:10px 36px;">
          <p style="margin:0;font-size:9px;color:#4a5568;text-align:center;">
            © ${new Date().getFullYear()} Hindustan Projects. All rights reserved. &nbsp;|&nbsp; 
            Empanelment Portal — Official Use Only &nbsp;|&nbsp; 
            This email is confidential and intended solely for the named recipient.
          </p>
        </div>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>
`;

// ─── DIVIDER HELPER ──────────────────────────────────────────────
const divider = () => `<tr><td style="padding:0 36px;"><div style="border-top:1px solid #e2e8f0;margin:8px 0;"></div></td></tr>`;

const infoBox = (label, value, icon = '') => `
  <tr>
    <td style="padding:4px 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="38%" style="font-size:12px;color:#64748b;font-weight:600;">${icon} ${label}</td>
          <td style="font-size:12px;color:#1e293b;font-weight:700;">${value}</td>
        </tr>
      </table>
    </td>
  </tr>
`;

// ════════════════════════════════════════════════════════════════
// EMAIL 1: VENDOR SUBMISSION CONFIRMATION
const submissionConfirmationToVendor = (data = {}) => {
  const companyName = data.company_name || data.companyName || 'Applicant Entity';
  const contactName = data.contact_name || data.contactName || 'Authorized Signatory';
  const trackingId = data.tracking_id || data.trackingId || 'HP-EMP-000000';
  const hashSignature = data.hash_signature || data.hashSignature || '8f3a9e120bc741a8d1234';
  const category = data.category || 'General';
  const submittedAt = data.submitted_at || data.submittedAt || new Date().toISOString();

  return {
    subject: `Application Received — Tracking ID: ${trackingId} | Hindustan Projects Empanelment`,
    html: `
${emailHeader()}

    <!-- SUBJECT BANNER -->
    <tr>
      <td style="background:#eef6ff;border-left:4px solid #1a3a6b;padding:16px 36px;margin:0;">
        <div style="font-size:13px;font-weight:700;color:#1a3a6b;letter-spacing:0.5px;">APPLICATION RECEIVED — UNDER REVIEW</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px;">Your empanelment application has been successfully submitted to the committee.</div>
      </td>
    </tr>

    <!-- GREETING -->
    <tr>
      <td style="padding:28px 36px 12px 36px;">
        <p style="margin:0;font-size:15px;color:#1e293b;font-weight:600;">Dear ${contactName},</p>
        <p style="margin:12px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          Thank you for applying for vendor empanelment with <strong>Hindustan Projects</strong>. 
          We have successfully received your application and it has been forwarded to our 
          <strong>Financial & Technical Committee</strong> for review.
        </p>
        <p style="margin:10px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          Please retain your <strong>Empanelment Reference Code</strong> for all future correspondence and status tracking.
        </p>
      </td>
    </tr>

    <!-- TRACKING REFERENCE BOX -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="background:linear-gradient(135deg,#0a1628,#1a3a6b);border-radius:10px;padding:22px 28px;">
          <div style="font-size:10px;color:#8ab4d8;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Your Empanelment Reference Code</div>
          <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:4px;font-family:monospace;">${trackingId}</div>
          <div style="margin-top:12px;font-size:9px;color:#6b8bb0;letter-spacing:1px;word-break:break-all;">
            SHA-256 Digital Seal: ${hashSignature.substring(0, 40)}...
          </div>
        </div>
      </td>
    </tr>

    <!-- APPLICATION DETAILS -->
    <tr>
      <td style="padding:16px 36px 8px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Application Summary</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          ${infoBox('Company / Firm', companyName, '🏢')}
          ${infoBox('Applicant', contactName, '👤')}
          ${infoBox('Category', category || 'General', '📋')}
          ${infoBox('Ref. Document No.', `HP-EMP-DOC-${trackingId}`, '📄')}
          ${infoBox('Filing Date', new Date(submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }), '📅')}
          ${infoBox('Status', 'PENDING COMMITTEE AUDIT ⏳', '🔄')}
        </table>
      </td>
    </tr>

    <!-- NEXT STEPS -->
    <tr>
      <td style="padding:16px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">What Happens Next?</div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#475569;">
              <span style="background:#dbeafe;color:#1d4ed8;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-weight:700;font-size:11px;margin-right:8px;">1</span>
              Your documents will be verified by our <strong>Financial Committee</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#475569;">
              <span style="background:#dbeafe;color:#1d4ed8;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-weight:700;font-size:11px;margin-right:8px;">2</span>
              Our <strong>Technical Committee</strong> will assess capability & compliance.
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#475569;">
              <span style="background:#dbeafe;color:#1d4ed8;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-weight:700;font-size:11px;margin-right:8px;">3</span>
              Final approval will be granted by the <strong>CEO & Management Committee</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#475569;">
              <span style="background:#dcfce7;color:#16a34a;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-weight:700;font-size:11px;margin-right:8px;">4</span>
              Upon approval, you will receive <strong>login credentials</strong> via email to access your Vendor Dashboard.
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- TRACK STATUS CTA -->
    <tr>
      <td style="padding:12px 36px 28px 36px;text-align:center;">
        <a href="https://empanelment.hindustanprojects.in/track" style="background:linear-gradient(135deg,#c8102e,#a50d25);color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;">
          🔍 TRACK YOUR APPLICATION STATUS
        </a>
      </td>
    </tr>

${emailFooter()}
  `
  };
};

// EMAIL 2: ADMIN NEW APPLICATION ALERT
const newApplicationAlertToAdmin = (data = {}) => {
  const companyName = data.company_name || data.companyName || 'Applicant Entity';
  const contactName = data.contact_name || data.contactName || 'Authorized Signatory';
  const trackingId = data.tracking_id || data.trackingId || 'HP-EMP-000000';
  const category = data.category || 'General';
  const email = data.email || 'N/A';
  const phone = data.phone || 'N/A';
  const city = data.city || 'N/A';
  const state = data.state || 'N/A';
  const gstin = data.gstin || 'EXEMPT / NONE';
  const pan = data.pan || 'N/A';
  const submittedAt = data.submitted_at || data.submittedAt || new Date().toISOString();
  const ipAddress = data.ip_address || data.ipAddress || 'N/A';

  return {
    subject: `🔔 NEW VENDOR APPLICATION — ${trackingId} | ${companyName} | Review Required`,
    html: `
${emailHeader()}

    <!-- ALERT BANNER -->
    <tr>
      <td style="background:#fff3cd;border-left:4px solid #f59e0b;padding:16px 36px;">
        <div style="font-size:13px;font-weight:700;color:#92400e;letter-spacing:0.5px;">⚡ NEW APPLICATION REQUIRES YOUR REVIEW</div>
        <div style="font-size:11px;color:#78350f;margin-top:2px;">A new vendor empanelment application has been received and is awaiting Admin & CEO review.</div>
      </td>
    </tr>

    <!-- TRACKING ID -->
    <tr>
      <td style="padding:20px 36px 8px 36px;">
        <div style="background:#0a1628;border-radius:8px;padding:16px 22px;display:inline-block;">
          <span style="font-size:10px;color:#8ab4d8;letter-spacing:2px;text-transform:uppercase;">Reference ID &nbsp;</span>
          <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:3px;font-family:monospace;">${trackingId}</span>
        </div>
      </td>
    </tr>

    <!-- COMPANY DETAILS -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Applicant Details</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          ${infoBox('Company Name', `<strong>${companyName}</strong>`, '🏢')}
          ${infoBox('Contact Person', contactName, '👤')}
          ${infoBox('Category', category || 'General', '📋')}
          ${infoBox('Email', email, '✉️')}
          ${infoBox('Phone', phone, '📞')}
          ${infoBox('Location', `${city}, ${state}`, '📍')}
          ${infoBox('GSTIN', `<code style="font-family:monospace;background:#e2e8f0;padding:2px 6px;border-radius:4px;">${gstin}</code>`, '🔖')}
          ${infoBox('PAN', `<code style="font-family:monospace;background:#e2e8f0;padding:2px 6px;border-radius:4px;">${pan}</code>`, '📌')}
          ${infoBox('Submitted At', new Date(submittedAt).toLocaleString('en-IN'), '📅')}
          ${infoBox('IP Address', ipAddress || 'N/A', '🌐')}
        </table>
      </td>
    </tr>

    <!-- ACTION REQUIRED -->
    <tr>
      <td style="padding:12px 36px 24px 36px;">
        <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:16px 20px;">
          <div style="font-size:12px;font-weight:700;color:#991b1b;margin-bottom:8px;">⚠️ Action Required</div>
          <p style="margin:0;font-size:12px;color:#7f1d1d;line-height:1.7;">
            Please log in to the Admin Panel to review all submitted documents, verify credentials, 
            and either <strong>Approve</strong>, <strong>Request Re-submission</strong>, or <strong>Reject</strong> this application.
            The vendor is awaiting your decision.
          </p>
        </div>
      </td>
    </tr>

    <!-- ADMIN LOGIN CTA -->
    <tr>
      <td style="padding:0 36px 28px 36px;text-align:center;">
        <a href="https://empanelment.hindustanprojects.in/admin" style="background:linear-gradient(135deg,#1a3a6b,#0a1628);color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;">
          🔐 OPEN ADMIN PANEL
        </a>
      </td>
    </tr>

${emailFooter()}
  `
  };
};

// ════════════════════════════════════════════════════════════════
// EMAIL 3: VENDOR APPROVAL + LOGIN CREDENTIALS
const approvalWithCredentials = (data = {}, customPassword) => {
  const companyName = data.company_name || data.companyName || 'Empannelled Entity';
  const contactName = data.contact_name || data.contactName || 'Authorized Signatory';
  const trackingId = data.tracking_id || data.trackingId || 'HP-EMP-000000';
  const loginEmail = data.email || data.loginEmail || 'vendor@hindustanprojects.in';
  const loginPassword = customPassword || data.login_password || data.loginPassword || 'HiproVendor@2026';
  const approvedAt = data.approved_at || data.approvedAt || new Date().toISOString();

  return {
    subject: `✅ EMPANELMENT APPROVED — Your Vendor Portal Credentials | ${trackingId} | Hindustan Projects`,
    html: `
${emailHeader()}

    <!-- SUCCESS BANNER -->
    <tr>
      <td style="background:linear-gradient(135deg,#dcfce7,#bbf7d0);border-left:4px solid #16a34a;padding:18px 36px;">
        <div style="font-size:14px;font-weight:800;color:#14532d;letter-spacing:0.5px;">🎉 CONGRATULATIONS — YOUR APPLICATION IS APPROVED!</div>
        <div style="font-size:11px;color:#166534;margin-top:4px;">You are now an officially empanelled vendor of Hindustan Projects.</div>
      </td>
    </tr>

    <!-- GREETING -->
    <tr>
      <td style="padding:28px 36px 12px 36px;">
        <p style="margin:0;font-size:15px;color:#1e293b;font-weight:600;">Dear ${contactName},</p>
        <p style="margin:12px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          We are pleased to inform you that your empanelment application (<strong>${trackingId}</strong>) submitted by 
          <strong>${companyName}</strong> has been reviewed, verified, and <strong style="color:#16a34a;">officially approved</strong> 
          by the Management Committee of Hindustan Projects.
        </p>
        <p style="margin:10px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          Your Vendor Portal access credentials are provided below. Please use them to log in 
          and access your empanelment certificate, A4 dossier, and project tender notifications.
        </p>
      </td>
    </tr>

    <!-- CREDENTIALS BOX -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="background:linear-gradient(135deg,#0a1628,#1a3a6b);border-radius:10px;padding:24px 28px;">
          <div style="font-size:10px;color:#8ab4d8;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">🔐 Your Vendor Portal Login Credentials</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:10px;color:#8ab4d8;letter-spacing:1px;text-transform:uppercase;">Login Email</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;margin-top:4px;font-family:monospace;">${loginEmail}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0 8px 0;">
                <div style="font-size:10px;color:#8ab4d8;letter-spacing:1px;text-transform:uppercase;">Temporary Password</div>
                <div style="font-size:18px;font-weight:900;color:#fbbf24;margin-top:4px;font-family:monospace;letter-spacing:3px;">${loginPassword}</div>
                <div style="font-size:9px;color:#f87171;margin-top:4px;">⚠️ Please change your password after first login.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0 0 0;border-top:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:10px;color:#8ab4d8;letter-spacing:1px;text-transform:uppercase;">Portal URL</div>
                <div style="font-size:13px;font-weight:700;color:#60a5fa;margin-top:4px;">https://empanelment.hindustanprojects.in/vendor-login</div>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

    <!-- APPROVAL DETAILS -->
    <tr>
      <td style="padding:16px 36px 8px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:8px;padding:16px;border:1px solid #bbf7d0;">
          ${infoBox('Company', companyName, '🏢')}
          ${infoBox('Tracking ID', trackingId, '🔖')}
          ${infoBox('Approval Date', new Date(approvedAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }), '📅')}
          ${infoBox('Empanelment Status', '<strong style="color:#16a34a;">EMPANELLED & APPROVED ✅</strong>', '🟢')}
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:16px 36px 28px 36px;text-align:center;">
        <a href="https://empanelment.hindustanprojects.in/vendor-login" style="background:linear-gradient(135deg,#16a34a,#15803d);color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;">
          🚀 LOGIN TO VENDOR PORTAL
        </a>
      </td>
    </tr>

${emailFooter()}
  `
  };
};

// ════════════════════════════════════════════════════════════════
// EMAIL 4: ADMIN REQUESTS RE-SUBMISSION (Incomplete Documents)
const resubmissionRequest = (data = {}, customDetails, customNote) => {
  const companyName = data.company_name || data.companyName || 'Applicant Entity';
  const contactName = data.contact_name || data.contactName || 'Authorized Signatory';
  const trackingId = data.tracking_id || data.trackingId || 'HP-EMP-000000';
  const missingDetails = customDetails || data.missing_details || data.missingDetails || '• Please update requested documents.';
  const adminNote = customNote || data.admin_remarks || data.adminNote || '';

  return {
    subject: `⚠️ Action Required — Incomplete Documents | ${trackingId} | Hindustan Projects`,
    html: `
${emailHeader()}

    <!-- WARNING BANNER -->
    <tr>
      <td style="background:#fffbeb;border-left:4px solid #f59e0b;padding:16px 36px;">
        <div style="font-size:13px;font-weight:700;color:#92400e;letter-spacing:0.5px;">⚠️ ADDITIONAL INFORMATION REQUIRED</div>
        <div style="font-size:11px;color:#78350f;margin-top:2px;">Your application is on hold. Please submit the requested information to proceed.</div>
      </td>
    </tr>

    <!-- GREETING -->
    <tr>
      <td style="padding:28px 36px 12px 36px;">
        <p style="margin:0;font-size:15px;color:#1e293b;font-weight:600;">Dear ${contactName},</p>
        <p style="margin:12px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          Your empanelment application (<strong>${trackingId}</strong>) for <strong>${companyName}</strong> is currently 
          <strong style="color:#f59e0b;">on hold</strong> pending submission of additional information or documents 
          as required by our verification committee.
        </p>
        <p style="margin:10px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          Please review the requirements below and re-submit the requested information at the earliest to avoid delay in processing.
        </p>
      </td>
    </tr>

    <!-- MISSING ITEMS -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Required Information / Documents</div>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:18px 20px;">
          <pre style="margin:0;font-size:13px;color:#78350f;white-space:pre-wrap;font-family:'Segoe UI',Arial,sans-serif;line-height:1.8;">${missingDetails || '• Please contact our empanelment team for specific requirements.'}</pre>
        </div>
      </td>
    </tr>

    ${adminNote ? `
    <!-- ADMIN NOTE -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Note from Committee</div>
        <div style="background:#f8fafc;border-left:3px solid #1a3a6b;border-radius:0 6px 6px 0;padding:14px 18px;">
          <p style="margin:0;font-size:12px;color:#334155;font-style:italic;line-height:1.7;">"${adminNote}"</p>
        </div>
      </td>
    </tr>
    ` : ''}

    <!-- RE-APPLY CTA -->
    <tr>
      <td style="padding:16px 36px 28px 36px;text-align:center;">
        <a href="${PORTAL_URL}/apply?refill=${trackingId}" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;">
          📝 SUBMIT / REFILL REQUESTED INFORMATION
        </a>
        &nbsp;&nbsp;
        <a href="mailto:industrial@hindustanprojects.in" style="background:#f1f5f9;color:#1e293b;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;border:1px solid #e2e8f0;">
          ✉️ CONTACT SUPPORT
        </a>
      </td>
    </tr>

${emailFooter()}
  `
  };
};

// ════════════════════════════════════════════════════════════════
// EMAIL 5: REJECTION NOTICE
const rejectionNotice = (data = {}, customReason) => {
  const companyName = data.company_name || data.companyName || 'Applicant Entity';
  const contactName = data.contact_name || data.contactName || 'Authorized Signatory';
  const trackingId = data.tracking_id || data.trackingId || 'HP-EMP-000000';
  const rejectionReason = customReason || data.admin_remarks || data.rejectionReason || 'Your application did not meet current empanelment eligibility guidelines.';

  return {
    subject: `Application Status Update — ${trackingId} | Hindustan Projects Empanelment`,
    html: `
${emailHeader()}

    <!-- REJECTION BANNER -->
    <tr>
      <td style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 36px;">
        <div style="font-size:13px;font-weight:700;color:#7f1d1d;letter-spacing:0.5px;">APPLICATION STATUS — UNSUCCESSFUL</div>
        <div style="font-size:11px;color:#991b1b;margin-top:2px;">Your empanelment application has not been approved at this time.</div>
      </td>
    </tr>

    <!-- GREETING -->
    <tr>
      <td style="padding:28px 36px 12px 36px;">
        <p style="margin:0;font-size:15px;color:#1e293b;font-weight:600;">Dear ${contactName},</p>
        <p style="margin:12px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          We regret to inform you that after a thorough review by our Management Committee, the empanelment 
          application (<strong>${trackingId}</strong>) submitted by <strong>${companyName}</strong> has not been 
          approved at this time.
        </p>
        <p style="margin:10px 0 0 0;font-size:13px;color:#475569;line-height:1.7;">
          We appreciate the time and effort you invested in this application. Please review the reason below 
          and feel free to re-apply after addressing the mentioned concerns.
        </p>
      </td>
    </tr>

    <!-- REASON -->
    <tr>
      <td style="padding:12px 36px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Reason for Non-Approval</div>
        <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:18px 20px;">
          <p style="margin:0;font-size:13px;color:#7f1d1d;line-height:1.8;">${rejectionReason}</p>
        </div>
      </td>
    </tr>

    <!-- NEXT STEPS -->
    <tr>
      <td style="padding:16px 36px 8px 36px;">
        <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;border:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">You May Re-Apply</div>
          <p style="margin:0;font-size:12px;color:#475569;line-height:1.7;">
            You are welcome to resubmit a fresh application after a period of <strong>90 days</strong>, 
            or once the mentioned concern(s) have been fully addressed. Our empanelment team 
            is available to guide you through the process.
          </p>
        </div>
      </td>
    </tr>

    <!-- CONTACT CTA -->
    <tr>
      <td style="padding:16px 36px 28px 36px;text-align:center;">
        <a href="mailto:industrial@hindustanprojects.in" style="background:linear-gradient(135deg,#1a3a6b,#0a1628);color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;letter-spacing:0.5px;">
          ✉️ CONTACT EMPANELMENT TEAM
        </a>
      </td>
    </tr>

${emailFooter()}
  `
  };
};

module.exports = {
  submissionConfirmationToVendor,
  newApplicationAlertToAdmin,
  approvalWithCredentials,
  resubmissionRequest,
  rejectionNotice
};
