import React from 'react';
import { Lock, ShieldCheck, Eye, Database, CheckCircle2, FileText, Server, Scale } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="privacy-page" style={{ padding: '2.5rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ padding: '0.35rem 0.95rem', borderRadius: 99, backgroundColor: 'rgba(4, 120, 87, 0.08)', color: '#047857', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          🔒 Corporate Data Confidentiality Policy
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginTop: '0.65rem', marginBottom: '0.5rem' }}>
          Privacy &amp; Document Vault Protection Policy
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Effective Date: January 1, 2026 • 256-Bit SSL Encrypted Corporate Infrastructure
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 24, border: '1.5px solid #CBD5E1', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#334155', lineHeight: 1.65, fontSize: '0.9rem' }}>
        
        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock style={{ width: 20, height: 20, color: '#047857' }} /> 1. Commitment to Data Confidentiality
          </h3>
          <p style={{ margin: 0 }}>
            Hindustan Projects is committed to protecting the financial, legal, and operational privacy of all applicants and empanelled vendors. All corporate information submitted through <code>www.empanelment.hindustanprojects.in</code> is treated with strict confidentiality under ISO 27001 data protection protocols.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database style={{ width: 20, height: 20, color: '#0047AB' }} /> 2. Nature of Information Collected
          </h3>
          <p style={{ margin: 0 }}>
            We collect company registration details, GST/PAN numbers, financial turnover statements, Bank UTR transaction references, passport photographs, and authorized signatory details solely for procurement verification, tender eligibility assessment, and Smart Vendor ID Card generation.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck style={{ width: 20, height: 20, color: '#ED1C24' }} /> 3. 256-Bit SSL Encryption &amp; Vault Security
          </h3>
          <p style={{ margin: 0 }}>
            All document uploads (PAN Cards, Aadhaar Scans, Cancelled Cheques, GST REG-06 Certificates) are transmitted via 256-bit SSL encrypted channels and stored in secure cloud document vaults. Access is strictly governed by role-based permissions for authorized procurement audit officers.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye style={{ width: 20, height: 20, color: '#F59E0B' }} /> 4. Non-Disclosure &amp; Third-Party Protection
          </h3>
          <p style={{ margin: 0 }}>
            Hindustan Projects does not sell, rent, lease, or share vendor commercial data with commercial third parties under any circumstances. Information may only be disclosed to statutory government authorities (GST Network, Income Tax Department, CVC) upon official legal requisition.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server style={{ width: 20, height: 20, color: '#8B5CF6' }} /> 5. Data Retention &amp; Vendor Rights
          </h3>
          <p style={{ margin: 0 }}>
            Empaneled vendor records are retained for the duration of the active empanelment period (up to 3 Years) and subsequent statutory retention mandates. Vendors reserve the right to request updates or corrections to bank details or address credentials by writing to our nodal desk.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem' }}>
            6. Data Protection Officer Contact
          </h3>
          <p style={{ margin: 0 }}>
            For privacy inquiries or data update requests, contact our Nodal Security Officer at <strong>empanelment@hindustanprojects.in</strong> or call <strong>+91 7597000601</strong> (Mon–Sat, 09:00 AM – 06:00 PM IST).
          </p>
        </section>

      </div>

    </div>
  );
}
