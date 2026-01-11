
import React from 'react';
import ServiceImage from './ServiceImage';

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
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    prompt: "Isometric 2D black and white vector illustration of a professional CV being crafted. Features a sleek document with bold sections, a minimalist fountain pen, and abstract blocks representing career achievements being placed onto the layout. Flat design, clean bold lines, high contrast, isolated on white background.",
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
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e61c?auto=format&fit=crop&q=80&w=800",
    prompt: "Isometric 2D black and white vector illustration of a professional CV under review. Features a magnifying glass with a checkmark over a document, a checklist on a card showing career sections with checkmarks, and a circular score badge displaying '95 GOOD'. Flat design, clean bold lines, high contrast, isolated on white background.",
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
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800",
    prompt: "Isometric 2D black and white vector illustration of a professional social networking profile. Features a profile silhouette, nodes of connectivity spreading out to represent a global network, and stars highlighting an 'All-Star' profile rating. Flat design, clean bold lines, high contrast, isolated on white background.",
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
            <div className="h-72 overflow-hidden relative border-b border-black/5 bg-white">
              <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              
              <ServiceImage 
                alt={service.title}
                prompt={service.prompt}
                fallbackSrc={service.image}
                index={idx}
              />
              
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
