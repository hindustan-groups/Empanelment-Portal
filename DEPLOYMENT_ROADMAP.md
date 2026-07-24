# Hindustan Projects (HiPRO) - Complete Deployment & Live Setup Roadmap

This document outlines the step-by-step phases to take your **Empanelment Web Portal** from local preview to live production at **`empanel.hindustanprojects.in`**.

---

## 📌 Phase 1: Local Testing & Preview (ACTIVE)

The local server is already running on your laptop!

- **Local Preview URL**: [http://localhost:5173/](http://localhost:5173/)
- **Project Directory**: `D:\HindustanProjects\empanelment-portal`
- **Command to Start Manually**:
  ```powershell
  cd D:\HindustanProjects\empanelment-portal
  npm run dev
  ```

---

## 🚀 Phase 2: Deploy Frontend on Vercel (Free 1-Click Online Host)

Your codebase is already synced to GitHub: `https://github.com/hindustan-groups/Empanelment-Portal`

### Steps to Deploy:
1. Open [Vercel.com](https://vercel.com) in your browser.
2. Click **"Log In with GitHub"** (Login using your `hindustan-groups` GitHub account).
3. On the Vercel Dashboard, click **"Add New..."** ➔ **"Project"**.
4. Select the repository **`Empanelment-Portal`** from the list.
5. In **Root Directory**, leave as `./` (or select `empanelment-portal` if prompted).
6. Click **"Deploy"**.
7. Within 1 minute, Vercel will give you a live production link (e.g., `empanelment-portal.vercel.app`).

---

## 🌐 Phase 3: Subdomain Connection (`empanel.hindustanprojects.in`)

Once Vercel gives you the live project:

### Steps to Connect Subdomain:
1. Log into your Domain Registrar (GoDaddy / Hostinger / Cloudflare) where `hindustanprojects.in` is registered.
2. Navigate to **DNS Management / DNS Zone Editor**.
3. Add a new **CNAME Record**:
   - **Type**: `CNAME`
   - **Host / Name**: `empanel`
   - **Target / Value**: `cname.vercel-dns.com`
   - **TTL**: Automatic (3600)
4. Save the DNS Record.
5. Go back to Vercel ➔ **Project Settings** ➔ **Domains** ➔ Add `empanel.hindustanprojects.in`.
6. Within 15-30 minutes, your portal will be live at `https://empanel.hindustanprojects.in` with a free SSL (HTTPS) certificate!

---

## 🖥️ Phase 4: Setting Up VPS Backend Server & Database

To save submitted vendor form data and GST/PAN uploaded PDFs on your company VPS:

### Steps on VPS Server:
1. Transfer the `backend` folder to your VPS server (e.g., `/var/www/hipro-backend`).
2. Connect to your VPS via SSH and run:
   ```bash
   cd /var/www/hipro-backend
   npm install
   
   # Install PM2 Process Manager (keeps server running 24/7)
   npm install -g pm2
   pm2 start server.js --name "hipro-backend"
   pm2 save
   pm2 startup
   ```
3. Test your VPS API endpoint at: `http://YOUR-VPS-IP:5000/api/health`

---

## 🔍 Phase 5: Production Verification Checklist

- [x] HiPRO Red & Blue Brand Logo integrated.
- [x] 5-step empanelment form validation working.
- [x] Application Status Tracking modal active.
- [x] Vendor eligibility checklist modal.
- [x] PDF download & celebration confetti on filing.
- [x] Local server running on `http://localhost:5173/`.
- [ ] Vercel deployment completed.
- [ ] Subdomain `empanel.hindustanprojects.in` DNS record saved.
- [ ] VPS Backend API connected.
