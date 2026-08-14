import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';
import { Sparkles, Star, Quote, PlusCircle, Check, X } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    service: 'Luxe Manicure',
    comment: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewObj: Testimonial = {
      id: `rev-custom-${Date.now()}`,
      clientName: newReview.name,
      clientRole: newReview.role || 'Постоянный клиент',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      service: newReview.service,
      comment: newReview.comment,
      rating: newReview.rating,
      date: 'Сегодня',
    };

    setReviewsList([reviewObj, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setNewReview({ name: '', role: '', service: 'Luxe Manicure', comment: '', rating: 5 });
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#04140f] relative border-t border-[#d4af37]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#d4af37]/20 pb-8">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#faf4e6] uppercase font-light tracking-wide">
              ОТЗЫВЫ <span className="text-gold-gradient font-normal">КЛИЕНТОВ</span>
            </h2>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 bg-[#08221a] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#e8cf8d] text-xs tracking-[0.15em] uppercase font-semibold transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#d4af37]" />
            <span>Оставить отзыв</span>
          </button>
        </div>

        {/* Testimonials Cards Grid matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-8 bg-emerald-card border border-[#d4af37]/25 relative flex flex-col justify-between space-y-6"
            >
              {/* Top Quote Icon & Rating */}
              <div className="flex items-center justify-between">
                <Quote className="w-8 h-8 text-[#d4af37]/40" />
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#e2d5c3] font-light leading-relaxed italic">
                «{rev.comment}»
              </p>

              {/* Service Tag */}
              <div className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold border-t border-[#d4af37]/15 pt-4">
                Услуга: {rev.service}
              </div>

              {/* Client Info Footer */}
              <div className="flex items-center space-x-3 pt-2">
                <img
                  src={rev.avatar}
                  alt={rev.clientName}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#d4af37]"
                />
                <div>
                  <h4 className="font-serif-luxury font-semibold text-sm text-[#fceecb]">
                    {rev.clientName}
                  </h4>
                  <div className="text-[10px] text-[#a8956e]">
                    {rev.clientRole} • {rev.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#061f18] border border-[#d4af37] p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-[#d4af37] hover:text-[#fff]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <Check className="w-12 h-12 text-[#d4af37] mx-auto" />
                <h3 className="font-serif-luxury text-2xl text-[#fceecb]">Спасибо за ваш отзыв!</h3>
                <p className="text-xs text-[#b8a272]">Ваше мнение помогает делать сервис еще более совершенным.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl text-[#fceecb]">Поделитесь впечатлением</h3>
                <p className="text-xs text-[#b8a272]">Оставьте отзыв о работе мастера Светланы Алексеевой</p>

                <div>
                  <label className="block text-[10px] uppercase text-[#d4af37] tracking-wider mb-1">Ваше Имя</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Например, Анна Смирнова"
                    className="w-full bg-[#03110c] border border-[#d4af37]/30 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#d4af37] tracking-wider mb-1">Продолжительность или Роль</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="Например, Постоянный клиент"
                    className="w-full bg-[#03110c] border border-[#d4af37]/30 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#d4af37] tracking-wider mb-1">Оценка</label>
                  <div className="flex space-x-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReview.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-[#a8956e]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#d4af37] tracking-wider mb-1">Текст Отзыва</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Расскажите о качестве покрытия, атмосфере и ваших впечатлениях..."
                    className="w-full bg-[#03110c] border border-[#d4af37]/30 p-3 text-xs text-[#faf4e6] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold-gradient text-[#061813] font-semibold text-xs tracking-[0.2em] uppercase"
                >
                  Опубликовать отзыв
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
