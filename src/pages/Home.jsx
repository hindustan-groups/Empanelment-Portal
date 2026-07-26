import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
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

      {/* 4-Step Empanelment Journey Workflow */}
      <div style={{ maxWidth: 1200, margin: '3.5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: 9999, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.775rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <CheckCircle2 style={{ width: 14, height: 14, color: '#10B981' }} />
            <span>Fast-Track Corporate Onboarding</span>
          </div>
          <h3 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
            Transparent 4-Stage Verification Workflow
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Streamlined digital evaluation compliant with CVC & Central Procurement Guidelines
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {[
            { num: '01', title: 'Entity Selection & Profile', desc: 'Select Sole Proprietor or Corporate Firm type. Fill contact details and primary discipline.', color: '#0047AB', bg: 'rgba(0, 71, 171, 0.08)' },
            { num: '02', title: 'Tax & GST Screening', desc: 'Verify 15-digit GSTIN and 10-character PAN card with automated statutory compliance check.', color: '#ED1C24', bg: 'rgba(237, 28, 36, 0.08)' },
            { num: '03', title: 'Financial & Capability Audit', desc: 'Submit 3-year turnovers, bank payout details, machinery checklist & past work orders.', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' },
            { num: '04', title: 'Certificate Issuance', desc: 'Digital signature verification, SHA-256 hash stamp, Class-A/B empanelment certificate issued.', color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
          ].map(s => (
            <div key={s.num} style={{ padding: '1.5rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.25s ease' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                {s.num}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>{s.title}</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Banner for Dedicated Form Page */}
      <div style={{ maxWidth: 1200, margin: '0 auto 3.5rem auto', padding: '0 1.5rem' }}>
        <div style={{ padding: '2.25rem 2.5rem', borderRadius: 24, background: 'linear-gradient(135deg, #002B66 0%, #0047AB 60%, #0F172A 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '0 16px 40px rgba(0, 71, 171, 0.3)' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#FCA5A5', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Building2 style={{ width: 14, height: 14 }} />
              <span>Official Vendor Registration Portal</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.35rem', letterSpacing: '-0.5px' }}>Ready to Empanel Your Organization?</h3>
            <p style={{ fontSize: '0.925rem', opacity: 0.9, maxWidth: 620, lineHeight: 1.5 }}>
              Complete the digital empanelment application on our dedicated registration portal page. Fast-track approval for active tenders.
            </p>
          </div>

          <button onClick={() => navigate('/apply')} className="btn-accent" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: 14 }}>
            <span>Start Empanelment Application</span>
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
