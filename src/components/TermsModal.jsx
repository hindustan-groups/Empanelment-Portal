import React from 'react';
import { X, Scale, AlertTriangle, ShieldCheck, CheckSquare, Award } from 'lucide-react';

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
          <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950 text-[#ED1C24]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Empanelment Terms & Anti-Bribery Integrity Pact</h3>
            <p className="text-xs text-slate-500">Official Conditions for Registration on empanel.hindustanprojects.in</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>1. Accuracy of Submitted Credentials</span>
            </h4>
            <p>
              By filing an empanelment application, the applicant vendor warrants that all information, GSTIN, PAN numbers, audited balance sheets, and work completion certificates provided are authentic and true copies. Submission of forged or misleading documents will result in immediate disqualification and legal action under statutory penal laws.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Anti-Blacklisting & Integrity Declaration</span>
            </h4>
            <p>
              The applying firm certifies that it is not blacklisted, debarred, or suspended by any Central/State Government PSU, Public Works Department (PWD), National Highway Authority (NHAI), or Indian Railways as of the date of application.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>3. Zero Tolerance for Corruption & Bribery</span>
            </h4>
            <p>
              Hindustan Projects maintains a strict zero-tolerance policy towards bribery, illegal gratification, or influence peddling. Any vendor offering unlawful commission to HiPRO employees or consultants will be permanently blacklisted across all project sites.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>4. Empanelment Rights & Tender Issuance</span>
            </h4>
            <p>
              Empanelment approval assigns a registered status to the vendor but does not guarantee the automatic award of work orders or contracts. Tenders and Purchase Orders will be invited as per project requirement and competitive financial bidding.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
          <button onClick={onClose} className="btn-primary">
            Accept & Continue
          </button>
        </div>

      </div>
    </div>
  );
}
