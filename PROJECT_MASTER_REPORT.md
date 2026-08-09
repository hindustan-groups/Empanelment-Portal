# HINDUSTAN PROJECTS (HiPRO) - MASTER PROJECT REPORT & OPERATIONS MANUAL

**Project Title:** Official Vendor & Contractor Empanelment Portal  
**Target Domain:** `empanel.hindustanprojects.in`  
**Primary Corporate Site:** `hindustanprojects.in`  
**GitHub Repository:** `https://github.com/hindustan-groups/Empanelment-Portal`  
**Local Workspace:** `C:\Users\HP\.gemini\antigravity\scratch\hindustan-projects-empanelment`  
**Report Generated:** August 8, 2026  
**Latest Git Commit:** `11005a3` (*fix(improvements): align 10MB file limit, update email template URLs, fix React hook order in VendorIdCardModal, and sanitize blood group default*)  

---

## 1. EXECUTIVE SUMMARY & CORPORATE IDENTITY

Hindustan Projects (**HiPRO**) has established an official, enterprise-grade, paperless digital empanelment portal designed to onboard EPC Civil Contractors, MEP Services, Goods Suppliers, Architects, Equipment Rentals, and Site Logistics Partners for active infrastructure and commercial building projects across India.

### Key Brand & Operational Tokens:
- **Corporate Colors:** Brand Red (`#ED1C24`) and Royal Blue (`#0047AB`).
- **Target Subdomain:** `empanel.hindustanprojects.in`
- **Primary Domain:** `hindustanprojects.in`
- **Procurement Helpdesk:** `empanelment@hindustanprojects.in` | `+91 (011) 4500 8899` | `+91 7597000601`
- **Headquarters Address:** Bhopal Ganj, Bhilwara (Raj.) - 311001

---

## 2. 🏗️ SYSTEM & CODE ARCHITECTURE

The application follows a decoupled, high-performance web architecture split into a lightweight Single-Page Application (SPA) frontend and a secure VPS Node.js REST API backend with SQLite database persistence.

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
│       Directory: hindustan-projects-empanelment/backend                               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Technical Stack Details:
- **Frontend Stack:** React 18, Vite 8.1.5, React Router DOM 6.22, Lucide React Icons, Canvas Confetti.
- **Backend Stack:** Node.js, Express 4.19, SQLite3 5.1, Multer 1.4, Helmet 7.1, Express Rate Limit 7.2.
- **Design Tokens:** Pure HSL Vanilla CSS variables, Glassmorphism panels, CSS Dark/Light Theme variables (`.dark`), Micro-animations.

---

## 3. 📂 PROJECT DIRECTORY STRUCTURE & FILE MAP

