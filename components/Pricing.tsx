
import React from 'react';
import { Currency } from '../types';

interface PricingProps {
  currency: Currency;
  onCurrencyToggle: () => void;
}

const pricingData = [
  {
    name: "CV Review",
    priceAED: 150,
    priceUSD: 40,
    delivery: "2–3 Business Days",
    deliverables: [
      "ATS Score Benchmark",
      "Keyword Gap Analysis",
      "Professional Content Audit",
      "Formatting & Layout Fixes",
      "Impact & Verb Strength Check",
      "Grammar & Syntax Review",
      "Industry Standard Comparison",
      "Skills Section Restructuring",
      "Contact Info Optimization",
      "1 Targeted Revision Round"
    ],
    featured: false
  },
  {
    name: "CV Writing",
    priceAED: 150,
    priceUSD: 40,
    delivery: "3–5 Business Days",
    deliverables: [
      "Full Professional Rewrite",
      "ATS Structure Engineering",
      "Keyword Targeting Strategy",
      "Achievement-Based Content",
      "Modern Executive Template",
      "Career Path Consultation",
      "Active Voice Transformation",
      "Strategic Layout Design",
      "PDF & Word Source Files",
      "Unlimited Revisions (7 Days)"
    ],
    featured: true
  },
  {
    name: "LinkedIn Pro",
    priceAED: 325,
    priceUSD: 88,
    delivery: "3–5 Business Days",
    deliverables: [
      "SEO-Driven Headline Design",
      "Engaging Brand Summary",
      "Experience Keyword Polish",
      "Custom Visual Banner Design",
      "URL Customization Guide",
      "Recruiter Visibility Setup",
      "Network Growth Strategy",
      "Skills Section Curation",
      "Featured Section Setup",
      "All-Star Status Path"
    ],
    featured: false
  }
];

const Pricing: React.FC<PricingProps> = ({ currency, onCurrencyToggle }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight">
            Simple. Transparent. Fair.
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Premium career optimization starting from as low as {currency === Currency.USD ? '$40' : 'AED 150'}.
          </p>
        </div>
        
        <div 
          className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 self-start shadow-sm"
          role="group"
          aria-label="Currency Selector"
        >
          <button 
            onClick={() => currency !== Currency.USD && onCurrencyToggle()}
            aria-pressed={currency === Currency.USD}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-90 ${currency === Currency.USD ? 'bg-black text-white shadow-lg' : 'text-slate-400 hover:text-black'}`}
          >
            USD
          </button>
          <button 
            onClick={() => currency !== Currency.AED && onCurrencyToggle()}
            aria-pressed={currency === Currency.AED}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-90 ${currency === Currency.AED ? 'bg-black text-white shadow-lg' : 'text-slate-400 hover:text-black'}`}
          >
            AED
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingData.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-[2.5rem] p-10 transition-all duration-500 group border border-black transform-gpu
              ${plan.featured 
                ? 'bg-black glow-card-dark md:scale-105 z-10 hover:scale-[1.1]' 
                : 'bg-white glow-card hover:scale-[1.05]'
              }`}
          >
            {plan.featured && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl border border-black">
                Most Popular
              </div>
            )}
            
            <h3 className={`text-xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{currency === Currency.AED ? 'AED' : '$'}{currency === Currency.AED ? plan.priceAED : plan.priceUSD}</span>
              <span className={`text-sm font-medium ${plan.featured ? 'text-slate-400' : 'text-slate-400'}`}>/ service</span>
            </div>

            <div className={`text-xs font-bold uppercase tracking-widest mb-8 px-4 py-2.5 rounded-xl border border-black/10 transition-colors duration-300 ${plan.featured ? 'bg-white/10 text-white border-white/20 group-hover:bg-white/20' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'}`}>
              Delivery: {plan.delivery}
            </div>

            <ul className="space-y-4 mb-10" aria-label={`${plan.name} features`}>
              {plan.deliverables.map((item, dIdx) => (
                <li key={dIdx} className="flex items-center gap-3 text-sm group/item">
                  <div 
                    aria-hidden="true" 
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 transform-gpu group-hover:scale-125 group-hover:rotate-6 ${plan.featured ? 'bg-white/10 group-hover:bg-white/30' : 'bg-slate-100 group-hover:bg-black group-hover:text-white'}`}
                  >
                    <svg className={`w-3 h-3 transition-colors duration-500 ${plan.featured ? 'text-white' : 'text-black group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${plan.featured ? 'text-white group-hover:text-slate-200' : 'text-slate-600 group-hover:text-black'}`}>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${plan.featured ? 'bg-white text-black hover:bg-slate-50 hover:shadow-xl shadow-md' : 'bg-black text-white hover:bg-slate-900 shadow-xl shadow-black/20'}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
