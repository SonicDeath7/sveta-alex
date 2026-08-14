import { PortfolioItem, ServiceItem, Testimonial, Certificate } from '../types';

export const MASTER_INFO = {
  fullName: "Алексеева Светлана Александровна",
  shortName: "Светлана Алексеева",
  title: "Инструктор & Top Nail Artist",
  subtitle: "Мастер авторского маникюра, педикюра и эстетики ногтей",
  experienceYears: 9,
  happyClients: 4200,
  certificatesCount: 18,
  phone: "+7 (953) 197-55-81",
  phoneFormatted: "+7 953 197 55 81",
  phoneClean: "79531975581",
  telegram: "https://t.me/SvetAlexx",
  telegramHandle: "@SvetAlexx",
  vk: "https://vk.com/alekseeva_nails_studio",
  whatsapp: "https://wa.me/79531975581",
  email: "darkbeacon71@gmail.com",
  photo: "./master.jpg?v=2",
  photoAbout: "./master2.jpg?v=3",
  fallbackPhoto: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80",
  botUsername: "@SvetAlex71Bot",
  city: "г. Тула",
  locations: [
    {
      title: "Студия на дому",
      address: "г. Тула, ул. Макаренко, 19, к. 1",
      badge: "Частный кабинет"
    },
    {
      title: "Салон красоты «Амальфи»",
      address: "г. Тула, ул. Макаренко, 18",
      badge: "Салон"
    }
  ],
  address: "г. Тула, ул. Макаренко, 19к1 / ул. Макаренко, 18 (Салон «Амальфи»)",
  metro: "г. Тула",
  workingHours: "Пн — Вс: 10:00 – 21:00 (по предварительной записи)",
  bio: "Более 9 лет я создаю идеальную форму ногтей, безопасный аппаратный и комбинированный маникюр, а также восстанавливающий педикюр. В своей работе использую только премиальные гипоаллергенные материалы (Luxio, Fedua, Bandi) и строго придерживаюсь стандартов стерильности СанПиН.",
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Emerald Luxe & Gold Leaf',
    category: 'design',
    categoryLabel: 'Авторский дизайн',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
    description: 'Изумрудный матовый гель с хлопьями юки и поталью 24K gold. Выполнен на укрепленных гелем натуральных ногтях.',
    technique: 'Комбинированный маникюр + Укрепление гелем + Hand-art',
    duration: '1 ч. 50 мин.',
    price: '4 500 ₽',
    materials: ['Luxio Emerald', 'Gold Foil 24k', 'Glossy Top Fedua'],
    featured: true,
  },
  {
    id: 'port-2',
    title: 'Nude Silk & Micro Pearl French',
    category: 'french',
    categoryLabel: 'Френч & Минимализм',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
    description: 'Анатомический микро-френч на идеальной камуфлирующей базе цвета пепельной розы с едва уловимым микрошиммером.',
    technique: 'Аппаратный маникюр без режущих инструментов',
    duration: '1 ч. 30 мин.',
    price: '3 800 ₽',
    materials: ['Fedua Blush Nude', 'White Gel Micro-line', 'Top Diamond Gloss'],
    featured: true,
  },
  {
    id: 'port-3',
    title: 'Aesthetic Smart Pedicure & Wine Red',
    category: 'pedicure',
    categoryLabel: 'Педикюр & SPA',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80',
    description: 'Смарт-педикюр дисками с органическим маслом Monami, гигиеническая обработка пальцев и покрытие бордовым глянцем.',
    technique: 'Smart-педикюр + Масляная полировка + SPA уход',
    duration: '1 ч. 40 мин.',
    price: '4 800 ₽',
    materials: ['Smart Disks', 'Organic Oil', 'Bandi Wine Velvet'],
    featured: true,
  },
  {
    id: 'port-4',
    title: 'Японский эко-маникюр P.Shine',
    category: 'japanese',
    categoryLabel: 'Японский уход',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    description: 'Лечебное втирание минеральной пасты со сqualane и пчелиным воском для восстановления поврежденных или тонких ногтей.',
    technique: 'P.Shine запечатывание + Полировка замшевым блоком',
    duration: '1 ч. 10 мин.',
    price: '3 500 ₽',
    materials: ['P.Shine Paste', 'Diatomaceous Earth', 'Squalane Silk'],
    featured: true,
  },
  {
    id: 'port-5',
    title: 'Milky Almond & Geometry Gold',
    category: 'design',
    categoryLabel: 'Авторский дизайн',
    image: 'https://images.unsplash.com/photo-1599948019395-757317e3fcf3?auto=format&fit=crop&w=1000&q=80',
    description: 'Молочный градиент омбре с лаконичной тонкой золотой геометрией на миндалевидных ногтях.',
    technique: 'Аппаратный выравнивающий выкладной дизайн',
    duration: '1 ч. 45 мин.',
    price: '4 200 ₽',
    materials: ['Luxio Milky', 'Gold Paint Line', 'Satin Top Coat'],
    featured: false,
  },
  {
    id: 'port-6',
    title: 'Архитектура & Гелевое моделирование',
    category: 'gel',
    categoryLabel: 'Укрепление гелем',
    image: 'https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?auto=format&fit=crop&w=1000&q=80',
    description: 'Исправление клюющих ногтей, выстраивание правильного апекса жестким гелем Akzentz и натуральный нюдовый финиш.',
    technique: 'Архитектурная коррекция + Моделирование Akzentz Trinity',
    duration: '2 ч. 00 мин.',
    price: '5 200 ₽',
    materials: ['Akzentz Hard Gel', 'Cover Nude Pink', 'High-Shine Top'],
    featured: false,
  },
];

