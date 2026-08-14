export interface ServiceSubOption {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  duration: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  priceRange: string;
  minPrice: number;
  popular?: boolean;
  category: 'manicure' | 'pedicure' | 'design' | 'care';
  options: ServiceSubOption[];
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'design' | 'french' | 'pedicure' | 'japanese' | 'gel';
  categoryLabel: string;
  image: string;
  description: string;
  technique: string;
  duration: string;
  price: string;
  materials: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string;
  avatar: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

export interface BookingFormData {
  serviceId: string;
  subOptionId: string;
  addons: string[];
  location?: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  comment?: string;
  contactMethod: 'telegram' | 'whatsapp' | 'call';
}
