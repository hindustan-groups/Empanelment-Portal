import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenPrivacyModal, onOpenTermsModal, onOpenCategoryModal }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo height={44} className="brightness-110" />
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Official Vendor & Contractor Empanelment Portal of <strong>Hindustan Projects</strong>. Facilitating transparent, paperless, and fast-track procurement for infrastructure, commercial, and engineering projects.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Subdomain Host: empanel.hindustanprojects.in</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Empanelment Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#empanelment-form-container" className="hover:text-white transition-colors">Submit Application</a></li>
              <li><button onClick={onOpenCategoryModal} className="hover:text-white transition-colors text-left">Contractor Grading Matrix</button></li>
              <li><a href="https://hindustanprojects.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Hindustan Projects Main Site</span> <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://github.com/hindustan-groups/Empanelment-Portal" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Official Git Repository</span> <ExternalLink className="w-3 h-3"/></a></li>
            </ul>
          </div>

          {/* Col 3: Support Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Procurement Helpdesk</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>empanelment@hindustanprojects.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+91 (011) 4500 8899 / 900</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>Hindustan Projects Corporate Tower, New Delhi - 110001</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} <strong>Hindustan Projects</strong>. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <button onClick={onOpenPrivacyModal} className="hover:underline hover:text-white">Privacy Policy</button>
            <button onClick={onOpenTermsModal} className="hover:underline hover:text-white">Terms of Empanelment</button>
            <button onClick={onOpenCategoryModal} className="hover:underline hover:text-white">Grading Criteria</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
