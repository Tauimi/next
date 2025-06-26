import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

// Указываем что роут должен быть динамическим
export const dynamic = 'force-dynamic'

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
    await requireAdmin(request)

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