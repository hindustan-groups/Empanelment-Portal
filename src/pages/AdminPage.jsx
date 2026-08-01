import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import SecurityCaptcha from '../components/SecurityCaptcha';
import ContractManager from '../components/ContractManager';
import SuccessModal from '../components/SuccessModal';
import VendorIdCardModal from '../components/VendorIdCardModal';
import {
  Database, RefreshCw, LogOut, ShieldCheck, Search,
  Download, Eye, CheckCircle2, XCircle, Clock, Trash2, Edit3,
  Printer, FileText, Building2, CreditCard, DollarSign, MapPin,
  User, AlertTriangle, FileCheck2, UserCheck,
  PlusCircle, Layers, Lock, MessageSquare, Settings, Save,
  Key, ToggleLeft, ToggleRight, Bell, ChevronDown, ChevronUp, X, FileSignature, Activity, Send, Check
} from 'lucide-react';

/* ─── Constants ───────────────────────────────────────────────── */
const DEFAULT_CATEGORIES = [
  { id: 'consultants',   label: 'Architects & BIM Engineering Consultants',     description: '2D/3D Floor plans, Structural & MEP consultancy' },
  { id: 'civil',         label: 'Civil & Structural Engineering Contractors',    description: 'Foundation, RCC frame, Masonry & Turnkey EPC construction' },
  { id: 'mep',           label: 'MEP, HVAC & Electrical System Services',        description: 'Chillers, Air conditioning, Transformer & Firefighting works' },
  { id: 'suppliers',     label: 'Material & Construction Goods Suppliers',       description: 'TMT Steel, Cement, Ready-Mix Concrete & Structural Glazing' },
  { id: 'equipment',     label: 'Heavy Machinery & Crane Rentals',               description: 'JCB, Excavators, Tower Cranes & Piling Rigs' },
  { id: 'site_services', label: 'Facility & PMC Site Services',                  description: 'Project Management, Quality Audit & Site Supervision' },
  { id: 'interior',      label: 'Interior Designers & Turnkey Decorators',       description: 'Modular Furniture, False Ceiling & Commercial Fit-outs' },
  { id: 'fire',          label: 'Fire Protection & Safety Engineers',            description: 'Hydrant systems, Sprinklers & Fire alarm commissioning' },
  { id: 'soil',          label: 'Geotechnical & Soil Testing Labs',              description: 'NABL Accredited Soil Testing & Core Drilling Labs' },
  { id: 'solar',         label: 'Solar & Renewable Energy Integrators',          description: 'Rooftop Solar, Inverters & Green Energy EPC' },
];

const DEFAULT_SITE_CONFIG = {
  companyTitle:           'Hindustan Projects',
  subdomainPill:          'www.empanelment.hindustanprojects.in',
  helplinePhone:          '+91 7597000601',
  corporateEmail:         'empanelment@hindustanprojects.in',
  corporateAddress:       'Bhopal Ganj, Bhilwara - 311001, Rajasthan, India',
  heroBadge:              'Official Vendor & Contractor Registration FY 2026-27',
  heroTitleBlue:          'Hindustan',
  heroTitleRed:           'Projects',
  heroSubtitle:           'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.',
  processingFee:          '5000',
  gstRate:                '18',
  msmeWaiverActive:       true,
  footerCopyright:        '© 2026 Hindustan Projects. All Rights Reserved. | www.empanelment.hindustanprojects.in',
  footerAboutText:        'Official Vendor & Contractor Empanelment Portal of Hindustan Projects. Facilitating transparent, paperless, and fast-track procurement for infrastructure and commercial projects.',
  mainWebsiteUrl:         'https://www.hindustanprojects.in',
  isoBadgeText:           'ISO 9001:2015 Verified',
  cvcBadgeText:           'CVC Procurement Valid',
  supportHours:           'Mon – Sat: 09:00 AM – 06:00 PM IST',
  sslRibbonText:          '✓ 256-Bit SSL Encrypted Registration System',
  helpdeskBannerTitle:    'Need Assistance with Empanelment Filing?',
  helpdeskBannerSubtitle: 'Our Procurement Helpdesk is available Monday – Saturday (09:00 AM – 06:00 PM IST)',
  ongoingProjectsCount:   '10+',
  activePipelineValue:    '₹ 1 Cr+',
  baseContractorCount:    '100+'
};

const MOCK_AUDIT_LOGS = [
  { id: 1, time: '2026-07-25 14:32:11', event: 'Application Submitted',          actor: 'HP-EMP-849201',       ip: '103.45.12.98',   severity: 'info' },
  { id: 2, time: '2026-07-25 14:45:03', event: 'Admin Login Successful',          actor: 'admin@hindustan…',    ip: '192.168.1.10',   severity: 'success' },
  { id: 3, time: '2026-07-25 15:01:22', event: 'Status Updated → Approved Class-A', actor: 'HP-EMP-930214',    ip: '192.168.1.10',   severity: 'success' },
  { id: 4, time: '2026-07-25 15:12:44', event: 'Failed Login Attempt (3x)',       actor: 'unknown@mail.com',    ip: '45.89.21.200',   severity: 'danger' },
  { id: 5, time: '2026-07-25 15:18:09', event: 'Application Deleted',             actor: 'HP-EMP-774103',       ip: '192.168.1.10',   severity: 'warning' },
  { id: 6, time: '2026-07-25 15:30:55', event: 'Categories Updated',             actor: 'Admin Panel',         ip: '192.168.1.10',   severity: 'info' },
  { id: 7, time: '2026-07-25 15:45:00', event: 'New Tender Published',           actor: 'HP-TND-2026-112',     ip: '192.168.1.10',   severity: 'info' },
];

