
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
      // Staggered delay: 2.5s per index to respect rate limits if auto-starting
      if (!isManualRetry) {
        await new Promise(resolve => setTimeout(resolve, index * 2500));
      }

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
        setError("AI busy (429)");
      } else if (msg.includes('API_KEY')) {
        setError("Invalid Key");
      } else {
        setError("Rendering failed");
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

  return (
    <div className="w-full h-full relative overflow-hidden bg-white group/img">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-slate-100 border-t-black rounded-full animate-spin mb-3"></div>
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-black animate-pulse flex flex-col items-center">
            <span>Engineering</span>
            <span className="mt-1 opacity-50">Visual Asset</span>
          </div>
        </div>
      )}
      
      {error && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm p-4 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">{error}</p>
          <button 
            onClick={() => generateImage(true)}
            className="text-[9px] font-black uppercase underline hover:text-black transition-all bg-black/5 px-3 py-1 rounded-full"
          >
            Retry Render
          </button>
        </div>
      )}

      <img 
        src={imgSrc} 
        alt={alt} 
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${loading ? 'blur-2xl scale-110 opacity-20' : 'group-hover:scale-110 opacity-100'}`} 
      />
      
      {!loading && !error && (
        <button 
          onClick={() => generateImage(true)}
          className="absolute bottom-4 right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-slate-200 hover:bg-black hover:text-white"
          title="Regenerate Visual"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ServiceImage;
