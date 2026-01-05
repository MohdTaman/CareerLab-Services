import React from 'react';

const heroFeatures = [
  {
    title: "AI Intelligence",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 2v3" />
        <rect x="5" y="5" width="14" height="12" rx="3" strokeWidth={1.2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 10h.01M15 10h.01" />
        <rect x="8" y="13" width="8" height="3" rx="1.5" strokeWidth={1.2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10.6 13v3M13.4 13v3" />
      </svg>
    )
  },
  {
    title: "ATS Results",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Global Reach",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.6 9h16.8M3.6 15h16.8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3a18.8 18.8 0 000 18M12 3a18.8 18.8 0 010 18" />
      </svg>
    )
  },
  {
    title: "Expert Review",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: "Privacy First",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Fast Results",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const Stats: React.FC = () => {
  return (
    <div className="bg-black border-y border-white/10 py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
          {heroFeatures.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="mb-4 text-slate-600 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors duration-300 text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;