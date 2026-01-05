import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Currency } from './types';

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-slate-200 selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        
        <section id="services" className="py-24 scroll-mt-24">
          <Services />
        </section>

        <section id="pricing" className="py-24 bg-slate-50 scroll-mt-24">
          <Pricing currency={currency} onCurrencyToggle={() => setCurrency(prev => prev === Currency.AED ? Currency.USD : Currency.AED)} />
        </section>

        <section id="features" className="py-24 scroll-mt-24">
          <Features />
        </section>

        <section id="get-started" className="py-24 bg-slate-100 scroll-mt-24">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Start Your Transformation
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">Complete the form below to initiate your professional career optimization process.</p>
            </div>
            <ContactForm initialCurrency={currency} />
          </div>
        </section>

        <section className="py-24">
          <Testimonials />
        </section>

        <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
          {/* Subtle ambient light effects for depth without breaking the solid black feel */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-400/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Join hundreds of professionals who accelerated their careers with CareerLab’s AI-powered solutions.
            </p>
            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.05] active:scale-[0.97] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] shadow-xl"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* WhatsApp Business (Top of the social stack) */}
        <a 
          href="https://wa.me/971508881348" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group hover:shadow-green-500/20"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* LinkedIn (Below WhatsApp) */}
        <a 
          href="https://www.linkedin.com/company/careerlab-services/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group hover:shadow-blue-500/20"
          title="LinkedIn Profile"
        >
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>

        {/* Facebook (Below LinkedIn) */}
        <a 
          href="https://www.facebook.com/share/1By736Xjai/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group hover:shadow-blue-600/20"
          title="Facebook Page"
        >
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

        {/* Scroll Top Button (At the bottom of the stack) */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="bg-black p-4 rounded-full shadow-2xl hover:bg-slate-900 transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center group"
            title="Scroll to Top"
          >
            <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;