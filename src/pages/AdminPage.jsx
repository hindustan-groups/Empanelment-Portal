import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, RefreshCw, LogOut, ShieldCheck, Search, Filter, 
  Download, Eye, CheckCircle2, XCircle, Clock, Trash2, Edit3, FileText, Check 
} from 'lucide-react';

export default function AdminPage({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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
          company_name: 'Apex Infrastructure & Engineering Pvt Ltd',
          category: 'civil',
          entity_type: 'Pvt Ltd',
          gstin: '07AAAAA0000A1Z5',
          pan: 'ABCDE1234F',
          contact_name: 'Rajesh Sharma',
          email: 'rajesh@apexinfra.com',
          phone: '+91 98765 43210',
          turnover_2025: '450',
          status: 'Under Verification',
          current_stage: 'Financial Committee Review',
          submitted_at: new Date().toISOString()
        },
        {
          id: 2,
          tracking_id: 'HP-EMP-930214',
          company_name: 'Hindustan Electro-Mechanical Services',
          category: 'mep',
          entity_type: 'Partnership',
          gstin: '08BBBBB1111B2Z9',
          pan: 'FGHIJ5678K',
          contact_name: 'Amit Agarwal',
          email: 'contact@hems.in',
          phone: '+91 98111 22233',
          turnover_2025: '180',
          status: 'Approved Class-B',
          current_stage: 'Empanelment Certificate Issued',
          submitted_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (trackingId, newStatus, newStage) => {
    setIsUpdatingStatus(true);
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
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteVendor = async (trackingId) => {
    if (!window.confirm(`Are you sure you want to delete application ${trackingId}?`)) return;

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
    const headers = ['Tracking ID', 'Company Name', 'Category', 'GSTIN', 'PAN', 'Contact Person', 'Email', 'Phone', 'FY26 Turnover (Lakhs)', 'Status'];
    const rows = vendors.map(v => [
      v.tracking_id,
      `"${v.company_name}"`,
      v.category,
      v.gstin,
      v.pan,
      `"${v.contact_name}"`,
      v.email,
      v.phone,
      v.turnover_2025,
      v.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HiPRO_Empanelment_Roster_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) return null;

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || v.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const totalApps = vendors.length;
  const approvedApps = vendors.filter(v => v.status?.includes('Approved')).length;
  const pendingApps = vendors.filter(v => v.status?.includes('Verification')).length;

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <Database style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Corporate Procurement Admin Dashboard</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hindustan Projects VPS Database • Interactive Controls</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleExportCSV} className="btn-secondary">
              <Download style={{ width: 16, height: 16, color: '#10B981' }} />
              <span>Export CSV</span>
            </button>
            <button onClick={fetchVendors} className="btn-secondary">
              <RefreshCw style={{ width: 16, height: 16 }} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button onClick={onLogout} className="btn-secondary" style={{ color: '#ED1C24', borderColor: 'rgba(237, 28, 36, 0.3)' }}>
              <LogOut style={{ width: 16, height: 16 }} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Total Applications</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0047AB' }}>{totalApps}</div>
          </div>

          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>Approved Vendors</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>{approvedApps}</div>
          </div>

          <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700 }}>Pending Review</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706' }}>{pendingApps}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Company, Reference ID, or GSTIN..."
              className="form-input"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-input"
            style={{ width: 'auto', minWidth: 200 }}
          >
            <option value="all">All Categories</option>
            <option value="civil">Civil Contractors</option>
            <option value="mep">MEP & Electrical</option>
            <option value="suppliers">Material Suppliers</option>
            <option value="consultants">Architects & Consultants</option>
          </select>
        </div>

        {/* Vendors Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 0.6rem' }}>Tracking ID</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Company Name</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>GSTIN / PAN</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Contact Officer</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Turnover (FY26)</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Status</th>
                <th style={{ padding: '0.75rem 0.6rem', textAlign: 'right' }}>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No vendor applications found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredVendors.map((v) => (
                  <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.6rem', fontWeight: 800, color: '#0047AB' }}>{v.tracking_id}</td>
                    <td style={{ padding: '0.75rem 0.6rem', fontWeight: 700 }}>{v.company_name}</td>
                    <td style={{ padding: '0.75rem 0.6rem', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                      {v.gstin}<br/>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PAN: {v.pan}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.6rem' }}>
                      {v.contact_name}<br/>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.email} | {v.phone}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.6rem', fontWeight: 700 }}>₹ {v.turnover_2025} Lakhs</td>
                    <td style={{ padding: '0.75rem 0.6rem' }}>
                      <select
                        value={v.status}
                        onChange={(e) => handleUpdateStatus(v.tracking_id, e.target.value, 'Empanelment Committee Audit')}
                        style={{ padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, border: '1px solid var(--border-color)' }}
                      >
                        <option value="Under Verification">Under Verification</option>
                        <option value="Approved Class-A">Approved Class-A</option>
                        <option value="Approved Class-B">Approved Class-B</option>
                        <option value="Approved Class-C">Approved Class-C</option>
                        <option value="Clarification Required">Clarification Required</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem 0.6rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button onClick={() => setSelectedVendor(v)} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                          <Eye style={{ width: 14, height: 14 }} />
                        </button>
                        <button onClick={() => handleDeleteVendor(v.tracking_id)} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#ED1C24' }}>
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

        {/* Detailed Application View Modal */}
        {selectedVendor && (
          <div className="modal-backdrop" onClick={() => setSelectedVendor(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 650 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047AB' }}>{selectedVendor.tracking_id}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedVendor.company_name}</h3>
                </div>
                <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div>Category: <strong>{selectedVendor.category}</strong></div>
                <div>Entity Type: <strong>{selectedVendor.entity_type}</strong></div>
                <div>GSTIN: <strong style={{ textTransform: 'uppercase' }}>{selectedVendor.gstin}</strong></div>
                <div>PAN: <strong style={{ textTransform: 'uppercase' }}>{selectedVendor.pan}</strong></div>
                <div>Contact: <strong>{selectedVendor.contact_name}</strong></div>
                <div>Email: <strong>{selectedVendor.email}</strong></div>
                <div>Phone: <strong>{selectedVendor.phone}</strong></div>
                <div>Turnover FY26: <strong>₹ {selectedVendor.turnover_2025} Lakhs</strong></div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Update Empanelment Status & Stage</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Approved Class-A', 'Certificate Issued')} className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', backgroundColor: '#10B981' }}>
                    Approve Class-A
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Approved Class-B', 'Certificate Issued')} className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', backgroundColor: '#0047AB' }}>
                    Approve Class-B
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedVendor.tracking_id, 'Rejected', 'Application Disqualified')} className="btn-accent" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
                    Reject Application
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button onClick={() => setSelectedVendor(null)} className="btn-secondary">Close View</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
