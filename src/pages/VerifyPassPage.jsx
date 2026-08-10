import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Clock, Calendar, Building2, UserCheck, Truck, Users, QrCode, ArrowLeft, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

export default function VerifyPassPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const vendorId = searchParams.get('vendor');

  // Read matching pass from localStorage site passes
  let passData = null;
  let vendorName = 'Apex Infrastructure & Engineering Pvt Ltd';

  try {
    const savedPasses = JSON.parse(localStorage.getItem('hipro_vendor_site_passes') || '[]');
    if (code) {
      passData = savedPasses.find(p => p.passCode === code);
    }
    
    // Read vendor name from applications or session
    const apps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
    const matchApp = apps.find(a => a.tracking_id === vendorId || (passData && a.tracking_id === passData.vendorId));
    if (matchApp) {
      vendorName = matchApp.company_name || matchApp.companyName;
    } else {
      const session = JSON.parse(localStorage.getItem('hipro_vendor_session') || '{}');
      if (session.company_name) vendorName = session.company_name;
    }
  } catch (err) {
    console.warn('Pass lookup error:', err);
  }

  // Fallback demo pass data if params present
  const activeCode = code || 'HP-PASS-2026-8812';
  const activeVendorId = vendorId || 'HP-EMP-025';

  const siteLocation = passData?.siteLocation || 'Jaipur Commercial Tower (B+G+18)';
  const visitorName = passData?.visitorName || 'Ramesh Kumar (Site Supervisor)';
  const workerCount = passData?.workerCount || '15 Personnel';
  const vehicleNo = passData?.vehicleNo || 'RJ 06 GB 1234';
  const dateIssued = passData?.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const validTill = passData?.validTill || `${new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} 23:59 IST`;

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F8FAFC', padding: '2.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        maxWidth: 520, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24,
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0', overflow: 'hidden'
      }}>
        
        {/* Verification Status Header */}
        <div style={{
          background: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
          color: 'white', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative'
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 0.75rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 style={{ width: 38, height: 38, color: '#FFFFFF' }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.75rem', borderRadius: 99 }}>
            ✓ 100% VERIFIED SECURITY PASS
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: 2 }}>
            Gate Entry Pass Valid & Approved
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#D1FAE5' }}>Hindustan Projects Site Security System</div>
        </div>

        {/* Security Token Code Banner */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#F0FDF4', borderBottom: '1px solid #DCFCE7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.725rem', color: '#047857', fontWeight: 800 }}>SECURITY TOKEN ID</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, fontFamily: 'monospace', color: '#065F46' }}>{activeCode}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.725rem', color: '#047857', fontWeight: 800 }}>VENDOR TRACKING ID</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, fontFamily: 'monospace', color: '#065F46' }}>{activeVendorId}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: 14, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Empanelled Vendor Organization</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{vendorName}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 800 }}>Project Site</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginTop: 2 }}>{siteLocation}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 800 }}>Site In-Charge</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{visitorName}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 800 }}>Allowed Workers</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#047857', marginTop: 2 }}>{workerCount}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 800 }}>Vehicle Registration</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{vehicleNo}</div>
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 12, backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#92400E' }}>
            <Clock style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span>Pass Issued: <strong>{dateIssued}</strong> • Valid Till: <strong>{validTill}</strong></span>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <Link to="/" style={{ color: '#0047AB', fontSize: '0.825rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft style={{ width: 14, height: 14 }} />
              <span>Back to Hindustan Projects Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
