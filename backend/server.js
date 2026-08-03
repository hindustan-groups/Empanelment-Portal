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

const app = express();
const PORT = process.env.PORT || 5000;

// ─── ALLOWED ORIGINS (set VITE_FRONTEND_URL in .env) ───────────────
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://empanelment.hindustanprojects.in',
  'https://empanelment-portal.vercel.app',
];

// ─── ADMIN API SECRET KEY ───────────────────────────────────────────
// Set ADMIN_API_KEY in your .env file on the server — never hardcode it
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || null;

// ─── ADMIN API AUTH MIDDLEWARE ──────────────────────────────────────
function requireAdminKey(req, res, next) {
  if (!ADMIN_API_KEY) {
    // If no key set in env, block all admin API access
    return res.status(403).json({ success: false, error: 'Admin API not configured. Set ADMIN_API_KEY in server .env.' });
  }
  const provided = req.headers['x-admin-key'] || req.query.adminKey;
  if (provided !== ADMIN_API_KEY) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Invalid admin key.' });
  }
  next();
}

// 1. SECURITY HEADERS (Helmet)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. RATE LIMITING
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

// 3. CORS — locked to allowed origins only
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman / server-to-server)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin ${origin} not allowed.`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Admin-Key']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── UPLOADS — protected, NOT publicly static ──────────────────────
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploads only to authenticated admin requests
app.get('/uploads/:filename', requireAdminKey, (req, res) => {
  const filename = path.basename(req.params.filename); // prevent path traversal
  const filePath = path.join(uploadDir, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'File not found.' });
  }
  res.sendFile(filePath);
});

// 4. SECURE FILE UPLOAD CONFIG
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

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// ─── DATABASE INIT ─────────────────────────────────────────────────
const dbPath = path.join(__dirname, 'empanelment.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('🔒 Connected to Secure VPS SQLite Database at:', dbPath);
  }
});

// ─── DATABASE TABLE SETUP ──────────────────────────────────────────
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_id      TEXT UNIQUE NOT NULL,
      hash_signature   TEXT NOT NULL,
      category         TEXT,
      primary_role     TEXT,
      company_name     TEXT NOT NULL,
      entity_type      TEXT,
      est_year         TEXT,
      contact_name     TEXT NOT NULL,
      designation      TEXT,
      email            TEXT NOT NULL,
      phone            TEXT NOT NULL,
      address          TEXT,
      city             TEXT NOT NULL,
      state            TEXT NOT NULL,
      pincode          TEXT,
      gstin            TEXT NOT NULL,
      pan              TEXT NOT NULL,
      msme_no          TEXT,
      bank_account     TEXT NOT NULL,
      bank_name        TEXT,
      ifsc             TEXT NOT NULL,
      turnover_2023    TEXT,
      turnover_2024    TEXT,
      turnover_2025    TEXT NOT NULL,
      largest_order    TEXT,
      existing_empanels TEXT,
      gst_doc          TEXT,
      pan_doc          TEXT,
      bank_doc         TEXT,
      exp_doc          TEXT,
      signatory_name   TEXT NOT NULL,
      admin_remarks    TEXT DEFAULT '',
      status           TEXT DEFAULT 'Under Verification',
      current_stage    TEXT DEFAULT 'Financial Committee Review',
      ip_address       TEXT,
      submitted_at     DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: add primary_role column if upgrading from older DB
  db.run(`ALTER TABLE vendors ADD COLUMN primary_role TEXT`, () => {
    // Silently ignore error if column already exists
  });

  // Migration: add admin_remarks column if upgrading from older DB
  db.run(`ALTER TABLE vendors ADD COLUMN admin_remarks TEXT DEFAULT ''`, () => {
    // Silently ignore error if column already exists
  });
});

// ═══════════════════════════════════════════════════════════════════
// PUBLIC API ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hindustan Projects Secure VPS Backend Active' });
});

// Submit Application (public — rate limited)
app.post('/api/empanelment/submit', submitLimiter, upload.fields([
  { name: 'gstDoc',  maxCount: 1 },
  { name: 'panDoc',  maxCount: 1 },
  { name: 'bankDoc', maxCount: 1 },
  { name: 'expDoc',  maxCount: 1 },
]), (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};

    // Real IP from proxy header or socket
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

    const trackingId = `HP-EMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const hashData = `${trackingId}-${data.companyName}-${data.gstin}-${Date.now()}`;
    const hashSignature = crypto.createHash('sha256').update(hashData).digest('hex');

    const query = `
      INSERT INTO vendors (
        tracking_id, hash_signature, category, primary_role, company_name,
        entity_type, est_year, contact_name, designation, email, phone,
        address, city, state, pincode, gstin, pan, msme_no,
        bank_account, bank_name, ifsc,
        turnover_2023, turnover_2024, turnover_2025, largest_order, existing_empanels,
        gst_doc, pan_doc, bank_doc, exp_doc, signatory_name, ip_address
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `;

    const params = [
      trackingId, hashSignature, data.category, data.primaryRole, data.companyName,
      data.entityType, data.estYear, data.contactName, data.designation, data.email, data.phone,
      data.address, data.city, data.state, data.pincode, data.gstin, data.pan, data.msmeNo,
      data.bankAccount, data.bankName, data.ifsc,
      data.turnover2023, data.turnover2024, data.turnover2025, data.largestOrder, data.existingEmpanels,
      files.gstDoc  ? files.gstDoc[0].filename  : null,
      files.panDoc  ? files.panDoc[0].filename  : null,
      files.bankDoc ? files.bankDoc[0].filename : null,
      files.expDoc  ? files.expDoc[0].filename  : null,
      data.signatoryName, clientIp
    ];

    db.run(query, params, function (err) {
      if (err) {
        console.error('DB insert error:', err.message);
        return res.status(500).json({ success: false, error: 'Failed to save application.' });
      }
      res.status(201).json({
        success: true,
        trackingId,
        hashSignature,
        submittedAt: new Date().toISOString()
      });
    });

  } catch (error) {
    console.error('Submit error:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Track Status (public)
app.get('/api/empanelment/status/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId.toUpperCase();
  db.get(
    `SELECT tracking_id, hash_signature, company_name, category, status, current_stage, submitted_at
     FROM vendors WHERE tracking_id = ?`,
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

// ═══════════════════════════════════════════════════════════════════
// PROTECTED ADMIN API ENDPOINTS — require X-Admin-Key header
// ═══════════════════════════════════════════════════════════════════

// Get All Applications
app.get('/api/empanelment/admin/applications', requireAdminKey, (req, res) => {
  db.all(`SELECT * FROM vendors ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// Update Vendor Status & Stage
app.patch('/api/empanelment/admin/status', requireAdminKey, (req, res) => {
  const { trackingId, status, currentStage, adminRemarks } = req.body;
  if (!trackingId || !status) {
    return res.status(400).json({ success: false, error: 'trackingId and status are required.' });
  }
  const query = `UPDATE vendors SET status = ?, current_stage = ?, admin_remarks = ? WHERE tracking_id = ?`;
  db.run(query, [status, currentStage || 'Technical Committee Review', adminRemarks || '', trackingId], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: `Status updated to "${status}" for ${trackingId}.` });
  });
});

// Delete / Archive Application
app.delete('/api/empanelment/admin/delete/:trackingId', requireAdminKey, (req, res) => {
  const trackingId = req.params.trackingId;
  db.run(`DELETE FROM vendors WHERE tracking_id = ?`, [trackingId], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: `Application ${trackingId} archived successfully.` });
  });
});

// ─── START SERVER ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🔒 Hindustan Projects SECURE VPS Backend → Port ${PORT}`);
  console.log(`🛡️  Admin API protected by X-Admin-Key header`);
  console.log(`🌐  CORS locked to: ${ALLOWED_ORIGINS.join(', ')}`);
  console.log(`====================================================`);
});