```
hindustan-projects-empanelment/
├── index.html                       # Base HTML, HiPRO Vector SVG Favicon & Webmanifest
├── package.json                     # Frontend dependencies & Vite build scripts
├── PORTAL_SYSTEM_GUIDE.md           # Interactive component event & click reaction map
├── DEPLOYMENT_ROADMAP.md            # 5-Phase Vercel & Subdomain DNS deployment guide
├── PROJECT_MASTER_REPORT.md         # Master Technical & Operations Report (This Document)
├── vercel.json                      # Vercel SPA rewrite configuration
├── vite.config.js                   # Vite build configuration
├── public/
│   ├── favicon.svg                  # High-res vector HiPRO Red/Blue SVG Favicon
│   ├── site.webmanifest             # Android/iOS PWA manifest metadata
│   ├── hipro-logo.png               # High-res corporate logo
│   ├── lanyard-official.jpg         # 20mm Navy Blue Lanyard Product Asset
│   └── ceo-signature-exact-final.png# CEO Digital Signature Stamp Asset
├── src/
│   ├── App.jsx                      # Router root, Dark theme state, Protected Admin routes
│   ├── index.css                    # HSL CSS variables, glassmorphic cards, micro-animations
│   ├── main.jsx                     # Vite React DOM entrypoint
│   ├── pages/ (15 Dedicated Client Routes)
│   │   ├── Home.jsx                 # Public portal dashboard (/)
│   │   ├── ApplyPage.jsx            # 5-Step Registration Wizard (/apply)
│   │   ├── TrackPage.jsx            # Dedicated status tracking & audit timeline (/track)
│   │   ├── GuidelinesPage.jsx       # Vendor onboarding manual & NBC 2016 standards (/guidelines)
│   │   ├── AboutUs.jsx              # Corporate profile & leadership team (/about)
│   │   ├── ContactPage.jsx          # Helpdesk contacts & inquiry form (/contact)
│   │   ├── TendersPage.jsx          # Active tender opportunities radar (/tenders)
│   │   ├── PrivacyPage.jsx          # Full Data Protection Policy (/privacy)
│   │   ├── TermsPage.jsx            # Full Legal & Terms Policy (/terms)
│   │   ├── VendorLoginPage.jsx      # Vendor Dashboard Sign-In (/vendor-login)
│   │   ├── VendorDashboardPage.jsx # Vendor Portal Dashboard (/vendor-dashboard)
│   │   ├── AdminLoginPage.jsx       # Corporate officer login screen (/admin-login)
│   │   ├── AdminPage.jsx            # Protected procurement database dashboard (/admin)
│   │   ├── VerifyPassPage.jsx       # Daily Site QR Gate Pass verification route (/verify-pass)
│   │   └── NotFoundPage.jsx         # Custom 404 error page
│   ├── components/ (24 Interactive Components)
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
│   │   ├── SuccessModal.jsx         # Confetti celebration & PDF receipt modal
│   │   ├── VendorIdCardModal.jsx    # Dual CR80 Smart PVC Card & 3D Lanyard Mockup
│   │   ├── GatePassModal.jsx        # Daily 24-Hour QR Site Gate Pass Generator
│   │   ├── ContractManager.jsx      # Milestone payout & contract manager component
│   │   ├── DigitalSignature.jsx     # E-Signature canvas component
│   │   ├── AdminDrawer.jsx          # Mobile slide-out drawer for admin panel
│   │   ├── CategoryMatrixModal.jsx  # Vendor tier eligibility matrix modal
│   │   ├── StatusModal.jsx          # Application status timeline modal
│   │   ├── PrivacyPolicyModal.jsx   # Data protection policy modal
│   │   ├── TermsModal.jsx           # Legal terms & conditions modal
│   │   ├── GuideModal.jsx           # Onboarding step guide modal
│   │   ├── PortalPreviewObject.jsx  # Interactive portal UI preview component
│   │   ├── ErrorBoundary.jsx        # Crash-proof React Error Boundary wrapper
│   │   └── Logo.jsx                 # Dynamic vector logo renderer
│   └── utils/
│       ├── printDossier.js          # Multi-Page A4 Print Engine for Dossiers & Certificates
│       └── printCard.js             # High-DPI Smart PVC ID Card Print Engine
└── backend/
    ├── server.js                    # Secure Express API, SQLite database setup, Helmet & RateLimiter
    ├── package.json                 # Backend dependencies (express, sqlite3, multer, helmet)
    ├── ecosystem.config.js          # PM2 cluster configuration for VPS
    └── README_VPS_DEPLOYMENT.md     # VPS deployment & SSH setup guide
```

---

## 4. 🔐 SECURITY & DATA PROTECTION MATRIX

Multi-layered security controls are built into the system:

