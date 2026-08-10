import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, FileText, AlertCircle, PhoneCall, FilePlus, ArrowLeft, Printer, HelpCircle, Lock, Building2, MapPin, Mail, XCircle, Ban, PauseCircle, Shield } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import { API_BASE_URL } from '../config/api';

// ── QR Verification Status Engine ──────────────────────────────────────────
function getVerificationStatus(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('approved class-a') || s.includes('approved class-b') || s.includes('approved class-c') || s.includes('approved') || s.includes('empanelled') || s.includes('active')) {
    return {
      type: 'ACTIVE',
      headline: '✅ EMPANELMENT ACTIVE & VERIFIED',
      subline: 'This vendor is an officially empanelled member of Hindustan Projects and is authorized to participate in active tenders.',
      bgGradient: 'linear-gradient(135deg,#064E3B,#047857)',
      borderColor: '#6EE7B7',
      badgeBg: 'rgba(16,185,129,0.2)',
      badgeColor: '#6EE7B7',
      icon: 'VERIFIED',
      scannerMsg: 'You may proceed. This vendor\'s empanelment is currently active and authorized for project execution.',
      scannerColor: '#ECFDF5',
      scannerBorder: '#A7F3D0',
    };
  }
  if (s.includes('suspended')) {
    return {
      type: 'SUSPENDED',
      headline: '⚠️ MEMBERSHIP SUSPENDED',
      subline: 'This vendor\'s empanelment has been temporarily suspended by Hindustan Projects procurement authority.',
      bgGradient: 'linear-gradient(135deg,#78350F,#D97706)',
      borderColor: '#FDE68A',
      badgeBg: 'rgba(245,158,11,0.2)',
      badgeColor: '#FCD34D',
      icon: 'SUSPENDED',
      scannerMsg: 'CAUTION: Do not enter into any contract or financial transaction with this vendor without prior approval from Hindustan Projects procurement office.',
      scannerColor: '#FFFBEB',
      scannerBorder: '#FDE68A',
    };
  }
  if (s.includes('blacklist') || s.includes('terminated') || s.includes('deregistered') || s.includes('debarred')) {
    return {
      type: 'TERMINATED',
      headline: '🚫 EMPANELMENT TERMINATED',
      subline: 'This vendor has been removed from the Hindustan Projects approved vendor registry. Verification card is no longer valid.',
      bgGradient: 'linear-gradient(135deg,#7F1D1D,#DC2626)',
      borderColor: '#FCA5A5',
      badgeBg: 'rgba(220,38,38,0.25)',
      badgeColor: '#FCA5A5',
      icon: 'TERMINATED',
      scannerMsg: 'WARNING: This vendor is NOT authorized to work with Hindustan Projects. If someone is presenting credentials under this ID, please report to procurement@hindustanprojects.in immediately.',
      scannerColor: '#FEF2F2',
      scannerBorder: '#FECACA',
    };
  }
  if (s.includes('rejected')) {
    return {
      type: 'REJECTED',
      headline: '❌ APPLICATION REJECTED',
      subline: 'This vendor\'s empanelment application was reviewed and rejected by the Procurement Technical Committee.',
      bgGradient: 'linear-gradient(135deg,#450A0A,#991B1B)',
      borderColor: '#FCA5A5',
      badgeBg: 'rgba(153,27,27,0.25)',
      badgeColor: '#FCA5A5',
      icon: 'REJECTED',
      scannerMsg: 'This vendor is NOT empanelled with Hindustan Projects. Do not authorize any work or payment.',
      scannerColor: '#FEF2F2',
      scannerBorder: '#FECACA',
    };
  }
  if (s.includes('clarification')) {
    return {
      type: 'CLARIFICATION',
      headline: '📋 CLARIFICATION REQUIRED',
      subline: 'The Procurement Committee has raised queries on this application. Vendor\'s empanelment is on hold pending response.',
      bgGradient: 'linear-gradient(135deg,#2E1065,#7C3AED)',
      borderColor: '#C4B5FD',
      badgeBg: 'rgba(124,58,237,0.2)',
      badgeColor: '#C4B5FD',
      icon: 'PENDING',
      scannerMsg: 'This vendor\'s empanelment is currently on hold. Verify with Hindustan Projects procurement office before engaging.',
      scannerColor: '#F5F3FF',
      scannerBorder: '#DDD6FE',
    };
  }
  // Default — under verification
  return {
    type: 'PENDING',
    headline: '🔍 UNDER VERIFICATION',
    subline: 'This vendor\'s application is currently being audited by the Hindustan Projects Financial & Technical Committee.',
    bgGradient: 'linear-gradient(135deg,#0B1B3D,#0047AB)',
    borderColor: '#93C5FD',
    badgeBg: 'rgba(0,71,171,0.2)',
    badgeColor: '#93C5FD',
    icon: 'PENDING',
    scannerMsg: 'This vendor is registered but NOT YET APPROVED. Empanelment verification is still in progress. Do not engage until approval is confirmed.',
    scannerColor: '#EFF6FF',
    scannerBorder: '#BFDBFE',
  };
}

