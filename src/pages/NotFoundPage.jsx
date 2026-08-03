import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Home, Search, HelpCircle, ArrowLeft, ShieldAlert, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: 'var(--bg-card)'
    }}>
      <div style={{
        maxWidth: 580,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: '3rem 2.25rem',
        border: '1.5px solid #CBD5E1',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)',
        textAlign: 'center'
      }}>
        
        {/* Top 404 Icon Badge */}
        <div style={{
          width: 76,
          height: 76,
          borderRadius: 20,
          backgroundColor: 'rgba(237, 28, 36, 0.08)',
          color: '#ED1C24',
          border: '1.5px solid rgba(237, 28, 36, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 8px 20px rgba(237, 28, 36, 0.12)'
        }}>
          <ShieldAlert style={{ width: 38, height: 38 }} />
        </div>

        {/* 404 Tag */}
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 900,
          color: '#ED1C24',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.5rem'
        }}>
          ERROR 404 • PAGE NOT FOUND
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: '1.85rem',
          fontWeight: 900,
          color: '#0F172A',
          marginTop: 0,
          marginBottom: '0.75rem',
          lineHeight: 1.25
        }}>
          The Page You Are Looking For Does Not Exist
        </h1>

        {/* Subtitle / Explanation */}
        <p style={{
          fontSize: '0.875rem',
          color: '#64748B',
          lineHeight: 1.65,
          marginBottom: '2rem'
        }}>
          The requested URL was not found on <code>empanelment.hindustanprojects.in</code>. It may have been moved, deleted, or requires restricted corporate access permissions.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: 380,
          margin: '0 auto'
        }}>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem 1.5rem',
              fontSize: '0.9rem',
              borderRadius: 12
            }}
          >
            <Home style={{ width: 18, height: 18 }} />
            <span>Return to Home Page</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Link
              to="/track"
              className="btn-secondary"
              style={{
                justifyContent: 'center',
                padding: '0.65rem 1rem',
                fontSize: '0.825rem',
                borderRadius: 10
              }}
            >
              <Search style={{ width: 15, height: 15, color: '#0047AB' }} />
              <span>Track Status</span>
            </Link>

            <Link
              to="/contact"
              className="btn-secondary"
              style={{
                justifyContent: 'center',
                padding: '0.65rem 1rem',
                fontSize: '0.825rem',
                borderRadius: 10
              }}
            >
              <HelpCircle style={{ width: 15, height: 15, color: '#047857' }} />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid #F1F5F9',
          fontSize: '0.75rem',
          color: '#94A3B8',
          fontWeight: 600
        }}>
          Hindustan Projects • Official Procurement Portal (256-Bit SSL Encrypted)
        </div>

      </div>
    </div>
  );
}
