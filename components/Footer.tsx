import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 flex items-center justify-center text-slate-900 overflow-hidden">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M25 15 L75 15 L95 45 L50 90 L5 45 Z" />
                  <path d="M5 45 L95 45" />
                  <path d="M25 15 L5 45" />
                  <path d="M25 15 L35 45" />
                  <path d="M75 15 L65 45" />
                  <path d="M75 15 L95 45" />
                  <path d="M35 45 L50 90" />
                  <path d="M65 45 L50 90" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-slate-900 font-display tracking-tight">CareerLab</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              AI-Powered Career Optimization helping global professionals secure their dream roles with precision and impact.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#service-cv-writing" className="hover:text-black transition-colors">CV Writing</a></li>
              <li><a href="#service-cv-review" className="hover:text-black transition-colors">CV Review</a></li>
              <li><a href="#service-linkedin-optimization" className="hover:text-black transition-colors">LinkedIn Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                +971 50 888 1348
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z"/></svg>
                </div>
                careerlab.connect@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
          <p>© 2024 CareerLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;