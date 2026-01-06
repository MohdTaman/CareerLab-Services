import React from 'react';
import ServiceImage from './ServiceImage';

const steps = [
  {
    number: "01",
    title: "Secure Onboarding",
    description: "Submit your current CV and target job details. Your data is instantly encrypted and synced to our secure OneDrive cloud.",
    prompt: "ISOMETRIC minimalist line art. STRICT BLACK AND WHITE. A sleek tablet displaying a digital form with a lock icon. Floating data nodes connecting to a cloud symbol. Pure black lines on white background.",
    fallback: "https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&q=80&w=400"
  },
  {
    number: "02",
    title: "Strategic Audit",
    description: "Our experts perform a gap analysis comparing your profile against high-level ATS benchmarks and recruiter expectations.",
    prompt: "ISOMETRIC minimalist line art. STRICT BLACK AND WHITE. A professional workspace with a large magnifying glass hovering over complex data charts and document layers. Pure black lines on white background.",
    fallback: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
  },
  {
    number: "03",
    title: "Expert Engineering",
    description: "We leverage proprietary AI models to optimize keywords while our human editors craft a narrative that resonates with hiring managers.",
    prompt: "ISOMETRIC minimalist line art. STRICT BLACK AND WHITE. A robot hand holding a professional fountain pen, writing elegant lines on a floating digital document. Pure black lines on white background.",
    fallback: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400"
  },
  {
    number: "04",
    title: "Portfolio Launch",
    description: "Receive your polished assets. You're now ready to apply with a top 1% CV that bypasses screening and commands attention.",
    prompt: "ISOMETRIC minimalist line art. STRICT BLACK AND WHITE. A professional door opening to a path of stars/light. A finished folder with a checkmark symbol floating in the center. Pure black lines on white background.",
    fallback: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400"
  }
];

const Process: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
          The CareerLab Workflow
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
          A seamless transition from a professional plateau to global career acceleration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection line for desktop */}
        <div className="hidden lg:block absolute top-1/4 left-0 w-full h-px bg-slate-100 -z-10"></div>
        
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col group">
            <div className="relative mb-8 rounded-[2rem] overflow-hidden border border-slate-100 bg-white aspect-video shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-black">
              <ServiceImage 
                alt={step.title} 
                prompt={step.prompt} 
                fallbackSrc={step.fallback} 
                index={idx + 4} // Higher index for staggered loading after services
              />
              <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full z-20">
                STEP {step.number}
              </div>
            </div>
            
            <div className="px-2">
              <h3 className="text-xl font-bold text-black mb-3 group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-3">
                <span className="text-slate-200 font-black text-2xl">{step.number}</span>
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
        <p className="text-slate-900 font-bold mb-6 italic">"The process was incredibly smooth. I uploaded my CV on a Monday and had a full career suite ready for applications by Friday."</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black uppercase">JD</div>
          <div className="text-left">
            <p className="text-xs font-black uppercase text-black">James D.</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Architect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;