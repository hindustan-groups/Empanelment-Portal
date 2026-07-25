import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Download, Home, Search, ShieldCheck, ArrowRight, Printer, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ isOpen, trackingId, formData, onClose }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTrackDirect = () => {
    onClose();
    navigate('/track');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content printable-area" style={{ maxWidth: 540, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Check Icon */}
        <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
          <CheckCircle2 style={{ width: 36, height: 36 }} />
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ✓ Verified Official Registration
        </span>
        <h3 style={{ fontSize: '1.65rem', fontWeight: 900, marginBottom: '0.5rem', marginTop: '0.25rem' }}>
          Empanelment Filed Successfully!
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Your vendor application has been logged into the <strong>Hindustan Projects</strong> procurement database.
        </p>

        {/* Tracking ID Copy Box */}
        <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1.5px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Empanelment Tracking Reference Code
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace', letterSpacing: '1px' }}>
              {trackingId}
            </span>
            <button
              onClick={copyTrackingId}
              title="Copy Reference Code"
              className="btn-secondary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', backgroundColor: copied ? '#10B981' : 'var(--bg-card)', color: copied ? 'white' : 'var(--text-primary)' }}
            >
              {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Details Summary Box */}
        <div style={{ textAlign: 'left', padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Organization:</span>
            <strong>{formData?.companyName || 'Applicant Firm'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>GSTIN Registration:</span>
            <strong style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>{formData?.gstin || 'GST NOTIFIED'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Authorized Officer:</span>
            <strong>{formData?.contactName || 'Authorized Officer'} ({formData?.phone || 'Mobile Verified'})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subdomain Host:</span>
            <strong style={{ color: '#0047AB' }}>empanel.hindustanprojects.in</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Receipt Slip</span>
          </button>
          
          <button onClick={handleTrackDirect} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Search style={{ width: 16, height: 16 }} />
            <span>Track Status Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}
