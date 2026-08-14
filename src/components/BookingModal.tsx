import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Logo } from './Logo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);

      // Ensure Yandex embed script is present and triggers resizing
      if (!document.querySelector('script[src="https://forms.yandex.ru/_static/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://forms.yandex.ru/_static/embed.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Close on Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="booking-modal-content"
        ref={containerRef}
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#08241b] via-[#051a13] to-[#03110c] border border-[#d4af37]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] rounded-2xl overflow-hidden max-h-[94vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#d4af37]/30 bg-[#061e16]/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Logo className="w-9 h-9" />
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#fceecb] font-normal tracking-wide flex items-center gap-2">
                Онлайн-запись <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
              </h3>
              <p className="text-[11px] text-[#b8a994] tracking-wider uppercase">
                Мастер Светлана Алексеева
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            id="booking-modal-close-button"
            onClick={onClose}
            aria-label="Закрыть окно записи"
            className="p-2 rounded-full text-[#d4af37] hover:text-[#fff] hover:bg-[#d4af37]/20 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional preselected service badge */}
        {preselectedService && (
          <div className="px-5 sm:px-7 py-2.5 bg-[#0a3124]/90 border-b border-[#d4af37]/20 text-xs text-[#e5cf87] flex items-center justify-between gap-2">
            <span className="text-[#b8a994]">Выбранная услуга:</span>
            <span className="font-semibold text-[#fceecb] truncate">{preselectedService}</span>
          </div>
        )}

        {/* Main Body with Yandex Form Iframe */}
        <div className="relative flex-1 overflow-y-auto p-2 sm:p-4 bg-[#051812]/50 min-h-[520px] sm:min-h-[580px]">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#051812]/90 z-10 text-[#d4af37]">
              <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
              <p className="text-xs uppercase tracking-widest text-[#b8a994]">
                Загрузка формы записи...
              </p>
            </div>
          )}

          <div className="w-full flex justify-center items-center">
            <iframe
              src="https://forms.yandex.ru/cloud/6a7f9eb4068ff09fd50f8124?iframe=1"
              frameBorder="0"
              name="ya-form-6a7f9eb4068ff09fd50f8124"
              width="650"
              title="Онлайн-запись Светлана Алексеева"
              onLoad={() => setIframeLoaded(true)}
              className="w-full min-h-[520px] sm:min-h-[580px] rounded-xl border-0 bg-transparent transition-opacity duration-300"
              style={{
                maxWidth: '100%',
              }}
            />
          </div>
        </div>

        {/* Footer info notice */}
        <div className="px-5 py-3 border-t border-[#d4af37]/20 bg-[#04140f] text-[11px] text-[#9b8d7c] text-center">
          Заполните форму выше, и Светлана свяжется с вами для подтверждения даты и времени визита.
        </div>
      </div>
    </div>
  );
};
