import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, ArrowRight, Filter, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

const DUMMY_TENDERS = [
  {
    id: 'HIPRO-TND-2026-001',
    title: 'Construction & Structural Civil Works for Commercial Complex',
    category: 'Civil & Structural Execution',
    location: 'Bhilwara, Rajasthan',
    estimatedCost: '₹ 14.50 Crore',
    publishDate: '2026-07-28',
    dueDate: '2026-08-15',
    eligibility: 'Class A Empanelled Civil Contractors (Turnover > ₹5 Cr)',
    status: 'ACTIVE'
  },
  {
    id: 'HIPRO-TND-2026-002',
    title: 'Supply & Installation of High-Voltage Electrical Substation & HVAC',
    category: 'MEP & Electrical Services',
    location: 'Jaipur / Bhilwara, Rajasthan',
    estimatedCost: '₹ 4.80 Crore',
    publishDate: '2026-07-25',
    dueDate: '2026-08-10',
    eligibility: 'Empanelled Electrical & HVAC Contractors',
    status: 'ACTIVE'
  },
  {
    id: 'HIPRO-TND-2026-003',
    title: 'Architectural Consultancy & Structural Audit Services',
    category: 'Architecture & Design Consultancy',
    location: 'Corporate HQ, Bhilwara',
    estimatedCost: '₹ 85.00 Lakhs',
    publishDate: '2026-07-30',
    dueDate: '2026-08-20',
    eligibility: 'Registered Architecture & Structural Firms',
    status: 'ACTIVE'
  },
  {
    id: 'HIPRO-TND-2026-004',
    title: 'Supply of Ready Mix Concrete (RMC) & TMT Steel Bars',
    category: 'Material Supply & Rental',
    location: 'Various Project Sites (Rajasthan)',
    estimatedCost: '₹ 8.20 Crore',
    publishDate: '2026-07-20',
    dueDate: '2026-08-05',
    eligibility: 'Approved Material Manufacturers & Distributors',
    status: 'ACTIVE'
  }
];

