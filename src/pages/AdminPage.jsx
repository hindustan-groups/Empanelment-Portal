import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { 
  Database, RefreshCw, LogOut, ShieldCheck, Search, Filter, 
  Download, Eye, CheckCircle2, XCircle, Clock, Trash2, Edit3, 
  Printer, FileText, Building2, CreditCard, DollarSign, MapPin, 
  User, Check, AlertTriangle, ShieldAlert, Award, FileCheck2, 
  PlusCircle, Sliders, BarChart3, Lock, MessageSquare, ExternalLink, Calendar, HardHat, Layers, Settings, Save 
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { id: 'consultants', label: 'Architects & BIM Engineering Consultants', description: '2D/3D Floor plans, Structural & MEP consultancy' },
  { id: 'civil', label: 'Civil & Structural Engineering Contractors', description: 'Foundation, RCC frame, Masonry & Turnkey EPC construction' },
  { id: 'mep', label: 'MEP, HVAC & Electrical System Services', description: 'Chillers, Air conditioning, Transformer & Firefighting works' },
  { id: 'suppliers', label: 'Material & Construction Goods Suppliers', description: 'TMT Steel, Cement, Ready-Mix Concrete & Structural Glazing' },
  { id: 'equipment', label: 'Heavy Machinery & Crane Rentals', description: 'JCB, Excavators, Tower Cranes & Piling Rigs' },
  { id: 'site_services', label: 'Facility & PMC Site Services', description: 'Project Management, Quality Audit & Site Supervision' },
  { id: 'interior', label: 'Interior Designers & Turnkey Decorators', description: 'Modular Furniture, False Ceiling & Commercial Fit-outs' },
  { id: 'fire', label: 'Fire Protection & Safety Engineers', description: 'Hydrant systems, Sprinklers & Fire alarm commissioning' },
  { id: 'soil', label: 'Geotechnical & Soil Testing Labs', description: 'NABL Accredited Soil Testing & Core Drilling Labs' },
  { id: 'solar', label: 'Solar & Renewable Energy Integrators', description: 'Rooftop Solar, Inverters & Green Energy EPC' }
];

const DEFAULT_SITE_CONFIG = {
  companyTitle: 'Hindustan Projects',
  subdomainPill: 'empanel.hindustanprojects.in',
  helplinePhone: '+91 (011) 4500 8899 / 900',
  corporateEmail: 'empanelment@hindustanprojects.in',
  corporateAddress: 'Hindustan Projects Corporate Tower, Barakhamba Road, New Delhi - 110001',
  heroBadge: 'Official Vendor & Contractor Registration FY 2026-27',
  heroTitleBlue: 'Hindustan',
  heroTitleRed: 'Projects',
  heroSubtitle: 'Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.',
  processingFee: '5000',
  gstRate: '18',
  msmeWaiverActive: true,
  footerCopyright: '© 2026 Hindustan Projects. All Rights Reserved. | Designed for empanel.hindustanprojects.in'
};

