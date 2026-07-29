import React, { useState, useEffect } from 'react';
import { X, Printer, Download, ShieldCheck, QrCode, CheckCircle2, Edit3, Save, UploadCloud } from 'lucide-react';
import Logo from './Logo';

export default function VendorIdCardModal({ isOpen, onClose, vendorData }) {
  if (!isOpen || !vendorData) return null;

  // Local state for editable ID Card fields
  const [cardData, setCardData] = useState({
    name: vendorData.contactName || vendorData.contact_name || vendorData.name || 'MOHMMAD DILSHAN',
    designation: vendorData.designation || 'Developer',
    vendorId: vendorData.trackingId || vendorData.tracking_id || vendorData.vendorId || 'HP-IT-003',
    department: vendorData.department || vendorData.category_label || vendorData.primary_role || 'Software Engineering',
    bloodGroup: vendorData.bloodGroup || vendorData.blood_group || 'B+',
    photoUrl: vendorData.passportPhoto || vendorData.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    address: vendorData.corporateAddress || vendorData.address || 'Bhilwara - 311001, Rajasthan, India',
    phone: vendorData.helplinePhone || vendorData.phone || '+91 7597000601',
    email: vendorData.corporateEmail || vendorData.email || 'info@hindustanprojects.in',
    website: 'hindustanprojects.in'
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (vendorData) {
      setCardData(prev => ({
        ...prev,
        name: vendorData.contactName || vendorData.contact_name || vendorData.name || prev.name,
        designation: vendorData.designation || prev.designation,
        vendorId: vendorData.trackingId || vendorData.tracking_id || vendorData.vendorId || prev.vendorId,
        department: vendorData.department || vendorData.category_label || vendorData.primary_role || prev.department,
        bloodGroup: vendorData.bloodGroup || vendorData.blood_group || prev.bloodGroup,
        photoUrl: vendorData.passportPhoto || vendorData.photo_url || prev.photoUrl,
        address: vendorData.corporateAddress || vendorData.address || prev.address,
        phone: vendorData.helplinePhone || vendorData.phone || prev.phone,
        email: vendorData.corporateEmail || vendorData.email || prev.email
      }));
    }
  }, [vendorData]);

  // QR Code URL for instant verification on scan
  const qrVerificationUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://empanelment.hindustanprojects.in/track?id=${cardData.vendorId}`)}`;

  const handlePrint = () => {
    window.print();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      overflowY: 'auto'
    }}>
      
      {/* Modal Container */}
      <div style={{
        backgroundColor: '#F8FAFC', borderRadius: 24, maxWidth: 960, width: '100%',
        padding: '2rem', border: '1px solid #CBD5E1', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
      }}>

        {/* Modal Top Control Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #CBD5E1', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', borderRadius: 99, background: 'rgba(0,71,171,0.1)', color: '#0047AB', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>Official CR80 PVC Smart Identity Badge</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
              Empanelled Vendor Smart Identity Card
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.825rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: isEditing ? '#0047AB' : undefined, color: isEditing ? '#FFF' : undefined }}
            >
              <Edit3 style={{ width: 15, height: 15 }} />
              <span>{isEditing ? '✓ Done Editing' : '✏️ Edit Card Info'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn-accent"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Printer style={{ width: 16, height: 16 }} />
              <span>Print PVC Card (PDF)</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748B', padding: '0.2rem' }}>✕</button>
          </div>
        </div>

        {/* ✏️ LIVE CARD EDITING FORM PANEL (Shown when isEditing = true) */}
        {isEditing && (
          <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: '#FFFFFF', border: '1.5px solid #0047AB', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(0,71,171,0.1)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Edit3 style={{ width: 16, height: 16 }} />
              <span>Customize Vendor Identity Card Details Live:</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Full Name *</label>
                <input type="text" className="form-input" value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value })} placeholder="e.g. MOHMMAD DILSHAN" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Designation *</label>
                <input type="text" className="form-input" value={cardData.designation} onChange={e => setCardData({ ...cardData, designation: e.target.value })} placeholder="e.g. Developer / Director" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Employee / Vendor ID *</label>
                <input type="text" className="form-input" value={cardData.vendorId} onChange={e => setCardData({ ...cardData, vendorId: e.target.value })} placeholder="e.g. HP-IT-003" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Department *</label>
                <input type="text" className="form-input" value={cardData.department} onChange={e => setCardData({ ...cardData, department: e.target.value })} placeholder="e.g. Software Engineering" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Blood Group</label>
                <select className="form-input" value={cardData.bloodGroup} onChange={e => setCardData({ ...cardData, bloodGroup: e.target.value })}>
                  {['B+', 'A+', 'O+', 'AB+', 'B-', 'A-', 'O-', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 2 }}>Profile Photo Upload</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="form-input" style={{ padding: '0.35rem' }} />
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ PRINTABLE DUAL ID CARD CANVAS ════════════════ */}
        <div className="printable-id-card-wrapper" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1rem 0' }}>

          {/* 🎴 FRONT SIDE CARD (CR80 Standard Vertical format: 320px x 530px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #CBD5E1',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Punch Hole Slot */}
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 48, height: 12, backgroundColor: '#E2E8F0', borderRadius: 99, border: '1px solid #CBD5E1', zIndex: 10 }} />

            {/* Top Navy Blue & Red Header Geometric Cuts */}
            <div style={{ height: 115, background: 'linear-gradient(135deg, #0B1B3D 0%, #002B66 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 14 }}>
              {/* Red Top Angle Accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 95, height: 48, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

              {/* Logo Image & Company Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: 2, zIndex: 2 }}>
                <img src="/hipro-logo.jpg" alt="HiPRO Logo" style={{ height: 32, width: 'auto', objectFit: 'contain', borderRadius: 4, backgroundColor: '#FFF', padding: 2 }} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', zIndex: 2 }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.46rem', fontWeight: 700, color: '#94A3B8', marginTop: 1, zIndex: 2 }}>
                Engineering • Construction • Infrastructure • Digital solution With Marketing
              </div>
            </div>

            {/* Middle Profile Photo Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -25, zIndex: 5 }}>
              <div style={{ width: 115, height: 135, borderRadius: 14, overflow: 'hidden', border: '3px solid #0B1B3D', backgroundColor: '#F1F5F9', boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}>
                <img src={cardData.photoUrl} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Vendor Name & Designation */}
            <div style={{ textAlign: 'center', padding: '0.65rem 1rem 0.25rem 1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.03em', margin: 0, textTransform: 'uppercase' }}>
                {cardData.name}
              </h2>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ED1C24', marginTop: 2 }}>
                {cardData.designation}
              </div>
            </div>

            {/* Vendor Details Table */}
            <div style={{ padding: '0.5rem 1.25rem', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem', color: '#1E293B' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, width: '42%', color: '#334155' }}>Employee ID</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{cardData.vendorId}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Department</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{cardData.department}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Designation</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#0B1B3D' }}>: &nbsp;{cardData.designation}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0', fontWeight: 700, color: '#334155' }}>Blood Group</td>
                    <td style={{ padding: '3px 0', fontWeight: 800, color: '#ED1C24' }}>: &nbsp;{cardData.bloodGroup}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Verification QR Code & Corner Geometry */}
            <div style={{ padding: '0.5rem 1.25rem 1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', position: 'relative' }}>
              <div style={{ padding: 4, backgroundColor: '#FFFFFF', borderRadius: 8, border: '1.5px solid #0B1B3D' }}>
                <img src={qrVerificationUrl} alt="QR Scan" style={{ width: 46, height: 46, display: 'block' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Scan for</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0B1B3D', lineHeight: 1.2 }}>Verification</div>
              </div>

              {/* Bottom Red & Blue Corner Geometry Accents */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 44, height: 44, backgroundColor: '#0B1B3D', clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 44, height: 44, backgroundColor: '#ED1C24', clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
            </div>

          </div>

          {/* 🎴 BACK SIDE CARD (CR80 Standard Vertical format: 320px x 530px) */}
          <div style={{
            width: 320, height: 530, backgroundColor: '#FFFFFF', borderRadius: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #CBD5E1',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Top Punch Hole Slot */}
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 48, height: 12, backgroundColor: '#E2E8F0', borderRadius: 99, border: '1px solid #CBD5E1', zIndex: 10 }} />

            {/* Header Banner */}
            <div style={{ padding: '22px 1rem 12px 1rem', textAlign: 'center', borderBottom: '2px solid #ED1C24' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <img src="/hipro-logo.jpg" alt="HiPRO Logo" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0B1B3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#64748B' }}>
                Engineering • Construction • Infrastructure • Digital solution With Marketing
              </div>
            </div>

            {/* Terms & Conditions Body */}
            <div style={{ padding: '1rem 1.25rem', flex: 1 }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0B1B3D', textAlign: 'center', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                TERMS & CONDITIONS
              </h3>
              <div style={{ width: 30, height: 2, backgroundColor: '#ED1C24', margin: '-0.4rem auto 0.75rem auto' }} />

              <ul style={{ paddingLeft: '0.85rem', margin: 0, fontSize: '0.72rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: 1.45 }}>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> This card is the property of Hindustan Projects.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> This card must be worn at all times.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> If found, please return to Human Resources Department.</li>
                <li><strong style={{ color: '#ED1C24' }}>•</strong> Misuse of this card is a punishable offense.</li>
              </ul>

              {/* Authorized Signatory Signature Line */}
              <div style={{ marginTop: '2.25rem', textAlign: 'center' }}>
                <div style={{ width: 150, height: 1.5, backgroundColor: '#0B1B3D', margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0B1B3D' }}>
                  Authorized Signatory
                </div>
              </div>
            </div>

            {/* Dark Blue Footer Block */}
            <div style={{ backgroundColor: '#0B1B3D', color: '#FFFFFF', padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.68rem', lineHeight: 1.55 }}>
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
