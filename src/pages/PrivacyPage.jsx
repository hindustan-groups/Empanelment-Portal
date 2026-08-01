import React from 'react';
import { Lock, ShieldCheck, Eye, Database, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="privacy-page" style={{ padding: '2.5rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ padding: '0.35rem 0.95rem', borderRadius: 99, backgroundColor: 'rgba(4, 120, 87, 0.08)', color: '#047857', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          🔒 Data Security & Confidentiality Policy
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginTop: '0.65rem', marginBottom: '0.5rem' }}>
          Privacy & Document Protection Policy
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Effective Date: January 1, 2026 • 256-Bit SSL Encrypted Corporate System
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 24, border: '1.5px solid #CBD5E1', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#334155', lineHeight: 1.65, fontSize: '0.9rem' }}>
        
        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock style={{ width: 20, height: 20, color: '#047857' }} /> 1. Commitment to Data Confidentiality
          </h3>
          <p style={{ margin: 0 }}>
            Hindustan Projects is committed to protecting the financial, legal, and operational privacy of all applicants and empanelled vendors. All corporate information submitted through <code>www.empanelment.hindustanprojects.in</code> is treated with strict confidentiality.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database style={{ width: 20, height: 20, color: '#0047AB' }} /> 2. Information Collected
          </h3>
          <p style={{ margin: 0 }}>
            We collect company registration details, GST/PAN numbers, financial turnover statements, Bank UTR transaction references, passport photographs, and authorized signatory details solely for procurement verification, tender eligibility assessment, and Smart Vendor ID Card generation.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck style={{ width: 20, height: 20, color: '#ED1C24' }} /> 3. 256-Bit Encryption & Third-Party Non-Disclosure
          </h3>
          <p style={{ margin: 0 }}>
            All document uploads and form data are transmitted via 256-bit SSL encryption. Hindustan Projects does not sell, rent, or trade vendor data to third-party commercial entities under any circumstances.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem' }}>
            4. Data Protection Contact
          </h3>
          <p style={{ margin: 0 }}>
            For privacy inquiries or data update requests, contact our Data Security Officer at <strong>empanelment@hindustanprojects.in</strong> or call <strong>+91 7597000601</strong>.
          </p>
        </section>

      </div>

    </div>
  );
}
