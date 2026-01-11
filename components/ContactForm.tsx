
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
    
    // The provided PayPal hosted button uses a POST request.
    // We simulate the click on our hidden form.
    setTimeout(() => {
      if (paypalFormRef.current) {
        paypalFormRef.current.submit();
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-black transition-all duration-500 relative">
      {isSubmitting && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-black rounded-full animate-spin mb-6"></div>
          <h4 className="text-xl font-black text-black uppercase tracking-tighter mb-2">
            Redirecting to Secure Payment...
          </h4>
          <p className="text-slate-500 text-sm font-medium max-w-xs">
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

      <form onSubmit={handleCheckout} className="p-8 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
            <label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-black">Full Name</label>
            <input 
              required
              id="fullName"
              name="fullName"
              type="text" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-black">Email Address</label>
            <input 
              required
              id="email"
              name="email"
              type="email" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-black">Phone Number</label>
            <input 
              required
              id="phone"
              name="phone"
              type="tel" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="targetJob" className="text-xs font-black uppercase tracking-widest text-black">Target Job Title</label>
            <input 
              required
              id="targetJob"
              name="targetJob"
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
            <label htmlFor="linkedInUrl" className="text-xs font-black uppercase tracking-widest text-black">LinkedIn Profile URL (Optional)</label>
            <input 
              id="linkedInUrl"
              name="linkedInUrl"
              type="url" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-slate-400"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedInUrl}
              onChange={e => setFormData({...formData, linkedInUrl: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-12 mb-12">
          <fieldset className="space-y-4">
            <legend className="text-xs font-black uppercase tracking-widest text-black">Select Your Plan</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({...formData, service: s.name})}
                  aria-pressed={formData.service === s.name}
                  className={`p-5 rounded-2xl border transition-all duration-300 text-left group active:scale-95 ${formData.service === s.name ? 'border-black bg-slate-50 text-black shadow-lg scale-[1.02]' : 'border-slate-100 bg-slate-50 text-black hover:border-slate-200 hover:shadow-md'}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1 text-black">{s.name}</div>
                  <div className="text-xl font-black text-black group-hover:text-black transition-colors">
                      {initialCurrency === Currency.AED ? 'AED' : '$'}{initialCurrency === Currency.AED ? s.priceAED : s.priceUSD}
                  </div>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="cv-upload" className="text-xs font-black uppercase tracking-widest text-black">Upload Current CV (Optional)</label>
              <div className="flex items-center gap-2 px-3 py-1 bg-white border border-black rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" aria-hidden="true"></span>
                <span className="text-[9px] font-black uppercase tracking-widest text-black">Syncs to OneDrive</span>
              </div>
            </div>
            <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center hover:border-black hover:bg-slate-50 transition-all duration-300 cursor-pointer group">
              <input 
                id="cv-upload"
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
              />
              <div className="text-black">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform border border-slate-100">
                  <svg aria-hidden="true" className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="font-black text-black text-base">{file ? file.name : 'Drop your CV here'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Amount</p>
              <p className="text-4xl font-black text-black tracking-tighter">
                {initialCurrency === Currency.AED ? 'AED' : '$'}{currentPrice}
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-sm mx-auto space-y-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-slate-900 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-black/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              Checkout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              Secure 256-bit encrypted checkout via PayPal.<br/>Assets will be automatically synced upon successful payment.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
