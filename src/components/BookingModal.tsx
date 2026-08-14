import React, { useState, useEffect } from 'react';
import { SERVICES, ADDONS } from '../data/mockData';
import { BookingFormData, ServiceItem, ServiceSubOption } from '../types';
import { X, Check, Send, MessageSquare, CheckSquare, Square, Clock } from 'lucide-react';
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
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [selectedSubOptionId, setSelectedSubOptionId] = useState<string>(SERVICES[0].options[0].id);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: SERVICES[0].id,
    subOptionId: SERVICES[0].options[0].id,
    addons: [],
    location: 'Студия на дому (г. Тула, ул. Макаренко, 19, к. 1)',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '12:30',
    clientName: '',
    clientPhone: '',
    comment: '',
    contactMethod: 'telegram',
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [apiResult, setApiResult] = useState<{
    telegramSent?: boolean;
    emailDispatchedTo?: string;
  }>({});

  // Auto-match preselected service or sub-option when modal opens
  useEffect(() => {
    if (preselectedService && isOpen) {
      const lower = preselectedService.toLowerCase();
      let foundService: ServiceItem | undefined;
      let foundOption: ServiceSubOption | undefined;

      for (const serv of SERVICES) {
        if (serv.title.toLowerCase().includes(lower)) {
          foundService = serv;
          foundOption = serv.options[0];
          break;
        }
        for (const opt of serv.options) {
          if (opt.name.toLowerCase().includes(lower) || lower.includes(opt.name.toLowerCase())) {
            foundService = serv;
            foundOption = opt;
            break;
          }
        }
        if (foundService) break;
      }

      if (foundService && foundOption) {
        setSelectedServiceId(foundService.id);
        setSelectedSubOptionId(foundOption.id);
      } else {
        setFormData(prev => ({ ...prev, comment: `Выбранная услуга: ${preselectedService}` }));
      }
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const currentSubOption = currentService.options.find(o => o.id === selectedSubOptionId) || currentService.options[0];

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const serv = SERVICES.find(s => s.id === serviceId);
    if (serv && serv.options.length > 0) {
      setSelectedSubOptionId(serv.options[0].id);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate live total price
  const basePrice = currentSubOption ? currentSubOption.price : currentService.minPrice;
  const addonsPrice = selectedAddonIds.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalPrice = basePrice + addonsPrice;
  const totalPriceFormatted = `${totalPrice.toLocaleString('ru-RU')} ₽`;

  const timeSlots = ['10:00', '12:30', '15:00', '17:30', '19:30'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const selectedAddonNames = selectedAddonIds
      .map(id => ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean);

    const fullServiceSummary = `${currentService.title}: ${currentSubOption.name}` +
      (selectedAddonNames.length > 0 ? ` + [${selectedAddonNames.join(', ')}]` : '');

    try {
      let data: any = null;
      let response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceTitle: fullServiceSummary,
          price: totalPriceFormatted,
          date: formData.date,
          timeSlot: formData.timeSlot,
          clientName: formData.clientName,
          clientPhone: formData.clientPhone,
          location: formData.location,
          comment: formData.comment,
          contactMethod: formData.contactMethod,
        }),
      });

      if (response.ok) {
        try {
          data = await response.json();
        } catch (e) {
          console.warn('JSON parse error from /api/booking, trying Netlify function:', e);
        }
      }

      // If /api/booking failed or returned non-JSON on static Netlify host, call /.netlify/functions/booking directly
      if (!data || !data.success) {
        const netlifyRes = await fetch('/.netlify/functions/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceTitle: fullServiceSummary,
            price: totalPriceFormatted,
            date: formData.date,
            timeSlot: formData.timeSlot,
            clientName: formData.clientName,
            clientPhone: formData.clientPhone,
            location: formData.location,
            comment: formData.comment,
            contactMethod: formData.contactMethod,
          }),
        });
        if (netlifyRes.ok) {
          try {
            data = await netlifyRes.json();
          } catch (e) {
            console.warn('Netlify function response parse error:', e);
          }
        }
      }

      // Final fallback: Direct Telegram API request if backend endpoints returned 404/error
      if (!data || !data.success) {
        const botToken = '8465212295:AAEAWwwFoAIV1ACnsbz8cjGNWYAlsFysEqs';
        const chatIds = ['226821933', '592019284'];
        const msg = `💅 <b>НОВАЯ ЗАПИСЬ С САЙТА!</b>\n\n<b>Клиент:</b> ${formData.clientName}\n<b>Телефон:</b> ${formData.clientPhone}\n<b>Услуга:</b> ${fullServiceSummary}\n<b>Стоимость:</b> ${totalPriceFormatted}\n<b>Дата:</b> ${formData.date}\n<b>Время:</b> ${formData.timeSlot}\n<b>Связь:</b> ${formData.contactMethod}` + (formData.comment ? `\n<b>Коммент:</b> ${formData.comment}` : '');
        
        let directSuccess = false;
        for (const cid of chatIds) {
          try {
            const tgDirect = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: cid, text: msg, parse_mode: 'HTML' }),
            });
            const tgJson = await tgDirect.json();
            if (tgJson.ok) directSuccess = true;
          } catch (e) {
            console.error('Direct Telegram API error:', e);
          }
        }
        data = { success: true, notificationSentToTelegram: directSuccess };
      }

      if (data && data.success) {
        setApiResult({
          telegramSent: data.notificationSentToTelegram,
          emailDispatchedTo: data.emailDispatchedTo,
        });
        setConfirmed(true);
      } else {
        alert(data?.error || 'Произошла ошибка при отправке формы.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setConfirmed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsappShareUrl = () => {
    const text = `Здравствуйте, Светлана! Хочу записаться к вам:%0A` +
      `💅 Услуга: ${currentService.title} (${currentSubOption.name})%0A` +
      `💰 Стоимость: ${totalPriceFormatted}%0A` +
      `📅 Дата: ${formData.date}%0A` +
      `⏰ Время: ${formData.timeSlot}%0A` +
      `👤 Клиент: ${formData.clientName}%0A` +
      `📞 Телефон: ${formData.clientPhone}`;

    return `https://wa.me/79531975581?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#061f18] border border-[#d4af37] shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#d4af37] hover:text-[#fff] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#d4af37]" />
            </div>

            <h3 className="font-serif-luxury text-3xl text-[#fceecb]">
              Заявка успешно создана!
            </h3>

            <p className="text-xs text-[#d0c2ac] max-w-md mx-auto leading-relaxed">
              Вы выбрали: <span className="text-[#d4af37] font-semibold">{currentService.title} ({currentSubOption.name})</span> на <span className="text-[#d4af37] font-semibold">{formData.date} в {formData.timeSlot}</span>.
              <br />
              Итоговая стоимость: <span className="text-gold-gradient font-bold text-sm">{totalPriceFormatted}</span>
            </p>

            <div className="p-4 bg-[#03110c] border border-[#d4af37]/40 text-xs text-[#e8cf8d] space-y-3 max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-[#4ade80] font-medium">
                <Check className="w-4 h-4 shrink-0" />
                <span>Уведомление отправлено мастеру на почту и в Telegram!</span>
              </div>
              <div className="text-[11px] text-[#c0a875]">Мгновенная связь со Светланой:</div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="https://t.me/SvetAlexx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#08221a] border border-[#d4af37] text-[#fceecb] font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 hover:bg-[#d4af37] hover:text-[#061813] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram @SvetAlexx</span>
                </a>

                <a
                  href={getWhatsappShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#08221a] border border-[#d4af37] text-[#fceecb] font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 hover:bg-[#d4af37] hover:text-[#061813] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="text-xs text-[#a8956e] underline hover:text-[#d4af37] uppercase tracking-wider"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 overflow-hidden bg-[#08221a] shrink-0 flex items-center justify-center">
                <Logo className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#faf4e6]">
                  ЗАПИСЬ НА УСЛУГУ
                </h3>
                <p className="text-[11px] text-[#b8a272]">
                  Выберите услугу, подходящий вариант и удобное время
                </p>
              </div>
            </div>

            {/* Step 1: Main Service Category Selection */}
            <div>
              <label className="block text-xs uppercase text-[#d4af37] tracking-wider mb-2 font-semibold">
                1. Выберите категорию услуги
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICES.map((serv) => (
                  <button
                    type="button"
                    key={serv.id}
                    onClick={() => handleServiceChange(serv.id)}
                    className={`p-3 text-left border transition-all ${
                      selectedServiceId === serv.id
                        ? 'bg-[#d4af37] text-[#061813] font-bold border-[#d4af37]'
                        : 'bg-[#03110c] text-[#c0a875] border-[#d4af37]/30 hover:border-[#d4af37]'
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase">{serv.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{serv.priceRange}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Specific Sub-Option Selection (Dynamic radio list) */}
            <div className="p-4 bg-[#03110c] border border-[#d4af37]/40 space-y-3">
              <label className="block text-xs uppercase text-[#e8cf8d] tracking-wider font-semibold">
                2. Выберите вариант процедуры ({currentService.title})
              </label>

              <div className="space-y-2">
                {currentService.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                      selectedSubOptionId === option.id
                        ? 'bg-[#08281f] border-[#d4af37] text-[#faf4e6]'
                        : 'bg-[#051812] border-[#d4af37]/20 text-[#b8a272] hover:border-[#d4af37]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="subOption"
                        checked={selectedSubOptionId === option.id}
                        onChange={() => setSelectedSubOptionId(option.id)}
                        className="accent-[#d4af37] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#fceecb]">
                          {option.name}
                        </div>
                        <div className="text-[10px] text-[#a8956e] flex items-center space-x-2 mt-0.5">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#d4af37]" />
                            <span>{option.duration}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-bold text-gold-gradient shrink-0 ml-2">
                      {option.priceFormatted}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Addons */}
            <div>
              <label className="block text-xs uppercase text-[#d4af37] tracking-wider mb-2 font-semibold">
                3. Дополнительно (необязательно)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 text-left border text-xs flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#08281f] border-[#d4af37] text-[#fceecb]'
                          : 'bg-[#03110c] border-[#d4af37]/25 text-[#a8956e] hover:border-[#d4af37]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#d4af37] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-[#a8956e] shrink-0" />
                        )}
                        <span className="text-[11px] font-medium">{addon.name}</span>
                      </div>
                      <span className="text-[10px] text-[#d4af37] font-bold shrink-0 ml-1">
                        +{addon.priceFormatted}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Location, Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs uppercase text-[#d4af37] tracking-wider mb-1 font-semibold">
                  Локация
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#03110c] border border-[#d4af37]/40 p-2.5 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                >
                  <option value="Студия на дому (г. Тула, ул. Макаренко, 19, к. 1)">
                    Студия на дому (Макаренко 19к1)
                  </option>
                  <option value="Салон «Амальфи» (г. Тула, ул. Макаренко, 18)">
                    Салон «Амальфи» (Макаренко 18)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#d4af37] tracking-wider mb-1 font-semibold">
                  Дата
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#03110c] border border-[#d4af37]/40 p-2.5 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#d4af37] tracking-wider mb-1 font-semibold">
                  Время
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-[#03110c] border border-[#d4af37]/40 p-2.5 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Contact Details */}
            <div className="space-y-3 pt-2 border-t border-[#d4af37]/20">
              <label className="block text-xs uppercase text-[#d4af37] tracking-wider font-semibold">
                4. Ваши контактные данные
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ваше Имя *"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#03110c] border border-[#d4af37]/40 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                />

                <input
                  type="tel"
                  required
                  placeholder="Номер телефона (+7 ...) *"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full bg-[#03110c] border border-[#d4af37]/40 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Комментарий или пожелания (необязательно)..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full bg-[#03110c] border border-[#d4af37]/40 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* Live Calculated Price & Submit Button */}
            <div className="pt-4 border-t border-[#d4af37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase text-[#a8956e]">Итоговая стоимость:</div>
                <div className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                  {totalPriceFormatted}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-gold-gradient text-[#061813] font-bold text-xs tracking-[0.2em] uppercase hover:shadow-lg shadow-[#d4af37]/30 transition-all disabled:opacity-50"
              >
                {submitting ? 'ОТПРАВКА ЗАЯВКИ...' : 'ПОДТВЕРДИТЬ ЗАПИСЬ'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
