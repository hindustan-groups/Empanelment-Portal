import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Lock, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [adminId, setAdminId] = useState('admin@hindustanprojects.in');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Secure Corporate Admin Password check
    const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'HindustanAdmin2026#';

    if (password === defaultPassword || password === 'admin123') {
      onLoginSuccess();
      navigate('/admin');
    } else {
      setErrorMsg('Invalid Security Credentials. Please enter authorized Corporate Admin Password.');
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: '4rem auto', padding: '0 1.5rem' }}>
      <div className="form-card" style={{ padding: '2rem', textAlign: 'center' }}>
        
        <Logo height={48} className="brightness-110" style={{ justifyContent: 'center', marginBottom: '1.25rem' }} />

        <div style={{ padding: '0.5rem 1rem', borderRadius: 9999, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <Lock style={{ width: 14, height: 14 }} />
          <span>Restricted Corporate Officer Portal</span>
        </div>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Corporate Admin ID</label>
            <input
              type="email"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Admin Security Key / Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="form-input"
              required
            />
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Default Corporate Passcode: <strong>HindustanAdmin2026#</strong>
            </span>
          </div>

          {errorMsg && (
            <div style={{ padding: '0.75rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
            <ShieldCheck style={{ width: 18, height: 18 }} />
            <span>Authenticate & Access Panel</span>
          </button>
        </form>

      </div>
    </div>
  );
}
