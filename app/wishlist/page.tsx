import { Metadata } from 'next'
import { Heart, ShoppingCart, Trash2, Star, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Избранное - TechnoMart',
  description: 'Избранные товары в TechnoMart. Сохраненные для покупки товары, списки желаний.',
}

const wishlistItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 119990,
    originalPrice: 129990,
    discount: 8,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 2847,
    availability: 'В наличии',
    addedDate: '15.01.2024',
    brand: 'Apple',
    category: 'Смартфоны'
  },
  {
    id: 2,
    name: 'MacBook Pro 16" M3 Pro',
    price: 279990,
    originalPrice: null,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 1523,
    availability: 'В наличии',
    addedDate: '12.01.2024',
    brand: 'Apple',
    category: 'Ноутбуки'
  },
  {
    id: 3,
    name: 'AirPods Pro 2 поколения',
    price: 24990,
    originalPrice: 27990,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 3421,
    availability: 'В наличии',
    addedDate: '10.01.2024',
    brand: 'Apple',
    category: 'Наушники'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    price: 109990,
    originalPrice: null,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 1876,
    availability: 'Ожидается',
    addedDate: '08.01.2024',
    brand: 'Samsung',
    category: 'Смартфоны'
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M2 256GB',
    price: 119990,
    originalPrice: 134990,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 956,
    availability: 'В наличии',
    addedDate: '05.01.2024',
    brand: 'Apple',
    category: 'Планшеты'
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 2134,
    availability: 'В наличии',
    addedDate: '03.01.2024',
    brand: 'Sony',
    category: 'Наушники'
  }
]

const categories = ['Все товары', 'Смартфоны', 'Ноутбуки', 'Планшеты', 'Наушники']
const brands = ['Все бренды', 'Apple', 'Samsung', 'Sony']

export default function WishlistPage() {
  const totalItems = wishlistItems.length
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const availableItems = wishlistItems.filter(item => item.availability === 'В наличии').length

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Мое <span className="text-primary">избранное</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Сохраненные товары для будущих покупок
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {totalItems}
                </div>
                <div className="text-sm text-muted-foreground">Товаров в избранном</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {totalValue.toLocaleString()} ₽
                </div>
                <div className="text-sm text-muted-foreground">Общая стоимость</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {availableItems}
                </div>
                <div className="text-sm text-muted-foreground">В наличии</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {wishlistItems.filter(item => item.discount > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Со скидкой</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Actions */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'Все товары' ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться списком
                </Button>
                <Button variant="outline" size="sm">
                  Добавить все в корзину
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {totalItems > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-6 relative group hover:shadow-lg transition-shadow">
                    {/* Remove button */}
                    <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>

                    {/* Discount badge */}
                    {item.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        -{item.discount}%
                      </div>
                    )}

                    {/* Product image */}
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Product info */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {item.brand} • {item.category}
                        </div>
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {item.name}
                        </h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{item.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({item.reviews} отзывов)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">
                            {item.price.toLocaleString()} ₽
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {item.originalPrice.toLocaleString()} ₽
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          item.availability === 'В наличии' 
                            ? 'text-green-600' 
                            : 'text-amber-600'
                        }`}>
                          {item.availability}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Добавлено {item.addedDate}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1" 
                          disabled={item.availability !== 'В наличии'}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          В корзину
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Ваш список избранного пуст</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Добавляйте товары в избранное, чтобы не потерять их и купить позже
                </p>
                <Button size="lg">
                  Перейти в каталог
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {totalItems > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Рекомендуем также</h2>
                <p className="text-xl text-muted-foreground">
                  Товары, которые могут вам понравиться
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Здесь могут быть рекомендованные товары */}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-muted/30 rounded-lg p-6 text-center">
                    <div className="w-full h-48 bg-muted/50 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/50 rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-muted/50 rounded w-1/2 mx-auto"></div>
                      <div className="h-6 bg-muted/50 rounded w-2/3 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="py-12 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Готовы к покупке?</h2>
            <p className="text-lg mb-6 opacity-90">
              Добавьте товары из избранного в корзину и оформите заказ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Добавить все в корзину
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Продолжить покупки
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 