import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenKeySelector = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
      }
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <svg className="w-9 h-9 text-slate-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 15 L75 15 L95 45 L50 90 L5 45 Z" />
                <path d="M5 45 L95 45" />
                <path d="M25 15 L5 45" />
                <path d="M25 15 L35 45" />
                <path d="M75 15 L65 45" />
                <path d="M75 15 L95 45" />
                <path d="M35 45 L50 90" />
                <path d="M65 45 L50 90" />
              </svg>
            </div>
            <span className="text-2xl font-bold font-display text-slate-900 tracking-tight">CareerLab</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-slate-600 hover:text-black transition-colors text-sm font-medium">Services</a>
            <a href="#pricing" className="text-slate-600 hover:text-black transition-colors text-sm font-medium">Pricing</a>
            <a href="#features" className="text-slate-600 hover:text-black transition-colors text-sm font-medium">Why Us</a>
            
            <button 
              onClick={handleOpenKeySelector}
              className="p-2 text-slate-400 hover:text-black transition-colors"
              title="API Key Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/25"
            >
              Get Started Now
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={handleOpenKeySelector}
              className="p-2 text-slate-400 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;