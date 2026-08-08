import React, { useState } from 'react';
import { Calculator, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EligibilityCalculator({ onApplyCategory }) {
  const navigate = useNavigate();
  const [turnover, setTurnover] = useState(250); // ₹ Lakhs
  const [years, setYears] = useState(5);
  const [psuWork, setPsuWork] = useState(true);
  const [isoCert, setIsoCert] = useState(true);

  // Calculate score 0 - 100
  const turnoverScore = Math.min(Math.round((turnover / 500) * 40), 40);
  const yearsScore = Math.min(years * 4, 20);
  const psuScore = psuWork ? 20 : 0;
  const isoScore = isoCert ? 20 : 0;

  const totalScore = turnoverScore + yearsScore + psuScore + isoScore;

  let tier = 'Class C (Tier 3 Supplier)';
  let tierBadge = 'Class C Specialist';
  let tierColor = '#0047AB';
  let tierBg = 'rgba(0, 71, 171, 0.08)';
  let tierDesc = 'Qualified for Regional Sub-contracts & Material Supply Orders (< ₹ 50 Lakhs). MSME Fee Waiver Applicable.';

  if (totalScore >= 75) {
    tier = 'Class A (Prime Partner)';
    tierBadge = 'Class A Prime Partner';
    tierColor = '#047857';
    tierBg = 'rgba(16, 185, 129, 0.12)';
    tierDesc = 'Qualified for Major Turnkey EPC Infrastructure & Commercial Towers (> ₹ 5.0 Crores). EMD Waiver & Fast-track 7-Day RTGS Payouts.';
  } else if (totalScore >= 50) {
    tier = 'Class B (Approved Vendor)';
    tierBadge = 'Class B Specialist';
    tierColor = '#D97706';
    tierBg = 'rgba(245, 158, 11, 0.12)';
    tierDesc = 'Qualified for Commercial Projects, Specialist MEP Services & Bulk Materials (₹ 50 Lakhs to ₹ 5.0 Crores).';
  }

  const handleStartApplication = () => {
    if (onApplyCategory) {
      onApplyCategory();
    } else {
      navigate('/apply');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <div style={{
        padding: '1.5rem 1.15rem',
        borderRadius: 20,
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        border: '1.5px solid var(--border-color, #E2E8F0)',
        boxShadow: '0 8px 30px rgba(0, 71, 171, 0.05)'
      }}>
        
        {/* Top Header & Live Rating Badges */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.725rem',
              fontWeight: 800,
              color: '#0047AB',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
              padding: '0.2rem 0.65rem',
              borderRadius: 99,
              background: 'rgba(0,71,171,0.08)'
            }}>
              <Calculator style={{ width: 14, height: 14 }} />
              <span>Vendor Eligibility &amp; Capability Evaluator</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary, #0F172A)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              Calculate Your Empanelment Tier &amp; Rating
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 4, marginBottom: 0, lineHeight: 1.45 }}>
              Adjust turnover and operational history below to determine your preliminary empanelment rating.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: 14,
            backgroundColor: 'var(--bg-surface, #F8FAFC)',
            border: '1.5px solid var(--border-color, #E2E8F0)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Empanelment Score</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: tierColor, lineHeight: 1.1 }}>
                {totalScore} <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>/ 100</span>
              </div>
            </div>

            <div style={{ borderLeft: '1.5px solid var(--border-color, #E2E8F0)', paddingLeft: '1rem', textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Calculated Tier</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: tierColor, padding: '0.2rem 0.55rem', borderRadius: 8, background: tierBg, display: 'inline-block', marginTop: 2 }}>
                {tierBadge}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar of Score */}
        <div style={{ width: '100%', height: 8, borderRadius: 99, backgroundColor: 'var(--bg-surface, #F1F5F9)', border: '1px solid var(--border-color, #E2E8F0)', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div 
            style={{ 
              width: `${totalScore}%`, 
              height: '100%', 
              backgroundColor: tierColor, 
              borderRadius: 99,
              transition: 'width 0.3s ease, background-color 0.3s ease'
            }} 
          />
        </div>

        {/* Interactive Controls Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Slider 1: Annual Turnover */}
          <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-surface, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary, #0F172A)' }}>Annual Turnover</label>
              <span style={{ fontSize: '0.825rem', fontWeight: 900, color: '#0047AB', background: 'rgba(0,71,171,0.08)', padding: '0.15rem 0.55rem', borderRadius: 6 }}>
                ₹ {turnover >= 100 ? `${(turnover / 100).toFixed(2)} Cr` : `${turnover} Lakhs`}
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0047AB', cursor: 'pointer', height: 6, margin: '0.65rem 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
              <span>₹ 10 Lakhs (MSME)</span>
              <span>₹ 10 Crores+ (Prime)</span>
            </div>
          </div>

          {/* Slider 2: Years in Business */}
          <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-surface, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary, #0F172A)' }}>Years of Experience</label>
              <span style={{ fontSize: '0.825rem', fontWeight: 900, color: '#0047AB', background: 'rgba(0,71,171,0.08)', padding: '0.15rem 0.55rem', borderRadius: 6 }}>
                {years} {years === 1 ? 'Year' : 'Years'}
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={15}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0047AB', cursor: 'pointer', height: 6, margin: '0.65rem 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
              <span>1 Year (Entry Tier)</span>
              <span>15+ Years (Established)</span>
            </div>
          </div>

          {/* Checkbox 1: PSU / Infrastructure Track Record */}
          <div 
            onClick={() => setPsuWork(!psuWork)} 
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 14,
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: `1.5px solid ${psuWork ? '#0047AB' : 'var(--border-color, #E2E8F0)'}`,
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <input 
              type="checkbox" 
              checked={psuWork} 
              onChange={() => {}} 
              style={{ width: 18, height: 18, accentColor: '#0047AB', marginTop: 2, cursor: 'pointer' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary, #0F172A)' }}>CPWD / PSU Execution Track Record</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#047857', background: '#D1FAE5', padding: '0.1rem 0.4rem', borderRadius: 4 }}>+20 Pts</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Prior experience in government, EPC infrastructure, or corporate projects.
              </p>
            </div>
          </div>

          {/* Checkbox 2: ISO / Quality Certification */}
          <div 
            onClick={() => setIsoCert(!isoCert)} 
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 14,
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: `1.5px solid ${isoCert ? '#0047AB' : 'var(--border-color, #E2E8F0)'}`,
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <input 
              type="checkbox" 
              checked={isoCert} 
              onChange={() => {}} 
              style={{ width: 18, height: 18, accentColor: '#0047AB', marginTop: 2, cursor: 'pointer' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary, #0F172A)' }}>ISO 9001 / BIS / OHSAS Certified</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#047857', background: '#D1FAE5', padding: '0.1rem 0.4rem', borderRadius: 4 }}>+20 Pts</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Holds active quality management and site safety compliance certifications.
              </p>
            </div>
          </div>

        </div>

        {/* Qualification Summary Card & Responsive Full-Width CTA Button */}
        <div style={{
          padding: '1.25rem 1.15rem',
          borderRadius: 16,
          backgroundColor: tierBg,
          border: `2px solid ${tierColor}`,
          boxShadow: '0 6px 20px rgba(0, 71, 171, 0.06)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 6 }}>
              <CheckCircle2 style={{ width: 18, height: 18, color: tierColor, flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: tierColor, lineHeight: 1.25 }}>
                {tier} Qualification Achieved!
              </span>
            </div>
            
            <p style={{ fontSize: '0.78rem', color: '#334155', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
              {tierDesc}
            </p>
          </div>

          <button 
            onClick={handleStartApplication} 
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 900,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              backgroundColor: tierColor,
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 14px rgba(0, 71, 171, 0.3)',
              boxSizing: 'border-box',
              textAlign: 'center',
              lineHeight: 1.2
            }}
          >
            <span>Apply as {tierBadge}</span>
            <ChevronRight style={{ width: 18, height: 18, flexShrink: 0 }} />
          </button>
        </div>

      </div>
    </div>
  );
}
