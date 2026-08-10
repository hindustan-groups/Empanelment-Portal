import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, FileText, DollarSign, Clock, 
  CheckCircle2, Building2, Briefcase, UserCheck, Printer, 
  LogOut, Search, ExternalLink, FileCheck2, FolderCheck, ArrowRight, 
  X, HelpCircle, MessageSquarePlus, QrCode, FileSignature, 
  Bell, Share2, Menu, Copy, ChevronRight, Check,
  CreditCard, Shield, Download, RefreshCw, Calendar, Phone, Mail, MapPin
} from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';
import GatePassModal from '../components/GatePassModal';
import Logo from '../components/Logo';
import { getEmpanelmentMode } from '../utils/printDossier';
import { API_BASE_URL } from '../config/api';

export default function VendorDashboardPage() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  
  /* Active Tab & Navigation */
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'work_orders' | 'tenders' | 'payouts' | 'documents' | 'support'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Modals */
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

  /* Work Orders & Contracts State */
  const [workOrders, setWorkOrders] = useState([
    { code: 'HP-WO-2026-081', project: 'Jaipur Commercial Tower (B+G+18)', package: 'Turnkey RCC Structural Package', val: '₹ 14.50 Cr', startDate: '01 Jun 2026', endDate: '30 May 2027', status: 'IN EXECUTION', progress: 35 },
    { code: 'HP-WO-2026-042', project: 'Bhilwara Industrial Park Site-2', package: 'Site Ground Leveling & Substructure', val: '₹ 3.20 Cr', startDate: '15 Jan 2026', endDate: '10 May 2026', status: 'COMPLETED', progress: 100 }
  ]);

  /* Bidding Form State */
  const [bidAmount, setBidAmount] = useState('');
  const [bidRemarks, setBidRemarks] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [submittedBids, setSubmittedBids] = useState(() => {
    return JSON.parse(localStorage.getItem('hipro_vendor_submitted_bids') || '[]');
  });

  /* Live Tenders State */
  const [liveTenders, setLiveTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tenders`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const mapped = data.data
            .filter(t => (t.status || 'ACTIVE').toUpperCase() === 'ACTIVE')
            .map(t => ({
              ref: t.tender_no || `HP-TND-2026-${t.id}`,
              title: t.title,
              val: t.estimated_value ? `₹ ${t.estimated_value}` : 'TBD',
              location: t.location || 'Bhilwara, Rajasthan',
              end: t.due_date || 'Open',
              scope: t.category || 'Empanelled contractor package bidding.',
              category: (t.category || '').toLowerCase().includes('electrical') ? 'electrical' : 
                        (t.category || '').toLowerCase().includes('bim') || (t.category || '').toLowerCase().includes('hvac') ? 'mep' : 'civil'
            }));
          setLiveTenders(mapped);
          localStorage.setItem('hipro_tenders', JSON.stringify(data.data));
        }
      } catch (e) {}
    };
    fetchTenders();
  }, []);

  /* Invoices State */
  const [invoiceForm, setInvoiceForm] = useState({ invoiceNo: '', milestone: 'Milestone 1: Progress Claim', amt: '', file: null });
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);
  const [vendorInvoices, setVendorInvoices] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_invoices');
    return saved ? JSON.parse(saved) : [
      { id: 'INV-2026-881', milestone: 'Milestone 1: Initial Setup Sign-Off', tranche: '30% Tranche', amt: '₹ 4,35,000', status: 'PAID (RTGS)', ref: 'RTGS-HDFC-99120', date: '28 Jul 2026' },
      { id: 'INV-2026-894', milestone: 'Milestone 2: Material Inspection', tranche: '50% Tranche', amt: '₹ 7,25,000', status: 'IN AUDIT', ref: 'AUDIT-STAGE2', date: '05 Aug 2026' }
    ];
  });

  /* Site Gate Passes State */
  const [sitePasses] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_site_passes');
    return saved ? JSON.parse(saved) : [
      { passCode: 'HP-PASS-2026-8812', visitorName: 'Ramesh Kumar', workerCount: '15', vehicleNo: 'RJ 06 GB 1234', validityDays: '1 Day', siteLocation: 'Jaipur Commercial Tower', date: '01 Aug 2026', validTill: '02 Aug 2026 23:59 IST' }
    ];
  });

  /* Support Tickets State */
  const [ticketForm, setTicketForm] = useState({ category: 'Site Gate Pass Request', query: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [vendorTickets, setVendorTickets] = useState(() => {
    const saved = localStorage.getItem('hipro_vendor_tickets');
    return saved ? JSON.parse(saved) : [
      { ticket: 'TCK-99201', subject: 'Site Entry Gate Pass Request (Jaipur Tower)', status: 'RESOLVED', date: '27 Jul 2026' },
      { ticket: 'TCK-99145', subject: 'GFC Structural Drawing Clarification', status: 'IN PROGRESS', date: '28 Jul 2026' }
    ];
  });

  // Session Authentication & Real-time VPS Sync
  useEffect(() => {
    const session = localStorage.getItem('hipro_vendor_session');
    if (!session) {
      navigate('/vendor-login');
      return;
    }
    try {
      const parsed = JSON.parse(session);
      setVendor(parsed);

      // Immediately fetch latest 100% full real vendor application record from live VPS database
      const tid = parsed.tracking_id || parsed.trackingId || parsed.id;
      if (tid) {
        fetch(`${API_BASE_URL}/api/empanelment/application/${tid}`)
          .then(r => r.json())
          .then(data => {
            if (data.success && data.data) {
              const fullVendor = { ...parsed, ...data.data };
              setVendor(fullVendor);
              localStorage.setItem('hipro_vendor_session', JSON.stringify(fullVendor));
            } else if (data.status === 404 || data.error?.includes('not found')) {
              // Vendor was deleted by admin! Purge session & redirect to login
              localStorage.removeItem('hipro_vendor_session');
              navigate('/vendor-login');
            }
          })
          .catch(() => {});
      }
    } catch {
      navigate('/vendor-login');
    }
  }, [navigate]);

  // Sync with Backend API
  useEffect(() => {
    if (!vendor) return;

    // Fetch Live Tenders from backend
    fetch(`${API_BASE_URL}/api/tenders`)
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setLiveTenders(data.data.map(t => ({
            ref: t.tender_no || t.id || 'HP-TND-2026-101',
            title: t.title || 'Tender Notice',
            val: t.estimated_value || '₹ 5.00 Cr',
            location: t.location || 'Rajasthan Site',
            end: t.due_date || '15 Aug 2026',
            scope: t.category || 'Empanelled contractor package bidding.',
            category: (t.category || t.title || '').toLowerCase().includes('electrical') ? 'electrical' : 
                      (t.category || t.title || '').toLowerCase().includes('bim') || (t.category || t.title || '').toLowerCase().includes('hvac') ? 'mep' : 'civil'
          })));
        }
      })
      .catch(() => {});

    // Fetch Invoices & Work Orders from backend
    fetch(`${API_BASE_URL}/api/invoices?vendor_tracking_id=${vendor.tracking_id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setWorkOrders(data.data.map(inv => ({
            code: inv.work_order_no || `WO-${inv.id}`,
            project: inv.work_order_no || 'Hindustan Projects Execution Contract',
            package: `Milestone Claim: ${inv.invoice_no}`,
            val: `₹ ${Number(inv.amount).toLocaleString('en-IN')}`,
            startDate: inv.date || inv.created_at?.split('T')[0] || '01 Jun 2026',
            endDate: '30 May 2027',
            status: inv.status || 'IN EXECUTION',
            progress: inv.status?.includes('PAID') || inv.status?.includes('RELEASED') ? 100 : 35
          })));
        }
      })
      .catch(() => {});
  }, [vendor]);

  /* Persist local state */
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
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('hipro_vendor_session');
    navigate('/vendor-login');
  };

  const handleCreateBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || !biddingTender) return;

    try {
      await fetch(`${API_BASE_URL}/api/empanelment/vendor/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tender_no: biddingTender.ref,
          vendor_tracking_id: vendor.tracking_id,
          vendor_name: vendor.company_name || vendor.contact_name,
          bid_amount: bidAmount,
          remarks: bidRemarks || 'Commercial bid submitted.'
        })
      });
    } catch (err) {
      console.warn('Bid API notice:', err);
    }

    const newBid = {
      ref: biddingTender.ref,
      title: biddingTender.title,
      amount: bidAmount,
      remarks: bidRemarks || 'Commercial bid submitted.',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'UNDER REVIEW'
    };
    setSubmittedBids(prev => [newBid, ...prev]);
    setBidSubmitted(true);
    showToast(`Bid for ${biddingTender.ref} submitted.`);
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
      status: 'IN AUDIT',
      ref: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVendorInvoices(prev => [newInv, ...prev]);
    setInvoiceSubmitted(true);
    showToast(`Invoice ${invoiceForm.invoiceNo} submitted.`);
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
      status: 'OPEN',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVendorTickets(prev => [newTck, ...prev]);
    setTicketSubmitted(true);
    showToast('Support ticket logged.');
  };

  const handleShareGatePass = async (pass) => {
    const text = `HINDUSTAN PROJECTS — SITE GATE PASS\n` +
      `Pass Code: ${pass.passCode}\n` +
      `Supervisor: ${pass.visitorName}\n` +
      `Workers: ${pass.workerCount}\n` +
      `Vehicle: ${pass.vehicleNo}\n` +
      `Site: ${pass.siteLocation}\n` +
      `Valid Till: ${pass.validTill}\n` +
      `Contractor: ${vendor?.company_name || 'Empanelled Vendor'}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `Gate Pass: ${pass.passCode}`, text });
        showToast('Gate pass shared.');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.log(err);
      }
    }
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied.`);
  };

  if (!vendor) return null;

  // Filtered lists
  const filteredTenders = liveTenders.filter(t => {
    const matchesSearch = !tenderSearch || 
      t.title.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.ref.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.location.toLowerCase().includes(tenderSearch.toLowerCase());
    const matchesCategory = tenderCategoryFilter === 'all' || t.category === tenderCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredWorkOrders = workOrders.filter(wo => {
    if (!woSearch) return true;
    return wo.code.toLowerCase().includes(woSearch.toLowerCase()) ||
      wo.project.toLowerCase().includes(woSearch.toLowerCase());
  });

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: Award, count: null },
    { id: 'work_orders', label: 'Work Orders', icon: FileSignature, count: workOrders.length },
    { id: 'tenders', label: 'Tenders', icon: Briefcase, count: liveTenders.length },
    { id: 'payouts', label: 'Payouts', icon: DollarSign, count: null },
    { id: 'documents', label: 'Documents', icon: FolderCheck, count: '4' },
    { id: 'support', label: 'Helpdesk', icon: HelpCircle, count: null },
  ];

  // Company Initials
  const companyInitials = (vendor.company_name || 'HP')
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="erp-portal" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: isMobile ? '5rem' : '2rem' }}>
      
      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '5rem' : '2rem',
          right: isMobile ? '50%' : '2rem',
          transform: isMobile ? 'translateX(50%)' : 'none',
          zIndex: 99999,
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '0.6rem 1.1rem',
          borderRadius: 8,
          fontSize: '0.8rem',
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Check style={{ width: 14, height: 14, color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ════════════════ ENTERPRISE TOP NAVBAR ════════════════ */}
      <header style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '0.6rem 0.85rem' : '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Brand Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/vendor-dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Logo height={isMobile ? 22 : 26} showText={true} />
            </Link>

            {!isMobile && (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#0047AB',
                backgroundColor: 'rgba(0,71,171,0.08)',
                padding: '0.25rem 0.6rem',
                borderRadius: 4,
                border: '1px solid rgba(0,71,171,0.2)',
                letterSpacing: '0.04em'
              }}>
                VENDOR PORTAL ERP
              </span>
            )}
          </div>

          {/* Right User & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>

            {!isMobile && (
              <>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {vendor.company_name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    Code: <strong style={{ color: '#0047AB' }}>{vendor.tracking_id}</strong>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#DC2626',
                    backgroundColor: 'rgba(220,38,38,0.06)',
                    border: '1px solid rgba(220,38,38,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <LogOut style={{ width: 13, height: 13 }} />
                  <span>Sign Out</span>
                </button>
              </>
            )}

            {isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#0047AB',
                  backgroundColor: 'rgba(0,71,171,0.08)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 5,
                  border: '1px solid rgba(0,71,171,0.2)'
                }}>
                  {vendor.tracking_id}
                </span>

                <button
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 7,
                    border: '1px solid var(--border-color)',
                    backgroundColor: mobileMenuOpen ? '#0047AB' : 'var(--bg-surface)',
                    color: mobileMenuOpen ? '#FFFFFF' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mobileMenuOpen ? <X style={{ width: 17, height: 17 }} /> : <Menu style={{ width: 17, height: 17 }} />}
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>{vendor.company_name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Vendor Code: <strong style={{ fontFamily: 'monospace', color: '#0047AB' }}>{vendor.tracking_id}</strong> • <span style={{ color: '#047857', fontWeight: 700 }}>Tier-1 Active</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, fontSize: '0.725rem', fontWeight: 700, color: '#DC2626', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <LogOut style={{ width: 12, height: 12 }} />
                <span>Sign Out</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '0.25rem' }}>
              <button
                onClick={() => { setShowIdCardModal(true); setMobileMenuOpen(false); }}
                style={{ padding: '0.55rem', borderRadius: 6, background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', cursor: 'pointer' }}
              >
                <UserCheck style={{ width: 14, height: 14, color: '#0047AB' }} />
                <span>PVC ID Card</span>
              </button>
              <button
                onClick={() => { setShowCertificateModal(true); setMobileMenuOpen(false); }}
                style={{ padding: '0.55rem', borderRadius: 6, background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', cursor: 'pointer' }}
              >
                <Printer style={{ width: 14, height: 14, color: '#0047AB' }} />
                <span>A4 Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* ════════════════ ENTERPRISE TAB BAR ════════════════ */}
        <nav style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: isMobile ? '0 0.5rem' : '0 1.5rem',
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          gap: isMobile ? '0.25rem' : '0.5rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)'
        }}>
          {navigationTabs.map(tab => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                style={{
                  padding: isMobile ? '0.65rem 0.75rem' : '0.75rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #0047AB' : '2px solid transparent',
                  background: 'none',
                  color: isActive ? '#0047AB' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'color 0.15s ease'
                }}
              >
                <TabIcon style={{ width: 14, height: 14, color: isActive ? '#0047AB' : 'var(--text-muted)' }} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.35rem',
                    borderRadius: 4,
                    background: isActive ? 'rgba(0,71,171,0.1)' : 'var(--bg-surface)',
                    color: isActive ? '#0047AB' : 'var(--text-muted)',
                    fontWeight: 700
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ⚠️ SUSPENDED / DISABLED ACCOUNT WARNING BANNER */}
      {(vendor.status?.includes('Suspended') || vendor.status?.includes('Terminated') || vendor.status?.includes('Disabled') || vendor.status?.includes('Debarred') || vendor.status?.includes('Rejected')) && (
        <div style={{ background: 'linear-gradient(90deg, #7F1D1D, #DC2626)', color: '#FFFFFF', padding: '0.85rem 1.25rem', textAlign: 'center', fontWeight: 800, fontSize: '0.825rem', borderBottom: '2px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Shield style={{ width: 18, height: 18, flexShrink: 0, color: '#FCA5A5' }} />
          <span>
            <strong>EMPANELED ACCOUNT STATUS: {(vendor.status || 'DISABLED').toUpperCase()}</strong> — Your vendor empanelment account has been disabled/suspended by Hindustan Projects procurement administration. Active bidding, gate pass creation, and financial claims are restricted. Contact Helpdesk (+91-7597000601).
          </span>
        </div>
      )}

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <main style={{ maxWidth: 1240, margin: '1.25rem auto 2rem auto', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
        
        {/* Executive Entity Profile Header */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          padding: isMobile ? '1.15rem' : '1.35rem 1.5rem',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.05em',
              flexShrink: 0
            }}>
              {companyInitials}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: isMobile ? '1.15rem' : '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {vendor.company_name}
                </h1>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: 4, backgroundColor: 'rgba(16,185,129,0.1)', color: '#047857', border: '1px solid rgba(16,185,129,0.25)' }}>
                  ACTIVE (FY 2026-27)
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: 3 }}>
                <span>Code: <strong style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{vendor.tracking_id}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{vendor.gstin || 'N/A'}</strong></span>
                <span>•</span>
                <span>Category: <strong style={{ color: 'var(--text-primary)' }}>{vendor.category || 'Civil & Structural'}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '0.45rem', width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowGatePassModal(true)}
              style={{
                flex: isMobile ? 1 : 'initial',
                padding: '0.5rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: 6,
                backgroundColor: '#0047AB',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <QrCode style={{ width: 14, height: 14 }} />
              <span>Generate Site Pass</span>
            </button>

            <button
              onClick={() => setShowIdCardModal(true)}
              style={{
                flex: isMobile ? 1 : 'initial',
                padding: '0.5rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                borderRadius: 6,
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <UserCheck style={{ width: 14, height: 14 }} />
              <span>Smart ID Card</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              style={{
                flex: isMobile ? 1 : 'initial',
                padding: '0.5rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                borderRadius: 6,
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Printer style={{ width: 14, height: 14 }} />
              <span>Certificate</span>
            </button>
          </div>
        </div>

        {/* ════════════════ TAB 1: OVERVIEW ════════════════ */}
        {activeTab === 'overview' && (
          <div>
            {/* 4 Stat KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857', marginTop: 3 }}>EMPANELLED</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>FY 2026-27 Active</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Capability Class</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0047AB', marginTop: 3 }}>CLASS-A PRIME</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>Pan-India Eligibility</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>EMD Waiver</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 3 }}>100% EXEMPT</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>Corporate Clause</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Payment Cycle</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 3 }}>7-DAY RTGS</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>Direct Bank Release</div>
              </div>
            </div>

            {/* Entity Details Card */}
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                Corporate Registration & Tax Details
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '0.75rem'
              }}>
                <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Authorized Signatory</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{vendor.contact_name || vendor.signatory_name || 'N/A'}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{vendor.designation || 'Director'}</div>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Contact Communication</div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2, wordBreak: 'break-all' }}>{vendor.email || 'N/A'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vendor.phone || 'N/A'}</div>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Premises</div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{vendor.city || 'Bhilwara'}, {vendor.state || 'Rajasthan'}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{vendor.address || 'Industrial Area'} - {vendor.pincode || '311001'}</div>
                </div>
              </div>

              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                borderRadius: 8,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: '0.65rem',
                fontSize: '0.75rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>PAN: </span>
                  <strong style={{ fontFamily: 'monospace' }}>{vendor.pan || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>MSME: </span>
                  <strong style={{ fontFamily: 'monospace' }}>{vendor.msme_no || 'UDYAM-VERIFIED'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Bank Account: </span>
                  <strong style={{ fontFamily: 'monospace' }}>{vendor.bank_account ? `•••• ${vendor.bank_account.slice(-4)}` : 'Verified Bank'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Declared Turnover: </span>
                  <strong>₹ {vendor.turnover_2025 || '350'} Lakhs</strong>
                </div>
              </div>
            </div>

            {/* Issued Gate Passes */}
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Site Security Gate Passes Roster
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Active 24-Hr security passes for site labor & material transport
                  </div>
                </div>

                <button
                  onClick={() => setShowGatePassModal(true)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 6,
                    backgroundColor: '#0047AB',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <QrCode style={{ width: 12, height: 12 }} />
                  <span>+ New Pass</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {sitePasses.map((p, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: 8,
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '0.5rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                        <strong style={{ fontFamily: 'monospace', color: '#0047AB', fontSize: '0.825rem' }}>{p.passCode}</strong>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#047857', backgroundColor: 'rgba(16,185,129,0.1)', padding: '0.1rem 0.35rem', borderRadius: 4 }}>
                          VALID
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.siteLocation}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Supervisor: <strong>{p.visitorName}</strong> • Workers: <strong>{p.workerCount}</strong> • Vehicle: <strong>{p.vehicleNo}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Valid Till: <strong style={{ color: 'var(--text-primary)' }}>{p.validTill}</strong>
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => handleShareGatePass(p)}
                          style={{ padding: '0.25rem 0.5rem', borderRadius: 4, background: 'rgba(16,185,129,0.1)', color: '#047857', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Share2 style={{ width: 11, height: 11 }} />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(p.passCode, 'Pass Code')}
                          style={{ padding: '0.25rem 0.5rem', borderRadius: 4, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 2: WORK ORDERS ════════════════ */}
        {activeTab === 'work_orders' && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Active Work Orders & Contracts
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Formal corporate execution contracts issued to {vendor.company_name}
                </div>
              </div>

              <div style={{ position: 'relative', width: isMobile ? '100%' : 240 }}>
                <Search style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Filter contracts..."
                  value={woSearch}
                  onChange={e => setWoSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.65rem 0.4rem 2rem',
                    borderRadius: 6,
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredWorkOrders.map((wo, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, color: '#0047AB' }}>{wo.code}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 4, backgroundColor: wo.status === 'COMPLETED' ? 'rgba(16,185,129,0.1)' : 'rgba(0,71,171,0.1)', color: wo.status === 'COMPLETED' ? '#047857' : '#0047AB' }}>
                          {wo.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>{wo.project} — {wo.package}</div>
                    </div>

                    <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#047857' }}>{wo.val}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Progress: <strong>{wo.progress}%</strong></div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: 5, borderRadius: 99, backgroundColor: 'var(--border-color)', margin: '0.5rem 0', overflow: 'hidden' }}>
                    <div style={{ width: `${wo.progress}%`, height: '100%', backgroundColor: wo.progress === 100 ? '#10B981' : '#0047AB' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-color)', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    <div>Timeline: <strong>{wo.startDate}</strong> to <strong>{wo.endDate}</strong></div>
                    
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => setShowGatePassModal(true)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.725rem', borderRadius: 4, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Site Pass
                      </button>
                      <button
                        onClick={() => showToast(`Work Order ${wo.code} PDF downloaded.`)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.725rem', borderRadius: 4, background: '#0047AB', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Contract PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 3: TENDERS RADAR ════════════════ */}
        {activeTab === 'tenders' && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Active Project Tenders & Procurement Radar
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                EMD 100% waived for empanelled contractors. Direct committee submission.
              </div>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search tenders by keyword, site, location..."
                  value={tenderSearch}
                  onChange={e => setTenderSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                    borderRadius: 6,
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Packages' },
                  { id: 'civil', label: 'Civil & RCC' },
                  { id: 'electrical', label: 'Electrical & Substation' },
                  { id: 'mep', label: 'HVAC & MEP' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setTenderCategoryFilter(cat.id)}
                    style={{
                      padding: '0.25rem 0.55rem',
                      borderRadius: 4,
                      fontSize: '0.725rem',
                      fontWeight: tenderCategoryFilter === cat.id ? 700 : 500,
                      cursor: 'pointer',
                      border: tenderCategoryFilter === cat.id ? '1px solid #0047AB' : '1px solid var(--border-color)',
                      backgroundColor: tenderCategoryFilter === cat.id ? 'rgba(0,71,171,0.08)' : 'var(--bg-surface)',
                      color: tenderCategoryFilter === cat.id ? '#0047AB' : 'var(--text-muted)'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submitted Bids */}
            {submittedBids.length > 0 && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem 0.85rem', borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', marginBottom: '0.35rem' }}>
                  Submitted Commercial Bids ({submittedBids.length}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {submittedBids.map((b, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'var(--bg-card)', borderRadius: 6, fontSize: '0.75rem', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.35rem' }}>
                      <div>
                        <strong style={{ color: '#0047AB' }}>{b.ref}</strong> — {b.title}
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Quoted: <strong>₹ {b.amount} Cr</strong> • {b.date}</div>
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.35rem', borderRadius: 4, background: 'rgba(245,158,11,0.15)', color: '#B45309' }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredTenders.map((tnd, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.725rem', fontWeight: 700, color: '#0047AB' }}>{tnd.ref}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#047857' }}>EMD EXEMPT</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tnd.title}</div>
                    </div>

                    <button
                      onClick={() => { setBiddingTender(tnd); setBidAmount(tnd.val.replace('₹ ', '').replace(' Cr', '')); setBidSubmitted(false); }}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: 6, backgroundColor: '#0047AB', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                    >
                      Submit Bid
                    </button>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    {tnd.scope}
                  </div>

                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                    <span>Value: <strong style={{ color: 'var(--text-primary)' }}>{tnd.val}</strong></span>
                    <span>•</span>
                    <span>Location: <strong>{tnd.location}</strong></span>
                    <span>•</span>
                    <span>Due: <strong style={{ color: '#DC2626' }}>{tnd.end}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 4: PAYOUTS ════════════════ */}
        {activeTab === 'payouts' && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'gap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Milestone Payouts & RA Bill Clearance
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Disbursements processed via direct RTGS / NEFT transfer
                </div>
              </div>

              <button
                onClick={() => { setShowInvoiceModal(true); setInvoiceSubmitted(false); }}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: 6, backgroundColor: '#0047AB', color: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <FileCheck2 style={{ width: 13, height: 13 }} />
                <span>Submit RA Bill</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {vendorInvoices.map((p, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.milestone}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Tranche: <strong>{p.tranche}</strong> • Ref: <span style={{ fontFamily: 'monospace' }}>{p.ref || p.id}</span> • Date: <strong>{p.date}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>{p.amt}</div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 4, backgroundColor: p.status.includes('PAID') ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: p.status.includes('PAID') ? '#047857' : '#B45309' }}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 5: DOCUMENTS ════════════════ */}
        {activeTab === 'documents' && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Statutory Compliance & Tax Documents
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Verified documents on record for vendor code `{vendor.tracking_id}`
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {[
                { title: 'Signatory Passport / Profile Photo', status: vendor.passport_photo ? 'UPLOADED' : 'PENDING', file: vendor.passport_photo, date: 'Profile Photo' },
                { title: 'GST Registration Certificate (REG-06)', status: vendor.gst_doc ? 'VERIFIED' : 'EXEMPTED / NIL', file: vendor.gst_doc, date: 'Valid FY 2026-27' },
                { title: 'Permanent Account Number (PAN Card)', status: vendor.pan_doc ? 'VERIFIED' : 'PENDING', file: vendor.pan_doc, date: 'Govt Tax ID' },
                { title: 'Aadhaar Card (Front Side)', status: vendor.aadhar_front_doc ? 'VERIFIED' : 'PENDING', file: vendor.aadhar_front_doc, date: 'UIDAI Govt ID' },
                { title: 'Aadhaar Card (Back Side)', status: vendor.aadhar_back_doc ? 'VERIFIED' : 'PENDING', file: vendor.aadhar_back_doc, date: 'Address Verification' },
                { title: 'Bank Cheque / Mandate Form', status: vendor.bank_doc ? 'VERIFIED' : 'PENDING', file: vendor.bank_doc, date: vendor.bank_name || 'Bank Account Proof' },
                { title: 'Technical Capability & Work Experience', status: vendor.exp_doc ? 'AUDITED' : 'OPTIONAL', file: vendor.exp_doc, date: 'Procurement Audit' },
              ].map((d, idx) => {
                const getDocUrl = (raw) => {
                  if (!raw) return '#';
                  if (raw.startsWith('http') || raw.startsWith('data:')) return raw;
                  if (raw.startsWith('/uploads/')) return `${API_BASE_URL}${raw}`;
                  if (raw.startsWith('uploads/')) return `${API_BASE_URL}/${raw}`;
                  return `${API_BASE_URL}/uploads/${raw}`;
                };
                const fileUrl = getDocUrl(d.file);

                return (
                  <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: d.file ? '#047857' : '#64748B', backgroundColor: d.file ? 'rgba(16,185,129,0.1)' : 'rgba(100,116,139,0.1)', padding: '0.1rem 0.35rem', borderRadius: 4 }}>
                        {d.status}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.date}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>{d.title}</div>
                    {d.file ? (
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.725rem', color: '#0047AB', marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', fontWeight: 700 }}>
                        <FileText style={{ width: 13, height: 13 }} />
                        <span>View Verified Document ↗</span>
                      </a>
                    ) : (
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: 4 }}>No document file attached</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 6: SUPPORT ════════════════ */}
        {activeTab === 'support' && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Procurement Support Desk & Inquiries
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Direct communication line with corporate procurement officers
                </div>
              </div>

              <button
                onClick={() => { setShowTicketModal(true); setTicketSubmitted(false); }}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: 6, backgroundColor: '#0047AB', color: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <MessageSquarePlus style={{ width: 13, height: 13 }} />
                <span>Raise Ticket</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {vendorTickets.map((t, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: 2 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.725rem', fontWeight: 700, color: '#0047AB' }}>{t.ticket}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>• {t.date}</span>
                    </div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.subject}</div>
                  </div>

                  <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 4, backgroundColor: t.status === 'RESOLVED' ? 'rgba(16,185,129,0.1)' : 'rgba(0,71,171,0.1)', color: t.status === 'RESOLVED' ? '#047857' : '#0047AB' }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ════════════════ MOBILE NATIVE BOTTOM BAR ════════════════ */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          padding: '0.4rem 0.5rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
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
            <Award style={{ width: 17, height: 17 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Overview</span>
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
            <Briefcase style={{ width: 17, height: 17 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Tenders</span>
          </button>

          {/* Quick Gate Pass */}
          <button
            onClick={() => setShowGatePassModal(true)}
            style={{
              backgroundColor: '#0047AB',
              border: 'none',
              width: 38,
              height: 38,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <QrCode style={{ width: 18, height: 18 }} />
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
            <DollarSign style={{ width: 17, height: 17 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Payouts</span>
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
            <UserCheck style={{ width: 17, height: 17 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>ID Card</span>
          </button>
        </div>
      )}

      {/* ════════════════ BID MODAL ════════════════ */}
      {biddingTender && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 10, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.08)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>
                  {biddingTender.ref}
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: 4, color: 'var(--text-primary)' }}>Submit Commercial Bid</div>
              </div>
              <button onClick={() => setBiddingTender(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {bidSubmitted ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <CheckCircle2 style={{ width: 36, height: 36, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>Bid Recorded Successfully</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Quote for {biddingTender.ref} submitted to Procurement Committee.
                </p>
                <button onClick={() => setBiddingTender(null)} className="btn-primary" style={{ marginTop: '0.75rem', padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateBid}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Quoted Bid Amount (in ₹ Crores) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    placeholder="e.g. 13.80"
                    style={{ fontSize: 15 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Technical Capability & Remarks</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={bidRemarks}
                    onChange={e => setBidRemarks(e.target.value)}
                    placeholder="Execution timeline, batching plant setup, machinery deployment commitments..."
                    style={{ fontSize: 15 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setBiddingTender(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Bid
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ INVOICE MODAL ════════════════ */}
      {showInvoiceModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 10, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Submit Milestone RA Bill</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Upload GST Invoice for RTGS payout release</div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {invoiceSubmitted ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <CheckCircle2 style={{ width: 36, height: 36, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>Invoice Submitted</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Routed to Finance Dept for 7-day audit & RTGS release.
                </p>
                <button onClick={() => setShowInvoiceModal(false)} className="btn-primary" style={{ marginTop: '0.75rem', padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateInvoice}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">GST Tax Invoice Number *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. INV-2026-8812"
                    value={invoiceForm.invoiceNo}
                    onChange={e => setInvoiceForm({ ...invoiceForm, invoiceNo: e.target.value })}
                    style={{ fontSize: 15 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Invoice Amount (in ₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    placeholder="e.g. 725000"
                    value={invoiceForm.amt}
                    onChange={e => setInvoiceForm({ ...invoiceForm, amt: e.target.value })}
                    style={{ fontSize: 15 }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Signed PDF Invoice Copy</label>
                  <input type="file" className="form-input" accept=".pdf" />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
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

      {/* ════════════════ SUPPORT MODAL ════════════════ */}
      {showTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 10, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Raise Support Ticket</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Direct ticket channel to corporate procurement desk</div>
              </div>
              <button onClick={() => setShowTicketModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {ticketSubmitted ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <CheckCircle2 style={{ width: 36, height: 36, color: '#10B981', margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>Ticket Created</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Assigned procurement officer will respond within 24 hours.
                </p>
                <button onClick={() => setShowTicketModal(false)} className="btn-primary" style={{ marginTop: '0.75rem', padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={ticketForm.category}
                    onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                    style={{ fontSize: 15 }}
                  >
                    <option>Site Gate Pass Request</option>
                    <option>GFC Drawing Clarification</option>
                    <option>RTGS Payment Payout Inquiry</option>
                    <option>Document Renewal</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Query Details *</label>
                  <textarea
                    required
                    className="form-input"
                    rows={3}
                    placeholder="Provide full details..."
                    value={ticketForm.query}
                    onChange={e => setTicketForm({ ...ticketForm, query: e.target.value })}
                    style={{ fontSize: 15 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setShowTicketModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ════════════════ CERTIFICATE MODAL ════════════════ */}
      {showCertificateModal && (
        <SuccessModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          trackingId={vendor.tracking_id || vendor.trackingId}
          formData={vendor}
        />
      )}

      {/* ════════════════ ID CARD MODAL ════════════════ */}
      {showIdCardModal && (
        <VendorIdCardModal
          isOpen={showIdCardModal}
          onClose={() => setShowIdCardModal(false)}
          vendorData={vendor}
        />
      )}

      {/* ════════════════ GATE PASS MODAL ════════════════ */}
      {showGatePassModal && (
        <GatePassModal
          isOpen={showGatePassModal}
          onClose={() => setShowGatePassModal(false)}
          vendorData={vendor}
        />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', padding: '1rem 1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Hindustan Projects Corporate Procurement Division • Vendor ERP Portal (256-Bit SSL Encrypted)
      </footer>

    </div>
  );
}
