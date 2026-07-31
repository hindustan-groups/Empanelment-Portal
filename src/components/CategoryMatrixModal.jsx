import React from 'react';
import { X, Layers, Award, FileText, CheckCircle2, DollarSign } from 'lucide-react';

export default function CategoryMatrixModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const categories = [
    {
      grade: 'Class A (Super Mega Projects)',
      turnover: 'Above ₹ 50 Crores',
      singleOrder: 'Min ₹ 15 Crores single order executed',
      experience: '5+ Years in Highways / Industrial Plants / Metro Rail',
      docs: '3-Yr CA Turnover Cert, GSTIN, PAN, ISO Cert, Bank Solvency ₹ 10 Cr',
      color: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200'
    },
    {
      grade: 'Class B (Major Projects)',
      turnover: '₹ 10 Crores to ₹ 50 Crores',
      singleOrder: 'Min ₹ 3 Crores single order executed',
      experience: '3+ Years in Substation / Commercial Buildings / Solar',
      docs: '3-Yr CA Turnover Cert, GSTIN, PAN, PF/ESI Registration',
      color: 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200'
    },
    {
      grade: 'Class C (Regional / Site Contracts)',
      turnover: 'Up to ₹ 10 Crores',
      singleOrder: 'Min ₹ 50 Lakhs single order executed',
      experience: '2+ Years in Civil / MEP / Equipment Rental / Supply',
      docs: 'GSTIN, PAN Card, Cancelled Cheque, MSME/Udyam Certificate',
      color: 'bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Empanelment Category & Eligibility Matrix</h3>
            <p className="text-xs text-slate-500">Classification criteria for Contractors, Suppliers & Service Providers</p>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border ${cat.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{cat.grade}</span>
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 shadow-sm border border-slate-200 dark:border-slate-700">
                  {cat.turnover}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                <div><strong>Largest Executed Order:</strong> {cat.singleOrder}</div>
                <div><strong>Track Record Requirement:</strong> {cat.experience}</div>
                <div className="md:col-span-2 text-slate-600 dark:text-slate-300">
                  <strong>Mandatory Documents:</strong> {cat.docs}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          <p className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Note on MSME / Startup Exemption:</span>
          </p>
          <p>
            Micro & Small Enterprises (MSEs) registered under Udyam / MSME Act are eligible for turnover relaxation up to 20% in Class B & C categories upon uploading a valid MSME Udyam Certificate.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
          <button onClick={onClose} className="btn-primary">
            Close Guidelines
          </button>
        </div>

      </div>
    </div>
  );
}
