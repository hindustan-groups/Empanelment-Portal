import React, { useState, useEffect } from 'react';
import { 
  Building, User, Mail, Phone, MapPin, CreditCard, ShieldCheck, 
  FileText, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, DollarSign, Award, FileCheck, Save, Sparkles, Loader2 
} from 'lucide-react';
import GstVerifier from './GstVerifier';

export default function EmpanelmentForm({ category, onFormSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: category || 'civil',
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
    gstDoc: null,
    panDoc: null,
    bankDoc: null,
    expDoc: null,
    isDeclared: false,
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
    setFormData(prev => ({
      ...prev,
      [fieldName]: file || null
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
      if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact Person Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid Email Address is required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit Phone Number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
    }

    if (step === 2) {
      if (!formData.gstin.trim() || formData.gstin.length < 15) newErrors.gstin = 'Valid 15-character GSTIN is required';
      if (!formData.pan.trim() || formData.pan.length < 10) newErrors.pan = 'Valid 10-character PAN is required';
      if (!formData.bankAccount.trim()) newErrors.bankAccount = 'Bank Account Number is required';
      if (!formData.ifsc.trim()) newErrors.ifsc = 'Bank IFSC Code is required';
    }

    if (step === 3) {
      if (!formData.turnover2025.trim()) newErrors.turnover2025 = 'Turnover for FY 2025-26 is required';
    }

    if (step === 5) {
      if (!formData.isDeclared) newErrors.isDeclared = 'You must check the anti-blacklisting declaration box';
      if (!formData.signatoryName.trim()) newErrors.signatoryName = 'Authorized Signatory Name is required';
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

      const response = await fetch(`${backendUrl}/api/empanelment/submit`, {
        method: 'POST',
        body: dataPayload
      });

      const result = await response.json();
      if (result.success) {
        onFormSubmit(formData, result.trackingId);
      } else {
        onFormSubmit(formData);
      }
    } catch (err) {
      console.warn('Using fallback submission:', err);
      onFormSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Company Profile', icon: Building },
    { num: 2, title: 'GST & Legal', icon: CreditCard },
    { num: 3, title: 'Turnovers', icon: DollarSign },
    { num: 4, title: 'Documents', icon: FileCheck },
    { num: 5, title: 'Declaration', icon: ShieldCheck },
  ];

  const progressPercent = currentStep * 20;

  return (
    <div id="empanelment-form-container" className="form-container">
      <div className="form-card">
        
        {/* Banner */}
        <div className="form-header-banner">
          <div className="form-header-top">
            <div>
              <div className="form-header-tag">✨ PRO Empanelment Wizard • {progressPercent}% Completed</div>
              <h2 className="form-header-title">Hindustan Projects Vendor Portal</h2>
            </div>
            
            <button type="button" onClick={handleSaveDraft} className="btn-draft">
              <Save style={{ width: 14, height: 14 }} />
              <span>{isSavedLocal ? 'Draft Saved!' : 'Save Progress'}</span>
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
                  <span>Step 1: Company Profile & Basic Details</span>
                </h3>
                <p className="step-header-sub">Enter registered business identity and main contact officer</p>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category <span className="required">*</span></label>
                  <select name="category" value={formData.category} onChange={handleChange} className="form-input">
                    <option value="civil">Civil & Structural Contractors</option>
                    <option value="mep">MEP & Electrical Services</option>
                    <option value="suppliers">Material & Goods Suppliers</option>
                    <option value="consultants">Architects & Engineering Consultants</option>
                    <option value="equipment">Machinery & Heavy Equipment</option>
                    <option value="site_services">Facility & Site Logistics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Company Name <span className="required">*</span></label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. M/S Apex Infrastructure Pvt Ltd" className={`form-input ${errors.companyName ? 'error' : ''}`} />
                  {errors.companyName && <span className="error-text">{errors.companyName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Entity Type</label>
                  <select name="entityType" value={formData.entityType} onChange={handleChange} className="form-input">
                    <option value="pvt_ltd">Private Limited Company</option>
                    <option value="proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership Firm</option>
                    <option value="llp">LLP</option>
                    <option value="public_ltd">Public Limited Company</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Year of Establishment</label>
                  <input type="number" name="estYear" value={formData.estYear} onChange={handleChange} placeholder="e.g. 2012" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Contact Person <span className="required">*</span></label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Full Name" className={`form-input ${errors.contactName ? 'error' : ''}`} />
                  {errors.contactName && <span className="error-text">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Managing Director / Partner" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vendor@company.com" className={`form-input ${errors.email ? 'error' : ''}`} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number <span className="required">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`form-input ${errors.phone ? 'error' : ''}`} />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Registered Office Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street / Industrial Area" className="form-input" />
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
                  <span>Step 2: Statutory Compliance & Banking Information</span>
                </h3>
                <p className="step-header-sub">Verifiable GSTIN, PAN, and Bank details</p>
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
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} maxLength={15} placeholder="07AAAAA0000A1Z5" className={`form-input ${errors.gstin ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.gstin && <span className="error-text">{errors.gstin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Company PAN Number <span className="required">*</span></label>
                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="ABCDE1234F" className={`form-input ${errors.pan ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.pan && <span className="error-text">{errors.pan}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">MSME / Udyam Number</label>
                  <input type="text" name="msmeNo" value={formData.msmeNo} onChange={handleChange} placeholder="UDYAM-XX-00-0000000" className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Account Number <span className="required">*</span></label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Current Account No" className={`form-input ${errors.bankAccount ? 'error' : ''}`} />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Name & Branch</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="HDFC Bank, Branch" className="form-input" />
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
                  <span>Step 3: Annual Financial Turnover & Work Track Record</span>
                </h3>
                <p className="step-header-sub">Audited turnovers and major project highlights</p>
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
                  <label className="form-label">Single Largest Work Order (₹ Lakhs)</label>
                  <input type="number" name="largestOrder" value={formData.largestOrder} onChange={handleChange} placeholder="e.g. 250 (for ₹ 2.5 Cr)" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Existing Approvals / PSU Registrations</label>
                  <input type="text" name="existingEmpanels" value={formData.existingEmpanels} onChange={handleChange} placeholder="e.g. CPWD, L&T, Railways" className="form-input" />
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
                  <span>Step 4: Upload Verification Certificates</span>
                </h3>
                <p className="step-header-sub">Attachments help accelerate technical committee review</p>
              </div>

              <div className="form-grid-2">
                {[
                  { field: 'gstDoc', label: 'GST Registration Certificate' },
                  { field: 'panDoc', label: 'PAN Card Copy' },
                  { field: 'bankDoc', label: 'Cancelled Cheque / Bank Letter' },
                  { field: 'expDoc', label: 'Work Orders / Completion Certificates' },
                ].map((item) => (
                  <div key={item.field} className="upload-card">
                    <label className="form-label">{item.label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <input type="file" id={item.field} style={{ display: 'none' }} onChange={(e) => handleFileUpload(item.field, e.target.files[0])} />
                      <label htmlFor={item.field} className="upload-btn">
                        <UploadCloud style={{ width: 16, height: 16 }} />
                        <span>Choose File</span>
                      </label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {formData[item.field]?.name || 'No file selected'}
                      </span>
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
                  <span>Step 5: Application Summary & Declaration</span>
                </h3>
                <p className="step-header-sub">Review credentials before final submission</p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 8, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div>Company: <strong>{formData.companyName || 'N/A'}</strong></div>
                  <div>GSTIN: <strong style={{ textTransform: 'uppercase' }}>{formData.gstin || 'N/A'}</strong></div>
                  <div>PAN: <strong style={{ textTransform: 'uppercase' }}>{formData.pan || 'N/A'}</strong></div>
                  <div>Email: <strong>{formData.email}</strong></div>
                </div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 8, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', items: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="checkbox" name="isDeclared" checked={formData.isDeclared} onChange={handleChange} style={{ marginTop: '0.2rem' }} />
                  <span>I hereby declare that all information submitted for <strong>Hindustan Projects</strong> empanelment is true and verifiable. Our entity has not been blacklisted.</span>
                </label>
                {errors.isDeclared && <span className="error-text">{errors.isDeclared}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Authorized Signatory Name <span className="required">*</span></label>
                <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleChange} placeholder="Full Name of Authorized Officer" className={`form-input ${errors.signatoryName ? 'error' : ''}`} />
                {errors.signatoryName && <span className="error-text">{errors.signatoryName}</span>}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack} disabled={isSubmitting} className="btn-secondary">
                <ChevronLeft style={{ width: 16, height: 16 }} />
                <span>Previous</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button type="button" onClick={handleNext} className="btn-primary">
                <span>Continue Next</span>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-accent">
                {isSubmitting ? (
                  <>
                    <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
                    <span>Saving...</span>
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
