
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Brand Watermark Logo */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] text-slate-50 opacity-[0.03] pointer-events-none z-0 rotate-12">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M30 25 H70 L90 45 L50 90 L10 45 Z" />
          <path d="M10 45 H90" />
          <path d="M30 25 L40 45" />
          <path d="M70 25 L60 45" />
          <path d="M40 45 H60" />
          <path d="M40 45 L50 90" />
          <path d="M60 45 L50 90" />
          <path d="M30 25 L10 45" />
          <path d="M70 25 L90 45" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-12 h-12 flex items-center justify-center text-black">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M30 25 H70 L90 45 L50 90 L10 45 Z" />
                  <path d="M10 45 H90" />
                  <path d="M30 25 L40 45" />
                  <path d="M70 25 L60 45" />
                  <path d="M40 45 H60" />
                  <path d="M40 45 L50 90" />
                  <path d="M60 45 L50 90" />
                  <path d="M30 25 L10 45" />
                  <path d="M70 25 L90 45" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-black tracking-tight">CareerLab</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              AI-Powered Career Optimization helping global professionals secure their dream roles with precision and impact.
            </p>
          </div>

          <div>
            <h4 className="text-black font-bold mb-8 text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#service-cv-writing" className="hover:text-black transition-colors">CV Writing</a></li>
              <li><a href="#service-cv-review" className="hover:text-black transition-colors">CV Review</a></li>
              <li><a href="#service-linkedin-optimization" className="hover:text-black transition-colors">LinkedIn Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-8 text-xs uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center gap-3 text-sm cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-black transition-all group-hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                +971 50 888 1348
              </li>
              <li className="flex items-center gap-3 text-sm cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-black transition-all group-hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z"/></svg>
                </div>
                careerlab.connect@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-8 text-xs uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Brand Signature - Bold Solid Black Architectural Grounding */}
        <div className="flex items-start justify-center overflow-hidden h-[3rem] sm:h-[5rem] md:h-[8rem] lg:h-[12rem] xl:h-[15rem] select-none pointer-events-none mt-12">
          <h2 
            className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[15rem] xl:text-[22rem] font-black text-black leading-none tracking-tighter transform -translate-y-[2%] opacity-100"
          >
            CareerLab
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
