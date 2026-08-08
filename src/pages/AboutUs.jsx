import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Compass, Target, HardHat, Cpu } from 'lucide-react';

export default function AboutUs() {
  let siteConfig = {};
  try {
    siteConfig = JSON.parse(localStorage.getItem('hipro_site_config') || '{}');
  } catch (e) {}

  const aboutHeroTitle = siteConfig.aboutHeroTitle || 'Building Infrastructure, Architecture & Engineering Excellence Across India';
  const aboutHeroSubtitle = siteConfig.aboutHeroSubtitle || 'Hindustan Projects is a premier multi-disciplinary conglomerate specializing in Large-scale Infrastructure Execution, Architectural Design, Civil Construction, MEP/HVAC Contracting, and Integrated Digital Solutions.';

  return (
    <div className="about-page-container">
      
      {/* Hero Banner */}
      <div className="about-hero-box">
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.35rem 0.95rem', borderRadius: 99,
            backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.8rem', fontWeight: 800, color: '#60A5FA', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem'
          }}>
            <Building2 style={{ width: 15, height: 15 }} />
            Official Corporate Overview • Hindustan Projects
          </span>

          <h1 className="about-hero-title">
            {aboutHeroTitle}
          </h1>

          <p className="about-hero-subtitle">
            {aboutHeroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-accent" style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', borderRadius: 12 }}>
              <span>Empanel Your Firm Now</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>

            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.6rem', fontSize: '0.9rem', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span>Contact Headquarters</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Divisions Grid */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0047AB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Our Specializations
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
            Core Business Divisions
          </h2>
        </div>

        <div className="about-grid-divisions">
          
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(0,71,171,0.08)', color: '#0047AB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <HardHat style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              Civil & Structural Contracting
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              Turnkey execution of commercial complexes, industrial parks, residential developments, highways, bridges, and foundation engineering.
            </p>
          </div>

          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(237,28,36,0.08)', color: '#ED1C24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Compass style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              Architecture & Design Consultancy
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              Master planning, 3D architectural modeling, structural audits, interior space planning, and green building sustainability engineering.
            </p>
          </div>

          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.08)', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Building2 style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              MEP & Electrical Services
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              High-voltage electrical grids, HVAC climate control, plumbing networks, fire safety systems, and automated building management systems (BMS).
            </p>
          </div>

          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(124,58,237,0.08)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Cpu style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              Digital Solutions & Marketing
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              Enterprise software development, digital branding, project marketing, smart IoT site monitoring, and cloud-based procurement systems.
            </p>
          </div>

        </div>
      </div>

      {/* Vendor Empanelment Philosophy */}
      <div style={{ backgroundColor: '#F8FAFC', padding: '2.5rem', borderRadius: 24, border: '1px solid #E2E8F0', marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ED1C24', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Vendor Engagement Framework
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', marginTop: 4, marginBottom: '1rem' }}>
              Why Work With Hindustan Projects?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65 }}>
              We believe in fostering long-term, mutually rewarding partnerships with qualified contractors, material suppliers, and consultants. Our centralized Empanelment Portal ensures complete transparency, fair bidding, paperless compliance, and prompt billing cycles.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} /> Fast-track payment processing & transparent milestone tracking</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} /> Digital Vendor ID Cards with instant QR code verification</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 style={{ width: 16, height: 16, color: '#10B981' }} /> Priority access to pan-India commercial & infrastructure tenders</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 20, border: '1.5px solid #CBD5E1', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              Corporate Identity Overview
            </h4>
            <table style={{ width: '100%', fontSize: '0.825rem', borderCollapse: 'collapse', color: '#334155', tableLayout: 'fixed' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, width: '38%', verticalAlign: 'top' }}>Headquarters</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#0F172A', wordBreak: 'break-word' }}>Bhilwara, Rajasthan, India</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, verticalAlign: 'top' }}>Corporate Email</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#ED1C24', wordBreak: 'break-all' }}>
                    <a href="mailto:industrial@hindustanprojects.in" style={{ color: '#ED1C24', textDecoration: 'none' }}>industrial@hindustanprojects.in</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, verticalAlign: 'top' }}>Helpline Phone</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#0047AB', wordBreak: 'break-word' }}>
                    <a href="tel:+917597000601" style={{ color: '#0047AB', textDecoration: 'none' }}>+91 7597000601</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, verticalAlign: 'top' }}>Official Portal</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#0047AB', wordBreak: 'break-all' }}>
                    <a href="https://empanelment.hindustanprojects.in" style={{ color: '#0047AB', textDecoration: 'none' }}>empanelment.hindustanprojects.in</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, verticalAlign: 'top' }}>Main Corporate Site</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#ED1C24', wordBreak: 'break-all' }}>
                    <a href="https://www.hindustanprojects.in" target="_blank" rel="noreferrer" style={{ color: '#ED1C24', textDecoration: 'none' }}>www.hindustanprojects.in</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 700, verticalAlign: 'top' }}>Quality Standard</td>
                  <td style={{ padding: '8px 0', fontWeight: 900, color: '#047857', wordBreak: 'break-word' }}>ISO 9001:2015 Certified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
