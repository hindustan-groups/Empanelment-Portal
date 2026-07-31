import React, { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, Edit3 } from 'lucide-react';
import { printCard } from '../utils/printCard';

export default function VendorIdCardModal({ isOpen, onClose, vendorData }) {
  if (!isOpen || !vendorData) return null;

  // Determine if vendor empanelment status is APPROVED
  const isApproved = vendorData.status === 'APPROVED' || vendorData.isApproved !== false;

  // Auto-populated ID Card fields directly from verified empanelment data (System Locked)
  const cardData = {
    name: vendorData.contactName || vendorData.contact_name || vendorData.name || 'MOHMMAD DILSHAN',
    designation: vendorData.designation || vendorData.primary_role_label || 'Empanelled Vendor',
    vendorId: vendorData.trackingId || vendorData.tracking_id || vendorData.vendorId || 'HP-EMP-025',
    department: vendorData.department || vendorData.category_label || vendorData.primary_role || 'Software Engineering',
    bloodGroup: vendorData.bloodGroup || vendorData.blood_group || 'B+',
    photoUrl: vendorData.passportPhoto || vendorData.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    address: vendorData.corporateAddress || vendorData.address || 'Bhilwara - 311001, Rajasthan, India',
    phone: vendorData.helplinePhone || vendorData.phone || '+91 7597000601',
    email: vendorData.corporateEmail || vendorData.email || 'info@hindustanprojects.in',
    website: 'hindustanprojects.in'
  };

  // QR Code URL for instant verification on scan
  const qrVerificationUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://empanelment.hindustanprojects.in/track?id=${cardData.vendorId}`)}`;

  const handlePrint = () => {
    if (isApproved) {
      printCard('printable-id-card-element', `Smart PVC ID Card - ${cardData.vendorId}`);
    }
  };

  return (
    <div className="id-card-modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      overflowY: 'auto'
    }}>
      
      {/* Modal Container */}
      <div className="id-card-modal-container" style={{
        backgroundColor: '#F8FAFC', borderRadius: 24, maxWidth: 960, width: '100%',
        padding: '2rem', border: '1px solid #CBD5E1', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
      }}>

        {/* Modal Top Control Header */}
        <div className="id-card-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #CBD5E1', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', borderRadius: 99, background: isApproved ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: isApproved ? '#047857' : '#B45309', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>{isApproved ? 'Official Verified System Identity' : '⚠️ Pending Admin Approval'}</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
              Empanelled Vendor Smart Identity Card
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              disabled={!isApproved}
              className="btn-accent"
              style={{
                padding: '0.55rem 1.25rem', fontSize: '0.85rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.4rem',
                opacity: isApproved ? 1 : 0.5, cursor: isApproved ? 'pointer' : 'not-allowed'
              }}
              title={isApproved ? 'Print Official Smart ID Card' : 'Card download unlocks upon Admin Approval'}
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>{isApproved ? 'Print PVC Card (PDF)' : 'Locked (Pending Approval)'}</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748B', padding: '0.2rem' }}>✕</button>
          </div>
        </div>

        {/* 🔒 SECURITY NOTICE BANNER */}
        {!isApproved && (
          <div className="id-card-security-banner" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFBEB', border: '1.5px solid #F59E0B', borderRadius: 14, marginBottom: '1.25rem', color: '#B45309', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🔒</span>
            <span>Security Lockdown: Official Smart ID Card printing is currently locked. Once Admin approves your empanelment application, official printing will unlock automatically.</span>
          </div>
        )}

        {/* ════════════════ PRINTABLE DUAL ID CARD CANVAS ════════════════ */}
        <div id="printable-id-card-element" className="printable-id-card-wrapper" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1rem 0' }}>

          {/* 🎴 FRONT SIDE CARD (CR80 Standard Vertical format: 320px x 530px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #CBD5E1',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Navy Blue Geometric Header Bar */}
            <div style={{ height: 42, minHeight: 42, background: '#0B1B3D', position: 'relative', width: '100%', overflow: 'hidden' }}>
              {/* Punch Hole Slot */}
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 50, height: 12, backgroundColor: '#FFFFFF', borderRadius: 99, border: '1px solid #CBD5E1', zIndex: 10 }} />
              {/* Red Right Diagonal Cut */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 85, height: 42, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 0, 100% 100%)', zIndex: 5 }} />
              <div style={{ position: 'absolute', top: 18, right: 0, width: 95, height: 4, backgroundColor: '#ED1C24', zIndex: 6 }} />
            </div>

            {/* Header Content on White Background (Identical Symmetrical Top Header) */}
            <div style={{ textAlign: 'center', padding: '14px 1rem 4px 1rem', position: 'relative' }}>
              {/* Left Navy & Right Red Polygon Background Accents */}
              <div style={{ position: 'absolute', top: 12, left: -25, width: 70, height: 55, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', opacity: 0.95 }} />
              <div style={{ position: 'absolute', top: 17, right: -25, width: 70, height: 55, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', opacity: 0.95 }} />

              {/* Logo Image - Shifted Down Slightly for Breathing Room */}
              <img src="/hipro-logo.jpg" alt="HiPRO Logo" style={{ height: 38, width: 'auto', objectFit: 'contain', margin: '4px auto 4px auto', display: 'block', position: 'relative', zIndex: 2 }} />

              <div style={{ fontSize: '0.825rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.05em', textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.48rem', fontWeight: 700, color: '#0F172A', marginTop: 1, position: 'relative', zIndex: 2 }}>
                Engineering <span style={{ color: '#ED1C24' }}>•</span> Construction <span style={{ color: '#ED1C24' }}>•</span> Infrastructure
              </div>
              <div style={{ fontSize: '0.48rem', fontWeight: 800, color: '#0B1B3D', marginTop: 1, position: 'relative', zIndex: 2 }}>
                <span style={{ color: '#ED1C24' }}>•</span> Digital solution With Marketing <span style={{ color: '#ED1C24' }}>•</span>
              </div>
            </div>

            {/* Middle Profile Photo Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, zIndex: 5 }}>
              <div style={{ width: 112, height: 132, borderRadius: 12, overflow: 'hidden', border: '2px solid #0B1B3D', backgroundColor: '#F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <img src={cardData.photoUrl} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Vendor Name & Designation */}
            <div style={{ textAlign: 'center', padding: '0.55rem 1rem 0.2rem 1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.04em', margin: 0, textTransform: 'uppercase' }}>
                {cardData.name}
              </h2>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ED1C24', marginTop: 2 }}>
                {cardData.designation}
              </div>
            </div>

            {/* Vendor Details Table */}
            <div style={{ padding: '0.4rem 1.4rem', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', color: '#0B1B3D' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800, width: '42%' }}>Employee ID</td>
                    <td style={{ padding: '3px 0', fontWeight: 900 }}>:&nbsp;&nbsp;&nbsp;{cardData.vendorId}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Department</td>
                    <td style={{ padding: '3px 0', fontWeight: 900 }}>:&nbsp;&nbsp;&nbsp;{cardData.department}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Designation</td>
                    <td style={{ padding: '3px 0', fontWeight: 900 }}>:&nbsp;&nbsp;&nbsp;{cardData.designation}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Blood Group</td>
                    <td style={{ padding: '3px 0', fontWeight: 900 }}>:&nbsp;&nbsp;&nbsp;{cardData.bloodGroup}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Verification QR Code & Corner Geometry */}
            <div style={{ padding: '0.4rem 1.25rem 0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', position: 'relative' }}>
              <div style={{ padding: 3, backgroundColor: '#FFFFFF', borderRadius: 6, border: '2px solid #0B1B3D' }}>
                <img src={qrVerificationUrl} alt="QR Scan" style={{ width: 44, height: 44, display: 'block' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Scan for</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Verification</div>
              </div>

              {/* Bottom Diagonal Angle Cuts (Left & Right) */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 45, height: 45, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, backgroundColor: '#ED1C24', clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />

              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 45, height: 45, backgroundColor: '#0B1B3D', clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
            </div>

          </div>

          {/* 🎴 BACK SIDE CARD (CR80 Standard Vertical format: 320px x 530px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #CBD5E1',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Navy Blue Geometric Header Bar (Matching Front Side Top Bar Exactly) */}
            <div style={{ height: 42, minHeight: 42, background: '#0B1B3D', position: 'relative', width: '100%', overflow: 'hidden' }}>
              {/* Punch Hole Slot */}
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 50, height: 12, backgroundColor: '#FFFFFF', borderRadius: 99, border: '1px solid #CBD5E1', zIndex: 10 }} />
              {/* Red Right Diagonal Cut */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 85, height: 42, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 0, 100% 100%)', zIndex: 5 }} />
              <div style={{ position: 'absolute', top: 18, right: 0, width: 95, height: 4, backgroundColor: '#ED1C24', zIndex: 6 }} />
            </div>

            {/* Header Content on White Background (Clean without side triangles for Back Card) */}
            <div style={{ textAlign: 'center', padding: '8px 1rem 2px 1rem', position: 'relative' }}>
              {/* Logo Image */}
              <img src="/hipro-logo.jpg" alt="HiPRO Logo" style={{ height: 32, width: 'auto', objectFit: 'contain', margin: '2px auto 2px auto', display: 'block', position: 'relative', zIndex: 2 }} />

              <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.05em', textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.46rem', fontWeight: 700, color: '#0F172A', marginTop: 1, position: 'relative', zIndex: 2 }}>
                Engineering <span style={{ color: '#ED1C24' }}>•</span> Construction <span style={{ color: '#ED1C24' }}>•</span> Infrastructure
              </div>
              <div style={{ fontSize: '0.46rem', fontWeight: 800, color: '#0B1B3D', marginTop: 1, position: 'relative', zIndex: 2 }}>
                Digital solution With Marketing
              </div>
            </div>

            {/* Terms & Conditions Body */}
            <div style={{ padding: '0.85rem 1.4rem 0.5rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0B1B3D', textAlign: 'center', letterSpacing: '0.05em', margin: '0 0 2px 0' }}>
                  TERMS & CONDITIONS
                </h3>
                <div style={{ width: 30, height: 2, backgroundColor: '#ED1C24', margin: '0 auto 0.75rem auto' }} />

                <ul style={{ paddingLeft: '0.85rem', margin: 0, fontSize: '0.72rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: 1.45 }}>
                  <li><strong style={{ color: '#ED1C24' }}>•</strong> This card is the property of Hindustan Projects.</li>
                  <li><strong style={{ color: '#ED1C24' }}>•</strong> This card must be worn at all times.</li>
                  <li><strong style={{ color: '#ED1C24' }}>•</strong> If found, please return to Human Resources Department.</li>
                  <li><strong style={{ color: '#ED1C24' }}>•</strong> Misuse of this card is a punishable offense.</li>
                </ul>
              </div>

              {/* Authorized Signatory Section with Exact Uploaded CEO Signature Image */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.2rem' }}>
                  <img
                    src="/ceo-signature-exact-final.png"
                    alt="Yogesh Kharol CEO Signature"
                    style={{
                      width: 140,
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>
                <div style={{ width: 160, height: 1.5, backgroundColor: '#0B1B3D', margin: '0 auto 3px auto' }} />
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0B1B3D' }}>
                  Authorized Signatory
                </div>
              </div>
            </div>

            {/* Red Horizontal Line Above Footer */}
            <div style={{ height: 3, backgroundColor: '#ED1C24' }} />

            {/* Dark Blue Bottom Footer Block (#0B1B3D) */}
            <div style={{ backgroundColor: '#0B1B3D', color: '#FFFFFF', padding: '0.45rem 1rem 0.55rem 1rem', textAlign: 'center', fontSize: '0.62rem', lineHeight: 1.35 }}>
              <div style={{ fontWeight: 700 }}>{cardData.address}</div>
              <div style={{ fontWeight: 700, marginTop: 1 }}>{cardData.phone}</div>
              <div style={{ color: '#93C5FD' }}>{cardData.email}</div>
              <div style={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>{cardData.website}</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