export const ADDONS = [
  { id: 'add-1', name: 'Снятие чужого покрытия', price: 500, priceFormatted: '500 ₽' },
  { id: 'add-2', name: 'Френч на все ногти', price: 800, priceFormatted: '800 ₽' },
  { id: 'add-3', name: 'Дизайн 1 ногтя (поталь/втирка/рисунок)', price: 200, priceFormatted: '200 ₽' },
  { id: 'add-4', name: 'Ремонт / донаращивание 1 ногтя', price: 300, priceFormatted: '300 ₽' },
  { id: 'add-5', name: 'SPA-массаж и парафинотерапия', price: 800, priceFormatted: '800 ₽' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'serv-manicure',
    title: 'Маникюр',
    subtitle: 'Аппаратная или комбинированная обработка ногтей и кутикулы с выбором покрытия',
    duration: '1 ч – 2 ч',
    priceRange: 'от 1 800 ₽',
    minPrice: 1800,
    popular: true,
    category: 'manicure',
    options: [
      { id: 'man-shellac', name: 'Маникюр + Покрытие Гель-лак (шеллак)', price: 2800, priceFormatted: '2 800 ₽', duration: '1 ч 20 мин', popular: true },
      { id: 'man-gel-hard', name: 'Маникюр + Укрепление жестким гелем', price: 3500, priceFormatted: '3 500 ₽', duration: '1 ч 40 мин' },
      { id: 'man-ext', name: 'Наращивание ногтей гелем', price: 4200, priceFormatted: '4 200 ₽', duration: '2 ч' },
      { id: 'man-polish', name: 'Маникюр + Покрытие обычным лаком', price: 2200, priceFormatted: '2 200 ₽', duration: '1 ч' },
      { id: 'man-japanese', name: 'Японский восстанавливающий уход (P.Shine)', price: 3200, priceFormatted: '3 200 ₽', duration: '1 ч' },
      { id: 'man-clean', name: 'Гигиенический маникюр (без покрытия)', price: 1800, priceFormatted: '1 800 ₽', duration: '45 мин' },
    ],
    features: [
      'Безопасная аппаратная или комбинированная обработка кутикулы',
      'Придаем красивую аккуратную форму (квадрат, миндаль, овал)',
      'Стойкое выравнивание ногтевой пластины',
      'Ухаживающее масло для кутикулы в подарок',
    ]
  },
  {
    id: 'serv-pedicure',
    title: 'Педикюр',
    subtitle: 'Аккуратная обработка пальцев и стоп с покрытием или без',
    duration: '1 ч – 1 ч 40 мин',
    priceRange: 'от 2 800 ₽',
    minPrice: 2800,
    popular: true,
    category: 'pedicure',
    options: [
      { id: 'ped-shellac', name: 'Педикюр + Покрытие Гель-лак (шеллак)', price: 3800, priceFormatted: '3 800 ₽', duration: '1 ч 30 мин', popular: true },
      { id: 'ped-smart', name: 'Смарт-педикюр (стопы + пальцы + гель-лак)', price: 4500, priceFormatted: '4 500 ₽', duration: '1 ч 40 мин' },
      { id: 'ped-polish', name: 'Педикюр + Покрытие обычным лаком', price: 3200, priceFormatted: '3 200 ₽', duration: '1 ч 15 мин' },
      { id: 'ped-clean', name: 'Гигиенический педикюр (без покрытия)', price: 2800, priceFormatted: '2 800 ₽', duration: '1 ч' },
    ],
    features: [
      'Обработка стоп дисками и удаление натоптышей',
      'Аккуратная гигиена пальцев и кутикулы',
      'Легкий или стойкий вариант покрытия на выбор',
      'Увлажняющий крем и питательное масло',
    ]
  },
  {
    id: 'serv-design',
    title: 'Дизайн ногтей',
    subtitle: 'Украшение и авторское оформление маникюра на любой вкус',
    duration: '+15 – 30 мин',
    priceRange: 'от 200 ₽',
    minPrice: 200,
    popular: false,
    category: 'design',
    options: [
      { id: 'des-french', name: 'Френч (французский классический / цветной)', price: 800, priceFormatted: '800 ₽', duration: '20 мин', popular: true },
      { id: 'des-ombre', name: 'Градиент / Омбре на все ногти', price: 1000, priceFormatted: '1 000 ₽', duration: '25 мин' },
      { id: 'des-single', name: 'Дизайн 1 ногтя (рисунок / втирка / поталь)', price: 200, priceFormatted: '200 ₽', duration: '10 мин' },
      { id: 'des-full', name: 'Авторский арт на все ногти', price: 1500, priceFormatted: '1 500 ₽', duration: '30 мин' },
    ],
    features: [
      'Изящный классический или цветной френч',
      'Плавный градиент и омбре аэрографом',
      'Втирка, поталь 24K, хлопья Юки',
      'Ручная роспись кистью',
    ]
  },
  {
    id: 'serv-care',
    title: 'Снятие и уход',
    subtitle: 'Уход за натуральными ногтями, снятие покрытия и восстановление',
    duration: '20 мин – 1 ч',
    priceRange: 'от 300 ₽',
    minPrice: 300,
    popular: false,
    category: 'care',
    options: [
      { id: 'care-pshine', name: 'Японский восстанавливающий уход P.Shine', price: 3200, priceFormatted: '3 200 ₽', duration: '1 ч', popular: true },
      { id: 'care-[#e8cf8d]', name: 'Парафинотерапия и SPA-массаж рук', price: 800, priceFormatted: '800 ₽', duration: '20 мин' },
      { id: 'care-remove', name: 'Снятие чужого покрытия', price: 500, priceFormatted: '500 ₽ (бесплатно при перезаписи)', duration: '20 мин' },
      { id: 'care-repair', name: 'Ремонт / донаращивание 1 ногтя', price: 300, priceFormatted: '300 ₽', duration: '15 мин' },
    ],
    features: [
      'Бережное снятие фрезой без повреждения ногтевой пластины',
      'Восстановление тонких и слоящихся ногтей',
      'Питание воском и морскими минералами',
      'Парафиновая ванночка для мягкости кожи рук',
    ]
  }
];

