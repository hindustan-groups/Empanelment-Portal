import React, { useState, useEffect } from 'react';
import {
  Building, User, CreditCard, ShieldCheck,
  FileCheck, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft,
  DollarSign, Save, Loader2, UserCheck, Briefcase
} from 'lucide-react';
import SecurityCaptcha from './SecurityCaptcha';
import DigitalSignature from './DigitalSignature';

/* ─── Static Data ─────────────────────────────────────────────────── */
const ENTITY_TYPES = [
  { value: 'sole_proprietor', label: '👤 Sole Proprietor / Individual Freelancer', single: true },
  { value: 'pvt_ltd',         label: '🏢 Private Limited Company (Pvt Ltd)',        single: false },
  { value: 'partnership',     label: '🤝 Partnership Firm',                          single: false },
  { value: 'llp',             label: '🏛️ Limited Liability Partnership (LLP)',       single: false },
  { value: 'public_ltd',      label: '📈 Public Limited Company',                    single: false },
  { value: 'trust',           label: '📜 Trust / NGO / Society',                    single: false },
  { value: 'other',           label: '✏️ Other – Specify Below',                    single: false },
];

const DISCIPLINE_ROLES = [
  { code: 'civil',       label: '🏗️ Civil & Structural Engineering Contractor (Class A/B/C)' },
  { code: 'mep',         label: '⚡ MEP, HVAC & Electrical System Contractor' },
  { code: 'arch',        label: '📐 Architect & Architectural Design Consultant' },
  { code: 'digital',     label: '💻 Digital Solutions, IT Infrastructure & Marketing Agency' },
  { code: 'suppliers',   label: '🚚 Material & Construction Goods Supplier / Heavy Rentals' },
  { code: 'structural',  label: '🏢 Structural Engineering & Audit Consultant' },
  { code: 'interior',    label: '🎨 Interior Designer & Turnkey Fit-out Contractor' },
  { code: 'fire',        label: '🛡️ Fire Protection & Safety Systems Engineer' },
  { code: 'soil',        label: '🧪 Geotechnical & NABL Soil Testing Laboratory' },
  { code: 'solar',       label: '☀️ Solar & Renewable Energy EPC Contractor' },
  { code: 'other',       label: '✏️ Other – Specify Custom Role Below' },
];

const DEFAULT_CATEGORIES = [
  { id: 'consultants',   label: 'Architects & BIM Engineering Consultants' },
  { id: 'civil',         label: 'Civil & Structural Engineering Contractors' },
  { id: 'mep',           label: 'MEP, HVAC & Electrical System Services' },
  { id: 'digital',       label: 'Digital Solutions, IT Infrastructure & Marketing' },
  { id: 'suppliers',     label: 'Material & Construction Goods Suppliers' },
  { id: 'equipment',     label: 'Heavy Machinery & Crane Rentals' },
  { id: 'site_services', label: 'Facility & PMC Site Services' },
  { id: 'interior',      label: 'Interior Designers & Turnkey Decorators' },
  { id: 'fire',          label: 'Fire Protection & Safety Engineers' },
  { id: 'soil',          label: 'Geotechnical & Soil Testing Labs' },
  { id: 'solar',         label: 'Solar & Renewable Energy Integrators' },
  { id: 'other',         label: '✏️ Other – Specify Below' },
];

export const NBC_BUILDING_GROUPS = [
  {
    group: 'Group A: Residential Buildings',
    items: [
      { value: 'nbc_a1', label: 'Group A-1: Lodging and rooming houses' },
      { value: 'nbc_a2', label: 'Group A-2: One or two-family private dwellings' },
      { value: 'nbc_a3', label: 'Group A-3: Dormitories' },
      { value: 'nbc_a4', label: 'Group A-4: Apartment houses' },
      { value: 'nbc_a5', label: 'Group A-5: Hotels & Luxury Hospitality' },
    ]
  },
  {
    group: 'Group B: Educational Buildings',
    items: [
      { value: 'nbc_b1', label: 'Group B-1: Schools up to senior secondary level' },
      { value: 'nbc_b2', label: 'Group B-2: All other training / educational institutions' },
    ]
  },
  {
    group: 'Group C: Institutional Buildings',
    items: [
      { value: 'nbc_c1', label: 'Group C-1: Hospitals and sanatoria' },
      { value: 'nbc_c2', label: 'Group C-2: Custodial institutions (e.g. orphanages, elder care)' },
      { value: 'nbc_c3', label: 'Group C-3: Penal and mental institutions' },
    ]
  },
  {
    group: 'Group D: Assembly Buildings',
    items: [
      { value: 'nbc_d1', label: 'Group D-1: Theaters & stages (seating capacity > 1,000)' },
      { value: 'nbc_d2', label: 'Group D-2: Theaters & auditoriums (seating capacity < 1,000)' },
      { value: 'nbc_d3', label: 'Group D-3: Halls, museums, and places of worship' },
      { value: 'nbc_d4', label: 'Group D-4: Outdoor assembly structures (grandstands, stadiums)' },
    ]
  },
  {
    group: 'Group E: Business Buildings',
    items: [
      { value: 'nbc_e1', label: 'Group E-1: Offices, banks, & professional establishments' },
      { value: 'nbc_e2', label: 'Group E-2: Laboratories and research facilities' },
      { value: 'nbc_e3', label: 'Group E-3: Telephone exchanges & telecom hubs' },
      { value: 'nbc_e4', label: 'Group E-4: Data processing centers / Data Centers' },
    ]
  },
  {
    group: 'Group F: Mercantile Buildings',
    items: [
      { value: 'nbc_f1', label: 'Group F-1: Shops, stores, & markets (display & sale)' },
      { value: 'nbc_f2', label: 'Group F-2: Underground & large departmental stores / Malls' },
    ]
  },
  {
    group: 'Group G: Industrial Buildings',
    items: [
      { value: 'nbc_g1_g3', label: 'Group G-1 to G-3: Factories, assembly plants, refineries, & power plants' },
    ]
  },
  {
    group: 'Group H: Storage Buildings',
    items: [
      { value: 'nbc_h1_h2', label: 'Group H-1 & H-2: Warehouses, cold storages, freight depots, transit sheds' },
    ]
  },
  {
    group: 'Group J: Hazardous Buildings',
    items: [
      { value: 'nbc_j1_j3', label: 'Group J-1 to J-3: Buildings handling explosive, combustible, or toxic materials' },
    ]
  }
];

const STATE_LIST = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi (NCT)','Jammu & Kashmir','Ladakh',
  'Puducherry','Chandigarh','Other',
];

/* ─── Small Reusable Field Components ────────────────────────────── */
function FieldGroup({ label, required, optional, hint, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required"> *</span>}
        {optional && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>(Optional)</span>}
      </label>
      {hint && <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{hint}</div>}
      {children}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

function Input({ name, value, onChange, placeholder, type = 'text', upper = false, error, disabled }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`form-input${error ? ' error' : ''}`}
      style={upper ? { textTransform: 'uppercase' } : undefined}
    />
  );
}

