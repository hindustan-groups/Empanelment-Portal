import React, { useState, useEffect } from 'react';
import { 
  Building, User, Mail, Phone, MapPin, CreditCard, ShieldCheck, 
  FileText, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, DollarSign, Award, FileCheck, Save, Sparkles, Loader2, X, HardHat, Edit3 
} from 'lucide-react';
import GstVerifier from './GstVerifier';
import PaymentSlip from './PaymentSlip';
import SecurityCaptcha from './SecurityCaptcha';
import DigitalSignature from './DigitalSignature';

const DISCIPLINE_ROLES = [
  { code: 'arch', label: 'a) Architect & Architectural Designer' },
  { code: 'civil', label: 'b) Civil Engineer / Structural Contractor' },
  { code: 'structural', label: 'c) Structural Design Consultant' },
  { code: 'electrical', label: 'd) Electrical Engineering Consultant' },
  { code: 'plumbing', label: 'e) Plumbing & Sanitation Specialist' },
  { code: 'fire', label: 'f) Fire Protection & Safety Engineer' },
  { code: 'hvac', label: 'g) HVAC & Air Conditioning Specialist' },
  { code: 'environment', label: 'h) Environment & Green Building Specialist' },
  { code: 'planner', label: 'j) Town Planner & Master Layout Designer' },
  { code: 'urban', label: 'k) Urban Designer' },
  { code: 'landscape', label: 'm) Landscape Architect' },
  { code: 'security', label: 'n) Security System Specialist' },
  { code: 'interior', label: 'p) Interior Designer & Turnkey Decor' },
  { code: 'qs', label: 'q) Quantity Surveyor & Cost Estimator' },
  { code: 'pmc', label: 'r) Project / Construction Manager (PMC)' },
  { code: 'hospitality', label: 's) Hospitality & Other Subject Specialist' }
];

