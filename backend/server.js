const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allows Vercel frontend (empanel.hindustanprojects.in) to connect
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads directory on VPS
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Storage Engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB file limit
});

// Database Initialization (SQLite on VPS)
const dbPath = path.join(__dirname, 'empanelment.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to VPS SQLite Database at:', dbPath);
  }
});

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_id TEXT UNIQUE NOT NULL,
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
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// --- API ENDPOINTS ---

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hindustan Projects Empanelment VPS Backend Running' });
});

// Submit Empanelment Application API
app.post('/api/empanelment/submit', upload.fields([
  { name: 'gstDoc', maxCount: 1 },
  { name: 'panDoc', maxCount: 1 },
  { name: 'bankDoc', maxCount: 1 },
  { name: 'expDoc', maxCount: 1 },
]), (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};

    const trackingId = `HP-EMP-${Math.floor(100000 + Math.random() * 900000)}`;

    const query = `
      INSERT INTO vendors (
        tracking_id, category, company_name, entity_type, est_year, 
        contact_name, designation, email, phone, address, city, state, pincode,
        gstin, pan, msme_no, bank_account, bank_name, ifsc,
        turnover_2023, turnover_2024, turnover_2025, largest_order, existing_empanels,
        gst_doc, pan_doc, bank_doc, exp_doc, signatory_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      trackingId, data.category, data.companyName, data.entityType, data.estYear,
      data.contactName, data.designation, data.email, data.phone, data.address, data.city, data.state, data.pincode,
      data.gstin, data.pan, data.msmeNo, data.bankAccount, data.bankName, data.ifsc,
      data.turnover2023, data.turnover2024, data.turnover2025, data.largestOrder, data.existingEmpanels,
      files.gstDoc ? files.gstDoc[0].filename : null,
      files.panDoc ? files.panDoc[0].filename : null,
      files.bankDoc ? files.bankDoc[0].filename : null,
      files.expDoc ? files.expDoc[0].filename : null,
      data.signatoryName
    ];

    db.run(query, params, function(err) {
      if (err) {
        console.error('Database Error:', err.message);
        return res.status(500).json({ success: false, error: 'Database saving failed: ' + err.message });
      }

      res.status(201).json({
        success: true,
        message: 'Empanelment Application saved successfully to VPS Database',
        trackingId: trackingId,
        submittedAt: new Date().toISOString()
      });
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Track Application Status API
app.get('/api/empanelment/status/:trackingId', (req, res) => {
  const trackingId = req.params.trackingId.toUpperCase();

  db.get(`SELECT tracking_id, company_name, category, status, current_stage, submitted_at FROM vendors WHERE tracking_id = ?`, [trackingId], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, error: 'Application Reference ID not found' });
    }

    res.json({
      success: true,
      data: {
        id: row.tracking_id,
        company: row.company_name,
        category: row.category,
        status: row.status,
        stage: row.current_stage,
        submittedDate: row.submitted_at
      }
    });
  });
});

// Admin: Get All Applications List API
app.get('/api/empanelment/admin/applications', (req, res) => {
  db.all(`SELECT * FROM vendors ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// Start Express VPS Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Hindustan Projects VPS Backend Server Active!`);
  console.log(`📡 Listening on Port: ${PORT}`);
  console.log(`🌐 API Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
