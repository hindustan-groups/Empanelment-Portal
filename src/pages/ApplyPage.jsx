import React from 'react';
import EmpanelmentForm from '../components/EmpanelmentForm';
import { ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplyPage({ selectedCategory, onFormSubmit }) {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      
      {/* Top Header Bar */}
      <div style={{ maxWidth: 1000, margin: '0 auto 1.5rem auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <ArrowLeft style={{ width: 14, height: 14 }} />
          <span>Back to Home</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <ShieldCheck style={{ width: 16, height: 16, color: '#10B981' }} />
          <span>256-Bit SSL Encrypted Registration Form</span>
        </div>
      </div>

      {/* Empanelment Form Component */}
      <EmpanelmentForm 
        category={selectedCategory}
        onFormSubmit={onFormSubmit}
      />

    </div>
  );
}
