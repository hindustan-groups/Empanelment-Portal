import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Building2, ShieldCheck, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import SecurityCaptcha from '../components/SecurityCaptcha';
import { API_BASE_URL } from '../config/api';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [spamError, setSpamError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: 'Empanelment Helpdesk',
    customDepartment: '',
    message: '',
    website_url_hp: '' // 🍯 Honeypot Trap field for anti-spambots
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpamError('');

    // 1. 🍯 Honeypot Check: Spambot trap field must be empty
    if (formData.website_url_hp && formData.website_url_hp.trim() !== '') {
      console.warn('Spambot detected via Honeypot trap!');
      setSubmitted(true); // Silently block bot without error feedback
      return;
    }

    // 2. ⏱️ Rate Limiting Check: 60-second cooldown per session
    const lastSubTime = sessionStorage.getItem('hipro_last_contact_sub');
    if (lastSubTime) {
      const secondsPassed = Math.floor((Date.now() - parseInt(lastSubTime, 10)) / 1000);
      if (secondsPassed < 60) {
        setSpamError(`Anti-Spam Rate Limit: Please wait ${60 - secondsPassed} seconds before sending another inquiry.`);
        return;
      }
    }

    // 3. 🔒 Captcha Check: Math challenge must be solved
    if (!isCaptchaVerified) {
      setSpamError('Security Check Required: Please solve the Anti-Bot Math Security Challenge below before submitting.');
      return;
    }

    // 4. 🛡️ Content Filter Check: Max 2 links & no malicious HTML
    const linkMatches = (formData.message.match(/https?:\/\//gi) || []).length;
    if (linkMatches > 2 || /<script|javascript:/i.test(formData.message)) {
      setSpamError('Security Filter: Excessive links or disallowed characters detected in message body.');
      return;
    }

    const newSubmission = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      company: formData.company || '',
      department: formData.department === 'Other' ? formData.customDepartment : formData.department,
      message: formData.message,
      status: 'NEW',
      time: new Date().toLocaleString('en-IN')
    };

    try {
      const existing = JSON.parse(localStorage.getItem('hipro_contact_submissions') || '[]');
      localStorage.setItem('hipro_contact_submissions', JSON.stringify([newSubmission, ...existing]));
    } catch {}

    setIsSending(true);
    const backendUrl = API_BASE_URL;

    try {
      // Attempt backend API call
      const res = await fetch(`${backendUrl}/api/empanelment/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        console.log('✅ Contact inquiry email sent via VPS backend');
      }
    } catch {}

    setIsSending(false);
    sessionStorage.setItem('hipro_last_contact_sub', Date.now().toString());
    setSubmitted(true);
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
                  {(() => {
                    try {
                      const cfg = JSON.parse(localStorage.getItem('hipro_site_config') || '{}');
                      return cfg.corporateAddress || 'Bhopal Ganj, Bhilwara - 311001, Rajasthan, India';
                    } catch { return 'Bhopal Ganj, Bhilwara - 311001, Rajasthan, India'; }
                  })()}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone style={{ width: 16, height: 16, color: '#0047AB', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Helpline Phone:</strong>{' '}
                  {(() => {
                    try {
                      const cfg = JSON.parse(localStorage.getItem('hipro_site_config') || '{}');
                      const p = cfg.helplinePhone || '+91 7597000601';
                      return <a href={`tel:${p.replace(/\s+/g, '')}`} style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>{p}</a>;
                    } catch { return <a href="tel:+917597000601" style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>+91 7597000601</a>; }
                  })()}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail style={{ width: 16, height: 16, color: '#ED1C24', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Email:</strong>{' '}
                  {(() => {
                    try {
                      const cfg = JSON.parse(localStorage.getItem('hipro_site_config') || '{}');
                      const e = cfg.corporateEmail || 'empanelment@hindustanprojects.in';
                      return <a href={`mailto:${e}`} style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>{e}</a>;
                    } catch { return <a href="mailto:empanelment@hindustanprojects.in" style={{ color: '#0047AB', fontWeight: 800, textDecoration: 'none' }}>empanelment@hindustanprojects.in</a>; }
                  })()}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock style={{ width: 16, height: 16, color: '#F59E0B', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A' }}>Support Hours:</strong>{' '}
                  {(() => {
                    try {
                      const cfg = JSON.parse(localStorage.getItem('hipro_site_config') || '{}');
                      return cfg.supportHours || 'Monday – Saturday: 09:00 AM – 06:00 PM IST';
                    } catch { return 'Monday – Saturday: 09:00 AM – 06:00 PM IST'; }
                  })()}
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

          {/* Spam Warning Banner */}
          {spamError && (
            <div style={{ padding: '0.85rem 1rem', borderRadius: 12, backgroundColor: '#FEF2F2', border: '1.5px solid #EF4444', color: '#B91C1C', fontSize: '0.825rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <ShieldAlert style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{spamError}</span>
            </div>
          )}

          {submitted ? (
            <div style={{ padding: '2rem', backgroundColor: '#ECFDF5', border: '1.5px solid #10B981', borderRadius: 16, textAlign: 'center', color: '#047857' }}>
              <CheckCircle2 style={{ width: 48, height: 48, margin: '0 auto 0.75rem auto', color: '#10B981' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Support Request Submitted!</h4>
              <p style={{ fontSize: '0.875rem', margin: 0, color: '#065F46' }}>
                Thank you, {formData.name}. Your message has been routed to our Procurement Helpdesk. Reference Ticket: <strong>HIPRO-TICK-{Math.floor(1000 + Math.random() * 9000)}</strong>
              </p>
              <button
                onClick={() => { setSubmitted(false); setIsCaptchaVerified(false); setSpamError(''); setFormData({ name: '', email: '', phone: '', company: '', department: 'Empanelment Helpdesk', customDepartment: '', message: '', website_url_hp: '' }); }}
                style={{ marginTop: '1.25rem', padding: '0.5rem 1.2rem', backgroundColor: '#047857', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* 🍯 Hidden Honeypot Field for Spambot Trapping */}
              <input
                type="text"
                name="website_url_hp"
                value={formData.website_url_hp}
                onChange={e => setFormData({ ...formData, website_url_hp: e.target.value })}
                style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                tabIndex="-1"
                autoComplete="off"
              />

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

              {/* 🔒 Anti-Bot Security Challenge Captcha */}
              <SecurityCaptcha onCaptchaVerify={(status) => setIsCaptchaVerified(status)} />

              <button
                type="submit"
                className="btn-accent"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', borderRadius: 12, marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
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
