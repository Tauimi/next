import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    console.log('🔄 Force initialization - creating data (tables will be created automatically)...')
    
    // Попытаемся создать данные - Prisma Accelerate может автоматически создать таблицы
    
    // 1. Создаем категории
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'smartphones' },
        update: {},
        create: {
          id: 'cat_smartphones_001',
          name: 'Смартфоны',
          slug: 'smartphones',
          description: 'Современные смартфоны и мобильные телефоны',
          isActive: true,
          sortOrder: 1
        }
      }),
      prisma.category.upsert({
        where: { slug: 'laptops' },
        update: {},
        create: {
          id: 'cat_laptops_002',
          name: 'Ноутбуки',
          slug: 'laptops', 
          description: 'Ноутбуки и портативные компьютеры',
          isActive: true,
          sortOrder: 2
        }
      }),
      prisma.category.upsert({
        where: { slug: 'tvs' },
        update: {},
        create: {
          id: 'cat_tvs_003',
          name: 'Телевизоры',
          slug: 'tvs',
          description: 'Телевизоры и домашние кинотеатры',
          isActive: true,
          sortOrder: 3
        }
      })
    ])

    // 2. Создаем бренды
    const brands = await Promise.all([
      prisma.brand.upsert({
        where: { slug: 'apple' },
        update: {},
        create: {
          id: 'brand_apple_001',
          name: 'Apple',
          slug: 'apple',
          description: 'Американская технологическая компания',
          website: 'https://apple.com',
          isActive: true
        }
      }),
      prisma.brand.upsert({
        where: { slug: 'samsung' },
        update: {},
        create: {
          id: 'brand_samsung_002', 
          name: 'Samsung',
          slug: 'samsung',
          description: 'Южнокорейский технологический конгломерат',
          website: 'https://samsung.com',
          isActive: true
        }
      }),
      prisma.brand.upsert({
        where: { slug: 'sony' },
        update: {},
        create: {
          id: 'brand_sony_003',
          name: 'Sony',
          slug: 'sony', 
          description: 'Японская многонациональная корпорация',
          website: 'https://sony.com',
          isActive: true
        }
      })
    ])

    // 3. Создаем товары
    const products = await Promise.all([
      prisma.product.upsert({
        where: { slug: 'iphone-15-pro' },
        update: {},
        create: {
          id: 'prod_iphone15_001',
          name: 'iPhone 15 Pro',
          slug: 'iphone-15-pro',
          description: 'Новейший флагманский смартфон Apple с титановым корпусом и процессором A17 Pro',
          shortDescription: 'Флагманский смартфон Apple',
          sku: 'APL-IPH15P-256-TIT',
          price: 89990,
          originalPrice: 99990,
          discount: 10,
          inStock: true,
          stockQuantity: 50,
          categoryId: categories[0].id,
          brandId: brands[0].id,
          isActive: true,
          isFeatured: true,
          isNew: true,
          averageRating: 4.8,
          totalReviews: 127
        }
      }),
      prisma.product.upsert({
        where: { slug: 'macbook-air-m2' },
        update: {},
        create: {
          id: 'prod_macbook_002',
          name: 'MacBook Air M2',
          slug: 'macbook-air-m2',
          description: 'Ультратонкий ноутбук Apple с процессором M2, 13.6" Liquid Retina дисплей',
          shortDescription: 'Ультратонкий ноутбук Apple M2',
          sku: 'APL-MBA-M2-256-SG',
          price: 119990,
          originalPrice: 129990,
          discount: 8,
          inStock: true,
          stockQuantity: 25,
          categoryId: categories[1].id,
          brandId: brands[0].id,
          isActive: true,
          isFeatured: true,
          averageRating: 4.9,
          totalReviews: 89
        }
      }),
      prisma.product.upsert({
        where: { slug: 'samsung-qled-qn90b' },
        update: {},
        create: {
          id: 'prod_samsung_003',
          name: 'Samsung QLED 65" QN90B',
          slug: 'samsung-qled-qn90b',
          description: 'Премиальный 4K QLED телевизор 65 дюймов с технологией Neo Quantum Processor 4K',
          shortDescription: 'Премиальный 4K QLED телевизор 65"',
          sku: 'SAM-QN90B-65-BLK',
          price: 159990,
          originalPrice: 179990,
          discount: 11,
          inStock: true,
          stockQuantity: 15,
          categoryId: categories[2].id,
          brandId: brands[1].id,
          isActive: true,
          isFeatured: true,
          isHot: true,
          averageRating: 4.7,
          totalReviews: 56
        }
      })
    ])

    // 4. Создаем администратора
    const hashedPassword = await bcrypt.hash('Admin123!', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@technomart.ru' },
      update: {},
      create: {
        id: 'user_admin_001',
        email: 'admin@technomart.ru',
        username: 'admin',
        firstName: 'Администратор',
        lastName: 'Системы',
        password: hashedPassword,
        isAdmin: true,
        isActive: true
      }
    })

    // Подсчитываем финальную статистику
    const stats = {
      users: await prisma.user.count(),
      categories: await prisma.category.count(),
      brands: await prisma.brand.count(),
      products: await prisma.product.count()
    }

    console.log('✅ Force initialization completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Database force-initialized successfully! New tables (wishlist_items, compare_items) will be created automatically when first accessed.',
      stats,
      created: {
        categories: categories.length,
        brands: brands.length, 
        products: products.length,
        admin: admin ? 1 : 0,
        note: 'New tables (wishlist_items, compare_items) will be auto-created'
      },
      login: {
        email: 'admin@technomart.ru',
        password: 'Admin123!'
      },
      nextSteps: [
        '1. Visit the site to trigger table creation',
        '2. Or run: npx prisma db push',
        '3. Or run: npx prisma generate && npx prisma db push'
      ]
    })

  } catch (error: any) {
    console.error('❌ Force initialization failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Force initialization failed',
      details: error.message,
      hint: 'Try running: npx prisma generate && npx prisma db push'
    }, { status: 500 })
  }
}

export async function GET() {
  // Разрешаем инициализацию через GET для удобства
  return POST()
} 