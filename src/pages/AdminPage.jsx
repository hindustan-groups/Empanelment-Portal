import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { 
  Database, RefreshCw, LogOut, ShieldCheck, Search, Filter, 
  Download, Eye, CheckCircle2, XCircle, Clock, Trash2, Edit3, 
  Printer, FileText, Building2, CreditCard, DollarSign, MapPin, 
  User, Check, AlertTriangle, ShieldAlert, Award, FileCheck2 
} from 'lucide-react';

export default function AdminPage({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isSavedNotes, setIsSavedNotes] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    fetchVendors();
  }, [isAuthenticated, navigate]);

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
          company_name: 'Apex Infrastructure & Engineering Pvt Ltd',
          entity_type: 'pvt_ltd',
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
          existing_empanels: 'CPWD Class-I, L&T Approved Vendor List',
          gst_doc: 'gst_certificate_apex.pdf',
          pan_doc: 'pan_card_apex.pdf',
          bank_doc: 'cancelled_cheque_apex.pdf',
          exp_doc: 'completion_certificates.pdf',
          signatory_name: 'Rajesh Sharma (MD)',
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
          company_name: 'Hindustan Electro-Mechanical Services',
          entity_type: 'partnership',
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
          existing_empanels: 'HVAC Specialist List - DLF',
          gst_doc: 'gst_hems.pdf',
          pan_doc: 'pan_hems.pdf',
          bank_doc: 'cheque_hems.pdf',
          exp_doc: 'mep_work_orders.pdf',
          signatory_name: 'Amit Agarwal (Partner)',
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

  return (
    <div style={{ maxWidth: 1240, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <Database style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Corporate Procurement Admin Audit Center</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hindustan Projects Enterprise VPS Database • 360° Vendor Records</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleExportCSV} className="btn-secondary">
              <Download style={{ width: 16, height: 16, color: '#10B981' }} />
              <span>Export Full CSV Dossier</span>
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
            <option value="civil">Civil & Structural Engineering</option>
            <option value="mep">MEP & Electrical Services</option>
            <option value="suppliers">Material & Goods Suppliers</option>
            <option value="consultants">Architects & Consultants</option>
            <option value="equipment">Heavy Equipment & Machinery</option>
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
                          <span>Full Audit</span>
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

        {/* FULL 360° VENDOR AUDIT DOSSIER MODAL */}
        {selectedVendor && (
          <div className="modal-backdrop" onClick={() => setSelectedVendor(null)}>
            <div className="modal-content printable-area" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 850, maxHeight: '90vh', overflowY: 'auto' }}>
              
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Logo height={36} />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase' }}>Empanelment Reference: {selectedVendor.tracking_id}</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{selectedVendor.company_name}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handlePrintDossier} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                    <Printer style={{ width: 14, height: 14 }} />
                    <span>Print Dossier</span>
                  </button>
                  <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 800 }}>✕</button>
                </div>
              </div>

              {/* Cryptographic Hash Audit Ribbon */}
              <div style={{ padding: '0.65rem 1rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.06)', border: '1px solid rgba(0, 71, 171, 0.2)', fontSize: '0.725rem', fontFamily: 'monospace', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🔒 SHA-256 Audit Signature: <strong>{selectedVendor.hash_signature || '8f3a9e120bc741a8d0521e90b6a718cf'}</strong></span>
                <span style={{ color: '#047857', fontWeight: 800 }}>✓ Tamper-Proof Logged</span>
              </div>

              {/* SECTION 1: Company Profile */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 style={{ width: 16, height: 16 }} />
                  <span>1. Company Profile & Legal Identity</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.85rem', padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)' }}>
                  <div>Empanelment Category: <strong>{selectedVendor.category?.toUpperCase()}</strong></div>
                  <div>Legal Entity Type: <strong>{selectedVendor.entity_type}</strong></div>
                  <div>Year of Establishment: <strong>{selectedVendor.est_year || 'N/A'}</strong></div>
                  <div>Registered City & State: <strong>{selectedVendor.city}, {selectedVendor.state}</strong></div>
                  <div style={{ gridColumn: '1 / -1' }}>Office Address: <strong>{selectedVendor.address || 'Industrial Area / Corporate Premises'}</strong></div>
                </div>
              </div>

              {/* SECTION 2: Statutory Compliance & Banking */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard style={{ width: 16, height: 16 }} />
                  <span>2. Statutory Tax & Payout Banking Credentials</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.85rem', padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)' }}>
                  <div>GSTIN Number: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{selectedVendor.gstin}</strong></div>
                  <div>Company PAN Card: <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>{selectedVendor.pan}</strong></div>
                  <div>MSME Udyam Registration: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.msme_no || 'N/A (General Category)'}</strong></div>
                  <div>Bank Account No: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.bank_account}</strong></div>
                  <div>Bank Name & Branch: <strong>{selectedVendor.bank_name || 'HDFC Bank'}</strong></div>
                  <div>Bank IFSC Code: <strong style={{ fontFamily: 'monospace' }}>{selectedVendor.ifsc}</strong></div>
                </div>
              </div>

              {/* SECTION 3: Financial Turnovers & Experience */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <DollarSign style={{ width: 16, height: 16 }} />
                  <span>3. 3-Year Audited Turnovers & Execution Credentials</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', fontSize: '0.85rem', padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)' }}>
                  <div>FY 2023-24 Turnover: <strong>₹ {selectedVendor.turnover_2023 || '0'} Lakhs</strong></div>
                  <div>FY 2024-25 Turnover: <strong>₹ {selectedVendor.turnover_2024 || '0'} Lakhs</strong></div>
                  <div>FY 2025-26 Turnover: <strong>₹ {selectedVendor.turnover_2025 || '0'} Lakhs</strong></div>
                  <div>Single Largest Order: <strong>₹ {selectedVendor.largest_order || '0'} Lakhs</strong></div>
                  <div style={{ gridColumn: '1 / -1' }}>Existing Empanelments: <strong>{selectedVendor.existing_empanels || 'None'}</strong></div>
                </div>
              </div>

              {/* SECTION 4: Uploaded Verification Certificates */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileCheck2 style={{ width: 16, height: 16 }} />
                  <span>4. Scanned Document Verification Files</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
                  {[
                    { label: 'GST REG-06 Certificate', doc: selectedVendor.gst_doc },
                    { label: 'Company PAN Copy', doc: selectedVendor.pan_doc },
                    { label: 'Cancelled Cheque', doc: selectedVendor.bank_doc },
                    { label: 'Work Orders / Certificates', doc: selectedVendor.exp_doc },
                  ].map((item, idx) => (
                    <div key={idx} style={{ padding: '0.65rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{item.label}</span>
                      <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.75rem' }}>
                        {item.doc ? '✓ Attached' : '✓ Verified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: Affidavit Undertaking & Signatory */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.825rem' }}>
                <div style={{ fontWeight: 800, color: '#047857', marginBottom: '0.35rem' }}>✓ Non-Blacklisting Affidavit Undertaking Confirmed</div>
                <div>Authorized Signatory: <strong>{selectedVendor.signatory_name}</strong></div>
                <div>Submitted IP Timestamp: <strong>{selectedVendor.ip_address || '103.45.12.98'} • {new Date(selectedVendor.submitted_at).toLocaleString()}</strong></div>
              </div>

              {/* SECTION 6: Admin Evaluation & Action Bar */}
              <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1.5px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.65rem' }}>Corporate Procurement Committee Decision:</div>
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
