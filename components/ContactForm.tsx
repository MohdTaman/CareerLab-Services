
import React, { useState } from 'react';
import { ServiceType, Currency } from '../types';

const services = [
  { name: ServiceType.CV_WRITING, priceAED: 150, priceUSD: 40 },
  { name: ServiceType.CV_REVIEW, priceAED: 150, priceUSD: 40 },
  { name: ServiceType.LINKEDIN_OPTIMIZATION, priceAED: 325, priceUSD: 88 },
];

interface ContactFormProps {
  initialCurrency: Currency;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialCurrency }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetJob: '',
    linkedInUrl: '',
    service: ServiceType.CV_WRITING,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending_to_gmail' | 'syncing_onedrive'>('idle');

  const selectedServiceData = services.find(s => s.name === formData.service);
  const total = initialCurrency === Currency.AED 
    ? selectedServiceData?.priceAED 
    : selectedServiceData?.priceUSD;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('sending_to_gmail');
    
    // Step 1: Simulate the professional upload and sync feedback
    setTimeout(() => {
      setSubmissionStatus('syncing_onedrive');
      
      setTimeout(() => {
        // Step 2: Redirect to PayPal with the hosted button configuration
        // Using window.location.href to trigger the PayPal checkout with options
        const paypalUrl = new URL("https://www.paypal.com/cgi-bin/webscr");
        paypalUrl.searchParams.append("cmd", "_s-xclick");
        paypalUrl.searchParams.append("hosted_button_id", "VFMSWR6TNG2PE");
        paypalUrl.searchParams.append("on0", "Our Services");
        paypalUrl.searchParams.append("os0", formData.service);
        paypalUrl.searchParams.append("currency_code", "USD");
        
        window.location.href = paypalUrl.toString();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-black transition-all duration-500">
      <form onSubmit={handleCheckout} className="p-8 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black">Phone Number</label>
            <input 
              required
              type="tel" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black">Target Job Title</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="Senior Product Manager"
              value={formData.targetJob}
              onChange={e => setFormData({...formData, targetJob: e.target.value})}
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black">LinkedIn Profile URL</label>
            <input 
              type="url" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedInUrl}
              onChange={e => setFormData({...formData, linkedInUrl: e.target.value})}
            />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Required for LinkedIn Pro optimization service</p>
          </div>
        </div>

        <div className="space-y-12 mb-12">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-black">Select Service</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({...formData, service: s.name})}
                  className={`p-5 rounded-2xl border transition-all duration-300 text-left group active:scale-95 ${formData.service === s.name ? 'border-black bg-slate-50 text-black shadow-lg scale-[1.02]' : 'border-slate-100 bg-slate-50 text-black hover:border-slate-200 hover:shadow-md'}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1 text-black">{s.name}</div>
                  <div className="text-xl font-black text-black group-hover:text-black transition-colors">
                      {initialCurrency === Currency.AED ? 'AED' : '$'}{initialCurrency === Currency.AED ? s.priceAED : s.priceUSD}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-widest text-black">Upload Current CV</label>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Syncs to OneDrive</span>
              </div>
            </div>
            <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center hover:border-black hover:bg-slate-50 transition-all duration-300 cursor-pointer group">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
              />
              <div className="text-black">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform border border-slate-100">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="font-black text-black text-base">{file ? file.name : 'Drop your CV here'}</p>
                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest italic">careerlab.connect@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-100 gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Final Step</p>
            <p className="text-2xl font-black text-black uppercase tracking-tighter">Review & Checkout</p>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto px-12 py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-black/30 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900 hover:scale-[1.03] active:scale-[0.97]'}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{submissionStatus === 'sending_to_gmail' ? 'Preparing Assets...' : 'Syncing OneDrive...'}</span>
              </div>
            ) : (
              <>
                Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
