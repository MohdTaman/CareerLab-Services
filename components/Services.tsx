import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ServiceImageProps {
  alt: string;
  prompt: string;
  fallbackSrc: string;
  index: number;
}

const ServiceImage: React.FC<ServiceImageProps> = ({ alt, prompt, fallbackSrc, index }) => {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAttempted = useRef(false);

  const generateImage = async (isManualRetry = false) => {
    setLoading(true);
    setError(null);

    try {
      // Staggered delay: 2.5s per index to respect rate limits
      if (!isManualRetry) {
        await new Promise(resolve => setTimeout(resolve, index * 2500));
      }

      // Initialize with latest key (might have been updated via dialog)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { 
          imageConfig: { 
            aspectRatio: "16:9" 
          } 
        }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setImgSrc(`data:image/png;base64,${part.inlineData.data}`);
            setLoading(false);
            return;
          }
        }
      }
      throw new Error("No image data returned from model");
    } catch (err: any) {
      console.error(`AI Image Generation failed for ${alt}:`, err);
      const msg = err?.message || "";
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        setError("Rate limit exceeded. Try again in a moment.");
      } else {
        setError("Unable to generate custom graphic.");
      }
      setImgSrc(fallbackSrc);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasAttempted.current) {
      hasAttempted.current = true;
      generateImage();
    }
  }, []);

  const handleOpenKeySelector = async () => {
    try {
      // Check if user has selected a key, if not open dialog
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
        // After opening, retry generation
        generateImage(true);
      }
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white group/img">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-black rounded-full animate-spin mb-3"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black animate-pulse">Rendering Asset</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm p-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{error}</p>
          <div className="flex gap-2">
            <button 
              onClick={() => generateImage(true)}
              className="px-4 py-2 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              Retry
            </button>
            <button 
              onClick={handleOpenKeySelector}
              className="px-4 py-2 bg-white text-black border border-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              Use My API Key
            </button>
          </div>
        </div>
      )}

      <img 
        src={imgSrc} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${loading ? 'blur-xl scale-105 opacity-30' : 'group-hover:scale-110 opacity-100'}`} 
      />
      
      {!loading && !error && (
        <button 
          onClick={() => generateImage(true)}
          className="absolute bottom-4 right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-slate-200 hover:bg-black hover:text-white"
          title="Regenerate Image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
    </div>
  );
};

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
    fallback: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    buttonText: "Build My Perfect CV",
    prompt: `ISOMETRIC AND 2D minimalist flat vector illustration. STRICT BLACK AND WHITE PALETTE. Pure black line art on white background. Composition: A human silhouette standing next to a large structured CV document. A friendly robot assistant is nearby using a digital pen to write and optimize the content. High contrast, clean geometric lines, professional SaaS editorial style. No colors, no gradients, no gray.`
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
    fallback: "https://images.unsplash.com/photo-1454165833767-027ffea9e61c?auto=format&fit=crop&q=80&w=800",
    buttonText: "Review My CV",
    prompt: `ISOMETRIC AND 2D minimalist flat vector illustration. STRICT BLACK AND WHITE PALETTE. Pure black line art on white background. Composition: A large magnifying glass hovering over a CV document. A floating checklist dashboard with scoring meters and validation marks. Analytical feedback loop visualization with data nodes. High contrast, clean geometric lines, professional SaaS editorial style. No colors, no gradients, no gray.`
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
    fallback: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800",
    buttonText: "Optimize My LinkedIn",
    prompt: `ISOMETRIC AND 2D minimalist flat vector illustration. STRICT BLACK AND WHITE PALETTE. Pure black line art on white background. Composition: A human silhouette standing next to a professional profile frame containing the LinkedIn logo. Foreground: A robot assistant is polishing a networking node with floating signal waves, search visibility icons, and ranking arrows. High contrast, clean geometric lines, professional SaaS editorial style. No colors, no gradients, no gray.`
  }
];

const Services: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-slate-600">
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
                fallbackSrc={service.fallback} 
                index={idx}
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-transform duration-500 group-hover:scale-110">
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
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm border border-black/5">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover:text-slate-900 transition-colors font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-5 bg-slate-50 hover:bg-black text-slate-800 hover:text-white border border-slate-200 hover:border-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-lg"
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