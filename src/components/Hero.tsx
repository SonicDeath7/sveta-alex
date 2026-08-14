import React from 'react';
import { MASTER_INFO } from '../data/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 bg-emerald-marble overflow-hidden flex items-center">
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0f4d3a]/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Fine Geometric Gold Line Frame Background */}
      <div className="absolute inset-8 border border-[#d4af37]/10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[#d4af37]/40 hidden md:block"></div>
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[#d4af37]/40 hidden md:block"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[#d4af37]/40 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[#d4af37]/40 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Display Headline matching image style */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#faf4e6] leading-[1.08] uppercase">
                ИСКУССТВО <br />
                <span className="text-gold-gradient font-normal">МАНИКЮРА</span> <br />
                И ПЕДИКЮРА.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#d8cbbe] font-light max-w-xl leading-relaxed tracking-wide font-sans-clean">
              {MASTER_INFO.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-5 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-none bg-gold-gradient text-[#061813] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5"
              >
                <span>ЗАПИСАТЬСЯ</span>
                <Sparkles className="w-4 h-4 ml-3 text-[#061813]" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-none border border-[#d4af37]/50 text-[#e8cf8d] hover:text-[#fff] hover:border-[#d4af37] font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 bg-[#08241c]/50 hover:bg-[#08241c]"
              >
                <span>СМОТРЕТЬ УСЛУГИ И ЦЕНЫ</span>
                <ArrowRight className="w-4 h-4 ml-2 text-[#d4af37]" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-[#d4af37]/20 w-full max-w-sm">
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-gold-gradient font-semibold">4.2K+</div>
                <div className="text-[11px] tracking-wider text-[#b8a272] uppercase mt-0.5">Довольных клиентов</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-gold-gradient font-semibold">100%</div>
                <div className="text-[11px] tracking-wider text-[#b8a272] uppercase mt-0.5">Стерильность СанПиН</div>
              </div>
            </div>

          </div>

          {/* Right Portrait Column */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Soft Ambient Golden Glow behind photo */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#d4af37]/20 via-[#0d3b2d] to-[#d4af37]/10 blur-xl opacity-70"></div>
              
              {/* Modern Layered Frame Offset Background */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[2rem] border border-[#d4af37]/30 bg-[#08221a]/60 backdrop-blur-sm"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-[2rem] overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#08221a]">
                
                {/* Master Portrait Image */}
                <img
                  src={MASTER_INFO.photo}
                  alt={`${MASTER_INFO.fullName} — ${MASTER_INFO.subtitle}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== MASTER_INFO.fallbackPhoto) {
                      target.src = MASTER_INFO.fallbackPhoto;
                    }
                  }}
                  className="w-full h-[500px] sm:h-[580px] object-cover object-center studio-photo-processed"
                />

                {/* Subtle Luxury Gradient Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051812]/80 via-transparent to-transparent pointer-events-none"></div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