1. **Helmet HTTP Security Headers:** Enforces XSS Filter, HSTS, X-Frame-Options (Clickjacking Prevention), and X-Content-Type-Options.
2. **IP Rate-Limiting:** Protects endpoints against DDoS & brute-force (`100 requests / 15 mins`, `10 submissions / hour`).
3. **Strict MIME-Type File Whitelisting:** Accepts only `.pdf`, `.jpg`, `.jpeg`, and `.png` formats (Max 10MB limit). Executables (`.exe`, `.sh`, `.php`) rejected.
4. **SHA-256 Application Signatures:** Computes a unique digital audit signature (`SHA256: 8f3a...`) for every submitted record.
5. **Anti-Bot Math Captcha:** Step 5 requires human verification before sending payloads.
6. **Parameterized SQLite Queries:** Prevents SQL injection vulnerabilities by binding parameters (`?`).
7. **Protected Admin Route:** Corporate Admin Panel (`/admin`) requires password authentication (`HindustanAdmin2026#`).
8. **Updated Authentication Security:** Credentials error messages and password hints use **Registered Corporate Email Address**, **GSTIN**, or **Tracking ID**.

---

## 5. 🐙 GIT REPOSITORY & COMMIT LOG

**Repository URL:** `https://github.com/hindustan-groups/Empanelment-Portal`  
**Default Branch:** `master`  
**Status:** Clean, 100% synchronized with `origin/master`.

### Commit Trajectory:
- `11005a3` — *fix(improvements): align 10MB file limit, update email template URLs, fix React hook order in VendorIdCardModal, and sanitize blood group default*
- `be74c1a` — *fix(data): ensure SQLite DB application records take 100% precedence in AdminPage and hydrate siteConfig from DB on mount*
- `8e88a1e` — *fix(cms): remove Section 5 Empanelment Application Fee & Tax Settings from AdminPage.jsx*
- `e1b162d` — *docs: update README_VPS_DEPLOYMENT.md nginx port to 9000*
- `5a25b6f` — *feat(cms): add site_config DB table & real-time VPS API endpoints so CMS edits in Admin instantly sync across all Mobile & Desktop devices worldwide*
- `a6c7a5e` — *fix(auth): update credential validation hint and error message to use Registered Email Address instead of mobile number*
- `214f479` — *feat(dossier-and-legal): overhaul print dossier A4 page layout density and expand guidelines, privacy, and terms pages*
- `abcd277` — *Enterprise Security Hardening: Helmet security headers, rate-limiting, SHA-256 hash signatures, MIME-type file whitelisting, and Anti-Bot Math Captcha*
- `c423e6d` — *Real Enterprise Upgrade: Authentic GSTN format audit, Processing Fee & MSME Waiver slip, and File Drag-and-Drop upload cards*
- `fb99ece` — *Add HiPRO brand vector favicon, Apple touch icon, and webmanifest for multi-device support*
- `c63e76e` — *UI/UX Enhancements: Floating Procurement Support Widget, micro-animations, refined typography, and shadow glow aesthetics*
- `1d4bf5a` — *Protect Admin Dashboard with Corporate Officer Authentication (/admin-login) and clean public navbar*
- `edca4a4` — *Convert portal to dedicated multi-page enterprise router architecture (/ , /apply , /track , /guidelines , /admin)*

---

## 6. 🚀 GO-LIVE & DEPLOYMENT PLAYBOOK

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
```bash
git clone https://github.com/hindustan-groups/Empanelment-Portal.git
cd Empanelment-Portal/backend
npm install
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Database Backup & Maintenance
The SQLite database is stored at `backend/empanelment.db`. Backup weekly:
```bash
cp backend/empanelment.db backend/backups/empanelment_backup_$(date +%Y%m%d).db
```

---

## 📞 MAINTENANCE CONTACTS & HANDOVER

- **Organization:** Hindustan Projects (**HiPRO**)
- **Portal URL:** `empanel.hindustanprojects.in`
- **Corporate Main Site:** `hindustanprojects.in`
- **Support Helpline:** +91 (011) 4500 8899 / 900 | +91 7597000601
- **Official Email:** empanelment@hindustanprojects.in

*Report Prepared & Verified for Hindustan Projects Procurement Committee.*
