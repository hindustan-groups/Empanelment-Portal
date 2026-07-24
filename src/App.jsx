import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';

// Multi-Page Routes
import Home from './pages/Home';
import ApplyPage from './pages/ApplyPage';
import TrackPage from './pages/TrackPage';
import GuidelinesPage from './pages/GuidelinesPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('civil');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

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

  const handleFormSubmit = (formData, customTrackingId) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = customTrackingId || `HP-EMP-${randomCode}`;
    
    setSubmittedId(trackingCode);
    setLastSubmittedData(formData);
    setIsSuccessOpen(true);
  };

  return (
    <Router>
      <div className="app-container">
        
        {/* Top Navbar */}
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
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

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
