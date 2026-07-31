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

// 1. SECURITY HEADERS (Helmet)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
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

// 3. CORS SECURITY CONFIGURATION
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Uploads Directory Setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// 4. SECURE FILE FILTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
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
    cb(new Error('Security Alert: Only .pdf, .jpg, .jpeg, and .png document files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Database Initialization
const dbPath = path.join(__dirname, 'empanelment.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('🔒 Connected to Secure VPS SQLite Database at:', dbPath);
  }
});

// Database Table Setup
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
      status TEXT DEFAULT 'Under Verification',
      current_stage TEXT DEFAULT 'Financial Committee Review',
      ip_address TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// --- API ENDPOINTS ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hindustan Projects Secure VPS Backend Active' });
});

// Submit Application API
app.post('/api/empanelment/submit', submitLimiter, upload.fields([
  { name: 'gstDoc', maxCount: 1 },
  { name: 'panDoc', maxCount: 1 },
  { name: 'bankDoc', maxCount: 1 },
  { name: 'expDoc', maxCount: 1 },
]), (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '103.45.12.98';

    const trackingId = `HP-EMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const hashData = `${trackingId}-${data.companyName}-${data.gstin}-${Date.now()}`;
    const hashSignature = crypto.createHash('sha256').update(hashData).digest('hex');

    const query = `
      INSERT INTO vendors (
        tracking_id, hash_signature, category, company_name, entity_type, est_year, 
        contact_name, designation, email, phone, address, city, state, pincode,
        gstin, pan, msme_no, bank_account, bank_name, ifsc,
        turnover_2023, turnover_2024, turnover_2025, largest_order, existing_empanels,
        gst_doc, pan_doc, bank_doc, exp_doc, signatory_name, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      data.signatoryName, clientIp
    ];

    db.run(query, params, function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      res.status(201).json({
        success: true,
        trackingId: trackingId,
        hashSignature: hashSignature,
        submittedAt: new Date().toISOString()
      });
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Track Status API
app.get('/api/empanelment/status/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId.toUpperCase();

  db.get(`SELECT tracking_id, hash_signature, company_name, category, status, current_stage, submitted_at FROM vendors WHERE tracking_id = ?`, [trackingId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ success: false, error: 'Application Reference ID not found' });
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
  });
});

// Admin: Get All Applications List
app.get('/api/empanelment/admin/applications', (req, res) => {
  db.all(`SELECT * FROM vendors ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// Admin Control: Update Vendor Status & Stage API
app.patch('/api/empanelment/admin/status', (req, res) => {
  const { trackingId, status, currentStage } = req.body;

  if (!trackingId || !status) {
    return res.status(400).json({ success: false, error: 'Tracking ID and Status are required' });
  }

  const query = `UPDATE vendors SET status = ?, current_stage = ? WHERE tracking_id = ?`;
  db.run(query, [status, currentStage || 'Technical Committee Review', trackingId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: `Status updated to ${status} for ${trackingId}` });
  });
});

// Admin Control: Delete / Archive Application API
app.delete('/api/empanelment/admin/delete/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId;
  db.run(`DELETE FROM vendors WHERE tracking_id = ?`, [trackingId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: `Application ${trackingId} deleted successfully` });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🔒 Hindustan Projects SECURE VPS Backend Active on ${PORT}`);
  console.log(`====================================================`);
});
