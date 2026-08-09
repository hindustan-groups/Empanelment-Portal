import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, FileText, Download, DollarSign, Clock, 
  CheckCircle2, Building2, Briefcase, Lock, UserCheck, Printer, 
  LogOut, Search, ExternalLink, FileCheck2, FolderCheck, ArrowRight, 
  X, AlertCircle, HelpCircle, MessageSquarePlus, Send, Activity, 
  ShieldAlert, QrCode, FileSignature, Bell, Share2, Sun, Moon, 
  Menu, Filter, Sparkles, Check, Phone, Mail, MapPin, Copy
} from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';
import GatePassModal from '../components/GatePassModal';
import Logo from '../components/Logo';
import { getEmpanelmentMode } from '../utils/printDossier';

export default function VendorDashboardPage() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  
  /* Active Tab & Navigation State */
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'work_orders' | 'tenders' | 'payouts' | 'documents' | 'support'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('hipro_theme') === 'dark';
  });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Dynamic Modal Triggers */
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [biddingTender, setBiddingTender] = useState(null);

  /* Search & Filter States */
  const [tenderSearch, setTenderSearch] = useState('');
  const [tenderCategoryFilter, setTenderCategoryFilter] = useState('all');
  const [woSearch, setWoSearch] = useState('');

  /* Work Orders State */
  const [workOrders] = useState([
    { code: 'HP-WO-2026-081', project: 'Jaipur Commercial Tower (B+G+18)', package: 'Turnkey RCC Structural Package', val: '₹ 14.50 Crores', startDate: '01 Jun 2026', endDate: '30 May 2027', status: 'ACTIVE & IN EXECUTION', progress: 35 },
    { code: 'HP-WO-2026-042', project: 'Bhilwara Industrial Park Site-2', package: 'Site Ground Leveling & Foundation Substructure', val: '₹ 3.20 Crores', startDate: '15 Jan 2026', endDate: '10 May 2026', status: 'COMPLETED & HANDED OVER', progress: 100 }
  ]);

  /* Bidding Form State */
  const [bidAmount, setBidAmount] = useState('');
  const [bidRemarks, setBidRemarks] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [submittedBids, setSubmittedBids] = useState(() => {
    return JSON.parse(localStorage.getItem('hipro_vendor_submitted_bids') || '[]');
  });

  /* Live Tenders */
  const [liveTenders] = useState(() => {
    const saved = localStorage.getItem('hipro_tenders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(t => ({
            ref: t.id || t.ref || 'HP-TND-2026-101',
            title: t.title || 'Tender Notice',
            val: t.estimatedCost || t.val || '₹ 5.00 Crore',
            location: t.location || 'Rajasthan Site',
            end: t.dueDate || t.end || '15 Aug 2026',
            scope: t.eligibility || t.scope || 'Empanelled vendor bidding opportunity.',
            category: (t.category || t.title || '').toLowerCase().includes('electrical') ? 'electrical' : 
                      (t.category || t.title || '').toLowerCase().includes('bim') || (t.category || t.title || '').toLowerCase().includes('hvac') ? 'mep' : 'civil'
          }));
        }
      } catch {}
    }
    return [
      { ref: 'HP-TND-2026-101', title: 'Jaipur Commercial Tower — Turnkey Civil & Structural Package', val: '₹ 14.50 Crores', location: 'Jaipur, Rajasthan', end: '08 Aug 2026', scope: 'Complete RCC superstructure, basement waterproofing, and structural steel fabrication.', category: 'civil' },
      { ref: 'HP-TND-2026-102', title: 'Bhilwara Industrial Park — High-Tension Electrical & Substation Installation', val: '₹ 3.80 Crores', location: 'Bhilwara, Rajasthan', end: '12 Aug 2026', scope: '11kV Substation installation, HT cable laying, transformer commissioning, and panel board setup.', category: 'electrical' },
      { ref: 'HP-TND-2026-103', title: 'Luxury Residential Township — BIM Architectural & HVAC Consultancy', val: '₹ 1.20 Crores', location: 'Udaipur, Rajasthan', end: '15 Aug 2026', scope: 'Revit 3D BIM modeling, VRF HVAC layout design, fire safety NOC documentation.', category: 'mep' }
    ];
  });

  /* Invoices & Payouts State */
  const [invoiceForm, setInvoiceForm] = useState({ invoiceNo: '', milestone: 'Milestone 1: Progress Claim', amt: '', file: null });
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);
  const [vendorInvoices, setVendorInvoices] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_invoices');
    return saved ? JSON.parse(saved) : [
      { id: 'INV-2026-881', milestone: 'Milestone 1: Concept & Initial Setup Sign-Off', tranche: '30% Tranche', amt: '₹ 4,35,000', status: 'RELEASED via RTGS', ref: 'RTGS-HDFC280726-99120', date: '28 Jul 2026' },
      { id: 'INV-2026-894', milestone: 'Milestone 2: GFC Drawings & Material Inspection', tranche: '50% Tranche', amt: '₹ 7,25,000', status: 'IN AUDIT VERIFICATION', ref: 'AUDIT-PENDING-STAGE2', date: '05 Aug 2026' }
    ];
  });

  /* Site Gate Passes State */
  const [sitePasses] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_site_passes');
    return saved ? JSON.parse(saved) : [
      { passCode: 'HP-PASS-2026-8812', visitorName: 'Ramesh Kumar (Site Supervisor)', workerCount: '15', vehicleNo: 'RJ 06 GB 1234', validityDays: '1 Day', siteLocation: 'Jaipur Commercial Tower (B+G+18)', date: '01 Aug 2026', validTill: '02 Aug 2026 23:59 IST' }
    ];
  });

  /* Support Tickets State */
  const [ticketForm, setTicketForm] = useState({ category: 'Construction Site Gate Pass Request', query: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [vendorTickets, setVendorTickets] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_tickets');
    return saved ? JSON.parse(saved) : [
      { ticket: 'TCK-99201', subject: 'Construction Site Entry Gate Pass Request (Jaipur Tower)', status: 'RESOLVED', date: '27 Jul 2026' },
      { ticket: 'TCK-99145', subject: 'GFC Structural Drawing Revision R1 Clarification Request', status: 'IN PROGRESS', date: '28 Jul 2026' }
    ];
  });

  // Dark Mode synchronization
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hipro_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hipro_theme', 'light');
    }
  }, [isDarkMode]);

  // Session verification & Hydration
  useEffect(() => {
    const session = localStorage.getItem('hipro_vendor_session');
    if (!session) {
      navigate('/vendor-login');
      return;
    }
    try {
      const parsed = JSON.parse(session);
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('hipro_vendor_session');
    navigate('/vendor-login');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
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
    showToast(`Bid for ${biddingTender.ref} submitted successfully!`);
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!invoiceForm.invoiceNo || !invoiceForm.amt) return;
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
    showToast(`Invoice ${invoiceForm.invoiceNo} logged for verification!`);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketForm.query) return;
    const newTck = {
      ticket: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
      subject: `${ticketForm.category}: ${ticketForm.query.substring(0, 45)}...`,
      status: 'OPEN & ASSIGNED ⏳',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVendorTickets(prev => [newTck, ...prev]);
    setTicketSubmitted(true);
    showToast('Support ticket logged with procurement desk!');
  };

  // WhatsApp & Web Share Gate Pass handler
  const handleShareGatePass = async (pass) => {
    const text = `*HINDUSTAN PROJECTS — SITE GATE PASS*\n` +
      `Pass Code: ${pass.passCode}\n` +
      `Supervisor: ${pass.visitorName}\n` +
      `Workers: ${pass.workerCount} Personnel\n` +
      `Vehicle: ${pass.vehicleNo}\n` +
      `Site: ${pass.siteLocation}\n` +
      `Valid Till: ${pass.validTill}\n` +
      `Authorized by: ${vendor?.company_name || 'Empanelled Vendor'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Gate Pass: ${pass.passCode}`,
          text: text
        });
        showToast('Gate pass shared successfully!');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share error fallback');
        }
      }
    }

    // Fallback to WhatsApp Web link or Clipboard
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    showToast('Opening WhatsApp to share Gate Pass...');
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  if (!vendor) return null;

  // Filtered Tenders list
  const filteredTenders = liveTenders.filter(t => {
    const matchesSearch = !tenderSearch || 
      t.title.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.ref.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.location.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.scope.toLowerCase().includes(tenderSearch.toLowerCase());

    const matchesCategory = tenderCategoryFilter === 'all' || t.category === tenderCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Work Orders list
  const filteredWorkOrders = workOrders.filter(wo => {
    if (!woSearch) return true;
    return wo.code.toLowerCase().includes(woSearch.toLowerCase()) ||
      wo.project.toLowerCase().includes(woSearch.toLowerCase()) ||
      wo.package.toLowerCase().includes(woSearch.toLowerCase());
  });

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: Award, badge: null },
    { id: 'work_orders', label: 'Work Orders', icon: FileSignature, badge: workOrders.length },
    { id: 'tenders', label: 'Tenders Radar', icon: Briefcase, badge: 'EMD 0' },
    { id: 'payouts', label: 'Payouts & RA Bills', icon: DollarSign, badge: null },
    { id: 'documents', label: 'Document Vault', icon: FolderCheck, badge: '4' },
    { id: 'support', label: 'Helpdesk', icon: HelpCircle, badge: null },
  ];

  return (
    <div className="vendor-portal-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: '5rem' }}>
      
      {/* ════════════════ TOAST NOTIFICATION ════════════════ */}
      {toastMessage && (
        <div className="vendor-toast" style={{
          position: 'fixed',
          bottom: '5.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '0.65rem 1.25rem',
          borderRadius: 99,
          fontSize: '0.825rem',
          fontWeight: 700,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid rgba(255,255,255,0.15)',
          animation: 'pageFadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ════════════════ STANDALONE PORTAL TOP NAVBAR ════════════════ */}
      <header className="vendor-dashboard-header" style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.75rem 1.25rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          
          {/* Top Row: Branding, Badges, Theme Switcher & Logout */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            
            {/* Left Branding Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link to="/vendor-dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Logo height={isMobile ? 28 : 34} />
              </Link>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  HINDUSTAN PROJECTS
                </div>
                <div style={{ fontSize: isMobile ? '0.6rem' : '0.68rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Vendor Portal
                </div>
              </div>

              {/* Status Badges - Hidden on Mobile */}
              {!isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
                  {vendor && (
                    <div style={{ padding: '0.2rem 0.55rem', borderRadius: 99, background: 'rgba(0,71,171,0.08)', color: '#0047AB', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(0,71,171,0.25)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>{getEmpanelmentMode(vendor).badge}</span>
                    </div>
                  )}

                  <div style={{ padding: '0.2rem 0.55rem', borderRadius: 99, background: 'rgba(16,185,129,0.12)', color: '#047857', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck style={{ width: 12, height: 12, color: '#10B981' }} />
                    <span>OFFICIAL</span>
                  </div>

                  <a href="https://www.hindustanprojects.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0047AB', textDecoration: 'none', padding: '0.2rem 0.55rem', borderRadius: 8, backgroundColor: 'rgba(0,71,171,0.08)', border: '1px solid rgba(0,71,171,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>🌐 Main Site</span>
                    <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls: Dark Mode Toggle, User Status & Mobile Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                title="Toggle Dark / Light Theme"
                style={{
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  borderRadius: 9,
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                {isDarkMode ? <Sun style={{ width: 15, height: 15, color: '#F59E0B' }} /> : <Moon style={{ width: 15, height: 15, color: '#0047AB' }} />}
              </button>

              {/* Desktop User Info & Sign Out */}
              {!isMobile && (
                <>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', marginRight: '0.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-primary)', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {vendor?.company_name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Code: <strong style={{ color: '#0047AB', fontFamily: 'monospace' }}>{vendor?.tracking_id}</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: 9,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#ED1C24',
                      background: 'rgba(237,28,36,0.08)',
                      border: '1px solid rgba(237,28,36,0.2)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <LogOut style={{ width: 14, height: 14 }} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}

              {/* Mobile Hamburger Drawer Toggle */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    border: '1px solid var(--border-color)',
                    backgroundColor: mobileMenuOpen ? '#0047AB' : 'var(--bg-surface)',
                    color: mobileMenuOpen ? '#FFFFFF' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {mobileMenuOpen ? <X style={{ width: 17, height: 17 }} /> : <Menu style={{ width: 17, height: 17 }} />}
                </button>
              )}

            </div>

          </div>

          {/* Mobile Collapsible Drawer Menu */}
          {mobileMenuOpen && (
            <div className="mobile-drawer-menu" style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 14,
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              animation: 'pageFadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-primary)' }}>{vendor?.company_name}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>ID: <strong style={{ color: '#0047AB', fontFamily: 'monospace' }}>{vendor?.tracking_id}</strong></div>
                </div>
                <div style={{ padding: '0.2rem 0.5rem', borderRadius: 99, background: 'rgba(0,71,171,0.1)', color: '#0047AB', fontSize: '0.68rem', fontWeight: 900 }}>
                  {getEmpanelmentMode(vendor).badge}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => { setShowIdCardModal(true); setMobileMenuOpen(false); }}
                  style={{ padding: '0.5rem', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                >
                  <UserCheck style={{ width: 14, height: 14, color: '#0047AB' }} />
                  <span>PVC ID Card</span>
                </button>

                <button
                  onClick={() => { setShowCertificateModal(true); setMobileMenuOpen(false); }}
                  style={{ padding: '0.5rem', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                >
                  <Printer style={{ width: 14, height: 14, color: '#0047AB' }} />
                  <span>A4 Certificate</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.25rem' }}>
                <a href="https://www.hindustanprojects.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>🌐 Public Website</span>
                  <ExternalLink style={{ width: 12, height: 12 }} />
                </a>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#ED1C24',
                    background: 'rgba(237,28,36,0.1)',
                    border: '1px solid rgba(237,28,36,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <LogOut style={{ width: 13, height: 13 }} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Row: Horizontal Scrollable Touch Tabs */}
          <nav className="vendor-dashboard-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
            {navigationTabs.map(tab => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`vendor-tab-btn ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 10,
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 900 : 700,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid #0047AB' : '1px solid var(--border-color)',
                    background: isActive ? '#0047AB' : 'var(--bg-surface)',
                    color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: isActive ? '0 4px 12px rgba(0,71,171,0.25)' : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <TabIcon style={{ width: 15, height: 15, color: isActive ? '#FFFFFF' : '#0047AB' }} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.35rem',
                      borderRadius: 99,
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,71,171,0.12)',
                      color: isActive ? '#FFFFFF' : '#0047AB',
                      fontWeight: 900
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>
      </header>

      {/* ════════════════ PORTAL MAIN BODY CONTENT ════════════════ */}
      <main style={{ maxWidth: 1240, margin: '1.25rem auto 2rem auto', padding: '0 1rem' }}>
        
        {/* Action Notification Alert Strip */}
        <div className="vendor-alert-strip" style={{
          padding: '0.75rem 1rem',
          borderRadius: 14,
          background: 'rgba(0,71,171,0.06)',
          border: '1px solid rgba(0,71,171,0.2)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#0047AB' }}>
            <Bell style={{ width: 16, height: 16, color: '#0047AB', flexShrink: 0 }} />
            <span><strong>Live Site Security:</strong> Daily QR Gate Pass Generation is active for supervisors and site labor.</span>
          </div>

          <button
            onClick={() => setShowGatePassModal(true)}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: 8,
              background: '#0047AB',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <QrCode style={{ width: 13, height: 13 }} />
            <span>+ Create Gate Pass</span>
          </button>
        </div>

        {/* Executive Welcome Banner */}
        <div className="vendor-welcome-banner" style={{
          padding: '1.5rem 1.75rem',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)',
          color: 'white',
          marginBottom: '1.75rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 style={{ width: 26, height: 26 }} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HINDUSTAN PROJECTS • EMPANELLED VENDOR
              </div>
              <h1 className="vendor-welcome-title" style={{ fontSize: '1.45rem', fontWeight: 900, marginTop: 2, marginBottom: 2, letterSpacing: '-0.01em' }}>
                {vendor.company_name}
              </h1>
              <div className="vendor-banner-meta" style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 4 }}>
                <span>Tracking Ref: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.tracking_id}</strong></span>
                <span className="meta-separator">•</span>
                <span>GSTIN: <strong style={{ fontFamily: 'monospace', color: 'white' }}>{vendor.gstin || 'N/A'}</strong></span>
                <span className="meta-separator">•</span>
                <span>Category: <strong style={{ textTransform: 'uppercase', color: '#93C5FD' }}>{vendor.category || 'Civil & Structural'}</strong></span>
              </div>
            </div>
          </div>

          <div className="vendor-banner-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowGatePassModal(true)}
              style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', borderRadius: 10, backgroundColor: '#10B981', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <QrCode style={{ width: 15, height: 15 }} />
              <span>QR Gate Pass</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Printer style={{ width: 15, height: 15 }} />
              <span>A4 Certificate</span>
            </button>

            <button
              onClick={() => setShowIdCardModal(true)}
              style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', borderRadius: 10, backgroundColor: '#ED1C24', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <UserCheck style={{ width: 15, height: 15 }} />
              <span>Smart ID Card</span>
            </button>
          </div>
        </div>

        {/* ════════════════ TAB 1: OVERVIEW & PROFILE ════════════════ */}
        {activeTab === 'overview' && (
          <div>
            {/* 4 Metric Cards in Responsive Grid */}
            <div className="vendor-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ padding: '1.15rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #10B981', boxShadow: '0 4px 16px rgba(16,185,129,0.08)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 style={{ width: 15, height: 15, color: '#10B981' }} />
                  <span>Empanelment Status</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>EMPANELLED</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Verified & Active FY 2026-27</div>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1.5px solid #0047AB', boxShadow: '0 4px 16px rgba(0,71,171,0.08)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Award style={{ width: 15, height: 15, color: '#0047AB' }} />
                  <span>Capability Rating</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>{vendor.status?.toUpperCase() || 'CLASS-A (TIER 1)'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Eligible for Pan-India Tenders</div>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <DollarSign style={{ width: 15, height: 15, color: '#F59E0B' }} />
                  <span>EMD Exemption Waiver</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>₹ 0 (WAIVED)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Corporate Empanelment Clause</div>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 16, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock style={{ width: 15, height: 15, color: '#64748B' }} />
                  <span>Milestone Payout Cycle</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>7-DAY RTGS</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Direct Bank Account Release</div>
              </div>
            </div>

            {/* Detailed Verified Corporate Entity Profile */}
            <div style={{ padding: '1.35rem 1.5rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Building2 style={{ width: 18, height: 18 }} />
                <span>Verified Corporate Entity Profile:</span>
              </div>

              <div className="vendor-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>Key Contact Person</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2 }}>{vendor.contact_name || vendor.signatory_name || 'N/A'}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{vendor.designation || 'Proprietor / Authorized Officer'}</div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>Registered Email & Phone</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2, wordBreak: 'break-all' }}>{vendor.email || 'N/A'}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0047AB' }}>{vendor.phone || 'N/A'}</div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>Entity Type & Establishment</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2, textTransform: 'capitalize' }}>{(vendor.entity_type || 'Sole Proprietor').replace('_', ' ')}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Est. Year: {vendor.est_year || '2018'}</div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>Primary Location / Address</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2 }}>{vendor.city || 'Bhilwara'}, {vendor.state || 'Rajasthan'}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{vendor.address || 'Industrial Area'} - {vendor.pincode || '311001'}</div>
                </div>
              </div>

              {/* Financial & Banking Strip */}
              <div className="vendor-finance-strip" style={{ marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'rgba(0,71,171,0.04)', border: '1px solid rgba(0,71,171,0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PAN: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{vendor.pan || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MSME Udyam: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{vendor.msme_no || 'UDYAM-VERIFIED'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bank Account: </span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#047857' }}>{vendor.bank_account ? `•••• ${vendor.bank_account.slice(-4)}` : 'Verified Bank'}</strong> ({vendor.ifsc || 'HDFC Bank'})
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2025 Turnover: </span>
                  <strong style={{ fontSize: '0.85rem', color: '#0047AB' }}>₹ {vendor.turnover_2025 || '350'} Lakhs</strong>
                </div>
              </div>
            </div>

            {/* Official Certificate Download Card */}
            <div className="vendor-cert-banner" style={{ padding: '1.5rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1.5px solid #0047AB', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <div style={{ maxWidth: 650 }}>
                <div style={{ padding: '0.2rem 0.55rem', borderRadius: 6, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', width: 'fit-content', marginBottom: '0.35rem' }}>
                  ✓ Official Corporate Document
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Official Empanelment Certificate & Verified A4 Dossier
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  Your official empanelment certificate and 3-page verified corporate dossier are approved by the Procurement Committee & CEO Office.
                </p>
              </div>

              <button
                onClick={() => setShowCertificateModal(true)}
                className="btn-accent"
                style={{ padding: '0.75rem 1.35rem', fontSize: '0.85rem', borderRadius: 10, width: 'fit-content' }}
              >
                <Printer style={{ width: 16, height: 16 }} />
                <span>Download A4 PDF Dossier</span>
              </button>
            </div>

            {/* Issued Site Gate Passes History Card */}
            <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <QrCode style={{ width: 16, height: 16, color: '#0047AB' }} />
                    <span>Issued Construction Site Gate Passes Roster:</span>
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active 24-Hr Security QR Passes generated for site supervisors and workers.</span>
                </div>
                <button
                  onClick={() => setShowGatePassModal(true)}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: 8, background: '#0047AB', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <QrCode style={{ width: 13, height: 13 }} />
                  <span>+ Generate New Pass</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sitePasses.map((p, idx) => (
                  <div key={idx} className="vendor-pass-card" style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 900, color: '#0047AB', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.passCode}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#047857' }}>ACTIVE</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#B45309', background: 'rgba(245,158,11,0.15)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>{p.validityDays || '1 Day'}</span>
                      </div>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>{p.siteLocation}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Supervisor: <strong>{p.visitorName}</strong> • Workers: <strong>{p.workerCount}</strong> • Vehicle: <strong>{p.vehicleNo}</strong>
                      </div>
                    </div>

                    <div className="pass-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.725rem' }}>Valid Till: <strong style={{ color: '#0047AB' }}>{p.validTill}</strong></div>
                      
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleShareGatePass(p)}
                          title="Share Gate Pass on WhatsApp / SMS"
                          style={{
                            padding: '0.25rem 0.55rem',
                            borderRadius: 6,
                            background: 'rgba(16,185,129,0.12)',
                            color: '#047857',
                            border: '1px solid rgba(16,185,129,0.3)',
                            fontSize: '0.725rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Share2 style={{ width: 12, height: 12 }} />
                          <span>Share Pass</span>
                        </button>

                        <button
                          onClick={() => copyToClipboard(p.passCode, 'Gate Pass Code')}
                          title="Copy Pass Code"
                          style={{
                            padding: '0.25rem 0.55rem',
                            borderRadius: 6,
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.725rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Copy style={{ width: 12, height: 12 }} />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 2: WORK ORDERS & EXECUTED CONTRACTS ════════════════ */}
        {activeTab === 'work_orders' && (
          <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FileSignature style={{ width: 18, height: 18, color: '#0047AB' }} />
                  <span>Executed Contracts & Work Orders:</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Official Work Orders issued to {vendor.company_name} by Hindustan Projects.
                </p>
              </div>

              {/* Work Orders Search Box */}
              <div style={{ position: 'relative', minWidth: 220, width: '100%', maxWidth: 300 }}>
                <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Filter work orders..."
                  value={woSearch}
                  onChange={e => setWoSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.75rem 0.45rem 2.2rem',
                    borderRadius: 10,
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredWorkOrders.map((wo, idx) => (
                <div key={idx} style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.55rem', borderRadius: 6, fontFamily: 'monospace' }}>
                          {wo.code}
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.15rem 0.5rem', borderRadius: 6, backgroundColor: wo.status.includes('ACTIVE') ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: wo.status.includes('ACTIVE') ? '#047857' : '#0047AB' }}>
                          {wo.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)' }}>{wo.project} — {wo.package}</h4>
                    </div>

                    <div className="wo-val-col" style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857' }}>{wo.val}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Progress: <strong>{wo.progress}%</strong></div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: 6, borderRadius: 99, backgroundColor: 'var(--border-color)', margin: '0.65rem 0', overflow: 'hidden' }}>
                    <div style={{ width: `${wo.progress}%`, height: '100%', borderRadius: 99, backgroundColor: wo.progress === 100 ? '#10B981' : '#0047AB', transition: 'width 0.4s ease' }} />
                  </div>

                  {/* Execution Timeline & Actions Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <div>Timeline: <strong>{wo.startDate}</strong> to <strong>{wo.endDate}</strong></div>
                    
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setShowGatePassModal(true)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.725rem', borderRadius: 8, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800 }}
                      >
                        <QrCode style={{ width: 12, height: 12, color: '#0047AB' }} />
                        <span>Site Pass</span>
                      </button>

                      <button
                        onClick={() => showToast(`Work Order PDF for ${wo.code} downloaded!`)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.725rem', borderRadius: 8, background: '#0047AB', color: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800 }}
                      >
                        <FileText style={{ width: 12, height: 12 }} />
                        <span>Work Order PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 3: ACTIVE TENDERS RADAR ════════════════ */}
        {activeTab === 'tenders' && (
          <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Briefcase style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>Active Hindustan Projects Tenders Radar:</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                As a Class-A Empanelled Vendor, EMD is 100% waived for all active project tenders.
              </p>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="tender-filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search by tender name, location, keyword (e.g. Civil, Substation)..."
                  value={tenderSearch}
                  onChange={e => setTenderSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem 0.55rem 2.35rem',
                    borderRadius: 10,
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Tenders' },
                  { id: 'civil', label: '🏗️ Civil & RCC' },
                  { id: 'electrical', label: '⚡ Electrical / Substation' },
                  { id: 'mep', label: '🏢 HVAC & BIM' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setTenderCategoryFilter(cat.id)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: tenderCategoryFilter === cat.id ? 800 : 600,
                      cursor: 'pointer',
                      border: tenderCategoryFilter === cat.id ? '1px solid #0047AB' : '1px solid var(--border-color)',
                      background: tenderCategoryFilter === cat.id ? 'rgba(0,71,171,0.1)' : 'var(--bg-surface)',
                      color: tenderCategoryFilter === cat.id ? '#0047AB' : 'var(--text-muted)'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submitted Bids History if any */}
            {submittedBids.length > 0 && (
              <div style={{ marginBottom: '1.25rem', padding: '1rem', borderRadius: 14, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#047857', marginBottom: '0.4rem' }}>
                  📋 Your Submitted Tender Proposals ({submittedBids.length}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {submittedBids.map((b, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.75rem', background: 'var(--bg-card)', borderRadius: 8, fontSize: '0.78rem', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <div>
                        <strong style={{ color: '#0047AB' }}>{b.ref}</strong> — {b.title}
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quoted: <strong>₹ {b.amount} Cr</strong> • Submitted on {b.date}</div>
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: 6, background: 'rgba(245,158,11,0.15)', color: '#B45309' }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Tenders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredTenders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No tenders match your search criteria. Try clearing search filters.
                </div>
              ) : (
                filteredTenders.map((tnd, idx) => (
                  <div key={idx} style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 4, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.55rem', borderRadius: 6, fontFamily: 'monospace' }}>
                            {tnd.ref}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: '#047857', fontWeight: 800 }}>✓ 100% EMD WAIVED</span>
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)' }}>{tnd.title}</h4>
                      </div>

                      <button
                        onClick={() => { setBiddingTender(tnd); setBidAmount(tnd.val.replace('₹ ', '').replace(' Crores', '').replace(' Crore', '')); setBidSubmitted(false); }}
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem', borderRadius: 8, background: '#0047AB', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <span>Submit Bid</span>
                        <ArrowRight style={{ width: 13, height: 13 }} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                      <strong>Scope:</strong> {tnd.scope}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>Value: <strong style={{ color: '#047857' }}>{tnd.val}</strong></span>
                      <span>•</span>
                      <span>Location: <strong>{tnd.location}</strong></span>
                      <span>•</span>
                      <span>Deadline: <strong style={{ color: '#ED1C24' }}>{tnd.end}</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 4: MILESTONE PAYOUTS & INVOICES ════════════════ */}
        {activeTab === 'payouts' && (
          <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <DollarSign style={{ width: 18, height: 18, color: '#10B981' }} />
                  <span>Milestone Payment Release & Tax Invoices:</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  All vendor payouts are processed directly via RTGS / NEFT to your verified bank account (`{vendor.bank_account || vendor.gstin}`).
                </p>
              </div>

              <button
                onClick={() => { setShowInvoiceModal(true); setInvoiceSubmitted(false); }}
                className="btn-accent"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: 10 }}
              >
                <FileCheck2 style={{ width: 14, height: 14 }} />
                <span>Submit RA Bill / GST Invoice</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {vendorInvoices.map((p, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 900, color: 'var(--text-primary)' }}>{p.milestone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Tranche: <strong>{p.tranche}</strong> • Ref: <strong style={{ fontFamily: 'monospace' }}>{p.ref || p.id}</strong> • Date: <strong>{p.date}</strong>
                    </div>
                  </div>

                  <div className="payout-amount-col" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#047857' }}>{p.amt}</div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 900, padding: '0.15rem 0.5rem', borderRadius: 6, backgroundColor: p.status.includes('RELEASED') ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: p.status.includes('RELEASED') ? '#047857' : '#B45309' }}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 5: DOCUMENT VAULT & LOCKER ════════════════ */}
        {activeTab === 'documents' && (
          <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <FolderCheck style={{ width: 18, height: 18, color: '#0047AB' }} />
                <span>Statutory Tax & Compliance Document Locker:</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Verified tax identity and bank cheque files attached to your empanelment code `{vendor.tracking_id}`.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
              {[
                { title: 'GST REG-06 Certificate', type: 'CBIC Tax Identity', status: 'VERIFIED & ACTIVE', file: vendor.gst_doc || 'gst_certificate.pdf', date: 'Valid till 31 Mar 2027' },
                { title: 'Income Tax PAN Card Copy', type: 'Govt Tax ID', status: 'VERIFIED', file: vendor.pan_doc || 'pan_card.pdf', date: 'Permanent Residency ID' },
                { title: 'Cancelled Bank Cheque', type: 'Payout Verification', status: 'VERIFIED', file: vendor.bank_doc || 'bank_cheque.pdf', date: vendor.bank_name || 'HDFC Bank Ltd' },
                { title: 'Experience / Completion Certificates', type: 'Past Work Proof', status: 'VERIFIED', file: vendor.exp_doc || 'experience_docs.pdf', date: 'Audited by Technical Comm.' },
              ].map((d, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#047857', backgroundColor: 'rgba(16,185,129,0.12)', padding: '0.15rem 0.45rem', borderRadius: 6, width: 'fit-content', marginBottom: 4 }}>
                    ✓ {d.status}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>{d.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{d.type} • {d.date}</div>
                  <div style={{ marginTop: '0.65rem', fontSize: '0.725rem', color: '#0047AB', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FileText style={{ width: 13, height: 13 }} /> {d.file}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 6: TECHNICAL SUPPORT & HELPDESK ════════════════ */}
        {activeTab === 'support' && (
          <div style={{ padding: '1.35rem', borderRadius: 18, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <HelpCircle style={{ width: 18, height: 18, color: '#0047AB' }} />
                  <span>Vendor Technical Helpdesk & Ticket System:</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Direct communication channel with Hindustan Projects corporate procurement committee.
                </p>
              </div>

              <button
                onClick={() => { setShowTicketModal(true); setTicketSubmitted(false); }}
                className="btn-accent"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: 10 }}
              >
                <MessageSquarePlus style={{ width: 14, height: 14 }} />
                <span>Raise New Support Ticket</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {vendorTickets.map((t, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.45rem', borderRadius: 6, fontFamily: 'monospace' }}>
                        {t.ticket}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Created: <strong>{t.date}</strong></span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{t.subject}</div>
                  </div>

                  <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 6, backgroundColor: t.status.includes('RESOLVED') ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: t.status.includes('RESOLVED') ? '#047857' : '#0047AB' }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ════════════════ MOBILE BOTTOM QUICK-ACTION DOCK ════════════════ */}
      {isMobile && (
        <div className="vendor-mobile-dock" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          padding: '0.45rem 0.75rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.12)'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: activeTab === 'overview' ? '#0047AB' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Award style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('tenders')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: activeTab === 'tenders' ? '#0047AB' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Briefcase style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Tenders</span>
          </button>

          {/* Center Highlighted Action: Gate Pass */}
          <button
            onClick={() => setShowGatePassModal(true)}
            style={{
              background: 'linear-gradient(135deg, #0047AB 0%, #002B66 100%)',
              border: 'none',
              width: 44,
              height: 44,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0,71,171,0.4)',
              marginTop: -18,
              cursor: 'pointer'
            }}
          >
            <QrCode style={{ width: 22, height: 22 }} />
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: activeTab === 'payouts' ? '#0047AB' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <DollarSign style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Payouts</span>
          </button>

          <button
            onClick={() => setShowIdCardModal(true)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <UserCheck style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>PVC Card</span>
          </button>
        </div>
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
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 18, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.55rem', borderRadius: 6 }}>
                  {biddingTender.ref}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginTop: 4, color: 'var(--text-primary)' }}>Submit Commercial Tender Proposal</h3>
              </div>
              <button onClick={() => setBiddingTender(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {bidSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 40, height: 40, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#047857' }}>Bid Proposal Logged Successfully!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your commercial quote for <strong>{biddingTender.ref}</strong> is submitted to the Procurement Committee.
                </p>
                <button onClick={() => setBiddingTender(null)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.825rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateBid}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Submitting tender proposal as <strong>{vendor.company_name}</strong> (EMD 100% Waived).
                </p>

                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label className="form-label">Quoted Commercial Lump-Sum Bid (in ₹ Crores) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    placeholder="e.g. 13.80"
                    style={{ fontSize: 16 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Technical Capability & Remarks</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={bidRemarks}
                    onChange={e => setBidRemarks(e.target.value)}
                    placeholder="We commit to execute as per GFC drawings & NBC 2016 building code specifications..."
                    style={{ fontSize: 16 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
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
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 18, maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>Submit Milestone RA Bill / GST Invoice</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload GST Invoice for 7-day RTGS payout release</div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {invoiceSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 40, height: 40, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#047857' }}>Invoice Submitted Successfully!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your GST tax invoice has been routed to finance department for RTGS payout release.
                </p>
                <button onClick={() => setShowInvoiceModal(false)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.825rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateInvoice}>
                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label className="form-label">GST Tax Invoice Number *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. INV-2026-8812"
                    value={invoiceForm.invoiceNo}
                    onChange={e => setInvoiceForm({ ...invoiceForm, invoiceNo: e.target.value })}
                    style={{ fontSize: 16 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label className="form-label">Invoice Amount (in ₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    placeholder="e.g. 725000"
                    value={invoiceForm.amt}
                    onChange={e => setInvoiceForm({ ...invoiceForm, amt: e.target.value })}
                    style={{ fontSize: 16 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Attach Signed PDF Invoice Copy</label>
                  <input type="file" className="form-input" accept=".pdf" />
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
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
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 18, maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>Raise Technical Support Ticket</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct ticket channel to corporate procurement team</div>
              </div>
              <button onClick={() => setShowTicketModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {ticketSubmitted ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981' }}>
                <CheckCircle2 style={{ width: 40, height: 40, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#047857' }}>Ticket Created Successfully!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your support inquiry has been logged. Assigned procurement officer will respond within 24 hours.
                </p>
                <button onClick={() => setShowTicketModal(false)} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.825rem' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket}>
                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label className="form-label">Support Category</label>
                  <select
                    className="form-input"
                    value={ticketForm.category}
                    onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                    style={{ fontSize: 16 }}
                  >
                    <option>Construction Site Gate Pass Request</option>
                    <option>GFC Structural Drawing Clarification</option>
                    <option>RTGS Payment Payout Status Inquiry</option>
                    <option>GST Certificate Renewal Request</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Describe your query / issue *</label>
                  <textarea
                    required
                    className="form-input"
                    rows={3}
                    placeholder="Provide complete details..."
                    value={ticketForm.query}
                    onChange={e => setTicketForm({ ...ticketForm, query: e.target.value })}
                    style={{ fontSize: 16 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
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

      {/* ════════════════ VENDOR SMART ID CARD MODAL ════════════════ */}
      {showIdCardModal && (
        <VendorIdCardModal
          isOpen={showIdCardModal}
          onClose={() => setShowIdCardModal(false)}
          vendorData={vendor}
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
      <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', padding: '1rem 1.25rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        © 2026 Hindustan Projects Corporate Procurement Division. Secure Vendor Portal (256-Bit SSL Encrypted).
      </footer>

    </div>
  );
}
