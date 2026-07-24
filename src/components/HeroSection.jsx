import React from 'react';
import { ShieldCheck, Award, Clock, FileCheck, Building2, Truck, Wrench, Compass, HardHat, PackageCheck } from 'lucide-react';

export default function HeroSection({ selectedCategory, setSelectedCategory, onStartForm }) {
  const categories = [
    { id: 'civil', name: 'Civil & Structural Contractors', icon: Building2, desc: 'EPC, Commercial & Residential Construction' },
    { id: 'mep', name: 'MEP & Electrical Services', icon: Wrench, desc: 'HVAC, Firefighting, Plumbing & High Voltage Power' },
    { id: 'suppliers', name: 'Material & Goods Suppliers', icon: PackageCheck, desc: 'Steel, Cement, Cables, Finishing Materials & Hardware' },
    { id: 'consultants', name: 'Architects & Consultants', icon: Compass, desc: 'Structural Design, BIM & Site Project Management' },
    { id: 'equipment', name: 'Machinery & Heavy Equipment', icon: Truck, desc: 'Cranes, Excavators, Concrete Batching & Rentals' },
    { id: 'site_services', name: 'Facility & Site Logistics', icon: HardHat, desc: 'Safety Equipment, Security & Workforce Support' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Decorative Brand Colors Background Blur Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Award className="w-4 h-4 text-red-600" />
            <span>Official Vendor & Contractor Registration FY 2026-27</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
            Partner with <span className="text-[#0047AB]">Hindustan</span> <span className="text-[#ED1C24]">Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct online empanelment portal for Vendors, Contractors, Machinery Suppliers, and Consultants. Fast-track technical & financial verification for active project tenders.
          </p>
        </div>

        {/* Key Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Security</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">ISO 9001:2015 Compliance</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">TAT Review</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">48-72 Hr Evaluation</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Process</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">100% Digital & Paperless</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Pan-India Panelling</div>
            </div>
          </div>
        </div>

        {/* Category Selection Grid */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Select Your Empanelment Category</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Click on your primary line of business to begin application</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    onStartForm();
                  }}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border-[#0047AB] dark:border-blue-500 ring-2 ring-[#0047AB]/20 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0047AB] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{cat.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
