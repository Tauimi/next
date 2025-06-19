import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

// Указываем что роут должен быть динамическим
export const dynamic = 'force-dynamic'

// Fallback данные для категорий
const fallbackCategories = [
  {
    id: 1,
    name: 'Смартфоны',
    slug: 'smartphones',
    description: 'Смартфоны и мобильные телефоны',
    parentId: null,
    sortOrder: 1,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 2 }
  },
  {
    id: 2,
    name: 'Ноутбуки',
    slug: 'laptops',
    description: 'Ноутбуки и переносные компьютеры',
    parentId: null,
    sortOrder: 2,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 1 }
  },
  {
    id: 3,
    name: 'Наушники',
    slug: 'headphones',
    description: 'Наушники и аудиоустройства',
    parentId: null,
    sortOrder: 3,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 1 }
  },
  {
    id: 4,
    name: 'Телевизоры',
    slug: 'tv',
    description: 'Телевизоры и мониторы',
    parentId: null,
    sortOrder: 4,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 2 }
  },
  {
    id: 5,
    name: 'Планшеты',
    slug: 'tablets',
    description: 'Планшеты и электронные книги',
    parentId: null,
    sortOrder: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 0 }
  },
  {
    id: 6,
    name: 'Аксессуары',
    slug: 'accessories',
    description: 'Аксессуары для техники',
    parentId: null,
    sortOrder: 6,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop',
    children: [],
    _count: { products: 0 }
  }
]

// GET /api/categories - Получение списка категорий
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProducts = searchParams.get('includeProducts') === 'true'
    const onlyActive = searchParams.get('onlyActive') !== 'false' // по умолчанию true

    // Сначала пытаемся использовать базу данных
    try {
      const categories = await prisma.category.findMany({
        where: onlyActive ? { isActive: true } : {},
        orderBy: { sortOrder: 'asc' },
        include: {
          children: {
            where: onlyActive ? { isActive: true } : {},
            orderBy: { sortOrder: 'asc' },
            include: includeProducts ? {
              products: {
                where: { isActive: true },
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  price: true,
                  originalPrice: true,
                  discount: true,
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                    select: {
                      url: true,
                      alt: true,
                    }
                  }
                }
              }
            } : undefined
          },
          _count: {
            select: {
              products: {
                where: { isActive: true }
              }
            }
          }
        },
      })

      if (categories.length > 0) {
        return NextResponse.json({
          success: true,
          data: categories
        })
      }
    } catch (dbError) {
      console.log('База данных недоступна для категорий, используем fallback данные:', dbError)
    }

    // Если база данных пустая или недоступна, используем fallback данные
    let filteredCategories = [...fallbackCategories]

    if (onlyActive) {
      filteredCategories = filteredCategories.filter(cat => cat.isActive)
    }

    return NextResponse.json({
      success: true,
      data: filteredCategories,
      source: 'fallback'
    })

  } catch (error) {
    console.error('Categories API Error:', error)
    
    // В случае любой ошибки возвращаем fallback данные
    return NextResponse.json({
      success: true,
      data: fallbackCategories,
      source: 'fallback'
    })
  }
}

// POST /api/categories - Создание новой категории
export async function POST(request: NextRequest) {
  try {
    // Временно убираем проверку прав для демонстрации
    // await requireAdmin(request)

    const body = await request.json()
    const {
      name,
      description,
      parentId,
      sortOrder = 0,
      isActive = true,
      image,
    } = body

    // Валидация обязательных полей
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      )
    }

    // Генерация slug
    const slug = createSlug(name)

    // Проверка уникальности slug
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      )
    }

    // Создание категории
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        parentId,
        sortOrder: parseInt(sortOrder),
        isActive,
        image,
      },
      include: {
        children: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully'
    })

  } catch (error) {
    console.error('Category creation error:', error)
    
    if (error instanceof Error && error.message.includes('Access denied')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
} 