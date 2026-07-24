# Hindustan Projects (HiPRO) - Empanelment Web Portal

Official Empanelment & Vendor Registration Web Application designed for **Hindustan Projects** (`hindustanprojects.in`), optimized for deployment on the subdomain **`empanel.hindustanprojects.in`**.

![HiPRO Logo](src/components/Logo.jsx)

---

## 🚀 Key Features

1. **Brand Aligned Design System**:
   - Built around official HiPRO brand colors (Vibrant Red `#ED1C24` & Royal Navy Blue `#0047AB`).
   - Dynamic **Dark / Light Mode** toggle.
   - Glassmorphism UI elements and responsive layout.

2. **5-Step Interactive Empanelment Form**:
   - **Step 1: Company Profile & Contact Info** (Entity type, established year, designation, address).
   - **Step 2: Statutory Compliance & Banking** (GSTIN, PAN, MSME, Bank account, IFSC).
   - **Step 3: Turnover & Track Record** (Last 3 years audited turnovers in Lakhs/Crores, largest executed orders, PSU registrations).
   - **Step 4: Verification Attachments** (GST Certificate, PAN Card, Cancelled Cheque, Work Experience).
   - **Step 5: Review & Undertaking** (Anti-blacklisting declaration & authorized digital signature).

3. **Subdomain Tracking & Status Checker**:
   - Live Application Tracking Modal with reference codes (e.g., `HP-EMP-849201`).
   - Guidelines & Checklist Modal for vendors before applying.
   - PDF Download & Confetti animation on successful form filing.

4. **Git & Company Repository Ready**:
   - Connected to remote repository: `https://github.com/hindustan-groups/Empanelment-Portal.git`

---

## 🌐 Subdomain Setup Guide (`empanel.hindustanprojects.in`)

To connect this portal to your subdomain:

1. **Log in to your Domain Registrar** (GoDaddy / Namecheap / Hostinger / Cloudflare) for `hindustanprojects.in`.
2. Go to **DNS Management / DNS Zone Editor**.
3. Add a new DNS Record:
   - **Type**: `CNAME` (if hosting on Vercel/Netlify) or `A Record` (if hosting on VPS/Server IP).
   - **Host / Name**: `empanel`
   - **Target / Value**: Your hosting URL (e.g., `cname.vercel-dns.com` or Server IP `192.x.x.x`).
   - **TTL**: Automatic (3600).
4. Save DNS changes. It takes between 15 minutes to 2 hours for DNS propagation worldwide.

---

## 💻 Local Development & Build

```bash
# Navigate to project directory
cd C:\Users\HP\.gemini\antigravity\scratch\hindustan-projects-empanelment

# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📤 Push Changes to GitHub Repository

```bash
git push -u origin master
```
