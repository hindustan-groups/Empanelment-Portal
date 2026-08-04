import React from 'react';

export default function Logo({ className = '', height = 44, showText = true, darkBg = false }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      <div style={{
        padding: darkBg ? '0.2rem 0.5rem' : '0',
        borderRadius: darkBg ? 8 : 0,
        backgroundColor: darkBg ? '#FFFFFF' : 'transparent',
        display: 'inline-flex',
        alignItems: 'center'
      }}>
        <img
          src="/hipro-logo.png"
          alt="HiPRO Hindustan Projects Logo"
          style={{ height: height, width: 'auto', objectFit: 'contain', mixBlendMode: darkBg ? 'normal' : 'multiply' }}
        />
      </div>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid #CBD5E1', paddingLeft: '0.65rem' }}>
          <span style={{ fontSize: `${Math.max(12, height * 0.35)}px`, fontWeight: 900, color: darkBg ? '#FFFFFF' : '#0F172A', letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            HINDUSTAN
          </span>
          <span style={{ fontSize: `${Math.max(10, height * 0.28)}px`, fontWeight: 800, color: '#ED1C24', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            PROJECTS
          </span>
        </div>
      )}
    </div>
  );
}
