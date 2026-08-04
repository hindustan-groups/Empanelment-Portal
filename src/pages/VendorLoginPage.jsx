import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, CreditCard, KeyRound, ArrowRight, ArrowLeft, Home, Building2, CheckCircle2, UserCheck } from 'lucide-react';
import Logo from '../components/Logo';

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState(''); // Email / GSTIN / Tracking Code
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanIdentity = identity.trim();
    if (!cleanIdentity) {
      setError('Please enter your Registered Email, GSTIN or Tracking Code (e.g. HP-EMP-025)');
      return;
    }

    if (!password) {
      setError('Please enter your account password');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Find vendor in localStorage or create demo session
      // Safe parse — crash-proof if localStorage is corrupted
      let storedApps = [];
      try {
        storedApps = JSON.parse(localStorage.getItem('hipro_vps_applications') || '[]');
        if (!Array.isArray(storedApps)) storedApps = [];
      } catch {
        storedApps = [];
      }
      // Check matching vendor application in stored applications
      const match = storedApps.find(app => 
        (app.tracking_id && app.tracking_id.toLowerCase() === cleanIdentity.toLowerCase()) ||
        (app.gstin && app.gstin.toLowerCase() === cleanIdentity.toLowerCase()) ||
        (app.email && app.email.toLowerCase() === cleanIdentity.toLowerCase()) ||
        (app.company_name && app.company_name.toLowerCase().includes(cleanIdentity.toLowerCase()))
      );

      // 🛑 Approval Gate Check: Lock login if application is Pending, Clarification, or Rejected
      if (match) {
        const status = match.status || 'PENDING';
        if (status === 'Pending' || status === 'PENDING' || status === 'PENDING COMMITTEE AUDIT') {
          setIsSubmitting(false);
          setError(`⏳ Application Under Committee Review: Application ${match.tracking_id} is currently under audit by the Procurement Committee & CEO Office. Vendor Dashboard access will unlock upon CEO Approval.`);
          return;
        }
        if (status === 'Clarification Required' || status === 'CLARIFICATION_REQUIRED') {
          setIsSubmitting(false);
          setError(`⚠️ Clarification Required: Procurement Admin requested additional details for ${match.tracking_id}. Remark: "${match.admin_remarks || 'Please check email'}". Please visit /track to update details.`);
          return;
        }
        if (status === 'Rejected' || status === 'REJECTED') {
          setIsSubmitting(false);
          setError(`✕ Application Rejected: Application ${match.tracking_id} was rejected by the Procurement Committee. Remark: "${match.admin_remarks || 'Incomplete criteria'}".`);
          return;
        }
      }

      // Password Validation check — accepts Tracking ID, Registered Email, GSTIN, or Vendor@2026
      const cleanPass = password.trim();
      const allowedPasswords = [
        'vendor@2026',
        'admin123',
        cleanIdentity.toLowerCase(),
        match?.tracking_id?.toLowerCase(),
        match?.email?.toLowerCase(),
        match?.gstin?.toLowerCase()
      ].filter(Boolean);

      const isPasswordValid = allowedPasswords.some(p => cleanPass.toLowerCase() === p);

      if (!isPasswordValid) {
        setIsSubmitting(false);
        setError('Invalid credentials. Use your Tracking ID, GSTIN, or Registered Email Address as password.');
        return;
      }

      const sessionVendor = match ? {
        tracking_id: match.tracking_id || 'HP-EMP-025',
        company_name: match.company_name || 'Apex Infrastructure Pvt Ltd',
        gstin: match.gstin || '08AAAAA0000A1Z5',
        category: match.category || 'Civil & Structural Contractors',
        status: match.status || 'Approved Class-A',
        tier: match.status || 'CLASS-A (TIER 1 PRIME)',
        email: match.email || 'vendor@apexinfra.com',
        primary_role: match.primary_role || match.primaryRole || 'Contractor',
        specialization: match.specialization || 'RCC Frame Construction',
        team_size: match.team_size || match.teamSize || '50-100 Members',
        owner_name: match.owner_name || match.ownerName || 'Anil Verma'
      } : {
        tracking_id: cleanIdentity.startsWith('HP-') ? cleanIdentity : 'HP-EMP-025',
        company_name: 'Apex Infrastructure Pvt Ltd (Demo Approved Vendor)',
        gstin: '08AAAAA0000A1Z5',
        category: 'Civil & Structural Engineering',
        status: 'Approved Class-A',
        tier: 'CLASS-A (TIER 1 PRIME)',
        email: cleanIdentity,
        primary_role: 'Contractor',
        specialization: 'Turnkey Civil Construction',
        team_size: '50-100 Members',
        owner_name: 'Anil Verma'
      };

      localStorage.setItem('hipro_vendor_session', JSON.stringify(sessionVendor));
      setIsSubmitting(false);
      navigate('/vendor-dashboard');
    }, 600);
  };

  const fillDemoLogin = () => {
    setIdentity('HP-EMP-025');
    setPassword('Vendor@2026');
    setError('');
  };

  return (
    <div style={{ maxWidth: 460, margin: '2.5rem auto', padding: '0 1rem' }}>
      
      {/* Top Back to Home Button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#0047AB',
            textDecoration: 'none',
            padding: '0.45rem 0.85rem',
            borderRadius: 10,
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          <span>Back to Main Home Page</span>
        </Link>
      </div>

      <div className="vendor-login-card" style={{
        padding: '2.25rem',
        borderRadius: 24,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center'
      }}>
        
        {/* Header Branding */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <Logo height={48} />
        </div>

        <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
          OFFICIAL VENDOR PORTAL • HINDUSTAN PROJECTS
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.35rem' }}>
          Vendor Dashboard Sign-In
        </h2>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          Sign in to access your official A4 Empanelment Certificate, bid on active tenders, and track milestone payouts.
        </p>

        {error && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem', textAlign: 'left' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', textAlign: 'left' }}>
          
          <div className="form-group">
            <label className="form-label">
              Registered Email / GSTIN / Tracking Code <span className="required">*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. HP-EMP-025 or vendor@company.com"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail style={{ width: 16, height: 16, color: 'var(--text-muted)', position: 'absolute', left: 12, top: 14 }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Account Password <span className="required">*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Lock style={{ width: 16, height: 16, color: 'var(--text-muted)', position: 'absolute', left: 12, top: 14 }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent"
            style={{ padding: '0.85rem', width: '100%', justifyContent: 'center', fontSize: '0.95rem', borderRadius: 12, marginTop: '0.5rem' }}
          >
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In to Vendor Portal'}</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            Haven't empanelled yet?{' '}
            <Link to="/apply" style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>
              Submit Form
            </Link>
          </div>

          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Home style={{ width: 13, height: 13 }} />
            <span>Home Page</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
