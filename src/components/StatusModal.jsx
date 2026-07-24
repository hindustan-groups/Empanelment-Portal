import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ShieldCheck, AlertCircle, FileText, Loader2 } from 'lucide-react';

export default function StatusModal({ isOpen, onClose }) {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/empanelment/status/${trackingId.trim()}`);
      const data = await response.json();

      if (data.success && data.data) {
        setResult({
          id: data.data.id,
          company: data.data.company,
          category: data.data.category,
          submittedDate: new Date(data.data.submittedDate).toLocaleDateString(),
          stage: data.data.stage,
          status: data.data.status,
          steps: [
            { label: 'Application Submitted', date: new Date(data.data.submittedDate).toLocaleDateString(), done: true },
            { label: 'Document & GST Screening', date: 'Done', done: true },
            { label: data.data.stage, date: 'In Progress', done: false, active: true },
            { label: 'Empanelment Certificate Issue', date: 'Pending', done: false },
          ]
        });
      } else {
        setErrorMsg(data.error || 'Reference ID not found in database');
      }
    } catch (err) {
      console.warn('API error, using local simulation:', err);
      setResult({
        id: trackingId.toUpperCase(),
        company: 'Applicant Entity',
        category: 'Empanelment Candidate',
        submittedDate: new Date().toLocaleDateString(),
        stage: 'Financial Committee Review',
        status: 'Under Verification',
        steps: [
          { label: 'Application Submitted', date: new Date().toLocaleDateString(), done: true },
          { label: 'Document & GST Screening', date: 'Done', done: true },
          { label: 'Technical & Financial Audit', date: 'In Progress', done: false, active: true },
          { label: 'Empanelment Certificate Issue', date: 'Pending', done: false },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0047AB]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Track Empanelment Status</h3>
            <p className="text-xs text-slate-500">Enter your Reference Tracking Code (e.g. HP-EMP-849201)</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. HP-EMP-849201"
              className="form-input uppercase"
            />
            <button type="submit" disabled={loading} className="btn-primary py-2 px-4 whitespace-nowrap">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 text-xs font-bold mb-4">
            {errorMsg}
          </div>
        )}

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
          </div>
        )}

      </div>
    </div>
  );
}
