
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ServiceImageProps {
  alt: string;
  prompt: string;
  fallbackSrc: string;
  index: number;
  aspectRatio?: "1:1" | "16:9" | "4:3" | "3:4" | "9:16";
}

const MAX_RETRIES = 2;
// Global flag to track if we've hit a quota limit to prevent other instances from trying
let globalQuotaExhausted = false;

const ServiceImage: React.FC<ServiceImageProps> = ({ 
  alt, 
  prompt, 
  fallbackSrc, 
  index,
  aspectRatio = "1:1"
}) => {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const [retrying, setRetrying] = useState(0);
  const hasAttempted = useRef(false);

  const handleOpenKeySelector = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
        // Reset global state on manual key change attempt
        globalQuotaExhausted = false;
        generateImage(true, 0);
      }
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  const generateImage = async (isManualRetry = false, attemptCount = 0) => {
    // If global quota is hit and this isn't a manual retry, skip and show fallback
    if (globalQuotaExhausted && !isManualRetry) {
      setLoading(false);
      setIsQuotaExhausted(true);
      setError("Shared Quota Hit");
      return;
    }

    setLoading(true);
    setError(null);
    setIsQuotaExhausted(false);
    setRetrying(attemptCount);

    try {
      // Staggered boot-up delay to avoid hitting RPM limits immediately
      if (!isManualRetry && attemptCount === 0) {
        await new Promise(resolve => setTimeout(resolve, 2000 + (index * 5000)));
      }

      // Exponential backoff with jitter
      if (attemptCount > 0) {
        const jitter = Math.random() * 2000;
        const backoffDelay = Math.min(Math.pow(2, attemptCount) * 10000 + jitter, 45000); 
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }

      // Check if user already has a key selected
      let hasKey = false;
      if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
        hasKey = await (window as any).aistudio.hasSelectedApiKey();
      }

      // Create fresh instance to pick up potential key changes from the dialog
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { 
          imageConfig: { 
            aspectRatio: aspectRatio 
          } 
        }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setImgSrc(`data:image/png;base64,${part.inlineData.data}`);
            setLoading(false);
            setRetrying(0);
            setError(null);
            globalQuotaExhausted = false; // Reset if we successfully get an image
            return;
          }
        }
      }
      throw new Error("No image data returned");
    } catch (err: any) {
      console.error(`AI Generation Attempt ${attemptCount + 1} failed for ${alt}:`, err);
      
      const errorMsg = JSON.stringify(err).toLowerCase();
      const is429 = errorMsg.includes('429') || 
                   errorMsg.includes('resource_exhausted') || 
                   errorMsg.includes('quota') ||
                   errorMsg.includes('limit');
      
      if (is429) {
        globalQuotaExhausted = true; // Set global flag
        
        if (attemptCount < MAX_RETRIES) {
          generateImage(false, attemptCount + 1);
          return;
        }
        
        setError("API Quota Exhausted");
        setIsQuotaExhausted(true);
      } else {
        setError("Generation Unavailable");
      }
      
      setImgSrc(fallbackSrc);
      setLoading(false);
      setRetrying(0);
    }
  };

  useEffect(() => {
    if (!hasAttempted.current) {
      hasAttempted.current = true;
      generateImage();
    }
    
    // Periodically check if global quota state changed (e.g. another instance succeeded)
    const checkInterval = setInterval(() => {
      if (isQuotaExhausted && !globalQuotaExhausted) {
        generateImage(true, 0);
      }
    }, 15000);
    
    return () => clearInterval(checkInterval);
  }, [isQuotaExhausted]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-white group/img border-l border-black/5">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm px-6">
          <div className="w-8 h-8 border-[3px] border-slate-100 border-t-black rounded-full animate-spin mb-4"></div>
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-black animate-pulse flex flex-col items-center text-center">
            <span>{retrying > 0 ? `Retrying Connection...` : 'Visualizing Brand...'}</span>
          </div>
        </div>
      )}
      
      {/* Mini Overlay for Quota Exhausted but showing fallback */}
      {isQuotaExhausted && !loading && (
        <div className="absolute top-4 right-4 z-30 animate-in fade-in slide-in-from-top-2 duration-500">
          <button 
            onClick={handleOpenKeySelector}
            className="flex items-center gap-2 px-3 py-1.5 bg-black/90 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl hover:bg-black hover:scale-105 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Quota Hit? Connect Key
          </button>
        </div>
      )}

      <img 
        src={imgSrc} 
        alt={alt} 
        className={`w-full h-full object-contain transition-all duration-1000 ease-out select-none ${loading ? 'blur-2xl scale-110 opacity-30' : 'group-hover:scale-105 opacity-100'}`} 
      />
      
      {!loading && !isQuotaExhausted && (
        <button 
          onClick={() => generateImage(true, 0)}
          className="absolute bottom-4 right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-2xl border border-slate-200 hover:bg-black hover:text-white hover:scale-110"
          title="Regenerate with AI"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ServiceImage;
