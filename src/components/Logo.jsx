import React from 'react';

export default function Logo({ className = '', height = 40, showText = true, darkBg = false, transparent = false, style = {} }) {
  return (
    <div
      className={`select-none ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        backgroundColor: transparent ? 'transparent' : (darkBg ? 'rgba(15, 23, 42, 0.6)' : '#FFFFFF'),
        padding: transparent ? '0' : '0.35rem 0.85rem',
        borderRadius: transparent ? 0 : 12,
        border: transparent ? 'none' : (darkBg ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0'),
        boxShadow: transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
        ...style
      }}
    >
      <img
        src="/hipro-logo.png"
        alt="HiPRO Hindustan Projects Logo"
        style={{ height: height, width: 'auto', objectFit: 'contain', display: 'block' }}
      />

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid #CBD5E1', paddingLeft: '0.65rem', textAlign: 'left' }}>
          <span style={{ fontSize: `${Math.max(12, height * 0.35)}px`, fontWeight: 900, color: darkBg ? '#F8FAFC' : '#0F172A', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            HINDUSTAN
          </span>
          <span style={{ fontSize: `${Math.max(10, height * 0.28)}px`, fontWeight: 800, color: '#ED1C24', letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            PROJECTS
          </span>
        </div>
      )}
    </div>
  );
}
