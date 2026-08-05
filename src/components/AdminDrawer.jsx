import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Database, Download, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function AdminDrawer({ isOpen, onClose }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchVendors();
    }
  }, [isOpen]);

  const fetchVendors = async () => {
    setLoading(true);
    const backendUrl = API_BASE_URL;

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/admin/applications`);
      const data = await response.json();
      if (data.success) {
        setVendors(data.data || []);
      }
    } catch (err) {
      console.warn('Backend connection pending:', err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 850, maxHeight: '88vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <X style={{ width: 20, height: 20 }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
              <Database style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Hindustan Projects Procurement Records</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VPS SQLite Database • Live Applications Panel</p>
            </div>
          </div>

          <button onClick={fetchVendors} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
            <RefreshCw style={{ width: 14, height: 14 }} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {vendors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No vendor applications submitted yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Reference ID</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Company Name</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Category</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>GSTIN</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Contact</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 800, color: '#0047AB' }}>{v.tracking_id}</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>{v.company_name}</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-muted)' }}>{v.category}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textTransform: 'uppercase', fontFamily: 'monospace' }}>{v.gstin}</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{v.contact_name}<br/><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v.phone}</span></td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