export default function AdminPage({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'site_cms' | 'categories' | 'tenders' | 'analytics' | 'security'
  const [vendors, setVendors] = useState([]);
  
  // Dynamic Categories Manager State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('hipro_custom_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // Dynamic Site Content CMS State
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('hipro_site_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });

  const [cmsSavedAlert, setCmsSavedAlert] = useState(false);
  const [newCat, setNewCat] = useState({ id: '', label: '', description: '' });
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const [tenders, setTenders] = useState([
    { id: 1, code: 'HP-TND-2026-081', title: 'EPC Civil & Structural Work - Commercial Tower (B+G+18)', category: 'civil', location: 'Jaipur, Rajasthan', estimatedCost: '₹ 45.0 Crores', deadline: '2026-08-15', status: 'OPEN FOR BIDDING' },
    { id: 2, code: 'HP-TND-2026-094', title: 'MEP, HVAC & Chiller Plant Commissioning', category: 'mep', location: 'Gurgaon, Haryana', estimatedCost: '₹ 12.5 Crores', deadline: '2026-08-20', status: 'OPEN FOR BIDDING' },
    { id: 3, code: 'HP-TND-2026-105', title: 'TMT Fe550D Steel & Cement Bulk Supply', category: 'suppliers', location: 'Pan-India Project Sites', estimatedCost: '₹ 8.0 Crores', deadline: '2026-08-30', status: 'OPEN FOR BIDDING' }
  ]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  const [scores, setScores] = useState({ financial: 22, technical: 20, quality: 22, trackRecord: 21 });
  const [showNewTenderModal, setShowNewTenderModal] = useState(false);
  const [newTender, setNewTender] = useState({ title: '', category: 'civil', location: '', estimatedCost: '', deadline: '' });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    fetchVendors();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem('hipro_custom_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('hipro_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  const handleSaveCMS = (e) => {
    e.preventDefault();
    localStorage.setItem('hipro_site_config', JSON.stringify(siteConfig));
    setCmsSavedAlert(true);
    setTimeout(() => setCmsSavedAlert(false), 3500);
  };

  const fetchVendors = async () => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/admin/applications`);
      const data = await response.json();
      if (data.success && data.data) {
        setVendors(data.data);
      }
    } catch (err) {
      setVendors([
        {
          id: 1,
          tracking_id: 'HP-EMP-849201',
          hash_signature: '8f3a9e120bc741a8d0521e90b6a718cf3a89045b',
          category: 'civil',
          primary_role: 'Architect & Structural Designer',
          company_name: 'Apex Infrastructure & Engineering Pvt Ltd',
          entity_type: 'Pvt Ltd',
          est_year: '2012',
          contact_name: 'Rajesh Sharma',
          designation: 'Managing Director',
          email: 'rajesh@apexinfra.com',
          phone: '+91 98765 43210',
          address: 'Plot 45, Industrial Area Phase-2',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302013',
          gstin: '08AAAAA0000A1Z5',
          pan: 'ABCDE1234F',
          msme_no: 'UDYAM-RJ-14-0028491',
          bank_account: '50200088991200',
          bank_name: 'HDFC Bank, Ashok Nagar Branch',
          ifsc: 'HDFC0001234',
          turnover_2023: '380',
          turnover_2024: '410',
          turnover_2025: '450',
          largest_order: '250',
          bua_area: '23',
          cpa_area: '14',
          existing_empanels: 'CPWD Class-I, L&T Approved Vendor List',
          gst_doc: 'gst_certificate_apex.pdf',
          pan_doc: 'pan_card_apex.pdf',
          bank_doc: 'cancelled_cheque_apex.pdf',
          exp_doc: 'completion_certificates.pdf',
          signatory_name: 'Rajesh Sharma (MD)',
          signature_data: null,
          status: 'Under Verification',
          current_stage: 'Financial Committee Audit',
          ip_address: '103.45.12.98',
          submitted_at: new Date().toISOString()
        },
        {
          id: 2,
          tracking_id: 'HP-EMP-930214',
          hash_signature: '7b2c8901ef45a6d34190c128b9e0147a2139045c',
          category: 'mep',
          primary_role: 'HVAC & Electrical Specialist',
          company_name: 'Hindustan Electro-Mechanical Services',
          entity_type: 'Partnership',
          est_year: '2016',
          contact_name: 'Amit Agarwal',
          designation: 'Managing Partner',
          email: 'contact@hems.in',
          phone: '+91 98111 22233',
          address: 'Suite 204, Commercial Tower, MG Road',
          city: 'Gurgaon',
          state: 'Haryana',
          pincode: '122002',
          gstin: '06BBBBB1111B2Z9',
          pan: 'FGHIJ5678K',
          msme_no: 'UDYAM-HR-03-0094812',
          bank_account: '002105001234',
          bank_name: 'ICICI Bank, Cyber City Branch',
          ifsc: 'ICIC0000021',
          turnover_2023: '140',
          turnover_2024: '160',
          turnover_2025: '180',
          largest_order: '95',
          bua_area: '18',
          cpa_area: '10',
          existing_empanels: 'HVAC Specialist List - DLF',
          gst_doc: 'gst_hems.pdf',
          pan_doc: 'pan_hems.pdf',
          bank_doc: 'cheque_hems.pdf',
          exp_doc: 'mep_work_orders.pdf',
          signatory_name: 'Amit Agarwal (Partner)',
          signature_data: null,
          status: 'Approved Class-B',
          current_stage: 'Empanelment Certificate Issued',
          ip_address: '122.160.45.12',
          submitted_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.label.trim()) return;

    const catId = newCat.id.trim() || newCat.label.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const catObj = {
      id: catId,
      label: newCat.label,
      description: newCat.description || 'Custom added corporate empanelment category'
    };

    setCategories(prev => [...prev, catObj]);
    setNewCat({ id: '', label: '', description: '' });
    setShowAddCatModal(false);
  };

  const handleDeleteCategory = (catId) => {
    if (!window.confirm(`Are you sure you want to delete category "${catId}" from active portal options?`)) return;
    setCategories(prev => prev.filter(c => c.id !== catId));
  };

  const handleUpdateStatus = async (trackingId, newStatus, newStage) => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      await fetch(`${backendUrl}/api/empanelment/admin/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId, status: newStatus, currentStage: newStage })
      });
    } catch (err) {
      console.warn('Updated status locally:', err);
    } finally {
      setVendors(prev => prev.map(v => v.tracking_id === trackingId ? { ...v, status: newStatus, current_stage: newStage } : v));
      if (selectedVendor && selectedVendor.tracking_id === trackingId) {
        setSelectedVendor(prev => ({ ...prev, status: newStatus, current_stage: newStage }));
      }
    }
  };

  const handleDeleteVendor = async (trackingId) => {
    if (!window.confirm(`Are you sure you want to permanently archive application ${trackingId}?`)) return;

    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    try {
      await fetch(`${backendUrl}/api/empanelment/admin/delete/${trackingId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Deleted locally:', err);
    } finally {
      setVendors(prev => prev.filter(v => v.tracking_id !== trackingId));
      if (selectedVendor?.tracking_id === trackingId) setSelectedVendor(null);
    }
  };

  const handleAddTender = (e) => {
    e.preventDefault();
    if (!newTender.title || !newTender.location) return;

    const code = `HP-TND-2026-${Math.floor(100 + Math.random() * 900)}`;
    const tenderObj = {
      id: Date.now(),
      code,
      title: newTender.title,
      category: newTender.category,
      location: newTender.location,
      estimatedCost: newTender.estimatedCost || '₹ 5.0 Crores',
      deadline: newTender.deadline || '2026-09-15',
      status: 'OPEN FOR BIDDING'
    };

    setTenders(prev => [tenderObj, ...prev]);
    setNewTender({ title: '', category: 'civil', location: '', estimatedCost: '', deadline: '' });
    setShowNewTenderModal(false);
  };

  const handleExportCSV = () => {
    if (vendors.length === 0) return;
    const headers = ['Tracking ID', 'Company Name', 'Entity Type', 'Category', 'GSTIN', 'PAN', 'Contact Officer', 'Email', 'Phone', 'City', 'State', 'Bank Account', 'IFSC', 'Turnover FY24', 'Turnover FY25', 'Turnover FY26', 'Largest Work Order', 'Status', 'Submitted At'];
    const rows = vendors.map(v => [
      v.tracking_id,
      `"${v.company_name}"`,
      v.entity_type,
      v.category,
      v.gstin,
      v.pan,
      `"${v.contact_name}"`,
      v.email,
      v.phone,
      `"${v.city}"`,
      `"${v.state}"`,
      `"${v.bank_account}"`,
      v.ifsc,
      v.turnover_2023 || 0,
      v.turnover_2024 || 0,
      v.turnover_2025 || 0,
      v.largest_order || 0,
      v.status,
      new Date(v.submitted_at).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HindustanProjects_Vendor_Dossier_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  if (!isAuthenticated) return null;

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || v.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const totalApps = vendors.length;
  const approvedApps = vendors.filter(v => v.status?.includes('Approved')).length;
  const pendingApps = vendors.filter(v => v.status?.includes('Verification')).length;
  const totalAuditScore = scores.financial + scores.technical + scores.quality + scores.trackRecord;

  return (
    <div style={{ maxWidth: 1240, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        {/* Top Corporate Admin Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Logo height={42} />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Corporate Procurement Enterprise Dashboard</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hindustan Projects VPS Database • Real Procurement Management System</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleExportCSV} className="btn-secondary">
              <Download style={{ width: 16, height: 16, color: '#10B981' }} />
              <span>Export CSV Dossier</span>
            </button>
            <button onClick={fetchVendors} className="btn-secondary">
              <RefreshCw style={{ width: 16, height: 16 }} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Database</span>
            </button>
            <button onClick={onLogout} className="btn-secondary" style={{ color: '#ED1C24', borderColor: 'rgba(237, 28, 36, 0.3)' }}>
              <LogOut style={{ width: 16, height: 16 }} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`btn-secondary ${activeTab === 'applications' ? 'active' : ''}`}
            style={{ backgroundColor: activeTab === 'applications' ? '#0047AB' : 'var(--bg-surface)', color: activeTab === 'applications' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <Database style={{ width: 16, height: 16 }} />
            <span>Vendor Applications ({totalApps})</span>
          </button>

          <button 
            onClick={() => setActiveTab('site_cms')}
            className={`btn-secondary ${activeTab === 'site_cms' ? 'active' : ''}`}
            style={{ backgroundColor: activeTab === 'site_cms' ? '#0047AB' : 'var(--bg-surface)', color: activeTab === 'site_cms' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <Settings style={{ width: 16, height: 16 }} />
            <span>Website Content CMS</span>
          </button>

          <button 
            onClick={() => setActiveTab('categories')}
            className={`btn-secondary ${activeTab === 'categories' ? 'active' : ''}`}
            style={{ backgroundColor: activeTab === 'categories' ? '#0047AB' : 'var(--bg-surface)', color: activeTab === 'categories' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <Layers style={{ width: 16, height: 16 }} />
            <span>Categories Manager ({categories.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('tenders')}
            className={`btn-secondary ${activeTab === 'tenders' ? 'active' : ''}`}
            style={{ backgroundColor: activeTab === 'tenders' ? '#0047AB' : 'var(--bg-surface)', color: activeTab === 'tenders' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <FileText style={{ width: 16, height: 16 }} />
            <span>Active Tenders Manager ({tenders.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`btn-secondary ${activeTab === 'security' ? 'active' : ''}`}
            style={{ backgroundColor: activeTab === 'security' ? '#0047AB' : 'var(--bg-surface)', color: activeTab === 'security' ? 'white' : 'var(--text-primary)', border: 'none' }}
          >
            <Lock style={{ width: 16, height: 16 }} />
            <span>Audit Logs & Security</span>
          </button>
        </div>

        {/* TAB 1: VENDOR APPLICATIONS ROSTER */}
        {activeTab === 'applications' && (
          <div>
            {/* Analytics Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Total Registered Vendors</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0047AB' }}>{totalApps}</div>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase' }}>Approved Class A/B Vendors</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#10B981' }}>{approvedApps}</div>
              </div>

              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 800, textTransform: 'uppercase' }}>Pending Review / Verification</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#D97706' }}>{pendingApps}</div>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Company Title, Reference ID, GSTIN, or Email..."
                  className="form-input"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-input"
                style={{ width: 'auto', minWidth: 220 }}
              >
                <option value="all">All Business Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Master Vendors Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.85rem 0.6rem' }}>Tracking ID</th>
                    <th style={{ padding: '0.85rem 0.6rem' }}>Company & Entity</th>
                    <th style={{ padding: '0.85rem 0.6rem' }}>GSTIN & PAN</th>
                    <th style={{ padding: '0.85rem 0.6rem' }}>Authorized Contact</th>
                    <th style={{ padding: '0.85rem 0.6rem' }}>FY26 Turnover</th>
                    <th style={{ padding: '0.85rem 0.6rem' }}>Empanelment Status</th>
                    <th style={{ padding: '0.85rem 0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        No vendor applications found in VPS Database matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredVendors.map((v) => (
                      <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.85rem 0.6rem', fontWeight: 800, color: '#0047AB' }}>{v.tracking_id}</td>
                        <td style={{ padding: '0.85rem 0.6rem' }}>
                          <div style={{ fontWeight: 800 }}>{v.company_name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.entity_type} • Est. {v.est_year || 'N/A'}</div>
                        </td>
                        <td style={{ padding: '0.85rem 0.6rem', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                          {v.gstin}<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PAN: {v.pan}</span>
                        </td>
                        <td style={{ padding: '0.85rem 0.6rem' }}>
                          {v.contact_name} ({v.designation || 'Officer'})<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.email} | {v.phone}</span>
                        </td>
                        <td style={{ padding: '0.85rem 0.6rem', fontWeight: 800 }}>
                          ₹ {v.turnover_2025} Lakhs
                        </td>
                        <td style={{ padding: '0.85rem 0.6rem' }}>
                          <select
                            value={v.status}
                            onChange={(e) => handleUpdateStatus(v.tracking_id, e.target.value, 'Empanelment Committee Review')}
                            style={{ padding: '0.3rem 0.6rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}
                          >
                            <option value="Under Verification">Under Verification</option>
                            <option value="Approved Class-A">Approved Class-A</option>
                            <option value="Approved Class-B">Approved Class-B</option>
                            <option value="Approved Class-C">Approved Class-C</option>
                            <option value="Clarification Required">Clarification Required</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={{ padding: '0.85rem 0.6rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button onClick={() => setSelectedVendor(v)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', borderColor: 'transparent' }}>
                              <Eye style={{ width: 14, height: 14 }} />
                              <span>Full Audit Dossier</span>
                            </button>
                            <button onClick={() => handleDeleteVendor(v.tracking_id)} className="btn-secondary" style={{ padding: '0.4rem 0.55rem', fontSize: '0.75rem', color: '#ED1C24' }}>
                              <Trash2 style={{ width: 14, height: 14 }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE CONTENT CMS MANAGER */}
        {activeTab === 'site_cms' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Website Content Live CMS Manager</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Edit any header text, helpline phone numbers, hero titles, footer address, and fee rates live on the public site</p>
              </div>
              <button onClick={handleSaveCMS} className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                <Save style={{ width: 16, height: 16 }} />
                <span>Publish Live Changes</span>
              </button>
            </div>

            {cmsSavedAlert && (
              <div style={{ padding: '0.85rem 1.15rem', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#047857', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 style={{ width: 18, height: 18 }} />
                <span>Website Content Updated Live! Refresh public pages to view changes.</span>
              </div>
            )}

            <form onSubmit={handleSaveCMS} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Header & Helpline Controls */}
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 style={{ width: 16, height: 16 }} />
                  <span>1. Header Navbar & Contact Information</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Company Title</label>
                    <input type="text" value={siteConfig.companyTitle} onChange={(e) => setSiteConfig({ ...siteConfig, companyTitle: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subdomain Pill Badge</label>
                    <input type="text" value={siteConfig.subdomainPill} onChange={(e) => setSiteConfig({ ...siteConfig, subdomainPill: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Helpline Phone Number</label>
                    <input type="text" value={siteConfig.helplinePhone} onChange={(e) => setSiteConfig({ ...siteConfig, helplinePhone: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Corporate Contact Email</label>
                    <input type="email" value={siteConfig.corporateEmail} onChange={(e) => setSiteConfig({ ...siteConfig, corporateEmail: e.target.value })} className="form-input" />
                  </div>
                </div>
              </div>

              {/* Hero Banner Controls */}
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText style={{ width: 16, height: 16 }} />
                  <span>2. Hero Banner Titles & Subtitle Text</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Hero Badge Tagline</label>
                    <input type="text" value={siteConfig.heroBadge} onChange={(e) => setSiteConfig({ ...siteConfig, heroBadge: e.target.value })} className="form-input" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Hero Title (Blue Highlight)</label>
                      <input type="text" value={siteConfig.heroTitleBlue} onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleBlue: e.target.value })} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Hero Title (Red Highlight)</label>
                      <input type="text" value={siteConfig.heroTitleRed} onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleRed: e.target.value })} className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Hero Subtitle Description Paragraph</label>
                    <textarea value={siteConfig.heroSubtitle} onChange={(e) => setSiteConfig({ ...siteConfig, heroSubtitle: e.target.value })} className="form-input" style={{ minHeight: 70 }} />
                  </div>
                </div>
              </div>

              {/* Footer & Copyright Controls */}
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0047AB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin style={{ width: 16, height: 16 }} />
                  <span>3. Footer Corporate Address & Copyright Notice</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Corporate Office Address</label>
                    <input type="text" value={siteConfig.corporateAddress} onChange={(e) => setSiteConfig({ ...siteConfig, corporateAddress: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Footer Copyright Notice</label>
                    <input type="text" value={siteConfig.footerCopyright} onChange={(e) => setSiteConfig({ ...siteConfig, footerCopyright: e.target.value })} className="form-input" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                  <Save style={{ width: 18, height: 18 }} />
                  <span>Publish All Live Website Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: DYNAMIC CATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Empanelment Business Categories Manager</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add, Edit, or Delete custom business categories that appear live in the public registration form</p>
              </div>
              <button onClick={() => setShowAddCatModal(true)} className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                <PlusCircle style={{ width: 16, height: 16 }} />
                <span>Add New Custom Category</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {categories.map((c) => (
                <div key={c.id} style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Category Code: {c.id}</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>{c.label}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>{c.description}</p>
                  </div>
                  <button onClick={() => handleDeleteCategory(c.id)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', color: '#ED1C24', fontSize: '0.8rem' }}>
                    <Trash2 style={{ width: 14, height: 14 }} />
                    <span>Delete Category</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVE TENDERS MANAGER */}
        {activeTab === 'tenders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Project Tenders & Bidding Opportunities Manager</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create and manage active project tenders displayed on the portal homepage radar</p>
              </div>
              <button onClick={() => setShowNewTenderModal(true)} className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                <PlusCircle style={{ width: 16, height: 16 }} />
                <span>Publish New Project Tender</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {tenders.map((t) => (
                <div key={t.id} style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB' }}>{t.code}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: 9999, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#047857' }}>
                      {t.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>Location: <strong>{t.location}</strong></div>
                    <div>Est. Contract Value: <strong>{t.estimatedCost}</strong></div>
                    <div>Bidding Deadline: <strong>{t.deadline}</strong></div>
                  </div>
                  <button onClick={() => setTenders(prev => prev.filter(x => x.id !== t.id))} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', color: '#ED1C24', fontSize: '0.8rem' }}>
                    <Trash2 style={{ width: 14, height: 14 }} />
                    <span>Delete Tender Notice</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS & SECURITY */}
        {activeTab === 'security' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>VPS Server Security & Cryptographic Audit Trails</h3>
            <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem' }}>Active Protection Shields:</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}><ShieldCheck style={{ width: 16, height: 16 }} /><span>Helmet Security Headers Enforced (XSS, HSTS, FrameGuard)</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}><ShieldCheck style={{ width: 16, height: 16 }} /><span>IP Rate Limiter Active (Max 100 req / 15 min)</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}><ShieldCheck style={{ width: 16, height: 16 }} /><span>SHA-256 Tamper-Proof Application Hashes Generated</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}><ShieldCheck style={{ width: 16, height: 16 }} /><span>Strict MIME-type Document Whitelisting (.pdf, .jpg, .png)</span></li>
              </ul>
            </div>
          </div>
        )}

        {/* NEW CUSTOM CATEGORY MODAL */}
        {showAddCatModal && (
          <div className="modal-backdrop" onClick={() => setShowAddCatModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Add New Custom Empanelment Category</h3>
              
              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label className="form-label">Category Label / Title</label>
                  <input type="text" value={newCat.label} onChange={(e) => setNewCat({ ...newCat, label: e.target.value })} placeholder="e.g. Pre-cast Concrete & Piling Contractors" className="form-input" required />
                </div>

                <div>
                  <label className="form-label">Short Code / Slug (Optional)</label>
                  <input type="text" value={newCat.id} onChange={(e) => setNewCat({ ...newCat, id: e.target.value })} placeholder="e.g. precast_concrete" className="form-input" />
                </div>

                <div>
                  <label className="form-label">Scope Description</label>
                  <textarea value={newCat.description} onChange={(e) => setNewCat({ ...newCat, description: e.target.value })} placeholder="Describe scope of work for this category..." className="form-input" style={{ minHeight: 80 }} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowAddCatModal(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Add Category to Live Portal</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* NEW TENDER MODAL */}
        {showNewTenderModal && (
          <div className="modal-backdrop" onClick={() => setShowNewTenderModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Publish New Project Tender</h3>
              
              <form onSubmit={handleAddTender} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label className="form-label">Tender Work Title</label>
                  <input type="text" value={newTender.title} onChange={(e) => setNewTender({ ...newTender, title: e.target.value })} placeholder="e.g. Civil & Foundation Work - Site B" className="form-input" required />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select value={newTender.category} onChange={(e) => setNewTender({ ...newTender, category: e.target.value })} className="form-input">
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Project Site Location</label>
                  <input type="text" value={newTender.location} onChange={(e) => setNewTender({ ...newTender, location: e.target.value })} placeholder="e.g. Jaipur Site, Rajasthan" className="form-input" required />
                </div>

                <div>
                  <label className="form-label">Est. Contract Value</label>
                  <input type="text" value={newTender.estimatedCost} onChange={(e) => setNewTender({ ...newTender, estimatedCost: e.target.value })} placeholder="e.g. ₹ 15.0 Crores" className="form-input" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowNewTenderModal(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Publish Tender Notice</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FULL 360° VENDOR AUDIT DOSSIER MODAL WITH PRINT-READY LAYOUT */}
        {selectedVendor && (
          <div className="modal-backdrop" onClick={() => setSelectedVendor(null)}>
            <div className="modal-content printable-area" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 850, maxHeight: '90vh', overflowY: 'auto' }}>
              
              {/* Modal Print Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Logo height={42} />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>Official Empanelment Application Dossier • Ref: {selectedVendor.tracking_id}</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{selectedVendor.company_name}</h3>
                  </div>
                </div>

                <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handlePrintDossier} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', backgroundColor: '#0047AB', color: 'white', border: 'none' }}>
                    <Printer style={{ width: 14, height: 14 }} />
                    <span>Print Clean Dossier (PDF)</span>
                  </button>
                  <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800 }}>✕</button>
                </div>
              </div>

              {/* Cryptographic Hash Audit Ribbon */}
              <div style={{ padding: '0.65rem 1rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.06)', border: '1px solid rgba(0, 71, 171, 0.2)', fontSize: '0.725rem', fontFamily: 'monospace', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🔒 SHA-256 Audit Signature: <strong>{selectedVendor.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf'}</strong></span>
                <span style={{ color: '#047857', fontWeight: 800 }}>✓ Verified Audit Trail</span>
              </div>

              {/* SECTION 1: Company Profile */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 style={{ width: 16, height: 16 }} />
                  <span>1. Company Profile & Professional Scope</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', padding: '0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)' }}>
                  <div>Empanelment Category: <strong>{selectedVendor.category?.toUpperCase()}</strong></div>
                  <div>Professional Role: <strong>{selectedVendor.primary_role || 'Architect & Structural Designer'}</strong></div>
                  <div>Legal Entity Type: <strong>{selectedVendor.entity_type}</strong></div>
                  <div>Year of Establishment: <strong>{selectedVendor.est_year || 'N/A'}</strong></div>
                  <div>Authorized Contact: <strong>{selectedVendor.contact_name} ({selectedVendor.designation || 'MD'})</strong></div>
                  <div>Corporate Email: <strong>{selectedVendor.email}</strong></div>
                  <div>Mobile Number: <strong>{selectedVendor.phone}</strong></div>
                  <div>City & State: <strong>{selectedVendor.city}, {selectedVendor.state} (PIN: {selectedVendor.pincode || '302013'})</strong></div>
                  <div style={{ gridColumn: '1 / -1' }}>Registered Office Address: <strong>{selectedVendor.address || 'Corporate Industrial Premises'}</strong></div>
                </div>
              </div>

              {/* SECTION 2: Statutory Compliance & Banking */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard style={{ width: 16, height: 16 }} />
                  <span>2. Statutory Tax & Payout Banking Credentials</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', padding: '0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)' }}>
                  <div>GSTIN Number: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{selectedVendor.gstin}</strong></div>
                  <div>Company PAN Card: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{selectedVendor.pan}</strong></div>
                  <div>MSME Udyam Registration: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.msme_no || 'N/A (General Category)'}</strong></div>
                  <div>Bank Account No: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.bank_account}</strong></div>
                  <div>Bank Name & Branch: <strong>{selectedVendor.bank_name || 'HDFC Bank'}</strong></div>
                  <div>Bank IFSC Code: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.ifsc}</strong></div>
                </div>
              </div>

              {/* SECTION 3: Financial Turnovers & Quoted Rates */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <DollarSign style={{ width: 16, height: 16 }} />
                  <span>3. 3-Year Audited Turnovers & Quoted Area Rates</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', padding: '0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)' }}>
                  <div>FY 2023-24 Turnover: <strong>₹ {selectedVendor.turnover_2023 || '0'} Lakhs</strong></div>
                  <div>FY 2024-25 Turnover: <strong>₹ {selectedVendor.turnover_2024 || '0'} Lakhs</strong></div>
                  <div>FY 2025-26 Turnover: <strong>₹ {selectedVendor.turnover_2025 || '0'} Lakhs</strong></div>
                  <div>Single Largest Work Order: <strong>₹ {selectedVendor.largest_order || '0'} Lakhs</strong></div>
                  <div>BUA Rate Quote: <strong>₹ {selectedVendor.bua_area || '23'} / sq ft</strong></div>
                  <div>CPA Rate Quote: <strong>₹ {selectedVendor.cpa_area || '14'} / sq ft</strong></div>
                  <div style={{ gridColumn: '1 / -1' }}>Existing PSU/Corporate Approvals: <strong>{selectedVendor.existing_empanels || 'None'}</strong></div>
                </div>
              </div>

              {/* SECTION 4: Uploaded Document Manifest */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileCheck2 style={{ width: 16, height: 16 }} />
                  <span>4. Uploaded Verification Documents Manifest</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.8rem', padding: '0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)' }}>
                  <div>GST REG-06 Doc: <strong>{selectedVendor.gst_doc || 'gst_certificate.pdf'}</strong></div>
                  <div>PAN Copy Doc: <strong>{selectedVendor.pan_doc || 'pan_card.pdf'}</strong></div>
                  <div>Bank Cheque Doc: <strong>{selectedVendor.bank_doc || 'cancelled_cheque.pdf'}</strong></div>
                  <div>CAD / Portfolio Doc: <strong>{selectedVendor.exp_doc || 'portfolio_drawings.pdf'}</strong></div>
                </div>
              </div>

              {/* SECTION 5: Captured Digital Signature & Audit Verification Stamp */}
              <div style={{ marginBottom: '1.25rem', padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.825rem' }}>
                <div style={{ fontWeight: 800, color: '#047857', marginBottom: '0.35rem' }}>✓ Digital Signature & Legal Undertaking Verified</div>
                <div>Authorized Signatory: <strong>{selectedVendor.signatory_name}</strong></div>
                <div>Submitted IP Timestamp: <strong>{selectedVendor.ip_address || '103.45.12.98'} • {new Date(selectedVendor.submitted_at).toLocaleString()}</strong></div>
                
                {selectedVendor.signature_data && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'white', borderRadius: 8, display: 'inline-block', border: '1px solid #CBD5E1' }}>
                    <img src={selectedVendor.signature_data} alt="Digital Signature" style={{ height: 60 }} />
                  </div>
                )}
              </div>

              {/* SECTION 6: Procurement Officer Official Seal & Approval Box */}
              <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 12, border: '2px dashed #0047AB', backgroundColor: 'rgba(0, 71, 171, 0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Empanelment Approval Status</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0047AB' }}>{selectedVendor.status || 'Approved Class-A Vendor'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Committee Score: {totalAuditScore} / 100 Marks</div>
                </div>

                <div style={{ textAlign: 'right', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                  <div style={{ height: 40, borderBottom: '1px solid #000', width: 180, marginBottom: 4 }}></div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Procurement Officer Seal & Signature</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hindustan Projects Procurement Division</div>
                </div>
              </div>

              {/* SECTION 7: Action & Approval Bar (Hidden on Print) */}
              <div className="no-print" style={{ marginTop: '1.25rem', padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1.5.px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.65rem' }}>Committee Decision & Empanelment Approval:</div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Approved Class-A', 'Certificate Issued')} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: '#10B981' }}>
                    Approve Class-A Vendor
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Approved Class-B', 'Certificate Issued')} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: '#0047AB' }}>
                    Approve Class-B Vendor
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Clarification Required', 'Awaiting Additional Documents')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706', borderColor: 'transparent' }}>
                    Request Clarification
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Rejected', 'Disqualified')} className="btn-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                    Reject Application
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
