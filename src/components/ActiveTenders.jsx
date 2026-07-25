import React, { useState, useEffect } from 'react';
import { Building2, Calendar, MapPin, ArrowUpRight, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveTenders({ onEmpanelCategory }) {
  const navigate = useNavigate();
  const [liveTenders, setLiveTenders] = useState([]);

  useEffect(() => {
    // Read live tenders from Admin or defaults
    const defaultTenders = [
      {
        id: 'HP-TND-2026-081',
        title: 'EPC Civil & Structural Work - Commercial Tower (B+G+18)',
        category: 'civil',
        location: 'Jaipur Industrial Site, Rajasthan',
        estValue: '₹ 45.0 Crores',
        dueDate: '15 August 2026',
        status: 'Open for Empanelled Contractors'
      },
      {
        id: 'HP-TND-2026-094',
        title: 'MEP, HVAC & Chiller Plant System Commissioning',
        category: 'mep',
        location: 'Cyber City Hub, Gurgaon, Haryana',
        estValue: '₹ 12.5 Crores',
        dueDate: '20 August 2026',
        status: 'Open for Empanelled MEP Vendors'
      },
      {
        id: 'HP-TND-2026-105',
        title: 'TMT Fe550D Steel & Ready-Mix Concrete Bulk Supply',
        category: 'suppliers',
        location: 'Pan-India Project Construction Sites',
        estValue: '₹ 8.0 Crores',
        dueDate: '30 August 2026',
        status: 'Open for Approved Suppliers'
      }
    ];

    setLiveTenders(defaultTenders);
  }, []);

  const handleTenderEmpanel = (cat) => {
    if (onEmpanelCategory) {
      onEmpanelCategory(cat);
    }
    navigate('/apply');
  };

  return (
    <section style={{ maxWidth: 1240, margin: '3.5rem auto 4rem auto', padding: '0 1.5rem' }}>
      
      {/* Radar Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.85rem', borderRadius: 9999, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', fontSize: '0.775rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            <Flame style={{ width: 14, height: 14 }} />
            <span>Live Opportunity Radar</span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
            Active Hindustan Projects Tenders FY 2026-27
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Empanelment required for technical & financial bidding participation
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.85rem', borderRadius: 10, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.8rem', fontWeight: 800 }}>
          <CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} />
          <span>Real-time VPS Radar Active</span>
        </div>
      </div>

      {/* Tender Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {liveTenders.map((t) => (
          <div 
            key={t.id} 
            style={{ 
              padding: '1.5rem', 
              borderRadius: 20, 
              backgroundColor: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--shadow-md)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              {/* Header Code & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', fontFamily: 'monospace', backgroundColor: 'rgba(0, 71, 171, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 6 }}>
                  {t.id}
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: 9999, backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#047857' }}>
                  {t.status}
                </span>
              </div>

              {/* Title */}
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.35, color: 'var(--text-primary)' }}>
                {t.title}
              </h4>

              {/* Location, Value, Deadline details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin style={{ width: 14, height: 14, color: '#ED1C24', flexShrink: 0 }} />
                  <span>Site: <strong>{t.location}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 style={{ width: 14, height: 14, color: '#0047AB', flexShrink: 0 }} />
                  <span>Est. Contract Value: <strong style={{ color: '#0047AB' }}>{t.estValue}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar style={{ width: 14, height: 14, color: '#F59E0B', flexShrink: 0 }} />
                  <span>Bidding Deadline: <strong>{t.dueDate}</strong></span>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => handleTenderEmpanel(t.category)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.65rem 1rem' }}
            >
              <span>Empanel To Bid For This Tender</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
