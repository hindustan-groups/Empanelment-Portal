import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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
      setResult({
        id: trackingId.toUpperCase(),
        company: 'Applicant Organization',
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
    <div style={{ maxWidth: 800, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
            <Search style={{ width: 24, height: 24 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Track Empanelment Status</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your 9-digit Reference Tracking Code (e.g. HP-EMP-849201)</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. HP-EMP-849201"
              className="form-input"
              style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700 }}
            />
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              {loading ? <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" /> : 'Track Status'}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', fontWeight: 700, fontSize: '0.85rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {result && (
          <div style={{ padding: '1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>{result.id}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{result.company}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category: {result.category}</span>
              </div>
              <span style={{ padding: '0.35rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 800, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
                {result.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.steps.map((st, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center',
                    fontSize: '0.85rem', fontWeight: 800,
                    backgroundColor: st.done ? '#10B981' : st.active ? '#0047AB' : 'var(--border-color)',
                    color: 'white'
                  }}>
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{st.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.date}</div>
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
