import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

// GET /api/setup-db - Проверка состояния БД
export async function GET() {
  try {
    // Проверяем подключение к БД
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const categoryCount = await prisma.category.count()
    const brandCount = await prisma.brand.count()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      stats: {
        users: userCount,
        products: productCount,
        categories: categoryCount,
        brands: brandCount,
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST /api/setup-db - Инициализация БД с тестовыми данными
export async function POST() {
  try {
    // Проверяем, не инициализирована ли уже БД
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true }
    })

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Database already initialized',
        adminEmail: existingAdmin.email
      })
    }

    // Создаем администратора
    const hashedPassword = await hashPassword('Admin123!')
    const admin = await prisma.user.create({
      data: {
        email: 'admin@technomart.ru',
        username: 'admin',
        firstName: 'Администратор',
        lastName: 'Системы',
        password: hashedPassword,
        isAdmin: true,
        isActive: true,
      }
    })

    // Создаем категории
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Смартфоны',
          slug: 'smartphones',
          description: 'Современные смартфоны от ведущих производителей',
          image: '/categories/smartphones.jpg',
          sortOrder: 1,
          isActive: true
        }
      }),
      prisma.category.create({
        data: {
          name: 'Ноутбуки',
          slug: 'laptops',
          description: 'Ноутбуки для работы, учебы и развлечений',
          image: '/categories/laptops.jpg',
          sortOrder: 2,
          isActive: true
        }
      }),
      prisma.category.create({
        data: {
          name: 'Телевизоры',
          slug: 'tvs',
          description: 'Телевизоры с высоким качеством изображения',
          image: '/categories/tvs.jpg',
          sortOrder: 3,
          isActive: true
        }
      })
    ])

    // Создаем бренды
    const brands = await Promise.all([
      prisma.brand.create({
        data: {
          name: 'Apple',
          slug: 'apple',
          description: 'Американская технологическая компания',
          logo: '/brands/apple.svg',
          website: 'https://apple.com',
          isActive: true
        }
      }),
      prisma.brand.create({
        data: {
          name: 'Samsung',
          slug: 'samsung',
          description: 'Южнокорейская технологическая компания',
          logo: '/brands/samsung.svg',
          website: 'https://samsung.com',
          isActive: true
        }
      }),
      prisma.brand.create({
        data: {
          name: 'Sony',
          slug: 'sony',
          description: 'Японская технологическая корпорация',
          logo: '/brands/sony.svg',
          website: 'https://sony.com',
          isActive: true
        }
      })
    ])

    // Создаем тестовые товары
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'iPhone 15 Pro',
          slug: 'iphone-15-pro',
          description: 'Революционный iPhone 15 Pro с процессором A17 Pro и камерой Pro класса. Титановый корпус и инновационные функции для профессионалов.',
          shortDescription: 'iPhone 15 Pro с A17 Pro и камерой Pro',
          sku: 'APPLE-IP15P-128',
          price: 89990,
          originalPrice: 99990,
          discount: 10,
          categoryId: categories[0].id, // Смартфоны
          brandId: brands[0].id, // Apple
          inStock: true,
          stockQuantity: 50,
          minQuantity: 1,
          isActive: true,
          isFeatured: true,
          isNew: true,
          isHot: true,
          averageRating: 4.8,
          totalReviews: 156,
          metaTitle: 'iPhone 15 Pro - купить в TechnoMart',
          metaDescription: 'iPhone 15 Pro с A17 Pro. Лучшая цена, официальная гарантия, быстрая доставка.',
          keywords: ['iPhone', '15', 'Pro', 'Apple', 'смартфон']
        }
      }),
      prisma.product.create({
        data: {
          name: 'MacBook Air M2',
          slug: 'macbook-air-m2',
          description: 'Невероятно тонкий и легкий MacBook Air с процессором M2. Идеален для работы, учебы и творчества. До 18 часов автономной работы.',
          shortDescription: 'MacBook Air с чипом M2',
          sku: 'APPLE-MBA-M2-256',
          price: 119990,
          originalPrice: null,
          discount: 0,
          categoryId: categories[1].id, // Ноутбуки
          brandId: brands[0].id, // Apple
          inStock: true,
          stockQuantity: 25,
          minQuantity: 1,
          isActive: true,
          isFeatured: true,
          isNew: false,
          isHot: true,
          averageRating: 4.9,
          totalReviews: 89,
          metaTitle: 'MacBook Air M2 - купить в TechnoMart',
          metaDescription: 'MacBook Air с M2 чипом. Официальная гарантия Apple, выгодные цены.',
          keywords: ['MacBook', 'Air', 'M2', 'Apple', 'ноутбук']
        }
      }),
      prisma.product.create({
        data: {
          name: 'Samsung QLED 65" QN90B',
          slug: 'samsung-qled-65-qn90b',
          description: 'Премиальный QLED телевизор Samsung с технологией Neo Quantum Processor 4K. Яркие цвета, глубокий контраст и умные функции.',
          shortDescription: 'QLED телевизор 65" с 4K',
          sku: 'SAMSUNG-QN90B-65',
          price: 159990,
          originalPrice: 179990,
          discount: 11,
          categoryId: categories[2].id, // Телевизоры
          brandId: brands[1].id, // Samsung
          inStock: true,
          stockQuantity: 15,
          minQuantity: 1,
          isActive: true,
          isFeatured: true,
          isNew: false,
          isHot: false,
          averageRating: 4.7,
          totalReviews: 67,
          metaTitle: 'Samsung QLED 65" QN90B - купить в TechnoMart',
          metaDescription: 'Samsung QLED телевизор 65 дюймов. 4K, Smart TV, доставка и установка.',
          keywords: ['Samsung', 'QLED', '65', 'телевизор', '4K']
        }
      })
    ])

    // Создаем характеристики для товаров
    await Promise.all([
      // iPhone 15 Pro характеристики
      prisma.productSpecification.createMany({
        data: [
          {
            productId: products[0].id,
            name: 'Процессор',
            value: 'A17 Pro',
            groupName: 'Производительность',
            sortOrder: 1
          },
          {
            productId: products[0].id,
            name: 'Память',
            value: '128',
            unit: 'ГБ',
            groupName: 'Память',
            sortOrder: 2
          },
          {
            productId: products[0].id,
            name: 'Диагональ экрана',
            value: '6.1',
            unit: 'дюйм',
            groupName: 'Экран',
            sortOrder: 3
          }
        ]
      }),
      // MacBook Air M2 характеристики
      prisma.productSpecification.createMany({
        data: [
          {
            productId: products[1].id,
            name: 'Процессор',
            value: 'Apple M2',
            groupName: 'Производительность',
            sortOrder: 1
          },
          {
            productId: products[1].id,
            name: 'SSD',
            value: '256',
            unit: 'ГБ',
            groupName: 'Память',
            sortOrder: 2
          },
          {
            productId: products[1].id,
            name: 'Диагональ экрана',
            value: '13.6',
            unit: 'дюйм',
            groupName: 'Экран',
            sortOrder: 3
          }
        ]
      })
    ])

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully!',
      data: {
        admin: {
          email: admin.email,
          password: 'Admin123!'
        },
        stats: {
          categories: categories.length,
          brands: brands.length,
          products: products.length
        }
      }
    })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 