export const BRANDS = [
  { name: 'LUXIO', desc: '100% Pure Gel (Canada)' },
  { name: 'FEDUA', desc: 'Haute Couture Polish (Italy)' },
  { name: 'BANDI', desc: 'Eco Eco-friendly Care (Korea)' },
  { name: 'AKZENTZ', desc: 'Pro Professional Hard Gel (Canada)' },
  { name: 'GEHWOL', desc: 'Medical Foot Care (Germany)' },
  { name: 'BAEHR', desc: 'Podology Excellence (Germany)' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    clientName: 'Екатерина Волкова',
    clientRole: 'Основатель брендингового агентства',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    service: 'Luxe Manicure + Френч',
    comment: 'Светлана — единственный мастер в Москве, к которой я хожу уже 4 года без перерыва! Маникюр держится месяц без единой отслойки. Атмосфера в студии и отношение к стерильности на высшем уровне.',
    rating: 5,
    date: '12 Августа 2026',
  },
  {
    id: 'rev-2',
    clientName: 'София Ланская',
    clientRole: 'Фэшн-стилист & Блогер',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    service: 'Авторский дизайн Emerald Luxe',
    comment: 'Восхитительный тонкий вкус и невероятная точность линий! Света всегда подскажет, какой оттенок подойдет под мой гардероб. А масляный смарт-педикюр — это отдельное наслаждение!',
    rating: 5,
    date: '28 Июля 2026',
  },
  {
    id: 'rev-3',
    clientName: 'Мария Семенова',
    clientRole: 'Архитектор',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    service: 'Японский эко-маникюр P.Shine',
    comment: 'После снятия геля думала, что ногти восстанавливать полгода. Светлана порекомендовала курс японского ухода P.Shine — через 2 процедуры ногти стали твердыми и с нереальным блеском.',
    rating: 5,
    date: '5 Августа 2026',
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Top Master & Instructor of Combo Manicure',
    issuer: 'International Nail Academy Paris',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cert-2',
    title: 'Smart Pedicure Authorized Podology Expert',
    issuer: 'Smart License System Germany',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cert-3',
    title: 'Luxio Certified Gel Colorist & Artist',
    issuer: 'Akzentz Canada Masterclass',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
];

export const STERILIZATION_STEPS = [
  {
    num: '01',
    title: 'Дезинфекция в УЗ-мойке',
    desc: 'Замачивание инструментов в сертифицированном растворе Мультидез с ультразвуковой обработкой.',
  },
  {
    num: '02',
    title: 'Предстерилизационная очистка (ПСО)',
    desc: 'Промывание под проточной водой, сушка и контроль пробами на скрытые загрязнения.',
  },
  {
    num: '03',
    title: 'Крафт-пакеты с индикатором',
    desc: 'Инструменты запечатываются в индивидуальные пакетирования VPAK с контрольной термолентой.',
  },
  {
    num: '04',
    title: 'Сухожаровой шкаф ГП-10 (180°C)',
    desc: 'Термическая обработка при 180°С в течение 60 минут. Пакет вскрывается исключительно в вашем присутствии!',
  },
];
