import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EmpanelmentForm from './components/EmpanelmentForm';
import StatusModal from './components/StatusModal';
import GuideModal from './components/GuideModal';
import SuccessModal from './components/SuccessModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsModal from './components/TermsModal';
import CategoryMatrixModal from './components/CategoryMatrixModal';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('civil');
  
  // Modals
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [submittedId, setSubmittedId] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  useEffect(() => {
    // Sync dark class on root document
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

  const handleFormSubmit = (formData) => {
    // Generate unique Tracking ID e.g. HP-EMP-938210
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = `HP-EMP-${randomCode}`;
    
    setSubmittedId(trackingCode);
    setLastSubmittedData(formData);
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      
      {/* Navbar */}
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        onOpenStatusModal={() => setIsStatusOpen(true)}
        onOpenGuideModal={() => setIsGuideOpen(true)}
        onOpenCategoryModal={() => setIsCategoryOpen(true)}
      />

      {/* Main Hero & Category Filter */}
      <main className="flex-1">
        <HeroSection 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          onStartForm={handleStartForm}
        />

        {/* Dynamic Multi-step Form */}
        <EmpanelmentForm 
          category={selectedCategory}
          onFormSubmit={handleFormSubmit}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        onOpenTermsModal={() => setIsTermsOpen(true)}
        onOpenCategoryModal={() => setIsCategoryOpen(true)}
      />

      {/* Interactive Modals */}
      <StatusModal 
        isOpen={isStatusOpen} 
        onClose={() => setIsStatusOpen(false)} 
      />

      <GuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />

      <SuccessModal 
        isOpen={isSuccessOpen}
        trackingId={submittedId}
        formData={lastSubmittedData}
        onClose={() => setIsSuccessOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <CategoryMatrixModal
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
      />

    </div>
  );
}
