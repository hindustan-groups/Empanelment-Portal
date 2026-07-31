# HINDUSTAN PROJECTS (HiPRO) - MASTER PROJECT REPORT & OPERATIONS MANUAL

**Project Title:** Official Vendor & Contractor Empanelment Portal  
**Target Domain:** `empanel.hindustanprojects.in`  
**GitHub Repository:** `https://github.com/hindustan-groups/Empanelment-Portal`  
**Local Workspace:** `D:\HindustanProjects\empanelment-portal`  
**Report Generated:** July 25, 2026  

---

##  EXECUTIVE SUMMARY & CORPORATE IDENTITY

Hindustan Projects (**HiPRO**) has established an official, enterprise-grade, paperless digital empanelment portal designed to onboard EPC Civil Contractors, MEP Services, Goods Suppliers, Architects, Equipment Rentals, and Logistics Partners for active infrastructure and commercial building projects.

### Key Brand & Operational Tokens:
- **Corporate Colors:** Brand Red (`#ED1C24`) and Royal Blue (`#0047AB`).
- **Target Subdomain:** `empanel.hindustanprojects.in`
- **Primary Domain:** `hindustanprojects.in`
- **Procurement Helpdesk:** `empanelment@hindustanprojects.in` | `+91 (011) 4500 8899`

---

## 🏗️ SYSTEM & CODE ARCHITECTURE

The application follows a decoupled, high-performance architecture split into a lightweight Single-Page Application (SPA) frontend and a secure VPS Node.js REST API backend.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               FRONTEND (Vercel Host)                                   │
│            React 18 + Vite 8 + React Router v6 + HSL Vanilla CSS Design System         │
│                        Subdomain: empanel.hindustanprojects.in                         │
└────────────────────────────────────────────────────────┬───────────────────────────────┘
                                                         │ HTTPS REST API
                                                         ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (VPS Node.js Host)                                │
│        Express API + SQLite3 DB + Multer Upload Engine + Helmet Security + PM2         │
│                           Directory: D:\HindustanProjects\empanelment-portal\backend   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Technical Stack Details:
- **Frontend Stack:** React 18, Vite 8.1, React Router DOM 6.22, Lucide React Icons, Canvas Confetti.
- **Backend Stack:** Node.js, Express 4.19, SQLite3 5.1, Multer 1.4, Helmet 7.1, Express Rate Limit 7.2.
- **Design Tokens:** Pure HSL Vanilla CSS variables, Glassmorphism panels, CSS Dark/Light Theme variables (`.dark`), Micro-animations.

---

## 📂 PROJECT DIRECTORY STRUCTURE & FILE MAP

```
D:\HindustanProjects\empanelment-portal\
├── index.html                       # Base HTML, HiPRO Vector SVG Favicon & Webmanifest
├── package.json                     # Frontend dependencies & Vite scripts
├── PORTAL_SYSTEM_GUIDE.md           # Interactive component event & click reaction map
├── DEPLOYMENT_ROADMAP.md            # 5-Phase Vercel & Subdomain DNS deployment guide
├── PROJECT_MASTER_REPORT.md         # Master Technical & Operations Report (This Document)
├── public/
│   ├── favicon.svg                  # High-res vector HiPRO Red/Blue SVG Favicon
│   └── site.webmanifest             # Android/iOS PWA manifest metadata
├── src/
│   ├── App.jsx                      # Router root, Dark theme state, Protected Admin routes
│   ├── index.css                    # HSL CSS variables, glassmorphic cards, micro-animations
│   ├── main.jsx                     # Vite React DOM entrypoint
│   ├── components/
│   │   ├── Header.jsx               # Top navbar with live subdomain badge & theme toggle
│   │   ├── Footer.jsx               # Helpdesk contacts & discrete Officer Login link
│   │   ├── HeroSection.jsx          # Hero title, trust metrics grid & category selector
│   │   ├── EmpanelmentForm.jsx      # 5-Step Registration Wizard with progress fill & draft save
│   │   ├── GstVerifier.jsx          # Real GSTIN/PAN auto-decoder & state code resolver
│   │   ├── PaymentSlip.jsx          # Processing fee breakdown & MSME Udyam waiver slip
│   │   ├── SecurityCaptcha.jsx      # Anti-Bot Math Challenge verification
│   │   ├── EligibilityCalculator.jsx# Interactive score engine (0-100) & Class A/B tier evaluator
│   │   ├── ActiveTenders.jsx        # Live tender opportunity radar grid
│   │   ├── SupportWidget.jsx        # Floating 24/7 Procurement Helpdesk widget
│   │   └── SuccessModal.jsx         # Confetti celebration & PDF receipt modal
│   └── pages/
│       ├── Home.jsx                 # Public portal dashboard (/)
│       ├── ApplyPage.jsx            # Dedicated full-page registration route (/apply)
│       ├── TrackPage.jsx            # Dedicated status tracking route (/track)
│       ├── GuidelinesPage.jsx       # Vendor onboarding policy route (/guidelines)
│       ├── AdminLoginPage.jsx       # Corporate officer login screen (/admin-login)
│       └── AdminPage.jsx            # Protected procurement database dashboard (/admin)
└── backend/
    ├── server.js                    # Secure Express API, SQLite database setup, Helmet & RateLimiter
    ├── package.json                 # Backend dependencies (express, sqlite3, multer, helmet)
    ├── ecosystem.config.js          # PM2 cluster configuration for VPS
    └── README_VPS_DEPLOYMENT.md     # VPS deployment & SSH setup guide
```

