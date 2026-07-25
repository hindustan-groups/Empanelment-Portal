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

  // Admin Auth State
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('hipro_admin_session') === 'true';
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
    localStorage.setItem('hipro_admin_session', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('hipro_admin_session');
  };

  const handleFormSubmit = (formData, customTrackingId) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = customTrackingId || `HP-EMP-${randomCode}`;
    
    setSubmittedId(trackingCode);
    setLastSubmittedData(formData);
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
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin-login" 
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
