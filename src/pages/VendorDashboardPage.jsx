import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Award, FileText, Download, DollarSign, Clock, CheckCircle2, Building2, Briefcase, Lock, UserCheck, Printer, LogOut, Search, ExternalLink, FileCheck2, FolderCheck, ArrowRight, X, AlertCircle, HelpCircle, MessageSquarePlus, Send, Activity, ShieldAlert } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';
import Logo from '../components/Logo';

export default function VendorDashboardPage() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tenders' | 'payouts' | 'documents' | 'support'
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [biddingTender, setBiddingTender] = useState(null);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('hipro_vendor_session');
    if (!session) {
      navigate('/vendor-login');
      return;
    }
    try {
      setVendor(JSON.parse(session));
    } catch {
      navigate('/vendor-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hipro_vendor_session');
    navigate('/vendor-login');
  };

  if (!vendor) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* ════════════════ STANDALONE PORTAL TOP NAVBAR ════════════════ */}
      <header className="vendor-dashboard-header" style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.85rem 1.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {/* Top Row: Branding, Badges & Logout */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            
            {/* Left Branding Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/vendor-dashboard" style={{ textDecoration: 'none' }}>
                <Logo height={38} />
              </Link>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em' }}>
                  HINDUSTAN PROJECTS
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Corporate Procurement Portal
                </div>
              </div>

              <div style={{ padding: '0.25rem 0.65rem', borderRadius: 99, background: 'rgba(16,185,129,0.12)', color: '#047857', fontSize: '0.725rem', fontWeight: 900, border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck style={{ width: 13, height: 13, color: '#10B981' }} />
                <span>OFFICIAL VENDOR PORTAL</span>
              </div>

              <Link to="/" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textDecoration: 'none', padding: '0.25rem 0.6rem', borderRadius: 8, backgroundColor: 'rgba(0,71,171,0.08)', border: '1px solid rgba(0,71,171,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>← Main Site</span>
              </Link>
            </div>

            {/* Right User Status & Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 900, color: '#0F172A' }}>{vendor.company_name}</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Code: <strong>{vendor.tracking_id}</strong></div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: 9,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#ED1C24',
                  background: 'rgba(237,28,36,0.08)',
                  border: '1px solid rgba(237,28,36,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogOut style={{ width: 14, height: 14 }} />
                <span>Sign Out</span>
              </button>
            </div>

          </div>

          {/* Bottom Row: Centered Desktop Navigation Tabs */}
          <div className="vendor-dashboard-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }}>
            {[
              { id: 'overview', label: '📊 Overview & Health', icon: Award },
              { id: 'tenders', label: '🏗️ Active Tenders Radar', icon: Briefcase },
              { id: 'payouts', label: '💰 Payouts & Invoices', icon: DollarSign },
              { id: 'documents', label: '📂 Document Vault', icon: FolderCheck },
              { id: 'support', label: '💬 Technical Support', icon: HelpCircle },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: 10,
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 900 : 700,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid #0047AB' : '1px solid var(--border-color)',
                    background: isActive ? '#0047AB' : 'var(--bg-surface)',
                    color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: isActive ? '0 4px 12px rgba(0,71,171,0.2)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* ════════════════ PORTAL MAIN BODY CONTENT ════════════════ */}
      <main style={{ maxWidth: 1240, margin: '2rem auto 4rem auto', padding: '0 1.25rem' }}>
        
        {/* Executive Welcome Banner */}
        <div className="vendor-welcome-banner" style={{
          padding: '1.75rem 2rem',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 style={{ width: 28, height: 28 }} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HINDUSTAN PROJECTS • EMPANELLED VENDOR PORTAL
              </div>
              <h1 className="vendor-welcome-title" style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: 2, marginBottom: 2 }}>
                {vendor.company_name}
              </h1>
              <div style={{ fontSize: '0.825rem', color: '#CBD5E1', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 4 }}>
                <span>Tracking Reference: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.tracking_id}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.gstin}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {vendor.status && vendor.status.startsWith('Approved') ? (
              <>
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}
                >
                  <Printer style={{ width: 16, height: 16 }} />
                  <span>Print Official A4 Certificate</span>
                </button>

                <button
                  onClick={() => setShowIdCardModal(true)}
                  className="btn-accent"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: 12, cursor: 'pointer' }}
                >
                  <UserCheck style={{ width: 16, height: 16 }} />
                  <span>🪪 Print Official Vendor Smart ID Card</span>
                </button>
              </>
            ) : (
              <div style={{ padding: '0.6rem 1rem', borderRadius: 12, backgroundColor: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#FCA5A5', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>Printing Locked (Pending Admin & CEO Approval)</span>
              </div>
            )}
          </div>
        </div>

        {/* Audit Status Banner (If Pending Approval) */}
        {(!vendor.status || !vendor.status.startsWith('Approved')) && (
          <div style={{ padding: '1rem 1.25rem', borderRadius: 14, backgroundColor: '#FEF3C7', border: '1.5px solid #F59E0B', color: '#92400E', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <Clock style={{ width: 22, height: 22, flexShrink: 0, color: '#D97706' }} />
            <div>
              <strong style={{ color: '#78350F', display: 'block', fontSize: '0.9rem' }}>⏳ Application Status: Pending Procurement Committee & CEO Approval</strong>
              Your submitted documents and statutory details are currently under verification. Once approved by the CEO Office, your Official A4 Certificate & PVC ID Card print access will automatically unlock.
            </div>
          </div>
        )}

        {/* ════════════════ TAB 1: OVERVIEW & CERTIFICATE ════════════════ */}
        {activeTab === 'overview' && (
          <div>
            {/* 4 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #10B981', boxShadow: '0 4px 16px rgba(16,185,129,0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} />
                  <span>Empanelment Status</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>EMPANELLED</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Verified & Active FY 2026-27</div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #0047AB', boxShadow: '0 4px 16px rgba(0,71,171,0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award style={{ width: 16, height: 16, color: '#0047AB' }} />
                  <span>Capability Rating</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>CLASS-A (TIER 1)</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Eligible for Pan-India Tenders</div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <DollarSign style={{ width: 16, height: 16, color: '#F59E0B' }} />
                  <span>EMD Exemption Waiver</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>₹ 0 (WAIVED)</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Under Corporate Empanelment Clause</div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock style={{ width: 16, height: 16, color: '#64748B' }} />
                  <span>Milestone Payout Cycle</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>7-DAY RTGS</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 2 }}>Direct Bank Account Release</div>
              </div>
            </div>

            {/* Vendor Performance & Compliance Health Score Card */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity style={{ width: 18, height: 18 }} />
                <span>Vendor Performance & Quality Audit Scorecard (FY 2026-27):</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>Overall Compliance Rating</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#047857', marginTop: 2 }}>98 / 100 (A+ GRADE)</div>
                </div>

                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>On-Time Milestone Delivery</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0047AB', marginTop: 2 }}>96.4% ACCURACY</div>
                </div>

                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>NBC 2016 Safety Standard</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#047857', marginTop: 2 }}>100% COMPLIANT</div>
                </div>
              </div>
            </div>

            {/* Official Certificate Download Card */}
            <div style={{ padding: '2rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1.5px solid #0047AB', boxShadow: 'var(--shadow-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: 600 }}>
                <div style={{ padding: '0.25rem 0.65rem', borderRadius: 6, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', width: 'fit-content', marginBottom: '0.5rem' }}>
                  ✓ Official Corporate Document
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.35rem' }}>
                  Official Empanelment Certificate & Verified A4 Dossier
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Your official empanelment certificate and 3-page verified corporate dossier are approved by the Procurement Committee & CEO Office. Click below to view and print.
                </p>
              </div>

              <button
                onClick={() => setShowCertificateModal(true)}
                className="btn-accent"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', borderRadius: 12 }}
              >
                <Printer style={{ width: 18, height: 18 }} />
                <span>Download A4 Certificate (PDF)</span>
              </button>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 2: ACTIVE TENDERS RADAR ════════════════ */}
        {activeTab === 'tenders' && (
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Active Hindustan Projects Tenders & Bidding Radar:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                As a Class-A Empanelled Vendor, EMD is 100% waived for all active project tenders.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { ref: 'HP-TND-2026-101', title: 'Jaipur Commercial Tower — Turnkey Civil & Structural Package', val: '₹ 14.50 Crores', location: 'Jaipur, Rajasthan', end: '08 Aug 2026', scope: 'Complete RCC superstructure, basement waterproofing, and structural steel fabrication.' },
                { ref: 'HP-TND-2026-102', title: 'Bhilwara Industrial Park — High-Tension Electrical & Substation Installation', val: '₹ 3.80 Crores', location: 'Bhilwara, Rajasthan', end: '12 Aug 2026', scope: '11kV Substation installation, HT cable laying, transformer commissioning, and panel board setup.' },
                { ref: 'HP-TND-2026-103', title: 'Luxury Residential Township — BIM Architectural & HVAC Consultancy', val: '₹ 1.20 Crores', location: 'Udaipur, Rajasthan', end: '15 Aug 2026', scope: 'Revit 3D BIM modeling, VRF HVAC layout design, fire safety NOC documentation.' },
              ].map((tnd, idx) => (
                <div key={idx} style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.65rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.6rem', borderRadius: 6, fontFamily: 'monospace' }}>
                          {tnd.ref}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 800 }}>✓ EMD WAIVED</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>{tnd.title}</h4>
                    </div>

                    <button
                      className="btn-primary"
                      onClick={() => { setBiddingTender(tnd); setBidSubmitted(false); }}
                      style={{ padding: '0.55rem 1.15rem', fontSize: '0.825rem', borderRadius: 10, background: '#0047AB' }}
                    >
                      <span>Submit Tender Bid</span>
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.45 }}>
                    <strong>Scope Summary:</strong> {tnd.scope}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span>Estimated Package Value: <strong style={{ color: '#047857' }}>{tnd.val}</strong></span>
                    <span>•</span>
                    <span>Location: <strong>{tnd.location}</strong></span>
                    <span>•</span>
                    <span>Bid Deadline: <strong>{tnd.end}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 3: MILESTONE PAYOUTS & INVOICES ════════════════ */}
        {activeTab === 'payouts' && (
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign style={{ width: 20, height: 20, color: '#10B981' }} />
                  <span>Milestone Payment Release & Tax Invoices:</span>
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  All vendor payouts are processed directly via RTGS / NEFT to your verified HDFC Bank account (`{vendor.gstin}`).
                </p>
              </div>

              <button
                onClick={() => { setShowInvoiceModal(true); setInvoiceSubmitted(false); }}
                className="btn-accent"
                style={{ padding: '0.55rem 1.15rem', fontSize: '0.825rem', borderRadius: 10 }}
              >
                <FileCheck2 style={{ width: 15, height: 15 }} />
                <span>Submit RA Bill / GST Invoice</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { milestone: 'Milestone 1: Concept & Floor Plans Sign-Off', tranche: '30% Tranche', amt: '₹ 4,35,000', status: 'RELEASED via RTGS', ref: 'RTGS-HDFC280726-99120', date: '28 Jul 2026' },
                { milestone: 'Milestone 2: GFC Structural & MEP Drawings Release', tranche: '50% Tranche', amt: '₹ 7,25,000', status: 'IN AUDIT VERIFICATION', ref: 'AUDIT-PENDING-STAGE2', date: 'Expected 05 Aug 2026' },
                { milestone: 'Milestone 3: Site Quality Audit & Final Completion', tranche: '20% Tranche', amt: '₹ 2,90,000', status: 'UPCOMING MILESTONE', ref: 'STAGE3-SCHEDULED', date: 'Expected 20 Aug 2026' },
              ].map((p, idx) => (
                <div key={idx} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0F172A' }}>{p.milestone}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Tranche: <strong>{p.tranche}</strong> • Bank Ref: <strong style={{ fontFamily: 'monospace' }}>{p.ref}</strong> • Date: <strong>{p.date}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857' }}>{p.amt}</div>
                    <span style={{ fontSize: '0.725rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 6, backgroundColor: p.status.includes('RELEASED') ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: p.status.includes('RELEASED') ? '#047857' : '#B45309' }}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 4: DOCUMENT VAULT & LOCKER ════════════════ */}
        {activeTab === 'documents' && (
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Statutory Tax & Compliance Document Locker:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Verified tax identity and bank cheque files attached to your empanelment code `{vendor.tracking_id}`.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'GST REG-06 Certificate', type: 'CBIC Tax Identity', status: 'VERIFIED & ACTIVE', date: 'Valid till 31 Mar 2027' },
                { title: 'Income Tax PAN Card Copy', type: 'Govt Tax ID', status: 'VERIFIED', date: 'Permanent Residency ID' },
                { title: 'Cancelled Bank Cheque', type: 'Payout Verification', status: 'VERIFIED', date: 'HDFC Bank Ltd' },
                { title: 'Aadhaar Card Scans', type: 'Signatory National ID', status: 'VERIFIED', date: 'UIDAI Authenticated' },
              ].map((d, idx) => (
                <div key={idx} style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#047857', backgroundColor: 'rgba(16,185,129,0.12)', padding: '0.15rem 0.5rem', borderRadius: 6, width: 'fit-content', marginBottom: 4 }}>
                    ✓ {d.status}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>{d.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{d.type} • {d.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 5: TECHNICAL SUPPORT & HELPDESK ════════════════ */}
        {activeTab === 'support' && (
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Vendor Technical Helpdesk & Ticket System:</span>
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Direct communication channel with Hindustan Projects corporate procurement committee.
                </p>
              </div>

              <button
                onClick={() => { setShowTicketModal(true); setTicketSubmitted(false); }}
                className="btn-accent"
                style={{ padding: '0.55rem 1.15rem', fontSize: '0.825rem', borderRadius: 10 }}
              >
                <MessageSquarePlus style={{ width: 15, height: 15 }} />
                <span>Raise New Support Ticket</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { ticket: 'TCK-99201', subject: 'Construction Site Entry Gate Pass Request (Jaipur Tower)', status: 'RESOLVED', date: '27 Jul 2026' },
                { ticket: 'TCK-99145', subject: 'GFC Structural Drawing Revision R1 Clarification Request', status: 'IN PROGRESS', date: '28 Jul 2026' },
              ].map((t, idx) => (
                <div key={idx} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                        {t.ticket}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created: <strong>{t.date}</strong></span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>{t.subject}</div>
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '0.2rem 0.65rem', borderRadius: 6, backgroundColor: t.status === 'RESOLVED' ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: t.status === 'RESOLVED' ? '#047857' : '#0047AB' }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ════════════════ BID SUBMISSION MODAL ════════════════ */}
      {biddingTender && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 550, width: '100%', padding: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.2rem 0.65rem', borderRadius: 6 }}>
                  {biddingTender.ref}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginTop: 4, color: '#0F172A' }}>Submit Tender Proposal</h3>
              </div>
              <button onClick={() => setBiddingTender(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            {bidSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 44, height: 44, color: '#10B981', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857' }}>Bid Proposal Submitted Successfully!</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your technical proposal for <strong>{biddingTender.ref}</strong> has been logged. Our procurement committee will review it within 48 hours.
                </p>
                <button onClick={() => setBiddingTender(null)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Submitting tender proposal as <strong>{vendor.company_name}</strong> (EMD Waived).
                </p>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Quoted Commercial Lump-Sum Bid (in ₹ Crores)</label>
                  <input type="text" className="form-input" defaultValue={biddingTender.val.replace('₹ ', '').replace(' Crores', '')} />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Technical Capability & Execution Remarks</label>
                  <textarea className="form-input" rows={3} defaultValue="We commit to execute as per GFC drawings & NBC 2016 building code specifications within the stipulated completion timeline." />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setBiddingTender(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button onClick={() => setBidSubmitted(true)} className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Confirm & Submit Bid
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ INVOICE SUBMISSION MODAL ════════════════ */}
      {showInvoiceModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 520, width: '100%', padding: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>Submit Milestone Invoice / RA Bill</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Upload GST Invoice for 7-day RTGS payout release</div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            {invoiceSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 44, height: 44, color: '#10B981', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857' }}>Invoice Submitted Successfully!</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your GST tax invoice has been routed to finance department for RTGS payout release.
                </p>
                <button onClick={() => setShowInvoiceModal(false)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">GST Tax Invoice Number</label>
                  <input type="text" className="form-input" placeholder="e.g. INV-2026-8812" />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Invoice Amount (in ₹)</label>
                  <input type="text" className="form-input" placeholder="e.g. 725000" />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Attach Signed PDF Invoice Copy</label>
                  <input type="file" className="form-input" accept=".pdf" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setShowInvoiceModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button onClick={() => setInvoiceSubmitted(true)} className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ SUPPORT TICKET MODAL ════════════════ */}
      {showTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 520, width: '100%', padding: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>Raise Technical Support Ticket</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Direct ticket channel to corporate procurement team</div>
              </div>
              <button onClick={() => setShowTicketModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            {ticketSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 44, height: 44, color: '#10B981', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857' }}>Ticket Created Successfully!</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Ticket reference code <strong>TCK-99240</strong> assigned. Assigned procurement officer will respond within 24 hours.
                </p>
                <button onClick={() => setShowTicketModal(false)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Support Category</label>
                  <select className="form-input">
                    <option>Construction Site Gate Pass Request</option>
                    <option>GFC Structural Drawing Clarification</option>
                    <option>RTGS Payment Payout Status Inquiry</option>
                    <option>GST Certificate Renewal Request</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Describe your query / issue</label>
                  <textarea className="form-input" rows={3} placeholder="Provide complete details..." />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setShowTicketModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button onClick={() => setTicketSubmitted(true)} className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ CERTIFICATE A4 DOSSIER MODAL ════════════════ */}
      {showCertificateModal && (
        <SuccessModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          trackingId={vendor.tracking_id}
          formData={{
            companyName: vendor.company_name,
            gstin: vendor.gstin,
            category: vendor.category,
            submitted_at: new Date().toISOString()
          }}
        />
      )}
      {/* ════════════════ VENDOR SMART ID CARD MODAL ════════════════ */}
      {showIdCardModal && (
        <VendorIdCardModal
          isOpen={showIdCardModal}
          onClose={() => setShowIdCardModal(false)}
          vendorData={vendor}
        />
      )}

      {/* Standalone Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', padding: '1.25rem 1.75rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        © 2026 Hindustan Projects Corporate Procurement Division. Secure Vendor Portal (256-Bit SSL Encrypted).
      </footer>

    </div>
  );
}
