import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EmpanelmentForm from './components/EmpanelmentForm';
import StatusModal from './components/StatusModal';
import GuideModal from './components/GuideModal';
import SuccessModal from './components/SuccessModal';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';
import { Database } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('civil');
  
  // Modals state
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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

  const handleStartForm = () => {
    const el = document.getElementById('empanelment-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (formData, customTrackingId) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = customTrackingId || `HP-EMP-${randomCode}`;
    
    setSubmittedId(trackingCode);
    setLastSubmittedData(formData);
    setIsSuccessOpen(true);
  };

  return (
    <div className="app-container">
      
      {/* Header Navigation */}
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        onOpenStatusModal={() => setIsStatusOpen(true)}
        onOpenGuideModal={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Admin Bar Trigger for Hindustan Projects Team */}
        <div style={{ backgroundColor: '#0F172A', color: 'white', padding: '0.4rem 1.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>🏢 <strong>Hindustan Projects Corporate Portal</strong> — Head Office & Pan-India Procurements</span>
          <button
            onClick={() => setIsAdminOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: '#60A5FA', fontWeight: 700, cursor: 'pointer', fontSize: '0.75rem' }}
          >
            <Database style={{ width: 14, height: 14 }} />
            <span>Procurement Admin Records</span>
          </button>
        </div>

        {/* Hero Section */}
        <HeroSection 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          onStartForm={handleStartForm}
        />

        {/* 5-Step Empanelment Form */}
        <EmpanelmentForm 
          category={selectedCategory}
          onFormSubmit={handleFormSubmit}
        />
      </main>

      {/* Footer - Page Ends Here Cleanly */}
      <Footer />

      {/* Modals - Only Render When Triggered (No DOM Overflow) */}
      {isStatusOpen && (
        <StatusModal 
          isOpen={isStatusOpen} 
          onClose={() => setIsStatusOpen(false)} 
        />
      )}

      {isGuideOpen && (
        <GuideModal 
          isOpen={isGuideOpen} 
          onClose={() => setIsGuideOpen(false)} 
        />
      )}

      {isSuccessOpen && (
        <SuccessModal 
          isOpen={isSuccessOpen}
          trackingId={submittedId}
          formData={lastSubmittedData}
          onClose={() => setIsSuccessOpen(false)}
        />
      )}

      {isAdminOpen && (
        <AdminDrawer
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
