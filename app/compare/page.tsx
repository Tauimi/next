import { Metadata } from 'next'
import { Plus, X, Star, Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Сравнение товаров - TechnoMart',
  description: 'Сравните характеристики товаров TechnoMart. Выберите лучший товар по параметрам и цене.',
}

const comparisonProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    price: 89990,
    originalPrice: 99990,
    rating: 4.8,
    reviews: 247,
    specifications: {
      'Экран': '6.1" Super Retina XDR',
      'Процессор': 'A17 Pro',
      'Память': '128 ГБ',
      'ОЗУ': '8 ГБ',
      'Камера': '48 МП + 12 МП + 12 МП',
      'Батарея': '3274 мАч',
      'Вес': '187 г',
      'Материал': 'Титан',
      'Защита': 'IP68',
      'Беспроводная зарядка': 'Да'
    }
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
    price: 109990,
    originalPrice: null,
    rating: 4.6,
    reviews: 189,
    specifications: {
      'Экран': '6.8" Dynamic AMOLED 2X',
      'Процессор': 'Snapdragon 8 Gen 3',
      'Память': '256 ГБ',
      'ОЗУ': '12 ГБ',
      'Камера': '200 МП + 50 МП + 12 МП + 10 МП',
      'Батарея': '5000 мАч',
      'Вес': '232 г',
      'Материал': 'Алюминий + стекло',
      'Защита': 'IP68',
      'Беспроводная зарядка': 'Да'
    }
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop',
    price: 79990,
    originalPrice: 89990,
    rating: 4.5,
    reviews: 156,
    specifications: {
      'Экран': '6.7" LTPO OLED',
      'Процессор': 'Google Tensor G3',
      'Память': '128 ГБ',
      'ОЗУ': '12 ГБ',
      'Камера': '50 МП + 48 МП + 48 МП',
      'Батарея': '5050 мАч',
      'Вес': '210 г',
      'Материал': 'Алюминий + стекло',
      'Защита': 'IP68',
      'Беспроводная зарядка': 'Да'
    }
  }
]

export default function ComparePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Сравнение <span className="text-primary">товаров</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Сравните характеристики и выберите лучший товар
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Add Product Section */}
            <div className="mb-8 text-center">
              <Button size="lg" variant="outline">
                <Plus className="w-5 h-5 mr-2" />
                Добавить товар для сравнения
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Можно сравнить до 4 товаров одновременно
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Product Headers */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="font-semibold text-lg">Характеристики</div>
                  {comparisonProducts.map((product) => (
                    <div key={product.id} className="bg-muted/50 rounded-lg p-4 relative">
                      <button className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                      
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                      />
                      
                      <h3 className="font-semibold text-center mb-2">{product.name}</h3>
                      
                      <div className="text-center mb-3">
                        <div className="text-xl font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString()} ₽
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>

                      <Button className="w-full" size="sm">
                        В корзину
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Specifications Comparison */}
                <div className="space-y-2">
                  {Object.keys(comparisonProducts[0].specifications).map((spec) => (
                    <div key={spec} className="grid grid-cols-4 gap-4 py-3 border-b border-muted/50">
                      <div className="font-medium text-muted-foreground">{spec}</div>
                      {comparisonProducts.map((product) => {
                        const value = product.specifications[spec as keyof typeof product.specifications]
                        const isBoolean = value === 'Да' || value === 'Нет'
                        
                        return (
                          <div key={product.id} className="flex items-center">
                            {isBoolean ? (
                              <>
                                {value === 'Да' ? (
                                  <Check className="w-5 h-5 text-green-600 mr-2" />
                                ) : (
                                  <Minus className="w-5 h-5 text-red-600 mr-2" />
                                )}
                                <span className={value === 'Да' ? 'text-green-600' : 'text-red-600'}>
                                  {value}
                                </span>
                              </>
                            ) : (
                              <span>{value}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 grid grid-cols-4 gap-4">
                  <div></div>
                  {comparisonProducts.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <Button className="w-full">
                        В корзину
                      </Button>
                      <Button variant="outline" className="w-full">
                        Подробнее
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Compare */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Как сравнивать товары</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Выберите товары</h3>
                <p className="text-muted-foreground">
                  Добавьте до 4 товаров одной категории для сравнения характеристик
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Сравните параметры</h3>
                <p className="text-muted-foreground">
                  Изучите детальное сравнение характеристик, цен и отзывов
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Сделайте выбор</h3>
                <p className="text-muted-foreground">
                  Выберите оптимальный товар и добавьте его в корзину
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Популярные сравнения</h2>
              <p className="text-xl text-muted-foreground">
                Часто сравниваемые товары
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'iPhone 15 vs Samsung S24', count: '2.3k сравнений' },
                { title: 'MacBook Air vs Dell XPS', count: '1.8k сравнений' },
                { title: 'AirPods vs Sony WH-1000XM5', count: '1.5k сравнений' },
                { title: 'iPad vs Samsung Tab S9', count: '1.2k сравнений' }
              ].map((comparison, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">{comparison.title}</h3>
                  <p className="text-muted-foreground text-sm">{comparison.count}</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Посмотреть сравнение
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 