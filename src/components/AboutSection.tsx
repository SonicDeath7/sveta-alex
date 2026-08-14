import React, { useState } from 'react';
import { MASTER_INFO, CERTIFICATES } from '../data/mockData';
import { Certificate } from '../types';
import { Sparkles, Award, Shield, HeartHandshake, Coffee, CheckCircle, ExternalLink, X } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const highlights = [
    {
      icon: Shield,
      title: '100% Безопасность СанПиН',
      desc: 'Медицинский сухожар ГП-10, одноразовые пилочки и бафы для каждого клиента.',
    },
    {
      icon: HeartHandshake,
      title: 'Анатомическая техника',
      desc: 'Без перепилов, травм кутикулы и истончения ногтевой пластины.',
    },
    {
      icon: Coffee,
      title: 'Сервис и Комфорт',
      desc: 'Свежесваренный капсульный кофе, травяной чай, ортопедические кресла и тишина.',
    },
    {
      icon: Award,
      title: 'Премиум палитра 300+ оттенков',
      desc: 'Только оригинальные флаконы Luxio, Fedua, Bandi без дешевых аналогов.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-emerald-marble relative border-t border-[#d4af37]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#faf4e6] uppercase font-light tracking-wide">
            О МАСТЕРЕ <span className="text-gold-gradient font-normal">СВЕТЛАНЕ</span>
          </h2>
          <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-4"></div>
        </div>

        {/* Master Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Portrait Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#08221a] shadow-xl">
              <img
                src={MASTER_INFO.photoAbout || MASTER_INFO.photo}
                alt={`${MASTER_INFO.fullName} за работой`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== MASTER_INFO.fallbackPhoto) {
                    target.src = MASTER_INFO.fallbackPhoto;
                  }
                }}
                className="w-full h-[450px] object-cover filter contrast-[1.05]"
              />
              <div className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 p-5 rounded-xl bg-[#04140e]/95 border border-[#d4af37]/60 shadow-xl backdrop-blur-md max-w-xs">
                <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient">
                  9+ ЛЕТ
                </div>
                <div className="text-[11px] text-[#c0a875] uppercase tracking-wider mt-0.5">
                  Непрерывной практики и обучения
                </div>
              </div>
            </div>
          </div>

          {/* Master Text & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="font-serif-luxury text-2xl sm:text-3xl italic text-gold-gradient tracking-wide">
              «Красота ногтей начинается с их естественного здоровья»
            </div>

            <h3 className="font-serif-luxury text-2xl text-[#fceecb]">
              Здравствуйте! Я — Светлана Алексеева.
            </h3>

            <p className="text-sm text-[#d0c2ac] leading-relaxed font-light">
              Мой путь в индустрии эстетики ногтей начался в 2017 году. Я убеждена, что идеальный маникюр — это не просто покрытие ярким гелем, а прежде всего здоровье ногтевой пластины, ухоженность кутикулы и точнейшая анатомическая форма.
            </p>

            <p className="text-sm text-[#d0c2ac] leading-relaxed font-light">
              Я регулярно прохожу повышение квалификации в международных академиях, изучаю инновационные техники Smart-педикюра и японского экологического восстановления P.Shine. В моей студии вы найдете атмосферу абсолютного умиротворения, где можно отдохнуть от суеты мегаполиса.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="p-4 bg-[#08221a] border border-[#d4af37]/20 flex items-start space-x-3">
                    <IconComp className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-[#fceecb] uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#a8956e] mt-1 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Certificates Section */}
        <div className="pt-12 border-t border-[#d4af37]/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#e8cf8d] uppercase">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>СЕРТИФИКАТЫ И ДИПЛОМЫ ({CERTIFICATES.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer p-5 bg-emerald-card border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 flex items-center space-x-4"
              >
                <div className="w-16 h-20 bg-[#020b08] border border-[#d4af37]/40 shrink-0 overflow-hidden relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-[#d4af37] uppercase tracking-widest font-semibold">
                    {cert.issuer} • {cert.year}
                  </div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-[#fceecb] group-hover:text-[#d4af37] transition-colors mt-1">
                    {cert.title}
                  </h4>
                  <div className="text-[10px] text-[#a8956e] mt-2 flex items-center space-x-1">
                    <span>Нажмите для просмотра</span>
                    <ExternalLink className="w-3 h-3 text-[#d4af37]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-[#061f18] border border-[#d4af37] p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-[#d4af37] hover:text-[#fff]"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center space-y-4">
              <span className="text-xs text-[#d4af37] uppercase tracking-widest font-semibold">
                ДИПЛОМ ОБ ОБУЧЕНИИ И КВАЛИФИКАЦИИ
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#fceecb]">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-[#b8a272]">
                {selectedCert.issuer} ({selectedCert.year} г.)
              </p>
              <div className="mt-4 border border-[#d4af37]/30 max-h-[60vh] overflow-hidden">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
