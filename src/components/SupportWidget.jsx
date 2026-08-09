import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, X, HelpCircle, ChevronRight, ShieldCheck, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState({
    helplinePhone: '+91 7597000601',
    corporateEmail: 'industrial@hindustanprojects.in',
    corporateAddress: 'Bhopal Ganj, Bhilwara - 311001, Rajasthan'
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('hipro_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.helplinePhone && parsed.helplinePhone.includes('4500')) {
          delete parsed.helplinePhone;
        }
        setSiteConfig(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  return (
    <div className="support-widget-wrapper">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="support-fab-btn pulse-glow-blue"
          title="Procurement & Empanelment Helpdesk"
          aria-label="Open Helpdesk Support"
        >
          <div className="support-fab-icon-wrap">
            <MessageSquare style={{ width: 18, height: 18 }} />
            <span className="support-fab-dot" />
          </div>
          <span className="support-fab-label">Procurement Helpdesk</span>
        </button>
      )}

      {/* Expanded Support Card */}
      {isOpen && (
        <div className="support-widget-modal">
          {/* Top Banner */}
          <div style={{ padding: '1.15rem 1.25rem', background: 'linear-gradient(135deg, #0F172A 0%, #002B66 60%, #0047AB 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.01em' }}>Vendor Support Cell</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600 }}>Hindustan Projects Corporate HQ</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 8, padding: '4px 6px' }}>
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Body Options */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
            
            <a
              href={`tel:${siteConfig.helplinePhone || '+917597000601'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700 }}
            >
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
                <Phone style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Helpline Phone</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB' }}>{siteConfig.helplinePhone || '+91 7597000601'}</div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.corporateEmail || 'industrial@hindustanprojects.in'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700 }}
            >
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
                <Mail style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Corporate Email</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 900, color: '#ED1C24' }}>{siteConfig.corporateEmail || 'industrial@hindustanprojects.in'}</div>
              </div>
            </a>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700 }}
            >
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                <Send style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Submit Inquiry Ticket</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 800 }}>Fast-Track Helpdesk Form</div>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            </Link>

            <div style={{ padding: '0.65rem 0.75rem', borderRadius: 10, backgroundColor: 'rgba(0, 71, 171, 0.04)', border: '1px solid rgba(0, 71, 171, 0.15)', fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <MapPin style={{ width: 14, height: 14, color: '#0047AB', flexShrink: 0, marginTop: 1 }} />
              <span>HQ: {siteConfig.corporateAddress || 'Bhopal Ganj, Bhilwara - 311001, Rajasthan'}</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
