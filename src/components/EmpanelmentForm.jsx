import React, { useState, useEffect } from 'react';
import { 
  Building, User, Mail, Phone, MapPin, CreditCard, ShieldCheck, 
  FileText, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, DollarSign, Award, FileCheck, Save, Sparkles, Loader2, X, HardHat, Edit3, 
  Users, Layers, Wrench, FileBadge, Scale, Check, Zap 
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

const DEFAULT_CATEGORIES = [
  { id: 'consultants', label: 'Architects & BIM Engineering Consultants' },
  { id: 'civil', label: 'Civil & Structural Engineering Contractors' },
  { id: 'mep', label: 'MEP, HVAC & Electrical System Services' },
  { id: 'suppliers', label: 'Material & Construction Goods Suppliers' },
  { id: 'equipment', label: 'Heavy Machinery & Crane Rentals' },
  { id: 'site_services', label: 'Facility & PMC Site Services' },
  { id: 'interior', label: 'Interior Designers & Turnkey Decorators' },
  { id: 'fire', label: 'Fire Protection & Safety Engineers' },
  { id: 'soil', label: 'Geotechnical & Soil Testing Labs' },
  { id: 'solar', label: 'Solar & Renewable Energy Integrators' }
];

export default function EmpanelmentForm({ category, onFormSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  
  const [availableCategories, setAvailableCategories] = useState(() => {
    const saved = localStorage.getItem('hipro_custom_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [formData, setFormData] = useState({
    category: category || 'civil',
    primaryRole: 'arch',
    companyName: '',
    entityType: 'pvt_ltd',
    estYear: '',
    cinNo: '',
    coaRegNo: '',
    experienceYears: '',
    manpowerCount: '15',
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
    epfNo: '',
    msmeNo: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',
    netWorth: '',
    solvencyLimit: '',
    turnover2023: '',
    turnover2024: '',
    turnover2025: '',
    largestOrder: '',
    buaArea: '23',
    cpaArea: '14',
    machineryCheck: { batchingPlant: true, towerCrane: false, bimSoftware: true, totalStation: true },
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

  const handleMachineryToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      machineryCheck: {
        ...prev.machineryCheck,
        [key]: !prev.machineryCheck[key]
      }
    }));
  };

  // 1-Click Quick Auto Fill Sample Data
  const handleQuickAutoFill = () => {
    setFormData({
      category: category || 'civil',
      primaryRole: 'arch',
      companyName: 'Apex Infrastructure & Engineering Pvt Ltd',
      entityType: 'pvt_ltd',
      estYear: '2015',
      cinNo: 'U45201RJ2015PTC038',
      coaRegNo: 'CA/2018/84920',
      experienceYears: '11',
      manpowerCount: '15',
      contactName: 'Rajesh Sharma',
      designation: 'Managing Director',
      email: 'rajesh@apexinfra.com',
      phone: '9876543210',
      address: 'Plot 45, Industrial Area Phase-2',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302013',
      gstin: '08AAAAA0000A1Z5',
      pan: 'ABCDE1234F',
      epfNo: 'RJ/JPR/0048192/000',
      msmeNo: 'UDYAM-RJ-14-0028491',
      bankAccount: '50200088991200',
      ifsc: 'HDFC0001234',
      bankName: 'HDFC Bank, Ashok Nagar Branch',
      netWorth: '450',
      solvencyLimit: '250',
      turnover2023: '380',
      turnover2024: '410',
      turnover2025: '450',
      largestOrder: '250',
      buaArea: '23',
      cpaArea: '14',
      machineryCheck: { batchingPlant: true, towerCrane: true, bimSoftware: true, totalStation: true },
      gstDoc: null,
      panDoc: null,
      bankDoc: null,
      expDoc: null,
      declAntiBlacklist: true,
      declIpAssignment: true,
      declSiteVisit: true,
      declDocNaming: true,
      signatoryName: 'Rajesh Sharma (MD)',
    });
    setIsCaptchaVerified(true);
    setErrors({});
  };

  // 1-Click Accept All Legal Terms
  const handleAcceptAllTerms = () => {
    setFormData(prev => ({
      ...prev,
      declAntiBlacklist: true,
      declIpAssignment: true,
      declSiteVisit: true,
      declDocNaming: true,
      signatoryName: prev.signatoryName || prev.contactName || 'Authorized Signatory'
    }));
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
      if (!formData.companyName.trim()) newErrors.companyName = 'Official Corporate or Proprietor Title is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Lead Professional / Proprietor Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid Email Address is required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit Mobile Number is required';
    }

    if (step === 2) {
      // Allow sole proprietors to pass even without 15-character GSTIN
      if (!formData.gstin.trim() && formData.entityType !== 'proprietorship') {
        newErrors.gstin = '15-character GSTIN is required (or select Sole Proprietorship for exemption)';
      }
      if (!formData.pan.trim() || formData.pan.length < 10) {
        newErrors.pan = '10-character PAN Card is required';
      }
    }

    if (step === 5) {
      if (!formData.declAntiBlacklist) newErrors.declAntiBlacklist = 'You must confirm the Anti-Blacklisting Affidavit';
      if (!formData.declIpAssignment) newErrors.declIpAssignment = 'You must confirm the Intellectual Property Assignment clause';
      if (!formData.declSiteVisit) newErrors.declSiteVisit = 'You must confirm the Mandatory Site Visit Undertaking';
      if (!formData.signatoryName.trim()) newErrors.signatoryName = 'Authorized Digital Signatory Name is required';
      if (!signatureData) newErrors.signature = 'Please draw your digital signature on the pad before submitting';
      if (!isCaptchaVerified) newErrors.captcha = 'Please solve the Security Math Challenge before submitting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFormTop = () => {
    const el = document.getElementById('empanelment-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      scrollToFormTop();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToFormTop();
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
        } else if (typeof formData[key] === 'object' && formData[key] !== null) {
          dataPayload.append(key, JSON.stringify(formData[key]));
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
    { num: 1, title: 'Identity & Scope', icon: Building },
    { num: 2, title: 'GST & Compliance', icon: CreditCard },
    { num: 3, title: 'Financials & Equipment', icon: DollarSign },
    { num: 4, title: 'Drawings & Documents', icon: FileCheck },
    { num: 5, title: 'Signature & Terms', icon: ShieldCheck },
  ];

  const progressPercent = currentStep * 20;

  return (
    <div id="empanelment-form-container" className="form-container">
      <div className="form-card">
        
        {/* Top Corporate Banner */}
        <div className="form-header-banner">
          <div className="form-header-top">
            <div>
              <div className="form-header-tag">🏛️ Official Corporate Empanelment System • {progressPercent}% Completed</div>
              <h2 className="form-header-title">Hindustan Projects Empanelment Portal</h2>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button type="button" onClick={handleQuickAutoFill} className="btn-draft" style={{ backgroundColor: '#F59E0B', color: 'black' }}>
                <Zap style={{ width: 14, height: 14 }} />
                <span>⚡ Auto-Fill Demo</span>
              </button>

              <button type="button" onClick={handleSaveDraft} className="btn-draft">
                <Save style={{ width: 14, height: 14 }} />
                <span>{isSavedLocal ? 'Draft Saved!' : 'Save Progress Draft'}</span>
              </button>
            </div>
          </div>

          {/* Step Progress Navigation Bar */}
          <div className="progress-nav">
            {stepsList.map((st) => {
              const Icon = st.icon;
              const isActive = currentStep === st.num;
              const isDone = currentStep > st.num;

              return (
                <div 
                  key={st.num}
                  onClick={() => {
                    if (isDone || st.num < currentStep) {
                      setCurrentStep(st.num);
                      scrollToFormTop();
                    }
                  }}
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

        {/* Form Main Body */}
        <form onSubmit={handleSubmit} className="form-body">
          
          {/* STEP 1: IDENTITY & PROFESSIONAL SCOPE */}
          {currentStep === 1 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <Building style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 1: Professional Scope & Corporate Firm Profile</span>
                </h3>
                <p className="step-header-sub">Select professional discipline and enter official registration credentials as per COA / MCA / Council of Engineers</p>
              </div>

              <div className="form-grid-2">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Professional Discipline / Scope of Work <span className="required">*</span></label>
                  <select name="primaryRole" value={formData.primaryRole} onChange={handleChange} className="form-input" style={{ fontWeight: 800, color: '#0047AB' }}>
                    {DISCIPLINE_ROLES.map(r => (
                      <option key={r.code} value={r.code}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Empanelment Business Category <span className="required">*</span></label>
                  <select name="category" value={formData.category} onChange={handleChange} className="form-input" style={{ fontWeight: 700 }}>
                    {availableCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Corporate Firm / Proprietor Title <span className="required">*</span></label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. M/S Studio Form & Function Architects or Apex Infra" className={`form-input ${errors.companyName ? 'error' : ''}`} />
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
                  <label className="form-label">Year of Incorporation / Establishment <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="number" name="estYear" value={formData.estYear} onChange={handleChange} placeholder="e.g. 2015" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">COA Reg No / MCA CIN Number <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional for Proprietors)</span></label>
                  <input type="text" name="coaRegNo" value={formData.coaRegNo} onChange={handleChange} placeholder="e.g. CA/2018/84920 or U45201RJ2012PTC038" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Manpower Strength</label>
                  <select name="manpowerCount" value={formData.manpowerCount} onChange={handleChange} className="form-input">
                    <option value="5">1 - 5 Senior Professionals</option>
                    <option value="15">6 - 20 Technical Staff & Engineers</option>
                    <option value="50">21 - 50 Technical Staff</option>
                    <option value="100">50+ Corporate Engineers & Site Staff</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Lead Contact / Proprietor Name <span className="required">*</span></label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Full Name of Director / Proprietor" className={`form-input ${errors.contactName ? 'error' : ''}`} />
                  {errors.contactName && <span className="error-text">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Designation / Executive Position <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Managing Director / Proprietor" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Contact Email <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@firm.com" className={`form-input ${errors.email ? 'error' : ''}`} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Mobile Number <span className="required">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`form-input ${errors.phone ? 'error' : ''}`} />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Registered Office / Studio Address <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Plot / Suite / Industrial Area Premises" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">City <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Jaipur" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">State <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Rajasthan" className="form-input" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GST & COMPLIANCE */}
          {currentStep === 2 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <CreditCard style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 2: Statutory Tax Compliance & Payout Banking Credentials</span>
                </h3>
                <p className="step-header-sub">GSTIN, PAN Card, MSME Udyam Exemption, and Current Account Payout Bank Details</p>
              </div>

              <GstVerifier 
                gstin={formData.gstin} 
                pan={formData.pan} 
                onVerifySuccess={handleGstAutoVerified} 
              />

              <div className="form-grid-2" style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">15-Digit GSTIN Registration <span className="required">*</span></label>
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="e.g. 08AAAAA0000A1Z5 or EXEMPTED" className={`form-input ${errors.gstin ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.gstin && <span className="error-text">{errors.gstin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">10-Digit Company PAN Card <span className="required">*</span></label>
                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="e.g. ABCDE1234F" className={`form-input ${errors.pan ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.pan && <span className="error-text">{errors.pan}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">MSME Udyam Registration No <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="msmeNo" value={formData.msmeNo} onChange={handleChange} placeholder="e.g. UDYAM-RJ-14-0028491" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Current / Savings Account No <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="e.g. 50200088991200" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank IFSC Code <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="e.g. HDFC0001234" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Branch Title <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank, Jaipur Branch" className="form-input" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FINANCIALS & EQUIPMENT */}
          {currentStep === 3 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <DollarSign style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 3: Audited Financials, Rate Quotations & Equipment Checklist</span>
                </h3>
                <p className="step-header-sub">Enter 3-year turnover in Lakhs INR and area fee rates as per official empanelment schedule</p>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">FY 2023-24 Audited Turnover <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="number" name="turnover2023" value={formData.turnover2023} onChange={handleChange} placeholder="₹ Lakhs" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">FY 2024-25 Audited Turnover <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="number" name="turnover2024" value={formData.turnover2024} onChange={handleChange} placeholder="₹ Lakhs" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">FY 2025-26 Audited Turnover <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="number" name="turnover2025" value={formData.turnover2025} onChange={handleChange} placeholder="₹ Lakhs" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Single Largest Executed Order <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                  <input type="number" name="largestOrder" value={formData.largestOrder} onChange={handleChange} placeholder="₹ Lakhs" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Quoted Built-Up Area (BUA) Rate</label>
                  <input type="text" name="buaArea" value={formData.buaArea} onChange={handleChange} placeholder="₹ 15 - ₹ 23 / sq ft" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Quoted Covered Plot Area (CPA) Rate</label>
                  <input type="text" name="cpaArea" value={formData.cpaArea} onChange={handleChange} placeholder="₹ 7 - ₹ 14 / sq ft" className="form-input" />
                </div>
              </div>

              {/* Equipment Inventory Checklist */}
              <div style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0047AB' }}>
                  Machinery, Equipment & Software Inventory Checklist (Optional):
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.batchingPlant} onChange={() => handleMachineryToggle('batchingPlant')} />
                    <span>Concrete Batching Plant / RMC</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.towerCrane} onChange={() => handleMachineryToggle('towerCrane')} />
                    <span>Tower Cranes & Piling Rigs</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.bimSoftware} onChange={() => handleMachineryToggle('bimSoftware')} />
                    <span>BIM / REVIT 3D Software</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.totalStation} onChange={() => handleMachineryToggle('totalStation')} />
                    <span>Total Station Survey Rig</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DRAWINGS & DOCUMENTS UPLOAD */}
          {currentStep === 4 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <FileCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 4: Verification Documents Upload (Optional)</span>
                </h3>
                <p className="step-header-sub">Mandatory Document Naming Standard: <code>DDMMYY-HP-[PROJECT TITLE]-[DOC NAME]-R[REV]</code></p>
              </div>

              <div className="form-grid-2">
                <div className="upload-card">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>GST REG-06 Certificate (PDF)</div>
                  {formData.gstDoc ? (
                    <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>
                      ✓ {formData.gstDoc.name}
                      <button type="button" onClick={() => handleRemoveFile('gstDoc')} style={{ marginLeft: 8, color: '#ED1C24', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="upload-btn">
                      <UploadCloud style={{ width: 14, height: 14 }} />
                      <span>Upload GST REG-06</span>
                      <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileUpload('gstDoc', e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>

                <div className="upload-card">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Company PAN Card Copy (PDF/JPG)</div>
                  {formData.panDoc ? (
                    <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>
                      ✓ {formData.panDoc.name}
                      <button type="button" onClick={() => handleRemoveFile('panDoc')} style={{ marginLeft: 8, color: '#ED1C24', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="upload-btn">
                      <UploadCloud style={{ width: 14, height: 14 }} />
                      <span>Upload PAN Card Copy</span>
                      <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileUpload('panDoc', e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>

                <div className="upload-card">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Cancelled Bank Cheque Copy (PDF/JPG)</div>
                  {formData.bankDoc ? (
                    <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>
                      ✓ {formData.bankDoc.name}
                      <button type="button" onClick={() => handleRemoveFile('bankDoc')} style={{ marginLeft: 8, color: '#ED1C24', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="upload-btn">
                      <UploadCloud style={{ width: 14, height: 14 }} />
                      <span>Upload Bank Cheque</span>
                      <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileUpload('bankDoc', e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>

                <div className="upload-card">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>CAD Portfolio / Work Orders (PDF)</div>
                  {formData.expDoc ? (
                    <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>
                      ✓ {formData.expDoc.name}
                      <button type="button" onClick={() => handleRemoveFile('expDoc')} style={{ marginLeft: 8, color: '#ED1C24', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="upload-btn">
                      <UploadCloud style={{ width: 14, height: 14 }} />
                      <span>Upload CAD Portfolio</span>
                      <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileUpload('expDoc', e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: DIGITAL SIGNATURE & LEGAL TERMS */}
          {currentStep === 5 && (
            <div>
              <div className="step-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="step-header-title">
                    <ShieldCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                    <span>Step 5: Digital Signature Pad & Legal Undertakings</span>
                  </h3>
                  <p className="step-header-sub">Draw digital signature on canvas pad and confirm legal IP assignment & anti-blacklisting affidavit</p>
                </div>

                <button type="button" onClick={handleAcceptAllTerms} className="btn-secondary" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                  <span>Accept All Terms (1-Click)</span>
                </button>
              </div>

              {/* Digital Signature Pad */}
              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Authorized Signatory Digital Canvas <span className="required">*</span></label>
                <DigitalSignature 
                  onSaveSignature={(data) => {
                    setSignatureData(data);
                    if (errors.signature) setErrors(prev => ({ ...prev, signature: null }));
                  }}
                />
                {errors.signature && <span className="error-text">{errors.signature}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Signatory Authorized Full Name <span className="required">*</span></label>
                <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleChange} placeholder="e.g. Rajesh Sharma (MD / Proprietor)" className={`form-input ${errors.signatoryName ? 'error' : ''}`} />
                {errors.signatoryName && <span className="error-text">{errors.signatoryName}</span>}
              </div>

              {/* Legal Checkboxes */}
              <div style={{ padding: '1.25rem', borderRadius: 16, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declAntiBlacklist" checked={formData.declAntiBlacklist} onChange={handleChange} style={{ marginTop: 3 }} />
                  <span>I hereby solemnly affirm that our organization has NOT been blacklisted by CPWD, PWD, Railway, or any PSU / Private Developer.</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declIpAssignment" checked={formData.declIpAssignment} onChange={handleChange} style={{ marginTop: 3 }} />
                  <span>I agree to assign all CAD/3D architectural drawings and intellectual property created for Hindustan Projects exclusively to Hindustan Projects.</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="declSiteVisit" checked={formData.declSiteVisit} onChange={handleChange} style={{ marginTop: 3 }} />
                  <span>I confirm commitment to minimum 2 mandatory physical site visits per month during active project construction.</span>
                </label>
              </div>

              {/* Security Captcha Challenge */}
              <SecurityCaptcha onVerify={setIsCaptchaVerified} />
              {errors.captcha && <span className="error-text">{errors.captcha}</span>}
            </div>
          )}

          {/* Form Wizard Action Buttons */}
          <div className="form-actions">
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack} className="btn-secondary">
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
              <button type="submit" disabled={isSubmitting} className="btn-accent" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                {isSubmitting ? (
                  <>
                    <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
                    <span>Encrypting & Filing Application...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck style={{ width: 18, height: 18 }} />
                    <span>Submit Official Registration</span>
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
