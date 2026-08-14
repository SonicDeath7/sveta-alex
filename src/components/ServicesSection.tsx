import React, { useState } from 'react';
import { SERVICES, PORTFOLIO_ITEMS } from '../data/mockData';
import { PortfolioItem } from '../types';
import { Clock, Check, Sparkles, ChevronRight, ShieldCheck, Eye, X, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#051812] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] block mb-2">
            ПРАЙС-ЛИСТ СТУДИИ
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#faf4e6] uppercase font-light tracking-wide">
            УСЛУГИ И <span className="text-gold-gradient font-normal">ЦЕНЫ</span>
          </h2>
          <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-4"></div>
          <p className="text-xs sm:text-sm text-[#b8a272] mt-3 font-light leading-relaxed">
            Выберите направление. Вариант покрытия (гель-лак, обычный лак, укрепление или наращивание) выбирается при записи с автоматическим расчетом стоимости.
          </p>
        </div>

        {/* 4 Main Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-emerald-card border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#fceecb] group-hover:text-[#d4af37] transition-colors">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span className="px-2 py-0.5 bg-[#d4af37] text-[#061813] text-[9px] font-bold uppercase tracking-wider">
                          ХИТ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#b8a272] mt-1.5 font-light leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase text-[#a8956e] block">Стоимость:</span>
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient">
                      {service.priceRange}
                    </span>
                  </div>
                </div>

                {/* Main options preview tags */}
                <div className="mt-5 space-y-3">
                  <div className="text-[11px] font-semibold text-[#e8cf8d] uppercase tracking-wider">
                    Доступные варианты процедуры:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.options.map((opt) => (
                      <span
                        key={opt.id}
                        className="px-3 py-1.5 bg-[#03110c] border border-[#d4af37]/25 text-[#fceecb] text-xs flex items-center space-x-2"
                      >
                        <span className="font-medium">{opt.name}</span>
                        <span className="text-[#d4af37] font-bold text-[11px]">— {opt.priceFormatted}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Included features */}
                <div className="mt-5 pt-4 border-t border-[#d4af37]/15 space-y-2">
                  <div className="text-[11px] font-semibold text-[#a8956e] uppercase tracking-wider">
                    В стоимость входит:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d0c2ac]">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="mt-8 pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-[#a8956e]">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{service.duration}</span>
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="px-6 py-3 bg-gold-gradient text-[#061813] font-bold text-xs tracking-[0.15em] uppercase hover:shadow-lg shadow-[#d4af37]/30 transition-all flex items-center space-x-2"
                >
                  <span>Выбрать и записаться</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Selected Work Portfolio Examples Row */}
        <div className="bg-[#04140e] border border-[#d4af37]/30 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
            <div>
              <h3 className="font-serif-luxury text-2xl text-[#fceecb] uppercase flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <span>ПРИМЕРЫ РАБОТ С ЦЕНАМИ</span>
              </h3>
              <p className="text-xs text-[#b8a272] mt-1">
                Нажмите на фото, чтобы открыть технику выполнения и материалы
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedWork(item)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#020d0a] cursor-pointer border border-[#d4af37]/25 hover:border-[#d4af37] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-between">
                  <div className="self-end px-2.5 py-1 bg-[#051812]/90 border border-[#d4af37]/50 text-[11px] text-[#d4af37] font-bold">
                    {item.price}
                  </div>

                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-[#fceecb] truncate">{item.title}</span>
                    <Eye className="w-4 h-4 text-[#d4af37] shrink-0 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sterilization & Safety Guarantee */}
        <div className="mt-8 p-5 bg-[#04140e] border border-[#d4af37]/25 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[#e8cf8d] uppercase tracking-wider">
                100% СТЕРИЛЬНОСТЬ И БЕЗОПАСНОСТЬ ПО САНПИН
              </div>
              <div className="text-xs text-[#b8a272] mt-0.5">
                Медицинский сухожар ГП-10, крафт-пакет вскрывается при вас. Одноразовые пилочки и бафы.
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectService('Консультация')}
            className="px-6 py-2.5 bg-[#08281f] border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#061813] text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            Записаться онлайн
          </button>
        </div>

      </div>

      {/* Modal detail lightbox */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#061f18] border border-[#d4af37] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-3 right-3 z-20 p-2 text-[#d4af37] bg-[#051812]/80 rounded-full hover:bg-[#d4af37] hover:text-[#061813] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 relative bg-[#020d0a]">
              <img
                src={selectedWork.image}
                alt={selectedWork.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#fceecb]">
                  {selectedWork.title}
                </h3>
                
                <div className="mt-3 text-xs text-[#d0c2ac] space-y-2">
                  <p>{selectedWork.description}</p>
                  
                  <div className="p-2.5 bg-[#08281f] border border-[#d4af37]/20">
                    <div className="text-[10px] font-semibold text-[#d4af37] uppercase">
                      Техника выполнения:
                    </div>
                    <div className="text-xs text-[#e2d5c3] mt-0.5">{selectedWork.technique}</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#d4af37]/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase text-[#a8956e]">Стоимость:</div>
                  <div className="font-serif-luxury text-xl font-bold text-gold-gradient">
                    {selectedWork.price}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const title = selectedWork.title;
                    setSelectedWork(null);
                    onSelectService(`Работа: ${title}`);
                  }}
                  className="px-4 py-2.5 bg-gold-gradient text-[#061813] text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>Записаться</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
