/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — EMAIL SERVICE (Nodemailer + Gmail SMTP)
 * Handles all transactional emails for the empanelment portal
 * ════════════════════════════════════════════════════════════════
 */

const nodemailer = require('nodemailer');
const templates = require('./emailTemplates');

// ─── CREATE TRANSPORTER (Hostinger Domain SMTP: industrial@hindustanprojects.in) ───
const createTransporter = () => {
  const user = process.env.EMAIL_USER || 'info@hindustanprojects.in';
  const pass = process.env.EMAIL_APP_PASS || '';

  let host = process.env.SMTP_HOST;
  if (!host) {
    host = user.endsWith('@gmail.com') ? 'smtp.gmail.com' : 'smtp.hostinger.com';
  }

  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
};

const fs = require('fs');
const path = require('path');

const logEmailToOutbox = (to, subject, html) => {
  try {
    const outboxPath = path.join(__dirname, 'email_outbox.log');
    const logEntry = `\n====================================================\n[TIMESTAMP]: ${new Date().toISOString()}\n[TO]: ${to}\n[SUBJECT]: ${subject}\n[BODY]:\n${html.replace(/<[^>]*>/g, '')}\n====================================================\n`;
    fs.appendFileSync(outboxPath, logEntry);
  } catch (e) {}
};

// ─── SEND EMAIL HELPER ───────────────────────────────────────────
const sendEmail = async (to, templateResult) => {
  logEmailToOutbox(to, templateResult.subject, templateResult.html);
  try {
    const user = process.env.EMAIL_USER || 'info@hindustanprojects.in';
    const sender = process.env.ALIAS_EMAIL || 'industrial@hindustanprojects.in';
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Hindustan Projects — Industrial Cell" <${user}>`,
      replyTo: sender,
      to,
      subject: templateResult.subject,
      html: templateResult.html,
    });
    console.log(`✅ Email sent to ${to} | MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.warn(`⚠️ Email dispatch notice to ${to}: ${err.message}. Email recorded in backend/email_outbox.log.`);
    return { success: true, warning: err.message, recordedInOutbox: true };
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
  const adminEmail = process.env.ADMIN_EMAIL || 'industrial@hindustanprojects.in';
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
