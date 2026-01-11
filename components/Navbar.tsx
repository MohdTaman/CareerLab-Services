
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasKeySet, setHasKeySet] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const checkKey = async () => {
      if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasKeySet(hasKey);
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkKey();
    
    // Check key status periodically
    const interval = setInterval(checkKey, 5000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleOpenKeySelector = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
      }
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Why Us', href: '#features' },
    { name: 'FAQ', href: '#faq' },
  ];

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div 
            role="link"
            aria-label="CareerLab Home"
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg aria-hidden="true" className="w-9 h-9 text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 25 H70 L90 45 L50 90 L10 45 Z" />
                <path d="M10 45 H90" />
                <path d="M30 25 L40 45" />
                <path d="M70 25 L60 45" />
                <path d="M40 45 H60" />
                <path d="M40 45 L50 90" />
                <path d="M60 45 L50 90" />
                <path d="M30 25 L10 45" />
                <path d="M70 25 L90 45" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-black tracking-tight">CareerLab</span>
          </div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-slate-500 hover:text-black transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
            
            <li className="relative">
              <button 
                onClick={handleOpenKeySelector}
                className={`p-2 transition-all duration-300 rounded-lg flex items-center gap-2 ${hasKeySet ? 'text-slate-400 hover:text-black' : 'text-slate-900 bg-slate-100 hover:bg-slate-200 shadow-sm'}`}
                aria-label="API Key Settings"
              >
                {!hasKeySet && (
                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                   </span>
                )}
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {!hasKeySet && <span className="text-[10px] font-black uppercase tracking-widest pr-1">Connect API</span>}
              </button>
            </li>

            <li>
              <button 
                onClick={() => scrollTo('#get-started')}
                className="px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm transition-all duration-300 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/25"
              >
                Get Started
              </button>
            </li>
          </ul>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={handleOpenKeySelector}
              className={`p-2 transition-colors relative ${hasKeySet ? 'text-slate-400' : 'text-black'}`}
              aria-label="API Key Settings"
            >
              {!hasKeySet && (
                 <span className="absolute -top-1 -right-1 flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                 </span>
              )}
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors z-[60]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top duration-300"
        >
          <ul className="flex flex-col gap-8 items-center text-center">
            {navLinks.map(link => (
              <li key={link.name}>
                <button 
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-bold text-black tracking-tight hover:text-slate-600 transition-colors"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li className="w-full">
              <button 
                onClick={() => scrollTo('#get-started')}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl"
              >
                Get Started Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
