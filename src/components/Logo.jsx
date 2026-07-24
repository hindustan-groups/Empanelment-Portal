import React from 'react';

export default function Logo({ className = '', height = 44 }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="flex items-baseline font-black tracking-tight" style={{ fontSize: `${height * 0.75}px`, lineHeight: 1 }}>
        <span style={{ color: '#ED1C24', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          H<span style={{ fontSize: '0.85em' }}>i</span>
        </span>
        <span style={{ color: '#0047AB', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif', marginLeft: '-2px' }}>
          PRO
        </span>
      </div>
      <div className="hidden sm:flex flex-col border-l border-slate-300 dark:border-slate-700 pl-3">
        <span className="text-xs font-black tracking-widest uppercase text-slate-800 dark:text-slate-100" style={{ letterSpacing: '0.18em' }}>
          HINDUSTAN
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400" style={{ letterSpacing: '0.22em' }}>
          PROJECTS
        </span>
      </div>
    </div>
  );
}
