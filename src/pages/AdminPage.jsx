import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Download, Search, CheckCircle, Clock, ShieldCheck, Filter } from 'lucide-react';

export default function AdminPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/admin/applications`);
      const data = await response.json();
      if (data.success) {
        setVendors(data.data || []);
      }
    } catch (err) {
      setVendors([
        {
          id: 1,
          tracking_id: 'HP-EMP-849201',
          company_name: 'Apex Infrastructure & Engineering Pvt Ltd',
          category: 'civil',
          entity_type: 'pvt_ltd',
          gstin: '07AAAAA0000A1Z5',
          pan: 'ABCDE1234F',
          contact_name: 'Rajesh Sharma',
          email: 'rajesh@apexinfra.com',
          phone: '+91 98765 43210',
          turnover_2025: '450',
          status: 'Under Verification',
          submitted_at: new Date().toISOString()
        },
        {
          id: 2,
          tracking_id: 'HP-EMP-930214',
          company_name: 'Hindustan Electro-Mechanical Services',
          category: 'mep',
          entity_type: 'partnership',
          gstin: '08BBBBB1111B2Z9',
          pan: 'FGHIJ5678K',
          contact_name: 'Amit Agarwal',
          email: 'contact@hems.in',
          phone: '+91 98111 22233',
          turnover_2025: '180',
          status: 'Approved Class-B',
          submitted_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || v.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ maxWidth: 1150, margin: '2rem auto 4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 12, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <Database style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Corporate Procurement Admin Dashboard</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hindustan Projects VPS Database • Vendor Verification Portal</p>
            </div>
          </div>

          <button onClick={fetchVendors} className="btn-secondary">
            <RefreshCw style={{ width: 16, height: 16 }} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Database</span>
          </button>
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
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
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
                      <span style={{ padding: '0.25rem 0.65rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 800, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
