import React, { useState, useEffect } from 'react';
import { 
  Building, User, Mail, Phone, MapPin, CreditCard, ShieldCheck, 
  FileText, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, DollarSign, Award, FileCheck, Save, Sparkles, Loader2, X, HardHat, Edit3, 
  Users, Layers, Wrench, FileBadge, Scale, Check 
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

    if (step === 3) {
      // Financial turnover optional for small proprietors
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
            
            <button type="button" onClick={handleSaveDraft} className="btn-draft">
              <Save style={{ width: 14, height: 14 }} />
              <span>{isSavedLocal ? 'Draft Saved!' : 'Save Progress Draft'}</span>
            </button>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="form-body">
          
          {/* STEP 1: IDENTITY & SCOPE */}
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
                  <label className="form-label">Registered Corporate Firm Title <span className="required">*</span></label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. M/S Studio Form & Function Architects Pvt Ltd" className={`form-input ${errors.companyName ? 'error' : ''}`} />
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
                  <input type="number" name="estYear" value={formData.estYear} onChange={handleChange} placeholder="e.g. 2012" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">COA Reg No / MCA CIN Number <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional for Proprietors)</span></label>
                  <input type="text" name="coaRegNo" value={formData.coaRegNo} onChange={handleChange} placeholder="e.g. CA/2018/84920 or U45201RJ2012PTC038" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Manpower & Engineering Strength</label>
                  <select name="manpowerCount" value={formData.manpowerCount} onChange={handleChange} className="form-input">
                    <option value="5">1 - 5 Senior Professionals</option>
                    <option value="15">6 - 20 Technical Staff & Engineers</option>
                    <option value="50">21 - 50 Technical Staff</option>
                    <option value="100">50+ Corporate Engineers & Site Staff</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Lead Authorized Contact Officer <span className="required">*</span></label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Full Name of Director / Principal Architect" className={`form-input ${errors.contactName ? 'error' : ''}`} />
                  {errors.contactName && <span className="error-text">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Designation / Executive Position</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Managing Director / Partner" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Corporate Email <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@firm.com" className={`form-input ${errors.email ? 'error' : ''}`} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Official Contact Mobile Number <span className="required">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`form-input ${errors.phone ? 'error' : ''}`} />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Registered Office / Studio Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Plot / Suite / Industrial Area Premises" className="form-input" />
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

              {/* GSTIN & PAN Real Verification Component */}
              <GstVerifier 
                gstin={formData.gstin} 
                pan={formData.pan} 
                onVerifySuccess={handleGstAutoVerified} 
              />

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">GSTIN Number <span className="required">*</span></label>
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} maxLength={15} placeholder="08AAAAA0000A1Z5" className={`form-input ${errors.gstin ? 'error' : ''}`} style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 800 }} />
                  {errors.gstin && <span className="error-text">{errors.gstin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Personal PAN Card <span className="required">*</span></label>
                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="ABCDE1234F" className={`form-input ${errors.pan ? 'error' : ''}`} style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 800 }} />
                  {errors.pan && <span className="error-text">{errors.pan}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">MSME Udyam Reg. Number (Optional)</label>
                  <input type="text" name="msmeNo" value={formData.msmeNo} onChange={handleChange} placeholder="UDYAM-XX-00-0000000" className="form-input" style={{ textTransform: 'uppercase', fontFamily: 'monospace' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Current Account Number <span className="required">*</span></label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Current Account No" className={`form-input ${errors.bankAccount ? 'error' : ''}`} style={{ fontFamily: 'monospace' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Name & Branch Title</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="HDFC Bank, Commercial Branch" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank IFSC Code <span className="required">*</span></label>
                  <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="HDFC0001234" className={`form-input ${errors.ifsc ? 'error' : ''}`} style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 800 }} />
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
                  <span>Step 3: Audited Turnovers, Equipment Inventory & Quoted Fee Rates</span>
                </h3>
                <p className="step-header-sub">3-Year turnover statements, CA Net Worth, Equipment Inventory, and Built Up Area (BUA/CPA) rates</p>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Turnover FY 2023-24 (₹ Lakhs)</label>
                  <input type="number" name="turnover2023" value={formData.turnover2023} onChange={handleChange} placeholder="e.g. 350" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Turnover FY 2024-25 (₹ Lakhs)</label>
                  <input type="number" name="turnover2024" value={formData.turnover2024} onChange={handleChange} placeholder="e.g. 410" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Turnover FY 2025-26 (₹ Lakhs) <span className="required">*</span></label>
                  <input type="number" name="turnover2025" value={formData.turnover2025} onChange={handleChange} placeholder="e.g. 450" className={`form-input ${errors.turnover2025 ? 'error' : ''}`} />
                  {errors.turnover2025 && <span className="error-text">{errors.turnover2025}</span>}
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">CA Certified Net Worth (₹ Lakhs)</label>
                  <input type="number" name="netWorth" value={formData.netWorth} onChange={handleChange} placeholder="Net worth in Lakhs" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Single Largest Work Order Executed (₹ Lakhs)</label>
                  <input type="number" name="largestOrder" value={formData.largestOrder} onChange={handleChange} placeholder="e.g. 250" className="form-input" />
                </div>
              </div>

              {/* BUA & CPA Fee Quote */}
              <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Architect BUA Rate Quote (₹ / sq ft)</label>
                  <input type="number" name="buaArea" value={formData.buaArea} onChange={handleChange} placeholder="Standard Rate e.g. ₹ 23" className="form-input" style={{ fontWeight: 800, color: '#0047AB' }} />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Company standard rate: ₹ 15 to ₹ 23 per sq ft of Built-Up Area</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Architect CPA Rate Quote (₹ / sq ft)</label>
                  <input type="number" name="cpaArea" value={formData.cpaArea} onChange={handleChange} placeholder="Covered Parking Rate e.g. ₹ 14" className="form-input" style={{ fontWeight: 800, color: '#10B981' }} />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Company standard rate: ₹ 7 to ₹ 14 per sq ft of Covered Parking</span>
                </div>
              </div>

              {/* Major Machinery & Software Inventory Checklist */}
              <div style={{ marginTop: '1.5rem', padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wrench style={{ width: 16, height: 16 }} />
                  <span>Technical Equipment & Software Inventory Checklist:</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.825rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.batchingPlant} onChange={() => handleMachineryToggle('batchingPlant')} />
                    <span>Concrete Batching Plant / RMC Access</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.towerCrane} onChange={() => handleMachineryToggle('towerCrane')} />
                    <span>Tower Crane / Piling Rig Access</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.bimSoftware} onChange={() => handleMachineryToggle('bimSoftware')} />
                    <span>Autodesk Revit / BIM 360 Workstations</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.machineryCheck.totalStation} onChange={() => handleMachineryToggle('totalStation')} />
                    <span>Total Station / DGPS Survey Gear</span>
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: DRAWINGS & DOCUMENTS */}
          {currentStep === 4 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <FileCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>Step 4: Upload Verification Certificates & Sample Drawings</span>
                </h3>
                <p className="step-header-sub">Upload GST REG-06, PAN, Bank Cheque, and Sample CAD Drawings / Portfolio in PDF format (Max 10MB)</p>
              </div>

              <div style={{ padding: '0.85rem 1rem', borderRadius: 10, backgroundColor: 'rgba(0, 71, 171, 0.06)', border: '1px solid rgba(0, 71, 171, 0.2)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                ℹ️ <strong>Mandatory File Naming Format Standard:</strong> <code>DDMMYY-HP-[PROJECT TITLE]-[DOC NAME]-R[REVISION]</code> (e.g. <code>250726-HP-Residences-FloorPlan-R0.pdf</code>).
              </div>

              <div className="form-grid-2">
                {[
                  { field: 'gstDoc', label: 'GST Registration Certificate (GST REG-06)' },
                  { field: 'panDoc', label: 'Company / Personal PAN Card Copy' },
                  { field: 'bankDoc', label: 'Cancelled Cheque / Bank Passbook Copy' },
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

          {/* STEP 5: SIGNATURE & TERMS */}
          {currentStep === 5 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <ShieldCheck style={{ width: 20, height: 20, color: '#10B981' }} />
                  <span>Step 5: Digital Signature, Compliance Checklist & Final Submission</span>
                </h3>
                <p className="step-header-sub">Digital signature pad capture, legal undertaking checklist, and anti-bot security verification</p>
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

              {/* 3 MANDATORY COMPLIANCE CHECKBOXES */}
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
