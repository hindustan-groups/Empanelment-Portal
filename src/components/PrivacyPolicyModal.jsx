import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, Database, Server } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#0047AB]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Privacy &amp; Vendor Data Protection Policy</h3>
            <p className="text-xs text-slate-500">Hindustan Projects Corporate Infrastructure (empanelment.hindustanprojects.in)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span>1. Information Collection &amp; Statutory Processing</span>
            </h4>
            <p>
              When applying for vendor empanelment on <strong>empanelment.hindustanprojects.in</strong>, we collect corporate registration credentials including Company Name, GSTIN, PAN, MSME Udyam Registration, Audited Turnovers, and Bank Account credentials. This data is exclusively processed for vendor eligibility screening, statutory tax compliance, and contract allocation.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. 256-Bit SSL Vault Security</span>
            </h4>
            <p>
              All uploaded verification documents (GST REG-06, Cancelled Cheques, PAN Cards, Aadhaar Scans) are stored in encrypted cloud vaults adhering to ISO 27001 data safety protocols. Access is strictly restricted to authorized members of the Hindustan Projects Audit &amp; Procurement Committee.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>3. Non-Disclosure &amp; Commercial Confidentiality</span>
            </h4>
            <p>
              Hindustan Projects does not sell, lease, or share vendor commercial data with third-party commercial entities. Data may only be shared with Statutory Govt Authorities (GST Network, Income Tax Dept, CVC Audit Bodies) upon official legal requisition.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-600" />
              <span>4. Data Retention &amp; Vendor Rights</span>
            </h4>
            <p>
              Empaneled vendor records are retained for the duration of the active empanelment period (up to 3 Years) and subsequent statutory retention mandates under the IT Act 2000. Vendors can submit official requests to update credentials by writing to <code>empanelment@hindustanprojects.in</code>.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
          <button onClick={onClose} className="btn-primary">
            I Understand &amp; Agree
          </button>
        </div>

      </div>
    </div>
  );
}
