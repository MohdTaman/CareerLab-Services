
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
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-transparent">
      {/* Global Galaxy Background is handled at App Level */}
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center flex flex-col items-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm text-slate-900 border border-black text-[11px] font-bold mb-10 shadow-sm transition-transform duration-500 hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            AI-POWERED CAREER SOLUTIONS
          </div>
          
          {/* Main Massive Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-black mb-8 leading-[0.9] tracking-tighter whitespace-nowrap text-black">
            Professional <span className="text-slate-500/80">CV & LinkedIn</span> Services
          </h1>
          
          {/* Large Supporting Copy */}
          <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto mb-14 leading-relaxed font-medium">
            Transform your career with AI-powered optimization. Bypass screening algorithms, attract recruiters, and secure interviews faster with CareerLab.
          </p>
          
          {/* High Contrast Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14 w-full">
            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-12 py-6 bg-black text-white rounded-full font-black text-xl transition-all duration-300 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-black/30 min-w-[280px]"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-12 py-6 bg-white text-black rounded-full font-black text-xl transition-all duration-300 hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.97] border border-black shadow-sm hover:shadow-xl hover:shadow-black/5 min-w-[280px]"
            >
              View Our Services
            </button>
          </div>

          {/* Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-28">
            {['ATS Optimized', 'Global Ready', 'Expert Review'].map((text) => (
              <div key={text} className="flex items-center gap-3 text-black font-black text-sm uppercase tracking-tight group cursor-default">
                <div 
                  aria-hidden="true" 
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-black/90 flex items-center justify-center transition-all duration-500 ease-out transform-gpu group-hover:scale-115 group-hover:bg-black group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  <svg 
                    className="w-3.5 h-3.5 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-500 ease-out" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="transition-all duration-500 group-hover:text-slate-600 group-hover:translate-x-1">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 max-w-[1400px] w-full mx-auto pt-24 border-t border-slate-200/20">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-6xl md:text-8xl font-black text-black mb-3 tracking-tighter">
                <CountUp end={1200} suffix="+" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">CVs Optimized</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-6xl md:text-8xl font-black text-black mb-3 tracking-tighter">
                <CountUp end={98} suffix="%" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">ATS Compatibility Rate</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-6xl md:text-8xl font-black text-black mb-3 tracking-tighter">
                <CountUp end={800} suffix="+" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">LinkedIn Profiles Polished</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
