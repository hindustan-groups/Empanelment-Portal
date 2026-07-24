import React from 'react';
import { X, CheckCircle, FileText, AlertTriangle, ShieldCheck, Download } from 'lucide-react';

export default function GuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 text-[#ED1C24]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Empanelment Guidelines & Checklist</h3>
            <p className="text-xs text-slate-500">Hindustan Projects Vendor Onboarding Criteria</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Mandatory Checklist Before Filing:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Active 15-Digit GSTIN & PAN Card matching company title.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Minimum 3 Years Audited Profit & Loss Statements.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Work Orders or Completion Certificates of executed projects.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Valid Bank Account Details with Cancelled Cheque / Solvency.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white">Evaluation Timeline & Classification:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Class A (Contractors & EPC)</div>
                <p className="text-slate-500">Turnover &gt; ₹ 5.0 Crores per annum with proven PSU/Corporate execution.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Class B (Suppliers & Consultants)</div>
                <p className="text-slate-500">Turnover ₹ 50 Lakhs - ₹ 5 Crores with quality compliance certification.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
            <span>Note: Empanelment is subject to physical document verification and site audit by the Hindustan Projects Vendor Assessment Committee.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
