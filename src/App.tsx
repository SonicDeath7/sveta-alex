import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { MASTER_INFO } from './data/mockData';
import { Send } from 'lucide-react';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  const handleOpenBookingWithService = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    setBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedServiceForBooking('');
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#061813] text-[#e2d5c3] font-sans-clean selection:bg-[#d4af37] selection:text-[#061813] relative">
      
      {/* Navigation Bar */}
      <Navbar onOpenBooking={handleOpenGeneralBooking} />

      {/* Hero Main Section */}
      <main>
        <Hero onOpenBooking={handleOpenGeneralBooking} />

        {/* Unified Services & Prices Section */}
        <ServicesSection onSelectService={handleOpenBookingWithService} />

        {/* About Master Section */}
        <AboutSection />

        {/* Client Reviews Section */}
        <Testimonials />

        {/* Contacts & Location Section */}
        <ContactSection onOpenBooking={handleOpenGeneralBooking} />
      </main>

      {/* Online Booking Drawer Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedService={selectedServiceForBooking}
      />

      {/* Floating Quick Telegram Chat Button */}
      <a
        href={MASTER_INFO.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#08281f] border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#061813] shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      >
        <Send className="w-5 h-5 text-current transform -rotate-12" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-semibold uppercase tracking-wider pl-0 group-hover:pl-2">
          Telegram
        </span>
      </a>

    </div>
  );
}
