import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', department: 'Empanelment Helpdesk', customDepartment: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page" style={{ padding: '2.5rem 1.5rem', maxWidth: 1240, margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ padding: '0.35rem 0.95rem', borderRadius: 99, backgroundColor: 'rgba(0, 71, 171, 0.08)', color: '#0047AB', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          📍 Corporate Contact & Support Helpdesk
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginTop: '0.65rem', marginBottom: '0.5rem' }}>
          Get in Touch With Hindustan Projects
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
          Have questions regarding vendor empanelment filing, document submission, active tenders, or ID card verification? Our corporate procurement team is ready to assist.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
        
        {/* Left: Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Corporate HQ Card */}
          <div style={{ padding: '1.75rem', borderRadius: 20, backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(237,28,36,0.08)', color: '#ED1C24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Corporate Headquarters</h3>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>Hindustan Projects Corporate House</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin style={{ width: 16, height: 16, color: '#ED1C24', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Address:</strong><br />
                  Bhopal Ganj, Bhilwara - 311001, Rajasthan, India
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone style={{ width: 16, height: 16, color: '#0047AB', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Helpline Phone:</strong>{' '}
                  <a href="tel:+917597000601" style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>+91 7597000601</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail style={{ width: 16, height: 16, color: '#ED1C24', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Email:</strong>{' '}
                  <a href="mailto:empanelment@hindustanprojects.in" style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>empanelment@hindustanprojects.in</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock style={{ width: 16, height: 16, color: '#F59E0B', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Support Hours:</strong> Monday – Saturday: 09:00 AM – 06:00 PM IST
                </div>
              </div>
            </div>
          </div>

          {/* Departmental Routing Card */}
          <div style={{ padding: '1.5rem', borderRadius: 20, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Departmental Routing Contacts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div style={{ padding: '0.6rem 0.85rem', backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, color: '#0047AB' }}>Procurement & Tenders Team</div>
                <div style={{ color: '#64748B' }}>tenders@hindustanprojects.in</div>
              </div>

              <div style={{ padding: '0.6rem 0.85rem', backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, color: '#047857' }}>Vendor Verification Cell</div>
                <div style={{ color: '#64748B' }}>verify@hindustanprojects.in</div>
              </div>

              <div style={{ padding: '0.6rem 0.85rem', backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, color: '#ED1C24' }}>Billing & Accounts Desk</div>
                <div style={{ color: '#64748B' }}>accounts@hindustanprojects.in</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Online Inquiry Form */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '2.25rem', borderRadius: 24, border: '1.5px solid #CBD5E1', boxShadow: '0 12px 36px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', marginTop: 0, marginBottom: '0.35rem' }}>
            Send an Online Support Request
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Fill out the form below and our procurement officer will respond within 24 business hours.
          </p>

          {submitted ? (
            <div style={{ padding: '2rem', backgroundColor: '#ECFDF5', border: '1.5px solid #10B981', borderRadius: 16, textAlign: 'center', color: '#047857' }}>
              <CheckCircle2 style={{ width: 48, height: 48, margin: '0 auto 0.75rem auto', color: '#10B981' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Support Request Submitted!</h4>
              <p style={{ fontSize: '0.875rem', margin: 0, color: '#065F46' }}>
                Thank you, {formData.name}. Your message has been routed to our Procurement Helpdesk. Reference Ticket: <strong>HIPRO-TICK-{Math.floor(1000 + Math.random() * 9000)}</strong>
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', department: 'Empanelment Helpdesk', message: '' }); }}
                style={{ marginTop: '1.25rem', padding: '0.5rem 1.2rem', backgroundColor: '#047857', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Firm / Contractor Name"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Subject / Department</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Empanelment Helpdesk">Empanelment Filing Assistance</option>
                  <option value="Document Verification">Document Verification Query</option>
                  <option value="ID Card & QR Code">Smart ID Card & Verification Issue</option>
                  <option value="Active Tenders">Active Tender Bidding Query</option>
                  <option value="Billing & Accounts">Billing & Accounts Inquiry</option>
                  <option value="Other">✏️ Other – Specify Custom Department</option>
                </select>

                {formData.department === 'Other' && (
                  <div style={{ marginTop: '0.65rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#ED1C24', marginBottom: 4 }}>Specify Custom Subject / Department *</label>
                    <input
                      required
                      type="text"
                      value={formData.customDepartment || ''}
                      onChange={e => setFormData({ ...formData, customDepartment: e.target.value })}
                      placeholder="e.g. Site Safety Audit, Material Quality, Legal Query..."
                      style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #F59E0B', outline: 'none', backgroundColor: '#FFFBEB' }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>Message Details *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your query or issue..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: 10, border: '1.5px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-accent"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', borderRadius: 12, marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Send style={{ width: 16, height: 16 }} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
