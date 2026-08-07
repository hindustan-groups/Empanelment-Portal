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
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 45 }}>
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.75rem 1.35rem',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, #0047AB 0%, #0F172A 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0, 71, 171, 0.4)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.85rem',
            transition: 'transform 0.2s ease'
          }}
          className="pulse-glow-blue"
        >
          <MessageSquare style={{ width: 18, height: 18, color: '#60A5FA' }} />
          <span>Procurement Helpdesk</span>
        </button>
      )}

      {/* Expanded Support Card */}
      {isOpen && (
        <div style={{
          width: 330,
          borderRadius: 22,
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #CBD5E1',
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease forwards'
        }}>
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
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 8, padding: 4 }}>
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Body Options */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
            
            <a
              href="tel:+917597000601"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textDecoration: 'none', color: '#0F172A', fontWeight: 700 }}
            >
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB' }}>
                <Phone style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>Helpline Phone</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB' }}>+91 7597000601</div>
              </div>
            </a>

            <a
              href="mailto:industrial@hindustanprojects.in"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textDecoration: 'none', color: '#0F172A', fontWeight: 700 }}
            >
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24' }}>
                <Mail style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>Official Email</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ED1C24' }}>industrial@hindustanprojects.in</div>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}>
              <div style={{ padding: '0.45rem', borderRadius: 8, backgroundColor: 'rgba(100, 116, 139, 0.1)', color: '#64748B' }}>
                <MapPin style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>Corporate HQ Address</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.3 }}>Bhopal Ganj, Bhilwara - 311001, Raj.</div>
              </div>
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.85rem', borderRadius: 12, backgroundColor: '#0047AB', textDecoration: 'none', color: '#FFFFFF', fontWeight: 800, marginTop: '0.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send style={{ width: 15, height: 15 }} />
                <span>Submit Online Support Ticket</span>
              </div>
              <ChevronRight style={{ width: 14, height: 14 }} />
            </Link>

            <Link
              to="/guidelines"
              onClick={() => setIsOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.1)', textDecoration: 'none', color: '#047857', fontWeight: 800 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle style={{ width: 15, height: 15 }} />
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
