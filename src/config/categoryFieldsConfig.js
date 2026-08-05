/**
 * ════════════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — CATEGORY STATUTORY FIELDS & SCHEMA CONFIGURATION
 * Config-Driven Architecture for 13 Empanelment Entity Types
 * ════════════════════════════════════════════════════════════════════════
 */

export const CATEGORY_SCHEMAS = {
  // 1. General Vendor
  vendor: {
    code: 'vendor',
    label: '🏢 General Goods & Services Vendor',
    portalTitle: '🏢 GENERAL GOODS & SERVICES SUPPLIER EMPANELMENT',
    portalSubtitle: 'Official Registration for Authorized Distributors, OEM Dealers & Material Suppliers',
    entityNameLabel: 'Company / Firm / Trading Entity Name',
    entityNamePlaceholder: 'e.g. Acme Trading & Supply Pvt Ltd',
    statutoryLicenseLabel: 'Trade License / Municipal Business Permit Number',
    statutoryLicenseKey: 'tradeLicenseNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'dealerCertNo', label: 'Authorized Dealer / OEM Certificate No', type: 'text', placeholder: 'e.g. OEM-DEALER-2026-9901', required: false },
      { name: 'brandTieups', label: 'Authorized Brands / Product Lines Handled', type: 'text', placeholder: 'e.g. Havells, Pidilite, Tata Steel, Schneider', required: false }
    ],
    step2TechnicalFields: [
      { name: 'dealerCertNo', label: 'Authorized Dealer / OEM Certificate No', type: 'text', placeholder: 'e.g. OEM-DEALER-2026-9901', required: false },
      { name: 'brandTieups', label: 'Authorized Brands / Product Lines Handled', type: 'text', placeholder: 'e.g. Havells, Pidilite, Tata Steel, Schneider', required: false },
      { name: 'deliveryLeadTimeDays', label: 'Standard Delivery Lead Time (in Days)', type: 'number', placeholder: 'e.g. 3', required: false },
    ],
    step3CommercialFields: [
      { name: 'creditPeriodDays', label: 'Commercial Credit Period Offered (in Days)', type: 'number', placeholder: 'e.g. 30' },
      { name: 'maxSupplyOrderVal', label: 'Maximum Single Supply Order Value Capacity (₹ in Lakhs)', type: 'number', placeholder: 'e.g. 50' }
    ],
    requiredDocs: [
      { key: 'tradeLicenseDoc', label: 'Trade License / Business Permit Copy', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Municipal Corporation / Local Body Trade License or Shop & Establishment Certificate.' },
      { key: 'dealershipCertDoc', label: 'Authorized OEM / Dealership Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Manufacturer Authorization Certificate or Authorized Distributorship Letter.' }
    ]
  },

  // 2. Architect
  architect: {
    code: 'architect',
    label: '📐 Architect & Master Planner',
    portalTitle: '📐 ARCHITECTURAL & MASTER PLANNING CONSULTANT EMPANELMENT',
    portalSubtitle: 'Empanelment for Council of Architecture (COA) Registered Architects & BIM Designers',
    entityNameLabel: 'Architectural Studio / Firm Name',
    entityNamePlaceholder: 'e.g. Studio Atelier Architects & Planners',
    statutoryLicenseLabel: 'Council of Architecture (COA) Registration Number',
    statutoryLicenseKey: 'coaRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'coaValidityYear', label: 'COA License Expiry Year', type: 'number', required: true },
      { name: 'cadSoftwareUsed', label: 'Primary BIM & Architectural CAD Tools Used', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'coaValidityYear', label: 'COA License Renewal Expiry Year', type: 'number', placeholder: 'e.g. 2028', required: true },
      { name: 'cadSoftwareUsed', label: 'BIM & 3D Software Tools Used', type: 'text', placeholder: 'e.g. Revit BIM, AutoCAD, SketchUp Pro, 3ds Max, Rhino', required: true },
      { name: 'projectSpecializations', label: 'Primary Architectural Domain Expertise', type: 'text', placeholder: 'e.g. High-Rise Residential, Commercial Malls, Luxury Villas, Hospitals', required: true },
      { name: 'builtUpSqFtDesigned', label: 'Total Built-Up Area Designed to Date (in Lakh Sq. Ft.)', type: 'number', placeholder: 'e.g. 25', required: false },
    ],
    step3CommercialFields: [
      { name: 'consultancyFeePercent', label: 'Standard Architectural Design Fee (% of Project Cost)', type: 'number', placeholder: 'e.g. 2.5' },
      { name: 'sanctionLiaisonCapacity', label: 'Municipal Building Plan Sanction Liaison Capability?', type: 'select', options: ['Yes - Full Sanction Support', 'No - Design Only'] }
    ],
    requiredDocs: [
      { key: 'coaCertificateDoc', label: 'Council of Architecture (COA) Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Valid COA Registration Certificate issued by Council of Architecture, New Delhi.' },
      { key: 'portfolioDoc', label: 'Architectural Design Portfolio / Multi-Page Brochure (PDF)', accept: '.pdf', required: true, hint: 'High-res PDF presenting recent completed architectural projects, 3D renders & floor plans.' }
    ]
  },

  // 3. Civil Engineer
  civil_engineer: {
    code: 'civil_engineer',
    label: '🏗️ Civil & Structural Engineer',
    portalTitle: '🏗️ CIVIL & STRUCTURAL ENGINEERING CONSULTANT EMPANELMENT',
    portalSubtitle: 'Empanelment for Chartered Structural Engineers, Proof Consultants & Site Auditors',
    entityNameLabel: 'Engineering Consultancy / Structural Firm Name',
    entityNamePlaceholder: 'e.g. Apex Structural Consultants & Engineers',
    statutoryLicenseLabel: 'Institution of Engineers India (IEI) Chartered Engineer Reg No',
    statutoryLicenseKey: 'ieiCharteredRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'degreeSpec', label: 'Engineering Degree Specialization (B.Tech / M.Tech)', type: 'text', required: true },
      { name: 'structuralAuditorNo', label: 'Municipal Structural Auditor Registration No (if applicable)', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'degreeSpec', label: 'Engineering Degree Specialization', type: 'text', placeholder: 'e.g. B.Tech / M.Tech Structural Engineering', required: true },
      { name: 'structuralAuditorNo', label: 'Municipal Structural Auditor Registration No', type: 'text', placeholder: 'e.g. JDA/STR/2025/104', required: false },
      { name: 'analysisSoftware', label: 'Structural Analysis & Design Software', type: 'text', placeholder: 'e.g. STAAD.Pro, ETABS, SAFE, SAP2000', required: true },
      { name: 'earthquakeZoneExp', label: 'Highest Seismic Zone Designed For (Zone III / IV / V)', type: 'select', options: ['Zone V (Severe)', 'Zone IV (High)', 'Zone III (Moderate)', 'Zone II (Low)'] }
    ],
    step3CommercialFields: [
      { name: 'structuralAuditFeePerSqFt', label: 'Structural Audit / Vetting Rate (₹ / Sq. Ft.)', type: 'number', placeholder: 'e.g. 1.5' },
      { name: 'proofCheckingCapacity', label: 'Capable of Third-Party Structural Design Proof Vetting?', type: 'select', options: ['Yes - Qualified Proof Consultant', 'No - Structural Design Only'] }
    ],
    requiredDocs: [
      { key: 'charteredCertDoc', label: 'Chartered Engineer / IEI Membership Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Institution of Engineers India Chartered Engineer Registration Certificate.' },
      { key: 'degreeDoc', label: 'B.Tech / M.Tech Degree Qualification Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Engineering Degree Certificate issued by recognized University/IIT/NIT.' }
    ]
  },

  // 4. Freelancer
  freelancer: {
    code: 'freelancer',
    label: '👤 Independent Freelancer',
    portalTitle: '👤 INDEPENDENT FREELANCER & INDIVIDUAL EXPERT EMPANELMENT',
    portalSubtitle: 'Empanelment for Individual Site Supervisors, 3D Visualizers, Billing Engineers & Consultants',
    entityNameLabel: 'Freelancer Full Legal Name',
    entityNamePlaceholder: 'e.g. Mr. Ramesh Kumar Sharma',
    statutoryLicenseLabel: 'Professional Qualification / Certification ID',
    statutoryLicenseKey: 'professionalCertId',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'pastExperienceYears', label: 'Total Years of Freelance Field Experience', type: 'number', required: true },
      { name: 'portfolioUrl', label: 'Online Portfolio / GitHub / BeHance Link', type: 'text', required: false },
      { name: 'clientReferences', label: 'Major Past Client Names & Project References', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'pastExperienceYears', label: 'Total Years of Freelance Field Experience', type: 'number', placeholder: 'e.g. 7', required: true },
      { name: 'freelanceDomainSkill', label: 'Primary Professional Skill & Role', type: 'select', options: ['3D Architectural Visualizer', 'Site Quantity Surveyor & Billing Engineer', 'Interior Stylist & Decorator', 'Geotechnical Soil Consultant', 'Safety Auditor (HSE)', 'Project Management Consultant (PMC)'] },
      { name: 'portfolioUrl', label: 'Online Portfolio / GitHub / BeHance / LinkedIn Link', type: 'text', placeholder: 'e.g. https://behance.net/ramesh_designer', required: false },
      { name: 'clientReferences', label: 'Major Past Client Names & Project References', type: 'text', placeholder: 'e.g. DLF Urban, Godrej Properties, Tata Housing', required: false }
    ],
    step3CommercialFields: [
      { name: 'dailyRate', label: 'Quoted Daily Retainer Rate (₹ / Day)', type: 'number', placeholder: 'e.g. 3500' },
      { name: 'availability', label: 'Field Deployment Availability Notice Period', type: 'select', options: ['Immediate (Within 24 Hours)', 'Within 1 Week', 'Within 15 Days'] }
    ],
    requiredDocs: [
      { key: 'portfolioDoc', label: 'Freelance Work Portfolio / Resume (PDF)', accept: '.pdf', required: true, hint: 'PDF Document showing past completed work samples, drawings or project portfolio.' },
      { key: 'experienceCertDoc', label: 'Past Work Experience Certificate / Client Recommendation', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Experience Certificate or Letter of Recommendation from past employer/client.' }
    ]
  },

  // 5. Surveyor
  surveyor: {
    code: 'surveyor',
    label: '📐 Land & Topo Surveyor',
    portalTitle: '📐 LAND SURVEYING & GEOSPATIAL AGENCY EMPANELMENT',
    portalSubtitle: 'Empanelment for Licensed Land Surveyors, DGPS Operators, Total Station & Drone Surveyors',
    entityNameLabel: 'Survey Agency / Firm Name',
    entityNamePlaceholder: 'e.g. GeoPrecision Topo Surveys & Mapping',
    statutoryLicenseLabel: 'State / Municipal Licensed Surveyor Registration Number',
    statutoryLicenseKey: 'municipalSurveyorLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'surveyEquipmentOwned', label: 'Survey Equipment Available (DGPS, Total Station, Drone, AutoLevel)', type: 'text', required: true },
      { name: 'calibrationValidDate', label: 'Equipment Instrument Calibration Expiry Date', type: 'date', required: false }
    ],
    step2TechnicalFields: [
      { name: 'surveyEquipmentOwned', label: 'Survey Equipment Available', type: 'text', placeholder: 'e.g. DGPS Receiver, Leica Total Station, Survey Drone, AutoLevel', required: true },
      { name: 'calibrationValidDate', label: 'Instrument Calibration Expiry Date', type: 'date', required: false },
      { name: 'dailySurveyCapacityAcres', label: 'Daily Topo Surveying Capacity (in Acres / Day)', type: 'number', placeholder: 'e.g. 50', required: true },
      { name: 'gisSoftwareUsed', label: 'GIS & Mapping Software Software Used', type: 'text', placeholder: 'e.g. QGIS, ArcGIS, Civil 3D, Global Mapper', required: false }
    ],
    step3CommercialFields: [
      { name: 'topoSurveyRatePerAcre', label: 'Topographical Survey Rate (₹ / Acre)', type: 'number', placeholder: 'e.g. 800' },
      { name: 'contourMappingRatePerAcre', label: 'Contour & Boundary Demarcation Rate (₹ / Acre)', type: 'number', placeholder: 'e.g. 1200' }
    ],
    requiredDocs: [
      { key: 'surveyorLicenseDoc', label: 'Licensed Surveyor Registration Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Municipal Corporation / State Revenue Dept Licensed Surveyor Reg Certificate.' },
      { key: 'calibrationCertDoc', label: 'DGPS / Total Station Instrument Calibration Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Valid Calibration Certificate issued by NABL Accredited Instrument Lab.' }
    ]
  },

  // 6. Material Supplier
  material_supplier: {
    code: 'material_supplier',
    label: '🚚 Construction Material Supplier',
    portalTitle: '🚚 CONSTRUCTION MATERIAL & RAW GOODS SUPPLIER EMPANELMENT',
    portalSubtitle: 'Empanelment for Cement, TMT Steel, Aggregates, Sand, Bricks & RMC Suppliers',
    entityNameLabel: 'Material Supply & Trading Enterprise Name',
    entityNamePlaceholder: 'e.g. Rajasthan Building Materials & Traders',
    statutoryLicenseLabel: 'BIS / NABL Accreditation / Test Laboratory Reg No',
    statutoryLicenseKey: 'bisNablAccreditationNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'dailySupplyCapacityTons', label: 'Daily Material Dispatch Capacity (in Tons / Cu.M)', type: 'number', required: true },
      { name: 'quarryMiningPermitNo', label: 'Quarry Mining Royalty Permit No (For Sand/Aggregate Suppliers)', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'materialSubCategory', label: 'Primary Construction Material Supplied', type: 'select', options: ['TMT Rebars / Steel Fe-550D', 'Cement (OPC 53 / PPC)', 'Crushed Aggregate & Coarse Sand', 'Red Clay Bricks / AAC Blocks', 'Ready Mix Concrete (RMC)', 'Plumbing & Electrical Hardware'] },
      { name: 'dailySupplyCapacityTons', label: 'Daily Dispatch Supply Capacity (in Tons / Cu.M)', type: 'number', placeholder: 'e.g. 250', required: true },
      { name: 'quarryMiningPermitNo', label: 'Quarry Mining Royalty Permit No (For Sand/Stone)', type: 'text', placeholder: 'e.g. MINE-PERMIT-RJ-9901', required: false },
      { name: 'ownLogisticsFleet', label: 'Owned Transport Fleet for Site Delivery?', type: 'select', options: ['Yes - Own Tipper Fleet', 'Third-Party Transport'] }
    ],
    step3CommercialFields: [
      { name: 'materialCreditPeriod', label: 'Supply Credit Terms Offered (in Days)', type: 'number', placeholder: 'e.g. 45' },
      { name: 'siteUnloadingIncluded', label: 'Rate Includes Site Unloading & Stacking?', type: 'select', options: ['Included in Rate', 'Extra Unloading Charges'] }
    ],
    requiredDocs: [
      { key: 'nablTestReportDoc', label: 'Material Quality NABL / BIS Test Report', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Compressive Strength / Tensile Test Quality Certificate from NABL Accredited Lab.' },
      { key: 'quarryPermitDoc', label: 'Mining Royalty / Quarry Mining Permit Copy', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Mines & Geology Department Mining Royalty Clearance Permit.' }
    ]
  },

  // 7. Contractor
  contractor: {
    code: 'contractor',
    label: '👷 Civil & Turnkey EPC Contractor',
    portalTitle: '👷 CIVIL & TURNKEY EPC CONTRACTOR EMPANELMENT',
    portalSubtitle: 'Empanelment for PWD / CPWD Class-A Registered Civil Contractors & EPC Builders',
    entityNameLabel: 'Contracting & Construction Company Name',
    entityNamePlaceholder: 'e.g. Supreme Infra & Civil Construction Ltd',
    statutoryLicenseLabel: 'PWD / CPWD / MES Contractor Enrolment License Number',
    statutoryLicenseKey: 'pwdContractorLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'contractorGrade', label: 'Contractor Enrolment Class (Class-A, Class-B, Class-C, Turnkey)', type: 'text', required: true },
      { name: 'labourLicenseNo', label: 'Contract Labour (R&A) Registration License No', type: 'text', required: false },
      { name: 'epfEsicRegNo', label: 'EPF & ESIC Corporate Code Numbers', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'contractorGrade', label: 'Contractor Registration Enrolment Class', type: 'select', options: ['Class-A (Unlimited Value)', 'Class-B (Up to ₹10 Crores)', 'Class-C (Up to ₹2 Crores)', 'Turnkey EPC Contractor'] },
      { name: 'labourLicenseNo', label: 'Contract Labour (R&A) Registration License No', type: 'text', placeholder: 'e.g. LABOUR-LIC-RJ-5541', required: false },
      { name: 'epfEsicRegNo', label: 'EPF & ESIC Corporate Code Numbers', type: 'text', placeholder: 'e.g. EPF-RJ-12345 / ESIC-31000', required: true },
      { name: 'ownBatchingPlant', label: 'Own RMC Batching Plant & Machinery Fleet?', type: 'select', options: ['Yes - Full In-house Plant & Equipment', 'Leased / Hired Machinery'] }
    ],
    step3CommercialFields: [
      { name: 'maxContractExecutedValCr', label: 'Largest Single Work Order Executed (₹ in Crores)', type: 'number', placeholder: 'e.g. 15.5' },
      { name: 'retentionMoneyTerms', label: 'Standard Retention Deposit Accepted (%)', type: 'number', placeholder: 'e.g. 5' }
    ],
    requiredDocs: [
      { key: 'pwdLicenseDoc', label: 'PWD / CPWD Contractor Class Enrolment Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Official Contractor Enrolment Card / Certificate issued by PWD / CPWD / MES.' },
      { key: 'labourLicenseDoc', label: 'Contract Labour (R&A) Act Registration License', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Labour Department Contract Labour License permitting worker deployment on site.' }
    ]
  },

  // 8. Property Dealer
  property_dealer: {
    code: 'property_dealer',
    label: '🏠 Real Estate & Property Dealer',
    portalTitle: '🏠 REAL ESTATE ADVISORY & LAND AGENT EMPANELMENT',
    portalSubtitle: 'Empanelment for RERA Registered Real Estate Agents & Land Acquisition Advisors',
    entityNameLabel: 'Real Estate Agency / Advisory Firm Name',
    entityNamePlaceholder: 'e.g. Prime Realty & Land Advisors',
    statutoryLicenseLabel: 'RERA Real Estate Agent Registration Number',
    statutoryLicenseKey: 'reraAgentRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'reraValidityYear', label: 'RERA Registration Expiry / Renewal Year', type: 'number', required: true },
      { name: 'operationalCities', label: 'Primary Operating Cities & Land Acquisition Territories', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'reraValidityYear', label: 'RERA Registration Expiry / Renewal Year', type: 'number', placeholder: 'e.g. 2029', required: true },
      { name: 'operationalCities', label: 'Primary Operating Cities & Land Territories', type: 'text', placeholder: 'e.g. Jaipur, Kota, NCR, Udaipur', required: true },
      { name: 'landAcquisitionExpYears', label: 'Years of Experience in Commercial Land Aggregation', type: 'number', placeholder: 'e.g. 12', required: false },
      { name: 'pastLandAcquiredAcres', label: 'Total Land Parcel Aggregated to Date (in Acres)', type: 'number', placeholder: 'e.g. 150', required: false }
    ],
    step3CommercialFields: [
      { name: 'brokerageCommPercent', label: 'Standard Real Estate Brokerage Fee (%)', type: 'number', placeholder: 'e.g. 1.0' },
      { name: 'titleDueDiligenceSupport', label: 'Title Search & Revenue Land Clearances Support?', type: 'select', options: ['Yes - Complete Legal & Revenue Clearance', 'No - Matchmaking Only'] }
    ],
    requiredDocs: [
      { key: 'reraCertificateDoc', label: 'RERA Real Estate Agent Registration Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Official RERA Registration Certificate issued by State Real Estate Regulatory Authority.' }
    ]
  },

  // 9. Business Associate
  business_associate: {
    code: 'business_associate',
    label: '🤝 Corporate Business Associate',
    portalTitle: '🤝 CORPORATE BUSINESS ASSOCIATE & JOINT VENTURE EMPANELMENT',
    portalSubtitle: 'Empanelment for Strategic Corporate Partners, Sub-Contractors & JV Consortiums',
    entityNameLabel: 'Corporate Associate / Consortium Firm Name',
    entityNamePlaceholder: 'e.g. National Infrastructure Consortium LLP',
    statutoryLicenseLabel: 'MCA Corporate Identity Number (CIN / LLPIN)',
    statutoryLicenseKey: 'mcaCinNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'moaRegistrationNo', label: 'MoA / Partnership Agreement Reg No', type: 'text', required: false },
      { name: 'authorizedSignatoryRole', label: 'Board Resolution / Power of Attorney Designate', type: 'text', required: true }
    ],
    step2TechnicalFields: [
      { name: 'moaRegistrationNo', label: 'MoA / Partnership Agreement Reg No', type: 'text', placeholder: 'e.g. REG-PARTNERSHIP-2024-8841', required: false },
      { name: 'authorizedSignatoryRole', label: 'Board Resolution / Power of Attorney Designate', type: 'text', placeholder: 'e.g. Director / Managing Partner / Authorized Attorney', required: true },
      { name: 'corporateVertical', label: 'Primary Business Partnership Vertical', type: 'select', options: ['Infrastructure Development', 'Commercial Real Estate JV', 'Facility Management & Operations', 'Technology & Smart City Integrations'] },
      { name: 'netWorthCr', label: 'Company Net Worth (₹ in Crores)', type: 'number', placeholder: 'e.g. 25.0', required: false }
    ],
    step3CommercialFields: [
      { name: 'jvRevenueSharePercent', label: 'Proposed Revenue / Profit Share Structure (%)', type: 'number', placeholder: 'e.g. 15' },
      { name: 'jointBiddingCapacity', label: 'Open for Joint Bidding on Major Govt Tenders?', type: 'select', options: ['Yes - Active JV Partner', 'No - Sub-Contracting Only'] }
    ],
    requiredDocs: [
      { key: 'cinCertificateDoc', label: 'MCA Certificate of Incorporation (COI)', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Ministry of Corporate Affairs Certificate of Incorporation with CIN / LLPIN.' },
      { key: 'boardResolutionDoc', label: 'Board Resolution / Power of Attorney Letter', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Official Board Resolution authorizing signatory to execute empanelment agreements.' }
    ]
  },

  // 10. Financer
  financer: {
    code: 'financer',
    label: '💼 Financer & NBFC Partner',
    portalTitle: '💼 FINANCIAL INSTITUTION & NBFC LENDING PARTNER EMPANELMENT',
    portalSubtitle: 'Empanelment for RBI Registered NBFCs, Housing Finance Companies & Private Debt Funds',
    entityNameLabel: 'Financial Institution / NBFC Name',
    entityNamePlaceholder: 'e.g. Heritage Housing Finance & NBFC Ltd',
    statutoryLicenseLabel: 'RBI NBFC License / Financial Lending Registration Number',
    statutoryLicenseKey: 'rbiNbfcLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'maxFundingCapacityCr', label: 'Maximum Project Funding Capacity (₹ in Crores)', type: 'number', required: true },
      { name: 'lendingCategory', label: 'Lending Category (Bridge Loan, Mezzanine, Equity, Construction Finance)', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'maxFundingCapacityCr', label: 'Maximum Single Project Funding Capacity (₹ in Crores)', type: 'number', placeholder: 'e.g. 50.0', required: true },
      { name: 'lendingCategory', label: 'Lending Category & Product Portfolio', type: 'select', options: ['Construction Finance (CF)', 'Mezzanine & Bridge Debt', 'Loan Against Property (LAP)', 'Inventory Funding / Working Capital'] },
      { name: 'minInterestRatePercent', label: 'Base Lending Interest Rate (% per annum)', type: 'number', placeholder: 'e.g. 11.5', required: true },
      { name: 'rbiCategory', label: 'RBI NBFC Category Type', type: 'select', options: ['NBFC - Investment & Credit Co (ICC)', 'Housing Finance Co (HFC)', 'AIF Category II Debt Fund'] }
    ],
    step3CommercialFields: [
      { name: 'processingFeePercent', label: 'Standard Loan Processing Fee (%)', type: 'number', placeholder: 'e.g. 1.0' },
      { name: 'moratoriumPeriodMonths', label: 'Moratorium Grace Period Provided (in Months)', type: 'number', placeholder: 'e.g. 18' }
    ],
    requiredDocs: [
      { key: 'rbiNbfcCertDoc', label: 'RBI Registration Certificate of NBFC', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Certificate of Registration issued by Reserve Bank of India to operate as NBFC / HFC.' },
      { key: 'auditedBalanceSheetDoc', label: 'Audited Financial Statements (Last 2 Years)', accept: '.pdf', required: true, hint: 'Audited Balance Sheet and Profit & Loss statement signed by Chartered Accountant.' }
    ]
  },

  // 11. Machine Rental Provider
  machine_rental_provider: {
    code: 'machine_rental_provider',
    label: '🚜 Heavy Equipment Rental Provider',
    portalTitle: '🚜 HEAVY CONSTRUCTION MACHINERY & CRANE RENTAL EMPANELMENT',
    portalSubtitle: 'Empanelment for JCB, Excavator, Tower Crane, Piling Rig & Heavy Machinery Fleet Owners',
    entityNameLabel: 'Machinery Rental Agency / Fleet Owner Name',
    entityNamePlaceholder: 'e.g. Heavy Earthmovers & Crane Hire Services',
    statutoryLicenseLabel: 'RTO Heavy Transport & Commercial Rental Operating License',
    statutoryLicenseKey: 'rtoCommercialRentalNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'fleetCount', label: 'Total Heavy Equipment & Crane Units Owned', type: 'number', required: true },
      { name: 'equipmentTypesOwned', label: 'Equipment Fleet Details (JCB, Tower Crane, Hyva, Excavator)', type: 'text', required: true },
      { name: 'rtoFitnessValidYear', label: 'RTO Fleet Fitness Validity Year', type: 'number', required: false }
    ],
    step2TechnicalFields: [
      { name: 'fleetCount', label: 'Total Heavy Equipment Units Owned', type: 'number', placeholder: 'e.g. 18', required: true },
      { name: 'equipmentTypesOwned', label: 'Equipment Fleet Details Owned', type: 'text', placeholder: 'e.g. 3D JCB Earthmover, 20T Tata Hitachi Excavator, 50T Tower Crane, Hyva Tipper', required: true },
      { name: 'rtoFitnessValidYear', label: 'RTO Fleet Fitness Validity Year', type: 'number', placeholder: 'e.g. 2027', required: false },
      { name: 'operatorIncluded', label: 'Machinery Rental Includes Certified Operator & Helper?', type: 'select', options: ['Yes - With Skilled Operator & Diesel Fuel', 'Bare Rental Only (Equipment Only)'] }
    ],
    step3CommercialFields: [
      { name: 'jcbHourlyRate', label: 'JCB / Excavator Rental Rate (₹ / Hour)', type: 'number', placeholder: 'e.g. 1100' },
      { name: 'craneMonthlyRate', label: 'Heavy Crane Monthly Hire Rate (₹ / Month)', type: 'number', placeholder: 'e.g. 175000' }
    ],
    requiredDocs: [
      { key: 'rtoFitnessCertDoc', label: 'RTO Commercial Fitness & Insurance Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Regional Transport Office Vehicle Fitness and Commercial Vehicle Insurance Copy.' },
      { key: 'equipmentListDoc', label: 'Fleet Asset List & Machinery Specifications (PDF)', accept: '.pdf', required: true, hint: 'Detailed PDF document listing machine serial numbers, model year, and capacity specifications.' }
    ]
  },

  // 12. Transporter
  transporter: {
    code: 'transporter',
    label: '🚛 Logistics & Fleet Transporter',
    portalTitle: '🚛 LOGISTICS & FLEET TRANSPORTER EMPANELMENT PORTAL',
    portalSubtitle: 'Official Empanelment for National Goods Carriers, Heavy Trailers & Freight Operators',
    entityNameLabel: 'Transporter / Fleet Operations Company Name',
    entityNamePlaceholder: 'e.g. Royal Cargo & Logistics Transporters Pvt Ltd',
    statutoryLicenseLabel: 'National Goods Carriage Transport License Number',
    statutoryLicenseKey: 'goodsCarriagePermitNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'heavyFleetCount', label: 'Total Heavy Commercial Vehicles / Trailers in Fleet', type: 'number', required: true },
      { name: 'transitInsurancePolicyNo', label: 'Goods Transit Insurance Policy Number', type: 'text', required: false }
    ],
    step2TechnicalFields: [
      { name: 'heavyFleetCount', label: 'Total Heavy Commercial Vehicles / Trailers in Fleet', type: 'number', placeholder: 'e.g. 35', required: true },
      { name: 'transitInsurancePolicyNo', label: 'Goods Transit Insurance Policy Number', type: 'text', placeholder: 'e.g. POLICY-ICICI-LOMBARD-99410', required: true },
      { name: 'primaryRoutes', label: 'Primary Freight & Transit Routes Handled', type: 'text', placeholder: 'e.g. Jaipur-Delhi, NCR-Mumbai, Pan-India Highway Logistics', required: true },
      { name: 'gpsTrackingEnabled', label: 'Fleet Vehicles Installed with Real-Time GPS Tracking?', type: 'select', options: ['Yes - 100% GPS Tracked Fleet', 'Partial GPS Fleet'] }
    ],
    step3CommercialFields: [
      { name: 'freightRatePerTonKm', label: 'Standard Freight Rate (₹ / Ton / Km)', type: 'number', placeholder: 'e.g. 4.2' },
      { name: 'deturrageChargesPerDay', label: 'Site Detention / Demurrage Charges (₹ / Day)', type: 'number', placeholder: 'e.g. 1500' }
    ],
    requiredDocs: [
      { key: 'goodsCarriagePermitDoc', label: 'National Goods Carriage Transport Permit', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'State Transport Authority All-India Goods Carriage Permit Certificate.' },
      { key: 'transitInsuranceDoc', label: 'Goods Transit Insurance Policy Copy', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Active Marine / Goods Transit Cargo Insurance Policy document.' }
    ]
  },

  // 13. Fruits & Vegetables Supplier
  fruits_vegetables: {
    code: 'fruits_vegetables',
    label: '🍎 Camp & Mess Food Supplier',
    portalTitle: '🍎 CAMP & CATERING MESS FOOD SUPPLIER EMPANELMENT',
    portalSubtitle: 'Empanelment for FSSAI Certified Food Grain, Fresh Produce & Labour Camp Mess Caterers',
    entityNameLabel: 'Catering & Food Supply Enterprise Name',
    entityNamePlaceholder: 'e.g. Annapurna Food Services & Mess Caterers',
    statutoryLicenseLabel: 'FSSAI Food Safety Registration / License Number',
    statutoryLicenseKey: 'fssaiLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'fssaiExpiryDate', label: 'FSSAI License Expiry Date', type: 'date', required: true },
      { name: 'apmcMandiRegNo', label: 'APMC Mandi Yard License / Registration Number', type: 'text', required: false },
      { name: 'hasColdStorageFacility', label: 'Cold Storage / Refrigerated Logistics Available?', type: 'boolean', required: false }
    ],
    step2TechnicalFields: [
      { name: 'fssaiExpiryDate', label: 'FSSAI License Renewal Expiry Date', type: 'date', required: true },
      { name: 'apmcMandiRegNo', label: 'APMC Mandi Yard License / Registration Number', type: 'text', placeholder: 'e.g. APMC-JPR-2025-441', required: false },
      { name: 'dailyMealCapacity', label: 'Daily Labour Camp Meal Preparation Capacity (No. of Meals/Day)', type: 'number', placeholder: 'e.g. 1500', required: true },
      { name: 'hasColdStorageFacility', label: 'Cold Storage & Refrigerated Logistics Available?', type: 'select', options: ['Yes - Refrigerator Logistics Available', 'No - Daily Fresh Supply'] }
    ],
    step3CommercialFields: [
      { name: 'perWorkerMealRatePerDay', label: 'Daily Meal Rate Per Worker (₹ / Person / Day - 3 Meals)', type: 'number', placeholder: 'e.g. 140' },
      { name: 'foodHygieneAuditFreq', label: 'Third-Party Kitchen Hygiene Audit Undertaken?', type: 'select', options: ['Monthly Certified Audits', 'Quarterly Inspection'] }
    ],
    requiredDocs: [
      { key: 'fssaiCertificateDoc', label: 'FSSAI Food Safety & Standards License Certificate', accept: '.pdf,.jpg,.png,.jpeg', required: true, hint: 'Food Safety and Standards Authority of India (FSSAI) State/Central License.' },
      { key: 'apmcRegDoc', label: 'APMC Wholesale Mandi License Copy', accept: '.pdf,.jpg,.png,.jpeg', required: false, hint: 'Agricultural Produce Market Committee Wholesale Vendor Registration.' }
    ]
  }
};
