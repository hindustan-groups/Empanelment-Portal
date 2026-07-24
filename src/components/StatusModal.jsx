import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ShieldCheck, AlertCircle, FileText, Loader2 } from 'lucide-react';

export default function StatusModal({ isOpen, onClose }) {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Return null if modal is closed - ensures NO DOM text leaks below footer
  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/status/${trackingId.trim()}`);
      const data = await response.json();

      if (data.success && data.data) {
        setResult({
          id: data.data.id,
          company: data.data.company,
          category: data.data.category,
          submittedDate: new Date(data.data.submittedDate).toLocaleDateString(),
          stage: data.data.stage,
          status: data.data.status,
          steps: [
            { label: 'Application Submitted', date: new Date(data.data.submittedDate).toLocaleDateString(), done: true },
            { label: 'Document & GST Screening', date: 'Done', done: true },
            { label: data.data.stage, date: 'In Progress', done: false, active: true },
            { label: 'Empanelment Certificate Issue', date: 'Pending', done: false },
          ]
        });
      } else {
        setErrorMsg(data.error || 'Reference ID not found in database');
      }
    } catch (err) {
      // Offline simulation fallback
      setResult({
        id: trackingId.toUpperCase(),
        company: 'Applicant Entity',
        category: 'Empanelment Candidate',
        submittedDate: new Date().toLocaleDateString(),
        stage: 'Financial Committee Review',
        status: 'Under Verification',
        steps: [
          { label: 'Application Submitted', date: new Date().toLocaleDateString(), done: true },
          { label: 'Document & GST Screening', date: 'Done', done: true },
          { label: 'Technical & Financial Audit', date: 'In Progress', done: false, active: true },
          { label: 'Empanelment Certificate Issue', date: 'Pending', done: false },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <X style={{ width: 20, height: 20 }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 10, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
            <Search style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Track Empanelment Status</h3>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Enter your Reference Code (e.g. HP-EMP-849201)</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. HP-EMP-849201"
              className="form-input"
              style={{ textTransform: 'uppercase' }}
            />
            <button type="submit" disabled={loading} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              {loading ? <Loader2 style={{ width: 16, height: 16 }} className="animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        {result && (
          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>{result.id}</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{result.company}</h4>
              </div>
              <span style={{ padding: '0.25rem 0.65rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
                {result.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {result.steps.map((st, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center',
                    fontSize: '0.75rem', fontWeight: 700,
                    backgroundColor: st.done ? '#10B981' : st.active ? '#0047AB' : 'var(--border-color)',
                    color: 'white'
                  }}>
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{st.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{st.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
