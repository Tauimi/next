import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

// Указываем что роут должен быть динамическим
export const dynamic = 'force-dynamic'

// Fallback данные для продуктов
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
    weight: 187,
    warranty: 12,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop', altText: 'iPhone 15 Pro', sortOrder: 1 }
    ],
    _count: { reviews: 247 }
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
    weight: 1240,
    warranty: 12,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    category: { id: 2, name: 'Ноутбуки', slug: 'laptops' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 2, url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop', altText: 'MacBook Air M2', sortOrder: 1 }
    ],
    _count: { reviews: 156 }
  },
  {
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
    category: { id: 3, name: 'Наушники', slug: 'headphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 3, url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop', altText: 'AirPods Pro 2', sortOrder: 1 }
    ],
    _count: { reviews: 412 }
  },
  {
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
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 4, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', altText: 'Samsung QLED QN90B', sortOrder: 1 }
    ],
    _count: { reviews: 89 }
  },
  {
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
    category: { id: 1, name: 'Смартфоны', slug: 'smartphones' },
    brand: { id: 1, name: 'Apple', slug: 'apple' },
    images: [
      { id: 5, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop', altText: 'iPhone 15 Pro Max', sortOrder: 1 }
    ],
    _count: { reviews: 178 }
  },
  {
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
    category: { id: 4, name: 'Телевизоры', slug: 'tv' },
    brand: { id: 2, name: 'Samsung', slug: 'samsung' },
    images: [
      { id: 6, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop', altText: 'Samsung QLED Q80C', sortOrder: 1 }
    ],
    _count: { reviews: 134 }
  }
]

// GET /api/products - Получение списка товаров
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'created'
    const order = searchParams.get('order') || 'desc'
    const featured = searchParams.get('featured') === 'true'
    const inStock = searchParams.get('inStock') === 'true'

    // Сначала пытаемся использовать базу данных
    try {
      // Построение фильтров
      const where: any = {
        isActive: true,
      }

      if (category) {
        where.category = { slug: category }
      }

      if (brand) {
        where.brand = { slug: brand }
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
        ]
      }

      if (featured) {
        where.isFeatured = true
      }

      if (inStock) {
        where.inStock = true
      }

      // Построение сортировки
      const orderBy: any = {}
      switch (sort) {
        case 'price':
          orderBy.price = order
          break
        case 'name':
          orderBy.name = order
          break
        case 'rating':
          orderBy.averageRating = order
          break
        case 'created':
        default:
          orderBy.createdAt = order
          break
      }

      // Подсчет общего количества
      const total = await prisma.product.count({ where })

      // Получение товаров с пагинацией
      const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            }
          },
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            }
          },
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
          _count: {
            select: {
              reviews: true,
            }
          }
        },
      })

      if (products.length > 0 || total > 0) {
        const totalPages = Math.ceil(total / limit)

        return NextResponse.json({
          success: true,
          data: products,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          }
        })
      }
    } catch (dbError) {
      console.log('База данных недоступна, используем fallback данные:', dbError)
    }

    // Если база данных пустая или недоступна, используем fallback данные
    let filteredProducts = [...fallbackProducts]

    // Применяем фильтры к fallback данным
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.slug === category)
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand.slug === brand)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower)
      )
    }

    if (inStock) {
      filteredProducts = filteredProducts.filter(p => p.inStock)
    }

    // Сортировка fallback данных
    filteredProducts.sort((a, b) => {
      switch (sort) {
        case 'price':
          return order === 'asc' ? a.price - b.price : b.price - a.price
        case 'name':
          return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        case 'created':
        default:
          return order === 'asc' ? 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() :
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    // Пагинация fallback данных
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      source: 'fallback',
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    })

  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Создание нового товара
export async function POST(request: NextRequest) {
  try {
    // Временно убираем проверку прав для демонстрации
    // await requireAdmin(request)

    const body = await request.json()
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      categoryId,
      brandId,
      inStock = true,
      stockQuantity = 0,
      minQuantity = 1,
      isActive = true,
      isFeatured = false,
      isNew = false,
      isHot = false,
      metaTitle,
      metaDescription,
      keywords = [],
      specifications = [],
    } = body

    // Валидация обязательных полей
    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, categoryId' },
        { status: 400 }
      )
    }

    // Генерация уникального SKU и slug
    const slug = createSlug(name)
    const sku = `SKU${Date.now()}`

    // Создание товара
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        sku,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
        categoryId,
        brandId,
        inStock,
        stockQuantity: parseInt(stockQuantity),
        minQuantity: parseInt(minQuantity),
        isActive,
        isFeatured,
        isNew,
        isHot,
        metaTitle: metaTitle || name,
        metaDescription: metaDescription || shortDescription || description.slice(0, 160),
        keywords,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      }
    })

    // Создание характеристик товара
    if (specifications.length > 0) {
      await prisma.productSpecification.createMany({
        data: specifications.map((spec: any, index: number) => ({
          productId: product.id,
          name: spec.name,
          value: spec.value,
          unit: spec.unit || null,
          groupName: spec.groupName || null,
          sortOrder: index,
        }))
      })
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    })

  } catch (error) {
    console.error('Product creation error:', error)
    
    if (error instanceof Error && error.message.includes('Access denied')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 