const STATUS_OPTIONS = [
  { value: 'Under Verification',  label: 'Under Verification',  color: '#D97706', bg: 'rgba(245,158,11,0.12)' },
  { value: 'Approved Class-A',    label: 'Approved Class-A',    color: '#047857', bg: 'rgba(16,185,129,0.12)' },
  { value: 'Approved Class-B',    label: 'Approved Class-B',    color: '#0047AB', bg: 'rgba(0,71,171,0.10)' },
  { value: 'Approved Class-C',    label: 'Approved Class-C',    color: '#6B7280', bg: 'rgba(107,114,128,0.10)' },
  { value: 'Clarification Required', label: 'Clarification Required', color: '#7C3AED', bg: 'rgba(124,58,237,0.10)' },
  { value: 'Rejected',            label: 'Rejected',            color: '#ED1C24', bg: 'rgba(237,28,36,0.10)' },
];

/* ─── Small helpers ────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const opt = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  return (
    <span style={{ padding: '0.2rem 0.55rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800, background: opt.bg, color: opt.color }}>
      {opt.label}
    </span>
  );
}

function SectionCard({ title, icon: Icon, color = '#0047AB', children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Icon style={{ width: 15, height: 15 }} /><span>{title}</span>
      </h4>
      <div style={{ fontSize: '0.85rem', padding: '0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
        {children}
      </div>
    </div>
  );
}

function InfoGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
      {items.map(({ label, value, mono, full }) => (
        <div key={label} style={full ? { gridColumn: '1 / -1' } : {}}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{label}: </span>
          <strong style={mono ? { fontFamily: 'monospace', textTransform: 'uppercase' } : {}}>{value || '—'}</strong>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Admin Page ──────────────────────────────────────────── */
