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

// Auto Scroll To Top Component on Route Navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('civil');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

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
      const currentCounter = parseInt(localStorage.getItem('hipro_emp_counter') || '25', 10);
      const formattedNum = currentCounter < 100 ? currentCounter.toString().padStart(3, '0') : currentCounter.toString();
      trackingCode = `HP-EMP-${formattedNum}`;
      localStorage.setItem('hipro_emp_counter', (currentCounter + 1).toString());
    }

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
      gst_doc: formData?.gstDoc?.name || 'gst_certificate.pdf',
      pan_doc: formData?.panDoc?.name || 'pan_card.pdf',
      bank_doc: formData?.bankDoc?.name || 'cancelled_cheque.pdf',
      exp_doc: formData?.expDoc?.name || 'completion_certificate.pdf',
      signatory_name: formData?.signatoryName || formData?.contactName || 'Authorized Signatory',
      signature_data: formData?.signature || null,
      status: 'Under Verification',
      current_stage: 'Financial Committee Audit',
      ip_address: '103.45.12.' + Math.floor(Math.random() * 200),
      admin_remarks: '',
      submitted_at: new Date().toISOString()
    };

    // Save to localStorage hipro_vps_applications
    try {
      const existing = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const updated = [newApplication, ...existing];
      localStorage.setItem('hipro_vps_applications', JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save application to local storage:', err);
    }

    setSubmittedId(trackingCode);
    setLastSubmittedData({ ...formData, tracking_id: trackingCode, submitted_at: newApplication.submitted_at });
    setIsSuccessOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        
        {/* Top Public Navbar */}
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme}
        />

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

            {/* Vendor Auth & Portal Dashboard */}
            <Route path="/vendor-login" element={<VendorLoginPage />} />
            <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
            
            {/* Isolated Unlisted Internal Admin Security Gateway */}
            <Route 
              path="/internal-portal-login" 
              element={
                <AdminLoginPage 
                  onLoginSuccess={handleAdminLogin} 
                />
              } 
            />
            <Route path="/admin-login" element={<Navigate to="/internal-portal-login" replace />} />

            <Route 
              path="/internal-admin-dashboard" 
              element={
                isAdminAuth ? (
                  <AdminPage 
                    isAuthenticated={isAdminAuth} 
                    onLogout={handleAdminLogout} 
                  />
                ) : (
                  <Navigate to="/internal-portal-login" replace />
                )
              } 
            />
            <Route path="/admin" element={<Navigate to="/internal-admin-dashboard" replace />} />
          </Routes>
        </main>

        {/* Floating Support Widget for Vendor Assistance */}
        <SupportWidget />

        {/* Footer */}
        <Footer />

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
    </Router>
  );
}
