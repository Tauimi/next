import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

// Инициализация шрифтов
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Метаданные сайта
export const metadata: Metadata = {
  title: 'TechnoMart - Интернет-магазин электроники и бытовой техники',
  description: 'Широкий выбор электроники, бытовой техники, смартфонов, ноутбуков и аксессуаров. Быстрая доставка, гарантия качества, профессиональные консультации.',
  keywords: [
    'электроника',
    'бытовая техника', 
    'смартфоны',
    'ноутбуки',
    'телевизоры',
    'интернет-магазин',
    'техномарт'
  ],
  authors: [{ name: 'TechnoMart' }],
  creator: 'TechnoMart',
  publisher: 'TechnoMart',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://technomart.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechnoMart - Интернет-магазин электроники',
    description: 'Широкий выбор электроники и бытовой техники с гарантией качества',
    url: 'https://technomart.vercel.app',
    siteName: 'TechnoMart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechnoMart - Интернет-магазин электроники',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechnoMart - Интернет-магазин электроники',
    description: 'Широкий выбор электроники и бытовой техники с гарантией качества',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Дополнительные мета-теги */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Preload критических ресурсов */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data для SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'TechnoMart',
              description: 'Интернет-магазин электроники и бытовой техники',
              url: 'https://technomart.vercel.app',
              logo: 'https://technomart.vercel.app/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+7 (800) 123-45-67',
                contactType: 'customer service',
                availableLanguage: 'Russian',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'RU',
                addressLocality: 'Москва',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://technomart.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        {/* Основной контейнер */}
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200">
            <div className="container-custom">
              {/* Верхняя панель с контактами */}
              <div className="hidden lg:flex items-center justify-between py-2 text-sm text-secondary-600 border-b border-secondary-100">
                <div className="flex items-center gap-6">
                  <span>📞 +7 (800) 123-45-67</span>
                  <span>📧 info@technomart.ru</span>
                  <span>🕒 Пн-Пт: 9:00-18:00</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="btn-ghost btn-sm">
                    Версия для слабовидящих
                  </button>
                  <span>|</span>
                  <a href="/about" className="hover:text-primary-600">О компании</a>
                  <a href="/contacts" className="hover:text-primary-600">Контакты</a>
                </div>
              </div>
              
              {/* Основная навигация */}
              <div className="flex items-center justify-between py-4">
                {/* Логотип */}
                <div className="flex items-center">
                  <a href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-display font-bold text-secondary-900">
                        TechnoMart
                      </h1>
                      <p className="text-xs text-secondary-600">
                        Электроника и техника
                      </p>
                    </div>
                  </a>
                </div>
                
                {/* Поиск */}
                <div className="flex-1 max-w-2xl mx-8">
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Поиск товаров..."
                      className="search-input w-full"
                    />
                    <div className="search-icon">
                      🔍
                    </div>
                  </div>
                </div>
                
                {/* Действия пользователя */}
                <div className="flex items-center gap-4">
                  {/* Кнопка заказа звонка */}
                  <button className="btn-accent hidden lg:flex">
                    📞 Заказать звонок
                  </button>
                  
                  {/* Избранное */}
                  <button className="relative p-2 text-secondary-600 hover:text-primary-600">
                    <span className="text-xl">❤️</span>
                    <span className="cart-badge">3</span>
                  </button>
                  
                  {/* Корзина */}
                  <button className="relative p-2 text-secondary-600 hover:text-primary-600">
                    <span className="text-xl">🛒</span>
                    <span className="cart-badge">2</span>
                  </button>
                  
                  {/* Профиль */}
                  <button className="p-2 text-secondary-600 hover:text-primary-600">
                    <span className="text-xl">👤</span>
                  </button>
                </div>
              </div>
              
              {/* Навигационное меню */}
              <nav className="hidden lg:flex items-center justify-between py-3 border-t border-secondary-100">
                <div className="flex items-center gap-8">
                  <a href="/catalog" className="nav-link">📱 Каталог</a>
                  <a href="/services" className="nav-link">🔧 Услуги</a>
                  <a href="/projects" className="nav-link">💼 Проекты</a>
                  <a href="/clients" className="nav-link">🤝 Клиенты</a>
                  <a href="/news" className="nav-link">📰 Новости</a>
                  <a href="/info" className="nav-link">📚 Справка</a>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-accent-600 font-medium">🚚 Бесплатная доставка от 5000₽</span>
                </div>
              </nav>
            </div>
          </header>
          
          {/* Основной контент */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-secondary-900 text-white">
            <div className="container-custom py-golden-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* О компании */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">T</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold">TechnoMart</h3>
                  </div>
                  <p className="text-secondary-300 mb-4">
                    Надежный партнер в мире электроники и бытовой техники. 
                    Качество, сервис, гарантии.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-sm transition-colors">
                      VK
                    </a>
                    <a href="#" className="w-8 h-8 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-sm transition-colors">
                      TG
                    </a>
                    <a href="#" className="w-8 h-8 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-sm transition-colors">
                      YT
                    </a>
                  </div>
                </div>
                
                {/* Каталог */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Каталог</h3>
                  <ul className="space-y-2 text-secondary-300">
                    <li><a href="/catalog/smartphones" className="hover:text-white transition-colors">Смартфоны</a></li>
                    <li><a href="/catalog/laptops" className="hover:text-white transition-colors">Ноутбуки</a></li>
                    <li><a href="/catalog/tv" className="hover:text-white transition-colors">Телевизоры</a></li>
                    <li><a href="/catalog/appliances" className="hover:text-white transition-colors">Бытовая техника</a></li>
                    <li><a href="/catalog/gaming" className="hover:text-white transition-colors">Игровые консоли</a></li>
                  </ul>
                </div>
                
                {/* Информация */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Информация</h3>
                  <ul className="space-y-2 text-secondary-300">
                    <li><a href="/about" className="hover:text-white transition-colors">О компании</a></li>
                    <li><a href="/delivery" className="hover:text-white transition-colors">Доставка и оплата</a></li>
                    <li><a href="/warranty" className="hover:text-white transition-colors">Гарантия</a></li>
                    <li><a href="/returns" className="hover:text-white transition-colors">Возврат товара</a></li>
                    <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                  </ul>
                </div>
                
                {/* Контакты */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                  <div className="space-y-3 text-secondary-300">
                    <div>
                      <p className="font-medium text-white">📞 Телефон:</p>
                      <p>+7 (800) 123-45-67</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">📧 Email:</p>
                      <p>info@technomart.ru</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">🕒 Режим работы:</p>
                      <p>Пн-Пт: 9:00-18:00<br />Сб-Вс: 10:00-16:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Нижняя часть */}
              <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="text-secondary-400 text-sm">
                  © 2024 TechnoMart. Все права защищены.
                </div>
                <div className="flex gap-6 text-sm text-secondary-400">
                  <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                  <a href="/terms" className="hover:text-white transition-colors">Пользовательское соглашение</a>
                  <a href="/sitemap" className="hover:text-white transition-colors">Карта сайта</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Кнопка "Вверх" */}
        <button className="scroll-to-top" id="scrollToTop">
          ↑
        </button>
        
        {/* Скрипты */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Кнопка "Вверх"
              const scrollToTopBtn = document.getElementById('scrollToTop');
              
              window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                  scrollToTopBtn.classList.add('visible');
                } else {
                  scrollToTopBtn.classList.remove('visible');
                }
              });
              
              scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              });
            `,
          }}
        />
      </body>
    </html>
  )
} 