/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — EMAIL SERVICE (Nodemailer + Gmail SMTP)
 * Handles all transactional emails for the empanelment portal
 * ════════════════════════════════════════════════════════════════
 */

const nodemailer = require('nodemailer');
const templates = require('./emailTemplates');

// ─── CREATE TRANSPORTER (Gmail SMTP) ────────────────────────────
const createTransporter = () => {
  const user = process.env.EMAIL_USER || 'hindustanprojects0.2@gmail.com';
  const pass = process.env.EMAIL_APP_PASS || 'sbecchomfbrgkrwx';

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Port 465 SSL for VPS
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
};

// ─── SEND EMAIL HELPER ───────────────────────────────────────────
const sendEmail = async (to, templateResult) => {
  try {
    const user = process.env.EMAIL_USER || 'hindustanprojects0.2@gmail.com';
    const sender = process.env.ALIAS_EMAIL || user;
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Hindustan Projects — Empanelment Cell" <${sender}>`,
      to,
      subject: templateResult.subject,
      html: templateResult.html,
    });
    console.log(`✅ Email sent to ${to} | MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
    return { success: false, error: err.message };
  }
};

// ════════════════════════════════════════════════════════════════
// EXPORTED EMAIL SENDERS — One function per email trigger
// ════════════════════════════════════════════════════════════════

/**
 * 1️⃣ Send tracking confirmation to vendor after form submit
 */
const sendSubmissionConfirmation = async (vendorData) => {
  return await sendEmail(vendorData.email, templates.submissionConfirmationToVendor(vendorData));
};

/**
 * 2️⃣ Send new application alert to Admin
 */
const sendNewApplicationAlertToAdmin = async (vendorData) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'empanelment@hindustanprojects.in';
  return await sendEmail(adminEmail, templates.newApplicationAlertToAdmin(vendorData));
};

/**
 * 3️⃣ Send approval email with login credentials to vendor
 */
const sendApprovalWithCredentials = async (vendorData) => {
  return await sendEmail(vendorData.email, templates.approvalWithCredentials(vendorData));
};

/**
 * 4️⃣ Send re-submission request email to vendor
 */
const sendResubmissionRequest = async (vendorData) => {
  return await sendEmail(vendorData.email, templates.resubmissionRequest(vendorData));
};

/**
 * 5️⃣ Send rejection notice to vendor
 */
const sendRejectionNotice = async (vendorData) => {
  return await sendEmail(vendorData.email, templates.rejectionNotice(vendorData));
};

module.exports = {
  sendSubmissionConfirmation,
  sendNewApplicationAlertToAdmin,
  sendApprovalWithCredentials,
  sendResubmissionRequest,
  sendRejectionNotice,
};
