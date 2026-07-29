import React, { useState } from 'react';
import { X, Printer, Download, ShieldCheck, QrCode, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

export default function VendorIdCardModal({ isOpen, onClose, vendorData }) {
  if (!isOpen || !vendorData) return null;

  // Extract fields with exact fallbacks matching attached reference image
  const name = vendorData.contactName || vendorData.contact_name || 'MOHMMAD DILSHAN';
  const designation = vendorData.designation || 'Developer';
  const vendorId = vendorData.trackingId || vendorData.tracking_id || 'HP-EMP-025';
  const department = vendorData.department || vendorData.category_label || vendorData.primary_role || 'Software Engineering';
  const bloodGroup = vendorData.bloodGroup || vendorData.blood_group || 'B+';
  const photoUrl = vendorData.passportPhoto || vendorData.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
  const address = vendorData.corporateAddress || vendorData.address || 'Bhilwara - 311001, Rajasthan, India';
  const phone = vendorData.helplinePhone || vendorData.phone || '+91 7597000601';
  const email = vendorData.corporateEmail || vendorData.email || 'info@hindustanprojects.in';
  const website = 'hindustanprojects.in';

  // QR Code URL for instant verification on scan
  const qrVerificationUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://empanelment.hindustanprojects.in/track?id=${vendorId}`)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      overflowY: 'auto'
    }}>
      
      {/* Modal Container */}
      <div style={{
        backgroundColor: '#F8FAFC', borderRadius: 24, maxWidth: 880, width: '100%',
        padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>

        {/* Modal Top Control Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #CBD5E1' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', borderRadius: 99, background: 'rgba(0,71,171,0.1)', color: '#0047AB', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>Official Smart PVC Identity Badge</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
              Empanelled Vendor Smart Identity Card
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              className="btn-accent"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>Print PVC Card (PDF)</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748B' }}>✕</button>
          </div>
        </div>

        {/* ════════════════ PRINTABLE DUAL ID CARD CANVAS ════════════════ */}
        <div className="printable-id-card-wrapper" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.5rem 0' }}>

          {/* 🎴 FRONT SIDE CARD (CR80 Standard Vertical format: 320px x 540px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Punch Hole Slot */}
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 44, height: 10, backgroundColor: '#E2E8F0', borderRadius: 99, zIndex: 10 }} />

            {/* Top Navy Blue & Red Header Geometric Cuts */}
            <div style={{ height: 115, background: 'linear-gradient(135deg, #0B1B3D 0%, #002B66 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 14 }}>
              {/* Red Top Angle Accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 45, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

              {/* Logo & Company Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: 2 }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ED1C24', letterSpacing: '-0.5px' }}>H<span style={{ color: '#0047AB' }}>i</span></span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0B1B3D', backgroundColor: '#FFFFFF', padding: '0.1rem 0.4rem', borderRadius: 4, letterSpacing: '0.02em' }}>PRO</span>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.48rem', fontWeight: 700, color: '#94A3B8', marginTop: 1 }}>
                Engineering • Construction • Infrastructure • Digital Solution
              </div>
            </div>

            {/* Middle Profile Photo Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -25, zIndex: 5 }}>
              <div style={{ width: 110, height: 130, borderRadius: 14, overflow: 'hidden', border: '3px solid #0B1B3D', backgroundColor: '#F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <img src={photoUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Vendor Name & Designation */}
            <div style={{ textAlign: 'center', padding: '0.65rem 1rem 0.25rem 1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.03em', margin: 0, textTransform: 'uppercase' }}>
                {name}
              </h2>
              <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#ED1C24', marginTop: 2 }}>
                {designation}
              </div>
            </div>

            {/* Vendor Details Table */}
            <div style={{ padding: '0.5rem 1.25rem', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem', color: '#1E293B' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, width: '40%', color: '#334155' }}>Employee / Vendor ID</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{vendorId}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Department</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{department}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Designation</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{designation}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Blood Group</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#ED1C24' }}>: &nbsp;{bloodGroup}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Verification QR Code & Corner Geometry */}
            <div style={{ padding: '0.5rem 1.25rem 1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', position: 'relative' }}>
              <div style={{ padding: 4, backgroundColor: '#FFFFFF', borderRadius: 8, border: '1.5px solid #0B1B3D' }}>
                <img src={qrVerificationUrl} alt="QR Scan" style={{ width: 44, height: 44, display: 'block' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Scan for</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Verification</div>
              </div>

              {/* Bottom Red & Blue Corner Geometry Accents */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
            </div>

          </div>

          {/* 🎴 BACK SIDE CARD (CR80 Standard Vertical format: 320px x 530px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Punch Hole Slot */}
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 44, height: 10, backgroundColor: '#E2E8F0', borderRadius: 99, zIndex: 10 }} />

            {/* Header Banner */}
            <div style={{ padding: '22px 1rem 12px 1rem', textAlign: 'center', borderBottom: '2px solid #ED1C24' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ED1C24' }}>H<span style={{ color: '#0047AB' }}>i</span></span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0B1B3D', backgroundColor: '#F1F5F9', padding: '0.1rem 0.35rem', borderRadius: 4 }}>PRO</span>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#64748B' }}>
                Engineering • Construction • Infrastructure • Digital Solution
              </div>
            </div>

            {/* Terms & Conditions Body */}
            <div style={{ padding: '1rem 1.25rem', flex: 1 }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0B1B3D', textAlign: 'center', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                TERMS & CONDITIONS
              </h3>

              <ul style={{ paddingLeft: '0.85rem', margin: 0, fontSize: '0.7rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '0.55rem', lineHeight: 1.45 }}>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> This card is the property of Hindustan Projects.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> This card must be worn at all times on site.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> If found, please return to Human Resources Department.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> Misuse of this card is a punishable offense.</li>
              </ul>

              {/* Authorized Signatory Signature Line */}
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ width: 140, height: 1, backgroundColor: '#0B1B3D', margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0B1B3D' }}>
                  Authorized Signatory
                </div>
              </div>
            </div>

            {/* Dark Blue Footer Block */}
            <div style={{ backgroundColor: '#0B1B3D', color: '#FFFFFF', padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.65rem', lineHeight: 1.55 }}>
              <div style={{ fontWeight: 700 }}>{address}</div>
              <div style={{ fontWeight: 700, marginTop: 1 }}>{phone}</div>
              <div style={{ color: '#93C5FD' }}>{email}</div>
              <div style={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>{website}</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
