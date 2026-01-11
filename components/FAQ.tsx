
import React, { useState } from 'react';

const faqs = [
  {
    id: 'faq-0',
    question: "How does the AI optimize my documents?",
    answer: "Our engine analyzes your career history against industry-specific benchmarks to identify semantic gaps. It then re-engineers your CV's language to match the weighting patterns used by top-tier ATS platforms."
  },
  {
    id: 'faq-1',
    question: "Do human recruiters review my final CV?",
    answer: "Yes. Technology handles the data-driven optimization, but humans handle the professional nuance. Every document is polished by a career strategist to ensure your personal brand remains authentic."
  },
  {
    id: 'faq-2',
    question: "How do you handle my data privacy?",
    answer: "We use enterprise-grade encryption. Your personal data is stored in a private vault and is never used to train public models. You can request permanent deletion of your assets at any time."
  },
  {
    id: 'faq-3',
    question: "What is the turnaround time?",
    answer: "Standard turnaround is 3-5 business days. For professionals in active interview cycles, we offer priority review options with real-time updates via WhatsApp."
  },
  {
    id: 'faq-4',
    question: "Is LinkedIn Pro worth the investment?",
    answer: "87% of modern hiring occurs via LinkedIn. Our optimization ensures your profile appears in the top 1% of searches, turning your profile into an inbound lead generator for recruiters."
  },
  {
    id: 'faq-5',
    question: "What if I need updates later?",
    answer: "We offer a 7-day revision window post-delivery. We also provide long-term career support, including seasonal CV check-ins and LinkedIn audits for our premium clients."
  }
];

const FAQItem: React.FC<{ id: string; question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ id, question, answer, isOpen, onClick }) => {
  return (
    <div className={`transition-all duration-500 rounded-[2rem] px-6 mb-3 border transform-gpu ${
      isOpen 
        ? 'border-black bg-slate-50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]' 
        : 'border-transparent hover:border-slate-200 hover:bg-slate-50/30'
    }`}>
      <button 
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        className="w-full py-7 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-all duration-500 tracking-tight ${
          isOpen ? 'text-black' : 'text-slate-600 group-hover:text-black group-hover:translate-x-1'
        }`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 transition-all duration-500 flex items-center justify-center w-10 h-10 rounded-full ${
          isOpen ? 'rotate-180 bg-black text-white' : 'bg-slate-50 text-slate-300 group-hover:text-black group-hover:bg-slate-100'
        }`}>
          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div 
        id={`${id}-panel`}
        role="region"
        aria-labelledby={id}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
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
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight">
          Questions & Answers
        </h2>
        <p className="text-slate-500 text-lg font-medium">
          Quick insights into our technology and expert process.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-3 md:p-6 border border-slate-100 shadow-sm">
        {faqs.map((faq, idx) => (
          <FAQItem 
            key={faq.id}
            id={faq.id}
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
          className="inline-flex items-center gap-2 text-black font-bold border-b-2 border-black pb-1 hover:text-slate-600 hover:border-slate-600 transition-all group"
        >
          Speak with a strategist
          <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FAQ;
