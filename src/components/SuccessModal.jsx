import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Download, ExternalLink, ShieldCheck, Home } from 'lucide-react';
import Logo from './Logo';
import { printCard } from '../utils/printCard';

export default function SuccessModal({ isOpen, trackingId, formData, onClose }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ED1C24', '#0047AB', '#10B981', '#F59E0B']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    alert(`Tracking ID ${trackingId} copied to clipboard!`);
  };

  const handlePrint = () => {
    printCard('success-card-element', `Hindustan Projects Empanelment Card - ${trackingId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* The Printable Card (Prints 1:1 identical to screen design) */}
      <div id="success-card-element" className="printable-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-center overflow-hidden">
        
        {/* Top Decorative Bar */}
        <div className="h-3 bg-gradient-to-r from-[#ED1C24] via-[#0047AB] to-[#ED1C24] absolute top-0 left-0 right-0"></div>

        {/* Brand Header for Official Print Verification */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 mt-1">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#ED1C24] text-white flex items-center justify-center font-black text-xs">HP</div>
            <div>
              <span className="text-xs font-black tracking-tight text-[#0047AB] block">HINDUSTAN PROJECTS (HiPRO)</span>
              <span className="text-[10px] text-slate-500 block">empanel.hindustanprojects.in</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Empanelment Card</span>
            <span className="text-xs font-mono font-bold text-[#ED1C24]">{trackingId}</span>
          </div>
        </div>

        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 dark:ring-emerald-900/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          Empanelment Filed Successfully!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
          Your vendor application has been logged into the <strong>Hindustan Projects</strong> procurement database.
        </p>

        {/* Tracking ID Badge */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Empanelment Reference Code</div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl sm:text-2xl font-black text-[#0047AB] dark:text-blue-400 tracking-wider font-mono">
              {trackingId}
            </span>
            <button
              onClick={copyTrackingId}
              title="Copy Reference Code"
              className="no-print p-1.5 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details Summary */}
        <div className="text-left p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-xs sm:text-sm space-y-2 mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Applicant Organization:</span>
            <span className="font-bold text-slate-900 dark:text-white uppercase">{formData?.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">GSTIN:</span>
            <span className="font-bold text-slate-900 dark:text-white uppercase">{formData?.gstin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Empanelment Category:</span>
            <span className="font-bold text-slate-900 dark:text-white capitalize">{formData?.category || 'Civil & Structural'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Target Domain:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">empanel.hindustanprojects.in</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Filing Date:</span>
            <span className="font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Buttons (Hidden during print via .no-print) */}
        <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={handlePrint} className="btn-secondary w-full sm:w-auto">
            <Download className="w-4 h-4" />
            <span>Print / Save Card PDF</span>
          </button>
          
          <button onClick={onClose} className="btn-primary w-full sm:w-auto">
            <Home className="w-4 h-4" />
            <span>Return to Portal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
