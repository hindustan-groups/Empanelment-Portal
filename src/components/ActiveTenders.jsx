import React from 'react';
import { Building2, Calendar, MapPin, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ActiveTenders({ onEmpanelCategory }) {
  const tenders = [
    {
      id: 'HP-TND-2026-081',
      title: 'EPC Construction of Commercial Tower (Phase-II)',
      category: 'civil',
      location: 'Jaipur Site, Rajasthan',
      estValue: '₹ 24.50 Crores',
      dueDate: '15 August 2026',
      status: 'Open for Empanelled Contractors'
    },
    {
      id: 'HP-TND-2026-094',
      title: 'HVAC & Firefighting System Installation',
      category: 'mep',
      location: 'Corporate Tower, Gurgaon',
      estValue: '₹ 3.80 Crores',
      dueDate: '20 August 2026',
      status: 'Open for Empanelled MEP Vendors'
    },
    {
      id: 'HP-TND-2026-102',
      title: 'Supply of TMT Steel & Ready-Mix Concrete (RMC)',
      category: 'suppliers',
      location: 'Pan-India Project Sites',
      estValue: '₹ 8.20 Crores',
      dueDate: '28 August 2026',
      status: 'Open for Approved Suppliers'
    }
  ];

  return (
    <div style={{ maxW: 1100, margin: '0 auto 3rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ED1C24', textTransform: 'uppercase' }}>
            🔥 Live Opportunity Radar
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Active Hindustan Projects Tenders FY 2026-27</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Empanelment required for bidding</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {tenders.map((t) => (
          <div key={t.id} style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0047AB', fontFamily: 'monospace' }}>{t.id}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 9999, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                  {t.status}
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>{t.title}</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <div><MapPin style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />{t.location}</div>
                <div><Building2 style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />Est Value: <strong style={{ color: 'var(--text-primary)' }}>{t.estValue}</strong></div>
                <div><Calendar style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />Due Date: <strong>{t.dueDate}</strong></div>
              </div>
            </div>

            <button
              onClick={() => onEmpanelCategory(t.category)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
            >
              <span>Empanel To Bid For This Tender</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