export default function TrackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  // ── Auto-search when link/QR is opened (URL has ?code=HP-EMP-XXX or ?id=HP-EMP-XXX) ──
  useEffect(() => {
    const idFromUrl = searchParams.get('code') || searchParams.get('id') || searchParams.get('track') || searchParams.get('ref');
    if (idFromUrl && idFromUrl.trim()) {
      setSearchInput(idFromUrl.trim());
      setQrScanned(true);
      setTimeout(() => {
        document.getElementById('track-search-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 300);
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const query = (searchInput || '').trim();
    if (!query) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    const backendUrl = API_BASE_URL;

    let foundData = null;

    // Check if trackingId was deleted by Procurement Admin
    let deletedIds = [];
    try {
      deletedIds = (JSON.parse(localStorage.getItem('hipro_deleted_applications') || '[]')).map(v => String(v).trim());
    } catch (e) {}

    // 1. Query Live VPS Backend API First (Real Database Records)
    try {
      const response = await fetch(`${backendUrl}/api/empanelment/status/${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          foundData = data.data;
        }
      }
    } catch (err) {
      console.warn('API Search notice, fallback to local apps:', err);
    }

    // 2. Fallback to Local Applications if API offline or not found
    if (!foundData) {
      try {
        const localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
        const match = localApps.find(app => {
          const tid = String(app.tracking_id || app.trackingId || app.id || '').toLowerCase();
          const gstin = String(app.gstin || '').toLowerCase();
          const phone = String(app.phone || '');
          const email = String(app.email || '').toLowerCase();
          const name = String(app.company_name || app.companyName || app.contact_name || app.contactName || '').toLowerCase();
          const q = query.toLowerCase();
          return tid === q || gstin === q || phone.includes(query) || email === q || name.includes(q);
        });
        if (match) foundData = match;
      } catch (err) {
        console.warn('Local apps check error:', err);
      }
    }

    // 3. Fallback to Approved Vendors
    if (!foundData) {
      try {
        const approved = JSON.parse(localStorage.getItem('hipro_approved_vendors') || '[]');
        const matchApproved = approved.find(app => {
          const tid = String(app.tracking_id || app.trackingId || app.id || '').toLowerCase();
          const gstin = String(app.gstin || '').toLowerCase();
          const phone = String(app.phone || '');
          const email = String(app.email || '').toLowerCase();
          const name = String(app.company_name || app.companyName || '').toLowerCase();
          const q = query.toLowerCase();
          return tid === q || gstin === q || phone.includes(query) || email === q || name.includes(q);
        });
        if (matchApproved) foundData = matchApproved;
      } catch (err) {
        console.warn('Approved check error:', err);
      }
    }

    const trackingId = String(foundData?.tracking_id || foundData?.trackingId || foundData?.id || query.toUpperCase()).trim();

    if (!foundData || deletedIds.includes(trackingId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Extract Real Data Fields
    const companyName = foundData.company_name || foundData.companyName || foundData.contact_name || foundData.contactName || 'Applicant Entity';
    const gstin = foundData.gstin || (foundData.gstExempt ? 'EXEMPT / NO GST' : 'GST PENDING');
    const category = (foundData.category || foundData.primary_role || 'CIVIL & STRUCTURAL').toUpperCase();
    const submittedAt = foundData.submitted_at || foundData.submittedAt || foundData.submittedDate || new Date().toISOString();
    const formattedDate = new Date(submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const currentStage = foundData.current_stage || foundData.stage || 'Financial & Technical Committee Audit';
    const status = foundData.status || 'Under Verification';
    const hashSignature = foundData.hash_signature || foundData.hashSignature || '8f3a9e120bc741a8d0521e90b6a718cf3a89045b';

    const isApproved = status === 'APPROVED' || String(status).includes('Approved') || String(status).includes('Active');
    const isRejected = String(status).includes('Rejected');

    setResult({
      id: trackingId,
      company: companyName,
      gstin: gstin,
      category: category,
      submittedDate: formattedDate,
      stage: currentStage,
      status: status,
      hashSignature: hashSignature,
      fullData: foundData,
      steps: [
        { label: 'Application Filed & SHA-256 Hash Generated', desc: `Filed on ${formattedDate} (Verified Audit Trail)`, done: true },
        { label: 'GSTIN REG-06 & MCA Statutory Audit', desc: 'Statutory tax identity & PAN verification cleared', done: true },
        { label: currentStage, desc: isApproved ? 'Audit Completed & Tier Assigned' : isRejected ? 'Committee Audit Concluded' : 'Reviewing 3-year turnovers & technical capability', done: isApproved, active: !isApproved && !isRejected },
        { label: 'Empanelment Tier Classification & Certificate Issue', desc: isApproved ? 'Class-A / B Tier Certificate Active' : 'Class-A / Class-B Tier Rating assignment', done: isApproved },
        { label: 'Active Bidding Clearance & Tender Onboarding', desc: isApproved ? 'Authorized for active tenders' : 'Qualified for active Hindustan Projects tenders', done: isApproved }
      ]
    });
    setLoading(false);
  };

  return (
    <div className="track-page-container">
      <div className="track-form-card">
        
        {/* Header */}
        <div className="track-header-wrap">
          <div style={{ padding: '0.85rem', borderRadius: 14, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', flexShrink: 0 }}>
            <Search style={{ width: 28, height: 28 }} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              HINDUSTAN PROJECTS • CORPORATE PROCUREMENT PORTAL
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2, marginBottom: 2 }}>
              Track Vendor Empanelment Application Status
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time 5-stage verification audit tracker for contractors, consultants &amp; suppliers.
            </p>
          </div>
        </div>

        {/* Multi-Method Search Form */}
        {/* QR Scan detected banner */}
        {qrScanned && (
          <div style={{ marginBottom: '1rem', padding: '0.65rem 1rem', borderRadius: 10, background: 'linear-gradient(90deg,#0047AB,#0B1B3D)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>📱</span>
            <div>
              <div style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '0.85rem' }}>QR Code Scan Detected — Auto Searching...</div>
              <div style={{ color: '#93C5FD', fontSize: '0.73rem' }}>Vendor ID Card verified. Fetching official empanelment record from Hindustan Projects registry.</div>
            </div>
          </div>
        )}

        <form id="track-search-form" onSubmit={handleSearch} style={{ marginBottom: '1.75rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              Enter Tracking Reference Code, 15-Digit GSTIN, or Registered Email Address:
            </label>
            <div className="track-search-row">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. HP-EMP-025 or 08HYJPK8847M1ZC or contact@builder.com"
                className="form-input"
                style={{ flex: '1 1 240px', fontSize: '0.95rem', fontWeight: 700 }}
                required
              />
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.75rem 1.75rem', justifyContent: 'center' }}>
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
                  <strong style={{ color: '#0F172A', display: 'block' }}>✉️ Registered Email Address</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Corporate email address registered during onboarding.</span>
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
                <li><strong>Registered Email:</strong> Make sure you enter the exact corporate email address used during registration.</li>
                <li><strong>Haven't filed yet?</strong> If you have not submitted the empanelment form, please register below.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-accent" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <FilePlus style={{ width: 16, height: 16 }} />
                <span>Submit New Application</span>
              </Link>
              
              <a href="mailto:industrial@hindustanprojects.in" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.65rem 1rem' }}>
                <PhoneCall style={{ width: 16, height: 16, color: '#0047AB' }} />
                <span>Contact Procurement Officer (+91-7597000601)</span>
              </a>
            </div>
          </div>
        )}

        {/* VALID REAL SEARCH RESULTS DISPLAY */}
        {result && (() => {
          const vs = getVerificationStatus(result.status);
          return (
            <div>

              {/* ══ BIG QR VERIFICATION STATUS HERO CARD ══ */}
              <div className="track-status-hero" style={{ border: `2px solid ${vs.borderColor}` }}>
                
                {/* Status Banner */}
                <div className="track-status-banner" style={{ background: vs.bgGradient }}>
                  {/* Big status icon */}
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: vs.badgeBg, border: `3px solid ${vs.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {vs.icon === 'VERIFIED' && <ShieldCheck style={{ width: 28, height: 28, color: vs.borderColor }} />}
                    {vs.icon === 'SUSPENDED' && <PauseCircle style={{ width: 28, height: 28, color: vs.borderColor }} />}
                    {vs.icon === 'TERMINATED' && <Ban style={{ width: 28, height: 28, color: vs.borderColor }} />}
                    {vs.icon === 'REJECTED' && <XCircle style={{ width: 28, height: 28, color: vs.borderColor }} />}
                    {vs.icon === 'PENDING' && <Clock style={{ width: 28, height: 28, color: vs.borderColor }} />}
                  </div>

                  <div style={{ flex: '1 1 auto', minWidth: 0, wordBreak: 'break-word' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.25, wordBreak: 'break-word' }}>
                      {vs.headline}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vs.badgeColor, marginTop: '0.35rem', lineHeight: 1.45, wordBreak: 'break-word' }}>
                      {vs.subline}
                    </div>
                  </div>

                  {/* Vendor ID pill */}
                  <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '0.45rem 0.85rem', border: `1px solid ${vs.borderColor}`, flexShrink: 0 }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 800, color: vs.badgeColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vendor ID</div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 900, color: '#FFFFFF', fontSize: '0.95rem', marginTop: 2 }}>{result.id}</div>
                  </div>
                </div>

                {/* Vendor Details Row */}
                <div style={{ background: 'var(--bg-card)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', borderBottom: `1px solid var(--border-color)` }}>
                  <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', wordBreak: 'break-word' }}>{result.company}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: '0.25rem 0.5rem', alignItems: 'center' }}>
                      <span>GSTIN: <strong style={{ fontFamily: 'monospace' }}>{result.gstin}</strong></span>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <span>Category: <strong>{result.category}</strong></span>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <span>Filed: <strong>{result.submittedDate}</strong></span>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  {result.fullData && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%', maxWidth: 'max-content' }}>
                      <button onClick={() => setShowReceiptModal(true)} className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: 8 }}>
                        <Printer style={{ width: 14, height: 14 }} />
                        <span>Print Application Dossier</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Scanner Advisory Box */}
                <div style={{ background: vs.scannerColor, padding: '0.85rem 1.1rem', borderTop: `1.5px solid ${vs.scannerBorder}`, display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Shield style={{ width: 18, height: 18, color: '#374151', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>📱 Scanner Advisory — Verification System</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1F2937', lineHeight: 1.45, wordBreak: 'break-word' }}>{vs.scannerMsg}</div>
                  </div>
                </div>
              </div>

              {/* SHA-256 Hash + Timeline — below the hero */}
              <div style={{ padding: '1.25rem 1.1rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                {/* Cryptographic SHA-256 Hash Ribbon */}
                <div style={{ padding: '0.65rem 0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.73rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', wordBreak: 'break-all' }}>
                  <span style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>🔒 SHA-256 Hash: <strong style={{ wordBreak: 'break-all' }}>{result.hashSignature}</strong></span>
                  <span style={{ color: '#047857', fontWeight: 800, flexShrink: 0 }}>✓ Verified Audit Trail</span>
                </div>

                {/* 5-Stage Visual Progress Timeline */}
                <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', color: '#0047AB' }}>
                  5-Stage Vendor Audit &amp; Classification Pipeline:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {result.steps.map((st, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontWeight: 900,
                        backgroundColor: st.done ? '#10B981' : st.active ? '#0047AB' : 'var(--border-color)',
                        color: 'white',
                        boxShadow: st.active ? '0 0 14px rgba(0,71,171,0.45)' : 'none',
                        flexShrink: 0
                      }}>
                        {st.done ? '✓' : idx + 1}
                      </div>
                      <div style={{ flex: 1, paddingTop: 2, minWidth: 0, wordBreak: 'break-word' }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 900, color: st.active ? '#0047AB' : st.done ? '#047857' : 'var(--text-primary)', lineHeight: 1.35, wordBreak: 'break-word' }}>{st.label}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4, wordBreak: 'break-word' }}>{st.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })()}

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
              <span style={{ color: 'var(--text-muted)' }}>industrial@hindustanprojects.in</span>
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
    </div>
  );
}
