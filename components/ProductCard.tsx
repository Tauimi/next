'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { ProductCardData } from '@/types'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: ProductCardData
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
  loading?: boolean
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onAddToWishlist,
  loading = false 
}: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const { user } = useAuthStore()
  const router = useRouter()

  const primaryImage = product.images?.[0]
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  const handleAddToCart = async () => {
    if (loading || isAdding) return
    
    // Проверяем авторизацию
    if (!user) {
      alert('Для добавления товаров в корзину необходимо войти в аккаунт')
      router.push('/auth/login')
      return
    }
    
    setIsAdding(true)
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      })
      
      if (response.ok) {
        alert('Товар добавлен в корзину!')
        // TODO: Добавить toast уведомление об успешном добавлении
      } else {
        const data = await response.json()
        alert(data.error || 'Ошибка при добавлении товара в корзину')
      }
    } catch (error) {
      alert('Ошибка при добавлении товара в корзину')
      // TODO: Добавить toast уведомление об ошибке
    } finally {
      setIsAdding(false)
    }
    
    // Если есть callback - тоже вызываем
    if (onAddToCart) {
      onAddToCart(product.id)
    }
  }

  const handleAddToWishlist = () => {
    // Проверяем авторизацию
    if (!user) {
      alert('Для добавления в избранное необходимо войти в аккаунт')
      router.push('/auth/login')
      return
    }

    if (onAddToWishlist && !loading) {
      onAddToWishlist(product.id)
    } else {
      // TODO: Добавить функциональность избранного
      alert('Функция избранного будет добавлена позже')
    }
  }

  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Новинка
          </span>
        )}
        {product.isHot && (
          <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Хит
          </span>
        )}
        {hasDiscount && (
          <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="bg-secondary-200 text-secondary-600 text-xs font-medium px-2 py-1 rounded-full">
            Нет в наличии
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="absolute top-3 right-3 z-10 flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full shadow-md"
          onClick={handleAddToWishlist}
          disabled={loading}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full shadow-md"
          asChild
        >
          <Link href={`/product/${product.slug}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-48 bg-secondary-100 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              className={`
                object-cover transition-all duration-300
                ${isImageLoading ? 'blur-sm' : 'blur-0'}
                ${isHovered ? 'scale-105' : 'scale-100'}
              `}
              onLoad={() => setIsImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary-500">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8" />
                </div>
                <p className="text-sm">Нет изображения</p>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-secondary-500 mb-1">
            {product.category.name}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.averageRating && product.averageRating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.averageRating!)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-secondary-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-secondary-500">
              ({product.totalReviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-primary-600">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-secondary-500 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock || loading || isAdding}
          loading={loading || isAdding}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {!product.inStock 
            ? 'Нет в наличии' 
            : isAdding 
              ? 'Добавление...' 
              : !user 
                ? 'Войти для покупки' 
                : 'В корзину'
          }
        </Button>
      </div>
    </motion.div>
  )
} 