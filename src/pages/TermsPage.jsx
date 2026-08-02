import React from 'react';
import { ShieldCheck, Scale, FileText, Lock, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="terms-page" style={{ padding: '2.5rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ padding: '0.35rem 0.95rem', borderRadius: 99, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ⚖️ Legal Governance &amp; Compliance Terms
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginTop: '0.65rem', marginBottom: '0.5rem' }}>
          Terms &amp; Conditions of Vendor Empanelment
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Effective Date: January 1, 2026 • Hindustan Projects Corporate Governance Manual
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 24, border: '1.5px solid #CBD5E1', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#334155', lineHeight: 1.65, fontSize: '0.9rem' }}>
        
        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale style={{ width: 20, height: 20, color: '#0047AB' }} /> 1. Scope &amp; Applicability
          </h3>
          <p style={{ margin: 0 }}>
            These Terms &amp; Conditions govern the registration, evaluation, empanelment, code of conduct, and bidding eligibility of contractors, consultants, service providers, and material suppliers filing for empanelment with Hindustan Projects via the official portal (<code>empanelment.hindustanprojects.in</code>).
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText style={{ width: 20, height: 20, color: '#ED1C24' }} /> 2. Authenticity of Corporate Documents
          </h3>
          <p style={{ margin: 0 }}>
            The vendor affirms that all submitted GST Certificates, PAN details, Certificates of Incorporation, MSME Udyam credentials, CA Turnover Audits, and Work Order Certificates are 100% authentic and legally valid. Submission of fraudulent or forged documents shall result in immediate rejection, permanent blacklisting, and legal prosecution under applicable Indian laws.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck style={{ width: 20, height: 20, color: '#047857' }} /> 3. Smart PVC ID Card &amp; QR Code Site Rules
          </h3>
          <p style={{ margin: 0 }}>
            Empanelled vendors issued an official Hindustan Projects Smart PVC ID Card must adhere to site access compliance. The QR code on the card links dynamically to the live verification engine. If a vendor's status is changed to <strong>SUSPENDED</strong> or <strong>TERMINATED</strong> by Admin, the card becomes null and void for site entry.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 style={{ width: 20, height: 20, color: '#10B981' }} /> 4. 7-Day RTGS Payout Commitment &amp; Work Orders
          </h3>
          <p style={{ margin: 0 }}>
            No work commences without a written corporate Work Order. Certified Running Account (RA) bills are processed for bank payout within a guaranteed 7-day RTGS SLA from the date of final bill verification by our engineering audit desk.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle style={{ width: 20, height: 20, color: '#F59E0B' }} /> 5. Blacklisting &amp; Performance Delisting Policy
          </h3>
          <p style={{ margin: 0 }}>
            Hindustan Projects reserves the right to suspend or cancel empanelment without prior notice in cases of project abandonment, sub-standard material supply, safety violations at execution sites, quarterly rating score drops below 60%, or non-compliance with NBC 2016 building norms.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.5rem' }}>
            6. Arbitration &amp; Legal Jurisdiction
          </h3>
          <p style={{ margin: 0 }}>
            All disputes, claims, or legal proceedings arising out of vendor empanelment or contract execution shall be subject to arbitration under the Arbitration &amp; Conciliation Act 1996 in <strong>Bhilwara, Rajasthan, India</strong>.
          </p>
        </section>

      </div>

    </div>
  );
}
