import React, { useState } from 'react';
import { FileText, Printer, Plus, Check, Trash2, Edit, Building2, UserCheck, ShieldCheck, Scale, Award, FileSignature } from 'lucide-react';
import Logo from './Logo';

// Company credentials — loaded from env so they don't appear in plain source
const COMPANY_GSTIN = import.meta.env.VITE_COMPANY_GSTIN || '08HYJPK••••••••ZC';
const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || '+91-7597000601';

export default function ContractManager({ selectedVendor }) {
  const [activeDocType, setActiveDocType] = useState('declaration'); // 'declaration' | 'contract' | 'work_order'
  
  // State for Contractor Declaration
  const [declaration, setDeclaration] = useState({
    date: new Date().toISOString().split('T')[0],
    projectName: selectedVendor?.primaryRole ? `${selectedVendor.primaryRole} Site` : 'Tejpratap Ji\'s House, Kamla Vihar',
    firmName: selectedVendor?.companyName || 'Self',
    address: selectedVendor?.address || 'Kuchaman (Raj.), Shriwal Colony, Jodhraj Phatak, Bhilwara',
    proprietorName: selectedVendor?.contactName || 'Ramnivas Saini',
    contactInfo: selectedVendor?.phone || '+91-97727 2604',
    experience: 'Since 2012',
    workItem: 'Granite / Marble / Tile working',
    teamSize: '15-20 Mason + Labour',
    rateDetails: 'Granite - 40 Rs/Sqft\nMarble - 30 Rs/Sqft\nTiles (2x4) - 25 Rs/Sqft\nTiles (4x8) - 30 Rs/Sqft\nMoulding - 110 Rs/Rft (double)',
    quantityCompletionTime: 'Base - 10 Rs/Sqft\nLift charge (after 2 storeys) - +5 Rs/Sqft\nEpoxy - 10 Rs/Sqft',
    pmcRemark: 'Verified by PMC Team',
    terms: 'Payment with 10% stay in running bills.',
    signature: ''
  });

  // State for Contract Agreement
  const [contract, setContract] = useState({
    agreementDate: new Date().toISOString().split('T')[0],
    firstPartyName: 'Yogesh Kharol',
    firstPartyDesignation: 'Director',
    firstPartyCompany: 'HINDUSTAN PROJECTS',
    firstPartyAddress: 'Bhopal Ganj, Bhilwara (Raj.) - 311001',
    firstPartyPhone: '+91-7597000601',
    firstPartyEmail: 'hindustanprojectsofficial@gmail.com',
    
    secondPartyName: selectedVendor?.contactName || 'Prabhu Mali',
    secondPartyCompany: selectedVendor?.companyName || 'Prabhu Mali',
    secondPartyAddress: selectedVendor?.address || 'Huraniya Kheda, Riddhi, Bhilwara',
    secondPartyPhone: selectedVendor?.phone || '+91-95889 79452',
    secondPartyEmail: selectedVendor?.email || 'N/A',
    secondPartyAadhaar: '4292-4757-7740',

    purpose: 'Pathar Chunai, Plaster, Eeto ki Chunai, Steel Binding + Shuttering',
    workScopeName: 'Pathar Chunai, Plaster, Eeto ki Chunai, Steel Binding + Shuttering',
    workLocation: 'Tejpratap Ji\'s House, Kamla Vihar',
    totalAmount: '30,000',
    advanceAmount: '30,000',
    paymentMethod: 'Bank Transfer / Cheque / Cash',
    startDate: '26/06/2026',
    endDate: '04/07/2026',
    terminationNoticeDays: '1',
    disputeLocation: 'Bhilwara (भीलवाड़ा)'
  });

  // State for Work Order
  const [workOrder, setWorkOrder] = useState({
    woNo: 'WO-2026-002',
    woDate: new Date().toISOString().split('T')[0],
    contractorName: selectedVendor?.contactName || 'Prabhu Mali',
    addressContact: selectedVendor?.address || 'Huraniya Kheda, Riddhi, Bhilwara',
    phone: selectedVendor?.phone || '+91-95889 79452',
    aadhaarNo: '4292 4757 7740',
    siteLocation: 'Tejpratap Ji\'s House, Kamla Vihar',
    startDate: '26/06/2026',
    completionDate: '04/07/2026',
    items: [
      { id: 1, name: 'Steel Binding + Shuttering', unit: 'Sqft', qty: '2000', rate: '40', specs: 'As per Site' },
      { id: 2, name: 'Stone Masonry & Brick Work', unit: 'Sqft', qty: '1500', rate: '35', specs: 'IS Standard' }
    ],
    terms: [
      '1. कार्य की गुणवत्ता IS कोड / कंपनी मानक विनिर्देशों के अनुरूप होना अनिवार्य है।',
      '2. ठेकेदार द्वारा प्रयुक्त सभी सामग्री नए, अप्रयुक्त और अनुमोदित गुणवत्ता की होगी।',
      '3. नकली, निम्नस्तरीय या अस्वीकृत सामग्री पाए जाने पर तुरंत हटानी होगी।',
      '4. कार्य स्थल पर सुरक्षा मानकों (Safety Standards) का पालन करना ठेकेदार की जिम्मेदारी होगी।',
      '5. देरी होने पर LD (Liquidated Damages) / पेनल्टी वसूल की जाएगी।',
      '6. अंतिम भुगतान केवल कार्य पूर्ण होने और कंपनी द्वारा निरीक्षण व स्वीकृति के बाद किया जाएगा।',
      '7. विवाद की स्थिति में न्याय क्षेत्र केवल भीलवाड़ा (Bhilwara) होगा।'
    ]
  });

  const handlePrint = () => {
    window.print();
  };

  const handleAddItem = () => {
    setWorkOrder(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: 'New Construction Work Item', unit: 'Sqft', qty: '1000', rate: '30', specs: 'As per Site' }]
    }));
  };

  const handleRemoveItem = (id) => {
    setWorkOrder(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));
  };

  const handleUpdateItem = (id, field, val) => {
    setWorkOrder(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, [field]: val } : i)
    }));
  };

  return (
    <div>
      {/* Selector Navigation */}
      <div className="no-print" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'declaration', label: '1. Contractor Declaration (ठेकेदार घोषणा पत्र)', icon: FileText },
          { id: 'contract',    label: '2. Contract Agreement (ठेका अनुबंध)',           icon: Scale },
          { id: 'work_order',  label: '3. Work Order (कार्यादेश W.O.)',                  icon: Award },
        ].map(btn => {
          const Icon = btn.icon;
          const isActive = activeDocType === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveDocType(btn.id)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: 10,
                fontSize: '0.85rem',
                fontWeight: isActive ? 900 : 700,
                cursor: 'pointer',
                border: isActive ? '2px solid #0047AB' : '1px solid var(--border-color)',
                background: isActive ? '#0047AB' : 'var(--bg-surface)',
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Icon style={{ width: 16, height: 16 }} />
              <span>{btn.label}</span>
            </button>
          );
        })}

        <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', background: '#10B981', marginLeft: 'auto' }}>
          <Printer style={{ width: 16, height: 16 }} />
          <span>Print Official Document (A4)</span>
        </button>
      </div>

      {/* ════════════════════ DOCUMENT 1: CONTRACTOR DECLARATION ════════════════════ */}
      {activeDocType === 'declaration' && (
        <div className="printable-area" style={{ background: '#FFF', padding: '2.5rem', borderRadius: 16, border: '2px solid #CBD5E1', color: '#0F172A', fontFamily: 'Arial, sans-serif' }}>
          
          {/* Official Letterhead Header */}
          <div style={{ borderBottom: '3px double #0047AB', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0047AB', letterSpacing: '0.5px' }}>
                HINDUSTAN PROJECTS
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
                <div>(M) +91-7597000601</div>
                <div>GSTIN: <strong>{COMPANY_GSTIN}</strong></div>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2, fontWeight: 600 }}>
              Opposite Mukherji Park, Above Bhagwati Coffee House, Bhopal Ganj, BHILWARA (Raj.) - 311001
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#DC2626', textTransform: 'uppercase', marginTop: 4, letterSpacing: '0.04em', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>ARCHITECTURAL MODELLING</span> • <span>STRUCTURAL ANALYSIS</span> • <span>INTERIOR & EXTERIOR</span> • <span>CONSTRUCTION SERVICES</span> • <span>ESTIMATION</span> • <span>HOME AUTOMATION</span> • <span>CIVIL STRUCTURE TESTING</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, textDecoration: 'underline', color: '#0047AB', margin: 0, textTransform: 'uppercase' }}>
              CONTRACTOR DECLARATION (ठेकेदार घोषणा पत्र)
            </h2>
            <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              Date: <u>{declaration.date}</u>
            </div>
          </div>

          {/* Form Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1.5rem', border: '2px solid #000' }}>
            <tbody>
              <tr>
                <td style={{ width: '30%', padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>NAME OF PROJECT</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', fontWeight: 800 }}>{declaration.projectName}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>FIRM NAME</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', fontWeight: 800 }}>{declaration.firmName}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>ADDRESS</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000' }}>{declaration.address}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>PROPRIETOR NAME</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', fontWeight: 800 }}>{declaration.proprietorName}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>CONTACT INFORMATION</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', fontWeight: 800 }}>{declaration.contactInfo}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>EXPERIENCE</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000' }}>{declaration.experience}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>WORK ITEM</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', fontWeight: 800 }}>{declaration.workItem}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>TEAM SIZE</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000' }}>{declaration.teamSize}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>RATE DETAIL</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontWeight: 700 }}>{declaration.rateDetails}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.8rem', fontWeight: 900, border: '1px solid #000', backgroundColor: '#F1F5F9' }}>PMC REMARK / CHARGES</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #000', whiteSpace: 'pre-wrap' }}>{declaration.quantityCompletionTime}</td>
              </tr>
            </tbody>
          </table>

          {/* Terms & Signature */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 900, textDecoration: 'underline', marginBottom: '0.4rem' }}>TERMS & CONDITIONS:</h4>
            <ol style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              <li>{declaration.terms}</li>
              <li>कार्य की गुणवत्ता कंपनी मानक विनिर्देशों के अनुसार होना अनिवार्य है।</li>
              <li>सुरक्षा एवं श्रम कानूनों का पालन ठेकेदार की व्यक्तिगत जिम्मेदारी होगी।</li>
            </ol>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '3rem', paddingTop: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: 40, borderBottom: '1px dashed #000', width: 180, marginBottom: 4 }}></div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>AUTHORIZED PMC SIGN</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Hindustan Projects</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ height: 40, borderBottom: '1px dashed #000', width: 180, marginBottom: 4 }}></div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>CONTRACTOR SIGN & STAMP</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>({declaration.proprietorName})</div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════════════ DOCUMENT 2: CONTRACT AGREEMENT ════════════════════ */}
      {activeDocType === 'contract' && (
        <div className="printable-area" style={{ background: '#FFF', padding: '2.5rem', borderRadius: 16, border: '2px solid #CBD5E1', color: '#0F172A', fontFamily: 'Arial, sans-serif' }}>
          
          {/* Header */}
          <div style={{ borderBottom: '3px double #0047AB', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0047AB', letterSpacing: '0.5px' }}>
                HINDUSTAN PROJECTS <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>Contractual Agreement</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
                <div>(M) +91-7597000601</div>
                <div>GSTIN: <strong>{COMPANY_GSTIN}</strong></div>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2, fontWeight: 600 }}>
              10, SHREENATH TOWER, OPPOSITE COLLECTRATE, ABOVE BHAGWATI COFFEE HOUSE, BHILWARA – 311001
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0047AB', textDecoration: 'underline', textTransform: 'uppercase', margin: 0 }}>
              औपचारिक ठेका अनुबंध (CONTRACT AGREEMENT)
            </h2>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginTop: 4 }}>
              कार्य अनुबंध (CONTRACT AGREEMENT FOR PROVIDING CONTRACTUAL WORK)
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            यह एक विधिक अनुबंध है जो भारतीय कानूनों के अधीन प्रभावी है। यह अनुबंध दिनांक <u>{contract.agreementDate}</u> को निम्नलिखित पक्षों के बीच संपन्न हुआ है:
          </p>

          {/* Party Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.825rem' }}>
            <div style={{ padding: '1rem', border: '1.5px solid #0047AB', borderRadius: 10, background: '#F8FAFC' }}>
              <strong style={{ color: '#0047AB', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>प्रथम पक्ष (कार्य प्रदाता / कंपनी):</strong>
              <div>नाम: <strong>{contract.firstPartyName}</strong></div>
              <div>कंपनी नाम: <strong>{contract.firstPartyCompany}</strong></div>
              <div>पद: <strong>{contract.firstPartyDesignation}</strong></div>
              <div>पता: {contract.firstPartyAddress}</div>
              <div>फोन: {contract.firstPartyPhone}</div>
            </div>

            <div style={{ padding: '1rem', border: '1.5px solid #10B981', borderRadius: 10, background: '#F8FAFC' }}>
              <strong style={{ color: '#047857', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>द्वितीय पक्ष (सेवा प्रदाता / ठेकेदार):</strong>
              <div>नाम: <strong>{contract.secondPartyName}</strong></div>
              <div>कंपनी/व्यक्ति नाम: <strong>{contract.secondPartyCompany}</strong></div>
              <div>पता: {contract.secondPartyAddress}</div>
              <div>फोन: {contract.secondPartyPhone}</div>
              <div>आधार नंबर: <strong>{contract.secondPartyAadhaar}</strong></div>
            </div>
          </div>

          {/* 12 Statutory Clauses */}
          <div style={{ fontSize: '0.825rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <strong>1. अनुबंध का उद्देश्य (PURPOSE):</strong> यह अनुबंध <u>{contract.purpose}</u> निर्माण कार्य, रखरखाव हेतु निष्पादित किया गया है।
            </div>
            <div>
              <strong>2. कार्य का दायरा (SCOPE OF WORK):</strong> सेवा प्रदाता <u>{contract.workLocation}</u> पर निर्माण कार्य (पत्थर चुनाई, प्लास्टर, ईंटों की चुनाई, स्टील बाइंडिंग + शटरिंग) को गुणवत्ता के अनुसार निष्पादित करेगा।
            </div>
            <div>
              <strong>3. भुगतान की शर्तें (PAYMENT TERMS):</strong> कुल अनुबंध राशि ₹ <u>{contract.totalAmount}/-</u> है। अग्रिम राशि ₹ <u>{contract.advanceAmount}/-</u> का भुगतान बैंक ट्रांसफर/चेक द्वारा किया जाएगा।
            </div>
            <div>
              <strong>4. कार्य गुणवत्ता और मानक (WORK STANDARDS):</strong> सेवा प्रदाता कंपनी मानकों के अनुरूप कार्य करेगा। त्रुटि पाए जाने पर ठेकेदार अपनी लागत पर ठीक करेगा।
            </div>
            <div>
              <strong>5. समयसीमा और विलंब (TIMELINE & DELAY):</strong> कार्य समाप्ति की अपेक्षित तिथि <u>{contract.endDate}</u> होगी। विलंब होने पर पेनल्टी देय होगी।
            </div>
            <div>
              <strong>6. गोपनीयता (CONFIDENTIALITY):</strong> सेवा प्रदाता कंपनी की तकनीकी जानकारी को गोपनीय रखेगा।
            </div>
            <div>
              <strong>7. बौद्धिक संपदा (INTELLECTUAL PROPERTY):</strong> सभी डिजाइन व ड्राइंग कंपनी की बौद्धिक संपदा होंगी।
            </div>
            <div>
              <strong>8. उत्तरदायित्व और बीमा (LIABILITY & INSURANCE):</strong> श्रमिकों की सुरक्षा व दुर्घटना की जिम्मेदारी ठेकेदार की होगी।
            </div>
            <div>
              <strong>9. अनुबंध की समाप्ति (TERMINATION):</strong> शर्तों का उल्लंघन होने पर न्यूनतम <u>{contract.terminationNoticeDays}</u> दिन की पूर्व सूचना देकर अनुबंध समाप्त किया जा सकता है।
            </div>
            <div>
              <strong>10. विवाद समाधान (DISPUTE RESOLUTION):</strong> विवाद का समाधान <u>{contract.disputeLocation}</u> (स्थान) के न्यायालय के अधिकार क्षेत्र में किया जाएगा।
            </div>
            <div>
              <strong>11. पूर्ण समझौता (ENTIRE AGREEMENT):</strong> यह अनुबंध दोनों पक्षों के बीच पूर्ण सहमति को दर्शाता है।
            </div>
            <div>
              <strong>12. लागू कानून (APPLICABLE LAW):</strong> यह अनुबंध भारत सरकार के अधीन लागू सभी कानूनों के अंतर्गत शासित होगा।
            </div>
          </div>

          {/* Signature Block */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #CBD5E1' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB' }}>प्रथम पक्ष (कंपनी):</div>
              <div style={{ height: 45, borderBottom: '1px solid #000', width: 220, margin: '8px 0' }}></div>
              <div>नाम: <strong>{contract.firstPartyName}</strong></div>
              <div>पद: <strong>{contract.firstPartyDesignation}</strong></div>
            </div>

            <div style={{ padding: '0.5rem', border: '1px solid #94A3B8', borderRadius: 8, textAlign: 'center', background: '#FEF3C7', width: 140 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 900 }}>COURT FEE STAMP</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#B45309' }}>₹ 1 ONE RUPEE</div>
              <div style={{ fontSize: '0.6rem' }}>BHARAT INDIA</div>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#047857' }}>द्वितीय पक्ष (सेवा प्रदाता):</div>
              <div style={{ height: 45, borderBottom: '1px solid #000', width: 220, margin: '8px 0' }}></div>
              <div>नाम: <strong>{contract.secondPartyName}</strong></div>
              <div>मोबाइल: <strong>{contract.secondPartyPhone}</strong></div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════════════ DOCUMENT 3: WORK ORDER (कार्यादेश W.O.) ════════════════════ */}
      {activeDocType === 'work_order' && (
        <div className="printable-area" style={{ background: '#FFF', padding: '2.5rem', borderRadius: 16, border: '2px solid #CBD5E1', color: '#0F172A', fontFamily: 'Arial, sans-serif' }}>
          
          {/* Header */}
          <div style={{ borderBottom: '3px double #0047AB', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0047AB', letterSpacing: '0.5px' }}>
                HINDUSTAN PROJECTS <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>WORK-ORDER</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
                <div>(M) +91-7597000601</div>
                <div>GSTIN: <strong>{COMPANY_GSTIN}</strong></div>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2, fontWeight: 600 }}>
              10, SHREENATH TOWER, OPPOSITE COLLECTRATE, ABOVE BHAGWATI COFFEE HOUSE, BHILWARA – 311001
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 800 }}>Work Order Number:</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0047AB', fontFamily: 'monospace' }}>{workOrder.woNo}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 800 }}>Issue Date:</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>{workOrder.woDate}</div>
            </div>
          </div>

          {/* Contractor & Location Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.825rem' }}>
            <div style={{ padding: '0.85rem', border: '1px solid #CBD5E1', borderRadius: 10, background: '#FFF' }}>
              <div style={{ fontWeight: 900, color: '#0047AB', marginBottom: 2 }}>सेवा में (TO CONTRACTOR):</div>
              <div>ठेकेदार/फर्म का नाम: <strong>{workOrder.contractorName}</strong></div>
              <div>पता व संपर्क: {workOrder.addressContact}</div>
              <div>आधार ID संख्या: <strong>{workOrder.aadhaarNo}</strong></div>
            </div>

            <div style={{ padding: '0.85rem', border: '1px solid #CBD5E1', borderRadius: 10, background: '#FFF' }}>
              <div style={{ fontWeight: 900, color: '#0047AB', marginBottom: 2 }}>कार्य विवरण (SCOPE OF WORK):</div>
              <div>कार्य स्थल: <strong>{workOrder.siteLocation}</strong></div>
              <div>कार्य प्रारंभ तिथि: <strong>{workOrder.startDate}</strong></div>
              <div>कार्य पूर्णता तिथि: <strong>{workOrder.completionDate}</strong></div>
            </div>
          </div>

          {/* Items & Specifications Table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0047AB', margin: 0 }}>
                आइटम सूची एवं विनिर्देश (ITEMS & SPECIFICATIONS LIST):
              </h4>
              <button onClick={handleAddItem} className="no-print btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>
                + Add Item Line
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', border: '1.5px solid #000' }}>
              <thead>
                <tr style={{ backgroundColor: '#0047AB', color: '#FFF' }}>
                  <th style={{ padding: '0.5rem', border: '1px solid #000', width: 40 }}>S.N.</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000' }}>कार्य/आइटम का नाम</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000', width: 90 }}>इकाई (Unit)</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000', width: 80 }}>मात्रा (Qty)</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000', width: 90 }}>दर (₹/Unit)</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000' }}>तकनीकी विनिर्देश / मानक</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #000', width: 40 }} className="no-print">Action</th>
                </tr>
              </thead>
              <tbody>
                {workOrder.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ padding: '0.5rem', border: '1px solid #000', textAlign: 'center', fontWeight: 800 }}>{idx + 1}</td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000' }}>
                      <input className="no-print-input" value={item.name} onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)} style={{ width: '100%', border: 'none', background: 'none', fontWeight: 700 }} />
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000' }}>
                      <input className="no-print-input" value={item.unit} onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)} style={{ width: '100%', border: 'none', background: 'none', textAlign: 'center' }} />
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000' }}>
                      <input className="no-print-input" value={item.qty} onChange={(e) => handleUpdateItem(item.id, 'qty', e.target.value)} style={{ width: '100%', border: 'none', background: 'none', textAlign: 'center', fontWeight: 800 }} />
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000' }}>
                      <input className="no-print-input" value={item.rate} onChange={(e) => handleUpdateItem(item.id, 'rate', e.target.value)} style={{ width: '100%', border: 'none', background: 'none', textAlign: 'center', fontWeight: 900, color: '#0047AB' }} />
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000' }}>
                      <input className="no-print-input" value={item.specs} onChange={(e) => handleUpdateItem(item.id, 'specs', e.target.value)} style={{ width: '100%', border: 'none', background: 'none' }} />
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid #000', textAlign: 'center' }} className="no-print">
                      <button onClick={() => handleRemoveItem(item.id)} style={{ border: 'none', background: 'none', color: '#ED1C24', cursor: 'pointer' }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Terms & Conditions (1-14) */}
          <div style={{ marginBottom: '1.75rem', fontSize: '0.8rem', lineHeight: 1.55 }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0047AB', marginBottom: '0.35rem' }}>नियम एवं शर्तें (TERMS & CONDITIONS):</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem' }}>
              {workOrder.terms.map((t, idx) => (
                <div key={idx} style={{ color: '#334155' }}>{t}</div>
              ))}
            </div>
          </div>

          {/* Acceptance & Signatures */}
          <div style={{ padding: '1rem', borderRadius: 12, border: '1.5px solid #0047AB', background: '#F8FAFC' }}>
            <div style={{ fontWeight: 900, color: '#0047AB', fontSize: '0.85rem', marginBottom: '0.5rem' }}>स्वीकृति (ACCEPTANCE):</div>
            <p style={{ fontSize: '0.8rem', margin: '0 0 1rem 0', color: '#475569' }}>
              मैं/हम <strong>{workOrder.contractorName}</strong> उपरोक्त कार्यादेश की शर्तों व नियमों से सहमत हूँ और समयसीमा के अनुसार कार्य करने का वचन देता हूँ/देते हैं।
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>ठेकेदार के हस्ताक्षर:</div>
                <div style={{ height: 40, borderBottom: '1px solid #000', width: 200, margin: '4px 0' }}></div>
                <div style={{ fontSize: '0.75rem' }}>नाम: <strong>{workOrder.contractorName}</strong></div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0047AB' }}>कंपनी के हस्ताक्षर एवं मुहर:</div>
                <div style={{ height: 40, borderBottom: '1px solid #000', width: 200, margin: '4px 0' }}></div>
                <div style={{ fontSize: '0.75rem' }}>आधिकृत अधिकारी का नाम (Director)</div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
