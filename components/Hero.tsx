import React, { useEffect, useState, useRef } from 'react';

const CountUp: React.FC<{ end: number; suffix?: string; prefix?: string }> = ({ end, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return <span ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients (Neutral) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-slate-100 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-800 border border-black text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            AI-Powered Career Solutions
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-black via-black to-slate-600">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">CV & LinkedIn</span> Services
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-600 max-w-5xl mx-auto mb-14 leading-relaxed font-medium">
            Transform your career with AI-powered optimization. Bypass screening algorithms, attract recruiters, and secure interviews faster with CareerLab.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-black text-white rounded-full font-bold text-xl transition-all duration-300 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-black/20 min-w-[320px]"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl transition-all duration-300 hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.97] border border-black min-w-[320px]"
            >
              View Our Services
            </button>
          </div>

          {/* Trust Bar Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-24">
            {['ATS Optimized', 'Global Ready', 'Expert Review'].map((text) => (
              <div key={text} className="flex items-center gap-3 text-black font-bold text-base tracking-tight">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center shadow-md">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                {text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1400px] mx-auto pt-20 border-t border-slate-100">
            <div>
              <div className="text-4xl md:text-7xl font-black text-slate-900 mb-2 font-display">
                <CountUp end={1200} suffix="+" />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">CVs Optimized</p>
            </div>
            <div>
              <div className="text-4xl md:text-7xl font-black text-slate-900 mb-2 font-display">
                <CountUp end={98} suffix="%" />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">ATS Compatibility Rate</p>
            </div>
            <div>
              <div className="text-4xl md:text-7xl font-black text-slate-900 mb-2 font-display">
                <CountUp end={800} suffix="+" />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">LinkedIn Profiles Polished</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;