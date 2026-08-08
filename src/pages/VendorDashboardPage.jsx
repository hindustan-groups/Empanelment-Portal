import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Award, FileText, Download, DollarSign, Clock, CheckCircle2, Building2, Briefcase, Lock, UserCheck, Printer, LogOut, Search, ExternalLink, FileCheck2, FolderCheck, ArrowRight, X, AlertCircle, HelpCircle, MessageSquarePlus, Send, Activity, ShieldAlert, QrCode, FileSignature, Bell } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';
import GatePassModal from '../components/GatePassModal';
import Logo from '../components/Logo';
import { getEmpanelmentMode } from '../utils/printDossier';
import { API_BASE_URL } from '../config/api';

export default function VendorDashboardPage() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  /* Active Tab & Dynamic Modals State */
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'work_orders' | 'tenders' | 'payouts' | 'documents' | 'support'
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  
  /* Work Orders & Contracts State */
  const [workOrders] = useState([
    { code: 'HP-WO-2026-081', project: 'Jaipur Commercial Tower (B+G+18)', package: 'Turnkey RCC Structural Package', val: '₹ 14.50 Crores', startDate: '01 Jun 2026', endDate: '30 May 2027', status: 'ACTIVE & IN EXECUTION', progress: '35%' },
    { code: 'HP-WO-2026-042', project: 'Bhilwara Industrial Park Site-2', package: 'Site Ground Leveling & Foundation Substructure', val: '₹ 3.20 Crores', startDate: '15 Jan 2026', endDate: '10 May 2026', status: 'COMPLETED & HANDED OVER', progress: '100%' }
  ]);
  const [biddingTender, setBiddingTender] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidRemarks, setBidRemarks] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [submittedBids, setSubmittedBids] = useState(() => {
    return JSON.parse(localStorage.getItem('hipro_vendor_submitted_bids') || '[]');
  });

  /* Live Tenders Synced from Admin Panel API */
  const [liveTenders, setLiveTenders] = useState([]);

  /* Invoices & Payouts State */
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ invoiceNo: '', milestone: 'Milestone 1: Progress Claim', amt: '', file: null });
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);
  const [vendorInvoices, setVendorInvoices] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_invoices');
    return saved ? JSON.parse(saved) : [];
  });

  /* Site Gate Passes State */
  const [sitePasses, setSitePasses] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_site_passes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({ category: 'Construction Site Gate Pass Request', query: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [vendorTickets, setVendorTickets] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const session = localStorage.getItem('hipro_vendor_session');
    if (!session) {
      navigate('/vendor-login');
      return;
    }
    try {
      const parsed = JSON.parse(session);
      // Fetch latest data from stored applications if available
      const allApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const match = allApps.find(app => app.tracking_id === parsed.tracking_id || app.gstin === parsed.gstin);
      if (match) {
        setVendor({ ...parsed, ...match });
      } else {
        setVendor(parsed);
      }
    } catch {
      navigate('/vendor-login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!vendor) return;
    fetch(`${API_BASE_URL}/api/tenders`)
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setLiveTenders(data.data.map(t => ({
            ref: t.tender_no || t.id,
            title: t.title,
            val: t.estimated_value || '₹ TBD',
            location: t.location || 'Rajasthan',
            end: t.due_date || 'Open',
            scope: t.category || 'Empanelled vendor opportunity'
          })));
        }
      })
      .catch(() => {});
  }, [vendor]);

  /* Persist local state changes */
  useEffect(() => {
    localStorage.setItem('hipro_vendor_submitted_bids', JSON.stringify(submittedBids));
  }, [submittedBids]);

  useEffect(() => {
    localStorage.setItem('hipro_vendor_invoices', JSON.stringify(vendorInvoices));
  }, [vendorInvoices]);

  useEffect(() => {
    localStorage.setItem('hipro_vendor_tickets', JSON.stringify(vendorTickets));
  }, [vendorTickets]);

  const handleLogout = () => {
    localStorage.removeItem('hipro_vendor_session');
    navigate('/vendor-login');
  };

  const handleCreateBid = (e) => {
    e.preventDefault();
    if (!bidAmount) return;
    const newBid = {
      ref: biddingTender.ref,
      title: biddingTender.title,
      amount: bidAmount,
      remarks: bidRemarks || 'Commercial bid submitted with 100% EMD waiver.',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'UNDER COMMITTEE AUDIT ⏳'
    };
    setSubmittedBids(prev => [newBid, ...prev]);
    setBidSubmitted(true);
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!invoiceForm.invoiceNo || !invoiceForm.amt) return;

    try {
      await fetch(`${API_BASE_URL}/api/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_no: invoiceForm.invoiceNo,
          vendor_tracking_id: vendor.tracking_id,
          vendor_name: vendor.company_name || vendor.contact_name,
          amount: invoiceForm.amt,
          work_order_no: invoiceForm.milestone,
          date: new Date().toLocaleDateString('en-IN')
        })
      });
    } catch (err) {
      console.warn('Invoice API notice:', err.message);
    }

    const newInv = {
      id: invoiceForm.invoiceNo,
      milestone: invoiceForm.milestone,
      tranche: 'Progress Claim',
      amt: `₹ ${Number(invoiceForm.amt).toLocaleString('en-IN')}`,
      status: 'IN FINANCE AUDIT ⏳',
      ref: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVendorInvoices(prev => [newInv, ...prev]);
    setInvoiceSubmitted(true);
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!ticketForm.query) return;

    const tNo = `TCK-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await fetch(`${API_BASE_URL}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_no: tNo,
          vendor_tracking_id: vendor.tracking_id,
          vendor_name: vendor.company_name || vendor.contact_name,
          subject: `${ticketForm.category}: ${ticketForm.query.substring(0, 80)}`,
          category: ticketForm.category
        })
      });
    } catch (err) {
      console.warn('Ticket API notice:', err.message);
    }

    const newTck = {
      ticket: tNo,
      subject: `${ticketForm.category}: ${ticketForm.query.substring(0, 45)}...`,
      status: 'OPEN & ASSIGNED ⏳',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVendorTickets(prev => [newTck, ...prev]);
    setTicketSubmitted(true);
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

              {vendor && (
                <div style={{ padding: '0.25rem 0.65rem', borderRadius: 99, background: 'rgba(0,71,171,0.08)', color: '#0047AB', fontSize: '0.725rem', fontWeight: 900, border: '1px solid rgba(0,71,171,0.25)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>{getEmpanelmentMode(vendor).badge}</span>
                </div>
              )}

              <div style={{ padding: '0.25rem 0.65rem', borderRadius: 99, background: 'rgba(16,185,129,0.12)', color: '#047857', fontSize: '0.725rem', fontWeight: 900, border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck style={{ width: 13, height: 13, color: '#10B981' }} />
                <span>OFFICIAL VENDOR PORTAL</span>
              </div>

              <a href="https://www.hindustanprojects.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textDecoration: 'none', padding: '0.25rem 0.6rem', borderRadius: 8, backgroundColor: 'rgba(0,71,171,0.08)', border: '1px solid rgba(0,71,171,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>🌐 Main Site</span>
                <ExternalLink style={{ width: 12, height: 12 }} />
              </a>
            </div>

            {/* Right User Status & Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 900, color: '#0F172A' }}>{vendor?.company_name}</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Code: <strong>{vendor?.tracking_id}</strong></div>
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
              { id: 'overview', label: '📊 Overview & Profile', icon: Award },
              { id: 'work_orders', label: '📜 Work Orders & Contracts', icon: FileSignature },
              { id: 'tenders', label: '🏗️ Active Tenders Radar', icon: Briefcase },
              { id: 'payouts', label: '💰 Payouts & Invoices', icon: DollarSign },
              { id: 'documents', label: '📂 Document Vault', icon: FolderCheck },
              { id: 'support', label: '💬 Technical Support Desk', icon: HelpCircle },
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
      <main style={{ maxWidth: 1240, margin: '1.5rem auto 4rem auto', padding: '0 1.25rem' }}>
        
        {/* Action Notification Alert Strip */}
        <div style={{ padding: '0.75rem 1.25rem', borderRadius: 12, background: 'rgba(0,71,171,0.06)', border: '1px solid rgba(0,71,171,0.2)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 700, color: '#0047AB' }}>
            <Bell style={{ width: 16, height: 16, color: '#0047AB' }} />
            <span>
              <strong>Live Procurement Alert:</strong>{' '}
              {workOrders.filter(wo => wo.status && wo.status.includes('ACTIVE')).length > 0
                ? `Work Order ${workOrders.find(wo => wo.status && wo.status.includes('ACTIVE'))?.code} is active. Daily site QR gate pass generation is open for site engineers.`
                : 'Welcome to your Vendor Portal. Check Active Tenders for new bidding opportunities.'}
            </span>
          </div>
          <button
            onClick={() => setShowGatePassModal(true)}
            style={{ padding: '0.3rem 0.75rem', borderRadius: 8, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <QrCode style={{ width: 13, height: 13 }} />
            <span>Generate Site Gate Pass</span>
          </button>
        </div>

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
                <span>Tracking Ref: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.tracking_id}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.gstin || 'N/A'}</strong></span>
                <span>•</span>
                <span>Category: <strong style={{ textTransform: 'uppercase', color: '#93C5FD' }}>{vendor.category || 'Civil & Structural'}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowGatePassModal(true)}
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: 12, backgroundColor: '#10B981', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <QrCode style={{ width: 16, height: 16 }} />
              <span>🎟️ Daily Site QR Gate Pass</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>Print A4 Certificate</span>
            </button>

            <button
              onClick={() => setShowIdCardModal(true)}
              className="btn-accent"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: 12, cursor: 'pointer' }}
            >
              <UserCheck style={{ width: 16, height: 16 }} />
              <span>🪪 Smart PVC ID Card</span>
            </button>
          </div>
        </div>

        {/* ════════════════ TAB 1: OVERVIEW & PROFILE ════════════════ */}
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
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>{vendor.status?.toUpperCase() || 'CLASS-A (TIER 1)'}</div>
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

            {/* Detailed Verified Corporate Entity Profile */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 style={{ width: 20, height: 20 }} />
                <span>Verified Vendor Profile & Contact Information:</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>Key Contact Person</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{vendor.contact_name || vendor.signatory_name || 'N/A'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vendor.designation || 'Proprietor / Authorized Officer'}</div>
                </div>

                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>Registered Email & Phone</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{vendor.email || 'N/A'}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0047AB' }}>{vendor.phone || 'N/A'}</div>
                </div>

                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>Entity Type & Establishment</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginTop: 2, textTransform: 'capitalize' }}>{(vendor.entity_type || 'Sole Proprietor').replace('_', ' ')}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. Year: {vendor.est_year || '2018'}</div>
                </div>

                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 800 }}>Primary Location / Address</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{vendor.city || 'Bhilwara'}, {vendor.state || 'Rajasthan'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vendor.address || 'Industrial Area'} - {vendor.pincode || '311001'}</div>
                </div>
              </div>

              {/* Financial & Banking Strip */}
              <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', borderRadius: 14, backgroundColor: 'rgba(0,71,171,0.04)', border: '1px solid rgba(0,71,171,0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>PAN Number: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#0F172A' }}>{vendor.pan || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>MSME Udyam: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#0F172A' }}>{vendor.msme_no || 'UDYAM-VERIFIED'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Bank Account: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#047857' }}>{vendor.bank_account ? `•••• ${vendor.bank_account.slice(-4)}` : 'Verified Bank'}</strong> ({vendor.ifsc || 'HDFC Bank'})
                </div>
                <div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Declared 2025 Turnover: </span>
                  <strong style={{ fontSize: '0.9rem', color: '#0047AB' }}>₹ {vendor.turnover_2025 || '350'} Lakhs</strong>
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

            {/* 🎟️ Issued Site Gate Passes History Card */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <QrCode style={{ width: 18, height: 18, color: '#0047AB' }} />
                    <span>Issued Construction Site Gate Passes Roster:</span>
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active & Historical 24-Hr Security QR Passes generated for site supervisors and workers.</span>
                </div>
                <button
                  onClick={() => setShowGatePassModal(true)}
                  style={{ padding: '0.4rem 0.85rem', borderRadius: 8, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <QrCode style={{ width: 13, height: 13 }} />
                  <span>+ Generate New Gate Pass</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sitePasses.map((p, idx) => (
                  <div key={idx} style={{ padding: '0.9rem 1.1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                        <span style={{ fontWeight: 900, color: '#0047AB', fontFamily: 'monospace' }}>{p.passCode}</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.1rem 0.45rem', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#047857' }}>ACTIVE PASS</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', background: 'rgba(245,158,11,0.15)', padding: '0.1rem 0.45rem', borderRadius: 4 }}>{p.validityDays || '1 Day'}</span>
                      </div>
                      <div style={{ fontWeight: 800, color: '#0F172A' }}>{p.siteLocation}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Supervisor: <strong>{p.visitorName}</strong> • Workers: <strong>{p.workerCount} Personnel</strong> • Vehicle: <strong>{p.vehicleNo}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                      <div style={{ color: 'var(--text-muted)' }}>Valid Till: <strong style={{ color: '#0047AB' }}>{p.validTill}</strong></div>
                      <a
                        href={p.qrData}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#047857', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: 4 }}
                      >
                        <span>Verify QR Pass ↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB: WORK ORDERS & EXECUTED CONTRACTS ════════════════ */}
        {activeTab === 'work_orders' && (
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileSignature style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Executed Contracts & Formal Work Orders Roster:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Official Work Orders issued to {vendor.company_name} by Hindustan Projects Corporate Procurement Committee.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {workOrders.map((wo, idx) => (
                <div key={idx} style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.65rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.6rem', borderRadius: 6, fontFamily: 'monospace' }}>
                          {wo.code}
                        </span>
                        <span style={{ fontSize: '0.725rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 6, backgroundColor: wo.status.includes('ACTIVE') ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: wo.status.includes('ACTIVE') ? '#047857' : '#0047AB' }}>
                          {wo.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>{wo.project} — {wo.package}</h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#047857' }}>{wo.val}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Progress Completion: <strong>{wo.progress}</strong></div>
                    </div>
                  </div>

                  {/* Execution Timeline & Actions Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <div>Execution Timeline: <strong>{wo.startDate}</strong> to <strong>{wo.endDate}</strong></div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setShowGatePassModal(true)}
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <QrCode style={{ width: 13, height: 13 }} />
                        <span>Site Gate Pass</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading Official Work Order PDF for ${wo.code}...`)}
                        className="btn-accent"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <FileText style={{ width: 13, height: 13 }} />
                        <span>Work Order PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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

            {/* Submitted Bids History if any */}
            {submittedBids.length > 0 && (
              <div style={{ marginBottom: '1.5rem', padding: '1.15rem', borderRadius: 14, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#047857', marginBottom: '0.5rem' }}>
                  📋 Your Submitted Tender Proposals ({submittedBids.length}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {submittedBids.map((b, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: '#fff', borderRadius: 8, fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                      <div>
                        <strong style={{ color: '#0047AB' }}>{b.ref}</strong> — {b.title}
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Quoted: <strong>₹ {b.amount} Cr</strong> • Submitted on {b.date}</div>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: 6, background: 'rgba(245,158,11,0.15)', color: '#B45309' }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {liveTenders.map((tnd, idx) => (
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
                      onClick={() => { setBiddingTender(tnd); setBidAmount(tnd.val.replace('₹ ', '').replace(' Crores', '')); setBidSubmitted(false); }}
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
                  All vendor payouts are processed directly via RTGS / NEFT to your verified bank account (`{vendor.bank_account || vendor.gstin}`).
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
              {vendorInvoices.map((p, idx) => (
                <div key={idx} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0F172A' }}>{p.milestone}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Tranche: <strong>{p.tranche}</strong> • Ref: <strong style={{ fontFamily: 'monospace' }}>{p.ref || p.id}</strong> • Date: <strong>{p.date}</strong>
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
                { title: 'GST REG-06 Certificate', type: 'CBIC Tax Identity', status: 'VERIFIED & ACTIVE', file: vendor.gst_doc || 'gst_certificate.pdf', date: 'Valid till 31 Mar 2027' },
                { title: 'Income Tax PAN Card Copy', type: 'Govt Tax ID', status: 'VERIFIED', file: vendor.pan_doc || 'pan_card.pdf', date: 'Permanent Residency ID' },
                { title: 'Cancelled Bank Cheque', type: 'Payout Verification', status: 'VERIFIED', file: vendor.bank_doc || 'bank_cheque.pdf', date: vendor.bank_name || 'HDFC Bank Ltd' },
                { title: 'Experience / Completion Certificates', type: 'Past Work Proof', status: 'VERIFIED', file: vendor.exp_doc || 'experience_docs.pdf', date: 'Audited by Technical Comm.' },
              ].map((d, idx) => (
                <div key={idx} style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#047857', backgroundColor: 'rgba(16,185,129,0.12)', padding: '0.15rem 0.5rem', borderRadius: 6, width: 'fit-content', marginBottom: 4 }}>
                    ✓ {d.status}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>{d.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{d.type} • {d.date}</div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#0047AB', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FileText style={{ width: 14, height: 14 }} /> {d.file}
                  </div>
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
              {vendorTickets.map((t, idx) => (
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

                  <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '0.2rem 0.65rem', borderRadius: 6, backgroundColor: t.status.includes('RESOLVED') ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: t.status.includes('RESOLVED') ? '#047857' : '#0047AB' }}>
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
                  Your commercial bid for <strong>{biddingTender.ref}</strong> has been recorded and submitted to the Procurement Committee.
                </p>
                <button onClick={() => setBiddingTender(null)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateBid}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Submitting tender proposal as <strong>{vendor.company_name}</strong> (EMD Waived).
                </p>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Quoted Commercial Lump-Sum Bid (in ₹ Crores) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    placeholder="e.g. 13.80"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Technical Capability & Execution Remarks</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={bidRemarks}
                    onChange={e => setBidRemarks(e.target.value)}
                    placeholder="We commit to execute as per GFC drawings & NBC 2016 building code specifications..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setBiddingTender(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Confirm & Submit Bid
                  </button>
                </div>
              </form>
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
              <form onSubmit={handleCreateInvoice}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">GST Tax Invoice Number *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. INV-2026-8812"
                    value={invoiceForm.invoiceNo}
                    onChange={e => setInvoiceForm({ ...invoiceForm, invoiceNo: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Invoice Amount (in ₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    placeholder="e.g. 725000"
                    value={invoiceForm.amt}
                    onChange={e => setInvoiceForm({ ...invoiceForm, amt: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Attach Signed PDF Invoice Copy</label>
                  <input type="file" className="form-input" accept=".pdf" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowInvoiceModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Invoice
                  </button>
                </div>
              </form>
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
                  Your support inquiry has been logged. Assigned procurement officer will respond within 24 hours.
                </p>
                <button onClick={() => setShowTicketModal(false)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Support Category</label>
                  <select
                    className="form-input"
                    value={ticketForm.category}
                    onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                  >
                    <option>Construction Site Gate Pass Request</option>
                    <option>GFC Structural Drawing Clarification</option>
                    <option>RTGS Payment Payout Status Inquiry</option>
                    <option>GST Certificate Renewal Request</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Describe your query / issue *</label>
                  <textarea
                    required
                    className="form-input"
                    rows={3}
                    placeholder="Provide complete details..."
                    value={ticketForm.query}
                    onChange={e => setTicketForm({ ...ticketForm, query: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowTicketModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Ticket
                  </button>
                </div>
              </form>
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
            status: vendor.status || 'Approved Class-A',
            submitted_at: vendor.submitted_at || new Date().toISOString()
          }}
        />
      )}

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
            status: vendor.status || 'Approved Class-A',
            submitted_at: vendor.submitted_at || new Date().toISOString()
          }}
        />
      )}
      {/* ════════════════ VENDOR SMART ID CARD MODAL ════════════════ */}
      {showIdCardModal && (
        <VendorIdCardModal
          isOpen={showIdCardModal}
          onClose={() => setShowIdCardModal(false)}
          vendorData={vendor}
          onPhotoUpdate={(newPhoto) => {
            setVendor(prev => prev ? ({ ...prev, passportPhoto: newPhoto, photo_url: newPhoto, photoUrl: newPhoto }) : null);
          }}
        />
      )}

      {/* ════════════════ DAILY SITE QR GATE PASS MODAL ════════════════ */}
      {showGatePassModal && (
        <GatePassModal
          isOpen={showGatePassModal}
          onClose={() => setShowGatePassModal(false)}
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
