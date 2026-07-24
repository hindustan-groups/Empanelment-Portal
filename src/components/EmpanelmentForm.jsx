import React, { useState, useEffect } from 'react';
import { 
  Building, User, Mail, Phone, MapPin, CreditCard, ShieldCheck, 
  FileText, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, 
  AlertCircle, DollarSign, Award, FileCheck, Save, Sparkles 
} from 'lucide-react';

export default function EmpanelmentForm({ category, onFormSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic
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

    // Step 2: Legal
    gstin: '',
    pan: '',
    msmeNo: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',

    // Step 3: Financials
    turnover2023: '',
    turnover2024: '',
    turnover2025: '',
    largestOrder: '',
    existingEmpanels: '',

    // Step 4: Documents (Simulated Files)
    gstDoc: null,
    panDoc: null,
    bankDoc: null,
    expDoc: null,

    // Step 5: Declaration
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
      [fieldName]: file ? file.name : null
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
    localStorage.setItem('hipro_empanel_draft', JSON.stringify(formData));
    setIsSavedLocal(true);
    setTimeout(() => setIsSavedLocal(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(5)) {
      onFormSubmit(formData);
    }
  };

  const stepsList = [
    { num: 1, title: 'Company Details', icon: Building },
    { num: 2, title: 'GST & Compliance', icon: CreditCard },
    { num: 3, title: 'Turnover & Experience', icon: DollarSign },
    { num: 4, title: 'Document Uploads', icon: FileCheck },
    { num: 5, title: 'Review & Undertaking', icon: ShieldCheck },
  ];

  return (
    <div id="empanelment-form-container" className="max-w-5xl mx-auto px-4 sm:px-6 mb-20 scroll-mt-24">
      
      {/* Container Card */}
      <div className="glass-panel overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Card Header Banner */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-[#0047AB] to-slate-900 text-white relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Empanelment Application Form</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hindustan Projects Vendor Portal</h2>
            </div>
            
            <button
              onClick={handleSaveDraft}
              className="self-start md:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white backdrop-blur-sm border border-white/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavedLocal ? 'Draft Saved!' : 'Save Progress Draft'}</span>
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="mt-8 grid grid-cols-5 gap-2">
            {stepsList.map((st) => {
              const Icon = st.icon;
              const isActive = currentStep === st.num;
              const isDone = currentStep > st.num;

              return (
                <div 
                  key={st.num}
                  onClick={() => isDone && setCurrentStep(st.num)}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${isDone ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-[#ED1C24] text-white ring-4 ring-red-500/30' : 'bg-white/20 text-white'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="hidden sm:block text-[11px] font-semibold text-center truncate w-full">{st.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>Step 1: Company Profile & Basic Details</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Enter your registered business identity and main contact officer</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">
                    Empanelment Category <span className="required">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="civil">Civil & Structural Contractors</option>
                    <option value="mep">MEP & Electrical Services</option>
                    <option value="suppliers">Material & Goods Suppliers</option>
                    <option value="consultants">Architects & Engineering Consultants</option>
                    <option value="equipment">Machinery & Heavy Equipment</option>
                    <option value="site_services">Facility & Site Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    Registered Company Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. M/S Apex Infrastructure Pvt Ltd"
                    className={`form-input ${errors.companyName ? 'border-red-500' : ''}`}
                  />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="form-label">Business Constitution / Entity Type</label>
                  <select
                    name="entityType"
                    value={formData.entityType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="pvt_ltd">Private Limited Company</option>
                    <option value="proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership Firm</option>
                    <option value="llp">Limited Liability Partnership (LLP)</option>
                    <option value="public_ltd">Public Limited Company</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Year of Establishment</label>
                  <input
                    type="number"
                    name="estYear"
                    value={formData.estYear}
                    onChange={handleChange}
                    placeholder="e.g. 2012"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Primary Contact Person Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`form-input ${errors.contactName ? 'border-red-500' : ''}`}
                  />
                  {errors.contactName && <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>}
                </div>

                <div>
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Managing Director / Partner / Manager"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Official Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vendor@company.com"
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="form-label">
                    Mobile / Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="md:col-span-3">
                  <label className="form-label">Registered Office Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Plot / Street / Building / Industrial Area"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">City <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                  />
                </div>

                <div>
                  <label className="form-label">State <span className="required">*</span></label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={`form-input ${errors.state ? 'border-red-500' : ''}`}
                  />
                </div>

                <div>
                  <label className="form-label">PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Legal & Statutory */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Step 2: Statutory Compliance & Banking Information</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verifiable GSTIN, PAN, and Bank details for contract payouts</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">
                    GSTIN Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    maxLength={15}
                    placeholder="e.g. 07AAAAA0000A1Z5"
                    className={`form-input uppercase tracking-wider ${errors.gstin ? 'border-red-500' : ''}`}
                  />
                  {errors.gstin && <p className="text-xs text-red-500 mt-1">{errors.gstin}</p>}
                </div>

                <div>
                  <label className="form-label">
                    Company PAN Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="e.g. ABCDE1234F"
                    className={`form-input uppercase tracking-wider ${errors.pan ? 'border-red-500' : ''}`}
                  />
                  {errors.pan && <p className="text-xs text-red-500 mt-1">{errors.pan}</p>}
                </div>

                <div>
                  <label className="form-label">MSME / Udyam Registration (Optional)</label>
                  <input
                    type="text"
                    name="msmeNo"
                    value={formData.msmeNo}
                    onChange={handleChange}
                    placeholder="e.g. UDYAM-XX-00-0000000"
                    className="form-input uppercase"
                  />
                </div>

                <div>
                  <label className="form-label">Bank Account Number <span className="required">*</span></label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    placeholder="Current Account Number"
                    className={`form-input ${errors.bankAccount ? 'border-red-500' : ''}`}
                  />
                </div>

                <div>
                  <label className="form-label">Bank Name & Branch</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Bank, Connaught Place Branch"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">IFSC Code <span className="required">*</span></label>
                  <input
                    type="text"
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleChange}
                    placeholder="e.g. HDFC0001234"
                    className={`form-input uppercase tracking-wider ${errors.ifsc ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Turnover & Experience */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span>Step 3: Annual Financial Turnover & Work Track Record</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Audited turnovers and major executed project highlights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Turnover FY 2023-24 (₹ Lakhs)</label>
                  <input
                    type="number"
                    name="turnover2023"
                    value={formData.turnover2023}
                    onChange={handleChange}
                    placeholder="Amount in Lakhs"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Turnover FY 2024-25 (₹ Lakhs)</label>
                  <input
                    type="number"
                    name="turnover2024"
                    value={formData.turnover2024}
                    onChange={handleChange}
                    placeholder="Amount in Lakhs"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Turnover FY 2025-26 (₹ Lakhs) <span className="required">*</span></label>
                  <input
                    type="number"
                    name="turnover2025"
                    value={formData.turnover2025}
                    onChange={handleChange}
                    placeholder="Amount in Lakhs"
                    className={`form-input ${errors.turnover2025 ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="form-label">Single Largest Work Order Executed (₹ Lakhs)</label>
                  <input
                    type="number"
                    name="largestOrder"
                    value={formData.largestOrder}
                    onChange={handleChange}
                    placeholder="e.g. 250 (for ₹ 2.5 Crores)"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Existing Approvals / PSU Registrations</label>
                  <input
                    type="text"
                    name="existingEmpanels"
                    value={formData.existingEmpanels}
                    onChange={handleChange}
                    placeholder="e.g. CPWD Class-I, L&T Approved, Railways"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Document Uploads */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Step 4: Upload Verification Certificates (PDF / JPG)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Attachments help accelerate technical committee review</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: 'gstDoc', label: 'GST Registration Certificate' },
                  { field: 'panDoc', label: 'PAN Card Copy' },
                  { field: 'bankDoc', label: 'Cancelled Cheque / Bank Letter' },
                  { field: 'expDoc', label: 'Work Orders / Completion Certificates' },
                ].map((item) => (
                  <div key={item.field} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
                    <label className="form-label mb-2">{item.label}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        id={item.field}
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.field, e.target.files[0])}
                      />
                      <label
                        htmlFor={item.field}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Choose File</span>
                      </label>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        {formData[item.field] || 'No file selected'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Review & Declaration */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Step 5: Application Summary & Declaration</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Review your entered credentials before final submission</p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-500">Company Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.companyName || 'N/A'}</span>
                  
                  <span className="text-slate-500">GSTIN:</span>
                  <span className="font-bold uppercase text-slate-900 dark:text-white">{formData.gstin || 'N/A'}</span>
                  
                  <span className="text-slate-500">PAN Number:</span>
                  <span className="font-bold uppercase text-slate-900 dark:text-white">{formData.pan || 'N/A'}</span>

                  <span className="text-slate-500">Email & Contact:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.email} | {formData.phone}</span>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isDeclared"
                    checked={formData.isDeclared}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">
                    I hereby declare that all information submitted above for <strong>Hindustan Projects</strong> empanelment is true, accurate, and verifiable. Our entity has not been blacklisted by any Central/State Govt PSU or private corporation.
                  </span>
                </label>
                {errors.isDeclared && <p className="text-xs text-red-600 font-bold">{errors.isDeclared}</p>}
              </div>

              <div>
                <label className="form-label">Authorized Signatory Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="signatoryName"
                  value={formData.signatoryName}
                  onChange={handleChange}
                  placeholder="Full Name of Director / Authorized Officer"
                  className={`form-input ${errors.signatoryName ? 'border-red-500' : ''}`}
                />
                {errors.signatoryName && <p className="text-xs text-red-500 mt-1">{errors.signatoryName}</p>}
              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                <span>Continue Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-accent text-base"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Submit Empanelment Application</span>
              </button>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}
