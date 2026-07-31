# Hindustan Projects (HiPRO) - Complete System Architecture & Interactive Event Map

This guide provides a comprehensive breakdown of every page, component, user action, and system reaction across the **Hindustan Projects Empanelment Web Portal** (`empanel.hindustanprojects.in`).

---

## 🗺️ Interactive Component & Event Reactions Map

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    HEADER NAVBAR                                        │
│  Logo ──► Home (/)  │  Empanelment Form ──► /apply  │  Track ──► /track  │  Theme Toggle│
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                             │
      ┌──────────────────────────────────────┼──────────────────────────────────────┐
      ▼                                      ▼                                      ▼
┌───────────┐                          ┌───────────┐                          ┌───────────┐
│  / (HOME) │                          │  /apply   │                          │  /track   │
└─────┬─────┘                          └─────┬─────┘                          └─────┬─────┘
      │                                      │                                      │
      ├─► Category Cards                     ├─► 5-Step Form Wizard                 └─► Search ID
      │   (Sets active category &             │   (Validates fields,                     (Queries VPS
      │   opens /apply)                      │   auto-saves draft)                      Database)
      │                                      │
      ├─► Score Calculator                   ├─► GstVerifier Tool
      │   (Adjusts Turnover/Years,               (Decodes State, Entity,
      │   calculates Class A/B Tier)             auto-fills PAN)
      │                                      │
      └─► Active Tenders Radar               └─► Submit Form & Uploads
          (Matches vendor to tenders)            (Generates HP-EMP-XXXXXX,
                                                 fires Confetti animation)
```

---

## 🛠️ Detailed Component Reaction Specs

### 1. `Header.jsx` (Top Navigation Bar)
- **Logo Click**: Triggers React Router to navigate smoothly to `/`.
- **"Empanelment Form" Button**: Highlights active state (Royal Blue background) and navigates to `/apply`.
- **"Track Status" & "Guidelines" Buttons**: Navigate to `/track` and `/guidelines`.
- **Theme Toggle (Sun/Moon Icon)**: Toggles `.dark` class on the root `<html>` element, instantly updating all CSS tokens for dark/light mode across every page.

### 2. `HeroSection.jsx` & Category Selector
- **Category Card Click**:
  - Highlights selected category card with a glowing blue border and checkmark badge.
  - Updates state `selectedCategory` (Civil, MEP, Suppliers, Architects, Equipment, Site Logistics).
  - Automatically redirects/scrolls to `/apply` with that category pre-filled.

### 3. `EligibilityCalculator.jsx` (Vendor Score Engine)
- **Turnover Slider (₹10L to ₹10Cr+)**: Dynamically recalculates turnover score (0 - 40 Pts).
- **Experience Slider (1 to 15+ Yrs)**: Recalculates operation experience score (0 - 20 Pts).
- **PSU Credentials & ISO Cert Checkboxes**: Toggling checkboxes dynamically adds +20 Pts each.
- **Score Update Reaction**:
  - `Score >= 75`: Class A Prime Partner (#10B981 Green badge).
  - `Score >= 50`: Class B Approved Vendor (#F59E0B Amber badge).
  - `Score < 50`: Class C Vendor (#3B82F6 Blue badge).

### 4. `GstVerifier.jsx` (Live GSTIN & PAN Auto-Decoder in Step 2)
- **Typing 15-Digit GSTIN (e.g. `08AAAAA0000A1Z5`)**:
  - Auto-extracts State Name (e.g. `08` ➔ *Rajasthan*, `07` ➔ *Delhi*, `27` ➔ *Maharashtra*).
  - Auto-extracts Entity Type (e.g. `C` ➔ *Company*, `P` ➔ *Proprietorship*, `F` ➔ *Partnership/LLP*).
  - Auto-populates extracted 10-character PAN Card Number (`AAAAA0000A`).
  - Displays green `✓ Verified GST Active` compliance badge.

### 5. `EmpanelmentForm.jsx` (5-Step Registration Wizard)
- **Step Switching (1 ➔ 2 ➔ 3 ➔ 4 ➔ 5)**:
  - Validates required fields on current step before advancing.
  - Highlights missing inputs with red border & error message.
  - Updates top visual progress bar (`20%`, `40%`, `60%`, `80%`, `100%`).
- **"Save Progress" Button**: Saves draft form data into `localStorage`, displays "Draft Saved!" badge for 3 seconds.
- **File Upload Engine**: Displays live uploaded file name & size for GST Certificate, PAN Copy, Cheque, and Experience Certificates.
- **Form Submit Reaction**:
  - Sends FormData payload to VPS Backend API (`http://localhost:5000/api/empanelment/submit`).
  - Generates 9-digit Reference Code (e.g., `HP-EMP-849201`).
  - Triggers canvas-confetti celebration animation.
  - Opens `SuccessModal.jsx` with reference code & PDF download option.

### 6. `ActiveTenders.jsx` (Live Opportunity Radar)
- **"Empanel To Bid" Button**: Auto-selects corresponding tender category (Civil, MEP, Suppliers) and opens `/apply`.

### 7. `SupportWidget.jsx` (Floating Helpdesk)
- **Bottom-Right Floating Action Button**: Expands support card showing helpline phone (`+91 011 4500 8899`), email (`empanelment@hindustanprojects.in`), and guidelines link.

### 8. `AdminLoginPage.jsx` & `AdminPage.jsx` (Corporate Security)
- **Footer "Corporate Officer Login" Link**: Navigates to `/admin-login`.
- **Password Authentication (`HindustanAdmin2026#`)**: Sets session in `localStorage`, unlocks protected `/admin` dashboard.
- **Admin Dashboard Actions**: Live search bar, category filter, and Database Refresh button to query VPS SQLite database (`empanelment.db`).
