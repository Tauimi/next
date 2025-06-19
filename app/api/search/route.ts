import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Указываем что роут должен быть динамическим
export const dynamic = 'force-dynamic'

// Fallback данные для поиска
const fallbackProducts = [
  {
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
    averageRating: 4.8,
    totalReviews: 247,
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop', alt: 'iPhone 15 Pro', sortOrder: 1 }
    ]
  },
  {
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
    averageRating: 4.9,
    totalReviews: 156,
    category: { id: 2, name: 'Ноутбуки', slug: 'laptops' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 2, url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop', alt: 'MacBook Air M2', sortOrder: 1 }
    ]
  },
  {
    id: 3,
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
    averageRating: 4.7,
    totalReviews: 89,
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 4, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', alt: 'Samsung QLED QN90B', sortOrder: 1 }
    ]
  },
  {
    id: 4,
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
    averageRating: 4.6,
    totalReviews: 412,
    category: { id: 3, name: 'Наушники', slug: 'headphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 3, url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop', alt: 'AirPods Pro 2', sortOrder: 1 }
    ]
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Флагманский смартфон Samsung с камерой 200 МП',
    shortDescription: 'Ультра возможности в ваших руках.',
    price: 129990,
    originalPrice: 139990,
    discount: 7,
    isActive: true,
    inStock: true,
    stockQuantity: 20,
    sku: 'SMS-S24U-256',
    averageRating: 4.5,
    totalReviews: 178,
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 5, url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop', alt: 'Samsung Galaxy S24 Ultra', sortOrder: 1 }
    ]
  },
  {
    id: 6,
    name: 'Xiaomi Mi TV 55" 4K',
    slug: 'xiaomi-mi-tv-55',
    description: '4K телевизор с HDR и Android TV',
    shortDescription: 'Умный телевизор по доступной цене.',
    price: 39990,
    originalPrice: 49990,
    discount: 20,
    isActive: true,
    inStock: true,
    stockQuantity: 30,
    sku: 'XMI-TV55-4K',
    averageRating: 4.4,
    totalReviews: 234,
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 3, name: 'Xiaomi', slug: 'xiaomi' },
    images: [
      { id: 6, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', alt: 'Xiaomi Mi TV 55"', sortOrder: 1 }
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Запрос должен содержать минимум 2 символа'
      }, { status: 400 })
    }

    const searchTerm = query.trim().toLowerCase()

    // Сначала пытаемся использовать базу данных
    try {
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { isActive: true },
            {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                { sku: { contains: searchTerm, mode: 'insensitive' } },
                { category: { name: { contains: searchTerm, mode: 'insensitive' } } },
                { brand: { name: { contains: searchTerm, mode: 'insensitive' } } }
              ]
            }
          ]
        },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          brand: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { sortOrder: 'asc' }, take: 1 }
        },
        take: 50,
        orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }]
      })

      if (products.length > 0) {
        return NextResponse.json({
          success: true,
          data: products,
          total: products.length,
          query: searchTerm,
          source: 'database'
        })
      }
    } catch (dbError) {
      console.log('База данных недоступна для поиска, используем fallback данные:', dbError)
    }

    // Fallback поиск по моковым данным
    const filteredProducts = fallbackProducts.filter(product => {
      const searchFields = [
        product.name,
        product.description,
        product.shortDescription || '',
        product.sku,
        product.category.name,
        product.brand.name
      ].join(' ').toLowerCase()

      return searchFields.includes(searchTerm)
    })

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      query: searchTerm,
      source: 'fallback'
    })

  } catch (error) {
    console.error('Ошибка поиска:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
      },
      { status: 500 }
    )
  }
} 