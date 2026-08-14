import React, { useState, useEffect } from 'react';
import { MASTER_INFO } from '../data/mockData';
import { Calendar, Phone, Send, Menu, X, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ГЛАВНАЯ', href: '#hero' },
    { name: 'УСЛУГИ И ЦЕНЫ', href: '#services' },
    { name: 'О МАСТЕРЕ', href: '#about' },
    { name: 'ОТЗЫВЫ', href: '#reviews' },
    { name: 'КОНТАКТЫ', href: '#contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className={`bg-[#030f0c] border-b border-[#d4af37]/20 text-[11px] tracking-[0.2em] uppercase py-2 text-[#e2cf92] transition-all duration-300 ${scrolled ? 'hidden md:block opacity-90' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-medium whitespace-nowrap">ОТКРЫТА ЗАПИСЬ НА ЭТОТ МЕСЯЦ</span>
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          </div>
          <div className="hidden md:flex items-center space-x-6 shrink-0">
            <a href={`tel:${MASTER_INFO.phone}`} className="hover:text-[#f3e5ab] transition-colors flex items-center space-x-1.5 whitespace-nowrap">
              <Phone className="w-3 h-3 text-[#d4af37] shrink-0" />
              <span>{MASTER_INFO.phoneFormatted}</span>
            </a>
            <a href={MASTER_INFO.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-[#f3e5ab] transition-colors flex items-center space-x-1.5 whitespace-nowrap">
              <Send className="w-3 h-3 text-[#d4af37] shrink-0" />
              <span>Telegram: {MASTER_INFO.telegramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-[#051812]/95 backdrop-blur-md py-3 border-b border-[#d4af37]/30 shadow-2xl shadow-black/80' : 'bg-gradient-to-b from-[#051812]/90 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Monogram */}
          <a href="#hero" className="flex items-center space-x-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-full border border-[#d4af37]/80 flex items-center justify-center bg-[#08221a] group-hover:border-[#d4af37] group-hover:shadow-lg group-hover:shadow-[#d4af37]/30 transition-all duration-300 overflow-hidden shrink-0">
              <Logo className="w-full h-full flex items-center justify-center" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury font-semibold text-lg sm:text-xl tracking-[0.15em] text-[#f7eed6] uppercase leading-none group-hover:text-[#d4af37] transition-colors">
                Светлана Алексеева
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8 space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.2em] font-medium text-[#dcd1be] hover:text-[#f1da8b] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions Button */}
          <div className="hidden sm:flex items-center shrink-0 ml-4 lg:ml-8">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#061813] font-bold text-xs tracking-[0.15em] uppercase flex items-center space-x-2 transition-all duration-300 shadow-md shadow-[#d4af37]/25 hover:shadow-lg hover:shadow-[#d4af37]/45 hover:scale-[1.03] active:scale-[0.97] shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#061813]" />
              <span>Записаться</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#d4af37] p-2 hover:text-[#fef3c7] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[80px] bg-[#051812]/98 border-b border-[#d4af37]/30 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] text-[#e2d5c3] hover:text-[#d4af37] py-2 border-b border-[#d4af37]/10"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-gold-gradient text-[#061813] font-semibold text-xs tracking-[0.2em] uppercase shadow-lg shadow-[#d4af37]/20 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Онлайн Запись</span>
              </button>
              <div className="flex justify-around pt-2 text-xs text-[#c0a875]">
                <a href={`tel:${MASTER_INFO.phone}`} className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Позвонить</span>
                </a>
                <a href={MASTER_INFO.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                  <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
