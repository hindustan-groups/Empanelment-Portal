# Hindustan Projects (HiPRO) - VPS Backend Deployment Guide

This Node.js + Express + SQLite backend handles vendor empanelment form submissions, document file uploads, application status tracking, and admin records.

---

## 🛠️ Step-by-Step VPS Deployment Instructions

### 1. Copy `backend` Folder to your VPS
Upload or git pull `D:\HindustanProjects\backend` to your VPS server directory (e.g. `/var/www/hipro-backend`).

### 2. Install Node.js & Dependencies on VPS
Run on your VPS SSH terminal:

```bash
cd /var/www/hipro-backend
npm install
```

### 3. Start Server 24/7 using PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Start Backend Server
pm2 start server.js --name "hipro-backend"

# Save PM2 process list so it automatically restarts on VPS reboot
pm2 save
pm2 startup
```

### 4. Setup Nginx Reverse Proxy (Optional / Recommended for HTTPS)
Add this location block to your Nginx site config (e.g. `/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name api.hindustanprojects.in;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📡 API Endpoints Summary

- **Submit Form & Documents**: `POST /api/empanelment/submit` (Multipart FormData)
- **Track Status**: `GET /api/empanelment/status/:trackingId`
- **Admin Applications List**: `GET /api/empanelment/admin/applications`
- **Uploaded Documents**: `GET /uploads/:filename`
