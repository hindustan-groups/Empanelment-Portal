import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import SupportWidget from './components/SupportWidget';

// Multi-Page Routes
import Home from './pages/Home';
import ApplyPage from './pages/ApplyPage';
import TrackPage from './pages/TrackPage';
import GuidelinesPage from './pages/GuidelinesPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import VendorLoginPage from './pages/VendorLoginPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import TendersPage from './pages/TendersPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import VerifyPassPage from './pages/VerifyPassPage';
import NotFoundPage from './pages/NotFoundPage';

// Auto Scroll To Top Component on Route Navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function MainAppLayout() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('civil');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  // Mobile & Browser Cache Sanitizer (Ensures Mobile devices get 100% updated data)
  useEffect(() => {
    const CURRENT_CONFIG_VERSION = 'v2026.2.5_industrial_vps9000';
    const savedVersion = localStorage.getItem('hipro_config_version');
    
    if (savedVersion !== CURRENT_CONFIG_VERSION) {
      try {
        const rawConfig = localStorage.getItem('hipro_site_config');
        if (rawConfig && (rawConfig.includes('empanelment@') || rawConfig.includes('5000'))) {
          localStorage.removeItem('hipro_site_config');
        }
      } catch (e) {}
      localStorage.setItem('hipro_config_version', CURRENT_CONFIG_VERSION);
    }
  }, []);

  // Standalone Software Portal check
  const isStandalonePortal = location.pathname.startsWith('/vendor-dashboard') || 
                             location.pathname.startsWith('/vendor-login') || 
                             location.pathname.startsWith('/internal-admin-dashboard') || 
                             location.pathname.startsWith('/internal-portal-login') || 
                             location.pathname.startsWith('/admin-login') ||
                             location.pathname.startsWith('/admin');

  // Admin Auth State & Security Session Expiry
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    const isSession = localStorage.getItem('hipro_admin_session') === 'true';
    const expiry = localStorage.getItem('hipro_admin_session_expiry');
    if (isSession && expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem('hipro_admin_session');
      localStorage.removeItem('hipro_admin_session_expiry');
      localStorage.removeItem('hipro_admin_email');
      return false;
    }
    return isSession;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleAdminLogin = () => {
    setIsAdminAuth(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('hipro_admin_session');
    localStorage.removeItem('hipro_admin_session_expiry');
    localStorage.removeItem('hipro_admin_email');
  };

  const handleFormSubmit = (formData, customTrackingId) => {
    let trackingCode = customTrackingId;

    if (!trackingCode) {
      let localApps = [];
      let deletedIds = [];
      try { localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]'); } catch (e) {}
      try { deletedIds = (JSON.parse(localStorage.getItem('hipro_deleted_applications') || '[]')).map(v => String(v).trim().toUpperCase()); } catch (e) {}

      const usedNumbers = new Set();
      localApps.forEach(app => {
        const tid = String(app.tracking_id || app.trackingId || app.id || '').toUpperCase();
        if (tid.startsWith('HP-EMP-') && !deletedIds.includes(tid)) {
          const num = parseInt(tid.replace('HP-EMP-', ''), 10);
          if (!isNaN(num)) usedNumbers.add(num);
        }
      });

      let candidate = 25;
      while (usedNumbers.has(candidate)) {
        candidate++;
      }

      const formattedNum = candidate < 100 ? candidate.toString().padStart(3, '0') : candidate.toString();
      trackingCode = `HP-EMP-${formattedNum}`;
    }

    // Ensure newly assigned trackingCode is removed from deleted blacklist so Admin loads it cleanly!
    try {
      const deleted = (JSON.parse(localStorage.getItem('hipro_deleted_applications') || '[]')).map(v => String(v).trim().toUpperCase());
      const updatedDeleted = deleted.filter(id => id !== trackingCode.toUpperCase());
      localStorage.setItem('hipro_deleted_applications', JSON.stringify(updatedDeleted));
    } catch (e) {}

    const newApplication = {
      id: Date.now(),
      tracking_id: trackingCode,
      hash_signature: '8f3a9e120bc741a8d' + Math.random().toString(36).substring(2, 10),
      category: formData?.category || 'general',
      primary_role: formData?.primaryRole || 'Contractor / Vendor',
      company_name: formData?.companyName || formData?.contactName || 'Applicant Entity',
      entity_type: formData?.entityType || 'sole_proprietor',
      est_year: formData?.estYear || '2024',
      contact_name: formData?.contactName || 'Authorized Signatory',
      designation: formData?.designation || 'Proprietor / Director',
      email: formData?.email || '',
      phone: formData?.phone || '',
      address: formData?.address || '',
      city: formData?.city || '',
      state: formData?.state || '',
      pincode: formData?.pincode || '',
      gstin: formData?.gstin || (formData?.gstExempt ? 'EXEMPT' : ''),
      pan: formData?.pan || '',
      msme_no: formData?.msmeNo || '',
      bank_account: formData?.bankAccount || '',
      bank_name: formData?.bankName || '',
      ifsc: formData?.ifsc || '',
      turnover_2023: formData?.turnover2023 || '0',
      turnover_2024: formData?.turnover2024 || '0',
      turnover_2025: formData?.turnover2025 || '0',
      largest_order: formData?.largestOrder || '0',
      bua_area: formData?.buaArea || '0',
      cpa_area: formData?.cpaArea || '0',
      existing_empanels: formData?.existingEmpanels || 'None',
      gst_doc: formData?.gstDoc?.data || formData?.gstDoc?.name || (typeof formData?.gstDoc === 'string' ? formData.gstDoc : 'gst_certificate.pdf'),
      pan_doc: formData?.panDoc?.data || formData?.panDoc?.name || (typeof formData?.panDoc === 'string' ? formData.panDoc : 'pan_card.pdf'),
      bank_doc: formData?.bankDoc?.data || formData?.bankDoc?.name || (typeof formData?.bankDoc === 'string' ? formData.bankDoc : 'cancelled_cheque.pdf'),
      exp_doc: formData?.expDoc?.data || formData?.expDoc?.name || (typeof formData?.expDoc === 'string' ? formData.expDoc : 'completion_certificate.pdf'),
      passportPhoto: formData?.passportPhoto || formData?.photo_url || formData?.photoUrl || null,
      photo_url: formData?.passportPhoto || formData?.photo_url || formData?.photoUrl || null,
      signatory_name: formData?.signatoryName || formData?.contactName || 'Authorized Signatory',
      signature_data: formData?.signature || null,
      status: 'Under Verification',
      current_stage: 'Financial Committee Audit',
      ip_address: '103.45.12.' + Math.floor(Math.random() * 200),
      admin_remarks: '',
      submitted_at: new Date().toISOString()
    };

    // Save newly submitted application to localStorage for Admin & Track portals
    try {
      const existing = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const filtered = existing.filter(a => a.tracking_id !== trackingCode && a.gstin !== newApplication.gstin);
      const updated = [newApplication, ...filtered];
      localStorage.setItem('hipro_vps_applications', JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving submitted application to local storage:', e);
    }

    setSubmittedId(trackingCode);
    setLastSubmittedData({ ...formData, tracking_id: trackingCode, submitted_at: newApplication.submitted_at });
    setIsSuccessOpen(true);
  };

  return (
    <div className="app-container">
      
      {/* Show Public Header ONLY when not in standalone software portal */}
      {!isStandalonePortal && (
        <Header />
      )}

      {/* Main Route Content */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            } 
          />

          <Route 
            path="/apply" 
            element={
              <ApplyPage 
                selectedCategory={selectedCategory}
                onFormSubmit={handleFormSubmit}
              />
            } 
          />

          <Route path="/track" element={<TrackPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/verify-pass" element={<VerifyPassPage />} />

          {/* Vendor Auth & Portal Dashboard */}
          <Route path="/vendor-login" element={<VendorLoginPage />} />
          <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
          
          {/* Admin Auth & Control Center Routes */}
          <Route 
            path="/admin-login" 
            element={
              <AdminLoginPage 
                onLoginSuccess={handleAdminLogin} 
              />
            } 
          />

          <Route 
            path="/internal-portal-login" 
            element={
              <AdminLoginPage 
                onLoginSuccess={handleAdminLogin} 
              />
            } 
          />

          <Route 
            path="/admin" 
            element={
              isAdminAuth ? (
                <AdminPage 
                  isAuthenticated={isAdminAuth} 
                  onLogout={handleAdminLogout} 
                />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            } 
          />

          <Route 
            path="/internal-admin-dashboard" 
            element={
              isAdminAuth ? (
                <AdminPage 
                  isAuthenticated={isAdminAuth} 
                  onLogout={handleAdminLogout} 
                />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            } 
          />

          {/* Global 404 Not Found Page */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Floating Support Widget ONLY on public site */}
      {!isStandalonePortal && <SupportWidget />}

      {/* Footer ONLY on public site */}
      {!isStandalonePortal && <Footer />}

      {/* Success Modal Confirmation */}
      {isSuccessOpen && (
        <SuccessModal 
          isOpen={isSuccessOpen}
          trackingId={submittedId}
          formData={lastSubmittedData}
          onClose={() => setIsSuccessOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainAppLayout />
    </Router>
  );
}