export default function TendersPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [tenders, setTenders] = useState(() => {
    const saved = localStorage.getItem('hipro_tenders');
    return saved ? JSON.parse(saved) : DUMMY_TENDERS;
  });

  React.useEffect(() => {
    const fetchTenders = async () => {
      const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      try {
        const res = await fetch(`${backendUrl}/api/tenders`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map(t => ({
            id: t.tender_no || `HIPRO-TND-${t.id}`,
            title: t.title,
            category: t.category,
            location: t.location,
            estimatedCost: t.estimated_value,
            publishDate: t.created_at ? t.created_at.slice(0, 10) : '2026-08-01',
            dueDate: t.due_date,
            eligibility: 'Empanelled Vendors & Contractors',
            status: t.status || 'ACTIVE'
          }));
          setTenders(mapped);
          localStorage.setItem('hipro_tenders', JSON.stringify(mapped));
        }
      } catch { /* API fallback */ }
    };
    fetchTenders();
  }, []);

  const filteredTenders = selectedCategory === 'ALL'
    ? tenders
    : tenders.filter(t => (t.category || '').toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="tenders-page" style={{ padding: '2.5rem 1.5rem', maxWidth: 1240, margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
        borderRadius: 24,
        padding: '3rem 2.5rem',
        color: 'white',
        marginBottom: '2.5rem',
        boxShadow: '0 16px 40px rgba(0,71,171,0.2)'
      }}>
        <span style={{ padding: '0.35rem 0.95rem', borderRadius: 99, backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#60A5FA', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          📑 Active Procurement & Bidding Desk
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.75rem', marginBottom: '0.5rem' }}>
          Active Tenders & Expression of Interest (EOI)
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: 680, lineHeight: 1.6 }}>
          Explore open tender notices and EOI opportunities across Hindustan Projects execution sites. Only Empanelled Vendors with verified Smart ID Cards are eligible to submit bids.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ padding: '0.45rem 0.95rem', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck style={{ width: 15, height: 15, color: '#34D399' }} />
            <span>Fast-Track Bidding for Empanelled Vendors</span>
          </div>

          <Link to="/apply" style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Not Empanelled Yet? Apply for Registration</span>
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter style={{ width: 15, height: 15 }} /> Filter Category:
        </span>

        {['ALL', 'Civil', 'MEP', 'Architecture', 'Material'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.45rem 1rem', fontSize: '0.825rem', fontWeight: 800, borderRadius: 10, border: 'none', cursor: 'pointer',
              backgroundColor: selectedCategory === cat ? '#0047AB' : '#E2E8F0',
              color: selectedCategory === cat ? '#FFFFFF' : '#475569',
              transition: 'all 0.2s'
            }}
          >
            {cat === 'ALL' ? 'All Active Tenders' : cat}
          </button>
        ))}
      </div>

      {/* Tenders Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>

        {/* ── Empty State ── */}
        {filteredTenders.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            backgroundColor: '#FFFFFF', borderRadius: 24,
            border: '1.5px dashed #CBD5E1',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* Icon */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0,71,171,0.08) 0%, rgba(0,71,171,0.03) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              border: '1.5px solid rgba(0,71,171,0.12)'
            }}>
              <span style={{ fontSize: '2.2rem' }}>📋</span>
            </div>

            {/* Heading */}
            <h3 style={{
              fontSize: '1.25rem', fontWeight: 900, color: '#0F172A',
              margin: '0 0 0.5rem 0'
            }}>
              No Active Tenders at the Moment
            </h3>

            {/* Subtext */}
            <p style={{
              fontSize: '0.88rem', color: '#64748B', lineHeight: 1.7,
              maxWidth: 480, margin: '0 auto 1.75rem auto'
            }}>
              Hindustan Projects regularly floats new procurement tenders and EOI notices.<br />
              <strong style={{ color: '#0047AB' }}>Empanel today</strong> to get priority notifications for upcoming civil, MEP, architecture, and supply tenders.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/apply"
                className="btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
              >
                <span>Apply for Empanelment</span>
                <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
              <Link
                to="/contact"
                style={{
                  padding: '0.65rem 1.5rem', fontSize: '0.875rem', fontWeight: 700, borderRadius: 12,
                  border: '1.5px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#334155',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none'
                }}
              >
                <span>Contact Procurement Desk</span>
              </Link>
            </div>
          </div>
        )}

        {filteredTenders.map(tender => (
          <div key={tender.id} style={{
            backgroundColor: '#FFFFFF', borderRadius: 20, padding: '1.5rem 1.75rem',
            border: '1.5px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: 6, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.725rem', fontWeight: 900, fontFamily: 'monospace' }}>
                    {tender.id}
                  </span>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: 6, backgroundColor: '#ECFDF5', color: '#047857', fontSize: '0.725rem', fontWeight: 800 }}>
                    {tender.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  {tender.title}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Estimated Order Value</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ED1C24' }}>{tender.estimatedCost}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', padding: '0.85rem 1rem', backgroundColor: '#F8FAFC', borderRadius: 12, fontSize: '0.8rem', color: '#334155' }}>
              <div><strong>Location:</strong> {tender.location}</div>
              <div><strong>Published On:</strong> {tender.publishDate}</div>
              <div><strong>Submission Deadline:</strong> <span style={{ color: '#ED1C24', fontWeight: 800 }}>{tender.dueDate}</span></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px dashed #E2E8F0' }}>
              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle style={{ width: 14, height: 14, color: '#0047AB' }} />
                <span><strong>Eligibility:</strong> {tender.eligibility}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Link
                  to="/vendor-login"
                  style={{ padding: '0.5rem 0.95rem', fontSize: '0.8rem', fontWeight: 800, borderRadius: 10, border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                  title="Sign in to Vendor Portal to download official Tender Package PDF"
                >
                  <Download style={{ width: 14, height: 14 }} />
                  <span>Download Tender Package PDF</span>
                </Link>

                <Link
                  to="/apply"
                  className="btn-accent"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.8rem', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>Empanel to Bid</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
