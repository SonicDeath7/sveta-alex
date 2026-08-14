import React from 'react';
import { MASTER_INFO } from '../data/mockData';
import { Sparkles, Phone, Send, MapPin, Clock, QrCode, Calendar, ExternalLink, Mail } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contacts" className="py-20 lg:py-28 bg-emerald-marble relative border-t border-[#d4af37]/30">
      
      {/* Decorative Gold Frame Background Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Replica Layout of Bottom Banner */}
        <div className="bg-[#04140f] border border-[#d4af37]/40 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & Main Info (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#faf4e6] uppercase font-light leading-[1.1]">
                ДАВАЙТЕ СОЗДАДИМ <br />
                <span className="text-gold-gradient font-normal">ИДЕАЛЬНЫЙ ОБРАЗ</span>
              </h2>

              <p className="text-sm text-[#d0c2ac] font-light max-w-lg leading-relaxed">
                Запишитесь на удобное время для авторского ухода за ногтями, консультации по восстановлению или индивидуального дизайна.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${MASTER_INFO.phone}`}
                  className="px-5 py-3 bg-[#08241c] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#e8cf8d] text-xs tracking-[0.15em] uppercase flex items-center space-x-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{MASTER_INFO.phoneFormatted}</span>
                </a>

                <a
                  href={MASTER_INFO.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#08241c] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#e8cf8d] text-xs tracking-[0.15em] uppercase flex items-center space-x-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Telegram: {MASTER_INFO.telegramHandle}</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 bg-gold-gradient text-[#061813] text-xs font-bold tracking-[0.2em] uppercase flex items-center space-x-2 hover:shadow-lg shadow-[#d4af37]/30 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>ОНЛАЙН-ЗАПИСЬ</span>
                </button>
              </div>

            </div>

            {/* Right QR Code Box (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#08221a] border border-[#d4af37]/40 space-y-3">
              <div className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
                LET'S CONNECT
              </div>

              {/* Realistic QR Code Graphic */}
              <div className="p-3 bg-[#fff] border-2 border-[#d4af37] rounded-none">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(MASTER_INFO.telegram)}&color=061813&bgcolor=ffffff`}
                  alt="Telegram QR Code"
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 object-contain"
                />
              </div>

              <div className="text-[10px] text-[#b8a272] uppercase tracking-wider">
                Сканируйте для моментальной связи в Telegram
              </div>
            </div>

          </div>

          {/* Details Bar: Address, Metro, Hours */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mt-10 border-t border-[#d4af37]/20 text-xs text-[#d0c2ac]">
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <div className="font-semibold text-[#fceecb] uppercase text-[11px] tracking-wider">Локации приема</div>
                <div className="text-[11px] text-[#e0d2b7] leading-relaxed">
                  <span className="text-[#d4af37] font-medium">Студия на дому:</span><br />
                  г. Тула, ул. Макаренко, 19, к. 1
                </div>
                <div className="text-[11px] text-[#e0d2b7] leading-relaxed pt-1 border-t border-[#d4af37]/10">
                  <span className="text-[#d4af37] font-medium">Салон красоты «Амальфи»:</span><br />
                  г. Тула, ул. Макаренко, 18
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#fceecb] uppercase text-[11px]">Часы работы</div>
                <div className="text-[11px] text-[#b8a272] mt-0.5">{MASTER_INFO.workingHours}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Send className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#fceecb] uppercase text-[11px]">Социальные сети</div>
                <div className="text-[11px] text-[#b8a272] mt-0.5 flex space-x-3">
                  <a href={MASTER_INFO.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] underline">
                    Telegram
                  </a>
                  <a href={MASTER_INFO.vk} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] underline">
                    ВКонтакте
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center text-[10px] text-[#a8956e] uppercase tracking-[0.2em]">
        © 2026 СВЕТЛАНА АЛЕКСЕЕВА. ВСЕ ПРАВА ЗАЩИЩЕНЫ. АВТОРСКИЙ ДИЗАЙН И ЭСТЕТИКА НОГТЕЙ.
      </div>

    </section>
  );
};
