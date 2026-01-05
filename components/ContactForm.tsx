import React, { useState } from 'react';
import { ServiceType, Currency } from '../types';

const services = [
  { name: ServiceType.CV_WRITING, priceAED: 150, priceUSD: 40 },
  { name: ServiceType.CV_REVIEW, priceAED: 150, priceUSD: 40 },
  { name: ServiceType.LINKEDIN_OPTIMIZATION, priceAED: 250, priceUSD: 68 },
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
    paymentMethod: 'paypal',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending_to_gmail' | 'syncing_onedrive' | 'notified'>('idle');
  const [step, setStep] = useState(1);

  const selectedServiceData = services.find(s => s.name === formData.service);
  const total = initialCurrency === Currency.AED 
    ? selectedServiceData?.priceAED 
    : selectedServiceData?.priceUSD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('sending_to_gmail');
    
    // Step 1: Simulate Gmail Notification
    setTimeout(() => {
      console.log('Lead data dispatched to careerlab.connect@gmail.com');
      
      // Step 2: If a file exists, simulate OneDrive Sync
      if (file) {
        setSubmissionStatus('syncing_onedrive');
        setTimeout(() => {
          console.log(`File ${file.name} synced to OneDrive (careerlab.connect@gmail.com)`);
          setSubmissionStatus('notified');
          setStep(2);
          setIsSubmitting(false);
        }, 1500);
      } else {
        setSubmissionStatus('notified');
        setStep(2);
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const handlePayPalCheckout = () => {
    window.open("https://www.paypal.com/ncp/payment/GFN8E6KSCWFJW", "_blank");
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-black">
      {step === 1 && (
        <form onSubmit={handleSubmit} className="p-8 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-black">LinkedIn Profile URL (OPTIONAL)</label>
              <input 
                type="url" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
                placeholder="https://www.linkedin.com/in/johndoe"
                value={formData.linkedInUrl}
                onChange={e => setFormData({...formData, linkedInUrl: e.target.value})}
              />
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
                  <p className="font-black text-black text-base">{file ? file.name : 'Drop your CV here to sync with our OneDrive'}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest italic">careerlab.connect@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-100 gap-6">
            <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-widest text-black mb-1">Total</p>
              <p className="text-4xl font-black text-black">{initialCurrency === Currency.AED ? 'AED' : '$'}{total}</p>
              <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% Secure SSL Encrypted Payment
              </div>
            </div>
            <button 
              disabled={isSubmitting}
              className={`w-full md:w-auto px-12 py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-black/30 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900 hover:scale-[1.03] active:scale-[0.97]'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>
                    {submissionStatus === 'sending_to_gmail' ? 'Submitting to Gmail...' : 
                     submissionStatus === 'syncing_onedrive' ? 'Syncing CV to OneDrive...' : 'Processing...'}
                  </span>
                </div>
              ) : (
                <>
                  Checkout Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="p-8 md:p-20 text-center relative">
          <div className="w-20 h-20 bg-slate-50 text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-slate-100">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">Finalize Secure Payment</h3>
          <p className="text-slate-600 mb-12 max-w-sm mx-auto font-medium">Click below to pay via <span className="text-black font-bold uppercase">PayPal</span>. Your details and CV have been safely logged.</p>
          
          <div className="space-y-4 max-w-md mx-auto mb-10">
            <button 
                onClick={handlePayPalCheckout}
                className="w-full py-5 bg-[#ffc439] hover:bg-[#f2ba36] text-[#111] rounded-2xl font-black flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.03] shadow-lg border border-black/10"
            >
                <div className="flex items-center gap-2">
                    <span>Pay with PayPal</span>
                </div>
                <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" className="h-4" />
            </button>
            <div className="flex flex-col items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                Powered by 
                <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" className="h-4 mt-1" />
            </div>
          </div>
          
          <button 
            onClick={() => setStep(1)} 
            className="text-slate-400 text-xs font-black uppercase tracking-widest transition-colors hover:text-black flex items-center justify-center gap-2 mx-auto"
          >
            Back to Form
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="p-10 md:p-20 text-center">
          <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tighter">Order Success</h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg font-medium leading-relaxed">
            Your transformation is underway. A record of this session and your CV have been synced to our OneDrive at <span className="text-black font-bold">careerlab.connect@gmail.com</span>.
          </p>
          <p className="text-sm text-slate-400 mb-12">Expect a follow-up email from our career specialists within 1 business day.</p>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-slate-900 shadow-xl"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;