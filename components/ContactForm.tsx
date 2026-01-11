
import React, { useState, useRef } from 'react';
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
  const paypalFormRef = useRef<HTMLFormElement>(null);

  const selectedServiceData = services.find(s => s.name === formData.service);
  const currentPrice = initialCurrency === Currency.AED 
    ? selectedServiceData?.priceAED 
    : selectedServiceData?.priceUSD;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.targetJob) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (paypalFormRef.current) {
        paypalFormRef.current.submit();
      }
    }, 1000);
  };

  const inputClasses = "w-full bg-white border border-black rounded-2xl px-6 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all font-bold placeholder:text-black/30";

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden border border-black transition-all duration-500 relative">
      {isSubmitting && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-black rounded-full animate-spin mb-6"></div>
          <h4 className="text-xl font-black text-black uppercase tracking-tighter mb-2">
            Redirecting to Secure Payment...
          </h4>
          <p className="text-black text-sm font-bold max-w-xs">
            We are preparing your session with PayPal. Please do not close this window.
          </p>
        </div>
      )}

      {/* Hidden PayPal Hosted Button Form */}
      <form 
        action="https://www.paypal.com/cgi-bin/webscr" 
        method="post" 
        target="_top" 
        ref={paypalFormRef}
        className="hidden"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="VFMSWR6TNG2PE" />
        <input type="hidden" name="on0" value="Our Services" />
        <input type="hidden" name="os0" value={formData.service} />
        <input type="hidden" name="currency_code" value="USD" />
      </form>

      <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Left Side: Configuration */}
        <div className="lg:w-3/5 p-8 md:p-12 lg:p-16">
          <div className="mb-12">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-8">01. Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Full Name</label>
                <input 
                  required
                  id="fullName"
                  name="fullName"
                  type="text" 
                  className={inputClasses}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Email Address</label>
                <input 
                  required
                  id="email"
                  name="email"
                  type="email" 
                  className={inputClasses}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Phone Number</label>
                <input 
                  required
                  id="phone"
                  name="phone"
                  type="tel" 
                  className={inputClasses}
                  placeholder="+971 50 000 0000"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="targetJob" className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Target Job Title</label>
                <input 
                  required
                  id="targetJob"
                  name="targetJob"
                  type="text" 
                  className={inputClasses}
                  placeholder="Senior Product Manager"
                  value={formData.targetJob}
                  onChange={e => setFormData({...formData, targetJob: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="linkedInUrl" className="text-[10px] font-black uppercase tracking-widest text-black ml-2 flex items-center justify-between">
                  LinkedIn Profile URL
                  <span className="text-[9px] font-black uppercase tracking-widest">Optional</span>
                </label>
                <input 
                  id="linkedInUrl"
                  name="linkedInUrl"
                  type="url" 
                  className={inputClasses}
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedInUrl}
                  onChange={e => setFormData({...formData, linkedInUrl: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-8">02. Service Configuration</h3>
            <div className="space-y-2">
              <label htmlFor="service-select" className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Select a Service</label>
              <div className="relative group">
                <select 
                  id="service-select"
                  className={`${inputClasses} appearance-none cursor-pointer pr-12`}
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value as ServiceType})}
                >
                  {services.map((s, i) => (
                    <option key={i} value={s.name} className="text-black font-bold">
                      {s.name} — {initialCurrency === Currency.AED ? 'AED' : '$'}{initialCurrency === Currency.AED ? s.priceAED : s.priceUSD}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Upload & Action */}
        <div className="lg:w-2/5 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="mb-12">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-8">03. Assets Sync</h3>
              <div className="relative border-2 border-dashed border-black/40 rounded-[2.5rem] p-12 text-center hover:border-black hover:bg-slate-50/50 transition-all duration-500 cursor-pointer group bg-white">
                <input 
                  id="cv-upload"
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-black/10 group-hover:scale-110 transition-transform duration-500">
                    <svg className={`w-8 h-8 transition-colors duration-500 ${file ? 'text-green-600' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="font-black text-black text-sm mb-1 uppercase tracking-tight">{file ? file.name : 'Click to upload your current CV'}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black">PDF, DOCX Max 10MB</p>
                </div>
              </div>
            </div>

            <div className="mb-12 p-8 bg-white rounded-3xl border border-black shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">Selected Plan</span>
                <span className="text-sm font-black text-black uppercase tracking-tight">{formData.service}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">Total Payable</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-black tracking-tighter">
                    {initialCurrency === Currency.AED ? 'AED' : '$'}{currentPrice}
                  </p>
                  <p className="text-[9px] font-black text-black uppercase tracking-widest">Inc. all taxes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:bg-slate-900 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-black/20 flex items-center justify-center gap-4 disabled:opacity-50 group"
            >
              Continue to Payment
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4 opacity-100 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
              </div>
              <p className="text-center text-[9px] font-black text-black uppercase tracking-widest max-w-xs leading-loose">
                Secure 256-bit encrypted checkout.<br/>Assets automatically synced to CareerLab secure OneDrive.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
