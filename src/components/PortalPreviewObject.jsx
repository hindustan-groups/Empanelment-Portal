import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Zap, Lock, FileText, Cpu, Server, FileCheck2, ArrowRight } from 'lucide-react';

export default function PortalPreviewObject({ onStartForm }) {
  return (
    <div style={{ maxWidth: 1200, margin: '2.5rem auto 4rem auto', padding: '0 1.5rem' }}>
      
      {/* Enterprise Showcase Card Container */}
      <div style={{
        borderRadius: 24,
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #002B66 100%)',
        padding: '2.5rem',
        color: 'white',
        boxShadow: '0 20px 50px rgba(0, 71, 171, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: 9999, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34D399', fontSize: '0.775rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Zap style={{ width: 14, height: 14 }} />
              <span>Next-Gen Enterprise Procurement Console</span>
            </div>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
              HiPRO Real-Time Empanelment Engine
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: 620 }}>
              Automated document screening, GSTIN API verification, financial scoring & Instant SHA-256 Dossier generation.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.8rem', fontWeight: 700 }}>
            <Server style={{ width: 16, height: 16, color: '#60A5FA' }} />
            <span>Host: empanel.hindustanprojects.in</span>
          </div>
        </div>

        {/* Interactive Feature Objects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          {/* Object 1: Instant GST Auto-Verifier */}
          <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(96, 165, 250, 0.2)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Automated GSTIN API</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>Instant Tax Verification</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Auto-fetches GST filing status, legal trade title, and PAN link without manual delays.
            </p>
          </div>

          {/* Object 2: SHA-256 Audit Trail */}
          <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>SHA-256 Tamper Proof</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>Cryptographic Hash</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Every application generates a unique legal cryptographic hash for CVC compliance.
            </p>
          </div>

          {/* Object 3: Auto A4 PDF Dossier */}
          <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck2 style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Printable A4 Dossier</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>1-Click PDF Generation</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Generates official corporate acknowledgment receipt slip for physical submission & records.
            </p>
          </div>

          {/* Object 4: MSME Policy Support */}
          <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(244, 114, 182, 0.2)', color: '#F472B6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Govt. MSME Policy</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>₹0 Fee Exemption</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              UDYAM-registered micro & small enterprises get 100% processing fee waiver automatically.
            </p>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#94A3B8' }}>
            <ShieldCheck style={{ width: 16, height: 16, color: '#34D399' }} />
            <span>Authorized by Hindustan Projects Corporate Procurement Division</span>
          </div>

          <button onClick={onStartForm} className="btn-accent" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', borderRadius: 12 }}>
            <span>Fill Empanelment Form Now</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>

      </div>
    </div>
  );
}
