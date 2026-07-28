import React, { useState, useEffect } from 'react';
import {
  Building, User, CreditCard, ShieldCheck,
  FileCheck, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft,
  DollarSign, Save, Loader2, UserCheck, Briefcase
} from 'lucide-react';
import GstVerifier from './GstVerifier';
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
  { code: 'arch',        label: 'Architect & Architectural Designer' },
  { code: 'civil',       label: 'Civil Engineer / Structural Contractor' },
  { code: 'structural',  label: 'Structural Design Consultant' },
  { code: 'electrical',  label: 'Electrical Engineering Consultant' },
  { code: 'plumbing',    label: 'Plumbing & Sanitation Specialist' },
  { code: 'fire',        label: 'Fire Protection & Safety Engineer' },
  { code: 'hvac',        label: 'HVAC & Air Conditioning Specialist' },
  { code: 'environment', label: 'Environment & Green Building Specialist' },
  { code: 'planner',     label: 'Town Planner & Master Layout Designer' },
  { code: 'urban',       label: 'Urban Designer' },
  { code: 'landscape',   label: 'Landscape Architect' },
  { code: 'security',    label: 'Security System Specialist' },
  { code: 'interior',    label: 'Interior Designer & Turnkey Decor' },
  { code: 'qs',          label: 'Quantity Surveyor & Cost Estimator' },
  { code: 'pmc',         label: 'Project / Construction Manager (PMC)' },
  { code: 'hospitality', label: 'Hospitality & Subject Specialist' },
  { code: 'other',       label: '✏️ Other – Specify Below' },
];

const DEFAULT_CATEGORIES = [
  { id: 'consultants',   label: 'Architects & BIM Engineering Consultants' },
  { id: 'civil',         label: 'Civil & Structural Engineering Contractors' },
  { id: 'mep',           label: 'MEP, HVAC & Electrical System Services' },
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

    /* Documents */
    gstDoc: null,
    panDoc: null,
    bankDoc: null,
    expDoc: null,

    /* Step 5 */
    declAntiBlacklist: false,
    declIpAssignment: false,
    declSiteVisit: false,
    signatoryName: '',
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
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds maximum limit of 10 MB');
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: {
        name: file.name || 'document.pdf',
        size: file.size || 0,
        type: file.type || 'application/pdf',
        rawFile: file
      }
    }));
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

      const ifsc = (formData.ifsc || '').trim().toUpperCase();
      if (ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
        e.ifsc = 'Invalid Bank IFSC Code format! (e.g. HDFC0001234)';
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

              <GstVerifier gstin={formData.gstin} pan={formData.pan} onVerifySuccess={handleGstVerified} />

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

                {/* Bank Details — always optional */}
                <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.85rem', letterSpacing: '0.04em' }}>
                    BANK ACCOUNT DETAILS (OPTIONAL — FOR PAYMENT PROCESSING)
                  </div>
                  <div className="form-grid-2">
                    <FieldGroup label="Account Number" optional>
                      <Input name="bankAccount" value={formData.bankAccount} onChange={handleChange}
                        placeholder="e.g. 50200088991200" />
                    </FieldGroup>
                    <FieldGroup label="IFSC Code" optional>
                      <Input name="ifsc" value={formData.ifsc} onChange={handleChange}
                        placeholder="e.g. HDFC0001234" upper />
                    </FieldGroup>
                    <FieldGroup label="Bank Branch Name" optional>
                      <Input name="bankName" value={formData.bankName} onChange={handleChange}
                        placeholder="e.g. HDFC Bank, Jaipur" />
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

              {/* Financials — corporate only */}
              {!isSoleProp && (
                <div className="form-grid-3" style={{ marginBottom: '1.75rem' }}>
                  <FieldGroup label="FY 2023-24 Turnover (₹ Lakhs)" optional>
                    <Input name="turnover2023" type="number" value={formData.turnover2023} onChange={handleChange} placeholder="₹ in Lakhs" />
                  </FieldGroup>
                  <FieldGroup label="FY 2024-25 Turnover (₹ Lakhs)" optional>
                    <Input name="turnover2024" type="number" value={formData.turnover2024} onChange={handleChange} placeholder="₹ in Lakhs" />
                  </FieldGroup>
                  <FieldGroup label="FY 2025-26 Turnover (₹ Lakhs)" optional>
                    <Input name="turnover2025" type="number" value={formData.turnover2025} onChange={handleChange} placeholder="₹ in Lakhs" />
                  </FieldGroup>
                  <FieldGroup label="Largest Single Order (₹ Lakhs)" optional>
                    <Input name="largestOrder" type="number" value={formData.largestOrder} onChange={handleChange} placeholder="₹ in Lakhs" />
                  </FieldGroup>
                  <FieldGroup label="BUA Rate Quoted (₹/sq ft)" optional>
                    <Input name="buaRate" value={formData.buaRate} onChange={handleChange} placeholder="e.g. 18" />
                  </FieldGroup>
                  <FieldGroup label="CPA Rate Quoted (₹/sq ft)" optional>
                    <Input name="cpaRate" value={formData.cpaRate} onChange={handleChange} placeholder="e.g. 10" />
                  </FieldGroup>
                </div>
              )}

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

              {/* Document Uploads — always shown, all optional */}
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                DOCUMENT UPLOADS — ALL OPTIONAL (HELPS FASTER APPROVAL)
              </div>
              <div className="form-grid-2">
                {[
                  ['gstDoc', 'GST REG-06 Certificate', '.pdf,.jpg,.png'],
                  ['panDoc', 'PAN Card Copy', '.pdf,.jpg,.png'],
                  ['bankDoc', 'Cancelled Bank Cheque', '.pdf,.jpg,.png'],
                  ['expDoc', isSoleProp ? 'Work Portfolio / COA Certificate' : 'CAD Portfolio / Work Orders', '.pdf,.jpg,.png'],
                ].map(([field, label, accept]) => (
                  <div key={field} className="upload-card">
                    <div style={{ fontSize: '0.83rem', fontWeight: 800, marginBottom: '0.4rem' }}>{label} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.75rem' }}>(Optional)</span></div>
                    {formData[field] ? (
                      <div style={{ fontSize: '0.79rem', color: '#10B981', fontWeight: 700 }}>
                        ✓ {formData[field].name}
                        <button type="button" onClick={() => handleFile(field, null)} style={{ marginLeft: 8, color: '#ED1C24', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.79rem' }}>✕ Remove</button>
                      </div>
                    ) : (
                      <label className="upload-btn">
                        <UploadCloud style={{ width: 14, height: 14 }} />
                        <span>Upload {label.split(' ')[0]}</span>
                        <input type="file" accept={accept} onChange={(e) => handleFile(field, e.target.files[0])} style={{ display: 'none' }} />
                      </label>
                    )}
                  </div>
                ))}
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

              <FieldGroup label={isSoleProp ? 'Your Full Name (as Signatory)' : 'Authorized Signatory Full Name'} required error={errors.signatoryName}>
                <Input name="signatoryName" value={formData.signatoryName} onChange={handleChange}
                  placeholder={isSoleProp ? 'e.g. Rajesh Kumar Sharma' : 'e.g. Anil Verma (Managing Director)'}
                  error={errors.signatoryName} />
              </FieldGroup>

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
    </div>
  );
}
