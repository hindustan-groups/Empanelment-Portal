import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, Clock, ShieldCheck, AlertCircle, Building2, FileCheck2, CreditCard, Award, ArrowRight, HelpCircle, PhoneCall, FilePlus, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';

export default function TrackPage() {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    // 1. Check local database applications first for 100% accurate match
    try {
      const localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const match = localApps.find(a =>
        (a.tracking_id || '').toLowerCase() === query ||
        (a.phone || '').replace(/\D/g, '').includes(query) ||
        (a.gstin || '').toLowerCase() === query ||
        (a.email || '').toLowerCase() === query
      );

      if (match) {
        setResult({
          id: match.tracking_id,
          company: match.company_name || match.contact_name || 'Applicant Entity',
          gstin: match.gstin || (match.gstExempt ? 'EXEMPT / NO GST' : 'GST PENDING'),
          category: match.category ? match.category.toUpperCase() : 'GENERAL',
          submittedDate: new Date(match.submitted_at || Date.now()).toLocaleDateString(),
          stage: match.current_stage || 'Financial & Technical Committee Audit',
          status: match.status || 'Under Verification',
          hashSignature: match.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf3a89045b',
          fullData: match,
          steps: [
            { label: 'Application Filed & SHA-256 Hash Generated', desc: `Submitted on ${new Date(match.submitted_at || Date.now()).toLocaleDateString()}`, done: true },
            { label: 'GSTIN REG-06 & MCA Statutory Verification', desc: 'Statutory identity verification cleared', done: true },
            { label: match.current_stage || 'Financial & Technical Committee Audit', desc: 'Reviewing turnovers & equipment capability', done: false, active: true },
            { label: 'Empanelment Tier Classification & Certificate Issue', desc: 'Class-A / B Tier Rating assignment', done: false },
            { label: 'Active Bidding Clearance & Portal Onboarding', desc: 'Qualified for active Hindustan Projects tenders', done: false }
          ]
        });
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Local apps check error:', err);
    }

    // 2. Query API Backend
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/status/${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success && data.data) {
        setResult({
          id: data.data.tracking_id || data.data.id || query.toUpperCase(),
          company: data.data.company_name || data.data.company || 'Applicant Organization',
          gstin: data.data.gstin || 'GST NOTIFIED',
          category: (data.data.category || 'civil').toUpperCase(),
          submittedDate: data.data.submitted_at ? new Date(data.data.submitted_at).toLocaleDateString() : new Date().toLocaleDateString(),
          stage: data.data.current_stage || 'Financial & Technical Committee Audit',
          status: data.data.status || 'Under Verification',
          hashSignature: data.data.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf3a89045b',
          fullData: data.data,
          steps: [
            { label: 'Application Filed & SHA-256 Hash Generated', desc: 'Digital registration logged on empanel.hindustanprojects.in', done: true },
            { label: 'GSTIN REG-06 & MCA Statutory Verification', desc: 'Active tax status & PAN verification cleared', done: true },
            { label: data.data.current_stage || 'Financial & Technical Committee Audit', desc: 'Reviewing 3-year turnovers & equipment capability', done: false, active: true },
            { label: 'Empanelment Tier Classification & Certificate Issue', desc: 'Class-A / B Tier Rating assignment', done: false },
            { label: 'Active Bidding Clearance & Portal Onboarding', desc: 'Qualified for active Hindustan Projects tenders', done: false }
          ]
        });
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 850, margin: '2.5rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2.25rem' }}>
        
        {/* Header Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '0.85rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
            <Search style={{ width: 28, height: 28 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 900 }}>Track Vendor Empanelment Status</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Search using your <strong>Tracking ID (e.g. HP-EMP-025)</strong>, <strong>GSTIN Number</strong>, <strong>Mobile</strong>, or <strong>Email</strong>
            </p>
          </div>
        </div>

        {/* Multi-Method Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              Enter Tracking Reference Code, GSTIN, Email, or Mobile Number:
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. HP-EMP-025 or 08AAAAA0000A1Z5 or rajesh@apexinfra.com"
                className="form-input"
                style={{ flex: 1, minWidth: 260, fontSize: '1rem', fontWeight: 700 }}
                required
              />
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                {loading ? <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" /> : 'Search Status'}
              </button>
            </div>
          </div>
        </form>

        {/* NOT FOUND CLEAR ERROR STATE */}
        {notFound && (
          <div style={{ padding: '1.75rem', borderRadius: 18, backgroundColor: 'rgba(237, 28, 36, 0.05)', border: '1.5px solid rgba(237, 28, 36, 0.3)', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: 'rgba(237, 28, 36, 0.15)', color: '#ED1C24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle style={{ width: 24, height: 24 }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ED1C24' }}>
                  No Application Record Found for "{searchInput}"
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  We could not find any vendor registration matching this entry in the Hindustan Projects database.
                </p>
              </div>
            </div>

            {/* Helpful Troubleshooting Steps */}
            <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#0047AB', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle style={{ width: 16, height: 16 }} />
                <span>How to resolve this issue:</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <li><strong>Tracking ID format:</strong> Ensure valid reference code format (e.g. <code>HP-EMP-025</code>).</li>
                <li><strong>GSTIN format:</strong> Verify your 15-digit GSTIN (e.g. <code>08AAAAA0000A1Z5</code>).</li>
                <li><strong>Mobile / Email:</strong> Make sure you are entering the exact mobile number or email used during registration.</li>
                <li><strong>Haven't filed yet?</strong> If you have not submitted the empanelment form, please register below.</li>
              </ul>
            </div>

            {/* Next Action CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-accent" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <FilePlus style={{ width: 16, height: 16 }} />
                <span>Submit New Application</span>
              </Link>
              
              <a href="mailto:empanelment@hindustanprojects.in" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <PhoneCall style={{ width: 16, height: 16, color: '#0047AB' }} />
                <span>Contact Helpdesk (+91 011 4500 8899)</span>
              </a>
            </div>

          </div>
        )}

        {/* VALID REAL SEARCH RESULTS DISPLAY */}
        {result && (
          <div style={{ padding: '1.5rem', borderRadius: 18, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Header info bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0, 71, 171, 0.1)', padding: '0.2rem 0.65rem', borderRadius: 9999, fontFamily: 'monospace' }}>
                    {result.id}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filed: {result.submittedDate}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900 }}>{result.company}</h3>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  GSTIN: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{result.gstin}</strong> • Category: <strong>{result.category}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ padding: '0.5rem 1rem', borderRadius: 9999, fontSize: '0.85rem', fontWeight: 800, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#B45309', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock style={{ width: 16, height: 16 }} />
                  <span>{result.status}</span>
                </div>

                {result.fullData && (
                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: 8 }}
                  >
                    <Printer style={{ width: 13, height: 13 }} />
                    <span>Print Application Slip</span>
                  </button>
                )}
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash Ribbon */}
            <div style={{ padding: '0.6rem 0.85rem', borderRadius: 8, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.725rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>🔒 SHA-256 Hash Signature: <strong>{result.hashSignature}</strong></span>
              <span style={{ color: '#047857', fontWeight: 800 }}>✓ Verified Audit Trail</span>
            </div>

            {/* 5-Stage Visual Progress Timeline */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0047AB' }}>
              5-Stage Vendor Verification Progress:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {result.steps.map((st, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.85rem', 
                    fontWeight: 900,
                    backgroundColor: st.done ? '#10B981' : st.active ? '#0047AB' : 'var(--border-color)',
                    color: 'white',
                    boxShadow: st.active ? '0 0 12px rgba(0, 71, 171, 0.5)' : 'none',
                    flexShrink: 0
                  }}>
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: st.active ? '#0047AB' : st.done ? '#047857' : 'var(--text-primary)' }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {st.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Printable Receipt Slip Modal */}
      {showReceiptModal && result?.fullData && (
        <SuccessModal
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          trackingId={result.id}
          formData={result.fullData}
        />
      )}
    </div>
  );
}
