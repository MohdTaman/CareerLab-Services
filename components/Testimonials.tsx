import React from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Manager",
    country: "United Kingdom",
    text: "CareerLab transformed my outdated CV into a high-impact masterpiece. Within two weeks, I landed three interviews with Tier 1 tech firms and secured my dream role with a 30% salary increase. Their strategic use of industry keywords is unmatched in the market.",
    rating: 5
  },
  {
    name: "Ahmed Al-Farsi",
    role: "Software Engineer",
    country: "UAE",
    text: "The LinkedIn optimization increased my profile views by 400% almost instantly. I was contacted by major international recruiters directly within days. It tells a cohesive story that resonates with decision-makers looking for high-level technical talent.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Finance Director",
    country: "Singapore",
    text: "Premium, exceptionally fast, and professional service. They truly understand how to beat complex ATS algorithms while maintaining a genuine human touch. The final documents resulted in an immediate CFO-level interview invitation from a prestigious firm.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Lead",
    country: "USA",
    text: "I was struggling to pivot industries until I used CareerLab. They highlighted my transferable skills perfectly. The confidence boost alone was worth the investment, but the multiple job offers I received were the real proof of their expertise.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-slate-600">
          What Our Clients Say
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Real feedback from professionals worldwide who transformed their careers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] relative flex flex-col h-full border border-black shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300 group">
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-black fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <div className="flex-1">
                <p className="text-slate-700 font-medium mb-8 leading-relaxed group-hover:text-black transition-colors min-h-[7rem]">
                  "{t.text}"
                </p>
            </div>
            
            <div className="flex items-center gap-4 border-t border-slate-50 pt-6 mt-auto">
              {/* Initial Boxes - Updated to Black background with white text */}
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center font-black text-white text-xs uppercase shadow-lg transition-transform duration-300 group-hover:scale-110">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-base leading-tight">{t.name}</h4>
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">{t.role}</p>
                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">{t.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;