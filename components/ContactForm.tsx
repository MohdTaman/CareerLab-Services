
import React, { useState, useEffect } from 'react';
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
    paymentMethod: 'card' as 'card' | 'paypal',
  });
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending_to_gmail' | 'syncing_onedrive' | 'notified'>('idle');
  const [step, setStep] = useState(1);
  const [orderRef, setOrderRef] = useState('');

  const selectedServiceData = services.find(s => s.name === formData.service);
  const total = initialCurrency === Currency.AED 
    ? selectedServiceData?.priceAED 
    : selectedServiceData?.priceUSD;

  useEffect(() => {
    if (step === 3 && !orderRef) {
      setOrderRef(`CL-${Math.floor(1000 + Math.random() * 9000)}-${['X', 'Y', 'Z'][Math.floor(Math.random() * 3)]}`);
    }
  }, [step]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('sending_to_gmail');
    
    // Step 1: Simulate Gmail Notification & OneDrive Sync
    setTimeout(() => {
      if (file) {
        setSubmissionStatus('syncing_onedrive');
        setTimeout(() => {
          setSubmissionStatus('notified');
          setStep(2);
          setIsSubmitting(false);
        }, 1200);
      } else {
        setSubmissionStatus('notified');
        setStep(2);
        setIsSubmitting(false);
      }
    }, 1200);
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    
    if (formData.paymentMethod === 'paypal') {
      window.open("https://www.paypal.com/ncp/payment/GFN8E6KSCWFJW", "_blank");
    }

    // Simulate payment verification
    setTimeout(() => {
      setIsPaying(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-black transition-all duration-500">
      {step === 1 && (
        <form onSubmit={handleInitialSubmit} className="p-8 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Step 1 of 2</p>
              <p className="text-2xl font-black text-black uppercase tracking-tighter">Review & Checkout</p>
            </div>
            <button 
              disabled={isSubmitting}
              className={`w-full md:w-auto px-12 py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-black/30 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900 hover:scale-[1.03] active:scale-[0.97]'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{submissionStatus === 'sending_to_gmail' ? 'Uploading...' : 'Syncing...'}</span>
                </div>
              ) : (
                <>
                  Next Step
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
        <div className="p-8 md:p-14 bg-slate-50/50 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-black shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-black mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">{formData.service}</span>
                    <span className="text-black">{initialCurrency === Currency.AED ? 'AED' : '$'}{total}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Processing Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-base font-black uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-black">{initialCurrency === Currency.AED ? 'AED' : '$'}{total}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-3xl text-white">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1">Encrypted Checkout</p>
                    <p className="text-[10px] text-slate-400 font-medium">Your data is secured with industry-standard 256-bit SSL encryption.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] border border-black shadow-xl">
              <h3 className="text-xl font-black text-black mb-8 uppercase tracking-tighter">Secure Payment</h3>
              
              <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.paymentMethod === 'card' ? 'bg-black text-white shadow-lg' : 'text-slate-400 hover:text-black'}`}
                >
                  Credit/Debit Card
                </button>
                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.paymentMethod === 'paypal' ? 'bg-[#ffc439] text-black shadow-lg' : 'text-slate-400 hover:text-black'}`}
                >
                  PayPal
                </button>
              </div>

              <form onSubmit={handleFinalPayment} className="space-y-6">
                {formData.paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Card Number</label>
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-all"
                        value={cardData.number}
                        onChange={e => setCardData({...cardData, number: e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expiry</label>
                        <input required type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-all" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">CVC</label>
                        <input required type="text" placeholder="123" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-all" maxLength={3} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="mb-6">
                      <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" className="h-6 mx-auto" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">
                      You will be redirected to PayPal's secure portal to complete your transaction.
                    </p>
                  </div>
                )}

                <button 
                  disabled={isPaying}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 mt-8 ${isPaying ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-black text-white hover:bg-slate-900 shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                  {isPaying ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-black rounded-full animate-spin"></div>
                      <span>Verifying Payment...</span>
                    </div>
                  ) : (
                    <>
                      Pay {initialCurrency === Currency.AED ? 'AED' : '$'}{total} Now
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                >
                  Back to Details
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="p-10 md:p-24 text-center animate-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-black text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-bounce">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Order Confirmed</p>
          <h3 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tighter">Success</h3>
          <div className="inline-block bg-slate-50 border border-slate-100 px-6 py-2 rounded-full mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-black">Reference: <span className="text-slate-400">{orderRef}</span></p>
          </div>
          <div className="text-slate-600 mb-12 max-w-md mx-auto text-lg font-medium leading-relaxed space-y-4">
            <p>Your transformation is underway. A record of this session and your CV have been synced to our OneDrive.</p>
            <div className="p-6 bg-slate-50 rounded-2xl text-left text-sm border border-slate-100">
                <p className="font-black uppercase tracking-widest text-black mb-3 text-[10px]">What happens next?</p>
                <ul className="space-y-3">
                    <li className="flex gap-3">
                        <span className="font-black">1.</span>
                        <span>Expert review starts within 4 hours.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-black">2.</span>
                        <span>Initial draft delivered within 2-3 business days.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-black">3.</span>
                        <span>Direct contact via WhatsApp/Email for revisions.</span>
                    </li>
                </ul>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-slate-900 shadow-xl"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
