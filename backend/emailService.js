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
  const finalUser = 'info@hindustanprojects.in';
  const finalPass = 'Yogi123@123';
  const host = 'smtp.hostinger.com';
  const port = 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user: finalUser, pass: finalPass },
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
    const user = 'info@hindustanprojects.in';
    const sender = 'info@hindustanprojects.in';
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Hindustan Projects — Empanelment Portal" <${user}>`,
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
  try { delete require.cache[require.resolve('./emailTemplates')]; } catch (e) {}
  const freshTemplates = require('./emailTemplates');
  return await sendEmail(vendorData.email, freshTemplates.submissionConfirmationToVendor(vendorData));
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

/**
 * 6️⃣ Send official admin reply to user contact inquiry
 */
const sendSupportReplyToUser = async (replyData) => {
  const recipient = replyData.to || replyData.email;
  return await sendEmail(recipient, templates.supportReplyToUser(replyData));
};

module.exports = {
  sendEmail,
  sendSubmissionConfirmation,
  sendNewApplicationAlertToAdmin,
  sendApprovalWithCredentials,
  sendResubmissionRequest,
  sendRejectionNotice,
  sendSupportReplyToUser,
};
