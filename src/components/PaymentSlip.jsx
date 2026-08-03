import React from 'react';
import { CreditCard, CheckCircle2, ShieldAlert, Award, FileText, Download } from 'lucide-react';

export default function PaymentSlip({ isMsme, category }) {
  const baseFee = 2500;
  const gstAmount = 450; // 18% GST
  const totalAmount = isMsme ? 0 : 2950;

  return (
    <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard style={{ width: 18, height: 18, color: '#0047AB' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Empanelment Application Processing Fee & EMD Waiver</span>
        </div>
        
        {isMsme ? (
          <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: 9999, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#047857' }}>
            ✓ MSME Fee Exempted
          </span>
        ) : (
          <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: 9999, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
            Non-Refundable Processing Fee
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
        
        <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Fee Breakdown</div>
          {isMsme ? (
            <div style={{ marginTop: '0.25rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10B981' }}>₹ 0 (EXEMPTED)</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Under Public Procurement Policy for MSEs</div>
            </div>
          ) : (
            <div style={{ marginTop: '0.25rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>₹ 2,950 INCL GST</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>₹ 2,500 Application Fee + ₹ 450 GST (18%)</div>
            </div>
          )}
        </div>

        <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Official Bank Payout Details</div>
          <div style={{ fontSize: '0.775rem', marginTop: '0.25rem', lineHeight: 1.4 }}>
            <div>Bank: <strong>HDFC Bank Ltd</strong></div>
            <div>Payout via: <strong>RTGS / NEFT Direct Transfer</strong></div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>Bank details shared privately after empanelment approval.</div>
          </div>
        </div>

      </div>

    </div>
  );
}
