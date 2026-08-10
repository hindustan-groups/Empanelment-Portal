import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Lock } from 'lucide-react';

export default function SecurityCaptcha({ onCaptchaVerify, onVerify }) {
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const notifyVerify = (status) => {
    if (typeof onCaptchaVerify === 'function') onCaptchaVerify(status);
    if (typeof onVerify === 'function') onVerify(status);
  };

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 12) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsVerified(false);
    setError(false);
    notifyVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (val) => {
    setUserAnswer(val);
    const expected = num1 + num2;
    if (parseInt(val, 10) === expected) {
      setIsVerified(true);
      setError(false);
      notifyVerify(true);
    } else {
      setIsVerified(false);
      notifyVerify(false);
    }
  };

  return (
    <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 800 }}>
          <Lock style={{ width: 16, height: 16, color: '#0047AB' }} />
          <span>Anti-Bot Security Challenge</span>
        </div>
        <button type="button" onClick={generateCaptcha} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <RefreshCw style={{ width: 14, height: 14 }} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ padding: '0.5rem 0.85rem', borderRadius: 8, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {num1} + {num2} = ?
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter Answer"
          className="form-input"
          style={{ width: '120px', minWidth: '100px', flex: '1 1 100px', fontSize: '1rem', fontWeight: 800, textAlign: 'center' }}
        />

        {isVerified && (
          <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
            <ShieldCheck style={{ width: 18, height: 18, flexShrink: 0 }} />
            <span>Human Verified</span>
          </span>
        )}
      </div>

    </div>
  );
}
