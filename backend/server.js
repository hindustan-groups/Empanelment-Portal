/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — EMPANELMENT SECURE VPS BACKEND
 * Express + SQLite + Nodemailer Email System
 * All 5 email triggers integrated
 * ════════════════════════════════════════════════════════════════
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const emailService = require('./emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── 1. SECURITY HEADERS ────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ─── 2. RATE LIMITING ───────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests from this IP.' }
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Submission limit reached for this IP.' }
});

app.use('/api/', apiLimiter);

// ─── 3. CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── 4. UPLOADS DIRECTORY ───────────────────────────────────────
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

// ─── 5. SECURE FILE UPLOAD (Multer) ─────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const sanitizeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueHash = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(sanitizeName).toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}-${uniqueHash}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/pjpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Security Alert: Only .pdf, .jpg, .jpeg, and .png files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

// ─── 6. SQLITE DATABASE ──────────────────────────────────────────
const dbPath = path.join(__dirname, 'empanelment.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('🔒 Connected to Secure VPS SQLite Database at:', dbPath);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_id TEXT UNIQUE NOT NULL,
      hash_signature TEXT NOT NULL,
      category TEXT,
      company_name TEXT NOT NULL,
      entity_type TEXT,
      est_year TEXT,
      contact_name TEXT NOT NULL,
      designation TEXT,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pincode TEXT,
      gstin TEXT NOT NULL,
      pan TEXT NOT NULL,
      msme_no TEXT,
      bank_account TEXT NOT NULL,
      bank_name TEXT,
      ifsc TEXT NOT NULL,
      turnover_2023 TEXT,
      turnover_2024 TEXT,
      turnover_2025 TEXT NOT NULL,
      largest_order TEXT,
      existing_empanels TEXT,
      gst_doc TEXT,
      pan_doc TEXT,
      bank_doc TEXT,
      exp_doc TEXT,
      signatory_name TEXT NOT NULL,
      login_password TEXT,
      status TEXT DEFAULT 'Under Verification',
      current_stage TEXT DEFAULT 'Financial Committee Review',
      ip_address TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      approved_at DATETIME
    )
  `);
});

// ════════════════════════════════════════════════════════════════
//                        API ENDPOINTS
// ════════════════════════════════════════════════════════════════

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hindustan Projects Secure VPS Backend Active ✅' });
});

// ─────────────────────────────────────────────────────────────────
// POST /api/empanelment/submit
// Submit application → save to DB → send 2 emails (vendor + admin)
// ─────────────────────────────────────────────────────────────────
app.post('/api/empanelment/submit', submitLimiter, upload.fields([
  { name: 'gstDoc', maxCount: 1 },
  { name: 'panDoc', maxCount: 1 },
  { name: 'bankDoc', maxCount: 1 },
  { name: 'expDoc', maxCount: 1 },
]), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // Generate Tracking ID & SHA-256 Hash
    const seqNum = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `HP-EMP-${seqNum}`;
    const hashData = `${trackingId}-${data.companyName}-${data.gstin}-${Date.now()}`;
    const hashSignature = crypto.createHash('sha256').update(hashData).digest('hex');
    const submittedAt = new Date().toISOString();

    const query = `
      INSERT INTO vendors (
        tracking_id, hash_signature, category, company_name, entity_type, est_year,
        contact_name, designation, email, phone, address, city, state, pincode,
        gstin, pan, msme_no, bank_account, bank_name, ifsc,
        turnover_2023, turnover_2024, turnover_2025, largest_order, existing_empanels,
        gst_doc, pan_doc, bank_doc, exp_doc, signatory_name, ip_address, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      trackingId, hashSignature, data.category, data.companyName, data.entityType, data.estYear,
      data.contactName, data.designation, data.email, data.phone, data.address, data.city, data.state, data.pincode,
      data.gstin, data.pan, data.msmeNo, data.bankAccount, data.bankName, data.ifsc,
      data.turnover2023, data.turnover2024, data.turnover2025, data.largestOrder, data.existingEmpanels,
      files.gstDoc ? files.gstDoc[0].filename : null,
      files.panDoc ? files.panDoc[0].filename : null,
      files.bankDoc ? files.bankDoc[0].filename : null,
      files.expDoc ? files.expDoc[0].filename : null,
      data.signatoryName, clientIp, submittedAt
    ];

    db.run(query, params, async function(err) {
      if (err) {
        console.error('DB Error:', err.message);
        return res.status(500).json({ success: false, error: err.message });
      }

      // ── EMAIL 1: Send confirmation to vendor ──
      emailService.sendSubmissionConfirmation({
        companyName: data.companyName,
        contactName: data.contactName,
        trackingId,
        hashSignature,
        category: data.category,
        email: data.email,
        submittedAt
      }).catch(e => console.error('Vendor email error:', e));

      // ── EMAIL 2: Send alert to admin ──
      emailService.sendNewApplicationAlertToAdmin({
        companyName: data.companyName,
        contactName: data.contactName,
        trackingId,
        category: data.category,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        gstin: data.gstin,
        pan: data.pan,
        submittedAt,
        ipAddress: clientIp
      }).catch(e => console.error('Admin email error:', e));

      res.status(201).json({
        success: true,
        trackingId,
        hashSignature,
        submittedAt
      });
    });

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────────
// POST /api/empanelment/contact
// Contact form inquiry endpoint
// ─────────────────────────────────────────────────────────────────
app.post('/api/empanelment/contact', async (req, res) => {
  const { name, email, phone, company, department, message } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'empanelment@hindustanprojects.in';

  try {
    if (emailService && emailService.sendEmail) {
      await emailService.sendEmail(adminEmail, {
        subject: `[Contact Support] ${department} — ${name} (${company || 'Individual'})`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Company:</strong> ${company}</p><p><strong>Message:</strong> ${message}</p>`
      });
    }
    res.json({ success: true, message: 'Inquiry email sent successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────
// GET /api/empanelment/status/:trackingId
// Public tracking — returns status for a given tracking ID
// ─────────────────────────────────────────────────────────────────
app.get('/api/empanelment/status/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId.toUpperCase();

  db.get(
    `SELECT tracking_id, hash_signature, company_name, category, status, current_stage, submitted_at FROM vendors WHERE tracking_id = ?`,
    [trackingId],
    (err, row) => {
      if (err || !row) {
        return res.status(404).json({ success: false, error: 'Application Reference ID not found.' });
      }
      res.json({
        success: true,
        data: {
          id: row.tracking_id,
          hash: row.hash_signature,
          company: row.company_name,
          category: row.category,
          status: row.status,
          stage: row.current_stage,
          submittedDate: row.submitted_at
        }
      });
    }
  );
});

// ─────────────────────────────────────────────────────────────────
// GET /api/empanelment/admin/applications
// Admin — get all applications
// ─────────────────────────────────────────────────────────────────
app.get('/api/empanelment/admin/applications', (req, res) => {
  db.all(`SELECT * FROM vendors ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// ─────────────────────────────────────────────────────────────────
// PATCH /api/empanelment/admin/status
// Admin approves / rejects / requests resubmission
// Triggers appropriate email to vendor
// ─────────────────────────────────────────────────────────────────
app.patch('/api/empanelment/admin/status', async (req, res) => {
  const { trackingId, status, currentStage, rejectionReason, missingDetails, adminNote } = req.body;

  if (!trackingId || !status) {
    return res.status(400).json({ success: false, error: 'Tracking ID and Status are required.' });
  }

  // Fetch vendor details for email
  db.get(`SELECT * FROM vendors WHERE tracking_id = ?`, [trackingId], async (err, vendor) => {
    if (err || !vendor) {
      return res.status(404).json({ success: false, error: 'Vendor not found.' });
    }

    let updateQuery, updateParams;

    // ── APPROVED ──────────────────────────────────────────────
    if (status === 'Approved') {
      // Generate a simple temporary password
      const tempPassword = 'HP@' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const approvedAt = new Date().toISOString();

      updateQuery = `UPDATE vendors SET status = ?, current_stage = ?, login_password = ?, approved_at = ? WHERE tracking_id = ?`;
      updateParams = [status, currentStage || 'CEO Final Approval', tempPassword, approvedAt, trackingId];

      db.run(updateQuery, updateParams, async function(dbErr) {
        if (dbErr) return res.status(500).json({ success: false, error: dbErr.message });

        // EMAIL 3: Send approval + credentials to vendor
        await emailService.sendApprovalWithCredentials({
          companyName: vendor.company_name,
          contactName: vendor.contact_name,
          trackingId,
          loginEmail: vendor.email,
          loginPassword: tempPassword,
          approvedAt
        }).catch(e => console.error('Approval email error:', e));

        res.json({
          success: true,
          message: `Application ${trackingId} APPROVED. Login credentials sent to ${vendor.email}.`,
          tempPassword
        });
      });

    // ── RESUBMISSION REQUIRED ──────────────────────────────────
    } else if (status === 'Resubmission Required') {
      updateQuery = `UPDATE vendors SET status = ?, current_stage = ? WHERE tracking_id = ?`;
      updateParams = [status, currentStage || 'Document Re-verification', trackingId];

      db.run(updateQuery, updateParams, async function(dbErr) {
        if (dbErr) return res.status(500).json({ success: false, error: dbErr.message });

        // EMAIL 4: Send resubmission request to vendor
        await emailService.sendResubmissionRequest({
          companyName: vendor.company_name,
          contactName: vendor.contact_name,
          trackingId,
          email: vendor.email,
          missingDetails,
          adminNote
        }).catch(e => console.error('Resubmission email error:', e));

        res.json({
          success: true,
          message: `Resubmission request sent to ${vendor.email} for ${trackingId}.`
        });
      });

    // ── REJECTED ───────────────────────────────────────────────
    } else if (status === 'Rejected') {
      updateQuery = `UPDATE vendors SET status = ?, current_stage = ? WHERE tracking_id = ?`;
      updateParams = [status, currentStage || 'Application Closed', trackingId];

      db.run(updateQuery, updateParams, async function(dbErr) {
        if (dbErr) return res.status(500).json({ success: false, error: dbErr.message });

        // EMAIL 5: Send rejection notice to vendor
        await emailService.sendRejectionNotice({
          companyName: vendor.company_name,
          contactName: vendor.contact_name,
          trackingId,
          email: vendor.email,
          rejectionReason
        }).catch(e => console.error('Rejection email error:', e));

        res.json({
          success: true,
          message: `Application ${trackingId} REJECTED. Rejection notice sent to ${vendor.email}.`
        });
      });

    // ── OTHER STATUS UPDATE ────────────────────────────────────
    } else {
      updateQuery = `UPDATE vendors SET status = ?, current_stage = ? WHERE tracking_id = ?`;
      updateParams = [status, currentStage || vendor.current_stage, trackingId];

      db.run(updateQuery, updateParams, function(dbErr) {
        if (dbErr) return res.status(500).json({ success: false, error: dbErr.message });
        res.json({ success: true, message: `Status updated to "${status}" for ${trackingId}.` });
      });
    }
  });
});

// ─────────────────────────────────────────────────────────────────
// DELETE /api/empanelment/admin/delete/:trackingId
// Admin — delete an application
// ─────────────────────────────────────────────────────────────────
app.delete('/api/empanelment/admin/delete/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId;
  db.run(`DELETE FROM vendors WHERE tracking_id = ?`, [trackingId], function(err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: `Application ${trackingId} deleted successfully.` });
  });
});

// ─────────────────────────────────────────────────────────────────
// POST /api/empanelment/admin/send-email
// Admin — send a custom email to a vendor directly from Admin Panel
// ─────────────────────────────────────────────────────────────────
app.post('/api/empanelment/admin/send-email', async (req, res) => {
  const { trackingId, emailType, missingDetails, adminNote, rejectionReason } = req.body;

  if (!trackingId || !emailType) {
    return res.status(400).json({ success: false, error: 'Tracking ID and Email Type are required.' });
  }

  db.get(`SELECT * FROM vendors WHERE tracking_id = ?`, [trackingId], async (err, vendor) => {
    if (err || !vendor) return res.status(404).json({ success: false, error: 'Vendor not found.' });

    let result;
    const vendorData = {
      companyName: vendor.company_name,
      contactName: vendor.contact_name,
      trackingId,
      email: vendor.email,
      missingDetails,
      adminNote,
      rejectionReason
    };

    switch (emailType) {
      case 'resubmission':
        result = await emailService.sendResubmissionRequest(vendorData);
        break;
      case 'rejection':
        result = await emailService.sendRejectionNotice(vendorData);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid email type.' });
    }

    res.json({ success: result.success, messageId: result.messageId, error: result.error });
  });
});

// ─────────────────────────────────────────────────────────────────
// POST /api/empanelment/admin/send-test-email
// Test email configuration — sends test email to admin inbox
// ─────────────────────────────────────────────────────────────────
app.post('/api/test-email', async (req, res) => {
  const { to } = req.body;
  const testEmail = to || process.env.ADMIN_EMAIL;
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASS },
      tls: { rejectUnauthorized: false }
    });
    await transporter.sendMail({
      from: `"Hindustan Projects Test" <${process.env.EMAIL_USER}>`,
      to: testEmail,
      subject: '✅ Email System Working — Hindustan Projects Backend',
      html: '<h2>Email system is working correctly!</h2><p>This is a test from your Hindustan Projects backend.</p>'
    });
    res.json({ success: true, message: `Test email sent to ${testEmail}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🔒 Hindustan Projects SECURE Backend Active — Port ${PORT}`);
  console.log(`📧 Email Service: ${process.env.EMAIL_USER || 'NOT CONFIGURED — Set in .env'}`);
  console.log(`👤 Admin Alert Email: ${process.env.ADMIN_EMAIL || 'NOT CONFIGURED — Set in .env'}`);
  console.log(`====================================================`);
});
