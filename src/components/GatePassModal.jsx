import React, { useState } from 'react';
import { ShieldCheck, QrCode, Printer, CheckCircle2, UserCheck, Calendar, Clock, MapPin, Building2, Truck, Users, X } from 'lucide-react';
import Logo from './Logo';

export default function GatePassModal({ isOpen, onClose, vendorData }) {
  const [visitorName, setVisitorName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [workerCount, setWorkerCount] = useState('1');
  const [siteLocation, setSiteLocation] = useState('Jaipur Commercial Tower (B+G+18)');
  const [generatedPass, setGeneratedPass] = useState(null);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const expiryStr = new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!visitorName) return;
    const passCode = `HP-PASS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedPass({
      passCode,
      visitorName,
      vehicleNo: vehicleNo || 'N/A (Pedestrian Entry)',
      workerCount,
      siteLocation,
      date: todayStr,
      validTill: `${expiryStr} 23:59 IST`,
      qrData: `https://hindustanprojects.in/verify-pass?code=${passCode}&vendor=${vendorData?.tracking_id}`
    });
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: 20, maxWidth: 540, width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', border: '1px solid var(--border-color)', overflow: 'hidden'
      }}>
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #002B66 100%)',
          color: 'white', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode style={{ width: 20, height: 20, color: '#60A5FA' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>Daily Construction Site QR Gate Pass</h3>
              <div style={{ fontSize: '0.72rem', color: '#93C5FD' }}>Hindustan Projects • Gate Security Access Token</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem', padding: 4 }}>
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          {generatedPass ? (
            <div>
              {/* Printable Official Site QR Pass Ticket */}
              <div id="printable-site-pass" style={{
                border: '2px solid #0047AB', borderRadius: 16, padding: '1.25rem', backgroundColor: '#F8FAFC',
                marginBottom: '1.25rem', position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #0047AB', paddingBottom: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Logo height={28} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0F172A' }}>HINDUSTAN PROJECTS</div>
                      <div style={{ fontSize: '0.65rem', color: '#0047AB', fontWeight: 800 }}>SITE GATE ENTRY PASS</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#047857', background: '#DCFCE7', padding: '0.2rem 0.5rem', borderRadius: 6, fontFamily: 'monospace' }}>
                      {generatedPass.passCode}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                    <div>Vendor: <strong>{vendorData?.company_name}</strong></div>
                    <div>Site: <strong>{generatedPass.siteLocation}</strong></div>
                    <div>Supervisor: <strong>{generatedPass.visitorName}</strong></div>
                    <div>Workers: <strong>{generatedPass.workerCount} Personnel</strong></div>
                    <div>Vehicle: <strong>{generatedPass.vehicleNo}</strong></div>
                    <div>Issued: <strong>{generatedPass.date}</strong> &nbsp;•&nbsp; Exp: <strong style={{ color: '#DC2626' }}>24 hrs</strong></div>
                  </div>

                  <div style={{ textAlign: 'center', background: 'white', padding: '0.5rem', borderRadius: 12, border: '1px solid #CBD5E1' }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(generatedPass.qrData)}`}
                      alt="Site Gate QR Code"
                      style={{ width: 95, height: 95, display: 'block', margin: '0 auto' }}
                    />
                    <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#0047AB', marginTop: 2 }}>SCAN AT SITE GATE</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setGeneratedPass(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Generate Another
                </button>
                <button onClick={handlePrintPass} className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                  <Printer style={{ width: 16, height: 16 }} />
                  <span>Print Gate Pass</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.8rem', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck style={{ width: 18, height: 18, flexShrink: 0 }} />
                <span>Generates 24-Hour QR Security Gate Pass for site entry approval.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Project Site Location *</label>
                <select className="form-input" value={siteLocation} onChange={e => setSiteLocation(e.target.value)}>
                  <option>Jaipur Commercial Tower (B+G+18 Tower A)</option>
                  <option>Bhilwara Industrial Logistics Park Site-2</option>
                  <option>Udaipur Luxury Township Site Office</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Site In-Charge / Supervisor Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar (Site Incharge)"
                  value={visitorName}
                  onChange={e => setVisitorName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Worker Headcount *</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    className="form-input"
                    value={workerCount}
                    onChange={e => setWorkerCount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Vehicle Registration No. (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. RJ 06 GB 1234"
                    value={vehicleNo}
                    onChange={e => setVehicleNo(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#0047AB' }}>
                  <QrCode style={{ width: 16, height: 16 }} />
                  <span>Generate QR Pass</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
