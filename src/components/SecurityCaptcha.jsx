import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Lock } from 'lucide-react';

export default function SecurityCaptcha({ onCaptchaVerify }) {
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 12) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsVerified(false);
    setError(false);
    onCaptchaVerify(false);
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
      onCaptchaVerify(true);
    } else {
      setIsVerified(false);
      onCaptchaVerify(false);
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ padding: '0.5rem 1rem', borderRadius: 8, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
          {num1} + {num2} = ?
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter Answer"
          className="form-input"
          style={{ width: 140, fontSize: '1rem', fontWeight: 800, textAlign: 'center' }}
        />

        {isVerified && (
          <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck style={{ width: 18, height: 18 }} />
            <span>Human Verified</span>
          </span>
        )}
      </div>

    </div>
  );
}
