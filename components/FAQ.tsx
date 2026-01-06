
import React, { useState } from 'react';

const faqs = [
  {
    question: "How does the AI optimize my documents?",
    answer: "Our engine analyzes your career history against industry-specific benchmarks to identify semantic gaps. It then re-engineers your CV's language to match the weighting patterns used by top-tier ATS platforms."
  },
  {
    question: "Do human recruiters review my final CV?",
    answer: "Yes. Technology handles the data-driven optimization, but humans handle the professional nuance. Every document is polished by a career strategist to ensure your personal brand remains authentic."
  },
  {
    question: "How do you handle my data privacy?",
    answer: "We use enterprise-grade encryption. Your personal data is stored in a private vault and is never used to train public models. You can request permanent deletion of your assets at any time."
  },
  {
    question: "What is the turnaround time?",
    answer: "Standard turnaround is 3-5 business days. For professionals in active interview cycles, we offer priority review options with real-time updates via WhatsApp."
  },
  {
    question: "Is LinkedIn Pro worth the investment?",
    answer: "87% of modern hiring occurs via LinkedIn. Our optimization ensures your profile appears in the top 1% of searches, turning your profile into an inbound lead generator for recruiters."
  },
  {
    question: "What if I need updates later?",
    answer: "We offer a 7-day revision window post-delivery. We also provide long-term career support, including seasonal CV check-ins and LinkedIn audits for our premium clients."
  }
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-black' : 'text-slate-600 group-hover:text-black'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-6 h-6 ${isOpen ? 'text-black' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
          Questions & Answers
        </h2>
        <p className="text-slate-500 text-lg font-medium">
          Quick insights into our technology and expert process.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-4 md:p-8 border border-slate-50 shadow-sm">
        {faqs.map((faq, idx) => (
          <FAQItem 
            key={idx} 
            question={faq.question} 
            answer={faq.answer} 
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Need more help?</p>
        <a 
          href="https://wa.me/971508881348" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-black font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-slate-600 hover:border-slate-600 transition-all"
        >
          Speak with a strategist
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FAQ;
