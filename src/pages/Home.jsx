import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import EligibilityCalculator from '../components/EligibilityCalculator';
import ActiveTenders from '../components/ActiveTenders';
import { ShieldCheck, Award, FileText, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export default function Home({ selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();

  const handleStartForm = () => {
    navigate('/apply');
  };

  return (
    <div>
      {/* Hero Banner & Category Filter */}
      <HeroSection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onStartForm={handleStartForm}
      />

      {/* PRO Tool: Vendor Score Calculator */}
      <EligibilityCalculator 
        onApplyCategory={handleStartForm}
      />

      {/* Quick Action Banner for Dedicated Form Page */}
      <div style={{ maxWidth: 1100, margin: '0 auto 3rem auto', padding: '0 1.5rem' }}>
        <div style={{ padding: '2rem', borderRadius: 20, background: 'linear-gradient(135deg, #002B66 0%, #0047AB 70%, #0F172A 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', boxShadow: 'var(--shadow-lg)' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#FCA5A5', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Building2 style={{ width: 14, height: 14 }} />
              <span>Official Vendor Registration Portal</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem' }}>Ready to Empanel Your Organization?</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9, maxWidth: 600 }}>
              Complete the 5-step digital empanelment application on our dedicated registration portal page.
            </p>
          </div>

          <button onClick={() => navigate('/apply')} className="btn-accent" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
            <span>Open Registration Page</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </div>
      </div>

      {/* Active Tenders Radar */}
      <ActiveTenders 
        onEmpanelCategory={(cat) => {
          setSelectedCategory(cat);
          navigate('/apply');
        }}
      />
    </div>
  );
}
