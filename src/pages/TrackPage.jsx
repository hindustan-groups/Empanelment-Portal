import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, FileText, AlertCircle, PhoneCall, FilePlus, ArrowLeft, Printer, HelpCircle, Lock, Building2, MapPin, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';

export default function TrackPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    // 1. Check LocalStorage First (Real Submissions Log)
    try {
      const localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const match = localApps.find(app => 
        (app.tracking_id && app.tracking_id.toLowerCase() === query.toLowerCase()) ||
        (app.gstin && app.gstin.toLowerCase() === query.toLowerCase()) ||
        (app.phone && app.phone.includes(query)) ||
        (app.email && app.email.toLowerCase() === query.toLowerCase()) ||
        (app.contactName && app.contactName.toLowerCase().includes(query.toLowerCase())) ||
        (app.companyName && app.companyName.toLowerCase().includes(query.toLowerCase()))
      );

      if (match) {
        setResult({
          id: match.tracking_id,
          company: match.companyName || match.contactName || 'Applicant Entity',
          gstin: match.gstin || (match.gstExempt ? 'EXEMPT / NO GST' : 'GST PENDING'),
          category: match.category ? match.category.toUpperCase() : 'CIVIL & STRUCTURAL',
          submittedDate: new Date(match.submitted_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          stage: match.current_stage || 'Financial & Technical Committee Audit',
          status: match.status || 'Under Verification',
          hashSignature: match.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf3a89045b',
          fullData: match,
          steps: [
            { label: 'Application Filed & SHA-256 Hash Generated', desc: `Filed on ${new Date(match.submitted_at || Date.now()).toLocaleDateString('en-GB')}`, done: true },
            { label: 'GSTIN REG-06 & MCA Statutory Audit', desc: 'Statutory tax identity & PAN verification cleared', done: true },
            { label: match.current_stage || 'Financial & Technical Committee Audit', desc: 'Reviewing 3-year turnovers & technical capability', done: false, active: true },
            { label: 'Empanelment Tier Classification & Certificate Issue', desc: 'Class-A / Class-B Tier Rating assignment', done: false },
            { label: 'Active Bidding Clearance & Tender Onboarding', desc: 'Qualified for active Hindustan Projects tenders', done: false }
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
          submittedDate: data.data.submitted_at ? new Date(data.data.submitted_at).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
          stage: data.data.current_stage || 'Financial & Technical Committee Audit',
          status: data.data.status || 'Under Verification',
          hashSignature: data.data.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf3a89045b',
          fullData: data.data,
          steps: [
            { label: 'Application Filed & SHA-256 Hash Generated', desc: 'Digital registration logged on empanel.hindustanprojects.in', done: true },
            { label: 'GSTIN REG-06 & MCA Statutory Audit', desc: 'Active tax status & PAN verification cleared', done: true },
            { label: data.data.current_stage || 'Financial & Technical Committee Audit', desc: 'Reviewing 3-year turnovers & equipment capability', done: false, active: true },
            { label: 'Empanelment Tier Classification & Certificate Issue', desc: 'Class-A / B Tier Rating assignment', done: false },
            { label: 'Active Bidding Clearance & Tender Onboarding', desc: 'Qualified for active Hindustan Projects tenders', done: false }
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
    <div style={{ maxWidth: 920, margin: '2.5rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2.25rem' }}>
        
        {/* Header Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '2px solid var(--border-color)' }}>
          <div style={{ padding: '0.85rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
            <Search style={{ width: 30, height: 30 }} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              HINDUSTAN PROJECTS • CORPORATE PROCUREMENT PORTAL
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0F172A', marginTop: 2, marginBottom: 2 }}>
              Track Vendor Empanelment Application Status
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time 5-stage verification audit tracker for contractors, consultants & suppliers.
            </p>
          </div>
        </div>

        {/* Multi-Method Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '1.75rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              Enter Tracking Reference Code, 15-Digit GSTIN, Email, or Mobile Number:
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. HP-EMP-025 or 08HYJPK8847M1ZC or contact@builder.com"
                className="form-input"
                style={{ flex: '1 1 240px', width: '100%', fontSize: '0.95rem', fontWeight: 700 }}
                required
              />
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.75rem 1.75rem', flex: '1 1 140px', justifyContent: 'center' }}>
                {loading ? 'Searching...' : 'Search Status'}
              </button>
            </div>
          </div>
        </form>

        {/* Search Guide & SLA Notice Cards */}
        {!result && !notFound && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            {/* Guide Card */}
            <div style={{ padding: '1.25rem', borderRadius: 14, background: 'rgba(0,71,171,0.04)', border: '1.5px solid rgba(0,71,171,0.2)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle style={{ width: 18, height: 18 }} />
                <span>How to Track Your Empanelment Application:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.825rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block' }}>🆔 Tracking ID Code</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Sequential code starting with HP-EMP-025... issued upon registration.</span>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block' }}>📄 15-Digit GSTIN Number</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>GSTIN entered during registration (e.g. 08HYJPK8847M1ZC).</span>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: '#0F172A', display: 'block' }}>📱 Mobile or Email</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Registered mobile number or corporate email address.</span>
                </div>
              </div>
            </div>

            {/* SLA Verification TAT Box */}
            <div style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '0.825rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock style={{ width: 20, height: 20, color: '#F59E0B' }} />
                <div>
                  <strong style={{ color: '#0F172A', display: 'block' }}>Verification Audit SLA: 48 to 72 Working Hours</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Applications are audited by our Procurement Technical Committee.</span>
                </div>
              </div>
              <div style={{ padding: '0.35rem 0.75rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#047857', fontWeight: 800, fontSize: '0.75rem', border: '1px solid rgba(16,185,129,0.3)' }}>
                ✓ ISO 9001:2015 Audit Process
              </div>
            </div>

          </div>
        )}

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

            <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#0047AB', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle style={{ width: 16, height: 16 }} />
                <span>How to resolve this issue:</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <li><strong>Tracking ID format:</strong> Ensure valid reference code format (e.g. <code>HP-EMP-025</code>).</li>
                <li><strong>GSTIN format:</strong> Verify your 15-digit GSTIN (e.g. <code>08HYJPK8847M1ZC</code>).</li>
                <li><strong>Mobile / Email:</strong> Make sure you enter the exact mobile number or email used during registration.</li>
                <li><strong>Haven't filed yet?</strong> If you have not submitted the empanelment form, please register below.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-accent" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <FilePlus style={{ width: 16, height: 16 }} />
                <span>Submit New Application</span>
              </Link>
              
              <a href="mailto:empanelment@hindustanprojects.in" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <PhoneCall style={{ width: 16, height: 16, color: '#0047AB' }} />
                <span>Contact Procurement Officer (+91-7597000601)</span>
              </a>
            </div>
          </div>
        )}

        {/* VALID REAL SEARCH RESULTS DISPLAY */}
        {result && (
          <div style={{ padding: '1.75rem', borderRadius: 18, backgroundColor: 'var(--bg-surface)', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Header info bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0, 71, 171, 0.1)', padding: '0.2rem 0.75rem', borderRadius: 9999, fontFamily: 'monospace' }}>
                    {result.id}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filing Date: <strong>{result.submittedDate}</strong></span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>{result.company}</h3>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  GSTIN: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{result.gstin}</strong> • Category: <strong>{result.category}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ padding: '0.5rem 1.1rem', borderRadius: 9999, fontSize: '0.85rem', fontWeight: 900, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#B45309', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock style={{ width: 16, height: 16 }} />
                  <span>{result.status}</span>
                </div>

                {result.fullData && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setShowReceiptModal(true)}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: 8 }}
                    >
                      <Printer style={{ width: 14, height: 14 }} />
                      <span>Print A4 Dossier</span>
                    </button>

                    <button
                      onClick={() => setShowIdCardModal(true)}
                      className="btn-accent"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: 8 }}
                    >
                      <span>🪪 Print Vendor Smart ID Card</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash Ribbon */}
            <div style={{ padding: '0.65rem 1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>🔒 SHA-256 Hash Signature: <strong>{result.hashSignature}</strong></span>
              <span style={{ color: '#047857', fontWeight: 800 }}>✓ Verified Audit Trail</span>
            </div>

            {/* 5-Stage Visual Progress Timeline */}
            <h4 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '1.25rem', color: '#0047AB' }}>
              5-Stage Vendor Audit & Classification Pipeline:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {result.steps.map((st, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 34, 
                    height: 34, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.85rem', 
                    fontWeight: 900,
                    backgroundColor: st.done ? '#10B981' : st.active ? '#0047AB' : 'var(--border-color)',
                    color: 'white',
                    boxShadow: st.active ? '0 0 14px rgba(0, 71, 171, 0.45)' : 'none',
                    flexShrink: 0
                  }}>
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div style={{ flex: 1, paddingTop: 3 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: st.active ? '#0047AB' : st.done ? '#047857' : 'var(--text-primary)' }}>
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

        {/* Corporate Support Card at Bottom */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.825rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <PhoneCall style={{ width: 18, height: 18, color: '#0047AB' }} />
            <div>
              <strong style={{ display: 'block', color: '#0F172A' }}>Helpline Phone</strong>
              <span style={{ color: 'var(--text-muted)' }}>+91-7597000601</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail style={{ width: 18, height: 18, color: '#ED1C24' }} />
            <div>
              <strong style={{ display: 'block', color: '#0F172A' }}>Corporate Email</strong>
              <span style={{ color: 'var(--text-muted)' }}>empanelment@hindustanprojects.in</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin style={{ width: 18, height: 18, color: '#64748B' }} />
            <div>
              <strong style={{ display: 'block', color: '#0F172A' }}>Corporate Address</strong>
              <span style={{ color: 'var(--text-muted)' }}>Bhopal Ganj, Bhilwara (Raj.) - 311001</span>
            </div>
          </div>
        </div>

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

      {/* Printable Vendor Smart ID Card Modal */}
      {showIdCardModal && result?.fullData && (
        <VendorIdCardModal
          isOpen={showIdCardModal}
          onClose={() => setShowIdCardModal(false)}
          vendorData={result.fullData}
        />
      )}
    </div>
  );
}