function SelectWithOther({ name, value, onChange, options, otherName, otherValue, otherPlaceholder, error, otherError }) {
  return (
    <>
      <select name={name} value={value} onChange={onChange} className={`form-input${error ? ' error' : ''}`}>
        {options.map(o => (
          <option key={o.value ?? o.code ?? o.id} value={o.value ?? o.code ?? o.id}>{o.label}</option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
      {(value === 'other' || value === 'Other') && (
        <div style={{ marginTop: '0.5rem' }}>
          <input
            type="text"
            name={otherName}
            value={otherValue}
            onChange={onChange}
            placeholder={otherPlaceholder}
            className={`form-input${otherError ? ' error' : ''}`}
            style={{ borderColor: '#0047AB44' }}
          />
          {otherError && <span className="error-text">{otherError}</span>}
        </div>
      )}
    </>
  );
}

/* ─── Main Form ──────────────────────────────────────────────────── */
export default function EmpanelmentForm({ category, onFormSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [savedDraft, setSavedDraft] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const [availableCategories] = useState(() => {
    const saved = localStorage.getItem('hipro_custom_categories');
    const list = saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    return list.some(c => c.id === 'other') ? list : [...list, { id: 'other', label: '✏️ Other – Specify Below' }];
  });

  const [formData, setFormData] = useState({
    /* Entity & Discipline Classification */
    entityType: 'sole_proprietor',
    otherEntityType: '',
    primaryRole: 'arch',
    otherPrimaryRole: '',
    category: category || 'civil',
    otherCategory: '',
    nbcSubCategory: '',
    otherNbcSubCategory: '',

    /* Identity */
    companyName: '',        // firm name OR "self-employed" for sole prop
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    altPhone: '',

    /* Address */
    address: '',
    city: '',
    state: '',
    pincode: '',

    /* Registration (corporate-only) */
    estYear: '',
    coaRegNo: '',
    manpowerCount: '',

    /* Tax & Compliance */
    gstin: '',
    gstExempt: false,
    pan: '',
    msmeNo: '',

    /* Bank (optional) */
    bankAccount: '',
    ifsc: '',
    bankName: '',

    /* Financials (optional) */
    turnover2023: '',
    turnover2024: '',
    turnover2025: '',
    largestOrder: '',
    buaRate: '',
    cpaRate: '',

    /* Equipment (corporate-only) */
    machineryCheck: { batchingPlant: false, towerCrane: false, bimSoftware: false, totalStation: false },

    /* Mandatory & Optional Documents */
    panDoc: null,
    aadharFrontDoc: null,
    aadharBackDoc: null,
    gstDoc: null,
    bankDoc: null,
    expDoc: null,

    /* Step 5 */
    declAntiBlacklist: false,
    declIpAssignment: false,
    declSiteVisit: false,
    signatoryName: '',
    signatoryPlace: '',
  });

  const [errors, setErrors] = useState({});

  /* Is this a single/sole person entity? */
  const isSoleProp = formData.entityType === 'sole_proprietor';

  useEffect(() => {
    if (category) setFormData(prev => ({ ...prev, category }));
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleMachinery = (key) => {
    setFormData(prev => {
      const currentCheck = prev.machineryCheck || { batchingPlant: false, towerCrane: false, bimSoftware: false, totalStation: false };
      return {
        ...prev,
        machineryCheck: {
          ...currentCheck,
          [key]: !currentCheck[key]
        }
      };
    });
  };

  const handleFile = (field, file) => {
    if (!file) {
      setFormData(prev => ({ ...prev, [field]: null }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds maximum limit of 10 MB');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      [field]: {
        name: file.name || 'document.pdf',
        size: file.size || 0,
        type: file.type || 'application/pdf',
        previewUrl,
        rawFile: file
      }
    }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleGstVerified = ({ gstin, pan }) => {
    setFormData(prev => ({ ...prev, gstin: gstin || prev.gstin, pan: pan || prev.pan }));
  };

  const handleAcceptAll = () => {
    setFormData(prev => ({
      ...prev,
      declAntiBlacklist: true,
      declIpAssignment: true,
      declSiteVisit: true,
      signatoryName: prev.signatoryName || prev.contactName || '',
    }));
  };

  const handleSaveDraft = () => {
    const safe = { ...formData };
    ['gstDoc', 'panDoc', 'bankDoc', 'expDoc'].forEach(f => {
      if (safe[f]) {
        safe[f] = { name: safe[f].name || 'uploaded_doc.pdf' };
      } else {
        safe[f] = null;
      }
    });
    try {
      localStorage.setItem('hipro_empanel_draft', JSON.stringify(safe));
      setSavedDraft(true);
      setTimeout(() => setSavedDraft(false), 2500);
    } catch (err) {
      console.warn('Draft save notice:', err);
    }
  };

  const scrollToTop = () => {
    const el = document.getElementById('empanelment-form-container');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const validate = (step) => {
    const e = {};

    // Step 1: Contact & Entity Profile Validation
    if (step === 1) {
      const contactName = (formData.contactName || '').trim();
      if (!contactName || contactName.length < 2) {
        e.contactName = 'Please enter authorized contact person name (min 2 letters)';
      }

      const email = (formData.email || '').trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        e.email = 'Please enter a valid corporate email address (e.g. name@domain.com)';
      }

      const phone = (formData.phone || '').replace(/\D/g, '');
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phone || !phoneRegex.test(phone)) {
        e.phone = 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9';
      }

      if (!isSoleProp) {
        const companyName = (formData.companyName || '').trim();
        if (!companyName || companyName.length < 3) {
          e.companyName = 'Registered Company / Firm name is required (min 3 characters)';
        }
      }

      if (!formData.primaryRole) {
        e.primaryRole = 'Please select your professional discipline';
      } else if (formData.primaryRole === 'other' && !(formData.otherPrimaryRole || '').trim()) {
        e.otherPrimaryRole = 'Please specify your discipline';
      }

      if (!formData.category) {
        e.category = 'Please select an empanelment trade category';
      } else if (formData.category === 'other' && !(formData.otherCategory || '').trim()) {
        e.otherCategory = 'Please specify your business category';
      }

      if (!formData.nbcSubCategory) {
        e.nbcSubCategory = 'Please select NBC Building Code Classification / Sub-Category';
      } else if (formData.nbcSubCategory === 'other' && !(formData.otherNbcSubCategory || '').trim()) {
        e.otherNbcSubCategory = 'Please specify your building sub-category';
      }

      if (formData.entityType === 'other' && !(formData.otherEntityType || '').trim()) {
        e.otherEntityType = 'Please specify your entity type';
      }

      const pincode = (formData.pincode || '').trim();
      if (pincode && !/^\d{6}$/.test(pincode)) {
        e.pincode = 'Pincode must be a valid 6-digit number (e.g. 302001)';
      }
    }

    // Step 2: Statutory Tax & Compliance Validation (GSTIN + PAN + Bank)
    if (step === 2) {
      if (!formData.gstExempt) {
        const gstin = (formData.gstin || '').replace(/\s/g, '').toUpperCase();
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstin) {
          e.gstin = 'Enter your 15-character GSTIN or check "No GSTIN / Exempt"';
        } else if (!gstinRegex.test(gstin)) {
          e.gstin = 'Invalid GSTIN format! Must be 15 characters (e.g. 08AAAAA0000A1Z5)';
        }
      }

      const pan = (formData.pan || '').replace(/\s/g, '').toUpperCase();
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!pan) {
        e.pan = '10-character PAN Card number is required';
      } else if (!panRegex.test(pan)) {
        e.pan = 'Invalid PAN format! Must be 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)';
      }

      const bankAccount = (formData.bankAccount || '').trim();
      if (!bankAccount || bankAccount.length < 6) {
        e.bankAccount = 'Bank Account Number is MANDATORY for vendor payout processing';
      }

      const ifsc = (formData.ifsc || '').trim().toUpperCase();
      if (!ifsc) {
        e.ifsc = 'Bank IFSC Code is MANDATORY (e.g. HDFC0001234)';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
        e.ifsc = 'Invalid Bank IFSC Code format! (e.g. HDFC0001234)';
      }

      const bankName = (formData.bankName || '').trim();
      if (!bankName || bankName.length < 3) {
        e.bankName = 'Bank Name & Branch location is MANDATORY';
      }
    }

    // Step 3: Mandatory Document Upload Checks (PAN + Aadhaar Front + Aadhaar Back + Bank Cheque)
    if (step === 3) {
      if (!formData.panDoc) {
        e.panDoc = 'PAN Card copy is MANDATORY. Please upload your PAN Card document.';
      }
      if (!formData.aadharFrontDoc) {
        e.aadharFrontDoc = 'Aadhaar Card (Front Side) is MANDATORY. Please upload Aadhaar front side.';
      }
      if (!formData.aadharBackDoc) {
        e.aadharBackDoc = 'Aadhaar Card (Back Side) is MANDATORY. Please upload Aadhaar back side.';
      }
      if (!formData.bankDoc) {
        e.bankDoc = 'Cancelled Bank Cheque / Passbook copy is MANDATORY. Please upload your bank document.';
      }
    }

    // Step 4: Undertakings, Signature & Security Captcha
    if (step === 4) {
      if (!formData.declAntiBlacklist) e.declAntiBlacklist = 'You must confirm the non-blacklisting declaration';
      if (!formData.declIpAssignment) e.declIpAssignment = 'You must confirm the IP assignment undertaking';
      if (!formData.declSiteVisit) e.declSiteVisit = 'You must confirm the site visit commitment';
      
      const signatory = (formData.signatoryName || '').trim();
      if (!signatory || signatory.length < 3) {
        e.signatoryName = 'Authorized Signatory full name is required (min 3 letters)';
      }

      const signatoryPlace = (formData.signatoryPlace || '').trim();
      if (!signatoryPlace || signatoryPlace.length < 2) {
        e.signatoryPlace = 'Place / City of signing is required (min 2 letters, e.g. New Delhi)';
      }

      if (!signatureData) e.signature = 'Please draw your digital signature on the canvas pad above';
      if (!isCaptchaVerified) e.captcha = 'Please solve the anti-bot security challenge above';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate(currentStep)) {
      setErrors({});
      setCurrentStep(p => p + 1);
      scrollToTop();
    } else {
      scrollToTop();
    }
  };

  const handleBack = () => {
    setCurrentStep(p => p - 1);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(4)) return;
    setIsSubmitting(true);
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    try {
      const fd = new FormData();
      const payload = {
        ...formData,
        primaryRole: formData.primaryRole === 'other' ? `Other: ${formData.otherPrimaryRole}` : formData.primaryRole,
        category: formData.category === 'other' ? `Other: ${formData.otherCategory}` : formData.category,
        entityType: formData.entityType === 'other' ? `Other: ${formData.otherEntityType}` : formData.entityType,
      };
      Object.entries(payload).forEach(([k, v]) => {
        if (!v) return;
        if (v && v.rawFile instanceof File) {
          fd.append(k, v.rawFile);
        } else if (v instanceof File) {
          fd.append(k, v);
        } else if (typeof v === 'object') {
          try {
            const cleanObj = { ...v };
            delete cleanObj.rawFile;
            fd.append(k, JSON.stringify(cleanObj));
          } catch {
            /* ignore serialization error */
          }
        } else if (v !== null && v !== undefined) {
          fd.append(k, v);
        }
      });
      if (signatureData) fd.append('signature', signatureData);
      const res = await fetch(`${backendUrl}/api/empanelment/submit`, { method: 'POST', body: fd });
      const result = await res.json();
      onFormSubmit({ ...payload, signature: signatureData }, result.trackingId);
    } catch {
      onFormSubmit({ ...formData, signature: signatureData });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Determine total steps: sole prop = 4, corporate = 4 (we removed a step to keep it lean) */
  const STEPS = isSoleProp
    ? [
        { num: 1, title: 'Your Profile',     icon: User },
        { num: 2, title: 'Tax & PAN',         icon: CreditCard },
        { num: 3, title: 'Upload Docs',       icon: FileCheck },
        { num: 4, title: 'Sign & Submit',     icon: ShieldCheck },
      ]
    : [
        { num: 1, title: 'Firm Profile',      icon: Building },
        { num: 2, title: 'GST & Compliance', icon: CreditCard },
        { num: 3, title: 'Financials & Docs', icon: DollarSign },
        { num: 4, title: 'Sign & Submit',     icon: ShieldCheck },
      ];

  const totalSteps = STEPS.length;
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div id="empanelment-form-container" className="form-container">
      <div className="form-card">

        {/* ── Banner ── */}
        <div className="form-header-banner">
          <div className="form-header-top">
            <div>
              <div className="form-header-tag">🏛️ Official Empanelment Registration • {progress}% Completed</div>
              <h2 className="form-header-title">Hindustan Projects Vendor Empanelment Portal</h2>
            </div>
            <button type="button" onClick={handleSaveDraft} className="btn-draft">
              <Save style={{ width: 14, height: 14 }} />
              <span>{savedDraft ? '✓ Draft Saved' : 'Save Draft'}</span>
            </button>
          </div>

          {/* Entity Type Switcher — shown outside banner as white readable card */}
        </div>{/* close form-header-banner here */}

        {/* ── Entity Selector Card (white bg, fully readable) ── */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #E2E8F0',
          padding: '1.25rem 2rem',
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.08em', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
            First — Who are you? Select your entity type:
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ENTITY_TYPES.map(et => {
              const isSelected = formData.entityType === et.value;
              return (
                <button
                  key={et.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, entityType: et.value, otherEntityType: '' }));
                    setErrors({});
                  }}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 99,
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #0047AB' : '1.5px solid #CBD5E1',
                    background: isSelected ? '#0047AB' : '#F8FAFC',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    boxShadow: isSelected ? '0 2px 10px rgba(0,71,171,0.25)' : 'none',
                    transition: 'all 0.18s ease',
                    lineHeight: 1.4,
                  }}
                >
                  {et.label}
                </button>
              );
            })}
          </div>

          {formData.entityType === 'other' && (
            <input
              type="text"
              name="otherEntityType"
              value={formData.otherEntityType}
              onChange={handleChange}
              placeholder="Please describe your entity type (e.g. Joint Venture, Public Trust...)"
              className={`form-input${errors.otherEntityType ? ' error' : ''}`}
              style={{ marginTop: '0.75rem', maxWidth: 480 }}
            />
          )}
          {errors.otherEntityType && <span className="error-text">{errors.otherEntityType}</span>}

          {isSoleProp ? (
            <div style={{ marginTop: '0.65rem', fontSize: '0.8rem', fontWeight: 700, color: '#047857', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ✅ Great! We've simplified this form for you — only essential fields are shown.
            </div>
          ) : formData.entityType ? (
            <div style={{ marginTop: '0.65rem', fontSize: '0.8rem', fontWeight: 700, color: '#0047AB', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🏢 Full corporate empanelment form with all company credential fields will be shown.
            </div>
          ) : null}
        </div>

        {/* ── Step Progress Nav (inside blue banner strip) ── */}
        <div style={{ background: 'linear-gradient(135deg, #0047AB 0%, #002B66 100%)', padding: '0.85rem 2rem 1.1rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto', gap: '0.5rem' }}>
            {STEPS.map((st) => {
              const Icon = st.icon;
              const isActive = currentStep === st.num;
              const isDone = currentStep > st.num;
              return (
                <div
                  key={st.num}
                  onClick={() => { if (isDone) { setCurrentStep(st.num); scrollToTop(); } }}
                  className={`step-item ${isDone ? 'done' : isActive ? 'active' : ''}`}
                  style={{ cursor: isDone ? 'pointer' : 'default' }}
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

        {/* ── Global Validation Error Alert Banner ── */}
        {Object.keys(errors).length > 0 && (
          <div style={{
            margin: '1.25rem 2rem 0 2rem',
            padding: '1rem 1.25rem',
            borderRadius: 14,
            backgroundColor: '#FEF2F2',
            border: '1.5px solid #F87171',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem'
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              backgroundColor: '#EF4444', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '1.1rem', flexShrink: 0
            }}>
              ⚠️
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#991B1B', fontSize: '0.95rem', fontWeight: 900 }}>
                Validation Error — Unable to proceed to Next Step
              </h4>
              <p style={{ margin: '0.2rem 0 0.4rem 0', color: '#B91C1C', fontSize: '0.825rem', fontWeight: 600 }}>
                Please correct the following highlighted error(s) before continuing:
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#991B1B', fontSize: '0.825rem', fontWeight: 700 }}>
                {Object.values(errors).map((errText, idx) => (
                  <li key={idx} style={{ marginBottom: 2 }}>{errText}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="form-body">

          {/* ════════════════════ STEP 1 ════════════════════ */}
          {currentStep === 1 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  {isSoleProp
                    ? <><UserCheck style={{ width: 20, height: 20, color: '#0047AB' }} /> <span>Your Personal Professional Profile</span></>
                    : <><Building style={{ width: 20, height: 20, color: '#0047AB' }} /> <span>Corporate Firm Profile & Scope</span></>
                  }
                </h3>
                <p className="step-header-sub">
                  {isSoleProp
                    ? 'Fill in your personal details — company name is not needed. Just your name, contact, and professional scope.'
                    : 'Enter your official corporate registration details, discipline scope, and primary contact.'
                  }
                </p>
              </div>

              <div className="form-grid-2">

                {/* ── Personal / Contact Name ── */}
                <FieldGroup
                  label={isSoleProp ? 'Your Full Name' : 'Lead Contact / Director Name'}
                  required
                  error={errors.contactName}
                  style={{ gridColumn: isSoleProp ? '1 / -1' : undefined }}
                >
                  <Input name="contactName" value={formData.contactName} onChange={handleChange}
                    placeholder={isSoleProp ? 'e.g. Rajesh Kumar Sharma' : 'e.g. Mr. Anil Verma (Managing Director)'}
                    error={errors.contactName} />
                </FieldGroup>

                {/* ── Company Name (corporate only) ── */}
                {!isSoleProp && (
                  <FieldGroup label="Registered Firm / Company Name" required error={errors.companyName}>
                    <Input name="companyName" value={formData.companyName} onChange={handleChange}
                      placeholder="e.g. M/S Apex Infra Pvt Ltd" error={errors.companyName} />
                  </FieldGroup>
                )}

                {/* ── Designation ── */}
                <FieldGroup
                  label={isSoleProp ? 'Your Designation / Title' : 'Director Designation'}
                  optional
                >
                  <Input name="designation" value={formData.designation} onChange={handleChange}
                    placeholder={isSoleProp ? 'e.g. Freelance Architect / Self-Employed' : 'e.g. Managing Director / CEO'} />
                </FieldGroup>

                {/* ── Email ── */}
                <FieldGroup label="Email Address" required error={errors.email}>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange}
                    placeholder="e.g. contact@studio.com" error={errors.email} />
                </FieldGroup>

                {/* ── Phone ── */}
                <FieldGroup label="Mobile Number" required error={errors.phone}>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" error={errors.phone} />
                </FieldGroup>

                {/* ── Alt Phone (optional) ── */}
                <FieldGroup label="Alternate Number" optional>
                  <Input name="altPhone" type="tel" value={formData.altPhone} onChange={handleChange}
                    placeholder="Office / WhatsApp number" />
                </FieldGroup>

                {/* ── Blood Group (For Official Vendor ID Card) ── */}
                <FieldGroup label="Blood Group (For Official Smart ID Card)" optional>
                  <select name="bloodGroup" value={formData.bloodGroup || 'B+'} onChange={handleChange} className="form-input">
                    {['B+', 'A+', 'O+', 'AB+', 'B-', 'A-', 'O-', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </FieldGroup>

                {/* ── Passport Size Photo Upload (For Official Vendor ID Card) ── */}
                <FieldGroup label="Passport Size Photo (For Smart ID Card Badge)" optional hint="Upload clear front-facing passport photo (PNG/JPG up to 5MB)">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, passportPhoto: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="form-input"
                      style={{ padding: '0.4rem' }}
                    />
                    {formData.passportPhoto && (
                      <div style={{ width: 44, height: 50, borderRadius: 6, overflow: 'hidden', border: '2px solid #0047AB', flexShrink: 0 }}>
                        <img src={formData.passportPhoto} alt="ID Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </FieldGroup>

                {/* ── Main Category: Professional Discipline / Scope ── */}
                <FieldGroup
                  label="Main Category — Professional Discipline / Scope of Work"
                  required
                  error={errors.primaryRole}
                  hint="Select your primary engineering, architectural, contracting, or supply domain"
                  style={{ gridColumn: '1 / -1' }}
                >
                  <SelectWithOther
                    name="primaryRole"
                    value={formData.primaryRole}
                    onChange={handleChange}
                    options={DISCIPLINE_ROLES}
                    otherName="otherPrimaryRole"
                    otherValue={formData.otherPrimaryRole}
                    otherPlaceholder="e.g. Acoustic Engineer, Facade Specialist, Drone Survey Expert..."
                    error={errors.primaryRole}
                    otherError={errors.otherPrimaryRole}
                  />
                </FieldGroup>

                {/* ── Sub-Category: NBC Building Classification (Groups A through J) ── */}
                <FieldGroup
                  label="Sub-Category — NBC Building Classification (National Building Code of India)"
                  required
                  error={errors.nbcSubCategory}
                  hint="Select building group code (Group A: Residential to Group J: Hazardous)"
                  style={{ gridColumn: '1 / -1' }}
                >
                  <select
                    name="nbcSubCategory"
                    value={formData.nbcSubCategory}
                    onChange={handleChange}
                    className={`form-input${errors.nbcSubCategory ? ' error' : ''}`}
                  >
                    <option value="">– Select NBC Building Classification / Sub-Category –</option>
                    {NBC_BUILDING_GROUPS.map((grp) => (
                      <optgroup key={grp.group} label={grp.group}>
                        {grp.items.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="other">✏️ Other Custom Building / Infrastructure Sub-Category</option>
                  </select>
                  {errors.nbcSubCategory && <span className="error-text">{errors.nbcSubCategory}</span>}

                  {formData.nbcSubCategory === 'other' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <input
                        type="text"
                        name="otherNbcSubCategory"
                        value={formData.otherNbcSubCategory}
                        onChange={handleChange}
                        placeholder="Describe your custom NBC Building Classification or Sub-Category..."
                        className={`form-input${errors.otherNbcSubCategory ? ' error' : ''}`}
                        style={{ borderColor: '#0047AB44' }}
                      />
                      {errors.otherNbcSubCategory && <span className="error-text">{errors.otherNbcSubCategory}</span>}
                    </div>
                  )}
                </FieldGroup>

                {/* ── Empanelment Business Category ── */}
                <FieldGroup
                  label="Empanelment Trade Line Category"
                  required
                  error={errors.category}
                >
                  <SelectWithOther
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={availableCategories.map(c => ({ ...c, value: c.id }))}
                    otherName="otherCategory"
                    otherValue={formData.otherCategory}
                    otherPlaceholder="e.g. EV Charging Infrastructure, Modular Furniture, etc."
                    error={errors.category}
                    otherError={errors.otherCategory}
                  />
                </FieldGroup>

                {/* ── Corporate-only fields ── */}
                {!isSoleProp && (
                  <>
                    <FieldGroup label="COA Reg No / MCA CIN Number" optional
                      hint="As per Council of Architecture / Ministry of Corporate Affairs">
                      <Input name="coaRegNo" value={formData.coaRegNo} onChange={handleChange}
                        placeholder="e.g. CA/2018/84920 or U45201RJ2012PTC038" upper />
                    </FieldGroup>

                    <FieldGroup label="Year of Establishment" optional>
                      <Input name="estYear" type="number" value={formData.estYear} onChange={handleChange}
                        placeholder="e.g. 2012" />
                    </FieldGroup>

                    <FieldGroup label="Total Technical Manpower" optional>
                      <select name="manpowerCount" value={formData.manpowerCount} onChange={handleChange} className="form-input">
                        <option value="">– Select range –</option>
                        <option value="5">1 – 5 Professionals</option>
                        <option value="15">6 – 20 Engineers / Staff</option>
                        <option value="50">21 – 50 Technical Staff</option>
                        <option value="100">50+ Corporate Team</option>
                      </select>
                    </FieldGroup>
                  </>
                )}

                {/* ── Address ── */}
                <FieldGroup label={isSoleProp ? 'Home / Studio Address' : 'Registered Office Address'} optional style={{ gridColumn: '1 / -1' }}>
                  <Input name="address" value={formData.address} onChange={handleChange}
                    placeholder="Street / Plot / Suite / Locality" />
                </FieldGroup>

                <FieldGroup label="City / Town" optional>
                  <Input name="city" value={formData.city} onChange={handleChange}
                    placeholder="e.g. Jaipur" />
                </FieldGroup>

                <FieldGroup label="State" optional>
                  <select name="state" value={formData.state} onChange={handleChange} className="form-input">
                    <option value="">– Select State –</option>
                    {STATE_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FieldGroup>

                <FieldGroup label="PIN Code" optional>
                  <Input name="pincode" type="text" value={formData.pincode} onChange={handleChange}
                    placeholder="e.g. 302001" />
                </FieldGroup>

              </div>
            </div>
          )}

          {/* ════════════════════ STEP 2 ════════════════════ */}
          {currentStep === 2 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <CreditCard style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>{isSoleProp ? 'Your Tax Identity – PAN & GSTIN' : 'Statutory Tax Compliance & Banking'}</span>
                </h3>
                <p className="step-header-sub">
                  {isSoleProp
                    ? 'Only PAN is mandatory. GSTIN is optional for sole proprietors with turnover below ₹20 Lakhs.'
                    : 'Enter GSTIN, PAN, MSME details and payout bank account information.'
                  }
                </p>
              </div>

              <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>

                {/* GST Exempt Toggle for sole prop */}
                {isSoleProp && (
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input type="checkbox" name="gstExempt" checked={formData.gstExempt} onChange={handleChange} />
                      <span><strong>I don't have a GSTIN</strong> — I am exempt (turnover &lt; ₹20 Lakh threshold)</span>
                    </label>
                  </div>
                )}

                <FieldGroup
                  label="15-Digit GSTIN"
                  required={!formData.gstExempt}
                  optional={formData.gstExempt || isSoleProp}
                  hint={isSoleProp ? 'Leave blank if you checked "No GSTIN" above' : undefined}
                  error={errors.gstin}
                >
                  <Input name="gstin" value={formData.gstin} onChange={handleChange}
                    placeholder={formData.gstExempt ? 'EXEMPTED – not required' : 'e.g. 08AAAAA0000A1Z5'}
                    upper disabled={formData.gstExempt} error={errors.gstin} />
                </FieldGroup>

                <FieldGroup label="10-Digit PAN Card" required error={errors.pan}>
                  <Input name="pan" value={formData.pan} onChange={handleChange}
                    placeholder="e.g. ABCDE1234F" upper error={errors.pan} />
                </FieldGroup>

                <FieldGroup label="MSME / Udyam Registration" optional hint="UDYAM-XX-XX-XXXXXXX">
                  <Input name="msmeNo" value={formData.msmeNo} onChange={handleChange}
                    placeholder="e.g. UDYAM-RJ-14-0028491" upper />
                </FieldGroup>

                {!isSoleProp && (
                  <FieldGroup label="EPF Registration Number" optional>
                    <Input name="epfNo" value={formData.epfNo} onChange={handleChange}
                      placeholder="e.g. RJ/JAI/0001234/000/1" upper />
                  </FieldGroup>
                )}

                {/* Bank Details — MANDATORY FOR PAYOUT PROCESSING */}
                <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.85rem', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CreditCard style={{ width: 16, height: 16 }} />
                    <span>Bank Account Credentials — Mandatory for Vendor Payouts & EMD Refunds *</span>
                  </div>
                  <div className="form-grid-2">
                    <FieldGroup label="Bank Account Number" required error={errors.bankAccount}>
                      <Input name="bankAccount" value={formData.bankAccount} onChange={handleChange}
                        placeholder="e.g. 50200088991200" error={errors.bankAccount} />
                    </FieldGroup>
                    <FieldGroup label="Bank IFSC Code" required error={errors.ifsc} hint="11-character IFSC code e.g. HDFC0001234">
                      <Input name="ifsc" value={formData.ifsc} onChange={handleChange}
                        placeholder="e.g. HDFC0001234" upper error={errors.ifsc} />
                    </FieldGroup>
                    <FieldGroup label="Bank Branch & Bank Name" required error={errors.bankName} style={{ gridColumn: '1 / -1' }}>
                      <Input name="bankName" value={formData.bankName} onChange={handleChange}
                        placeholder="e.g. HDFC Bank, Ashok Nagar Branch, Jaipur" error={errors.bankName} />
                    </FieldGroup>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ════════════════════ STEP 3 ════════════════════ */}
          {currentStep === 3 && (
            <div>
              <div className="step-header">
                <h3 className="step-header-title">
                  <FileCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                  <span>{isSoleProp ? 'Document Upload' : 'Financials, Rate Card & Document Upload'}</span>
                </h3>
                <p className="step-header-sub">
                  {isSoleProp
                    ? 'Upload your PAN Card and optionally your work portfolio or experience certificate. All uploads are optional but help faster approval.'
                    : 'Enter 3-year turnover data, your quoted area rates, equipment inventory and upload supporting documents.'
                  }
                </p>
              </div>

              {/* ── FINANCIAL TURNOVERS SECTION ── */}
              <div style={{ marginBottom: '1.75rem', borderRadius: 16, border: '1.5px solid #DBEAFE', overflow: 'hidden', background: '#FFFFFF' }}>
                {/* Section Title Bar */}
                <div style={{ background: 'linear-gradient(90deg,#0047AB,#0B1B3D)', padding: '0.9rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <DollarSign style={{ width: 18, height: 18, color: '#93C5FD' }} />
                  <div>
                    <div style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '0.92rem' }}>Annual Business Turnover (Last 3 Financial Years)</div>
                    <div style={{ fontSize: '0.72rem', color: '#93C5FD', marginTop: 2 }}>
                      New business? Enter <strong style={{color:'#FCD34D'}}>0</strong> for each year. This helps determine your empanelment tier (Class A / B / C).
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.1rem 1.25rem' }}>
                  {/* Tier info banner */}
                  <div style={{ padding: '0.65rem 1rem', borderRadius: 10, background: '#EFF6FF', border: '1px solid #BFDBFE', marginBottom: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF' }}>
                    <span>🏅 <strong>Class C:</strong> Turnover &lt; ₹50 Lakhs/yr</span>
                    <span>🥈 <strong>Class B:</strong> ₹50–₹500 Lakhs/yr</span>
                    <span>🥇 <strong>Class A:</strong> &gt; ₹500 Lakhs/yr</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    {[
                      { name: 'turnover2023', label: 'FY 2023–24', icon: '📊', hint: 'April 2023 – March 2024' },
                      { name: 'turnover2024', label: 'FY 2024–25', icon: '📈', hint: 'April 2024 – March 2025' },
                      { name: 'turnover2025', label: 'FY 2025–26', icon: '🚀', hint: 'April 2025 – March 2026 (Projected)' },
                      { name: 'largestOrder', label: 'Largest Single Work Order', icon: '💼', hint: 'Highest value project completed in one contract (helps for Class-A rating)' },
                    ].map(f => (
                      <div key={f.name} style={{ padding: '0.85rem', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                          {f.icon} {f.label}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
                          <span style={{ padding: '0.5rem 0.6rem', background: '#EFF6FF', color: '#0047AB', fontWeight: 900, fontSize: '0.85rem', borderRight: '1px solid #BFDBFE', flexShrink: 0 }}>₹</span>
                          <input
                            type="number"
                            name={f.name}
                            value={formData[f.name]}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            style={{ border: 'none', outline: 'none', padding: '0.5rem 0.6rem', fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', width: '100%', background: 'transparent' }}
                          />
                          <span style={{ padding: '0.5rem 0.6rem', background: '#F1F5F9', color: '#64748B', fontWeight: 700, fontSize: '0.72rem', borderLeft: '1px solid #E2E8F0', flexShrink: 0 }}>Lakhs</span>
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>{f.hint}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── QUOTED RATE CARD SECTION ── */}
              <div style={{ marginBottom: '1.75rem', borderRadius: 16, border: '1.5px solid #D1FAE5', overflow: 'hidden', background: '#FFFFFF' }}>
                {/* Section Title Bar */}
                <div style={{ background: 'linear-gradient(90deg,#047857,#065F46)', padding: '0.9rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>📐</span>
                  <div>
                    <div style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '0.92rem' }}>Your Quoted Execution Rate Card (Per Sq. Ft.)</div>
                    <div style={{ fontSize: '0.72rem', color: '#6EE7B7', marginTop: 2 }}>
                      Ye aapka kaam ka rate hai — Hindustan Projects is rate par aapse kaam karwane ka nirnay karta hai. Optional hai, lekin fill karne se fast approval milta hai.
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.1rem 1.25rem' }}>
                  {/* What is BUA / CPA explanation */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.85rem', borderRadius: 12, background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                      <div style={{ fontWeight: 900, fontSize: '0.8rem', color: '#065F46', marginBottom: 4 }}>🏢 BUA — Built-Up Area Rate (₹/sq ft)</div>
                      <div style={{ fontSize: '0.73rem', color: '#047857', lineHeight: 1.5 }}>
                        <strong>BUA matlab:</strong> Floor ka total covered area — jisme walls, columns, lobby sab aata hai. Residential buildings, offices, hotels ke liye use hota hai.
                        <br/><strong>Example:</strong> Ek 1000 sq ft flat banane ka aapka rate ₹1800/sq ft hai → BUA Rate = <strong>1800</strong>
                      </div>
                    </div>
                    <div style={{ padding: '0.85rem', borderRadius: 12, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                      <div style={{ fontWeight: 900, fontSize: '0.8rem', color: '#065F46', marginBottom: 4 }}>🏗️ CPA — Carpet / Plot Area Rate (₹/sq ft)</div>
                      <div style={{ fontSize: '0.73rem', color: '#047857', lineHeight: 1.5 }}>
                        <strong>CPA matlab:</strong> Sirf usable floor area (bina walls ke). Alag buildings me alag hota hai. Industrial sheds, godowns, open plot ke liye.
                        <br/><strong>Example:</strong> Plot area 1000 sq ft ka rate ₹1200/sq ft → CPA Rate = <strong>1200</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                    {[
                      {
                        name: 'buaRate',
                        label: 'BUA Rate — Built-Up Area',
                        icon: '🏢',
                        unit: '₹ / sq ft',
                        placeholder: 'e.g. 1800',
                        hint: 'Aapka construction execution rate per sq ft (total covered area). Residential, commercial, offices ke liye.',
                        color: '#047857'
                      },
                      {
                        name: 'cpaRate',
                        label: 'CPA Rate — Carpet / Plot Area',
                        icon: '🏗️',
                        unit: '₹ / sq ft',
                        placeholder: 'e.g. 1200',
                        hint: 'Usable floor / carpet area ka rate. Sirf actual usable space count hota hai. Industrial, warehouses ke liye.',
                        color: '#065F46'
                      },
                    ].map(f => (
                      <div key={f.name} style={{ padding: '0.85rem', borderRadius: 12, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 900, color: f.color, marginBottom: 6 }}>
                          {f.icon} {f.label}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #86EFAC', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
                          <span style={{ padding: '0.5rem 0.6rem', background: '#DCFCE7', color: f.color, fontWeight: 900, fontSize: '0.85rem', borderRight: '1px solid #86EFAC', flexShrink: 0 }}>₹</span>
                          <input
                            type="number"
                            name={f.name}
                            value={formData[f.name]}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            min="0"
                            style={{ border: 'none', outline: 'none', padding: '0.5rem 0.6rem', fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', width: '100%', background: 'transparent' }}
                          />
                          <span style={{ padding: '0.5rem 0.6rem', background: '#F0FDF4', color: '#64748B', fontWeight: 700, fontSize: '0.7rem', borderLeft: '1px solid #BBF7D0', flexShrink: 0 }}>/ sq ft</span>
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#6B7280', marginTop: 5, lineHeight: 1.4 }}>{f.hint}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', borderRadius: 8, background: '#FEF9C3', border: '1px solid #FDE68A', fontSize: '0.73rem', fontWeight: 700, color: '#92400E', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>💡</span>
                    <span>Agar aap sirf consultancy ya supply ka kaam karte hain (construction nahi) to ye dono fields blank chhod sakte hain.</span>
                  </div>
                </div>
              </div>

              {/* Equipment Checklist — corporate only */}
              {!isSoleProp && (
                <div style={{ marginBottom: '1.75rem', padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.65rem' }}>
                    Machinery & Software Inventory (Optional):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                    {[
                      ['batchingPlant', 'Concrete Batching Plant / RMC'],
                      ['towerCrane',    'Tower Cranes & Piling Rigs'],
                      ['bimSoftware',   'BIM / REVIT 3D Software'],
                      ['totalStation',  'Total Station Survey Equipment'],
                    ].map(([key, lbl]) => (
                      <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={Boolean(formData.machineryCheck?.[key])} onChange={() => handleMachinery(key)} />
                        <span>{lbl}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Uploads Header */}
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0047AB', marginBottom: '0.85rem', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                <span>Identity & Statutory Document Uploads:</span>
              </div>

              <div className="form-grid-2">
                {[
                  ['panDoc',         'PAN Card Copy',                    '.pdf,.jpg,.png,.jpeg', true,  'Income Tax Dept PAN Card. Required for statutory tax identity & TDS processing. Upload clear front side photo/PDF.'],
                  ['aadharFrontDoc', 'Aadhaar Card — Front Side',        '.pdf,.jpg,.png,.jpeg', true,  'UIDAI Govt National ID (Front). Required for authorized signatory identity verification. Upload photo showing Aadhaar number & photo.'],
                  ['aadharBackDoc',  'Aadhaar Card — Back Side',         '.pdf,.jpg,.png,.jpeg', true,  'UIDAI Govt National ID (Back). Required for registered workplace/residential address verification. Upload photo showing complete address & PIN.'],
                  ['bankDoc',        'Cancelled Bank Cheque / Passbook', '.pdf,.jpg,.png,.jpeg', true,  'Printed Cheque leaf with "CANCELLED" written or Passbook 1st page. Required to verify Bank Account No & IFSC for RTGS payouts.'],
                  ['gstDoc',         'GST REG-06 Certificate',           '.pdf,.jpg,.png,.jpeg', false, 'Official 3-page GST Registration Certificate issued by CBIC. Required to verify active GST tax status.'],
                  ['expDoc',         isSoleProp ? 'Work Portfolio / COA Certificate' : 'CAD Portfolio / Work Orders', '.pdf,.jpg,.png,.jpeg', false, 'Past Work Completion Certificates, Purchase Orders or CAD Portfolio. Helps fast-track Class-A tier rating.'],
                ].map(([field, label, accept, isRequired, helpText]) => {
                  const doc = formData[field];
                  const hasErr = Boolean(errors[field]);

                  return (
                    <div key={field} className="upload-card" style={{ border: hasErr ? '1.5px solid #ED1C24' : '1px solid var(--border-color)', backgroundColor: hasErr ? 'rgba(237,28,36,0.02)' : 'var(--bg-surface)', padding: '1rem', borderRadius: 14 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#0F172A' }}>{label}</span>
                        {isRequired ? (
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ED1C24', backgroundColor: 'rgba(237,28,36,0.1)', padding: '0.15rem 0.5rem', borderRadius: 6 }}>MANDATORY *</span>
                        ) : (
                          <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.72rem' }}>(Optional)</span>
                        )}
                      </div>

                      {/* Clear Guidance & Purpose Note */}
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.65rem 0', lineHeight: 1.45 }}>
                        💡 <strong>Why & How:</strong> {helpText}
                      </p>

                      {doc ? (
                        <div>
                          <div style={{ fontSize: '0.79rem', color: '#10B981', fontWeight: 700, marginBottom: '0.45rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            ✓ {doc.name}
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => setPreviewFile({ name: `${label} (${doc.name})`, url: doc.previewUrl, type: doc.type })}
                              style={{ padding: '0.3rem 0.75rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, color: '#0047AB', background: 'rgba(0,71,171,0.08)', border: '1px solid rgba(0,71,171,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            >
                              👁️ Preview Document
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFile(field, null)}
                              style={{ padding: '0.3rem 0.75rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, color: '#ED1C24', background: 'rgba(237,28,36,0.08)', border: '1px solid rgba(237,28,36,0.2)', cursor: 'pointer' }}
                            >
                              ✕ Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="upload-btn" style={{ padding: '0.6rem 1rem' }}>
                          <UploadCloud style={{ width: 15, height: 15 }} />
                          <span>Choose & Upload {label.split(' ')[0]}</span>
                          <input type="file" accept={accept} onChange={(e) => handleFile(field, e.target.files[0])} style={{ display: 'none' }} />
                        </label>
                      )}

                      {hasErr && <span className="error-text" style={{ marginTop: '0.45rem', display: 'block', fontWeight: 700 }}>{errors[field]}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════════════════ STEP 4 ════════════════════ */}
          {currentStep === 4 && (
            <div>
              <div className="step-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="step-header-title">
                    <ShieldCheck style={{ width: 20, height: 20, color: '#0047AB' }} />
                    <span>Digital Signature & Legal Undertakings</span>
                  </h3>
                  <p className="step-header-sub">Draw your signature below and confirm the declarations. Use 1-Click Accept All to confirm all at once.</p>
                </div>
                <button type="button" onClick={handleAcceptAll}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', border: '1.5px solid #10B981', background: 'rgba(16,185,129,0.08)', color: '#047857' }}>
                  <CheckCircle2 style={{ width: 15, height: 15 }} />
                  Accept All Terms (1-Click)
                </button>
              </div>

              {/* Signature Pad */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Digital Signature Canvas <span className="required">*</span></label>
                <DigitalSignature onSaveSignature={(d) => { setSignatureData(d); if (errors.signature) setErrors(p => ({ ...p, signature: null })); }} />
                {errors.signature && <span className="error-text">{errors.signature}</span>}
              </div>

              {/* Signatory Name & Place / City of Signing */}
              <div className="form-grid-2" style={{ marginBottom: '1.25rem' }}>
                <FieldGroup label={isSoleProp ? 'Your Full Name (as Signatory)' : 'Authorized Signatory Full Name'} required error={errors.signatoryName}>
                  <Input name="signatoryName" value={formData.signatoryName} onChange={handleChange}
                    placeholder={isSoleProp ? 'e.g. Rajesh Kumar Sharma' : 'e.g. Anil Verma (Managing Director)'}
                    error={errors.signatoryName} />
                </FieldGroup>

                <FieldGroup label="Place / City of Signing" required error={errors.signatoryPlace} hint="e.g. New Delhi, Jaipur, Mumbai">
                  <Input name="signatoryPlace" value={formData.signatoryPlace} onChange={handleChange}
                    placeholder="e.g. New Delhi"
                    error={errors.signatoryPlace} />
                </FieldGroup>
              </div>

              {/* Corporate Contract Agreement & Past Work Order Reference */}
              <div style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'rgba(0,71,171,0.04)', border: '1.5px solid rgba(0,71,171,0.2)', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.65rem' }}>
                  📜 Corporate Contract Agreement & Past Work Order Reference:
                </div>
                <div className="form-grid-2">
                  <FieldGroup label="Contract Agreement Category" optional error={errors.contractType}>
                    <select name="contractType" value={formData.contractType || ''} onChange={handleChange} className="form-input">
                      <option value="">-- Select Formal Contract Category --</option>
                      <option value="epc_turnkey">🏢 EPC Turnkey Construction Contract</option>
                      <option value="item_rate">🏗️ Item-Rate Civil & Structural Contract</option>
                      <option value="consultancy">📐 Technical / Architectural Consultancy</option>
                      <option value="supply">🚚 Heavy Equipment & Material Supply</option>
                    </select>
                  </FieldGroup>

                  <FieldGroup label="Past Work Order Reference No" optional hint="e.g. WO-2025/HP-JPR-102">
                    <Input name="workOrderRef" value={formData.workOrderRef || ''} onChange={handleChange} placeholder="e.g. WO-2025/HP-JPR-102" />
                  </FieldGroup>
                </div>
              </div>

              {/* Declarations */}
              <div style={{ padding: '1.1rem 1.25rem', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
                {[
                  ['declAntiBlacklist', 'I confirm that I / our organization has NOT been blacklisted by CPWD, PWD, Railway or any Government / Private body.', errors.declAntiBlacklist],
                  ['declIpAssignment',  'I agree that all drawings, designs and intellectual property created for Hindustan Projects shall be assigned exclusively to Hindustan Projects.', errors.declIpAssignment],
                  ['declSiteVisit',     'I commit to minimum 2 physical site visits per month during active project phases (if applicable).', errors.declSiteVisit],
                ].map(([field, text, err]) => (
                  <div key={field}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.84rem', cursor: 'pointer' }}>
                      <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span>{text}</span>
                    </label>
                    {err && <span className="error-text" style={{ marginLeft: '1.5rem' }}>{err}</span>}
                  </div>
                ))}
              </div>

              {/* Security Captcha */}
              <SecurityCaptcha onVerify={setIsCaptchaVerified} />
              {errors.captcha && <span className="error-text">{errors.captcha}</span>}
            </div>
          )}

          {/* ── Nav Buttons ── */}
          <div className="form-actions">
            {currentStep > 1
              ? <button type="button" onClick={handleBack} className="btn-secondary"><ChevronLeft style={{ width: 16, height: 16 }} /><span>Previous</span></button>
              : <div />
            }

            {currentStep < totalSteps
              ? <button type="button" onClick={handleNext} className="btn-primary"><span>Continue</span><ChevronRight style={{ width: 16, height: 16 }} /></button>
              : (
                <button type="submit" disabled={isSubmitting} className="btn-accent" style={{ padding: '0.85rem 2rem' }}>
                  {isSubmitting
                    ? <><Loader2 style={{ width: 18, height: 18 }} className="animate-spin" /><span>Submitting...</span></>
                    : <><ShieldCheck style={{ width: 18, height: 18 }} /><span>Submit Official Registration</span></>
                  }
                </button>
              )
            }
          </div>

        </form>
      </div>

      {/* ── Document Preview Modal ── */}
      {previewFile && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 20,
            maxWidth: 750,
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              padding: '1.1rem 1.5rem',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#0047AB' }}>
                  📄 Document File Preview
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{previewFile.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: 99,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', textAlign: 'center', backgroundColor: '#F8FAFC', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {previewFile.url ? (
                previewFile.type?.startsWith('image/') || previewFile.url?.startsWith('blob:') || previewFile.url?.startsWith('data:image') ? (
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                  />
                ) : (
                  <iframe
                    src={previewFile.url}
                    title={previewFile.name}
                    style={{ width: '100%', height: '65vh', border: 'none', borderRadius: 12 }}
                  />
                )
              ) : (
                <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                  Preview unavailable for this file format. File is safely attached to application.
                </div>
              )}
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'right', backgroundColor: 'var(--bg-surface)' }}>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="btn-primary"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