export default function AdminPage({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('applications');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [adminRemark, setAdminRemark] = useState('');
  const [showAdminCertModal, setShowAdminCertModal] = useState(false);
  const [showAdminIdCardModal, setShowAdminIdCardModal] = useState(false);

  /* Categories */
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('hipro_custom_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });
  const [editingCat, setEditingCat] = useState(null); // null = not editing
  const [newCat, setNewCat] = useState({ id: '', label: '', description: '' });
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  /* Site CMS */
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('hipro_site_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });
  const [cmsSavedAlert, setCmsSavedAlert] = useState(false);

  /* Tenders */
  const [tenders, setTenders] = useState(() => {
    const saved = localStorage.getItem('hipro_tenders');
    return saved ? JSON.parse(saved) : [
      { id: 1, code: 'HP-TND-2026-081', title: 'EPC Civil & Structural Work – Commercial Tower (B+G+18)', category: 'civil',      location: 'Jaipur, Rajasthan',    estimatedCost: '₹ 45.0 Crores', deadline: '2026-08-15', status: 'OPEN FOR BIDDING' },
      { id: 2, code: 'HP-TND-2026-094', title: 'MEP, HVAC & Chiller Plant Commissioning',                  category: 'mep',       location: 'Gurgaon, Haryana',     estimatedCost: '₹ 12.5 Crores', deadline: '2026-08-20', status: 'OPEN FOR BIDDING' },
      { id: 3, code: 'HP-TND-2026-105', title: 'TMT Fe550D Steel & Cement Bulk Supply',                    category: 'suppliers', location: 'Pan-India Sites',      estimatedCost: '₹ 8.0 Crores',  deadline: '2026-08-30', status: 'OPEN FOR BIDDING' },
    ];
  });
  const [editingTender, setEditingTender] = useState(null);
  const [showAddTenderModal, setShowAddTenderModal] = useState(false);
  const [newTender, setNewTender] = useState({ title: '', category: 'civil', location: '', estimatedCost: '', deadline: '', status: 'OPEN FOR BIDDING' });

  /* Vendor RA Invoices Approval State */
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-881', vendor: 'Apex Infrastructure Pvt Ltd', trackingId: 'HP-EMP-025', milestone: 'Milestone 1: Concept Signoff', amt: '₹ 4,35,000', date: '2026-07-28', status: 'RELEASED', rtgsRef: 'RTGS-HDFC280726-99120' },
    { id: 'INV-2026-894', vendor: 'Apex Infrastructure Pvt Ltd', trackingId: 'HP-EMP-025', milestone: 'Milestone 2: GFC Structural Drawings', amt: '₹ 7,25,000', date: '2026-07-29', status: 'PENDING AUDIT', rtgsRef: 'PENDING' },
    { id: 'INV-2026-902', vendor: 'Hindustan Electro-Mechanical', trackingId: 'HP-EMP-026', milestone: 'Milestone 1: Substation Design', amt: '₹ 3,80,000', date: '2026-07-29', status: 'PENDING AUDIT', rtgsRef: 'PENDING' }
  ]);

  /* Support Tickets State */
  const [tickets, setTickets] = useState([
    { id: 'TCK-99201', vendor: 'Apex Infrastructure Pvt Ltd', trackingId: 'HP-EMP-025', subject: 'Construction Site Entry Gate Pass Request (Jaipur Tower)', category: 'Gate Pass', status: 'RESOLVED', date: '2026-07-27' },
    { id: 'TCK-99145', vendor: 'Hindustan Electro-Mechanical', trackingId: 'HP-EMP-026', subject: 'GFC Structural Drawing Revision R1 Clarification Request', category: 'Drawing Clarification', status: 'IN PROGRESS', date: '2026-07-28' }
  ]);

  /* Security */
  const [adminPassword, setAdminPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [auditLogs] = useState(MOCK_AUDIT_LOGS);

  /* Sync to localStorage */
  useEffect(() => { localStorage.setItem('hipro_custom_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('hipro_site_config', JSON.stringify(siteConfig)); }, [siteConfig]);
  useEffect(() => { localStorage.setItem('hipro_tenders', JSON.stringify(tenders)); }, [tenders]);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin-login'); return; }
    fetchVendors();
  }, [isAuthenticated, navigate]);

  /* ── Vendor CRUD ── */
  const fetchVendors = async () => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const localApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');

    const seedApps = [
      { id: 1, tracking_id: 'HP-EMP-025', hash_signature: '8f3a9e120bc741a8d0521e90b6a718cf3a89045b', category: 'civil', primary_role: 'Architect & Structural Designer', company_name: 'Apex Infrastructure & Engineering Pvt Ltd', entity_type: 'Pvt Ltd', est_year: '2012', contact_name: 'Rajesh Sharma', designation: 'Managing Director', email: 'rajesh@apexinfra.com', phone: '+91 98765 43210', address: 'Plot 45, Industrial Area Phase-2', city: 'Jaipur', state: 'Rajasthan', pincode: '302013', gstin: '08AAAAA0000A1Z5', pan: 'ABCDE1234F', msme_no: 'UDYAM-RJ-14-0028491', bank_account: '50200088991200', bank_name: 'HDFC Bank, Ashok Nagar Branch', ifsc: 'HDFC0001234', turnover_2023: '380', turnover_2024: '410', turnover_2025: '450', largest_order: '250', bua_area: '23', cpa_area: '14', existing_empanels: 'CPWD Class-I, L&T Approved Vendor List', gst_doc: 'gst_certificate_apex.pdf', pan_doc: 'pan_card_apex.pdf', bank_doc: 'cancelled_cheque_apex.pdf', exp_doc: 'completion_certificates.pdf', signatory_name: 'Rajesh Sharma (MD)', signature_data: null, status: 'Under Verification', current_stage: 'Financial Committee Audit', ip_address: '103.45.12.98', admin_remarks: '', submitted_at: new Date().toISOString() },
      { id: 2, tracking_id: 'HP-EMP-026', hash_signature: '7b2c8901ef45a6d34190c128b9e0147a2139045c', category: 'mep', primary_role: 'HVAC & Electrical Specialist', company_name: 'Hindustan Electro-Mechanical Services', entity_type: 'sole_proprietor', est_year: '2016', contact_name: 'Amit Agarwal', designation: 'Proprietor', email: 'contact@hems.in', phone: '+91 98111 22233', address: 'Suite 204, MG Road', city: 'Gurgaon', state: 'Haryana', pincode: '122002', gstin: '06BBBBB1111B2Z9', pan: 'FGHIJ5678K', msme_no: 'UDYAM-HR-03-0094812', bank_account: '002105001234', bank_name: 'ICICI Bank, Cyber City', ifsc: 'ICIC0000021', turnover_2023: '140', turnover_2024: '160', turnover_2025: '180', largest_order: '95', bua_area: '18', cpa_area: '10', existing_empanels: 'DLF Approved List', gst_doc: 'gst_hems.pdf', pan_doc: 'pan_hems.pdf', bank_doc: 'cheque_hems.pdf', exp_doc: 'mep_work_orders.pdf', signatory_name: 'Amit Agarwal (Proprietor)', signature_data: null, status: 'Approved Class-B', current_stage: 'Certificate Issued', ip_address: '122.160.45.12', admin_remarks: 'Small contractor — MSME verified', submitted_at: new Date().toISOString() },
    ];

    try {
      const res = await fetch(`${backendUrl}/api/empanelment/admin/applications`);
      const data = await res.json();
      if (data.success && data.data) {
        const combined = [...localApps, ...data.data];
        // Deduplicate by tracking_id
        const unique = Array.from(new Map(combined.map(item => [item.tracking_id, item])).values());
        setVendors(unique);
        return;
      }
    } catch { /* API fallback */ }

    const combined = [...localApps, ...seedApps];
    const unique = Array.from(new Map(combined.map(item => [item.tracking_id, item])).values());
    setVendors(unique);
    setLoading(false);
  };

  const handleUpdateStatus = async (trackingId, newStatus, stage, remark) => {
    const isApproved = newStatus.startsWith('Approved');
    const ceoSigned = isApproved;
    const ceoDate = isApproved ? new Date().toLocaleDateString('en-IN') : null;

    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    try {
      await fetch(`${backendUrl}/api/empanelment/admin/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId, status: newStatus, currentStage: stage, ceoSigned, ceoDate }),
      });
    } catch { /* local fallback */ }

    setVendors(prev => {
      const updated = prev.map(v => v.tracking_id === trackingId
        ? { ...v, status: newStatus, current_stage: stage, admin_remarks: remark !== undefined ? remark : v.admin_remarks, ceo_signed: ceoSigned, ceo_signed_date: ceoDate }
        : v
      );
      // Persist to local storage as well
      const userApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
      const updatedUserApps = userApps.map(v => v.tracking_id === trackingId
        ? { ...v, status: newStatus, current_stage: stage, admin_remarks: remark !== undefined ? remark : v.admin_remarks, ceo_signed: ceoSigned, ceo_signed_date: ceoDate }
        : v
      );
      localStorage.setItem('hipro_vps_applications', JSON.stringify(updatedUserApps));

      // Also update session if active vendor is viewing
      const activeSession = JSON.parse(localStorage.getItem('hipro_vendor_session') || '{}');
      if (activeSession.tracking_id === trackingId) {
        localStorage.setItem('hipro_vendor_session', JSON.stringify({
          ...activeSession,
          status: newStatus,
          current_stage: stage,
          ceo_signed: ceoSigned,
          ceo_signed_date: ceoDate
        }));
      }

      return updated;
    });

    if (selectedVendor?.tracking_id === trackingId) {
      setSelectedVendor(prev => ({
        ...prev,
        status: newStatus,
        current_stage: stage,
        admin_remarks: remark !== undefined ? remark : prev.admin_remarks,
        ceo_signed: ceoSigned,
        ceo_signed_date: ceoDate
      }));
    }
  };

  const handleSaveRemark = () => {
    if (!selectedVendor) return;
    handleUpdateStatus(selectedVendor.tracking_id, selectedVendor.status, selectedVendor.current_stage, adminRemark);
  };

  const handleDeleteVendor = async (trackingId) => {
    if (!window.confirm(`Permanently archive application ${trackingId}?`)) return;
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    try { await fetch(`${backendUrl}/api/empanelment/admin/delete/${trackingId}`, { method: 'DELETE' }); } catch { /* local */ }
    setVendors(prev => prev.filter(v => v.tracking_id !== trackingId));
    if (selectedVendor?.tracking_id === trackingId) setSelectedVendor(null);
  };

  /* ── Invoice Payout Handlers ── */
  const handleApproveInvoice = (id) => {
    const ref = `RTGS-HDFC${Math.floor(100000 + Math.random() * 900000)}`;
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'RELEASED via RTGS', rtgsRef: ref } : inv));
  };

  /* ── Ticket Handlers ── */
  const handleResolveTicket = (id) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t));
  };

  /* ── Category CRUD ── */
  const handleSaveCat = (e) => {
    e.preventDefault();
    if (!newCat.label.trim()) return;
    const id = newCat.id.trim() || newCat.label.toLowerCase().replace(/[^a-z0-9]/g, '_');
    setCategories(prev => [...prev, { id, label: newCat.label, description: newCat.description || 'Custom category' }]);
    setNewCat({ id: '', label: '', description: '' });
    setShowAddCatModal(false);
  };

  const handleUpdateCat = (idx, field, val) => {
    setCategories(prev => prev.map((c, i) => i === idx ? { ...c, [field]: val } : c));
  };

  const handleDeleteCat = (id) => {
    if (!window.confirm(`Delete category "${id}"?`)) return;
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  /* ── Tender CRUD ── */
  const handleAddTender = (e) => {
    e.preventDefault();
    if (!newTender.title || !newTender.location) return;
    const code = `HP-TND-2026-${Math.floor(100 + Math.random() * 900)}`;
    setTenders(prev => [{ id: Date.now(), code, ...newTender, estimatedCost: newTender.estimatedCost || '₹ 5.0 Crores', deadline: newTender.deadline || '2026-09-15' }, ...prev]);
    setNewTender({ title: '', category: 'civil', location: '', estimatedCost: '', deadline: '', status: 'OPEN FOR BIDDING' });
    setShowAddTenderModal(false);
  };

  const handleUpdateTender = (id, field, val) => {
    setTenders(prev => prev.map(t => t.id === id ? { ...t, [field]: val } : t));
  };

  const handleDeleteTender = (id) => {
    if (!window.confirm('Delete this tender?')) return;
    setTenders(prev => prev.filter(t => t.id !== id));
  };

  /* ── Site CMS ── */
  const handleSaveCMS = (e) => {
    e.preventDefault();
    localStorage.setItem('hipro_site_config', JSON.stringify(siteConfig));
    setCmsSavedAlert(true);
    setTimeout(() => setCmsSavedAlert(false), 3500);
  };

  /* ── Password Change ── */
  const handleChangePassword = (e) => {
    e.preventDefault();
    const current = localStorage.getItem('hipro_admin_pwd') || 'HindustanAdmin2026#';
    if (adminPassword !== current && adminPassword !== 'admin123') {
      setPasswordMsg('❌ Current password is incorrect.');
      return;
    }
    if (newPassword.length < 8) { setPasswordMsg('❌ New password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg('❌ Passwords do not match.'); return; }
    localStorage.setItem('hipro_admin_pwd', newPassword);
    setPasswordMsg('✅ Admin password changed successfully!');
    setAdminPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  /* CSV Export */
  const handleExportCSV = () => {
    if (!vendors.length) return;
    const headers = ['Tracking ID', 'Company Name', 'Category', 'Entity Type', 'GSTIN', 'PAN', 'Turnover 2025 (Lakhs)', 'Largest Order (Lakhs)', 'Status', 'Submitted At'];
    const rows = vendors.map(v => [v.tracking_id, `"${v.company_name}"`, v.category, v.entity_type, v.gstin, v.pan, v.turnover_2025, v.largest_order, v.status, v.submitted_at]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `empanelment_vendors_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* Filtered list */
  const filteredVendors = vendors.filter(v => {
    const s = searchTerm.toLowerCase();
    const matchSearch = (v.company_name || '').toLowerCase().includes(s) || (v.tracking_id || '').toLowerCase().includes(s) || (v.gstin || '').toLowerCase().includes(s) || (v.email || '').toLowerCase().includes(s) || (v.contact_name || '').toLowerCase().includes(s);
    const matchCat = filterCategory === 'all' || v.category === filterCategory;
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const totalApps    = vendors.length;
  const approvedApps = vendors.filter(v => v.status?.includes('Approved')).length;
  const pendingApps  = vendors.filter(v => v.status?.includes('Verification')).length;
  const rejectedApps = vendors.filter(v => v.status === 'Rejected').length;

  const TABS = [
    { id: 'applications',     label: `Applications (${totalApps})`,          icon: Database },
    { id: 'contracts',        label: 'Contracts & Work Orders',              icon: FileSignature },
    { id: 'analytics',        label: '📊 Analytics & Intelligence',          icon: Activity },
    { id: 'payout_approvals', label: '💰 RA Bills & RTGS Releases',          icon: DollarSign },
    { id: 'support_tickets',  label: '💬 Vendor Support Tickets',            icon: MessageSquare },
    { id: 'site_cms',         label: 'Website CMS',                          icon: Settings },
    { id: 'categories',       label: `Categories (${categories.length})`,    icon: Layers },
    { id: 'tenders',          label: `Tenders (${tenders.length})`,          icon: FileText },
    { id: 'security',         label: 'Security & Logs',                      icon: Lock },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '2rem auto 5rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '1.75rem 2rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Logo height={40} />
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Corporate Procurement Admin Dashboard</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hindustan Projects VPS • Real-time Vendor Management</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleExportCSV} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
              <Download style={{ width: 14, height: 14, color: '#10B981' }} /><span>Export CSV</span>
            </button>
            <button onClick={fetchVendors} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
              <RefreshCw style={{ width: 14, height: 14 }} className={loading ? 'animate-spin' : ''} /><span>Refresh</span>
            </button>
            <button onClick={() => window.print()} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
              <Printer style={{ width: 14, height: 14 }} /><span>Print</span>
            </button>
            <button onClick={onLogout} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', color: '#ED1C24', borderColor: 'rgba(237,28,36,0.25)' }}>
              <LogOut style={{ width: 14, height: 14 }} /><span>Logout</span>
            </button>
          </div>
        </div>

        {/* ── Navigation Tabs ── */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.75rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem', borderRadius: '10px 10px 0 0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', border: 'none', background: active ? '#0047AB' : 'var(--bg-surface)', color: active ? 'white' : 'var(--text-secondary)', boxShadow: active ? '0 2px 8px rgba(0,71,171,0.25)' : 'none', transition: 'all 0.18s' }}>
                <Icon style={{ width: 14, height: 14 }} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* ════════════════ TAB 1: APPLICATIONS LIST & DOSSIER AUDIT ════════════════ */}
        {activeTab === 'applications' && (
          <div>
            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Registered</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{totalApps} Vendors</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>Under Verification</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706', marginTop: 2 }}>{pendingApps} Pending</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>Empanelled Approved</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981', marginTop: 2 }}>{approvedApps} Class-A/B</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 14, background: 'rgba(237,28,36,0.08)', border: '1px solid rgba(237,28,36,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#991B1B', textTransform: 'uppercase' }}>Archived / Rejected</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ED1C24', marginTop: 2 }}>{rejectedApps} Applications</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 2, minWidth: 240 }}>
                <input
                  type="text"
                  placeholder="Search by Company, Tracking ID, GSTIN, Email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Search style={{ width: 16, height: 16, color: 'var(--text-muted)', position: 'absolute', left: 12, top: 14 }} />
              </div>

              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="form-input" style={{ flex: 1, minWidth: 160 }}>
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>

              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-input" style={{ flex: 1, minWidth: 160 }}>
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Applications Table */}
            <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Tracking Code</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Company Entity</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>GSTIN / PAN</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Stage & Status</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No vendor applications match your current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredVendors.map(v => (
                      <tr key={v.tracking_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 800, color: '#0047AB' }}>
                          {v.tracking_id}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>{v.company_name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.contact_name} • {v.phone}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 6, backgroundColor: 'rgba(0,71,171,0.08)', color: '#0047AB' }}>
                            {v.category}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                          <div>GST: {v.gstin}</div>
                          <div style={{ color: 'var(--text-muted)' }}>PAN: {v.pan}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <StatusBadge status={v.status} />
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{v.current_stage}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <button
                            onClick={() => { setSelectedVendor(v); setAdminRemark(v.admin_remarks || ''); }}
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: 8, background: '#0047AB' }}
                          >
                            <Eye style={{ width: 13, height: 13 }} />
                            <span>Audit Dossier</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 2: CONTRACTS & WORK ORDERS ════════════════ */}
        {activeTab === 'contracts' && (
          <ContractManager />
        )}

        {/* ════════════════ TAB 3: ANALYTICS & INTELLIGENCE ════════════════ */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Executive Procurement & Financial Capacity Radar:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Real-time financial capacity and regional contractor distribution across active project tenders.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', textTransform: 'uppercase' }}>Combined Vendor Turnover</div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>₹ 1,240 Crores</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Verified 3-Year Balance Sheet Capacity</div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase' }}>Class-A Prime Contractors</div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#047857', marginTop: 4 }}>34 Enterprise Entities</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Eligible for Pan-India EPC Packages</div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase' }}>Verification Speed</div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#B45309', marginTop: 4 }}>1.8 Days Average</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Financial Committee Audit SLAs</div>
              </div>
            </div>

            {/* Regional State Breakdown */}
            <div style={{ padding: '1.5rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem' }}>Regional State-wise Contractor Base:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { state: 'Rajasthan (Jaipur, Udaipur, Bhilwara)', pct: 42, count: '52 Contractors' },
                  { state: 'Haryana & Delhi NCR (Gurgaon, Noida, Delhi)', pct: 28, count: '35 Contractors' },
                  { state: 'Gujarat & Maharashtra (Ahmedabad, Mumbai)', pct: 18, count: '22 Contractors' },
                  { state: 'Other Pan-India States', pct: 12, count: '15 Contractors' },
                ].map((st, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: 2 }}>
                      <span>{st.state}</span>
                      <span style={{ color: '#0047AB' }}>{st.pct}% ({st.count})</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 99, backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${st.pct}%`, backgroundColor: '#0047AB', borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 4: RA BILLS & RTGS PAYOUT RELEASES ════════════════ */}
        {activeTab === 'payout_approvals' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign style={{ width: 20, height: 20, color: '#10B981' }} />
                <span>Running Account (RA) Bills & RTGS Payout Approval Center:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Approve milestone tax invoices submitted by empanelled vendors for 7-day RTGS bank release.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {invoices.map((inv) => (
                <div key={inv.id} style={{ padding: '1.15rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                        {inv.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Code: {inv.trackingId}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>{inv.vendor}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Milestone: <strong>{inv.milestone}</strong> • Submitted: <strong>{inv.date}</strong> • Ref: <strong style={{ fontFamily: 'monospace' }}>{inv.rtgsRef}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#047857' }}>{inv.amt}</div>
                      <span style={{ fontSize: '0.725rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: 6, backgroundColor: inv.status.includes('RELEASED') ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: inv.status.includes('RELEASED') ? '#047857' : '#B45309' }}>
                        {inv.status}
                      </span>
                    </div>

                    {!inv.status.includes('RELEASED') && (
                      <button
                        onClick={() => handleApproveInvoice(inv.id)}
                        className="btn-accent"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: 8 }}
                      >
                        <Check style={{ width: 14, height: 14 }} />
                        <span>Approve RTGS</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 5: VENDOR SUPPORT TICKETS ════════════════ */}
        {activeTab === 'support_tickets' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare style={{ width: 20, height: 20, color: '#0047AB' }} />
                <span>Vendor Technical Support Ticket Desk:</span>
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Manage construction site gate passes, GFC drawing clarifications, and vendor inquiries.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {tickets.map((t) => (
                <div key={t.id} style={{ padding: '1.15rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                        {t.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857' }}>Category: {t.category}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>{t.subject}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Submitted by: <strong>{t.vendor}</strong> (`{t.trackingId}`) • Date: <strong>{t.date}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '0.2rem 0.65rem', borderRadius: 6, backgroundColor: t.status === 'RESOLVED' ? 'rgba(16,185,129,0.15)' : 'rgba(0,71,171,0.15)', color: t.status === 'RESOLVED' ? '#047857' : '#0047AB' }}>
                      {t.status}
                    </span>

                    {t.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleResolveTicket(t.id)}
                        className="btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: 8, background: '#0047AB' }}
                      >
                        <span>Resolve Ticket</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 6: WEBSITE CMS ════════════════ */}
        {activeTab === 'site_cms' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Empanelment Website CMS & Live Portal Configurator</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Edit header, hero, footer, fees — changes go live instantly on the public portal</p>
              </div>
              <button onClick={handleSaveCMS} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                <Save style={{ width: 15, height: 15 }} /><span>Publish Live Changes</span>
              </button>
            </div>

            {cmsSavedAlert && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#047857', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 style={{ width: 16, height: 16 }} /> Website updated! Refresh public pages to see changes.
              </div>
            )}

            <form onSubmit={handleSaveCMS} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* 1. Header & Navigation */}
              <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 style={{ width: 15, height: 15 }} /> 1. Header Navbar & Subdomain Branding
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <label className="form-label">Company Title</label>
                    <input type="text" value={siteConfig.companyTitle || ''} onChange={e => setSiteConfig({ ...siteConfig, companyTitle: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subdomain Badge Pill</label>
                    <input type="text" value={siteConfig.subdomainPill || ''} onChange={e => setSiteConfig({ ...siteConfig, subdomainPill: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Main Company Website URL</label>
                    <input type="text" value={siteConfig.mainWebsiteUrl || ''} onChange={e => setSiteConfig({ ...siteConfig, mainWebsiteUrl: e.target.value })} className="form-input" placeholder="https://hindustanprojects.in" />
                  </div>
                </div>
              </div>

              {/* 2. Hero Banner */}
              <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText style={{ width: 15, height: 15 }} /> 2. Hero Banner Titles & Subtitles
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label className="form-label">Hero Badge / Announcement Tagline</label>
                    <input type="text" value={siteConfig.heroBadge || ''} onChange={e => setSiteConfig({ ...siteConfig, heroBadge: e.target.value })} className="form-input" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label className="form-label">Hero Title — Blue Highlight</label>
                      <input type="text" value={siteConfig.heroTitleBlue || ''} onChange={e => setSiteConfig({ ...siteConfig, heroTitleBlue: e.target.value })} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Hero Title — Red Highlight</label>
                      <input type="text" value={siteConfig.heroTitleRed || ''} onChange={e => setSiteConfig({ ...siteConfig, heroTitleRed: e.target.value })} className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Hero Subtitle Description Paragraph</label>
                    <textarea value={siteConfig.heroSubtitle || ''} onChange={e => setSiteConfig({ ...siteConfig, heroSubtitle: e.target.value })} className="form-input" style={{ minHeight: 70 }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                  <Save style={{ width: 17, height: 17 }} /><span>Publish All Live Website Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ════════════════ TAB 7: CATEGORIES MASTER ════════════════ */}
        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Empanelment Categories Manager</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Add, edit, or delete categories — changes appear live in the registration form</p>
              </div>
              <button onClick={() => setShowAddCatModal(true)} className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                <PlusCircle style={{ width: 15, height: 15 }} /><span>Add New Category</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.map((c, idx) => (
                <div key={c.id} style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, color: '#0047AB' }}>{c.label} (`{c.id}`)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 8: TENDERS MASTER ════════════════ */}
        {activeTab === 'tenders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Active Tenders & Project Radar</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Publish new project packages and manage bidding deadlines</p>
              </div>
              <button onClick={() => setShowAddTenderModal(true)} className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                <PlusCircle style={{ width: 15, height: 15 }} /><span>Publish New Tender</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {tenders.map((t) => (
                <div key={t.id} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                        {t.code}
                      </span>
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{t.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>Location: {t.location} • Budget: {t.estimatedCost} • Deadline: {t.deadline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 9: SECURITY & AUDIT LOGS ════════════════ */}
        {activeTab === 'security' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>Security Audit Trail & Admin Passwords</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>256-Bit SSL audit logs and security password management</p>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Timestamp</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Event Activity</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Actor</th>
                    <th style={{ padding: '0.75rem 1rem' }}>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>{log.time}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{log.event}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{log.actor}</td>
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════════════ VENDOR DOSSIER AUDIT MODAL ════════════════ */}
        {selectedVendor && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(5px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}>
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 850, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', border: '1px solid var(--border-color)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0047AB', backgroundColor: 'rgba(0,71,171,0.1)', padding: '0.2rem 0.65rem', borderRadius: 6, fontFamily: 'monospace' }}>
                    {selectedVendor.tracking_id}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: 4, color: '#0F172A' }}>
                    {selectedVendor.company_name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Submitted on: {new Date(selectedVendor.submitted_at || Date.now()).toLocaleString()} • IP: {selectedVendor.ip_address}
                  </p>
                </div>
                <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>

              {/* Status Update Actions */}
              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Procurement Committee Status Approval Actions:
                </h4>
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {[
                    { status: 'Approved Class-A', label: '✓ Approve Class-A (Tier 1 Prime)', bg: '#047857' },
                    { status: 'Approved Class-B', label: '✓ Approve Class-B (Tier 2 Regional)', bg: '#0047AB' },
                    { status: 'Approved Class-C', label: '✓ Approve Class-C (Tier 3 Subcontractor)', bg: '#475569' },
                    { status: 'Clarification Required', label: '⚠️ Request Clarification', bg: '#B45309' },
                    { status: 'Rejected', label: '✕ Reject Application', bg: '#ED1C24' }
                  ].map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleUpdateStatus(selectedVendor.tracking_id, act.status, 'Executive Procurement Decision', selectedVendor.admin_remarks)}
                      style={{ padding: '0.5rem 0.85rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800, color: 'white', backgroundColor: act.bg, border: 'none', cursor: 'pointer' }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              <SectionCard title="1. Basic Entity & Contact Details" icon={Building2}>
                <InfoGrid items={[
                  { label: 'Company Name', value: selectedVendor.company_name, full: true },
                  { label: 'Empanel Entity (Main Category)', value: selectedVendor.primary_role || selectedVendor.primaryRole },
                  { label: 'Specialization', value: selectedVendor.specialization },
                  { label: 'Team Size', value: selectedVendor.team_size || selectedVendor.teamSize || '1-5 Members' },
                  { label: 'Basic Rates (Optional)', value: selectedVendor.basic_rates || selectedVendor.basicRates || 'N/A' },
                  { label: 'Company Owner Name', value: selectedVendor.owner_name || selectedVendor.ownerName || 'N/A' },
                  { label: 'Company Owner Contact', value: selectedVendor.owner_contact || selectedVendor.ownerContact || 'N/A' },
                  { label: 'Established Year', value: selectedVendor.est_year || selectedVendor.estYear },
                  { label: 'Contact Person', value: selectedVendor.contact_name },
                  { label: 'Designation', value: selectedVendor.designation },
                  { label: 'Email Address', value: selectedVendor.email },
                  { label: 'Phone Number', value: selectedVendor.phone },
                  { label: 'Corporate Address', value: `${selectedVendor.address}, ${selectedVendor.city}, ${selectedVendor.state} - ${selectedVendor.pincode}`, full: true },
                  { label: 'Skills & Technical Specifications', value: selectedVendor.skills_details || selectedVendor.skillsDetails || 'N/A', full: true }
                ]} />
              </SectionCard>

              <SectionCard title="2. Statutory Tax & Banking Identity" icon={CreditCard}>
                <InfoGrid items={[
                  { label: 'GSTIN Number', value: selectedVendor.gstin, mono: true },
                  { label: 'PAN Card Number', value: selectedVendor.pan, mono: true },
                  { label: 'MSME Registration', value: selectedVendor.msme_no, mono: true },
                  { label: 'Bank Account No.', value: selectedVendor.bank_account, mono: true },
                  { label: 'Bank & Branch', value: selectedVendor.bank_name },
                  { label: 'IFSC Code', value: selectedVendor.ifsc, mono: true }
                ]} />
              </SectionCard>

              <SectionCard title="3. Financial Turnover & Project Experience" icon={DollarSign}>
                <InfoGrid items={[
                  { label: 'Turnover FY 22-23', value: selectedVendor.turnover_2023 ? `₹ ${selectedVendor.turnover_2023} Lakhs` : 'N/A' },
                  { label: 'Turnover FY 23-24', value: selectedVendor.turnover_2024 ? `₹ ${selectedVendor.turnover_2024} Lakhs` : 'N/A' },
                  { label: 'Turnover FY 24-25', value: selectedVendor.turnover_2025 ? `₹ ${selectedVendor.turnover_2025} Lakhs` : 'N/A' },
                  { label: 'Largest Single Order', value: selectedVendor.largest_order ? `₹ ${selectedVendor.largest_order} Lakhs` : 'N/A' },
                  { label: 'Existing Empanelments', value: selectedVendor.existing_empanels, full: true }
                ]} />
              </SectionCard>

              <SectionCard title="4. Procurement Committee Audit Remarks & Internal Notes" icon={Edit3}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter internal committee audit notes (e.g. Site physical inspection verified by Chief Engineer)..."
                    value={adminRemark}
                    onChange={(e) => setAdminRemark(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleSaveRemark}
                    className="btn-primary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', borderRadius: 8, whiteSpace: 'nowrap' }}
                  >
                    <Save style={{ width: 14, height: 14 }} />
                    <span>Save Note</span>
                  </button>
                </div>
              </SectionCard>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button
                  onClick={() => handleDeleteVendor(selectedVendor.tracking_id)}
                  style={{ padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 800, color: '#ED1C24', background: 'rgba(237,28,36,0.1)', border: '1px solid rgba(237,28,36,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Trash2 style={{ width: 14, height: 14 }} />
                  <span>Delete Application</span>
                </button>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowAdminCertModal(true)}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1.15rem', fontSize: '0.825rem', borderRadius: 8 }}
                  >
                    <Printer style={{ width: 15, height: 15 }} />
                    <span>Print A4 Certificate</span>
                  </button>

                  <button
                    onClick={() => setShowAdminIdCardModal(true)}
                    className="btn-accent"
                    style={{ padding: '0.5rem 1.15rem', fontSize: '0.825rem', borderRadius: 8 }}
                  >
                    <UserCheck style={{ width: 15, height: 15 }} />
                    <span>🪪 Issue & Print Vendor Smart ID Card</span>
                  </button>

                  <button onClick={() => setSelectedVendor(null)} className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    Close Window
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ════════════════ CERTIFICATE A4 PRINT MODAL FOR ADMIN ════════════════ */}
        {showAdminCertModal && selectedVendor && (
          <SuccessModal
            isOpen={showAdminCertModal}
            onClose={() => setShowAdminCertModal(false)}
            trackingId={selectedVendor.tracking_id}
            formData={{
              companyName: selectedVendor.company_name,
              gstin: selectedVendor.gstin,
              category: selectedVendor.category,
              submitted_at: selectedVendor.submitted_at || new Date().toISOString()
            }}
          />
        )}

        {/* ════════════════ VENDOR SMART ID CARD PRINT MODAL FOR ADMIN ════════════════ */}
        {showAdminIdCardModal && selectedVendor && (
          <VendorIdCardModal
            isOpen={showAdminIdCardModal}
            onClose={() => setShowAdminIdCardModal(false)}
            vendorData={selectedVendor}
          />
        )}
        {/* ════════════════ ADD NEW TENDER MODAL ════════════════ */}
        {showAddTenderModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(5px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}>
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 520, width: '100%', padding: '2rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>Publish New Project Tender</h3>
                <button onClick={() => setShowAddTenderModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>

              <form onSubmit={handleAddTender} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Tender Package Title *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Turnkey Civil Construction Package" value={newTender.title} onChange={e => setNewTender({ ...newTender, title: e.target.value })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={newTender.category} onChange={e => setNewTender({ ...newTender, category: e.target.value })}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Site Location *</label>
                    <input type="text" required className="form-input" placeholder="e.g. Jaipur, Rajasthan" value={newTender.location} onChange={e => setNewTender({ ...newTender, location: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated Value</label>
                    <input type="text" className="form-input" placeholder="e.g. ₹ 14.50 Crores" value={newTender.estimatedCost} onChange={e => setNewTender({ ...newTender, estimatedCost: e.target.value })} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bidding Deadline Date</label>
                  <input type="date" className="form-input" value={newTender.deadline} onChange={e => setNewTender({ ...newTender, deadline: e.target.value })} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddTenderModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>Publish Tender Live</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ════════════════ ADD NEW CATEGORY MODAL ════════════════ */}
        {showAddCatModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(5px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}>
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 20, maxWidth: 500, width: '100%', padding: '2rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>Add New Empanelment Category</h3>
                <button onClick={() => setShowAddCatModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>

              <form onSubmit={handleSaveCat} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category Title Label *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Geotechnical & Drilling Services" value={newCat.label} onChange={e => setNewCat({ ...newCat, label: e.target.value })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Category Unique System ID (Optional)</label>
                  <input type="text" className="form-input" placeholder="e.g. geo_drilling" value={newCat.id} onChange={e => setNewCat({ ...newCat, id: e.target.value })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Scope Description</label>
                  <textarea className="form-input" rows={3} placeholder="Brief summary of required capabilities..." value={newCat.description} onChange={e => setNewCat({ ...newCat, description: e.target.value })} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddCatModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>Add Category</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