---

## 🔐 SECURITY & DATA PROTECTION MATRIX

To ensure enterprise safety, multi-layered security controls have been built directly into the system:

1. **Helmet HTTP Security Headers:** Enforces XSS Filter, HSTS (Strict Transport Security), X-Frame-Options (Clickjacking Prevention), and X-Content-Type-Options.
2. **IP Rate-Limiting:** Protects VPS endpoints against DDoS and brute-force attacks (`100 requests / 15 mins`, `10 form submissions / hour`).
3. **Strict MIME-Type File Whitelisting:** Accepts only `.pdf`, `.jpg`, `.jpeg`, and `.png` document formats (Max 10MB limit). Executable files (`.exe`, `.bat`, `.php`, `.sh`) are rejected at the server level.
4. **SHA-256 Application Cryptographic Hash Signatures:** Computes a unique digital audit signature (`SHA256: 8f3a...`) for every submitted record to prevent tampering.
5. **Anti-Bot Math Captcha Verification:** Step 5 requires human verification before sending payloads to the server.
6. **Parameterized SQLite Queries:** Prevents SQL Injection vulnerabilities by binding all SQL variables (`?` parameters).
7. **Protected Admin Route:** Corporate Admin Panel (`/admin`) is hidden from public navigation and requires password authentication (`HindustanAdmin2026#`).

---

## 🐙 GIT REPOSITORY & COMMIT LOG

**Repository URL:** `https://github.com/hindustan-groups/Empanelment-Portal`  
**Default Branch:** `master`  
**Status:** Clean, 100% synchronized with `origin/master`.

### Commit Trajectory:
- `abcd277` — *Enterprise Security Hardening: Helmet security headers, rate-limiting, SHA-256 hash signatures, MIME-type file whitelisting, and Anti-Bot Math Captcha*
- `c423e6d` — *Real Enterprise Upgrade: Authentic GSTN format audit, Processing Fee & MSME Waiver slip, and File Drag-and-Drop upload cards*
- `fb99ece` — *Add HiPRO brand vector favicon, Apple touch icon, and webmanifest for multi-device support*
- `c63e76e` — *UI/UX Enhancements: Floating Procurement Support Widget, micro-animations, refined typography, and shadow glow aesthetics*
- `1d4bf5a` — *Protect Admin Dashboard with Corporate Officer Authentication (/admin-login) and clean public navbar*
- `edca4a4` — *Convert portal to dedicated multi-page enterprise router architecture (/ , /apply , /track , /guidelines , /admin)*

---

## 🚀 GO-LIVE & DEPLOYMENT PLAYBOOK

### 1. Vercel Frontend Deployment (`empanel.hindustanprojects.in`)
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Import repository **`hindustan-groups/Empanelment-Portal`**.
3. Keep Root Directory as `./` and click **Deploy**.
4. In Project Settings ➔ **Domains**, add `empanel.hindustanprojects.in`.

### 2. DNS Subdomain Mapping
In your domain registrar DNS settings for `hindustanprojects.in`:
- **Record Type:** `CNAME`
- **Host / Name:** `empanel`
- **Target Value:** `cname.vercel-dns.com`

### 3. VPS Backend Deployment & Maintenance
Connect to your VPS server via SSH and execute:
```bash
# Clone and setup
git clone https://github.com/hindustan-groups/Empanelment-Portal.git
cd Empanelment-Portal/backend
npm install

# Start with PM2 Process Manager
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Database Backup & Maintenance
The SQLite database is stored at `backend/empanelment.db`. Backup the database weekly using:
```bash
cp backend/empanelment.db backend/backups/empanelment_backup_$(date +%Y%m%d).db
```

---

## 📞 MAINTENANCE CONTACTS & HANDOVER

- **Organization:** Hindustan Projects (**HiPRO**)
- **Portal URL:** `empanel.hindustanprojects.in`
- **Corporate Main Site:** `hindustanprojects.in`
- **Support Helpline:** +91 (011) 4500 8899 / 900
- **Official Email:** empanelment@hindustanprojects.in

*Report Prepared & Verified for Hindustan Projects Procurement Committee.*
