import React, { useState } from 'react';
import { Calculator, Award, CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';

export default function EligibilityCalculator({ onApplyCategory }) {
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

  let tier = 'Class C Vendor';
  let tierColor = '#3B82F6';
  let tierDesc = 'Qualified for Sub-contracts & Regional Supply Orders (< ₹ 50 Lakhs)';

  if (totalScore >= 75) {
    tier = 'Class A Prime Partner';
    tierColor = '#10B981';
    tierDesc = 'Qualified for Major EPC Tenders & Turnkey Infrastructure (> ₹ 5.0 Crores)';
  } else if (totalScore >= 50) {
    tier = 'Class B Approved Vendor';
    tierColor = '#F59E0B';
    tierDesc = 'Qualified for Commercial Projects & Material Supply (₹ 50 Lakhs - ₹ 5 Crores)';
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto 3rem auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '2rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-md)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              <Calculator style={{ width: 14, height: 14 }} />
              <span>Vendor Eligibility Evaluator</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Calculate Your Empanelment Tier & Rating</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.25rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Empanelment Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: tierColor }}>{totalScore} / 100</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Calculated Tier</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tier}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          <div>
            <label className="form-label">Annual Turnover: <strong>₹ {turnover} Lakhs</strong></label>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0047AB', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>₹ 10L</span>
              <span>₹ 10 Crores+</span>
            </div>
          </div>

          <div>
            <label className="form-label">Years of Operation: <strong>{years} Years</strong></label>
            <input
              type="range"
              min={1}
              max={15}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0047AB', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>1 Year</span>
              <span>15+ Years</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Prior PSU / Corporate Credentials</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={psuWork} onChange={(e) => setPsuWork(e.target.checked)} style={{ accentColor: '#0047AB' }} />
              <span>Executed CPWD / L&T / Railway Projects (+20 Pts)</span>
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Quality Certification</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isoCert} onChange={(e) => setIsoCert(e.target.checked)} style={{ accentColor: '#0047AB' }} />
              <span>Holds ISO 9001 / OHSAS / BIS Certification (+20 Pts)</span>
            </label>
          </div>

        </div>

        <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.04)', border: '1px solid rgba(0, 71, 171, 0.2)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: tierColor }}>✓ {tier} Qualification Summary</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tierDesc}</div>
          </div>

          <button onClick={onApplyCategory} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
            <span>Start Empanelment Under {tier}</span>
            <ChevronRight style={{ width: 16, height: 16 }} />
          </button>
        </div>

      </div>
    </div>
  );
}
