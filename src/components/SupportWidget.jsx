import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, X, HelpCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState({
    helplinePhone: '+91 (011) 4500 8899 / 900',
    corporateEmail: 'empanelment@hindustanprojects.in',
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('hipro_site_config');
    if (saved) {
      try {
        setSiteConfig(JSON.parse(saved));
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 45 }}>
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, #0047AB 0%, #002B66 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 24px rgba(0, 71, 171, 0.35)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.85rem',
            transition: 'transform 0.2s ease'
          }}
          className="pulse-glow-blue"
        >
          <MessageSquare style={{ width: 18, height: 18 }} />
          <span>Procurement Helpdesk</span>
        </button>
      )}

      {/* Expanded Support Card */}
      {isOpen && (
        <div style={{
          width: 320,
          borderRadius: 20,
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease forwards'
        }}>
          {/* Top Banner */}
          <div style={{ padding: '1rem 1.25rem', background: 'linear-gradient(135deg, #0047AB 0%, #0F172A 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck style={{ width: 18, height: 18, color: '#10B981' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Vendor Support Team</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Hindustan Projects Procurement</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Body Options */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
            <a
              href={`tel:${(siteConfig.helplinePhone || '').replace(/\D/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}
            >
              <div style={{ padding: '0.4rem', borderRadius: 6, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
                <Phone style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Helpline Phone</div>
                <div>{siteConfig.helplinePhone || '+91 (011) 4500 8899'}</div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.corporateEmail || 'empanelment@hindustanprojects.in'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: 10, backgroundColor: 'var(--bg-surface)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}
            >
              <div style={{ padding: '0.4rem', borderRadius: 6, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
                <Mail style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Email</div>
                <div>{siteConfig.corporateEmail || 'empanelment@hindustanprojects.in'}</div>
              </div>
            </a>

            <Link
              to="/guidelines"
              onClick={() => setIsOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: 10, backgroundColor: 'rgba(16, 185, 129, 0.1)', textDecoration: 'none', color: '#047857', fontWeight: 700 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle style={{ width: 16, height: 16 }} />
                <span>Empanelment Policy Guide</span>
              </div>
              <ChevronRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
