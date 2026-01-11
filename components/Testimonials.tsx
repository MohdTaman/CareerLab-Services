
import React, { useState, useEffect, useRef, useCallback } from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Manager",
    country: "United Kingdom",
    text: "CareerLab transformed my outdated CV into a high-impact masterpiece. Within two weeks, I landed three interviews with Tier 1 tech firms and secured my dream role with a 30% salary increase. Their strategic use of industry keywords is unmatched.",
    rating: 5
  },
  {
    name: "Ahmed Al-Farsi",
    role: "Software Engineer",
    country: "UAE",
    text: "The LinkedIn optimization increased my profile views by 400% almost instantly. I was contacted by major international recruiters directly within days. It tells a cohesive story that resonates with decision-makers.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Finance Director",
    country: "Singapore",
    text: "Premium, exceptionally fast, and professional service. They truly understand how to beat complex ATS algorithms while maintaining a genuine human touch. The final documents resulted in an immediate CFO-level interview.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Lead",
    country: "USA",
    text: "I was struggling to pivot industries until I used CareerLab. They highlighted my transferable skills perfectly. The confidence boost alone was worth the investment, but the multiple job offers were the real proof.",
    rating: 5
  },
  {
    name: "David Weber",
    role: "UX Architect",
    country: "Germany",
    text: "As a designer, I'm picky about layouts. CareerLab delivered a CV that was both aesthetically pleasing and technically sound for ATS. Highly recommended for creative professionals who need to pass corporate filters.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist",
    country: "India",
    text: "The career strategist I worked with actually understood my niche in Machine Learning. They didn't just fix grammar; they enhanced the technical depth of my achievements. Simply the best service I've used.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items to show
  const getItemsToShow = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => setItemsToShow(getItemsToShow());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsToShow);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  return (
    <section 
      aria-label="Client Testimonials"
      aria-roledescription="carousel"
      className="max-w-[1600px] mx-auto px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight">
          What Our Clients Say
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
          Real feedback from professionals worldwide who transformed their careers.
        </p>
      </div>

      <div className="relative group">
        {/* Navigation Arrows */}
        <button 
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 bg-black text-white p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex"
          aria-label="Previous testimonial"
        >
          <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 bg-black text-white p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex"
          aria-label="Next testimonial"
        >
          <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Container */}
        <div 
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out gap-8"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {testimonials.map((t, idx) => {
              const isVisible = idx >= currentIndex && idx < currentIndex + itemsToShow;
              return (
                <div 
                  key={idx} 
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${testimonials.length}`}
                  aria-hidden={!isVisible}
                  className="flex-shrink-0 px-1 py-4"
                  style={{ width: `calc(${100 / itemsToShow}% - ${(8 * (itemsToShow - 1)) / itemsToShow}px)` }}
                >
                  <div className="bg-white p-8 rounded-[2.5rem] relative flex flex-col h-full border border-black shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300 group/card">
                    <div className="flex gap-1 mb-6" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} aria-hidden="true" className="w-4 h-4 text-black fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <div className="flex-1">
                        <blockquote className="text-slate-700 font-medium mb-8 leading-relaxed group-hover/card:text-black transition-colors min-h-[7rem]">
                          "{t.text}"
                        </blockquote>
                    </div>
                    
                    <div className="flex items-center gap-4 border-t border-slate-50 pt-6 mt-auto">
                      <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-black text-xs transition-transform duration-300 group-hover/card:scale-110 group-hover/card:bg-black group-hover/card:text-white">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-bold text-base leading-tight">{t.name}</h4>
                        <p className="text-xs text-slate-400 font-medium mt-1">{t.role}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 mt-12" role="group" aria-label="Carousel pagination">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-black' : 'w-2 bg-slate-200 hover:bg-slate-400'}`}
            aria-label={`Go to slide group ${i + 1}`}
            aria-current={currentIndex === i ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
