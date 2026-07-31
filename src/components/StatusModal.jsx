import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { printCard } from '../utils/printCard';

export default function StatusModal({ isOpen, onClose }) {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // Simulated status result
    setResult({
      id: trackingId.toUpperCase(),
      company: 'Apex Infrastructure & Logistics',
      category: 'Civil & Structural Contractors',
      submittedDate: '24 July 2026',
      stage: 'Financial Committee Review',
      status: 'Under Verification',
      steps: [
        { label: 'Application Submitted', date: '24 July 2026', done: true },
        { label: 'Document & GST Screening', date: '24 July 2026', done: true },
        { label: 'Technical & Financial Audit', date: 'In Progress', done: false, active: true },
        { label: 'Empanelment Certificate Issue', date: 'Pending', done: false },
      ]
    });
  };

  const handlePrint = () => {
    printCard('status-card-element', `Hindustan Projects Empanelment Status - ${result?.id || 'Audit'}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* The Printable Status Card */}
      <div id="status-card-element" className="printable-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Close Button (Hidden during print) */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0047AB]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Track Empanelment Status</h3>
            <p className="text-xs text-slate-500">Hindustan Projects Procurement Verification (empanel.hindustanprojects.in)</p>
          </div>
        </div>

        {/* Search Input Form (Hidden during print if results exist) */}
        <form onSubmit={handleSearch} className="no-print mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. HP-EMP-849201"
              className="form-input uppercase"
            />
            <button type="submit" className="btn-primary py-2 px-4 whitespace-nowrap">
              Search
            </button>
          </div>
        </form>

        {result && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#0047AB] dark:text-blue-400 uppercase tracking-wider">{result.id}</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{result.company}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {result.status}
              </span>
            </div>

            <div className="space-y-3">
              {result.steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    st.done ? 'bg-emerald-500 text-white' : st.active ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
                  }`}>
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{st.label}</div>
                    <div className="text-[11px] text-slate-500">{st.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePrint}
              className="no-print w-full mt-3 py-2 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Print Status Card</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
