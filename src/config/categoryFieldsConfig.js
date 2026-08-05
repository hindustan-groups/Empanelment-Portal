/**
 * ════════════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — CATEGORY STATUTORY FIELDS & SCHEMA CONFIGURATION
 * Config-Driven Architecture for 13 Empanelment Entity Types
 * ════════════════════════════════════════════════════════════════════════
 */

export const CATEGORY_SCHEMAS = {
  // 1. General Vendor
  vendor: {
    label: '🏢 Vendor',
    statutoryLicenseLabel: 'Trade License / Municipal Business Permit Number',
    statutoryLicenseKey: 'tradeLicenseNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'dealerCertNo', label: 'Authorized Dealer / OEM Certificate No', type: 'text', required: false },
      { name: 'brandTieups', label: 'Authorized Brands / Product Lines Handled', type: 'text', required: false }
    ],
    requiredDocs: ['tradeLicenseDoc', 'dealershipCertDoc']
  },

  // 2. Architect
  architect: {
    label: '📐 Architect',
    statutoryLicenseLabel: 'Council of Architecture (COA) Registration Number',
    statutoryLicenseKey: 'coaRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'coaValidityYear', label: 'COA License Expiry Year', type: 'number', required: true },
      { name: 'cadSoftwareUsed', label: 'Primary BIM & Architectural CAD Tools Used', type: 'text', required: false }
    ],
    requiredDocs: ['coaCertificateDoc', 'portfolioDoc']
  },

  // 3. Civil Engineer
  civil_engineer: {
    label: '🏗️ Civil Engineer',
    statutoryLicenseLabel: 'Institution of Engineers India (IEI) Chartered Engineer Reg No',
    statutoryLicenseKey: 'ieiCharteredRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'degreeSpec', label: 'Engineering Degree Specialization (B.Tech / M.Tech)', type: 'text', required: true },
      { name: 'structuralAuditorNo', label: 'Municipal Structural Auditor Registration No (if applicable)', type: 'text', required: false }
    ],
    requiredDocs: ['charteredCertDoc', 'degreeDoc']
  },

  // 4. Freelancer
  freelancer: {
    label: '👤 Freelancer',
    statutoryLicenseLabel: 'Professional Qualification / Certification ID',
    statutoryLicenseKey: 'professionalCertId',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'pastExperienceYears', label: 'Total Years of Freelance Field Experience', type: 'number', required: true },
      { name: 'portfolioUrl', label: 'Online Portfolio / GitHub / BeHance Link', type: 'text', required: false },
      { name: 'clientReferences', label: 'Major Past Client Names & Project References', type: 'text', required: false }
    ],
    requiredDocs: ['portfolioDoc', 'experienceCertDoc']
  },

  // 5. Surveyor
  surveyor: {
    label: '📐 Surveyor',
    statutoryLicenseLabel: 'Municipal / State Licensed Surveyor Registration Number',
    statutoryLicenseKey: 'municipalSurveyorLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'surveyEquipmentOwned', label: 'Survey Equipment Available (DGPS, Total Station, Drone, AutoLevel)', type: 'text', required: true },
      { name: 'calibrationValidDate', label: 'Equipment Instrument Calibration Expiry Date', type: 'date', required: false }
    ],
    requiredDocs: ['surveyorLicenseDoc', 'calibrationCertDoc']
  },

  // 6. Material Supplier
  material_supplier: {
    label: '🚚 Material Supplier',
    statutoryLicenseLabel: 'BIS / NABL Accreditation / Test Laboratory Reg No',
    statutoryLicenseKey: 'bisNablAccreditationNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'dailySupplyCapacityTons', label: 'Daily Material Dispatch Capacity (in Tons / Cu.M)', type: 'number', required: true },
      { name: 'quarryMiningPermitNo', label: 'Quarry Mining Royalty Permit No (For Sand/Aggregate Suppliers)', type: 'text', required: false }
    ],
    requiredDocs: ['nablTestReportDoc', 'quarryPermitDoc']
  },

  // 7. Contractor
  contractor: {
    label: '👷 Contractor',
    statutoryLicenseLabel: 'PWD / CPWD / MES Contractor Enrolment License Number',
    statutoryLicenseKey: 'pwdContractorLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'contractorGrade', label: 'Contractor Enrolment Class (Class-A, Class-B, Class-C, Turnkey)', type: 'text', required: true },
      { name: 'labourLicenseNo', label: 'Contract Labour (R&A) Registration License No', type: 'text', required: false },
      { name: 'epfEsicRegNo', label: 'EPF & ESIC Corporate Code Numbers', type: 'text', required: false }
    ],
    requiredDocs: ['pwdLicenseDoc', 'labourLicenseDoc']
  },

  // 8. Property Dealer
  property_dealer: {
    label: '🏠 Property Dealer',
    statutoryLicenseLabel: 'RERA Real Estate Agent Registration Number',
    statutoryLicenseKey: 'reraAgentRegNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'reraValidityYear', label: 'RERA Registration Expiry / Renewal Year', type: 'number', required: true },
      { name: 'operationalCities', label: 'Primary Operating Cities & Land Acquisition Territories', type: 'text', required: false }
    ],
    requiredDocs: ['reraCertificateDoc']
  },

  // 9. Business Associate
  business_associate: {
    label: '🤝 Business Associate',
    statutoryLicenseLabel: 'MCA Corporate Identity Number (CIN / LLPIN)',
    statutoryLicenseKey: 'mcaCinNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'moaRegistrationNo', label: 'MoA / Partnership Agreement Reg No', type: 'text', required: false },
      { name: 'authorizedSignatoryRole', label: 'Board Resolution / Power of Attorney Designate', type: 'text', required: true }
    ],
    requiredDocs: ['cinCertificateDoc', 'boardResolutionDoc']
  },

  // 10. Financer
  financer: {
    label: '💼 Financer',
    statutoryLicenseLabel: 'RBI NBFC License / Financial Lending Registration Number',
    statutoryLicenseKey: 'rbiNbfcLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'maxFundingCapacityCr', label: 'Maximum Project Funding Capacity (₹ in Crores)', type: 'number', required: true },
      { name: 'lendingCategory', label: 'Lending Category (Bridge Loan, Mezzanine, Equity, Construction Finance)', type: 'text', required: false }
    ],
    requiredDocs: ['rbiNbfcCertDoc', 'auditedBalanceSheetDoc']
  },

  // 11. Machine Rental Provider
  machine_rental_provider: {
    label: '🚜 Machine Rental Provider',
    statutoryLicenseLabel: 'RTO Heavy Transport & Commercial Rental Operating License',
    statutoryLicenseKey: 'rtoCommercialRentalNo',
    statutoryLicenseRequired: false,
    customFields: [
      { name: 'fleetCount', label: 'Total Heavy Equipment & Crane Units Owned', type: 'number', required: true },
      { name: 'equipmentTypesOwned', label: 'Equipment Fleet Details (JCB, Tower Crane, Hyva, Excavator)', type: 'text', required: true },
      { name: 'rtoFitnessValidYear', label: 'RTO Fleet Fitness Validity Year', type: 'number', required: false }
    ],
    requiredDocs: ['rtoFitnessCertDoc', 'equipmentListDoc']
  },

  // 12. Transporter
  transporter: {
    label: '🚛 Transporter',
    statutoryLicenseLabel: 'National Goods Carriage Transport License Number',
    statutoryLicenseKey: 'goodsCarriagePermitNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'heavyFleetCount', label: 'Total Heavy Commercial Vehicles / Trailers in Fleet', type: 'number', required: true },
      { name: 'transitInsurancePolicyNo', label: 'Goods Transit Insurance Policy Number', type: 'text', required: false }
    ],
    requiredDocs: ['goodsCarriagePermitDoc', 'transitInsuranceDoc']
  },

  // 13. Fruits & Vegetables Supplier
  fruits_vegetables: {
    label: '🍎 Fruits & Vegetables',
    statutoryLicenseLabel: 'FSSAI Food Safety License Number',
    statutoryLicenseKey: 'fssaiLicenseNo',
    statutoryLicenseRequired: true,
    customFields: [
      { name: 'fssaiExpiryDate', label: 'FSSAI License Expiry Date', type: 'date', required: true },
      { name: 'apmcMandiRegNo', label: 'APMC Mandi Yard License / Registration Number', type: 'text', required: false },
      { name: 'hasColdStorageFacility', label: 'Cold Storage / Refrigerated Logistics Available?', type: 'boolean', required: false }
    ],
    requiredDocs: ['fssaiCertificateDoc', 'apmcRegDoc']
  }
};
