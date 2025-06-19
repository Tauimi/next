'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Headphones, 
  Star,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ProductCard from '@/components/ProductCard'
import QuickAddProduct from '@/components/QuickAddProduct'
import { formatDate, fetchProducts } from '@/lib/utils'
import { ProductCardData } from '@/types'

const categories = [
  {
    id: '1',
    name: 'Смартфоны',
    slug: 'smartphones',
    icon: '📱',
    count: 156,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center'
  },
  {
    id: '2',
    name: 'Ноутбуки',
    slug: 'laptops',
    icon: '💻',
    count: 89,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&crop=center'
  },
  {
    id: '3',
    name: 'Телевизоры',
    slug: 'tvs',
    icon: '📺',
    count: 67,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop&crop=center'
  },
  {
    id: '4',
    name: 'Планшеты',
    slug: 'tablets',
    icon: '📱',
    count: 45,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop&crop=center'
  },
  {
    id: '5',
    name: 'Аксессуары',
    slug: 'accessories',
    icon: '🎧',
    count: 234,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop&crop=center'
  },
  {
    id: '6',
    name: 'Игры',
    slug: 'gaming',
    icon: '🎮',
    count: 78,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=200&fit=crop&crop=center'
  }
]

const news = [
  {
    id: '1',
    title: 'Новая линейка iPhone 15 уже в наличии',
    excerpt: 'Встречайте самые передовые смартфоны от Apple с инновационными функциями.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=250&fit=crop&crop=center',
    date: new Date('2024-01-15'),
    slug: 'iphone-15-lineup'
  },
  {
    id: '2',
    title: 'Скидки до 30% на ноутбуки',
    excerpt: 'Специальное предложение на все модели ноутбуков. Только до конца месяца!',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop&crop=center',
    date: new Date('2024-01-10'),
    slug: 'laptop-sale'
  },
  {
    id: '3',
    title: 'Открытие нового сервисного центра',
    excerpt: 'Мы расширяемся! Новый сервисный центр в центре города.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center',
    date: new Date('2024-01-05'),
    slug: 'new-service-center'
  }
]

const benefits = [
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Официальная гарантия на всю технику от 1 года'
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставка по Москве в день заказа'
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Круглосуточная техническая поддержка'
  }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardData[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Загрузка товаров
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts({ limit: 4 })
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Failed to load featured products:', error)
      } finally {
        setLoadingProducts(false)
      }
    }
    
    loadFeaturedProducts()
  }, [])

  // Автопрокрутка слайдера
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Мир современных
                <span className="text-primary block">технологий</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Качественная электроника, выгодные цены и профессиональный сервис. 
                Ваш надежный партнер в мире технологий.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/catalog">
                    <>
                      Перейти в каталог
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 w-5 h-5" />
                  Смотреть видео
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=500&fit=crop&crop=center"
                  alt="Современные технологии"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Каталог товаров</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент качественной электроники и техники
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border text-center"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} товаров
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Рекомендуемые товары</h2>
              <p className="text-xl text-muted-foreground">
                Популярные и новые товары от лучших брендов
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/catalog">
                <>
                  Все товары
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              </Link>
            </Button>
          </motion.div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-4 animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Новости и акции</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Будьте в курсе последних новостей и специальных предложений
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/news/${article.slug}`} className="block">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <time className="text-sm text-muted-foreground">
                      {formatDate(article.date)}
                    </time>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/news">
                <>
                  Все новости
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Нужна консультация?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Наши специалисты помогут выбрать идеальную технику для ваших задач
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Headphones className="mr-2 w-5 h-5" />
                Заказать звонок
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Онлайн-консультация
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Add Product Widget */}
      <QuickAddProduct />
    </main>
  )
} 