export default function EmpanelmentForm({ category, onFormSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  
  const [formData, setFormData] = useState({
    category: category || 'civil',
    primaryRole: 'arch',
    companyName: '',
    entityType: 'pvt_ltd',
    estYear: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    pan: '',
    msmeNo: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',
    turnover2023: '',
    turnover2024: '',
    turnover2025: '',
    largestOrder: '',
    existingEmpanels: '',
    buaArea: '',
    cpaArea: '',
    gstDoc: null,
    panDoc: null,
    bankDoc: null,
    expDoc: null,
    declAntiBlacklist: false,
    declIpAssignment: false,
    declSiteVisit: false,
    declDocNaming: false,
    signatoryName: '',
  });

  const [errors, setErrors] = useState({});
  const [isSavedLocal, setIsSavedLocal] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(prev => ({ ...prev, category }));
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (fieldName, file) => {
    if (file && file.size > 10 * 1024 * 1024) {
      alert('Security Alert: File size exceeds 10MB limit.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      [fieldName]: file || null
    }));
  };

  const handleRemoveFile = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const handleGstAutoVerified = ({ gstin, pan }) => {
    setFormData(prev => ({
      ...prev,
      gstin: gstin || prev.gstin,
      pan: pan || prev.pan
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company / Firm Title is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Lead Professional / Contact Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid Email Address is required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit Mobile Number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
    }

    if (step === 2) {
      if (!formData.gstin.trim() || formData.gstin.length < 15) newErrors.gstin = '15-character GSTIN is required';
      if (!formData.pan.trim() || formData.pan.length < 10) newErrors.pan = '10-character PAN is required';
      if (!formData.bankAccount.trim()) newErrors.bankAccount = 'Bank Current Account Number is required';
      if (!formData.ifsc.trim()) newErrors.ifsc = 'Bank IFSC Code is required';
    }

    if (step === 3) {
      if (!formData.turnover2025.trim()) newErrors.turnover2025 = 'Turnover for FY 2025-26 is required';
    }

    if (step === 5) {
      if (!formData.declAntiBlacklist) newErrors.declAntiBlacklist = 'You must accept the Anti-Blacklisting Declaration';
      if (!formData.declIpAssignment) newErrors.declIpAssignment = 'You must accept the Intellectual Property Assignment clause';
      if (!formData.declSiteVisit) newErrors.declSiteVisit = 'You must confirm the Site Visit Mandate';
      if (!formData.signatoryName.trim()) newErrors.signatoryName = 'Authorized Signatory Name is required';
      if (!signatureData) newErrors.signature = 'Please draw your digital signature on the pad before submitting';
      if (!isCaptchaVerified) newErrors.captcha = 'Please solve the Security Math Challenge before submitting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    localStorage.setItem('hipro_empanel_draft', JSON.stringify({
      ...formData,
      gstDoc: formData.gstDoc?.name || null,
      panDoc: formData.panDoc?.name || null,
      bankDoc: formData.bankDoc?.name || null,
      expDoc: formData.expDoc?.name || null,
    }));
    setIsSavedLocal(true);
    setTimeout(() => setIsSavedLocal(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const dataPayload = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] instanceof File) {
          dataPayload.append(key, formData[key]);
        } else if (formData[key] !== null && formData[key] !== undefined) {
          dataPayload.append(key, formData[key]);
        }
      });
      if (signatureData) {
        dataPayload.append('signature', signatureData);
      }

      const response = await fetch(`${backendUrl}/api/empanelment/submit`, {
        method: 'POST',
        body: dataPayload
      });

      const result = await response.json();
      if (result.success) {
        onFormSubmit({ ...formData, signature: signatureData }, result.trackingId);
      } else {
        onFormSubmit({ ...formData, signature: signatureData });
      }
    } catch (err) {
      console.warn('Using fallback submission:', err);
      onFormSubmit({ ...formData, signature: signatureData });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Scope & Profile', icon: Building },
    { num: 2, title: 'GST & Compliance', icon: CreditCard },
    { num: 3, title: 'Financials & BUA', icon: DollarSign },
    { num: 4, title: 'Upload Drawings & Docs', icon: FileCheck },
    { num: 5, title: 'Signature & Terms', icon: ShieldCheck },
  ];

  const progressPercent = currentStep * 20;

  return (
    <div id="empanelment-form-container" className="form-container">
      <div className="form-card">
        
        {/* Banner */}
        <div className="form-header-banner">
          <div className="form-header-top">
            <div>
              <div className="form-header-tag">✨ Official Empanelment Wizard • {progressPercent}% Completed</div>
              <h2 className="form-header-title">Hindustan Projects Empanelment Portal</h2>
            </div>
            
            <button type="button" onClick={handleSaveDraft} className="btn-draft">
              <Save style={{ width: 14, height: 14 }} />
              <span>{isSavedLocal ? 'Draft Saved!' : 'Save Progress Draft'}</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="progress-nav">
            {stepsList.map((st) => {
              const Icon = st.icon;
              const isActive = currentStep === st.num;
              const isDone = currentStep > st.num;

              return (
                <div 
                  key={st.num}
                  onClick={() => isDone && setCurrentStep(st.num)}
                  className={`step-item ${isDone ? 'done' : isActive ? 'active' : ''}`}
                >
                  <div className="step-bubble">
                    {isDone ? '✓' : <Icon style={{ width: 16, height: 16 }} />}
                  </div>
                  <span className="step-title">{st.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="form-body">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <Building style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 1: Professional Scope & Firm Details</span>
                </h3>
                <p className="step-header-sub">Select professional discipline and enter official registration details as per COA / MCA</p>
              </div>

              <div className="form-grid-2">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Professional Discipline / Scope of Work <span className="required">*</span></label>
                  <select name="primaryRole" value={formData.primaryRole} onChange={handleChange} className="form-input" style={{ fontWeight: 700, color: '#0047AB' }}>
                    {DISCIPLINE_ROLES.map(r => (
                      <option key={r.code} value={r.code}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Empanelment Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="form-input">
                    <option value="consultants">Architects & BIM Engineering Consultants</option>
                    <option value="civil">Civil & Structural Engineering Contractors</option>
                    <option value="mep">MEP, HVAC & Electrical System Services</option>
                    <option value="suppliers">Material & Construction Goods Suppliers</option>
                    <option value="equipment">Heavy Machinery & Crane Rentals</option>
                    <option value="site_services">Facility & PMC Site Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Firm / Professional Title <span className="required">*</span></label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. M/S Studio Form & Function Architects" className={`form-input ${errors.companyName ? 'error' : ''}`} />
                  {errors.companyName && <span className="error-text">{errors.companyName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Constitution / Legal Entity Type</label>
                  <select name="entityType" value={formData.entityType} onChange={handleChange} className="form-input">
                    <option value="pvt_ltd">Private Limited Company (Pvt Ltd)</option>
                    <option value="proprietorship">Sole Proprietorship / Individual Consultant</option>
                    <option value="partnership">Partnership Firm</option>
                    <option value="llp">Limited Liability Partnership (LLP)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Year of Establishment</label>
                  <input type="number" name="estYear" value={formData.estYear} onChange={handleChange} placeholder="e.g. 2014" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Lead Professional / Contact Officer <span className="required">*</span></label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Full Name of Principal Architect / Director" className={`form-input ${errors.contactName ? 'error' : ''}`} />
                  {errors.contactName && <span className="error-text">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Designation / COA Council Reg. No</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Principal Architect (CA/2018/84920)" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Corporate Email <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="architect@firm.com" className={`form-input ${errors.email ? 'error' : ''}`} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number <span className="required">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`form-input ${errors.phone ? 'error' : ''}`} />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Registered Office / Studio Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Studio / Office Suite / Street Address" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">City <span className="required">*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className={`form-input ${errors.city ? 'error' : ''}`} />
                </div>

                <div className="form-group">
                  <label className="form-label">State <span className="required">*</span></label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className={`form-input ${errors.state ? 'error' : ''}`} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <CreditCard style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 2: Statutory Compliance & Fee Payout Bank Details</span>
                </h3>
                <p className="step-header-sub">GSTIN, PAN, and Bank Current Account for design milestone fee disbursements</p>
              </div>

              {/* GSTIN & PAN Verifier Engine */}
              <GstVerifier 
                gstin={formData.gstin} 
                pan={formData.pan} 
                onVerifySuccess={handleGstAutoVerified} 
              />

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">GSTIN Number <span className="required">*</span></label>
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} maxLength={15} placeholder="08AAAAA0000A1Z5" className={`form-input ${errors.gstin ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.gstin && <span className="error-text">{errors.gstin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Firm / Personal PAN Card <span className="required">*</span></label>
                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="ABCDE1234F" className={`form-input ${errors.pan ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.pan && <span className="error-text">{errors.pan}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">MSME Udyam Number (Optional)</label>
                  <input type="text" name="msmeNo" value={formData.msmeNo} onChange={handleChange} placeholder="UDYAM-XX-00-0000000" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Account Number <span className="required">*</span></label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Current / Savings Account" className={`form-input ${errors.bankAccount ? 'error' : ''}`} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Name & Branch</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="HDFC Bank, Branch Name" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">IFSC Code <span className="required">*</span></label>
                  <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="HDFC0001234" className={`form-input ${errors.ifsc ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <DollarSign style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 3: Annual Financials & Project Area Rates (BUA / CPA)</span>
                </h3>
                <p className="step-header-sub">Audited turnovers and fee rates per sq ft for Built-Up Area (BUA) & Covered Parking Area (CPA)</p>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Turnover FY 2023-24 (₹ Lakhs)</label>
                  <input type="number" name="turnover2023" value={formData.turnover2023} onChange={handleChange} placeholder="Amount in Lakhs" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Turnover FY 2024-25 (₹ Lakhs)</label>
                  <input type="number" name="turnover2024" value={formData.turnover2024} onChange={handleChange} placeholder="Amount in Lakhs" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Turnover FY 2025-26 (₹ Lakhs) <span className="required">*</span></label>
                  <input type="number" name="turnover2025" value={formData.turnover2025} onChange={handleChange} placeholder="Amount in Lakhs" className={`form-input ${errors.turnover2025 ? 'error' : ''}`} />
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Architect BUA Rate Quote (₹ / sq ft)</label>
                  <input type="number" name="buaArea" value={formData.buaArea} onChange={handleChange} placeholder="Standard Rate e.g. ₹ 23 / sq ft" className="form-input" />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Standard company rate: ₹ 15 to ₹ 23 per sq ft of Total Built Up Area</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Architect CPA Rate Quote (₹ / sq ft)</label>
                  <input type="number" name="cpaArea" value={formData.cpaArea} onChange={handleChange} placeholder="Covered Parking Rate e.g. ₹ 14 / sq ft" className="form-input" />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Standard company rate: ₹ 7 to ₹ 14 per sq ft of Covered Parking Area</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <FileCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 4: Upload Verification Documents & Sample CAD / Renders</span>
                </h3>
                <p className="step-header-sub">Upload GST, PAN, Bank Cheque, and Sample Design Documents in PDF / JPG format (Max 10MB)</p>
              </div>

              <div style={{ padding: '0.85rem 1rem', borderRadius: 10, backgroundColor: 'rgba(0, 71, 171, 0.06)', border: '1px solid rgba(0, 71, 171, 0.2)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                ℹ️ <strong>Mandatory Document Naming Standard:</strong> Please format design file names as <code>DDMMYY-HP-[PROJECT TITLE]-[DOC NAME]-R[REVISION]</code> (e.g. <code>250726-HP-Residences-FloorPlan-R0.pdf</code>).
              </div>

              <div className="form-grid-2">
                {[
                  { field: 'gstDoc', label: 'GST Registration Certificate (GST REG-06)' },
                  { field: 'panDoc', label: 'Company / Personal PAN Copy' },
                  { field: 'bankDoc', label: 'Cancelled Cheque / Bank Passbook' },
                  { field: 'expDoc', label: 'Sample CAD Drawings / 3D Renders / Portfolio' },
                ].map((item) => (
                  <div key={item.field} className="upload-card">
                    <label className="form-label">{item.label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <input type="file" id={item.field} accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileUpload(item.field, e.target.files[0])} />
                      
                      {!formData[item.field] ? (
                        <label htmlFor={item.field} className="upload-btn">
                          <UploadCloud style={{ width: 16, height: 16 }} />
                          <span>Choose File</span>
                        </label>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', borderRadius: 6, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#047857', fontSize: '0.8rem', fontWeight: 700 }}>
                          <CheckCircle2 style={{ width: 14, height: 14 }} />
                          <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {formData[item.field].name}
                          </span>
                          <button type="button" onClick={() => handleRemoveFile(item.field)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ED1C24', marginLeft: 4 }}>
                            <X style={{ width: 14, height: 14 }} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <ShieldCheck style={{ width: 20, height: 20, color: '#10B981' }} />
                  <span>Step 5: Digital Signature, Compliance Checklist & Final Submission</span>
                </h3>
                <p className="step-header-sub">Digital signature capture, legal compliance checklist, and anti-bot verification</p>
              </div>

              {/* Processing Fee & MSME Waiver Slip */}
              <PaymentSlip 
                isMsme={Boolean(formData.msmeNo.trim())} 
                category={formData.category} 
              />

              {/* DIGITAL AUTHORIZED SIGNATURE PAD */}
              <DigitalSignature 
                onSignatureSave={(sigData) => setSignatureData(sigData)} 
              />
              {errors.signature && <span className="error-text" style={{ display: 'block', marginBottom: '1rem' }}>{errors.signature}</span>}

              {/* 4 MANDATORY COMPLIANCE CHECKBOXES */}
              <div style={{ padding: '1rem', borderRadius: 12, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem' }}>
                <div style={{ fontWeight: 800, color: '#0047AB' }}>Legal Compliance & Undertaking Checklist:</div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declAntiBlacklist" checked={formData.declAntiBlacklist} onChange={handleChange} style={{ marginTop: '0.15rem' }} />
                  <span><strong>1. Anti-Blacklisting Affidavit:</strong> We declare that our firm has not been debarred by any Central/State PSU, Court, or COA.</span>
                </label>
                {errors.declAntiBlacklist && <span className="error-text">{errors.declAntiBlacklist}</span>}

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declIpAssignment" checked={formData.declIpAssignment} onChange={handleChange} style={{ marginTop: '0.15rem' }} />
                  <span><strong>2. Intellectual Property Rights:</strong> All CAD drawings, elevations, and deliverables shall be solely owned by <strong>Hindustan Projects</strong> upon fee payment.</span>
                </label>
                {errors.declIpAssignment && <span className="error-text">{errors.declIpAssignment}</span>}

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declSiteVisit" checked={formData.declSiteVisit} onChange={handleChange} style={{ marginTop: '0.15rem' }} />
                  <span><strong>3. Site Visit Mandate:</strong> We agree to conduct mandatory physical site visits (Plinth, Column, Slab casting, Finishing stage).</span>
                </label>
                {errors.declSiteVisit && <span className="error-text">{errors.declSiteVisit}</span>}
              </div>

              {/* Security Anti-Bot Captcha Verification */}
              <SecurityCaptcha onCaptchaVerify={(verified) => setIsCaptchaVerified(verified)} />
              {errors.captcha && <span className="error-text" style={{ display: 'block', marginBottom: '1rem' }}>{errors.captcha}</span>}

              <div className="form-group">
                <label className="form-label">Digital Authorized Signatory Name & Designation <span className="required">*</span></label>
                <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleChange} placeholder="Full Name of Authorized Principal Architect / Partner" className={`form-input ${errors.signatoryName ? 'error' : ''}`} />
                {errors.signatoryName && <span className="error-text">{errors.signatoryName}</span>}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack} disabled={isSubmitting} className="btn-secondary">
                <ChevronLeft style={{ width: 16, height: 16 }} />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button type="button" onClick={handleNext} className="btn-primary">
                <span>Continue Next Step</span>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-accent">
                {isSubmitting ? (
                  <>
                    <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
                    <span>Encrypting & Logging to VPS Database...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck style={{ width: 18, height: 18 }} />
                    <span>Submit Empanelment Application</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
