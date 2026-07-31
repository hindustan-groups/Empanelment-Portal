import React, { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, Edit3, Lock, Check } from 'lucide-react';
import { printCard } from '../utils/printCard';

export default function VendorIdCardModal({ isOpen, onClose, vendorData }) {
  if (!isOpen || !vendorData) return null;

  // Determine if vendor empanelment status is APPROVED
  const isApproved = vendorData.status === 'APPROVED' || vendorData.isApproved !== false;

  // Auto-populated ID Card fields directly from verified empanelment data
  const defaultCardData = {
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

  const [editMode, setEditMode] = useState(false);
  const [cardData, setCardData] = useState(defaultCardData);

  const handleFieldChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCardData(prev => ({ ...prev, photoUrl: evt.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // QR Code URL — scans open live /track page with vendor ID auto-searched
  const liveBaseUrl = 'https://www.empanelment.hindustanprojects.in';
  const qrVerificationUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${liveBaseUrl}/track?id=${cardData.vendorId}`)}`;

  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'assembly_demo'

  const handlePrint = () => {
    printCard('printable-id-card-element', `Smart PVC ID Card - ${cardData.vendorId}`);
  };

  return (
    <div className="id-card-modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)',
      zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '2rem 1rem',
      overflowY: 'auto'
    }}>
      
      {/* Modal Container */}
      <div className="id-card-modal-container" style={{
        backgroundColor: '#F8FAFC', borderRadius: 24, maxWidth: 980, width: '100%',
        marginTop: 'auto', marginBottom: 'auto',
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

          {/* View Mode Switcher Tabs & Print Control */}
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="no-print" style={{ display: 'flex', backgroundColor: '#E2E8F0', padding: 3, borderRadius: 10 }}>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  padding: '0.4rem 0.85rem', fontSize: '0.78rem', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer',
                  backgroundColor: viewMode === 'cards' ? '#0047AB' : 'transparent',
                  color: viewMode === 'cards' ? '#FFFFFF' : '#475569'
                }}
              >
                🎴 Dual CR80 Cards
              </button>

              <button
                onClick={() => setViewMode('assembly_demo')}
                style={{
                  padding: '0.4rem 0.85rem', fontSize: '0.78rem', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer',
                  backgroundColor: viewMode === 'assembly_demo' ? '#0047AB' : 'transparent',
                  color: viewMode === 'assembly_demo' ? '#FFFFFF' : '#475569'
                }}
              >
                🎗️ 3D Neck Lanyard Demo
              </button>
            </div>

            {/* ✏️ EDIT MODE TOGGLE */}
            <button
              onClick={() => setEditMode(prev => !prev)}
              className="no-print"
              style={{
                padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 800, borderRadius: 10,
                border: editMode ? '2px solid #F59E0B' : '2px solid #CBD5E1',
                background: editMode ? '#FFFBEB' : '#F8FAFC',
                color: editMode ? '#B45309' : '#475569',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                transition: 'all 0.2s'
              }}
              title={editMode ? 'Click to lock fields back' : 'Click to edit card details manually'}
            >
              {editMode ? <Check style={{ width: 15, height: 15 }} /> : <Edit3 style={{ width: 15, height: 15 }} />}
              <span>{editMode ? 'Done Editing' : '✏️ Edit Details'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn-accent"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              title="Print Official Smart ID Card"
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>Print PVC Card (PDF)</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748B', padding: '0.2rem' }}>✕</button>
          </div>
        </div>

        {/* ✏️ EDIT MODE BANNER */}
        {editMode && (
          <div className="no-print" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFBEB', border: '1.5px solid #F59E0B', borderRadius: 14, marginBottom: '1.25rem', color: '#92400E', fontSize: '0.82rem', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.2rem' }}>✏️</span>
              <span><strong>Edit Mode Active:</strong> You can edit Name, ID, Department, Designation, Blood Group below, or change Passport Photo directly!</span>
            </div>
            
            {/* Direct Photo Change Control Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.4rem', borderTop: '1px dashed #FCD34D' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#78350F', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', padding: '0.35rem 0.85rem', background: '#FFFFFF', borderRadius: 8, border: '1.5px solid #F59E0B', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                📷 <span>Upload New Photo (Device File)</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>
              
              <span style={{ fontSize: '0.72rem', color: '#B45309' }}>OR Photo URL:</span>
              <input
                type="text"
                value={cardData.photoUrl}
                onChange={e => handleFieldChange('photoUrl', e.target.value)}
                placeholder="Paste Image URL..."
                style={{ flex: 1, minWidth: 200, padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: 6, border: '1px solid #FCD34D', background: '#FFFFFF' }}
              />
            </div>
          </div>
        )}

        {/* ════════════════ 3D PHYSICAL NECK LANYARD ASSEMBLY DEMO VIEW ════════════════ */}
        {viewMode === 'assembly_demo' && (
          <div className="no-print" style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Demo Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: 99, background: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase' }}>
                🎗️ Physical Assembly Mockup & Wear Demo
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginTop: 4, marginBottom: 2 }}>
                How Your Physical Vendor ID Card & Branded Blue Lanyard Will Look
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748B', margin: 0 }}>
                Official Hindustan Projects 20MM Navy Blue Branded Lanyard with Silver Carabiner Hook
              </p>
            </div>

            {/* 3D ASSEMBLY CANVAS */}
            <div style={{ position: 'relative', width: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>

              {/* ══ OFFICIAL LANYARD RIBBON PRODUCT PHOTO ══ */}
              <div style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
                <img
                  src="/lanyard-official.jpg?v=20mm-v3"
                  alt="Official Hindustan Projects 20mm Branded Blue Lanyard Ribbon"
                  style={{
                    width: '100%',
                    maxWidth: 460,
                    borderRadius: 14,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                    border: '1.5px solid #CBD5E1',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 8, padding: '0.25rem 0.85rem',
                  background: 'rgba(0,71,171,0.08)', borderRadius: 99,
                  fontSize: '0.72rem', fontWeight: 800, color: '#0047AB', letterSpacing: '0.04em', textTransform: 'uppercase'
                }}>
                  🎗️ Official HiPRO 20MM Navy Blue Branded Neck Lanyard · Silver Carabiner Hook
                </div>
              </div>

              {/* Connector: lanyard bottom → card */}
              <div style={{ width: 3, height: 30, background: 'linear-gradient(180deg, #64748B 0%, #0B1B3D 100%)', borderRadius: 2, margin: '6px 0 2px 0' }} />

              {/* Chrome Carabiner Hook */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ width: 26, height: 18, border: '3px solid #94A3B8', borderRadius: 6, background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }} />
                <div style={{ width: 16, height: 22, background: 'linear-gradient(180deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)', borderRadius: '0 0 7px 7px', boxShadow: '0 3px 8px rgba(0,0,0,0.3)', marginTop: -2 }} />
              </div>

              {/* TRANSPARENT ACRYLIC BADGE HOLDER */}
              <div style={{
                padding: '12px 10px 10px 10px', backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: 24, border: '2.5px solid rgba(0, 71, 171, 0.3)', backdropFilter: 'blur(6px)',
                boxShadow: '0 20px 40px rgba(0, 71, 171, 0.18)', position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 40, height: 8, backgroundColor: 'rgba(15,23,42,0.15)', borderRadius: 99, border: '1px solid rgba(255,255,255,0.8)' }} />

                {/* FRONT PVC CARD INSIDE SLEEVE (100% IDENTICAL TO MAIN FRONT CARD) */}
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

                  {/* Header Content on White Background */}
                  <div style={{ textAlign: 'center', padding: '10px 1rem 2px 1rem', position: 'relative' }}>
                    {/* Left Navy & Right Red Polygon Background Accents */}
                    <div style={{ position: 'absolute', top: 10, left: -25, width: 70, height: 55, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', opacity: 0.95, zIndex: 1 }} />
                    <div style={{ position: 'absolute', top: 15, right: -25, width: 70, height: 55, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', opacity: 0.95, zIndex: 1 }} />

                    {/* Logo Image */}
                    <img src="/hipro-logo.png?v=trans-v1" alt="HiPRO Logo" style={{ height: 52, width: 'auto', objectFit: 'contain', margin: '2px auto 6px auto', display: 'block', position: 'relative', zIndex: 10, mixBlendMode: 'multiply', backgroundColor: 'transparent' }} />

                    <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase', position: 'relative', zIndex: 2, lineHeight: 1.05 }}>
                      <span style={{ color: '#ED1C24' }}>HINDUSTAN</span> <span style={{ color: '#0047AB' }}>PROJECTS</span>
                    </div>
                    <div style={{ fontSize: '0.48rem', fontWeight: 700, color: '#0F172A', marginTop: 1, position: 'relative', zIndex: 2 }}>
                      Architecture <span style={{ color: '#ED1C24' }}>•</span> Engineering <span style={{ color: '#ED1C24' }}>•</span> Infrastructure
                    </div>
                    <div style={{ fontSize: '0.44rem', fontWeight: 600, color: '#64748B', marginTop: 1, position: 'relative', zIndex: 2, opacity: 0.85 }}>
                      Digital solution With Marketing
                    </div>
                  </div>

                  {/* Middle Profile Photo Frame */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, zIndex: 5 }}>
                    <div style={{ position: 'relative', width: 95, height: 112, borderRadius: 12, overflow: 'hidden', border: '2px solid #0B1B3D', backgroundColor: '#F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                      <img src={cardData.photoUrl} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      
                      {/* Overlay Photo Upload Trigger in Edit Mode */}
                      {editMode && (
                        <label style={{
                          position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.75)', color: '#FFFFFF',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', fontSize: '0.68rem', fontWeight: 800, textAlign: 'center', padding: 4
                        }}>
                          <span style={{ fontSize: '1.2rem', marginBottom: 2 }}>📷</span>
                          <span>Change Photo</span>
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Vendor Name & Designation */}
                  <div style={{ textAlign: 'center', padding: '0.55rem 1rem 0.2rem 1rem' }}>
                    {editMode ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                        <input
                          value={cardData.name}
                          onChange={e => handleFieldChange('name', e.target.value)}
                          style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 900, color: '#0B1B3D', border: '1.5px solid #F59E0B', borderRadius: 6, padding: '2px 8px', width: '90%', textTransform: 'uppercase', background: '#FFFBEB' }}
                          placeholder="Full Name"
                        />
                        <input
                          value={cardData.designation}
                          onChange={e => handleFieldChange('designation', e.target.value)}
                          style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#ED1C24', border: '1.5px solid #F59E0B', borderRadius: 6, padding: '2px 8px', width: '90%', background: '#FFFBEB' }}
                          placeholder="Designation"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.04em', margin: 0, textTransform: 'uppercase' }}>{cardData.name}</h2>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ED1C24', marginTop: 2 }}>{cardData.designation}</div>
                      </>
                    )}
                  </div>

                  {/* Vendor Details Table */}
                  <div style={{ padding: '0.35rem 1.4rem', flex: 1 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.81rem', color: '#0F172A' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#334155', width: '38%' }}>Employee ID</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#ED1C24', width: '6%', textAlign: 'center' }}>:</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                            {editMode ? <input value={cardData.vendorId} onChange={e => handleFieldChange('vendorId', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 110, background: '#FFFBEB', fontSize: '0.78rem' }} /> : cardData.vendorId}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#334155' }}>Department</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#0F172A' }}>
                            {editMode ? <input value={cardData.department} onChange={e => handleFieldChange('department', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 130, background: '#FFFBEB', fontSize: '0.78rem' }} /> : cardData.department}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#334155' }}>Designation</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#0F172A' }}>
                            {editMode ? <input value={cardData.designation} onChange={e => handleFieldChange('designation', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 120, background: '#FFFBEB', fontSize: '0.78rem' }} /> : cardData.designation}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '3.5px 0', fontWeight: 800, color: '#334155' }}>Blood Group</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                          <td style={{ padding: '3.5px 0', fontWeight: 900, color: '#ED1C24' }}>
                            {editMode ? <input value={cardData.bloodGroup} onChange={e => handleFieldChange('bloodGroup', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 50, background: '#FFFBEB', fontSize: '0.78rem' }} /> : cardData.bloodGroup}
                          </td>
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

              </div>

            </div>

            {/* Print / Download Button Callout inside Demo */}
            <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
              <button
                onClick={() => setViewMode('cards')}
                className="btn-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem', borderRadius: 12, background: '#0047AB' }}
              >
                <span>🎴 Switch to Full Printable Dual Cards View</span>
              </button>
            </div>

          </div>
        )}

        {/* ════════════════ PRINTABLE DUAL ID CARD CANVAS ════════════════ */}
        {viewMode === 'cards' && (
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
            <div style={{ textAlign: 'center', padding: '10px 1rem 2px 1rem', position: 'relative' }}>
              {/* Left Navy & Right Red Polygon Background Accents */}
              <div style={{ position: 'absolute', top: 10, left: -25, width: 70, height: 55, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', opacity: 0.95, zIndex: 1 }} />
              <div style={{ position: 'absolute', top: 15, right: -25, width: 70, height: 55, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', opacity: 0.95, zIndex: 1 }} />

              {/* Logo Image - Shifted Down Slightly for Breathing Room */}
              <img src="/hipro-logo.png?v=trans-v1" alt="HiPRO Logo" style={{ height: 52, width: 'auto', objectFit: 'contain', margin: '2px auto 6px auto', display: 'block', position: 'relative', zIndex: 10, mixBlendMode: 'multiply', backgroundColor: 'transparent' }} />

              <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase', position: 'relative', zIndex: 2, lineHeight: 1.05 }}>
                <span style={{ color: '#ED1C24' }}>HINDUSTAN</span> <span style={{ color: '#0047AB' }}>PROJECTS</span>
              </div>
              <div style={{ fontSize: '0.48rem', fontWeight: 700, color: '#0F172A', marginTop: 1, position: 'relative', zIndex: 2 }}>
                Architecture <span style={{ color: '#ED1C24' }}>•</span> Engineering <span style={{ color: '#ED1C24' }}>•</span> Infrastructure
              </div>
              <div style={{ fontSize: '0.44rem', fontWeight: 600, color: '#64748B', marginTop: 1, position: 'relative', zIndex: 2, opacity: 0.85 }}>
                Digital solution With Marketing
              </div>
            </div>

            {/* Middle Profile Photo Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, zIndex: 5 }}>
              <div style={{ position: 'relative', width: 95, height: 112, borderRadius: 12, overflow: 'hidden', border: '2px solid #0B1B3D', backgroundColor: '#F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <img src={cardData.photoUrl} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Overlay Photo Upload Trigger in Edit Mode */}
                {editMode && (
                  <label style={{
                    position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.75)', color: '#FFFFFF',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '0.68rem', fontWeight: 800, textAlign: 'center', padding: 4
                  }}>
                    <span style={{ fontSize: '1.2rem', marginBottom: 2 }}>📷</span>
                    <span>Change Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>
            </div>

            {/* Vendor Name & Designation */}
            <div style={{ textAlign: 'center', padding: '0.55rem 1rem 0.2rem 1rem' }}>
              {editMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  <input
                    value={cardData.name}
                    onChange={e => handleFieldChange('name', e.target.value)}
                    style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 900, color: '#0B1B3D', border: '1.5px solid #F59E0B', borderRadius: 6, padding: '2px 8px', width: '90%', textTransform: 'uppercase', background: '#FFFBEB' }}
                    placeholder="Full Name"
                  />
                  <input
                    value={cardData.designation}
                    onChange={e => handleFieldChange('designation', e.target.value)}
                    style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#ED1C24', border: '1.5px solid #F59E0B', borderRadius: 6, padding: '2px 8px', width: '90%', background: '#FFFBEB' }}
                    placeholder="Designation"
                  />
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.04em', margin: 0, textTransform: 'uppercase' }}>{cardData.name}</h2>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ED1C24', marginTop: 2 }}>{cardData.designation}</div>
                </>
              )}
            </div>

            {/* Vendor Details Table */}
            <div style={{ padding: '0.4rem 1.4rem', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', color: '#0B1B3D' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800, width: '42%' }}>Employee ID</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace' }}>
                      {editMode ? <input value={cardData.vendorId} onChange={e => handleFieldChange('vendorId', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 100, background: '#FFFBEB', fontSize: '0.75rem' }} /> : cardData.vendorId}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Department</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>
                      {editMode ? <input value={cardData.department} onChange={e => handleFieldChange('department', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 120, background: '#FFFBEB', fontSize: '0.75rem' }} /> : cardData.department}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Designation</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>
                      {editMode ? <input value={cardData.designation} onChange={e => handleFieldChange('designation', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 110, background: '#FFFBEB', fontSize: '0.75rem' }} /> : cardData.designation}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 800 }}>Blood Group</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#ED1C24', textAlign: 'center' }}>:</td>
                    <td style={{ padding: '3px 0', fontWeight: 900, color: '#ED1C24' }}>
                      {editMode ? <input value={cardData.bloodGroup} onChange={e => handleFieldChange('bloodGroup', e.target.value)} style={{ fontWeight: 900, border: '1.5px solid #F59E0B', borderRadius: 4, padding: '1px 4px', width: 50, background: '#FFFBEB', fontSize: '0.75rem' }} /> : cardData.bloodGroup}
                    </td>
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
            <div style={{ textAlign: 'center', padding: '6px 1rem 2px 1rem', position: 'relative' }}>
              {/* Logo Image */}
              <img src="/hipro-logo.png?v=trans-v1" alt="HiPRO Logo" style={{ height: 48, width: 'auto', objectFit: 'contain', margin: '2px auto 6px auto', display: 'block', position: 'relative', zIndex: 10, mixBlendMode: 'multiply', backgroundColor: 'transparent' }} />

              <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase', position: 'relative', zIndex: 2, lineHeight: 1.05 }}>
                <span style={{ color: '#ED1C24' }}>HINDUSTAN</span> <span style={{ color: '#0047AB' }}>PROJECTS</span>
              </div>
              <div style={{ fontSize: '0.46rem', fontWeight: 700, color: '#0F172A', marginTop: 1, position: 'relative', zIndex: 2 }}>
                Architecture <span style={{ color: '#ED1C24' }}>•</span> Engineering <span style={{ color: '#ED1C24' }}>•</span> Infrastructure
              </div>
              <div style={{ fontSize: '0.44rem', fontWeight: 600, color: '#64748B', marginTop: 1, position: 'relative', zIndex: 2, opacity: 0.85 }}>
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
      )}

        {/* 🎗️ OFFICIAL BRANDED BLUE LANYARD STRAP VISUAL MOCKUP & SPECIFICATION */}
        <div className="no-print" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px dashed #CBD5E1' }}>
          
          {/* Lanyard Ribbon Preview Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>🎗️</span>
              <span>Official Branded Lanyard Strap (Neck Ribbon) & Badge Specification</span>
            </h4>
            <span style={{ padding: '0.2rem 0.6rem', borderRadius: 6, backgroundColor: 'rgba(0, 71, 171, 0.1)', color: '#0047AB', fontSize: '0.725rem', fontWeight: 800 }}>
              Royal Navy Blue Brand Color (#0047AB)
            </span>
          </div>

          {/* 🎗️ REALISTIC LANYARD RIBBON STRAP PREVIEW & OFFICIAL PRODUCT PHOTO */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{
              background: 'linear-gradient(90deg, #0B1B3D 0%, #0047AB 50%, #0B1B3D 100%)',
              borderRadius: 14,
              padding: '0.9rem 1.25rem',
              color: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(0,71,171,0.25)',
              border: '1.5px solid #0047AB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '0.85rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Lanyard Strap Stitching Lines */}
              <div style={{ position: 'absolute', top: 3, left: 0, right: 0, height: 1.5, borderTop: '1px dashed rgba(255,255,255,0.3)' }} />
              <div style={{ position: 'absolute', bottom: 3, left: 0, right: 0, height: 1.5, borderTop: '1px dashed rgba(255,255,255,0.3)' }} />

              {/* Left Lanyard Text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', zIndex: 2 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, backgroundColor: '#ED1C24', color: 'white', padding: '0.15rem 0.5rem', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  LANYARD RIBBON (20MM)
                </span>
                <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  HINDUSTAN PROJECTS <span style={{ color: '#ED1C24' }}>•</span> EMPANELED VENDOR <span style={{ color: '#ED1C24' }}>•</span> HINDUSTAN PROJECTS <span style={{ color: '#ED1C24' }}>•</span> ENGINEERING & CONSTRUCTION
                </div>
              </div>

              {/* Right Metal Hook Badge Spec */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, zIndex: 2 }}>
                <span>📎 Metal Swivel Dog Hook + Clear Acrylic Pouch</span>
              </div>
            </div>

            {/* Official Product Photo Card Banner */}
            <div style={{
              borderRadius: 16, overflow: 'hidden', border: '1.5px solid #CBD5E1',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)', position: 'relative', height: 140,
              backgroundColor: '#0F172A'
            }}>
              <img
                src="/lanyard-ribbon-official.jpg?v=20mm-v3"
                alt="Official Royal Navy Blue Lanyard Ribbon Strap"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.95 }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(0deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0) 100%)',
                padding: '0.85rem 1.25rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    📷 Official Manufactured Product Sample Photo
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF' }}>
                    Royal Navy Blue Polyester Lanyard Ribbon with White Screen Print & Chrome Swivel Clip
                  </div>
                </div>
                <span style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', borderRadius: 6, backgroundColor: 'rgba(16,185,129,0.2)', color: '#34D399', fontWeight: 800, border: '1px solid rgba(52,211,153,0.3)' }}>
                  ✓ Approved Brand Spec
                </span>
              </div>
            </div>
          </div>

          {/* 📋 VENDOR CARD & LANYARD MANUFACTURING INSTRUCTIONS GUIDE */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem 1.5rem', borderRadius: 16, border: '1px solid #CBD5E1', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0047AB', marginTop: 0, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              📌 Card Printing & Physical Lanyard Fabrication Guide (Local Shop Print Guide):
            </h5>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.78rem', color: '#1E293B', lineHeight: 1.5 }}>
              
              <div style={{ padding: '0.75rem', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 900, color: '#0F172A', marginBottom: 2 }}>1. PVC Card Stock Specification</div>
                <div>Standard CR80 Size (85.60mm × 53.98mm), 30-mil (0.76mm) Thickness, Waterproof High-Gloss PVC.</div>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 900, color: '#0047AB', marginBottom: 2 }}>2. Lanyard Ribbon Specification</div>
                <div>20mm Width Premium Satin/Polyester Ribbon in <strong>Royal Navy Blue (`#0047AB`)</strong> with White Sublimation Text.</div>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 900, color: '#0F172A', marginBottom: 2 }}>3. Lanyard Printed Text String</div>
                <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0047AB' }}>"HINDUSTAN PROJECTS • EMPANELED VENDOR"</div>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 900, color: '#047857', marginBottom: 2 }}>4. Assembly Accessories</div>
                <div>Chrome Metal Swivel Hook, Safety Breakaway Clasp, and Heavy-Duty Transparent PVC ID Badge Holder Pouch.</div>
              </div>

            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <span style={{ color: '#0047AB' }}>💡 Tip for Printer:</span>
              <span>You can download/print this A4 PDF directly and hand it to any local digital printing or PVC ID card shop. They will print both Front & Back PVC cards and prepare the matching Blue Branded Lanyard Strap.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
