import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Award, FileText, Download, DollarSign, Clock, CheckCircle2, Building2, Briefcase, Lock, UserCheck, Printer, LogOut, Search, ExternalLink } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

export default function VendorDashboardPage() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('hipro_vendor_session');
    if (!session) {
      navigate('/vendor-login');
      return;
    }
    try {
      setVendor(JSON.parse(session));
    } catch {
      navigate('/vendor-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hipro_vendor_session');
    navigate('/vendor-login');
  };

  if (!vendor) return null;

  return (
    <div style={{ maxWidth: 1100, margin: '2.5rem auto 4rem auto', padding: '0 1.25rem' }}>
      
      {/* Executive Welcome Header */}
      <div style={{
        padding: '1.75rem 2rem',
        borderRadius: 20,
        background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
        color: 'white',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 style={{ width: 28, height: 28 }} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              OFFICIAL VENDOR PORTAL • HINDUSTAN PROJECTS
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: 2, marginBottom: 2 }}>
              {vendor.company_name}
            </h1>
            <div style={{ fontSize: '0.825rem', color: '#CBD5E1', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 4 }}>
              <span>Tracking Code: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.tracking_id}</strong></span>
              <span>•</span>
              <span>GSTIN: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.gstin}</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowCertificateModal(true)}
            className="btn-accent"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', borderRadius: 12 }}
          >
            <Printer style={{ width: 16, height: 16 }} />
            <span>Download Official Certificate (A4)</span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 12,
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <LogOut style={{ width: 15, height: 15 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* Card 1: Empanelment Status */}
        <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #10B981', boxShadow: '0 4px 16px rgba(16,185,129,0.08)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} />
            <span>Empanelment Status</span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>EMPANELLED</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Verified & Active FY 2026-27</div>
        </div>

        {/* Card 2: Tier Rating */}
        <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #0047AB', boxShadow: '0 4px 16px rgba(0,71,171,0.08)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award style={{ width: 16, height: 16, color: '#0047AB' }} />
            <span>Capability Rating</span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>CLASS-A (TIER 1)</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Eligible for Pan-India Tenders</div>
        </div>

        {/* Card 3: EMD Benefit */}
        <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <DollarSign style={{ width: 16, height: 16, color: '#F59E0B' }} />
            <span>EMD Benefit</span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>₹ 0 (WAIVED)</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Under Corporate Empanelment Clause</div>
        </div>

        {/* Card 4: Payout Cycle */}
        <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock style={{ width: 16, height: 16, color: '#64748B' }} />
            <span>Milestone Payouts</span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>7-DAY RTGS</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Direct Bank Account Release</div>
        </div>

      </div>

      {/* Active Tenders Radar & Bidding Section */}
      <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '2rem', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase style={{ width: 20, height: 20, color: '#0047AB' }} />
              <span>Active Hindustan Projects Tenders & Work Opportunities:</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              As an empanelled Class-A vendor, you are pre-qualified to express interest and submit technical bids.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {[
            { ref: 'HP-TND-2026-101', title: 'Jaipur Commercial Tower — Turnkey Civil & Structural Package', val: '₹ 14.50 Crores', location: 'Jaipur, Rajasthan', end: '08 Aug 2026' },
            { ref: 'HP-TND-2026-102', title: 'Bhilwara Industrial Park — High-Tension Electrical & Substation Installation', val: '₹ 3.80 Crores', location: 'Bhilwara, Rajasthan', end: '12 Aug 2026' },
            { ref: 'HP-TND-2026-103', title: 'Luxury Residential Township — BIM Architectural & HVAC Consultancy', val: '₹ 1.20 Crores', location: 'Udaipur, Rajasthan', end: '15 Aug 2026' },
          ].map((tnd, idx) => (
            <div key={idx} style={{ padding: '1rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                    {tnd.ref}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deadline: <strong>{tnd.end}</strong></span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>{tnd.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Estimated Package Value: <strong style={{ color: '#047857' }}>{tnd.val}</strong> • Location: <strong>{tnd.location}</strong>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => alert(`Bid submission portal opened for ${tnd.ref}. EMD is waived for your Class-A empanelled status.`)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: 10, background: '#0047AB' }}
              >
                <span>Express Interest / Bid</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <SuccessModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          trackingId={vendor.tracking_id}
          formData={{
            companyName: vendor.company_name,
            gstin: vendor.gstin,
            category: vendor.category,
            submitted_at: new Date().toISOString()
          }}
        />
      )}

    </div>
  );
}
