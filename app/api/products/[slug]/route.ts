import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: {
    slug: string
  }
}

// Fallback данные для продуктов
const fallbackProducts: Record<string, any> = {
  'iphone-15-pro': {
    id: 1,
    name: 'iPhone 15 Pro 128GB',
    slug: 'iphone-15-pro',
    description: 'Новый iPhone 15 Pro с чипом A17 Pro и камерой 48 МП',
    shortDescription: 'Титановый. Прочный. Про.',
    price: 89990,
    originalPrice: 99990,
    discount: 10,
    isActive: true,
    inStock: true,
    stockQuantity: 25,
    sku: 'APL-IP15P-128',
    weight: 187,
    warranty: 12,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    categoryId: 1,
    brandId: 1,
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop', altText: 'iPhone 15 Pro', sortOrder: 1 }
    ],
    specifications: [
      { id: 1, name: 'Экран', value: '6.1" Super Retina XDR OLED', sortOrder: 1 },
      { id: 2, name: 'Процессор', value: 'A17 Pro', sortOrder: 2 },
      { id: 3, name: 'Память', value: '128 ГБ', sortOrder: 3 },
      { id: 4, name: 'Камера', value: '48 МП + 12 МП + 12 МП', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 247
  },
  'macbook-air-m2': {
    id: 2,
    name: 'MacBook Air 13" M2',
    slug: 'macbook-air-m2',
    description: 'Невероятно тонкий и легкий MacBook Air с чипом M2',
    shortDescription: 'Сверхбыстрый. Сверхтонкий.',
    price: 119990,
    originalPrice: null,
    discount: 0,
    isActive: true,
    inStock: true,
    stockQuantity: 15,
    sku: 'APL-MBA-M2-256',
    weight: 1240,
    warranty: 12,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    categoryId: 2,
    brandId: 1,
    category: { id: 2, name: 'Ноутбуки', slug: 'laptops' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 2, url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop', altText: 'MacBook Air M2', sortOrder: 1 }
    ],
    specifications: [
      { id: 5, name: 'Экран', value: '13.6" Liquid Retina', sortOrder: 1 },
      { id: 6, name: 'Процессор', value: 'Apple M2', sortOrder: 2 },
      { id: 7, name: 'Память', value: '256 ГБ SSD', sortOrder: 3 },
      { id: 8, name: 'ОЗУ', value: '8 ГБ', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 156
  },
  'airpods-pro-2': {
    id: 3,
    name: 'AirPods Pro 2 поколения',
    slug: 'airpods-pro-2',
    description: 'Беспроводные наушники с активным шумоподавлением',
    shortDescription: 'Музыка как никогда прежде.',
    price: 24990,
    originalPrice: 27990,
    discount: 11,
    isActive: true,
    inStock: true,
    stockQuantity: 50,
    sku: 'APL-APP2-WHT',
    weight: 50.8,
    warranty: 12,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    categoryId: 3,
    brandId: 1,
    category: { id: 3, name: 'Наушники', slug: 'headphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 3, url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop', altText: 'AirPods Pro 2', sortOrder: 1 }
    ],
    specifications: [
      { id: 9, name: 'Тип', value: 'Внутриканальные', sortOrder: 1 },
      { id: 10, name: 'Шумоподавление', value: 'Активное', sortOrder: 2 },
      { id: 11, name: 'Время работы', value: 'до 30 часов', sortOrder: 3 },
      { id: 12, name: 'Подключение', value: 'Bluetooth 5.3', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 412
  },
  'samsung-qled-qn90b': {
    id: 4,
    name: 'Samsung QLED QN90B 65"',
    slug: 'samsung-qled-qn90b',
    description: 'Premium QLED телевизор с технологией Neo Quantum',
    shortDescription: 'Кинематографическое качество дома.',
    price: 149990,
    originalPrice: 179990,
    discount: 17,
    isActive: true,
    inStock: true,
    stockQuantity: 8,
    sku: 'SMS-QN90B-65',
    weight: 25600,
    warranty: 24,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    categoryId: 4,
    brandId: 2,
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 4, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', altText: 'Samsung QLED QN90B', sortOrder: 1 }
    ],
    specifications: [
      { id: 13, name: 'Размер', value: '65 дюймов', sortOrder: 1 },
      { id: 14, name: 'Разрешение', value: '4K Ultra HD', sortOrder: 2 },
      { id: 15, name: 'Технология', value: 'Neo QLED', sortOrder: 3 },
      { id: 16, name: 'Smart TV', value: 'Tizen OS', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 89
  },
  'iphone-15-pro-max': {
    id: 5,
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max',
    description: 'Самый большой iPhone 15 Pro с максимальными возможностями',
    shortDescription: 'Максимум возможностей iPhone.',
    price: 119990,
    originalPrice: 129990,
    discount: 8,
    isActive: true,
    inStock: true,
    stockQuantity: 12,
    sku: 'APL-IP15PM-256',
    weight: 221,
    warranty: 12,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    categoryId: 1,
    brandId: 1,
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 5, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop', altText: 'iPhone 15 Pro Max', sortOrder: 1 }
    ],
    specifications: [
      { id: 17, name: 'Экран', value: '6.7" Super Retina XDR OLED', sortOrder: 1 },
      { id: 18, name: 'Процессор', value: 'A17 Pro', sortOrder: 2 },
      { id: 19, name: 'Память', value: '256 ГБ', sortOrder: 3 },
      { id: 20, name: 'Камера', value: '48 МП + 12 МП + 12 МП', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 178
  },
  'samsung-qled-65': {
    id: 6,
    name: 'Samsung QLED 65" Q80C',
    slug: 'samsung-qled-65',
    description: 'QLED телевизор с прямой подсветкой и Quantum HDR',
    shortDescription: 'Яркие эмоции каждый день.',
    price: 89990,
    originalPrice: 109990,
    discount: 18,
    isActive: true,
    inStock: true,
    stockQuantity: 6,
    sku: 'SMS-Q80C-65',
    weight: 22500,
    warranty: 24,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    categoryId: 4,
    brandId: 2,
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 6, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', altText: 'Samsung QLED Q80C', sortOrder: 1 }
    ],
    specifications: [
      { id: 21, name: 'Размер', value: '65 дюймов', sortOrder: 1 },
      { id: 22, name: 'Разрешение', value: '4K Ultra HD', sortOrder: 2 },
      { id: 23, name: 'Технология', value: 'QLED', sortOrder: 3 },
      { id: 24, name: 'Smart TV', value: 'Tizen OS', sortOrder: 4 }
    ],
    reviews: [],
    averageRating: 4.5,
    totalReviews: 134
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params

    // Сначала пытаемся найти в базе данных
    try {
      const product = await prisma.product.findFirst({
        where: {
          slug: slug,
          isActive: true
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          brand: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          images: {
            orderBy: {
              sortOrder: 'asc'
            }
          },
          specifications: {
            orderBy: {
              sortOrder: 'asc'
            }
          },
          reviews: {
            where: {
              isApproved: true
            },
            take: 5,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      })

      if (product) {
        // Вычисляем средний рейтинг
        const reviews = await prisma.review.findMany({
          where: {
            productId: product.id,
            isApproved: true
          },
          select: {
            rating: true
          }
        })

        const averageRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

        const totalReviews = reviews.length

        const productWithRating = {
          ...product,
          averageRating: Number(averageRating.toFixed(1)),
          totalReviews
        }

        return NextResponse.json({
          success: true,
          data: productWithRating
        })
      }
    } catch (dbError) {
      console.log('База данных недоступна, используем fallback данные:', dbError)
    }

    // Если продукт не найден в БД или БД недоступна, используем fallback данные
    const fallbackProduct = fallbackProducts[slug]
    
    if (fallbackProduct) {
      return NextResponse.json({
        success: true,
        data: fallbackProduct,
        source: 'fallback'
      })
    }

    // Если продукт не найден ни в БД, ни в fallback данных
    return NextResponse.json(
      { 
        success: false, 
        error: 'Товар не найден',
        availableProducts: Object.keys(fallbackProducts)
      },
      { status: 404 }
    )

  } catch (error) {
    console.error('Ошибка получения товара:', error)
    
    // В случае любой ошибки пытаемся вернуть fallback данные
    const fallbackProduct = fallbackProducts[params.slug]
    if (fallbackProduct) {
      return NextResponse.json({
        success: true,
        data: fallbackProduct,
        source: 'fallback'
      })
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
      },
      { status: 500 }
    )
  }
} 