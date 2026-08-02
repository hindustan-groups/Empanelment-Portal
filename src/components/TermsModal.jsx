import React from 'react';
import { X, ShieldCheck, Scale, FileText, Lock, AlertTriangle } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
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
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Empanelment Terms &amp; Conditions</h3>
            <p className="text-xs text-slate-500">Hindustan Projects Procurement Governance (empanelment.hindustanprojects.in)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>1. Empanelment Scope &amp; Eligibility</span>
            </h4>
            <p>
              Empanelment on <strong>empanelment.hindustanprojects.in</strong> grants contractors and vendors bidding eligibility for tender allocation across commercial and residential projects of Hindustan Projects. Empanelment is subject to document verification and corporate committee approval.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>2. Document Authenticity &amp; Integrity</span>
            </h4>
            <p>
              Applicants affirm that all uploaded GST, PAN, Udyam MSME certificates, bank documents, and turnover statements are authentic. Submission of forged or misleading credentials will lead to immediate rejection, permanent blacklisting, and legal action.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>3. Smart PVC ID Card &amp; Site Gate Access</span>
            </h4>
            <p>
              Empanelled vendors are issued Smart PVC ID Cards with embedded QR verification. Site gate passes are generated via Vendor Dashboard. Cards and passes are non-transferable and must be presented to site security on demand.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4. Performance Standards &amp; De-Listing</span>
            </h4>
            <p>
              Empaneled vendors must adhere to NBC 2016 safety norms, IS material standards, and 14-Point Corporate Code of Conduct. Quarter performance scores dropping below 60% will trigger automatic de-listing.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
          <button onClick={onClose} className="btn-primary">
            I Understand &amp; Accept Terms
          </button>
        </div>

      </div>
    </div>
  );
}
