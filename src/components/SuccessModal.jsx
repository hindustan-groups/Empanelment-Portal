import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Download, Home } from 'lucide-react';
import Logo from './Logo';

export default function SuccessModal({ isOpen, trackingId, formData, onClose }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ED1C24', '#0047AB', '#10B981', '#F59E0B']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    alert(`Tracking ID ${trackingId} copied to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 520, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <CheckCircle2 style={{ width: 32, height: 32 }} />
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          Empanelment Filed Successfully!
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Your vendor application has been logged into the <strong>Hindustan Projects</strong> procurement database.
        </p>

        {/* Tracking ID Badge */}
        <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Empanelment Reference Code</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyCenter: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace' }}>
              {trackingId}
            </span>
            <button
              onClick={copyTrackingId}
              title="Copy Reference Code"
              style={{ padding: '0.35rem', borderRadius: 6, border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', cursor: 'pointer' }}
            >
              <Copy style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

        {/* Details Summary */}
        <div style={{ textAlign: 'left', padding: '0.85rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Organization:</span>
            <strong>{formData?.companyName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>GSTIN:</span>
            <strong style={{ textTransform: 'uppercase' }}>{formData?.gstin}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subdomain:</span>
            <strong style={{ color: '#0047AB' }}>empanel.hindustanprojects.in</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyCenter: 'center' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1 }}>
            <Download style={{ width: 14, height: 14 }} />
            <span>Download PDF</span>
          </button>
          
          <button onClick={onClose} className="btn-primary" style={{ flex: 1 }}>
            <Home style={{ width: 14, height: 14 }} />
            <span>Return to Portal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
