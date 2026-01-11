
import React from 'react';

const services = [
  {
    id: "service-cv-writing",
    title: "CV Writing",
    tagline: "Craft Your Future",
    description: "Stand out instantly with a professionally written, ATS-optimized CV tailored to your industry, experience level, and target role.",
    features: [
      "ATS-Optimized Formatting",
      "Industry-Specific Keywords",
      "Achievement-Focused Content",
      "Modern Professional Layout",
      "Unlimited Revisions (7 Days)"
    ],
    icon: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6a1 1 0 001 1h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 13l2 2-2 2" />
      </svg>
    ),
    buttonText: "Build My Perfect CV"
  },
  {
    id: "service-cv-review",
    title: "CV Review",
    tagline: "Refine. Improve. Succeed.",
    description: "Already have a CV? We analyze, optimize, and enhance it using AI insights and expert feedback to maximize interview success.",
    features: [
      "ATS Compatibility Analysis",
      "Keyword & Skills Optimization",
      "Content & Impact Review",
      "Readability Improvements",
      "Actionable Recommendations"
    ],
    icon: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4" />
        <circle cx="18" cy="18" r="3" strokeWidth="1.5" />
        <path d="M20.5 20.5l1.5 1.5" strokeLinecap="round" />
      </svg>
    ),
    buttonText: "Review My CV"
  },
  {
    id: "service-linkedin-optimization",
    title: "LinkedIn Optimization",
    tagline: "Be Found. Be Hired.",
    description: "Transform your LinkedIn profile into a powerful personal brand that attracts recruiters, boosts visibility, and drives opportunities.",
    features: [
      "SEO & Recruiter Search Optimization",
      "Compelling Headline & Summary",
      "Keyword-Rich Experience Sections",
      "Personal Branding Enhancement",
      "Engagement Optimization"
    ],
    icon: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
        <circle cx="19" cy="7" r="3" strokeWidth="1.5" />
        <path d="M19 4v6M16 7h6" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
    buttonText: "Optimize My LinkedIn"
  }
];

const Services: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight">
          Our Premium Services
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Expertly crafted career solutions designed for the modern job market.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            id={service.id}
            className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col group transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] glow-card border border-black scroll-mt-32"
          >
            <div className="h-72 flex items-center justify-center relative border-b border-black/5 bg-slate-50/50 group-hover:bg-white transition-colors duration-500 overflow-hidden">
              {/* Background accent */}
              <div className="absolute inset-0 opacity-[0.03] text-black pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                   <pattern id={`pattern-${idx}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                     <circle cx="2" cy="2" r="1" fill="currentColor" />
                   </pattern>
                   <rect width="100" height="100" fill={`url(#pattern-${idx})`} />
                </svg>
              </div>

              <div className="relative z-10 text-black transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 animate-float">
                {service.icon}
              </div>
              
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest shadow-lg transition-transform duration-500 group-hover:scale-110">
                  {service.tagline}
                </span>
              </div>
            </div>
            
            <div className="p-10 flex-1 flex flex-col relative z-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-black transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-1">
                {service.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-4 text-sm text-slate-600 group/item">
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm border border-black/5 transform-gpu group-hover:scale-110">
                      <svg 
                        aria-hidden="true" 
                        className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-500 transform-gpu group-hover:scale-125 group-hover:rotate-[12deg]" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover:text-slate-900 transition-colors font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/20 hover:shadow-black/30"
              >
                {service.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
